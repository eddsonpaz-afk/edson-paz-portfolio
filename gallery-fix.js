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

const publicationCovers={ubvp:['1XqNEAGe7nOH7OEdDXYB5Guvn0f7orLeR','Plano Diretor de Crescimento Comercial 2026–2028'],gxgr:['1YvIa5uPK2jdLe2pSnHkjW-XMhevwpIjQ','Produtividade Profissional'],zrki:['1MJB0BTnI2PYyxKI3pRmMTzSXWFY4UExT','ExpoConstruir 2026 — Operação Pós-Feira'],nuhj:['1iJri_tzj91ti1Ith1OHeVdsaUq_hjhdP','ExpoConstruir 2026 — Onda de Oportunidades']};
document.querySelectorAll('.pub-card[data-book]').forEach(card=>{const data=publicationCovers[card.dataset.book];if(!data)return;const[id,title]=data,img=card.querySelector('.pub-cover img');if(img){img.src=`https://drive.google.com/thumbnail?id=${id}&sz=w1600`;img.alt=title;img.style.objectFit='cover';img.style.objectPosition='center';img.removeAttribute('loading')}const label=card.querySelector('.pub-action span');if(label)label.textContent=title});

const brandLogoIds={waves:'1Q-0tCm3lUd9UbF_8HNog1rY94i54BTPM',cbs:'1VDoLECtsdJZoN4TzS2zNGQ5yvirpUjUD',jardim:'1upXAsmpQZTot1DjaKjaJn1cYHcWTSYvs'};
const brandImg=(id,alt,cls='')=>`<img class="${cls}" src="https://drive.google.com/thumbnail?id=${id}&sz=w1000" alt="${alt}">`;
const brandPair=()=>`<div class="site-brand-pair"><div class="brand-logo-unit waves-unit">${brandImg(brandLogoIds.waves,'Waves Plus')}</div><span class="brand-divider"></span><div class="brand-logo-unit cbs-unit">${brandImg(brandLogoIds.cbs,'CBS Importadora')}</div></div>`;
const jardimLogo=()=>`<div class="site-jardim-logo">${brandImg(brandLogoIds.jardim,'Jardim do Éden')}</div>`;
function applyCaseBranding(){
  const wavesStage=document.querySelector('.case-warm .event-stage'); if(wavesStage&&!wavesStage.querySelector('.site-brand-pair'))wavesStage.innerHTML=brandPair();
  const jardimVisual=document.querySelector('.case-blue .case-visual'); if(jardimVisual&&!jardimVisual.querySelector('.site-jardim-logo'))jardimVisual.insertAdjacentHTML('afterbegin',jardimLogo());
  const expoHero=document.querySelector('#expoModal .expo-hero>div:first-child'); if(expoHero&&!expoHero.querySelector('.site-brand-pair'))expoHero.insertAdjacentHTML('afterbegin',brandPair());
  const jardimHero=document.querySelector('#jardimModal .jardim-hero>div:first-child'); if(jardimHero&&!jardimHero.querySelector('.site-jardim-logo'))jardimHero.insertAdjacentHTML('afterbegin',jardimLogo());
}

const HERO_ART='18sHen7V4rX81XtqET5avjUTl0jzbcbBe';
function applyHeroArtwork(){
  const hero=document.querySelector('.hero'); if(!hero||hero.classList.contains('hero-artwork-full'))return;
  hero.classList.remove('hero-cinematic-bg'); hero.classList.add('hero-artwork-full');
  hero.innerHTML=`<img class="hero-art-image" src="https://drive.google.com/thumbnail?id=${HERO_ART}&sz=w2600" alt="Edson Paz — marketing, performance, campanhas e produtos digitais"><div class="hero-art-actions"><a class="button primary magnetic" href="#cases">EXPLORAR CASES ↘</a><a class="button ghost magnetic" href="#produtos">VER PRODUTOS DIGITAIS</a></div>`;
}

