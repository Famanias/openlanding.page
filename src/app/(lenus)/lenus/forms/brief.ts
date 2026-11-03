export type ProjectBrief={name:string;email:string;brief:string};
export function validateBrief(values:ProjectBrief):Partial<Record<keyof ProjectBrief,string>>{
  const errors:Partial<Record<keyof ProjectBrief,string>>={};
  if(!values.name.trim()||values.name.length>100)errors.name="Tell us your name.";
  if(values.email.length>254||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))errors.email="Enter a valid email address.";
  if(values.brief.trim().length<20||values.brief.length>2000)errors.brief="Add at least 20 characters about your project.";
  return errors;
}
