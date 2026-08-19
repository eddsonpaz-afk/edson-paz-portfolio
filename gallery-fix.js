// Correção de carregamento das provas visuais dos projetos.
// O preview do Google Drive é mais estável do que o endpoint de thumbnail em produção.
const drivePreview=id=>`https://drive.google.com/file/d/${id}/preview`;
const driveOriginal=id=>`https://drive.google.com/file/d/${id}/view`;

openGallery=function(key){
  ensureGallery();
  const p=projectData[key],g=q('#projectGallery');
  if(!p||!g)return;
  g.querySelector('.gallery-kicker').textContent=p.kicker;
  g.querySelector('.gallery-title').textContent=p.title;
  g.querySelector('.gallery-desc').textContent=p.desc;
  g.querySelector('.gallery-cta').innerHTML=p.url?`<a class="product-live gallery-live" href="${p.url}" target="_blank" rel="noopener noreferrer">TESTAR PROJETO AO VIVO ↗</a>`:'';
  g.querySelector('.gallery-grid').innerHTML=p.images?.length?p.images.map(([asset,caption],i)=>{
    const id=assets[asset];
    const wide=p.images.length===1||(i===0&&key==='onda');
    return `<figure class="gallery-proof ${wide?'wide':''}"><div class="drive-preview"><iframe src="${drivePreview(id)}" title="${caption}" loading="lazy" allowfullscreen></iframe></div><figcaption><span>${caption}</span><a href="${driveOriginal(id)}" target="_blank" rel="noopener noreferrer">ABRIR ORIGINAL ↗</a></figcaption></figure>`;
  }).join(''):`<div class="gallery-empty">Projeto disponível para teste ao vivo.</div>`;
  g.classList.add('open');
  g.setAttribute('aria-hidden','false');
  document.body.classList.add('modal-open');
};

// Fallback para imagens dos cards caso o endpoint de thumbnail do Drive falhe.
qa('img[src*="drive.google.com/thumbnail"]').forEach(img=>{
  img.addEventListener('error',()=>{
    const match=img.src.match(/[?&]id=([^&]+)/);
    if(!match)return;
    img.src=`https://drive.google.com/uc?export=view&id=${match[1]}`;
  },{once:true});
});
