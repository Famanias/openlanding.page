import {ImageResponse} from "next/og";
export const alt="LENUS — Reality is just the start.";
export const size={width:1200,height:630};
export const contentType="image/png";
export default function OpenGraphImage(){
  return new ImageResponse(<div style={{width:"100%",height:"100%",display:"flex",background:"#08090D",color:"#F8FAFC",padding:64,position:"relative",overflow:"hidden",fontFamily:"sans-serif"}}>
    <div style={{display:"flex",flexDirection:"column",zIndex:2}}><div style={{fontSize:24,letterSpacing:4,marginBottom:64}}>LENUS</div><div style={{color:"#D2F802",fontSize:76,fontWeight:800,lineHeight:1}}>REALITY</div><div style={{fontSize:76,fontWeight:800,lineHeight:1}}>IS JUST</div><div style={{display:"flex",fontSize:76,fontWeight:800,lineHeight:1}}>THE <span style={{color:"#A855F7",marginLeft:16}}>START.</span></div><div style={{fontSize:20,color:"#9499A6",marginTop:32}}>Experiences beyond the expected.</div></div>
    <div style={{position:"absolute",left:610,top:65,width:510,height:510,borderRadius:"50%",border:"22px solid #9499A6",display:"flex",alignItems:"center",justifyContent:"center",transform:"rotate(-15deg)",background:"#10131C"}}><div style={{width:430,height:430,border:"3px solid #A855F7",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:350,height:350,border:"18px solid #161924",outline:"2px solid #D2F802",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:190,height:190,border:"10px solid #9499A6",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}><div style={{width:124,height:124,borderRadius:"50%",background:"#00E599"}}/></div></div></div></div>
  </div>,size);
}
