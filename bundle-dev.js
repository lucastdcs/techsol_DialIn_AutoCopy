(()=>{var at="",Gt=e=>new Promise(t=>setTimeout(t,e));async function zt(){if(at)return at;try{let e=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!e)return"Agente";e.click(),await Gt(100);let t="Consultor",o=document.querySelector("profile-details .name");if(o)t=o.textContent.trim().split(" ")[0],t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();else{let n=document.querySelector("profile-details img");if(n&&n.src.includes("/photos/")){let r=n.src.match(/\/photos\/([^\?]+)/)[1];t=r.charAt(0).toUpperCase()+r.slice(1)}}return e.click(),document.body.click(),at=t,t}catch(e){return console.warn("Sherlock falhou:",e),"Consultor"}}function yt(){return at||"Consultor"}function Bt(e){let t=new Date,o=t.getHours(),n=t.getDay(),r="Ol\xE1",a="";o>=5&&o<12?(r="Bom dia",a='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):o>=12&&o<18?(r="Boa tarde",a='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(r="Boa noite",a='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let i=[];o>=0&&o<5?i=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:o<12?n===1?i=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:n===5?i=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:i=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:o<18?i=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:i=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(n===0||n===6)&&(i=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let l=i[Math.floor(Math.random()*i.length)];return{prefix:`${r},`,name:e,suffix:l,icon:a,isFriday:n===5}}async function So(){try{let t=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!t)return null;let o=t.parentElement,n=o.querySelector(".unmask-button")||o.querySelector('[aria-label="Click to view"]');n&&(n.click(),await Gt(500));let a=Array.from(o.querySelectorAll("a, span, div, pii-value")).find(i=>{let l=i.innerText.trim();return l.includes("@")&&!l.includes("Is this:")&&l.toLowerCase()!=="email"});return a?a.innerText.trim():null}catch(e){return console.warn("Erro ao capturar email do cliente:",e),null}}function Co(){try{let e=document.querySelector('material-input[debug-id="account-id-input"]');if(e){let t=e.querySelector("input");if(t){let o=t.value.trim();if(o)return o.includes("@")?o:`${o}@google.com`}}}catch(e){console.warn("Erro ao capturar email interno:",e)}return null}async function vt(){let e="Cliente",t="[INSERIR URL]";try{let a=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(a&&a.nextElementSibling){let i=a.nextElementSibling.innerText.trim();i&&(e=i)}}catch(r){console.warn("Falha Nome:",r)}try{let a=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(a&&a.nextElementSibling){let i=a.nextElementSibling.innerText.trim();i&&(t=i)}}catch(r){console.warn("Falha URL:",r)}let o=await So(),n=Co();return{advertiserName:e,websiteUrl:t,clientEmail:o,internalEmail:n,agentName:yt()}}var je=null,At=null,qe=.3;function Be(){if(!je){let e=window.AudioContext||window.webkitAudioContext;e&&(je=new e)}return je&&je.state==="suspended"&&je.resume(),je}function jt(e){if(At)return At;let t=e.sampleRate*2,o=e.createBuffer(1,t,e.sampleRate),n=o.getChannelData(0);for(let r=0;r<t;r++)n[r]=Math.random()*2-1;return At=o,o}var Z={playClick:()=>{let e=Be();if(!e)return;let t=e.currentTime,o=e.createBufferSource();o.buffer=jt(e);let n=e.createBiquadFilter();n.type="highpass",n.frequency.value=4e3;let r=e.createGain();r.gain.setValueAtTime(qe*.8,t),r.gain.exponentialRampToValueAtTime(.001,t+.015),o.connect(n),n.connect(r),r.connect(e.destination),o.start(t),o.stop(t+.02)},playHover:()=>{let e=Be();if(!e)return;let t=e.currentTime,o=e.createOscillator();o.type="sine",o.frequency.setValueAtTime(400,t);let n=e.createGain();n.gain.setValueAtTime(0,t),n.gain.linearRampToValueAtTime(qe*.1,t+.005),n.gain.linearRampToValueAtTime(0,t+.02),o.connect(n),n.connect(e.destination),o.start(t),o.stop(t+.03)},playSuccess:()=>{let e=Be();if(!e)return;let t=e.currentTime;[1046.5,1567.9].forEach((n,r)=>{let a=e.createOscillator(),i=e.createGain();a.type="sine",a.frequency.value=n,i.gain.setValueAtTime(0,t),i.gain.linearRampToValueAtTime(qe*.6,t+.05),i.gain.exponentialRampToValueAtTime(.001,t+.6),a.connect(i),i.connect(e.destination),a.start(t),a.stop(t+.7)})},playGenieOpen:()=>{let e=Be();if(!e)return;let t=e.currentTime,o=e.createBufferSource();o.buffer=jt(e);let n=e.createBiquadFilter();n.type="lowpass",n.frequency.setValueAtTime(100,t),n.frequency.exponentialRampToValueAtTime(800,t+.2);let r=e.createGain();r.gain.setValueAtTime(0,t),r.gain.linearRampToValueAtTime(qe*.5,t+.05),r.gain.linearRampToValueAtTime(0,t+.25),o.connect(n),n.connect(r),r.connect(e.destination),o.start(t),o.stop(t+.3)},playError:()=>{let e=Be();if(!e)return;let t=e.currentTime,o=e.createOscillator(),n=e.createGain();o.type="triangle",o.frequency.setValueAtTime(120,t),o.frequency.exponentialRampToValueAtTime(80,t+.1),n.gain.setValueAtTime(qe,t),n.gain.exponentialRampToValueAtTime(.001,t+.15),o.connect(n),n.connect(e.destination),o.start(t),o.stop(t+.2)},playStartup:()=>{let e=Be();if(!e)return;let t=e.currentTime,o=.12,n=e.createOscillator(),r=e.createGain(),a=e.createBiquadFilter();n.type="square",n.frequency.setValueAtTime(400,t),n.frequency.exponentialRampToValueAtTime(50,t+.1),a.type="lowpass",a.frequency.setValueAtTime(800,t),a.frequency.exponentialRampToValueAtTime(100,t+.1),r.gain.setValueAtTime(qe*4,t),r.gain.exponentialRampToValueAtTime(.001,t+.1),n.connect(a),a.connect(r),r.connect(e.destination),n.start(t),n.stop(t+.12);let i=e.createOscillator(),l=e.createGain();i.type="sine",i.frequency.setValueAtTime(150,t),i.frequency.exponentialRampToValueAtTime(50,t+.15),l.gain.setValueAtTime(qe*1.5,t),l.gain.exponentialRampToValueAtTime(.001,t+.15),i.connect(l),l.connect(e.destination),i.start(t),i.stop(t+.15),[55,55.4,110.5].forEach(u=>{let f=e.createOscillator(),p=e.createGain(),b=e.createBiquadFilter();f.type="sawtooth",f.frequency.value=u,b.type="lowpass",b.frequency.setValueAtTime(30,t),b.frequency.linearRampToValueAtTime(900,t+o+.2),b.frequency.exponentialRampToValueAtTime(40,t+3),p.gain.setValueAtTime(0,t),p.gain.linearRampToValueAtTime(qe*.6,t+o+.1),p.gain.exponentialRampToValueAtTime(.001,t+3.5),f.connect(b),b.connect(p),p.connect(e.destination),f.start(t),f.stop(t+3.6)})},playNotification:()=>{let e=Be();if(!e)return;let t=e.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(n=>{let r=e.createOscillator(),a=e.createGain();r.type="sine",r.frequency.setValueAtTime(n.freq,t),a.gain.setValueAtTime(0,t),a.gain.linearRampToValueAtTime(qe*n.vol,t+.004),a.gain.exponentialRampToValueAtTime(.001,t+n.dur),r.connect(a),a.connect(e.destination),r.start(t),r.stop(t+n.dur+.1)})},playSwoosh:()=>{Z.playGenieOpen()},playReset:()=>{Z.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let e=0,t=50;document.addEventListener("mouseover",o=>{if(!je)return;let n=o.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!n||n.contains(o.relatedTarget))return;let r=Date.now();r-e<t||(Z.playHover(),e=r)},{passive:!0})}};var Pt=1e4;function Vt(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
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
    `,document.head.appendChild(t)}function oe(e,t={}){let o=document.createElement("div"),n=t.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(o.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:n,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),o.textContent=e,document.body.appendChild(o),t.error?Z.playError():Z.playSuccess(),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>o.remove(),400)},t.duration||4e3)}function $t(e,t=null){let o=0,n=0,r=0,a=0,i=t||e;i.style.cursor="grab",i.onmousedown=l;function l(f){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(f.target.tagName)||f.target.closest(".no-drag"))return;f=f||window.event,i.style.cursor="grabbing",e.style.transition="none";let p=e.getBoundingClientRect();e.style.transform="none",e.style.left=p.left+"px",e.style.top=p.top+"px",e.style.margin="0",e.style.bottom="auto",e.style.right="auto",Pt++,e.style.zIndex=Pt,r=f.clientX,a=f.clientY,e.setAttribute("data-dragging","true"),document.onmouseup=u,document.onmousemove=m}function m(f){f=f||window.event,f.preventDefault(),o=r-f.clientX,n=a-f.clientY,r=f.clientX,a=f.clientY;let p=e.offsetTop-n,b=e.offsetLeft-o,q=16,v=window.innerWidth,S=window.innerHeight,h=e.offsetWidth,E=e.offsetHeight;b<q?b=q:b+h>v-q&&(b=v-h-q),p<q?p=q:p+E>S-q&&(p=S-E-q),e.style.top=p+"px",e.style.left=b+"px"}function u(){document.onmouseup=null,document.onmousemove=null,i.style.cursor="grab",setTimeout(()=>{e.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",e.setAttribute("data-dragging","false"),e.setAttribute("data-moved","true")},50)}}var we={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var St={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Ut={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var Wt={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var be={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var wt=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],Ht=-1;function Je(){let e=Math.floor(Math.random()*wt.length);return e===Ht&&(e=(e+1)%wt.length),Ht=e,wt[e]}var Ie=e=>new Promise(t=>setTimeout(t,e));async function Eo(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let o=e.querySelector(".cursor");await Ie(200);for(let n=0;n<t.length;n++){let r=t.charAt(n),a=document.createElement("span");a.textContent=r,o&&o.parentNode===e?o.before(a):e.appendChild(a);let i=Math.floor(Math.random()*60)+30;n===0&&(i=150),n>t.length-3&&(i=30),await Ie(i)}await Ie(600),o&&(o.style.display="none")}async function Ct(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
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
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await Ie(200);let t=await zt(),o=Bt(t),n=e.querySelector("#w-icon"),r=e.querySelector("#p1"),a=e.querySelector("#p2"),i=e.querySelector("#p3"),l=e.querySelector("#p-sextou");n&&(n.innerHTML=o.icon),r&&(r.textContent=o.prefix),i&&(i.textContent=o.suffix),await Ie(300);let m=n?n.querySelector("svg"):null;if(m&&(m.style.opacity="1",m.style.transform="scale(1)"),await Ie(400),r&&(r.style.opacity="1"),Z.playStartup(),a&&await Eo(a,o.name),i&&(i.style.opacity="1",i.style.transform="translateY(0)"),o.isFriday&&l){await Ie(400),l.style.display="block",l.offsetWidth;let u=l.querySelector(".sextou-badge");u&&(u.style.opacity="1",u.style.transform="scale(1)")}await Ie(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await Ie(900),e.parentNode&&e.parentNode.removeChild(e)}}var Ye={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Xe(e,t){t.onmousedown=o;function o(n){n.stopPropagation(),n.preventDefault();let r=e.style.transition;e.style.transition="none";let a=n.clientX,i=n.clientY,l=parseFloat(getComputedStyle(e,null).getPropertyValue("width").replace("px","")),m=parseFloat(getComputedStyle(e,null).getPropertyValue("height").replace("px","")),u=a,f=i,p=!1;function b(S){u=S.clientX,f=S.clientY,p||(window.requestAnimationFrame(()=>{q(),p=!1}),p=!0)}function q(){let S=l+(u-a),h=m+(f-i);S>360&&(e.style.width=S+"px"),h>300&&(e.style.height=h+"px")}function v(){document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",v),setTimeout(()=>{e.style.transition=r},50)}document.addEventListener("mousemove",b),document.addEventListener("mouseup",v)}t.onmouseenter=()=>t.style.opacity="1",t.onmouseleave=()=>t.style.opacity="0.6"}function Yt(e){if(!e)return"";let t={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return e.replace(/:([a-zA-Z0-9-_+]+):/g,o=>t[o]?t[o]:"")}var et=e=>new Promise(t=>setTimeout(t,e));function it(e){e&&["mousedown","mouseup","click"].forEach(t=>e.dispatchEvent(new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window})))}var Xt="cw-automation-styles";if(!document.getElementById(Xt)){let e=document.createElement("style");e.id=Xt,e.innerHTML=`
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
    `,document.head.appendChild(e)}function Kt(e){let t=document.getElementById("cw-loading-overlay");e?t?t.style.opacity="1":(t=document.createElement("div"),t.id="cw-loading-overlay",document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1")):t&&(t.style.opacity="0",setTimeout(()=>t.remove(),300))}async function Qt(e){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let t=document.getElementById(e),o="";Kt(!0),t&&(o=t.placeholder,t.placeholder="Buscando ID...",t.value="",t.classList.add("cw-scanning-active"));try{let n=document.querySelector('material-button[debug-id="dock-item-case-log"]');n&&!n.classList.contains("selected")&&(it(n),await et(1200));let r=document.querySelector("search-filter dropdown-button .button");if(r&&!(r.innerText||"").includes("All")){it(r),await et(600);let p=document.querySelector('material-checkbox[debug-id="check-all-box"]');p&&p.getAttribute("aria-checked")!=="true"&&(it(p),await et(300));let b=document.querySelector('material-button[debug-id="apply-filter"]');b&&(it(b),await et(1500))}let a=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");a&&(a.scrollTop=a.scrollHeight,await et(500));let l=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body")),m=/Speakeasy.*?(P\d{15,25})/i,u=null;for(let f=l.length-1;f>=0;f--){let p=l[f];if(p.offsetParent===null)continue;let b=(p.innerText||"").match(m);if(b&&b[1]){u=b[1];break}}if(t)if(u){try{await navigator.clipboard.writeText(u)}catch{}t.value=u,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),Z.playSuccess(),oe(`ID Localizado: ${u}`),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}else Z.playError(),oe("Nenhum ID encontrado.",{error:!0}),t.placeholder="N\xE3o encontrado",t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}catch(n){console.error("Erro na automa\xE7\xE3o:",n),oe("Erro ao processar.",{error:!0})}finally{t&&(t.classList.remove("cw-scanning-active"),t.value||(t.placeholder=o)),Kt(!1)}}var Ne={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:"}},Re={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},tt={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>Substatus:</b> DC - Other<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br>Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},Pe={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},ot=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],Et=["CONSIDERACOES","COMENTARIOS"],Se={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
\u2022 Configura\xE7\xE3o de Convers\xF5es`,"field-CONTEXTO_CALL":`\u2022 Percebi que o(a) anunciante n\xE3o tinha GTM Instalado.
\u2022 Seguimos com a cria\xE7\xE3o de conta no GTM.
\u2022 Entretanto, a conta de acesso ao painel do site (ex: WordPress) n\xE3o tinha permiss\xE3o para instalar plugins ou editar o c\xF3digo.`,"field-IMPEDIMENTO_CLIENTE":`\u2022 Anunciante precisa conseguir acesso de administrador ao painel do site.
\u2022 OU
\u2022 Anunciante precisa contatar o(a) desenvolvedor(a) para que ele(a) instale o GTM.`,"field-MINHA_ACAO":`\u2022 Coloco o caso em 2/6.
\u2022 Assim que o anunciante tiver o acesso ou a instala\xE7\xE3o for feita, abrirei um caso em BAU para dar continuidade.`,"field-SCREENSHOTS":"\u2022 Print do painel do CMS mostrando a falta de permiss\xE3o (opcional)."},"quickfill-ni-followup-bau":{type:"bau","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (Follow-up BAU 2/6)","field-SPEAKEASY_ID":"N/A","field-ON_CALL":"N/A","field-CONTEXTO_CALL":"\u2022 No dia {DIA} do 2/6 fiz duas tentativas de contatos seguidas, mas n\xE3o obtive resposta. Envio na sequ\xEAncia o email referente ao dia respectivo.","field-TASKS_SOLICITADAS":"N/A","field-IMPEDIMENTO_CLIENTE":"N/A","field-MINHA_ACAO":"N/A","field-GTM_GA4_VERIFICADO":"N/A","field-SCREENSHOTS":`\u2022 Tentativa 1 -
\u2022 Tentativa 2 -`},"quickfill-ni-followup-lm":{type:"lm","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (Follow-up LM 2/6)","field-SPEAKEASY_ID":"N/A","field-ON_CALL":"N/A","field-CONTEXTO_CALL":"\u2022 No dia {DIA} do 2/6 enviei e-mail de follow-up (caso LM, sem tentativas de liga\xE7\xE3o), mas n\xE3o obtive resposta.","field-TASKS_SOLICITADAS":"N/A","field-IMPEDIMENTO_CLIENTE":"N/A","field-MINHA_ACAO":"N/A","field-GTM_GA4_VERIFICADO":"N/A","field-SCREENSHOTS":"\u2022 E-mail de follow-up enviado (LM) -"},"quickfill-gtm-install":{type:"all","field-TASKS_SOLICITADAS":"\u2022 Instala\xE7\xE3o do GTM","field-PASSOS_EXECUTADOS":`\u2022 Criamos a conta dentro do GTM
\u2022 Instalamos dentro do CMS/Hospedagem.
\u2022 Criamos o Vinculador de Convers\xF5es.`,"field-RESULTADO":"\u2022 Validei a instala\xE7\xE3o.",linkedTask:"gtm_installation"},"quickfill-whatsapp":{type:"all","field-TASKS_SOLICITADAS":"\u2022 Cria\xE7\xE3o de convers\xE3o para WHATSAPP","field-PASSOS_EXECUTADOS":`\u2022 Fizemos a cria\xE7\xE3o da convers\xE3o no Ads.
\u2022 Criamos a Tag no GTM usando acionadores de clique (ex: Click URL / Click Text) para os bot\xF5es de WhatsApp.
\u2022 Realizamos os testes e validamos o funcionamento.`,"field-RESULTADO":"\u2022 Task implementada com sucesso. Fecho o caso sem acompanhamento.",linkedTask:"ads_conversion_tracking"},"quickfill-form":{type:"all","field-TASKS_SOLICITADAS":"\u2022 Cria\xE7\xE3o de convers\xE3o para FORMUL\xC1RIO (padr\xE3o, n\xE3o-otimizada).","field-PASSOS_EXECUTADOS":`\u2022 Fizemos a cria\xE7\xE3o da convers\xE3o no Ads.
\u2022 Criamos a Tag no GTM usando o acionador de envio de formul\xE1rio (Form Submission) ou visualiza\xE7\xE3o de p\xE1gina de agradecimento (Thank You Page).
\u2022 Realizamos os testes e validamos o funcionamento.`,"field-RESULTADO":"\u2022 Task implementada com sucesso. Fecho o caso sem acompanhamento.",linkedTask:"ads_conversion_tracking"},"quickfill-ecw4-close":{type:"all","field-TASKS_SOLICITADAS":"\u2022 Acompanhamento da convers\xE3o otimizada (ECW4) ap\xF3s 7 dias.","field-PASSOS_EXECUTADOS":`\u2022 Ap\xF3s o per\xEDodo de 7 dias de acompanhamento, verifiquei o painel do Ads.
\u2022 A convers\xE3o est\xE1 sendo registrada corretamente.`,"field-RESULTADO":`\u2022 Valido o bom funcionamento da convers\xE3o otimizada.
\u2022 Assim, fecho o caso.`,linkedTask:"ads_enhanced_conversions"},"quickfill-as-no-show":{type:"all","field-MOTIVO_REAGENDAMENTO":"\u2022 Precisamos reagendar o caso, j\xE1 que o anunciante n\xE3o compareceu na meet, por\xE9m respondeu o e-mail pedindo o reagendamento"},"quickfill-as-insufficient-time":{type:"all","field-MOTIVO_REAGENDAMENTO":`\u2022 Precisamos reagendar o caso, j\xE1 que o tempo foi insuficiente para terminar as Tasks
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

Irei abrir caso em BAU para o dia solicitado e pedir descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo.`}};var de=e=>new Promise(t=>setTimeout(t,e));function fe(e,t="info"){let o={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${e}`,o[t]||o.info)}function Ce(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>e.dispatchEvent(new MouseEvent(o,t)))}function st(e,t){if(!e)return;let o=`cw-warning-${e.id||Math.random().toString(36).substr(2,9)}`,n=document.getElementById(o);n&&n.remove();let r=e.getBoundingClientRect(),a=document.createElement("div");a.id=o,a.style.cssText=`
        position: fixed;
        top: ${r.bottom+8}px;
        left: ${r.left}px;
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
    `,a.innerHTML=`
        <div style="display:flex; align-items:flex-start; gap:10px;">
            <span style="color:#F9AB00; font-size:16px; margin-top:1px;">\u26A0\uFE0F</span>
            <span style="line-height:1.4;">${t}</span>
        </div>
        <div class="cw-close-btn" style="
            cursor: pointer; color: #5f6368; font-weight: bold; font-size: 16px; 
            padding: 0 4px; line-height: 1; opacity: 0.6; transition: opacity 0.2s;
        ">\xD7</div>
    `;let i=a.querySelector(".cw-close-btn");i.onclick=()=>{a.style.opacity="0",a.style.transform="translateY(-5px)",setTimeout(()=>a.remove(),300)},document.body.appendChild(a),requestAnimationFrame(()=>{a.style.opacity="1",a.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(a)&&i.click()},25e3)}async function rt(e,t){if(!e||!t)return;e.focus(),e.value="",e.dispatchEvent(new Event("input",{bubbles:!0})),await de(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),await de(100),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function Tt(){let t=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(o=>{let n=o.offsetParent!==null,r=o.closest("case-message-view")!==null,a=o.closest(".editor")!==null||o.closest("write-card")!==null;return n&&!r&&a});return t&&fe("Editor visualmente detectado.","success"),t}async function Zt(){fe("\u{1F680} FASE 1: Tentando abrir a janela de email...");let e=!1,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(p=>p.innerText.trim()==="email");if(o&&o.offsetParent!==null){fe("Bot\xE3o de email direto encontrado.");let p=o.closest("material-button")||o.closest("material-fab")||o;Ce(p),e=!0}else{fe("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let p=document.querySelector("material-fab-speed-dial");if(p){let b=p.querySelector(".trigger");if(b){Ce(b),await de(800);let v=Array.from(document.querySelectorAll("i.material-icons-extended")).find(S=>S.innerText.trim()==="email");v&&(Ce(v),e=!0)}}}if(!e)return oe("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;fe("\u{1F680} FASE 2: Verificando rascunhos...");let n=null,r=0,a=20;for(;r<a;){await de(250);let p=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(n=Array.from(p).find(b=>b.offsetParent!==null),n){fe("\u26A0\uFE0F Rascunho detectado!","warn");break}r++}if(n){fe("\u{1F5D1}\uFE0F Descartando..."),Ce(n),n.click();let p=null,b=0;for(;b<15;){await de(300);let q=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(p=Array.from(q).find(v=>v.offsetParent!==null),p)break;b++}p&&(Ce(p),oe("Limpando rascunho antigo...",{duration:2e3}),await de(2500))}fe("\u{1F680} FASE 3: Buscando editor final...");let i=0,l=null;for(;i<20&&(l=Tt(),!l);)await de(250),i++;if(!l)return oe("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let m=l.closest('[id="email-body-content-top"]'),f=(l.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(m){if(f){let b=f.closest('[aria-hidden="true"]');b&&b.removeAttribute("aria-hidden"),f.focus(),Ce(f)}await de(300),m.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let p=m.querySelector("#cases-body-field");if(p){let b=document.createRange();b.selectNodeContents(p),b.collapse(!0);let q=window.getSelection();q.removeAllRanges(),q.addRange(b)}return!0}return!1}async function lt(e){if(!e||!await Zt())return;let o=await vt();fe("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let n=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(n&&(n.click(),await de(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let a=document.querySelector('input[aria-label="Enter To email address"]');a&&(await rt(a,o.clientEmail),st(a,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let a=document.querySelector('input[aria-label="Enter Bcc email address"]');a&&(await rt(a,o.internalEmail),st(a,`
                <strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.
                <div style="margin-top:4px;">
                    <a href="https://mail.google.com/mail/u/0?ui=2&ik=ed23fb3167&attid=0.1&permmsgid=msg-f:1843445102914241244&th=19953b8dda2302dc&view=fimg&fur=ip&permmsgid=msg-f:1843445102914241244&sz=s0-l75-ft&attbid=ANGjdJ9m7O33cM36sxBYohVD6Qsapyux4PNr8qmTBlZ8zkp_LR79suGZhnxFJtBoFDeyMFygsH_tvCts5fnX0WV4rdClw9YqqR7guLnaXU9UzmZRRMRXEoC7T_MPbwo&disp=emb&realattid=ii_mfmv7wjm1&zw" target="_blank" style="color:#1a73e8;text-decoration:none;font-weight:500;display:inline-flex;align-items:center;">
                        Consultar Regra <span style="font-size:14px;margin-left:2px;">\u2197</span>
                    </a>
                </div>
            `))}await de(500);let r=document.querySelector('material-button[debug-id="canned_response_button"]');if(r){Ce(r),await de(1e3);let a=document.querySelector("material-auto-suggest-input input");if(a){Ce(a),document.execCommand("insertText",!1,e),a.dispatchEvent(new Event("input",{bubbles:!0})),fe("\u23F3 Buscando resultado da Canned Response...","info");let i=null,l=0,m=15e3,u=500;for(;l<m&&(i=document.querySelector("material-select-dropdown-item"),!i);)await de(u),l+=u;if(i){Ce(i),await de(1500);let f=Tt();if(f&&o.advertiserName){let p=f.innerHTML;p.includes("{%ADVERTISER_NAME%}")&&(f.innerHTML=p.replace(/{%ADVERTISER_NAME%}/g,o.advertiserName))}oe("Canned Response aplicada!")}else fe(`\u274C Timeout: Resultado '${e}' n\xE3o apareceu ap\xF3s 15s.`,"error"),oe(`Timeout: Template '${e}' n\xE3o carregou.`,{error:!0})}}else oe("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function Jt(e){if(fe(`\u{1F680} Iniciando Quick Email: ${e.name}`),!await Zt())return;let o=await vt(),n=yt();await de(600),fe("\u{1F4E7} Processando destinat\xE1rios...");let r=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(r&&(r.click(),await de(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let l=document.querySelector('input[aria-label="Enter To email address"]');l&&(await rt(l,o.clientEmail),st(l,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let l=document.querySelector('input[aria-label="Enter Bcc email address"]');l&&(await rt(l,o.internalEmail),st(l,`
                <strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.
                <div style="margin-top:4px;">
                    <a href="https://mail.google.com/mail/u/0?ui=2&ik=ed23fb3167&attid=0.1&permmsgid=msg-f:1843445102914241244&th=19953b8dda2302dc&view=fimg&fur=ip&permmsgid=msg-f:1843445102914241244&sz=s0-l75-ft&attbid=ANGjdJ9m7O33cM36sxBYohVD6Qsapyux4PNr8qmTBlZ8zkp_LR79suGZhnxFJtBoFDeyMFygsH_tvCts5fnX0WV4rdClw9YqqR7guLnaXU9UzmZRRMRXEoC7T_MPbwo&disp=emb&realattid=ii_mfmv7wjm1&zw" target="_blank" style="color:#1a73e8;text-decoration:none;font-weight:500;display:inline-flex;align-items:center;">
                        Consultar Regra <span style="font-size:14px;margin-left:2px;">\u2197</span>
                    </a>
                </div>
            `))}let a=document.querySelector('input[aria-label="Subject"]');a&&e.subject&&(a.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(a,e.subject),a.dispatchEvent(new Event("input",{bubbles:!0})),await de(300));let i=Tt();if(i){let m=(i.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');m&&(m.focus(),Ce(m));let u=new Date;u.setDate(u.getDate()+3);let f=u.getDay();f===6?u.setDate(u.getDate()+2):f===0&&u.setDate(u.getDate()+1);let p=u.toLocaleDateString("pt-BR"),b=e.body;b=b.replace(/\[Nome do Cliente\]/g,o.advertiserName||"Cliente"),b=b.replace(/\[INSERIR URL\]/g,o.websiteUrl||"seu site"),b=b.replace(/\[URL\]/g,o.websiteUrl||"seu site"),b=b.replace(/\[Seu Nome\]/g,n),b=b.replace(/\[MM\/DD\/YYYY\]/g,p),document.execCommand("insertHTML",!1,b),m&&(m.dispatchEvent(new Event("input",{bubbles:!0})),m.dispatchEvent(new Event("change",{bubbles:!0}))),oe("Email preenchido com sucesso!",{duration:2e3}),fe("\u2705 Processo finalizado com sucesso.","success")}else oe("Erro ao focar no editor.",{error:!0})}var To={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},eo={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function Ee(e,t,o,n,r,a){let i=document.createElement("div");Object.assign(i.style,To),$t(e,i);let l=document.createElement("div");Object.assign(l.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),i.appendChild(l),r&&(r.googleLine=l);let m=document.createElement("div");Object.assign(m.style,{display:"flex",alignItems:"center",gap:"12px"});let u=document.createElement("img");u.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(u.style,{width:"20px",height:"20px",pointerEvents:"none"});let f=document.createElement("span");f.textContent=t,m.appendChild(u),m.appendChild(f);let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center",gap:"4px"});let b='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',q='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',v=document.createElement("div");v.innerHTML=b,Object.assign(v.style,eo),v.title="Sobre",v.classList.add("no-drag"),v.onmouseenter=()=>{v.style.background="rgba(255,255,255,0.1)",v.style.color="#FFF"},v.onmouseleave=()=>{v.style.color!=="rgb(138, 180, 248)"&&(v.style.background="transparent",v.style.color="#9AA0A6")};let S=document.createElement("div");S.innerHTML=q,Object.assign(S.style,eo),S.title="Fechar",S.classList.add("no-drag"),S.onmouseenter=()=>{S.style.background="rgba(242, 139, 130, 0.2)",S.style.color="#F28B82"},S.onmouseleave=()=>{S.style.background="transparent",S.style.color="#9AA0A6"},S.onmousedown=E=>E.stopPropagation(),v.onmousedown=E=>E.stopPropagation(),S.onclick=a;let h=ko(e,t,o,n);return v.onclick=E=>{E.stopPropagation(),h.style.opacity==="1"?(h.style.opacity="0",h.style.pointerEvents="none",v.style.color="#9AA0A6",v.style.background="transparent"):(h.style.opacity="1",h.style.pointerEvents="auto",v.style.color="#8AB4F8",v.style.background="rgba(138, 180, 248, 0.1)")},p.appendChild(v),p.appendChild(S),i.appendChild(m),i.appendChild(p),i}function ko(e,t,o,n){let r=document.createElement("div");return Object.assign(r.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(5px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),r.innerHTML=`
        <div style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${t}</div>
        <div style="color: #5f6368; font-size: 14px; margin-bottom: 24px;">Vers\xE3o ${o}</div>
        
        <div style="color: #3c4043; font-size: 14px; max-width: 90%; line-height: 1.6;">
            ${n}
        </div>

        <div style="margin-top: 32px; font-size: 12px; color: #9aa0a6;">
            created by <span style="color: #1a73e8; font-weight: 500;">@lucaste</span>
        </div>
        
        <button id="close-help-internal" style="margin-top: 24px; padding: 8px 24px; border: 1px solid #dadce0; background: white; border-radius: 18px; color: #1a73e8; cursor: pointer; font-weight: 500; transition: background 0.2s;">
            Voltar
        </button>
    `,setTimeout(()=>{let a=r.querySelector("#close-help-internal");a&&(a.onmouseover=()=>a.style.backgroundColor="#f8f9fa",a.onmouseout=()=>a.style.backgroundColor="white",a.onclick=()=>{r.style.opacity="0",r.style.pointerEvents="none"})},0),e.appendChild(r),r}if(!document.getElementById("cw-module-styles")){let e=document.createElement("style");e.id="cw-module-styles",e.innerHTML=`
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
    `,document.head.appendChild(e)}function Te(e,t,o){let n=document.getElementById(o);if(!t)return;let r=t.getAttribute("data-moved")==="true",a={x:0,y:0};if(n){let f=n.getBoundingClientRect();a.x=f.left+f.width/2,a.y=f.top+f.height/2}let i,l;if(!r)i=window.innerWidth/2,l=window.innerHeight/2;else{let f=t.getBoundingClientRect();i=f.left+f.width/2,l=f.top+f.height/2,i===0&&l===0&&(i=window.innerWidth/2,l=window.innerHeight/2)}let m=a.x-i,u=a.y-l;e?(Z.playGenieOpen(),t.style.transition="none",t.style.opacity="0",t.style.pointerEvents="auto",r?t.style.transform=`translate(${m}px, ${u}px) scale(0.05)`:t.style.transform=`translate(calc(-50% + ${m}px), calc(-50% + ${u}px)) scale(0.05)`,t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("open"),n&&n.classList.add("active"),t.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",t.style.opacity="1",r?t.style.transform="translate(0, 0) scale(1)":t.style.transform="translate(-50%, -50%) scale(1)"}),typeof to=="function"&&to(t,o)):(Z.playSwoosh(),t.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",t.style.pointerEvents="none",requestAnimationFrame(()=>{t.style.opacity="0",r?t.style.transform=`translate(${m}px, ${u}px) scale(0.1)`:t.style.transform=`translate(calc(-50% + ${m}px), calc(-50% + ${u}px)) scale(0.1)`}),setTimeout(()=>{t.classList.remove("open"),n&&n.classList.remove("active"),t.style.transition="",t.style.transform=""},300),typeof kt=="function"&&kt(t))}function to(e,t){kt(e);let o=n=>{if(!e.classList.contains("open"))return;let r=e.contains(n.target),a=document.querySelector(".cw-pill"),i=a&&a.contains(n.target);r?(e.classList.remove("idle"),e.style.zIndex="2147483648"):i||(e.classList.add("idle"),e.style.zIndex="2147483646")};e._idleHandler=o,document.addEventListener("mousedown",o)}function kt(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}var ao="https://script.google.com/a/macros/google.com/s/AKfycbwxxY5EhL3U1ZIEvs_y28FFeIFr7rMfSzNIljclqPd9Mk58-gx7pBRfZ8pQmXt2P1IMjw/exec",Ot="cw_data_broadcast",oo="cw_data_tips",Oo=["Processando sua solicita\xE7\xE3o...","Dica: Mantenha suas notas organizadas.","Aguarde um momento...","Quase l\xE1..."];function no(e){return new Promise((t,o)=>{let n="cw_cb_"+Math.round(1e4*Math.random()),r=document.createElement("script");window[n]=a=>{document.body.removeChild(r),delete window[n],t(a)},r.src=`${ao}?op=${e}&callback=${n}&t=${Date.now()}`,r.onerror=()=>{document.body.removeChild(r),delete window[n],o(new Error("JSONP Load Error"))},document.body.appendChild(r)})}var He={fetchTips:async()=>{try{console.log("\u{1F4E5} Baixando dicas via JSONP...");let e=await no("tips");e&&e.tips&&Array.isArray(e.tips)&&(localStorage.setItem(oo,JSON.stringify(e.tips)),console.log("\u2705 Dicas atualizadas:",e.tips.length))}catch(e){console.warn("TechSol: Erro ao baixar dicas (Offline).",e)}},fetchData:async()=>{try{console.log("\u{1F4E5} Baixando Broadcasts via JSONP...");let e=await no("broadcast");if(e&&e.broadcast)return localStorage.setItem(Ot,JSON.stringify(e.broadcast)),console.log("\u2705 Broadcasts atualizados:",e.broadcast.length),e}catch(e){console.warn("TechSol: Erro ao buscar Broadcasts.",e)}return{broadcast:JSON.parse(localStorage.getItem(Ot)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(Ot)||"[]"),getRandomTip:()=>{let e=Oo,t=localStorage.getItem(oo);if(t)try{e=JSON.parse(t)}catch{}return e[Math.floor(Math.random()*e.length)]},logUsage:(e,t="")=>{let n={op:"log",user:window._USER_ID||"agente_anonimo",action:e,meta:t};fetch(ao,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(n)}).catch(r=>console.log("Log fail",r))}};var pe={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00"},qt=e=>new Promise(t=>setTimeout(t,e));function io(e){let t="cw-command-center-style";if(!document.getElementById(t)){let h=document.createElement("style");h.id=t,h.innerHTML=`
            @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@500&display=swap');

            /* --- SISTEMA DE COLAPSO (APPLE STYLE) --- */
            .cw-brand-btn {
                width: 40px; height: 40px;
                border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center;
                cursor: pointer; position: relative;
                color: #fff; margin-right: 4px; z-index: 20;
                transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-brand-btn:hover { background: rgba(255, 255, 255, 0.1); transform: scale(1.1); }
            .cw-brand-btn svg { width: 24px; height: 24px; filter: drop-shadow(0 0 8px rgba(255,255,255,0.4)); }
            
            /* Estado Colapsado */
            .cw-pill.collapsed {
                width: 56px !important; height: 56px !important;
                padding: 0 !important; border-radius: 50% !important;
                justify-content: center; align-items: center; /* Garante centro absoluto */
                background: rgba(40, 40, 40, 0.95);
                border-color: rgba(255,255,255,0.2);
            }
            
            /* Esconde itens internos */
            .cw-pill.collapsed .cw-btn:not(.cw-brand-btn),
            .cw-pill.collapsed .cw-sep,
            .cw-pill.collapsed .cw-grip {
                opacity: 0; pointer-events: none; width: 0; margin: 0; padding: 0; transform: scale(0.5);
            }
            
            /* Transi\xE7\xF5es dos itens */
            .cw-pill .cw-btn, .cw-pill .cw-sep, .cw-pill .cw-grip {
                transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
                transform-origin: center left;
            }
            
            /* Anima\xE7\xE3o do Brand Button ao fechar */
            .cw-pill.collapsed .cw-brand-btn { margin-right: 0; transform: rotate(360deg); }
            
            /* Tooltips Brand */
            .cw-brand-btn::after {
                content: attr(data-label); position: absolute; top: 50%; left: 60px; 
                transform: translateY(-50%) scale(0.9); padding: 6px 12px; border-radius: 6px; 
                background: #202124; color: #fff; font-size: 12px; font-weight: 500; 
                opacity: 0; pointer-events: none; transition: all 0.2s; white-space: nowrap;
                border: 1px solid rgba(255,255,255,0.15);
            }
            .cw-brand-btn:hover::after { opacity: 1; transform: translateY(-50%) scale(1); }

            /* --- ESTILOS PADR\xC3O --- */
            .cw-focus-backdrop {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px);
                z-index: 2147483646; opacity: 0; pointer-events: none;
                transition: opacity 0.5s;
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
                transition: opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), 
                            width 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
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

            /* Cores Ativas */
            .cw-btn.notes.active { color: ${pe.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${pe.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${pe.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${pe.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.broadcast.active { color: ${pe.orange} !important; background: rgba(249, 171, 0, 0.15); }

            /* Indicador LED */
            .cw-btn::before {
                content: ''; position: absolute; bottom: 2px; left: 50%; 
                width: 4px; height: 4px; border-radius: 50%;
                background-color: currentColor; box-shadow: 0 0 6px currentColor;
                transform: translateX(-50%) scale(0);
                transition: transform 0.3s; pointer-events: none;
            }
            .cw-btn.active::before { transform: translateX(-50%) scale(1); }
            .cw-btn svg { width: 22px; height: 22px; fill: currentColor; pointer-events: none; }

            /* Badge */
            .cw-badge {
                position: absolute; top: 8px; right: 8px; width: 8px; height: 8px;
                background-color: #d93025; border-radius: 50%; border: 1px solid #fff; pointer-events: none;
                z-index: 10; animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }

            .cw-sep { width: 20px; height: 1px; background: rgba(255,255,255,0.2); opacity: 0; transition: opacity 0.5s ease; }
            .cw-sep.visible { opacity: 1; }

            .cw-grip {
                width: 100%; height: 24px; display: flex; align-items: center; justify-content: center; 
                cursor: grab; margin-bottom: 2px; 
            }
            .cw-grip-bar { 
                width: 24px; height: 4px; background-color: ${pe.iconIdle}; border-radius: 4px; 
                opacity: 0.4; transition: all 0.3s; 
            }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            .cw-grip:active { cursor: grabbing; }

            /* --- MODO ILHA DIN\xC2MICA (ANIMA\xC7\xC3O) --- */
            .cw-pill.processing-center {
                top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important;
                width: 320px !important; height: 110px !important; border-radius: 28px !important;
                background: #202124 !important; padding: 0 !important; box-shadow: 0 40px 80px rgba(0,0,0,0.5) !important;
                display: flex !important; flex-direction: column !important; justify-content: center !important;
            }
            .cw-pill.processing-center > *:not(.cw-center-stage) { display: none !important; }

            .cw-center-stage { display: flex; flex-direction: column; align-items: center; gap: 14px; width: 100%; opacity: 0; animation: fadeIn 0.4s ease forwards 0.1s; }
            .cw-center-dots { display: flex; gap: 8px; }
            .cw-center-dots span { width: 8px; height: 8px; border-radius: 50%; animation: googleBounce 1.4s infinite ease-in-out both; }
            .cw-center-dots span:nth-child(1) { background-color: ${pe.blue}; animation-delay: -0.32s; }
            .cw-center-dots span:nth-child(2) { background-color: ${pe.red}; animation-delay: -0.16s; }
            .cw-center-dots span:nth-child(3) { background-color: ${pe.green}; }
            
            .cw-center-text { font-size: 13px; color: #E8EAED; text-align: center; max-width: 90%; font-weight: 500; opacity: 0; transform: translateY(10px); animation: textSlideUp 0.5s forwards 0.2s; }
            .cw-center-success { display: none; color: ${pe.green}; }
            .cw-center-success svg { width: 40px; height: 40px; }
            .cw-center-success.show { display: block; animation: popIn 0.4s; }

            @keyframes fadeIn { to { opacity: 1; } }
            @keyframes googleBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
            @keyframes textSlideUp { to { opacity: 1; transform: translateY(0); } }
    `,document.head.appendChild(h)}let o={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',nexus:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"></path></svg>'},n=document.createElement("div");n.className="cw-pill side-right",n.innerHTML=`
    <button class="cw-brand-btn" id="cw-brand-toggle" data-label="Minimizar">
        ${o.nexus}
    </button>

    <div class="cw-grip" title="Arrastar">
        <div class="cw-grip-bar"></div>
    </div>
    
    <button class="cw-btn notes" id="cw-btn-notes" data-label="Case Notes">${o.notes}</button>
    <button class="cw-btn email" id="cw-btn-email" data-label="Quick Email">${o.email}</button>
    <button class="cw-btn script" id="cw-btn-script" data-label="Call Script">${o.script}</button>
    <button class="cw-btn links" id="cw-btn-links" data-label="Links">${o.links}</button>
    <div class="cw-sep"></div>
    <button class="cw-btn broadcast" id="cw-btn-broadcast" data-label="Avisos">${o.broadcast}</button>

    <div class="cw-status-container">
        <div class="cw-dots" id="cw-loader"><span></span><span></span><span></span></div>
        <div class="cw-check" id="cw-success" style="display:none;">${o.check}</div>
    </div>
  `;let r=document.createElement("div");if(r.className="cw-focus-backdrop",document.body.appendChild(r),document.body.appendChild(n),n.querySelector(".notes").onclick=h=>{h.stopPropagation(),e.toggleNotes()},n.querySelector(".email").onclick=h=>{h.stopPropagation(),e.toggleEmail()},n.querySelector(".script").onclick=h=>{h.stopPropagation(),e.toggleScript()},n.querySelector(".links").onclick=h=>{h.stopPropagation(),e.toggleLinks()},n.querySelector(".broadcast").onclick=h=>{h.stopPropagation();let E=h.currentTarget.querySelector(".cw-badge");E&&(E.style.transform="scale(0)",setTimeout(()=>E.remove(),200)),e.broadcastControl&&e.broadcastControl.toggle()},e.broadcastControl&&e.broadcastControl.hasUnread){let h=document.createElement("div");h.className="cw-badge",n.querySelector(".broadcast").appendChild(h)}let a=n.querySelector("#cw-brand-toggle"),i=!1,l=!1,m,u,f,p,b=3,q=!1;a.onclick=h=>{q||(h.stopPropagation(),i=!i,i?(n.classList.add("collapsed"),a.setAttribute("data-label","Expandir"),a.style.color=pe.blue):(n.classList.remove("collapsed"),a.setAttribute("data-label","Minimizar"),a.style.color="#FFFFFF"))},n.onmousedown=h=>{if(h.target.closest("button")&&!h.target.closest("#cw-brand-toggle")&&!i)return;h.preventDefault(),m=h.clientX,u=h.clientY;let E=n.getBoundingClientRect();f=E.left,p=E.top,q=!1,l=!1,document.addEventListener("mousemove",v),document.addEventListener("mouseup",S)};function v(h){let E=h.clientX-m,I=h.clientY-u;!l&&Math.sqrt(E*E+I*I)>b&&(l=!0,q=!0,n.style.transition="none"),l&&(n.style.left=`${f+E}px`,n.style.top=`${p+I}px`,n.style.right="auto",n.style.bottom="auto",n.style.transform="none")}function S(h){if(document.removeEventListener("mousemove",v),document.removeEventListener("mouseup",S),l){l=!1,n.style.transition="left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s ease, width 0.6s ease, height 0.6s ease";let E=window.innerWidth,I=window.innerHeight,R=n.getBoundingClientRect(),j=R.left+R.width/2,x,g=24;j<E/2?(x=g,n.classList.remove("side-right"),n.classList.add("side-left")):(x=E-R.width-g,n.classList.remove("side-left"),n.classList.add("side-right"));let s=R.top;s<g&&(s=g),s>I-R.height-g&&(s=I-R.height-g),n.style.left=`${x}px`,n.style.top=`${s}px`}else{let E=h.target.closest("button");E&&(E.style.transform="scale(0.9)",setTimeout(()=>E.style.transform="",150))}}(async function(){await qt(2800),n.classList.add("docked"),await qt(300);let E=n.querySelectorAll(".cw-btn");n.querySelectorAll(".cw-sep").forEach(R=>R.classList.add("visible"));for(let R=0;R<E.length;R++)E[R].classList.add("popped"),await qt(90)})()}function ct(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop");if(!e)return()=>{};let o=document.createElement("div");o.className="cw-center-stage",o.innerHTML=`
        <div class="cw-center-dots"><span></span><span></span><span></span></div>
        <div class="cw-center-text">${He.getRandomTip()}</div>
        <div class="cw-center-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
    `,e.appendChild(o);let n=Date.now();return e.classList.add("processing-center"),t&&t.classList.add("active"),function(){let a=Date.now()-n,i=Math.max(0,2e3-a);setTimeout(()=>{let l=o.querySelector(".cw-center-dots"),m=o.querySelector(".cw-center-text"),u=o.querySelector(".cw-center-success");l&&(l.style.display="none"),m&&(m.style.display="none"),u&&u.classList.add("show"),e.classList.add("success"),setTimeout(()=>{e.classList.remove("processing-center"),setTimeout(()=>{o.remove(),e.classList.remove("success"),t&&t.classList.remove("active")},400)},1e3)},i)}}function so(e){let t=document.createElement("div");t.className="cw-step-scenarios";let o=document.createElement("div");Object.assign(o.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let n=document.createElement("div");Object.assign(n.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"40px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s ease"}),n.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>";let r=null;Object.entries(Se).forEach(([i,l])=>{let m=document.createElement("div");m.textContent=i,Object.assign(m.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",display:"flex",alignItems:"center",gap:"6px"}),m.onmouseenter=()=>{r!==l&&(n.style.background="#fff",n.style.borderColor="#1a73e8",n.style.color="#202124",n.textContent=`"${l.substring(0,120)}${l.length>120?"...":""}"`),r!==l&&(m.style.background="#f1f3f4")},m.onmouseleave=()=>{r!==l&&(r||(n.style.background="#f8f9fa",n.style.borderColor="#dadce0",n.style.color="#5f6368",n.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>"),m.style.background="#ffffff")},m.onclick=()=>{Z.playClick(),r===l?(r=null,a(),e("")):(r=l,a(),m.style.transform="scale(0.95)",setTimeout(()=>m.style.transform="scale(1)",150),e(l))},o.appendChild(m)});function a(){Array.from(o.children).forEach(i=>{Se[i.textContent]===r?(i.style.background="#e8f0fe",i.style.borderColor="#1a73e8",i.style.color="#1967d2",i.style.fontWeight="500"):(i.style.background="#ffffff",i.style.borderColor="#dadce0",i.style.color="#3c4043",i.style.fontWeight="400")})}return t.appendChild(o),t.appendChild(n),t}var ro=e=>new Promise(t=>setTimeout(t,e));function dt(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>e.dispatchEvent(new MouseEvent(o,t)))}function It(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let o=document.createRange();o.selectNodeContents(t);let n=window.getSelection();n.removeAllRanges(),n.addRange(o);try{document.execCommand("copy")}catch{oe("Falha ao copiar",{error:!0})}n.removeAllRanges(),document.body.removeChild(t)}function co(e){["input","change","keydown","keyup"].forEach(o=>{let n=new Event(o,{bubbles:!0,cancelable:!0});e.dispatchEvent(n)})}function lo(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function po(){console.log("Iniciando processo de Nova Nota...");let e=lo(),t=e.length,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(i=>i.innerText.trim()==="description");if(n){let i=n.closest("material-fab")||n.closest("material-button");i?(i.style&&(i.style.display="block",i.style.visibility="visible"),dt(i)):dt(n)}else{let i=document.querySelector("material-fab-speed-dial");if(i){let l=i.querySelector(".trigger");l?(l.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),dt(l)):i.click(),await ro(800);let u=Array.from(document.querySelectorAll("i.material-icons-extended")).find(f=>f.innerText.trim()==="description");u&&dt(u)}}let r=null,a=0;for(;!r&&a<20;){await ro(300);let i=lo();if(i.length>t)r=i.find(l=>!e.includes(l)),r||(r=i[i.length-1]);else if(a>10){let l=i.filter(m=>m.offsetParent!==null);l.length>0&&(r=l[l.length-1])}a++}return r}var U={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},ke="cubic-bezier(0.25, 0.8, 0.25, 1)",qo={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${U.border}`,backgroundColor:U.bgInput,fontSize:"14px",color:U.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${ke}, box-shadow 0.2s ${ke}, background-color 0.2s`,outline:"none"},rn={...qo,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},ln={fontSize:"13px",fontWeight:"700",color:U.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},cn={display:"block",fontSize:"13px",fontWeight:"600",color:U.text,marginBottom:"8px",marginTop:"16px"},dn={fontSize:"12px",color:U.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},pn={fontSize:"12px",color:U.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},un={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:U.text,cursor:"pointer",padding:"12px 14px",backgroundColor:U.surface,border:`1px solid ${U.border}`,borderRadius:"12px",transition:`all 0.2s ${ke}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},Nt={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:U.primary},mn={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:U.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${ke}, box-shadow 0.2s ${ke}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},gn={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${U.primary}`,color:U.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${ke}`},bn={background:"transparent",border:`1px solid ${U.border}`,borderRadius:"20px",color:U.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${ke}`,fontFamily:"'Google Sans', 'Roboto'"};var fn={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:U.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},hn={fontSize:"13px",fontWeight:"700",color:U.primary,minWidth:"20px",textAlign:"center"},xn={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${U.border}`,backgroundColor:U.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${ke}, box-shadow 0.2s ${ke}`},yn={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${U.bgInput}`},vn={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${U.border}`,backgroundColor:U.surface,color:U.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${ke}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},An={backgroundColor:U.primaryBg,color:U.primary,borderColor:U.primary,fontWeight:"600"},wn={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:U.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},Sn={borderTop:`1px solid ${U.bgInput}`,paddingTop:"20px",marginTop:"16px"};var Cn={maxHeight:"240px",overflowY:"auto",border:`1px solid ${U.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:U.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},En={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${U.bgInput}`,cursor:"pointer",fontSize:"13px",color:U.text,transition:"background 0.1s",userSelect:"none"};var Io={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},No={fontSize:"12px",color:"#e37400",marginTop:"4px"},_o={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},Ro={display:"flex",gap:"15px",marginBottom:"10px"};function uo(){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,Io);let t=document.createElement("label");t.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(t.style,St,{marginTop:"0"});let o=document.createElement("div");Object.assign(o.style,Ro);let n=document.createElement("input");n.type="radio",n.name="ts_usage_mod",n.value="Sim",Object.assign(n.style,Nt);let r=document.createElement("label");r.textContent="Sim";let a=document.createElement("div");Object.assign(a.style,{display:"flex",alignItems:"center"}),a.appendChild(n),a.appendChild(r);let i=document.createElement("input");i.type="radio",i.name="ts_usage_mod",i.value="N\xE3o",i.checked=!0,Object.assign(i.style,Nt);let l=document.createElement("label");l.textContent="N\xE3o";let m=document.createElement("div");Object.assign(m.style,{display:"flex",alignItems:"center"}),m.appendChild(i),m.appendChild(l),o.appendChild(a),o.appendChild(m);let u=document.createElement("div");u.style.display="block";let f=document.createElement("label");f.textContent="Qual foi o Motivo?",Object.assign(f.style,St,{fontSize:"12px"});let p=document.createElement("input");p.type="text",Object.assign(p.style,_o);let b=document.createElement("div");b.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(b.style,No),u.appendChild(f),u.appendChild(p),u.appendChild(b),e.appendChild(t),e.appendChild(o),e.appendChild(u),n.onchange=()=>{u.style.display="none"},i.onchange=()=>{u.style.display="block"};function q(h,E){if(e.style.display="none",!h||h.includes("Education")||!E||E.length===0)return;let I=E.some(s=>s.includes("enhanced")||s==="ec_google_ads"),R=E.some(s=>(s.includes("conversion")||s.includes("ads"))&&!s.includes("enhanced")),j=E.some(s=>s.includes("ga4")||s.includes("analytics")||s.includes("ua")),x=E.some(s=>s.includes("merchant")||s.includes("gmc")||s.includes("shopping"));(I||R&&!j&&!x)&&(e.style.display="block")}function v(){if(e.style.display==="none")return"";let h=`<br><b>Utilizou Tag Support?</b> ${n.checked?"Sim":"N\xE3o"}`;return i.checked&&p.value.trim()!==""&&(h+=`<br><b>Motivo:</b> ${p.value}`),h+="<br>",h}function S(){e.style.display="none",i.checked=!0,n.checked=!1,u.style.display="block",p.value=""}return{element:e,updateVisibility:q,getOutput:v,reset:S}}var G={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Ve={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function mo(e){let t={},o="implementation";function n(x){let g=x.toLowerCase();return g.includes("ads")||g.includes("conversion")||g.includes("remarketing")?G.brands.ads:g.includes("ga4")||g.includes("analytics")?G.brands.ga4:g.includes("gtm")||g.includes("tag manager")||g.includes("container")?G.brands.gtm:g.includes("merchant")||g.includes("shopping")||g.includes("feed")?G.brands.gmc:G.brands.default}let r=Object.entries(Re).filter(([x,g])=>g.popular),a={};Object.entries(Re).forEach(([x,g])=>{if(g.popular)return;let s=n(g.name);a[s.label]||(a[s.label]={brand:s,tasks:[]}),a[s.label].tasks.push({key:x,...g})});let i="cw-zen-tasks";if(!document.getElementById(i)){let x=document.createElement("style");x.id=i,x.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column; height: 100%; width: calc(100% + 32px); margin: -16px;
                font-family: ${G.font}; background: ${G.bg}; position: relative; overflow: hidden;
            }
            
            /* SCROLL AREA */
            .cw-zen-content { flex: 1; overflow-y: auto; padding-bottom: 80px; } /* Espa\xE7o para o Status Bar */

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${G.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${G.white}; 
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
                font-size: 12px; font-weight: 500; color: ${G.textMain}; line-height: 1.2; 
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
                color: ${G.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${G.border}; border-radius: 10px; background: ${G.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${G.blue}; box-shadow: 0 0 0 3px ${G.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${G.border}; border-radius: 10px; background: ${G.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${G.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${G.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${G.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${G.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${G.blueLight}; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${G.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${G.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${G.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${G.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${G.border};
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${G.shadowFloat}; z-index: 10;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${G.textMain}; }
            
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
                font-family: ${G.font}; font-size: 15px; font-weight: 600; color: ${G.textMain};
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
                border-color: ${G.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${G.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${G.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${G.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 10px; font-weight: 700; color: ${G.textSub};
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
        `,document.head.appendChild(x)}let l=document.createElement("div");l.className="cw-zen-container";let m=document.createElement("div");Object.assign(m.style,{display:"none"});let u=document.createElement("div");u.className="cw-screens-container",m.appendChild(u),l.innerHTML=`
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
    `;let f=l.querySelector(".cw-hero-grid"),p=l.querySelector(".cw-acc-container"),b=l.querySelector(".cw-results-container"),q=l.querySelector(".cw-search-input"),v=l.querySelector(".cw-status-bar"),S=l.querySelector(".cw-status-text"),h=l.querySelector(".cw-footer-icons");r.forEach(([x,g])=>{let s=n(g.name),c=document.createElement("div");c.className="cw-hero-card",c.id=`hero-${x}`,c.style.setProperty("--hero-color",s.color),c.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${Ve[s.icon]}</div>
                <div class="cw-hero-label">${g.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,c.onclick=A=>{if(A.target.closest(".cw-step-btn"))return;let d=t[x]?t[x].count:0;I(x,d>0?-d:1,g)},c.querySelector(".minus").onclick=()=>I(x,-1,g),c.querySelector(".plus").onclick=()=>I(x,1,g),c.dataset.color=s.color,f.appendChild(c)});function E(x,g){let s=n(g.name),c=document.createElement("div");return c.className="cw-task-item",c.dataset.id=x,c.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${s.bg}; color:${s.color}">
                    ${Ve[s.icon]||Ve.default}
                </div>
                <div class="cw-task-label">${g.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,c.onclick=A=>{if(A.target.closest(".cw-step-btn"))return;let d=t[x]?t[x].count:0;I(x,d>0?-d:1,g)},c.querySelector(".minus").onclick=()=>I(x,-1,g),c.querySelector(".plus").onclick=()=>I(x,1,g),c}Object.entries(a).forEach(([x,g])=>{let s=document.createElement("div");s.className="cw-acc-group";let c=document.createElement("div");c.className="cw-acc-header",c.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${g.brand.color}"></div>
                ${x}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,c.onclick=()=>{p.querySelectorAll(".cw-acc-group.open").forEach(d=>{d!==s&&d.classList.remove("open")}),s.classList.toggle("open")};let A=document.createElement("div");A.className="cw-acc-body",g.tasks.forEach(d=>{let y=E(d.key,d);A.appendChild(y)}),s.appendChild(c),s.appendChild(A),p.appendChild(s)});function I(x,g,s){t[x]||(t[x]={count:0,data:s,brand:n(s.name)}),t[x].count+=g,t[x].count<=0&&delete t[x],R(),j(),e&&e()}function R(){r.forEach(([A])=>{let d=f.querySelector(`#hero-${A}`);if(!d)return;let y=t[A];y?(d.classList.add("active"),d.querySelector(".cw-step-val").textContent=y.count,d.querySelector(".cw-step-val").style.color=d.dataset.color):d.classList.remove("active")}),l.querySelectorAll(".cw-task-item").forEach(A=>{let d=A.dataset.id,y=t[d];y?(A.classList.add("selected"),A.querySelector(".cw-step-val").textContent=y.count):A.classList.remove("selected")});let g=Object.keys(t),s=0,c=[];if(g.forEach(A=>{let d=t[A];s+=d.count;for(let y=0;y<d.count;y++)c.length<6&&c.push(d.brand)}),s>0){v.classList.add("visible");let A=s>1?"A\xE7\xF5es":"A\xE7\xE3o",d=s>1?"definidas":"definida";S.textContent=`${s} ${A} ${d}`,h.innerHTML="",c.forEach(y=>{let O=document.createElement("div");O.className="cw-mini-icon",O.innerHTML=Ve[y.icon]||Ve.default;let w=O.querySelector("svg");w&&(w.style.width="14px",w.style.height="14px"),h.appendChild(O)})}else v.classList.remove("visible")}q.addEventListener("input",x=>{let g=x.target.value.toLowerCase();if(g.length>0){p.style.display="none",b.style.display="block",b.innerHTML="";let s=!1;Object.entries(Re).forEach(([c,A])=>{if(A.name.toLowerCase().includes(g)){s=!0;let d=E(c,A);t[c]&&(d.classList.add("selected"),d.querySelector(".cw-step-val").textContent=t[c].count),b.appendChild(d)}}),s||(b.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else p.style.display="block",b.style.display="none"});function j(){u.innerHTML="";let x=Object.keys(t),g=!1,s=document.getElementById("sub-status"),c="implementation";if(s&&s.value.toLowerCase().includes("education")&&(c="education"),x.length===0){u.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}if(x.length===0){u.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}let A=document.createElement("div");A.className="cw-info-banner",A.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Todos os Screenshots s\xE3o baseados na descri\xE7\xE3o do 
                <a href="https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/" target="_blank" class="cw-info-link">Win Criteria</a>.
            </span>
        `,u.appendChild(A),x.forEach(d=>{let y=t[d].data,O=t[d].count,w=t[d].brand,k=y.screenshots?y.screenshots[c]||[]:["Link da Evid\xEAncia"];if(k.length>0){g=!0;for(let ne=1;ne<=O;ne++){let z=document.createElement("div");z.className="cw-screen-card",z.style.setProperty("--brand-color",w.color),z.style.setProperty("--brand-bg",w.bg),z.style.setProperty("--brand-shadow",w.color+"40");let L=document.createElement("div");L.className="cw-card-header";let M=document.createElement("div");M.className="cw-card-icon",M.innerHTML=Ve[w.icon]||Ve.default;let P=document.createElement("div");P.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let X=document.createElement("input");X.className="cw-card-title-input",X.id=`name-${d}-${ne}`,X.value=`${y.name}${O>1?" #"+ne:""}`,X.title="Clique para renomear esta task";let H=document.createElement("span");H.className="cw-edit-hint",H.innerHTML="\u270E Renomear",P.appendChild(X),P.appendChild(H),L.appendChild(M),L.appendChild(P),z.appendChild(L),k.forEach((he,W)=>{let _=document.createElement("div");_.className="cw-input-group";let J=document.createElement("label");J.className="cw-input-label",J.textContent=he.replace(/📷|:|•/g,"").trim();let re=document.createElement("input");re.className="cw-input-field",re.id=`screen-${d}-${ne}-${W}`,re.placeholder="Cole o link aqui...",re.setAttribute("autocomplete","off"),re.addEventListener("input",()=>{re.value.trim().length>5?re.classList.add("filled"):re.classList.remove("filled")});let ge=document.createElement("div");ge.className="cw-input-check",ge.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',_.appendChild(J),_.appendChild(re),_.appendChild(ge),z.appendChild(_)}),u.appendChild(z)}}}),m.style.display=g?"block":"none"}return{selectionElement:l,screenshotsElement:m,updateSubStatus:()=>j(),getCheckedElements:()=>Object.keys(t).map(x=>({value:x,closest:()=>({querySelector:()=>({textContent:t[x].count})})})),toggleTask:(x,g=!0)=>{let s=t[x];g&&!s?I(x,1,Re[x]):!g&&s&&I(x,-s.count,Re[x])},setMode:x=>{o=x,j()},reset:()=>{for(let x in t)delete t[x];q.value="",p.style.display="block",b.style.display="none",R(),j()}}}function go(){let e="v3.6.0",t="bau",o="pt",n=!1,r=!1,a={input:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},textarea:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease",height:"100px",resize:"vertical"},h3:{fontSize:"14px",fontWeight:"600",color:"#202124",margin:"0 0 12px 0"},label:{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},checkboxLabel:{display:"flex",alignItems:"center",marginBottom:"10px",fontSize:"14px",fontWeight:"400",cursor:"pointer",padding:"8px",background:"#f8f9fa",borderRadius:"6px",transition:"background-color 0.2s ease, box-shadow 0.2s ease",userSelect:"none"},checkboxInput:{width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"},buttonBase:{flex:"1 1 0",padding:"10px 0",color:"#fff",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"500",cursor:"pointer",marginTop:"16px"},stepBlock:{borderTop:"1px solid #eee",paddingTop:"12px",marginTop:"12px"},radioContainer:{display:"flex",gap:"15px",marginBottom:"10px"},optionalBtn:{width:"100%",padding:"10px",background:"white",border:"1px dashed #1a73e8",color:"#1a73e8",borderRadius:"6px",cursor:"pointer",fontWeight:"500",fontSize:"13px",marginBottom:"10px",transition:"all 0.2s"},helpLink:{fontSize:"12px",color:"#1a73e8",textDecoration:"none",cursor:"pointer",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"color 0.2s"}},i=uo(),l=mo(()=>{let D=l.getCheckedElements().map(T=>T.value);w&&w.value&&i.updateVisibility(w.value,D)}),m=document.createElement("div");m.id="autofill-popup",m.classList.add("cw-module-window"),Object.assign(m.style,we,{right:"100px",width:"400px",transition:"width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)"});let f=Ee(m,"Case Notes Assistant",e,"Gera notas padronizadas automaticamente. Selecione o status, as tasks realizadas e preencha os detalhes para inserir no caso.",{popup:m,googleLine:null},()=>xt());m.appendChild(f);let p=document.createElement("div");Object.assign(p.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1"}),m.appendChild(p);let b=document.createElement("div");b.textContent="created by lucaste@",Object.assign(b.style,Wt),m.appendChild(b);let q=document.createElement("div");q.id="step-lang-type";let v=document.createElement("label");Object.assign(v.style,a.label),q.appendChild(v);let S=document.createElement("div");Object.assign(S.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let h=document.createElement("div");h.textContent="Portugu\xEAs",h.classList.add("no-drag"),Object.assign(h.style,be);let E=document.createElement("div");E.textContent="Espa\xF1ol",E.classList.add("no-drag"),Object.assign(E.style,be),h.onclick=()=>gt("pt"),E.onclick=()=>gt("es"),S.appendChild(h),S.appendChild(E),q.appendChild(S),p.appendChild(q);let I=document.createElement("div");I.id="step-0-case-type";let R=document.createElement("label");Object.assign(R.style,a.label),I.appendChild(R);let j=document.createElement("div");Object.assign(j.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let x=document.createElement("div");x.textContent="BAU",x.classList.add("no-drag"),Object.assign(x.style,be);let g=document.createElement("div");g.textContent="LM",g.classList.add("no-drag"),Object.assign(g.style,be),x.onclick=()=>mt("bau"),g.onclick=()=>mt("lm"),j.appendChild(x),j.appendChild(g),I.appendChild(j),p.appendChild(I);let s=document.createElement("div");s.id="step-1-selection";let c=document.createElement("label");c.className="cw-input-label",c.textContent="Status Principal";let A=document.createElement("select");A.id="main-status",A.className="cw-select",A.innerHTML=`
      <option value="" disabled selected hidden>Selecione uma op\xE7\xE3o...</option>
      <option value="NI">NI - Need Info</option>
      <option value="SO">SO - Solution Offered</option>
      <option value="IN">IN - Inactive</option>
      <option value="AS">AS - Assigned</option>
      <option value="DC">DC - Discard</option>
  `;let d=document.createElement("div");d.style.cssText="display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; margin-bottom: 6px;";let y=document.createElement("label");y.className="cw-input-label",y.textContent="Sub-status",y.style.marginBottom="0";let O=document.createElement("a");O.href="https://seu-link-do-guia-aqui.com",O.target="_blank",O.className="cw-info-link",O.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; transform:translateY(1px)"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Guia de Substatus',Object.assign(O.style,a.helpLink),d.appendChild(y),d.appendChild(O);let w=document.createElement("select");w.id="sub-status",w.className="cw-select",w.disabled=!0,w.innerHTML='<option value="" disabled selected hidden>Aguardando status principal...</option>',s.appendChild(c),s.appendChild(A),s.appendChild(d),s.appendChild(w),p.appendChild(s);let k=document.createElement("div");k.id="step-1-1-portugal",Object.assign(k.style,a.stepBlock,{display:"none"});let ne=document.createElement("label");Object.assign(ne.style,a.label),k.appendChild(ne);let z=document.createElement("div");Object.assign(z.style,a.radioContainer);let L=document.createElement("div");Object.assign(L.style,{display:"flex",alignItems:"center"});let M=document.createElement("input");M.type="radio",M.name="portugal-group",M.value="sim",Object.assign(M.style,a.checkboxInput);let P=document.createElement("label");P.htmlFor="portugal-sim",Object.assign(P.style,{cursor:"pointer"}),L.appendChild(M),L.appendChild(P);let X=document.createElement("div");Object.assign(X.style,{display:"flex",alignItems:"center"});let H=document.createElement("input");H.type="radio",H.name="portugal-group",H.value="nao",H.checked=!0,Object.assign(H.style,a.checkboxInput);let he=document.createElement("label");he.htmlFor="portugal-nao",Object.assign(he.style,{cursor:"pointer"}),X.appendChild(H),X.appendChild(he),z.appendChild(L),z.appendChild(X),k.appendChild(z),p.appendChild(k);function W(C){n=C,C?_.style.display="block":_.style.display="none"}M.onchange=()=>W(!0),H.onchange=()=>W(!1);let _=document.createElement("div");_.id="step-1-2-consent",Object.assign(_.style,a.stepBlock,{display:"none"});let J=document.createElement("label");Object.assign(J.style,a.label),_.appendChild(J);let re=document.createElement("div");Object.assign(re.style,a.radioContainer);let ge=document.createElement("div");Object.assign(ge.style,{display:"flex",alignItems:"center"});let ve=document.createElement("input");ve.type="radio",ve.name="consent-group",ve.value="Sim",ve.checked=!0,Object.assign(ve.style,a.checkboxInput);let ie=document.createElement("label");ie.htmlFor="consent-sim",Object.assign(ie.style,{cursor:"pointer"}),ge.appendChild(ve),ge.appendChild(ie);let ee=document.createElement("div");Object.assign(ee.style,{display:"flex",alignItems:"center"});let Oe=document.createElement("input");Oe.type="radio",Oe.name="consent-group",Oe.value="N\xE3o",Object.assign(Oe.style,a.checkboxInput);let Me=document.createElement("label");Me.htmlFor="consent-nao",Object.assign(Me.style,{cursor:"pointer"}),ee.appendChild(Oe),ee.appendChild(Me),re.appendChild(ge),re.appendChild(ee),_.appendChild(re),p.appendChild(_);let Le=document.createElement("div");Le.id="step-1-5-snippets",Object.assign(Le.style,a.stepBlock,{display:"none"});let nt=document.createElement("h3");Object.assign(nt.style,a.h3),nt.textContent="Cen\xE1rios Comuns";let Ae=so(C=>{let D=document.querySelector("textarea");D&&(D.value=C,D.dispatchEvent(new Event("input")),D.style.transition="background-color 0.2s",D.style.backgroundColor="#e8f0fe",setTimeout(()=>D.style.backgroundColor="#fff",300))});Ae.id="snippet-container",Le.appendChild(nt),Le.appendChild(Ae),p.appendChild(Le);let xe=document.createElement("div");xe.id="step-3-form",Object.assign(xe.style,a.stepBlock,{display:"none"});let ut=document.createElement("h3");Object.assign(ut.style,a.h3),xe.appendChild(ut);let _e=document.createElement("div");_e.id="dynamic-form-fields-container",xe.appendChild(_e);let ue=document.createElement("button");ue.textContent="+ Gostaria de selecionar uma task?",Object.assign(ue.style,a.optionalBtn),ue.onmouseover=()=>ue.style.background="#e8f0fe",ue.onmouseout=()=>ue.style.background="white",ue.onclick=()=>{ue.style.display="none",De.style.display="block",l.selectionElement.style.display="block"};let De=document.createElement("h3");Object.assign(De.style,a.h3,{marginTop:"20px"});let Rt=l.selectionElement;Object.assign(Rt.style,{marginBottom:"20px"}),xe.appendChild(ue),xe.appendChild(De),xe.appendChild(Rt),xe.appendChild(i.element),xe.appendChild(l.screenshotsElement),p.appendChild(xe);let Fe=document.createElement("div");Fe.id="step-4-email",Object.assign(Fe.style,{display:"none",marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #eee"});let Ge=document.createElement("label");Ge.style.display="flex",Ge.style.alignItems="center",Ge.style.cursor="pointer",Ge.style.fontSize="14px";let ze=document.createElement("input");ze.type="checkbox",ze.checked=!0,Object.assign(ze.style,a.checkboxInput),Ge.appendChild(ze),Ge.appendChild(document.createTextNode("Preencher email automaticamente?")),Fe.appendChild(Ge),p.appendChild(Fe);let We=document.createElement("div");Object.assign(We.style,{display:"none",gap:"8px",padding:"0"}),p.appendChild(We);let Ke=document.createElement("button");Object.assign(Ke.style,a.buttonBase,{backgroundColor:"#5f6368"}),Ke.textContent="Copiar";let Qe=document.createElement("button");Object.assign(Qe.style,a.buttonBase,{backgroundColor:"#1a73e8"}),Qe.textContent="Preencher",We.appendChild(Ke),We.appendChild(Qe);let Ze=document.createElement("div");Object.assign(Ze.style,Ye),Ze.className="no-drag",Ze.title="Redimensionar",m.appendChild(Ze),Xe(m,Ze),document.body.appendChild(m);function mt(C){t=C;let D=Je();Object.assign(x.style,be),Object.assign(g.style,be),C==="bau"?(Object.assign(x.style,D),O.href="https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657"):(Object.assign(g.style,D),O.href="https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243"),w.value&&w.dispatchEvent(new Event("change"))}function V(C){try{if(Ne&&Ne[o]&&Ne[o][C])return Ne[o][C];if(Ne&&Ne.pt&&Ne.pt[C])return Ne.pt[C]}catch{}return C}function vo(){v.textContent=V("idioma"),R.textContent=V("fluxo"),c.textContent=V("status_principal"),y.textContent=V("substatus"),nt.textContent=V("cenarios_comuns"),De.textContent=V("selecione_tasks"),ut.textContent=V("preencha_detalhes"),Ke.textContent=V("copiar"),Qe.textContent=V("preencher"),A.querySelector('option[value=""]')&&(A.querySelector('option[value=""]').textContent=V("select_status")),w.querySelector('option[value=""]')&&(w.querySelector('option[value=""]').textContent=V("select_substatus")),ne.textContent=V("caso_portugal"),P.textContent=V("sim"),he.textContent=V("nao"),J.textContent=V("consentiu_gravacao"),ie.textContent=V("sim"),Me.textContent=V("nao"),_e.querySelectorAll("label").forEach(C=>{let D=C.nextElementSibling.id.replace("field-",""),T=V(D.toLowerCase());T!==D.toLowerCase()?C.textContent=T:C.textContent=D.replace(/_/g," ").replace(/\b\w/g,$=>$.toUpperCase())+":"}),ue.textContent="+ "+(o==="pt"?"Gostaria de selecionar uma task?":"Quisiera seleccionar una tarea?")}function gt(C){o=C;let D=Je();Object.assign(h.style,be),Object.assign(E.style,be),C==="pt"?(Object.assign(h.style,D),k.style.display="block",W(n)):(Object.assign(E.style,D),k.style.display="none",_.style.display="none"),vo(),w.value&&w.dispatchEvent(new Event("change"))}function bt(C){(C.value.trim()===""||C.value.trim()==="\u2022")&&(C.value="\u2022 "),C.onkeydown=function(D){if(D.key==="Enter"){D.preventDefault();let T=this.selectionStart,$=this.selectionEnd,ae=this.value,le=ae.lastIndexOf(`
`,T-1)+1,ye=ae.substring(le,T),ce=ye.trim()==="\u2022"||ye.trim()===""?`
`:`
\u2022 `;this.value=ae.substring(0,T)+ce+ae.substring($),this.selectionStart=this.selectionEnd=T+ce.length}else if(D.key==="Backspace"){let T=this.selectionStart;if(T===this.selectionEnd&&T>0){let $=this.value.substring(0,T);$.endsWith(`
\u2022 `)?(D.preventDefault(),this.value=$.substring(0,T-3)+this.value.substring(this.selectionEnd),this.selectionStart=this.selectionEnd=T-3):$==="\u2022 "&&(D.preventDefault(),this.value="",this.selectionStart=this.selectionEnd=0)}}}}function ft(){let C=typeof Ae<"u"?Ae:document.getElementById("snippet-container");if(!C)return;let D=C.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'),T={},$=new Set;D.forEach(Q=>{let K=Q.id,F=Se[K];if(F)for(let N in F)N==="linkedTask"?$.add(F.linkedTask):N!=="type"&&(T[N]||(T[N]=[]),T[N].includes(F[N])||T[N].push(F[N]))});let ae=new Set;Object.values(Se).forEach(Q=>{Object.keys(Q).forEach(K=>{K!=="linkedTask"&&K!=="type"&&ae.add(K)})}),ae.forEach(Q=>{let K=document.getElementById(Q);if(K){let F=T[Q]||[],N="";ot.includes(Q.replace("field-",""))?(N=F.map(Y=>Y.startsWith("\u2022 ")?Y:"\u2022 "+Y).join(`
`),N===""?N="\u2022 ":N.endsWith(`
\u2022 `)||(N+=`
\u2022 `)):N=F.join(`

`),N.trim()!=="\u2022"&&N.trim()!==""?K.value=N:ot.includes(Q.replace("field-",""))?K.value="\u2022 ":K.value="",K.tagName==="TEXTAREA"&&typeof bt=="function"&&bt(K)}});let le=new Set,ye=new Set;C.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(Q=>{let K=Se[Q.id];K&&K.linkedTask&&(Q.checked?le.add(K.linkedTask):ye.add(K.linkedTask))}),ye.forEach(Q=>{le.has(Q)||l.toggleTask(Q,!1)}),le.forEach(Q=>{l.toggleTask(Q,!0)})}A.onchange=()=>{let C=A.value;if(ht(1.5),w.innerHTML=`<option value="">${V("select_substatus")}</option>`,!C){w.disabled=!0;return}for(let D in tt){let T=tt[D];if(T.status===C){let $=document.createElement("option");$.value=D,$.textContent=T.name,w.appendChild($)}}w.disabled=!1},w.onchange=()=>{let C=w.value;if(ht(1.5),!C)return;l.updateSubStatus(C);let D=tt[C];Ae.innerHTML="";let T=(F,N,Y)=>{let se=document.createElement("label");Object.assign(se.style,a.checkboxLabel),se.onmouseover=()=>se.style.backgroundColor="#e8eaed",se.onmouseout=()=>se.style.backgroundColor="#f8f9fa";let te=document.createElement("input");return te.type=N,te.id=F.id,Object.assign(te.style,a.checkboxInput),se.appendChild(te),se.appendChild(document.createTextNode(` ${F.text}`)),Y.appendChild(se),te},$=[],ae="radio";if(C==="NI_Awaiting_Inputs")$=[{id:"quickfill-ni-inicio-manual",text:"In\xEDcio 2/6 (Manual)"},{id:"quickfill-ni-cms-access",text:"In\xEDcio 2/6 (ADV sem acesso ao CMS)"},{id:"quickfill-ni-followup-bau",text:"Follow-up 2/6 (BAU)"},{id:"quickfill-ni-followup-lm",text:"Follow-up 2/6 (LM)"}];else if(C.startsWith("SO_"))ae="checkbox",$=[{id:"quickfill-gtm-install",text:"Instala\xE7\xE3o do GTM"},{id:"quickfill-whatsapp",text:"Convers\xE3o de WhatsApp"},{id:"quickfill-form",text:"Convers\xE3o de Formul\xE1rio (Padr\xE3o)"},{id:"quickfill-ecw4-close",text:"Fechamento ECW4 (P\xF3s 7 dias)"}];else if(C.startsWith("AS_")){ae="checkbox";let F=document.createElement("label");F.textContent=V("cenarios_comuns"),Object.assign(F.style,a.label),Ae.appendChild(F),$=[{id:"quickfill-as-no-show",text:"Anunciante n\xE3o compareceu (respondeu e-mail)"},{id:"quickfill-as-insufficient-time",text:"Tempo insuficiente"},{id:"quickfill-as-no-access",text:"Anunciante sem acessos necess\xE1rios"}]}else C.startsWith("IN_")?$=[{id:"quickfill-in-nrp-bau",text:"NRP (BAU - 3 tentativas)"},{id:"quickfill-in-nrp-lm",text:"NRP (LM - Sem tentativas)"},{id:"quickfill-in-no-show-bau",text:"No-Show (BAU - 3 tentativas)"},{id:"quickfill-in-2-6-final",text:"Finaliza\xE7\xE3o 2/6 (Sem Resposta)"},{id:"quickfill-in-manual",text:"Outro (Manual)"}]:C.startsWith("DC_")&&(ae="radio",$=[{id:"quickfill-dc-lm-no-access",text:"LM - Sem acessos (Reagendar em BAU)"}]);let le=$.filter(F=>{let N=Se[F.id];return!N.type||N.type==="all"||N.type===t});le.forEach((F,N)=>{let Y=T(F,ae,Ae);ae==="radio"&&(Y.name="scenario-radio-group",N===0&&(Y.checked=!0))}),le.length>0&&(Le.style.display="block"),D.requiresTasks?(ue.style.display="none",De.style.display="block",l.selectionElement.style.display="block"):(ue.style.display="block",De.style.display="none",l.selectionElement.style.display="none"),_e.innerHTML="";let ye=D.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(ye)].forEach(F=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(F))return;let N=F.slice(1,-1),Y=document.createElement("label"),se=V(N.toLowerCase());if(Y.textContent=se!==N.toLowerCase()?se:N.replace(/_/g," ").replace(/\b\w/g,B=>B.toUpperCase())+":",Object.assign(Y.style,a.label),N==="SPEAKEASY_ID"){let B=document.createElement("button");B.innerHTML='<span style="font-size:12px; margin-right:4px;">\u2728</span>Auto Busca',B.style.cssText=`
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
          `,B.title="Localizar Speakeasy ID no hist\xF3rico",B.onmouseover=()=>{B.style.backgroundColor="#c2e7ff",B.style.boxShadow="0 1px 2px rgba(0,0,0,0.1)"},B.onmouseout=()=>{B.style.backgroundColor="#d3e3fd",B.style.boxShadow="none"},B.onmousedown=()=>{B.style.backgroundColor="#a8c7fa",B.style.transform="scale(0.96)"},B.onmouseup=()=>B.style.transform="scale(1)",B.onclick=me=>{me.preventDefault(),Qt(`field-${N}`)},Y.appendChild(B)}let te;ot.includes(N)?(te=document.createElement("textarea"),Object.assign(te.style,a.textarea),te.classList.add("bullet-textarea"),bt(te)):Et.includes(N)?(te=document.createElement("textarea"),Object.assign(te.style,a.textarea)):(te=document.createElement("input"),te.type="text",Object.assign(te.style,a.input),N==="REASON_COMMENTS"&&(C.startsWith("NI_")||C.startsWith("IN_"))&&(Object.assign(Y.style,{display:"none"}),Object.assign(te.style,{display:"none"}))),N==="ON_CALL"&&t==="lm"&&(Object.assign(Y.style,{display:"none"}),Object.assign(te.style,{display:"none"}),te.value="N/A"),te.id=`field-${N}`,_e.appendChild(Y),_e.appendChild(te)});let Q=Ae.querySelectorAll('input[type="checkbox"], input[type="radio"]');Q.length>0&&(Q.forEach(F=>{F.removeEventListener("change",ft),F.addEventListener("change",ft)}),ft()),xe.style.display="block",Pe[C]?Fe.style.display="block":Fe.style.display="none",We.style.display="flex";let K=l.getCheckedElements().map(F=>F.value);i.updateVisibility(C,K)},ue.onclick=()=>{ue.style.display="none",De.style.display="block",l.selectionElement.style.display="block"};function Mt(){let C=w.value;if(!C)return null;let T=tt[C].template.replace(/\n/g,"<br>"),$='style="margin-bottom: 12px; padding-left: 30px;"',ae=[],le="",ye=l.getCheckedElements();ye.length>0&&ye.forEach(K=>{let F=K.value,N=Re[F],Y=K.closest().querySelector(".stepper-count"),se=Y?parseInt(Y.textContent):1;se>1?ae.push(`${N.name} (x${se})`):ae.push(N.name)});let ce=l.screenshotsElement;if(ce){let K=Array.from(ce.querySelectorAll('input[id^="name-"]'));K.length>0&&K.forEach(F=>{let N=F.value,Y=F.closest(".cw-screen-card");if(Y){let se=Y.querySelectorAll('input[id^="screen-"]'),te=!1,B="";se.forEach(me=>{let Lt=me.closest(".cw-input-group"),Dt=Lt?Lt.querySelector(".cw-input-label"):null,Ao=Dt?Dt.textContent:"Evid\xEAncia",Ft=me.value.trim(),wo=Ft?` ${Ft}`:"";B+=`<li>${Ao} -${wo}</li>`,te=!0}),te&&(le+=`<b>${N}</b>`,le+=`<ul ${$}>${B}</ul>`)}})}if(T.includes("{TAGS_IMPLEMENTED}")?T=T.replace(/{TAGS_IMPLEMENTED}/g,ae.join(", ")||"N/A"):ae.length>0&&(T+=`<br><b>Tags:</b> ${ae.join(", ")}<br>`),T.includes("{SCREENSHOTS_LIST}")?T=T.replace(/{SCREENSHOTS_LIST}/g,le?`${le}`:"N/A"):le!==""&&(T+=`<br>${le}`),o==="pt"&&n){let K=ve.checked?V("sim"):V("nao");T=T.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${V("consentiu_gravacao")}</b> ${K}<br><br>`),T=T.replace(/{CASO_PORTUGAL}/g,`<br><b>${V("caso_portugal")}</b> ${V("sim")}<br>`)}else o==="pt"&&!n?(T=T.replace(/{CASO_PORTUGAL}/g,`<br><b>${V("caso_portugal")}</b> ${V("nao")}<br>`),T=T.replace(/{CONSENTIU_GRAVACAO}/g,"")):(T=T.replace(/{CASO_PORTUGAL}/g,""),T=T.replace(/{CONSENTIU_GRAVACAO}/g,""));return _e.querySelectorAll("input, textarea").forEach(K=>{let F=K.id.replace("field-",""),N=new RegExp(`{${F}}`,"g"),Y=K.value;if(F==="REASON_COMMENTS"&&(C.startsWith("NI_")||C.startsWith("IN_"))){let B=Ae.querySelector('input[type="radio"]:checked');B&&Se[B.id]&&(Y=Se[B.id]["field-REASON_COMMENTS"])}if(ot.includes(F)&&Y.trim()!==""){let B=Y.split(`
`).map(me=>me.trim()).filter(me=>me!==""&&me!=="\u2022").map(me=>me.startsWith("\u2022 ")?me.substring(2):me).map(me=>`<li>${me}</li>`).join("");Y=B?`<ul ${$}>${B}</ul>`:""}else Et.includes(F)?Y=Y.split(`
`).filter(B=>B.trim()!=="").map(B=>`<p style="margin: 0 0 8px 0;">${B}</p>`).join(""):K.tagName==="TEXTAREA"&&(Y=Y.replace(/\n/g,"<br>"));let se=Y.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(se===""||se==="\u2022"||se.toLowerCase()==="n/a"){let B=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${F}\\}(?:<br>\\s*)?`,"gi");B.test(T)?T=T.replace(B,""):T=T.replace(N,"")}else T=T.replace(N,Y.replace(/\$/g,"$$$$"))}),T=T.replace(/{([A-Z0-9_]+)}/g,""),T=T.replace(/(<br>){3,}/g,"<br><br>"),typeof i<"u"&&i.getOutput&&(T+=i.getOutput()),T}Ke.onclick=()=>{let C=Mt();C?(It(C),oe(V("copiado_sucesso"))):oe(V("selecione_substatus"),{error:!0})},Qe.onclick=async()=>{let C=w.value,D=Mt();if(!D){oe(V("selecione_substatus"),{error:!0});return}It(D),xt();let T=ct(),$=await po();if($)try{if($.focus(),$.innerHTML.trim()==="<p><br></p>"||$.innerHTML.trim()==="<br>"||$.innerText.trim()===""){let ce=document.createRange();ce.selectNodeContents($);let Q=window.getSelection();Q.removeAllRanges(),Q.addRange(ce),document.execCommand("delete",!1,null)}else if(!$.innerHTML.endsWith("<br><br>")){let ce=document.createRange();ce.selectNodeContents($),ce.collapse(!1);let Q=window.getSelection();Q.removeAllRanges(),Q.addRange(ce),document.execCommand("insertHTML",!1,"<br><br>")}document.execCommand("insertHTML",!1,D),co($),setTimeout(()=>{oe(V("inserido_copiado"))},600);let le=typeof ze<"u"&&ze?ze.checked:!0;if(C&&Pe[C]&&le){let ce=Pe[C];await lt(ce),await new Promise(Q=>setTimeout(Q,500))}T(),ht(1.5),A.value="",w.innerHTML=`<option value="">${V("select_substatus")}</option>`,w.disabled=!0}catch(ae){console.error(ae),oe("Erro ao inserir.",{error:!0}),T()}};function ht(C=1.5){C<=1.5&&(Le.style.display="none",Ae.innerHTML=""),C<=2&&(l.reset(),ue.style.display="none"),C<=3&&(xe.style.display="none",_e.innerHTML="",i.reset(),We.style.display="none",Fe.style.display="none")}function xt(){if(r=!r,r){let C=m.querySelector(".cw-expand-btn");C&&typeof C.resetState=="function"&&C.resetState()}Te(r,m,"cw-btn-notes")}return mt("bau"),gt("pt"),xt}var $e={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function bo(){let e="v4.2.0 CR-Hybrid",t="CANNED_RESPONSES",o=Object.keys($e)[0],n="",r="list",a=!1,i={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:"#FAFAFA"},l={display:"flex",width:"200%",height:"100%",transition:"transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",transform:"translateX(0)",willChange:"transform"},m={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},u={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:"1px solid transparent",background:"#F0F2F5",fontSize:"14px",color:"#202124",boxSizing:"border-box",outline:"none",transition:"all 0.2s ease",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center"},f={display:"flex",gap:"8px",padding:"8px 16px 12px 16px",overflowX:"auto",scrollbarWidth:"none",borderBottom:"1px solid #f1f3f4"},p={padding:"6px 14px",borderRadius:"20px",border:"1px solid #dadce0",background:"#fff",color:"#5f6368",fontSize:"12px",fontWeight:"500",cursor:"pointer",transition:"all 0.2s ease",flexShrink:"0"},b={background:"#E8F0FE",color:"#1967D2",borderColor:"#E8F0FE",fontWeight:"600"},q={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",marginBottom:"8px",borderRadius:"12px",background:"#fff",border:"1px solid #dadce0",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",position:"relative",overflow:"hidden",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},v=document.createElement("div");v.id="quick-email-popup",v.classList.add("cw-module-window"),Object.assign(v.style,we,{right:"100px",width:"480px",height:"600px",transition:"width 0.3s ease, height 0.3s ease"});let S={popup:v,googleLine:null,focusElement:null};function h(){a=!a,Te(a,v,"cw-btn-email"),a||setTimeout(()=>k(),300)}let E=Ee(v,"Assistente de Resposta",e,"Templates de Email e CRs R\xE1pidas",S,()=>h()),I=document.createElement("div");Object.assign(I.style,i);let R=document.createElement("div");Object.assign(R.style,l);let j=document.createElement("div");Object.assign(j.style,m);let x=document.createElement("div");Object.assign(x.style,{padding:"20px 0 0 0",flexShrink:"0",background:"#fff",zIndex:"10",display:"flex",flexDirection:"column",gap:"10px"});let g=document.createElement("div");g.style.padding="0 20px";let s=document.createElement("input");s.placeholder="Buscar Email ou CR...",Object.assign(s.style,u),s.onfocus=()=>{s.style.background="#fff",s.style.border="1px solid #1a73e8",s.style.boxShadow="0 0 0 4px rgba(26, 115, 232, 0.1)"},s.onblur=()=>{s.style.background="#F0F2F5",s.style.border="1px solid transparent",s.style.boxShadow="none"},S.focusElement=s;let c=document.createElement("div");Object.assign(c.style,f);let A=document.createElement("div");Object.assign(A.style,{padding:"16px 20px",overflowY:"auto",flexGrow:"1"}),g.appendChild(s),x.appendChild(g),x.appendChild(c),j.appendChild(x),j.appendChild(A);let d=document.createElement("div");Object.assign(d.style,m);let y=document.createElement("div");Object.assign(y.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),d.appendChild(y),R.appendChild(j),R.appendChild(d),I.appendChild(R),v.appendChild(E),v.appendChild(I),document.body.appendChild(v);async function O(M,P){try{a&&h();let X=ct();await new Promise(H=>setTimeout(H,800)),P==="email"?await Jt(M):P==="cr"&&await lt(M),X()}catch(X){console.error("\u274C Erro na execu\xE7\xE3o:",X);let H=document.querySelector(".cw-focus-backdrop");H&&H.classList.remove("active")}}function w(M){r="detail",R.style.transform="translateX(-50%)";let P='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',X='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';y.innerHTML=`
            <div style="position:sticky; top:0; background:rgba(255,255,255,0.95); backdrop-filter:blur(10px); border-bottom:1px solid #f1f3f4; padding:12px 20px; z-index:10; display:flex; align-items:center; gap:8px;">
                <button id="csa-back-btn" style="background:none; border:none; cursor:pointer; display:flex; color:#5f6368; padding:4px; margin-left:-8px; border-radius:50%;">${P}</button>
                <div style="font-weight:600; color:#202124; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${M.name}</div>
            </div>
            <div style="padding:20px;">
                <div style="font-size:11px; font-weight:700; color:#1a73e8; text-transform:uppercase; margin-bottom:6px;">Assunto</div>
                <div style="font-size:13px; color:#202124; padding:12px; background:#F8F9FA; border-radius:8px; border:1px solid #eee; margin-bottom:20px;">${M.subject}</div>
                <div style="font-size:11px; font-weight:700; color:#1a73e8; text-transform:uppercase; margin-bottom:6px;">Mensagem</div>
                <div style="font-size:13px; color:#3c4043; line-height:1.5;">${M.body.replace(/\n/g,"<br>")}</div>
            </div>
            <div style="position:sticky; bottom:0; padding:20px; background:linear-gradient(to top, #fff 80%, transparent);">
                <button id="csa-insert-btn" style="width:100%; padding:12px; background:#1a73e8; color:fff; border:none; border-radius:8px; font-weight:600; cursor:pointer; display:flex; justify-content:center; align-items:center; gap:8px; color:white;">
                    ${X} Inserir Template
                </button>
            </div>
        `,y.querySelector("#csa-back-btn").onclick=k;let H=y.querySelector("#csa-insert-btn");H.onclick=()=>{H.style.transform="scale(0.96)",O(M,"email"),setTimeout(()=>{H.style.transform="scale(1)",k()},300)}}function k(){r="list",R.style.transform="translateX(0)"}function ne(M,P,X=null){let H=document.createElement("button");return H.innerHTML=X?`<span style="margin-right:4px">${X}</span>${M}`:M,Object.assign(H.style,p),o===P&&n===""&&Object.assign(H.style,b),H.onclick=()=>{o=P,n="",s.value="",z(),L()},H}function z(){c.innerHTML="",c.appendChild(ne("Smart CRs",t,"\u26A1")),Object.keys($e).forEach(M=>{c.appendChild(ne($e[M].title,M))})}function L(){A.innerHTML="";let M=[];if(n.trim()!==""){let W=n.toLowerCase();Object.values($e).forEach(_=>{_.emails.forEach(J=>{(J.name.toLowerCase().includes(W)||J.subject.toLowerCase().includes(W))&&M.push({type:"email",data:J})})}),Object.entries(Pe).forEach(([_,J])=>{if(!J)return;(_.replace(/_/g," ").toLowerCase().includes(W)||J.toLowerCase().includes(W))&&M.push({type:"cr",key:_,code:J})})}else o===t?Object.entries(Pe).forEach(([W,_])=>{_&&M.push({type:"cr",key:W,code:_})}):$e[o]&&$e[o].emails.forEach(W=>{M.push({type:"email",data:W})});if(M.length===0){A.innerHTML='<div style="text-align:center; padding:60px 20px; color:#9aa0a6;"><div style="font-size:24px;">\u{1F50D}</div><div style="font-size:14px; margin-top:8px;">Nada encontrado.</div></div>';return}let X='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',H='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbc04" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',he='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dadce0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';M.forEach(W=>{let _=document.createElement("div");if(Object.assign(_.style,q),W.type==="email"){let J=W.data,re=J.subject.length>40?J.subject.substring(0,40)+"...":J.subject;_.innerHTML=`
                    <div style="width:36px; height:36px; border-radius:8px; background:#E8F0FE; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:12px;">${X}</div>
                    <div style="flex-grow:1; min-width:0;">
                        <div style="font-size:14px; font-weight:600; color:#202124; margin-bottom:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${J.name}</div>
                        <div style="font-size:12px; color:#5f6368; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${re}</div>
                    </div>
                    <div style="margin-left:8px;">${he}</div>
                `,_.onclick=()=>w(J)}else{let J=W.key.replace(/_/g," ").replace("AS ","AS - ").replace("NI ","NI - ");_.innerHTML=`
                    <div style="width:36px; height:36px; border-radius:8px; background:#FEF7E0; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:12px;">${H}</div>
                    <div style="flex-grow:1; min-width:0;">
                        <div style="font-size:13px; font-weight:600; color:#202124; margin-bottom:2px;">${J}</div>
                        <div style="font-size:11px; color:#ea8600; font-family:monospace;">${W.code}</div>
                    </div>
                    <div style="font-size:10px; font-weight:700; color:#dadce0; text-transform:uppercase;">APLICAR</div>
                `,_.onclick=()=>{_.style.background="#fff8e1",setTimeout(()=>_.style.background="#fff",200),O(W.code,"cr")}}_.onmouseenter=()=>{_.style.borderColor=W.type==="cr"?"#fbbc04":"#1a73e8",_.style.transform="translateY(-1px)",_.style.boxShadow="0 4px 8px rgba(0,0,0,0.05)"},_.onmouseleave=()=>{_.style.borderColor="#dadce0",_.style.transform="translateY(0)",_.style.boxShadow="0 1px 2px rgba(0,0,0,0.02)"},A.appendChild(_)})}return s.addEventListener("input",M=>{n=M.target.value,n!==""?Array.from(c.children).forEach(P=>Object.assign(P.style,p)):z(),L()}),z(),L(),h}var fo={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function ho(){let e="v2.1 (Apple Motion)",t={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#f8f9fa",scrollBehavior:"smooth"},card:{background:"#ffffff",border:"1px solid #dadce0",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"13px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"10px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.15s ease, opacity 0.3s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.5",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"20px",height:"20px",borderRadius:"6px",border:"2px solid #dadce0",marginRight:"14px",marginTop:"1px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #eee",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"}},o={},n="PT",r="BAU",a=!1,i=document.createElement("div");i.id="call-script-popup",i.classList.add("cw-module-window"),Object.assign(i.style,we,{right:"auto",left:"50%",width:"400px",height:"650px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let l={popup:i,googleLine:null};function m(){a=!a,Te(a,i,"cw-btn-script")}let u=Ee(i,"Call Script",e,"Guia interativo para condu\xE7\xE3o de chamadas.",l,()=>{m()});i.appendChild(u);let f=document.createElement("div");Object.assign(f.style,t.progressBarContainer);let p=document.createElement("div");Object.assign(p.style,t.progressBarFill),f.appendChild(p),i.appendChild(f);let b=document.createElement("div");b.id="csa-content",Object.assign(b.style,t.contentArea),i.appendChild(b);let q=document.createElement("div");Object.assign(q.style,t.footer);let v=document.createElement("span");v.textContent="by lucaste@",Object.assign(v.style,{fontSize:"10px",color:"#bdc1c6"});let S=document.createElement("button");S.innerHTML=`
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
    Resetar Script
  `,Object.assign(S.style,t.resetBtn),S.onmouseenter=()=>S.style.background="#fce8e6",S.onmouseleave=()=>S.style.background="transparent",S.onclick=()=>{S.style.transform="scale(0.9)",setTimeout(()=>S.style.transform="scale(1)",150);for(let O in o)delete o[O];c()},q.appendChild(v),q.appendChild(S),i.appendChild(q);let h=document.createElement("div");Object.assign(h.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let E=document.createElement("div");Object.assign(E.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let I=document.createElement("div");I.textContent="BAU";let R=document.createElement("div");R.textContent="LT",Object.assign(I.style,be),Object.assign(R.style,be),E.appendChild(I),E.appendChild(R);let j=document.createElement("select");Object.assign(j.style,Ut,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),j.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',j.value=n,h.appendChild(E),h.appendChild(j),b.appendChild(h);let x=document.createElement("div");x.id="csa-checklist-area",b.appendChild(x);let g=document.createElement("div");Object.assign(g.style,Ye),g.className="no-drag",g.title="Redimensionar",i.appendChild(g),Xe(i,g),document.body.appendChild(i);function s(O){return O}function c(){x.innerHTML="";let O=`${n} ${r}`,w=fo[O];if(!w){x.innerHTML=`<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <div style="font-size: 24px;">\u2615</div>
        <div>Script n\xE3o configurado.</div>
      </div>`,p.style.width="0%";return}let k=w.color||"#1a73e8",ne=0,z=0;["inicio","fim"].forEach(L=>{w[L]&&(ne+=w[L].length)}),["inicio","fim"].forEach((L,M)=>{let P=w[L];if(!P||P.length===0)return;let X=document.createElement("div");Object.assign(X.style,t.card);let H=document.createElement("div");Object.assign(H.style,t.cardTitle);let he=L==="inicio"?"Abertura":"Fechamento";n.includes("ES")&&(he=L==="inicio"?"Apertura":"Cierre"),n.includes("EN")&&(he=L==="inicio"?"Opening":"Closing"),H.textContent=he;let W=document.createElement("span");W.style.fontSize="11px",W.style.opacity="0.7",W.style.fontWeight="500",W.style.background="#f1f3f4",W.style.padding="2px 8px",W.style.borderRadius="10px",H.appendChild(W),X.appendChild(H);let _=0;P.forEach((J,re)=>{let ge=`${O}-${L}-${re}`,ve=!!o[ge];ve&&(z++,_++);let ie=document.createElement("div");Object.assign(ie.style,t.itemRow);let ee=document.createElement("div");Object.assign(ee.style,t.checkbox);let Oe=document.createElement("span");Oe.innerHTML=J,Oe.style.flex="1",ve?(Object.assign(ie.style,t.itemCompleted),ee.style.background=k,ee.style.borderColor=k,ee.style.transform="scale(1)",ee.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ie.style.textDecoration="none",ie.style.opacity="1",ee.style.background="transparent",ee.style.borderColor="#dadce0",ee.style.transform="scale(1)",ee.innerHTML=""),ie.onclick=()=>{let Me=!o[ge];o[ge]=Me,Z.playClick(),Me?(ee.style.transform="scale(1.2)",setTimeout(()=>ee.style.transform="scale(1)",150),Object.assign(ie.style,t.itemCompleted),ee.style.background=k,ee.style.borderColor=k,ee.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ie.style.textDecoration="none",ie.style.opacity="1",ee.style.background="transparent",ee.style.borderColor="#dadce0",ee.innerHTML=""),A(O,w)},ie.onmouseenter=()=>{o[ge]||(ie.style.background="#f1f3f4",ee.style.borderColor=k)},ie.onmouseleave=()=>{o[ge]||(ie.style.background="transparent",ee.style.borderColor="#dadce0")},ie.appendChild(ee),ie.appendChild(Oe),X.appendChild(ie)}),_===P.length&&P.length>0&&(W.style.color="#1e8e3e",W.style.background="#e6f4ea",X.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),W.textContent=`${_}/${P.length}`,x.appendChild(X)}),d(ne,z)}function A(O,w){let k=0,ne=0;["inicio","fim"].forEach(z=>{let L=w[z]||[];k+=L.length;let M=0;L.forEach((P,X)=>{o[`${O}-${z}-${X}`]&&(ne++,M++)})}),d(k,ne),setTimeout(()=>c(),200)}function d(O,w){let k=O===0?0:w/O*100;p.style.width=`${k}%`,k===100?p.style.background="#34A853":p.style.background="linear-gradient(90deg, #4285F4, #34A853)"}function y(O){r=O;let w=Je();Object.assign(I.style,be),Object.assign(R.style,be),Object.assign(O==="BAU"?I.style:R.style,w),c()}return I.onclick=()=>y("BAU"),R.onclick=()=>y("LT"),j.addEventListener("change",O=>{n=O.target.value,c()}),y(r),m}var pt={lm:{label:"LM Forms",links:[{name:"Relat\xF3rio de Ocorr\xEAncias",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas operacionais | Aviso de pausas"},{name:"Chamadas Excedidas (>50min)",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro de chamadas longas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema/ferramenta"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"Enviar casos para BAU/Solicitar Descarte/Abrir Monitoria para AMs"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo dos Anunciantes"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos complicados de atender"}]},suporte:{label:"Central de Ajuda",links:[{name:"Suporte Google Ads",url:"https://support.google.com/google-ads/",desc:"Oficial"},{name:"Suporte GA4",url:"https://support.google.com/analytics/",desc:"Oficial"},{name:"Suporte Merchant Center",url:"https://support.google.com/merchants/gethelp",desc:"Oficial"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. oficial sobre CSP"},{name:"Doc. Enhanced Conversion",url:"https://support.google.com/google-ads/answer/9888656?hl=en",desc:"Como funcionam as convers\xF5es otimizadas?"},{name:"Doc. CoMo",url:"https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=pt-br",desc:"Doc. oficial sobre Consent Mode"},{name:"Cursos SkillShop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos sobre as ferramentas do Google."}]},outros:{label:"Diversos",links:[{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form para solicitar grava\xE7\xE3o da chamada."}]}};function xo(){let e="v2.4.5",t="lm",o="",n={width:"100%",padding:"10px 12px 10px 36px",borderRadius:"8px",border:"1px solid #dadce0",background:"#f8f9fa",fontSize:"14px",boxSizing:"border-box",outline:"none",color:"#3c4043",transition:"background 0.2s, border-color 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"10px center"},r={display:"flex",flexWrap:"wrap",gap:"8px",paddingBottom:"8px"},a={padding:"6px 16px",borderRadius:"16px",border:"1px solid #dadce0",background:"transparent",color:"#5f6368",fontSize:"13px",fontWeight:"500",cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s ease",marginBottom:"4px"},i={background:"#e8f0fe",color:"#1967d2",borderColor:"#e8f0fe",fontWeight:"600"},l={display:"flex",alignItems:"center",padding:"10px 14px",borderRadius:"12px",cursor:"pointer",border:"1px solid transparent",marginBottom:"6px",background:"#ffffff",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), background 0.2s",boxShadow:"0 1px 2px rgba(0,0,0,0.02)",opacity:"0",transform:"translateY(10px)"},m={width:"36px",height:"36px",borderRadius:"10px",background:"#f1f3f4",color:"#5f6368",display:"flex",alignItems:"center",justifyContent:"center",marginRight:"14px",fontSize:"18px",flexShrink:"0"},u=document.createElement("div");u.id="feedback-popup",u.classList.add("cw-module-window"),Object.assign(u.style,we,{right:"100px",width:"500px"});let f={lm:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>',outros:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c-1.49 0-2.61 1.12-2.61 2.5s1.12 2.5 2.61 2.5H2v4c0 1.1.9 2 2 2h4v1.5c0 1.49 1.12 2.61 2.5 2.61s2.5-1.12 2.5-2.61V19h4c1.1 0 2-.9 2-2v-4h1.5c1.49 0 2.61-1.12 2.61-2.5S21.99 11 20.5 11z"/></svg>'},p={popup:u,googleLine:null,focusElement:null},b=!1,q=Ee(u,"Links \xDAteis",e,"Acesso r\xE1pido a formul\xE1rios internos (Ocorr\xEAncias, Bugs) e documenta\xE7\xF5es oficiais de suporte.",p,()=>x());u.appendChild(q);let v=document.createElement("div");Object.assign(v.style,{padding:"16px",display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid #f1f3f4",flexShrink:"0",backgroundColor:"#fff"});let S=document.createElement("input");S.type="text",S.placeholder="Buscar link, form ou ajuda...",Object.assign(S.style,n),p.focusElement=S,S.onfocus=()=>{S.style.borderColor="#1a73e8",S.style.backgroundColor="#fff"},S.onblur=()=>{S.style.borderColor="#dadce0",S.style.backgroundColor="#f8f9fa"};let h=document.createElement("div");Object.assign(h.style,r),v.appendChild(S),v.appendChild(h),u.appendChild(v);let E=document.createElement("div");Object.assign(E.style,{padding:"0 8px 8px 8px",overflowY:"auto",flexGrow:"1"}),u.appendChild(E);let I=document.createElement("div");Object.assign(I.style,{padding:"8px 16px",borderTop:"1px solid #eee",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"10px",color:"#9aa0a6"}),I.innerHTML="<span>by lucaste@</span>",u.appendChild(I),document.body.appendChild(u);function R(){h.innerHTML="",Object.keys(pt).forEach(g=>{let s=pt[g],c=document.createElement("button"),A=f[g]||"";c.innerHTML=`
        <span style="display:inline-flex; align-items:center; margin-right:6px; vertical-align:middle;">
            ${A}
        </span> 
        ${s.label}
      `,Object.assign(c.style,a),c.style.display="inline-flex",c.style.alignItems="center",t===g&&o===""&&Object.assign(c.style,i),c.onmousedown=()=>c.style.transform="scale(0.95)",c.onmouseup=()=>c.style.transform="scale(1)",c.onmouseleave=()=>c.style.transform="scale(1)",c.onclick=()=>{t=g,o="",S.value="",R(),j()},h.appendChild(c)})}function j(){E.innerHTML="";let g=[],s=o.trim()!=="";if(s?Object.entries(pt).forEach(([c,A])=>{let d=A.links.filter(y=>y.name.toLowerCase().includes(o.toLowerCase())||y.desc.toLowerCase().includes(o.toLowerCase()));d.forEach(y=>{y._catIcon=f[c],y._categoryName=A.label}),g=[...g,...d]}):(g=pt[t].links,g.forEach(c=>c._catIcon=f[t])),g.length===0){E.innerHTML=`
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px; opacity:0.6;">
            <div style="font-size:32px; margin-bottom:10px;">\u{1F50D}</div>
            <div style="font-size:13px; color:#5f6368;">Nenhum link encontrado.</div>
        </div>`;return}g.forEach((c,A)=>{let d=document.createElement("div");Object.assign(d.style,l);let y=document.createElement("div");Object.assign(y.style,m),y.innerHTML=c._catIcon||'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',y.style.display="flex",y.style.alignItems="center",y.style.justifyContent="center",y.style.color="#5f6368",d.appendChild(y);let O=document.createElement("div");O.style.flexGrow="1";let w=P=>{if(!s)return P;let X=new RegExp(`(${o})`,"gi");return P.replace(X,'<span style="color:#1a73e8; font-weight:700;">$1</span>')},k=`<div style="font-size:14px; font-weight:500; color:#202124;">${w(c.name)}</div>`,ne=`<div style="font-size:11px; color:#5f6368; margin-top:2px;">${w(c.desc)}</div>`;O.innerHTML=k+ne,d.appendChild(O);let z=document.createElement("div");z.style.display="flex",z.style.gap="4px",z.style.opacity="0",z.style.transition="opacity 0.2s";let L=document.createElement("div");L.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',Object.assign(L.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#5f6368",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"}),L.onclick=P=>{Z.playClick(),P.stopPropagation(),navigator.clipboard.writeText(c.url),L.style.transform="scale(1.2)",L.style.color="#1e8e3e",L.style.backgroundColor="#e6f4ea",setTimeout(()=>{L.style.transform="scale(1)",L.style.color="#5f6368",L.style.backgroundColor="transparent"},800)},L.onmouseenter=()=>L.style.backgroundColor="#f1f3f4",L.onmouseleave=()=>L.style.backgroundColor="transparent",z.appendChild(L);let M=document.createElement("div");M.innerHTML="\u2197",Object.assign(M.style,{width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",color:"#dadce0",fontSize:"16px"}),z.appendChild(M),d.appendChild(z),d.onclick=()=>window.open(c.url,"_blank"),d.onmouseenter=()=>{d.style.backgroundColor="#f8f9fa",d.style.transform="scale(1.01)",z.style.opacity="1",M.style.color="#1a73e8"},d.onmouseleave=()=>{d.style.backgroundColor="#ffffff",d.style.transform="scale(1)",z.style.opacity="0",M.style.color="#dadce0"},E.appendChild(d),requestAnimationFrame(()=>{d.style.transition="opacity 0.3s ease, transform 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.2)",setTimeout(()=>{d.style.opacity="1",d.style.transform="translateY(0)"},A*40)})})}S.addEventListener("input",g=>{o=g.target.value,o!==""?Array.from(h.children).forEach(s=>{s.style.backgroundColor="transparent",s.style.color="#5f6368",s.style.borderColor="#dadce0"}):R(),j()});function x(){b=!b,Te(b,u,"cw-btn-links")}return R(),j(),x}var Ue=[];function _t(e){Ue=e}function yo(){let e="v2.5 (Emoji Fix)",t=!1,o=null,n=60*1e3;function r(s){if(!s)return"";try{let c=new Date(s);return isNaN(c.getTime())?String(s):c.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(s)}}let a={critical:{bg:"#FEF2F2",border:"#FECACA",text:"#991B1B",icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>'},info:{bg:"#EFF6FF",border:"#BFDBFE",text:"#1E40AF",icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{bg:"#F0FDF4",border:"#BBF7D0",text:"#166534",icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}},i={feedContainer:{padding:"24px",overflowY:"auto",flexGrow:"1",background:"#FAFAFA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.06)",boxShadow:"0 4px 12px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.02)",overflow:"hidden",transition:"all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.04)",boxShadow:"none",opacity:"0.8",filter:"grayscale(0.3)",marginBottom:"16px",flexShrink:"0"},cardHeader:{padding:"12px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(0,0,0,0.04)",fontSize:"12px",fontWeight:"600",letterSpacing:"0.5px",textTransform:"uppercase"},msgTitle:{padding:"20px 20px 8px 20px",fontSize:"16px",fontWeight:"700",color:"#202124",letterSpacing:"-0.01em",lineHeight:"1.4"},metaContainer:{padding:"0 20px 12px 20px",display:"flex",alignItems:"center",gap:"8px",fontSize:"12px",color:"#5f6368"},cardBody:{padding:"0 20px 24px 20px",fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",fontFamily:"'Google Sans', Roboto, sans-serif",wordBreak:"break-word",overflowWrap:"break-word"},emojiImg:"height: 20px; vertical-align: text-bottom; margin: 0 2px;",dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},markAllBtn:{fontSize:"12px",color:"#1a73e8",cursor:"pointer",fontWeight:"600",background:"transparent",border:"none",padding:"8px",transition:"opacity 0.2s"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 0",color:"#bdc1c6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"10px 0 20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"10px",borderRadius:"8px",transition:"background 0.2s"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",paddingTop:"10px",borderTop:"1px dashed rgba(0,0,0,0.1)"}},l="cw-scrollbar-style";if(!document.getElementById(l)){let s=document.createElement("style");s.id=l,s.innerHTML=".cw-nice-scroll::-webkit-scrollbar { width: 5px; } .cw-nice-scroll::-webkit-scrollbar-track { background: transparent; } .cw-nice-scroll::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 10px; }",document.head.appendChild(s)}function m(s){if(!s||typeof s!="string")return"";let c=s,A=/(https?:\/\/[^\s]+)|(www\.[^\s]+)/g;return c=c.replace(A,d=>{let y=d;return y.startsWith("http")||(y="http://"+y),`<a href="${y}" target="_blank" style="color:#1967d2; text-decoration:underline;">${d}</a>`}),c=c.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),c=c.replace(/_(.*?)_/g,"<i>$1</i>"),c=c.replace(/\n/g,"<br>"),c=Yt(c),c=c.replace(/@todos|@all/gi,'<span style="background:#e8f0fe; color:#1967d2; padding:1px 5px; border-radius:4px; font-weight:600; font-size:12px;">@todos</span>'),c}let u=document.createElement("div");u.id="broadcast-popup",u.classList.add("cw-module-window"),Object.assign(u.style,we,{right:"auto",left:"50%",width:"450px",height:"650px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let f={popup:u,googleLine:null};function p(){if(t=!t,Te(t,u,"cw-btn-broadcast"),t){let s=document.getElementById("cw-btn-broadcast");s&&s.classList.remove("has-new"),S()}}let b=Ee(u,"Operations Feed",e,"Atualiza\xE7\xF5es oficiais da opera\xE7\xE3o.",f,()=>p()),q=b.querySelector(".cw-header-actions")||b.lastElementChild;if(q){let s=document.createElement("button");s.textContent="Limpar tudo",Object.assign(s.style,i.markAllBtn),s.onclick=c=>{c.stopPropagation(),Z.playSuccess();let A=Ue.map(d=>d.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(A)),I(),h()},q.insertBefore(s,q.firstChild)}u.appendChild(b);let v=document.createElement("div");v.className="cw-nice-scroll",Object.assign(v.style,i.feedContainer),u.appendChild(v);async function S(){let s=document.getElementById("cw-update-status");t&&(s||(s=document.createElement("div"),s.id="cw-update-status",s.style.cssText="padding: 6px; text-align: center; font-size: 11px; color: #5f6368; background: #f8f9fa; border-bottom: 1px solid #e0e0e0;",v.parentNode.insertBefore(s,v)),s.innerHTML="\u23F3 Verificando atualiza\xE7\xF5es...",s.style.display="block");let c=Ue.map(d=>d.id),A=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");try{let d=await He.fetchData();d&&d.broadcast&&(t&&s&&(d.broadcast.some(O=>!c.includes(O.id))?(s.innerHTML="\u2705 Novos avisos sincronizados!",s.style.backgroundColor="#e6f4ea",s.style.color="#137333"):s.innerHTML="\u{1F539} Tudo atualizado.",setTimeout(()=>{s&&(s.style.display="none")},1500)),c.length>0&&d.broadcast.filter(w=>!c.includes(w.id)).filter(w=>!A.includes(w.id)).length>0&&(console.log("\u{1F514} Novo aviso detectado! Tocando som."),Z.playNotification()),_t(d.broadcast),h(),t&&I())}catch(d){console.error("Erro no update:",d),t&&s&&(s.innerHTML="\u26A0\uFE0F Falha na conex\xE3o.",s.style.backgroundColor="#fce8e6")}}function h(){let s=document.getElementById("cw-btn-broadcast");if(!s)return;let c=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(Ue.some(d=>!c.includes(d.id))){if(s.classList.add("has-new"),!s.querySelector(".cw-badge")){let d=document.createElement("div");d.className="cw-badge",Object.assign(d.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),s.appendChild(d)}}else{s.classList.remove("has-new");let d=s.querySelector(".cw-badge");d&&d.remove()}}let E=He.getCachedBroadcasts();E.length>0&&(_t(E),I()),S(),o||(o=setInterval(S,n));function I(){v.innerHTML="";let s=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),c=[...Ue].sort((y,O)=>{let w=s.includes(y.id),k=s.includes(O.id);return w===k?0:w?1:-1});if(c.every(y=>s.includes(y.id))){let y=document.createElement("div");Object.assign(y.style,i.emptyState),y.innerHTML=`
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#dadce0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Voc\xEA est\xE1 em dia!</div>
            <div style="font-size:12px;">Nenhum aviso pendente.</div>
           `,v.appendChild(y)}let A=c.filter(y=>!s.includes(y.id)),d=c.filter(y=>s.includes(y.id));if(A.forEach(y=>v.appendChild(R(y,!1))),d.length>0){let y=document.createElement("div");Object.assign(y.style,i.historyDivider),y.innerHTML=`<span>Visualizar ${d.length} avisos anteriores</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 0.3s"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let O=document.createElement("div");Object.assign(O.style,i.historyContainer),d.forEach(k=>O.appendChild(R(k,!0)));let w=!1;y.onclick=()=>{Z.playClick(),w=!w,O.style.display=w?"flex":"none",y.querySelector("svg").style.transform=w?"rotate(180deg)":"rotate(0deg)",y.querySelector("span").textContent=w?"Ocultar hist\xF3rico":`Visualizar ${d.length} avisos anteriores`},v.appendChild(y),v.appendChild(O)}}function R(s,c){let A=document.createElement("div");Object.assign(A.style,c?i.cardHistory:i.card);let d=a[s.type]||a.info,y=document.createElement("div");Object.assign(y.style,i.cardHeader,{background:d.bg,color:d.text,borderBottom:`1px solid ${d.border}`});let O=document.createElement("div");if(Object.assign(O.style,{display:"flex",alignItems:"center",gap:"6px"}),O.innerHTML=`${d.icon} <span>${s.type.toUpperCase()}</span>`,y.appendChild(O),c){let k=document.createElement("span");k.textContent=r(s.date),k.style.opacity="0.7",y.appendChild(k)}else{let k=document.createElement("button");k.title="Marcar como lido",Object.assign(k.style,i.dismissBtn),k.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',k.onmouseenter=()=>{k.style.color="#1e8e3e",k.style.background="#e6f4ea",k.style.borderColor="#1e8e3e"},k.onmouseleave=()=>{k.style.color="#5f6368",k.style.background="#fff",k.style.borderColor="rgba(0,0,0,0.1)"},k.onclick=ne=>{ne.stopPropagation(),Z.playClick(),A.style.transform="translateX(20px)",A.style.opacity="0",setTimeout(()=>{let z=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");z.push(s.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(z)),I(),h()},250)},y.appendChild(k)}if(A.appendChild(y),s.title){let k=document.createElement("div");Object.assign(k.style,i.msgTitle),k.textContent=s.title,A.appendChild(k)}if(!c){let k=document.createElement("div");Object.assign(k.style,i.metaContainer),k.innerHTML=`<span style="font-weight:600">${s.author}</span> \u2022 <span>${r(s.date)}</span>`,A.appendChild(k)}let w=document.createElement("div");return Object.assign(w.style,i.cardBody),w.innerHTML=m(s.text),A.appendChild(w),A}I();let j=document.createElement("div");Object.assign(j.style,Ye),j.className="no-drag",u.appendChild(j),Xe(u,j),document.body.appendChild(u);let x=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),g=Ue.some(s=>!x.includes(s.id));return{toggle:p,hasUnread:g}}function Mo(){if(window.techSolInitialized){Ct();return}window.techSolInitialized=!0,console.log("\u{1F680} TechSol Suite Initializing...");try{Vt();try{Z.initGlobalListeners(),Z.playStartup()}catch(a){console.warn("\xC1udio n\xE3o p\xF4de ser iniciado automaticamente:",a)}He.fetchTips(),Ct();let e=go(),t=bo(),o=ho(),n=xo(),r=yo();io({toggleNotes:e,toggleEmail:t,toggleScript:o,toggleLinks:n,broadcastControl:r})}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),oe("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}Mo();})();