const YT_PLAYLIST='PL_KA2HDrxmB89DMc8-VAtkiqUaJKhVTgM';
const YT_URL=`https://youtube.com/playlist?list=${YT_PLAYLIST}`;
function buildMotionSection(){
  if(document.querySelector('#motion'))return;
  const target=document.querySelector('#projetos'); if(!target)return;
  const section=document.createElement('section'); section.id='motion'; section.className='motion-section section-pad';
  section.innerHTML=`
    <div class="motion-head"><div><div class="section-label">[ MOTION / AUDIOVISUAL ]</div><h2>IDEIAS SE MOVEM.<br><span>HISTÓRIAS TAMBÉM.</span></h2></div><p>Campanhas, produtos, eventos, conteúdo social e experimentação audiovisual reunidos em uma experiência própria.</p></div>
    <div class="motion-categories"><button class="active">PORTFÓLIO AUDIOVISUAL</button><button>REELS / SOCIAL</button><button>CAMPANHAS</button><button>PRODUTOS</button><button>EVENTOS</button></div>
    <div class="motion-showreel"><div class="motion-showreel-visual youtube-live"><iframe src="https://www.youtube.com/embed/videoseries?list=${YT_PLAYLIST}" title="Portfólio audiovisual de Edson Paz" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe><div class="motion-showreel-copy yt-copy"><small>PLAYLIST / PORTFÓLIO AUDIOVISUAL</small><h3>Trabalho que também<br>se vê em movimento.</h3><a href="${YT_URL}" target="_blank" rel="noopener">VER PLAYLIST COMPLETA NO YOUTUBE ↗</a></div></div></div>
    <div class="motion-format-intro"><div><small>VÍDEO / CAMPANHAS / SOCIAL</small><h3>Do conceito<br><span>à tela.</span></h3></div><p>A playlist reúne vídeos de campanhas, produtos, conteúdos sociais e projetos audiovisuais. É possível assistir diretamente aqui ou abrir o acervo completo no YouTube.</p></div>
    <div class="motion-note"><span>PORTFÓLIO EM MOVIMENTO</span><p>O acervo audiovisual fica conectado ao YouTube: novos trabalhos adicionados à playlist passam a fazer parte da experiência sem transformar o site em depósito de arquivos pesados.</p><a href="${YT_URL}" target="_blank" rel="noopener">ABRIR PORTFÓLIO AUDIOVISUAL ↗</a></div>`;
  target.parentNode.insertBefore(section,target);
  const nav=document.querySelector('.topbar nav'); if(nav&&!nav.querySelector('a[href="#motion"]')){const a=document.createElement('a');a.href='#motion';a.textContent='Vídeos';nav.insertBefore(a,nav.querySelector('a[href="#projetos"]'))}
}

