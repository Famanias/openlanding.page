import ts from "typescript";

function scriptKind(filename: string) {
  return /\.jsx?$/.test(filename) ? ts.ScriptKind.JSX : filename.endsWith("x") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
}

export function assetLiterals(source: string, filename: string): string[] {
  const file=ts.createSourceFile(filename,source,ts.ScriptTarget.Latest,true,scriptKind(filename));
  const values:string[]=[];
  const visit=(node:ts.Node)=>{
    if(ts.isStringLiteralLike(node)||ts.isTemplateHead(node)||ts.isTemplateMiddle(node)||ts.isTemplateTail(node))values.push(node.text);
    ts.forEachChild(node,visit);
  };
  visit(file);
  return values;
}

/** Match computed filenames against the owning template's local media, without evaluating source. */
export function assetPatterns(source: string, filename: string): RegExp[] {
  const file = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, scriptKind(filename));
  const patterns = new Set<string>();
  const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const suffix = (node: ts.Expression): string => {
    if (ts.isStringLiteralLike(node)) return node.text;
    if (ts.isTemplateExpression(node)) return node.templateSpans[node.templateSpans.length - 1].literal.text;
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) return suffix(node.right);
    return "";
  };
  const pattern = (node: ts.Expression, final = false): string => {
    if (ts.isStringLiteralLike(node)) return escape(final ? node.text.split(/[?#]/)[0] : node.text);
    if (ts.isTemplateExpression(node)) return escape(node.head.text) + node.templateSpans.map((span, i) =>
      pattern(span.expression) + escape(final && i === node.templateSpans.length - 1 ? span.literal.text.split(/[?#]/)[0] : span.literal.text)).join("");
    if (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken) return pattern(node.left) + pattern(node.right, final);
    return "[^?#]*";
  };
  const visit = (node: ts.Node) => {
    if ((ts.isTemplateExpression(node) || (ts.isBinaryExpression(node) && node.operatorToken.kind === ts.SyntaxKind.PlusToken)) &&
        /\.(?:png|jpe?g|webp|avif|svg|glb|ttf|woff2?|mp4)(?:[?#].*)?$/i.test(suffix(node))) patterns.add(`^${pattern(node, true)}$`);
    ts.forEachChild(node, visit);
  };
  visit(file);
  return [...patterns].map(value => new RegExp(value));
}

/** Adapt only URL consumer boundaries in authored source; renderer/math behavior stays original. */
export function rewriteAssetConsumers(source: string, filename: string): string {
  const file = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true, scriptKind(filename));
  let changed = false;
  const transformed = ts.transform(file, [context => {
    const wrap = (expression: ts.Expression) => {
      changed = true;
      return ts.factory.createCallExpression(ts.factory.createIdentifier("__standaloneAsset"), undefined, [expression]);
    };
    const propertyName = (name: ts.PropertyName) => ts.isIdentifier(name) || ts.isStringLiteral(name) ? name.text : "";
    const visit: ts.Visitor = node => {
      const current = ts.visitEachChild(node, visit, context);
      if (ts.isCallExpression(current) && current.arguments.length) {
        const callee = current.expression;
        if ((ts.isIdentifier(callee) && callee.text === "fetch") || (ts.isPropertyAccessExpression(callee) && ["load", "loadAsync"].includes(callee.name.text))) {
          return ts.factory.updateCallExpression(current, callee, current.typeArguments, [wrap(current.arguments[0]), ...current.arguments.slice(1)]);
        }
        if (ts.isPropertyAccessExpression(callee) && callee.name.text === "setAttribute" && ts.isStringLiteral(current.arguments[0]) && ["src", "poster", "href"].includes(current.arguments[0].text) && current.arguments[1]) {
          return ts.factory.updateCallExpression(current, callee, current.typeArguments, [current.arguments[0], wrap(current.arguments[1]), ...current.arguments.slice(2)]);
        }
      }
      if (ts.isBinaryExpression(current) && current.operatorToken.kind === ts.SyntaxKind.EqualsToken && ts.isPropertyAccessExpression(current.left) && ["src", "poster", "font"].includes(current.left.name.text)) {
        return ts.factory.updateBinaryExpression(current, current.left, current.operatorToken, wrap(current.right));
      }
      if (ts.isPropertyAssignment(current) && propertyName(current.name) === "font") return ts.factory.updatePropertyAssignment(current, current.name, wrap(current.initializer));
      return current;
    };
    return root => ts.visitNode(root, visit) as ts.SourceFile;
  }]);
  const output = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed }).printFile(transformed.transformed[0]);
  transformed.dispose();
  return changed ? 'import {resolveAsset as __standaloneAsset} from "standalone:registry";\n' + output : source;
}
