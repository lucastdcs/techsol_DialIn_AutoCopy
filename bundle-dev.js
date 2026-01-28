(()=>{var vt="",wt="",ao=e=>new Promise(t=>setTimeout(t,e));async function io(){if(vt&&wt)return vt;try{let e=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!e)return"Agente";e.click(),await ao(150);let t="Consultor",n=document.querySelector("profile-details .name");if(n)t=n.textContent.trim().split(" ")[0],t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();else{let s=document.querySelector("profile-details img");if(s&&s.src.includes("/photos/")){let i=s.src.match(/\/photos\/([^\?]+)/)[1];t=i.charAt(0).toUpperCase()+i.slice(1)}}let o=document.querySelector("profile-details .email");return o&&(wt=o.textContent.trim(),console.log("TechSol: Identidade confirmada ->",wt)),e.click(),document.body.click(),vt=t,t}catch(e){return console.warn("Sherlock falhou:",e),"Consultor"}}function Bt(){return vt||"Consultor"}function Ct(){return wt||null}function so(e){let t=new Date,n=t.getHours(),o=t.getDay(),s="Ol\xE1",i="";n>=5&&n<12?(s="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):n>=12&&n<18?(s="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(s="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let a=[];n>=0&&n<5?a=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:n<12?o===1?a=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:o===5?a=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:a=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:n<18?a=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:a=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(o===0||o===6)&&(a=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let r=a[Math.floor(Math.random()*a.length)];return{prefix:`${s},`,name:e,suffix:r,icon:i,isFriday:o===5}}async function Uo(){try{let t=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!t)return null;let n=t.parentElement,o=n.querySelector(".unmask-button")||n.querySelector('[aria-label="Click to view"]');o&&(o.click(),await ao(500));let i=Array.from(n.querySelectorAll("a, span, div, pii-value")).find(a=>{let r=a.innerText.trim();return r.includes("@")&&!r.includes("Is this:")&&r.toLowerCase()!=="email"});return i?i.innerText.trim():null}catch(e){return console.warn("Erro ao capturar email do cliente:",e),null}}function Wo(){try{let e=document.querySelector('material-input[debug-id="account-id-input"]');if(e){let t=e.querySelector("input");if(t){let n=t.value.trim();if(n)return n.includes("@")?n:`${n}@google.com`}}}catch(e){console.warn("Erro ao capturar email interno:",e)}return null}function Yo(){try{let t=Array.from(document.querySelectorAll(".data-pair-label")).find(s=>s.textContent.includes("Google Ads External Customer ID")||s.textContent.includes("Customer ID"));if(t){let s=t.closest("home-data-item")||t.parentElement;if(s){let i=s.querySelector(".data-pair-content");if(i)return i.textContent.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}}let o=document.body.innerText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);if(o)return o[0].replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(e){console.warn("Erro ao capturar CID:",e)}return"---"}async function Re(){let e="Cliente",t="[INSERIR URL]";try{let a=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(a&&a.nextElementSibling){let r=a.nextElementSibling.innerText.trim();r&&(e=r)}}catch(i){console.warn("Falha Nome:",i)}try{let a=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(a&&a.nextElementSibling){let r=a.nextElementSibling.innerText.trim();r&&(t=r)}}catch(i){console.warn("Falha URL:",i)}let n=await Uo(),o=Wo(),s=Yo();return{advertiserName:e,websiteUrl:t,clientEmail:n,internalEmail:o,cid:s,agentName:Bt()}}var Qe=null,Gt=null,De=.3;function Ke(){if(!Qe){let e=window.AudioContext||window.webkitAudioContext;e&&(Qe=new e)}return Qe&&Qe.state==="suspended"&&Qe.resume(),Qe}function ro(e){if(Gt)return Gt;let t=e.sampleRate*2,n=e.createBuffer(1,t,e.sampleRate),o=n.getChannelData(0);for(let s=0;s<t;s++)o[s]=Math.random()*2-1;return Gt=n,n}var Q={playClick:()=>{let e=Ke();if(!e)return;let t=e.currentTime,n=e.createBufferSource();n.buffer=ro(e);let o=e.createBiquadFilter();o.type="highpass",o.frequency.value=4e3;let s=e.createGain();s.gain.setValueAtTime(De*.8,t),s.gain.exponentialRampToValueAtTime(.001,t+.015),n.connect(o),o.connect(s),s.connect(e.destination),n.start(t),n.stop(t+.02)},playHover:()=>{let e=Ke();if(!e)return;let t=e.currentTime,n=e.createOscillator();n.type="sine",n.frequency.setValueAtTime(400,t);let o=e.createGain();o.gain.setValueAtTime(0,t),o.gain.linearRampToValueAtTime(De*.1,t+.005),o.gain.linearRampToValueAtTime(0,t+.02),n.connect(o),o.connect(e.destination),n.start(t),n.stop(t+.03)},playSuccess:()=>{let e=Ke();if(!e)return;let t=e.currentTime;[1046.5,1567.9].forEach((o,s)=>{let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=o,a.gain.setValueAtTime(0,t),a.gain.linearRampToValueAtTime(De*.6,t+.05),a.gain.exponentialRampToValueAtTime(.001,t+.6),i.connect(a),a.connect(e.destination),i.start(t),i.stop(t+.7)})},playGenieOpen:()=>{let e=Ke();if(!e)return;let t=e.currentTime,n=e.createBufferSource();n.buffer=ro(e);let o=e.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(100,t),o.frequency.exponentialRampToValueAtTime(800,t+.2);let s=e.createGain();s.gain.setValueAtTime(0,t),s.gain.linearRampToValueAtTime(De*.5,t+.05),s.gain.linearRampToValueAtTime(0,t+.25),n.connect(o),o.connect(s),s.connect(e.destination),n.start(t),n.stop(t+.3)},playError:()=>{let e=Ke();if(!e)return;let t=e.currentTime,n=e.createOscillator(),o=e.createGain();n.type="triangle",n.frequency.setValueAtTime(120,t),n.frequency.exponentialRampToValueAtTime(80,t+.1),o.gain.setValueAtTime(De,t),o.gain.exponentialRampToValueAtTime(.001,t+.15),n.connect(o),o.connect(e.destination),n.start(t),n.stop(t+.2)},playStartup:()=>{let e=Ke();if(!e)return;let t=e.currentTime,n=.12,o=e.createOscillator(),s=e.createGain(),i=e.createBiquadFilter();o.type="square",o.frequency.setValueAtTime(400,t),o.frequency.exponentialRampToValueAtTime(50,t+.1),i.type="lowpass",i.frequency.setValueAtTime(800,t),i.frequency.exponentialRampToValueAtTime(100,t+.1),s.gain.setValueAtTime(De*4,t),s.gain.exponentialRampToValueAtTime(.001,t+.1),o.connect(i),i.connect(s),s.connect(e.destination),o.start(t),o.stop(t+.12);let a=e.createOscillator(),r=e.createGain();a.type="sine",a.frequency.setValueAtTime(150,t),a.frequency.exponentialRampToValueAtTime(50,t+.15),r.gain.setValueAtTime(De*1.5,t),r.gain.exponentialRampToValueAtTime(.001,t+.15),a.connect(r),r.connect(e.destination),a.start(t),a.stop(t+.15),[55,55.4,110.5].forEach(h=>{let p=e.createOscillator(),c=e.createGain(),x=e.createBiquadFilter();p.type="sawtooth",p.frequency.value=h,x.type="lowpass",x.frequency.setValueAtTime(30,t),x.frequency.linearRampToValueAtTime(900,t+n+.2),x.frequency.exponentialRampToValueAtTime(40,t+3),c.gain.setValueAtTime(0,t),c.gain.linearRampToValueAtTime(De*.6,t+n+.1),c.gain.exponentialRampToValueAtTime(.001,t+3.5),p.connect(x),x.connect(c),c.connect(e.destination),p.start(t),p.stop(t+3.6)})},playNotification:()=>{let e=Ke();if(!e)return;let t=e.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(o=>{let s=e.createOscillator(),i=e.createGain();s.type="sine",s.frequency.setValueAtTime(o.freq,t),i.gain.setValueAtTime(0,t),i.gain.linearRampToValueAtTime(De*o.vol,t+.004),i.gain.exponentialRampToValueAtTime(.001,t+o.dur),s.connect(i),i.connect(e.destination),s.start(t),s.stop(t+o.dur+.1)})},playSwoosh:()=>{Q.playGenieOpen()},playReset:()=>{Q.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let e=0,t=50;document.addEventListener("mouseover",n=>{if(!Qe)return;let o=n.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!o||o.contains(n.relatedTarget))return;let s=Date.now();s-e<t||(Q.playHover(),e=s)},{passive:!0})}};var lo=1e4;function po(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
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
    `,document.head.appendChild(t)}function U(e,t={}){let n=document.createElement("div"),o=t.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(n.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:o,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),n.textContent=e,document.body.appendChild(n),t.error?Q.playError():Q.playSuccess(),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>n.remove(),400)},t.duration||4e3)}function uo(e,t=null){let n=0,o=0,s=0,i=0,a=t||e;a.style.cursor="grab",a.onmousedown=r;function r(p){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(p.target.tagName)||p.target.closest(".no-drag"))return;p=p||window.event,a.style.cursor="grabbing",e.style.transition="none";let c=e.getBoundingClientRect();e.style.transform="none",e.style.left=c.left+"px",e.style.top=c.top+"px",e.style.margin="0",e.style.bottom="auto",e.style.right="auto",lo++,e.style.zIndex=lo,s=p.clientX,i=p.clientY,e.setAttribute("data-dragging","true"),document.onmouseup=h,document.onmousemove=d}function d(p){p=p||window.event,p.preventDefault(),n=s-p.clientX,o=i-p.clientY,s=p.clientX,i=p.clientY;let c=e.offsetTop-o,x=e.offsetLeft-n,u=16,f=window.innerWidth,g=window.innerHeight,v=e.offsetWidth,E=e.offsetHeight;x<u?x=u:x+v>f-u&&(x=f-v-u),c<u?c=u:c+E>g-u&&(c=g-E-u),e.style.top=c+"px",e.style.left=x+"px"}function h(){document.onmouseup=null,document.onmousemove=null,a.style.cursor="grab",setTimeout(()=>{e.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",e.setAttribute("data-dragging","false"),e.setAttribute("data-moved","true")},50)}}var ke={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var jt={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},At={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var mo={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var Ce={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var Pt=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],co=-1;function ct(){let e=Math.floor(Math.random()*Pt.length);return e===co&&(e=(e+1)%Pt.length),co=e,Pt[e]}var ze=e=>new Promise(t=>setTimeout(t,e));async function Xo(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let n=e.querySelector(".cursor");await ze(200);for(let o=0;o<t.length;o++){let s=t.charAt(o),i=document.createElement("span");i.textContent=s,n&&n.parentNode===e?n.before(i):e.appendChild(i);let a=Math.floor(Math.random()*60)+30;o===0&&(a=150),o>t.length-3&&(a=30),await ze(a)}await ze(600),n&&(n.style.display="none")}async function Ht(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
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
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await ze(200);let t=await io(),n=so(t),o=e.querySelector("#w-icon"),s=e.querySelector("#p1"),i=e.querySelector("#p2"),a=e.querySelector("#p3"),r=e.querySelector("#p-sextou");o&&(o.innerHTML=n.icon),s&&(s.textContent=n.prefix),a&&(a.textContent=n.suffix),await ze(300);let d=o?o.querySelector("svg"):null;if(d&&(d.style.opacity="1",d.style.transform="scale(1)"),await ze(400),s&&(s.style.opacity="1"),Q.playStartup(),i&&await Xo(i,n.name),a&&(a.style.opacity="1",a.style.transform="translateY(0)"),n.isFriday&&r){await ze(400),r.style.display="block",r.offsetWidth;let h=r.querySelector(".sextou-badge");h&&(h.style.opacity="1",h.style.transform="scale(1)")}await ze(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await ze(900),e.parentNode&&e.parentNode.removeChild(e)}}var ot={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function nt(e,t){t.onmousedown=n;function n(o){o.stopPropagation(),o.preventDefault();let s=e.style.transition;e.style.transition="none";let i=o.clientX,a=o.clientY,r=parseFloat(getComputedStyle(e,null).getPropertyValue("width").replace("px","")),d=parseFloat(getComputedStyle(e,null).getPropertyValue("height").replace("px","")),h=i,p=a,c=!1;function x(g){h=g.clientX,p=g.clientY,c||(window.requestAnimationFrame(()=>{u(),c=!1}),c=!0)}function u(){let g=r+(h-i),v=d+(p-a);g>360&&(e.style.width=g+"px"),v>300&&(e.style.height=v+"px")}function f(){document.removeEventListener("mousemove",x),document.removeEventListener("mouseup",f),setTimeout(()=>{e.style.transition=s},50)}document.addEventListener("mousemove",x),document.addEventListener("mouseup",f)}t.onmouseenter=()=>t.style.opacity="1",t.onmouseleave=()=>t.style.opacity="0.6"}function go(e){if(!e)return"";let t={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return e.replace(/:([a-zA-Z0-9-_+]+):/g,n=>t[n]?t[n]:"")}var at=e=>new Promise(t=>setTimeout(t,e));function dt(e){e&&["mousedown","mouseup","click"].forEach(t=>e.dispatchEvent(new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window})))}var bo="cw-automation-styles";if(!document.getElementById(bo)){let e=document.createElement("style");e.id=bo,e.innerHTML=`
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
    `,document.head.appendChild(e)}function fo(e){let t=document.getElementById("cw-loading-overlay");e?t?t.style.opacity="1":(t=document.createElement("div"),t.id="cw-loading-overlay",document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1")):t&&(t.style.opacity="0",setTimeout(()=>t.remove(),300))}async function ho(e){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let t=document.getElementById(e),n="";fo(!0),t&&(n=t.placeholder,t.placeholder="Buscando ID...",t.value="",t.classList.add("cw-scanning-active"));try{let o=document.querySelector('material-button[debug-id="dock-item-case-log"]');o&&!o.classList.contains("selected")&&(dt(o),await at(1200));let s=document.querySelector("search-filter dropdown-button .button");if(s&&!(s.innerText||"").includes("All")){dt(s),await at(600);let x=document.querySelector('material-checkbox[debug-id="check-all-box"]');x&&x.getAttribute("aria-checked")!=="true"&&(dt(x),await at(300));let u=document.querySelector('material-button[debug-id="apply-filter"]');u&&(dt(u),await at(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await at(500));let a=Array.from(document.querySelectorAll(".message-header"));for(let c=a.length-1;c>=0;c--){let x=a[c],u=x.querySelector("i.material-icons-extended"),f=u&&u.innerText.trim()==="phone_in_talk",g=x.innerText||"",v=g.includes("Agent joined")||g.includes("outbound-call")||g.includes("Speakeasy");if(f||v){x.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",x),t&&(t.placeholder="Lendo mensagem..."),dt(x),await at(1e3));break}}let d=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),h=/Speakeasy.*?(P\d{15,25})/i,p=null;for(let c=d.length-1;c>=0;c--){let x=d[c];if(x.offsetParent===null)continue;let u=(x.innerText||"").match(h);if(u&&u[1]){p=u[1];break}}if(t)if(p){try{await navigator.clipboard.writeText(p)}catch{}t.value=p,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),Q.playSuccess(),U(`ID Localizado: ${p}`),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}else Q.playError(),U("Nenhum ID encontrado.",{error:!0}),t.placeholder="N\xE3o encontrado",t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}catch(o){console.error("Erro na automa\xE7\xE3o:",o),U("Erro ao processar.",{error:!0})}finally{t&&(t.classList.remove("cw-scanning-active"),t.value||(t.placeholder=n)),fo(!1)}}var Be={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:"}},je={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},pt={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>Substatus:</b> DC - Other<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br>Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},Ze={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},ut=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],$t=["CONSIDERACOES","COMENTARIOS"],Le={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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
\u2022 Tentativa 2 -`}};var xe=e=>new Promise(t=>setTimeout(t,e));function Ae(e,t="info"){let n={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${e}`,n[t]||n.info)}function Me(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>e.dispatchEvent(new MouseEvent(n,t)))}function St(e,t){if(!e)return;let n=`cw-warning-${e.id||Math.random().toString(36).substr(2,9)}`,o=document.getElementById(n);o&&o.remove();let s=e.getBoundingClientRect(),i=document.createElement("div");i.id=n,i.style.cssText=`
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
    `;let a=i.querySelector(".cw-close-btn");a.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&a.click()},25e3)}async function Et(e,t){if(!e||!t)return;e.focus(),e.value="",e.dispatchEvent(new Event("input",{bubbles:!0})),await xe(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),await xe(100),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function Vt(){let t=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(n=>{let o=n.offsetParent!==null,s=n.closest("case-message-view")!==null,i=n.closest(".editor")!==null||n.closest("write-card")!==null;return o&&!s&&i});return t&&Ae("Editor visualmente detectado.","success"),t}async function xo(){Ae("\u{1F680} FASE 1: Tentando abrir a janela de email...");let e=!1,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(c=>c.innerText.trim()==="email");if(n&&n.offsetParent!==null){Ae("Bot\xE3o de email direto encontrado.");let c=n.closest("material-button")||n.closest("material-fab")||n;Me(c),e=!0}else{Ae("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let c=document.querySelector("material-fab-speed-dial");if(c){let x=c.querySelector(".trigger");if(x){Me(x),await xe(800);let f=Array.from(document.querySelectorAll("i.material-icons-extended")).find(g=>g.innerText.trim()==="email");f&&(Me(f),e=!0)}}}if(!e)return U("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;Ae("\u{1F680} FASE 2: Verificando rascunhos...");let o=null,s=0,i=20;for(;s<i;){await xe(250);let c=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(o=Array.from(c).find(x=>x.offsetParent!==null),o){Ae("\u26A0\uFE0F Rascunho detectado!","warn");break}s++}if(o){Ae("\u{1F5D1}\uFE0F Descartando..."),Me(o),o.click();let c=null,x=0;for(;x<15;){await xe(300);let u=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(c=Array.from(u).find(f=>f.offsetParent!==null),c)break;x++}c&&(Me(c),U("Limpando rascunho antigo...",{duration:2e3}),await xe(2500))}Ae("\u{1F680} FASE 3: Buscando editor final...");let a=0,r=null;for(;a<20&&(r=Vt(),!r);)await xe(250),a++;if(!r)return U("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let d=r.closest('[id="email-body-content-top"]'),p=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(d){if(p){let x=p.closest('[aria-hidden="true"]');x&&x.removeAttribute("aria-hidden"),p.focus(),Me(p)}await xe(300),d.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let c=d.querySelector("#cases-body-field");if(c){let x=document.createRange();x.selectNodeContents(c),x.collapse(!0);let u=window.getSelection();u.removeAllRanges(),u.addRange(x)}return!0}return!1}async function Tt(e){if(!e||!await xo())return;let n=await Re();Ae("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let o=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(o&&(o.click(),await xe(600)),n.clientEmail&&n.clientEmail!=="N/A"&&n.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await Et(i,n.clientEmail),St(i,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(n.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await Et(i,n.internalEmail),St(i,`
                <strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.
                <div style="margin-top:4px;">
                    <a href="https://mail.google.com/mail/u/0?ui=2&ik=ed23fb3167&attid=0.1&permmsgid=msg-f:1843445102914241244&th=19953b8dda2302dc&view=fimg&fur=ip&permmsgid=msg-f:1843445102914241244&sz=s0-l75-ft&attbid=ANGjdJ9m7O33cM36sxBYohVD6Qsapyux4PNr8qmTBlZ8zkp_LR79suGZhnxFJtBoFDeyMFygsH_tvCts5fnX0WV4rdClw9YqqR7guLnaXU9UzmZRRMRXEoC7T_MPbwo&disp=emb&realattid=ii_mfmv7wjm1&zw" target="_blank" style="color:#1a73e8;text-decoration:none;font-weight:500;display:inline-flex;align-items:center;">
                        Consultar Regra <span style="font-size:14px;margin-left:2px;">\u2197</span>
                    </a>
                </div>
            `))}await xe(500);let s=document.querySelector('material-button[debug-id="canned_response_button"]');if(s){Me(s),await xe(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){Me(i),document.execCommand("insertText",!1,e),i.dispatchEvent(new Event("input",{bubbles:!0})),Ae("\u23F3 Buscando resultado da Canned Response...","info");let a=null,r=0,d=15e3,h=500;for(;r<d&&(a=document.querySelector("material-select-dropdown-item"),!a);)await xe(h),r+=h;if(a){Me(a),await xe(1500);let p=Vt();if(p&&n.advertiserName){let c=p.innerHTML;c.includes("{%ADVERTISER_NAME%}")&&(p.innerHTML=c.replace(/{%ADVERTISER_NAME%}/g,n.advertiserName))}U("Canned Response aplicada!")}else Ae(`\u274C Timeout: Resultado '${e}' n\xE3o apareceu ap\xF3s 15s.`,"error"),U(`Timeout: Template '${e}' n\xE3o carregou.`,{error:!0})}}else U("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function yo(e){if(Ae(`\u{1F680} Iniciando Quick Email: ${e.name}`),!await xo())return;let n=await Re(),o=Bt();await xe(600),Ae("\u{1F4E7} Processando destinat\xE1rios...");let s=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(s&&(s.click(),await xe(600)),n.clientEmail&&n.clientEmail!=="N/A"&&n.clientEmail!=="N/A (Bloqueado)"){let r=document.querySelector('input[aria-label="Enter To email address"]');r&&(await Et(r,n.clientEmail),St(r,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(n.internalEmail){let r=document.querySelector('input[aria-label="Enter Bcc email address"]');r&&(await Et(r,n.internalEmail),St(r,`
                <strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.
                <div style="margin-top:4px;">
                    <a href="https://mail.google.com/mail/u/0?ui=2&ik=ed23fb3167&attid=0.1&permmsgid=msg-f:1843445102914241244&th=19953b8dda2302dc&view=fimg&fur=ip&permmsgid=msg-f:1843445102914241244&sz=s0-l75-ft&attbid=ANGjdJ9m7O33cM36sxBYohVD6Qsapyux4PNr8qmTBlZ8zkp_LR79suGZhnxFJtBoFDeyMFygsH_tvCts5fnX0WV4rdClw9YqqR7guLnaXU9UzmZRRMRXEoC7T_MPbwo&disp=emb&realattid=ii_mfmv7wjm1&zw" target="_blank" style="color:#1a73e8;text-decoration:none;font-weight:500;display:inline-flex;align-items:center;">
                        Consultar Regra <span style="font-size:14px;margin-left:2px;">\u2197</span>
                    </a>
                </div>
            `))}let i=document.querySelector('input[aria-label="Subject"]');i&&e.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,e.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await xe(300));let a=Vt();if(a){let d=(a.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');d&&(d.focus(),Me(d));let h=new Date;h.setDate(h.getDate()+3);let p=h.getDay();p===6?h.setDate(h.getDate()+2):p===0&&h.setDate(h.getDate()+1);let c=h.toLocaleDateString("pt-BR"),x=e.body;x=x.replace(/\[Nome do Cliente\]/g,n.advertiserName||"Cliente"),x=x.replace(/\[INSERIR URL\]/g,n.websiteUrl||"seu site"),x=x.replace(/\[URL\]/g,n.websiteUrl||"seu site"),x=x.replace(/\[Seu Nome\]/g,o),x=x.replace(/\[MM\/DD\/YYYY\]/g,c),document.execCommand("insertHTML",!1,x),d&&(d.dispatchEvent(new Event("input",{bubbles:!0})),d.dispatchEvent(new Event("change",{bubbles:!0}))),U("Email preenchido com sucesso!",{duration:2e3}),Ae("\u2705 Processo finalizado com sucesso.","success")}else U("Erro ao focar no editor.",{error:!0})}var Ko={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},vo={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function Oe(e,t,n,o,s,i){let a=document.createElement("div");Object.assign(a.style,Ko),uo(e,a);let r=document.createElement("div");Object.assign(r.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),a.appendChild(r),s&&(s.googleLine=r);let d=document.createElement("div");Object.assign(d.style,{display:"flex",alignItems:"center",gap:"12px"});let h=document.createElement("img");h.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(h.style,{width:"20px",height:"20px",pointerEvents:"none"});let p=document.createElement("span");p.textContent=t,d.appendChild(h),d.appendChild(p);let c=document.createElement("div");Object.assign(c.style,{display:"flex",alignItems:"center",gap:"4px"});let x='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',u='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',f=document.createElement("div");f.innerHTML=x,Object.assign(f.style,vo),f.title="Sobre & Feedback",f.classList.add("no-drag"),f.onmouseenter=()=>{f.style.background="rgba(255,255,255,0.1)",f.style.color="#FFF"},f.onmouseleave=()=>{f.style.color!=="rgb(138, 180, 248)"&&(f.style.background="transparent",f.style.color="#9AA0A6")};let g=document.createElement("div");g.innerHTML=u,Object.assign(g.style,vo),g.title="Fechar",g.classList.add("no-drag"),g.onmouseenter=()=>{g.style.background="rgba(242, 139, 130, 0.2)",g.style.color="#F28B82"},g.onmouseleave=()=>{g.style.background="transparent",g.style.color="#9AA0A6"},g.onmousedown=E=>E.stopPropagation(),f.onmousedown=E=>E.stopPropagation(),g.onclick=i;let v=Qo(e,t,n,o);return f.onclick=E=>{E.stopPropagation(),v.style.opacity==="1"?(v.style.opacity="0",v.style.pointerEvents="none",f.style.color="#9AA0A6",f.style.background="transparent"):(v.style.opacity="1",v.style.pointerEvents="auto",f.style.color="#8AB4F8",f.style.background="rgba(138, 180, 248, 0.1)")},c.appendChild(f),c.appendChild(g),a.appendChild(d),a.appendChild(c),a}function Qo(e,t,n,o){let s=document.createElement("div");return Object.assign(s.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),s.innerHTML=`
        <div style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${t}</div>
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
    `,document.head.appendChild(e)}function Ie(e,t,n){let o=document.getElementById(n);if(!t)return;let s=t.getAttribute("data-moved")==="true",i={x:0,y:0};if(o){let p=o.getBoundingClientRect();i.x=p.left+p.width/2,i.y=p.top+p.height/2}let a,r;if(!s)a=window.innerWidth/2,r=window.innerHeight/2;else{let p=t.getBoundingClientRect();a=p.left+p.width/2,r=p.top+p.height/2,a===0&&r===0&&(a=window.innerWidth/2,r=window.innerHeight/2)}let d=i.x-a,h=i.y-r;e?(Q.playGenieOpen(),t.style.transition="none",t.style.opacity="0",t.style.pointerEvents="auto",s?t.style.transform=`translate(${d}px, ${h}px) scale(0.05)`:t.style.transform=`translate(calc(-50% + ${d}px), calc(-50% + ${h}px)) scale(0.05)`,t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("open"),o&&o.classList.add("active"),t.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",t.style.opacity="1",s?t.style.transform="translate(0, 0) scale(1)":t.style.transform="translate(-50%, -50%) scale(1)"}),typeof wo=="function"&&wo(t,n)):(Q.playSwoosh(),t.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",t.style.pointerEvents="none",requestAnimationFrame(()=>{t.style.opacity="0",s?t.style.transform=`translate(${d}px, ${h}px) scale(0.1)`:t.style.transform=`translate(calc(-50% + ${d}px), calc(-50% + ${h}px)) scale(0.1)`}),setTimeout(()=>{t.classList.remove("open"),o&&o.classList.remove("active"),t.style.transition="",t.style.transform=""},300),typeof Ut=="function"&&Ut(t))}function wo(e,t){Ut(e);let n=o=>{if(!e.classList.contains("open"))return;let s=e.contains(o.target),i=document.querySelector(".cw-pill"),a=i&&i.contains(o.target);s?(e.classList.remove("idle"),e.style.zIndex="2147483648"):a||(e.classList.add("idle"),e.style.zIndex="2147483646")};e._idleHandler=n,document.addEventListener("mousedown",n)}function Ut(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}var Zo="https://script.google.com/a/macros/google.com/s/AKfycbxFxh1cVk6r0t_JTA2TBfHBLJe_mOBQFsidwL1jwsUDcBtQYk3afu25SN-FR3vafJChHw/exec",Wt="cw_data_broadcast",Co="cw_data_tips",Jo=["Processando...","Mantenha o foco!","Aguarde..."];function kt(e,t={}){return new Promise((n,o)=>{let s="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script");window[s]=d=>{document.body.contains(i)&&document.body.removeChild(i),delete window[s],n(d)};let a=Object.keys(t).map(d=>encodeURIComponent(d)+"="+encodeURIComponent(t[d])).join("&"),r=`${Zo}?op=${e}&callback=${s}&t=${Date.now()}&${a}`;i.src=r,i.onerror=()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[s],o(new Error("JSONP Error (Check Corp Login)"))},document.body.appendChild(i)})}var Se={fetchTips:async()=>{try{let e=await kt("tips");e?.tips&&localStorage.setItem(Co,JSON.stringify(e.tips))}catch(e){console.warn("Tips offline",e)}},fetchData:async()=>{try{let e=await kt("broadcast");if(e?.broadcast)return localStorage.setItem(Wt,JSON.stringify(e.broadcast)),e}catch(e){console.warn("Broadcast offline",e)}return{broadcast:JSON.parse(localStorage.getItem(Wt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(Wt)||"[]"),getRandomTip:()=>{let e=Jo,t=localStorage.getItem(Co);if(t)try{e=JSON.parse(t)}catch{}return e[Math.floor(Math.random()*e.length)]},sendBroadcast:async e=>{let t={...e,date:new Date().toISOString(),id:Date.now().toString()};return await Se._performOp("new_broadcast",t)},updateBroadcast:async(e,t)=>{let n={id:e,...t};return await Se._performOp("update_broadcast",n)},deleteBroadcast:async e=>await Se._performOp("delete_broadcast",{id:e}),_performOp:async(e,t)=>{try{console.log(`\u{1F4E4} Executando ${e}...`,t);let n=await kt(e,t);return n&&n.status==="success"?(console.log("\u2705 Sucesso:",e),!0):(console.warn("\u26A0\uFE0F Falha:",n),!1)}catch(n){return console.error("\u274C Erro JSONP:",n),!1}},logEvent:(e,t,n="",o=null)=>{try{let s="anon";try{let a=Ct();a&&(s=a.split("@")[0].toLowerCase())}catch{}let i={timestamp:new Date().toISOString(),user:s,version:"v5.0",category:e,action:t,label:n,value:o||""};kt("log",i).catch(a=>{})}catch(s){console.warn("Analytics error",s)}},logUsage:()=>{}};var pe={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5"},Ot=e=>new Promise(t=>setTimeout(t,e));function Ao(e){let t="cw-command-center-style";if(!document.getElementById(t)){let g=document.createElement("style");g.id=t,g.innerHTML=`
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
                
                background: ${pe.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${pe.glassBorder}; border-radius: 50px;
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

            /* --- CASCATAS --- */
            .cw-pill.collapsed > *:nth-last-child(n) { transition-delay: 0s; }
            .cw-pill:not(.collapsed) > *:nth-child(1) { transition-delay: 0.30s; }
            .cw-pill:not(.collapsed) > *:nth-child(2) { transition-delay: 0.34s; }
            .cw-pill:not(.collapsed) > *:nth-child(3) { transition-delay: 0.38s; }
            .cw-pill:not(.collapsed) > *:nth-child(4) { transition-delay: 0.42s; }
            .cw-pill:not(.collapsed) > *:nth-child(5) { transition-delay: 0.46s; }
            .cw-pill:not(.collapsed) > *:nth-child(6) { transition-delay: 0.50s; }
            .cw-pill:not(.collapsed) > *:nth-child(7) { transition-delay: 0.54s; }
            .cw-pill:not(.collapsed) > *:nth-child(8) { transition-delay: 0.58s; }
            .cw-pill:not(.collapsed) > *:nth-child(9) { transition-delay: 0.62s; }

            /* --- ESTILOS DOS BOT\xD5ES --- */
            .cw-btn {
                width: 40px; height: 40px; 
                border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center; 
                cursor: pointer; position: relative; color: ${pe.iconIdle};
                flex-shrink: 0;
            }
            .cw-btn:hover { background: ${pe.glassHighlight}; color: ${pe.iconActive}; transform: scale(1.1) !important; }

            .cw-btn.notes.active { color: ${pe.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${pe.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${pe.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${pe.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.broadcast.active { color: ${pe.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${pe.teal} !important; background: rgba(0, 191, 165, 0.15); }

            .cw-btn.notes:hover { color: ${pe.blue}; filter: drop-shadow(0 0 5px rgba(138, 180, 248, 0.5)); }
            .cw-btn.email:hover { color: ${pe.red}; filter: drop-shadow(0 0 5px rgba(242, 139, 130, 0.5)); }
            .cw-btn.script:hover { color: ${pe.purple}; filter: drop-shadow(0 0 5px rgba(197, 138, 249, 0.5)); }
            .cw-btn.links:hover { color: ${pe.green}; filter: drop-shadow(0 0 5px rgba(129, 201, 149, 0.5)); }
            .cw-btn.broadcast:hover { color: ${pe.orange}; filter: drop-shadow(0 0 5px rgba(249, 171, 0, 0.5)); }
            .cw-btn.timezone:hover { color: ${pe.teal}; filter: drop-shadow(0 0 5px rgba(0, 191, 165, 0.5)); }

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
            .cw-grip-bar { width: 24px; height: 4px; background-color: ${pe.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            .cw-pill.dragging .cw-grip-bar { background-color: ${pe.blue}; width: 16px; opacity: 1; }

            /* ============================================================
               NOVO ESTILO DO PROCESSING CENTER (Revisado & Corrigido)
               ============================================================ */
            .cw-pill.processing-center {
                top: 50% !important; left: 50% !important;
                transform: translate(-50%, -50%) !important;
                /* Largura um pouco maior para acomodar texto melhor */
                width: 340px !important; 
                /* Altura autom\xE1tica com m\xEDnimo, para n\xE3o cortar conte\xFAdo */
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
                gap: 20px; /* Espa\xE7o uniforme entre elementos */
                width: 100%; opacity: 0; 
                animation: fadeIn 0.4s ease forwards 0.1s; 
                position: relative; 
            }
            
            .cw-center-dots { display: flex; gap: 8px; margin-bottom: 4px; }
            .cw-center-dots span { width: 8px; height: 8px; border-radius: 50%; animation: googleBounce 1.4s infinite ease-in-out both; }
            .cw-center-dots span:nth-child(1) { background-color: ${pe.blue}; animation-delay: -0.32s; }
            .cw-center-dots span:nth-child(2) { background-color: ${pe.red}; animation-delay: -0.16s; }
            .cw-center-dots span:nth-child(3) { background-color: ${pe.green}; }
            
            .cw-center-text { 
                font-family: 'Google Sans', Roboto, sans-serif;
                font-size: 15px; /* Fonte maior */
                color: #E8EAED; /* Branco suave */
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
            
            .cw-center-success { display: none; color: ${pe.green}; margin-bottom: 10px; }
            .cw-center-success svg { width: 48px; height: 48px; }
            .cw-center-success.show { display: block; animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            
            /* Bot\xE3o Cancelar Corrigido (Dentro do fluxo) */
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
        `,document.head.appendChild(g)}let n={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>'},o=document.createElement("div");o.className="cw-pill side-right collapsed",o.innerHTML=`
        <div class="cw-main-logo">${n.main}</div>

        <div class="cw-grip" title="Arrastar">
            <div class="cw-grip-bar"></div>
        </div>
        <button class="cw-btn notes" id="cw-btn-notes" data-label="Case Notes">${n.notes}</button>
        <button class="cw-btn email" id="cw-btn-email" data-label="Quick Email">${n.email}</button>
        <button class="cw-btn script" id="cw-btn-script" data-label="Call Script">${n.script}</button>
        <button class="cw-btn links" id="cw-btn-links" data-label="Links">${n.links}</button>

<button class="cw-btn timezone" id="cw-btn-timezone" data-label="Time Zones">${n.timezone}</button>
        <div class="cw-sep"></div>
        <button class="cw-btn broadcast" id="cw-btn-broadcast" data-label="Avisos">${n.broadcast}</button>
        <div class="cw-status-container">
            <div class="cw-dots" id="cw-loader"><span></span><span></span><span></span></div>
            <div class="cw-check" id="cw-success" style="display:none;">${n.check}</div>
        </div>
    `;let s=document.createElement("div");s.className="cw-focus-backdrop",document.body.appendChild(s),document.body.appendChild(o);let i=(g,v)=>{let E=o.querySelector(`.${g}`);o.querySelectorAll(".cw-btn").forEach(V=>{V!==E&&V.classList.remove("active")}),E.classList.toggle("active"),v()};if(o.querySelector(".notes").onclick=g=>{g.stopPropagation(),i("notes",e.toggleNotes)},o.querySelector(".email").onclick=g=>{g.stopPropagation(),i("email",e.toggleEmail)},o.querySelector(".script").onclick=g=>{g.stopPropagation(),i("script",e.toggleScript)},o.querySelector(".links").onclick=g=>{g.stopPropagation(),i("links",e.toggleLinks)},o.querySelector(".timezone").onclick=g=>{g.stopPropagation(),i("timezone",e.toggleTimezone)},o.querySelector(".broadcast").onclick=g=>{g.stopPropagation(),i("broadcast",()=>{let v=g.currentTarget.querySelector(".cw-badge");v&&v.remove(),e.broadcastControl&&e.broadcastControl.toggle()})},e.broadcastControl&&e.broadcastControl.hasUnread){let g=document.createElement("div");g.className="cw-badge",o.querySelector(".broadcast").appendChild(g)}let a=null;o.onmouseleave=()=>{o.querySelector(".cw-btn.active")||o.classList.contains("processing-center")||(a=setTimeout(()=>{o.classList.add("collapsed")},3e3))},o.onmouseenter=()=>{a&&clearTimeout(a)},(async function(){await Ot(2800),o.classList.add("docked"),await Ot(300);let v=o.querySelectorAll(".cw-btn");o.querySelectorAll(".cw-sep").forEach(E=>E.classList.add("visible"));for(let E=0;E<v.length;E++)v[E].classList.add("popped"),await Ot(90);await Ot(200),o.classList.add("system-check")})();let r=!1,d,h,p,c,x=3;o.onmousedown=g=>{if(g.target.closest("button"))return;g.preventDefault(),d=g.clientX,h=g.clientY;let v=o.getBoundingClientRect();p=v.left,c=v.top,document.addEventListener("mousemove",u),document.addEventListener("mouseup",f)};function u(g){let v=g.clientX-d,E=g.clientY-h;!r&&Math.sqrt(v*v+E*E)>x&&(r=!0,o.style.transition="none",a&&clearTimeout(a)),r&&(o.style.left=`${p+v}px`,o.style.top=`${c+E}px`,o.style.right="auto",o.style.bottom="auto",o.style.transform="none")}function f(g){if(document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",f),r){r=!1;let v=window.innerWidth,E=window.innerHeight,V=o.getBoundingClientRect(),j=V.left+V.width/2,P;j<v/2?(P=24,o.classList.remove("side-right"),o.classList.add("side-left")):(P=v-V.width-24,o.classList.remove("side-left"),o.classList.add("side-right"));let A=Math.max(24,Math.min(V.top,E-V.height-24));setTimeout(()=>{o.style.setProperty("transition","left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)","important"),o.style.left=`${P}px`,o.style.top=`${A}px`,o.style.bottom="auto",o.style.transform=""},10),setTimeout(()=>{o.style.transition="",o.style.removeProperty("transition")},700)}else{let v=o.querySelector(".cw-btn.active"),E=g.target.closest("button");if(o.classList.contains("collapsed")){let V=o.getBoundingClientRect(),j=window.innerHeight,P=V.top>j/2;if(o.style.setProperty("transition","none","important"),P){let A=j-V.bottom;o.style.top="auto",o.style.bottom=`${A}px`}else o.style.bottom="auto",o.style.top=`${V.top}px`;o.offsetWidth,o.style.removeProperty("transition"),o.classList.remove("collapsed")}else!v&&!E&&o.classList.add("collapsed");E&&(E.style.transform="scale(0.9)",setTimeout(()=>E.style.transform="",150))}}}function It(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop");if(!e)return()=>{};e.classList.remove("collapsed"),window._CW_ABORT_PROCESS=!1;let n=document.createElement("div");n.className="cw-center-stage",n.innerHTML=`
      <div class="cw-center-dots"><span></span><span></span><span></span></div>
      <div class="cw-center-text">${Se.getRandomTip()}</div>
      <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
  `;let o=document.createElement("div");o.className="cw-abort-btn",o.textContent="Cancelar",o.onclick=i=>{i.stopPropagation(),window._CW_ABORT_PROCESS=!0,U("Cancelado!",{duration:3e3}),n.remove(),e.classList.remove("processing-center"),e.classList.remove("success"),e.classList.add("collapsed"),t&&t.classList.remove("active")},n.appendChild(o),e.appendChild(n);let s=Date.now();return e.classList.add("processing-center"),t&&t.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!e.contains(n))return;let a=Date.now()-s,r=Math.max(0,2e3-a);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!e.contains(n))return;let d=n.querySelector(".cw-center-dots"),h=n.querySelector(".cw-center-text"),p=n.querySelector(".cw-center-success"),c=n.querySelector(".cw-abort-btn");d&&(d.style.display="none"),h&&(h.style.display="none"),c&&(c.style.display="none"),p&&p.classList.add("show"),e.classList.add("success"),setTimeout(()=>{e.classList.remove("processing-center"),setTimeout(()=>{n.remove(),e.classList.remove("success"),e.classList.add("collapsed"),t&&t.classList.remove("active")},400)},1e3)},r)}}function So(e){let t=document.createElement("div");t.className="cw-step-scenarios";let n=document.createElement("div");Object.assign(n.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let o=document.createElement("div");Object.assign(o.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"40px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s ease"}),o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>";let s=null;Object.entries(Le).forEach(([a,r])=>{let d=document.createElement("div");d.textContent=a,Object.assign(d.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",display:"flex",alignItems:"center",gap:"6px"}),d.onmouseenter=()=>{s!==r&&(o.style.background="#fff",o.style.borderColor="#1a73e8",o.style.color="#202124",o.textContent=`"${r.substring(0,120)}${r.length>120?"...":""}"`),s!==r&&(d.style.background="#f1f3f4")},d.onmouseleave=()=>{s!==r&&(s||(o.style.background="#f8f9fa",o.style.borderColor="#dadce0",o.style.color="#5f6368",o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>"),d.style.background="#ffffff")},d.onclick=()=>{Q.playClick(),s===r?(s=null,i(),e("")):(s=r,i(),d.style.transform="scale(0.95)",setTimeout(()=>d.style.transform="scale(1)",150),e(r))},n.appendChild(d)});function i(){Array.from(n.children).forEach(a=>{Le[a.textContent]===s?(a.style.background="#e8f0fe",a.style.borderColor="#1a73e8",a.style.color="#1967d2",a.style.fontWeight="500"):(a.style.background="#ffffff",a.style.borderColor="#dadce0",a.style.color="#3c4043",a.style.fontWeight="400")})}return t.appendChild(n),t.appendChild(o),t}var Eo=e=>new Promise(t=>setTimeout(t,e));function qt(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>e.dispatchEvent(new MouseEvent(n,t)))}function mt(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let n=document.createRange();n.selectNodeContents(t);let o=window.getSelection();o.removeAllRanges(),o.addRange(n);try{document.execCommand("copy")}catch{U("Falha ao copiar",{error:!0})}o.removeAllRanges(),document.body.removeChild(t)}function Ft(e){["input","change","keydown","keyup"].forEach(n=>{let o=new Event(n,{bubbles:!0,cancelable:!0});e.dispatchEvent(o)})}function To(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function Lt(){console.log("Iniciando processo de Nova Nota...");let e=To(),t=e.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(a=>a.innerText.trim()==="description");if(o){let a=o.closest("material-fab")||o.closest("material-button");a?(a.style&&(a.style.display="block",a.style.visibility="visible"),qt(a)):qt(o)}else{let a=document.querySelector("material-fab-speed-dial");if(a){let r=a.querySelector(".trigger");r?(r.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),qt(r)):a.click(),await Eo(800);let h=Array.from(document.querySelectorAll("i.material-icons-extended")).find(p=>p.innerText.trim()==="description");h&&qt(h)}}let s=null,i=0;for(;!s&&i<20;){await Eo(300);let a=To();if(a.length>t)s=a.find(r=>!e.includes(r)),s||(s=a[a.length-1]);else if(i>10){let r=a.filter(d=>d.offsetParent!==null);r.length>0&&(s=r[r.length-1])}i++}return s}var oe={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},Ne="cubic-bezier(0.25, 0.8, 0.25, 1)",en={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${oe.border}`,backgroundColor:oe.bgInput,fontSize:"14px",color:oe.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${Ne}, box-shadow 0.2s ${Ne}, background-color 0.2s`,outline:"none"},zn={...en,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},Bn={fontSize:"13px",fontWeight:"700",color:oe.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},Gn={display:"block",fontSize:"13px",fontWeight:"600",color:oe.text,marginBottom:"8px",marginTop:"16px"},Pn={fontSize:"12px",color:oe.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},jn={fontSize:"12px",color:oe.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},Hn={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:oe.text,cursor:"pointer",padding:"12px 14px",backgroundColor:oe.surface,border:`1px solid ${oe.border}`,borderRadius:"12px",transition:`all 0.2s ${Ne}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},Yt={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:oe.primary},$n={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:oe.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${Ne}, box-shadow 0.2s ${Ne}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},Vn={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${oe.primary}`,color:oe.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${Ne}`},Un={background:"transparent",border:`1px solid ${oe.border}`,borderRadius:"20px",color:oe.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${Ne}`,fontFamily:"'Google Sans', 'Roboto'"};var Wn={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:oe.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},Yn={fontSize:"13px",fontWeight:"700",color:oe.primary,minWidth:"20px",textAlign:"center"},Xn={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${oe.border}`,backgroundColor:oe.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${Ne}, box-shadow 0.2s ${Ne}`},Kn={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${oe.bgInput}`},Qn={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${oe.border}`,backgroundColor:oe.surface,color:oe.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${Ne}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},Zn={backgroundColor:oe.primaryBg,color:oe.primary,borderColor:oe.primary,fontWeight:"600"},Jn={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:oe.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},ea={borderTop:`1px solid ${oe.bgInput}`,paddingTop:"20px",marginTop:"16px"};var ta={maxHeight:"240px",overflowY:"auto",border:`1px solid ${oe.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:oe.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},oa={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${oe.bgInput}`,cursor:"pointer",fontSize:"13px",color:oe.text,transition:"background 0.1s",userSelect:"none"};var tn={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},on={fontSize:"12px",color:"#e37400",marginTop:"4px"},nn={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},an={display:"flex",gap:"15px",marginBottom:"10px"};function ko(){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,tn);let t=document.createElement("label");t.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(t.style,jt,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,an);let o=document.createElement("input");o.type="radio",o.name="ts_usage_mod",o.value="Sim",Object.assign(o.style,Yt);let s=document.createElement("label");s.textContent="Sim";let i=document.createElement("div");Object.assign(i.style,{display:"flex",alignItems:"center"}),i.appendChild(o),i.appendChild(s);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="N\xE3o",a.checked=!0,Object.assign(a.style,Yt);let r=document.createElement("label");r.textContent="N\xE3o";let d=document.createElement("div");Object.assign(d.style,{display:"flex",alignItems:"center"}),d.appendChild(a),d.appendChild(r),n.appendChild(i),n.appendChild(d);let h=document.createElement("div");h.style.display="block";let p=document.createElement("label");p.textContent="Qual foi o Motivo?",Object.assign(p.style,jt,{fontSize:"12px"});let c=document.createElement("input");c.type="text",Object.assign(c.style,nn);let x=document.createElement("div");x.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(x.style,on),h.appendChild(p),h.appendChild(c),h.appendChild(x),e.appendChild(t),e.appendChild(n),e.appendChild(h),o.onchange=()=>{h.style.display="none"},a.onchange=()=>{h.style.display="block"};function u(v,E){if(e.style.display="none",!v||v.includes("Education")||!E||E.length===0)return;let V=E.some(S=>S.includes("enhanced")||S==="ec_google_ads"),j=E.some(S=>(S.includes("conversion")||S.includes("ads"))&&!S.includes("enhanced")),P=E.some(S=>S.includes("ga4")||S.includes("analytics")||S.includes("ua")),A=E.some(S=>S.includes("merchant")||S.includes("gmc")||S.includes("shopping"));(V||j&&!P&&!A)&&(e.style.display="block")}function f(){if(e.style.display==="none")return"";let v=`<br><b>Utilizou Tag Support?</b> ${o.checked?"Sim":"N\xE3o"}`;return a.checked&&c.value.trim()!==""&&(v+=`<br><b>Motivo:</b> ${c.value}`),v+="<br>",v}function g(){e.style.display="none",a.checked=!0,o.checked=!1,h.style.display="block",c.value=""}return{element:e,updateVisibility:u,getOutput:f,reset:g}}var J={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Je={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function Oo(e){let t={},n="implementation";function o(A){let T=A.toLowerCase();return T.includes("ads")||T.includes("conversion")||T.includes("remarketing")?J.brands.ads:T.includes("ga4")||T.includes("analytics")?J.brands.ga4:T.includes("gtm")||T.includes("tag manager")||T.includes("container")?J.brands.gtm:T.includes("merchant")||T.includes("shopping")||T.includes("feed")?J.brands.gmc:J.brands.default}let s=Object.entries(je).filter(([A,T])=>T.popular),i={};Object.entries(je).forEach(([A,T])=>{if(T.popular)return;let S=o(T.name);i[S.label]||(i[S.label]={brand:S,tasks:[]}),i[S.label].tasks.push({key:A,...T})});let a="cw-zen-tasks";if(!document.getElementById(a)){let A=document.createElement("style");A.id=a,A.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column; height: 100%; width: calc(100% + 32px); margin: -16px;
                font-family: ${J.font}; background: ${J.bg}; position: relative; overflow: hidden;
            }
            
            /* SCROLL AREA */
            .cw-zen-content { flex: 1; overflow-y: auto; padding-bottom: 80px; } /* Espa\xE7o para o Status Bar */

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${J.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${J.white}; 
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
                font-size: 12px; font-weight: 500; color: ${J.textMain}; line-height: 1.2; 
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
                color: ${J.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${J.border}; border-radius: 10px; background: ${J.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${J.blue}; box-shadow: 0 0 0 3px ${J.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${J.border}; border-radius: 10px; background: ${J.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${J.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${J.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${J.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${J.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${J.blueLight}; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${J.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${J.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${J.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${J.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${J.border};
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${J.shadowFloat}; z-index: 10;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${J.textMain}; }
            
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
                font-family: ${J.font}; font-size: 15px; font-weight: 600; color: ${J.textMain};
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
                border-color: ${J.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${J.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${J.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${J.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 10px; font-weight: 700; color: ${J.textSub};
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
        `,document.head.appendChild(A)}let r=document.createElement("div");r.className="cw-zen-container";let d=document.createElement("div");Object.assign(d.style,{display:"none"});let h=document.createElement("div");h.className="cw-screens-container",d.appendChild(h),r.innerHTML=`
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
    `;let p=r.querySelector(".cw-hero-grid"),c=r.querySelector(".cw-acc-container"),x=r.querySelector(".cw-results-container"),u=r.querySelector(".cw-search-input"),f=r.querySelector(".cw-status-bar"),g=r.querySelector(".cw-status-text"),v=r.querySelector(".cw-footer-icons");s.forEach(([A,T])=>{let S=o(T.name),q=document.createElement("div");q.className="cw-hero-card",q.id=`hero-${A}`,q.style.setProperty("--hero-color",S.color),q.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${Je[S.icon]}</div>
                <div class="cw-hero-label">${T.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,q.onclick=I=>{if(I.target.closest(".cw-step-btn"))return;let C=t[A]?t[A].count:0;V(A,C>0?-C:1,T)},q.querySelector(".minus").onclick=()=>V(A,-1,T),q.querySelector(".plus").onclick=()=>V(A,1,T),q.dataset.color=S.color,p.appendChild(q)});function E(A,T){let S=o(T.name),q=document.createElement("div");return q.className="cw-task-item",q.dataset.id=A,q.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${S.bg}; color:${S.color}">
                    ${Je[S.icon]||Je.default}
                </div>
                <div class="cw-task-label">${T.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,q.onclick=I=>{if(I.target.closest(".cw-step-btn"))return;let C=t[A]?t[A].count:0;V(A,C>0?-C:1,T)},q.querySelector(".minus").onclick=()=>V(A,-1,T),q.querySelector(".plus").onclick=()=>V(A,1,T),q}Object.entries(i).forEach(([A,T])=>{let S=document.createElement("div");S.className="cw-acc-group";let q=document.createElement("div");q.className="cw-acc-header",q.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${T.brand.color}"></div>
                ${A}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,q.onclick=()=>{c.querySelectorAll(".cw-acc-group.open").forEach(C=>{C!==S&&C.classList.remove("open")}),S.classList.toggle("open")};let I=document.createElement("div");I.className="cw-acc-body",T.tasks.forEach(C=>{let L=E(C.key,C);I.appendChild(L)}),S.appendChild(q),S.appendChild(I),c.appendChild(S)});function V(A,T,S){t[A]||(t[A]={count:0,data:S,brand:o(S.name)}),t[A].count+=T,t[A].count<=0&&delete t[A],j(),P(),e&&e()}function j(){s.forEach(([I])=>{let C=p.querySelector(`#hero-${I}`);if(!C)return;let L=t[I];L?(C.classList.add("active"),C.querySelector(".cw-step-val").textContent=L.count,C.querySelector(".cw-step-val").style.color=C.dataset.color):C.classList.remove("active")}),r.querySelectorAll(".cw-task-item").forEach(I=>{let C=I.dataset.id,L=t[C];L?(I.classList.add("selected"),I.querySelector(".cw-step-val").textContent=L.count):I.classList.remove("selected")});let T=Object.keys(t),S=0,q=[];if(T.forEach(I=>{let C=t[I];S+=C.count;for(let L=0;L<C.count;L++)q.length<6&&q.push(C.brand)}),S>0){f.classList.add("visible");let I=S>1?"A\xE7\xF5es":"A\xE7\xE3o",C=S>1?"definidas":"definida";g.textContent=`${S} ${I} ${C}`,v.innerHTML="",q.forEach(L=>{let O=document.createElement("div");O.className="cw-mini-icon",O.innerHTML=Je[L.icon]||Je.default;let F=O.querySelector("svg");F&&(F.style.width="14px",F.style.height="14px"),v.appendChild(O)})}else f.classList.remove("visible")}u.addEventListener("input",A=>{let T=A.target.value.toLowerCase();if(T.length>0){c.style.display="none",x.style.display="block",x.innerHTML="";let S=!1;Object.entries(je).forEach(([q,I])=>{if(I.name.toLowerCase().includes(T)){S=!0;let C=E(q,I);t[q]&&(C.classList.add("selected"),C.querySelector(".cw-step-val").textContent=t[q].count),x.appendChild(C)}}),S||(x.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else c.style.display="block",x.style.display="none"});function P(){h.innerHTML="";let A=Object.keys(t),T=!1,S=document.getElementById("sub-status"),q="implementation";if(S&&S.value.toLowerCase().includes("education")&&(q="education"),A.length===0){h.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}if(A.length===0){h.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}let I=document.createElement("div");I.className="cw-info-banner",I.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Todos os Screenshots s\xE3o baseados na descri\xE7\xE3o do 
                <a href="https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/" target="_blank" class="cw-info-link">Win Criteria</a>.
            </span>
        `,h.appendChild(I),A.forEach(C=>{let L=t[C].data,O=t[C].count,F=t[C].brand,B=L.screenshots?L.screenshots[q]||[]:["Link da Evid\xEAncia"];if(B.length>0){T=!0;for(let l=1;l<=O;l++){let m=document.createElement("div");m.className="cw-screen-card",m.style.setProperty("--brand-color",F.color),m.style.setProperty("--brand-bg",F.bg),m.style.setProperty("--brand-shadow",F.color+"40");let y=document.createElement("div");y.className="cw-card-header";let w=document.createElement("div");w.className="cw-card-icon",w.innerHTML=Je[F.icon]||Je.default;let D=document.createElement("div");D.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let N=document.createElement("input");N.className="cw-card-title-input",N.id=`name-${C}-${l}`,N.value=`${L.name}${O>1?" #"+l:""}`,N.title="Clique para renomear esta task";let k=document.createElement("span");k.className="cw-edit-hint",k.innerHTML="\u270E Renomear",D.appendChild(N),D.appendChild(k),y.appendChild(w),y.appendChild(D),m.appendChild(y),B.forEach((M,z)=>{let H=document.createElement("div");H.className="cw-input-group";let Y=document.createElement("label");Y.className="cw-input-label",Y.textContent=M.replace(/📷|:|•/g,"").trim();let _=document.createElement("input");_.className="cw-input-field",_.id=`screen-${C}-${l}-${z}`,_.placeholder="Cole o link aqui...",_.setAttribute("autocomplete","off"),_.addEventListener("input",()=>{_.value.trim().length>5?_.classList.add("filled"):_.classList.remove("filled")});let G=document.createElement("div");G.className="cw-input-check",G.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',H.appendChild(Y),H.appendChild(_),H.appendChild(G),m.appendChild(H)}),h.appendChild(m)}}}),d.style.display=T?"block":"none"}return{selectionElement:r,screenshotsElement:d,updateSubStatus:()=>P(),getCheckedElements:()=>Object.keys(t).map(A=>({value:A,closest:()=>({querySelector:()=>({textContent:t[A].count})})})),toggleTask:(A,T=!0)=>{let S=t[A];T&&!S?V(A,1,je[A]):!T&&S&&V(A,-S.count,je[A])},setMode:A=>{n=A,P()},reset:()=>{for(let A in t)delete t[A];u.value="",c.style.display="block",x.style.display="none",j(),P()}}}function Io(e){let t=document.createElement("div");t.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let n=document.createElement("div");n.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let o=document.createElement("div");o.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",t.appendChild(o),t.appendChild(n),n.addEventListener("scroll",()=>{o.style.boxShadow=n.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let s={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},i={};function a({id:j,label:P,type:A="text",placeholder:T="",required:S=!1,parent:q=n}){let I=document.createElement("div");I.style.cssText=s.inputWrapper;let C=document.createElement("label");C.style.cssText=s.label,C.innerHTML=`${P} ${S?'<span style="color:#D93025">*</span>':""}`;let L;return A==="textarea"?(L=document.createElement("textarea"),L.style.cssText=s.input+s.textarea):(L=document.createElement("input"),L.type=A,L.style.cssText=s.input),L.id=j,L.placeholder=T,L.addEventListener("focus",()=>{L.style.borderColor="#1a73e8",L.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),L.addEventListener("blur",()=>{L.style.borderColor="#DADCE0",L.style.boxShadow="none",S&&L.value.trim()!==""&&(L.style.backgroundColor="#FFF")}),i[j]={input:L,wrapper:I,required:S},I.appendChild(C),I.appendChild(L),q.appendChild(I),I}function r({id:j,label:P,options:A=["Yes","No"],defaultValue:T="No",onChange:S=null}){let q=document.createElement("div");q.style.cssText=s.inputWrapper;let I=document.createElement("label");I.style.cssText=s.label,I.textContent=P,q.appendChild(I);let C=document.createElement("div");C.style.cssText=s.radioGroup;let L=document.createElement("input");return L.type="hidden",L.id=j,L.value=T,q.appendChild(L),A.forEach(O=>{let F=document.createElement("div");F.textContent=O,F.style.cssText=s.radioLabel,O===T&&(F.style.cssText+=s.radioActive),F.onclick=()=>{Array.from(C.children).forEach(l=>l.style.cssText=s.radioLabel),F.style.cssText+=s.radioActive,L.value=O,S&&S(O)},C.appendChild(F)}),i[j]={input:L,wrapper:q,required:!1},q.appendChild(C),n.appendChild(q),q}let d=document.createElement("div");d.style.cssText=s.banner,d.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,n.appendChild(d);let h=document.createElement("div");h.style.marginBottom="24px";let p=document.createElement("button");p.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",p.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",p.onmouseover=()=>p.style.background="#E1EFFF",p.onmouseout=()=>p.style.background="#F0F7FF",h.appendChild(p),n.appendChild(h);let c=document.createElement("div");c.style.cssText=s.section,c.innerHTML=`<div style="${s.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,n.appendChild(c),a({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:c}),a({id:"ga4",label:"GA4 Property ID",parent:c}),a({id:"gtm",label:"GTM Container ID",parent:c});let x=document.createElement("div");x.style.cssText=s.hiddenField,c.appendChild(x),r({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:j=>{j==="Yes"?x.style.cssText=s.visibleField+"margin-bottom:14px;":(x.style.cssText=s.hiddenField,i.accessEmail.input.value="")}}),a({id:"accessEmail",label:"User Access Email",parent:x}),r({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let u=document.createElement("div");u.style.cssText=s.section,u.innerHTML=`<div style="${s.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,n.appendChild(u),a({id:"name",label:"Advertiser Name",required:!0,parent:u}),a({id:"url",label:"Website URL",parent:u}),a({id:"phone",label:"Phone Number",parent:u}),a({id:"email",label:"Contact Email",parent:u}),a({id:"callback",label:"Preferred Callback Time (Timezone)",parent:u}),a({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:"Descreva o erro, passos para reproduzir...",required:!0,parent:u}),a({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:"O que voc\xEA j\xE1 testou?",parent:u}),a({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:u});let f=document.createElement("div");f.style.cssText=s.section,f.innerHTML=`<div style="${s.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,n.appendChild(f),a({id:"cc_adv",label:"Advertiser Contact",parent:f}),a({id:"cc_am",label:"Account Manager",parent:f});let g=document.createElement("div");g.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let v=document.createElement("button");v.innerHTML="Voltar",v.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",v.onclick=e;let E=document.createElement("button");E.textContent="Gerar Nota",E.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",g.appendChild(v),g.appendChild(E),t.appendChild(g),p.onclick=async()=>{let j=p.innerHTML;p.innerHTML="\u23F3 Buscando dados...";try{let P=await Re(),A=0,T=(I,C)=>{let L=i[I];C&&L&&L.input.value===""&&(L.input.value=C,L.input.style.backgroundColor="#E6F4EA",L.input.style.borderColor="#34A853",setTimeout(()=>{L.input.style.backgroundColor="#FFF",L.input.style.borderColor="#DADCE0"},1e3),A++)};T("name",P.advertiserName),T("url",P.websiteUrl),P.clientEmail&&(T("email",P.clientEmail),T("cc_adv",P.clientEmail));let q=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);q&&T("cid",q[0]),A>0?U(`${A} campos preenchidos!`):U("Nenhum dado novo encontrado.")}catch(P){console.error(P),U("Erro ao ler p\xE1gina.")}finally{p.innerHTML=j}};let V=()=>{let j=!0,P=null;return Object.values(i).forEach(A=>{A.required&&!A.input.value.trim()&&(j=!1,A.input.style.cssText+=s.inputError,A.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),P||(P=A.input))}),P&&P.scrollIntoView({behavior:"smooth",block:"center"}),j};return E.onclick=async()=>{if(!V()){U("Preencha os campos obrigat\xF3rios.",{isError:!0});return}let j=I=>i[I].input.value||"N/A",P=j("hasAccess"),A=P==="Yes"?j("accessEmail"):"N/A",S=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${j("cid")}
<b>GA4 ID:</b> ${j("ga4")}
<b>GTM ID:</b> ${j("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${P==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${A}
<b>Ghosting Access Available (Y/N):</b> ${j("ghosting")==="Yes"?"Y":"N"}
<b>Name of advertiser:</b> ${j("name")}
<b>Website:</b> ${j("url")}
<b>Phone Number:</b> ${j("phone")}
<b>Preferred Callback:</b> ${j("callback")}
<b>Email Address:</b> ${j("email")}

<b>Detailed Issue Description:</b>
${j("desc")}

<b>Uncropped screenshots:</b>
${j("screens")}

<b>Checks performed by Technical Solutions Team:</b>
${j("checks")}

[IMP] Contacts to be copied
<b>Advertiser contact:</b> ${j("cc_adv")}
<b>Account Manager:</b> ${j("cc_am")}
`.replace(/\n/g,"<br>");mt(S);let q=await Lt();q?(q.innerText.trim()===""&&(q.innerHTML=""),document.execCommand("insertHTML",!1,S),Ft(q),U("Nota gerada e inserida!")):U("Copiado! Abra uma nota para colar.")},t}var Xt="cw_notes_parking_lot";var Ge={getAll:()=>{try{return JSON.parse(localStorage.getItem(Xt)||"[]")}catch{return[]}},save:e=>{let t=Ge.getAll(),n={id:Date.now().toString(),timestamp:new Date().toISOString(),...e};return t.unshift(n),t.length>5&&t.pop(),localStorage.setItem(Xt,JSON.stringify(t)),n},delete:e=>{let t=Ge.getAll();return t=t.filter(n=>n.id!==e),localStorage.setItem(Xt,JSON.stringify(t)),t},getCount:()=>Ge.getAll().length};function qo(e){let{onSaveCurrent:t,onLoadDraft:n}=e,o=document.createElement("button");o.innerHTML='<span style="font-size:16px">\u23F8\uFE0F</span> Estacionar',o.style.cssText=`
        flex: 0 0 auto; padding: 10px 16px; 
        background: #F1F3F4; color: #5F6368; 
        border: 1px solid transparent; borderRadius: 8px; 
        font-size: 13px; fontWeight: 600; cursor: pointer;
        display: flex; alignItems: center; gap: 6px;
        transition: all 0.2s;
    `,o.onmouseover=()=>{o.style.background="#E8F0FE",o.style.color="#1967D2"},o.onmouseout=()=>{o.style.background="#F1F3F4",o.style.color="#5F6368"},o.onclick=async()=>{if(confirm("Deseja estacionar o caso atual e limpar a tela?")){let u=await t();Ge.save(u),x(),a(),Q.playSuccess(),U("Caso estacionado com sucesso.")}};let s=document.createElement("div");s.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 4px;",s.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#5f6368"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>';let i=document.createElement("div");i.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: bold; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white;",s.appendChild(i),s.onmouseenter=()=>s.style.background="rgba(0,0,0,0.05)",s.onmouseleave=()=>s.style.background="transparent",s.onclick=u=>{u.stopPropagation(),c()};function a(){let u=Ge.getCount();u>0?(i.style.display="block",i.textContent=u,i.style.transform="scale(1.2)",setTimeout(()=>i.style.transform="scale(1)",200)):i.style.display="none"}let r=document.createElement("div");r.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 85%;
        background: #FFFFFF; z-index: 100;
        border-radius: 20px 20px 0 0;
        box-shadow: 0 -4px 20px rgba(0,0,0,0.15);
        transform: translateY(110%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex; flex-direction: column; overflow: hidden;
    `;let d=document.createElement("div");d.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",d.innerHTML='<span style="font-size:16px; font-weight:700; color:#202124;">Casos Estacionados</span>';let h=document.createElement("button");h.innerHTML="\u2715",h.style.cssText="background:none; border:none; font-size:18px; color:#5f6368; cursor:pointer;",h.onclick=()=>c(!1),d.appendChild(h);let p=document.createElement("div");p.style.cssText="flex: 1; overflow-y: auto; padding: 16px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",r.appendChild(d),r.appendChild(p);function c(u){let f=r.style.transform==="translateY(0%)";(u!==void 0?u:!f)?(x(),r.style.transform="translateY(0%)"):r.style.transform="translateY(110%)"}function x(){let u=Ge.getAll();if(p.innerHTML="",u.length===0){p.innerHTML='<div style="text-align:center; padding:40px; color:#9AA0A6;">Nenhum caso estacionado.</div>';return}u.forEach(f=>{let g=document.createElement("div");g.style.cssText=`
                background: #FFF; padding: 16px; border-radius: 12px;
                border: 1px solid #E0E0E0; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                position: relative; transition: all 0.2s;
            `;let v=new Date(f.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});g.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                    <div style="font-weight:700; color:#1A73E8; font-size:14px;">${f.clientName||"Cliente"}</div>
                    <div style="font-size:11px; color:#9AA0A6; font-family:monospace;">${v}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px;">
                    CID: ${f.cid||"N/A"}<br>
                    Status: <b>${f.subStatus||f.status||"N/A"}</b>
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#E8F0FE; color:#1967D2; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;">\u25B6 Retomar</button>
                    <button class="cw-del-btn" style="padding:8px 12px; background:#FCE8E6; color:#D93025; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;">\u{1F5D1}\uFE0F</button>
                </div>
            `,g.querySelector(".cw-resume-btn").onclick=()=>{confirm("Retomar este caso? O formul\xE1rio atual ser\xE1 substitu\xEDdo.")&&(n(f),Ge.delete(f.id),x(),a(),c(!1),Q.playSwoosh())},g.querySelector(".cw-del-btn").onclick=()=>{Ge.delete(f.id),x(),a()},p.appendChild(g)})}return a(),{parkButton:o,historyBtnWrapper:s,drawer:r}}function Fo(){let e="v3.8.0",t="bau",n="pt",o=!1,s=!1,i=!1,a={input:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},textarea:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease",height:"100px",resize:"vertical"},h3:{fontSize:"14px",fontWeight:"600",color:"#202124",margin:"0 0 12px 0"},label:{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},checkboxLabel:{display:"flex",alignItems:"center",marginBottom:"10px",fontSize:"14px",fontWeight:"400",cursor:"pointer",padding:"8px",background:"#f8f9fa",borderRadius:"6px",transition:"background-color 0.2s ease, box-shadow 0.2s ease",userSelect:"none"},checkboxInput:{width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"},buttonBase:{flex:"1 1 0",padding:"10px 0",color:"#fff",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"500",cursor:"pointer",marginTop:"16px"},stepBlock:{borderTop:"1px solid #eee",paddingTop:"12px",marginTop:"12px"},radioContainer:{display:"flex",gap:"15px",marginBottom:"10px"},optionalBtn:{width:"100%",padding:"10px",background:"white",border:"1px dashed #1a73e8",color:"#1a73e8",borderRadius:"6px",cursor:"pointer",fontWeight:"500",fontSize:"13px",marginBottom:"10px",transition:"all 0.2s"},helpLink:{fontSize:"12px",color:"#1a73e8",textDecoration:"none",cursor:"pointer",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"color 0.2s"}},r=ko(),d=Oo(()=>{let $=d.getCheckedElements().map(R=>R.value);k&&k.value&&r.updateVisibility(k.value,$)});async function h(){let b=await Re(),$={};_e.querySelectorAll("input, textarea").forEach(be=>$[be.id]=be.value);let K=d.getCheckedElements().map(be=>({key:be.value,count:parseInt(be.closest(".cw-task-item").querySelector(".cw-step-val")?.textContent||1)})),se=document.getElementById("tag-support-container"),ge=null;if(se){let be=se.querySelector('input[type="radio"]:checked'),he=se.querySelector('input[type="text"]');ge={choice:be?be.value:"N\xE3o",reason:he?he.value:""}}return{clientName:b.advertiserName,cid:b.cid,status:y.value,subStatus:k.value,caseType:t,lang:n,formData:$,activeTasks:K,tagSupportState:ge}}function p(b){b.lang&&yt(b.lang),b.caseType&&xt(b.caseType),b.status&&(y.value=b.status,y.dispatchEvent(new Event("change"))),setTimeout(()=>{b.subStatus&&(k.value=b.subStatus,k.dispatchEvent(new Event("change"))),setTimeout(()=>{if(b.formData&&Object.entries(b.formData).forEach(([$,R])=>{let K=document.getElementById($);K&&(K.value=R)}),d.reset(),b.activeTasks&&Array.isArray(b.activeTasks)&&b.activeTasks.forEach($=>{for(let R=0;R<$.count;R++)d.toggleTask($.key,!0)}),b.tagSupportState){let $=document.getElementById("tag-support-container");if($){let R=$.querySelector(`input[value="${b.tagSupportState.choice}"]`);if(R&&(R.checked=!0,R.dispatchEvent(new Event("change"))),b.tagSupportState.choice==="N\xE3o"&&b.tagSupportState.reason){let K=$.querySelector('input[type="text"]');K&&(K.value=b.tagSupportState.reason)}}}},100)},50)}let c=qo({onSaveCurrent:async()=>{let b=await h(),$=DraftService.save(b);return b},onLoadDraft:b=>{p(b)}}),x=g.querySelector(".cw-header-actions")||g.lastElementChild;x.insertBefore(c.historyBtnWrapper,x.firstChild),Pe.insertBefore(c.parkButton,Pe.firstChild),u.appendChild(c.drawer);let u=document.createElement("div");u.id="autofill-popup",u.classList.add("cw-module-window"),Object.assign(u.style,ke,{right:"100px",width:"450px",transition:"width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)"});let f={popup:u,googleLine:null},g=Oe(u,"Case Notes",e,"Gera notas padronizadas.",f,()=>zt());if(u.appendChild(g),x){let b=document.createElement("div");b.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',Object.assign(b.style,{width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease",marginLeft:"4px"}),b.title="Alternar para Split & Transfer",b.onmouseenter=()=>{b.style.background="rgba(255,255,255,0.1)",b.style.color="#FFF"},b.onmouseleave=()=>{i||(b.style.background="transparent",b.style.color="#9AA0A6")},b.onclick=$=>{$.stopPropagation(),j(b)},x.insertBefore(b,x.firstChild)}let v=document.createElement("div");Object.assign(v.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1"}),u.appendChild(v);let E=document.createElement("div");Object.assign(E.style,{flexGrow:"1",display:"none",overflow:"auto"});let V=Io(()=>j());E.appendChild(V),u.appendChild(E);function j(b){i=!i,i?(v.style.display="none",E.style.display="flex",f.googleLine&&(f.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)"),b&&(b.style.color="#C58AF9",b.style.background="rgba(197, 138, 249, 0.15)")):(v.style.display="block",E.style.display="none",f.googleLine&&(f.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"),b&&(b.style.color="#9AA0A6",b.style.background="transparent"))}let P=document.createElement("div");P.textContent="created by lucaste@",Object.assign(P.style,mo),u.appendChild(P);let A=document.createElement("div");A.id="step-lang-type";let T=document.createElement("label");Object.assign(T.style,a.label),A.appendChild(T);let S=document.createElement("div");Object.assign(S.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let q=document.createElement("div");q.textContent="Portugu\xEAs",q.classList.add("no-drag"),Object.assign(q.style,Ce);let I=document.createElement("div");I.textContent="Espa\xF1ol",I.classList.add("no-drag"),Object.assign(I.style,Ce),q.onclick=()=>yt("pt"),I.onclick=()=>yt("es"),S.appendChild(q),S.appendChild(I),A.appendChild(S),v.appendChild(A);let C=document.createElement("div");C.id="step-0-case-type";let L=document.createElement("label");Object.assign(L.style,a.label),C.appendChild(L);let O=document.createElement("div");Object.assign(O.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let F=document.createElement("div");F.textContent="BAU",F.classList.add("no-drag"),Object.assign(F.style,Ce);let B=document.createElement("div");B.textContent="LM",B.classList.add("no-drag"),Object.assign(B.style,Ce),F.onclick=()=>xt("bau"),B.onclick=()=>xt("lm"),O.appendChild(F),O.appendChild(B),C.appendChild(O),v.appendChild(C);let l=document.createElement("div");l.id="step-1-selection";let m=document.createElement("label");m.className="cw-input-label",m.textContent="Status Principal";let y=document.createElement("select");y.id="main-status",y.className="cw-select",y.innerHTML=`
      <option value="" disabled selected hidden>Selecione uma op\xE7\xE3o...</option>
      <option value="NI">NI - Need Info</option>
      <option value="SO">SO - Solution Offered</option>
      <option value="IN">IN - Inactive</option>
      <option value="AS">AS - Assigned</option>
      <option value="DC">DC - Discard</option>
  `;let w=document.createElement("div");w.style.cssText="display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; margin-bottom: 6px;";let D=document.createElement("label");D.className="cw-input-label",D.textContent="Sub-status",D.style.marginBottom="0";let N=document.createElement("a");N.href="https://seu-link-do-guia-aqui.com",N.target="_blank",N.className="cw-info-link",N.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; transform:translateY(1px)"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Guia de Substatus',Object.assign(N.style,a.helpLink),w.appendChild(D),w.appendChild(N);let k=document.createElement("select");k.id="sub-status",k.className="cw-select",k.disabled=!0,k.innerHTML='<option value="" disabled selected hidden>Aguardando status principal...</option>',l.appendChild(m),l.appendChild(y),l.appendChild(w),l.appendChild(k),v.appendChild(l);let M=document.createElement("div");M.id="step-1-1-portugal",Object.assign(M.style,a.stepBlock,{display:"none"});let z=document.createElement("label");Object.assign(z.style,a.label),M.appendChild(z);let H=document.createElement("div");Object.assign(H.style,a.radioContainer);let Y=document.createElement("div");Object.assign(Y.style,{display:"flex",alignItems:"center"});let _=document.createElement("input");_.type="radio",_.name="portugal-group",_.value="sim",Object.assign(_.style,a.checkboxInput);let G=document.createElement("label");G.htmlFor="portugal-sim",Object.assign(G.style,{cursor:"pointer"}),Y.appendChild(_),Y.appendChild(G);let X=document.createElement("div");Object.assign(X.style,{display:"flex",alignItems:"center"});let me=document.createElement("input");me.type="radio",me.name="portugal-group",me.value="nao",me.checked=!0,Object.assign(me.style,a.checkboxInput);let Ee=document.createElement("label");Ee.htmlFor="portugal-nao",Object.assign(Ee.style,{cursor:"pointer"}),X.appendChild(me),X.appendChild(Ee),H.appendChild(Y),H.appendChild(X),M.appendChild(H),v.appendChild(M);function ue(b){o=b,b?ie.style.display="block":ie.style.display="none"}_.onchange=()=>ue(!0),me.onchange=()=>ue(!1);let ie=document.createElement("div");ie.id="step-1-2-consent",Object.assign(ie.style,a.stepBlock,{display:"none"});let qe=document.createElement("label");Object.assign(qe.style,a.label),ie.appendChild(qe);let ce=document.createElement("div");Object.assign(ce.style,a.radioContainer);let le=document.createElement("div");Object.assign(le.style,{display:"flex",alignItems:"center"});let we=document.createElement("input");we.type="radio",we.name="consent-group",we.value="Sim",we.checked=!0,Object.assign(we.style,a.checkboxInput);let $e=document.createElement("label");$e.htmlFor="consent-sim",Object.assign($e.style,{cursor:"pointer"}),le.appendChild(we),le.appendChild($e);let bt=document.createElement("div");Object.assign(bt.style,{display:"flex",alignItems:"center"});let it=document.createElement("input");it.type="radio",it.name="consent-group",it.value="N\xE3o",Object.assign(it.style,a.checkboxInput);let ft=document.createElement("label");ft.htmlFor="consent-nao",Object.assign(ft.style,{cursor:"pointer"}),bt.appendChild(it),bt.appendChild(ft),ce.appendChild(le),ce.appendChild(bt),ie.appendChild(ce),v.appendChild(ie);let Ve=document.createElement("div");Ve.id="step-1-5-snippets",Object.assign(Ve.style,a.stepBlock,{display:"none"});let ht=document.createElement("h3");Object.assign(ht.style,a.h3),ht.textContent="Cen\xE1rios Comuns";let Fe=So(b=>{let $=document.querySelector("textarea");$&&($.value=b,$.dispatchEvent(new Event("input")),$.style.transition="background-color 0.2s",$.style.backgroundColor="#e8f0fe",setTimeout(()=>$.style.backgroundColor="#fff",300))});Fe.id="snippet-container",Ve.appendChild(ht),Ve.appendChild(Fe),v.appendChild(Ve);let Te=document.createElement("div");Te.id="step-3-form",Object.assign(Te.style,a.stepBlock,{display:"none"});let Nt=document.createElement("h3");Object.assign(Nt.style,a.h3),Te.appendChild(Nt);let _e=document.createElement("div");_e.id="dynamic-form-fields-container",Te.appendChild(_e);let ye=document.createElement("button");ye.textContent="+ Gostaria de selecionar uma task?",Object.assign(ye.style,a.optionalBtn),ye.onmouseover=()=>ye.style.background="#e8f0fe",ye.onmouseout=()=>ye.style.background="white",ye.onclick=()=>{ye.style.display="none",Ue.style.display="block",d.selectionElement.style.display="block"};let Ue=document.createElement("h3");Object.assign(Ue.style,a.h3,{marginTop:"20px"});let Jt=d.selectionElement;Object.assign(Jt.style,{marginBottom:"20px"}),Te.appendChild(ye),Te.appendChild(Ue),Te.appendChild(Jt),Te.appendChild(r.element),Te.appendChild(d.screenshotsElement),v.appendChild(Te);let We=document.createElement("div");We.id="step-4-email",Object.assign(We.style,{display:"none",marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #eee"});let Ye=document.createElement("label");Ye.style.display="flex",Ye.style.alignItems="center",Ye.style.cursor="pointer",Ye.style.fontSize="14px";let Xe=document.createElement("input");Xe.type="checkbox",Xe.checked=!0,Object.assign(Xe.style,a.checkboxInput),Ye.appendChild(Xe),Ye.appendChild(document.createTextNode("Preencher email automaticamente?")),We.appendChild(Ye),v.appendChild(We);let Pe=document.createElement("div");Object.assign(Pe.style,{display:"none",gap:"8px",padding:"0"}),v.appendChild(Pe);let st=document.createElement("button");Object.assign(st.style,a.buttonBase,{backgroundColor:"#5f6368"}),st.textContent="Copiar";let rt=document.createElement("button");Object.assign(rt.style,a.buttonBase,{backgroundColor:"#1a73e8"}),rt.textContent="Preencher",Pe.appendChild(st),Pe.appendChild(rt);let lt=document.createElement("div");Object.assign(lt.style,ot),lt.className="no-drag",lt.title="Redimensionar",u.appendChild(lt),nt(u,lt),document.body.appendChild(u);function xt(b){t=b;let $=ct();Object.assign(F.style,Ce),Object.assign(B.style,Ce),b==="bau"?(Object.assign(F.style,$),N.href="https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657"):(Object.assign(B.style,$),N.href="https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243"),k.value&&k.dispatchEvent(new Event("change"))}function te(b){try{if(Be&&Be[n]&&Be[n][b])return Be[n][b];if(Be&&Be.pt&&Be.pt[b])return Be.pt[b]}catch{}return b}function Ho(){T.textContent=te("idioma"),L.textContent=te("fluxo"),m.textContent=te("status_principal"),D.textContent=te("substatus"),ht.textContent=te("cenarios_comuns"),Ue.textContent=te("selecione_tasks"),Nt.textContent=te("preencha_detalhes"),st.textContent=te("copiar"),rt.textContent=te("preencher"),y.querySelector('option[value=""]')&&(y.querySelector('option[value=""]').textContent=te("select_status")),k.querySelector('option[value=""]')&&(k.querySelector('option[value=""]').textContent=te("select_substatus")),z.textContent=te("caso_portugal"),G.textContent=te("sim"),Ee.textContent=te("nao"),qe.textContent=te("consentiu_gravacao"),$e.textContent=te("sim"),ft.textContent=te("nao"),_e.querySelectorAll("label").forEach(b=>{let $=b.nextElementSibling.id.replace("field-",""),R=te($.toLowerCase());R!==$.toLowerCase()?b.textContent=R:b.textContent=$.replace(/_/g," ").replace(/\b\w/g,K=>K.toUpperCase())+":"}),ye.textContent="+ "+(n==="pt"?"Gostaria de selecionar uma task?":"Quisiera seleccionar una tarea?")}function yt(b){n=b;let $=ct();Object.assign(q.style,Ce),Object.assign(I.style,Ce),b==="pt"?(Object.assign(q.style,$),M.style.display="block",ue(o)):(Object.assign(I.style,$),M.style.display="none",ie.style.display="none"),Ho(),k.value&&k.dispatchEvent(new Event("change"))}function _t(b){(b.value.trim()===""||b.value.trim()==="\u2022")&&(b.value="\u2022 "),b.onkeydown=function($){if($.key==="Enter"){$.preventDefault();let R=this.selectionStart,K=this.selectionEnd,se=this.value,ge=se.lastIndexOf(`
`,R-1)+1,be=se.substring(ge,R),he=be.trim()==="\u2022"||be.trim()===""?`
`:`
\u2022 `;this.value=se.substring(0,R)+he+se.substring(K),this.selectionStart=this.selectionEnd=R+he.length}else if($.key==="Backspace"){let R=this.selectionStart;if(R===this.selectionEnd&&R>0){let K=this.value.substring(0,R);K.endsWith(`
\u2022 `)?($.preventDefault(),this.value=K.substring(0,R-3)+this.value.substring(this.selectionEnd),this.selectionStart=this.selectionEnd=R-3):K==="\u2022 "&&($.preventDefault(),this.value="",this.selectionStart=this.selectionEnd=0)}}}}function Rt(){let b=typeof Fe<"u"?Fe:document.getElementById("snippet-container");if(!b)return;let $=b.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'),R={},K=new Set;$.forEach(re=>{let ae=re.id,Z=Le[ae];if(Z)for(let W in Z)W==="linkedTask"?K.add(Z.linkedTask):W!=="type"&&(R[W]||(R[W]=[]),R[W].includes(Z[W])||R[W].push(Z[W]))});let se=new Set;Object.values(Le).forEach(re=>{Object.keys(re).forEach(ae=>{ae!=="linkedTask"&&ae!=="type"&&se.add(ae)})}),se.forEach(re=>{let ae=document.getElementById(re);if(ae){let Z=R[re]||[],W="";ut.includes(re.replace("field-",""))?(W=Z.map(ne=>ne.startsWith("\u2022 ")?ne:"\u2022 "+ne).join(`
`),W===""?W="\u2022 ":W.endsWith(`
\u2022 `)||(W+=`
\u2022 `)):W=Z.join(`

`),W.trim()!=="\u2022"&&W.trim()!==""?ae.value=W:ut.includes(re.replace("field-",""))?ae.value="\u2022 ":ae.value="",ae.tagName==="TEXTAREA"&&typeof _t=="function"&&_t(ae)}});let ge=new Set,be=new Set;b.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(re=>{let ae=Le[re.id];ae&&ae.linkedTask&&(re.checked?ge.add(ae.linkedTask):be.add(ae.linkedTask))}),be.forEach(re=>{ge.has(re)||d.toggleTask(re,!1)}),ge.forEach(re=>{d.toggleTask(re,!0)})}y.onchange=()=>{let b=y.value;if(Dt(1.5),k.innerHTML=`<option value="">${te("select_substatus")}</option>`,!b){k.disabled=!0;return}for(let $ in pt){let R=pt[$];if(R.status===b){let K=document.createElement("option");K.value=$,K.textContent=R.name,k.appendChild(K)}}k.disabled=!1},k.onchange=()=>{let b=k.value;if(Dt(1.5),!b)return;d.updateSubStatus(b);let $=pt[b];Fe.innerHTML="";let R=(Z,W,ne)=>{let fe=document.createElement("label");Object.assign(fe.style,a.checkboxLabel),fe.onmouseover=()=>fe.style.backgroundColor="#e8eaed",fe.onmouseout=()=>fe.style.backgroundColor="#f8f9fa";let de=document.createElement("input");return de.type=W,de.id=Z.id,Object.assign(de.style,a.checkboxInput),fe.appendChild(de),fe.appendChild(document.createTextNode(` ${Z.text}`)),ne.appendChild(fe),de},K=[],se="radio";if(b==="NI_Awaiting_Inputs")K=[{id:"quickfill-ni-inicio-manual",text:"In\xEDcio 2/6 (Manual)"},{id:"quickfill-ni-cms-access",text:"In\xEDcio 2/6 (ADV sem acesso ao CMS)"},{id:"quickfill-ni-followup-bau",text:"Follow-up 2/6 (BAU)"},{id:"quickfill-ni-followup-lm",text:"Follow-up 2/6 (LM)"}];else if(b.startsWith("SO_"))se="checkbox",K=[{id:"quickfill-gtm-install",text:"Instala\xE7\xE3o do GTM"},{id:"quickfill-whatsapp",text:"Convers\xE3o de WhatsApp"},{id:"quickfill-form",text:"Convers\xE3o de Formul\xE1rio (Padr\xE3o)"},{id:"quickfill-ecw4-close",text:"Fechamento ECW4 (P\xF3s 7 dias)"},{id:"quickfill-ga4-event-close",text:"Fechamento GA4 (P\xF3s 2 dias)"}];else if(b.startsWith("AS_")){se="checkbox";let Z=document.createElement("label");Z.textContent=te("cenarios_comuns"),Object.assign(Z.style,a.label),Fe.appendChild(Z),K=[{id:"quickfill-as-no-show",text:"Anunciante n\xE3o compareceu (respondeu e-mail)"},{id:"quickfill-as-insufficient-time",text:"Tempo insuficiente"},{id:"quickfill-as-no-access",text:"Anunciante sem acessos necess\xE1rios"}]}else b.startsWith("IN_")?K=[{id:"quickfill-in-nrp-bau",text:"NRP (BAU - 3 tentativas)"},{id:"quickfill-in-nrp-lm",text:"NRP (LM - Sem tentativas)"},{id:"quickfill-in-no-show-bau",text:"No-Show (BAU - 3 tentativas)"},{id:"quickfill-in-2-6-final",text:"Finaliza\xE7\xE3o 2/6 (Sem Resposta)"},{id:"quickfill-in-manual",text:"Outro (Manual)"}]:b.startsWith("DC_")?(se="radio",K=[{id:"quickfill-dc-lm-no-access",text:"LM - Sem acessos (Reagendar em BAU)"}]):b==="NI_Attempted_Contact"?(se="radio",K=[{id:"quickfill-ni-attempted-2day",text:"2 Day Rule (2 Liga\xE7\xF5es + Chat AM)"}]):b==="NI_Awaiting_Validation"&&(se="checkbox",K=[{id:"quickfill-ni-awaiting-ecw4",text:"ECW4 (Acompanhar)"},{id:"quickfill-ni-awaiting-ga4",text:"GA4 Event Tracking (Acompanhar)"}]);let ge=K.filter(Z=>{let W=Le[Z.id];return!W.type||W.type==="all"||W.type===t});ge.forEach((Z,W)=>{let ne=R(Z,se,Fe);se==="radio"&&(ne.name="scenario-radio-group",W===0&&(ne.checked=!0))}),ge.length>0&&(Ve.style.display="block"),$.requiresTasks?(ye.style.display="none",Ue.style.display="block",d.selectionElement.style.display="block"):(ye.style.display="block",Ue.style.display="none",d.selectionElement.style.display="none"),_e.innerHTML="";let be=$.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(be)].forEach(Z=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(Z))return;let W=Z.slice(1,-1),ne=document.createElement("label"),fe=te(W.toLowerCase());if(ne.textContent=fe!==W.toLowerCase()?fe:W.replace(/_/g," ").replace(/\b\w/g,ee=>ee.toUpperCase())+":",Object.assign(ne.style,a.label),W==="SPEAKEASY_ID"){let ee=document.createElement("button");ee.innerHTML='<span style="font-size:12px; margin-right:4px;">\u2728</span>Auto Busca',ee.style.cssText=`
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
          `,ee.title="Localizar Speakeasy ID no hist\xF3rico",ee.onmouseover=()=>{ee.style.backgroundColor="#c2e7ff",ee.style.boxShadow="0 1px 2px rgba(0,0,0,0.1)"},ee.onmouseout=()=>{ee.style.backgroundColor="#d3e3fd",ee.style.boxShadow="none"},ee.onmousedown=()=>{ee.style.backgroundColor="#a8c7fa",ee.style.transform="scale(0.96)"},ee.onmouseup=()=>ee.style.transform="scale(1)",ee.onclick=ve=>{ve.preventDefault(),ho(`field-${W}`)},ne.appendChild(ee)}let de;ut.includes(W)?(de=document.createElement("textarea"),Object.assign(de.style,a.textarea),de.classList.add("bullet-textarea"),_t(de)):$t.includes(W)?(de=document.createElement("textarea"),Object.assign(de.style,a.textarea)):(de=document.createElement("input"),de.type="text",Object.assign(de.style,a.input),W==="REASON_COMMENTS"&&(b.startsWith("NI_")||b.startsWith("IN_"))&&(Object.assign(ne.style,{display:"none"}),Object.assign(de.style,{display:"none"}))),W==="ON_CALL"&&t==="lm"&&(Object.assign(ne.style,{display:"none"}),Object.assign(de.style,{display:"none"}),de.value="N/A"),de.id=`field-${W}`,_e.appendChild(ne),_e.appendChild(de)});let re=Fe.querySelectorAll('input[type="checkbox"], input[type="radio"]');re.length>0&&(re.forEach(Z=>{Z.removeEventListener("change",Rt),Z.addEventListener("change",Rt)}),Rt()),Te.style.display="block",Ze[b]?We.style.display="block":We.style.display="none",Pe.style.display="flex";let ae=d.getCheckedElements().map(Z=>Z.value);r.updateVisibility(b,ae)},ye.onclick=()=>{ye.style.display="none",Ue.style.display="block",d.selectionElement.style.display="block"};function eo(){let b=k.value;if(!b)return null;let R=pt[b].template.replace(/\n/g,"<br>"),K='style="margin-bottom: 12px; padding-left: 30px;"',se=[],ge="",be=d.getCheckedElements();be.length>0&&be.forEach(ae=>{let Z=ae.value,W=je[Z],ne=ae.closest().querySelector(".stepper-count"),fe=ne?parseInt(ne.textContent):1;fe>1?se.push(`${W.name} (x${fe})`):se.push(W.name)});let he=d.screenshotsElement;if(he){let ae=Array.from(he.querySelectorAll('input[id^="name-"]'));ae.length>0&&ae.forEach(Z=>{let W=Z.value,ne=Z.closest(".cw-screen-card");if(ne){let fe=ne.querySelectorAll('input[id^="screen-"]'),de=!1,ee="";fe.forEach(ve=>{let to=ve.closest(".cw-input-group"),oo=to?to.querySelector(".cw-input-label"):null,$o=oo?oo.textContent:"Evid\xEAncia",no=ve.value.trim(),Vo=no?` ${no}`:"";ee+=`<li>${$o} -${Vo}</li>`,de=!0}),de&&(ge+=`<b>${W}</b>`,ge+=`<ul ${K}>${ee}</ul>`)}})}if(R.includes("{TAGS_IMPLEMENTED}")?R=R.replace(/{TAGS_IMPLEMENTED}/g,se.join(", ")||"N/A"):se.length>0&&(R+=`<br><b>Tags:</b> ${se.join(", ")}<br>`),R.includes("{SCREENSHOTS_LIST}")?R=R.replace(/{SCREENSHOTS_LIST}/g,ge?`${ge}`:"N/A"):ge!==""&&(R+=`<br>${ge}`),n==="pt"&&o){let ae=we.checked?te("sim"):te("nao");R=R.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${te("consentiu_gravacao")}</b> ${ae}<br><br>`),R=R.replace(/{CASO_PORTUGAL}/g,`<br><b>${te("caso_portugal")}</b> ${te("sim")}<br>`)}else n==="pt"&&!o?(R=R.replace(/{CASO_PORTUGAL}/g,`<br><b>${te("caso_portugal")}</b> ${te("nao")}<br>`),R=R.replace(/{CONSENTIU_GRAVACAO}/g,"")):(R=R.replace(/{CASO_PORTUGAL}/g,""),R=R.replace(/{CONSENTIU_GRAVACAO}/g,""));return _e.querySelectorAll("input, textarea").forEach(ae=>{let Z=ae.id.replace("field-",""),W=new RegExp(`{${Z}}`,"g"),ne=ae.value;if(Z==="REASON_COMMENTS"&&(b.startsWith("NI_")||b.startsWith("IN_"))){let ee=Fe.querySelector('input[type="radio"]:checked');ee&&Le[ee.id]&&(ne=Le[ee.id]["field-REASON_COMMENTS"])}if(ut.includes(Z)&&ne.trim()!==""){let ee=ne.split(`
`).map(ve=>ve.trim()).filter(ve=>ve!==""&&ve!=="\u2022").map(ve=>ve.startsWith("\u2022 ")?ve.substring(2):ve).map(ve=>`<li>${ve}</li>`).join("");ne=ee?`<ul ${K}>${ee}</ul>`:""}else $t.includes(Z)?ne=ne.split(`
`).filter(ee=>ee.trim()!=="").map(ee=>`<p style="margin: 0 0 8px 0;">${ee}</p>`).join(""):ae.tagName==="TEXTAREA"&&(ne=ne.replace(/\n/g,"<br>"));let fe=ne.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(fe===""||fe==="\u2022"||fe.toLowerCase()==="n/a"){let ee=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${Z}\\}(?:<br>\\s*)?`,"gi");ee.test(R)?R=R.replace(ee,""):R=R.replace(W,"")}else R=R.replace(W,ne.replace(/\$/g,"$$$$"))}),R=R.replace(/{([A-Z0-9_]+)}/g,""),R=R.replace(/(<br>){3,}/g,"<br><br>"),typeof r<"u"&&r.getOutput&&(R+=r.getOutput()),R}st.onclick=()=>{let b=eo();b?(mt(b),U(te("copiado_sucesso"))):U(te("selecione_substatus"),{error:!0})},rt.onclick=async()=>{let b=k.value,$=eo();if(!$){U(te("selecione_substatus"),{error:!0});return}mt($),zt();let R=It(),K=await Lt();if(K)try{if(K.focus(),K.innerHTML.trim()==="<p><br></p>"||K.innerHTML.trim()==="<br>"||K.innerText.trim()===""){let he=document.createRange();he.selectNodeContents(K);let re=window.getSelection();re.removeAllRanges(),re.addRange(he),document.execCommand("delete",!1,null)}else if(!K.innerHTML.endsWith("<br><br>")){let he=document.createRange();he.selectNodeContents(K),he.collapse(!1);let re=window.getSelection();re.removeAllRanges(),re.addRange(he),document.execCommand("insertHTML",!1,"<br><br>")}document.execCommand("insertHTML",!1,$),Ft(K),setTimeout(()=>{U(te("inserido_copiado"))},600);let ge=typeof Xe<"u"&&Xe?Xe.checked:!0;if(b&&Ze[b]&&ge){let he=Ze[b];await Tt(he),await new Promise(re=>setTimeout(re,500))}R(),Dt(1.5),y.value="",k.innerHTML=`<option value="">${te("select_substatus")}</option>`,k.disabled=!0}catch(se){console.error(se),U("Erro ao inserir.",{error:!0}),R()}};function Dt(b=1.5){b<=1.5&&(Ve.style.display="none",Fe.innerHTML=""),b<=2&&(d.reset(),ye.style.display="none"),b<=3&&(Te.style.display="none",_e.innerHTML="",r.reset(),Pe.style.display="none",We.style.display="none")}function zt(){if(s=!s,s){let b=u.querySelector(".cw-expand-btn");b&&typeof b.resetState=="function"&&b.resetState()}Ie(s,u,"cw-btn-notes")}return xt("bau"),yt("pt"),zt}var et={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function Lo(){let e="v4.2.0 CR-Hybrid",t="CANNED_RESPONSES",n=Object.keys(et)[0],o="",s="list",i=!1,a={bgApp:"#F8F9FA",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.08)",borderFocus:"rgba(26, 115, 232, 0.4)",textPrimary:"#202124",textSecondary:"#5F6368",primary:"#1A73E8",primaryBg:"#E8F0FE",shadowCard:"0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",shadowHover:"0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",transition:"all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1)"},r={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:a.bgApp},d={display:"flex",width:"200%",height:"100%",transition:"transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",transform:"translateX(0)",willChange:"transform"},h={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},p={padding:"20px 24px 12px 24px",flexShrink:"0",background:a.bgApp,zIndex:"10",display:"flex",flexDirection:"column",gap:"16px",borderBottom:`1px solid ${a.borderSubtle}`},c={width:"100%",height:"44px",padding:"0 16px 0 48px",borderRadius:"12px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",fontWeight:"400",color:a.textPrimary,boxSizing:"border-box",outline:"none",transition:a.transition,boxShadow:"0 2px 5px rgba(0,0,0,0.03)",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%239AA0A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"16px center"},x={display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px",paddingBottom:"4px"},u={padding:"6px 14px",borderRadius:"100px",border:"1px solid #DADCE0",background:"#FFFFFF",color:a.textSecondary,fontSize:"13px",fontWeight:"500",letterSpacing:"0.3px",cursor:"pointer",transition:a.transition,flexShrink:"0",display:"flex",alignItems:"center",justifyContent:"center"},f={background:a.primaryBg,color:a.primary,borderColor:"transparent",fontWeight:"600",boxShadow:"0 1px 2px rgba(26, 115, 232, 0.15)"},g={padding:"16px 24px 80px 24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"12px"},v={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",height:"72px",minHeight:"72px",borderRadius:"16px",background:a.bgSurface,border:"1px solid transparent",boxShadow:a.shadowCard,cursor:"pointer",transition:"all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",position:"relative",overflow:"hidden"},E=document.createElement("div");E.id="quick-email-popup",E.classList.add("cw-module-window"),Object.assign(E.style,ke,{right:"100px",width:"440px",height:"640px",borderRadius:"20px",boxShadow:"0 24px 64px rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.4)"});let V={popup:E,googleLine:null,focusElement:null};function j(){i=!i,Ie(i,E,"cw-btn-email"),i||setTimeout(()=>m(),300)}let P=Oe(E,"Quick Email",e,"Templates & Automa\xE7\xF5es",V,()=>j()),A=document.createElement("div");Object.assign(A.style,r);let T=document.createElement("div");Object.assign(T.style,d);let S=document.createElement("div");Object.assign(S.style,h);let q=document.createElement("div");Object.assign(q.style,p);let I=document.createElement("input");I.placeholder="Pesquisar templates...",Object.assign(I.style,c),I.onfocus=()=>{I.style.borderColor=a.primary,I.style.boxShadow="0 0 0 4px rgba(26, 115, 232, 0.15)",I.style.background="#fff"},I.onblur=()=>{I.style.borderColor="transparent",I.style.boxShadow="0 2px 5px rgba(0,0,0,0.03)",I.style.background="#fff"},V.focusElement=I;let C=document.createElement("div");Object.assign(C.style,x);let L=document.createElement("div");Object.assign(L.style,g),q.appendChild(I),q.appendChild(C),S.appendChild(q),S.appendChild(L);let O=document.createElement("div");Object.assign(O.style,h);let F=document.createElement("div");Object.assign(F.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),O.appendChild(F),T.appendChild(S),T.appendChild(O),A.appendChild(T),E.appendChild(P),E.appendChild(A),document.body.appendChild(E);async function B(N,k){try{i&&j();let M=It();await new Promise(z=>setTimeout(z,800)),k==="email"?await yo(N):k==="cr"&&await Tt(N),M()}catch(M){console.error("\u274C Erro:",M);let z=document.querySelector(".cw-focus-backdrop");z&&z.classList.remove("active")}}function l(N){s="detail",T.style.transform="translateX(-50%)";let k='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',M='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';F.innerHTML=`
            <style>
                .cw-email-content p { margin: 0 0 8px 0; } /* Margem apenas embaixo */
                .cw-email-content ul { margin: 0 0 8px 16px; padding: 0; }
                .cw-email-content li { margin-bottom: 4px; }
            </style>

            <div style="position:sticky; top:0; background:rgba(255,255,255,0.9); backdrop-filter:blur(12px); border-bottom:1px solid #eee; padding:16px 24px; z-index:10; display:flex; align-items:center; gap:12px;">
                <button id="csa-back-btn" style="background:none; border:none; cursor:pointer; display:flex; color:#5f6368; padding:8px; margin-left:-12px; border-radius:50%; transition:background 0.2s;">${k}</button>
                <div style="font-weight:600; font-size:16px; color:#202124; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${N.name}</div>
            </div>
            
            <div style="padding:24px;">
                <div style="margin-bottom:24px;">
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Assunto</div>
                    <div style="font-size:14px; font-weight:500; color:#202124; padding:16px; background:#F8F9FA; border-radius:12px; border:1px solid #eee; box-shadow:inset 0 1px 2px rgba(0,0,0,0.02);">${N.subject}</div>
                </div>
                
                <div>
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Mensagem</div>
                    
                    <div class="cw-email-content" style="font-size:13px; color:#3c4043; line-height:1.5; white-space: normal; word-break: break-word; padding:0 4px;">
                        ${N.body}
                    </div>
                </div>
            </div>
            
            <div style="position:sticky; bottom:0; padding:24px; background:linear-gradient(to top, #fff 90%, rgba(255,255,255,0)); pointer-events:none;">
                <button id="csa-insert-btn" style="pointer-events:auto; width:100%; padding:14px; background:#1a73e8; color:white; border:none; border-radius:12px; font-size:14px; font-weight:600; cursor:pointer; display:flex; justify-content:center; align-items:center; gap:10px; box-shadow:0 4px 12px rgba(26,115,232,0.3); transition:transform 0.2s, box-shadow 0.2s;">
                    ${M} Usar Template
                </button>
            </div>
        `;let z=F.querySelector("#csa-back-btn");z.onmouseenter=()=>z.style.background="#f1f3f4",z.onmouseleave=()=>z.style.background="none",z.onclick=m;let H=F.querySelector("#csa-insert-btn");H.onmouseenter=()=>{H.style.transform="translateY(-1px)",H.style.boxShadow="0 6px 16px rgba(26,115,232,0.4)"},H.onmouseleave=()=>{H.style.transform="translateY(0)",H.style.boxShadow="0 4px 12px rgba(26,115,232,0.3)"},H.onclick=()=>{H.style.transform="scale(0.96)",B(N,"email"),setTimeout(()=>{H.style.transform="scale(1)",m()},300)}}function m(){s="list",T.style.transform="translateX(0)"}function y(N,k,M=null){let z=document.createElement("button"),H=M?`<span style="margin-right:6px; font-size:14px; opacity:0.9;">${M}</span>`:"";return z.innerHTML=`${H}${N}`,Object.assign(z.style,u),n===k&&o===""?Object.assign(z.style,f):(z.onmouseenter=()=>{z.style.background="#F1F3F4",z.style.borderColor="#DADCE0"},z.onmouseleave=()=>{z.style.background="#FFFFFF",z.style.borderColor="#DADCE0"}),z.onclick=()=>{n=k,o="",I.value="",w(),D()},z}function w(){C.innerHTML="",C.appendChild(y("Smart CRs",t,"\u26A1")),Object.keys(et).forEach(N=>{C.appendChild(y(et[N].title,N))})}function D(){L.innerHTML="";let N=[];if(o.trim()!==""){let Y=o.toLowerCase();Object.values(et).forEach(_=>{_.emails.forEach(G=>{(G.name.toLowerCase().includes(Y)||G.subject.toLowerCase().includes(Y))&&N.push({type:"email",data:G})})}),Object.entries(Ze).forEach(([_,G])=>{if(!G)return;(_.replace(/_/g," ").toLowerCase().includes(Y)||G.toLowerCase().includes(Y))&&N.push({type:"cr",key:_,code:G})})}else n===t?Object.entries(Ze).forEach(([Y,_])=>{_&&N.push({type:"cr",key:Y,code:_})}):et[n]&&et[n].emails.forEach(Y=>{N.push({type:"email",data:Y})});if(N.length===0){L.innerHTML=`
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F50D}</div>
                    <div style="font-size:14px; font-weight:500;">Nenhum template encontrado</div>
                    <div style="font-size:12px; margin-top:4px;">Tente outro termo de busca</div>
                </div>`;return}let M='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1967D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',z='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA8600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',H='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BDC1C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';N.forEach(Y=>{let _=document.createElement("div");if(Object.assign(_.style,v),Y.type==="email"){let G=Y.data,X=G.subject.length>45?G.subject.substring(0,45)+"...":G.subject;_.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#E8F0FE; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${M}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${G.name}</div>
                        <div style="font-size:12px; color:#5F6368; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${X}</div>
                    </div>
                    <div style="margin-left:12px; opacity:0.6;">${H}</div>
                `,_.onclick=()=>l(G)}else{let G=Y.key.replace(/_/g," ").replace("AS ","AS - ").replace("NI ","NI - ");_.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#FEF7E0; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${z}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; margin-bottom:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${G}</div>
                        <div style="font-size:11px; font-weight:500; color:#EA8600; font-family:'Roboto Mono', monospace; letter-spacing:-0.2px;">${Y.code}</div>
                    </div>
                    <div style="font-size:10px; font-weight:700; color:#DADCE0; text-transform:uppercase; letter-spacing:0.5px; border:1px solid #F1F3F4; padding:4px 8px; border-radius:6px; margin-left:12px;">Inserir</div>
                `,_.onclick=()=>{_.style.transform="scale(0.98)",_.style.background="#FEF7E0",setTimeout(()=>{_.style.transform="scale(1)",_.style.background="#fff",B(Y.code,"cr")},150)}}_.onmouseenter=()=>{_.style.transform="translateY(-2px)",_.style.boxShadow=a.shadowHover,Y.type==="cr"?_.style.borderLeft="3px solid #Fbbc04":_.style.borderLeft="3px solid #1a73e8"},_.onmouseleave=()=>{_.style.transform="translateY(0)",_.style.boxShadow=a.shadowCard,_.style.borderLeft="1px solid transparent"},L.appendChild(_)})}return I.addEventListener("input",N=>{o=N.target.value,o!==""?Array.from(C.children).forEach(k=>{Object.assign(k.style,u),k.style.opacity="0.6"}):w(),D()}),w(),D(),j}var Mo={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function No(){let e="v2.6 (Context HD)",t="csa-local-styles";if(!document.getElementById(t)){let y=document.createElement("style");y.id=t,y.innerHTML=`
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
      `,document.head.appendChild(y)}let n={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#FFFFFF",scrollBehavior:"smooth"},card:{background:"#FFFFFF",border:"1px solid #E5E7EB",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"12px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"8px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.1s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.6",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"18px",height:"18px",borderRadius:"6px",border:"2px solid #DADCE0",marginRight:"12px",marginTop:"2px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #F1F3F4",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"},contextBanner:{padding:"20px 20px 16px 20px",background:"#FFFFFF",borderBottom:"1px solid #F1F3F4",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.02)",position:"relative",zIndex:"5"}},o={},s="PT",i="BAU",a=!1,r=document.createElement("div");r.id="call-script-popup",r.classList.add("cw-module-window"),Object.assign(r.style,ke,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let d={popup:r,googleLine:null},h=null;function p(){a&&Re().then(y=>{let w=r.querySelector("#cw-ctx-name"),D=r.querySelector("#cw-ctx-cid"),N=r.querySelector("#cw-ctx-email");if(w&&(w.textContent=y.advertiserName||"Cliente Desconhecido"),D){let k=y.cid||"---";D.textContent!==k&&(D.textContent=k)}if(N){let k=y.clientEmail||"N\xE3o encontrado";N.textContent!==k&&(N.textContent=k,N.title=k)}})}function c(){a=!a,Ie(a,r,"cw-btn-script"),a?(p(),h||(h=setInterval(p,2e3))):h&&(clearInterval(h),h=null)}let x=Oe(r,"Call Script",e,"Guia interativo para condu\xE7\xE3o de chamadas.",d,()=>{c()});r.appendChild(x);let u=document.createElement("div");Object.assign(u.style,n.contextBanner),u.innerHTML=`
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
  `;let f=(y,w)=>{let D=u.querySelector(y),N=u.querySelector(w);D.onclick=()=>{let k=N.textContent;!k||k.includes("---")||k.includes("N\xE3o encontrado")||(navigator.clipboard.writeText(k),Q.playSuccess(),D.classList.add("copied"),setTimeout(()=>D.classList.remove("copied"),1500))}};r.appendChild(u);let g=document.createElement("div");Object.assign(g.style,n.progressBarContainer);let v=document.createElement("div");Object.assign(v.style,n.progressBarFill),g.appendChild(v),r.appendChild(g);let E=document.createElement("div");E.id="csa-content",Object.assign(E.style,n.contentArea),r.appendChild(E);let V=document.createElement("div");Object.assign(V.style,n.footer);let j=document.createElement("span");j.textContent="by lucaste@",Object.assign(j.style,{fontSize:"10px",color:"#bdc1c6"});let P=document.createElement("button");P.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> Resetar Script',Object.assign(P.style,n.resetBtn),P.onmouseenter=()=>P.style.background="#fce8e6",P.onmouseleave=()=>P.style.background="transparent",P.onclick=()=>{P.style.transform="scale(0.9)",setTimeout(()=>P.style.transform="scale(1)",150);for(let y in o)delete o[y];F()},V.appendChild(j),V.appendChild(P),r.appendChild(V);let A=document.createElement("div");Object.assign(A.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let T=document.createElement("div");Object.assign(T.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let S=document.createElement("div");S.textContent="BAU";let q=document.createElement("div");q.textContent="LT",Object.assign(S.style,Ce),Object.assign(q.style,Ce),T.appendChild(S),T.appendChild(q);let I=document.createElement("select");Object.assign(I.style,At,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),I.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',I.value=s,A.appendChild(T),A.appendChild(I),E.appendChild(A);let C=document.createElement("div");C.id="csa-checklist-area",E.appendChild(C);let L=document.createElement("div");Object.assign(L.style,ot),L.className="no-drag",L.title="Redimensionar",r.appendChild(L),nt(r,L),document.body.appendChild(r),f("#cw-pill-cid","#cw-ctx-cid"),f("#cw-pill-email","#cw-ctx-email");function O(y){return y}function F(){C.innerHTML="";let y=`${s} ${i}`,w=Mo[y];if(!w){C.innerHTML='<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;"><div style="font-size: 24px;">\u2615</div><div>Script n\xE3o configurado.</div></div>',v.style.width="0%";return}let D=w.color||"#1a73e8",N=0,k=0;["inicio","meio","fim"].forEach(M=>{w[M]&&(N+=w[M].length)}),["inicio","meio","fim"].forEach((M,z)=>{let H=w[M];if(!H||H.length===0)return;let Y=document.createElement("div");Object.assign(Y.style,n.card);let _=document.createElement("div");Object.assign(_.style,n.cardTitle);let G="";M==="inicio"?s.includes("ES")?G="Apertura":s.includes("EN")?G="Opening":G="Abertura":M==="meio"?s.includes("ES")?G="Implementaci\xF3n":s.includes("EN")?G="Implementation":G="Implementa\xE7\xE3o (Tag Support)":M==="fim"&&(s.includes("ES")?G="Cierre":s.includes("EN")?G="Closing":G="Fechamento"),_.textContent=G;let X=document.createElement("span");X.style.fontSize="11px",X.style.opacity="0.7",X.style.fontWeight="500",X.style.background="#f1f3f4",X.style.padding="2px 8px",X.style.borderRadius="10px",_.appendChild(X),Y.appendChild(_);let me=0;H.forEach((Ee,ue)=>{let ie=`${y}-${M}-${ue}`,qe=!!o[ie];qe&&(k++,me++);let ce=document.createElement("div");Object.assign(ce.style,n.itemRow);let le=document.createElement("div");Object.assign(le.style,n.checkbox);let we=document.createElement("span");we.innerHTML=Ee,we.style.flex="1",qe?(Object.assign(ce.style,n.itemCompleted),le.style.background=D,le.style.borderColor=D,le.style.transform="scale(1)",le.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ce.style.textDecoration="none",ce.style.opacity="1",le.style.background="transparent",le.style.borderColor="#dadce0",le.style.transform="scale(1)",le.innerHTML=""),ce.onclick=()=>{let $e=!o[ie];o[ie]=$e,Q.playClick(),$e?(le.style.transform="scale(1.2)",setTimeout(()=>le.style.transform="scale(1)",150),Object.assign(ce.style,n.itemCompleted),le.style.background=D,le.style.borderColor=D,le.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ce.style.textDecoration="none",ce.style.opacity="1",le.style.background="transparent",le.style.borderColor="#dadce0",le.innerHTML=""),B(y,w)},ce.onmouseenter=()=>{o[ie]||(ce.style.background="#f1f3f4",le.style.borderColor=D)},ce.onmouseleave=()=>{o[ie]||(ce.style.background="transparent",le.style.borderColor="#dadce0")},ce.appendChild(le),ce.appendChild(we),Y.appendChild(ce)}),me===H.length&&H.length>0&&(X.style.color="#1e8e3e",X.style.background="#e6f4ea",Y.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),X.textContent=`${me}/${H.length}`,C.appendChild(Y)}),l(N,k)}function B(y,w){let D=0,N=0;["inicio","meio","fim"].forEach(k=>{let M=w[k]||[];D+=M.length,M.forEach((z,H)=>{o[`${y}-${k}-${H}`]&&N++})}),l(D,N),setTimeout(()=>F(),200)}function l(y,w){let D=y===0?0:w/y*100;v.style.width=`${D}%`,v.style.background=D===100?"#34A853":"linear-gradient(90deg, #4285F4, #34A853)"}function m(y){i=y;let w=ct();Object.assign(S.style,Ce),Object.assign(q.style,Ce),Object.assign(y==="BAU"?S.style:q.style,w),F()}return S.onclick=()=>m("BAU"),q.onclick=()=>m("LT"),I.addEventListener("change",y=>{s=y.target.value,F()}),m(i),c}var gt={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"}]}},tt={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},Mt={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}},Kt="cw_link_history_v4";function _o(e,t){try{let n=JSON.parse(localStorage.getItem(Kt)||"[]");n=n.filter(o=>o.url!==e.url),n.unshift({...e,_originalCat:t}),n=n.slice(0,3),localStorage.setItem(Kt,JSON.stringify(n))}catch(n){console.warn("Erro ao salvar hist\xF3rico",n)}}function sn(){try{return JSON.parse(localStorage.getItem(Kt)||"[]")}catch{return[]}}function Ro(){let e="v4.6",t="",n=!1,o=null,s=!1,i={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},a=document.createElement("div");a.id="links-popup",a.classList.add("cw-module-window"),Object.assign(a.style,ke,{right:"100px",width:"600px",height:"650px",background:i.bgApp,overflow:"hidden"});let d=Oe(a,"Central de Links",e,"Navegue pelas categorias ou use a busca.",{popup:a,googleLine:null},()=>L());a.appendChild(d);let h=document.createElement("div");h.style.cssText="display: flex; height: calc(100% - 56px); width: 100%; position: relative;",a.appendChild(h);let p=document.createElement("div");p.style.cssText=`
      width: 80px; flex-shrink: 0; background: ${i.bgSidebar};
      border-right: 1px solid ${i.borderSubtle};
      display: flex; flex-direction: column; align-items: center;
      padding: 16px 0; overflow-y: auto; gap: 8px;
      scrollbar-width: none; z-index: 2;
  `,h.appendChild(p);let c=document.createElement("div");c.style.cssText="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F8F9FA; position: relative; z-index: 1;",h.appendChild(c);let x=document.createElement("div");x.style.cssText="padding: 16px 24px; flex-shrink: 0; background: transparent;";let u=document.createElement("div");u.style.cssText=`
      position: relative; width: 100%; height: 44px;
      border-radius: 12px; border: 1px solid transparent;
      background: #FFFFFF; transition: all 0.2s;
      display: flex; align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  `;let f=document.createElement("div");f.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',f.style.cssText="margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none;";let g=document.createElement("input");g.type="text",g.placeholder="Buscar ferramenta ou SOP...",g.style.cssText=`
      flex: 1; height: 100%; border: none; background: transparent;
      padding: 0 12px; font-size: 14px; color: ${i.textPrimary};
      outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
  `,g.onfocus=()=>{u.style.boxShadow="0 4px 12px rgba(26,115,232,0.15)",u.style.border="1px solid #1a73e8"},g.onblur=()=>{u.style.boxShadow="0 2px 6px rgba(0,0,0,0.04)",u.style.border="1px solid transparent"},u.appendChild(f),u.appendChild(g),x.appendChild(u),c.appendChild(x);let v=document.createElement("div");v.style.cssText="flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth;",c.appendChild(v);let E=null;function V(){if(E)return;E=document.createElement("div"),E.style.cssText=`
          position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255,255,255,0.98); z-index: 20;
          display: flex; flex-direction: column;
          transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
      `;let O=document.createElement("div");O.style.cssText="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4;",O.innerHTML='<span style="font-size: 16px; font-weight: 700; color: #202124;">\u{1F552} Recentes</span>';let F=document.createElement("button");F.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',F.style.cssText="background: none; border: none; cursor: pointer; color: #5f6368;",F.onclick=()=>{P(),s=!1,q()},O.appendChild(F),E.appendChild(O);let B=document.createElement("div");B.id="cw-history-list",B.style.cssText="flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA;",E.appendChild(B),c.appendChild(E)}function j(){E||V();let O=E.querySelector("#cw-history-list");O.innerHTML="";let F=sn();F.length===0?O.innerHTML='<div style="text-align: center; color: #999; margin-top: 60px; font-size:13px;">Nada por aqui ainda.</div>':F.forEach(B=>{let l=C(B,tt[B._originalCat],!0,B._originalCat);O.appendChild(l)}),requestAnimationFrame(()=>E.style.transform="translateY(0)")}function P(){E&&(E.style.transform="translateY(100%)")}function A(){p.innerHTML="";let O=T("history","Recentes",tt.history);O.id="cw-sidebar-btn-history",O.onclick=()=>{Q.playClick(),s=!s,s?j():P(),q()},p.appendChild(O);let F=document.createElement("div");F.style.cssText="width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0;",p.appendChild(F),Object.keys(gt).forEach(B=>{let l=gt[B],m=T(B,l.label,tt[B]);m.id=`cw-sidebar-btn-${B}`,m.onclick=()=>{Q.playClick(),s&&(s=!1,P()),S(B)},p.appendChild(m)})}function T(O,F,B){let l=document.createElement("div");l.style.cssText=`
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; color: ${i.textSecondary}; 
          transition: all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1);
          position: relative;
      `,l.title=F,l.dataset.key=O;let m=document.createElement("div");m.style.cssText="width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s;",m.innerHTML=B||tt.tasks;let y=document.createElement("div");return y.style.cssText="font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px;",y.textContent=F,l.appendChild(m),l.appendChild(y),l.onmouseenter=()=>{o!==O&&!(O==="history"&&s)&&(l.style.background="#F1F3F4",m.style.transform="scale(1.1)")},l.onmouseleave=()=>{o!==O&&!(O==="history"&&s)&&(l.style.background="transparent",m.style.transform="scale(1)")},l}function S(O){let F=document.getElementById(`cat-anchor-${O}`);F&&(F.scrollIntoView({behavior:"smooth",block:"start"}),o=O,q())}function q(){Object.keys(gt).forEach(F=>{let B=p.querySelector(`#cw-sidebar-btn-${F}`);if(B)if(o===F&&!s){let l=Mt[F];B.style.background=l.bg,B.style.color=l.color,B.querySelector("div:first-child").style.transform="scale(1.1)"}else B.style.background="transparent",B.style.color=i.textSecondary,B.querySelector("div:first-child").style.transform="scale(1)"});let O=p.querySelector("#cw-sidebar-btn-history");O&&(s?(O.style.background="#3C4043",O.style.color="#FFFFFF"):(O.style.background="transparent",O.style.color=i.textSecondary))}function I(){if(v.innerHTML="",t.trim()!==""){let F=[];if(Object.entries(gt).forEach(([l,m])=>{let y=m.links.filter(w=>w.name.toLowerCase().includes(t.toLowerCase())||w.desc.toLowerCase().includes(t.toLowerCase()));F.push(...y.map(w=>({...w,_cat:l})))}),F.length===0){v.innerHTML='<div style="text-align:center; padding: 60px; color:#999; font-size:13px;">Nada encontrado.</div>';return}let B=document.createElement("div");B.innerHTML="Resultados da busca",B.style.cssText="font-size:12px; font-weight:700; color:#5f6368; margin:20px 0 10px; text-transform:uppercase; letter-spacing:0.5px;",v.appendChild(B),F.forEach(l=>{let m=C(l,tt[l._cat],!1,l._cat);v.appendChild(m)});return}Object.entries(gt).forEach(([F,B])=>{let l=Mt[F],m=document.createElement("div"),y=document.createElement("div");y.id=`cat-anchor-${F}`,y.style.cssText=`
              display: flex; align-items: center; gap: 8px;
              font-size: 13px; font-weight: 800; color: ${l.color}; 
              text-transform: uppercase; letter-spacing: 0.5px;
              margin: 32px 0 12px 0; padding-top: 10px;
          `,y.innerHTML=`
            <div style="width:8px; height:8px; border-radius:50%; background:${l.color};"></div>
            ${B.label}
          `,m.appendChild(y);let w=document.createElement("div");w.style.cssText="display: grid; grid-template-columns: 1fr; gap: 8px;",B.links.forEach(D=>{let N=C(D,tt[F],!1,F);w.appendChild(N)}),m.appendChild(w),v.appendChild(m)});let O=document.createElement("div");O.style.height="80px",v.appendChild(O)}function C(O,F,B,l){let m=document.createElement("div"),y=Mt[l]||Mt.history;m.style.cssText=`
          display: flex; align-items: center; gap: 16px;
          padding: 12px 16px; 
          background: #FFFFFF; 
          border: 1px solid transparent;
          border-radius: 16px; 
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative; overflow: hidden;
      `;let w=document.createElement("div");w.style.cssText=`
          width: 40px; height: 40px; border-radius: 12px;
          background: ${y.bg}; color: ${y.color};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
      `,w.innerHTML=F||tt.tasks;let D=w.querySelector("svg");D&&(D.style.width="22px",D.style.height="22px");let N=document.createElement("div");N.style.cssText="flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden;";let k=document.createElement("div");k.style.cssText=`font-size: 14px; font-weight: 600; color: ${i.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,k.textContent=O.name;let M=document.createElement("div");M.style.cssText=`font-size: 12px; color: ${i.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,M.textContent=O.desc,N.appendChild(k),N.appendChild(M);let z=document.createElement("div");return z.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',z.style.cssText=`
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9AA0A6; transition: all 0.2s; opacity: 0;
      `,z.title="Copiar URL",m.onmouseenter=()=>{m.style.transform="translateY(-2px)",m.style.boxShadow="0 8px 20px rgba(0,0,0,0.08)",m.style.borderColor="rgba(0,0,0,0.05)",m.style.borderLeft=`4px solid ${y.color}`,z.style.opacity="1",z.style.background="#F1F3F4"},m.onmouseleave=()=>{m.style.transform="translateY(0)",m.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",m.style.border="1px solid transparent",z.style.opacity="0",z.style.background="transparent"},m.onclick=()=>{!B&&l&&_o(O,l),window.open(O.url,"_blank")},z.onclick=H=>{H.stopPropagation(),Q.playClick(),navigator.clipboard.writeText(O.url),!B&&l&&_o(O,l),U("Link copiado!")},m.appendChild(w),m.appendChild(N),m.appendChild(z),m}g.addEventListener("input",O=>{t=O.target.value,I()});function L(){n=!n,Ie(n,a,"cw-btn-links")}return document.body.appendChild(a),A(),I(),L}var He=[];function Qt(e){He=e}var rn=["lucaste","ricardogi"],ln=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function Do(){let e="v4.9",t=!1,n=null,o=null;function s(l){if(!l)return"";try{let m=new Date(l);return isNaN(m.getTime())?String(l):m.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(l)}}if(!document.getElementById("cw-broadcast-hd-css")){let l=document.createElement("style");l.id="cw-broadcast-hd-css",l.innerHTML=`
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
      `,document.head.appendChild(l)}let i={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},a={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function r(l){return l?Object.entries(l).map(([m,y])=>`${m.replace(/[A-Z]/g,w=>"-"+w.toLowerCase())}:${y}`).join(";"):""}function d(l){if(!l||typeof l!="string")return"";let m=l;return m=m.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),m=m.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),m=m.replace(/_(.*?)_/g,"<i>$1</i>"),m=m.replace(/\n/g,"<br>"),m=go(m),m}let h=document.createElement("div");h.id="broadcast-popup",h.classList.add("cw-module-window"),Object.assign(h.style,ke,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let p={popup:h,googleLine:null};function c(){if(t=!t,Ie(t,h,"cw-btn-broadcast"),t){let l=document.getElementById("cw-btn-broadcast");l&&l.classList.remove("has-new"),S()}}let x=Oe(h,"Central de Avisos",e,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",p,()=>c()),u=x.querySelector(".cw-header-actions")||x.lastElementChild,f=null;function g(){let l=null;try{l=Ct()}catch{console.warn("TechSol: Auth Pending")}if(l){let m=l.split("@")[0].toLowerCase(),y=rn.includes(m);if(window._cwIsAdmin=y,window._cwCurrentUser=m,y&&u&&!u.querySelector("#cw-admin-btn")){let w=document.createElement("div");w.id="cw-admin-btn",w.className="cw-btn-interactive",w.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(w.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),w.title="Novo Aviso",w.onclick=D=>{D.stopPropagation(),V()},u.insertBefore(w,u.firstChild),f||E(),I()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(g,2e3))}if(u){let l=document.createElement("button");l.textContent="Limpar",l.className="cw-btn-interactive",Object.assign(l.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),l.onclick=m=>{m.stopPropagation(),Q.playSuccess();let y=He.map(w=>w.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(y)),I(),q()},u.insertBefore(l,u.firstChild)}h.appendChild(x);let v=document.createElement("div");v.id="cw-update-status",v.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",h.appendChild(v);function E(){f=document.createElement("div"),f.className="cw-editor-overlay",f.innerHTML=`
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
      `,f.querySelectorAll('input[name="cw-bc-type"]').forEach(w=>{w.addEventListener("change",()=>{f.querySelectorAll(".cw-radio-option").forEach(D=>D.classList.remove("checked")),w.parentElement.classList.add("checked")})}),setTimeout(()=>{let w=f.querySelector(".cw-radio-option.info");w&&w.classList.add("checked")},100);let l=f.querySelector("#cw-bc-cancel"),m=f.querySelector("#cw-bc-close-x"),y=f.querySelector("#cw-bc-send");l.onclick=j,m.onclick=j,y.onclick=P,h.appendChild(f)}function V(l=null){if(!f)return;let m=f.querySelector("#cw-editor-title-label"),y=f.querySelector("#cw-bc-title"),w=f.querySelector("#cw-bc-text"),D=f.querySelector("#cw-bc-send");if(l){o=l.id,m.textContent="Editar Aviso",y.value=l.title||"",w.value=l.text||"",D.textContent="Salvar Altera\xE7\xF5es";let N=l.type||"info",k=f.querySelector(`input[name="cw-bc-type"][value="${N}"]`);k&&k.click()}else{o=null,m.textContent="Novo Aviso",y.value="",w.value="",D.textContent="Publicar";let N=f.querySelector('input[name="cw-bc-type"][value="info"]');N&&N.click()}f.classList.add("active"),setTimeout(()=>y.focus(),300)}function j(){f&&f.classList.remove("active"),o=null}async function P(){let l=f.querySelector("#cw-bc-send"),m=f.querySelector("#cw-bc-title"),y=f.querySelector("#cw-bc-text"),w=f.querySelector('input[name="cw-bc-type"]:checked'),D=w?w.value:"info";if(!m.value.trim()||!y.value.trim()){U("Preencha todos os campos!",{error:!0});return}l.textContent="Salvando...",l.style.opacity="0.7";let N=!1;o?N=await Se.updateBroadcast(o,{title:m.value,text:y.value,type:D}):N=await Se.sendBroadcast({title:m.value,text:y.value,type:D,author:window._cwCurrentUser||"admin"}),N?(U(o?"Atualizado!":"Publicado!"),Q.playSuccess(),j(),setTimeout(()=>S(),1500)):(U("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),l.textContent=o?"Salvar Altera\xE7\xF5es":"Publicar",l.style.opacity="1")}async function A(l){if(confirm("Confirma a exclus\xE3o deste aviso?"))if(await Se.deleteBroadcast(l)){U("Aviso removido."),Q.playClick();let y=He.findIndex(w=>w.id===l);y>-1&&He.splice(y,1),I(),setTimeout(()=>S(),1500)}else U("Erro ao excluir.",{error:!0})}let T=document.createElement("div");T.className="cw-nice-scroll",Object.assign(T.style,i.feedContainer),h.appendChild(T);async function S(){t&&(v.style.display="block",v.innerHTML="\u{1F504} Sincronizando...");try{let l=await Se.fetchData();l&&l.broadcast&&(Qt(l.broadcast),q(),t&&(I(),v.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{v.style.display="none"},1500)))}catch{t&&(v.innerHTML="\u26A0\uFE0F Offline")}}function q(){let l=document.getElementById("cw-btn-broadcast");if(!l)return;let m=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(He.some(w=>!m.includes(w.id))){if(l.classList.add("has-new"),!l.querySelector(".cw-badge")){let w=document.createElement("div");w.className="cw-badge",Object.assign(w.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),l.appendChild(w)}}else{l.classList.remove("has-new");let w=l.querySelector(".cw-badge");w&&w.remove()}}function I(){T.innerHTML="";let l=h.querySelector("#cw-bau-widget");l&&l.remove();let m=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),y=[...He].sort((M,z)=>{let H=new Date(M.date).getTime()||0;return(new Date(z.date).getTime()||0)-H}),w=y.findIndex(M=>M.title&&M.title.toLowerCase().includes("disponibilidade bau"));if(w!==-1){let M=y[w];y.splice(w,1);let z=document.createElement("div");z.id="cw-bau-widget",Object.assign(z.style,i.bauContainer);let H=[],Y=(M.text||"").split(`
`),_=/\d{1,2}\/\d{1,2}/;if(Y.forEach(ue=>{let ie=ue.match(_);if(ie){let qe=ie[0],ce="\u{1F4C5}";/🇧🇷|🇵🇹|PT|BR/i.test(ue)?ce="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(ue)&&(ce="\u{1F1EA}\u{1F1F8}"),H.some(we=>we.flag===ce&&we.date===qe)||H.push({flag:ce,date:qe})}}),H.length===0){let ue=(M.text||"").match(/\d{1,2}\/\d{1,2}/g);ue&&[...new Set(ue)].forEach(ie=>H.push({flag:"\u{1F4C5}",date:ie}))}let G="",X='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(X=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${X}
              `),H.length>0?G=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${H.map(ie=>`
                  <div style="${r(i.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${r(i.bauFlag)}">${ie.flag}</span>
                      <span style="${r(i.bauDate)}">${ie.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${X}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${d(M.text)}</div>
              `:G=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${d(M.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,z.innerHTML=`
              <div style="${r(i.bauHeader)}; margin-bottom:8px;">
                  <div style="${r(i.liveIndicator)}">
                      <div style="${r(i.pulseDot)}"></div>
                      <span style="${r(i.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${s(M.date)}</div>
              </div>
              ${G}
          `,v.after(z);let me=z.querySelector("#cw-bau-toggle-btn"),Ee=z.querySelector("#cw-bau-full");if(me&&Ee&&(me.onclick=()=>{let ue=Ee.style.display==="none";Ee.style.display=ue?"block":"none",me.textContent=ue?"Ocultar":"Detalhes"}),window._cwIsAdmin){let ue=z.querySelector(".cw-bau-edit");ue&&(ue.onclick=()=>V(M))}}let D=y.sort((M,z)=>{let H=m.includes(M.id),Y=m.includes(z.id);return H===Y?0:H?1:-1});if(D.length===0&&!w){let M=document.createElement("div");Object.assign(M.style,i.emptyState),M.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,T.appendChild(M)}let N=D.filter(M=>!m.includes(M.id)),k=D.filter(M=>m.includes(M.id));if(N.forEach(M=>T.appendChild(C(M,!1))),k.length>0){let M=document.createElement("div");Object.assign(M.style,i.historyDivider),M.innerHTML=`<span>Hist\xF3rico (${k.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let z=document.createElement("div");Object.assign(z.style,i.historyContainer),k.forEach(Y=>z.appendChild(C(Y,!0)));let H=!1;M.onclick=()=>{Q.playClick(),H=!H,z.style.display=H?"flex":"none",M.querySelector("svg").style.transform=H?"rotate(180deg)":"rotate(0deg)"},T.appendChild(M),T.appendChild(z)}}function C(l,m){let y=document.createElement("div");Object.assign(y.style,m?i.cardHistory:i.card);let w=a[l.type]||a.info,D=document.createElement("div");Object.assign(D.style,i.cardHeader);let N=document.createElement("div");Object.assign(N.style,i.typeTag,{color:w.color,background:w.bg}),N.innerHTML=`${w.icon} <span>${l.type}</span>`;let k=document.createElement("span");if(Object.assign(k.style,i.dateTag),k.textContent=s(l.date),D.appendChild(N),m)D.appendChild(k);else{let _=document.createElement("button");_.className="cw-btn-interactive",Object.assign(_.style,i.dismissBtn),_.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',_.onmouseenter=()=>{_.style.color="#1e8e3e",_.style.background="#e6f4ea",_.style.borderColor="#1e8e3e"},_.onmouseleave=()=>{_.style.color="#5f6368",_.style.background="#fff",_.style.borderColor="rgba(0,0,0,0.1)"},_.onclick=G=>{G.stopPropagation(),Q.playClick(),y.style.transform="translateX(20px)",y.style.opacity="0",setTimeout(()=>{let X=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");X.push(l.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(X)),I(),q()},200)},D.appendChild(_)}let M=document.createElement("div");Object.assign(M.style,i.cardContent);let z=document.createElement("div");Object.assign(z.style,i.msgTitle),z.textContent=l.title;let H=document.createElement("div");Object.assign(H.style,i.msgBody),H.innerHTML=d(l.text);let Y=document.createElement("div");if(Object.assign(Y.style,i.msgMeta),Y.innerHTML=`Publicado por <b>${l.author||"Sistema"}</b>`,m||(Y.innerHTML+=` \u2022 ${s(l.date)}`),M.appendChild(z),M.appendChild(H),M.appendChild(Y),y.appendChild(D),y.appendChild(M),window._cwIsAdmin){let _=document.createElement("div");_.className="cw-card-actions";let G=document.createElement("button");G.className="cw-action-btn edit",G.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',G.onclick=()=>V(l);let X=document.createElement("button");X.className="cw-action-btn delete",X.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',X.onclick=()=>A(l.id),_.appendChild(G),_.appendChild(X),y.appendChild(_)}return y}let L=Se.getCachedBroadcasts();L.length>0&&(Qt(L),I()),setTimeout(g,500),S(),n||(n=setInterval(S,ln));let O=document.createElement("div");Object.assign(O.style,ot),O.className="no-drag",h.appendChild(O),nt(h,O),document.body.appendChild(h);let F=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),B=He.some(l=>!F.includes(l.id));return{toggle:c,hasUnread:B}}function zo(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let e=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],t=0,n={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},o=document.createElement("div");Object.assign(o.style,n.overlay);let s=document.createElement("div");Object.assign(s.style,n.card);let i=document.createElement("div");Object.assign(i.style,n.icon);let a=document.createElement("div");Object.assign(a.style,n.title);let r=document.createElement("div");Object.assign(r.style,n.text);let d=document.createElement("div");Object.assign(d.style,n.dotsContainer);let h=document.createElement("div");Object.assign(h.style,n.btnContainer);let p=document.createElement("button");p.textContent="Pular",Object.assign(p.style,n.btn,n.btnSkip),p.onmouseover=()=>p.style.color="#202124",p.onmouseout=()=>p.style.color="#5f6368";let c=document.createElement("button");c.textContent="Pr\xF3ximo",Object.assign(c.style,n.btn,n.btnNext),c.onmouseover=()=>c.style.transform="scale(1.05)",c.onmouseout=()=>c.style.transform="scale(1)",h.appendChild(p),h.appendChild(c),s.appendChild(i),s.appendChild(a),s.appendChild(r),s.appendChild(d),s.appendChild(h),o.appendChild(s),document.body.appendChild(o);function x(f){let g=e[f];i.textContent=g.icon,a.textContent=g.title,r.textContent=g.text,d.innerHTML="",e.forEach((v,E)=>{let V=document.createElement("div");Object.assign(V.style,n.dot),E===f&&Object.assign(V.style,n.dotActive),d.appendChild(V)}),g.isLast?(p.style.display="none",c.textContent="Come\xE7ar \u{1F680}",c.style.width="100%"):(p.style.display="block",c.textContent="Pr\xF3ximo",c.style.width="auto")}function u(){localStorage.setItem("cw_onboarding_seen_v1","true"),o.style.opacity="0",s.style.transform="translateY(20px)",setTimeout(()=>o.remove(),400),Q.playSuccess(),U("Tudo pronto! Use o menu flutuante.")}c.onclick=()=>{Q.playClick(),t<e.length-1?(t++,x(t)):u()},p.onclick=()=>{confirm("Pular o tutorial?")&&u()},x(0),requestAnimationFrame(()=>{o.style.opacity="1",s.style.transform="translateY(0)"})}var Bo={version:"v5.0",title:"Atualiza\xE7\xE3o: v5.0 \u{1F680}",slides:[{icon:"\u{1F30D}",title:"Time Zone Traveler",text:"Nunca mais erre o hor\xE1rio! Novo m\xF3dulo visual para monitorar fusos da LATAM & Ib\xE9ria, com planejador de chamadas gr\xE1fico e sistema de favoritos."},{icon:"\u{1F4E2}",title:"Broadcast: Poder para Lideran\xE7a",text:"Agora TLs e Overheads podem enviar comunicados urgentes e avisos de BAU diretamente pela ferramenta. Comunica\xE7\xE3o instant\xE2nea e centralizada."},{icon:"\u{1F91D}",title:"Split & Transfer 2.0",text:"M\xF3dulo de transfer\xEAncia reconstru\xEDdo! Agora com valida\xE7\xE3o de campos, 'Magic Fill' para dados t\xE9cnicos e um fluxo \xE0 prova de erros."},{icon:"\u2728",title:"Nova 'Fluid UI'",text:"A interface agora respira. A 'P\xEDlula' tem f\xEDsica realista, fecha suavemente para n\xE3o atrapalhar e os menus flutuam com efeito Glassmorphism."},{icon:"\u{1F4DD}",title:"Cen\xE1rios Inteligentes",text:"O m\xF3dulo de Notas ganhou novos cen\xE1rios pr\xE9-configurados. Selecione o que aconteceu e a ferramenta escreve o texto t\xE9cnico para voc\xEA."},{icon:"\u{1F517}",title:"Links Redesenhados",text:"A Central de Links est\xE1 mais visual e organizada. Encontre suas ferramentas e dashboards em segundos com a nova busca r\xE1pida."},{icon:"\u{1F41B}",title:"Sua Voz Importa",text:"Adicionamos um atalho especial na aba 'Links' para voc\xEA reportar bugs ou sugerir novas funcionalidades diretamente para n\xF3s."}]};function Go(e){let t=localStorage.getItem("cw_last_version");if(!t){localStorage.setItem("cw_last_version",e);return}t!==e&&cn(e)}function cn(e){let t=Bo.slides,n=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"400px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(30px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"12px",background:"#E8F0FE",color:"#1967D2",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",marginBottom:"16px",letterSpacing:"0.5px"},icon:{fontSize:"42px",marginBottom:"16px",display:"block"},title:{fontSize:"20px",fontWeight:"700",color:"#202124",marginBottom:"8px"},text:{fontSize:"14px",color:"#5f6368",lineHeight:"1.5",marginBottom:"32px",minHeight:"42px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"6px",marginBottom:"24px"},dot:{width:"6px",height:"6px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"18px",borderRadius:"4px"},btn:{width:"100%",padding:"12px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"all 0.2s",background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},s=document.createElement("div");Object.assign(s.style,o.overlay);let i=document.createElement("div");Object.assign(i.style,o.card);let a=document.createElement("div");Object.assign(a.style,o.badge),a.textContent=`Atualiza\xE7\xE3o ${e}`;let r=document.createElement("div");Object.assign(r.style,o.icon);let d=document.createElement("div");Object.assign(d.style,o.title);let h=document.createElement("div");Object.assign(h.style,o.text);let p=document.createElement("div");Object.assign(p.style,o.dotsContainer);let c=document.createElement("button");Object.assign(c.style,o.btn),c.onmouseover=()=>c.style.transform="scale(1.02)",c.onmouseout=()=>c.style.transform="scale(1)",i.appendChild(a),i.appendChild(r),i.appendChild(d),i.appendChild(h),i.appendChild(p),i.appendChild(c),s.appendChild(i),document.body.appendChild(s);function x(f){let g=t[f];r.textContent=g.icon,d.textContent=g.title,h.textContent=g.text,p.innerHTML="",t.forEach((v,E)=>{let V=document.createElement("div");Object.assign(V.style,o.dot),E===f&&Object.assign(V.style,o.dotActive),p.appendChild(V)}),f===t.length-1?c.textContent="Entendi, vamos l\xE1! \u{1F44D}":c.textContent="Pr\xF3ximo"}function u(){localStorage.setItem("cw_last_version",e),s.style.opacity="0",i.style.transform="translateY(30px)",setTimeout(()=>s.remove(),400),Q.playSuccess(),U(`TechSol atualizado para ${e}!`)}c.onclick=()=>{Q.playClick(),n<t.length-1?(n++,x(n)):u()},x(0),requestAnimationFrame(()=>{s.style.opacity="1",i.style.transform="translateY(0)"})}var Po="cw_timezone_pinned",Zt=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan"}];function jo(){let e="v2.0 Pro",t=!1,n=null,o="mx",s=JSON.parse(localStorage.getItem(Po)||"[]"),i=new Date;i.setHours(14,0,0,0);let a={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",warning:"#E37400",error:"#D93025",night:"#1F2937",day:"#FFF7ED"},r={container:{display:"flex",flexDirection:"column",height:"100%",background:a.bg},tabHeader:{display:"flex",background:a.surface,borderBottom:`1px solid ${a.border}`,padding:"0 4px"},tabBtn:{flex:1,padding:"14px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:a.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease"},tabActive:{color:a.primary,borderBottomColor:a.primary,fontWeight:"600"},listContainer:{padding:"16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"10px"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",background:a.surface,borderRadius:"12px",border:`1px solid ${a.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.04)",transition:"transform 0.2s, box-shadow 0.2s"},hubCardPinned:{borderLeft:`4px solid ${a.primary}`},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"12px",alignItems:"stretch"},timeCard:{flex:1,padding:"16px",borderRadius:"16px",background:a.surface,border:`1px solid ${a.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",position:"relative",overflow:"hidden"},timelineContainer:{position:"relative",height:"48px",marginTop:"8px"},timelineTrack:{position:"absolute",top:"20px",left:"0",right:"0",height:"8px",borderRadius:"4px",background:"#E5E7EB",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.2)",pointerEvents:"none"},hdInput:{fontSize:"24px",fontWeight:"700",color:a.primary,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"monospace",cursor:"pointer"},statusBadge:{padding:"6px 12px",borderRadius:"20px",fontSize:"12px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"6px",marginTop:"12px",alignSelf:"center"}},d=document.createElement("div");d.id="timezone-popup",d.classList.add("cw-module-window"),Object.assign(d.style,ke,{right:"100px",width:"440px",height:"700px",overflow:"hidden"});let p=Oe(d,"Time Zone Traveler",e,"Monitoramento global e planejamento de chamadas.",{popup:d},()=>I());d.appendChild(p);let c=document.createElement("div");Object.assign(c.style,r.container),d.appendChild(c);let x=document.createElement("div");Object.assign(x.style,r.tabHeader);let u=document.createElement("div");u.textContent="Monitoramento",Object.assign(u.style,r.tabBtn,r.tabActive);let f=document.createElement("div");f.textContent="Planejador de Chamada",Object.assign(f.style,r.tabBtn),x.appendChild(u),x.appendChild(f),c.appendChild(x);let g=document.createElement("div");Object.assign(g.style,r.listContainer);let v=document.createElement("div");Object.assign(v.style,r.plannerWrapper,{display:"none"}),c.appendChild(g),c.appendChild(v),u.onclick=()=>E("live"),f.onclick=()=>E("plan");function E(C){Q.playClick(),C==="live"?(Object.assign(u.style,r.tabActive),Object.assign(f.style,r.tabBtn),f.style.borderBottomColor="transparent",g.style.display="flex",v.style.display="none",T()):(Object.assign(f.style,r.tabActive),Object.assign(u.style,r.tabBtn),u.style.borderBottomColor="transparent",v.style.display="flex",g.style.display="none",S(),A())}function V(C){return C>=9&&C<17?{color:a.success,label:"Aberto",icon:"\u{1F7E2}"}:C>=8&&C<9?{color:a.warning,label:"Abrindo",icon:"\u{1F7E1}"}:C>=17&&C<19?{color:a.warning,label:"Fechando",icon:"\u{1F7E1}"}:{color:a.error,label:"Fechado",icon:"\u{1F534}"}}function j(C){s.includes(C)?s=s.filter(L=>L!==C):s.push(C),localStorage.setItem(Po,JSON.stringify(s)),P(),Q.playClick()}function P(){g.innerHTML="";let C=new Date;[...Zt].sort((O,F)=>{let B=s.includes(O.id),l=s.includes(F.id);return B&&!l?-1:!B&&l?1:O.name.localeCompare(F.name)}).forEach(O=>{let F=s.includes(O.id),B=C.toLocaleTimeString("pt-BR",{timeZone:O.zone,hour:"2-digit",minute:"2-digit"}),l=parseInt(B.split(":")[0]),m=V(l),y=l<6||l>18,w=document.createElement("div");Object.assign(w.style,r.hubCard),F&&Object.assign(w.style,r.hubCardPinned);let D=F?"\u2605":"\u2606",N=F?"#F9AB00":"#BDC1C6";w.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn" style="cursor:pointer; font-size:18px; color:${N}; width:24px; text-align:center;">${D}</div>
                    <div style="font-size:28px;">${O.flag}</div>
                    <div>
                        <div style="font-size:14px; font-weight:700; color:${a.text};">${O.name}</div>
                        <div style="font-size:12px; color:${a.textSub}; display:flex; align-items:center; gap:4px;">
                            ${y?"\u{1F319}":"\u2600\uFE0F"} ${O.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:22px; font-weight:700; color:${a.text}; font-family:'Roboto Mono', monospace;">${B}</div>
                    <div style="font-size:11px; font-weight:600; color:${m.color}; display:flex; align-items:center; justify-content:flex-end; gap:4px;">
                        ${m.label} ${m.icon}
                    </div>
                </div>
            `,w.onmouseenter=()=>{w.style.backgroundColor="#F8F9FA"},w.onmouseleave=()=>{w.style.backgroundColor=a.surface};let k=w.querySelector(".cw-pin-btn");k.onclick=M=>{M.stopPropagation(),j(O.id)},w.onclick=()=>{o=O.id,E("plan")},g.appendChild(w)})}function A(){v.innerHTML="";let C=document.createElement("div"),L=document.createElement("label");L.textContent="Planejar com:",L.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase;";let O=document.createElement("select");Object.assign(O.style,At),Zt.forEach(G=>{let X=document.createElement("option");X.value=G.id,X.textContent=`${G.flag} ${G.name} (${G.zone})`,G.id===o&&(X.selected=!0),O.appendChild(X)}),O.onchange=G=>{o=G.target.value,_()},C.appendChild(L),C.appendChild(O),v.appendChild(C);let F=document.createElement("div");Object.assign(F.style,r.timeComparisonRow);let B=document.createElement("div");Object.assign(B.style,r.timeCard),B.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase;">\u{1F1E7}\u{1F1F7} Seu Hor\xE1rio</div>
            <input type="time" id="cw-time-input-br" style="${q(r.hdInput)}">
            <div style="font-size:11px; color:#5F6368;">Hor\xE1rio de Bras\xEDlia</div>
        `;let l=document.createElement("div");Object.assign(l.style,r.timeCard),l.style.backgroundColor="#F8F9FA",l.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase;">Cliente</div>
            <div id="cw-time-display-client" style="${q(r.hdInput)}; color:#202124;">--:--</div>
            <div id="cw-client-label" style="font-size:11px; color:#5F6368;">...</div>
        `,F.appendChild(B),F.appendChild(l),v.appendChild(F);let m=document.createElement("div");m.id="cw-planner-status",Object.assign(m.style,r.statusBadge),v.appendChild(m);let y=document.createElement("div");Object.assign(y.style,{padding:"0 8px"});let w=document.createElement("div");w.textContent="Arraste para simular o hor\xE1rio:",w.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:8px;";let D=document.createElement("div");Object.assign(D.style,r.timelineContainer);let N=document.createElement("div");Object.assign(N.style,r.timelineTrack);let k=document.createElement("input");k.type="range",k.min="0",k.max="1439",k.step="15",k.style.cssText="position:absolute; top:14px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let M=document.createElement("div");M.style.cssText="position:absolute; top:32px; width:100%; display:flex; justify-content:space-between; font-size:10px; color:#9AA0A6; padding:0 2px;",M.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>23h</span>",D.appendChild(N),D.appendChild(k),D.appendChild(M),y.appendChild(w),y.appendChild(D),v.appendChild(y);let z=B.querySelector("#cw-time-input-br"),H=l.querySelector("#cw-time-display-client"),Y=l.querySelector("#cw-client-label");function _(){let G=Zt.find(qe=>qe.id===o);Y.textContent=`${G.flag} ${G.label} (${G.zone})`;let X=i.getHours(),me=i.getMinutes(),Ee=`${String(X).padStart(2,"0")}:${String(me).padStart(2,"0")}`;z.value=Ee,k.value=X*60+me;let ue=i.toLocaleTimeString("pt-BR",{timeZone:G.zone,hour:"2-digit",minute:"2-digit"});H.textContent=ue;let ie=parseInt(ue.split(":")[0]);ie>=9&&ie<17?(m.style.background="#E6F4EA",m.style.color="#137333",m.innerHTML="\u2705 Hor\xE1rio Comercial Ideal"):ie>=8&&ie<9||ie>=17&&ie<19?(m.style.background="#FEF7E0",m.style.color="#B06000",m.innerHTML="\u26A0\uFE0F Hor\xE1rio Limite (Aten\xE7\xE3o)"):(m.style.background="#FCE8E6",m.style.color="#C5221F",m.innerHTML="\u26D4 Fora de Hor\xE1rio (Noite/Fechado)")}k.oninput=G=>{let X=parseInt(G.target.value);i.setHours(Math.floor(X/60)),i.setMinutes(X%60),_()},z.oninput=G=>{let[X,me]=G.target.value.split(":");X&&me&&(i.setHours(parseInt(X)),i.setMinutes(parseInt(me)),_())},_()}function T(){P(),n||(n=setInterval(P,6e4))}function S(){n&&(clearInterval(n),n=null)}function q(C){return Object.entries(C).map(([L,O])=>`${L.replace(/[A-Z]/g,F=>"-"+F.toLowerCase())}:${O}`).join(";")}function I(){t=!t,Ie(t,d,"cw-btn-timezone"),t?E("live"):S()}return document.body.appendChild(d),I}function dn(){if(window.techSolInitialized){Ht();return}window.techSolInitialized=!0;let e="v5.0";console.log(`\u{1F680} TechSol Suite Initializing (${e})...`);try{po();try{Q.initGlobalListeners(),Q.playStartup()}catch(r){console.warn("\xC1udio bloqueado:",r)}Se.fetchTips(),Ht();let t=Fo(),n=Lo(),o=No(),s=Ro(),i=jo(),a=Do();Ao({toggleNotes:t,toggleEmail:n,toggleScript:o,toggleLinks:s,toggleTimezone:i,broadcastControl:a}),setTimeout(()=>{Se.logEvent("App","Start","Session Start"),zo(),setTimeout(()=>{Go(e)},500)},2500)}catch(t){console.error("Erro fatal na inicializa\xE7\xE3o:",t),U("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}dn();})();
