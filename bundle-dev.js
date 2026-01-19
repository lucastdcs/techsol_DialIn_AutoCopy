(()=>{var ut="",mt="",Wt=t=>new Promise(e=>setTimeout(e,t));async function Yt(){if(ut&&mt)return ut;try{let t=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!t)return"Agente";t.click(),await Wt(150);let e="Consultor",n=document.querySelector("profile-details .name");if(n)e=n.textContent.trim().split(" ")[0],e=e.charAt(0).toUpperCase()+e.slice(1).toLowerCase();else{let s=document.querySelector("profile-details img");if(s&&s.src.includes("/photos/")){let i=s.src.match(/\/photos\/([^\?]+)/)[1];e=i.charAt(0).toUpperCase()+i.slice(1)}}let o=document.querySelector("profile-details .email");return o&&(mt=o.textContent.trim(),console.log("TechSol: Identidade confirmada ->",mt)),t.click(),document.body.click(),ut=e,e}catch(t){return console.warn("Sherlock falhou:",t),"Consultor"}}function It(){return ut||"Consultor"}function Xt(){return mt||null}function Kt(t){let e=new Date,n=e.getHours(),o=e.getDay(),s="Ol\xE1",i="";n>=5&&n<12?(s="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):n>=12&&n<18?(s="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(s="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let a=[];n>=0&&n<5?a=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:n<12?o===1?a=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:o===5?a=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:a=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:n<18?a=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:a=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(o===0||o===6)&&(a=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let r=a[Math.floor(Math.random()*a.length)];return{prefix:`${s},`,name:t,suffix:r,icon:i,isFriday:o===5}}async function Io(){try{let e=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!e)return null;let n=e.parentElement,o=n.querySelector(".unmask-button")||n.querySelector('[aria-label="Click to view"]');o&&(o.click(),await Wt(500));let i=Array.from(n.querySelectorAll("a, span, div, pii-value")).find(a=>{let r=a.innerText.trim();return r.includes("@")&&!r.includes("Is this:")&&r.toLowerCase()!=="email"});return i?i.innerText.trim():null}catch(t){return console.warn("Erro ao capturar email do cliente:",t),null}}function Mo(){try{let t=document.querySelector('material-input[debug-id="account-id-input"]');if(t){let e=t.querySelector("input");if(e){let n=e.value.trim();if(n)return n.includes("@")?n:`${n}@google.com`}}}catch(t){console.warn("Erro ao capturar email interno:",t)}return null}async function at(){let t="Cliente",e="[INSERIR URL]";try{let i=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(i&&i.nextElementSibling){let a=i.nextElementSibling.innerText.trim();a&&(t=a)}}catch(s){console.warn("Falha Nome:",s)}try{let i=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(i&&i.nextElementSibling){let a=i.nextElementSibling.innerText.trim();a&&(e=a)}}catch(s){console.warn("Falha URL:",s)}let n=await Io(),o=Mo();return{advertiserName:t,websiteUrl:e,clientEmail:n,internalEmail:o,agentName:It()}}var Ue=null,Mt=null,_e=.3;function $e(){if(!Ue){let t=window.AudioContext||window.webkitAudioContext;t&&(Ue=new t)}return Ue&&Ue.state==="suspended"&&Ue.resume(),Ue}function Qt(t){if(Mt)return Mt;let e=t.sampleRate*2,n=t.createBuffer(1,e,t.sampleRate),o=n.getChannelData(0);for(let s=0;s<e;s++)o[s]=Math.random()*2-1;return Mt=n,n}var ie={playClick:()=>{let t=$e();if(!t)return;let e=t.currentTime,n=t.createBufferSource();n.buffer=Qt(t);let o=t.createBiquadFilter();o.type="highpass",o.frequency.value=4e3;let s=t.createGain();s.gain.setValueAtTime(_e*.8,e),s.gain.exponentialRampToValueAtTime(.001,e+.015),n.connect(o),o.connect(s),s.connect(t.destination),n.start(e),n.stop(e+.02)},playHover:()=>{let t=$e();if(!t)return;let e=t.currentTime,n=t.createOscillator();n.type="sine",n.frequency.setValueAtTime(400,e);let o=t.createGain();o.gain.setValueAtTime(0,e),o.gain.linearRampToValueAtTime(_e*.1,e+.005),o.gain.linearRampToValueAtTime(0,e+.02),n.connect(o),o.connect(t.destination),n.start(e),n.stop(e+.03)},playSuccess:()=>{let t=$e();if(!t)return;let e=t.currentTime;[1046.5,1567.9].forEach((o,s)=>{let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o,a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(_e*.6,e+.05),a.gain.exponentialRampToValueAtTime(.001,e+.6),i.connect(a),a.connect(t.destination),i.start(e),i.stop(e+.7)})},playGenieOpen:()=>{let t=$e();if(!t)return;let e=t.currentTime,n=t.createBufferSource();n.buffer=Qt(t);let o=t.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(100,e),o.frequency.exponentialRampToValueAtTime(800,e+.2);let s=t.createGain();s.gain.setValueAtTime(0,e),s.gain.linearRampToValueAtTime(_e*.5,e+.05),s.gain.linearRampToValueAtTime(0,e+.25),n.connect(o),o.connect(s),s.connect(t.destination),n.start(e),n.stop(e+.3)},playError:()=>{let t=$e();if(!t)return;let e=t.currentTime,n=t.createOscillator(),o=t.createGain();n.type="triangle",n.frequency.setValueAtTime(120,e),n.frequency.exponentialRampToValueAtTime(80,e+.1),o.gain.setValueAtTime(_e,e),o.gain.exponentialRampToValueAtTime(.001,e+.15),n.connect(o),o.connect(t.destination),n.start(e),n.stop(e+.2)},playStartup:()=>{let t=$e();if(!t)return;let e=t.currentTime,n=.12,o=t.createOscillator(),s=t.createGain(),i=t.createBiquadFilter();o.type="square",o.frequency.setValueAtTime(400,e),o.frequency.exponentialRampToValueAtTime(50,e+.1),i.type="lowpass",i.frequency.setValueAtTime(800,e),i.frequency.exponentialRampToValueAtTime(100,e+.1),s.gain.setValueAtTime(_e*4,e),s.gain.exponentialRampToValueAtTime(.001,e+.1),o.connect(i),i.connect(s),s.connect(t.destination),o.start(e),o.stop(e+.12);let a=t.createOscillator(),r=t.createGain();a.type="sine",a.frequency.setValueAtTime(150,e),a.frequency.exponentialRampToValueAtTime(50,e+.15),r.gain.setValueAtTime(_e*1.5,e),r.gain.exponentialRampToValueAtTime(.001,e+.15),a.connect(r),r.connect(t.destination),a.start(e),a.stop(e+.15),[55,55.4,110.5].forEach(d=>{let g=t.createOscillator(),b=t.createGain(),h=t.createBiquadFilter();g.type="sawtooth",g.frequency.value=d,h.type="lowpass",h.frequency.setValueAtTime(30,e),h.frequency.linearRampToValueAtTime(900,e+n+.2),h.frequency.exponentialRampToValueAtTime(40,e+3),b.gain.setValueAtTime(0,e),b.gain.linearRampToValueAtTime(_e*.6,e+n+.1),b.gain.exponentialRampToValueAtTime(.001,e+3.5),g.connect(h),h.connect(b),b.connect(t.destination),g.start(e),g.stop(e+3.6)})},playNotification:()=>{let t=$e();if(!t)return;let e=t.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(o=>{let s=t.createOscillator(),i=t.createGain();s.type="sine",s.frequency.setValueAtTime(o.freq,e),i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(_e*o.vol,e+.004),i.gain.exponentialRampToValueAtTime(.001,e+o.dur),s.connect(i),i.connect(t.destination),s.start(e),s.stop(e+o.dur+.1)})},playSwoosh:()=>{ie.playGenieOpen()},playReset:()=>{ie.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let t=0,e=50;document.addEventListener("mouseover",n=>{if(!Ue)return;let o=n.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!o||o.contains(n.relatedTarget))return;let s=Date.now();s-t<e||(ie.playHover(),t=s)},{passive:!0})}};var Zt=1e4;function eo(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let t=document.createElement("link");t.id="google-font-roboto",t.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",t.rel="stylesheet",document.head.appendChild(t);let e=document.createElement("style");e.id="techsol-global-styles",e.textContent=`
        :root {
            --cw-primary: #1a73e8;
            --cw-primary-hover: #1557b0;
            --cw-surface: #ffffff;
            --cw-surface-glass: rgba(255, 255, 255, 0.95);
            --cw-border: #dadce0;
            --cw-text: #202124;
            --cw-text-sub: #5f6368;
            --cw-ease-elastic: cubic-bezier(0.25, 0.8, 0.25, 1);
        }

        /* Rollbar e Ajustes Globais */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.2); border-radius: 10px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,0,0,0.4); }
        
        /* FONTE GOOGLE OFICIAL & RENDERING APPLE */
        body, button, input, select, textarea, .cw-pill, .cw-module, .cw-btn::after {
            font-family: 'Google Sans', 'Roboto', sans-serif !important;
            -webkit-font-smoothing: antialiased;
        }

        /* FOCUS STATES (Anel Google) */
        input:focus, textarea:focus, select:focus {
            outline: none !important;
            border-color: var(--cw-primary) !important;
            box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2) !important;
        }

        /* FEEDBACK T\xC1TIL GLOBAL (Clique F\xEDsico) */
        button:active, .cw-clickable:active { 
            transform: scale(0.96) translateY(1px); 
            transition: transform 0.1s var(--cw-ease-elastic);
        }

        textarea.bullet-textarea { padding-left: 10px; }
        
        /* Classes utilit\xE1rias do Script Assistant (Refinadas) */
        .csa-group-container { border-left: 3px solid transparent; padding-left: 8px; transition: all 0.3s ease-out; }
        .csa-group-title { transition: color 0.3s ease-out; }
        .csa-group-container.csa-group-completed { border-left: 3px solid #34a853; }
        .csa-group-container.csa-group-completed .csa-group-title { color: #34a853; }
        
        .csa-li { 
            margin: 6px 0 !important; 
            padding: 10px 12px; border-radius: 8px; 
            border: 1px solid transparent;
            transition: all 0.2s var(--cw-ease-elastic); 
            font-size: 14px; cursor: pointer; user-select: none;
            background-color: #f8f9fa; color: var(--cw-text); line-height: 1.4;
            text-decoration: none; transform: scale(1);
        }
        .csa-li:hover { 
            background-color: #e8f0fe; 
            color: var(--cw-primary);
            transform: translateX(4px); 
        }
        .csa-li.csa-completed { 
            text-decoration: line-through; 
            color: var(--cw-text-sub); 
            opacity: 0.7;
            background: transparent;
            border: 1px dashed var(--cw-border);
        }

        /* Classe base para todos os selects do projeto */
    .cw-select {
        /* 1. Resetando o estilo nativo (O segredo) */
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        
        /* 2. Dimens\xF5es e Fonte */
        width: 100%;
        padding: 10px 36px 10px 12px; /* Espa\xE7o extra na direita para a seta */
        font-family: 'Google Sans', Roboto, Arial, sans-serif;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.5;
        color: #3C4043; /* Google Grey 800 */
        
        /* 3. A Caixa (Material Design) */
        background-color: #FFFFFF;
        border: 1px solid #DADCE0; /* Borda suave */
        border-radius: 6px; /* Canto levemente arredondado */
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        
        /* 4. A Seta Customizada (SVG via Data URI) */
        /* Isso desenha um chevron cinza escuro, igual ao do Gmail */
        background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235F6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E");
        background-repeat: no-repeat;
        background-position: right 8px center;
        background-size: 18px;
    }

    /* Hover: Escurece levemente a borda e o fundo */
    .cw-select:hover {
        border-color: #202124;
        background-color: #F8F9FA;
    }

    /* Focus: O anel azul caracter\xEDstico do Google */
    .cw-select:focus {
        border-color: #1A73E8;
        box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
        outline: none;
        background-color: #FFFFFF;
    }

    /* Disabled: Visual apagado */
    .cw-select:disabled {
        background-color: #F1F3F4;
        color: #9AA0A6;
        cursor: not-allowed;
        background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%239AA0A6%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E");
    }
    
    /* Label flutuante (Opcional, se voc\xEA usar labels acima dos selects) */
    .cw-input-label {
        display: block;
        font-size: 12px;
        font-weight: 700;
        color: #5F6368;
        margin-bottom: 6px;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
        /* Container do Dropdown Customizado */
.cw-dropdown-container {
    position: relative;
    width: 100%;
    font-family: 'Google Sans', Roboto, sans-serif;
}

/* O Bot\xE3o (A caixa fechada) */
.cw-dropdown-trigger {
    background: #fff;
    border: 1px solid #DADCE0;
    border-radius: 6px;
    padding: 10px 12px;
    font-size: 14px;
    color: #3C4043;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.2s;
}
.cw-dropdown-trigger:hover { background: #F8F9FA; border-color: #202124; }
.cw-dropdown-trigger.active { 
    border-color: #1A73E8; 
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2); 
}
.cw-dropdown-trigger.disabled { 
    background: #F1F3F4; color: #9AA0A6; pointer-events: none; 
}

/* A Seta */
.cw-dropdown-arrow {
    width: 18px; height: 18px;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%235F6368' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: center;
    transition: transform 0.2s;
}
.cw-dropdown-trigger.active .cw-dropdown-arrow { transform: rotate(180deg); }

/* A Lista (O menu aberto) */
.cw-dropdown-menu {
    position: absolute;
    top: 100%; left: 0; width: 100%;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0 4px 6px rgba(32,33,36,0.28);
    margin-top: 4px;
    padding: 6px 0;
    z-index: 9999;
    display: none;
    max-height: 250px;
    overflow-y: auto;
    opacity: 0; transform: translateY(-10px);
    transition: opacity 0.2s, transform 0.2s;
}
.cw-dropdown-menu.open { 
    display: block; 
    opacity: 1; transform: translateY(0); 
}

/* As Op\xE7\xF5es */
.cw-dropdown-option {
    padding: 10px 16px;
    font-size: 14px;
    color: #3C4043;
    cursor: pointer;
    transition: background 0.1s;
}
.cw-dropdown-option:hover { background-color: #F1F3F4; }
.cw-dropdown-option.selected { 
    color: #1A73E8; 
    background-color: #E8F0FE; 
    font-weight: 500;
}
    `,document.head.appendChild(e)}function K(t,e={}){let n=document.createElement("div"),o=e.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(n.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:o,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),n.textContent=t,document.body.appendChild(n),e.error?ie.playError():ie.playSuccess(),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>n.remove(),400)},e.duration||4e3)}function to(t,e=null){let n=0,o=0,s=0,i=0,a=e||t;a.style.cursor="grab",a.onmousedown=r;function r(g){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(g.target.tagName)||g.target.closest(".no-drag"))return;g=g||window.event,a.style.cursor="grabbing",t.style.transition="none";let b=t.getBoundingClientRect();t.style.transform="none",t.style.left=b.left+"px",t.style.top=b.top+"px",t.style.margin="0",t.style.bottom="auto",t.style.right="auto",Zt++,t.style.zIndex=Zt,s=g.clientX,i=g.clientY,t.setAttribute("data-dragging","true"),document.onmouseup=d,document.onmousemove=c}function c(g){g=g||window.event,g.preventDefault(),n=s-g.clientX,o=i-g.clientY,s=g.clientX,i=g.clientY;let b=t.offsetTop-o,h=t.offsetLeft-n,u=16,p=window.innerWidth,T=window.innerHeight,k=t.offsetWidth,D=t.offsetHeight;h<u?h=u:h+k>p-u&&(h=p-k-u),b<u?b=u:b+D>T-u&&(b=T-D-u),t.style.top=b+"px",t.style.left=h+"px"}function d(){document.onmouseup=null,document.onmousemove=null,a.style.cursor="grab",setTimeout(()=>{t.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",t.setAttribute("data-dragging","false"),t.setAttribute("data-moved","true")},50)}}var Te={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var _t={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},oo={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var no={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var ye={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var Nt=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],Jt=-1;function it(){let t=Math.floor(Math.random()*Nt.length);return t===Jt&&(t=(t+1)%Nt.length),Jt=t,Nt[t]}var Le=t=>new Promise(e=>setTimeout(e,t));async function No(t,e){if(!t)return;t.style.opacity="1",t.innerHTML='<span class="cursor">|</span>';let n=t.querySelector(".cursor");await Le(200);for(let o=0;o<e.length;o++){let s=e.charAt(o),i=document.createElement("span");i.textContent=s,n&&n.parentNode===t?n.before(i):t.appendChild(i);let a=Math.floor(Math.random()*60)+30;o===0&&(a=150),o>e.length-3&&(a=30),await Le(a)}await Le(600),n&&(n.style.display="none")}async function Lt(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let e=document.createElement("style");e.id="google-splash-style",e.innerHTML=`
            @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&display=swap');
            .splash-container { font-family: 'Google Sans', sans-serif; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background-color: #202124; z-index: 2147483647; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.5s cubic-bezier(0.4, 0.0, 0.2, 1); }
            .splash-exit { animation: focus-out 0.9s cubic-bezier(0.4, 0.0, 0.2, 1) forwards; }
            @keyframes focus-out { 0% { opacity: 1; transform: scale(1); filter: blur(0); } 100% { opacity: 0; transform: scale(1.15); filter: blur(15px); } }
            
            .sentence-wrapper { display: flex; flex-wrap: wrap; justify-content: center; align-items: baseline; gap: 10px; max-width: 80%; position: relative; }
            .text-part { font-size: 32px; color: #E8EAED; opacity: 0; transition: opacity 0.8s ease; }
            .text-name { font-size: 32px; font-weight: 700; background: linear-gradient(90deg, #8AB4F8, #C58AF9, #F28B82); -webkit-background-clip: text; -webkit-text-fill-color: transparent; opacity: 0; }
            .text-footer { font-size: 20px; color: #9AA0A6; font-weight: 400; width: 100%; text-align: center; margin-top: 12px; opacity: 0; transform: translateY(10px); transition: all 1s cubic-bezier(0.0, 0.0, 0.2, 1); }
            
            .sextou-badge { display: inline-flex; align-items: center; gap: 6px; margin-top: 16px; padding: 6px 16px; border-radius: 20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #F28B82; font-size: 14px; font-weight: 500; opacity: 0; transform: scale(0.8); transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1); }
            .cursor { color: #8AB4F8; -webkit-text-fill-color: #8AB4F8; font-weight: 100; margin-left: 1px; animation: blink 1s infinite; }
            
            .brand-logo { position: absolute; top: 40px; font-size: 20px; font-weight: 500; color: #5f6368; letter-spacing: 1px; text-transform: uppercase; opacity: 0; animation: fade-in-down 0.8s ease forwards; }
            .weather-icon { width: 42px; height: 42px; margin-bottom: 24px; opacity: 0; transform: scale(0.8); transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1); }
            .credit-pro { position: absolute; bottom: 30px; font-size: 11px; color: #5f6368; letter-spacing: 0.5px; opacity: 0; animation: fade-in-simple 1.5s ease 1s forwards; }
            .credit-pro span { color: #8AB4F8; font-weight: 500; opacity: 0.9; }
            
            .loader-line { position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background: linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853); transform: scaleX(0); transform-origin: left; animation: load-line 4s linear forwards; }
            
            @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
            @keyframes fade-in-down { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes load-line { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
            @keyframes fade-in-simple { to { opacity: 1; } }
        `,document.head.appendChild(e)}let t=document.createElement("div");t.className="splash-container",t.innerHTML=`
        <div class="brand-logo">Case Wizard</div>
        <div id="w-icon"></div>
        <div class="sentence-wrapper">
            <div id="p1" class="text-part"></div>
            <div id="p2" class="text-name"></div>
            <div id="p3" class="text-footer"></div>
            <div id="p-sextou" style="width: 100%; text-align: center; display: none;">
                <div class="sextou-badge">\u{1F389} Sextou!</div>
            </div>
        </div>
        <div class="credit-pro">created by <span>@lucaste</span></div>
        <div class="loader-line"></div>
    `,document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1");try{await Le(200);let e=await Yt(),n=Kt(e),o=t.querySelector("#w-icon"),s=t.querySelector("#p1"),i=t.querySelector("#p2"),a=t.querySelector("#p3"),r=t.querySelector("#p-sextou");o&&(o.innerHTML=n.icon),s&&(s.textContent=n.prefix),a&&(a.textContent=n.suffix),await Le(300);let c=o?o.querySelector("svg"):null;if(c&&(c.style.opacity="1",c.style.transform="scale(1)"),await Le(400),s&&(s.style.opacity="1"),ie.playStartup(),i&&await No(i,n.name),a&&(a.style.opacity="1",a.style.transform="translateY(0)"),n.isFriday&&r){await Le(400),r.style.display="block",r.offsetWidth;let d=r.querySelector(".sextou-badge");d&&(d.style.opacity="1",d.style.transform="scale(1)")}await Le(1500)}catch(e){console.warn("Splash error, skipping...",e)}finally{t.classList.add("splash-exit"),await Le(900),t.parentNode&&t.parentNode.removeChild(t)}}var Qe={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Ze(t,e){e.onmousedown=n;function n(o){o.stopPropagation(),o.preventDefault();let s=t.style.transition;t.style.transition="none";let i=o.clientX,a=o.clientY,r=parseFloat(getComputedStyle(t,null).getPropertyValue("width").replace("px","")),c=parseFloat(getComputedStyle(t,null).getPropertyValue("height").replace("px","")),d=i,g=a,b=!1;function h(T){d=T.clientX,g=T.clientY,b||(window.requestAnimationFrame(()=>{u(),b=!1}),b=!0)}function u(){let T=r+(d-i),k=c+(g-a);T>360&&(t.style.width=T+"px"),k>300&&(t.style.height=k+"px")}function p(){document.removeEventListener("mousemove",h),document.removeEventListener("mouseup",p),setTimeout(()=>{t.style.transition=s},50)}document.addEventListener("mousemove",h),document.addEventListener("mouseup",p)}e.onmouseenter=()=>e.style.opacity="1",e.onmouseleave=()=>e.style.opacity="0.6"}function ao(t){if(!t)return"";let e={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return t.replace(/:([a-zA-Z0-9-_+]+):/g,n=>e[n]?e[n]:"")}var Je=t=>new Promise(e=>setTimeout(e,t));function st(t){t&&["mousedown","mouseup","click"].forEach(e=>t.dispatchEvent(new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window})))}var io="cw-automation-styles";if(!document.getElementById(io)){let t=document.createElement("style");t.id=io,t.innerHTML=`
        /* Anima\xE7\xE3o da Borda Google */
        @keyframes google-border-spin {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .cw-scanning-active {
            /* Borda gradiente animada */
            border: 2px solid transparent !important;
            border-radius: 8px !important;
            background-image: linear-gradient(#fff, #fff), 
                              linear-gradient(90deg, #4285F4, #EA4335, #FBBC04, #34A853);
            background-origin: border-box;
            background-clip: padding-box, border-box;
            background-size: 200% 200%;
            animation: google-border-spin 1.5s linear infinite;
            box-shadow: 0 4px 15px rgba(66, 133, 244, 0.3) !important;
            
            /* Traz para frente do Overlay */
            position: relative;
            z-index: 1000000 !important; 
            pointer-events: none;
        }

        /* Overlay Limpo (Sem texto, s\xF3 Blur) */
        #cw-loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(255, 255, 255, 0.4); /* Branco Transl\xFAcido */
            backdrop-filter: blur(5px);           /* O Desfoque Apple Glass */
            -webkit-backdrop-filter: blur(5px);
            z-index: 999999;                      /* Fica atr\xE1s do Input (1000000) */
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: all;                  /* Bloqueia cliques na p\xE1gina */
        }
    `,document.head.appendChild(t)}function so(t){let e=document.getElementById("cw-loading-overlay");t?e?e.style.opacity="1":(e=document.createElement("div"),e.id="cw-loading-overlay",document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1")):e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}async function ro(t){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let e=document.getElementById(t),n="";so(!0),e&&(n=e.placeholder,e.placeholder="Buscando ID...",e.value="",e.classList.add("cw-scanning-active"));try{let o=document.querySelector('material-button[debug-id="dock-item-case-log"]');o&&!o.classList.contains("selected")&&(st(o),await Je(1200));let s=document.querySelector("search-filter dropdown-button .button");if(s&&!(s.innerText||"").includes("All")){st(s),await Je(600);let h=document.querySelector('material-checkbox[debug-id="check-all-box"]');h&&h.getAttribute("aria-checked")!=="true"&&(st(h),await Je(300));let u=document.querySelector('material-button[debug-id="apply-filter"]');u&&(st(u),await Je(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await Je(500));let a=Array.from(document.querySelectorAll(".message-header"));for(let b=a.length-1;b>=0;b--){let h=a[b],u=h.querySelector("i.material-icons-extended"),p=u&&u.innerText.trim()==="phone_in_talk",T=h.innerText||"",k=T.includes("Agent joined")||T.includes("outbound-call")||T.includes("Speakeasy");if(p||k){h.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",h),e&&(e.placeholder="Lendo mensagem..."),st(h),await Je(1e3));break}}let c=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),d=/Speakeasy.*?(P\d{15,25})/i,g=null;for(let b=c.length-1;b>=0;b--){let h=c[b];if(h.offsetParent===null)continue;let u=(h.innerText||"").match(d);if(u&&u[1]){g=u[1];break}}if(e)if(g){try{await navigator.clipboard.writeText(g)}catch{}e.value=g,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),ie.playSuccess(),K(`ID Localizado: ${g}`),e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}else ie.playError(),K("Nenhum ID encontrado.",{error:!0}),e.placeholder="N\xE3o encontrado",e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}catch(o){console.error("Erro na automa\xE7\xE3o:",o),K("Erro ao processar.",{error:!0})}finally{e&&(e.classList.remove("cw-scanning-active"),e.value||(e.placeholder=n)),so(!1)}}var Re={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:"}},Ge={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},rt={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>Substatus:</b> DC - Other<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br>Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},We={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},lt=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],Rt=["CONSIDERACOES","COMENTARIOS"],ke={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
\u2022 Configura\xE7\xE3o de Convers\xF5es`,"field-CONTEXTO_CALL":`\u2022 Percebi que o(a) anunciante n\xE3o tinha GTM Instalado.
\u2022 Seguimos com a cria\xE7\xE3o de conta no GTM.
\u2022 Entretanto, a conta de acesso ao painel do site (ex: WordPress) n\xE3o tinha permiss\xE3o para instalar plugins ou editar o c\xF3digo.`,"field-IMPEDIMENTO_CLIENTE":`\u2022 Anunciante precisa conseguir acesso de administrador ao painel do site.
\u2022 OU
\u2022 Anunciante precisa contatar o(a) desenvolvedor(a) para que ele(a) instale o GTM.`,"field-MINHA_ACAO":`\u2022 Coloco o caso em 2/6.
\u2022 Assim que o anunciante tiver o acesso ou a instala\xE7\xE3o for feita, abrirei um caso em BAU para dar continuidade.`,"field-SCREENSHOTS":"\u2022 Print do painel do CMS mostrando a falta de permiss\xE3o (opcional)."},"quickfill-ni-awaiting-ecw4":{type:"all","field-REASON_COMMENTS":"Aguardando valida\xE7\xE3o de dados (ECW4 - 7 Dias)","field-TASKS_SOLICITADAS":"\u2022 Implementa\xE7\xE3o de Convers\xF5es Otimizadas (ECW4)","field-CONTEXTO_CALL":`\u2022 Criamos a convers\xE3o no Google Ads.
\u2022 Configuramos o disparo das tags via GTM.
\u2022 Adicionamos a tag de UPD (User Provided Data).
\u2022 Testamos juntos e validamos o bom funcionamento.`,"field-MINHA_ACAO":"\u2022 Coloco o caso em status de Awaiting Validation para acompanhamento de 7 dias.",linkedTask:"ads_enhanced_conversions"},"quickfill-ni-awaiting-ga4":{type:"all","field-REASON_COMMENTS":"Aguardando valida\xE7\xE3o de dados (GA4 Event - 48h)","field-TASKS_SOLICITADAS":"\u2022 Implementa\xE7\xE3o de Eventos GA4","field-CONTEXTO_CALL":`\u2022 Criamos o evento no GA4.
\u2022 Configuramos o disparo das tags via GTM.
\u2022 Testamos juntos e validamos o bom funcionamento.`,"field-MINHA_ACAO":"\u2022 Coloco o caso em status de Awaiting Validation para acompanhamento de 48h.",linkedTask:"ga4_event_tracking"},"quickfill-ni-followup-bau":{type:"bau","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (Follow-up BAU 2/6)","field-SPEAKEASY_ID":"N/A","field-ON_CALL":"N/A","field-CONTEXTO_CALL":"\u2022 No dia {DIA} do 2/6 fiz duas tentativas de contatos seguidas, mas n\xE3o obtive resposta. Envio na sequ\xEAncia o email referente ao dia respectivo.","field-TASKS_SOLICITADAS":"N/A","field-IMPEDIMENTO_CLIENTE":"N/A","field-MINHA_ACAO":"N/A","field-GTM_GA4_VERIFICADO":"N/A","field-SCREENSHOTS":`\u2022 Tentativa 1 -
\u2022 Tentativa 2 -`},"quickfill-ni-followup-lm":{type:"lm","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (Follow-up LM 2/6)","field-SPEAKEASY_ID":"N/A","field-ON_CALL":"N/A","field-CONTEXTO_CALL":"\u2022 No dia {DIA} do 2/6 enviei e-mail de follow-up (caso LM, sem tentativas de liga\xE7\xE3o), mas n\xE3o obtive resposta.","field-TASKS_SOLICITADAS":"N/A","field-IMPEDIMENTO_CLIENTE":"N/A","field-MINHA_ACAO":"N/A","field-GTM_GA4_VERIFICADO":"N/A","field-SCREENSHOTS":"\u2022 E-mail de follow-up enviado (LM) -"},"quickfill-gtm-install":{type:"all","field-TASKS_SOLICITADAS":"\u2022 Instala\xE7\xE3o do GTM","field-PASSOS_EXECUTADOS":`\u2022 Criamos a conta dentro do GTM
\u2022 Instalamos dentro do CMS/Hospedagem.
\u2022 Criamos o Vinculador de Convers\xF5es.`,"field-RESULTADO":"\u2022 Validei a instala\xE7\xE3o.",linkedTask:"gtm_installation"},"quickfill-whatsapp":{type:"all","field-TASKS_SOLICITADAS":"\u2022 Cria\xE7\xE3o de convers\xE3o para WHATSAPP","field-PASSOS_EXECUTADOS":`\u2022 Fizemos a cria\xE7\xE3o da convers\xE3o no Ads.
\u2022 Criamos a Tag no GTM usando acionadores de clique (ex: Click URL / Click Text) para os bot\xF5es de WhatsApp.
\u2022 Realizamos os testes e validamos o funcionamento.`,"field-RESULTADO":"\u2022 Task implementada com sucesso. Fecho o caso sem acompanhamento.",linkedTask:"ads_conversion_tracking"},"quickfill-form":{type:"all","field-TASKS_SOLICITADAS":"\u2022 Cria\xE7\xE3o de convers\xE3o para FORMUL\xC1RIO (padr\xE3o, n\xE3o-otimizada).","field-PASSOS_EXECUTADOS":`\u2022 Fizemos a cria\xE7\xE3o da convers\xE3o no Ads.
\u2022 Criamos a Tag no GTM usando o acionador de envio de formul\xE1rio (Form Submission) ou visualiza\xE7\xE3o de p\xE1gina de agradecimento (Thank You Page).
\u2022 Realizamos os testes e validamos o funcionamento.`,"field-RESULTADO":"\u2022 Task implementada com sucesso. Fecho o caso sem acompanhamento.",linkedTask:"ads_conversion_tracking"},"quickfill-ecw4-close":{type:"all","field-TASKS_SOLICITADAS":"\u2022 Acompanhamento da convers\xE3o otimizada (ECW4) ap\xF3s 7 dias.","field-PASSOS_EXECUTADOS":`\u2022 Ap\xF3s o per\xEDodo de 7 dias de acompanhamento, verifiquei o painel do Ads.
\u2022 A convers\xE3o est\xE1 sendo registrada corretamente.`,"field-RESULTADO":`\u2022 Valido o bom funcionamento da convers\xE3o otimizada.
\u2022 Assim, fecho o caso.`,linkedTask:"ads_enhanced_conversions"},"quickfill-ga4-event-close":{type:"all","field-TASKS_SOLICITADAS":"\u2022 Acompanhamento de Eventos GA4 ap\xF3s 48h.","field-PASSOS_EXECUTADOS":`\u2022 Ap\xF3s o per\xEDodo de 48h de acompanhamento, verifiquei o painel.
\u2022 O evento est\xE1 sendo registrado corretamente.`,"field-RESULTADO":`\u2022 Valido o bom funcionamento do rastreamento de eventos.
\u2022 Assim, fecho o caso.`,linkedTask:"ga4_event_tracking"},"quickfill-as-no-show":{type:"all","field-MOTIVO_REAGENDAMENTO":"\u2022 Precisamos reagendar o caso, j\xE1 que o anunciante n\xE3o compareceu na meet, por\xE9m respondeu o e-mail pedindo o reagendamento"},"quickfill-as-insufficient-time":{type:"all","field-MOTIVO_REAGENDAMENTO":`\u2022 Precisamos reagendar o caso, j\xE1 que o tempo foi insuficiente para terminar as Tasks
\u2022 Implementamos [descrever o que foi feito]`},"quickfill-as-no-access":{type:"all","field-MOTIVO_REAGENDAMENTO":"\u2022 Precisamos reagendar o caso, j\xE1 que o anunciante n\xE3o tinha os acessos necess\xE1rios para podermos implementar as tasks"},"quickfill-in-nrp-bau":{type:"bau","field-REASON_COMMENTS":"NRP (BAU - 3 tentativas)","field-COMENTARIOS":`\u2022 Duas liga\xE7\xF5es seguidas, e-mail "Antes dos 10 minutos" e uma terceira e ultima tentativa de liga\xE7\xE3o.
\u2022 N\xE3o houve resposta \xE0s tentativas de liga\xE7\xE3o ou e-mail, por isso o caso ser\xE1 inativado.`,"field-SCREENSHOTS":`\u2022 Tentativa 1 -
\u2022 Tentativa 2 -
\u2022 Tentativa 3 -`,"field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-nrp-lm":{type:"lm","field-REASON_COMMENTS":"NRP (LM - Sem tentativas)","field-SPEAKEASY_ID":"N/A","field-ON_CALL":"N/A","field-COMENTARIOS":`\u2022 Tentativa de contato via e-mail (sem chamada) para o caso LM, sem resposta.
\u2022 Caso inativado.`,"field-SCREENSHOTS":"\u2022 Caso LM, sem tentativas de liga\xE7\xE3o.","field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-no-show-bau":{type:"bau","field-REASON_COMMENTS":"Sem resposta ao 2 Day Rule.","field-ON_CALL":"N/A","field-COMENTARIOS":`\u2022 O caso foi gerado e entrei na chamada no hor\xE1rio agendado.
\u2022 O anunciante n\xE3o compareceu \xE0 reuni\xE3o.
\u2022 Segui o protocolo de espera (BAU): realizei duas tentativas de liga\xE7\xE3o, aguardei os 10 minutos, e fiz uma terceira tentativa, sem sucesso.
\u2022 Nenhuma das liga\xE7\xF5es foi atendida (ex: Caixa Postal).
\u2022 Caso inativado ap\xF3s 2 Day Rule.`,"field-SCREENSHOTS":`\u2022 Tentativa 1 - 
\u2022 Tentativa 2  - 
\u2022 Tentativa 3 - `,"field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-2-6-final":{type:"all","field-REASON_COMMENTS":"Finaliza\xE7\xE3o (2/6)","field-SPEAKEASY_ID":"-","field-ON_CALL":"-","field-COMENTARIOS":"\u2022 Dia 9 finaliza\xE7\xE3o do 2/6, durante o per\xEDodo do acompanhamento n\xE3o houve retorno do anunciante, ent\xE3o o caso ser\xE1 encerrado.","field-SCREENSHOTS":"\u2022 N/A","field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-manual":{type:"all","field-REASON_COMMENTS":"Outro (Manual)","field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-dc-lm-no-access":{type:"lm","field-REASON_COMMENTS":"Discard - Falta de acessos (Reagendamento solicitado)","field-COMENTARIOS":`N\xE3o conseguimos implementar nada durante a consultoria, j\xE1 que o adv n\xE3o tinha os acessos.

Irei abrir caso em BAU para o dia solicitado e pedir descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo.`},"quickfill-ni-attempted-2day":{type:"bau","field-REASON_COMMENTS":"Attempted Contact (In\xEDcio 2 Day Rule)","field-CONTEXTO_CALL":`\u2022 Fiz a primeira tentativa de liga\xE7\xE3o, sem sucesso.
\u2022 Enviei uma mensagem no chat para o AM.
\u2022 Aguardei 5 minutos e fiz a segunda tentativa de liga\xE7\xE3o, novamente sem sucesso.
\u2022 Aguardei mais 5 minutos e agora farei o acompanhamento 2 Day Rule.`,"field-SCREENSHOTS":`\u2022 MSG AM -
\u2022 Tentativa 1 -
\u2022 Tentativa 2 -`}};var be=t=>new Promise(e=>setTimeout(e,t));function ve(t,e="info"){let n={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${t}`,n[e]||n.info)}function Oe(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>t.dispatchEvent(new MouseEvent(n,e)))}function gt(t,e){if(!t)return;let n=`cw-warning-${t.id||Math.random().toString(36).substr(2,9)}`,o=document.getElementById(n);o&&o.remove();let s=t.getBoundingClientRect(),i=document.createElement("div");i.id=n,i.style.cssText=`
        position: fixed;
        top: ${s.bottom+8}px;
        left: ${s.left}px;
        min-width: 300px;
        max-width: 400px;
        background: #ffffff;
        border-left: 4px solid #F9AB00;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        padding: 12px 16px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 10px;
        z-index: 999999;
        font-family: 'Google Sans', Roboto, sans-serif;
        font-size: 13px;
        color: #202124;
        opacity: 0;
        transform: translateY(-5px);
        transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        pointer-events: auto;
    `,i.innerHTML=`
        <div style="display:flex; align-items:flex-start; gap:10px;">
            <span style="color:#F9AB00; font-size:16px; margin-top:1px;">\u26A0\uFE0F</span>
            <span style="line-height:1.4;">${e}</span>
        </div>
        <div class="cw-close-btn" style="
            cursor: pointer; color: #5f6368; font-weight: bold; font-size: 16px; 
            padding: 0 4px; line-height: 1; opacity: 0.6; transition: opacity 0.2s;
        ">\xD7</div>
    `;let a=i.querySelector(".cw-close-btn");a.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&a.click()},25e3)}async function bt(t,e){if(!t||!e)return;t.focus(),t.value="",t.dispatchEvent(new Event("input",{bubbles:!0})),await be(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),await be(100),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function Ft(){let e=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(n=>{let o=n.offsetParent!==null,s=n.closest("case-message-view")!==null,i=n.closest(".editor")!==null||n.closest("write-card")!==null;return o&&!s&&i});return e&&ve("Editor visualmente detectado.","success"),e}async function lo(){ve("\u{1F680} FASE 1: Tentando abrir a janela de email...");let t=!1,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(b=>b.innerText.trim()==="email");if(n&&n.offsetParent!==null){ve("Bot\xE3o de email direto encontrado.");let b=n.closest("material-button")||n.closest("material-fab")||n;Oe(b),t=!0}else{ve("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let b=document.querySelector("material-fab-speed-dial");if(b){let h=b.querySelector(".trigger");if(h){Oe(h),await be(800);let p=Array.from(document.querySelectorAll("i.material-icons-extended")).find(T=>T.innerText.trim()==="email");p&&(Oe(p),t=!0)}}}if(!t)return K("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;ve("\u{1F680} FASE 2: Verificando rascunhos...");let o=null,s=0,i=20;for(;s<i;){await be(250);let b=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(o=Array.from(b).find(h=>h.offsetParent!==null),o){ve("\u26A0\uFE0F Rascunho detectado!","warn");break}s++}if(o){ve("\u{1F5D1}\uFE0F Descartando..."),Oe(o),o.click();let b=null,h=0;for(;h<15;){await be(300);let u=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(b=Array.from(u).find(p=>p.offsetParent!==null),b)break;h++}b&&(Oe(b),K("Limpando rascunho antigo...",{duration:2e3}),await be(2500))}ve("\u{1F680} FASE 3: Buscando editor final...");let a=0,r=null;for(;a<20&&(r=Ft(),!r);)await be(250),a++;if(!r)return K("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let c=r.closest('[id="email-body-content-top"]'),g=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(c){if(g){let h=g.closest('[aria-hidden="true"]');h&&h.removeAttribute("aria-hidden"),g.focus(),Oe(g)}await be(300),c.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let b=c.querySelector("#cases-body-field");if(b){let h=document.createRange();h.selectNodeContents(b),h.collapse(!0);let u=window.getSelection();u.removeAllRanges(),u.addRange(h)}return!0}return!1}async function ft(t){if(!t||!await lo())return;let n=await at();ve("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let o=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(o&&(o.click(),await be(600)),n.clientEmail&&n.clientEmail!=="N/A"&&n.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await bt(i,n.clientEmail),gt(i,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(n.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await bt(i,n.internalEmail),gt(i,`
                <strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.
                <div style="margin-top:4px;">
                    <a href="https://mail.google.com/mail/u/0?ui=2&ik=ed23fb3167&attid=0.1&permmsgid=msg-f:1843445102914241244&th=19953b8dda2302dc&view=fimg&fur=ip&permmsgid=msg-f:1843445102914241244&sz=s0-l75-ft&attbid=ANGjdJ9m7O33cM36sxBYohVD6Qsapyux4PNr8qmTBlZ8zkp_LR79suGZhnxFJtBoFDeyMFygsH_tvCts5fnX0WV4rdClw9YqqR7guLnaXU9UzmZRRMRXEoC7T_MPbwo&disp=emb&realattid=ii_mfmv7wjm1&zw" target="_blank" style="color:#1a73e8;text-decoration:none;font-weight:500;display:inline-flex;align-items:center;">
                        Consultar Regra <span style="font-size:14px;margin-left:2px;">\u2197</span>
                    </a>
                </div>
            `))}await be(500);let s=document.querySelector('material-button[debug-id="canned_response_button"]');if(s){Oe(s),await be(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){Oe(i),document.execCommand("insertText",!1,t),i.dispatchEvent(new Event("input",{bubbles:!0})),ve("\u23F3 Buscando resultado da Canned Response...","info");let a=null,r=0,c=15e3,d=500;for(;r<c&&(a=document.querySelector("material-select-dropdown-item"),!a);)await be(d),r+=d;if(a){Oe(a),await be(1500);let g=Ft();if(g&&n.advertiserName){let b=g.innerHTML;b.includes("{%ADVERTISER_NAME%}")&&(g.innerHTML=b.replace(/{%ADVERTISER_NAME%}/g,n.advertiserName))}K("Canned Response aplicada!")}else ve(`\u274C Timeout: Resultado '${t}' n\xE3o apareceu ap\xF3s 15s.`,"error"),K(`Timeout: Template '${t}' n\xE3o carregou.`,{error:!0})}}else K("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function co(t){if(ve(`\u{1F680} Iniciando Quick Email: ${t.name}`),!await lo())return;let n=await at(),o=It();await be(600),ve("\u{1F4E7} Processando destinat\xE1rios...");let s=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(s&&(s.click(),await be(600)),n.clientEmail&&n.clientEmail!=="N/A"&&n.clientEmail!=="N/A (Bloqueado)"){let r=document.querySelector('input[aria-label="Enter To email address"]');r&&(await bt(r,n.clientEmail),gt(r,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(n.internalEmail){let r=document.querySelector('input[aria-label="Enter Bcc email address"]');r&&(await bt(r,n.internalEmail),gt(r,`
                <strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.
                <div style="margin-top:4px;">
                    <a href="https://mail.google.com/mail/u/0?ui=2&ik=ed23fb3167&attid=0.1&permmsgid=msg-f:1843445102914241244&th=19953b8dda2302dc&view=fimg&fur=ip&permmsgid=msg-f:1843445102914241244&sz=s0-l75-ft&attbid=ANGjdJ9m7O33cM36sxBYohVD6Qsapyux4PNr8qmTBlZ8zkp_LR79suGZhnxFJtBoFDeyMFygsH_tvCts5fnX0WV4rdClw9YqqR7guLnaXU9UzmZRRMRXEoC7T_MPbwo&disp=emb&realattid=ii_mfmv7wjm1&zw" target="_blank" style="color:#1a73e8;text-decoration:none;font-weight:500;display:inline-flex;align-items:center;">
                        Consultar Regra <span style="font-size:14px;margin-left:2px;">\u2197</span>
                    </a>
                </div>
            `))}let i=document.querySelector('input[aria-label="Subject"]');i&&t.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,t.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await be(300));let a=Ft();if(a){let c=(a.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');c&&(c.focus(),Oe(c));let d=new Date;d.setDate(d.getDate()+3);let g=d.getDay();g===6?d.setDate(d.getDate()+2):g===0&&d.setDate(d.getDate()+1);let b=d.toLocaleDateString("pt-BR"),h=t.body;h=h.replace(/\[Nome do Cliente\]/g,n.advertiserName||"Cliente"),h=h.replace(/\[INSERIR URL\]/g,n.websiteUrl||"seu site"),h=h.replace(/\[URL\]/g,n.websiteUrl||"seu site"),h=h.replace(/\[Seu Nome\]/g,o),h=h.replace(/\[MM\/DD\/YYYY\]/g,b),document.execCommand("insertHTML",!1,h),c&&(c.dispatchEvent(new Event("input",{bubbles:!0})),c.dispatchEvent(new Event("change",{bubbles:!0}))),K("Email preenchido com sucesso!",{duration:2e3}),ve("\u2705 Processo finalizado com sucesso.","success")}else K("Erro ao focar no editor.",{error:!0})}var _o={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},po={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function qe(t,e,n,o,s,i){let a=document.createElement("div");Object.assign(a.style,_o),to(t,a);let r=document.createElement("div");Object.assign(r.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),a.appendChild(r),s&&(s.googleLine=r);let c=document.createElement("div");Object.assign(c.style,{display:"flex",alignItems:"center",gap:"12px"});let d=document.createElement("img");d.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(d.style,{width:"20px",height:"20px",pointerEvents:"none"});let g=document.createElement("span");g.textContent=e,c.appendChild(d),c.appendChild(g);let b=document.createElement("div");Object.assign(b.style,{display:"flex",alignItems:"center",gap:"4px"});let h='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',u='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',p=document.createElement("div");p.innerHTML=h,Object.assign(p.style,po),p.title="Sobre",p.classList.add("no-drag"),p.onmouseenter=()=>{p.style.background="rgba(255,255,255,0.1)",p.style.color="#FFF"},p.onmouseleave=()=>{p.style.color!=="rgb(138, 180, 248)"&&(p.style.background="transparent",p.style.color="#9AA0A6")};let T=document.createElement("div");T.innerHTML=u,Object.assign(T.style,po),T.title="Fechar",T.classList.add("no-drag"),T.onmouseenter=()=>{T.style.background="rgba(242, 139, 130, 0.2)",T.style.color="#F28B82"},T.onmouseleave=()=>{T.style.background="transparent",T.style.color="#9AA0A6"},T.onmousedown=D=>D.stopPropagation(),p.onmousedown=D=>D.stopPropagation(),T.onclick=i;let k=Lo(t,e,n,o);return p.onclick=D=>{D.stopPropagation(),k.style.opacity==="1"?(k.style.opacity="0",k.style.pointerEvents="none",p.style.color="#9AA0A6",p.style.background="transparent"):(k.style.opacity="1",k.style.pointerEvents="auto",p.style.color="#8AB4F8",p.style.background="rgba(138, 180, 248, 0.1)")},b.appendChild(p),b.appendChild(T),a.appendChild(c),a.appendChild(b),a}function Lo(t,e,n,o){let s=document.createElement("div");return Object.assign(s.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(5px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),s.innerHTML=`
        <div style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${e}</div>
        <div style="color: #5f6368; font-size: 14px; margin-bottom: 24px;">Vers\xE3o ${n}</div>
        
        <div style="color: #3c4043; font-size: 14px; max-width: 90%; line-height: 1.6;">
            ${o}
        </div>

        <div style="margin-top: 32px; font-size: 12px; color: #9aa0a6;">
            created by <span style="color: #1a73e8; font-weight: 500;">@lucaste</span>
        </div>
        
        <button id="close-help-internal" style="margin-top: 24px; padding: 8px 24px; border: 1px solid #dadce0; background: white; border-radius: 18px; color: #1a73e8; cursor: pointer; font-weight: 500; transition: background 0.2s;">
            Voltar
        </button>
    `,setTimeout(()=>{let i=s.querySelector("#close-help-internal");i&&(i.onmouseover=()=>i.style.backgroundColor="#f8f9fa",i.onmouseout=()=>i.style.backgroundColor="white",i.onclick=()=>{s.style.opacity="0",s.style.pointerEvents="none"})},0),t.appendChild(s),s}if(!document.getElementById("cw-module-styles")){let t=document.createElement("style");t.id="cw-module-styles",t.innerHTML=`
        /* M\xD3DULO BASE */
        .cw-module-window {
            /* Anima\xE7\xE3o Apple Spring (Ida e Volta) */
            transition: 
                opacity 0.3s ease,
                transform 0.45s cubic-bezier(0.25, 1, 0.5, 1), 
                filter 0.3s ease,
                box-shadow 0.3s ease;
            
            opacity: 0; 
            pointer-events: none;
            transform: scale(0.05); /* Come\xE7a dentro do bot\xE3o */
            
            /* Visual Ceramic Light */
            background: #F8F9FA;
            backdrop-filter: blur(12px);
            box-shadow: 0 24px 48px -12px rgba(0, 0, 0, 0.18);
            border: 1px solid rgba(0, 0, 0, 0.12);
            border-radius: 16px;
            overflow: hidden;
            
            /* Fonte Base */
            font-family: 'Google Sans', Roboto, sans-serif;
        }

        /* ESTADO ABERTO (Ativo) */
        .cw-module-window.open {
            opacity: 1; 
            transform: scale(1); 
            pointer-events: auto;
            filter: brightness(1);
            /* Sombra alta */
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.4);
        }

        /* ESTADO IDLE (Segundo Plano) */
        .cw-module-window.idle {
            /* FIX DO DESLOCAMENTO: */
            /* Scale muito sutil (0.99) para n\xE3o "puxar" para o lado */
            transform: scale(0.99); 
            
            /* O efeito vem daqui: */
            opacity: 0.9;
            filter: brightness(0.96) saturate(0.5);
            border-color: rgba(0, 0, 0, 0.2);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1); /* Sombra cai (encostou na mesa) */
            
            cursor: pointer; /* Indica clic\xE1vel */
        }
    `,document.head.appendChild(t)}function Ie(t,e,n){let o=document.getElementById(n);if(!e)return;let s=e.getAttribute("data-moved")==="true",i={x:0,y:0};if(o){let g=o.getBoundingClientRect();i.x=g.left+g.width/2,i.y=g.top+g.height/2}let a,r;if(!s)a=window.innerWidth/2,r=window.innerHeight/2;else{let g=e.getBoundingClientRect();a=g.left+g.width/2,r=g.top+g.height/2,a===0&&r===0&&(a=window.innerWidth/2,r=window.innerHeight/2)}let c=i.x-a,d=i.y-r;t?(ie.playGenieOpen(),e.style.transition="none",e.style.opacity="0",e.style.pointerEvents="auto",s?e.style.transform=`translate(${c}px, ${d}px) scale(0.05)`:e.style.transform=`translate(calc(-50% + ${c}px), calc(-50% + ${d}px)) scale(0.05)`,e.offsetWidth,requestAnimationFrame(()=>{e.classList.add("open"),o&&o.classList.add("active"),e.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",e.style.opacity="1",s?e.style.transform="translate(0, 0) scale(1)":e.style.transform="translate(-50%, -50%) scale(1)"}),typeof uo=="function"&&uo(e,n)):(ie.playSwoosh(),e.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",e.style.pointerEvents="none",requestAnimationFrame(()=>{e.style.opacity="0",s?e.style.transform=`translate(${c}px, ${d}px) scale(0.1)`:e.style.transform=`translate(calc(-50% + ${c}px), calc(-50% + ${d}px)) scale(0.1)`}),setTimeout(()=>{e.classList.remove("open"),o&&o.classList.remove("active"),e.style.transition="",e.style.transform=""},300),typeof Dt=="function"&&Dt(e))}function uo(t,e){Dt(t);let n=o=>{if(!t.classList.contains("open"))return;let s=t.contains(o.target),i=document.querySelector(".cw-pill"),a=i&&i.contains(o.target);s?(t.classList.remove("idle"),t.style.zIndex="2147483648"):a||(t.classList.add("idle"),t.style.zIndex="2147483646")};t._idleHandler=n,document.addEventListener("mousedown",n)}function Dt(t){t._idleHandler&&(document.removeEventListener("mousedown",t._idleHandler),t._idleHandler=null)}var Ro="https://script.google.com/a/macros/google.com/s/AKfycbysAGOgn40LEQ1uJIppENtTGNSRscLRQkGA96UPYTDDbA0c_KhVUwDQ-Do8ZQ7lQizo/exec",Gt="cw_data_broadcast",mo="cw_data_tips",Fo=["Processando...","Mantenha o foco!","Aguarde..."];function zt(t,e={}){return new Promise((n,o)=>{let s="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script");window[s]=c=>{document.body.contains(i)&&document.body.removeChild(i),delete window[s],n(c)};let a=Object.keys(e).map(c=>encodeURIComponent(c)+"="+encodeURIComponent(e[c])).join("&"),r=`${Ro}?op=${t}&callback=${s}&t=${Date.now()}&${a}`;i.src=r,i.onerror=()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[s],o(new Error("JSONP Error (Check Corp Login)"))},document.body.appendChild(i)})}var we={fetchTips:async()=>{try{let t=await zt("tips");t?.tips&&localStorage.setItem(mo,JSON.stringify(t.tips))}catch(t){console.warn("Tips offline",t)}},fetchData:async()=>{try{let t=await zt("broadcast");if(t?.broadcast)return localStorage.setItem(Gt,JSON.stringify(t.broadcast)),t}catch(t){console.warn("Broadcast offline",t)}return{broadcast:JSON.parse(localStorage.getItem(Gt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(Gt)||"[]"),getRandomTip:()=>{let t=Fo,e=localStorage.getItem(mo);if(e)try{t=JSON.parse(e)}catch{}return t[Math.floor(Math.random()*t.length)]},sendBroadcast:async t=>{let e={...t,date:new Date().toISOString(),id:Date.now().toString()};return await we._performOp("new_broadcast",e)},updateBroadcast:async(t,e)=>{let n={id:t,...e};return await we._performOp("update_broadcast",n)},deleteBroadcast:async t=>await we._performOp("delete_broadcast",{id:t}),_performOp:async(t,e)=>{try{console.log(`\u{1F4E4} Executando ${t}...`,e);let n=await zt(t,e);return n&&n.status==="success"?(console.log("\u2705 Sucesso:",t),!0):(console.warn("\u26A0\uFE0F Falha:",n),!1)}catch(n){return console.error("\u274C Erro JSONP:",n),!1}},logUsage:()=>{}};var pe={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00"},ht=t=>new Promise(e=>setTimeout(e,t));function go(t){let e="cw-command-center-style";if(!document.getElementById(e)){let u=document.createElement("style");u.id=e,u.innerHTML=`
            @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@500&display=swap');

            .cw-focus-backdrop {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px);
                z-index: 2147483646; opacity: 0; pointer-events: none;
                transition: opacity 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
            }
            .cw-focus-backdrop.active { opacity: 1; pointer-events: auto; }

            .cw-pill {
                position: fixed; top: 30%; right: 24px;
                display: flex; flex-direction: column; align-items: center; gap: 12px;
                padding: 16px 8px;
                background: ${pe.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${pe.glassBorder}; border-radius: 50px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.4); z-index: 2147483647;
                opacity: 0; transform: translateX(40px) scale(0.95);
                transition: opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
            }
            .cw-pill.docked { opacity: 1; transform: translateX(0) scale(1); }

            .cw-btn {
                width: 40px; height: 40px; 
                border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center; 
                cursor: pointer; position: relative; color: ${pe.iconIdle};
                opacity: 0; transform: scale(0.5);
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-btn.popped { opacity: 1; transform: scale(1); }

            .cw-btn:hover { background: ${pe.glassHighlight}; color: ${pe.iconActive}; transform: scale(1.1); }

            /* Estados Ativos e Cores */
            .cw-btn.notes.active { color: ${pe.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${pe.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${pe.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${pe.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.broadcast.active { color: ${pe.orange} !important; background: rgba(249, 171, 0, 0.15); }

            .cw-btn.notes:hover { color: ${pe.blue}; filter: drop-shadow(0 0 5px rgba(138, 180, 248, 0.5)); }
            .cw-btn.email:hover { color: ${pe.red}; filter: drop-shadow(0 0 5px rgba(242, 139, 130, 0.5)); }
            .cw-btn.script:hover { color: ${pe.purple}; filter: drop-shadow(0 0 5px rgba(197, 138, 249, 0.5)); }
            .cw-btn.links:hover { color: ${pe.green}; filter: drop-shadow(0 0 5px rgba(129, 201, 149, 0.5)); }
            .cw-btn.broadcast:hover { color: ${pe.orange}; filter: drop-shadow(0 0 5px rgba(249, 171, 0, 0.5)); }

            /* Indicador LED */
            .cw-btn::before {
                content: ''; position: absolute; bottom: 2px; left: 50%; 
                width: 4px; height: 4px; border-radius: 50%;
                background-color: currentColor; box-shadow: 0 0 6px currentColor;
                transform: translateX(-50%) scale(0);
                transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); pointer-events: none;
            }
            .cw-btn.active::before { transform: translateX(-50%) scale(1); }
            
            .cw-btn svg { width: 22px; height: 22px; fill: currentColor; pointer-events: none; }

            /* BADGE DE NOTIFICA\xC7\xC3O */
            .cw-badge {
                position: absolute; top: 8px; right: 8px;
                width: 8px; height: 8px;
                background-color: #d93025; border-radius: 50%;
                border: 1px solid #fff; pointer-events: none;
                box-shadow: 0 1px 2px rgba(0,0,0,0.2);
                z-index: 10;
                animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }

            .cw-sep {
                width: 20px; height: 1px; background: rgba(255,255,255,0.2);
                opacity: 0; transition: opacity 0.5s ease;
            }
            .cw-sep.visible { opacity: 1; }

            .cw-grip {
                width: 100%; height: 24px; display: flex; align-items: center; justify-content: center; 
                cursor: grab; margin-bottom: 2px; 
            }
            .cw-grip-bar { 
                width: 24px; height: 4px; background-color: ${pe.iconIdle}; border-radius: 4px; 
                opacity: 0.4; transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1); 
            }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            .cw-grip:active { cursor: grabbing; }
            .cw-pill.dragging .cw-grip-bar { background-color: ${pe.blue}; width: 16px; opacity: 1; }

            @keyframes successPop {
                0% { box-shadow: 0 0 0 transparent; transform: scale(1); }
                50% { box-shadow: 0 0 15px #81C995; transform: scale(1.05); border-color: #81C995; }
                100% { box-shadow: 0 0 0 transparent; transform: scale(1); }
            }
            .cw-pill.system-check { animation: successPop 0.6s ease-out; }
            
            /* Tooltips */
            .cw-btn::after { 
                content: attr(data-label); position: absolute; top: 50%; transform: translateY(-50%) scale(0.9); 
                padding: 6px 12px; border-radius: 6px; background: #202124; color: #fff; 
                font-family: 'Google Sans', sans-serif; font-size: 12px; font-weight: 500; 
                opacity: 0; pointer-events: none; transition: all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1); 
                box-shadow: 0 4px 12px rgba(0,0,0,0.3); white-space: nowrap; border: 1px solid rgba(255,255,255,0.15);
            }
            .cw-pill.side-right .cw-btn::after { right: 60px; transform-origin: right center; }
            .cw-pill.side-right .cw-btn:hover::after { opacity: 1; transform: translateY(-50%) scale(1); }
            .cw-pill.side-left .cw-btn::after { left: 60px; transform-origin: left center; }
            .cw-pill.side-left .cw-btn:hover::after { opacity: 1; transform: translateY(-50%) scale(1); }

            /* --- ESTILOS DA ILHA DIN\xC2MICA --- */
            .cw-pill { transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); }

            .cw-pill.processing-center {
                top: 50% !important; left: 50% !important;
                transform: translate(-50%, -50%) !important;
                width: 320px !important; height: 110px !important;
                border-radius: 28px !important;
                background: #202124 !important;
                padding: 0 !important;
                box-shadow: 0 40px 80px rgba(0,0,0,0.5) !important;
                display: flex !important; flex-direction: column !important;
                justify-content: center !important; align-items: center !important;
            }

            .cw-pill.processing-center > *:not(.cw-center-stage) { display: none !important; }

            .cw-center-stage {
                display: flex; flex-direction: column; align-items: center; gap: 14px;
                width: 100%; opacity: 0; animation: fadeIn 0.4s ease forwards 0.1s;
                position: relative;
            }

            .cw-center-dots { display: flex; gap: 8px; }
            .cw-center-dots span {
                width: 8px; height: 8px; border-radius: 50%;
                animation: googleBounce 1.4s infinite ease-in-out both;
            }
            .cw-center-dots span:nth-child(1) { background-color: ${pe.blue}; animation-delay: -0.32s; }
            .cw-center-dots span:nth-child(2) { background-color: ${pe.red}; animation-delay: -0.16s; }
            .cw-center-dots span:nth-child(3) { background-color: ${pe.green}; }

            .cw-center-text {
                font-size: 13px; color: #E8EAED; text-align: center; max-width: 90%;
                font-weight: 500; line-height: 1.4; opacity: 0;
                transform: translateY(10px);
                animation: textSlideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                animation-delay: 0.2s;
            }

            .cw-center-success { display: none; color: ${pe.green}; }
            .cw-center-success svg { width: 40px; height: 40px; }
            .cw-center-success.show { display: block; animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }

            .cw-abort-btn {
                position: absolute; bottom: -32px;
                font-size: 10px; color: rgba(255, 255, 255, 0.2);
                cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px;
                font-weight: 600; transition: all 0.3s ease; user-select: none;
                margin-bottom: 8px;
            }
            .cw-abort-btn:hover { color: #F28B82; opacity: 1; }

            @keyframes fadeIn { to { opacity: 1; } }
            @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            @keyframes googleBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
            @keyframes textSlideUp { to { opacity: 1; transform: translateY(0); } }
        `,document.head.appendChild(u)}let n={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>'},o=document.createElement("div");o.className="cw-pill side-right",o.innerHTML=`
        <div class="cw-grip" title="Arrastar">
            <div class="cw-grip-bar"></div>
        </div>
        <button class="cw-btn notes" id="cw-btn-notes" data-label="Case Notes">${n.notes}</button>
        <button class="cw-btn email" id="cw-btn-email" data-label="Quick Email">${n.email}</button>
        <button class="cw-btn script" id="cw-btn-script" data-label="Call Script">${n.script}</button>
        <button class="cw-btn links" id="cw-btn-links" data-label="Links">${n.links}</button>
        <div class="cw-sep"></div>
        <button class="cw-btn broadcast" id="cw-btn-broadcast" data-label="Avisos">${n.broadcast}</button>
        <div class="cw-status-container">
            <div class="cw-dots" id="cw-loader"><span></span><span></span><span></span></div>
            <div class="cw-check" id="cw-success" style="display:none;">${n.check}</div>
        </div>
    `;let s=document.createElement("div");if(s.className="cw-focus-backdrop",document.body.appendChild(s),document.body.appendChild(o),o.querySelector(".notes").onclick=u=>{u.stopPropagation(),t.toggleNotes()},o.querySelector(".email").onclick=u=>{u.stopPropagation(),t.toggleEmail()},o.querySelector(".script").onclick=u=>{u.stopPropagation(),t.toggleScript()},o.querySelector(".links").onclick=u=>{u.stopPropagation(),t.toggleLinks()},o.querySelector(".broadcast").onclick=u=>{u.stopPropagation();let p=u.currentTarget.querySelector(".cw-badge");p&&(p.style.transform="scale(0)",setTimeout(()=>p.remove(),200)),t.broadcastControl&&t.broadcastControl.toggle()},t.broadcastControl&&t.broadcastControl.hasUnread){let u=document.createElement("div");u.className="cw-badge",o.querySelector(".broadcast").appendChild(u)}(async function(){await ht(2800),o.classList.add("docked"),await ht(300);let p=o.querySelectorAll(".cw-btn");o.querySelectorAll(".cw-sep").forEach(T=>T.classList.add("visible"));for(let T=0;T<p.length;T++)p[T].classList.add("popped"),await ht(90);await ht(200),o.classList.add("system-check")})();let i=!1,a,r,c,d,g=3;o.onmousedown=u=>{if(u.target.closest("button"))return;u.preventDefault(),a=u.clientX,r=u.clientY;let p=o.getBoundingClientRect();c=p.left,d=p.top,document.addEventListener("mousemove",b),document.addEventListener("mouseup",h)};function b(u){let p=u.clientX-a,T=u.clientY-r;!i&&Math.sqrt(p*p+T*T)>g&&(i=!0,o.style.transition="none"),i&&(o.style.left=`${c+p}px`,o.style.top=`${d+T}px`,o.style.right="auto",o.style.bottom="auto",o.style.transform="none")}function h(u){if(document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",h),i){i=!1,o.style.transition="left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s ease";let p=window.innerWidth,T=window.innerHeight,k=o.getBoundingClientRect(),D=k.left+k.width/2,B;D<p/2?(B=24,o.classList.remove("side-right"),o.classList.add("side-left")):(B=p-k.width-24,o.classList.remove("side-left"),o.classList.add("side-right"));let W=k.top;W<24&&(W=24),W>T-k.height-24&&(W=T-k.height-24),o.style.left=`${B}px`,o.style.top=`${W}px`}else{let p=u.target.closest("button");p&&(p.style.transform="scale(0.9)",setTimeout(()=>p.style.transform="",150))}}}function xt(){let t=document.querySelector(".cw-pill"),e=document.querySelector(".cw-focus-backdrop");if(!t)return()=>{};window._CW_ABORT_PROCESS=!1;let n=document.createElement("div");n.className="cw-center-stage",n.innerHTML=`
        <div class="cw-center-dots"><span></span><span></span><span></span></div>
        <div class="cw-center-text">${we.getRandomTip()}</div>
        <div class="cw-center-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
    `;let o=document.createElement("div");o.className="cw-abort-btn",o.textContent="Cancelar",o.onclick=i=>{i.stopPropagation(),window._CW_ABORT_PROCESS=!0,K("Cancelado! Mas a nota foi copiada para a \xE1rea de transfer\xEAncia.",{duration:4e3}),n.remove(),t.classList.remove("processing-center"),t.classList.remove("success"),e&&e.classList.remove("active")},n.appendChild(o),t.appendChild(n);let s=Date.now();return t.classList.add("processing-center"),e&&e.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!t.contains(n))return;let a=Date.now()-s,r=Math.max(0,2e3-a);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!t.contains(n))return;let c=n.querySelector(".cw-center-dots"),d=n.querySelector(".cw-center-text"),g=n.querySelector(".cw-center-success"),b=n.querySelector(".cw-abort-btn");c&&(c.style.display="none"),d&&(d.style.display="none"),b&&(b.style.display="none"),g&&g.classList.add("show"),t.classList.add("success"),setTimeout(()=>{t.classList.remove("processing-center"),setTimeout(()=>{n.remove(),t.classList.remove("success"),e&&e.classList.remove("active")},400)},1e3)},r)}}function bo(t){let e=document.createElement("div");e.className="cw-step-scenarios";let n=document.createElement("div");Object.assign(n.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let o=document.createElement("div");Object.assign(o.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"40px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s ease"}),o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>";let s=null;Object.entries(ke).forEach(([a,r])=>{let c=document.createElement("div");c.textContent=a,Object.assign(c.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",display:"flex",alignItems:"center",gap:"6px"}),c.onmouseenter=()=>{s!==r&&(o.style.background="#fff",o.style.borderColor="#1a73e8",o.style.color="#202124",o.textContent=`"${r.substring(0,120)}${r.length>120?"...":""}"`),s!==r&&(c.style.background="#f1f3f4")},c.onmouseleave=()=>{s!==r&&(s||(o.style.background="#f8f9fa",o.style.borderColor="#dadce0",o.style.color="#5f6368",o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>"),c.style.background="#ffffff")},c.onclick=()=>{ie.playClick(),s===r?(s=null,i(),t("")):(s=r,i(),c.style.transform="scale(0.95)",setTimeout(()=>c.style.transform="scale(1)",150),t(r))},n.appendChild(c)});function i(){Array.from(n.children).forEach(a=>{ke[a.textContent]===s?(a.style.background="#e8f0fe",a.style.borderColor="#1a73e8",a.style.color="#1967d2",a.style.fontWeight="500"):(a.style.background="#ffffff",a.style.borderColor="#dadce0",a.style.color="#3c4043",a.style.fontWeight="400")})}return e.appendChild(n),e.appendChild(o),e}var fo=t=>new Promise(e=>setTimeout(e,t));function yt(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>t.dispatchEvent(new MouseEvent(n,e)))}function ct(t){let e=document.createElement("div");e.style.position="fixed",e.style.left="-9999px",e.innerHTML=t,document.body.appendChild(e);let n=document.createRange();n.selectNodeContents(e);let o=window.getSelection();o.removeAllRanges(),o.addRange(n);try{document.execCommand("copy")}catch{K("Falha ao copiar",{error:!0})}o.removeAllRanges(),document.body.removeChild(e)}function vt(t){["input","change","keydown","keyup"].forEach(n=>{let o=new Event(n,{bubbles:!0,cancelable:!0});t.dispatchEvent(o)})}function ho(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function wt(){console.log("Iniciando processo de Nova Nota...");let t=ho(),e=t.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(a=>a.innerText.trim()==="description");if(o){let a=o.closest("material-fab")||o.closest("material-button");a?(a.style&&(a.style.display="block",a.style.visibility="visible"),yt(a)):yt(o)}else{let a=document.querySelector("material-fab-speed-dial");if(a){let r=a.querySelector(".trigger");r?(r.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),yt(r)):a.click(),await fo(800);let d=Array.from(document.querySelectorAll("i.material-icons-extended")).find(g=>g.innerText.trim()==="description");d&&yt(d)}}let s=null,i=0;for(;!s&&i<20;){await fo(300);let a=ho();if(a.length>e)s=a.find(r=>!t.includes(r)),s||(s=a[a.length-1]);else if(i>10){let r=a.filter(c=>c.offsetParent!==null);r.length>0&&(s=r[r.length-1])}i++}return s}var J={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},Me="cubic-bezier(0.25, 0.8, 0.25, 1)",Do={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${J.border}`,backgroundColor:J.bgInput,fontSize:"14px",color:J.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${Me}, box-shadow 0.2s ${Me}, background-color 0.2s`,outline:"none"},xn={...Do,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},yn={fontSize:"13px",fontWeight:"700",color:J.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},vn={display:"block",fontSize:"13px",fontWeight:"600",color:J.text,marginBottom:"8px",marginTop:"16px"},wn={fontSize:"12px",color:J.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},An={fontSize:"12px",color:J.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},Cn={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:J.text,cursor:"pointer",padding:"12px 14px",backgroundColor:J.surface,border:`1px solid ${J.border}`,borderRadius:"12px",transition:`all 0.2s ${Me}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},Bt={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:J.primary},Sn={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:J.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${Me}, box-shadow 0.2s ${Me}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},En={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${J.primary}`,color:J.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${Me}`},Tn={background:"transparent",border:`1px solid ${J.border}`,borderRadius:"20px",color:J.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${Me}`,fontFamily:"'Google Sans', 'Roboto'"};var kn={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:J.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},On={fontSize:"13px",fontWeight:"700",color:J.primary,minWidth:"20px",textAlign:"center"},qn={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${J.border}`,backgroundColor:J.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${Me}, box-shadow 0.2s ${Me}`},In={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${J.bgInput}`},Mn={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${J.border}`,backgroundColor:J.surface,color:J.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${Me}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},Nn={backgroundColor:J.primaryBg,color:J.primary,borderColor:J.primary,fontWeight:"600"},_n={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:J.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},Ln={borderTop:`1px solid ${J.bgInput}`,paddingTop:"20px",marginTop:"16px"};var Rn={maxHeight:"240px",overflowY:"auto",border:`1px solid ${J.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:J.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},Fn={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${J.bgInput}`,cursor:"pointer",fontSize:"13px",color:J.text,transition:"background 0.1s",userSelect:"none"};var Go={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},zo={fontSize:"12px",color:"#e37400",marginTop:"4px"},Bo={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},Po={display:"flex",gap:"15px",marginBottom:"10px"};function xo(){let t=document.createElement("div");t.id="tag-support-container",Object.assign(t.style,Go);let e=document.createElement("label");e.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(e.style,_t,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,Po);let o=document.createElement("input");o.type="radio",o.name="ts_usage_mod",o.value="Sim",Object.assign(o.style,Bt);let s=document.createElement("label");s.textContent="Sim";let i=document.createElement("div");Object.assign(i.style,{display:"flex",alignItems:"center"}),i.appendChild(o),i.appendChild(s);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="N\xE3o",a.checked=!0,Object.assign(a.style,Bt);let r=document.createElement("label");r.textContent="N\xE3o";let c=document.createElement("div");Object.assign(c.style,{display:"flex",alignItems:"center"}),c.appendChild(a),c.appendChild(r),n.appendChild(i),n.appendChild(c);let d=document.createElement("div");d.style.display="block";let g=document.createElement("label");g.textContent="Qual foi o Motivo?",Object.assign(g.style,_t,{fontSize:"12px"});let b=document.createElement("input");b.type="text",Object.assign(b.style,Bo);let h=document.createElement("div");h.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(h.style,zo),d.appendChild(g),d.appendChild(b),d.appendChild(h),t.appendChild(e),t.appendChild(n),t.appendChild(d),o.onchange=()=>{d.style.display="none"},a.onchange=()=>{d.style.display="block"};function u(k,D){if(t.style.display="none",!k||k.includes("Education")||!D||D.length===0)return;let B=D.some(w=>w.includes("enhanced")||w==="ec_google_ads"),W=D.some(w=>(w.includes("conversion")||w.includes("ads"))&&!w.includes("enhanced")),se=D.some(w=>w.includes("ga4")||w.includes("analytics")||w.includes("ua")),A=D.some(w=>w.includes("merchant")||w.includes("gmc")||w.includes("shopping"));(B||W&&!se&&!A)&&(t.style.display="block")}function p(){if(t.style.display==="none")return"";let k=`<br><b>Utilizou Tag Support?</b> ${o.checked?"Sim":"N\xE3o"}`;return a.checked&&b.value.trim()!==""&&(k+=`<br><b>Motivo:</b> ${b.value}`),k+="<br>",k}function T(){t.style.display="none",a.checked=!0,o.checked=!1,d.style.display="block",b.value=""}return{element:t,updateVisibility:u,getOutput:p,reset:T}}var Y={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Ye={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function yo(t){let e={},n="implementation";function o(A){let x=A.toLowerCase();return x.includes("ads")||x.includes("conversion")||x.includes("remarketing")?Y.brands.ads:x.includes("ga4")||x.includes("analytics")?Y.brands.ga4:x.includes("gtm")||x.includes("tag manager")||x.includes("container")?Y.brands.gtm:x.includes("merchant")||x.includes("shopping")||x.includes("feed")?Y.brands.gmc:Y.brands.default}let s=Object.entries(Ge).filter(([A,x])=>x.popular),i={};Object.entries(Ge).forEach(([A,x])=>{if(x.popular)return;let w=o(x.name);i[w.label]||(i[w.label]={brand:w,tasks:[]}),i[w.label].tasks.push({key:A,...x})});let a="cw-zen-tasks";if(!document.getElementById(a)){let A=document.createElement("style");A.id=a,A.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column; height: 100%; width: calc(100% + 32px); margin: -16px;
                font-family: ${Y.font}; background: ${Y.bg}; position: relative; overflow: hidden;
            }
            
            /* SCROLL AREA */
            .cw-zen-content { flex: 1; overflow-y: auto; padding-bottom: 80px; } /* Espa\xE7o para o Status Bar */

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${Y.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${Y.white}; 
                border: 1px solid #E5E7EB; 
                border-radius: 16px; 
                padding: 12px;
                cursor: pointer; 
                position: relative; 
                height: 80px; /* Altura fixa confort\xE1vel */
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
                box-shadow: 0 1px 2px rgba(0,0,0,0.02);
                overflow: hidden;
            }
            
            /* Corre\xE7\xE3o do Grid \xCDmpar */
            .cw-hero-card:last-child:nth-child(odd) { grid-column: span 2; }

            /* Intera\xE7\xE3o */
            .cw-hero-card:hover { border-color: #D1D5DB; box-shadow: 0 4px 8px rgba(0,0,0,0.03); }
            .cw-hero-card:active { transform: scale(0.98); }

            /* HERO ACTIVE STATE (Borda Colorida Apenas) */
            .cw-hero-card.active {
                background: #FFFFFF; /* Fundo continua branco */
                border-color: var(--hero-color); /* Cor da borda din\xE2mica */
                box-shadow: 0 0 0 1px var(--hero-color), 0 4px 12px rgba(0,0,0,0.05);
            }

            /* CONTAINER DE CONTE\xDADO (Para anima\xE7\xE3o de deslize) */
            .cw-hero-main {
                display: flex; align-items: center; gap: 10px;
                transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                width: 100%; justify-content: center;
            }
            /* Quando ativo, sobe um pouquinho para caber o stepper */
            .cw-hero-card.active .cw-hero-main { transform: translateY(-12px); }

            /* \xCDCONE (Sempre Neutro) */
            .cw-hero-icon { 
                width: 32px; height: 32px; border-radius: 8px; 
                background: #F3F4F6; /* Cinza Apple Neutro */
                display: flex; align-items: center; justify-content: center; flex-shrink: 0;
                transition: background 0.2s;
            }
            /* \xCDcone SVG sempre vis\xEDvel */
            .cw-hero-icon svg { width: 20px; height: 20px; }
            
            /* No active, o \xEDcone pode ficar branco puro para destacar o logo */
            .cw-hero-card.active .cw-hero-icon { background: #FFFFFF; border: 1px solid #F3F4F6; }

            /* TEXTO */
            .cw-hero-label { 
                font-size: 12px; font-weight: 500; color: ${Y.textMain}; line-height: 1.2; 
                text-align: left;
            }
            .cw-hero-card.active .cw-hero-label { font-weight: 600; color: var(--hero-color); }

            /* STEPPER (Surge de baixo) */
            .cw-hero-stepper {
                position: absolute; bottom: 8px; left: 0; right: 0;
                display: flex; align-items: center; justify-content: center; gap: 12px;
                opacity: 0; transform: translateY(10px);
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                pointer-events: none;
            }
            .cw-hero-card.active .cw-hero-stepper { opacity: 1; transform: translateY(0); pointer-events: auto; }
            
            /* Bot\xF5es do Stepper */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 50%; background: #F3F4F6;
                color: ${Y.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${Y.border}; border-radius: 10px; background: ${Y.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${Y.blue}; box-shadow: 0 0 0 3px ${Y.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${Y.border}; border-radius: 10px; background: ${Y.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${Y.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${Y.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${Y.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${Y.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${Y.blueLight}; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${Y.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${Y.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${Y.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${Y.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${Y.border};
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${Y.shadowFloat}; z-index: 10;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${Y.textMain}; }
            
            .cw-footer-icons { display: flex; flex-direction: row-reverse; padding-left: 8px; }
            .cw-mini-icon { 
                width: 24px; height: 24px; border-radius: 50%; border: 2px solid white;
                color: white; display: flex; align-items: center; justify-content: center;
                box-shadow: 0 1px 2px rgba(0,0,0,0.15); position: relative; margin-left: -8px;
            }
            .cw-mini-icon svg { width: 12px; height: 12px; fill: currentColor; }

            @keyframes cwSlideDown { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }

/* --- SCREENSHOTS: FINE & ELEGANT (Step 3) --- */
            
            .cw-screens-container {
                display: flex; flex-direction: column; gap: 12px;
                padding: 4px 4px 40px 4px; /* Respiro para n\xE3o cortar sombras */
            }

            /* CART\xC3O (Base F\xEDsica) */
            .cw-screen-card {
                background: #FFFFFF;
                border-radius: 12px;
                /* Borda base sutil */
                border: 1px solid #E5E7EB; 
                /* Faixa de identidade na esquerda (Cor injetada via JS) */
                border-left: 4px solid var(--brand-color);
                
                padding: 16px 20px;
                position: relative;
                transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
                
                /* Sombra quase invis\xEDvel, apenas para separar do fundo */
                box-shadow: 0 1px 2px rgba(0,0,0,0.02);
            }

            /* Intera\xE7\xE3o de Foco no Cart\xE3o */
            .cw-screen-card:focus-within {
                border-color: #E5E7EB; 
                border-left-width: 6px; /* A faixa engorda levemente */
                background: #FFFFFF;
                /* Sombra difusa estilo Apple ao focar */
                box-shadow: 0 4px 12px rgba(0,0,0,0.05); 
                transform: translateX(2px); /* Micro-movimento lateral */
            }

            /* HEADER DO CART\xC3O */
            .cw-card-header {
                display: flex; align-items: center; gap: 12px; margin-bottom: 16px;
                /* Sem borda inferior para visual mais limpo/moderno */
            }
            
            /* \xCDCONE (Puro, sem fundo) */
            .cw-card-icon {
                width: 24px; height: 24px; flex-shrink: 0;
                display: flex; align-items: center; justify-content: center;
            }
            .cw-card-icon svg { width: 100%; height: 100%; }

            /* T\xCDTULO EDIT\xC1VEL */
            .cw-card-title-input {
                font-family: ${Y.font}; font-size: 15px; font-weight: 600; color: ${Y.textMain};
                border: 1px solid transparent; 
                border-radius: 6px;
                background: transparent; 
                width: 100%; outline: none;
                padding: 4px 8px; margin-left: -8px; /* Alinhamento \xF3ptico */
                transition: all 0.2s ease;
                cursor: text;
            }

            /* Hover no header revela que \xE9 edit\xE1vel */
            .cw-card-header:hover .cw-card-title-input {
                background: #F1F3F4;
                border-color: transparent;
            }
            
            /* Foco no t\xEDtulo: Azul Google Padr\xE3o para indicar edi\xE7\xE3o de texto */
            .cw-card-title-input:focus {
                background: #FFFFFF;
                border-color: ${Y.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${Y.textSub}; opacity: 0; 
                transform: translateX(-10px); transition: all 0.2s ease;
                pointer-events: none; white-space: nowrap;
            }
            .cw-card-header:hover .cw-edit-hint { opacity: 1; transform: translateX(0); }

            /* INFO BANNER (Win Criteria) */
            .cw-info-banner {
                margin: 0 4px 16px 4px;
                padding: 10px 14px;
                background: #F8F9FA;
                border: 1px dashed #DADCE0;
                border-radius: 8px;
                font-size: 11px; color: ${Y.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${Y.brands.ads.color}; text-decoration: none; font-weight: 600; }
            .cw-info-link:hover { text-decoration: underline; }

            /* FOOTER ICONS (Limpo & Original) */
            .cw-mini-icon { 
                width: 26px; height: 26px; border-radius: 50%; 
                background: #FFFFFF; border: 1px solid #E0E0E0;
                display: flex; align-items: center; justify-content: center;
                box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                margin-left: -8px; position: relative; z-index: 1;
            }
            .cw-mini-icon svg { width: 14px; height: 14px; } 

            /* INPUTS (Campos de Link) */
            .cw-input-group { margin-bottom: 12px; position: relative; }
            .cw-input-group:last-child { margin-bottom: 0; }

            .cw-input-label {
                display: block; font-size: 10px; font-weight: 700; color: ${Y.textSub};
                margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;
            }

            .cw-input-field {
                width: 100%; box-sizing: border-box;
                padding: 10px 12px;
                border-radius: 8px;
                border: 1px solid #E5E7EB; /* Borda leve */
                background: #F9FAFB; /* Fundo levemente cinza */
                font-size: 13px; color: #374151;
                transition: all 0.2s ease; outline: none;
            }

            /* Foco no Input: Usa a cor da marca */
            .cw-input-field:focus {
                background: #FFFFFF;
                border-color: var(--brand-color); /* Din\xE2mico! */
                box-shadow: 0 0 0 2px var(--brand-bg); /* Anel de foco din\xE2mico */
            }
            
            /* Sucesso (Dopamina) */
            .cw-input-field.filled {
                background-color: #F0FDF4;
                border-color: #DCFCE7;
                color: #166534;
                padding-right: 36px;
            }

            /* Check Icon Animado */
            .cw-input-check {
                position: absolute; right: 10px; bottom: 10px; 
                color: #16A34A; width: 16px; height: 16px;
                opacity: 0; transform: scale(0.5); 
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                pointer-events: none;
            }
            .cw-input-field.filled + .cw-input-check { opacity: 1; transform: scale(1); }
        `,document.head.appendChild(A)}let r=document.createElement("div");r.className="cw-zen-container";let c=document.createElement("div");Object.assign(c.style,{display:"none"});let d=document.createElement("div");d.className="cw-screens-container",c.appendChild(d),r.innerHTML=`
        <div class="cw-zen-content">
            <div class="cw-hero-section">
                <div class="cw-section-subtitle" style="font-size:11px; font-weight:700; color:#6B7280; text-transform:uppercase; letter-spacing:0.8px;">Acesso R\xE1pido</div>
                <div class="cw-hero-grid"></div>
                <div class="cw-helper-text">Atalhos para as implementa\xE7\xF5es mais frequentes.<br>Use a busca abaixo para o cat\xE1logo completo.</div>
            </div>

            <div class="cw-list-section">
                <div class="cw-search-wrapper">
                    <input class="cw-search-input" placeholder="Buscar no cat\xE1logo...">
                </div>
                <div class="cw-acc-container"></div>
                <div class="cw-results-container" style="display:none"></div>
            </div>
        </div>

        <div class="cw-status-bar">
            <div class="cw-status-text">0 a\xE7\xF5es definidas</div>
            <div class="cw-footer-icons"></div>
        </div>
    `;let g=r.querySelector(".cw-hero-grid"),b=r.querySelector(".cw-acc-container"),h=r.querySelector(".cw-results-container"),u=r.querySelector(".cw-search-input"),p=r.querySelector(".cw-status-bar"),T=r.querySelector(".cw-status-text"),k=r.querySelector(".cw-footer-icons");s.forEach(([A,x])=>{let w=o(x.name),C=document.createElement("div");C.className="cw-hero-card",C.id=`hero-${A}`,C.style.setProperty("--hero-color",w.color),C.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${Ye[w.icon]}</div>
                <div class="cw-hero-label">${x.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,C.onclick=N=>{if(N.target.closest(".cw-step-btn"))return;let S=e[A]?e[A].count:0;B(A,S>0?-S:1,x)},C.querySelector(".minus").onclick=()=>B(A,-1,x),C.querySelector(".plus").onclick=()=>B(A,1,x),C.dataset.color=w.color,g.appendChild(C)});function D(A,x){let w=o(x.name),C=document.createElement("div");return C.className="cw-task-item",C.dataset.id=A,C.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${w.bg}; color:${w.color}">
                    ${Ye[w.icon]||Ye.default}
                </div>
                <div class="cw-task-label">${x.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,C.onclick=N=>{if(N.target.closest(".cw-step-btn"))return;let S=e[A]?e[A].count:0;B(A,S>0?-S:1,x)},C.querySelector(".minus").onclick=()=>B(A,-1,x),C.querySelector(".plus").onclick=()=>B(A,1,x),C}Object.entries(i).forEach(([A,x])=>{let w=document.createElement("div");w.className="cw-acc-group";let C=document.createElement("div");C.className="cw-acc-header",C.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${x.brand.color}"></div>
                ${A}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,C.onclick=()=>{b.querySelectorAll(".cw-acc-group.open").forEach(S=>{S!==w&&S.classList.remove("open")}),w.classList.toggle("open")};let N=document.createElement("div");N.className="cw-acc-body",x.tasks.forEach(S=>{let F=D(S.key,S);N.appendChild(F)}),w.appendChild(C),w.appendChild(N),b.appendChild(w)});function B(A,x,w){e[A]||(e[A]={count:0,data:w,brand:o(w.name)}),e[A].count+=x,e[A].count<=0&&delete e[A],W(),se(),t&&t()}function W(){s.forEach(([N])=>{let S=g.querySelector(`#hero-${N}`);if(!S)return;let F=e[N];F?(S.classList.add("active"),S.querySelector(".cw-step-val").textContent=F.count,S.querySelector(".cw-step-val").style.color=S.dataset.color):S.classList.remove("active")}),r.querySelectorAll(".cw-task-item").forEach(N=>{let S=N.dataset.id,F=e[S];F?(N.classList.add("selected"),N.querySelector(".cw-step-val").textContent=F.count):N.classList.remove("selected")});let x=Object.keys(e),w=0,C=[];if(x.forEach(N=>{let S=e[N];w+=S.count;for(let F=0;F<S.count;F++)C.length<6&&C.push(S.brand)}),w>0){p.classList.add("visible");let N=w>1?"A\xE7\xF5es":"A\xE7\xE3o",S=w>1?"definidas":"definida";T.textContent=`${w} ${N} ${S}`,k.innerHTML="",C.forEach(F=>{let R=document.createElement("div");R.className="cw-mini-icon",R.innerHTML=Ye[F.icon]||Ye.default;let q=R.querySelector("svg");q&&(q.style.width="14px",q.style.height="14px"),k.appendChild(R)})}else p.classList.remove("visible")}u.addEventListener("input",A=>{let x=A.target.value.toLowerCase();if(x.length>0){b.style.display="none",h.style.display="block",h.innerHTML="";let w=!1;Object.entries(Ge).forEach(([C,N])=>{if(N.name.toLowerCase().includes(x)){w=!0;let S=D(C,N);e[C]&&(S.classList.add("selected"),S.querySelector(".cw-step-val").textContent=e[C].count),h.appendChild(S)}}),w||(h.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else b.style.display="block",h.style.display="none"});function se(){d.innerHTML="";let A=Object.keys(e),x=!1,w=document.getElementById("sub-status"),C="implementation";if(w&&w.value.toLowerCase().includes("education")&&(C="education"),A.length===0){d.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}if(A.length===0){d.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}let N=document.createElement("div");N.className="cw-info-banner",N.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Todos os Screenshots s\xE3o baseados na descri\xE7\xE3o do 
                <a href="https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/" target="_blank" class="cw-info-link">Win Criteria</a>.
            </span>
        `,d.appendChild(N),A.forEach(S=>{let F=e[S].data,R=e[S].count,q=e[S].brand,H=F.screenshots?F.screenshots[C]||[]:["Link da Evid\xEAncia"];if(H.length>0){x=!0;for(let l=1;l<=R;l++){let y=document.createElement("div");y.className="cw-screen-card",y.style.setProperty("--brand-color",q.color),y.style.setProperty("--brand-bg",q.bg),y.style.setProperty("--brand-shadow",q.color+"40");let f=document.createElement("div");f.className="cw-card-header";let m=document.createElement("div");m.className="cw-card-icon",m.innerHTML=Ye[q.icon]||Ye.default;let E=document.createElement("div");E.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let I=document.createElement("input");I.className="cw-card-title-input",I.id=`name-${S}-${l}`,I.value=`${F.name}${R>1?" #"+l:""}`,I.title="Clique para renomear esta task";let V=document.createElement("span");V.className="cw-edit-hint",V.innerHTML="\u270E Renomear",E.appendChild(I),E.appendChild(V),f.appendChild(m),f.appendChild(E),y.appendChild(f),H.forEach((L,M)=>{let G=document.createElement("div");G.className="cw-input-group";let $=document.createElement("label");$.className="cw-input-label",$.textContent=L.replace(/📷|:|•/g,"").trim();let O=document.createElement("input");O.className="cw-input-field",O.id=`screen-${S}-${l}-${M}`,O.placeholder="Cole o link aqui...",O.setAttribute("autocomplete","off"),O.addEventListener("input",()=>{O.value.trim().length>5?O.classList.add("filled"):O.classList.remove("filled")});let P=document.createElement("div");P.className="cw-input-check",P.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',G.appendChild($),G.appendChild(O),G.appendChild(P),y.appendChild(G)}),d.appendChild(y)}}}),c.style.display=x?"block":"none"}return{selectionElement:r,screenshotsElement:c,updateSubStatus:()=>se(),getCheckedElements:()=>Object.keys(e).map(A=>({value:A,closest:()=>({querySelector:()=>({textContent:e[A].count})})})),toggleTask:(A,x=!0)=>{let w=e[A];x&&!w?B(A,1,Ge[A]):!x&&w&&B(A,-w.count,Ge[A])},setMode:A=>{n=A,se()},reset:()=>{for(let A in e)delete e[A];u.value="",b.style.display="block",h.style.display="none",W(),se()}}}function vo(t){let e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; position: relative; overflow: hidden;";let n=document.createElement("div");n.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 80px 24px;";let o={sectionTitle:"font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.5px; margin: 24px 0 12px 0; border-bottom: 1px solid #E0E0E0; padding-bottom: 6px;",label:"display: block; font-size: 13px; font-weight: 600; color: #202124; marginBottom: 6px;",input:"width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #DADCE0; background: #FFFFFF; font-size: 14px; color: #3C4043; transition: all 0.2s; outline: none; box-sizing: border-box;",inputFocus:"border-color: #1a73e8; box-shadow: 0 0 0 2px rgba(26,115,232,0.15);",textarea:"min-height: 80px; resize: vertical; line-height: 1.5; font-family: Roboto, sans-serif;",radioGroup:"display: flex; gap: 12px; margin-bottom: 16px;",radioLabel:"flex: 1; display: flex; align-items: center; justify-content: center; padding: 10px; border: 1px solid #DADCE0; border-radius: 8px; background: #FFF; cursor: pointer; transition: all 0.2s; font-size: 13px; font-weight: 500; color: #3C4043; user-select: none;",radioActive:"background: #E8F0FE; border-color: #1967D2; color: #1967D2; font-weight: 600;",banner:"background: #FEF7E0; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; font-size: 12px; color: #B06000; line-height: 1.5; display: flex; gap: 10px; align-items: start;",magicBtn:"width: 100%; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px; background: #E8F0FE; color: #1967D2; border: 1px dashed #1967D2; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.2s; margin-bottom: 20px;"};function s(q,H,l="text",y=""){let f=document.createElement("div");f.style.marginBottom="16px";let m=document.createElement("label");m.style.cssText=o.label,m.textContent=H;let E;return l==="textarea"?(E=document.createElement("textarea"),E.style.cssText=o.input+o.textarea):(E=document.createElement("input"),E.type=l,E.style.cssText=o.input),E.onfocus=()=>E.style.cssText+=o.inputFocus,E.onblur=()=>{l==="textarea"?E.style.cssText=o.input+o.textarea:E.style.cssText=o.input},E.id=`st-${q}`,E.placeholder=y,f.appendChild(m),f.appendChild(E),{wrapper:f,input:E}}function i(q,H){let l=document.createElement("div"),y=document.createElement("label");y.style.cssText=o.label,y.textContent=H,l.appendChild(y);let f=document.createElement("div");return f.style.cssText=o.radioGroup,["Yes","No"].forEach(m=>{let E=document.createElement("label");E.style.cssText=o.radioLabel;let I=document.createElement("input");I.type="radio",I.name=`st-${q}`,I.value=m==="Yes"?"Y":"N",I.style.display="none",m==="No"&&(I.checked=!0),E.appendChild(I),E.appendChild(document.createTextNode(m)),I.addEventListener("change",()=>{f.querySelectorAll("label").forEach(V=>V.style.cssText=o.radioLabel),I.checked&&(E.style.cssText=o.radioLabel+o.radioActive)}),m==="No"&&(E.style.cssText=o.radioLabel+o.radioActive),f.appendChild(E)}),l.appendChild(f),{wrapper:l}}let a=document.createElement("div");a.style.cssText=o.banner,a.innerHTML=`
        <span style="font-size: 16px;">\u26A0\uFE0F</span>
        <div>
            <b>Aten\xE7\xE3o:</b> Antes de transferir, verifique o <a href="https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o" target="_blank" style="color:#B06000; text-decoration:underline;">SOP de Out of Scope</a> e consulte um <a href="http://go/webao-help-deluxe" target="_blank" style="color:#B06000; text-decoration:underline;">SME</a> para confirmar.
        </div>
    `,n.appendChild(a);let r=document.createElement("button");r.style.cssText=o.magicBtn,r.innerHTML="<span>\u2728</span> Preencher Automaticamente",r.onmouseover=()=>r.style.background="#D2E3FC",r.onmouseout=()=>r.style.background="#E8F0FE",n.appendChild(r);let c=document.createElement("div");c.style.cssText=o.sectionTitle,c.style.marginTop="0",c.textContent="1. Dados T\xE9cnicos",n.appendChild(c);let d=s("cid","Ads CID"),g=s("ga4","GA4 ID"),b=s("gtm","GTM ID"),h=i("access","Advertiser has access to GA4/GTM?"),u=s("access-email","If Yes, User Email"),p=i("ghost","Ghosting Access Available?");n.append(d.wrapper,g.wrapper,b.wrapper,h.wrapper,u.wrapper,p.wrapper);let T=document.createElement("div");T.style.cssText=o.sectionTitle,T.textContent="2. Contato & Problema",n.appendChild(T);let k=s("name","Name of Advertiser"),D=s("url","Website Address"),B=s("phone","Phone Number"),W=s("email","Email Address"),se=s("callback","Preferred Call Back Time (w/ Timezone)"),A=s("desc","Detailed Issue Description","textarea"),x=s("checks","Checks Performed by Tech Team","textarea"),w=s("screens","Uncropped Screenshots (Links)","textarea");n.append(k.wrapper,D.wrapper,B.wrapper,W.wrapper,se.wrapper,A.wrapper,x.wrapper,w.wrapper);let C=document.createElement("div");C.style.cssText=o.sectionTitle,C.textContent="3. Contatos para C\xF3pia (CC)",n.appendChild(C);let N=s("c-adv","Advertiser Contact"),S=s("c-am","Account Manager");n.append(N.wrapper,S.wrapper);let F=document.createElement("div");F.style.cssText="padding: 16px 24px; background: #fff; border-top: 1px solid #E0E0E0; display: flex; justify-content: flex-end; position: absolute; bottom: 0; width: 100%; box-sizing: border-box; z-index: 10;";let R=document.createElement("button");return R.textContent="Gerar Nota S&T",R.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 24px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 6px rgba(26, 115, 232, 0.3); transition: transform 0.1s;",R.onactive=()=>R.style.transform="scale(0.96)",F.appendChild(R),e.appendChild(n),e.appendChild(F),r.onclick=async()=>{r.innerHTML="<span>\u23F3</span> Buscando...";let q=await at();q.advertiserName&&(k.input.value=q.advertiserName),q.websiteUrl&&(D.input.value=q.websiteUrl),q.clientEmail&&(W.input.value=q.clientEmail,N.input.value=q.clientEmail);let l=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);l&&(d.input.value=l[0]),r.innerHTML="<span>\u2705</span> Dados Preenchidos!",setTimeout(()=>{r.innerHTML="<span>\u2728</span> Preencher Automaticamente"},2e3),K("Dados capturados com sucesso!")},R.onclick=async()=>{let q=m=>{let E=e.querySelector(`#st-${m}`);return E?E.value:""},H=m=>{let E=e.querySelector(`input[name="st-${m}"]:checked`);return E?E.value:"N"},y=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${q("cid")}
<b>GA4 ID:</b> ${q("ga4")}
<b>GTM ID:</b> ${q("gtm")}
<b>Advertiser has access to either GA4 or GTM (Y/N):</b> ${H("access")}
<b>If Yes, user access email to GA4/GTM:</b> ${q("access-email")}
<b>Ghosting Access Available (Y/N):</b> ${H("ghost")}
<b>Name of the advertiser:</b> ${q("name")}
<b>Website Address:</b> ${q("url")}
<b>Advertiser\u2019s preferred mode of communication:</b> Phone
<b>Advertiser/Web Master\u2019s Phone Number:</b> ${q("phone")}
<b>Preferred Call Back time with time zone and contact number:</b> ${q("callback")}
<b>Advertiser/Web Master\u2019s Email Address:</b> ${q("email")}

<b>Detailed Issue Description:</b>
${q("desc")}

<b>Name of the conversion action or event in the question:</b> N/A
<b>Date range:</b> N/A
<b>Uncropped screenshots of the issue:</b>
${q("screens")}

<b>Test conversion details (if any):</b> N/A

<b>Checks performed by Technical Solutions Team (Detailed Info + Screenshot doc):</b>
${q("checks")}

[IMP] Contacts to be copied on all communication about this case
<b>Advertiser contact -</b> ${q("c-adv")}
<b>Account Manager -</b> ${q("c-am")}
<b>Additional Contact -</b> N/A

<b>Additional Comments:</b> (Optional)`.replace(/\n/g,"<br>");ct(y);let f=await wt();f?(f.innerText.trim()===""&&(f.innerHTML=""),document.execCommand("insertHTML",!1,y),vt(f),K("Nota S&T inserida!")):K("Copiado! Abra uma nota para colar.")},e}function wo(){let t="v3.7.0 (S&T Mode)",e="bau",n="pt",o=!1,s=!1,i=!1,a={input:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},textarea:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease",height:"100px",resize:"vertical"},h3:{fontSize:"14px",fontWeight:"600",color:"#202124",margin:"0 0 12px 0"},label:{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},checkboxLabel:{display:"flex",alignItems:"center",marginBottom:"10px",fontSize:"14px",fontWeight:"400",cursor:"pointer",padding:"8px",background:"#f8f9fa",borderRadius:"6px",transition:"background-color 0.2s ease, box-shadow 0.2s ease",userSelect:"none"},checkboxInput:{width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"},buttonBase:{flex:"1 1 0",padding:"10px 0",color:"#fff",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"500",cursor:"pointer",marginTop:"16px"},stepBlock:{borderTop:"1px solid #eee",paddingTop:"12px",marginTop:"12px"},radioContainer:{display:"flex",gap:"15px",marginBottom:"10px"},optionalBtn:{width:"100%",padding:"10px",background:"white",border:"1px dashed #1a73e8",color:"#1a73e8",borderRadius:"6px",cursor:"pointer",fontWeight:"500",fontSize:"13px",marginBottom:"10px",transition:"all 0.2s"},helpLink:{fontSize:"12px",color:"#1a73e8",textDecoration:"none",cursor:"pointer",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"color 0.2s"}},r=xo(),c=yo(()=>{let j=c.getCheckedElements().map(_=>_.value);m&&m.value&&r.updateVisibility(m.value,j)}),d=document.createElement("div");d.id="autofill-popup",d.classList.add("cw-module-window"),Object.assign(d.style,Te,{right:"100px",width:"400px",transition:"width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)"});let g={popup:d,googleLine:null},b=qe(d,"Case Notes",t,"Gera notas padronizadas.",g,()=>qt());d.appendChild(b);let h=b.lastElementChild;if(h){let v=document.createElement("div");v.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',Object.assign(v.style,{width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease",marginLeft:"4px"}),v.title="Alternar para Split & Transfer",v.onmouseenter=()=>{v.style.background="rgba(255,255,255,0.1)",v.style.color="#FFF"},v.onmouseleave=()=>{i||(v.style.background="transparent",v.style.color="#9AA0A6")},v.onclick=j=>{j.stopPropagation(),k(v)},h.insertBefore(v,h.firstChild)}let u=document.createElement("div");Object.assign(u.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1"}),d.appendChild(u);let p=document.createElement("div");Object.assign(p.style,{flexGrow:"1",display:"none",overflow:"hidden"});let T=vo(()=>k());p.appendChild(T),d.appendChild(p);function k(v){i=!i,i?(u.style.display="none",p.style.display="flex",g.googleLine&&(g.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)"),v&&(v.style.color="#C58AF9",v.style.background="rgba(197, 138, 249, 0.15)")):(u.style.display="block",p.style.display="none",g.googleLine&&(g.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"),v&&(v.style.color="#9AA0A6",v.style.background="transparent"))}let D=document.createElement("div");D.textContent="created by lucaste@",Object.assign(D.style,no),d.appendChild(D);let B=document.createElement("div");B.id="step-lang-type";let W=document.createElement("label");Object.assign(W.style,a.label),B.appendChild(W);let se=document.createElement("div");Object.assign(se.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let A=document.createElement("div");A.textContent="Portugu\xEAs",A.classList.add("no-drag"),Object.assign(A.style,ye);let x=document.createElement("div");x.textContent="Espa\xF1ol",x.classList.add("no-drag"),Object.assign(x.style,ye),A.onclick=()=>Et("pt"),x.onclick=()=>Et("es"),se.appendChild(A),se.appendChild(x),B.appendChild(se),u.appendChild(B);let w=document.createElement("div");w.id="step-0-case-type";let C=document.createElement("label");Object.assign(C.style,a.label),w.appendChild(C);let N=document.createElement("div");Object.assign(N.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let S=document.createElement("div");S.textContent="BAU",S.classList.add("no-drag"),Object.assign(S.style,ye);let F=document.createElement("div");F.textContent="LM",F.classList.add("no-drag"),Object.assign(F.style,ye),S.onclick=()=>St("bau"),F.onclick=()=>St("lm"),N.appendChild(S),N.appendChild(F),w.appendChild(N),u.appendChild(w);let R=document.createElement("div");R.id="step-1-selection";let q=document.createElement("label");q.className="cw-input-label",q.textContent="Status Principal";let H=document.createElement("select");H.id="main-status",H.className="cw-select",H.innerHTML=`
      <option value="" disabled selected hidden>Selecione uma op\xE7\xE3o...</option>
      <option value="NI">NI - Need Info</option>
      <option value="SO">SO - Solution Offered</option>
      <option value="IN">IN - Inactive</option>
      <option value="AS">AS - Assigned</option>
      <option value="DC">DC - Discard</option>
  `;let l=document.createElement("div");l.style.cssText="display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; margin-bottom: 6px;";let y=document.createElement("label");y.className="cw-input-label",y.textContent="Sub-status",y.style.marginBottom="0";let f=document.createElement("a");f.href="https://seu-link-do-guia-aqui.com",f.target="_blank",f.className="cw-info-link",f.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; transform:translateY(1px)"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Guia de Substatus',Object.assign(f.style,a.helpLink),l.appendChild(y),l.appendChild(f);let m=document.createElement("select");m.id="sub-status",m.className="cw-select",m.disabled=!0,m.innerHTML='<option value="" disabled selected hidden>Aguardando status principal...</option>',R.appendChild(q),R.appendChild(H),R.appendChild(l),R.appendChild(m),u.appendChild(R);let E=document.createElement("div");E.id="step-1-1-portugal",Object.assign(E.style,a.stepBlock,{display:"none"});let I=document.createElement("label");Object.assign(I.style,a.label),E.appendChild(I);let V=document.createElement("div");Object.assign(V.style,a.radioContainer);let L=document.createElement("div");Object.assign(L.style,{display:"flex",alignItems:"center"});let M=document.createElement("input");M.type="radio",M.name="portugal-group",M.value="sim",Object.assign(M.style,a.checkboxInput);let G=document.createElement("label");G.htmlFor="portugal-sim",Object.assign(G.style,{cursor:"pointer"}),L.appendChild(M),L.appendChild(G);let $=document.createElement("div");Object.assign($.style,{display:"flex",alignItems:"center"});let O=document.createElement("input");O.type="radio",O.name="portugal-group",O.value="nao",O.checked=!0,Object.assign(O.style,a.checkboxInput);let P=document.createElement("label");P.htmlFor="portugal-nao",Object.assign(P.style,{cursor:"pointer"}),$.appendChild(O),$.appendChild(P),V.appendChild(L),V.appendChild($),E.appendChild(V),u.appendChild(E);function de(v){o=v,v?oe.style.display="block":oe.style.display="none"}M.onchange=()=>de(!0),O.onchange=()=>de(!1);let oe=document.createElement("div");oe.id="step-1-2-consent",Object.assign(oe.style,a.stepBlock,{display:"none"});let ne=document.createElement("label");Object.assign(ne.style,a.label),oe.appendChild(ne);let ce=document.createElement("div");Object.assign(ce.style,a.radioContainer);let fe=document.createElement("div");Object.assign(fe.style,{display:"flex",alignItems:"center"});let Se=document.createElement("input");Se.type="radio",Se.name="consent-group",Se.value="Sim",Se.checked=!0,Object.assign(Se.style,a.checkboxInput);let Ne=document.createElement("label");Ne.htmlFor="consent-sim",Object.assign(Ne.style,{cursor:"pointer"}),fe.appendChild(Se),fe.appendChild(Ne);let et=document.createElement("div");Object.assign(et.style,{display:"flex",alignItems:"center"});let Fe=document.createElement("input");Fe.type="radio",Fe.name="consent-group",Fe.value="N\xE3o",Object.assign(Fe.style,a.checkboxInput);let dt=document.createElement("label");dt.htmlFor="consent-nao",Object.assign(dt.style,{cursor:"pointer"}),et.appendChild(Fe),et.appendChild(dt),ce.appendChild(fe),ce.appendChild(et),oe.appendChild(ce),u.appendChild(oe);let Be=document.createElement("div");Be.id="step-1-5-snippets",Object.assign(Be.style,a.stepBlock,{display:"none"});let pt=document.createElement("h3");Object.assign(pt.style,a.h3),pt.textContent="Cen\xE1rios Comuns";let Ee=bo(v=>{let j=document.querySelector("textarea");j&&(j.value=v,j.dispatchEvent(new Event("input")),j.style.transition="background-color 0.2s",j.style.backgroundColor="#e8f0fe",setTimeout(()=>j.style.backgroundColor="#fff",300))});Ee.id="snippet-container",Be.appendChild(pt),Be.appendChild(Ee),u.appendChild(Be);let Ae=document.createElement("div");Ae.id="step-3-form",Object.assign(Ae.style,a.stepBlock,{display:"none"});let Ct=document.createElement("h3");Object.assign(Ct.style,a.h3),Ae.appendChild(Ct);let De=document.createElement("div");De.id="dynamic-form-fields-container",Ae.appendChild(De);let he=document.createElement("button");he.textContent="+ Gostaria de selecionar uma task?",Object.assign(he.style,a.optionalBtn),he.onmouseover=()=>he.style.background="#e8f0fe",he.onmouseout=()=>he.style.background="white",he.onclick=()=>{he.style.display="none",Pe.style.display="block",c.selectionElement.style.display="block"};let Pe=document.createElement("h3");Object.assign(Pe.style,a.h3,{marginTop:"20px"});let jt=c.selectionElement;Object.assign(jt.style,{marginBottom:"20px"}),Ae.appendChild(he),Ae.appendChild(Pe),Ae.appendChild(jt),Ae.appendChild(r.element),Ae.appendChild(c.screenshotsElement),u.appendChild(Ae);let je=document.createElement("div");je.id="step-4-email",Object.assign(je.style,{display:"none",marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #eee"});let He=document.createElement("label");He.style.display="flex",He.style.alignItems="center",He.style.cursor="pointer",He.style.fontSize="14px";let Ve=document.createElement("input");Ve.type="checkbox",Ve.checked=!0,Object.assign(Ve.style,a.checkboxInput),He.appendChild(Ve),He.appendChild(document.createTextNode("Preencher email automaticamente?")),je.appendChild(He),u.appendChild(je);let Ke=document.createElement("div");Object.assign(Ke.style,{display:"none",gap:"8px",padding:"0"}),u.appendChild(Ke);let tt=document.createElement("button");Object.assign(tt.style,a.buttonBase,{backgroundColor:"#5f6368"}),tt.textContent="Copiar";let ot=document.createElement("button");Object.assign(ot.style,a.buttonBase,{backgroundColor:"#1a73e8"}),ot.textContent="Preencher",Ke.appendChild(tt),Ke.appendChild(ot);let nt=document.createElement("div");Object.assign(nt.style,Qe),nt.className="no-drag",nt.title="Redimensionar",d.appendChild(nt),Ze(d,nt),document.body.appendChild(d);function St(v){e=v;let j=it();Object.assign(S.style,ye),Object.assign(F.style,ye),v==="bau"?(Object.assign(S.style,j),f.href="https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657"):(Object.assign(F.style,j),f.href="https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243"),m.value&&m.dispatchEvent(new Event("change"))}function Z(v){try{if(Re&&Re[n]&&Re[n][v])return Re[n][v];if(Re&&Re.pt&&Re.pt[v])return Re.pt[v]}catch{}return v}function ko(){W.textContent=Z("idioma"),C.textContent=Z("fluxo"),q.textContent=Z("status_principal"),y.textContent=Z("substatus"),pt.textContent=Z("cenarios_comuns"),Pe.textContent=Z("selecione_tasks"),Ct.textContent=Z("preencha_detalhes"),tt.textContent=Z("copiar"),ot.textContent=Z("preencher"),H.querySelector('option[value=""]')&&(H.querySelector('option[value=""]').textContent=Z("select_status")),m.querySelector('option[value=""]')&&(m.querySelector('option[value=""]').textContent=Z("select_substatus")),I.textContent=Z("caso_portugal"),G.textContent=Z("sim"),P.textContent=Z("nao"),ne.textContent=Z("consentiu_gravacao"),Ne.textContent=Z("sim"),dt.textContent=Z("nao"),De.querySelectorAll("label").forEach(v=>{let j=v.nextElementSibling.id.replace("field-",""),_=Z(j.toLowerCase());_!==j.toLowerCase()?v.textContent=_:v.textContent=j.replace(/_/g," ").replace(/\b\w/g,Q=>Q.toUpperCase())+":"}),he.textContent="+ "+(n==="pt"?"Gostaria de selecionar uma task?":"Quisiera seleccionar una tarea?")}function Et(v){n=v;let j=it();Object.assign(A.style,ye),Object.assign(x.style,ye),v==="pt"?(Object.assign(A.style,j),E.style.display="block",de(o)):(Object.assign(x.style,j),E.style.display="none",oe.style.display="none"),ko(),m.value&&m.dispatchEvent(new Event("change"))}function Tt(v){(v.value.trim()===""||v.value.trim()==="\u2022")&&(v.value="\u2022 "),v.onkeydown=function(j){if(j.key==="Enter"){j.preventDefault();let _=this.selectionStart,Q=this.selectionEnd,le=this.value,me=le.lastIndexOf(`
`,_-1)+1,Ce=le.substring(me,_),ge=Ce.trim()==="\u2022"||Ce.trim()===""?`
`:`
\u2022 `;this.value=le.substring(0,_)+ge+le.substring(Q),this.selectionStart=this.selectionEnd=_+ge.length}else if(j.key==="Backspace"){let _=this.selectionStart;if(_===this.selectionEnd&&_>0){let Q=this.value.substring(0,_);Q.endsWith(`
\u2022 `)?(j.preventDefault(),this.value=Q.substring(0,_-3)+this.value.substring(this.selectionEnd),this.selectionStart=this.selectionEnd=_-3):Q==="\u2022 "&&(j.preventDefault(),this.value="",this.selectionStart=this.selectionEnd=0)}}}}function kt(){let v=typeof Ee<"u"?Ee:document.getElementById("snippet-container");if(!v)return;let j=v.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'),_={},Q=new Set;j.forEach(ae=>{let te=ae.id,U=ke[te];if(U)for(let z in U)z==="linkedTask"?Q.add(U.linkedTask):z!=="type"&&(_[z]||(_[z]=[]),_[z].includes(U[z])||_[z].push(U[z]))});let le=new Set;Object.values(ke).forEach(ae=>{Object.keys(ae).forEach(te=>{te!=="linkedTask"&&te!=="type"&&le.add(te)})}),le.forEach(ae=>{let te=document.getElementById(ae);if(te){let U=_[ae]||[],z="";lt.includes(ae.replace("field-",""))?(z=U.map(ee=>ee.startsWith("\u2022 ")?ee:"\u2022 "+ee).join(`
`),z===""?z="\u2022 ":z.endsWith(`
\u2022 `)||(z+=`
\u2022 `)):z=U.join(`

`),z.trim()!=="\u2022"&&z.trim()!==""?te.value=z:lt.includes(ae.replace("field-",""))?te.value="\u2022 ":te.value="",te.tagName==="TEXTAREA"&&typeof Tt=="function"&&Tt(te)}});let me=new Set,Ce=new Set;v.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(ae=>{let te=ke[ae.id];te&&te.linkedTask&&(ae.checked?me.add(te.linkedTask):Ce.add(te.linkedTask))}),Ce.forEach(ae=>{me.has(ae)||c.toggleTask(ae,!1)}),me.forEach(ae=>{c.toggleTask(ae,!0)})}H.onchange=()=>{let v=H.value;if(Ot(1.5),m.innerHTML=`<option value="">${Z("select_substatus")}</option>`,!v){m.disabled=!0;return}for(let j in rt){let _=rt[j];if(_.status===v){let Q=document.createElement("option");Q.value=j,Q.textContent=_.name,m.appendChild(Q)}}m.disabled=!1},m.onchange=()=>{let v=m.value;if(Ot(1.5),!v)return;c.updateSubStatus(v);let j=rt[v];Ee.innerHTML="";let _=(U,z,ee)=>{let ue=document.createElement("label");Object.assign(ue.style,a.checkboxLabel),ue.onmouseover=()=>ue.style.backgroundColor="#e8eaed",ue.onmouseout=()=>ue.style.backgroundColor="#f8f9fa";let re=document.createElement("input");return re.type=z,re.id=U.id,Object.assign(re.style,a.checkboxInput),ue.appendChild(re),ue.appendChild(document.createTextNode(` ${U.text}`)),ee.appendChild(ue),re},Q=[],le="radio";if(v==="NI_Awaiting_Inputs")Q=[{id:"quickfill-ni-inicio-manual",text:"In\xEDcio 2/6 (Manual)"},{id:"quickfill-ni-cms-access",text:"In\xEDcio 2/6 (ADV sem acesso ao CMS)"},{id:"quickfill-ni-followup-bau",text:"Follow-up 2/6 (BAU)"},{id:"quickfill-ni-followup-lm",text:"Follow-up 2/6 (LM)"}];else if(v.startsWith("SO_"))le="checkbox",Q=[{id:"quickfill-gtm-install",text:"Instala\xE7\xE3o do GTM"},{id:"quickfill-whatsapp",text:"Convers\xE3o de WhatsApp"},{id:"quickfill-form",text:"Convers\xE3o de Formul\xE1rio (Padr\xE3o)"},{id:"quickfill-ecw4-close",text:"Fechamento ECW4 (P\xF3s 7 dias)"}];else if(v.startsWith("AS_")){le="checkbox";let U=document.createElement("label");U.textContent=Z("cenarios_comuns"),Object.assign(U.style,a.label),Ee.appendChild(U),Q=[{id:"quickfill-as-no-show",text:"Anunciante n\xE3o compareceu (respondeu e-mail)"},{id:"quickfill-as-insufficient-time",text:"Tempo insuficiente"},{id:"quickfill-as-no-access",text:"Anunciante sem acessos necess\xE1rios"}]}else v.startsWith("IN_")?Q=[{id:"quickfill-in-nrp-bau",text:"NRP (BAU - 3 tentativas)"},{id:"quickfill-in-nrp-lm",text:"NRP (LM - Sem tentativas)"},{id:"quickfill-in-no-show-bau",text:"No-Show (BAU - 3 tentativas)"},{id:"quickfill-in-2-6-final",text:"Finaliza\xE7\xE3o 2/6 (Sem Resposta)"},{id:"quickfill-in-manual",text:"Outro (Manual)"}]:v.startsWith("DC_")?(le="radio",Q=[{id:"quickfill-dc-lm-no-access",text:"LM - Sem acessos (Reagendar em BAU)"}]):v==="NI_Attempted_Contact"&&(le="radio",Q=[{id:"quickfill-ni-attempted-2day",text:"2 Day Rule (2 Liga\xE7\xF5es + Chat AM)"}]);let me=Q.filter(U=>{let z=ke[U.id];return!z.type||z.type==="all"||z.type===e});me.forEach((U,z)=>{let ee=_(U,le,Ee);le==="radio"&&(ee.name="scenario-radio-group",z===0&&(ee.checked=!0))}),me.length>0&&(Be.style.display="block"),j.requiresTasks?(he.style.display="none",Pe.style.display="block",c.selectionElement.style.display="block"):(he.style.display="block",Pe.style.display="none",c.selectionElement.style.display="none"),De.innerHTML="";let Ce=j.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(Ce)].forEach(U=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(U))return;let z=U.slice(1,-1),ee=document.createElement("label"),ue=Z(z.toLowerCase());if(ee.textContent=ue!==z.toLowerCase()?ue:z.replace(/_/g," ").replace(/\b\w/g,X=>X.toUpperCase())+":",Object.assign(ee.style,a.label),z==="SPEAKEASY_ID"){let X=document.createElement("button");X.innerHTML='<span style="font-size:12px; margin-right:4px;">\u2728</span>Auto Busca',X.style.cssText=`
              font-family: 'Google Sans', Roboto, sans-serif;
              font-size: 11px;
              font-weight: 500;
              color: #0b57d0; /* Azul Google Material 3 */
              background-color: #d3e3fd; /* Fundo Azul Claro Tonal */
              border: none;
              border-radius: 100px; /* Fully rounded pill */
              padding: 5px 12px;
              margin-left: 10px;
              cursor: pointer;
              display: inline-flex;
              align-items: center;
              transition: all 0.2s ease;
              outline: none;
              vertical-align: middle;
              letter-spacing: 0.3px;
          `,X.title="Localizar Speakeasy ID no hist\xF3rico",X.onmouseover=()=>{X.style.backgroundColor="#c2e7ff",X.style.boxShadow="0 1px 2px rgba(0,0,0,0.1)"},X.onmouseout=()=>{X.style.backgroundColor="#d3e3fd",X.style.boxShadow="none"},X.onmousedown=()=>{X.style.backgroundColor="#a8c7fa",X.style.transform="scale(0.96)"},X.onmouseup=()=>X.style.transform="scale(1)",X.onclick=xe=>{xe.preventDefault(),ro(`field-${z}`)},ee.appendChild(X)}let re;lt.includes(z)?(re=document.createElement("textarea"),Object.assign(re.style,a.textarea),re.classList.add("bullet-textarea"),Tt(re)):Rt.includes(z)?(re=document.createElement("textarea"),Object.assign(re.style,a.textarea)):(re=document.createElement("input"),re.type="text",Object.assign(re.style,a.input),z==="REASON_COMMENTS"&&(v.startsWith("NI_")||v.startsWith("IN_"))&&(Object.assign(ee.style,{display:"none"}),Object.assign(re.style,{display:"none"}))),z==="ON_CALL"&&e==="lm"&&(Object.assign(ee.style,{display:"none"}),Object.assign(re.style,{display:"none"}),re.value="N/A"),re.id=`field-${z}`,De.appendChild(ee),De.appendChild(re)});let ae=Ee.querySelectorAll('input[type="checkbox"], input[type="radio"]');ae.length>0&&(ae.forEach(U=>{U.removeEventListener("change",kt),U.addEventListener("change",kt)}),kt()),Ae.style.display="block",We[v]?je.style.display="block":je.style.display="none",Ke.style.display="flex";let te=c.getCheckedElements().map(U=>U.value);r.updateVisibility(v,te)},he.onclick=()=>{he.style.display="none",Pe.style.display="block",c.selectionElement.style.display="block"};function Ht(){let v=m.value;if(!v)return null;let _=rt[v].template.replace(/\n/g,"<br>"),Q='style="margin-bottom: 12px; padding-left: 30px;"',le=[],me="",Ce=c.getCheckedElements();Ce.length>0&&Ce.forEach(te=>{let U=te.value,z=Ge[U],ee=te.closest().querySelector(".stepper-count"),ue=ee?parseInt(ee.textContent):1;ue>1?le.push(`${z.name} (x${ue})`):le.push(z.name)});let ge=c.screenshotsElement;if(ge){let te=Array.from(ge.querySelectorAll('input[id^="name-"]'));te.length>0&&te.forEach(U=>{let z=U.value,ee=U.closest(".cw-screen-card");if(ee){let ue=ee.querySelectorAll('input[id^="screen-"]'),re=!1,X="";ue.forEach(xe=>{let Vt=xe.closest(".cw-input-group"),$t=Vt?Vt.querySelector(".cw-input-label"):null,Oo=$t?$t.textContent:"Evid\xEAncia",Ut=xe.value.trim(),qo=Ut?` ${Ut}`:"";X+=`<li>${Oo} -${qo}</li>`,re=!0}),re&&(me+=`<b>${z}</b>`,me+=`<ul ${Q}>${X}</ul>`)}})}if(_.includes("{TAGS_IMPLEMENTED}")?_=_.replace(/{TAGS_IMPLEMENTED}/g,le.join(", ")||"N/A"):le.length>0&&(_+=`<br><b>Tags:</b> ${le.join(", ")}<br>`),_.includes("{SCREENSHOTS_LIST}")?_=_.replace(/{SCREENSHOTS_LIST}/g,me?`${me}`:"N/A"):me!==""&&(_+=`<br>${me}`),n==="pt"&&o){let te=Se.checked?Z("sim"):Z("nao");_=_.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${Z("consentiu_gravacao")}</b> ${te}<br><br>`),_=_.replace(/{CASO_PORTUGAL}/g,`<br><b>${Z("caso_portugal")}</b> ${Z("sim")}<br>`)}else n==="pt"&&!o?(_=_.replace(/{CASO_PORTUGAL}/g,`<br><b>${Z("caso_portugal")}</b> ${Z("nao")}<br>`),_=_.replace(/{CONSENTIU_GRAVACAO}/g,"")):(_=_.replace(/{CASO_PORTUGAL}/g,""),_=_.replace(/{CONSENTIU_GRAVACAO}/g,""));return De.querySelectorAll("input, textarea").forEach(te=>{let U=te.id.replace("field-",""),z=new RegExp(`{${U}}`,"g"),ee=te.value;if(U==="REASON_COMMENTS"&&(v.startsWith("NI_")||v.startsWith("IN_"))){let X=Ee.querySelector('input[type="radio"]:checked');X&&ke[X.id]&&(ee=ke[X.id]["field-REASON_COMMENTS"])}if(lt.includes(U)&&ee.trim()!==""){let X=ee.split(`
`).map(xe=>xe.trim()).filter(xe=>xe!==""&&xe!=="\u2022").map(xe=>xe.startsWith("\u2022 ")?xe.substring(2):xe).map(xe=>`<li>${xe}</li>`).join("");ee=X?`<ul ${Q}>${X}</ul>`:""}else Rt.includes(U)?ee=ee.split(`
`).filter(X=>X.trim()!=="").map(X=>`<p style="margin: 0 0 8px 0;">${X}</p>`).join(""):te.tagName==="TEXTAREA"&&(ee=ee.replace(/\n/g,"<br>"));let ue=ee.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(ue===""||ue==="\u2022"||ue.toLowerCase()==="n/a"){let X=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${U}\\}(?:<br>\\s*)?`,"gi");X.test(_)?_=_.replace(X,""):_=_.replace(z,"")}else _=_.replace(z,ee.replace(/\$/g,"$$$$"))}),_=_.replace(/{([A-Z0-9_]+)}/g,""),_=_.replace(/(<br>){3,}/g,"<br><br>"),typeof r<"u"&&r.getOutput&&(_+=r.getOutput()),_}tt.onclick=()=>{let v=Ht();v?(ct(v),K(Z("copiado_sucesso"))):K(Z("selecione_substatus"),{error:!0})},ot.onclick=async()=>{let v=m.value,j=Ht();if(!j){K(Z("selecione_substatus"),{error:!0});return}ct(j),qt();let _=xt(),Q=await wt();if(Q)try{if(Q.focus(),Q.innerHTML.trim()==="<p><br></p>"||Q.innerHTML.trim()==="<br>"||Q.innerText.trim()===""){let ge=document.createRange();ge.selectNodeContents(Q);let ae=window.getSelection();ae.removeAllRanges(),ae.addRange(ge),document.execCommand("delete",!1,null)}else if(!Q.innerHTML.endsWith("<br><br>")){let ge=document.createRange();ge.selectNodeContents(Q),ge.collapse(!1);let ae=window.getSelection();ae.removeAllRanges(),ae.addRange(ge),document.execCommand("insertHTML",!1,"<br><br>")}document.execCommand("insertHTML",!1,j),vt(Q),setTimeout(()=>{K(Z("inserido_copiado"))},600);let me=typeof Ve<"u"&&Ve?Ve.checked:!0;if(v&&We[v]&&me){let ge=We[v];await ft(ge),await new Promise(ae=>setTimeout(ae,500))}_(),Ot(1.5),H.value="",m.innerHTML=`<option value="">${Z("select_substatus")}</option>`,m.disabled=!0}catch(le){console.error(le),K("Erro ao inserir.",{error:!0}),_()}};function Ot(v=1.5){v<=1.5&&(Be.style.display="none",Ee.innerHTML=""),v<=2&&(c.reset(),he.style.display="none"),v<=3&&(Ae.style.display="none",De.innerHTML="",r.reset(),Ke.style.display="none",je.style.display="none")}function qt(){if(s=!s,s){let v=d.querySelector(".cw-expand-btn");v&&typeof v.resetState=="function"&&v.resetState()}Ie(s,d,"cw-btn-notes")}return St("bau"),Et("pt"),qt}var Xe={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
                    <p>Ol\xE1,</p>
                    <br>
                    <p>Aqui \xE9 o <strong>[Seu Nome]</strong> da equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tentei ligar no seguinte n\xFAmero: <strong>...</strong> sem sucesso, teria outro n\xFAmero para que eu pudesse entrar em contato?</p>
                    <br>
                    <p>Lembrando que vou auxiliar a implementar a seguinte tarefa:</p>
                    <p><strong>Ads Conversion Tracking</strong></p>
                    <br>
                    <p>Em seu site: <strong>[INSERIR URL]</strong></p>
                    <p>Tentarei ligar novamente dentro de 10 minutos, caso prefira, voc\xEA pode acessar o link da nossa reuni\xE3o: <strong>[LINK DO MEET]</strong></p>
                    <br>
                    <p>Atenciosamente,</p>
                    <p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>
                `},{id:"reschedule",name:"Proposta de Reagendamento",subject:"Reagendamento de Consultoria",body:`
                    <p>Ol\xE1, tudo bem?</p>
                    <br>
                    <p>Seguem as pr\xF3ximas datas dispon\xEDveis:</p>
                    <ul>
                        <li><strong>[DATA 1] \xE0s [HORA]</strong></li>
                        <li><strong>[DATA 2] \xE0s [HORA]</strong></li>
                        <li><strong>[DATA 3] \xE0s [HORA]</strong></li>
                    </ul>
                    <br>
                    <p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p>
                    <p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p>
                    <br>
                    <p>Atenciosamente,</p>
                    <p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>
                `},{id:"max_reschedules",name:"Limite de Reagendamentos Excedido",subject:"Status do Agendamento - Time de Solu\xE7\xF5es T\xE9cnicas do Google",body:`
                    <p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p>
                    <br>
                    <p>Espero que este e-mail o encontre bem.</p>
                    <p>Escrevo em nome do time do Google Ads para informar sobre o seu pedido de reagendamento para a implementa\xE7\xE3o das tags.</p>
                    <br>
                    <p>Infelizmente, <strong>n\xE3o podemos mais reagendar este caso espec\xEDfico</strong>, pois excedemos o limite m\xE1ximo de agendamentos permitido.</p>
                    <br>
                    <p>Se voc\xEA deseja prosseguir com a implementa\xE7\xE3o das tags, ser\xE1 necess\xE1rio abrir um <strong>novo caso</strong> diretamente com a <a href="https://support.google.com/google-ads">Ajuda do Google Ads</a>. Isso garantir\xE1 que voc\xEA receba o acompanhamento e o suporte necess\xE1rio para dar continuidade \xE0 sua solicita\xE7\xE3o.</p>
                    <br>
                    <p>Agradecemos o seu envolvimento neste processo e a oportunidade de ajudar. Esperamos continuar a nossa colabora\xE7\xE3o.</p>
                    <br>
                    <p>Atenciosamente,</p>
                    <p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>
                `}]},PROCESS_2_6:{title:"Processo 2/6",emails:[{id:"2_6_day3",name:"Dia 3 (Acompanhamento)",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",body:`
                    <p>Ol\xE1, <strong>[Nome do Cliente]</strong></p>
                    <br>
                    <p>Espero que voc\xEA esteja bem!</p>
                    <p>Tentamos contato atrav\xE9s do N\xFAmero de Telefone, por\xE9m sem sucesso. Gostaria de saber se voc\xEA j\xE1 conseguiu <strong>[INFORMAR QUAL A\xC7\xC3O FICOU PENDENTE]</strong>, ou se voc\xEA j\xE1 possui uma previs\xE3o de quando essa a\xE7\xE3o ser\xE1 conclu\xEDda.</p>
                    <br>
                    <p>Continuarei monitorando o status da implementa\xE7\xE3o no seu site, e no dia <strong>[MM/DD/YYYY]</strong> farei um novo acompanhamento para verificar o andamento da implementa\xE7\xE3o.</p>
                    <p>Se voc\xEA tiver algum problema ou d\xFAvidas que impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco.</p>
                    <br>
                    <p>Fico \xE0 disposi\xE7\xE3o.</p>
                    <p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>
                `},{id:"2_6_day6",name:"Dia 6 (Acompanhamento Final)",subject:"Consultoria com a Equipe de Solu\xE7\xF5es T\xE9cnicas do Google",body:`
                    <p>Ol\xE1, <strong>[Nome do Cliente]</strong></p>
                    <br>
                    <p>Espero que voc\xEA esteja bem!</p>
                    <p>Ap\xF3s an\xE1lise e revis\xE3o do status de implementa\xE7\xE3o da tag no seu site, <strong>[URL]</strong>, verificamos que a tag ainda est\xE1 com a implementa\xE7\xE3o pendente. Tentamos contato atrav\xE9s do email, por\xE9m sem sucesso.</p>
                    <br>
                    <p>\xC9 essencial que seja implementado, pois ele oferece uma ampla gama de benef\xEDcios, como:</p>
                    <ul>
                        <li>Ajuda a rastrear convers\xF5es em tempo real</li>
                        <li>Melhora a gera\xE7\xE3o de receita, em termos de cliques</li>
                        <li>Serve para vincular o Google Analytics e os an\xFAncios e acompanhar convers\xF5es</li>
                        <li>Fornece informa\xE7\xF5es sobre a experi\xEAncia do usu\xE1rio</li>
                    </ul>
                    <br>
                    <p>Se voc\xEA tiver algum problema ou d\xFAvidas que o impossibilite de realizar a implementa\xE7\xE3o, fique \xE0 vontade para compartilh\xE1-lo conosco. Teremos o maior prazer em ajudar.</p>
                    <p>Caso n\xE3o tenhamos nenhuma resposta nos pr\xF3ximos 3 dias, infelizmente o caso ser\xE1 encerrado.</p>
                    <br>
                    <p>Fico \xE0 disposi\xE7\xE3o.</p>
                    <p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>
                `},{id:"2_6_completed_reschedule",name:"A\xE7\xF5es Conclu\xEDdas (Solicitar Reagendamento)",subject:"Continuidade da Implementa\xE7\xE3o - Solu\xE7\xF5es T\xE9cnicas do Google",body:`
                    <p>Ol\xE1, tudo bem?</p>
                    <br>
                    <p>Maravilha! Muito bom saber que conseguiu concluir as a\xE7\xF5es pendentes. Sendo assim, agora podemos continuar com a implementa\xE7\xE3o das configura\xE7\xF5es em sua conta.</p>
                    <br>
                    <p>Para isso, pe\xE7o, por favor, que me envie algumas datas e hor\xE1rios em que est\xE1 dispon\xEDvel a partir do dia <strong>[Disponibilidade em BAU]</strong>.</p>
                    <p>Assim que me enviar essa informa\xE7\xE3o, irei criar um reagendamento para que um de nossos agentes continue te ajudando.</p>
                    <br>
                    <p>Tamb\xE9m informo que se n\xE3o houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve poss\xEDvel.</p>
                    <p>Refor\xE7o que minha agenda \xE9 din\xE2mica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias dispon\xEDveis. Logo, quanto mais r\xE1pido conseguir me responder, mais garantido ser\xE1 o agendamento de data e hor\xE1rio.</p>
                    <br>
                    <p>Atenciosamente,</p>
                    <p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google.</p>
                `}]},NRP_CLOSING:{title:"NRP / Encerramento",emails:[{id:"nrp_standard",name:"NRP - Padr\xE3o (3\xAA Tentativa)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",body:`
                    <p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p>
                    <br>
                    <p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o para <strong>[Task pedida pelo AM]</strong>. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p>
                    <p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time, ou se preferir, entre em contato com seu gerente de contas do Google para agendar uma nova reuni\xE3o.</p>
                    <p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p>
                    <br>
                    <p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p>
                    
                    <p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p>
                    <ul>
                        <li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li>
                        <li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li>
                        <li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li>
                    </ul>

                    <p><strong>Em rela\xE7\xE3o ao Shopping</strong></p>
                    <ul>
                        <li><a href="https://www.google.com/retail/">Google for Retail</a></li>
                        <li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li>
                        <li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li>
                        <li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li>
                        <li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li>
                    </ul>
                    <br>
                    <p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>
                `},{id:"nrp_dfa",name:"NRP - DFA",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Encerramento",body:`
                    <p>Ol\xE1, <strong>[Nome do Cliente]</strong>,</p>
                    <br>
                    <p>Tentamos ligar para voc\xEA hoje sobre o caso de Implementa\xE7\xE3o da tag referente \xE0 solicita\xE7\xE3o. Outra tentativa foi feita ap\xF3s 10 minutos, mas tamb\xE9m n\xE3o conseguimos contato com voc\xEA.</p>
                    <p>Devido \xE0 grande demanda, n\xE3o podemos reagendar um hor\xE1rio. Por isso, vamos encerrar este caso. No entanto, se voc\xEA ainda quiser continuar com a implementa\xE7\xE3o, basta voc\xEA acessar este link e escolher a melhor data e hor\xE1rio para falar com o nosso time.</p>
                    <p>Lamentamos o inconveniente e esperamos trabalhar com voc\xEA novamente no futuro.</p>
                    <br>
                    <p>Se voc\xEA quiser saber mais, confira abaixo alguns links \xFAteis de recursos valiosos relacionados \xE0 implementa\xE7\xE3o de tags e suporte do Shopping.</p>
                    
                    <p><strong>Em rela\xE7\xE3o \xE0s tags</strong></p>
                    <ul>
                        <li><a href="https://developers.google.com/gtagjs">Suporte \xE0 implementa\xE7\xE3o de tags</a></li>
                        <li><a href="https://www.youtube.com/user/learnwithgoogle/playlists">Google Ads</a></li>
                        <li><a href="https://www.youtube.com/user/googleanalytics">Google Analytics</a></li>
                    </ul>

                    <p><strong>Em rela\xE7\xE3o ao Shopping</strong></p>
                    <ul>
                        <li><a href="https://www.google.com/retail/">Google for Retail</a></li>
                        <li><a href="https://www.google.com/retail/solutions/merchant-center/">Google Merchant Center</a></li>
                        <li><a href="https://support.google.com/merchants/answer/188924">Como configurar a conta e o feed</a></li>
                        <li><a href="https://support.google.com/merchants/topic/7294606">Otimiza\xE7\xE3o do feed</a></li>
                        <li><a href="https://support.google.com/merchants/answer/9199328">Google plataformas</a></li>
                    </ul>
                    <br>
                    <p><strong>[Seu Nome]</strong><br>Time de Solu\xE7\xF5es T\xE9cnicas Cognizant, em nome do Google</p>
                `}]}};function Ao(){let t="v4.2.0 CR-Hybrid",e="CANNED_RESPONSES",n=Object.keys(Xe)[0],o="",s="list",i=!1,a={bgApp:"#F8F9FA",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.08)",borderFocus:"rgba(26, 115, 232, 0.4)",textPrimary:"#202124",textSecondary:"#5F6368",primary:"#1A73E8",primaryBg:"#E8F0FE",shadowCard:"0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",shadowHover:"0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",transition:"all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1)"},r={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:a.bgApp},c={display:"flex",width:"200%",height:"100%",transition:"transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",transform:"translateX(0)",willChange:"transform"},d={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},g={padding:"20px 24px 12px 24px",flexShrink:"0",background:a.bgApp,zIndex:"10",display:"flex",flexDirection:"column",gap:"16px",borderBottom:`1px solid ${a.borderSubtle}`},b={width:"100%",height:"44px",padding:"0 16px 0 48px",borderRadius:"12px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",fontWeight:"400",color:a.textPrimary,boxSizing:"border-box",outline:"none",transition:a.transition,boxShadow:"0 2px 5px rgba(0,0,0,0.03)",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%239AA0A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"16px center"},h={display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px",paddingBottom:"4px"},u={padding:"6px 14px",borderRadius:"100px",border:"1px solid #DADCE0",background:"#FFFFFF",color:a.textSecondary,fontSize:"13px",fontWeight:"500",letterSpacing:"0.3px",cursor:"pointer",transition:a.transition,flexShrink:"0",display:"flex",alignItems:"center",justifyContent:"center"},p={background:a.primaryBg,color:a.primary,borderColor:"transparent",fontWeight:"600",boxShadow:"0 1px 2px rgba(26, 115, 232, 0.15)"},T={padding:"16px 24px 80px 24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"12px"},k={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",height:"72px",minHeight:"72px",borderRadius:"16px",background:a.bgSurface,border:"1px solid transparent",boxShadow:a.shadowCard,cursor:"pointer",transition:"all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",position:"relative",overflow:"hidden"},D=document.createElement("div");D.id="quick-email-popup",D.classList.add("cw-module-window"),Object.assign(D.style,Te,{right:"100px",width:"440px",height:"640px",borderRadius:"20px",boxShadow:"0 24px 64px rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.4)"});let B={popup:D,googleLine:null,focusElement:null};function W(){i=!i,Ie(i,D,"cw-btn-email"),i||setTimeout(()=>y(),300)}let se=qe(D,"Quick Email",t,"Templates & Automa\xE7\xF5es",B,()=>W()),A=document.createElement("div");Object.assign(A.style,r);let x=document.createElement("div");Object.assign(x.style,c);let w=document.createElement("div");Object.assign(w.style,d);let C=document.createElement("div");Object.assign(C.style,g);let N=document.createElement("input");N.placeholder="Pesquisar templates...",Object.assign(N.style,b),N.onfocus=()=>{N.style.borderColor=a.primary,N.style.boxShadow="0 0 0 4px rgba(26, 115, 232, 0.15)",N.style.background="#fff"},N.onblur=()=>{N.style.borderColor="transparent",N.style.boxShadow="0 2px 5px rgba(0,0,0,0.03)",N.style.background="#fff"},B.focusElement=N;let S=document.createElement("div");Object.assign(S.style,h);let F=document.createElement("div");Object.assign(F.style,T),C.appendChild(N),C.appendChild(S),w.appendChild(C),w.appendChild(F);let R=document.createElement("div");Object.assign(R.style,d);let q=document.createElement("div");Object.assign(q.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),R.appendChild(q),x.appendChild(w),x.appendChild(R),A.appendChild(x),D.appendChild(se),D.appendChild(A),document.body.appendChild(D);async function H(I,V){try{i&&W();let L=xt();await new Promise(M=>setTimeout(M,800)),V==="email"?await co(I):V==="cr"&&await ft(I),L()}catch(L){console.error("\u274C Erro:",L);let M=document.querySelector(".cw-focus-backdrop");M&&M.classList.remove("active")}}function l(I){s="detail",x.style.transform="translateX(-50%)";let V='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',L='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';q.innerHTML=`
            <style>
                .cw-email-content p { margin: 0 0 8px 0; } /* Margem apenas embaixo */
                .cw-email-content ul { margin: 0 0 8px 16px; padding: 0; }
                .cw-email-content li { margin-bottom: 4px; }
            </style>

            <div style="position:sticky; top:0; background:rgba(255,255,255,0.9); backdrop-filter:blur(12px); border-bottom:1px solid #eee; padding:16px 24px; z-index:10; display:flex; align-items:center; gap:12px;">
                <button id="csa-back-btn" style="background:none; border:none; cursor:pointer; display:flex; color:#5f6368; padding:8px; margin-left:-12px; border-radius:50%; transition:background 0.2s;">${V}</button>
                <div style="font-weight:600; font-size:16px; color:#202124; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${I.name}</div>
            </div>
            
            <div style="padding:24px;">
                <div style="margin-bottom:24px;">
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Assunto</div>
                    <div style="font-size:14px; font-weight:500; color:#202124; padding:16px; background:#F8F9FA; border-radius:12px; border:1px solid #eee; box-shadow:inset 0 1px 2px rgba(0,0,0,0.02);">${I.subject}</div>
                </div>
                
                <div>
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Mensagem</div>
                    
                    <div class="cw-email-content" style="font-size:13px; color:#3c4043; line-height:1.5; white-space: normal; word-break: break-word; padding:0 4px;">
                        ${I.body}
                    </div>
                </div>
            </div>
            
            <div style="position:sticky; bottom:0; padding:24px; background:linear-gradient(to top, #fff 90%, rgba(255,255,255,0)); pointer-events:none;">
                <button id="csa-insert-btn" style="pointer-events:auto; width:100%; padding:14px; background:#1a73e8; color:white; border:none; border-radius:12px; font-size:14px; font-weight:600; cursor:pointer; display:flex; justify-content:center; align-items:center; gap:10px; box-shadow:0 4px 12px rgba(26,115,232,0.3); transition:transform 0.2s, box-shadow 0.2s;">
                    ${L} Usar Template
                </button>
            </div>
        `;let M=q.querySelector("#csa-back-btn");M.onmouseenter=()=>M.style.background="#f1f3f4",M.onmouseleave=()=>M.style.background="none",M.onclick=y;let G=q.querySelector("#csa-insert-btn");G.onmouseenter=()=>{G.style.transform="translateY(-1px)",G.style.boxShadow="0 6px 16px rgba(26,115,232,0.4)"},G.onmouseleave=()=>{G.style.transform="translateY(0)",G.style.boxShadow="0 4px 12px rgba(26,115,232,0.3)"},G.onclick=()=>{G.style.transform="scale(0.96)",H(I,"email"),setTimeout(()=>{G.style.transform="scale(1)",y()},300)}}function y(){s="list",x.style.transform="translateX(0)"}function f(I,V,L=null){let M=document.createElement("button"),G=L?`<span style="margin-right:6px; font-size:14px; opacity:0.9;">${L}</span>`:"";return M.innerHTML=`${G}${I}`,Object.assign(M.style,u),n===V&&o===""?Object.assign(M.style,p):(M.onmouseenter=()=>{M.style.background="#F1F3F4",M.style.borderColor="#DADCE0"},M.onmouseleave=()=>{M.style.background="#FFFFFF",M.style.borderColor="#DADCE0"}),M.onclick=()=>{n=V,o="",N.value="",m(),E()},M}function m(){S.innerHTML="",S.appendChild(f("Smart CRs",e,"\u26A1")),Object.keys(Xe).forEach(I=>{S.appendChild(f(Xe[I].title,I))})}function E(){F.innerHTML="";let I=[];if(o.trim()!==""){let $=o.toLowerCase();Object.values(Xe).forEach(O=>{O.emails.forEach(P=>{(P.name.toLowerCase().includes($)||P.subject.toLowerCase().includes($))&&I.push({type:"email",data:P})})}),Object.entries(We).forEach(([O,P])=>{if(!P)return;(O.replace(/_/g," ").toLowerCase().includes($)||P.toLowerCase().includes($))&&I.push({type:"cr",key:O,code:P})})}else n===e?Object.entries(We).forEach(([$,O])=>{O&&I.push({type:"cr",key:$,code:O})}):Xe[n]&&Xe[n].emails.forEach($=>{I.push({type:"email",data:$})});if(I.length===0){F.innerHTML=`
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F50D}</div>
                    <div style="font-size:14px; font-weight:500;">Nenhum template encontrado</div>
                    <div style="font-size:12px; margin-top:4px;">Tente outro termo de busca</div>
                </div>`;return}let L='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1967D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',M='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA8600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',G='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BDC1C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';I.forEach($=>{let O=document.createElement("div");if(Object.assign(O.style,k),$.type==="email"){let P=$.data,de=P.subject.length>45?P.subject.substring(0,45)+"...":P.subject;O.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#E8F0FE; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${L}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${P.name}</div>
                        <div style="font-size:12px; color:#5F6368; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${de}</div>
                    </div>
                    <div style="margin-left:12px; opacity:0.6;">${G}</div>
                `,O.onclick=()=>l(P)}else{let P=$.key.replace(/_/g," ").replace("AS ","AS - ").replace("NI ","NI - ");O.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#FEF7E0; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${M}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; margin-bottom:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${P}</div>
                        <div style="font-size:11px; font-weight:500; color:#EA8600; font-family:'Roboto Mono', monospace; letter-spacing:-0.2px;">${$.code}</div>
                    </div>
                    <div style="font-size:10px; font-weight:700; color:#DADCE0; text-transform:uppercase; letter-spacing:0.5px; border:1px solid #F1F3F4; padding:4px 8px; border-radius:6px; margin-left:12px;">Inserir</div>
                `,O.onclick=()=>{O.style.transform="scale(0.98)",O.style.background="#FEF7E0",setTimeout(()=>{O.style.transform="scale(1)",O.style.background="#fff",H($.code,"cr")},150)}}O.onmouseenter=()=>{O.style.transform="translateY(-2px)",O.style.boxShadow=a.shadowHover,$.type==="cr"?O.style.borderLeft="3px solid #Fbbc04":O.style.borderLeft="3px solid #1a73e8"},O.onmouseleave=()=>{O.style.transform="translateY(0)",O.style.boxShadow=a.shadowCard,O.style.borderLeft="1px solid transparent"},F.appendChild(O)})}return N.addEventListener("input",I=>{o=I.target.value,o!==""?Array.from(S.children).forEach(V=>{Object.assign(V.style,u),V.style.opacity="0.6"}):m(),E()}),m(),E(),W}var Co={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function So(){let t="v2.1 (Apple Motion)",e={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#f8f9fa",scrollBehavior:"smooth"},card:{background:"#ffffff",border:"1px solid #dadce0",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"13px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"10px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.15s ease, opacity 0.3s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.5",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"20px",height:"20px",borderRadius:"6px",border:"2px solid #dadce0",marginRight:"14px",marginTop:"1px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #eee",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"}},n={},o="PT",s="BAU",i=!1,a=document.createElement("div");a.id="call-script-popup",a.classList.add("cw-module-window"),Object.assign(a.style,Te,{right:"auto",left:"50%",width:"400px",height:"650px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let r={popup:a,googleLine:null};function c(){i=!i,Ie(i,a,"cw-btn-script")}let d=qe(a,"Call Script",t,"Guia interativo para condu\xE7\xE3o de chamadas.",r,()=>{c()});a.appendChild(d);let g=document.createElement("div");Object.assign(g.style,e.progressBarContainer);let b=document.createElement("div");Object.assign(b.style,e.progressBarFill),g.appendChild(b),a.appendChild(g);let h=document.createElement("div");h.id="csa-content",Object.assign(h.style,e.contentArea),a.appendChild(h);let u=document.createElement("div");Object.assign(u.style,e.footer);let p=document.createElement("span");p.textContent="by lucaste@",Object.assign(p.style,{fontSize:"10px",color:"#bdc1c6"});let T=document.createElement("button");T.innerHTML=`
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
    Resetar Script
  `,Object.assign(T.style,e.resetBtn),T.onmouseenter=()=>T.style.background="#fce8e6",T.onmouseleave=()=>T.style.background="transparent",T.onclick=()=>{T.style.transform="scale(0.9)",setTimeout(()=>T.style.transform="scale(1)",150);for(let R in n)delete n[R];C()},u.appendChild(p),u.appendChild(T),a.appendChild(u);let k=document.createElement("div");Object.assign(k.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let D=document.createElement("div");Object.assign(D.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let B=document.createElement("div");B.textContent="BAU";let W=document.createElement("div");W.textContent="LT",Object.assign(B.style,ye),Object.assign(W.style,ye),D.appendChild(B),D.appendChild(W);let se=document.createElement("select");Object.assign(se.style,oo,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),se.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',se.value=o,k.appendChild(D),k.appendChild(se),h.appendChild(k);let A=document.createElement("div");A.id="csa-checklist-area",h.appendChild(A);let x=document.createElement("div");Object.assign(x.style,Qe),x.className="no-drag",x.title="Redimensionar",a.appendChild(x),Ze(a,x),document.body.appendChild(a);function w(R){return R}function C(){A.innerHTML="";let R=`${o} ${s}`,q=Co[R];if(!q){A.innerHTML=`<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <div style="font-size: 24px;">\u2615</div>
        <div>Script n\xE3o configurado.</div>
      </div>`,b.style.width="0%";return}let H=q.color||"#1a73e8",l=0,y=0;["inicio","fim"].forEach(f=>{q[f]&&(l+=q[f].length)}),["inicio","fim"].forEach((f,m)=>{let E=q[f];if(!E||E.length===0)return;let I=document.createElement("div");Object.assign(I.style,e.card);let V=document.createElement("div");Object.assign(V.style,e.cardTitle);let L=f==="inicio"?"Abertura":"Fechamento";o.includes("ES")&&(L=f==="inicio"?"Apertura":"Cierre"),o.includes("EN")&&(L=f==="inicio"?"Opening":"Closing"),V.textContent=L;let M=document.createElement("span");M.style.fontSize="11px",M.style.opacity="0.7",M.style.fontWeight="500",M.style.background="#f1f3f4",M.style.padding="2px 8px",M.style.borderRadius="10px",V.appendChild(M),I.appendChild(V);let G=0;E.forEach(($,O)=>{let P=`${R}-${f}-${O}`,de=!!n[P];de&&(y++,G++);let oe=document.createElement("div");Object.assign(oe.style,e.itemRow);let ne=document.createElement("div");Object.assign(ne.style,e.checkbox);let ce=document.createElement("span");ce.innerHTML=$,ce.style.flex="1",de?(Object.assign(oe.style,e.itemCompleted),ne.style.background=H,ne.style.borderColor=H,ne.style.transform="scale(1)",ne.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(oe.style.textDecoration="none",oe.style.opacity="1",ne.style.background="transparent",ne.style.borderColor="#dadce0",ne.style.transform="scale(1)",ne.innerHTML=""),oe.onclick=()=>{let fe=!n[P];n[P]=fe,ie.playClick(),fe?(ne.style.transform="scale(1.2)",setTimeout(()=>ne.style.transform="scale(1)",150),Object.assign(oe.style,e.itemCompleted),ne.style.background=H,ne.style.borderColor=H,ne.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(oe.style.textDecoration="none",oe.style.opacity="1",ne.style.background="transparent",ne.style.borderColor="#dadce0",ne.innerHTML=""),N(R,q)},oe.onmouseenter=()=>{n[P]||(oe.style.background="#f1f3f4",ne.style.borderColor=H)},oe.onmouseleave=()=>{n[P]||(oe.style.background="transparent",ne.style.borderColor="#dadce0")},oe.appendChild(ne),oe.appendChild(ce),I.appendChild(oe)}),G===E.length&&E.length>0&&(M.style.color="#1e8e3e",M.style.background="#e6f4ea",I.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),M.textContent=`${G}/${E.length}`,A.appendChild(I)}),S(l,y)}function N(R,q){let H=0,l=0;["inicio","fim"].forEach(y=>{let f=q[y]||[];H+=f.length;let m=0;f.forEach((E,I)=>{n[`${R}-${y}-${I}`]&&(l++,m++)})}),S(H,l),setTimeout(()=>C(),200)}function S(R,q){let H=R===0?0:q/R*100;b.style.width=`${H}%`,H===100?b.style.background="#34A853":b.style.background="linear-gradient(90deg, #4285F4, #34A853)"}function F(R){s=R;let q=it();Object.assign(B.style,ye),Object.assign(W.style,ye),Object.assign(R==="BAU"?B.style:W.style,q),C()}return B.onclick=()=>F("BAU"),W.onclick=()=>F("LT"),se.addEventListener("change",R=>{o=R.target.value,C()}),F(s),c}var At={tasks:{label:"Minhas Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico (Cognizant)"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda interna"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio de Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM Team & LT"},{name:"Performance Individual",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO (go/mymetricswebao)"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form para solicitar grava\xE7\xE3o da chamada."},{name:"Escala\xE7\xE3o de Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form para escala\xE7\xE3o de Sellers, compartilhado pelo gpozzi@."},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es para o split."}]},ads:{label:"Google Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page Application para suporte"},{name:"[SOP] Ads Conversion Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o de Convers\xE3o"},{name:"Win Criteria: Conversion Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Planilha de valida\xE7\xE3o de c\xF3digo"},{name:"[SOP] Website Call Conversion",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o de Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conversions",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"Convers\xF5es Otimizadas"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento de EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o de problemas de convers\xE3o"},{name:"Win Criteria: Troubleshooting",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=B4:B7",desc:"Valida\xE7\xE3o de Troubleshoot"},{name:"[SOP] Ads Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o de Remarketing"},{name:"[SOP] Dynamic Remarketing (Retail)",url:"https://docs.google.com/document/d/1NVGBhJ-bYAq-F-55Te2T7Kz1HOTuj0KZc-SBbdfyfyM/edit",desc:"Varejo"},{name:"[SOP] Customer Match",url:"https://docs.google.com/document/d/1945XuWXxAnfQyIBK0-46cPf2brxhbu1-mMbKjvs_EOU/edit",desc:"Lista de Clientes"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o de Leads"},{name:"[SOP] GTM Installation",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o do Container"}]},analytics:{label:"Analytics (GA4)",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o e Configura\xE7\xE3o"},{name:"Win Criteria: GA4 Setup",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce Guide",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia de Dev para E-comm"},{name:"[SOP] Troubleshooting GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o de Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"FAQs de Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista oficial de eventos"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador de URLs de campanha"}]},shopping:{label:"Shopping",links:[{name:"[SOP] Onboarding MC 2.0",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Optimization",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o de Feed BAU"},{name:"Consult ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna de Consult"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es de Produtos"},{name:"[SOP] Offline Feed (GSS)",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o de Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center Oficial"}]},tech:{label:"Tech Helper",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias de implementa\xE7\xE3o por CMS."},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es t\xE9cnicas para Iframes."},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost para Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost para Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost para GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta Gearloose"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost para Merchant Center"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground C\xF3digo"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador de Regex"},{name:"Gerador de Pessoas",url:"https://www.4devs.com.br/gerador_de_pessoas",desc:"Dados de teste (4Devs)"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. oficial sobre CSP"},{name:"Doc. Enhanced Conversion",url:"https://support.google.com/google-ads/answer/9888656?hl=en",desc:"Como funcionam as convers\xF5es otimizadas?"},{name:"Doc. CoMo",url:"https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=pt-br",desc:"Doc. oficial sobre Consent Mode"},{name:"Cursos SkillShop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos sobre as ferramentas do Google."},{name:"Consent Mode - Instala\xE7\xE3o",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Configurar o modo de consentimento em sites."},{name:"CMPs - Consent Mode",url:"https://cmppartnerprogram.withgoogle.com/",desc:"Lista com CMPS parceiros do Google."},{name:"Consent Mode - Testes",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Ensina como testar CoMo."}]},hr:{label:"RH / Cognizant",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal do Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha de Pagamento"}]},lm:{label:"LM Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas/pausas."},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro de chamadas longas."},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema."},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria."}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo."},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis."}]},suporte:{label:"Suportes",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"}]}};function Eo(){let t="v3.1.0 Full",e="tasks",n="",o={bgApp:"#F8F9FA",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.08)",textPrimary:"#202124",textSecondary:"#5F6368",primary:"#1A73E8",primaryBg:"#E8F0FE",shadowCard:"0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",shadowHover:"0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",transition:"all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1)"},s={width:"100%",height:"40px",padding:"0 12px 0 40px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:o.textPrimary,boxSizing:"border-box",outline:"none",transition:o.transition,boxShadow:"0 2px 5px rgba(0,0,0,0.03)",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%239AA0A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center"},i={display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px",padding:"4px 0 12px 0"},a={padding:"6px 14px",borderRadius:"100px",border:"1px solid #DADCE0",background:"#FFFFFF",color:o.textSecondary,fontSize:"13px",fontWeight:"500",cursor:"pointer",whiteSpace:"nowrap",transition:o.transition,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:"0"},r={background:o.primaryBg,color:o.primary,borderColor:"transparent",fontWeight:"600",boxShadow:"0 1px 2px rgba(26, 115, 232, 0.15)"},c={display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px",padding:"12px 16px",marginBottom:"8px",borderRadius:"12px",background:o.bgSurface,border:"1px solid transparent",boxShadow:o.shadowCard,cursor:"pointer",transition:"transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.2s, border-color 0.2s",overflow:"hidden",minWidth:"0",opacity:"0",transform:"translateY(10px)"},d={width:"36px",height:"36px",flexShrink:"0",borderRadius:"10px",background:"#F1F3F4",color:o.textSecondary,display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s, color 0.2s"},g=document.createElement("div");g.id="feedback-popup",g.classList.add("cw-module-window"),Object.assign(g.style,Te,{right:"100px",width:"460px",height:"640px",background:o.bgApp});let b={tasks:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',lm:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>',ads:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>'},h={popup:g,googleLine:null,focusElement:null},u=!1,p=qe(g,"Links & Bookmarks",t,"Acesso r\xE1pido \xE0s suas ferramentas, dashboards e documenta\xE7\xF5es.",h,()=>A());g.appendChild(p);let T=document.createElement("div");Object.assign(T.style,{padding:"20px 24px 12px 24px",display:"flex",flexDirection:"column",gap:"16px",borderBottom:`1px solid ${o.borderSubtle}`,flexShrink:"0",backgroundColor:o.bgApp});let k=document.createElement("input");k.type="text",k.placeholder="Pesquisar...",Object.assign(k.style,s),h.focusElement=k,k.onfocus=()=>{k.style.borderColor=o.primary,k.style.backgroundColor="#fff",k.style.boxShadow="0 0 0 4px rgba(26, 115, 232, 0.15)"},k.onblur=()=>{k.style.borderColor="transparent",k.style.backgroundColor="#fff",k.style.boxShadow="0 2px 5px rgba(0,0,0,0.03)"};let D=document.createElement("div");Object.assign(D.style,i),T.appendChild(k),T.appendChild(D),g.appendChild(T);let B=document.createElement("div");Object.assign(B.style,{padding:"16px 24px",overflowY:"auto",flexGrow:"1",backgroundColor:o.bgApp}),g.appendChild(B),document.body.appendChild(g);function W(){D.innerHTML="",Object.keys(At).forEach(x=>{let w=At[x],C=document.createElement("button"),N=b[x]||"";C.innerHTML=`<span style="display:inline-flex; align-items:center; margin-right:6px; opacity:0.9;">${N}</span>${w.label}`,Object.assign(C.style,a),e===x&&n===""?Object.assign(C.style,r):(C.onmouseenter=()=>{C.style.background="#F1F3F4",C.style.borderColor="#DADCE0"},C.onmouseleave=()=>{C.style.background="#FFFFFF",C.style.borderColor="#DADCE0"}),C.onclick=()=>{e=x,n="",k.value="",W(),se()},D.appendChild(C)})}function se(){B.innerHTML="";let x=[],w=n.trim()!=="";if(w?Object.entries(At).forEach(([C,N])=>{let S=N.links.filter(F=>F.name.toLowerCase().includes(n.toLowerCase())||F.desc.toLowerCase().includes(n.toLowerCase()));S.forEach(F=>{F._catIcon=b[C]}),x=[...x,...S]}):(x=At[e].links,x.forEach(C=>C._catIcon=b[e])),x.length===0){B.innerHTML=`
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:#9AA0A6;">
            <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F50D}</div>
            <div style="font-size:14px; font-weight:500;">Nenhum link encontrado</div>
        </div>`;return}x.forEach((C,N)=>{let S=document.createElement("div");Object.assign(S.style,c);let F=document.createElement("div");Object.assign(F.style,d),F.innerHTML=C._catIcon||'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',S.appendChild(F);let R=document.createElement("div");R.style.flexGrow="1",R.style.minWidth="0",R.style.display="flex",R.style.flexDirection="column",R.style.gap="2px";let q=E=>{if(!w)return E;let I=new RegExp(`(${n})`,"gi");return E.replace(I,'<span style="color:#1a73e8; font-weight:700;">$1</span>')},H=`<div style="font-size:14px; font-weight:600; color:${o.textPrimary}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${q(C.name)}</div>`,l=`<div style="font-size:12px; color:${o.textSecondary}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${q(C.desc)}</div>`;R.innerHTML=H+l,S.appendChild(R);let y=document.createElement("div");y.style.display="flex",y.style.alignItems="center",y.style.gap="8px",y.style.flexShrink="0",y.style.opacity="0.4",y.style.transition="opacity 0.2s";let f=document.createElement("div");f.title="Copiar Link",f.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',Object.assign(f.style,{width:"32px",height:"32px",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",color:o.textSecondary,cursor:"pointer",transition:"all 0.2s ease"}),f.onclick=E=>{ie.playClick(),E.stopPropagation(),navigator.clipboard.writeText(C.url),f.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',f.style.color="#188038",f.style.background="#E6F4EA",setTimeout(()=>{f.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',f.style.color=o.textSecondary,f.style.background="transparent"},1500)},f.onmouseenter=()=>{f.style.background="#F1F3F4"},f.onmouseleave=()=>{f.style.background="transparent"},y.appendChild(f);let m=document.createElement("div");m.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>',Object.assign(m.style,{display:"flex",alignItems:"center",justifyContent:"center",color:"#DADCE0",width:"24px",height:"24px"}),y.appendChild(m),S.appendChild(y),S.onclick=()=>window.open(C.url,"_blank"),S.onmouseenter=()=>{S.style.transform="translateY(-2px)",S.style.boxShadow=o.shadowHover,y.style.opacity="1",F.style.background="#E8F0FE",F.style.color="#1967D2",m.style.color="#1A73E8"},S.onmouseleave=()=>{S.style.transform="translateY(0)",S.style.boxShadow=o.shadowCard,y.style.opacity="0.4",F.style.background="#F1F3F4",F.style.color=o.textSecondary,m.style.color="#DADCE0"},B.appendChild(S),requestAnimationFrame(()=>{setTimeout(()=>{S.style.opacity="1",S.style.transform="translateY(0)"},N*30)})})}k.addEventListener("input",x=>{n=x.target.value,n!==""?Array.from(D.children).forEach(w=>{Object.assign(w.style,a),w.style.opacity="0.6"}):W(),se()});function A(){u=!u,Ie(u,g,"cw-btn-links")}return W(),se(),A}var ze=[];function Pt(t){ze=t}var jo=["lucaste"],Ho=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function To(){let t="v4.9 (High Contrast UI)",e=!1,n=null,o=null;function s(l){if(!l)return"";try{let y=new Date(l);return isNaN(y.getTime())?String(l):y.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(l)}}if(!document.getElementById("cw-broadcast-hd-css")){let l=document.createElement("style");l.id="cw-broadcast-hd-css",l.innerHTML=`
        @keyframes cw-pulse {
            0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(147, 51, 234, 0.7); }
            70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(147, 51, 234, 0); }
            100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(147, 51, 234, 0); }
        }
        
        .cw-btn-interactive {
            transition: transform 0.1s ease, background 0.2s ease;
            cursor: pointer; user-select: none;
        }
        .cw-btn-interactive:active { transform: scale(0.96); }

        /* Overlay do Editor */
        .cw-editor-overlay {
            position: absolute; inset: 0; 
            background: rgba(255, 255, 255, 0.98); 
            z-index: 200; display: flex; flex-direction: column;
            transform: translateY(100%); 
            transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
            box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
        }
        .cw-editor-overlay.active { transform: translateY(0); }

        /* Inputs HD */
        .cw-hd-input {
            width: 100%; padding: 12px 14px;
            border: 1px solid #DADCE0; border-radius: 12px;
            font-size: 14px; color: #202124; background: #FFF;
            transition: border 0.2s, box-shadow 0.2s;
            box-sizing: border-box; outline: none; font-family: 'Google Sans', Roboto, sans-serif;
        }
        .cw-hd-input:focus { border-color: #1a73e8; box-shadow: 0 0 0 3px rgba(26,115,232,0.1); }
        .cw-hd-input::placeholder { color: #9AA0A6; }

        .cw-radio-group { display: flex; gap: 12px; }
        .cw-radio-option {
            flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
            padding: 12px; border-radius: 12px; border: 1px solid #E0E0E0;
            font-size: 13px; font-weight: 600; cursor: pointer;
            transition: all 0.2s; position: relative; color: #5F6368;
        }
        .cw-radio-option:hover { background: #F8F9FA; }
        .cw-radio-option input { position: absolute; opacity: 0; }
        
        .cw-radio-option.info.checked { background: #E8F0FE; color: #1967D2; border-color: #1967D2; }
        .cw-radio-option.critical.checked { background: #FEE2E2; color: #B91C1C; border-color: #EF4444; }
        .cw-radio-option.success.checked { background: #DCFCE7; color: #15803D; border-color: #22C55E; }
        
        .cw-card-actions {
            display: flex; justify-content: flex-end; gap: 12px;
            padding: 12px 20px; background: #F8F9FA;
            border-top: 1px solid #F1F3F4;
        }
        .cw-action-btn {
            display: flex; align-items: center; gap: 6px;
            padding: 6px 12px; border-radius: 8px;
            font-size: 12px; font-weight: 600; cursor: pointer;
            border: 1px solid transparent; background: transparent;
            transition: all 0.2s;
        }
        .cw-action-btn.edit { color: #1967D2; }
        .cw-action-btn.edit:hover { background: #E8F0FE; }
        .cw-action-btn.delete { color: #D93025; }
        .cw-action-btn.delete:hover { background: #FCE8E6; }
      `,document.head.appendChild(l)}let i={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},a={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function r(l){return l?Object.entries(l).map(([y,f])=>`${y.replace(/[A-Z]/g,m=>"-"+m.toLowerCase())}:${f}`).join(";"):""}function c(l){if(!l||typeof l!="string")return"";let y=l;return y=y.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),y=y.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),y=y.replace(/_(.*?)_/g,"<i>$1</i>"),y=y.replace(/\n/g,"<br>"),y=ao(y),y}let d=document.createElement("div");d.id="broadcast-popup",d.classList.add("cw-module-window"),Object.assign(d.style,Te,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let g={popup:d,googleLine:null};function b(){if(e=!e,Ie(e,d,"cw-btn-broadcast"),e){let l=document.getElementById("cw-btn-broadcast");l&&l.classList.remove("has-new"),w()}}let h=qe(d,"Central de Avisos",t,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",g,()=>b()),u=h.querySelector(".cw-header-actions")||h.lastElementChild,p=null;function T(){let l=null;try{l=Xt()}catch{console.warn("TechSol: Auth Pending")}if(l){let y=l.split("@")[0].toLowerCase(),f=jo.includes(y);if(window._cwIsAdmin=f,window._cwCurrentUser=y,f&&u&&!u.querySelector("#cw-admin-btn")){let m=document.createElement("div");m.id="cw-admin-btn",m.className="cw-btn-interactive",m.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(m.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),m.title="Novo Aviso",m.onclick=E=>{E.stopPropagation(),B()},u.insertBefore(m,u.firstChild),p||D(),N()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(T,2e3))}if(u){let l=document.createElement("button");l.textContent="Limpar",l.className="cw-btn-interactive",Object.assign(l.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),l.onclick=y=>{y.stopPropagation(),ie.playSuccess();let f=ze.map(m=>m.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(f)),N(),C()},u.insertBefore(l,u.firstChild)}d.appendChild(h);let k=document.createElement("div");k.id="cw-update-status",k.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",d.appendChild(k);function D(){p=document.createElement("div"),p.className="cw-editor-overlay",p.innerHTML=`
        <div style="flex:1; overflow-y:auto; padding: 24px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 24px;">
                <span id="cw-editor-title-label" style="font-size: 20px; font-weight: 700; color: #202124;">Novo Aviso</span>
                <button id="cw-bc-close-x" class="cw-btn-interactive" style="background:none; border:none; color:#5f6368; padding:8px;"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
            </div>
            
            <div style="margin-bottom:20px;">
                <label style="font-size:12px; font-weight:700; color:#5f6368; margin-bottom:8px; display:block;">TIPO DO COMUNICADO</label>
                <div class="cw-radio-group">
                    <div class="cw-radio-option info" onclick="this.querySelector('input').click()">
                        <input type="radio" name="cw-bc-type" value="info" checked> \u2139\uFE0F Info
                    </div>
                    <div class="cw-radio-option critical" onclick="this.querySelector('input').click()">
                        <input type="radio" name="cw-bc-type" value="critical"> \u{1F6A8} Alerta
                    </div>
                    <div class="cw-radio-option success" onclick="this.querySelector('input').click()">
                        <input type="radio" name="cw-bc-type" value="success"> \u2705 Sucesso
                    </div>
                </div>
            </div>

            <div style="margin-bottom:20px;">
                 <label style="font-size:12px; font-weight:700; color:#5f6368; margin-bottom:8px; display:block;">T\xCDTULO</label>
                 <input id="cw-bc-title" class="cw-hd-input" placeholder="Resumo do assunto">
            </div>

            <div style="margin-bottom:20px;">
                 <label style="font-size:12px; font-weight:700; color:#5f6368; margin-bottom:8px; display:block;">MENSAGEM</label>
                 <textarea id="cw-bc-text" class="cw-hd-input" placeholder="Escreva os detalhes aqui... Suporta HTML e Emojis :)" style="height:160px; resize:none; line-height:1.6;"></textarea>
            </div>
        </div>

        <div style="padding: 16px 24px; border-top: 1px solid #F1F3F4; background: #fff; display: flex; justify-content: flex-end; gap: 12px;">
            <button id="cw-bc-cancel" class="cw-btn-interactive" style="padding:10px 20px; background:white; border:1px solid #dadce0; color:#5f6368; border-radius:24px; font-weight:600; font-size:13px;">Cancelar</button>
            <button id="cw-bc-send" class="cw-btn-interactive" style="padding:10px 24px; background:#1a73e8; color:white; border:none; border-radius:24px; font-weight:600; box-shadow:0 4px 12px rgba(26,115,232,0.3); font-size:13px;">Publicar</button>
        </div>
      `,p.querySelectorAll('input[name="cw-bc-type"]').forEach(m=>{m.addEventListener("change",()=>{p.querySelectorAll(".cw-radio-option").forEach(E=>E.classList.remove("checked")),m.parentElement.classList.add("checked")})}),setTimeout(()=>{let m=p.querySelector(".cw-radio-option.info");m&&m.classList.add("checked")},100);let l=p.querySelector("#cw-bc-cancel"),y=p.querySelector("#cw-bc-close-x"),f=p.querySelector("#cw-bc-send");l.onclick=W,y.onclick=W,f.onclick=se,d.appendChild(p)}function B(l=null){if(!p)return;let y=p.querySelector("#cw-editor-title-label"),f=p.querySelector("#cw-bc-title"),m=p.querySelector("#cw-bc-text"),E=p.querySelector("#cw-bc-send");if(l){o=l.id,y.textContent="Editar Aviso",f.value=l.title||"",m.value=l.text||"",E.textContent="Salvar Altera\xE7\xF5es";let I=l.type||"info",V=p.querySelector(`input[name="cw-bc-type"][value="${I}"]`);V&&V.click()}else{o=null,y.textContent="Novo Aviso",f.value="",m.value="",E.textContent="Publicar";let I=p.querySelector('input[name="cw-bc-type"][value="info"]');I&&I.click()}p.classList.add("active"),setTimeout(()=>f.focus(),300)}function W(){p&&p.classList.remove("active"),o=null}async function se(){let l=p.querySelector("#cw-bc-send"),y=p.querySelector("#cw-bc-title"),f=p.querySelector("#cw-bc-text"),m=p.querySelector('input[name="cw-bc-type"]:checked'),E=m?m.value:"info";if(!y.value.trim()||!f.value.trim()){K("Preencha todos os campos!",{error:!0});return}l.textContent="Salvando...",l.style.opacity="0.7";let I=!1;o?I=await we.updateBroadcast(o,{title:y.value,text:f.value,type:E}):I=await we.sendBroadcast({title:y.value,text:f.value,type:E,author:window._cwCurrentUser||"admin"}),I?(K(o?"Atualizado!":"Publicado!"),ie.playSuccess(),W(),setTimeout(()=>w(),1500)):(K("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),l.textContent=o?"Salvar Altera\xE7\xF5es":"Publicar",l.style.opacity="1")}async function A(l){if(confirm("Confirma a exclus\xE3o deste aviso?"))if(await we.deleteBroadcast(l)){K("Aviso removido."),ie.playClick();let f=ze.findIndex(m=>m.id===l);f>-1&&ze.splice(f,1),N(),setTimeout(()=>w(),1500)}else K("Erro ao excluir.",{error:!0})}let x=document.createElement("div");x.className="cw-nice-scroll",Object.assign(x.style,i.feedContainer),d.appendChild(x);async function w(){e&&(k.style.display="block",k.innerHTML="\u{1F504} Sincronizando...");try{let l=await we.fetchData();l&&l.broadcast&&(Pt(l.broadcast),C(),e&&(N(),k.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{k.style.display="none"},1500)))}catch{e&&(k.innerHTML="\u26A0\uFE0F Offline")}}function C(){let l=document.getElementById("cw-btn-broadcast");if(!l)return;let y=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(ze.some(m=>!y.includes(m.id))){if(l.classList.add("has-new"),!l.querySelector(".cw-badge")){let m=document.createElement("div");m.className="cw-badge",Object.assign(m.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),l.appendChild(m)}}else{l.classList.remove("has-new");let m=l.querySelector(".cw-badge");m&&m.remove()}}function N(){x.innerHTML="";let l=d.querySelector("#cw-bau-widget");l&&l.remove();let y=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),f=[...ze].sort((L,M)=>{let G=new Date(L.date).getTime()||0;return(new Date(M.date).getTime()||0)-G}),m=f.findIndex(L=>L.title&&L.title.toLowerCase().includes("disponibilidade bau"));if(m!==-1){let L=f[m];f.splice(m,1);let M=document.createElement("div");M.id="cw-bau-widget",Object.assign(M.style,i.bauContainer);let G=[],$=(L.text||"").split(`
`),O=/\d{1,2}\/\d{1,2}/;if($.forEach(ce=>{let fe=ce.match(O);if(fe){let Se=fe[0],Ne="\u{1F4C5}";/🇧🇷|🇵🇹|PT|BR/i.test(ce)?Ne="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(ce)&&(Ne="\u{1F1EA}\u{1F1F8}"),G.some(Fe=>Fe.flag===Ne&&Fe.date===Se)||G.push({flag:Ne,date:Se})}}),G.length===0){let ce=(L.text||"").match(/\d{1,2}\/\d{1,2}/g);ce&&[...new Set(ce)].forEach(fe=>G.push({flag:"\u{1F4C5}",date:fe}))}let P="",de='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(de=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${de}
              `),G.length>0?P=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${G.map(fe=>`
                  <div style="${r(i.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${r(i.bauFlag)}">${fe.flag}</span>
                      <span style="${r(i.bauDate)}">${fe.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${de}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${c(L.text)}</div>
              `:P=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${c(L.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,M.innerHTML=`
              <div style="${r(i.bauHeader)}; margin-bottom:8px;">
                  <div style="${r(i.liveIndicator)}">
                      <div style="${r(i.pulseDot)}"></div>
                      <span style="${r(i.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${s(L.date)}</div>
              </div>
              ${P}
          `,k.after(M);let oe=M.querySelector("#cw-bau-toggle-btn"),ne=M.querySelector("#cw-bau-full");if(oe&&ne&&(oe.onclick=()=>{let ce=ne.style.display==="none";ne.style.display=ce?"block":"none",oe.textContent=ce?"Ocultar":"Detalhes"}),window._cwIsAdmin){let ce=M.querySelector(".cw-bau-edit");ce&&(ce.onclick=()=>B(L))}}let E=f.sort((L,M)=>{let G=y.includes(L.id),$=y.includes(M.id);return G===$?0:G?1:-1});if(E.length===0&&!m){let L=document.createElement("div");Object.assign(L.style,i.emptyState),L.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,x.appendChild(L)}let I=E.filter(L=>!y.includes(L.id)),V=E.filter(L=>y.includes(L.id));if(I.forEach(L=>x.appendChild(S(L,!1))),V.length>0){let L=document.createElement("div");Object.assign(L.style,i.historyDivider),L.innerHTML=`<span>Hist\xF3rico (${V.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let M=document.createElement("div");Object.assign(M.style,i.historyContainer),V.forEach($=>M.appendChild(S($,!0)));let G=!1;L.onclick=()=>{ie.playClick(),G=!G,M.style.display=G?"flex":"none",L.querySelector("svg").style.transform=G?"rotate(180deg)":"rotate(0deg)"},x.appendChild(L),x.appendChild(M)}}function S(l,y){let f=document.createElement("div");Object.assign(f.style,y?i.cardHistory:i.card);let m=a[l.type]||a.info,E=document.createElement("div");Object.assign(E.style,i.cardHeader);let I=document.createElement("div");Object.assign(I.style,i.typeTag,{color:m.color,background:m.bg}),I.innerHTML=`${m.icon} <span>${l.type}</span>`;let V=document.createElement("span");if(Object.assign(V.style,i.dateTag),V.textContent=s(l.date),E.appendChild(I),y)E.appendChild(V);else{let O=document.createElement("button");O.className="cw-btn-interactive",Object.assign(O.style,i.dismissBtn),O.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',O.onmouseenter=()=>{O.style.color="#1e8e3e",O.style.background="#e6f4ea",O.style.borderColor="#1e8e3e"},O.onmouseleave=()=>{O.style.color="#5f6368",O.style.background="#fff",O.style.borderColor="rgba(0,0,0,0.1)"},O.onclick=P=>{P.stopPropagation(),ie.playClick(),f.style.transform="translateX(20px)",f.style.opacity="0",setTimeout(()=>{let de=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");de.push(l.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(de)),N(),C()},200)},E.appendChild(O)}let L=document.createElement("div");Object.assign(L.style,i.cardContent);let M=document.createElement("div");Object.assign(M.style,i.msgTitle),M.textContent=l.title;let G=document.createElement("div");Object.assign(G.style,i.msgBody),G.innerHTML=c(l.text);let $=document.createElement("div");if(Object.assign($.style,i.msgMeta),$.innerHTML=`Publicado por <b>${l.author||"Sistema"}</b>`,y||($.innerHTML+=` \u2022 ${s(l.date)}`),L.appendChild(M),L.appendChild(G),L.appendChild($),f.appendChild(E),f.appendChild(L),window._cwIsAdmin){let O=document.createElement("div");O.className="cw-card-actions";let P=document.createElement("button");P.className="cw-action-btn edit",P.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',P.onclick=()=>B(l);let de=document.createElement("button");de.className="cw-action-btn delete",de.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',de.onclick=()=>A(l.id),O.appendChild(P),O.appendChild(de),f.appendChild(O)}return f}let F=we.getCachedBroadcasts();F.length>0&&(Pt(F),N()),setTimeout(T,500),w(),n||(n=setInterval(w,Ho));let R=document.createElement("div");Object.assign(R.style,Qe),R.className="no-drag",d.appendChild(R),Ze(d,R),document.body.appendChild(d);let q=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),H=ze.some(l=>!q.includes(l.id));return{toggle:b,hasUnread:H}}function Vo(){if(window.techSolInitialized){Lt();return}window.techSolInitialized=!0,console.log("\u{1F680} TechSol Suite Initializing...");try{eo();try{ie.initGlobalListeners(),ie.playStartup()}catch(i){console.warn("\xC1udio n\xE3o p\xF4de ser iniciado automaticamente:",i)}we.fetchTips(),Lt();let t=wo(),e=Ao(),n=So(),o=Eo(),s=To();go({toggleNotes:t,toggleEmail:e,toggleScript:n,toggleLinks:o,broadcastControl:s})}catch(t){console.error("Erro fatal na inicializa\xE7\xE3o:",t),K("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}Vo();})();
