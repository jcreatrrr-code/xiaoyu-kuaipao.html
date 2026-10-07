/* ---------- iPhone App 版专用（网页版里 XY_APP 不存在，下面的都不会用到） ---------- */
/* 拍照分享：先把照片存进 App 的临时文件夹，再弹出系统分享面板（可以存到相册、发微信等） */
function appShareImage(blob,name){
  const P=window.Capacitor&&Capacitor.Plugins,FS=P&&P.Filesystem,SH=P&&P.Share;if(!FS||!SH)return false;
  const r=new FileReader();r.onload=async()=>{try{
    const w=await FS.writeFile({path:name,data:String(r.result).split(',')[1],directory:'CACHE'});
    await SH.share({title:name,files:[w.uri]})}catch(e){if(!/cancel/i.test(String(e&&e.message||e)))toast('照片没能分享出去',1.6)}};
  r.readAsDataURL(blob);return true}
