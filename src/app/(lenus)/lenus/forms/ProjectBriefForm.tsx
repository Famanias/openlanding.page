"use client";
import { useRef,useState,type FormEvent } from "react";
import { ArrowRight,Check,Download } from "lucide-react";
import {validateBrief,type ProjectBrief} from "./brief";

export function ProjectBriefForm(){
  const [values,setValues]=useState<ProjectBrief>({name:"",email:"",brief:""});
  const [errors,setErrors]=useState<Partial<Record<keyof ProjectBrief,string>>>({});
  const [prepared,setPrepared]=useState(false);
  const form=useRef<HTMLFormElement>(null);
  const submit=(event:FormEvent<HTMLFormElement>)=>{
    event.preventDefault();const found=validateBrief(values);setErrors(found);
    if(Object.keys(found).length){form.current?.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus();return;}
    setPrepared(true);
  };
  const download=()=>{
    const text=`LENUS — Project brief\n\nName: ${values.name.trim()}\nEmail: ${values.email.trim()}\n\n${values.brief.trim()}\n\nPrepared locally. This brief has not been sent.`;
    const url=URL.createObjectURL(new Blob([text],{type:"text/plain;charset=utf-8"}));
    const link=document.createElement("a");link.href=url;link.download="lenus-project-brief.txt";link.click();
    window.setTimeout(()=>URL.revokeObjectURL(url),1000);
  };
  if(prepared)return <div className="ln-brief-success" role="status"><Check size={32} aria-hidden="true"/><h3>Your next chapter starts here.</h3><p>Your brief is ready, {values.name.trim()}. Save a copy to share with your team. It has not been sent.</p><button type="button" className="ln-button" onClick={download}>Save project brief <Download size={18} aria-hidden="true"/></button><button type="button" className="ln-text-button" onClick={()=>setPrepared(false)}>Edit your brief</button></div>;
  return <form className="ln-contact-form" ref={form} onSubmit={submit} noValidate>
    {([{key:"name",label:"Your name",type:"text",autoComplete:"name",max:100},{key:"email",label:"Email address",type:"email",autoComplete:"email",max:254}] as const).map(field=><label key={field.key} htmlFor={`ln-${field.key}`}>{field.label}<input id={`ln-${field.key}`} name={field.key} type={field.type} autoComplete={field.autoComplete} maxLength={field.max} required value={values[field.key]} aria-invalid={Boolean(errors[field.key])} aria-describedby={errors[field.key]?`ln-${field.key}-error`:undefined} onChange={event=>setValues({...values,[field.key]:event.target.value})}/>{errors[field.key]&&<span className="ln-field-error" id={`ln-${field.key}-error`}>{errors[field.key]}</span>}</label>)}
    <label htmlFor="ln-brief">What are you imagining?<textarea id="ln-brief" name="brief" rows={3} maxLength={2000} required value={values.brief} aria-invalid={Boolean(errors.brief)} aria-describedby={errors.brief?"ln-brief-error":undefined} onChange={event=>setValues({...values,brief:event.target.value})}/>{errors.brief&&<span className="ln-field-error" id="ln-brief-error">{errors.brief}</span>}</label>
    <p className="ln-form-note">This demo prepares a brief on your device. Nothing is sent or saved online.</p>
    <button type="submit" className="ln-button">Prepare project brief <ArrowRight size={20} aria-hidden="true"/></button>
  </form>;
}
