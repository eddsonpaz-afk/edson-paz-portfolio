(()=>{
  const PLAYLIST='PL_KA2HDrxmB89DMc8-VAtkiqUaJKhVTgM';
  const YT_URL=`https://youtube.com/playlist?list=${PLAYLIST}`;
  const build=()=>{
    const target=document.querySelector('#projetos');
    if(!target)return;
    document.querySelector('#motion')?.remove();
    const section=document.createElement('section');
    section.id='motion';
    section.className='motion-hub section-pad';
    section.innerHTML=`
      <div class="motion-head">
        <div><div class="section-label">[ MOTION / CONTEÚDO ]</div><h2>IDEIAS SE MOVEM.<br><span>E TAMBÉM GANHAM FORMA.</span></h2></div>
        <p>Todo o audiovisual em um só lugar — e, logo abaixo, as campanhas e peças visuais organizadas por marca.</p>
      </div>

      <section class="video-library">
        <div class="hub-subhead"><div><small>01 / PORTFÓLIO AUDIOVISUAL</small><h3>Todos os vídeos.<br><span>Sem separar o que não precisa.</span></h3></div><a href="${YT_URL}" target="_blank" rel="noopener">ABRIR PLAYLIST COMPLETA ↗</a></div>
        <div class="playlist-frame"><iframe src="https://www.youtube.com/embed/videoseries?list=${PLAYLIST}" title="Portfólio audiovisual de Edson Paz" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
      </section>

      <section class="visual-library">
        <div class="hub-subhead"><div><small>02 / CONTEÚDO VISUAL</small><h3>Campanhas, peças<br><span>e sistemas de criação.</span></h3></div><p>As mesmas coleções visuais dos cases, agora reunidas também aqui.</p></div>
        <nav class="hub-tabs" aria-label="Conteúdo visual por marca">
          <button class="active" data-hub-tab="waves">WAVES / CBS</button>
          <button data-hub-tab="jardim">JARDIM DO ÉDEN</button>
        </nav>
        <div class="hub-panel active" data-hub-panel="waves">
          <div class="hub-brand-intro"><div>${typeof brandPair==='function'?brandPair():''}</div><p>Campanhas organizadas pelo conceito e pelo nome-base das peças.</p></div>
          ${typeof campaignMarkup==='function'?campaignMarkup():''}
        </div>
        <div class="hub-panel" data-hub-panel="jardim">
          <div class="hub-brand-intro"><div>${typeof jardimLogo==='function'?jardimLogo():''}</div><p>Conteúdo e criação apresentados como parte do mesmo sistema de performance.</p></div>
          ${typeof carouselMarkup==='function'?carouselMarkup(jardimPhotos,'JARDIM DO ÉDEN / CONTEÚDO'):''}
        </div>
      </section>`;
    target.parentNode.insertBefore(section,target);

    section.querySelectorAll('[data-hub-tab]').forEach(btn=>btn.addEventListener('click',()=>{
      section.querySelectorAll('[data-hub-tab]').forEach(b=>b.classList.toggle('active',b===btn));
      section.querySelectorAll('[data-hub-panel]').forEach(p=>p.classList.toggle('active',p.dataset.hubPanel===btn.dataset.hubTab));
    }));
    if(typeof initCarousels==='function')initCarousels(section);

    if(!document.querySelector('#motion-hub-style')){
      const s=document.createElement('style');s.id='motion-hub-style';s.textContent=`
      .motion-hub{background:linear-gradient(180deg,#07090d,#0a0d13 55%,#08090b);border-block:1px solid #20252d}.motion-hub .motion-head{display:flex;justify-content:space-between;gap:50px;align-items:end;margin-bottom:54px}.motion-hub .motion-head h2{font:800 clamp(48px,6vw,92px)/.92 Manrope;margin:0;letter-spacing:-.055em}.motion-hub .motion-head h2 span,.hub-subhead h3 span{color:#48a6ff}.motion-hub .motion-head p{max-width:520px;color:#969eaa;line-height:1.7}.video-library,.visual-library{margin-top:40px}.hub-subhead{display:flex;justify-content:space-between;gap:40px;align-items:end;margin-bottom:26px}.hub-subhead small{font:700 10px Inter;letter-spacing:.14em;color:#48a6ff}.hub-subhead h3{font:800 clamp(34px,4.5vw,64px)/.96 Manrope;letter-spacing:-.045em;margin:12px 0 0}.hub-subhead p{max-width:500px;color:#929aa5;line-height:1.65}.hub-subhead>a{color:#fff;text-decoration:none;font:700 11px Inter;letter-spacing:.08em;white-space:nowrap}.playlist-frame{aspect-ratio:16/9;border-radius:28px;overflow:hidden;border:1px solid #26303b;background:#050608;box-shadow:0 30px 90px #0007}.playlist-frame iframe{width:100%;height:100%;border:0}.visual-library{margin-top:110px}.hub-tabs{display:flex;gap:8px;margin:0 0 28px}.hub-tabs button{cursor:pointer;border:1px solid #2b323c;background:#0d1117;color:#9da6b2;border-radius:999px;padding:12px 18px;font:700 10px Inter;letter-spacing:.09em}.hub-tabs button.active{background:#fff;color:#050608;border-color:#fff}.hub-panel{display:none}.hub-panel.active{display:block}.hub-brand-intro{display:grid;grid-template-columns:minmax(260px,420px) 1fr;gap:40px;align-items:center;padding:30px;border:1px solid #242b34;border-radius:22px;background:linear-gradient(145deg,#0d1117,#090b0f);margin-bottom:34px}.hub-brand-intro p{color:#929aa5;line-height:1.6;margin:0}.hub-panel .campaign-list{margin-top:0}.hub-panel .campaign-block{border-top:1px solid #252c35;padding-top:48px;margin-top:48px}.hub-panel .campaign-block:first-child{border-top:0;padding-top:0;margin-top:0}
      @media(max-width:760px){.motion-hub .motion-head,.hub-subhead{display:block}.motion-hub .motion-head h2{font-size:46px}.motion-hub .motion-head p,.hub-subhead>a,.hub-subhead p{display:block;margin-top:18px}.playlist-frame{border-radius:18px}.visual-library{margin-top:78px}.hub-tabs{overflow-x:auto}.hub-tabs button{white-space:nowrap}.hub-brand-intro{grid-template-columns:1fr;padding:20px}.hub-panel .campaign-block{padding-top:34px;margin-top:34px}}
      `;document.head.appendChild(s);
    }
    const nav=document.querySelector('.topbar nav');
    const existing=nav?.querySelector('a[href="#motion"]');
    if(existing)existing.textContent='Vídeos & Conteúdo';
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();