if(!document.querySelector('#brand-logo-style')){
  const style=document.createElement('style'); style.id='brand-logo-style'; style.textContent=`
  .site-brand-pair{display:flex;align-items:center;justify-content:center;gap:24px;width:100%;position:relative;z-index:3}.brand-logo-unit{height:118px;flex:1;display:flex;align-items:center;justify-content:center;padding:8px 12px}.brand-logo-unit img{display:block;max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;filter:drop-shadow(0 12px 24px rgba(0,0,0,.28))}.brand-divider{width:1px;height:74px;background:linear-gradient(180deg,transparent,rgba(255,255,255,.38),transparent);flex:0 0 1px}.case-warm .event-stage{background:radial-gradient(circle at 48% 45%,rgba(245,185,63,.12),transparent 45%),linear-gradient(145deg,#17191d,#0b0c0f)!important}.case-warm .event-stage .site-brand-pair{padding:26px 28px;width:90%;border:1px solid rgba(255,255,255,.1);background:rgba(8,10,13,.7);backdrop-filter:blur(14px);border-radius:22px;box-shadow:0 22px 50px rgba(0,0,0,.3)}.case-blue .case-visual{gap:22px}.site-jardim-logo{display:flex;justify-content:center;width:100%;position:relative;z-index:3}.site-jardim-logo img{width:min(330px,82%);max-height:150px;object-fit:contain;filter:drop-shadow(0 12px 24px rgba(0,0,0,.25))}
  .hero.hero-artwork-full{position:relative!important;display:block!important;min-height:0!important;height:auto!important;aspect-ratio:3/2;padding:0!important;overflow:hidden;background:#050608;border-bottom:1px solid #20242b}.hero-art-image{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;display:block}.hero-art-actions{position:absolute;left:50%;bottom:32px;transform:translateX(-50%);z-index:4;display:flex;gap:10px;padding:8px;border:1px solid rgba(255,255,255,.12);border-radius:999px;background:rgba(4,6,9,.62);backdrop-filter:blur(16px)}
  .motion-section{background:linear-gradient(180deg,#07090d,#0a0d13 60%,#08090b);border-top:1px solid #20252d;border-bottom:1px solid #20252d}.motion-head{display:flex;justify-content:space-between;gap:50px;align-items:end;margin-bottom:36px}.motion-head h2{font:800 clamp(48px,6vw,92px)/.92 Manrope;margin:0;letter-spacing:-.055em}.motion-head h2 span,.motion-format-intro h3 span{color:#48a6ff}.motion-head p{max-width:500px;color:#969eaa;line-height:1.7}.motion-categories{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:30px}.motion-categories button{border:1px solid #2b323c;background:#0d1117;color:#9da6b2;border-radius:999px;padding:10px 14px;font:700 10px Inter;letter-spacing:.08em}.motion-categories button.active{background:#fff;color:#050608;border-color:#fff}.motion-showreel{margin-bottom:70px}.motion-showreel-visual{aspect-ratio:16/9;border-radius:28px;position:relative;overflow:hidden;border:1px solid #26303b;background:#050608;box-shadow:0 30px 90px rgba(0,0,0,.35)}.youtube-live iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.yt-copy{position:absolute;left:24px;bottom:24px;z-index:3;padding:18px 20px;border-radius:18px;background:rgba(4,6,9,.82);backdrop-filter:blur(14px);pointer-events:none}.yt-copy h3{font:800 clamp(24px,3vw,42px)/.98 Manrope;margin:8px 0 12px}.yt-copy small{color:#48a6ff;font-weight:700}.yt-copy a,.motion-note a{color:#fff;text-decoration:none;font:700 11px Inter;letter-spacing:.08em;pointer-events:auto}.motion-format-intro{display:grid;grid-template-columns:1.1fr .9fr;gap:70px;align-items:end;margin:70px 0 30px}.motion-format-intro h3{font:800 clamp(36px,4.5vw,64px)/.96 Manrope;letter-spacing:-.045em;margin:14px 0 0}.motion-format-intro p{color:#9099a5;line-height:1.7;max-width:520px}.motion-note{margin-top:30px;border-top:1px solid #252b33;padding-top:24px;display:grid;grid-template-columns:180px 1fr auto;gap:30px;color:#8d96a1;align-items:start}.motion-note span{font:800 10px Inter;letter-spacing:.13em;color:#48a6ff}.motion-note p{margin:0;line-height:1.65;max-width:800px}
  @media(max-width:760px){.hero.hero-artwork-full{aspect-ratio:auto;height:min(78vh,700px)!important;min-height:520px!important}.hero-art-image{object-fit:cover;object-position:center}.hero-art-actions{left:14px;right:14px;bottom:18px;transform:none;display:grid;border-radius:18px}.hero-art-actions .button{justify-content:center}.motion-head{display:block}.motion-head h2{font-size:46px}.motion-head p{margin-top:20px}.motion-showreel-visual{aspect-ratio:9/16;min-height:0;border-radius:20px}.youtube-live iframe{width:100%;height:100%}.yt-copy{left:12px;right:12px;bottom:12px;padding:14px}.yt-copy h3{font-size:25px}.motion-format-intro{grid-template-columns:1fr;gap:18px;margin-top:55px}.motion-note{grid-template-columns:1fr;gap:12px}.site-brand-pair{gap:10px}.brand-logo-unit{height:82px;padding:5px}.brand-divider{height:48px}.case-warm .event-stage .site-brand-pair{padding:16px;width:94%}}
  `; document.head.appendChild(style);
}

applyCaseBranding(); applyHeroArtwork(); buildMotionSection();
