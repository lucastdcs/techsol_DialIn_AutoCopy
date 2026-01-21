(()=>{var gt="",bt="",Jt=t=>new Promise(e=>setTimeout(e,t));async function eo(){if(gt&&bt)return gt;try{let t=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!t)return"Agente";t.click(),await Jt(150);let e="Consultor",n=document.querySelector("profile-details .name");if(n)e=n.textContent.trim().split(" ")[0],e=e.charAt(0).toUpperCase()+e.slice(1).toLowerCase();else{let i=document.querySelector("profile-details img");if(i&&i.src.includes("/photos/")){let s=i.src.match(/\/photos\/([^\?]+)/)[1];e=s.charAt(0).toUpperCase()+s.slice(1)}}let o=document.querySelector("profile-details .email");return o&&(bt=o.textContent.trim(),console.log("TechSol: Identidade confirmada ->",bt)),t.click(),document.body.click(),gt=e,e}catch(t){return console.warn("Sherlock falhou:",t),"Consultor"}}function _t(){return gt||"Consultor"}function ft(){return bt||null}function to(t){let e=new Date,n=e.getHours(),o=e.getDay(),i="Ol\xE1",s="";n>=5&&n<12?(i="Bom dia",s='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):n>=12&&n<18?(i="Boa tarde",s='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(i="Boa noite",s='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let a=[];n>=0&&n<5?a=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:n<12?o===1?a=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:o===5?a=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:a=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:n<18?a=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:a=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(o===0||o===6)&&(a=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let r=a[Math.floor(Math.random()*a.length)];return{prefix:`${i},`,name:t,suffix:r,icon:s,isFriday:o===5}}async function Go(){try{let e=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!e)return null;let n=e.parentElement,o=n.querySelector(".unmask-button")||n.querySelector('[aria-label="Click to view"]');o&&(o.click(),await Jt(500));let s=Array.from(n.querySelectorAll("a, span, div, pii-value")).find(a=>{let r=a.innerText.trim();return r.includes("@")&&!r.includes("Is this:")&&r.toLowerCase()!=="email"});return s?s.innerText.trim():null}catch(t){return console.warn("Erro ao capturar email do cliente:",t),null}}function Bo(){try{let t=document.querySelector('material-input[debug-id="account-id-input"]');if(t){let e=t.querySelector("input");if(e){let n=e.value.trim();if(n)return n.includes("@")?n:`${n}@google.com`}}}catch(t){console.warn("Erro ao capturar email interno:",t)}return null}async function it(){let t="Cliente",e="[INSERIR URL]";try{let s=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(s&&s.nextElementSibling){let a=s.nextElementSibling.innerText.trim();a&&(t=a)}}catch(i){console.warn("Falha Nome:",i)}try{let s=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(s&&s.nextElementSibling){let a=s.nextElementSibling.innerText.trim();a&&(e=a)}}catch(i){console.warn("Falha URL:",i)}let n=await Go(),o=Bo();return{advertiserName:t,websiteUrl:e,clientEmail:n,internalEmail:o,agentName:_t()}}var Ue=null,Rt=null,Le=.3;function Ve(){if(!Ue){let t=window.AudioContext||window.webkitAudioContext;t&&(Ue=new t)}return Ue&&Ue.state==="suspended"&&Ue.resume(),Ue}function oo(t){if(Rt)return Rt;let e=t.sampleRate*2,n=t.createBuffer(1,e,t.sampleRate),o=n.getChannelData(0);for(let i=0;i<e;i++)o[i]=Math.random()*2-1;return Rt=n,n}var K={playClick:()=>{let t=Ve();if(!t)return;let e=t.currentTime,n=t.createBufferSource();n.buffer=oo(t);let o=t.createBiquadFilter();o.type="highpass",o.frequency.value=4e3;let i=t.createGain();i.gain.setValueAtTime(Le*.8,e),i.gain.exponentialRampToValueAtTime(.001,e+.015),n.connect(o),o.connect(i),i.connect(t.destination),n.start(e),n.stop(e+.02)},playHover:()=>{let t=Ve();if(!t)return;let e=t.currentTime,n=t.createOscillator();n.type="sine",n.frequency.setValueAtTime(400,e);let o=t.createGain();o.gain.setValueAtTime(0,e),o.gain.linearRampToValueAtTime(Le*.1,e+.005),o.gain.linearRampToValueAtTime(0,e+.02),n.connect(o),o.connect(t.destination),n.start(e),n.stop(e+.03)},playSuccess:()=>{let t=Ve();if(!t)return;let e=t.currentTime;[1046.5,1567.9].forEach((o,i)=>{let s=t.createOscillator(),a=t.createGain();s.type="sine",s.frequency.value=o,a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(Le*.6,e+.05),a.gain.exponentialRampToValueAtTime(.001,e+.6),s.connect(a),a.connect(t.destination),s.start(e),s.stop(e+.7)})},playGenieOpen:()=>{let t=Ve();if(!t)return;let e=t.currentTime,n=t.createBufferSource();n.buffer=oo(t);let o=t.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(100,e),o.frequency.exponentialRampToValueAtTime(800,e+.2);let i=t.createGain();i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(Le*.5,e+.05),i.gain.linearRampToValueAtTime(0,e+.25),n.connect(o),o.connect(i),i.connect(t.destination),n.start(e),n.stop(e+.3)},playError:()=>{let t=Ve();if(!t)return;let e=t.currentTime,n=t.createOscillator(),o=t.createGain();n.type="triangle",n.frequency.setValueAtTime(120,e),n.frequency.exponentialRampToValueAtTime(80,e+.1),o.gain.setValueAtTime(Le,e),o.gain.exponentialRampToValueAtTime(.001,e+.15),n.connect(o),o.connect(t.destination),n.start(e),n.stop(e+.2)},playStartup:()=>{let t=Ve();if(!t)return;let e=t.currentTime,n=.12,o=t.createOscillator(),i=t.createGain(),s=t.createBiquadFilter();o.type="square",o.frequency.setValueAtTime(400,e),o.frequency.exponentialRampToValueAtTime(50,e+.1),s.type="lowpass",s.frequency.setValueAtTime(800,e),s.frequency.exponentialRampToValueAtTime(100,e+.1),i.gain.setValueAtTime(Le*4,e),i.gain.exponentialRampToValueAtTime(.001,e+.1),o.connect(s),s.connect(i),i.connect(t.destination),o.start(e),o.stop(e+.12);let a=t.createOscillator(),r=t.createGain();a.type="sine",a.frequency.setValueAtTime(150,e),a.frequency.exponentialRampToValueAtTime(50,e+.15),r.gain.setValueAtTime(Le*1.5,e),r.gain.exponentialRampToValueAtTime(.001,e+.15),a.connect(r),r.connect(t.destination),a.start(e),a.stop(e+.15),[55,55.4,110.5].forEach(d=>{let p=t.createOscillator(),c=t.createGain(),f=t.createBiquadFilter();p.type="sawtooth",p.frequency.value=d,f.type="lowpass",f.frequency.setValueAtTime(30,e),f.frequency.linearRampToValueAtTime(900,e+n+.2),f.frequency.exponentialRampToValueAtTime(40,e+3),c.gain.setValueAtTime(0,e),c.gain.linearRampToValueAtTime(Le*.6,e+n+.1),c.gain.exponentialRampToValueAtTime(.001,e+3.5),p.connect(f),f.connect(c),c.connect(t.destination),p.start(e),p.stop(e+3.6)})},playNotification:()=>{let t=Ve();if(!t)return;let e=t.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(o=>{let i=t.createOscillator(),s=t.createGain();i.type="sine",i.frequency.setValueAtTime(o.freq,e),s.gain.setValueAtTime(0,e),s.gain.linearRampToValueAtTime(Le*o.vol,e+.004),s.gain.exponentialRampToValueAtTime(.001,e+o.dur),i.connect(s),s.connect(t.destination),i.start(e),i.stop(e+o.dur+.1)})},playSwoosh:()=>{K.playGenieOpen()},playReset:()=>{K.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let t=0,e=50;document.addEventListener("mouseover",n=>{if(!Ue)return;let o=n.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!o||o.contains(n.relatedTarget))return;let i=Date.now();i-t<e||(K.playHover(),t=i)},{passive:!0})}};var no=1e4;function io(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let t=document.createElement("link");t.id="google-font-roboto",t.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",t.rel="stylesheet",document.head.appendChild(t);let e=document.createElement("style");e.id="techsol-global-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function U(t,e={}){let n=document.createElement("div"),o=e.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(n.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:o,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),n.textContent=t,document.body.appendChild(n),e.error?K.playError():K.playSuccess(),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>n.remove(),400)},e.duration||4e3)}function so(t,e=null){let n=0,o=0,i=0,s=0,a=e||t;a.style.cursor="grab",a.onmousedown=r;function r(p){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(p.target.tagName)||p.target.closest(".no-drag"))return;p=p||window.event,a.style.cursor="grabbing",t.style.transition="none";let c=t.getBoundingClientRect();t.style.transform="none",t.style.left=c.left+"px",t.style.top=c.top+"px",t.style.margin="0",t.style.bottom="auto",t.style.right="auto",no++,t.style.zIndex=no,i=p.clientX,s=p.clientY,t.setAttribute("data-dragging","true"),document.onmouseup=d,document.onmousemove=u}function u(p){p=p||window.event,p.preventDefault(),n=i-p.clientX,o=s-p.clientY,i=p.clientX,s=p.clientY;let c=t.offsetTop-o,f=t.offsetLeft-n,w=16,A=window.innerWidth,b=window.innerHeight,O=t.offsetWidth,k=t.offsetHeight;f<w?f=w:f+O>A-w&&(f=A-O-w),c<w?c=w:c+k>b-w&&(c=b-k-w),t.style.top=c+"px",t.style.left=f+"px"}function d(){document.onmouseup=null,document.onmousemove=null,a.style.cursor="grab",setTimeout(()=>{t.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",t.setAttribute("data-dragging","false"),t.setAttribute("data-moved","true")},50)}}var Ce={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var zt={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},ht={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var ro={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var ye={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var Dt=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],ao=-1;function st(){let t=Math.floor(Math.random()*Dt.length);return t===ao&&(t=(t+1)%Dt.length),ao=t,Dt[t]}var Ne=t=>new Promise(e=>setTimeout(e,t));async function Po(t,e){if(!t)return;t.style.opacity="1",t.innerHTML='<span class="cursor">|</span>';let n=t.querySelector(".cursor");await Ne(200);for(let o=0;o<e.length;o++){let i=e.charAt(o),s=document.createElement("span");s.textContent=i,n&&n.parentNode===t?n.before(s):t.appendChild(s);let a=Math.floor(Math.random()*60)+30;o===0&&(a=150),o>e.length-3&&(a=30),await Ne(a)}await Ne(600),n&&(n.style.display="none")}async function Gt(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let e=document.createElement("style");e.id="google-splash-style",e.innerHTML=`
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
    `,document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1");try{await Ne(200);let e=await eo(),n=to(e),o=t.querySelector("#w-icon"),i=t.querySelector("#p1"),s=t.querySelector("#p2"),a=t.querySelector("#p3"),r=t.querySelector("#p-sextou");o&&(o.innerHTML=n.icon),i&&(i.textContent=n.prefix),a&&(a.textContent=n.suffix),await Ne(300);let u=o?o.querySelector("svg"):null;if(u&&(u.style.opacity="1",u.style.transform="scale(1)"),await Ne(400),i&&(i.style.opacity="1"),K.playStartup(),s&&await Po(s,n.name),a&&(a.style.opacity="1",a.style.transform="translateY(0)"),n.isFriday&&r){await Ne(400),r.style.display="block",r.offsetWidth;let d=r.querySelector(".sextou-badge");d&&(d.style.opacity="1",d.style.transform="scale(1)")}await Ne(1500)}catch(e){console.warn("Splash error, skipping...",e)}finally{t.classList.add("splash-exit"),await Ne(900),t.parentNode&&t.parentNode.removeChild(t)}}var Ze={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Je(t,e){e.onmousedown=n;function n(o){o.stopPropagation(),o.preventDefault();let i=t.style.transition;t.style.transition="none";let s=o.clientX,a=o.clientY,r=parseFloat(getComputedStyle(t,null).getPropertyValue("width").replace("px","")),u=parseFloat(getComputedStyle(t,null).getPropertyValue("height").replace("px","")),d=s,p=a,c=!1;function f(b){d=b.clientX,p=b.clientY,c||(window.requestAnimationFrame(()=>{w(),c=!1}),c=!0)}function w(){let b=r+(d-s),O=u+(p-a);b>360&&(t.style.width=b+"px"),O>300&&(t.style.height=O+"px")}function A(){document.removeEventListener("mousemove",f),document.removeEventListener("mouseup",A),setTimeout(()=>{t.style.transition=i},50)}document.addEventListener("mousemove",f),document.addEventListener("mouseup",A)}e.onmouseenter=()=>e.style.opacity="1",e.onmouseleave=()=>e.style.opacity="0.6"}function lo(t){if(!t)return"";let e={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return t.replace(/:([a-zA-Z0-9-_+]+):/g,n=>e[n]?e[n]:"")}var et=t=>new Promise(e=>setTimeout(e,t));function rt(t){t&&["mousedown","mouseup","click"].forEach(e=>t.dispatchEvent(new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window})))}var co="cw-automation-styles";if(!document.getElementById(co)){let t=document.createElement("style");t.id=co,t.innerHTML=`
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
    `,document.head.appendChild(t)}function po(t){let e=document.getElementById("cw-loading-overlay");t?e?e.style.opacity="1":(e=document.createElement("div"),e.id="cw-loading-overlay",document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1")):e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}async function uo(t){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let e=document.getElementById(t),n="";po(!0),e&&(n=e.placeholder,e.placeholder="Buscando ID...",e.value="",e.classList.add("cw-scanning-active"));try{let o=document.querySelector('material-button[debug-id="dock-item-case-log"]');o&&!o.classList.contains("selected")&&(rt(o),await et(1200));let i=document.querySelector("search-filter dropdown-button .button");if(i&&!(i.innerText||"").includes("All")){rt(i),await et(600);let f=document.querySelector('material-checkbox[debug-id="check-all-box"]');f&&f.getAttribute("aria-checked")!=="true"&&(rt(f),await et(300));let w=document.querySelector('material-button[debug-id="apply-filter"]');w&&(rt(w),await et(1500))}let s=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");s&&(s.scrollTop=s.scrollHeight,await et(500));let a=Array.from(document.querySelectorAll(".message-header"));for(let c=a.length-1;c>=0;c--){let f=a[c],w=f.querySelector("i.material-icons-extended"),A=w&&w.innerText.trim()==="phone_in_talk",b=f.innerText||"",O=b.includes("Agent joined")||b.includes("outbound-call")||b.includes("Speakeasy");if(A||O){f.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",f),e&&(e.placeholder="Lendo mensagem..."),rt(f),await et(1e3));break}}let u=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),d=/Speakeasy.*?(P\d{15,25})/i,p=null;for(let c=u.length-1;c>=0;c--){let f=u[c];if(f.offsetParent===null)continue;let w=(f.innerText||"").match(d);if(w&&w[1]){p=w[1];break}}if(e)if(p){try{await navigator.clipboard.writeText(p)}catch{}e.value=p,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),K.playSuccess(),U(`ID Localizado: ${p}`),e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}else K.playError(),U("Nenhum ID encontrado.",{error:!0}),e.placeholder="N\xE3o encontrado",e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}catch(o){console.error("Erro na automa\xE7\xE3o:",o),U("Erro ao processar.",{error:!0})}finally{e&&(e.classList.remove("cw-scanning-active"),e.value||(e.placeholder=n)),po(!1)}}var _e={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:"}},ze={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},lt={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>Substatus:</b> DC - Other<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br>Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},We={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},ct=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],Bt=["CONSIDERACOES","COMENTARIOS"],Ie={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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
\u2022 Tentativa 2 -`}};var be=t=>new Promise(e=>setTimeout(e,t));function ve(t,e="info"){let n={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${t}`,n[e]||n.info)}function qe(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>t.dispatchEvent(new MouseEvent(n,e)))}function xt(t,e){if(!t)return;let n=`cw-warning-${t.id||Math.random().toString(36).substr(2,9)}`,o=document.getElementById(n);o&&o.remove();let i=t.getBoundingClientRect(),s=document.createElement("div");s.id=n,s.style.cssText=`
        position: fixed;
        top: ${i.bottom+8}px;
        left: ${i.left}px;
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
    `,s.innerHTML=`
        <div style="display:flex; align-items:flex-start; gap:10px;">
            <span style="color:#F9AB00; font-size:16px; margin-top:1px;">\u26A0\uFE0F</span>
            <span style="line-height:1.4;">${e}</span>
        </div>
        <div class="cw-close-btn" style="
            cursor: pointer; color: #5f6368; font-weight: bold; font-size: 16px; 
            padding: 0 4px; line-height: 1; opacity: 0.6; transition: opacity 0.2s;
        ">\xD7</div>
    `;let a=s.querySelector(".cw-close-btn");a.onclick=()=>{s.style.opacity="0",s.style.transform="translateY(-5px)",setTimeout(()=>s.remove(),300)},document.body.appendChild(s),requestAnimationFrame(()=>{s.style.opacity="1",s.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(s)&&a.click()},25e3)}async function yt(t,e){if(!t||!e)return;t.focus(),t.value="",t.dispatchEvent(new Event("input",{bubbles:!0})),await be(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),await be(100),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function Pt(){let e=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(n=>{let o=n.offsetParent!==null,i=n.closest("case-message-view")!==null,s=n.closest(".editor")!==null||n.closest("write-card")!==null;return o&&!i&&s});return e&&ve("Editor visualmente detectado.","success"),e}async function mo(){ve("\u{1F680} FASE 1: Tentando abrir a janela de email...");let t=!1,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(c=>c.innerText.trim()==="email");if(n&&n.offsetParent!==null){ve("Bot\xE3o de email direto encontrado.");let c=n.closest("material-button")||n.closest("material-fab")||n;qe(c),t=!0}else{ve("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let c=document.querySelector("material-fab-speed-dial");if(c){let f=c.querySelector(".trigger");if(f){qe(f),await be(800);let A=Array.from(document.querySelectorAll("i.material-icons-extended")).find(b=>b.innerText.trim()==="email");A&&(qe(A),t=!0)}}}if(!t)return U("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;ve("\u{1F680} FASE 2: Verificando rascunhos...");let o=null,i=0,s=20;for(;i<s;){await be(250);let c=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(o=Array.from(c).find(f=>f.offsetParent!==null),o){ve("\u26A0\uFE0F Rascunho detectado!","warn");break}i++}if(o){ve("\u{1F5D1}\uFE0F Descartando..."),qe(o),o.click();let c=null,f=0;for(;f<15;){await be(300);let w=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(c=Array.from(w).find(A=>A.offsetParent!==null),c)break;f++}c&&(qe(c),U("Limpando rascunho antigo...",{duration:2e3}),await be(2500))}ve("\u{1F680} FASE 3: Buscando editor final...");let a=0,r=null;for(;a<20&&(r=Pt(),!r);)await be(250),a++;if(!r)return U("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let u=r.closest('[id="email-body-content-top"]'),p=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(u){if(p){let f=p.closest('[aria-hidden="true"]');f&&f.removeAttribute("aria-hidden"),p.focus(),qe(p)}await be(300),u.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let c=u.querySelector("#cases-body-field");if(c){let f=document.createRange();f.selectNodeContents(c),f.collapse(!0);let w=window.getSelection();w.removeAllRanges(),w.addRange(f)}return!0}return!1}async function vt(t){if(!t||!await mo())return;let n=await it();ve("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let o=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(o&&(o.click(),await be(600)),n.clientEmail&&n.clientEmail!=="N/A"&&n.clientEmail!=="N/A (Bloqueado)"){let s=document.querySelector('input[aria-label="Enter To email address"]');s&&(await yt(s,n.clientEmail),xt(s,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(n.internalEmail){let s=document.querySelector('input[aria-label="Enter Bcc email address"]');s&&(await yt(s,n.internalEmail),xt(s,`
                <strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.
                <div style="margin-top:4px;">
                    <a href="https://mail.google.com/mail/u/0?ui=2&ik=ed23fb3167&attid=0.1&permmsgid=msg-f:1843445102914241244&th=19953b8dda2302dc&view=fimg&fur=ip&permmsgid=msg-f:1843445102914241244&sz=s0-l75-ft&attbid=ANGjdJ9m7O33cM36sxBYohVD6Qsapyux4PNr8qmTBlZ8zkp_LR79suGZhnxFJtBoFDeyMFygsH_tvCts5fnX0WV4rdClw9YqqR7guLnaXU9UzmZRRMRXEoC7T_MPbwo&disp=emb&realattid=ii_mfmv7wjm1&zw" target="_blank" style="color:#1a73e8;text-decoration:none;font-weight:500;display:inline-flex;align-items:center;">
                        Consultar Regra <span style="font-size:14px;margin-left:2px;">\u2197</span>
                    </a>
                </div>
            `))}await be(500);let i=document.querySelector('material-button[debug-id="canned_response_button"]');if(i){qe(i),await be(1e3);let s=document.querySelector("material-auto-suggest-input input");if(s){qe(s),document.execCommand("insertText",!1,t),s.dispatchEvent(new Event("input",{bubbles:!0})),ve("\u23F3 Buscando resultado da Canned Response...","info");let a=null,r=0,u=15e3,d=500;for(;r<u&&(a=document.querySelector("material-select-dropdown-item"),!a);)await be(d),r+=d;if(a){qe(a),await be(1500);let p=Pt();if(p&&n.advertiserName){let c=p.innerHTML;c.includes("{%ADVERTISER_NAME%}")&&(p.innerHTML=c.replace(/{%ADVERTISER_NAME%}/g,n.advertiserName))}U("Canned Response aplicada!")}else ve(`\u274C Timeout: Resultado '${t}' n\xE3o apareceu ap\xF3s 15s.`,"error"),U(`Timeout: Template '${t}' n\xE3o carregou.`,{error:!0})}}else U("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function go(t){if(ve(`\u{1F680} Iniciando Quick Email: ${t.name}`),!await mo())return;let n=await it(),o=_t();await be(600),ve("\u{1F4E7} Processando destinat\xE1rios...");let i=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(i&&(i.click(),await be(600)),n.clientEmail&&n.clientEmail!=="N/A"&&n.clientEmail!=="N/A (Bloqueado)"){let r=document.querySelector('input[aria-label="Enter To email address"]');r&&(await yt(r,n.clientEmail),xt(r,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(n.internalEmail){let r=document.querySelector('input[aria-label="Enter Bcc email address"]');r&&(await yt(r,n.internalEmail),xt(r,`
                <strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.
                <div style="margin-top:4px;">
                    <a href="https://mail.google.com/mail/u/0?ui=2&ik=ed23fb3167&attid=0.1&permmsgid=msg-f:1843445102914241244&th=19953b8dda2302dc&view=fimg&fur=ip&permmsgid=msg-f:1843445102914241244&sz=s0-l75-ft&attbid=ANGjdJ9m7O33cM36sxBYohVD6Qsapyux4PNr8qmTBlZ8zkp_LR79suGZhnxFJtBoFDeyMFygsH_tvCts5fnX0WV4rdClw9YqqR7guLnaXU9UzmZRRMRXEoC7T_MPbwo&disp=emb&realattid=ii_mfmv7wjm1&zw" target="_blank" style="color:#1a73e8;text-decoration:none;font-weight:500;display:inline-flex;align-items:center;">
                        Consultar Regra <span style="font-size:14px;margin-left:2px;">\u2197</span>
                    </a>
                </div>
            `))}let s=document.querySelector('input[aria-label="Subject"]');s&&t.subject&&(s.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(s,t.subject),s.dispatchEvent(new Event("input",{bubbles:!0})),await be(300));let a=Pt();if(a){let u=(a.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');u&&(u.focus(),qe(u));let d=new Date;d.setDate(d.getDate()+3);let p=d.getDay();p===6?d.setDate(d.getDate()+2):p===0&&d.setDate(d.getDate()+1);let c=d.toLocaleDateString("pt-BR"),f=t.body;f=f.replace(/\[Nome do Cliente\]/g,n.advertiserName||"Cliente"),f=f.replace(/\[INSERIR URL\]/g,n.websiteUrl||"seu site"),f=f.replace(/\[URL\]/g,n.websiteUrl||"seu site"),f=f.replace(/\[Seu Nome\]/g,o),f=f.replace(/\[MM\/DD\/YYYY\]/g,c),document.execCommand("insertHTML",!1,f),u&&(u.dispatchEvent(new Event("input",{bubbles:!0})),u.dispatchEvent(new Event("change",{bubbles:!0}))),U("Email preenchido com sucesso!",{duration:2e3}),ve("\u2705 Processo finalizado com sucesso.","success")}else U("Erro ao focar no editor.",{error:!0})}var jo={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},bo={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function Se(t,e,n,o,i,s){let a=document.createElement("div");Object.assign(a.style,jo),so(t,a);let r=document.createElement("div");Object.assign(r.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),a.appendChild(r),i&&(i.googleLine=r);let u=document.createElement("div");Object.assign(u.style,{display:"flex",alignItems:"center",gap:"12px"});let d=document.createElement("img");d.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(d.style,{width:"20px",height:"20px",pointerEvents:"none"});let p=document.createElement("span");p.textContent=e,u.appendChild(d),u.appendChild(p);let c=document.createElement("div");Object.assign(c.style,{display:"flex",alignItems:"center",gap:"4px"});let f='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',w='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',A=document.createElement("div");A.innerHTML=f,Object.assign(A.style,bo),A.title="Sobre & Feedback",A.classList.add("no-drag"),A.onmouseenter=()=>{A.style.background="rgba(255,255,255,0.1)",A.style.color="#FFF"},A.onmouseleave=()=>{A.style.color!=="rgb(138, 180, 248)"&&(A.style.background="transparent",A.style.color="#9AA0A6")};let b=document.createElement("div");b.innerHTML=w,Object.assign(b.style,bo),b.title="Fechar",b.classList.add("no-drag"),b.onmouseenter=()=>{b.style.background="rgba(242, 139, 130, 0.2)",b.style.color="#F28B82"},b.onmouseleave=()=>{b.style.background="transparent",b.style.color="#9AA0A6"},b.onmousedown=k=>k.stopPropagation(),A.onmousedown=k=>k.stopPropagation(),b.onclick=s;let O=Ho(t,e,n,o);return A.onclick=k=>{k.stopPropagation(),O.style.opacity==="1"?(O.style.opacity="0",O.style.pointerEvents="none",A.style.color="#9AA0A6",A.style.background="transparent"):(O.style.opacity="1",O.style.pointerEvents="auto",A.style.color="#8AB4F8",A.style.background="rgba(138, 180, 248, 0.1)")},c.appendChild(A),c.appendChild(b),a.appendChild(u),a.appendChild(c),a}function Ho(t,e,n,o){let i=document.createElement("div");return Object.assign(i.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),i.innerHTML=`
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
    `,setTimeout(()=>{let s=i.querySelector("#cw-feedback-link");s&&(s.onmouseenter=()=>{s.style.backgroundColor="#E8F0FE",s.style.transform="scale(1.02)"},s.onmouseleave=()=>{s.style.backgroundColor="#F8F9FA",s.style.transform="scale(1)"});let a=i.querySelector("#close-help-internal");a&&(a.onmouseover=()=>a.style.backgroundColor="#f8f9fa",a.onmouseout=()=>a.style.backgroundColor="white",a.onclick=()=>{i.style.opacity="0",i.style.pointerEvents="none"})},0),t.appendChild(i),i}if(!document.getElementById("cw-module-styles")){let t=document.createElement("style");t.id="cw-module-styles",t.innerHTML=`
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
    `,document.head.appendChild(t)}function Ee(t,e,n){let o=document.getElementById(n);if(!e)return;let i=e.getAttribute("data-moved")==="true",s={x:0,y:0};if(o){let p=o.getBoundingClientRect();s.x=p.left+p.width/2,s.y=p.top+p.height/2}let a,r;if(!i)a=window.innerWidth/2,r=window.innerHeight/2;else{let p=e.getBoundingClientRect();a=p.left+p.width/2,r=p.top+p.height/2,a===0&&r===0&&(a=window.innerWidth/2,r=window.innerHeight/2)}let u=s.x-a,d=s.y-r;t?(K.playGenieOpen(),e.style.transition="none",e.style.opacity="0",e.style.pointerEvents="auto",i?e.style.transform=`translate(${u}px, ${d}px) scale(0.05)`:e.style.transform=`translate(calc(-50% + ${u}px), calc(-50% + ${d}px)) scale(0.05)`,e.offsetWidth,requestAnimationFrame(()=>{e.classList.add("open"),o&&o.classList.add("active"),e.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",e.style.opacity="1",i?e.style.transform="translate(0, 0) scale(1)":e.style.transform="translate(-50%, -50%) scale(1)"}),typeof fo=="function"&&fo(e,n)):(K.playSwoosh(),e.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",e.style.pointerEvents="none",requestAnimationFrame(()=>{e.style.opacity="0",i?e.style.transform=`translate(${u}px, ${d}px) scale(0.1)`:e.style.transform=`translate(calc(-50% + ${u}px), calc(-50% + ${d}px)) scale(0.1)`}),setTimeout(()=>{e.classList.remove("open"),o&&o.classList.remove("active"),e.style.transition="",e.style.transform=""},300),typeof jt=="function"&&jt(e))}function fo(t,e){jt(t);let n=o=>{if(!t.classList.contains("open"))return;let i=t.contains(o.target),s=document.querySelector(".cw-pill"),a=s&&s.contains(o.target);i?(t.classList.remove("idle"),t.style.zIndex="2147483648"):a||(t.classList.add("idle"),t.style.zIndex="2147483646")};t._idleHandler=n,document.addEventListener("mousedown",n)}function jt(t){t._idleHandler&&(document.removeEventListener("mousedown",t._idleHandler),t._idleHandler=null)}var $o="https://script.google.com/a/macros/google.com/s/AKfycbxFxh1cVk6r0t_JTA2TBfHBLJe_mOBQFsidwL1jwsUDcBtQYk3afu25SN-FR3vafJChHw/exec",Ht="cw_data_broadcast",ho="cw_data_tips",Vo=["Processando...","Mantenha o foco!","Aguarde..."];function wt(t,e={}){return new Promise((n,o)=>{let i="cw_cb_"+Math.round(1e5*Math.random()),s=document.createElement("script");window[i]=u=>{document.body.contains(s)&&document.body.removeChild(s),delete window[i],n(u)};let a=Object.keys(e).map(u=>encodeURIComponent(u)+"="+encodeURIComponent(e[u])).join("&"),r=`${$o}?op=${t}&callback=${i}&t=${Date.now()}&${a}`;s.src=r,s.onerror=()=>{document.body.contains(s)&&document.body.removeChild(s),delete window[i],o(new Error("JSONP Error (Check Corp Login)"))},document.body.appendChild(s)})}var we={fetchTips:async()=>{try{let t=await wt("tips");t?.tips&&localStorage.setItem(ho,JSON.stringify(t.tips))}catch(t){console.warn("Tips offline",t)}},fetchData:async()=>{try{let t=await wt("broadcast");if(t?.broadcast)return localStorage.setItem(Ht,JSON.stringify(t.broadcast)),t}catch(t){console.warn("Broadcast offline",t)}return{broadcast:JSON.parse(localStorage.getItem(Ht)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(Ht)||"[]"),getRandomTip:()=>{let t=Vo,e=localStorage.getItem(ho);if(e)try{t=JSON.parse(e)}catch{}return t[Math.floor(Math.random()*t.length)]},sendBroadcast:async t=>{let e={...t,date:new Date().toISOString(),id:Date.now().toString()};return await we._performOp("new_broadcast",e)},updateBroadcast:async(t,e)=>{let n={id:t,...e};return await we._performOp("update_broadcast",n)},deleteBroadcast:async t=>await we._performOp("delete_broadcast",{id:t}),_performOp:async(t,e)=>{try{console.log(`\u{1F4E4} Executando ${t}...`,e);let n=await wt(t,e);return n&&n.status==="success"?(console.log("\u2705 Sucesso:",t),!0):(console.warn("\u26A0\uFE0F Falha:",n),!1)}catch(n){return console.error("\u274C Erro JSONP:",n),!1}},logEvent:(t,e,n="",o=null)=>{try{let i="anon";try{let a=ft();a&&(i=a.split("@")[0].toLowerCase())}catch{}let s={timestamp:new Date().toISOString(),user:i,version:"v4.5.1",category:t,action:e,label:n,value:o||""};wt("log",s).catch(a=>{})}catch(i){console.warn("Analytics error",i)}},logUsage:()=>{}};var ce={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5"},At=t=>new Promise(e=>setTimeout(e,t));function xo(t){let e="cw-command-center-style";if(!document.getElementById(e)){let b=document.createElement("style");b.id=e,b.innerHTML=`
            @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@500&display=swap');

            .cw-focus-backdrop {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0, 0, 0, 0.4); backdrop-filter: blur(4px);
                z-index: 2147483646; opacity: 0; pointer-events: none;
                transition: opacity 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
            }
            .cw-focus-backdrop.active { opacity: 1; pointer-events: auto; }

            /* --- ESTADO ABERTO (A M\xE1gica acontece aqui) --- */
            .cw-pill {
                position: fixed; top: 30%; right: 24px;
                display: flex; flex-direction: column; align-items: center; gap: 12px;
                padding: 16px 8px;
                
                background: ${ce.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${ce.glassBorder}; border-radius: 50px;
                box-shadow: 0 12px 32px rgba(0,0,0,0.2); z-index: 2147483647;
                
                opacity: 0; 
                min-width: 50px; 
                overflow: hidden;

                /* SEQU\xCANCIA DE ABERTURA: Container PRIMEIRO (Delay 0s) */
                transition: 
                    width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s, 
                    height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s,
                    padding 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0s,
                    border-radius 0.4s ease 0s,
                    opacity 0.3s ease 0s,
                    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0s;
            }
            .cw-pill.docked { opacity: 1; transform: translateX(0) scale(1); }

            /* --- ESTADO COLAPSADO (A Bolinha) --- */
            .cw-pill.collapsed {
                width: 50px !important; 
                height: 50px !important;
                padding: 0 !important;
                border-radius: 50% !important;
                gap: 0;
                cursor: pointer;

                /* SEQU\xCANCIA DE FECHAMENTO: Container DEPOIS (Delay 0.2s) */
                /* Espera o conte\xFAdo sumir para n\xE3o "mastigar" os \xEDcones */
                transition: 
                    width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.2s,
                    height 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 1s,
                    padding 0.5s ease 0.2s,
                    border-radius 0.5s ease 1s,
                    opacity 0.3s ease 0s,
                    transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 1s !important;
            }
            
            /* --- CONTE\xDADO INTERNO (Bot\xF5es) --- */
            .cw-btn, .cw-grip, .cw-sep, .cw-status-container {
                opacity: 1;
                transform: scale(1);
                
                /* ABERTURA: Conte\xFAdo aparece DEPOIS (Delay 0.3s) */
                /* D\xE1 tempo da p\xEDlula esticar antes de mostrar o recheio */
                transition: 
                    opacity 0.3s ease 0.3s, 
                    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s;
            }

            /* --- CONTE\xDADO QUANDO FECHADO --- */
            .cw-pill.collapsed .cw-btn, 
            .cw-pill.collapsed .cw-grip, 
            .cw-pill.collapsed .cw-sep, 
            .cw-pill.collapsed .cw-status-container {
                opacity: 0; 
                pointer-events: none; 
                transform: scale(0.5); /* Encolhe para o fundo */
                
                /* FECHAMENTO: Conte\xFAdo some PRIMEIRO (Delay 0s) */
                transition: 
                    opacity 0.15s ease 0s, 
                    transform 0.15s ease 0s;
            }

            /* --- LOGO PRINCIPAL --- */
            .cw-main-logo {
                position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                display: flex; align-items: center; justify-content: center;
                opacity: 0; pointer-events: none; 
                transform: scale(0.5) rotate(-90deg);
                color: #fff;
                
                /* Some r\xE1pido ao abrir */
                transition: all 0.2s ease 0s;
            }
            .cw-main-logo svg { width: 24px; height: 24px; fill: currentColor; }
            
            .cw-pill.collapsed .cw-main-logo { 
                opacity: 1; 
                transform: scale(1) rotate(0deg);
                /* Aparece suavemente DEPOIS que virou bolinha (Delay 0.3s) */
                transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s;
            }

            /* --- RESTO DOS ESTILOS (Mantidos) --- */
            .cw-btn {
                width: 40px; height: 40px; 
                border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center; 
                cursor: pointer; position: relative; color: ${ce.iconIdle};
            }
            .cw-btn:hover { background: ${ce.glassHighlight}; color: ${ce.iconActive}; transform: scale(1.1) !important; }

            .cw-btn.notes.active { color: ${ce.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${ce.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${ce.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${ce.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.broadcast.active { color: ${ce.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${ce.teal} !important; background: rgba(0, 191, 165, 0.15); }
.cw-btn.timezone:hover { color: ${ce.teal}; filter: drop-shadow(0 0 5px rgba(0, 191, 165, 0.5)); }

            .cw-btn.notes:hover { color: ${ce.blue}; filter: drop-shadow(0 0 5px rgba(138, 180, 248, 0.5)); }
            .cw-btn.email:hover { color: ${ce.red}; filter: drop-shadow(0 0 5px rgba(242, 139, 130, 0.5)); }
            .cw-btn.script:hover { color: ${ce.purple}; filter: drop-shadow(0 0 5px rgba(197, 138, 249, 0.5)); }
            .cw-btn.links:hover { color: ${ce.green}; filter: drop-shadow(0 0 5px rgba(129, 201, 149, 0.5)); }
            .cw-btn.broadcast:hover { color: ${ce.orange}; filter: drop-shadow(0 0 5px rgba(249, 171, 0, 0.5)); }

            .cw-btn::before {
                content: ''; position: absolute; bottom: 2px; left: 50%; 
                width: 4px; height: 4px; border-radius: 50%;
                background-color: currentColor; box-shadow: 0 0 6px currentColor;
                transform: translateX(-50%) scale(0);
                transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); pointer-events: none;
            }
            .cw-btn.active::before { transform: translateX(-50%) scale(1); }
            
            .cw-btn svg { width: 22px; height: 22px; fill: currentColor; pointer-events: none; }

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
                transition: opacity 0.3s ease 0.3s; /* Delay tamb\xE9m no separador */
            }
            .cw-sep.visible { opacity: 1; }
            .cw-pill.collapsed .cw-sep { opacity: 0; transition: opacity 0.1s ease 0s; }

            .cw-grip {
                width: 100%; height: 24px; display: flex; align-items: center; justify-content: center; 
                cursor: grab; margin-bottom: 2px; 
            }
            .cw-grip-bar { 
                width: 24px; height: 4px; background-color: ${ce.iconIdle}; border-radius: 4px; 
                opacity: 0.4; transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1); 
            }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            .cw-grip:active { cursor: grabbing; }
            .cw-pill.dragging .cw-grip-bar { background-color: ${ce.blue}; width: 16px; opacity: 1; }

            @keyframes successPop {
                0% { box-shadow: 0 0 0 transparent; transform: scale(1); }
                50% { box-shadow: 0 0 15px #81C995; transform: scale(1.05); border-color: #81C995; }
                100% { box-shadow: 0 0 0 transparent; transform: scale(1); }
            }
            .cw-pill.system-check { animation: successPop 0.6s ease-out; }
            
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

            /* Processing Center */
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
            .cw-pill.processing-center.collapsed { background: #202124 !important; overflow: visible !important; }
            .cw-pill.processing-center .cw-main-logo { display: none !important; }
            .cw-pill.processing-center > *:not(.cw-center-stage) { display: none !important; }
            .cw-center-stage {
                display: flex; flex-direction: column; align-items: center; gap: 14px;
                width: 100%; opacity: 0; animation: fadeIn 0.4s ease forwards 0.1s;
                position: relative;
            }
            .cw-center-dots { display: flex; gap: 8px; }
            .cw-center-dots span { width: 8px; height: 8px; border-radius: 50%; animation: googleBounce 1.4s infinite ease-in-out both; }
            .cw-center-dots span:nth-child(1) { background-color: ${ce.blue}; animation-delay: -0.32s; }
            .cw-center-dots span:nth-child(2) { background-color: ${ce.red}; animation-delay: -0.16s; }
            .cw-center-dots span:nth-child(3) { background-color: ${ce.green}; }
            .cw-center-text {
                font-size: 13px; color: #E8EAED; text-align: center; max-width: 90%;
                font-weight: 500; line-height: 1.4; opacity: 0; transform: translateY(10px);
                animation: textSlideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; animation-delay: 0.2s;
            }
            .cw-center-success { display: none; color: ${ce.green}; }
            .cw-center-success svg { width: 40px; height: 40px; }
            .cw-center-success.show { display: block; animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            .cw-abort-btn {
                position: absolute; bottom: -32px; font-size: 10px; color: rgba(255, 255, 255, 0.2);
                cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600; 
                transition: all 0.3s ease; user-select: none; margin-bottom: 8px;
            }
            .cw-abort-btn:hover { color: #F28B82; opacity: 1; }
            @keyframes fadeIn { to { opacity: 1; } }
            @keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            @keyframes googleBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
            @keyframes textSlideUp { to { opacity: 1; transform: translateY(0); } }
        `,document.head.appendChild(b)}let n={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>'},o=document.createElement("div");o.className="cw-pill side-right collapsed",o.innerHTML=`
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
    `;let i=document.createElement("div");i.className="cw-focus-backdrop",document.body.appendChild(i),document.body.appendChild(o);let s=(b,O)=>{let k=o.querySelector(`.${b}`);o.querySelectorAll(".cw-btn").forEach(z=>{z!==k&&z.classList.remove("active")}),k.classList.toggle("active"),O()};if(o.querySelector(".notes").onclick=b=>{b.stopPropagation(),s("notes",t.toggleNotes)},o.querySelector(".email").onclick=b=>{b.stopPropagation(),s("email",t.toggleEmail)},o.querySelector(".script").onclick=b=>{b.stopPropagation(),s("script",t.toggleScript)},o.querySelector(".links").onclick=b=>{b.stopPropagation(),s("links",t.toggleLinks)},o.querySelector(".timezone").onclick=b=>{b.stopPropagation(),s("timezone",t.toggleTimezone)},o.querySelector(".broadcast").onclick=b=>{b.stopPropagation(),s("broadcast",()=>{let O=b.currentTarget.querySelector(".cw-badge");O&&O.remove(),t.broadcastControl&&t.broadcastControl.toggle()})},t.broadcastControl&&t.broadcastControl.hasUnread){let b=document.createElement("div");b.className="cw-badge",o.querySelector(".broadcast").appendChild(b)}let a=null;o.onmouseleave=()=>{o.querySelector(".cw-btn.active")||o.classList.contains("processing-center")||(a=setTimeout(()=>{o.classList.add("collapsed")},700))},o.onmouseenter=()=>{a&&clearTimeout(a)},(async function(){await At(2800),o.classList.add("docked"),await At(300);let O=o.querySelectorAll(".cw-btn");o.querySelectorAll(".cw-sep").forEach(k=>k.classList.add("visible"));for(let k=0;k<O.length;k++)O[k].classList.add("popped"),await At(90);await At(200),o.classList.add("system-check")})();let r=!1,u,d,p,c,f=3;o.onmousedown=b=>{if(b.target.closest("button"))return;b.preventDefault(),u=b.clientX,d=b.clientY;let O=o.getBoundingClientRect();p=O.left,c=O.top,document.addEventListener("mousemove",w),document.addEventListener("mouseup",A)};function w(b){let O=b.clientX-u,k=b.clientY-d;!r&&Math.sqrt(O*O+k*k)>f&&(r=!0,o.style.transition="none",a&&clearTimeout(a)),r&&(o.style.left=`${p+O}px`,o.style.top=`${c+k}px`,o.style.right="auto",o.style.bottom="auto",o.style.transform="none")}function A(b){if(document.removeEventListener("mousemove",w),document.removeEventListener("mouseup",A),r){r=!1;let O=window.innerWidth,k=window.innerHeight,z=o.getBoundingClientRect(),$=z.left+z.width/2,X;$<O/2?(X=24,o.classList.remove("side-right"),o.classList.add("side-left")):(X=O-z.width-24,o.classList.remove("side-left"),o.classList.add("side-right"));let v=Math.max(24,Math.min(z.top,k-z.height-24));setTimeout(()=>{o.style.setProperty("transition","left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)","important"),o.style.left=`${X}px`,o.style.top=`${v}px`,o.style.bottom="auto",o.style.transform=""},10),setTimeout(()=>{o.style.transition="",o.style.removeProperty("transition")},700)}else{let O=o.querySelector(".cw-btn.active"),k=b.target.closest("button");if(o.classList.contains("collapsed")){let z=o.getBoundingClientRect(),$=window.innerHeight,X=z.top>$/2;if(o.style.setProperty("transition","none","important"),X){let v=$-z.bottom;o.style.top="auto",o.style.bottom=`${v}px`}else o.style.bottom="auto",o.style.top=`${z.top}px`;o.offsetWidth,o.style.removeProperty("transition"),o.classList.remove("collapsed")}else!O&&!k&&o.classList.add("collapsed");k&&(k.style.transform="scale(0.9)",setTimeout(()=>k.style.transform="",150))}}}function Ct(){let t=document.querySelector(".cw-pill"),e=document.querySelector(".cw-focus-backdrop");if(!t)return()=>{};t.classList.remove("collapsed"),window._CW_ABORT_PROCESS=!1;let n=document.createElement("div");n.className="cw-center-stage",n.innerHTML=`
        <div class="cw-center-dots"><span></span><span></span><span></span></div>
        <div class="cw-center-text">${we.getRandomTip()}</div>
        <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
    `;let o=document.createElement("div");o.className="cw-abort-btn",o.textContent="Cancelar",o.onclick=s=>{s.stopPropagation(),window._CW_ABORT_PROCESS=!0,U("Cancelado!",{duration:3e3}),n.remove(),t.classList.remove("processing-center"),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},n.appendChild(o),t.appendChild(n);let i=Date.now();return t.classList.add("processing-center"),e&&e.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!t.contains(n))return;let a=Date.now()-i,r=Math.max(0,2e3-a);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!t.contains(n))return;let u=n.querySelector(".cw-center-dots"),d=n.querySelector(".cw-center-text"),p=n.querySelector(".cw-center-success"),c=n.querySelector(".cw-abort-btn");u&&(u.style.display="none"),d&&(d.style.display="none"),c&&(c.style.display="none"),p&&p.classList.add("show"),t.classList.add("success"),setTimeout(()=>{t.classList.remove("processing-center"),setTimeout(()=>{n.remove(),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},400)},1e3)},r)}}function yo(t){let e=document.createElement("div");e.className="cw-step-scenarios";let n=document.createElement("div");Object.assign(n.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let o=document.createElement("div");Object.assign(o.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"40px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s ease"}),o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>";let i=null;Object.entries(Ie).forEach(([a,r])=>{let u=document.createElement("div");u.textContent=a,Object.assign(u.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",display:"flex",alignItems:"center",gap:"6px"}),u.onmouseenter=()=>{i!==r&&(o.style.background="#fff",o.style.borderColor="#1a73e8",o.style.color="#202124",o.textContent=`"${r.substring(0,120)}${r.length>120?"...":""}"`),i!==r&&(u.style.background="#f1f3f4")},u.onmouseleave=()=>{i!==r&&(i||(o.style.background="#f8f9fa",o.style.borderColor="#dadce0",o.style.color="#5f6368",o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>"),u.style.background="#ffffff")},u.onclick=()=>{K.playClick(),i===r?(i=null,s(),t("")):(i=r,s(),u.style.transform="scale(0.95)",setTimeout(()=>u.style.transform="scale(1)",150),t(r))},n.appendChild(u)});function s(){Array.from(n.children).forEach(a=>{Ie[a.textContent]===i?(a.style.background="#e8f0fe",a.style.borderColor="#1a73e8",a.style.color="#1967d2",a.style.fontWeight="500"):(a.style.background="#ffffff",a.style.borderColor="#dadce0",a.style.color="#3c4043",a.style.fontWeight="400")})}return e.appendChild(n),e.appendChild(o),e}var vo=t=>new Promise(e=>setTimeout(e,t));function St(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>t.dispatchEvent(new MouseEvent(n,e)))}function dt(t){let e=document.createElement("div");e.style.position="fixed",e.style.left="-9999px",e.innerHTML=t,document.body.appendChild(e);let n=document.createRange();n.selectNodeContents(e);let o=window.getSelection();o.removeAllRanges(),o.addRange(n);try{document.execCommand("copy")}catch{U("Falha ao copiar",{error:!0})}o.removeAllRanges(),document.body.removeChild(e)}function Et(t){["input","change","keydown","keyup"].forEach(n=>{let o=new Event(n,{bubbles:!0,cancelable:!0});t.dispatchEvent(o)})}function wo(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function Tt(){console.log("Iniciando processo de Nova Nota...");let t=wo(),e=t.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(a=>a.innerText.trim()==="description");if(o){let a=o.closest("material-fab")||o.closest("material-button");a?(a.style&&(a.style.display="block",a.style.visibility="visible"),St(a)):St(o)}else{let a=document.querySelector("material-fab-speed-dial");if(a){let r=a.querySelector(".trigger");r?(r.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),St(r)):a.click(),await vo(800);let d=Array.from(document.querySelectorAll("i.material-icons-extended")).find(p=>p.innerText.trim()==="description");d&&St(d)}}let i=null,s=0;for(;!i&&s<20;){await vo(300);let a=wo();if(a.length>e)i=a.find(r=>!t.includes(r)),i||(i=a[a.length-1]);else if(s>10){let r=a.filter(u=>u.offsetParent!==null);r.length>0&&(i=r[r.length-1])}s++}return i}var te={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},Fe="cubic-bezier(0.25, 0.8, 0.25, 1)",Uo={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${te.border}`,backgroundColor:te.bgInput,fontSize:"14px",color:te.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${Fe}, box-shadow 0.2s ${Fe}, background-color 0.2s`,outline:"none"},qn={...Uo,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},Fn={fontSize:"13px",fontWeight:"700",color:te.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},Mn={display:"block",fontSize:"13px",fontWeight:"600",color:te.text,marginBottom:"8px",marginTop:"16px"},Ln={fontSize:"12px",color:te.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},Nn={fontSize:"12px",color:te.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},_n={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:te.text,cursor:"pointer",padding:"12px 14px",backgroundColor:te.surface,border:`1px solid ${te.border}`,borderRadius:"12px",transition:`all 0.2s ${Fe}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},$t={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:te.primary},Rn={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:te.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${Fe}, box-shadow 0.2s ${Fe}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},Dn={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${te.primary}`,color:te.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${Fe}`},zn={background:"transparent",border:`1px solid ${te.border}`,borderRadius:"20px",color:te.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${Fe}`,fontFamily:"'Google Sans', 'Roboto'"};var Gn={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:te.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},Bn={fontSize:"13px",fontWeight:"700",color:te.primary,minWidth:"20px",textAlign:"center"},Pn={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${te.border}`,backgroundColor:te.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${Fe}, box-shadow 0.2s ${Fe}`},jn={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${te.bgInput}`},Hn={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${te.border}`,backgroundColor:te.surface,color:te.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${Fe}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},$n={backgroundColor:te.primaryBg,color:te.primary,borderColor:te.primary,fontWeight:"600"},Vn={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:te.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},Un={borderTop:`1px solid ${te.bgInput}`,paddingTop:"20px",marginTop:"16px"};var Wn={maxHeight:"240px",overflowY:"auto",border:`1px solid ${te.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:te.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},Yn={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${te.bgInput}`,cursor:"pointer",fontSize:"13px",color:te.text,transition:"background 0.1s",userSelect:"none"};var Wo={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},Yo={fontSize:"12px",color:"#e37400",marginTop:"4px"},Xo={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},Ko={display:"flex",gap:"15px",marginBottom:"10px"};function Ao(){let t=document.createElement("div");t.id="tag-support-container",Object.assign(t.style,Wo);let e=document.createElement("label");e.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(e.style,zt,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,Ko);let o=document.createElement("input");o.type="radio",o.name="ts_usage_mod",o.value="Sim",Object.assign(o.style,$t);let i=document.createElement("label");i.textContent="Sim";let s=document.createElement("div");Object.assign(s.style,{display:"flex",alignItems:"center"}),s.appendChild(o),s.appendChild(i);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="N\xE3o",a.checked=!0,Object.assign(a.style,$t);let r=document.createElement("label");r.textContent="N\xE3o";let u=document.createElement("div");Object.assign(u.style,{display:"flex",alignItems:"center"}),u.appendChild(a),u.appendChild(r),n.appendChild(s),n.appendChild(u);let d=document.createElement("div");d.style.display="block";let p=document.createElement("label");p.textContent="Qual foi o Motivo?",Object.assign(p.style,zt,{fontSize:"12px"});let c=document.createElement("input");c.type="text",Object.assign(c.style,Xo);let f=document.createElement("div");f.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(f.style,Yo),d.appendChild(p),d.appendChild(c),d.appendChild(f),t.appendChild(e),t.appendChild(n),t.appendChild(d),o.onchange=()=>{d.style.display="none"},a.onchange=()=>{d.style.display="block"};function w(O,k){if(t.style.display="none",!O||O.includes("Education")||!k||k.length===0)return;let z=k.some(T=>T.includes("enhanced")||T==="ec_google_ads"),$=k.some(T=>(T.includes("conversion")||T.includes("ads"))&&!T.includes("enhanced")),X=k.some(T=>T.includes("ga4")||T.includes("analytics")||T.includes("ua")),v=k.some(T=>T.includes("merchant")||T.includes("gmc")||T.includes("shopping"));(z||$&&!X&&!v)&&(t.style.display="block")}function A(){if(t.style.display==="none")return"";let O=`<br><b>Utilizou Tag Support?</b> ${o.checked?"Sim":"N\xE3o"}`;return a.checked&&c.value.trim()!==""&&(O+=`<br><b>Motivo:</b> ${c.value}`),O+="<br>",O}function b(){t.style.display="none",a.checked=!0,o.checked=!1,d.style.display="block",c.value=""}return{element:t,updateVisibility:w,getOutput:A,reset:b}}var Q={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Ye={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function Co(t){let e={},n="implementation";function o(v){let C=v.toLowerCase();return C.includes("ads")||C.includes("conversion")||C.includes("remarketing")?Q.brands.ads:C.includes("ga4")||C.includes("analytics")?Q.brands.ga4:C.includes("gtm")||C.includes("tag manager")||C.includes("container")?Q.brands.gtm:C.includes("merchant")||C.includes("shopping")||C.includes("feed")?Q.brands.gmc:Q.brands.default}let i=Object.entries(ze).filter(([v,C])=>C.popular),s={};Object.entries(ze).forEach(([v,C])=>{if(C.popular)return;let T=o(C.name);s[T.label]||(s[T.label]={brand:T,tasks:[]}),s[T.label].tasks.push({key:v,...C})});let a="cw-zen-tasks";if(!document.getElementById(a)){let v=document.createElement("style");v.id=a,v.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column; height: 100%; width: calc(100% + 32px); margin: -16px;
                font-family: ${Q.font}; background: ${Q.bg}; position: relative; overflow: hidden;
            }
            
            /* SCROLL AREA */
            .cw-zen-content { flex: 1; overflow-y: auto; padding-bottom: 80px; } /* Espa\xE7o para o Status Bar */

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${Q.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${Q.white}; 
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
                font-size: 12px; font-weight: 500; color: ${Q.textMain}; line-height: 1.2; 
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
                color: ${Q.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${Q.border}; border-radius: 10px; background: ${Q.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${Q.blue}; box-shadow: 0 0 0 3px ${Q.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${Q.border}; border-radius: 10px; background: ${Q.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${Q.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${Q.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${Q.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${Q.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${Q.blueLight}; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${Q.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${Q.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${Q.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${Q.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${Q.border};
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${Q.shadowFloat}; z-index: 10;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${Q.textMain}; }
            
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
                font-family: ${Q.font}; font-size: 15px; font-weight: 600; color: ${Q.textMain};
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
                border-color: ${Q.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${Q.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${Q.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${Q.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 10px; font-weight: 700; color: ${Q.textSub};
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
        `,document.head.appendChild(v)}let r=document.createElement("div");r.className="cw-zen-container";let u=document.createElement("div");Object.assign(u.style,{display:"none"});let d=document.createElement("div");d.className="cw-screens-container",u.appendChild(d),r.innerHTML=`
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
    `;let p=r.querySelector(".cw-hero-grid"),c=r.querySelector(".cw-acc-container"),f=r.querySelector(".cw-results-container"),w=r.querySelector(".cw-search-input"),A=r.querySelector(".cw-status-bar"),b=r.querySelector(".cw-status-text"),O=r.querySelector(".cw-footer-icons");i.forEach(([v,C])=>{let T=o(C.name),N=document.createElement("div");N.className="cw-hero-card",N.id=`hero-${v}`,N.style.setProperty("--hero-color",T.color),N.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${Ye[T.icon]}</div>
                <div class="cw-hero-label">${C.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,N.onclick=_=>{if(_.target.closest(".cw-step-btn"))return;let I=e[v]?e[v].count:0;z(v,I>0?-I:1,C)},N.querySelector(".minus").onclick=()=>z(v,-1,C),N.querySelector(".plus").onclick=()=>z(v,1,C),N.dataset.color=T.color,p.appendChild(N)});function k(v,C){let T=o(C.name),N=document.createElement("div");return N.className="cw-task-item",N.dataset.id=v,N.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${T.bg}; color:${T.color}">
                    ${Ye[T.icon]||Ye.default}
                </div>
                <div class="cw-task-label">${C.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,N.onclick=_=>{if(_.target.closest(".cw-step-btn"))return;let I=e[v]?e[v].count:0;z(v,I>0?-I:1,C)},N.querySelector(".minus").onclick=()=>z(v,-1,C),N.querySelector(".plus").onclick=()=>z(v,1,C),N}Object.entries(s).forEach(([v,C])=>{let T=document.createElement("div");T.className="cw-acc-group";let N=document.createElement("div");N.className="cw-acc-header",N.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${C.brand.color}"></div>
                ${v}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,N.onclick=()=>{c.querySelectorAll(".cw-acc-group.open").forEach(I=>{I!==T&&I.classList.remove("open")}),T.classList.toggle("open")};let _=document.createElement("div");_.className="cw-acc-body",C.tasks.forEach(I=>{let B=k(I.key,I);_.appendChild(B)}),T.appendChild(N),T.appendChild(_),c.appendChild(T)});function z(v,C,T){e[v]||(e[v]={count:0,data:T,brand:o(T.name)}),e[v].count+=C,e[v].count<=0&&delete e[v],$(),X(),t&&t()}function $(){i.forEach(([_])=>{let I=p.querySelector(`#hero-${_}`);if(!I)return;let B=e[_];B?(I.classList.add("active"),I.querySelector(".cw-step-val").textContent=B.count,I.querySelector(".cw-step-val").style.color=I.dataset.color):I.classList.remove("active")}),r.querySelectorAll(".cw-task-item").forEach(_=>{let I=_.dataset.id,B=e[I];B?(_.classList.add("selected"),_.querySelector(".cw-step-val").textContent=B.count):_.classList.remove("selected")});let C=Object.keys(e),T=0,N=[];if(C.forEach(_=>{let I=e[_];T+=I.count;for(let B=0;B<I.count;B++)N.length<6&&N.push(I.brand)}),T>0){A.classList.add("visible");let _=T>1?"A\xE7\xF5es":"A\xE7\xE3o",I=T>1?"definidas":"definida";b.textContent=`${T} ${_} ${I}`,O.innerHTML="",N.forEach(B=>{let h=document.createElement("div");h.className="cw-mini-icon",h.innerHTML=Ye[B.icon]||Ye.default;let y=h.querySelector("svg");y&&(y.style.width="14px",y.style.height="14px"),O.appendChild(h)})}else A.classList.remove("visible")}w.addEventListener("input",v=>{let C=v.target.value.toLowerCase();if(C.length>0){c.style.display="none",f.style.display="block",f.innerHTML="";let T=!1;Object.entries(ze).forEach(([N,_])=>{if(_.name.toLowerCase().includes(C)){T=!0;let I=k(N,_);e[N]&&(I.classList.add("selected"),I.querySelector(".cw-step-val").textContent=e[N].count),f.appendChild(I)}}),T||(f.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else c.style.display="block",f.style.display="none"});function X(){d.innerHTML="";let v=Object.keys(e),C=!1,T=document.getElementById("sub-status"),N="implementation";if(T&&T.value.toLowerCase().includes("education")&&(N="education"),v.length===0){d.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}if(v.length===0){d.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}let _=document.createElement("div");_.className="cw-info-banner",_.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Todos os Screenshots s\xE3o baseados na descri\xE7\xE3o do 
                <a href="https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/" target="_blank" class="cw-info-link">Win Criteria</a>.
            </span>
        `,d.appendChild(_),v.forEach(I=>{let B=e[I].data,h=e[I].count,y=e[I].brand,M=B.screenshots?B.screenshots[N]||[]:["Link da Evid\xEAncia"];if(M.length>0){C=!0;for(let l=1;l<=h;l++){let m=document.createElement("div");m.className="cw-screen-card",m.style.setProperty("--brand-color",y.color),m.style.setProperty("--brand-bg",y.bg),m.style.setProperty("--brand-shadow",y.color+"40");let x=document.createElement("div");x.className="cw-card-header";let g=document.createElement("div");g.className="cw-card-icon",g.innerHTML=Ye[y.icon]||Ye.default;let E=document.createElement("div");E.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let F=document.createElement("input");F.className="cw-card-title-input",F.id=`name-${I}-${l}`,F.value=`${B.name}${h>1?" #"+l:""}`,F.title="Clique para renomear esta task";let P=document.createElement("span");P.className="cw-edit-hint",P.innerHTML="\u270E Renomear",E.appendChild(F),E.appendChild(P),x.appendChild(g),x.appendChild(E),m.appendChild(x),M.forEach((R,q)=>{let G=document.createElement("div");G.className="cw-input-group";let V=document.createElement("label");V.className="cw-input-label",V.textContent=R.replace(/📷|:|•/g,"").trim();let L=document.createElement("input");L.className="cw-input-field",L.id=`screen-${I}-${l}-${q}`,L.placeholder="Cole o link aqui...",L.setAttribute("autocomplete","off"),L.addEventListener("input",()=>{L.value.trim().length>5?L.classList.add("filled"):L.classList.remove("filled")});let H=document.createElement("div");H.className="cw-input-check",H.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',G.appendChild(V),G.appendChild(L),G.appendChild(H),m.appendChild(G)}),d.appendChild(m)}}}),u.style.display=C?"block":"none"}return{selectionElement:r,screenshotsElement:u,updateSubStatus:()=>X(),getCheckedElements:()=>Object.keys(e).map(v=>({value:v,closest:()=>({querySelector:()=>({textContent:e[v].count})})})),toggleTask:(v,C=!0)=>{let T=e[v];C&&!T?z(v,1,ze[v]):!C&&T&&z(v,-T.count,ze[v])},setMode:v=>{n=v,X()},reset:()=>{for(let v in e)delete e[v];w.value="",c.style.display="block",f.style.display="none",$(),X()}}}function So(t){let e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let n=document.createElement("div");n.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 80px 24px; min-height: 0;";let o={sectionTitle:`
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
        `};function i(y,M,l="text",m=""){let x=document.createElement("div");x.style.cssText=o.inputWrapper;let g=document.createElement("label");g.style.cssText=o.label,g.textContent=M;let E;l==="textarea"?(E=document.createElement("textarea"),E.style.cssText=o.input+o.textarea):(E=document.createElement("input"),E.type=l,E.style.cssText=o.input);let F=E.style.cssText;return E.onfocus=()=>E.style.cssText=F+o.inputFocus,E.onblur=()=>E.style.cssText=F,E.id=`st-${y}`,E.placeholder=m,x.appendChild(g),x.appendChild(E),{wrapper:x,input:E}}function s(y,M){let l=document.createElement("div"),m=document.createElement("label");m.style.cssText=o.label,m.textContent=M,l.appendChild(m);let x=document.createElement("div");return x.style.cssText=o.radioGroup,["Yes","No"].forEach(g=>{let E=document.createElement("label");E.style.cssText=o.radioLabel;let F=document.createElement("input");F.type="radio",F.name=`st-${y}`,F.value=g==="Yes"?"Y":"N",F.style.display="none",g==="No"&&(F.checked=!0),E.onmousedown=()=>E.style.transform="scale(0.96)",E.onmouseup=()=>E.style.transform="scale(1)",E.onmouseleave=()=>E.style.transform="scale(1)",E.appendChild(F),E.appendChild(document.createTextNode(g)),F.addEventListener("change",()=>{x.querySelectorAll("label").forEach(P=>P.style.cssText=o.radioLabel),F.checked&&(E.style.cssText=o.radioLabel+o.radioActive)}),g==="No"&&(E.style.cssText=o.radioLabel+o.radioActive),x.appendChild(E)}),l.appendChild(x),{wrapper:l}}let a=document.createElement("div");a.style.cssText=o.banner,a.innerHTML=`
        <span style="font-size: 18px;">\u26A0\uFE0F</span>
        <div>
            <div style="font-weight:700; margin-bottom:4px;">Processo Cr\xEDtico</div>
            Antes de transferir, verifique o <a href="https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o" target="_blank" style="color:#B06000; text-decoration:underline;">SOP de Out of Scope</a> e consulte um <a href="http://go/webao-help-deluxe" target="_blank" style="color:#B06000; text-decoration:underline;">SME</a>.
        </div>
    `,n.appendChild(a);let r=document.createElement("button");r.style.cssText=o.magicBtn,r.innerHTML='<span style="font-size:16px">\u2728</span> Preencher Automaticamente',r.onmouseover=()=>r.style.backgroundColor="#F8F9FA",r.onmouseout=()=>r.style.backgroundColor="#FFFFFF",r.onmousedown=()=>r.style.transform="scale(0.98)",r.onmouseup=()=>r.style.transform="scale(1)",n.appendChild(r);let u=document.createElement("div");u.style.cssText=o.sectionTitle,u.style.marginTop="24px",u.innerHTML="<span>\u{1F6E0}\uFE0F</span> Dados T\xE9cnicos",n.appendChild(u);let d=i("cid","Ads CID","text","000-000-0000"),p=i("ga4","GA4 ID"),c=i("gtm","GTM ID"),f=s("access","Advertiser has access to GA4/GTM?"),w=i("access-email","If Yes, User Email"),A=s("ghost","Ghosting Access Available?");n.append(d.wrapper,p.wrapper,c.wrapper,f.wrapper,w.wrapper,A.wrapper);let b=document.createElement("div");b.style.cssText=o.sectionTitle,b.innerHTML="<span>\u{1F4DE}</span> Contato & Problema",n.appendChild(b);let O=i("name","Name of Advertiser"),k=i("url","Website Address"),z=i("phone","Phone Number"),$=i("email","Email Address"),X=i("callback","Preferred Call Back Time (w/ Timezone)"),v=i("desc","Detailed Issue Description","textarea","Descreva o problema t\xE9cnico em detalhes..."),C=i("checks","Checks Performed by Tech Team","textarea","Liste o troubleshooting j\xE1 realizado..."),T=i("screens","Uncropped Screenshots (Links)","textarea","https://...");n.append(O.wrapper,k.wrapper,z.wrapper,$.wrapper,X.wrapper,v.wrapper,C.wrapper,T.wrapper);let N=document.createElement("div");N.style.cssText=o.sectionTitle,N.innerHTML="<span>\u{1F4E7}</span> Contatos para C\xF3pia (CC)",n.appendChild(N);let _=i("c-adv","Advertiser Contact"),I=i("c-am","Account Manager");n.append(_.wrapper,I.wrapper);let B=document.createElement("div");B.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.9); backdrop-filter: blur(8px); border-top: 1px solid #E0E0E0; display: flex; justify-content: flex-end; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 100;";let h=document.createElement("button");return h.textContent="Gerar Nota S&T",h.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 24px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 6px rgba(26, 115, 232, 0.3); transition: transform 0.1s, box-shadow 0.2s;",h.onmousedown=()=>{h.style.transform="scale(0.96)",h.style.boxShadow="0 1px 3px rgba(26, 115, 232, 0.2)"},h.onmouseup=()=>{h.style.transform="scale(1)",h.style.boxShadow="0 2px 6px rgba(26, 115, 232, 0.3)"},B.appendChild(h),e.appendChild(n),e.appendChild(B),r.onclick=async()=>{r.innerHTML='<span style="font-size:16px">\u23F3</span> Buscando...';let y=await it();y.advertiserName&&(O.input.value=y.advertiserName),y.websiteUrl&&(k.input.value=y.websiteUrl),y.clientEmail&&($.input.value=y.clientEmail,_.input.value=y.clientEmail);let l=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);l&&(d.input.value=l[0]),r.innerHTML='<span style="font-size:16px; color:#188038">\u2705</span> Dados Preenchidos!',r.style.background="#E6F4EA",r.style.borderColor="#188038",setTimeout(()=>{r.innerHTML='<span style="font-size:16px">\u2728</span> Preencher Automaticamente',r.style.background="#FFFFFF",r.style.borderColor="#DADCE0"},2e3),U("Dados capturados com sucesso!")},h.onclick=async()=>{let y=g=>{let E=e.querySelector(`#st-${g}`);return E?E.value:""},M=g=>{let E=e.querySelector(`input[name="st-${g}"]:checked`);return E?E.value:"N"},m=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${y("cid")}
<b>GA4 ID:</b> ${y("ga4")}
<b>GTM ID:</b> ${y("gtm")}
<b>Advertiser has access to either GA4 or GTM (Y/N):</b> ${M("access")}
<b>If Yes, user access email to GA4/GTM:</b> ${y("access-email")}
<b>Ghosting Access Available (Y/N):</b> ${M("ghost")}
<b>Name of the advertiser:</b> ${y("name")}
<b>Website Address:</b> ${y("url")}
<b>Advertiser\u2019s preferred mode of communication:</b> Phone
<b>Advertiser/Web Master\u2019s Phone Number:</b> ${y("phone")}
<b>Preferred Call Back time with time zone and contact number:</b> ${y("callback")}
<b>Advertiser/Web Master\u2019s Email Address:</b> ${y("email")}

<b>Detailed Issue Description:</b>
${y("desc")}

<b>Name of the conversion action or event in the question:</b> N/A
<b>Date range:</b> N/A
<b>Uncropped screenshots of the issue:</b>
${y("screens")}

<b>Test conversion details (if any):</b> N/A

<b>Checks performed by Technical Solutions Team (Detailed Info + Screenshot doc):</b>
${y("checks")}

[IMP] Contacts to be copied on all communication about this case
<b>Advertiser contact -</b> ${y("c-adv")}
<b>Account Manager -</b> ${y("c-am")}
<b>Additional Contact -</b> N/A

<b>Additional Comments:</b> (Optional)`.replace(/\n/g,"<br>");dt(m);let x=await Tt();x?(x.innerText.trim()===""&&(x.innerHTML=""),document.execCommand("insertHTML",!1,m),Et(x),U("Nota S&T inserida!")):U("Copiado! Abra uma nota para colar.")},e}function Eo(){let t="v3.7.0 (S&T Mode)",e="bau",n="pt",o=!1,i=!1,s=!1,a={input:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},textarea:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease",height:"100px",resize:"vertical"},h3:{fontSize:"14px",fontWeight:"600",color:"#202124",margin:"0 0 12px 0"},label:{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},checkboxLabel:{display:"flex",alignItems:"center",marginBottom:"10px",fontSize:"14px",fontWeight:"400",cursor:"pointer",padding:"8px",background:"#f8f9fa",borderRadius:"6px",transition:"background-color 0.2s ease, box-shadow 0.2s ease",userSelect:"none"},checkboxInput:{width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"},buttonBase:{flex:"1 1 0",padding:"10px 0",color:"#fff",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"500",cursor:"pointer",marginTop:"16px"},stepBlock:{borderTop:"1px solid #eee",paddingTop:"12px",marginTop:"12px"},radioContainer:{display:"flex",gap:"15px",marginBottom:"10px"},optionalBtn:{width:"100%",padding:"10px",background:"white",border:"1px dashed #1a73e8",color:"#1a73e8",borderRadius:"6px",cursor:"pointer",fontWeight:"500",fontSize:"13px",marginBottom:"10px",transition:"all 0.2s"},helpLink:{fontSize:"12px",color:"#1a73e8",textDecoration:"none",cursor:"pointer",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"color 0.2s"}},r=Ao(),u=Co(()=>{let W=u.getCheckedElements().map(D=>D.value);g&&g.value&&r.updateVisibility(g.value,W)}),d=document.createElement("div");d.id="autofill-popup",d.classList.add("cw-module-window"),Object.assign(d.style,Ce,{right:"100px",width:"450px",transition:"width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)"});let p={popup:d,googleLine:null},c=Se(d,"Case Notes",t,"Gera notas padronizadas.",p,()=>Nt());d.appendChild(c);let f=c.lastElementChild;if(f){let S=document.createElement("div");S.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',Object.assign(S.style,{width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease",marginLeft:"4px"}),S.title="Alternar para Split & Transfer",S.onmouseenter=()=>{S.style.background="rgba(255,255,255,0.1)",S.style.color="#FFF"},S.onmouseleave=()=>{s||(S.style.background="transparent",S.style.color="#9AA0A6")},S.onclick=W=>{W.stopPropagation(),O(S)},f.insertBefore(S,f.firstChild)}let w=document.createElement("div");Object.assign(w.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1"}),d.appendChild(w);let A=document.createElement("div");Object.assign(A.style,{flexGrow:"1",display:"none",overflow:"hidden"});let b=So(()=>O());A.appendChild(b),d.appendChild(A);function O(S){s=!s,s?(w.style.display="none",A.style.display="flex",p.googleLine&&(p.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)"),S&&(S.style.color="#C58AF9",S.style.background="rgba(197, 138, 249, 0.15)")):(w.style.display="block",A.style.display="none",p.googleLine&&(p.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"),S&&(S.style.color="#9AA0A6",S.style.background="transparent"))}let k=document.createElement("div");k.textContent="created by lucaste@",Object.assign(k.style,ro),d.appendChild(k);let z=document.createElement("div");z.id="step-lang-type";let $=document.createElement("label");Object.assign($.style,a.label),z.appendChild($);let X=document.createElement("div");Object.assign(X.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let v=document.createElement("div");v.textContent="Portugu\xEAs",v.classList.add("no-drag"),Object.assign(v.style,ye);let C=document.createElement("div");C.textContent="Espa\xF1ol",C.classList.add("no-drag"),Object.assign(C.style,ye),v.onclick=()=>qt("pt"),C.onclick=()=>qt("es"),X.appendChild(v),X.appendChild(C),z.appendChild(X),w.appendChild(z);let T=document.createElement("div");T.id="step-0-case-type";let N=document.createElement("label");Object.assign(N.style,a.label),T.appendChild(N);let _=document.createElement("div");Object.assign(_.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let I=document.createElement("div");I.textContent="BAU",I.classList.add("no-drag"),Object.assign(I.style,ye);let B=document.createElement("div");B.textContent="LM",B.classList.add("no-drag"),Object.assign(B.style,ye),I.onclick=()=>It("bau"),B.onclick=()=>It("lm"),_.appendChild(I),_.appendChild(B),T.appendChild(_),w.appendChild(T);let h=document.createElement("div");h.id="step-1-selection";let y=document.createElement("label");y.className="cw-input-label",y.textContent="Status Principal";let M=document.createElement("select");M.id="main-status",M.className="cw-select",M.innerHTML=`
      <option value="" disabled selected hidden>Selecione uma op\xE7\xE3o...</option>
      <option value="NI">NI - Need Info</option>
      <option value="SO">SO - Solution Offered</option>
      <option value="IN">IN - Inactive</option>
      <option value="AS">AS - Assigned</option>
      <option value="DC">DC - Discard</option>
  `;let l=document.createElement("div");l.style.cssText="display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; margin-bottom: 6px;";let m=document.createElement("label");m.className="cw-input-label",m.textContent="Sub-status",m.style.marginBottom="0";let x=document.createElement("a");x.href="https://seu-link-do-guia-aqui.com",x.target="_blank",x.className="cw-info-link",x.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; transform:translateY(1px)"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Guia de Substatus',Object.assign(x.style,a.helpLink),l.appendChild(m),l.appendChild(x);let g=document.createElement("select");g.id="sub-status",g.className="cw-select",g.disabled=!0,g.innerHTML='<option value="" disabled selected hidden>Aguardando status principal...</option>',h.appendChild(y),h.appendChild(M),h.appendChild(l),h.appendChild(g),w.appendChild(h);let E=document.createElement("div");E.id="step-1-1-portugal",Object.assign(E.style,a.stepBlock,{display:"none"});let F=document.createElement("label");Object.assign(F.style,a.label),E.appendChild(F);let P=document.createElement("div");Object.assign(P.style,a.radioContainer);let R=document.createElement("div");Object.assign(R.style,{display:"flex",alignItems:"center"});let q=document.createElement("input");q.type="radio",q.name="portugal-group",q.value="sim",Object.assign(q.style,a.checkboxInput);let G=document.createElement("label");G.htmlFor="portugal-sim",Object.assign(G.style,{cursor:"pointer"}),R.appendChild(q),R.appendChild(G);let V=document.createElement("div");Object.assign(V.style,{display:"flex",alignItems:"center"});let L=document.createElement("input");L.type="radio",L.name="portugal-group",L.value="nao",L.checked=!0,Object.assign(L.style,a.checkboxInput);let H=document.createElement("label");H.htmlFor="portugal-nao",Object.assign(H.style,{cursor:"pointer"}),V.appendChild(L),V.appendChild(H),P.appendChild(R),P.appendChild(V),E.appendChild(P),w.appendChild(E);function pe(S){o=S,S?ae.style.display="block":ae.style.display="none"}q.onchange=()=>pe(!0),L.onchange=()=>pe(!1);let ae=document.createElement("div");ae.id="step-1-2-consent",Object.assign(ae.style,a.stepBlock,{display:"none"});let ie=document.createElement("label");Object.assign(ie.style,a.label),ae.appendChild(ie);let de=document.createElement("div");Object.assign(de.style,a.radioContainer);let fe=document.createElement("div");Object.assign(fe.style,{display:"flex",alignItems:"center"});let ke=document.createElement("input");ke.type="radio",ke.name="consent-group",ke.value="Sim",ke.checked=!0,Object.assign(ke.style,a.checkboxInput);let Me=document.createElement("label");Me.htmlFor="consent-sim",Object.assign(Me.style,{cursor:"pointer"}),fe.appendChild(ke),fe.appendChild(Me);let tt=document.createElement("div");Object.assign(tt.style,{display:"flex",alignItems:"center"});let Re=document.createElement("input");Re.type="radio",Re.name="consent-group",Re.value="N\xE3o",Object.assign(Re.style,a.checkboxInput);let ut=document.createElement("label");ut.htmlFor="consent-nao",Object.assign(ut.style,{cursor:"pointer"}),tt.appendChild(Re),tt.appendChild(ut),de.appendChild(fe),de.appendChild(tt),ae.appendChild(de),w.appendChild(ae);let Be=document.createElement("div");Be.id="step-1-5-snippets",Object.assign(Be.style,a.stepBlock,{display:"none"});let mt=document.createElement("h3");Object.assign(mt.style,a.h3),mt.textContent="Cen\xE1rios Comuns";let Oe=yo(S=>{let W=document.querySelector("textarea");W&&(W.value=S,W.dispatchEvent(new Event("input")),W.style.transition="background-color 0.2s",W.style.backgroundColor="#e8f0fe",setTimeout(()=>W.style.backgroundColor="#fff",300))});Oe.id="snippet-container",Be.appendChild(mt),Be.appendChild(Oe),w.appendChild(Be);let Ae=document.createElement("div");Ae.id="step-3-form",Object.assign(Ae.style,a.stepBlock,{display:"none"});let Ot=document.createElement("h3");Object.assign(Ot.style,a.h3),Ae.appendChild(Ot);let De=document.createElement("div");De.id="dynamic-form-fields-container",Ae.appendChild(De);let he=document.createElement("button");he.textContent="+ Gostaria de selecionar uma task?",Object.assign(he.style,a.optionalBtn),he.onmouseover=()=>he.style.background="#e8f0fe",he.onmouseout=()=>he.style.background="white",he.onclick=()=>{he.style.display="none",Pe.style.display="block",u.selectionElement.style.display="block"};let Pe=document.createElement("h3");Object.assign(Pe.style,a.h3,{marginTop:"20px"});let Yt=u.selectionElement;Object.assign(Yt.style,{marginBottom:"20px"}),Ae.appendChild(he),Ae.appendChild(Pe),Ae.appendChild(Yt),Ae.appendChild(r.element),Ae.appendChild(u.screenshotsElement),w.appendChild(Ae);let je=document.createElement("div");je.id="step-4-email",Object.assign(je.style,{display:"none",marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #eee"});let He=document.createElement("label");He.style.display="flex",He.style.alignItems="center",He.style.cursor="pointer",He.style.fontSize="14px";let $e=document.createElement("input");$e.type="checkbox",$e.checked=!0,Object.assign($e.style,a.checkboxInput),He.appendChild($e),He.appendChild(document.createTextNode("Preencher email automaticamente?")),je.appendChild(He),w.appendChild(je);let Qe=document.createElement("div");Object.assign(Qe.style,{display:"none",gap:"8px",padding:"0"}),w.appendChild(Qe);let ot=document.createElement("button");Object.assign(ot.style,a.buttonBase,{backgroundColor:"#5f6368"}),ot.textContent="Copiar";let nt=document.createElement("button");Object.assign(nt.style,a.buttonBase,{backgroundColor:"#1a73e8"}),nt.textContent="Preencher",Qe.appendChild(ot),Qe.appendChild(nt);let at=document.createElement("div");Object.assign(at.style,Ze),at.className="no-drag",at.title="Redimensionar",d.appendChild(at),Je(d,at),document.body.appendChild(d);function It(S){e=S;let W=st();Object.assign(I.style,ye),Object.assign(B.style,ye),S==="bau"?(Object.assign(I.style,W),x.href="https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657"):(Object.assign(B.style,W),x.href="https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243"),g.value&&g.dispatchEvent(new Event("change"))}function ee(S){try{if(_e&&_e[n]&&_e[n][S])return _e[n][S];if(_e&&_e.pt&&_e.pt[S])return _e.pt[S]}catch{}return S}function Ro(){$.textContent=ee("idioma"),N.textContent=ee("fluxo"),y.textContent=ee("status_principal"),m.textContent=ee("substatus"),mt.textContent=ee("cenarios_comuns"),Pe.textContent=ee("selecione_tasks"),Ot.textContent=ee("preencha_detalhes"),ot.textContent=ee("copiar"),nt.textContent=ee("preencher"),M.querySelector('option[value=""]')&&(M.querySelector('option[value=""]').textContent=ee("select_status")),g.querySelector('option[value=""]')&&(g.querySelector('option[value=""]').textContent=ee("select_substatus")),F.textContent=ee("caso_portugal"),G.textContent=ee("sim"),H.textContent=ee("nao"),ie.textContent=ee("consentiu_gravacao"),Me.textContent=ee("sim"),ut.textContent=ee("nao"),De.querySelectorAll("label").forEach(S=>{let W=S.nextElementSibling.id.replace("field-",""),D=ee(W.toLowerCase());D!==W.toLowerCase()?S.textContent=D:S.textContent=W.replace(/_/g," ").replace(/\b\w/g,Z=>Z.toUpperCase())+":"}),he.textContent="+ "+(n==="pt"?"Gostaria de selecionar uma task?":"Quisiera seleccionar una tarea?")}function qt(S){n=S;let W=st();Object.assign(v.style,ye),Object.assign(C.style,ye),S==="pt"?(Object.assign(v.style,W),E.style.display="block",pe(o)):(Object.assign(C.style,W),E.style.display="none",ae.style.display="none"),Ro(),g.value&&g.dispatchEvent(new Event("change"))}function Ft(S){(S.value.trim()===""||S.value.trim()==="\u2022")&&(S.value="\u2022 "),S.onkeydown=function(W){if(W.key==="Enter"){W.preventDefault();let D=this.selectionStart,Z=this.selectionEnd,re=this.value,me=re.lastIndexOf(`
`,D-1)+1,Te=re.substring(me,D),ge=Te.trim()==="\u2022"||Te.trim()===""?`
`:`
\u2022 `;this.value=re.substring(0,D)+ge+re.substring(Z),this.selectionStart=this.selectionEnd=D+ge.length}else if(W.key==="Backspace"){let D=this.selectionStart;if(D===this.selectionEnd&&D>0){let Z=this.value.substring(0,D);Z.endsWith(`
\u2022 `)?(W.preventDefault(),this.value=Z.substring(0,D-3)+this.value.substring(this.selectionEnd),this.selectionStart=this.selectionEnd=D-3):Z==="\u2022 "&&(W.preventDefault(),this.value="",this.selectionStart=this.selectionEnd=0)}}}}function Mt(){let S=typeof Oe<"u"?Oe:document.getElementById("snippet-container");if(!S)return;let W=S.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'),D={},Z=new Set;W.forEach(se=>{let ne=se.id,Y=Ie[ne];if(Y)for(let j in Y)j==="linkedTask"?Z.add(Y.linkedTask):j!=="type"&&(D[j]||(D[j]=[]),D[j].includes(Y[j])||D[j].push(Y[j]))});let re=new Set;Object.values(Ie).forEach(se=>{Object.keys(se).forEach(ne=>{ne!=="linkedTask"&&ne!=="type"&&re.add(ne)})}),re.forEach(se=>{let ne=document.getElementById(se);if(ne){let Y=D[se]||[],j="";ct.includes(se.replace("field-",""))?(j=Y.map(oe=>oe.startsWith("\u2022 ")?oe:"\u2022 "+oe).join(`
`),j===""?j="\u2022 ":j.endsWith(`
\u2022 `)||(j+=`
\u2022 `)):j=Y.join(`

`),j.trim()!=="\u2022"&&j.trim()!==""?ne.value=j:ct.includes(se.replace("field-",""))?ne.value="\u2022 ":ne.value="",ne.tagName==="TEXTAREA"&&typeof Ft=="function"&&Ft(ne)}});let me=new Set,Te=new Set;S.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(se=>{let ne=Ie[se.id];ne&&ne.linkedTask&&(se.checked?me.add(ne.linkedTask):Te.add(ne.linkedTask))}),Te.forEach(se=>{me.has(se)||u.toggleTask(se,!1)}),me.forEach(se=>{u.toggleTask(se,!0)})}M.onchange=()=>{let S=M.value;if(Lt(1.5),g.innerHTML=`<option value="">${ee("select_substatus")}</option>`,!S){g.disabled=!0;return}for(let W in lt){let D=lt[W];if(D.status===S){let Z=document.createElement("option");Z.value=W,Z.textContent=D.name,g.appendChild(Z)}}g.disabled=!1},g.onchange=()=>{let S=g.value;if(Lt(1.5),!S)return;u.updateSubStatus(S);let W=lt[S];Oe.innerHTML="";let D=(Y,j,oe)=>{let ue=document.createElement("label");Object.assign(ue.style,a.checkboxLabel),ue.onmouseover=()=>ue.style.backgroundColor="#e8eaed",ue.onmouseout=()=>ue.style.backgroundColor="#f8f9fa";let le=document.createElement("input");return le.type=j,le.id=Y.id,Object.assign(le.style,a.checkboxInput),ue.appendChild(le),ue.appendChild(document.createTextNode(` ${Y.text}`)),oe.appendChild(ue),le},Z=[],re="radio";if(S==="NI_Awaiting_Inputs")Z=[{id:"quickfill-ni-inicio-manual",text:"In\xEDcio 2/6 (Manual)"},{id:"quickfill-ni-cms-access",text:"In\xEDcio 2/6 (ADV sem acesso ao CMS)"},{id:"quickfill-ni-followup-bau",text:"Follow-up 2/6 (BAU)"},{id:"quickfill-ni-followup-lm",text:"Follow-up 2/6 (LM)"}];else if(S.startsWith("SO_"))re="checkbox",Z=[{id:"quickfill-gtm-install",text:"Instala\xE7\xE3o do GTM"},{id:"quickfill-whatsapp",text:"Convers\xE3o de WhatsApp"},{id:"quickfill-form",text:"Convers\xE3o de Formul\xE1rio (Padr\xE3o)"},{id:"quickfill-ecw4-close",text:"Fechamento ECW4 (P\xF3s 7 dias)"},{id:"quickfill-ga4-event-close",text:"Fechamento GA4 (P\xF3s 2 dias)"}];else if(S.startsWith("AS_")){re="checkbox";let Y=document.createElement("label");Y.textContent=ee("cenarios_comuns"),Object.assign(Y.style,a.label),Oe.appendChild(Y),Z=[{id:"quickfill-as-no-show",text:"Anunciante n\xE3o compareceu (respondeu e-mail)"},{id:"quickfill-as-insufficient-time",text:"Tempo insuficiente"},{id:"quickfill-as-no-access",text:"Anunciante sem acessos necess\xE1rios"}]}else S.startsWith("IN_")?Z=[{id:"quickfill-in-nrp-bau",text:"NRP (BAU - 3 tentativas)"},{id:"quickfill-in-nrp-lm",text:"NRP (LM - Sem tentativas)"},{id:"quickfill-in-no-show-bau",text:"No-Show (BAU - 3 tentativas)"},{id:"quickfill-in-2-6-final",text:"Finaliza\xE7\xE3o 2/6 (Sem Resposta)"},{id:"quickfill-in-manual",text:"Outro (Manual)"}]:S.startsWith("DC_")?(re="radio",Z=[{id:"quickfill-dc-lm-no-access",text:"LM - Sem acessos (Reagendar em BAU)"}]):S==="NI_Attempted_Contact"?(re="radio",Z=[{id:"quickfill-ni-attempted-2day",text:"2 Day Rule (2 Liga\xE7\xF5es + Chat AM)"}]):S==="NI_Awaiting_Validation"&&(re="checkbox",Z=[{id:"quickfill-ni-awaiting-ecw4",text:"ECW4 (Acompanhar)"},{id:"quickfill-ni-awaiting-ga4",text:"GA4 Event Tracking (Acompanhar)"}]);let me=Z.filter(Y=>{let j=Ie[Y.id];return!j.type||j.type==="all"||j.type===e});me.forEach((Y,j)=>{let oe=D(Y,re,Oe);re==="radio"&&(oe.name="scenario-radio-group",j===0&&(oe.checked=!0))}),me.length>0&&(Be.style.display="block"),W.requiresTasks?(he.style.display="none",Pe.style.display="block",u.selectionElement.style.display="block"):(he.style.display="block",Pe.style.display="none",u.selectionElement.style.display="none"),De.innerHTML="";let Te=W.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(Te)].forEach(Y=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(Y))return;let j=Y.slice(1,-1),oe=document.createElement("label"),ue=ee(j.toLowerCase());if(oe.textContent=ue!==j.toLowerCase()?ue:j.replace(/_/g," ").replace(/\b\w/g,J=>J.toUpperCase())+":",Object.assign(oe.style,a.label),j==="SPEAKEASY_ID"){let J=document.createElement("button");J.innerHTML='<span style="font-size:12px; margin-right:4px;">\u2728</span>Auto Busca',J.style.cssText=`
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
          `,J.title="Localizar Speakeasy ID no hist\xF3rico",J.onmouseover=()=>{J.style.backgroundColor="#c2e7ff",J.style.boxShadow="0 1px 2px rgba(0,0,0,0.1)"},J.onmouseout=()=>{J.style.backgroundColor="#d3e3fd",J.style.boxShadow="none"},J.onmousedown=()=>{J.style.backgroundColor="#a8c7fa",J.style.transform="scale(0.96)"},J.onmouseup=()=>J.style.transform="scale(1)",J.onclick=xe=>{xe.preventDefault(),uo(`field-${j}`)},oe.appendChild(J)}let le;ct.includes(j)?(le=document.createElement("textarea"),Object.assign(le.style,a.textarea),le.classList.add("bullet-textarea"),Ft(le)):Bt.includes(j)?(le=document.createElement("textarea"),Object.assign(le.style,a.textarea)):(le=document.createElement("input"),le.type="text",Object.assign(le.style,a.input),j==="REASON_COMMENTS"&&(S.startsWith("NI_")||S.startsWith("IN_"))&&(Object.assign(oe.style,{display:"none"}),Object.assign(le.style,{display:"none"}))),j==="ON_CALL"&&e==="lm"&&(Object.assign(oe.style,{display:"none"}),Object.assign(le.style,{display:"none"}),le.value="N/A"),le.id=`field-${j}`,De.appendChild(oe),De.appendChild(le)});let se=Oe.querySelectorAll('input[type="checkbox"], input[type="radio"]');se.length>0&&(se.forEach(Y=>{Y.removeEventListener("change",Mt),Y.addEventListener("change",Mt)}),Mt()),Ae.style.display="block",We[S]?je.style.display="block":je.style.display="none",Qe.style.display="flex";let ne=u.getCheckedElements().map(Y=>Y.value);r.updateVisibility(S,ne)},he.onclick=()=>{he.style.display="none",Pe.style.display="block",u.selectionElement.style.display="block"};function Xt(){let S=g.value;if(!S)return null;let D=lt[S].template.replace(/\n/g,"<br>"),Z='style="margin-bottom: 12px; padding-left: 30px;"',re=[],me="",Te=u.getCheckedElements();Te.length>0&&Te.forEach(ne=>{let Y=ne.value,j=ze[Y],oe=ne.closest().querySelector(".stepper-count"),ue=oe?parseInt(oe.textContent):1;ue>1?re.push(`${j.name} (x${ue})`):re.push(j.name)});let ge=u.screenshotsElement;if(ge){let ne=Array.from(ge.querySelectorAll('input[id^="name-"]'));ne.length>0&&ne.forEach(Y=>{let j=Y.value,oe=Y.closest(".cw-screen-card");if(oe){let ue=oe.querySelectorAll('input[id^="screen-"]'),le=!1,J="";ue.forEach(xe=>{let Kt=xe.closest(".cw-input-group"),Qt=Kt?Kt.querySelector(".cw-input-label"):null,Do=Qt?Qt.textContent:"Evid\xEAncia",Zt=xe.value.trim(),zo=Zt?` ${Zt}`:"";J+=`<li>${Do} -${zo}</li>`,le=!0}),le&&(me+=`<b>${j}</b>`,me+=`<ul ${Z}>${J}</ul>`)}})}if(D.includes("{TAGS_IMPLEMENTED}")?D=D.replace(/{TAGS_IMPLEMENTED}/g,re.join(", ")||"N/A"):re.length>0&&(D+=`<br><b>Tags:</b> ${re.join(", ")}<br>`),D.includes("{SCREENSHOTS_LIST}")?D=D.replace(/{SCREENSHOTS_LIST}/g,me?`${me}`:"N/A"):me!==""&&(D+=`<br>${me}`),n==="pt"&&o){let ne=ke.checked?ee("sim"):ee("nao");D=D.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${ee("consentiu_gravacao")}</b> ${ne}<br><br>`),D=D.replace(/{CASO_PORTUGAL}/g,`<br><b>${ee("caso_portugal")}</b> ${ee("sim")}<br>`)}else n==="pt"&&!o?(D=D.replace(/{CASO_PORTUGAL}/g,`<br><b>${ee("caso_portugal")}</b> ${ee("nao")}<br>`),D=D.replace(/{CONSENTIU_GRAVACAO}/g,"")):(D=D.replace(/{CASO_PORTUGAL}/g,""),D=D.replace(/{CONSENTIU_GRAVACAO}/g,""));return De.querySelectorAll("input, textarea").forEach(ne=>{let Y=ne.id.replace("field-",""),j=new RegExp(`{${Y}}`,"g"),oe=ne.value;if(Y==="REASON_COMMENTS"&&(S.startsWith("NI_")||S.startsWith("IN_"))){let J=Oe.querySelector('input[type="radio"]:checked');J&&Ie[J.id]&&(oe=Ie[J.id]["field-REASON_COMMENTS"])}if(ct.includes(Y)&&oe.trim()!==""){let J=oe.split(`
`).map(xe=>xe.trim()).filter(xe=>xe!==""&&xe!=="\u2022").map(xe=>xe.startsWith("\u2022 ")?xe.substring(2):xe).map(xe=>`<li>${xe}</li>`).join("");oe=J?`<ul ${Z}>${J}</ul>`:""}else Bt.includes(Y)?oe=oe.split(`
`).filter(J=>J.trim()!=="").map(J=>`<p style="margin: 0 0 8px 0;">${J}</p>`).join(""):ne.tagName==="TEXTAREA"&&(oe=oe.replace(/\n/g,"<br>"));let ue=oe.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(ue===""||ue==="\u2022"||ue.toLowerCase()==="n/a"){let J=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${Y}\\}(?:<br>\\s*)?`,"gi");J.test(D)?D=D.replace(J,""):D=D.replace(j,"")}else D=D.replace(j,oe.replace(/\$/g,"$$$$"))}),D=D.replace(/{([A-Z0-9_]+)}/g,""),D=D.replace(/(<br>){3,}/g,"<br><br>"),typeof r<"u"&&r.getOutput&&(D+=r.getOutput()),D}ot.onclick=()=>{let S=Xt();S?(dt(S),U(ee("copiado_sucesso"))):U(ee("selecione_substatus"),{error:!0})},nt.onclick=async()=>{let S=g.value,W=Xt();if(!W){U(ee("selecione_substatus"),{error:!0});return}dt(W),Nt();let D=Ct(),Z=await Tt();if(Z)try{if(Z.focus(),Z.innerHTML.trim()==="<p><br></p>"||Z.innerHTML.trim()==="<br>"||Z.innerText.trim()===""){let ge=document.createRange();ge.selectNodeContents(Z);let se=window.getSelection();se.removeAllRanges(),se.addRange(ge),document.execCommand("delete",!1,null)}else if(!Z.innerHTML.endsWith("<br><br>")){let ge=document.createRange();ge.selectNodeContents(Z),ge.collapse(!1);let se=window.getSelection();se.removeAllRanges(),se.addRange(ge),document.execCommand("insertHTML",!1,"<br><br>")}document.execCommand("insertHTML",!1,W),Et(Z),setTimeout(()=>{U(ee("inserido_copiado"))},600);let me=typeof $e<"u"&&$e?$e.checked:!0;if(S&&We[S]&&me){let ge=We[S];await vt(ge),await new Promise(se=>setTimeout(se,500))}D(),Lt(1.5),M.value="",g.innerHTML=`<option value="">${ee("select_substatus")}</option>`,g.disabled=!0}catch(re){console.error(re),U("Erro ao inserir.",{error:!0}),D()}};function Lt(S=1.5){S<=1.5&&(Be.style.display="none",Oe.innerHTML=""),S<=2&&(u.reset(),he.style.display="none"),S<=3&&(Ae.style.display="none",De.innerHTML="",r.reset(),Qe.style.display="none",je.style.display="none")}function Nt(){if(i=!i,i){let S=d.querySelector(".cw-expand-btn");S&&typeof S.resetState=="function"&&S.resetState()}Ee(i,d,"cw-btn-notes")}return It("bau"),qt("pt"),Nt}var Xe={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function To(){let t="v4.2.0 CR-Hybrid",e="CANNED_RESPONSES",n=Object.keys(Xe)[0],o="",i="list",s=!1,a={bgApp:"#F8F9FA",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.08)",borderFocus:"rgba(26, 115, 232, 0.4)",textPrimary:"#202124",textSecondary:"#5F6368",primary:"#1A73E8",primaryBg:"#E8F0FE",shadowCard:"0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",shadowHover:"0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",transition:"all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1)"},r={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:a.bgApp},u={display:"flex",width:"200%",height:"100%",transition:"transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",transform:"translateX(0)",willChange:"transform"},d={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},p={padding:"20px 24px 12px 24px",flexShrink:"0",background:a.bgApp,zIndex:"10",display:"flex",flexDirection:"column",gap:"16px",borderBottom:`1px solid ${a.borderSubtle}`},c={width:"100%",height:"44px",padding:"0 16px 0 48px",borderRadius:"12px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",fontWeight:"400",color:a.textPrimary,boxSizing:"border-box",outline:"none",transition:a.transition,boxShadow:"0 2px 5px rgba(0,0,0,0.03)",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%239AA0A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"16px center"},f={display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px",paddingBottom:"4px"},w={padding:"6px 14px",borderRadius:"100px",border:"1px solid #DADCE0",background:"#FFFFFF",color:a.textSecondary,fontSize:"13px",fontWeight:"500",letterSpacing:"0.3px",cursor:"pointer",transition:a.transition,flexShrink:"0",display:"flex",alignItems:"center",justifyContent:"center"},A={background:a.primaryBg,color:a.primary,borderColor:"transparent",fontWeight:"600",boxShadow:"0 1px 2px rgba(26, 115, 232, 0.15)"},b={padding:"16px 24px 80px 24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"12px"},O={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",height:"72px",minHeight:"72px",borderRadius:"16px",background:a.bgSurface,border:"1px solid transparent",boxShadow:a.shadowCard,cursor:"pointer",transition:"all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",position:"relative",overflow:"hidden"},k=document.createElement("div");k.id="quick-email-popup",k.classList.add("cw-module-window"),Object.assign(k.style,Ce,{right:"100px",width:"440px",height:"640px",borderRadius:"20px",boxShadow:"0 24px 64px rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.4)"});let z={popup:k,googleLine:null,focusElement:null};function $(){s=!s,Ee(s,k,"cw-btn-email"),s||setTimeout(()=>m(),300)}let X=Se(k,"Quick Email",t,"Templates & Automa\xE7\xF5es",z,()=>$()),v=document.createElement("div");Object.assign(v.style,r);let C=document.createElement("div");Object.assign(C.style,u);let T=document.createElement("div");Object.assign(T.style,d);let N=document.createElement("div");Object.assign(N.style,p);let _=document.createElement("input");_.placeholder="Pesquisar templates...",Object.assign(_.style,c),_.onfocus=()=>{_.style.borderColor=a.primary,_.style.boxShadow="0 0 0 4px rgba(26, 115, 232, 0.15)",_.style.background="#fff"},_.onblur=()=>{_.style.borderColor="transparent",_.style.boxShadow="0 2px 5px rgba(0,0,0,0.03)",_.style.background="#fff"},z.focusElement=_;let I=document.createElement("div");Object.assign(I.style,f);let B=document.createElement("div");Object.assign(B.style,b),N.appendChild(_),N.appendChild(I),T.appendChild(N),T.appendChild(B);let h=document.createElement("div");Object.assign(h.style,d);let y=document.createElement("div");Object.assign(y.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),h.appendChild(y),C.appendChild(T),C.appendChild(h),v.appendChild(C),k.appendChild(X),k.appendChild(v),document.body.appendChild(k);async function M(F,P){try{s&&$();let R=Ct();await new Promise(q=>setTimeout(q,800)),P==="email"?await go(F):P==="cr"&&await vt(F),R()}catch(R){console.error("\u274C Erro:",R);let q=document.querySelector(".cw-focus-backdrop");q&&q.classList.remove("active")}}function l(F){i="detail",C.style.transform="translateX(-50%)";let P='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',R='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';y.innerHTML=`
            <style>
                .cw-email-content p { margin: 0 0 8px 0; } /* Margem apenas embaixo */
                .cw-email-content ul { margin: 0 0 8px 16px; padding: 0; }
                .cw-email-content li { margin-bottom: 4px; }
            </style>

            <div style="position:sticky; top:0; background:rgba(255,255,255,0.9); backdrop-filter:blur(12px); border-bottom:1px solid #eee; padding:16px 24px; z-index:10; display:flex; align-items:center; gap:12px;">
                <button id="csa-back-btn" style="background:none; border:none; cursor:pointer; display:flex; color:#5f6368; padding:8px; margin-left:-12px; border-radius:50%; transition:background 0.2s;">${P}</button>
                <div style="font-weight:600; font-size:16px; color:#202124; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${F.name}</div>
            </div>
            
            <div style="padding:24px;">
                <div style="margin-bottom:24px;">
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Assunto</div>
                    <div style="font-size:14px; font-weight:500; color:#202124; padding:16px; background:#F8F9FA; border-radius:12px; border:1px solid #eee; box-shadow:inset 0 1px 2px rgba(0,0,0,0.02);">${F.subject}</div>
                </div>
                
                <div>
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Mensagem</div>
                    
                    <div class="cw-email-content" style="font-size:13px; color:#3c4043; line-height:1.5; white-space: normal; word-break: break-word; padding:0 4px;">
                        ${F.body}
                    </div>
                </div>
            </div>
            
            <div style="position:sticky; bottom:0; padding:24px; background:linear-gradient(to top, #fff 90%, rgba(255,255,255,0)); pointer-events:none;">
                <button id="csa-insert-btn" style="pointer-events:auto; width:100%; padding:14px; background:#1a73e8; color:white; border:none; border-radius:12px; font-size:14px; font-weight:600; cursor:pointer; display:flex; justify-content:center; align-items:center; gap:10px; box-shadow:0 4px 12px rgba(26,115,232,0.3); transition:transform 0.2s, box-shadow 0.2s;">
                    ${R} Usar Template
                </button>
            </div>
        `;let q=y.querySelector("#csa-back-btn");q.onmouseenter=()=>q.style.background="#f1f3f4",q.onmouseleave=()=>q.style.background="none",q.onclick=m;let G=y.querySelector("#csa-insert-btn");G.onmouseenter=()=>{G.style.transform="translateY(-1px)",G.style.boxShadow="0 6px 16px rgba(26,115,232,0.4)"},G.onmouseleave=()=>{G.style.transform="translateY(0)",G.style.boxShadow="0 4px 12px rgba(26,115,232,0.3)"},G.onclick=()=>{G.style.transform="scale(0.96)",M(F,"email"),setTimeout(()=>{G.style.transform="scale(1)",m()},300)}}function m(){i="list",C.style.transform="translateX(0)"}function x(F,P,R=null){let q=document.createElement("button"),G=R?`<span style="margin-right:6px; font-size:14px; opacity:0.9;">${R}</span>`:"";return q.innerHTML=`${G}${F}`,Object.assign(q.style,w),n===P&&o===""?Object.assign(q.style,A):(q.onmouseenter=()=>{q.style.background="#F1F3F4",q.style.borderColor="#DADCE0"},q.onmouseleave=()=>{q.style.background="#FFFFFF",q.style.borderColor="#DADCE0"}),q.onclick=()=>{n=P,o="",_.value="",g(),E()},q}function g(){I.innerHTML="",I.appendChild(x("Smart CRs",e,"\u26A1")),Object.keys(Xe).forEach(F=>{I.appendChild(x(Xe[F].title,F))})}function E(){B.innerHTML="";let F=[];if(o.trim()!==""){let V=o.toLowerCase();Object.values(Xe).forEach(L=>{L.emails.forEach(H=>{(H.name.toLowerCase().includes(V)||H.subject.toLowerCase().includes(V))&&F.push({type:"email",data:H})})}),Object.entries(We).forEach(([L,H])=>{if(!H)return;(L.replace(/_/g," ").toLowerCase().includes(V)||H.toLowerCase().includes(V))&&F.push({type:"cr",key:L,code:H})})}else n===e?Object.entries(We).forEach(([V,L])=>{L&&F.push({type:"cr",key:V,code:L})}):Xe[n]&&Xe[n].emails.forEach(V=>{F.push({type:"email",data:V})});if(F.length===0){B.innerHTML=`
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F50D}</div>
                    <div style="font-size:14px; font-weight:500;">Nenhum template encontrado</div>
                    <div style="font-size:12px; margin-top:4px;">Tente outro termo de busca</div>
                </div>`;return}let R='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1967D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',q='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA8600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',G='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BDC1C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';F.forEach(V=>{let L=document.createElement("div");if(Object.assign(L.style,O),V.type==="email"){let H=V.data,pe=H.subject.length>45?H.subject.substring(0,45)+"...":H.subject;L.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#E8F0FE; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${R}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${H.name}</div>
                        <div style="font-size:12px; color:#5F6368; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${pe}</div>
                    </div>
                    <div style="margin-left:12px; opacity:0.6;">${G}</div>
                `,L.onclick=()=>l(H)}else{let H=V.key.replace(/_/g," ").replace("AS ","AS - ").replace("NI ","NI - ");L.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#FEF7E0; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${q}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; margin-bottom:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${H}</div>
                        <div style="font-size:11px; font-weight:500; color:#EA8600; font-family:'Roboto Mono', monospace; letter-spacing:-0.2px;">${V.code}</div>
                    </div>
                    <div style="font-size:10px; font-weight:700; color:#DADCE0; text-transform:uppercase; letter-spacing:0.5px; border:1px solid #F1F3F4; padding:4px 8px; border-radius:6px; margin-left:12px;">Inserir</div>
                `,L.onclick=()=>{L.style.transform="scale(0.98)",L.style.background="#FEF7E0",setTimeout(()=>{L.style.transform="scale(1)",L.style.background="#fff",M(V.code,"cr")},150)}}L.onmouseenter=()=>{L.style.transform="translateY(-2px)",L.style.boxShadow=a.shadowHover,V.type==="cr"?L.style.borderLeft="3px solid #Fbbc04":L.style.borderLeft="3px solid #1a73e8"},L.onmouseleave=()=>{L.style.transform="translateY(0)",L.style.boxShadow=a.shadowCard,L.style.borderLeft="1px solid transparent"},B.appendChild(L)})}return _.addEventListener("input",F=>{o=F.target.value,o!==""?Array.from(I.children).forEach(P=>{Object.assign(P.style,w),P.style.opacity="0.6"}):g(),E()}),g(),E(),$}var ko={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function Oo(){let t="v2.1 (Apple Motion)",e={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#f8f9fa",scrollBehavior:"smooth"},card:{background:"#ffffff",border:"1px solid #dadce0",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"13px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"10px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.15s ease, opacity 0.3s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.5",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"20px",height:"20px",borderRadius:"6px",border:"2px solid #dadce0",marginRight:"14px",marginTop:"1px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #eee",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"}},n={},o="PT",i="BAU",s=!1,a=document.createElement("div");a.id="call-script-popup",a.classList.add("cw-module-window"),Object.assign(a.style,Ce,{right:"auto",left:"50%",width:"400px",height:"650px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let r={popup:a,googleLine:null};function u(){s=!s,Ee(s,a,"cw-btn-script")}let d=Se(a,"Call Script",t,"Guia interativo para condu\xE7\xE3o de chamadas.",r,()=>{u()});a.appendChild(d);let p=document.createElement("div");Object.assign(p.style,e.progressBarContainer);let c=document.createElement("div");Object.assign(c.style,e.progressBarFill),p.appendChild(c),a.appendChild(p);let f=document.createElement("div");f.id="csa-content",Object.assign(f.style,e.contentArea),a.appendChild(f);let w=document.createElement("div");Object.assign(w.style,e.footer);let A=document.createElement("span");A.textContent="by lucaste@",Object.assign(A.style,{fontSize:"10px",color:"#bdc1c6"});let b=document.createElement("button");b.innerHTML=`
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
    Resetar Script
  `,Object.assign(b.style,e.resetBtn),b.onmouseenter=()=>b.style.background="#fce8e6",b.onmouseleave=()=>b.style.background="transparent",b.onclick=()=>{b.style.transform="scale(0.9)",setTimeout(()=>b.style.transform="scale(1)",150);for(let h in n)delete n[h];N()},w.appendChild(A),w.appendChild(b),a.appendChild(w);let O=document.createElement("div");Object.assign(O.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let k=document.createElement("div");Object.assign(k.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let z=document.createElement("div");z.textContent="BAU";let $=document.createElement("div");$.textContent="LT",Object.assign(z.style,ye),Object.assign($.style,ye),k.appendChild(z),k.appendChild($);let X=document.createElement("select");Object.assign(X.style,ht,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),X.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',X.value=o,O.appendChild(k),O.appendChild(X),f.appendChild(O);let v=document.createElement("div");v.id="csa-checklist-area",f.appendChild(v);let C=document.createElement("div");Object.assign(C.style,Ze),C.className="no-drag",C.title="Redimensionar",a.appendChild(C),Je(a,C),document.body.appendChild(a);function T(h){return h}function N(){v.innerHTML="";let h=`${o} ${i}`,y=ko[h];if(!y){v.innerHTML=`<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <div style="font-size: 24px;">\u2615</div>
        <div>Script n\xE3o configurado.</div>
      </div>`,c.style.width="0%";return}let M=y.color||"#1a73e8",l=0,m=0;["inicio","fim"].forEach(x=>{y[x]&&(l+=y[x].length)}),["inicio","fim"].forEach((x,g)=>{let E=y[x];if(!E||E.length===0)return;let F=document.createElement("div");Object.assign(F.style,e.card);let P=document.createElement("div");Object.assign(P.style,e.cardTitle);let R=x==="inicio"?"Abertura":"Fechamento";o.includes("ES")&&(R=x==="inicio"?"Apertura":"Cierre"),o.includes("EN")&&(R=x==="inicio"?"Opening":"Closing"),P.textContent=R;let q=document.createElement("span");q.style.fontSize="11px",q.style.opacity="0.7",q.style.fontWeight="500",q.style.background="#f1f3f4",q.style.padding="2px 8px",q.style.borderRadius="10px",P.appendChild(q),F.appendChild(P);let G=0;E.forEach((V,L)=>{let H=`${h}-${x}-${L}`,pe=!!n[H];pe&&(m++,G++);let ae=document.createElement("div");Object.assign(ae.style,e.itemRow);let ie=document.createElement("div");Object.assign(ie.style,e.checkbox);let de=document.createElement("span");de.innerHTML=V,de.style.flex="1",pe?(Object.assign(ae.style,e.itemCompleted),ie.style.background=M,ie.style.borderColor=M,ie.style.transform="scale(1)",ie.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ae.style.textDecoration="none",ae.style.opacity="1",ie.style.background="transparent",ie.style.borderColor="#dadce0",ie.style.transform="scale(1)",ie.innerHTML=""),ae.onclick=()=>{let fe=!n[H];n[H]=fe,K.playClick(),fe?(ie.style.transform="scale(1.2)",setTimeout(()=>ie.style.transform="scale(1)",150),Object.assign(ae.style,e.itemCompleted),ie.style.background=M,ie.style.borderColor=M,ie.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ae.style.textDecoration="none",ae.style.opacity="1",ie.style.background="transparent",ie.style.borderColor="#dadce0",ie.innerHTML=""),_(h,y)},ae.onmouseenter=()=>{n[H]||(ae.style.background="#f1f3f4",ie.style.borderColor=M)},ae.onmouseleave=()=>{n[H]||(ae.style.background="transparent",ie.style.borderColor="#dadce0")},ae.appendChild(ie),ae.appendChild(de),F.appendChild(ae)}),G===E.length&&E.length>0&&(q.style.color="#1e8e3e",q.style.background="#e6f4ea",F.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),q.textContent=`${G}/${E.length}`,v.appendChild(F)}),I(l,m)}function _(h,y){let M=0,l=0;["inicio","fim"].forEach(m=>{let x=y[m]||[];M+=x.length;let g=0;x.forEach((E,F)=>{n[`${h}-${m}-${F}`]&&(l++,g++)})}),I(M,l),setTimeout(()=>N(),200)}function I(h,y){let M=h===0?0:y/h*100;c.style.width=`${M}%`,M===100?c.style.background="#34A853":c.style.background="linear-gradient(90deg, #4285F4, #34A853)"}function B(h){i=h;let y=st();Object.assign(z.style,ye),Object.assign($.style,ye),Object.assign(h==="BAU"?z.style:$.style,y),N()}return z.onclick=()=>B("BAU"),$.onclick=()=>B("LT"),X.addEventListener("change",h=>{o=h.target.value,N()}),B(i),u}var pt={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"}]}},Ke={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},kt={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}},Vt="cw_link_history_v4";function Io(t,e){try{let n=JSON.parse(localStorage.getItem(Vt)||"[]");n=n.filter(o=>o.url!==t.url),n.unshift({...t,_originalCat:e}),n=n.slice(0,3),localStorage.setItem(Vt,JSON.stringify(n))}catch(n){console.warn("Erro ao salvar hist\xF3rico",n)}}function Qo(){try{return JSON.parse(localStorage.getItem(Vt)||"[]")}catch{return[]}}function qo(){let t="v4.6 (Colorful UI)",e="",n=!1,o=null,i=!1,s={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},a=document.createElement("div");a.id="links-popup",a.classList.add("cw-module-window"),Object.assign(a.style,Ce,{right:"100px",width:"600px",height:"650px",background:s.bgApp,overflow:"hidden"});let u=Se(a,"Central de Links",t,"Navegue pelas categorias ou use a busca.",{popup:a,googleLine:null},()=>B());a.appendChild(u);let d=document.createElement("div");d.style.cssText="display: flex; height: calc(100% - 56px); width: 100%; position: relative;",a.appendChild(d);let p=document.createElement("div");p.style.cssText=`
      width: 80px; flex-shrink: 0; background: ${s.bgSidebar};
      border-right: 1px solid ${s.borderSubtle};
      display: flex; flex-direction: column; align-items: center;
      padding: 16px 0; overflow-y: auto; gap: 8px;
      scrollbar-width: none; z-index: 2;
  `,d.appendChild(p);let c=document.createElement("div");c.style.cssText="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F8F9FA; position: relative; z-index: 1;",d.appendChild(c);let f=document.createElement("div");f.style.cssText="padding: 16px 24px; flex-shrink: 0; background: transparent;";let w=document.createElement("div");w.style.cssText=`
      position: relative; width: 100%; height: 44px;
      border-radius: 12px; border: 1px solid transparent;
      background: #FFFFFF; transition: all 0.2s;
      display: flex; align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  `;let A=document.createElement("div");A.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',A.style.cssText="margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none;";let b=document.createElement("input");b.type="text",b.placeholder="Buscar ferramenta ou SOP...",b.style.cssText=`
      flex: 1; height: 100%; border: none; background: transparent;
      padding: 0 12px; font-size: 14px; color: ${s.textPrimary};
      outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
  `,b.onfocus=()=>{w.style.boxShadow="0 4px 12px rgba(26,115,232,0.15)",w.style.border="1px solid #1a73e8"},b.onblur=()=>{w.style.boxShadow="0 2px 6px rgba(0,0,0,0.04)",w.style.border="1px solid transparent"},w.appendChild(A),w.appendChild(b),f.appendChild(w),c.appendChild(f);let O=document.createElement("div");O.style.cssText="flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth;",c.appendChild(O);let k=null;function z(){if(k)return;k=document.createElement("div"),k.style.cssText=`
          position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255,255,255,0.98); z-index: 20;
          display: flex; flex-direction: column;
          transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
      `;let h=document.createElement("div");h.style.cssText="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4;",h.innerHTML='<span style="font-size: 16px; font-weight: 700; color: #202124;">\u{1F552} Recentes</span>';let y=document.createElement("button");y.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',y.style.cssText="background: none; border: none; cursor: pointer; color: #5f6368;",y.onclick=()=>{X(),i=!1,N()},h.appendChild(y),k.appendChild(h);let M=document.createElement("div");M.id="cw-history-list",M.style.cssText="flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA;",k.appendChild(M),c.appendChild(k)}function $(){k||z();let h=k.querySelector("#cw-history-list");h.innerHTML="";let y=Qo();y.length===0?h.innerHTML='<div style="text-align: center; color: #999; margin-top: 60px; font-size:13px;">Nada por aqui ainda.</div>':y.forEach(M=>{let l=I(M,Ke[M._originalCat],!0,M._originalCat);h.appendChild(l)}),requestAnimationFrame(()=>k.style.transform="translateY(0)")}function X(){k&&(k.style.transform="translateY(100%)")}function v(){p.innerHTML="";let h=C("history","Recentes",Ke.history);h.id="cw-sidebar-btn-history",h.onclick=()=>{K.playClick(),i=!i,i?$():X(),N()},p.appendChild(h);let y=document.createElement("div");y.style.cssText="width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0;",p.appendChild(y),Object.keys(pt).forEach(M=>{let l=pt[M],m=C(M,l.label,Ke[M]);m.id=`cw-sidebar-btn-${M}`,m.onclick=()=>{K.playClick(),i&&(i=!1,X()),T(M)},p.appendChild(m)})}function C(h,y,M){let l=document.createElement("div");l.style.cssText=`
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; color: ${s.textSecondary}; 
          transition: all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1);
          position: relative;
      `,l.title=y,l.dataset.key=h;let m=document.createElement("div");m.style.cssText="width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s;",m.innerHTML=M||Ke.tasks;let x=document.createElement("div");return x.style.cssText="font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px;",x.textContent=y,l.appendChild(m),l.appendChild(x),l.onmouseenter=()=>{o!==h&&!(h==="history"&&i)&&(l.style.background="#F1F3F4",m.style.transform="scale(1.1)")},l.onmouseleave=()=>{o!==h&&!(h==="history"&&i)&&(l.style.background="transparent",m.style.transform="scale(1)")},l}function T(h){let y=document.getElementById(`cat-anchor-${h}`);y&&(y.scrollIntoView({behavior:"smooth",block:"start"}),o=h,N())}function N(){Object.keys(pt).forEach(y=>{let M=p.querySelector(`#cw-sidebar-btn-${y}`);if(M)if(o===y&&!i){let l=kt[y];M.style.background=l.bg,M.style.color=l.color,M.querySelector("div:first-child").style.transform="scale(1.1)"}else M.style.background="transparent",M.style.color=s.textSecondary,M.querySelector("div:first-child").style.transform="scale(1)"});let h=p.querySelector("#cw-sidebar-btn-history");h&&(i?(h.style.background="#3C4043",h.style.color="#FFFFFF"):(h.style.background="transparent",h.style.color=s.textSecondary))}function _(){if(O.innerHTML="",e.trim()!==""){let y=[];if(Object.entries(pt).forEach(([l,m])=>{let x=m.links.filter(g=>g.name.toLowerCase().includes(e.toLowerCase())||g.desc.toLowerCase().includes(e.toLowerCase()));y.push(...x.map(g=>({...g,_cat:l})))}),y.length===0){O.innerHTML='<div style="text-align:center; padding: 60px; color:#999; font-size:13px;">Nada encontrado.</div>';return}let M=document.createElement("div");M.innerHTML="Resultados da busca",M.style.cssText="font-size:12px; font-weight:700; color:#5f6368; margin:20px 0 10px; text-transform:uppercase; letter-spacing:0.5px;",O.appendChild(M),y.forEach(l=>{let m=I(l,Ke[l._cat],!1,l._cat);O.appendChild(m)});return}Object.entries(pt).forEach(([y,M])=>{let l=kt[y],m=document.createElement("div"),x=document.createElement("div");x.id=`cat-anchor-${y}`,x.style.cssText=`
              display: flex; align-items: center; gap: 8px;
              font-size: 13px; font-weight: 800; color: ${l.color}; 
              text-transform: uppercase; letter-spacing: 0.5px;
              margin: 32px 0 12px 0; padding-top: 10px;
          `,x.innerHTML=`
            <div style="width:8px; height:8px; border-radius:50%; background:${l.color};"></div>
            ${M.label}
          `,m.appendChild(x);let g=document.createElement("div");g.style.cssText="display: grid; grid-template-columns: 1fr; gap: 8px;",M.links.forEach(E=>{let F=I(E,Ke[y],!1,y);g.appendChild(F)}),m.appendChild(g),O.appendChild(m)});let h=document.createElement("div");h.style.height="80px",O.appendChild(h)}function I(h,y,M,l){let m=document.createElement("div"),x=kt[l]||kt.history;m.style.cssText=`
          display: flex; align-items: center; gap: 16px;
          padding: 12px 16px; 
          background: #FFFFFF; 
          border: 1px solid transparent;
          border-radius: 16px; 
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative; overflow: hidden;
      `;let g=document.createElement("div");g.style.cssText=`
          width: 40px; height: 40px; border-radius: 12px;
          background: ${x.bg}; color: ${x.color};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
      `,g.innerHTML=y||Ke.tasks;let E=g.querySelector("svg");E&&(E.style.width="22px",E.style.height="22px");let F=document.createElement("div");F.style.cssText="flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden;";let P=document.createElement("div");P.style.cssText=`font-size: 14px; font-weight: 600; color: ${s.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,P.textContent=h.name;let R=document.createElement("div");R.style.cssText=`font-size: 12px; color: ${s.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,R.textContent=h.desc,F.appendChild(P),F.appendChild(R);let q=document.createElement("div");return q.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',q.style.cssText=`
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9AA0A6; transition: all 0.2s; opacity: 0;
      `,q.title="Copiar URL",m.onmouseenter=()=>{m.style.transform="translateY(-2px)",m.style.boxShadow="0 8px 20px rgba(0,0,0,0.08)",m.style.borderColor="rgba(0,0,0,0.05)",m.style.borderLeft=`4px solid ${x.color}`,q.style.opacity="1",q.style.background="#F1F3F4"},m.onmouseleave=()=>{m.style.transform="translateY(0)",m.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",m.style.border="1px solid transparent",q.style.opacity="0",q.style.background="transparent"},m.onclick=()=>{!M&&l&&Io(h,l),window.open(h.url,"_blank")},q.onclick=G=>{G.stopPropagation(),K.playClick(),navigator.clipboard.writeText(h.url),!M&&l&&Io(h,l),U("Link copiado!")},m.appendChild(g),m.appendChild(F),m.appendChild(q),m}b.addEventListener("input",h=>{e=h.target.value,_()});function B(){n=!n,Ee(n,a,"cw-btn-links")}return document.body.appendChild(a),v(),_(),B}var Ge=[];function Ut(t){Ge=t}var Zo=["lucaste"],Jo=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function Fo(){let t="v4.9 (High Contrast UI)",e=!1,n=null,o=null;function i(l){if(!l)return"";try{let m=new Date(l);return isNaN(m.getTime())?String(l):m.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(l)}}if(!document.getElementById("cw-broadcast-hd-css")){let l=document.createElement("style");l.id="cw-broadcast-hd-css",l.innerHTML=`
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
      `,document.head.appendChild(l)}let s={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},a={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function r(l){return l?Object.entries(l).map(([m,x])=>`${m.replace(/[A-Z]/g,g=>"-"+g.toLowerCase())}:${x}`).join(";"):""}function u(l){if(!l||typeof l!="string")return"";let m=l;return m=m.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),m=m.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),m=m.replace(/_(.*?)_/g,"<i>$1</i>"),m=m.replace(/\n/g,"<br>"),m=lo(m),m}let d=document.createElement("div");d.id="broadcast-popup",d.classList.add("cw-module-window"),Object.assign(d.style,Ce,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let p={popup:d,googleLine:null};function c(){if(e=!e,Ee(e,d,"cw-btn-broadcast"),e){let l=document.getElementById("cw-btn-broadcast");l&&l.classList.remove("has-new"),T()}}let f=Se(d,"Central de Avisos",t,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",p,()=>c()),w=f.querySelector(".cw-header-actions")||f.lastElementChild,A=null;function b(){let l=null;try{l=ft()}catch{console.warn("TechSol: Auth Pending")}if(l){let m=l.split("@")[0].toLowerCase(),x=Zo.includes(m);if(window._cwIsAdmin=x,window._cwCurrentUser=m,x&&w&&!w.querySelector("#cw-admin-btn")){let g=document.createElement("div");g.id="cw-admin-btn",g.className="cw-btn-interactive",g.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(g.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),g.title="Novo Aviso",g.onclick=E=>{E.stopPropagation(),z()},w.insertBefore(g,w.firstChild),A||k(),_()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(b,2e3))}if(w){let l=document.createElement("button");l.textContent="Limpar",l.className="cw-btn-interactive",Object.assign(l.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),l.onclick=m=>{m.stopPropagation(),K.playSuccess();let x=Ge.map(g=>g.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(x)),_(),N()},w.insertBefore(l,w.firstChild)}d.appendChild(f);let O=document.createElement("div");O.id="cw-update-status",O.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",d.appendChild(O);function k(){A=document.createElement("div"),A.className="cw-editor-overlay",A.innerHTML=`
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
      `,A.querySelectorAll('input[name="cw-bc-type"]').forEach(g=>{g.addEventListener("change",()=>{A.querySelectorAll(".cw-radio-option").forEach(E=>E.classList.remove("checked")),g.parentElement.classList.add("checked")})}),setTimeout(()=>{let g=A.querySelector(".cw-radio-option.info");g&&g.classList.add("checked")},100);let l=A.querySelector("#cw-bc-cancel"),m=A.querySelector("#cw-bc-close-x"),x=A.querySelector("#cw-bc-send");l.onclick=$,m.onclick=$,x.onclick=X,d.appendChild(A)}function z(l=null){if(!A)return;let m=A.querySelector("#cw-editor-title-label"),x=A.querySelector("#cw-bc-title"),g=A.querySelector("#cw-bc-text"),E=A.querySelector("#cw-bc-send");if(l){o=l.id,m.textContent="Editar Aviso",x.value=l.title||"",g.value=l.text||"",E.textContent="Salvar Altera\xE7\xF5es";let F=l.type||"info",P=A.querySelector(`input[name="cw-bc-type"][value="${F}"]`);P&&P.click()}else{o=null,m.textContent="Novo Aviso",x.value="",g.value="",E.textContent="Publicar";let F=A.querySelector('input[name="cw-bc-type"][value="info"]');F&&F.click()}A.classList.add("active"),setTimeout(()=>x.focus(),300)}function $(){A&&A.classList.remove("active"),o=null}async function X(){let l=A.querySelector("#cw-bc-send"),m=A.querySelector("#cw-bc-title"),x=A.querySelector("#cw-bc-text"),g=A.querySelector('input[name="cw-bc-type"]:checked'),E=g?g.value:"info";if(!m.value.trim()||!x.value.trim()){U("Preencha todos os campos!",{error:!0});return}l.textContent="Salvando...",l.style.opacity="0.7";let F=!1;o?F=await we.updateBroadcast(o,{title:m.value,text:x.value,type:E}):F=await we.sendBroadcast({title:m.value,text:x.value,type:E,author:window._cwCurrentUser||"admin"}),F?(U(o?"Atualizado!":"Publicado!"),K.playSuccess(),$(),setTimeout(()=>T(),1500)):(U("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),l.textContent=o?"Salvar Altera\xE7\xF5es":"Publicar",l.style.opacity="1")}async function v(l){if(confirm("Confirma a exclus\xE3o deste aviso?"))if(await we.deleteBroadcast(l)){U("Aviso removido."),K.playClick();let x=Ge.findIndex(g=>g.id===l);x>-1&&Ge.splice(x,1),_(),setTimeout(()=>T(),1500)}else U("Erro ao excluir.",{error:!0})}let C=document.createElement("div");C.className="cw-nice-scroll",Object.assign(C.style,s.feedContainer),d.appendChild(C);async function T(){e&&(O.style.display="block",O.innerHTML="\u{1F504} Sincronizando...");try{let l=await we.fetchData();l&&l.broadcast&&(Ut(l.broadcast),N(),e&&(_(),O.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{O.style.display="none"},1500)))}catch{e&&(O.innerHTML="\u26A0\uFE0F Offline")}}function N(){let l=document.getElementById("cw-btn-broadcast");if(!l)return;let m=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(Ge.some(g=>!m.includes(g.id))){if(l.classList.add("has-new"),!l.querySelector(".cw-badge")){let g=document.createElement("div");g.className="cw-badge",Object.assign(g.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),l.appendChild(g)}}else{l.classList.remove("has-new");let g=l.querySelector(".cw-badge");g&&g.remove()}}function _(){C.innerHTML="";let l=d.querySelector("#cw-bau-widget");l&&l.remove();let m=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),x=[...Ge].sort((R,q)=>{let G=new Date(R.date).getTime()||0;return(new Date(q.date).getTime()||0)-G}),g=x.findIndex(R=>R.title&&R.title.toLowerCase().includes("disponibilidade bau"));if(g!==-1){let R=x[g];x.splice(g,1);let q=document.createElement("div");q.id="cw-bau-widget",Object.assign(q.style,s.bauContainer);let G=[],V=(R.text||"").split(`
`),L=/\d{1,2}\/\d{1,2}/;if(V.forEach(de=>{let fe=de.match(L);if(fe){let ke=fe[0],Me="\u{1F4C5}";/🇧🇷|🇵🇹|PT|BR/i.test(de)?Me="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(de)&&(Me="\u{1F1EA}\u{1F1F8}"),G.some(Re=>Re.flag===Me&&Re.date===ke)||G.push({flag:Me,date:ke})}}),G.length===0){let de=(R.text||"").match(/\d{1,2}\/\d{1,2}/g);de&&[...new Set(de)].forEach(fe=>G.push({flag:"\u{1F4C5}",date:fe}))}let H="",pe='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(pe=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${pe}
              `),G.length>0?H=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${G.map(fe=>`
                  <div style="${r(s.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${r(s.bauFlag)}">${fe.flag}</span>
                      <span style="${r(s.bauDate)}">${fe.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${pe}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${u(R.text)}</div>
              `:H=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${u(R.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,q.innerHTML=`
              <div style="${r(s.bauHeader)}; margin-bottom:8px;">
                  <div style="${r(s.liveIndicator)}">
                      <div style="${r(s.pulseDot)}"></div>
                      <span style="${r(s.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${i(R.date)}</div>
              </div>
              ${H}
          `,O.after(q);let ae=q.querySelector("#cw-bau-toggle-btn"),ie=q.querySelector("#cw-bau-full");if(ae&&ie&&(ae.onclick=()=>{let de=ie.style.display==="none";ie.style.display=de?"block":"none",ae.textContent=de?"Ocultar":"Detalhes"}),window._cwIsAdmin){let de=q.querySelector(".cw-bau-edit");de&&(de.onclick=()=>z(R))}}let E=x.sort((R,q)=>{let G=m.includes(R.id),V=m.includes(q.id);return G===V?0:G?1:-1});if(E.length===0&&!g){let R=document.createElement("div");Object.assign(R.style,s.emptyState),R.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,C.appendChild(R)}let F=E.filter(R=>!m.includes(R.id)),P=E.filter(R=>m.includes(R.id));if(F.forEach(R=>C.appendChild(I(R,!1))),P.length>0){let R=document.createElement("div");Object.assign(R.style,s.historyDivider),R.innerHTML=`<span>Hist\xF3rico (${P.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let q=document.createElement("div");Object.assign(q.style,s.historyContainer),P.forEach(V=>q.appendChild(I(V,!0)));let G=!1;R.onclick=()=>{K.playClick(),G=!G,q.style.display=G?"flex":"none",R.querySelector("svg").style.transform=G?"rotate(180deg)":"rotate(0deg)"},C.appendChild(R),C.appendChild(q)}}function I(l,m){let x=document.createElement("div");Object.assign(x.style,m?s.cardHistory:s.card);let g=a[l.type]||a.info,E=document.createElement("div");Object.assign(E.style,s.cardHeader);let F=document.createElement("div");Object.assign(F.style,s.typeTag,{color:g.color,background:g.bg}),F.innerHTML=`${g.icon} <span>${l.type}</span>`;let P=document.createElement("span");if(Object.assign(P.style,s.dateTag),P.textContent=i(l.date),E.appendChild(F),m)E.appendChild(P);else{let L=document.createElement("button");L.className="cw-btn-interactive",Object.assign(L.style,s.dismissBtn),L.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',L.onmouseenter=()=>{L.style.color="#1e8e3e",L.style.background="#e6f4ea",L.style.borderColor="#1e8e3e"},L.onmouseleave=()=>{L.style.color="#5f6368",L.style.background="#fff",L.style.borderColor="rgba(0,0,0,0.1)"},L.onclick=H=>{H.stopPropagation(),K.playClick(),x.style.transform="translateX(20px)",x.style.opacity="0",setTimeout(()=>{let pe=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");pe.push(l.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(pe)),_(),N()},200)},E.appendChild(L)}let R=document.createElement("div");Object.assign(R.style,s.cardContent);let q=document.createElement("div");Object.assign(q.style,s.msgTitle),q.textContent=l.title;let G=document.createElement("div");Object.assign(G.style,s.msgBody),G.innerHTML=u(l.text);let V=document.createElement("div");if(Object.assign(V.style,s.msgMeta),V.innerHTML=`Publicado por <b>${l.author||"Sistema"}</b>`,m||(V.innerHTML+=` \u2022 ${i(l.date)}`),R.appendChild(q),R.appendChild(G),R.appendChild(V),x.appendChild(E),x.appendChild(R),window._cwIsAdmin){let L=document.createElement("div");L.className="cw-card-actions";let H=document.createElement("button");H.className="cw-action-btn edit",H.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',H.onclick=()=>z(l);let pe=document.createElement("button");pe.className="cw-action-btn delete",pe.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',pe.onclick=()=>v(l.id),L.appendChild(H),L.appendChild(pe),x.appendChild(L)}return x}let B=we.getCachedBroadcasts();B.length>0&&(Ut(B),_()),setTimeout(b,500),T(),n||(n=setInterval(T,Jo));let h=document.createElement("div");Object.assign(h.style,Ze),h.className="no-drag",d.appendChild(h),Je(d,h),document.body.appendChild(d);let y=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),M=Ge.some(l=>!y.includes(l.id));return{toggle:c,hasUnread:M}}function Mo(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let t=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],e=0,n={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},o=document.createElement("div");Object.assign(o.style,n.overlay);let i=document.createElement("div");Object.assign(i.style,n.card);let s=document.createElement("div");Object.assign(s.style,n.icon);let a=document.createElement("div");Object.assign(a.style,n.title);let r=document.createElement("div");Object.assign(r.style,n.text);let u=document.createElement("div");Object.assign(u.style,n.dotsContainer);let d=document.createElement("div");Object.assign(d.style,n.btnContainer);let p=document.createElement("button");p.textContent="Pular",Object.assign(p.style,n.btn,n.btnSkip),p.onmouseover=()=>p.style.color="#202124",p.onmouseout=()=>p.style.color="#5f6368";let c=document.createElement("button");c.textContent="Pr\xF3ximo",Object.assign(c.style,n.btn,n.btnNext),c.onmouseover=()=>c.style.transform="scale(1.05)",c.onmouseout=()=>c.style.transform="scale(1)",d.appendChild(p),d.appendChild(c),i.appendChild(s),i.appendChild(a),i.appendChild(r),i.appendChild(u),i.appendChild(d),o.appendChild(i),document.body.appendChild(o);function f(A){let b=t[A];s.textContent=b.icon,a.textContent=b.title,r.textContent=b.text,u.innerHTML="",t.forEach((O,k)=>{let z=document.createElement("div");Object.assign(z.style,n.dot),k===A&&Object.assign(z.style,n.dotActive),u.appendChild(z)}),b.isLast?(p.style.display="none",c.textContent="Come\xE7ar \u{1F680}",c.style.width="100%"):(p.style.display="block",c.textContent="Pr\xF3ximo",c.style.width="auto")}function w(){localStorage.setItem("cw_onboarding_seen_v1","true"),o.style.opacity="0",i.style.transform="translateY(20px)",setTimeout(()=>o.remove(),400),K.playSuccess(),U("Tudo pronto! Use o menu flutuante.")}c.onclick=()=>{K.playClick(),e<t.length-1?(e++,f(e)):w()},p.onclick=()=>{confirm("Pular o tutorial?")&&w()},f(0),requestAnimationFrame(()=>{o.style.opacity="1",i.style.transform="translateY(0)"})}var Lo={version:"v4.5",title:"Novidades da Vers\xE3o 4.5 \u{1F389}",slides:[{icon:"\u{1F3A8}",title:"Novo Visual HD",text:"Refizemos toda a interface com design 'Glassmorphism' (estilo Apple) e modo escuro inteligente para melhor leitura."},{icon:"\u{1F5C2}\uFE0F",title:"Menu Lateral & Hist\xF3rico",text:"A Central de Links agora possui um menu lateral fixo para navega\xE7\xE3o r\xE1pida e uma se\xE7\xE3o 'Recentes' que lembra o que voc\xEA usou."},{icon:"\u26A1",title:"Performance",text:"O carregamento est\xE1 30% mais r\xE1pido e a busca de links agora \xE9 instant\xE2nea."},{icon:"\u{1F91D}",title:"Split & Transfer",text:"Novo m\xF3dulo dedicado para gerar notas de transfer\xEAncia (S&T) com preenchimento autom\xE1tico de dados t\xE9cnicos."}]};function No(t){let e=localStorage.getItem("cw_last_version");if(!e){localStorage.setItem("cw_last_version",t);return}e!==t&&en(t)}function en(t){let e=Lo.slides,n=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"400px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(30px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"12px",background:"#E8F0FE",color:"#1967D2",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",marginBottom:"16px",letterSpacing:"0.5px"},icon:{fontSize:"42px",marginBottom:"16px",display:"block"},title:{fontSize:"20px",fontWeight:"700",color:"#202124",marginBottom:"8px"},text:{fontSize:"14px",color:"#5f6368",lineHeight:"1.5",marginBottom:"32px",minHeight:"42px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"6px",marginBottom:"24px"},dot:{width:"6px",height:"6px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"18px",borderRadius:"4px"},btn:{width:"100%",padding:"12px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"all 0.2s",background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},i=document.createElement("div");Object.assign(i.style,o.overlay);let s=document.createElement("div");Object.assign(s.style,o.card);let a=document.createElement("div");Object.assign(a.style,o.badge),a.textContent=`Atualiza\xE7\xE3o ${t}`;let r=document.createElement("div");Object.assign(r.style,o.icon);let u=document.createElement("div");Object.assign(u.style,o.title);let d=document.createElement("div");Object.assign(d.style,o.text);let p=document.createElement("div");Object.assign(p.style,o.dotsContainer);let c=document.createElement("button");Object.assign(c.style,o.btn),c.onmouseover=()=>c.style.transform="scale(1.02)",c.onmouseout=()=>c.style.transform="scale(1)",s.appendChild(a),s.appendChild(r),s.appendChild(u),s.appendChild(d),s.appendChild(p),s.appendChild(c),i.appendChild(s),document.body.appendChild(i);function f(A){let b=e[A];r.textContent=b.icon,u.textContent=b.title,d.textContent=b.text,p.innerHTML="",e.forEach((O,k)=>{let z=document.createElement("div");Object.assign(z.style,o.dot),k===A&&Object.assign(z.style,o.dotActive),p.appendChild(z)}),A===e.length-1?c.textContent="Entendi, vamos l\xE1! \u{1F44D}":c.textContent="Pr\xF3ximo"}function w(){localStorage.setItem("cw_last_version",t),i.style.opacity="0",s.style.transform="translateY(30px)",setTimeout(()=>i.remove(),400),K.playSuccess(),U(`TechSol atualizado para ${t}!`)}c.onclick=()=>{K.playClick(),n<e.length-1?(n++,f(n)):w()},f(0),requestAnimationFrame(()=>{i.style.opacity="1",s.style.transform="translateY(0)"})}var Wt=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX"},{id:"co",name:"Col\xF4mbia/Peru",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"B. Aires"},{id:"ie",name:"Irlanda",flag:"\u{1F1EE}\u{1F1EA}",zone:"Europe/Dublin",label:"Dublin"},{id:"uk",name:"Reino Unido",flag:"\u{1F1EC}\u{1F1E7}",zone:"Europe/London",label:"Londres"}];function _o(){let t="v1.0",e=!1,n=null,o="mx",i={container:{padding:"0",display:"flex",flexDirection:"column",height:"100%",background:"#F8F9FA"},tabBar:{display:"flex",borderBottom:"1px solid #E0E0E0",background:"#FFF"},tab:{flex:1,padding:"14px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5F6368",borderBottom:"2px solid transparent",transition:"all 0.2s"},tabActive:{color:"#1A73E8",borderBottom:"2px solid #1A73E8",fontWeight:"600",background:"#F8F9FA"},gridContainer:{padding:"20px",display:"grid",gridTemplateColumns:"1fr",gap:"12px",overflowY:"auto"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px",background:"#FFF",borderRadius:"12px",border:"1px solid #E0E0E0",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"transform 0.2s"},hubInfo:{display:"flex",alignItems:"center",gap:"12px"},flag:{fontSize:"24px"},hubName:{fontSize:"14px",fontWeight:"600",color:"#202124"},hubTime:{fontSize:"20px",fontWeight:"700",color:"#3C4043",fontVariantNumeric:"tabular-nums"},statusDot:{width:"10px",height:"10px",borderRadius:"50%",display:"inline-block",marginRight:"6px"},plannerContainer:{padding:"24px",display:"flex",flexDirection:"column",alignItems:"center",gap:"24px",flex:1},clockCard:{width:"100%",padding:"20px",borderRadius:"16px",background:"#FFF",border:"1px solid #E0E0E0",display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(0,0,0,0.05)"},clockLabel:{fontSize:"12px",textTransform:"uppercase",color:"#5F6368",fontWeight:"700",letterSpacing:"0.5px"},clockDisplay:{fontSize:"36px",fontWeight:"700",color:"#1A73E8",fontFamily:"monospace"},sliderContainer:{width:"100%",padding:"0 10px"},slider:{width:"100%",cursor:"pointer",accentColor:"#1A73E8"},helperText:{fontSize:"13px",color:"#5F6368",textAlign:"center",lineHeight:"1.5",marginTop:"auto",marginBottom:"20px"}},s=document.createElement("div");s.id="timezone-popup",s.classList.add("cw-module-window"),Object.assign(s.style,Ce,{right:"100px",width:"400px",height:"550px",overflow:"hidden"});let r=Se(s,"Time Zone Traveler",t,"Consulte fusos hor\xE1rios e planeje liga\xE7\xF5es internacionais.",{popup:s},()=>X());s.appendChild(r);let u=document.createElement("div");Object.assign(u.style,i.container),s.appendChild(u);let d=document.createElement("div");Object.assign(d.style,i.tabBar);let p=document.createElement("div");p.textContent="\u{1F6A6} Agora (Ao Vivo)",Object.assign(p.style,i.tab,i.tabActive);let c=document.createElement("div");c.textContent="\u{1F4C5} Planejador",Object.assign(c.style,i.tab),d.appendChild(p),d.appendChild(c),u.appendChild(d);let f=document.createElement("div");Object.assign(f.style,i.gridContainer);let w=document.createElement("div");Object.assign(w.style,i.plannerContainer,{display:"none"}),u.appendChild(f),u.appendChild(w),p.onclick=()=>{Object.assign(p.style,i.tabActive),Object.assign(c.style,i.tab),f.style.display="grid",w.style.display="none",k()},c.onclick=()=>{Object.assign(c.style,i.tabActive),Object.assign(p.style,i.tab),f.style.display="none",w.style.display="flex",z(),O()};function A(v){return v>=9&&v<17?"#1E8E3E":v===8||v===17||v===18?"#F9AB00":"#D93025"}function b(){f.innerHTML="";let v=new Date;Wt.forEach(C=>{let T=v.toLocaleTimeString("pt-BR",{timeZone:C.zone,hour:"2-digit",minute:"2-digit"}),N=parseInt(T.split(":")[0]),_=A(N),I=N<6||N>19,B=document.createElement("div");Object.assign(B.style,i.hubCard);let h=I?"\u{1F319}":"\u2600\uFE0F";B.innerHTML=`
                <div style="display:flex; align-items:center; gap:12px;">
                    <div style="${$(i.flag)}">${C.flag}</div>
                    <div>
                        <div style="${$(i.hubName)}">${C.name}</div>
                        <div style="font-size:11px; color:#5F6368;">${C.label}</div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="${$(i.hubTime)}">${T}</div>
                    <div style="font-size:11px; font-weight:600; color:${_}; margin-top:2px;">
                        <span style="${$(i.statusDot)}; background:${_}"></span>
                        ${I?"Noite":"Dia"} ${h}
                    </div>
                </div>
            `,f.appendChild(B)})}function O(){w.innerHTML="";let v=document.createElement("div");v.style.width="100%";let C=document.createElement("label");C.textContent="Onde est\xE1 o cliente?",C.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase;";let T=document.createElement("select");Object.assign(T.style,ht),Wt.forEach(x=>{let g=document.createElement("option");g.value=x.id,g.textContent=`${x.flag} ${x.name} (${x.zone})`,x.id===o&&(g.selected=!0),T.appendChild(g)}),T.onchange=x=>{o=x.target.value,m(h.value)},v.appendChild(C),v.appendChild(T),w.appendChild(v);let N=document.createElement("div");N.style.cssText="display:flex; gap:16px; width:100%; align-items:stretch;";let _=document.createElement("div");Object.assign(_.style,i.clockCard),_.innerHTML=`
            <div style="${$(i.clockLabel)}">\u{1F1E7}\u{1F1F7} VOC\xCA (BRT)</div>
            <div id="cw-my-time" style="${$(i.clockDisplay)}">--:--</div>
        `;let I=document.createElement("div");Object.assign(I.style,i.clockCard),I.style.background="#E8F0FE",I.style.borderColor="#D2E3FC",I.innerHTML=`
            <div style="${$(i.clockLabel)}">CLIENTE</div>
            <div id="cw-client-time" style="${$(i.clockDisplay)}">--:--</div>
        `,N.appendChild(_),N.appendChild(I),w.appendChild(N);let B=document.createElement("div");Object.assign(B.style,i.sliderContainer);let h=document.createElement("input");h.type="range",h.min="0",h.max="1439",h.step="15",Object.assign(h.style,i.slider);let y=new Date,M=y.getHours()*60+y.getMinutes();h.value=M,h.oninput=x=>m(x.target.value),B.appendChild(h),w.appendChild(B);let l=document.createElement("div");Object.assign(l.style,i.helperText),l.innerHTML="Arraste a barra para simular hor\xE1rios.<br>Os rel\xF3gios mudam juntos.",w.appendChild(l),m(M);function m(x){let g=parseInt(x),E=Math.floor(g/60),F=g%60,P=new Date;P.setHours(E),P.setMinutes(F);let R=P.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"});_.querySelector("#cw-my-time").textContent=R;let q=Wt.find(H=>H.id===o),G=P.toLocaleTimeString("pt-BR",{timeZone:q.zone,hour:"2-digit",minute:"2-digit"}),V=I.querySelector("#cw-client-time");V.textContent=G;let L=parseInt(G.split(":")[0]);L<9||L>=18?(V.style.color="#D93025",I.style.background="#FCE8E6",I.style.borderColor="#FAD2CF"):(V.style.color="#1A73E8",I.style.background="#E8F0FE",I.style.borderColor="#D2E3FC")}}function k(){b(),n||(n=setInterval(b,6e4))}function z(){n&&(clearInterval(n),n=null)}function $(v){return Object.entries(v).map(([C,T])=>`${C.replace(/[A-Z]/g,N=>"-"+N.toLowerCase())}:${T}`).join(";")}function X(){e=!e,Ee(e,s,"cw-btn-timezone"),e?k():z()}return document.body.appendChild(s),X}function tn(){if(window.techSolInitialized){Gt();return}window.techSolInitialized=!0;let t="v4.5.1";console.log(`\u{1F680} TechSol Suite Initializing (${t})...`);try{io();try{K.initGlobalListeners(),K.playStartup()}catch(r){console.warn("\xC1udio bloqueado:",r)}we.fetchTips(),Gt();let e=Eo(),n=To(),o=Oo(),i=qo(),s=_o(),a=Fo();xo({toggleNotes:e,toggleEmail:n,toggleScript:o,toggleLinks:i,toggleTimezone:s,broadcastControl:a}),setTimeout(()=>{we.logEvent("App","Start","Session Start"),Mo(),setTimeout(()=>{No(t)},500)},2500)}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),U("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}tn();})();
