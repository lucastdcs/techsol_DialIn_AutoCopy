(()=>{var gt="",bt="",Jt=t=>new Promise(e=>setTimeout(e,t));async function eo(){if(gt&&bt)return gt;try{let t=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!t)return"Agente";t.click(),await Jt(150);let e="Consultor",n=document.querySelector("profile-details .name");if(n)e=n.textContent.trim().split(" ")[0],e=e.charAt(0).toUpperCase()+e.slice(1).toLowerCase();else{let s=document.querySelector("profile-details img");if(s&&s.src.includes("/photos/")){let i=s.src.match(/\/photos\/([^\?]+)/)[1];e=i.charAt(0).toUpperCase()+i.slice(1)}}let o=document.querySelector("profile-details .email");return o&&(bt=o.textContent.trim(),console.log("TechSol: Identidade confirmada ->",bt)),t.click(),document.body.click(),gt=e,e}catch(t){return console.warn("Sherlock falhou:",t),"Consultor"}}function Nt(){return gt||"Consultor"}function ft(){return bt||null}function to(t){let e=new Date,n=e.getHours(),o=e.getDay(),s="Ol\xE1",i="";n>=5&&n<12?(s="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):n>=12&&n<18?(s="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(s="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let a=[];n>=0&&n<5?a=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:n<12?o===1?a=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:o===5?a=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:a=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:n<18?a=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:a=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(o===0||o===6)&&(a=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let r=a[Math.floor(Math.random()*a.length)];return{prefix:`${s},`,name:t,suffix:r,icon:i,isFriday:o===5}}async function Bo(){try{let e=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!e)return null;let n=e.parentElement,o=n.querySelector(".unmask-button")||n.querySelector('[aria-label="Click to view"]');o&&(o.click(),await Jt(500));let i=Array.from(n.querySelectorAll("a, span, div, pii-value")).find(a=>{let r=a.innerText.trim();return r.includes("@")&&!r.includes("Is this:")&&r.toLowerCase()!=="email"});return i?i.innerText.trim():null}catch(t){return console.warn("Erro ao capturar email do cliente:",t),null}}function Po(){try{let t=document.querySelector('material-input[debug-id="account-id-input"]');if(t){let e=t.querySelector("input");if(e){let n=e.value.trim();if(n)return n.includes("@")?n:`${n}@google.com`}}}catch(t){console.warn("Erro ao capturar email interno:",t)}return null}function jo(){try{let e=Array.from(document.querySelectorAll(".data-pair-label")).find(s=>s.textContent.includes("Google Ads External Customer ID")||s.textContent.includes("Customer ID"));if(e){let s=e.closest("home-data-item")||e.parentElement;if(s){let i=s.querySelector(".data-pair-content");if(i)return i.textContent.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}}let o=document.body.innerText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);if(o)return o[0].replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(t){console.warn("Erro ao capturar CID:",t)}return"---"}async function Ue(){let t="Cliente",e="[INSERIR URL]";try{let a=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(a&&a.nextElementSibling){let r=a.nextElementSibling.innerText.trim();r&&(t=r)}}catch(i){console.warn("Falha Nome:",i)}try{let a=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(a&&a.nextElementSibling){let r=a.nextElementSibling.innerText.trim();r&&(e=r)}}catch(i){console.warn("Falha URL:",i)}let n=await Bo(),o=Po(),s=jo();return{advertiserName:t,websiteUrl:e,clientEmail:n,internalEmail:o,cid:s,agentName:Nt()}}var Ye=null,Rt=null,Me=.3;function We(){if(!Ye){let t=window.AudioContext||window.webkitAudioContext;t&&(Ye=new t)}return Ye&&Ye.state==="suspended"&&Ye.resume(),Ye}function oo(t){if(Rt)return Rt;let e=t.sampleRate*2,n=t.createBuffer(1,e,t.sampleRate),o=n.getChannelData(0);for(let s=0;s<e;s++)o[s]=Math.random()*2-1;return Rt=n,n}var X={playClick:()=>{let t=We();if(!t)return;let e=t.currentTime,n=t.createBufferSource();n.buffer=oo(t);let o=t.createBiquadFilter();o.type="highpass",o.frequency.value=4e3;let s=t.createGain();s.gain.setValueAtTime(Me*.8,e),s.gain.exponentialRampToValueAtTime(.001,e+.015),n.connect(o),o.connect(s),s.connect(t.destination),n.start(e),n.stop(e+.02)},playHover:()=>{let t=We();if(!t)return;let e=t.currentTime,n=t.createOscillator();n.type="sine",n.frequency.setValueAtTime(400,e);let o=t.createGain();o.gain.setValueAtTime(0,e),o.gain.linearRampToValueAtTime(Me*.1,e+.005),o.gain.linearRampToValueAtTime(0,e+.02),n.connect(o),o.connect(t.destination),n.start(e),n.stop(e+.03)},playSuccess:()=>{let t=We();if(!t)return;let e=t.currentTime;[1046.5,1567.9].forEach((o,s)=>{let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o,a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(Me*.6,e+.05),a.gain.exponentialRampToValueAtTime(.001,e+.6),i.connect(a),a.connect(t.destination),i.start(e),i.stop(e+.7)})},playGenieOpen:()=>{let t=We();if(!t)return;let e=t.currentTime,n=t.createBufferSource();n.buffer=oo(t);let o=t.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(100,e),o.frequency.exponentialRampToValueAtTime(800,e+.2);let s=t.createGain();s.gain.setValueAtTime(0,e),s.gain.linearRampToValueAtTime(Me*.5,e+.05),s.gain.linearRampToValueAtTime(0,e+.25),n.connect(o),o.connect(s),s.connect(t.destination),n.start(e),n.stop(e+.3)},playError:()=>{let t=We();if(!t)return;let e=t.currentTime,n=t.createOscillator(),o=t.createGain();n.type="triangle",n.frequency.setValueAtTime(120,e),n.frequency.exponentialRampToValueAtTime(80,e+.1),o.gain.setValueAtTime(Me,e),o.gain.exponentialRampToValueAtTime(.001,e+.15),n.connect(o),o.connect(t.destination),n.start(e),n.stop(e+.2)},playStartup:()=>{let t=We();if(!t)return;let e=t.currentTime,n=.12,o=t.createOscillator(),s=t.createGain(),i=t.createBiquadFilter();o.type="square",o.frequency.setValueAtTime(400,e),o.frequency.exponentialRampToValueAtTime(50,e+.1),i.type="lowpass",i.frequency.setValueAtTime(800,e),i.frequency.exponentialRampToValueAtTime(100,e+.1),s.gain.setValueAtTime(Me*4,e),s.gain.exponentialRampToValueAtTime(.001,e+.1),o.connect(i),i.connect(s),s.connect(t.destination),o.start(e),o.stop(e+.12);let a=t.createOscillator(),r=t.createGain();a.type="sine",a.frequency.setValueAtTime(150,e),a.frequency.exponentialRampToValueAtTime(50,e+.15),r.gain.setValueAtTime(Me*1.5,e),r.gain.exponentialRampToValueAtTime(.001,e+.15),a.connect(r),r.connect(t.destination),a.start(e),a.stop(e+.15),[55,55.4,110.5].forEach(m=>{let u=t.createOscillator(),d=t.createGain(),f=t.createBiquadFilter();u.type="sawtooth",u.frequency.value=m,f.type="lowpass",f.frequency.setValueAtTime(30,e),f.frequency.linearRampToValueAtTime(900,e+n+.2),f.frequency.exponentialRampToValueAtTime(40,e+3),d.gain.setValueAtTime(0,e),d.gain.linearRampToValueAtTime(Me*.6,e+n+.1),d.gain.exponentialRampToValueAtTime(.001,e+3.5),u.connect(f),f.connect(d),d.connect(t.destination),u.start(e),u.stop(e+3.6)})},playNotification:()=>{let t=We();if(!t)return;let e=t.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(o=>{let s=t.createOscillator(),i=t.createGain();s.type="sine",s.frequency.setValueAtTime(o.freq,e),i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(Me*o.vol,e+.004),i.gain.exponentialRampToValueAtTime(.001,e+o.dur),s.connect(i),i.connect(t.destination),s.start(e),s.stop(e+o.dur+.1)})},playSwoosh:()=>{X.playGenieOpen()},playReset:()=>{X.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let t=0,e=50;document.addEventListener("mouseover",n=>{if(!Ye)return;let o=n.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!o||o.contains(n.relatedTarget))return;let s=Date.now();s-t<e||(X.playHover(),t=s)},{passive:!0})}};var no=1e4;function io(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let t=document.createElement("link");t.id="google-font-roboto",t.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",t.rel="stylesheet",document.head.appendChild(t);let e=document.createElement("style");e.id="techsol-global-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function W(t,e={}){let n=document.createElement("div"),o=e.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(n.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:o,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),n.textContent=t,document.body.appendChild(n),e.error?X.playError():X.playSuccess(),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>n.remove(),400)},e.duration||4e3)}function so(t,e=null){let n=0,o=0,s=0,i=0,a=e||t;a.style.cursor="grab",a.onmousedown=r;function r(u){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(u.target.tagName)||u.target.closest(".no-drag"))return;u=u||window.event,a.style.cursor="grabbing",t.style.transition="none";let d=t.getBoundingClientRect();t.style.transform="none",t.style.left=d.left+"px",t.style.top=d.top+"px",t.style.margin="0",t.style.bottom="auto",t.style.right="auto",no++,t.style.zIndex=no,s=u.clientX,i=u.clientY,t.setAttribute("data-dragging","true"),document.onmouseup=m,document.onmousemove=p}function p(u){u=u||window.event,u.preventDefault(),n=s-u.clientX,o=i-u.clientY,s=u.clientX,i=u.clientY;let d=t.offsetTop-o,f=t.offsetLeft-n,x=16,h=window.innerWidth,b=window.innerHeight,C=t.offsetWidth,k=t.offsetHeight;f<x?f=x:f+C>h-x&&(f=h-C-x),d<x?d=x:d+k>b-x&&(d=b-k-x),t.style.top=d+"px",t.style.left=f+"px"}function m(){document.onmouseup=null,document.onmousemove=null,a.style.cursor="grab",setTimeout(()=>{t.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",t.setAttribute("data-dragging","false"),t.setAttribute("data-moved","true")},50)}}var Ee={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var zt={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},ht={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var ro={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var ve={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var Dt=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],ao=-1;function st(){let t=Math.floor(Math.random()*Dt.length);return t===ao&&(t=(t+1)%Dt.length),ao=t,Dt[t]}var _e=t=>new Promise(e=>setTimeout(e,t));async function Ho(t,e){if(!t)return;t.style.opacity="1",t.innerHTML='<span class="cursor">|</span>';let n=t.querySelector(".cursor");await _e(200);for(let o=0;o<e.length;o++){let s=e.charAt(o),i=document.createElement("span");i.textContent=s,n&&n.parentNode===t?n.before(i):t.appendChild(i);let a=Math.floor(Math.random()*60)+30;o===0&&(a=150),o>e.length-3&&(a=30),await _e(a)}await _e(600),n&&(n.style.display="none")}async function Gt(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let e=document.createElement("style");e.id="google-splash-style",e.innerHTML=`
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
    `,document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1");try{await _e(200);let e=await eo(),n=to(e),o=t.querySelector("#w-icon"),s=t.querySelector("#p1"),i=t.querySelector("#p2"),a=t.querySelector("#p3"),r=t.querySelector("#p-sextou");o&&(o.innerHTML=n.icon),s&&(s.textContent=n.prefix),a&&(a.textContent=n.suffix),await _e(300);let p=o?o.querySelector("svg"):null;if(p&&(p.style.opacity="1",p.style.transform="scale(1)"),await _e(400),s&&(s.style.opacity="1"),X.playStartup(),i&&await Ho(i,n.name),a&&(a.style.opacity="1",a.style.transform="translateY(0)"),n.isFriday&&r){await _e(400),r.style.display="block",r.offsetWidth;let m=r.querySelector(".sextou-badge");m&&(m.style.opacity="1",m.style.transform="scale(1)")}await _e(1500)}catch(e){console.warn("Splash error, skipping...",e)}finally{t.classList.add("splash-exit"),await _e(900),t.parentNode&&t.parentNode.removeChild(t)}}var et={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function tt(t,e){e.onmousedown=n;function n(o){o.stopPropagation(),o.preventDefault();let s=t.style.transition;t.style.transition="none";let i=o.clientX,a=o.clientY,r=parseFloat(getComputedStyle(t,null).getPropertyValue("width").replace("px","")),p=parseFloat(getComputedStyle(t,null).getPropertyValue("height").replace("px","")),m=i,u=a,d=!1;function f(b){m=b.clientX,u=b.clientY,d||(window.requestAnimationFrame(()=>{x(),d=!1}),d=!0)}function x(){let b=r+(m-i),C=p+(u-a);b>360&&(t.style.width=b+"px"),C>300&&(t.style.height=C+"px")}function h(){document.removeEventListener("mousemove",f),document.removeEventListener("mouseup",h),setTimeout(()=>{t.style.transition=s},50)}document.addEventListener("mousemove",f),document.addEventListener("mouseup",h)}e.onmouseenter=()=>e.style.opacity="1",e.onmouseleave=()=>e.style.opacity="0.6"}function lo(t){if(!t)return"";let e={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return t.replace(/:([a-zA-Z0-9-_+]+):/g,n=>e[n]?e[n]:"")}var ot=t=>new Promise(e=>setTimeout(e,t));function rt(t){t&&["mousedown","mouseup","click"].forEach(e=>t.dispatchEvent(new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window})))}var co="cw-automation-styles";if(!document.getElementById(co)){let t=document.createElement("style");t.id=co,t.innerHTML=`
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
    `,document.head.appendChild(t)}function po(t){let e=document.getElementById("cw-loading-overlay");t?e?e.style.opacity="1":(e=document.createElement("div"),e.id="cw-loading-overlay",document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1")):e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}async function uo(t){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let e=document.getElementById(t),n="";po(!0),e&&(n=e.placeholder,e.placeholder="Buscando ID...",e.value="",e.classList.add("cw-scanning-active"));try{let o=document.querySelector('material-button[debug-id="dock-item-case-log"]');o&&!o.classList.contains("selected")&&(rt(o),await ot(1200));let s=document.querySelector("search-filter dropdown-button .button");if(s&&!(s.innerText||"").includes("All")){rt(s),await ot(600);let f=document.querySelector('material-checkbox[debug-id="check-all-box"]');f&&f.getAttribute("aria-checked")!=="true"&&(rt(f),await ot(300));let x=document.querySelector('material-button[debug-id="apply-filter"]');x&&(rt(x),await ot(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await ot(500));let a=Array.from(document.querySelectorAll(".message-header"));for(let d=a.length-1;d>=0;d--){let f=a[d],x=f.querySelector("i.material-icons-extended"),h=x&&x.innerText.trim()==="phone_in_talk",b=f.innerText||"",C=b.includes("Agent joined")||b.includes("outbound-call")||b.includes("Speakeasy");if(h||C){f.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",f),e&&(e.placeholder="Lendo mensagem..."),rt(f),await ot(1e3));break}}let p=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),m=/Speakeasy.*?(P\d{15,25})/i,u=null;for(let d=p.length-1;d>=0;d--){let f=p[d];if(f.offsetParent===null)continue;let x=(f.innerText||"").match(m);if(x&&x[1]){u=x[1];break}}if(e)if(u){try{await navigator.clipboard.writeText(u)}catch{}e.value=u,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),X.playSuccess(),W(`ID Localizado: ${u}`),e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}else X.playError(),W("Nenhum ID encontrado.",{error:!0}),e.placeholder="N\xE3o encontrado",e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}catch(o){console.error("Erro na automa\xE7\xE3o:",o),W("Erro ao processar.",{error:!0})}finally{e&&(e.classList.remove("cw-scanning-active"),e.value||(e.placeholder=n)),po(!1)}}var Ne={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:"}},Ge={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},lt={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>Substatus:</b> DC - Other<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br>Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},Xe={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},ct=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],Bt=["CONSIDERACOES","COMENTARIOS"],qe={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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
\u2022 Tentativa 2 -`}};var fe=t=>new Promise(e=>setTimeout(e,t));function we(t,e="info"){let n={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${t}`,n[e]||n.info)}function Fe(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>t.dispatchEvent(new MouseEvent(n,e)))}function xt(t,e){if(!t)return;let n=`cw-warning-${t.id||Math.random().toString(36).substr(2,9)}`,o=document.getElementById(n);o&&o.remove();let s=t.getBoundingClientRect(),i=document.createElement("div");i.id=n,i.style.cssText=`
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
    `;let a=i.querySelector(".cw-close-btn");a.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&a.click()},25e3)}async function yt(t,e){if(!t||!e)return;t.focus(),t.value="",t.dispatchEvent(new Event("input",{bubbles:!0})),await fe(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),await fe(100),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function Pt(){let e=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(n=>{let o=n.offsetParent!==null,s=n.closest("case-message-view")!==null,i=n.closest(".editor")!==null||n.closest("write-card")!==null;return o&&!s&&i});return e&&we("Editor visualmente detectado.","success"),e}async function mo(){we("\u{1F680} FASE 1: Tentando abrir a janela de email...");let t=!1,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(d=>d.innerText.trim()==="email");if(n&&n.offsetParent!==null){we("Bot\xE3o de email direto encontrado.");let d=n.closest("material-button")||n.closest("material-fab")||n;Fe(d),t=!0}else{we("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let d=document.querySelector("material-fab-speed-dial");if(d){let f=d.querySelector(".trigger");if(f){Fe(f),await fe(800);let h=Array.from(document.querySelectorAll("i.material-icons-extended")).find(b=>b.innerText.trim()==="email");h&&(Fe(h),t=!0)}}}if(!t)return W("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;we("\u{1F680} FASE 2: Verificando rascunhos...");let o=null,s=0,i=20;for(;s<i;){await fe(250);let d=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(o=Array.from(d).find(f=>f.offsetParent!==null),o){we("\u26A0\uFE0F Rascunho detectado!","warn");break}s++}if(o){we("\u{1F5D1}\uFE0F Descartando..."),Fe(o),o.click();let d=null,f=0;for(;f<15;){await fe(300);let x=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(d=Array.from(x).find(h=>h.offsetParent!==null),d)break;f++}d&&(Fe(d),W("Limpando rascunho antigo...",{duration:2e3}),await fe(2500))}we("\u{1F680} FASE 3: Buscando editor final...");let a=0,r=null;for(;a<20&&(r=Pt(),!r);)await fe(250),a++;if(!r)return W("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let p=r.closest('[id="email-body-content-top"]'),u=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(p){if(u){let f=u.closest('[aria-hidden="true"]');f&&f.removeAttribute("aria-hidden"),u.focus(),Fe(u)}await fe(300),p.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let d=p.querySelector("#cases-body-field");if(d){let f=document.createRange();f.selectNodeContents(d),f.collapse(!0);let x=window.getSelection();x.removeAllRanges(),x.addRange(f)}return!0}return!1}async function vt(t){if(!t||!await mo())return;let n=await Ue();we("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let o=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(o&&(o.click(),await fe(600)),n.clientEmail&&n.clientEmail!=="N/A"&&n.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await yt(i,n.clientEmail),xt(i,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(n.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await yt(i,n.internalEmail),xt(i,`
                <strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.
                <div style="margin-top:4px;">
                    <a href="https://mail.google.com/mail/u/0?ui=2&ik=ed23fb3167&attid=0.1&permmsgid=msg-f:1843445102914241244&th=19953b8dda2302dc&view=fimg&fur=ip&permmsgid=msg-f:1843445102914241244&sz=s0-l75-ft&attbid=ANGjdJ9m7O33cM36sxBYohVD6Qsapyux4PNr8qmTBlZ8zkp_LR79suGZhnxFJtBoFDeyMFygsH_tvCts5fnX0WV4rdClw9YqqR7guLnaXU9UzmZRRMRXEoC7T_MPbwo&disp=emb&realattid=ii_mfmv7wjm1&zw" target="_blank" style="color:#1a73e8;text-decoration:none;font-weight:500;display:inline-flex;align-items:center;">
                        Consultar Regra <span style="font-size:14px;margin-left:2px;">\u2197</span>
                    </a>
                </div>
            `))}await fe(500);let s=document.querySelector('material-button[debug-id="canned_response_button"]');if(s){Fe(s),await fe(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){Fe(i),document.execCommand("insertText",!1,t),i.dispatchEvent(new Event("input",{bubbles:!0})),we("\u23F3 Buscando resultado da Canned Response...","info");let a=null,r=0,p=15e3,m=500;for(;r<p&&(a=document.querySelector("material-select-dropdown-item"),!a);)await fe(m),r+=m;if(a){Fe(a),await fe(1500);let u=Pt();if(u&&n.advertiserName){let d=u.innerHTML;d.includes("{%ADVERTISER_NAME%}")&&(u.innerHTML=d.replace(/{%ADVERTISER_NAME%}/g,n.advertiserName))}W("Canned Response aplicada!")}else we(`\u274C Timeout: Resultado '${t}' n\xE3o apareceu ap\xF3s 15s.`,"error"),W(`Timeout: Template '${t}' n\xE3o carregou.`,{error:!0})}}else W("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function go(t){if(we(`\u{1F680} Iniciando Quick Email: ${t.name}`),!await mo())return;let n=await Ue(),o=Nt();await fe(600),we("\u{1F4E7} Processando destinat\xE1rios...");let s=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(s&&(s.click(),await fe(600)),n.clientEmail&&n.clientEmail!=="N/A"&&n.clientEmail!=="N/A (Bloqueado)"){let r=document.querySelector('input[aria-label="Enter To email address"]');r&&(await yt(r,n.clientEmail),xt(r,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(n.internalEmail){let r=document.querySelector('input[aria-label="Enter Bcc email address"]');r&&(await yt(r,n.internalEmail),xt(r,`
                <strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.
                <div style="margin-top:4px;">
                    <a href="https://mail.google.com/mail/u/0?ui=2&ik=ed23fb3167&attid=0.1&permmsgid=msg-f:1843445102914241244&th=19953b8dda2302dc&view=fimg&fur=ip&permmsgid=msg-f:1843445102914241244&sz=s0-l75-ft&attbid=ANGjdJ9m7O33cM36sxBYohVD6Qsapyux4PNr8qmTBlZ8zkp_LR79suGZhnxFJtBoFDeyMFygsH_tvCts5fnX0WV4rdClw9YqqR7guLnaXU9UzmZRRMRXEoC7T_MPbwo&disp=emb&realattid=ii_mfmv7wjm1&zw" target="_blank" style="color:#1a73e8;text-decoration:none;font-weight:500;display:inline-flex;align-items:center;">
                        Consultar Regra <span style="font-size:14px;margin-left:2px;">\u2197</span>
                    </a>
                </div>
            `))}let i=document.querySelector('input[aria-label="Subject"]');i&&t.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,t.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await fe(300));let a=Pt();if(a){let p=(a.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');p&&(p.focus(),Fe(p));let m=new Date;m.setDate(m.getDate()+3);let u=m.getDay();u===6?m.setDate(m.getDate()+2):u===0&&m.setDate(m.getDate()+1);let d=m.toLocaleDateString("pt-BR"),f=t.body;f=f.replace(/\[Nome do Cliente\]/g,n.advertiserName||"Cliente"),f=f.replace(/\[INSERIR URL\]/g,n.websiteUrl||"seu site"),f=f.replace(/\[URL\]/g,n.websiteUrl||"seu site"),f=f.replace(/\[Seu Nome\]/g,o),f=f.replace(/\[MM\/DD\/YYYY\]/g,d),document.execCommand("insertHTML",!1,f),p&&(p.dispatchEvent(new Event("input",{bubbles:!0})),p.dispatchEvent(new Event("change",{bubbles:!0}))),W("Email preenchido com sucesso!",{duration:2e3}),we("\u2705 Processo finalizado com sucesso.","success")}else W("Erro ao focar no editor.",{error:!0})}var $o={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},bo={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function Te(t,e,n,o,s,i){let a=document.createElement("div");Object.assign(a.style,$o),so(t,a);let r=document.createElement("div");Object.assign(r.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),a.appendChild(r),s&&(s.googleLine=r);let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center",gap:"12px"});let m=document.createElement("img");m.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(m.style,{width:"20px",height:"20px",pointerEvents:"none"});let u=document.createElement("span");u.textContent=e,p.appendChild(m),p.appendChild(u);let d=document.createElement("div");Object.assign(d.style,{display:"flex",alignItems:"center",gap:"4px"});let f='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',x='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',h=document.createElement("div");h.innerHTML=f,Object.assign(h.style,bo),h.title="Sobre & Feedback",h.classList.add("no-drag"),h.onmouseenter=()=>{h.style.background="rgba(255,255,255,0.1)",h.style.color="#FFF"},h.onmouseleave=()=>{h.style.color!=="rgb(138, 180, 248)"&&(h.style.background="transparent",h.style.color="#9AA0A6")};let b=document.createElement("div");b.innerHTML=x,Object.assign(b.style,bo),b.title="Fechar",b.classList.add("no-drag"),b.onmouseenter=()=>{b.style.background="rgba(242, 139, 130, 0.2)",b.style.color="#F28B82"},b.onmouseleave=()=>{b.style.background="transparent",b.style.color="#9AA0A6"},b.onmousedown=k=>k.stopPropagation(),h.onmousedown=k=>k.stopPropagation(),b.onclick=i;let C=Vo(t,e,n,o);return h.onclick=k=>{k.stopPropagation(),C.style.opacity==="1"?(C.style.opacity="0",C.style.pointerEvents="none",h.style.color="#9AA0A6",h.style.background="transparent"):(C.style.opacity="1",C.style.pointerEvents="auto",h.style.color="#8AB4F8",h.style.background="rgba(138, 180, 248, 0.1)")},d.appendChild(h),d.appendChild(b),a.appendChild(p),a.appendChild(d),a}function Vo(t,e,n,o){let s=document.createElement("div");return Object.assign(s.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),s.innerHTML=`
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
    `,document.head.appendChild(t)}function ke(t,e,n){let o=document.getElementById(n);if(!e)return;let s=e.getAttribute("data-moved")==="true",i={x:0,y:0};if(o){let u=o.getBoundingClientRect();i.x=u.left+u.width/2,i.y=u.top+u.height/2}let a,r;if(!s)a=window.innerWidth/2,r=window.innerHeight/2;else{let u=e.getBoundingClientRect();a=u.left+u.width/2,r=u.top+u.height/2,a===0&&r===0&&(a=window.innerWidth/2,r=window.innerHeight/2)}let p=i.x-a,m=i.y-r;t?(X.playGenieOpen(),e.style.transition="none",e.style.opacity="0",e.style.pointerEvents="auto",s?e.style.transform=`translate(${p}px, ${m}px) scale(0.05)`:e.style.transform=`translate(calc(-50% + ${p}px), calc(-50% + ${m}px)) scale(0.05)`,e.offsetWidth,requestAnimationFrame(()=>{e.classList.add("open"),o&&o.classList.add("active"),e.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",e.style.opacity="1",s?e.style.transform="translate(0, 0) scale(1)":e.style.transform="translate(-50%, -50%) scale(1)"}),typeof fo=="function"&&fo(e,n)):(X.playSwoosh(),e.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",e.style.pointerEvents="none",requestAnimationFrame(()=>{e.style.opacity="0",s?e.style.transform=`translate(${p}px, ${m}px) scale(0.1)`:e.style.transform=`translate(calc(-50% + ${p}px), calc(-50% + ${m}px)) scale(0.1)`}),setTimeout(()=>{e.classList.remove("open"),o&&o.classList.remove("active"),e.style.transition="",e.style.transform=""},300),typeof jt=="function"&&jt(e))}function fo(t,e){jt(t);let n=o=>{if(!t.classList.contains("open"))return;let s=t.contains(o.target),i=document.querySelector(".cw-pill"),a=i&&i.contains(o.target);s?(t.classList.remove("idle"),t.style.zIndex="2147483648"):a||(t.classList.add("idle"),t.style.zIndex="2147483646")};t._idleHandler=n,document.addEventListener("mousedown",n)}function jt(t){t._idleHandler&&(document.removeEventListener("mousedown",t._idleHandler),t._idleHandler=null)}var Uo="https://script.google.com/a/macros/google.com/s/AKfycbxFxh1cVk6r0t_JTA2TBfHBLJe_mOBQFsidwL1jwsUDcBtQYk3afu25SN-FR3vafJChHw/exec",Ht="cw_data_broadcast",ho="cw_data_tips",Wo=["Processando...","Mantenha o foco!","Aguarde..."];function wt(t,e={}){return new Promise((n,o)=>{let s="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script");window[s]=p=>{document.body.contains(i)&&document.body.removeChild(i),delete window[s],n(p)};let a=Object.keys(e).map(p=>encodeURIComponent(p)+"="+encodeURIComponent(e[p])).join("&"),r=`${Uo}?op=${t}&callback=${s}&t=${Date.now()}&${a}`;i.src=r,i.onerror=()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[s],o(new Error("JSONP Error (Check Corp Login)"))},document.body.appendChild(i)})}var Ae={fetchTips:async()=>{try{let t=await wt("tips");t?.tips&&localStorage.setItem(ho,JSON.stringify(t.tips))}catch(t){console.warn("Tips offline",t)}},fetchData:async()=>{try{let t=await wt("broadcast");if(t?.broadcast)return localStorage.setItem(Ht,JSON.stringify(t.broadcast)),t}catch(t){console.warn("Broadcast offline",t)}return{broadcast:JSON.parse(localStorage.getItem(Ht)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(Ht)||"[]"),getRandomTip:()=>{let t=Wo,e=localStorage.getItem(ho);if(e)try{t=JSON.parse(e)}catch{}return t[Math.floor(Math.random()*t.length)]},sendBroadcast:async t=>{let e={...t,date:new Date().toISOString(),id:Date.now().toString()};return await Ae._performOp("new_broadcast",e)},updateBroadcast:async(t,e)=>{let n={id:t,...e};return await Ae._performOp("update_broadcast",n)},deleteBroadcast:async t=>await Ae._performOp("delete_broadcast",{id:t}),_performOp:async(t,e)=>{try{console.log(`\u{1F4E4} Executando ${t}...`,e);let n=await wt(t,e);return n&&n.status==="success"?(console.log("\u2705 Sucesso:",t),!0):(console.warn("\u26A0\uFE0F Falha:",n),!1)}catch(n){return console.error("\u274C Erro JSONP:",n),!1}},logEvent:(t,e,n="",o=null)=>{try{let s="anon";try{let a=ft();a&&(s=a.split("@")[0].toLowerCase())}catch{}let i={timestamp:new Date().toISOString(),user:s,version:"v5.0",category:t,action:e,label:n,value:o||""};wt("log",i).catch(a=>{})}catch(s){console.warn("Analytics error",s)}},logUsage:()=>{}};var pe={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5"},At=t=>new Promise(e=>setTimeout(e,t));function xo(t){let e="cw-command-center-style";if(!document.getElementById(e)){let b=document.createElement("style");b.id=e,b.innerHTML=`
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

        /* FECHAR: Delay de 0.3s. A p\xEDlula espera os \xEDcones sumirem (0.2s) + pausa (0.1s) */
        transition: 
            width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s,
            height 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s,
            padding 0.5s ease 0.3s,
            gap 0.5s ease 0.3s,
            border-radius 0.5s ease 0.3s,
            opacity 0.3s ease 0s,
            transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) 0.3s !important;
    }
    
    /* --- LOGO DA BOLINHA (FIX DA ABERTURA) --- */
    .cw-main-logo {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        display: flex; align-items: center; justify-content: center;
        pointer-events: none; 
        
        /* Estado "Invis\xEDvel" (Quando Aberto) */
        opacity: 0;
        transform: rotate(-180deg) scale(0.5);
        color: #fff;
        
        /* CORRE\xC7\xC3O CR\xCDTICA: Transi\xE7\xE3o ultra-r\xE1pida (0.05s) ao abrir */
        /* Isso impede que o logo fique vis\xEDvel enquanto os bot\xF5es entram */
        transition: opacity 0.05s linear 0s, transform 0.2s ease 0s;
    }
    
    .cw-main-logo svg { 
        fill: #fff; 
        width: 24px; height: 24px;
        transition: fill 0.3s;
    }
    
    /* Logo Entrando (Ao Fechar) */
    .cw-pill.collapsed .cw-main-logo { 
        opacity: 1; 
        transform: rotate(0) scale(1);
        /* Entra dramaticamente no final (Delay 0.7s) */
        transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s;
    }
    
    /* Hover Gradiente */
    .cw-pill.collapsed:hover .cw-main-logo {
        background-image: linear-gradient(135deg, #4285F4 0%, #EA4335 33%, #FBBC05 66%, #34A853 100%);
        -webkit-mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13 2L3 14h9l-1 8 10-12h-9l1-8z'/%3E%3C/svg%3E") center/24px no-repeat;
        mask: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13 2L3 14h9l-1 8 10-12h-9l1-8z'/%3E%3C/svg%3E") center/24px no-repeat;
        transform: scale(1.15) rotate(0deg);
        transition-delay: 0s;
    }
    .cw-pill.collapsed:hover .cw-main-logo svg { fill: transparent; }

    /* --- CONTE\xDADO INTERNO (BOT\xD5ES) --- */
    .cw-pill > *:not(.cw-main-logo) {
        opacity: 1;
        transform: scale(1);
        visibility: visible;
        
        /* ABRIR: Slide-in com delay (0.3s) */
        transition: 
            opacity 0.4s ease 0.3s, 
            transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s,
            visibility 0s linear 0.3s;
    }

    /* --- SA\xCDDA DOS \xCDCONES (PUFF-OUT) --- */
    .cw-pill.collapsed > *:not(.cw-main-logo) {
        opacity: 0; 
        pointer-events: none; 
        visibility: hidden;
        
        /* Puff-Out */
        transform: scale(1.3); 
        filter: blur(5px);
        
        /* SAIR: R\xE1pido (0.2s) e Imediato (Delay 0s) */
        /* Visibility ganha delay igual \xE0 dura\xE7\xE3o para n\xE3o sumir antes da opacidade */
        transition: 
            opacity 0.2s ease 0s, 
            transform 0.2s ease 0s,
            filter 0.2s ease 0s,
            visibility 0s linear 0.2s; 
    }

    /* --- CASCATA DE SA\xCDDA (Opcional: Deixei quase simult\xE2neo para ser r\xE1pido) --- */
    .cw-pill.collapsed > *:nth-last-child(n) { transition-delay: 0s; }

    /* --- CASCATA DE ENTRADA (CIMA PARA BAIXO) --- */
    .cw-pill:not(.collapsed) > *:nth-child(1) { transition-delay: 0.30s; }
    .cw-pill:not(.collapsed) > *:nth-child(2) { transition-delay: 0.34s; }
    .cw-pill:not(.collapsed) > *:nth-child(3) { transition-delay: 0.38s; }
    .cw-pill:not(.collapsed) > *:nth-child(4) { transition-delay: 0.42s; }
    .cw-pill:not(.collapsed) > *:nth-child(5) { transition-delay: 0.46s; }
    .cw-pill:not(.collapsed) > *:nth-child(6) { transition-delay: 0.50s; }
    .cw-pill:not(.collapsed) > *:nth-child(7) { transition-delay: 0.54s; }
    .cw-pill:not(.collapsed) > *:nth-child(8) { transition-delay: 0.58s; }
    .cw-pill:not(.collapsed) > *:nth-child(9) { transition-delay: 0.62s; }

    /* --- ESTILOS VISUAIS (Mantidos) --- */
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

    /* LED e Tooltips (Hidden fix) */
    .cw-btn::before {
        content: ''; position: absolute; bottom: 2px; left: 50%; width: 4px; height: 4px; border-radius: 50%;
        background-color: currentColor; box-shadow: 0 0 6px currentColor;
        transform: translateX(-50%) scale(0);
        opacity: 0; visibility: hidden;
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

    /* Processing */
    .cw-pill.processing-center { top: 50% !important; left: 50% !important; transform: translate(-50%, -50%) !important; width: 320px !important; height: 110px !important; border-radius: 28px !important; background: #202124 !important; padding: 0 !important; box-shadow: 0 40px 80px rgba(0,0,0,0.5) !important; display: flex !important; flex-direction: column !important; justify-content: center !important; }
    .cw-pill.processing-center.collapsed { background: #202124 !important; overflow: visible !important; }
    .cw-pill.processing-center .cw-main-logo { display: none !important; }
    .cw-pill.processing-center > *:not(.cw-center-stage) { display: none !important; }
    .cw-center-stage { display: flex; flex-direction: column; align-items: center; gap: 14px; width: 100%; opacity: 0; animation: fadeIn 0.4s ease forwards 0.1s; position: relative; }
    .cw-center-dots { display: flex; gap: 8px; }
    .cw-center-dots span { width: 8px; height: 8px; border-radius: 50%; animation: googleBounce 1.4s infinite ease-in-out both; }
    .cw-center-dots span:nth-child(1) { background-color: ${pe.blue}; animation-delay: -0.32s; }
    .cw-center-dots span:nth-child(2) { background-color: ${pe.red}; animation-delay: -0.16s; }
    .cw-center-dots span:nth-child(3) { background-color: ${pe.green}; }
    .cw-center-text { font-size: 13px; color: #E8EAED; text-align: center; max-width: 90%; font-weight: 500; line-height: 1.4; opacity: 0; transform: translateY(10px); animation: textSlideUp 0.5s forwards 0.2s; }
    .cw-center-success { display: none; color: ${pe.green}; }
    .cw-center-success.show { display: block; animation: popIn 0.4s; }
    .cw-abort-btn { position: absolute; bottom: -32px; font-size: 10px; color: rgba(255, 255, 255, 0.2); cursor: pointer; text-transform: uppercase; font-weight: 600; transition: all 0.3s; }
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
    `;let s=document.createElement("div");s.className="cw-focus-backdrop",document.body.appendChild(s),document.body.appendChild(o);let i=(b,C)=>{let k=o.querySelector(`.${b}`);o.querySelectorAll(".cw-btn").forEach(z=>{z!==k&&z.classList.remove("active")}),k.classList.toggle("active"),C()};if(o.querySelector(".notes").onclick=b=>{b.stopPropagation(),i("notes",t.toggleNotes)},o.querySelector(".email").onclick=b=>{b.stopPropagation(),i("email",t.toggleEmail)},o.querySelector(".script").onclick=b=>{b.stopPropagation(),i("script",t.toggleScript)},o.querySelector(".links").onclick=b=>{b.stopPropagation(),i("links",t.toggleLinks)},o.querySelector(".timezone").onclick=b=>{b.stopPropagation(),i("timezone",t.toggleTimezone)},o.querySelector(".broadcast").onclick=b=>{b.stopPropagation(),i("broadcast",()=>{let C=b.currentTarget.querySelector(".cw-badge");C&&C.remove(),t.broadcastControl&&t.broadcastControl.toggle()})},t.broadcastControl&&t.broadcastControl.hasUnread){let b=document.createElement("div");b.className="cw-badge",o.querySelector(".broadcast").appendChild(b)}let a=null;o.onmouseleave=()=>{o.querySelector(".cw-btn.active")||o.classList.contains("processing-center")||(a=setTimeout(()=>{o.classList.add("collapsed")},3e3))},o.onmouseenter=()=>{a&&clearTimeout(a)},(async function(){await At(2800),o.classList.add("docked"),await At(300);let C=o.querySelectorAll(".cw-btn");o.querySelectorAll(".cw-sep").forEach(k=>k.classList.add("visible"));for(let k=0;k<C.length;k++)C[k].classList.add("popped"),await At(90);await At(200),o.classList.add("system-check")})();let r=!1,p,m,u,d,f=3;o.onmousedown=b=>{if(b.target.closest("button"))return;b.preventDefault(),p=b.clientX,m=b.clientY;let C=o.getBoundingClientRect();u=C.left,d=C.top,document.addEventListener("mousemove",x),document.addEventListener("mouseup",h)};function x(b){let C=b.clientX-p,k=b.clientY-m;!r&&Math.sqrt(C*C+k*k)>f&&(r=!0,o.style.transition="none",a&&clearTimeout(a)),r&&(o.style.left=`${u+C}px`,o.style.top=`${d+k}px`,o.style.right="auto",o.style.bottom="auto",o.style.transform="none")}function h(b){if(document.removeEventListener("mousemove",x),document.removeEventListener("mouseup",h),r){r=!1;let C=window.innerWidth,k=window.innerHeight,z=o.getBoundingClientRect(),G=z.left+z.width/2,j;G<C/2?(j=24,o.classList.remove("side-right"),o.classList.add("side-left")):(j=C-z.width-24,o.classList.remove("side-left"),o.classList.add("side-right"));let y=Math.max(24,Math.min(z.top,k-z.height-24));setTimeout(()=>{o.style.setProperty("transition","left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)","important"),o.style.left=`${j}px`,o.style.top=`${y}px`,o.style.bottom="auto",o.style.transform=""},10),setTimeout(()=>{o.style.transition="",o.style.removeProperty("transition")},700)}else{let C=o.querySelector(".cw-btn.active"),k=b.target.closest("button");if(o.classList.contains("collapsed")){let z=o.getBoundingClientRect(),G=window.innerHeight,j=z.top>G/2;if(o.style.setProperty("transition","none","important"),j){let y=G-z.bottom;o.style.top="auto",o.style.bottom=`${y}px`}else o.style.bottom="auto",o.style.top=`${z.top}px`;o.offsetWidth,o.style.removeProperty("transition"),o.classList.remove("collapsed")}else!C&&!k&&o.classList.add("collapsed");k&&(k.style.transform="scale(0.9)",setTimeout(()=>k.style.transform="",150))}}}function Ct(){let t=document.querySelector(".cw-pill"),e=document.querySelector(".cw-focus-backdrop");if(!t)return()=>{};t.classList.remove("collapsed"),window._CW_ABORT_PROCESS=!1;let n=document.createElement("div");n.className="cw-center-stage",n.innerHTML=`
        <div class="cw-center-dots"><span></span><span></span><span></span></div>
        <div class="cw-center-text">${Ae.getRandomTip()}</div>
        <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
    `;let o=document.createElement("div");o.className="cw-abort-btn",o.textContent="Cancelar",o.onclick=i=>{i.stopPropagation(),window._CW_ABORT_PROCESS=!0,W("Cancelado!",{duration:3e3}),n.remove(),t.classList.remove("processing-center"),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},n.appendChild(o),t.appendChild(n);let s=Date.now();return t.classList.add("processing-center"),e&&e.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!t.contains(n))return;let a=Date.now()-s,r=Math.max(0,2e3-a);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!t.contains(n))return;let p=n.querySelector(".cw-center-dots"),m=n.querySelector(".cw-center-text"),u=n.querySelector(".cw-center-success"),d=n.querySelector(".cw-abort-btn");p&&(p.style.display="none"),m&&(m.style.display="none"),d&&(d.style.display="none"),u&&u.classList.add("show"),t.classList.add("success"),setTimeout(()=>{t.classList.remove("processing-center"),setTimeout(()=>{n.remove(),t.classList.remove("success"),t.classList.add("collapsed"),e&&e.classList.remove("active")},400)},1e3)},r)}}function yo(t){let e=document.createElement("div");e.className="cw-step-scenarios";let n=document.createElement("div");Object.assign(n.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let o=document.createElement("div");Object.assign(o.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"40px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s ease"}),o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>";let s=null;Object.entries(qe).forEach(([a,r])=>{let p=document.createElement("div");p.textContent=a,Object.assign(p.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",display:"flex",alignItems:"center",gap:"6px"}),p.onmouseenter=()=>{s!==r&&(o.style.background="#fff",o.style.borderColor="#1a73e8",o.style.color="#202124",o.textContent=`"${r.substring(0,120)}${r.length>120?"...":""}"`),s!==r&&(p.style.background="#f1f3f4")},p.onmouseleave=()=>{s!==r&&(s||(o.style.background="#f8f9fa",o.style.borderColor="#dadce0",o.style.color="#5f6368",o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>"),p.style.background="#ffffff")},p.onclick=()=>{X.playClick(),s===r?(s=null,i(),t("")):(s=r,i(),p.style.transform="scale(0.95)",setTimeout(()=>p.style.transform="scale(1)",150),t(r))},n.appendChild(p)});function i(){Array.from(n.children).forEach(a=>{qe[a.textContent]===s?(a.style.background="#e8f0fe",a.style.borderColor="#1a73e8",a.style.color="#1967d2",a.style.fontWeight="500"):(a.style.background="#ffffff",a.style.borderColor="#dadce0",a.style.color="#3c4043",a.style.fontWeight="400")})}return e.appendChild(n),e.appendChild(o),e}var vo=t=>new Promise(e=>setTimeout(e,t));function St(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>t.dispatchEvent(new MouseEvent(n,e)))}function dt(t){let e=document.createElement("div");e.style.position="fixed",e.style.left="-9999px",e.innerHTML=t,document.body.appendChild(e);let n=document.createRange();n.selectNodeContents(e);let o=window.getSelection();o.removeAllRanges(),o.addRange(n);try{document.execCommand("copy")}catch{W("Falha ao copiar",{error:!0})}o.removeAllRanges(),document.body.removeChild(e)}function Et(t){["input","change","keydown","keyup"].forEach(n=>{let o=new Event(n,{bubbles:!0,cancelable:!0});t.dispatchEvent(o)})}function wo(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function Tt(){console.log("Iniciando processo de Nova Nota...");let t=wo(),e=t.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(a=>a.innerText.trim()==="description");if(o){let a=o.closest("material-fab")||o.closest("material-button");a?(a.style&&(a.style.display="block",a.style.visibility="visible"),St(a)):St(o)}else{let a=document.querySelector("material-fab-speed-dial");if(a){let r=a.querySelector(".trigger");r?(r.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),St(r)):a.click(),await vo(800);let m=Array.from(document.querySelectorAll("i.material-icons-extended")).find(u=>u.innerText.trim()==="description");m&&St(m)}}let s=null,i=0;for(;!s&&i<20;){await vo(300);let a=wo();if(a.length>e)s=a.find(r=>!t.includes(r)),s||(s=a[a.length-1]);else if(i>10){let r=a.filter(p=>p.offsetParent!==null);r.length>0&&(s=r[r.length-1])}i++}return s}var ae={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},Le="cubic-bezier(0.25, 0.8, 0.25, 1)",Yo={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${ae.border}`,backgroundColor:ae.bgInput,fontSize:"14px",color:ae.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${Le}, box-shadow 0.2s ${Le}, background-color 0.2s`,outline:"none"},Ln={...Yo,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},Mn={fontSize:"13px",fontWeight:"700",color:ae.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},_n={display:"block",fontSize:"13px",fontWeight:"600",color:ae.text,marginBottom:"8px",marginTop:"16px"},Nn={fontSize:"12px",color:ae.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},Rn={fontSize:"12px",color:ae.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},Dn={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:ae.text,cursor:"pointer",padding:"12px 14px",backgroundColor:ae.surface,border:`1px solid ${ae.border}`,borderRadius:"12px",transition:`all 0.2s ${Le}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},$t={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:ae.primary},zn={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:ae.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${Le}, box-shadow 0.2s ${Le}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},Gn={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${ae.primary}`,color:ae.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${Le}`},Bn={background:"transparent",border:`1px solid ${ae.border}`,borderRadius:"20px",color:ae.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${Le}`,fontFamily:"'Google Sans', 'Roboto'"};var Pn={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:ae.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},jn={fontSize:"13px",fontWeight:"700",color:ae.primary,minWidth:"20px",textAlign:"center"},Hn={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${ae.border}`,backgroundColor:ae.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${Le}, box-shadow 0.2s ${Le}`},$n={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${ae.bgInput}`},Vn={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${ae.border}`,backgroundColor:ae.surface,color:ae.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${Le}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},Un={backgroundColor:ae.primaryBg,color:ae.primary,borderColor:ae.primary,fontWeight:"600"},Wn={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:ae.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},Yn={borderTop:`1px solid ${ae.bgInput}`,paddingTop:"20px",marginTop:"16px"};var Xn={maxHeight:"240px",overflowY:"auto",border:`1px solid ${ae.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:ae.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},Kn={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${ae.bgInput}`,cursor:"pointer",fontSize:"13px",color:ae.text,transition:"background 0.1s",userSelect:"none"};var Xo={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},Ko={fontSize:"12px",color:"#e37400",marginTop:"4px"},Qo={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},Zo={display:"flex",gap:"15px",marginBottom:"10px"};function Ao(){let t=document.createElement("div");t.id="tag-support-container",Object.assign(t.style,Xo);let e=document.createElement("label");e.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(e.style,zt,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,Zo);let o=document.createElement("input");o.type="radio",o.name="ts_usage_mod",o.value="Sim",Object.assign(o.style,$t);let s=document.createElement("label");s.textContent="Sim";let i=document.createElement("div");Object.assign(i.style,{display:"flex",alignItems:"center"}),i.appendChild(o),i.appendChild(s);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="N\xE3o",a.checked=!0,Object.assign(a.style,$t);let r=document.createElement("label");r.textContent="N\xE3o";let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center"}),p.appendChild(a),p.appendChild(r),n.appendChild(i),n.appendChild(p);let m=document.createElement("div");m.style.display="block";let u=document.createElement("label");u.textContent="Qual foi o Motivo?",Object.assign(u.style,zt,{fontSize:"12px"});let d=document.createElement("input");d.type="text",Object.assign(d.style,Qo);let f=document.createElement("div");f.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(f.style,Ko),m.appendChild(u),m.appendChild(d),m.appendChild(f),t.appendChild(e),t.appendChild(n),t.appendChild(m),o.onchange=()=>{m.style.display="none"},a.onchange=()=>{m.style.display="block"};function x(C,k){if(t.style.display="none",!C||C.includes("Education")||!k||k.length===0)return;let z=k.some(A=>A.includes("enhanced")||A==="ec_google_ads"),G=k.some(A=>(A.includes("conversion")||A.includes("ads"))&&!A.includes("enhanced")),j=k.some(A=>A.includes("ga4")||A.includes("analytics")||A.includes("ua")),y=k.some(A=>A.includes("merchant")||A.includes("gmc")||A.includes("shopping"));(z||G&&!j&&!y)&&(t.style.display="block")}function h(){if(t.style.display==="none")return"";let C=`<br><b>Utilizou Tag Support?</b> ${o.checked?"Sim":"N\xE3o"}`;return a.checked&&d.value.trim()!==""&&(C+=`<br><b>Motivo:</b> ${d.value}`),C+="<br>",C}function b(){t.style.display="none",a.checked=!0,o.checked=!1,m.style.display="block",d.value=""}return{element:t,updateVisibility:x,getOutput:h,reset:b}}var Q={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Ke={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function Co(t){let e={},n="implementation";function o(y){let v=y.toLowerCase();return v.includes("ads")||v.includes("conversion")||v.includes("remarketing")?Q.brands.ads:v.includes("ga4")||v.includes("analytics")?Q.brands.ga4:v.includes("gtm")||v.includes("tag manager")||v.includes("container")?Q.brands.gtm:v.includes("merchant")||v.includes("shopping")||v.includes("feed")?Q.brands.gmc:Q.brands.default}let s=Object.entries(Ge).filter(([y,v])=>v.popular),i={};Object.entries(Ge).forEach(([y,v])=>{if(v.popular)return;let A=o(v.name);i[A.label]||(i[A.label]={brand:A,tasks:[]}),i[A.label].tasks.push({key:y,...v})});let a="cw-zen-tasks";if(!document.getElementById(a)){let y=document.createElement("style");y.id=a,y.innerHTML=`
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
        `,document.head.appendChild(y)}let r=document.createElement("div");r.className="cw-zen-container";let p=document.createElement("div");Object.assign(p.style,{display:"none"});let m=document.createElement("div");m.className="cw-screens-container",p.appendChild(m),r.innerHTML=`
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
    `;let u=r.querySelector(".cw-hero-grid"),d=r.querySelector(".cw-acc-container"),f=r.querySelector(".cw-results-container"),x=r.querySelector(".cw-search-input"),h=r.querySelector(".cw-status-bar"),b=r.querySelector(".cw-status-text"),C=r.querySelector(".cw-footer-icons");s.forEach(([y,v])=>{let A=o(v.name),F=document.createElement("div");F.className="cw-hero-card",F.id=`hero-${y}`,F.style.setProperty("--hero-color",A.color),F.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${Ke[A.icon]}</div>
                <div class="cw-hero-label">${v.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,F.onclick=q=>{if(q.target.closest(".cw-step-btn"))return;let w=e[y]?e[y].count:0;z(y,w>0?-w:1,v)},F.querySelector(".minus").onclick=()=>z(y,-1,v),F.querySelector(".plus").onclick=()=>z(y,1,v),F.dataset.color=A.color,u.appendChild(F)});function k(y,v){let A=o(v.name),F=document.createElement("div");return F.className="cw-task-item",F.dataset.id=y,F.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${A.bg}; color:${A.color}">
                    ${Ke[A.icon]||Ke.default}
                </div>
                <div class="cw-task-label">${v.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,F.onclick=q=>{if(q.target.closest(".cw-step-btn"))return;let w=e[y]?e[y].count:0;z(y,w>0?-w:1,v)},F.querySelector(".minus").onclick=()=>z(y,-1,v),F.querySelector(".plus").onclick=()=>z(y,1,v),F}Object.entries(i).forEach(([y,v])=>{let A=document.createElement("div");A.className="cw-acc-group";let F=document.createElement("div");F.className="cw-acc-header",F.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${v.brand.color}"></div>
                ${y}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,F.onclick=()=>{d.querySelectorAll(".cw-acc-group.open").forEach(w=>{w!==A&&w.classList.remove("open")}),A.classList.toggle("open")};let q=document.createElement("div");q.className="cw-acc-body",v.tasks.forEach(w=>{let O=k(w.key,w);q.appendChild(O)}),A.appendChild(F),A.appendChild(q),d.appendChild(A)});function z(y,v,A){e[y]||(e[y]={count:0,data:A,brand:o(A.name)}),e[y].count+=v,e[y].count<=0&&delete e[y],G(),j(),t&&t()}function G(){s.forEach(([q])=>{let w=u.querySelector(`#hero-${q}`);if(!w)return;let O=e[q];O?(w.classList.add("active"),w.querySelector(".cw-step-val").textContent=O.count,w.querySelector(".cw-step-val").style.color=w.dataset.color):w.classList.remove("active")}),r.querySelectorAll(".cw-task-item").forEach(q=>{let w=q.dataset.id,O=e[w];O?(q.classList.add("selected"),q.querySelector(".cw-step-val").textContent=O.count):q.classList.remove("selected")});let v=Object.keys(e),A=0,F=[];if(v.forEach(q=>{let w=e[q];A+=w.count;for(let O=0;O<w.count;O++)F.length<6&&F.push(w.brand)}),A>0){h.classList.add("visible");let q=A>1?"A\xE7\xF5es":"A\xE7\xE3o",w=A>1?"definidas":"definida";b.textContent=`${A} ${q} ${w}`,C.innerHTML="",F.forEach(O=>{let S=document.createElement("div");S.className="cw-mini-icon",S.innerHTML=Ke[O.icon]||Ke.default;let L=S.querySelector("svg");L&&(L.style.width="14px",L.style.height="14px"),C.appendChild(S)})}else h.classList.remove("visible")}x.addEventListener("input",y=>{let v=y.target.value.toLowerCase();if(v.length>0){d.style.display="none",f.style.display="block",f.innerHTML="";let A=!1;Object.entries(Ge).forEach(([F,q])=>{if(q.name.toLowerCase().includes(v)){A=!0;let w=k(F,q);e[F]&&(w.classList.add("selected"),w.querySelector(".cw-step-val").textContent=e[F].count),f.appendChild(w)}}),A||(f.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else d.style.display="block",f.style.display="none"});function j(){m.innerHTML="";let y=Object.keys(e),v=!1,A=document.getElementById("sub-status"),F="implementation";if(A&&A.value.toLowerCase().includes("education")&&(F="education"),y.length===0){m.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}if(y.length===0){m.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}let q=document.createElement("div");q.className="cw-info-banner",q.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Todos os Screenshots s\xE3o baseados na descri\xE7\xE3o do 
                <a href="https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/" target="_blank" class="cw-info-link">Win Criteria</a>.
            </span>
        `,m.appendChild(q),y.forEach(w=>{let O=e[w].data,S=e[w].count,L=e[w].brand,R=O.screenshots?O.screenshots[F]||[]:["Link da Evid\xEAncia"];if(R.length>0){v=!0;for(let l=1;l<=S;l++){let c=document.createElement("div");c.className="cw-screen-card",c.style.setProperty("--brand-color",L.color),c.style.setProperty("--brand-bg",L.bg),c.style.setProperty("--brand-shadow",L.color+"40");let T=document.createElement("div");T.className="cw-card-header";let g=document.createElement("div");g.className="cw-card-icon",g.innerHTML=Ke[L.icon]||Ke.default;let B=document.createElement("div");B.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let N=document.createElement("input");N.className="cw-card-title-input",N.id=`name-${w}-${l}`,N.value=`${O.name}${S>1?" #"+l:""}`,N.title="Clique para renomear esta task";let $=document.createElement("span");$.className="cw-edit-hint",$.innerHTML="\u270E Renomear",B.appendChild(N),B.appendChild($),T.appendChild(g),T.appendChild(B),c.appendChild(T),R.forEach((_,M)=>{let H=document.createElement("div");H.className="cw-input-group";let V=document.createElement("label");V.className="cw-input-label",V.textContent=_.replace(/📷|:|•/g,"").trim();let I=document.createElement("input");I.className="cw-input-field",I.id=`screen-${w}-${l}-${M}`,I.placeholder="Cole o link aqui...",I.setAttribute("autocomplete","off"),I.addEventListener("input",()=>{I.value.trim().length>5?I.classList.add("filled"):I.classList.remove("filled")});let P=document.createElement("div");P.className="cw-input-check",P.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',H.appendChild(V),H.appendChild(I),H.appendChild(P),c.appendChild(H)}),m.appendChild(c)}}}),p.style.display=v?"block":"none"}return{selectionElement:r,screenshotsElement:p,updateSubStatus:()=>j(),getCheckedElements:()=>Object.keys(e).map(y=>({value:y,closest:()=>({querySelector:()=>({textContent:e[y].count})})})),toggleTask:(y,v=!0)=>{let A=e[y];v&&!A?z(y,1,Ge[y]):!v&&A&&z(y,-A.count,Ge[y])},setMode:y=>{n=y,j()},reset:()=>{for(let y in e)delete e[y];x.value="",d.style.display="block",f.style.display="none",G(),j()}}}function So(t){let e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let n=document.createElement("div");n.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let o=document.createElement("div");o.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",e.appendChild(o),e.appendChild(n),n.addEventListener("scroll",()=>{o.style.boxShadow=n.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let s={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},i={};function a({id:G,label:j,type:y="text",placeholder:v="",required:A=!1,parent:F=n}){let q=document.createElement("div");q.style.cssText=s.inputWrapper;let w=document.createElement("label");w.style.cssText=s.label,w.innerHTML=`${j} ${A?'<span style="color:#D93025">*</span>':""}`;let O;return y==="textarea"?(O=document.createElement("textarea"),O.style.cssText=s.input+s.textarea):(O=document.createElement("input"),O.type=y,O.style.cssText=s.input),O.id=G,O.placeholder=v,O.addEventListener("focus",()=>{O.style.borderColor="#1a73e8",O.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),O.addEventListener("blur",()=>{O.style.borderColor="#DADCE0",O.style.boxShadow="none",A&&O.value.trim()!==""&&(O.style.backgroundColor="#FFF")}),i[G]={input:O,wrapper:q,required:A},q.appendChild(w),q.appendChild(O),F.appendChild(q),q}function r({id:G,label:j,options:y=["Yes","No"],defaultValue:v="No",onChange:A=null}){let F=document.createElement("div");F.style.cssText=s.inputWrapper;let q=document.createElement("label");q.style.cssText=s.label,q.textContent=j,F.appendChild(q);let w=document.createElement("div");w.style.cssText=s.radioGroup;let O=document.createElement("input");return O.type="hidden",O.id=G,O.value=v,F.appendChild(O),y.forEach(S=>{let L=document.createElement("div");L.textContent=S,L.style.cssText=s.radioLabel,S===v&&(L.style.cssText+=s.radioActive),L.onclick=()=>{Array.from(w.children).forEach(l=>l.style.cssText=s.radioLabel),L.style.cssText+=s.radioActive,O.value=S,A&&A(S)},w.appendChild(L)}),i[G]={input:O,wrapper:F,required:!1},F.appendChild(w),n.appendChild(F),F}let p=document.createElement("div");p.style.cssText=s.banner,p.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,n.appendChild(p);let m=document.createElement("div");m.style.marginBottom="24px";let u=document.createElement("button");u.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",u.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",u.onmouseover=()=>u.style.background="#E1EFFF",u.onmouseout=()=>u.style.background="#F0F7FF",m.appendChild(u),n.appendChild(m);let d=document.createElement("div");d.style.cssText=s.section,d.innerHTML=`<div style="${s.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,n.appendChild(d),a({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:d}),a({id:"ga4",label:"GA4 Property ID",parent:d}),a({id:"gtm",label:"GTM Container ID",parent:d});let f=document.createElement("div");f.style.cssText=s.hiddenField,d.appendChild(f),r({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:G=>{G==="Yes"?f.style.cssText=s.visibleField+"margin-bottom:14px;":(f.style.cssText=s.hiddenField,i.accessEmail.input.value="")}}),a({id:"accessEmail",label:"User Access Email",parent:f}),r({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let x=document.createElement("div");x.style.cssText=s.section,x.innerHTML=`<div style="${s.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,n.appendChild(x),a({id:"name",label:"Advertiser Name",required:!0,parent:x}),a({id:"url",label:"Website URL",parent:x}),a({id:"phone",label:"Phone Number",parent:x}),a({id:"email",label:"Contact Email",parent:x}),a({id:"callback",label:"Preferred Callback Time (Timezone)",parent:x}),a({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:"Descreva o erro, passos para reproduzir...",required:!0,parent:x}),a({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:"O que voc\xEA j\xE1 testou?",parent:x}),a({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:x});let h=document.createElement("div");h.style.cssText=s.section,h.innerHTML=`<div style="${s.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,n.appendChild(h),a({id:"cc_adv",label:"Advertiser Contact",parent:h}),a({id:"cc_am",label:"Account Manager",parent:h});let b=document.createElement("div");b.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let C=document.createElement("button");C.innerHTML="Voltar",C.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",C.onclick=t;let k=document.createElement("button");k.textContent="Gerar Nota",k.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",b.appendChild(C),b.appendChild(k),e.appendChild(b),u.onclick=async()=>{let G=u.innerHTML;u.innerHTML="\u23F3 Buscando dados...";try{let j=await Ue(),y=0,v=(q,w)=>{let O=i[q];w&&O&&O.input.value===""&&(O.input.value=w,O.input.style.backgroundColor="#E6F4EA",O.input.style.borderColor="#34A853",setTimeout(()=>{O.input.style.backgroundColor="#FFF",O.input.style.borderColor="#DADCE0"},1e3),y++)};v("name",j.advertiserName),v("url",j.websiteUrl),j.clientEmail&&(v("email",j.clientEmail),v("cc_adv",j.clientEmail));let F=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);F&&v("cid",F[0]),y>0?W(`${y} campos preenchidos!`):W("Nenhum dado novo encontrado.")}catch(j){console.error(j),W("Erro ao ler p\xE1gina.")}finally{u.innerHTML=G}};let z=()=>{let G=!0,j=null;return Object.values(i).forEach(y=>{y.required&&!y.input.value.trim()&&(G=!1,y.input.style.cssText+=s.inputError,y.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),j||(j=y.input))}),j&&j.scrollIntoView({behavior:"smooth",block:"center"}),G};return k.onclick=async()=>{if(!z()){W("Preencha os campos obrigat\xF3rios.",{isError:!0});return}let G=q=>i[q].input.value||"N/A",j=G("hasAccess"),y=j==="Yes"?G("accessEmail"):"N/A",A=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${G("cid")}
<b>GA4 ID:</b> ${G("ga4")}
<b>GTM ID:</b> ${G("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${j==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${y}
<b>Ghosting Access Available (Y/N):</b> ${G("ghosting")==="Yes"?"Y":"N"}
<b>Name of advertiser:</b> ${G("name")}
<b>Website:</b> ${G("url")}
<b>Phone Number:</b> ${G("phone")}
<b>Preferred Callback:</b> ${G("callback")}
<b>Email Address:</b> ${G("email")}

<b>Detailed Issue Description:</b>
${G("desc")}

<b>Uncropped screenshots:</b>
${G("screens")}

<b>Checks performed by Technical Solutions Team:</b>
${G("checks")}

[IMP] Contacts to be copied
<b>Advertiser contact:</b> ${G("cc_adv")}
<b>Account Manager:</b> ${G("cc_am")}
`.replace(/\n/g,"<br>");dt(A);let F=await Tt();F?(F.innerText.trim()===""&&(F.innerHTML=""),document.execCommand("insertHTML",!1,A),Et(F),W("Nota gerada e inserida!")):W("Copiado! Abra uma nota para colar.")},e}function Eo(){let t="v3.8.0",e="bau",n="pt",o=!1,s=!1,i=!1,a={input:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},textarea:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease",height:"100px",resize:"vertical"},h3:{fontSize:"14px",fontWeight:"600",color:"#202124",margin:"0 0 12px 0"},label:{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},checkboxLabel:{display:"flex",alignItems:"center",marginBottom:"10px",fontSize:"14px",fontWeight:"400",cursor:"pointer",padding:"8px",background:"#f8f9fa",borderRadius:"6px",transition:"background-color 0.2s ease, box-shadow 0.2s ease",userSelect:"none"},checkboxInput:{width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"},buttonBase:{flex:"1 1 0",padding:"10px 0",color:"#fff",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"500",cursor:"pointer",marginTop:"16px"},stepBlock:{borderTop:"1px solid #eee",paddingTop:"12px",marginTop:"12px"},radioContainer:{display:"flex",gap:"15px",marginBottom:"10px"},optionalBtn:{width:"100%",padding:"10px",background:"white",border:"1px dashed #1a73e8",color:"#1a73e8",borderRadius:"6px",cursor:"pointer",fontWeight:"500",fontSize:"13px",marginBottom:"10px",transition:"all 0.2s"},helpLink:{fontSize:"12px",color:"#1a73e8",textDecoration:"none",cursor:"pointer",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"color 0.2s"}},r=Ao(),p=Co(()=>{let Y=p.getCheckedElements().map(D=>D.value);g&&g.value&&r.updateVisibility(g.value,Y)}),m=document.createElement("div");m.id="autofill-popup",m.classList.add("cw-module-window"),Object.assign(m.style,Ee,{right:"100px",width:"450px",transition:"width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)"});let u={popup:m,googleLine:null},d=Te(m,"Case Notes",t,"Gera notas padronizadas.",u,()=>_t());m.appendChild(d);let f=d.lastElementChild;if(f){let E=document.createElement("div");E.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',Object.assign(E.style,{width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease",marginLeft:"4px"}),E.title="Alternar para Split & Transfer",E.onmouseenter=()=>{E.style.background="rgba(255,255,255,0.1)",E.style.color="#FFF"},E.onmouseleave=()=>{i||(E.style.background="transparent",E.style.color="#9AA0A6")},E.onclick=Y=>{Y.stopPropagation(),C(E)},f.insertBefore(E,f.firstChild)}let x=document.createElement("div");Object.assign(x.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1"}),m.appendChild(x);let h=document.createElement("div");Object.assign(h.style,{flexGrow:"1",display:"none",overflow:"auto"});let b=So(()=>C());h.appendChild(b),m.appendChild(h);function C(E){i=!i,i?(x.style.display="none",h.style.display="flex",u.googleLine&&(u.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)"),E&&(E.style.color="#C58AF9",E.style.background="rgba(197, 138, 249, 0.15)")):(x.style.display="block",h.style.display="none",u.googleLine&&(u.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"),E&&(E.style.color="#9AA0A6",E.style.background="transparent"))}let k=document.createElement("div");k.textContent="created by lucaste@",Object.assign(k.style,ro),m.appendChild(k);let z=document.createElement("div");z.id="step-lang-type";let G=document.createElement("label");Object.assign(G.style,a.label),z.appendChild(G);let j=document.createElement("div");Object.assign(j.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let y=document.createElement("div");y.textContent="Portugu\xEAs",y.classList.add("no-drag"),Object.assign(y.style,ve);let v=document.createElement("div");v.textContent="Espa\xF1ol",v.classList.add("no-drag"),Object.assign(v.style,ve),y.onclick=()=>qt("pt"),v.onclick=()=>qt("es"),j.appendChild(y),j.appendChild(v),z.appendChild(j),x.appendChild(z);let A=document.createElement("div");A.id="step-0-case-type";let F=document.createElement("label");Object.assign(F.style,a.label),A.appendChild(F);let q=document.createElement("div");Object.assign(q.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let w=document.createElement("div");w.textContent="BAU",w.classList.add("no-drag"),Object.assign(w.style,ve);let O=document.createElement("div");O.textContent="LM",O.classList.add("no-drag"),Object.assign(O.style,ve),w.onclick=()=>It("bau"),O.onclick=()=>It("lm"),q.appendChild(w),q.appendChild(O),A.appendChild(q),x.appendChild(A);let S=document.createElement("div");S.id="step-1-selection";let L=document.createElement("label");L.className="cw-input-label",L.textContent="Status Principal";let R=document.createElement("select");R.id="main-status",R.className="cw-select",R.innerHTML=`
      <option value="" disabled selected hidden>Selecione uma op\xE7\xE3o...</option>
      <option value="NI">NI - Need Info</option>
      <option value="SO">SO - Solution Offered</option>
      <option value="IN">IN - Inactive</option>
      <option value="AS">AS - Assigned</option>
      <option value="DC">DC - Discard</option>
  `;let l=document.createElement("div");l.style.cssText="display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; margin-bottom: 6px;";let c=document.createElement("label");c.className="cw-input-label",c.textContent="Sub-status",c.style.marginBottom="0";let T=document.createElement("a");T.href="https://seu-link-do-guia-aqui.com",T.target="_blank",T.className="cw-info-link",T.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; transform:translateY(1px)"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Guia de Substatus',Object.assign(T.style,a.helpLink),l.appendChild(c),l.appendChild(T);let g=document.createElement("select");g.id="sub-status",g.className="cw-select",g.disabled=!0,g.innerHTML='<option value="" disabled selected hidden>Aguardando status principal...</option>',S.appendChild(L),S.appendChild(R),S.appendChild(l),S.appendChild(g),x.appendChild(S);let B=document.createElement("div");B.id="step-1-1-portugal",Object.assign(B.style,a.stepBlock,{display:"none"});let N=document.createElement("label");Object.assign(N.style,a.label),B.appendChild(N);let $=document.createElement("div");Object.assign($.style,a.radioContainer);let _=document.createElement("div");Object.assign(_.style,{display:"flex",alignItems:"center"});let M=document.createElement("input");M.type="radio",M.name="portugal-group",M.value="sim",Object.assign(M.style,a.checkboxInput);let H=document.createElement("label");H.htmlFor="portugal-sim",Object.assign(H.style,{cursor:"pointer"}),_.appendChild(M),_.appendChild(H);let V=document.createElement("div");Object.assign(V.style,{display:"flex",alignItems:"center"});let I=document.createElement("input");I.type="radio",I.name="portugal-group",I.value="nao",I.checked=!0,Object.assign(I.style,a.checkboxInput);let P=document.createElement("label");P.htmlFor="portugal-nao",Object.assign(P.style,{cursor:"pointer"}),V.appendChild(I),V.appendChild(P),$.appendChild(_),$.appendChild(V),B.appendChild($),x.appendChild(B);function te(E){o=E,E?ue.style.display="block":ue.style.display="none"}M.onchange=()=>te(!0),I.onchange=()=>te(!1);let ue=document.createElement("div");ue.id="step-1-2-consent",Object.assign(ue.style,a.stepBlock,{display:"none"});let he=document.createElement("label");Object.assign(he.style,a.label),ue.appendChild(he);let le=document.createElement("div");Object.assign(le.style,a.radioContainer);let Z=document.createElement("div");Object.assign(Z.style,{display:"flex",alignItems:"center"});let oe=document.createElement("input");oe.type="radio",oe.name="consent-group",oe.value="Sim",oe.checked=!0,Object.assign(oe.style,a.checkboxInput);let Ce=document.createElement("label");Ce.htmlFor="consent-sim",Object.assign(Ce.style,{cursor:"pointer"}),Z.appendChild(oe),Z.appendChild(Ce);let Re=document.createElement("div");Object.assign(Re.style,{display:"flex",alignItems:"center"});let De=document.createElement("input");De.type="radio",De.name="consent-group",De.value="N\xE3o",Object.assign(De.style,a.checkboxInput);let ut=document.createElement("label");ut.htmlFor="consent-nao",Object.assign(ut.style,{cursor:"pointer"}),Re.appendChild(De),Re.appendChild(ut),le.appendChild(Z),le.appendChild(Re),ue.appendChild(le),x.appendChild(ue);let Pe=document.createElement("div");Pe.id="step-1-5-snippets",Object.assign(Pe.style,a.stepBlock,{display:"none"});let mt=document.createElement("h3");Object.assign(mt.style,a.h3),mt.textContent="Cen\xE1rios Comuns";let Ie=yo(E=>{let Y=document.querySelector("textarea");Y&&(Y.value=E,Y.dispatchEvent(new Event("input")),Y.style.transition="background-color 0.2s",Y.style.backgroundColor="#e8f0fe",setTimeout(()=>Y.style.backgroundColor="#fff",300))});Ie.id="snippet-container",Pe.appendChild(mt),Pe.appendChild(Ie),x.appendChild(Pe);let Se=document.createElement("div");Se.id="step-3-form",Object.assign(Se.style,a.stepBlock,{display:"none"});let Ot=document.createElement("h3");Object.assign(Ot.style,a.h3),Se.appendChild(Ot);let ze=document.createElement("div");ze.id="dynamic-form-fields-container",Se.appendChild(ze);let xe=document.createElement("button");xe.textContent="+ Gostaria de selecionar uma task?",Object.assign(xe.style,a.optionalBtn),xe.onmouseover=()=>xe.style.background="#e8f0fe",xe.onmouseout=()=>xe.style.background="white",xe.onclick=()=>{xe.style.display="none",je.style.display="block",p.selectionElement.style.display="block"};let je=document.createElement("h3");Object.assign(je.style,a.h3,{marginTop:"20px"});let Yt=p.selectionElement;Object.assign(Yt.style,{marginBottom:"20px"}),Se.appendChild(xe),Se.appendChild(je),Se.appendChild(Yt),Se.appendChild(r.element),Se.appendChild(p.screenshotsElement),x.appendChild(Se);let He=document.createElement("div");He.id="step-4-email",Object.assign(He.style,{display:"none",marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #eee"});let $e=document.createElement("label");$e.style.display="flex",$e.style.alignItems="center",$e.style.cursor="pointer",$e.style.fontSize="14px";let Ve=document.createElement("input");Ve.type="checkbox",Ve.checked=!0,Object.assign(Ve.style,a.checkboxInput),$e.appendChild(Ve),$e.appendChild(document.createTextNode("Preencher email automaticamente?")),He.appendChild($e),x.appendChild(He);let Je=document.createElement("div");Object.assign(Je.style,{display:"none",gap:"8px",padding:"0"}),x.appendChild(Je);let nt=document.createElement("button");Object.assign(nt.style,a.buttonBase,{backgroundColor:"#5f6368"}),nt.textContent="Copiar";let at=document.createElement("button");Object.assign(at.style,a.buttonBase,{backgroundColor:"#1a73e8"}),at.textContent="Preencher",Je.appendChild(nt),Je.appendChild(at);let it=document.createElement("div");Object.assign(it.style,et),it.className="no-drag",it.title="Redimensionar",m.appendChild(it),tt(m,it),document.body.appendChild(m);function It(E){e=E;let Y=st();Object.assign(w.style,ve),Object.assign(O.style,ve),E==="bau"?(Object.assign(w.style,Y),T.href="https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657"):(Object.assign(O.style,Y),T.href="https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243"),g.value&&g.dispatchEvent(new Event("change"))}function ne(E){try{if(Ne&&Ne[n]&&Ne[n][E])return Ne[n][E];if(Ne&&Ne.pt&&Ne.pt[E])return Ne.pt[E]}catch{}return E}function Do(){G.textContent=ne("idioma"),F.textContent=ne("fluxo"),L.textContent=ne("status_principal"),c.textContent=ne("substatus"),mt.textContent=ne("cenarios_comuns"),je.textContent=ne("selecione_tasks"),Ot.textContent=ne("preencha_detalhes"),nt.textContent=ne("copiar"),at.textContent=ne("preencher"),R.querySelector('option[value=""]')&&(R.querySelector('option[value=""]').textContent=ne("select_status")),g.querySelector('option[value=""]')&&(g.querySelector('option[value=""]').textContent=ne("select_substatus")),N.textContent=ne("caso_portugal"),H.textContent=ne("sim"),P.textContent=ne("nao"),he.textContent=ne("consentiu_gravacao"),Ce.textContent=ne("sim"),ut.textContent=ne("nao"),ze.querySelectorAll("label").forEach(E=>{let Y=E.nextElementSibling.id.replace("field-",""),D=ne(Y.toLowerCase());D!==Y.toLowerCase()?E.textContent=D:E.textContent=Y.replace(/_/g," ").replace(/\b\w/g,J=>J.toUpperCase())+":"}),xe.textContent="+ "+(n==="pt"?"Gostaria de selecionar uma task?":"Quisiera seleccionar una tarea?")}function qt(E){n=E;let Y=st();Object.assign(y.style,ve),Object.assign(v.style,ve),E==="pt"?(Object.assign(y.style,Y),B.style.display="block",te(o)):(Object.assign(v.style,Y),B.style.display="none",ue.style.display="none"),Do(),g.value&&g.dispatchEvent(new Event("change"))}function Ft(E){(E.value.trim()===""||E.value.trim()==="\u2022")&&(E.value="\u2022 "),E.onkeydown=function(Y){if(Y.key==="Enter"){Y.preventDefault();let D=this.selectionStart,J=this.selectionEnd,ce=this.value,ge=ce.lastIndexOf(`
`,D-1)+1,Oe=ce.substring(ge,D),be=Oe.trim()==="\u2022"||Oe.trim()===""?`
`:`
\u2022 `;this.value=ce.substring(0,D)+be+ce.substring(J),this.selectionStart=this.selectionEnd=D+be.length}else if(Y.key==="Backspace"){let D=this.selectionStart;if(D===this.selectionEnd&&D>0){let J=this.value.substring(0,D);J.endsWith(`
\u2022 `)?(Y.preventDefault(),this.value=J.substring(0,D-3)+this.value.substring(this.selectionEnd),this.selectionStart=this.selectionEnd=D-3):J==="\u2022 "&&(Y.preventDefault(),this.value="",this.selectionStart=this.selectionEnd=0)}}}}function Lt(){let E=typeof Ie<"u"?Ie:document.getElementById("snippet-container");if(!E)return;let Y=E.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'),D={},J=new Set;Y.forEach(re=>{let se=re.id,K=qe[se];if(K)for(let U in K)U==="linkedTask"?J.add(K.linkedTask):U!=="type"&&(D[U]||(D[U]=[]),D[U].includes(K[U])||D[U].push(K[U]))});let ce=new Set;Object.values(qe).forEach(re=>{Object.keys(re).forEach(se=>{se!=="linkedTask"&&se!=="type"&&ce.add(se)})}),ce.forEach(re=>{let se=document.getElementById(re);if(se){let K=D[re]||[],U="";ct.includes(re.replace("field-",""))?(U=K.map(ie=>ie.startsWith("\u2022 ")?ie:"\u2022 "+ie).join(`
`),U===""?U="\u2022 ":U.endsWith(`
\u2022 `)||(U+=`
\u2022 `)):U=K.join(`

`),U.trim()!=="\u2022"&&U.trim()!==""?se.value=U:ct.includes(re.replace("field-",""))?se.value="\u2022 ":se.value="",se.tagName==="TEXTAREA"&&typeof Ft=="function"&&Ft(se)}});let ge=new Set,Oe=new Set;E.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(re=>{let se=qe[re.id];se&&se.linkedTask&&(re.checked?ge.add(se.linkedTask):Oe.add(se.linkedTask))}),Oe.forEach(re=>{ge.has(re)||p.toggleTask(re,!1)}),ge.forEach(re=>{p.toggleTask(re,!0)})}R.onchange=()=>{let E=R.value;if(Mt(1.5),g.innerHTML=`<option value="">${ne("select_substatus")}</option>`,!E){g.disabled=!0;return}for(let Y in lt){let D=lt[Y];if(D.status===E){let J=document.createElement("option");J.value=Y,J.textContent=D.name,g.appendChild(J)}}g.disabled=!1},g.onchange=()=>{let E=g.value;if(Mt(1.5),!E)return;p.updateSubStatus(E);let Y=lt[E];Ie.innerHTML="";let D=(K,U,ie)=>{let me=document.createElement("label");Object.assign(me.style,a.checkboxLabel),me.onmouseover=()=>me.style.backgroundColor="#e8eaed",me.onmouseout=()=>me.style.backgroundColor="#f8f9fa";let de=document.createElement("input");return de.type=U,de.id=K.id,Object.assign(de.style,a.checkboxInput),me.appendChild(de),me.appendChild(document.createTextNode(` ${K.text}`)),ie.appendChild(me),de},J=[],ce="radio";if(E==="NI_Awaiting_Inputs")J=[{id:"quickfill-ni-inicio-manual",text:"In\xEDcio 2/6 (Manual)"},{id:"quickfill-ni-cms-access",text:"In\xEDcio 2/6 (ADV sem acesso ao CMS)"},{id:"quickfill-ni-followup-bau",text:"Follow-up 2/6 (BAU)"},{id:"quickfill-ni-followup-lm",text:"Follow-up 2/6 (LM)"}];else if(E.startsWith("SO_"))ce="checkbox",J=[{id:"quickfill-gtm-install",text:"Instala\xE7\xE3o do GTM"},{id:"quickfill-whatsapp",text:"Convers\xE3o de WhatsApp"},{id:"quickfill-form",text:"Convers\xE3o de Formul\xE1rio (Padr\xE3o)"},{id:"quickfill-ecw4-close",text:"Fechamento ECW4 (P\xF3s 7 dias)"},{id:"quickfill-ga4-event-close",text:"Fechamento GA4 (P\xF3s 2 dias)"}];else if(E.startsWith("AS_")){ce="checkbox";let K=document.createElement("label");K.textContent=ne("cenarios_comuns"),Object.assign(K.style,a.label),Ie.appendChild(K),J=[{id:"quickfill-as-no-show",text:"Anunciante n\xE3o compareceu (respondeu e-mail)"},{id:"quickfill-as-insufficient-time",text:"Tempo insuficiente"},{id:"quickfill-as-no-access",text:"Anunciante sem acessos necess\xE1rios"}]}else E.startsWith("IN_")?J=[{id:"quickfill-in-nrp-bau",text:"NRP (BAU - 3 tentativas)"},{id:"quickfill-in-nrp-lm",text:"NRP (LM - Sem tentativas)"},{id:"quickfill-in-no-show-bau",text:"No-Show (BAU - 3 tentativas)"},{id:"quickfill-in-2-6-final",text:"Finaliza\xE7\xE3o 2/6 (Sem Resposta)"},{id:"quickfill-in-manual",text:"Outro (Manual)"}]:E.startsWith("DC_")?(ce="radio",J=[{id:"quickfill-dc-lm-no-access",text:"LM - Sem acessos (Reagendar em BAU)"}]):E==="NI_Attempted_Contact"?(ce="radio",J=[{id:"quickfill-ni-attempted-2day",text:"2 Day Rule (2 Liga\xE7\xF5es + Chat AM)"}]):E==="NI_Awaiting_Validation"&&(ce="checkbox",J=[{id:"quickfill-ni-awaiting-ecw4",text:"ECW4 (Acompanhar)"},{id:"quickfill-ni-awaiting-ga4",text:"GA4 Event Tracking (Acompanhar)"}]);let ge=J.filter(K=>{let U=qe[K.id];return!U.type||U.type==="all"||U.type===e});ge.forEach((K,U)=>{let ie=D(K,ce,Ie);ce==="radio"&&(ie.name="scenario-radio-group",U===0&&(ie.checked=!0))}),ge.length>0&&(Pe.style.display="block"),Y.requiresTasks?(xe.style.display="none",je.style.display="block",p.selectionElement.style.display="block"):(xe.style.display="block",je.style.display="none",p.selectionElement.style.display="none"),ze.innerHTML="";let Oe=Y.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(Oe)].forEach(K=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(K))return;let U=K.slice(1,-1),ie=document.createElement("label"),me=ne(U.toLowerCase());if(ie.textContent=me!==U.toLowerCase()?me:U.replace(/_/g," ").replace(/\b\w/g,ee=>ee.toUpperCase())+":",Object.assign(ie.style,a.label),U==="SPEAKEASY_ID"){let ee=document.createElement("button");ee.innerHTML='<span style="font-size:12px; margin-right:4px;">\u2728</span>Auto Busca',ee.style.cssText=`
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
          `,ee.title="Localizar Speakeasy ID no hist\xF3rico",ee.onmouseover=()=>{ee.style.backgroundColor="#c2e7ff",ee.style.boxShadow="0 1px 2px rgba(0,0,0,0.1)"},ee.onmouseout=()=>{ee.style.backgroundColor="#d3e3fd",ee.style.boxShadow="none"},ee.onmousedown=()=>{ee.style.backgroundColor="#a8c7fa",ee.style.transform="scale(0.96)"},ee.onmouseup=()=>ee.style.transform="scale(1)",ee.onclick=ye=>{ye.preventDefault(),uo(`field-${U}`)},ie.appendChild(ee)}let de;ct.includes(U)?(de=document.createElement("textarea"),Object.assign(de.style,a.textarea),de.classList.add("bullet-textarea"),Ft(de)):Bt.includes(U)?(de=document.createElement("textarea"),Object.assign(de.style,a.textarea)):(de=document.createElement("input"),de.type="text",Object.assign(de.style,a.input),U==="REASON_COMMENTS"&&(E.startsWith("NI_")||E.startsWith("IN_"))&&(Object.assign(ie.style,{display:"none"}),Object.assign(de.style,{display:"none"}))),U==="ON_CALL"&&e==="lm"&&(Object.assign(ie.style,{display:"none"}),Object.assign(de.style,{display:"none"}),de.value="N/A"),de.id=`field-${U}`,ze.appendChild(ie),ze.appendChild(de)});let re=Ie.querySelectorAll('input[type="checkbox"], input[type="radio"]');re.length>0&&(re.forEach(K=>{K.removeEventListener("change",Lt),K.addEventListener("change",Lt)}),Lt()),Se.style.display="block",Xe[E]?He.style.display="block":He.style.display="none",Je.style.display="flex";let se=p.getCheckedElements().map(K=>K.value);r.updateVisibility(E,se)},xe.onclick=()=>{xe.style.display="none",je.style.display="block",p.selectionElement.style.display="block"};function Xt(){let E=g.value;if(!E)return null;let D=lt[E].template.replace(/\n/g,"<br>"),J='style="margin-bottom: 12px; padding-left: 30px;"',ce=[],ge="",Oe=p.getCheckedElements();Oe.length>0&&Oe.forEach(se=>{let K=se.value,U=Ge[K],ie=se.closest().querySelector(".stepper-count"),me=ie?parseInt(ie.textContent):1;me>1?ce.push(`${U.name} (x${me})`):ce.push(U.name)});let be=p.screenshotsElement;if(be){let se=Array.from(be.querySelectorAll('input[id^="name-"]'));se.length>0&&se.forEach(K=>{let U=K.value,ie=K.closest(".cw-screen-card");if(ie){let me=ie.querySelectorAll('input[id^="screen-"]'),de=!1,ee="";me.forEach(ye=>{let Kt=ye.closest(".cw-input-group"),Qt=Kt?Kt.querySelector(".cw-input-label"):null,zo=Qt?Qt.textContent:"Evid\xEAncia",Zt=ye.value.trim(),Go=Zt?` ${Zt}`:"";ee+=`<li>${zo} -${Go}</li>`,de=!0}),de&&(ge+=`<b>${U}</b>`,ge+=`<ul ${J}>${ee}</ul>`)}})}if(D.includes("{TAGS_IMPLEMENTED}")?D=D.replace(/{TAGS_IMPLEMENTED}/g,ce.join(", ")||"N/A"):ce.length>0&&(D+=`<br><b>Tags:</b> ${ce.join(", ")}<br>`),D.includes("{SCREENSHOTS_LIST}")?D=D.replace(/{SCREENSHOTS_LIST}/g,ge?`${ge}`:"N/A"):ge!==""&&(D+=`<br>${ge}`),n==="pt"&&o){let se=oe.checked?ne("sim"):ne("nao");D=D.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${ne("consentiu_gravacao")}</b> ${se}<br><br>`),D=D.replace(/{CASO_PORTUGAL}/g,`<br><b>${ne("caso_portugal")}</b> ${ne("sim")}<br>`)}else n==="pt"&&!o?(D=D.replace(/{CASO_PORTUGAL}/g,`<br><b>${ne("caso_portugal")}</b> ${ne("nao")}<br>`),D=D.replace(/{CONSENTIU_GRAVACAO}/g,"")):(D=D.replace(/{CASO_PORTUGAL}/g,""),D=D.replace(/{CONSENTIU_GRAVACAO}/g,""));return ze.querySelectorAll("input, textarea").forEach(se=>{let K=se.id.replace("field-",""),U=new RegExp(`{${K}}`,"g"),ie=se.value;if(K==="REASON_COMMENTS"&&(E.startsWith("NI_")||E.startsWith("IN_"))){let ee=Ie.querySelector('input[type="radio"]:checked');ee&&qe[ee.id]&&(ie=qe[ee.id]["field-REASON_COMMENTS"])}if(ct.includes(K)&&ie.trim()!==""){let ee=ie.split(`
`).map(ye=>ye.trim()).filter(ye=>ye!==""&&ye!=="\u2022").map(ye=>ye.startsWith("\u2022 ")?ye.substring(2):ye).map(ye=>`<li>${ye}</li>`).join("");ie=ee?`<ul ${J}>${ee}</ul>`:""}else Bt.includes(K)?ie=ie.split(`
`).filter(ee=>ee.trim()!=="").map(ee=>`<p style="margin: 0 0 8px 0;">${ee}</p>`).join(""):se.tagName==="TEXTAREA"&&(ie=ie.replace(/\n/g,"<br>"));let me=ie.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(me===""||me==="\u2022"||me.toLowerCase()==="n/a"){let ee=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${K}\\}(?:<br>\\s*)?`,"gi");ee.test(D)?D=D.replace(ee,""):D=D.replace(U,"")}else D=D.replace(U,ie.replace(/\$/g,"$$$$"))}),D=D.replace(/{([A-Z0-9_]+)}/g,""),D=D.replace(/(<br>){3,}/g,"<br><br>"),typeof r<"u"&&r.getOutput&&(D+=r.getOutput()),D}nt.onclick=()=>{let E=Xt();E?(dt(E),W(ne("copiado_sucesso"))):W(ne("selecione_substatus"),{error:!0})},at.onclick=async()=>{let E=g.value,Y=Xt();if(!Y){W(ne("selecione_substatus"),{error:!0});return}dt(Y),_t();let D=Ct(),J=await Tt();if(J)try{if(J.focus(),J.innerHTML.trim()==="<p><br></p>"||J.innerHTML.trim()==="<br>"||J.innerText.trim()===""){let be=document.createRange();be.selectNodeContents(J);let re=window.getSelection();re.removeAllRanges(),re.addRange(be),document.execCommand("delete",!1,null)}else if(!J.innerHTML.endsWith("<br><br>")){let be=document.createRange();be.selectNodeContents(J),be.collapse(!1);let re=window.getSelection();re.removeAllRanges(),re.addRange(be),document.execCommand("insertHTML",!1,"<br><br>")}document.execCommand("insertHTML",!1,Y),Et(J),setTimeout(()=>{W(ne("inserido_copiado"))},600);let ge=typeof Ve<"u"&&Ve?Ve.checked:!0;if(E&&Xe[E]&&ge){let be=Xe[E];await vt(be),await new Promise(re=>setTimeout(re,500))}D(),Mt(1.5),R.value="",g.innerHTML=`<option value="">${ne("select_substatus")}</option>`,g.disabled=!0}catch(ce){console.error(ce),W("Erro ao inserir.",{error:!0}),D()}};function Mt(E=1.5){E<=1.5&&(Pe.style.display="none",Ie.innerHTML=""),E<=2&&(p.reset(),xe.style.display="none"),E<=3&&(Se.style.display="none",ze.innerHTML="",r.reset(),Je.style.display="none",He.style.display="none")}function _t(){if(s=!s,s){let E=m.querySelector(".cw-expand-btn");E&&typeof E.resetState=="function"&&E.resetState()}ke(s,m,"cw-btn-notes")}return It("bau"),qt("pt"),_t}var Qe={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function To(){let t="v4.2.0 CR-Hybrid",e="CANNED_RESPONSES",n=Object.keys(Qe)[0],o="",s="list",i=!1,a={bgApp:"#F8F9FA",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.08)",borderFocus:"rgba(26, 115, 232, 0.4)",textPrimary:"#202124",textSecondary:"#5F6368",primary:"#1A73E8",primaryBg:"#E8F0FE",shadowCard:"0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",shadowHover:"0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",transition:"all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1)"},r={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:a.bgApp},p={display:"flex",width:"200%",height:"100%",transition:"transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",transform:"translateX(0)",willChange:"transform"},m={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},u={padding:"20px 24px 12px 24px",flexShrink:"0",background:a.bgApp,zIndex:"10",display:"flex",flexDirection:"column",gap:"16px",borderBottom:`1px solid ${a.borderSubtle}`},d={width:"100%",height:"44px",padding:"0 16px 0 48px",borderRadius:"12px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",fontWeight:"400",color:a.textPrimary,boxSizing:"border-box",outline:"none",transition:a.transition,boxShadow:"0 2px 5px rgba(0,0,0,0.03)",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%239AA0A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"16px center"},f={display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px",paddingBottom:"4px"},x={padding:"6px 14px",borderRadius:"100px",border:"1px solid #DADCE0",background:"#FFFFFF",color:a.textSecondary,fontSize:"13px",fontWeight:"500",letterSpacing:"0.3px",cursor:"pointer",transition:a.transition,flexShrink:"0",display:"flex",alignItems:"center",justifyContent:"center"},h={background:a.primaryBg,color:a.primary,borderColor:"transparent",fontWeight:"600",boxShadow:"0 1px 2px rgba(26, 115, 232, 0.15)"},b={padding:"16px 24px 80px 24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"12px"},C={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",height:"72px",minHeight:"72px",borderRadius:"16px",background:a.bgSurface,border:"1px solid transparent",boxShadow:a.shadowCard,cursor:"pointer",transition:"all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",position:"relative",overflow:"hidden"},k=document.createElement("div");k.id="quick-email-popup",k.classList.add("cw-module-window"),Object.assign(k.style,Ee,{right:"100px",width:"440px",height:"640px",borderRadius:"20px",boxShadow:"0 24px 64px rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.4)"});let z={popup:k,googleLine:null,focusElement:null};function G(){i=!i,ke(i,k,"cw-btn-email"),i||setTimeout(()=>c(),300)}let j=Te(k,"Quick Email",t,"Templates & Automa\xE7\xF5es",z,()=>G()),y=document.createElement("div");Object.assign(y.style,r);let v=document.createElement("div");Object.assign(v.style,p);let A=document.createElement("div");Object.assign(A.style,m);let F=document.createElement("div");Object.assign(F.style,u);let q=document.createElement("input");q.placeholder="Pesquisar templates...",Object.assign(q.style,d),q.onfocus=()=>{q.style.borderColor=a.primary,q.style.boxShadow="0 0 0 4px rgba(26, 115, 232, 0.15)",q.style.background="#fff"},q.onblur=()=>{q.style.borderColor="transparent",q.style.boxShadow="0 2px 5px rgba(0,0,0,0.03)",q.style.background="#fff"},z.focusElement=q;let w=document.createElement("div");Object.assign(w.style,f);let O=document.createElement("div");Object.assign(O.style,b),F.appendChild(q),F.appendChild(w),A.appendChild(F),A.appendChild(O);let S=document.createElement("div");Object.assign(S.style,m);let L=document.createElement("div");Object.assign(L.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),S.appendChild(L),v.appendChild(A),v.appendChild(S),y.appendChild(v),k.appendChild(j),k.appendChild(y),document.body.appendChild(k);async function R(N,$){try{i&&G();let _=Ct();await new Promise(M=>setTimeout(M,800)),$==="email"?await go(N):$==="cr"&&await vt(N),_()}catch(_){console.error("\u274C Erro:",_);let M=document.querySelector(".cw-focus-backdrop");M&&M.classList.remove("active")}}function l(N){s="detail",v.style.transform="translateX(-50%)";let $='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',_='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';L.innerHTML=`
            <style>
                .cw-email-content p { margin: 0 0 8px 0; } /* Margem apenas embaixo */
                .cw-email-content ul { margin: 0 0 8px 16px; padding: 0; }
                .cw-email-content li { margin-bottom: 4px; }
            </style>

            <div style="position:sticky; top:0; background:rgba(255,255,255,0.9); backdrop-filter:blur(12px); border-bottom:1px solid #eee; padding:16px 24px; z-index:10; display:flex; align-items:center; gap:12px;">
                <button id="csa-back-btn" style="background:none; border:none; cursor:pointer; display:flex; color:#5f6368; padding:8px; margin-left:-12px; border-radius:50%; transition:background 0.2s;">${$}</button>
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
                    ${_} Usar Template
                </button>
            </div>
        `;let M=L.querySelector("#csa-back-btn");M.onmouseenter=()=>M.style.background="#f1f3f4",M.onmouseleave=()=>M.style.background="none",M.onclick=c;let H=L.querySelector("#csa-insert-btn");H.onmouseenter=()=>{H.style.transform="translateY(-1px)",H.style.boxShadow="0 6px 16px rgba(26,115,232,0.4)"},H.onmouseleave=()=>{H.style.transform="translateY(0)",H.style.boxShadow="0 4px 12px rgba(26,115,232,0.3)"},H.onclick=()=>{H.style.transform="scale(0.96)",R(N,"email"),setTimeout(()=>{H.style.transform="scale(1)",c()},300)}}function c(){s="list",v.style.transform="translateX(0)"}function T(N,$,_=null){let M=document.createElement("button"),H=_?`<span style="margin-right:6px; font-size:14px; opacity:0.9;">${_}</span>`:"";return M.innerHTML=`${H}${N}`,Object.assign(M.style,x),n===$&&o===""?Object.assign(M.style,h):(M.onmouseenter=()=>{M.style.background="#F1F3F4",M.style.borderColor="#DADCE0"},M.onmouseleave=()=>{M.style.background="#FFFFFF",M.style.borderColor="#DADCE0"}),M.onclick=()=>{n=$,o="",q.value="",g(),B()},M}function g(){w.innerHTML="",w.appendChild(T("Smart CRs",e,"\u26A1")),Object.keys(Qe).forEach(N=>{w.appendChild(T(Qe[N].title,N))})}function B(){O.innerHTML="";let N=[];if(o.trim()!==""){let V=o.toLowerCase();Object.values(Qe).forEach(I=>{I.emails.forEach(P=>{(P.name.toLowerCase().includes(V)||P.subject.toLowerCase().includes(V))&&N.push({type:"email",data:P})})}),Object.entries(Xe).forEach(([I,P])=>{if(!P)return;(I.replace(/_/g," ").toLowerCase().includes(V)||P.toLowerCase().includes(V))&&N.push({type:"cr",key:I,code:P})})}else n===e?Object.entries(Xe).forEach(([V,I])=>{I&&N.push({type:"cr",key:V,code:I})}):Qe[n]&&Qe[n].emails.forEach(V=>{N.push({type:"email",data:V})});if(N.length===0){O.innerHTML=`
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F50D}</div>
                    <div style="font-size:14px; font-weight:500;">Nenhum template encontrado</div>
                    <div style="font-size:12px; margin-top:4px;">Tente outro termo de busca</div>
                </div>`;return}let _='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1967D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',M='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA8600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',H='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BDC1C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';N.forEach(V=>{let I=document.createElement("div");if(Object.assign(I.style,C),V.type==="email"){let P=V.data,te=P.subject.length>45?P.subject.substring(0,45)+"...":P.subject;I.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#E8F0FE; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${_}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${P.name}</div>
                        <div style="font-size:12px; color:#5F6368; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${te}</div>
                    </div>
                    <div style="margin-left:12px; opacity:0.6;">${H}</div>
                `,I.onclick=()=>l(P)}else{let P=V.key.replace(/_/g," ").replace("AS ","AS - ").replace("NI ","NI - ");I.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#FEF7E0; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${M}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; margin-bottom:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${P}</div>
                        <div style="font-size:11px; font-weight:500; color:#EA8600; font-family:'Roboto Mono', monospace; letter-spacing:-0.2px;">${V.code}</div>
                    </div>
                    <div style="font-size:10px; font-weight:700; color:#DADCE0; text-transform:uppercase; letter-spacing:0.5px; border:1px solid #F1F3F4; padding:4px 8px; border-radius:6px; margin-left:12px;">Inserir</div>
                `,I.onclick=()=>{I.style.transform="scale(0.98)",I.style.background="#FEF7E0",setTimeout(()=>{I.style.transform="scale(1)",I.style.background="#fff",R(V.code,"cr")},150)}}I.onmouseenter=()=>{I.style.transform="translateY(-2px)",I.style.boxShadow=a.shadowHover,V.type==="cr"?I.style.borderLeft="3px solid #Fbbc04":I.style.borderLeft="3px solid #1a73e8"},I.onmouseleave=()=>{I.style.transform="translateY(0)",I.style.boxShadow=a.shadowCard,I.style.borderLeft="1px solid transparent"},O.appendChild(I)})}return q.addEventListener("input",N=>{o=N.target.value,o!==""?Array.from(w.children).forEach($=>{Object.assign($.style,x),$.style.opacity="0.6"}):g(),B()}),g(),B(),G}var ko={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function Oo(){let t="v2.5 (Tag Support)",e={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#f8f9fa",scrollBehavior:"smooth"},card:{background:"#ffffff",border:"1px solid #dadce0",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"13px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"10px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.15s ease, opacity 0.3s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.5",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"20px",height:"20px",borderRadius:"6px",border:"2px solid #dadce0",marginRight:"14px",marginTop:"1px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #eee",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"},contextBanner:{padding:"12px 16px",background:"#FFFFFF",borderBottom:"1px solid #E5E7EB",display:"flex",flexDirection:"column",gap:"8px",boxShadow:"0 2px 6px rgba(0,0,0,0.02)",position:"relative",zIndex:"5"}},n={},o="PT",s="BAU",i=!1,a=document.createElement("div");a.id="call-script-popup",a.classList.add("cw-module-window"),Object.assign(a.style,Ee,{right:"auto",left:"50%",width:"400px",height:"650px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let r={popup:a,googleLine:null},p=null;function m(){i&&Ue().then(l=>{let c=a.querySelector("#cw-ctx-name"),T=a.querySelector("#cw-ctx-cid"),g=a.querySelector("#cw-ctx-email"),B=a.querySelector("#cw-live-indicator");c&&(c.textContent=l.advertiserName||"Cliente Desconhecido"),T&&(T.textContent=l.cid||"---"),g&&(g.textContent=l.clientEmail||"N\xE3o encontrado",g.title=l.clientEmail||""),B&&(B.style.opacity="0.5",setTimeout(()=>B.style.opacity="1",300))})}function u(){i=!i,ke(i,a,"cw-btn-script"),i?(m(),p||(p=setInterval(m,3e3))):p&&(clearInterval(p),p=null)}let d=Te(a,"Call Script",t,"Guia interativo para condu\xE7\xE3o de chamadas.",r,()=>{u()});a.appendChild(d);let f=document.createElement("div");Object.assign(f.style,e.contextBanner),f.innerHTML=`
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <div style="display:flex; align-items:center; gap:8px;">
              <span id="cw-live-indicator" style="width:8px; height:8px; border-radius:50%; background:#10B981; display:inline-block;"></span>
              <span id="cw-ctx-name" style="font-size:15px; font-weight:700; color:#202124;">Carregando...</span>
          </div>
      </div>
      
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div>
              <div style="font-size:10px; font-weight:700; color:#5f6368; text-transform:uppercase; margin-bottom:2px;">CID</div>
              <div id="cw-ctx-cid" style="font-family:'Roboto Mono'; font-size:13px; color:#1a73e8; background:#e8f0fe; padding:4px 8px; border-radius:4px; display:inline-block;">---</div>
          </div>
          <div style="overflow:hidden;">
              <div style="font-size:10px; font-weight:700; color:#5f6368; text-transform:uppercase; margin-bottom:2px;">Email</div>
              <div id="cw-ctx-email" style="font-size:13px; color:#3c4043; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="Email do Anunciante">---</div>
          </div>
      </div>
  `,a.appendChild(f);let x=document.createElement("div");Object.assign(x.style,e.progressBarContainer);let h=document.createElement("div");Object.assign(h.style,e.progressBarFill),x.appendChild(h),a.appendChild(x);let b=document.createElement("div");b.id="csa-content",Object.assign(b.style,e.contentArea),a.appendChild(b);let C=document.createElement("div");Object.assign(C.style,e.footer);let k=document.createElement("span");k.textContent="by lucaste@",Object.assign(k.style,{fontSize:"10px",color:"#bdc1c6"});let z=document.createElement("button");z.innerHTML=`
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
    Resetar Script
  `,Object.assign(z.style,e.resetBtn),z.onmouseenter=()=>z.style.background="#fce8e6",z.onmouseleave=()=>z.style.background="transparent",z.onclick=()=>{z.style.transform="scale(0.9)",setTimeout(()=>z.style.transform="scale(1)",150);for(let l in n)delete n[l];O()},C.appendChild(k),C.appendChild(z),a.appendChild(C);let G=document.createElement("div");Object.assign(G.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let j=document.createElement("div");Object.assign(j.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let y=document.createElement("div");y.textContent="BAU";let v=document.createElement("div");v.textContent="LT",Object.assign(y.style,ve),Object.assign(v.style,ve),j.appendChild(y),j.appendChild(v);let A=document.createElement("select");Object.assign(A.style,ht,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),A.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',A.value=o,G.appendChild(j),G.appendChild(A),b.appendChild(G);let F=document.createElement("div");F.id="csa-checklist-area",b.appendChild(F);let q=document.createElement("div");Object.assign(q.style,et),q.className="no-drag",q.title="Redimensionar",a.appendChild(q),tt(a,q),document.body.appendChild(a);function w(l){return l}function O(){F.innerHTML="";let l=`${o} ${s}`,c=ko[l];if(!c){F.innerHTML=`<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <div style="font-size: 24px;">\u2615</div>
        <div>Script n\xE3o configurado.</div>
      </div>`,h.style.width="0%";return}let T=c.color||"#1a73e8",g=0,B=0;["inicio","meio","fim"].forEach(N=>{c[N]&&(g+=c[N].length)}),["inicio","meio","fim"].forEach((N,$)=>{let _=c[N];if(!_||_.length===0)return;let M=document.createElement("div");Object.assign(M.style,e.card);let H=document.createElement("div");Object.assign(H.style,e.cardTitle);let V="";N==="inicio"?o.includes("ES")?V="Apertura":o.includes("EN")?V="Opening":V="Abertura":N==="meio"?o.includes("ES")?V="Implementaci\xF3n":o.includes("EN")?V="Implementation":V="Implementa\xE7\xE3o (Tag Support)":N==="fim"&&(o.includes("ES")?V="Cierre":o.includes("EN")?V="Closing":V="Fechamento"),H.textContent=V;let I=document.createElement("span");I.style.fontSize="11px",I.style.opacity="0.7",I.style.fontWeight="500",I.style.background="#f1f3f4",I.style.padding="2px 8px",I.style.borderRadius="10px",H.appendChild(I),M.appendChild(H);let P=0;_.forEach((te,ue)=>{let he=`${l}-${N}-${ue}`,le=!!n[he];le&&(B++,P++);let Z=document.createElement("div");Object.assign(Z.style,e.itemRow);let oe=document.createElement("div");Object.assign(oe.style,e.checkbox);let Ce=document.createElement("span");Ce.innerHTML=te,Ce.style.flex="1",le?(Object.assign(Z.style,e.itemCompleted),oe.style.background=T,oe.style.borderColor=T,oe.style.transform="scale(1)",oe.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(Z.style.textDecoration="none",Z.style.opacity="1",oe.style.background="transparent",oe.style.borderColor="#dadce0",oe.style.transform="scale(1)",oe.innerHTML=""),Z.onclick=()=>{let Re=!n[he];n[he]=Re,X.playClick(),Re?(oe.style.transform="scale(1.2)",setTimeout(()=>oe.style.transform="scale(1)",150),Object.assign(Z.style,e.itemCompleted),oe.style.background=T,oe.style.borderColor=T,oe.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(Z.style.textDecoration="none",Z.style.opacity="1",oe.style.background="transparent",oe.style.borderColor="#dadce0",oe.innerHTML=""),S(l,c)},Z.onmouseenter=()=>{n[he]||(Z.style.background="#f1f3f4",oe.style.borderColor=T)},Z.onmouseleave=()=>{n[he]||(Z.style.background="transparent",oe.style.borderColor="#dadce0")},Z.appendChild(oe),Z.appendChild(Ce),M.appendChild(Z)}),P===_.length&&_.length>0&&(I.style.color="#1e8e3e",I.style.background="#e6f4ea",M.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),I.textContent=`${P}/${_.length}`,F.appendChild(M)}),L(g,B)}function S(l,c){let T=0,g=0;["inicio","meio","fim"].forEach(B=>{let N=c[B]||[];T+=N.length;let $=0;N.forEach((_,M)=>{n[`${l}-${B}-${M}`]&&(g++,$++)})}),L(T,g),setTimeout(()=>O(),200)}function L(l,c){let T=l===0?0:c/l*100;h.style.width=`${T}%`,T===100?h.style.background="#34A853":h.style.background="linear-gradient(90deg, #4285F4, #34A853)"}function R(l){s=l;let c=st();Object.assign(y.style,ve),Object.assign(v.style,ve),Object.assign(l==="BAU"?y.style:v.style,c),O()}return y.onclick=()=>R("BAU"),v.onclick=()=>R("LT"),A.addEventListener("change",l=>{o=l.target.value,O()}),R(s),u}var pt={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"}]}},Ze={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},kt={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}},Vt="cw_link_history_v4";function Io(t,e){try{let n=JSON.parse(localStorage.getItem(Vt)||"[]");n=n.filter(o=>o.url!==t.url),n.unshift({...t,_originalCat:e}),n=n.slice(0,3),localStorage.setItem(Vt,JSON.stringify(n))}catch(n){console.warn("Erro ao salvar hist\xF3rico",n)}}function Jo(){try{return JSON.parse(localStorage.getItem(Vt)||"[]")}catch{return[]}}function qo(){let t="v4.6",e="",n=!1,o=null,s=!1,i={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},a=document.createElement("div");a.id="links-popup",a.classList.add("cw-module-window"),Object.assign(a.style,Ee,{right:"100px",width:"600px",height:"650px",background:i.bgApp,overflow:"hidden"});let p=Te(a,"Central de Links",t,"Navegue pelas categorias ou use a busca.",{popup:a,googleLine:null},()=>O());a.appendChild(p);let m=document.createElement("div");m.style.cssText="display: flex; height: calc(100% - 56px); width: 100%; position: relative;",a.appendChild(m);let u=document.createElement("div");u.style.cssText=`
      width: 80px; flex-shrink: 0; background: ${i.bgSidebar};
      border-right: 1px solid ${i.borderSubtle};
      display: flex; flex-direction: column; align-items: center;
      padding: 16px 0; overflow-y: auto; gap: 8px;
      scrollbar-width: none; z-index: 2;
  `,m.appendChild(u);let d=document.createElement("div");d.style.cssText="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F8F9FA; position: relative; z-index: 1;",m.appendChild(d);let f=document.createElement("div");f.style.cssText="padding: 16px 24px; flex-shrink: 0; background: transparent;";let x=document.createElement("div");x.style.cssText=`
      position: relative; width: 100%; height: 44px;
      border-radius: 12px; border: 1px solid transparent;
      background: #FFFFFF; transition: all 0.2s;
      display: flex; align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  `;let h=document.createElement("div");h.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',h.style.cssText="margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none;";let b=document.createElement("input");b.type="text",b.placeholder="Buscar ferramenta ou SOP...",b.style.cssText=`
      flex: 1; height: 100%; border: none; background: transparent;
      padding: 0 12px; font-size: 14px; color: ${i.textPrimary};
      outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
  `,b.onfocus=()=>{x.style.boxShadow="0 4px 12px rgba(26,115,232,0.15)",x.style.border="1px solid #1a73e8"},b.onblur=()=>{x.style.boxShadow="0 2px 6px rgba(0,0,0,0.04)",x.style.border="1px solid transparent"},x.appendChild(h),x.appendChild(b),f.appendChild(x),d.appendChild(f);let C=document.createElement("div");C.style.cssText="flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth;",d.appendChild(C);let k=null;function z(){if(k)return;k=document.createElement("div"),k.style.cssText=`
          position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255,255,255,0.98); z-index: 20;
          display: flex; flex-direction: column;
          transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
      `;let S=document.createElement("div");S.style.cssText="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4;",S.innerHTML='<span style="font-size: 16px; font-weight: 700; color: #202124;">\u{1F552} Recentes</span>';let L=document.createElement("button");L.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',L.style.cssText="background: none; border: none; cursor: pointer; color: #5f6368;",L.onclick=()=>{j(),s=!1,F()},S.appendChild(L),k.appendChild(S);let R=document.createElement("div");R.id="cw-history-list",R.style.cssText="flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA;",k.appendChild(R),d.appendChild(k)}function G(){k||z();let S=k.querySelector("#cw-history-list");S.innerHTML="";let L=Jo();L.length===0?S.innerHTML='<div style="text-align: center; color: #999; margin-top: 60px; font-size:13px;">Nada por aqui ainda.</div>':L.forEach(R=>{let l=w(R,Ze[R._originalCat],!0,R._originalCat);S.appendChild(l)}),requestAnimationFrame(()=>k.style.transform="translateY(0)")}function j(){k&&(k.style.transform="translateY(100%)")}function y(){u.innerHTML="";let S=v("history","Recentes",Ze.history);S.id="cw-sidebar-btn-history",S.onclick=()=>{X.playClick(),s=!s,s?G():j(),F()},u.appendChild(S);let L=document.createElement("div");L.style.cssText="width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0;",u.appendChild(L),Object.keys(pt).forEach(R=>{let l=pt[R],c=v(R,l.label,Ze[R]);c.id=`cw-sidebar-btn-${R}`,c.onclick=()=>{X.playClick(),s&&(s=!1,j()),A(R)},u.appendChild(c)})}function v(S,L,R){let l=document.createElement("div");l.style.cssText=`
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; color: ${i.textSecondary}; 
          transition: all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1);
          position: relative;
      `,l.title=L,l.dataset.key=S;let c=document.createElement("div");c.style.cssText="width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s;",c.innerHTML=R||Ze.tasks;let T=document.createElement("div");return T.style.cssText="font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px;",T.textContent=L,l.appendChild(c),l.appendChild(T),l.onmouseenter=()=>{o!==S&&!(S==="history"&&s)&&(l.style.background="#F1F3F4",c.style.transform="scale(1.1)")},l.onmouseleave=()=>{o!==S&&!(S==="history"&&s)&&(l.style.background="transparent",c.style.transform="scale(1)")},l}function A(S){let L=document.getElementById(`cat-anchor-${S}`);L&&(L.scrollIntoView({behavior:"smooth",block:"start"}),o=S,F())}function F(){Object.keys(pt).forEach(L=>{let R=u.querySelector(`#cw-sidebar-btn-${L}`);if(R)if(o===L&&!s){let l=kt[L];R.style.background=l.bg,R.style.color=l.color,R.querySelector("div:first-child").style.transform="scale(1.1)"}else R.style.background="transparent",R.style.color=i.textSecondary,R.querySelector("div:first-child").style.transform="scale(1)"});let S=u.querySelector("#cw-sidebar-btn-history");S&&(s?(S.style.background="#3C4043",S.style.color="#FFFFFF"):(S.style.background="transparent",S.style.color=i.textSecondary))}function q(){if(C.innerHTML="",e.trim()!==""){let L=[];if(Object.entries(pt).forEach(([l,c])=>{let T=c.links.filter(g=>g.name.toLowerCase().includes(e.toLowerCase())||g.desc.toLowerCase().includes(e.toLowerCase()));L.push(...T.map(g=>({...g,_cat:l})))}),L.length===0){C.innerHTML='<div style="text-align:center; padding: 60px; color:#999; font-size:13px;">Nada encontrado.</div>';return}let R=document.createElement("div");R.innerHTML="Resultados da busca",R.style.cssText="font-size:12px; font-weight:700; color:#5f6368; margin:20px 0 10px; text-transform:uppercase; letter-spacing:0.5px;",C.appendChild(R),L.forEach(l=>{let c=w(l,Ze[l._cat],!1,l._cat);C.appendChild(c)});return}Object.entries(pt).forEach(([L,R])=>{let l=kt[L],c=document.createElement("div"),T=document.createElement("div");T.id=`cat-anchor-${L}`,T.style.cssText=`
              display: flex; align-items: center; gap: 8px;
              font-size: 13px; font-weight: 800; color: ${l.color}; 
              text-transform: uppercase; letter-spacing: 0.5px;
              margin: 32px 0 12px 0; padding-top: 10px;
          `,T.innerHTML=`
            <div style="width:8px; height:8px; border-radius:50%; background:${l.color};"></div>
            ${R.label}
          `,c.appendChild(T);let g=document.createElement("div");g.style.cssText="display: grid; grid-template-columns: 1fr; gap: 8px;",R.links.forEach(B=>{let N=w(B,Ze[L],!1,L);g.appendChild(N)}),c.appendChild(g),C.appendChild(c)});let S=document.createElement("div");S.style.height="80px",C.appendChild(S)}function w(S,L,R,l){let c=document.createElement("div"),T=kt[l]||kt.history;c.style.cssText=`
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
          background: ${T.bg}; color: ${T.color};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
      `,g.innerHTML=L||Ze.tasks;let B=g.querySelector("svg");B&&(B.style.width="22px",B.style.height="22px");let N=document.createElement("div");N.style.cssText="flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden;";let $=document.createElement("div");$.style.cssText=`font-size: 14px; font-weight: 600; color: ${i.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,$.textContent=S.name;let _=document.createElement("div");_.style.cssText=`font-size: 12px; color: ${i.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,_.textContent=S.desc,N.appendChild($),N.appendChild(_);let M=document.createElement("div");return M.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',M.style.cssText=`
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9AA0A6; transition: all 0.2s; opacity: 0;
      `,M.title="Copiar URL",c.onmouseenter=()=>{c.style.transform="translateY(-2px)",c.style.boxShadow="0 8px 20px rgba(0,0,0,0.08)",c.style.borderColor="rgba(0,0,0,0.05)",c.style.borderLeft=`4px solid ${T.color}`,M.style.opacity="1",M.style.background="#F1F3F4"},c.onmouseleave=()=>{c.style.transform="translateY(0)",c.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",c.style.border="1px solid transparent",M.style.opacity="0",M.style.background="transparent"},c.onclick=()=>{!R&&l&&Io(S,l),window.open(S.url,"_blank")},M.onclick=H=>{H.stopPropagation(),X.playClick(),navigator.clipboard.writeText(S.url),!R&&l&&Io(S,l),W("Link copiado!")},c.appendChild(g),c.appendChild(N),c.appendChild(M),c}b.addEventListener("input",S=>{e=S.target.value,q()});function O(){n=!n,ke(n,a,"cw-btn-links")}return document.body.appendChild(a),y(),q(),O}var Be=[];function Ut(t){Be=t}var en=["lucaste","ricardogi"],tn=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function Fo(){let t="v4.9",e=!1,n=null,o=null;function s(l){if(!l)return"";try{let c=new Date(l);return isNaN(c.getTime())?String(l):c.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(l)}}if(!document.getElementById("cw-broadcast-hd-css")){let l=document.createElement("style");l.id="cw-broadcast-hd-css",l.innerHTML=`
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
      `,document.head.appendChild(l)}let i={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},a={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function r(l){return l?Object.entries(l).map(([c,T])=>`${c.replace(/[A-Z]/g,g=>"-"+g.toLowerCase())}:${T}`).join(";"):""}function p(l){if(!l||typeof l!="string")return"";let c=l;return c=c.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),c=c.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),c=c.replace(/_(.*?)_/g,"<i>$1</i>"),c=c.replace(/\n/g,"<br>"),c=lo(c),c}let m=document.createElement("div");m.id="broadcast-popup",m.classList.add("cw-module-window"),Object.assign(m.style,Ee,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let u={popup:m,googleLine:null};function d(){if(e=!e,ke(e,m,"cw-btn-broadcast"),e){let l=document.getElementById("cw-btn-broadcast");l&&l.classList.remove("has-new"),A()}}let f=Te(m,"Central de Avisos",t,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",u,()=>d()),x=f.querySelector(".cw-header-actions")||f.lastElementChild,h=null;function b(){let l=null;try{l=ft()}catch{console.warn("TechSol: Auth Pending")}if(l){let c=l.split("@")[0].toLowerCase(),T=en.includes(c);if(window._cwIsAdmin=T,window._cwCurrentUser=c,T&&x&&!x.querySelector("#cw-admin-btn")){let g=document.createElement("div");g.id="cw-admin-btn",g.className="cw-btn-interactive",g.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(g.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),g.title="Novo Aviso",g.onclick=B=>{B.stopPropagation(),z()},x.insertBefore(g,x.firstChild),h||k(),q()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(b,2e3))}if(x){let l=document.createElement("button");l.textContent="Limpar",l.className="cw-btn-interactive",Object.assign(l.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),l.onclick=c=>{c.stopPropagation(),X.playSuccess();let T=Be.map(g=>g.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(T)),q(),F()},x.insertBefore(l,x.firstChild)}m.appendChild(f);let C=document.createElement("div");C.id="cw-update-status",C.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",m.appendChild(C);function k(){h=document.createElement("div"),h.className="cw-editor-overlay",h.innerHTML=`
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
      `,h.querySelectorAll('input[name="cw-bc-type"]').forEach(g=>{g.addEventListener("change",()=>{h.querySelectorAll(".cw-radio-option").forEach(B=>B.classList.remove("checked")),g.parentElement.classList.add("checked")})}),setTimeout(()=>{let g=h.querySelector(".cw-radio-option.info");g&&g.classList.add("checked")},100);let l=h.querySelector("#cw-bc-cancel"),c=h.querySelector("#cw-bc-close-x"),T=h.querySelector("#cw-bc-send");l.onclick=G,c.onclick=G,T.onclick=j,m.appendChild(h)}function z(l=null){if(!h)return;let c=h.querySelector("#cw-editor-title-label"),T=h.querySelector("#cw-bc-title"),g=h.querySelector("#cw-bc-text"),B=h.querySelector("#cw-bc-send");if(l){o=l.id,c.textContent="Editar Aviso",T.value=l.title||"",g.value=l.text||"",B.textContent="Salvar Altera\xE7\xF5es";let N=l.type||"info",$=h.querySelector(`input[name="cw-bc-type"][value="${N}"]`);$&&$.click()}else{o=null,c.textContent="Novo Aviso",T.value="",g.value="",B.textContent="Publicar";let N=h.querySelector('input[name="cw-bc-type"][value="info"]');N&&N.click()}h.classList.add("active"),setTimeout(()=>T.focus(),300)}function G(){h&&h.classList.remove("active"),o=null}async function j(){let l=h.querySelector("#cw-bc-send"),c=h.querySelector("#cw-bc-title"),T=h.querySelector("#cw-bc-text"),g=h.querySelector('input[name="cw-bc-type"]:checked'),B=g?g.value:"info";if(!c.value.trim()||!T.value.trim()){W("Preencha todos os campos!",{error:!0});return}l.textContent="Salvando...",l.style.opacity="0.7";let N=!1;o?N=await Ae.updateBroadcast(o,{title:c.value,text:T.value,type:B}):N=await Ae.sendBroadcast({title:c.value,text:T.value,type:B,author:window._cwCurrentUser||"admin"}),N?(W(o?"Atualizado!":"Publicado!"),X.playSuccess(),G(),setTimeout(()=>A(),1500)):(W("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),l.textContent=o?"Salvar Altera\xE7\xF5es":"Publicar",l.style.opacity="1")}async function y(l){if(confirm("Confirma a exclus\xE3o deste aviso?"))if(await Ae.deleteBroadcast(l)){W("Aviso removido."),X.playClick();let T=Be.findIndex(g=>g.id===l);T>-1&&Be.splice(T,1),q(),setTimeout(()=>A(),1500)}else W("Erro ao excluir.",{error:!0})}let v=document.createElement("div");v.className="cw-nice-scroll",Object.assign(v.style,i.feedContainer),m.appendChild(v);async function A(){e&&(C.style.display="block",C.innerHTML="\u{1F504} Sincronizando...");try{let l=await Ae.fetchData();l&&l.broadcast&&(Ut(l.broadcast),F(),e&&(q(),C.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{C.style.display="none"},1500)))}catch{e&&(C.innerHTML="\u26A0\uFE0F Offline")}}function F(){let l=document.getElementById("cw-btn-broadcast");if(!l)return;let c=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(Be.some(g=>!c.includes(g.id))){if(l.classList.add("has-new"),!l.querySelector(".cw-badge")){let g=document.createElement("div");g.className="cw-badge",Object.assign(g.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),l.appendChild(g)}}else{l.classList.remove("has-new");let g=l.querySelector(".cw-badge");g&&g.remove()}}function q(){v.innerHTML="";let l=m.querySelector("#cw-bau-widget");l&&l.remove();let c=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),T=[...Be].sort((_,M)=>{let H=new Date(_.date).getTime()||0;return(new Date(M.date).getTime()||0)-H}),g=T.findIndex(_=>_.title&&_.title.toLowerCase().includes("disponibilidade bau"));if(g!==-1){let _=T[g];T.splice(g,1);let M=document.createElement("div");M.id="cw-bau-widget",Object.assign(M.style,i.bauContainer);let H=[],V=(_.text||"").split(`
`),I=/\d{1,2}\/\d{1,2}/;if(V.forEach(le=>{let Z=le.match(I);if(Z){let oe=Z[0],Ce="\u{1F4C5}";/🇧🇷|🇵🇹|PT|BR/i.test(le)?Ce="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(le)&&(Ce="\u{1F1EA}\u{1F1F8}"),H.some(De=>De.flag===Ce&&De.date===oe)||H.push({flag:Ce,date:oe})}}),H.length===0){let le=(_.text||"").match(/\d{1,2}\/\d{1,2}/g);le&&[...new Set(le)].forEach(Z=>H.push({flag:"\u{1F4C5}",date:Z}))}let P="",te='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(te=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${te}
              `),H.length>0?P=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${H.map(Z=>`
                  <div style="${r(i.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${r(i.bauFlag)}">${Z.flag}</span>
                      <span style="${r(i.bauDate)}">${Z.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${te}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${p(_.text)}</div>
              `:P=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${p(_.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,M.innerHTML=`
              <div style="${r(i.bauHeader)}; margin-bottom:8px;">
                  <div style="${r(i.liveIndicator)}">
                      <div style="${r(i.pulseDot)}"></div>
                      <span style="${r(i.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${s(_.date)}</div>
              </div>
              ${P}
          `,C.after(M);let ue=M.querySelector("#cw-bau-toggle-btn"),he=M.querySelector("#cw-bau-full");if(ue&&he&&(ue.onclick=()=>{let le=he.style.display==="none";he.style.display=le?"block":"none",ue.textContent=le?"Ocultar":"Detalhes"}),window._cwIsAdmin){let le=M.querySelector(".cw-bau-edit");le&&(le.onclick=()=>z(_))}}let B=T.sort((_,M)=>{let H=c.includes(_.id),V=c.includes(M.id);return H===V?0:H?1:-1});if(B.length===0&&!g){let _=document.createElement("div");Object.assign(_.style,i.emptyState),_.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,v.appendChild(_)}let N=B.filter(_=>!c.includes(_.id)),$=B.filter(_=>c.includes(_.id));if(N.forEach(_=>v.appendChild(w(_,!1))),$.length>0){let _=document.createElement("div");Object.assign(_.style,i.historyDivider),_.innerHTML=`<span>Hist\xF3rico (${$.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let M=document.createElement("div");Object.assign(M.style,i.historyContainer),$.forEach(V=>M.appendChild(w(V,!0)));let H=!1;_.onclick=()=>{X.playClick(),H=!H,M.style.display=H?"flex":"none",_.querySelector("svg").style.transform=H?"rotate(180deg)":"rotate(0deg)"},v.appendChild(_),v.appendChild(M)}}function w(l,c){let T=document.createElement("div");Object.assign(T.style,c?i.cardHistory:i.card);let g=a[l.type]||a.info,B=document.createElement("div");Object.assign(B.style,i.cardHeader);let N=document.createElement("div");Object.assign(N.style,i.typeTag,{color:g.color,background:g.bg}),N.innerHTML=`${g.icon} <span>${l.type}</span>`;let $=document.createElement("span");if(Object.assign($.style,i.dateTag),$.textContent=s(l.date),B.appendChild(N),c)B.appendChild($);else{let I=document.createElement("button");I.className="cw-btn-interactive",Object.assign(I.style,i.dismissBtn),I.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',I.onmouseenter=()=>{I.style.color="#1e8e3e",I.style.background="#e6f4ea",I.style.borderColor="#1e8e3e"},I.onmouseleave=()=>{I.style.color="#5f6368",I.style.background="#fff",I.style.borderColor="rgba(0,0,0,0.1)"},I.onclick=P=>{P.stopPropagation(),X.playClick(),T.style.transform="translateX(20px)",T.style.opacity="0",setTimeout(()=>{let te=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");te.push(l.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(te)),q(),F()},200)},B.appendChild(I)}let _=document.createElement("div");Object.assign(_.style,i.cardContent);let M=document.createElement("div");Object.assign(M.style,i.msgTitle),M.textContent=l.title;let H=document.createElement("div");Object.assign(H.style,i.msgBody),H.innerHTML=p(l.text);let V=document.createElement("div");if(Object.assign(V.style,i.msgMeta),V.innerHTML=`Publicado por <b>${l.author||"Sistema"}</b>`,c||(V.innerHTML+=` \u2022 ${s(l.date)}`),_.appendChild(M),_.appendChild(H),_.appendChild(V),T.appendChild(B),T.appendChild(_),window._cwIsAdmin){let I=document.createElement("div");I.className="cw-card-actions";let P=document.createElement("button");P.className="cw-action-btn edit",P.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',P.onclick=()=>z(l);let te=document.createElement("button");te.className="cw-action-btn delete",te.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',te.onclick=()=>y(l.id),I.appendChild(P),I.appendChild(te),T.appendChild(I)}return T}let O=Ae.getCachedBroadcasts();O.length>0&&(Ut(O),q()),setTimeout(b,500),A(),n||(n=setInterval(A,tn));let S=document.createElement("div");Object.assign(S.style,et),S.className="no-drag",m.appendChild(S),tt(m,S),document.body.appendChild(m);let L=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),R=Be.some(l=>!L.includes(l.id));return{toggle:d,hasUnread:R}}function Lo(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let t=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],e=0,n={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},o=document.createElement("div");Object.assign(o.style,n.overlay);let s=document.createElement("div");Object.assign(s.style,n.card);let i=document.createElement("div");Object.assign(i.style,n.icon);let a=document.createElement("div");Object.assign(a.style,n.title);let r=document.createElement("div");Object.assign(r.style,n.text);let p=document.createElement("div");Object.assign(p.style,n.dotsContainer);let m=document.createElement("div");Object.assign(m.style,n.btnContainer);let u=document.createElement("button");u.textContent="Pular",Object.assign(u.style,n.btn,n.btnSkip),u.onmouseover=()=>u.style.color="#202124",u.onmouseout=()=>u.style.color="#5f6368";let d=document.createElement("button");d.textContent="Pr\xF3ximo",Object.assign(d.style,n.btn,n.btnNext),d.onmouseover=()=>d.style.transform="scale(1.05)",d.onmouseout=()=>d.style.transform="scale(1)",m.appendChild(u),m.appendChild(d),s.appendChild(i),s.appendChild(a),s.appendChild(r),s.appendChild(p),s.appendChild(m),o.appendChild(s),document.body.appendChild(o);function f(h){let b=t[h];i.textContent=b.icon,a.textContent=b.title,r.textContent=b.text,p.innerHTML="",t.forEach((C,k)=>{let z=document.createElement("div");Object.assign(z.style,n.dot),k===h&&Object.assign(z.style,n.dotActive),p.appendChild(z)}),b.isLast?(u.style.display="none",d.textContent="Come\xE7ar \u{1F680}",d.style.width="100%"):(u.style.display="block",d.textContent="Pr\xF3ximo",d.style.width="auto")}function x(){localStorage.setItem("cw_onboarding_seen_v1","true"),o.style.opacity="0",s.style.transform="translateY(20px)",setTimeout(()=>o.remove(),400),X.playSuccess(),W("Tudo pronto! Use o menu flutuante.")}d.onclick=()=>{X.playClick(),e<t.length-1?(e++,f(e)):x()},u.onclick=()=>{confirm("Pular o tutorial?")&&x()},f(0),requestAnimationFrame(()=>{o.style.opacity="1",s.style.transform="translateY(0)"})}var Mo={version:"v5.0",title:"Atualiza\xE7\xE3o: v5.0 \u{1F680}",slides:[{icon:"\u{1F30D}",title:"Time Zone Traveler",text:"Nunca mais erre o hor\xE1rio! Novo m\xF3dulo visual para monitorar fusos da LATAM & Ib\xE9ria, com planejador de chamadas gr\xE1fico e sistema de favoritos."},{icon:"\u{1F4E2}",title:"Broadcast: Poder para Lideran\xE7a",text:"Agora TLs e Overheads podem enviar comunicados urgentes e avisos de BAU diretamente pela ferramenta. Comunica\xE7\xE3o instant\xE2nea e centralizada."},{icon:"\u{1F91D}",title:"Split & Transfer 2.0",text:"M\xF3dulo de transfer\xEAncia reconstru\xEDdo! Agora com valida\xE7\xE3o de campos, 'Magic Fill' para dados t\xE9cnicos e um fluxo \xE0 prova de erros."},{icon:"\u2728",title:"Nova 'Fluid UI'",text:"A interface agora respira. A 'P\xEDlula' tem f\xEDsica realista, fecha suavemente para n\xE3o atrapalhar e os menus flutuam com efeito Glassmorphism."},{icon:"\u{1F4DD}",title:"Cen\xE1rios Inteligentes",text:"O m\xF3dulo de Notas ganhou novos cen\xE1rios pr\xE9-configurados. Selecione o que aconteceu e a ferramenta escreve o texto t\xE9cnico para voc\xEA."},{icon:"\u{1F517}",title:"Links Redesenhados",text:"A Central de Links est\xE1 mais visual e organizada. Encontre suas ferramentas e dashboards em segundos com a nova busca r\xE1pida."},{icon:"\u{1F41B}",title:"Sua Voz Importa",text:"Adicionamos um atalho especial na aba 'Links' para voc\xEA reportar bugs ou sugerir novas funcionalidades diretamente para n\xF3s."}]};function _o(t){let e=localStorage.getItem("cw_last_version");if(!e){localStorage.setItem("cw_last_version",t);return}e!==t&&on(t)}function on(t){let e=Mo.slides,n=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"400px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(30px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"12px",background:"#E8F0FE",color:"#1967D2",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",marginBottom:"16px",letterSpacing:"0.5px"},icon:{fontSize:"42px",marginBottom:"16px",display:"block"},title:{fontSize:"20px",fontWeight:"700",color:"#202124",marginBottom:"8px"},text:{fontSize:"14px",color:"#5f6368",lineHeight:"1.5",marginBottom:"32px",minHeight:"42px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"6px",marginBottom:"24px"},dot:{width:"6px",height:"6px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"18px",borderRadius:"4px"},btn:{width:"100%",padding:"12px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"all 0.2s",background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},s=document.createElement("div");Object.assign(s.style,o.overlay);let i=document.createElement("div");Object.assign(i.style,o.card);let a=document.createElement("div");Object.assign(a.style,o.badge),a.textContent=`Atualiza\xE7\xE3o ${t}`;let r=document.createElement("div");Object.assign(r.style,o.icon);let p=document.createElement("div");Object.assign(p.style,o.title);let m=document.createElement("div");Object.assign(m.style,o.text);let u=document.createElement("div");Object.assign(u.style,o.dotsContainer);let d=document.createElement("button");Object.assign(d.style,o.btn),d.onmouseover=()=>d.style.transform="scale(1.02)",d.onmouseout=()=>d.style.transform="scale(1)",i.appendChild(a),i.appendChild(r),i.appendChild(p),i.appendChild(m),i.appendChild(u),i.appendChild(d),s.appendChild(i),document.body.appendChild(s);function f(h){let b=e[h];r.textContent=b.icon,p.textContent=b.title,m.textContent=b.text,u.innerHTML="",e.forEach((C,k)=>{let z=document.createElement("div");Object.assign(z.style,o.dot),k===h&&Object.assign(z.style,o.dotActive),u.appendChild(z)}),h===e.length-1?d.textContent="Entendi, vamos l\xE1! \u{1F44D}":d.textContent="Pr\xF3ximo"}function x(){localStorage.setItem("cw_last_version",t),s.style.opacity="0",i.style.transform="translateY(30px)",setTimeout(()=>s.remove(),400),X.playSuccess(),W(`TechSol atualizado para ${t}!`)}d.onclick=()=>{X.playClick(),n<e.length-1?(n++,f(n)):x()},f(0),requestAnimationFrame(()=>{s.style.opacity="1",i.style.transform="translateY(0)"})}var No="cw_timezone_pinned",Wt=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan"}];function Ro(){let t="v2.0 Pro",e=!1,n=null,o="mx",s=JSON.parse(localStorage.getItem(No)||"[]"),i=new Date;i.setHours(14,0,0,0);let a={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",warning:"#E37400",error:"#D93025",night:"#1F2937",day:"#FFF7ED"},r={container:{display:"flex",flexDirection:"column",height:"100%",background:a.bg},tabHeader:{display:"flex",background:a.surface,borderBottom:`1px solid ${a.border}`,padding:"0 4px"},tabBtn:{flex:1,padding:"14px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:a.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease"},tabActive:{color:a.primary,borderBottomColor:a.primary,fontWeight:"600"},listContainer:{padding:"16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"10px"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",background:a.surface,borderRadius:"12px",border:`1px solid ${a.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.04)",transition:"transform 0.2s, box-shadow 0.2s"},hubCardPinned:{borderLeft:`4px solid ${a.primary}`},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"12px",alignItems:"stretch"},timeCard:{flex:1,padding:"16px",borderRadius:"16px",background:a.surface,border:`1px solid ${a.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",position:"relative",overflow:"hidden"},timelineContainer:{position:"relative",height:"48px",marginTop:"8px"},timelineTrack:{position:"absolute",top:"20px",left:"0",right:"0",height:"8px",borderRadius:"4px",background:"#E5E7EB",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.2)",pointerEvents:"none"},hdInput:{fontSize:"24px",fontWeight:"700",color:a.primary,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"monospace",cursor:"pointer"},statusBadge:{padding:"6px 12px",borderRadius:"20px",fontSize:"12px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"6px",marginTop:"12px",alignSelf:"center"}},p=document.createElement("div");p.id="timezone-popup",p.classList.add("cw-module-window"),Object.assign(p.style,Ee,{right:"100px",width:"440px",height:"700px",overflow:"hidden"});let u=Te(p,"Time Zone Traveler",t,"Monitoramento global e planejamento de chamadas.",{popup:p},()=>q());p.appendChild(u);let d=document.createElement("div");Object.assign(d.style,r.container),p.appendChild(d);let f=document.createElement("div");Object.assign(f.style,r.tabHeader);let x=document.createElement("div");x.textContent="Monitoramento",Object.assign(x.style,r.tabBtn,r.tabActive);let h=document.createElement("div");h.textContent="Planejador de Chamada",Object.assign(h.style,r.tabBtn),f.appendChild(x),f.appendChild(h),d.appendChild(f);let b=document.createElement("div");Object.assign(b.style,r.listContainer);let C=document.createElement("div");Object.assign(C.style,r.plannerWrapper,{display:"none"}),d.appendChild(b),d.appendChild(C),x.onclick=()=>k("live"),h.onclick=()=>k("plan");function k(w){X.playClick(),w==="live"?(Object.assign(x.style,r.tabActive),Object.assign(h.style,r.tabBtn),h.style.borderBottomColor="transparent",b.style.display="flex",C.style.display="none",v()):(Object.assign(h.style,r.tabActive),Object.assign(x.style,r.tabBtn),x.style.borderBottomColor="transparent",C.style.display="flex",b.style.display="none",A(),y())}function z(w){return w>=9&&w<17?{color:a.success,label:"Aberto",icon:"\u{1F7E2}"}:w>=8&&w<9?{color:a.warning,label:"Abrindo",icon:"\u{1F7E1}"}:w>=17&&w<19?{color:a.warning,label:"Fechando",icon:"\u{1F7E1}"}:{color:a.error,label:"Fechado",icon:"\u{1F534}"}}function G(w){s.includes(w)?s=s.filter(O=>O!==w):s.push(w),localStorage.setItem(No,JSON.stringify(s)),j(),X.playClick()}function j(){b.innerHTML="";let w=new Date;[...Wt].sort((S,L)=>{let R=s.includes(S.id),l=s.includes(L.id);return R&&!l?-1:!R&&l?1:S.name.localeCompare(L.name)}).forEach(S=>{let L=s.includes(S.id),R=w.toLocaleTimeString("pt-BR",{timeZone:S.zone,hour:"2-digit",minute:"2-digit"}),l=parseInt(R.split(":")[0]),c=z(l),T=l<6||l>18,g=document.createElement("div");Object.assign(g.style,r.hubCard),L&&Object.assign(g.style,r.hubCardPinned);let B=L?"\u2605":"\u2606",N=L?"#F9AB00":"#BDC1C6";g.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn" style="cursor:pointer; font-size:18px; color:${N}; width:24px; text-align:center;">${B}</div>
                    <div style="font-size:28px;">${S.flag}</div>
                    <div>
                        <div style="font-size:14px; font-weight:700; color:${a.text};">${S.name}</div>
                        <div style="font-size:12px; color:${a.textSub}; display:flex; align-items:center; gap:4px;">
                            ${T?"\u{1F319}":"\u2600\uFE0F"} ${S.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:22px; font-weight:700; color:${a.text}; font-family:'Roboto Mono', monospace;">${R}</div>
                    <div style="font-size:11px; font-weight:600; color:${c.color}; display:flex; align-items:center; justify-content:flex-end; gap:4px;">
                        ${c.label} ${c.icon}
                    </div>
                </div>
            `,g.onmouseenter=()=>{g.style.backgroundColor="#F8F9FA"},g.onmouseleave=()=>{g.style.backgroundColor=a.surface};let $=g.querySelector(".cw-pin-btn");$.onclick=_=>{_.stopPropagation(),G(S.id)},g.onclick=()=>{o=S.id,k("plan")},b.appendChild(g)})}function y(){C.innerHTML="";let w=document.createElement("div"),O=document.createElement("label");O.textContent="Planejar com:",O.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase;";let S=document.createElement("select");Object.assign(S.style,ht),Wt.forEach(P=>{let te=document.createElement("option");te.value=P.id,te.textContent=`${P.flag} ${P.name} (${P.zone})`,P.id===o&&(te.selected=!0),S.appendChild(te)}),S.onchange=P=>{o=P.target.value,I()},w.appendChild(O),w.appendChild(S),C.appendChild(w);let L=document.createElement("div");Object.assign(L.style,r.timeComparisonRow);let R=document.createElement("div");Object.assign(R.style,r.timeCard),R.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase;">\u{1F1E7}\u{1F1F7} Seu Hor\xE1rio</div>
            <input type="time" id="cw-time-input-br" style="${F(r.hdInput)}">
            <div style="font-size:11px; color:#5F6368;">Hor\xE1rio de Bras\xEDlia</div>
        `;let l=document.createElement("div");Object.assign(l.style,r.timeCard),l.style.backgroundColor="#F8F9FA",l.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase;">Cliente</div>
            <div id="cw-time-display-client" style="${F(r.hdInput)}; color:#202124;">--:--</div>
            <div id="cw-client-label" style="font-size:11px; color:#5F6368;">...</div>
        `,L.appendChild(R),L.appendChild(l),C.appendChild(L);let c=document.createElement("div");c.id="cw-planner-status",Object.assign(c.style,r.statusBadge),C.appendChild(c);let T=document.createElement("div");Object.assign(T.style,{padding:"0 8px"});let g=document.createElement("div");g.textContent="Arraste para simular o hor\xE1rio:",g.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:8px;";let B=document.createElement("div");Object.assign(B.style,r.timelineContainer);let N=document.createElement("div");Object.assign(N.style,r.timelineTrack);let $=document.createElement("input");$.type="range",$.min="0",$.max="1439",$.step="15",$.style.cssText="position:absolute; top:14px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let _=document.createElement("div");_.style.cssText="position:absolute; top:32px; width:100%; display:flex; justify-content:space-between; font-size:10px; color:#9AA0A6; padding:0 2px;",_.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>23h</span>",B.appendChild(N),B.appendChild($),B.appendChild(_),T.appendChild(g),T.appendChild(B),C.appendChild(T);let M=R.querySelector("#cw-time-input-br"),H=l.querySelector("#cw-time-display-client"),V=l.querySelector("#cw-client-label");function I(){let P=Wt.find(oe=>oe.id===o);V.textContent=`${P.flag} ${P.label} (${P.zone})`;let te=i.getHours(),ue=i.getMinutes(),he=`${String(te).padStart(2,"0")}:${String(ue).padStart(2,"0")}`;M.value=he,$.value=te*60+ue;let le=i.toLocaleTimeString("pt-BR",{timeZone:P.zone,hour:"2-digit",minute:"2-digit"});H.textContent=le;let Z=parseInt(le.split(":")[0]);Z>=9&&Z<17?(c.style.background="#E6F4EA",c.style.color="#137333",c.innerHTML="\u2705 Hor\xE1rio Comercial Ideal"):Z>=8&&Z<9||Z>=17&&Z<19?(c.style.background="#FEF7E0",c.style.color="#B06000",c.innerHTML="\u26A0\uFE0F Hor\xE1rio Limite (Aten\xE7\xE3o)"):(c.style.background="#FCE8E6",c.style.color="#C5221F",c.innerHTML="\u26D4 Fora de Hor\xE1rio (Noite/Fechado)")}$.oninput=P=>{let te=parseInt(P.target.value);i.setHours(Math.floor(te/60)),i.setMinutes(te%60),I()},M.oninput=P=>{let[te,ue]=P.target.value.split(":");te&&ue&&(i.setHours(parseInt(te)),i.setMinutes(parseInt(ue)),I())},I()}function v(){j(),n||(n=setInterval(j,6e4))}function A(){n&&(clearInterval(n),n=null)}function F(w){return Object.entries(w).map(([O,S])=>`${O.replace(/[A-Z]/g,L=>"-"+L.toLowerCase())}:${S}`).join(";")}function q(){e=!e,ke(e,p,"cw-btn-timezone"),e?k("live"):A()}return document.body.appendChild(p),q}function nn(){if(window.techSolInitialized){Gt();return}window.techSolInitialized=!0;let t="v5.0";console.log(`\u{1F680} TechSol Suite Initializing (${t})...`);try{io();try{X.initGlobalListeners(),X.playStartup()}catch(r){console.warn("\xC1udio bloqueado:",r)}Ae.fetchTips(),Gt();let e=Eo(),n=To(),o=Oo(),s=qo(),i=Ro(),a=Fo();xo({toggleNotes:e,toggleEmail:n,toggleScript:o,toggleLinks:s,toggleTimezone:i,broadcastControl:a}),setTimeout(()=>{Ae.logEvent("App","Start","Session Start"),Lo(),setTimeout(()=>{_o(t)},500)},2500)}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),W("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}nn();})();
