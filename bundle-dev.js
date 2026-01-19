(()=>{var ut="",mt="",Kt=e=>new Promise(t=>setTimeout(t,e));async function Qt(){if(ut&&mt)return ut;try{let e=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!e)return"Agente";e.click(),await Kt(150);let t="Consultor",o=document.querySelector("profile-details .name");if(o)t=o.textContent.trim().split(" ")[0],t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();else{let s=document.querySelector("profile-details img");if(s&&s.src.includes("/photos/")){let i=s.src.match(/\/photos\/([^\?]+)/)[1];t=i.charAt(0).toUpperCase()+i.slice(1)}}let n=document.querySelector("profile-details .email");return n&&(mt=n.textContent.trim(),console.log("TechSol: Identidade confirmada ->",mt)),e.click(),document.body.click(),ut=t,t}catch(e){return console.warn("Sherlock falhou:",e),"Consultor"}}function qt(){return ut||"Consultor"}function Zt(){return mt||null}function Jt(e){let t=new Date,o=t.getHours(),n=t.getDay(),s="Ol\xE1",i="";o>=5&&o<12?(s="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):o>=12&&o<18?(s="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(s="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let a=[];o>=0&&o<5?a=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:o<12?n===1?a=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:n===5?a=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:a=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:o<18?a=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:a=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(n===0||n===6)&&(a=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let r=a[Math.floor(Math.random()*a.length)];return{prefix:`${s},`,name:e,suffix:r,icon:i,isFriday:n===5}}async function Lo(){try{let t=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!t)return null;let o=t.parentElement,n=o.querySelector(".unmask-button")||o.querySelector('[aria-label="Click to view"]');n&&(n.click(),await Kt(500));let i=Array.from(o.querySelectorAll("a, span, div, pii-value")).find(a=>{let r=a.innerText.trim();return r.includes("@")&&!r.includes("Is this:")&&r.toLowerCase()!=="email"});return i?i.innerText.trim():null}catch(e){return console.warn("Erro ao capturar email do cliente:",e),null}}function Ro(){try{let e=document.querySelector('material-input[debug-id="account-id-input"]');if(e){let t=e.querySelector("input");if(t){let o=t.value.trim();if(o)return o.includes("@")?o:`${o}@google.com`}}}catch(e){console.warn("Erro ao capturar email interno:",e)}return null}async function at(){let e="Cliente",t="[INSERIR URL]";try{let i=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(i&&i.nextElementSibling){let a=i.nextElementSibling.innerText.trim();a&&(e=a)}}catch(s){console.warn("Falha Nome:",s)}try{let i=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(i&&i.nextElementSibling){let a=i.nextElementSibling.innerText.trim();a&&(t=a)}}catch(s){console.warn("Falha URL:",s)}let o=await Lo(),n=Ro();return{advertiserName:e,websiteUrl:t,clientEmail:o,internalEmail:n,agentName:qt()}}var Ue=null,Mt=null,_e=.3;function $e(){if(!Ue){let e=window.AudioContext||window.webkitAudioContext;e&&(Ue=new e)}return Ue&&Ue.state==="suspended"&&Ue.resume(),Ue}function eo(e){if(Mt)return Mt;let t=e.sampleRate*2,o=e.createBuffer(1,t,e.sampleRate),n=o.getChannelData(0);for(let s=0;s<t;s++)n[s]=Math.random()*2-1;return Mt=o,o}var se={playClick:()=>{let e=$e();if(!e)return;let t=e.currentTime,o=e.createBufferSource();o.buffer=eo(e);let n=e.createBiquadFilter();n.type="highpass",n.frequency.value=4e3;let s=e.createGain();s.gain.setValueAtTime(_e*.8,t),s.gain.exponentialRampToValueAtTime(.001,t+.015),o.connect(n),n.connect(s),s.connect(e.destination),o.start(t),o.stop(t+.02)},playHover:()=>{let e=$e();if(!e)return;let t=e.currentTime,o=e.createOscillator();o.type="sine",o.frequency.setValueAtTime(400,t);let n=e.createGain();n.gain.setValueAtTime(0,t),n.gain.linearRampToValueAtTime(_e*.1,t+.005),n.gain.linearRampToValueAtTime(0,t+.02),o.connect(n),n.connect(e.destination),o.start(t),o.stop(t+.03)},playSuccess:()=>{let e=$e();if(!e)return;let t=e.currentTime;[1046.5,1567.9].forEach((n,s)=>{let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.value=n,a.gain.setValueAtTime(0,t),a.gain.linearRampToValueAtTime(_e*.6,t+.05),a.gain.exponentialRampToValueAtTime(.001,t+.6),i.connect(a),a.connect(e.destination),i.start(t),i.stop(t+.7)})},playGenieOpen:()=>{let e=$e();if(!e)return;let t=e.currentTime,o=e.createBufferSource();o.buffer=eo(e);let n=e.createBiquadFilter();n.type="lowpass",n.frequency.setValueAtTime(100,t),n.frequency.exponentialRampToValueAtTime(800,t+.2);let s=e.createGain();s.gain.setValueAtTime(0,t),s.gain.linearRampToValueAtTime(_e*.5,t+.05),s.gain.linearRampToValueAtTime(0,t+.25),o.connect(n),n.connect(s),s.connect(e.destination),o.start(t),o.stop(t+.3)},playError:()=>{let e=$e();if(!e)return;let t=e.currentTime,o=e.createOscillator(),n=e.createGain();o.type="triangle",o.frequency.setValueAtTime(120,t),o.frequency.exponentialRampToValueAtTime(80,t+.1),n.gain.setValueAtTime(_e,t),n.gain.exponentialRampToValueAtTime(.001,t+.15),o.connect(n),n.connect(e.destination),o.start(t),o.stop(t+.2)},playStartup:()=>{let e=$e();if(!e)return;let t=e.currentTime,o=.12,n=e.createOscillator(),s=e.createGain(),i=e.createBiquadFilter();n.type="square",n.frequency.setValueAtTime(400,t),n.frequency.exponentialRampToValueAtTime(50,t+.1),i.type="lowpass",i.frequency.setValueAtTime(800,t),i.frequency.exponentialRampToValueAtTime(100,t+.1),s.gain.setValueAtTime(_e*4,t),s.gain.exponentialRampToValueAtTime(.001,t+.1),n.connect(i),i.connect(s),s.connect(e.destination),n.start(t),n.stop(t+.12);let a=e.createOscillator(),r=e.createGain();a.type="sine",a.frequency.setValueAtTime(150,t),a.frequency.exponentialRampToValueAtTime(50,t+.15),r.gain.setValueAtTime(_e*1.5,t),r.gain.exponentialRampToValueAtTime(.001,t+.15),a.connect(r),r.connect(e.destination),a.start(t),a.stop(t+.15),[55,55.4,110.5].forEach(d=>{let f=e.createOscillator(),b=e.createGain(),h=e.createBiquadFilter();f.type="sawtooth",f.frequency.value=d,h.type="lowpass",h.frequency.setValueAtTime(30,t),h.frequency.linearRampToValueAtTime(900,t+o+.2),h.frequency.exponentialRampToValueAtTime(40,t+3),b.gain.setValueAtTime(0,t),b.gain.linearRampToValueAtTime(_e*.6,t+o+.1),b.gain.exponentialRampToValueAtTime(.001,t+3.5),f.connect(h),h.connect(b),b.connect(e.destination),f.start(t),f.stop(t+3.6)})},playNotification:()=>{let e=$e();if(!e)return;let t=e.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(n=>{let s=e.createOscillator(),i=e.createGain();s.type="sine",s.frequency.setValueAtTime(n.freq,t),i.gain.setValueAtTime(0,t),i.gain.linearRampToValueAtTime(_e*n.vol,t+.004),i.gain.exponentialRampToValueAtTime(.001,t+n.dur),s.connect(i),i.connect(e.destination),s.start(t),s.stop(t+n.dur+.1)})},playSwoosh:()=>{se.playGenieOpen()},playReset:()=>{se.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let e=0,t=50;document.addEventListener("mouseover",o=>{if(!Ue)return;let n=o.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!n||n.contains(o.relatedTarget))return;let s=Date.now();s-e<t||(se.playHover(),e=s)},{passive:!0})}};var to=1e4;function no(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
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
    `,document.head.appendChild(t)}function K(e,t={}){let o=document.createElement("div"),n=t.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(o.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:n,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),o.textContent=e,document.body.appendChild(o),t.error?se.playError():se.playSuccess(),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>o.remove(),400)},t.duration||4e3)}function ao(e,t=null){let o=0,n=0,s=0,i=0,a=t||e;a.style.cursor="grab",a.onmousedown=r;function r(f){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(f.target.tagName)||f.target.closest(".no-drag"))return;f=f||window.event,a.style.cursor="grabbing",e.style.transition="none";let b=e.getBoundingClientRect();e.style.transform="none",e.style.left=b.left+"px",e.style.top=b.top+"px",e.style.margin="0",e.style.bottom="auto",e.style.right="auto",to++,e.style.zIndex=to,s=f.clientX,i=f.clientY,e.setAttribute("data-dragging","true"),document.onmouseup=d,document.onmousemove=g}function g(f){f=f||window.event,f.preventDefault(),o=s-f.clientX,n=i-f.clientY,s=f.clientX,i=f.clientY;let b=e.offsetTop-n,h=e.offsetLeft-o,p=16,u=window.innerWidth,E=window.innerHeight,T=e.offsetWidth,R=e.offsetHeight;h<p?h=p:h+T>u-p&&(h=u-T-p),b<p?b=p:b+R>E-p&&(b=E-R-p),e.style.top=b+"px",e.style.left=h+"px"}function d(){document.onmouseup=null,document.onmousemove=null,a.style.cursor="grab",setTimeout(()=>{e.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",e.setAttribute("data-dragging","false"),e.setAttribute("data-moved","true")},50)}}var Te={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var _t={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},io={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var so={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var ye={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var Nt=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],oo=-1;function it(){let e=Math.floor(Math.random()*Nt.length);return e===oo&&(e=(e+1)%Nt.length),oo=e,Nt[e]}var Le=e=>new Promise(t=>setTimeout(t,e));async function Fo(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let o=e.querySelector(".cursor");await Le(200);for(let n=0;n<t.length;n++){let s=t.charAt(n),i=document.createElement("span");i.textContent=s,o&&o.parentNode===e?o.before(i):e.appendChild(i);let a=Math.floor(Math.random()*60)+30;n===0&&(a=150),n>t.length-3&&(a=30),await Le(a)}await Le(600),o&&(o.style.display="none")}async function Lt(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
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
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await Le(200);let t=await Qt(),o=Jt(t),n=e.querySelector("#w-icon"),s=e.querySelector("#p1"),i=e.querySelector("#p2"),a=e.querySelector("#p3"),r=e.querySelector("#p-sextou");n&&(n.innerHTML=o.icon),s&&(s.textContent=o.prefix),a&&(a.textContent=o.suffix),await Le(300);let g=n?n.querySelector("svg"):null;if(g&&(g.style.opacity="1",g.style.transform="scale(1)"),await Le(400),s&&(s.style.opacity="1"),se.playStartup(),i&&await Fo(i,o.name),a&&(a.style.opacity="1",a.style.transform="translateY(0)"),o.isFriday&&r){await Le(400),r.style.display="block",r.offsetWidth;let d=r.querySelector(".sextou-badge");d&&(d.style.opacity="1",d.style.transform="scale(1)")}await Le(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await Le(900),e.parentNode&&e.parentNode.removeChild(e)}}var Qe={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Ze(e,t){t.onmousedown=o;function o(n){n.stopPropagation(),n.preventDefault();let s=e.style.transition;e.style.transition="none";let i=n.clientX,a=n.clientY,r=parseFloat(getComputedStyle(e,null).getPropertyValue("width").replace("px","")),g=parseFloat(getComputedStyle(e,null).getPropertyValue("height").replace("px","")),d=i,f=a,b=!1;function h(E){d=E.clientX,f=E.clientY,b||(window.requestAnimationFrame(()=>{p(),b=!1}),b=!0)}function p(){let E=r+(d-i),T=g+(f-a);E>360&&(e.style.width=E+"px"),T>300&&(e.style.height=T+"px")}function u(){document.removeEventListener("mousemove",h),document.removeEventListener("mouseup",u),setTimeout(()=>{e.style.transition=s},50)}document.addEventListener("mousemove",h),document.addEventListener("mouseup",u)}t.onmouseenter=()=>t.style.opacity="1",t.onmouseleave=()=>t.style.opacity="0.6"}function ro(e){if(!e)return"";let t={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return e.replace(/:([a-zA-Z0-9-_+]+):/g,o=>t[o]?t[o]:"")}var Je=e=>new Promise(t=>setTimeout(t,e));function st(e){e&&["mousedown","mouseup","click"].forEach(t=>e.dispatchEvent(new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window})))}var lo="cw-automation-styles";if(!document.getElementById(lo)){let e=document.createElement("style");e.id=lo,e.innerHTML=`
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
    `,document.head.appendChild(e)}function co(e){let t=document.getElementById("cw-loading-overlay");e?t?t.style.opacity="1":(t=document.createElement("div"),t.id="cw-loading-overlay",document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1")):t&&(t.style.opacity="0",setTimeout(()=>t.remove(),300))}async function po(e){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let t=document.getElementById(e),o="";co(!0),t&&(o=t.placeholder,t.placeholder="Buscando ID...",t.value="",t.classList.add("cw-scanning-active"));try{let n=document.querySelector('material-button[debug-id="dock-item-case-log"]');n&&!n.classList.contains("selected")&&(st(n),await Je(1200));let s=document.querySelector("search-filter dropdown-button .button");if(s&&!(s.innerText||"").includes("All")){st(s),await Je(600);let h=document.querySelector('material-checkbox[debug-id="check-all-box"]');h&&h.getAttribute("aria-checked")!=="true"&&(st(h),await Je(300));let p=document.querySelector('material-button[debug-id="apply-filter"]');p&&(st(p),await Je(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await Je(500));let a=Array.from(document.querySelectorAll(".message-header"));for(let b=a.length-1;b>=0;b--){let h=a[b],p=h.querySelector("i.material-icons-extended"),u=p&&p.innerText.trim()==="phone_in_talk",E=h.innerText||"",T=E.includes("Agent joined")||E.includes("outbound-call")||E.includes("Speakeasy");if(u||T){h.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",h),t&&(t.placeholder="Lendo mensagem..."),st(h),await Je(1e3));break}}let g=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),d=/Speakeasy.*?(P\d{15,25})/i,f=null;for(let b=g.length-1;b>=0;b--){let h=g[b];if(h.offsetParent===null)continue;let p=(h.innerText||"").match(d);if(p&&p[1]){f=p[1];break}}if(t)if(f){try{await navigator.clipboard.writeText(f)}catch{}t.value=f,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),se.playSuccess(),K(`ID Localizado: ${f}`),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}else se.playError(),K("Nenhum ID encontrado.",{error:!0}),t.placeholder="N\xE3o encontrado",t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}catch(n){console.error("Erro na automa\xE7\xE3o:",n),K("Erro ao processar.",{error:!0})}finally{t&&(t.classList.remove("cw-scanning-active"),t.value||(t.placeholder=o)),co(!1)}}var Re={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:"}},Ge={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},rt={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>Substatus:</b> DC - Other<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br>Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},We={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},lt=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],Rt=["CONSIDERACOES","COMENTARIOS"],ke={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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

Irei abrir caso em BAU para o dia solicitado e pedir descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo.`}};var be=e=>new Promise(t=>setTimeout(t,e));function ve(e,t="info"){let o={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${e}`,o[t]||o.info)}function Oe(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>e.dispatchEvent(new MouseEvent(o,t)))}function gt(e,t){if(!e)return;let o=`cw-warning-${e.id||Math.random().toString(36).substr(2,9)}`,n=document.getElementById(o);n&&n.remove();let s=e.getBoundingClientRect(),i=document.createElement("div");i.id=o,i.style.cssText=`
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
    `;let a=i.querySelector(".cw-close-btn");a.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&a.click()},25e3)}async function bt(e,t){if(!e||!t)return;e.focus(),e.value="",e.dispatchEvent(new Event("input",{bubbles:!0})),await be(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),await be(100),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function Ft(){let t=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(o=>{let n=o.offsetParent!==null,s=o.closest("case-message-view")!==null,i=o.closest(".editor")!==null||o.closest("write-card")!==null;return n&&!s&&i});return t&&ve("Editor visualmente detectado.","success"),t}async function uo(){ve("\u{1F680} FASE 1: Tentando abrir a janela de email...");let e=!1,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(b=>b.innerText.trim()==="email");if(o&&o.offsetParent!==null){ve("Bot\xE3o de email direto encontrado.");let b=o.closest("material-button")||o.closest("material-fab")||o;Oe(b),e=!0}else{ve("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let b=document.querySelector("material-fab-speed-dial");if(b){let h=b.querySelector(".trigger");if(h){Oe(h),await be(800);let u=Array.from(document.querySelectorAll("i.material-icons-extended")).find(E=>E.innerText.trim()==="email");u&&(Oe(u),e=!0)}}}if(!e)return K("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;ve("\u{1F680} FASE 2: Verificando rascunhos...");let n=null,s=0,i=20;for(;s<i;){await be(250);let b=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(n=Array.from(b).find(h=>h.offsetParent!==null),n){ve("\u26A0\uFE0F Rascunho detectado!","warn");break}s++}if(n){ve("\u{1F5D1}\uFE0F Descartando..."),Oe(n),n.click();let b=null,h=0;for(;h<15;){await be(300);let p=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(b=Array.from(p).find(u=>u.offsetParent!==null),b)break;h++}b&&(Oe(b),K("Limpando rascunho antigo...",{duration:2e3}),await be(2500))}ve("\u{1F680} FASE 3: Buscando editor final...");let a=0,r=null;for(;a<20&&(r=Ft(),!r);)await be(250),a++;if(!r)return K("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let g=r.closest('[id="email-body-content-top"]'),f=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(g){if(f){let h=f.closest('[aria-hidden="true"]');h&&h.removeAttribute("aria-hidden"),f.focus(),Oe(f)}await be(300),g.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let b=g.querySelector("#cases-body-field");if(b){let h=document.createRange();h.selectNodeContents(b),h.collapse(!0);let p=window.getSelection();p.removeAllRanges(),p.addRange(h)}return!0}return!1}async function ft(e){if(!e||!await uo())return;let o=await at();ve("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let n=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(n&&(n.click(),await be(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await bt(i,o.clientEmail),gt(i,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await bt(i,o.internalEmail),gt(i,`
                <strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.
                <div style="margin-top:4px;">
                    <a href="https://mail.google.com/mail/u/0?ui=2&ik=ed23fb3167&attid=0.1&permmsgid=msg-f:1843445102914241244&th=19953b8dda2302dc&view=fimg&fur=ip&permmsgid=msg-f:1843445102914241244&sz=s0-l75-ft&attbid=ANGjdJ9m7O33cM36sxBYohVD6Qsapyux4PNr8qmTBlZ8zkp_LR79suGZhnxFJtBoFDeyMFygsH_tvCts5fnX0WV4rdClw9YqqR7guLnaXU9UzmZRRMRXEoC7T_MPbwo&disp=emb&realattid=ii_mfmv7wjm1&zw" target="_blank" style="color:#1a73e8;text-decoration:none;font-weight:500;display:inline-flex;align-items:center;">
                        Consultar Regra <span style="font-size:14px;margin-left:2px;">\u2197</span>
                    </a>
                </div>
            `))}await be(500);let s=document.querySelector('material-button[debug-id="canned_response_button"]');if(s){Oe(s),await be(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){Oe(i),document.execCommand("insertText",!1,e),i.dispatchEvent(new Event("input",{bubbles:!0})),ve("\u23F3 Buscando resultado da Canned Response...","info");let a=null,r=0,g=15e3,d=500;for(;r<g&&(a=document.querySelector("material-select-dropdown-item"),!a);)await be(d),r+=d;if(a){Oe(a),await be(1500);let f=Ft();if(f&&o.advertiserName){let b=f.innerHTML;b.includes("{%ADVERTISER_NAME%}")&&(f.innerHTML=b.replace(/{%ADVERTISER_NAME%}/g,o.advertiserName))}K("Canned Response aplicada!")}else ve(`\u274C Timeout: Resultado '${e}' n\xE3o apareceu ap\xF3s 15s.`,"error"),K(`Timeout: Template '${e}' n\xE3o carregou.`,{error:!0})}}else K("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function mo(e){if(ve(`\u{1F680} Iniciando Quick Email: ${e.name}`),!await uo())return;let o=await at(),n=qt();await be(600),ve("\u{1F4E7} Processando destinat\xE1rios...");let s=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(s&&(s.click(),await be(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let r=document.querySelector('input[aria-label="Enter To email address"]');r&&(await bt(r,o.clientEmail),gt(r,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let r=document.querySelector('input[aria-label="Enter Bcc email address"]');r&&(await bt(r,o.internalEmail),gt(r,`
                <strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.
                <div style="margin-top:4px;">
                    <a href="https://mail.google.com/mail/u/0?ui=2&ik=ed23fb3167&attid=0.1&permmsgid=msg-f:1843445102914241244&th=19953b8dda2302dc&view=fimg&fur=ip&permmsgid=msg-f:1843445102914241244&sz=s0-l75-ft&attbid=ANGjdJ9m7O33cM36sxBYohVD6Qsapyux4PNr8qmTBlZ8zkp_LR79suGZhnxFJtBoFDeyMFygsH_tvCts5fnX0WV4rdClw9YqqR7guLnaXU9UzmZRRMRXEoC7T_MPbwo&disp=emb&realattid=ii_mfmv7wjm1&zw" target="_blank" style="color:#1a73e8;text-decoration:none;font-weight:500;display:inline-flex;align-items:center;">
                        Consultar Regra <span style="font-size:14px;margin-left:2px;">\u2197</span>
                    </a>
                </div>
            `))}let i=document.querySelector('input[aria-label="Subject"]');i&&e.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,e.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await be(300));let a=Ft();if(a){let g=(a.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');g&&(g.focus(),Oe(g));let d=new Date;d.setDate(d.getDate()+3);let f=d.getDay();f===6?d.setDate(d.getDate()+2):f===0&&d.setDate(d.getDate()+1);let b=d.toLocaleDateString("pt-BR"),h=e.body;h=h.replace(/\[Nome do Cliente\]/g,o.advertiserName||"Cliente"),h=h.replace(/\[INSERIR URL\]/g,o.websiteUrl||"seu site"),h=h.replace(/\[URL\]/g,o.websiteUrl||"seu site"),h=h.replace(/\[Seu Nome\]/g,n),h=h.replace(/\[MM\/DD\/YYYY\]/g,b),document.execCommand("insertHTML",!1,h),g&&(g.dispatchEvent(new Event("input",{bubbles:!0})),g.dispatchEvent(new Event("change",{bubbles:!0}))),K("Email preenchido com sucesso!",{duration:2e3}),ve("\u2705 Processo finalizado com sucesso.","success")}else K("Erro ao focar no editor.",{error:!0})}var Do={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},go={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function Ie(e,t,o,n,s,i){let a=document.createElement("div");Object.assign(a.style,Do),ao(e,a);let r=document.createElement("div");Object.assign(r.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),a.appendChild(r),s&&(s.googleLine=r);let g=document.createElement("div");Object.assign(g.style,{display:"flex",alignItems:"center",gap:"12px"});let d=document.createElement("img");d.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(d.style,{width:"20px",height:"20px",pointerEvents:"none"});let f=document.createElement("span");f.textContent=t,g.appendChild(d),g.appendChild(f);let b=document.createElement("div");Object.assign(b.style,{display:"flex",alignItems:"center",gap:"4px"});let h='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',p='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',u=document.createElement("div");u.innerHTML=h,Object.assign(u.style,go),u.title="Sobre",u.classList.add("no-drag"),u.onmouseenter=()=>{u.style.background="rgba(255,255,255,0.1)",u.style.color="#FFF"},u.onmouseleave=()=>{u.style.color!=="rgb(138, 180, 248)"&&(u.style.background="transparent",u.style.color="#9AA0A6")};let E=document.createElement("div");E.innerHTML=p,Object.assign(E.style,go),E.title="Fechar",E.classList.add("no-drag"),E.onmouseenter=()=>{E.style.background="rgba(242, 139, 130, 0.2)",E.style.color="#F28B82"},E.onmouseleave=()=>{E.style.background="transparent",E.style.color="#9AA0A6"},E.onmousedown=R=>R.stopPropagation(),u.onmousedown=R=>R.stopPropagation(),E.onclick=i;let T=Go(e,t,o,n);return u.onclick=R=>{R.stopPropagation(),T.style.opacity==="1"?(T.style.opacity="0",T.style.pointerEvents="none",u.style.color="#9AA0A6",u.style.background="transparent"):(T.style.opacity="1",T.style.pointerEvents="auto",u.style.color="#8AB4F8",u.style.background="rgba(138, 180, 248, 0.1)")},b.appendChild(u),b.appendChild(E),a.appendChild(g),a.appendChild(b),a}function Go(e,t,o,n){let s=document.createElement("div");return Object.assign(s.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(5px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),s.innerHTML=`
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
    `,setTimeout(()=>{let i=s.querySelector("#close-help-internal");i&&(i.onmouseover=()=>i.style.backgroundColor="#f8f9fa",i.onmouseout=()=>i.style.backgroundColor="white",i.onclick=()=>{s.style.opacity="0",s.style.pointerEvents="none"})},0),e.appendChild(s),s}if(!document.getElementById("cw-module-styles")){let e=document.createElement("style");e.id="cw-module-styles",e.innerHTML=`
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
    `,document.head.appendChild(e)}function qe(e,t,o){let n=document.getElementById(o);if(!t)return;let s=t.getAttribute("data-moved")==="true",i={x:0,y:0};if(n){let f=n.getBoundingClientRect();i.x=f.left+f.width/2,i.y=f.top+f.height/2}let a,r;if(!s)a=window.innerWidth/2,r=window.innerHeight/2;else{let f=t.getBoundingClientRect();a=f.left+f.width/2,r=f.top+f.height/2,a===0&&r===0&&(a=window.innerWidth/2,r=window.innerHeight/2)}let g=i.x-a,d=i.y-r;e?(se.playGenieOpen(),t.style.transition="none",t.style.opacity="0",t.style.pointerEvents="auto",s?t.style.transform=`translate(${g}px, ${d}px) scale(0.05)`:t.style.transform=`translate(calc(-50% + ${g}px), calc(-50% + ${d}px)) scale(0.05)`,t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("open"),n&&n.classList.add("active"),t.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",t.style.opacity="1",s?t.style.transform="translate(0, 0) scale(1)":t.style.transform="translate(-50%, -50%) scale(1)"}),typeof bo=="function"&&bo(t,o)):(se.playSwoosh(),t.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",t.style.pointerEvents="none",requestAnimationFrame(()=>{t.style.opacity="0",s?t.style.transform=`translate(${g}px, ${d}px) scale(0.1)`:t.style.transform=`translate(calc(-50% + ${g}px), calc(-50% + ${d}px)) scale(0.1)`}),setTimeout(()=>{t.classList.remove("open"),n&&n.classList.remove("active"),t.style.transition="",t.style.transform=""},300),typeof Dt=="function"&&Dt(t))}function bo(e,t){Dt(e);let o=n=>{if(!e.classList.contains("open"))return;let s=e.contains(n.target),i=document.querySelector(".cw-pill"),a=i&&i.contains(n.target);s?(e.classList.remove("idle"),e.style.zIndex="2147483648"):a||(e.classList.add("idle"),e.style.zIndex="2147483646")};e._idleHandler=o,document.addEventListener("mousedown",o)}function Dt(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}var zo="https://script.google.com/a/macros/google.com/s/AKfycbysAGOgn40LEQ1uJIppENtTGNSRscLRQkGA96UPYTDDbA0c_KhVUwDQ-Do8ZQ7lQizo/exec",Gt="cw_data_broadcast",fo="cw_data_tips",Bo=["Processando...","Mantenha o foco!","Aguarde..."];function zt(e,t={}){return new Promise((o,n)=>{let s="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script");window[s]=g=>{document.body.contains(i)&&document.body.removeChild(i),delete window[s],o(g)};let a=Object.keys(t).map(g=>encodeURIComponent(g)+"="+encodeURIComponent(t[g])).join("&"),r=`${zo}?op=${e}&callback=${s}&t=${Date.now()}&${a}`;i.src=r,i.onerror=()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[s],n(new Error("JSONP Error (Check Corp Login)"))},document.body.appendChild(i)})}var we={fetchTips:async()=>{try{let e=await zt("tips");e?.tips&&localStorage.setItem(fo,JSON.stringify(e.tips))}catch(e){console.warn("Tips offline",e)}},fetchData:async()=>{try{let e=await zt("broadcast");if(e?.broadcast)return localStorage.setItem(Gt,JSON.stringify(e.broadcast)),e}catch(e){console.warn("Broadcast offline",e)}return{broadcast:JSON.parse(localStorage.getItem(Gt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(Gt)||"[]"),getRandomTip:()=>{let e=Bo,t=localStorage.getItem(fo);if(t)try{e=JSON.parse(t)}catch{}return e[Math.floor(Math.random()*e.length)]},sendBroadcast:async e=>{let t={...e,date:new Date().toISOString(),id:Date.now().toString()};return await we._performOp("new_broadcast",t)},updateBroadcast:async(e,t)=>{let o={id:e,...t};return await we._performOp("update_broadcast",o)},deleteBroadcast:async e=>await we._performOp("delete_broadcast",{id:e}),_performOp:async(e,t)=>{try{console.log(`\u{1F4E4} Executando ${e}...`,t);let o=await zt(e,t);return o&&o.status==="success"?(console.log("\u2705 Sucesso:",e),!0):(console.warn("\u26A0\uFE0F Falha:",o),!1)}catch(o){return console.error("\u274C Erro JSONP:",o),!1}},logUsage:()=>{}};var pe={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00"},ht=e=>new Promise(t=>setTimeout(t,e));function ho(e){let t="cw-command-center-style";if(!document.getElementById(t)){let p=document.createElement("style");p.id=t,p.innerHTML=`
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
    `;let s=document.createElement("div");if(s.className="cw-focus-backdrop",document.body.appendChild(s),document.body.appendChild(n),n.querySelector(".notes").onclick=p=>{p.stopPropagation(),e.toggleNotes()},n.querySelector(".email").onclick=p=>{p.stopPropagation(),e.toggleEmail()},n.querySelector(".script").onclick=p=>{p.stopPropagation(),e.toggleScript()},n.querySelector(".links").onclick=p=>{p.stopPropagation(),e.toggleLinks()},n.querySelector(".broadcast").onclick=p=>{p.stopPropagation();let u=p.currentTarget.querySelector(".cw-badge");u&&(u.style.transform="scale(0)",setTimeout(()=>u.remove(),200)),e.broadcastControl&&e.broadcastControl.toggle()},e.broadcastControl&&e.broadcastControl.hasUnread){let p=document.createElement("div");p.className="cw-badge",n.querySelector(".broadcast").appendChild(p)}(async function(){await ht(2800),n.classList.add("docked"),await ht(300);let u=n.querySelectorAll(".cw-btn");n.querySelectorAll(".cw-sep").forEach(E=>E.classList.add("visible"));for(let E=0;E<u.length;E++)u[E].classList.add("popped"),await ht(90);await ht(200),n.classList.add("system-check")})();let i=!1,a,r,g,d,f=3;n.onmousedown=p=>{if(p.target.closest("button"))return;p.preventDefault(),a=p.clientX,r=p.clientY;let u=n.getBoundingClientRect();g=u.left,d=u.top,document.addEventListener("mousemove",b),document.addEventListener("mouseup",h)};function b(p){let u=p.clientX-a,E=p.clientY-r;!i&&Math.sqrt(u*u+E*E)>f&&(i=!0,n.style.transition="none"),i&&(n.style.left=`${g+u}px`,n.style.top=`${d+E}px`,n.style.right="auto",n.style.bottom="auto",n.style.transform="none")}function h(p){if(document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",h),i){i=!1,n.style.transition="left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s ease";let u=window.innerWidth,E=window.innerHeight,T=n.getBoundingClientRect(),R=T.left+T.width/2,P;R<u/2?(P=24,n.classList.remove("side-right"),n.classList.add("side-left")):(P=u-T.width-24,n.classList.remove("side-left"),n.classList.add("side-right"));let Y=T.top;Y<24&&(Y=24),Y>E-T.height-24&&(Y=E-T.height-24),n.style.left=`${P}px`,n.style.top=`${Y}px`}else{let u=p.target.closest("button");u&&(u.style.transform="scale(0.9)",setTimeout(()=>u.style.transform="",150))}}}function xt(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop");if(!e)return()=>{};window._CW_ABORT_PROCESS=!1;let o=document.createElement("div");o.className="cw-center-stage",o.innerHTML=`
        <div class="cw-center-dots"><span></span><span></span><span></span></div>
        <div class="cw-center-text">${we.getRandomTip()}</div>
        <div class="cw-center-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
    `;let n=document.createElement("div");n.className="cw-abort-btn",n.textContent="Cancelar",n.onclick=i=>{i.stopPropagation(),window._CW_ABORT_PROCESS=!0,K("Cancelado! Mas a nota foi copiada para a \xE1rea de transfer\xEAncia.",{duration:4e3}),o.remove(),e.classList.remove("processing-center"),e.classList.remove("success"),t&&t.classList.remove("active")},o.appendChild(n),e.appendChild(o);let s=Date.now();return e.classList.add("processing-center"),t&&t.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!e.contains(o))return;let a=Date.now()-s,r=Math.max(0,2e3-a);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!e.contains(o))return;let g=o.querySelector(".cw-center-dots"),d=o.querySelector(".cw-center-text"),f=o.querySelector(".cw-center-success"),b=o.querySelector(".cw-abort-btn");g&&(g.style.display="none"),d&&(d.style.display="none"),b&&(b.style.display="none"),f&&f.classList.add("show"),e.classList.add("success"),setTimeout(()=>{e.classList.remove("processing-center"),setTimeout(()=>{o.remove(),e.classList.remove("success"),t&&t.classList.remove("active")},400)},1e3)},r)}}function xo(e){let t=document.createElement("div");t.className="cw-step-scenarios";let o=document.createElement("div");Object.assign(o.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let n=document.createElement("div");Object.assign(n.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"40px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s ease"}),n.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>";let s=null;Object.entries(ke).forEach(([a,r])=>{let g=document.createElement("div");g.textContent=a,Object.assign(g.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",display:"flex",alignItems:"center",gap:"6px"}),g.onmouseenter=()=>{s!==r&&(n.style.background="#fff",n.style.borderColor="#1a73e8",n.style.color="#202124",n.textContent=`"${r.substring(0,120)}${r.length>120?"...":""}"`),s!==r&&(g.style.background="#f1f3f4")},g.onmouseleave=()=>{s!==r&&(s||(n.style.background="#f8f9fa",n.style.borderColor="#dadce0",n.style.color="#5f6368",n.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>"),g.style.background="#ffffff")},g.onclick=()=>{se.playClick(),s===r?(s=null,i(),e("")):(s=r,i(),g.style.transform="scale(0.95)",setTimeout(()=>g.style.transform="scale(1)",150),e(r))},o.appendChild(g)});function i(){Array.from(o.children).forEach(a=>{ke[a.textContent]===s?(a.style.background="#e8f0fe",a.style.borderColor="#1a73e8",a.style.color="#1967d2",a.style.fontWeight="500"):(a.style.background="#ffffff",a.style.borderColor="#dadce0",a.style.color="#3c4043",a.style.fontWeight="400")})}return t.appendChild(o),t.appendChild(n),t}var yo=e=>new Promise(t=>setTimeout(t,e));function yt(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>e.dispatchEvent(new MouseEvent(o,t)))}function ct(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let o=document.createRange();o.selectNodeContents(t);let n=window.getSelection();n.removeAllRanges(),n.addRange(o);try{document.execCommand("copy")}catch{K("Falha ao copiar",{error:!0})}n.removeAllRanges(),document.body.removeChild(t)}function vt(e){["input","change","keydown","keyup"].forEach(o=>{let n=new Event(o,{bubbles:!0,cancelable:!0});e.dispatchEvent(n)})}function vo(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function wt(){console.log("Iniciando processo de Nova Nota...");let e=vo(),t=e.length,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(a=>a.innerText.trim()==="description");if(n){let a=n.closest("material-fab")||n.closest("material-button");a?(a.style&&(a.style.display="block",a.style.visibility="visible"),yt(a)):yt(n)}else{let a=document.querySelector("material-fab-speed-dial");if(a){let r=a.querySelector(".trigger");r?(r.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),yt(r)):a.click(),await yo(800);let d=Array.from(document.querySelectorAll("i.material-icons-extended")).find(f=>f.innerText.trim()==="description");d&&yt(d)}}let s=null,i=0;for(;!s&&i<20;){await yo(300);let a=vo();if(a.length>t)s=a.find(r=>!e.includes(r)),s||(s=a[a.length-1]);else if(i>10){let r=a.filter(g=>g.offsetParent!==null);r.length>0&&(s=r[r.length-1])}i++}return s}var J={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},Me="cubic-bezier(0.25, 0.8, 0.25, 1)",Bt={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${J.border}`,backgroundColor:J.bgInput,fontSize:"14px",color:J.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${Me}, box-shadow 0.2s ${Me}, background-color 0.2s`,outline:"none"},wo={...Bt,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},wn={fontSize:"13px",fontWeight:"700",color:J.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},Pt={display:"block",fontSize:"13px",fontWeight:"600",color:J.text,marginBottom:"8px",marginTop:"16px"},An={fontSize:"12px",color:J.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},Cn={fontSize:"12px",color:J.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},Sn={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:J.text,cursor:"pointer",padding:"12px 14px",backgroundColor:J.surface,border:`1px solid ${J.border}`,borderRadius:"12px",transition:`all 0.2s ${Me}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},jt={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:J.primary},Ht={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:J.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${Me}, box-shadow 0.2s ${Me}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},En={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${J.primary}`,color:J.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${Me}`},Tn={background:"transparent",border:`1px solid ${J.border}`,borderRadius:"20px",color:J.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${Me}`,fontFamily:"'Google Sans', 'Roboto'"};var kn={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:J.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},On={fontSize:"13px",fontWeight:"700",color:J.primary,minWidth:"20px",textAlign:"center"},In={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${J.border}`,backgroundColor:J.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${Me}, box-shadow 0.2s ${Me}`},qn={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${J.bgInput}`},Mn={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${J.border}`,backgroundColor:J.surface,color:J.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${Me}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},Nn={backgroundColor:J.primaryBg,color:J.primary,borderColor:J.primary,fontWeight:"600"},_n={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:J.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},Ln={borderTop:`1px solid ${J.bgInput}`,paddingTop:"20px",marginTop:"16px"};var Rn={maxHeight:"240px",overflowY:"auto",border:`1px solid ${J.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:J.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},Fn={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${J.bgInput}`,cursor:"pointer",fontSize:"13px",color:J.text,transition:"background 0.1s",userSelect:"none"};var Po={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},jo={fontSize:"12px",color:"#e37400",marginTop:"4px"},Ho={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},Vo={display:"flex",gap:"15px",marginBottom:"10px"};function Ao(){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,Po);let t=document.createElement("label");t.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(t.style,_t,{marginTop:"0"});let o=document.createElement("div");Object.assign(o.style,Vo);let n=document.createElement("input");n.type="radio",n.name="ts_usage_mod",n.value="Sim",Object.assign(n.style,jt);let s=document.createElement("label");s.textContent="Sim";let i=document.createElement("div");Object.assign(i.style,{display:"flex",alignItems:"center"}),i.appendChild(n),i.appendChild(s);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="N\xE3o",a.checked=!0,Object.assign(a.style,jt);let r=document.createElement("label");r.textContent="N\xE3o";let g=document.createElement("div");Object.assign(g.style,{display:"flex",alignItems:"center"}),g.appendChild(a),g.appendChild(r),o.appendChild(i),o.appendChild(g);let d=document.createElement("div");d.style.display="block";let f=document.createElement("label");f.textContent="Qual foi o Motivo?",Object.assign(f.style,_t,{fontSize:"12px"});let b=document.createElement("input");b.type="text",Object.assign(b.style,Ho);let h=document.createElement("div");h.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(h.style,jo),d.appendChild(f),d.appendChild(b),d.appendChild(h),e.appendChild(t),e.appendChild(o),e.appendChild(d),n.onchange=()=>{d.style.display="none"},a.onchange=()=>{d.style.display="block"};function p(T,R){if(e.style.display="none",!T||T.includes("Education")||!R||R.length===0)return;let P=R.some(y=>y.includes("enhanced")||y==="ec_google_ads"),Y=R.some(y=>(y.includes("conversion")||y.includes("ads"))&&!y.includes("enhanced")),oe=R.some(y=>y.includes("ga4")||y.includes("analytics")||y.includes("ua")),S=R.some(y=>y.includes("merchant")||y.includes("gmc")||y.includes("shopping"));(P||Y&&!oe&&!S)&&(e.style.display="block")}function u(){if(e.style.display==="none")return"";let T=`<br><b>Utilizou Tag Support?</b> ${n.checked?"Sim":"N\xE3o"}`;return a.checked&&b.value.trim()!==""&&(T+=`<br><b>Motivo:</b> ${b.value}`),T+="<br>",T}function E(){e.style.display="none",a.checked=!0,n.checked=!1,d.style.display="block",b.value=""}return{element:e,updateVisibility:p,getOutput:u,reset:E}}var W={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Ye={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function Co(e){let t={},o="implementation";function n(S){let x=S.toLowerCase();return x.includes("ads")||x.includes("conversion")||x.includes("remarketing")?W.brands.ads:x.includes("ga4")||x.includes("analytics")?W.brands.ga4:x.includes("gtm")||x.includes("tag manager")||x.includes("container")?W.brands.gtm:x.includes("merchant")||x.includes("shopping")||x.includes("feed")?W.brands.gmc:W.brands.default}let s=Object.entries(Ge).filter(([S,x])=>x.popular),i={};Object.entries(Ge).forEach(([S,x])=>{if(x.popular)return;let y=n(x.name);i[y.label]||(i[y.label]={brand:y,tasks:[]}),i[y.label].tasks.push({key:S,...x})});let a="cw-zen-tasks";if(!document.getElementById(a)){let S=document.createElement("style");S.id=a,S.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column; height: 100%; width: calc(100% + 32px); margin: -16px;
                font-family: ${W.font}; background: ${W.bg}; position: relative; overflow: hidden;
            }
            
            /* SCROLL AREA */
            .cw-zen-content { flex: 1; overflow-y: auto; padding-bottom: 80px; } /* Espa\xE7o para o Status Bar */

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${W.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${W.white}; 
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
                font-size: 12px; font-weight: 500; color: ${W.textMain}; line-height: 1.2; 
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
                color: ${W.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${W.border}; border-radius: 10px; background: ${W.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${W.blue}; box-shadow: 0 0 0 3px ${W.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${W.border}; border-radius: 10px; background: ${W.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${W.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${W.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${W.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${W.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${W.blueLight}; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${W.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${W.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${W.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${W.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${W.border};
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${W.shadowFloat}; z-index: 10;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${W.textMain}; }
            
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
                font-family: ${W.font}; font-size: 15px; font-weight: 600; color: ${W.textMain};
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
                border-color: ${W.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${W.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${W.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${W.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 10px; font-weight: 700; color: ${W.textSub};
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
        `,document.head.appendChild(S)}let r=document.createElement("div");r.className="cw-zen-container";let g=document.createElement("div");Object.assign(g.style,{display:"none"});let d=document.createElement("div");d.className="cw-screens-container",g.appendChild(d),r.innerHTML=`
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
    `;let f=r.querySelector(".cw-hero-grid"),b=r.querySelector(".cw-acc-container"),h=r.querySelector(".cw-results-container"),p=r.querySelector(".cw-search-input"),u=r.querySelector(".cw-status-bar"),E=r.querySelector(".cw-status-text"),T=r.querySelector(".cw-footer-icons");s.forEach(([S,x])=>{let y=n(x.name),C=document.createElement("div");C.className="cw-hero-card",C.id=`hero-${S}`,C.style.setProperty("--hero-color",y.color),C.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${Ye[y.icon]}</div>
                <div class="cw-hero-label">${x.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,C.onclick=O=>{if(O.target.closest(".cw-step-btn"))return;let c=t[S]?t[S].count:0;P(S,c>0?-c:1,x)},C.querySelector(".minus").onclick=()=>P(S,-1,x),C.querySelector(".plus").onclick=()=>P(S,1,x),C.dataset.color=y.color,f.appendChild(C)});function R(S,x){let y=n(x.name),C=document.createElement("div");return C.className="cw-task-item",C.dataset.id=S,C.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${y.bg}; color:${y.color}">
                    ${Ye[y.icon]||Ye.default}
                </div>
                <div class="cw-task-label">${x.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,C.onclick=O=>{if(O.target.closest(".cw-step-btn"))return;let c=t[S]?t[S].count:0;P(S,c>0?-c:1,x)},C.querySelector(".minus").onclick=()=>P(S,-1,x),C.querySelector(".plus").onclick=()=>P(S,1,x),C}Object.entries(i).forEach(([S,x])=>{let y=document.createElement("div");y.className="cw-acc-group";let C=document.createElement("div");C.className="cw-acc-header",C.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${x.brand.color}"></div>
                ${S}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,C.onclick=()=>{b.querySelectorAll(".cw-acc-group.open").forEach(c=>{c!==y&&c.classList.remove("open")}),y.classList.toggle("open")};let O=document.createElement("div");O.className="cw-acc-body",x.tasks.forEach(c=>{let M=R(c.key,c);O.appendChild(M)}),y.appendChild(C),y.appendChild(O),b.appendChild(y)});function P(S,x,y){t[S]||(t[S]={count:0,data:y,brand:n(y.name)}),t[S].count+=x,t[S].count<=0&&delete t[S],Y(),oe(),e&&e()}function Y(){s.forEach(([O])=>{let c=f.querySelector(`#hero-${O}`);if(!c)return;let M=t[O];M?(c.classList.add("active"),c.querySelector(".cw-step-val").textContent=M.count,c.querySelector(".cw-step-val").style.color=c.dataset.color):c.classList.remove("active")}),r.querySelectorAll(".cw-task-item").forEach(O=>{let c=O.dataset.id,M=t[c];M?(O.classList.add("selected"),O.querySelector(".cw-step-val").textContent=M.count):O.classList.remove("selected")});let x=Object.keys(t),y=0,C=[];if(x.forEach(O=>{let c=t[O];y+=c.count;for(let M=0;M<c.count;M++)C.length<6&&C.push(c.brand)}),y>0){u.classList.add("visible");let O=y>1?"A\xE7\xF5es":"A\xE7\xE3o",c=y>1?"definidas":"definida";E.textContent=`${y} ${O} ${c}`,T.innerHTML="",C.forEach(M=>{let N=document.createElement("div");N.className="cw-mini-icon",N.innerHTML=Ye[M.icon]||Ye.default;let G=N.querySelector("svg");G&&(G.style.width="14px",G.style.height="14px"),T.appendChild(N)})}else u.classList.remove("visible")}p.addEventListener("input",S=>{let x=S.target.value.toLowerCase();if(x.length>0){b.style.display="none",h.style.display="block",h.innerHTML="";let y=!1;Object.entries(Ge).forEach(([C,O])=>{if(O.name.toLowerCase().includes(x)){y=!0;let c=R(C,O);t[C]&&(c.classList.add("selected"),c.querySelector(".cw-step-val").textContent=t[C].count),h.appendChild(c)}}),y||(h.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else b.style.display="block",h.style.display="none"});function oe(){d.innerHTML="";let S=Object.keys(t),x=!1,y=document.getElementById("sub-status"),C="implementation";if(y&&y.value.toLowerCase().includes("education")&&(C="education"),S.length===0){d.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}if(S.length===0){d.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}let O=document.createElement("div");O.className="cw-info-banner",O.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Todos os Screenshots s\xE3o baseados na descri\xE7\xE3o do 
                <a href="https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/" target="_blank" class="cw-info-link">Win Criteria</a>.
            </span>
        `,d.appendChild(O),S.forEach(c=>{let M=t[c].data,N=t[c].count,G=t[c].brand,z=M.screenshots?M.screenshots[C]||[]:["Link da Evid\xEAncia"];if(z.length>0){x=!0;for(let l=1;l<=N;l++){let m=document.createElement("div");m.className="cw-screen-card",m.style.setProperty("--brand-color",G.color),m.style.setProperty("--brand-bg",G.bg),m.style.setProperty("--brand-shadow",G.color+"40");let w=document.createElement("div");w.className="cw-card-header";let A=document.createElement("div");A.className="cw-card-icon",A.innerHTML=Ye[G.icon]||Ye.default;let F=document.createElement("div");F.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let L=document.createElement("input");L.className="cw-card-title-input",L.id=`name-${c}-${l}`,L.value=`${M.name}${N>1?" #"+l:""}`,L.title="Clique para renomear esta task";let U=document.createElement("span");U.className="cw-edit-hint",U.innerHTML="\u270E Renomear",F.appendChild(L),F.appendChild(U),w.appendChild(A),w.appendChild(F),m.appendChild(w),z.forEach((_,I)=>{let D=document.createElement("div");D.className="cw-input-group";let V=document.createElement("label");V.className="cw-input-label",V.textContent=_.replace(/📷|:|•/g,"").trim();let k=document.createElement("input");k.className="cw-input-field",k.id=`screen-${c}-${l}-${I}`,k.placeholder="Cole o link aqui...",k.setAttribute("autocomplete","off"),k.addEventListener("input",()=>{k.value.trim().length>5?k.classList.add("filled"):k.classList.remove("filled")});let j=document.createElement("div");j.className="cw-input-check",j.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',D.appendChild(V),D.appendChild(k),D.appendChild(j),m.appendChild(D)}),d.appendChild(m)}}}),g.style.display=x?"block":"none"}return{selectionElement:r,screenshotsElement:g,updateSubStatus:()=>oe(),getCheckedElements:()=>Object.keys(t).map(S=>({value:S,closest:()=>({querySelector:()=>({textContent:t[S].count})})})),toggleTask:(S,x=!0)=>{let y=t[S];x&&!y?P(S,1,Ge[S]):!x&&y&&P(S,-y.count,Ge[S])},setMode:S=>{o=S,oe()},reset:()=>{for(let S in t)delete t[S];p.value="",b.style.display="block",h.style.display="none",Y(),oe()}}}function So(e){let t=document.createElement("div");t.style.cssText="padding: 16px; display: flex; flex-direction: column; gap: 16px; height: 100%; box-sizing: border-box; overflow-y: auto;";function o(c,M,N="text",G=""){let z=document.createElement("div"),l=document.createElement("label");Object.assign(l.style,Pt),l.textContent=M;let m;return N==="textarea"?(m=document.createElement("textarea"),Object.assign(m.style,wo),m.style.height="80px"):(m=document.createElement("input"),m.type=N,Object.assign(m.style,Bt)),m.id=`st-${c}`,m.placeholder=G,z.appendChild(l),z.appendChild(m),{wrapper:z,input:m}}function n(c,M){let N=document.createElement("div"),G=document.createElement("label");Object.assign(G.style,Pt),G.textContent=M,N.appendChild(G);let z=document.createElement("div");return z.style.display="flex",z.style.gap="15px",z.style.marginBottom="16px",["Yes","No"].forEach(l=>{let m=document.createElement("label");m.style.display="flex",m.style.alignItems="center",m.style.fontSize="13px",m.style.cursor="pointer";let w=document.createElement("input");w.type="radio",w.name=`st-${c}`,w.value=l==="Yes"?"Y":"N",w.style.marginRight="6px",l==="No"&&(w.checked=!0),m.appendChild(w),m.appendChild(document.createTextNode(l)),z.appendChild(m)}),N.appendChild(z),{wrapper:N}}let s=document.createElement("div");s.innerHTML='<div style="font-size:12px; font-weight:700; color:#1a73e8; text-transform:uppercase; margin-bottom:8px; border-bottom:1px solid #e0e0e0; padding-bottom:4px;">1. Dados T\xE9cnicos</div>';let i=o("cid","Ads CID"),a=o("ga4","GA4 ID"),r=o("gtm","GTM ID"),g=n("ghost","Ghosting Access Available?"),d=n("access","Advertiser has access to GA4/GTM?"),f=o("access-email","If Yes, User Email");s.append(i.wrapper,a.wrapper,r.wrapper,g.wrapper,d.wrapper,f.wrapper);let b=document.createElement("div");b.innerHTML='<div style="font-size:12px; font-weight:700; color:#1a73e8; text-transform:uppercase; margin:20px 0 8px 0; border-bottom:1px solid #e0e0e0; padding-bottom:4px;">2. Contato & Problema</div>';let h=o("name","Name of Advertiser"),p=o("url","Website Address"),u=o("phone","Phone Number"),E=o("email","Email Address"),T=o("callback","Preferred Call Back Time (w/ Timezone)"),R=o("desc","Detailed Issue Description","textarea"),P=o("checks","Checks Performed by Tech Team","textarea"),Y=o("screens","Uncropped Screenshots (Links)","textarea");b.append(h.wrapper,p.wrapper,u.wrapper,E.wrapper,T.wrapper,R.wrapper,P.wrapper,Y.wrapper);let oe=document.createElement("div");oe.innerHTML='<div style="font-size:12px; font-weight:700; color:#1a73e8; text-transform:uppercase; margin:20px 0 8px 0; border-bottom:1px solid #e0e0e0; padding-bottom:4px;">3. Contatos (C\xF3pia)</div>';let S=o("c-adv","Advertiser Contact"),x=o("c-am","Account Manager");oe.append(S.wrapper,x.wrapper);let y=document.createElement("div");y.style.display="flex",y.style.gap="10px",y.style.marginTop="auto",y.style.paddingTop="20px";let C=document.createElement("button");C.textContent="\u2728 Auto-Fill",Object.assign(C.style,Ht,{background:"#f8f9fa",color:"#1a73e8",border:"1px solid #dadce0"});let O=document.createElement("button");return O.textContent="Gerar Nota S&T",Object.assign(O.style,Ht),y.appendChild(C),y.appendChild(O),t.append(s,b,oe,y),C.onclick=async()=>{C.textContent="\u23F3 Buscando...";let c=await at();c.advertiserName&&(h.input.value=c.advertiserName),c.websiteUrl&&(p.input.value=c.websiteUrl),c.clientEmail&&(E.input.value=c.clientEmail,S.input.value=c.clientEmail);let M=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);M&&(i.input.value=M[0]),C.textContent="\u2728 Auto-Fill",K("Dados preenchidos!")},O.onclick=async()=>{let c=z=>{let l=t.querySelector(`#st-${z}`);return l?l.value:""},M=z=>{let l=t.querySelector(`input[name="st-${z}"]:checked`);return l?l.value:"N"},N=`Split & Transfer : Phone Note Format [Mandatory]

Advertiser\u2019s info:
Ads CID: ${c("cid")}
GA4 ID: ${c("ga4")}
GTM ID: ${c("gtm")}
Advertiser has access to either GA4 or GTM (Y/N): ${M("access")}
If Yes, user access email to GA4/GTM: ${c("access-email")}
Ghosting Access Available (Y/N): ${M("ghost")}
Name of the advertiser: ${c("name")}
Website Address: ${c("url")}
Advertiser\u2019s preferred mode of communication: Phone
Advertiser/Web Master\u2019s Phone Number: ${c("phone")}
Preferred Call Back time with time zone and contact number: ${c("callback")}
Advertiser/Web Master\u2019s Email Address: ${c("email")}

Detailed Issue Description:
${c("desc")}

Name of the conversion action or event in the question: N/A
Date range: N/A
Uncropped screenshots of the issue:
${c("screens")}

Test conversion details (if any): N/A

Checks performed by Technical Solutions Team (Detailed Info + Screenshot doc):
${c("checks")}

[IMP] Contacts to be copied on all communication about this case
Advertiser contact - ${c("c-adv")}
Account Manager - ${c("c-am")}
Additional Contact - N/A

Additional Comments: (Optional)`;ct(N.replace(/\n/g,"<br>"));let G=await wt();G?(document.execCommand("insertHTML",!1,N.replace(/\n/g,"<br>")),vt(G),K("Nota S&T inserida!")):K("Copiado! Abra uma nota para colar.")},t}function Eo(){let e="v3.7.0 (S&T Mode)",t="bau",o="pt",n=!1,s=!1,i=!1,a={input:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},textarea:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease",height:"100px",resize:"vertical"},h3:{fontSize:"14px",fontWeight:"600",color:"#202124",margin:"0 0 12px 0"},label:{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},checkboxLabel:{display:"flex",alignItems:"center",marginBottom:"10px",fontSize:"14px",fontWeight:"400",cursor:"pointer",padding:"8px",background:"#f8f9fa",borderRadius:"6px",transition:"background-color 0.2s ease, box-shadow 0.2s ease",userSelect:"none"},checkboxInput:{width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"},buttonBase:{flex:"1 1 0",padding:"10px 0",color:"#fff",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"500",cursor:"pointer",marginTop:"16px"},stepBlock:{borderTop:"1px solid #eee",paddingTop:"12px",marginTop:"12px"},radioContainer:{display:"flex",gap:"15px",marginBottom:"10px"},optionalBtn:{width:"100%",padding:"10px",background:"white",border:"1px dashed #1a73e8",color:"#1a73e8",borderRadius:"6px",cursor:"pointer",fontWeight:"500",fontSize:"13px",marginBottom:"10px",transition:"all 0.2s"},helpLink:{fontSize:"12px",color:"#1a73e8",textDecoration:"none",cursor:"pointer",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"color 0.2s"}},r=Ao(),g=Co(()=>{let H=g.getCheckedElements().map(q=>q.value);A&&A.value&&r.updateVisibility(A.value,H)}),d=document.createElement("div");d.id="autofill-popup",d.classList.add("cw-module-window"),Object.assign(d.style,Te,{right:"100px",width:"400px",transition:"width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)"});let f={popup:d,googleLine:null},b=Ie(d,"Case Notes",e,"Gera notas padronizadas.",f,()=>It());d.appendChild(b);let h=b.lastElementChild;if(h){let v=document.createElement("div");v.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',Object.assign(v.style,{width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease",marginLeft:"4px"}),v.title="Alternar para Split & Transfer",v.onmouseenter=()=>{v.style.background="rgba(255,255,255,0.1)",v.style.color="#FFF"},v.onmouseleave=()=>{i||(v.style.background="transparent",v.style.color="#9AA0A6")},v.onclick=H=>{H.stopPropagation(),T(v)},h.insertBefore(v,h.firstChild)}let p=document.createElement("div");Object.assign(p.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1"}),d.appendChild(p);let u=document.createElement("div");Object.assign(u.style,{flexGrow:"1",display:"none",overflow:"hidden"});let E=So(()=>T());u.appendChild(E),d.appendChild(u);function T(v){i=!i,i?(p.style.display="none",u.style.display="flex",f.googleLine&&(f.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)"),v&&(v.style.color="#C58AF9",v.style.background="rgba(197, 138, 249, 0.15)")):(p.style.display="block",u.style.display="none",f.googleLine&&(f.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"),v&&(v.style.color="#9AA0A6",v.style.background="transparent"))}let R=document.createElement("div");R.textContent="created by lucaste@",Object.assign(R.style,so),d.appendChild(R);let P=document.createElement("div");P.id="step-lang-type";let Y=document.createElement("label");Object.assign(Y.style,a.label),P.appendChild(Y);let oe=document.createElement("div");Object.assign(oe.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let S=document.createElement("div");S.textContent="Portugu\xEAs",S.classList.add("no-drag"),Object.assign(S.style,ye);let x=document.createElement("div");x.textContent="Espa\xF1ol",x.classList.add("no-drag"),Object.assign(x.style,ye),S.onclick=()=>Et("pt"),x.onclick=()=>Et("es"),oe.appendChild(S),oe.appendChild(x),P.appendChild(oe),p.appendChild(P);let y=document.createElement("div");y.id="step-0-case-type";let C=document.createElement("label");Object.assign(C.style,a.label),y.appendChild(C);let O=document.createElement("div");Object.assign(O.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let c=document.createElement("div");c.textContent="BAU",c.classList.add("no-drag"),Object.assign(c.style,ye);let M=document.createElement("div");M.textContent="LM",M.classList.add("no-drag"),Object.assign(M.style,ye),c.onclick=()=>St("bau"),M.onclick=()=>St("lm"),O.appendChild(c),O.appendChild(M),y.appendChild(O),p.appendChild(y);let N=document.createElement("div");N.id="step-1-selection";let G=document.createElement("label");G.className="cw-input-label",G.textContent="Status Principal";let z=document.createElement("select");z.id="main-status",z.className="cw-select",z.innerHTML=`
      <option value="" disabled selected hidden>Selecione uma op\xE7\xE3o...</option>
      <option value="NI">NI - Need Info</option>
      <option value="SO">SO - Solution Offered</option>
      <option value="IN">IN - Inactive</option>
      <option value="AS">AS - Assigned</option>
      <option value="DC">DC - Discard</option>
  `;let l=document.createElement("div");l.style.cssText="display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; margin-bottom: 6px;";let m=document.createElement("label");m.className="cw-input-label",m.textContent="Sub-status",m.style.marginBottom="0";let w=document.createElement("a");w.href="https://seu-link-do-guia-aqui.com",w.target="_blank",w.className="cw-info-link",w.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; transform:translateY(1px)"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Guia de Substatus',Object.assign(w.style,a.helpLink),l.appendChild(m),l.appendChild(w);let A=document.createElement("select");A.id="sub-status",A.className="cw-select",A.disabled=!0,A.innerHTML='<option value="" disabled selected hidden>Aguardando status principal...</option>',N.appendChild(G),N.appendChild(z),N.appendChild(l),N.appendChild(A),p.appendChild(N);let F=document.createElement("div");F.id="step-1-1-portugal",Object.assign(F.style,a.stepBlock,{display:"none"});let L=document.createElement("label");Object.assign(L.style,a.label),F.appendChild(L);let U=document.createElement("div");Object.assign(U.style,a.radioContainer);let _=document.createElement("div");Object.assign(_.style,{display:"flex",alignItems:"center"});let I=document.createElement("input");I.type="radio",I.name="portugal-group",I.value="sim",Object.assign(I.style,a.checkboxInput);let D=document.createElement("label");D.htmlFor="portugal-sim",Object.assign(D.style,{cursor:"pointer"}),_.appendChild(I),_.appendChild(D);let V=document.createElement("div");Object.assign(V.style,{display:"flex",alignItems:"center"});let k=document.createElement("input");k.type="radio",k.name="portugal-group",k.value="nao",k.checked=!0,Object.assign(k.style,a.checkboxInput);let j=document.createElement("label");j.htmlFor="portugal-nao",Object.assign(j.style,{cursor:"pointer"}),V.appendChild(k),V.appendChild(j),U.appendChild(_),U.appendChild(V),F.appendChild(U),p.appendChild(F);function de(v){n=v,v?ne.style.display="block":ne.style.display="none"}I.onchange=()=>de(!0),k.onchange=()=>de(!1);let ne=document.createElement("div");ne.id="step-1-2-consent",Object.assign(ne.style,a.stepBlock,{display:"none"});let ae=document.createElement("label");Object.assign(ae.style,a.label),ne.appendChild(ae);let le=document.createElement("div");Object.assign(le.style,a.radioContainer);let fe=document.createElement("div");Object.assign(fe.style,{display:"flex",alignItems:"center"});let Se=document.createElement("input");Se.type="radio",Se.name="consent-group",Se.value="Sim",Se.checked=!0,Object.assign(Se.style,a.checkboxInput);let Ne=document.createElement("label");Ne.htmlFor="consent-sim",Object.assign(Ne.style,{cursor:"pointer"}),fe.appendChild(Se),fe.appendChild(Ne);let et=document.createElement("div");Object.assign(et.style,{display:"flex",alignItems:"center"});let Fe=document.createElement("input");Fe.type="radio",Fe.name="consent-group",Fe.value="N\xE3o",Object.assign(Fe.style,a.checkboxInput);let dt=document.createElement("label");dt.htmlFor="consent-nao",Object.assign(dt.style,{cursor:"pointer"}),et.appendChild(Fe),et.appendChild(dt),le.appendChild(fe),le.appendChild(et),ne.appendChild(le),p.appendChild(ne);let Be=document.createElement("div");Be.id="step-1-5-snippets",Object.assign(Be.style,a.stepBlock,{display:"none"});let pt=document.createElement("h3");Object.assign(pt.style,a.h3),pt.textContent="Cen\xE1rios Comuns";let Ee=xo(v=>{let H=document.querySelector("textarea");H&&(H.value=v,H.dispatchEvent(new Event("input")),H.style.transition="background-color 0.2s",H.style.backgroundColor="#e8f0fe",setTimeout(()=>H.style.backgroundColor="#fff",300))});Ee.id="snippet-container",Be.appendChild(pt),Be.appendChild(Ee),p.appendChild(Be);let Ae=document.createElement("div");Ae.id="step-3-form",Object.assign(Ae.style,a.stepBlock,{display:"none"});let Ct=document.createElement("h3");Object.assign(Ct.style,a.h3),Ae.appendChild(Ct);let De=document.createElement("div");De.id="dynamic-form-fields-container",Ae.appendChild(De);let he=document.createElement("button");he.textContent="+ Gostaria de selecionar uma task?",Object.assign(he.style,a.optionalBtn),he.onmouseover=()=>he.style.background="#e8f0fe",he.onmouseout=()=>he.style.background="white",he.onclick=()=>{he.style.display="none",Pe.style.display="block",g.selectionElement.style.display="block"};let Pe=document.createElement("h3");Object.assign(Pe.style,a.h3,{marginTop:"20px"});let $t=g.selectionElement;Object.assign($t.style,{marginBottom:"20px"}),Ae.appendChild(he),Ae.appendChild(Pe),Ae.appendChild($t),Ae.appendChild(r.element),Ae.appendChild(g.screenshotsElement),p.appendChild(Ae);let je=document.createElement("div");je.id="step-4-email",Object.assign(je.style,{display:"none",marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #eee"});let He=document.createElement("label");He.style.display="flex",He.style.alignItems="center",He.style.cursor="pointer",He.style.fontSize="14px";let Ve=document.createElement("input");Ve.type="checkbox",Ve.checked=!0,Object.assign(Ve.style,a.checkboxInput),He.appendChild(Ve),He.appendChild(document.createTextNode("Preencher email automaticamente?")),je.appendChild(He),p.appendChild(je);let Ke=document.createElement("div");Object.assign(Ke.style,{display:"none",gap:"8px",padding:"0"}),p.appendChild(Ke);let tt=document.createElement("button");Object.assign(tt.style,a.buttonBase,{backgroundColor:"#5f6368"}),tt.textContent="Copiar";let ot=document.createElement("button");Object.assign(ot.style,a.buttonBase,{backgroundColor:"#1a73e8"}),ot.textContent="Preencher",Ke.appendChild(tt),Ke.appendChild(ot);let nt=document.createElement("div");Object.assign(nt.style,Qe),nt.className="no-drag",nt.title="Redimensionar",d.appendChild(nt),Ze(d,nt),document.body.appendChild(d);function St(v){t=v;let H=it();Object.assign(c.style,ye),Object.assign(M.style,ye),v==="bau"?(Object.assign(c.style,H),w.href="https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657"):(Object.assign(M.style,H),w.href="https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243"),A.value&&A.dispatchEvent(new Event("change"))}function Q(v){try{if(Re&&Re[o]&&Re[o][v])return Re[o][v];if(Re&&Re.pt&&Re.pt[v])return Re.pt[v]}catch{}return v}function Mo(){Y.textContent=Q("idioma"),C.textContent=Q("fluxo"),G.textContent=Q("status_principal"),m.textContent=Q("substatus"),pt.textContent=Q("cenarios_comuns"),Pe.textContent=Q("selecione_tasks"),Ct.textContent=Q("preencha_detalhes"),tt.textContent=Q("copiar"),ot.textContent=Q("preencher"),z.querySelector('option[value=""]')&&(z.querySelector('option[value=""]').textContent=Q("select_status")),A.querySelector('option[value=""]')&&(A.querySelector('option[value=""]').textContent=Q("select_substatus")),L.textContent=Q("caso_portugal"),D.textContent=Q("sim"),j.textContent=Q("nao"),ae.textContent=Q("consentiu_gravacao"),Ne.textContent=Q("sim"),dt.textContent=Q("nao"),De.querySelectorAll("label").forEach(v=>{let H=v.nextElementSibling.id.replace("field-",""),q=Q(H.toLowerCase());q!==H.toLowerCase()?v.textContent=q:v.textContent=H.replace(/_/g," ").replace(/\b\w/g,Z=>Z.toUpperCase())+":"}),he.textContent="+ "+(o==="pt"?"Gostaria de selecionar uma task?":"Quisiera seleccionar una tarea?")}function Et(v){o=v;let H=it();Object.assign(S.style,ye),Object.assign(x.style,ye),v==="pt"?(Object.assign(S.style,H),F.style.display="block",de(n)):(Object.assign(x.style,H),F.style.display="none",ne.style.display="none"),Mo(),A.value&&A.dispatchEvent(new Event("change"))}function Tt(v){(v.value.trim()===""||v.value.trim()==="\u2022")&&(v.value="\u2022 "),v.onkeydown=function(H){if(H.key==="Enter"){H.preventDefault();let q=this.selectionStart,Z=this.selectionEnd,ce=this.value,me=ce.lastIndexOf(`
`,q-1)+1,Ce=ce.substring(me,q),ge=Ce.trim()==="\u2022"||Ce.trim()===""?`
`:`
\u2022 `;this.value=ce.substring(0,q)+ge+ce.substring(Z),this.selectionStart=this.selectionEnd=q+ge.length}else if(H.key==="Backspace"){let q=this.selectionStart;if(q===this.selectionEnd&&q>0){let Z=this.value.substring(0,q);Z.endsWith(`
\u2022 `)?(H.preventDefault(),this.value=Z.substring(0,q-3)+this.value.substring(this.selectionEnd),this.selectionStart=this.selectionEnd=q-3):Z==="\u2022 "&&(H.preventDefault(),this.value="",this.selectionStart=this.selectionEnd=0)}}}}function kt(){let v=typeof Ee<"u"?Ee:document.getElementById("snippet-container");if(!v)return;let H=v.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'),q={},Z=new Set;H.forEach(ie=>{let te=ie.id,$=ke[te];if($)for(let B in $)B==="linkedTask"?Z.add($.linkedTask):B!=="type"&&(q[B]||(q[B]=[]),q[B].includes($[B])||q[B].push($[B]))});let ce=new Set;Object.values(ke).forEach(ie=>{Object.keys(ie).forEach(te=>{te!=="linkedTask"&&te!=="type"&&ce.add(te)})}),ce.forEach(ie=>{let te=document.getElementById(ie);if(te){let $=q[ie]||[],B="";lt.includes(ie.replace("field-",""))?(B=$.map(ee=>ee.startsWith("\u2022 ")?ee:"\u2022 "+ee).join(`
`),B===""?B="\u2022 ":B.endsWith(`
\u2022 `)||(B+=`
\u2022 `)):B=$.join(`

`),B.trim()!=="\u2022"&&B.trim()!==""?te.value=B:lt.includes(ie.replace("field-",""))?te.value="\u2022 ":te.value="",te.tagName==="TEXTAREA"&&typeof Tt=="function"&&Tt(te)}});let me=new Set,Ce=new Set;v.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(ie=>{let te=ke[ie.id];te&&te.linkedTask&&(ie.checked?me.add(te.linkedTask):Ce.add(te.linkedTask))}),Ce.forEach(ie=>{me.has(ie)||g.toggleTask(ie,!1)}),me.forEach(ie=>{g.toggleTask(ie,!0)})}z.onchange=()=>{let v=z.value;if(Ot(1.5),A.innerHTML=`<option value="">${Q("select_substatus")}</option>`,!v){A.disabled=!0;return}for(let H in rt){let q=rt[H];if(q.status===v){let Z=document.createElement("option");Z.value=H,Z.textContent=q.name,A.appendChild(Z)}}A.disabled=!1},A.onchange=()=>{let v=A.value;if(Ot(1.5),!v)return;g.updateSubStatus(v);let H=rt[v];Ee.innerHTML="";let q=($,B,ee)=>{let ue=document.createElement("label");Object.assign(ue.style,a.checkboxLabel),ue.onmouseover=()=>ue.style.backgroundColor="#e8eaed",ue.onmouseout=()=>ue.style.backgroundColor="#f8f9fa";let re=document.createElement("input");return re.type=B,re.id=$.id,Object.assign(re.style,a.checkboxInput),ue.appendChild(re),ue.appendChild(document.createTextNode(` ${$.text}`)),ee.appendChild(ue),re},Z=[],ce="radio";if(v==="NI_Awaiting_Inputs")Z=[{id:"quickfill-ni-inicio-manual",text:"In\xEDcio 2/6 (Manual)"},{id:"quickfill-ni-cms-access",text:"In\xEDcio 2/6 (ADV sem acesso ao CMS)"},{id:"quickfill-ni-followup-bau",text:"Follow-up 2/6 (BAU)"},{id:"quickfill-ni-followup-lm",text:"Follow-up 2/6 (LM)"}];else if(v.startsWith("SO_"))ce="checkbox",Z=[{id:"quickfill-gtm-install",text:"Instala\xE7\xE3o do GTM"},{id:"quickfill-whatsapp",text:"Convers\xE3o de WhatsApp"},{id:"quickfill-form",text:"Convers\xE3o de Formul\xE1rio (Padr\xE3o)"},{id:"quickfill-ecw4-close",text:"Fechamento ECW4 (P\xF3s 7 dias)"}];else if(v.startsWith("AS_")){ce="checkbox";let $=document.createElement("label");$.textContent=Q("cenarios_comuns"),Object.assign($.style,a.label),Ee.appendChild($),Z=[{id:"quickfill-as-no-show",text:"Anunciante n\xE3o compareceu (respondeu e-mail)"},{id:"quickfill-as-insufficient-time",text:"Tempo insuficiente"},{id:"quickfill-as-no-access",text:"Anunciante sem acessos necess\xE1rios"}]}else v.startsWith("IN_")?Z=[{id:"quickfill-in-nrp-bau",text:"NRP (BAU - 3 tentativas)"},{id:"quickfill-in-nrp-lm",text:"NRP (LM - Sem tentativas)"},{id:"quickfill-in-no-show-bau",text:"No-Show (BAU - 3 tentativas)"},{id:"quickfill-in-2-6-final",text:"Finaliza\xE7\xE3o 2/6 (Sem Resposta)"},{id:"quickfill-in-manual",text:"Outro (Manual)"}]:v.startsWith("DC_")&&(ce="radio",Z=[{id:"quickfill-dc-lm-no-access",text:"LM - Sem acessos (Reagendar em BAU)"}]);let me=Z.filter($=>{let B=ke[$.id];return!B.type||B.type==="all"||B.type===t});me.forEach(($,B)=>{let ee=q($,ce,Ee);ce==="radio"&&(ee.name="scenario-radio-group",B===0&&(ee.checked=!0))}),me.length>0&&(Be.style.display="block"),H.requiresTasks?(he.style.display="none",Pe.style.display="block",g.selectionElement.style.display="block"):(he.style.display="block",Pe.style.display="none",g.selectionElement.style.display="none"),De.innerHTML="";let Ce=H.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(Ce)].forEach($=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes($))return;let B=$.slice(1,-1),ee=document.createElement("label"),ue=Q(B.toLowerCase());if(ee.textContent=ue!==B.toLowerCase()?ue:B.replace(/_/g," ").replace(/\b\w/g,X=>X.toUpperCase())+":",Object.assign(ee.style,a.label),B==="SPEAKEASY_ID"){let X=document.createElement("button");X.innerHTML='<span style="font-size:12px; margin-right:4px;">\u2728</span>Auto Busca',X.style.cssText=`
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
          `,X.title="Localizar Speakeasy ID no hist\xF3rico",X.onmouseover=()=>{X.style.backgroundColor="#c2e7ff",X.style.boxShadow="0 1px 2px rgba(0,0,0,0.1)"},X.onmouseout=()=>{X.style.backgroundColor="#d3e3fd",X.style.boxShadow="none"},X.onmousedown=()=>{X.style.backgroundColor="#a8c7fa",X.style.transform="scale(0.96)"},X.onmouseup=()=>X.style.transform="scale(1)",X.onclick=xe=>{xe.preventDefault(),po(`field-${B}`)},ee.appendChild(X)}let re;lt.includes(B)?(re=document.createElement("textarea"),Object.assign(re.style,a.textarea),re.classList.add("bullet-textarea"),Tt(re)):Rt.includes(B)?(re=document.createElement("textarea"),Object.assign(re.style,a.textarea)):(re=document.createElement("input"),re.type="text",Object.assign(re.style,a.input),B==="REASON_COMMENTS"&&(v.startsWith("NI_")||v.startsWith("IN_"))&&(Object.assign(ee.style,{display:"none"}),Object.assign(re.style,{display:"none"}))),B==="ON_CALL"&&t==="lm"&&(Object.assign(ee.style,{display:"none"}),Object.assign(re.style,{display:"none"}),re.value="N/A"),re.id=`field-${B}`,De.appendChild(ee),De.appendChild(re)});let ie=Ee.querySelectorAll('input[type="checkbox"], input[type="radio"]');ie.length>0&&(ie.forEach($=>{$.removeEventListener("change",kt),$.addEventListener("change",kt)}),kt()),Ae.style.display="block",We[v]?je.style.display="block":je.style.display="none",Ke.style.display="flex";let te=g.getCheckedElements().map($=>$.value);r.updateVisibility(v,te)},he.onclick=()=>{he.style.display="none",Pe.style.display="block",g.selectionElement.style.display="block"};function Ut(){let v=A.value;if(!v)return null;let q=rt[v].template.replace(/\n/g,"<br>"),Z='style="margin-bottom: 12px; padding-left: 30px;"',ce=[],me="",Ce=g.getCheckedElements();Ce.length>0&&Ce.forEach(te=>{let $=te.value,B=Ge[$],ee=te.closest().querySelector(".stepper-count"),ue=ee?parseInt(ee.textContent):1;ue>1?ce.push(`${B.name} (x${ue})`):ce.push(B.name)});let ge=g.screenshotsElement;if(ge){let te=Array.from(ge.querySelectorAll('input[id^="name-"]'));te.length>0&&te.forEach($=>{let B=$.value,ee=$.closest(".cw-screen-card");if(ee){let ue=ee.querySelectorAll('input[id^="screen-"]'),re=!1,X="";ue.forEach(xe=>{let Wt=xe.closest(".cw-input-group"),Yt=Wt?Wt.querySelector(".cw-input-label"):null,No=Yt?Yt.textContent:"Evid\xEAncia",Xt=xe.value.trim(),_o=Xt?` ${Xt}`:"";X+=`<li>${No} -${_o}</li>`,re=!0}),re&&(me+=`<b>${B}</b>`,me+=`<ul ${Z}>${X}</ul>`)}})}if(q.includes("{TAGS_IMPLEMENTED}")?q=q.replace(/{TAGS_IMPLEMENTED}/g,ce.join(", ")||"N/A"):ce.length>0&&(q+=`<br><b>Tags:</b> ${ce.join(", ")}<br>`),q.includes("{SCREENSHOTS_LIST}")?q=q.replace(/{SCREENSHOTS_LIST}/g,me?`${me}`:"N/A"):me!==""&&(q+=`<br>${me}`),o==="pt"&&n){let te=Se.checked?Q("sim"):Q("nao");q=q.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${Q("consentiu_gravacao")}</b> ${te}<br><br>`),q=q.replace(/{CASO_PORTUGAL}/g,`<br><b>${Q("caso_portugal")}</b> ${Q("sim")}<br>`)}else o==="pt"&&!n?(q=q.replace(/{CASO_PORTUGAL}/g,`<br><b>${Q("caso_portugal")}</b> ${Q("nao")}<br>`),q=q.replace(/{CONSENTIU_GRAVACAO}/g,"")):(q=q.replace(/{CASO_PORTUGAL}/g,""),q=q.replace(/{CONSENTIU_GRAVACAO}/g,""));return De.querySelectorAll("input, textarea").forEach(te=>{let $=te.id.replace("field-",""),B=new RegExp(`{${$}}`,"g"),ee=te.value;if($==="REASON_COMMENTS"&&(v.startsWith("NI_")||v.startsWith("IN_"))){let X=Ee.querySelector('input[type="radio"]:checked');X&&ke[X.id]&&(ee=ke[X.id]["field-REASON_COMMENTS"])}if(lt.includes($)&&ee.trim()!==""){let X=ee.split(`
`).map(xe=>xe.trim()).filter(xe=>xe!==""&&xe!=="\u2022").map(xe=>xe.startsWith("\u2022 ")?xe.substring(2):xe).map(xe=>`<li>${xe}</li>`).join("");ee=X?`<ul ${Z}>${X}</ul>`:""}else Rt.includes($)?ee=ee.split(`
`).filter(X=>X.trim()!=="").map(X=>`<p style="margin: 0 0 8px 0;">${X}</p>`).join(""):te.tagName==="TEXTAREA"&&(ee=ee.replace(/\n/g,"<br>"));let ue=ee.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(ue===""||ue==="\u2022"||ue.toLowerCase()==="n/a"){let X=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${$}\\}(?:<br>\\s*)?`,"gi");X.test(q)?q=q.replace(X,""):q=q.replace(B,"")}else q=q.replace(B,ee.replace(/\$/g,"$$$$"))}),q=q.replace(/{([A-Z0-9_]+)}/g,""),q=q.replace(/(<br>){3,}/g,"<br><br>"),typeof r<"u"&&r.getOutput&&(q+=r.getOutput()),q}tt.onclick=()=>{let v=Ut();v?(ct(v),K(Q("copiado_sucesso"))):K(Q("selecione_substatus"),{error:!0})},ot.onclick=async()=>{let v=A.value,H=Ut();if(!H){K(Q("selecione_substatus"),{error:!0});return}ct(H),It();let q=xt(),Z=await wt();if(Z)try{if(Z.focus(),Z.innerHTML.trim()==="<p><br></p>"||Z.innerHTML.trim()==="<br>"||Z.innerText.trim()===""){let ge=document.createRange();ge.selectNodeContents(Z);let ie=window.getSelection();ie.removeAllRanges(),ie.addRange(ge),document.execCommand("delete",!1,null)}else if(!Z.innerHTML.endsWith("<br><br>")){let ge=document.createRange();ge.selectNodeContents(Z),ge.collapse(!1);let ie=window.getSelection();ie.removeAllRanges(),ie.addRange(ge),document.execCommand("insertHTML",!1,"<br><br>")}document.execCommand("insertHTML",!1,H),vt(Z),setTimeout(()=>{K(Q("inserido_copiado"))},600);let me=typeof Ve<"u"&&Ve?Ve.checked:!0;if(v&&We[v]&&me){let ge=We[v];await ft(ge),await new Promise(ie=>setTimeout(ie,500))}q(),Ot(1.5),z.value="",A.innerHTML=`<option value="">${Q("select_substatus")}</option>`,A.disabled=!0}catch(ce){console.error(ce),K("Erro ao inserir.",{error:!0}),q()}};function Ot(v=1.5){v<=1.5&&(Be.style.display="none",Ee.innerHTML=""),v<=2&&(g.reset(),he.style.display="none"),v<=3&&(Ae.style.display="none",De.innerHTML="",r.reset(),Ke.style.display="none",je.style.display="none")}function It(){if(s=!s,s){let v=d.querySelector(".cw-expand-btn");v&&typeof v.resetState=="function"&&v.resetState()}qe(s,d,"cw-btn-notes")}return St("bau"),Et("pt"),It}var Xe={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function To(){let e="v4.2.0 CR-Hybrid",t="CANNED_RESPONSES",o=Object.keys(Xe)[0],n="",s="list",i=!1,a={bgApp:"#F8F9FA",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.08)",borderFocus:"rgba(26, 115, 232, 0.4)",textPrimary:"#202124",textSecondary:"#5F6368",primary:"#1A73E8",primaryBg:"#E8F0FE",shadowCard:"0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",shadowHover:"0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",transition:"all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1)"},r={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:a.bgApp},g={display:"flex",width:"200%",height:"100%",transition:"transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",transform:"translateX(0)",willChange:"transform"},d={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},f={padding:"20px 24px 12px 24px",flexShrink:"0",background:a.bgApp,zIndex:"10",display:"flex",flexDirection:"column",gap:"16px",borderBottom:`1px solid ${a.borderSubtle}`},b={width:"100%",height:"44px",padding:"0 16px 0 48px",borderRadius:"12px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",fontWeight:"400",color:a.textPrimary,boxSizing:"border-box",outline:"none",transition:a.transition,boxShadow:"0 2px 5px rgba(0,0,0,0.03)",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%239AA0A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"16px center"},h={display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px",paddingBottom:"4px"},p={padding:"6px 14px",borderRadius:"100px",border:"1px solid #DADCE0",background:"#FFFFFF",color:a.textSecondary,fontSize:"13px",fontWeight:"500",letterSpacing:"0.3px",cursor:"pointer",transition:a.transition,flexShrink:"0",display:"flex",alignItems:"center",justifyContent:"center"},u={background:a.primaryBg,color:a.primary,borderColor:"transparent",fontWeight:"600",boxShadow:"0 1px 2px rgba(26, 115, 232, 0.15)"},E={padding:"16px 24px 80px 24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"12px"},T={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",height:"72px",minHeight:"72px",borderRadius:"16px",background:a.bgSurface,border:"1px solid transparent",boxShadow:a.shadowCard,cursor:"pointer",transition:"all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",position:"relative",overflow:"hidden"},R=document.createElement("div");R.id="quick-email-popup",R.classList.add("cw-module-window"),Object.assign(R.style,Te,{right:"100px",width:"440px",height:"640px",borderRadius:"20px",boxShadow:"0 24px 64px rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.4)"});let P={popup:R,googleLine:null,focusElement:null};function Y(){i=!i,qe(i,R,"cw-btn-email"),i||setTimeout(()=>m(),300)}let oe=Ie(R,"Quick Email",e,"Templates & Automa\xE7\xF5es",P,()=>Y()),S=document.createElement("div");Object.assign(S.style,r);let x=document.createElement("div");Object.assign(x.style,g);let y=document.createElement("div");Object.assign(y.style,d);let C=document.createElement("div");Object.assign(C.style,f);let O=document.createElement("input");O.placeholder="Pesquisar templates...",Object.assign(O.style,b),O.onfocus=()=>{O.style.borderColor=a.primary,O.style.boxShadow="0 0 0 4px rgba(26, 115, 232, 0.15)",O.style.background="#fff"},O.onblur=()=>{O.style.borderColor="transparent",O.style.boxShadow="0 2px 5px rgba(0,0,0,0.03)",O.style.background="#fff"},P.focusElement=O;let c=document.createElement("div");Object.assign(c.style,h);let M=document.createElement("div");Object.assign(M.style,E),C.appendChild(O),C.appendChild(c),y.appendChild(C),y.appendChild(M);let N=document.createElement("div");Object.assign(N.style,d);let G=document.createElement("div");Object.assign(G.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),N.appendChild(G),x.appendChild(y),x.appendChild(N),S.appendChild(x),R.appendChild(oe),R.appendChild(S),document.body.appendChild(R);async function z(L,U){try{i&&Y();let _=xt();await new Promise(I=>setTimeout(I,800)),U==="email"?await mo(L):U==="cr"&&await ft(L),_()}catch(_){console.error("\u274C Erro:",_);let I=document.querySelector(".cw-focus-backdrop");I&&I.classList.remove("active")}}function l(L){s="detail",x.style.transform="translateX(-50%)";let U='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',_='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';G.innerHTML=`
            <style>
                .cw-email-content p { margin: 0 0 8px 0; } /* Margem apenas embaixo */
                .cw-email-content ul { margin: 0 0 8px 16px; padding: 0; }
                .cw-email-content li { margin-bottom: 4px; }
            </style>

            <div style="position:sticky; top:0; background:rgba(255,255,255,0.9); backdrop-filter:blur(12px); border-bottom:1px solid #eee; padding:16px 24px; z-index:10; display:flex; align-items:center; gap:12px;">
                <button id="csa-back-btn" style="background:none; border:none; cursor:pointer; display:flex; color:#5f6368; padding:8px; margin-left:-12px; border-radius:50%; transition:background 0.2s;">${U}</button>
                <div style="font-weight:600; font-size:16px; color:#202124; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${L.name}</div>
            </div>
            
            <div style="padding:24px;">
                <div style="margin-bottom:24px;">
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Assunto</div>
                    <div style="font-size:14px; font-weight:500; color:#202124; padding:16px; background:#F8F9FA; border-radius:12px; border:1px solid #eee; box-shadow:inset 0 1px 2px rgba(0,0,0,0.02);">${L.subject}</div>
                </div>
                
                <div>
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Mensagem</div>
                    
                    <div class="cw-email-content" style="font-size:13px; color:#3c4043; line-height:1.5; white-space: normal; word-break: break-word; padding:0 4px;">
                        ${L.body}
                    </div>
                </div>
            </div>
            
            <div style="position:sticky; bottom:0; padding:24px; background:linear-gradient(to top, #fff 90%, rgba(255,255,255,0)); pointer-events:none;">
                <button id="csa-insert-btn" style="pointer-events:auto; width:100%; padding:14px; background:#1a73e8; color:white; border:none; border-radius:12px; font-size:14px; font-weight:600; cursor:pointer; display:flex; justify-content:center; align-items:center; gap:10px; box-shadow:0 4px 12px rgba(26,115,232,0.3); transition:transform 0.2s, box-shadow 0.2s;">
                    ${_} Usar Template
                </button>
            </div>
        `;let I=G.querySelector("#csa-back-btn");I.onmouseenter=()=>I.style.background="#f1f3f4",I.onmouseleave=()=>I.style.background="none",I.onclick=m;let D=G.querySelector("#csa-insert-btn");D.onmouseenter=()=>{D.style.transform="translateY(-1px)",D.style.boxShadow="0 6px 16px rgba(26,115,232,0.4)"},D.onmouseleave=()=>{D.style.transform="translateY(0)",D.style.boxShadow="0 4px 12px rgba(26,115,232,0.3)"},D.onclick=()=>{D.style.transform="scale(0.96)",z(L,"email"),setTimeout(()=>{D.style.transform="scale(1)",m()},300)}}function m(){s="list",x.style.transform="translateX(0)"}function w(L,U,_=null){let I=document.createElement("button"),D=_?`<span style="margin-right:6px; font-size:14px; opacity:0.9;">${_}</span>`:"";return I.innerHTML=`${D}${L}`,Object.assign(I.style,p),o===U&&n===""?Object.assign(I.style,u):(I.onmouseenter=()=>{I.style.background="#F1F3F4",I.style.borderColor="#DADCE0"},I.onmouseleave=()=>{I.style.background="#FFFFFF",I.style.borderColor="#DADCE0"}),I.onclick=()=>{o=U,n="",O.value="",A(),F()},I}function A(){c.innerHTML="",c.appendChild(w("Smart CRs",t,"\u26A1")),Object.keys(Xe).forEach(L=>{c.appendChild(w(Xe[L].title,L))})}function F(){M.innerHTML="";let L=[];if(n.trim()!==""){let V=n.toLowerCase();Object.values(Xe).forEach(k=>{k.emails.forEach(j=>{(j.name.toLowerCase().includes(V)||j.subject.toLowerCase().includes(V))&&L.push({type:"email",data:j})})}),Object.entries(We).forEach(([k,j])=>{if(!j)return;(k.replace(/_/g," ").toLowerCase().includes(V)||j.toLowerCase().includes(V))&&L.push({type:"cr",key:k,code:j})})}else o===t?Object.entries(We).forEach(([V,k])=>{k&&L.push({type:"cr",key:V,code:k})}):Xe[o]&&Xe[o].emails.forEach(V=>{L.push({type:"email",data:V})});if(L.length===0){M.innerHTML=`
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F50D}</div>
                    <div style="font-size:14px; font-weight:500;">Nenhum template encontrado</div>
                    <div style="font-size:12px; margin-top:4px;">Tente outro termo de busca</div>
                </div>`;return}let _='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1967D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',I='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA8600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',D='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BDC1C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';L.forEach(V=>{let k=document.createElement("div");if(Object.assign(k.style,T),V.type==="email"){let j=V.data,de=j.subject.length>45?j.subject.substring(0,45)+"...":j.subject;k.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#E8F0FE; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${_}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${j.name}</div>
                        <div style="font-size:12px; color:#5F6368; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${de}</div>
                    </div>
                    <div style="margin-left:12px; opacity:0.6;">${D}</div>
                `,k.onclick=()=>l(j)}else{let j=V.key.replace(/_/g," ").replace("AS ","AS - ").replace("NI ","NI - ");k.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#FEF7E0; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${I}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; margin-bottom:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${j}</div>
                        <div style="font-size:11px; font-weight:500; color:#EA8600; font-family:'Roboto Mono', monospace; letter-spacing:-0.2px;">${V.code}</div>
                    </div>
                    <div style="font-size:10px; font-weight:700; color:#DADCE0; text-transform:uppercase; letter-spacing:0.5px; border:1px solid #F1F3F4; padding:4px 8px; border-radius:6px; margin-left:12px;">Inserir</div>
                `,k.onclick=()=>{k.style.transform="scale(0.98)",k.style.background="#FEF7E0",setTimeout(()=>{k.style.transform="scale(1)",k.style.background="#fff",z(V.code,"cr")},150)}}k.onmouseenter=()=>{k.style.transform="translateY(-2px)",k.style.boxShadow=a.shadowHover,V.type==="cr"?k.style.borderLeft="3px solid #Fbbc04":k.style.borderLeft="3px solid #1a73e8"},k.onmouseleave=()=>{k.style.transform="translateY(0)",k.style.boxShadow=a.shadowCard,k.style.borderLeft="1px solid transparent"},M.appendChild(k)})}return O.addEventListener("input",L=>{n=L.target.value,n!==""?Array.from(c.children).forEach(U=>{Object.assign(U.style,p),U.style.opacity="0.6"}):A(),F()}),A(),F(),Y}var ko={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function Oo(){let e="v2.1 (Apple Motion)",t={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#f8f9fa",scrollBehavior:"smooth"},card:{background:"#ffffff",border:"1px solid #dadce0",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"13px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"10px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.15s ease, opacity 0.3s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.5",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"20px",height:"20px",borderRadius:"6px",border:"2px solid #dadce0",marginRight:"14px",marginTop:"1px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #eee",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"}},o={},n="PT",s="BAU",i=!1,a=document.createElement("div");a.id="call-script-popup",a.classList.add("cw-module-window"),Object.assign(a.style,Te,{right:"auto",left:"50%",width:"400px",height:"650px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let r={popup:a,googleLine:null};function g(){i=!i,qe(i,a,"cw-btn-script")}let d=Ie(a,"Call Script",e,"Guia interativo para condu\xE7\xE3o de chamadas.",r,()=>{g()});a.appendChild(d);let f=document.createElement("div");Object.assign(f.style,t.progressBarContainer);let b=document.createElement("div");Object.assign(b.style,t.progressBarFill),f.appendChild(b),a.appendChild(f);let h=document.createElement("div");h.id="csa-content",Object.assign(h.style,t.contentArea),a.appendChild(h);let p=document.createElement("div");Object.assign(p.style,t.footer);let u=document.createElement("span");u.textContent="by lucaste@",Object.assign(u.style,{fontSize:"10px",color:"#bdc1c6"});let E=document.createElement("button");E.innerHTML=`
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
    Resetar Script
  `,Object.assign(E.style,t.resetBtn),E.onmouseenter=()=>E.style.background="#fce8e6",E.onmouseleave=()=>E.style.background="transparent",E.onclick=()=>{E.style.transform="scale(0.9)",setTimeout(()=>E.style.transform="scale(1)",150);for(let N in o)delete o[N];C()},p.appendChild(u),p.appendChild(E),a.appendChild(p);let T=document.createElement("div");Object.assign(T.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let R=document.createElement("div");Object.assign(R.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let P=document.createElement("div");P.textContent="BAU";let Y=document.createElement("div");Y.textContent="LT",Object.assign(P.style,ye),Object.assign(Y.style,ye),R.appendChild(P),R.appendChild(Y);let oe=document.createElement("select");Object.assign(oe.style,io,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),oe.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',oe.value=n,T.appendChild(R),T.appendChild(oe),h.appendChild(T);let S=document.createElement("div");S.id="csa-checklist-area",h.appendChild(S);let x=document.createElement("div");Object.assign(x.style,Qe),x.className="no-drag",x.title="Redimensionar",a.appendChild(x),Ze(a,x),document.body.appendChild(a);function y(N){return N}function C(){S.innerHTML="";let N=`${n} ${s}`,G=ko[N];if(!G){S.innerHTML=`<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <div style="font-size: 24px;">\u2615</div>
        <div>Script n\xE3o configurado.</div>
      </div>`,b.style.width="0%";return}let z=G.color||"#1a73e8",l=0,m=0;["inicio","fim"].forEach(w=>{G[w]&&(l+=G[w].length)}),["inicio","fim"].forEach((w,A)=>{let F=G[w];if(!F||F.length===0)return;let L=document.createElement("div");Object.assign(L.style,t.card);let U=document.createElement("div");Object.assign(U.style,t.cardTitle);let _=w==="inicio"?"Abertura":"Fechamento";n.includes("ES")&&(_=w==="inicio"?"Apertura":"Cierre"),n.includes("EN")&&(_=w==="inicio"?"Opening":"Closing"),U.textContent=_;let I=document.createElement("span");I.style.fontSize="11px",I.style.opacity="0.7",I.style.fontWeight="500",I.style.background="#f1f3f4",I.style.padding="2px 8px",I.style.borderRadius="10px",U.appendChild(I),L.appendChild(U);let D=0;F.forEach((V,k)=>{let j=`${N}-${w}-${k}`,de=!!o[j];de&&(m++,D++);let ne=document.createElement("div");Object.assign(ne.style,t.itemRow);let ae=document.createElement("div");Object.assign(ae.style,t.checkbox);let le=document.createElement("span");le.innerHTML=V,le.style.flex="1",de?(Object.assign(ne.style,t.itemCompleted),ae.style.background=z,ae.style.borderColor=z,ae.style.transform="scale(1)",ae.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ne.style.textDecoration="none",ne.style.opacity="1",ae.style.background="transparent",ae.style.borderColor="#dadce0",ae.style.transform="scale(1)",ae.innerHTML=""),ne.onclick=()=>{let fe=!o[j];o[j]=fe,se.playClick(),fe?(ae.style.transform="scale(1.2)",setTimeout(()=>ae.style.transform="scale(1)",150),Object.assign(ne.style,t.itemCompleted),ae.style.background=z,ae.style.borderColor=z,ae.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ne.style.textDecoration="none",ne.style.opacity="1",ae.style.background="transparent",ae.style.borderColor="#dadce0",ae.innerHTML=""),O(N,G)},ne.onmouseenter=()=>{o[j]||(ne.style.background="#f1f3f4",ae.style.borderColor=z)},ne.onmouseleave=()=>{o[j]||(ne.style.background="transparent",ae.style.borderColor="#dadce0")},ne.appendChild(ae),ne.appendChild(le),L.appendChild(ne)}),D===F.length&&F.length>0&&(I.style.color="#1e8e3e",I.style.background="#e6f4ea",L.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),I.textContent=`${D}/${F.length}`,S.appendChild(L)}),c(l,m)}function O(N,G){let z=0,l=0;["inicio","fim"].forEach(m=>{let w=G[m]||[];z+=w.length;let A=0;w.forEach((F,L)=>{o[`${N}-${m}-${L}`]&&(l++,A++)})}),c(z,l),setTimeout(()=>C(),200)}function c(N,G){let z=N===0?0:G/N*100;b.style.width=`${z}%`,z===100?b.style.background="#34A853":b.style.background="linear-gradient(90deg, #4285F4, #34A853)"}function M(N){s=N;let G=it();Object.assign(P.style,ye),Object.assign(Y.style,ye),Object.assign(N==="BAU"?P.style:Y.style,G),C()}return P.onclick=()=>M("BAU"),Y.onclick=()=>M("LT"),oe.addEventListener("change",N=>{n=N.target.value,C()}),M(s),g}var At={tasks:{label:"Minhas Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico (Cognizant)"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda interna"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio de Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM Team & LT"},{name:"Performance Individual",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO (go/mymetricswebao)"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form para solicitar grava\xE7\xE3o da chamada."},{name:"Escala\xE7\xE3o de Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form para escala\xE7\xE3o de Sellers, compartilhado pelo gpozzi@."},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es para o split."}]},ads:{label:"Google Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page Application para suporte"},{name:"[SOP] Ads Conversion Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o de Convers\xE3o"},{name:"Win Criteria: Conversion Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Planilha de valida\xE7\xE3o de c\xF3digo"},{name:"[SOP] Website Call Conversion",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o de Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conversions",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"Convers\xF5es Otimizadas"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento de EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o de problemas de convers\xE3o"},{name:"Win Criteria: Troubleshooting",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=B4:B7",desc:"Valida\xE7\xE3o de Troubleshoot"},{name:"[SOP] Ads Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o de Remarketing"},{name:"[SOP] Dynamic Remarketing (Retail)",url:"https://docs.google.com/document/d/1NVGBhJ-bYAq-F-55Te2T7Kz1HOTuj0KZc-SBbdfyfyM/edit",desc:"Varejo"},{name:"[SOP] Customer Match",url:"https://docs.google.com/document/d/1945XuWXxAnfQyIBK0-46cPf2brxhbu1-mMbKjvs_EOU/edit",desc:"Lista de Clientes"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o de Leads"},{name:"[SOP] GTM Installation",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o do Container"}]},analytics:{label:"Analytics (GA4)",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o e Configura\xE7\xE3o"},{name:"Win Criteria: GA4 Setup",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce Guide",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia de Dev para E-comm"},{name:"[SOP] Troubleshooting GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o de Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"FAQs de Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista oficial de eventos"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador de URLs de campanha"}]},shopping:{label:"Shopping",links:[{name:"[SOP] Onboarding MC 2.0",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Optimization",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o de Feed BAU"},{name:"Consult ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna de Consult"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es de Produtos"},{name:"[SOP] Offline Feed (GSS)",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o de Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center Oficial"}]},tech:{label:"Tech Helper",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias de implementa\xE7\xE3o por CMS."},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es t\xE9cnicas para Iframes."},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost para Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost para Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost para GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta Gearloose"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost para Merchant Center"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground C\xF3digo"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador de Regex"},{name:"Gerador de Pessoas",url:"https://www.4devs.com.br/gerador_de_pessoas",desc:"Dados de teste (4Devs)"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. oficial sobre CSP"},{name:"Doc. Enhanced Conversion",url:"https://support.google.com/google-ads/answer/9888656?hl=en",desc:"Como funcionam as convers\xF5es otimizadas?"},{name:"Doc. CoMo",url:"https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=pt-br",desc:"Doc. oficial sobre Consent Mode"},{name:"Cursos SkillShop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos sobre as ferramentas do Google."},{name:"Consent Mode - Instala\xE7\xE3o",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Configurar o modo de consentimento em sites."},{name:"CMPs - Consent Mode",url:"https://cmppartnerprogram.withgoogle.com/",desc:"Lista com CMPS parceiros do Google."},{name:"Consent Mode - Testes",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Ensina como testar CoMo."}]},hr:{label:"RH / Cognizant",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal do Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha de Pagamento"}]},lm:{label:"LM Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas/pausas."},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro de chamadas longas."},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema."},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria."}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo."},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis."}]},suporte:{label:"Suportes",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"}]}};function Io(){let e="v3.1.0 Full",t="tasks",o="",n={bgApp:"#F8F9FA",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.08)",textPrimary:"#202124",textSecondary:"#5F6368",primary:"#1A73E8",primaryBg:"#E8F0FE",shadowCard:"0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",shadowHover:"0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",transition:"all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1)"},s={width:"100%",height:"40px",padding:"0 12px 0 40px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:n.textPrimary,boxSizing:"border-box",outline:"none",transition:n.transition,boxShadow:"0 2px 5px rgba(0,0,0,0.03)",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%239AA0A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center"},i={display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px",padding:"4px 0 12px 0"},a={padding:"6px 14px",borderRadius:"100px",border:"1px solid #DADCE0",background:"#FFFFFF",color:n.textSecondary,fontSize:"13px",fontWeight:"500",cursor:"pointer",whiteSpace:"nowrap",transition:n.transition,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:"0"},r={background:n.primaryBg,color:n.primary,borderColor:"transparent",fontWeight:"600",boxShadow:"0 1px 2px rgba(26, 115, 232, 0.15)"},g={display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px",padding:"12px 16px",marginBottom:"8px",borderRadius:"12px",background:n.bgSurface,border:"1px solid transparent",boxShadow:n.shadowCard,cursor:"pointer",transition:"transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.2s, border-color 0.2s",overflow:"hidden",minWidth:"0",opacity:"0",transform:"translateY(10px)"},d={width:"36px",height:"36px",flexShrink:"0",borderRadius:"10px",background:"#F1F3F4",color:n.textSecondary,display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s, color 0.2s"},f=document.createElement("div");f.id="feedback-popup",f.classList.add("cw-module-window"),Object.assign(f.style,Te,{right:"100px",width:"460px",height:"640px",background:n.bgApp});let b={tasks:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',lm:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>',ads:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>'},h={popup:f,googleLine:null,focusElement:null},p=!1,u=Ie(f,"Links & Bookmarks",e,"Acesso r\xE1pido \xE0s suas ferramentas, dashboards e documenta\xE7\xF5es.",h,()=>S());f.appendChild(u);let E=document.createElement("div");Object.assign(E.style,{padding:"20px 24px 12px 24px",display:"flex",flexDirection:"column",gap:"16px",borderBottom:`1px solid ${n.borderSubtle}`,flexShrink:"0",backgroundColor:n.bgApp});let T=document.createElement("input");T.type="text",T.placeholder="Pesquisar...",Object.assign(T.style,s),h.focusElement=T,T.onfocus=()=>{T.style.borderColor=n.primary,T.style.backgroundColor="#fff",T.style.boxShadow="0 0 0 4px rgba(26, 115, 232, 0.15)"},T.onblur=()=>{T.style.borderColor="transparent",T.style.backgroundColor="#fff",T.style.boxShadow="0 2px 5px rgba(0,0,0,0.03)"};let R=document.createElement("div");Object.assign(R.style,i),E.appendChild(T),E.appendChild(R),f.appendChild(E);let P=document.createElement("div");Object.assign(P.style,{padding:"16px 24px",overflowY:"auto",flexGrow:"1",backgroundColor:n.bgApp}),f.appendChild(P),document.body.appendChild(f);function Y(){R.innerHTML="",Object.keys(At).forEach(x=>{let y=At[x],C=document.createElement("button"),O=b[x]||"";C.innerHTML=`<span style="display:inline-flex; align-items:center; margin-right:6px; opacity:0.9;">${O}</span>${y.label}`,Object.assign(C.style,a),t===x&&o===""?Object.assign(C.style,r):(C.onmouseenter=()=>{C.style.background="#F1F3F4",C.style.borderColor="#DADCE0"},C.onmouseleave=()=>{C.style.background="#FFFFFF",C.style.borderColor="#DADCE0"}),C.onclick=()=>{t=x,o="",T.value="",Y(),oe()},R.appendChild(C)})}function oe(){P.innerHTML="";let x=[],y=o.trim()!=="";if(y?Object.entries(At).forEach(([C,O])=>{let c=O.links.filter(M=>M.name.toLowerCase().includes(o.toLowerCase())||M.desc.toLowerCase().includes(o.toLowerCase()));c.forEach(M=>{M._catIcon=b[C]}),x=[...x,...c]}):(x=At[t].links,x.forEach(C=>C._catIcon=b[t])),x.length===0){P.innerHTML=`
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:#9AA0A6;">
            <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F50D}</div>
            <div style="font-size:14px; font-weight:500;">Nenhum link encontrado</div>
        </div>`;return}x.forEach((C,O)=>{let c=document.createElement("div");Object.assign(c.style,g);let M=document.createElement("div");Object.assign(M.style,d),M.innerHTML=C._catIcon||'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',c.appendChild(M);let N=document.createElement("div");N.style.flexGrow="1",N.style.minWidth="0",N.style.display="flex",N.style.flexDirection="column",N.style.gap="2px";let G=F=>{if(!y)return F;let L=new RegExp(`(${o})`,"gi");return F.replace(L,'<span style="color:#1a73e8; font-weight:700;">$1</span>')},z=`<div style="font-size:14px; font-weight:600; color:${n.textPrimary}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${G(C.name)}</div>`,l=`<div style="font-size:12px; color:${n.textSecondary}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${G(C.desc)}</div>`;N.innerHTML=z+l,c.appendChild(N);let m=document.createElement("div");m.style.display="flex",m.style.alignItems="center",m.style.gap="8px",m.style.flexShrink="0",m.style.opacity="0.4",m.style.transition="opacity 0.2s";let w=document.createElement("div");w.title="Copiar Link",w.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',Object.assign(w.style,{width:"32px",height:"32px",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",color:n.textSecondary,cursor:"pointer",transition:"all 0.2s ease"}),w.onclick=F=>{se.playClick(),F.stopPropagation(),navigator.clipboard.writeText(C.url),w.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',w.style.color="#188038",w.style.background="#E6F4EA",setTimeout(()=>{w.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',w.style.color=n.textSecondary,w.style.background="transparent"},1500)},w.onmouseenter=()=>{w.style.background="#F1F3F4"},w.onmouseleave=()=>{w.style.background="transparent"},m.appendChild(w);let A=document.createElement("div");A.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>',Object.assign(A.style,{display:"flex",alignItems:"center",justifyContent:"center",color:"#DADCE0",width:"24px",height:"24px"}),m.appendChild(A),c.appendChild(m),c.onclick=()=>window.open(C.url,"_blank"),c.onmouseenter=()=>{c.style.transform="translateY(-2px)",c.style.boxShadow=n.shadowHover,m.style.opacity="1",M.style.background="#E8F0FE",M.style.color="#1967D2",A.style.color="#1A73E8"},c.onmouseleave=()=>{c.style.transform="translateY(0)",c.style.boxShadow=n.shadowCard,m.style.opacity="0.4",M.style.background="#F1F3F4",M.style.color=n.textSecondary,A.style.color="#DADCE0"},P.appendChild(c),requestAnimationFrame(()=>{setTimeout(()=>{c.style.opacity="1",c.style.transform="translateY(0)"},O*30)})})}T.addEventListener("input",x=>{o=x.target.value,o!==""?Array.from(R.children).forEach(y=>{Object.assign(y.style,a),y.style.opacity="0.6"}):Y(),oe()});function S(){p=!p,qe(p,f,"cw-btn-links")}return Y(),oe(),S}var ze=[];function Vt(e){ze=e}var $o=["lucaste"],Uo=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function qo(){let e="v4.9 (High Contrast UI)",t=!1,o=null,n=null;function s(l){if(!l)return"";try{let m=new Date(l);return isNaN(m.getTime())?String(l):m.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(l)}}if(!document.getElementById("cw-broadcast-hd-css")){let l=document.createElement("style");l.id="cw-broadcast-hd-css",l.innerHTML=`
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
      `,document.head.appendChild(l)}let i={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},a={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function r(l){return l?Object.entries(l).map(([m,w])=>`${m.replace(/[A-Z]/g,A=>"-"+A.toLowerCase())}:${w}`).join(";"):""}function g(l){if(!l||typeof l!="string")return"";let m=l;return m=m.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),m=m.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),m=m.replace(/_(.*?)_/g,"<i>$1</i>"),m=m.replace(/\n/g,"<br>"),m=ro(m),m}let d=document.createElement("div");d.id="broadcast-popup",d.classList.add("cw-module-window"),Object.assign(d.style,Te,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let f={popup:d,googleLine:null};function b(){if(t=!t,qe(t,d,"cw-btn-broadcast"),t){let l=document.getElementById("cw-btn-broadcast");l&&l.classList.remove("has-new"),y()}}let h=Ie(d,"Central de Avisos",e,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",f,()=>b()),p=h.querySelector(".cw-header-actions")||h.lastElementChild,u=null;function E(){let l=null;try{l=Zt()}catch{console.warn("TechSol: Auth Pending")}if(l){let m=l.split("@")[0].toLowerCase(),w=$o.includes(m);if(window._cwIsAdmin=w,window._cwCurrentUser=m,w&&p&&!p.querySelector("#cw-admin-btn")){let A=document.createElement("div");A.id="cw-admin-btn",A.className="cw-btn-interactive",A.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(A.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),A.title="Novo Aviso",A.onclick=F=>{F.stopPropagation(),P()},p.insertBefore(A,p.firstChild),u||R(),O()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(E,2e3))}if(p){let l=document.createElement("button");l.textContent="Limpar",l.className="cw-btn-interactive",Object.assign(l.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),l.onclick=m=>{m.stopPropagation(),se.playSuccess();let w=ze.map(A=>A.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(w)),O(),C()},p.insertBefore(l,p.firstChild)}d.appendChild(h);let T=document.createElement("div");T.id="cw-update-status",T.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",d.appendChild(T);function R(){u=document.createElement("div"),u.className="cw-editor-overlay",u.innerHTML=`
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
      `,u.querySelectorAll('input[name="cw-bc-type"]').forEach(A=>{A.addEventListener("change",()=>{u.querySelectorAll(".cw-radio-option").forEach(F=>F.classList.remove("checked")),A.parentElement.classList.add("checked")})}),setTimeout(()=>{let A=u.querySelector(".cw-radio-option.info");A&&A.classList.add("checked")},100);let l=u.querySelector("#cw-bc-cancel"),m=u.querySelector("#cw-bc-close-x"),w=u.querySelector("#cw-bc-send");l.onclick=Y,m.onclick=Y,w.onclick=oe,d.appendChild(u)}function P(l=null){if(!u)return;let m=u.querySelector("#cw-editor-title-label"),w=u.querySelector("#cw-bc-title"),A=u.querySelector("#cw-bc-text"),F=u.querySelector("#cw-bc-send");if(l){n=l.id,m.textContent="Editar Aviso",w.value=l.title||"",A.value=l.text||"",F.textContent="Salvar Altera\xE7\xF5es";let L=l.type||"info",U=u.querySelector(`input[name="cw-bc-type"][value="${L}"]`);U&&U.click()}else{n=null,m.textContent="Novo Aviso",w.value="",A.value="",F.textContent="Publicar";let L=u.querySelector('input[name="cw-bc-type"][value="info"]');L&&L.click()}u.classList.add("active"),setTimeout(()=>w.focus(),300)}function Y(){u&&u.classList.remove("active"),n=null}async function oe(){let l=u.querySelector("#cw-bc-send"),m=u.querySelector("#cw-bc-title"),w=u.querySelector("#cw-bc-text"),A=u.querySelector('input[name="cw-bc-type"]:checked'),F=A?A.value:"info";if(!m.value.trim()||!w.value.trim()){K("Preencha todos os campos!",{error:!0});return}l.textContent="Salvando...",l.style.opacity="0.7";let L=!1;n?L=await we.updateBroadcast(n,{title:m.value,text:w.value,type:F}):L=await we.sendBroadcast({title:m.value,text:w.value,type:F,author:window._cwCurrentUser||"admin"}),L?(K(n?"Atualizado!":"Publicado!"),se.playSuccess(),Y(),setTimeout(()=>y(),1500)):(K("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),l.textContent=n?"Salvar Altera\xE7\xF5es":"Publicar",l.style.opacity="1")}async function S(l){if(confirm("Confirma a exclus\xE3o deste aviso?"))if(await we.deleteBroadcast(l)){K("Aviso removido."),se.playClick();let w=ze.findIndex(A=>A.id===l);w>-1&&ze.splice(w,1),O(),setTimeout(()=>y(),1500)}else K("Erro ao excluir.",{error:!0})}let x=document.createElement("div");x.className="cw-nice-scroll",Object.assign(x.style,i.feedContainer),d.appendChild(x);async function y(){t&&(T.style.display="block",T.innerHTML="\u{1F504} Sincronizando...");try{let l=await we.fetchData();l&&l.broadcast&&(Vt(l.broadcast),C(),t&&(O(),T.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{T.style.display="none"},1500)))}catch{t&&(T.innerHTML="\u26A0\uFE0F Offline")}}function C(){let l=document.getElementById("cw-btn-broadcast");if(!l)return;let m=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(ze.some(A=>!m.includes(A.id))){if(l.classList.add("has-new"),!l.querySelector(".cw-badge")){let A=document.createElement("div");A.className="cw-badge",Object.assign(A.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),l.appendChild(A)}}else{l.classList.remove("has-new");let A=l.querySelector(".cw-badge");A&&A.remove()}}function O(){x.innerHTML="";let l=d.querySelector("#cw-bau-widget");l&&l.remove();let m=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),w=[...ze].sort((_,I)=>{let D=new Date(_.date).getTime()||0;return(new Date(I.date).getTime()||0)-D}),A=w.findIndex(_=>_.title&&_.title.toLowerCase().includes("disponibilidade bau"));if(A!==-1){let _=w[A];w.splice(A,1);let I=document.createElement("div");I.id="cw-bau-widget",Object.assign(I.style,i.bauContainer);let D=[],V=(_.text||"").split(`
`),k=/\d{1,2}\/\d{1,2}/;if(V.forEach(le=>{let fe=le.match(k);if(fe){let Se=fe[0],Ne="\u{1F4C5}";/🇧🇷|🇵🇹|PT|BR/i.test(le)?Ne="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(le)&&(Ne="\u{1F1EA}\u{1F1F8}"),D.some(Fe=>Fe.flag===Ne&&Fe.date===Se)||D.push({flag:Ne,date:Se})}}),D.length===0){let le=(_.text||"").match(/\d{1,2}\/\d{1,2}/g);le&&[...new Set(le)].forEach(fe=>D.push({flag:"\u{1F4C5}",date:fe}))}let j="",de='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(de=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${de}
              `),D.length>0?j=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${D.map(fe=>`
                  <div style="${r(i.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${r(i.bauFlag)}">${fe.flag}</span>
                      <span style="${r(i.bauDate)}">${fe.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${de}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${g(_.text)}</div>
              `:j=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${g(_.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,I.innerHTML=`
              <div style="${r(i.bauHeader)}; margin-bottom:8px;">
                  <div style="${r(i.liveIndicator)}">
                      <div style="${r(i.pulseDot)}"></div>
                      <span style="${r(i.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${s(_.date)}</div>
              </div>
              ${j}
          `,T.after(I);let ne=I.querySelector("#cw-bau-toggle-btn"),ae=I.querySelector("#cw-bau-full");if(ne&&ae&&(ne.onclick=()=>{let le=ae.style.display==="none";ae.style.display=le?"block":"none",ne.textContent=le?"Ocultar":"Detalhes"}),window._cwIsAdmin){let le=I.querySelector(".cw-bau-edit");le&&(le.onclick=()=>P(_))}}let F=w.sort((_,I)=>{let D=m.includes(_.id),V=m.includes(I.id);return D===V?0:D?1:-1});if(F.length===0&&!A){let _=document.createElement("div");Object.assign(_.style,i.emptyState),_.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,x.appendChild(_)}let L=F.filter(_=>!m.includes(_.id)),U=F.filter(_=>m.includes(_.id));if(L.forEach(_=>x.appendChild(c(_,!1))),U.length>0){let _=document.createElement("div");Object.assign(_.style,i.historyDivider),_.innerHTML=`<span>Hist\xF3rico (${U.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let I=document.createElement("div");Object.assign(I.style,i.historyContainer),U.forEach(V=>I.appendChild(c(V,!0)));let D=!1;_.onclick=()=>{se.playClick(),D=!D,I.style.display=D?"flex":"none",_.querySelector("svg").style.transform=D?"rotate(180deg)":"rotate(0deg)"},x.appendChild(_),x.appendChild(I)}}function c(l,m){let w=document.createElement("div");Object.assign(w.style,m?i.cardHistory:i.card);let A=a[l.type]||a.info,F=document.createElement("div");Object.assign(F.style,i.cardHeader);let L=document.createElement("div");Object.assign(L.style,i.typeTag,{color:A.color,background:A.bg}),L.innerHTML=`${A.icon} <span>${l.type}</span>`;let U=document.createElement("span");if(Object.assign(U.style,i.dateTag),U.textContent=s(l.date),F.appendChild(L),m)F.appendChild(U);else{let k=document.createElement("button");k.className="cw-btn-interactive",Object.assign(k.style,i.dismissBtn),k.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',k.onmouseenter=()=>{k.style.color="#1e8e3e",k.style.background="#e6f4ea",k.style.borderColor="#1e8e3e"},k.onmouseleave=()=>{k.style.color="#5f6368",k.style.background="#fff",k.style.borderColor="rgba(0,0,0,0.1)"},k.onclick=j=>{j.stopPropagation(),se.playClick(),w.style.transform="translateX(20px)",w.style.opacity="0",setTimeout(()=>{let de=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");de.push(l.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(de)),O(),C()},200)},F.appendChild(k)}let _=document.createElement("div");Object.assign(_.style,i.cardContent);let I=document.createElement("div");Object.assign(I.style,i.msgTitle),I.textContent=l.title;let D=document.createElement("div");Object.assign(D.style,i.msgBody),D.innerHTML=g(l.text);let V=document.createElement("div");if(Object.assign(V.style,i.msgMeta),V.innerHTML=`Publicado por <b>${l.author||"Sistema"}</b>`,m||(V.innerHTML+=` \u2022 ${s(l.date)}`),_.appendChild(I),_.appendChild(D),_.appendChild(V),w.appendChild(F),w.appendChild(_),window._cwIsAdmin){let k=document.createElement("div");k.className="cw-card-actions";let j=document.createElement("button");j.className="cw-action-btn edit",j.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',j.onclick=()=>P(l);let de=document.createElement("button");de.className="cw-action-btn delete",de.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',de.onclick=()=>S(l.id),k.appendChild(j),k.appendChild(de),w.appendChild(k)}return w}let M=we.getCachedBroadcasts();M.length>0&&(Vt(M),O()),setTimeout(E,500),y(),o||(o=setInterval(y,Uo));let N=document.createElement("div");Object.assign(N.style,Qe),N.className="no-drag",d.appendChild(N),Ze(d,N),document.body.appendChild(d);let G=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),z=ze.some(l=>!G.includes(l.id));return{toggle:b,hasUnread:z}}function Wo(){if(window.techSolInitialized){Lt();return}window.techSolInitialized=!0,console.log("\u{1F680} TechSol Suite Initializing...");try{no();try{se.initGlobalListeners(),se.playStartup()}catch(i){console.warn("\xC1udio n\xE3o p\xF4de ser iniciado automaticamente:",i)}we.fetchTips(),Lt();let e=Eo(),t=To(),o=Oo(),n=Io(),s=qo();ho({toggleNotes:e,toggleEmail:t,toggleScript:o,toggleLinks:n,broadcastControl:s})}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),K("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}Wo();})();
