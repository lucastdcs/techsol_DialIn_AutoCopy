(()=>{var St="",At="",lo=e=>new Promise(t=>setTimeout(t,e));async function co(){if(St&&At)return St;try{let e=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!e)return"Agente";e.click(),await lo(150);let t="Consultor",n=document.querySelector("profile-details .name");if(n)t=n.textContent.trim().split(" ")[0],t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();else{let s=document.querySelector("profile-details img");if(s&&s.src.includes("/photos/")){let i=s.src.match(/\/photos\/([^\?]+)/)[1];t=i.charAt(0).toUpperCase()+i.slice(1)}}let o=document.querySelector("profile-details .email");return o&&(At=o.textContent.trim(),console.log("TechSol: Identidade confirmada ->",At)),e.click(),document.body.click(),St=t,t}catch(e){return console.warn("Sherlock falhou:",e),"Consultor"}}function Gt(){return St||"Consultor"}function We(){return At||null}function po(e){let t=new Date,n=t.getHours(),o=t.getDay(),s="Ol\xE1",i="";n>=5&&n<12?(s="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):n>=12&&n<18?(s="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(s="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let a=[];n>=0&&n<5?a=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:n<12?o===1?a=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:o===5?a=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:a=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:n<18?a=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:a=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(o===0||o===6)&&(a=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let r=a[Math.floor(Math.random()*a.length)];return{prefix:`${s},`,name:e,suffix:r,icon:i,isFriday:o===5}}async function en(){try{let t=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!t)return null;let n=t.parentElement,o=n.querySelector(".unmask-button")||n.querySelector('[aria-label="Click to view"]');o&&(o.click(),await lo(500));let i=Array.from(n.querySelectorAll("a, span, div, pii-value")).find(a=>{let r=a.innerText.trim();return r.includes("@")&&!r.includes("Is this:")&&r.toLowerCase()!=="email"});return i?i.innerText.trim():null}catch(e){return console.warn("Erro ao capturar email do cliente:",e),null}}function tn(){try{let e=document.querySelector('material-input[debug-id="account-id-input"]');if(e){let t=e.querySelector("input");if(t){let n=t.value.trim();if(n)return n.includes("@")?n:`${n}@google.com`}}}catch(e){console.warn("Erro ao capturar email interno:",e)}return null}function on(){try{let t=Array.from(document.querySelectorAll(".data-pair-label")).find(s=>s.textContent.includes("Google Ads External Customer ID")||s.textContent.includes("Customer ID"));if(t){let s=t.closest("home-data-item")||t.parentElement;if(s){let i=s.querySelector(".data-pair-content");if(i)return i.textContent.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}}let o=document.body.innerText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);if(o)return o[0].replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(e){console.warn("Erro ao capturar CID:",e)}return"---"}async function Pe(){let e="Cliente",t="[INSERIR URL]";try{let a=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(a&&a.nextElementSibling){let r=a.nextElementSibling.innerText.trim();r&&(e=r)}}catch(i){console.warn("Falha Nome:",i)}try{let a=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(a&&a.nextElementSibling){let r=a.nextElementSibling.innerText.trim();r&&(t=r)}}catch(i){console.warn("Falha URL:",i)}let n=await en(),o=tn(),s=on();return{advertiserName:e,websiteUrl:t,clientEmail:n,internalEmail:o,cid:s,agentName:Gt()}}var ot=null,jt=null,He=.3;function tt(){if(!ot){let e=window.AudioContext||window.webkitAudioContext;e&&(ot=new e)}return ot&&ot.state==="suspended"&&ot.resume(),ot}function uo(e){if(jt)return jt;let t=e.sampleRate*2,n=e.createBuffer(1,t,e.sampleRate),o=n.getChannelData(0);for(let s=0;s<t;s++)o[s]=Math.random()*2-1;return jt=n,n}var X={playClick:()=>{let e=tt();if(!e)return;let t=e.currentTime,n=e.createBufferSource();n.buffer=uo(e);let o=e.createBiquadFilter();o.type="highpass",o.frequency.value=4e3;let s=e.createGain();s.gain.setValueAtTime(He*.8,t),s.gain.exponentialRampToValueAtTime(.001,t+.015),n.connect(o),o.connect(s),s.connect(e.destination),n.start(t),n.stop(t+.02)},playHover:()=>{let e=tt();if(!e)return;let t=e.currentTime,n=e.createOscillator();n.type="sine",n.frequency.setValueAtTime(400,t);let o=e.createGain();o.gain.setValueAtTime(0,t),o.gain.linearRampToValueAtTime(He*.1,t+.005),o.gain.linearRampToValueAtTime(0,t+.02),n.connect(o),o.connect(e.destination),n.start(t),n.stop(t+.03)},playSuccess:()=>{let e=tt();if(!e)return;let t=e.currentTime;[1046.5,1567.9].forEach((o,s)=>{let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=o,a.gain.setValueAtTime(0,t),a.gain.linearRampToValueAtTime(He*.6,t+.05),a.gain.exponentialRampToValueAtTime(.001,t+.6),i.connect(a),a.connect(e.destination),i.start(t),i.stop(t+.7)})},playGenieOpen:()=>{let e=tt();if(!e)return;let t=e.currentTime,n=e.createBufferSource();n.buffer=uo(e);let o=e.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(100,t),o.frequency.exponentialRampToValueAtTime(800,t+.2);let s=e.createGain();s.gain.setValueAtTime(0,t),s.gain.linearRampToValueAtTime(He*.5,t+.05),s.gain.linearRampToValueAtTime(0,t+.25),n.connect(o),o.connect(s),s.connect(e.destination),n.start(t),n.stop(t+.3)},playError:()=>{let e=tt();if(!e)return;let t=e.currentTime,n=e.createOscillator(),o=e.createGain();n.type="triangle",n.frequency.setValueAtTime(120,t),n.frequency.exponentialRampToValueAtTime(80,t+.1),o.gain.setValueAtTime(He,t),o.gain.exponentialRampToValueAtTime(.001,t+.15),n.connect(o),o.connect(e.destination),n.start(t),n.stop(t+.2)},playStartup:()=>{let e=tt();if(!e)return;let t=e.currentTime,n=.12,o=e.createOscillator(),s=e.createGain(),i=e.createBiquadFilter();o.type="square",o.frequency.setValueAtTime(400,t),o.frequency.exponentialRampToValueAtTime(50,t+.1),i.type="lowpass",i.frequency.setValueAtTime(800,t),i.frequency.exponentialRampToValueAtTime(100,t+.1),s.gain.setValueAtTime(He*4,t),s.gain.exponentialRampToValueAtTime(.001,t+.1),o.connect(i),i.connect(s),s.connect(e.destination),o.start(t),o.stop(t+.12);let a=e.createOscillator(),r=e.createGain();a.type="sine",a.frequency.setValueAtTime(150,t),a.frequency.exponentialRampToValueAtTime(50,t+.15),r.gain.setValueAtTime(He*1.5,t),r.gain.exponentialRampToValueAtTime(.001,t+.15),a.connect(r),r.connect(e.destination),a.start(t),a.stop(t+.15),[55,55.4,110.5].forEach(l=>{let p=e.createOscillator(),m=e.createGain(),f=e.createBiquadFilter();p.type="sawtooth",p.frequency.value=l,f.type="lowpass",f.frequency.setValueAtTime(30,t),f.frequency.linearRampToValueAtTime(900,t+n+.2),f.frequency.exponentialRampToValueAtTime(40,t+3),m.gain.setValueAtTime(0,t),m.gain.linearRampToValueAtTime(He*.6,t+n+.1),m.gain.exponentialRampToValueAtTime(.001,t+3.5),p.connect(f),f.connect(m),m.connect(e.destination),p.start(t),p.stop(t+3.6)})},playNotification:()=>{let e=tt();if(!e)return;let t=e.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(o=>{let s=e.createOscillator(),i=e.createGain();s.type="sine",s.frequency.setValueAtTime(o.freq,t),i.gain.setValueAtTime(0,t),i.gain.linearRampToValueAtTime(He*o.vol,t+.004),i.gain.exponentialRampToValueAtTime(.001,t+o.dur),s.connect(i),i.connect(e.destination),s.start(t),s.stop(t+o.dur+.1)})},playSwoosh:()=>{X.playGenieOpen()},playReset:()=>{X.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let e=0,t=50;document.addEventListener("mouseover",n=>{if(!ot)return;let o=n.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!o||o.contains(n.relatedTarget))return;let s=Date.now();s-e<t||(X.playHover(),e=s)},{passive:!0})}};var mo=1e4;function bo(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
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
    `,document.head.appendChild(t)}function V(e,t={}){let n=document.createElement("div"),o=t.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(n.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:o,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),n.textContent=e,document.body.appendChild(n),t.error?X.playError():X.playSuccess(),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>n.remove(),400)},t.duration||4e3)}function fo(e,t=null){let n=0,o=0,s=0,i=0,a=t||e;a.style.cursor="grab",a.onmousedown=r;function r(p){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(p.target.tagName)||p.target.closest(".no-drag"))return;p=p||window.event,a.style.cursor="grabbing",e.style.transition="none";let m=e.getBoundingClientRect();e.style.transform="none",e.style.left=m.left+"px",e.style.top=m.top+"px",e.style.margin="0",e.style.bottom="auto",e.style.right="auto",mo++,e.style.zIndex=mo,s=p.clientX,i=p.clientY,e.setAttribute("data-dragging","true"),document.onmouseup=l,document.onmousemove=c}function c(p){p=p||window.event,p.preventDefault(),n=s-p.clientX,o=i-p.clientY,s=p.clientX,i=p.clientY;let m=e.offsetTop-o,f=e.offsetLeft-n,x=16,h=window.innerWidth,g=window.innerHeight,E=e.offsetWidth,C=e.offsetHeight;f<x?f=x:f+E>h-x&&(f=h-E-x),m<x?m=x:m+C>g-x&&(m=g-C-x),e.style.top=m+"px",e.style.left=f+"px"}function l(){document.onmouseup=null,document.onmousemove=null,a.style.cursor="grab",setTimeout(()=>{e.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",e.setAttribute("data-dragging","false"),e.setAttribute("data-moved","true")},50)}}var ke={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var Ht={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Et={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var xo={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var Oe={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var Pt=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],go=-1;function ut(){let e=Math.floor(Math.random()*Pt.length);return e===go&&(e=(e+1)%Pt.length),go=e,Pt[e]}var $e=e=>new Promise(t=>setTimeout(t,e));async function nn(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let n=e.querySelector(".cursor");await $e(200);for(let o=0;o<t.length;o++){let s=t.charAt(o),i=document.createElement("span");i.textContent=s,n&&n.parentNode===e?n.before(i):e.appendChild(i);let a=Math.floor(Math.random()*60)+30;o===0&&(a=150),o>t.length-3&&(a=30),await $e(a)}await $e(600),n&&(n.style.display="none")}async function $t(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
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
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await $e(200);let t=await co(),n=po(t),o=e.querySelector("#w-icon"),s=e.querySelector("#p1"),i=e.querySelector("#p2"),a=e.querySelector("#p3"),r=e.querySelector("#p-sextou");o&&(o.innerHTML=n.icon),s&&(s.textContent=n.prefix),a&&(a.textContent=n.suffix),await $e(300);let c=o?o.querySelector("svg"):null;if(c&&(c.style.opacity="1",c.style.transform="scale(1)"),await $e(400),s&&(s.style.opacity="1"),X.playStartup(),i&&await nn(i,n.name),a&&(a.style.opacity="1",a.style.transform="translateY(0)"),n.isFriday&&r){await $e(400),r.style.display="block",r.offsetWidth;let l=r.querySelector(".sextou-badge");l&&(l.style.opacity="1",l.style.transform="scale(1)")}await $e(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await $e(900),e.parentNode&&e.parentNode.removeChild(e)}}var Ye={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Xe(e,t){t.onmousedown=n;function n(o){o.stopPropagation(),o.preventDefault();let s=e.style.transition;e.style.transition="none";let i=o.clientX,a=o.clientY,r=parseFloat(getComputedStyle(e,null).getPropertyValue("width").replace("px","")),c=parseFloat(getComputedStyle(e,null).getPropertyValue("height").replace("px","")),l=i,p=a,m=!1;function f(g){l=g.clientX,p=g.clientY,m||(window.requestAnimationFrame(()=>{x(),m=!1}),m=!0)}function x(){let g=r+(l-i),E=c+(p-a);g>360&&(e.style.width=g+"px"),E>300&&(e.style.height=E+"px")}function h(){document.removeEventListener("mousemove",f),document.removeEventListener("mouseup",h),setTimeout(()=>{e.style.transition=s},50)}document.addEventListener("mousemove",f),document.addEventListener("mouseup",h)}t.onmouseenter=()=>t.style.opacity="1",t.onmouseleave=()=>t.style.opacity="0.6"}function ho(e){if(!e)return"";let t={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return e.replace(/:([a-zA-Z0-9-_+]+):/g,n=>t[n]?t[n]:"")}var lt=e=>new Promise(t=>setTimeout(t,e));function mt(e){e&&["mousedown","mouseup","click"].forEach(t=>e.dispatchEvent(new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window})))}var yo="cw-automation-styles";if(!document.getElementById(yo)){let e=document.createElement("style");e.id=yo,e.innerHTML=`
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
    `,document.head.appendChild(e)}function vo(e){let t=document.getElementById("cw-loading-overlay");e?t?t.style.opacity="1":(t=document.createElement("div"),t.id="cw-loading-overlay",document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1")):t&&(t.style.opacity="0",setTimeout(()=>t.remove(),300))}async function wo(e){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let t=document.getElementById(e),n="";vo(!0),t&&(n=t.placeholder,t.placeholder="Buscando ID...",t.value="",t.classList.add("cw-scanning-active"));try{let o=document.querySelector('material-button[debug-id="dock-item-case-log"]');o&&!o.classList.contains("selected")&&(mt(o),await lt(1200));let s=document.querySelector("search-filter dropdown-button .button");if(s&&!(s.innerText||"").includes("All")){mt(s),await lt(600);let f=document.querySelector('material-checkbox[debug-id="check-all-box"]');f&&f.getAttribute("aria-checked")!=="true"&&(mt(f),await lt(300));let x=document.querySelector('material-button[debug-id="apply-filter"]');x&&(mt(x),await lt(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await lt(500));let a=Array.from(document.querySelectorAll(".message-header"));for(let m=a.length-1;m>=0;m--){let f=a[m],x=f.querySelector("i.material-icons-extended"),h=x&&x.innerText.trim()==="phone_in_talk",g=f.innerText||"",E=g.includes("Agent joined")||g.includes("outbound-call")||g.includes("Speakeasy");if(h||E){f.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",f),t&&(t.placeholder="Lendo mensagem..."),mt(f),await lt(1e3));break}}let c=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),l=/Speakeasy.*?(P\d{15,25})/i,p=null;for(let m=c.length-1;m>=0;m--){let f=c[m];if(f.offsetParent===null)continue;let x=(f.innerText||"").match(l);if(x&&x[1]){p=x[1];break}}if(t)if(p){try{await navigator.clipboard.writeText(p)}catch{}t.value=p,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),X.playSuccess(),V(`ID Localizado: ${p}`),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}else X.playError(),V("Nenhum ID encontrado.",{error:!0}),t.placeholder="N\xE3o encontrado",t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}catch(o){console.error("Erro na automa\xE7\xE3o:",o),V("Erro ao processar.",{error:!0})}finally{t&&(t.classList.remove("cw-scanning-active"),t.value||(t.placeholder=n)),vo(!1)}}var Ve={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:"}},Ne={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},gt={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>Substatus:</b> DC - Other<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br>Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},nt={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},bt=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],Vt=["CONSIDERACOES","COMENTARIOS"],Be={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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
\u2022 Tentativa 2 -`}};var we=e=>new Promise(t=>setTimeout(t,e));function Fe(e,t="info"){let n={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${e}`,n[t]||n.info)}function Ge(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>e.dispatchEvent(new MouseEvent(n,t)))}function Tt(e,t){if(!e)return;let n=`cw-warning-${e.id||Math.random().toString(36).substr(2,9)}`,o=document.getElementById(n);o&&o.remove();let s=e.getBoundingClientRect(),i=document.createElement("div");i.id=n,i.style.cssText=`
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
    `;let a=i.querySelector(".cw-close-btn");a.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&a.click()},25e3)}async function kt(e,t){if(!e||!t)return;e.focus(),e.value="",e.dispatchEvent(new Event("input",{bubbles:!0})),await we(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),await we(100),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function Ut(){let t=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(n=>{let o=n.offsetParent!==null,s=n.closest("case-message-view")!==null,i=n.closest(".editor")!==null||n.closest("write-card")!==null;return o&&!s&&i});return t&&Fe("Editor visualmente detectado.","success"),t}async function Co(){Fe("\u{1F680} FASE 1: Tentando abrir a janela de email...");let e=!1,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(m=>m.innerText.trim()==="email");if(n&&n.offsetParent!==null){Fe("Bot\xE3o de email direto encontrado.");let m=n.closest("material-button")||n.closest("material-fab")||n;Ge(m),e=!0}else{Fe("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let m=document.querySelector("material-fab-speed-dial");if(m){let f=m.querySelector(".trigger");if(f){Ge(f),await we(800);let h=Array.from(document.querySelectorAll("i.material-icons-extended")).find(g=>g.innerText.trim()==="email");h&&(Ge(h),e=!0)}}}if(!e)return V("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;Fe("\u{1F680} FASE 2: Verificando rascunhos...");let o=null,s=0,i=20;for(;s<i;){await we(250);let m=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(o=Array.from(m).find(f=>f.offsetParent!==null),o){Fe("\u26A0\uFE0F Rascunho detectado!","warn");break}s++}if(o){Fe("\u{1F5D1}\uFE0F Descartando..."),Ge(o),o.click();let m=null,f=0;for(;f<15;){await we(300);let x=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(m=Array.from(x).find(h=>h.offsetParent!==null),m)break;f++}m&&(Ge(m),V("Limpando rascunho antigo...",{duration:2e3}),await we(2500))}Fe("\u{1F680} FASE 3: Buscando editor final...");let a=0,r=null;for(;a<20&&(r=Ut(),!r);)await we(250),a++;if(!r)return V("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let c=r.closest('[id="email-body-content-top"]'),p=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(c){if(p){let f=p.closest('[aria-hidden="true"]');f&&f.removeAttribute("aria-hidden"),p.focus(),Ge(p)}await we(300),c.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let m=c.querySelector("#cases-body-field");if(m){let f=document.createRange();f.selectNodeContents(m),f.collapse(!0);let x=window.getSelection();x.removeAllRanges(),x.addRange(f)}return!0}return!1}async function Ot(e){if(!e||!await Co())return;let n=await Pe();Fe("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let o=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(o&&(o.click(),await we(600)),n.clientEmail&&n.clientEmail!=="N/A"&&n.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await kt(i,n.clientEmail),Tt(i,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(n.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await kt(i,n.internalEmail),Tt(i,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}await we(500);let s=document.querySelector('material-button[debug-id="canned_response_button"]');if(s){Ge(s),await we(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){Ge(i),document.execCommand("insertText",!1,e),i.dispatchEvent(new Event("input",{bubbles:!0})),Fe("\u23F3 Buscando resultado da Canned Response...","info");let a=null,r=0,c=15e3,l=500;for(;r<c&&(a=document.querySelector("material-select-dropdown-item"),!a);)await we(l),r+=l;if(a){Ge(a),await we(1500);let p=Ut();if(p){let f=Array.from(p.querySelectorAll("span.field")).filter(h=>h.innerText.includes("{Requested Task Type}"));if(f.length>0){let h=f.map(E=>E.closest("tr")).filter(E=>E!==null),g=[...new Set(h)];if(g.length>0){let C=g[0].querySelector('td[width="100%"]');C&&(C.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let P=1;P<g.length;P++)g[P].remove()}}let x=p.innerHTML;n.advertiserName&&x.includes("{%ADVERTISER_NAME%}")&&(x=x.replace(/{%ADVERTISER_NAME%}/g,n.advertiserName)),x.includes("{%^79285%}")&&(x=x.replace(/{%\^79285%}/g,n.websiteUrl||"seu site")),p.innerHTML=x}V("Canned Response aplicada!")}else Fe(`\u274C Timeout: Resultado '${e}' n\xE3o apareceu ap\xF3s 15s.`,"error"),V(`Timeout: Template '${e}' n\xE3o carregou.`,{error:!0})}}else V("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function So(e){if(Fe(`\u{1F680} Iniciando Quick Email: ${e.name}`),!await Co())return;let n=await Pe(),o=Gt();await we(600);let s=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(s&&(s.click(),await we(600)),n.clientEmail&&n.clientEmail!=="N/A"&&n.clientEmail!=="N/A (Bloqueado)"){let r=document.querySelector('input[aria-label="Enter To email address"]');r&&(await kt(r,n.clientEmail),Tt(r,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(n.internalEmail){let r=document.querySelector('input[aria-label="Enter Bcc email address"]');r&&(await kt(r,n.internalEmail),Tt(r,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}let i=document.querySelector('input[aria-label="Subject"]');i&&e.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,e.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await we(300));let a=Ut();if(a){let c=(a.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');c&&(c.focus(),Ge(c));let l=new Date;l.setDate(l.getDate()+3);let p=l.getDay();p===6?l.setDate(l.getDate()+2):p===0&&l.setDate(l.getDate()+1);let m=l.toLocaleDateString("pt-BR"),f=e.body;f=f.replace(/\[Nome do Cliente\]/g,n.advertiserName||"Cliente"),f=f.replace(/\[INSERIR URL\]/g,n.websiteUrl||"seu site"),f=f.replace(/\[URL\]/g,n.websiteUrl||"seu site"),f=f.replace(/\[Seu Nome\]/g,o),f=f.replace(/\[MM\/DD\/YYYY\]/g,m),document.execCommand("insertHTML",!1,f),c&&(c.dispatchEvent(new Event("input",{bubbles:!0})),c.dispatchEvent(new Event("change",{bubbles:!0}))),V("Email preenchido com sucesso!",{duration:2e3}),Fe("\u2705 Processo finalizado com sucesso.","success")}else V("Erro ao focar no editor.",{error:!0})}var an={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},Ao={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function Ie(e,t,n,o,s,i){let a=document.createElement("div");Object.assign(a.style,an),fo(e,a);let r=document.createElement("div");Object.assign(r.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),a.appendChild(r),s&&(s.googleLine=r);let c=document.createElement("div");Object.assign(c.style,{display:"flex",alignItems:"center",gap:"12px"});let l=document.createElement("img");l.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(l.style,{width:"20px",height:"20px",pointerEvents:"none"});let p=document.createElement("span");p.textContent=t,c.appendChild(l),c.appendChild(p);let m=document.createElement("div");Object.assign(m.style,{display:"flex",alignItems:"center",gap:"4px"});let f='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',x='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',h=document.createElement("div");h.innerHTML=f,Object.assign(h.style,Ao),h.title="Sobre & Feedback",h.classList.add("no-drag"),h.onmouseenter=()=>{h.style.background="rgba(255,255,255,0.1)",h.style.color="#FFF"},h.onmouseleave=()=>{h.style.color!=="rgb(138, 180, 248)"&&(h.style.background="transparent",h.style.color="#9AA0A6")};let g=document.createElement("div");g.innerHTML=x,Object.assign(g.style,Ao),g.title="Fechar",g.classList.add("no-drag"),g.onmouseenter=()=>{g.style.background="rgba(242, 139, 130, 0.2)",g.style.color="#F28B82"},g.onmouseleave=()=>{g.style.background="transparent",g.style.color="#9AA0A6"},g.onmousedown=C=>C.stopPropagation(),h.onmousedown=C=>C.stopPropagation(),g.onclick=i;let E=sn(e,t,n,o);return h.onclick=C=>{C.stopPropagation(),E.style.opacity==="1"?(E.style.opacity="0",E.style.pointerEvents="none",h.style.color="#9AA0A6",h.style.background="transparent"):(E.style.opacity="1",E.style.pointerEvents="auto",h.style.color="#8AB4F8",h.style.background="rgba(138, 180, 248, 0.1)")},m.appendChild(h),m.appendChild(g),a.appendChild(c),a.appendChild(m),a}function sn(e,t,n,o){let s=document.createElement("div");return Object.assign(s.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),s.innerHTML=`
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
    `,document.head.appendChild(e)}function qe(e,t,n){let o=document.getElementById(n);if(!t)return;let s=t.getAttribute("data-moved")==="true",i={x:0,y:0};if(o){let p=o.getBoundingClientRect();i.x=p.left+p.width/2,i.y=p.top+p.height/2}let a,r;if(!s)a=window.innerWidth/2,r=window.innerHeight/2;else{let p=t.getBoundingClientRect();a=p.left+p.width/2,r=p.top+p.height/2,a===0&&r===0&&(a=window.innerWidth/2,r=window.innerHeight/2)}let c=i.x-a,l=i.y-r;e?(X.playGenieOpen(),t.style.transition="none",t.style.opacity="0",t.style.pointerEvents="auto",s?t.style.transform=`translate(${c}px, ${l}px) scale(0.05)`:t.style.transform=`translate(calc(-50% + ${c}px), calc(-50% + ${l}px)) scale(0.05)`,t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("open"),o&&o.classList.add("active"),t.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",t.style.opacity="1",s?t.style.transform="translate(0, 0) scale(1)":t.style.transform="translate(-50%, -50%) scale(1)"}),typeof Eo=="function"&&Eo(t,n)):(X.playSwoosh(),t.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",t.style.pointerEvents="none",requestAnimationFrame(()=>{t.style.opacity="0",s?t.style.transform=`translate(${c}px, ${l}px) scale(0.1)`:t.style.transform=`translate(calc(-50% + ${c}px), calc(-50% + ${l}px)) scale(0.1)`}),setTimeout(()=>{t.classList.remove("open"),o&&o.classList.remove("active"),t.style.transition="",t.style.transform=""},300),typeof Wt=="function"&&Wt(t))}function Eo(e,t){Wt(e);let n=o=>{if(!e.classList.contains("open"))return;let s=e.contains(o.target),i=document.querySelector(".cw-pill"),a=i&&i.contains(o.target);s?(e.classList.remove("idle"),e.style.zIndex="2147483648"):a||(e.classList.add("idle"),e.style.zIndex="2147483646")};e._idleHandler=n,document.addEventListener("mousedown",n)}function Wt(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}var rn="https://script.google.com/a/macros/google.com/s/AKfycbwUfiKDvybLzt18mWoQJvkXqsRGQYqZ4JXzF8bLHMsxtYzlFPehz-ehoWs6215Wj6uFLA/exec",Yt="cw_data_broadcast",To="cw_data_tips",ln=["Processando...","Mantenha o foco!","Aguarde..."];function ft(e,t={}){return new Promise((n,o)=>{let s="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script");window[s]=c=>{document.body.contains(i)&&document.body.removeChild(i),delete window[s],n(c)};let a=Object.keys(t).map(c=>encodeURIComponent(c)+"="+encodeURIComponent(t[c])).join("&"),r=`${rn}?op=${e}&callback=${s}&t=${Date.now()}&${a}`;i.src=r,i.onerror=()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[s],o(new Error("JSONP Error (Check Corp Login)"))},document.body.appendChild(i)})}var xe={fetchTips:async()=>{try{let e=await ft("tips");e?.tips&&localStorage.setItem(To,JSON.stringify(e.tips))}catch(e){console.warn("Tips offline",e)}},fetchData:async()=>{try{let e=await ft("broadcast");if(e?.broadcast)return localStorage.setItem(Yt,JSON.stringify(e.broadcast)),e}catch(e){console.warn("Broadcast offline",e)}return{broadcast:JSON.parse(localStorage.getItem(Yt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(Yt)||"[]"),getRandomTip:()=>{let e=ln,t=localStorage.getItem(To);if(t)try{e=JSON.parse(t)}catch{}return e[Math.floor(Math.random()*e.length)]},sendBroadcast:async e=>{let t={...e,date:new Date().toISOString(),id:Date.now().toString()};return await xe._performOp("new_broadcast",t)},updateBroadcast:async(e,t)=>{let n={id:e,...t};return await xe._performOp("update_broadcast",n)},deleteBroadcast:async e=>await xe._performOp("delete_broadcast",{id:e}),_performOp:async(e,t)=>{try{console.log(`\u{1F4E4} Executando ${e}...`,t);let n=await ft(e,t);return n&&n.status==="success"?(console.log("\u2705 Sucesso:",e),!0):(console.warn("\u26A0\uFE0F Falha:",n),!1)}catch(n){return console.error("\u274C Erro JSONP:",n),!1}},logEvent:(e,t,n="",o=null)=>{try{let s="anon";try{let a=We();a&&(s=a.split("@")[0].toLowerCase())}catch{}let i={timestamp:new Date().toISOString(),user:s,version:"v5.1",category:e,action:t,label:n,value:o||""};ft("log",i).catch(a=>{})}catch(s){console.warn("Analytics error",s)}},logUsage:()=>{},getUserSnippets:async e=>{try{return await ft("get_user_snippets",{user:e})}catch(t){return console.warn("Erro ao buscar snippets:",t),null}},saveSnippet:async(e,t)=>{let n={...e,user:t};return await xe._performOp("save_snippet",n)},deleteSnippet:async(e,t)=>await xe._performOp("delete_snippet",{id:e,user:t})};var ue={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",pink:"#F48FB1"},It=e=>new Promise(t=>setTimeout(t,e));function ko(e){let t="cw-command-center-style";if(!document.getElementById(t)){let g=document.createElement("style");g.id=t,g.innerHTML=`
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
        `,document.head.appendChild(g)}let n={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',library:'<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>'},o=document.createElement("div");o.className="cw-pill side-right collapsed",o.innerHTML=`
        <div class="cw-main-logo">${n.main}</div>

        <div class="cw-grip" title="Arrastar">
            <div class="cw-grip-bar"></div>
        </div>
        <button class="cw-btn notes" id="cw-btn-notes" data-label="Case Notes">${n.notes}</button>
        <button class="cw-btn email" id="cw-btn-email" data-label="Quick Email">${n.email}</button>
        <button class="cw-btn script" id="cw-btn-script" data-label="Call Script">${n.script}</button>
        <button class="cw-btn links" id="cw-btn-links" data-label="Links">${n.links}</button>
        <button class="cw-btn library" id="cw-btn-library" data-label="My Library">${n.library}</button> <button class="cw-btn timezone" id="cw-btn-timezone" data-label="Time Zones">${n.timezone}</button>
        <div class="cw-sep"></div>
        <button class="cw-btn broadcast" id="cw-btn-broadcast" data-label="Avisos">${n.broadcast}</button>
        <div class="cw-status-container">
            <div class="cw-dots" id="cw-loader"><span></span><span></span><span></span></div>
            <div class="cw-check" id="cw-success" style="display:none;">${n.check}</div>
        </div>
    `;let s=document.createElement("div");s.className="cw-focus-backdrop",document.body.appendChild(s),document.body.appendChild(o);let i=(g,E)=>{let C=o.querySelector(`.${g}`);o.querySelectorAll(".cw-btn").forEach(P=>{P!==C&&P.classList.remove("active")}),C.classList.toggle("active"),E()};if(o.querySelector(".notes").onclick=g=>{g.stopPropagation(),i("notes",e.toggleNotes)},o.querySelector(".email").onclick=g=>{g.stopPropagation(),i("email",e.toggleEmail)},o.querySelector(".script").onclick=g=>{g.stopPropagation(),i("script",e.toggleScript)},o.querySelector(".links").onclick=g=>{g.stopPropagation(),i("links",e.toggleLinks)},o.querySelector(".library").onclick=g=>{g.stopPropagation(),i("library",e.toggleLibrary)},o.querySelector(".timezone").onclick=g=>{g.stopPropagation(),i("timezone",e.toggleTimezone)},o.querySelector(".broadcast").onclick=g=>{g.stopPropagation(),i("broadcast",()=>{let E=g.currentTarget.querySelector(".cw-badge");E&&E.remove(),e.broadcastControl&&e.broadcastControl.toggle()})},e.broadcastControl&&e.broadcastControl.hasUnread){let g=document.createElement("div");g.className="cw-badge",o.querySelector(".broadcast").appendChild(g)}let a=null;o.onmouseleave=()=>{o.querySelector(".cw-btn.active")||o.classList.contains("processing-center")||(a=setTimeout(()=>{o.classList.add("collapsed")},3e3))},o.onmouseenter=()=>{a&&clearTimeout(a)},(async function(){await It(2800),o.classList.add("docked"),await It(300);let E=o.querySelectorAll(".cw-btn");o.querySelectorAll(".cw-sep").forEach(C=>C.classList.add("visible"));for(let C=0;C<E.length;C++)E[C].classList.add("popped"),await It(90);await It(200),o.classList.add("system-check")})();let r=!1,c,l,p,m,f=3;o.onmousedown=g=>{if(g.target.closest("button"))return;g.preventDefault(),c=g.clientX,l=g.clientY;let E=o.getBoundingClientRect();p=E.left,m=E.top,document.addEventListener("mousemove",x),document.addEventListener("mouseup",h)};function x(g){let E=g.clientX-c,C=g.clientY-l;!r&&Math.sqrt(E*E+C*C)>f&&(r=!0,o.style.transition="none",a&&clearTimeout(a)),r&&(o.style.left=`${p+E}px`,o.style.top=`${m+C}px`,o.style.right="auto",o.style.bottom="auto",o.style.transform="none")}function h(g){if(document.removeEventListener("mousemove",x),document.removeEventListener("mouseup",h),r){r=!1;let E=window.innerWidth,C=window.innerHeight,P=o.getBoundingClientRect(),j=P.left+P.width/2,z;j<E/2?(z=24,o.classList.remove("side-right"),o.classList.add("side-left")):(z=E-P.width-24,o.classList.remove("side-left"),o.classList.add("side-right"));let w=Math.max(24,Math.min(P.top,C-P.height-24));setTimeout(()=>{o.style.setProperty("transition","left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)","important"),o.style.left=`${z}px`,o.style.top=`${w}px`,o.style.bottom="auto",o.style.transform=""},10),setTimeout(()=>{o.style.transition="",o.style.removeProperty("transition")},700)}else{let E=o.querySelector(".cw-btn.active"),C=g.target.closest("button");if(o.classList.contains("collapsed")){let P=o.getBoundingClientRect(),j=window.innerHeight,z=P.top>j/2;if(o.style.setProperty("transition","none","important"),z){let w=j-P.bottom;o.style.top="auto",o.style.bottom=`${w}px`}else o.style.bottom="auto",o.style.top=`${P.top}px`;o.offsetWidth,o.style.removeProperty("transition"),o.classList.remove("collapsed")}else!E&&!C&&o.classList.add("collapsed");C&&(C.style.transform="scale(0.9)",setTimeout(()=>C.style.transform="",150))}}}function qt(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop");if(!e)return()=>{};e.classList.remove("collapsed"),window._CW_ABORT_PROCESS=!1;let n=document.createElement("div");n.className="cw-center-stage",n.innerHTML=`
      <div class="cw-center-dots"><span></span><span></span><span></span></div>
      <div class="cw-center-text">${xe.getRandomTip()}</div>
      <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
  `;let o=document.createElement("div");o.className="cw-abort-btn",o.textContent="Cancelar",o.onclick=i=>{i.stopPropagation(),window._CW_ABORT_PROCESS=!0,V("Cancelado!",{duration:3e3}),n.remove(),e.classList.remove("processing-center"),e.classList.remove("success"),e.classList.add("collapsed"),t&&t.classList.remove("active")},n.appendChild(o),e.appendChild(n);let s=Date.now();return e.classList.add("processing-center"),t&&t.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!e.contains(n))return;let a=Date.now()-s,r=Math.max(0,2e3-a);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!e.contains(n))return;let c=n.querySelector(".cw-center-dots"),l=n.querySelector(".cw-center-text"),p=n.querySelector(".cw-center-success"),m=n.querySelector(".cw-abort-btn");c&&(c.style.display="none"),l&&(l.style.display="none"),m&&(m.style.display="none"),p&&p.classList.add("show"),e.classList.add("success"),setTimeout(()=>{e.classList.remove("processing-center"),setTimeout(()=>{n.remove(),e.classList.remove("success"),e.classList.add("collapsed"),t&&t.classList.remove("active")},400)},1e3)},r)}}function Oo(e){let t=document.createElement("div");t.className="cw-step-scenarios";let n=document.createElement("div");Object.assign(n.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let o=document.createElement("div");Object.assign(o.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"40px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s ease"}),o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>";let s=null;Object.entries(Be).forEach(([a,r])=>{let c=document.createElement("div");c.textContent=a,Object.assign(c.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",display:"flex",alignItems:"center",gap:"6px"}),c.onmouseenter=()=>{s!==r&&(o.style.background="#fff",o.style.borderColor="#1a73e8",o.style.color="#202124",o.textContent=`"${r.substring(0,120)}${r.length>120?"...":""}"`),s!==r&&(c.style.background="#f1f3f4")},c.onmouseleave=()=>{s!==r&&(s||(o.style.background="#f8f9fa",o.style.borderColor="#dadce0",o.style.color="#5f6368",o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>"),c.style.background="#ffffff")},c.onclick=()=>{X.playClick(),s===r?(s=null,i(),e("")):(s=r,i(),c.style.transform="scale(0.95)",setTimeout(()=>c.style.transform="scale(1)",150),e(r))},n.appendChild(c)});function i(){Array.from(n.children).forEach(a=>{Be[a.textContent]===s?(a.style.background="#e8f0fe",a.style.borderColor="#1a73e8",a.style.color="#1967d2",a.style.fontWeight="500"):(a.style.background="#ffffff",a.style.borderColor="#dadce0",a.style.color="#3c4043",a.style.fontWeight="400")})}return t.appendChild(n),t.appendChild(o),t}var Io=e=>new Promise(t=>setTimeout(t,e));function Ft(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>e.dispatchEvent(new MouseEvent(n,t)))}function xt(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let n=document.createRange();n.selectNodeContents(t);let o=window.getSelection();o.removeAllRanges(),o.addRange(n);try{document.execCommand("copy")}catch{V("Falha ao copiar",{error:!0})}o.removeAllRanges(),document.body.removeChild(t)}function Lt(e){["input","change","keydown","keyup"].forEach(n=>{let o=new Event(n,{bubbles:!0,cancelable:!0});e.dispatchEvent(o)})}function qo(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function Mt(){console.log("Iniciando processo de Nova Nota...");let e=qo(),t=e.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(a=>a.innerText.trim()==="description");if(o){let a=o.closest("material-fab")||o.closest("material-button");a?(a.style&&(a.style.display="block",a.style.visibility="visible"),Ft(a)):Ft(o)}else{let a=document.querySelector("material-fab-speed-dial");if(a){let r=a.querySelector(".trigger");r?(r.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),Ft(r)):a.click(),await Io(800);let l=Array.from(document.querySelectorAll("i.material-icons-extended")).find(p=>p.innerText.trim()==="description");l&&Ft(l)}}let s=null,i=0;for(;!s&&i<20;){await Io(300);let a=qo();if(a.length>t)s=a.find(r=>!e.includes(r)),s||(s=a[a.length-1]);else if(i>10){let r=a.filter(c=>c.offsetParent!==null);r.length>0&&(s=r[r.length-1])}i++}return s}var ie={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},je="cubic-bezier(0.25, 0.8, 0.25, 1)",cn={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${ie.border}`,backgroundColor:ie.bgInput,fontSize:"14px",color:ie.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${je}, box-shadow 0.2s ${je}, background-color 0.2s`,outline:"none"},Wn={...cn,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},Yn={fontSize:"13px",fontWeight:"700",color:ie.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},Xn={display:"block",fontSize:"13px",fontWeight:"600",color:ie.text,marginBottom:"8px",marginTop:"16px"},Kn={fontSize:"12px",color:ie.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},Jn={fontSize:"12px",color:ie.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},Qn={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:ie.text,cursor:"pointer",padding:"12px 14px",backgroundColor:ie.surface,border:`1px solid ${ie.border}`,borderRadius:"12px",transition:`all 0.2s ${je}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},Xt={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:ie.primary},Zn={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:ie.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${je}, box-shadow 0.2s ${je}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},ea={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${ie.primary}`,color:ie.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${je}`},ta={background:"transparent",border:`1px solid ${ie.border}`,borderRadius:"20px",color:ie.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${je}`,fontFamily:"'Google Sans', 'Roboto'"};var oa={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:ie.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},na={fontSize:"13px",fontWeight:"700",color:ie.primary,minWidth:"20px",textAlign:"center"},aa={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${ie.border}`,backgroundColor:ie.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${je}, box-shadow 0.2s ${je}`},ia={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${ie.bgInput}`},sa={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${ie.border}`,backgroundColor:ie.surface,color:ie.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${je}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},ra={backgroundColor:ie.primaryBg,color:ie.primary,borderColor:ie.primary,fontWeight:"600"},la={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:ie.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},ca={borderTop:`1px solid ${ie.bgInput}`,paddingTop:"20px",marginTop:"16px"};var da={maxHeight:"240px",overflowY:"auto",border:`1px solid ${ie.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:ie.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},pa={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${ie.bgInput}`,cursor:"pointer",fontSize:"13px",color:ie.text,transition:"background 0.1s",userSelect:"none"};var dn={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},pn={fontSize:"12px",color:"#e37400",marginTop:"4px"},un={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},mn={display:"flex",gap:"15px",marginBottom:"10px"};function Fo(){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,dn);let t=document.createElement("label");t.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(t.style,Ht,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,mn);let o=document.createElement("input");o.type="radio",o.name="ts_usage_mod",o.value="Sim",Object.assign(o.style,Xt);let s=document.createElement("label");s.textContent="Sim";let i=document.createElement("div");Object.assign(i.style,{display:"flex",alignItems:"center"}),i.appendChild(o),i.appendChild(s);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="N\xE3o",a.checked=!0,Object.assign(a.style,Xt);let r=document.createElement("label");r.textContent="N\xE3o";let c=document.createElement("div");Object.assign(c.style,{display:"flex",alignItems:"center"}),c.appendChild(a),c.appendChild(r),n.appendChild(i),n.appendChild(c);let l=document.createElement("div");l.style.display="block";let p=document.createElement("label");p.textContent="Qual foi o Motivo?",Object.assign(p.style,Ht,{fontSize:"12px"});let m=document.createElement("input");m.type="text",Object.assign(m.style,un);let f=document.createElement("div");f.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(f.style,pn),l.appendChild(p),l.appendChild(m),l.appendChild(f),e.appendChild(t),e.appendChild(n),e.appendChild(l),o.onchange=()=>{l.style.display="none"},a.onchange=()=>{l.style.display="block"};function x(E,C){if(e.style.display="none",!E||E.includes("Education")||!C||C.length===0)return;let P=C.some(T=>T.includes("enhanced")||T==="ec_google_ads"),j=C.some(T=>(T.includes("conversion")||T.includes("ads"))&&!T.includes("enhanced")),z=C.some(T=>T.includes("ga4")||T.includes("analytics")||T.includes("ua")),w=C.some(T=>T.includes("merchant")||T.includes("gmc")||T.includes("shopping"));(P||j&&!z&&!w)&&(e.style.display="block")}function h(){if(e.style.display==="none")return"";let E=`<br><b>Utilizou Tag Support?</b> ${o.checked?"Sim":"N\xE3o"}`;return a.checked&&m.value.trim()!==""&&(E+=`<br><b>Motivo:</b> ${m.value}`),E+="<br>",E}function g(){e.style.display="none",a.checked=!0,o.checked=!1,l.style.display="block",m.value=""}return{element:e,updateVisibility:x,getOutput:h,reset:g}}var te={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},at={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function Lo(e){let t={},n="implementation";function o(w){let A=w.toLowerCase();return A.includes("ads")||A.includes("conversion")||A.includes("remarketing")?te.brands.ads:A.includes("ga4")||A.includes("analytics")?te.brands.ga4:A.includes("gtm")||A.includes("tag manager")||A.includes("container")?te.brands.gtm:A.includes("merchant")||A.includes("shopping")||A.includes("feed")?te.brands.gmc:te.brands.default}let s=Object.entries(Ne).filter(([w,A])=>A.popular),i={};Object.entries(Ne).forEach(([w,A])=>{if(A.popular)return;let T=o(A.name);i[T.label]||(i[T.label]={brand:T,tasks:[]}),i[T.label].tasks.push({key:w,...A})});let a="cw-zen-tasks";if(!document.getElementById(a)){let w=document.createElement("style");w.id=a,w.innerHTML=`
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
        `,document.head.appendChild(w)}let r=document.createElement("div");r.className="cw-zen-container";let c=document.createElement("div");Object.assign(c.style,{display:"none"});let l=document.createElement("div");l.className="cw-screens-container",c.appendChild(l),r.innerHTML=`
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
    `;let p=r.querySelector(".cw-hero-grid"),m=r.querySelector(".cw-acc-container"),f=r.querySelector(".cw-results-container"),x=r.querySelector(".cw-search-input"),h=r.querySelector(".cw-status-bar"),g=r.querySelector(".cw-status-text"),E=r.querySelector(".cw-footer-icons");s.forEach(([w,A])=>{let T=o(A.name),k=document.createElement("div");k.className="cw-hero-card",k.id=`hero-${w}`,k.style.setProperty("--hero-color",T.color),k.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${at[T.icon]}</div>
                <div class="cw-hero-label">${A.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,k.onclick=O=>{if(O.target.closest(".cw-step-btn"))return;let N=t[w]?t[w].count:0;P(w,N>0?-N:1,A)},k.querySelector(".minus").onclick=()=>P(w,-1,A),k.querySelector(".plus").onclick=()=>P(w,1,A),k.dataset.color=T.color,p.appendChild(k)});function C(w,A){let T=o(A.name),k=document.createElement("div");return k.className="cw-task-item",k.dataset.id=w,k.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${T.bg}; color:${T.color}">
                    ${at[T.icon]||at.default}
                </div>
                <div class="cw-task-label">${A.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,k.onclick=O=>{if(O.target.closest(".cw-step-btn"))return;let N=t[w]?t[w].count:0;P(w,N>0?-N:1,A)},k.querySelector(".minus").onclick=()=>P(w,-1,A),k.querySelector(".plus").onclick=()=>P(w,1,A),k}Object.entries(i).forEach(([w,A])=>{let T=document.createElement("div");T.className="cw-acc-group";let k=document.createElement("div");k.className="cw-acc-header",k.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${A.brand.color}"></div>
                ${w}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,k.onclick=()=>{m.querySelectorAll(".cw-acc-group.open").forEach(N=>{N!==T&&N.classList.remove("open")}),T.classList.toggle("open")};let O=document.createElement("div");O.className="cw-acc-body",A.tasks.forEach(N=>{let q=C(N.key,N);O.appendChild(q)}),T.appendChild(k),T.appendChild(O),m.appendChild(T)});function P(w,A,T){t[w]||(t[w]={count:0,data:T,brand:o(T.name)}),t[w].count+=A,t[w].count<=0&&delete t[w],j(),z(),e&&e()}function j(){s.forEach(([O])=>{let N=p.querySelector(`#hero-${O}`);if(!N)return;let q=t[O];q?(N.classList.add("active"),N.querySelector(".cw-step-val").textContent=q.count,N.querySelector(".cw-step-val").style.color=N.dataset.color):N.classList.remove("active")}),r.querySelectorAll(".cw-task-item").forEach(O=>{let N=O.dataset.id,q=t[N];q?(O.classList.add("selected"),O.querySelector(".cw-step-val").textContent=q.count):O.classList.remove("selected")});let A=Object.keys(t),T=0,k=[];if(A.forEach(O=>{let N=t[O];T+=N.count;for(let q=0;q<N.count;q++)k.length<6&&k.push(N.brand)}),T>0){h.classList.add("visible");let O=T>1?"A\xE7\xF5es":"A\xE7\xE3o",N=T>1?"definidas":"definida";g.textContent=`${T} ${O} ${N}`,E.innerHTML="",k.forEach(q=>{let B=document.createElement("div");B.className="cw-mini-icon",B.innerHTML=at[q.icon]||at.default;let S=B.querySelector("svg");S&&(S.style.width="14px",S.style.height="14px"),E.appendChild(B)})}else h.classList.remove("visible")}x.addEventListener("input",w=>{let A=w.target.value.toLowerCase();if(A.length>0){m.style.display="none",f.style.display="block",f.innerHTML="";let T=!1;Object.entries(Ne).forEach(([k,O])=>{if(O.name.toLowerCase().includes(A)){T=!0;let N=C(k,O);t[k]&&(N.classList.add("selected"),N.querySelector(".cw-step-val").textContent=t[k].count),f.appendChild(N)}}),T||(f.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else m.style.display="block",f.style.display="none"});function z(){l.innerHTML="";let w=Object.keys(t),A=!1,T=document.getElementById("sub-status"),k="implementation";if(T&&T.value.toLowerCase().includes("education")&&(k="education"),w.length===0){l.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}if(w.length===0){l.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}let O=document.createElement("div");O.className="cw-info-banner",O.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Todos os Screenshots s\xE3o baseados na descri\xE7\xE3o do 
                <a href="https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/" target="_blank" class="cw-info-link">Win Criteria</a>.
            </span>
        `,l.appendChild(O),w.forEach(N=>{let q=t[N].data,B=t[N].count,S=t[N].brand,D=q.screenshots?q.screenshots[k]||[]:["Link da Evid\xEAncia"];if(D.length>0){A=!0;for(let d=1;d<=B;d++){let y=document.createElement("div");y.className="cw-screen-card",y.style.setProperty("--brand-color",S.color),y.style.setProperty("--brand-bg",S.bg),y.style.setProperty("--brand-shadow",S.color+"40");let u=document.createElement("div");u.className="cw-card-header";let v=document.createElement("div");v.className="cw-card-icon",v.innerHTML=at[S.icon]||at.default;let F=document.createElement("div");F.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let M=document.createElement("input");M.className="cw-card-title-input",M.id=`name-${N}-${d}`,M.value=`${q.name}${B>1?" #"+d:""}`,M.title="Clique para renomear esta task";let $=document.createElement("span");$.className="cw-edit-hint",$.innerHTML="\u270E Renomear",F.appendChild(M),F.appendChild($),u.appendChild(v),u.appendChild(F),y.appendChild(u),D.forEach((I,R)=>{let G=document.createElement("div");G.className="cw-input-group";let Y=document.createElement("label");Y.className="cw-input-label",Y.textContent=I.replace(/📷|:|•/g,"").trim();let L=document.createElement("input");L.className="cw-input-field",L.id=`screen-${N}-${d}-${R}`,L.placeholder="Cole o link aqui...",L.setAttribute("autocomplete","off"),L.addEventListener("input",()=>{L.value.trim().length>5?L.classList.add("filled"):L.classList.remove("filled")});let U=document.createElement("div");U.className="cw-input-check",U.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',G.appendChild(Y),G.appendChild(L),G.appendChild(U),y.appendChild(G)}),l.appendChild(y)}}}),c.style.display=A?"block":"none"}return{selectionElement:r,screenshotsElement:c,updateSubStatus:()=>z(),getCheckedElements:()=>Object.keys(t).map(w=>({value:w,closest:()=>({querySelector:()=>({textContent:t[w].count})})})),setTaskCount:(w,A)=>{t[w]&&delete t[w],A>0&&Ne[w]&&P(w,A,Ne[w])},toggleTask:(w,A=!0)=>{let T=t[w];A&&!T?P(w,1,Ne[w]):!A&&T&&P(w,-T.count,Ne[w])},setMode:w=>{n=w,z()},reset:()=>{for(let w in t)delete t[w];x.value="",m.style.display="block",f.style.display="none",j(),z()}}}function Mo(e){let t=document.createElement("div");t.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let n=document.createElement("div");n.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let o=document.createElement("div");o.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",t.appendChild(o),t.appendChild(n),n.addEventListener("scroll",()=>{o.style.boxShadow=n.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let s={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},i={};function a({id:j,label:z,type:w="text",placeholder:A="",required:T=!1,parent:k=n}){let O=document.createElement("div");O.style.cssText=s.inputWrapper;let N=document.createElement("label");N.style.cssText=s.label,N.innerHTML=`${z} ${T?'<span style="color:#D93025">*</span>':""}`;let q;return w==="textarea"?(q=document.createElement("textarea"),q.style.cssText=s.input+s.textarea):(q=document.createElement("input"),q.type=w,q.style.cssText=s.input),q.id=j,q.placeholder=A,q.addEventListener("focus",()=>{q.style.borderColor="#1a73e8",q.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),q.addEventListener("blur",()=>{q.style.borderColor="#DADCE0",q.style.boxShadow="none",T&&q.value.trim()!==""&&(q.style.backgroundColor="#FFF")}),i[j]={input:q,wrapper:O,required:T},O.appendChild(N),O.appendChild(q),k.appendChild(O),O}function r({id:j,label:z,options:w=["Yes","No"],defaultValue:A="No",onChange:T=null}){let k=document.createElement("div");k.style.cssText=s.inputWrapper;let O=document.createElement("label");O.style.cssText=s.label,O.textContent=z,k.appendChild(O);let N=document.createElement("div");N.style.cssText=s.radioGroup;let q=document.createElement("input");return q.type="hidden",q.id=j,q.value=A,k.appendChild(q),w.forEach(B=>{let S=document.createElement("div");S.textContent=B,S.style.cssText=s.radioLabel,B===A&&(S.style.cssText+=s.radioActive),S.onclick=()=>{Array.from(N.children).forEach(d=>d.style.cssText=s.radioLabel),S.style.cssText+=s.radioActive,q.value=B,T&&T(B)},N.appendChild(S)}),i[j]={input:q,wrapper:k,required:!1},k.appendChild(N),n.appendChild(k),k}let c=document.createElement("div");c.style.cssText=s.banner,c.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,n.appendChild(c);let l=document.createElement("div");l.style.marginBottom="24px";let p=document.createElement("button");p.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",p.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",p.onmouseover=()=>p.style.background="#E1EFFF",p.onmouseout=()=>p.style.background="#F0F7FF",l.appendChild(p),n.appendChild(l);let m=document.createElement("div");m.style.cssText=s.section,m.innerHTML=`<div style="${s.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,n.appendChild(m),a({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:m}),a({id:"ga4",label:"GA4 Property ID",parent:m}),a({id:"gtm",label:"GTM Container ID",parent:m});let f=document.createElement("div");f.style.cssText=s.hiddenField,m.appendChild(f),r({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:j=>{j==="Yes"?f.style.cssText=s.visibleField+"margin-bottom:14px;":(f.style.cssText=s.hiddenField,i.accessEmail.input.value="")}}),a({id:"accessEmail",label:"User Access Email",parent:f}),r({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let x=document.createElement("div");x.style.cssText=s.section,x.innerHTML=`<div style="${s.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,n.appendChild(x),a({id:"name",label:"Advertiser Name",required:!0,parent:x}),a({id:"url",label:"Website URL",parent:x}),a({id:"phone",label:"Phone Number",parent:x}),a({id:"email",label:"Contact Email",parent:x}),a({id:"callback",label:"Preferred Callback Time (Timezone)",parent:x}),a({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:"Descreva o erro, passos para reproduzir...",required:!0,parent:x}),a({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:"O que voc\xEA j\xE1 testou?",parent:x}),a({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:x});let h=document.createElement("div");h.style.cssText=s.section,h.innerHTML=`<div style="${s.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,n.appendChild(h),a({id:"cc_adv",label:"Advertiser Contact",parent:h}),a({id:"cc_am",label:"Account Manager",parent:h});let g=document.createElement("div");g.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let E=document.createElement("button");E.innerHTML="Voltar",E.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",E.onclick=e;let C=document.createElement("button");C.textContent="Gerar Nota",C.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",g.appendChild(E),g.appendChild(C),t.appendChild(g),p.onclick=async()=>{let j=p.innerHTML;p.innerHTML="\u23F3 Buscando dados...";try{let z=await Pe(),w=0,A=(O,N)=>{let q=i[O];N&&q&&q.input.value===""&&(q.input.value=N,q.input.style.backgroundColor="#E6F4EA",q.input.style.borderColor="#34A853",setTimeout(()=>{q.input.style.backgroundColor="#FFF",q.input.style.borderColor="#DADCE0"},1e3),w++)};A("name",z.advertiserName),A("url",z.websiteUrl),z.clientEmail&&(A("email",z.clientEmail),A("cc_adv",z.clientEmail));let k=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);k&&A("cid",k[0]),w>0?V(`${w} campos preenchidos!`):V("Nenhum dado novo encontrado.")}catch(z){console.error(z),V("Erro ao ler p\xE1gina.")}finally{p.innerHTML=j}};let P=()=>{let j=!0,z=null;return Object.values(i).forEach(w=>{w.required&&!w.input.value.trim()&&(j=!1,w.input.style.cssText+=s.inputError,w.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),z||(z=w.input))}),z&&z.scrollIntoView({behavior:"smooth",block:"center"}),j};return C.onclick=async()=>{if(!P()){V("Preencha os campos obrigat\xF3rios.",{isError:!0});return}let j=O=>i[O].input.value||"N/A",z=j("hasAccess"),w=z==="Yes"?j("accessEmail"):"N/A",T=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${j("cid")}
<b>GA4 ID:</b> ${j("ga4")}
<b>GTM ID:</b> ${j("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${z==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${w}
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
`.replace(/\n/g,"<br>");xt(T);let k=await Mt();k?(k.innerText.trim()===""&&(k.innerHTML=""),document.execCommand("insertHTML",!1,T),Lt(k),V("Nota gerada e inserida!")):V("Copiado! Abra uma nota para colar.")},t}var Kt="cw_notes_parking_lot",Nt="cw_notes_emergency_save";var Le={getAll:()=>{try{return JSON.parse(localStorage.getItem(Kt)||"[]")}catch{return[]}},save:e=>{let t=Le.getAll(),n={id:Date.now().toString(),timestamp:new Date().toISOString(),...e};return t.unshift(n),t.length>5&&t.pop(),localStorage.setItem(Kt,JSON.stringify(t)),n},delete:e=>{let t=Le.getAll();return t=t.filter(n=>n.id!==e),localStorage.setItem(Kt,JSON.stringify(t)),t},getCount:()=>Le.getAll().length,saveEmergency:e=>{let t={timestamp:Date.now(),data:e};localStorage.setItem(Nt,JSON.stringify(t))},getEmergency:()=>{try{let e=localStorage.getItem(Nt);if(!e)return null;let t=JSON.parse(e);return Date.now()-t.timestamp>432e5?(localStorage.removeItem(Nt),null):t.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(Nt)}};function No(e){let{onSaveCurrent:t,onLoadDraft:n}=e,o=document.createElement("button");o.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        Guardar
    `,o.style.cssText=`
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
    `,o.onmouseenter=()=>{o.style.backgroundColor="#F8F9FA",o.style.borderColor="#202124",o.style.color="#202124",o.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)",o.style.transform="translateY(-1px)"},o.onmouseleave=()=>{o.style.backgroundColor="#FFFFFF",o.style.borderColor="#DADCE0",o.style.color="#5F6368",o.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",o.style.transform="translateY(0)"},o.onmousedown=()=>o.style.transform="scale(0.96)",o.onmouseup=()=>o.style.transform="scale(1) translateY(-1px)",o.onclick=async()=>{if(confirm("Deseja guardar o rascunho atual e limpar os campos?"))try{let x=await t();x?(Le.save(x),f(),a(),X.playSuccess(),V("Rascunho salvo com sucesso!")):V("Erro: N\xE3o foi poss\xEDvel ler os dados.",{error:!0})}catch(x){console.error("Erro ao salvar rascunho:",x),V("Erro ao salvar.",{error:!0})}};let s=document.createElement("div");s.title="Meus Rascunhos",s.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",s.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#5f6368"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let i=document.createElement("div");i.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",s.appendChild(i),s.onmouseenter=()=>s.style.background="rgba(0,0,0,0.05)",s.onmouseleave=()=>s.style.background="transparent",s.onclick=x=>{x.stopPropagation(),m()};function a(){let x=Le.getCount();x>0?(i.style.display="block",i.textContent=x,i.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):i.style.display="none"}let r=document.createElement("div");r.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: #FFFFFF; z-index: 100;
        border-radius: 20px 20px 0 0;
        box-shadow: 0 -10px 40px rgba(0,0,0,0.15);
        transform: translateY(110%); transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        display: flex; flex-direction: column; overflow: hidden;
    `;let c=document.createElement("div");c.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",c.innerHTML='<span style="font-size:16px; font-weight:700; color:#202124;">Rascunhos Salvos</span>';let l=document.createElement("button");l.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',l.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",l.onmouseenter=()=>l.style.background="#F1F3F4",l.onmouseleave=()=>l.style.background="transparent",l.onclick=()=>m(!1),c.appendChild(l);let p=document.createElement("div");p.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",r.appendChild(c),r.appendChild(p);function m(x){let h=r.style.transform==="translateY(0%)";(x!==void 0?x:!h)?(f(),r.style.transform="translateY(0%)"):r.style.transform="translateY(110%)"}function f(){let x=Le.getAll();if(p.innerHTML="",x.length===0){p.innerHTML=`
                <div style="text-align:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:500;">Nenhum rascunho guardado</div>
                    <div style="font-size:12px; margin-top:4px;">Use o bot\xE3o "Guardar" para estacionar um caso aqui.</div>
                </div>`;return}x.forEach(h=>{let g=document.createElement("div");g.style.cssText=`
                background: #FFF; padding: 16px; border-radius: 12px;
                border: 1px solid #E0E0E0; box-shadow: 0 1px 3px rgba(0,0,0,0.02);
                position: relative; transition: all 0.2s;
            `;let C=new Date(h.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),P="";h.summaryTags&&h.summaryTags.length>0&&(P=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${h.summaryTags.slice(0,3).join(", ")+(h.summaryTags.length>3?"...":"")}</div>`),g.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${h.clientName||"Cliente Sem Nome"}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${C}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${h.cid||"---"}</span>
                    <span style="display:block; color:${h.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${h.subStatus||h.status||"Sem Status"}</span>
                    ${P}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3); transition:all 0.2s;">
                        Retomar Caso
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;" title="Descartar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;let j=g.querySelector(".cw-resume-btn");j.onclick=()=>{confirm("Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.")&&(n(h),Le.delete(h.id),f(),a(),m(!1),X.playSwoosh(),V("Rascunho carregado."))};let z=g.querySelector(".cw-del-btn");z.onclick=()=>{confirm("Excluir este rascunho?")&&(Le.delete(h.id),f(),a())},p.appendChild(g)})}return a(),{parkButton:o,historyBtnWrapper:s,drawer:r}}function _o(){let e="v3.8.0",t="bau",n="pt",o=!1,s=!1,i=!1,a={input:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},textarea:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease",height:"100px",resize:"vertical"},h3:{fontSize:"14px",fontWeight:"600",color:"#202124",margin:"0 0 12px 0"},label:{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},checkboxLabel:{display:"flex",alignItems:"center",marginBottom:"10px",fontSize:"14px",fontWeight:"400",cursor:"pointer",padding:"8px",background:"#f8f9fa",borderRadius:"6px",transition:"background-color 0.2s ease, box-shadow 0.2s ease",userSelect:"none"},checkboxInput:{width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"},buttonBase:{flex:"1 1 0",padding:"10px 0",color:"#fff",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"500",cursor:"pointer",marginTop:"16px"},stepBlock:{borderTop:"1px solid #eee",paddingTop:"12px",marginTop:"12px"},radioContainer:{display:"flex",gap:"15px",marginBottom:"10px"},optionalBtn:{width:"100%",padding:"10px",background:"white",border:"1px dashed #1a73e8",color:"#1a73e8",borderRadius:"6px",cursor:"pointer",fontWeight:"500",fontSize:"13px",marginBottom:"10px",transition:"all 0.2s"},helpLink:{fontSize:"12px",color:"#1a73e8",textDecoration:"none",cursor:"pointer",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"color 0.2s"}},r=Fo(),c=Lo(()=>{let H=c.getCheckedElements().map(_=>_.value);u&&u.value&&r.updateVisibility(u.value,H)}),l=document.createElement("div");l.id="autofill-popup",l.classList.add("cw-module-window"),Object.assign(l.style,ke,{right:"100px",width:"450px",transition:"width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)"});let p={popup:l,googleLine:null},m=Ie(l,"Case Notes",e,"Gera notas padronizadas.",p,()=>Bt());l.appendChild(m);let f=document.createElement("div");Object.assign(f.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1"}),l.appendChild(f);let x=document.createElement("div");Object.assign(x.style,{flexGrow:"1",display:"none",overflow:"auto"});let h=Mo(()=>g());x.appendChild(h),l.appendChild(x);function g(b){i=!i,i?(f.style.display="none",x.style.display="flex",p.googleLine&&(p.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)"),b&&(b.style.color="#C58AF9",b.style.background="rgba(197, 138, 249, 0.15)")):(f.style.display="block",x.style.display="none",p.googleLine&&(p.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"),b&&(b.style.color="#9AA0A6",b.style.background="transparent"))}let E=document.createElement("div");E.textContent="created by lucaste@",Object.assign(E.style,xo),l.appendChild(E);let C=document.createElement("div");C.id="step-lang-type";let P=document.createElement("label");Object.assign(P.style,a.label),C.appendChild(P);let j=document.createElement("div");Object.assign(j.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let z=document.createElement("div");z.textContent="Portugu\xEAs",z.classList.add("no-drag"),Object.assign(z.style,Oe);let w=document.createElement("div");w.textContent="Espa\xF1ol",w.classList.add("no-drag"),Object.assign(w.style,Oe),z.onclick=()=>vt("pt"),w.onclick=()=>vt("es"),j.appendChild(z),j.appendChild(w),C.appendChild(j),f.appendChild(C);let A=document.createElement("div");A.id="step-0-case-type";let T=document.createElement("label");Object.assign(T.style,a.label),A.appendChild(T);let k=document.createElement("div");Object.assign(k.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let O=document.createElement("div");O.textContent="BAU",O.classList.add("no-drag"),Object.assign(O.style,Oe);let N=document.createElement("div");N.textContent="LM",N.classList.add("no-drag"),Object.assign(N.style,Oe),O.onclick=()=>yt("bau"),N.onclick=()=>yt("lm"),k.appendChild(O),k.appendChild(N),A.appendChild(k),f.appendChild(A);let q=document.createElement("div");q.id="step-1-selection";let B=document.createElement("label");B.className="cw-input-label",B.textContent="Status Principal";let S=document.createElement("select");S.id="main-status",S.className="cw-select",S.innerHTML=`
      <option value="" disabled selected hidden>Selecione uma op\xE7\xE3o...</option>
      <option value="NI">NI - Need Info</option>
      <option value="SO">SO - Solution Offered</option>
      <option value="IN">IN - Inactive</option>
      <option value="AS">AS - Assigned</option>
      <option value="DC">DC - Discard</option>
  `;let D=document.createElement("div");D.style.cssText="display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; margin-bottom: 6px;";let d=document.createElement("label");d.className="cw-input-label",d.textContent="Sub-status",d.style.marginBottom="0";let y=document.createElement("a");y.href="https://seu-link-do-guia-aqui.com",y.target="_blank",y.className="cw-info-link",y.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; transform:translateY(1px)"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Guia de Substatus',Object.assign(y.style,a.helpLink),D.appendChild(d),D.appendChild(y);let u=document.createElement("select");u.id="sub-status",u.className="cw-select",u.disabled=!0,u.innerHTML='<option value="" disabled selected hidden>Aguardando status principal...</option>',q.appendChild(B),q.appendChild(S),q.appendChild(D),q.appendChild(u),f.appendChild(q);let v=document.createElement("div");v.id="step-1-1-portugal",Object.assign(v.style,a.stepBlock,{display:"none"});let F=document.createElement("label");Object.assign(F.style,a.label),v.appendChild(F);let M=document.createElement("div");Object.assign(M.style,a.radioContainer);let $=document.createElement("div");Object.assign($.style,{display:"flex",alignItems:"center"});let I=document.createElement("input");I.type="radio",I.name="portugal-group",I.value="sim",Object.assign(I.style,a.checkboxInput);let R=document.createElement("label");R.htmlFor="portugal-sim",Object.assign(R.style,{cursor:"pointer"}),$.appendChild(I),$.appendChild(R);let G=document.createElement("div");Object.assign(G.style,{display:"flex",alignItems:"center"});let Y=document.createElement("input");Y.type="radio",Y.name="portugal-group",Y.value="nao",Y.checked=!0,Object.assign(Y.style,a.checkboxInput);let L=document.createElement("label");L.htmlFor="portugal-nao",Object.assign(L.style,{cursor:"pointer"}),G.appendChild(Y),G.appendChild(L),M.appendChild($),M.appendChild(G),v.appendChild(M),f.appendChild(v);function U(b){o=b,b?Q.style.display="block":Q.style.display="none"}I.onchange=()=>U(!0),Y.onchange=()=>U(!1);let Q=document.createElement("div");Q.id="step-1-2-consent",Object.assign(Q.style,a.stepBlock,{display:"none"});let be=document.createElement("label");Object.assign(be.style,a.label),Q.appendChild(be);let ge=document.createElement("div");Object.assign(ge.style,a.radioContainer);let Te=document.createElement("div");Object.assign(Te.style,{display:"flex",alignItems:"center"});let se=document.createElement("input");se.type="radio",se.name="consent-group",se.value="Sim",se.checked=!0,Object.assign(se.style,a.checkboxInput);let ve=document.createElement("label");ve.htmlFor="consent-sim",Object.assign(ve.style,{cursor:"pointer"}),Te.appendChild(se),Te.appendChild(ve);let pe=document.createElement("div");Object.assign(pe.style,{display:"flex",alignItems:"center"});let ee=document.createElement("input");ee.type="radio",ee.name="consent-group",ee.value="N\xE3o",Object.assign(ee.style,a.checkboxInput);let de=document.createElement("label");de.htmlFor="consent-nao",Object.assign(de.style,{cursor:"pointer"}),pe.appendChild(ee),pe.appendChild(de),ge.appendChild(Te),ge.appendChild(pe),Q.appendChild(ge),f.appendChild(Q);let ce=document.createElement("div");ce.id="step-1-5-snippets",Object.assign(ce.style,a.stepBlock,{display:"none"});let De=document.createElement("h3");Object.assign(De.style,a.h3),De.textContent="Cen\xE1rios Comuns";let Me=Oo(b=>{let H=document.querySelector("textarea");H&&(H.value=b,H.dispatchEvent(new Event("input")),H.style.transition="background-color 0.2s",H.style.backgroundColor="#e8f0fe",setTimeout(()=>H.style.backgroundColor="#fff",300))});Me.id="snippet-container",ce.appendChild(De),ce.appendChild(Me),f.appendChild(ce);let Ce=document.createElement("div");Ce.id="step-3-form",Object.assign(Ce.style,a.stepBlock,{display:"none"});let ze=document.createElement("h3");Object.assign(ze.style,a.h3),Ce.appendChild(ze);let Re=document.createElement("div");Re.id="dynamic-form-fields-container",Ce.appendChild(Re);let Se=document.createElement("button");Se.textContent="+ Gostaria de selecionar uma task?",Object.assign(Se.style,a.optionalBtn),Se.onmouseover=()=>Se.style.background="#e8f0fe",Se.onmouseout=()=>Se.style.background="white",Se.onclick=()=>{Se.style.display="none",Je.style.display="block",c.selectionElement.style.display="block"};let Je=document.createElement("h3");Object.assign(Je.style,a.h3,{marginTop:"20px"});let eo=c.selectionElement;Object.assign(eo.style,{marginBottom:"20px"}),Ce.appendChild(Se),Ce.appendChild(Je),Ce.appendChild(eo),Ce.appendChild(r.element),Ce.appendChild(c.screenshotsElement),f.appendChild(Ce);let Qe=document.createElement("div");Qe.id="step-4-email",Object.assign(Qe.style,{display:"none",marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #eee"});let Ze=document.createElement("label");Ze.style.display="flex",Ze.style.alignItems="center",Ze.style.cursor="pointer",Ze.style.fontSize="14px";let et=document.createElement("input");et.type="checkbox",et.checked=!0,Object.assign(et.style,a.checkboxInput),Ze.appendChild(et),Ze.appendChild(document.createTextNode("Preencher email automaticamente?")),Qe.appendChild(Ze),f.appendChild(Qe);let Ue=document.createElement("div");Object.assign(Ue.style,{display:"none",gap:"8px",padding:"0"}),f.appendChild(Ue);let ct=document.createElement("button");Object.assign(ct.style,a.buttonBase,{backgroundColor:"#5f6368"}),ct.textContent="Copiar";let dt=document.createElement("button");Object.assign(dt.style,a.buttonBase,{backgroundColor:"#1a73e8"}),dt.textContent="Preencher",Ue.appendChild(ct),Ue.appendChild(dt);async function to(){let b=await Pe(),H={};Re.querySelectorAll("input, textarea").forEach(K=>H[K.id]=K.value);let W=c.getCheckedElements().map(K=>({key:K.value,count:parseInt(K.closest(".cw-task-item").querySelector(".cw-step-val")?.textContent||1)})),le={};c.screenshotsElement.querySelectorAll("input").forEach(K=>{K.value.trim()!==""&&(le[K.id]=K.value)});let Ae=document.getElementById("tag-support-container"),he=null;if(Ae){let K=Ae.querySelector('input[type="radio"]:checked'),ne=Ae.querySelector('input[type="text"]');he={choice:K?K.value:"N\xE3o",reason:ne?ne.value:""}}return{clientName:b.advertiserName,cid:b.cid,status:S.value,subStatus:u.value,caseType:t,lang:n,formData:H,activeTasks:W,screenshotsData:le,tagSupportState:he,summaryTags:W.map(K=>Ne[K.key]?Ne[K.key].name:K.key)}}function oo(b){b.lang&&vt(b.lang),b.caseType&&yt(b.caseType),b.status&&(S.value=b.status,S.dispatchEvent(new Event("change"))),setTimeout(()=>{b.subStatus&&(u.value=b.subStatus,u.dispatchEvent(new Event("change"))),setTimeout(()=>{if(b.formData&&Object.entries(b.formData).forEach(([H,_])=>{let W=document.getElementById(H);W&&(W.value=_)}),c.reset(),b.activeTasks&&Array.isArray(b.activeTasks)&&b.activeTasks.forEach(H=>{c.setTaskCount(H.key,H.count)}),b.screenshotsData&&Object.entries(b.screenshotsData).forEach(([H,_])=>{let W=document.getElementById(H);W&&(W.value=_,W.dispatchEvent(new Event("input")))}),b.tagSupportState){let H=document.getElementById("tag-support-container");if(H){let _=H.querySelector(`input[value="${b.tagSupportState.choice}"]`);if(_&&(_.checked=!0,_.dispatchEvent(new Event("change"))),b.tagSupportState.choice==="N\xE3o"&&b.tagSupportState.reason){let W=H.querySelector('input[type="text"]');W&&(W.value=b.tagSupportState.reason)}}}},150)},50)}let Rt=No({onSaveCurrent:async()=>{let b=await to();return wt(1.5),S.value="",b},onLoadDraft:b=>{oo(b)}}),rt=m.lastElementChild;if(rt&&rt.insertBefore(Rt.historyBtnWrapper,rt.firstChild),rt){let b=document.createElement("div");b.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',Object.assign(b.style,{width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease",marginLeft:"4px"}),b.title="Alternar para Split & Transfer",b.onmouseenter=()=>{b.style.background="rgba(255,255,255,0.1)",b.style.color="#FFF"},b.onmouseleave=()=>{i||(b.style.background="transparent",b.style.color="#9AA0A6")},b.onclick=H=>{H.stopPropagation(),g(b)},rt.insertBefore(b,rt.firstChild)}Ue.insertBefore(Rt.parkButton,Ue.firstChild),l.appendChild(Rt.drawer);let pt=document.createElement("div");Object.assign(pt.style,Ye),pt.className="no-drag",pt.title="Redimensionar",l.appendChild(pt),Xe(l,pt),document.body.appendChild(l);function yt(b){t=b;let H=ut();Object.assign(O.style,Oe),Object.assign(N.style,Oe),b==="bau"?(Object.assign(O.style,H),y.href="https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657"):(Object.assign(N.style,H),y.href="https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243"),u.value&&u.dispatchEvent(new Event("change"))}function ae(b){try{if(Ve&&Ve[n]&&Ve[n][b])return Ve[n][b];if(Ve&&Ve.pt&&Ve.pt[b])return Ve.pt[b]}catch{}return b}function Xo(){P.textContent=ae("idioma"),T.textContent=ae("fluxo"),B.textContent=ae("status_principal"),d.textContent=ae("substatus"),De.textContent=ae("cenarios_comuns"),Je.textContent=ae("selecione_tasks"),ze.textContent=ae("preencha_detalhes"),ct.textContent=ae("copiar"),dt.textContent=ae("preencher"),S.querySelector('option[value=""]')&&(S.querySelector('option[value=""]').textContent=ae("select_status")),u.querySelector('option[value=""]')&&(u.querySelector('option[value=""]').textContent=ae("select_substatus")),F.textContent=ae("caso_portugal"),R.textContent=ae("sim"),L.textContent=ae("nao"),be.textContent=ae("consentiu_gravacao"),ve.textContent=ae("sim"),de.textContent=ae("nao"),Re.querySelectorAll("label").forEach(b=>{let H=b.nextElementSibling.id.replace("field-",""),_=ae(H.toLowerCase());_!==H.toLowerCase()?b.textContent=_:b.textContent=H.replace(/_/g," ").replace(/\b\w/g,W=>W.toUpperCase())+":"}),Se.textContent="+ "+(n==="pt"?"Gostaria de selecionar uma task?":"Quisiera seleccionar una tarea?")}function vt(b){n=b;let H=ut();Object.assign(z.style,Oe),Object.assign(w.style,Oe),b==="pt"?(Object.assign(z.style,H),v.style.display="block",U(o)):(Object.assign(w.style,H),v.style.display="none",Q.style.display="none"),Xo(),u.value&&u.dispatchEvent(new Event("change"))}function Dt(b){(b.value.trim()===""||b.value.trim()==="\u2022")&&(b.value="\u2022 "),b.onkeydown=function(H){if(H.key==="Enter"){H.preventDefault();let _=this.selectionStart,W=this.selectionEnd,le=this.value,ye=le.lastIndexOf(`
`,_-1)+1,Ae=le.substring(ye,_),he=Ae.trim()==="\u2022"||Ae.trim()===""?`
`:`
\u2022 `;this.value=le.substring(0,_)+he+le.substring(W),this.selectionStart=this.selectionEnd=_+he.length}else if(H.key==="Backspace"){let _=this.selectionStart;if(_===this.selectionEnd&&_>0){let W=this.value.substring(0,_);W.endsWith(`
\u2022 `)?(H.preventDefault(),this.value=W.substring(0,_-3)+this.value.substring(this.selectionEnd),this.selectionStart=this.selectionEnd=_-3):W==="\u2022 "&&(H.preventDefault(),this.value="",this.selectionStart=this.selectionEnd=0)}}}}function zt(){let b=typeof Me<"u"?Me:document.getElementById("snippet-container");if(!b)return;let H=b.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'),_={},W=new Set;H.forEach(K=>{let ne=K.id,Z=Be[ne];if(Z)for(let J in Z)J==="linkedTask"?W.add(Z.linkedTask):J!=="type"&&(_[J]||(_[J]=[]),_[J].includes(Z[J])||_[J].push(Z[J]))});let le=new Set;Object.values(Be).forEach(K=>{Object.keys(K).forEach(ne=>{ne!=="linkedTask"&&ne!=="type"&&le.add(ne)})}),le.forEach(K=>{let ne=document.getElementById(K);if(ne){let Z=_[K]||[],J="";bt.includes(K.replace("field-",""))?(J=Z.map(re=>re.startsWith("\u2022 ")?re:"\u2022 "+re).join(`
`),J===""?J="\u2022 ":J.endsWith(`
\u2022 `)||(J+=`
\u2022 `)):J=Z.join(`

`),J.trim()!=="\u2022"&&J.trim()!==""?ne.value=J:bt.includes(K.replace("field-",""))?ne.value="\u2022 ":ne.value="",ne.tagName==="TEXTAREA"&&typeof Dt=="function"&&Dt(ne)}});let ye=new Set,Ae=new Set;b.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(K=>{let ne=Be[K.id];ne&&ne.linkedTask&&(K.checked?ye.add(ne.linkedTask):Ae.add(ne.linkedTask))}),Ae.forEach(K=>{ye.has(K)||c.toggleTask(K,!1)}),ye.forEach(K=>{c.toggleTask(K,!0)})}S.onchange=()=>{let b=S.value;if(wt(1.5),u.innerHTML=`<option value="">${ae("select_substatus")}</option>`,!b){u.disabled=!0;return}for(let H in gt){let _=gt[H];if(_.status===b){let W=document.createElement("option");W.value=H,W.textContent=_.name,u.appendChild(W)}}u.disabled=!1},u.onchange=()=>{let b=u.value;if(wt(1.5),!b)return;c.updateSubStatus(b);let H=gt[b];Me.innerHTML="";let _=(Z,J,re)=>{let fe=document.createElement("label");Object.assign(fe.style,a.checkboxLabel),fe.onmouseover=()=>fe.style.backgroundColor="#e8eaed",fe.onmouseout=()=>fe.style.backgroundColor="#f8f9fa";let me=document.createElement("input");return me.type=J,me.id=Z.id,Object.assign(me.style,a.checkboxInput),fe.appendChild(me),fe.appendChild(document.createTextNode(` ${Z.text}`)),re.appendChild(fe),me},W=[],le="radio";if(b==="NI_Awaiting_Inputs")W=[{id:"quickfill-ni-inicio-manual",text:"In\xEDcio 2/6 (Manual)"},{id:"quickfill-ni-cms-access",text:"In\xEDcio 2/6 (ADV sem acesso ao CMS)"},{id:"quickfill-ni-followup-bau",text:"Follow-up 2/6 (BAU)"},{id:"quickfill-ni-followup-lm",text:"Follow-up 2/6 (LM)"}];else if(b.startsWith("SO_"))le="checkbox",W=[{id:"quickfill-gtm-install",text:"Instala\xE7\xE3o do GTM"},{id:"quickfill-whatsapp",text:"Convers\xE3o de WhatsApp"},{id:"quickfill-form",text:"Convers\xE3o de Formul\xE1rio (Padr\xE3o)"},{id:"quickfill-ecw4-close",text:"Fechamento ECW4 (P\xF3s 7 dias)"},{id:"quickfill-ga4-event-close",text:"Fechamento GA4 (P\xF3s 2 dias)"}];else if(b.startsWith("AS_")){le="checkbox";let Z=document.createElement("label");Z.textContent=ae("cenarios_comuns"),Object.assign(Z.style,a.label),Me.appendChild(Z),W=[{id:"quickfill-as-no-show",text:"Anunciante n\xE3o compareceu (respondeu e-mail)"},{id:"quickfill-as-insufficient-time",text:"Tempo insuficiente"},{id:"quickfill-as-no-access",text:"Anunciante sem acessos necess\xE1rios"}]}else b.startsWith("IN_")?W=[{id:"quickfill-in-nrp-bau",text:"NRP (BAU - 3 tentativas)"},{id:"quickfill-in-nrp-lm",text:"NRP (LM - Sem tentativas)"},{id:"quickfill-in-no-show-bau",text:"No-Show (BAU - 3 tentativas)"},{id:"quickfill-in-2-6-final",text:"Finaliza\xE7\xE3o 2/6 (Sem Resposta)"},{id:"quickfill-in-manual",text:"Outro (Manual)"}]:b.startsWith("DC_")?(le="radio",W=[{id:"quickfill-dc-lm-no-access",text:"LM - Sem acessos (Reagendar em BAU)"}]):b==="NI_Attempted_Contact"?(le="radio",W=[{id:"quickfill-ni-attempted-2day",text:"2 Day Rule (2 Liga\xE7\xF5es + Chat AM)"}]):b==="NI_Awaiting_Validation"&&(le="checkbox",W=[{id:"quickfill-ni-awaiting-ecw4",text:"ECW4 (Acompanhar)"},{id:"quickfill-ni-awaiting-ga4",text:"GA4 Event Tracking (Acompanhar)"}]);let ye=W.filter(Z=>{let J=Be[Z.id];return!J.type||J.type==="all"||J.type===t});ye.forEach((Z,J)=>{let re=_(Z,le,Me);le==="radio"&&(re.name="scenario-radio-group",J===0&&(re.checked=!0))}),ye.length>0&&(ce.style.display="block"),H.requiresTasks?(Se.style.display="none",Je.style.display="block",c.selectionElement.style.display="block"):(Se.style.display="block",Je.style.display="none",c.selectionElement.style.display="none"),Re.innerHTML="";let Ae=H.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(Ae)].forEach(Z=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(Z))return;let J=Z.slice(1,-1),re=document.createElement("label"),fe=ae(J.toLowerCase());if(re.textContent=fe!==J.toLowerCase()?fe:J.replace(/_/g," ").replace(/\b\w/g,oe=>oe.toUpperCase())+":",Object.assign(re.style,a.label),J==="SPEAKEASY_ID"){let oe=document.createElement("button");oe.innerHTML='<span style="font-size:12px; margin-right:4px;">\u2728</span>Auto Busca',oe.style.cssText=`
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
          `,oe.title="Localizar Speakeasy ID no hist\xF3rico",oe.onmouseover=()=>{oe.style.backgroundColor="#c2e7ff",oe.style.boxShadow="0 1px 2px rgba(0,0,0,0.1)"},oe.onmouseout=()=>{oe.style.backgroundColor="#d3e3fd",oe.style.boxShadow="none"},oe.onmousedown=()=>{oe.style.backgroundColor="#a8c7fa",oe.style.transform="scale(0.96)"},oe.onmouseup=()=>oe.style.transform="scale(1)",oe.onclick=Ee=>{Ee.preventDefault(),wo(`field-${J}`)},re.appendChild(oe)}let me;bt.includes(J)?(me=document.createElement("textarea"),Object.assign(me.style,a.textarea),me.classList.add("bullet-textarea"),Dt(me)):Vt.includes(J)?(me=document.createElement("textarea"),Object.assign(me.style,a.textarea)):(me=document.createElement("input"),me.type="text",Object.assign(me.style,a.input),J==="REASON_COMMENTS"&&(b.startsWith("NI_")||b.startsWith("IN_"))&&(Object.assign(re.style,{display:"none"}),Object.assign(me.style,{display:"none"}))),J==="ON_CALL"&&t==="lm"&&(Object.assign(re.style,{display:"none"}),Object.assign(me.style,{display:"none"}),me.value="N/A"),me.id=`field-${J}`,Re.appendChild(re),Re.appendChild(me)});let K=Me.querySelectorAll('input[type="checkbox"], input[type="radio"]');K.length>0&&(K.forEach(Z=>{Z.removeEventListener("change",zt),Z.addEventListener("change",zt)}),zt()),Ce.style.display="block",nt[b]?Qe.style.display="block":Qe.style.display="none",Ue.style.display="flex";let ne=c.getCheckedElements().map(Z=>Z.value);r.updateVisibility(b,ne)},Se.onclick=()=>{Se.style.display="none",Je.style.display="block",c.selectionElement.style.display="block"};function no(){let b=u.value;if(!b)return null;let _=gt[b].template.replace(/\n/g,"<br>"),W='style="margin-bottom: 12px; padding-left: 30px;"',le=[],ye="",Ae=c.getCheckedElements();Ae.length>0&&Ae.forEach(ne=>{let Z=ne.value,J=Ne[Z],re=ne.closest().querySelector(".stepper-count"),fe=re?parseInt(re.textContent):1;fe>1?le.push(`${J.name} (x${fe})`):le.push(J.name)});let he=c.screenshotsElement;if(he){let ne=Array.from(he.querySelectorAll('input[id^="name-"]'));ne.length>0&&ne.forEach(Z=>{let J=Z.value,re=Z.closest(".cw-screen-card");if(re){let fe=re.querySelectorAll('input[id^="screen-"]'),me=!1,oe="";fe.forEach(Ee=>{let io=Ee.closest(".cw-input-group"),so=io?io.querySelector(".cw-input-label"):null,Qo=so?so.textContent:"Evid\xEAncia",ro=Ee.value.trim(),Zo=ro?` ${ro}`:"";oe+=`<li>${Qo} -${Zo}</li>`,me=!0}),me&&(ye+=`<b>${J}</b>`,ye+=`<ul ${W}>${oe}</ul>`)}})}if(_.includes("{TAGS_IMPLEMENTED}")?_=_.replace(/{TAGS_IMPLEMENTED}/g,le.join(", ")||"N/A"):le.length>0&&(_+=`<br><b>Tags:</b> ${le.join(", ")}<br>`),_.includes("{SCREENSHOTS_LIST}")?_=_.replace(/{SCREENSHOTS_LIST}/g,ye?`${ye}`:"N/A"):ye!==""&&(_+=`<br>${ye}`),n==="pt"&&o){let ne=se.checked?ae("sim"):ae("nao");_=_.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${ae("consentiu_gravacao")}</b> ${ne}<br><br>`),_=_.replace(/{CASO_PORTUGAL}/g,`<br><b>${ae("caso_portugal")}</b> ${ae("sim")}<br>`)}else n==="pt"&&!o?(_=_.replace(/{CASO_PORTUGAL}/g,`<br><b>${ae("caso_portugal")}</b> ${ae("nao")}<br>`),_=_.replace(/{CONSENTIU_GRAVACAO}/g,"")):(_=_.replace(/{CASO_PORTUGAL}/g,""),_=_.replace(/{CONSENTIU_GRAVACAO}/g,""));return Re.querySelectorAll("input, textarea").forEach(ne=>{let Z=ne.id.replace("field-",""),J=new RegExp(`{${Z}}`,"g"),re=ne.value;if(Z==="REASON_COMMENTS"&&(b.startsWith("NI_")||b.startsWith("IN_"))){let oe=Me.querySelector('input[type="radio"]:checked');oe&&Be[oe.id]&&(re=Be[oe.id]["field-REASON_COMMENTS"])}if(bt.includes(Z)&&re.trim()!==""){let oe=re.split(`
`).map(Ee=>Ee.trim()).filter(Ee=>Ee!==""&&Ee!=="\u2022").map(Ee=>Ee.startsWith("\u2022 ")?Ee.substring(2):Ee).map(Ee=>`<li>${Ee}</li>`).join("");re=oe?`<ul ${W}>${oe}</ul>`:""}else Vt.includes(Z)?re=re.split(`
`).filter(oe=>oe.trim()!=="").map(oe=>`<p style="margin: 0 0 8px 0;">${oe}</p>`).join(""):ne.tagName==="TEXTAREA"&&(re=re.replace(/\n/g,"<br>"));let fe=re.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(fe===""||fe==="\u2022"||fe.toLowerCase()==="n/a"){let oe=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${Z}\\}(?:<br>\\s*)?`,"gi");oe.test(_)?_=_.replace(oe,""):_=_.replace(J,"")}else _=_.replace(J,re.replace(/\$/g,"$$$$"))}),_=_.replace(/{([A-Z0-9_]+)}/g,""),_=_.replace(/(<br>){3,}/g,"<br><br>"),typeof r<"u"&&r.getOutput&&(_+=r.getOutput()),_}ct.onclick=()=>{let b=no();b?(xt(b),V(ae("copiado_sucesso"))):V(ae("selecione_substatus"),{error:!0})},dt.onclick=async()=>{let b=u.value,H=no();if(!H){V(ae("selecione_substatus"),{error:!0});return}xt(H),Bt();let _=qt(),W=await Mt();if(W)try{if(W.focus(),W.innerHTML.trim()==="<p><br></p>"||W.innerHTML.trim()==="<br>"||W.innerText.trim()===""){let he=document.createRange();he.selectNodeContents(W);let K=window.getSelection();K.removeAllRanges(),K.addRange(he),document.execCommand("delete",!1,null)}else if(!W.innerHTML.endsWith("<br><br>")){let he=document.createRange();he.selectNodeContents(W),he.collapse(!1);let K=window.getSelection();K.removeAllRanges(),K.addRange(he),document.execCommand("insertHTML",!1,"<br><br>")}document.execCommand("insertHTML",!1,H),Lt(W),setTimeout(()=>{V(ae("inserido_copiado"))},600);let ye=typeof et<"u"&&et?et.checked:!0;if(b&&nt[b]&&ye){let he=nt[b];await Ot(he),await new Promise(K=>setTimeout(K,500))}_(),wt(1.5),S.value="",u.innerHTML=`<option value="">${ae("select_substatus")}</option>`,u.disabled=!0}catch(le){console.error(le),V("Erro ao inserir.",{error:!0}),_()}};function wt(b=1.5){b<=1.5&&(ce.style.display="none",Me.innerHTML=""),b<=2&&(c.reset(),Se.style.display="none"),b<=3&&(Ce.style.display="none",Re.innerHTML="",r.reset(),Ue.style.display="none",Qe.style.display="none")}let Ko=null,Ct="";function ao(b){let H=document.getElementById("cw-btn-notes");if(!H)return;let _=H.querySelector(".cw-dot-dirty");if(b){if(!_){let W=document.createElement("div");W.className="cw-dot-dirty",H.appendChild(W)}}else _&&_.remove()}async function Jo(){let b=await to(),H=b.activeTasks.length>0;if(!H){let _=Object.keys(b.formData);for(let W of _){let le=b.formData[W];if(le&&le.trim().length>3&&le!=="\u2022 "){H=!0;break}}}if(ao(H),H){let _=JSON.stringify(b);_!==Ct&&(Le.saveEmergency(b),Ct=_)}else Ct!==""&&(Le.clearEmergency(),Ct="")}Ko=setInterval(Jo,5e3),setTimeout(()=>{let b=Le.getEmergency();if(b){let H=document.createElement("button");H.innerHTML="\u26A0\uFE0F Recuperar trabalho n\xE3o salvo",H.style.cssText="width:100%; background:#FFF3E0; color:#B06000; border:none; padding:8px; font-size:12px; cursor:pointer; font-weight:600; border-bottom:1px solid #FFE0B2;",H.onclick=()=>{oo(b),H.remove(),V("Trabalho recuperado!"),SoundManager.playSuccess()},f.insertBefore(H,f.firstChild),ao(!0)}},1e3);function Bt(){if(s=!s,s){let b=l.querySelector(".cw-expand-btn");b&&typeof b.resetState=="function"&&b.resetState()}qe(s,l,"cw-btn-notes")}return yt("bau"),vt("pt"),Bt}var it={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function Ro(){let e="v4.2.0 CR-Hybrid",t="CANNED_RESPONSES",n=Object.keys(it)[0],o="",s="list",i=!1,a={bgApp:"#F8F9FA",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.08)",borderFocus:"rgba(26, 115, 232, 0.4)",textPrimary:"#202124",textSecondary:"#5F6368",primary:"#1A73E8",primaryBg:"#E8F0FE",shadowCard:"0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",shadowHover:"0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",transition:"all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1)"},r={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:a.bgApp},c={display:"flex",width:"200%",height:"100%",transition:"transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",transform:"translateX(0)",willChange:"transform"},l={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},p={padding:"20px 24px 12px 24px",flexShrink:"0",background:a.bgApp,zIndex:"10",display:"flex",flexDirection:"column",gap:"16px",borderBottom:`1px solid ${a.borderSubtle}`},m={width:"100%",height:"44px",padding:"0 16px 0 48px",borderRadius:"12px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",fontWeight:"400",color:a.textPrimary,boxSizing:"border-box",outline:"none",transition:a.transition,boxShadow:"0 2px 5px rgba(0,0,0,0.03)",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%239AA0A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"16px center"},f={display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px",paddingBottom:"4px"},x={padding:"6px 14px",borderRadius:"100px",border:"1px solid #DADCE0",background:"#FFFFFF",color:a.textSecondary,fontSize:"13px",fontWeight:"500",letterSpacing:"0.3px",cursor:"pointer",transition:a.transition,flexShrink:"0",display:"flex",alignItems:"center",justifyContent:"center"},h={background:a.primaryBg,color:a.primary,borderColor:"transparent",fontWeight:"600",boxShadow:"0 1px 2px rgba(26, 115, 232, 0.15)"},g={padding:"16px 24px 80px 24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"12px"},E={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",height:"72px",minHeight:"72px",borderRadius:"16px",background:a.bgSurface,border:"1px solid transparent",boxShadow:a.shadowCard,cursor:"pointer",transition:"all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",position:"relative",overflow:"hidden"},C=document.createElement("div");C.id="quick-email-popup",C.classList.add("cw-module-window"),Object.assign(C.style,ke,{right:"100px",width:"440px",height:"640px",borderRadius:"20px",boxShadow:"0 24px 64px rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.4)"});let P={popup:C,googleLine:null,focusElement:null};function j(){i=!i,qe(i,C,"cw-btn-email"),i||setTimeout(()=>y(),300)}let z=Ie(C,"Quick Email",e,"Templates & Automa\xE7\xF5es",P,()=>j()),w=document.createElement("div");Object.assign(w.style,r);let A=document.createElement("div");Object.assign(A.style,c);let T=document.createElement("div");Object.assign(T.style,l);let k=document.createElement("div");Object.assign(k.style,p);let O=document.createElement("input");O.placeholder="Pesquisar templates...",Object.assign(O.style,m),O.onfocus=()=>{O.style.borderColor=a.primary,O.style.boxShadow="0 0 0 4px rgba(26, 115, 232, 0.15)",O.style.background="#fff"},O.onblur=()=>{O.style.borderColor="transparent",O.style.boxShadow="0 2px 5px rgba(0,0,0,0.03)",O.style.background="#fff"},P.focusElement=O;let N=document.createElement("div");Object.assign(N.style,f);let q=document.createElement("div");Object.assign(q.style,g),k.appendChild(O),k.appendChild(N),T.appendChild(k),T.appendChild(q);let B=document.createElement("div");Object.assign(B.style,l);let S=document.createElement("div");Object.assign(S.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),B.appendChild(S),A.appendChild(T),A.appendChild(B),w.appendChild(A),C.appendChild(z),C.appendChild(w),document.body.appendChild(C);async function D(M,$){try{i&&j();let I=qt();await new Promise(R=>setTimeout(R,800)),$==="email"?await So(M):$==="cr"&&await Ot(M),I()}catch(I){console.error("\u274C Erro:",I);let R=document.querySelector(".cw-focus-backdrop");R&&R.classList.remove("active")}}function d(M){s="detail",A.style.transform="translateX(-50%)";let $='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',I='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';S.innerHTML=`
            <style>
                .cw-email-content p { margin: 0 0 8px 0; } /* Margem apenas embaixo */
                .cw-email-content ul { margin: 0 0 8px 16px; padding: 0; }
                .cw-email-content li { margin-bottom: 4px; }
            </style>

            <div style="position:sticky; top:0; background:rgba(255,255,255,0.9); backdrop-filter:blur(12px); border-bottom:1px solid #eee; padding:16px 24px; z-index:10; display:flex; align-items:center; gap:12px;">
                <button id="csa-back-btn" style="background:none; border:none; cursor:pointer; display:flex; color:#5f6368; padding:8px; margin-left:-12px; border-radius:50%; transition:background 0.2s;">${$}</button>
                <div style="font-weight:600; font-size:16px; color:#202124; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${M.name}</div>
            </div>
            
            <div style="padding:24px;">
                <div style="margin-bottom:24px;">
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Assunto</div>
                    <div style="font-size:14px; font-weight:500; color:#202124; padding:16px; background:#F8F9FA; border-radius:12px; border:1px solid #eee; box-shadow:inset 0 1px 2px rgba(0,0,0,0.02);">${M.subject}</div>
                </div>
                
                <div>
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Mensagem</div>
                    
                    <div class="cw-email-content" style="font-size:13px; color:#3c4043; line-height:1.5; white-space: normal; word-break: break-word; padding:0 4px;">
                        ${M.body}
                    </div>
                </div>
            </div>
            
            <div style="position:sticky; bottom:0; padding:24px; background:linear-gradient(to top, #fff 90%, rgba(255,255,255,0)); pointer-events:none;">
                <button id="csa-insert-btn" style="pointer-events:auto; width:100%; padding:14px; background:#1a73e8; color:white; border:none; border-radius:12px; font-size:14px; font-weight:600; cursor:pointer; display:flex; justify-content:center; align-items:center; gap:10px; box-shadow:0 4px 12px rgba(26,115,232,0.3); transition:transform 0.2s, box-shadow 0.2s;">
                    ${I} Usar Template
                </button>
            </div>
        `;let R=S.querySelector("#csa-back-btn");R.onmouseenter=()=>R.style.background="#f1f3f4",R.onmouseleave=()=>R.style.background="none",R.onclick=y;let G=S.querySelector("#csa-insert-btn");G.onmouseenter=()=>{G.style.transform="translateY(-1px)",G.style.boxShadow="0 6px 16px rgba(26,115,232,0.4)"},G.onmouseleave=()=>{G.style.transform="translateY(0)",G.style.boxShadow="0 4px 12px rgba(26,115,232,0.3)"},G.onclick=()=>{G.style.transform="scale(0.96)",D(M,"email"),setTimeout(()=>{G.style.transform="scale(1)",y()},300)}}function y(){s="list",A.style.transform="translateX(0)"}function u(M,$,I=null){let R=document.createElement("button"),G=I?`<span style="margin-right:6px; font-size:14px; opacity:0.9;">${I}</span>`:"";return R.innerHTML=`${G}${M}`,Object.assign(R.style,x),n===$&&o===""?Object.assign(R.style,h):(R.onmouseenter=()=>{R.style.background="#F1F3F4",R.style.borderColor="#DADCE0"},R.onmouseleave=()=>{R.style.background="#FFFFFF",R.style.borderColor="#DADCE0"}),R.onclick=()=>{n=$,o="",O.value="",v(),F()},R}function v(){N.innerHTML="",N.appendChild(u("Smart CRs",t,"\u26A1")),Object.keys(it).forEach(M=>{N.appendChild(u(it[M].title,M))})}function F(){q.innerHTML="";let M=[];if(o.trim()!==""){let Y=o.toLowerCase();Object.values(it).forEach(L=>{L.emails.forEach(U=>{(U.name.toLowerCase().includes(Y)||U.subject.toLowerCase().includes(Y))&&M.push({type:"email",data:U})})}),Object.entries(nt).forEach(([L,U])=>{if(!U)return;(L.replace(/_/g," ").toLowerCase().includes(Y)||U.toLowerCase().includes(Y))&&M.push({type:"cr",key:L,code:U})})}else n===t?Object.entries(nt).forEach(([Y,L])=>{L&&M.push({type:"cr",key:Y,code:L})}):it[n]&&it[n].emails.forEach(Y=>{M.push({type:"email",data:Y})});if(M.length===0){q.innerHTML=`
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F50D}</div>
                    <div style="font-size:14px; font-weight:500;">Nenhum template encontrado</div>
                    <div style="font-size:12px; margin-top:4px;">Tente outro termo de busca</div>
                </div>`;return}let I='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1967D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',R='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA8600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',G='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BDC1C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';M.forEach(Y=>{let L=document.createElement("div");if(Object.assign(L.style,E),Y.type==="email"){let U=Y.data,Q=U.subject.length>45?U.subject.substring(0,45)+"...":U.subject;L.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#E8F0FE; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${I}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${U.name}</div>
                        <div style="font-size:12px; color:#5F6368; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${Q}</div>
                    </div>
                    <div style="margin-left:12px; opacity:0.6;">${G}</div>
                `,L.onclick=()=>d(U)}else{let U=Y.key.replace(/_/g," ").replace("AS ","AS - ").replace("NI ","NI - ");L.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#FEF7E0; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${R}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; margin-bottom:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${U}</div>
                        <div style="font-size:11px; font-weight:500; color:#EA8600; font-family:'Roboto Mono', monospace; letter-spacing:-0.2px;">${Y.code}</div>
                    </div>
                    <div style="font-size:10px; font-weight:700; color:#DADCE0; text-transform:uppercase; letter-spacing:0.5px; border:1px solid #F1F3F4; padding:4px 8px; border-radius:6px; margin-left:12px;">Inserir</div>
                `,L.onclick=()=>{L.style.transform="scale(0.98)",L.style.background="#FEF7E0",setTimeout(()=>{L.style.transform="scale(1)",L.style.background="#fff",D(Y.code,"cr")},150)}}L.onmouseenter=()=>{L.style.transform="translateY(-2px)",L.style.boxShadow=a.shadowHover,Y.type==="cr"?L.style.borderLeft="3px solid #Fbbc04":L.style.borderLeft="3px solid #1a73e8"},L.onmouseleave=()=>{L.style.transform="translateY(0)",L.style.boxShadow=a.shadowCard,L.style.borderLeft="1px solid transparent"},q.appendChild(L)})}return O.addEventListener("input",M=>{o=M.target.value,o!==""?Array.from(N.children).forEach($=>{Object.assign($.style,x),$.style.opacity="0.6"}):v(),F()}),v(),F(),j}var Do={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function zo(){let e="v2.6 (Context HD)",t="csa-local-styles";if(!document.getElementById(t)){let u=document.createElement("style");u.id=t,u.innerHTML=`
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
      `,document.head.appendChild(u)}let n={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#FFFFFF",scrollBehavior:"smooth"},card:{background:"#FFFFFF",border:"1px solid #E5E7EB",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"12px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"8px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.1s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.6",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"18px",height:"18px",borderRadius:"6px",border:"2px solid #DADCE0",marginRight:"12px",marginTop:"2px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #F1F3F4",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"},contextBanner:{padding:"20px 20px 16px 20px",background:"#FFFFFF",borderBottom:"1px solid #F1F3F4",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.02)",position:"relative",zIndex:"5"}},o={},s="PT",i="BAU",a=!1,r=document.createElement("div");r.id="call-script-popup",r.classList.add("cw-module-window"),Object.assign(r.style,ke,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let c={popup:r,googleLine:null},l=null;function p(){a&&Pe().then(u=>{let v=r.querySelector("#cw-ctx-name"),F=r.querySelector("#cw-ctx-cid"),M=r.querySelector("#cw-ctx-email");if(v&&(v.textContent=u.advertiserName||"Cliente Desconhecido"),F){let $=u.cid||"---";F.textContent!==$&&(F.textContent=$)}if(M){let $=u.clientEmail||"N\xE3o encontrado";M.textContent!==$&&(M.textContent=$,M.title=$)}})}function m(){a=!a,qe(a,r,"cw-btn-script"),a?(p(),l||(l=setInterval(p,2e3))):l&&(clearInterval(l),l=null)}let f=Ie(r,"Call Script",e,"Guia interativo para condu\xE7\xE3o de chamadas.",c,()=>{m()});r.appendChild(f);let x=document.createElement("div");Object.assign(x.style,n.contextBanner),x.innerHTML=`
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
  `;let h=(u,v)=>{let F=x.querySelector(u),M=x.querySelector(v);F.onclick=()=>{let $=M.textContent;!$||$.includes("---")||$.includes("N\xE3o encontrado")||(navigator.clipboard.writeText($),X.playSuccess(),F.classList.add("copied"),setTimeout(()=>F.classList.remove("copied"),1500))}};r.appendChild(x);let g=document.createElement("div");Object.assign(g.style,n.progressBarContainer);let E=document.createElement("div");Object.assign(E.style,n.progressBarFill),g.appendChild(E),r.appendChild(g);let C=document.createElement("div");C.id="csa-content",Object.assign(C.style,n.contentArea),r.appendChild(C);let P=document.createElement("div");Object.assign(P.style,n.footer);let j=document.createElement("span");j.textContent="by lucaste@",Object.assign(j.style,{fontSize:"10px",color:"#bdc1c6"});let z=document.createElement("button");z.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> Resetar Script',Object.assign(z.style,n.resetBtn),z.onmouseenter=()=>z.style.background="#fce8e6",z.onmouseleave=()=>z.style.background="transparent",z.onclick=()=>{z.style.transform="scale(0.9)",setTimeout(()=>z.style.transform="scale(1)",150);for(let u in o)delete o[u];S()},P.appendChild(j),P.appendChild(z),r.appendChild(P);let w=document.createElement("div");Object.assign(w.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let A=document.createElement("div");Object.assign(A.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let T=document.createElement("div");T.textContent="BAU";let k=document.createElement("div");k.textContent="LT",Object.assign(T.style,Oe),Object.assign(k.style,Oe),A.appendChild(T),A.appendChild(k);let O=document.createElement("select");Object.assign(O.style,Et,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),O.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',O.value=s,w.appendChild(A),w.appendChild(O),C.appendChild(w);let N=document.createElement("div");N.id="csa-checklist-area",C.appendChild(N);let q=document.createElement("div");Object.assign(q.style,Ye),q.className="no-drag",q.title="Redimensionar",r.appendChild(q),Xe(r,q),document.body.appendChild(r),h("#cw-pill-cid","#cw-ctx-cid"),h("#cw-pill-email","#cw-ctx-email");function B(u){return u}function S(){N.innerHTML="";let u=`${s} ${i}`,v=Do[u];if(!v){N.innerHTML='<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;"><div style="font-size: 24px;">\u2615</div><div>Script n\xE3o configurado.</div></div>',E.style.width="0%";return}let F=v.color||"#1a73e8",M=0,$=0;["inicio","meio","fim"].forEach(I=>{v[I]&&(M+=v[I].length)}),["inicio","meio","fim"].forEach((I,R)=>{let G=v[I];if(!G||G.length===0)return;let Y=document.createElement("div");Object.assign(Y.style,n.card);let L=document.createElement("div");Object.assign(L.style,n.cardTitle);let U="";I==="inicio"?s.includes("ES")?U="Apertura":s.includes("EN")?U="Opening":U="Abertura":I==="meio"?s.includes("ES")?U="Implementaci\xF3n":s.includes("EN")?U="Implementation":U="Implementa\xE7\xE3o (Tag Support)":I==="fim"&&(s.includes("ES")?U="Cierre":s.includes("EN")?U="Closing":U="Fechamento"),L.textContent=U;let Q=document.createElement("span");Q.style.fontSize="11px",Q.style.opacity="0.7",Q.style.fontWeight="500",Q.style.background="#f1f3f4",Q.style.padding="2px 8px",Q.style.borderRadius="10px",L.appendChild(Q),Y.appendChild(L);let be=0;G.forEach((ge,Te)=>{let se=`${u}-${I}-${Te}`,ve=!!o[se];ve&&($++,be++);let pe=document.createElement("div");Object.assign(pe.style,n.itemRow);let ee=document.createElement("div");Object.assign(ee.style,n.checkbox);let de=document.createElement("span");de.innerHTML=ge,de.style.flex="1",ve?(Object.assign(pe.style,n.itemCompleted),ee.style.background=F,ee.style.borderColor=F,ee.style.transform="scale(1)",ee.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(pe.style.textDecoration="none",pe.style.opacity="1",ee.style.background="transparent",ee.style.borderColor="#dadce0",ee.style.transform="scale(1)",ee.innerHTML=""),pe.onclick=()=>{let ce=!o[se];o[se]=ce,X.playClick(),ce?(ee.style.transform="scale(1.2)",setTimeout(()=>ee.style.transform="scale(1)",150),Object.assign(pe.style,n.itemCompleted),ee.style.background=F,ee.style.borderColor=F,ee.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(pe.style.textDecoration="none",pe.style.opacity="1",ee.style.background="transparent",ee.style.borderColor="#dadce0",ee.innerHTML=""),D(u,v)},pe.onmouseenter=()=>{o[se]||(pe.style.background="#f1f3f4",ee.style.borderColor=F)},pe.onmouseleave=()=>{o[se]||(pe.style.background="transparent",ee.style.borderColor="#dadce0")},pe.appendChild(ee),pe.appendChild(de),Y.appendChild(pe)}),be===G.length&&G.length>0&&(Q.style.color="#1e8e3e",Q.style.background="#e6f4ea",Y.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),Q.textContent=`${be}/${G.length}`,N.appendChild(Y)}),d(M,$)}function D(u,v){let F=0,M=0;["inicio","meio","fim"].forEach($=>{let I=v[$]||[];F+=I.length,I.forEach((R,G)=>{o[`${u}-${$}-${G}`]&&M++})}),d(F,M),setTimeout(()=>S(),200)}function d(u,v){let F=u===0?0:v/u*100;E.style.width=`${F}%`,E.style.background=F===100?"#34A853":"linear-gradient(90deg, #4285F4, #34A853)"}function y(u){i=u;let v=ut();Object.assign(T.style,Oe),Object.assign(k.style,Oe),Object.assign(u==="BAU"?T.style:k.style,v),S()}return T.onclick=()=>y("BAU"),k.onclick=()=>y("LT"),O.addEventListener("change",u=>{s=u.target.value,S()}),y(i),m}var ht={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]}},st={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},_t={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}},Jt="cw_link_history_v4";function Bo(e,t){try{let n=JSON.parse(localStorage.getItem(Jt)||"[]");n=n.filter(o=>o.url!==e.url),n.unshift({...e,_originalCat:t}),n=n.slice(0,3),localStorage.setItem(Jt,JSON.stringify(n))}catch(n){console.warn("Erro ao salvar hist\xF3rico",n)}}function gn(){try{return JSON.parse(localStorage.getItem(Jt)||"[]")}catch{return[]}}function Go(){let e="v4.6",t="",n=!1,o=null,s=!1,i={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},a=document.createElement("div");a.id="links-popup",a.classList.add("cw-module-window"),Object.assign(a.style,ke,{right:"100px",width:"600px",height:"650px",background:i.bgApp,overflow:"hidden"});let c=Ie(a,"Central de Links",e,"Navegue pelas categorias ou use a busca.",{popup:a,googleLine:null},()=>q());a.appendChild(c);let l=document.createElement("div");l.style.cssText="display: flex; height: calc(100% - 56px); width: 100%; position: relative;",a.appendChild(l);let p=document.createElement("div");p.style.cssText=`
      width: 80px; flex-shrink: 0; background: ${i.bgSidebar};
      border-right: 1px solid ${i.borderSubtle};
      display: flex; flex-direction: column; align-items: center;
      padding: 16px 0; overflow-y: auto; gap: 8px;
      scrollbar-width: none; z-index: 2;
  `,l.appendChild(p);let m=document.createElement("div");m.style.cssText="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F8F9FA; position: relative; z-index: 1;",l.appendChild(m);let f=document.createElement("div");f.style.cssText="padding: 16px 24px; flex-shrink: 0; background: transparent;";let x=document.createElement("div");x.style.cssText=`
      position: relative; width: 100%; height: 44px;
      border-radius: 12px; border: 1px solid transparent;
      background: #FFFFFF; transition: all 0.2s;
      display: flex; align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  `;let h=document.createElement("div");h.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',h.style.cssText="margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none;";let g=document.createElement("input");g.type="text",g.placeholder="Buscar ferramenta ou SOP...",g.style.cssText=`
      flex: 1; height: 100%; border: none; background: transparent;
      padding: 0 12px; font-size: 14px; color: ${i.textPrimary};
      outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
  `,g.onfocus=()=>{x.style.boxShadow="0 4px 12px rgba(26,115,232,0.15)",x.style.border="1px solid #1a73e8"},g.onblur=()=>{x.style.boxShadow="0 2px 6px rgba(0,0,0,0.04)",x.style.border="1px solid transparent"},x.appendChild(h),x.appendChild(g),f.appendChild(x),m.appendChild(f);let E=document.createElement("div");E.style.cssText="flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth;",m.appendChild(E);let C=null;function P(){if(C)return;C=document.createElement("div"),C.style.cssText=`
          position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255,255,255,0.98); z-index: 20;
          display: flex; flex-direction: column;
          transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
      `;let B=document.createElement("div");B.style.cssText="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4;",B.innerHTML='<span style="font-size: 16px; font-weight: 700; color: #202124;">\u{1F552} Recentes</span>';let S=document.createElement("button");S.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',S.style.cssText="background: none; border: none; cursor: pointer; color: #5f6368;",S.onclick=()=>{z(),s=!1,k()},B.appendChild(S),C.appendChild(B);let D=document.createElement("div");D.id="cw-history-list",D.style.cssText="flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA;",C.appendChild(D),m.appendChild(C)}function j(){C||P();let B=C.querySelector("#cw-history-list");B.innerHTML="";let S=gn();S.length===0?B.innerHTML='<div style="text-align: center; color: #999; margin-top: 60px; font-size:13px;">Nada por aqui ainda.</div>':S.forEach(D=>{let d=N(D,st[D._originalCat],!0,D._originalCat);B.appendChild(d)}),requestAnimationFrame(()=>C.style.transform="translateY(0)")}function z(){C&&(C.style.transform="translateY(100%)")}function w(){p.innerHTML="";let B=A("history","Recentes",st.history);B.id="cw-sidebar-btn-history",B.onclick=()=>{X.playClick(),s=!s,s?j():z(),k()},p.appendChild(B);let S=document.createElement("div");S.style.cssText="width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0;",p.appendChild(S),Object.keys(ht).forEach(D=>{let d=ht[D],y=A(D,d.label,st[D]);y.id=`cw-sidebar-btn-${D}`,y.onclick=()=>{X.playClick(),s&&(s=!1,z()),T(D)},p.appendChild(y)})}function A(B,S,D){let d=document.createElement("div");d.style.cssText=`
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; color: ${i.textSecondary}; 
          transition: all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1);
          position: relative;
      `,d.title=S,d.dataset.key=B;let y=document.createElement("div");y.style.cssText="width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s;",y.innerHTML=D||st.tasks;let u=document.createElement("div");return u.style.cssText="font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px;",u.textContent=S,d.appendChild(y),d.appendChild(u),d.onmouseenter=()=>{o!==B&&!(B==="history"&&s)&&(d.style.background="#F1F3F4",y.style.transform="scale(1.1)")},d.onmouseleave=()=>{o!==B&&!(B==="history"&&s)&&(d.style.background="transparent",y.style.transform="scale(1)")},d}function T(B){let S=document.getElementById(`cat-anchor-${B}`);S&&(S.scrollIntoView({behavior:"smooth",block:"start"}),o=B,k())}function k(){Object.keys(ht).forEach(S=>{let D=p.querySelector(`#cw-sidebar-btn-${S}`);if(D)if(o===S&&!s){let d=_t[S];D.style.background=d.bg,D.style.color=d.color,D.querySelector("div:first-child").style.transform="scale(1.1)"}else D.style.background="transparent",D.style.color=i.textSecondary,D.querySelector("div:first-child").style.transform="scale(1)"});let B=p.querySelector("#cw-sidebar-btn-history");B&&(s?(B.style.background="#3C4043",B.style.color="#FFFFFF"):(B.style.background="transparent",B.style.color=i.textSecondary))}function O(){if(E.innerHTML="",t.trim()!==""){let S=[];if(Object.entries(ht).forEach(([d,y])=>{let u=y.links.filter(v=>v.name.toLowerCase().includes(t.toLowerCase())||v.desc.toLowerCase().includes(t.toLowerCase()));S.push(...u.map(v=>({...v,_cat:d})))}),S.length===0){E.innerHTML='<div style="text-align:center; padding: 60px; color:#999; font-size:13px;">Nada encontrado.</div>';return}let D=document.createElement("div");D.innerHTML="Resultados da busca",D.style.cssText="font-size:12px; font-weight:700; color:#5f6368; margin:20px 0 10px; text-transform:uppercase; letter-spacing:0.5px;",E.appendChild(D),S.forEach(d=>{let y=N(d,st[d._cat],!1,d._cat);E.appendChild(y)});return}Object.entries(ht).forEach(([S,D])=>{let d=_t[S],y=document.createElement("div"),u=document.createElement("div");u.id=`cat-anchor-${S}`,u.style.cssText=`
              display: flex; align-items: center; gap: 8px;
              font-size: 13px; font-weight: 800; color: ${d.color}; 
              text-transform: uppercase; letter-spacing: 0.5px;
              margin: 32px 0 12px 0; padding-top: 10px;
          `,u.innerHTML=`
            <div style="width:8px; height:8px; border-radius:50%; background:${d.color};"></div>
            ${D.label}
          `,y.appendChild(u);let v=document.createElement("div");v.style.cssText="display: grid; grid-template-columns: 1fr; gap: 8px;",D.links.forEach(F=>{let M=N(F,st[S],!1,S);v.appendChild(M)}),y.appendChild(v),E.appendChild(y)});let B=document.createElement("div");B.style.height="80px",E.appendChild(B)}function N(B,S,D,d){let y=document.createElement("div"),u=_t[d]||_t.history;y.style.cssText=`
          display: flex; align-items: center; gap: 16px;
          padding: 12px 16px; 
          background: #FFFFFF; 
          border: 1px solid transparent;
          border-radius: 16px; 
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative; overflow: hidden;
      `;let v=document.createElement("div");v.style.cssText=`
          width: 40px; height: 40px; border-radius: 12px;
          background: ${u.bg}; color: ${u.color};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
      `,v.innerHTML=S||st.tasks;let F=v.querySelector("svg");F&&(F.style.width="22px",F.style.height="22px");let M=document.createElement("div");M.style.cssText="flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden;";let $=document.createElement("div");$.style.cssText=`font-size: 14px; font-weight: 600; color: ${i.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,$.textContent=B.name;let I=document.createElement("div");I.style.cssText=`font-size: 12px; color: ${i.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,I.textContent=B.desc,M.appendChild($),M.appendChild(I);let R=document.createElement("div");return R.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',R.style.cssText=`
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9AA0A6; transition: all 0.2s; opacity: 0;
      `,R.title="Copiar URL",y.onmouseenter=()=>{y.style.transform="translateY(-2px)",y.style.boxShadow="0 8px 20px rgba(0,0,0,0.08)",y.style.borderColor="rgba(0,0,0,0.05)",y.style.borderLeft=`4px solid ${u.color}`,R.style.opacity="1",R.style.background="#F1F3F4"},y.onmouseleave=()=>{y.style.transform="translateY(0)",y.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",y.style.border="1px solid transparent",R.style.opacity="0",R.style.background="transparent"},y.onclick=()=>{!D&&d&&Bo(B,d),window.open(B.url,"_blank")},R.onclick=G=>{G.stopPropagation(),X.playClick(),navigator.clipboard.writeText(B.url),!D&&d&&Bo(B,d),V("Link copiado!")},y.appendChild(v),y.appendChild(M),y.appendChild(R),y}g.addEventListener("input",B=>{t=B.target.value,O()});function q(){n=!n,qe(n,a,"cw-btn-links")}return document.body.appendChild(a),w(),O(),q}var Ke=[];function Qt(e){Ke=e}var bn=["lucaste","ricardogi"],fn=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function jo(){let e="v4.9",t=!1,n=null,o=null;function s(d){if(!d)return"";try{let y=new Date(d);return isNaN(y.getTime())?String(d):y.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(d)}}if(!document.getElementById("cw-broadcast-hd-css")){let d=document.createElement("style");d.id="cw-broadcast-hd-css",d.innerHTML=`
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
      `,document.head.appendChild(d)}let i={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},a={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function r(d){return d?Object.entries(d).map(([y,u])=>`${y.replace(/[A-Z]/g,v=>"-"+v.toLowerCase())}:${u}`).join(";"):""}function c(d){if(!d||typeof d!="string")return"";let y=d;return y=y.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),y=y.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),y=y.replace(/_(.*?)_/g,"<i>$1</i>"),y=y.replace(/\n/g,"<br>"),y=ho(y),y}let l=document.createElement("div");l.id="broadcast-popup",l.classList.add("cw-module-window"),Object.assign(l.style,ke,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let p={popup:l,googleLine:null};function m(){if(t=!t,qe(t,l,"cw-btn-broadcast"),t){let d=document.getElementById("cw-btn-broadcast");d&&d.classList.remove("has-new"),T()}}let f=Ie(l,"Central de Avisos",e,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",p,()=>m()),x=f.querySelector(".cw-header-actions")||f.lastElementChild,h=null;function g(){let d=null;try{d=We()}catch{console.warn("TechSol: Auth Pending")}if(d){let y=d.split("@")[0].toLowerCase(),u=bn.includes(y);if(window._cwIsAdmin=u,window._cwCurrentUser=y,u&&x&&!x.querySelector("#cw-admin-btn")){let v=document.createElement("div");v.id="cw-admin-btn",v.className="cw-btn-interactive",v.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(v.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),v.title="Novo Aviso",v.onclick=F=>{F.stopPropagation(),P()},x.insertBefore(v,x.firstChild),h||C(),O()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(g,2e3))}if(x){let d=document.createElement("button");d.textContent="Limpar",d.className="cw-btn-interactive",Object.assign(d.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),d.onclick=y=>{y.stopPropagation(),X.playSuccess();let u=Ke.map(v=>v.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(u)),O(),k()},x.insertBefore(d,x.firstChild)}l.appendChild(f);let E=document.createElement("div");E.id="cw-update-status",E.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",l.appendChild(E);function C(){h=document.createElement("div"),h.className="cw-editor-overlay",h.innerHTML=`
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
      `,h.querySelectorAll('input[name="cw-bc-type"]').forEach(v=>{v.addEventListener("change",()=>{h.querySelectorAll(".cw-radio-option").forEach(F=>F.classList.remove("checked")),v.parentElement.classList.add("checked")})}),setTimeout(()=>{let v=h.querySelector(".cw-radio-option.info");v&&v.classList.add("checked")},100);let d=h.querySelector("#cw-bc-cancel"),y=h.querySelector("#cw-bc-close-x"),u=h.querySelector("#cw-bc-send");d.onclick=j,y.onclick=j,u.onclick=z,l.appendChild(h)}function P(d=null){if(!h)return;let y=h.querySelector("#cw-editor-title-label"),u=h.querySelector("#cw-bc-title"),v=h.querySelector("#cw-bc-text"),F=h.querySelector("#cw-bc-send");if(d){o=d.id,y.textContent="Editar Aviso",u.value=d.title||"",v.value=d.text||"",F.textContent="Salvar Altera\xE7\xF5es";let M=d.type||"info",$=h.querySelector(`input[name="cw-bc-type"][value="${M}"]`);$&&$.click()}else{o=null,y.textContent="Novo Aviso",u.value="",v.value="",F.textContent="Publicar";let M=h.querySelector('input[name="cw-bc-type"][value="info"]');M&&M.click()}h.classList.add("active"),setTimeout(()=>u.focus(),300)}function j(){h&&h.classList.remove("active"),o=null}async function z(){let d=h.querySelector("#cw-bc-send"),y=h.querySelector("#cw-bc-title"),u=h.querySelector("#cw-bc-text"),v=h.querySelector('input[name="cw-bc-type"]:checked'),F=v?v.value:"info";if(!y.value.trim()||!u.value.trim()){V("Preencha todos os campos!",{error:!0});return}d.textContent="Salvando...",d.style.opacity="0.7";let M=!1;o?M=await xe.updateBroadcast(o,{title:y.value,text:u.value,type:F}):M=await xe.sendBroadcast({title:y.value,text:u.value,type:F,author:window._cwCurrentUser||"admin"}),M?(V(o?"Atualizado!":"Publicado!"),X.playSuccess(),j(),setTimeout(()=>T(),1500)):(V("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),d.textContent=o?"Salvar Altera\xE7\xF5es":"Publicar",d.style.opacity="1")}async function w(d){if(confirm("Confirma a exclus\xE3o deste aviso?"))if(await xe.deleteBroadcast(d)){V("Aviso removido."),X.playClick();let u=Ke.findIndex(v=>v.id===d);u>-1&&Ke.splice(u,1),O(),setTimeout(()=>T(),1500)}else V("Erro ao excluir.",{error:!0})}let A=document.createElement("div");A.className="cw-nice-scroll",Object.assign(A.style,i.feedContainer),l.appendChild(A);async function T(){t&&(E.style.display="block",E.innerHTML="\u{1F504} Sincronizando...");try{let d=await xe.fetchData();d&&d.broadcast&&(Qt(d.broadcast),k(),t&&(O(),E.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{E.style.display="none"},1500)))}catch{t&&(E.innerHTML="\u26A0\uFE0F Offline")}}function k(){let d=document.getElementById("cw-btn-broadcast");if(!d)return;let y=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(Ke.some(v=>!y.includes(v.id))){if(d.classList.add("has-new"),!d.querySelector(".cw-badge")){let v=document.createElement("div");v.className="cw-badge",Object.assign(v.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),d.appendChild(v)}}else{d.classList.remove("has-new");let v=d.querySelector(".cw-badge");v&&v.remove()}}function O(){A.innerHTML="";let d=l.querySelector("#cw-bau-widget");d&&d.remove();let y=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),u=[...Ke].sort((I,R)=>{let G=new Date(I.date).getTime()||0;return(new Date(R.date).getTime()||0)-G}),v=u.findIndex(I=>I.title&&I.title.toLowerCase().includes("disponibilidade bau"));if(v!==-1){let I=u[v];u.splice(v,1);let R=document.createElement("div");R.id="cw-bau-widget",Object.assign(R.style,i.bauContainer);let G=[],Y=(I.text||"").split(`
`),L=/\d{1,2}\/\d{1,2}/,U="\u{1F4C5}";if(Y.forEach(se=>{/🇧🇷|🇵🇹|PT|BR|BRASIL|BRAZIL|PORTUGAL|LISBOA/i.test(se)?U="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM|ESPANHA|SPAIN|MEXICO|MÉXICO/i.test(se)&&(U="\u{1F1EA}\u{1F1F8}");let ve=se.match(L);if(ve){let pe=ve[0],ee=U;/🇧🇷|🇵🇹|PT|BR/i.test(se)?ee="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(se)&&(ee="\u{1F1EA}\u{1F1F8}"),G.some(ce=>ce.flag===ee&&ce.date===pe)||G.push({flag:ee,date:pe})}}),G.length===0){let se=(I.text||"").match(/\d{1,2}\/\d{1,2}/g);se&&[...new Set(se)].forEach(ve=>G.push({flag:"\u{1F4C5}",date:ve}))}let Q="",be='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(be=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${be}
              `),G.length>0?Q=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${G.map(ve=>`
                  <div style="${r(i.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${r(i.bauFlag)}">${ve.flag}</span>
                      <span style="${r(i.bauDate)}">${ve.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${be}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${c(I.text)}</div>
              `:Q=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${c(I.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,R.innerHTML=`
              <div style="${r(i.bauHeader)}; margin-bottom:8px;">
                  <div style="${r(i.liveIndicator)}">
                      <div style="${r(i.pulseDot)}"></div>
                      <span style="${r(i.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${s(I.date)}</div>
              </div>
              ${Q}
          `,E.after(R);let ge=R.querySelector("#cw-bau-toggle-btn"),Te=R.querySelector("#cw-bau-full");if(ge&&Te&&(ge.onclick=()=>{let se=Te.style.display==="none";Te.style.display=se?"block":"none",ge.textContent=se?"Ocultar":"Detalhes"}),window._cwIsAdmin){let se=R.querySelector(".cw-bau-edit");se&&(se.onclick=()=>P(I))}}let F=u.sort((I,R)=>{let G=y.includes(I.id),Y=y.includes(R.id);return G===Y?0:G?1:-1});if(F.length===0&&!v){let I=document.createElement("div");Object.assign(I.style,i.emptyState),I.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,A.appendChild(I)}let M=F.filter(I=>!y.includes(I.id)),$=F.filter(I=>y.includes(I.id));if(M.forEach(I=>A.appendChild(N(I,!1))),$.length>0){let I=document.createElement("div");Object.assign(I.style,i.historyDivider),I.innerHTML=`<span>Hist\xF3rico (${$.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let R=document.createElement("div");Object.assign(R.style,i.historyContainer),$.forEach(Y=>R.appendChild(N(Y,!0)));let G=!1;I.onclick=()=>{X.playClick(),G=!G,R.style.display=G?"flex":"none",I.querySelector("svg").style.transform=G?"rotate(180deg)":"rotate(0deg)"},A.appendChild(I),A.appendChild(R)}}function N(d,y){let u=document.createElement("div");Object.assign(u.style,y?i.cardHistory:i.card);let v=a[d.type]||a.info,F=document.createElement("div");Object.assign(F.style,i.cardHeader);let M=document.createElement("div");Object.assign(M.style,i.typeTag,{color:v.color,background:v.bg}),M.innerHTML=`${v.icon} <span>${d.type}</span>`;let $=document.createElement("span");if(Object.assign($.style,i.dateTag),$.textContent=s(d.date),F.appendChild(M),y)F.appendChild($);else{let L=document.createElement("button");L.className="cw-btn-interactive",Object.assign(L.style,i.dismissBtn),L.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',L.onmouseenter=()=>{L.style.color="#1e8e3e",L.style.background="#e6f4ea",L.style.borderColor="#1e8e3e"},L.onmouseleave=()=>{L.style.color="#5f6368",L.style.background="#fff",L.style.borderColor="rgba(0,0,0,0.1)"},L.onclick=U=>{U.stopPropagation(),X.playClick(),u.style.transform="translateX(20px)",u.style.opacity="0",setTimeout(()=>{let Q=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");Q.push(d.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(Q)),O(),k()},200)},F.appendChild(L)}let I=document.createElement("div");Object.assign(I.style,i.cardContent);let R=document.createElement("div");Object.assign(R.style,i.msgTitle),R.textContent=d.title;let G=document.createElement("div");Object.assign(G.style,i.msgBody),G.innerHTML=c(d.text);let Y=document.createElement("div");if(Object.assign(Y.style,i.msgMeta),Y.innerHTML=`Publicado por <b>${d.author||"Sistema"}</b>`,y||(Y.innerHTML+=` \u2022 ${s(d.date)}`),I.appendChild(R),I.appendChild(G),I.appendChild(Y),u.appendChild(F),u.appendChild(I),window._cwIsAdmin){let L=document.createElement("div");L.className="cw-card-actions";let U=document.createElement("button");U.className="cw-action-btn edit",U.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',U.onclick=()=>P(d);let Q=document.createElement("button");Q.className="cw-action-btn delete",Q.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',Q.onclick=()=>w(d.id),L.appendChild(U),L.appendChild(Q),u.appendChild(L)}return u}let q=xe.getCachedBroadcasts();q.length>0&&(Qt(q),O()),setTimeout(g,500),T(),n||(n=setInterval(T,fn));let B=document.createElement("div");Object.assign(B.style,Ye),B.className="no-drag",l.appendChild(B),Xe(l,B),document.body.appendChild(l);let S=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),D=Ke.some(d=>!S.includes(d.id));return{toggle:m,hasUnread:D}}function Po(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let e=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],t=0,n={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},o=document.createElement("div");Object.assign(o.style,n.overlay);let s=document.createElement("div");Object.assign(s.style,n.card);let i=document.createElement("div");Object.assign(i.style,n.icon);let a=document.createElement("div");Object.assign(a.style,n.title);let r=document.createElement("div");Object.assign(r.style,n.text);let c=document.createElement("div");Object.assign(c.style,n.dotsContainer);let l=document.createElement("div");Object.assign(l.style,n.btnContainer);let p=document.createElement("button");p.textContent="Pular",Object.assign(p.style,n.btn,n.btnSkip),p.onmouseover=()=>p.style.color="#202124",p.onmouseout=()=>p.style.color="#5f6368";let m=document.createElement("button");m.textContent="Pr\xF3ximo",Object.assign(m.style,n.btn,n.btnNext),m.onmouseover=()=>m.style.transform="scale(1.05)",m.onmouseout=()=>m.style.transform="scale(1)",l.appendChild(p),l.appendChild(m),s.appendChild(i),s.appendChild(a),s.appendChild(r),s.appendChild(c),s.appendChild(l),o.appendChild(s),document.body.appendChild(o);function f(h){let g=e[h];i.textContent=g.icon,a.textContent=g.title,r.textContent=g.text,c.innerHTML="",e.forEach((E,C)=>{let P=document.createElement("div");Object.assign(P.style,n.dot),C===h&&Object.assign(P.style,n.dotActive),c.appendChild(P)}),g.isLast?(p.style.display="none",m.textContent="Come\xE7ar \u{1F680}",m.style.width="100%"):(p.style.display="block",m.textContent="Pr\xF3ximo",m.style.width="auto")}function x(){localStorage.setItem("cw_onboarding_seen_v1","true"),o.style.opacity="0",s.style.transform="translateY(20px)",setTimeout(()=>o.remove(),400),X.playSuccess(),V("Tudo pronto! Use o menu flutuante.")}m.onclick=()=>{X.playClick(),t<e.length-1?(t++,f(t)):x()},p.onclick=()=>{confirm("Pular o tutorial?")&&x()},f(0),requestAnimationFrame(()=>{o.style.opacity="1",s.style.transform="translateY(0)"})}var Ho={version:"v5.1",title:"Atualiza\xE7\xE3o: v5.1 - Produtividade Blindada \u{1F6E1}\uFE0F",slides:[{icon:"\u{1F17F}\uFE0F",title:"Estacionamento de Casos",text:"Interrup\xE7\xE3o urgente? Agora voc\xEA pode 'Estacionar' seu atendimento atual (Notas + Tasks) com um clique e retomar depois exatamente de onde parou."},{icon:"\u{1F6DF}",title:"Sistema 'Airbag'",text:"Caiu a internet? Fechou a aba sem querer? O TechSol agora possui Auto-Save de emerg\xEAncia a cada 5 segundos. Seu texto est\xE1 salvo, sempre."},{icon:"\u{1F7E0}",title:"Indicador de Progresso",text:"Nunca mais esque\xE7a uma nota aberta. Um indicador laranja ('Dirty State') avisa na P\xEDlula principal se h\xE1 trabalho n\xE3o salvo/estacionado."},{icon:"\u{1F50D}",title:"Time Zone Pro",text:"O m\xF3dulo de fusos hor\xE1rios ganhou superpoderes: nova barra de pesquisa global, filtros r\xE1pidos por regi\xE3o e corre\xE7\xE3o de visualiza\xE7\xE3o."},{icon:"\u{1F916}",title:"Leitura de BAU Aprimorada",text:"O sistema de Broadcast agora \xE9 mais inteligente ao ler avisos de disponibilidade, detectando datas e bandeiras mesmo quando quebradas em v\xE1rias linhas."},{icon:"\u{1F3A8}",title:"Refinamento Visual",text:"Bot\xF5es padronizados, sombras suavizadas e micro-intera\xE7\xF5es t\xE1teis em todo o sistema para uma experi\xEAncia mais fluida e profissional."}]};function $o(e){let t=localStorage.getItem("cw_last_version");if(!t){localStorage.setItem("cw_last_version",e);return}t!==e&&xn(e)}function xn(e){let t=Ho.slides,n=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"400px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(30px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"12px",background:"#E8F0FE",color:"#1967D2",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",marginBottom:"16px",letterSpacing:"0.5px"},icon:{fontSize:"42px",marginBottom:"16px",display:"block"},title:{fontSize:"20px",fontWeight:"700",color:"#202124",marginBottom:"8px"},text:{fontSize:"14px",color:"#5f6368",lineHeight:"1.5",marginBottom:"32px",minHeight:"42px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"6px",marginBottom:"24px"},dot:{width:"6px",height:"6px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"18px",borderRadius:"4px"},btn:{width:"100%",padding:"12px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"all 0.2s",background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},s=document.createElement("div");Object.assign(s.style,o.overlay);let i=document.createElement("div");Object.assign(i.style,o.card);let a=document.createElement("div");Object.assign(a.style,o.badge),a.textContent=`Atualiza\xE7\xE3o ${e}`;let r=document.createElement("div");Object.assign(r.style,o.icon);let c=document.createElement("div");Object.assign(c.style,o.title);let l=document.createElement("div");Object.assign(l.style,o.text);let p=document.createElement("div");Object.assign(p.style,o.dotsContainer);let m=document.createElement("button");Object.assign(m.style,o.btn),m.onmouseover=()=>m.style.transform="scale(1.02)",m.onmouseout=()=>m.style.transform="scale(1)",i.appendChild(a),i.appendChild(r),i.appendChild(c),i.appendChild(l),i.appendChild(p),i.appendChild(m),s.appendChild(i),document.body.appendChild(s);function f(h){let g=t[h];r.textContent=g.icon,c.textContent=g.title,l.textContent=g.text,p.innerHTML="",t.forEach((E,C)=>{let P=document.createElement("div");Object.assign(P.style,o.dot),C===h&&Object.assign(P.style,o.dotActive),p.appendChild(P)}),h===t.length-1?m.textContent="Entendi, vamos l\xE1! \u{1F44D}":m.textContent="Pr\xF3ximo"}function x(){localStorage.setItem("cw_last_version",e),s.style.opacity="0",i.style.transform="translateY(30px)",setTimeout(()=>s.remove(),400),X.playSuccess(),V(`TechSol atualizado para ${e}!`)}m.onclick=()=>{X.playClick(),n<t.length-1?(n++,f(n)):x()},f(0),requestAnimationFrame(()=>{s.style.opacity="1",i.style.transform="translateY(0)"})}var Vo="cw_timezone_pinned",Zt=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],hn=[{id:"all",label:"Todos"},{id:"sa",label:"Am\xE9rica do Sul"},{id:"na",label:"Norte & Central"},{id:"eu",label:"Europa"}];function Uo(){let e="v2.2 Pro",t=!1,n=null,o="mx",s=JSON.parse(localStorage.getItem(Vo)||"[]"),i="",a="all",r=new Date;r.setHours(14,0,0,0);let c={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},l={container:{display:"flex",flexDirection:"column",height:"100%",background:c.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:c.surface,borderBottom:`1px solid ${c.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:c.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:c.primary,borderBottomColor:c.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:c.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:c.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${c.border}`,background:c.surface,color:c.textSub,transition:"all 0.2s"},chipActive:{background:c.primaryBg,color:c.primary,borderColor:c.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:c.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${c.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:c.surface,border:`1px solid ${c.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:c.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},p=document.createElement("div");p.id="timezone-popup",p.classList.add("cw-module-window"),Object.assign(p.style,ke,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let f=Ie(p,"Time Zone Traveler",e,"Monitoramento global e planejamento de chamadas.",{popup:p},()=>y());p.appendChild(f);let x=document.createElement("div");Object.assign(x.style,l.container),p.appendChild(x);let h=document.createElement("div");Object.assign(h.style,l.tabHeader);let g=document.createElement("div");g.textContent="Monitoramento",Object.assign(g.style,l.tabBtn,l.tabActive);let E=document.createElement("div");E.textContent="Planejador",Object.assign(E.style,l.tabBtn),h.appendChild(g),h.appendChild(E),x.appendChild(h);let C=document.createElement("div");Object.assign(C.style,l.toolbar);let P=document.createElement("div");Object.assign(P.style,l.searchInputWrapper);let j=document.createElement("div");j.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(j.style,l.searchIcon);let z=document.createElement("input");z.placeholder="Buscar cidade ou pa\xEDs...",Object.assign(z.style,l.searchInput),z.onfocus=()=>{z.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",z.style.borderColor="rgba(26,115,232,0.3)"},z.onblur=()=>{z.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",z.style.borderColor="transparent"},z.oninput=u=>{i=u.target.value.toLowerCase(),B()},P.appendChild(j),P.appendChild(z),C.appendChild(P);let w=document.createElement("div");Object.assign(w.style,l.chipsRow),hn.forEach(u=>{let v=document.createElement("div");v.textContent=u.label,v.id=`tz-filter-${u.id}`,Object.assign(v.style,l.chip),u.id===a&&Object.assign(v.style,l.chipActive),v.onclick=()=>{X.playClick(),a=u.id,Array.from(w.children).forEach(F=>{Object.assign(F.style,l.chip)}),Object.assign(v.style,l.chipActive),B()},w.appendChild(v)}),C.appendChild(w),x.appendChild(C);let A=document.createElement("div");Object.assign(A.style,l.listContainer);let T=document.createElement("style");T.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",x.appendChild(T);let k=document.createElement("div");Object.assign(k.style,l.plannerWrapper,{display:"none"}),x.appendChild(A),x.appendChild(k),g.onclick=()=>O("live"),E.onclick=()=>O("plan");function O(u){X.playClick(),u==="live"?(Object.assign(g.style,l.tabActive),Object.assign(E.style,l.tabBtn),E.style.borderBottomColor="transparent",A.style.display="flex",C.style.display="flex",k.style.display="none",D()):(Object.assign(E.style,l.tabActive),Object.assign(g.style,l.tabBtn),g.style.borderBottomColor="transparent",k.style.display="flex",A.style.display="none",C.style.display="none",d(),S())}function N(u){return u>=9&&u<17?{color:c.success,bg:c.successBg,label:"Aberto",icon:"\u{1F7E2}"}:u>=8&&u<9?{color:c.warning,bg:c.warningBg,label:"Abrindo",icon:"\u{1F7E1}"}:u>=17&&u<19?{color:c.warning,bg:c.warningBg,label:"Fechando",icon:"\u{1F7E1}"}:{color:c.textSub,bg:"#F1F3F4",label:"Fechado",icon:"\u{1F534}"}}function q(u){s.includes(u)?s=s.filter(v=>v!==u):s.push(u),localStorage.setItem(Vo,JSON.stringify(s)),B(),X.playClick()}function B(){A.innerHTML="";let u=new Date,v=Zt.filter(M=>{let $=M.name.toLowerCase().includes(i)||M.label.toLowerCase().includes(i),I=a==="all"||M.region===a;return $&&I});if(v.sort((M,$)=>{let I=s.includes(M.id),R=s.includes($.id);return I&&!R?-1:!I&&R?1:M.name.localeCompare($.name)}),v.length===0){A.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">Nenhum local encontrado</div>
                </div>
            `;return}v.forEach(M=>{let $=s.includes(M.id),I=u.toLocaleTimeString("pt-BR",{timeZone:M.zone,hour:"2-digit",minute:"2-digit"}),R=parseInt(I.split(":")[0]),G=N(R),Y=R<6||R>18,L=document.createElement("div");Object.assign(L.style,l.hubCard),$&&Object.assign(L.style,l.hubCardPinned);let U=$?"\u2605":"\u2606",Q=$?"#F9AB00":"#DADCE0";L.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn" style="cursor:pointer; font-size:22px; color:${Q}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;">${U}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${M.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${c.text}; letter-spacing:-0.2px;">${M.name}</div>
                        <div style="font-size:12px; color:${c.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${Y?"\u{1F319}":"\u2600\uFE0F"} ${M.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${c.text}; font-family:'Google Sans', sans-serif;">${I}</div>
                    <div style="font-size:11px; font-weight:600; color:${G.color}; background:${G.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${G.label}
                    </div>
                </div>
            `,L.onmouseenter=()=>{L.style.transform="translateY(-2px)",L.style.boxShadow="0 6px 12px rgba(60,64,67,0.1)"},L.onmouseleave=()=>{L.style.transform="translateY(0)",L.style.boxShadow="0 2px 6px rgba(60,64,67,0.05)"};let be=L.querySelector(".cw-pin-btn");be.onmouseenter=()=>{be.style.backgroundColor="#F1F3F4"},be.onmouseleave=()=>{be.style.backgroundColor="transparent"},be.onclick=ge=>{ge.stopPropagation(),q(M.id)},L.onclick=()=>{o=M.id,O("plan")},A.appendChild(L)});let F=document.createElement("div");F.style.height="20px",F.style.width="100%",A.appendChild(F)}function S(){k.innerHTML="";let u=document.createElement("div"),v=document.createElement("label");v.textContent="Onde est\xE1 o cliente?",v.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let F=document.createElement("select");Object.assign(F.style,Et),F.style.padding="14px",[...Zt].sort((de,ce)=>de.name.localeCompare(ce.name)).forEach(de=>{let ce=document.createElement("option");ce.value=de.id,ce.textContent=`${de.flag} ${de.name} (${de.zone})`,de.id===o&&(ce.selected=!0),F.appendChild(ce)}),F.onchange=de=>{o=de.target.value,ee(),X.playClick()},u.appendChild(v),u.appendChild(F),k.appendChild(u);let $=document.createElement("div");Object.assign($.style,l.timeComparisonRow);let I=document.createElement("div");Object.assign(I.style,l.timeCard),I.style.backgroundColor="#F8FAFF",I.style.borderColor="#E8F0FE",I.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} Voc\xEA</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">Bras\xEDlia (GMT-3)</div>
        `;let R=document.createElement("div");Object.assign(R.style,l.timeCard),R.style.backgroundColor="#FFF8E1",R.style.borderColor="#FEF7E0",R.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">Cliente</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,$.appendChild(I),$.appendChild(R),k.appendChild($);let G=document.createElement("div");G.id="cw-planner-status",Object.assign(G.style,l.statusBadge),k.appendChild(G);let Y=document.createElement("div");Object.assign(Y.style,{padding:"0 4px",marginTop:"12px"});let L=document.createElement("div");L.textContent="Arraste para simular o hor\xE1rio:",L.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let U=document.createElement("div");Object.assign(U.style,l.timelineContainer);let Q=document.createElement("div");Object.assign(Q.style,l.timelineTrack);let be=document.createElement("div");Object.assign(be.style,l.dayZone),Q.appendChild(be);let ge=document.createElement("input");ge.type="range",ge.min="0",ge.max="1439",ge.step="15",ge.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let Te=document.createElement("div");Te.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",Te.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",U.appendChild(Q),U.appendChild(ge),U.appendChild(Te),Y.appendChild(L),Y.appendChild(U),k.appendChild(Y);let se=I.querySelector("#cw-time-input-br"),ve=R.querySelector("#cw-time-display-client"),pe=R.querySelector("#cw-client-label");function ee(){let de=Zt.find(Re=>Re.id===o);pe.textContent=`${de.flag} ${de.label} (${de.zone})`;let ce=r.getHours(),De=r.getMinutes(),Me=`${String(ce).padStart(2,"0")}:${String(De).padStart(2,"0")}`;se.value=Me,ge.value=ce*60+De;let Ce=r.toLocaleTimeString("pt-BR",{timeZone:de.zone,hour:"2-digit",minute:"2-digit"});ve.textContent=Ce;let ze=parseInt(Ce.split(":")[0]);ze>=9&&ze<17?(G.style.background=c.successBg,G.style.color=c.success,G.innerHTML='<span style="font-size:16px">\u2705</span> Hor\xE1rio Comercial Ideal'):ze>=8&&ze<9||ze>=17&&ze<19?(G.style.background=c.warningBg,G.style.color=c.warning,G.innerHTML='<span style="font-size:16px">\u26A0\uFE0F</span> Hor\xE1rio Limite (Aten\xE7\xE3o)'):(G.style.background=c.errorBg,G.style.color=c.error,G.innerHTML='<span style="font-size:16px">\u26D4</span> Fora de Hor\xE1rio')}ge.oninput=de=>{let ce=parseInt(de.target.value);r.setHours(Math.floor(ce/60)),r.setMinutes(ce%60),ee()},se.oninput=de=>{let[ce,De]=de.target.value.split(":");ce&&De&&(r.setHours(parseInt(ce)),r.setMinutes(parseInt(De)),ee())},ee()}function D(){B(),n||(n=setInterval(B,6e4))}function d(){n&&(clearInterval(n),n=null)}function y(){t=!t,qe(t,p,"cw-btn-timezone"),t?O("live"):d()}return document.body.appendChild(p),y}var Wo="cw_personal_library_v1",_e={getSnippets:(e="all")=>{let t=_e._loadFromLocal(),n=We();return n&&n.includes("@")&&_e._syncWithServer(n),e==="all"?t:t.filter(o=>o.type===e)},save:async e=>{let t=We();if(!t)return V("Erro: Usu\xE1rio n\xE3o identificado.",{error:!0}),!1;let n=_e._loadFromLocal(),o=new Date().toISOString(),s={id:e.id||"local_"+Date.now(),type:e.type||"general",title:e.title||"Sem t\xEDtulo",content:e.content||"",updated:o},i=n.filter(a=>a.id!==s.id);return i.unshift(s),_e._saveToLocal(i),xe.saveSnippet(s,t).then(a=>{a?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais.")}),s},delete:async e=>{let t=We(),o=_e._loadFromLocal().filter(s=>s.id!==e);return _e._saveToLocal(o),t&&xe.deleteSnippet(e,t),!0},_syncWithServer:async e=>{console.log("\u{1F504} Sincronizando biblioteca...");let t=await xe.getUserSnippets(e);if(t&&t.status==="success"&&Array.isArray(t.snippets)){let n=t.snippets,o=_e._loadFromLocal(),s=JSON.stringify(n),i=JSON.stringify(o);s!==i&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),_e._saveToLocal(n))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem(Wo)||"[]")}catch{return[]}},_saveToLocal:e=>{localStorage.setItem(Wo,JSON.stringify(e))}};function Yo(){let e="v1.0",t=!1,n="general",o=null,s=null,i={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",danger:"#D93025"},a={container:{display:"flex",flexDirection:"column",height:"100%",background:i.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",padding:"12px 16px 0 16px",background:i.surface,borderBottom:`1px solid ${i.border}`},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:i.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s",userSelect:"none"},tabActive:{color:i.primary,borderBottomColor:i.primary,fontWeight:"600"},listContainer:{flex:1,overflowY:"auto",padding:"16px",display:"flex",flexDirection:"column",gap:"12px"},emptyState:{padding:"40px 20px",textAlign:"center",color:"#BDC1C6",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},card:{background:i.surface,borderRadius:"12px",padding:"16px",border:`1px solid ${i.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",cursor:"default",position:"relative",overflow:"hidden"},cardHeader:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},cardTitle:{fontSize:"14px",fontWeight:"600",color:i.text},cardPreview:{fontSize:"12px",color:i.textSub,lineHeight:"1.5",display:"-webkit-box",webkitLineClamp:"3",webkitBoxOrient:"vertical",overflow:"hidden"},cardActions:{display:"flex",justifyContent:"flex-end",gap:"8px",marginTop:"12px",paddingTop:"12px",borderTop:`1px dashed ${i.border}`},actionBtn:{padding:"6px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"600",cursor:"pointer",border:"none",background:"transparent",transition:"background 0.2s"},fab:{position:"absolute",bottom:"24px",right:"24px",width:"56px",height:"56px",borderRadius:"16px",background:i.primary,color:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.4)",cursor:"pointer",transition:"transform 0.2s",zIndex:10},editorOverlay:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:i.bg,zIndex:20,transform:"translateY(100%)",transition:"transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)",display:"flex",flexDirection:"column"},editorHeader:{padding:"16px 24px",background:i.surface,borderBottom:`1px solid ${i.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"},editorBody:{flex:1,padding:"24px",overflowY:"auto"},inputGroup:{marginBottom:"20px"},label:{display:"block",fontSize:"12px",fontWeight:"700",color:i.textSub,marginBottom:"8px",textTransform:"uppercase"},input:{width:"100%",padding:"12px",borderRadius:"8px",border:`1px solid ${i.border}`,fontSize:"14px",fontFamily:"inherit",outline:"none",background:i.surface,boxSizing:"border-box"}},r=document.createElement("div");r.id="library-popup",r.classList.add("cw-module-window"),Object.assign(r.style,ke,{right:"auto",left:"50%",width:"400px",height:"600px",transform:"translateX(-50%) scale(0.05)",overflow:"hidden"});let l=Ie(r,"Minha Biblioteca",e,"Gerencie seus snippets, textos e templates.",{popup:r},()=>B());r.appendChild(l);let p=document.createElement("div");Object.assign(p.style,a.container),r.appendChild(p);let m=document.createElement("div");Object.assign(m.style,a.tabHeader);let f=[{id:"general",label:"Geral",icon:"\u{1F4CB}"},{id:"note",label:"Notas",icon:"\u{1F4DD}"},{id:"email",label:"Emails",icon:"\u{1F4E7}"}];f.forEach(S=>{let D=document.createElement("div");D.innerHTML=`${S.icon} ${S.label}`,D.id=`lib-tab-${S.id}`,Object.assign(D.style,a.tabBtn),S.id===n&&Object.assign(D.style,a.tabActive),D.onclick=()=>w(S.id),m.appendChild(D)}),p.appendChild(m);let x=document.createElement("div");Object.assign(x.style,a.listContainer),p.appendChild(x);let h=document.createElement("div");Object.assign(h.style,a.fab),h.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',h.onmouseenter=()=>h.style.transform="scale(1.1)",h.onmouseleave=()=>h.style.transform="scale(1)",h.onclick=()=>T(),p.appendChild(h),o=document.createElement("div"),Object.assign(o.style,a.editorOverlay);let g=document.createElement("div");Object.assign(g.style,a.editorHeader),g.innerHTML='<span style="font-weight:700; font-size:16px;">Novo Item</span>';let E=document.createElement("button");E.innerHTML="Cancelar",E.style.cssText="background:none; border:none; color:#5f6368; font-weight:600; cursor:pointer;",E.onclick=k,g.appendChild(E),o.appendChild(g);let C=document.createElement("div");Object.assign(C.style,a.editorBody),o.appendChild(C);let P=document.createElement("div");P.style.cssText="padding:16px 24px; border-top:1px solid #DADCE0; background:#FFF; display:flex; justify-content:flex-end;";let j=document.createElement("button");j.textContent="Salvar",j.style.cssText="padding:10px 24px; background:#1a73e8; color:white; border:none; border-radius:20px; font-weight:600; cursor:pointer; box-shadow:0 2px 5px rgba(26,115,232,0.3);",j.onclick=O,P.appendChild(j),o.appendChild(P),p.appendChild(o);let z=document.createElement("div");Object.assign(z.style,Ye),z.className="no-drag",r.appendChild(z),Xe(r,z),document.body.appendChild(r);function w(S){X.playClick(),n=S,f.forEach(D=>{let d=document.getElementById(`lib-tab-${D.id}`);D.id===S?Object.assign(d.style,a.tabActive):Object.assign(d.style,a.tabBtn)}),A()}function A(){x.innerHTML="";let S=_e.getSnippets(n);if(S.length===0){x.innerHTML=`
                <div style="${q(a.emptyState)}">
                    <div style="font-size:32px; opacity:0.5;">\u{1F4ED}</div>
                    <div style="font-weight:500;">Nada aqui ainda.</div>
                    <div style="font-size:12px;">Clique no + para criar.</div>
                </div>
            `;return}S.forEach(D=>{let d=document.createElement("div");Object.assign(d.style,a.card),d.innerHTML=`
                <div style="${q(a.cardHeader)}">
                    <div style="${q(a.cardTitle)}">${D.title}</div>
                    ${n==="email"?'<span style="font-size:10px; background:#E8F0FE; color:#1967D2; padding:2px 6px; border-radius:4px;">TEMPLATE</span>':""}
                </div>
                <div style="${q(a.cardPreview)}">${D.content}</div>
                <div style="${q(a.cardActions)}">
                    <button class="cw-act-copy" style="${q(a.actionBtn)}; color:#1967D2;">Copiar</button>
                    <button class="cw-act-edit" style="${q(a.actionBtn)}; color:#5F6368;">Editar</button>
                    <button class="cw-act-del" style="${q(a.actionBtn)}; color:#D93025;">Excluir</button>
                </div>
            `,d.onmouseenter=()=>{d.style.transform="translateY(-2px)",d.style.boxShadow="0 4px 12px rgba(0,0,0,0.08)"},d.onmouseleave=()=>{d.style.transform="translateY(0)",d.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)"},d.querySelector(".cw-act-copy").onclick=y=>{y.stopPropagation(),X.playClick(),navigator.clipboard.writeText(D.content),V("Copiado!")},d.querySelector(".cw-act-edit").onclick=y=>{y.stopPropagation(),T(D)},d.querySelector(".cw-act-del").onclick=y=>{y.stopPropagation(),confirm("Excluir este item?")&&(_e.delete(D.id),A(),V("Item exclu\xEDdo."))},x.appendChild(d)})}function T(S=null){s=S?S.id:null,C.innerHTML="",C.appendChild(N("title","T\xEDtulo / Nome",S?S.title:"")),n==="email"&&C.appendChild(N("subject","Assunto do Email",S?S.subject:""));let D="Conte\xFAdo";n==="email"&&(D="Corpo do Email (HTML)"),n==="note"&&(D="Texto da Nota (Reason)"),C.appendChild(N("content",D,S?S.content:"",!0)),g.querySelector("span").textContent=S?"Editar Item":"Novo Item",o.style.transform="translateY(0)",setTimeout(()=>{let d=C.querySelector("input");d&&d.focus()},300)}function k(){o.style.transform="translateY(100%)",setTimeout(()=>s=null,300)}async function O(){let S=C.querySelector("#cw-inp-title").value.trim(),D=C.querySelector("#cw-inp-content").value.trim();if(!S||!D){V("Preencha t\xEDtulo e conte\xFAdo.",{error:!0});return}let d={id:s,type:n,title:S,content:D};if(n==="email"){let y=C.querySelector("#cw-inp-subject").value.trim();if(!y){V("Assunto \xE9 obrigat\xF3rio para emails.",{error:!0});return}d.subject=y}j.textContent="Salvando...",await _e.save(d),j.textContent="Salvar",k(),A(),V("Salvo com sucesso!"),X.playSuccess()}function N(S,D,d,y=!1){let u=document.createElement("div");Object.assign(u.style,a.inputGroup);let v=document.createElement("label");v.textContent=D,Object.assign(v.style,a.label);let F;return y?(F=document.createElement("textarea"),Object.assign(F.style,a.input,{minHeight:"120px",resize:"vertical",lineHeight:"1.5"})):(F=document.createElement("input"),F.type="text",Object.assign(F.style,a.input)),F.id=`cw-inp-${S}`,F.value=d||"",F.onfocus=()=>{F.style.borderColor=i.primary,F.style.boxShadow=`0 0 0 2px ${i.primaryBg}`},F.onblur=()=>{F.style.borderColor=i.border,F.style.boxShadow="none"},u.appendChild(v),u.appendChild(F),u}function q(S){return Object.entries(S).map(([D,d])=>`${D.replace(/[A-Z]/g,y=>"-"+y.toLowerCase())}:${d}`).join(";")}function B(){t=!t,qe(t,r,"cw-btn-library"),t&&A()}return B}function yn(){if(window.techSolInitialized){$t();return}window.techSolInitialized=!0;let e="v5.2";console.log(`\u{1F680} TechSol Suite Initializing (${e})...`);try{bo();try{X.initGlobalListeners(),X.playStartup()}catch(c){console.warn("\xC1udio bloqueado:",c)}xe.fetchTips(),$t();let t=_o(),n=Ro(),o=zo(),s=Go(),i=Uo(),a=Yo(),r=jo();ko({toggleNotes:t,toggleEmail:n,toggleScript:o,toggleLinks:s,toggleTimezone:i,toggleLibrary:a,broadcastControl:r}),setTimeout(()=>{xe.logEvent("App","Start","Session Start"),Po(),setTimeout(()=>{$o(e)},500)},2500)}catch(t){console.error("Erro fatal na inicializa\xE7\xE3o:",t),V("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}yn();})();
