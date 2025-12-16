(()=>{var at="",yo=t=>new Promise(e=>setTimeout(e,t));async function Mt(){if(at)return at;try{let t=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!t)return"Agente";t.click(),await yo(100);let e="Consultor",n=document.querySelector("profile-details .name");if(n)e=n.textContent.trim().split(" ")[0],e=e.charAt(0).toUpperCase()+e.slice(1).toLowerCase();else{let o=document.querySelector("profile-details img");if(o&&o.src.includes("/photos/")){let i=o.src.match(/\/photos\/([^\?]+)/)[1];e=i.charAt(0).toUpperCase()+i.slice(1)}}return t.click(),document.body.click(),at=e,e}catch(t){return console.warn("Sherlock falhou:",t),"Consultor"}}function ht(){return at||"Consultor"}function Dt(t){let e=new Date,n=e.getHours(),o=e.getDay(),i="Ol\xE1",s="";n>=5&&n<12?(i="Bom dia",s='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):n>=12&&n<18?(i="Boa tarde",s='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(i="Boa noite",s='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let a=[];n>=0&&n<5?a=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:n<12?o===1?a=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:o===5?a=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:a=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:n<18?a=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:a=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(o===0||o===6)&&(a=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let l=a[Math.floor(Math.random()*a.length)];return{prefix:`${i},`,name:t,suffix:l,icon:s,isFriday:o===5}}function xt(){let t="Cliente",e="[INSERIR URL]";try{let o=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(o&&o.nextElementSibling){let i=o.nextElementSibling.innerText.trim();i&&(t=i)}}catch(n){console.warn("Falha ao capturar Nome:",n)}try{let o=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(o&&o.nextElementSibling){let i=o.nextElementSibling.innerText.trim();i&&(e=i)}}catch(n){console.warn("Falha ao capturar Website:",n)}return{advertiserName:t,websiteUrl:e,agentName:ht()}}var Be=null,yt=null,Oe=.3;function ze(){if(!Be){let t=window.AudioContext||window.webkitAudioContext;t&&(Be=new t)}return Be&&Be.state==="suspended"&&Be.resume(),Be}function Ft(t){if(yt)return yt;let e=t.sampleRate*2,n=t.createBuffer(1,e,t.sampleRate),o=n.getChannelData(0);for(let i=0;i<e;i++)o[i]=Math.random()*2-1;return yt=n,n}var Q={playClick:()=>{let t=ze();if(!t)return;let e=t.currentTime,n=t.createBufferSource();n.buffer=Ft(t);let o=t.createBiquadFilter();o.type="highpass",o.frequency.value=4e3;let i=t.createGain();i.gain.setValueAtTime(Oe*.8,e),i.gain.exponentialRampToValueAtTime(.001,e+.015),n.connect(o),o.connect(i),i.connect(t.destination),n.start(e),n.stop(e+.02)},playHover:()=>{let t=ze();if(!t)return;let e=t.currentTime,n=t.createOscillator();n.type="sine",n.frequency.setValueAtTime(400,e);let o=t.createGain();o.gain.setValueAtTime(0,e),o.gain.linearRampToValueAtTime(Oe*.1,e+.005),o.gain.linearRampToValueAtTime(0,e+.02),n.connect(o),o.connect(t.destination),n.start(e),n.stop(e+.03)},playSuccess:()=>{let t=ze();if(!t)return;let e=t.currentTime;[1046.5,1567.9].forEach((o,i)=>{let s=t.createOscillator(),a=t.createGain();s.type="sine",s.frequency.value=o,a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(Oe*.6,e+.05),a.gain.exponentialRampToValueAtTime(.001,e+.6),s.connect(a),a.connect(t.destination),s.start(e),s.stop(e+.7)})},playGenieOpen:()=>{let t=ze();if(!t)return;let e=t.currentTime,n=t.createBufferSource();n.buffer=Ft(t);let o=t.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(100,e),o.frequency.exponentialRampToValueAtTime(800,e+.2);let i=t.createGain();i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(Oe*.5,e+.05),i.gain.linearRampToValueAtTime(0,e+.25),n.connect(o),o.connect(i),i.connect(t.destination),n.start(e),n.stop(e+.3)},playError:()=>{let t=ze();if(!t)return;let e=t.currentTime,n=t.createOscillator(),o=t.createGain();n.type="triangle",n.frequency.setValueAtTime(120,e),n.frequency.exponentialRampToValueAtTime(80,e+.1),o.gain.setValueAtTime(Oe,e),o.gain.exponentialRampToValueAtTime(.001,e+.15),n.connect(o),o.connect(t.destination),n.start(e),n.stop(e+.2)},playStartup:()=>{let t=ze();if(!t)return;let e=t.currentTime,n=.12,o=t.createOscillator(),i=t.createGain(),s=t.createBiquadFilter();o.type="square",o.frequency.setValueAtTime(400,e),o.frequency.exponentialRampToValueAtTime(50,e+.1),s.type="lowpass",s.frequency.setValueAtTime(800,e),s.frequency.exponentialRampToValueAtTime(100,e+.1),i.gain.setValueAtTime(Oe*4,e),i.gain.exponentialRampToValueAtTime(.001,e+.1),o.connect(s),s.connect(i),i.connect(t.destination),o.start(e),o.stop(e+.12);let a=t.createOscillator(),l=t.createGain();a.type="sine",a.frequency.setValueAtTime(150,e),a.frequency.exponentialRampToValueAtTime(50,e+.15),l.gain.setValueAtTime(Oe*1.5,e),l.gain.exponentialRampToValueAtTime(.001,e+.15),a.connect(l),l.connect(t.destination),a.start(e),a.stop(e+.15),[55,55.4,110.5].forEach(m=>{let u=t.createOscillator(),c=t.createGain(),v=t.createBiquadFilter();u.type="sawtooth",u.frequency.value=m,v.type="lowpass",v.frequency.setValueAtTime(30,e),v.frequency.linearRampToValueAtTime(900,e+n+.2),v.frequency.exponentialRampToValueAtTime(40,e+3),c.gain.setValueAtTime(0,e),c.gain.linearRampToValueAtTime(Oe*.6,e+n+.1),c.gain.exponentialRampToValueAtTime(.001,e+3.5),u.connect(v),v.connect(c),c.connect(t.destination),u.start(e),u.stop(e+3.6)})},playNotification:()=>{let t=ze();if(!t)return;let e=t.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(o=>{let i=t.createOscillator(),s=t.createGain();i.type="sine",i.frequency.setValueAtTime(o.freq,e),s.gain.setValueAtTime(0,e),s.gain.linearRampToValueAtTime(Oe*o.vol,e+.004),s.gain.exponentialRampToValueAtTime(.001,e+o.dur),i.connect(s),s.connect(t.destination),i.start(e),i.stop(e+o.dur+.1)})},playSwoosh:()=>{Q.playGenieOpen()},playReset:()=>{Q.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let t=0,e=50;document.addEventListener("mouseover",n=>{if(!Be)return;let o=n.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!o||o.contains(n.relatedTarget))return;let i=Date.now();i-t<e||(Q.playHover(),t=i)},{passive:!0})}};var Gt=1e4;function Bt(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let t=document.createElement("link");t.id="google-font-roboto",t.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",t.rel="stylesheet",document.head.appendChild(t);let e=document.createElement("style");e.id="techsol-global-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function J(t,e={}){let n=document.createElement("div"),o=e.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(n.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:o,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),n.textContent=t,document.body.appendChild(n),e.error?Q.playError():Q.playSuccess(),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>n.remove(),400)},e.duration||4e3)}function jt(t,e=null){let n=0,o=0,i=0,s=0,a=e||t;a.style.cursor="grab",a.onmousedown=l;function l(u){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(u.target.tagName)||u.target.closest(".no-drag"))return;u=u||window.event,a.style.cursor="grabbing",t.style.transition="none";let c=t.getBoundingClientRect();t.style.transform="none",t.style.left=c.left+"px",t.style.top=c.top+"px",t.style.margin="0",t.style.bottom="auto",t.style.right="auto",Gt++,t.style.zIndex=Gt,i=u.clientX,s=u.clientY,t.setAttribute("data-dragging","true"),document.onmouseup=m,document.onmousemove=g}function g(u){u=u||window.event,u.preventDefault(),n=i-u.clientX,o=s-u.clientY,i=u.clientX,s=u.clientY;let c=t.offsetTop-o,v=t.offsetLeft-n,b=16,f=window.innerWidth,A=window.innerHeight,T=t.offsetWidth,q=t.offsetHeight;v<b?v=b:v+T>f-b&&(v=f-T-b),c<b?c=b:c+q>A-b&&(c=A-q-b),t.style.top=c+"px",t.style.left=v+"px"}function m(){document.onmouseup=null,document.onmousemove=null,a.style.cursor="grab",setTimeout(()=>{t.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",t.setAttribute("data-dragging","false"),t.setAttribute("data-moved","true")},50)}}var Ae={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var At={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Pt={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var Vt={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var be={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var vt=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],zt=-1;function Je(){let t=Math.floor(Math.random()*vt.length);return t===zt&&(t=(t+1)%vt.length),zt=t,vt[t]}var qe=t=>new Promise(e=>setTimeout(e,t));async function vo(t,e){if(!t)return;t.style.opacity="1",t.innerHTML='<span class="cursor">|</span>';let n=t.querySelector(".cursor");await qe(200);for(let o=0;o<e.length;o++){let i=e.charAt(o),s=document.createElement("span");s.textContent=i,n&&n.parentNode===t?n.before(s):t.appendChild(s);let a=Math.floor(Math.random()*60)+30;o===0&&(a=150),o>e.length-3&&(a=30),await qe(a)}await qe(600),n&&(n.style.display="none")}async function wt(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let e=document.createElement("style");e.id="google-splash-style",e.innerHTML=`
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
    `,document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1");try{await qe(200);let e=await Mt(),n=Dt(e),o=t.querySelector("#w-icon"),i=t.querySelector("#p1"),s=t.querySelector("#p2"),a=t.querySelector("#p3"),l=t.querySelector("#p-sextou");o&&(o.innerHTML=n.icon),i&&(i.textContent=n.prefix),a&&(a.textContent=n.suffix),await qe(300);let g=o?o.querySelector("svg"):null;if(g&&(g.style.opacity="1",g.style.transform="scale(1)"),await qe(400),i&&(i.style.opacity="1"),Q.playStartup(),s&&await vo(s,n.name),a&&(a.style.opacity="1",a.style.transform="translateY(0)"),n.isFriday&&l){await qe(400),l.style.display="block",l.offsetWidth;let m=l.querySelector(".sextou-badge");m&&(m.style.opacity="1",m.style.transform="scale(1)")}await qe(1500)}catch(e){console.warn("Splash error, skipping...",e)}finally{t.classList.add("splash-exit"),await qe(900),t.parentNode&&t.parentNode.removeChild(t)}}var Ue={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function We(t,e){e.onmousedown=n;function n(o){o.stopPropagation(),o.preventDefault();let i=t.style.transition;t.style.transition="none";let s=o.clientX,a=o.clientY,l=parseFloat(getComputedStyle(t,null).getPropertyValue("width").replace("px","")),g=parseFloat(getComputedStyle(t,null).getPropertyValue("height").replace("px","")),m=s,u=a,c=!1;function v(A){m=A.clientX,u=A.clientY,c||(window.requestAnimationFrame(()=>{b(),c=!1}),c=!0)}function b(){let A=l+(m-s),T=g+(u-a);A>360&&(t.style.width=A+"px"),T>300&&(t.style.height=T+"px")}function f(){document.removeEventListener("mousemove",v),document.removeEventListener("mouseup",f),setTimeout(()=>{t.style.transition=i},50)}document.addEventListener("mousemove",v),document.addEventListener("mouseup",f)}e.onmouseenter=()=>e.style.opacity="1",e.onmouseleave=()=>e.style.opacity="0.6"}function Ht(t){if(!t)return"";let e={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return t.replace(/:([a-zA-Z0-9-_+]+):/g,n=>e[n]?e[n]:"")}var Ze=t=>new Promise(e=>setTimeout(e,t));function it(t){t&&["mousedown","mouseup","click"].forEach(e=>t.dispatchEvent(new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window})))}var $t="cw-automation-styles";if(!document.getElementById($t)){let t=document.createElement("style");t.id=$t,t.innerHTML=`
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
    `,document.head.appendChild(t)}function Ut(t){let e=document.getElementById("cw-loading-overlay");t?e?e.style.opacity="1":(e=document.createElement("div"),e.id="cw-loading-overlay",document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1")):e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}async function Wt(t){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let e=document.getElementById(t),n="";Ut(!0),e&&(n=e.placeholder,e.placeholder="Buscando ID...",e.value="",e.classList.add("cw-scanning-active"));try{let o=document.querySelector('material-button[debug-id="dock-item-case-log"]');o&&!o.classList.contains("selected")&&(it(o),await Ze(1200));let i=document.querySelector("search-filter dropdown-button .button");if(i&&!(i.innerText||"").includes("All")){it(i),await Ze(600);let c=document.querySelector('material-checkbox[debug-id="check-all-box"]');c&&c.getAttribute("aria-checked")!=="true"&&(it(c),await Ze(300));let v=document.querySelector('material-button[debug-id="apply-filter"]');v&&(it(v),await Ze(1500))}let s=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");s&&(s.scrollTop=s.scrollHeight,await Ze(500));let l=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body")),g=/Speakeasy.*?(P\d{15,25})/i,m=null;for(let u=l.length-1;u>=0;u--){let c=l[u];if(c.offsetParent===null)continue;let v=(c.innerText||"").match(g);if(v&&v[1]){m=v[1];break}}if(e)if(m){try{await navigator.clipboard.writeText(m)}catch{}e.value=m,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),Q.playSuccess(),J(`ID Localizado: ${m}`),e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}else Q.playError(),J("Nenhum ID encontrado.",{error:!0}),e.placeholder="N\xE3o encontrado",e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}catch(o){console.error("Erro na automa\xE7\xE3o:",o),J("Erro ao processar.",{error:!0})}finally{e&&(e.classList.remove("cw-scanning-active"),e.value||(e.placeholder=n)),Ut(!1)}}var Ie={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:"}},_e={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},et={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>Substatus:</b> DC - Other<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br>Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},st={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},tt=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],St=["CONSIDERACOES","COMENTARIOS"],we={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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

Irei abrir caso em BAU para o dia solicitado e pedir descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo.`}};var pe=t=>new Promise(e=>setTimeout(e,t));function Se(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>t.dispatchEvent(new MouseEvent(n,e)))}function ot(){return Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(e=>{let n=e.offsetParent!==null,o=e.closest("case-message-view")!==null,i=e.closest(".editor")!==null||e.closest("write-card")!==null;return n&&!o&&i})}async function Yt(){console.log("\u{1F680} FASE 1: Abrindo janela de email...");let t=!1,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(u=>u.innerText.trim()==="email");if(n&&n.offsetParent!==null){let u=n.closest("material-button")||n.closest("material-fab")||n;u.style&&(u.style.display="block",u.style.visibility="visible"),Se(u),t=!0}else{let u=document.querySelector("material-fab-speed-dial");if(u){let c=u.querySelector(".trigger");if(c){c.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),Se(c),await pe(1e3);let b=Array.from(document.querySelectorAll("i.material-icons-extended")).find(f=>f.innerText.trim()==="email");b&&(Se(b),t=!0)}else u.click()}}if(!t)return J("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;console.log("\u{1F680} FASE 2: Verificando rascunhos (Polling de 3s)...");let o=null,i=0;for(;i<15;){await pe(200);let u=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(o=Array.from(u).find(v=>v.offsetParent!==null),o)break;if(ot()){console.log("\u2139\uFE0F Editor apareceu limpo. Sem rascunhos.");break}i++}if(o){console.log("\u26A0\uFE0F RASCUNHO LOCALIZADO! Executando descarte..."),Se(o);let u=o.querySelector(".buttonText");u&&Se(u),o.click(),console.log("\u23F3 Aguardando Confirm...");let c=null,v=0;for(;v<20;){await pe(200);let b=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(c=Array.from(b).find(f=>f.offsetParent!==null),c)break;v++}if(c){console.log("\u2705 Confirmando..."),Se(c);let b=c.querySelector(".content");b&&Se(b),J("Limpando rascunho...",{duration:2e3}),console.log("\u23F3 Aguardando reload do editor p\xF3s-descarte..."),await pe(3e3)}else console.warn("\u274C Confirm n\xE3o apareceu.")}console.log("\u{1F680} FASE 3: Buscando editor final para limpeza...");let s=0,a=ot();for(;!a&&s<20;)await pe(500),a=ot(),s++;if(!a)return J("Erro: Editor n\xE3o carregou ap\xF3s a abertura.",{error:!0}),!1;let l=a.closest('[id="email-body-content-top"]'),m=(a.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(l){if(m){let c=m.closest('[aria-hidden="true"]');c&&c.removeAttribute("aria-hidden"),m.focus()}await pe(300),l.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let u=l.querySelector("#cases-body-field");if(u){let c=document.createRange();c.selectNodeContents(u),c.collapse(!0);let v=window.getSelection();v.removeAllRanges(),v.addRange(c)}return!0}return!1}async function Xt(t){if(!t)return;J("Preparando email...",{duration:3e3});let e=xt();if(!await Yt())return;await pe(500);let o=document.querySelector('material-button[debug-id="canned_response_button"]');if(o){o.scrollIntoView({behavior:"smooth",block:"center"}),await pe(200),Se(o),await pe(1500);let i=document.querySelector("material-auto-suggest-input input");if(i){Se(i),await pe(200),document.execCommand("insertText",!1,t),i.dispatchEvent(new Event("input",{bubbles:!0}));let s=null,a=0;for(;a<20;){await pe(500),a++;let l=Array.from(document.querySelectorAll("material-select-dropdown-item"));if(l.length>0&&(s=l.find(g=>g.innerText.toLowerCase().includes(t.toLowerCase())),!s&&l.length===1&&(s=l[0]),s))break}if(s){let l=function(c,v){if(c.nodeType===3&&c.nodeValue.includes(v))return c;if(!c.childNodes)return null;for(let b of c.childNodes){let f=l(b,v);if(f)return f}return null};Se(s),await pe(2e3);let g=ot(),m=g?g.closest('[id="email-body-content-top"]'):document.body,u=l(m,"{%ADVERTISER_NAME%}");if(u){let c=document.createRange(),v=u.nodeValue.indexOf("{%ADVERTISER_NAME%}");c.setStart(u,v),c.setEnd(u,v+19);let b=window.getSelection();b.removeAllRanges(),b.addRange(c),document.execCommand("insertText",!1,e.advertiserName),J("Email preenchido!")}else J("Email inserido (Nome n\xE3o substitu\xEDdo).")}else J(`Template '${t}' n\xE3o encontrado.`,{error:!0})}}else J("Bot\xE3o Canned Response n\xE3o achado.",{error:!0})}async function Ct(t){console.log(`\u{1F680} Iniciando automa\xE7\xE3o (Quick): ${t.name}`),J("Preparando email...",{duration:3e3});let e=xt(),n=ht();if(!await Yt())return;await pe(600);let i=document.querySelector('input[aria-label="Subject"]');i&&t.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,t.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await pe(300));let s=ot();if(s){let l=(s.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');l&&(l.focus(),l.click(),l.dispatchEvent(new Event("input",{bubbles:!0}))),await pe(400);let g=new Date;g.setDate(g.getDate()+3);let m=g.getDay();m===6?g.setDate(g.getDate()+2):m===0&&g.setDate(g.getDate()+1);let u=g.toLocaleDateString("pt-BR"),c=t.body;c=c.replace(/\[Nome do Cliente\]/g,e.advertiserName||"Cliente"),c=c.replace(/\[INSERIR URL\]/g,e.websiteUrl||"seu site"),c=c.replace(/\[URL\]/g,e.websiteUrl||"seu site"),c=c.replace(/\[Seu Nome\]/g,n),c=c.replace(/\[MM\/DD\/YYYY\]/g,u),document.execCommand("insertHTML",!1,c),l&&(l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0}))),J("Email preenchido com sucesso!",{duration:2e3}),await pe(800)}else J("Erro ao focar no editor.",{error:!0})}var Ao={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},Kt={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function Ce(t,e,n,o,i,s){let a=document.createElement("div");Object.assign(a.style,Ao),jt(t,a);let l=document.createElement("div");Object.assign(l.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),a.appendChild(l),i&&(i.googleLine=l);let g=document.createElement("div");Object.assign(g.style,{display:"flex",alignItems:"center",gap:"12px"});let m=document.createElement("img");m.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(m.style,{width:"20px",height:"20px",pointerEvents:"none"});let u=document.createElement("span");u.textContent=e,g.appendChild(m),g.appendChild(u);let c=document.createElement("div");Object.assign(c.style,{display:"flex",alignItems:"center",gap:"4px"});let v='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',b='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',f=document.createElement("div");f.innerHTML=v,Object.assign(f.style,Kt),f.title="Sobre",f.classList.add("no-drag"),f.onmouseenter=()=>{f.style.background="rgba(255,255,255,0.1)",f.style.color="#FFF"},f.onmouseleave=()=>{f.style.color!=="rgb(138, 180, 248)"&&(f.style.background="transparent",f.style.color="#9AA0A6")};let A=document.createElement("div");A.innerHTML=b,Object.assign(A.style,Kt),A.title="Fechar",A.classList.add("no-drag"),A.onmouseenter=()=>{A.style.background="rgba(242, 139, 130, 0.2)",A.style.color="#F28B82"},A.onmouseleave=()=>{A.style.background="transparent",A.style.color="#9AA0A6"},A.onmousedown=q=>q.stopPropagation(),f.onmousedown=q=>q.stopPropagation(),A.onclick=s;let T=wo(t,e,n,o);return f.onclick=q=>{q.stopPropagation(),T.style.opacity==="1"?(T.style.opacity="0",T.style.pointerEvents="none",f.style.color="#9AA0A6",f.style.background="transparent"):(T.style.opacity="1",T.style.pointerEvents="auto",f.style.color="#8AB4F8",f.style.background="rgba(138, 180, 248, 0.1)")},c.appendChild(f),c.appendChild(A),a.appendChild(g),a.appendChild(c),a}function wo(t,e,n,o){let i=document.createElement("div");return Object.assign(i.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(5px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),i.innerHTML=`
        <div style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${e}</div>
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
    `,setTimeout(()=>{let s=i.querySelector("#close-help-internal");s&&(s.onmouseover=()=>s.style.backgroundColor="#f8f9fa",s.onmouseout=()=>s.style.backgroundColor="white",s.onclick=()=>{i.style.opacity="0",i.style.pointerEvents="none"})},0),t.appendChild(i),i}if(!document.getElementById("cw-module-styles")){let t=document.createElement("style");t.id="cw-module-styles",t.innerHTML=`
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
    `,document.head.appendChild(t)}function Ee(t,e,n){let o=document.getElementById(n);if(!e)return;let i=e.getAttribute("data-moved")==="true",s={x:0,y:0};if(o){let u=o.getBoundingClientRect();s.x=u.left+u.width/2,s.y=u.top+u.height/2}let a,l;if(!i)a=window.innerWidth/2,l=window.innerHeight/2;else{let u=e.getBoundingClientRect();a=u.left+u.width/2,l=u.top+u.height/2,a===0&&l===0&&(a=window.innerWidth/2,l=window.innerHeight/2)}let g=s.x-a,m=s.y-l;t?(Q.playGenieOpen(),e.style.transition="none",e.style.opacity="0",e.style.pointerEvents="auto",i?e.style.transform=`translate(${g}px, ${m}px) scale(0.05)`:e.style.transform=`translate(calc(-50% + ${g}px), calc(-50% + ${m}px)) scale(0.05)`,e.offsetWidth,requestAnimationFrame(()=>{e.classList.add("open"),o&&o.classList.add("active"),e.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",e.style.opacity="1",i?e.style.transform="translate(0, 0) scale(1)":e.style.transform="translate(-50%, -50%) scale(1)"}),typeof Qt=="function"&&Qt(e,n)):(Q.playSwoosh(),e.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",e.style.pointerEvents="none",requestAnimationFrame(()=>{e.style.opacity="0",i?e.style.transform=`translate(${g}px, ${m}px) scale(0.1)`:e.style.transform=`translate(calc(-50% + ${g}px), calc(-50% + ${m}px)) scale(0.1)`}),setTimeout(()=>{e.classList.remove("open"),o&&o.classList.remove("active"),e.style.transition="",e.style.transform=""},300),typeof Et=="function"&&Et(e))}function Qt(t,e){Et(t);let n=o=>{if(!t.classList.contains("open"))return;let i=t.contains(o.target),s=document.querySelector(".cw-pill"),a=s&&s.contains(o.target);i?(t.classList.remove("idle"),t.style.zIndex="2147483648"):a||(t.classList.add("idle"),t.style.zIndex="2147483646")};t._idleHandler=n,document.addEventListener("mousedown",n)}function Et(t){t._idleHandler&&(document.removeEventListener("mousedown",t._idleHandler),t._idleHandler=null)}var eo="https://script.google.com/a/macros/google.com/s/AKfycbwxxY5EhL3U1ZIEvs_y28FFeIFr7rMfSzNIljclqPd9Mk58-gx7pBRfZ8pQmXt2P1IMjw/exec",Tt="cw_data_broadcast",Jt="cw_data_tips",So=["Processando sua solicita\xE7\xE3o...","Dica: Mantenha suas notas organizadas.","Aguarde um momento...","Quase l\xE1..."];function Zt(t){return new Promise((e,n)=>{let o="cw_cb_"+Math.round(1e4*Math.random()),i=document.createElement("script");window[o]=s=>{document.body.removeChild(i),delete window[o],e(s)},i.src=`${eo}?op=${t}&callback=${o}&t=${Date.now()}`,i.onerror=()=>{document.body.removeChild(i),delete window[o],n(new Error("JSONP Load Error"))},document.body.appendChild(i)})}var je={fetchTips:async()=>{try{console.log("\u{1F4E5} Baixando dicas via JSONP...");let t=await Zt("tips");t&&t.tips&&Array.isArray(t.tips)&&(localStorage.setItem(Jt,JSON.stringify(t.tips)),console.log("\u2705 Dicas atualizadas:",t.tips.length))}catch(t){console.warn("TechSol: Erro ao baixar dicas (Offline).",t)}},fetchData:async()=>{try{console.log("\u{1F4E5} Baixando Broadcasts via JSONP...");let t=await Zt("broadcast");if(t&&t.broadcast)return localStorage.setItem(Tt,JSON.stringify(t.broadcast)),console.log("\u2705 Broadcasts atualizados:",t.broadcast.length),t}catch(t){console.warn("TechSol: Erro ao buscar Broadcasts.",t)}return{broadcast:JSON.parse(localStorage.getItem(Tt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(Tt)||"[]"),getRandomTip:()=>{let t=So,e=localStorage.getItem(Jt);if(e)try{t=JSON.parse(e)}catch{}return t[Math.floor(Math.random()*t.length)]},logUsage:(t,e="")=>{let o={op:"log",user:window._USER_ID||"agente_anonimo",action:t,meta:e};fetch(eo,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(o)}).catch(i=>console.log("Log fail",i))}};var ae={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00"},rt=t=>new Promise(e=>setTimeout(e,t));function to(t){let e="cw-command-center-style";if(!document.getElementById(e)){let b=document.createElement("style");b.id=e,b.innerHTML=`
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
                background: ${ae.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${ae.glassBorder}; border-radius: 50px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.4); z-index: 2147483647;
                opacity: 0; transform: translateX(40px) scale(0.95);
                transition: opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
            }
            .cw-pill.docked { opacity: 1; transform: translateX(0) scale(1); }

            .cw-btn {
                width: 40px; height: 40px; 
                border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center; 
                cursor: pointer; position: relative; color: ${ae.iconIdle};
                opacity: 0; transform: scale(0.5);
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-btn.popped { opacity: 1; transform: scale(1); }

            .cw-btn:hover { background: ${ae.glassHighlight}; color: ${ae.iconActive}; transform: scale(1.1); }

            /* Estados Ativos e Cores */
            .cw-btn.notes.active { color: ${ae.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${ae.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${ae.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${ae.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.broadcast.active { color: ${ae.orange} !important; background: rgba(249, 171, 0, 0.15); } /* NOVO */

            .cw-btn.notes:hover { color: ${ae.blue}; filter: drop-shadow(0 0 5px rgba(138, 180, 248, 0.5)); }
            .cw-btn.email:hover { color: ${ae.red}; filter: drop-shadow(0 0 5px rgba(242, 139, 130, 0.5)); }
            .cw-btn.script:hover { color: ${ae.purple}; filter: drop-shadow(0 0 5px rgba(197, 138, 249, 0.5)); }
            .cw-btn.links:hover { color: ${ae.green}; filter: drop-shadow(0 0 5px rgba(129, 201, 149, 0.5)); }
            .cw-btn.broadcast:hover { color: ${ae.orange}; filter: drop-shadow(0 0 5px rgba(249, 171, 0, 0.5)); } /* NOVO */

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
                width: 24px; height: 4px; background-color: ${ae.iconIdle}; border-radius: 4px; 
                opacity: 0.4; transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1); 
            }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            .cw-grip:active { cursor: grabbing; }
            .cw-pill.dragging .cw-grip-bar { background-color: ${ae.blue}; width: 16px; opacity: 1; }

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
.cw-center-dots span:nth-child(1) { background-color: ${ae.blue}; animation-delay: -0.32s; }
.cw-center-dots span:nth-child(2) { background-color: ${ae.red}; animation-delay: -0.16s; }
.cw-center-dots span:nth-child(3) { background-color: ${ae.green}; }

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
.cw-center-success { display: none; color: ${ae.green}; }
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
        `,document.head.appendChild(b)}let n={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>'},o=document.createElement("div");o.className="cw-pill side-right",o.innerHTML=`
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
    `;let i=document.createElement("div");if(i.className="cw-focus-backdrop",document.body.appendChild(i),document.body.appendChild(o),o.querySelector(".notes").onclick=b=>{b.stopPropagation(),t.toggleNotes()},o.querySelector(".email").onclick=b=>{b.stopPropagation(),t.toggleEmail()},o.querySelector(".script").onclick=b=>{b.stopPropagation(),t.toggleScript()},o.querySelector(".links").onclick=b=>{b.stopPropagation(),t.toggleLinks()},o.querySelector(".broadcast").onclick=b=>{b.stopPropagation();let f=b.currentTarget.querySelector(".cw-badge");f&&(f.style.transform="scale(0)",setTimeout(()=>f.remove(),200)),t.broadcastControl&&t.broadcastControl.toggle()},t.broadcastControl&&t.broadcastControl.hasUnread){let b=document.createElement("div");b.className="cw-badge",o.querySelector(".broadcast").appendChild(b)}(async function(){await rt(2800),o.classList.add("docked"),await rt(300);let f=o.querySelectorAll(".cw-btn");o.querySelectorAll(".cw-sep").forEach(T=>T.classList.add("visible"));for(let T=0;T<f.length;T++)f[T].classList.add("popped"),await rt(90);await rt(200),o.classList.add("system-check")})();let s=!1,a,l,g,m,u=3;o.onmousedown=b=>{if(b.target.closest("button"))return;b.preventDefault(),a=b.clientX,l=b.clientY;let f=o.getBoundingClientRect();g=f.left,m=f.top,document.addEventListener("mousemove",c),document.addEventListener("mouseup",v)};function c(b){let f=b.clientX-a,A=b.clientY-l;!s&&Math.sqrt(f*f+A*A)>u&&(s=!0,o.style.transition="none"),s&&(o.style.left=`${g+f}px`,o.style.top=`${m+A}px`,o.style.right="auto",o.style.bottom="auto",o.style.transform="none")}function v(b){if(document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",v),s){s=!1,o.style.transition="left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s ease";let f=window.innerWidth,A=window.innerHeight,T=o.getBoundingClientRect(),q=T.left+T.width/2,R;q<f/2?(R=24,o.classList.remove("side-right"),o.classList.add("side-left")):(R=f-T.width-24,o.classList.remove("side-left"),o.classList.add("side-right"));let j=T.top;j<24&&(j=24),j>A-T.height-24&&(j=A-T.height-24),o.style.left=`${R}px`,o.style.top=`${j}px`}else{let f=b.target.closest("button");f&&(f.style.transform="scale(0.9)",setTimeout(()=>f.style.transform="",150))}}}function Ye(){let t=document.querySelector(".cw-pill"),e=document.querySelector(".cw-focus-backdrop");if(!t)return()=>{};let n=document.createElement("div");n.className="cw-center-stage",n.innerHTML=`
        <div class="cw-center-dots">
            <span></span><span></span><span></span>
        </div>
        <div class="cw-center-text">${je.getRandomTip()}</div>
        <div class="cw-center-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
    `,t.appendChild(n);let o=Date.now();return t.classList.add("processing-center"),e&&e.classList.add("active"),function(){let s=Date.now()-o,a=Math.max(0,2e3-s);setTimeout(()=>{let l=n.querySelector(".cw-center-dots"),g=n.querySelector(".cw-center-text"),m=n.querySelector(".cw-center-success");l&&(l.style.display="none"),g&&(g.style.display="none"),m&&m.classList.add("show"),t.classList.add("success"),setTimeout(()=>{t.classList.remove("processing-center"),setTimeout(()=>{n.remove(),t.classList.remove("success"),e&&e.classList.remove("active")},400)},1e3)},a)}}function oo(t){let e=document.createElement("div");e.className="cw-step-scenarios";let n=document.createElement("div");Object.assign(n.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let o=document.createElement("div");Object.assign(o.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"40px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s ease"}),o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>";let i=null;Object.entries(we).forEach(([a,l])=>{let g=document.createElement("div");g.textContent=a,Object.assign(g.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",display:"flex",alignItems:"center",gap:"6px"}),g.onmouseenter=()=>{i!==l&&(o.style.background="#fff",o.style.borderColor="#1a73e8",o.style.color="#202124",o.textContent=`"${l.substring(0,120)}${l.length>120?"...":""}"`),i!==l&&(g.style.background="#f1f3f4")},g.onmouseleave=()=>{i!==l&&(i||(o.style.background="#f8f9fa",o.style.borderColor="#dadce0",o.style.color="#5f6368",o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>"),g.style.background="#ffffff")},g.onclick=()=>{Q.playClick(),i===l?(i=null,s(),t("")):(i=l,s(),g.style.transform="scale(0.95)",setTimeout(()=>g.style.transform="scale(1)",150),t(l))},n.appendChild(g)});function s(){Array.from(n.children).forEach(a=>{we[a.textContent]===i?(a.style.background="#e8f0fe",a.style.borderColor="#1a73e8",a.style.color="#1967d2",a.style.fontWeight="500"):(a.style.background="#ffffff",a.style.borderColor="#dadce0",a.style.color="#3c4043",a.style.fontWeight="400")})}return e.appendChild(n),e.appendChild(o),e}var no=t=>new Promise(e=>setTimeout(e,t));function lt(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>t.dispatchEvent(new MouseEvent(n,e)))}function kt(t){let e=document.createElement("div");e.style.position="fixed",e.style.left="-9999px",e.innerHTML=t,document.body.appendChild(e);let n=document.createRange();n.selectNodeContents(e);let o=window.getSelection();o.removeAllRanges(),o.addRange(n);try{document.execCommand("copy")}catch{J("Falha ao copiar",{error:!0})}o.removeAllRanges(),document.body.removeChild(e)}function io(t){["input","change","keydown","keyup"].forEach(n=>{let o=new Event(n,{bubbles:!0,cancelable:!0});t.dispatchEvent(o)})}function ao(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function so(){console.log("Iniciando processo de Nova Nota...");let t=ao(),e=t.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(a=>a.innerText.trim()==="description");if(o){let a=o.closest("material-fab")||o.closest("material-button");a?(a.style&&(a.style.display="block",a.style.visibility="visible"),lt(a)):lt(o)}else{let a=document.querySelector("material-fab-speed-dial");if(a){let l=a.querySelector(".trigger");l?(l.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),lt(l)):a.click(),await no(800);let m=Array.from(document.querySelectorAll("i.material-icons-extended")).find(u=>u.innerText.trim()==="description");m&&lt(m)}}let i=null,s=0;for(;!i&&s<20;){await no(300);let a=ao();if(a.length>e)i=a.find(l=>!t.includes(l)),i||(i=a[a.length-1]);else if(s>10){let l=a.filter(g=>g.offsetParent!==null);l.length>0&&(i=l[l.length-1])}s++}return i}var H={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},Te="cubic-bezier(0.25, 0.8, 0.25, 1)",Co={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${H.border}`,backgroundColor:H.bgInput,fontSize:"14px",color:H.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${Te}, box-shadow 0.2s ${Te}, background-color 0.2s`,outline:"none"},tn={...Co,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},on={fontSize:"13px",fontWeight:"700",color:H.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},nn={display:"block",fontSize:"13px",fontWeight:"600",color:H.text,marginBottom:"8px",marginTop:"16px"},an={fontSize:"12px",color:H.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},sn={fontSize:"12px",color:H.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},rn={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:H.text,cursor:"pointer",padding:"12px 14px",backgroundColor:H.surface,border:`1px solid ${H.border}`,borderRadius:"12px",transition:`all 0.2s ${Te}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},Ot={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:H.primary},ln={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:H.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${Te}, box-shadow 0.2s ${Te}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},cn={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${H.primary}`,color:H.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${Te}`},dn={background:"transparent",border:`1px solid ${H.border}`,borderRadius:"20px",color:H.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${Te}`,fontFamily:"'Google Sans', 'Roboto'"};var pn={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:H.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},un={fontSize:"13px",fontWeight:"700",color:H.primary,minWidth:"20px",textAlign:"center"},mn={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${H.border}`,backgroundColor:H.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${Te}, box-shadow 0.2s ${Te}`},gn={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${H.bgInput}`},bn={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${H.border}`,backgroundColor:H.surface,color:H.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${Te}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},fn={backgroundColor:H.primaryBg,color:H.primary,borderColor:H.primary,fontWeight:"600"},hn={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:H.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},xn={borderTop:`1px solid ${H.bgInput}`,paddingTop:"20px",marginTop:"16px"};var yn={maxHeight:"240px",overflowY:"auto",border:`1px solid ${H.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:H.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},vn={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${H.bgInput}`,cursor:"pointer",fontSize:"13px",color:H.text,transition:"background 0.1s",userSelect:"none"};var Eo={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},To={fontSize:"12px",color:"#e37400",marginTop:"4px"},ko={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},Oo={display:"flex",gap:"15px",marginBottom:"10px"};function ro(){let t=document.createElement("div");t.id="tag-support-container",Object.assign(t.style,Eo);let e=document.createElement("label");e.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(e.style,At,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,Oo);let o=document.createElement("input");o.type="radio",o.name="ts_usage_mod",o.value="Sim",Object.assign(o.style,Ot);let i=document.createElement("label");i.textContent="Sim";let s=document.createElement("div");Object.assign(s.style,{display:"flex",alignItems:"center"}),s.appendChild(o),s.appendChild(i);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="N\xE3o",a.checked=!0,Object.assign(a.style,Ot);let l=document.createElement("label");l.textContent="N\xE3o";let g=document.createElement("div");Object.assign(g.style,{display:"flex",alignItems:"center"}),g.appendChild(a),g.appendChild(l),n.appendChild(s),n.appendChild(g);let m=document.createElement("div");m.style.display="block";let u=document.createElement("label");u.textContent="Qual foi o Motivo?",Object.assign(u.style,At,{fontSize:"12px"});let c=document.createElement("input");c.type="text",Object.assign(c.style,ko);let v=document.createElement("div");v.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(v.style,To),m.appendChild(u),m.appendChild(c),m.appendChild(v),t.appendChild(e),t.appendChild(n),t.appendChild(m),o.onchange=()=>{m.style.display="none"},a.onchange=()=>{m.style.display="block"};function b(T,q){if(t.style.display="none",!T||T.includes("Education")||!q||q.length===0)return;let R=q.some(r=>r.includes("enhanced")||r==="ec_google_ads"),j=q.some(r=>(r.includes("conversion")||r.includes("ads"))&&!r.includes("enhanced")),U=q.some(r=>r.includes("ga4")||r.includes("analytics")||r.includes("ua")),h=q.some(r=>r.includes("merchant")||r.includes("gmc")||r.includes("shopping"));(R||j&&!U&&!h)&&(t.style.display="block")}function f(){if(t.style.display==="none")return"";let T=`<br><b>Utilizou Tag Support?</b> ${o.checked?"Sim":"N\xE3o"}`;return a.checked&&c.value.trim()!==""&&(T+=`<br><b>Motivo:</b> ${c.value}`),T+="<br>",T}function A(){t.style.display="none",a.checked=!0,o.checked=!1,m.style.display="block",c.value=""}return{element:t,updateVisibility:b,getOutput:f,reset:A}}var G={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Pe={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function lo(t){let e={},n="implementation";function o(h){let x=h.toLowerCase();return x.includes("ads")||x.includes("conversion")||x.includes("remarketing")?G.brands.ads:x.includes("ga4")||x.includes("analytics")?G.brands.ga4:x.includes("gtm")||x.includes("tag manager")||x.includes("container")?G.brands.gtm:x.includes("merchant")||x.includes("shopping")||x.includes("feed")?G.brands.gmc:G.brands.default}let i=Object.entries(_e).filter(([h,x])=>x.popular),s={};Object.entries(_e).forEach(([h,x])=>{if(x.popular)return;let r=o(x.name);s[r.label]||(s[r.label]={brand:r,tasks:[]}),s[r.label].tasks.push({key:h,...x})});let a="cw-zen-tasks";if(!document.getElementById(a)){let h=document.createElement("style");h.id=a,h.innerHTML=`
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
        `,document.head.appendChild(h)}let l=document.createElement("div");l.className="cw-zen-container";let g=document.createElement("div");Object.assign(g.style,{display:"none"});let m=document.createElement("div");m.className="cw-screens-container",g.appendChild(m),l.innerHTML=`
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
    `;let u=l.querySelector(".cw-hero-grid"),c=l.querySelector(".cw-acc-container"),v=l.querySelector(".cw-results-container"),b=l.querySelector(".cw-search-input"),f=l.querySelector(".cw-status-bar"),A=l.querySelector(".cw-status-text"),T=l.querySelector(".cw-footer-icons");i.forEach(([h,x])=>{let r=o(x.name),d=document.createElement("div");d.className="cw-hero-card",d.id=`hero-${h}`,d.style.setProperty("--hero-color",r.color),d.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${Pe[r.icon]}</div>
                <div class="cw-hero-label">${x.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,d.onclick=S=>{if(S.target.closest(".cw-step-btn"))return;let p=e[h]?e[h].count:0;R(h,p>0?-p:1,x)},d.querySelector(".minus").onclick=()=>R(h,-1,x),d.querySelector(".plus").onclick=()=>R(h,1,x),d.dataset.color=r.color,u.appendChild(d)});function q(h,x){let r=o(x.name),d=document.createElement("div");return d.className="cw-task-item",d.dataset.id=h,d.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${r.bg}; color:${r.color}">
                    ${Pe[r.icon]||Pe.default}
                </div>
                <div class="cw-task-label">${x.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,d.onclick=S=>{if(S.target.closest(".cw-step-btn"))return;let p=e[h]?e[h].count:0;R(h,p>0?-p:1,x)},d.querySelector(".minus").onclick=()=>R(h,-1,x),d.querySelector(".plus").onclick=()=>R(h,1,x),d}Object.entries(s).forEach(([h,x])=>{let r=document.createElement("div");r.className="cw-acc-group";let d=document.createElement("div");d.className="cw-acc-header",d.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${x.brand.color}"></div>
                ${h}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,d.onclick=()=>{c.querySelectorAll(".cw-acc-group.open").forEach(p=>{p!==r&&p.classList.remove("open")}),r.classList.toggle("open")};let S=document.createElement("div");S.className="cw-acc-body",x.tasks.forEach(p=>{let y=q(p.key,p);S.appendChild(y)}),r.appendChild(d),r.appendChild(S),c.appendChild(r)});function R(h,x,r){e[h]||(e[h]={count:0,data:r,brand:o(r.name)}),e[h].count+=x,e[h].count<=0&&delete e[h],j(),U(),t&&t()}function j(){i.forEach(([S])=>{let p=u.querySelector(`#hero-${S}`);if(!p)return;let y=e[S];y?(p.classList.add("active"),p.querySelector(".cw-step-val").textContent=y.count,p.querySelector(".cw-step-val").style.color=p.dataset.color):p.classList.remove("active")}),l.querySelectorAll(".cw-task-item").forEach(S=>{let p=S.dataset.id,y=e[p];y?(S.classList.add("selected"),S.querySelector(".cw-step-val").textContent=y.count):S.classList.remove("selected")});let x=Object.keys(e),r=0,d=[];if(x.forEach(S=>{let p=e[S];r+=p.count;for(let y=0;y<p.count;y++)d.length<6&&d.push(p.brand)}),r>0){f.classList.add("visible");let S=r>1?"A\xE7\xF5es":"A\xE7\xE3o",p=r>1?"definidas":"definida";A.textContent=`${r} ${S} ${p}`,T.innerHTML="",d.forEach(y=>{let O=document.createElement("div");O.className="cw-mini-icon",O.innerHTML=Pe[y.icon]||Pe.default;let w=O.querySelector("svg");w&&(w.style.width="14px",w.style.height="14px"),T.appendChild(O)})}else f.classList.remove("visible")}b.addEventListener("input",h=>{let x=h.target.value.toLowerCase();if(x.length>0){c.style.display="none",v.style.display="block",v.innerHTML="";let r=!1;Object.entries(_e).forEach(([d,S])=>{if(S.name.toLowerCase().includes(x)){r=!0;let p=q(d,S);e[d]&&(p.classList.add("selected"),p.querySelector(".cw-step-val").textContent=e[d].count),v.appendChild(p)}}),r||(v.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else c.style.display="block",v.style.display="none"});function U(){m.innerHTML="";let h=Object.keys(e),x=!1,r=document.getElementById("sub-status"),d="implementation";if(r&&r.value.toLowerCase().includes("education")&&(d="education"),h.length===0){m.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}if(h.length===0){m.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}let S=document.createElement("div");S.className="cw-info-banner",S.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Todos os Screenshots s\xE3o baseados na descri\xE7\xE3o do 
                <a href="https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/" target="_blank" class="cw-info-link">Win Criteria</a>.
            </span>
        `,m.appendChild(S),h.forEach(p=>{let y=e[p].data,O=e[p].count,w=e[p].brand,k=y.screenshots?y.screenshots[d]||[]:["Link da Evid\xEAncia"];if(k.length>0){x=!0;for(let F=1;F<=O;F++){let L=document.createElement("div");L.className="cw-screen-card",L.style.setProperty("--brand-color",w.color),L.style.setProperty("--brand-bg",w.bg),L.style.setProperty("--brand-shadow",w.color+"40");let I=document.createElement("div");I.className="cw-card-header";let z=document.createElement("div");z.className="cw-card-icon",z.innerHTML=Pe[w.icon]||Pe.default;let N=document.createElement("div");N.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let Y=document.createElement("input");Y.className="cw-card-title-input",Y.id=`name-${p}-${F}`,Y.value=`${y.name}${O>1?" #"+F:""}`,Y.title="Clique para renomear esta task";let X=document.createElement("span");X.className="cw-edit-hint",X.innerHTML="\u270E Renomear",N.appendChild(Y),N.appendChild(X),I.appendChild(z),I.appendChild(N),L.appendChild(I),k.forEach((te,ie)=>{let ne=document.createElement("div");ne.className="cw-input-group";let fe=document.createElement("label");fe.className="cw-input-label",fe.textContent=te.replace(/📷|:|•/g,"").trim();let ce=document.createElement("input");ce.className="cw-input-field",ce.id=`screen-${p}-${F}-${ie}`,ce.placeholder="Cole o link aqui...",ce.setAttribute("autocomplete","off"),ce.addEventListener("input",()=>{ce.value.trim().length>5?ce.classList.add("filled"):ce.classList.remove("filled")});let ge=document.createElement("div");ge.className="cw-input-check",ge.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',ne.appendChild(fe),ne.appendChild(ce),ne.appendChild(ge),L.appendChild(ne)}),m.appendChild(L)}}}),g.style.display=x?"block":"none"}return{selectionElement:l,screenshotsElement:g,updateSubStatus:()=>U(),getCheckedElements:()=>Object.keys(e).map(h=>({value:h,closest:()=>({querySelector:()=>({textContent:e[h].count})})})),toggleTask:(h,x=!0)=>{let r=e[h];x&&!r?R(h,1,_e[h]):!x&&r&&R(h,-r.count,_e[h])},setMode:h=>{n=h,U()},reset:()=>{for(let h in e)delete e[h];b.value="",c.style.display="block",v.style.display="none",j(),U()}}}function co(){let t="v3.6.0",e="bau",n="pt",o=!1,i=!1,s={input:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},textarea:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease",height:"100px",resize:"vertical"},h3:{fontSize:"14px",fontWeight:"600",color:"#202124",margin:"0 0 12px 0"},label:{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},checkboxLabel:{display:"flex",alignItems:"center",marginBottom:"10px",fontSize:"14px",fontWeight:"400",cursor:"pointer",padding:"8px",background:"#f8f9fa",borderRadius:"6px",transition:"background-color 0.2s ease, box-shadow 0.2s ease",userSelect:"none"},checkboxInput:{width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"},buttonBase:{flex:"1 1 0",padding:"10px 0",color:"#fff",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"500",cursor:"pointer",marginTop:"16px"},stepBlock:{borderTop:"1px solid #eee",paddingTop:"12px",marginTop:"12px"},radioContainer:{display:"flex",gap:"15px",marginBottom:"10px"},optionalBtn:{width:"100%",padding:"10px",background:"white",border:"1px dashed #1a73e8",color:"#1a73e8",borderRadius:"6px",cursor:"pointer",fontWeight:"500",fontSize:"13px",marginBottom:"10px",transition:"all 0.2s"},helpLink:{fontSize:"12px",color:"#1a73e8",textDecoration:"none",cursor:"pointer",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"color 0.2s"}},a=ro(),l=lo(()=>{let M=l.getCheckedElements().map(E=>E.value);w&&w.value&&a.updateVisibility(w.value,M)}),g=document.createElement("div");g.id="autofill-popup",g.classList.add("cw-module-window"),Object.assign(g.style,Ae,{right:"100px",width:"400px",transition:"width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)"});let u=Ce(g,"Case Notes Assistant",t,"Gera notas padronizadas automaticamente. Selecione o status, as tasks realizadas e preencha os detalhes para inserir no caso.",{popup:g,googleLine:null},()=>ft());g.appendChild(u);let c=document.createElement("div");Object.assign(c.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1"}),g.appendChild(c);let v=document.createElement("div");v.textContent="created by lucaste@",Object.assign(v.style,Vt),g.appendChild(v);let b=document.createElement("div");b.id="step-lang-type";let f=document.createElement("label");Object.assign(f.style,s.label),b.appendChild(f);let A=document.createElement("div");Object.assign(A.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let T=document.createElement("div");T.textContent="Portugu\xEAs",T.classList.add("no-drag"),Object.assign(T.style,be);let q=document.createElement("div");q.textContent="Espa\xF1ol",q.classList.add("no-drag"),Object.assign(q.style,be),T.onclick=()=>ut("pt"),q.onclick=()=>ut("es"),A.appendChild(T),A.appendChild(q),b.appendChild(A),c.appendChild(b);let R=document.createElement("div");R.id="step-0-case-type";let j=document.createElement("label");Object.assign(j.style,s.label),R.appendChild(j);let U=document.createElement("div");Object.assign(U.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let h=document.createElement("div");h.textContent="BAU",h.classList.add("no-drag"),Object.assign(h.style,be);let x=document.createElement("div");x.textContent="LM",x.classList.add("no-drag"),Object.assign(x.style,be),h.onclick=()=>pt("bau"),x.onclick=()=>pt("lm"),U.appendChild(h),U.appendChild(x),R.appendChild(U),c.appendChild(R);let r=document.createElement("div");r.id="step-1-selection";let d=document.createElement("label");d.className="cw-input-label",d.textContent="Status Principal";let S=document.createElement("select");S.id="main-status",S.className="cw-select",S.innerHTML=`
      <option value="" disabled selected hidden>Selecione uma op\xE7\xE3o...</option>
      <option value="NI">NI - Need Info</option>
      <option value="SO">SO - Solution Offered</option>
      <option value="IN">IN - Inactive</option>
      <option value="AS">AS - Assigned</option>
      <option value="DC">DC - Discard</option>
  `;let p=document.createElement("div");p.style.cssText="display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; margin-bottom: 6px;";let y=document.createElement("label");y.className="cw-input-label",y.textContent="Sub-status",y.style.marginBottom="0";let O=document.createElement("a");O.href="https://seu-link-do-guia-aqui.com",O.target="_blank",O.className="cw-info-link",O.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; transform:translateY(1px)"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Guia de Substatus',Object.assign(O.style,s.helpLink),p.appendChild(y),p.appendChild(O);let w=document.createElement("select");w.id="sub-status",w.className="cw-select",w.disabled=!0,w.innerHTML='<option value="" disabled selected hidden>Aguardando status principal...</option>',r.appendChild(d),r.appendChild(S),r.appendChild(p),r.appendChild(w),c.appendChild(r);let k=document.createElement("div");k.id="step-1-1-portugal",Object.assign(k.style,s.stepBlock,{display:"none"});let F=document.createElement("label");Object.assign(F.style,s.label),k.appendChild(F);let L=document.createElement("div");Object.assign(L.style,s.radioContainer);let I=document.createElement("div");Object.assign(I.style,{display:"flex",alignItems:"center"});let z=document.createElement("input");z.type="radio",z.name="portugal-group",z.value="sim",Object.assign(z.style,s.checkboxInput);let N=document.createElement("label");N.htmlFor="portugal-sim",Object.assign(N.style,{cursor:"pointer"}),I.appendChild(z),I.appendChild(N);let Y=document.createElement("div");Object.assign(Y.style,{display:"flex",alignItems:"center"});let X=document.createElement("input");X.type="radio",X.name="portugal-group",X.value="nao",X.checked=!0,Object.assign(X.style,s.checkboxInput);let te=document.createElement("label");te.htmlFor="portugal-nao",Object.assign(te.style,{cursor:"pointer"}),Y.appendChild(X),Y.appendChild(te),L.appendChild(I),L.appendChild(Y),k.appendChild(L),c.appendChild(k);function ie(C){o=C,C?ne.style.display="block":ne.style.display="none"}z.onchange=()=>ie(!0),X.onchange=()=>ie(!1);let ne=document.createElement("div");ne.id="step-1-2-consent",Object.assign(ne.style,s.stepBlock,{display:"none"});let fe=document.createElement("label");Object.assign(fe.style,s.label),ne.appendChild(fe);let ce=document.createElement("div");Object.assign(ce.style,s.radioContainer);let ge=document.createElement("div");Object.assign(ge.style,{display:"flex",alignItems:"center"});let ye=document.createElement("input");ye.type="radio",ye.name="consent-group",ye.value="Sim",ye.checked=!0,Object.assign(ye.style,s.checkboxInput);let se=document.createElement("label");se.htmlFor="consent-sim",Object.assign(se.style,{cursor:"pointer"}),ge.appendChild(ye),ge.appendChild(se);let Z=document.createElement("div");Object.assign(Z.style,{display:"flex",alignItems:"center"});let ke=document.createElement("input");ke.type="radio",ke.name="consent-group",ke.value="N\xE3o",Object.assign(ke.style,s.checkboxInput);let Re=document.createElement("label");Re.htmlFor="consent-nao",Object.assign(Re.style,{cursor:"pointer"}),Z.appendChild(ke),Z.appendChild(Re),ce.appendChild(ge),ce.appendChild(Z),ne.appendChild(ce),c.appendChild(ne);let Le=document.createElement("div");Le.id="step-1-5-snippets",Object.assign(Le.style,s.stepBlock,{display:"none"});let nt=document.createElement("h3");Object.assign(nt.style,s.h3),nt.textContent="Cen\xE1rios Comuns";let ve=oo(C=>{let M=document.querySelector("textarea");M&&(M.value=C,M.dispatchEvent(new Event("input")),M.style.transition="background-color 0.2s",M.style.backgroundColor="#e8f0fe",setTimeout(()=>M.style.backgroundColor="#fff",300))});ve.id="snippet-container",Le.appendChild(nt),Le.appendChild(ve),c.appendChild(Le);let he=document.createElement("div");he.id="step-3-form",Object.assign(he.style,s.stepBlock,{display:"none"});let dt=document.createElement("h3");Object.assign(dt.style,s.h3),he.appendChild(dt);let Ne=document.createElement("div");Ne.id="dynamic-form-fields-container",he.appendChild(Ne);let ue=document.createElement("button");ue.textContent="+ Gostaria de selecionar uma task?",Object.assign(ue.style,s.optionalBtn),ue.onmouseover=()=>ue.style.background="#e8f0fe",ue.onmouseout=()=>ue.style.background="white",ue.onclick=()=>{ue.style.display="none",Me.style.display="block",l.selectionElement.style.display="block"};let Me=document.createElement("h3");Object.assign(Me.style,s.h3,{marginTop:"20px"});let It=l.selectionElement;Object.assign(It.style,{marginBottom:"20px"}),he.appendChild(ue),he.appendChild(Me),he.appendChild(It),he.appendChild(a.element),he.appendChild(l.screenshotsElement),c.appendChild(he);let De=document.createElement("div");De.id="step-4-email",Object.assign(De.style,{display:"none",marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #eee"});let Fe=document.createElement("label");Fe.style.display="flex",Fe.style.alignItems="center",Fe.style.cursor="pointer",Fe.style.fontSize="14px";let Ge=document.createElement("input");Ge.type="checkbox",Ge.checked=!0,Object.assign(Ge.style,s.checkboxInput),Fe.appendChild(Ge),Fe.appendChild(document.createTextNode("Preencher email automaticamente?")),De.appendChild(Fe),c.appendChild(De);let $e=document.createElement("div");Object.assign($e.style,{display:"none",gap:"8px",padding:"0"}),c.appendChild($e);let Xe=document.createElement("button");Object.assign(Xe.style,s.buttonBase,{backgroundColor:"#5f6368"}),Xe.textContent="Copiar";let Ke=document.createElement("button");Object.assign(Ke.style,s.buttonBase,{backgroundColor:"#1a73e8"}),Ke.textContent="Preencher",$e.appendChild(Xe),$e.appendChild(Ke);let Qe=document.createElement("div");Object.assign(Qe.style,Ue),Qe.className="no-drag",Qe.title="Redimensionar",g.appendChild(Qe),We(g,Qe),document.body.appendChild(g);function pt(C){e=C;let M=Je();Object.assign(h.style,be),Object.assign(x.style,be),C==="bau"?(Object.assign(h.style,M),O.href="https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657"):(Object.assign(x.style,M),O.href="https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243"),w.value&&w.dispatchEvent(new Event("change"))}function P(C){try{if(Ie&&Ie[n]&&Ie[n][C])return Ie[n][C];if(Ie&&Ie.pt&&Ie.pt[C])return Ie.pt[C]}catch{}return C}function fo(){f.textContent=P("idioma"),j.textContent=P("fluxo"),d.textContent=P("status_principal"),y.textContent=P("substatus"),nt.textContent=P("cenarios_comuns"),Me.textContent=P("selecione_tasks"),dt.textContent=P("preencha_detalhes"),Xe.textContent=P("copiar"),Ke.textContent=P("preencher"),S.querySelector('option[value=""]')&&(S.querySelector('option[value=""]').textContent=P("select_status")),w.querySelector('option[value=""]')&&(w.querySelector('option[value=""]').textContent=P("select_substatus")),F.textContent=P("caso_portugal"),N.textContent=P("sim"),te.textContent=P("nao"),fe.textContent=P("consentiu_gravacao"),se.textContent=P("sim"),Re.textContent=P("nao"),Ne.querySelectorAll("label").forEach(C=>{let M=C.nextElementSibling.id.replace("field-",""),E=P(M.toLowerCase());E!==M.toLowerCase()?C.textContent=E:C.textContent=M.replace(/_/g," ").replace(/\b\w/g,V=>V.toUpperCase())+":"}),ue.textContent="+ "+(n==="pt"?"Gostaria de selecionar uma task?":"Quisiera seleccionar una tarea?")}function ut(C){n=C;let M=Je();Object.assign(T.style,be),Object.assign(q.style,be),C==="pt"?(Object.assign(T.style,M),k.style.display="block",ie(o)):(Object.assign(q.style,M),k.style.display="none",ne.style.display="none"),fo(),w.value&&w.dispatchEvent(new Event("change"))}function mt(C){(C.value.trim()===""||C.value.trim()==="\u2022")&&(C.value="\u2022 "),C.onkeydown=function(M){if(M.key==="Enter"){M.preventDefault();let E=this.selectionStart,V=this.selectionEnd,oe=this.value,le=oe.lastIndexOf(`
`,E-1)+1,xe=oe.substring(le,E),de=xe.trim()==="\u2022"||xe.trim()===""?`
`:`
\u2022 `;this.value=oe.substring(0,E)+de+oe.substring(V),this.selectionStart=this.selectionEnd=E+de.length}else if(M.key==="Backspace"){let E=this.selectionStart;if(E===this.selectionEnd&&E>0){let V=this.value.substring(0,E);V.endsWith(`
\u2022 `)?(M.preventDefault(),this.value=V.substring(0,E-3)+this.value.substring(this.selectionEnd),this.selectionStart=this.selectionEnd=E-3):V==="\u2022 "&&(M.preventDefault(),this.value="",this.selectionStart=this.selectionEnd=0)}}}}function gt(){let C=typeof ve<"u"?ve:document.getElementById("snippet-container");if(!C)return;let M=C.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'),E={},V=new Set;M.forEach(K=>{let W=K.id,D=we[W];if(D)for(let _ in D)_==="linkedTask"?V.add(D.linkedTask):_!=="type"&&(E[_]||(E[_]=[]),E[_].includes(D[_])||E[_].push(D[_]))});let oe=new Set;Object.values(we).forEach(K=>{Object.keys(K).forEach(W=>{W!=="linkedTask"&&W!=="type"&&oe.add(W)})}),oe.forEach(K=>{let W=document.getElementById(K);if(W){let D=E[K]||[],_="";tt.includes(K.replace("field-",""))?(_=D.map($=>$.startsWith("\u2022 ")?$:"\u2022 "+$).join(`
`),_===""?_="\u2022 ":_.endsWith(`
\u2022 `)||(_+=`
\u2022 `)):_=D.join(`

`),_.trim()!=="\u2022"&&_.trim()!==""?W.value=_:tt.includes(K.replace("field-",""))?W.value="\u2022 ":W.value="",W.tagName==="TEXTAREA"&&typeof mt=="function"&&mt(W)}});let le=new Set,xe=new Set;C.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(K=>{let W=we[K.id];W&&W.linkedTask&&(K.checked?le.add(W.linkedTask):xe.add(W.linkedTask))}),xe.forEach(K=>{le.has(K)||l.toggleTask(K,!1)}),le.forEach(K=>{l.toggleTask(K,!0)})}S.onchange=()=>{let C=S.value;if(bt(1.5),w.innerHTML=`<option value="">${P("select_substatus")}</option>`,!C){w.disabled=!0;return}for(let M in et){let E=et[M];if(E.status===C){let V=document.createElement("option");V.value=M,V.textContent=E.name,w.appendChild(V)}}w.disabled=!1},w.onchange=()=>{let C=w.value;if(bt(1.5),!C)return;l.updateSubStatus(C);let M=et[C];ve.innerHTML="";let E=(D,_,$)=>{let re=document.createElement("label");Object.assign(re.style,s.checkboxLabel),re.onmouseover=()=>re.style.backgroundColor="#e8eaed",re.onmouseout=()=>re.style.backgroundColor="#f8f9fa";let ee=document.createElement("input");return ee.type=_,ee.id=D.id,Object.assign(ee.style,s.checkboxInput),re.appendChild(ee),re.appendChild(document.createTextNode(` ${D.text}`)),$.appendChild(re),ee},V=[],oe="radio";if(C==="NI_Awaiting_Inputs")V=[{id:"quickfill-ni-inicio-manual",text:"In\xEDcio 2/6 (Manual)"},{id:"quickfill-ni-cms-access",text:"In\xEDcio 2/6 (ADV sem acesso ao CMS)"},{id:"quickfill-ni-followup-bau",text:"Follow-up 2/6 (BAU)"},{id:"quickfill-ni-followup-lm",text:"Follow-up 2/6 (LM)"}];else if(C.startsWith("SO_"))oe="checkbox",V=[{id:"quickfill-gtm-install",text:"Instala\xE7\xE3o do GTM"},{id:"quickfill-whatsapp",text:"Convers\xE3o de WhatsApp"},{id:"quickfill-form",text:"Convers\xE3o de Formul\xE1rio (Padr\xE3o)"},{id:"quickfill-ecw4-close",text:"Fechamento ECW4 (P\xF3s 7 dias)"}];else if(C.startsWith("AS_")){oe="checkbox";let D=document.createElement("label");D.textContent=P("cenarios_comuns"),Object.assign(D.style,s.label),ve.appendChild(D),V=[{id:"quickfill-as-no-show",text:"Anunciante n\xE3o compareceu (respondeu e-mail)"},{id:"quickfill-as-insufficient-time",text:"Tempo insuficiente"},{id:"quickfill-as-no-access",text:"Anunciante sem acessos necess\xE1rios"}]}else C.startsWith("IN_")?V=[{id:"quickfill-in-nrp-bau",text:"NRP (BAU - 3 tentativas)"},{id:"quickfill-in-nrp-lm",text:"NRP (LM - Sem tentativas)"},{id:"quickfill-in-no-show-bau",text:"No-Show (BAU - 3 tentativas)"},{id:"quickfill-in-2-6-final",text:"Finaliza\xE7\xE3o 2/6 (Sem Resposta)"},{id:"quickfill-in-manual",text:"Outro (Manual)"}]:C.startsWith("DC_")&&(oe="radio",V=[{id:"quickfill-dc-lm-no-access",text:"LM - Sem acessos (Reagendar em BAU)"}]);let le=V.filter(D=>{let _=we[D.id];return!_.type||_.type==="all"||_.type===e});le.forEach((D,_)=>{let $=E(D,oe,ve);oe==="radio"&&($.name="scenario-radio-group",_===0&&($.checked=!0))}),le.length>0&&(Le.style.display="block"),M.requiresTasks?(ue.style.display="none",Me.style.display="block",l.selectionElement.style.display="block",step2Div.style.display="block"):(ue.style.display="block",Me.style.display="none",l.selectionElement.style.display="none",step2Div.style.display="block"),Ne.innerHTML="";let xe=M.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(xe)].forEach(D=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(D))return;let _=D.slice(1,-1),$=document.createElement("label"),re=P(_.toLowerCase());if($.textContent=re!==_.toLowerCase()?re:_.replace(/_/g," ").replace(/\b\w/g,B=>B.toUpperCase())+":",Object.assign($.style,s.label),_==="SPEAKEASY_ID"){let B=document.createElement("button");B.innerHTML='<span style="font-size:12px; margin-right:4px;">\u2728</span>Auto Busca',B.style.cssText=`
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
          `,B.title="Localizar Speakeasy ID no hist\xF3rico",B.onmouseover=()=>{B.style.backgroundColor="#c2e7ff",B.style.boxShadow="0 1px 2px rgba(0,0,0,0.1)"},B.onmouseout=()=>{B.style.backgroundColor="#d3e3fd",B.style.boxShadow="none"},B.onmousedown=()=>{B.style.backgroundColor="#a8c7fa",B.style.transform="scale(0.96)"},B.onmouseup=()=>B.style.transform="scale(1)",B.onclick=me=>{me.preventDefault(),Wt(`field-${_}`)},$.appendChild(B)}let ee;tt.includes(_)?(ee=document.createElement("textarea"),Object.assign(ee.style,s.textarea),ee.classList.add("bullet-textarea"),mt(ee)):St.includes(_)?(ee=document.createElement("textarea"),Object.assign(ee.style,s.textarea)):(ee=document.createElement("input"),ee.type="text",Object.assign(ee.style,s.input),_==="REASON_COMMENTS"&&(C.startsWith("NI_")||C.startsWith("IN_"))&&(Object.assign($.style,{display:"none"}),Object.assign(ee.style,{display:"none"}))),_==="ON_CALL"&&e==="lm"&&(Object.assign($.style,{display:"none"}),Object.assign(ee.style,{display:"none"}),ee.value="N/A"),ee.id=`field-${_}`,Ne.appendChild($),Ne.appendChild(ee)});let K=ve.querySelectorAll('input[type="checkbox"], input[type="radio"]');K.length>0&&(K.forEach(D=>{D.removeEventListener("change",gt),D.addEventListener("change",gt)}),gt()),he.style.display="block",st[C]?De.style.display="block":De.style.display="none",$e.style.display="flex";let W=l.getCheckedElements().map(D=>D.value);a.updateVisibility(C,W)},ue.onclick=()=>{ue.style.display="none",Me.style.display="block",l.selectionElement.style.display="block"};function Nt(){let C=w.value;if(!C)return null;let E=et[C].template.replace(/\n/g,"<br>"),V='style="margin-bottom: 12px; padding-left: 30px;"',oe=[],le="",xe=l.getCheckedElements();xe.length>0&&xe.forEach(W=>{let D=W.value,_=_e[D],$=W.closest().querySelector(".stepper-count"),re=$?parseInt($.textContent):1;re>1?oe.push(`${_.name} (x${re})`):oe.push(_.name)});let de=l.screenshotsElement;if(de){let W=Array.from(de.querySelectorAll('input[id^="name-"]'));W.length>0&&W.forEach(D=>{let _=D.value,$=D.closest(".cw-screen-card");if($){let re=$.querySelectorAll('input[id^="screen-"]'),ee=!1,B="";re.forEach(me=>{let _t=me.closest(".cw-input-group"),Rt=_t?_t.querySelector(".cw-input-label"):null,ho=Rt?Rt.textContent:"Evid\xEAncia",Lt=me.value.trim(),xo=Lt?` ${Lt}`:"";B+=`<li>${ho} -${xo}</li>`,ee=!0}),ee&&(le+=`<b>${_}</b>`,le+=`<ul ${V}>${B}</ul>`)}})}if(E.includes("{TAGS_IMPLEMENTED}")?E=E.replace(/{TAGS_IMPLEMENTED}/g,oe.join(", ")||"N/A"):oe.length>0&&(E+=`<br><b>Tags:</b> ${oe.join(", ")}<br>`),E.includes("{SCREENSHOTS_LIST}")?E=E.replace(/{SCREENSHOTS_LIST}/g,le?`${le}`:"N/A"):le!==""&&(E+=`<br>${le}`),n==="pt"&&o){let W=ye.checked?P("sim"):P("nao");E=E.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${P("consentiu_gravacao")}</b> ${W}<br><br>`),E=E.replace(/{CASO_PORTUGAL}/g,`<br><b>${P("caso_portugal")}</b> ${P("sim")}<br>`)}else n==="pt"&&!o?(E=E.replace(/{CASO_PORTUGAL}/g,`<br><b>${P("caso_portugal")}</b> ${P("nao")}<br>`),E=E.replace(/{CONSENTIU_GRAVACAO}/g,"")):(E=E.replace(/{CASO_PORTUGAL}/g,""),E=E.replace(/{CONSENTIU_GRAVACAO}/g,""));return Ne.querySelectorAll("input, textarea").forEach(W=>{let D=W.id.replace("field-",""),_=new RegExp(`{${D}}`,"g"),$=W.value;if(D==="REASON_COMMENTS"&&(C.startsWith("NI_")||C.startsWith("IN_"))){let B=ve.querySelector('input[type="radio"]:checked');B&&we[B.id]&&($=we[B.id]["field-REASON_COMMENTS"])}if(tt.includes(D)&&$.trim()!==""){let B=$.split(`
`).map(me=>me.trim()).filter(me=>me!==""&&me!=="\u2022").map(me=>me.startsWith("\u2022 ")?me.substring(2):me).map(me=>`<li>${me}</li>`).join("");$=B?`<ul ${V}>${B}</ul>`:""}else St.includes(D)?$=$.split(`
`).filter(B=>B.trim()!=="").map(B=>`<p style="margin: 0 0 8px 0;">${B}</p>`).join(""):W.tagName==="TEXTAREA"&&($=$.replace(/\n/g,"<br>"));let re=$.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(re===""||re==="\u2022"||re.toLowerCase()==="n/a"){let B=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${D}\\}(?:<br>\\s*)?`,"gi");B.test(E)?E=E.replace(B,""):E=E.replace(_,"")}else E=E.replace(_,$.replace(/\$/g,"$$$$"))}),E=E.replace(/{([A-Z0-9_]+)}/g,""),E=E.replace(/(<br>){3,}/g,"<br><br>"),typeof a<"u"&&a.getOutput&&(E+=a.getOutput()),E}Xe.onclick=()=>{let C=Nt();C?(kt(C),J(P("copiado_sucesso"))):J(P("selecione_substatus"),{error:!0})},Ke.onclick=async()=>{let C=w.value,M=Nt();if(!M){J(P("selecione_substatus"),{error:!0});return}kt(M),ft();let E=Ye(),V=await so();if(V)try{if(V.focus(),V.innerHTML.trim()==="<p><br></p>"||V.innerHTML.trim()==="<br>"||V.innerText.trim()===""){let de=document.createRange();de.selectNodeContents(V);let K=window.getSelection();K.removeAllRanges(),K.addRange(de),document.execCommand("delete",!1,null)}else if(!V.innerHTML.endsWith("<br><br>")){let de=document.createRange();de.selectNodeContents(V),de.collapse(!1);let K=window.getSelection();K.removeAllRanges(),K.addRange(de),document.execCommand("insertHTML",!1,"<br><br>")}document.execCommand("insertHTML",!1,M),io(V),setTimeout(()=>{J(P("inserido_copiado"))},600);let le=typeof Ge<"u"&&Ge?Ge.checked:!0;if(C&&st[C]&&le){let de=st[C];await Xt(de),await new Promise(K=>setTimeout(K,500))}E(),bt(1.5),S.value="",w.innerHTML=`<option value="">${P("select_substatus")}</option>`,w.disabled=!0}catch(oe){console.error(oe),J("Erro ao inserir.",{error:!0}),E()}};function bt(C=1.5){C<=1.5&&(Le.style.display="none",ve.innerHTML=""),C<=2&&(step2Div.style.display="none",l.reset(),ue.style.display="none"),C<=3&&(he.style.display="none",Ne.innerHTML="",a.reset(),$e.style.display="none",De.style.display="none")}function ft(){if(i=!i,i){let C=g.querySelector(".cw-expand-btn");C&&typeof C.resetState=="function"&&C.resetState()}Ee(i,g,"cw-btn-notes")}return pt("bau"),ut("pt"),ft}var Ve={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function po(){let t="v4.0.0",e=Object.keys(Ve)[0],n="",o="list",i={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:"#FAFAFA"},s={display:"flex",width:"200%",height:"100%",transition:"transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",transform:"translateX(0)"},a={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},l={width:"100%",padding:"10px 12px 10px 36px",borderRadius:"8px",border:"none",background:"#F0F2F5",fontSize:"14px",color:"#202124",boxSizing:"border-box",outline:"none",transition:"all 0.2s ease",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"10px center"},g={display:"flex",gap:"6px",padding:"4px 4px 8px 4px",overflowX:"auto",scrollbarWidth:"none"},m={padding:"6px 12px",borderRadius:"16px",border:"1px solid transparent",background:"transparent",color:"#5f6368",fontSize:"12px",fontWeight:"500",cursor:"pointer",transition:"all 0.2s ease",flexShrink:"0"},u={background:"#E8F0FE",color:"#1967D2",fontWeight:"600"},c={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",marginBottom:"6px",borderRadius:"8px",background:"#fff",border:"1px solid #dadce0",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",position:"relative",overflow:"hidden"},v=!1,b=document.createElement("div");b.id="quick-email-popup",b.classList.add("cw-module-window"),Object.assign(b.style,Ae,{right:"100px",width:"480px",height:"600px",transition:"width 0.3s ease, height 0.3s ease"});let f={popup:b,googleLine:null,focusElement:null};function A(){v=!v,Ee(v,b,"cw-btn-email"),v||setTimeout(()=>O(),300)}let T=Ce(b,"Emails R\xE1pidos",t,"Selecione, visualize e insira com um clique.",f,()=>A()),q=document.createElement("div");Object.assign(q.style,i);let R=document.createElement("div");Object.assign(R.style,s);let j=document.createElement("div");Object.assign(j.style,a);let U=document.createElement("div");Object.assign(U.style,{padding:"16px 16px 4px 16px",flexShrink:"0",background:"#fff",zIndex:"10",display:"flex",flexDirection:"column",gap:"8px",borderBottom:"1px solid #f1f3f4"});let h=document.createElement("input");h.placeholder="Buscar template...",Object.assign(h.style,l),h.onfocus=()=>{h.style.background="#fff",h.style.boxShadow="0 2px 8px rgba(0,0,0,0.05)"},h.onblur=()=>{h.style.background="#F0F2F5",h.style.boxShadow="none"},f.focusElement=h;let x=document.createElement("div");Object.assign(x.style,g);let r=document.createElement("div");Object.assign(r.style,{padding:"12px 16px",overflowY:"auto",flexGrow:"1"}),U.appendChild(h),U.appendChild(x),j.appendChild(U),j.appendChild(r);let d=document.createElement("div");Object.assign(d.style,a);let S=document.createElement("div");Object.assign(S.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),d.appendChild(S),R.appendChild(j),R.appendChild(d),q.appendChild(R),b.appendChild(T),b.appendChild(q);let p=document.createElement("div");Object.assign(p.style,{padding:"8px 16px",borderTop:"1px solid #eee",textAlign:"center",fontSize:"10px",color:"#9aa0a6",background:"#fff",flexShrink:"0"}),p.textContent="created by lucaste@",b.appendChild(p),document.body.appendChild(b);function y(F){o="detail",R.style.transform="translateX(-50%)";let L='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',I='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';S.innerHTML=`
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
      `;let z=S.querySelector("#csa-back-btn");z.onmouseover=()=>z.style.backgroundColor="#f1f3f4",z.onmouseout=()=>z.style.backgroundColor="transparent",z.onclick=O;let N=S.querySelector("#csa-insert-btn");N.onmouseover=()=>N.style.backgroundColor="#174ea6",N.onmouseout=()=>N.style.backgroundColor="#1a73e8",N.onclick=async()=>{console.log("\u{1F50D} DEBUG: Clique detectado"),console.log("\u{1F50D} DEBUG: triggerProcessingAnimation \xE9:",typeof Ye),N.style.transform="scale(0.96)",A(),console.log("\u{1F50D} DEBUG: Janela fechada");try{console.log("\u{1F50D} DEBUG: Chamando anima\xE7\xE3o...");let Y=Ye();console.log("\u{1F50D} DEBUG: finishLoading \xE9:",typeof Y),console.log("\u{1F50D} DEBUG: Iniciando espera de 1s..."),await new Promise(X=>setTimeout(X,1e3)),console.log("\u{1F50D} DEBUG: Rodando l\xF3gica do email..."),await Ct(F),console.log("\u{1F50D} DEBUG: Finalizando anima\xE7\xE3o..."),typeof Y=="function"?Y():console.error("\u274C ERRO: finishLoading n\xE3o \xE9 uma fun\xE7\xE3o! A anima\xE7\xE3o falhou ao iniciar.")}catch(Y){console.error("\u274C ERRO NO PROCESSO:",Y);let X=document.querySelector(".cw-focus-backdrop");X&&X.classList.remove("active")}setTimeout(()=>{N.style.transform="scale(1)",typeof O=="function"&&O()},300)}}function O(){o="list",R.style.transform="translateX(0)"}function w(){x.innerHTML="",Object.keys(Ve).forEach(F=>{let L=Ve[F],I=document.createElement("button");I.textContent=L.title,Object.assign(I.style,m),e===F&&n===""&&Object.assign(I.style,u),I.onclick=()=>{e=F,n="",h.value="",w(),k()},x.appendChild(I)})}function k(){r.innerHTML="";let F=[];if(n.trim()!==""?Object.values(Ve).forEach(z=>{let N=z.emails.filter(Y=>Y.name.toLowerCase().includes(n.toLowerCase()));F=[...F,...N]}):Ve[e]&&(F=Ve[e].emails),F.length===0){r.innerHTML='<div style="text-align:center; padding:60px 20px; color:#9aa0a6;"><div style="font-size:24px; margin-bottom:8px;">\u{1F50D}</div><div style="font-size:14px;">Nenhum template encontrado.</div></div>';return}let L='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>',I='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';F.forEach(z=>{let N=document.createElement("div");Object.assign(N.style,c);let Y=z.subject.length>50?z.subject.substring(0,50)+"...":z.subject;N.innerHTML=`
        <div style="flex-grow: 1; margin-right: 12px; min-width: 0;">
            <div style="font-size:13px; font-weight:600; color:#202124; margin-bottom:2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${z.name}</div>
            <div style="font-size:12px; color:#5f6368; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${Y}</div>
        </div>
        <div style="display:flex; gap:6px;">
            <button class="action-btn view" title="Visualizar" style="width:32px; height:32px; border-radius:50%; border:none; background:#f1f3f4; color:#5f6368; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">${I}</button>
            <button class="action-btn send" title="Inserir Agora" style="width:32px; height:32px; border-radius:50%; border:none; background:#e8f0fe; color:#1a73e8; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">${L}</button>
        </div>
      `,N.onmouseenter=()=>{N.style.background="#F8F9FA",N.style.borderColor="#1a73e8"},N.onmouseleave=()=>{N.style.background="#fff",N.style.borderColor="#dadce0"};let X=N.querySelector(".view");X.onclick=ie=>{ie.stopPropagation(),y(z)},X.onmouseenter=()=>{X.style.background="#d2e3fc",X.style.color="#174ea6"},X.onmouseleave=()=>{X.style.background="#f1f3f4",X.style.color="#5f6368"};let te=N.querySelector(".send");te.onclick=async ie=>{ie.stopPropagation(),te.style.transform="scale(0.9)",setTimeout(()=>te.style.transform="scale(1)",150),A();let ne=Ye();try{await new Promise(fe=>setTimeout(fe,800)),await Ct(z),ne()}catch(fe){console.error("Erro no envio r\xE1pido:",fe),ne()}},te.onmouseenter=()=>{te.style.background="#1a73e8",te.style.color="#fff",te.style.boxShadow="0 2px 6px rgba(26,115,232,0.3)"},te.onmouseleave=()=>{te.style.background="#e8f0fe",te.style.color="#1a73e8",te.style.boxShadow="none"},N.onclick=()=>y(z),r.appendChild(N)})}return h.addEventListener("input",F=>{n=F.target.value,n!==""?Array.from(x.children).forEach(L=>Object.assign(L.style,m)):w(),k()}),w(),k(),A}var uo={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function mo(){let t="v2.1 (Apple Motion)",e={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#f8f9fa",scrollBehavior:"smooth"},card:{background:"#ffffff",border:"1px solid #dadce0",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"13px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"10px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.15s ease, opacity 0.3s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.5",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"20px",height:"20px",borderRadius:"6px",border:"2px solid #dadce0",marginRight:"14px",marginTop:"1px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #eee",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"}},n={},o="PT",i="BAU",s=!1,a=document.createElement("div");a.id="call-script-popup",a.classList.add("cw-module-window"),Object.assign(a.style,Ae,{right:"auto",left:"50%",width:"400px",height:"650px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let l={popup:a,googleLine:null};function g(){s=!s,Ee(s,a,"cw-btn-script")}let m=Ce(a,"Call Script",t,"Guia interativo para condu\xE7\xE3o de chamadas.",l,()=>{g()});a.appendChild(m);let u=document.createElement("div");Object.assign(u.style,e.progressBarContainer);let c=document.createElement("div");Object.assign(c.style,e.progressBarFill),u.appendChild(c),a.appendChild(u);let v=document.createElement("div");v.id="csa-content",Object.assign(v.style,e.contentArea),a.appendChild(v);let b=document.createElement("div");Object.assign(b.style,e.footer);let f=document.createElement("span");f.textContent="by lucaste@",Object.assign(f.style,{fontSize:"10px",color:"#bdc1c6"});let A=document.createElement("button");A.innerHTML=`
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
    Resetar Script
  `,Object.assign(A.style,e.resetBtn),A.onmouseenter=()=>A.style.background="#fce8e6",A.onmouseleave=()=>A.style.background="transparent",A.onclick=()=>{A.style.transform="scale(0.9)",setTimeout(()=>A.style.transform="scale(1)",150);for(let O in n)delete n[O];d()},b.appendChild(f),b.appendChild(A),a.appendChild(b);let T=document.createElement("div");Object.assign(T.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let q=document.createElement("div");Object.assign(q.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let R=document.createElement("div");R.textContent="BAU";let j=document.createElement("div");j.textContent="LT",Object.assign(R.style,be),Object.assign(j.style,be),q.appendChild(R),q.appendChild(j);let U=document.createElement("select");Object.assign(U.style,Pt,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),U.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',U.value=o,T.appendChild(q),T.appendChild(U),v.appendChild(T);let h=document.createElement("div");h.id="csa-checklist-area",v.appendChild(h);let x=document.createElement("div");Object.assign(x.style,Ue),x.className="no-drag",x.title="Redimensionar",a.appendChild(x),We(a,x),document.body.appendChild(a);function r(O){return O}function d(){h.innerHTML="";let O=`${o} ${i}`,w=uo[O];if(!w){h.innerHTML=`<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <div style="font-size: 24px;">\u2615</div>
        <div>Script n\xE3o configurado.</div>
      </div>`,c.style.width="0%";return}let k=w.color||"#1a73e8",F=0,L=0;["inicio","fim"].forEach(I=>{w[I]&&(F+=w[I].length)}),["inicio","fim"].forEach((I,z)=>{let N=w[I];if(!N||N.length===0)return;let Y=document.createElement("div");Object.assign(Y.style,e.card);let X=document.createElement("div");Object.assign(X.style,e.cardTitle);let te=I==="inicio"?"Abertura":"Fechamento";o.includes("ES")&&(te=I==="inicio"?"Apertura":"Cierre"),o.includes("EN")&&(te=I==="inicio"?"Opening":"Closing"),X.textContent=te;let ie=document.createElement("span");ie.style.fontSize="11px",ie.style.opacity="0.7",ie.style.fontWeight="500",ie.style.background="#f1f3f4",ie.style.padding="2px 8px",ie.style.borderRadius="10px",X.appendChild(ie),Y.appendChild(X);let ne=0;N.forEach((fe,ce)=>{let ge=`${O}-${I}-${ce}`,ye=!!n[ge];ye&&(L++,ne++);let se=document.createElement("div");Object.assign(se.style,e.itemRow);let Z=document.createElement("div");Object.assign(Z.style,e.checkbox);let ke=document.createElement("span");ke.innerHTML=fe,ke.style.flex="1",ye?(Object.assign(se.style,e.itemCompleted),Z.style.background=k,Z.style.borderColor=k,Z.style.transform="scale(1)",Z.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(se.style.textDecoration="none",se.style.opacity="1",Z.style.background="transparent",Z.style.borderColor="#dadce0",Z.style.transform="scale(1)",Z.innerHTML=""),se.onclick=()=>{let Re=!n[ge];n[ge]=Re,Q.playClick(),Re?(Z.style.transform="scale(1.2)",setTimeout(()=>Z.style.transform="scale(1)",150),Object.assign(se.style,e.itemCompleted),Z.style.background=k,Z.style.borderColor=k,Z.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(se.style.textDecoration="none",se.style.opacity="1",Z.style.background="transparent",Z.style.borderColor="#dadce0",Z.innerHTML=""),S(O,w)},se.onmouseenter=()=>{n[ge]||(se.style.background="#f1f3f4",Z.style.borderColor=k)},se.onmouseleave=()=>{n[ge]||(se.style.background="transparent",Z.style.borderColor="#dadce0")},se.appendChild(Z),se.appendChild(ke),Y.appendChild(se)}),ne===N.length&&N.length>0&&(ie.style.color="#1e8e3e",ie.style.background="#e6f4ea",Y.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),ie.textContent=`${ne}/${N.length}`,h.appendChild(Y)}),p(F,L)}function S(O,w){let k=0,F=0;["inicio","fim"].forEach(L=>{let I=w[L]||[];k+=I.length;let z=0;I.forEach((N,Y)=>{n[`${O}-${L}-${Y}`]&&(F++,z++)})}),p(k,F),setTimeout(()=>d(),200)}function p(O,w){let k=O===0?0:w/O*100;c.style.width=`${k}%`,k===100?c.style.background="#34A853":c.style.background="linear-gradient(90deg, #4285F4, #34A853)"}function y(O){i=O;let w=Je();Object.assign(R.style,be),Object.assign(j.style,be),Object.assign(O==="BAU"?R.style:j.style,w),d()}return R.onclick=()=>y("BAU"),j.onclick=()=>y("LT"),U.addEventListener("change",O=>{o=O.target.value,d()}),y(i),g}var ct={lm:{label:"LM Forms",links:[{name:"Relat\xF3rio de Ocorr\xEAncias",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas operacionais | Aviso de pausas"},{name:"Chamadas Excedidas (>50min)",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro de chamadas longas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema/ferramenta"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"Enviar casos para BAU/Solicitar Descarte/Abrir Monitoria para AMs"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo dos Anunciantes"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos complicados de atender"}]},suporte:{label:"Central de Ajuda",links:[{name:"Suporte Google Ads",url:"https://support.google.com/google-ads/",desc:"Oficial"},{name:"Suporte GA4",url:"https://support.google.com/analytics/",desc:"Oficial"},{name:"Suporte Merchant Center",url:"https://support.google.com/merchants/gethelp",desc:"Oficial"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. oficial sobre CSP"},{name:"Doc. Enhanced Conversion",url:"https://support.google.com/google-ads/answer/9888656?hl=en",desc:"Como funcionam as convers\xF5es otimizadas?"},{name:"Doc. CoMo",url:"https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=pt-br",desc:"Doc. oficial sobre Consent Mode"}]},outros:{label:"Diversos",links:[{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form para solicitar grava\xE7\xE3o da chamada."}]}};function go(){let t="v2.4.5",e="lm",n="",o={width:"100%",padding:"10px 12px 10px 36px",borderRadius:"8px",border:"1px solid #dadce0",background:"#f8f9fa",fontSize:"14px",boxSizing:"border-box",outline:"none",color:"#3c4043",transition:"background 0.2s, border-color 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"10px center"},i={display:"flex",flexWrap:"wrap",gap:"8px",paddingBottom:"8px"},s={padding:"6px 16px",borderRadius:"16px",border:"1px solid #dadce0",background:"transparent",color:"#5f6368",fontSize:"13px",fontWeight:"500",cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s ease",marginBottom:"4px"},a={background:"#e8f0fe",color:"#1967d2",borderColor:"#e8f0fe",fontWeight:"600"},l={display:"flex",alignItems:"center",padding:"10px 14px",borderRadius:"12px",cursor:"pointer",border:"1px solid transparent",marginBottom:"6px",background:"#ffffff",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), background 0.2s",boxShadow:"0 1px 2px rgba(0,0,0,0.02)",opacity:"0",transform:"translateY(10px)"},g={width:"36px",height:"36px",borderRadius:"10px",background:"#f1f3f4",color:"#5f6368",display:"flex",alignItems:"center",justifyContent:"center",marginRight:"14px",fontSize:"18px",flexShrink:"0"},m=document.createElement("div");m.id="feedback-popup",m.classList.add("cw-module-window"),Object.assign(m.style,Ae,{right:"100px",width:"500px"});let u={lm:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>',outros:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c-1.49 0-2.61 1.12-2.61 2.5s1.12 2.5 2.61 2.5H2v4c0 1.1.9 2 2 2h4v1.5c0 1.49 1.12 2.61 2.5 2.61s2.5-1.12 2.5-2.61V19h4c1.1 0 2-.9 2-2v-4h1.5c1.49 0 2.61-1.12 2.61-2.5S21.99 11 20.5 11z"/></svg>'},c={popup:m,googleLine:null,focusElement:null},v=!1,b=Ce(m,"Links \xDAteis",t,"Acesso r\xE1pido a formul\xE1rios internos (Ocorr\xEAncias, Bugs) e documenta\xE7\xF5es oficiais de suporte.",c,()=>h());m.appendChild(b);let f=document.createElement("div");Object.assign(f.style,{padding:"16px",display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid #f1f3f4",flexShrink:"0",backgroundColor:"#fff"});let A=document.createElement("input");A.type="text",A.placeholder="Buscar link, form ou ajuda...",Object.assign(A.style,o),c.focusElement=A,A.onfocus=()=>{A.style.borderColor="#1a73e8",A.style.backgroundColor="#fff"},A.onblur=()=>{A.style.borderColor="#dadce0",A.style.backgroundColor="#f8f9fa"};let T=document.createElement("div");Object.assign(T.style,i),f.appendChild(A),f.appendChild(T),m.appendChild(f);let q=document.createElement("div");Object.assign(q.style,{padding:"0 8px 8px 8px",overflowY:"auto",flexGrow:"1"}),m.appendChild(q);let R=document.createElement("div");Object.assign(R.style,{padding:"8px 16px",borderTop:"1px solid #eee",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"10px",color:"#9aa0a6"}),R.innerHTML="<span>by lucaste@</span>",m.appendChild(R),document.body.appendChild(m);function j(){T.innerHTML="",Object.keys(ct).forEach(x=>{let r=ct[x],d=document.createElement("button"),S=u[x]||"";d.innerHTML=`
        <span style="display:inline-flex; align-items:center; margin-right:6px; vertical-align:middle;">
            ${S}
        </span> 
        ${r.label}
      `,Object.assign(d.style,s),d.style.display="inline-flex",d.style.alignItems="center",e===x&&n===""&&Object.assign(d.style,a),d.onmousedown=()=>d.style.transform="scale(0.95)",d.onmouseup=()=>d.style.transform="scale(1)",d.onmouseleave=()=>d.style.transform="scale(1)",d.onclick=()=>{e=x,n="",A.value="",j(),U()},T.appendChild(d)})}function U(){q.innerHTML="";let x=[],r=n.trim()!=="";if(r?Object.entries(ct).forEach(([d,S])=>{let p=S.links.filter(y=>y.name.toLowerCase().includes(n.toLowerCase())||y.desc.toLowerCase().includes(n.toLowerCase()));p.forEach(y=>{y._catIcon=u[d],y._categoryName=S.label}),x=[...x,...p]}):(x=ct[e].links,x.forEach(d=>d._catIcon=u[e])),x.length===0){q.innerHTML=`
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px; opacity:0.6;">
            <div style="font-size:32px; margin-bottom:10px;">\u{1F50D}</div>
            <div style="font-size:13px; color:#5f6368;">Nenhum link encontrado.</div>
        </div>`;return}x.forEach((d,S)=>{let p=document.createElement("div");Object.assign(p.style,l);let y=document.createElement("div");Object.assign(y.style,g),y.innerHTML=d._catIcon||'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',y.style.display="flex",y.style.alignItems="center",y.style.justifyContent="center",y.style.color="#5f6368",p.appendChild(y);let O=document.createElement("div");O.style.flexGrow="1";let w=N=>{if(!r)return N;let Y=new RegExp(`(${n})`,"gi");return N.replace(Y,'<span style="color:#1a73e8; font-weight:700;">$1</span>')},k=`<div style="font-size:14px; font-weight:500; color:#202124;">${w(d.name)}</div>`,F=`<div style="font-size:11px; color:#5f6368; margin-top:2px;">${w(d.desc)}</div>`;O.innerHTML=k+F,p.appendChild(O);let L=document.createElement("div");L.style.display="flex",L.style.gap="4px",L.style.opacity="0",L.style.transition="opacity 0.2s";let I=document.createElement("div");I.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',Object.assign(I.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#5f6368",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"}),I.onclick=N=>{Q.playClick(),N.stopPropagation(),navigator.clipboard.writeText(d.url),I.style.transform="scale(1.2)",I.style.color="#1e8e3e",I.style.backgroundColor="#e6f4ea",setTimeout(()=>{I.style.transform="scale(1)",I.style.color="#5f6368",I.style.backgroundColor="transparent"},800)},I.onmouseenter=()=>I.style.backgroundColor="#f1f3f4",I.onmouseleave=()=>I.style.backgroundColor="transparent",L.appendChild(I);let z=document.createElement("div");z.innerHTML="\u2197",Object.assign(z.style,{width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",color:"#dadce0",fontSize:"16px"}),L.appendChild(z),p.appendChild(L),p.onclick=()=>window.open(d.url,"_blank"),p.onmouseenter=()=>{p.style.backgroundColor="#f8f9fa",p.style.transform="scale(1.01)",L.style.opacity="1",z.style.color="#1a73e8"},p.onmouseleave=()=>{p.style.backgroundColor="#ffffff",p.style.transform="scale(1)",L.style.opacity="0",z.style.color="#dadce0"},q.appendChild(p),requestAnimationFrame(()=>{p.style.transition="opacity 0.3s ease, transform 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.2)",setTimeout(()=>{p.style.opacity="1",p.style.transform="translateY(0)"},S*40)})})}A.addEventListener("input",x=>{n=x.target.value,n!==""?Array.from(T.children).forEach(r=>{r.style.backgroundColor="transparent",r.style.color="#5f6368",r.style.borderColor="#dadce0"}):j(),U()});function h(){v=!v,Ee(v,m,"cw-btn-links")}return j(),U(),h}var He=[];function qt(t){He=t}function bo(){let t="v2.5 (Emoji Fix)",e=!1,n=null,o=60*1e3;function i(r){if(!r)return"";try{let d=new Date(r);return isNaN(d.getTime())?String(r):d.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(r)}}let s={critical:{bg:"#FEF2F2",border:"#FECACA",text:"#991B1B",icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>'},info:{bg:"#EFF6FF",border:"#BFDBFE",text:"#1E40AF",icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{bg:"#F0FDF4",border:"#BBF7D0",text:"#166534",icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}},a={feedContainer:{padding:"24px",overflowY:"auto",flexGrow:"1",background:"#FAFAFA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.06)",boxShadow:"0 4px 12px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.02)",overflow:"hidden",transition:"all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.04)",boxShadow:"none",opacity:"0.8",filter:"grayscale(0.3)",marginBottom:"16px",flexShrink:"0"},cardHeader:{padding:"12px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(0,0,0,0.04)",fontSize:"12px",fontWeight:"600",letterSpacing:"0.5px",textTransform:"uppercase"},msgTitle:{padding:"20px 20px 8px 20px",fontSize:"16px",fontWeight:"700",color:"#202124",letterSpacing:"-0.01em",lineHeight:"1.4"},metaContainer:{padding:"0 20px 12px 20px",display:"flex",alignItems:"center",gap:"8px",fontSize:"12px",color:"#5f6368"},cardBody:{padding:"0 20px 24px 20px",fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",fontFamily:"'Google Sans', Roboto, sans-serif",wordBreak:"break-word",overflowWrap:"break-word"},emojiImg:"height: 20px; vertical-align: text-bottom; margin: 0 2px;",dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},markAllBtn:{fontSize:"12px",color:"#1a73e8",cursor:"pointer",fontWeight:"600",background:"transparent",border:"none",padding:"8px",transition:"opacity 0.2s"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 0",color:"#bdc1c6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"10px 0 20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"10px",borderRadius:"8px",transition:"background 0.2s"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",paddingTop:"10px",borderTop:"1px dashed rgba(0,0,0,0.1)"}},l="cw-scrollbar-style";if(!document.getElementById(l)){let r=document.createElement("style");r.id=l,r.innerHTML=".cw-nice-scroll::-webkit-scrollbar { width: 5px; } .cw-nice-scroll::-webkit-scrollbar-track { background: transparent; } .cw-nice-scroll::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 10px; }",document.head.appendChild(r)}function g(r){if(!r||typeof r!="string")return"";let d=r,S=/(https?:\/\/[^\s]+)|(www\.[^\s]+)/g;return d=d.replace(S,p=>{let y=p;return y.startsWith("http")||(y="http://"+y),`<a href="${y}" target="_blank" style="color:#1967d2; text-decoration:underline;">${p}</a>`}),d=d.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),d=d.replace(/_(.*?)_/g,"<i>$1</i>"),d=d.replace(/\n/g,"<br>"),d=Ht(d),d=d.replace(/@todos|@all/gi,'<span style="background:#e8f0fe; color:#1967d2; padding:1px 5px; border-radius:4px; font-weight:600; font-size:12px;">@todos</span>'),d}let m=document.createElement("div");m.id="broadcast-popup",m.classList.add("cw-module-window"),Object.assign(m.style,Ae,{right:"auto",left:"50%",width:"450px",height:"650px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let u={popup:m,googleLine:null};function c(){if(e=!e,Ee(e,m,"cw-btn-broadcast"),e){let r=document.getElementById("cw-btn-broadcast");r&&r.classList.remove("has-new"),A()}}let v=Ce(m,"Operations Feed",t,"Atualiza\xE7\xF5es oficiais da opera\xE7\xE3o.",u,()=>c()),b=v.querySelector(".cw-header-actions")||v.lastElementChild;if(b){let r=document.createElement("button");r.textContent="Limpar tudo",Object.assign(r.style,a.markAllBtn),r.onclick=d=>{d.stopPropagation(),Q.playSuccess();let S=He.map(p=>p.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(S)),R(),T()},b.insertBefore(r,b.firstChild)}m.appendChild(v);let f=document.createElement("div");f.className="cw-nice-scroll",Object.assign(f.style,a.feedContainer),m.appendChild(f);async function A(){let r=document.getElementById("cw-update-status");e&&(r||(r=document.createElement("div"),r.id="cw-update-status",r.style.cssText="padding: 6px; text-align: center; font-size: 11px; color: #5f6368; background: #f8f9fa; border-bottom: 1px solid #e0e0e0;",f.parentNode.insertBefore(r,f)),r.innerHTML="\u23F3 Verificando atualiza\xE7\xF5es...",r.style.display="block");let d=He.map(p=>p.id),S=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");try{let p=await je.fetchData();p&&p.broadcast&&(e&&r&&(p.broadcast.some(O=>!d.includes(O.id))?(r.innerHTML="\u2705 Novos avisos sincronizados!",r.style.backgroundColor="#e6f4ea",r.style.color="#137333"):r.innerHTML="\u{1F539} Tudo atualizado.",setTimeout(()=>{r&&(r.style.display="none")},1500)),d.length>0&&p.broadcast.filter(w=>!d.includes(w.id)).filter(w=>!S.includes(w.id)).length>0&&(console.log("\u{1F514} Novo aviso detectado! Tocando som."),Q.playNotification()),qt(p.broadcast),T(),e&&R())}catch(p){console.error("Erro no update:",p),e&&r&&(r.innerHTML="\u26A0\uFE0F Falha na conex\xE3o.",r.style.backgroundColor="#fce8e6")}}function T(){let r=document.getElementById("cw-btn-broadcast");if(!r)return;let d=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(He.some(p=>!d.includes(p.id))){if(r.classList.add("has-new"),!r.querySelector(".cw-badge")){let p=document.createElement("div");p.className="cw-badge",Object.assign(p.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),r.appendChild(p)}}else{r.classList.remove("has-new");let p=r.querySelector(".cw-badge");p&&p.remove()}}let q=je.getCachedBroadcasts();q.length>0&&(qt(q),R()),A(),n||(n=setInterval(A,o));function R(){f.innerHTML="";let r=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),d=[...He].sort((y,O)=>{let w=r.includes(y.id),k=r.includes(O.id);return w===k?0:w?1:-1});if(d.every(y=>r.includes(y.id))){let y=document.createElement("div");Object.assign(y.style,a.emptyState),y.innerHTML=`
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#dadce0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Voc\xEA est\xE1 em dia!</div>
            <div style="font-size:12px;">Nenhum aviso pendente.</div>
           `,f.appendChild(y)}let S=d.filter(y=>!r.includes(y.id)),p=d.filter(y=>r.includes(y.id));if(S.forEach(y=>f.appendChild(j(y,!1))),p.length>0){let y=document.createElement("div");Object.assign(y.style,a.historyDivider),y.innerHTML=`<span>Visualizar ${p.length} avisos anteriores</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 0.3s"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let O=document.createElement("div");Object.assign(O.style,a.historyContainer),p.forEach(k=>O.appendChild(j(k,!0)));let w=!1;y.onclick=()=>{Q.playClick(),w=!w,O.style.display=w?"flex":"none",y.querySelector("svg").style.transform=w?"rotate(180deg)":"rotate(0deg)",y.querySelector("span").textContent=w?"Ocultar hist\xF3rico":`Visualizar ${p.length} avisos anteriores`},f.appendChild(y),f.appendChild(O)}}function j(r,d){let S=document.createElement("div");Object.assign(S.style,d?a.cardHistory:a.card);let p=s[r.type]||s.info,y=document.createElement("div");Object.assign(y.style,a.cardHeader,{background:p.bg,color:p.text,borderBottom:`1px solid ${p.border}`});let O=document.createElement("div");if(Object.assign(O.style,{display:"flex",alignItems:"center",gap:"6px"}),O.innerHTML=`${p.icon} <span>${r.type.toUpperCase()}</span>`,y.appendChild(O),d){let k=document.createElement("span");k.textContent=i(r.date),k.style.opacity="0.7",y.appendChild(k)}else{let k=document.createElement("button");k.title="Marcar como lido",Object.assign(k.style,a.dismissBtn),k.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',k.onmouseenter=()=>{k.style.color="#1e8e3e",k.style.background="#e6f4ea",k.style.borderColor="#1e8e3e"},k.onmouseleave=()=>{k.style.color="#5f6368",k.style.background="#fff",k.style.borderColor="rgba(0,0,0,0.1)"},k.onclick=F=>{F.stopPropagation(),Q.playClick(),S.style.transform="translateX(20px)",S.style.opacity="0",setTimeout(()=>{let L=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");L.push(r.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(L)),R(),T()},250)},y.appendChild(k)}if(S.appendChild(y),r.title){let k=document.createElement("div");Object.assign(k.style,a.msgTitle),k.textContent=r.title,S.appendChild(k)}if(!d){let k=document.createElement("div");Object.assign(k.style,a.metaContainer),k.innerHTML=`<span style="font-weight:600">${r.author}</span> \u2022 <span>${i(r.date)}</span>`,S.appendChild(k)}let w=document.createElement("div");return Object.assign(w.style,a.cardBody),w.innerHTML=g(r.text),S.appendChild(w),S}R();let U=document.createElement("div");Object.assign(U.style,Ue),U.className="no-drag",m.appendChild(U),We(m,U),document.body.appendChild(m);let h=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),x=He.some(r=>!h.includes(r.id));return{toggle:c,hasUnread:x}}function qo(){if(window.techSolInitialized){wt();return}window.techSolInitialized=!0,console.log("\u{1F680} TechSol Suite Initializing...");try{Bt();try{Q.initGlobalListeners(),Q.playStartup()}catch(s){console.warn("\xC1udio n\xE3o p\xF4de ser iniciado automaticamente:",s)}je.fetchTips(),wt();let t=co(),e=po(),n=mo(),o=go(),i=bo();to({toggleNotes:t,toggleEmail:e,toggleScript:n,toggleLinks:o,broadcastControl:i})}catch(t){console.error("Erro fatal na inicializa\xE7\xE3o:",t),J("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}qo();})();
