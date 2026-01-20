(()=>{var mt="",gt="",Wt=t=>new Promise(e=>setTimeout(e,t));async function Yt(){if(mt&&gt)return mt;try{let t=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!t)return"Agente";t.click(),await Wt(150);let e="Consultor",n=document.querySelector("profile-details .name");if(n)e=n.textContent.trim().split(" ")[0],e=e.charAt(0).toUpperCase()+e.slice(1).toLowerCase();else{let s=document.querySelector("profile-details img");if(s&&s.src.includes("/photos/")){let i=s.src.match(/\/photos\/([^\?]+)/)[1];e=i.charAt(0).toUpperCase()+i.slice(1)}}let o=document.querySelector("profile-details .email");return o&&(gt=o.textContent.trim(),console.log("TechSol: Identidade confirmada ->",gt)),t.click(),document.body.click(),mt=e,e}catch(t){return console.warn("Sherlock falhou:",t),"Consultor"}}function qt(){return mt||"Consultor"}function Xt(){return gt||null}function Kt(t){let e=new Date,n=e.getHours(),o=e.getDay(),s="Ol\xE1",i="";n>=5&&n<12?(s="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):n>=12&&n<18?(s="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(s="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let a=[];n>=0&&n<5?a=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:n<12?o===1?a=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:o===5?a=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:a=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:n<18?a=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:a=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(o===0||o===6)&&(a=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let r=a[Math.floor(Math.random()*a.length)];return{prefix:`${s},`,name:t,suffix:r,icon:i,isFriday:o===5}}async function _o(){try{let e=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!e)return null;let n=e.parentElement,o=n.querySelector(".unmask-button")||n.querySelector('[aria-label="Click to view"]');o&&(o.click(),await Wt(500));let i=Array.from(n.querySelectorAll("a, span, div, pii-value")).find(a=>{let r=a.innerText.trim();return r.includes("@")&&!r.includes("Is this:")&&r.toLowerCase()!=="email"});return i?i.innerText.trim():null}catch(t){return console.warn("Erro ao capturar email do cliente:",t),null}}function No(){try{let t=document.querySelector('material-input[debug-id="account-id-input"]');if(t){let e=t.querySelector("input");if(e){let n=e.value.trim();if(n)return n.includes("@")?n:`${n}@google.com`}}}catch(t){console.warn("Erro ao capturar email interno:",t)}return null}async function at(){let t="Cliente",e="[INSERIR URL]";try{let i=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(i&&i.nextElementSibling){let a=i.nextElementSibling.innerText.trim();a&&(t=a)}}catch(s){console.warn("Falha Nome:",s)}try{let i=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(i&&i.nextElementSibling){let a=i.nextElementSibling.innerText.trim();a&&(e=a)}}catch(s){console.warn("Falha URL:",s)}let n=await _o(),o=No();return{advertiserName:t,websiteUrl:e,clientEmail:n,internalEmail:o,agentName:qt()}}var Ue=null,Mt=null,Ne=.3;function $e(){if(!Ue){let t=window.AudioContext||window.webkitAudioContext;t&&(Ue=new t)}return Ue&&Ue.state==="suspended"&&Ue.resume(),Ue}function Qt(t){if(Mt)return Mt;let e=t.sampleRate*2,n=t.createBuffer(1,e,t.sampleRate),o=n.getChannelData(0);for(let s=0;s<e;s++)o[s]=Math.random()*2-1;return Mt=n,n}var ne={playClick:()=>{let t=$e();if(!t)return;let e=t.currentTime,n=t.createBufferSource();n.buffer=Qt(t);let o=t.createBiquadFilter();o.type="highpass",o.frequency.value=4e3;let s=t.createGain();s.gain.setValueAtTime(Ne*.8,e),s.gain.exponentialRampToValueAtTime(.001,e+.015),n.connect(o),o.connect(s),s.connect(t.destination),n.start(e),n.stop(e+.02)},playHover:()=>{let t=$e();if(!t)return;let e=t.currentTime,n=t.createOscillator();n.type="sine",n.frequency.setValueAtTime(400,e);let o=t.createGain();o.gain.setValueAtTime(0,e),o.gain.linearRampToValueAtTime(Ne*.1,e+.005),o.gain.linearRampToValueAtTime(0,e+.02),n.connect(o),o.connect(t.destination),n.start(e),n.stop(e+.03)},playSuccess:()=>{let t=$e();if(!t)return;let e=t.currentTime;[1046.5,1567.9].forEach((o,s)=>{let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o,a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(Ne*.6,e+.05),a.gain.exponentialRampToValueAtTime(.001,e+.6),i.connect(a),a.connect(t.destination),i.start(e),i.stop(e+.7)})},playGenieOpen:()=>{let t=$e();if(!t)return;let e=t.currentTime,n=t.createBufferSource();n.buffer=Qt(t);let o=t.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(100,e),o.frequency.exponentialRampToValueAtTime(800,e+.2);let s=t.createGain();s.gain.setValueAtTime(0,e),s.gain.linearRampToValueAtTime(Ne*.5,e+.05),s.gain.linearRampToValueAtTime(0,e+.25),n.connect(o),o.connect(s),s.connect(t.destination),n.start(e),n.stop(e+.3)},playError:()=>{let t=$e();if(!t)return;let e=t.currentTime,n=t.createOscillator(),o=t.createGain();n.type="triangle",n.frequency.setValueAtTime(120,e),n.frequency.exponentialRampToValueAtTime(80,e+.1),o.gain.setValueAtTime(Ne,e),o.gain.exponentialRampToValueAtTime(.001,e+.15),n.connect(o),o.connect(t.destination),n.start(e),n.stop(e+.2)},playStartup:()=>{let t=$e();if(!t)return;let e=t.currentTime,n=.12,o=t.createOscillator(),s=t.createGain(),i=t.createBiquadFilter();o.type="square",o.frequency.setValueAtTime(400,e),o.frequency.exponentialRampToValueAtTime(50,e+.1),i.type="lowpass",i.frequency.setValueAtTime(800,e),i.frequency.exponentialRampToValueAtTime(100,e+.1),s.gain.setValueAtTime(Ne*4,e),s.gain.exponentialRampToValueAtTime(.001,e+.1),o.connect(i),i.connect(s),s.connect(t.destination),o.start(e),o.stop(e+.12);let a=t.createOscillator(),r=t.createGain();a.type="sine",a.frequency.setValueAtTime(150,e),a.frequency.exponentialRampToValueAtTime(50,e+.15),r.gain.setValueAtTime(Ne*1.5,e),r.gain.exponentialRampToValueAtTime(.001,e+.15),a.connect(r),r.connect(t.destination),a.start(e),a.stop(e+.15),[55,55.4,110.5].forEach(p=>{let f=t.createOscillator(),c=t.createGain(),g=t.createBiquadFilter();f.type="sawtooth",f.frequency.value=p,g.type="lowpass",g.frequency.setValueAtTime(30,e),g.frequency.linearRampToValueAtTime(900,e+n+.2),g.frequency.exponentialRampToValueAtTime(40,e+3),c.gain.setValueAtTime(0,e),c.gain.linearRampToValueAtTime(Ne*.6,e+n+.1),c.gain.exponentialRampToValueAtTime(.001,e+3.5),f.connect(g),g.connect(c),c.connect(t.destination),f.start(e),f.stop(e+3.6)})},playNotification:()=>{let t=$e();if(!t)return;let e=t.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(o=>{let s=t.createOscillator(),i=t.createGain();s.type="sine",s.frequency.setValueAtTime(o.freq,e),i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(Ne*o.vol,e+.004),i.gain.exponentialRampToValueAtTime(.001,e+o.dur),s.connect(i),i.connect(t.destination),s.start(e),s.stop(e+o.dur+.1)})},playSwoosh:()=>{ne.playGenieOpen()},playReset:()=>{ne.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let t=0,e=50;document.addEventListener("mouseover",n=>{if(!Ue)return;let o=n.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!o||o.contains(n.relatedTarget))return;let s=Date.now();s-t<e||(ne.playHover(),t=s)},{passive:!0})}};var Zt=1e4;function eo(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let t=document.createElement("link");t.id="google-font-roboto",t.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",t.rel="stylesheet",document.head.appendChild(t);let e=document.createElement("style");e.id="techsol-global-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function Y(t,e={}){let n=document.createElement("div"),o=e.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(n.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:o,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),n.textContent=t,document.body.appendChild(n),e.error?ne.playError():ne.playSuccess(),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>n.remove(),400)},e.duration||4e3)}function to(t,e=null){let n=0,o=0,s=0,i=0,a=e||t;a.style.cursor="grab",a.onmousedown=r;function r(f){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(f.target.tagName)||f.target.closest(".no-drag"))return;f=f||window.event,a.style.cursor="grabbing",t.style.transition="none";let c=t.getBoundingClientRect();t.style.transform="none",t.style.left=c.left+"px",t.style.top=c.top+"px",t.style.margin="0",t.style.bottom="auto",t.style.right="auto",Zt++,t.style.zIndex=Zt,s=f.clientX,i=f.clientY,t.setAttribute("data-dragging","true"),document.onmouseup=p,document.onmousemove=d}function d(f){f=f||window.event,f.preventDefault(),n=s-f.clientX,o=i-f.clientY,s=f.clientX,i=f.clientY;let c=t.offsetTop-o,g=t.offsetLeft-n,b=16,m=window.innerWidth,T=window.innerHeight,D=t.offsetWidth,z=t.offsetHeight;g<b?g=b:g+D>m-b&&(g=m-D-b),c<b?c=b:c+z>T-b&&(c=T-z-b),t.style.top=c+"px",t.style.left=g+"px"}function p(){document.onmouseup=null,document.onmousemove=null,a.style.cursor="grab",setTimeout(()=>{t.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",t.setAttribute("data-dragging","false"),t.setAttribute("data-moved","true")},50)}}var Te={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var Nt={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},oo={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var no={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var ye={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var _t=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],Jt=-1;function it(){let t=Math.floor(Math.random()*_t.length);return t===Jt&&(t=(t+1)%_t.length),Jt=t,_t[t]}var Le=t=>new Promise(e=>setTimeout(e,t));async function Lo(t,e){if(!t)return;t.style.opacity="1",t.innerHTML='<span class="cursor">|</span>';let n=t.querySelector(".cursor");await Le(200);for(let o=0;o<e.length;o++){let s=e.charAt(o),i=document.createElement("span");i.textContent=s,n&&n.parentNode===t?n.before(i):t.appendChild(i);let a=Math.floor(Math.random()*60)+30;o===0&&(a=150),o>e.length-3&&(a=30),await Le(a)}await Le(600),n&&(n.style.display="none")}async function Lt(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let e=document.createElement("style");e.id="google-splash-style",e.innerHTML=`
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
    `,document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1");try{await Le(200);let e=await Yt(),n=Kt(e),o=t.querySelector("#w-icon"),s=t.querySelector("#p1"),i=t.querySelector("#p2"),a=t.querySelector("#p3"),r=t.querySelector("#p-sextou");o&&(o.innerHTML=n.icon),s&&(s.textContent=n.prefix),a&&(a.textContent=n.suffix),await Le(300);let d=o?o.querySelector("svg"):null;if(d&&(d.style.opacity="1",d.style.transform="scale(1)"),await Le(400),s&&(s.style.opacity="1"),ne.playStartup(),i&&await Lo(i,n.name),a&&(a.style.opacity="1",a.style.transform="translateY(0)"),n.isFriday&&r){await Le(400),r.style.display="block",r.offsetWidth;let p=r.querySelector(".sextou-badge");p&&(p.style.opacity="1",p.style.transform="scale(1)")}await Le(1500)}catch(e){console.warn("Splash error, skipping...",e)}finally{t.classList.add("splash-exit"),await Le(900),t.parentNode&&t.parentNode.removeChild(t)}}var Qe={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Ze(t,e){e.onmousedown=n;function n(o){o.stopPropagation(),o.preventDefault();let s=t.style.transition;t.style.transition="none";let i=o.clientX,a=o.clientY,r=parseFloat(getComputedStyle(t,null).getPropertyValue("width").replace("px","")),d=parseFloat(getComputedStyle(t,null).getPropertyValue("height").replace("px","")),p=i,f=a,c=!1;function g(T){p=T.clientX,f=T.clientY,c||(window.requestAnimationFrame(()=>{b(),c=!1}),c=!0)}function b(){let T=r+(p-i),D=d+(f-a);T>360&&(t.style.width=T+"px"),D>300&&(t.style.height=D+"px")}function m(){document.removeEventListener("mousemove",g),document.removeEventListener("mouseup",m),setTimeout(()=>{t.style.transition=s},50)}document.addEventListener("mousemove",g),document.addEventListener("mouseup",m)}e.onmouseenter=()=>e.style.opacity="1",e.onmouseleave=()=>e.style.opacity="0.6"}function ao(t){if(!t)return"";let e={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return t.replace(/:([a-zA-Z0-9-_+]+):/g,n=>e[n]?e[n]:"")}var Je=t=>new Promise(e=>setTimeout(e,t));function st(t){t&&["mousedown","mouseup","click"].forEach(e=>t.dispatchEvent(new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window})))}var io="cw-automation-styles";if(!document.getElementById(io)){let t=document.createElement("style");t.id=io,t.innerHTML=`
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
    `,document.head.appendChild(t)}function so(t){let e=document.getElementById("cw-loading-overlay");t?e?e.style.opacity="1":(e=document.createElement("div"),e.id="cw-loading-overlay",document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1")):e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}async function ro(t){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let e=document.getElementById(t),n="";so(!0),e&&(n=e.placeholder,e.placeholder="Buscando ID...",e.value="",e.classList.add("cw-scanning-active"));try{let o=document.querySelector('material-button[debug-id="dock-item-case-log"]');o&&!o.classList.contains("selected")&&(st(o),await Je(1200));let s=document.querySelector("search-filter dropdown-button .button");if(s&&!(s.innerText||"").includes("All")){st(s),await Je(600);let g=document.querySelector('material-checkbox[debug-id="check-all-box"]');g&&g.getAttribute("aria-checked")!=="true"&&(st(g),await Je(300));let b=document.querySelector('material-button[debug-id="apply-filter"]');b&&(st(b),await Je(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await Je(500));let a=Array.from(document.querySelectorAll(".message-header"));for(let c=a.length-1;c>=0;c--){let g=a[c],b=g.querySelector("i.material-icons-extended"),m=b&&b.innerText.trim()==="phone_in_talk",T=g.innerText||"",D=T.includes("Agent joined")||T.includes("outbound-call")||T.includes("Speakeasy");if(m||D){g.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",g),e&&(e.placeholder="Lendo mensagem..."),st(g),await Je(1e3));break}}let d=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),p=/Speakeasy.*?(P\d{15,25})/i,f=null;for(let c=d.length-1;c>=0;c--){let g=d[c];if(g.offsetParent===null)continue;let b=(g.innerText||"").match(p);if(b&&b[1]){f=b[1];break}}if(e)if(f){try{await navigator.clipboard.writeText(f)}catch{}e.value=f,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),ne.playSuccess(),Y(`ID Localizado: ${f}`),e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}else ne.playError(),Y("Nenhum ID encontrado.",{error:!0}),e.placeholder="N\xE3o encontrado",e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}catch(o){console.error("Erro na automa\xE7\xE3o:",o),Y("Erro ao processar.",{error:!0})}finally{e&&(e.classList.remove("cw-scanning-active"),e.value||(e.placeholder=n)),so(!1)}}var Fe={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:"}},Ge={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},rt={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>Substatus:</b> DC - Other<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br>Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},We={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},lt=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],Ft=["CONSIDERACOES","COMENTARIOS"],ke={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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
\u2022 Tentativa 2 -`}};var be=t=>new Promise(e=>setTimeout(e,t));function ve(t,e="info"){let n={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${t}`,n[e]||n.info)}function Oe(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>t.dispatchEvent(new MouseEvent(n,e)))}function bt(t,e){if(!t)return;let n=`cw-warning-${t.id||Math.random().toString(36).substr(2,9)}`,o=document.getElementById(n);o&&o.remove();let s=t.getBoundingClientRect(),i=document.createElement("div");i.id=n,i.style.cssText=`
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
    `;let a=i.querySelector(".cw-close-btn");a.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&a.click()},25e3)}async function ft(t,e){if(!t||!e)return;t.focus(),t.value="",t.dispatchEvent(new Event("input",{bubbles:!0})),await be(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),await be(100),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function Rt(){let e=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(n=>{let o=n.offsetParent!==null,s=n.closest("case-message-view")!==null,i=n.closest(".editor")!==null||n.closest("write-card")!==null;return o&&!s&&i});return e&&ve("Editor visualmente detectado.","success"),e}async function lo(){ve("\u{1F680} FASE 1: Tentando abrir a janela de email...");let t=!1,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(c=>c.innerText.trim()==="email");if(n&&n.offsetParent!==null){ve("Bot\xE3o de email direto encontrado.");let c=n.closest("material-button")||n.closest("material-fab")||n;Oe(c),t=!0}else{ve("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let c=document.querySelector("material-fab-speed-dial");if(c){let g=c.querySelector(".trigger");if(g){Oe(g),await be(800);let m=Array.from(document.querySelectorAll("i.material-icons-extended")).find(T=>T.innerText.trim()==="email");m&&(Oe(m),t=!0)}}}if(!t)return Y("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;ve("\u{1F680} FASE 2: Verificando rascunhos...");let o=null,s=0,i=20;for(;s<i;){await be(250);let c=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(o=Array.from(c).find(g=>g.offsetParent!==null),o){ve("\u26A0\uFE0F Rascunho detectado!","warn");break}s++}if(o){ve("\u{1F5D1}\uFE0F Descartando..."),Oe(o),o.click();let c=null,g=0;for(;g<15;){await be(300);let b=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(c=Array.from(b).find(m=>m.offsetParent!==null),c)break;g++}c&&(Oe(c),Y("Limpando rascunho antigo...",{duration:2e3}),await be(2500))}ve("\u{1F680} FASE 3: Buscando editor final...");let a=0,r=null;for(;a<20&&(r=Rt(),!r);)await be(250),a++;if(!r)return Y("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let d=r.closest('[id="email-body-content-top"]'),f=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(d){if(f){let g=f.closest('[aria-hidden="true"]');g&&g.removeAttribute("aria-hidden"),f.focus(),Oe(f)}await be(300),d.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let c=d.querySelector("#cases-body-field");if(c){let g=document.createRange();g.selectNodeContents(c),g.collapse(!0);let b=window.getSelection();b.removeAllRanges(),b.addRange(g)}return!0}return!1}async function ht(t){if(!t||!await lo())return;let n=await at();ve("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let o=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(o&&(o.click(),await be(600)),n.clientEmail&&n.clientEmail!=="N/A"&&n.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await ft(i,n.clientEmail),bt(i,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(n.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await ft(i,n.internalEmail),bt(i,`
                <strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.
                <div style="margin-top:4px;">
                    <a href="https://mail.google.com/mail/u/0?ui=2&ik=ed23fb3167&attid=0.1&permmsgid=msg-f:1843445102914241244&th=19953b8dda2302dc&view=fimg&fur=ip&permmsgid=msg-f:1843445102914241244&sz=s0-l75-ft&attbid=ANGjdJ9m7O33cM36sxBYohVD6Qsapyux4PNr8qmTBlZ8zkp_LR79suGZhnxFJtBoFDeyMFygsH_tvCts5fnX0WV4rdClw9YqqR7guLnaXU9UzmZRRMRXEoC7T_MPbwo&disp=emb&realattid=ii_mfmv7wjm1&zw" target="_blank" style="color:#1a73e8;text-decoration:none;font-weight:500;display:inline-flex;align-items:center;">
                        Consultar Regra <span style="font-size:14px;margin-left:2px;">\u2197</span>
                    </a>
                </div>
            `))}await be(500);let s=document.querySelector('material-button[debug-id="canned_response_button"]');if(s){Oe(s),await be(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){Oe(i),document.execCommand("insertText",!1,t),i.dispatchEvent(new Event("input",{bubbles:!0})),ve("\u23F3 Buscando resultado da Canned Response...","info");let a=null,r=0,d=15e3,p=500;for(;r<d&&(a=document.querySelector("material-select-dropdown-item"),!a);)await be(p),r+=p;if(a){Oe(a),await be(1500);let f=Rt();if(f&&n.advertiserName){let c=f.innerHTML;c.includes("{%ADVERTISER_NAME%}")&&(f.innerHTML=c.replace(/{%ADVERTISER_NAME%}/g,n.advertiserName))}Y("Canned Response aplicada!")}else ve(`\u274C Timeout: Resultado '${t}' n\xE3o apareceu ap\xF3s 15s.`,"error"),Y(`Timeout: Template '${t}' n\xE3o carregou.`,{error:!0})}}else Y("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function co(t){if(ve(`\u{1F680} Iniciando Quick Email: ${t.name}`),!await lo())return;let n=await at(),o=qt();await be(600),ve("\u{1F4E7} Processando destinat\xE1rios...");let s=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(s&&(s.click(),await be(600)),n.clientEmail&&n.clientEmail!=="N/A"&&n.clientEmail!=="N/A (Bloqueado)"){let r=document.querySelector('input[aria-label="Enter To email address"]');r&&(await ft(r,n.clientEmail),bt(r,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(n.internalEmail){let r=document.querySelector('input[aria-label="Enter Bcc email address"]');r&&(await ft(r,n.internalEmail),bt(r,`
                <strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.
                <div style="margin-top:4px;">
                    <a href="https://mail.google.com/mail/u/0?ui=2&ik=ed23fb3167&attid=0.1&permmsgid=msg-f:1843445102914241244&th=19953b8dda2302dc&view=fimg&fur=ip&permmsgid=msg-f:1843445102914241244&sz=s0-l75-ft&attbid=ANGjdJ9m7O33cM36sxBYohVD6Qsapyux4PNr8qmTBlZ8zkp_LR79suGZhnxFJtBoFDeyMFygsH_tvCts5fnX0WV4rdClw9YqqR7guLnaXU9UzmZRRMRXEoC7T_MPbwo&disp=emb&realattid=ii_mfmv7wjm1&zw" target="_blank" style="color:#1a73e8;text-decoration:none;font-weight:500;display:inline-flex;align-items:center;">
                        Consultar Regra <span style="font-size:14px;margin-left:2px;">\u2197</span>
                    </a>
                </div>
            `))}let i=document.querySelector('input[aria-label="Subject"]');i&&t.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,t.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await be(300));let a=Rt();if(a){let d=(a.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');d&&(d.focus(),Oe(d));let p=new Date;p.setDate(p.getDate()+3);let f=p.getDay();f===6?p.setDate(p.getDate()+2):f===0&&p.setDate(p.getDate()+1);let c=p.toLocaleDateString("pt-BR"),g=t.body;g=g.replace(/\[Nome do Cliente\]/g,n.advertiserName||"Cliente"),g=g.replace(/\[INSERIR URL\]/g,n.websiteUrl||"seu site"),g=g.replace(/\[URL\]/g,n.websiteUrl||"seu site"),g=g.replace(/\[Seu Nome\]/g,o),g=g.replace(/\[MM\/DD\/YYYY\]/g,c),document.execCommand("insertHTML",!1,g),d&&(d.dispatchEvent(new Event("input",{bubbles:!0})),d.dispatchEvent(new Event("change",{bubbles:!0}))),Y("Email preenchido com sucesso!",{duration:2e3}),ve("\u2705 Processo finalizado com sucesso.","success")}else Y("Erro ao focar no editor.",{error:!0})}var Fo={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},po={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function Ie(t,e,n,o,s,i){let a=document.createElement("div");Object.assign(a.style,Fo),to(t,a);let r=document.createElement("div");Object.assign(r.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),a.appendChild(r),s&&(s.googleLine=r);let d=document.createElement("div");Object.assign(d.style,{display:"flex",alignItems:"center",gap:"12px"});let p=document.createElement("img");p.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(p.style,{width:"20px",height:"20px",pointerEvents:"none"});let f=document.createElement("span");f.textContent=e,d.appendChild(p),d.appendChild(f);let c=document.createElement("div");Object.assign(c.style,{display:"flex",alignItems:"center",gap:"4px"});let g='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',b='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',m=document.createElement("div");m.innerHTML=g,Object.assign(m.style,po),m.title="Sobre & Feedback",m.classList.add("no-drag"),m.onmouseenter=()=>{m.style.background="rgba(255,255,255,0.1)",m.style.color="#FFF"},m.onmouseleave=()=>{m.style.color!=="rgb(138, 180, 248)"&&(m.style.background="transparent",m.style.color="#9AA0A6")};let T=document.createElement("div");T.innerHTML=b,Object.assign(T.style,po),T.title="Fechar",T.classList.add("no-drag"),T.onmouseenter=()=>{T.style.background="rgba(242, 139, 130, 0.2)",T.style.color="#F28B82"},T.onmouseleave=()=>{T.style.background="transparent",T.style.color="#9AA0A6"},T.onmousedown=z=>z.stopPropagation(),m.onmousedown=z=>z.stopPropagation(),T.onclick=i;let D=Ro(t,e,n,o);return m.onclick=z=>{z.stopPropagation(),D.style.opacity==="1"?(D.style.opacity="0",D.style.pointerEvents="none",m.style.color="#9AA0A6",m.style.background="transparent"):(D.style.opacity="1",D.style.pointerEvents="auto",m.style.color="#8AB4F8",m.style.background="rgba(138, 180, 248, 0.1)")},c.appendChild(m),c.appendChild(T),a.appendChild(d),a.appendChild(c),a}function Ro(t,e,n,o){let s=document.createElement("div");return Object.assign(s.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),s.innerHTML=`
        <div style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${e}</div>
        <div style="color: #5f6368; font-size: 14px; margin-bottom: 24px;">Vers\xE3o ${n}</div>
        
        <div style="color: #3c4043; font-size: 14px; max-width: 90%; line-height: 1.6; margin-bottom: 24px;">
            ${o}
        </div>

        <div style="margin-bottom: 32px;">
            <a href="https://forms.gle/vkvMzSEiuEHpTnKu6" target="_blank" id="cw-feedback-link" style="
                display: inline-flex; align-items: center; gap: 8px;
                padding: 10px 20px;
                background-color: #F8F9FA;
                border: 1px dashed #1a73e8;
                border-radius: 20px;
                color: #1a73e8;
                font-size: 13px;
                font-weight: 500;
                text-decoration: none;
                transition: all 0.2s ease;
            ">
                <span>\u{1F4AC}</span> Reportar Bug ou Sugest\xE3o
            </a>
        </div>

        <div style="font-size: 12px; color: #9aa0a6;">
            created by <span style="color: #1a73e8; font-weight: 500;">@lucaste</span>
        </div>
        
        <button id="close-help-internal" style="margin-top: 24px; padding: 8px 24px; border: 1px solid #dadce0; background: white; border-radius: 18px; color: #5f6368; cursor: pointer; font-weight: 500; transition: background 0.2s;">
            Voltar
        </button>
    `,setTimeout(()=>{let i=s.querySelector("#cw-feedback-link");i&&(i.onmouseenter=()=>{i.style.backgroundColor="#E8F0FE",i.style.transform="scale(1.02)"},i.onmouseleave=()=>{i.style.backgroundColor="#F8F9FA",i.style.transform="scale(1)"});let a=s.querySelector("#close-help-internal");a&&(a.onmouseover=()=>a.style.backgroundColor="#f8f9fa",a.onmouseout=()=>a.style.backgroundColor="white",a.onclick=()=>{s.style.opacity="0",s.style.pointerEvents="none"})},0),t.appendChild(s),s}if(!document.getElementById("cw-module-styles")){let t=document.createElement("style");t.id="cw-module-styles",t.innerHTML=`
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
    `,document.head.appendChild(t)}function qe(t,e,n){let o=document.getElementById(n);if(!e)return;let s=e.getAttribute("data-moved")==="true",i={x:0,y:0};if(o){let f=o.getBoundingClientRect();i.x=f.left+f.width/2,i.y=f.top+f.height/2}let a,r;if(!s)a=window.innerWidth/2,r=window.innerHeight/2;else{let f=e.getBoundingClientRect();a=f.left+f.width/2,r=f.top+f.height/2,a===0&&r===0&&(a=window.innerWidth/2,r=window.innerHeight/2)}let d=i.x-a,p=i.y-r;t?(ne.playGenieOpen(),e.style.transition="none",e.style.opacity="0",e.style.pointerEvents="auto",s?e.style.transform=`translate(${d}px, ${p}px) scale(0.05)`:e.style.transform=`translate(calc(-50% + ${d}px), calc(-50% + ${p}px)) scale(0.05)`,e.offsetWidth,requestAnimationFrame(()=>{e.classList.add("open"),o&&o.classList.add("active"),e.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",e.style.opacity="1",s?e.style.transform="translate(0, 0) scale(1)":e.style.transform="translate(-50%, -50%) scale(1)"}),typeof uo=="function"&&uo(e,n)):(ne.playSwoosh(),e.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",e.style.pointerEvents="none",requestAnimationFrame(()=>{e.style.opacity="0",s?e.style.transform=`translate(${d}px, ${p}px) scale(0.1)`:e.style.transform=`translate(calc(-50% + ${d}px), calc(-50% + ${p}px)) scale(0.1)`}),setTimeout(()=>{e.classList.remove("open"),o&&o.classList.remove("active"),e.style.transition="",e.style.transform=""},300),typeof Dt=="function"&&Dt(e))}function uo(t,e){Dt(t);let n=o=>{if(!t.classList.contains("open"))return;let s=t.contains(o.target),i=document.querySelector(".cw-pill"),a=i&&i.contains(o.target);s?(t.classList.remove("idle"),t.style.zIndex="2147483648"):a||(t.classList.add("idle"),t.style.zIndex="2147483646")};t._idleHandler=n,document.addEventListener("mousedown",n)}function Dt(t){t._idleHandler&&(document.removeEventListener("mousedown",t._idleHandler),t._idleHandler=null)}var Do="https://script.google.com/a/macros/google.com/s/AKfycbysAGOgn40LEQ1uJIppENtTGNSRscLRQkGA96UPYTDDbA0c_KhVUwDQ-Do8ZQ7lQizo/exec",Gt="cw_data_broadcast",mo="cw_data_tips",Go=["Processando...","Mantenha o foco!","Aguarde..."];function zt(t,e={}){return new Promise((n,o)=>{let s="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script");window[s]=d=>{document.body.contains(i)&&document.body.removeChild(i),delete window[s],n(d)};let a=Object.keys(e).map(d=>encodeURIComponent(d)+"="+encodeURIComponent(e[d])).join("&"),r=`${Do}?op=${t}&callback=${s}&t=${Date.now()}&${a}`;i.src=r,i.onerror=()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[s],o(new Error("JSONP Error (Check Corp Login)"))},document.body.appendChild(i)})}var we={fetchTips:async()=>{try{let t=await zt("tips");t?.tips&&localStorage.setItem(mo,JSON.stringify(t.tips))}catch(t){console.warn("Tips offline",t)}},fetchData:async()=>{try{let t=await zt("broadcast");if(t?.broadcast)return localStorage.setItem(Gt,JSON.stringify(t.broadcast)),t}catch(t){console.warn("Broadcast offline",t)}return{broadcast:JSON.parse(localStorage.getItem(Gt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(Gt)||"[]"),getRandomTip:()=>{let t=Go,e=localStorage.getItem(mo);if(e)try{t=JSON.parse(e)}catch{}return t[Math.floor(Math.random()*t.length)]},sendBroadcast:async t=>{let e={...t,date:new Date().toISOString(),id:Date.now().toString()};return await we._performOp("new_broadcast",e)},updateBroadcast:async(t,e)=>{let n={id:t,...e};return await we._performOp("update_broadcast",n)},deleteBroadcast:async t=>await we._performOp("delete_broadcast",{id:t}),_performOp:async(t,e)=>{try{console.log(`\u{1F4E4} Executando ${t}...`,e);let n=await zt(t,e);return n&&n.status==="success"?(console.log("\u2705 Sucesso:",t),!0):(console.warn("\u26A0\uFE0F Falha:",n),!1)}catch(n){return console.error("\u274C Erro JSONP:",n),!1}},logUsage:()=>{}};var pe={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00"},xt=t=>new Promise(e=>setTimeout(e,t));function go(t){let e="cw-command-center-style";if(!document.getElementById(e)){let b=document.createElement("style");b.id=e,b.innerHTML=`
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
        `,document.head.appendChild(b)}let n={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>'},o=document.createElement("div");o.className="cw-pill side-right",o.innerHTML=`
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
    `;let s=document.createElement("div");if(s.className="cw-focus-backdrop",document.body.appendChild(s),document.body.appendChild(o),o.querySelector(".notes").onclick=b=>{b.stopPropagation(),t.toggleNotes()},o.querySelector(".email").onclick=b=>{b.stopPropagation(),t.toggleEmail()},o.querySelector(".script").onclick=b=>{b.stopPropagation(),t.toggleScript()},o.querySelector(".links").onclick=b=>{b.stopPropagation(),t.toggleLinks()},o.querySelector(".broadcast").onclick=b=>{b.stopPropagation();let m=b.currentTarget.querySelector(".cw-badge");m&&(m.style.transform="scale(0)",setTimeout(()=>m.remove(),200)),t.broadcastControl&&t.broadcastControl.toggle()},t.broadcastControl&&t.broadcastControl.hasUnread){let b=document.createElement("div");b.className="cw-badge",o.querySelector(".broadcast").appendChild(b)}(async function(){await xt(2800),o.classList.add("docked"),await xt(300);let m=o.querySelectorAll(".cw-btn");o.querySelectorAll(".cw-sep").forEach(T=>T.classList.add("visible"));for(let T=0;T<m.length;T++)m[T].classList.add("popped"),await xt(90);await xt(200),o.classList.add("system-check")})();let i=!1,a,r,d,p,f=3;o.onmousedown=b=>{if(b.target.closest("button"))return;b.preventDefault(),a=b.clientX,r=b.clientY;let m=o.getBoundingClientRect();d=m.left,p=m.top,document.addEventListener("mousemove",c),document.addEventListener("mouseup",g)};function c(b){let m=b.clientX-a,T=b.clientY-r;!i&&Math.sqrt(m*m+T*T)>f&&(i=!0,o.style.transition="none"),i&&(o.style.left=`${d+m}px`,o.style.top=`${p+T}px`,o.style.right="auto",o.style.bottom="auto",o.style.transform="none")}function g(b){if(document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",g),i){i=!1,o.style.transition="left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s ease";let m=window.innerWidth,T=window.innerHeight,D=o.getBoundingClientRect(),z=D.left+D.width/2,R;z<m/2?(R=24,o.classList.remove("side-right"),o.classList.add("side-left")):(R=m-D.width-24,o.classList.remove("side-left"),o.classList.add("side-right"));let $=D.top;$<24&&($=24),$>T-D.height-24&&($=T-D.height-24),o.style.left=`${R}px`,o.style.top=`${$}px`}else{let m=b.target.closest("button");m&&(m.style.transform="scale(0.9)",setTimeout(()=>m.style.transform="",150))}}}function yt(){let t=document.querySelector(".cw-pill"),e=document.querySelector(".cw-focus-backdrop");if(!t)return()=>{};window._CW_ABORT_PROCESS=!1;let n=document.createElement("div");n.className="cw-center-stage",n.innerHTML=`
        <div class="cw-center-dots"><span></span><span></span><span></span></div>
        <div class="cw-center-text">${we.getRandomTip()}</div>
        <div class="cw-center-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
    `;let o=document.createElement("div");o.className="cw-abort-btn",o.textContent="Cancelar",o.onclick=i=>{i.stopPropagation(),window._CW_ABORT_PROCESS=!0,Y("Cancelado! Mas a nota foi copiada para a \xE1rea de transfer\xEAncia.",{duration:4e3}),n.remove(),t.classList.remove("processing-center"),t.classList.remove("success"),e&&e.classList.remove("active")},n.appendChild(o),t.appendChild(n);let s=Date.now();return t.classList.add("processing-center"),e&&e.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!t.contains(n))return;let a=Date.now()-s,r=Math.max(0,2e3-a);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!t.contains(n))return;let d=n.querySelector(".cw-center-dots"),p=n.querySelector(".cw-center-text"),f=n.querySelector(".cw-center-success"),c=n.querySelector(".cw-abort-btn");d&&(d.style.display="none"),p&&(p.style.display="none"),c&&(c.style.display="none"),f&&f.classList.add("show"),t.classList.add("success"),setTimeout(()=>{t.classList.remove("processing-center"),setTimeout(()=>{n.remove(),t.classList.remove("success"),e&&e.classList.remove("active")},400)},1e3)},r)}}function bo(t){let e=document.createElement("div");e.className="cw-step-scenarios";let n=document.createElement("div");Object.assign(n.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let o=document.createElement("div");Object.assign(o.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"40px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s ease"}),o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>";let s=null;Object.entries(ke).forEach(([a,r])=>{let d=document.createElement("div");d.textContent=a,Object.assign(d.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",display:"flex",alignItems:"center",gap:"6px"}),d.onmouseenter=()=>{s!==r&&(o.style.background="#fff",o.style.borderColor="#1a73e8",o.style.color="#202124",o.textContent=`"${r.substring(0,120)}${r.length>120?"...":""}"`),s!==r&&(d.style.background="#f1f3f4")},d.onmouseleave=()=>{s!==r&&(s||(o.style.background="#f8f9fa",o.style.borderColor="#dadce0",o.style.color="#5f6368",o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>"),d.style.background="#ffffff")},d.onclick=()=>{ne.playClick(),s===r?(s=null,i(),t("")):(s=r,i(),d.style.transform="scale(0.95)",setTimeout(()=>d.style.transform="scale(1)",150),t(r))},n.appendChild(d)});function i(){Array.from(n.children).forEach(a=>{ke[a.textContent]===s?(a.style.background="#e8f0fe",a.style.borderColor="#1a73e8",a.style.color="#1967d2",a.style.fontWeight="500"):(a.style.background="#ffffff",a.style.borderColor="#dadce0",a.style.color="#3c4043",a.style.fontWeight="400")})}return e.appendChild(n),e.appendChild(o),e}var fo=t=>new Promise(e=>setTimeout(e,t));function vt(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>t.dispatchEvent(new MouseEvent(n,e)))}function ct(t){let e=document.createElement("div");e.style.position="fixed",e.style.left="-9999px",e.innerHTML=t,document.body.appendChild(e);let n=document.createRange();n.selectNodeContents(e);let o=window.getSelection();o.removeAllRanges(),o.addRange(n);try{document.execCommand("copy")}catch{Y("Falha ao copiar",{error:!0})}o.removeAllRanges(),document.body.removeChild(e)}function wt(t){["input","change","keydown","keyup"].forEach(n=>{let o=new Event(n,{bubbles:!0,cancelable:!0});t.dispatchEvent(o)})}function ho(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function At(){console.log("Iniciando processo de Nova Nota...");let t=ho(),e=t.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(a=>a.innerText.trim()==="description");if(o){let a=o.closest("material-fab")||o.closest("material-button");a?(a.style&&(a.style.display="block",a.style.visibility="visible"),vt(a)):vt(o)}else{let a=document.querySelector("material-fab-speed-dial");if(a){let r=a.querySelector(".trigger");r?(r.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),vt(r)):a.click(),await fo(800);let p=Array.from(document.querySelectorAll("i.material-icons-extended")).find(f=>f.innerText.trim()==="description");p&&vt(p)}}let s=null,i=0;for(;!s&&i<20;){await fo(300);let a=ho();if(a.length>e)s=a.find(r=>!t.includes(r)),s||(s=a[a.length-1]);else if(i>10){let r=a.filter(d=>d.offsetParent!==null);r.length>0&&(s=r[r.length-1])}i++}return s}var ee={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},Me="cubic-bezier(0.25, 0.8, 0.25, 1)",zo={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${ee.border}`,backgroundColor:ee.bgInput,fontSize:"14px",color:ee.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${Me}, box-shadow 0.2s ${Me}, background-color 0.2s`,outline:"none"},vn={...zo,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},wn={fontSize:"13px",fontWeight:"700",color:ee.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},An={display:"block",fontSize:"13px",fontWeight:"600",color:ee.text,marginBottom:"8px",marginTop:"16px"},Cn={fontSize:"12px",color:ee.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},Sn={fontSize:"12px",color:ee.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},En={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:ee.text,cursor:"pointer",padding:"12px 14px",backgroundColor:ee.surface,border:`1px solid ${ee.border}`,borderRadius:"12px",transition:`all 0.2s ${Me}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},Bt={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:ee.primary},Tn={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:ee.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${Me}, box-shadow 0.2s ${Me}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},kn={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${ee.primary}`,color:ee.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${Me}`},On={background:"transparent",border:`1px solid ${ee.border}`,borderRadius:"20px",color:ee.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${Me}`,fontFamily:"'Google Sans', 'Roboto'"};var In={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:ee.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},qn={fontSize:"13px",fontWeight:"700",color:ee.primary,minWidth:"20px",textAlign:"center"},Mn={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${ee.border}`,backgroundColor:ee.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${Me}, box-shadow 0.2s ${Me}`},_n={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${ee.bgInput}`},Nn={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${ee.border}`,backgroundColor:ee.surface,color:ee.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${Me}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},Ln={backgroundColor:ee.primaryBg,color:ee.primary,borderColor:ee.primary,fontWeight:"600"},Fn={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:ee.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},Rn={borderTop:`1px solid ${ee.bgInput}`,paddingTop:"20px",marginTop:"16px"};var Dn={maxHeight:"240px",overflowY:"auto",border:`1px solid ${ee.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:ee.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},Gn={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${ee.bgInput}`,cursor:"pointer",fontSize:"13px",color:ee.text,transition:"background 0.1s",userSelect:"none"};var Bo={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},Po={fontSize:"12px",color:"#e37400",marginTop:"4px"},jo={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},Ho={display:"flex",gap:"15px",marginBottom:"10px"};function xo(){let t=document.createElement("div");t.id="tag-support-container",Object.assign(t.style,Bo);let e=document.createElement("label");e.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(e.style,Nt,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,Ho);let o=document.createElement("input");o.type="radio",o.name="ts_usage_mod",o.value="Sim",Object.assign(o.style,Bt);let s=document.createElement("label");s.textContent="Sim";let i=document.createElement("div");Object.assign(i.style,{display:"flex",alignItems:"center"}),i.appendChild(o),i.appendChild(s);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="N\xE3o",a.checked=!0,Object.assign(a.style,Bt);let r=document.createElement("label");r.textContent="N\xE3o";let d=document.createElement("div");Object.assign(d.style,{display:"flex",alignItems:"center"}),d.appendChild(a),d.appendChild(r),n.appendChild(i),n.appendChild(d);let p=document.createElement("div");p.style.display="block";let f=document.createElement("label");f.textContent="Qual foi o Motivo?",Object.assign(f.style,Nt,{fontSize:"12px"});let c=document.createElement("input");c.type="text",Object.assign(c.style,jo);let g=document.createElement("div");g.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(g.style,Po),p.appendChild(f),p.appendChild(c),p.appendChild(g),t.appendChild(e),t.appendChild(n),t.appendChild(p),o.onchange=()=>{p.style.display="none"},a.onchange=()=>{p.style.display="block"};function b(D,z){if(t.style.display="none",!D||D.includes("Education")||!z||z.length===0)return;let R=z.some(k=>k.includes("enhanced")||k==="ec_google_ads"),$=z.some(k=>(k.includes("conversion")||k.includes("ads"))&&!k.includes("enhanced")),Z=z.some(k=>k.includes("ga4")||k.includes("analytics")||k.includes("ua")),S=z.some(k=>k.includes("merchant")||k.includes("gmc")||k.includes("shopping"));(R||$&&!Z&&!S)&&(t.style.display="block")}function m(){if(t.style.display==="none")return"";let D=`<br><b>Utilizou Tag Support?</b> ${o.checked?"Sim":"N\xE3o"}`;return a.checked&&c.value.trim()!==""&&(D+=`<br><b>Motivo:</b> ${c.value}`),D+="<br>",D}function T(){t.style.display="none",a.checked=!0,o.checked=!1,p.style.display="block",c.value=""}return{element:t,updateVisibility:b,getOutput:m,reset:T}}var X={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Ye={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function yo(t){let e={},n="implementation";function o(S){let A=S.toLowerCase();return A.includes("ads")||A.includes("conversion")||A.includes("remarketing")?X.brands.ads:A.includes("ga4")||A.includes("analytics")?X.brands.ga4:A.includes("gtm")||A.includes("tag manager")||A.includes("container")?X.brands.gtm:A.includes("merchant")||A.includes("shopping")||A.includes("feed")?X.brands.gmc:X.brands.default}let s=Object.entries(Ge).filter(([S,A])=>A.popular),i={};Object.entries(Ge).forEach(([S,A])=>{if(A.popular)return;let k=o(A.name);i[k.label]||(i[k.label]={brand:k,tasks:[]}),i[k.label].tasks.push({key:S,...A})});let a="cw-zen-tasks";if(!document.getElementById(a)){let S=document.createElement("style");S.id=a,S.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column; height: 100%; width: calc(100% + 32px); margin: -16px;
                font-family: ${X.font}; background: ${X.bg}; position: relative; overflow: hidden;
            }
            
            /* SCROLL AREA */
            .cw-zen-content { flex: 1; overflow-y: auto; padding-bottom: 80px; } /* Espa\xE7o para o Status Bar */

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${X.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${X.white}; 
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
                font-size: 12px; font-weight: 500; color: ${X.textMain}; line-height: 1.2; 
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
                color: ${X.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${X.border}; border-radius: 10px; background: ${X.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${X.blue}; box-shadow: 0 0 0 3px ${X.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${X.border}; border-radius: 10px; background: ${X.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${X.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${X.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${X.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${X.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${X.blueLight}; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${X.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${X.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${X.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${X.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${X.border};
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${X.shadowFloat}; z-index: 10;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${X.textMain}; }
            
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
                font-family: ${X.font}; font-size: 15px; font-weight: 600; color: ${X.textMain};
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
                border-color: ${X.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${X.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${X.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${X.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 10px; font-weight: 700; color: ${X.textSub};
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
        `,document.head.appendChild(S)}let r=document.createElement("div");r.className="cw-zen-container";let d=document.createElement("div");Object.assign(d.style,{display:"none"});let p=document.createElement("div");p.className="cw-screens-container",d.appendChild(p),r.innerHTML=`
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
    `;let f=r.querySelector(".cw-hero-grid"),c=r.querySelector(".cw-acc-container"),g=r.querySelector(".cw-results-container"),b=r.querySelector(".cw-search-input"),m=r.querySelector(".cw-status-bar"),T=r.querySelector(".cw-status-text"),D=r.querySelector(".cw-footer-icons");s.forEach(([S,A])=>{let k=o(A.name),N=document.createElement("div");N.className="cw-hero-card",N.id=`hero-${S}`,N.style.setProperty("--hero-color",k.color),N.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${Ye[k.icon]}</div>
                <div class="cw-hero-label">${A.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,N.onclick=_=>{if(_.target.closest(".cw-step-btn"))return;let x=e[S]?e[S].count:0;R(S,x>0?-x:1,A)},N.querySelector(".minus").onclick=()=>R(S,-1,A),N.querySelector(".plus").onclick=()=>R(S,1,A),N.dataset.color=k.color,f.appendChild(N)});function z(S,A){let k=o(A.name),N=document.createElement("div");return N.className="cw-task-item",N.dataset.id=S,N.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${k.bg}; color:${k.color}">
                    ${Ye[k.icon]||Ye.default}
                </div>
                <div class="cw-task-label">${A.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,N.onclick=_=>{if(_.target.closest(".cw-step-btn"))return;let x=e[S]?e[S].count:0;R(S,x>0?-x:1,A)},N.querySelector(".minus").onclick=()=>R(S,-1,A),N.querySelector(".plus").onclick=()=>R(S,1,A),N}Object.entries(i).forEach(([S,A])=>{let k=document.createElement("div");k.className="cw-acc-group";let N=document.createElement("div");N.className="cw-acc-header",N.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${A.brand.color}"></div>
                ${S}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,N.onclick=()=>{c.querySelectorAll(".cw-acc-group.open").forEach(x=>{x!==k&&x.classList.remove("open")}),k.classList.toggle("open")};let _=document.createElement("div");_.className="cw-acc-body",A.tasks.forEach(x=>{let G=z(x.key,x);_.appendChild(G)}),k.appendChild(N),k.appendChild(_),c.appendChild(k)});function R(S,A,k){e[S]||(e[S]={count:0,data:k,brand:o(k.name)}),e[S].count+=A,e[S].count<=0&&delete e[S],$(),Z(),t&&t()}function $(){s.forEach(([_])=>{let x=f.querySelector(`#hero-${_}`);if(!x)return;let G=e[_];G?(x.classList.add("active"),x.querySelector(".cw-step-val").textContent=G.count,x.querySelector(".cw-step-val").style.color=x.dataset.color):x.classList.remove("active")}),r.querySelectorAll(".cw-task-item").forEach(_=>{let x=_.dataset.id,G=e[x];G?(_.classList.add("selected"),_.querySelector(".cw-step-val").textContent=G.count):_.classList.remove("selected")});let A=Object.keys(e),k=0,N=[];if(A.forEach(_=>{let x=e[_];k+=x.count;for(let G=0;G<x.count;G++)N.length<6&&N.push(x.brand)}),k>0){m.classList.add("visible");let _=k>1?"A\xE7\xF5es":"A\xE7\xE3o",x=k>1?"definidas":"definida";T.textContent=`${k} ${_} ${x}`,D.innerHTML="",N.forEach(G=>{let C=document.createElement("div");C.className="cw-mini-icon",C.innerHTML=Ye[G.icon]||Ye.default;let v=C.querySelector("svg");v&&(v.style.width="14px",v.style.height="14px"),D.appendChild(C)})}else m.classList.remove("visible")}b.addEventListener("input",S=>{let A=S.target.value.toLowerCase();if(A.length>0){c.style.display="none",g.style.display="block",g.innerHTML="";let k=!1;Object.entries(Ge).forEach(([N,_])=>{if(_.name.toLowerCase().includes(A)){k=!0;let x=z(N,_);e[N]&&(x.classList.add("selected"),x.querySelector(".cw-step-val").textContent=e[N].count),g.appendChild(x)}}),k||(g.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else c.style.display="block",g.style.display="none"});function Z(){p.innerHTML="";let S=Object.keys(e),A=!1,k=document.getElementById("sub-status"),N="implementation";if(k&&k.value.toLowerCase().includes("education")&&(N="education"),S.length===0){p.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}if(S.length===0){p.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}let _=document.createElement("div");_.className="cw-info-banner",_.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Todos os Screenshots s\xE3o baseados na descri\xE7\xE3o do 
                <a href="https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/" target="_blank" class="cw-info-link">Win Criteria</a>.
            </span>
        `,p.appendChild(_),S.forEach(x=>{let G=e[x].data,C=e[x].count,v=e[x].brand,F=G.screenshots?G.screenshots[N]||[]:["Link da Evid\xEAncia"];if(F.length>0){A=!0;for(let l=1;l<=C;l++){let w=document.createElement("div");w.className="cw-screen-card",w.style.setProperty("--brand-color",v.color),w.style.setProperty("--brand-bg",v.bg),w.style.setProperty("--brand-shadow",v.color+"40");let E=document.createElement("div");E.className="cw-card-header";let u=document.createElement("div");u.className="cw-card-icon",u.innerHTML=Ye[v.icon]||Ye.default;let h=document.createElement("div");h.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let O=document.createElement("input");O.className="cw-card-title-input",O.id=`name-${x}-${l}`,O.value=`${G.name}${C>1?" #"+l:""}`,O.title="Clique para renomear esta task";let j=document.createElement("span");j.className="cw-edit-hint",j.innerHTML="\u270E Renomear",h.appendChild(O),h.appendChild(j),E.appendChild(u),E.appendChild(h),w.appendChild(E),F.forEach((L,q)=>{let B=document.createElement("div");B.className="cw-input-group";let U=document.createElement("label");U.className="cw-input-label",U.textContent=L.replace(/📷|:|•/g,"").trim();let I=document.createElement("input");I.className="cw-input-field",I.id=`screen-${x}-${l}-${q}`,I.placeholder="Cole o link aqui...",I.setAttribute("autocomplete","off"),I.addEventListener("input",()=>{I.value.trim().length>5?I.classList.add("filled"):I.classList.remove("filled")});let H=document.createElement("div");H.className="cw-input-check",H.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',B.appendChild(U),B.appendChild(I),B.appendChild(H),w.appendChild(B)}),p.appendChild(w)}}}),d.style.display=A?"block":"none"}return{selectionElement:r,screenshotsElement:d,updateSubStatus:()=>Z(),getCheckedElements:()=>Object.keys(e).map(S=>({value:S,closest:()=>({querySelector:()=>({textContent:e[S].count})})})),toggleTask:(S,A=!0)=>{let k=e[S];A&&!k?R(S,1,Ge[S]):!A&&k&&R(S,-k.count,Ge[S])},setMode:S=>{n=S,Z()},reset:()=>{for(let S in e)delete e[S];b.value="",c.style.display="block",g.style.display="none",$(),Z()}}}function vo(t){let e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden;";let n=document.createElement("div");n.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px;";let o={sectionTitle:`
            font-family: 'Google Sans', Roboto, sans-serif;
            font-size: 11px; 
            font-weight: 700; 
            color: #5F6368; 
            text-transform: uppercase; 
            letter-spacing: 0.8px; 
            margin: 28px 0 12px 0;
            display: flex; align-items: center; gap: 8px;
        `,label:`
            display: block; 
            font-size: 13px; 
            font-weight: 600; 
            color: #3C4043; 
            margin-bottom: 8px;
        `,inputWrapper:`
            margin-bottom: 16px;
        `,input:`
            width: 100%; 
            padding: 12px 14px; 
            border-radius: 8px; 
            border: 1px solid #DADCE0; 
            background: #FFFFFF; 
            font-size: 14px; 
            color: #202124; 
            transition: border 0.2s, box-shadow 0.2s; 
            outline: none; 
            box-sizing: border-box;
            font-family: Roboto, sans-serif;
        `,inputFocus:`
            border-color: #1a73e8; 
            box-shadow: 0 0 0 2px rgba(26,115,232,0.15);
        `,textarea:`
            min-height: 80px; 
            resize: vertical; 
            line-height: 1.5;
        `,radioGroup:`
            display: flex; 
            gap: 10px; 
            margin-bottom: 20px;
        `,radioLabel:`
            flex: 1; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            padding: 10px; 
            border: 1px solid #DADCE0; 
            border-radius: 8px; 
            background: #FFF; 
            cursor: pointer; 
            transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1); 
            font-size: 13px; 
            font-weight: 500; 
            color: #3C4043; 
            user-select: none;
        `,radioActive:`
            background: #E8F0FE; 
            border-color: #1967D2; 
            color: #1967D2; 
            font-weight: 600;
            box-shadow: 0 1px 2px rgba(26,115,232,0.1);
        `,banner:`
            background: #FEF7E0; 
            border: 1px solid #FEEFC3; 
            border-radius: 12px; 
            padding: 16px; 
            margin-bottom: 24px; 
            font-size: 13px; 
            color: #B06000; 
            line-height: 1.5; 
            display: flex; 
            gap: 12px; 
            align-items: start;
            box-shadow: 0 1px 2px rgba(0,0,0,0.02);
        `,magicBtn:`
            width: 100%; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            gap: 8px; 
            padding: 12px; 
            background: #FFFFFF; 
            color: #1A73E8; 
            border: 1px solid #DADCE0; 
            border-radius: 12px; 
            font-size: 13px; 
            font-weight: 600; 
            cursor: pointer; 
            transition: all 0.2s; 
            margin-bottom: 8px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        `};function s(v,F,l="text",w=""){let E=document.createElement("div");E.style.cssText=o.inputWrapper;let u=document.createElement("label");u.style.cssText=o.label,u.textContent=F;let h;l==="textarea"?(h=document.createElement("textarea"),h.style.cssText=o.input+o.textarea):(h=document.createElement("input"),h.type=l,h.style.cssText=o.input);let O=h.style.cssText;return h.onfocus=()=>h.style.cssText=O+o.inputFocus,h.onblur=()=>h.style.cssText=O,h.id=`st-${v}`,h.placeholder=w,E.appendChild(u),E.appendChild(h),{wrapper:E,input:h}}function i(v,F){let l=document.createElement("div"),w=document.createElement("label");w.style.cssText=o.label,w.textContent=F,l.appendChild(w);let E=document.createElement("div");return E.style.cssText=o.radioGroup,["Yes","No"].forEach(u=>{let h=document.createElement("label");h.style.cssText=o.radioLabel;let O=document.createElement("input");O.type="radio",O.name=`st-${v}`,O.value=u==="Yes"?"Y":"N",O.style.display="none",u==="No"&&(O.checked=!0),h.onmousedown=()=>h.style.transform="scale(0.96)",h.onmouseup=()=>h.style.transform="scale(1)",h.onmouseleave=()=>h.style.transform="scale(1)",h.appendChild(O),h.appendChild(document.createTextNode(u)),O.addEventListener("change",()=>{E.querySelectorAll("label").forEach(j=>j.style.cssText=o.radioLabel),O.checked&&(h.style.cssText=o.radioLabel+o.radioActive)}),u==="No"&&(h.style.cssText=o.radioLabel+o.radioActive),E.appendChild(h)}),l.appendChild(E),{wrapper:l}}let a=document.createElement("div");a.style.cssText=o.banner,a.innerHTML=`
        <span style="font-size: 18px;">\u26A0\uFE0F</span>
        <div>
            <div style="font-weight:700; margin-bottom:4px;">Processo Cr\xEDtico</div>
            Antes de transferir, verifique o <a href="https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o" target="_blank" style="color:#B06000; text-decoration:underline;">SOP de Out of Scope</a> e consulte um <a href="http://go/webao-help-deluxe" target="_blank" style="color:#B06000; text-decoration:underline;">SME</a>.
        </div>
    `,n.appendChild(a);let r=document.createElement("button");r.style.cssText=o.magicBtn,r.innerHTML='<span style="font-size:16px">\u2728</span> Preencher Automaticamente',r.onmouseover=()=>r.style.backgroundColor="#F8F9FA",r.onmouseout=()=>r.style.backgroundColor="#FFFFFF",r.onmousedown=()=>r.style.transform="scale(0.98)",r.onmouseup=()=>r.style.transform="scale(1)",n.appendChild(r);let d=document.createElement("div");d.style.cssText=o.sectionTitle,d.style.marginTop="24px",d.innerHTML="<span>\u{1F6E0}\uFE0F</span> Dados T\xE9cnicos",n.appendChild(d);let p=s("cid","Ads CID","text","000-000-0000"),f=s("ga4","GA4 ID"),c=s("gtm","GTM ID"),g=i("access","Advertiser has access to GA4/GTM?"),b=s("access-email","If Yes, User Email"),m=i("ghost","Ghosting Access Available?");n.append(p.wrapper,f.wrapper,c.wrapper,g.wrapper,b.wrapper,m.wrapper);let T=document.createElement("div");T.style.cssText=o.sectionTitle,T.innerHTML="<span>\u{1F4DE}</span> Contato & Problema",n.appendChild(T);let D=s("name","Name of Advertiser"),z=s("url","Website Address"),R=s("phone","Phone Number"),$=s("email","Email Address"),Z=s("callback","Preferred Call Back Time (w/ Timezone)"),S=s("desc","Detailed Issue Description","textarea","Descreva o problema t\xE9cnico em detalhes..."),A=s("checks","Checks Performed by Tech Team","textarea","Liste o troubleshooting j\xE1 realizado..."),k=s("screens","Uncropped Screenshots (Links)","textarea","https://...");n.append(D.wrapper,z.wrapper,R.wrapper,$.wrapper,Z.wrapper,S.wrapper,A.wrapper,k.wrapper);let N=document.createElement("div");N.style.cssText=o.sectionTitle,N.innerHTML="<span>\u{1F4E7}</span> Contatos para C\xF3pia (CC)",n.appendChild(N);let _=s("c-adv","Advertiser Contact"),x=s("c-am","Account Manager");n.append(_.wrapper,x.wrapper);let G=document.createElement("div");G.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.9); backdrop-filter: blur(8px); border-top: 1px solid #E0E0E0; display: flex; justify-content: flex-end; position: absolute; bottom: 0; width: 100%; box-sizing: border-box; z-index: 100;";let C=document.createElement("button");return C.textContent="Gerar Nota S&T",C.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 24px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 6px rgba(26, 115, 232, 0.3); transition: transform 0.1s, box-shadow 0.2s;",C.onmousedown=()=>{C.style.transform="scale(0.96)",C.style.boxShadow="0 1px 3px rgba(26, 115, 232, 0.2)"},C.onmouseup=()=>{C.style.transform="scale(1)",C.style.boxShadow="0 2px 6px rgba(26, 115, 232, 0.3)"},G.appendChild(C),e.appendChild(n),e.appendChild(G),r.onclick=async()=>{r.innerHTML='<span style="font-size:16px">\u23F3</span> Buscando...';let v=await at();v.advertiserName&&(D.input.value=v.advertiserName),v.websiteUrl&&(z.input.value=v.websiteUrl),v.clientEmail&&($.input.value=v.clientEmail,_.input.value=v.clientEmail);let l=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);l&&(p.input.value=l[0]),r.innerHTML='<span style="font-size:16px; color:#188038">\u2705</span> Dados Preenchidos!',r.style.background="#E6F4EA",r.style.borderColor="#188038",setTimeout(()=>{r.innerHTML='<span style="font-size:16px">\u2728</span> Preencher Automaticamente',r.style.background="#FFFFFF",r.style.borderColor="#DADCE0"},2e3),Y("Dados capturados com sucesso!")},C.onclick=async()=>{let v=u=>{let h=e.querySelector(`#st-${u}`);return h?h.value:""},F=u=>{let h=e.querySelector(`input[name="st-${u}"]:checked`);return h?h.value:"N"},w=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${v("cid")}
<b>GA4 ID:</b> ${v("ga4")}
<b>GTM ID:</b> ${v("gtm")}
<b>Advertiser has access to either GA4 or GTM (Y/N):</b> ${F("access")}
<b>If Yes, user access email to GA4/GTM:</b> ${v("access-email")}
<b>Ghosting Access Available (Y/N):</b> ${F("ghost")}
<b>Name of the advertiser:</b> ${v("name")}
<b>Website Address:</b> ${v("url")}
<b>Advertiser\u2019s preferred mode of communication:</b> Phone
<b>Advertiser/Web Master\u2019s Phone Number:</b> ${v("phone")}
<b>Preferred Call Back time with time zone and contact number:</b> ${v("callback")}
<b>Advertiser/Web Master\u2019s Email Address:</b> ${v("email")}

<b>Detailed Issue Description:</b>
${v("desc")}

<b>Name of the conversion action or event in the question:</b> N/A
<b>Date range:</b> N/A
<b>Uncropped screenshots of the issue:</b>
${v("screens")}

<b>Test conversion details (if any):</b> N/A

<b>Checks performed by Technical Solutions Team (Detailed Info + Screenshot doc):</b>
${v("checks")}

[IMP] Contacts to be copied on all communication about this case
<b>Advertiser contact -</b> ${v("c-adv")}
<b>Account Manager -</b> ${v("c-am")}
<b>Additional Contact -</b> N/A

<b>Additional Comments:</b> (Optional)`.replace(/\n/g,"<br>");ct(w);let E=await At();E?(E.innerText.trim()===""&&(E.innerHTML=""),document.execCommand("insertHTML",!1,w),wt(E),Y("Nota S&T inserida!")):Y("Copiado! Abra uma nota para colar.")},e}function wo(){let t="v3.7.0 (S&T Mode)",e="bau",n="pt",o=!1,s=!1,i=!1,a={input:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},textarea:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease",height:"100px",resize:"vertical"},h3:{fontSize:"14px",fontWeight:"600",color:"#202124",margin:"0 0 12px 0"},label:{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},checkboxLabel:{display:"flex",alignItems:"center",marginBottom:"10px",fontSize:"14px",fontWeight:"400",cursor:"pointer",padding:"8px",background:"#f8f9fa",borderRadius:"6px",transition:"background-color 0.2s ease, box-shadow 0.2s ease",userSelect:"none"},checkboxInput:{width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"},buttonBase:{flex:"1 1 0",padding:"10px 0",color:"#fff",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"500",cursor:"pointer",marginTop:"16px"},stepBlock:{borderTop:"1px solid #eee",paddingTop:"12px",marginTop:"12px"},radioContainer:{display:"flex",gap:"15px",marginBottom:"10px"},optionalBtn:{width:"100%",padding:"10px",background:"white",border:"1px dashed #1a73e8",color:"#1a73e8",borderRadius:"6px",cursor:"pointer",fontWeight:"500",fontSize:"13px",marginBottom:"10px",transition:"all 0.2s"},helpLink:{fontSize:"12px",color:"#1a73e8",textDecoration:"none",cursor:"pointer",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"color 0.2s"}},r=xo(),d=yo(()=>{let V=d.getCheckedElements().map(M=>M.value);u&&u.value&&r.updateVisibility(u.value,V)}),p=document.createElement("div");p.id="autofill-popup",p.classList.add("cw-module-window"),Object.assign(p.style,Te,{right:"100px",width:"400px",transition:"width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)"});let f={popup:p,googleLine:null},c=Ie(p,"Case Notes",t,"Gera notas padronizadas.",f,()=>It());p.appendChild(c);let g=c.lastElementChild;if(g){let y=document.createElement("div");y.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',Object.assign(y.style,{width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease",marginLeft:"4px"}),y.title="Alternar para Split & Transfer",y.onmouseenter=()=>{y.style.background="rgba(255,255,255,0.1)",y.style.color="#FFF"},y.onmouseleave=()=>{i||(y.style.background="transparent",y.style.color="#9AA0A6")},y.onclick=V=>{V.stopPropagation(),D(y)},g.insertBefore(y,g.firstChild)}let b=document.createElement("div");Object.assign(b.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1"}),p.appendChild(b);let m=document.createElement("div");Object.assign(m.style,{flexGrow:"1",display:"none",overflow:"hidden"});let T=vo(()=>D());m.appendChild(T),p.appendChild(m);function D(y){i=!i,i?(b.style.display="none",m.style.display="flex",f.googleLine&&(f.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)"),y&&(y.style.color="#C58AF9",y.style.background="rgba(197, 138, 249, 0.15)")):(b.style.display="block",m.style.display="none",f.googleLine&&(f.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"),y&&(y.style.color="#9AA0A6",y.style.background="transparent"))}let z=document.createElement("div");z.textContent="created by lucaste@",Object.assign(z.style,no),p.appendChild(z);let R=document.createElement("div");R.id="step-lang-type";let $=document.createElement("label");Object.assign($.style,a.label),R.appendChild($);let Z=document.createElement("div");Object.assign(Z.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let S=document.createElement("div");S.textContent="Portugu\xEAs",S.classList.add("no-drag"),Object.assign(S.style,ye);let A=document.createElement("div");A.textContent="Espa\xF1ol",A.classList.add("no-drag"),Object.assign(A.style,ye),S.onclick=()=>Et("pt"),A.onclick=()=>Et("es"),Z.appendChild(S),Z.appendChild(A),R.appendChild(Z),b.appendChild(R);let k=document.createElement("div");k.id="step-0-case-type";let N=document.createElement("label");Object.assign(N.style,a.label),k.appendChild(N);let _=document.createElement("div");Object.assign(_.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let x=document.createElement("div");x.textContent="BAU",x.classList.add("no-drag"),Object.assign(x.style,ye);let G=document.createElement("div");G.textContent="LM",G.classList.add("no-drag"),Object.assign(G.style,ye),x.onclick=()=>St("bau"),G.onclick=()=>St("lm"),_.appendChild(x),_.appendChild(G),k.appendChild(_),b.appendChild(k);let C=document.createElement("div");C.id="step-1-selection";let v=document.createElement("label");v.className="cw-input-label",v.textContent="Status Principal";let F=document.createElement("select");F.id="main-status",F.className="cw-select",F.innerHTML=`
      <option value="" disabled selected hidden>Selecione uma op\xE7\xE3o...</option>
      <option value="NI">NI - Need Info</option>
      <option value="SO">SO - Solution Offered</option>
      <option value="IN">IN - Inactive</option>
      <option value="AS">AS - Assigned</option>
      <option value="DC">DC - Discard</option>
  `;let l=document.createElement("div");l.style.cssText="display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; margin-bottom: 6px;";let w=document.createElement("label");w.className="cw-input-label",w.textContent="Sub-status",w.style.marginBottom="0";let E=document.createElement("a");E.href="https://seu-link-do-guia-aqui.com",E.target="_blank",E.className="cw-info-link",E.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; transform:translateY(1px)"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Guia de Substatus',Object.assign(E.style,a.helpLink),l.appendChild(w),l.appendChild(E);let u=document.createElement("select");u.id="sub-status",u.className="cw-select",u.disabled=!0,u.innerHTML='<option value="" disabled selected hidden>Aguardando status principal...</option>',C.appendChild(v),C.appendChild(F),C.appendChild(l),C.appendChild(u),b.appendChild(C);let h=document.createElement("div");h.id="step-1-1-portugal",Object.assign(h.style,a.stepBlock,{display:"none"});let O=document.createElement("label");Object.assign(O.style,a.label),h.appendChild(O);let j=document.createElement("div");Object.assign(j.style,a.radioContainer);let L=document.createElement("div");Object.assign(L.style,{display:"flex",alignItems:"center"});let q=document.createElement("input");q.type="radio",q.name="portugal-group",q.value="sim",Object.assign(q.style,a.checkboxInput);let B=document.createElement("label");B.htmlFor="portugal-sim",Object.assign(B.style,{cursor:"pointer"}),L.appendChild(q),L.appendChild(B);let U=document.createElement("div");Object.assign(U.style,{display:"flex",alignItems:"center"});let I=document.createElement("input");I.type="radio",I.name="portugal-group",I.value="nao",I.checked=!0,Object.assign(I.style,a.checkboxInput);let H=document.createElement("label");H.htmlFor="portugal-nao",Object.assign(H.style,{cursor:"pointer"}),U.appendChild(I),U.appendChild(H),j.appendChild(L),j.appendChild(U),h.appendChild(j),b.appendChild(h);function de(y){o=y,y?ae.style.display="block":ae.style.display="none"}q.onchange=()=>de(!0),I.onchange=()=>de(!1);let ae=document.createElement("div");ae.id="step-1-2-consent",Object.assign(ae.style,a.stepBlock,{display:"none"});let ie=document.createElement("label");Object.assign(ie.style,a.label),ae.appendChild(ie);let ce=document.createElement("div");Object.assign(ce.style,a.radioContainer);let fe=document.createElement("div");Object.assign(fe.style,{display:"flex",alignItems:"center"});let Se=document.createElement("input");Se.type="radio",Se.name="consent-group",Se.value="Sim",Se.checked=!0,Object.assign(Se.style,a.checkboxInput);let _e=document.createElement("label");_e.htmlFor="consent-sim",Object.assign(_e.style,{cursor:"pointer"}),fe.appendChild(Se),fe.appendChild(_e);let et=document.createElement("div");Object.assign(et.style,{display:"flex",alignItems:"center"});let Re=document.createElement("input");Re.type="radio",Re.name="consent-group",Re.value="N\xE3o",Object.assign(Re.style,a.checkboxInput);let pt=document.createElement("label");pt.htmlFor="consent-nao",Object.assign(pt.style,{cursor:"pointer"}),et.appendChild(Re),et.appendChild(pt),ce.appendChild(fe),ce.appendChild(et),ae.appendChild(ce),b.appendChild(ae);let Be=document.createElement("div");Be.id="step-1-5-snippets",Object.assign(Be.style,a.stepBlock,{display:"none"});let ut=document.createElement("h3");Object.assign(ut.style,a.h3),ut.textContent="Cen\xE1rios Comuns";let Ee=bo(y=>{let V=document.querySelector("textarea");V&&(V.value=y,V.dispatchEvent(new Event("input")),V.style.transition="background-color 0.2s",V.style.backgroundColor="#e8f0fe",setTimeout(()=>V.style.backgroundColor="#fff",300))});Ee.id="snippet-container",Be.appendChild(ut),Be.appendChild(Ee),b.appendChild(Be);let Ae=document.createElement("div");Ae.id="step-3-form",Object.assign(Ae.style,a.stepBlock,{display:"none"});let Ct=document.createElement("h3");Object.assign(Ct.style,a.h3),Ae.appendChild(Ct);let De=document.createElement("div");De.id="dynamic-form-fields-container",Ae.appendChild(De);let he=document.createElement("button");he.textContent="+ Gostaria de selecionar uma task?",Object.assign(he.style,a.optionalBtn),he.onmouseover=()=>he.style.background="#e8f0fe",he.onmouseout=()=>he.style.background="white",he.onclick=()=>{he.style.display="none",Pe.style.display="block",d.selectionElement.style.display="block"};let Pe=document.createElement("h3");Object.assign(Pe.style,a.h3,{marginTop:"20px"});let jt=d.selectionElement;Object.assign(jt.style,{marginBottom:"20px"}),Ae.appendChild(he),Ae.appendChild(Pe),Ae.appendChild(jt),Ae.appendChild(r.element),Ae.appendChild(d.screenshotsElement),b.appendChild(Ae);let je=document.createElement("div");je.id="step-4-email",Object.assign(je.style,{display:"none",marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #eee"});let He=document.createElement("label");He.style.display="flex",He.style.alignItems="center",He.style.cursor="pointer",He.style.fontSize="14px";let Ve=document.createElement("input");Ve.type="checkbox",Ve.checked=!0,Object.assign(Ve.style,a.checkboxInput),He.appendChild(Ve),He.appendChild(document.createTextNode("Preencher email automaticamente?")),je.appendChild(He),b.appendChild(je);let Ke=document.createElement("div");Object.assign(Ke.style,{display:"none",gap:"8px",padding:"0"}),b.appendChild(Ke);let tt=document.createElement("button");Object.assign(tt.style,a.buttonBase,{backgroundColor:"#5f6368"}),tt.textContent="Copiar";let ot=document.createElement("button");Object.assign(ot.style,a.buttonBase,{backgroundColor:"#1a73e8"}),ot.textContent="Preencher",Ke.appendChild(tt),Ke.appendChild(ot);let nt=document.createElement("div");Object.assign(nt.style,Qe),nt.className="no-drag",nt.title="Redimensionar",p.appendChild(nt),Ze(p,nt),document.body.appendChild(p);function St(y){e=y;let V=it();Object.assign(x.style,ye),Object.assign(G.style,ye),y==="bau"?(Object.assign(x.style,V),E.href="https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657"):(Object.assign(G.style,V),E.href="https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243"),u.value&&u.dispatchEvent(new Event("change"))}function J(y){try{if(Fe&&Fe[n]&&Fe[n][y])return Fe[n][y];if(Fe&&Fe.pt&&Fe.pt[y])return Fe.pt[y]}catch{}return y}function Io(){$.textContent=J("idioma"),N.textContent=J("fluxo"),v.textContent=J("status_principal"),w.textContent=J("substatus"),ut.textContent=J("cenarios_comuns"),Pe.textContent=J("selecione_tasks"),Ct.textContent=J("preencha_detalhes"),tt.textContent=J("copiar"),ot.textContent=J("preencher"),F.querySelector('option[value=""]')&&(F.querySelector('option[value=""]').textContent=J("select_status")),u.querySelector('option[value=""]')&&(u.querySelector('option[value=""]').textContent=J("select_substatus")),O.textContent=J("caso_portugal"),B.textContent=J("sim"),H.textContent=J("nao"),ie.textContent=J("consentiu_gravacao"),_e.textContent=J("sim"),pt.textContent=J("nao"),De.querySelectorAll("label").forEach(y=>{let V=y.nextElementSibling.id.replace("field-",""),M=J(V.toLowerCase());M!==V.toLowerCase()?y.textContent=M:y.textContent=V.replace(/_/g," ").replace(/\b\w/g,K=>K.toUpperCase())+":"}),he.textContent="+ "+(n==="pt"?"Gostaria de selecionar uma task?":"Quisiera seleccionar una tarea?")}function Et(y){n=y;let V=it();Object.assign(S.style,ye),Object.assign(A.style,ye),y==="pt"?(Object.assign(S.style,V),h.style.display="block",de(o)):(Object.assign(A.style,V),h.style.display="none",ae.style.display="none"),Io(),u.value&&u.dispatchEvent(new Event("change"))}function Tt(y){(y.value.trim()===""||y.value.trim()==="\u2022")&&(y.value="\u2022 "),y.onkeydown=function(V){if(V.key==="Enter"){V.preventDefault();let M=this.selectionStart,K=this.selectionEnd,re=this.value,me=re.lastIndexOf(`
`,M-1)+1,Ce=re.substring(me,M),ge=Ce.trim()==="\u2022"||Ce.trim()===""?`
`:`
\u2022 `;this.value=re.substring(0,M)+ge+re.substring(K),this.selectionStart=this.selectionEnd=M+ge.length}else if(V.key==="Backspace"){let M=this.selectionStart;if(M===this.selectionEnd&&M>0){let K=this.value.substring(0,M);K.endsWith(`
\u2022 `)?(V.preventDefault(),this.value=K.substring(0,M-3)+this.value.substring(this.selectionEnd),this.selectionStart=this.selectionEnd=M-3):K==="\u2022 "&&(V.preventDefault(),this.value="",this.selectionStart=this.selectionEnd=0)}}}}function kt(){let y=typeof Ee<"u"?Ee:document.getElementById("snippet-container");if(!y)return;let V=y.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'),M={},K=new Set;V.forEach(se=>{let oe=se.id,W=ke[oe];if(W)for(let P in W)P==="linkedTask"?K.add(W.linkedTask):P!=="type"&&(M[P]||(M[P]=[]),M[P].includes(W[P])||M[P].push(W[P]))});let re=new Set;Object.values(ke).forEach(se=>{Object.keys(se).forEach(oe=>{oe!=="linkedTask"&&oe!=="type"&&re.add(oe)})}),re.forEach(se=>{let oe=document.getElementById(se);if(oe){let W=M[se]||[],P="";lt.includes(se.replace("field-",""))?(P=W.map(te=>te.startsWith("\u2022 ")?te:"\u2022 "+te).join(`
`),P===""?P="\u2022 ":P.endsWith(`
\u2022 `)||(P+=`
\u2022 `)):P=W.join(`

`),P.trim()!=="\u2022"&&P.trim()!==""?oe.value=P:lt.includes(se.replace("field-",""))?oe.value="\u2022 ":oe.value="",oe.tagName==="TEXTAREA"&&typeof Tt=="function"&&Tt(oe)}});let me=new Set,Ce=new Set;y.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(se=>{let oe=ke[se.id];oe&&oe.linkedTask&&(se.checked?me.add(oe.linkedTask):Ce.add(oe.linkedTask))}),Ce.forEach(se=>{me.has(se)||d.toggleTask(se,!1)}),me.forEach(se=>{d.toggleTask(se,!0)})}F.onchange=()=>{let y=F.value;if(Ot(1.5),u.innerHTML=`<option value="">${J("select_substatus")}</option>`,!y){u.disabled=!0;return}for(let V in rt){let M=rt[V];if(M.status===y){let K=document.createElement("option");K.value=V,K.textContent=M.name,u.appendChild(K)}}u.disabled=!1},u.onchange=()=>{let y=u.value;if(Ot(1.5),!y)return;d.updateSubStatus(y);let V=rt[y];Ee.innerHTML="";let M=(W,P,te)=>{let ue=document.createElement("label");Object.assign(ue.style,a.checkboxLabel),ue.onmouseover=()=>ue.style.backgroundColor="#e8eaed",ue.onmouseout=()=>ue.style.backgroundColor="#f8f9fa";let le=document.createElement("input");return le.type=P,le.id=W.id,Object.assign(le.style,a.checkboxInput),ue.appendChild(le),ue.appendChild(document.createTextNode(` ${W.text}`)),te.appendChild(ue),le},K=[],re="radio";if(y==="NI_Awaiting_Inputs")K=[{id:"quickfill-ni-inicio-manual",text:"In\xEDcio 2/6 (Manual)"},{id:"quickfill-ni-cms-access",text:"In\xEDcio 2/6 (ADV sem acesso ao CMS)"},{id:"quickfill-ni-followup-bau",text:"Follow-up 2/6 (BAU)"},{id:"quickfill-ni-followup-lm",text:"Follow-up 2/6 (LM)"}];else if(y.startsWith("SO_"))re="checkbox",K=[{id:"quickfill-gtm-install",text:"Instala\xE7\xE3o do GTM"},{id:"quickfill-whatsapp",text:"Convers\xE3o de WhatsApp"},{id:"quickfill-form",text:"Convers\xE3o de Formul\xE1rio (Padr\xE3o)"},{id:"quickfill-ecw4-close",text:"Fechamento ECW4 (P\xF3s 7 dias)"},{id:"quickfill-ga4-event-close",text:"Fechamento GA4 (P\xF3s 2 dias)"}];else if(y.startsWith("AS_")){re="checkbox";let W=document.createElement("label");W.textContent=J("cenarios_comuns"),Object.assign(W.style,a.label),Ee.appendChild(W),K=[{id:"quickfill-as-no-show",text:"Anunciante n\xE3o compareceu (respondeu e-mail)"},{id:"quickfill-as-insufficient-time",text:"Tempo insuficiente"},{id:"quickfill-as-no-access",text:"Anunciante sem acessos necess\xE1rios"}]}else y.startsWith("IN_")?K=[{id:"quickfill-in-nrp-bau",text:"NRP (BAU - 3 tentativas)"},{id:"quickfill-in-nrp-lm",text:"NRP (LM - Sem tentativas)"},{id:"quickfill-in-no-show-bau",text:"No-Show (BAU - 3 tentativas)"},{id:"quickfill-in-2-6-final",text:"Finaliza\xE7\xE3o 2/6 (Sem Resposta)"},{id:"quickfill-in-manual",text:"Outro (Manual)"}]:y.startsWith("DC_")?(re="radio",K=[{id:"quickfill-dc-lm-no-access",text:"LM - Sem acessos (Reagendar em BAU)"}]):y==="NI_Attempted_Contact"?(re="radio",K=[{id:"quickfill-ni-attempted-2day",text:"2 Day Rule (2 Liga\xE7\xF5es + Chat AM)"}]):y==="NI_Awaiting_Validation"&&(re="checkbox",K=[{id:"quickfill-ni-awaiting-ecw4",text:"ECW4 (Acompanhar)"},{id:"quickfill-ni-awaiting-ga4",text:"GA4 Event Tracking (Acompanhar)"}]);let me=K.filter(W=>{let P=ke[W.id];return!P.type||P.type==="all"||P.type===e});me.forEach((W,P)=>{let te=M(W,re,Ee);re==="radio"&&(te.name="scenario-radio-group",P===0&&(te.checked=!0))}),me.length>0&&(Be.style.display="block"),V.requiresTasks?(he.style.display="none",Pe.style.display="block",d.selectionElement.style.display="block"):(he.style.display="block",Pe.style.display="none",d.selectionElement.style.display="none"),De.innerHTML="";let Ce=V.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(Ce)].forEach(W=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(W))return;let P=W.slice(1,-1),te=document.createElement("label"),ue=J(P.toLowerCase());if(te.textContent=ue!==P.toLowerCase()?ue:P.replace(/_/g," ").replace(/\b\w/g,Q=>Q.toUpperCase())+":",Object.assign(te.style,a.label),P==="SPEAKEASY_ID"){let Q=document.createElement("button");Q.innerHTML='<span style="font-size:12px; margin-right:4px;">\u2728</span>Auto Busca',Q.style.cssText=`
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
          `,Q.title="Localizar Speakeasy ID no hist\xF3rico",Q.onmouseover=()=>{Q.style.backgroundColor="#c2e7ff",Q.style.boxShadow="0 1px 2px rgba(0,0,0,0.1)"},Q.onmouseout=()=>{Q.style.backgroundColor="#d3e3fd",Q.style.boxShadow="none"},Q.onmousedown=()=>{Q.style.backgroundColor="#a8c7fa",Q.style.transform="scale(0.96)"},Q.onmouseup=()=>Q.style.transform="scale(1)",Q.onclick=xe=>{xe.preventDefault(),ro(`field-${P}`)},te.appendChild(Q)}let le;lt.includes(P)?(le=document.createElement("textarea"),Object.assign(le.style,a.textarea),le.classList.add("bullet-textarea"),Tt(le)):Ft.includes(P)?(le=document.createElement("textarea"),Object.assign(le.style,a.textarea)):(le=document.createElement("input"),le.type="text",Object.assign(le.style,a.input),P==="REASON_COMMENTS"&&(y.startsWith("NI_")||y.startsWith("IN_"))&&(Object.assign(te.style,{display:"none"}),Object.assign(le.style,{display:"none"}))),P==="ON_CALL"&&e==="lm"&&(Object.assign(te.style,{display:"none"}),Object.assign(le.style,{display:"none"}),le.value="N/A"),le.id=`field-${P}`,De.appendChild(te),De.appendChild(le)});let se=Ee.querySelectorAll('input[type="checkbox"], input[type="radio"]');se.length>0&&(se.forEach(W=>{W.removeEventListener("change",kt),W.addEventListener("change",kt)}),kt()),Ae.style.display="block",We[y]?je.style.display="block":je.style.display="none",Ke.style.display="flex";let oe=d.getCheckedElements().map(W=>W.value);r.updateVisibility(y,oe)},he.onclick=()=>{he.style.display="none",Pe.style.display="block",d.selectionElement.style.display="block"};function Ht(){let y=u.value;if(!y)return null;let M=rt[y].template.replace(/\n/g,"<br>"),K='style="margin-bottom: 12px; padding-left: 30px;"',re=[],me="",Ce=d.getCheckedElements();Ce.length>0&&Ce.forEach(oe=>{let W=oe.value,P=Ge[W],te=oe.closest().querySelector(".stepper-count"),ue=te?parseInt(te.textContent):1;ue>1?re.push(`${P.name} (x${ue})`):re.push(P.name)});let ge=d.screenshotsElement;if(ge){let oe=Array.from(ge.querySelectorAll('input[id^="name-"]'));oe.length>0&&oe.forEach(W=>{let P=W.value,te=W.closest(".cw-screen-card");if(te){let ue=te.querySelectorAll('input[id^="screen-"]'),le=!1,Q="";ue.forEach(xe=>{let Vt=xe.closest(".cw-input-group"),$t=Vt?Vt.querySelector(".cw-input-label"):null,qo=$t?$t.textContent:"Evid\xEAncia",Ut=xe.value.trim(),Mo=Ut?` ${Ut}`:"";Q+=`<li>${qo} -${Mo}</li>`,le=!0}),le&&(me+=`<b>${P}</b>`,me+=`<ul ${K}>${Q}</ul>`)}})}if(M.includes("{TAGS_IMPLEMENTED}")?M=M.replace(/{TAGS_IMPLEMENTED}/g,re.join(", ")||"N/A"):re.length>0&&(M+=`<br><b>Tags:</b> ${re.join(", ")}<br>`),M.includes("{SCREENSHOTS_LIST}")?M=M.replace(/{SCREENSHOTS_LIST}/g,me?`${me}`:"N/A"):me!==""&&(M+=`<br>${me}`),n==="pt"&&o){let oe=Se.checked?J("sim"):J("nao");M=M.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${J("consentiu_gravacao")}</b> ${oe}<br><br>`),M=M.replace(/{CASO_PORTUGAL}/g,`<br><b>${J("caso_portugal")}</b> ${J("sim")}<br>`)}else n==="pt"&&!o?(M=M.replace(/{CASO_PORTUGAL}/g,`<br><b>${J("caso_portugal")}</b> ${J("nao")}<br>`),M=M.replace(/{CONSENTIU_GRAVACAO}/g,"")):(M=M.replace(/{CASO_PORTUGAL}/g,""),M=M.replace(/{CONSENTIU_GRAVACAO}/g,""));return De.querySelectorAll("input, textarea").forEach(oe=>{let W=oe.id.replace("field-",""),P=new RegExp(`{${W}}`,"g"),te=oe.value;if(W==="REASON_COMMENTS"&&(y.startsWith("NI_")||y.startsWith("IN_"))){let Q=Ee.querySelector('input[type="radio"]:checked');Q&&ke[Q.id]&&(te=ke[Q.id]["field-REASON_COMMENTS"])}if(lt.includes(W)&&te.trim()!==""){let Q=te.split(`
`).map(xe=>xe.trim()).filter(xe=>xe!==""&&xe!=="\u2022").map(xe=>xe.startsWith("\u2022 ")?xe.substring(2):xe).map(xe=>`<li>${xe}</li>`).join("");te=Q?`<ul ${K}>${Q}</ul>`:""}else Ft.includes(W)?te=te.split(`
`).filter(Q=>Q.trim()!=="").map(Q=>`<p style="margin: 0 0 8px 0;">${Q}</p>`).join(""):oe.tagName==="TEXTAREA"&&(te=te.replace(/\n/g,"<br>"));let ue=te.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(ue===""||ue==="\u2022"||ue.toLowerCase()==="n/a"){let Q=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${W}\\}(?:<br>\\s*)?`,"gi");Q.test(M)?M=M.replace(Q,""):M=M.replace(P,"")}else M=M.replace(P,te.replace(/\$/g,"$$$$"))}),M=M.replace(/{([A-Z0-9_]+)}/g,""),M=M.replace(/(<br>){3,}/g,"<br><br>"),typeof r<"u"&&r.getOutput&&(M+=r.getOutput()),M}tt.onclick=()=>{let y=Ht();y?(ct(y),Y(J("copiado_sucesso"))):Y(J("selecione_substatus"),{error:!0})},ot.onclick=async()=>{let y=u.value,V=Ht();if(!V){Y(J("selecione_substatus"),{error:!0});return}ct(V),It();let M=yt(),K=await At();if(K)try{if(K.focus(),K.innerHTML.trim()==="<p><br></p>"||K.innerHTML.trim()==="<br>"||K.innerText.trim()===""){let ge=document.createRange();ge.selectNodeContents(K);let se=window.getSelection();se.removeAllRanges(),se.addRange(ge),document.execCommand("delete",!1,null)}else if(!K.innerHTML.endsWith("<br><br>")){let ge=document.createRange();ge.selectNodeContents(K),ge.collapse(!1);let se=window.getSelection();se.removeAllRanges(),se.addRange(ge),document.execCommand("insertHTML",!1,"<br><br>")}document.execCommand("insertHTML",!1,V),wt(K),setTimeout(()=>{Y(J("inserido_copiado"))},600);let me=typeof Ve<"u"&&Ve?Ve.checked:!0;if(y&&We[y]&&me){let ge=We[y];await ht(ge),await new Promise(se=>setTimeout(se,500))}M(),Ot(1.5),F.value="",u.innerHTML=`<option value="">${J("select_substatus")}</option>`,u.disabled=!0}catch(re){console.error(re),Y("Erro ao inserir.",{error:!0}),M()}};function Ot(y=1.5){y<=1.5&&(Be.style.display="none",Ee.innerHTML=""),y<=2&&(d.reset(),he.style.display="none"),y<=3&&(Ae.style.display="none",De.innerHTML="",r.reset(),Ke.style.display="none",je.style.display="none")}function It(){if(s=!s,s){let y=p.querySelector(".cw-expand-btn");y&&typeof y.resetState=="function"&&y.resetState()}qe(s,p,"cw-btn-notes")}return St("bau"),Et("pt"),It}var Xe={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function Ao(){let t="v4.2.0 CR-Hybrid",e="CANNED_RESPONSES",n=Object.keys(Xe)[0],o="",s="list",i=!1,a={bgApp:"#F8F9FA",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.08)",borderFocus:"rgba(26, 115, 232, 0.4)",textPrimary:"#202124",textSecondary:"#5F6368",primary:"#1A73E8",primaryBg:"#E8F0FE",shadowCard:"0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",shadowHover:"0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",transition:"all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1)"},r={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:a.bgApp},d={display:"flex",width:"200%",height:"100%",transition:"transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",transform:"translateX(0)",willChange:"transform"},p={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},f={padding:"20px 24px 12px 24px",flexShrink:"0",background:a.bgApp,zIndex:"10",display:"flex",flexDirection:"column",gap:"16px",borderBottom:`1px solid ${a.borderSubtle}`},c={width:"100%",height:"44px",padding:"0 16px 0 48px",borderRadius:"12px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",fontWeight:"400",color:a.textPrimary,boxSizing:"border-box",outline:"none",transition:a.transition,boxShadow:"0 2px 5px rgba(0,0,0,0.03)",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%239AA0A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"16px center"},g={display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px",paddingBottom:"4px"},b={padding:"6px 14px",borderRadius:"100px",border:"1px solid #DADCE0",background:"#FFFFFF",color:a.textSecondary,fontSize:"13px",fontWeight:"500",letterSpacing:"0.3px",cursor:"pointer",transition:a.transition,flexShrink:"0",display:"flex",alignItems:"center",justifyContent:"center"},m={background:a.primaryBg,color:a.primary,borderColor:"transparent",fontWeight:"600",boxShadow:"0 1px 2px rgba(26, 115, 232, 0.15)"},T={padding:"16px 24px 80px 24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"12px"},D={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",height:"72px",minHeight:"72px",borderRadius:"16px",background:a.bgSurface,border:"1px solid transparent",boxShadow:a.shadowCard,cursor:"pointer",transition:"all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",position:"relative",overflow:"hidden"},z=document.createElement("div");z.id="quick-email-popup",z.classList.add("cw-module-window"),Object.assign(z.style,Te,{right:"100px",width:"440px",height:"640px",borderRadius:"20px",boxShadow:"0 24px 64px rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.4)"});let R={popup:z,googleLine:null,focusElement:null};function $(){i=!i,qe(i,z,"cw-btn-email"),i||setTimeout(()=>w(),300)}let Z=Ie(z,"Quick Email",t,"Templates & Automa\xE7\xF5es",R,()=>$()),S=document.createElement("div");Object.assign(S.style,r);let A=document.createElement("div");Object.assign(A.style,d);let k=document.createElement("div");Object.assign(k.style,p);let N=document.createElement("div");Object.assign(N.style,f);let _=document.createElement("input");_.placeholder="Pesquisar templates...",Object.assign(_.style,c),_.onfocus=()=>{_.style.borderColor=a.primary,_.style.boxShadow="0 0 0 4px rgba(26, 115, 232, 0.15)",_.style.background="#fff"},_.onblur=()=>{_.style.borderColor="transparent",_.style.boxShadow="0 2px 5px rgba(0,0,0,0.03)",_.style.background="#fff"},R.focusElement=_;let x=document.createElement("div");Object.assign(x.style,g);let G=document.createElement("div");Object.assign(G.style,T),N.appendChild(_),N.appendChild(x),k.appendChild(N),k.appendChild(G);let C=document.createElement("div");Object.assign(C.style,p);let v=document.createElement("div");Object.assign(v.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),C.appendChild(v),A.appendChild(k),A.appendChild(C),S.appendChild(A),z.appendChild(Z),z.appendChild(S),document.body.appendChild(z);async function F(O,j){try{i&&$();let L=yt();await new Promise(q=>setTimeout(q,800)),j==="email"?await co(O):j==="cr"&&await ht(O),L()}catch(L){console.error("\u274C Erro:",L);let q=document.querySelector(".cw-focus-backdrop");q&&q.classList.remove("active")}}function l(O){s="detail",A.style.transform="translateX(-50%)";let j='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',L='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';v.innerHTML=`
            <style>
                .cw-email-content p { margin: 0 0 8px 0; } /* Margem apenas embaixo */
                .cw-email-content ul { margin: 0 0 8px 16px; padding: 0; }
                .cw-email-content li { margin-bottom: 4px; }
            </style>

            <div style="position:sticky; top:0; background:rgba(255,255,255,0.9); backdrop-filter:blur(12px); border-bottom:1px solid #eee; padding:16px 24px; z-index:10; display:flex; align-items:center; gap:12px;">
                <button id="csa-back-btn" style="background:none; border:none; cursor:pointer; display:flex; color:#5f6368; padding:8px; margin-left:-12px; border-radius:50%; transition:background 0.2s;">${j}</button>
                <div style="font-weight:600; font-size:16px; color:#202124; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${O.name}</div>
            </div>
            
            <div style="padding:24px;">
                <div style="margin-bottom:24px;">
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Assunto</div>
                    <div style="font-size:14px; font-weight:500; color:#202124; padding:16px; background:#F8F9FA; border-radius:12px; border:1px solid #eee; box-shadow:inset 0 1px 2px rgba(0,0,0,0.02);">${O.subject}</div>
                </div>
                
                <div>
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Mensagem</div>
                    
                    <div class="cw-email-content" style="font-size:13px; color:#3c4043; line-height:1.5; white-space: normal; word-break: break-word; padding:0 4px;">
                        ${O.body}
                    </div>
                </div>
            </div>
            
            <div style="position:sticky; bottom:0; padding:24px; background:linear-gradient(to top, #fff 90%, rgba(255,255,255,0)); pointer-events:none;">
                <button id="csa-insert-btn" style="pointer-events:auto; width:100%; padding:14px; background:#1a73e8; color:white; border:none; border-radius:12px; font-size:14px; font-weight:600; cursor:pointer; display:flex; justify-content:center; align-items:center; gap:10px; box-shadow:0 4px 12px rgba(26,115,232,0.3); transition:transform 0.2s, box-shadow 0.2s;">
                    ${L} Usar Template
                </button>
            </div>
        `;let q=v.querySelector("#csa-back-btn");q.onmouseenter=()=>q.style.background="#f1f3f4",q.onmouseleave=()=>q.style.background="none",q.onclick=w;let B=v.querySelector("#csa-insert-btn");B.onmouseenter=()=>{B.style.transform="translateY(-1px)",B.style.boxShadow="0 6px 16px rgba(26,115,232,0.4)"},B.onmouseleave=()=>{B.style.transform="translateY(0)",B.style.boxShadow="0 4px 12px rgba(26,115,232,0.3)"},B.onclick=()=>{B.style.transform="scale(0.96)",F(O,"email"),setTimeout(()=>{B.style.transform="scale(1)",w()},300)}}function w(){s="list",A.style.transform="translateX(0)"}function E(O,j,L=null){let q=document.createElement("button"),B=L?`<span style="margin-right:6px; font-size:14px; opacity:0.9;">${L}</span>`:"";return q.innerHTML=`${B}${O}`,Object.assign(q.style,b),n===j&&o===""?Object.assign(q.style,m):(q.onmouseenter=()=>{q.style.background="#F1F3F4",q.style.borderColor="#DADCE0"},q.onmouseleave=()=>{q.style.background="#FFFFFF",q.style.borderColor="#DADCE0"}),q.onclick=()=>{n=j,o="",_.value="",u(),h()},q}function u(){x.innerHTML="",x.appendChild(E("Smart CRs",e,"\u26A1")),Object.keys(Xe).forEach(O=>{x.appendChild(E(Xe[O].title,O))})}function h(){G.innerHTML="";let O=[];if(o.trim()!==""){let U=o.toLowerCase();Object.values(Xe).forEach(I=>{I.emails.forEach(H=>{(H.name.toLowerCase().includes(U)||H.subject.toLowerCase().includes(U))&&O.push({type:"email",data:H})})}),Object.entries(We).forEach(([I,H])=>{if(!H)return;(I.replace(/_/g," ").toLowerCase().includes(U)||H.toLowerCase().includes(U))&&O.push({type:"cr",key:I,code:H})})}else n===e?Object.entries(We).forEach(([U,I])=>{I&&O.push({type:"cr",key:U,code:I})}):Xe[n]&&Xe[n].emails.forEach(U=>{O.push({type:"email",data:U})});if(O.length===0){G.innerHTML=`
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F50D}</div>
                    <div style="font-size:14px; font-weight:500;">Nenhum template encontrado</div>
                    <div style="font-size:12px; margin-top:4px;">Tente outro termo de busca</div>
                </div>`;return}let L='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1967D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',q='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA8600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',B='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BDC1C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';O.forEach(U=>{let I=document.createElement("div");if(Object.assign(I.style,D),U.type==="email"){let H=U.data,de=H.subject.length>45?H.subject.substring(0,45)+"...":H.subject;I.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#E8F0FE; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${L}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${H.name}</div>
                        <div style="font-size:12px; color:#5F6368; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${de}</div>
                    </div>
                    <div style="margin-left:12px; opacity:0.6;">${B}</div>
                `,I.onclick=()=>l(H)}else{let H=U.key.replace(/_/g," ").replace("AS ","AS - ").replace("NI ","NI - ");I.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#FEF7E0; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${q}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; margin-bottom:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${H}</div>
                        <div style="font-size:11px; font-weight:500; color:#EA8600; font-family:'Roboto Mono', monospace; letter-spacing:-0.2px;">${U.code}</div>
                    </div>
                    <div style="font-size:10px; font-weight:700; color:#DADCE0; text-transform:uppercase; letter-spacing:0.5px; border:1px solid #F1F3F4; padding:4px 8px; border-radius:6px; margin-left:12px;">Inserir</div>
                `,I.onclick=()=>{I.style.transform="scale(0.98)",I.style.background="#FEF7E0",setTimeout(()=>{I.style.transform="scale(1)",I.style.background="#fff",F(U.code,"cr")},150)}}I.onmouseenter=()=>{I.style.transform="translateY(-2px)",I.style.boxShadow=a.shadowHover,U.type==="cr"?I.style.borderLeft="3px solid #Fbbc04":I.style.borderLeft="3px solid #1a73e8"},I.onmouseleave=()=>{I.style.transform="translateY(0)",I.style.boxShadow=a.shadowCard,I.style.borderLeft="1px solid transparent"},G.appendChild(I)})}return _.addEventListener("input",O=>{o=O.target.value,o!==""?Array.from(x.children).forEach(j=>{Object.assign(j.style,b),j.style.opacity="0.6"}):u(),h()}),u(),h(),$}var Co={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function So(){let t="v2.1 (Apple Motion)",e={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#f8f9fa",scrollBehavior:"smooth"},card:{background:"#ffffff",border:"1px solid #dadce0",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"13px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"10px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.15s ease, opacity 0.3s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.5",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"20px",height:"20px",borderRadius:"6px",border:"2px solid #dadce0",marginRight:"14px",marginTop:"1px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #eee",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"}},n={},o="PT",s="BAU",i=!1,a=document.createElement("div");a.id="call-script-popup",a.classList.add("cw-module-window"),Object.assign(a.style,Te,{right:"auto",left:"50%",width:"400px",height:"650px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let r={popup:a,googleLine:null};function d(){i=!i,qe(i,a,"cw-btn-script")}let p=Ie(a,"Call Script",t,"Guia interativo para condu\xE7\xE3o de chamadas.",r,()=>{d()});a.appendChild(p);let f=document.createElement("div");Object.assign(f.style,e.progressBarContainer);let c=document.createElement("div");Object.assign(c.style,e.progressBarFill),f.appendChild(c),a.appendChild(f);let g=document.createElement("div");g.id="csa-content",Object.assign(g.style,e.contentArea),a.appendChild(g);let b=document.createElement("div");Object.assign(b.style,e.footer);let m=document.createElement("span");m.textContent="by lucaste@",Object.assign(m.style,{fontSize:"10px",color:"#bdc1c6"});let T=document.createElement("button");T.innerHTML=`
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
    Resetar Script
  `,Object.assign(T.style,e.resetBtn),T.onmouseenter=()=>T.style.background="#fce8e6",T.onmouseleave=()=>T.style.background="transparent",T.onclick=()=>{T.style.transform="scale(0.9)",setTimeout(()=>T.style.transform="scale(1)",150);for(let C in n)delete n[C];N()},b.appendChild(m),b.appendChild(T),a.appendChild(b);let D=document.createElement("div");Object.assign(D.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let z=document.createElement("div");Object.assign(z.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let R=document.createElement("div");R.textContent="BAU";let $=document.createElement("div");$.textContent="LT",Object.assign(R.style,ye),Object.assign($.style,ye),z.appendChild(R),z.appendChild($);let Z=document.createElement("select");Object.assign(Z.style,oo,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),Z.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',Z.value=o,D.appendChild(z),D.appendChild(Z),g.appendChild(D);let S=document.createElement("div");S.id="csa-checklist-area",g.appendChild(S);let A=document.createElement("div");Object.assign(A.style,Qe),A.className="no-drag",A.title="Redimensionar",a.appendChild(A),Ze(a,A),document.body.appendChild(a);function k(C){return C}function N(){S.innerHTML="";let C=`${o} ${s}`,v=Co[C];if(!v){S.innerHTML=`<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <div style="font-size: 24px;">\u2615</div>
        <div>Script n\xE3o configurado.</div>
      </div>`,c.style.width="0%";return}let F=v.color||"#1a73e8",l=0,w=0;["inicio","fim"].forEach(E=>{v[E]&&(l+=v[E].length)}),["inicio","fim"].forEach((E,u)=>{let h=v[E];if(!h||h.length===0)return;let O=document.createElement("div");Object.assign(O.style,e.card);let j=document.createElement("div");Object.assign(j.style,e.cardTitle);let L=E==="inicio"?"Abertura":"Fechamento";o.includes("ES")&&(L=E==="inicio"?"Apertura":"Cierre"),o.includes("EN")&&(L=E==="inicio"?"Opening":"Closing"),j.textContent=L;let q=document.createElement("span");q.style.fontSize="11px",q.style.opacity="0.7",q.style.fontWeight="500",q.style.background="#f1f3f4",q.style.padding="2px 8px",q.style.borderRadius="10px",j.appendChild(q),O.appendChild(j);let B=0;h.forEach((U,I)=>{let H=`${C}-${E}-${I}`,de=!!n[H];de&&(w++,B++);let ae=document.createElement("div");Object.assign(ae.style,e.itemRow);let ie=document.createElement("div");Object.assign(ie.style,e.checkbox);let ce=document.createElement("span");ce.innerHTML=U,ce.style.flex="1",de?(Object.assign(ae.style,e.itemCompleted),ie.style.background=F,ie.style.borderColor=F,ie.style.transform="scale(1)",ie.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ae.style.textDecoration="none",ae.style.opacity="1",ie.style.background="transparent",ie.style.borderColor="#dadce0",ie.style.transform="scale(1)",ie.innerHTML=""),ae.onclick=()=>{let fe=!n[H];n[H]=fe,ne.playClick(),fe?(ie.style.transform="scale(1.2)",setTimeout(()=>ie.style.transform="scale(1)",150),Object.assign(ae.style,e.itemCompleted),ie.style.background=F,ie.style.borderColor=F,ie.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ae.style.textDecoration="none",ae.style.opacity="1",ie.style.background="transparent",ie.style.borderColor="#dadce0",ie.innerHTML=""),_(C,v)},ae.onmouseenter=()=>{n[H]||(ae.style.background="#f1f3f4",ie.style.borderColor=F)},ae.onmouseleave=()=>{n[H]||(ae.style.background="transparent",ie.style.borderColor="#dadce0")},ae.appendChild(ie),ae.appendChild(ce),O.appendChild(ae)}),B===h.length&&h.length>0&&(q.style.color="#1e8e3e",q.style.background="#e6f4ea",O.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),q.textContent=`${B}/${h.length}`,S.appendChild(O)}),x(l,w)}function _(C,v){let F=0,l=0;["inicio","fim"].forEach(w=>{let E=v[w]||[];F+=E.length;let u=0;E.forEach((h,O)=>{n[`${C}-${w}-${O}`]&&(l++,u++)})}),x(F,l),setTimeout(()=>N(),200)}function x(C,v){let F=C===0?0:v/C*100;c.style.width=`${F}%`,F===100?c.style.background="#34A853":c.style.background="linear-gradient(90deg, #4285F4, #34A853)"}function G(C){s=C;let v=it();Object.assign(R.style,ye),Object.assign($.style,ye),Object.assign(C==="BAU"?R.style:$.style,v),N()}return R.onclick=()=>G("BAU"),$.onclick=()=>G("LT"),Z.addEventListener("change",C=>{o=C.target.value,N()}),G(s),d}var dt={tasks:{label:"Minhas Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico (Cognizant)"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda interna"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio de Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM Team & LT"},{name:"Performance Individual",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO (go/mymetricswebao)"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form para solicitar grava\xE7\xE3o da chamada."},{name:"Escala\xE7\xE3o de Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form para escala\xE7\xE3o de Sellers, compartilhado pelo gpozzi@."},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es para o split."}]},ads:{label:"Google Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page Application para suporte"},{name:"[SOP] Ads Conversion Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o de Convers\xE3o"},{name:"Win Criteria: Conversion Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Planilha de valida\xE7\xE3o de c\xF3digo"},{name:"[SOP] Website Call Conversion",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o de Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conversions",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"Convers\xF5es Otimizadas"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento de EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o de problemas de convers\xE3o"},{name:"Win Criteria: Troubleshooting",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=B4:B7",desc:"Valida\xE7\xE3o de Troubleshoot"},{name:"[SOP] Ads Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o de Remarketing"},{name:"[SOP] Dynamic Remarketing (Retail)",url:"https://docs.google.com/document/d/1NVGBhJ-bYAq-F-55Te2T7Kz1HOTuj0KZc-SBbdfyfyM/edit",desc:"Varejo"},{name:"[SOP] Customer Match",url:"https://docs.google.com/document/d/1945XuWXxAnfQyIBK0-46cPf2brxhbu1-mMbKjvs_EOU/edit",desc:"Lista de Clientes"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o de Leads"},{name:"[SOP] GTM Installation",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o do Container"}]},analytics:{label:"Analytics (GA4)",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o e Configura\xE7\xE3o"},{name:"Win Criteria: GA4 Setup",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce Guide",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia de Dev para E-comm"},{name:"[SOP] Troubleshooting GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o de Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"FAQs de Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista oficial de eventos"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador de URLs de campanha"}]},shopping:{label:"Shopping",links:[{name:"[SOP] Onboarding MC 2.0",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Optimization",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o de Feed BAU"},{name:"Consult ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna de Consult"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es de Produtos"},{name:"[SOP] Offline Feed (GSS)",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o de Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center Oficial"}]},tech:{label:"Tech Helper",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias de implementa\xE7\xE3o por CMS."},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es t\xE9cnicas para Iframes."},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost para Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost para Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost para GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta Gearloose"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost para Merchant Center"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground C\xF3digo"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador de Regex"},{name:"Gerador de Pessoas",url:"https://www.4devs.com.br/gerador_de_pessoas",desc:"Dados de teste (4Devs)"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. oficial sobre CSP"},{name:"Doc. Enhanced Conversion",url:"https://support.google.com/google-ads/answer/9888656?hl=pt",desc:"Como funcionam as convers\xF5es otimizadas?"},{name:"Doc. CoMo",url:"https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=pt-br",desc:"Doc. oficial sobre Consent Mode"},{name:"Cursos SkillShop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos sobre as ferramentas do Google."},{name:"Consent Mode - Instala\xE7\xE3o",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Configurar o modo de consentimento em sites."},{name:"CMPs - Consent Mode",url:"https://cmppartnerprogram.withgoogle.com/",desc:"Lista com CMPS parceiros do Google."},{name:"Consent Mode - Testes",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Ensina como testar CoMo."}]},hr:{label:"RH / Cognizant",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal do Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha de Pagamento"}]},lm:{label:"LM Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas/pausas."},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro de chamadas longas."},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema."},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria."}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo."},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis."}]},suporte:{label:"Suportes",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"}]}},Eo=[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico",cat:"tasks"},{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Tag Support",cat:"ads"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM",cat:"tech"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads",cat:"tech"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ajuda Interna",cat:"tasks"}];function To(){let t="v3.2.0 (Scroll Fix)",e="home",n="",o={bgApp:"#F8F9FA",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.08)",textPrimary:"#202124",textSecondary:"#5F6368",primary:"#1A73E8",primaryBg:"#E8F0FE",shadowCard:"0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",shadowHover:"0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",transition:"all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1)"},s={width:"100%",height:"40px",padding:"0 12px 0 40px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:o.textPrimary,boxSizing:"border-box",outline:"none",transition:o.transition,boxShadow:"0 2px 5px rgba(0,0,0,0.03)",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%239AA0A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center"},i={display:"flex",flexWrap:"nowrap",overflowX:"auto",gap:"8px",padding:"4px 24px 12px 24px",scrollbarWidth:"none",msOverflowStyle:"none",maskImage:"linear-gradient(to right, transparent, black 12px, black 95%, transparent)",webkitMaskImage:"linear-gradient(to right, transparent, black 12px, black 95%, transparent)"},a={padding:"6px 12px 6px 10px",borderRadius:"8px",border:"1px solid #DADCE0",background:"#FFFFFF",color:o.textSecondary,fontSize:"13px",fontWeight:"500",cursor:"pointer",whiteSpace:"nowrap",transition:o.transition,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:"0",flexShrink:"0"},r={background:o.primaryBg,color:o.primary,borderColor:"transparent",fontWeight:"600",boxShadow:"0 1px 2px rgba(26, 115, 232, 0.15)"},d={display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px",padding:"12px 16px",marginBottom:"8px",borderRadius:"12px",background:o.bgSurface,border:"1px solid transparent",boxShadow:o.shadowCard,cursor:"pointer",transition:"transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.2s, border-color 0.2s",overflow:"hidden",minWidth:"0",opacity:"0",transform:"translateY(10px)"},p={width:"36px",height:"36px",flexShrink:"0",borderRadius:"10px",background:"#F1F3F4",color:o.textSecondary,display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s, color 0.2s"},f={fontSize:"11px",fontWeight:"700",textTransform:"uppercase",color:o.textSecondary,margin:"16px 0 8px 0",letterSpacing:"0.5px"},c=document.createElement("div");c.id="feedback-popup",c.classList.add("cw-module-window"),Object.assign(c.style,Te,{right:"100px",width:"460px",height:"640px",background:o.bgApp});let g={home:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>',tasks:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',lm:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>',ads:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>'},b=document.createElement("style");b.innerHTML="#feedback-popup div::-webkit-scrollbar { display: none; }",document.head.appendChild(b);let m={popup:c,googleLine:null,focusElement:null},T=!1,D=Ie(c,"Links & Bookmarks",t,"Acesso r\xE1pido \xE0s suas ferramentas, dashboards e documenta\xE7\xF5es.",m,()=>_());c.appendChild(D);let z=document.createElement("div");Object.assign(z.style,{padding:"20px 24px 12px 24px",display:"flex",flexDirection:"column",gap:"16px",borderBottom:`1px solid ${o.borderSubtle}`,flexShrink:"0",backgroundColor:o.bgApp});let R=document.createElement("input");R.type="text",R.placeholder="Pesquisar...",Object.assign(R.style,s),m.focusElement=R,R.onfocus=()=>{R.style.borderColor=o.primary,R.style.backgroundColor="#fff",R.style.boxShadow="0 0 0 4px rgba(26, 115, 232, 0.15)"},R.onblur=()=>{R.style.borderColor="transparent",R.style.backgroundColor="#fff",R.style.boxShadow="0 2px 5px rgba(0,0,0,0.03)"};let $=document.createElement("div");Object.assign($.style,i),z.appendChild(R),z.appendChild($),c.appendChild(z);let Z=document.createElement("div");Object.assign(Z.style,{padding:"16px 24px",overflowY:"auto",flexGrow:"1",backgroundColor:o.bgApp}),c.appendChild(Z),document.body.appendChild(c);function S(){$.innerHTML="";let x=document.createElement("button");x.innerHTML=`
        <span style="display:flex; align-items:center; margin-right:6px; opacity:0.8;">${g.home}</span>
        In\xEDcio
    `,Object.assign(x.style,a),e==="home"&&n===""?Object.assign(x.style,r):(x.onmouseenter=()=>{x.style.background="#F1F3F4",x.style.borderColor="#DADCE0"},x.onmouseleave=()=>{x.style.background="#FFFFFF",x.style.borderColor="#DADCE0"}),x.onclick=()=>{e="home",n="",R.value="",S(),A()},$.appendChild(x),Object.keys(dt).forEach(G=>{let C=dt[G],v=document.createElement("button"),F=g[G]||"",l=C.links.length;v.innerHTML=`
        <span style="display:flex; align-items:center; margin-right:6px; opacity:0.8;">${F}</span>
        ${C.label}
        <span style="font-size:10px; opacity:0.5; margin-left:6px; background:rgba(0,0,0,0.05); padding:1px 5px; border-radius:4px;">${l}</span>
      `,Object.assign(v.style,a),e===G&&n===""?Object.assign(v.style,r):(v.onmouseenter=()=>{v.style.background="#F1F3F4",v.style.borderColor="#DADCE0"},v.onmouseleave=()=>{v.style.background="#FFFFFF",v.style.borderColor="#DADCE0"}),v.onclick=()=>{e=G,n="",R.value="",S(),v.scrollIntoView({behavior:"smooth",block:"nearest",inline:"center"}),A()},$.appendChild(v)})}function A(){if(Z.innerHTML="",e==="home"&&n===""){let C=document.createElement("div");Object.assign(C.style,f),C.textContent="\u2B50 Mais Usados",Z.appendChild(C),Eo.forEach((F,l)=>{let w=k(F,g[F.cat]||g.home);Z.appendChild(w),N(w,l)});let v=document.createElement("div");Object.assign(v.style,f,{marginTop:"24px"}),v.textContent="\u{1F4CB} Minhas Tarefas",Z.appendChild(v),dt.tasks.links.slice(0,5).forEach((F,l)=>{let w=k(F,g.tasks);Z.appendChild(w),N(w,l+Eo.length)});return}let x=[];if(n.trim()!==""?Object.entries(dt).forEach(([C,v])=>{let F=v.links.filter(l=>l.name.toLowerCase().includes(n.toLowerCase())||l.desc.toLowerCase().includes(n.toLowerCase()));F.forEach(l=>{l._catIcon=g[C]}),x=[...x,...F]}):(x=dt[e].links,x.forEach(C=>C._catIcon=g[e])),x.length===0){Z.innerHTML=`
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:#9AA0A6;">
            <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F50D}</div>
            <div style="font-size:14px; font-weight:500;">Nenhum link encontrado</div>
        </div>`;return}x.forEach((C,v)=>{let F=k(C,C._catIcon);Z.appendChild(F),N(F,v)})}function k(x,G){let C=document.createElement("div");Object.assign(C.style,d);let v=document.createElement("div");Object.assign(v.style,p),v.innerHTML=G||'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',C.appendChild(v);let F=document.createElement("div");F.style.flexGrow="1",F.style.minWidth="0",F.style.display="flex",F.style.flexDirection="column",F.style.gap="2px";let l=j=>{if(!n)return j;let L=new RegExp(`(${n})`,"gi");return j.replace(L,'<span style="color:#1a73e8; font-weight:700;">$1</span>')},w=`<div style="font-size:14px; font-weight:600; color:${o.textPrimary}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${l(x.name)}</div>`,E=`<div style="font-size:12px; color:${o.textSecondary}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${l(x.desc)}</div>`;F.innerHTML=w+E,C.appendChild(F);let u=document.createElement("div");u.style.display="flex",u.style.alignItems="center",u.style.gap="8px",u.style.flexShrink="0",u.style.opacity="0.4",u.style.transition="opacity 0.2s";let h=document.createElement("div");h.title="Copiar Link",h.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',Object.assign(h.style,{width:"32px",height:"32px",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",color:o.textSecondary,cursor:"pointer",transition:"all 0.2s ease"}),h.onclick=j=>{ne.playClick(),j.stopPropagation(),navigator.clipboard.writeText(x.url),h.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',h.style.color="#188038",h.style.background="#E6F4EA",setTimeout(()=>{h.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',h.style.color=o.textSecondary,h.style.background="transparent"},1500)},h.onmouseenter=()=>{h.style.background="#F1F3F4"},h.onmouseleave=()=>{h.style.background="transparent"},u.appendChild(h);let O=document.createElement("div");return O.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>',Object.assign(O.style,{display:"flex",alignItems:"center",justifyContent:"center",color:"#DADCE0",width:"24px",height:"24px"}),u.appendChild(O),C.appendChild(u),C.onclick=()=>window.open(x.url,"_blank"),C.onmouseenter=()=>{C.style.transform="translateY(-2px)",C.style.boxShadow=o.shadowHover,u.style.opacity="1",C.querySelector("div:first-child").style.background="#E8F0FE",C.querySelector("div:first-child").style.color="#1967D2",O.style.color="#1A73E8"},C.onmouseleave=()=>{C.style.transform="translateY(0)",C.style.boxShadow=o.shadowCard,u.style.opacity="0.4",C.querySelector("div:first-child").style.background="#F1F3F4",C.querySelector("div:first-child").style.color=o.textSecondary,O.style.color="#DADCE0"},C}function N(x,G){requestAnimationFrame(()=>{setTimeout(()=>{x.style.opacity="1",x.style.transform="translateY(0)"},G*30)})}R.addEventListener("input",x=>{n=x.target.value,n!==""?Array.from($.children).forEach(G=>{Object.assign(G.style,a),G.style.opacity="0.6"}):S(),A()});function _(){T=!T,qe(T,c,"cw-btn-links")}return S(),A(),_}var ze=[];function Pt(t){ze=t}var Vo=["lucaste"],$o=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function ko(){let t="v4.9 (High Contrast UI)",e=!1,n=null,o=null;function s(l){if(!l)return"";try{let w=new Date(l);return isNaN(w.getTime())?String(l):w.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(l)}}if(!document.getElementById("cw-broadcast-hd-css")){let l=document.createElement("style");l.id="cw-broadcast-hd-css",l.innerHTML=`
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
      `,document.head.appendChild(l)}let i={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},a={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function r(l){return l?Object.entries(l).map(([w,E])=>`${w.replace(/[A-Z]/g,u=>"-"+u.toLowerCase())}:${E}`).join(";"):""}function d(l){if(!l||typeof l!="string")return"";let w=l;return w=w.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),w=w.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),w=w.replace(/_(.*?)_/g,"<i>$1</i>"),w=w.replace(/\n/g,"<br>"),w=ao(w),w}let p=document.createElement("div");p.id="broadcast-popup",p.classList.add("cw-module-window"),Object.assign(p.style,Te,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let f={popup:p,googleLine:null};function c(){if(e=!e,qe(e,p,"cw-btn-broadcast"),e){let l=document.getElementById("cw-btn-broadcast");l&&l.classList.remove("has-new"),k()}}let g=Ie(p,"Central de Avisos",t,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",f,()=>c()),b=g.querySelector(".cw-header-actions")||g.lastElementChild,m=null;function T(){let l=null;try{l=Xt()}catch{console.warn("TechSol: Auth Pending")}if(l){let w=l.split("@")[0].toLowerCase(),E=Vo.includes(w);if(window._cwIsAdmin=E,window._cwCurrentUser=w,E&&b&&!b.querySelector("#cw-admin-btn")){let u=document.createElement("div");u.id="cw-admin-btn",u.className="cw-btn-interactive",u.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(u.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),u.title="Novo Aviso",u.onclick=h=>{h.stopPropagation(),R()},b.insertBefore(u,b.firstChild),m||z(),_()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(T,2e3))}if(b){let l=document.createElement("button");l.textContent="Limpar",l.className="cw-btn-interactive",Object.assign(l.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),l.onclick=w=>{w.stopPropagation(),ne.playSuccess();let E=ze.map(u=>u.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(E)),_(),N()},b.insertBefore(l,b.firstChild)}p.appendChild(g);let D=document.createElement("div");D.id="cw-update-status",D.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",p.appendChild(D);function z(){m=document.createElement("div"),m.className="cw-editor-overlay",m.innerHTML=`
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
      `,m.querySelectorAll('input[name="cw-bc-type"]').forEach(u=>{u.addEventListener("change",()=>{m.querySelectorAll(".cw-radio-option").forEach(h=>h.classList.remove("checked")),u.parentElement.classList.add("checked")})}),setTimeout(()=>{let u=m.querySelector(".cw-radio-option.info");u&&u.classList.add("checked")},100);let l=m.querySelector("#cw-bc-cancel"),w=m.querySelector("#cw-bc-close-x"),E=m.querySelector("#cw-bc-send");l.onclick=$,w.onclick=$,E.onclick=Z,p.appendChild(m)}function R(l=null){if(!m)return;let w=m.querySelector("#cw-editor-title-label"),E=m.querySelector("#cw-bc-title"),u=m.querySelector("#cw-bc-text"),h=m.querySelector("#cw-bc-send");if(l){o=l.id,w.textContent="Editar Aviso",E.value=l.title||"",u.value=l.text||"",h.textContent="Salvar Altera\xE7\xF5es";let O=l.type||"info",j=m.querySelector(`input[name="cw-bc-type"][value="${O}"]`);j&&j.click()}else{o=null,w.textContent="Novo Aviso",E.value="",u.value="",h.textContent="Publicar";let O=m.querySelector('input[name="cw-bc-type"][value="info"]');O&&O.click()}m.classList.add("active"),setTimeout(()=>E.focus(),300)}function $(){m&&m.classList.remove("active"),o=null}async function Z(){let l=m.querySelector("#cw-bc-send"),w=m.querySelector("#cw-bc-title"),E=m.querySelector("#cw-bc-text"),u=m.querySelector('input[name="cw-bc-type"]:checked'),h=u?u.value:"info";if(!w.value.trim()||!E.value.trim()){Y("Preencha todos os campos!",{error:!0});return}l.textContent="Salvando...",l.style.opacity="0.7";let O=!1;o?O=await we.updateBroadcast(o,{title:w.value,text:E.value,type:h}):O=await we.sendBroadcast({title:w.value,text:E.value,type:h,author:window._cwCurrentUser||"admin"}),O?(Y(o?"Atualizado!":"Publicado!"),ne.playSuccess(),$(),setTimeout(()=>k(),1500)):(Y("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),l.textContent=o?"Salvar Altera\xE7\xF5es":"Publicar",l.style.opacity="1")}async function S(l){if(confirm("Confirma a exclus\xE3o deste aviso?"))if(await we.deleteBroadcast(l)){Y("Aviso removido."),ne.playClick();let E=ze.findIndex(u=>u.id===l);E>-1&&ze.splice(E,1),_(),setTimeout(()=>k(),1500)}else Y("Erro ao excluir.",{error:!0})}let A=document.createElement("div");A.className="cw-nice-scroll",Object.assign(A.style,i.feedContainer),p.appendChild(A);async function k(){e&&(D.style.display="block",D.innerHTML="\u{1F504} Sincronizando...");try{let l=await we.fetchData();l&&l.broadcast&&(Pt(l.broadcast),N(),e&&(_(),D.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{D.style.display="none"},1500)))}catch{e&&(D.innerHTML="\u26A0\uFE0F Offline")}}function N(){let l=document.getElementById("cw-btn-broadcast");if(!l)return;let w=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(ze.some(u=>!w.includes(u.id))){if(l.classList.add("has-new"),!l.querySelector(".cw-badge")){let u=document.createElement("div");u.className="cw-badge",Object.assign(u.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),l.appendChild(u)}}else{l.classList.remove("has-new");let u=l.querySelector(".cw-badge");u&&u.remove()}}function _(){A.innerHTML="";let l=p.querySelector("#cw-bau-widget");l&&l.remove();let w=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),E=[...ze].sort((L,q)=>{let B=new Date(L.date).getTime()||0;return(new Date(q.date).getTime()||0)-B}),u=E.findIndex(L=>L.title&&L.title.toLowerCase().includes("disponibilidade bau"));if(u!==-1){let L=E[u];E.splice(u,1);let q=document.createElement("div");q.id="cw-bau-widget",Object.assign(q.style,i.bauContainer);let B=[],U=(L.text||"").split(`
`),I=/\d{1,2}\/\d{1,2}/;if(U.forEach(ce=>{let fe=ce.match(I);if(fe){let Se=fe[0],_e="\u{1F4C5}";/🇧🇷|🇵🇹|PT|BR/i.test(ce)?_e="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(ce)&&(_e="\u{1F1EA}\u{1F1F8}"),B.some(Re=>Re.flag===_e&&Re.date===Se)||B.push({flag:_e,date:Se})}}),B.length===0){let ce=(L.text||"").match(/\d{1,2}\/\d{1,2}/g);ce&&[...new Set(ce)].forEach(fe=>B.push({flag:"\u{1F4C5}",date:fe}))}let H="",de='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(de=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${de}
              `),B.length>0?H=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${B.map(fe=>`
                  <div style="${r(i.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${r(i.bauFlag)}">${fe.flag}</span>
                      <span style="${r(i.bauDate)}">${fe.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${de}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${d(L.text)}</div>
              `:H=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${d(L.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,q.innerHTML=`
              <div style="${r(i.bauHeader)}; margin-bottom:8px;">
                  <div style="${r(i.liveIndicator)}">
                      <div style="${r(i.pulseDot)}"></div>
                      <span style="${r(i.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${s(L.date)}</div>
              </div>
              ${H}
          `,D.after(q);let ae=q.querySelector("#cw-bau-toggle-btn"),ie=q.querySelector("#cw-bau-full");if(ae&&ie&&(ae.onclick=()=>{let ce=ie.style.display==="none";ie.style.display=ce?"block":"none",ae.textContent=ce?"Ocultar":"Detalhes"}),window._cwIsAdmin){let ce=q.querySelector(".cw-bau-edit");ce&&(ce.onclick=()=>R(L))}}let h=E.sort((L,q)=>{let B=w.includes(L.id),U=w.includes(q.id);return B===U?0:B?1:-1});if(h.length===0&&!u){let L=document.createElement("div");Object.assign(L.style,i.emptyState),L.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,A.appendChild(L)}let O=h.filter(L=>!w.includes(L.id)),j=h.filter(L=>w.includes(L.id));if(O.forEach(L=>A.appendChild(x(L,!1))),j.length>0){let L=document.createElement("div");Object.assign(L.style,i.historyDivider),L.innerHTML=`<span>Hist\xF3rico (${j.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let q=document.createElement("div");Object.assign(q.style,i.historyContainer),j.forEach(U=>q.appendChild(x(U,!0)));let B=!1;L.onclick=()=>{ne.playClick(),B=!B,q.style.display=B?"flex":"none",L.querySelector("svg").style.transform=B?"rotate(180deg)":"rotate(0deg)"},A.appendChild(L),A.appendChild(q)}}function x(l,w){let E=document.createElement("div");Object.assign(E.style,w?i.cardHistory:i.card);let u=a[l.type]||a.info,h=document.createElement("div");Object.assign(h.style,i.cardHeader);let O=document.createElement("div");Object.assign(O.style,i.typeTag,{color:u.color,background:u.bg}),O.innerHTML=`${u.icon} <span>${l.type}</span>`;let j=document.createElement("span");if(Object.assign(j.style,i.dateTag),j.textContent=s(l.date),h.appendChild(O),w)h.appendChild(j);else{let I=document.createElement("button");I.className="cw-btn-interactive",Object.assign(I.style,i.dismissBtn),I.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',I.onmouseenter=()=>{I.style.color="#1e8e3e",I.style.background="#e6f4ea",I.style.borderColor="#1e8e3e"},I.onmouseleave=()=>{I.style.color="#5f6368",I.style.background="#fff",I.style.borderColor="rgba(0,0,0,0.1)"},I.onclick=H=>{H.stopPropagation(),ne.playClick(),E.style.transform="translateX(20px)",E.style.opacity="0",setTimeout(()=>{let de=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");de.push(l.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(de)),_(),N()},200)},h.appendChild(I)}let L=document.createElement("div");Object.assign(L.style,i.cardContent);let q=document.createElement("div");Object.assign(q.style,i.msgTitle),q.textContent=l.title;let B=document.createElement("div");Object.assign(B.style,i.msgBody),B.innerHTML=d(l.text);let U=document.createElement("div");if(Object.assign(U.style,i.msgMeta),U.innerHTML=`Publicado por <b>${l.author||"Sistema"}</b>`,w||(U.innerHTML+=` \u2022 ${s(l.date)}`),L.appendChild(q),L.appendChild(B),L.appendChild(U),E.appendChild(h),E.appendChild(L),window._cwIsAdmin){let I=document.createElement("div");I.className="cw-card-actions";let H=document.createElement("button");H.className="cw-action-btn edit",H.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',H.onclick=()=>R(l);let de=document.createElement("button");de.className="cw-action-btn delete",de.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',de.onclick=()=>S(l.id),I.appendChild(H),I.appendChild(de),E.appendChild(I)}return E}let G=we.getCachedBroadcasts();G.length>0&&(Pt(G),_()),setTimeout(T,500),k(),n||(n=setInterval(k,$o));let C=document.createElement("div");Object.assign(C.style,Qe),C.className="no-drag",p.appendChild(C),Ze(p,C),document.body.appendChild(p);let v=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),F=ze.some(l=>!v.includes(l.id));return{toggle:c,hasUnread:F}}function Oo(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let t=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],e=0,n={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},o=document.createElement("div");Object.assign(o.style,n.overlay);let s=document.createElement("div");Object.assign(s.style,n.card);let i=document.createElement("div");Object.assign(i.style,n.icon);let a=document.createElement("div");Object.assign(a.style,n.title);let r=document.createElement("div");Object.assign(r.style,n.text);let d=document.createElement("div");Object.assign(d.style,n.dotsContainer);let p=document.createElement("div");Object.assign(p.style,n.btnContainer);let f=document.createElement("button");f.textContent="Pular",Object.assign(f.style,n.btn,n.btnSkip),f.onmouseover=()=>f.style.color="#202124",f.onmouseout=()=>f.style.color="#5f6368";let c=document.createElement("button");c.textContent="Pr\xF3ximo",Object.assign(c.style,n.btn,n.btnNext),c.onmouseover=()=>c.style.transform="scale(1.05)",c.onmouseout=()=>c.style.transform="scale(1)",p.appendChild(f),p.appendChild(c),s.appendChild(i),s.appendChild(a),s.appendChild(r),s.appendChild(d),s.appendChild(p),o.appendChild(s),document.body.appendChild(o);function g(m){let T=t[m];i.textContent=T.icon,a.textContent=T.title,r.textContent=T.text,d.innerHTML="",t.forEach((D,z)=>{let R=document.createElement("div");Object.assign(R.style,n.dot),z===m&&Object.assign(R.style,n.dotActive),d.appendChild(R)}),T.isLast?(f.style.display="none",c.textContent="Come\xE7ar \u{1F680}",c.style.width="100%"):(f.style.display="block",c.textContent="Pr\xF3ximo",c.style.width="auto")}function b(){localStorage.setItem("cw_onboarding_seen_v1","true"),o.style.opacity="0",s.style.transform="translateY(20px)",setTimeout(()=>o.remove(),400),ne.playSuccess(),Y("Tudo pronto! Use o menu flutuante.")}c.onclick=()=>{ne.playClick(),e<t.length-1?(e++,g(e)):b()},f.onclick=()=>{confirm("Pular o tutorial?")&&b()},g(0),requestAnimationFrame(()=>{o.style.opacity="1",s.style.transform="translateY(0)"})}function Uo(){if(window.techSolInitialized){Lt();return}window.techSolInitialized=!0,console.log("\u{1F680} TechSol Suite Initializing...");try{eo();try{ne.initGlobalListeners(),ne.playStartup()}catch(i){console.warn("\xC1udio n\xE3o p\xF4de ser iniciado automaticamente:",i)}we.fetchTips(),Lt();let t=wo(),e=Ao(),n=So(),o=To(),s=ko();go({toggleNotes:t,toggleEmail:e,toggleScript:n,toggleLinks:o,broadcastControl:s}),setTimeout(()=>{Oo()},1500)}catch(t){console.error("Erro fatal na inicializa\xE7\xE3o:",t),Y("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}Uo();})();
