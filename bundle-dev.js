(()=>{var mt="",gt="",Xt=t=>new Promise(e=>setTimeout(e,t));async function Kt(){if(mt&&gt)return mt;try{let t=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!t)return"Agente";t.click(),await Xt(150);let e="Consultor",n=document.querySelector("profile-details .name");if(n)e=n.textContent.trim().split(" ")[0],e=e.charAt(0).toUpperCase()+e.slice(1).toLowerCase();else{let s=document.querySelector("profile-details img");if(s&&s.src.includes("/photos/")){let i=s.src.match(/\/photos\/([^\?]+)/)[1];e=i.charAt(0).toUpperCase()+i.slice(1)}}let o=document.querySelector("profile-details .email");return o&&(gt=o.textContent.trim(),console.log("TechSol: Identidade confirmada ->",gt)),t.click(),document.body.click(),mt=e,e}catch(t){return console.warn("Sherlock falhou:",t),"Consultor"}}function Mt(){return mt||"Consultor"}function Qt(){return gt||null}function Zt(t){let e=new Date,n=e.getHours(),o=e.getDay(),s="Ol\xE1",i="";n>=5&&n<12?(s="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):n>=12&&n<18?(s="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(s="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let a=[];n>=0&&n<5?a=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:n<12?o===1?a=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:o===5?a=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:a=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:n<18?a=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:a=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(o===0||o===6)&&(a=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let r=a[Math.floor(Math.random()*a.length)];return{prefix:`${s},`,name:t,suffix:r,icon:i,isFriday:o===5}}async function Lo(){try{let e=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!e)return null;let n=e.parentElement,o=n.querySelector(".unmask-button")||n.querySelector('[aria-label="Click to view"]');o&&(o.click(),await Xt(500));let i=Array.from(n.querySelectorAll("a, span, div, pii-value")).find(a=>{let r=a.innerText.trim();return r.includes("@")&&!r.includes("Is this:")&&r.toLowerCase()!=="email"});return i?i.innerText.trim():null}catch(t){return console.warn("Erro ao capturar email do cliente:",t),null}}function Fo(){try{let t=document.querySelector('material-input[debug-id="account-id-input"]');if(t){let e=t.querySelector("input");if(e){let n=e.value.trim();if(n)return n.includes("@")?n:`${n}@google.com`}}}catch(t){console.warn("Erro ao capturar email interno:",t)}return null}async function it(){let t="Cliente",e="[INSERIR URL]";try{let i=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(i&&i.nextElementSibling){let a=i.nextElementSibling.innerText.trim();a&&(t=a)}}catch(s){console.warn("Falha Nome:",s)}try{let i=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(i&&i.nextElementSibling){let a=i.nextElementSibling.innerText.trim();a&&(e=a)}}catch(s){console.warn("Falha URL:",s)}let n=await Lo(),o=Fo();return{advertiserName:t,websiteUrl:e,clientEmail:n,internalEmail:o,agentName:Mt()}}var Ue=null,_t=null,Ne=.3;function $e(){if(!Ue){let t=window.AudioContext||window.webkitAudioContext;t&&(Ue=new t)}return Ue&&Ue.state==="suspended"&&Ue.resume(),Ue}function Jt(t){if(_t)return _t;let e=t.sampleRate*2,n=t.createBuffer(1,e,t.sampleRate),o=n.getChannelData(0);for(let s=0;s<e;s++)o[s]=Math.random()*2-1;return _t=n,n}var te={playClick:()=>{let t=$e();if(!t)return;let e=t.currentTime,n=t.createBufferSource();n.buffer=Jt(t);let o=t.createBiquadFilter();o.type="highpass",o.frequency.value=4e3;let s=t.createGain();s.gain.setValueAtTime(Ne*.8,e),s.gain.exponentialRampToValueAtTime(.001,e+.015),n.connect(o),o.connect(s),s.connect(t.destination),n.start(e),n.stop(e+.02)},playHover:()=>{let t=$e();if(!t)return;let e=t.currentTime,n=t.createOscillator();n.type="sine",n.frequency.setValueAtTime(400,e);let o=t.createGain();o.gain.setValueAtTime(0,e),o.gain.linearRampToValueAtTime(Ne*.1,e+.005),o.gain.linearRampToValueAtTime(0,e+.02),n.connect(o),o.connect(t.destination),n.start(e),n.stop(e+.03)},playSuccess:()=>{let t=$e();if(!t)return;let e=t.currentTime;[1046.5,1567.9].forEach((o,s)=>{let i=t.createOscillator(),a=t.createGain();i.type="sine",i.frequency.value=o,a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(Ne*.6,e+.05),a.gain.exponentialRampToValueAtTime(.001,e+.6),i.connect(a),a.connect(t.destination),i.start(e),i.stop(e+.7)})},playGenieOpen:()=>{let t=$e();if(!t)return;let e=t.currentTime,n=t.createBufferSource();n.buffer=Jt(t);let o=t.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(100,e),o.frequency.exponentialRampToValueAtTime(800,e+.2);let s=t.createGain();s.gain.setValueAtTime(0,e),s.gain.linearRampToValueAtTime(Ne*.5,e+.05),s.gain.linearRampToValueAtTime(0,e+.25),n.connect(o),o.connect(s),s.connect(t.destination),n.start(e),n.stop(e+.3)},playError:()=>{let t=$e();if(!t)return;let e=t.currentTime,n=t.createOscillator(),o=t.createGain();n.type="triangle",n.frequency.setValueAtTime(120,e),n.frequency.exponentialRampToValueAtTime(80,e+.1),o.gain.setValueAtTime(Ne,e),o.gain.exponentialRampToValueAtTime(.001,e+.15),n.connect(o),o.connect(t.destination),n.start(e),n.stop(e+.2)},playStartup:()=>{let t=$e();if(!t)return;let e=t.currentTime,n=.12,o=t.createOscillator(),s=t.createGain(),i=t.createBiquadFilter();o.type="square",o.frequency.setValueAtTime(400,e),o.frequency.exponentialRampToValueAtTime(50,e+.1),i.type="lowpass",i.frequency.setValueAtTime(800,e),i.frequency.exponentialRampToValueAtTime(100,e+.1),s.gain.setValueAtTime(Ne*4,e),s.gain.exponentialRampToValueAtTime(.001,e+.1),o.connect(i),i.connect(s),s.connect(t.destination),o.start(e),o.stop(e+.12);let a=t.createOscillator(),r=t.createGain();a.type="sine",a.frequency.setValueAtTime(150,e),a.frequency.exponentialRampToValueAtTime(50,e+.15),r.gain.setValueAtTime(Ne*1.5,e),r.gain.exponentialRampToValueAtTime(.001,e+.15),a.connect(r),r.connect(t.destination),a.start(e),a.stop(e+.15),[55,55.4,110.5].forEach(c=>{let b=t.createOscillator(),l=t.createGain(),f=t.createBiquadFilter();b.type="sawtooth",b.frequency.value=c,f.type="lowpass",f.frequency.setValueAtTime(30,e),f.frequency.linearRampToValueAtTime(900,e+n+.2),f.frequency.exponentialRampToValueAtTime(40,e+3),l.gain.setValueAtTime(0,e),l.gain.linearRampToValueAtTime(Ne*.6,e+n+.1),l.gain.exponentialRampToValueAtTime(.001,e+3.5),b.connect(f),f.connect(l),l.connect(t.destination),b.start(e),b.stop(e+3.6)})},playNotification:()=>{let t=$e();if(!t)return;let e=t.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(o=>{let s=t.createOscillator(),i=t.createGain();s.type="sine",s.frequency.setValueAtTime(o.freq,e),i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(Ne*o.vol,e+.004),i.gain.exponentialRampToValueAtTime(.001,e+o.dur),s.connect(i),i.connect(t.destination),s.start(e),s.stop(e+o.dur+.1)})},playSwoosh:()=>{te.playGenieOpen()},playReset:()=>{te.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let t=0,e=50;document.addEventListener("mouseover",n=>{if(!Ue)return;let o=n.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!o||o.contains(n.relatedTarget))return;let s=Date.now();s-t<e||(te.playHover(),t=s)},{passive:!0})}};var eo=1e4;function oo(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let t=document.createElement("link");t.id="google-font-roboto",t.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",t.rel="stylesheet",document.head.appendChild(t);let e=document.createElement("style");e.id="techsol-global-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function $(t,e={}){let n=document.createElement("div"),o=e.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(n.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:o,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),n.textContent=t,document.body.appendChild(n),e.error?te.playError():te.playSuccess(),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>n.remove(),400)},e.duration||4e3)}function no(t,e=null){let n=0,o=0,s=0,i=0,a=e||t;a.style.cursor="grab",a.onmousedown=r;function r(b){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(b.target.tagName)||b.target.closest(".no-drag"))return;b=b||window.event,a.style.cursor="grabbing",t.style.transition="none";let l=t.getBoundingClientRect();t.style.transform="none",t.style.left=l.left+"px",t.style.top=l.top+"px",t.style.margin="0",t.style.bottom="auto",t.style.right="auto",eo++,t.style.zIndex=eo,s=b.clientX,i=b.clientY,t.setAttribute("data-dragging","true"),document.onmouseup=c,document.onmousemove=p}function p(b){b=b||window.event,b.preventDefault(),n=s-b.clientX,o=i-b.clientY,s=b.clientX,i=b.clientY;let l=t.offsetTop-o,f=t.offsetLeft-n,g=16,m=window.innerWidth,O=window.innerHeight,M=t.offsetWidth,D=t.offsetHeight;f<g?f=g:f+M>m-g&&(f=m-M-g),l<g?l=g:l+D>O-g&&(l=O-D-g),t.style.top=l+"px",t.style.left=f+"px"}function c(){document.onmouseup=null,document.onmousemove=null,a.style.cursor="grab",setTimeout(()=>{t.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",t.setAttribute("data-dragging","false"),t.setAttribute("data-moved","true")},50)}}var Te={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var Lt={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},ao={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var io={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var ye={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var Nt=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],to=-1;function st(){let t=Math.floor(Math.random()*Nt.length);return t===to&&(t=(t+1)%Nt.length),to=t,Nt[t]}var Le=t=>new Promise(e=>setTimeout(e,t));async function Ro(t,e){if(!t)return;t.style.opacity="1",t.innerHTML='<span class="cursor">|</span>';let n=t.querySelector(".cursor");await Le(200);for(let o=0;o<e.length;o++){let s=e.charAt(o),i=document.createElement("span");i.textContent=s,n&&n.parentNode===t?n.before(i):t.appendChild(i);let a=Math.floor(Math.random()*60)+30;o===0&&(a=150),o>e.length-3&&(a=30),await Le(a)}await Le(600),n&&(n.style.display="none")}async function Ft(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let e=document.createElement("style");e.id="google-splash-style",e.innerHTML=`
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
    `,document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1");try{await Le(200);let e=await Kt(),n=Zt(e),o=t.querySelector("#w-icon"),s=t.querySelector("#p1"),i=t.querySelector("#p2"),a=t.querySelector("#p3"),r=t.querySelector("#p-sextou");o&&(o.innerHTML=n.icon),s&&(s.textContent=n.prefix),a&&(a.textContent=n.suffix),await Le(300);let p=o?o.querySelector("svg"):null;if(p&&(p.style.opacity="1",p.style.transform="scale(1)"),await Le(400),s&&(s.style.opacity="1"),te.playStartup(),i&&await Ro(i,n.name),a&&(a.style.opacity="1",a.style.transform="translateY(0)"),n.isFriday&&r){await Le(400),r.style.display="block",r.offsetWidth;let c=r.querySelector(".sextou-badge");c&&(c.style.opacity="1",c.style.transform="scale(1)")}await Le(1500)}catch(e){console.warn("Splash error, skipping...",e)}finally{t.classList.add("splash-exit"),await Le(900),t.parentNode&&t.parentNode.removeChild(t)}}var Ze={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Je(t,e){e.onmousedown=n;function n(o){o.stopPropagation(),o.preventDefault();let s=t.style.transition;t.style.transition="none";let i=o.clientX,a=o.clientY,r=parseFloat(getComputedStyle(t,null).getPropertyValue("width").replace("px","")),p=parseFloat(getComputedStyle(t,null).getPropertyValue("height").replace("px","")),c=i,b=a,l=!1;function f(O){c=O.clientX,b=O.clientY,l||(window.requestAnimationFrame(()=>{g(),l=!1}),l=!0)}function g(){let O=r+(c-i),M=p+(b-a);O>360&&(t.style.width=O+"px"),M>300&&(t.style.height=M+"px")}function m(){document.removeEventListener("mousemove",f),document.removeEventListener("mouseup",m),setTimeout(()=>{t.style.transition=s},50)}document.addEventListener("mousemove",f),document.addEventListener("mouseup",m)}e.onmouseenter=()=>e.style.opacity="1",e.onmouseleave=()=>e.style.opacity="0.6"}function so(t){if(!t)return"";let e={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return t.replace(/:([a-zA-Z0-9-_+]+):/g,n=>e[n]?e[n]:"")}var et=t=>new Promise(e=>setTimeout(e,t));function rt(t){t&&["mousedown","mouseup","click"].forEach(e=>t.dispatchEvent(new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window})))}var ro="cw-automation-styles";if(!document.getElementById(ro)){let t=document.createElement("style");t.id=ro,t.innerHTML=`
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
    `,document.head.appendChild(t)}function lo(t){let e=document.getElementById("cw-loading-overlay");t?e?e.style.opacity="1":(e=document.createElement("div"),e.id="cw-loading-overlay",document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1")):e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}async function co(t){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let e=document.getElementById(t),n="";lo(!0),e&&(n=e.placeholder,e.placeholder="Buscando ID...",e.value="",e.classList.add("cw-scanning-active"));try{let o=document.querySelector('material-button[debug-id="dock-item-case-log"]');o&&!o.classList.contains("selected")&&(rt(o),await et(1200));let s=document.querySelector("search-filter dropdown-button .button");if(s&&!(s.innerText||"").includes("All")){rt(s),await et(600);let f=document.querySelector('material-checkbox[debug-id="check-all-box"]');f&&f.getAttribute("aria-checked")!=="true"&&(rt(f),await et(300));let g=document.querySelector('material-button[debug-id="apply-filter"]');g&&(rt(g),await et(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await et(500));let a=Array.from(document.querySelectorAll(".message-header"));for(let l=a.length-1;l>=0;l--){let f=a[l],g=f.querySelector("i.material-icons-extended"),m=g&&g.innerText.trim()==="phone_in_talk",O=f.innerText||"",M=O.includes("Agent joined")||O.includes("outbound-call")||O.includes("Speakeasy");if(m||M){f.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",f),e&&(e.placeholder="Lendo mensagem..."),rt(f),await et(1e3));break}}let p=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),c=/Speakeasy.*?(P\d{15,25})/i,b=null;for(let l=p.length-1;l>=0;l--){let f=p[l];if(f.offsetParent===null)continue;let g=(f.innerText||"").match(c);if(g&&g[1]){b=g[1];break}}if(e)if(b){try{await navigator.clipboard.writeText(b)}catch{}e.value=b,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),te.playSuccess(),$(`ID Localizado: ${b}`),e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}else te.playError(),$("Nenhum ID encontrado.",{error:!0}),e.placeholder="N\xE3o encontrado",e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}catch(o){console.error("Erro na automa\xE7\xE3o:",o),$("Erro ao processar.",{error:!0})}finally{e&&(e.classList.remove("cw-scanning-active"),e.value||(e.placeholder=n)),lo(!1)}}var Fe={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:"}},Ge={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},lt={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>Substatus:</b> DC - Other<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br>Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},We={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},ct=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],Rt=["CONSIDERACOES","COMENTARIOS"],ke={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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
    `;let a=i.querySelector(".cw-close-btn");a.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&a.click()},25e3)}async function ft(t,e){if(!t||!e)return;t.focus(),t.value="",t.dispatchEvent(new Event("input",{bubbles:!0})),await be(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),await be(100),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function Dt(){let e=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(n=>{let o=n.offsetParent!==null,s=n.closest("case-message-view")!==null,i=n.closest(".editor")!==null||n.closest("write-card")!==null;return o&&!s&&i});return e&&ve("Editor visualmente detectado.","success"),e}async function po(){ve("\u{1F680} FASE 1: Tentando abrir a janela de email...");let t=!1,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(l=>l.innerText.trim()==="email");if(n&&n.offsetParent!==null){ve("Bot\xE3o de email direto encontrado.");let l=n.closest("material-button")||n.closest("material-fab")||n;Oe(l),t=!0}else{ve("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let l=document.querySelector("material-fab-speed-dial");if(l){let f=l.querySelector(".trigger");if(f){Oe(f),await be(800);let m=Array.from(document.querySelectorAll("i.material-icons-extended")).find(O=>O.innerText.trim()==="email");m&&(Oe(m),t=!0)}}}if(!t)return $("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;ve("\u{1F680} FASE 2: Verificando rascunhos...");let o=null,s=0,i=20;for(;s<i;){await be(250);let l=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(o=Array.from(l).find(f=>f.offsetParent!==null),o){ve("\u26A0\uFE0F Rascunho detectado!","warn");break}s++}if(o){ve("\u{1F5D1}\uFE0F Descartando..."),Oe(o),o.click();let l=null,f=0;for(;f<15;){await be(300);let g=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(l=Array.from(g).find(m=>m.offsetParent!==null),l)break;f++}l&&(Oe(l),$("Limpando rascunho antigo...",{duration:2e3}),await be(2500))}ve("\u{1F680} FASE 3: Buscando editor final...");let a=0,r=null;for(;a<20&&(r=Dt(),!r);)await be(250),a++;if(!r)return $("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let p=r.closest('[id="email-body-content-top"]'),b=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(p){if(b){let f=b.closest('[aria-hidden="true"]');f&&f.removeAttribute("aria-hidden"),b.focus(),Oe(b)}await be(300),p.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let l=p.querySelector("#cases-body-field");if(l){let f=document.createRange();f.selectNodeContents(l),f.collapse(!0);let g=window.getSelection();g.removeAllRanges(),g.addRange(f)}return!0}return!1}async function ht(t){if(!t||!await po())return;let n=await it();ve("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let o=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(o&&(o.click(),await be(600)),n.clientEmail&&n.clientEmail!=="N/A"&&n.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await ft(i,n.clientEmail),bt(i,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(n.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await ft(i,n.internalEmail),bt(i,`
                <strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.
                <div style="margin-top:4px;">
                    <a href="https://mail.google.com/mail/u/0?ui=2&ik=ed23fb3167&attid=0.1&permmsgid=msg-f:1843445102914241244&th=19953b8dda2302dc&view=fimg&fur=ip&permmsgid=msg-f:1843445102914241244&sz=s0-l75-ft&attbid=ANGjdJ9m7O33cM36sxBYohVD6Qsapyux4PNr8qmTBlZ8zkp_LR79suGZhnxFJtBoFDeyMFygsH_tvCts5fnX0WV4rdClw9YqqR7guLnaXU9UzmZRRMRXEoC7T_MPbwo&disp=emb&realattid=ii_mfmv7wjm1&zw" target="_blank" style="color:#1a73e8;text-decoration:none;font-weight:500;display:inline-flex;align-items:center;">
                        Consultar Regra <span style="font-size:14px;margin-left:2px;">\u2197</span>
                    </a>
                </div>
            `))}await be(500);let s=document.querySelector('material-button[debug-id="canned_response_button"]');if(s){Oe(s),await be(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){Oe(i),document.execCommand("insertText",!1,t),i.dispatchEvent(new Event("input",{bubbles:!0})),ve("\u23F3 Buscando resultado da Canned Response...","info");let a=null,r=0,p=15e3,c=500;for(;r<p&&(a=document.querySelector("material-select-dropdown-item"),!a);)await be(c),r+=c;if(a){Oe(a),await be(1500);let b=Dt();if(b&&n.advertiserName){let l=b.innerHTML;l.includes("{%ADVERTISER_NAME%}")&&(b.innerHTML=l.replace(/{%ADVERTISER_NAME%}/g,n.advertiserName))}$("Canned Response aplicada!")}else ve(`\u274C Timeout: Resultado '${t}' n\xE3o apareceu ap\xF3s 15s.`,"error"),$(`Timeout: Template '${t}' n\xE3o carregou.`,{error:!0})}}else $("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function uo(t){if(ve(`\u{1F680} Iniciando Quick Email: ${t.name}`),!await po())return;let n=await it(),o=Mt();await be(600),ve("\u{1F4E7} Processando destinat\xE1rios...");let s=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(s&&(s.click(),await be(600)),n.clientEmail&&n.clientEmail!=="N/A"&&n.clientEmail!=="N/A (Bloqueado)"){let r=document.querySelector('input[aria-label="Enter To email address"]');r&&(await ft(r,n.clientEmail),bt(r,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(n.internalEmail){let r=document.querySelector('input[aria-label="Enter Bcc email address"]');r&&(await ft(r,n.internalEmail),bt(r,`
                <strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.
                <div style="margin-top:4px;">
                    <a href="https://mail.google.com/mail/u/0?ui=2&ik=ed23fb3167&attid=0.1&permmsgid=msg-f:1843445102914241244&th=19953b8dda2302dc&view=fimg&fur=ip&permmsgid=msg-f:1843445102914241244&sz=s0-l75-ft&attbid=ANGjdJ9m7O33cM36sxBYohVD6Qsapyux4PNr8qmTBlZ8zkp_LR79suGZhnxFJtBoFDeyMFygsH_tvCts5fnX0WV4rdClw9YqqR7guLnaXU9UzmZRRMRXEoC7T_MPbwo&disp=emb&realattid=ii_mfmv7wjm1&zw" target="_blank" style="color:#1a73e8;text-decoration:none;font-weight:500;display:inline-flex;align-items:center;">
                        Consultar Regra <span style="font-size:14px;margin-left:2px;">\u2197</span>
                    </a>
                </div>
            `))}let i=document.querySelector('input[aria-label="Subject"]');i&&t.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,t.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await be(300));let a=Dt();if(a){let p=(a.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');p&&(p.focus(),Oe(p));let c=new Date;c.setDate(c.getDate()+3);let b=c.getDay();b===6?c.setDate(c.getDate()+2):b===0&&c.setDate(c.getDate()+1);let l=c.toLocaleDateString("pt-BR"),f=t.body;f=f.replace(/\[Nome do Cliente\]/g,n.advertiserName||"Cliente"),f=f.replace(/\[INSERIR URL\]/g,n.websiteUrl||"seu site"),f=f.replace(/\[URL\]/g,n.websiteUrl||"seu site"),f=f.replace(/\[Seu Nome\]/g,o),f=f.replace(/\[MM\/DD\/YYYY\]/g,l),document.execCommand("insertHTML",!1,f),p&&(p.dispatchEvent(new Event("input",{bubbles:!0})),p.dispatchEvent(new Event("change",{bubbles:!0}))),$("Email preenchido com sucesso!",{duration:2e3}),ve("\u2705 Processo finalizado com sucesso.","success")}else $("Erro ao focar no editor.",{error:!0})}var Do={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},mo={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function Ie(t,e,n,o,s,i){let a=document.createElement("div");Object.assign(a.style,Do),no(t,a);let r=document.createElement("div");Object.assign(r.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),a.appendChild(r),s&&(s.googleLine=r);let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center",gap:"12px"});let c=document.createElement("img");c.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(c.style,{width:"20px",height:"20px",pointerEvents:"none"});let b=document.createElement("span");b.textContent=e,p.appendChild(c),p.appendChild(b);let l=document.createElement("div");Object.assign(l.style,{display:"flex",alignItems:"center",gap:"4px"});let f='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',g='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',m=document.createElement("div");m.innerHTML=f,Object.assign(m.style,mo),m.title="Sobre & Feedback",m.classList.add("no-drag"),m.onmouseenter=()=>{m.style.background="rgba(255,255,255,0.1)",m.style.color="#FFF"},m.onmouseleave=()=>{m.style.color!=="rgb(138, 180, 248)"&&(m.style.background="transparent",m.style.color="#9AA0A6")};let O=document.createElement("div");O.innerHTML=g,Object.assign(O.style,mo),O.title="Fechar",O.classList.add("no-drag"),O.onmouseenter=()=>{O.style.background="rgba(242, 139, 130, 0.2)",O.style.color="#F28B82"},O.onmouseleave=()=>{O.style.background="transparent",O.style.color="#9AA0A6"},O.onmousedown=D=>D.stopPropagation(),m.onmousedown=D=>D.stopPropagation(),O.onclick=i;let M=Go(t,e,n,o);return m.onclick=D=>{D.stopPropagation(),M.style.opacity==="1"?(M.style.opacity="0",M.style.pointerEvents="none",m.style.color="#9AA0A6",m.style.background="transparent"):(M.style.opacity="1",M.style.pointerEvents="auto",m.style.color="#8AB4F8",m.style.background="rgba(138, 180, 248, 0.1)")},l.appendChild(m),l.appendChild(O),a.appendChild(p),a.appendChild(l),a}function Go(t,e,n,o){let s=document.createElement("div");return Object.assign(s.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),s.innerHTML=`
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
    `,document.head.appendChild(t)}function qe(t,e,n){let o=document.getElementById(n);if(!e)return;let s=e.getAttribute("data-moved")==="true",i={x:0,y:0};if(o){let b=o.getBoundingClientRect();i.x=b.left+b.width/2,i.y=b.top+b.height/2}let a,r;if(!s)a=window.innerWidth/2,r=window.innerHeight/2;else{let b=e.getBoundingClientRect();a=b.left+b.width/2,r=b.top+b.height/2,a===0&&r===0&&(a=window.innerWidth/2,r=window.innerHeight/2)}let p=i.x-a,c=i.y-r;t?(te.playGenieOpen(),e.style.transition="none",e.style.opacity="0",e.style.pointerEvents="auto",s?e.style.transform=`translate(${p}px, ${c}px) scale(0.05)`:e.style.transform=`translate(calc(-50% + ${p}px), calc(-50% + ${c}px)) scale(0.05)`,e.offsetWidth,requestAnimationFrame(()=>{e.classList.add("open"),o&&o.classList.add("active"),e.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",e.style.opacity="1",s?e.style.transform="translate(0, 0) scale(1)":e.style.transform="translate(-50%, -50%) scale(1)"}),typeof go=="function"&&go(e,n)):(te.playSwoosh(),e.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",e.style.pointerEvents="none",requestAnimationFrame(()=>{e.style.opacity="0",s?e.style.transform=`translate(${p}px, ${c}px) scale(0.1)`:e.style.transform=`translate(calc(-50% + ${p}px), calc(-50% + ${c}px)) scale(0.1)`}),setTimeout(()=>{e.classList.remove("open"),o&&o.classList.remove("active"),e.style.transition="",e.style.transform=""},300),typeof Gt=="function"&&Gt(e))}function go(t,e){Gt(t);let n=o=>{if(!t.classList.contains("open"))return;let s=t.contains(o.target),i=document.querySelector(".cw-pill"),a=i&&i.contains(o.target);s?(t.classList.remove("idle"),t.style.zIndex="2147483648"):a||(t.classList.add("idle"),t.style.zIndex="2147483646")};t._idleHandler=n,document.addEventListener("mousedown",n)}function Gt(t){t._idleHandler&&(document.removeEventListener("mousedown",t._idleHandler),t._idleHandler=null)}var zo="https://script.google.com/a/macros/google.com/s/AKfycbysAGOgn40LEQ1uJIppENtTGNSRscLRQkGA96UPYTDDbA0c_KhVUwDQ-Do8ZQ7lQizo/exec",zt="cw_data_broadcast",bo="cw_data_tips",Bo=["Processando...","Mantenha o foco!","Aguarde..."];function Bt(t,e={}){return new Promise((n,o)=>{let s="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script");window[s]=p=>{document.body.contains(i)&&document.body.removeChild(i),delete window[s],n(p)};let a=Object.keys(e).map(p=>encodeURIComponent(p)+"="+encodeURIComponent(e[p])).join("&"),r=`${zo}?op=${t}&callback=${s}&t=${Date.now()}&${a}`;i.src=r,i.onerror=()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[s],o(new Error("JSONP Error (Check Corp Login)"))},document.body.appendChild(i)})}var we={fetchTips:async()=>{try{let t=await Bt("tips");t?.tips&&localStorage.setItem(bo,JSON.stringify(t.tips))}catch(t){console.warn("Tips offline",t)}},fetchData:async()=>{try{let t=await Bt("broadcast");if(t?.broadcast)return localStorage.setItem(zt,JSON.stringify(t.broadcast)),t}catch(t){console.warn("Broadcast offline",t)}return{broadcast:JSON.parse(localStorage.getItem(zt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(zt)||"[]"),getRandomTip:()=>{let t=Bo,e=localStorage.getItem(bo);if(e)try{t=JSON.parse(e)}catch{}return t[Math.floor(Math.random()*t.length)]},sendBroadcast:async t=>{let e={...t,date:new Date().toISOString(),id:Date.now().toString()};return await we._performOp("new_broadcast",e)},updateBroadcast:async(t,e)=>{let n={id:t,...e};return await we._performOp("update_broadcast",n)},deleteBroadcast:async t=>await we._performOp("delete_broadcast",{id:t}),_performOp:async(t,e)=>{try{console.log(`\u{1F4E4} Executando ${t}...`,e);let n=await Bt(t,e);return n&&n.status==="success"?(console.log("\u2705 Sucesso:",t),!0):(console.warn("\u26A0\uFE0F Falha:",n),!1)}catch(n){return console.error("\u274C Erro JSONP:",n),!1}},logUsage:()=>{}};var pe={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00"},xt=t=>new Promise(e=>setTimeout(e,t));function fo(t){let e="cw-command-center-style";if(!document.getElementById(e)){let g=document.createElement("style");g.id=e,g.innerHTML=`
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
        `,document.head.appendChild(g)}let n={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>'},o=document.createElement("div");o.className="cw-pill side-right",o.innerHTML=`
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
    `;let s=document.createElement("div");if(s.className="cw-focus-backdrop",document.body.appendChild(s),document.body.appendChild(o),o.querySelector(".notes").onclick=g=>{g.stopPropagation(),t.toggleNotes()},o.querySelector(".email").onclick=g=>{g.stopPropagation(),t.toggleEmail()},o.querySelector(".script").onclick=g=>{g.stopPropagation(),t.toggleScript()},o.querySelector(".links").onclick=g=>{g.stopPropagation(),t.toggleLinks()},o.querySelector(".broadcast").onclick=g=>{g.stopPropagation();let m=g.currentTarget.querySelector(".cw-badge");m&&(m.style.transform="scale(0)",setTimeout(()=>m.remove(),200)),t.broadcastControl&&t.broadcastControl.toggle()},t.broadcastControl&&t.broadcastControl.hasUnread){let g=document.createElement("div");g.className="cw-badge",o.querySelector(".broadcast").appendChild(g)}(async function(){await xt(2800),o.classList.add("docked"),await xt(300);let m=o.querySelectorAll(".cw-btn");o.querySelectorAll(".cw-sep").forEach(O=>O.classList.add("visible"));for(let O=0;O<m.length;O++)m[O].classList.add("popped"),await xt(90);await xt(200),o.classList.add("system-check")})();let i=!1,a,r,p,c,b=3;o.onmousedown=g=>{if(g.target.closest("button"))return;g.preventDefault(),a=g.clientX,r=g.clientY;let m=o.getBoundingClientRect();p=m.left,c=m.top,document.addEventListener("mousemove",l),document.addEventListener("mouseup",f)};function l(g){let m=g.clientX-a,O=g.clientY-r;!i&&Math.sqrt(m*m+O*O)>b&&(i=!0,o.style.transition="none"),i&&(o.style.left=`${p+m}px`,o.style.top=`${c+O}px`,o.style.right="auto",o.style.bottom="auto",o.style.transform="none")}function f(g){if(document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",f),i){i=!1,o.style.transition="left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s ease";let m=window.innerWidth,O=window.innerHeight,M=o.getBoundingClientRect(),D=M.left+M.width/2,G;D<m/2?(G=24,o.classList.remove("side-right"),o.classList.add("side-left")):(G=m-M.width-24,o.classList.remove("side-left"),o.classList.add("side-right"));let Q=M.top;Q<24&&(Q=24),Q>O-M.height-24&&(Q=O-M.height-24),o.style.left=`${G}px`,o.style.top=`${Q}px`}else{let m=g.target.closest("button");m&&(m.style.transform="scale(0.9)",setTimeout(()=>m.style.transform="",150))}}}function yt(){let t=document.querySelector(".cw-pill"),e=document.querySelector(".cw-focus-backdrop");if(!t)return()=>{};window._CW_ABORT_PROCESS=!1;let n=document.createElement("div");n.className="cw-center-stage",n.innerHTML=`
        <div class="cw-center-dots"><span></span><span></span><span></span></div>
        <div class="cw-center-text">${we.getRandomTip()}</div>
        <div class="cw-center-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
    `;let o=document.createElement("div");o.className="cw-abort-btn",o.textContent="Cancelar",o.onclick=i=>{i.stopPropagation(),window._CW_ABORT_PROCESS=!0,$("Cancelado! Mas a nota foi copiada para a \xE1rea de transfer\xEAncia.",{duration:4e3}),n.remove(),t.classList.remove("processing-center"),t.classList.remove("success"),e&&e.classList.remove("active")},n.appendChild(o),t.appendChild(n);let s=Date.now();return t.classList.add("processing-center"),e&&e.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!t.contains(n))return;let a=Date.now()-s,r=Math.max(0,2e3-a);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!t.contains(n))return;let p=n.querySelector(".cw-center-dots"),c=n.querySelector(".cw-center-text"),b=n.querySelector(".cw-center-success"),l=n.querySelector(".cw-abort-btn");p&&(p.style.display="none"),c&&(c.style.display="none"),l&&(l.style.display="none"),b&&b.classList.add("show"),t.classList.add("success"),setTimeout(()=>{t.classList.remove("processing-center"),setTimeout(()=>{n.remove(),t.classList.remove("success"),e&&e.classList.remove("active")},400)},1e3)},r)}}function ho(t){let e=document.createElement("div");e.className="cw-step-scenarios";let n=document.createElement("div");Object.assign(n.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let o=document.createElement("div");Object.assign(o.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"40px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s ease"}),o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>";let s=null;Object.entries(ke).forEach(([a,r])=>{let p=document.createElement("div");p.textContent=a,Object.assign(p.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",display:"flex",alignItems:"center",gap:"6px"}),p.onmouseenter=()=>{s!==r&&(o.style.background="#fff",o.style.borderColor="#1a73e8",o.style.color="#202124",o.textContent=`"${r.substring(0,120)}${r.length>120?"...":""}"`),s!==r&&(p.style.background="#f1f3f4")},p.onmouseleave=()=>{s!==r&&(s||(o.style.background="#f8f9fa",o.style.borderColor="#dadce0",o.style.color="#5f6368",o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>"),p.style.background="#ffffff")},p.onclick=()=>{te.playClick(),s===r?(s=null,i(),t("")):(s=r,i(),p.style.transform="scale(0.95)",setTimeout(()=>p.style.transform="scale(1)",150),t(r))},n.appendChild(p)});function i(){Array.from(n.children).forEach(a=>{ke[a.textContent]===s?(a.style.background="#e8f0fe",a.style.borderColor="#1a73e8",a.style.color="#1967d2",a.style.fontWeight="500"):(a.style.background="#ffffff",a.style.borderColor="#dadce0",a.style.color="#3c4043",a.style.fontWeight="400")})}return e.appendChild(n),e.appendChild(o),e}var xo=t=>new Promise(e=>setTimeout(e,t));function vt(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>t.dispatchEvent(new MouseEvent(n,e)))}function dt(t){let e=document.createElement("div");e.style.position="fixed",e.style.left="-9999px",e.innerHTML=t,document.body.appendChild(e);let n=document.createRange();n.selectNodeContents(e);let o=window.getSelection();o.removeAllRanges(),o.addRange(n);try{document.execCommand("copy")}catch{$("Falha ao copiar",{error:!0})}o.removeAllRanges(),document.body.removeChild(e)}function wt(t){["input","change","keydown","keyup"].forEach(n=>{let o=new Event(n,{bubbles:!0,cancelable:!0});t.dispatchEvent(o)})}function yo(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function At(){console.log("Iniciando processo de Nova Nota...");let t=yo(),e=t.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(a=>a.innerText.trim()==="description");if(o){let a=o.closest("material-fab")||o.closest("material-button");a?(a.style&&(a.style.display="block",a.style.visibility="visible"),vt(a)):vt(o)}else{let a=document.querySelector("material-fab-speed-dial");if(a){let r=a.querySelector(".trigger");r?(r.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),vt(r)):a.click(),await xo(800);let c=Array.from(document.querySelectorAll("i.material-icons-extended")).find(b=>b.innerText.trim()==="description");c&&vt(c)}}let s=null,i=0;for(;!s&&i<20;){await xo(300);let a=yo();if(a.length>e)s=a.find(r=>!t.includes(r)),s||(s=a[a.length-1]);else if(i>10){let r=a.filter(p=>p.offsetParent!==null);r.length>0&&(s=r[r.length-1])}i++}return s}var J={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},Me="cubic-bezier(0.25, 0.8, 0.25, 1)",Po={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${J.border}`,backgroundColor:J.bgInput,fontSize:"14px",color:J.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${Me}, box-shadow 0.2s ${Me}, background-color 0.2s`,outline:"none"},Cn={...Po,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},Sn={fontSize:"13px",fontWeight:"700",color:J.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},En={display:"block",fontSize:"13px",fontWeight:"600",color:J.text,marginBottom:"8px",marginTop:"16px"},Tn={fontSize:"12px",color:J.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},kn={fontSize:"12px",color:J.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},On={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:J.text,cursor:"pointer",padding:"12px 14px",backgroundColor:J.surface,border:`1px solid ${J.border}`,borderRadius:"12px",transition:`all 0.2s ${Me}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},Pt={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:J.primary},In={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:J.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${Me}, box-shadow 0.2s ${Me}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},qn={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${J.primary}`,color:J.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${Me}`},Mn={background:"transparent",border:`1px solid ${J.border}`,borderRadius:"20px",color:J.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${Me}`,fontFamily:"'Google Sans', 'Roboto'"};var _n={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:J.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},Nn={fontSize:"13px",fontWeight:"700",color:J.primary,minWidth:"20px",textAlign:"center"},Ln={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${J.border}`,backgroundColor:J.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${Me}, box-shadow 0.2s ${Me}`},Fn={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${J.bgInput}`},Rn={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${J.border}`,backgroundColor:J.surface,color:J.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${Me}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},Dn={backgroundColor:J.primaryBg,color:J.primary,borderColor:J.primary,fontWeight:"600"},Gn={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:J.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},zn={borderTop:`1px solid ${J.bgInput}`,paddingTop:"20px",marginTop:"16px"};var Bn={maxHeight:"240px",overflowY:"auto",border:`1px solid ${J.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:J.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},Pn={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${J.bgInput}`,cursor:"pointer",fontSize:"13px",color:J.text,transition:"background 0.1s",userSelect:"none"};var jo={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},Ho={fontSize:"12px",color:"#e37400",marginTop:"4px"},Vo={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},$o={display:"flex",gap:"15px",marginBottom:"10px"};function vo(){let t=document.createElement("div");t.id="tag-support-container",Object.assign(t.style,jo);let e=document.createElement("label");e.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(e.style,Lt,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,$o);let o=document.createElement("input");o.type="radio",o.name="ts_usage_mod",o.value="Sim",Object.assign(o.style,Pt);let s=document.createElement("label");s.textContent="Sim";let i=document.createElement("div");Object.assign(i.style,{display:"flex",alignItems:"center"}),i.appendChild(o),i.appendChild(s);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="N\xE3o",a.checked=!0,Object.assign(a.style,Pt);let r=document.createElement("label");r.textContent="N\xE3o";let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center"}),p.appendChild(a),p.appendChild(r),n.appendChild(i),n.appendChild(p);let c=document.createElement("div");c.style.display="block";let b=document.createElement("label");b.textContent="Qual foi o Motivo?",Object.assign(b.style,Lt,{fontSize:"12px"});let l=document.createElement("input");l.type="text",Object.assign(l.style,Vo);let f=document.createElement("div");f.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(f.style,Ho),c.appendChild(b),c.appendChild(l),c.appendChild(f),t.appendChild(e),t.appendChild(n),t.appendChild(c),o.onchange=()=>{c.style.display="none"},a.onchange=()=>{c.style.display="block"};function g(M,D){if(t.style.display="none",!M||M.includes("Education")||!D||D.length===0)return;let G=D.some(I=>I.includes("enhanced")||I==="ec_google_ads"),Q=D.some(I=>(I.includes("conversion")||I.includes("ads"))&&!I.includes("enhanced")),ne=D.some(I=>I.includes("ga4")||I.includes("analytics")||I.includes("ua")),E=D.some(I=>I.includes("merchant")||I.includes("gmc")||I.includes("shopping"));(G||Q&&!ne&&!E)&&(t.style.display="block")}function m(){if(t.style.display==="none")return"";let M=`<br><b>Utilizou Tag Support?</b> ${o.checked?"Sim":"N\xE3o"}`;return a.checked&&l.value.trim()!==""&&(M+=`<br><b>Motivo:</b> ${l.value}`),M+="<br>",M}function O(){t.style.display="none",a.checked=!0,o.checked=!1,c.style.display="block",l.value=""}return{element:t,updateVisibility:g,getOutput:m,reset:O}}var Y={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Ye={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function wo(t){let e={},n="implementation";function o(E){let w=E.toLowerCase();return w.includes("ads")||w.includes("conversion")||w.includes("remarketing")?Y.brands.ads:w.includes("ga4")||w.includes("analytics")?Y.brands.ga4:w.includes("gtm")||w.includes("tag manager")||w.includes("container")?Y.brands.gtm:w.includes("merchant")||w.includes("shopping")||w.includes("feed")?Y.brands.gmc:Y.brands.default}let s=Object.entries(Ge).filter(([E,w])=>w.popular),i={};Object.entries(Ge).forEach(([E,w])=>{if(w.popular)return;let I=o(w.name);i[I.label]||(i[I.label]={brand:I,tasks:[]}),i[I.label].tasks.push({key:E,...w})});let a="cw-zen-tasks";if(!document.getElementById(a)){let E=document.createElement("style");E.id=a,E.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column; height: 100%; width: calc(100% + 32px); margin: -16px;
                font-family: ${Y.font}; background: ${Y.bg}; position: relative; overflow: hidden;
            }
            
            /* SCROLL AREA */
            .cw-zen-content { flex: 1; overflow-y: auto; padding-bottom: 80px; } /* Espa\xE7o para o Status Bar */

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${Y.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${Y.white}; 
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
                font-size: 12px; font-weight: 500; color: ${Y.textMain}; line-height: 1.2; 
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
                color: ${Y.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${Y.border}; border-radius: 10px; background: ${Y.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${Y.blue}; box-shadow: 0 0 0 3px ${Y.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${Y.border}; border-radius: 10px; background: ${Y.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${Y.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${Y.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${Y.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${Y.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${Y.blueLight}; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${Y.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${Y.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${Y.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${Y.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${Y.border};
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${Y.shadowFloat}; z-index: 10;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${Y.textMain}; }
            
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
                font-family: ${Y.font}; font-size: 15px; font-weight: 600; color: ${Y.textMain};
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
                border-color: ${Y.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${Y.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${Y.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${Y.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 10px; font-weight: 700; color: ${Y.textSub};
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
        `,document.head.appendChild(E)}let r=document.createElement("div");r.className="cw-zen-container";let p=document.createElement("div");Object.assign(p.style,{display:"none"});let c=document.createElement("div");c.className="cw-screens-container",p.appendChild(c),r.innerHTML=`
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
    `;let b=r.querySelector(".cw-hero-grid"),l=r.querySelector(".cw-acc-container"),f=r.querySelector(".cw-results-container"),g=r.querySelector(".cw-search-input"),m=r.querySelector(".cw-status-bar"),O=r.querySelector(".cw-status-text"),M=r.querySelector(".cw-footer-icons");s.forEach(([E,w])=>{let I=o(w.name),T=document.createElement("div");T.className="cw-hero-card",T.id=`hero-${E}`,T.style.setProperty("--hero-color",I.color),T.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${Ye[I.icon]}</div>
                <div class="cw-hero-label">${w.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,T.onclick=k=>{if(k.target.closest(".cw-step-btn"))return;let h=e[E]?e[E].count:0;G(E,h>0?-h:1,w)},T.querySelector(".minus").onclick=()=>G(E,-1,w),T.querySelector(".plus").onclick=()=>G(E,1,w),T.dataset.color=I.color,b.appendChild(T)});function D(E,w){let I=o(w.name),T=document.createElement("div");return T.className="cw-task-item",T.dataset.id=E,T.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${I.bg}; color:${I.color}">
                    ${Ye[I.icon]||Ye.default}
                </div>
                <div class="cw-task-label">${w.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,T.onclick=k=>{if(k.target.closest(".cw-step-btn"))return;let h=e[E]?e[E].count:0;G(E,h>0?-h:1,w)},T.querySelector(".minus").onclick=()=>G(E,-1,w),T.querySelector(".plus").onclick=()=>G(E,1,w),T}Object.entries(i).forEach(([E,w])=>{let I=document.createElement("div");I.className="cw-acc-group";let T=document.createElement("div");T.className="cw-acc-header",T.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${w.brand.color}"></div>
                ${E}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,T.onclick=()=>{l.querySelectorAll(".cw-acc-group.open").forEach(h=>{h!==I&&h.classList.remove("open")}),I.classList.toggle("open")};let k=document.createElement("div");k.className="cw-acc-body",w.tasks.forEach(h=>{let R=D(h.key,h);k.appendChild(R)}),I.appendChild(T),I.appendChild(k),l.appendChild(I)});function G(E,w,I){e[E]||(e[E]={count:0,data:I,brand:o(I.name)}),e[E].count+=w,e[E].count<=0&&delete e[E],Q(),ne(),t&&t()}function Q(){s.forEach(([k])=>{let h=b.querySelector(`#hero-${k}`);if(!h)return;let R=e[k];R?(h.classList.add("active"),h.querySelector(".cw-step-val").textContent=R.count,h.querySelector(".cw-step-val").style.color=h.dataset.color):h.classList.remove("active")}),r.querySelectorAll(".cw-task-item").forEach(k=>{let h=k.dataset.id,R=e[h];R?(k.classList.add("selected"),k.querySelector(".cw-step-val").textContent=R.count):k.classList.remove("selected")});let w=Object.keys(e),I=0,T=[];if(w.forEach(k=>{let h=e[k];I+=h.count;for(let R=0;R<h.count;R++)T.length<6&&T.push(h.brand)}),I>0){m.classList.add("visible");let k=I>1?"A\xE7\xF5es":"A\xE7\xE3o",h=I>1?"definidas":"definida";O.textContent=`${I} ${k} ${h}`,M.innerHTML="",T.forEach(R=>{let A=document.createElement("div");A.className="cw-mini-icon",A.innerHTML=Ye[R.icon]||Ye.default;let v=A.querySelector("svg");v&&(v.style.width="14px",v.style.height="14px"),M.appendChild(A)})}else m.classList.remove("visible")}g.addEventListener("input",E=>{let w=E.target.value.toLowerCase();if(w.length>0){l.style.display="none",f.style.display="block",f.innerHTML="";let I=!1;Object.entries(Ge).forEach(([T,k])=>{if(k.name.toLowerCase().includes(w)){I=!0;let h=D(T,k);e[T]&&(h.classList.add("selected"),h.querySelector(".cw-step-val").textContent=e[T].count),f.appendChild(h)}}),I||(f.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else l.style.display="block",f.style.display="none"});function ne(){c.innerHTML="";let E=Object.keys(e),w=!1,I=document.getElementById("sub-status"),T="implementation";if(I&&I.value.toLowerCase().includes("education")&&(T="education"),E.length===0){c.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}if(E.length===0){c.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}let k=document.createElement("div");k.className="cw-info-banner",k.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Todos os Screenshots s\xE3o baseados na descri\xE7\xE3o do 
                <a href="https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/" target="_blank" class="cw-info-link">Win Criteria</a>.
            </span>
        `,c.appendChild(k),E.forEach(h=>{let R=e[h].data,A=e[h].count,v=e[h].brand,B=R.screenshots?R.screenshots[T]||[]:["Link da Evid\xEAncia"];if(B.length>0){w=!0;for(let d=1;d<=A;d++){let C=document.createElement("div");C.className="cw-screen-card",C.style.setProperty("--brand-color",v.color),C.style.setProperty("--brand-bg",v.bg),C.style.setProperty("--brand-shadow",v.color+"40");let S=document.createElement("div");S.className="cw-card-header";let u=document.createElement("div");u.className="cw-card-icon",u.innerHTML=Ye[v.icon]||Ye.default;let x=document.createElement("div");x.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let q=document.createElement("input");q.className="cw-card-title-input",q.id=`name-${h}-${d}`,q.value=`${R.name}${A>1?" #"+d:""}`,q.title="Clique para renomear esta task";let j=document.createElement("span");j.className="cw-edit-hint",j.innerHTML="\u270E Renomear",x.appendChild(q),x.appendChild(j),S.appendChild(u),S.appendChild(x),C.appendChild(S),B.forEach((F,N)=>{let z=document.createElement("div");z.className="cw-input-group";let U=document.createElement("label");U.className="cw-input-label",U.textContent=F.replace(/📷|:|•/g,"").trim();let _=document.createElement("input");_.className="cw-input-field",_.id=`screen-${h}-${d}-${N}`,_.placeholder="Cole o link aqui...",_.setAttribute("autocomplete","off"),_.addEventListener("input",()=>{_.value.trim().length>5?_.classList.add("filled"):_.classList.remove("filled")});let H=document.createElement("div");H.className="cw-input-check",H.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',z.appendChild(U),z.appendChild(_),z.appendChild(H),C.appendChild(z)}),c.appendChild(C)}}}),p.style.display=w?"block":"none"}return{selectionElement:r,screenshotsElement:p,updateSubStatus:()=>ne(),getCheckedElements:()=>Object.keys(e).map(E=>({value:E,closest:()=>({querySelector:()=>({textContent:e[E].count})})})),toggleTask:(E,w=!0)=>{let I=e[E];w&&!I?G(E,1,Ge[E]):!w&&I&&G(E,-I.count,Ge[E])},setMode:E=>{n=E,ne()},reset:()=>{for(let E in e)delete e[E];g.value="",l.style.display="block",f.style.display="none",Q(),ne()}}}function Ao(t){let e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden;";let n=document.createElement("div");n.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px;";let o={sectionTitle:`
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
        `};function s(v,B,d="text",C=""){let S=document.createElement("div");S.style.cssText=o.inputWrapper;let u=document.createElement("label");u.style.cssText=o.label,u.textContent=B;let x;d==="textarea"?(x=document.createElement("textarea"),x.style.cssText=o.input+o.textarea):(x=document.createElement("input"),x.type=d,x.style.cssText=o.input);let q=x.style.cssText;return x.onfocus=()=>x.style.cssText=q+o.inputFocus,x.onblur=()=>x.style.cssText=q,x.id=`st-${v}`,x.placeholder=C,S.appendChild(u),S.appendChild(x),{wrapper:S,input:x}}function i(v,B){let d=document.createElement("div"),C=document.createElement("label");C.style.cssText=o.label,C.textContent=B,d.appendChild(C);let S=document.createElement("div");return S.style.cssText=o.radioGroup,["Yes","No"].forEach(u=>{let x=document.createElement("label");x.style.cssText=o.radioLabel;let q=document.createElement("input");q.type="radio",q.name=`st-${v}`,q.value=u==="Yes"?"Y":"N",q.style.display="none",u==="No"&&(q.checked=!0),x.onmousedown=()=>x.style.transform="scale(0.96)",x.onmouseup=()=>x.style.transform="scale(1)",x.onmouseleave=()=>x.style.transform="scale(1)",x.appendChild(q),x.appendChild(document.createTextNode(u)),q.addEventListener("change",()=>{S.querySelectorAll("label").forEach(j=>j.style.cssText=o.radioLabel),q.checked&&(x.style.cssText=o.radioLabel+o.radioActive)}),u==="No"&&(x.style.cssText=o.radioLabel+o.radioActive),S.appendChild(x)}),d.appendChild(S),{wrapper:d}}let a=document.createElement("div");a.style.cssText=o.banner,a.innerHTML=`
        <span style="font-size: 18px;">\u26A0\uFE0F</span>
        <div>
            <div style="font-weight:700; margin-bottom:4px;">Processo Cr\xEDtico</div>
            Antes de transferir, verifique o <a href="https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o" target="_blank" style="color:#B06000; text-decoration:underline;">SOP de Out of Scope</a> e consulte um <a href="http://go/webao-help-deluxe" target="_blank" style="color:#B06000; text-decoration:underline;">SME</a>.
        </div>
    `,n.appendChild(a);let r=document.createElement("button");r.style.cssText=o.magicBtn,r.innerHTML='<span style="font-size:16px">\u2728</span> Preencher Automaticamente',r.onmouseover=()=>r.style.backgroundColor="#F8F9FA",r.onmouseout=()=>r.style.backgroundColor="#FFFFFF",r.onmousedown=()=>r.style.transform="scale(0.98)",r.onmouseup=()=>r.style.transform="scale(1)",n.appendChild(r);let p=document.createElement("div");p.style.cssText=o.sectionTitle,p.style.marginTop="24px",p.innerHTML="<span>\u{1F6E0}\uFE0F</span> Dados T\xE9cnicos",n.appendChild(p);let c=s("cid","Ads CID","text","000-000-0000"),b=s("ga4","GA4 ID"),l=s("gtm","GTM ID"),f=i("access","Advertiser has access to GA4/GTM?"),g=s("access-email","If Yes, User Email"),m=i("ghost","Ghosting Access Available?");n.append(c.wrapper,b.wrapper,l.wrapper,f.wrapper,g.wrapper,m.wrapper);let O=document.createElement("div");O.style.cssText=o.sectionTitle,O.innerHTML="<span>\u{1F4DE}</span> Contato & Problema",n.appendChild(O);let M=s("name","Name of Advertiser"),D=s("url","Website Address"),G=s("phone","Phone Number"),Q=s("email","Email Address"),ne=s("callback","Preferred Call Back Time (w/ Timezone)"),E=s("desc","Detailed Issue Description","textarea","Descreva o problema t\xE9cnico em detalhes..."),w=s("checks","Checks Performed by Tech Team","textarea","Liste o troubleshooting j\xE1 realizado..."),I=s("screens","Uncropped Screenshots (Links)","textarea","https://...");n.append(M.wrapper,D.wrapper,G.wrapper,Q.wrapper,ne.wrapper,E.wrapper,w.wrapper,I.wrapper);let T=document.createElement("div");T.style.cssText=o.sectionTitle,T.innerHTML="<span>\u{1F4E7}</span> Contatos para C\xF3pia (CC)",n.appendChild(T);let k=s("c-adv","Advertiser Contact"),h=s("c-am","Account Manager");n.append(k.wrapper,h.wrapper);let R=document.createElement("div");R.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.9); backdrop-filter: blur(8px); border-top: 1px solid #E0E0E0; display: flex; justify-content: flex-end; position: absolute; bottom: 0; width: 100%; box-sizing: border-box; z-index: 100;";let A=document.createElement("button");return A.textContent="Gerar Nota S&T",A.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 24px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 6px rgba(26, 115, 232, 0.3); transition: transform 0.1s, box-shadow 0.2s;",A.onmousedown=()=>{A.style.transform="scale(0.96)",A.style.boxShadow="0 1px 3px rgba(26, 115, 232, 0.2)"},A.onmouseup=()=>{A.style.transform="scale(1)",A.style.boxShadow="0 2px 6px rgba(26, 115, 232, 0.3)"},R.appendChild(A),e.appendChild(n),e.appendChild(R),r.onclick=async()=>{r.innerHTML='<span style="font-size:16px">\u23F3</span> Buscando...';let v=await it();v.advertiserName&&(M.input.value=v.advertiserName),v.websiteUrl&&(D.input.value=v.websiteUrl),v.clientEmail&&(Q.input.value=v.clientEmail,k.input.value=v.clientEmail);let d=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);d&&(c.input.value=d[0]),r.innerHTML='<span style="font-size:16px; color:#188038">\u2705</span> Dados Preenchidos!',r.style.background="#E6F4EA",r.style.borderColor="#188038",setTimeout(()=>{r.innerHTML='<span style="font-size:16px">\u2728</span> Preencher Automaticamente',r.style.background="#FFFFFF",r.style.borderColor="#DADCE0"},2e3),$("Dados capturados com sucesso!")},A.onclick=async()=>{let v=u=>{let x=e.querySelector(`#st-${u}`);return x?x.value:""},B=u=>{let x=e.querySelector(`input[name="st-${u}"]:checked`);return x?x.value:"N"},C=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${v("cid")}
<b>GA4 ID:</b> ${v("ga4")}
<b>GTM ID:</b> ${v("gtm")}
<b>Advertiser has access to either GA4 or GTM (Y/N):</b> ${B("access")}
<b>If Yes, user access email to GA4/GTM:</b> ${v("access-email")}
<b>Ghosting Access Available (Y/N):</b> ${B("ghost")}
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

<b>Additional Comments:</b> (Optional)`.replace(/\n/g,"<br>");dt(C);let S=await At();S?(S.innerText.trim()===""&&(S.innerHTML=""),document.execCommand("insertHTML",!1,C),wt(S),$("Nota S&T inserida!")):$("Copiado! Abra uma nota para colar.")},e}function Co(){let t="v3.7.0 (S&T Mode)",e="bau",n="pt",o=!1,s=!1,i=!1,a={input:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},textarea:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease",height:"100px",resize:"vertical"},h3:{fontSize:"14px",fontWeight:"600",color:"#202124",margin:"0 0 12px 0"},label:{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},checkboxLabel:{display:"flex",alignItems:"center",marginBottom:"10px",fontSize:"14px",fontWeight:"400",cursor:"pointer",padding:"8px",background:"#f8f9fa",borderRadius:"6px",transition:"background-color 0.2s ease, box-shadow 0.2s ease",userSelect:"none"},checkboxInput:{width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"},buttonBase:{flex:"1 1 0",padding:"10px 0",color:"#fff",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"500",cursor:"pointer",marginTop:"16px"},stepBlock:{borderTop:"1px solid #eee",paddingTop:"12px",marginTop:"12px"},radioContainer:{display:"flex",gap:"15px",marginBottom:"10px"},optionalBtn:{width:"100%",padding:"10px",background:"white",border:"1px dashed #1a73e8",color:"#1a73e8",borderRadius:"6px",cursor:"pointer",fontWeight:"500",fontSize:"13px",marginBottom:"10px",transition:"all 0.2s"},helpLink:{fontSize:"12px",color:"#1a73e8",textDecoration:"none",cursor:"pointer",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"color 0.2s"}},r=vo(),p=wo(()=>{let V=p.getCheckedElements().map(L=>L.value);u&&u.value&&r.updateVisibility(u.value,V)}),c=document.createElement("div");c.id="autofill-popup",c.classList.add("cw-module-window"),Object.assign(c.style,Te,{right:"100px",width:"400px",transition:"width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)"});let b={popup:c,googleLine:null},l=Ie(c,"Case Notes",t,"Gera notas padronizadas.",b,()=>qt());c.appendChild(l);let f=l.lastElementChild;if(f){let y=document.createElement("div");y.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',Object.assign(y.style,{width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease",marginLeft:"4px"}),y.title="Alternar para Split & Transfer",y.onmouseenter=()=>{y.style.background="rgba(255,255,255,0.1)",y.style.color="#FFF"},y.onmouseleave=()=>{i||(y.style.background="transparent",y.style.color="#9AA0A6")},y.onclick=V=>{V.stopPropagation(),M(y)},f.insertBefore(y,f.firstChild)}let g=document.createElement("div");Object.assign(g.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1"}),c.appendChild(g);let m=document.createElement("div");Object.assign(m.style,{flexGrow:"1",display:"none",overflow:"hidden"});let O=Ao(()=>M());m.appendChild(O),c.appendChild(m);function M(y){i=!i,i?(g.style.display="none",m.style.display="flex",b.googleLine&&(b.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)"),y&&(y.style.color="#C58AF9",y.style.background="rgba(197, 138, 249, 0.15)")):(g.style.display="block",m.style.display="none",b.googleLine&&(b.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"),y&&(y.style.color="#9AA0A6",y.style.background="transparent"))}let D=document.createElement("div");D.textContent="created by lucaste@",Object.assign(D.style,io),c.appendChild(D);let G=document.createElement("div");G.id="step-lang-type";let Q=document.createElement("label");Object.assign(Q.style,a.label),G.appendChild(Q);let ne=document.createElement("div");Object.assign(ne.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let E=document.createElement("div");E.textContent="Portugu\xEAs",E.classList.add("no-drag"),Object.assign(E.style,ye);let w=document.createElement("div");w.textContent="Espa\xF1ol",w.classList.add("no-drag"),Object.assign(w.style,ye),E.onclick=()=>Tt("pt"),w.onclick=()=>Tt("es"),ne.appendChild(E),ne.appendChild(w),G.appendChild(ne),g.appendChild(G);let I=document.createElement("div");I.id="step-0-case-type";let T=document.createElement("label");Object.assign(T.style,a.label),I.appendChild(T);let k=document.createElement("div");Object.assign(k.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let h=document.createElement("div");h.textContent="BAU",h.classList.add("no-drag"),Object.assign(h.style,ye);let R=document.createElement("div");R.textContent="LM",R.classList.add("no-drag"),Object.assign(R.style,ye),h.onclick=()=>Et("bau"),R.onclick=()=>Et("lm"),k.appendChild(h),k.appendChild(R),I.appendChild(k),g.appendChild(I);let A=document.createElement("div");A.id="step-1-selection";let v=document.createElement("label");v.className="cw-input-label",v.textContent="Status Principal";let B=document.createElement("select");B.id="main-status",B.className="cw-select",B.innerHTML=`
      <option value="" disabled selected hidden>Selecione uma op\xE7\xE3o...</option>
      <option value="NI">NI - Need Info</option>
      <option value="SO">SO - Solution Offered</option>
      <option value="IN">IN - Inactive</option>
      <option value="AS">AS - Assigned</option>
      <option value="DC">DC - Discard</option>
  `;let d=document.createElement("div");d.style.cssText="display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; margin-bottom: 6px;";let C=document.createElement("label");C.className="cw-input-label",C.textContent="Sub-status",C.style.marginBottom="0";let S=document.createElement("a");S.href="https://seu-link-do-guia-aqui.com",S.target="_blank",S.className="cw-info-link",S.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; transform:translateY(1px)"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Guia de Substatus',Object.assign(S.style,a.helpLink),d.appendChild(C),d.appendChild(S);let u=document.createElement("select");u.id="sub-status",u.className="cw-select",u.disabled=!0,u.innerHTML='<option value="" disabled selected hidden>Aguardando status principal...</option>',A.appendChild(v),A.appendChild(B),A.appendChild(d),A.appendChild(u),g.appendChild(A);let x=document.createElement("div");x.id="step-1-1-portugal",Object.assign(x.style,a.stepBlock,{display:"none"});let q=document.createElement("label");Object.assign(q.style,a.label),x.appendChild(q);let j=document.createElement("div");Object.assign(j.style,a.radioContainer);let F=document.createElement("div");Object.assign(F.style,{display:"flex",alignItems:"center"});let N=document.createElement("input");N.type="radio",N.name="portugal-group",N.value="sim",Object.assign(N.style,a.checkboxInput);let z=document.createElement("label");z.htmlFor="portugal-sim",Object.assign(z.style,{cursor:"pointer"}),F.appendChild(N),F.appendChild(z);let U=document.createElement("div");Object.assign(U.style,{display:"flex",alignItems:"center"});let _=document.createElement("input");_.type="radio",_.name="portugal-group",_.value="nao",_.checked=!0,Object.assign(_.style,a.checkboxInput);let H=document.createElement("label");H.htmlFor="portugal-nao",Object.assign(H.style,{cursor:"pointer"}),U.appendChild(_),U.appendChild(H),j.appendChild(F),j.appendChild(U),x.appendChild(j),g.appendChild(x);function de(y){o=y,y?ae.style.display="block":ae.style.display="none"}N.onchange=()=>de(!0),_.onchange=()=>de(!1);let ae=document.createElement("div");ae.id="step-1-2-consent",Object.assign(ae.style,a.stepBlock,{display:"none"});let ie=document.createElement("label");Object.assign(ie.style,a.label),ae.appendChild(ie);let ce=document.createElement("div");Object.assign(ce.style,a.radioContainer);let fe=document.createElement("div");Object.assign(fe.style,{display:"flex",alignItems:"center"});let Se=document.createElement("input");Se.type="radio",Se.name="consent-group",Se.value="Sim",Se.checked=!0,Object.assign(Se.style,a.checkboxInput);let _e=document.createElement("label");_e.htmlFor="consent-sim",Object.assign(_e.style,{cursor:"pointer"}),fe.appendChild(Se),fe.appendChild(_e);let tt=document.createElement("div");Object.assign(tt.style,{display:"flex",alignItems:"center"});let Re=document.createElement("input");Re.type="radio",Re.name="consent-group",Re.value="N\xE3o",Object.assign(Re.style,a.checkboxInput);let pt=document.createElement("label");pt.htmlFor="consent-nao",Object.assign(pt.style,{cursor:"pointer"}),tt.appendChild(Re),tt.appendChild(pt),ce.appendChild(fe),ce.appendChild(tt),ae.appendChild(ce),g.appendChild(ae);let Be=document.createElement("div");Be.id="step-1-5-snippets",Object.assign(Be.style,a.stepBlock,{display:"none"});let ut=document.createElement("h3");Object.assign(ut.style,a.h3),ut.textContent="Cen\xE1rios Comuns";let Ee=ho(y=>{let V=document.querySelector("textarea");V&&(V.value=y,V.dispatchEvent(new Event("input")),V.style.transition="background-color 0.2s",V.style.backgroundColor="#e8f0fe",setTimeout(()=>V.style.backgroundColor="#fff",300))});Ee.id="snippet-container",Be.appendChild(ut),Be.appendChild(Ee),g.appendChild(Be);let Ae=document.createElement("div");Ae.id="step-3-form",Object.assign(Ae.style,a.stepBlock,{display:"none"});let St=document.createElement("h3");Object.assign(St.style,a.h3),Ae.appendChild(St);let De=document.createElement("div");De.id="dynamic-form-fields-container",Ae.appendChild(De);let he=document.createElement("button");he.textContent="+ Gostaria de selecionar uma task?",Object.assign(he.style,a.optionalBtn),he.onmouseover=()=>he.style.background="#e8f0fe",he.onmouseout=()=>he.style.background="white",he.onclick=()=>{he.style.display="none",Pe.style.display="block",p.selectionElement.style.display="block"};let Pe=document.createElement("h3");Object.assign(Pe.style,a.h3,{marginTop:"20px"});let Vt=p.selectionElement;Object.assign(Vt.style,{marginBottom:"20px"}),Ae.appendChild(he),Ae.appendChild(Pe),Ae.appendChild(Vt),Ae.appendChild(r.element),Ae.appendChild(p.screenshotsElement),g.appendChild(Ae);let je=document.createElement("div");je.id="step-4-email",Object.assign(je.style,{display:"none",marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #eee"});let He=document.createElement("label");He.style.display="flex",He.style.alignItems="center",He.style.cursor="pointer",He.style.fontSize="14px";let Ve=document.createElement("input");Ve.type="checkbox",Ve.checked=!0,Object.assign(Ve.style,a.checkboxInput),He.appendChild(Ve),He.appendChild(document.createTextNode("Preencher email automaticamente?")),je.appendChild(He),g.appendChild(je);let Qe=document.createElement("div");Object.assign(Qe.style,{display:"none",gap:"8px",padding:"0"}),g.appendChild(Qe);let ot=document.createElement("button");Object.assign(ot.style,a.buttonBase,{backgroundColor:"#5f6368"}),ot.textContent="Copiar";let nt=document.createElement("button");Object.assign(nt.style,a.buttonBase,{backgroundColor:"#1a73e8"}),nt.textContent="Preencher",Qe.appendChild(ot),Qe.appendChild(nt);let at=document.createElement("div");Object.assign(at.style,Ze),at.className="no-drag",at.title="Redimensionar",c.appendChild(at),Je(c,at),document.body.appendChild(c);function Et(y){e=y;let V=st();Object.assign(h.style,ye),Object.assign(R.style,ye),y==="bau"?(Object.assign(h.style,V),S.href="https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657"):(Object.assign(R.style,V),S.href="https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243"),u.value&&u.dispatchEvent(new Event("change"))}function Z(y){try{if(Fe&&Fe[n]&&Fe[n][y])return Fe[n][y];if(Fe&&Fe.pt&&Fe.pt[y])return Fe.pt[y]}catch{}return y}function Mo(){Q.textContent=Z("idioma"),T.textContent=Z("fluxo"),v.textContent=Z("status_principal"),C.textContent=Z("substatus"),ut.textContent=Z("cenarios_comuns"),Pe.textContent=Z("selecione_tasks"),St.textContent=Z("preencha_detalhes"),ot.textContent=Z("copiar"),nt.textContent=Z("preencher"),B.querySelector('option[value=""]')&&(B.querySelector('option[value=""]').textContent=Z("select_status")),u.querySelector('option[value=""]')&&(u.querySelector('option[value=""]').textContent=Z("select_substatus")),q.textContent=Z("caso_portugal"),z.textContent=Z("sim"),H.textContent=Z("nao"),ie.textContent=Z("consentiu_gravacao"),_e.textContent=Z("sim"),pt.textContent=Z("nao"),De.querySelectorAll("label").forEach(y=>{let V=y.nextElementSibling.id.replace("field-",""),L=Z(V.toLowerCase());L!==V.toLowerCase()?y.textContent=L:y.textContent=V.replace(/_/g," ").replace(/\b\w/g,X=>X.toUpperCase())+":"}),he.textContent="+ "+(n==="pt"?"Gostaria de selecionar uma task?":"Quisiera seleccionar una tarea?")}function Tt(y){n=y;let V=st();Object.assign(E.style,ye),Object.assign(w.style,ye),y==="pt"?(Object.assign(E.style,V),x.style.display="block",de(o)):(Object.assign(w.style,V),x.style.display="none",ae.style.display="none"),Mo(),u.value&&u.dispatchEvent(new Event("change"))}function kt(y){(y.value.trim()===""||y.value.trim()==="\u2022")&&(y.value="\u2022 "),y.onkeydown=function(V){if(V.key==="Enter"){V.preventDefault();let L=this.selectionStart,X=this.selectionEnd,re=this.value,me=re.lastIndexOf(`
`,L-1)+1,Ce=re.substring(me,L),ge=Ce.trim()==="\u2022"||Ce.trim()===""?`
`:`
\u2022 `;this.value=re.substring(0,L)+ge+re.substring(X),this.selectionStart=this.selectionEnd=L+ge.length}else if(V.key==="Backspace"){let L=this.selectionStart;if(L===this.selectionEnd&&L>0){let X=this.value.substring(0,L);X.endsWith(`
\u2022 `)?(V.preventDefault(),this.value=X.substring(0,L-3)+this.value.substring(this.selectionEnd),this.selectionStart=this.selectionEnd=L-3):X==="\u2022 "&&(V.preventDefault(),this.value="",this.selectionStart=this.selectionEnd=0)}}}}function Ot(){let y=typeof Ee<"u"?Ee:document.getElementById("snippet-container");if(!y)return;let V=y.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'),L={},X=new Set;V.forEach(se=>{let oe=se.id,W=ke[oe];if(W)for(let P in W)P==="linkedTask"?X.add(W.linkedTask):P!=="type"&&(L[P]||(L[P]=[]),L[P].includes(W[P])||L[P].push(W[P]))});let re=new Set;Object.values(ke).forEach(se=>{Object.keys(se).forEach(oe=>{oe!=="linkedTask"&&oe!=="type"&&re.add(oe)})}),re.forEach(se=>{let oe=document.getElementById(se);if(oe){let W=L[se]||[],P="";ct.includes(se.replace("field-",""))?(P=W.map(ee=>ee.startsWith("\u2022 ")?ee:"\u2022 "+ee).join(`
`),P===""?P="\u2022 ":P.endsWith(`
\u2022 `)||(P+=`
\u2022 `)):P=W.join(`

`),P.trim()!=="\u2022"&&P.trim()!==""?oe.value=P:ct.includes(se.replace("field-",""))?oe.value="\u2022 ":oe.value="",oe.tagName==="TEXTAREA"&&typeof kt=="function"&&kt(oe)}});let me=new Set,Ce=new Set;y.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(se=>{let oe=ke[se.id];oe&&oe.linkedTask&&(se.checked?me.add(oe.linkedTask):Ce.add(oe.linkedTask))}),Ce.forEach(se=>{me.has(se)||p.toggleTask(se,!1)}),me.forEach(se=>{p.toggleTask(se,!0)})}B.onchange=()=>{let y=B.value;if(It(1.5),u.innerHTML=`<option value="">${Z("select_substatus")}</option>`,!y){u.disabled=!0;return}for(let V in lt){let L=lt[V];if(L.status===y){let X=document.createElement("option");X.value=V,X.textContent=L.name,u.appendChild(X)}}u.disabled=!1},u.onchange=()=>{let y=u.value;if(It(1.5),!y)return;p.updateSubStatus(y);let V=lt[y];Ee.innerHTML="";let L=(W,P,ee)=>{let ue=document.createElement("label");Object.assign(ue.style,a.checkboxLabel),ue.onmouseover=()=>ue.style.backgroundColor="#e8eaed",ue.onmouseout=()=>ue.style.backgroundColor="#f8f9fa";let le=document.createElement("input");return le.type=P,le.id=W.id,Object.assign(le.style,a.checkboxInput),ue.appendChild(le),ue.appendChild(document.createTextNode(` ${W.text}`)),ee.appendChild(ue),le},X=[],re="radio";if(y==="NI_Awaiting_Inputs")X=[{id:"quickfill-ni-inicio-manual",text:"In\xEDcio 2/6 (Manual)"},{id:"quickfill-ni-cms-access",text:"In\xEDcio 2/6 (ADV sem acesso ao CMS)"},{id:"quickfill-ni-followup-bau",text:"Follow-up 2/6 (BAU)"},{id:"quickfill-ni-followup-lm",text:"Follow-up 2/6 (LM)"}];else if(y.startsWith("SO_"))re="checkbox",X=[{id:"quickfill-gtm-install",text:"Instala\xE7\xE3o do GTM"},{id:"quickfill-whatsapp",text:"Convers\xE3o de WhatsApp"},{id:"quickfill-form",text:"Convers\xE3o de Formul\xE1rio (Padr\xE3o)"},{id:"quickfill-ecw4-close",text:"Fechamento ECW4 (P\xF3s 7 dias)"},{id:"quickfill-ga4-event-close",text:"Fechamento GA4 (P\xF3s 2 dias)"}];else if(y.startsWith("AS_")){re="checkbox";let W=document.createElement("label");W.textContent=Z("cenarios_comuns"),Object.assign(W.style,a.label),Ee.appendChild(W),X=[{id:"quickfill-as-no-show",text:"Anunciante n\xE3o compareceu (respondeu e-mail)"},{id:"quickfill-as-insufficient-time",text:"Tempo insuficiente"},{id:"quickfill-as-no-access",text:"Anunciante sem acessos necess\xE1rios"}]}else y.startsWith("IN_")?X=[{id:"quickfill-in-nrp-bau",text:"NRP (BAU - 3 tentativas)"},{id:"quickfill-in-nrp-lm",text:"NRP (LM - Sem tentativas)"},{id:"quickfill-in-no-show-bau",text:"No-Show (BAU - 3 tentativas)"},{id:"quickfill-in-2-6-final",text:"Finaliza\xE7\xE3o 2/6 (Sem Resposta)"},{id:"quickfill-in-manual",text:"Outro (Manual)"}]:y.startsWith("DC_")?(re="radio",X=[{id:"quickfill-dc-lm-no-access",text:"LM - Sem acessos (Reagendar em BAU)"}]):y==="NI_Attempted_Contact"?(re="radio",X=[{id:"quickfill-ni-attempted-2day",text:"2 Day Rule (2 Liga\xE7\xF5es + Chat AM)"}]):y==="NI_Awaiting_Validation"&&(re="checkbox",X=[{id:"quickfill-ni-awaiting-ecw4",text:"ECW4 (Acompanhar)"},{id:"quickfill-ni-awaiting-ga4",text:"GA4 Event Tracking (Acompanhar)"}]);let me=X.filter(W=>{let P=ke[W.id];return!P.type||P.type==="all"||P.type===e});me.forEach((W,P)=>{let ee=L(W,re,Ee);re==="radio"&&(ee.name="scenario-radio-group",P===0&&(ee.checked=!0))}),me.length>0&&(Be.style.display="block"),V.requiresTasks?(he.style.display="none",Pe.style.display="block",p.selectionElement.style.display="block"):(he.style.display="block",Pe.style.display="none",p.selectionElement.style.display="none"),De.innerHTML="";let Ce=V.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(Ce)].forEach(W=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(W))return;let P=W.slice(1,-1),ee=document.createElement("label"),ue=Z(P.toLowerCase());if(ee.textContent=ue!==P.toLowerCase()?ue:P.replace(/_/g," ").replace(/\b\w/g,K=>K.toUpperCase())+":",Object.assign(ee.style,a.label),P==="SPEAKEASY_ID"){let K=document.createElement("button");K.innerHTML='<span style="font-size:12px; margin-right:4px;">\u2728</span>Auto Busca',K.style.cssText=`
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
          `,K.title="Localizar Speakeasy ID no hist\xF3rico",K.onmouseover=()=>{K.style.backgroundColor="#c2e7ff",K.style.boxShadow="0 1px 2px rgba(0,0,0,0.1)"},K.onmouseout=()=>{K.style.backgroundColor="#d3e3fd",K.style.boxShadow="none"},K.onmousedown=()=>{K.style.backgroundColor="#a8c7fa",K.style.transform="scale(0.96)"},K.onmouseup=()=>K.style.transform="scale(1)",K.onclick=xe=>{xe.preventDefault(),co(`field-${P}`)},ee.appendChild(K)}let le;ct.includes(P)?(le=document.createElement("textarea"),Object.assign(le.style,a.textarea),le.classList.add("bullet-textarea"),kt(le)):Rt.includes(P)?(le=document.createElement("textarea"),Object.assign(le.style,a.textarea)):(le=document.createElement("input"),le.type="text",Object.assign(le.style,a.input),P==="REASON_COMMENTS"&&(y.startsWith("NI_")||y.startsWith("IN_"))&&(Object.assign(ee.style,{display:"none"}),Object.assign(le.style,{display:"none"}))),P==="ON_CALL"&&e==="lm"&&(Object.assign(ee.style,{display:"none"}),Object.assign(le.style,{display:"none"}),le.value="N/A"),le.id=`field-${P}`,De.appendChild(ee),De.appendChild(le)});let se=Ee.querySelectorAll('input[type="checkbox"], input[type="radio"]');se.length>0&&(se.forEach(W=>{W.removeEventListener("change",Ot),W.addEventListener("change",Ot)}),Ot()),Ae.style.display="block",We[y]?je.style.display="block":je.style.display="none",Qe.style.display="flex";let oe=p.getCheckedElements().map(W=>W.value);r.updateVisibility(y,oe)},he.onclick=()=>{he.style.display="none",Pe.style.display="block",p.selectionElement.style.display="block"};function $t(){let y=u.value;if(!y)return null;let L=lt[y].template.replace(/\n/g,"<br>"),X='style="margin-bottom: 12px; padding-left: 30px;"',re=[],me="",Ce=p.getCheckedElements();Ce.length>0&&Ce.forEach(oe=>{let W=oe.value,P=Ge[W],ee=oe.closest().querySelector(".stepper-count"),ue=ee?parseInt(ee.textContent):1;ue>1?re.push(`${P.name} (x${ue})`):re.push(P.name)});let ge=p.screenshotsElement;if(ge){let oe=Array.from(ge.querySelectorAll('input[id^="name-"]'));oe.length>0&&oe.forEach(W=>{let P=W.value,ee=W.closest(".cw-screen-card");if(ee){let ue=ee.querySelectorAll('input[id^="screen-"]'),le=!1,K="";ue.forEach(xe=>{let Ut=xe.closest(".cw-input-group"),Wt=Ut?Ut.querySelector(".cw-input-label"):null,_o=Wt?Wt.textContent:"Evid\xEAncia",Yt=xe.value.trim(),No=Yt?` ${Yt}`:"";K+=`<li>${_o} -${No}</li>`,le=!0}),le&&(me+=`<b>${P}</b>`,me+=`<ul ${X}>${K}</ul>`)}})}if(L.includes("{TAGS_IMPLEMENTED}")?L=L.replace(/{TAGS_IMPLEMENTED}/g,re.join(", ")||"N/A"):re.length>0&&(L+=`<br><b>Tags:</b> ${re.join(", ")}<br>`),L.includes("{SCREENSHOTS_LIST}")?L=L.replace(/{SCREENSHOTS_LIST}/g,me?`${me}`:"N/A"):me!==""&&(L+=`<br>${me}`),n==="pt"&&o){let oe=Se.checked?Z("sim"):Z("nao");L=L.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${Z("consentiu_gravacao")}</b> ${oe}<br><br>`),L=L.replace(/{CASO_PORTUGAL}/g,`<br><b>${Z("caso_portugal")}</b> ${Z("sim")}<br>`)}else n==="pt"&&!o?(L=L.replace(/{CASO_PORTUGAL}/g,`<br><b>${Z("caso_portugal")}</b> ${Z("nao")}<br>`),L=L.replace(/{CONSENTIU_GRAVACAO}/g,"")):(L=L.replace(/{CASO_PORTUGAL}/g,""),L=L.replace(/{CONSENTIU_GRAVACAO}/g,""));return De.querySelectorAll("input, textarea").forEach(oe=>{let W=oe.id.replace("field-",""),P=new RegExp(`{${W}}`,"g"),ee=oe.value;if(W==="REASON_COMMENTS"&&(y.startsWith("NI_")||y.startsWith("IN_"))){let K=Ee.querySelector('input[type="radio"]:checked');K&&ke[K.id]&&(ee=ke[K.id]["field-REASON_COMMENTS"])}if(ct.includes(W)&&ee.trim()!==""){let K=ee.split(`
`).map(xe=>xe.trim()).filter(xe=>xe!==""&&xe!=="\u2022").map(xe=>xe.startsWith("\u2022 ")?xe.substring(2):xe).map(xe=>`<li>${xe}</li>`).join("");ee=K?`<ul ${X}>${K}</ul>`:""}else Rt.includes(W)?ee=ee.split(`
`).filter(K=>K.trim()!=="").map(K=>`<p style="margin: 0 0 8px 0;">${K}</p>`).join(""):oe.tagName==="TEXTAREA"&&(ee=ee.replace(/\n/g,"<br>"));let ue=ee.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(ue===""||ue==="\u2022"||ue.toLowerCase()==="n/a"){let K=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${W}\\}(?:<br>\\s*)?`,"gi");K.test(L)?L=L.replace(K,""):L=L.replace(P,"")}else L=L.replace(P,ee.replace(/\$/g,"$$$$"))}),L=L.replace(/{([A-Z0-9_]+)}/g,""),L=L.replace(/(<br>){3,}/g,"<br><br>"),typeof r<"u"&&r.getOutput&&(L+=r.getOutput()),L}ot.onclick=()=>{let y=$t();y?(dt(y),$(Z("copiado_sucesso"))):$(Z("selecione_substatus"),{error:!0})},nt.onclick=async()=>{let y=u.value,V=$t();if(!V){$(Z("selecione_substatus"),{error:!0});return}dt(V),qt();let L=yt(),X=await At();if(X)try{if(X.focus(),X.innerHTML.trim()==="<p><br></p>"||X.innerHTML.trim()==="<br>"||X.innerText.trim()===""){let ge=document.createRange();ge.selectNodeContents(X);let se=window.getSelection();se.removeAllRanges(),se.addRange(ge),document.execCommand("delete",!1,null)}else if(!X.innerHTML.endsWith("<br><br>")){let ge=document.createRange();ge.selectNodeContents(X),ge.collapse(!1);let se=window.getSelection();se.removeAllRanges(),se.addRange(ge),document.execCommand("insertHTML",!1,"<br><br>")}document.execCommand("insertHTML",!1,V),wt(X),setTimeout(()=>{$(Z("inserido_copiado"))},600);let me=typeof Ve<"u"&&Ve?Ve.checked:!0;if(y&&We[y]&&me){let ge=We[y];await ht(ge),await new Promise(se=>setTimeout(se,500))}L(),It(1.5),B.value="",u.innerHTML=`<option value="">${Z("select_substatus")}</option>`,u.disabled=!0}catch(re){console.error(re),$("Erro ao inserir.",{error:!0}),L()}};function It(y=1.5){y<=1.5&&(Be.style.display="none",Ee.innerHTML=""),y<=2&&(p.reset(),he.style.display="none"),y<=3&&(Ae.style.display="none",De.innerHTML="",r.reset(),Qe.style.display="none",je.style.display="none")}function qt(){if(s=!s,s){let y=c.querySelector(".cw-expand-btn");y&&typeof y.resetState=="function"&&y.resetState()}qe(s,c,"cw-btn-notes")}return Et("bau"),Tt("pt"),qt}var Xe={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function So(){let t="v4.2.0 CR-Hybrid",e="CANNED_RESPONSES",n=Object.keys(Xe)[0],o="",s="list",i=!1,a={bgApp:"#F8F9FA",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.08)",borderFocus:"rgba(26, 115, 232, 0.4)",textPrimary:"#202124",textSecondary:"#5F6368",primary:"#1A73E8",primaryBg:"#E8F0FE",shadowCard:"0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",shadowHover:"0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",transition:"all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1)"},r={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:a.bgApp},p={display:"flex",width:"200%",height:"100%",transition:"transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",transform:"translateX(0)",willChange:"transform"},c={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},b={padding:"20px 24px 12px 24px",flexShrink:"0",background:a.bgApp,zIndex:"10",display:"flex",flexDirection:"column",gap:"16px",borderBottom:`1px solid ${a.borderSubtle}`},l={width:"100%",height:"44px",padding:"0 16px 0 48px",borderRadius:"12px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",fontWeight:"400",color:a.textPrimary,boxSizing:"border-box",outline:"none",transition:a.transition,boxShadow:"0 2px 5px rgba(0,0,0,0.03)",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%239AA0A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"16px center"},f={display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px",paddingBottom:"4px"},g={padding:"6px 14px",borderRadius:"100px",border:"1px solid #DADCE0",background:"#FFFFFF",color:a.textSecondary,fontSize:"13px",fontWeight:"500",letterSpacing:"0.3px",cursor:"pointer",transition:a.transition,flexShrink:"0",display:"flex",alignItems:"center",justifyContent:"center"},m={background:a.primaryBg,color:a.primary,borderColor:"transparent",fontWeight:"600",boxShadow:"0 1px 2px rgba(26, 115, 232, 0.15)"},O={padding:"16px 24px 80px 24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"12px"},M={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",height:"72px",minHeight:"72px",borderRadius:"16px",background:a.bgSurface,border:"1px solid transparent",boxShadow:a.shadowCard,cursor:"pointer",transition:"all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",position:"relative",overflow:"hidden"},D=document.createElement("div");D.id="quick-email-popup",D.classList.add("cw-module-window"),Object.assign(D.style,Te,{right:"100px",width:"440px",height:"640px",borderRadius:"20px",boxShadow:"0 24px 64px rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.4)"});let G={popup:D,googleLine:null,focusElement:null};function Q(){i=!i,qe(i,D,"cw-btn-email"),i||setTimeout(()=>C(),300)}let ne=Ie(D,"Quick Email",t,"Templates & Automa\xE7\xF5es",G,()=>Q()),E=document.createElement("div");Object.assign(E.style,r);let w=document.createElement("div");Object.assign(w.style,p);let I=document.createElement("div");Object.assign(I.style,c);let T=document.createElement("div");Object.assign(T.style,b);let k=document.createElement("input");k.placeholder="Pesquisar templates...",Object.assign(k.style,l),k.onfocus=()=>{k.style.borderColor=a.primary,k.style.boxShadow="0 0 0 4px rgba(26, 115, 232, 0.15)",k.style.background="#fff"},k.onblur=()=>{k.style.borderColor="transparent",k.style.boxShadow="0 2px 5px rgba(0,0,0,0.03)",k.style.background="#fff"},G.focusElement=k;let h=document.createElement("div");Object.assign(h.style,f);let R=document.createElement("div");Object.assign(R.style,O),T.appendChild(k),T.appendChild(h),I.appendChild(T),I.appendChild(R);let A=document.createElement("div");Object.assign(A.style,c);let v=document.createElement("div");Object.assign(v.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),A.appendChild(v),w.appendChild(I),w.appendChild(A),E.appendChild(w),D.appendChild(ne),D.appendChild(E),document.body.appendChild(D);async function B(q,j){try{i&&Q();let F=yt();await new Promise(N=>setTimeout(N,800)),j==="email"?await uo(q):j==="cr"&&await ht(q),F()}catch(F){console.error("\u274C Erro:",F);let N=document.querySelector(".cw-focus-backdrop");N&&N.classList.remove("active")}}function d(q){s="detail",w.style.transform="translateX(-50%)";let j='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',F='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';v.innerHTML=`
            <style>
                .cw-email-content p { margin: 0 0 8px 0; } /* Margem apenas embaixo */
                .cw-email-content ul { margin: 0 0 8px 16px; padding: 0; }
                .cw-email-content li { margin-bottom: 4px; }
            </style>

            <div style="position:sticky; top:0; background:rgba(255,255,255,0.9); backdrop-filter:blur(12px); border-bottom:1px solid #eee; padding:16px 24px; z-index:10; display:flex; align-items:center; gap:12px;">
                <button id="csa-back-btn" style="background:none; border:none; cursor:pointer; display:flex; color:#5f6368; padding:8px; margin-left:-12px; border-radius:50%; transition:background 0.2s;">${j}</button>
                <div style="font-weight:600; font-size:16px; color:#202124; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${q.name}</div>
            </div>
            
            <div style="padding:24px;">
                <div style="margin-bottom:24px;">
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Assunto</div>
                    <div style="font-size:14px; font-weight:500; color:#202124; padding:16px; background:#F8F9FA; border-radius:12px; border:1px solid #eee; box-shadow:inset 0 1px 2px rgba(0,0,0,0.02);">${q.subject}</div>
                </div>
                
                <div>
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Mensagem</div>
                    
                    <div class="cw-email-content" style="font-size:13px; color:#3c4043; line-height:1.5; white-space: normal; word-break: break-word; padding:0 4px;">
                        ${q.body}
                    </div>
                </div>
            </div>
            
            <div style="position:sticky; bottom:0; padding:24px; background:linear-gradient(to top, #fff 90%, rgba(255,255,255,0)); pointer-events:none;">
                <button id="csa-insert-btn" style="pointer-events:auto; width:100%; padding:14px; background:#1a73e8; color:white; border:none; border-radius:12px; font-size:14px; font-weight:600; cursor:pointer; display:flex; justify-content:center; align-items:center; gap:10px; box-shadow:0 4px 12px rgba(26,115,232,0.3); transition:transform 0.2s, box-shadow 0.2s;">
                    ${F} Usar Template
                </button>
            </div>
        `;let N=v.querySelector("#csa-back-btn");N.onmouseenter=()=>N.style.background="#f1f3f4",N.onmouseleave=()=>N.style.background="none",N.onclick=C;let z=v.querySelector("#csa-insert-btn");z.onmouseenter=()=>{z.style.transform="translateY(-1px)",z.style.boxShadow="0 6px 16px rgba(26,115,232,0.4)"},z.onmouseleave=()=>{z.style.transform="translateY(0)",z.style.boxShadow="0 4px 12px rgba(26,115,232,0.3)"},z.onclick=()=>{z.style.transform="scale(0.96)",B(q,"email"),setTimeout(()=>{z.style.transform="scale(1)",C()},300)}}function C(){s="list",w.style.transform="translateX(0)"}function S(q,j,F=null){let N=document.createElement("button"),z=F?`<span style="margin-right:6px; font-size:14px; opacity:0.9;">${F}</span>`:"";return N.innerHTML=`${z}${q}`,Object.assign(N.style,g),n===j&&o===""?Object.assign(N.style,m):(N.onmouseenter=()=>{N.style.background="#F1F3F4",N.style.borderColor="#DADCE0"},N.onmouseleave=()=>{N.style.background="#FFFFFF",N.style.borderColor="#DADCE0"}),N.onclick=()=>{n=j,o="",k.value="",u(),x()},N}function u(){h.innerHTML="",h.appendChild(S("Smart CRs",e,"\u26A1")),Object.keys(Xe).forEach(q=>{h.appendChild(S(Xe[q].title,q))})}function x(){R.innerHTML="";let q=[];if(o.trim()!==""){let U=o.toLowerCase();Object.values(Xe).forEach(_=>{_.emails.forEach(H=>{(H.name.toLowerCase().includes(U)||H.subject.toLowerCase().includes(U))&&q.push({type:"email",data:H})})}),Object.entries(We).forEach(([_,H])=>{if(!H)return;(_.replace(/_/g," ").toLowerCase().includes(U)||H.toLowerCase().includes(U))&&q.push({type:"cr",key:_,code:H})})}else n===e?Object.entries(We).forEach(([U,_])=>{_&&q.push({type:"cr",key:U,code:_})}):Xe[n]&&Xe[n].emails.forEach(U=>{q.push({type:"email",data:U})});if(q.length===0){R.innerHTML=`
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F50D}</div>
                    <div style="font-size:14px; font-weight:500;">Nenhum template encontrado</div>
                    <div style="font-size:12px; margin-top:4px;">Tente outro termo de busca</div>
                </div>`;return}let F='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1967D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',N='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA8600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',z='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BDC1C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';q.forEach(U=>{let _=document.createElement("div");if(Object.assign(_.style,M),U.type==="email"){let H=U.data,de=H.subject.length>45?H.subject.substring(0,45)+"...":H.subject;_.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#E8F0FE; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${F}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${H.name}</div>
                        <div style="font-size:12px; color:#5F6368; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${de}</div>
                    </div>
                    <div style="margin-left:12px; opacity:0.6;">${z}</div>
                `,_.onclick=()=>d(H)}else{let H=U.key.replace(/_/g," ").replace("AS ","AS - ").replace("NI ","NI - ");_.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#FEF7E0; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${N}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; margin-bottom:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${H}</div>
                        <div style="font-size:11px; font-weight:500; color:#EA8600; font-family:'Roboto Mono', monospace; letter-spacing:-0.2px;">${U.code}</div>
                    </div>
                    <div style="font-size:10px; font-weight:700; color:#DADCE0; text-transform:uppercase; letter-spacing:0.5px; border:1px solid #F1F3F4; padding:4px 8px; border-radius:6px; margin-left:12px;">Inserir</div>
                `,_.onclick=()=>{_.style.transform="scale(0.98)",_.style.background="#FEF7E0",setTimeout(()=>{_.style.transform="scale(1)",_.style.background="#fff",B(U.code,"cr")},150)}}_.onmouseenter=()=>{_.style.transform="translateY(-2px)",_.style.boxShadow=a.shadowHover,U.type==="cr"?_.style.borderLeft="3px solid #Fbbc04":_.style.borderLeft="3px solid #1a73e8"},_.onmouseleave=()=>{_.style.transform="translateY(0)",_.style.boxShadow=a.shadowCard,_.style.borderLeft="1px solid transparent"},R.appendChild(_)})}return k.addEventListener("input",q=>{o=q.target.value,o!==""?Array.from(h.children).forEach(j=>{Object.assign(j.style,g),j.style.opacity="0.6"}):u(),x()}),u(),x(),Q}var Eo={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function To(){let t="v2.1 (Apple Motion)",e={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#f8f9fa",scrollBehavior:"smooth"},card:{background:"#ffffff",border:"1px solid #dadce0",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"13px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"10px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.15s ease, opacity 0.3s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.5",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"20px",height:"20px",borderRadius:"6px",border:"2px solid #dadce0",marginRight:"14px",marginTop:"1px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #eee",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"}},n={},o="PT",s="BAU",i=!1,a=document.createElement("div");a.id="call-script-popup",a.classList.add("cw-module-window"),Object.assign(a.style,Te,{right:"auto",left:"50%",width:"400px",height:"650px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let r={popup:a,googleLine:null};function p(){i=!i,qe(i,a,"cw-btn-script")}let c=Ie(a,"Call Script",t,"Guia interativo para condu\xE7\xE3o de chamadas.",r,()=>{p()});a.appendChild(c);let b=document.createElement("div");Object.assign(b.style,e.progressBarContainer);let l=document.createElement("div");Object.assign(l.style,e.progressBarFill),b.appendChild(l),a.appendChild(b);let f=document.createElement("div");f.id="csa-content",Object.assign(f.style,e.contentArea),a.appendChild(f);let g=document.createElement("div");Object.assign(g.style,e.footer);let m=document.createElement("span");m.textContent="by lucaste@",Object.assign(m.style,{fontSize:"10px",color:"#bdc1c6"});let O=document.createElement("button");O.innerHTML=`
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
    Resetar Script
  `,Object.assign(O.style,e.resetBtn),O.onmouseenter=()=>O.style.background="#fce8e6",O.onmouseleave=()=>O.style.background="transparent",O.onclick=()=>{O.style.transform="scale(0.9)",setTimeout(()=>O.style.transform="scale(1)",150);for(let A in n)delete n[A];T()},g.appendChild(m),g.appendChild(O),a.appendChild(g);let M=document.createElement("div");Object.assign(M.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let D=document.createElement("div");Object.assign(D.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let G=document.createElement("div");G.textContent="BAU";let Q=document.createElement("div");Q.textContent="LT",Object.assign(G.style,ye),Object.assign(Q.style,ye),D.appendChild(G),D.appendChild(Q);let ne=document.createElement("select");Object.assign(ne.style,ao,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),ne.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',ne.value=o,M.appendChild(D),M.appendChild(ne),f.appendChild(M);let E=document.createElement("div");E.id="csa-checklist-area",f.appendChild(E);let w=document.createElement("div");Object.assign(w.style,Ze),w.className="no-drag",w.title="Redimensionar",a.appendChild(w),Je(a,w),document.body.appendChild(a);function I(A){return A}function T(){E.innerHTML="";let A=`${o} ${s}`,v=Eo[A];if(!v){E.innerHTML=`<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <div style="font-size: 24px;">\u2615</div>
        <div>Script n\xE3o configurado.</div>
      </div>`,l.style.width="0%";return}let B=v.color||"#1a73e8",d=0,C=0;["inicio","fim"].forEach(S=>{v[S]&&(d+=v[S].length)}),["inicio","fim"].forEach((S,u)=>{let x=v[S];if(!x||x.length===0)return;let q=document.createElement("div");Object.assign(q.style,e.card);let j=document.createElement("div");Object.assign(j.style,e.cardTitle);let F=S==="inicio"?"Abertura":"Fechamento";o.includes("ES")&&(F=S==="inicio"?"Apertura":"Cierre"),o.includes("EN")&&(F=S==="inicio"?"Opening":"Closing"),j.textContent=F;let N=document.createElement("span");N.style.fontSize="11px",N.style.opacity="0.7",N.style.fontWeight="500",N.style.background="#f1f3f4",N.style.padding="2px 8px",N.style.borderRadius="10px",j.appendChild(N),q.appendChild(j);let z=0;x.forEach((U,_)=>{let H=`${A}-${S}-${_}`,de=!!n[H];de&&(C++,z++);let ae=document.createElement("div");Object.assign(ae.style,e.itemRow);let ie=document.createElement("div");Object.assign(ie.style,e.checkbox);let ce=document.createElement("span");ce.innerHTML=U,ce.style.flex="1",de?(Object.assign(ae.style,e.itemCompleted),ie.style.background=B,ie.style.borderColor=B,ie.style.transform="scale(1)",ie.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ae.style.textDecoration="none",ae.style.opacity="1",ie.style.background="transparent",ie.style.borderColor="#dadce0",ie.style.transform="scale(1)",ie.innerHTML=""),ae.onclick=()=>{let fe=!n[H];n[H]=fe,te.playClick(),fe?(ie.style.transform="scale(1.2)",setTimeout(()=>ie.style.transform="scale(1)",150),Object.assign(ae.style,e.itemCompleted),ie.style.background=B,ie.style.borderColor=B,ie.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ae.style.textDecoration="none",ae.style.opacity="1",ie.style.background="transparent",ie.style.borderColor="#dadce0",ie.innerHTML=""),k(A,v)},ae.onmouseenter=()=>{n[H]||(ae.style.background="#f1f3f4",ie.style.borderColor=B)},ae.onmouseleave=()=>{n[H]||(ae.style.background="transparent",ie.style.borderColor="#dadce0")},ae.appendChild(ie),ae.appendChild(ce),q.appendChild(ae)}),z===x.length&&x.length>0&&(N.style.color="#1e8e3e",N.style.background="#e6f4ea",q.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),N.textContent=`${z}/${x.length}`,E.appendChild(q)}),h(d,C)}function k(A,v){let B=0,d=0;["inicio","fim"].forEach(C=>{let S=v[C]||[];B+=S.length;let u=0;S.forEach((x,q)=>{n[`${A}-${C}-${q}`]&&(d++,u++)})}),h(B,d),setTimeout(()=>T(),200)}function h(A,v){let B=A===0?0:v/A*100;l.style.width=`${B}%`,B===100?l.style.background="#34A853":l.style.background="linear-gradient(90deg, #4285F4, #34A853)"}function R(A){s=A;let v=st();Object.assign(G.style,ye),Object.assign(Q.style,ye),Object.assign(A==="BAU"?G.style:Q.style,v),T()}return G.onclick=()=>R("BAU"),Q.onclick=()=>R("LT"),ne.addEventListener("change",A=>{o=A.target.value,T()}),R(s),p}var Ct={tasks:{label:"Minhas Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico (Cognizant)"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda interna"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio de Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM Team & LT"},{name:"Performance Individual",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO (go/mymetricswebao)"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form para solicitar grava\xE7\xE3o."},{name:"Escala\xE7\xE3o de Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form para escala\xE7\xE3o de Sellers."},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es para o split."}]},ads:{label:"Google Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page Application"},{name:"[SOP] Ads Conversion Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Conversion Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o de c\xF3digo"},{name:"[SOP] Website Call Conversion",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o de Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conversions",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"Convers\xF5es Otimizadas"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento de EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o de problemas"},{name:"Win Criteria: Troubleshooting",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=B4:B7",desc:"Valida\xE7\xE3o de Troubleshoot"},{name:"[SOP] Ads Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o de RMKT"},{name:"[SOP] Dynamic Remarketing",url:"https://docs.google.com/document/d/1NVGBhJ-bYAq-F-55Te2T7Kz1HOTuj0KZc-SBbdfyfyM/edit",desc:"RMKT Varejo"},{name:"[SOP] Customer Match",url:"https://docs.google.com/document/d/1945XuWXxAnfQyIBK0-46cPf2brxhbu1-mMbKjvs_EOU/edit",desc:"Lista de Clientes"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o de Leads"},{name:"[SOP] GTM Installation",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o do Container"}]},analytics:{label:"Analytics (GA4)",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o e Configura\xE7\xE3o"},{name:"Win Criteria: GA4 Setup",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce Guide",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia de Dev"},{name:"[SOP] Troubleshooting GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o de Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador de URLs"}]},shopping:{label:"Shopping",links:[{name:"[SOP] Onboarding MC 2.0",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Optimization",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o de Feed"},{name:"Consult ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed (GSS)",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o de Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech Helper",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias por CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta Gearloose"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground C\xF3digo"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador de Regex"},{name:"Gerador de Pessoas",url:"https://www.4devs.com.br/gerador_de_pessoas",desc:"Dados de teste"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Doc. Enhanced Conversion",url:"https://support.google.com/google-ads/answer/9888656?hl=pt",desc:"Doc. ECW4"},{name:"Doc. CoMo",url:"https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=pt-br",desc:"Doc. Consent Mode"},{name:"Cursos SkillShop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Treinamentos"},{name:"Consent Mode - Instala\xE7\xE3o",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia Instala\xE7\xE3o CoMo"},{name:"CMPs - Consent Mode",url:"https://cmppartnerprogram.withgoogle.com/",desc:"Lista de CMPs"},{name:"Consent Mode - Testes",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH / Cognizant",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal do Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha de Pagamento"}]},lm:{label:"LM Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro de chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Suportes",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"}]}},Ke={tasks:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',lm:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>',ads:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>'},jt="cw_link_history_v2";function ko(t,e){let n=JSON.parse(localStorage.getItem(jt)||"[]");n=n.filter(o=>o.url!==t.url),n.unshift({...t,_originalCat:e}),n=n.slice(0,3),localStorage.setItem(jt,JSON.stringify(n))}function Uo(){return JSON.parse(localStorage.getItem(jt)||"[]")}function Oo(){let t="v3.3.0 (Anchor Mode)",e="",n=!1,o={bgApp:"#F8F9FA",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.08)",textPrimary:"#202124",textSecondary:"#5F6368",primary:"#1A73E8",primaryBg:"#E8F0FE",shadowCard:"0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",shadowHover:"0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",transition:"all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1)"},s={width:"100%",height:"40px",padding:"0 12px 0 40px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:o.textPrimary,boxSizing:"border-box",outline:"none",transition:o.transition,boxShadow:"0 2px 5px rgba(0,0,0,0.03)",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%239AA0A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center"},i={display:"flex",flexWrap:"nowrap",overflowX:"auto",gap:"8px",padding:"4px 24px 12px 24px",scrollbarWidth:"none",msOverflowStyle:"none",maskImage:"linear-gradient(to right, transparent, black 12px, black 95%, transparent)",webkitMaskImage:"linear-gradient(to right, transparent, black 12px, black 95%, transparent)"},a={padding:"6px 12px",borderRadius:"8px",border:"1px solid #DADCE0",background:"#FFFFFF",color:o.textSecondary,fontSize:"13px",fontWeight:"500",cursor:"pointer",whiteSpace:"nowrap",transition:o.transition,display:"inline-flex",alignItems:"center",justifyContent:"center",marginBottom:"0",flexShrink:"0"},r={display:"flex",alignItems:"center",justifyContent:"space-between",gap:"12px",padding:"12px 16px",marginBottom:"8px",borderRadius:"12px",background:o.bgSurface,border:"1px solid transparent",boxShadow:o.shadowCard,cursor:"pointer",transition:"transform 0.2s, box-shadow 0.2s",overflow:"hidden",minWidth:"0"},p={width:"36px",height:"36px",flexShrink:"0",borderRadius:"10px",background:"#F1F3F4",color:o.textSecondary,display:"flex",alignItems:"center",justifyContent:"center",transition:"background 0.2s, color 0.2s"},c={fontSize:"11px",fontWeight:"700",textTransform:"uppercase",color:o.textSecondary,margin:"24px 0 8px 0",letterSpacing:"0.5px",display:"flex",alignItems:"center",gap:"8px"},b={...r,background:"#FFF8E1",border:"1px solid #FFE082"},l=document.createElement("div");l.id="feedback-popup",l.classList.add("cw-module-window"),Object.assign(l.style,Te,{right:"100px",width:"460px",height:"640px",background:o.bgApp});let f=document.createElement("style");f.innerHTML="#feedback-popup div::-webkit-scrollbar { display: none; }",document.head.appendChild(f);let g={popup:l,googleLine:null,focusElement:null},m=Ie(l,"Links & Bookmarks",t,"Acesso r\xE1pido \xE0s ferramentas. Use a busca ou navegue pelas categorias.",g,()=>I());l.appendChild(m);let O=document.createElement("div");Object.assign(O.style,{padding:"20px 24px 12px 24px",display:"flex",flexDirection:"column",gap:"16px",borderBottom:`1px solid ${o.borderSubtle}`,flexShrink:"0",backgroundColor:o.bgApp});let M=document.createElement("input");M.type="text",M.placeholder="Pesquisar em tudo...",Object.assign(M.style,s),g.focusElement=M,M.onfocus=()=>{M.style.borderColor=o.primary,M.style.backgroundColor="#fff",M.style.boxShadow="0 0 0 4px rgba(26, 115, 232, 0.15)"},M.onblur=()=>{M.style.borderColor="transparent",M.style.backgroundColor="#fff",M.style.boxShadow="0 2px 5px rgba(0,0,0,0.03)"};let D=document.createElement("div");Object.assign(D.style,i),O.appendChild(M),O.appendChild(D),l.appendChild(O);let G=document.createElement("div");Object.assign(G.style,{padding:"16px 24px",overflowY:"auto",flexGrow:"1",backgroundColor:o.bgApp,scrollBehavior:"smooth"}),l.appendChild(G),document.body.appendChild(l);function Q(){D.innerHTML="",Object.keys(Ct).forEach(T=>{let k=Ct[T],h=document.createElement("button"),R=Ke[T]||"",A=k.links.length;h.innerHTML=`
        <span style="display:flex; align-items:center; margin-right:6px; opacity:0.8;">${R}</span>
        ${k.label}
        <span style="font-size:10px; opacity:0.5; margin-left:6px; background:rgba(0,0,0,0.05); padding:1px 5px; border-radius:4px;">${A}</span>
      `,Object.assign(h.style,a),h.onmouseenter=()=>{h.style.background="#F1F3F4",h.style.borderColor="#DADCE0"},h.onmouseleave=()=>{h.style.background="#FFFFFF",h.style.borderColor="#DADCE0"},h.onclick=()=>{te.playClick();let v=document.getElementById(`cat-header-${T}`);v&&(v.scrollIntoView({behavior:"smooth",block:"start"}),v.style.color=o.primary,setTimeout(()=>v.style.color=o.textSecondary,1e3))},D.appendChild(h)})}function ne(){if(G.innerHTML="",e.trim()!==""){let k=[];if(Object.entries(Ct).forEach(([h,R])=>{let A=R.links.filter(v=>v.name.toLowerCase().includes(e.toLowerCase())||v.desc.toLowerCase().includes(e.toLowerCase()));k.push(...A.map(v=>({...v,_cat:h})))}),k.length===0){G.innerHTML=`
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F50D}</div>
                    <div style="font-size:14px; font-weight:500;">Nenhum link encontrado</div>
                </div>`;return}k.forEach((h,R)=>{let A=E(h,Ke[h._cat],!1);G.appendChild(A),w(A,R)});return}let T=Uo();if(T.length>0){let k=document.createElement("div");Object.assign(k.style,c),k.innerHTML=`<span style="opacity:0.7;">${Ke.history}</span> \u{1F552} Recentes`,G.appendChild(k),T.forEach((h,R)=>{let A=E(h,Ke[h._originalCat]||Ke.home,!0);G.appendChild(A),w(A,R)})}Object.entries(Ct).forEach(([k,h],R)=>{let A=document.createElement("div");A.id=`cat-header-${k}`,Object.assign(A.style,c),R===0&&T.length===0&&(A.style.marginTop="0"),A.innerHTML=`<span style="opacity:0.7;">${Ke[k]}</span> ${h.label}`,G.appendChild(A),h.links.forEach((v,B)=>{let d=E(v,Ke[k],!1,k);G.appendChild(d)})})}function E(T,k,h,R){let A=document.createElement("div");Object.assign(A.style,h?b:r);let v=document.createElement("div");Object.assign(v.style,p),h&&(v.style.background="#fff"),v.innerHTML=k||'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',A.appendChild(v);let B=document.createElement("div");B.style.flexGrow="1",B.style.minWidth="0",B.style.display="flex",B.style.flexDirection="column",B.style.gap="2px";let d=j=>{if(!e)return j;let F=new RegExp(`(${e})`,"gi");return j.replace(F,'<span style="color:#1a73e8; font-weight:700;">$1</span>')},C=`<div style="font-size:14px; font-weight:600; color:${o.textPrimary}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${d(T.name)}</div>`,S=`<div style="font-size:12px; color:${o.textSecondary}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${d(T.desc)}</div>`;B.innerHTML=C+S,A.appendChild(B);let u=document.createElement("div");u.style.display="flex",u.style.alignItems="center",u.style.gap="8px",u.style.flexShrink="0",u.style.opacity="0.4",u.style.transition="opacity 0.2s";let x=document.createElement("div");x.title="Copiar Link",x.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',Object.assign(x.style,{width:"32px",height:"32px",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",color:o.textSecondary,cursor:"pointer",transition:"all 0.2s ease"}),x.onclick=j=>{te.playClick(),j.stopPropagation(),navigator.clipboard.writeText(T.url),!h&&R&&ko(T,R),ne(),$("Link copiado!")},x.onmouseenter=()=>{x.style.background="#F1F3F4"},x.onmouseleave=()=>{x.style.background="transparent"},u.appendChild(x);let q=document.createElement("div");return q.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>',Object.assign(q.style,{display:"flex",alignItems:"center",justifyContent:"center",color:"#DADCE0",width:"24px",height:"24px"}),u.appendChild(q),A.appendChild(u),A.onclick=()=>{!h&&R&&ko(T,R),ne(),window.open(T.url,"_blank")},A.onmouseenter=()=>{A.style.transform="translateY(-2px)",A.style.boxShadow=o.shadowHover,u.style.opacity="1",v.style.background="#E8F0FE",v.style.color="#1967D2",q.style.color="#1A73E8"},A.onmouseleave=()=>{A.style.transform="translateY(0)",A.style.boxShadow=h?"none":o.shadowCard,u.style.opacity="0.4",v.style.background=h?"#fff":"#F1F3F4",v.style.color=o.textSecondary,q.style.color="#DADCE0"},A}function w(T,k){T.style.opacity="0",T.style.transform="translateY(10px)",requestAnimationFrame(()=>{setTimeout(()=>{T.style.transition="all 0.3s cubic-bezier(0.2, 0.0, 0.2, 1)",T.style.opacity="1",T.style.transform="translateY(0)"},k*30)})}M.addEventListener("input",T=>{e=T.target.value,ne()});function I(){n=!n,qe(n,l,"cw-btn-links")}return Q(),ne(),I}var ze=[];function Ht(t){ze=t}var Wo=["lucaste"],Yo=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function Io(){let t="v4.9 (High Contrast UI)",e=!1,n=null,o=null;function s(d){if(!d)return"";try{let C=new Date(d);return isNaN(C.getTime())?String(d):C.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(d)}}if(!document.getElementById("cw-broadcast-hd-css")){let d=document.createElement("style");d.id="cw-broadcast-hd-css",d.innerHTML=`
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
      `,document.head.appendChild(d)}let i={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},a={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function r(d){return d?Object.entries(d).map(([C,S])=>`${C.replace(/[A-Z]/g,u=>"-"+u.toLowerCase())}:${S}`).join(";"):""}function p(d){if(!d||typeof d!="string")return"";let C=d;return C=C.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),C=C.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),C=C.replace(/_(.*?)_/g,"<i>$1</i>"),C=C.replace(/\n/g,"<br>"),C=so(C),C}let c=document.createElement("div");c.id="broadcast-popup",c.classList.add("cw-module-window"),Object.assign(c.style,Te,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let b={popup:c,googleLine:null};function l(){if(e=!e,qe(e,c,"cw-btn-broadcast"),e){let d=document.getElementById("cw-btn-broadcast");d&&d.classList.remove("has-new"),I()}}let f=Ie(c,"Central de Avisos",t,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",b,()=>l()),g=f.querySelector(".cw-header-actions")||f.lastElementChild,m=null;function O(){let d=null;try{d=Qt()}catch{console.warn("TechSol: Auth Pending")}if(d){let C=d.split("@")[0].toLowerCase(),S=Wo.includes(C);if(window._cwIsAdmin=S,window._cwCurrentUser=C,S&&g&&!g.querySelector("#cw-admin-btn")){let u=document.createElement("div");u.id="cw-admin-btn",u.className="cw-btn-interactive",u.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(u.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),u.title="Novo Aviso",u.onclick=x=>{x.stopPropagation(),G()},g.insertBefore(u,g.firstChild),m||D(),k()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(O,2e3))}if(g){let d=document.createElement("button");d.textContent="Limpar",d.className="cw-btn-interactive",Object.assign(d.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),d.onclick=C=>{C.stopPropagation(),te.playSuccess();let S=ze.map(u=>u.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(S)),k(),T()},g.insertBefore(d,g.firstChild)}c.appendChild(f);let M=document.createElement("div");M.id="cw-update-status",M.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",c.appendChild(M);function D(){m=document.createElement("div"),m.className="cw-editor-overlay",m.innerHTML=`
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
      `,m.querySelectorAll('input[name="cw-bc-type"]').forEach(u=>{u.addEventListener("change",()=>{m.querySelectorAll(".cw-radio-option").forEach(x=>x.classList.remove("checked")),u.parentElement.classList.add("checked")})}),setTimeout(()=>{let u=m.querySelector(".cw-radio-option.info");u&&u.classList.add("checked")},100);let d=m.querySelector("#cw-bc-cancel"),C=m.querySelector("#cw-bc-close-x"),S=m.querySelector("#cw-bc-send");d.onclick=Q,C.onclick=Q,S.onclick=ne,c.appendChild(m)}function G(d=null){if(!m)return;let C=m.querySelector("#cw-editor-title-label"),S=m.querySelector("#cw-bc-title"),u=m.querySelector("#cw-bc-text"),x=m.querySelector("#cw-bc-send");if(d){o=d.id,C.textContent="Editar Aviso",S.value=d.title||"",u.value=d.text||"",x.textContent="Salvar Altera\xE7\xF5es";let q=d.type||"info",j=m.querySelector(`input[name="cw-bc-type"][value="${q}"]`);j&&j.click()}else{o=null,C.textContent="Novo Aviso",S.value="",u.value="",x.textContent="Publicar";let q=m.querySelector('input[name="cw-bc-type"][value="info"]');q&&q.click()}m.classList.add("active"),setTimeout(()=>S.focus(),300)}function Q(){m&&m.classList.remove("active"),o=null}async function ne(){let d=m.querySelector("#cw-bc-send"),C=m.querySelector("#cw-bc-title"),S=m.querySelector("#cw-bc-text"),u=m.querySelector('input[name="cw-bc-type"]:checked'),x=u?u.value:"info";if(!C.value.trim()||!S.value.trim()){$("Preencha todos os campos!",{error:!0});return}d.textContent="Salvando...",d.style.opacity="0.7";let q=!1;o?q=await we.updateBroadcast(o,{title:C.value,text:S.value,type:x}):q=await we.sendBroadcast({title:C.value,text:S.value,type:x,author:window._cwCurrentUser||"admin"}),q?($(o?"Atualizado!":"Publicado!"),te.playSuccess(),Q(),setTimeout(()=>I(),1500)):($("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),d.textContent=o?"Salvar Altera\xE7\xF5es":"Publicar",d.style.opacity="1")}async function E(d){if(confirm("Confirma a exclus\xE3o deste aviso?"))if(await we.deleteBroadcast(d)){$("Aviso removido."),te.playClick();let S=ze.findIndex(u=>u.id===d);S>-1&&ze.splice(S,1),k(),setTimeout(()=>I(),1500)}else $("Erro ao excluir.",{error:!0})}let w=document.createElement("div");w.className="cw-nice-scroll",Object.assign(w.style,i.feedContainer),c.appendChild(w);async function I(){e&&(M.style.display="block",M.innerHTML="\u{1F504} Sincronizando...");try{let d=await we.fetchData();d&&d.broadcast&&(Ht(d.broadcast),T(),e&&(k(),M.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{M.style.display="none"},1500)))}catch{e&&(M.innerHTML="\u26A0\uFE0F Offline")}}function T(){let d=document.getElementById("cw-btn-broadcast");if(!d)return;let C=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(ze.some(u=>!C.includes(u.id))){if(d.classList.add("has-new"),!d.querySelector(".cw-badge")){let u=document.createElement("div");u.className="cw-badge",Object.assign(u.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),d.appendChild(u)}}else{d.classList.remove("has-new");let u=d.querySelector(".cw-badge");u&&u.remove()}}function k(){w.innerHTML="";let d=c.querySelector("#cw-bau-widget");d&&d.remove();let C=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),S=[...ze].sort((F,N)=>{let z=new Date(F.date).getTime()||0;return(new Date(N.date).getTime()||0)-z}),u=S.findIndex(F=>F.title&&F.title.toLowerCase().includes("disponibilidade bau"));if(u!==-1){let F=S[u];S.splice(u,1);let N=document.createElement("div");N.id="cw-bau-widget",Object.assign(N.style,i.bauContainer);let z=[],U=(F.text||"").split(`
`),_=/\d{1,2}\/\d{1,2}/;if(U.forEach(ce=>{let fe=ce.match(_);if(fe){let Se=fe[0],_e="\u{1F4C5}";/🇧🇷|🇵🇹|PT|BR/i.test(ce)?_e="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(ce)&&(_e="\u{1F1EA}\u{1F1F8}"),z.some(Re=>Re.flag===_e&&Re.date===Se)||z.push({flag:_e,date:Se})}}),z.length===0){let ce=(F.text||"").match(/\d{1,2}\/\d{1,2}/g);ce&&[...new Set(ce)].forEach(fe=>z.push({flag:"\u{1F4C5}",date:fe}))}let H="",de='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(de=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${de}
              `),z.length>0?H=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${z.map(fe=>`
                  <div style="${r(i.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${r(i.bauFlag)}">${fe.flag}</span>
                      <span style="${r(i.bauDate)}">${fe.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${de}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${p(F.text)}</div>
              `:H=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${p(F.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,N.innerHTML=`
              <div style="${r(i.bauHeader)}; margin-bottom:8px;">
                  <div style="${r(i.liveIndicator)}">
                      <div style="${r(i.pulseDot)}"></div>
                      <span style="${r(i.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${s(F.date)}</div>
              </div>
              ${H}
          `,M.after(N);let ae=N.querySelector("#cw-bau-toggle-btn"),ie=N.querySelector("#cw-bau-full");if(ae&&ie&&(ae.onclick=()=>{let ce=ie.style.display==="none";ie.style.display=ce?"block":"none",ae.textContent=ce?"Ocultar":"Detalhes"}),window._cwIsAdmin){let ce=N.querySelector(".cw-bau-edit");ce&&(ce.onclick=()=>G(F))}}let x=S.sort((F,N)=>{let z=C.includes(F.id),U=C.includes(N.id);return z===U?0:z?1:-1});if(x.length===0&&!u){let F=document.createElement("div");Object.assign(F.style,i.emptyState),F.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,w.appendChild(F)}let q=x.filter(F=>!C.includes(F.id)),j=x.filter(F=>C.includes(F.id));if(q.forEach(F=>w.appendChild(h(F,!1))),j.length>0){let F=document.createElement("div");Object.assign(F.style,i.historyDivider),F.innerHTML=`<span>Hist\xF3rico (${j.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let N=document.createElement("div");Object.assign(N.style,i.historyContainer),j.forEach(U=>N.appendChild(h(U,!0)));let z=!1;F.onclick=()=>{te.playClick(),z=!z,N.style.display=z?"flex":"none",F.querySelector("svg").style.transform=z?"rotate(180deg)":"rotate(0deg)"},w.appendChild(F),w.appendChild(N)}}function h(d,C){let S=document.createElement("div");Object.assign(S.style,C?i.cardHistory:i.card);let u=a[d.type]||a.info,x=document.createElement("div");Object.assign(x.style,i.cardHeader);let q=document.createElement("div");Object.assign(q.style,i.typeTag,{color:u.color,background:u.bg}),q.innerHTML=`${u.icon} <span>${d.type}</span>`;let j=document.createElement("span");if(Object.assign(j.style,i.dateTag),j.textContent=s(d.date),x.appendChild(q),C)x.appendChild(j);else{let _=document.createElement("button");_.className="cw-btn-interactive",Object.assign(_.style,i.dismissBtn),_.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',_.onmouseenter=()=>{_.style.color="#1e8e3e",_.style.background="#e6f4ea",_.style.borderColor="#1e8e3e"},_.onmouseleave=()=>{_.style.color="#5f6368",_.style.background="#fff",_.style.borderColor="rgba(0,0,0,0.1)"},_.onclick=H=>{H.stopPropagation(),te.playClick(),S.style.transform="translateX(20px)",S.style.opacity="0",setTimeout(()=>{let de=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");de.push(d.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(de)),k(),T()},200)},x.appendChild(_)}let F=document.createElement("div");Object.assign(F.style,i.cardContent);let N=document.createElement("div");Object.assign(N.style,i.msgTitle),N.textContent=d.title;let z=document.createElement("div");Object.assign(z.style,i.msgBody),z.innerHTML=p(d.text);let U=document.createElement("div");if(Object.assign(U.style,i.msgMeta),U.innerHTML=`Publicado por <b>${d.author||"Sistema"}</b>`,C||(U.innerHTML+=` \u2022 ${s(d.date)}`),F.appendChild(N),F.appendChild(z),F.appendChild(U),S.appendChild(x),S.appendChild(F),window._cwIsAdmin){let _=document.createElement("div");_.className="cw-card-actions";let H=document.createElement("button");H.className="cw-action-btn edit",H.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',H.onclick=()=>G(d);let de=document.createElement("button");de.className="cw-action-btn delete",de.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',de.onclick=()=>E(d.id),_.appendChild(H),_.appendChild(de),S.appendChild(_)}return S}let R=we.getCachedBroadcasts();R.length>0&&(Ht(R),k()),setTimeout(O,500),I(),n||(n=setInterval(I,Yo));let A=document.createElement("div");Object.assign(A.style,Ze),A.className="no-drag",c.appendChild(A),Je(c,A),document.body.appendChild(c);let v=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),B=ze.some(d=>!v.includes(d.id));return{toggle:l,hasUnread:B}}function qo(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let t=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],e=0,n={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},o=document.createElement("div");Object.assign(o.style,n.overlay);let s=document.createElement("div");Object.assign(s.style,n.card);let i=document.createElement("div");Object.assign(i.style,n.icon);let a=document.createElement("div");Object.assign(a.style,n.title);let r=document.createElement("div");Object.assign(r.style,n.text);let p=document.createElement("div");Object.assign(p.style,n.dotsContainer);let c=document.createElement("div");Object.assign(c.style,n.btnContainer);let b=document.createElement("button");b.textContent="Pular",Object.assign(b.style,n.btn,n.btnSkip),b.onmouseover=()=>b.style.color="#202124",b.onmouseout=()=>b.style.color="#5f6368";let l=document.createElement("button");l.textContent="Pr\xF3ximo",Object.assign(l.style,n.btn,n.btnNext),l.onmouseover=()=>l.style.transform="scale(1.05)",l.onmouseout=()=>l.style.transform="scale(1)",c.appendChild(b),c.appendChild(l),s.appendChild(i),s.appendChild(a),s.appendChild(r),s.appendChild(p),s.appendChild(c),o.appendChild(s),document.body.appendChild(o);function f(m){let O=t[m];i.textContent=O.icon,a.textContent=O.title,r.textContent=O.text,p.innerHTML="",t.forEach((M,D)=>{let G=document.createElement("div");Object.assign(G.style,n.dot),D===m&&Object.assign(G.style,n.dotActive),p.appendChild(G)}),O.isLast?(b.style.display="none",l.textContent="Come\xE7ar \u{1F680}",l.style.width="100%"):(b.style.display="block",l.textContent="Pr\xF3ximo",l.style.width="auto")}function g(){localStorage.setItem("cw_onboarding_seen_v1","true"),o.style.opacity="0",s.style.transform="translateY(20px)",setTimeout(()=>o.remove(),400),te.playSuccess(),$("Tudo pronto! Use o menu flutuante.")}l.onclick=()=>{te.playClick(),e<t.length-1?(e++,f(e)):g()},b.onclick=()=>{confirm("Pular o tutorial?")&&g()},f(0),requestAnimationFrame(()=>{o.style.opacity="1",s.style.transform="translateY(0)"})}function Xo(){if(window.techSolInitialized){Ft();return}window.techSolInitialized=!0,console.log("\u{1F680} TechSol Suite Initializing...");try{oo();try{te.initGlobalListeners(),te.playStartup()}catch(i){console.warn("\xC1udio n\xE3o p\xF4de ser iniciado automaticamente:",i)}we.fetchTips(),Ft();let t=Co(),e=So(),n=To(),o=Oo(),s=Io();fo({toggleNotes:t,toggleEmail:e,toggleScript:n,toggleLinks:o,broadcastControl:s}),setTimeout(()=>{qo()},1500)}catch(t){console.error("Erro fatal na inicializa\xE7\xE3o:",t),$("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}Xo();})();
