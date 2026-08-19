(()=>{
  const HERO_ART='18sHen7V4rX81XtqET5avjUTl0jzbcbBe';
  function fixMobile(){
    const mobile=window.matchMedia('(max-width:700px)').matches;
    const hero=document.querySelector('.hero.hero-artwork-full');
    const img=document.querySelector('.hero-art-image');
    const actions=document.querySelector('.hero-art-actions');
    if(hero&&img){
      if(mobile){
        img.src=`https://drive.google.com/thumbnail?id=${HERO_ART}&sz=w1200`;
        hero.style.height='auto';
        hero.style.aspectRatio='auto';
        hero.style.minHeight='0';
        hero.style.overflow='visible';
        img.style.position='relative';
        img.style.inset='auto';
        img.style.width='100%';
        img.style.height='auto';
        img.style.objectFit='contain';
        img.style.objectPosition='center';
        img.style.display='block';
        if(actions){
          actions.style.position='relative';
          actions.style.left='auto';
          actions.style.bottom='auto';
          actions.style.transform='none';
          actions.style.width='100%';
          actions.style.border='0';
          actions.style.borderRadius='0';
          actions.style.padding='14px 12px 18px';
          actions.style.background='#08090b';
          actions.style.display='grid';
          actions.style.gridTemplateColumns='1fr 1fr';
        }
      }
    }
    const motion=document.querySelector('#motion');
    if(motion&&mobile){
      motion.style.display='block';
      motion.style.visibility='visible';
      motion.style.opacity='1';
    }
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fixMobile);else fixMobile();
  window.addEventListener('resize',fixMobile,{passive:true});
  new MutationObserver(fixMobile).observe(document.body,{childList:true,subtree:true});
})();