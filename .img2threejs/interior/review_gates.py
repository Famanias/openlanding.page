"""Run unmodified forge diagnostics and preserve their actual results."""
import json
import subprocess
import sys
from pathlib import Path

ROOT=Path(__file__).resolve().parent
FORGE=Path('C:/Users/PC/.claude/skills/img2threejs/forge')
PASS=sys.argv[1]
base=ROOT/'captures'/PASS
spec=ROOT/'interior-sculpt-spec.json'
def run(script,*args,out):
    result=subprocess.run([sys.executable,str(FORGE/script),*map(str,args)],capture_output=True,text=True,encoding='utf-8')
    (base/out).write_text(result.stdout,encoding='utf-8')
    (base/(out+'.stderr')).write_text(result.stderr,encoding='utf-8')
    print(script, result.returncode, flush=True)
    return result

gate=subprocess.run([sys.executable,str(FORGE/'next.py'),'--state',str(ROOT/'state.json'),str(spec)],capture_output=True,text=True)
if gate.returncode:print(gate.stdout);raise SystemExit(gate.returncode)
result=run('stage4_review/diagnose_render.py','--reference',ROOT.parent/'references/front-view.png','--render',base/'closed/0.png','--pass-id',PASS,'--json',*(['--map-stripped-render',base/'closed/0.png'] if PASS=='blockout' else []),out='tier1.json')
if result.returncode:print(result.stdout);raise SystemExit(result.returncode)
s=json.loads(spec.read_text(encoding='utf-8'))
s['tier1Results']=[json.loads(result.stdout)]
spec.write_text(json.dumps(s,indent=2)+'\n',encoding='utf-8')
for pose in ['closed','deployed']:
    result=run('stage4_review/diagnose_render_multi_angle.py','--reference',base/pose/'0.png',*[v for a in [90,180,270] for v in ['--orbit',base/pose/f'{a}.png']],'--json',out=f'{pose}/multi-angle.json')
    if result.returncode:raise SystemExit(result.returncode)
    result=run('stage4_review/turntable_gate.py',*[v for a in [0,90,180,270] for v in ['--capture',f'{a}={base/pose/f"{a}.png"}']],'--allow-holes','--json',out=f'{pose}/turntable.json')
    if result.returncode:print(result.stdout);raise SystemExit(result.returncode)
    result=run('stage4_review/self_intersection.py',base/pose/'meshes.json','--max-samples','128','--json',out=f'{pose}/self-intersection.json')
    if result.returncode:print(result.stdout[-2000:]);raise SystemExit(result.returncode)
result=run('stage4_review/attachment_anchor.py',spec,'--measured',base/'closed/measured.json','--json',out='attachment.json')
if result.returncode:print(result.stdout[-2000:]);raise SystemExit(result.returncode)
result=run('stage4_review/interior_difference.py',ROOT/'review-references/4.png',base/'deployed/60.png','--json',out='interior.json')
if result.returncode:print(result.stdout[-2000:]);raise SystemExit(result.returncode)
for pose,ref in [('closed','1'),('deployed','4')]:
    run('stage4_review/make_comparison_sheet.py','--reference',ROOT/f'review-references/{ref}.png','--render',base/pose/'60.png','--out',base/f'comparison-{pose}.png','--panel-width','960','--panel-height','536','--json',out=f'comparison-{pose}.json')
result=run('stage3_build/orchestrate_passes.py','check',spec,'--pass-id',PASS,out='pass-gate.txt')
raise SystemExit(result.returncode)
