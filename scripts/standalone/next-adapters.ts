import type { Plugin } from "esbuild";

const modules: Record<string, string> = {
  "next/link": `
    import {jsx} from "react/jsx-runtime";
    export default function Link(props) {
      const {href,as,replace,scroll,prefetch,shallow,locale,passHref,legacyBehavior,onNavigate,transitionTypes,...anchor} = props;
      return jsx("a", {...anchor,href:href === "/" ? "https://openlanding.page/" : href});
    }
  `,
  "next/image": `
    import {jsx} from "react/jsx-runtime";
    import {resolveAsset} from "standalone:registry";
    export default function Image(props) {
      const {src,fill,priority,preload,quality,loader,placeholder,blurDataURL,unoptimized,overrideSrc,onLoadingComplete,layout,lazyBoundary,lazyRoot,objectFit,objectPosition,...image} = props;
      const source = typeof src === "object" && src !== null ? (src.default || src) : null;
      const style = {
        ...(fill ? {position:"absolute",width:"100%",height:"100%",top:0,left:0,right:0,bottom:0} : {}),
        ...(objectFit ? {objectFit} : {}),
        ...(objectPosition ? {objectPosition} : {}),
        ...image.style,
      };
      return jsx("img", {
        ...image,
        src:resolveAsset(overrideSrc || (source ? source.src : src)),
        width:fill ? undefined : image.width ?? source?.width,
        height:fill ? undefined : image.height ?? source?.height,
        loading:priority || preload ? "eager" : image.loading ?? "lazy",
        decoding:image.decoding ?? "async",
        style,
      });
    }
  `,
  "next/dynamic": `
    import {useEffect,useState} from "react";
    import {jsx} from "react/jsx-runtime";
    export default function dynamic(loader,options = {}) {
      return function Dynamic(props) {
        const [state,setState] = useState({Component:null,error:null});
        useEffect(() => {
          let active = true;
          Promise.resolve().then(() => loader()).then(
            module => {if(active) setState({Component:module.default || module,error:null})},
            error => {if(active) setState({Component:null,error})},
          );
          return () => {active = false};
        }, []);
        if(state.Component) return jsx(state.Component,props);
        if(options.loading) return jsx(options.loading,{error:state.error,isLoading:!state.error,pastDelay:true,timedOut:false});
        if(state.error) throw state.error;
        return null;
      };
    }
  `,
};

/** Replace the Next boundaries used by exported templates with standalone React. */
export function nextAdapters(): Plugin {
  return {
    name: "standalone-next",
    setup(builder) {
      builder.onResolve({ filter: /^next\/(?:link|image|dynamic)$/ }, ({ path }) => ({ path, namespace: "standalone-next" }));
      builder.onLoad({ filter: /.*/, namespace: "standalone-next" }, ({ path }) => ({
        contents: modules[path], loader: "js", resolveDir: process.cwd(),
      }));
    },
  };
}
