(()=>{var nt="",bo=e=>new Promise(t=>setTimeout(t,e));async function Lt(){if(nt)return nt;try{let e=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!e)return"Agente";e.click(),await bo(100);let t="Consultor",n=document.querySelector("profile-details .name");if(n)t=n.textContent.trim().split(" ")[0],t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();else{let o=document.querySelector("profile-details img");if(o&&o.src.includes("/photos/")){let i=o.src.match(/\/photos\/([^\?]+)/)[1];t=i.charAt(0).toUpperCase()+i.slice(1)}}return e.click(),document.body.click(),nt=t,t}catch(e){return console.warn("Sherlock falhou:",e),"Consultor"}}function ft(){return nt||"Consultor"}function Mt(e){let t=new Date,n=t.getHours(),o=t.getDay(),i="Ol\xE1",r="";n>=5&&n<12?(i="Bom dia",r='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):n>=12&&n<18?(i="Boa tarde",r='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(i="Boa noite",r='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let a=[];n>=0&&n<5?a=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:n<12?o===1?a=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:o===5?a=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:a=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:n<18?a=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:a=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(o===0||o===6)&&(a=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let l=a[Math.floor(Math.random()*a.length)];return{prefix:`${i},`,name:e,suffix:l,icon:r,isFriday:o===5}}function ht(){let e="Cliente",t="[INSERIR URL]";try{let o=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(o&&o.nextElementSibling){let i=o.nextElementSibling.innerText.trim();i&&(e=i)}}catch(n){console.warn("Falha ao capturar Nome:",n)}try{let o=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(o&&o.nextElementSibling){let i=o.nextElementSibling.innerText.trim();i&&(t=i)}}catch(n){console.warn("Falha ao capturar Website:",n)}return{advertiserName:e,websiteUrl:t,agentName:ft()}}var Be=null,xt=null,Ne=.3;function ze(){if(!Be){let e=window.AudioContext||window.webkitAudioContext;e&&(Be=new e)}return Be&&Be.state==="suspended"&&Be.resume(),Be}function Dt(e){if(xt)return xt;let t=e.sampleRate*2,n=e.createBuffer(1,t,e.sampleRate),o=n.getChannelData(0);for(let i=0;i<t;i++)o[i]=Math.random()*2-1;return xt=n,n}var J={playClick:()=>{let e=ze();if(!e)return;let t=e.currentTime,n=e.createBufferSource();n.buffer=Dt(e);let o=e.createBiquadFilter();o.type="highpass",o.frequency.value=4e3;let i=e.createGain();i.gain.setValueAtTime(Ne*.8,t),i.gain.exponentialRampToValueAtTime(.001,t+.015),n.connect(o),o.connect(i),i.connect(e.destination),n.start(t),n.stop(t+.02)},playHover:()=>{let e=ze();if(!e)return;let t=e.currentTime,n=e.createOscillator();n.type="sine",n.frequency.setValueAtTime(400,t);let o=e.createGain();o.gain.setValueAtTime(0,t),o.gain.linearRampToValueAtTime(Ne*.1,t+.005),o.gain.linearRampToValueAtTime(0,t+.02),n.connect(o),o.connect(e.destination),n.start(t),n.stop(t+.03)},playSuccess:()=>{let e=ze();if(!e)return;let t=e.currentTime;[1046.5,1567.9].forEach((o,i)=>{let r=e.createOscillator(),a=e.createGain();r.type="sine",r.frequency.value=o,a.gain.setValueAtTime(0,t),a.gain.linearRampToValueAtTime(Ne*.6,t+.05),a.gain.exponentialRampToValueAtTime(.001,t+.6),r.connect(a),a.connect(e.destination),r.start(t),r.stop(t+.7)})},playGenieOpen:()=>{let e=ze();if(!e)return;let t=e.currentTime,n=e.createBufferSource();n.buffer=Dt(e);let o=e.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(100,t),o.frequency.exponentialRampToValueAtTime(800,t+.2);let i=e.createGain();i.gain.setValueAtTime(0,t),i.gain.linearRampToValueAtTime(Ne*.5,t+.05),i.gain.linearRampToValueAtTime(0,t+.25),n.connect(o),o.connect(i),i.connect(e.destination),n.start(t),n.stop(t+.3)},playError:()=>{let e=ze();if(!e)return;let t=e.currentTime,n=e.createOscillator(),o=e.createGain();n.type="triangle",n.frequency.setValueAtTime(120,t),n.frequency.exponentialRampToValueAtTime(80,t+.1),o.gain.setValueAtTime(Ne,t),o.gain.exponentialRampToValueAtTime(.001,t+.15),n.connect(o),o.connect(e.destination),n.start(t),n.stop(t+.2)},_playStartup:()=>{let e=ze();if(!e)return;let t=e.currentTime,n=e.createOscillator(),o=e.createGain();n.connect(o),o.connect(e.destination),n.frequency.setValueAtTime(150,t),n.frequency.exponentialRampToValueAtTime(40,t+.1),o.gain.setValueAtTime(Ne*2,t),o.gain.exponentialRampToValueAtTime(.001,t+.2),n.start(t),n.stop(t+.2),[55,55.5,110].forEach((r,a)=>{let l=e.createOscillator(),p=e.createGain(),m=e.createBiquadFilter();l.type="sawtooth",l.frequency.value=r,m.type="lowpass",m.frequency.setValueAtTime(50,t),m.frequency.linearRampToValueAtTime(800,t+.3),m.frequency.exponentialRampToValueAtTime(50,t+2),p.gain.setValueAtTime(0,t),p.gain.linearRampToValueAtTime(Ne*.5,t+.1),p.gain.exponentialRampToValueAtTime(.001,t+3),l.connect(m),m.connect(p),p.connect(e.destination),l.start(t),l.stop(t+3.1)})},playNotification:()=>{let e=ze();if(!e)return;let t=e.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(o=>{let i=e.createOscillator(),r=e.createGain();i.type="sine",i.frequency.setValueAtTime(o.freq,t),r.gain.setValueAtTime(0,t),r.gain.linearRampToValueAtTime(Ne*o.vol,t+.004),r.gain.exponentialRampToValueAtTime(.001,t+o.dur),i.connect(r),r.connect(e.destination),i.start(t),i.stop(t+o.dur+.1)})},playSwoosh:()=>{J.playGenieOpen()},playReset:()=>{J.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let e=0,t=50;document.addEventListener("mouseover",n=>{if(!Be)return;let o=n.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!o||o.contains(n.relatedTarget))return;let i=Date.now();i-e<t||(J.playHover(),e=i)},{passive:!0})}};var Ft=1e4;function zt(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
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
    `,document.head.appendChild(t)}function oe(e,t={}){let n=document.createElement("div"),o=t.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(n.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:o,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),n.textContent=e,document.body.appendChild(n),t.error?J.playError():J.playSuccess(),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>n.remove(),400)},t.duration||4e3)}function Bt(e,t=null){let n=0,o=0,i=0,r=0,a=t||e;a.style.cursor="grab",a.onmousedown=l;function l(A){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(A.target.tagName)||A.target.closest(".no-drag"))return;A=A||window.event,a.style.cursor="grabbing",e.style.transition="none";let u=e.getBoundingClientRect();e.style.transform="none",e.style.left=u.left+"px",e.style.top=u.top+"px",e.style.margin="0",e.style.bottom="auto",e.style.right="auto",Ft++,e.style.zIndex=Ft,i=A.clientX,r=A.clientY,e.setAttribute("data-dragging","true"),document.onmouseup=m,document.onmousemove=p}function p(A){A=A||window.event,A.preventDefault(),n=i-A.clientX,o=r-A.clientY,i=A.clientX,r=A.clientY;let u=e.offsetTop-o,O=e.offsetLeft-n,h=16,f=window.innerWidth,x=window.innerHeight,E=e.offsetWidth,q=e.offsetHeight;O<h?O=h:O+E>f-h&&(O=f-E-h),u<h?u=h:u+q>x-h&&(u=x-q-h),e.style.top=u+"px",e.style.left=O+"px"}function m(){document.onmouseup=null,document.onmousemove=null,a.style.cursor="grab",setTimeout(()=>{e.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",e.setAttribute("data-dragging","false"),e.setAttribute("data-moved","true")},50)}}var Ae={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var vt={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},jt={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var Pt={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var me={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var yt=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],Gt=-1;function Ze(){let e=Math.floor(Math.random()*yt.length);return e===Gt&&(e=(e+1)%yt.length),Gt=e,yt[e]}var Oe=e=>new Promise(t=>setTimeout(t,e));async function fo(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let n=e.querySelector(".cursor");await Oe(200);for(let o=0;o<t.length;o++){let i=t.charAt(o),r=document.createElement("span");r.textContent=i,n&&n.parentNode===e?n.before(r):e.appendChild(r);let a=Math.floor(Math.random()*60)+30;o===0&&(a=150),o>t.length-3&&(a=30),await Oe(a)}await Oe(600),n&&(n.style.display="none")}async function At(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
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
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await Oe(200);let t=await Lt(),n=Mt(t),o=e.querySelector("#w-icon"),i=e.querySelector("#p1"),r=e.querySelector("#p2"),a=e.querySelector("#p3"),l=e.querySelector("#p-sextou");o&&(o.innerHTML=n.icon),i&&(i.textContent=n.prefix),a&&(a.textContent=n.suffix),await Oe(300);let p=o?o.querySelector("svg"):null;if(p&&(p.style.opacity="1",p.style.transform="scale(1)"),await Oe(400),i&&(i.style.opacity="1"),J.playStartup(),r&&await fo(r,n.name),a&&(a.style.opacity="1",a.style.transform="translateY(0)"),n.isFriday&&l){await Oe(400),l.style.display="block",l.offsetWidth;let m=l.querySelector(".sextou-badge");m&&(m.style.opacity="1",m.style.transform="scale(1)")}await Oe(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await Oe(900),e.parentNode&&e.parentNode.removeChild(e)}}var We={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Ye(e,t){t.onmousedown=n;function n(o){o.stopPropagation(),o.preventDefault();let i=e.style.transition;e.style.transition="none";let r=o.clientX,a=o.clientY,l=parseFloat(getComputedStyle(e,null).getPropertyValue("width").replace("px","")),p=parseFloat(getComputedStyle(e,null).getPropertyValue("height").replace("px","")),m=r,A=a,u=!1;function O(x){m=x.clientX,A=x.clientY,u||(window.requestAnimationFrame(()=>{h(),u=!1}),u=!0)}function h(){let x=l+(m-r),E=p+(A-a);x>360&&(e.style.width=x+"px"),E>300&&(e.style.height=E+"px")}function f(){document.removeEventListener("mousemove",O),document.removeEventListener("mouseup",f),setTimeout(()=>{e.style.transition=i},50)}document.addEventListener("mousemove",O),document.addEventListener("mouseup",f)}t.onmouseenter=()=>t.style.opacity="1",t.onmouseleave=()=>t.style.opacity="0.6"}function Ht(e){if(!e)return"";let t={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return e.replace(/:([a-zA-Z0-9-_+]+):/g,n=>t[n]?t[n]:"")}var qe={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:"}},_e={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:[]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},et={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"}},at={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl"},tt=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],wt=["CONSIDERACOES","COMENTARIOS"],we={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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
\u2022 Tentativa 3 - `,"field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-2-6-final":{type:"all","field-REASON_COMMENTS":"Finaliza\xE7\xE3o (2/6)","field-SPEAKEASY_ID":"-","field-ON_CALL":"-","field-COMENTARIOS":"\u2022 Dia 9 finaliza\xE7\xE3o do 2/6, durante o per\xEDodo do acompanhamento n\xE3o houve retorno do anunciante, ent\xE3o o caso ser\xE1 encerrado.","field-SCREENSHOTS":"\u2022 N/A","field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-manual":{type:"all","field-REASON_COMMENTS":"Outro (Manual)","field-GTM_GA4_VERIFICADO":"N/A"}};var pe=e=>new Promise(t=>setTimeout(t,e));function Re(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>e.dispatchEvent(new MouseEvent(n,t)))}function it(){return Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(t=>{let n=t.offsetParent!==null,o=t.closest("case-message-view")!==null,i=t.closest(".editor")!==null||t.closest("write-card")!==null;return n&&!o&&i})}async function Vt(){let e=!1,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(l=>l.innerText.trim()==="email");if(n&&n.offsetParent!==null){let l=n.closest("material-button")||n.closest("material-fab")||n;l.style&&(l.style.display="block",l.style.visibility="visible"),Re(l),e=!0}else{let l=document.querySelector("material-fab-speed-dial");if(l){let p=l.querySelector(".trigger");if(p){p.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),Re(p),await pe(1e3);let A=Array.from(document.querySelectorAll("i.material-icons-extended")).find(u=>u.innerText.trim()==="email");A&&(Re(A),e=!0)}else l.click()}}let o=0,i=it();for(console.log("\u23F3 Aguardando editor EDIT\xC1VEL...");!i&&o<30;)await pe(500),i=it(),o++;if(!i)return oe("Erro: Editor de email n\xE3o apareceu.",{error:!0}),!1;let a=Array.from(document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]')).find(l=>l.offsetParent!==null);if(a){console.log("\u26A0\uFE0F Rascunho detectado. Clicando em Discard..."),Re(a);let l=null,p=0;for(;!l&&p<10;)await pe(200),l=Array.from(document.querySelectorAll('material-button[debug-id="confirm-button"]')).find(A=>A.offsetParent!==null),p++;l?(console.log("\u2705 Confirmando descarte..."),Re(l),await pe(2500)):console.warn("\u26A0\uFE0F Cliquei em Discard, mas o bot\xE3o Confirm n\xE3o apareceu.")}if(i){let l=i.closest('[id="email-body-content-top"]'),m=(i.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(l){if(m){let u=m.closest('[aria-hidden="true"]');u&&u.removeAttribute("aria-hidden"),m.focus()}await pe(300),l.innerHTML=`
                <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                    <span id="cases-body-field"><br></span>
                </div>
            `;let A=l.querySelector("#cases-body-field");if(A){let u=document.createRange();u.selectNodeContents(A),u.collapse(!0);let O=window.getSelection();O.removeAllRanges(),O.addRange(u)}return!0}}return oe("Erro cr\xEDtico ao acessar editor.",{error:!0}),!1}async function $t(e){if(!e)return;oe("Preparando email...",{duration:3e3});let t=ht();if(!await Vt())return;await pe(500);let o=document.querySelector('material-button[debug-id="canned_response_button"]');if(o){o.scrollIntoView({behavior:"smooth",block:"center"}),await pe(200),Re(o),await pe(1500);let i=document.querySelector("material-auto-suggest-input input");if(i){Re(i),await pe(200),document.execCommand("insertText",!1,e),i.dispatchEvent(new Event("input",{bubbles:!0}));let r=null,a=0;for(;a<20;){await pe(500),a++;let l=Array.from(document.querySelectorAll("material-select-dropdown-item"));if(l.length>0&&(r=l.find(p=>p.innerText.toLowerCase().includes(e.toLowerCase())),!r&&l.length===1&&(r=l[0]),r))break}if(r){let l=function(u,O){if(u.nodeType===3&&u.nodeValue.includes(O))return u;if(!u.childNodes)return null;for(let h of u.childNodes){let f=l(h,O);if(f)return f}return null};Re(r),await pe(2e3);let p=it(),m=p?p.closest('[id="email-body-content-top"]'):document.body,A=l(m,"{%ADVERTISER_NAME%}");if(A){let u=document.createRange(),O=A.nodeValue.indexOf("{%ADVERTISER_NAME%}");u.setStart(A,O),u.setEnd(A,O+19);let h=window.getSelection();h.removeAllRanges(),h.addRange(u),document.execCommand("insertText",!1,t.advertiserName),oe("Email preenchido!")}else oe("Email inserido (Nome n\xE3o substitu\xEDdo).")}else oe(`Template '${e}' n\xE3o encontrado.`,{error:!0})}}else oe("Bot\xE3o Canned Response n\xE3o achado.",{error:!0})}async function Ct(e){console.log(`\u{1F680} Iniciando automa\xE7\xE3o (Quick): ${e.name}`),oe("Preparando email...",{duration:3e3});let t=ht(),n=ft();if(!await Vt())return;await pe(600);let i=document.querySelector('input[aria-label="Subject"]');i&&e.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,e.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await pe(300));let r=it();if(r){let l=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');l&&(l.focus(),l.click(),l.dispatchEvent(new Event("input",{bubbles:!0}))),await pe(400);let p=new Date;p.setDate(p.getDate()+3);let m=p.getDay();m===6?p.setDate(p.getDate()+2):m===0&&p.setDate(p.getDate()+1);let A=p.toLocaleDateString("pt-BR"),u=e.body;u=u.replace(/\[Nome do Cliente\]/g,t.advertiserName||"Cliente"),u=u.replace(/\[INSERIR URL\]/g,t.websiteUrl||"seu site"),u=u.replace(/\[URL\]/g,t.websiteUrl||"seu site"),u=u.replace(/\[Seu Nome\]/g,n),u=u.replace(/\[MM\/DD\/YYYY\]/g,A),document.execCommand("insertHTML",!1,u),l&&(l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0}))),oe("Email preenchido com sucesso!",{duration:2e3}),await pe(800)}else oe("Erro ao focar no editor.",{error:!0})}var ho={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},Ut={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function Ce(e,t,n,o,i,r){let a=document.createElement("div");Object.assign(a.style,ho),Bt(e,a);let l=document.createElement("div");Object.assign(l.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),a.appendChild(l),i&&(i.googleLine=l);let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center",gap:"12px"});let m=document.createElement("img");m.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(m.style,{width:"20px",height:"20px",pointerEvents:"none"});let A=document.createElement("span");A.textContent=t,p.appendChild(m),p.appendChild(A);let u=document.createElement("div");Object.assign(u.style,{display:"flex",alignItems:"center",gap:"4px"});let O='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',h='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',f=document.createElement("div");f.innerHTML=O,Object.assign(f.style,Ut),f.title="Sobre",f.classList.add("no-drag"),f.onmouseenter=()=>{f.style.background="rgba(255,255,255,0.1)",f.style.color="#FFF"},f.onmouseleave=()=>{f.style.color!=="rgb(138, 180, 248)"&&(f.style.background="transparent",f.style.color="#9AA0A6")};let x=document.createElement("div");x.innerHTML=h,Object.assign(x.style,Ut),x.title="Fechar",x.classList.add("no-drag"),x.onmouseenter=()=>{x.style.background="rgba(242, 139, 130, 0.2)",x.style.color="#F28B82"},x.onmouseleave=()=>{x.style.background="transparent",x.style.color="#9AA0A6"},x.onmousedown=q=>q.stopPropagation(),f.onmousedown=q=>q.stopPropagation(),x.onclick=r;let E=xo(e,t,n,o);return f.onclick=q=>{q.stopPropagation(),E.style.opacity==="1"?(E.style.opacity="0",E.style.pointerEvents="none",f.style.color="#9AA0A6",f.style.background="transparent"):(E.style.opacity="1",E.style.pointerEvents="auto",f.style.color="#8AB4F8",f.style.background="rgba(138, 180, 248, 0.1)")},u.appendChild(f),u.appendChild(x),a.appendChild(p),a.appendChild(u),a}function xo(e,t,n,o){let i=document.createElement("div");return Object.assign(i.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(5px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),i.innerHTML=`
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
    `,setTimeout(()=>{let r=i.querySelector("#close-help-internal");r&&(r.onmouseover=()=>r.style.backgroundColor="#f8f9fa",r.onmouseout=()=>r.style.backgroundColor="white",r.onclick=()=>{i.style.opacity="0",i.style.pointerEvents="none"})},0),e.appendChild(i),i}if(!document.getElementById("cw-module-styles")){let e=document.createElement("style");e.id="cw-module-styles",e.innerHTML=`
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
    `,document.head.appendChild(e)}function Se(e,t,n){let o=document.getElementById(n);if(!t)return;let i=t.getAttribute("data-moved")==="true",r={x:0,y:0};if(o){let A=o.getBoundingClientRect();r.x=A.left+A.width/2,r.y=A.top+A.height/2}let a,l;if(!i)a=window.innerWidth/2,l=window.innerHeight/2;else{let A=t.getBoundingClientRect();a=A.left+A.width/2,l=A.top+A.height/2,a===0&&l===0&&(a=window.innerWidth/2,l=window.innerHeight/2)}let p=r.x-a,m=r.y-l;e?(J.playGenieOpen(),t.style.transition="none",t.style.opacity="0",t.style.pointerEvents="auto",i?t.style.transform=`translate(${p}px, ${m}px) scale(0.05)`:t.style.transform=`translate(calc(-50% + ${p}px), calc(-50% + ${m}px)) scale(0.05)`,t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("open"),o&&o.classList.add("active"),t.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",t.style.opacity="1",i?t.style.transform="translate(0, 0) scale(1)":t.style.transform="translate(-50%, -50%) scale(1)"}),typeof Wt=="function"&&Wt(t,n)):(J.playSwoosh(),t.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",t.style.pointerEvents="none",requestAnimationFrame(()=>{t.style.opacity="0",i?t.style.transform=`translate(${p}px, ${m}px) scale(0.1)`:t.style.transform=`translate(calc(-50% + ${p}px), calc(-50% + ${m}px)) scale(0.1)`}),setTimeout(()=>{t.classList.remove("open"),o&&o.classList.remove("active"),t.style.transition="",t.style.transform=""},300),typeof St=="function"&&St(t))}function Wt(e,t){St(e);let n=o=>{if(!e.classList.contains("open"))return;let i=e.contains(o.target),r=document.querySelector(".cw-pill"),a=r&&r.contains(o.target);i?(e.classList.remove("idle"),e.style.zIndex="2147483648"):a||(e.classList.add("idle"),e.style.zIndex="2147483646")};e._idleHandler=n,document.addEventListener("mousedown",n)}function St(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}var Kt="https://script.google.com/a/macros/google.com/s/AKfycbwxxY5EhL3U1ZIEvs_y28FFeIFr7rMfSzNIljclqPd9Mk58-gx7pBRfZ8pQmXt2P1IMjw/exec",Et="cw_data_broadcast",Yt="cw_data_tips",yo=["Processando sua solicita\xE7\xE3o...","Dica: Mantenha suas notas organizadas.","Aguarde um momento...","Quase l\xE1..."];function Xt(e){return new Promise((t,n)=>{let o="cw_cb_"+Math.round(1e4*Math.random()),i=document.createElement("script");window[o]=r=>{document.body.removeChild(i),delete window[o],t(r)},i.src=`${Kt}?op=${e}&callback=${o}&t=${Date.now()}`,i.onerror=()=>{document.body.removeChild(i),delete window[o],n(new Error("JSONP Load Error"))},document.body.appendChild(i)})}var je={fetchTips:async()=>{try{console.log("\u{1F4E5} Baixando dicas via JSONP...");let e=await Xt("tips");e&&e.tips&&Array.isArray(e.tips)&&(localStorage.setItem(Yt,JSON.stringify(e.tips)),console.log("\u2705 Dicas atualizadas:",e.tips.length))}catch(e){console.warn("TechSol: Erro ao baixar dicas (Offline).",e)}},fetchData:async()=>{try{console.log("\u{1F4E5} Baixando Broadcasts via JSONP...");let e=await Xt("broadcast");if(e&&e.broadcast)return localStorage.setItem(Et,JSON.stringify(e.broadcast)),console.log("\u2705 Broadcasts atualizados:",e.broadcast.length),e}catch(e){console.warn("TechSol: Erro ao buscar Broadcasts.",e)}return{broadcast:JSON.parse(localStorage.getItem(Et)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(Et)||"[]"),getRandomTip:()=>{let e=yo,t=localStorage.getItem(Yt);if(t)try{e=JSON.parse(t)}catch{}return e[Math.floor(Math.random()*e.length)]},logUsage:(e,t="")=>{let o={op:"log",user:window._USER_ID||"agente_anonimo",action:e,meta:t};fetch(Kt,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(o)}).catch(i=>console.log("Log fail",i))}};var ne={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00"},st=e=>new Promise(t=>setTimeout(t,e));function Qt(e){let t="cw-command-center-style";if(!document.getElementById(t)){let h=document.createElement("style");h.id=t,h.innerHTML=`
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
                background: ${ne.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${ne.glassBorder}; border-radius: 50px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.4); z-index: 2147483647;
                opacity: 0; transform: translateX(40px) scale(0.95);
                transition: opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
            }
            .cw-pill.docked { opacity: 1; transform: translateX(0) scale(1); }

            .cw-btn {
                width: 40px; height: 40px; 
                border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center; 
                cursor: pointer; position: relative; color: ${ne.iconIdle};
                opacity: 0; transform: scale(0.5);
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-btn.popped { opacity: 1; transform: scale(1); }

            .cw-btn:hover { background: ${ne.glassHighlight}; color: ${ne.iconActive}; transform: scale(1.1); }

            /* Estados Ativos e Cores */
            .cw-btn.notes.active { color: ${ne.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${ne.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${ne.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${ne.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.broadcast.active { color: ${ne.orange} !important; background: rgba(249, 171, 0, 0.15); } /* NOVO */

            .cw-btn.notes:hover { color: ${ne.blue}; filter: drop-shadow(0 0 5px rgba(138, 180, 248, 0.5)); }
            .cw-btn.email:hover { color: ${ne.red}; filter: drop-shadow(0 0 5px rgba(242, 139, 130, 0.5)); }
            .cw-btn.script:hover { color: ${ne.purple}; filter: drop-shadow(0 0 5px rgba(197, 138, 249, 0.5)); }
            .cw-btn.links:hover { color: ${ne.green}; filter: drop-shadow(0 0 5px rgba(129, 201, 149, 0.5)); }
            .cw-btn.broadcast:hover { color: ${ne.orange}; filter: drop-shadow(0 0 5px rgba(249, 171, 0, 0.5)); } /* NOVO */

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

            /* BADGE DE NOTIFICA\xC7\xC3O (Bolinha Vermelha) */
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
                width: 24px; height: 4px; background-color: ${ne.iconIdle}; border-radius: 4px; 
                opacity: 0.4; transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1); 
            }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            .cw-grip:active { cursor: grabbing; }
            .cw-pill.dragging .cw-grip-bar { background-color: ${ne.blue}; width: 16px; opacity: 1; }

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

/* ... seus estilos atuais ... */

/* --- NOVO: ESTILOS DA ILHA DIN\xC2MICA --- */

/* 1. Transi\xE7\xE3o Fluida para a P\xEDlula (Sobrescreve a padr\xE3o para ficar igual Apple) */
.cw-pill {
    transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}

/* 2. O Estado Central (Transforma\xE7\xE3o) */
.cw-pill.processing-center {
    top: 50% !important; left: 50% !important;
    transform: translate(-50%, -50%) !important;
    width: 320px !important; height: 110px !important;
    border-radius: 28px !important;
    background: #202124 !important; /* Fundo s\xF3lido para destaque */
    padding: 0 !important;
    box-shadow: 0 40px 80px rgba(0,0,0,0.5) !important;
    
    /* Centraliza conte\xFAdo */
    display: flex !important; flex-direction: column !important;
    justify-content: center !important; align-items: center !important;
}

/* 3. Esconde os bot\xF5es velhos quando for para o centro */
.cw-pill.processing-center > *:not(.cw-center-stage) {
    display: none !important;
}

/* 4. O Palco Central (Onde as bolinhas v\xE3o viver) */
.cw-center-stage {
    display: flex; flex-direction: column; align-items: center; gap: 14px;
    width: 100%; opacity: 0; animation: fadeIn 0.4s ease forwards 0.1s;
}

/* 5. AS BOLINHAS DO GOOGLE (R\xE9plica exata da sua original) */
.cw-center-dots { display: flex; gap: 8px; }
.cw-center-dots span {
    width: 8px; height: 8px; border-radius: 50%;
    animation: googleBounce 1.4s infinite ease-in-out both;
}
/* Usa as vari\xE1veis COLORS que j\xE1 existem no seu arquivo */
.cw-center-dots span:nth-child(1) { background-color: ${ne.blue}; animation-delay: -0.32s; }
.cw-center-dots span:nth-child(2) { background-color: ${ne.red}; animation-delay: -0.16s; }
.cw-center-dots span:nth-child(3) { background-color: ${ne.green}; }

/* 6. Texto da Dica */
.cw-center-text {
    font-size: 13px; 
    color: #E8EAED; 
    text-align: center; 
    max-width: 90%;
    font-weight: 500; /* Aumentei um pouco o peso */
    line-height: 1.4;
    
    /* A M\xC1GICA: */
    opacity: 0;
    transform: translateY(10px); /* Come\xE7a um pouco para baixo */
    animation: textSlideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    animation-delay: 0.2s; /* Espera as bolinhas come\xE7arem */
}

/* 7. Sucesso */
.cw-center-success { display: none; color: ${ne.green}; }
.cw-center-success svg { width: 40px; height: 40px; }
.cw-center-success.show { display: block; animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }

@keyframes fadeIn { to { opacity: 1; } }
@keyframes popIn { from { transform: scale(0.5); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes googleBounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
}
    @keyframes textSlideUp {
    to { opacity: 1; transform: translateY(0); }
}
        `,document.head.appendChild(h)}let n={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>'},o=document.createElement("div");o.className="cw-pill side-right",o.innerHTML=`
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
    `;let i=document.createElement("div");if(i.className="cw-focus-backdrop",document.body.appendChild(i),document.body.appendChild(o),o.querySelector(".notes").onclick=h=>{h.stopPropagation(),e.toggleNotes()},o.querySelector(".email").onclick=h=>{h.stopPropagation(),e.toggleEmail()},o.querySelector(".script").onclick=h=>{h.stopPropagation(),e.toggleScript()},o.querySelector(".links").onclick=h=>{h.stopPropagation(),e.toggleLinks()},o.querySelector(".broadcast").onclick=h=>{h.stopPropagation();let f=h.currentTarget.querySelector(".cw-badge");f&&(f.style.transform="scale(0)",setTimeout(()=>f.remove(),200)),e.broadcastControl&&e.broadcastControl.toggle()},e.broadcastControl&&e.broadcastControl.hasUnread){let h=document.createElement("div");h.className="cw-badge",o.querySelector(".broadcast").appendChild(h)}(async function(){await st(2800),o.classList.add("docked"),await st(300);let f=o.querySelectorAll(".cw-btn");o.querySelectorAll(".cw-sep").forEach(E=>E.classList.add("visible"));for(let E=0;E<f.length;E++)f[E].classList.add("popped"),await st(90);await st(200),o.classList.add("system-check")})();let r=!1,a,l,p,m,A=3;o.onmousedown=h=>{if(h.target.closest("button"))return;h.preventDefault(),a=h.clientX,l=h.clientY;let f=o.getBoundingClientRect();p=f.left,m=f.top,document.addEventListener("mousemove",u),document.addEventListener("mouseup",O)};function u(h){let f=h.clientX-a,x=h.clientY-l;!r&&Math.sqrt(f*f+x*x)>A&&(r=!0,o.style.transition="none"),r&&(o.style.left=`${p+f}px`,o.style.top=`${m+x}px`,o.style.right="auto",o.style.bottom="auto",o.style.transform="none")}function O(h){if(document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",O),r){r=!1,o.style.transition="left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s ease";let f=window.innerWidth,x=window.innerHeight,E=o.getBoundingClientRect(),q=E.left+E.width/2,_;q<f/2?(_=24,o.classList.remove("side-right"),o.classList.add("side-left")):(_=f-E.width-24,o.classList.remove("side-left"),o.classList.add("side-right"));let B=E.top;B<24&&(B=24),B>x-E.height-24&&(B=x-E.height-24),o.style.left=`${_}px`,o.style.top=`${B}px`}else{let f=h.target.closest("button");f&&(f.style.transform="scale(0.9)",setTimeout(()=>f.style.transform="",150))}}}function Xe(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop");if(!e)return()=>{};let n=document.createElement("div");n.className="cw-center-stage",n.innerHTML=`
        <div class="cw-center-dots">
            <span></span><span></span><span></span>
        </div>
        <div class="cw-center-text">${je.getRandomTip()}</div>
        <div class="cw-center-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
    `,e.appendChild(n);let o=Date.now();return e.classList.add("processing-center"),t&&t.classList.add("active"),function(){let r=Date.now()-o,a=Math.max(0,2e3-r);setTimeout(()=>{let l=n.querySelector(".cw-center-dots"),p=n.querySelector(".cw-center-text"),m=n.querySelector(".cw-center-success");l&&(l.style.display="none"),p&&(p.style.display="none"),m&&m.classList.add("show"),e.classList.add("success"),setTimeout(()=>{e.classList.remove("processing-center"),setTimeout(()=>{n.remove(),e.classList.remove("success"),t&&t.classList.remove("active")},400)},1e3)},a)}}function Jt(e){let t=document.createElement("div");t.className="cw-step-scenarios";let n=document.createElement("div");Object.assign(n.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let o=document.createElement("div");Object.assign(o.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"40px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s ease"}),o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>";let i=null;Object.entries(we).forEach(([a,l])=>{let p=document.createElement("div");p.textContent=a,Object.assign(p.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",display:"flex",alignItems:"center",gap:"6px"}),p.onmouseenter=()=>{i!==l&&(o.style.background="#fff",o.style.borderColor="#1a73e8",o.style.color="#202124",o.textContent=`"${l.substring(0,120)}${l.length>120?"...":""}"`),i!==l&&(p.style.background="#f1f3f4")},p.onmouseleave=()=>{i!==l&&(i||(o.style.background="#f8f9fa",o.style.borderColor="#dadce0",o.style.color="#5f6368",o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>"),p.style.background="#ffffff")},p.onclick=()=>{J.playClick(),i===l?(i=null,r(),e("")):(i=l,r(),p.style.transform="scale(0.95)",setTimeout(()=>p.style.transform="scale(1)",150),e(l))},n.appendChild(p)});function r(){Array.from(n.children).forEach(a=>{we[a.textContent]===i?(a.style.background="#e8f0fe",a.style.borderColor="#1a73e8",a.style.color="#1967d2",a.style.fontWeight="500"):(a.style.background="#ffffff",a.style.borderColor="#dadce0",a.style.color="#3c4043",a.style.fontWeight="400")})}return t.appendChild(n),t.appendChild(o),t}var Zt=e=>new Promise(t=>setTimeout(t,e));function rt(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>e.dispatchEvent(new MouseEvent(n,t)))}function Tt(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let n=document.createRange();n.selectNodeContents(t);let o=window.getSelection();o.removeAllRanges(),o.addRange(n);try{document.execCommand("copy")}catch{oe("Falha ao copiar",{error:!0})}o.removeAllRanges(),document.body.removeChild(t)}function to(e){["input","change","keydown","keyup"].forEach(n=>{let o=new Event(n,{bubbles:!0,cancelable:!0});e.dispatchEvent(o)})}function eo(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function oo(){console.log("Iniciando processo de Nova Nota...");let e=eo(),t=e.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(a=>a.innerText.trim()==="description");if(o){let a=o.closest("material-fab")||o.closest("material-button");a?(a.style&&(a.style.display="block",a.style.visibility="visible"),rt(a)):rt(o)}else{let a=document.querySelector("material-fab-speed-dial");if(a){let l=a.querySelector(".trigger");l?(l.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),rt(l)):a.click(),await Zt(800);let m=Array.from(document.querySelectorAll("i.material-icons-extended")).find(A=>A.innerText.trim()==="description");m&&rt(m)}}let i=null,r=0;for(;!i&&r<20;){await Zt(300);let a=eo();if(a.length>t)i=a.find(l=>!e.includes(l)),i||(i=a[a.length-1]);else if(r>10){let l=a.filter(p=>p.offsetParent!==null);l.length>0&&(i=l[l.length-1])}r++}return i}var P={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},Ee="cubic-bezier(0.25, 0.8, 0.25, 1)",vo={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${P.border}`,backgroundColor:P.bgInput,fontSize:"14px",color:P.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${Ee}, box-shadow 0.2s ${Ee}, background-color 0.2s`,outline:"none"},Yo={...vo,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},Xo={fontSize:"13px",fontWeight:"700",color:P.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},Ko={display:"block",fontSize:"13px",fontWeight:"600",color:P.text,marginBottom:"8px",marginTop:"16px"},Qo={fontSize:"12px",color:P.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},Jo={fontSize:"12px",color:P.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},Zo={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:P.text,cursor:"pointer",padding:"12px 14px",backgroundColor:P.surface,border:`1px solid ${P.border}`,borderRadius:"12px",transition:`all 0.2s ${Ee}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},kt={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:P.primary},en={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:P.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${Ee}, box-shadow 0.2s ${Ee}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},tn={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${P.primary}`,color:P.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${Ee}`},on={background:"transparent",border:`1px solid ${P.border}`,borderRadius:"20px",color:P.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${Ee}`,fontFamily:"'Google Sans', 'Roboto'"};var nn={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:P.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},an={fontSize:"13px",fontWeight:"700",color:P.primary,minWidth:"20px",textAlign:"center"},sn={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${P.border}`,backgroundColor:P.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${Ee}, box-shadow 0.2s ${Ee}`},rn={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${P.bgInput}`},ln={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${P.border}`,backgroundColor:P.surface,color:P.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${Ee}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},cn={backgroundColor:P.primaryBg,color:P.primary,borderColor:P.primary,fontWeight:"600"},dn={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:P.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},pn={borderTop:`1px solid ${P.bgInput}`,paddingTop:"20px",marginTop:"16px"};var un={maxHeight:"240px",overflowY:"auto",border:`1px solid ${P.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:P.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},mn={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${P.bgInput}`,cursor:"pointer",fontSize:"13px",color:P.text,transition:"background 0.1s",userSelect:"none"};var Ao={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},wo={fontSize:"12px",color:"#e37400",marginTop:"4px"},Co={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},So={display:"flex",gap:"15px",marginBottom:"10px"};function no(){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,Ao);let t=document.createElement("label");t.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(t.style,vt,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,So);let o=document.createElement("input");o.type="radio",o.name="ts_usage_mod",o.value="Sim",Object.assign(o.style,kt);let i=document.createElement("label");i.textContent="Sim";let r=document.createElement("div");Object.assign(r.style,{display:"flex",alignItems:"center"}),r.appendChild(o),r.appendChild(i);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="N\xE3o",a.checked=!0,Object.assign(a.style,kt);let l=document.createElement("label");l.textContent="N\xE3o";let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center"}),p.appendChild(a),p.appendChild(l),n.appendChild(r),n.appendChild(p);let m=document.createElement("div");m.style.display="block";let A=document.createElement("label");A.textContent="Qual foi o Motivo?",Object.assign(A.style,vt,{fontSize:"12px"});let u=document.createElement("input");u.type="text",Object.assign(u.style,Co);let O=document.createElement("div");O.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(O.style,wo),m.appendChild(A),m.appendChild(u),m.appendChild(O),e.appendChild(t),e.appendChild(n),e.appendChild(m),o.onchange=()=>{m.style.display="none"},a.onchange=()=>{m.style.display="block"};function h(E,q){if(e.style.display="none",!E||E.includes("Education")||!q||q.length===0)return;let _=q.some(s=>s.includes("enhanced")||s==="ec_google_ads"),B=q.some(s=>(s.includes("conversion")||s.includes("ads"))&&!s.includes("enhanced")),V=q.some(s=>s.includes("ga4")||s.includes("analytics")||s.includes("ua")),g=q.some(s=>s.includes("merchant")||s.includes("gmc")||s.includes("shopping"));(_||B&&!V&&!g)&&(e.style.display="block")}function f(){if(e.style.display==="none")return"";let E=`<br><b>Utilizou Tag Support?</b> ${o.checked?"Sim":"N\xE3o"}`;return a.checked&&u.value.trim()!==""&&(E+=`<br><b>Motivo:</b> ${u.value}`),E+="<br>",E}function x(){e.style.display="none",a.checked=!0,o.checked=!1,m.style.display="block",u.value=""}return{element:e,updateVisibility:h,getOutput:f,reset:x}}var G={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Pe={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function ao(e){let t={},n="implementation";function o(g){let b=g.toLowerCase();return b.includes("ads")||b.includes("conversion")||b.includes("remarketing")?G.brands.ads:b.includes("ga4")||b.includes("analytics")?G.brands.ga4:b.includes("gtm")||b.includes("tag manager")||b.includes("container")?G.brands.gtm:b.includes("merchant")||b.includes("shopping")||b.includes("feed")?G.brands.gmc:G.brands.default}let i=Object.entries(_e).filter(([g,b])=>b.popular),r={};Object.entries(_e).forEach(([g,b])=>{if(b.popular)return;let s=o(b.name);r[s.label]||(r[s.label]={brand:s,tasks:[]}),r[s.label].tasks.push({key:g,...b})});let a="cw-zen-tasks";if(!document.getElementById(a)){let g=document.createElement("style");g.id=a,g.innerHTML=`
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
        `,document.head.appendChild(g)}let l=document.createElement("div");l.className="cw-zen-container";let p=document.createElement("div");Object.assign(p.style,{display:"none"});let m=document.createElement("div");m.className="cw-screens-container",p.appendChild(m),l.innerHTML=`
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
    `;let A=l.querySelector(".cw-hero-grid"),u=l.querySelector(".cw-acc-container"),O=l.querySelector(".cw-results-container"),h=l.querySelector(".cw-search-input"),f=l.querySelector(".cw-status-bar"),x=l.querySelector(".cw-status-text"),E=l.querySelector(".cw-footer-icons");i.forEach(([g,b])=>{let s=o(b.name),c=document.createElement("div");c.className="cw-hero-card",c.id=`hero-${g}`,c.style.setProperty("--hero-color",s.color),c.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${Pe[s.icon]}</div>
                <div class="cw-hero-label">${b.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,c.onclick=w=>{if(w.target.closest(".cw-step-btn"))return;let d=t[g]?t[g].count:0;_(g,d>0?-d:1,b)},c.querySelector(".minus").onclick=()=>_(g,-1,b),c.querySelector(".plus").onclick=()=>_(g,1,b),c.dataset.color=s.color,A.appendChild(c)});function q(g,b){let s=o(b.name),c=document.createElement("div");return c.className="cw-task-item",c.dataset.id=g,c.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${s.bg}; color:${s.color}">
                    ${Pe[s.icon]||Pe.default}
                </div>
                <div class="cw-task-label">${b.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,c.onclick=w=>{if(w.target.closest(".cw-step-btn"))return;let d=t[g]?t[g].count:0;_(g,d>0?-d:1,b)},c.querySelector(".minus").onclick=()=>_(g,-1,b),c.querySelector(".plus").onclick=()=>_(g,1,b),c}Object.entries(r).forEach(([g,b])=>{let s=document.createElement("div");s.className="cw-acc-group";let c=document.createElement("div");c.className="cw-acc-header",c.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${b.brand.color}"></div>
                ${g}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,c.onclick=()=>{u.querySelectorAll(".cw-acc-group.open").forEach(d=>{d!==s&&d.classList.remove("open")}),s.classList.toggle("open")};let w=document.createElement("div");w.className="cw-acc-body",b.tasks.forEach(d=>{let y=q(d.key,d);w.appendChild(y)}),s.appendChild(c),s.appendChild(w),u.appendChild(s)});function _(g,b,s){t[g]||(t[g]={count:0,data:s,brand:o(s.name)}),t[g].count+=b,t[g].count<=0&&delete t[g],B(),V(),e&&e()}function B(){i.forEach(([w])=>{let d=A.querySelector(`#hero-${w}`);if(!d)return;let y=t[w];y?(d.classList.add("active"),d.querySelector(".cw-step-val").textContent=y.count,d.querySelector(".cw-step-val").style.color=d.dataset.color):d.classList.remove("active")}),l.querySelectorAll(".cw-task-item").forEach(w=>{let d=w.dataset.id,y=t[d];y?(w.classList.add("selected"),w.querySelector(".cw-step-val").textContent=y.count):w.classList.remove("selected")});let b=Object.keys(t),s=0,c=[];if(b.forEach(w=>{let d=t[w];s+=d.count;for(let y=0;y<d.count;y++)c.length<6&&c.push(d.brand)}),s>0){f.classList.add("visible");let w=s>1?"A\xE7\xF5es":"A\xE7\xE3o",d=s>1?"definidas":"definida";x.textContent=`${s} ${w} ${d}`,E.innerHTML="",c.forEach(y=>{let k=document.createElement("div");k.className="cw-mini-icon",k.innerHTML=Pe[y.icon]||Pe.default;let v=k.querySelector("svg");v&&(v.style.width="14px",v.style.height="14px"),E.appendChild(k)})}else f.classList.remove("visible")}h.addEventListener("input",g=>{let b=g.target.value.toLowerCase();if(b.length>0){u.style.display="none",O.style.display="block",O.innerHTML="";let s=!1;Object.entries(_e).forEach(([c,w])=>{if(w.name.toLowerCase().includes(b)){s=!0;let d=q(c,w);t[c]&&(d.classList.add("selected"),d.querySelector(".cw-step-val").textContent=t[c].count),O.appendChild(d)}}),s||(O.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else u.style.display="block",O.style.display="none"});function V(){m.innerHTML="";let g=Object.keys(t),b=!1,s=document.getElementById("sub-status"),c="implementation";if(s&&s.value.toLowerCase().includes("education")&&(c="education"),g.length===0){m.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}if(g.length===0){m.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}let w=document.createElement("div");w.className="cw-info-banner",w.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Todos os Screenshots s\xE3o baseados na descri\xE7\xE3o do 
                <a href="https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/" target="_blank" class="cw-info-link">Win Criteria</a>.
            </span>
        `,m.appendChild(w),g.forEach(d=>{let y=t[d].data,k=t[d].count,v=t[d].brand,T=y.screenshots?y.screenshots[c]||[]:["Link da Evid\xEAncia"];if(T.length>0){b=!0;for(let F=1;F<=k;F++){let L=document.createElement("div");L.className="cw-screen-card",L.style.setProperty("--brand-color",v.color),L.style.setProperty("--brand-bg",v.bg),L.style.setProperty("--brand-shadow",v.color+"40");let I=document.createElement("div");I.className="cw-card-header";let z=document.createElement("div");z.className="cw-card-icon",z.innerHTML=Pe[v.icon]||Pe.default;let N=document.createElement("div");N.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let W=document.createElement("input");W.className="cw-card-title-input",W.id=`name-${d}-${F}`,W.value=`${y.name}${k>1?" #"+F:""}`,W.title="Clique para renomear esta task";let Y=document.createElement("span");Y.className="cw-edit-hint",Y.innerHTML="\u270E Renomear",N.appendChild(W),N.appendChild(Y),I.appendChild(z),I.appendChild(N),L.appendChild(I),T.forEach((Z,ae)=>{let ee=document.createElement("div");ee.className="cw-input-group";let ge=document.createElement("label");ge.className="cw-input-label",ge.textContent=Z.replace(/📷|:|•/g,"").trim();let ce=document.createElement("input");ce.className="cw-input-field",ce.id=`screen-${d}-${F}-${ae}`,ce.placeholder="Cole o link aqui...",ce.setAttribute("autocomplete","off"),ce.addEventListener("input",()=>{ce.value.trim().length>5?ce.classList.add("filled"):ce.classList.remove("filled")});let ue=document.createElement("div");ue.className="cw-input-check",ue.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',ee.appendChild(ge),ee.appendChild(ce),ee.appendChild(ue),L.appendChild(ee)}),m.appendChild(L)}}}),p.style.display=b?"block":"none"}return{selectionElement:l,screenshotsElement:p,updateSubStatus:()=>V(),getCheckedElements:()=>Object.keys(t).map(g=>({value:g,closest:()=>({querySelector:()=>({textContent:t[g].count})})})),toggleTask:(g,b=!0)=>{let s=t[g];b&&!s?_(g,1,_e[g]):!b&&s&&_(g,-s.count,_e[g])},setMode:g=>{n=g,V()},reset:()=>{for(let g in t)delete t[g];h.value="",u.style.display="block",O.style.display="none",B(),V()}}}function io(){let e="v3.6.0",t="bau",n="pt",o=!1,i=!1,r={input:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},textarea:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease",height:"100px",resize:"vertical"},h3:{fontSize:"14px",fontWeight:"600",color:"#202124",margin:"0 0 12px 0"},label:{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},checkboxLabel:{display:"flex",alignItems:"center",marginBottom:"10px",fontSize:"14px",fontWeight:"400",cursor:"pointer",padding:"8px",background:"#f8f9fa",borderRadius:"6px",transition:"background-color 0.2s ease, box-shadow 0.2s ease",userSelect:"none"},checkboxInput:{width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"},buttonBase:{flex:"1 1 0",padding:"10px 0",color:"#fff",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"500",cursor:"pointer",marginTop:"16px"},stepBlock:{borderTop:"1px solid #eee",paddingTop:"12px",marginTop:"12px"},radioContainer:{display:"flex",gap:"15px",marginBottom:"10px"},optionalBtn:{width:"100%",padding:"10px",background:"white",border:"1px dashed #1a73e8",color:"#1a73e8",borderRadius:"6px",cursor:"pointer",fontWeight:"500",fontSize:"13px",marginBottom:"10px",transition:"all 0.2s"},helpLink:{fontSize:"12px",color:"#1a73e8",textDecoration:"none",cursor:"pointer",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"color 0.2s"}},a=no(),l=ao(()=>{let M=l.getCheckedElements().map(S=>S.value);v&&v.value&&a.updateVisibility(v.value,M)}),p=document.createElement("div");p.id="autofill-popup",Object.assign(p.style,Ae,{right:"100px",width:"400px",opacity:"0",pointerEvents:"none",transition:"width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease, transform 0.3s ease"}),p.style.transition+=", width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)";let A=Ce(p,"Case Notes Assistant",e,"Gera notas padronizadas automaticamente. Selecione o status, as tasks realizadas e preencha os detalhes para inserir no caso.",{popup:p,googleLine:null},()=>bt());p.appendChild(A);let u=document.createElement("div");Object.assign(u.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1"}),p.appendChild(u);let O=document.createElement("div");O.textContent="created by lucaste@",Object.assign(O.style,Pt),p.appendChild(O);let h=document.createElement("div");h.id="step-lang-type";let f=document.createElement("label");Object.assign(f.style,r.label),h.appendChild(f);let x=document.createElement("div");Object.assign(x.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let E=document.createElement("div");E.textContent="Portugu\xEAs",E.classList.add("no-drag"),Object.assign(E.style,me);let q=document.createElement("div");q.textContent="Espa\xF1ol",q.classList.add("no-drag"),Object.assign(q.style,me),E.onclick=()=>pt("pt"),q.onclick=()=>pt("es"),x.appendChild(E),x.appendChild(q),h.appendChild(x),u.appendChild(h);let _=document.createElement("div");_.id="step-0-case-type";let B=document.createElement("label");Object.assign(B.style,r.label),_.appendChild(B);let V=document.createElement("div");Object.assign(V.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let g=document.createElement("div");g.textContent="BAU",g.classList.add("no-drag"),Object.assign(g.style,me);let b=document.createElement("div");b.textContent="LM",b.classList.add("no-drag"),Object.assign(b.style,me),g.onclick=()=>dt("bau"),b.onclick=()=>dt("lm"),V.appendChild(g),V.appendChild(b),_.appendChild(V),u.appendChild(_);let s=document.createElement("div");s.id="step-1-selection";let c=document.createElement("label");c.className="cw-input-label",c.textContent="Status Principal";let w=document.createElement("select");w.id="main-status",w.className="cw-select",w.innerHTML=`
      <option value="" disabled selected hidden>Selecione uma op\xE7\xE3o...</option>
      <option value="NI">NI - Need Info</option>
      <option value="SO">SO - Solution Offered</option>
      <option value="IN">IN - Inactive</option>
      <option value="AS">AS - Assigned</option>
  `;let d=document.createElement("div");d.style.cssText="display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; margin-bottom: 6px;";let y=document.createElement("label");y.className="cw-input-label",y.textContent="Sub-status",y.style.marginBottom="0";let k=document.createElement("a");k.href="https://seu-link-do-guia-aqui.com",k.target="_blank",k.className="cw-info-link",k.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; transform:translateY(1px)"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Guia de Substatus',Object.assign(k.style,r.helpLink),d.appendChild(y),d.appendChild(k);let v=document.createElement("select");v.id="sub-status",v.className="cw-select",v.disabled=!0,v.innerHTML='<option value="" disabled selected hidden>Aguardando status principal...</option>',s.appendChild(c),s.appendChild(w),s.appendChild(d),s.appendChild(v),u.appendChild(s);let T=document.createElement("div");T.id="step-1-1-portugal",Object.assign(T.style,r.stepBlock,{display:"none"});let F=document.createElement("label");Object.assign(F.style,r.label),T.appendChild(F);let L=document.createElement("div");Object.assign(L.style,r.radioContainer);let I=document.createElement("div");Object.assign(I.style,{display:"flex",alignItems:"center"});let z=document.createElement("input");z.type="radio",z.name="portugal-group",z.value="sim",Object.assign(z.style,r.checkboxInput);let N=document.createElement("label");N.htmlFor="portugal-sim",Object.assign(N.style,{cursor:"pointer"}),I.appendChild(z),I.appendChild(N);let W=document.createElement("div");Object.assign(W.style,{display:"flex",alignItems:"center"});let Y=document.createElement("input");Y.type="radio",Y.name="portugal-group",Y.value="nao",Y.checked=!0,Object.assign(Y.style,r.checkboxInput);let Z=document.createElement("label");Z.htmlFor="portugal-nao",Object.assign(Z.style,{cursor:"pointer"}),W.appendChild(Y),W.appendChild(Z),L.appendChild(I),L.appendChild(W),T.appendChild(L),u.appendChild(T);function ae(C){o=C,C?ee.style.display="block":ee.style.display="none"}z.onchange=()=>ae(!0),Y.onchange=()=>ae(!1);let ee=document.createElement("div");ee.id="step-1-2-consent",Object.assign(ee.style,r.stepBlock,{display:"none"});let ge=document.createElement("label");Object.assign(ge.style,r.label),ee.appendChild(ge);let ce=document.createElement("div");Object.assign(ce.style,r.radioContainer);let ue=document.createElement("div");Object.assign(ue.style,{display:"flex",alignItems:"center"});let xe=document.createElement("input");xe.type="radio",xe.name="consent-group",xe.value="Sim",xe.checked=!0,Object.assign(xe.style,r.checkboxInput);let ie=document.createElement("label");ie.htmlFor="consent-sim",Object.assign(ie.style,{cursor:"pointer"}),ue.appendChild(xe),ue.appendChild(ie);let K=document.createElement("div");Object.assign(K.style,{display:"flex",alignItems:"center"});let Te=document.createElement("input");Te.type="radio",Te.name="consent-group",Te.value="N\xE3o",Object.assign(Te.style,r.checkboxInput);let Le=document.createElement("label");Le.htmlFor="consent-nao",Object.assign(Le.style,{cursor:"pointer"}),K.appendChild(Te),K.appendChild(Le),ce.appendChild(ue),ce.appendChild(K),ee.appendChild(ce),u.appendChild(ee);let Me=document.createElement("div");Me.id="step-1-5-snippets",Object.assign(Me.style,r.stepBlock,{display:"none"});let ot=document.createElement("h3");Object.assign(ot.style,r.h3),ot.textContent="Cen\xE1rios Comuns";let ye=Jt(C=>{let M=document.querySelector("textarea");M&&(M.value=C,M.dispatchEvent(new Event("input")),M.style.transition="background-color 0.2s",M.style.backgroundColor="#e8f0fe",setTimeout(()=>M.style.backgroundColor="#fff",300))});ye.id="snippet-container",Me.appendChild(ot),Me.appendChild(ye),u.appendChild(Me);let ve=document.createElement("div");ve.id="step-2-tasks",Object.assign(ve.style,r.stepBlock,{display:"none"});let be=document.createElement("button");be.textContent="+ Gostaria de selecionar uma task?",Object.assign(be.style,r.optionalBtn),be.onmouseover=()=>{be.style.background="#e8f0fe"},be.onmouseout=()=>{be.style.background="white"};let $e=document.createElement("h3");Object.assign($e.style,r.h3);let qt=document.createElement("div");qt.id="task-checkboxes-container",ve.appendChild(be),ve.appendChild(qt),ve.appendChild($e),ve.appendChild(l.selectionElement),u.appendChild(ve);let ke=document.createElement("div");ke.id="step-3-form",Object.assign(ke.style,r.stepBlock,{display:"none"});let ct=document.createElement("h3");Object.assign(ct.style,r.h3),ke.appendChild(ct);let Ie=document.createElement("div");Ie.id="dynamic-form-fields-container",ke.appendChild(Ie),ke.appendChild(a.element),ke.appendChild(l.screenshotsElement),u.appendChild(ke);let De=document.createElement("div");De.id="step-4-email",Object.assign(De.style,{display:"none",marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #eee"});let Fe=document.createElement("label");Fe.style.display="flex",Fe.style.alignItems="center",Fe.style.cursor="pointer",Fe.style.fontSize="14px";let Ge=document.createElement("input");Ge.type="checkbox",Ge.checked=!0,Object.assign(Ge.style,r.checkboxInput),Fe.appendChild(Ge),Fe.appendChild(document.createTextNode("Preencher email automaticamente?")),De.appendChild(Fe),u.appendChild(De);let Ue=document.createElement("div");Object.assign(Ue.style,{display:"none",gap:"8px",padding:"0"}),u.appendChild(Ue);let Ke=document.createElement("button");Object.assign(Ke.style,r.buttonBase,{backgroundColor:"#5f6368"}),Ke.textContent="Copiar";let Qe=document.createElement("button");Object.assign(Qe.style,r.buttonBase,{backgroundColor:"#1a73e8"}),Qe.textContent="Preencher",Ue.appendChild(Ke),Ue.appendChild(Qe);let Je=document.createElement("div");Object.assign(Je.style,We),Je.className="no-drag",Je.title="Redimensionar",p.appendChild(Je),Ye(p,Je),document.body.appendChild(p);function dt(C){t=C;let M=Ze();Object.assign(g.style,me),Object.assign(b.style,me),C==="bau"?(Object.assign(g.style,M),k.href="https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657"):(Object.assign(b.style,M),k.href="https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243"),v.value&&v.dispatchEvent(new Event("change"))}function j(C){try{if(qe&&qe[n]&&qe[n][C])return qe[n][C];if(qe&&qe.pt&&qe.pt[C])return qe.pt[C]}catch{}return C}function uo(){f.textContent=j("idioma"),B.textContent=j("fluxo"),c.textContent=j("status_principal"),y.textContent=j("substatus"),ot.textContent=j("cenarios_comuns"),$e.textContent=j("selecione_tasks"),ct.textContent=j("preencha_detalhes"),Ke.textContent=j("copiar"),Qe.textContent=j("preencher"),w.querySelector('option[value=""]')&&(w.querySelector('option[value=""]').textContent=j("select_status")),v.querySelector('option[value=""]')&&(v.querySelector('option[value=""]').textContent=j("select_substatus")),F.textContent=j("caso_portugal"),N.textContent=j("sim"),Z.textContent=j("nao"),ge.textContent=j("consentiu_gravacao"),ie.textContent=j("sim"),Le.textContent=j("nao"),Ie.querySelectorAll("label").forEach(C=>{let M=C.nextElementSibling.id.replace("field-",""),S=j(M.toLowerCase());S!==M.toLowerCase()?C.textContent=S:C.textContent=M.replace(/_/g," ").replace(/\b\w/g,H=>H.toUpperCase())+":"}),be.textContent="+ "+(n==="pt"?"Gostaria de selecionar uma task?":"Quisiera seleccionar una tarea?")}function pt(C){n=C;let M=Ze();Object.assign(E.style,me),Object.assign(q.style,me),C==="pt"?(Object.assign(E.style,M),T.style.display="block",ae(o)):(Object.assign(q.style,M),T.style.display="none",ee.style.display="none"),uo(),v.value&&v.dispatchEvent(new Event("change"))}function ut(C){(C.value.trim()===""||C.value.trim()==="\u2022")&&(C.value="\u2022 "),C.onkeydown=function(M){if(M.key==="Enter"){M.preventDefault();let S=this.selectionStart,H=this.selectionEnd,te=this.value,le=te.lastIndexOf(`
`,S-1)+1,he=te.substring(le,S),de=he.trim()==="\u2022"||he.trim()===""?`
`:`
\u2022 `;this.value=te.substring(0,S)+de+te.substring(H),this.selectionStart=this.selectionEnd=S+de.length}else if(M.key==="Backspace"){let S=this.selectionStart;if(S===this.selectionEnd&&S>0){let H=this.value.substring(0,S);H.endsWith(`
\u2022 `)?(M.preventDefault(),this.value=H.substring(0,S-3)+this.value.substring(this.selectionEnd),this.selectionStart=this.selectionEnd=S-3):H==="\u2022 "&&(M.preventDefault(),this.value="",this.selectionStart=this.selectionEnd=0)}}}}function mt(){let C=typeof ye<"u"?ye:document.getElementById("snippet-container");if(!C)return;let M=C.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'),S={},H=new Set;M.forEach(X=>{let $=X.id,D=we[$];if(D)for(let R in D)R==="linkedTask"?H.add(D.linkedTask):R!=="type"&&(S[R]||(S[R]=[]),S[R].includes(D[R])||S[R].push(D[R]))});let te=new Set;Object.values(we).forEach(X=>{Object.keys(X).forEach($=>{$!=="linkedTask"&&$!=="type"&&te.add($)})}),te.forEach(X=>{let $=document.getElementById(X);if($){let D=S[X]||[],R="";tt.includes(X.replace("field-",""))?(R=D.map(U=>U.startsWith("\u2022 ")?U:"\u2022 "+U).join(`
`),R===""?R="\u2022 ":R.endsWith(`
\u2022 `)||(R+=`
\u2022 `)):R=D.join(`

`),R.trim()!=="\u2022"&&R.trim()!==""?$.value=R:tt.includes(X.replace("field-",""))?$.value="\u2022 ":$.value="",$.tagName==="TEXTAREA"&&typeof ut=="function"&&ut($)}});let le=new Set,he=new Set;C.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(X=>{let $=we[X.id];$&&$.linkedTask&&(X.checked?le.add($.linkedTask):he.add($.linkedTask))}),he.forEach(X=>{le.has(X)||l.toggleTask(X,!1)}),le.forEach(X=>{l.toggleTask(X,!0)})}w.onchange=()=>{let C=w.value;if(gt(1.5),v.innerHTML=`<option value="">${j("select_substatus")}</option>`,!C){v.disabled=!0;return}for(let M in et){let S=et[M];if(S.status===C){let H=document.createElement("option");H.value=M,H.textContent=S.name,v.appendChild(H)}}v.disabled=!1},v.onchange=()=>{let C=v.value;if(gt(1.5),!C)return;l.updateSubStatus(C);let M=et[C];ye.innerHTML="";let S=(D,R,U)=>{let se=document.createElement("label");Object.assign(se.style,r.checkboxLabel),se.onmouseover=()=>se.style.backgroundColor="#e8eaed",se.onmouseout=()=>se.style.backgroundColor="#f8f9fa";let Q=document.createElement("input");return Q.type=R,Q.id=D.id,Object.assign(Q.style,r.checkboxInput),se.appendChild(Q),se.appendChild(document.createTextNode(` ${D.text}`)),U.appendChild(se),Q},H=[],te="radio";if(C==="NI_Awaiting_Inputs")H=[{id:"quickfill-ni-inicio-manual",text:"In\xEDcio 2/6 (Manual)"},{id:"quickfill-ni-cms-access",text:"In\xEDcio 2/6 (ADV sem acesso ao CMS)"},{id:"quickfill-ni-followup-bau",text:"Follow-up 2/6 (BAU)"},{id:"quickfill-ni-followup-lm",text:"Follow-up 2/6 (LM)"}];else if(C.startsWith("SO_"))te="checkbox",H=[{id:"quickfill-gtm-install",text:"Instala\xE7\xE3o do GTM"},{id:"quickfill-whatsapp",text:"Convers\xE3o de WhatsApp"},{id:"quickfill-form",text:"Convers\xE3o de Formul\xE1rio (Padr\xE3o)"},{id:"quickfill-ecw4-close",text:"Fechamento ECW4 (P\xF3s 7 dias)"}];else if(C.startsWith("AS_")){te="checkbox";let D=document.createElement("label");D.textContent=j("cenarios_comuns"),Object.assign(D.style,r.label),ye.appendChild(D),H=[{id:"quickfill-as-no-show",text:"Anunciante n\xE3o compareceu (respondeu e-mail)"},{id:"quickfill-as-insufficient-time",text:"Tempo insuficiente"},{id:"quickfill-as-no-access",text:"Anunciante sem acessos necess\xE1rios"}]}else C.startsWith("IN_")&&(H=[{id:"quickfill-in-nrp-bau",text:"NRP (BAU - 3 tentativas)"},{id:"quickfill-in-nrp-lm",text:"NRP (LM - Sem tentativas)"},{id:"quickfill-in-no-show-bau",text:"No-Show (BAU - 3 tentativas)"},{id:"quickfill-in-2-6-final",text:"Finaliza\xE7\xE3o 2/6 (Sem Resposta)"},{id:"quickfill-in-manual",text:"Outro (Manual)"}]);let le=H.filter(D=>{let R=we[D.id];return!R.type||R.type==="all"||R.type===t});le.forEach((D,R)=>{let U=S(D,te,ye);te==="radio"&&(U.name="scenario-radio-group",R===0&&(U.checked=!0))}),le.length>0&&(Me.style.display="block"),M.requiresTasks?(be.style.display="none",$e.style.display="block",l.selectionElement.style.display="block",ve.style.display="block"):(be.style.display="block",$e.style.display="none",l.selectionElement.style.display="none",ve.style.display="block"),Ie.innerHTML="";let he=M.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(he)].forEach(D=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(D))return;let R=D.slice(1,-1),U=document.createElement("label"),se=j(R.toLowerCase());U.textContent=se!==R.toLowerCase()?se:R.replace(/_/g," ").replace(/\b\w/g,re=>re.toUpperCase())+":",Object.assign(U.style,r.label);let Q;tt.includes(R)?(Q=document.createElement("textarea"),Object.assign(Q.style,r.textarea),Q.classList.add("bullet-textarea"),ut(Q)):wt.includes(R)?(Q=document.createElement("textarea"),Object.assign(Q.style,r.textarea)):(Q=document.createElement("input"),Q.type="text",Object.assign(Q.style,r.input),R==="REASON_COMMENTS"&&(C.startsWith("NI_")||C.startsWith("IN_"))&&(Object.assign(U.style,{display:"none"}),Object.assign(Q.style,{display:"none"}))),R==="ON_CALL"&&t==="lm"&&(Object.assign(U.style,{display:"none"}),Object.assign(Q.style,{display:"none"}),Q.value="N/A"),Q.id=`field-${R}`,Ie.appendChild(U),Ie.appendChild(Q)});let X=ye.querySelectorAll('input[type="checkbox"], input[type="radio"]');X.length>0&&(X.forEach(D=>{D.removeEventListener("change",mt),D.addEventListener("change",mt)}),mt()),ke.style.display="block",at[C]?De.style.display="block":De.style.display="none",Ue.style.display="flex";let $=l.getCheckedElements().map(D=>D.value);a.updateVisibility(C,$)},be.onclick=()=>{be.style.display="none",$e.style.display="block",l.selectionElement.style.display="block"};function It(){let C=v.value;if(!C)return null;let S=et[C].template.replace(/\n/g,"<br>"),H='style="margin-bottom: 12px; padding-left: 30px;"',te=[],le="",he=l.getCheckedElements();he.length>0&&he.forEach($=>{let D=$.value,R=_e[D],U=$.closest().querySelector(".stepper-count"),se=U?parseInt(U.textContent):1;se>1?te.push(`${R.name} (x${se})`):te.push(R.name)});let de=l.screenshotsElement;if(de){let $=Array.from(de.querySelectorAll('input[id^="name-"]'));$.length>0&&$.forEach(D=>{let R=D.value,U=D.closest(".cw-screen-card");if(U){let se=U.querySelectorAll('input[id^="screen-"]'),Q=!1,re="";se.forEach(fe=>{let Nt=fe.closest(".cw-input-group"),_t=Nt?Nt.querySelector(".cw-input-label"):null,mo=_t?_t.textContent:"Evid\xEAncia",Rt=fe.value.trim(),go=Rt?` ${Rt}`:"";re+=`<li>${mo} -${go}</li>`,Q=!0}),Q&&(le+=`<b>${R}</b>`,le+=`<ul ${H}>${re}</ul>`)}})}if(S.includes("{TAGS_IMPLEMENTED}")?S=S.replace(/{TAGS_IMPLEMENTED}/g,te.join(", ")||"N/A"):te.length>0&&(S+=`<br><b>Tags:</b> ${te.join(", ")}<br>`),S.includes("{SCREENSHOTS_LIST}")?S=S.replace(/{SCREENSHOTS_LIST}/g,le?`${le}`:"N/A"):le!==""&&(S+=`<br>${le}`),n==="pt"&&o){let $=xe.checked?j("sim"):j("nao");S=S.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${j("consentiu_gravacao")}</b> ${$}<br><br>`),S=S.replace(/{CASO_PORTUGAL}/g,`<br><b>${j("caso_portugal")}</b> ${j("sim")}<br>`)}else n==="pt"&&!o?(S=S.replace(/{CASO_PORTUGAL}/g,`<br><b>${j("caso_portugal")}</b> ${j("nao")}<br>`),S=S.replace(/{CONSENTIU_GRAVACAO}/g,"")):(S=S.replace(/{CASO_PORTUGAL}/g,""),S=S.replace(/{CONSENTIU_GRAVACAO}/g,""));return Ie.querySelectorAll("input, textarea").forEach($=>{let D=$.id.replace("field-",""),R=new RegExp(`{${D}}`,"g"),U=$.value;if(D==="REASON_COMMENTS"&&(C.startsWith("NI_")||C.startsWith("IN_"))){let re=ye.querySelector('input[type="radio"]:checked');re&&we[re.id]&&(U=we[re.id]["field-REASON_COMMENTS"])}if(tt.includes(D)&&U.trim()!==""){let re=U.split(`
`).map(fe=>fe.trim()).filter(fe=>fe!==""&&fe!=="\u2022").map(fe=>fe.startsWith("\u2022 ")?fe.substring(2):fe).map(fe=>`<li>${fe}</li>`).join("");U=re?`<ul ${H}>${re}</ul>`:""}else wt.includes(D)?U=U.split(`
`).filter(re=>re.trim()!=="").map(re=>`<p style="margin: 0 0 8px 0;">${re}</p>`).join(""):$.tagName==="TEXTAREA"&&(U=U.replace(/\n/g,"<br>"));let se=U.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(se===""||se==="\u2022"||se.toLowerCase()==="n/a"){let re=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${D}\\}(?:<br>\\s*)?`,"gi");re.test(S)?S=S.replace(re,""):S=S.replace(R,"")}else S=S.replace(R,U.replace(/\$/g,"$$$$"))}),S=S.replace(/{([A-Z0-9_]+)}/g,""),S=S.replace(/(<br>){3,}/g,"<br><br>"),typeof a<"u"&&a.getOutput&&(S+=a.getOutput()),S}Ke.onclick=()=>{let C=It();C?(Tt(C),oe(j("copiado_sucesso"))):oe(j("selecione_substatus"),{error:!0})},Qe.onclick=async()=>{let C=v.value,M=It();if(!M){oe(j("selecione_substatus"),{error:!0});return}Tt(M),bt();let S=Xe(),H=await oo();if(H)try{if(H.focus(),H.innerHTML.trim()==="<p><br></p>"||H.innerHTML.trim()==="<br>"||H.innerText.trim()===""){let de=document.createRange();de.selectNodeContents(H);let X=window.getSelection();X.removeAllRanges(),X.addRange(de),document.execCommand("delete",!1,null)}else if(!H.innerHTML.endsWith("<br><br>")){let de=document.createRange();de.selectNodeContents(H),de.collapse(!1);let X=window.getSelection();X.removeAllRanges(),X.addRange(de),document.execCommand("insertHTML",!1,"<br><br>")}document.execCommand("insertHTML",!1,M),to(H),setTimeout(()=>{oe(j("inserido_copiado"))},600);let le=typeof Ge<"u"&&Ge?Ge.checked:!0;if(C&&at[C]&&le){let de=at[C];await $t(de),await new Promise(X=>setTimeout(X,500))}S(),gt(1.5),w.value="",v.innerHTML=`<option value="">${j("select_substatus")}</option>`,v.disabled=!0}catch(te){console.error(te),oe("Erro ao inserir.",{error:!0}),S()}};function gt(C=1.5){C<=1.5&&(Me.style.display="none",ye.innerHTML=""),C<=2&&(ve.style.display="none",l.reset(),be.style.display="none"),C<=3&&(ke.style.display="none",Ie.innerHTML="",a.reset(),Ue.style.display="none",De.style.display="none")}function bt(){if(i=!i,i){let C=p.querySelector(".cw-expand-btn");C&&typeof C.resetState=="function"&&C.resetState()}Se(i,p,"cw-btn-notes")}return dt("bau"),pt("pt"),bt}var He={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function so(){let e="v4.0.0",t=Object.keys(He)[0],n="",o="list",i={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:"#FAFAFA"},r={display:"flex",width:"200%",height:"100%",transition:"transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",transform:"translateX(0)"},a={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},l={width:"100%",padding:"10px 12px 10px 36px",borderRadius:"8px",border:"none",background:"#F0F2F5",fontSize:"14px",color:"#202124",boxSizing:"border-box",outline:"none",transition:"all 0.2s ease",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"10px center"},p={display:"flex",gap:"6px",padding:"4px 4px 8px 4px",overflowX:"auto",scrollbarWidth:"none"},m={padding:"6px 12px",borderRadius:"16px",border:"1px solid transparent",background:"transparent",color:"#5f6368",fontSize:"12px",fontWeight:"500",cursor:"pointer",transition:"all 0.2s ease",flexShrink:"0"},A={background:"#E8F0FE",color:"#1967D2",fontWeight:"600"},u={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",marginBottom:"6px",borderRadius:"8px",background:"#fff",border:"1px solid #dadce0",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",position:"relative",overflow:"hidden"},O=!1,h=document.createElement("div");h.id="quick-email-popup",Object.assign(h.style,Ae,{right:"100px",width:"480px",height:"600px",opacity:"0",pointerEvents:"none"});let f={popup:h,googleLine:null,focusElement:null};function x(){O=!O,Se(O,h,"cw-btn-email"),O||setTimeout(()=>k(),300)}let E=Ce(h,"Emails R\xE1pidos",e,"Selecione, visualize e insira com um clique.",f,()=>x()),q=document.createElement("div");Object.assign(q.style,i);let _=document.createElement("div");Object.assign(_.style,r);let B=document.createElement("div");Object.assign(B.style,a);let V=document.createElement("div");Object.assign(V.style,{padding:"16px 16px 4px 16px",flexShrink:"0",background:"#fff",zIndex:"10",display:"flex",flexDirection:"column",gap:"8px",borderBottom:"1px solid #f1f3f4"});let g=document.createElement("input");g.placeholder="Buscar template...",Object.assign(g.style,l),g.onfocus=()=>{g.style.background="#fff",g.style.boxShadow="0 2px 8px rgba(0,0,0,0.05)"},g.onblur=()=>{g.style.background="#F0F2F5",g.style.boxShadow="none"},f.focusElement=g;let b=document.createElement("div");Object.assign(b.style,p);let s=document.createElement("div");Object.assign(s.style,{padding:"12px 16px",overflowY:"auto",flexGrow:"1"}),V.appendChild(g),V.appendChild(b),B.appendChild(V),B.appendChild(s);let c=document.createElement("div");Object.assign(c.style,a);let w=document.createElement("div");Object.assign(w.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),c.appendChild(w),_.appendChild(B),_.appendChild(c),q.appendChild(_),h.appendChild(E),h.appendChild(q);let d=document.createElement("div");Object.assign(d.style,{padding:"8px 16px",borderTop:"1px solid #eee",textAlign:"center",fontSize:"10px",color:"#9aa0a6",background:"#fff",flexShrink:"0"}),d.textContent="created by lucaste@",h.appendChild(d),document.body.appendChild(h);function y(F){o="detail",_.style.transform="translateX(-50%)";let L='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',I='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';w.innerHTML=`
        <style>
            /* CSS Local para limpar a formata\xE7\xE3o nativa e deixar elegante */
            .cw-email-body-content p {
                margin: 0 0 10px 0 !important; /* Apenas uma margem suave abaixo */
                line-height: 1.5 !important;
            }
            /* Se houver <br> entre <p>, isso evita buracos duplos */
            .cw-email-body-content br {
                display: block;
                content: "";
                margin-top: 0;
            }
            /* Remove margem do \xFAltimo p para n\xE3o sobrar espa\xE7o no fim */
            .cw-email-body-content p:last-child {
                margin-bottom: 0 !important;
            }
        </style>

        <div style="
            position: sticky; top: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px);
            border-bottom: 1px solid #f1f3f4; padding: 12px 20px; z-index: 10;
            display: flex; align-items: center; gap: 8px;
        ">
            <button id="csa-back-btn" style="
                background:none; border:none; cursor:pointer; display:flex; align-items:center; justify-content: center;
                color:#5f6368; width: 32px; height: 32px; margin-left:-8px; border-radius:50%; transition:background 0.2s;
            ">
                ${L}
            </button>
            <div style="font-size:15px; font-weight:600; color:#202124; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${F.name}
            </div>
        </div>

        <div style="padding: 20px 20px 0 20px;">
            <div style="margin-bottom: 16px;">
                <div style="font-size:11px; font-weight:700; color:#1a73e8; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px;">Assunto</div>
                <div style="font-size:13px; font-weight:500; color:#202124; padding: 10px; background: #F8F9FA; border-radius: 8px; border: 1px solid #eee;">
                    ${F.subject}
                </div>
            </div>
            
            <div>
                <div style="font-size:11px; font-weight:700; color:#1a73e8; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px;">Mensagem</div>
                
                <div class="cw-email-body-content" style="
                    font-size:13px; 
                    color:#3c4043; 
                    white-space: normal; /* Mudado de pre-wrap para normal */
                    padding: 0 4px;
                ">
                    ${F.body}
                </div>
            </div>
        </div>

        <div style="
            position: sticky; bottom: 0; left: 0; width: 100%; 
            padding: 20px; box-sizing: border-box;
            background: linear-gradient(to top, #ffffff 80%, rgba(255,255,255,0)); 
            margin-top: auto; 
        ">
            <button id="csa-insert-btn" style="
                width: 100%; padding: 12px; 
                background: #1a73e8; color: white; border: none; border-radius: 8px; 
                font-weight: 600; font-size: 14px; cursor: pointer; 
                box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
                display: flex; align-items: center; justify-content: center; gap: 8px;
                transition: transform 0.1s, background 0.2s;
            ">
                ${I} Inserir Template
            </button>
        </div>
      `;let z=w.querySelector("#csa-back-btn");z.onmouseover=()=>z.style.backgroundColor="#f1f3f4",z.onmouseout=()=>z.style.backgroundColor="transparent",z.onclick=k;let N=w.querySelector("#csa-insert-btn");N.onmouseover=()=>N.style.backgroundColor="#174ea6",N.onmouseout=()=>N.style.backgroundColor="#1a73e8",N.onclick=async()=>{console.log("\u{1F50D} DEBUG: Clique detectado"),console.log("\u{1F50D} DEBUG: triggerProcessingAnimation \xE9:",typeof Xe),N.style.transform="scale(0.96)",x(),console.log("\u{1F50D} DEBUG: Janela fechada");try{console.log("\u{1F50D} DEBUG: Chamando anima\xE7\xE3o...");let W=Xe();console.log("\u{1F50D} DEBUG: finishLoading \xE9:",typeof W),console.log("\u{1F50D} DEBUG: Iniciando espera de 1s..."),await new Promise(Y=>setTimeout(Y,1e3)),console.log("\u{1F50D} DEBUG: Rodando l\xF3gica do email..."),await Ct(F),console.log("\u{1F50D} DEBUG: Finalizando anima\xE7\xE3o..."),typeof W=="function"?W():console.error("\u274C ERRO: finishLoading n\xE3o \xE9 uma fun\xE7\xE3o! A anima\xE7\xE3o falhou ao iniciar.")}catch(W){console.error("\u274C ERRO NO PROCESSO:",W);let Y=document.querySelector(".cw-focus-backdrop");Y&&Y.classList.remove("active")}setTimeout(()=>{N.style.transform="scale(1)",typeof k=="function"&&k()},300)}}function k(){o="list",_.style.transform="translateX(0)"}function v(){b.innerHTML="",Object.keys(He).forEach(F=>{let L=He[F],I=document.createElement("button");I.textContent=L.title,Object.assign(I.style,m),t===F&&n===""&&Object.assign(I.style,A),I.onclick=()=>{t=F,n="",g.value="",v(),T()},b.appendChild(I)})}function T(){s.innerHTML="";let F=[];if(n.trim()!==""?Object.values(He).forEach(z=>{let N=z.emails.filter(W=>W.name.toLowerCase().includes(n.toLowerCase()));F=[...F,...N]}):He[t]&&(F=He[t].emails),F.length===0){s.innerHTML='<div style="text-align:center; padding:60px 20px; color:#9aa0a6;"><div style="font-size:24px; margin-bottom:8px;">\u{1F50D}</div><div style="font-size:14px;">Nenhum template encontrado.</div></div>';return}let L='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>',I='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';F.forEach(z=>{let N=document.createElement("div");Object.assign(N.style,u);let W=z.subject.length>50?z.subject.substring(0,50)+"...":z.subject;N.innerHTML=`
        <div style="flex-grow: 1; margin-right: 12px; min-width: 0;">
            <div style="font-size:13px; font-weight:600; color:#202124; margin-bottom:2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${z.name}</div>
            <div style="font-size:12px; color:#5f6368; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${W}</div>
        </div>
        <div style="display:flex; gap:6px;">
            <button class="action-btn view" title="Visualizar" style="width:32px; height:32px; border-radius:50%; border:none; background:#f1f3f4; color:#5f6368; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">${I}</button>
            <button class="action-btn send" title="Inserir Agora" style="width:32px; height:32px; border-radius:50%; border:none; background:#e8f0fe; color:#1a73e8; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">${L}</button>
        </div>
      `,N.onmouseenter=()=>{N.style.background="#F8F9FA",N.style.borderColor="#1a73e8"},N.onmouseleave=()=>{N.style.background="#fff",N.style.borderColor="#dadce0"};let Y=N.querySelector(".view");Y.onclick=ae=>{ae.stopPropagation(),y(z)},Y.onmouseenter=()=>{Y.style.background="#d2e3fc",Y.style.color="#174ea6"},Y.onmouseleave=()=>{Y.style.background="#f1f3f4",Y.style.color="#5f6368"};let Z=N.querySelector(".send");Z.onclick=async ae=>{ae.stopPropagation(),Z.style.transform="scale(0.9)",setTimeout(()=>Z.style.transform="scale(1)",150),x();let ee=Xe();try{await new Promise(ge=>setTimeout(ge,800)),await Ct(z),ee()}catch(ge){console.error("Erro no envio r\xE1pido:",ge),ee()}},Z.onmouseenter=()=>{Z.style.background="#1a73e8",Z.style.color="#fff",Z.style.boxShadow="0 2px 6px rgba(26,115,232,0.3)"},Z.onmouseleave=()=>{Z.style.background="#e8f0fe",Z.style.color="#1a73e8",Z.style.boxShadow="none"},N.onclick=()=>y(z),s.appendChild(N)})}return g.addEventListener("input",F=>{n=F.target.value,n!==""?Array.from(b.children).forEach(L=>Object.assign(L.style,m)):v(),T()}),v(),T(),x}var ro={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function lo(){let e="v2.1 (Apple Motion)",t={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#f8f9fa",scrollBehavior:"smooth"},card:{background:"#ffffff",border:"1px solid #dadce0",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"13px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"10px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.15s ease, opacity 0.3s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.5",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"20px",height:"20px",borderRadius:"6px",border:"2px solid #dadce0",marginRight:"14px",marginTop:"1px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #eee",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"}},n={},o="PT",i="BAU",r=!1,a=document.createElement("div");a.id="call-script-popup",Object.assign(a.style,Ae,{right:"auto",left:"50%",width:"400px",height:"650px",display:"flex",flexDirection:"column",opacity:"0",pointerEvents:"none"});let l={popup:a,googleLine:null};function p(){r=!r,Se(r,a,"cw-btn-script")}let m=Ce(a,"Call Script",e,"Guia interativo para condu\xE7\xE3o de chamadas.",l,()=>{p()});a.appendChild(m);let A=document.createElement("div");Object.assign(A.style,t.progressBarContainer);let u=document.createElement("div");Object.assign(u.style,t.progressBarFill),A.appendChild(u),a.appendChild(A);let O=document.createElement("div");O.id="csa-content",Object.assign(O.style,t.contentArea),a.appendChild(O);let h=document.createElement("div");Object.assign(h.style,t.footer);let f=document.createElement("span");f.textContent="by lucaste@",Object.assign(f.style,{fontSize:"10px",color:"#bdc1c6"});let x=document.createElement("button");x.innerHTML=`
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
    Resetar Script
  `,Object.assign(x.style,t.resetBtn),x.onmouseenter=()=>x.style.background="#fce8e6",x.onmouseleave=()=>x.style.background="transparent",x.onclick=()=>{x.style.transform="scale(0.9)",setTimeout(()=>x.style.transform="scale(1)",150);for(let k in n)delete n[k];c()},h.appendChild(f),h.appendChild(x),a.appendChild(h);let E=document.createElement("div");Object.assign(E.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let q=document.createElement("div");Object.assign(q.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let _=document.createElement("div");_.textContent="BAU";let B=document.createElement("div");B.textContent="LT",Object.assign(_.style,me),Object.assign(B.style,me),q.appendChild(_),q.appendChild(B);let V=document.createElement("select");Object.assign(V.style,jt,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),V.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',V.value=o,E.appendChild(q),E.appendChild(V),O.appendChild(E);let g=document.createElement("div");g.id="csa-checklist-area",O.appendChild(g);let b=document.createElement("div");Object.assign(b.style,We),b.className="no-drag",b.title="Redimensionar",a.appendChild(b),Ye(a,b),document.body.appendChild(a);function s(k){return k}function c(){g.innerHTML="";let k=`${o} ${i}`,v=ro[k];if(!v){g.innerHTML=`<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <div style="font-size: 24px;">\u2615</div>
        <div>Script n\xE3o configurado.</div>
      </div>`,u.style.width="0%";return}let T=v.color||"#1a73e8",F=0,L=0;["inicio","fim"].forEach(I=>{v[I]&&(F+=v[I].length)}),["inicio","fim"].forEach((I,z)=>{let N=v[I];if(!N||N.length===0)return;let W=document.createElement("div");Object.assign(W.style,t.card);let Y=document.createElement("div");Object.assign(Y.style,t.cardTitle);let Z=I==="inicio"?"Abertura":"Fechamento";o.includes("ES")&&(Z=I==="inicio"?"Apertura":"Cierre"),o.includes("EN")&&(Z=I==="inicio"?"Opening":"Closing"),Y.textContent=Z;let ae=document.createElement("span");ae.style.fontSize="11px",ae.style.opacity="0.7",ae.style.fontWeight="500",ae.style.background="#f1f3f4",ae.style.padding="2px 8px",ae.style.borderRadius="10px",Y.appendChild(ae),W.appendChild(Y);let ee=0;N.forEach((ge,ce)=>{let ue=`${k}-${I}-${ce}`,xe=!!n[ue];xe&&(L++,ee++);let ie=document.createElement("div");Object.assign(ie.style,t.itemRow);let K=document.createElement("div");Object.assign(K.style,t.checkbox);let Te=document.createElement("span");Te.innerHTML=ge,Te.style.flex="1",xe?(Object.assign(ie.style,t.itemCompleted),K.style.background=T,K.style.borderColor=T,K.style.transform="scale(1)",K.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ie.style.textDecoration="none",ie.style.opacity="1",K.style.background="transparent",K.style.borderColor="#dadce0",K.style.transform="scale(1)",K.innerHTML=""),ie.onclick=()=>{let Le=!n[ue];n[ue]=Le,J.playClick(),Le?(K.style.transform="scale(1.2)",setTimeout(()=>K.style.transform="scale(1)",150),Object.assign(ie.style,t.itemCompleted),K.style.background=T,K.style.borderColor=T,K.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ie.style.textDecoration="none",ie.style.opacity="1",K.style.background="transparent",K.style.borderColor="#dadce0",K.innerHTML=""),w(k,v)},ie.onmouseenter=()=>{n[ue]||(ie.style.background="#f1f3f4",K.style.borderColor=T)},ie.onmouseleave=()=>{n[ue]||(ie.style.background="transparent",K.style.borderColor="#dadce0")},ie.appendChild(K),ie.appendChild(Te),W.appendChild(ie)}),ee===N.length&&N.length>0&&(ae.style.color="#1e8e3e",ae.style.background="#e6f4ea",W.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),ae.textContent=`${ee}/${N.length}`,g.appendChild(W)}),d(F,L)}function w(k,v){let T=0,F=0;["inicio","fim"].forEach(L=>{let I=v[L]||[];T+=I.length;let z=0;I.forEach((N,W)=>{n[`${k}-${L}-${W}`]&&(F++,z++)})}),d(T,F),setTimeout(()=>c(),200)}function d(k,v){let T=k===0?0:v/k*100;u.style.width=`${T}%`,T===100?u.style.background="#34A853":u.style.background="linear-gradient(90deg, #4285F4, #34A853)"}function y(k){i=k;let v=Ze();Object.assign(_.style,me),Object.assign(B.style,me),Object.assign(k==="BAU"?_.style:B.style,v),c()}return _.onclick=()=>y("BAU"),B.onclick=()=>y("LT"),V.addEventListener("change",k=>{o=k.target.value,c()}),y(i),p}var lt={lm:{label:"LM Forms",links:[{name:"Relat\xF3rio de Ocorr\xEAncias",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas operacionais | Aviso de pausas"},{name:"Chamadas Excedidas (>50min)",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro de chamadas longas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema/ferramenta"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"Enviar casos para BAU/Solicitar Descarte/Abrir Monitoria para AMs"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo dos Anunciantes"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos complicados de atender"}]},suporte:{label:"Central de Ajuda",links:[{name:"Suporte Google Ads",url:"https://support.google.com/google-ads/",desc:"Oficial"},{name:"Suporte GA4",url:"https://support.google.com/analytics/",desc:"Oficial"},{name:"Suporte Merchant Center",url:"https://support.google.com/merchants/gethelp",desc:"Oficial"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. oficial sobre CSP"},{name:"Doc. Enhanced Conversion",url:"https://support.google.com/google-ads/answer/9888656?hl=en",desc:"Como funcionam as convers\xF5es otimizadas?"},{name:"Doc. CoMo",url:"https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=pt-br",desc:"Doc. oficial sobre Consent Mode"}]},outros:{label:"Diversos",links:[{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form para solicitar grava\xE7\xE3o da chamada."}]}};function co(){let e="v2.4.5",t="lm",n="",o={width:"100%",padding:"10px 12px 10px 36px",borderRadius:"8px",border:"1px solid #dadce0",background:"#f8f9fa",fontSize:"14px",boxSizing:"border-box",outline:"none",color:"#3c4043",transition:"background 0.2s, border-color 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"10px center"},i={display:"flex",flexWrap:"wrap",gap:"8px",paddingBottom:"8px"},r={padding:"6px 16px",borderRadius:"16px",border:"1px solid #dadce0",background:"transparent",color:"#5f6368",fontSize:"13px",fontWeight:"500",cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s ease",marginBottom:"4px"},a={background:"#e8f0fe",color:"#1967d2",borderColor:"#e8f0fe",fontWeight:"600"},l={display:"flex",alignItems:"center",padding:"10px 14px",borderRadius:"12px",cursor:"pointer",border:"1px solid transparent",marginBottom:"6px",background:"#ffffff",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), background 0.2s",boxShadow:"0 1px 2px rgba(0,0,0,0.02)",opacity:"0",transform:"translateY(10px)"},p={width:"36px",height:"36px",borderRadius:"10px",background:"#f1f3f4",color:"#5f6368",display:"flex",alignItems:"center",justifyContent:"center",marginRight:"14px",fontSize:"18px",flexShrink:"0"},m=document.createElement("div");m.id="feedback-popup",Object.assign(m.style,Ae,{right:"100px",width:"400px",opacity:"0",pointerEvents:"none"});let A={lm:"\u{1F4DD}",qa:"\u{1F6E1}\uFE0F",suporte:"\u{1F4DA}",outros:"\u26A1"},u={popup:m,googleLine:null,focusElement:null},O=!1,h=Ce(m,"Links \xDAteis",e,"Acesso r\xE1pido a formul\xE1rios internos (Ocorr\xEAncias, Bugs) e documenta\xE7\xF5es oficiais de suporte.",u,()=>g());m.appendChild(h);let f=document.createElement("div");Object.assign(f.style,{padding:"16px",display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid #f1f3f4",flexShrink:"0",backgroundColor:"#fff"});let x=document.createElement("input");x.type="text",x.placeholder="Buscar link, form ou ajuda...",Object.assign(x.style,o),u.focusElement=x,x.onfocus=()=>{x.style.borderColor="#1a73e8",x.style.backgroundColor="#fff"},x.onblur=()=>{x.style.borderColor="#dadce0",x.style.backgroundColor="#f8f9fa"};let E=document.createElement("div");Object.assign(E.style,i),f.appendChild(x),f.appendChild(E),m.appendChild(f);let q=document.createElement("div");Object.assign(q.style,{padding:"0 8px 8px 8px",overflowY:"auto",flexGrow:"1"}),m.appendChild(q);let _=document.createElement("div");Object.assign(_.style,{padding:"8px 16px",borderTop:"1px solid #eee",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"10px",color:"#9aa0a6"}),_.innerHTML="<span>by lucaste@</span>",m.appendChild(_),document.body.appendChild(m);function B(){E.innerHTML="",Object.keys(lt).forEach(b=>{let s=lt[b],c=document.createElement("button"),w=A[b]||"";c.innerHTML=`<span style="font-size:14px">${w}</span> ${s.label}`,Object.assign(c.style,r),t===b&&n===""&&Object.assign(c.style,a),c.onmousedown=()=>c.style.transform="scale(0.95)",c.onmouseup=()=>c.style.transform="scale(1)",c.onmouseleave=()=>c.style.transform="scale(1)",c.onclick=()=>{t=b,n="",x.value="",B(),V()},E.appendChild(c)})}function V(){q.innerHTML="";let b=[],s=n.trim()!=="";if(s?Object.entries(lt).forEach(([c,w])=>{let d=w.links.filter(y=>y.name.toLowerCase().includes(n.toLowerCase())||y.desc.toLowerCase().includes(n.toLowerCase()));d.forEach(y=>{y._catIcon=A[c],y._categoryName=w.label}),b=[...b,...d]}):(b=lt[t].links,b.forEach(c=>c._catIcon=A[t])),b.length===0){q.innerHTML=`
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px; opacity:0.6;">
            <div style="font-size:32px; margin-bottom:10px;">\u{1F50D}</div>
            <div style="font-size:13px; color:#5f6368;">Nenhum link encontrado.</div>
        </div>`;return}b.forEach((c,w)=>{let d=document.createElement("div");Object.assign(d.style,l);let y=document.createElement("div");Object.assign(y.style,p),y.textContent=c._catIcon||"\u{1F517}",d.appendChild(y);let k=document.createElement("div");k.style.flexGrow="1";let v=N=>{if(!s)return N;let W=new RegExp(`(${n})`,"gi");return N.replace(W,'<span style="color:#1a73e8; font-weight:700;">$1</span>')},T=`<div style="font-size:14px; font-weight:500; color:#202124;">${v(c.name)}</div>`,F=`<div style="font-size:11px; color:#5f6368; margin-top:2px;">${v(c.desc)}</div>`;k.innerHTML=T+F,d.appendChild(k);let L=document.createElement("div");L.style.display="flex",L.style.gap="4px",L.style.opacity="0",L.style.transition="opacity 0.2s";let I=document.createElement("div");I.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',Object.assign(I.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#5f6368",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"}),I.onclick=N=>{J.playClick(),N.stopPropagation(),navigator.clipboard.writeText(c.url),I.style.transform="scale(1.2)",I.style.color="#1e8e3e",I.style.backgroundColor="#e6f4ea",setTimeout(()=>{I.style.transform="scale(1)",I.style.color="#5f6368",I.style.backgroundColor="transparent"},800)},I.onmouseenter=()=>I.style.backgroundColor="#f1f3f4",I.onmouseleave=()=>I.style.backgroundColor="transparent",L.appendChild(I);let z=document.createElement("div");z.innerHTML="\u2197",Object.assign(z.style,{width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",color:"#dadce0",fontSize:"16px"}),L.appendChild(z),d.appendChild(L),d.onclick=()=>window.open(c.url,"_blank"),d.onmouseenter=()=>{d.style.backgroundColor="#f8f9fa",d.style.transform="scale(1.01)",L.style.opacity="1",z.style.color="#1a73e8"},d.onmouseleave=()=>{d.style.backgroundColor="#ffffff",d.style.transform="scale(1)",L.style.opacity="0",z.style.color="#dadce0"},q.appendChild(d),requestAnimationFrame(()=>{d.style.transition="opacity 0.3s ease, transform 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.2)",setTimeout(()=>{d.style.opacity="1",d.style.transform="translateY(0)"},w*40)})})}x.addEventListener("input",b=>{n=b.target.value,n!==""?Array.from(E.children).forEach(s=>{s.style.backgroundColor="transparent",s.style.color="#5f6368",s.style.borderColor="#dadce0"}):B(),V()});function g(){O=!O,Se(O,m,"cw-btn-links")}return B(),V(),g}var Ve=[];function Ot(e){Ve=e}function po(){let e="v2.5 (Emoji Fix)",t=!1,n=null,o=60*1e3;function i(s){if(!s)return"";try{let c=new Date(s);return isNaN(c.getTime())?String(s):c.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(s)}}let r={critical:{bg:"#FEF2F2",border:"#FECACA",text:"#991B1B",icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>'},info:{bg:"#EFF6FF",border:"#BFDBFE",text:"#1E40AF",icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{bg:"#F0FDF4",border:"#BBF7D0",text:"#166534",icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}},a={feedContainer:{padding:"24px",overflowY:"auto",flexGrow:"1",background:"#FAFAFA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.06)",boxShadow:"0 4px 12px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.02)",overflow:"hidden",transition:"all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.04)",boxShadow:"none",opacity:"0.8",filter:"grayscale(0.3)",marginBottom:"16px",flexShrink:"0"},cardHeader:{padding:"12px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(0,0,0,0.04)",fontSize:"12px",fontWeight:"600",letterSpacing:"0.5px",textTransform:"uppercase"},msgTitle:{padding:"20px 20px 8px 20px",fontSize:"16px",fontWeight:"700",color:"#202124",letterSpacing:"-0.01em",lineHeight:"1.4"},metaContainer:{padding:"0 20px 12px 20px",display:"flex",alignItems:"center",gap:"8px",fontSize:"12px",color:"#5f6368"},cardBody:{padding:"0 20px 24px 20px",fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",fontFamily:"'Google Sans', Roboto, sans-serif",wordBreak:"break-word",overflowWrap:"break-word"},emojiImg:"height: 20px; vertical-align: text-bottom; margin: 0 2px;",dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},markAllBtn:{fontSize:"12px",color:"#1a73e8",cursor:"pointer",fontWeight:"600",background:"transparent",border:"none",padding:"8px",transition:"opacity 0.2s"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 0",color:"#bdc1c6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"10px 0 20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"10px",borderRadius:"8px",transition:"background 0.2s"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",paddingTop:"10px",borderTop:"1px dashed rgba(0,0,0,0.1)"}},l="cw-scrollbar-style";if(!document.getElementById(l)){let s=document.createElement("style");s.id=l,s.innerHTML=".cw-nice-scroll::-webkit-scrollbar { width: 5px; } .cw-nice-scroll::-webkit-scrollbar-track { background: transparent; } .cw-nice-scroll::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 10px; }",document.head.appendChild(s)}function p(s){if(!s||typeof s!="string")return"";let c=s,w=/(https?:\/\/[^\s]+)|(www\.[^\s]+)/g;return c=c.replace(w,d=>{let y=d;return y.startsWith("http")||(y="http://"+y),`<a href="${y}" target="_blank" style="color:#1967d2; text-decoration:underline;">${d}</a>`}),c=c.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),c=c.replace(/_(.*?)_/g,"<i>$1</i>"),c=c.replace(/\n/g,"<br>"),c=Ht(c),c=c.replace(/@todos|@all/gi,'<span style="background:#e8f0fe; color:#1967d2; padding:1px 5px; border-radius:4px; font-weight:600; font-size:12px;">@todos</span>'),c}let m=document.createElement("div");m.id="broadcast-popup",Object.assign(m.style,Ae,{right:"auto",left:"50%",width:"450px",height:"650px",display:"flex",flexDirection:"column",opacity:"0",pointerEvents:"none"});let A={popup:m,googleLine:null};function u(){if(t=!t,Se(t,m,"cw-btn-broadcast"),t){let s=document.getElementById("cw-btn-broadcast");s&&s.classList.remove("has-new"),x()}}let O=Ce(m,"Operations Feed",e,"Atualiza\xE7\xF5es oficiais da opera\xE7\xE3o.",A,()=>u()),h=O.querySelector(".cw-header-actions")||O.lastElementChild;if(h){let s=document.createElement("button");s.textContent="Limpar tudo",Object.assign(s.style,a.markAllBtn),s.onclick=c=>{c.stopPropagation(),J.playSuccess();let w=Ve.map(d=>d.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(w)),_(),E()},h.insertBefore(s,h.firstChild)}m.appendChild(O);let f=document.createElement("div");f.className="cw-nice-scroll",Object.assign(f.style,a.feedContainer),m.appendChild(f);async function x(){let s=document.getElementById("cw-update-status");t&&(s||(s=document.createElement("div"),s.id="cw-update-status",s.style.cssText="padding: 6px; text-align: center; font-size: 11px; color: #5f6368; background: #f8f9fa; border-bottom: 1px solid #e0e0e0;",f.parentNode.insertBefore(s,f)),s.innerHTML="\u23F3 Verificando atualiza\xE7\xF5es...",s.style.display="block");let c=Ve.map(d=>d.id),w=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");try{let d=await je.fetchData();d&&d.broadcast&&(t&&s&&(d.broadcast.some(k=>!c.includes(k.id))?(s.innerHTML="\u2705 Novos avisos sincronizados!",s.style.backgroundColor="#e6f4ea",s.style.color="#137333"):s.innerHTML="\u{1F539} Tudo atualizado.",setTimeout(()=>{s&&(s.style.display="none")},1500)),c.length>0&&d.broadcast.filter(v=>!c.includes(v.id)).filter(v=>!w.includes(v.id)).length>0&&(console.log("\u{1F514} Novo aviso detectado! Tocando som."),J.playNotification()),Ot(d.broadcast),E(),t&&_())}catch(d){console.error("Erro no update:",d),t&&s&&(s.innerHTML="\u26A0\uFE0F Falha na conex\xE3o.",s.style.backgroundColor="#fce8e6")}}function E(){let s=document.getElementById("cw-btn-broadcast");if(!s)return;let c=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(Ve.some(d=>!c.includes(d.id))){if(s.classList.add("has-new"),!s.querySelector(".cw-badge")){let d=document.createElement("div");d.className="cw-badge",Object.assign(d.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),s.appendChild(d)}}else{s.classList.remove("has-new");let d=s.querySelector(".cw-badge");d&&d.remove()}}let q=je.getCachedBroadcasts();q.length>0&&(Ot(q),_()),x(),n||(n=setInterval(x,o));function _(){f.innerHTML="";let s=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),c=[...Ve].sort((y,k)=>{let v=s.includes(y.id),T=s.includes(k.id);return v===T?0:v?1:-1});if(c.every(y=>s.includes(y.id))){let y=document.createElement("div");Object.assign(y.style,a.emptyState),y.innerHTML=`
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#dadce0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Voc\xEA est\xE1 em dia!</div>
            <div style="font-size:12px;">Nenhum aviso pendente.</div>
           `,f.appendChild(y)}let w=c.filter(y=>!s.includes(y.id)),d=c.filter(y=>s.includes(y.id));if(w.forEach(y=>f.appendChild(B(y,!1))),d.length>0){let y=document.createElement("div");Object.assign(y.style,a.historyDivider),y.innerHTML=`<span>Visualizar ${d.length} avisos anteriores</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 0.3s"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let k=document.createElement("div");Object.assign(k.style,a.historyContainer),d.forEach(T=>k.appendChild(B(T,!0)));let v=!1;y.onclick=()=>{J.playClick(),v=!v,k.style.display=v?"flex":"none",y.querySelector("svg").style.transform=v?"rotate(180deg)":"rotate(0deg)",y.querySelector("span").textContent=v?"Ocultar hist\xF3rico":`Visualizar ${d.length} avisos anteriores`},f.appendChild(y),f.appendChild(k)}}function B(s,c){let w=document.createElement("div");Object.assign(w.style,c?a.cardHistory:a.card);let d=r[s.type]||r.info,y=document.createElement("div");Object.assign(y.style,a.cardHeader,{background:d.bg,color:d.text,borderBottom:`1px solid ${d.border}`});let k=document.createElement("div");if(Object.assign(k.style,{display:"flex",alignItems:"center",gap:"6px"}),k.innerHTML=`${d.icon} <span>${s.type.toUpperCase()}</span>`,y.appendChild(k),c){let T=document.createElement("span");T.textContent=i(s.date),T.style.opacity="0.7",y.appendChild(T)}else{let T=document.createElement("button");T.title="Marcar como lido",Object.assign(T.style,a.dismissBtn),T.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',T.onmouseenter=()=>{T.style.color="#1e8e3e",T.style.background="#e6f4ea",T.style.borderColor="#1e8e3e"},T.onmouseleave=()=>{T.style.color="#5f6368",T.style.background="#fff",T.style.borderColor="rgba(0,0,0,0.1)"},T.onclick=F=>{F.stopPropagation(),J.playClick(),w.style.transform="translateX(20px)",w.style.opacity="0",setTimeout(()=>{let L=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");L.push(s.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(L)),_(),E()},250)},y.appendChild(T)}if(w.appendChild(y),s.title){let T=document.createElement("div");Object.assign(T.style,a.msgTitle),T.textContent=s.title,w.appendChild(T)}if(!c){let T=document.createElement("div");Object.assign(T.style,a.metaContainer),T.innerHTML=`<span style="font-weight:600">${s.author}</span> \u2022 <span>${i(s.date)}</span>`,w.appendChild(T)}let v=document.createElement("div");return Object.assign(v.style,a.cardBody),v.innerHTML=p(s.text),w.appendChild(v),w}_();let V=document.createElement("div");Object.assign(V.style,We),V.className="no-drag",m.appendChild(V),Ye(m,V),document.body.appendChild(m);let g=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),b=Ve.some(s=>!g.includes(s.id));return{toggle:u,hasUnread:b}}function Eo(){if(window.techSolInitialized){At();return}window.techSolInitialized=!0,console.log("\u{1F680} TechSol Suite Initializing...");try{zt();try{J.initGlobalListeners(),J.playStartup()}catch(r){console.warn("\xC1udio n\xE3o p\xF4de ser iniciado automaticamente:",r)}je.fetchTips(),At();let e=io(),t=so(),n=lo(),o=co(),i=po();Qt({toggleNotes:e,toggleEmail:t,toggleScript:n,toggleLinks:o,broadcastControl:i})}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),oe("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}Eo();})();
