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

// Logos oficiais nos cases principais e nas experiências internas.
const brandLogoIds={waves:'18GvN_4y2CuDZTY1vSUOu5EFuHR6hp1Un',cbs:'10tcIZeG0Oa3GVheAhRb10ViRL2o8pL4l',jardim:'1upXAsmpQZTot1DjaKjaJn1cYHcWTSYvs'};
const brandImg=(id,alt,cls='')=>`<img class="${cls}" src="https://drive.google.com/thumbnail?id=${id}&sz=w900" alt="${alt}">`;
const brandPair=()=>`<div class="site-brand-pair">${brandImg(brandLogoIds.waves,'Waves Plus')}${brandImg(brandLogoIds.cbs,'CBS Importadora')}</div>`;
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
}
if(!document.querySelector('#brand-logo-style')){
  const style=document.createElement('style');style.id='brand-logo-style';style.textContent=`
  .site-brand-pair{display:flex;align-items:center;justify-content:center;gap:22px;width:100%;padding:22px;position:relative;z-index:3}
  .site-brand-pair img{display:block;max-width:44%;max-height:118px;width:auto;height:auto;object-fit:contain;filter:drop-shadow(0 12px 20px rgba(0,0,0,.28))}
  .case-warm .event-stage .site-brand-pair{padding:28px;background:rgba(7,8,10,.38);backdrop-filter:blur(5px);border-radius:20px;width:86%}
  .case-blue .case-visual{gap:22px}.site-jardim-logo{display:flex;justify-content:center;width:100%;position:relative;z-index:3}.site-jardim-logo img{width:min(330px,82%);max-height:150px;object-fit:contain;filter:drop-shadow(0 12px 24px rgba(0,0,0,.25))}
  #expoModal .expo-hero .site-brand-pair{justify-content:flex-start;padding:0 0 24px;max-width:560px}#expoModal .expo-hero .site-brand-pair img{max-width:42%;max-height:95px}
  #jardimModal .jardim-hero .site-jardim-logo{justify-content:flex-start;margin-bottom:24px}#jardimModal .jardim-hero .site-jardim-logo img{width:min(360px,72%);max-height:145px}
  @media(max-width:700px){.site-brand-pair{gap:10px;padding:12px}.site-brand-pair img{max-width:47%;max-height:74px}.site-jardim-logo img{max-height:95px}.case-blue .case-visual{gap:10px}}
  `;document.head.appendChild(style);
}
applyCaseBranding();
new MutationObserver(applyCaseBranding).observe(document.body,{childList:true,subtree:true});