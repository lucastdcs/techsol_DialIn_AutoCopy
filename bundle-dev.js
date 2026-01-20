(()=>{var gt="",bt="",Xt=e=>new Promise(t=>setTimeout(t,e));async function Kt(){if(gt&&bt)return gt;try{let e=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!e)return"Agente";e.click(),await Xt(150);let t="Consultor",o=document.querySelector("profile-details .name");if(o)t=o.textContent.trim().split(" ")[0],t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();else{let s=document.querySelector("profile-details img");if(s&&s.src.includes("/photos/")){let i=s.src.match(/\/photos\/([^\?]+)/)[1];t=i.charAt(0).toUpperCase()+i.slice(1)}}let n=document.querySelector("profile-details .email");return n&&(bt=n.textContent.trim(),console.log("TechSol: Identidade confirmada ->",bt)),e.click(),document.body.click(),gt=t,t}catch(e){return console.warn("Sherlock falhou:",e),"Consultor"}}function _t(){return gt||"Consultor"}function Qt(){return bt||null}function Zt(e){let t=new Date,o=t.getHours(),n=t.getDay(),s="Ol\xE1",i="";o>=5&&o<12?(s="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):o>=12&&o<18?(s="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(s="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let a=[];o>=0&&o<5?a=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:o<12?n===1?a=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:n===5?a=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:a=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:o<18?a=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:a=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(n===0||n===6)&&(a=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let r=a[Math.floor(Math.random()*a.length)];return{prefix:`${s},`,name:e,suffix:r,icon:i,isFriday:n===5}}async function Lo(){try{let t=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!t)return null;let o=t.parentElement,n=o.querySelector(".unmask-button")||o.querySelector('[aria-label="Click to view"]');n&&(n.click(),await Xt(500));let i=Array.from(o.querySelectorAll("a, span, div, pii-value")).find(a=>{let r=a.innerText.trim();return r.includes("@")&&!r.includes("Is this:")&&r.toLowerCase()!=="email"});return i?i.innerText.trim():null}catch(e){return console.warn("Erro ao capturar email do cliente:",e),null}}function Ro(){try{let e=document.querySelector('material-input[debug-id="account-id-input"]');if(e){let t=e.querySelector("input");if(t){let o=t.value.trim();if(o)return o.includes("@")?o:`${o}@google.com`}}}catch(e){console.warn("Erro ao capturar email interno:",e)}return null}async function it(){let e="Cliente",t="[INSERIR URL]";try{let i=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(i&&i.nextElementSibling){let a=i.nextElementSibling.innerText.trim();a&&(e=a)}}catch(s){console.warn("Falha Nome:",s)}try{let i=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(i&&i.nextElementSibling){let a=i.nextElementSibling.innerText.trim();a&&(t=a)}}catch(s){console.warn("Falha URL:",s)}let o=await Lo(),n=Ro();return{advertiserName:e,websiteUrl:t,clientEmail:o,internalEmail:n,agentName:_t()}}var We=null,Nt=null,Fe=.3;function Ue(){if(!We){let e=window.AudioContext||window.webkitAudioContext;e&&(We=new e)}return We&&We.state==="suspended"&&We.resume(),We}function Jt(e){if(Nt)return Nt;let t=e.sampleRate*2,o=e.createBuffer(1,t,e.sampleRate),n=o.getChannelData(0);for(let s=0;s<t;s++)n[s]=Math.random()*2-1;return Nt=o,o}var te={playClick:()=>{let e=Ue();if(!e)return;let t=e.currentTime,o=e.createBufferSource();o.buffer=Jt(e);let n=e.createBiquadFilter();n.type="highpass",n.frequency.value=4e3;let s=e.createGain();s.gain.setValueAtTime(Fe*.8,t),s.gain.exponentialRampToValueAtTime(.001,t+.015),o.connect(n),n.connect(s),s.connect(e.destination),o.start(t),o.stop(t+.02)},playHover:()=>{let e=Ue();if(!e)return;let t=e.currentTime,o=e.createOscillator();o.type="sine",o.frequency.setValueAtTime(400,t);let n=e.createGain();n.gain.setValueAtTime(0,t),n.gain.linearRampToValueAtTime(Fe*.1,t+.005),n.gain.linearRampToValueAtTime(0,t+.02),o.connect(n),n.connect(e.destination),o.start(t),o.stop(t+.03)},playSuccess:()=>{let e=Ue();if(!e)return;let t=e.currentTime;[1046.5,1567.9].forEach((n,s)=>{let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=n,a.gain.setValueAtTime(0,t),a.gain.linearRampToValueAtTime(Fe*.6,t+.05),a.gain.exponentialRampToValueAtTime(.001,t+.6),i.connect(a),a.connect(e.destination),i.start(t),i.stop(t+.7)})},playGenieOpen:()=>{let e=Ue();if(!e)return;let t=e.currentTime,o=e.createBufferSource();o.buffer=Jt(e);let n=e.createBiquadFilter();n.type="lowpass",n.frequency.setValueAtTime(100,t),n.frequency.exponentialRampToValueAtTime(800,t+.2);let s=e.createGain();s.gain.setValueAtTime(0,t),s.gain.linearRampToValueAtTime(Fe*.5,t+.05),s.gain.linearRampToValueAtTime(0,t+.25),o.connect(n),n.connect(s),s.connect(e.destination),o.start(t),o.stop(t+.3)},playError:()=>{let e=Ue();if(!e)return;let t=e.currentTime,o=e.createOscillator(),n=e.createGain();o.type="triangle",o.frequency.setValueAtTime(120,t),o.frequency.exponentialRampToValueAtTime(80,t+.1),n.gain.setValueAtTime(Fe,t),n.gain.exponentialRampToValueAtTime(.001,t+.15),o.connect(n),n.connect(e.destination),o.start(t),o.stop(t+.2)},playStartup:()=>{let e=Ue();if(!e)return;let t=e.currentTime,o=.12,n=e.createOscillator(),s=e.createGain(),i=e.createBiquadFilter();n.type="square",n.frequency.setValueAtTime(400,t),n.frequency.exponentialRampToValueAtTime(50,t+.1),i.type="lowpass",i.frequency.setValueAtTime(800,t),i.frequency.exponentialRampToValueAtTime(100,t+.1),s.gain.setValueAtTime(Fe*4,t),s.gain.exponentialRampToValueAtTime(.001,t+.1),n.connect(i),i.connect(s),s.connect(e.destination),n.start(t),n.stop(t+.12);let a=e.createOscillator(),r=e.createGain();a.type="sine",a.frequency.setValueAtTime(150,t),a.frequency.exponentialRampToValueAtTime(50,t+.15),r.gain.setValueAtTime(Fe*1.5,t),r.gain.exponentialRampToValueAtTime(.001,t+.15),a.connect(r),r.connect(e.destination),a.start(t),a.stop(t+.15),[55,55.4,110.5].forEach(l=>{let h=e.createOscillator(),d=e.createGain(),m=e.createBiquadFilter();h.type="sawtooth",h.frequency.value=l,m.type="lowpass",m.frequency.setValueAtTime(30,t),m.frequency.linearRampToValueAtTime(900,t+o+.2),m.frequency.exponentialRampToValueAtTime(40,t+3),d.gain.setValueAtTime(0,t),d.gain.linearRampToValueAtTime(Fe*.6,t+o+.1),d.gain.exponentialRampToValueAtTime(.001,t+3.5),h.connect(m),m.connect(d),d.connect(e.destination),h.start(t),h.stop(t+3.6)})},playNotification:()=>{let e=Ue();if(!e)return;let t=e.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(n=>{let s=e.createOscillator(),i=e.createGain();s.type="sine",s.frequency.setValueAtTime(n.freq,t),i.gain.setValueAtTime(0,t),i.gain.linearRampToValueAtTime(Fe*n.vol,t+.004),i.gain.exponentialRampToValueAtTime(.001,t+n.dur),s.connect(i),i.connect(e.destination),s.start(t),s.stop(t+n.dur+.1)})},playSwoosh:()=>{te.playGenieOpen()},playReset:()=>{te.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let e=0,t=50;document.addEventListener("mouseover",o=>{if(!We)return;let n=o.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!n||n.contains(o.relatedTarget))return;let s=Date.now();s-e<t||(te.playHover(),e=s)},{passive:!0})}};var eo=1e4;function oo(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
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
    `,document.head.appendChild(t)}function V(e,t={}){let o=document.createElement("div"),n=t.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(o.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:n,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),o.textContent=e,document.body.appendChild(o),t.error?te.playError():te.playSuccess(),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>o.remove(),400)},t.duration||4e3)}function no(e,t=null){let o=0,n=0,s=0,i=0,a=t||e;a.style.cursor="grab",a.onmousedown=r;function r(h){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(h.target.tagName)||h.target.closest(".no-drag"))return;h=h||window.event,a.style.cursor="grabbing",e.style.transition="none";let d=e.getBoundingClientRect();e.style.transform="none",e.style.left=d.left+"px",e.style.top=d.top+"px",e.style.margin="0",e.style.bottom="auto",e.style.right="auto",eo++,e.style.zIndex=eo,s=h.clientX,i=h.clientY,e.setAttribute("data-dragging","true"),document.onmouseup=l,document.onmousemove=c}function c(h){h=h||window.event,h.preventDefault(),o=s-h.clientX,n=i-h.clientY,s=h.clientX,i=h.clientY;let d=e.offsetTop-n,m=e.offsetLeft-o,p=16,b=window.innerWidth,k=window.innerHeight,L=e.offsetWidth,R=e.offsetHeight;m<p?m=p:m+L>b-p&&(m=b-L-p),d<p?d=p:d+R>k-p&&(d=k-R-p),e.style.top=d+"px",e.style.left=m+"px"}function l(){document.onmouseup=null,document.onmousemove=null,a.style.cursor="grab",setTimeout(()=>{e.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",e.setAttribute("data-dragging","false"),e.setAttribute("data-moved","true")},50)}}var Te={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var Mt={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},ao={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var io={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var ye={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var Ft=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],to=-1;function st(){let e=Math.floor(Math.random()*Ft.length);return e===to&&(e=(e+1)%Ft.length),to=e,Ft[e]}var Me=e=>new Promise(t=>setTimeout(t,e));async function Do(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let o=e.querySelector(".cursor");await Me(200);for(let n=0;n<t.length;n++){let s=t.charAt(n),i=document.createElement("span");i.textContent=s,o&&o.parentNode===e?o.before(i):e.appendChild(i);let a=Math.floor(Math.random()*60)+30;n===0&&(a=150),n>t.length-3&&(a=30),await Me(a)}await Me(600),o&&(o.style.display="none")}async function Lt(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
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
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await Me(200);let t=await Kt(),o=Zt(t),n=e.querySelector("#w-icon"),s=e.querySelector("#p1"),i=e.querySelector("#p2"),a=e.querySelector("#p3"),r=e.querySelector("#p-sextou");n&&(n.innerHTML=o.icon),s&&(s.textContent=o.prefix),a&&(a.textContent=o.suffix),await Me(300);let c=n?n.querySelector("svg"):null;if(c&&(c.style.opacity="1",c.style.transform="scale(1)"),await Me(400),s&&(s.style.opacity="1"),te.playStartup(),i&&await Do(i,o.name),a&&(a.style.opacity="1",a.style.transform="translateY(0)"),o.isFriday&&r){await Me(400),r.style.display="block",r.offsetWidth;let l=r.querySelector(".sextou-badge");l&&(l.style.opacity="1",l.style.transform="scale(1)")}await Me(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await Me(900),e.parentNode&&e.parentNode.removeChild(e)}}var Ze={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Je(e,t){t.onmousedown=o;function o(n){n.stopPropagation(),n.preventDefault();let s=e.style.transition;e.style.transition="none";let i=n.clientX,a=n.clientY,r=parseFloat(getComputedStyle(e,null).getPropertyValue("width").replace("px","")),c=parseFloat(getComputedStyle(e,null).getPropertyValue("height").replace("px","")),l=i,h=a,d=!1;function m(k){l=k.clientX,h=k.clientY,d||(window.requestAnimationFrame(()=>{p(),d=!1}),d=!0)}function p(){let k=r+(l-i),L=c+(h-a);k>360&&(e.style.width=k+"px"),L>300&&(e.style.height=L+"px")}function b(){document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",b),setTimeout(()=>{e.style.transition=s},50)}document.addEventListener("mousemove",m),document.addEventListener("mouseup",b)}t.onmouseenter=()=>t.style.opacity="1",t.onmouseleave=()=>t.style.opacity="0.6"}function so(e){if(!e)return"";let t={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return e.replace(/:([a-zA-Z0-9-_+]+):/g,o=>t[o]?t[o]:"")}var et=e=>new Promise(t=>setTimeout(t,e));function rt(e){e&&["mousedown","mouseup","click"].forEach(t=>e.dispatchEvent(new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window})))}var ro="cw-automation-styles";if(!document.getElementById(ro)){let e=document.createElement("style");e.id=ro,e.innerHTML=`
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
    `,document.head.appendChild(e)}function lo(e){let t=document.getElementById("cw-loading-overlay");e?t?t.style.opacity="1":(t=document.createElement("div"),t.id="cw-loading-overlay",document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1")):t&&(t.style.opacity="0",setTimeout(()=>t.remove(),300))}async function co(e){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let t=document.getElementById(e),o="";lo(!0),t&&(o=t.placeholder,t.placeholder="Buscando ID...",t.value="",t.classList.add("cw-scanning-active"));try{let n=document.querySelector('material-button[debug-id="dock-item-case-log"]');n&&!n.classList.contains("selected")&&(rt(n),await et(1200));let s=document.querySelector("search-filter dropdown-button .button");if(s&&!(s.innerText||"").includes("All")){rt(s),await et(600);let m=document.querySelector('material-checkbox[debug-id="check-all-box"]');m&&m.getAttribute("aria-checked")!=="true"&&(rt(m),await et(300));let p=document.querySelector('material-button[debug-id="apply-filter"]');p&&(rt(p),await et(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await et(500));let a=Array.from(document.querySelectorAll(".message-header"));for(let d=a.length-1;d>=0;d--){let m=a[d],p=m.querySelector("i.material-icons-extended"),b=p&&p.innerText.trim()==="phone_in_talk",k=m.innerText||"",L=k.includes("Agent joined")||k.includes("outbound-call")||k.includes("Speakeasy");if(b||L){m.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",m),t&&(t.placeholder="Lendo mensagem..."),rt(m),await et(1e3));break}}let c=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),l=/Speakeasy.*?(P\d{15,25})/i,h=null;for(let d=c.length-1;d>=0;d--){let m=c[d];if(m.offsetParent===null)continue;let p=(m.innerText||"").match(l);if(p&&p[1]){h=p[1];break}}if(t)if(h){try{await navigator.clipboard.writeText(h)}catch{}t.value=h,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),te.playSuccess(),V(`ID Localizado: ${h}`),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}else te.playError(),V("Nenhum ID encontrado.",{error:!0}),t.placeholder="N\xE3o encontrado",t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}catch(n){console.error("Erro na automa\xE7\xE3o:",n),V("Erro ao processar.",{error:!0})}finally{t&&(t.classList.remove("cw-scanning-active"),t.value||(t.placeholder=o)),lo(!1)}}var Le={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:"}},ze={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},lt={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>Substatus:</b> DC - Other<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br>Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},Ye={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},ct=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],Rt=["CONSIDERACOES","COMENTARIOS"],ke={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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
\u2022 Tentativa 2 -`}};var be=e=>new Promise(t=>setTimeout(t,e));function ve(e,t="info"){let o={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${e}`,o[t]||o.info)}function Oe(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>e.dispatchEvent(new MouseEvent(o,t)))}function ft(e,t){if(!e)return;let o=`cw-warning-${e.id||Math.random().toString(36).substr(2,9)}`,n=document.getElementById(o);n&&n.remove();let s=e.getBoundingClientRect(),i=document.createElement("div");i.id=o,i.style.cssText=`
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
    `;let a=i.querySelector(".cw-close-btn");a.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&a.click()},25e3)}async function ht(e,t){if(!e||!t)return;e.focus(),e.value="",e.dispatchEvent(new Event("input",{bubbles:!0})),await be(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),await be(100),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function Dt(){let t=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(o=>{let n=o.offsetParent!==null,s=o.closest("case-message-view")!==null,i=o.closest(".editor")!==null||o.closest("write-card")!==null;return n&&!s&&i});return t&&ve("Editor visualmente detectado.","success"),t}async function po(){ve("\u{1F680} FASE 1: Tentando abrir a janela de email...");let e=!1,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(d=>d.innerText.trim()==="email");if(o&&o.offsetParent!==null){ve("Bot\xE3o de email direto encontrado.");let d=o.closest("material-button")||o.closest("material-fab")||o;Oe(d),e=!0}else{ve("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let d=document.querySelector("material-fab-speed-dial");if(d){let m=d.querySelector(".trigger");if(m){Oe(m),await be(800);let b=Array.from(document.querySelectorAll("i.material-icons-extended")).find(k=>k.innerText.trim()==="email");b&&(Oe(b),e=!0)}}}if(!e)return V("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;ve("\u{1F680} FASE 2: Verificando rascunhos...");let n=null,s=0,i=20;for(;s<i;){await be(250);let d=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(n=Array.from(d).find(m=>m.offsetParent!==null),n){ve("\u26A0\uFE0F Rascunho detectado!","warn");break}s++}if(n){ve("\u{1F5D1}\uFE0F Descartando..."),Oe(n),n.click();let d=null,m=0;for(;m<15;){await be(300);let p=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(d=Array.from(p).find(b=>b.offsetParent!==null),d)break;m++}d&&(Oe(d),V("Limpando rascunho antigo...",{duration:2e3}),await be(2500))}ve("\u{1F680} FASE 3: Buscando editor final...");let a=0,r=null;for(;a<20&&(r=Dt(),!r);)await be(250),a++;if(!r)return V("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let c=r.closest('[id="email-body-content-top"]'),h=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(c){if(h){let m=h.closest('[aria-hidden="true"]');m&&m.removeAttribute("aria-hidden"),h.focus(),Oe(h)}await be(300),c.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let d=c.querySelector("#cases-body-field");if(d){let m=document.createRange();m.selectNodeContents(d),m.collapse(!0);let p=window.getSelection();p.removeAllRanges(),p.addRange(m)}return!0}return!1}async function xt(e){if(!e||!await po())return;let o=await it();ve("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let n=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(n&&(n.click(),await be(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await ht(i,o.clientEmail),ft(i,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await ht(i,o.internalEmail),ft(i,`
                <strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.
                <div style="margin-top:4px;">
                    <a href="https://mail.google.com/mail/u/0?ui=2&ik=ed23fb3167&attid=0.1&permmsgid=msg-f:1843445102914241244&th=19953b8dda2302dc&view=fimg&fur=ip&permmsgid=msg-f:1843445102914241244&sz=s0-l75-ft&attbid=ANGjdJ9m7O33cM36sxBYohVD6Qsapyux4PNr8qmTBlZ8zkp_LR79suGZhnxFJtBoFDeyMFygsH_tvCts5fnX0WV4rdClw9YqqR7guLnaXU9UzmZRRMRXEoC7T_MPbwo&disp=emb&realattid=ii_mfmv7wjm1&zw" target="_blank" style="color:#1a73e8;text-decoration:none;font-weight:500;display:inline-flex;align-items:center;">
                        Consultar Regra <span style="font-size:14px;margin-left:2px;">\u2197</span>
                    </a>
                </div>
            `))}await be(500);let s=document.querySelector('material-button[debug-id="canned_response_button"]');if(s){Oe(s),await be(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){Oe(i),document.execCommand("insertText",!1,e),i.dispatchEvent(new Event("input",{bubbles:!0})),ve("\u23F3 Buscando resultado da Canned Response...","info");let a=null,r=0,c=15e3,l=500;for(;r<c&&(a=document.querySelector("material-select-dropdown-item"),!a);)await be(l),r+=l;if(a){Oe(a),await be(1500);let h=Dt();if(h&&o.advertiserName){let d=h.innerHTML;d.includes("{%ADVERTISER_NAME%}")&&(h.innerHTML=d.replace(/{%ADVERTISER_NAME%}/g,o.advertiserName))}V("Canned Response aplicada!")}else ve(`\u274C Timeout: Resultado '${e}' n\xE3o apareceu ap\xF3s 15s.`,"error"),V(`Timeout: Template '${e}' n\xE3o carregou.`,{error:!0})}}else V("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function uo(e){if(ve(`\u{1F680} Iniciando Quick Email: ${e.name}`),!await po())return;let o=await it(),n=_t();await be(600),ve("\u{1F4E7} Processando destinat\xE1rios...");let s=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(s&&(s.click(),await be(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let r=document.querySelector('input[aria-label="Enter To email address"]');r&&(await ht(r,o.clientEmail),ft(r,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let r=document.querySelector('input[aria-label="Enter Bcc email address"]');r&&(await ht(r,o.internalEmail),ft(r,`
                <strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.
                <div style="margin-top:4px;">
                    <a href="https://mail.google.com/mail/u/0?ui=2&ik=ed23fb3167&attid=0.1&permmsgid=msg-f:1843445102914241244&th=19953b8dda2302dc&view=fimg&fur=ip&permmsgid=msg-f:1843445102914241244&sz=s0-l75-ft&attbid=ANGjdJ9m7O33cM36sxBYohVD6Qsapyux4PNr8qmTBlZ8zkp_LR79suGZhnxFJtBoFDeyMFygsH_tvCts5fnX0WV4rdClw9YqqR7guLnaXU9UzmZRRMRXEoC7T_MPbwo&disp=emb&realattid=ii_mfmv7wjm1&zw" target="_blank" style="color:#1a73e8;text-decoration:none;font-weight:500;display:inline-flex;align-items:center;">
                        Consultar Regra <span style="font-size:14px;margin-left:2px;">\u2197</span>
                    </a>
                </div>
            `))}let i=document.querySelector('input[aria-label="Subject"]');i&&e.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,e.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await be(300));let a=Dt();if(a){let c=(a.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');c&&(c.focus(),Oe(c));let l=new Date;l.setDate(l.getDate()+3);let h=l.getDay();h===6?l.setDate(l.getDate()+2):h===0&&l.setDate(l.getDate()+1);let d=l.toLocaleDateString("pt-BR"),m=e.body;m=m.replace(/\[Nome do Cliente\]/g,o.advertiserName||"Cliente"),m=m.replace(/\[INSERIR URL\]/g,o.websiteUrl||"seu site"),m=m.replace(/\[URL\]/g,o.websiteUrl||"seu site"),m=m.replace(/\[Seu Nome\]/g,n),m=m.replace(/\[MM\/DD\/YYYY\]/g,d),document.execCommand("insertHTML",!1,m),c&&(c.dispatchEvent(new Event("input",{bubbles:!0})),c.dispatchEvent(new Event("change",{bubbles:!0}))),V("Email preenchido com sucesso!",{duration:2e3}),ve("\u2705 Processo finalizado com sucesso.","success")}else V("Erro ao focar no editor.",{error:!0})}var Go={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},mo={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function qe(e,t,o,n,s,i){let a=document.createElement("div");Object.assign(a.style,Go),no(e,a);let r=document.createElement("div");Object.assign(r.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),a.appendChild(r),s&&(s.googleLine=r);let c=document.createElement("div");Object.assign(c.style,{display:"flex",alignItems:"center",gap:"12px"});let l=document.createElement("img");l.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(l.style,{width:"20px",height:"20px",pointerEvents:"none"});let h=document.createElement("span");h.textContent=t,c.appendChild(l),c.appendChild(h);let d=document.createElement("div");Object.assign(d.style,{display:"flex",alignItems:"center",gap:"4px"});let m='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',p='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',b=document.createElement("div");b.innerHTML=m,Object.assign(b.style,mo),b.title="Sobre & Feedback",b.classList.add("no-drag"),b.onmouseenter=()=>{b.style.background="rgba(255,255,255,0.1)",b.style.color="#FFF"},b.onmouseleave=()=>{b.style.color!=="rgb(138, 180, 248)"&&(b.style.background="transparent",b.style.color="#9AA0A6")};let k=document.createElement("div");k.innerHTML=p,Object.assign(k.style,mo),k.title="Fechar",k.classList.add("no-drag"),k.onmouseenter=()=>{k.style.background="rgba(242, 139, 130, 0.2)",k.style.color="#F28B82"},k.onmouseleave=()=>{k.style.background="transparent",k.style.color="#9AA0A6"},k.onmousedown=R=>R.stopPropagation(),b.onmousedown=R=>R.stopPropagation(),k.onclick=i;let L=zo(e,t,o,n);return b.onclick=R=>{R.stopPropagation(),L.style.opacity==="1"?(L.style.opacity="0",L.style.pointerEvents="none",b.style.color="#9AA0A6",b.style.background="transparent"):(L.style.opacity="1",L.style.pointerEvents="auto",b.style.color="#8AB4F8",b.style.background="rgba(138, 180, 248, 0.1)")},d.appendChild(b),d.appendChild(k),a.appendChild(c),a.appendChild(d),a}function zo(e,t,o,n){let s=document.createElement("div");return Object.assign(s.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),s.innerHTML=`
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
    `,document.head.appendChild(e)}function Ie(e,t,o){let n=document.getElementById(o);if(!t)return;let s=t.getAttribute("data-moved")==="true",i={x:0,y:0};if(n){let h=n.getBoundingClientRect();i.x=h.left+h.width/2,i.y=h.top+h.height/2}let a,r;if(!s)a=window.innerWidth/2,r=window.innerHeight/2;else{let h=t.getBoundingClientRect();a=h.left+h.width/2,r=h.top+h.height/2,a===0&&r===0&&(a=window.innerWidth/2,r=window.innerHeight/2)}let c=i.x-a,l=i.y-r;e?(te.playGenieOpen(),t.style.transition="none",t.style.opacity="0",t.style.pointerEvents="auto",s?t.style.transform=`translate(${c}px, ${l}px) scale(0.05)`:t.style.transform=`translate(calc(-50% + ${c}px), calc(-50% + ${l}px)) scale(0.05)`,t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("open"),n&&n.classList.add("active"),t.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",t.style.opacity="1",s?t.style.transform="translate(0, 0) scale(1)":t.style.transform="translate(-50%, -50%) scale(1)"}),typeof go=="function"&&go(t,o)):(te.playSwoosh(),t.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",t.style.pointerEvents="none",requestAnimationFrame(()=>{t.style.opacity="0",s?t.style.transform=`translate(${c}px, ${l}px) scale(0.1)`:t.style.transform=`translate(calc(-50% + ${c}px), calc(-50% + ${l}px)) scale(0.1)`}),setTimeout(()=>{t.classList.remove("open"),n&&n.classList.remove("active"),t.style.transition="",t.style.transform=""},300),typeof Gt=="function"&&Gt(t))}function go(e,t){Gt(e);let o=n=>{if(!e.classList.contains("open"))return;let s=e.contains(n.target),i=document.querySelector(".cw-pill"),a=i&&i.contains(n.target);s?(e.classList.remove("idle"),e.style.zIndex="2147483648"):a||(e.classList.add("idle"),e.style.zIndex="2147483646")};e._idleHandler=o,document.addEventListener("mousedown",o)}function Gt(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}var Bo="https://script.google.com/a/macros/google.com/s/AKfycbysAGOgn40LEQ1uJIppENtTGNSRscLRQkGA96UPYTDDbA0c_KhVUwDQ-Do8ZQ7lQizo/exec",zt="cw_data_broadcast",bo="cw_data_tips",Po=["Processando...","Mantenha o foco!","Aguarde..."];function Bt(e,t={}){return new Promise((o,n)=>{let s="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script");window[s]=c=>{document.body.contains(i)&&document.body.removeChild(i),delete window[s],o(c)};let a=Object.keys(t).map(c=>encodeURIComponent(c)+"="+encodeURIComponent(t[c])).join("&"),r=`${Bo}?op=${e}&callback=${s}&t=${Date.now()}&${a}`;i.src=r,i.onerror=()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[s],n(new Error("JSONP Error (Check Corp Login)"))},document.body.appendChild(i)})}var we={fetchTips:async()=>{try{let e=await Bt("tips");e?.tips&&localStorage.setItem(bo,JSON.stringify(e.tips))}catch(e){console.warn("Tips offline",e)}},fetchData:async()=>{try{let e=await Bt("broadcast");if(e?.broadcast)return localStorage.setItem(zt,JSON.stringify(e.broadcast)),e}catch(e){console.warn("Broadcast offline",e)}return{broadcast:JSON.parse(localStorage.getItem(zt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(zt)||"[]"),getRandomTip:()=>{let e=Po,t=localStorage.getItem(bo);if(t)try{e=JSON.parse(t)}catch{}return e[Math.floor(Math.random()*e.length)]},sendBroadcast:async e=>{let t={...e,date:new Date().toISOString(),id:Date.now().toString()};return await we._performOp("new_broadcast",t)},updateBroadcast:async(e,t)=>{let o={id:e,...t};return await we._performOp("update_broadcast",o)},deleteBroadcast:async e=>await we._performOp("delete_broadcast",{id:e}),_performOp:async(e,t)=>{try{console.log(`\u{1F4E4} Executando ${e}...`,t);let o=await Bt(e,t);return o&&o.status==="success"?(console.log("\u2705 Sucesso:",e),!0):(console.warn("\u26A0\uFE0F Falha:",o),!1)}catch(o){return console.error("\u274C Erro JSONP:",o),!1}},logUsage:()=>{}};var pe={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00"},yt=e=>new Promise(t=>setTimeout(t,e));function fo(e){let t="cw-command-center-style";if(!document.getElementById(t)){let p=document.createElement("style");p.id=t,p.innerHTML=`
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
        `,document.head.appendChild(p)}let o={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>'},n=document.createElement("div");n.className="cw-pill side-right",n.innerHTML=`
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
    `;let s=document.createElement("div");if(s.className="cw-focus-backdrop",document.body.appendChild(s),document.body.appendChild(n),n.querySelector(".notes").onclick=p=>{p.stopPropagation(),e.toggleNotes()},n.querySelector(".email").onclick=p=>{p.stopPropagation(),e.toggleEmail()},n.querySelector(".script").onclick=p=>{p.stopPropagation(),e.toggleScript()},n.querySelector(".links").onclick=p=>{p.stopPropagation(),e.toggleLinks()},n.querySelector(".broadcast").onclick=p=>{p.stopPropagation();let b=p.currentTarget.querySelector(".cw-badge");b&&(b.style.transform="scale(0)",setTimeout(()=>b.remove(),200)),e.broadcastControl&&e.broadcastControl.toggle()},e.broadcastControl&&e.broadcastControl.hasUnread){let p=document.createElement("div");p.className="cw-badge",n.querySelector(".broadcast").appendChild(p)}(async function(){await yt(2800),n.classList.add("docked"),await yt(300);let b=n.querySelectorAll(".cw-btn");n.querySelectorAll(".cw-sep").forEach(k=>k.classList.add("visible"));for(let k=0;k<b.length;k++)b[k].classList.add("popped"),await yt(90);await yt(200),n.classList.add("system-check")})();let i=!1,a,r,c,l,h=3;n.onmousedown=p=>{if(p.target.closest("button"))return;p.preventDefault(),a=p.clientX,r=p.clientY;let b=n.getBoundingClientRect();c=b.left,l=b.top,document.addEventListener("mousemove",d),document.addEventListener("mouseup",m)};function d(p){let b=p.clientX-a,k=p.clientY-r;!i&&Math.sqrt(b*b+k*k)>h&&(i=!0,n.style.transition="none"),i&&(n.style.left=`${c+b}px`,n.style.top=`${l+k}px`,n.style.right="auto",n.style.bottom="auto",n.style.transform="none")}function m(p){if(document.removeEventListener("mousemove",d),document.removeEventListener("mouseup",m),i){i=!1,n.style.transition="left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s ease";let b=window.innerWidth,k=window.innerHeight,L=n.getBoundingClientRect(),R=L.left+L.width/2,B;R<b/2?(B=24,n.classList.remove("side-right"),n.classList.add("side-left")):(B=b-L.width-24,n.classList.remove("side-left"),n.classList.add("side-right"));let Y=L.top;Y<24&&(Y=24),Y>k-L.height-24&&(Y=k-L.height-24),n.style.left=`${B}px`,n.style.top=`${Y}px`}else{let b=p.target.closest("button");b&&(b.style.transform="scale(0.9)",setTimeout(()=>b.style.transform="",150))}}}function vt(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop");if(!e)return()=>{};window._CW_ABORT_PROCESS=!1;let o=document.createElement("div");o.className="cw-center-stage",o.innerHTML=`
        <div class="cw-center-dots"><span></span><span></span><span></span></div>
        <div class="cw-center-text">${we.getRandomTip()}</div>
        <div class="cw-center-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
    `;let n=document.createElement("div");n.className="cw-abort-btn",n.textContent="Cancelar",n.onclick=i=>{i.stopPropagation(),window._CW_ABORT_PROCESS=!0,V("Cancelado! Mas a nota foi copiada para a \xE1rea de transfer\xEAncia.",{duration:4e3}),o.remove(),e.classList.remove("processing-center"),e.classList.remove("success"),t&&t.classList.remove("active")},o.appendChild(n),e.appendChild(o);let s=Date.now();return e.classList.add("processing-center"),t&&t.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!e.contains(o))return;let a=Date.now()-s,r=Math.max(0,2e3-a);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!e.contains(o))return;let c=o.querySelector(".cw-center-dots"),l=o.querySelector(".cw-center-text"),h=o.querySelector(".cw-center-success"),d=o.querySelector(".cw-abort-btn");c&&(c.style.display="none"),l&&(l.style.display="none"),d&&(d.style.display="none"),h&&h.classList.add("show"),e.classList.add("success"),setTimeout(()=>{e.classList.remove("processing-center"),setTimeout(()=>{o.remove(),e.classList.remove("success"),t&&t.classList.remove("active")},400)},1e3)},r)}}function ho(e){let t=document.createElement("div");t.className="cw-step-scenarios";let o=document.createElement("div");Object.assign(o.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let n=document.createElement("div");Object.assign(n.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"40px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s ease"}),n.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>";let s=null;Object.entries(ke).forEach(([a,r])=>{let c=document.createElement("div");c.textContent=a,Object.assign(c.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",display:"flex",alignItems:"center",gap:"6px"}),c.onmouseenter=()=>{s!==r&&(n.style.background="#fff",n.style.borderColor="#1a73e8",n.style.color="#202124",n.textContent=`"${r.substring(0,120)}${r.length>120?"...":""}"`),s!==r&&(c.style.background="#f1f3f4")},c.onmouseleave=()=>{s!==r&&(s||(n.style.background="#f8f9fa",n.style.borderColor="#dadce0",n.style.color="#5f6368",n.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>"),c.style.background="#ffffff")},c.onclick=()=>{te.playClick(),s===r?(s=null,i(),e("")):(s=r,i(),c.style.transform="scale(0.95)",setTimeout(()=>c.style.transform="scale(1)",150),e(r))},o.appendChild(c)});function i(){Array.from(o.children).forEach(a=>{ke[a.textContent]===s?(a.style.background="#e8f0fe",a.style.borderColor="#1a73e8",a.style.color="#1967d2",a.style.fontWeight="500"):(a.style.background="#ffffff",a.style.borderColor="#dadce0",a.style.color="#3c4043",a.style.fontWeight="400")})}return t.appendChild(o),t.appendChild(n),t}var xo=e=>new Promise(t=>setTimeout(t,e));function wt(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>e.dispatchEvent(new MouseEvent(o,t)))}function dt(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let o=document.createRange();o.selectNodeContents(t);let n=window.getSelection();n.removeAllRanges(),n.addRange(o);try{document.execCommand("copy")}catch{V("Falha ao copiar",{error:!0})}n.removeAllRanges(),document.body.removeChild(t)}function At(e){["input","change","keydown","keyup"].forEach(o=>{let n=new Event(o,{bubbles:!0,cancelable:!0});e.dispatchEvent(n)})}function yo(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function Ct(){console.log("Iniciando processo de Nova Nota...");let e=yo(),t=e.length,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(a=>a.innerText.trim()==="description");if(n){let a=n.closest("material-fab")||n.closest("material-button");a?(a.style&&(a.style.display="block",a.style.visibility="visible"),wt(a)):wt(n)}else{let a=document.querySelector("material-fab-speed-dial");if(a){let r=a.querySelector(".trigger");r?(r.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),wt(r)):a.click(),await xo(800);let l=Array.from(document.querySelectorAll("i.material-icons-extended")).find(h=>h.innerText.trim()==="description");l&&wt(l)}}let s=null,i=0;for(;!s&&i<20;){await xo(300);let a=yo();if(a.length>t)s=a.find(r=>!e.includes(r)),s||(s=a[a.length-1]);else if(i>10){let r=a.filter(c=>c.offsetParent!==null);r.length>0&&(s=r[r.length-1])}i++}return s}var J={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},_e="cubic-bezier(0.25, 0.8, 0.25, 1)",jo={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${J.border}`,backgroundColor:J.bgInput,fontSize:"14px",color:J.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${_e}, box-shadow 0.2s ${_e}, background-color 0.2s`,outline:"none"},Cn={...jo,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},Sn={fontSize:"13px",fontWeight:"700",color:J.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},En={display:"block",fontSize:"13px",fontWeight:"600",color:J.text,marginBottom:"8px",marginTop:"16px"},Tn={fontSize:"12px",color:J.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},kn={fontSize:"12px",color:J.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},On={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:J.text,cursor:"pointer",padding:"12px 14px",backgroundColor:J.surface,border:`1px solid ${J.border}`,borderRadius:"12px",transition:`all 0.2s ${_e}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},Pt={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:J.primary},qn={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:J.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${_e}, box-shadow 0.2s ${_e}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},In={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${J.primary}`,color:J.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${_e}`},_n={background:"transparent",border:`1px solid ${J.border}`,borderRadius:"20px",color:J.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${_e}`,fontFamily:"'Google Sans', 'Roboto'"};var Nn={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:J.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},Fn={fontSize:"13px",fontWeight:"700",color:J.primary,minWidth:"20px",textAlign:"center"},Mn={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${J.border}`,backgroundColor:J.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${_e}, box-shadow 0.2s ${_e}`},Ln={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${J.bgInput}`},Rn={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${J.border}`,backgroundColor:J.surface,color:J.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${_e}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},Dn={backgroundColor:J.primaryBg,color:J.primary,borderColor:J.primary,fontWeight:"600"},Gn={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:J.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},zn={borderTop:`1px solid ${J.bgInput}`,paddingTop:"20px",marginTop:"16px"};var Bn={maxHeight:"240px",overflowY:"auto",border:`1px solid ${J.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:J.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},Pn={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${J.bgInput}`,cursor:"pointer",fontSize:"13px",color:J.text,transition:"background 0.1s",userSelect:"none"};var Ho={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},Vo={fontSize:"12px",color:"#e37400",marginTop:"4px"},$o={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},Uo={display:"flex",gap:"15px",marginBottom:"10px"};function vo(){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,Ho);let t=document.createElement("label");t.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(t.style,Mt,{marginTop:"0"});let o=document.createElement("div");Object.assign(o.style,Uo);let n=document.createElement("input");n.type="radio",n.name="ts_usage_mod",n.value="Sim",Object.assign(n.style,Pt);let s=document.createElement("label");s.textContent="Sim";let i=document.createElement("div");Object.assign(i.style,{display:"flex",alignItems:"center"}),i.appendChild(n),i.appendChild(s);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="N\xE3o",a.checked=!0,Object.assign(a.style,Pt);let r=document.createElement("label");r.textContent="N\xE3o";let c=document.createElement("div");Object.assign(c.style,{display:"flex",alignItems:"center"}),c.appendChild(a),c.appendChild(r),o.appendChild(i),o.appendChild(c);let l=document.createElement("div");l.style.display="block";let h=document.createElement("label");h.textContent="Qual foi o Motivo?",Object.assign(h.style,Mt,{fontSize:"12px"});let d=document.createElement("input");d.type="text",Object.assign(d.style,$o);let m=document.createElement("div");m.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(m.style,Vo),l.appendChild(h),l.appendChild(d),l.appendChild(m),e.appendChild(t),e.appendChild(o),e.appendChild(l),n.onchange=()=>{l.style.display="none"},a.onchange=()=>{l.style.display="block"};function p(L,R){if(e.style.display="none",!L||L.includes("Education")||!R||R.length===0)return;let B=R.some(u=>u.includes("enhanced")||u==="ec_google_ads"),Y=R.some(u=>(u.includes("conversion")||u.includes("ads"))&&!u.includes("enhanced")),se=R.some(u=>u.includes("ga4")||u.includes("analytics")||u.includes("ua")),x=R.some(u=>u.includes("merchant")||u.includes("gmc")||u.includes("shopping"));(B||Y&&!se&&!x)&&(e.style.display="block")}function b(){if(e.style.display==="none")return"";let L=`<br><b>Utilizou Tag Support?</b> ${n.checked?"Sim":"N\xE3o"}`;return a.checked&&d.value.trim()!==""&&(L+=`<br><b>Motivo:</b> ${d.value}`),L+="<br>",L}function k(){e.style.display="none",a.checked=!0,n.checked=!1,l.style.display="block",d.value=""}return{element:e,updateVisibility:p,getOutput:b,reset:k}}var X={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Xe={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function wo(e){let t={},o="implementation";function n(x){let f=x.toLowerCase();return f.includes("ads")||f.includes("conversion")||f.includes("remarketing")?X.brands.ads:f.includes("ga4")||f.includes("analytics")?X.brands.ga4:f.includes("gtm")||f.includes("tag manager")||f.includes("container")?X.brands.gtm:f.includes("merchant")||f.includes("shopping")||f.includes("feed")?X.brands.gmc:X.brands.default}let s=Object.entries(ze).filter(([x,f])=>f.popular),i={};Object.entries(ze).forEach(([x,f])=>{if(f.popular)return;let u=n(f.name);i[u.label]||(i[u.label]={brand:u,tasks:[]}),i[u.label].tasks.push({key:x,...f})});let a="cw-zen-tasks";if(!document.getElementById(a)){let x=document.createElement("style");x.id=a,x.innerHTML=`
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
        `,document.head.appendChild(x)}let r=document.createElement("div");r.className="cw-zen-container";let c=document.createElement("div");Object.assign(c.style,{display:"none"});let l=document.createElement("div");l.className="cw-screens-container",c.appendChild(l),r.innerHTML=`
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
    `;let h=r.querySelector(".cw-hero-grid"),d=r.querySelector(".cw-acc-container"),m=r.querySelector(".cw-results-container"),p=r.querySelector(".cw-search-input"),b=r.querySelector(".cw-status-bar"),k=r.querySelector(".cw-status-text"),L=r.querySelector(".cw-footer-icons");s.forEach(([x,f])=>{let u=n(f.name),C=document.createElement("div");C.className="cw-hero-card",C.id=`hero-${x}`,C.style.setProperty("--hero-color",u.color),C.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${Xe[u.icon]}</div>
                <div class="cw-hero-label">${f.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,C.onclick=v=>{if(v.target.closest(".cw-step-btn"))return;let T=t[x]?t[x].count:0;B(x,T>0?-T:1,f)},C.querySelector(".minus").onclick=()=>B(x,-1,f),C.querySelector(".plus").onclick=()=>B(x,1,f),C.dataset.color=u.color,h.appendChild(C)});function R(x,f){let u=n(f.name),C=document.createElement("div");return C.className="cw-task-item",C.dataset.id=x,C.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${u.bg}; color:${u.color}">
                    ${Xe[u.icon]||Xe.default}
                </div>
                <div class="cw-task-label">${f.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,C.onclick=v=>{if(v.target.closest(".cw-step-btn"))return;let T=t[x]?t[x].count:0;B(x,T>0?-T:1,f)},C.querySelector(".minus").onclick=()=>B(x,-1,f),C.querySelector(".plus").onclick=()=>B(x,1,f),C}Object.entries(i).forEach(([x,f])=>{let u=document.createElement("div");u.className="cw-acc-group";let C=document.createElement("div");C.className="cw-acc-header",C.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${f.brand.color}"></div>
                ${x}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,C.onclick=()=>{d.querySelectorAll(".cw-acc-group.open").forEach(T=>{T!==u&&T.classList.remove("open")}),u.classList.toggle("open")};let v=document.createElement("div");v.className="cw-acc-body",f.tasks.forEach(T=>{let D=R(T.key,T);v.appendChild(D)}),u.appendChild(C),u.appendChild(v),d.appendChild(u)});function B(x,f,u){t[x]||(t[x]={count:0,data:u,brand:n(u.name)}),t[x].count+=f,t[x].count<=0&&delete t[x],Y(),se(),e&&e()}function Y(){s.forEach(([v])=>{let T=h.querySelector(`#hero-${v}`);if(!T)return;let D=t[v];D?(T.classList.add("active"),T.querySelector(".cw-step-val").textContent=D.count,T.querySelector(".cw-step-val").style.color=T.dataset.color):T.classList.remove("active")}),r.querySelectorAll(".cw-task-item").forEach(v=>{let T=v.dataset.id,D=t[T];D?(v.classList.add("selected"),v.querySelector(".cw-step-val").textContent=D.count):v.classList.remove("selected")});let f=Object.keys(t),u=0,C=[];if(f.forEach(v=>{let T=t[v];u+=T.count;for(let D=0;D<T.count;D++)C.length<6&&C.push(T.brand)}),u>0){b.classList.add("visible");let v=u>1?"A\xE7\xF5es":"A\xE7\xE3o",T=u>1?"definidas":"definida";k.textContent=`${u} ${v} ${T}`,L.innerHTML="",C.forEach(D=>{let O=document.createElement("div");O.className="cw-mini-icon",O.innerHTML=Xe[D.icon]||Xe.default;let I=O.querySelector("svg");I&&(I.style.width="14px",I.style.height="14px"),L.appendChild(O)})}else b.classList.remove("visible")}p.addEventListener("input",x=>{let f=x.target.value.toLowerCase();if(f.length>0){d.style.display="none",m.style.display="block",m.innerHTML="";let u=!1;Object.entries(ze).forEach(([C,v])=>{if(v.name.toLowerCase().includes(f)){u=!0;let T=R(C,v);t[C]&&(T.classList.add("selected"),T.querySelector(".cw-step-val").textContent=t[C].count),m.appendChild(T)}}),u||(m.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else d.style.display="block",m.style.display="none"});function se(){l.innerHTML="";let x=Object.keys(t),f=!1,u=document.getElementById("sub-status"),C="implementation";if(u&&u.value.toLowerCase().includes("education")&&(C="education"),x.length===0){l.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}if(x.length===0){l.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}let v=document.createElement("div");v.className="cw-info-banner",v.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Todos os Screenshots s\xE3o baseados na descri\xE7\xE3o do 
                <a href="https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/" target="_blank" class="cw-info-link">Win Criteria</a>.
            </span>
        `,l.appendChild(v),x.forEach(T=>{let D=t[T].data,O=t[T].count,I=t[T].brand,P=D.screenshots?D.screenshots[C]||[]:["Link da Evid\xEAncia"];if(P.length>0){f=!0;for(let g=1;g<=O;g++){let S=document.createElement("div");S.className="cw-screen-card",S.style.setProperty("--brand-color",I.color),S.style.setProperty("--brand-bg",I.bg),S.style.setProperty("--brand-shadow",I.color+"40");let w=document.createElement("div");w.className="cw-card-header";let y=document.createElement("div");y.className="cw-card-icon",y.innerHTML=Xe[I.icon]||Xe.default;let E=document.createElement("div");E.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let _=document.createElement("input");_.className="cw-card-title-input",_.id=`name-${T}-${g}`,_.value=`${D.name}${O>1?" #"+g:""}`,_.title="Clique para renomear esta task";let $=document.createElement("span");$.className="cw-edit-hint",$.innerHTML="\u270E Renomear",E.appendChild(_),E.appendChild($),w.appendChild(y),w.appendChild(E),S.appendChild(w),P.forEach((M,N)=>{let G=document.createElement("div");G.className="cw-input-group";let U=document.createElement("label");U.className="cw-input-label",U.textContent=M.replace(/📷|:|•/g,"").trim();let q=document.createElement("input");q.className="cw-input-field",q.id=`screen-${T}-${g}-${N}`,q.placeholder="Cole o link aqui...",q.setAttribute("autocomplete","off"),q.addEventListener("input",()=>{q.value.trim().length>5?q.classList.add("filled"):q.classList.remove("filled")});let j=document.createElement("div");j.className="cw-input-check",j.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',G.appendChild(U),G.appendChild(q),G.appendChild(j),S.appendChild(G)}),l.appendChild(S)}}}),c.style.display=f?"block":"none"}return{selectionElement:r,screenshotsElement:c,updateSubStatus:()=>se(),getCheckedElements:()=>Object.keys(t).map(x=>({value:x,closest:()=>({querySelector:()=>({textContent:t[x].count})})})),toggleTask:(x,f=!0)=>{let u=t[x];f&&!u?B(x,1,ze[x]):!f&&u&&B(x,-u.count,ze[x])},setMode:x=>{o=x,se()},reset:()=>{for(let x in t)delete t[x];p.value="",d.style.display="block",m.style.display="none",Y(),se()}}}function Ao(e){let t=document.createElement("div");t.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden;";let o=document.createElement("div");o.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px;";let n={sectionTitle:`
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
        `};function s(I,P,g="text",S=""){let w=document.createElement("div");w.style.cssText=n.inputWrapper;let y=document.createElement("label");y.style.cssText=n.label,y.textContent=P;let E;g==="textarea"?(E=document.createElement("textarea"),E.style.cssText=n.input+n.textarea):(E=document.createElement("input"),E.type=g,E.style.cssText=n.input);let _=E.style.cssText;return E.onfocus=()=>E.style.cssText=_+n.inputFocus,E.onblur=()=>E.style.cssText=_,E.id=`st-${I}`,E.placeholder=S,w.appendChild(y),w.appendChild(E),{wrapper:w,input:E}}function i(I,P){let g=document.createElement("div"),S=document.createElement("label");S.style.cssText=n.label,S.textContent=P,g.appendChild(S);let w=document.createElement("div");return w.style.cssText=n.radioGroup,["Yes","No"].forEach(y=>{let E=document.createElement("label");E.style.cssText=n.radioLabel;let _=document.createElement("input");_.type="radio",_.name=`st-${I}`,_.value=y==="Yes"?"Y":"N",_.style.display="none",y==="No"&&(_.checked=!0),E.onmousedown=()=>E.style.transform="scale(0.96)",E.onmouseup=()=>E.style.transform="scale(1)",E.onmouseleave=()=>E.style.transform="scale(1)",E.appendChild(_),E.appendChild(document.createTextNode(y)),_.addEventListener("change",()=>{w.querySelectorAll("label").forEach($=>$.style.cssText=n.radioLabel),_.checked&&(E.style.cssText=n.radioLabel+n.radioActive)}),y==="No"&&(E.style.cssText=n.radioLabel+n.radioActive),w.appendChild(E)}),g.appendChild(w),{wrapper:g}}let a=document.createElement("div");a.style.cssText=n.banner,a.innerHTML=`
        <span style="font-size: 18px;">\u26A0\uFE0F</span>
        <div>
            <div style="font-weight:700; margin-bottom:4px;">Processo Cr\xEDtico</div>
            Antes de transferir, verifique o <a href="https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o" target="_blank" style="color:#B06000; text-decoration:underline;">SOP de Out of Scope</a> e consulte um <a href="http://go/webao-help-deluxe" target="_blank" style="color:#B06000; text-decoration:underline;">SME</a>.
        </div>
    `,o.appendChild(a);let r=document.createElement("button");r.style.cssText=n.magicBtn,r.innerHTML='<span style="font-size:16px">\u2728</span> Preencher Automaticamente',r.onmouseover=()=>r.style.backgroundColor="#F8F9FA",r.onmouseout=()=>r.style.backgroundColor="#FFFFFF",r.onmousedown=()=>r.style.transform="scale(0.98)",r.onmouseup=()=>r.style.transform="scale(1)",o.appendChild(r);let c=document.createElement("div");c.style.cssText=n.sectionTitle,c.style.marginTop="24px",c.innerHTML="<span>\u{1F6E0}\uFE0F</span> Dados T\xE9cnicos",o.appendChild(c);let l=s("cid","Ads CID","text","000-000-0000"),h=s("ga4","GA4 ID"),d=s("gtm","GTM ID"),m=i("access","Advertiser has access to GA4/GTM?"),p=s("access-email","If Yes, User Email"),b=i("ghost","Ghosting Access Available?");o.append(l.wrapper,h.wrapper,d.wrapper,m.wrapper,p.wrapper,b.wrapper);let k=document.createElement("div");k.style.cssText=n.sectionTitle,k.innerHTML="<span>\u{1F4DE}</span> Contato & Problema",o.appendChild(k);let L=s("name","Name of Advertiser"),R=s("url","Website Address"),B=s("phone","Phone Number"),Y=s("email","Email Address"),se=s("callback","Preferred Call Back Time (w/ Timezone)"),x=s("desc","Detailed Issue Description","textarea","Descreva o problema t\xE9cnico em detalhes..."),f=s("checks","Checks Performed by Tech Team","textarea","Liste o troubleshooting j\xE1 realizado..."),u=s("screens","Uncropped Screenshots (Links)","textarea","https://...");o.append(L.wrapper,R.wrapper,B.wrapper,Y.wrapper,se.wrapper,x.wrapper,f.wrapper,u.wrapper);let C=document.createElement("div");C.style.cssText=n.sectionTitle,C.innerHTML="<span>\u{1F4E7}</span> Contatos para C\xF3pia (CC)",o.appendChild(C);let v=s("c-adv","Advertiser Contact"),T=s("c-am","Account Manager");o.append(v.wrapper,T.wrapper);let D=document.createElement("div");D.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.9); backdrop-filter: blur(8px); border-top: 1px solid #E0E0E0; display: flex; justify-content: flex-end; position: absolute; bottom: 0; width: 100%; box-sizing: border-box; z-index: 100;";let O=document.createElement("button");return O.textContent="Gerar Nota S&T",O.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 24px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 6px rgba(26, 115, 232, 0.3); transition: transform 0.1s, box-shadow 0.2s;",O.onmousedown=()=>{O.style.transform="scale(0.96)",O.style.boxShadow="0 1px 3px rgba(26, 115, 232, 0.2)"},O.onmouseup=()=>{O.style.transform="scale(1)",O.style.boxShadow="0 2px 6px rgba(26, 115, 232, 0.3)"},D.appendChild(O),t.appendChild(o),t.appendChild(D),r.onclick=async()=>{r.innerHTML='<span style="font-size:16px">\u23F3</span> Buscando...';let I=await it();I.advertiserName&&(L.input.value=I.advertiserName),I.websiteUrl&&(R.input.value=I.websiteUrl),I.clientEmail&&(Y.input.value=I.clientEmail,v.input.value=I.clientEmail);let g=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);g&&(l.input.value=g[0]),r.innerHTML='<span style="font-size:16px; color:#188038">\u2705</span> Dados Preenchidos!',r.style.background="#E6F4EA",r.style.borderColor="#188038",setTimeout(()=>{r.innerHTML='<span style="font-size:16px">\u2728</span> Preencher Automaticamente',r.style.background="#FFFFFF",r.style.borderColor="#DADCE0"},2e3),V("Dados capturados com sucesso!")},O.onclick=async()=>{let I=y=>{let E=t.querySelector(`#st-${y}`);return E?E.value:""},P=y=>{let E=t.querySelector(`input[name="st-${y}"]:checked`);return E?E.value:"N"},S=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${I("cid")}
<b>GA4 ID:</b> ${I("ga4")}
<b>GTM ID:</b> ${I("gtm")}
<b>Advertiser has access to either GA4 or GTM (Y/N):</b> ${P("access")}
<b>If Yes, user access email to GA4/GTM:</b> ${I("access-email")}
<b>Ghosting Access Available (Y/N):</b> ${P("ghost")}
<b>Name of the advertiser:</b> ${I("name")}
<b>Website Address:</b> ${I("url")}
<b>Advertiser\u2019s preferred mode of communication:</b> Phone
<b>Advertiser/Web Master\u2019s Phone Number:</b> ${I("phone")}
<b>Preferred Call Back time with time zone and contact number:</b> ${I("callback")}
<b>Advertiser/Web Master\u2019s Email Address:</b> ${I("email")}

<b>Detailed Issue Description:</b>
${I("desc")}

<b>Name of the conversion action or event in the question:</b> N/A
<b>Date range:</b> N/A
<b>Uncropped screenshots of the issue:</b>
${I("screens")}

<b>Test conversion details (if any):</b> N/A

<b>Checks performed by Technical Solutions Team (Detailed Info + Screenshot doc):</b>
${I("checks")}

[IMP] Contacts to be copied on all communication about this case
<b>Advertiser contact -</b> ${I("c-adv")}
<b>Account Manager -</b> ${I("c-am")}
<b>Additional Contact -</b> N/A

<b>Additional Comments:</b> (Optional)`.replace(/\n/g,"<br>");dt(S);let w=await Ct();w?(w.innerText.trim()===""&&(w.innerHTML=""),document.execCommand("insertHTML",!1,S),At(w),V("Nota S&T inserida!")):V("Copiado! Abra uma nota para colar.")},t}function Co(){let e="v3.7.0 (S&T Mode)",t="bau",o="pt",n=!1,s=!1,i=!1,a={input:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},textarea:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease",height:"100px",resize:"vertical"},h3:{fontSize:"14px",fontWeight:"600",color:"#202124",margin:"0 0 12px 0"},label:{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},checkboxLabel:{display:"flex",alignItems:"center",marginBottom:"10px",fontSize:"14px",fontWeight:"400",cursor:"pointer",padding:"8px",background:"#f8f9fa",borderRadius:"6px",transition:"background-color 0.2s ease, box-shadow 0.2s ease",userSelect:"none"},checkboxInput:{width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"},buttonBase:{flex:"1 1 0",padding:"10px 0",color:"#fff",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"500",cursor:"pointer",marginTop:"16px"},stepBlock:{borderTop:"1px solid #eee",paddingTop:"12px",marginTop:"12px"},radioContainer:{display:"flex",gap:"15px",marginBottom:"10px"},optionalBtn:{width:"100%",padding:"10px",background:"white",border:"1px dashed #1a73e8",color:"#1a73e8",borderRadius:"6px",cursor:"pointer",fontWeight:"500",fontSize:"13px",marginBottom:"10px",transition:"all 0.2s"},helpLink:{fontSize:"12px",color:"#1a73e8",textDecoration:"none",cursor:"pointer",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"color 0.2s"}},r=vo(),c=wo(()=>{let H=c.getCheckedElements().map(F=>F.value);y&&y.value&&r.updateVisibility(y.value,H)}),l=document.createElement("div");l.id="autofill-popup",l.classList.add("cw-module-window"),Object.assign(l.style,Te,{right:"100px",width:"450px",transition:"width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)"});let h={popup:l,googleLine:null},d=qe(l,"Case Notes",e,"Gera notas padronizadas.",h,()=>It());l.appendChild(d);let m=d.lastElementChild;if(m){let A=document.createElement("div");A.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',Object.assign(A.style,{width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease",marginLeft:"4px"}),A.title="Alternar para Split & Transfer",A.onmouseenter=()=>{A.style.background="rgba(255,255,255,0.1)",A.style.color="#FFF"},A.onmouseleave=()=>{i||(A.style.background="transparent",A.style.color="#9AA0A6")},A.onclick=H=>{H.stopPropagation(),L(A)},m.insertBefore(A,m.firstChild)}let p=document.createElement("div");Object.assign(p.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1"}),l.appendChild(p);let b=document.createElement("div");Object.assign(b.style,{flexGrow:"1",display:"none",overflow:"hidden"});let k=Ao(()=>L());b.appendChild(k),l.appendChild(b);function L(A){i=!i,i?(p.style.display="none",b.style.display="flex",h.googleLine&&(h.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)"),A&&(A.style.color="#C58AF9",A.style.background="rgba(197, 138, 249, 0.15)")):(p.style.display="block",b.style.display="none",h.googleLine&&(h.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"),A&&(A.style.color="#9AA0A6",A.style.background="transparent"))}let R=document.createElement("div");R.textContent="created by lucaste@",Object.assign(R.style,io),l.appendChild(R);let B=document.createElement("div");B.id="step-lang-type";let Y=document.createElement("label");Object.assign(Y.style,a.label),B.appendChild(Y);let se=document.createElement("div");Object.assign(se.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let x=document.createElement("div");x.textContent="Portugu\xEAs",x.classList.add("no-drag"),Object.assign(x.style,ye);let f=document.createElement("div");f.textContent="Espa\xF1ol",f.classList.add("no-drag"),Object.assign(f.style,ye),x.onclick=()=>Tt("pt"),f.onclick=()=>Tt("es"),se.appendChild(x),se.appendChild(f),B.appendChild(se),p.appendChild(B);let u=document.createElement("div");u.id="step-0-case-type";let C=document.createElement("label");Object.assign(C.style,a.label),u.appendChild(C);let v=document.createElement("div");Object.assign(v.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let T=document.createElement("div");T.textContent="BAU",T.classList.add("no-drag"),Object.assign(T.style,ye);let D=document.createElement("div");D.textContent="LM",D.classList.add("no-drag"),Object.assign(D.style,ye),T.onclick=()=>Et("bau"),D.onclick=()=>Et("lm"),v.appendChild(T),v.appendChild(D),u.appendChild(v),p.appendChild(u);let O=document.createElement("div");O.id="step-1-selection";let I=document.createElement("label");I.className="cw-input-label",I.textContent="Status Principal";let P=document.createElement("select");P.id="main-status",P.className="cw-select",P.innerHTML=`
      <option value="" disabled selected hidden>Selecione uma op\xE7\xE3o...</option>
      <option value="NI">NI - Need Info</option>
      <option value="SO">SO - Solution Offered</option>
      <option value="IN">IN - Inactive</option>
      <option value="AS">AS - Assigned</option>
      <option value="DC">DC - Discard</option>
  `;let g=document.createElement("div");g.style.cssText="display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; margin-bottom: 6px;";let S=document.createElement("label");S.className="cw-input-label",S.textContent="Sub-status",S.style.marginBottom="0";let w=document.createElement("a");w.href="https://seu-link-do-guia-aqui.com",w.target="_blank",w.className="cw-info-link",w.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; transform:translateY(1px)"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Guia de Substatus',Object.assign(w.style,a.helpLink),g.appendChild(S),g.appendChild(w);let y=document.createElement("select");y.id="sub-status",y.className="cw-select",y.disabled=!0,y.innerHTML='<option value="" disabled selected hidden>Aguardando status principal...</option>',O.appendChild(I),O.appendChild(P),O.appendChild(g),O.appendChild(y),p.appendChild(O);let E=document.createElement("div");E.id="step-1-1-portugal",Object.assign(E.style,a.stepBlock,{display:"none"});let _=document.createElement("label");Object.assign(_.style,a.label),E.appendChild(_);let $=document.createElement("div");Object.assign($.style,a.radioContainer);let M=document.createElement("div");Object.assign(M.style,{display:"flex",alignItems:"center"});let N=document.createElement("input");N.type="radio",N.name="portugal-group",N.value="sim",Object.assign(N.style,a.checkboxInput);let G=document.createElement("label");G.htmlFor="portugal-sim",Object.assign(G.style,{cursor:"pointer"}),M.appendChild(N),M.appendChild(G);let U=document.createElement("div");Object.assign(U.style,{display:"flex",alignItems:"center"});let q=document.createElement("input");q.type="radio",q.name="portugal-group",q.value="nao",q.checked=!0,Object.assign(q.style,a.checkboxInput);let j=document.createElement("label");j.htmlFor="portugal-nao",Object.assign(j.style,{cursor:"pointer"}),U.appendChild(q),U.appendChild(j),$.appendChild(M),$.appendChild(U),E.appendChild($),p.appendChild(E);function de(A){n=A,A?ne.style.display="block":ne.style.display="none"}N.onchange=()=>de(!0),q.onchange=()=>de(!1);let ne=document.createElement("div");ne.id="step-1-2-consent",Object.assign(ne.style,a.stepBlock,{display:"none"});let ae=document.createElement("label");Object.assign(ae.style,a.label),ne.appendChild(ae);let ce=document.createElement("div");Object.assign(ce.style,a.radioContainer);let fe=document.createElement("div");Object.assign(fe.style,{display:"flex",alignItems:"center"});let Se=document.createElement("input");Se.type="radio",Se.name="consent-group",Se.value="Sim",Se.checked=!0,Object.assign(Se.style,a.checkboxInput);let Ne=document.createElement("label");Ne.htmlFor="consent-sim",Object.assign(Ne.style,{cursor:"pointer"}),fe.appendChild(Se),fe.appendChild(Ne);let tt=document.createElement("div");Object.assign(tt.style,{display:"flex",alignItems:"center"});let De=document.createElement("input");De.type="radio",De.name="consent-group",De.value="N\xE3o",Object.assign(De.style,a.checkboxInput);let ut=document.createElement("label");ut.htmlFor="consent-nao",Object.assign(ut.style,{cursor:"pointer"}),tt.appendChild(De),tt.appendChild(ut),ce.appendChild(fe),ce.appendChild(tt),ne.appendChild(ce),p.appendChild(ne);let Pe=document.createElement("div");Pe.id="step-1-5-snippets",Object.assign(Pe.style,a.stepBlock,{display:"none"});let mt=document.createElement("h3");Object.assign(mt.style,a.h3),mt.textContent="Cen\xE1rios Comuns";let Ee=ho(A=>{let H=document.querySelector("textarea");H&&(H.value=A,H.dispatchEvent(new Event("input")),H.style.transition="background-color 0.2s",H.style.backgroundColor="#e8f0fe",setTimeout(()=>H.style.backgroundColor="#fff",300))});Ee.id="snippet-container",Pe.appendChild(mt),Pe.appendChild(Ee),p.appendChild(Pe);let Ae=document.createElement("div");Ae.id="step-3-form",Object.assign(Ae.style,a.stepBlock,{display:"none"});let St=document.createElement("h3");Object.assign(St.style,a.h3),Ae.appendChild(St);let Ge=document.createElement("div");Ge.id="dynamic-form-fields-container",Ae.appendChild(Ge);let he=document.createElement("button");he.textContent="+ Gostaria de selecionar uma task?",Object.assign(he.style,a.optionalBtn),he.onmouseover=()=>he.style.background="#e8f0fe",he.onmouseout=()=>he.style.background="white",he.onclick=()=>{he.style.display="none",je.style.display="block",c.selectionElement.style.display="block"};let je=document.createElement("h3");Object.assign(je.style,a.h3,{marginTop:"20px"});let Vt=c.selectionElement;Object.assign(Vt.style,{marginBottom:"20px"}),Ae.appendChild(he),Ae.appendChild(je),Ae.appendChild(Vt),Ae.appendChild(r.element),Ae.appendChild(c.screenshotsElement),p.appendChild(Ae);let He=document.createElement("div");He.id="step-4-email",Object.assign(He.style,{display:"none",marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #eee"});let Ve=document.createElement("label");Ve.style.display="flex",Ve.style.alignItems="center",Ve.style.cursor="pointer",Ve.style.fontSize="14px";let $e=document.createElement("input");$e.type="checkbox",$e.checked=!0,Object.assign($e.style,a.checkboxInput),Ve.appendChild($e),Ve.appendChild(document.createTextNode("Preencher email automaticamente?")),He.appendChild(Ve),p.appendChild(He);let Qe=document.createElement("div");Object.assign(Qe.style,{display:"none",gap:"8px",padding:"0"}),p.appendChild(Qe);let ot=document.createElement("button");Object.assign(ot.style,a.buttonBase,{backgroundColor:"#5f6368"}),ot.textContent="Copiar";let nt=document.createElement("button");Object.assign(nt.style,a.buttonBase,{backgroundColor:"#1a73e8"}),nt.textContent="Preencher",Qe.appendChild(ot),Qe.appendChild(nt);let at=document.createElement("div");Object.assign(at.style,Ze),at.className="no-drag",at.title="Redimensionar",l.appendChild(at),Je(l,at),document.body.appendChild(l);function Et(A){t=A;let H=st();Object.assign(T.style,ye),Object.assign(D.style,ye),A==="bau"?(Object.assign(T.style,H),w.href="https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657"):(Object.assign(D.style,H),w.href="https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243"),y.value&&y.dispatchEvent(new Event("change"))}function Z(A){try{if(Le&&Le[o]&&Le[o][A])return Le[o][A];if(Le&&Le.pt&&Le.pt[A])return Le.pt[A]}catch{}return A}function No(){Y.textContent=Z("idioma"),C.textContent=Z("fluxo"),I.textContent=Z("status_principal"),S.textContent=Z("substatus"),mt.textContent=Z("cenarios_comuns"),je.textContent=Z("selecione_tasks"),St.textContent=Z("preencha_detalhes"),ot.textContent=Z("copiar"),nt.textContent=Z("preencher"),P.querySelector('option[value=""]')&&(P.querySelector('option[value=""]').textContent=Z("select_status")),y.querySelector('option[value=""]')&&(y.querySelector('option[value=""]').textContent=Z("select_substatus")),_.textContent=Z("caso_portugal"),G.textContent=Z("sim"),j.textContent=Z("nao"),ae.textContent=Z("consentiu_gravacao"),Ne.textContent=Z("sim"),ut.textContent=Z("nao"),Ge.querySelectorAll("label").forEach(A=>{let H=A.nextElementSibling.id.replace("field-",""),F=Z(H.toLowerCase());F!==H.toLowerCase()?A.textContent=F:A.textContent=H.replace(/_/g," ").replace(/\b\w/g,K=>K.toUpperCase())+":"}),he.textContent="+ "+(o==="pt"?"Gostaria de selecionar uma task?":"Quisiera seleccionar una tarea?")}function Tt(A){o=A;let H=st();Object.assign(x.style,ye),Object.assign(f.style,ye),A==="pt"?(Object.assign(x.style,H),E.style.display="block",de(n)):(Object.assign(f.style,H),E.style.display="none",ne.style.display="none"),No(),y.value&&y.dispatchEvent(new Event("change"))}function kt(A){(A.value.trim()===""||A.value.trim()==="\u2022")&&(A.value="\u2022 "),A.onkeydown=function(H){if(H.key==="Enter"){H.preventDefault();let F=this.selectionStart,K=this.selectionEnd,re=this.value,me=re.lastIndexOf(`
`,F-1)+1,Ce=re.substring(me,F),ge=Ce.trim()==="\u2022"||Ce.trim()===""?`
`:`
\u2022 `;this.value=re.substring(0,F)+ge+re.substring(K),this.selectionStart=this.selectionEnd=F+ge.length}else if(H.key==="Backspace"){let F=this.selectionStart;if(F===this.selectionEnd&&F>0){let K=this.value.substring(0,F);K.endsWith(`
\u2022 `)?(H.preventDefault(),this.value=K.substring(0,F-3)+this.value.substring(this.selectionEnd),this.selectionStart=this.selectionEnd=F-3):K==="\u2022 "&&(H.preventDefault(),this.value="",this.selectionStart=this.selectionEnd=0)}}}}function Ot(){let A=typeof Ee<"u"?Ee:document.getElementById("snippet-container");if(!A)return;let H=A.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'),F={},K=new Set;H.forEach(ie=>{let oe=ie.id,W=ke[oe];if(W)for(let z in W)z==="linkedTask"?K.add(W.linkedTask):z!=="type"&&(F[z]||(F[z]=[]),F[z].includes(W[z])||F[z].push(W[z]))});let re=new Set;Object.values(ke).forEach(ie=>{Object.keys(ie).forEach(oe=>{oe!=="linkedTask"&&oe!=="type"&&re.add(oe)})}),re.forEach(ie=>{let oe=document.getElementById(ie);if(oe){let W=F[ie]||[],z="";ct.includes(ie.replace("field-",""))?(z=W.map(ee=>ee.startsWith("\u2022 ")?ee:"\u2022 "+ee).join(`
`),z===""?z="\u2022 ":z.endsWith(`
\u2022 `)||(z+=`
\u2022 `)):z=W.join(`

`),z.trim()!=="\u2022"&&z.trim()!==""?oe.value=z:ct.includes(ie.replace("field-",""))?oe.value="\u2022 ":oe.value="",oe.tagName==="TEXTAREA"&&typeof kt=="function"&&kt(oe)}});let me=new Set,Ce=new Set;A.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(ie=>{let oe=ke[ie.id];oe&&oe.linkedTask&&(ie.checked?me.add(oe.linkedTask):Ce.add(oe.linkedTask))}),Ce.forEach(ie=>{me.has(ie)||c.toggleTask(ie,!1)}),me.forEach(ie=>{c.toggleTask(ie,!0)})}P.onchange=()=>{let A=P.value;if(qt(1.5),y.innerHTML=`<option value="">${Z("select_substatus")}</option>`,!A){y.disabled=!0;return}for(let H in lt){let F=lt[H];if(F.status===A){let K=document.createElement("option");K.value=H,K.textContent=F.name,y.appendChild(K)}}y.disabled=!1},y.onchange=()=>{let A=y.value;if(qt(1.5),!A)return;c.updateSubStatus(A);let H=lt[A];Ee.innerHTML="";let F=(W,z,ee)=>{let ue=document.createElement("label");Object.assign(ue.style,a.checkboxLabel),ue.onmouseover=()=>ue.style.backgroundColor="#e8eaed",ue.onmouseout=()=>ue.style.backgroundColor="#f8f9fa";let le=document.createElement("input");return le.type=z,le.id=W.id,Object.assign(le.style,a.checkboxInput),ue.appendChild(le),ue.appendChild(document.createTextNode(` ${W.text}`)),ee.appendChild(ue),le},K=[],re="radio";if(A==="NI_Awaiting_Inputs")K=[{id:"quickfill-ni-inicio-manual",text:"In\xEDcio 2/6 (Manual)"},{id:"quickfill-ni-cms-access",text:"In\xEDcio 2/6 (ADV sem acesso ao CMS)"},{id:"quickfill-ni-followup-bau",text:"Follow-up 2/6 (BAU)"},{id:"quickfill-ni-followup-lm",text:"Follow-up 2/6 (LM)"}];else if(A.startsWith("SO_"))re="checkbox",K=[{id:"quickfill-gtm-install",text:"Instala\xE7\xE3o do GTM"},{id:"quickfill-whatsapp",text:"Convers\xE3o de WhatsApp"},{id:"quickfill-form",text:"Convers\xE3o de Formul\xE1rio (Padr\xE3o)"},{id:"quickfill-ecw4-close",text:"Fechamento ECW4 (P\xF3s 7 dias)"},{id:"quickfill-ga4-event-close",text:"Fechamento GA4 (P\xF3s 2 dias)"}];else if(A.startsWith("AS_")){re="checkbox";let W=document.createElement("label");W.textContent=Z("cenarios_comuns"),Object.assign(W.style,a.label),Ee.appendChild(W),K=[{id:"quickfill-as-no-show",text:"Anunciante n\xE3o compareceu (respondeu e-mail)"},{id:"quickfill-as-insufficient-time",text:"Tempo insuficiente"},{id:"quickfill-as-no-access",text:"Anunciante sem acessos necess\xE1rios"}]}else A.startsWith("IN_")?K=[{id:"quickfill-in-nrp-bau",text:"NRP (BAU - 3 tentativas)"},{id:"quickfill-in-nrp-lm",text:"NRP (LM - Sem tentativas)"},{id:"quickfill-in-no-show-bau",text:"No-Show (BAU - 3 tentativas)"},{id:"quickfill-in-2-6-final",text:"Finaliza\xE7\xE3o 2/6 (Sem Resposta)"},{id:"quickfill-in-manual",text:"Outro (Manual)"}]:A.startsWith("DC_")?(re="radio",K=[{id:"quickfill-dc-lm-no-access",text:"LM - Sem acessos (Reagendar em BAU)"}]):A==="NI_Attempted_Contact"?(re="radio",K=[{id:"quickfill-ni-attempted-2day",text:"2 Day Rule (2 Liga\xE7\xF5es + Chat AM)"}]):A==="NI_Awaiting_Validation"&&(re="checkbox",K=[{id:"quickfill-ni-awaiting-ecw4",text:"ECW4 (Acompanhar)"},{id:"quickfill-ni-awaiting-ga4",text:"GA4 Event Tracking (Acompanhar)"}]);let me=K.filter(W=>{let z=ke[W.id];return!z.type||z.type==="all"||z.type===t});me.forEach((W,z)=>{let ee=F(W,re,Ee);re==="radio"&&(ee.name="scenario-radio-group",z===0&&(ee.checked=!0))}),me.length>0&&(Pe.style.display="block"),H.requiresTasks?(he.style.display="none",je.style.display="block",c.selectionElement.style.display="block"):(he.style.display="block",je.style.display="none",c.selectionElement.style.display="none"),Ge.innerHTML="";let Ce=H.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(Ce)].forEach(W=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(W))return;let z=W.slice(1,-1),ee=document.createElement("label"),ue=Z(z.toLowerCase());if(ee.textContent=ue!==z.toLowerCase()?ue:z.replace(/_/g," ").replace(/\b\w/g,Q=>Q.toUpperCase())+":",Object.assign(ee.style,a.label),z==="SPEAKEASY_ID"){let Q=document.createElement("button");Q.innerHTML='<span style="font-size:12px; margin-right:4px;">\u2728</span>Auto Busca',Q.style.cssText=`
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
          `,Q.title="Localizar Speakeasy ID no hist\xF3rico",Q.onmouseover=()=>{Q.style.backgroundColor="#c2e7ff",Q.style.boxShadow="0 1px 2px rgba(0,0,0,0.1)"},Q.onmouseout=()=>{Q.style.backgroundColor="#d3e3fd",Q.style.boxShadow="none"},Q.onmousedown=()=>{Q.style.backgroundColor="#a8c7fa",Q.style.transform="scale(0.96)"},Q.onmouseup=()=>Q.style.transform="scale(1)",Q.onclick=xe=>{xe.preventDefault(),co(`field-${z}`)},ee.appendChild(Q)}let le;ct.includes(z)?(le=document.createElement("textarea"),Object.assign(le.style,a.textarea),le.classList.add("bullet-textarea"),kt(le)):Rt.includes(z)?(le=document.createElement("textarea"),Object.assign(le.style,a.textarea)):(le=document.createElement("input"),le.type="text",Object.assign(le.style,a.input),z==="REASON_COMMENTS"&&(A.startsWith("NI_")||A.startsWith("IN_"))&&(Object.assign(ee.style,{display:"none"}),Object.assign(le.style,{display:"none"}))),z==="ON_CALL"&&t==="lm"&&(Object.assign(ee.style,{display:"none"}),Object.assign(le.style,{display:"none"}),le.value="N/A"),le.id=`field-${z}`,Ge.appendChild(ee),Ge.appendChild(le)});let ie=Ee.querySelectorAll('input[type="checkbox"], input[type="radio"]');ie.length>0&&(ie.forEach(W=>{W.removeEventListener("change",Ot),W.addEventListener("change",Ot)}),Ot()),Ae.style.display="block",Ye[A]?He.style.display="block":He.style.display="none",Qe.style.display="flex";let oe=c.getCheckedElements().map(W=>W.value);r.updateVisibility(A,oe)},he.onclick=()=>{he.style.display="none",je.style.display="block",c.selectionElement.style.display="block"};function $t(){let A=y.value;if(!A)return null;let F=lt[A].template.replace(/\n/g,"<br>"),K='style="margin-bottom: 12px; padding-left: 30px;"',re=[],me="",Ce=c.getCheckedElements();Ce.length>0&&Ce.forEach(oe=>{let W=oe.value,z=ze[W],ee=oe.closest().querySelector(".stepper-count"),ue=ee?parseInt(ee.textContent):1;ue>1?re.push(`${z.name} (x${ue})`):re.push(z.name)});let ge=c.screenshotsElement;if(ge){let oe=Array.from(ge.querySelectorAll('input[id^="name-"]'));oe.length>0&&oe.forEach(W=>{let z=W.value,ee=W.closest(".cw-screen-card");if(ee){let ue=ee.querySelectorAll('input[id^="screen-"]'),le=!1,Q="";ue.forEach(xe=>{let Ut=xe.closest(".cw-input-group"),Wt=Ut?Ut.querySelector(".cw-input-label"):null,Fo=Wt?Wt.textContent:"Evid\xEAncia",Yt=xe.value.trim(),Mo=Yt?` ${Yt}`:"";Q+=`<li>${Fo} -${Mo}</li>`,le=!0}),le&&(me+=`<b>${z}</b>`,me+=`<ul ${K}>${Q}</ul>`)}})}if(F.includes("{TAGS_IMPLEMENTED}")?F=F.replace(/{TAGS_IMPLEMENTED}/g,re.join(", ")||"N/A"):re.length>0&&(F+=`<br><b>Tags:</b> ${re.join(", ")}<br>`),F.includes("{SCREENSHOTS_LIST}")?F=F.replace(/{SCREENSHOTS_LIST}/g,me?`${me}`:"N/A"):me!==""&&(F+=`<br>${me}`),o==="pt"&&n){let oe=Se.checked?Z("sim"):Z("nao");F=F.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${Z("consentiu_gravacao")}</b> ${oe}<br><br>`),F=F.replace(/{CASO_PORTUGAL}/g,`<br><b>${Z("caso_portugal")}</b> ${Z("sim")}<br>`)}else o==="pt"&&!n?(F=F.replace(/{CASO_PORTUGAL}/g,`<br><b>${Z("caso_portugal")}</b> ${Z("nao")}<br>`),F=F.replace(/{CONSENTIU_GRAVACAO}/g,"")):(F=F.replace(/{CASO_PORTUGAL}/g,""),F=F.replace(/{CONSENTIU_GRAVACAO}/g,""));return Ge.querySelectorAll("input, textarea").forEach(oe=>{let W=oe.id.replace("field-",""),z=new RegExp(`{${W}}`,"g"),ee=oe.value;if(W==="REASON_COMMENTS"&&(A.startsWith("NI_")||A.startsWith("IN_"))){let Q=Ee.querySelector('input[type="radio"]:checked');Q&&ke[Q.id]&&(ee=ke[Q.id]["field-REASON_COMMENTS"])}if(ct.includes(W)&&ee.trim()!==""){let Q=ee.split(`
`).map(xe=>xe.trim()).filter(xe=>xe!==""&&xe!=="\u2022").map(xe=>xe.startsWith("\u2022 ")?xe.substring(2):xe).map(xe=>`<li>${xe}</li>`).join("");ee=Q?`<ul ${K}>${Q}</ul>`:""}else Rt.includes(W)?ee=ee.split(`
`).filter(Q=>Q.trim()!=="").map(Q=>`<p style="margin: 0 0 8px 0;">${Q}</p>`).join(""):oe.tagName==="TEXTAREA"&&(ee=ee.replace(/\n/g,"<br>"));let ue=ee.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(ue===""||ue==="\u2022"||ue.toLowerCase()==="n/a"){let Q=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${W}\\}(?:<br>\\s*)?`,"gi");Q.test(F)?F=F.replace(Q,""):F=F.replace(z,"")}else F=F.replace(z,ee.replace(/\$/g,"$$$$"))}),F=F.replace(/{([A-Z0-9_]+)}/g,""),F=F.replace(/(<br>){3,}/g,"<br><br>"),typeof r<"u"&&r.getOutput&&(F+=r.getOutput()),F}ot.onclick=()=>{let A=$t();A?(dt(A),V(Z("copiado_sucesso"))):V(Z("selecione_substatus"),{error:!0})},nt.onclick=async()=>{let A=y.value,H=$t();if(!H){V(Z("selecione_substatus"),{error:!0});return}dt(H),It();let F=vt(),K=await Ct();if(K)try{if(K.focus(),K.innerHTML.trim()==="<p><br></p>"||K.innerHTML.trim()==="<br>"||K.innerText.trim()===""){let ge=document.createRange();ge.selectNodeContents(K);let ie=window.getSelection();ie.removeAllRanges(),ie.addRange(ge),document.execCommand("delete",!1,null)}else if(!K.innerHTML.endsWith("<br><br>")){let ge=document.createRange();ge.selectNodeContents(K),ge.collapse(!1);let ie=window.getSelection();ie.removeAllRanges(),ie.addRange(ge),document.execCommand("insertHTML",!1,"<br><br>")}document.execCommand("insertHTML",!1,H),At(K),setTimeout(()=>{V(Z("inserido_copiado"))},600);let me=typeof $e<"u"&&$e?$e.checked:!0;if(A&&Ye[A]&&me){let ge=Ye[A];await xt(ge),await new Promise(ie=>setTimeout(ie,500))}F(),qt(1.5),P.value="",y.innerHTML=`<option value="">${Z("select_substatus")}</option>`,y.disabled=!0}catch(re){console.error(re),V("Erro ao inserir.",{error:!0}),F()}};function qt(A=1.5){A<=1.5&&(Pe.style.display="none",Ee.innerHTML=""),A<=2&&(c.reset(),he.style.display="none"),A<=3&&(Ae.style.display="none",Ge.innerHTML="",r.reset(),Qe.style.display="none",He.style.display="none")}function It(){if(s=!s,s){let A=l.querySelector(".cw-expand-btn");A&&typeof A.resetState=="function"&&A.resetState()}Ie(s,l,"cw-btn-notes")}return Et("bau"),Tt("pt"),It}var Ke={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function So(){let e="v4.2.0 CR-Hybrid",t="CANNED_RESPONSES",o=Object.keys(Ke)[0],n="",s="list",i=!1,a={bgApp:"#F8F9FA",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.08)",borderFocus:"rgba(26, 115, 232, 0.4)",textPrimary:"#202124",textSecondary:"#5F6368",primary:"#1A73E8",primaryBg:"#E8F0FE",shadowCard:"0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",shadowHover:"0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",transition:"all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1)"},r={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:a.bgApp},c={display:"flex",width:"200%",height:"100%",transition:"transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",transform:"translateX(0)",willChange:"transform"},l={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},h={padding:"20px 24px 12px 24px",flexShrink:"0",background:a.bgApp,zIndex:"10",display:"flex",flexDirection:"column",gap:"16px",borderBottom:`1px solid ${a.borderSubtle}`},d={width:"100%",height:"44px",padding:"0 16px 0 48px",borderRadius:"12px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",fontWeight:"400",color:a.textPrimary,boxSizing:"border-box",outline:"none",transition:a.transition,boxShadow:"0 2px 5px rgba(0,0,0,0.03)",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%239AA0A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"16px center"},m={display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px",paddingBottom:"4px"},p={padding:"6px 14px",borderRadius:"100px",border:"1px solid #DADCE0",background:"#FFFFFF",color:a.textSecondary,fontSize:"13px",fontWeight:"500",letterSpacing:"0.3px",cursor:"pointer",transition:a.transition,flexShrink:"0",display:"flex",alignItems:"center",justifyContent:"center"},b={background:a.primaryBg,color:a.primary,borderColor:"transparent",fontWeight:"600",boxShadow:"0 1px 2px rgba(26, 115, 232, 0.15)"},k={padding:"16px 24px 80px 24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"12px"},L={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",height:"72px",minHeight:"72px",borderRadius:"16px",background:a.bgSurface,border:"1px solid transparent",boxShadow:a.shadowCard,cursor:"pointer",transition:"all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",position:"relative",overflow:"hidden"},R=document.createElement("div");R.id="quick-email-popup",R.classList.add("cw-module-window"),Object.assign(R.style,Te,{right:"100px",width:"440px",height:"640px",borderRadius:"20px",boxShadow:"0 24px 64px rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.4)"});let B={popup:R,googleLine:null,focusElement:null};function Y(){i=!i,Ie(i,R,"cw-btn-email"),i||setTimeout(()=>S(),300)}let se=qe(R,"Quick Email",e,"Templates & Automa\xE7\xF5es",B,()=>Y()),x=document.createElement("div");Object.assign(x.style,r);let f=document.createElement("div");Object.assign(f.style,c);let u=document.createElement("div");Object.assign(u.style,l);let C=document.createElement("div");Object.assign(C.style,h);let v=document.createElement("input");v.placeholder="Pesquisar templates...",Object.assign(v.style,d),v.onfocus=()=>{v.style.borderColor=a.primary,v.style.boxShadow="0 0 0 4px rgba(26, 115, 232, 0.15)",v.style.background="#fff"},v.onblur=()=>{v.style.borderColor="transparent",v.style.boxShadow="0 2px 5px rgba(0,0,0,0.03)",v.style.background="#fff"},B.focusElement=v;let T=document.createElement("div");Object.assign(T.style,m);let D=document.createElement("div");Object.assign(D.style,k),C.appendChild(v),C.appendChild(T),u.appendChild(C),u.appendChild(D);let O=document.createElement("div");Object.assign(O.style,l);let I=document.createElement("div");Object.assign(I.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),O.appendChild(I),f.appendChild(u),f.appendChild(O),x.appendChild(f),R.appendChild(se),R.appendChild(x),document.body.appendChild(R);async function P(_,$){try{i&&Y();let M=vt();await new Promise(N=>setTimeout(N,800)),$==="email"?await uo(_):$==="cr"&&await xt(_),M()}catch(M){console.error("\u274C Erro:",M);let N=document.querySelector(".cw-focus-backdrop");N&&N.classList.remove("active")}}function g(_){s="detail",f.style.transform="translateX(-50%)";let $='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',M='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';I.innerHTML=`
            <style>
                .cw-email-content p { margin: 0 0 8px 0; } /* Margem apenas embaixo */
                .cw-email-content ul { margin: 0 0 8px 16px; padding: 0; }
                .cw-email-content li { margin-bottom: 4px; }
            </style>

            <div style="position:sticky; top:0; background:rgba(255,255,255,0.9); backdrop-filter:blur(12px); border-bottom:1px solid #eee; padding:16px 24px; z-index:10; display:flex; align-items:center; gap:12px;">
                <button id="csa-back-btn" style="background:none; border:none; cursor:pointer; display:flex; color:#5f6368; padding:8px; margin-left:-12px; border-radius:50%; transition:background 0.2s;">${$}</button>
                <div style="font-weight:600; font-size:16px; color:#202124; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${_.name}</div>
            </div>
            
            <div style="padding:24px;">
                <div style="margin-bottom:24px;">
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Assunto</div>
                    <div style="font-size:14px; font-weight:500; color:#202124; padding:16px; background:#F8F9FA; border-radius:12px; border:1px solid #eee; box-shadow:inset 0 1px 2px rgba(0,0,0,0.02);">${_.subject}</div>
                </div>
                
                <div>
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Mensagem</div>
                    
                    <div class="cw-email-content" style="font-size:13px; color:#3c4043; line-height:1.5; white-space: normal; word-break: break-word; padding:0 4px;">
                        ${_.body}
                    </div>
                </div>
            </div>
            
            <div style="position:sticky; bottom:0; padding:24px; background:linear-gradient(to top, #fff 90%, rgba(255,255,255,0)); pointer-events:none;">
                <button id="csa-insert-btn" style="pointer-events:auto; width:100%; padding:14px; background:#1a73e8; color:white; border:none; border-radius:12px; font-size:14px; font-weight:600; cursor:pointer; display:flex; justify-content:center; align-items:center; gap:10px; box-shadow:0 4px 12px rgba(26,115,232,0.3); transition:transform 0.2s, box-shadow 0.2s;">
                    ${M} Usar Template
                </button>
            </div>
        `;let N=I.querySelector("#csa-back-btn");N.onmouseenter=()=>N.style.background="#f1f3f4",N.onmouseleave=()=>N.style.background="none",N.onclick=S;let G=I.querySelector("#csa-insert-btn");G.onmouseenter=()=>{G.style.transform="translateY(-1px)",G.style.boxShadow="0 6px 16px rgba(26,115,232,0.4)"},G.onmouseleave=()=>{G.style.transform="translateY(0)",G.style.boxShadow="0 4px 12px rgba(26,115,232,0.3)"},G.onclick=()=>{G.style.transform="scale(0.96)",P(_,"email"),setTimeout(()=>{G.style.transform="scale(1)",S()},300)}}function S(){s="list",f.style.transform="translateX(0)"}function w(_,$,M=null){let N=document.createElement("button"),G=M?`<span style="margin-right:6px; font-size:14px; opacity:0.9;">${M}</span>`:"";return N.innerHTML=`${G}${_}`,Object.assign(N.style,p),o===$&&n===""?Object.assign(N.style,b):(N.onmouseenter=()=>{N.style.background="#F1F3F4",N.style.borderColor="#DADCE0"},N.onmouseleave=()=>{N.style.background="#FFFFFF",N.style.borderColor="#DADCE0"}),N.onclick=()=>{o=$,n="",v.value="",y(),E()},N}function y(){T.innerHTML="",T.appendChild(w("Smart CRs",t,"\u26A1")),Object.keys(Ke).forEach(_=>{T.appendChild(w(Ke[_].title,_))})}function E(){D.innerHTML="";let _=[];if(n.trim()!==""){let U=n.toLowerCase();Object.values(Ke).forEach(q=>{q.emails.forEach(j=>{(j.name.toLowerCase().includes(U)||j.subject.toLowerCase().includes(U))&&_.push({type:"email",data:j})})}),Object.entries(Ye).forEach(([q,j])=>{if(!j)return;(q.replace(/_/g," ").toLowerCase().includes(U)||j.toLowerCase().includes(U))&&_.push({type:"cr",key:q,code:j})})}else o===t?Object.entries(Ye).forEach(([U,q])=>{q&&_.push({type:"cr",key:U,code:q})}):Ke[o]&&Ke[o].emails.forEach(U=>{_.push({type:"email",data:U})});if(_.length===0){D.innerHTML=`
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F50D}</div>
                    <div style="font-size:14px; font-weight:500;">Nenhum template encontrado</div>
                    <div style="font-size:12px; margin-top:4px;">Tente outro termo de busca</div>
                </div>`;return}let M='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1967D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',N='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA8600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',G='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BDC1C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';_.forEach(U=>{let q=document.createElement("div");if(Object.assign(q.style,L),U.type==="email"){let j=U.data,de=j.subject.length>45?j.subject.substring(0,45)+"...":j.subject;q.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#E8F0FE; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${M}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${j.name}</div>
                        <div style="font-size:12px; color:#5F6368; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${de}</div>
                    </div>
                    <div style="margin-left:12px; opacity:0.6;">${G}</div>
                `,q.onclick=()=>g(j)}else{let j=U.key.replace(/_/g," ").replace("AS ","AS - ").replace("NI ","NI - ");q.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#FEF7E0; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${N}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; margin-bottom:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${j}</div>
                        <div style="font-size:11px; font-weight:500; color:#EA8600; font-family:'Roboto Mono', monospace; letter-spacing:-0.2px;">${U.code}</div>
                    </div>
                    <div style="font-size:10px; font-weight:700; color:#DADCE0; text-transform:uppercase; letter-spacing:0.5px; border:1px solid #F1F3F4; padding:4px 8px; border-radius:6px; margin-left:12px;">Inserir</div>
                `,q.onclick=()=>{q.style.transform="scale(0.98)",q.style.background="#FEF7E0",setTimeout(()=>{q.style.transform="scale(1)",q.style.background="#fff",P(U.code,"cr")},150)}}q.onmouseenter=()=>{q.style.transform="translateY(-2px)",q.style.boxShadow=a.shadowHover,U.type==="cr"?q.style.borderLeft="3px solid #Fbbc04":q.style.borderLeft="3px solid #1a73e8"},q.onmouseleave=()=>{q.style.transform="translateY(0)",q.style.boxShadow=a.shadowCard,q.style.borderLeft="1px solid transparent"},D.appendChild(q)})}return v.addEventListener("input",_=>{n=_.target.value,n!==""?Array.from(T.children).forEach($=>{Object.assign($.style,p),$.style.opacity="0.6"}):y(),E()}),y(),E(),Y}var Eo={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function To(){let e="v2.1 (Apple Motion)",t={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#f8f9fa",scrollBehavior:"smooth"},card:{background:"#ffffff",border:"1px solid #dadce0",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"13px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"10px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.15s ease, opacity 0.3s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.5",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"20px",height:"20px",borderRadius:"6px",border:"2px solid #dadce0",marginRight:"14px",marginTop:"1px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #eee",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"}},o={},n="PT",s="BAU",i=!1,a=document.createElement("div");a.id="call-script-popup",a.classList.add("cw-module-window"),Object.assign(a.style,Te,{right:"auto",left:"50%",width:"400px",height:"650px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let r={popup:a,googleLine:null};function c(){i=!i,Ie(i,a,"cw-btn-script")}let l=qe(a,"Call Script",e,"Guia interativo para condu\xE7\xE3o de chamadas.",r,()=>{c()});a.appendChild(l);let h=document.createElement("div");Object.assign(h.style,t.progressBarContainer);let d=document.createElement("div");Object.assign(d.style,t.progressBarFill),h.appendChild(d),a.appendChild(h);let m=document.createElement("div");m.id="csa-content",Object.assign(m.style,t.contentArea),a.appendChild(m);let p=document.createElement("div");Object.assign(p.style,t.footer);let b=document.createElement("span");b.textContent="by lucaste@",Object.assign(b.style,{fontSize:"10px",color:"#bdc1c6"});let k=document.createElement("button");k.innerHTML=`
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
    Resetar Script
  `,Object.assign(k.style,t.resetBtn),k.onmouseenter=()=>k.style.background="#fce8e6",k.onmouseleave=()=>k.style.background="transparent",k.onclick=()=>{k.style.transform="scale(0.9)",setTimeout(()=>k.style.transform="scale(1)",150);for(let O in o)delete o[O];C()},p.appendChild(b),p.appendChild(k),a.appendChild(p);let L=document.createElement("div");Object.assign(L.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let R=document.createElement("div");Object.assign(R.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let B=document.createElement("div");B.textContent="BAU";let Y=document.createElement("div");Y.textContent="LT",Object.assign(B.style,ye),Object.assign(Y.style,ye),R.appendChild(B),R.appendChild(Y);let se=document.createElement("select");Object.assign(se.style,ao,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),se.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',se.value=n,L.appendChild(R),L.appendChild(se),m.appendChild(L);let x=document.createElement("div");x.id="csa-checklist-area",m.appendChild(x);let f=document.createElement("div");Object.assign(f.style,Ze),f.className="no-drag",f.title="Redimensionar",a.appendChild(f),Je(a,f),document.body.appendChild(a);function u(O){return O}function C(){x.innerHTML="";let O=`${n} ${s}`,I=Eo[O];if(!I){x.innerHTML=`<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <div style="font-size: 24px;">\u2615</div>
        <div>Script n\xE3o configurado.</div>
      </div>`,d.style.width="0%";return}let P=I.color||"#1a73e8",g=0,S=0;["inicio","fim"].forEach(w=>{I[w]&&(g+=I[w].length)}),["inicio","fim"].forEach((w,y)=>{let E=I[w];if(!E||E.length===0)return;let _=document.createElement("div");Object.assign(_.style,t.card);let $=document.createElement("div");Object.assign($.style,t.cardTitle);let M=w==="inicio"?"Abertura":"Fechamento";n.includes("ES")&&(M=w==="inicio"?"Apertura":"Cierre"),n.includes("EN")&&(M=w==="inicio"?"Opening":"Closing"),$.textContent=M;let N=document.createElement("span");N.style.fontSize="11px",N.style.opacity="0.7",N.style.fontWeight="500",N.style.background="#f1f3f4",N.style.padding="2px 8px",N.style.borderRadius="10px",$.appendChild(N),_.appendChild($);let G=0;E.forEach((U,q)=>{let j=`${O}-${w}-${q}`,de=!!o[j];de&&(S++,G++);let ne=document.createElement("div");Object.assign(ne.style,t.itemRow);let ae=document.createElement("div");Object.assign(ae.style,t.checkbox);let ce=document.createElement("span");ce.innerHTML=U,ce.style.flex="1",de?(Object.assign(ne.style,t.itemCompleted),ae.style.background=P,ae.style.borderColor=P,ae.style.transform="scale(1)",ae.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ne.style.textDecoration="none",ne.style.opacity="1",ae.style.background="transparent",ae.style.borderColor="#dadce0",ae.style.transform="scale(1)",ae.innerHTML=""),ne.onclick=()=>{let fe=!o[j];o[j]=fe,te.playClick(),fe?(ae.style.transform="scale(1.2)",setTimeout(()=>ae.style.transform="scale(1)",150),Object.assign(ne.style,t.itemCompleted),ae.style.background=P,ae.style.borderColor=P,ae.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ne.style.textDecoration="none",ne.style.opacity="1",ae.style.background="transparent",ae.style.borderColor="#dadce0",ae.innerHTML=""),v(O,I)},ne.onmouseenter=()=>{o[j]||(ne.style.background="#f1f3f4",ae.style.borderColor=P)},ne.onmouseleave=()=>{o[j]||(ne.style.background="transparent",ae.style.borderColor="#dadce0")},ne.appendChild(ae),ne.appendChild(ce),_.appendChild(ne)}),G===E.length&&E.length>0&&(N.style.color="#1e8e3e",N.style.background="#e6f4ea",_.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),N.textContent=`${G}/${E.length}`,x.appendChild(_)}),T(g,S)}function v(O,I){let P=0,g=0;["inicio","fim"].forEach(S=>{let w=I[S]||[];P+=w.length;let y=0;w.forEach((E,_)=>{o[`${O}-${S}-${_}`]&&(g++,y++)})}),T(P,g),setTimeout(()=>C(),200)}function T(O,I){let P=O===0?0:I/O*100;d.style.width=`${P}%`,P===100?d.style.background="#34A853":d.style.background="linear-gradient(90deg, #4285F4, #34A853)"}function D(O){s=O;let I=st();Object.assign(B.style,ye),Object.assign(Y.style,ye),Object.assign(O==="BAU"?B.style:Y.style,I),C()}return B.onclick=()=>D("BAU"),Y.onclick=()=>D("LT"),se.addEventListener("change",O=>{n=O.target.value,C()}),D(s),c}var pt={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"}]}},Re={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},jt="cw_link_history_v3";function ko(e,t){let o=JSON.parse(localStorage.getItem(jt)||"[]");o=o.filter(n=>n.url!==e.url),o.unshift({...e,_originalCat:t}),o=o.slice(0,3),localStorage.setItem(jt,JSON.stringify(o))}function Oo(){return JSON.parse(localStorage.getItem(jt)||"[]")}function qo(){let e="v4.0 (Nav Rail)",t="",o=!1,n=null,s={bgApp:"#F8F9FA",bgSidebar:"#F0F3F8",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",primary:"#1A73E8",primaryBg:"#E8F0FE",borderSubtle:"rgba(0,0,0,0.08)"},i=document.createElement("div");i.id="links-popup",i.classList.add("cw-module-window"),Object.assign(i.style,Te,{right:"100px",width:"580px",height:"650px",background:s.bgApp,overflow:"hidden"});let r=qe(i,"Central de Links",e,"Navegue pelas categorias laterais para acesso r\xE1pido.",{popup:i,googleLine:null},()=>se());i.appendChild(r);let c=document.createElement("div");c.style.cssText="display: flex; height: calc(100% - 56px); width: 100%; position: relative;",i.appendChild(c);let l=document.createElement("div");l.style.cssText=`
      width: 80px; flex-shrink: 0; background: ${s.bgSidebar};
      border-right: 1px solid ${s.borderSubtle};
      display: flex; flexDirection: column; align-items: center;
      padding: 16px 0; overflow-y: auto; gap: 4px;
      scrollbar-width: none;
  `,c.appendChild(l);let h=document.createElement("div");h.style.cssText="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F8F9FA; position: relative;",c.appendChild(h);let d=document.createElement("div");d.style.cssText="padding: 16px 24px; flex-shrink: 0; border-bottom: 1px solid rgba(0,0,0,0.04); background: #FFF;";let m=document.createElement("input");m.type="text",m.placeholder="Buscar link, SOP ou ferramenta...",m.style.cssText=`
      width: 100%; height: 40px; padding: 0 16px 0 42px;
      border-radius: 12px; border: 1px solid ${s.borderSubtle};
      background: #F1F3F4; font-size: 14px; color: ${s.textPrimary};
      outline: none; transition: all 0.2s;
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
      background-repeat: no-repeat; background-position: 14px center;
  `,m.onfocus=()=>{m.style.background="#FFF",m.style.boxShadow="0 2px 8px rgba(0,0,0,0.05)",m.style.borderColor="transparent"},m.onblur=()=>{m.style.background="#F1F3F4",m.style.boxShadow="none",m.style.borderColor=s.borderSubtle},d.appendChild(m),h.appendChild(d);let p=document.createElement("div");p.style.cssText="flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth;",h.appendChild(p);function b(){l.innerHTML="";let x=k("history","Recentes",Re.history),f=document.createElement("div");f.style.cssText="width: 40px; height: 1px; background: rgba(0,0,0,0.06); margin: 8px 0;",l.appendChild(x),l.appendChild(f),Object.keys(pt).forEach(u=>{let C=pt[u],v=k(u,C.label,Re[u]);l.appendChild(v)})}function k(x,f,u){let C=document.createElement("div");C.style.cssText=`
          width: 64px; height: 56px; border-radius: 12px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; color: ${s.textSecondary}; 
          transition: all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1);
          margin-bottom: 4px; position: relative;
      `,C.title=f,C.dataset.key=x;let v=document.createElement("div");v.style.cssText="width: 24px; height: 24px; margin-bottom: 4px; transition: transform 0.2s;",v.innerHTML=u||Re.tasks;let T=document.createElement("div");return T.style.cssText="font-size: 10px; font-weight: 500; opacity: 0.8;",T.textContent=f,C.appendChild(v),C.appendChild(T),C.onmouseenter=()=>{n!==x&&(C.style.background="rgba(0,0,0,0.04)",v.style.transform="scale(1.1)")},C.onmouseleave=()=>{n!==x&&(C.style.background="transparent",v.style.transform="scale(1)")},C.onclick=()=>{te.playClick(),L(x)},C}function L(x){let f=x==="history"?"section-history":`cat-anchor-${x}`,u=document.getElementById(f);u&&(u.scrollIntoView({behavior:"smooth",block:"start"}),R(x))}function R(x){n=x,Array.from(l.children).forEach(f=>{if(!f.dataset.key)return;let u=f.querySelector("div:first-child");f.dataset.key===x?(f.style.background="#E8F0FE",f.style.color="#1967D2",f.style.fontWeight="600",u&&(u.style.transform="scale(1.1)")):(f.style.background="transparent",f.style.color=s.textSecondary,f.style.fontWeight="500",u&&(u.style.transform="scale(1)"))})}function B(){if(p.innerHTML="",t.trim()!==""){let u=[];if(Object.entries(pt).forEach(([v,T])=>{let D=T.links.filter(O=>O.name.toLowerCase().includes(t.toLowerCase())||O.desc.toLowerCase().includes(t.toLowerCase()));u.push(...D.map(O=>({...O,_cat:v})))}),u.length===0){p.innerHTML='<div style="text-align:center; padding: 60px; color:#999; font-size:13px;">Nenhum link encontrado.</div>';return}let C=document.createElement("div");C.innerHTML="Resultados da busca",C.style.cssText="font-size:12px; font-weight:700; color:#5f6368; margin:20px 0 10px; text-transform:uppercase;",p.appendChild(C),u.forEach(v=>{let T=Y(v,Re[v._cat],!1);p.appendChild(T)});return}let x=Oo();if(x.length>0){let u=document.createElement("div");u.id="section-history";let C=document.createElement("div");C.innerHTML='<span style="font-size:14px; margin-right:6px;">\u{1F552}</span> Recentes',C.style.cssText="font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; margin: 24px 0 12px 0; letter-spacing:0.5px;",u.appendChild(C),x.forEach(T=>{let D=Re[T._originalCat]||Re.tasks,O=Y(T,D,!0);u.appendChild(O)}),p.appendChild(u);let v=document.createElement("div");v.style.cssText="height: 1px; background: #E0E0E0; margin: 24px 0;",p.appendChild(v)}Object.entries(pt).forEach(([u,C])=>{let v=document.createElement("div"),T=document.createElement("div");T.id=`cat-anchor-${u}`,T.innerHTML=`<span style="opacity:0.6; margin-right:8px;">${Re[u]}</span> ${C.label}`,T.style.cssText=`
              display: flex; align-items: center;
              font-size: 12px; font-weight: 700; color: #1a73e8; 
              text-transform: uppercase; margin: 32px 0 12px 0;
              padding-top: 10px; /* Ajuda no scroll snap */
          `,v.appendChild(T),C.links.forEach(D=>{let O=Y(D,Re[u],!1,u);v.appendChild(O)}),p.appendChild(v)});let f=document.createElement("div");f.style.height="60px",p.appendChild(f)}function Y(x,f,u,C){let v=document.createElement("div"),T=u?"#FFF8E1":"#FFFFFF",D=u?"1px solid #FFE082":"1px solid rgba(0,0,0,0.08)";v.style.cssText=`
          display: flex; align-items: center; gap: 14px;
          padding: 12px 16px; margin-bottom: 8px;
          background: ${T}; border: ${D};
          border-radius: 12px; cursor: pointer;
          box-shadow: 0 1px 2px rgba(0,0,0,0.04);
          transition: transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.2s;
          position: relative; overflow: hidden;
      `;let O=document.createElement("div");O.style.cssText=`
          width: 36px; height: 36px; border-radius: 10px;
          background: #F1F3F4; color: ${s.textSecondary};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
      `,u&&(O.style.background="#FFFFFF"),O.innerHTML=f||Re.tasks;let I=O.querySelector("svg");I&&(I.style.width="20px",I.style.height="20px");let P=document.createElement("div");P.style.cssText="flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden;";let g=document.createElement("div");g.style.cssText=`font-size: 13px; font-weight: 600; color: ${s.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,g.textContent=x.name;let S=document.createElement("div");S.style.cssText=`font-size: 11px; color: ${s.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,S.textContent=x.desc,P.appendChild(g),P.appendChild(S);let w=document.createElement("div");return w.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',w.style.cssText=`
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9AA0A6; transition: all 0.2s; opacity: 0.6;
      `,w.title="Copiar URL",v.onmouseenter=()=>{v.style.transform="translateY(-2px)",v.style.boxShadow="0 4px 12px rgba(0,0,0,0.08)",O.style.background=s.primaryBg,O.style.color=s.primary,w.style.opacity="1",w.style.color=s.primary,w.style.background="#F1F3F4"},v.onmouseleave=()=>{v.style.transform="translateY(0)",v.style.boxShadow="0 1px 2px rgba(0,0,0,0.04)",O.style.background=u?"#FFFFFF":"#F1F3F4",O.style.color=s.textSecondary,w.style.opacity="0.6",w.style.color="#9AA0A6",w.style.background="transparent"},v.onclick=()=>{!u&&C&&ko(x,C),renderMainContent(),window.open(x.url,"_blank")},w.onclick=y=>{y.stopPropagation(),te.playClick(),navigator.clipboard.writeText(x.url),!u&&C&&ko(x,C),renderMainContent(),V("Link copiado!")},v.appendChild(O),v.appendChild(P),v.appendChild(w),v}m.addEventListener("input",x=>{t=x.target.value,B()});function se(){o=!o,Ie(o,i,"cw-btn-links")}return b(),B(),R(Oo().length>0?"history":Object.keys(pt)[0]),se}var Be=[];function Ht(e){Be=e}var Wo=["lucaste"],Yo=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function Io(){let e="v4.9 (High Contrast UI)",t=!1,o=null,n=null;function s(g){if(!g)return"";try{let S=new Date(g);return isNaN(S.getTime())?String(g):S.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(g)}}if(!document.getElementById("cw-broadcast-hd-css")){let g=document.createElement("style");g.id="cw-broadcast-hd-css",g.innerHTML=`
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
      `,document.head.appendChild(g)}let i={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},a={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function r(g){return g?Object.entries(g).map(([S,w])=>`${S.replace(/[A-Z]/g,y=>"-"+y.toLowerCase())}:${w}`).join(";"):""}function c(g){if(!g||typeof g!="string")return"";let S=g;return S=S.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),S=S.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),S=S.replace(/_(.*?)_/g,"<i>$1</i>"),S=S.replace(/\n/g,"<br>"),S=so(S),S}let l=document.createElement("div");l.id="broadcast-popup",l.classList.add("cw-module-window"),Object.assign(l.style,Te,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let h={popup:l,googleLine:null};function d(){if(t=!t,Ie(t,l,"cw-btn-broadcast"),t){let g=document.getElementById("cw-btn-broadcast");g&&g.classList.remove("has-new"),u()}}let m=qe(l,"Central de Avisos",e,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",h,()=>d()),p=m.querySelector(".cw-header-actions")||m.lastElementChild,b=null;function k(){let g=null;try{g=Qt()}catch{console.warn("TechSol: Auth Pending")}if(g){let S=g.split("@")[0].toLowerCase(),w=Wo.includes(S);if(window._cwIsAdmin=w,window._cwCurrentUser=S,w&&p&&!p.querySelector("#cw-admin-btn")){let y=document.createElement("div");y.id="cw-admin-btn",y.className="cw-btn-interactive",y.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(y.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),y.title="Novo Aviso",y.onclick=E=>{E.stopPropagation(),B()},p.insertBefore(y,p.firstChild),b||R(),v()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(k,2e3))}if(p){let g=document.createElement("button");g.textContent="Limpar",g.className="cw-btn-interactive",Object.assign(g.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),g.onclick=S=>{S.stopPropagation(),te.playSuccess();let w=Be.map(y=>y.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(w)),v(),C()},p.insertBefore(g,p.firstChild)}l.appendChild(m);let L=document.createElement("div");L.id="cw-update-status",L.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",l.appendChild(L);function R(){b=document.createElement("div"),b.className="cw-editor-overlay",b.innerHTML=`
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
      `,b.querySelectorAll('input[name="cw-bc-type"]').forEach(y=>{y.addEventListener("change",()=>{b.querySelectorAll(".cw-radio-option").forEach(E=>E.classList.remove("checked")),y.parentElement.classList.add("checked")})}),setTimeout(()=>{let y=b.querySelector(".cw-radio-option.info");y&&y.classList.add("checked")},100);let g=b.querySelector("#cw-bc-cancel"),S=b.querySelector("#cw-bc-close-x"),w=b.querySelector("#cw-bc-send");g.onclick=Y,S.onclick=Y,w.onclick=se,l.appendChild(b)}function B(g=null){if(!b)return;let S=b.querySelector("#cw-editor-title-label"),w=b.querySelector("#cw-bc-title"),y=b.querySelector("#cw-bc-text"),E=b.querySelector("#cw-bc-send");if(g){n=g.id,S.textContent="Editar Aviso",w.value=g.title||"",y.value=g.text||"",E.textContent="Salvar Altera\xE7\xF5es";let _=g.type||"info",$=b.querySelector(`input[name="cw-bc-type"][value="${_}"]`);$&&$.click()}else{n=null,S.textContent="Novo Aviso",w.value="",y.value="",E.textContent="Publicar";let _=b.querySelector('input[name="cw-bc-type"][value="info"]');_&&_.click()}b.classList.add("active"),setTimeout(()=>w.focus(),300)}function Y(){b&&b.classList.remove("active"),n=null}async function se(){let g=b.querySelector("#cw-bc-send"),S=b.querySelector("#cw-bc-title"),w=b.querySelector("#cw-bc-text"),y=b.querySelector('input[name="cw-bc-type"]:checked'),E=y?y.value:"info";if(!S.value.trim()||!w.value.trim()){V("Preencha todos os campos!",{error:!0});return}g.textContent="Salvando...",g.style.opacity="0.7";let _=!1;n?_=await we.updateBroadcast(n,{title:S.value,text:w.value,type:E}):_=await we.sendBroadcast({title:S.value,text:w.value,type:E,author:window._cwCurrentUser||"admin"}),_?(V(n?"Atualizado!":"Publicado!"),te.playSuccess(),Y(),setTimeout(()=>u(),1500)):(V("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),g.textContent=n?"Salvar Altera\xE7\xF5es":"Publicar",g.style.opacity="1")}async function x(g){if(confirm("Confirma a exclus\xE3o deste aviso?"))if(await we.deleteBroadcast(g)){V("Aviso removido."),te.playClick();let w=Be.findIndex(y=>y.id===g);w>-1&&Be.splice(w,1),v(),setTimeout(()=>u(),1500)}else V("Erro ao excluir.",{error:!0})}let f=document.createElement("div");f.className="cw-nice-scroll",Object.assign(f.style,i.feedContainer),l.appendChild(f);async function u(){t&&(L.style.display="block",L.innerHTML="\u{1F504} Sincronizando...");try{let g=await we.fetchData();g&&g.broadcast&&(Ht(g.broadcast),C(),t&&(v(),L.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{L.style.display="none"},1500)))}catch{t&&(L.innerHTML="\u26A0\uFE0F Offline")}}function C(){let g=document.getElementById("cw-btn-broadcast");if(!g)return;let S=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(Be.some(y=>!S.includes(y.id))){if(g.classList.add("has-new"),!g.querySelector(".cw-badge")){let y=document.createElement("div");y.className="cw-badge",Object.assign(y.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),g.appendChild(y)}}else{g.classList.remove("has-new");let y=g.querySelector(".cw-badge");y&&y.remove()}}function v(){f.innerHTML="";let g=l.querySelector("#cw-bau-widget");g&&g.remove();let S=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),w=[...Be].sort((M,N)=>{let G=new Date(M.date).getTime()||0;return(new Date(N.date).getTime()||0)-G}),y=w.findIndex(M=>M.title&&M.title.toLowerCase().includes("disponibilidade bau"));if(y!==-1){let M=w[y];w.splice(y,1);let N=document.createElement("div");N.id="cw-bau-widget",Object.assign(N.style,i.bauContainer);let G=[],U=(M.text||"").split(`
`),q=/\d{1,2}\/\d{1,2}/;if(U.forEach(ce=>{let fe=ce.match(q);if(fe){let Se=fe[0],Ne="\u{1F4C5}";/🇧🇷|🇵🇹|PT|BR/i.test(ce)?Ne="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(ce)&&(Ne="\u{1F1EA}\u{1F1F8}"),G.some(De=>De.flag===Ne&&De.date===Se)||G.push({flag:Ne,date:Se})}}),G.length===0){let ce=(M.text||"").match(/\d{1,2}\/\d{1,2}/g);ce&&[...new Set(ce)].forEach(fe=>G.push({flag:"\u{1F4C5}",date:fe}))}let j="",de='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(de=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${de}
              `),G.length>0?j=`
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
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${c(M.text)}</div>
              `:j=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${c(M.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,N.innerHTML=`
              <div style="${r(i.bauHeader)}; margin-bottom:8px;">
                  <div style="${r(i.liveIndicator)}">
                      <div style="${r(i.pulseDot)}"></div>
                      <span style="${r(i.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${s(M.date)}</div>
              </div>
              ${j}
          `,L.after(N);let ne=N.querySelector("#cw-bau-toggle-btn"),ae=N.querySelector("#cw-bau-full");if(ne&&ae&&(ne.onclick=()=>{let ce=ae.style.display==="none";ae.style.display=ce?"block":"none",ne.textContent=ce?"Ocultar":"Detalhes"}),window._cwIsAdmin){let ce=N.querySelector(".cw-bau-edit");ce&&(ce.onclick=()=>B(M))}}let E=w.sort((M,N)=>{let G=S.includes(M.id),U=S.includes(N.id);return G===U?0:G?1:-1});if(E.length===0&&!y){let M=document.createElement("div");Object.assign(M.style,i.emptyState),M.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,f.appendChild(M)}let _=E.filter(M=>!S.includes(M.id)),$=E.filter(M=>S.includes(M.id));if(_.forEach(M=>f.appendChild(T(M,!1))),$.length>0){let M=document.createElement("div");Object.assign(M.style,i.historyDivider),M.innerHTML=`<span>Hist\xF3rico (${$.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let N=document.createElement("div");Object.assign(N.style,i.historyContainer),$.forEach(U=>N.appendChild(T(U,!0)));let G=!1;M.onclick=()=>{te.playClick(),G=!G,N.style.display=G?"flex":"none",M.querySelector("svg").style.transform=G?"rotate(180deg)":"rotate(0deg)"},f.appendChild(M),f.appendChild(N)}}function T(g,S){let w=document.createElement("div");Object.assign(w.style,S?i.cardHistory:i.card);let y=a[g.type]||a.info,E=document.createElement("div");Object.assign(E.style,i.cardHeader);let _=document.createElement("div");Object.assign(_.style,i.typeTag,{color:y.color,background:y.bg}),_.innerHTML=`${y.icon} <span>${g.type}</span>`;let $=document.createElement("span");if(Object.assign($.style,i.dateTag),$.textContent=s(g.date),E.appendChild(_),S)E.appendChild($);else{let q=document.createElement("button");q.className="cw-btn-interactive",Object.assign(q.style,i.dismissBtn),q.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',q.onmouseenter=()=>{q.style.color="#1e8e3e",q.style.background="#e6f4ea",q.style.borderColor="#1e8e3e"},q.onmouseleave=()=>{q.style.color="#5f6368",q.style.background="#fff",q.style.borderColor="rgba(0,0,0,0.1)"},q.onclick=j=>{j.stopPropagation(),te.playClick(),w.style.transform="translateX(20px)",w.style.opacity="0",setTimeout(()=>{let de=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");de.push(g.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(de)),v(),C()},200)},E.appendChild(q)}let M=document.createElement("div");Object.assign(M.style,i.cardContent);let N=document.createElement("div");Object.assign(N.style,i.msgTitle),N.textContent=g.title;let G=document.createElement("div");Object.assign(G.style,i.msgBody),G.innerHTML=c(g.text);let U=document.createElement("div");if(Object.assign(U.style,i.msgMeta),U.innerHTML=`Publicado por <b>${g.author||"Sistema"}</b>`,S||(U.innerHTML+=` \u2022 ${s(g.date)}`),M.appendChild(N),M.appendChild(G),M.appendChild(U),w.appendChild(E),w.appendChild(M),window._cwIsAdmin){let q=document.createElement("div");q.className="cw-card-actions";let j=document.createElement("button");j.className="cw-action-btn edit",j.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',j.onclick=()=>B(g);let de=document.createElement("button");de.className="cw-action-btn delete",de.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',de.onclick=()=>x(g.id),q.appendChild(j),q.appendChild(de),w.appendChild(q)}return w}let D=we.getCachedBroadcasts();D.length>0&&(Ht(D),v()),setTimeout(k,500),u(),o||(o=setInterval(u,Yo));let O=document.createElement("div");Object.assign(O.style,Ze),O.className="no-drag",l.appendChild(O),Je(l,O),document.body.appendChild(l);let I=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),P=Be.some(g=>!I.includes(g.id));return{toggle:d,hasUnread:P}}function _o(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let e=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],t=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},n=document.createElement("div");Object.assign(n.style,o.overlay);let s=document.createElement("div");Object.assign(s.style,o.card);let i=document.createElement("div");Object.assign(i.style,o.icon);let a=document.createElement("div");Object.assign(a.style,o.title);let r=document.createElement("div");Object.assign(r.style,o.text);let c=document.createElement("div");Object.assign(c.style,o.dotsContainer);let l=document.createElement("div");Object.assign(l.style,o.btnContainer);let h=document.createElement("button");h.textContent="Pular",Object.assign(h.style,o.btn,o.btnSkip),h.onmouseover=()=>h.style.color="#202124",h.onmouseout=()=>h.style.color="#5f6368";let d=document.createElement("button");d.textContent="Pr\xF3ximo",Object.assign(d.style,o.btn,o.btnNext),d.onmouseover=()=>d.style.transform="scale(1.05)",d.onmouseout=()=>d.style.transform="scale(1)",l.appendChild(h),l.appendChild(d),s.appendChild(i),s.appendChild(a),s.appendChild(r),s.appendChild(c),s.appendChild(l),n.appendChild(s),document.body.appendChild(n);function m(b){let k=e[b];i.textContent=k.icon,a.textContent=k.title,r.textContent=k.text,c.innerHTML="",e.forEach((L,R)=>{let B=document.createElement("div");Object.assign(B.style,o.dot),R===b&&Object.assign(B.style,o.dotActive),c.appendChild(B)}),k.isLast?(h.style.display="none",d.textContent="Come\xE7ar \u{1F680}",d.style.width="100%"):(h.style.display="block",d.textContent="Pr\xF3ximo",d.style.width="auto")}function p(){localStorage.setItem("cw_onboarding_seen_v1","true"),n.style.opacity="0",s.style.transform="translateY(20px)",setTimeout(()=>n.remove(),400),te.playSuccess(),V("Tudo pronto! Use o menu flutuante.")}d.onclick=()=>{te.playClick(),t<e.length-1?(t++,m(t)):p()},h.onclick=()=>{confirm("Pular o tutorial?")&&p()},m(0),requestAnimationFrame(()=>{n.style.opacity="1",s.style.transform="translateY(0)"})}function Xo(){if(window.techSolInitialized){Lt();return}window.techSolInitialized=!0,console.log("\u{1F680} TechSol Suite Initializing...");try{oo();try{te.initGlobalListeners(),te.playStartup()}catch(i){console.warn("\xC1udio n\xE3o p\xF4de ser iniciado automaticamente:",i)}we.fetchTips(),Lt();let e=Co(),t=So(),o=To(),n=qo(),s=Io();fo({toggleNotes:e,toggleEmail:t,toggleScript:o,toggleLinks:n,broadcastControl:s}),setTimeout(()=>{_o()},1500)}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),V("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}Xo();})();
