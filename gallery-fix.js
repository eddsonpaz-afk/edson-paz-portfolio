// Camada de confiabilidade para as provas visuais hospedadas no Google Drive.
const drivePreview=id=>`https://drive.google.com/file/d/${id}/preview`;
const driveOriginal=id=>`https://drive.google.com/file/d/${id}/view`;
openGallery=function(key){
  ensureGallery(); const p=projectData[key],g=q('#projectGallery'); if(!p||!g)return;
  g.querySelector('.gallery-kicker').textContent=p.kicker;
  g.querySelector('.gallery-title').textContent=p.title;
  g.querySelector('.gallery-desc').textContent=p.desc;
  g.querySelector('.gallery-cta').innerHTML=p.url?`<a class="product-live gallery-live" href="${p.url}" target="_blank" rel="noopener">TESTAR PROJETO AO VIVO ↗</a>`:'';
  g.querySelector('.gallery-grid').innerHTML=p.images.length?p.images.map(([asset,caption],i)=>{const id=assets[asset];return `<figure class="gallery-proof ${p.images.length===1||i===0?'wide':''}"><div class="drive-preview"><iframe src="${drivePreview(id)}" title="${caption}" loading="lazy" allowfullscreen></iframe></div><figcaption><span>${caption}</span><a href="${driveOriginal(id)}" target="_blank" rel="noopener">ABRIR ORIGINAL ↗</a></figcaption></figure>`}).join(''):`<div class="gallery-empty">Este produto está disponível para teste ao vivo. Use o botão acima.</div>`;
  g.classList.add('open'); document.body.classList.add('modal-open');
};
qa('img[src*="drive.google.com/thumbnail"]').forEach(img=>img.addEventListener('error',()=>{const m=img.src.match(/[?&]id=([^&]+)/);if(m)img.src=`https://drive.google.com/uc?export=view&id=${m[1]}`},{once:true}));

// Capas reais dos projetos/publicações. Substitui os previews instáveis do FlipHTML5.
const publicationCovers={
  ubvp:['1XqNEAGe7nOH7OEdDXYB5Guvn0f7orLeR','Plano Diretor de Crescimento Comercial 2026–2028'],
  gxgr:['1YvIa5uPK2jdLe2pSnHkjW-XMhevwpIjQ','Produtividade Profissional'],
  zrki:['1MJB0BTnI2PYyxKI3pRmMTzSXWFY4UExT','ExpoConstruir 2026 — Operação Pós-Feira'],
  nuhj:['1iJri_tzj91ti1Ith1OHeVdsaUq_hjhdP','ExpoConstruir 2026 — Onda de Oportunidades']
};
document.querySelectorAll('.pub-card[data-book]').forEach(card=>{
  const data=publicationCovers[card.dataset.book]; if(!data)return;
  const [id,title]=data,img=card.querySelector('.pub-cover img');
  if(img){img.src=`https://drive.google.com/thumbnail?id=${id}&sz=w1600`;img.alt=title;img.style.objectFit='cover';img.style.objectPosition='center';img.removeAttribute('loading');}
  const label=card.querySelector('.pub-action span');if(label)label.textContent=title;
});

// Logos tratadas para o layout: fundos removidos e apresentação mais editorial.
const brandLogoIds={waves:'1Q-0tCm3lUd9UbF_8HNog1rY94i54BTPM',cbs:'1VDoLECtsdJZoN4TzS2zNGQ5yvirpUjUD',jardim:'1upXAsmpQZTot1DjaKjaJn1cYHcWTSYvs'};
const brandImg=(id,alt,cls='')=>`<img class="${cls}" src="https://drive.google.com/thumbnail?id=${id}&sz=w1000" alt="${alt}">`;
const brandPair=()=>`<div class="site-brand-pair"><div class="brand-logo-unit waves-unit">${brandImg(brandLogoIds.waves,'Waves Plus')}</div><span class="brand-divider"></span><div class="brand-logo-unit cbs-unit">${brandImg(brandLogoIds.cbs,'CBS Importadora')}</div></div>`;
const jardimLogo=()=>`<div class="site-jardim-logo">${brandImg(brandLogoIds.jardim,'Jardim do Éden')}</div>`;
function applyCaseBranding(){
  const wavesStage=document.querySelector('.case-warm .event-stage');
  if(wavesStage&&!wavesStage.querySelector('.site-brand-pair')){wavesStage.innerHTML=brandPair();}
  const jardimVisual=document.querySelector('.case-blue .case-visual');
  if(jardimVisual&&!jardimVisual.querySelector('.site-jardim-logo')){jardimVisual.insertAdjacentHTML('afterbegin',jardimLogo());}
  const expoHero=document.querySelector('#expoModal .expo-hero>div:first-child');
  if(expoHero&&!expoHero.querySelector('.site-brand-pair'))expoHero.insertAdjacentHTML('afterbegin',brandPair());
  const jardimHero=document.querySelector('#jardimModal .jardim-hero>div:first-child');
  if(jardimHero&&!jardimHero.querySelector('.site-jardim-logo'))jardimHero.insertAdjacentHTML('afterbegin',jardimLogo());
  // substitui qualquer versão anterior das logos pelas versões transparentes.
  document.querySelectorAll('img[src*="18GvN_4y2CuDZTY1vSUOu5EFuHR6hp1Un"]').forEach(i=>i.src=`https://drive.google.com/thumbnail?id=${brandLogoIds.waves}&sz=w1000`);
  document.querySelectorAll('img[src*="10tcIZeG0Oa3GVheAhRb10ViRL2o8pL4l"]').forEach(i=>i.src=`https://drive.google.com/thumbnail?id=${brandLogoIds.cbs}&sz=w1000`);
}

