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