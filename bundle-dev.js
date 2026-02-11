(()=>{var At="",Et="",co=e=>new Promise(t=>setTimeout(t,e));async function po(){if(At&&Et)return At;try{let e=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!e)return"Agente";e.click(),await co(150);let t="Consultor",o=document.querySelector("profile-details .name");if(o)t=o.textContent.trim().split(" ")[0],t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();else{let s=document.querySelector("profile-details img");if(s&&s.src.includes("/photos/")){let i=s.src.match(/\/photos\/([^\?]+)/)[1];t=i.charAt(0).toUpperCase()+i.slice(1)}}let n=document.querySelector("profile-details .email");return n&&(Et=n.textContent.trim(),console.log("TechSol: Identidade confirmada ->",Et)),e.click(),document.body.click(),At=t,t}catch(e){return console.warn("Sherlock falhou:",e),"Consultor"}}function jt(){return At||"Consultor"}function Ue(){return Et||null}function uo(e){let t=new Date,o=t.getHours(),n=t.getDay(),s="Ol\xE1",i="";o>=5&&o<12?(s="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):o>=12&&o<18?(s="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(s="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let a=[];o>=0&&o<5?a=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:o<12?n===1?a=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:n===5?a=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:a=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:o<18?a=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:a=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(n===0||n===6)&&(a=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let r=a[Math.floor(Math.random()*a.length)];return{prefix:`${s},`,name:e,suffix:r,icon:i,isFriday:n===5}}async function on(){try{let t=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!t)return null;let o=t.parentElement,n=o.querySelector(".unmask-button")||o.querySelector('[aria-label="Click to view"]');n&&(n.click(),await co(500));let i=Array.from(o.querySelectorAll("a, span, div, pii-value")).find(a=>{let r=a.innerText.trim();return r.includes("@")&&!r.includes("Is this:")&&r.toLowerCase()!=="email"});return i?i.innerText.trim():null}catch(e){return console.warn("Erro ao capturar email do cliente:",e),null}}function nn(){try{let e=document.querySelector('material-input[debug-id="account-id-input"]');if(e){let t=e.querySelector("input");if(t){let o=t.value.trim();if(o)return o.includes("@")?o:`${o}@google.com`}}}catch(e){console.warn("Erro ao capturar email interno:",e)}return null}function an(){try{let t=Array.from(document.querySelectorAll(".data-pair-label")).find(s=>s.textContent.includes("Google Ads External Customer ID")||s.textContent.includes("Customer ID"));if(t){let s=t.closest("home-data-item")||t.parentElement;if(s){let i=s.querySelector(".data-pair-content");if(i)return i.textContent.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}}let n=document.body.innerText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);if(n)return n[0].replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(e){console.warn("Erro ao capturar CID:",e)}return"---"}async function Ge(){let e="Cliente",t="[INSERIR URL]";try{let a=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(a&&a.nextElementSibling){let r=a.nextElementSibling.innerText.trim();r&&(e=r)}}catch(i){console.warn("Falha Nome:",i)}try{let a=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(a&&a.nextElementSibling){let r=a.nextElementSibling.innerText.trim();r&&(t=r)}}catch(i){console.warn("Falha URL:",i)}let o=await on(),n=nn(),s=an();return{advertiserName:e,websiteUrl:t,clientEmail:o,internalEmail:n,cid:s,agentName:jt()}}var tt=null,Pt=null,je=.3;function et(){if(!tt){let e=window.AudioContext||window.webkitAudioContext;e&&(tt=new e)}return tt&&tt.state==="suspended"&&tt.resume(),tt}function mo(e){if(Pt)return Pt;let t=e.sampleRate*2,o=e.createBuffer(1,t,e.sampleRate),n=o.getChannelData(0);for(let s=0;s<t;s++)n[s]=Math.random()*2-1;return Pt=o,o}var W={playClick:()=>{let e=et();if(!e)return;let t=e.currentTime,o=e.createBufferSource();o.buffer=mo(e);let n=e.createBiquadFilter();n.type="highpass",n.frequency.value=4e3;let s=e.createGain();s.gain.setValueAtTime(je*.8,t),s.gain.exponentialRampToValueAtTime(.001,t+.015),o.connect(n),n.connect(s),s.connect(e.destination),o.start(t),o.stop(t+.02)},playHover:()=>{let e=et();if(!e)return;let t=e.currentTime,o=e.createOscillator();o.type="sine",o.frequency.setValueAtTime(400,t);let n=e.createGain();n.gain.setValueAtTime(0,t),n.gain.linearRampToValueAtTime(je*.1,t+.005),n.gain.linearRampToValueAtTime(0,t+.02),o.connect(n),n.connect(e.destination),o.start(t),o.stop(t+.03)},playSuccess:()=>{let e=et();if(!e)return;let t=e.currentTime;[1046.5,1567.9].forEach((n,s)=>{let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=n,a.gain.setValueAtTime(0,t),a.gain.linearRampToValueAtTime(je*.6,t+.05),a.gain.exponentialRampToValueAtTime(.001,t+.6),i.connect(a),a.connect(e.destination),i.start(t),i.stop(t+.7)})},playGenieOpen:()=>{let e=et();if(!e)return;let t=e.currentTime,o=e.createBufferSource();o.buffer=mo(e);let n=e.createBiquadFilter();n.type="lowpass",n.frequency.setValueAtTime(100,t),n.frequency.exponentialRampToValueAtTime(800,t+.2);let s=e.createGain();s.gain.setValueAtTime(0,t),s.gain.linearRampToValueAtTime(je*.5,t+.05),s.gain.linearRampToValueAtTime(0,t+.25),o.connect(n),n.connect(s),s.connect(e.destination),o.start(t),o.stop(t+.3)},playError:()=>{let e=et();if(!e)return;let t=e.currentTime,o=e.createOscillator(),n=e.createGain();o.type="triangle",o.frequency.setValueAtTime(120,t),o.frequency.exponentialRampToValueAtTime(80,t+.1),n.gain.setValueAtTime(je,t),n.gain.exponentialRampToValueAtTime(.001,t+.15),o.connect(n),n.connect(e.destination),o.start(t),o.stop(t+.2)},playStartup:()=>{let e=et();if(!e)return;let t=e.currentTime,o=.12,n=e.createOscillator(),s=e.createGain(),i=e.createBiquadFilter();n.type="square",n.frequency.setValueAtTime(400,t),n.frequency.exponentialRampToValueAtTime(50,t+.1),i.type="lowpass",i.frequency.setValueAtTime(800,t),i.frequency.exponentialRampToValueAtTime(100,t+.1),s.gain.setValueAtTime(je*4,t),s.gain.exponentialRampToValueAtTime(.001,t+.1),n.connect(i),i.connect(s),s.connect(e.destination),n.start(t),n.stop(t+.12);let a=e.createOscillator(),r=e.createGain();a.type="sine",a.frequency.setValueAtTime(150,t),a.frequency.exponentialRampToValueAtTime(50,t+.15),r.gain.setValueAtTime(je*1.5,t),r.gain.exponentialRampToValueAtTime(.001,t+.15),a.connect(r),r.connect(e.destination),a.start(t),a.stop(t+.15),[55,55.4,110.5].forEach(l=>{let p=e.createOscillator(),g=e.createGain(),x=e.createBiquadFilter();p.type="sawtooth",p.frequency.value=l,x.type="lowpass",x.frequency.setValueAtTime(30,t),x.frequency.linearRampToValueAtTime(900,t+o+.2),x.frequency.exponentialRampToValueAtTime(40,t+3),g.gain.setValueAtTime(0,t),g.gain.linearRampToValueAtTime(je*.6,t+o+.1),g.gain.exponentialRampToValueAtTime(.001,t+3.5),p.connect(x),x.connect(g),g.connect(e.destination),p.start(t),p.stop(t+3.6)})},playNotification:()=>{let e=et();if(!e)return;let t=e.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(n=>{let s=e.createOscillator(),i=e.createGain();s.type="sine",s.frequency.setValueAtTime(n.freq,t),i.gain.setValueAtTime(0,t),i.gain.linearRampToValueAtTime(je*n.vol,t+.004),i.gain.exponentialRampToValueAtTime(.001,t+n.dur),s.connect(i),i.connect(e.destination),s.start(t),s.stop(t+n.dur+.1)})},playSwoosh:()=>{W.playGenieOpen()},playReset:()=>{W.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let e=0,t=50;document.addEventListener("mouseover",o=>{if(!tt)return;let n=o.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!n||n.contains(o.relatedTarget))return;let s=Date.now();s-e<t||(W.playHover(),e=s)},{passive:!0})}};var go=1e4;function fo(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
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
    `,document.head.appendChild(t)}function U(e,t={}){let o=document.createElement("div"),n=t.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(o.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:n,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),o.textContent=e,document.body.appendChild(o),t.error?W.playError():W.playSuccess(),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>o.remove(),400)},t.duration||4e3)}function xo(e,t=null){let o=0,n=0,s=0,i=0,a=t||e;a.style.cursor="grab",a.onmousedown=r;function r(p){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(p.target.tagName)||p.target.closest(".no-drag"))return;p=p||window.event,a.style.cursor="grabbing",e.style.transition="none";let g=e.getBoundingClientRect();e.style.transform="none",e.style.left=g.left+"px",e.style.top=g.top+"px",e.style.margin="0",e.style.bottom="auto",e.style.right="auto",go++,e.style.zIndex=go,s=p.clientX,i=p.clientY,e.setAttribute("data-dragging","true"),document.onmouseup=l,document.onmousemove=d}function d(p){p=p||window.event,p.preventDefault(),o=s-p.clientX,n=i-p.clientY,s=p.clientX,i=p.clientY;let g=e.offsetTop-n,x=e.offsetLeft-o,h=16,f=window.innerWidth,b=window.innerHeight,T=e.offsetWidth,S=e.offsetHeight;x<h?x=h:x+T>f-h&&(x=f-T-h),g<h?g=h:g+S>b-h&&(g=b-S-h),e.style.top=g+"px",e.style.left=x+"px"}function l(){document.onmouseup=null,document.onmousemove=null,a.style.cursor="grab",setTimeout(()=>{e.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",e.setAttribute("data-dragging","false"),e.setAttribute("data-moved","true")},50)}}var Oe={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var $t={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Tt={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var ho={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var Ie={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var Ht=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],bo=-1;function ut(){let e=Math.floor(Math.random()*Ht.length);return e===bo&&(e=(e+1)%Ht.length),bo=e,Ht[e]}var Pe=e=>new Promise(t=>setTimeout(t,e));async function sn(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let o=e.querySelector(".cursor");await Pe(200);for(let n=0;n<t.length;n++){let s=t.charAt(n),i=document.createElement("span");i.textContent=s,o&&o.parentNode===e?o.before(i):e.appendChild(i);let a=Math.floor(Math.random()*60)+30;n===0&&(a=150),n>t.length-3&&(a=30),await Pe(a)}await Pe(600),o&&(o.style.display="none")}async function Vt(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
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
        `,document.head.appendChild(t)}let e=document.createElement("div");e.className="splash-container",e.innerHTML=`
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
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await Pe(200);let t=await po(),o=uo(t),n=e.querySelector("#w-icon"),s=e.querySelector("#p1"),i=e.querySelector("#p2"),a=e.querySelector("#p3"),r=e.querySelector("#p-sextou");n&&(n.innerHTML=o.icon),s&&(s.textContent=o.prefix),a&&(a.textContent=o.suffix),await Pe(300);let d=n?n.querySelector("svg"):null;if(d&&(d.style.opacity="1",d.style.transform="scale(1)"),await Pe(400),s&&(s.style.opacity="1"),W.playStartup(),i&&await sn(i,o.name),a&&(a.style.opacity="1",a.style.transform="translateY(0)"),o.isFriday&&r){await Pe(400),r.style.display="block",r.offsetWidth;let l=r.querySelector(".sextou-badge");l&&(l.style.opacity="1",l.style.transform="scale(1)")}await Pe(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await Pe(900),e.parentNode&&e.parentNode.removeChild(e)}}var We={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Ye(e,t){t.onmousedown=o;function o(n){n.stopPropagation(),n.preventDefault();let s=e.style.transition;e.style.transition="none";let i=n.clientX,a=n.clientY,r=parseFloat(getComputedStyle(e,null).getPropertyValue("width").replace("px","")),d=parseFloat(getComputedStyle(e,null).getPropertyValue("height").replace("px","")),l=i,p=a,g=!1;function x(b){l=b.clientX,p=b.clientY,g||(window.requestAnimationFrame(()=>{h(),g=!1}),g=!0)}function h(){let b=r+(l-i),T=d+(p-a);b>360&&(e.style.width=b+"px"),T>300&&(e.style.height=T+"px")}function f(){document.removeEventListener("mousemove",x),document.removeEventListener("mouseup",f),setTimeout(()=>{e.style.transition=s},50)}document.addEventListener("mousemove",x),document.addEventListener("mouseup",f)}t.onmouseenter=()=>t.style.opacity="1",t.onmouseleave=()=>t.style.opacity="0.6"}function yo(e){if(!e)return"";let t={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return e.replace(/:([a-zA-Z0-9-_+]+):/g,o=>t[o]?t[o]:"")}function vo(e){return new Promise(t=>{let o=document.createElement("div");Object.assign(o.style,{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2147483647,opacity:0,transition:"opacity 0.3s ease"});let n=document.createElement("div");Object.assign(n.style,{background:"white",padding:"24px",borderRadius:"16px",boxShadow:"0 24px 48px rgba(0,0,0,0.2)",width:"320px",textAlign:"center",transform:"scale(0.9)",transition:"transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",fontFamily:"'Google Sans', Roboto, sans-serif"}),n.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124;">${e}</div>
            <div style="display: flex; gap: 12px; justify-content: center;">
                <button id="cw-conf-cancel" style="padding: 10px 20px; border-radius: 8px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 500; font-family: inherit;">Cancelar</button>
                <button id="cw-conf-ok" style="padding: 10px 20px; border-radius: 8px; border: none; background: #FF3B30; color: white; cursor: pointer; font-weight: 500; font-family: inherit;">Excluir</button>
            </div>
        `,o.appendChild(n),document.body.appendChild(o),requestAnimationFrame(()=>{o.style.opacity=1,n.style.transform="scale(1)"});let s=i=>{o.style.opacity=0,n.style.transform="scale(0.9)",setTimeout(()=>{o.remove(),t(i)},300)};o.querySelector("#cw-conf-cancel").onclick=()=>{W.playClick(),s(!1)},o.querySelector("#cw-conf-ok").onclick=()=>{W.playClick(),s(!0)}})}var rt=e=>new Promise(t=>setTimeout(t,e));function mt(e){e&&["mousedown","mouseup","click"].forEach(t=>e.dispatchEvent(new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window})))}var wo="cw-automation-styles";if(!document.getElementById(wo)){let e=document.createElement("style");e.id=wo,e.innerHTML=`
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
    `,document.head.appendChild(e)}function Co(e){let t=document.getElementById("cw-loading-overlay");e?t?t.style.opacity="1":(t=document.createElement("div"),t.id="cw-loading-overlay",document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1")):t&&(t.style.opacity="0",setTimeout(()=>t.remove(),300))}async function So(e){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let t=document.getElementById(e),o="";Co(!0),t&&(o=t.placeholder,t.placeholder="Buscando ID...",t.value="",t.classList.add("cw-scanning-active"));try{let n=document.querySelector('material-button[debug-id="dock-item-case-log"]');n&&!n.classList.contains("selected")&&(mt(n),await rt(1200));let s=document.querySelector("search-filter dropdown-button .button");if(s&&!(s.innerText||"").includes("All")){mt(s),await rt(600);let x=document.querySelector('material-checkbox[debug-id="check-all-box"]');x&&x.getAttribute("aria-checked")!=="true"&&(mt(x),await rt(300));let h=document.querySelector('material-button[debug-id="apply-filter"]');h&&(mt(h),await rt(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await rt(500));let a=Array.from(document.querySelectorAll(".message-header"));for(let g=a.length-1;g>=0;g--){let x=a[g],h=x.querySelector("i.material-icons-extended"),f=h&&h.innerText.trim()==="phone_in_talk",b=x.innerText||"",T=b.includes("Agent joined")||b.includes("outbound-call")||b.includes("Speakeasy");if(f||T){x.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",x),t&&(t.placeholder="Lendo mensagem..."),mt(x),await rt(1e3));break}}let d=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),l=/Speakeasy.*?(P\d{15,25})/i,p=null;for(let g=d.length-1;g>=0;g--){let x=d[g];if(x.offsetParent===null)continue;let h=(x.innerText||"").match(l);if(h&&h[1]){p=h[1];break}}if(t)if(p){try{await navigator.clipboard.writeText(p)}catch{}t.value=p,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),W.playSuccess(),U(`ID Localizado: ${p}`),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}else W.playError(),U("Nenhum ID encontrado.",{error:!0}),t.placeholder="N\xE3o encontrado",t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}catch(n){console.error("Erro na automa\xE7\xE3o:",n),U("Erro ao processar.",{error:!0})}finally{t&&(t.classList.remove("cw-scanning-active"),t.value||(t.placeholder=o)),Co(!1)}}var He={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:"}},Re={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},gt={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>Substatus:</b> DC - Other<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br>Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},ot={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},bt=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],Ut=["CONSIDERACOES","COMENTARIOS"],$e={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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
\u2022 Segui o protocolo de espera (BAU): realizei duas tentativas de liga\xE7\xE3o, sem sucesso.
\u2022 Nenhuma das liga\xE7\xF5es foi atendida (ex: Caixa Postal).
\u2022 Caso inativado ap\xF3s 2 Day Rule.`,"field-SCREENSHOTS":`\u2022 Tentativa 1 - 
\u2022 Tentativa 2  - 
\u2022 Tentativa 3 - `,"field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-2-6-final":{type:"all","field-REASON_COMMENTS":"Finaliza\xE7\xE3o (2/6)","field-SPEAKEASY_ID":"-","field-ON_CALL":"-","field-COMENTARIOS":"\u2022 Dia 9 finaliza\xE7\xE3o do 2/6, durante o per\xEDodo do acompanhamento n\xE3o houve retorno do anunciante, ent\xE3o o caso ser\xE1 encerrado.","field-SCREENSHOTS":"\u2022 N/A","field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-manual":{type:"all","field-REASON_COMMENTS":"Outro (Manual)","field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-dc-lm-no-access":{type:"lm","field-REASON_COMMENTS":"Discard - Falta de acessos (Reagendamento solicitado)","field-COMENTARIOS":`N\xE3o conseguimos implementar nada durante a consultoria, j\xE1 que o adv n\xE3o tinha os acessos.

Irei abrir caso em BAU para o dia solicitado e pedir descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo.`},"quickfill-ni-attempted-2day":{type:"bau","field-REASON_COMMENTS":"Attempted Contact (In\xEDcio 2 Day Rule)","field-CONTEXTO_CALL":`\u2022 Fiz a primeira tentativa de liga\xE7\xE3o, sem sucesso.
\u2022 Enviei uma mensagem no chat para o AM.
\u2022 Aguardei 5 minutos e fiz a segunda tentativa de liga\xE7\xE3o, novamente sem sucesso.
\u2022 Aguardei mais 5 minutos e agora farei o acompanhamento 2 Day Rule.`,"field-SCREENSHOTS":`\u2022 MSG AM -
\u2022 Tentativa 1 -
\u2022 Tentativa 2 -`}};var Se=e=>new Promise(t=>setTimeout(t,e));function Me(e,t="info"){let o={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${e}`,o[t]||o.info)}function De(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>e.dispatchEvent(new MouseEvent(o,t)))}function kt(e,t){if(!e)return;let o=`cw-warning-${e.id||Math.random().toString(36).substr(2,9)}`,n=document.getElementById(o);n&&n.remove();let s=e.getBoundingClientRect(),i=document.createElement("div");i.id=o,i.style.cssText=`
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
            <span style="line-height:1.4;">${t}</span>
        </div>
        <div class="cw-close-btn" style="
            cursor: pointer; color: #5f6368; font-weight: bold; font-size: 16px; 
            padding: 0 4px; line-height: 1; opacity: 0.6; transition: opacity 0.2s;
        ">\xD7</div>
    `;let a=i.querySelector(".cw-close-btn");a.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&a.click()},25e3)}async function Ot(e,t){if(!e||!t)return;e.focus(),e.value="",e.dispatchEvent(new Event("input",{bubbles:!0})),await Se(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),await Se(100),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function Wt(){let t=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(o=>{let n=o.offsetParent!==null,s=o.closest("case-message-view")!==null,i=o.closest(".editor")!==null||o.closest("write-card")!==null;return n&&!s&&i});return t&&Me("Editor visualmente detectado.","success"),t}async function Ao(){Me("\u{1F680} FASE 1: Tentando abrir a janela de email...");let e=!1,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(g=>g.innerText.trim()==="email");if(o&&o.offsetParent!==null){Me("Bot\xE3o de email direto encontrado.");let g=o.closest("material-button")||o.closest("material-fab")||o;De(g),e=!0}else{Me("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let g=document.querySelector("material-fab-speed-dial");if(g){let x=g.querySelector(".trigger");if(x){De(x),await Se(800);let f=Array.from(document.querySelectorAll("i.material-icons-extended")).find(b=>b.innerText.trim()==="email");f&&(De(f),e=!0)}}}if(!e)return U("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;Me("\u{1F680} FASE 2: Verificando rascunhos...");let n=null,s=0,i=20;for(;s<i;){await Se(250);let g=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(n=Array.from(g).find(x=>x.offsetParent!==null),n){Me("\u26A0\uFE0F Rascunho detectado!","warn");break}s++}if(n){Me("\u{1F5D1}\uFE0F Descartando..."),De(n),n.click();let g=null,x=0;for(;x<15;){await Se(300);let h=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(g=Array.from(h).find(f=>f.offsetParent!==null),g)break;x++}g&&(De(g),U("Limpando rascunho antigo...",{duration:2e3}),await Se(2500))}Me("\u{1F680} FASE 3: Buscando editor final...");let a=0,r=null;for(;a<20&&(r=Wt(),!r);)await Se(250),a++;if(!r)return U("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let d=r.closest('[id="email-body-content-top"]'),p=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(d){if(p){let x=p.closest('[aria-hidden="true"]');x&&x.removeAttribute("aria-hidden"),p.focus(),De(p)}await Se(300),d.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let g=d.querySelector("#cases-body-field");if(g){let x=document.createRange();x.selectNodeContents(g),x.collapse(!0);let h=window.getSelection();h.removeAllRanges(),h.addRange(x)}return!0}return!1}async function It(e){if(!e||!await Ao())return;let o=await Ge();Me("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let n=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(n&&(n.click(),await Se(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await Ot(i,o.clientEmail),kt(i,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await Ot(i,o.internalEmail),kt(i,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}await Se(500);let s=document.querySelector('material-button[debug-id="canned_response_button"]');if(s){De(s),await Se(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){De(i),document.execCommand("insertText",!1,e),i.dispatchEvent(new Event("input",{bubbles:!0})),Me("\u23F3 Buscando resultado da Canned Response...","info");let a=null,r=0,d=15e3,l=500;for(;r<d&&(a=document.querySelector("material-select-dropdown-item"),!a);)await Se(l),r+=l;if(a){De(a),await Se(1500);let p=Wt();if(p){let x=Array.from(p.querySelectorAll("span.field")).filter(f=>f.innerText.includes("{Requested Task Type}"));if(x.length>0){let f=x.map(T=>T.closest("tr")).filter(T=>T!==null),b=[...new Set(f)];if(b.length>0){let S=b[0].querySelector('td[width="100%"]');S&&(S.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let $=1;$<b.length;$++)b[$].remove()}}let h=p.innerHTML;o.advertiserName&&h.includes("{%ADVERTISER_NAME%}")&&(h=h.replace(/{%ADVERTISER_NAME%}/g,o.advertiserName)),h.includes("{%^79285%}")&&(h=h.replace(/{%\^79285%}/g,o.websiteUrl||"seu site")),p.innerHTML=h}U("Canned Response aplicada!")}else Me(`\u274C Timeout: Resultado '${e}' n\xE3o apareceu ap\xF3s 15s.`,"error"),U(`Timeout: Template '${e}' n\xE3o carregou.`,{error:!0})}}else U("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function Eo(e){if(Me(`\u{1F680} Iniciando Quick Email: ${e.name}`),!await Ao())return;let o=await Ge(),n=jt();await Se(600);let s=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(s&&(s.click(),await Se(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let r=document.querySelector('input[aria-label="Enter To email address"]');r&&(await Ot(r,o.clientEmail),kt(r,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let r=document.querySelector('input[aria-label="Enter Bcc email address"]');r&&(await Ot(r,o.internalEmail),kt(r,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}let i=document.querySelector('input[aria-label="Subject"]');i&&e.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,e.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await Se(300));let a=Wt();if(a){let d=(a.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');d&&(d.focus(),De(d));let l=new Date;l.setDate(l.getDate()+3);let p=l.getDay();p===6?l.setDate(l.getDate()+2):p===0&&l.setDate(l.getDate()+1);let g=l.toLocaleDateString("pt-BR"),x=e.body;x=x.replace(/\[Nome do Cliente\]/g,o.advertiserName||"Cliente"),x=x.replace(/\[INSERIR URL\]/g,o.websiteUrl||"seu site"),x=x.replace(/\[URL\]/g,o.websiteUrl||"seu site"),x=x.replace(/\[Seu Nome\]/g,n),x=x.replace(/\[MM\/DD\/YYYY\]/g,g),document.execCommand("insertHTML",!1,x),d&&(d.dispatchEvent(new Event("input",{bubbles:!0})),d.dispatchEvent(new Event("change",{bubbles:!0}))),U("Email preenchido com sucesso!",{duration:2e3}),Me("\u2705 Processo finalizado com sucesso.","success")}else U("Erro ao focar no editor.",{error:!0})}var rn={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},To={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function Fe(e,t,o,n,s,i){let a=document.createElement("div");Object.assign(a.style,rn),xo(e,a);let r=document.createElement("div");Object.assign(r.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),a.appendChild(r),s&&(s.googleLine=r);let d=document.createElement("div");Object.assign(d.style,{display:"flex",alignItems:"center",gap:"12px"});let l=document.createElement("img");l.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(l.style,{width:"20px",height:"20px",pointerEvents:"none"});let p=document.createElement("span");p.textContent=t,d.appendChild(l),d.appendChild(p);let g=document.createElement("div");Object.assign(g.style,{display:"flex",alignItems:"center",gap:"4px"});let x='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',h='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',f=document.createElement("div");f.innerHTML=x,Object.assign(f.style,To),f.title="Sobre & Feedback",f.classList.add("no-drag"),f.onmouseenter=()=>{f.style.background="rgba(255,255,255,0.1)",f.style.color="#FFF"},f.onmouseleave=()=>{f.style.color!=="rgb(138, 180, 248)"&&(f.style.background="transparent",f.style.color="#9AA0A6")};let b=document.createElement("div");b.innerHTML=h,Object.assign(b.style,To),b.title="Fechar",b.classList.add("no-drag"),b.onmouseenter=()=>{b.style.background="rgba(242, 139, 130, 0.2)",b.style.color="#F28B82"},b.onmouseleave=()=>{b.style.background="transparent",b.style.color="#9AA0A6"},b.onmousedown=S=>S.stopPropagation(),f.onmousedown=S=>S.stopPropagation(),b.onclick=i;let T=ln(e,t,o,n);return f.onclick=S=>{S.stopPropagation(),T.style.opacity==="1"?(T.style.opacity="0",T.style.pointerEvents="none",f.style.color="#9AA0A6",f.style.background="transparent"):(T.style.opacity="1",T.style.pointerEvents="auto",f.style.color="#8AB4F8",f.style.background="rgba(138, 180, 248, 0.1)")},g.appendChild(f),g.appendChild(b),a.appendChild(d),a.appendChild(g),a}function ln(e,t,o,n){let s=document.createElement("div");return Object.assign(s.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),s.innerHTML=`
        <div style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${t}</div>
        <div style="color: #5f6368; font-size: 14px; margin-bottom: 24px;">Vers\xE3o ${o}</div>
        
        <div style="color: #3c4043; font-size: 14px; max-width: 90%; line-height: 1.6; margin-bottom: 24px;">
            ${n}
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
    `,setTimeout(()=>{let i=s.querySelector("#cw-feedback-link");i&&(i.onmouseenter=()=>{i.style.backgroundColor="#E8F0FE",i.style.transform="scale(1.02)"},i.onmouseleave=()=>{i.style.backgroundColor="#F8F9FA",i.style.transform="scale(1)"});let a=s.querySelector("#close-help-internal");a&&(a.onmouseover=()=>a.style.backgroundColor="#f8f9fa",a.onmouseout=()=>a.style.backgroundColor="white",a.onclick=()=>{s.style.opacity="0",s.style.pointerEvents="none"})},0),e.appendChild(s),s}if(!document.getElementById("cw-module-styles")){let e=document.createElement("style");e.id="cw-module-styles",e.innerHTML=`
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
    `,document.head.appendChild(e)}function qe(e,t,o){let n=document.getElementById(o);if(!t)return;let s=t.getAttribute("data-moved")==="true",i={x:0,y:0};if(n){let p=n.getBoundingClientRect();i.x=p.left+p.width/2,i.y=p.top+p.height/2}let a,r;if(!s)a=window.innerWidth/2,r=window.innerHeight/2;else{let p=t.getBoundingClientRect();a=p.left+p.width/2,r=p.top+p.height/2,a===0&&r===0&&(a=window.innerWidth/2,r=window.innerHeight/2)}let d=i.x-a,l=i.y-r;e?(W.playGenieOpen(),t.style.transition="none",t.style.opacity="0",t.style.pointerEvents="auto",s?t.style.transform=`translate(${d}px, ${l}px) scale(0.05)`:t.style.transform=`translate(calc(-50% + ${d}px), calc(-50% + ${l}px)) scale(0.05)`,t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("open"),n&&n.classList.add("active"),t.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",t.style.opacity="1",s?t.style.transform="translate(0, 0) scale(1)":t.style.transform="translate(-50%, -50%) scale(1)"}),typeof ko=="function"&&ko(t,o)):(W.playSwoosh(),t.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",t.style.pointerEvents="none",requestAnimationFrame(()=>{t.style.opacity="0",s?t.style.transform=`translate(${d}px, ${l}px) scale(0.1)`:t.style.transform=`translate(calc(-50% + ${d}px), calc(-50% + ${l}px)) scale(0.1)`}),setTimeout(()=>{t.classList.remove("open"),n&&n.classList.remove("active"),t.style.transition="",t.style.transform=""},300),typeof Yt=="function"&&Yt(t))}function ko(e,t){Yt(e);let o=n=>{if(!e.classList.contains("open"))return;let s=e.contains(n.target),i=document.querySelector(".cw-pill"),a=i&&i.contains(n.target);s?(e.classList.remove("idle"),e.style.zIndex="2147483648"):a||(e.classList.add("idle"),e.style.zIndex="2147483646")};e._idleHandler=o,document.addEventListener("mousedown",o)}function Yt(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}var cn="https://script.google.com/a/macros/google.com/s/AKfycbwUfiKDvybLzt18mWoQJvkXqsRGQYqZ4JXzF8bLHMsxtYzlFPehz-ehoWs6215Wj6uFLA/exec",Xt="cw_data_broadcast",Oo="cw_data_tips",dn=["Processando...","Mantenha o foco!","Aguarde..."];function ft(e,t={}){return new Promise((o,n)=>{let s="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script");window[s]=d=>{document.body.contains(i)&&document.body.removeChild(i),delete window[s],o(d)};let a=Object.keys(t).map(d=>encodeURIComponent(d)+"="+encodeURIComponent(t[d])).join("&"),r=`${cn}?op=${e}&callback=${s}&t=${Date.now()}&${a}`;i.src=r,i.onerror=()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[s],n(new Error("JSONP Error (Check Corp Login)"))},document.body.appendChild(i)})}var xe={fetchTips:async()=>{try{let e=await ft("tips");e?.tips&&localStorage.setItem(Oo,JSON.stringify(e.tips))}catch(e){console.warn("Tips offline",e)}},fetchData:async()=>{try{let e=await ft("broadcast");if(e?.broadcast)return localStorage.setItem(Xt,JSON.stringify(e.broadcast)),e}catch(e){console.warn("Broadcast offline",e)}return{broadcast:JSON.parse(localStorage.getItem(Xt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(Xt)||"[]"),getRandomTip:()=>{let e=dn,t=localStorage.getItem(Oo);if(t)try{e=JSON.parse(t)}catch{}return e[Math.floor(Math.random()*e.length)]},sendBroadcast:async e=>{let t={...e,date:new Date().toISOString(),id:Date.now().toString()};return await xe._performOp("new_broadcast",t)},updateBroadcast:async(e,t)=>{let o={id:e,...t};return await xe._performOp("update_broadcast",o)},deleteBroadcast:async e=>await xe._performOp("delete_broadcast",{id:e}),_performOp:async(e,t)=>{try{console.log(`\u{1F4E4} Executando ${e}...`,t);let o=await ft(e,t);return o&&o.status==="success"?(console.log("\u2705 Sucesso:",e),!0):(console.warn("\u26A0\uFE0F Falha:",o),!1)}catch(o){return console.error("\u274C Erro JSONP:",o),!1}},logEvent:(e,t,o="",n=null)=>{try{let s="anon";try{let a=Ue();a&&(s=a.split("@")[0].toLowerCase())}catch{}let i={timestamp:new Date().toISOString(),user:s,version:"v5.1",category:e,action:t,label:o,value:n||""};ft("log",i).catch(a=>{})}catch(s){console.warn("Analytics error",s)}},logUsage:()=>{},getUserSnippets:async e=>{try{return await ft("get_user_snippets",{user:e})}catch(t){return console.warn("Erro ao buscar snippets:",t),null}},saveSnippet:async(e,t)=>{let o={...e,user:t};return await xe._performOp("save_snippet",o)},deleteSnippet:async(e,t)=>await xe._performOp("delete_snippet",{id:e,user:t})};var ue={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",pink:"#F48FB1"},Ft=e=>new Promise(t=>setTimeout(t,e));function Io(e){let t="cw-command-center-style";if(!document.getElementById(t)){let b=document.createElement("style");b.id=t,b.innerHTML=`
            @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@500&display=swap');

            .cw-focus-backdrop {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px);
                z-index: 2147483646; opacity: 0; pointer-events: none;
                transition: opacity 0.4s ease;
            }
            .cw-focus-backdrop.active { opacity: 1; pointer-events: auto; }

            /* --- PILL PRINCIPAL --- */
            .cw-pill {
                position: fixed; top: 30%; right: 24px;
                display: flex; flex-direction: column; align-items: center; gap: 12px;
                padding: 16px 8px;
                
                background: ${ue.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${ue.glassBorder}; border-radius: 50px;
                box-shadow: 0 12px 32px rgba(0,0,0,0.25); z-index: 2147483647;
                
                opacity: 0; 
                min-width: 50px; 
                
                overflow: visible;

                /* ABRIR: A p\xEDlula expande (0.5s) */
                transition: 
                    width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s, 
                    height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s,
                    padding 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s,
                    gap 0.5s ease 0s,
                    border-radius 0.5s ease 0s,
                    opacity 0.3s ease 0s,
                    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s;
            }
            .cw-pill.docked { opacity: 1; transform: translateX(0) scale(1); }

            /* --- ESTADO COLAPSADO (FECHANDO) --- */
            .cw-pill.collapsed {
                width: 50px !important; 
                height: 50px !important;
                padding: 0 !important;
                gap: 0 !important;
                border-radius: 50% !important;
                cursor: pointer;
                
                overflow: hidden !important; 

                /* FECHAR: Delay de 0.3s */
                transition: 
                    width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s,
                    height 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s,
                    padding 0.5s ease 0.3s,
                    gap 0.5s ease 0.3s,
                    border-radius 0.5s ease 0.3s,
                    opacity 0.3s ease 0s,
                    transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s !important;
            }
            
            /* --- LOGO DA BOLINHA --- */
            .cw-main-logo {
                position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                display: flex; align-items: center; justify-content: center;
                pointer-events: none; 
                opacity: 0;
                transform: rotate(-180deg) scale(0.5);
                color: #fff;
                transition: opacity 0.05s linear 0s, transform 0.2s ease 0s;
            }
            .cw-main-logo svg { fill: #fff; width: 24px; height: 24px; transition: fill 0.3s; }
            
            .cw-pill.collapsed .cw-main-logo { 
                opacity: 1; 
                transform: rotate(0) scale(1);
                transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s;
            }
            .cw-pill.collapsed:hover .cw-main-logo {
                background-image: linear-gradient(135deg, #4285F4 0%, #EA4335 33%, #FBBC05 66%, #34A853 100%);
                -webkit-mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13 2L3 14h9l-1 8 10-12h-9l1-8z'/%3E%3C/svg%3E") center/24px no-repeat;
                mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13 2L3 14h9l-1 8 10-12h-9l1-8z'/%3E%3C/svg%3E") center/24px no-repeat;
                transform: scale(1.15) rotate(0deg);
                transition-delay: 0s;
            }
            .cw-pill.collapsed:hover .cw-main-logo svg { fill: transparent; }

            /* --- CONTE\xDADO INTERNO --- */
            .cw-pill > *:not(.cw-main-logo) {
                opacity: 1; transform: scale(1); visibility: visible;
                transition: opacity 0.4s ease 0.3s, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s, visibility 0s linear 0.3s;
            }
            .cw-pill.collapsed > *:not(.cw-main-logo) {
                opacity: 0; pointer-events: none; visibility: hidden;
                transform: scale(1.3); filter: blur(5px);
                transition: opacity 0.2s ease 0s, transform 0.2s ease 0s, filter 0.2s ease 0s, visibility 0s linear 0.2s; 
            }

            /* --- CASCATAS DE ENTRADA (Ajustado para +1 bot\xE3o) --- */
            .cw-pill:not(.collapsed) > *:nth-child(1) { transition-delay: 0.30s; } /* Logo */
            .cw-pill:not(.collapsed) > *:nth-child(2) { transition-delay: 0.34s; } /* Grip */
            .cw-pill:not(.collapsed) > *:nth-child(3) { transition-delay: 0.38s; } /* Notes */
            .cw-pill:not(.collapsed) > *:nth-child(4) { transition-delay: 0.42s; } /* Email */
            .cw-pill:not(.collapsed) > *:nth-child(5) { transition-delay: 0.46s; } /* Script */
            .cw-pill:not(.collapsed) > *:nth-child(6) { transition-delay: 0.50s; } /* Links */
            .cw-pill:not(.collapsed) > *:nth-child(7) { transition-delay: 0.54s; } /* Library (NOVO) */
            .cw-pill:not(.collapsed) > *:nth-child(8) { transition-delay: 0.58s; } /* Timezone */
            .cw-pill:not(.collapsed) > *:nth-child(9) { transition-delay: 0.62s; } /* Sep */
            .cw-pill:not(.collapsed) > *:nth-child(10) { transition-delay: 0.66s; } /* Broadcast */

            /* --- ESTILOS DOS BOT\xD5ES --- */
            .cw-btn {
                width: 40px; height: 40px; 
                border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center; 
                cursor: pointer; position: relative; color: ${ue.iconIdle};
                flex-shrink: 0;
            }
            .cw-btn:hover { background: ${ue.glassHighlight}; color: ${ue.iconActive}; transform: scale(1.1) !important; }

            .cw-btn.notes.active { color: ${ue.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${ue.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${ue.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${ue.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.library.active { color: ${ue.pink} !important; background: rgba(244, 143, 177, 0.15); } /* [NOVO] */
            .cw-btn.broadcast.active { color: ${ue.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${ue.teal} !important; background: rgba(0, 191, 165, 0.15); }

            .cw-btn.notes:hover { color: ${ue.blue}; filter: drop-shadow(0 0 5px rgba(138, 180, 248, 0.5)); }
            .cw-btn.email:hover { color: ${ue.red}; filter: drop-shadow(0 0 5px rgba(242, 139, 130, 0.5)); }
            .cw-btn.script:hover { color: ${ue.purple}; filter: drop-shadow(0 0 5px rgba(197, 138, 249, 0.5)); }
            .cw-btn.links:hover { color: ${ue.green}; filter: drop-shadow(0 0 5px rgba(129, 201, 149, 0.5)); }
            .cw-btn.library:hover { color: ${ue.pink}; filter: drop-shadow(0 0 5px rgba(244, 143, 177, 0.5)); } /* [NOVO] */
            .cw-btn.broadcast:hover { color: ${ue.orange}; filter: drop-shadow(0 0 5px rgba(249, 171, 0, 0.5)); }
            .cw-btn.timezone:hover { color: ${ue.teal}; filter: drop-shadow(0 0 5px rgba(0, 191, 165, 0.5)); }

            .cw-btn::before {
                content: ''; position: absolute; bottom: 2px; left: 50%; width: 4px; height: 4px; border-radius: 50%;
                background-color: currentColor; box-shadow: 0 0 6px currentColor;
                transform: translateX(-50%) scale(0); opacity: 0; visibility: hidden;
                transition: transform 0.3s, opacity 0.2s; pointer-events: none;
            }
            .cw-btn.active::before { transform: translateX(-50%) scale(1); opacity: 1; visibility: visible; }
            
            .cw-btn svg { width: 22px; height: 22px; fill: currentColor; pointer-events: none; }

            .cw-btn::after { 
                content: attr(data-label); position: absolute; top: 50%; transform: translateY(-50%) scale(0.9); 
                padding: 6px 12px; border-radius: 6px; background: #202124; color: #fff; 
                font-family: 'Google Sans', sans-serif; font-size: 12px; font-weight: 500; 
                opacity: 0; visibility: hidden; pointer-events: none; 
                transition: all 0.2s; box-shadow: 0 4px 12px rgba(0,0,0,0.3); white-space: nowrap; 
                border: 1px solid rgba(255,255,255,0.15); z-index: 2147483648; 
            }
            .cw-btn:hover::after { opacity: 1; visibility: visible; transform: translateY(-50%) scale(1); }
            .cw-pill.side-right .cw-btn::after { right: 55px; transform-origin: right center; }
            .cw-pill.side-left .cw-btn::after { left: 55px; transform-origin: left center; }

            .cw-badge { position: absolute; top: 8px; right: 8px; width: 8px; height: 8px; background: #d93025; border-radius: 50%; border: 1px solid #fff; pointer-events: none; box-shadow: 0 1px 2px rgba(0,0,0,0.2); z-index: 10; animation: popIn 0.3s; }
            @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }

            .cw-sep { width: 20px; height: 1px; background: rgba(255,255,255,0.2); margin: 4px 0; }
            .cw-sep.visible { opacity: 1; }
            .cw-pill.collapsed .cw-sep { opacity: 0; transition: opacity 0.1s ease 0s; }

            .cw-grip { width: 100%; height: 24px; display: flex; align-items: center; justify-content: center; cursor: grab; margin-bottom: 2px; }
            .cw-grip-bar { width: 24px; height: 4px; background-color: ${ue.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            .cw-pill.dragging .cw-grip-bar { background-color: ${ue.blue}; width: 16px; opacity: 1; }

            /* ============================================================
               PROCESSING CENTER
               ============================================================ */
            .cw-pill.processing-center {
                top: 50% !important; left: 50% !important;
                transform: translate(-50%, -50%) !important;
                width: 340px !important; 
                height: auto !important; 
                min-height: 160px !important; 
                border-radius: 24px !important; 
                background: #202124 !important; 
                padding: 32px 24px !important; 
                box-shadow: 0 24px 64px rgba(0,0,0,0.6) !important; 
                display: flex !important; flex-direction: column !important; 
                justify-content: center !important; align-items: center !important;
                gap: 0 !important;
                z-index: 2147483647 !important;
            }
            .cw-pill.processing-center.collapsed { background: #202124 !important; overflow: visible !important; }
            .cw-pill.processing-center .cw-main-logo { display: none !important; }
            .cw-pill.processing-center > *:not(.cw-center-stage) { display: none !important; }
            
            .cw-center-stage { 
                display: flex; flex-direction: column; align-items: center; 
                gap: 20px;
                width: 100%; opacity: 0; 
                animation: fadeIn 0.4s ease forwards 0.1s; 
                position: relative; 
            }
            
            .cw-center-dots { display: flex; gap: 8px; margin-bottom: 4px; }
            .cw-center-dots span { width: 8px; height: 8px; border-radius: 50%; animation: googleBounce 1.4s infinite ease-in-out both; }
            .cw-center-dots span:nth-child(1) { background-color: ${ue.blue}; animation-delay: -0.32s; }
            .cw-center-dots span:nth-child(2) { background-color: ${ue.red}; animation-delay: -0.16s; }
            .cw-center-dots span:nth-child(3) { background-color: ${ue.green}; }
            
            .cw-center-text { 
                font-family: 'Google Sans', Roboto, sans-serif;
                font-size: 15px;
                color: #E8EAED;
                text-align: center; 
                max-width: 100%; 
                font-weight: 500; 
                line-height: 1.5; 
                letter-spacing: 0.2px;
                opacity: 0; 
                transform: translateY(10px); 
                animation: textSlideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; 
                animation-delay: 0.2s; 
            }

            .cw-dot-dirty {
                position: absolute; top: 8px; right: 8px;
                width: 6px; height: 6px;
                background-color: #F9AB00;
                border-radius: 50%;
                border: 1px solid #3c4043;
                pointer-events: none;
                z-index: 11;
                animation: popIn 0.3s;
            }
            
            .cw-center-success { display: none; color: ${ue.green}; margin-bottom: 10px; }
            .cw-center-success svg { width: 48px; height: 48px; }
            .cw-center-success.show { display: block; animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            
            .cw-abort-btn { 
                position: relative; 
                bottom: auto; margin-top: 8px; 
                font-size: 12px; color: #9AA0A6; 
                cursor: pointer; text-transform: uppercase; letter-spacing: 0.8px; font-weight: 700; 
                padding: 8px 16px; border-radius: 20px; 
                background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
                transition: all 0.2s ease; user-select: none; 
                display: flex; align-items: center; gap: 6px;
            }
            .cw-abort-btn:hover { 
                color: #F28B82; background: rgba(242, 139, 130, 0.1); border-color: rgba(242, 139, 130, 0.3);
                transform: translateY(-1px);
            }
            .cw-abort-btn:active { transform: scale(0.95); }

            @keyframes fadeIn { to { opacity: 1; } }
            @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            @keyframes googleBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
            @keyframes textSlideUp { to { opacity: 1; transform: translateY(0); } }
        `,document.head.appendChild(b)}let o={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',library:'<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>'},n=document.createElement("div");n.className="cw-pill side-right collapsed",n.innerHTML=`
        <div class="cw-main-logo">${o.main}</div>

        <div class="cw-grip" title="Arrastar">
            <div class="cw-grip-bar"></div>
        </div>
        <button class="cw-btn notes" id="cw-btn-notes" data-label="Case Notes">${o.notes}</button>
        <button class="cw-btn email" id="cw-btn-email" data-label="Quick Email">${o.email}</button>
        <button class="cw-btn script" id="cw-btn-script" data-label="Call Script">${o.script}</button>
        <button class="cw-btn links" id="cw-btn-links" data-label="Links">${o.links}</button>
        <button class="cw-btn library" id="cw-btn-library" data-label="My Library">${o.library}</button> <button class="cw-btn timezone" id="cw-btn-timezone" data-label="Time Zones">${o.timezone}</button>
        <div class="cw-sep"></div>
        <button class="cw-btn broadcast" id="cw-btn-broadcast" data-label="Avisos">${o.broadcast}</button>
        <div class="cw-status-container">
            <div class="cw-dots" id="cw-loader"><span></span><span></span><span></span></div>
            <div class="cw-check" id="cw-success" style="display:none;">${o.check}</div>
        </div>
    `;let s=document.createElement("div");s.className="cw-focus-backdrop",document.body.appendChild(s),document.body.appendChild(n);let i=(b,T)=>{let S=n.querySelector(`.${b}`);n.querySelectorAll(".cw-btn").forEach($=>{$!==S&&$.classList.remove("active")}),S.classList.toggle("active"),T()};if(n.querySelector(".notes").onclick=b=>{b.stopPropagation(),i("notes",e.toggleNotes)},n.querySelector(".email").onclick=b=>{b.stopPropagation(),i("email",e.toggleEmail)},n.querySelector(".script").onclick=b=>{b.stopPropagation(),i("script",e.toggleScript)},n.querySelector(".links").onclick=b=>{b.stopPropagation(),i("links",e.toggleLinks)},n.querySelector(".library").onclick=b=>{b.stopPropagation(),i("library",e.toggleLibrary)},n.querySelector(".timezone").onclick=b=>{b.stopPropagation(),i("timezone",e.toggleTimezone)},n.querySelector(".broadcast").onclick=b=>{b.stopPropagation(),i("broadcast",()=>{let T=b.currentTarget.querySelector(".cw-badge");T&&T.remove(),e.broadcastControl&&e.broadcastControl.toggle()})},e.broadcastControl&&e.broadcastControl.hasUnread){let b=document.createElement("div");b.className="cw-badge",n.querySelector(".broadcast").appendChild(b)}let a=null;n.onmouseleave=()=>{n.querySelector(".cw-btn.active")||n.classList.contains("processing-center")||(a=setTimeout(()=>{n.classList.add("collapsed")},3e3))},n.onmouseenter=()=>{a&&clearTimeout(a)},(async function(){await Ft(2800),n.classList.add("docked"),await Ft(300);let T=n.querySelectorAll(".cw-btn");n.querySelectorAll(".cw-sep").forEach(S=>S.classList.add("visible"));for(let S=0;S<T.length;S++)T[S].classList.add("popped"),await Ft(90);await Ft(200),n.classList.add("system-check")})();let r=!1,d,l,p,g,x=3;n.onmousedown=b=>{if(b.target.closest("button"))return;b.preventDefault(),d=b.clientX,l=b.clientY;let T=n.getBoundingClientRect();p=T.left,g=T.top,document.addEventListener("mousemove",h),document.addEventListener("mouseup",f)};function h(b){let T=b.clientX-d,S=b.clientY-l;!r&&Math.sqrt(T*T+S*S)>x&&(r=!0,n.style.transition="none",a&&clearTimeout(a)),r&&(n.style.left=`${p+T}px`,n.style.top=`${g+S}px`,n.style.right="auto",n.style.bottom="auto",n.style.transform="none")}function f(b){if(document.removeEventListener("mousemove",h),document.removeEventListener("mouseup",f),r){r=!1;let T=window.innerWidth,S=window.innerHeight,$=n.getBoundingClientRect(),H=$.left+$.width/2,B;H<T/2?(B=24,n.classList.remove("side-right"),n.classList.add("side-left")):(B=T-$.width-24,n.classList.remove("side-left"),n.classList.add("side-right"));let C=Math.max(24,Math.min($.top,S-$.height-24));setTimeout(()=>{n.style.setProperty("transition","left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)","important"),n.style.left=`${B}px`,n.style.top=`${C}px`,n.style.bottom="auto",n.style.transform=""},10),setTimeout(()=>{n.style.transition="",n.style.removeProperty("transition")},700)}else{let T=n.querySelector(".cw-btn.active"),S=b.target.closest("button");if(n.classList.contains("collapsed")){let $=n.getBoundingClientRect(),H=window.innerHeight,B=$.top>H/2;if(n.style.setProperty("transition","none","important"),B){let C=H-$.bottom;n.style.top="auto",n.style.bottom=`${C}px`}else n.style.bottom="auto",n.style.top=`${$.top}px`;n.offsetWidth,n.style.removeProperty("transition"),n.classList.remove("collapsed")}else!T&&!S&&n.classList.add("collapsed");S&&(S.style.transform="scale(0.9)",setTimeout(()=>S.style.transform="",150))}}}function qt(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop");if(!e)return()=>{};e.classList.remove("collapsed"),window._CW_ABORT_PROCESS=!1;let o=document.createElement("div");o.className="cw-center-stage",o.innerHTML=`
      <div class="cw-center-dots"><span></span><span></span><span></span></div>
      <div class="cw-center-text">${xe.getRandomTip()}</div>
      <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
  `;let n=document.createElement("div");n.className="cw-abort-btn",n.textContent="Cancelar",n.onclick=i=>{i.stopPropagation(),window._CW_ABORT_PROCESS=!0,U("Cancelado!",{duration:3e3}),o.remove(),e.classList.remove("processing-center"),e.classList.remove("success"),e.classList.add("collapsed"),t&&t.classList.remove("active")},o.appendChild(n),e.appendChild(o);let s=Date.now();return e.classList.add("processing-center"),t&&t.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!e.contains(o))return;let a=Date.now()-s,r=Math.max(0,2e3-a);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!e.contains(o))return;let d=o.querySelector(".cw-center-dots"),l=o.querySelector(".cw-center-text"),p=o.querySelector(".cw-center-success"),g=o.querySelector(".cw-abort-btn");d&&(d.style.display="none"),l&&(l.style.display="none"),g&&(g.style.display="none"),p&&p.classList.add("show"),e.classList.add("success"),setTimeout(()=>{e.classList.remove("processing-center"),setTimeout(()=>{o.remove(),e.classList.remove("success"),e.classList.add("collapsed"),t&&t.classList.remove("active")},400)},1e3)},r)}}function Fo(e,t={}){let o=document.createElement("div");o.className="cw-step-scenarios";let n=document.createElement("div");Object.assign(n.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let s=document.createElement("div");Object.assign(s.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"40px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s ease"}),s.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>";let i=null,a={...$e,...t};Object.entries(a).forEach(([d,l])=>{let p=document.createElement("div");p.textContent=d,Object.assign(p.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",display:"flex",alignItems:"center",gap:"6px"}),p.onmouseenter=()=>{i!==l&&(s.style.background="#fff",s.style.borderColor="#1a73e8",s.style.color="#202124",s.textContent=`"${l.substring(0,120)}${l.length>120?"...":""}"`),i!==l&&(p.style.background="#f1f3f4")},p.onmouseleave=()=>{i!==l&&(i||(s.style.background="#f8f9fa",s.style.borderColor="#dadce0",s.style.color="#5f6368",s.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>"),p.style.background="#ffffff")},p.onclick=()=>{W.playClick(),i===l?(i=null,r(),e("")):(i=l,r(),p.style.transform="scale(0.95)",setTimeout(()=>p.style.transform="scale(1)",150),e(l))},n.appendChild(p)});function r(){Array.from(n.children).forEach(d=>{a[d.textContent]===i?(d.style.background="#e8f0fe",d.style.borderColor="#1a73e8",d.style.color="#1967d2",d.style.fontWeight="500"):(d.style.background="#ffffff",d.style.borderColor="#dadce0",d.style.color="#3c4043",d.style.fontWeight="400")})}return o.appendChild(n),o.appendChild(s),o}var qo=e=>new Promise(t=>setTimeout(t,e));function Lt(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>e.dispatchEvent(new MouseEvent(o,t)))}function xt(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let o=document.createRange();o.selectNodeContents(t);let n=window.getSelection();n.removeAllRanges(),n.addRange(o);try{document.execCommand("copy")}catch{U("Falha ao copiar",{error:!0})}n.removeAllRanges(),document.body.removeChild(t)}function Mt(e){["input","change","keydown","keyup"].forEach(o=>{let n=new Event(o,{bubbles:!0,cancelable:!0});e.dispatchEvent(n)})}function Lo(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function Nt(){console.log("Iniciando processo de Nova Nota...");let e=Lo(),t=e.length,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(a=>a.innerText.trim()==="description");if(n){let a=n.closest("material-fab")||n.closest("material-button");a?(a.style&&(a.style.display="block",a.style.visibility="visible"),Lt(a)):Lt(n)}else{let a=document.querySelector("material-fab-speed-dial");if(a){let r=a.querySelector(".trigger");r?(r.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),Lt(r)):a.click(),await qo(800);let l=Array.from(document.querySelectorAll("i.material-icons-extended")).find(p=>p.innerText.trim()==="description");l&&Lt(l)}}let s=null,i=0;for(;!s&&i<20;){await qo(300);let a=Lo();if(a.length>t)s=a.find(r=>!e.includes(r)),s||(s=a[a.length-1]);else if(i>10){let r=a.filter(d=>d.offsetParent!==null);r.length>0&&(s=r[r.length-1])}i++}return s}var ie={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},ze="cubic-bezier(0.25, 0.8, 0.25, 1)",pn={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${ie.border}`,backgroundColor:ie.bgInput,fontSize:"14px",color:ie.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${ze}, box-shadow 0.2s ${ze}, background-color 0.2s`,outline:"none"},Xn={...pn,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},Kn={fontSize:"13px",fontWeight:"700",color:ie.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},Jn={display:"block",fontSize:"13px",fontWeight:"600",color:ie.text,marginBottom:"8px",marginTop:"16px"},Qn={fontSize:"12px",color:ie.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},Zn={fontSize:"12px",color:ie.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},ea={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:ie.text,cursor:"pointer",padding:"12px 14px",backgroundColor:ie.surface,border:`1px solid ${ie.border}`,borderRadius:"12px",transition:`all 0.2s ${ze}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},Kt={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:ie.primary},ta={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:ie.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${ze}, box-shadow 0.2s ${ze}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},oa={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${ie.primary}`,color:ie.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${ze}`},na={background:"transparent",border:`1px solid ${ie.border}`,borderRadius:"20px",color:ie.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${ze}`,fontFamily:"'Google Sans', 'Roboto'"};var aa={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:ie.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},ia={fontSize:"13px",fontWeight:"700",color:ie.primary,minWidth:"20px",textAlign:"center"},sa={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${ie.border}`,backgroundColor:ie.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${ze}, box-shadow 0.2s ${ze}`},ra={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${ie.bgInput}`},la={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${ie.border}`,backgroundColor:ie.surface,color:ie.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${ze}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},ca={backgroundColor:ie.primaryBg,color:ie.primary,borderColor:ie.primary,fontWeight:"600"},da={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:ie.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},pa={borderTop:`1px solid ${ie.bgInput}`,paddingTop:"20px",marginTop:"16px"};var ua={maxHeight:"240px",overflowY:"auto",border:`1px solid ${ie.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:ie.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},ma={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${ie.bgInput}`,cursor:"pointer",fontSize:"13px",color:ie.text,transition:"background 0.1s",userSelect:"none"};var un={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},mn={fontSize:"12px",color:"#e37400",marginTop:"4px"},gn={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},bn={display:"flex",gap:"15px",marginBottom:"10px"};function Mo(){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,un);let t=document.createElement("label");t.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(t.style,$t,{marginTop:"0"});let o=document.createElement("div");Object.assign(o.style,bn);let n=document.createElement("input");n.type="radio",n.name="ts_usage_mod",n.value="Sim",Object.assign(n.style,Kt);let s=document.createElement("label");s.textContent="Sim";let i=document.createElement("div");Object.assign(i.style,{display:"flex",alignItems:"center"}),i.appendChild(n),i.appendChild(s);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="N\xE3o",a.checked=!0,Object.assign(a.style,Kt);let r=document.createElement("label");r.textContent="N\xE3o";let d=document.createElement("div");Object.assign(d.style,{display:"flex",alignItems:"center"}),d.appendChild(a),d.appendChild(r),o.appendChild(i),o.appendChild(d);let l=document.createElement("div");l.style.display="block";let p=document.createElement("label");p.textContent="Qual foi o Motivo?",Object.assign(p.style,$t,{fontSize:"12px"});let g=document.createElement("input");g.type="text",Object.assign(g.style,gn);let x=document.createElement("div");x.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(x.style,mn),l.appendChild(p),l.appendChild(g),l.appendChild(x),e.appendChild(t),e.appendChild(o),e.appendChild(l),n.onchange=()=>{l.style.display="none"},a.onchange=()=>{l.style.display="block"};function h(T,S){if(e.style.display="none",!T||T.includes("Education")||!S||S.length===0)return;let $=S.some(O=>O.includes("enhanced")||O==="ec_google_ads"),H=S.some(O=>(O.includes("conversion")||O.includes("ads"))&&!O.includes("enhanced")),B=S.some(O=>O.includes("ga4")||O.includes("analytics")||O.includes("ua")),C=S.some(O=>O.includes("merchant")||O.includes("gmc")||O.includes("shopping"));($||H&&!B&&!C)&&(e.style.display="block")}function f(){if(e.style.display==="none")return"";let T=`<br><b>Utilizou Tag Support?</b> ${n.checked?"Sim":"N\xE3o"}`;return a.checked&&g.value.trim()!==""&&(T+=`<br><b>Motivo:</b> ${g.value}`),T+="<br>",T}function b(){e.style.display="none",a.checked=!0,n.checked=!1,l.style.display="block",g.value=""}return{element:e,updateVisibility:h,getOutput:f,reset:b}}var te={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},nt={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function No(e){let t={},o="implementation";function n(C){let E=C.toLowerCase();return E.includes("ads")||E.includes("conversion")||E.includes("remarketing")?te.brands.ads:E.includes("ga4")||E.includes("analytics")?te.brands.ga4:E.includes("gtm")||E.includes("tag manager")||E.includes("container")?te.brands.gtm:E.includes("merchant")||E.includes("shopping")||E.includes("feed")?te.brands.gmc:te.brands.default}let s=Object.entries(Re).filter(([C,E])=>E.popular),i={};Object.entries(Re).forEach(([C,E])=>{if(E.popular)return;let O=n(E.name);i[O.label]||(i[O.label]={brand:O,tasks:[]}),i[O.label].tasks.push({key:C,...E})});let a="cw-zen-tasks";if(!document.getElementById(a)){let C=document.createElement("style");C.id=a,C.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column; height: 100%; width: calc(100% + 32px); margin: -16px;
                font-family: ${te.font}; background: ${te.bg}; position: relative; overflow: hidden;
            }
            
            /* SCROLL AREA */
            .cw-zen-content { flex: 1; overflow-y: auto; padding-bottom: 80px; } /* Espa\xE7o para o Status Bar */

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${te.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${te.white}; 
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
                font-size: 12px; font-weight: 500; color: ${te.textMain}; line-height: 1.2; 
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
                color: ${te.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${te.border}; border-radius: 10px; background: ${te.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${te.blue}; box-shadow: 0 0 0 3px ${te.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${te.border}; border-radius: 10px; background: ${te.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${te.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${te.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${te.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${te.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${te.blueLight}; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${te.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${te.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${te.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${te.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${te.border};
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${te.shadowFloat}; z-index: 10;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${te.textMain}; }
            
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
                font-family: ${te.font}; font-size: 15px; font-weight: 600; color: ${te.textMain};
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
                border-color: ${te.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${te.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${te.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${te.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 10px; font-weight: 700; color: ${te.textSub};
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
        `,document.head.appendChild(C)}let r=document.createElement("div");r.className="cw-zen-container";let d=document.createElement("div");Object.assign(d.style,{display:"none"});let l=document.createElement("div");l.className="cw-screens-container",d.appendChild(l),r.innerHTML=`
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
    `;let p=r.querySelector(".cw-hero-grid"),g=r.querySelector(".cw-acc-container"),x=r.querySelector(".cw-results-container"),h=r.querySelector(".cw-search-input"),f=r.querySelector(".cw-status-bar"),b=r.querySelector(".cw-status-text"),T=r.querySelector(".cw-footer-icons");s.forEach(([C,E])=>{let O=n(E.name),M=document.createElement("div");M.className="cw-hero-card",M.id=`hero-${C}`,M.style.setProperty("--hero-color",O.color),M.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${nt[O.icon]}</div>
                <div class="cw-hero-label">${E.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,M.onclick=N=>{if(N.target.closest(".cw-step-btn"))return;let D=t[C]?t[C].count:0;$(C,D>0?-D:1,E)},M.querySelector(".minus").onclick=()=>$(C,-1,E),M.querySelector(".plus").onclick=()=>$(C,1,E),M.dataset.color=O.color,p.appendChild(M)});function S(C,E){let O=n(E.name),M=document.createElement("div");return M.className="cw-task-item",M.dataset.id=C,M.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${O.bg}; color:${O.color}">
                    ${nt[O.icon]||nt.default}
                </div>
                <div class="cw-task-label">${E.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,M.onclick=N=>{if(N.target.closest(".cw-step-btn"))return;let D=t[C]?t[C].count:0;$(C,D>0?-D:1,E)},M.querySelector(".minus").onclick=()=>$(C,-1,E),M.querySelector(".plus").onclick=()=>$(C,1,E),M}Object.entries(i).forEach(([C,E])=>{let O=document.createElement("div");O.className="cw-acc-group";let M=document.createElement("div");M.className="cw-acc-header",M.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${E.brand.color}"></div>
                ${C}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,M.onclick=()=>{g.querySelectorAll(".cw-acc-group.open").forEach(D=>{D!==O&&D.classList.remove("open")}),O.classList.toggle("open")};let N=document.createElement("div");N.className="cw-acc-body",E.tasks.forEach(D=>{let R=S(D.key,D);N.appendChild(R)}),O.appendChild(M),O.appendChild(N),g.appendChild(O)});function $(C,E,O){t[C]||(t[C]={count:0,data:O,brand:n(O.name)}),t[C].count+=E,t[C].count<=0&&delete t[C],H(),B(),e&&e()}function H(){s.forEach(([N])=>{let D=p.querySelector(`#hero-${N}`);if(!D)return;let R=t[N];R?(D.classList.add("active"),D.querySelector(".cw-step-val").textContent=R.count,D.querySelector(".cw-step-val").style.color=D.dataset.color):D.classList.remove("active")}),r.querySelectorAll(".cw-task-item").forEach(N=>{let D=N.dataset.id,R=t[D];R?(N.classList.add("selected"),N.querySelector(".cw-step-val").textContent=R.count):N.classList.remove("selected")});let E=Object.keys(t),O=0,M=[];if(E.forEach(N=>{let D=t[N];O+=D.count;for(let R=0;R<D.count;R++)M.length<6&&M.push(D.brand)}),O>0){f.classList.add("visible");let N=O>1?"A\xE7\xF5es":"A\xE7\xE3o",D=O>1?"definidas":"definida";b.textContent=`${O} ${N} ${D}`,T.innerHTML="",M.forEach(R=>{let G=document.createElement("div");G.className="cw-mini-icon",G.innerHTML=nt[R.icon]||nt.default;let w=G.querySelector("svg");w&&(w.style.width="14px",w.style.height="14px"),T.appendChild(G)})}else f.classList.remove("visible")}h.addEventListener("input",C=>{let E=C.target.value.toLowerCase();if(E.length>0){g.style.display="none",x.style.display="block",x.innerHTML="";let O=!1;Object.entries(Re).forEach(([M,N])=>{if(N.name.toLowerCase().includes(E)){O=!0;let D=S(M,N);t[M]&&(D.classList.add("selected"),D.querySelector(".cw-step-val").textContent=t[M].count),x.appendChild(D)}}),O||(x.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else g.style.display="block",x.style.display="none"});function B(){l.innerHTML="";let C=Object.keys(t),E=!1,O=document.getElementById("sub-status"),M="implementation";if(O&&O.value.toLowerCase().includes("education")&&(M="education"),C.length===0){l.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}if(C.length===0){l.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}let N=document.createElement("div");N.className="cw-info-banner",N.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Todos os Screenshots s\xE3o baseados na descri\xE7\xE3o do 
                <a href="https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/" target="_blank" class="cw-info-link">Win Criteria</a>.
            </span>
        `,l.appendChild(N),C.forEach(D=>{let R=t[D].data,G=t[D].count,w=t[D].brand,q=R.screenshots?R.screenshots[M]||[]:["Link da Evid\xEAncia"];if(q.length>0){E=!0;for(let u=1;u<=G;u++){let v=document.createElement("div");v.className="cw-screen-card",v.style.setProperty("--brand-color",w.color),v.style.setProperty("--brand-bg",w.bg),v.style.setProperty("--brand-shadow",w.color+"40");let c=document.createElement("div");c.className="cw-card-header";let y=document.createElement("div");y.className="cw-card-icon",y.innerHTML=nt[w.icon]||nt.default;let A=document.createElement("div");A.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let k=document.createElement("input");k.className="cw-card-title-input",k.id=`name-${D}-${u}`,k.value=`${R.name}${G>1?" #"+u:""}`,k.title="Clique para renomear esta task";let z=document.createElement("span");z.className="cw-edit-hint",z.innerHTML="\u270E Renomear",A.appendChild(k),A.appendChild(z),c.appendChild(y),c.appendChild(A),v.appendChild(c),q.forEach((L,F)=>{let j=document.createElement("div");j.className="cw-input-group";let V=document.createElement("label");V.className="cw-input-label",V.textContent=L.replace(/📷|:|•/g,"").trim();let I=document.createElement("input");I.className="cw-input-field",I.id=`screen-${D}-${u}-${F}`,I.placeholder="Cole o link aqui...",I.setAttribute("autocomplete","off"),I.addEventListener("input",()=>{I.value.trim().length>5?I.classList.add("filled"):I.classList.remove("filled")});let Y=document.createElement("div");Y.className="cw-input-check",Y.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',j.appendChild(V),j.appendChild(I),j.appendChild(Y),v.appendChild(j)}),l.appendChild(v)}}}),d.style.display=E?"block":"none"}return{selectionElement:r,screenshotsElement:d,updateSubStatus:()=>B(),getCheckedElements:()=>Object.keys(t).map(C=>({value:C,closest:()=>({querySelector:()=>({textContent:t[C].count})})})),setTaskCount:(C,E)=>{t[C]&&delete t[C],E>0&&Re[C]&&$(C,E,Re[C])},toggleTask:(C,E=!0)=>{let O=t[C];E&&!O?$(C,1,Re[C]):!E&&O&&$(C,-O.count,Re[C])},setMode:C=>{o=C,B()},reset:()=>{for(let C in t)delete t[C];h.value="",g.style.display="block",x.style.display="none",H(),B()}}}var Ro="cw_personal_library_v1",Ce={getSnippets:(e="all")=>{let t=Ce._loadFromLocal(),o=Ue();return o&&o.includes("@")&&Ce._syncWithServer(o),e==="all"?t:t.filter(n=>n.type===e)},save:async e=>{let t=Ue();if(!t)return U("Erro: Usu\xE1rio n\xE3o identificado.",{error:!0}),!1;let o=Ce._loadFromLocal(),n=new Date().toISOString(),s={id:e.id||"local_"+Date.now(),type:e.type||"general",title:e.title||"Sem t\xEDtulo",content:e.content||"",subject:e.subject||"",isCode:e.isCode||!1,isRich:e.isRich||!1,updated:n},i=o.filter(a=>a.id!==s.id);return i.unshift(s),Ce._saveToLocal(i),xe.saveSnippet(s,t).then(a=>{a?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais.")}),s},delete:async e=>{let t=Ue(),n=Ce._loadFromLocal().filter(s=>s.id!==e);return Ce._saveToLocal(n),t&&xe.deleteSnippet(e,t),!0},_syncWithServer:async e=>{console.log("\u{1F504} Sincronizando biblioteca...");let t=await xe.getUserSnippets(e);if(t&&t.status==="success"&&Array.isArray(t.snippets)){let o=t.snippets,n=Ce._loadFromLocal(),s=JSON.stringify(o),i=JSON.stringify(n);s!==i&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),Ce._saveToLocal(o))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem(Ro)||"[]")}catch{return[]}},_saveToLocal:e=>{localStorage.setItem(Ro,JSON.stringify(e))}};function _o(e){let t=document.createElement("div");t.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let o=document.createElement("div");o.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let n=document.createElement("div");n.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",t.appendChild(n),t.appendChild(o),o.addEventListener("scroll",()=>{n.style.boxShadow=o.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let s={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},i={};function a({id:H,label:B,type:C="text",placeholder:E="",required:O=!1,parent:M=o}){let N=document.createElement("div");N.style.cssText=s.inputWrapper;let D=document.createElement("label");D.style.cssText=s.label,D.innerHTML=`${B} ${O?'<span style="color:#D93025">*</span>':""}`;let R;return C==="textarea"?(R=document.createElement("textarea"),R.style.cssText=s.input+s.textarea):(R=document.createElement("input"),R.type=C,R.style.cssText=s.input),R.id=H,R.placeholder=E,R.addEventListener("focus",()=>{R.style.borderColor="#1a73e8",R.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),R.addEventListener("blur",()=>{R.style.borderColor="#DADCE0",R.style.boxShadow="none",O&&R.value.trim()!==""&&(R.style.backgroundColor="#FFF")}),i[H]={input:R,wrapper:N,required:O},N.appendChild(D),N.appendChild(R),M.appendChild(N),N}function r({id:H,label:B,options:C=["Yes","No"],defaultValue:E="No",onChange:O=null}){let M=document.createElement("div");M.style.cssText=s.inputWrapper;let N=document.createElement("label");N.style.cssText=s.label,N.textContent=B,M.appendChild(N);let D=document.createElement("div");D.style.cssText=s.radioGroup;let R=document.createElement("input");return R.type="hidden",R.id=H,R.value=E,M.appendChild(R),C.forEach(G=>{let w=document.createElement("div");w.textContent=G,w.style.cssText=s.radioLabel,G===E&&(w.style.cssText+=s.radioActive),w.onclick=()=>{Array.from(D.children).forEach(u=>u.style.cssText=s.radioLabel),w.style.cssText+=s.radioActive,R.value=G,O&&O(G)},D.appendChild(w)}),i[H]={input:R,wrapper:M,required:!1},M.appendChild(D),o.appendChild(M),M}let d=document.createElement("div");d.style.cssText=s.banner,d.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,o.appendChild(d);let l=document.createElement("div");l.style.marginBottom="24px";let p=document.createElement("button");p.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",p.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",p.onmouseover=()=>p.style.background="#E1EFFF",p.onmouseout=()=>p.style.background="#F0F7FF",l.appendChild(p),o.appendChild(l);let g=document.createElement("div");g.style.cssText=s.section,g.innerHTML=`<div style="${s.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,o.appendChild(g),a({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:g}),a({id:"ga4",label:"GA4 Property ID",parent:g}),a({id:"gtm",label:"GTM Container ID",parent:g});let x=document.createElement("div");x.style.cssText=s.hiddenField,g.appendChild(x),r({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:H=>{H==="Yes"?x.style.cssText=s.visibleField+"margin-bottom:14px;":(x.style.cssText=s.hiddenField,i.accessEmail.input.value="")}}),a({id:"accessEmail",label:"User Access Email",parent:x}),r({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let h=document.createElement("div");h.style.cssText=s.section,h.innerHTML=`<div style="${s.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,o.appendChild(h),a({id:"name",label:"Advertiser Name",required:!0,parent:h}),a({id:"url",label:"Website URL",parent:h}),a({id:"phone",label:"Phone Number",parent:h}),a({id:"email",label:"Contact Email",parent:h}),a({id:"callback",label:"Preferred Callback Time (Timezone)",parent:h}),a({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:"Descreva o erro, passos para reproduzir...",required:!0,parent:h}),a({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:"O que voc\xEA j\xE1 testou?",parent:h}),a({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:h});let f=document.createElement("div");f.style.cssText=s.section,f.innerHTML=`<div style="${s.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,o.appendChild(f),a({id:"cc_adv",label:"Advertiser Contact",parent:f}),a({id:"cc_am",label:"Account Manager",parent:f});let b=document.createElement("div");b.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let T=document.createElement("button");T.innerHTML="Voltar",T.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",T.onclick=e;let S=document.createElement("button");S.textContent="Gerar Nota",S.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",b.appendChild(T),b.appendChild(S),t.appendChild(b),p.onclick=async()=>{let H=p.innerHTML;p.innerHTML="\u23F3 Buscando dados...";try{let B=await Ge(),C=0,E=(N,D)=>{let R=i[N];D&&R&&R.input.value===""&&(R.input.value=D,R.input.style.backgroundColor="#E6F4EA",R.input.style.borderColor="#34A853",setTimeout(()=>{R.input.style.backgroundColor="#FFF",R.input.style.borderColor="#DADCE0"},1e3),C++)};E("name",B.advertiserName),E("url",B.websiteUrl),B.clientEmail&&(E("email",B.clientEmail),E("cc_adv",B.clientEmail));let M=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);M&&E("cid",M[0]),C>0?U(`${C} campos preenchidos!`):U("Nenhum dado novo encontrado.")}catch(B){console.error(B),U("Erro ao ler p\xE1gina.")}finally{p.innerHTML=H}};let $=()=>{let H=!0,B=null;return Object.values(i).forEach(C=>{C.required&&!C.input.value.trim()&&(H=!1,C.input.style.cssText+=s.inputError,C.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),B||(B=C.input))}),B&&B.scrollIntoView({behavior:"smooth",block:"center"}),H};return S.onclick=async()=>{if(!$()){U("Preencha os campos obrigat\xF3rios.",{isError:!0});return}let H=N=>i[N].input.value||"N/A",B=H("hasAccess"),C=B==="Yes"?H("accessEmail"):"N/A",O=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${H("cid")}
<b>GA4 ID:</b> ${H("ga4")}
<b>GTM ID:</b> ${H("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${B==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${C}
<b>Ghosting Access Available (Y/N):</b> ${H("ghosting")==="Yes"?"Y":"N"}
<b>Name of advertiser:</b> ${H("name")}
<b>Website:</b> ${H("url")}
<b>Phone Number:</b> ${H("phone")}
<b>Preferred Callback:</b> ${H("callback")}
<b>Email Address:</b> ${H("email")}

<b>Detailed Issue Description:</b>
${H("desc")}

<b>Uncropped screenshots:</b>
${H("screens")}

<b>Checks performed by Technical Solutions Team:</b>
${H("checks")}

[IMP] Contacts to be copied
<b>Advertiser contact:</b> ${H("cc_adv")}
<b>Account Manager:</b> ${H("cc_am")}
`.replace(/\n/g,"<br>");xt(O);let M=await Nt();M?(M.innerText.trim()===""&&(M.innerHTML=""),document.execCommand("insertHTML",!1,O),Mt(M),U("Nota gerada e inserida!")):U("Copiado! Abra uma nota para colar.")},t}var Jt="cw_notes_parking_lot",Rt="cw_notes_emergency_save";var Ne={getAll:()=>{try{return JSON.parse(localStorage.getItem(Jt)||"[]")}catch{return[]}},save:e=>{let t=Ne.getAll(),o={id:Date.now().toString(),timestamp:new Date().toISOString(),...e};return t.unshift(o),t.length>5&&t.pop(),localStorage.setItem(Jt,JSON.stringify(t)),o},delete:e=>{let t=Ne.getAll();return t=t.filter(o=>o.id!==e),localStorage.setItem(Jt,JSON.stringify(t)),t},getCount:()=>Ne.getAll().length,saveEmergency:e=>{let t={timestamp:Date.now(),data:e};localStorage.setItem(Rt,JSON.stringify(t))},getEmergency:()=>{try{let e=localStorage.getItem(Rt);if(!e)return null;let t=JSON.parse(e);return Date.now()-t.timestamp>432e5?(localStorage.removeItem(Rt),null):t.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(Rt)}};function Do(e){let{onSaveCurrent:t,onLoadDraft:o}=e,n=document.createElement("button");n.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        Guardar
    `,n.style.cssText=`
        flex: 1 1 0;           /* Ocupa o mesmo espa\xE7o (33%) */
        padding: 10px 0;       /* Mesma altura */
        margin-top: 16px;      /* Mesmo espa\xE7amento superior */
        border-radius: 8px;    /* Mesma curva */
        font-size: 14px;       /* Mesma fonte */
        font-weight: 500;      /* Mesmo peso */
        
        /* Estilo Visual (Secund\xE1rio/Branco) */
        background: #FFFFFF; 
        color: #5F6368; 
        border: 1px solid #DADCE0; 
        cursor: pointer;
        display: flex; 
        align-items: center; 
        justify-content: center; /* Centralizado */
        gap: 8px;
        transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
        box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    `,n.onmouseenter=()=>{n.style.backgroundColor="#F8F9FA",n.style.borderColor="#202124",n.style.color="#202124",n.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)",n.style.transform="translateY(-1px)"},n.onmouseleave=()=>{n.style.backgroundColor="#FFFFFF",n.style.borderColor="#DADCE0",n.style.color="#5F6368",n.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",n.style.transform="translateY(0)"},n.onmousedown=()=>n.style.transform="scale(0.96)",n.onmouseup=()=>n.style.transform="scale(1) translateY(-1px)",n.onclick=async()=>{if(confirm("Deseja guardar o rascunho atual e limpar os campos?"))try{let h=await t();h?(Ne.save(h),x(),a(),W.playSuccess(),U("Rascunho salvo com sucesso!")):U("Erro: N\xE3o foi poss\xEDvel ler os dados.",{error:!0})}catch(h){console.error("Erro ao salvar rascunho:",h),U("Erro ao salvar.",{error:!0})}};let s=document.createElement("div");s.title="Meus Rascunhos",s.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",s.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#5f6368"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let i=document.createElement("div");i.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",s.appendChild(i),s.onmouseenter=()=>s.style.background="rgba(0,0,0,0.05)",s.onmouseleave=()=>s.style.background="transparent",s.onclick=h=>{h.stopPropagation(),g()};function a(){let h=Ne.getCount();h>0?(i.style.display="block",i.textContent=h,i.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):i.style.display="none"}let r=document.createElement("div");r.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: #FFFFFF; z-index: 100;
        border-radius: 20px 20px 0 0;
        box-shadow: 0 -10px 40px rgba(0,0,0,0.15);
        transform: translateY(110%); transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        display: flex; flex-direction: column; overflow: hidden;
    `;let d=document.createElement("div");d.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",d.innerHTML='<span style="font-size:16px; font-weight:700; color:#202124;">Rascunhos Salvos</span>';let l=document.createElement("button");l.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',l.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",l.onmouseenter=()=>l.style.background="#F1F3F4",l.onmouseleave=()=>l.style.background="transparent",l.onclick=()=>g(!1),d.appendChild(l);let p=document.createElement("div");p.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",r.appendChild(d),r.appendChild(p);function g(h){let f=r.style.transform==="translateY(0%)";(h!==void 0?h:!f)?(x(),r.style.transform="translateY(0%)"):r.style.transform="translateY(110%)"}function x(){let h=Ne.getAll();if(p.innerHTML="",h.length===0){p.innerHTML=`
                <div style="text-align:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:500;">Nenhum rascunho guardado</div>
                    <div style="font-size:12px; margin-top:4px;">Use o bot\xE3o "Guardar" para estacionar um caso aqui.</div>
                </div>`;return}h.forEach(f=>{let b=document.createElement("div");b.style.cssText=`
                background: #FFF; padding: 16px; border-radius: 12px;
                border: 1px solid #E0E0E0; box-shadow: 0 1px 3px rgba(0,0,0,0.02);
                position: relative; transition: all 0.2s;
            `;let S=new Date(f.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),$="";f.summaryTags&&f.summaryTags.length>0&&($=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${f.summaryTags.slice(0,3).join(", ")+(f.summaryTags.length>3?"...":"")}</div>`),b.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${f.clientName||"Cliente Sem Nome"}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${S}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${f.cid||"---"}</span>
                    <span style="display:block; color:${f.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${f.subStatus||f.status||"Sem Status"}</span>
                    ${$}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3); transition:all 0.2s;">
                        Retomar Caso
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;" title="Descartar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;let H=b.querySelector(".cw-resume-btn");H.onclick=()=>{confirm("Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.")&&(o(f),Ne.delete(f.id),x(),a(),g(!1),W.playSwoosh(),U("Rascunho carregado."))};let B=b.querySelector(".cw-del-btn");B.onclick=()=>{confirm("Excluir este rascunho?")&&(Ne.delete(f.id),x(),a())},p.appendChild(b)})}return a(),{parkButton:n,historyBtnWrapper:s,drawer:r}}function zo(){let e="v3.8.0",t="bau",o="pt",n=!1,s=!1,i=!1,a={input:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},textarea:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease",height:"100px",resize:"vertical"},h3:{fontSize:"14px",fontWeight:"600",color:"#202124",margin:"0 0 12px 0"},label:{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},checkboxLabel:{display:"flex",alignItems:"center",marginBottom:"10px",fontSize:"14px",fontWeight:"400",cursor:"pointer",padding:"8px",background:"#f8f9fa",borderRadius:"6px",transition:"background-color 0.2s ease, box-shadow 0.2s ease",userSelect:"none"},checkboxInput:{width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"},buttonBase:{flex:"1 1 0",padding:"10px 0",color:"#fff",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"500",cursor:"pointer",marginTop:"16px"},stepBlock:{borderTop:"1px solid #eee",paddingTop:"12px",marginTop:"12px"},radioContainer:{display:"flex",gap:"15px",marginBottom:"10px"},optionalBtn:{width:"100%",padding:"10px",background:"white",border:"1px dashed #1a73e8",color:"#1a73e8",borderRadius:"6px",cursor:"pointer",fontWeight:"500",fontSize:"13px",marginBottom:"10px",transition:"all 0.2s"},helpLink:{fontSize:"12px",color:"#1a73e8",textDecoration:"none",cursor:"pointer",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"color 0.2s"}},r=Mo(),d=No(()=>{let P=d.getCheckedElements().map(_=>_.value);c&&c.value&&r.updateVisibility(c.value,P)}),l=document.createElement("div");l.id="autofill-popup",l.classList.add("cw-module-window"),Object.assign(l.style,Oe,{right:"100px",width:"450px",transition:"width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)"});let p={popup:l,googleLine:null},g=Fe(l,"Case Notes",e,"Gera notas padronizadas.",p,()=>Gt());l.appendChild(g);let x=document.createElement("div");Object.assign(x.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1"}),l.appendChild(x);let h=document.createElement("div");Object.assign(h.style,{flexGrow:"1",display:"none",overflow:"auto"});let f=_o(()=>b());h.appendChild(f),l.appendChild(h);function b(m){i=!i,i?(x.style.display="none",h.style.display="flex",p.googleLine&&(p.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)"),m&&(m.style.color="#C58AF9",m.style.background="rgba(197, 138, 249, 0.15)")):(x.style.display="block",h.style.display="none",p.googleLine&&(p.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"),m&&(m.style.color="#9AA0A6",m.style.background="transparent"))}let T=document.createElement("div");T.textContent="created by lucaste@",Object.assign(T.style,ho),l.appendChild(T);let S=document.createElement("div");S.id="step-lang-type";let $=document.createElement("label");Object.assign($.style,a.label),S.appendChild($);let H=document.createElement("div");Object.assign(H.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let B=document.createElement("div");B.textContent="Portugu\xEAs",B.classList.add("no-drag"),Object.assign(B.style,Ie);let C=document.createElement("div");C.textContent="Espa\xF1ol",C.classList.add("no-drag"),Object.assign(C.style,Ie),B.onclick=()=>wt("pt"),C.onclick=()=>wt("es"),H.appendChild(B),H.appendChild(C),S.appendChild(H),x.appendChild(S);let E=document.createElement("div");E.id="step-0-case-type";let O=document.createElement("label");Object.assign(O.style,a.label),E.appendChild(O);let M=document.createElement("div");Object.assign(M.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let N=document.createElement("div");N.textContent="BAU",N.classList.add("no-drag"),Object.assign(N.style,Ie);let D=document.createElement("div");D.textContent="LM",D.classList.add("no-drag"),Object.assign(D.style,Ie),N.onclick=()=>vt("bau"),D.onclick=()=>vt("lm"),M.appendChild(N),M.appendChild(D),E.appendChild(M),x.appendChild(E);let R=document.createElement("div");R.id="step-1-selection";let G=document.createElement("label");G.className="cw-input-label",G.textContent="Status Principal";let w=document.createElement("select");w.id="main-status",w.className="cw-select",w.innerHTML=`
      <option value="" disabled selected hidden>Selecione uma op\xE7\xE3o...</option>
      <option value="NI">NI - Need Info</option>
      <option value="SO">SO - Solution Offered</option>
      <option value="IN">IN - Inactive</option>
      <option value="AS">AS - Assigned</option>
      <option value="DC">DC - Discard</option>
  `;let q=document.createElement("div");q.style.cssText="display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; margin-bottom: 6px;";let u=document.createElement("label");u.className="cw-input-label",u.textContent="Sub-status",u.style.marginBottom="0";let v=document.createElement("a");v.href="https://seu-link-do-guia-aqui.com",v.target="_blank",v.className="cw-info-link",v.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; transform:translateY(1px)"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Guia de Substatus',Object.assign(v.style,a.helpLink),q.appendChild(u),q.appendChild(v);let c=document.createElement("select");c.id="sub-status",c.className="cw-select",c.disabled=!0,c.innerHTML='<option value="" disabled selected hidden>Aguardando status principal...</option>',R.appendChild(G),R.appendChild(w),R.appendChild(q),R.appendChild(c),x.appendChild(R);let y=document.createElement("div");y.id="step-1-1-portugal",Object.assign(y.style,a.stepBlock,{display:"none"});let A=document.createElement("label");Object.assign(A.style,a.label),y.appendChild(A);let k=document.createElement("div");Object.assign(k.style,a.radioContainer);let z=document.createElement("div");Object.assign(z.style,{display:"flex",alignItems:"center"});let L=document.createElement("input");L.type="radio",L.name="portugal-group",L.value="sim",Object.assign(L.style,a.checkboxInput);let F=document.createElement("label");F.htmlFor="portugal-sim",Object.assign(F.style,{cursor:"pointer"}),z.appendChild(L),z.appendChild(F);let j=document.createElement("div");Object.assign(j.style,{display:"flex",alignItems:"center"});let V=document.createElement("input");V.type="radio",V.name="portugal-group",V.value="nao",V.checked=!0,Object.assign(V.style,a.checkboxInput);let I=document.createElement("label");I.htmlFor="portugal-nao",Object.assign(I.style,{cursor:"pointer"}),j.appendChild(V),j.appendChild(I),k.appendChild(z),k.appendChild(j),y.appendChild(k),x.appendChild(y);function Y(m){n=m,m?Q.style.display="block":Q.style.display="none"}L.onchange=()=>Y(!0),V.onchange=()=>Y(!1);let Q=document.createElement("div");Q.id="step-1-2-consent",Object.assign(Q.style,a.stepBlock,{display:"none"});let be=document.createElement("label");Object.assign(be.style,a.label),Q.appendChild(be);let ge=document.createElement("div");Object.assign(ge.style,a.radioContainer);let ke=document.createElement("div");Object.assign(ke.style,{display:"flex",alignItems:"center"});let se=document.createElement("input");se.type="radio",se.name="consent-group",se.value="Sim",se.checked=!0,Object.assign(se.style,a.checkboxInput);let we=document.createElement("label");we.htmlFor="consent-sim",Object.assign(we.style,{cursor:"pointer"}),ke.appendChild(se),ke.appendChild(we);let pe=document.createElement("div");Object.assign(pe.style,{display:"flex",alignItems:"center"});let ee=document.createElement("input");ee.type="radio",ee.name="consent-group",ee.value="N\xE3o",Object.assign(ee.style,a.checkboxInput);let de=document.createElement("label");de.htmlFor="consent-nao",Object.assign(de.style,{cursor:"pointer"}),pe.appendChild(ee),pe.appendChild(de),ge.appendChild(ke),ge.appendChild(pe),Q.appendChild(ge),x.appendChild(Q);let ce=document.createElement("div");ce.id="step-1-5-snippets",Object.assign(ce.style,a.stepBlock,{display:"none"});let _e=document.createElement("h3");Object.assign(_e.style,a.h3),_e.textContent="Cen\xE1rios Comuns";let yt=Ce.getSnippets("note").reduce((m,P)=>(m[`\u2B50 ${P.title}`]=P.content,m),{}),Le=Fo(m=>{let P=document.querySelector(".bullet-textarea")||document.querySelector("textarea");if(P){let _=document.createElement("div");_.innerHTML=m;let X=_.innerText;P.value=X,P.dispatchEvent(new Event("input")),P.style.transition="background-color 0.2s",P.style.backgroundColor="#e8f0fe",setTimeout(()=>P.style.backgroundColor="#fff",300)}},yt);if(Le.id="snippet-container",Object.keys(yt).length>0){let m=document.createElement("span");m.textContent=" + Seus Snippets",m.style.cssText="font-size:10px; color:#1a73e8; font-weight:700; margin-left:8px;",_e.appendChild(m)}ce.appendChild(_e),ce.appendChild(Le),x.appendChild(ce);let he=document.createElement("div");he.id="step-3-form",Object.assign(he.style,a.stepBlock,{display:"none"});let lt=document.createElement("h3");Object.assign(lt.style,a.h3),he.appendChild(lt);let Be=document.createElement("div");Be.id="dynamic-form-fields-container",he.appendChild(Be);let Ae=document.createElement("button");Ae.textContent="+ Gostaria de selecionar uma task?",Object.assign(Ae.style,a.optionalBtn),Ae.onmouseover=()=>Ae.style.background="#e8f0fe",Ae.onmouseout=()=>Ae.style.background="white",Ae.onclick=()=>{Ae.style.display="none",Ke.style.display="block",d.selectionElement.style.display="block"};let Ke=document.createElement("h3");Object.assign(Ke.style,a.h3,{marginTop:"20px"});let to=d.selectionElement;Object.assign(to.style,{marginBottom:"20px"}),he.appendChild(Ae),he.appendChild(Ke),he.appendChild(to),he.appendChild(r.element),he.appendChild(d.screenshotsElement),x.appendChild(he);let Je=document.createElement("div");Je.id="step-4-email",Object.assign(Je.style,{display:"none",marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #eee"});let Qe=document.createElement("label");Qe.style.display="flex",Qe.style.alignItems="center",Qe.style.cursor="pointer",Qe.style.fontSize="14px";let Ze=document.createElement("input");Ze.type="checkbox",Ze.checked=!0,Object.assign(Ze.style,a.checkboxInput),Qe.appendChild(Ze),Qe.appendChild(document.createTextNode("Preencher email automaticamente?")),Je.appendChild(Qe),x.appendChild(Je);let Ve=document.createElement("div");Object.assign(Ve.style,{display:"none",gap:"8px",padding:"0"}),x.appendChild(Ve);let ct=document.createElement("button");Object.assign(ct.style,a.buttonBase,{backgroundColor:"#5f6368"}),ct.textContent="Copiar";let dt=document.createElement("button");Object.assign(dt.style,a.buttonBase,{backgroundColor:"#1a73e8"}),dt.textContent="Preencher",Ve.appendChild(ct),Ve.appendChild(dt);async function oo(){let m=await Ge(),P={};Be.querySelectorAll("input, textarea").forEach(K=>P[K.id]=K.value);let X=d.getCheckedElements().map(K=>({key:K.value,count:parseInt(K.closest(".cw-task-item").querySelector(".cw-step-val")?.textContent||1)})),le={};d.screenshotsElement.querySelectorAll("input").forEach(K=>{K.value.trim()!==""&&(le[K.id]=K.value)});let Ee=document.getElementById("tag-support-container"),ye=null;if(Ee){let K=Ee.querySelector('input[type="radio"]:checked'),ne=Ee.querySelector('input[type="text"]');ye={choice:K?K.value:"N\xE3o",reason:ne?ne.value:""}}return{clientName:m.advertiserName,cid:m.cid,status:w.value,subStatus:c.value,caseType:t,lang:o,formData:P,activeTasks:X,screenshotsData:le,tagSupportState:ye,summaryTags:X.map(K=>Re[K.key]?Re[K.key].name:K.key)}}function no(m){m.lang&&wt(m.lang),m.caseType&&vt(m.caseType),m.status&&(w.value=m.status,w.dispatchEvent(new Event("change"))),setTimeout(()=>{m.subStatus&&(c.value=m.subStatus,c.dispatchEvent(new Event("change"))),setTimeout(()=>{if(m.formData&&Object.entries(m.formData).forEach(([P,_])=>{let X=document.getElementById(P);X&&(X.value=_)}),d.reset(),m.activeTasks&&Array.isArray(m.activeTasks)&&m.activeTasks.forEach(P=>{d.setTaskCount(P.key,P.count)}),m.screenshotsData&&Object.entries(m.screenshotsData).forEach(([P,_])=>{let X=document.getElementById(P);X&&(X.value=_,X.dispatchEvent(new Event("input")))}),m.tagSupportState){let P=document.getElementById("tag-support-container");if(P){let _=P.querySelector(`input[value="${m.tagSupportState.choice}"]`);if(_&&(_.checked=!0,_.dispatchEvent(new Event("change"))),m.tagSupportState.choice==="N\xE3o"&&m.tagSupportState.reason){let X=P.querySelector('input[type="text"]');X&&(X.value=m.tagSupportState.reason)}}}},150)},50)}let Dt=Do({onSaveCurrent:async()=>{let m=await oo();return Ct(1.5),w.value="",m},onLoadDraft:m=>{no(m)}}),st=g.lastElementChild;if(st&&st.insertBefore(Dt.historyBtnWrapper,st.firstChild),st){let m=document.createElement("div");m.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',Object.assign(m.style,{width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease",marginLeft:"4px"}),m.title="Alternar para Split & Transfer",m.onmouseenter=()=>{m.style.background="rgba(255,255,255,0.1)",m.style.color="#FFF"},m.onmouseleave=()=>{i||(m.style.background="transparent",m.style.color="#9AA0A6")},m.onclick=P=>{P.stopPropagation(),b(m)},st.insertBefore(m,st.firstChild)}Ve.insertBefore(Dt.parkButton,Ve.firstChild),l.appendChild(Dt.drawer);let pt=document.createElement("div");Object.assign(pt.style,We),pt.className="no-drag",pt.title="Redimensionar",l.appendChild(pt),Ye(l,pt),document.body.appendChild(l);function vt(m){t=m;let P=ut();Object.assign(N.style,Ie),Object.assign(D.style,Ie),m==="bau"?(Object.assign(N.style,P),v.href="https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657"):(Object.assign(D.style,P),v.href="https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243"),c.value&&c.dispatchEvent(new Event("change"))}function ae(m){try{if(He&&He[o]&&He[o][m])return He[o][m];if(He&&He.pt&&He.pt[m])return He.pt[m]}catch{}return m}function Jo(){$.textContent=ae("idioma"),O.textContent=ae("fluxo"),G.textContent=ae("status_principal"),u.textContent=ae("substatus"),_e.textContent=ae("cenarios_comuns"),Ke.textContent=ae("selecione_tasks"),lt.textContent=ae("preencha_detalhes"),ct.textContent=ae("copiar"),dt.textContent=ae("preencher"),w.querySelector('option[value=""]')&&(w.querySelector('option[value=""]').textContent=ae("select_status")),c.querySelector('option[value=""]')&&(c.querySelector('option[value=""]').textContent=ae("select_substatus")),A.textContent=ae("caso_portugal"),F.textContent=ae("sim"),I.textContent=ae("nao"),be.textContent=ae("consentiu_gravacao"),we.textContent=ae("sim"),de.textContent=ae("nao"),Be.querySelectorAll("label").forEach(m=>{let P=m.nextElementSibling.id.replace("field-",""),_=ae(P.toLowerCase());_!==P.toLowerCase()?m.textContent=_:m.textContent=P.replace(/_/g," ").replace(/\b\w/g,X=>X.toUpperCase())+":"}),Ae.textContent="+ "+(o==="pt"?"Gostaria de selecionar uma task?":"Quisiera seleccionar una tarea?")}function wt(m){o=m;let P=ut();Object.assign(B.style,Ie),Object.assign(C.style,Ie),m==="pt"?(Object.assign(B.style,P),y.style.display="block",Y(n)):(Object.assign(C.style,P),y.style.display="none",Q.style.display="none"),Jo(),c.value&&c.dispatchEvent(new Event("change"))}function zt(m){(m.value.trim()===""||m.value.trim()==="\u2022")&&(m.value="\u2022 "),m.onkeydown=function(P){if(P.key==="Enter"){P.preventDefault();let _=this.selectionStart,X=this.selectionEnd,le=this.value,ve=le.lastIndexOf(`
`,_-1)+1,Ee=le.substring(ve,_),ye=Ee.trim()==="\u2022"||Ee.trim()===""?`
`:`
\u2022 `;this.value=le.substring(0,_)+ye+le.substring(X),this.selectionStart=this.selectionEnd=_+ye.length}else if(P.key==="Backspace"){let _=this.selectionStart;if(_===this.selectionEnd&&_>0){let X=this.value.substring(0,_);X.endsWith(`
\u2022 `)?(P.preventDefault(),this.value=X.substring(0,_-3)+this.value.substring(this.selectionEnd),this.selectionStart=this.selectionEnd=_-3):X==="\u2022 "&&(P.preventDefault(),this.value="",this.selectionStart=this.selectionEnd=0)}}}}function Bt(){let m=typeof Le<"u"?Le:document.getElementById("snippet-container");if(!m)return;let P=m.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'),_={},X=new Set;P.forEach(K=>{let ne=K.id,Z=$e[ne];if(Z)for(let J in Z)J==="linkedTask"?X.add(Z.linkedTask):J!=="type"&&(_[J]||(_[J]=[]),_[J].includes(Z[J])||_[J].push(Z[J]))});let le=new Set;Object.values($e).forEach(K=>{Object.keys(K).forEach(ne=>{ne!=="linkedTask"&&ne!=="type"&&le.add(ne)})}),le.forEach(K=>{let ne=document.getElementById(K);if(ne){let Z=_[K]||[],J="";bt.includes(K.replace("field-",""))?(J=Z.map(re=>re.startsWith("\u2022 ")?re:"\u2022 "+re).join(`
`),J===""?J="\u2022 ":J.endsWith(`
\u2022 `)||(J+=`
\u2022 `)):J=Z.join(`

`),J.trim()!=="\u2022"&&J.trim()!==""?ne.value=J:bt.includes(K.replace("field-",""))?ne.value="\u2022 ":ne.value="",ne.tagName==="TEXTAREA"&&typeof zt=="function"&&zt(ne)}});let ve=new Set,Ee=new Set;m.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(K=>{let ne=$e[K.id];ne&&ne.linkedTask&&(K.checked?ve.add(ne.linkedTask):Ee.add(ne.linkedTask))}),Ee.forEach(K=>{ve.has(K)||d.toggleTask(K,!1)}),ve.forEach(K=>{d.toggleTask(K,!0)})}w.onchange=()=>{let m=w.value;if(Ct(1.5),c.innerHTML=`<option value="">${ae("select_substatus")}</option>`,!m){c.disabled=!0;return}for(let P in gt){let _=gt[P];if(_.status===m){let X=document.createElement("option");X.value=P,X.textContent=_.name,c.appendChild(X)}}c.disabled=!1},c.onchange=()=>{let m=c.value;if(Ct(1.5),!m)return;d.updateSubStatus(m);let P=gt[m];Le.innerHTML="";let _=(Z,J,re)=>{let fe=document.createElement("label");Object.assign(fe.style,a.checkboxLabel),fe.onmouseover=()=>fe.style.backgroundColor="#e8eaed",fe.onmouseout=()=>fe.style.backgroundColor="#f8f9fa";let me=document.createElement("input");return me.type=J,me.id=Z.id,Object.assign(me.style,a.checkboxInput),fe.appendChild(me),fe.appendChild(document.createTextNode(` ${Z.text}`)),re.appendChild(fe),me},X=[],le="radio";if(m==="NI_Awaiting_Inputs")X=[{id:"quickfill-ni-inicio-manual",text:"In\xEDcio 2/6 (Manual)"},{id:"quickfill-ni-cms-access",text:"In\xEDcio 2/6 (ADV sem acesso ao CMS)"},{id:"quickfill-ni-followup-bau",text:"Follow-up 2/6 (BAU)"},{id:"quickfill-ni-followup-lm",text:"Follow-up 2/6 (LM)"}];else if(m.startsWith("SO_"))le="checkbox",X=[{id:"quickfill-gtm-install",text:"Instala\xE7\xE3o do GTM"},{id:"quickfill-whatsapp",text:"Convers\xE3o de WhatsApp"},{id:"quickfill-form",text:"Convers\xE3o de Formul\xE1rio (Padr\xE3o)"},{id:"quickfill-ecw4-close",text:"Fechamento ECW4 (P\xF3s 7 dias)"},{id:"quickfill-ga4-event-close",text:"Fechamento GA4 (P\xF3s 2 dias)"}];else if(m.startsWith("AS_")){le="checkbox";let Z=document.createElement("label");Z.textContent=ae("cenarios_comuns"),Object.assign(Z.style,a.label),Le.appendChild(Z),X=[{id:"quickfill-as-no-show",text:"Anunciante n\xE3o compareceu (respondeu e-mail)"},{id:"quickfill-as-insufficient-time",text:"Tempo insuficiente"},{id:"quickfill-as-no-access",text:"Anunciante sem acessos necess\xE1rios"}]}else m.startsWith("IN_")?X=[{id:"quickfill-in-nrp-bau",text:"NRP (BAU - 3 tentativas)"},{id:"quickfill-in-nrp-lm",text:"NRP (LM - Sem tentativas)"},{id:"quickfill-in-no-show-bau",text:"No-Show (BAU - 3 tentativas)"},{id:"quickfill-in-2-6-final",text:"Finaliza\xE7\xE3o 2/6 (Sem Resposta)"},{id:"quickfill-in-manual",text:"Outro (Manual)"}]:m.startsWith("DC_")?(le="radio",X=[{id:"quickfill-dc-lm-no-access",text:"LM - Sem acessos (Reagendar em BAU)"}]):m==="NI_Attempted_Contact"?(le="radio",X=[{id:"quickfill-ni-attempted-2day",text:"2 Day Rule (2 Liga\xE7\xF5es + Chat AM)"}]):m==="NI_Awaiting_Validation"&&(le="checkbox",X=[{id:"quickfill-ni-awaiting-ecw4",text:"ECW4 (Acompanhar)"},{id:"quickfill-ni-awaiting-ga4",text:"GA4 Event Tracking (Acompanhar)"}]);let ve=X.filter(Z=>{let J=$e[Z.id];return!J.type||J.type==="all"||J.type===t});ve.forEach((Z,J)=>{let re=_(Z,le,Le);le==="radio"&&(re.name="scenario-radio-group",J===0&&(re.checked=!0))}),ve.length>0&&(ce.style.display="block"),P.requiresTasks?(Ae.style.display="none",Ke.style.display="block",d.selectionElement.style.display="block"):(Ae.style.display="block",Ke.style.display="none",d.selectionElement.style.display="none"),Be.innerHTML="";let Ee=P.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(Ee)].forEach(Z=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(Z))return;let J=Z.slice(1,-1),re=document.createElement("label"),fe=ae(J.toLowerCase());if(re.textContent=fe!==J.toLowerCase()?fe:J.replace(/_/g," ").replace(/\b\w/g,oe=>oe.toUpperCase())+":",Object.assign(re.style,a.label),J==="SPEAKEASY_ID"){let oe=document.createElement("button");oe.innerHTML='<span style="font-size:12px; margin-right:4px;">\u2728</span>Auto Busca',oe.style.cssText=`
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
          `,oe.title="Localizar Speakeasy ID no hist\xF3rico",oe.onmouseover=()=>{oe.style.backgroundColor="#c2e7ff",oe.style.boxShadow="0 1px 2px rgba(0,0,0,0.1)"},oe.onmouseout=()=>{oe.style.backgroundColor="#d3e3fd",oe.style.boxShadow="none"},oe.onmousedown=()=>{oe.style.backgroundColor="#a8c7fa",oe.style.transform="scale(0.96)"},oe.onmouseup=()=>oe.style.transform="scale(1)",oe.onclick=Te=>{Te.preventDefault(),So(`field-${J}`)},re.appendChild(oe)}let me;bt.includes(J)?(me=document.createElement("textarea"),Object.assign(me.style,a.textarea),me.classList.add("bullet-textarea"),zt(me)):Ut.includes(J)?(me=document.createElement("textarea"),Object.assign(me.style,a.textarea)):(me=document.createElement("input"),me.type="text",Object.assign(me.style,a.input),J==="REASON_COMMENTS"&&(m.startsWith("NI_")||m.startsWith("IN_"))&&(Object.assign(re.style,{display:"none"}),Object.assign(me.style,{display:"none"}))),J==="ON_CALL"&&t==="lm"&&(Object.assign(re.style,{display:"none"}),Object.assign(me.style,{display:"none"}),me.value="N/A"),me.id=`field-${J}`,Be.appendChild(re),Be.appendChild(me)});let K=Le.querySelectorAll('input[type="checkbox"], input[type="radio"]');K.length>0&&(K.forEach(Z=>{Z.removeEventListener("change",Bt),Z.addEventListener("change",Bt)}),Bt()),he.style.display="block",ot[m]?Je.style.display="block":Je.style.display="none",Ve.style.display="flex";let ne=d.getCheckedElements().map(Z=>Z.value);r.updateVisibility(m,ne)},Ae.onclick=()=>{Ae.style.display="none",Ke.style.display="block",d.selectionElement.style.display="block"};function ao(){let m=c.value;if(!m)return null;let _=gt[m].template.replace(/\n/g,"<br>"),X='style="margin-bottom: 12px; padding-left: 30px;"',le=[],ve="",Ee=d.getCheckedElements();Ee.length>0&&Ee.forEach(ne=>{let Z=ne.value,J=Re[Z],re=ne.closest().querySelector(".stepper-count"),fe=re?parseInt(re.textContent):1;fe>1?le.push(`${J.name} (x${fe})`):le.push(J.name)});let ye=d.screenshotsElement;if(ye){let ne=Array.from(ye.querySelectorAll('input[id^="name-"]'));ne.length>0&&ne.forEach(Z=>{let J=Z.value,re=Z.closest(".cw-screen-card");if(re){let fe=re.querySelectorAll('input[id^="screen-"]'),me=!1,oe="";fe.forEach(Te=>{let so=Te.closest(".cw-input-group"),ro=so?so.querySelector(".cw-input-label"):null,en=ro?ro.textContent:"Evid\xEAncia",lo=Te.value.trim(),tn=lo?` ${lo}`:"";oe+=`<li>${en} -${tn}</li>`,me=!0}),me&&(ve+=`<b>${J}</b>`,ve+=`<ul ${X}>${oe}</ul>`)}})}if(_.includes("{TAGS_IMPLEMENTED}")?_=_.replace(/{TAGS_IMPLEMENTED}/g,le.join(", ")||"N/A"):le.length>0&&(_+=`<br><b>Tags:</b> ${le.join(", ")}<br>`),_.includes("{SCREENSHOTS_LIST}")?_=_.replace(/{SCREENSHOTS_LIST}/g,ve?`${ve}`:"N/A"):ve!==""&&(_+=`<br>${ve}`),o==="pt"&&n){let ne=se.checked?ae("sim"):ae("nao");_=_.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${ae("consentiu_gravacao")}</b> ${ne}<br><br>`),_=_.replace(/{CASO_PORTUGAL}/g,`<br><b>${ae("caso_portugal")}</b> ${ae("sim")}<br>`)}else o==="pt"&&!n?(_=_.replace(/{CASO_PORTUGAL}/g,`<br><b>${ae("caso_portugal")}</b> ${ae("nao")}<br>`),_=_.replace(/{CONSENTIU_GRAVACAO}/g,"")):(_=_.replace(/{CASO_PORTUGAL}/g,""),_=_.replace(/{CONSENTIU_GRAVACAO}/g,""));return Be.querySelectorAll("input, textarea").forEach(ne=>{let Z=ne.id.replace("field-",""),J=new RegExp(`{${Z}}`,"g"),re=ne.value;if(Z==="REASON_COMMENTS"&&(m.startsWith("NI_")||m.startsWith("IN_"))){let oe=Le.querySelector('input[type="radio"]:checked');oe&&$e[oe.id]&&(re=$e[oe.id]["field-REASON_COMMENTS"])}if(bt.includes(Z)&&re.trim()!==""){let oe=re.split(`
`).map(Te=>Te.trim()).filter(Te=>Te!==""&&Te!=="\u2022").map(Te=>Te.startsWith("\u2022 ")?Te.substring(2):Te).map(Te=>`<li>${Te}</li>`).join("");re=oe?`<ul ${X}>${oe}</ul>`:""}else Ut.includes(Z)?re=re.split(`
`).filter(oe=>oe.trim()!=="").map(oe=>`<p style="margin: 0 0 8px 0;">${oe}</p>`).join(""):ne.tagName==="TEXTAREA"&&(re=re.replace(/\n/g,"<br>"));let fe=re.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(fe===""||fe==="\u2022"||fe.toLowerCase()==="n/a"){let oe=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${Z}\\}(?:<br>\\s*)?`,"gi");oe.test(_)?_=_.replace(oe,""):_=_.replace(J,"")}else _=_.replace(J,re.replace(/\$/g,"$$$$"))}),_=_.replace(/{([A-Z0-9_]+)}/g,""),_=_.replace(/(<br>){3,}/g,"<br><br>"),typeof r<"u"&&r.getOutput&&(_+=r.getOutput()),_}ct.onclick=()=>{let m=ao();m?(xt(m),U(ae("copiado_sucesso"))):U(ae("selecione_substatus"),{error:!0})},dt.onclick=async()=>{let m=c.value,P=ao();if(!P){U(ae("selecione_substatus"),{error:!0});return}xt(P),Gt();let _=qt(),X=await Nt();if(X)try{if(X.focus(),X.innerHTML.trim()==="<p><br></p>"||X.innerHTML.trim()==="<br>"||X.innerText.trim()===""){let ye=document.createRange();ye.selectNodeContents(X);let K=window.getSelection();K.removeAllRanges(),K.addRange(ye),document.execCommand("delete",!1,null)}else if(!X.innerHTML.endsWith("<br><br>")){let ye=document.createRange();ye.selectNodeContents(X),ye.collapse(!1);let K=window.getSelection();K.removeAllRanges(),K.addRange(ye),document.execCommand("insertHTML",!1,"<br><br>")}document.execCommand("insertHTML",!1,P),Mt(X),setTimeout(()=>{U(ae("inserido_copiado"))},600);let ve=typeof Ze<"u"&&Ze?Ze.checked:!0;if(m&&ot[m]&&ve){let ye=ot[m];await It(ye),await new Promise(K=>setTimeout(K,500))}_(),Ct(1.5),w.value="",c.innerHTML=`<option value="">${ae("select_substatus")}</option>`,c.disabled=!0}catch(le){console.error(le),U("Erro ao inserir.",{error:!0}),_()}};function Ct(m=1.5){m<=1.5&&(ce.style.display="none",Le.innerHTML=""),m<=2&&(d.reset(),Ae.style.display="none"),m<=3&&(he.style.display="none",Be.innerHTML="",r.reset(),Ve.style.display="none",Je.style.display="none")}let Qo=null,St="";function io(m){let P=document.getElementById("cw-btn-notes");if(!P)return;let _=P.querySelector(".cw-dot-dirty");if(m){if(!_){let X=document.createElement("div");X.className="cw-dot-dirty",P.appendChild(X)}}else _&&_.remove()}async function Zo(){let m=await oo(),P=m.activeTasks.length>0;if(!P){let _=Object.keys(m.formData);for(let X of _){let le=m.formData[X];if(le&&le.trim().length>3&&le!=="\u2022 "){P=!0;break}}}if(io(P),P){let _=JSON.stringify(m);_!==St&&(Ne.saveEmergency(m),St=_)}else St!==""&&(Ne.clearEmergency(),St="")}Qo=setInterval(Zo,5e3),setTimeout(()=>{let m=Ne.getEmergency();if(m){let P=document.createElement("button");P.innerHTML="\u26A0\uFE0F Recuperar trabalho n\xE3o salvo",P.style.cssText="width:100%; background:#FFF3E0; color:#B06000; border:none; padding:8px; font-size:12px; cursor:pointer; font-weight:600; border-bottom:1px solid #FFE0B2;",P.onclick=()=>{no(m),P.remove(),U("Trabalho recuperado!"),SoundManager.playSuccess()},x.insertBefore(P,x.firstChild),io(!0)}},1e3);function Gt(){if(s=!s,s){let m=l.querySelector(".cw-expand-btn");m&&typeof m.resetState=="function"&&m.resetState()}qe(s,l,"cw-btn-notes")}return vt("bau"),wt("pt"),Gt}var at={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function Bo(){let e="v4.2.0 CR-Hybrid",t="CANNED_RESPONSES",o=Object.keys(at)[0],n="",s="list",i=!1,a={bgApp:"#F8F9FA",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.08)",borderFocus:"rgba(26, 115, 232, 0.4)",textPrimary:"#202124",textSecondary:"#5F6368",primary:"#1A73E8",primaryBg:"#E8F0FE",shadowCard:"0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",shadowHover:"0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",transition:"all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1)"},r={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:a.bgApp},d={display:"flex",width:"200%",height:"100%",transition:"transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",transform:"translateX(0)",willChange:"transform"},l={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},p={padding:"20px 24px 12px 24px",flexShrink:"0",background:a.bgApp,zIndex:"10",display:"flex",flexDirection:"column",gap:"16px",borderBottom:`1px solid ${a.borderSubtle}`},g={width:"100%",height:"44px",padding:"0 16px 0 48px",borderRadius:"12px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",fontWeight:"400",color:a.textPrimary,boxSizing:"border-box",outline:"none",transition:a.transition,boxShadow:"0 2px 5px rgba(0,0,0,0.03)",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%239AA0A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"16px center"},x={display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px",paddingBottom:"4px"},h={padding:"6px 14px",borderRadius:"100px",border:"1px solid #DADCE0",background:"#FFFFFF",color:a.textSecondary,fontSize:"13px",fontWeight:"500",letterSpacing:"0.3px",cursor:"pointer",transition:a.transition,flexShrink:"0",display:"flex",alignItems:"center",justifyContent:"center"},f={background:a.primaryBg,color:a.primary,borderColor:"transparent",fontWeight:"600",boxShadow:"0 1px 2px rgba(26, 115, 232, 0.15)"},b={padding:"16px 24px 80px 24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"12px"},T={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",height:"72px",minHeight:"72px",borderRadius:"16px",background:a.bgSurface,border:"1px solid transparent",boxShadow:a.shadowCard,cursor:"pointer",transition:"all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",position:"relative",overflow:"hidden"},S=document.createElement("div");S.id="quick-email-popup",S.classList.add("cw-module-window"),Object.assign(S.style,Oe,{right:"100px",width:"440px",height:"640px",borderRadius:"20px",boxShadow:"0 24px 64px rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.4)"});let $={popup:S,googleLine:null,focusElement:null};function H(){i=!i,qe(i,S,"cw-btn-email"),i||setTimeout(()=>v(),300)}let B=Fe(S,"Quick Email",e,"Templates & Automa\xE7\xF5es",$,()=>H()),C=document.createElement("div");Object.assign(C.style,r);let E=document.createElement("div");Object.assign(E.style,d);let O=document.createElement("div");Object.assign(O.style,l);let M=document.createElement("div");Object.assign(M.style,p);let N=document.createElement("input");N.placeholder="Pesquisar templates...",Object.assign(N.style,g),N.onfocus=()=>{N.style.borderColor=a.primary,N.style.boxShadow="0 0 0 4px rgba(26, 115, 232, 0.15)",N.style.background="#fff"},N.onblur=()=>{N.style.borderColor="transparent",N.style.boxShadow="0 2px 5px rgba(0,0,0,0.03)",N.style.background="#fff"},$.focusElement=N;let D=document.createElement("div");Object.assign(D.style,x);let R=document.createElement("div");Object.assign(R.style,b),M.appendChild(N),M.appendChild(D),O.appendChild(M),O.appendChild(R);let G=document.createElement("div");Object.assign(G.style,l);let w=document.createElement("div");Object.assign(w.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),G.appendChild(w),E.appendChild(O),E.appendChild(G),C.appendChild(E),S.appendChild(B),S.appendChild(C),document.body.appendChild(S);async function q(k,z){try{i&&H();let L=qt();await new Promise(F=>setTimeout(F,800)),z==="email"?await Eo(k):z==="cr"&&await It(k),L()}catch(L){console.error("\u274C Erro:",L);let F=document.querySelector(".cw-focus-backdrop");F&&F.classList.remove("active")}}function u(k){s="detail",E.style.transform="translateX(-50%)";let z='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',L='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';w.innerHTML=`
            <style>
                .cw-email-content p { margin: 0 0 8px 0; } /* Margem apenas embaixo */
                .cw-email-content ul { margin: 0 0 8px 16px; padding: 0; }
                .cw-email-content li { margin-bottom: 4px; }
            </style>

            <div style="position:sticky; top:0; background:rgba(255,255,255,0.9); backdrop-filter:blur(12px); border-bottom:1px solid #eee; padding:16px 24px; z-index:10; display:flex; align-items:center; gap:12px;">
                <button id="csa-back-btn" style="background:none; border:none; cursor:pointer; display:flex; color:#5f6368; padding:8px; margin-left:-12px; border-radius:50%; transition:background 0.2s;">${z}</button>
                <div style="font-weight:600; font-size:16px; color:#202124; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${k.name}</div>
            </div>
            
            <div style="padding:24px;">
                <div style="margin-bottom:24px;">
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Assunto</div>
                    <div style="font-size:14px; font-weight:500; color:#202124; padding:16px; background:#F8F9FA; border-radius:12px; border:1px solid #eee; box-shadow:inset 0 1px 2px rgba(0,0,0,0.02);">${k.subject}</div>
                </div>
                
                <div>
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Mensagem</div>
                    
                    <div class="cw-email-content" style="font-size:13px; color:#3c4043; line-height:1.5; white-space: normal; word-break: break-word; padding:0 4px;">
                        ${k.body}
                    </div>
                </div>
            </div>
            
            <div style="position:sticky; bottom:0; padding:24px; background:linear-gradient(to top, #fff 90%, rgba(255,255,255,0)); pointer-events:none;">
                <button id="csa-insert-btn" style="pointer-events:auto; width:100%; padding:14px; background:#1a73e8; color:white; border:none; border-radius:12px; font-size:14px; font-weight:600; cursor:pointer; display:flex; justify-content:center; align-items:center; gap:10px; box-shadow:0 4px 12px rgba(26,115,232,0.3); transition:transform 0.2s, box-shadow 0.2s;">
                    ${L} Usar Template
                </button>
            </div>
        `;let F=w.querySelector("#csa-back-btn");F.onmouseenter=()=>F.style.background="#f1f3f4",F.onmouseleave=()=>F.style.background="none",F.onclick=v;let j=w.querySelector("#csa-insert-btn");j.onmouseenter=()=>{j.style.transform="translateY(-1px)",j.style.boxShadow="0 6px 16px rgba(26,115,232,0.4)"},j.onmouseleave=()=>{j.style.transform="translateY(0)",j.style.boxShadow="0 4px 12px rgba(26,115,232,0.3)"},j.onclick=()=>{j.style.transform="scale(0.96)",q(k,"email"),setTimeout(()=>{j.style.transform="scale(1)",v()},300)}}function v(){s="list",E.style.transform="translateX(0)"}function c(k,z,L=null){let F=document.createElement("button"),j=L?`<span style="margin-right:6px; font-size:14px; opacity:0.9;">${L}</span>`:"";return F.innerHTML=`${j}${k}`,Object.assign(F.style,h),o===z&&n===""?Object.assign(F.style,f):(F.onmouseenter=()=>{F.style.background="#F1F3F4",F.style.borderColor="#DADCE0"},F.onmouseleave=()=>{F.style.background="#FFFFFF",F.style.borderColor="#DADCE0"}),F.onclick=()=>{o=z,n="",N.value="",y(),A()},F}function y(){D.innerHTML="",D.appendChild(c("Smart CRs",t,"\u26A1")),D.appendChild(c("Pessoal","PERSONAL_LIBRARY","\u{1F464}")),Object.keys(at).forEach(k=>{D.appendChild(c(at[k].title,k))})}function A(){R.innerHTML="";let k=[];if(n.trim()!==""){let V=n.toLowerCase();Object.values(at).forEach(I=>{I.emails.forEach(Y=>{(Y.name.toLowerCase().includes(V)||Y.subject.toLowerCase().includes(V))&&k.push({type:"email",data:Y})})}),Ce.getSnippets("email").forEach(I=>{(I.title.toLowerCase().includes(V)||I.subject&&I.subject.toLowerCase().includes(V))&&k.push({type:"email",data:{name:I.title,subject:I.subject||"Sem Assunto",body:I.content}})}),Object.entries(ot).forEach(([I,Y])=>{if(!Y)return;(I.replace(/_/g," ").toLowerCase().includes(V)||Y.toLowerCase().includes(V))&&k.push({type:"cr",key:I,code:Y})})}else o===t?Object.entries(ot).forEach(([V,I])=>{I&&k.push({type:"cr",key:V,code:I})}):o==="PERSONAL_LIBRARY"?Ce.getSnippets("email").forEach(V=>{k.push({type:"email",data:{name:V.title,subject:V.subject||"Sem Assunto",body:V.content}})}):at[o]&&at[o].emails.forEach(V=>{k.push({type:"email",data:V})});if(k.length===0){R.innerHTML=`
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F50D}</div>
                    <div style="font-size:14px; font-weight:500;">Nenhum template encontrado</div>
                    <div style="font-size:12px; margin-top:4px;">Tente outro termo de busca</div>
                </div>`;return}let L='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1967D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',F='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA8600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',j='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BDC1C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';k.forEach(V=>{let I=document.createElement("div");if(Object.assign(I.style,T),V.type==="email"){let Y=V.data,Q=Y.subject.length>45?Y.subject.substring(0,45)+"...":Y.subject;I.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#E8F0FE; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${L}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${Y.name}</div>
                        <div style="font-size:12px; color:#5F6368; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${Q}</div>
                    </div>
                    <div style="margin-left:12px; opacity:0.6;">${j}</div>
                `,I.onclick=()=>u(Y)}else{let Y=V.key.replace(/_/g," ").replace("AS ","AS - ").replace("NI ","NI - ");I.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#FEF7E0; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${F}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; margin-bottom:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${Y}</div>
                        <div style="font-size:11px; font-weight:500; color:#EA8600; font-family:'Roboto Mono', monospace; letter-spacing:-0.2px;">${V.code}</div>
                    </div>
                    <div style="font-size:10px; font-weight:700; color:#DADCE0; text-transform:uppercase; letter-spacing:0.5px; border:1px solid #F1F3F4; padding:4px 8px; border-radius:6px; margin-left:12px;">Inserir</div>
                `,I.onclick=()=>{I.style.transform="scale(0.98)",I.style.background="#FEF7E0",setTimeout(()=>{I.style.transform="scale(1)",I.style.background="#fff",q(V.code,"cr")},150)}}I.onmouseenter=()=>{I.style.transform="translateY(-2px)",I.style.boxShadow=a.shadowHover,V.type==="cr"?I.style.borderLeft="3px solid #Fbbc04":I.style.borderLeft="3px solid #1a73e8"},I.onmouseleave=()=>{I.style.transform="translateY(0)",I.style.boxShadow=a.shadowCard,I.style.borderLeft="1px solid transparent"},R.appendChild(I)})}return N.addEventListener("input",k=>{n=k.target.value,n!==""?Array.from(D.children).forEach(z=>{Object.assign(z.style,h),z.style.opacity="0.6"}):y(),A()}),y(),A(),H}var Go={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function jo(){let e="v2.6 (Context HD)",t="csa-local-styles";if(!document.getElementById(t)){let c=document.createElement("style");c.id=t,c.innerHTML=`
        @keyframes csa-pulse-green {
            0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
            70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
            100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        .csa-live-dot {
            width: 8px; height: 8px; 
            background: #10B981; border-radius: 50%;
            animation: csa-pulse-green 2s infinite;
        }
        .csa-data-pill {
            background: #F8F9FA; border: 1px solid transparent;
            border-radius: 10px; padding: 8px 12px;
            cursor: pointer; position: relative; overflow: hidden;
            transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .csa-data-pill:hover {
            background: #FFFFFF; border-color: #DADCE0;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
            transform: translateY(-1px);
        }
        .csa-data-pill:active { transform: scale(0.98); }
        
        .csa-data-pill.copied {
            background: #E6F4EA !important;
            border-color: #34A853 !important;
        }
        .csa-copy-hint {
            position: absolute; right: 8px; top: 50%; transform: translateY(-50%);
            font-size: 10px; color: #1E8E3E; font-weight: 700; text-transform: uppercase;
            opacity: 0; transition: opacity 0.2s; pointer-events: none;
        }
        .csa-data-pill.copied .csa-copy-hint { opacity: 1; }
        .csa-data-pill.copied .csa-data-value { opacity: 0.3; } /* Diminui texto pra destacar o "Copiado" */
      `,document.head.appendChild(c)}let o={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#FFFFFF",scrollBehavior:"smooth"},card:{background:"#FFFFFF",border:"1px solid #E5E7EB",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"12px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"8px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.1s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.6",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"18px",height:"18px",borderRadius:"6px",border:"2px solid #DADCE0",marginRight:"12px",marginTop:"2px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #F1F3F4",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"},contextBanner:{padding:"20px 20px 16px 20px",background:"#FFFFFF",borderBottom:"1px solid #F1F3F4",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.02)",position:"relative",zIndex:"5"}},n={},s="PT",i="BAU",a=!1,r=document.createElement("div");r.id="call-script-popup",r.classList.add("cw-module-window"),Object.assign(r.style,Oe,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let d={popup:r,googleLine:null},l=null;function p(){a&&Ge().then(c=>{let y=r.querySelector("#cw-ctx-name"),A=r.querySelector("#cw-ctx-cid"),k=r.querySelector("#cw-ctx-email");if(y&&(y.textContent=c.advertiserName||"Cliente Desconhecido"),A){let z=c.cid||"---";A.textContent!==z&&(A.textContent=z)}if(k){let z=c.clientEmail||"N\xE3o encontrado";k.textContent!==z&&(k.textContent=z,k.title=z)}})}function g(){a=!a,qe(a,r,"cw-btn-script"),a?(p(),l||(l=setInterval(p,2e3))):l&&(clearInterval(l),l=null)}let x=Fe(r,"Call Script",e,"Guia interativo para condu\xE7\xE3o de chamadas.",d,()=>{g()});r.appendChild(x);let h=document.createElement("div");Object.assign(h.style,o.contextBanner),h.innerHTML=`
      <div style="display:flex; justify-content:space-between; align-items:center;">
          <div style="display:flex; align-items:center; gap:10px;">
              <div class="csa-live-dot" title="Monitoramento Ativo"></div>
              <span id="cw-ctx-name" style="font-family:'Google Sans'; font-size:16px; font-weight:500; color:#202124;">Carregando...</span>
          </div>
          <div style="font-size:10px; font-weight:700; color:#1A73E8; background:#E8F0FE; padding:2px 8px; border-radius:4px; text-transform:uppercase;">Live</div>
      </div>
      
      <div style="display:grid; grid-template-columns: 1fr 1.5fr; gap: 10px;">
          <div class="csa-data-pill" id="cw-pill-cid">
              <div style="font-size:9px; font-weight:700; color:#5F6368; text-transform:uppercase; margin-bottom:2px; letter-spacing:0.5px;">CID (Conta)</div>
              <div id="cw-ctx-cid" class="csa-data-value" style="font-family:'Roboto Mono', monospace; font-size:13px; font-weight:500; color:#1A73E8;">---</div>
              <div class="csa-copy-hint">Copiado!</div>
          </div>
          
          <div class="csa-data-pill" id="cw-pill-email">
              <div style="font-size:9px; font-weight:700; color:#5F6368; text-transform:uppercase; margin-bottom:2px; letter-spacing:0.5px;">Email de Contato</div>
              <div id="cw-ctx-email" class="csa-data-value" style="font-family:'Roboto', sans-serif; font-size:13px; color:#3C4043; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">---</div>
              <div class="csa-copy-hint">Copiado!</div>
          </div>
      </div>
  `;let f=(c,y)=>{let A=h.querySelector(c),k=h.querySelector(y);A.onclick=()=>{let z=k.textContent;!z||z.includes("---")||z.includes("N\xE3o encontrado")||(navigator.clipboard.writeText(z),W.playSuccess(),A.classList.add("copied"),setTimeout(()=>A.classList.remove("copied"),1500))}};r.appendChild(h);let b=document.createElement("div");Object.assign(b.style,o.progressBarContainer);let T=document.createElement("div");Object.assign(T.style,o.progressBarFill),b.appendChild(T),r.appendChild(b);let S=document.createElement("div");S.id="csa-content",Object.assign(S.style,o.contentArea),r.appendChild(S);let $=document.createElement("div");Object.assign($.style,o.footer);let H=document.createElement("span");H.textContent="by lucaste@",Object.assign(H.style,{fontSize:"10px",color:"#bdc1c6"});let B=document.createElement("button");B.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> Resetar Script',Object.assign(B.style,o.resetBtn),B.onmouseenter=()=>B.style.background="#fce8e6",B.onmouseleave=()=>B.style.background="transparent",B.onclick=()=>{B.style.transform="scale(0.9)",setTimeout(()=>B.style.transform="scale(1)",150);for(let c in n)delete n[c];w()},$.appendChild(H),$.appendChild(B),r.appendChild($);let C=document.createElement("div");Object.assign(C.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let E=document.createElement("div");Object.assign(E.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let O=document.createElement("div");O.textContent="BAU";let M=document.createElement("div");M.textContent="LT",Object.assign(O.style,Ie),Object.assign(M.style,Ie),E.appendChild(O),E.appendChild(M);let N=document.createElement("select");Object.assign(N.style,Tt,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),N.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',N.value=s,C.appendChild(E),C.appendChild(N),S.appendChild(C);let D=document.createElement("div");D.id="csa-checklist-area",S.appendChild(D);let R=document.createElement("div");Object.assign(R.style,We),R.className="no-drag",R.title="Redimensionar",r.appendChild(R),Ye(r,R),document.body.appendChild(r),f("#cw-pill-cid","#cw-ctx-cid"),f("#cw-pill-email","#cw-ctx-email");function G(c){return c}function w(){D.innerHTML="";let c=`${s} ${i}`,y=Go[c];if(!y){D.innerHTML='<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;"><div style="font-size: 24px;">\u2615</div><div>Script n\xE3o configurado.</div></div>',T.style.width="0%";return}let A=y.color||"#1a73e8",k=0,z=0;["inicio","meio","fim"].forEach(L=>{y[L]&&(k+=y[L].length)}),["inicio","meio","fim"].forEach((L,F)=>{let j=y[L];if(!j||j.length===0)return;let V=document.createElement("div");Object.assign(V.style,o.card);let I=document.createElement("div");Object.assign(I.style,o.cardTitle);let Y="";L==="inicio"?s.includes("ES")?Y="Apertura":s.includes("EN")?Y="Opening":Y="Abertura":L==="meio"?s.includes("ES")?Y="Implementaci\xF3n":s.includes("EN")?Y="Implementation":Y="Implementa\xE7\xE3o (Tag Support)":L==="fim"&&(s.includes("ES")?Y="Cierre":s.includes("EN")?Y="Closing":Y="Fechamento"),I.textContent=Y;let Q=document.createElement("span");Q.style.fontSize="11px",Q.style.opacity="0.7",Q.style.fontWeight="500",Q.style.background="#f1f3f4",Q.style.padding="2px 8px",Q.style.borderRadius="10px",I.appendChild(Q),V.appendChild(I);let be=0;j.forEach((ge,ke)=>{let se=`${c}-${L}-${ke}`,we=!!n[se];we&&(z++,be++);let pe=document.createElement("div");Object.assign(pe.style,o.itemRow);let ee=document.createElement("div");Object.assign(ee.style,o.checkbox);let de=document.createElement("span");de.innerHTML=ge,de.style.flex="1",we?(Object.assign(pe.style,o.itemCompleted),ee.style.background=A,ee.style.borderColor=A,ee.style.transform="scale(1)",ee.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(pe.style.textDecoration="none",pe.style.opacity="1",ee.style.background="transparent",ee.style.borderColor="#dadce0",ee.style.transform="scale(1)",ee.innerHTML=""),pe.onclick=()=>{let ce=!n[se];n[se]=ce,W.playClick(),ce?(ee.style.transform="scale(1.2)",setTimeout(()=>ee.style.transform="scale(1)",150),Object.assign(pe.style,o.itemCompleted),ee.style.background=A,ee.style.borderColor=A,ee.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(pe.style.textDecoration="none",pe.style.opacity="1",ee.style.background="transparent",ee.style.borderColor="#dadce0",ee.innerHTML=""),q(c,y)},pe.onmouseenter=()=>{n[se]||(pe.style.background="#f1f3f4",ee.style.borderColor=A)},pe.onmouseleave=()=>{n[se]||(pe.style.background="transparent",ee.style.borderColor="#dadce0")},pe.appendChild(ee),pe.appendChild(de),V.appendChild(pe)}),be===j.length&&j.length>0&&(Q.style.color="#1e8e3e",Q.style.background="#e6f4ea",V.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),Q.textContent=`${be}/${j.length}`,D.appendChild(V)}),u(k,z)}function q(c,y){let A=0,k=0;["inicio","meio","fim"].forEach(z=>{let L=y[z]||[];A+=L.length,L.forEach((F,j)=>{n[`${c}-${z}-${j}`]&&k++})}),u(A,k),setTimeout(()=>w(),200)}function u(c,y){let A=c===0?0:y/c*100;T.style.width=`${A}%`,T.style.background=A===100?"#34A853":"linear-gradient(90deg, #4285F4, #34A853)"}function v(c){i=c;let y=ut();Object.assign(O.style,Ie),Object.assign(M.style,Ie),Object.assign(c==="BAU"?O.style:M.style,y),w()}return O.onclick=()=>v("BAU"),M.onclick=()=>v("LT"),N.addEventListener("change",c=>{s=c.target.value,w()}),v(i),g}var ht={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]}},it={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},_t={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}},Qt="cw_link_history_v4";function Po(e,t){try{let o=JSON.parse(localStorage.getItem(Qt)||"[]");o=o.filter(n=>n.url!==e.url),o.unshift({...e,_originalCat:t}),o=o.slice(0,3),localStorage.setItem(Qt,JSON.stringify(o))}catch(o){console.warn("Erro ao salvar hist\xF3rico",o)}}function fn(){try{return JSON.parse(localStorage.getItem(Qt)||"[]")}catch{return[]}}function Ho(){let e="v4.6",t="",o=!1,n=null,s=!1,i={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},a=document.createElement("div");a.id="links-popup",a.classList.add("cw-module-window"),Object.assign(a.style,Oe,{right:"100px",width:"600px",height:"650px",background:i.bgApp,overflow:"hidden"});let d=Fe(a,"Central de Links",e,"Navegue pelas categorias ou use a busca.",{popup:a,googleLine:null},()=>R());a.appendChild(d);let l=document.createElement("div");l.style.cssText="display: flex; height: calc(100% - 56px); width: 100%; position: relative;",a.appendChild(l);let p=document.createElement("div");p.style.cssText=`
      width: 80px; flex-shrink: 0; background: ${i.bgSidebar};
      border-right: 1px solid ${i.borderSubtle};
      display: flex; flex-direction: column; align-items: center;
      padding: 16px 0; overflow-y: auto; gap: 8px;
      scrollbar-width: none; z-index: 2;
  `,l.appendChild(p);let g=document.createElement("div");g.style.cssText="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F8F9FA; position: relative; z-index: 1;",l.appendChild(g);let x=document.createElement("div");x.style.cssText="padding: 16px 24px; flex-shrink: 0; background: transparent;";let h=document.createElement("div");h.style.cssText=`
      position: relative; width: 100%; height: 44px;
      border-radius: 12px; border: 1px solid transparent;
      background: #FFFFFF; transition: all 0.2s;
      display: flex; align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  `;let f=document.createElement("div");f.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',f.style.cssText="margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none;";let b=document.createElement("input");b.type="text",b.placeholder="Buscar ferramenta ou SOP...",b.style.cssText=`
      flex: 1; height: 100%; border: none; background: transparent;
      padding: 0 12px; font-size: 14px; color: ${i.textPrimary};
      outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
  `,b.onfocus=()=>{h.style.boxShadow="0 4px 12px rgba(26,115,232,0.15)",h.style.border="1px solid #1a73e8"},b.onblur=()=>{h.style.boxShadow="0 2px 6px rgba(0,0,0,0.04)",h.style.border="1px solid transparent"},h.appendChild(f),h.appendChild(b),x.appendChild(h),g.appendChild(x);let T=document.createElement("div");T.style.cssText="flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth;",g.appendChild(T);let S=null;function $(){if(S)return;S=document.createElement("div"),S.style.cssText=`
          position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255,255,255,0.98); z-index: 20;
          display: flex; flex-direction: column;
          transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
      `;let G=document.createElement("div");G.style.cssText="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4;",G.innerHTML='<span style="font-size: 16px; font-weight: 700; color: #202124;">\u{1F552} Recentes</span>';let w=document.createElement("button");w.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',w.style.cssText="background: none; border: none; cursor: pointer; color: #5f6368;",w.onclick=()=>{B(),s=!1,M()},G.appendChild(w),S.appendChild(G);let q=document.createElement("div");q.id="cw-history-list",q.style.cssText="flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA;",S.appendChild(q),g.appendChild(S)}function H(){S||$();let G=S.querySelector("#cw-history-list");G.innerHTML="";let w=fn();w.length===0?G.innerHTML='<div style="text-align: center; color: #999; margin-top: 60px; font-size:13px;">Nada por aqui ainda.</div>':w.forEach(q=>{let u=D(q,it[q._originalCat],!0,q._originalCat);G.appendChild(u)}),requestAnimationFrame(()=>S.style.transform="translateY(0)")}function B(){S&&(S.style.transform="translateY(100%)")}function C(){p.innerHTML="";let G=E("history","Recentes",it.history);G.id="cw-sidebar-btn-history",G.onclick=()=>{W.playClick(),s=!s,s?H():B(),M()},p.appendChild(G);let w=document.createElement("div");w.style.cssText="width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0;",p.appendChild(w),Object.keys(ht).forEach(q=>{let u=ht[q],v=E(q,u.label,it[q]);v.id=`cw-sidebar-btn-${q}`,v.onclick=()=>{W.playClick(),s&&(s=!1,B()),O(q)},p.appendChild(v)})}function E(G,w,q){let u=document.createElement("div");u.style.cssText=`
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; color: ${i.textSecondary}; 
          transition: all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1);
          position: relative;
      `,u.title=w,u.dataset.key=G;let v=document.createElement("div");v.style.cssText="width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s;",v.innerHTML=q||it.tasks;let c=document.createElement("div");return c.style.cssText="font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px;",c.textContent=w,u.appendChild(v),u.appendChild(c),u.onmouseenter=()=>{n!==G&&!(G==="history"&&s)&&(u.style.background="#F1F3F4",v.style.transform="scale(1.1)")},u.onmouseleave=()=>{n!==G&&!(G==="history"&&s)&&(u.style.background="transparent",v.style.transform="scale(1)")},u}function O(G){let w=document.getElementById(`cat-anchor-${G}`);w&&(w.scrollIntoView({behavior:"smooth",block:"start"}),n=G,M())}function M(){Object.keys(ht).forEach(w=>{let q=p.querySelector(`#cw-sidebar-btn-${w}`);if(q)if(n===w&&!s){let u=_t[w];q.style.background=u.bg,q.style.color=u.color,q.querySelector("div:first-child").style.transform="scale(1.1)"}else q.style.background="transparent",q.style.color=i.textSecondary,q.querySelector("div:first-child").style.transform="scale(1)"});let G=p.querySelector("#cw-sidebar-btn-history");G&&(s?(G.style.background="#3C4043",G.style.color="#FFFFFF"):(G.style.background="transparent",G.style.color=i.textSecondary))}function N(){if(T.innerHTML="",t.trim()!==""){let w=[];if(Object.entries(ht).forEach(([u,v])=>{let c=v.links.filter(y=>y.name.toLowerCase().includes(t.toLowerCase())||y.desc.toLowerCase().includes(t.toLowerCase()));w.push(...c.map(y=>({...y,_cat:u})))}),w.length===0){T.innerHTML='<div style="text-align:center; padding: 60px; color:#999; font-size:13px;">Nada encontrado.</div>';return}let q=document.createElement("div");q.innerHTML="Resultados da busca",q.style.cssText="font-size:12px; font-weight:700; color:#5f6368; margin:20px 0 10px; text-transform:uppercase; letter-spacing:0.5px;",T.appendChild(q),w.forEach(u=>{let v=D(u,it[u._cat],!1,u._cat);T.appendChild(v)});return}Object.entries(ht).forEach(([w,q])=>{let u=_t[w],v=document.createElement("div"),c=document.createElement("div");c.id=`cat-anchor-${w}`,c.style.cssText=`
              display: flex; align-items: center; gap: 8px;
              font-size: 13px; font-weight: 800; color: ${u.color}; 
              text-transform: uppercase; letter-spacing: 0.5px;
              margin: 32px 0 12px 0; padding-top: 10px;
          `,c.innerHTML=`
            <div style="width:8px; height:8px; border-radius:50%; background:${u.color};"></div>
            ${q.label}
          `,v.appendChild(c);let y=document.createElement("div");y.style.cssText="display: grid; grid-template-columns: 1fr; gap: 8px;",q.links.forEach(A=>{let k=D(A,it[w],!1,w);y.appendChild(k)}),v.appendChild(y),T.appendChild(v)});let G=document.createElement("div");G.style.height="80px",T.appendChild(G)}function D(G,w,q,u){let v=document.createElement("div"),c=_t[u]||_t.history;v.style.cssText=`
          display: flex; align-items: center; gap: 16px;
          padding: 12px 16px; 
          background: #FFFFFF; 
          border: 1px solid transparent;
          border-radius: 16px; 
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative; overflow: hidden;
      `;let y=document.createElement("div");y.style.cssText=`
          width: 40px; height: 40px; border-radius: 12px;
          background: ${c.bg}; color: ${c.color};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
      `,y.innerHTML=w||it.tasks;let A=y.querySelector("svg");A&&(A.style.width="22px",A.style.height="22px");let k=document.createElement("div");k.style.cssText="flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden;";let z=document.createElement("div");z.style.cssText=`font-size: 14px; font-weight: 600; color: ${i.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,z.textContent=G.name;let L=document.createElement("div");L.style.cssText=`font-size: 12px; color: ${i.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,L.textContent=G.desc,k.appendChild(z),k.appendChild(L);let F=document.createElement("div");return F.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',F.style.cssText=`
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9AA0A6; transition: all 0.2s; opacity: 0;
      `,F.title="Copiar URL",v.onmouseenter=()=>{v.style.transform="translateY(-2px)",v.style.boxShadow="0 8px 20px rgba(0,0,0,0.08)",v.style.borderColor="rgba(0,0,0,0.05)",v.style.borderLeft=`4px solid ${c.color}`,F.style.opacity="1",F.style.background="#F1F3F4"},v.onmouseleave=()=>{v.style.transform="translateY(0)",v.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",v.style.border="1px solid transparent",F.style.opacity="0",F.style.background="transparent"},v.onclick=()=>{!q&&u&&Po(G,u),window.open(G.url,"_blank")},F.onclick=j=>{j.stopPropagation(),W.playClick(),navigator.clipboard.writeText(G.url),!q&&u&&Po(G,u),U("Link copiado!")},v.appendChild(y),v.appendChild(k),v.appendChild(F),v}b.addEventListener("input",G=>{t=G.target.value,N()});function R(){o=!o,qe(o,a,"cw-btn-links")}return document.body.appendChild(a),C(),N(),R}var Xe=[];function Zt(e){Xe=e}var xn=["lucaste","ricardogi"],hn=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function $o(){let e="v4.9",t=!1,o=null,n=null;function s(u){if(!u)return"";try{let v=new Date(u);return isNaN(v.getTime())?String(u):v.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(u)}}if(!document.getElementById("cw-broadcast-hd-css")){let u=document.createElement("style");u.id="cw-broadcast-hd-css",u.innerHTML=`
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
      `,document.head.appendChild(u)}let i={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},a={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function r(u){return u?Object.entries(u).map(([v,c])=>`${v.replace(/[A-Z]/g,y=>"-"+y.toLowerCase())}:${c}`).join(";"):""}function d(u){if(!u||typeof u!="string")return"";let v=u;return v=v.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),v=v.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),v=v.replace(/_(.*?)_/g,"<i>$1</i>"),v=v.replace(/\n/g,"<br>"),v=yo(v),v}let l=document.createElement("div");l.id="broadcast-popup",l.classList.add("cw-module-window"),Object.assign(l.style,Oe,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let p={popup:l,googleLine:null};function g(){if(t=!t,qe(t,l,"cw-btn-broadcast"),t){let u=document.getElementById("cw-btn-broadcast");u&&u.classList.remove("has-new"),O()}}let x=Fe(l,"Central de Avisos",e,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",p,()=>g()),h=x.querySelector(".cw-header-actions")||x.lastElementChild,f=null;function b(){let u=null;try{u=Ue()}catch{console.warn("TechSol: Auth Pending")}if(u){let v=u.split("@")[0].toLowerCase(),c=xn.includes(v);if(window._cwIsAdmin=c,window._cwCurrentUser=v,c&&h&&!h.querySelector("#cw-admin-btn")){let y=document.createElement("div");y.id="cw-admin-btn",y.className="cw-btn-interactive",y.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(y.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),y.title="Novo Aviso",y.onclick=A=>{A.stopPropagation(),$()},h.insertBefore(y,h.firstChild),f||S(),N()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(b,2e3))}if(h){let u=document.createElement("button");u.textContent="Limpar",u.className="cw-btn-interactive",Object.assign(u.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),u.onclick=v=>{v.stopPropagation(),W.playSuccess();let c=Xe.map(y=>y.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(c)),N(),M()},h.insertBefore(u,h.firstChild)}l.appendChild(x);let T=document.createElement("div");T.id="cw-update-status",T.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",l.appendChild(T);function S(){f=document.createElement("div"),f.className="cw-editor-overlay",f.innerHTML=`
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
      `,f.querySelectorAll('input[name="cw-bc-type"]').forEach(y=>{y.addEventListener("change",()=>{f.querySelectorAll(".cw-radio-option").forEach(A=>A.classList.remove("checked")),y.parentElement.classList.add("checked")})}),setTimeout(()=>{let y=f.querySelector(".cw-radio-option.info");y&&y.classList.add("checked")},100);let u=f.querySelector("#cw-bc-cancel"),v=f.querySelector("#cw-bc-close-x"),c=f.querySelector("#cw-bc-send");u.onclick=H,v.onclick=H,c.onclick=B,l.appendChild(f)}function $(u=null){if(!f)return;let v=f.querySelector("#cw-editor-title-label"),c=f.querySelector("#cw-bc-title"),y=f.querySelector("#cw-bc-text"),A=f.querySelector("#cw-bc-send");if(u){n=u.id,v.textContent="Editar Aviso",c.value=u.title||"",y.value=u.text||"",A.textContent="Salvar Altera\xE7\xF5es";let k=u.type||"info",z=f.querySelector(`input[name="cw-bc-type"][value="${k}"]`);z&&z.click()}else{n=null,v.textContent="Novo Aviso",c.value="",y.value="",A.textContent="Publicar";let k=f.querySelector('input[name="cw-bc-type"][value="info"]');k&&k.click()}f.classList.add("active"),setTimeout(()=>c.focus(),300)}function H(){f&&f.classList.remove("active"),n=null}async function B(){let u=f.querySelector("#cw-bc-send"),v=f.querySelector("#cw-bc-title"),c=f.querySelector("#cw-bc-text"),y=f.querySelector('input[name="cw-bc-type"]:checked'),A=y?y.value:"info";if(!v.value.trim()||!c.value.trim()){U("Preencha todos os campos!",{error:!0});return}u.textContent="Salvando...",u.style.opacity="0.7";let k=!1;n?k=await xe.updateBroadcast(n,{title:v.value,text:c.value,type:A}):k=await xe.sendBroadcast({title:v.value,text:c.value,type:A,author:window._cwCurrentUser||"admin"}),k?(U(n?"Atualizado!":"Publicado!"),W.playSuccess(),H(),setTimeout(()=>O(),1500)):(U("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),u.textContent=n?"Salvar Altera\xE7\xF5es":"Publicar",u.style.opacity="1")}async function C(u){if(confirm("Confirma a exclus\xE3o deste aviso?"))if(await xe.deleteBroadcast(u)){U("Aviso removido."),W.playClick();let c=Xe.findIndex(y=>y.id===u);c>-1&&Xe.splice(c,1),N(),setTimeout(()=>O(),1500)}else U("Erro ao excluir.",{error:!0})}let E=document.createElement("div");E.className="cw-nice-scroll",Object.assign(E.style,i.feedContainer),l.appendChild(E);async function O(){t&&(T.style.display="block",T.innerHTML="\u{1F504} Sincronizando...");try{let u=await xe.fetchData();u&&u.broadcast&&(Zt(u.broadcast),M(),t&&(N(),T.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{T.style.display="none"},1500)))}catch{t&&(T.innerHTML="\u26A0\uFE0F Offline")}}function M(){let u=document.getElementById("cw-btn-broadcast");if(!u)return;let v=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(Xe.some(y=>!v.includes(y.id))){if(u.classList.add("has-new"),!u.querySelector(".cw-badge")){let y=document.createElement("div");y.className="cw-badge",Object.assign(y.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),u.appendChild(y)}}else{u.classList.remove("has-new");let y=u.querySelector(".cw-badge");y&&y.remove()}}function N(){E.innerHTML="";let u=l.querySelector("#cw-bau-widget");u&&u.remove();let v=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),c=[...Xe].sort((L,F)=>{let j=new Date(L.date).getTime()||0;return(new Date(F.date).getTime()||0)-j}),y=c.findIndex(L=>L.title&&L.title.toLowerCase().includes("disponibilidade bau"));if(y!==-1){let L=c[y];c.splice(y,1);let F=document.createElement("div");F.id="cw-bau-widget",Object.assign(F.style,i.bauContainer);let j=[],V=(L.text||"").split(`
`),I=/\d{1,2}\/\d{1,2}/,Y="\u{1F4C5}";if(V.forEach(se=>{/🇧🇷|🇵🇹|PT|BR|BRASIL|BRAZIL|PORTUGAL|LISBOA/i.test(se)?Y="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM|ESPANHA|SPAIN|MEXICO|MÉXICO/i.test(se)&&(Y="\u{1F1EA}\u{1F1F8}");let we=se.match(I);if(we){let pe=we[0],ee=Y;/🇧🇷|🇵🇹|PT|BR/i.test(se)?ee="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(se)&&(ee="\u{1F1EA}\u{1F1F8}"),j.some(ce=>ce.flag===ee&&ce.date===pe)||j.push({flag:ee,date:pe})}}),j.length===0){let se=(L.text||"").match(/\d{1,2}\/\d{1,2}/g);se&&[...new Set(se)].forEach(we=>j.push({flag:"\u{1F4C5}",date:we}))}let Q="",be='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(be=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${be}
              `),j.length>0?Q=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${j.map(we=>`
                  <div style="${r(i.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${r(i.bauFlag)}">${we.flag}</span>
                      <span style="${r(i.bauDate)}">${we.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${be}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${d(L.text)}</div>
              `:Q=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${d(L.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,F.innerHTML=`
              <div style="${r(i.bauHeader)}; margin-bottom:8px;">
                  <div style="${r(i.liveIndicator)}">
                      <div style="${r(i.pulseDot)}"></div>
                      <span style="${r(i.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${s(L.date)}</div>
              </div>
              ${Q}
          `,T.after(F);let ge=F.querySelector("#cw-bau-toggle-btn"),ke=F.querySelector("#cw-bau-full");if(ge&&ke&&(ge.onclick=()=>{let se=ke.style.display==="none";ke.style.display=se?"block":"none",ge.textContent=se?"Ocultar":"Detalhes"}),window._cwIsAdmin){let se=F.querySelector(".cw-bau-edit");se&&(se.onclick=()=>$(L))}}let A=c.sort((L,F)=>{let j=v.includes(L.id),V=v.includes(F.id);return j===V?0:j?1:-1});if(A.length===0&&!y){let L=document.createElement("div");Object.assign(L.style,i.emptyState),L.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,E.appendChild(L)}let k=A.filter(L=>!v.includes(L.id)),z=A.filter(L=>v.includes(L.id));if(k.forEach(L=>E.appendChild(D(L,!1))),z.length>0){let L=document.createElement("div");Object.assign(L.style,i.historyDivider),L.innerHTML=`<span>Hist\xF3rico (${z.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let F=document.createElement("div");Object.assign(F.style,i.historyContainer),z.forEach(V=>F.appendChild(D(V,!0)));let j=!1;L.onclick=()=>{W.playClick(),j=!j,F.style.display=j?"flex":"none",L.querySelector("svg").style.transform=j?"rotate(180deg)":"rotate(0deg)"},E.appendChild(L),E.appendChild(F)}}function D(u,v){let c=document.createElement("div");Object.assign(c.style,v?i.cardHistory:i.card);let y=a[u.type]||a.info,A=document.createElement("div");Object.assign(A.style,i.cardHeader);let k=document.createElement("div");Object.assign(k.style,i.typeTag,{color:y.color,background:y.bg}),k.innerHTML=`${y.icon} <span>${u.type}</span>`;let z=document.createElement("span");if(Object.assign(z.style,i.dateTag),z.textContent=s(u.date),A.appendChild(k),v)A.appendChild(z);else{let I=document.createElement("button");I.className="cw-btn-interactive",Object.assign(I.style,i.dismissBtn),I.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',I.onmouseenter=()=>{I.style.color="#1e8e3e",I.style.background="#e6f4ea",I.style.borderColor="#1e8e3e"},I.onmouseleave=()=>{I.style.color="#5f6368",I.style.background="#fff",I.style.borderColor="rgba(0,0,0,0.1)"},I.onclick=Y=>{Y.stopPropagation(),W.playClick(),c.style.transform="translateX(20px)",c.style.opacity="0",setTimeout(()=>{let Q=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");Q.push(u.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(Q)),N(),M()},200)},A.appendChild(I)}let L=document.createElement("div");Object.assign(L.style,i.cardContent);let F=document.createElement("div");Object.assign(F.style,i.msgTitle),F.textContent=u.title;let j=document.createElement("div");Object.assign(j.style,i.msgBody),j.innerHTML=d(u.text);let V=document.createElement("div");if(Object.assign(V.style,i.msgMeta),V.innerHTML=`Publicado por <b>${u.author||"Sistema"}</b>`,v||(V.innerHTML+=` \u2022 ${s(u.date)}`),L.appendChild(F),L.appendChild(j),L.appendChild(V),c.appendChild(A),c.appendChild(L),window._cwIsAdmin){let I=document.createElement("div");I.className="cw-card-actions";let Y=document.createElement("button");Y.className="cw-action-btn edit",Y.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',Y.onclick=()=>$(u);let Q=document.createElement("button");Q.className="cw-action-btn delete",Q.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',Q.onclick=()=>C(u.id),I.appendChild(Y),I.appendChild(Q),c.appendChild(I)}return c}let R=xe.getCachedBroadcasts();R.length>0&&(Zt(R),N()),setTimeout(b,500),O(),o||(o=setInterval(O,hn));let G=document.createElement("div");Object.assign(G.style,We),G.className="no-drag",l.appendChild(G),Ye(l,G),document.body.appendChild(l);let w=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),q=Xe.some(u=>!w.includes(u.id));return{toggle:g,hasUnread:q}}function Vo(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let e=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],t=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},n=document.createElement("div");Object.assign(n.style,o.overlay);let s=document.createElement("div");Object.assign(s.style,o.card);let i=document.createElement("div");Object.assign(i.style,o.icon);let a=document.createElement("div");Object.assign(a.style,o.title);let r=document.createElement("div");Object.assign(r.style,o.text);let d=document.createElement("div");Object.assign(d.style,o.dotsContainer);let l=document.createElement("div");Object.assign(l.style,o.btnContainer);let p=document.createElement("button");p.textContent="Pular",Object.assign(p.style,o.btn,o.btnSkip),p.onmouseover=()=>p.style.color="#202124",p.onmouseout=()=>p.style.color="#5f6368";let g=document.createElement("button");g.textContent="Pr\xF3ximo",Object.assign(g.style,o.btn,o.btnNext),g.onmouseover=()=>g.style.transform="scale(1.05)",g.onmouseout=()=>g.style.transform="scale(1)",l.appendChild(p),l.appendChild(g),s.appendChild(i),s.appendChild(a),s.appendChild(r),s.appendChild(d),s.appendChild(l),n.appendChild(s),document.body.appendChild(n);function x(f){let b=e[f];i.textContent=b.icon,a.textContent=b.title,r.textContent=b.text,d.innerHTML="",e.forEach((T,S)=>{let $=document.createElement("div");Object.assign($.style,o.dot),S===f&&Object.assign($.style,o.dotActive),d.appendChild($)}),b.isLast?(p.style.display="none",g.textContent="Come\xE7ar \u{1F680}",g.style.width="100%"):(p.style.display="block",g.textContent="Pr\xF3ximo",g.style.width="auto")}function h(){localStorage.setItem("cw_onboarding_seen_v1","true"),n.style.opacity="0",s.style.transform="translateY(20px)",setTimeout(()=>n.remove(),400),W.playSuccess(),U("Tudo pronto! Use o menu flutuante.")}g.onclick=()=>{W.playClick(),t<e.length-1?(t++,x(t)):h()},p.onclick=()=>{confirm("Pular o tutorial?")&&h()},x(0),requestAnimationFrame(()=>{n.style.opacity="1",s.style.transform="translateY(0)"})}var Uo={version:"v5.1",title:"Atualiza\xE7\xE3o: v5.1 - Produtividade Blindada \u{1F6E1}\uFE0F",slides:[{icon:"\u{1F17F}\uFE0F",title:"Estacionamento de Casos",text:"Interrup\xE7\xE3o urgente? Agora voc\xEA pode 'Estacionar' seu atendimento atual (Notas + Tasks) com um clique e retomar depois exatamente de onde parou."},{icon:"\u{1F6DF}",title:"Sistema 'Airbag'",text:"Caiu a internet? Fechou a aba sem querer? O TechSol agora possui Auto-Save de emerg\xEAncia a cada 5 segundos. Seu texto est\xE1 salvo, sempre."},{icon:"\u{1F7E0}",title:"Indicador de Progresso",text:"Nunca mais esque\xE7a uma nota aberta. Um indicador laranja ('Dirty State') avisa na P\xEDlula principal se h\xE1 trabalho n\xE3o salvo/estacionado."},{icon:"\u{1F50D}",title:"Time Zone Pro",text:"O m\xF3dulo de fusos hor\xE1rios ganhou superpoderes: nova barra de pesquisa global, filtros r\xE1pidos por regi\xE3o e corre\xE7\xE3o de visualiza\xE7\xE3o."},{icon:"\u{1F916}",title:"Leitura de BAU Aprimorada",text:"O sistema de Broadcast agora \xE9 mais inteligente ao ler avisos de disponibilidade, detectando datas e bandeiras mesmo quando quebradas em v\xE1rias linhas."},{icon:"\u{1F3A8}",title:"Refinamento Visual",text:"Bot\xF5es padronizados, sombras suavizadas e micro-intera\xE7\xF5es t\xE1teis em todo o sistema para uma experi\xEAncia mais fluida e profissional."}]};function Wo(e){let t=localStorage.getItem("cw_last_version");if(!t){localStorage.setItem("cw_last_version",e);return}t!==e&&yn(e)}function yn(e){let t=Uo.slides,o=0,n={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"400px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(30px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"12px",background:"#E8F0FE",color:"#1967D2",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",marginBottom:"16px",letterSpacing:"0.5px"},icon:{fontSize:"42px",marginBottom:"16px",display:"block"},title:{fontSize:"20px",fontWeight:"700",color:"#202124",marginBottom:"8px"},text:{fontSize:"14px",color:"#5f6368",lineHeight:"1.5",marginBottom:"32px",minHeight:"42px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"6px",marginBottom:"24px"},dot:{width:"6px",height:"6px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"18px",borderRadius:"4px"},btn:{width:"100%",padding:"12px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"all 0.2s",background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},s=document.createElement("div");Object.assign(s.style,n.overlay);let i=document.createElement("div");Object.assign(i.style,n.card);let a=document.createElement("div");Object.assign(a.style,n.badge),a.textContent=`Atualiza\xE7\xE3o ${e}`;let r=document.createElement("div");Object.assign(r.style,n.icon);let d=document.createElement("div");Object.assign(d.style,n.title);let l=document.createElement("div");Object.assign(l.style,n.text);let p=document.createElement("div");Object.assign(p.style,n.dotsContainer);let g=document.createElement("button");Object.assign(g.style,n.btn),g.onmouseover=()=>g.style.transform="scale(1.02)",g.onmouseout=()=>g.style.transform="scale(1)",i.appendChild(a),i.appendChild(r),i.appendChild(d),i.appendChild(l),i.appendChild(p),i.appendChild(g),s.appendChild(i),document.body.appendChild(s);function x(f){let b=t[f];r.textContent=b.icon,d.textContent=b.title,l.textContent=b.text,p.innerHTML="",t.forEach((T,S)=>{let $=document.createElement("div");Object.assign($.style,n.dot),S===f&&Object.assign($.style,n.dotActive),p.appendChild($)}),f===t.length-1?g.textContent="Entendi, vamos l\xE1! \u{1F44D}":g.textContent="Pr\xF3ximo"}function h(){localStorage.setItem("cw_last_version",e),s.style.opacity="0",i.style.transform="translateY(30px)",setTimeout(()=>s.remove(),400),W.playSuccess(),U(`TechSol atualizado para ${e}!`)}g.onclick=()=>{W.playClick(),o<t.length-1?(o++,x(o)):h()},x(0),requestAnimationFrame(()=>{s.style.opacity="1",i.style.transform="translateY(0)"})}var Yo="cw_timezone_pinned",eo=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],vn=[{id:"all",label:"Todos"},{id:"sa",label:"Am\xE9rica do Sul"},{id:"na",label:"Norte & Central"},{id:"eu",label:"Europa"}];function Xo(){let e="v2.2 Pro",t=!1,o=null,n="mx",s=JSON.parse(localStorage.getItem(Yo)||"[]"),i="",a="all",r=new Date;r.setHours(14,0,0,0);let d={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},l={container:{display:"flex",flexDirection:"column",height:"100%",background:d.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:d.surface,borderBottom:`1px solid ${d.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:d.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:d.primary,borderBottomColor:d.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:d.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:d.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${d.border}`,background:d.surface,color:d.textSub,transition:"all 0.2s"},chipActive:{background:d.primaryBg,color:d.primary,borderColor:d.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:d.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${d.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:d.surface,border:`1px solid ${d.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:d.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},p=document.createElement("div");p.id="timezone-popup",p.classList.add("cw-module-window"),Object.assign(p.style,Oe,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let x=Fe(p,"Time Zone Traveler",e,"Monitoramento global e planejamento de chamadas.",{popup:p},()=>v());p.appendChild(x);let h=document.createElement("div");Object.assign(h.style,l.container),p.appendChild(h);let f=document.createElement("div");Object.assign(f.style,l.tabHeader);let b=document.createElement("div");b.textContent="Monitoramento",Object.assign(b.style,l.tabBtn,l.tabActive);let T=document.createElement("div");T.textContent="Planejador",Object.assign(T.style,l.tabBtn),f.appendChild(b),f.appendChild(T),h.appendChild(f);let S=document.createElement("div");Object.assign(S.style,l.toolbar);let $=document.createElement("div");Object.assign($.style,l.searchInputWrapper);let H=document.createElement("div");H.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(H.style,l.searchIcon);let B=document.createElement("input");B.placeholder="Buscar cidade ou pa\xEDs...",Object.assign(B.style,l.searchInput),B.onfocus=()=>{B.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",B.style.borderColor="rgba(26,115,232,0.3)"},B.onblur=()=>{B.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",B.style.borderColor="transparent"},B.oninput=c=>{i=c.target.value.toLowerCase(),G()},$.appendChild(H),$.appendChild(B),S.appendChild($);let C=document.createElement("div");Object.assign(C.style,l.chipsRow),vn.forEach(c=>{let y=document.createElement("div");y.textContent=c.label,y.id=`tz-filter-${c.id}`,Object.assign(y.style,l.chip),c.id===a&&Object.assign(y.style,l.chipActive),y.onclick=()=>{W.playClick(),a=c.id,Array.from(C.children).forEach(A=>{Object.assign(A.style,l.chip)}),Object.assign(y.style,l.chipActive),G()},C.appendChild(y)}),S.appendChild(C),h.appendChild(S);let E=document.createElement("div");Object.assign(E.style,l.listContainer);let O=document.createElement("style");O.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",h.appendChild(O);let M=document.createElement("div");Object.assign(M.style,l.plannerWrapper,{display:"none"}),h.appendChild(E),h.appendChild(M),b.onclick=()=>N("live"),T.onclick=()=>N("plan");function N(c){W.playClick(),c==="live"?(Object.assign(b.style,l.tabActive),Object.assign(T.style,l.tabBtn),T.style.borderBottomColor="transparent",E.style.display="flex",S.style.display="flex",M.style.display="none",q()):(Object.assign(T.style,l.tabActive),Object.assign(b.style,l.tabBtn),b.style.borderBottomColor="transparent",M.style.display="flex",E.style.display="none",S.style.display="none",u(),w())}function D(c){return c>=9&&c<17?{color:d.success,bg:d.successBg,label:"Aberto",icon:"\u{1F7E2}"}:c>=8&&c<9?{color:d.warning,bg:d.warningBg,label:"Abrindo",icon:"\u{1F7E1}"}:c>=17&&c<19?{color:d.warning,bg:d.warningBg,label:"Fechando",icon:"\u{1F7E1}"}:{color:d.textSub,bg:"#F1F3F4",label:"Fechado",icon:"\u{1F534}"}}function R(c){s.includes(c)?s=s.filter(y=>y!==c):s.push(c),localStorage.setItem(Yo,JSON.stringify(s)),G(),W.playClick()}function G(){E.innerHTML="";let c=new Date,y=eo.filter(k=>{let z=k.name.toLowerCase().includes(i)||k.label.toLowerCase().includes(i),L=a==="all"||k.region===a;return z&&L});if(y.sort((k,z)=>{let L=s.includes(k.id),F=s.includes(z.id);return L&&!F?-1:!L&&F?1:k.name.localeCompare(z.name)}),y.length===0){E.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">Nenhum local encontrado</div>
                </div>
            `;return}y.forEach(k=>{let z=s.includes(k.id),L=c.toLocaleTimeString("pt-BR",{timeZone:k.zone,hour:"2-digit",minute:"2-digit"}),F=parseInt(L.split(":")[0]),j=D(F),V=F<6||F>18,I=document.createElement("div");Object.assign(I.style,l.hubCard),z&&Object.assign(I.style,l.hubCardPinned);let Y=z?"\u2605":"\u2606",Q=z?"#F9AB00":"#DADCE0";I.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn" style="cursor:pointer; font-size:22px; color:${Q}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;">${Y}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${k.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${d.text}; letter-spacing:-0.2px;">${k.name}</div>
                        <div style="font-size:12px; color:${d.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${V?"\u{1F319}":"\u2600\uFE0F"} ${k.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${d.text}; font-family:'Google Sans', sans-serif;">${L}</div>
                    <div style="font-size:11px; font-weight:600; color:${j.color}; background:${j.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${j.label}
                    </div>
                </div>
            `,I.onmouseenter=()=>{I.style.transform="translateY(-2px)",I.style.boxShadow="0 6px 12px rgba(60,64,67,0.1)"},I.onmouseleave=()=>{I.style.transform="translateY(0)",I.style.boxShadow="0 2px 6px rgba(60,64,67,0.05)"};let be=I.querySelector(".cw-pin-btn");be.onmouseenter=()=>{be.style.backgroundColor="#F1F3F4"},be.onmouseleave=()=>{be.style.backgroundColor="transparent"},be.onclick=ge=>{ge.stopPropagation(),R(k.id)},I.onclick=()=>{n=k.id,N("plan")},E.appendChild(I)});let A=document.createElement("div");A.style.height="20px",A.style.width="100%",E.appendChild(A)}function w(){M.innerHTML="";let c=document.createElement("div"),y=document.createElement("label");y.textContent="Onde est\xE1 o cliente?",y.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let A=document.createElement("select");Object.assign(A.style,Tt),A.style.padding="14px",[...eo].sort((de,ce)=>de.name.localeCompare(ce.name)).forEach(de=>{let ce=document.createElement("option");ce.value=de.id,ce.textContent=`${de.flag} ${de.name} (${de.zone})`,de.id===n&&(ce.selected=!0),A.appendChild(ce)}),A.onchange=de=>{n=de.target.value,ee(),W.playClick()},c.appendChild(y),c.appendChild(A),M.appendChild(c);let z=document.createElement("div");Object.assign(z.style,l.timeComparisonRow);let L=document.createElement("div");Object.assign(L.style,l.timeCard),L.style.backgroundColor="#F8FAFF",L.style.borderColor="#E8F0FE",L.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} Voc\xEA</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">Bras\xEDlia (GMT-3)</div>
        `;let F=document.createElement("div");Object.assign(F.style,l.timeCard),F.style.backgroundColor="#FFF8E1",F.style.borderColor="#FEF7E0",F.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">Cliente</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,z.appendChild(L),z.appendChild(F),M.appendChild(z);let j=document.createElement("div");j.id="cw-planner-status",Object.assign(j.style,l.statusBadge),M.appendChild(j);let V=document.createElement("div");Object.assign(V.style,{padding:"0 4px",marginTop:"12px"});let I=document.createElement("div");I.textContent="Arraste para simular o hor\xE1rio:",I.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let Y=document.createElement("div");Object.assign(Y.style,l.timelineContainer);let Q=document.createElement("div");Object.assign(Q.style,l.timelineTrack);let be=document.createElement("div");Object.assign(be.style,l.dayZone),Q.appendChild(be);let ge=document.createElement("input");ge.type="range",ge.min="0",ge.max="1439",ge.step="15",ge.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let ke=document.createElement("div");ke.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",ke.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",Y.appendChild(Q),Y.appendChild(ge),Y.appendChild(ke),V.appendChild(I),V.appendChild(Y),M.appendChild(V);let se=L.querySelector("#cw-time-input-br"),we=F.querySelector("#cw-time-display-client"),pe=F.querySelector("#cw-client-label");function ee(){let de=eo.find(lt=>lt.id===n);pe.textContent=`${de.flag} ${de.label} (${de.zone})`;let ce=r.getHours(),_e=r.getMinutes(),yt=`${String(ce).padStart(2,"0")}:${String(_e).padStart(2,"0")}`;se.value=yt,ge.value=ce*60+_e;let Le=r.toLocaleTimeString("pt-BR",{timeZone:de.zone,hour:"2-digit",minute:"2-digit"});we.textContent=Le;let he=parseInt(Le.split(":")[0]);he>=9&&he<17?(j.style.background=d.successBg,j.style.color=d.success,j.innerHTML='<span style="font-size:16px">\u2705</span> Hor\xE1rio Comercial Ideal'):he>=8&&he<9||he>=17&&he<19?(j.style.background=d.warningBg,j.style.color=d.warning,j.innerHTML='<span style="font-size:16px">\u26A0\uFE0F</span> Hor\xE1rio Limite (Aten\xE7\xE3o)'):(j.style.background=d.errorBg,j.style.color=d.error,j.innerHTML='<span style="font-size:16px">\u26D4</span> Fora de Hor\xE1rio')}ge.oninput=de=>{let ce=parseInt(de.target.value);r.setHours(Math.floor(ce/60)),r.setMinutes(ce%60),ee()},se.oninput=de=>{let[ce,_e]=de.target.value.split(":");ce&&_e&&(r.setHours(parseInt(ce)),r.setMinutes(parseInt(_e)),ee())},ee()}function q(){G(),o||(o=setInterval(G,6e4))}function u(){o&&(clearInterval(o),o=null)}function v(){t=!t,qe(t,p,"cw-btn-timezone"),t?N("live"):u()}return document.body.appendChild(p),v}function Ko(){let e="v1.1",t=!1,o="general",n=null,s=null;if(!document.getElementById("cw-lib-styles")){let w=document.createElement("style");w.id="cw-lib-styles",w.innerHTML=`
            .cw-lib-card { transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) !important; }
            .cw-lib-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.12) !important; border-color: rgba(0, 122, 255, 0.3) !important; }
            .cw-tactile { transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1); }
            .cw-tactile:active { transform: scale(0.92) !important; }
            .cw-toolbar-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; border: 1px solid transparent; background: transparent; cursor: pointer; transition: all 0.2s; color: #5F6368; }
            .cw-toolbar-btn:hover { background: #F1F3F4; color: #007AFF; border-color: #DADCE0; }
            .cw-toolbar-btn.active { background: #E8F0FE; color: #007AFF; border-color: #007AFF; }
        `,document.head.appendChild(w)}let i={bg:"#F0F2F5",surface:"#FFFFFF",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",text:"#1C1C1E",textSub:"#8E8E93",border:"rgba(0, 0, 0, 0.08)",danger:"#FF3B30"},a={container:{display:"flex",flexDirection:"column",height:"100%",background:i.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",padding:"12px 16px 0 16px",background:i.surface,borderBottom:`1px solid ${i.border}`},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:i.textSub,borderBottom:"3px solid transparent",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",userSelect:"none"},tabActive:{color:i.primary,borderBottomColor:i.primary,fontWeight:"600"},listContainer:{flex:1,overflowY:"auto",padding:"16px",display:"flex",flexDirection:"column",gap:"12px"},emptyState:{padding:"40px 20px",textAlign:"center",color:"#BDC1C6",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},card:{background:i.surface,borderRadius:"16px",padding:"16px",border:`1px solid ${i.border}`,boxShadow:"0 4px 12px rgba(0,0,0,0.05)",transition:"all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",cursor:"default",position:"relative",overflow:"hidden"},cardHeader:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},cardTitle:{fontSize:"14px",fontWeight:"600",color:i.text},cardPreview:{fontSize:"12px",color:i.textSub,lineHeight:"1.5",display:"-webkit-box",webkitLineClamp:"3",webkitBoxOrient:"vertical",overflow:"hidden"},cardActions:{display:"flex",justifyContent:"flex-end",gap:"8px",marginTop:"12px",paddingTop:"12px",borderTop:`1px dashed ${i.border}`},actionBtn:{padding:"6px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"600",cursor:"pointer",border:"none",background:"transparent",transition:"background 0.2s"},fab:{position:"absolute",bottom:"24px",right:"24px",width:"56px",height:"56px",borderRadius:"16px",background:i.primary,color:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.4)",cursor:"pointer",transition:"transform 0.2s",zIndex:10},editorOverlay:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"rgba(255, 255, 255, 0.85)",backdropFilter:"blur(25px) saturate(180%)",webkitBackdropFilter:"blur(25px) saturate(180%)",zIndex:20,transform:"translateY(100%)",transition:"transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",display:"flex",flexDirection:"column"},editorHeader:{padding:"16px 24px",background:i.surface,borderBottom:`1px solid ${i.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"},editorBody:{flex:1,padding:"24px",overflowY:"auto"},inputGroup:{marginBottom:"20px"},label:{display:"block",fontSize:"12px",fontWeight:"700",color:i.textSub,marginBottom:"8px",textTransform:"uppercase"},input:{width:"100%",padding:"12px",borderRadius:"8px",border:`1px solid ${i.border}`,fontSize:"14px",fontFamily:"inherit",outline:"none",background:i.surface,boxSizing:"border-box"}},r=document.createElement("div");r.id="library-popup",r.classList.add("cw-module-window"),Object.assign(r.style,Oe,{right:"auto",left:"50%",width:"400px",height:"600px",transform:"translateX(-50%) scale(0.05)",overflow:"hidden"});let l=Fe(r,"Minha Biblioteca",e,"Gerencie seus snippets, textos e templates.",{popup:r},()=>G());r.appendChild(l);let p=document.createElement("div");Object.assign(p.style,a.container),r.appendChild(p);let g=document.createElement("div");Object.assign(g.style,a.tabHeader);let x=[{id:"general",label:"Geral",icon:"\u{1F4CB}"},{id:"note",label:"Notas",icon:"\u{1F4DD}"},{id:"email",label:"Emails",icon:"\u{1F4E7}"}];x.forEach(w=>{let q=document.createElement("div");q.innerHTML=`${w.icon} ${w.label}`,q.id=`lib-tab-${w.id}`,Object.assign(q.style,a.tabBtn),w.id===o&&Object.assign(q.style,a.tabActive),q.onmouseenter=()=>W.playHover(),q.onclick=()=>C(w.id),g.appendChild(q)}),p.appendChild(g);let h=document.createElement("div");Object.assign(h.style,a.listContainer),p.appendChild(h);let f=document.createElement("div");f.className="cw-fab cw-tactile",Object.assign(f.style,a.fab),f.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',f.onmouseenter=()=>f.style.transform="scale(1.1)",f.onmouseleave=()=>f.style.transform="scale(1)",f.onclick=()=>O(),p.appendChild(f),n=document.createElement("div"),Object.assign(n.style,a.editorOverlay);let b=document.createElement("div");Object.assign(b.style,a.editorHeader),b.innerHTML='<span style="font-weight:700; font-size:16px;">Novo Item</span>';let T=document.createElement("button");T.innerHTML="Cancelar",T.style.cssText="background:none; border:none; color:#5f6368; font-weight:600; cursor:pointer;",T.onclick=M,b.appendChild(T),n.appendChild(b);let S=document.createElement("div");Object.assign(S.style,a.editorBody),n.appendChild(S);let $=document.createElement("div");$.style.cssText="padding:16px 24px; border-top:1px solid #DADCE0; background:#FFF; display:flex; justify-content:flex-end;";let H=document.createElement("button");H.textContent="Salvar",H.style.cssText="padding:10px 24px; background:#1a73e8; color:white; border:none; border-radius:20px; font-weight:600; cursor:pointer; box-shadow:0 2px 5px rgba(26,115,232,0.3);",H.onclick=N,$.appendChild(H),n.appendChild($),p.appendChild(n);let B=document.createElement("div");Object.assign(B.style,We),B.className="no-drag",r.appendChild(B),Ye(r,B),document.body.appendChild(r);function C(w){W.playClick(),o=w,x.forEach(q=>{let u=document.getElementById(`lib-tab-${q.id}`);q.id===w?Object.assign(u.style,a.tabActive):Object.assign(u.style,a.tabBtn)}),E()}function E(){h.innerHTML="";let w=Ce.getSnippets(o);if(w.length===0){h.innerHTML=`
                <div style="${R(a.emptyState)}">
                    <div style="font-size:32px; opacity:0.5;">\u{1F4ED}</div>
                    <div style="font-weight:500;">Nada aqui ainda.</div>
                    <div style="font-size:12px;">Clique no + para criar.</div>
                </div>
            `;return}w.forEach(q=>{let u=document.createElement("div");u.className="cw-lib-card",Object.assign(u.style,a.card),q.isCode&&(u.style.borderLeft=`4px solid ${i.primary}`,u.style.background="rgba(0, 122, 255, 0.02)");let v=q.content;if(q.isRich){let c=document.createElement("div");c.innerHTML=q.content;let y=c.querySelector("img");v=c.innerText.substring(0,150)+(c.innerText.length>150?"...":""),y&&(v="\u{1F5BC}\uFE0F [Cont\xE9m Imagens] "+v)}u.innerHTML=`
                <div style="${R(a.cardHeader)}">
                    <div style="${R(a.cardTitle)}">${q.title}</div>
                    <div style="display:flex; gap:4px;">
                        ${q.isCode?'<span style="font-size:10px; background:#F1F3F4; color:#5F6368; padding:2px 6px; border-radius:4px; font-family:monospace;">CODE</span>':""}
                        ${o==="email"?'<span style="font-size:10px; background:#E8F0FE; color:#1967D2; padding:2px 6px; border-radius:4px;">TEMPLATE</span>':""}
                    </div>
                </div>
                <div style="${R(a.cardPreview)}; ${q.isCode?"font-family:'Roboto Mono', monospace; font-size:11px;":""}">${v}</div>
                <div style="${R(a.cardActions)}">
                    <button class="cw-act-copy cw-tactile" title="Copiar" style="${R(a.actionBtn)}; color:#007AFF; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>Copiar</span>
                    </button>
                    <button class="cw-act-edit cw-tactile" title="Editar" style="${R(a.actionBtn)}; color:#8E8E93; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        <span>Editar</span>
                    </button>
                    <button class="cw-act-del cw-tactile" title="Excluir" style="${R(a.actionBtn)}; color:#FF3B30; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        <span>Excluir</span>
                    </button>
                </div>
            `,u.onmouseenter=()=>{W.playHover()},u.querySelector(".cw-act-copy").onclick=c=>{if(c.stopPropagation(),W.playClick(),q.isRich){let y=new Blob([q.content],{type:"text/html"}),A=document.createElement("div");A.style.whiteSpace="pre-wrap",A.innerHTML=q.content;let k=new Blob([A.innerText],{type:"text/plain"}),z=[new ClipboardItem({"text/html":y,"text/plain":k})];navigator.clipboard.write(z)}else navigator.clipboard.writeText(q.content);U("Copiado!")},u.querySelector(".cw-act-edit").onclick=c=>{c.stopPropagation(),W.playClick(),O(q)},u.querySelector(".cw-act-del").onclick=async c=>{c.stopPropagation(),W.playClick(),await vo("Excluir este item?")&&(Ce.delete(q.id),E(),U("Item exclu\xEDdo."))},h.appendChild(u)})}function O(w=null){s=w?w.id:null,S.innerHTML="",S.appendChild(D("title","T\xEDtulo / Nome",w?w.title:"")),o==="email"&&S.appendChild(D("subject","Assunto do Email",w?w.subject:""));let q="Conte\xFAdo";o==="email"&&(q="Corpo do Email (HTML)"),o==="note"&&(q="Texto da Nota (Reason)"),S.appendChild(D("content",q,w?w.content:"",{isRich:!0,isCode:w?w.isCode:!1})),b.querySelector("span").textContent=w?"Editar Item":"Novo Item",n.style.transform="translateY(0)",setTimeout(()=>{let u=S.querySelector("input");u&&u.focus()},300)}function M(){n.style.transform="translateY(100%)",setTimeout(()=>s=null,300)}async function N(){let w=S.querySelector("#cw-inp-title"),q=S.querySelector("#cw-inp-content"),u=w.value.trim(),v=q.contentEditable==="true"?q.innerHTML:q.value.trim(),c=q.getAttribute("data-is-code")==="true";if(!u||!v||v==="<br>"){U("Preencha t\xEDtulo e conte\xFAdo.",{error:!0});return}let y={id:s,type:o,title:u,content:v,isCode:c,isRich:q.contentEditable==="true"};if(o==="email"){let A=S.querySelector("#cw-inp-subject").value.trim();if(!A){U("Assunto \xE9 obrigat\xF3rio para emails.",{error:!0});return}y.subject=A}H.textContent="Salvando...",await Ce.save(y),H.textContent="Salvar",M(),E(),U("Salvo com sucesso!"),W.playSuccess()}function D(w,q,u,v={}){let c=document.createElement("div");Object.assign(c.style,a.inputGroup);let y=document.createElement("label");y.textContent=q,Object.assign(y.style,a.label);let A;if(v.isRich){let k=document.createElement("div");k.style.cssText="display:flex; gap:6px; margin-bottom:12px; background:rgba(241, 243, 244, 0.8); padding:6px; border-radius:12px; border:1px solid #DADCE0; backdrop-filter: blur(10px);",k.innerHTML=`
                <button type="button" class="cw-toolbar-btn cw-tb-bold cw-tactile" title="Negrito">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>
                </button>
                <button type="button" class="cw-toolbar-btn cw-tb-italic cw-tactile" title="It\xE1lico">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>
                </button>
                <button type="button" class="cw-toolbar-btn cw-tb-code cw-tactile" title="Formato C\xF3digo">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                </button>
                <button type="button" class="cw-toolbar-btn cw-tb-img cw-tactile" title="Inserir Imagem">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                </button>
            `,A=document.createElement("div"),A.contentEditable="true",Object.assign(A.style,a.input,{minHeight:"180px",maxHeight:"350px",overflowY:"auto",whiteSpace:"pre-wrap",lineHeight:"1.6",outline:"none"}),A.innerHTML=u||"",v.isCode&&(A.style.fontFamily="'Roboto Mono', monospace",A.style.backgroundColor="#F8F9FA",A.setAttribute("data-is-code","true")),k.querySelectorAll(".cw-toolbar-btn").forEach(z=>{z.onmouseenter=()=>W.playHover(),z.onmousedown=()=>W.playClick()}),k.querySelector(".cw-tb-bold").onclick=()=>{document.execCommand("bold"),A.focus()},k.querySelector(".cw-tb-italic").onclick=()=>{document.execCommand("italic"),A.focus()},k.querySelector(".cw-tb-code").onclick=z=>{let F=!(A.getAttribute("data-is-code")==="true");A.setAttribute("data-is-code",F),A.style.fontFamily=F?"'Roboto Mono', monospace":"inherit",A.style.backgroundColor=F?"rgba(0, 122, 255, 0.03)":i.surface,F?z.currentTarget.classList.add("active"):z.currentTarget.classList.remove("active"),A.focus()},k.querySelector(".cw-tb-img").onclick=()=>{let z=prompt("Cole a URL da imagem:");z&&(document.execCommand("insertImage",!1,z),A.querySelectorAll("img").forEach(F=>{F.style.maxWidth="100%",F.style.borderRadius="8px"}))},A.onpaste=z=>{let L=(z.clipboardData||z.originalEvent.clipboardData).items;for(let F of L)if(F.kind==="file"&&F.type.startsWith("image/")){z.preventDefault();let j=F.getAsFile(),V=new FileReader;V.onload=I=>{let Y=`<img src="${I.target.result}" style="max-width:100%; border-radius:8px; margin:8px 0; display:block;">`;document.execCommand("insertHTML",!1,Y)},V.readAsDataURL(j)}},c.appendChild(y),c.appendChild(k)}else A=document.createElement("input"),A.type="text",Object.assign(A.style,a.input),A.value=u||"",c.appendChild(y);return A.id=`cw-inp-${w}`,A.onfocus=()=>{A.style.borderColor=i.primary,A.style.boxShadow=`0 0 0 2px ${i.primaryBg}`},A.onblur=()=>{A.style.borderColor=i.border,A.style.boxShadow="none"},c.appendChild(A),c}function R(w){return Object.entries(w).map(([q,u])=>`${q.replace(/[A-Z]/g,v=>"-"+v.toLowerCase())}:${u}`).join(";")}function G(){t=!t,qe(t,r,"cw-btn-library"),t&&E()}return G}function wn(){if(window.techSolInitialized){Vt();return}window.techSolInitialized=!0;let e="v5.2";console.log(`\u{1F680} TechSol Suite Initializing (${e})...`);try{fo();try{W.initGlobalListeners(),W.playStartup()}catch(d){console.warn("\xC1udio bloqueado:",d)}xe.fetchTips(),Vt();let t=zo(),o=Bo(),n=jo(),s=Ho(),i=Xo(),a=Ko(),r=$o();Io({toggleNotes:t,toggleEmail:o,toggleScript:n,toggleLinks:s,toggleTimezone:i,toggleLibrary:a,broadcastControl:r}),setTimeout(()=>{xe.logEvent("App","Start","Session Start"),Vo(),setTimeout(()=>{Wo(e)},500)},2500)}catch(t){console.error("Erro fatal na inicializa\xE7\xE3o:",t),U("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}wn();})();