// Hero: a arte conceitual passa a ser atmosfera de fundo, não um segundo bloco competindo com a mensagem.
function applyHeroBackground(){
  const hero=document.querySelector('.hero');
  if(!hero||hero.classList.contains('hero-cinematic-bg'))return;
  hero.classList.add('hero-cinematic-bg');
  const visual=hero.querySelector('.hero-portrait-wrap');
  if(visual)visual.setAttribute('aria-hidden','true');
}

if(!document.querySelector('#brand-logo-style')){
  const style=document.createElement('style');style.id='brand-logo-style';style.textContent=`
  .site-brand-pair{display:flex;align-items:center;justify-content:center;gap:24px;width:100%;position:relative;z-index:3}
  .brand-logo-unit{height:118px;flex:1;display:flex;align-items:center;justify-content:center;padding:8px 12px}
  .brand-logo-unit img{display:block;max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;filter:drop-shadow(0 12px 24px rgba(0,0,0,.28))}
  .brand-divider{width:1px;height:74px;background:linear-gradient(180deg,transparent,rgba(255,255,255,.38),transparent);flex:0 0 1px}
  .case-warm .event-stage{background:radial-gradient(circle at 48% 45%,rgba(245,185,63,.12),transparent 45%),linear-gradient(145deg,#17191d,#0b0c0f)!important}
  .case-warm .event-stage .site-brand-pair{padding:26px 28px;width:90%;border:1px solid rgba(255,255,255,.1);background:rgba(8,10,13,.7);backdrop-filter:blur(14px);border-radius:22px;box-shadow:0 22px 50px rgba(0,0,0,.3)}
  .case-blue .case-visual{gap:22px}.site-jardim-logo{display:flex;justify-content:center;width:100%;position:relative;z-index:3}.site-jardim-logo img{width:min(330px,82%);max-height:150px;object-fit:contain;filter:drop-shadow(0 12px 24px rgba(0,0,0,.25))}
  #expoModal .expo-hero .site-brand-pair{justify-content:flex-start;padding:0 0 28px;max-width:610px}#expoModal .expo-hero .brand-logo-unit{height:92px;flex:0 1 250px;padding:0 8px}#expoModal .expo-hero .brand-divider{height:58px}
  #jardimModal .jardim-hero .site-jardim-logo{justify-content:flex-start;margin-bottom:24px}#jardimModal .jardim-hero .site-jardim-logo img{width:min(360px,72%);max-height:145px}

  .hero.hero-cinematic-bg{position:relative;isolation:isolate;overflow:hidden;min-height:94vh;background-image:linear-gradient(90deg,rgba(5,7,11,.96) 0%,rgba(5,7,11,.91) 34%,rgba(5,7,11,.66) 58%,rgba(5,7,11,.28) 78%,rgba(5,7,11,.18) 100%),linear-gradient(180deg,rgba(8,9,11,.1),rgba(8,9,11,.32)),url('https://drive.google.com/thumbnail?id=1nbzzIDwlO2VgcfMIOjEOc8G1oOOjd0fl&sz=w2400');background-size:cover;background-position:center center;background-repeat:no-repeat}
  .hero.hero-cinematic-bg:after{content:'';position:absolute;inset:0;z-index:-1;background:linear-gradient(180deg,transparent 62%,#08090b 100%);pointer-events:none}
  .hero.hero-cinematic-bg .hero-kicker,.hero.hero-cinematic-bg .hero-v2{position:relative;z-index:2}
  .hero.hero-cinematic-bg .hero-v2{display:block!important;max-width:980px}
  .hero.hero-cinematic-bg .hero-copy-col{max-width:940px;padding:28px 0 42px}
  .hero.hero-cinematic-bg .hero-portrait-wrap{display:none!important}
  .hero.hero-cinematic-bg h1{max-width:940px;text-shadow:0 5px 36px rgba(0,0,0,.55)}
  .hero.hero-cinematic-bg h1 span{color:#aeb6c2}
  .hero.hero-cinematic-bg .hero-copy{max-width:700px;color:#d1d6de;text-shadow:0 2px 15px rgba(0,0,0,.45)}
  .hero.hero-cinematic-bg .eyebrow{color:#6fb8ff}
  .hero.hero-cinematic-bg .button.ghost{background:rgba(9,12,17,.38);backdrop-filter:blur(10px);border-color:rgba(255,255,255,.23)}
  @media(max-width:700px){
    .site-brand-pair{gap:10px}.brand-logo-unit{height:76px;padding:4px}.brand-divider{height:50px}.site-jardim-logo img{max-height:95px}.case-blue .case-visual{gap:10px}
    .hero.hero-cinematic-bg{min-height:86vh;background-position:62% center;background-image:linear-gradient(90deg,rgba(5,7,11,.96) 0%,rgba(5,7,11,.88) 55%,rgba(5,7,11,.55) 100%),url('https://drive.google.com/thumbnail?id=1nbzzIDwlO2VgcfMIOjEOc8G1oOOjd0fl&sz=w1800')}
    .hero.hero-cinematic-bg .hero-copy-col{padding:16px 0 34px}.hero.hero-cinematic-bg .hero-copy{font-size:16px;max-width:92%}
  }
  `;document.head.appendChild(style);
}
applyHeroBackground();
applyCaseBranding();
new MutationObserver(()=>{applyHeroBackground();applyCaseBranding()}).observe(document.body,{childList:true,subtree:true});