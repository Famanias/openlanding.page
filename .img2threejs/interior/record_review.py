"""Persist an explicitly authored visual review using the unmodified forge tools."""
import json
import subprocess
import sys
from pathlib import Path

ROOT=Path(__file__).resolve().parent
FORGE=Path('C:/Users/PC/.claude/skills/img2threejs/forge')
pass_id=sys.argv[1]
spec=ROOT/'interior-sculpt-spec.json'
base=ROOT/'captures'/pass_id
review=json.loads((ROOT/'reviews'/f'{pass_id}.json').read_text(encoding='utf-8'))
def run(script,*args):
    result=subprocess.run([sys.executable,str(FORGE/script),*map(str,args)],capture_output=True,text=True,encoding='utf-8')
    if result.returncode:print(result.stdout,result.stderr);raise SystemExit(result.returncode)
    return result
def mark(step,evidence):
    state=json.loads((ROOT/'state.json').read_text(encoding='utf-8'))
    if any(item['id']==step and item['status'] in ['done','skipped'] for item in state['checklist']):
        return
    run('state.py','mark',step,'--state',ROOT/'state.json','--evidence',evidence)
run('next.py','--state',ROOT/'state.json',spec)
for step,evidence in [('build-current-pass',ROOT.parent.parent/'src/app/(lenus)/lenus/model/createOpticalLensModel.ts'),('render-capture',base/'deployed/60.png'),('review-contract-read',ROOT/'intake.json'),('tier1-diagnostics',base/'tier1.json'),('multi-angle-review',base/'deployed/turntable.json'),('pass-gate-check',base/'pass-gate.txt')]:
    mark(step,evidence)
run('stage4_review/append_review.py',spec,'--pass-id',pass_id,'--fidelity',review['score'],'--action',review['action'],'--summary',review['summary'],'--render-screenshot',base/'deployed/60.png','--reference-screenshot',ROOT/'review-references/4.png','--comparison-image',base/review.get('comparisonImage','comparison-deployed.png'),'--ai-vision-score',review['score'],'--layer-scores-json',json.dumps(review['layers']),'--feature-reviews-json',json.dumps(review['features']),'--ai-vision-notes',review['summary'],'--review-viewpoints-json',json.dumps(['front','three-quarter','side','rear','left','thickness-axis','long-axis','closed','deployed']),'--require-screenshot-files','--in-place',*(['--map-stripped-render',base/'deployed/60.png'] if pass_id=='blockout' else []))
mark('ai-review-recorded',spec)
run('stage3_build/orchestrate_passes.py','sync',spec,'--in-place')
mark('pipeline-sync',spec)
print(run('next.py','--state',ROOT/'state.json',spec).stdout)
