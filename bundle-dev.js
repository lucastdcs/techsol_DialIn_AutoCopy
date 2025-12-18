(()=>{var at="",Gt=e=>new Promise(t=>setTimeout(t,e));async function Bt(){if(at)return at;try{let e=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!e)return"Agente";e.click(),await Gt(100);let t="Consultor",n=document.querySelector("profile-details .name");if(n)t=n.textContent.trim().split(" ")[0],t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();else{let o=document.querySelector("profile-details img");if(o&&o.src.includes("/photos/")){let r=o.src.match(/\/photos\/([^\?]+)/)[1];t=r.charAt(0).toUpperCase()+r.slice(1)}}return e.click(),document.body.click(),at=t,t}catch(e){return console.warn("Sherlock falhou:",e),"Consultor"}}function vt(){return at||"Consultor"}function zt(e){let t=new Date,n=t.getHours(),o=t.getDay(),r="Ol\xE1",a="";n>=5&&n<12?(r="Bom dia",a='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):n>=12&&n<18?(r="Boa tarde",a='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(r="Boa noite",a='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let i=[];n>=0&&n<5?i=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:n<12?o===1?i=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:o===5?i=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:i=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:n<18?i=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:i=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(o===0||o===6)&&(i=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let l=i[Math.floor(Math.random()*i.length)];return{prefix:`${r},`,name:e,suffix:l,icon:a,isFriday:o===5}}async function So(){try{let t=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!t)return null;let n=t.parentElement,o=n.querySelector(".unmask-button")||n.querySelector('[aria-label="Click to view"]');o&&(o.click(),await Gt(500));let a=Array.from(n.querySelectorAll("a, span, div, pii-value")).find(i=>{let l=i.innerText.trim();return l.includes("@")&&!l.includes("Is this:")&&l.toLowerCase()!=="email"});return a?a.innerText.trim():null}catch(e){return console.warn("Erro ao capturar email do cliente:",e),null}}function Co(){try{let e=document.querySelector('material-input[debug-id="account-id-input"]');if(e){let t=e.querySelector("input");if(t){let n=t.value.trim();if(n)return n.includes("@")?n:`${n}@google.com`}}}catch(e){console.warn("Erro ao capturar email interno:",e)}return null}async function At(){let e="Cliente",t="[INSERIR URL]";try{let a=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(a&&a.nextElementSibling){let i=a.nextElementSibling.innerText.trim();i&&(e=i)}}catch(r){console.warn("Falha Nome:",r)}try{let a=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(a&&a.nextElementSibling){let i=a.nextElementSibling.innerText.trim();i&&(t=i)}}catch(r){console.warn("Falha URL:",r)}let n=await So(),o=Co();return{advertiserName:e,websiteUrl:t,clientEmail:n,internalEmail:o,agentName:vt()}}var je=null,wt=null,Oe=.3;function ze(){if(!je){let e=window.AudioContext||window.webkitAudioContext;e&&(je=new e)}return je&&je.state==="suspended"&&je.resume(),je}function jt(e){if(wt)return wt;let t=e.sampleRate*2,n=e.createBuffer(1,t,e.sampleRate),o=n.getChannelData(0);for(let r=0;r<t;r++)o[r]=Math.random()*2-1;return wt=n,n}var Z={playClick:()=>{let e=ze();if(!e)return;let t=e.currentTime,n=e.createBufferSource();n.buffer=jt(e);let o=e.createBiquadFilter();o.type="highpass",o.frequency.value=4e3;let r=e.createGain();r.gain.setValueAtTime(Oe*.8,t),r.gain.exponentialRampToValueAtTime(.001,t+.015),n.connect(o),o.connect(r),r.connect(e.destination),n.start(t),n.stop(t+.02)},playHover:()=>{let e=ze();if(!e)return;let t=e.currentTime,n=e.createOscillator();n.type="sine",n.frequency.setValueAtTime(400,t);let o=e.createGain();o.gain.setValueAtTime(0,t),o.gain.linearRampToValueAtTime(Oe*.1,t+.005),o.gain.linearRampToValueAtTime(0,t+.02),n.connect(o),o.connect(e.destination),n.start(t),n.stop(t+.03)},playSuccess:()=>{let e=ze();if(!e)return;let t=e.currentTime;[1046.5,1567.9].forEach((o,r)=>{let a=e.createOscillator(),i=e.createGain();a.type="sine",a.frequency.value=o,i.gain.setValueAtTime(0,t),i.gain.linearRampToValueAtTime(Oe*.6,t+.05),i.gain.exponentialRampToValueAtTime(.001,t+.6),a.connect(i),i.connect(e.destination),a.start(t),a.stop(t+.7)})},playGenieOpen:()=>{let e=ze();if(!e)return;let t=e.currentTime,n=e.createBufferSource();n.buffer=jt(e);let o=e.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(100,t),o.frequency.exponentialRampToValueAtTime(800,t+.2);let r=e.createGain();r.gain.setValueAtTime(0,t),r.gain.linearRampToValueAtTime(Oe*.5,t+.05),r.gain.linearRampToValueAtTime(0,t+.25),n.connect(o),o.connect(r),r.connect(e.destination),n.start(t),n.stop(t+.3)},playError:()=>{let e=ze();if(!e)return;let t=e.currentTime,n=e.createOscillator(),o=e.createGain();n.type="triangle",n.frequency.setValueAtTime(120,t),n.frequency.exponentialRampToValueAtTime(80,t+.1),o.gain.setValueAtTime(Oe,t),o.gain.exponentialRampToValueAtTime(.001,t+.15),n.connect(o),o.connect(e.destination),n.start(t),n.stop(t+.2)},playStartup:()=>{let e=ze();if(!e)return;let t=e.currentTime,n=.12,o=e.createOscillator(),r=e.createGain(),a=e.createBiquadFilter();o.type="square",o.frequency.setValueAtTime(400,t),o.frequency.exponentialRampToValueAtTime(50,t+.1),a.type="lowpass",a.frequency.setValueAtTime(800,t),a.frequency.exponentialRampToValueAtTime(100,t+.1),r.gain.setValueAtTime(Oe*4,t),r.gain.exponentialRampToValueAtTime(.001,t+.1),o.connect(a),a.connect(r),r.connect(e.destination),o.start(t),o.stop(t+.12);let i=e.createOscillator(),l=e.createGain();i.type="sine",i.frequency.setValueAtTime(150,t),i.frequency.exponentialRampToValueAtTime(50,t+.15),l.gain.setValueAtTime(Oe*1.5,t),l.gain.exponentialRampToValueAtTime(.001,t+.15),i.connect(l),l.connect(e.destination),i.start(t),i.stop(t+.15),[55,55.4,110.5].forEach(p=>{let h=e.createOscillator(),u=e.createGain(),f=e.createBiquadFilter();h.type="sawtooth",h.frequency.value=p,f.type="lowpass",f.frequency.setValueAtTime(30,t),f.frequency.linearRampToValueAtTime(900,t+n+.2),f.frequency.exponentialRampToValueAtTime(40,t+3),u.gain.setValueAtTime(0,t),u.gain.linearRampToValueAtTime(Oe*.6,t+n+.1),u.gain.exponentialRampToValueAtTime(.001,t+3.5),h.connect(f),f.connect(u),u.connect(e.destination),h.start(t),h.stop(t+3.6)})},playNotification:()=>{let e=ze();if(!e)return;let t=e.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(o=>{let r=e.createOscillator(),a=e.createGain();r.type="sine",r.frequency.setValueAtTime(o.freq,t),a.gain.setValueAtTime(0,t),a.gain.linearRampToValueAtTime(Oe*o.vol,t+.004),a.gain.exponentialRampToValueAtTime(.001,t+o.dur),r.connect(a),a.connect(e.destination),r.start(t),r.stop(t+o.dur+.1)})},playSwoosh:()=>{Z.playGenieOpen()},playReset:()=>{Z.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let e=0,t=50;document.addEventListener("mouseover",n=>{if(!je)return;let o=n.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!o||o.contains(n.relatedTarget))return;let r=Date.now();r-e<t||(Z.playHover(),e=r)},{passive:!0})}};var Pt=1e4;function Vt(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
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
    `,document.head.appendChild(t)}function oe(e,t={}){let n=document.createElement("div"),o=t.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(n.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:o,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),n.textContent=e,document.body.appendChild(n),t.error?Z.playError():Z.playSuccess(),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>n.remove(),400)},t.duration||4e3)}function $t(e,t=null){let n=0,o=0,r=0,a=0,i=t||e;i.style.cursor="grab",i.onmousedown=l;function l(h){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(h.target.tagName)||h.target.closest(".no-drag"))return;h=h||window.event,i.style.cursor="grabbing",e.style.transition="none";let u=e.getBoundingClientRect();e.style.transform="none",e.style.left=u.left+"px",e.style.top=u.top+"px",e.style.margin="0",e.style.bottom="auto",e.style.right="auto",Pt++,e.style.zIndex=Pt,r=h.clientX,a=h.clientY,e.setAttribute("data-dragging","true"),document.onmouseup=p,document.onmousemove=b}function b(h){h=h||window.event,h.preventDefault(),n=r-h.clientX,o=a-h.clientY,r=h.clientX,a=h.clientY;let u=e.offsetTop-o,f=e.offsetLeft-n,_=16,v=window.innerWidth,A=window.innerHeight,O=e.offsetWidth,I=e.offsetHeight;f<_?f=_:f+O>v-_&&(f=v-O-_),u<_?u=_:u+I>A-_&&(u=A-I-_),e.style.top=u+"px",e.style.left=f+"px"}function p(){document.onmouseup=null,document.onmousemove=null,i.style.cursor="grab",setTimeout(()=>{e.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",e.setAttribute("data-dragging","false"),e.setAttribute("data-moved","true")},50)}}var Ae={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var Ct={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Ut={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var Wt={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var ge={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var St=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],Ht=-1;function Je(){let e=Math.floor(Math.random()*St.length);return e===Ht&&(e=(e+1)%St.length),Ht=e,St[e]}var qe=e=>new Promise(t=>setTimeout(t,e));async function Eo(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let n=e.querySelector(".cursor");await qe(200);for(let o=0;o<t.length;o++){let r=t.charAt(o),a=document.createElement("span");a.textContent=r,n&&n.parentNode===e?n.before(a):e.appendChild(a);let i=Math.floor(Math.random()*60)+30;o===0&&(i=150),o>t.length-3&&(i=30),await qe(i)}await qe(600),n&&(n.style.display="none")}async function Et(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
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
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await qe(200);let t=await Bt(),n=zt(t),o=e.querySelector("#w-icon"),r=e.querySelector("#p1"),a=e.querySelector("#p2"),i=e.querySelector("#p3"),l=e.querySelector("#p-sextou");o&&(o.innerHTML=n.icon),r&&(r.textContent=n.prefix),i&&(i.textContent=n.suffix),await qe(300);let b=o?o.querySelector("svg"):null;if(b&&(b.style.opacity="1",b.style.transform="scale(1)"),await qe(400),r&&(r.style.opacity="1"),Z.playStartup(),a&&await Eo(a,n.name),i&&(i.style.opacity="1",i.style.transform="translateY(0)"),n.isFriday&&l){await qe(400),l.style.display="block",l.offsetWidth;let p=l.querySelector(".sextou-badge");p&&(p.style.opacity="1",p.style.transform="scale(1)")}await qe(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await qe(900),e.parentNode&&e.parentNode.removeChild(e)}}var Ye={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Xe(e,t){t.onmousedown=n;function n(o){o.stopPropagation(),o.preventDefault();let r=e.style.transition;e.style.transition="none";let a=o.clientX,i=o.clientY,l=parseFloat(getComputedStyle(e,null).getPropertyValue("width").replace("px","")),b=parseFloat(getComputedStyle(e,null).getPropertyValue("height").replace("px","")),p=a,h=i,u=!1;function f(A){p=A.clientX,h=A.clientY,u||(window.requestAnimationFrame(()=>{_(),u=!1}),u=!0)}function _(){let A=l+(p-a),O=b+(h-i);A>360&&(e.style.width=A+"px"),O>300&&(e.style.height=O+"px")}function v(){document.removeEventListener("mousemove",f),document.removeEventListener("mouseup",v),setTimeout(()=>{e.style.transition=r},50)}document.addEventListener("mousemove",f),document.addEventListener("mouseup",v)}t.onmouseenter=()=>t.style.opacity="1",t.onmouseleave=()=>t.style.opacity="0.6"}function Yt(e){if(!e)return"";let t={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return e.replace(/:([a-zA-Z0-9-_+]+):/g,n=>t[n]?t[n]:"")}var et=e=>new Promise(t=>setTimeout(t,e));function it(e){e&&["mousedown","mouseup","click"].forEach(t=>e.dispatchEvent(new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window})))}var Xt="cw-automation-styles";if(!document.getElementById(Xt)){let e=document.createElement("style");e.id=Xt,e.innerHTML=`
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
    `,document.head.appendChild(e)}function Kt(e){let t=document.getElementById("cw-loading-overlay");e?t?t.style.opacity="1":(t=document.createElement("div"),t.id="cw-loading-overlay",document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1")):t&&(t.style.opacity="0",setTimeout(()=>t.remove(),300))}async function Qt(e){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let t=document.getElementById(e),n="";Kt(!0),t&&(n=t.placeholder,t.placeholder="Buscando ID...",t.value="",t.classList.add("cw-scanning-active"));try{let o=document.querySelector('material-button[debug-id="dock-item-case-log"]');o&&!o.classList.contains("selected")&&(it(o),await et(1200));let r=document.querySelector("search-filter dropdown-button .button");if(r&&!(r.innerText||"").includes("All")){it(r),await et(600);let u=document.querySelector('material-checkbox[debug-id="check-all-box"]');u&&u.getAttribute("aria-checked")!=="true"&&(it(u),await et(300));let f=document.querySelector('material-button[debug-id="apply-filter"]');f&&(it(f),await et(1500))}let a=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");a&&(a.scrollTop=a.scrollHeight,await et(500));let l=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body")),b=/Speakeasy.*?(P\d{15,25})/i,p=null;for(let h=l.length-1;h>=0;h--){let u=l[h];if(u.offsetParent===null)continue;let f=(u.innerText||"").match(b);if(f&&f[1]){p=f[1];break}}if(t)if(p){try{await navigator.clipboard.writeText(p)}catch{}t.value=p,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),Z.playSuccess(),oe(`ID Localizado: ${p}`),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}else Z.playError(),oe("Nenhum ID encontrado.",{error:!0}),t.placeholder="N\xE3o encontrado",t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}catch(o){console.error("Erro na automa\xE7\xE3o:",o),oe("Erro ao processar.",{error:!0})}finally{t&&(t.classList.remove("cw-scanning-active"),t.value||(t.placeholder=n)),Kt(!1)}}var Ie={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:"}},_e={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},tt={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>Substatus:</b> DC - Other<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br>Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},Pe={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},ot=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],Tt=["CONSIDERACOES","COMENTARIOS"],we={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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

Irei abrir caso em BAU para o dia solicitado e pedir descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo.`}};var de=e=>new Promise(t=>setTimeout(t,e));function be(e,t="info"){let n={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${e}`,n[t]||n.info)}function Se(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>e.dispatchEvent(new MouseEvent(n,t)))}function st(e,t){if(!e)return;let n=`cw-warning-${e.id||Math.random().toString(36).substr(2,9)}`,o=document.getElementById(n);o&&o.remove();let r=e.getBoundingClientRect(),a=document.createElement("div");a.id=n,a.style.cssText=`
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
    `;let i=a.querySelector(".cw-close-btn");i.onclick=()=>{a.style.opacity="0",a.style.transform="translateY(-5px)",setTimeout(()=>a.remove(),300)},document.body.appendChild(a),requestAnimationFrame(()=>{a.style.opacity="1",a.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(a)&&i.click()},25e3)}async function rt(e,t){if(!e||!t)return;e.focus(),e.value="",e.dispatchEvent(new Event("input",{bubbles:!0})),await de(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),await de(100),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function kt(){let t=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(n=>{let o=n.offsetParent!==null,r=n.closest("case-message-view")!==null,a=n.closest(".editor")!==null||n.closest("write-card")!==null;return o&&!r&&a});return t&&be("Editor visualmente detectado.","success"),t}async function Zt(){be("\u{1F680} FASE 1: Tentando abrir a janela de email...");let e=!1,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(u=>u.innerText.trim()==="email");if(n&&n.offsetParent!==null){be("Bot\xE3o de email direto encontrado.");let u=n.closest("material-button")||n.closest("material-fab")||n;Se(u),e=!0}else{be("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let u=document.querySelector("material-fab-speed-dial");if(u){let f=u.querySelector(".trigger");if(f){Se(f),await de(800);let v=Array.from(document.querySelectorAll("i.material-icons-extended")).find(A=>A.innerText.trim()==="email");v&&(Se(v),e=!0)}}}if(!e)return oe("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;be("\u{1F680} FASE 2: Verificando rascunhos...");let o=null,r=0,a=20;for(;r<a;){await de(250);let u=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(o=Array.from(u).find(f=>f.offsetParent!==null),o){be("\u26A0\uFE0F Rascunho detectado!","warn");break}r++}if(o){be("\u{1F5D1}\uFE0F Descartando..."),Se(o),o.click();let u=null,f=0;for(;f<15;){await de(300);let _=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(u=Array.from(_).find(v=>v.offsetParent!==null),u)break;f++}u&&(Se(u),oe("Limpando rascunho antigo...",{duration:2e3}),await de(2500))}be("\u{1F680} FASE 3: Buscando editor final...");let i=0,l=null;for(;i<20&&(l=kt(),!l);)await de(250),i++;if(!l)return oe("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let b=l.closest('[id="email-body-content-top"]'),h=(l.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(b){if(h){let f=h.closest('[aria-hidden="true"]');f&&f.removeAttribute("aria-hidden"),h.focus(),Se(h)}await de(300),b.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let u=b.querySelector("#cases-body-field");if(u){let f=document.createRange();f.selectNodeContents(u),f.collapse(!0);let _=window.getSelection();_.removeAllRanges(),_.addRange(f)}return!0}return!1}async function lt(e){if(!e||!await Zt())return;let n=await At();be("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let o=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(o&&(o.click(),await de(600)),n.clientEmail&&n.clientEmail!=="N/A"&&n.clientEmail!=="N/A (Bloqueado)"){let a=document.querySelector('input[aria-label="Enter To email address"]');a&&(await rt(a,n.clientEmail),st(a,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(n.internalEmail){let a=document.querySelector('input[aria-label="Enter Bcc email address"]');a&&(await rt(a,n.internalEmail),st(a,`
                <strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.
                <div style="margin-top:4px;">
                    <a href="https://mail.google.com/mail/u/0?ui=2&ik=ed23fb3167&attid=0.1&permmsgid=msg-f:1843445102914241244&th=19953b8dda2302dc&view=fimg&fur=ip&permmsgid=msg-f:1843445102914241244&sz=s0-l75-ft&attbid=ANGjdJ9m7O33cM36sxBYohVD6Qsapyux4PNr8qmTBlZ8zkp_LR79suGZhnxFJtBoFDeyMFygsH_tvCts5fnX0WV4rdClw9YqqR7guLnaXU9UzmZRRMRXEoC7T_MPbwo&disp=emb&realattid=ii_mfmv7wjm1&zw" target="_blank" style="color:#1a73e8;text-decoration:none;font-weight:500;display:inline-flex;align-items:center;">
                        Consultar Regra <span style="font-size:14px;margin-left:2px;">\u2197</span>
                    </a>
                </div>
            `))}await de(500);let r=document.querySelector('material-button[debug-id="canned_response_button"]');if(r){Se(r),await de(1e3);let a=document.querySelector("material-auto-suggest-input input");if(a){Se(a),document.execCommand("insertText",!1,e),a.dispatchEvent(new Event("input",{bubbles:!0})),be("\u23F3 Buscando resultado da Canned Response...","info");let i=null,l=0,b=15e3,p=500;for(;l<b&&(i=document.querySelector("material-select-dropdown-item"),!i);)await de(p),l+=p;if(i){Se(i),await de(1500);let h=kt();if(h&&n.advertiserName){let u=h.innerHTML;u.includes("{%ADVERTISER_NAME%}")&&(h.innerHTML=u.replace(/{%ADVERTISER_NAME%}/g,n.advertiserName))}oe("Canned Response aplicada!")}else be(`\u274C Timeout: Resultado '${e}' n\xE3o apareceu ap\xF3s 15s.`,"error"),oe(`Timeout: Template '${e}' n\xE3o carregou.`,{error:!0})}}else oe("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function Jt(e){if(be(`\u{1F680} Iniciando Quick Email: ${e.name}`),!await Zt())return;let n=await At(),o=vt();await de(600),be("\u{1F4E7} Processando destinat\xE1rios...");let r=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(r&&(r.click(),await de(600)),n.clientEmail&&n.clientEmail!=="N/A"&&n.clientEmail!=="N/A (Bloqueado)"){let l=document.querySelector('input[aria-label="Enter To email address"]');l&&(await rt(l,n.clientEmail),st(l,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(n.internalEmail){let l=document.querySelector('input[aria-label="Enter Bcc email address"]');l&&(await rt(l,n.internalEmail),st(l,`
                <strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.
                <div style="margin-top:4px;">
                    <a href="https://mail.google.com/mail/u/0?ui=2&ik=ed23fb3167&attid=0.1&permmsgid=msg-f:1843445102914241244&th=19953b8dda2302dc&view=fimg&fur=ip&permmsgid=msg-f:1843445102914241244&sz=s0-l75-ft&attbid=ANGjdJ9m7O33cM36sxBYohVD6Qsapyux4PNr8qmTBlZ8zkp_LR79suGZhnxFJtBoFDeyMFygsH_tvCts5fnX0WV4rdClw9YqqR7guLnaXU9UzmZRRMRXEoC7T_MPbwo&disp=emb&realattid=ii_mfmv7wjm1&zw" target="_blank" style="color:#1a73e8;text-decoration:none;font-weight:500;display:inline-flex;align-items:center;">
                        Consultar Regra <span style="font-size:14px;margin-left:2px;">\u2197</span>
                    </a>
                </div>
            `))}let a=document.querySelector('input[aria-label="Subject"]');a&&e.subject&&(a.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(a,e.subject),a.dispatchEvent(new Event("input",{bubbles:!0})),await de(300));let i=kt();if(i){let b=(i.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');b&&(b.focus(),Se(b));let p=new Date;p.setDate(p.getDate()+3);let h=p.getDay();h===6?p.setDate(p.getDate()+2):h===0&&p.setDate(p.getDate()+1);let u=p.toLocaleDateString("pt-BR"),f=e.body;f=f.replace(/\[Nome do Cliente\]/g,n.advertiserName||"Cliente"),f=f.replace(/\[INSERIR URL\]/g,n.websiteUrl||"seu site"),f=f.replace(/\[URL\]/g,n.websiteUrl||"seu site"),f=f.replace(/\[Seu Nome\]/g,o),f=f.replace(/\[MM\/DD\/YYYY\]/g,u),document.execCommand("insertHTML",!1,f),b&&(b.dispatchEvent(new Event("input",{bubbles:!0})),b.dispatchEvent(new Event("change",{bubbles:!0}))),oe("Email preenchido com sucesso!",{duration:2e3}),be("\u2705 Processo finalizado com sucesso.","success")}else oe("Erro ao focar no editor.",{error:!0})}var To={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},eo={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function Ce(e,t,n,o,r,a){let i=document.createElement("div");Object.assign(i.style,To),$t(e,i);let l=document.createElement("div");Object.assign(l.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),i.appendChild(l),r&&(r.googleLine=l);let b=document.createElement("div");Object.assign(b.style,{display:"flex",alignItems:"center",gap:"12px"});let p=document.createElement("img");p.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(p.style,{width:"20px",height:"20px",pointerEvents:"none"});let h=document.createElement("span");h.textContent=t,b.appendChild(p),b.appendChild(h);let u=document.createElement("div");Object.assign(u.style,{display:"flex",alignItems:"center",gap:"4px"});let f='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',_='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',v=document.createElement("div");v.innerHTML=f,Object.assign(v.style,eo),v.title="Sobre",v.classList.add("no-drag"),v.onmouseenter=()=>{v.style.background="rgba(255,255,255,0.1)",v.style.color="#FFF"},v.onmouseleave=()=>{v.style.color!=="rgb(138, 180, 248)"&&(v.style.background="transparent",v.style.color="#9AA0A6")};let A=document.createElement("div");A.innerHTML=_,Object.assign(A.style,eo),A.title="Fechar",A.classList.add("no-drag"),A.onmouseenter=()=>{A.style.background="rgba(242, 139, 130, 0.2)",A.style.color="#F28B82"},A.onmouseleave=()=>{A.style.background="transparent",A.style.color="#9AA0A6"},A.onmousedown=I=>I.stopPropagation(),v.onmousedown=I=>I.stopPropagation(),A.onclick=a;let O=ko(e,t,n,o);return v.onclick=I=>{I.stopPropagation(),O.style.opacity==="1"?(O.style.opacity="0",O.style.pointerEvents="none",v.style.color="#9AA0A6",v.style.background="transparent"):(O.style.opacity="1",O.style.pointerEvents="auto",v.style.color="#8AB4F8",v.style.background="rgba(138, 180, 248, 0.1)")},u.appendChild(v),u.appendChild(A),i.appendChild(b),i.appendChild(u),i}function ko(e,t,n,o){let r=document.createElement("div");return Object.assign(r.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(5px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),r.innerHTML=`
        <div style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${t}</div>
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
    `,document.head.appendChild(e)}function Ee(e,t,n){let o=document.getElementById(n);if(!t)return;let r=t.getAttribute("data-moved")==="true",a={x:0,y:0};if(o){let h=o.getBoundingClientRect();a.x=h.left+h.width/2,a.y=h.top+h.height/2}let i,l;if(!r)i=window.innerWidth/2,l=window.innerHeight/2;else{let h=t.getBoundingClientRect();i=h.left+h.width/2,l=h.top+h.height/2,i===0&&l===0&&(i=window.innerWidth/2,l=window.innerHeight/2)}let b=a.x-i,p=a.y-l;e?(Z.playGenieOpen(),t.style.transition="none",t.style.opacity="0",t.style.pointerEvents="auto",r?t.style.transform=`translate(${b}px, ${p}px) scale(0.05)`:t.style.transform=`translate(calc(-50% + ${b}px), calc(-50% + ${p}px)) scale(0.05)`,t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("open"),o&&o.classList.add("active"),t.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",t.style.opacity="1",r?t.style.transform="translate(0, 0) scale(1)":t.style.transform="translate(-50%, -50%) scale(1)"}),typeof to=="function"&&to(t,n)):(Z.playSwoosh(),t.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",t.style.pointerEvents="none",requestAnimationFrame(()=>{t.style.opacity="0",r?t.style.transform=`translate(${b}px, ${p}px) scale(0.1)`:t.style.transform=`translate(calc(-50% + ${b}px), calc(-50% + ${p}px)) scale(0.1)`}),setTimeout(()=>{t.classList.remove("open"),o&&o.classList.remove("active"),t.style.transition="",t.style.transform=""},300),typeof Ot=="function"&&Ot(t))}function to(e,t){Ot(e);let n=o=>{if(!e.classList.contains("open"))return;let r=e.contains(o.target),a=document.querySelector(".cw-pill"),i=a&&a.contains(o.target);r?(e.classList.remove("idle"),e.style.zIndex="2147483648"):i||(e.classList.add("idle"),e.style.zIndex="2147483646")};e._idleHandler=n,document.addEventListener("mousedown",n)}function Ot(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}var ao="https://script.google.com/a/macros/google.com/s/AKfycbwxxY5EhL3U1ZIEvs_y28FFeIFr7rMfSzNIljclqPd9Mk58-gx7pBRfZ8pQmXt2P1IMjw/exec",qt="cw_data_broadcast",oo="cw_data_tips",Oo=["Processando sua solicita\xE7\xE3o...","Dica: Mantenha suas notas organizadas.","Aguarde um momento...","Quase l\xE1..."];function no(e){return new Promise((t,n)=>{let o="cw_cb_"+Math.round(1e4*Math.random()),r=document.createElement("script");window[o]=a=>{document.body.removeChild(r),delete window[o],t(a)},r.src=`${ao}?op=${e}&callback=${o}&t=${Date.now()}`,r.onerror=()=>{document.body.removeChild(r),delete window[o],n(new Error("JSONP Load Error"))},document.body.appendChild(r)})}var He={fetchTips:async()=>{try{console.log("\u{1F4E5} Baixando dicas via JSONP...");let e=await no("tips");e&&e.tips&&Array.isArray(e.tips)&&(localStorage.setItem(oo,JSON.stringify(e.tips)),console.log("\u2705 Dicas atualizadas:",e.tips.length))}catch(e){console.warn("TechSol: Erro ao baixar dicas (Offline).",e)}},fetchData:async()=>{try{console.log("\u{1F4E5} Baixando Broadcasts via JSONP...");let e=await no("broadcast");if(e&&e.broadcast)return localStorage.setItem(qt,JSON.stringify(e.broadcast)),console.log("\u2705 Broadcasts atualizados:",e.broadcast.length),e}catch(e){console.warn("TechSol: Erro ao buscar Broadcasts.",e)}return{broadcast:JSON.parse(localStorage.getItem(qt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(qt)||"[]"),getRandomTip:()=>{let e=Oo,t=localStorage.getItem(oo);if(t)try{e=JSON.parse(t)}catch{}return e[Math.floor(Math.random()*e.length)]},logUsage:(e,t="")=>{let o={op:"log",user:window._USER_ID||"agente_anonimo",action:e,meta:t};fetch(ao,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(o)}).catch(r=>console.log("Log fail",r))}};var Re={glassBg:"rgba(61, 61, 61, 0.95)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00"},ct=e=>new Promise(t=>setTimeout(t,e));function io(e){let t="cw-command-center-style";if(!document.getElementById(t)){let C=document.createElement("style");C.id=t,C.innerHTML=`
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@500&display=swap');

        /* --- F\xCDSICA DA ANIMA\xC7\xC3O --- */
        :root {
            /* Curva de mola mais "seca" e premium para a abertura */
            --spring-open: cubic-bezier(0.25, 1, 0.5, 1);
            /* Curva r\xE1pida para fechar */
            --spring-close: cubic-bezier(0.65, 0.05, 0.36, 1);
        }

        .cw-focus-backdrop {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.3); backdrop-filter: blur(4px);
            z-index: 2147483646; opacity: 0; pointer-events: none;
            transition: opacity 0.4s ease;
        }
        .cw-focus-backdrop.active { opacity: 1; pointer-events: auto; }

        /* --- P\xCDLULA (Container) --- */
        .cw-pill {
            position: fixed; top: 100px; right: 24px;
            display: flex; flex-direction: column; align-items: center; 
            
            /* --- REVIS\xC3O DE ESPA\xC7AMENTO --- */
            width: 48px;  /* Mais estreita (era 56px) */
            padding: 6px; /* Padding mais justo (era 8px) */
            gap: 8px;     /* Gap mais compacto (era 12px) */
            
            background: ${Re.glassBg};
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid ${Re.glassBorder}; 
            
            /* Raio ajustado para a nova largura */
            border-radius: 24px; 
            
            /* Sombra mais t\xE9cnica e definida */
            box-shadow: 
                0 2px 4px rgba(0,0,0,0.1),
                0 12px 28px rgba(0,0,0,0.25);
            
            z-index: 2147483647;
            overflow: hidden;

            transition: 
                max-height 0.6s var(--spring-open),
                background 0.3s ease,
                opacity 0.4s ease,
                transform 0.1s linear, top 0.1s linear, left 0.1s linear;
            
            max-height: 600px;
            opacity: 0; transform: translateX(20px);
        }
        
        .cw-pill.docked { opacity: 1; transform: translateX(0); }

        /* --- ESTADO COLAPSADO --- */
        .cw-pill.collapsed {
            /* Altura = Padding Top(6) + Header(36) + Padding Bottom(6) + Ajuste de Borda = ~50px */
            max-height: 50px !important; 
            background: rgba(25, 25, 25, 0.98);
            border-color: rgba(255,255,255,0.15);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            transition: max-height 0.5s var(--spring-close);
        }

        /* --- HEADER DA MARCA (Grip) --- */
        .cw-brand-header {
            width: 36px; height: 36px; /* Menor para caber na p\xEDlula estreita */
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
            z-index: 20;
            cursor: grab;
            
            border-radius: 12px; /* Squircle sutil */
            transition: background 0.3s ease, transform 0.2s ease;
        }
        
        .cw-brand-header:active { cursor: grabbing; transform: scale(0.95); }
        .cw-brand-header:hover { background: rgba(255,255,255,0.08); }

        /* \xCDcone da Marca */
        .cw-brand-icon {
            width: 22px; height: 22px;
            color: #fff;
            /* Brilho t\xE9cnico mais focado */
            filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.5));
            transition: transform 0.5s var(--spring-open);
        }

        /* Rota\xE7\xE3o e Feedback ao Hover */
        .cw-brand-header:hover .cw-brand-icon {
            transform: rotate(45deg); /* Rota\xE7\xE3o mais mec\xE2nica */
        }

        .cw-pill.collapsed .cw-brand-icon {
            transform: rotate(0deg); /* Estado de repouso quando fechado */
        }
        .cw-pill.collapsed .cw-brand-header:hover .cw-brand-icon {
             transform: rotate(45deg); /* Gira ao passar o mouse para abrir */
        }

        /* --- CONTAINER DOS M\xD3DULOS --- */
        .cw-modules-container {
            display: flex; flex-direction: column; align-items: center; gap: 10px; /* Gap interno ligeiramente maior */
            width: 100%;
            padding-bottom: 4px;
            
            opacity: 1;
            transform: translateY(0);
            transition: opacity 0.3s ease 0.15s, transform 0.5s var(--spring-open);
        }
        
        .cw-pill.collapsed .cw-modules-container {
            opacity: 0; 
            pointer-events: none;
            transform: translateY(-20px) scale(0.95);
            transition: opacity 0.15s ease, transform 0.2s var(--spring-close);
        }

        /* --- BOT\xD5ES --- */
        .cw-btn {
            width: 36px; height: 36px; /* Bot\xF5es menores para a p\xEDlula estreita */
            flex-shrink: 0;
            border-radius: 12px; /* Squircle em vez de c\xEDrculo perfeito */
            border: none; background: transparent;
            display: flex; align-items: center; justify-content: center; 
            cursor: pointer; position: relative; 
            color: ${Re.iconIdle};
            transition: all 0.2s ease;
        }
        
        /* \xCDcones baseados em linha (Stroke) precisam de stroke-width */
        .cw-btn svg { 
            width: 20px; height: 20px; 
            fill: none; 
            stroke: currentColor; 
            stroke-width: 2; 
            stroke-linecap: round; stroke-linejoin: round;
            pointer-events: none; 
        }

        .cw-btn:hover { 
            background: rgba(255, 255, 255, 0.12); 
            color: #fff;
        }

        /* Cores Ativas (Borda brilhante e fundo sutil) */
        .cw-btn.active { color: #fff !important; background: rgba(255, 255, 255, 0.05); }
        .cw-btn.notes.active { box-shadow: inset 0 0 0 1px ${Re.blue}; }
        .cw-btn.email.active { box-shadow: inset 0 0 0 1px ${Re.red}; }
        .cw-btn.script.active { box-shadow: inset 0 0 0 1px ${Re.purple}; }
        .cw-btn.links.active { box-shadow: inset 0 0 0 1px ${Re.green}; }
        .cw-btn.broadcast.active { box-shadow: inset 0 0 0 1px ${Re.orange}; }

        /* Separador */
        .cw-sep { 
            width: 20px; height: 1px; 
            background: rgba(255,255,255,0.1); 
            margin: 4px 0; flex-shrink: 0;
        }

        /* Badge */
        .cw-badge {
            position: absolute; top: -2px; right: -2px; width: 10px; height: 10px;
            background-color: #ff453a; border-radius: 50%;
            border: 2px solid var(--glass-bg);
            pointer-events: none; z-index: 10;
            animation: popIn 0.4s var(--spring-open);
        }
        @keyframes popIn { from { transform: scale(0); } to { transform: scale(1); } }

        /* Tooltips Laterais */
        .cw-tooltip {
            position: absolute; right: 58px; top: 50%; transform: translateY(-50%) translateX(10px);
            background: rgba(25, 25, 25, 0.95); 
            color: #fff; padding: 5px 10px; border-radius: 6px;
            font-size: 12px; font-weight: 500; font-family: 'Google Sans', sans-serif;
            opacity: 0; pointer-events: none; transition: all 0.2s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1);
            white-space: nowrap; letter-spacing: 0.3px;
        }
        .cw-btn:hover .cw-tooltip, .cw-brand-header:hover .cw-tooltip {
            opacity: 1; transform: translateY(-50%) translateX(0);
        }
        
        .cw-pill.side-left .cw-tooltip { right: auto; left: 58px; transform: translateY(-50%) translateX(-10px); }
        .cw-pill.side-left .cw-btn:hover .cw-tooltip { transform: translateY(-50%) translateX(0); }

        /* Processing Center (Mantido) */
        .cw-pill.processing-center {
            width: 280px !important; height: auto !important; max-height: 80px !important;
            padding: 20px !important; border-radius: 40px !important;
            flex-direction: row !important; gap: 16px !important;
            background: #111 !important;
        }
    `,document.head.appendChild(C)}let n={nexus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3m-2.83-7.17l2.12-2.12M4.93 19.07l2.12-2.12M19.07 19.07l-2.12-2.12M7.05 4.93L4.93 7.05"/></svg>',notes:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>',email:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',script:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1m4 4v10a2 2 0 0 1-2 2h-2m2-12l-4-4m4 4h-4"/></svg>',links:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',broadcast:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 2L6 7H2v10h4l5 5V2z"/><line x1="22" y1="10" x2="22" y2="14"/><path d="M18 6a9 9 0 0 1 0 12"/></svg>',check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'},o=document.createElement("div");o.className="cw-pill side-right",o.innerHTML=`
<div class="cw-brand-header" id="cw-header-trigger" title="Segure para mover, Clique para fechar">
        <div class="cw-brand-icon">${n.nexus}</div>
    </div>
    <button class="cw-btn notes" id="cw-btn-notes" data-hint="Notas">${n.notes}</button>
    <button class="cw-btn email" id="cw-btn-email" data-hint="Emails">${n.email}</button>
    <button class="cw-btn script" id="cw-btn-script" data-hint="Script">${n.script}</button>
    <button class="cw-btn links" id="cw-btn-links" data-hint="Links">${n.links}</button>
    
    <div class="cw-sep"></div>
    
    <button class="cw-btn broadcast" id="cw-btn-broadcast" data-hint="Avisos">${n.broadcast}</button>

    <div class="cw-status-container">
        <div class="cw-dots" id="cw-loader"><span></span><span></span><span></span></div>
        <div class="cw-check" id="cw-success" style="display:none;">${n.check}</div>
    </div>
  `;let r=document.createElement("div");r.className="cw-focus-backdrop",document.body.appendChild(r),document.body.appendChild(o);let a=o.querySelector("#cw-main-label"),i=C=>{a.textContent=C,a.classList.add("visible")},l=()=>{a.classList.remove("visible")};if(o.querySelectorAll("button").forEach(C=>{C.addEventListener("mouseenter",()=>i(C.getAttribute("data-hint"))),C.addEventListener("mouseleave",l)}),o.querySelector(".notes").onclick=C=>{C.stopPropagation(),e.toggleNotes()},o.querySelector(".email").onclick=C=>{C.stopPropagation(),e.toggleEmail()},o.querySelector(".script").onclick=C=>{C.stopPropagation(),e.toggleScript()},o.querySelector(".links").onclick=C=>{C.stopPropagation(),e.toggleLinks()},o.querySelector(".broadcast").onclick=C=>{C.stopPropagation();let q=C.currentTarget.querySelector(".cw-badge");q&&(q.style.transform="scale(0)",setTimeout(()=>q.remove(),200)),e.broadcastControl&&e.broadcastControl.toggle()},e.broadcastControl&&e.broadcastControl.hasUnread){let C=document.createElement("div");C.className="cw-badge",o.querySelector(".broadcast").appendChild(C)}let p=!1,h,u,f,_,v=3,A=!1;o.onmousedown=C=>{if(C.target.closest("button"))return;C.preventDefault(),h=C.clientX,u=C.clientY;let q=o.getBoundingClientRect();f=q.left,_=q.top,p=!1,document.addEventListener("mousemove",O),document.addEventListener("mouseup",I)};function O(C){let q=C.clientX-h,m=C.clientY-u;!p&&Math.sqrt(q*q+m*m)>v&&(p=!0,o.style.transition="none"),p&&(o.style.left=`${f+q}px`,o.style.top=`${_+m}px`,o.style.right="auto",o.style.bottom="auto",o.style.transform="none")}function I(C){if(document.removeEventListener("mousemove",O),document.removeEventListener("mouseup",I),o.style.transition="max-height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",p){p=!1;let q=window.innerWidth,m=window.innerHeight,g=o.getBoundingClientRect(),s=g.left+g.width/2,c;s<q/2?(c=24,o.classList.remove("side-right"),o.classList.add("side-left")):(c=q-g.width-24,o.classList.remove("side-left"),o.classList.add("side-right"));let y=g.top;y<24&&(y=24),y>m-g.height-24&&(y=m-g.height-24),o.style.left=`${c}px`,o.style.top=`${y}px`}else C.target.closest(".cw-brand-header")&&D()}function D(){A=!A,A?o.classList.add("collapsed"):o.classList.remove("collapsed")}(async function(){await ct(2800),o.classList.add("docked"),await ct(300);let q=o.querySelectorAll(".cw-btn");for(let m=0;m<q.length;m++)q[m].classList.add("popped"),await ct(90);await ct(200),o.classList.add("system-check")})()}function dt(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop");if(!e)return()=>{};let n=document.createElement("div");n.className="cw-center-stage",n.innerHTML=`
        <div class="cw-center-dots"><span></span><span></span><span></span></div>
        <div class="cw-center-text">${He.getRandomTip()}</div>
        <div class="cw-center-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
    `,e.appendChild(n);let o=Date.now();return e.classList.add("processing-center"),t&&t.classList.add("active"),function(){let a=Date.now()-o,i=Math.max(0,2e3-a);setTimeout(()=>{let l=n.querySelector(".cw-center-dots"),b=n.querySelector(".cw-center-text"),p=n.querySelector(".cw-center-success");l&&(l.style.display="none"),b&&(b.style.display="none"),p&&p.classList.add("show"),e.classList.add("success"),setTimeout(()=>{e.classList.remove("processing-center"),setTimeout(()=>{n.remove(),e.classList.remove("success"),t&&t.classList.remove("active")},400)},1e3)},i)}}function so(e){let t=document.createElement("div");t.className="cw-step-scenarios";let n=document.createElement("div");Object.assign(n.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let o=document.createElement("div");Object.assign(o.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"40px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s ease"}),o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>";let r=null;Object.entries(we).forEach(([i,l])=>{let b=document.createElement("div");b.textContent=i,Object.assign(b.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",display:"flex",alignItems:"center",gap:"6px"}),b.onmouseenter=()=>{r!==l&&(o.style.background="#fff",o.style.borderColor="#1a73e8",o.style.color="#202124",o.textContent=`"${l.substring(0,120)}${l.length>120?"...":""}"`),r!==l&&(b.style.background="#f1f3f4")},b.onmouseleave=()=>{r!==l&&(r||(o.style.background="#f8f9fa",o.style.borderColor="#dadce0",o.style.color="#5f6368",o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>"),b.style.background="#ffffff")},b.onclick=()=>{Z.playClick(),r===l?(r=null,a(),e("")):(r=l,a(),b.style.transform="scale(0.95)",setTimeout(()=>b.style.transform="scale(1)",150),e(l))},n.appendChild(b)});function a(){Array.from(n.children).forEach(i=>{we[i.textContent]===r?(i.style.background="#e8f0fe",i.style.borderColor="#1a73e8",i.style.color="#1967d2",i.style.fontWeight="500"):(i.style.background="#ffffff",i.style.borderColor="#dadce0",i.style.color="#3c4043",i.style.fontWeight="400")})}return t.appendChild(n),t.appendChild(o),t}var ro=e=>new Promise(t=>setTimeout(t,e));function pt(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>e.dispatchEvent(new MouseEvent(n,t)))}function It(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let n=document.createRange();n.selectNodeContents(t);let o=window.getSelection();o.removeAllRanges(),o.addRange(n);try{document.execCommand("copy")}catch{oe("Falha ao copiar",{error:!0})}o.removeAllRanges(),document.body.removeChild(t)}function co(e){["input","change","keydown","keyup"].forEach(n=>{let o=new Event(n,{bubbles:!0,cancelable:!0});e.dispatchEvent(o)})}function lo(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function po(){console.log("Iniciando processo de Nova Nota...");let e=lo(),t=e.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(i=>i.innerText.trim()==="description");if(o){let i=o.closest("material-fab")||o.closest("material-button");i?(i.style&&(i.style.display="block",i.style.visibility="visible"),pt(i)):pt(o)}else{let i=document.querySelector("material-fab-speed-dial");if(i){let l=i.querySelector(".trigger");l?(l.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),pt(l)):i.click(),await ro(800);let p=Array.from(document.querySelectorAll("i.material-icons-extended")).find(h=>h.innerText.trim()==="description");p&&pt(p)}}let r=null,a=0;for(;!r&&a<20;){await ro(300);let i=lo();if(i.length>t)r=i.find(l=>!e.includes(l)),r||(r=i[i.length-1]);else if(a>10){let l=i.filter(b=>b.offsetParent!==null);l.length>0&&(r=l[l.length-1])}a++}return r}var U={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},Te="cubic-bezier(0.25, 0.8, 0.25, 1)",qo={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${U.border}`,backgroundColor:U.bgInput,fontSize:"14px",color:U.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${Te}, box-shadow 0.2s ${Te}, background-color 0.2s`,outline:"none"},rn={...qo,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},ln={fontSize:"13px",fontWeight:"700",color:U.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},cn={display:"block",fontSize:"13px",fontWeight:"600",color:U.text,marginBottom:"8px",marginTop:"16px"},dn={fontSize:"12px",color:U.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},pn={fontSize:"12px",color:U.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},un={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:U.text,cursor:"pointer",padding:"12px 14px",backgroundColor:U.surface,border:`1px solid ${U.border}`,borderRadius:"12px",transition:`all 0.2s ${Te}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},Nt={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:U.primary},mn={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:U.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${Te}, box-shadow 0.2s ${Te}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},gn={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${U.primary}`,color:U.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${Te}`},bn={background:"transparent",border:`1px solid ${U.border}`,borderRadius:"20px",color:U.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${Te}`,fontFamily:"'Google Sans', 'Roboto'"};var fn={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:U.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},hn={fontSize:"13px",fontWeight:"700",color:U.primary,minWidth:"20px",textAlign:"center"},xn={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${U.border}`,backgroundColor:U.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${Te}, box-shadow 0.2s ${Te}`},yn={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${U.bgInput}`},vn={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${U.border}`,backgroundColor:U.surface,color:U.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${Te}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},An={backgroundColor:U.primaryBg,color:U.primary,borderColor:U.primary,fontWeight:"600"},wn={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:U.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},Sn={borderTop:`1px solid ${U.bgInput}`,paddingTop:"20px",marginTop:"16px"};var Cn={maxHeight:"240px",overflowY:"auto",border:`1px solid ${U.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:U.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},En={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${U.bgInput}`,cursor:"pointer",fontSize:"13px",color:U.text,transition:"background 0.1s",userSelect:"none"};var Io={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},No={fontSize:"12px",color:"#e37400",marginTop:"4px"},_o={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},Ro={display:"flex",gap:"15px",marginBottom:"10px"};function uo(){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,Io);let t=document.createElement("label");t.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(t.style,Ct,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,Ro);let o=document.createElement("input");o.type="radio",o.name="ts_usage_mod",o.value="Sim",Object.assign(o.style,Nt);let r=document.createElement("label");r.textContent="Sim";let a=document.createElement("div");Object.assign(a.style,{display:"flex",alignItems:"center"}),a.appendChild(o),a.appendChild(r);let i=document.createElement("input");i.type="radio",i.name="ts_usage_mod",i.value="N\xE3o",i.checked=!0,Object.assign(i.style,Nt);let l=document.createElement("label");l.textContent="N\xE3o";let b=document.createElement("div");Object.assign(b.style,{display:"flex",alignItems:"center"}),b.appendChild(i),b.appendChild(l),n.appendChild(a),n.appendChild(b);let p=document.createElement("div");p.style.display="block";let h=document.createElement("label");h.textContent="Qual foi o Motivo?",Object.assign(h.style,Ct,{fontSize:"12px"});let u=document.createElement("input");u.type="text",Object.assign(u.style,_o);let f=document.createElement("div");f.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(f.style,No),p.appendChild(h),p.appendChild(u),p.appendChild(f),e.appendChild(t),e.appendChild(n),e.appendChild(p),o.onchange=()=>{p.style.display="none"},i.onchange=()=>{p.style.display="block"};function _(O,I){if(e.style.display="none",!O||O.includes("Education")||!I||I.length===0)return;let D=I.some(s=>s.includes("enhanced")||s==="ec_google_ads"),C=I.some(s=>(s.includes("conversion")||s.includes("ads"))&&!s.includes("enhanced")),q=I.some(s=>s.includes("ga4")||s.includes("analytics")||s.includes("ua")),m=I.some(s=>s.includes("merchant")||s.includes("gmc")||s.includes("shopping"));(D||C&&!q&&!m)&&(e.style.display="block")}function v(){if(e.style.display==="none")return"";let O=`<br><b>Utilizou Tag Support?</b> ${o.checked?"Sim":"N\xE3o"}`;return i.checked&&u.value.trim()!==""&&(O+=`<br><b>Motivo:</b> ${u.value}`),O+="<br>",O}function A(){e.style.display="none",i.checked=!0,o.checked=!1,p.style.display="block",u.value=""}return{element:e,updateVisibility:_,getOutput:v,reset:A}}var B={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Ve={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function mo(e){let t={},n="implementation";function o(m){let g=m.toLowerCase();return g.includes("ads")||g.includes("conversion")||g.includes("remarketing")?B.brands.ads:g.includes("ga4")||g.includes("analytics")?B.brands.ga4:g.includes("gtm")||g.includes("tag manager")||g.includes("container")?B.brands.gtm:g.includes("merchant")||g.includes("shopping")||g.includes("feed")?B.brands.gmc:B.brands.default}let r=Object.entries(_e).filter(([m,g])=>g.popular),a={};Object.entries(_e).forEach(([m,g])=>{if(g.popular)return;let s=o(g.name);a[s.label]||(a[s.label]={brand:s,tasks:[]}),a[s.label].tasks.push({key:m,...g})});let i="cw-zen-tasks";if(!document.getElementById(i)){let m=document.createElement("style");m.id=i,m.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column; height: 100%; width: calc(100% + 32px); margin: -16px;
                font-family: ${B.font}; background: ${B.bg}; position: relative; overflow: hidden;
            }
            
            /* SCROLL AREA */
            .cw-zen-content { flex: 1; overflow-y: auto; padding-bottom: 80px; } /* Espa\xE7o para o Status Bar */

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${B.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${B.white}; 
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
                font-size: 12px; font-weight: 500; color: ${B.textMain}; line-height: 1.2; 
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
                color: ${B.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${B.border}; border-radius: 10px; background: ${B.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${B.blue}; box-shadow: 0 0 0 3px ${B.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${B.border}; border-radius: 10px; background: ${B.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${B.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${B.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${B.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${B.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${B.blueLight}; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${B.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${B.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${B.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${B.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${B.border};
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${B.shadowFloat}; z-index: 10;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${B.textMain}; }
            
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
                font-family: ${B.font}; font-size: 15px; font-weight: 600; color: ${B.textMain};
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
                border-color: ${B.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${B.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${B.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${B.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 10px; font-weight: 700; color: ${B.textSub};
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
        `,document.head.appendChild(m)}let l=document.createElement("div");l.className="cw-zen-container";let b=document.createElement("div");Object.assign(b.style,{display:"none"});let p=document.createElement("div");p.className="cw-screens-container",b.appendChild(p),l.innerHTML=`
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
    `;let h=l.querySelector(".cw-hero-grid"),u=l.querySelector(".cw-acc-container"),f=l.querySelector(".cw-results-container"),_=l.querySelector(".cw-search-input"),v=l.querySelector(".cw-status-bar"),A=l.querySelector(".cw-status-text"),O=l.querySelector(".cw-footer-icons");r.forEach(([m,g])=>{let s=o(g.name),c=document.createElement("div");c.className="cw-hero-card",c.id=`hero-${m}`,c.style.setProperty("--hero-color",s.color),c.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${Ve[s.icon]}</div>
                <div class="cw-hero-label">${g.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,c.onclick=y=>{if(y.target.closest(".cw-step-btn"))return;let d=t[m]?t[m].count:0;D(m,d>0?-d:1,g)},c.querySelector(".minus").onclick=()=>D(m,-1,g),c.querySelector(".plus").onclick=()=>D(m,1,g),c.dataset.color=s.color,h.appendChild(c)});function I(m,g){let s=o(g.name),c=document.createElement("div");return c.className="cw-task-item",c.dataset.id=m,c.innerHTML=`
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
        `,c.onclick=y=>{if(y.target.closest(".cw-step-btn"))return;let d=t[m]?t[m].count:0;D(m,d>0?-d:1,g)},c.querySelector(".minus").onclick=()=>D(m,-1,g),c.querySelector(".plus").onclick=()=>D(m,1,g),c}Object.entries(a).forEach(([m,g])=>{let s=document.createElement("div");s.className="cw-acc-group";let c=document.createElement("div");c.className="cw-acc-header",c.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${g.brand.color}"></div>
                ${m}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,c.onclick=()=>{u.querySelectorAll(".cw-acc-group.open").forEach(d=>{d!==s&&d.classList.remove("open")}),s.classList.toggle("open")};let y=document.createElement("div");y.className="cw-acc-body",g.tasks.forEach(d=>{let x=I(d.key,d);y.appendChild(x)}),s.appendChild(c),s.appendChild(y),u.appendChild(s)});function D(m,g,s){t[m]||(t[m]={count:0,data:s,brand:o(s.name)}),t[m].count+=g,t[m].count<=0&&delete t[m],C(),q(),e&&e()}function C(){r.forEach(([y])=>{let d=h.querySelector(`#hero-${y}`);if(!d)return;let x=t[y];x?(d.classList.add("active"),d.querySelector(".cw-step-val").textContent=x.count,d.querySelector(".cw-step-val").style.color=d.dataset.color):d.classList.remove("active")}),l.querySelectorAll(".cw-task-item").forEach(y=>{let d=y.dataset.id,x=t[d];x?(y.classList.add("selected"),y.querySelector(".cw-step-val").textContent=x.count):y.classList.remove("selected")});let g=Object.keys(t),s=0,c=[];if(g.forEach(y=>{let d=t[y];s+=d.count;for(let x=0;x<d.count;x++)c.length<6&&c.push(d.brand)}),s>0){v.classList.add("visible");let y=s>1?"A\xE7\xF5es":"A\xE7\xE3o",d=s>1?"definidas":"definida";A.textContent=`${s} ${y} ${d}`,O.innerHTML="",c.forEach(x=>{let k=document.createElement("div");k.className="cw-mini-icon",k.innerHTML=Ve[x.icon]||Ve.default;let w=k.querySelector("svg");w&&(w.style.width="14px",w.style.height="14px"),O.appendChild(k)})}else v.classList.remove("visible")}_.addEventListener("input",m=>{let g=m.target.value.toLowerCase();if(g.length>0){u.style.display="none",f.style.display="block",f.innerHTML="";let s=!1;Object.entries(_e).forEach(([c,y])=>{if(y.name.toLowerCase().includes(g)){s=!0;let d=I(c,y);t[c]&&(d.classList.add("selected"),d.querySelector(".cw-step-val").textContent=t[c].count),f.appendChild(d)}}),s||(f.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else u.style.display="block",f.style.display="none"});function q(){p.innerHTML="";let m=Object.keys(t),g=!1,s=document.getElementById("sub-status"),c="implementation";if(s&&s.value.toLowerCase().includes("education")&&(c="education"),m.length===0){p.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}if(m.length===0){p.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}let y=document.createElement("div");y.className="cw-info-banner",y.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Todos os Screenshots s\xE3o baseados na descri\xE7\xE3o do 
                <a href="https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/" target="_blank" class="cw-info-link">Win Criteria</a>.
            </span>
        `,p.appendChild(y),m.forEach(d=>{let x=t[d].data,k=t[d].count,w=t[d].brand,T=x.screenshots?x.screenshots[c]||[]:["Link da Evid\xEAncia"];if(T.length>0){g=!0;for(let ne=1;ne<=k;ne++){let z=document.createElement("div");z.className="cw-screen-card",z.style.setProperty("--brand-color",w.color),z.style.setProperty("--brand-bg",w.bg),z.style.setProperty("--brand-shadow",w.color+"40");let L=document.createElement("div");L.className="cw-card-header";let M=document.createElement("div");M.className="cw-card-icon",M.innerHTML=Ve[w.icon]||Ve.default;let P=document.createElement("div");P.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let X=document.createElement("input");X.className="cw-card-title-input",X.id=`name-${d}-${ne}`,X.value=`${x.name}${k>1?" #"+ne:""}`,X.title="Clique para renomear esta task";let H=document.createElement("span");H.className="cw-edit-hint",H.innerHTML="\u270E Renomear",P.appendChild(X),P.appendChild(H),L.appendChild(M),L.appendChild(P),z.appendChild(L),T.forEach((fe,W)=>{let R=document.createElement("div");R.className="cw-input-group";let J=document.createElement("label");J.className="cw-input-label",J.textContent=fe.replace(/📷|:|•/g,"").trim();let re=document.createElement("input");re.className="cw-input-field",re.id=`screen-${d}-${ne}-${W}`,re.placeholder="Cole o link aqui...",re.setAttribute("autocomplete","off"),re.addEventListener("input",()=>{re.value.trim().length>5?re.classList.add("filled"):re.classList.remove("filled")});let me=document.createElement("div");me.className="cw-input-check",me.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',R.appendChild(J),R.appendChild(re),R.appendChild(me),z.appendChild(R)}),p.appendChild(z)}}}),b.style.display=g?"block":"none"}return{selectionElement:l,screenshotsElement:b,updateSubStatus:()=>q(),getCheckedElements:()=>Object.keys(t).map(m=>({value:m,closest:()=>({querySelector:()=>({textContent:t[m].count})})})),toggleTask:(m,g=!0)=>{let s=t[m];g&&!s?D(m,1,_e[m]):!g&&s&&D(m,-s.count,_e[m])},setMode:m=>{n=m,q()},reset:()=>{for(let m in t)delete t[m];_.value="",u.style.display="block",f.style.display="none",C(),q()}}}function go(){let e="v3.6.0",t="bau",n="pt",o=!1,r=!1,a={input:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},textarea:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease",height:"100px",resize:"vertical"},h3:{fontSize:"14px",fontWeight:"600",color:"#202124",margin:"0 0 12px 0"},label:{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},checkboxLabel:{display:"flex",alignItems:"center",marginBottom:"10px",fontSize:"14px",fontWeight:"400",cursor:"pointer",padding:"8px",background:"#f8f9fa",borderRadius:"6px",transition:"background-color 0.2s ease, box-shadow 0.2s ease",userSelect:"none"},checkboxInput:{width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"},buttonBase:{flex:"1 1 0",padding:"10px 0",color:"#fff",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"500",cursor:"pointer",marginTop:"16px"},stepBlock:{borderTop:"1px solid #eee",paddingTop:"12px",marginTop:"12px"},radioContainer:{display:"flex",gap:"15px",marginBottom:"10px"},optionalBtn:{width:"100%",padding:"10px",background:"white",border:"1px dashed #1a73e8",color:"#1a73e8",borderRadius:"6px",cursor:"pointer",fontWeight:"500",fontSize:"13px",marginBottom:"10px",transition:"all 0.2s"},helpLink:{fontSize:"12px",color:"#1a73e8",textDecoration:"none",cursor:"pointer",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"color 0.2s"}},i=uo(),l=mo(()=>{let F=l.getCheckedElements().map(E=>E.value);w&&w.value&&i.updateVisibility(w.value,F)}),b=document.createElement("div");b.id="autofill-popup",b.classList.add("cw-module-window"),Object.assign(b.style,Ae,{right:"100px",width:"400px",transition:"width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)"});let h=Ce(b,"Case Notes Assistant",e,"Gera notas padronizadas automaticamente. Selecione o status, as tasks realizadas e preencha os detalhes para inserir no caso.",{popup:b,googleLine:null},()=>yt());b.appendChild(h);let u=document.createElement("div");Object.assign(u.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1"}),b.appendChild(u);let f=document.createElement("div");f.textContent="created by lucaste@",Object.assign(f.style,Wt),b.appendChild(f);let _=document.createElement("div");_.id="step-lang-type";let v=document.createElement("label");Object.assign(v.style,a.label),_.appendChild(v);let A=document.createElement("div");Object.assign(A.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let O=document.createElement("div");O.textContent="Portugu\xEAs",O.classList.add("no-drag"),Object.assign(O.style,ge);let I=document.createElement("div");I.textContent="Espa\xF1ol",I.classList.add("no-drag"),Object.assign(I.style,ge),O.onclick=()=>bt("pt"),I.onclick=()=>bt("es"),A.appendChild(O),A.appendChild(I),_.appendChild(A),u.appendChild(_);let D=document.createElement("div");D.id="step-0-case-type";let C=document.createElement("label");Object.assign(C.style,a.label),D.appendChild(C);let q=document.createElement("div");Object.assign(q.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let m=document.createElement("div");m.textContent="BAU",m.classList.add("no-drag"),Object.assign(m.style,ge);let g=document.createElement("div");g.textContent="LM",g.classList.add("no-drag"),Object.assign(g.style,ge),m.onclick=()=>gt("bau"),g.onclick=()=>gt("lm"),q.appendChild(m),q.appendChild(g),D.appendChild(q),u.appendChild(D);let s=document.createElement("div");s.id="step-1-selection";let c=document.createElement("label");c.className="cw-input-label",c.textContent="Status Principal";let y=document.createElement("select");y.id="main-status",y.className="cw-select",y.innerHTML=`
      <option value="" disabled selected hidden>Selecione uma op\xE7\xE3o...</option>
      <option value="NI">NI - Need Info</option>
      <option value="SO">SO - Solution Offered</option>
      <option value="IN">IN - Inactive</option>
      <option value="AS">AS - Assigned</option>
      <option value="DC">DC - Discard</option>
  `;let d=document.createElement("div");d.style.cssText="display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; margin-bottom: 6px;";let x=document.createElement("label");x.className="cw-input-label",x.textContent="Sub-status",x.style.marginBottom="0";let k=document.createElement("a");k.href="https://seu-link-do-guia-aqui.com",k.target="_blank",k.className="cw-info-link",k.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; transform:translateY(1px)"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Guia de Substatus',Object.assign(k.style,a.helpLink),d.appendChild(x),d.appendChild(k);let w=document.createElement("select");w.id="sub-status",w.className="cw-select",w.disabled=!0,w.innerHTML='<option value="" disabled selected hidden>Aguardando status principal...</option>',s.appendChild(c),s.appendChild(y),s.appendChild(d),s.appendChild(w),u.appendChild(s);let T=document.createElement("div");T.id="step-1-1-portugal",Object.assign(T.style,a.stepBlock,{display:"none"});let ne=document.createElement("label");Object.assign(ne.style,a.label),T.appendChild(ne);let z=document.createElement("div");Object.assign(z.style,a.radioContainer);let L=document.createElement("div");Object.assign(L.style,{display:"flex",alignItems:"center"});let M=document.createElement("input");M.type="radio",M.name="portugal-group",M.value="sim",Object.assign(M.style,a.checkboxInput);let P=document.createElement("label");P.htmlFor="portugal-sim",Object.assign(P.style,{cursor:"pointer"}),L.appendChild(M),L.appendChild(P);let X=document.createElement("div");Object.assign(X.style,{display:"flex",alignItems:"center"});let H=document.createElement("input");H.type="radio",H.name="portugal-group",H.value="nao",H.checked=!0,Object.assign(H.style,a.checkboxInput);let fe=document.createElement("label");fe.htmlFor="portugal-nao",Object.assign(fe.style,{cursor:"pointer"}),X.appendChild(H),X.appendChild(fe),z.appendChild(L),z.appendChild(X),T.appendChild(z),u.appendChild(T);function W(S){o=S,S?R.style.display="block":R.style.display="none"}M.onchange=()=>W(!0),H.onchange=()=>W(!1);let R=document.createElement("div");R.id="step-1-2-consent",Object.assign(R.style,a.stepBlock,{display:"none"});let J=document.createElement("label");Object.assign(J.style,a.label),R.appendChild(J);let re=document.createElement("div");Object.assign(re.style,a.radioContainer);let me=document.createElement("div");Object.assign(me.style,{display:"flex",alignItems:"center"});let ye=document.createElement("input");ye.type="radio",ye.name="consent-group",ye.value="Sim",ye.checked=!0,Object.assign(ye.style,a.checkboxInput);let ie=document.createElement("label");ie.htmlFor="consent-sim",Object.assign(ie.style,{cursor:"pointer"}),me.appendChild(ye),me.appendChild(ie);let ee=document.createElement("div");Object.assign(ee.style,{display:"flex",alignItems:"center"});let ke=document.createElement("input");ke.type="radio",ke.name="consent-group",ke.value="N\xE3o",Object.assign(ke.style,a.checkboxInput);let Me=document.createElement("label");Me.htmlFor="consent-nao",Object.assign(Me.style,{cursor:"pointer"}),ee.appendChild(ke),ee.appendChild(Me),re.appendChild(me),re.appendChild(ee),R.appendChild(re),u.appendChild(R);let Le=document.createElement("div");Le.id="step-1-5-snippets",Object.assign(Le.style,a.stepBlock,{display:"none"});let nt=document.createElement("h3");Object.assign(nt.style,a.h3),nt.textContent="Cen\xE1rios Comuns";let ve=so(S=>{let F=document.querySelector("textarea");F&&(F.value=S,F.dispatchEvent(new Event("input")),F.style.transition="background-color 0.2s",F.style.backgroundColor="#e8f0fe",setTimeout(()=>F.style.backgroundColor="#fff",300))});ve.id="snippet-container",Le.appendChild(nt),Le.appendChild(ve),u.appendChild(Le);let he=document.createElement("div");he.id="step-3-form",Object.assign(he.style,a.stepBlock,{display:"none"});let mt=document.createElement("h3");Object.assign(mt.style,a.h3),he.appendChild(mt);let Ne=document.createElement("div");Ne.id="dynamic-form-fields-container",he.appendChild(Ne);let pe=document.createElement("button");pe.textContent="+ Gostaria de selecionar uma task?",Object.assign(pe.style,a.optionalBtn),pe.onmouseover=()=>pe.style.background="#e8f0fe",pe.onmouseout=()=>pe.style.background="white",pe.onclick=()=>{pe.style.display="none",De.style.display="block",l.selectionElement.style.display="block"};let De=document.createElement("h3");Object.assign(De.style,a.h3,{marginTop:"20px"});let Rt=l.selectionElement;Object.assign(Rt.style,{marginBottom:"20px"}),he.appendChild(pe),he.appendChild(De),he.appendChild(Rt),he.appendChild(i.element),he.appendChild(l.screenshotsElement),u.appendChild(he);let Fe=document.createElement("div");Fe.id="step-4-email",Object.assign(Fe.style,{display:"none",marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #eee"});let Ge=document.createElement("label");Ge.style.display="flex",Ge.style.alignItems="center",Ge.style.cursor="pointer",Ge.style.fontSize="14px";let Be=document.createElement("input");Be.type="checkbox",Be.checked=!0,Object.assign(Be.style,a.checkboxInput),Ge.appendChild(Be),Ge.appendChild(document.createTextNode("Preencher email automaticamente?")),Fe.appendChild(Ge),u.appendChild(Fe);let We=document.createElement("div");Object.assign(We.style,{display:"none",gap:"8px",padding:"0"}),u.appendChild(We);let Ke=document.createElement("button");Object.assign(Ke.style,a.buttonBase,{backgroundColor:"#5f6368"}),Ke.textContent="Copiar";let Qe=document.createElement("button");Object.assign(Qe.style,a.buttonBase,{backgroundColor:"#1a73e8"}),Qe.textContent="Preencher",We.appendChild(Ke),We.appendChild(Qe);let Ze=document.createElement("div");Object.assign(Ze.style,Ye),Ze.className="no-drag",Ze.title="Redimensionar",b.appendChild(Ze),Xe(b,Ze),document.body.appendChild(b);function gt(S){t=S;let F=Je();Object.assign(m.style,ge),Object.assign(g.style,ge),S==="bau"?(Object.assign(m.style,F),k.href="https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657"):(Object.assign(g.style,F),k.href="https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243"),w.value&&w.dispatchEvent(new Event("change"))}function V(S){try{if(Ie&&Ie[n]&&Ie[n][S])return Ie[n][S];if(Ie&&Ie.pt&&Ie.pt[S])return Ie.pt[S]}catch{}return S}function vo(){v.textContent=V("idioma"),C.textContent=V("fluxo"),c.textContent=V("status_principal"),x.textContent=V("substatus"),nt.textContent=V("cenarios_comuns"),De.textContent=V("selecione_tasks"),mt.textContent=V("preencha_detalhes"),Ke.textContent=V("copiar"),Qe.textContent=V("preencher"),y.querySelector('option[value=""]')&&(y.querySelector('option[value=""]').textContent=V("select_status")),w.querySelector('option[value=""]')&&(w.querySelector('option[value=""]').textContent=V("select_substatus")),ne.textContent=V("caso_portugal"),P.textContent=V("sim"),fe.textContent=V("nao"),J.textContent=V("consentiu_gravacao"),ie.textContent=V("sim"),Me.textContent=V("nao"),Ne.querySelectorAll("label").forEach(S=>{let F=S.nextElementSibling.id.replace("field-",""),E=V(F.toLowerCase());E!==F.toLowerCase()?S.textContent=E:S.textContent=F.replace(/_/g," ").replace(/\b\w/g,$=>$.toUpperCase())+":"}),pe.textContent="+ "+(n==="pt"?"Gostaria de selecionar uma task?":"Quisiera seleccionar una tarea?")}function bt(S){n=S;let F=Je();Object.assign(O.style,ge),Object.assign(I.style,ge),S==="pt"?(Object.assign(O.style,F),T.style.display="block",W(o)):(Object.assign(I.style,F),T.style.display="none",R.style.display="none"),vo(),w.value&&w.dispatchEvent(new Event("change"))}function ft(S){(S.value.trim()===""||S.value.trim()==="\u2022")&&(S.value="\u2022 "),S.onkeydown=function(F){if(F.key==="Enter"){F.preventDefault();let E=this.selectionStart,$=this.selectionEnd,ae=this.value,le=ae.lastIndexOf(`
`,E-1)+1,xe=ae.substring(le,E),ce=xe.trim()==="\u2022"||xe.trim()===""?`
`:`
\u2022 `;this.value=ae.substring(0,E)+ce+ae.substring($),this.selectionStart=this.selectionEnd=E+ce.length}else if(F.key==="Backspace"){let E=this.selectionStart;if(E===this.selectionEnd&&E>0){let $=this.value.substring(0,E);$.endsWith(`
\u2022 `)?(F.preventDefault(),this.value=$.substring(0,E-3)+this.value.substring(this.selectionEnd),this.selectionStart=this.selectionEnd=E-3):$==="\u2022 "&&(F.preventDefault(),this.value="",this.selectionStart=this.selectionEnd=0)}}}}function ht(){let S=typeof ve<"u"?ve:document.getElementById("snippet-container");if(!S)return;let F=S.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'),E={},$=new Set;F.forEach(Q=>{let K=Q.id,G=we[K];if(G)for(let N in G)N==="linkedTask"?$.add(G.linkedTask):N!=="type"&&(E[N]||(E[N]=[]),E[N].includes(G[N])||E[N].push(G[N]))});let ae=new Set;Object.values(we).forEach(Q=>{Object.keys(Q).forEach(K=>{K!=="linkedTask"&&K!=="type"&&ae.add(K)})}),ae.forEach(Q=>{let K=document.getElementById(Q);if(K){let G=E[Q]||[],N="";ot.includes(Q.replace("field-",""))?(N=G.map(Y=>Y.startsWith("\u2022 ")?Y:"\u2022 "+Y).join(`
`),N===""?N="\u2022 ":N.endsWith(`
\u2022 `)||(N+=`
\u2022 `)):N=G.join(`

`),N.trim()!=="\u2022"&&N.trim()!==""?K.value=N:ot.includes(Q.replace("field-",""))?K.value="\u2022 ":K.value="",K.tagName==="TEXTAREA"&&typeof ft=="function"&&ft(K)}});let le=new Set,xe=new Set;S.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(Q=>{let K=we[Q.id];K&&K.linkedTask&&(Q.checked?le.add(K.linkedTask):xe.add(K.linkedTask))}),xe.forEach(Q=>{le.has(Q)||l.toggleTask(Q,!1)}),le.forEach(Q=>{l.toggleTask(Q,!0)})}y.onchange=()=>{let S=y.value;if(xt(1.5),w.innerHTML=`<option value="">${V("select_substatus")}</option>`,!S){w.disabled=!0;return}for(let F in tt){let E=tt[F];if(E.status===S){let $=document.createElement("option");$.value=F,$.textContent=E.name,w.appendChild($)}}w.disabled=!1},w.onchange=()=>{let S=w.value;if(xt(1.5),!S)return;l.updateSubStatus(S);let F=tt[S];ve.innerHTML="";let E=(G,N,Y)=>{let se=document.createElement("label");Object.assign(se.style,a.checkboxLabel),se.onmouseover=()=>se.style.backgroundColor="#e8eaed",se.onmouseout=()=>se.style.backgroundColor="#f8f9fa";let te=document.createElement("input");return te.type=N,te.id=G.id,Object.assign(te.style,a.checkboxInput),se.appendChild(te),se.appendChild(document.createTextNode(` ${G.text}`)),Y.appendChild(se),te},$=[],ae="radio";if(S==="NI_Awaiting_Inputs")$=[{id:"quickfill-ni-inicio-manual",text:"In\xEDcio 2/6 (Manual)"},{id:"quickfill-ni-cms-access",text:"In\xEDcio 2/6 (ADV sem acesso ao CMS)"},{id:"quickfill-ni-followup-bau",text:"Follow-up 2/6 (BAU)"},{id:"quickfill-ni-followup-lm",text:"Follow-up 2/6 (LM)"}];else if(S.startsWith("SO_"))ae="checkbox",$=[{id:"quickfill-gtm-install",text:"Instala\xE7\xE3o do GTM"},{id:"quickfill-whatsapp",text:"Convers\xE3o de WhatsApp"},{id:"quickfill-form",text:"Convers\xE3o de Formul\xE1rio (Padr\xE3o)"},{id:"quickfill-ecw4-close",text:"Fechamento ECW4 (P\xF3s 7 dias)"}];else if(S.startsWith("AS_")){ae="checkbox";let G=document.createElement("label");G.textContent=V("cenarios_comuns"),Object.assign(G.style,a.label),ve.appendChild(G),$=[{id:"quickfill-as-no-show",text:"Anunciante n\xE3o compareceu (respondeu e-mail)"},{id:"quickfill-as-insufficient-time",text:"Tempo insuficiente"},{id:"quickfill-as-no-access",text:"Anunciante sem acessos necess\xE1rios"}]}else S.startsWith("IN_")?$=[{id:"quickfill-in-nrp-bau",text:"NRP (BAU - 3 tentativas)"},{id:"quickfill-in-nrp-lm",text:"NRP (LM - Sem tentativas)"},{id:"quickfill-in-no-show-bau",text:"No-Show (BAU - 3 tentativas)"},{id:"quickfill-in-2-6-final",text:"Finaliza\xE7\xE3o 2/6 (Sem Resposta)"},{id:"quickfill-in-manual",text:"Outro (Manual)"}]:S.startsWith("DC_")&&(ae="radio",$=[{id:"quickfill-dc-lm-no-access",text:"LM - Sem acessos (Reagendar em BAU)"}]);let le=$.filter(G=>{let N=we[G.id];return!N.type||N.type==="all"||N.type===t});le.forEach((G,N)=>{let Y=E(G,ae,ve);ae==="radio"&&(Y.name="scenario-radio-group",N===0&&(Y.checked=!0))}),le.length>0&&(Le.style.display="block"),F.requiresTasks?(pe.style.display="none",De.style.display="block",l.selectionElement.style.display="block"):(pe.style.display="block",De.style.display="none",l.selectionElement.style.display="none"),Ne.innerHTML="";let xe=F.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(xe)].forEach(G=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(G))return;let N=G.slice(1,-1),Y=document.createElement("label"),se=V(N.toLowerCase());if(Y.textContent=se!==N.toLowerCase()?se:N.replace(/_/g," ").replace(/\b\w/g,j=>j.toUpperCase())+":",Object.assign(Y.style,a.label),N==="SPEAKEASY_ID"){let j=document.createElement("button");j.innerHTML='<span style="font-size:12px; margin-right:4px;">\u2728</span>Auto Busca',j.style.cssText=`
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
          `,j.title="Localizar Speakeasy ID no hist\xF3rico",j.onmouseover=()=>{j.style.backgroundColor="#c2e7ff",j.style.boxShadow="0 1px 2px rgba(0,0,0,0.1)"},j.onmouseout=()=>{j.style.backgroundColor="#d3e3fd",j.style.boxShadow="none"},j.onmousedown=()=>{j.style.backgroundColor="#a8c7fa",j.style.transform="scale(0.96)"},j.onmouseup=()=>j.style.transform="scale(1)",j.onclick=ue=>{ue.preventDefault(),Qt(`field-${N}`)},Y.appendChild(j)}let te;ot.includes(N)?(te=document.createElement("textarea"),Object.assign(te.style,a.textarea),te.classList.add("bullet-textarea"),ft(te)):Tt.includes(N)?(te=document.createElement("textarea"),Object.assign(te.style,a.textarea)):(te=document.createElement("input"),te.type="text",Object.assign(te.style,a.input),N==="REASON_COMMENTS"&&(S.startsWith("NI_")||S.startsWith("IN_"))&&(Object.assign(Y.style,{display:"none"}),Object.assign(te.style,{display:"none"}))),N==="ON_CALL"&&t==="lm"&&(Object.assign(Y.style,{display:"none"}),Object.assign(te.style,{display:"none"}),te.value="N/A"),te.id=`field-${N}`,Ne.appendChild(Y),Ne.appendChild(te)});let Q=ve.querySelectorAll('input[type="checkbox"], input[type="radio"]');Q.length>0&&(Q.forEach(G=>{G.removeEventListener("change",ht),G.addEventListener("change",ht)}),ht()),he.style.display="block",Pe[S]?Fe.style.display="block":Fe.style.display="none",We.style.display="flex";let K=l.getCheckedElements().map(G=>G.value);i.updateVisibility(S,K)},pe.onclick=()=>{pe.style.display="none",De.style.display="block",l.selectionElement.style.display="block"};function Mt(){let S=w.value;if(!S)return null;let E=tt[S].template.replace(/\n/g,"<br>"),$='style="margin-bottom: 12px; padding-left: 30px;"',ae=[],le="",xe=l.getCheckedElements();xe.length>0&&xe.forEach(K=>{let G=K.value,N=_e[G],Y=K.closest().querySelector(".stepper-count"),se=Y?parseInt(Y.textContent):1;se>1?ae.push(`${N.name} (x${se})`):ae.push(N.name)});let ce=l.screenshotsElement;if(ce){let K=Array.from(ce.querySelectorAll('input[id^="name-"]'));K.length>0&&K.forEach(G=>{let N=G.value,Y=G.closest(".cw-screen-card");if(Y){let se=Y.querySelectorAll('input[id^="screen-"]'),te=!1,j="";se.forEach(ue=>{let Lt=ue.closest(".cw-input-group"),Dt=Lt?Lt.querySelector(".cw-input-label"):null,Ao=Dt?Dt.textContent:"Evid\xEAncia",Ft=ue.value.trim(),wo=Ft?` ${Ft}`:"";j+=`<li>${Ao} -${wo}</li>`,te=!0}),te&&(le+=`<b>${N}</b>`,le+=`<ul ${$}>${j}</ul>`)}})}if(E.includes("{TAGS_IMPLEMENTED}")?E=E.replace(/{TAGS_IMPLEMENTED}/g,ae.join(", ")||"N/A"):ae.length>0&&(E+=`<br><b>Tags:</b> ${ae.join(", ")}<br>`),E.includes("{SCREENSHOTS_LIST}")?E=E.replace(/{SCREENSHOTS_LIST}/g,le?`${le}`:"N/A"):le!==""&&(E+=`<br>${le}`),n==="pt"&&o){let K=ye.checked?V("sim"):V("nao");E=E.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${V("consentiu_gravacao")}</b> ${K}<br><br>`),E=E.replace(/{CASO_PORTUGAL}/g,`<br><b>${V("caso_portugal")}</b> ${V("sim")}<br>`)}else n==="pt"&&!o?(E=E.replace(/{CASO_PORTUGAL}/g,`<br><b>${V("caso_portugal")}</b> ${V("nao")}<br>`),E=E.replace(/{CONSENTIU_GRAVACAO}/g,"")):(E=E.replace(/{CASO_PORTUGAL}/g,""),E=E.replace(/{CONSENTIU_GRAVACAO}/g,""));return Ne.querySelectorAll("input, textarea").forEach(K=>{let G=K.id.replace("field-",""),N=new RegExp(`{${G}}`,"g"),Y=K.value;if(G==="REASON_COMMENTS"&&(S.startsWith("NI_")||S.startsWith("IN_"))){let j=ve.querySelector('input[type="radio"]:checked');j&&we[j.id]&&(Y=we[j.id]["field-REASON_COMMENTS"])}if(ot.includes(G)&&Y.trim()!==""){let j=Y.split(`
`).map(ue=>ue.trim()).filter(ue=>ue!==""&&ue!=="\u2022").map(ue=>ue.startsWith("\u2022 ")?ue.substring(2):ue).map(ue=>`<li>${ue}</li>`).join("");Y=j?`<ul ${$}>${j}</ul>`:""}else Tt.includes(G)?Y=Y.split(`
`).filter(j=>j.trim()!=="").map(j=>`<p style="margin: 0 0 8px 0;">${j}</p>`).join(""):K.tagName==="TEXTAREA"&&(Y=Y.replace(/\n/g,"<br>"));let se=Y.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(se===""||se==="\u2022"||se.toLowerCase()==="n/a"){let j=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${G}\\}(?:<br>\\s*)?`,"gi");j.test(E)?E=E.replace(j,""):E=E.replace(N,"")}else E=E.replace(N,Y.replace(/\$/g,"$$$$"))}),E=E.replace(/{([A-Z0-9_]+)}/g,""),E=E.replace(/(<br>){3,}/g,"<br><br>"),typeof i<"u"&&i.getOutput&&(E+=i.getOutput()),E}Ke.onclick=()=>{let S=Mt();S?(It(S),oe(V("copiado_sucesso"))):oe(V("selecione_substatus"),{error:!0})},Qe.onclick=async()=>{let S=w.value,F=Mt();if(!F){oe(V("selecione_substatus"),{error:!0});return}It(F),yt();let E=dt(),$=await po();if($)try{if($.focus(),$.innerHTML.trim()==="<p><br></p>"||$.innerHTML.trim()==="<br>"||$.innerText.trim()===""){let ce=document.createRange();ce.selectNodeContents($);let Q=window.getSelection();Q.removeAllRanges(),Q.addRange(ce),document.execCommand("delete",!1,null)}else if(!$.innerHTML.endsWith("<br><br>")){let ce=document.createRange();ce.selectNodeContents($),ce.collapse(!1);let Q=window.getSelection();Q.removeAllRanges(),Q.addRange(ce),document.execCommand("insertHTML",!1,"<br><br>")}document.execCommand("insertHTML",!1,F),co($),setTimeout(()=>{oe(V("inserido_copiado"))},600);let le=typeof Be<"u"&&Be?Be.checked:!0;if(S&&Pe[S]&&le){let ce=Pe[S];await lt(ce),await new Promise(Q=>setTimeout(Q,500))}E(),xt(1.5),y.value="",w.innerHTML=`<option value="">${V("select_substatus")}</option>`,w.disabled=!0}catch(ae){console.error(ae),oe("Erro ao inserir.",{error:!0}),E()}};function xt(S=1.5){S<=1.5&&(Le.style.display="none",ve.innerHTML=""),S<=2&&(l.reset(),pe.style.display="none"),S<=3&&(he.style.display="none",Ne.innerHTML="",i.reset(),We.style.display="none",Fe.style.display="none")}function yt(){if(r=!r,r){let S=b.querySelector(".cw-expand-btn");S&&typeof S.resetState=="function"&&S.resetState()}Ee(r,b,"cw-btn-notes")}return gt("bau"),bt("pt"),yt}var $e={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function bo(){let e="v4.2.0 CR-Hybrid",t="CANNED_RESPONSES",n=Object.keys($e)[0],o="",r="list",a=!1,i={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:"#FAFAFA"},l={display:"flex",width:"200%",height:"100%",transition:"transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",transform:"translateX(0)",willChange:"transform"},b={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},p={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:"1px solid transparent",background:"#F0F2F5",fontSize:"14px",color:"#202124",boxSizing:"border-box",outline:"none",transition:"all 0.2s ease",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center"},h={display:"flex",gap:"8px",padding:"8px 16px 12px 16px",overflowX:"auto",scrollbarWidth:"none",borderBottom:"1px solid #f1f3f4"},u={padding:"6px 14px",borderRadius:"20px",border:"1px solid #dadce0",background:"#fff",color:"#5f6368",fontSize:"12px",fontWeight:"500",cursor:"pointer",transition:"all 0.2s ease",flexShrink:"0"},f={background:"#E8F0FE",color:"#1967D2",borderColor:"#E8F0FE",fontWeight:"600"},_={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",marginBottom:"8px",borderRadius:"12px",background:"#fff",border:"1px solid #dadce0",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",position:"relative",overflow:"hidden",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},v=document.createElement("div");v.id="quick-email-popup",v.classList.add("cw-module-window"),Object.assign(v.style,Ae,{right:"100px",width:"480px",height:"600px",transition:"width 0.3s ease, height 0.3s ease"});let A={popup:v,googleLine:null,focusElement:null};function O(){a=!a,Ee(a,v,"cw-btn-email"),a||setTimeout(()=>T(),300)}let I=Ce(v,"Assistente de Resposta",e,"Templates de Email e CRs R\xE1pidas",A,()=>O()),D=document.createElement("div");Object.assign(D.style,i);let C=document.createElement("div");Object.assign(C.style,l);let q=document.createElement("div");Object.assign(q.style,b);let m=document.createElement("div");Object.assign(m.style,{padding:"20px 0 0 0",flexShrink:"0",background:"#fff",zIndex:"10",display:"flex",flexDirection:"column",gap:"10px"});let g=document.createElement("div");g.style.padding="0 20px";let s=document.createElement("input");s.placeholder="Buscar Email ou CR...",Object.assign(s.style,p),s.onfocus=()=>{s.style.background="#fff",s.style.border="1px solid #1a73e8",s.style.boxShadow="0 0 0 4px rgba(26, 115, 232, 0.1)"},s.onblur=()=>{s.style.background="#F0F2F5",s.style.border="1px solid transparent",s.style.boxShadow="none"},A.focusElement=s;let c=document.createElement("div");Object.assign(c.style,h);let y=document.createElement("div");Object.assign(y.style,{padding:"16px 20px",overflowY:"auto",flexGrow:"1"}),g.appendChild(s),m.appendChild(g),m.appendChild(c),q.appendChild(m),q.appendChild(y);let d=document.createElement("div");Object.assign(d.style,b);let x=document.createElement("div");Object.assign(x.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),d.appendChild(x),C.appendChild(q),C.appendChild(d),D.appendChild(C),v.appendChild(I),v.appendChild(D),document.body.appendChild(v);async function k(M,P){try{a&&O();let X=dt();await new Promise(H=>setTimeout(H,800)),P==="email"?await Jt(M):P==="cr"&&await lt(M),X()}catch(X){console.error("\u274C Erro na execu\xE7\xE3o:",X);let H=document.querySelector(".cw-focus-backdrop");H&&H.classList.remove("active")}}function w(M){r="detail",C.style.transform="translateX(-50%)";let P='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',X='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';x.innerHTML=`
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
        `,x.querySelector("#csa-back-btn").onclick=T;let H=x.querySelector("#csa-insert-btn");H.onclick=()=>{H.style.transform="scale(0.96)",k(M,"email"),setTimeout(()=>{H.style.transform="scale(1)",T()},300)}}function T(){r="list",C.style.transform="translateX(0)"}function ne(M,P,X=null){let H=document.createElement("button");return H.innerHTML=X?`<span style="margin-right:4px">${X}</span>${M}`:M,Object.assign(H.style,u),n===P&&o===""&&Object.assign(H.style,f),H.onclick=()=>{n=P,o="",s.value="",z(),L()},H}function z(){c.innerHTML="",c.appendChild(ne("Smart CRs",t,"\u26A1")),Object.keys($e).forEach(M=>{c.appendChild(ne($e[M].title,M))})}function L(){y.innerHTML="";let M=[];if(o.trim()!==""){let W=o.toLowerCase();Object.values($e).forEach(R=>{R.emails.forEach(J=>{(J.name.toLowerCase().includes(W)||J.subject.toLowerCase().includes(W))&&M.push({type:"email",data:J})})}),Object.entries(Pe).forEach(([R,J])=>{if(!J)return;(R.replace(/_/g," ").toLowerCase().includes(W)||J.toLowerCase().includes(W))&&M.push({type:"cr",key:R,code:J})})}else n===t?Object.entries(Pe).forEach(([W,R])=>{R&&M.push({type:"cr",key:W,code:R})}):$e[n]&&$e[n].emails.forEach(W=>{M.push({type:"email",data:W})});if(M.length===0){y.innerHTML='<div style="text-align:center; padding:60px 20px; color:#9aa0a6;"><div style="font-size:24px;">\u{1F50D}</div><div style="font-size:14px; margin-top:8px;">Nada encontrado.</div></div>';return}let X='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a73e8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',H='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fbbc04" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',fe='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#dadce0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';M.forEach(W=>{let R=document.createElement("div");if(Object.assign(R.style,_),W.type==="email"){let J=W.data,re=J.subject.length>40?J.subject.substring(0,40)+"...":J.subject;R.innerHTML=`
                    <div style="width:36px; height:36px; border-radius:8px; background:#E8F0FE; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:12px;">${X}</div>
                    <div style="flex-grow:1; min-width:0;">
                        <div style="font-size:14px; font-weight:600; color:#202124; margin-bottom:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${J.name}</div>
                        <div style="font-size:12px; color:#5f6368; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${re}</div>
                    </div>
                    <div style="margin-left:8px;">${fe}</div>
                `,R.onclick=()=>w(J)}else{let J=W.key.replace(/_/g," ").replace("AS ","AS - ").replace("NI ","NI - ");R.innerHTML=`
                    <div style="width:36px; height:36px; border-radius:8px; background:#FEF7E0; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:12px;">${H}</div>
                    <div style="flex-grow:1; min-width:0;">
                        <div style="font-size:13px; font-weight:600; color:#202124; margin-bottom:2px;">${J}</div>
                        <div style="font-size:11px; color:#ea8600; font-family:monospace;">${W.code}</div>
                    </div>
                    <div style="font-size:10px; font-weight:700; color:#dadce0; text-transform:uppercase;">APLICAR</div>
                `,R.onclick=()=>{R.style.background="#fff8e1",setTimeout(()=>R.style.background="#fff",200),k(W.code,"cr")}}R.onmouseenter=()=>{R.style.borderColor=W.type==="cr"?"#fbbc04":"#1a73e8",R.style.transform="translateY(-1px)",R.style.boxShadow="0 4px 8px rgba(0,0,0,0.05)"},R.onmouseleave=()=>{R.style.borderColor="#dadce0",R.style.transform="translateY(0)",R.style.boxShadow="0 1px 2px rgba(0,0,0,0.02)"},y.appendChild(R)})}return s.addEventListener("input",M=>{o=M.target.value,o!==""?Array.from(c.children).forEach(P=>Object.assign(P.style,u)):z(),L()}),z(),L(),O}var fo={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function ho(){let e="v2.1 (Apple Motion)",t={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#f8f9fa",scrollBehavior:"smooth"},card:{background:"#ffffff",border:"1px solid #dadce0",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"13px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"10px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.15s ease, opacity 0.3s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.5",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"20px",height:"20px",borderRadius:"6px",border:"2px solid #dadce0",marginRight:"14px",marginTop:"1px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #eee",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"}},n={},o="PT",r="BAU",a=!1,i=document.createElement("div");i.id="call-script-popup",i.classList.add("cw-module-window"),Object.assign(i.style,Ae,{right:"auto",left:"50%",width:"400px",height:"650px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let l={popup:i,googleLine:null};function b(){a=!a,Ee(a,i,"cw-btn-script")}let p=Ce(i,"Call Script",e,"Guia interativo para condu\xE7\xE3o de chamadas.",l,()=>{b()});i.appendChild(p);let h=document.createElement("div");Object.assign(h.style,t.progressBarContainer);let u=document.createElement("div");Object.assign(u.style,t.progressBarFill),h.appendChild(u),i.appendChild(h);let f=document.createElement("div");f.id="csa-content",Object.assign(f.style,t.contentArea),i.appendChild(f);let _=document.createElement("div");Object.assign(_.style,t.footer);let v=document.createElement("span");v.textContent="by lucaste@",Object.assign(v.style,{fontSize:"10px",color:"#bdc1c6"});let A=document.createElement("button");A.innerHTML=`
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
    Resetar Script
  `,Object.assign(A.style,t.resetBtn),A.onmouseenter=()=>A.style.background="#fce8e6",A.onmouseleave=()=>A.style.background="transparent",A.onclick=()=>{A.style.transform="scale(0.9)",setTimeout(()=>A.style.transform="scale(1)",150);for(let k in n)delete n[k];c()},_.appendChild(v),_.appendChild(A),i.appendChild(_);let O=document.createElement("div");Object.assign(O.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let I=document.createElement("div");Object.assign(I.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let D=document.createElement("div");D.textContent="BAU";let C=document.createElement("div");C.textContent="LT",Object.assign(D.style,ge),Object.assign(C.style,ge),I.appendChild(D),I.appendChild(C);let q=document.createElement("select");Object.assign(q.style,Ut,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),q.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',q.value=o,O.appendChild(I),O.appendChild(q),f.appendChild(O);let m=document.createElement("div");m.id="csa-checklist-area",f.appendChild(m);let g=document.createElement("div");Object.assign(g.style,Ye),g.className="no-drag",g.title="Redimensionar",i.appendChild(g),Xe(i,g),document.body.appendChild(i);function s(k){return k}function c(){m.innerHTML="";let k=`${o} ${r}`,w=fo[k];if(!w){m.innerHTML=`<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <div style="font-size: 24px;">\u2615</div>
        <div>Script n\xE3o configurado.</div>
      </div>`,u.style.width="0%";return}let T=w.color||"#1a73e8",ne=0,z=0;["inicio","fim"].forEach(L=>{w[L]&&(ne+=w[L].length)}),["inicio","fim"].forEach((L,M)=>{let P=w[L];if(!P||P.length===0)return;let X=document.createElement("div");Object.assign(X.style,t.card);let H=document.createElement("div");Object.assign(H.style,t.cardTitle);let fe=L==="inicio"?"Abertura":"Fechamento";o.includes("ES")&&(fe=L==="inicio"?"Apertura":"Cierre"),o.includes("EN")&&(fe=L==="inicio"?"Opening":"Closing"),H.textContent=fe;let W=document.createElement("span");W.style.fontSize="11px",W.style.opacity="0.7",W.style.fontWeight="500",W.style.background="#f1f3f4",W.style.padding="2px 8px",W.style.borderRadius="10px",H.appendChild(W),X.appendChild(H);let R=0;P.forEach((J,re)=>{let me=`${k}-${L}-${re}`,ye=!!n[me];ye&&(z++,R++);let ie=document.createElement("div");Object.assign(ie.style,t.itemRow);let ee=document.createElement("div");Object.assign(ee.style,t.checkbox);let ke=document.createElement("span");ke.innerHTML=J,ke.style.flex="1",ye?(Object.assign(ie.style,t.itemCompleted),ee.style.background=T,ee.style.borderColor=T,ee.style.transform="scale(1)",ee.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ie.style.textDecoration="none",ie.style.opacity="1",ee.style.background="transparent",ee.style.borderColor="#dadce0",ee.style.transform="scale(1)",ee.innerHTML=""),ie.onclick=()=>{let Me=!n[me];n[me]=Me,Z.playClick(),Me?(ee.style.transform="scale(1.2)",setTimeout(()=>ee.style.transform="scale(1)",150),Object.assign(ie.style,t.itemCompleted),ee.style.background=T,ee.style.borderColor=T,ee.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ie.style.textDecoration="none",ie.style.opacity="1",ee.style.background="transparent",ee.style.borderColor="#dadce0",ee.innerHTML=""),y(k,w)},ie.onmouseenter=()=>{n[me]||(ie.style.background="#f1f3f4",ee.style.borderColor=T)},ie.onmouseleave=()=>{n[me]||(ie.style.background="transparent",ee.style.borderColor="#dadce0")},ie.appendChild(ee),ie.appendChild(ke),X.appendChild(ie)}),R===P.length&&P.length>0&&(W.style.color="#1e8e3e",W.style.background="#e6f4ea",X.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),W.textContent=`${R}/${P.length}`,m.appendChild(X)}),d(ne,z)}function y(k,w){let T=0,ne=0;["inicio","fim"].forEach(z=>{let L=w[z]||[];T+=L.length;let M=0;L.forEach((P,X)=>{n[`${k}-${z}-${X}`]&&(ne++,M++)})}),d(T,ne),setTimeout(()=>c(),200)}function d(k,w){let T=k===0?0:w/k*100;u.style.width=`${T}%`,T===100?u.style.background="#34A853":u.style.background="linear-gradient(90deg, #4285F4, #34A853)"}function x(k){r=k;let w=Je();Object.assign(D.style,ge),Object.assign(C.style,ge),Object.assign(k==="BAU"?D.style:C.style,w),c()}return D.onclick=()=>x("BAU"),C.onclick=()=>x("LT"),q.addEventListener("change",k=>{o=k.target.value,c()}),x(r),b}var ut={lm:{label:"LM Forms",links:[{name:"Relat\xF3rio de Ocorr\xEAncias",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas operacionais | Aviso de pausas"},{name:"Chamadas Excedidas (>50min)",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro de chamadas longas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema/ferramenta"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"Enviar casos para BAU/Solicitar Descarte/Abrir Monitoria para AMs"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo dos Anunciantes"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos complicados de atender"}]},suporte:{label:"Central de Ajuda",links:[{name:"Suporte Google Ads",url:"https://support.google.com/google-ads/",desc:"Oficial"},{name:"Suporte GA4",url:"https://support.google.com/analytics/",desc:"Oficial"},{name:"Suporte Merchant Center",url:"https://support.google.com/merchants/gethelp",desc:"Oficial"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. oficial sobre CSP"},{name:"Doc. Enhanced Conversion",url:"https://support.google.com/google-ads/answer/9888656?hl=en",desc:"Como funcionam as convers\xF5es otimizadas?"},{name:"Doc. CoMo",url:"https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=pt-br",desc:"Doc. oficial sobre Consent Mode"},{name:"Cursos SkillShop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos sobre as ferramentas do Google."}]},outros:{label:"Diversos",links:[{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form para solicitar grava\xE7\xE3o da chamada."}]}};function xo(){let e="v2.4.5",t="lm",n="",o={width:"100%",padding:"10px 12px 10px 36px",borderRadius:"8px",border:"1px solid #dadce0",background:"#f8f9fa",fontSize:"14px",boxSizing:"border-box",outline:"none",color:"#3c4043",transition:"background 0.2s, border-color 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"10px center"},r={display:"flex",flexWrap:"wrap",gap:"8px",paddingBottom:"8px"},a={padding:"6px 16px",borderRadius:"16px",border:"1px solid #dadce0",background:"transparent",color:"#5f6368",fontSize:"13px",fontWeight:"500",cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s ease",marginBottom:"4px"},i={background:"#e8f0fe",color:"#1967d2",borderColor:"#e8f0fe",fontWeight:"600"},l={display:"flex",alignItems:"center",padding:"10px 14px",borderRadius:"12px",cursor:"pointer",border:"1px solid transparent",marginBottom:"6px",background:"#ffffff",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), background 0.2s",boxShadow:"0 1px 2px rgba(0,0,0,0.02)",opacity:"0",transform:"translateY(10px)"},b={width:"36px",height:"36px",borderRadius:"10px",background:"#f1f3f4",color:"#5f6368",display:"flex",alignItems:"center",justifyContent:"center",marginRight:"14px",fontSize:"18px",flexShrink:"0"},p=document.createElement("div");p.id="feedback-popup",p.classList.add("cw-module-window"),Object.assign(p.style,Ae,{right:"100px",width:"500px"});let h={lm:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>',outros:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c-1.49 0-2.61 1.12-2.61 2.5s1.12 2.5 2.61 2.5H2v4c0 1.1.9 2 2 2h4v1.5c0 1.49 1.12 2.61 2.5 2.61s2.5-1.12 2.5-2.61V19h4c1.1 0 2-.9 2-2v-4h1.5c1.49 0 2.61-1.12 2.61-2.5S21.99 11 20.5 11z"/></svg>'},u={popup:p,googleLine:null,focusElement:null},f=!1,_=Ce(p,"Links \xDAteis",e,"Acesso r\xE1pido a formul\xE1rios internos (Ocorr\xEAncias, Bugs) e documenta\xE7\xF5es oficiais de suporte.",u,()=>m());p.appendChild(_);let v=document.createElement("div");Object.assign(v.style,{padding:"16px",display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid #f1f3f4",flexShrink:"0",backgroundColor:"#fff"});let A=document.createElement("input");A.type="text",A.placeholder="Buscar link, form ou ajuda...",Object.assign(A.style,o),u.focusElement=A,A.onfocus=()=>{A.style.borderColor="#1a73e8",A.style.backgroundColor="#fff"},A.onblur=()=>{A.style.borderColor="#dadce0",A.style.backgroundColor="#f8f9fa"};let O=document.createElement("div");Object.assign(O.style,r),v.appendChild(A),v.appendChild(O),p.appendChild(v);let I=document.createElement("div");Object.assign(I.style,{padding:"0 8px 8px 8px",overflowY:"auto",flexGrow:"1"}),p.appendChild(I);let D=document.createElement("div");Object.assign(D.style,{padding:"8px 16px",borderTop:"1px solid #eee",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"10px",color:"#9aa0a6"}),D.innerHTML="<span>by lucaste@</span>",p.appendChild(D),document.body.appendChild(p);function C(){O.innerHTML="",Object.keys(ut).forEach(g=>{let s=ut[g],c=document.createElement("button"),y=h[g]||"";c.innerHTML=`
        <span style="display:inline-flex; align-items:center; margin-right:6px; vertical-align:middle;">
            ${y}
        </span> 
        ${s.label}
      `,Object.assign(c.style,a),c.style.display="inline-flex",c.style.alignItems="center",t===g&&n===""&&Object.assign(c.style,i),c.onmousedown=()=>c.style.transform="scale(0.95)",c.onmouseup=()=>c.style.transform="scale(1)",c.onmouseleave=()=>c.style.transform="scale(1)",c.onclick=()=>{t=g,n="",A.value="",C(),q()},O.appendChild(c)})}function q(){I.innerHTML="";let g=[],s=n.trim()!=="";if(s?Object.entries(ut).forEach(([c,y])=>{let d=y.links.filter(x=>x.name.toLowerCase().includes(n.toLowerCase())||x.desc.toLowerCase().includes(n.toLowerCase()));d.forEach(x=>{x._catIcon=h[c],x._categoryName=y.label}),g=[...g,...d]}):(g=ut[t].links,g.forEach(c=>c._catIcon=h[t])),g.length===0){I.innerHTML=`
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px; opacity:0.6;">
            <div style="font-size:32px; margin-bottom:10px;">\u{1F50D}</div>
            <div style="font-size:13px; color:#5f6368;">Nenhum link encontrado.</div>
        </div>`;return}g.forEach((c,y)=>{let d=document.createElement("div");Object.assign(d.style,l);let x=document.createElement("div");Object.assign(x.style,b),x.innerHTML=c._catIcon||'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',x.style.display="flex",x.style.alignItems="center",x.style.justifyContent="center",x.style.color="#5f6368",d.appendChild(x);let k=document.createElement("div");k.style.flexGrow="1";let w=P=>{if(!s)return P;let X=new RegExp(`(${n})`,"gi");return P.replace(X,'<span style="color:#1a73e8; font-weight:700;">$1</span>')},T=`<div style="font-size:14px; font-weight:500; color:#202124;">${w(c.name)}</div>`,ne=`<div style="font-size:11px; color:#5f6368; margin-top:2px;">${w(c.desc)}</div>`;k.innerHTML=T+ne,d.appendChild(k);let z=document.createElement("div");z.style.display="flex",z.style.gap="4px",z.style.opacity="0",z.style.transition="opacity 0.2s";let L=document.createElement("div");L.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',Object.assign(L.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#5f6368",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"}),L.onclick=P=>{Z.playClick(),P.stopPropagation(),navigator.clipboard.writeText(c.url),L.style.transform="scale(1.2)",L.style.color="#1e8e3e",L.style.backgroundColor="#e6f4ea",setTimeout(()=>{L.style.transform="scale(1)",L.style.color="#5f6368",L.style.backgroundColor="transparent"},800)},L.onmouseenter=()=>L.style.backgroundColor="#f1f3f4",L.onmouseleave=()=>L.style.backgroundColor="transparent",z.appendChild(L);let M=document.createElement("div");M.innerHTML="\u2197",Object.assign(M.style,{width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",color:"#dadce0",fontSize:"16px"}),z.appendChild(M),d.appendChild(z),d.onclick=()=>window.open(c.url,"_blank"),d.onmouseenter=()=>{d.style.backgroundColor="#f8f9fa",d.style.transform="scale(1.01)",z.style.opacity="1",M.style.color="#1a73e8"},d.onmouseleave=()=>{d.style.backgroundColor="#ffffff",d.style.transform="scale(1)",z.style.opacity="0",M.style.color="#dadce0"},I.appendChild(d),requestAnimationFrame(()=>{d.style.transition="opacity 0.3s ease, transform 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.2)",setTimeout(()=>{d.style.opacity="1",d.style.transform="translateY(0)"},y*40)})})}A.addEventListener("input",g=>{n=g.target.value,n!==""?Array.from(O.children).forEach(s=>{s.style.backgroundColor="transparent",s.style.color="#5f6368",s.style.borderColor="#dadce0"}):C(),q()});function m(){f=!f,Ee(f,p,"cw-btn-links")}return C(),q(),m}var Ue=[];function _t(e){Ue=e}function yo(){let e="v2.5 (Emoji Fix)",t=!1,n=null,o=60*1e3;function r(s){if(!s)return"";try{let c=new Date(s);return isNaN(c.getTime())?String(s):c.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(s)}}let a={critical:{bg:"#FEF2F2",border:"#FECACA",text:"#991B1B",icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>'},info:{bg:"#EFF6FF",border:"#BFDBFE",text:"#1E40AF",icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{bg:"#F0FDF4",border:"#BBF7D0",text:"#166534",icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}},i={feedContainer:{padding:"24px",overflowY:"auto",flexGrow:"1",background:"#FAFAFA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.06)",boxShadow:"0 4px 12px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.02)",overflow:"hidden",transition:"all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.04)",boxShadow:"none",opacity:"0.8",filter:"grayscale(0.3)",marginBottom:"16px",flexShrink:"0"},cardHeader:{padding:"12px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(0,0,0,0.04)",fontSize:"12px",fontWeight:"600",letterSpacing:"0.5px",textTransform:"uppercase"},msgTitle:{padding:"20px 20px 8px 20px",fontSize:"16px",fontWeight:"700",color:"#202124",letterSpacing:"-0.01em",lineHeight:"1.4"},metaContainer:{padding:"0 20px 12px 20px",display:"flex",alignItems:"center",gap:"8px",fontSize:"12px",color:"#5f6368"},cardBody:{padding:"0 20px 24px 20px",fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",fontFamily:"'Google Sans', Roboto, sans-serif",wordBreak:"break-word",overflowWrap:"break-word"},emojiImg:"height: 20px; vertical-align: text-bottom; margin: 0 2px;",dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},markAllBtn:{fontSize:"12px",color:"#1a73e8",cursor:"pointer",fontWeight:"600",background:"transparent",border:"none",padding:"8px",transition:"opacity 0.2s"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 0",color:"#bdc1c6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"10px 0 20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"10px",borderRadius:"8px",transition:"background 0.2s"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",paddingTop:"10px",borderTop:"1px dashed rgba(0,0,0,0.1)"}},l="cw-scrollbar-style";if(!document.getElementById(l)){let s=document.createElement("style");s.id=l,s.innerHTML=".cw-nice-scroll::-webkit-scrollbar { width: 5px; } .cw-nice-scroll::-webkit-scrollbar-track { background: transparent; } .cw-nice-scroll::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 10px; }",document.head.appendChild(s)}function b(s){if(!s||typeof s!="string")return"";let c=s,y=/(https?:\/\/[^\s]+)|(www\.[^\s]+)/g;return c=c.replace(y,d=>{let x=d;return x.startsWith("http")||(x="http://"+x),`<a href="${x}" target="_blank" style="color:#1967d2; text-decoration:underline;">${d}</a>`}),c=c.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),c=c.replace(/_(.*?)_/g,"<i>$1</i>"),c=c.replace(/\n/g,"<br>"),c=Yt(c),c=c.replace(/@todos|@all/gi,'<span style="background:#e8f0fe; color:#1967d2; padding:1px 5px; border-radius:4px; font-weight:600; font-size:12px;">@todos</span>'),c}let p=document.createElement("div");p.id="broadcast-popup",p.classList.add("cw-module-window"),Object.assign(p.style,Ae,{right:"auto",left:"50%",width:"450px",height:"650px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let h={popup:p,googleLine:null};function u(){if(t=!t,Ee(t,p,"cw-btn-broadcast"),t){let s=document.getElementById("cw-btn-broadcast");s&&s.classList.remove("has-new"),A()}}let f=Ce(p,"Operations Feed",e,"Atualiza\xE7\xF5es oficiais da opera\xE7\xE3o.",h,()=>u()),_=f.querySelector(".cw-header-actions")||f.lastElementChild;if(_){let s=document.createElement("button");s.textContent="Limpar tudo",Object.assign(s.style,i.markAllBtn),s.onclick=c=>{c.stopPropagation(),Z.playSuccess();let y=Ue.map(d=>d.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(y)),D(),O()},_.insertBefore(s,_.firstChild)}p.appendChild(f);let v=document.createElement("div");v.className="cw-nice-scroll",Object.assign(v.style,i.feedContainer),p.appendChild(v);async function A(){let s=document.getElementById("cw-update-status");t&&(s||(s=document.createElement("div"),s.id="cw-update-status",s.style.cssText="padding: 6px; text-align: center; font-size: 11px; color: #5f6368; background: #f8f9fa; border-bottom: 1px solid #e0e0e0;",v.parentNode.insertBefore(s,v)),s.innerHTML="\u23F3 Verificando atualiza\xE7\xF5es...",s.style.display="block");let c=Ue.map(d=>d.id),y=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");try{let d=await He.fetchData();d&&d.broadcast&&(t&&s&&(d.broadcast.some(k=>!c.includes(k.id))?(s.innerHTML="\u2705 Novos avisos sincronizados!",s.style.backgroundColor="#e6f4ea",s.style.color="#137333"):s.innerHTML="\u{1F539} Tudo atualizado.",setTimeout(()=>{s&&(s.style.display="none")},1500)),c.length>0&&d.broadcast.filter(w=>!c.includes(w.id)).filter(w=>!y.includes(w.id)).length>0&&(console.log("\u{1F514} Novo aviso detectado! Tocando som."),Z.playNotification()),_t(d.broadcast),O(),t&&D())}catch(d){console.error("Erro no update:",d),t&&s&&(s.innerHTML="\u26A0\uFE0F Falha na conex\xE3o.",s.style.backgroundColor="#fce8e6")}}function O(){let s=document.getElementById("cw-btn-broadcast");if(!s)return;let c=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(Ue.some(d=>!c.includes(d.id))){if(s.classList.add("has-new"),!s.querySelector(".cw-badge")){let d=document.createElement("div");d.className="cw-badge",Object.assign(d.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),s.appendChild(d)}}else{s.classList.remove("has-new");let d=s.querySelector(".cw-badge");d&&d.remove()}}let I=He.getCachedBroadcasts();I.length>0&&(_t(I),D()),A(),n||(n=setInterval(A,o));function D(){v.innerHTML="";let s=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),c=[...Ue].sort((x,k)=>{let w=s.includes(x.id),T=s.includes(k.id);return w===T?0:w?1:-1});if(c.every(x=>s.includes(x.id))){let x=document.createElement("div");Object.assign(x.style,i.emptyState),x.innerHTML=`
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#dadce0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Voc\xEA est\xE1 em dia!</div>
            <div style="font-size:12px;">Nenhum aviso pendente.</div>
           `,v.appendChild(x)}let y=c.filter(x=>!s.includes(x.id)),d=c.filter(x=>s.includes(x.id));if(y.forEach(x=>v.appendChild(C(x,!1))),d.length>0){let x=document.createElement("div");Object.assign(x.style,i.historyDivider),x.innerHTML=`<span>Visualizar ${d.length} avisos anteriores</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 0.3s"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let k=document.createElement("div");Object.assign(k.style,i.historyContainer),d.forEach(T=>k.appendChild(C(T,!0)));let w=!1;x.onclick=()=>{Z.playClick(),w=!w,k.style.display=w?"flex":"none",x.querySelector("svg").style.transform=w?"rotate(180deg)":"rotate(0deg)",x.querySelector("span").textContent=w?"Ocultar hist\xF3rico":`Visualizar ${d.length} avisos anteriores`},v.appendChild(x),v.appendChild(k)}}function C(s,c){let y=document.createElement("div");Object.assign(y.style,c?i.cardHistory:i.card);let d=a[s.type]||a.info,x=document.createElement("div");Object.assign(x.style,i.cardHeader,{background:d.bg,color:d.text,borderBottom:`1px solid ${d.border}`});let k=document.createElement("div");if(Object.assign(k.style,{display:"flex",alignItems:"center",gap:"6px"}),k.innerHTML=`${d.icon} <span>${s.type.toUpperCase()}</span>`,x.appendChild(k),c){let T=document.createElement("span");T.textContent=r(s.date),T.style.opacity="0.7",x.appendChild(T)}else{let T=document.createElement("button");T.title="Marcar como lido",Object.assign(T.style,i.dismissBtn),T.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',T.onmouseenter=()=>{T.style.color="#1e8e3e",T.style.background="#e6f4ea",T.style.borderColor="#1e8e3e"},T.onmouseleave=()=>{T.style.color="#5f6368",T.style.background="#fff",T.style.borderColor="rgba(0,0,0,0.1)"},T.onclick=ne=>{ne.stopPropagation(),Z.playClick(),y.style.transform="translateX(20px)",y.style.opacity="0",setTimeout(()=>{let z=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");z.push(s.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(z)),D(),O()},250)},x.appendChild(T)}if(y.appendChild(x),s.title){let T=document.createElement("div");Object.assign(T.style,i.msgTitle),T.textContent=s.title,y.appendChild(T)}if(!c){let T=document.createElement("div");Object.assign(T.style,i.metaContainer),T.innerHTML=`<span style="font-weight:600">${s.author}</span> \u2022 <span>${r(s.date)}</span>`,y.appendChild(T)}let w=document.createElement("div");return Object.assign(w.style,i.cardBody),w.innerHTML=b(s.text),y.appendChild(w),y}D();let q=document.createElement("div");Object.assign(q.style,Ye),q.className="no-drag",p.appendChild(q),Xe(p,q),document.body.appendChild(p);let m=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),g=Ue.some(s=>!m.includes(s.id));return{toggle:u,hasUnread:g}}function Mo(){if(window.techSolInitialized){Et();return}window.techSolInitialized=!0,console.log("\u{1F680} TechSol Suite Initializing...");try{Vt();try{Z.initGlobalListeners(),Z.playStartup()}catch(a){console.warn("\xC1udio n\xE3o p\xF4de ser iniciado automaticamente:",a)}He.fetchTips(),Et();let e=go(),t=bo(),n=ho(),o=xo(),r=yo();io({toggleNotes:e,toggleEmail:t,toggleScript:n,toggleLinks:o,broadcastControl:r})}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),oe("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}Mo();})();
