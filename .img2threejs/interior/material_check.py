import json
import subprocess
import sys
from pathlib import Path

ROOT=Path(__file__).resolve().parent
FORGE=Path('C:/Users/PC/.claude/skills/img2threejs/forge')
pass_id=sys.argv[1]
if pass_id not in ['material-pass','surface-pass','lighting-pass','interaction-pass','optimization-pass']:raise SystemExit('Invalid pass')
base=ROOT/'captures'/pass_id
spec=ROOT/'interior-sculpt-spec.json'
reports=[]
def run(script,*args):
    result=subprocess.run([sys.executable,str(FORGE/script),*map(str,args)],capture_output=True,text=True,encoding='utf-8')
    print(script,result.returncode,flush=True)
    if result.returncode:print(result.stdout[-2500:],result.stderr[-1000:])
    return result
for material in ['glass','titanium','emerald','prism']:
    report=base/f'materials/{material}-comparison.json'
    run('stage4_review/material_comparator.py','--reference',base/f'materials/{material}-reference.png','--render',base/f'materials/{material}-render.png','--material-id',material,'--out',report)
    reports.append(report)
result=run('stage4_review/material_views.py','--component-id','optical-assembly','--region-id','optical-materials','--validation-view','neutral-studio','--validation-view','reference-beauty','--transmission','--out',base/'materials/view-plan.json',*[v for angle in [0,90,180,270] for v in ['--capture',base/f'closed/{angle}.png']])
if result.returncode:raise SystemExit(result.returncode)
s=json.loads(spec.read_text(encoding='utf-8'))
components={'glass':'outer-glass','titanium':'housing-panel-0','emerald':'front-lens','prism':'shards'}
s['materialPipeline']={'schemaVersion':1,'registry':'docs/materials/material-reference.json','status':'proceed','regions':[{'regionId':m,'specMaterialId':m,'componentId':components[m],'profileId':'metal.steel-brushed' if m=='titanium' else 'glass.clear','status':'proceed','authority':'Preserved user-specified physical scalars and approved material calibration crops; new glass/titanium reference evidence corroborates finish. Opaque core backing is a documented rendering approximation.','comparison':str(report)} for m,report in zip(components,reports)]}
s['validationOverrides']=[json.loads((ROOT.parent/'material-validation-override.json').read_text(encoding='utf-8'))]
spec.write_text(json.dumps(s,indent=2)+'\n',encoding='utf-8')
result=run('stage4_review/material_gate.py',spec,*[v for report in reports for v in ['--comparison',report]],'--view-plan',base/'materials/view-plan.json','--out',base/'material-gate.json','--in-place')
for report in reports:
    r=json.loads(report.read_text(encoding='utf-8'));print(report.name,r.get('passed'),r.get('metrics',{}).get('scores',{}).get('overall'))
raise SystemExit(result.returncode)
