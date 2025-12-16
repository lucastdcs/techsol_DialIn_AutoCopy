(()=>{var at="",vo=t=>new Promise(e=>setTimeout(e,t));async function Dt(){if(at)return at;try{let t=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!t)return"Agente";t.click(),await vo(100);let e="Consultor",n=document.querySelector("profile-details .name");if(n)e=n.textContent.trim().split(" ")[0],e=e.charAt(0).toUpperCase()+e.slice(1).toLowerCase();else{let o=document.querySelector("profile-details img");if(o&&o.src.includes("/photos/")){let i=o.src.match(/\/photos\/([^\?]+)/)[1];e=i.charAt(0).toUpperCase()+i.slice(1)}}return t.click(),document.body.click(),at=e,e}catch(t){return console.warn("Sherlock falhou:",t),"Consultor"}}function ht(){return at||"Consultor"}function Ft(t){let e=new Date,n=e.getHours(),o=e.getDay(),i="Ol\xE1",r="";n>=5&&n<12?(i="Bom dia",r='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):n>=12&&n<18?(i="Boa tarde",r='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(i="Boa noite",r='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let a=[];n>=0&&n<5?a=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:n<12?o===1?a=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:o===5?a=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:a=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:n<18?a=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:a=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(o===0||o===6)&&(a=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let l=a[Math.floor(Math.random()*a.length)];return{prefix:`${i},`,name:t,suffix:l,icon:r,isFriday:o===5}}function xt(){let t="Cliente",e="[INSERIR URL]";try{let o=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(o&&o.nextElementSibling){let i=o.nextElementSibling.innerText.trim();i&&(t=i)}}catch(n){console.warn("Falha ao capturar Nome:",n)}try{let o=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(o&&o.nextElementSibling){let i=o.nextElementSibling.innerText.trim();i&&(e=i)}}catch(n){console.warn("Falha ao capturar Website:",n)}return{advertiserName:t,websiteUrl:e,agentName:ht()}}var je=null,yt=null,qe=.3;function Be(){if(!je){let t=window.AudioContext||window.webkitAudioContext;t&&(je=new t)}return je&&je.state==="suspended"&&je.resume(),je}function Gt(t){if(yt)return yt;let e=t.sampleRate*2,n=t.createBuffer(1,e,t.sampleRate),o=n.getChannelData(0);for(let i=0;i<e;i++)o[i]=Math.random()*2-1;return yt=n,n}var Q={playClick:()=>{let t=Be();if(!t)return;let e=t.currentTime,n=t.createBufferSource();n.buffer=Gt(t);let o=t.createBiquadFilter();o.type="highpass",o.frequency.value=4e3;let i=t.createGain();i.gain.setValueAtTime(qe*.8,e),i.gain.exponentialRampToValueAtTime(.001,e+.015),n.connect(o),o.connect(i),i.connect(t.destination),n.start(e),n.stop(e+.02)},playHover:()=>{let t=Be();if(!t)return;let e=t.currentTime,n=t.createOscillator();n.type="sine",n.frequency.setValueAtTime(400,e);let o=t.createGain();o.gain.setValueAtTime(0,e),o.gain.linearRampToValueAtTime(qe*.1,e+.005),o.gain.linearRampToValueAtTime(0,e+.02),n.connect(o),o.connect(t.destination),n.start(e),n.stop(e+.03)},playSuccess:()=>{let t=Be();if(!t)return;let e=t.currentTime;[1046.5,1567.9].forEach((o,i)=>{let r=t.createOscillator(),a=t.createGain();r.type="sine",r.frequency.value=o,a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(qe*.6,e+.05),a.gain.exponentialRampToValueAtTime(.001,e+.6),r.connect(a),a.connect(t.destination),r.start(e),r.stop(e+.7)})},playGenieOpen:()=>{let t=Be();if(!t)return;let e=t.currentTime,n=t.createBufferSource();n.buffer=Gt(t);let o=t.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(100,e),o.frequency.exponentialRampToValueAtTime(800,e+.2);let i=t.createGain();i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(qe*.5,e+.05),i.gain.linearRampToValueAtTime(0,e+.25),n.connect(o),o.connect(i),i.connect(t.destination),n.start(e),n.stop(e+.3)},playError:()=>{let t=Be();if(!t)return;let e=t.currentTime,n=t.createOscillator(),o=t.createGain();n.type="triangle",n.frequency.setValueAtTime(120,e),n.frequency.exponentialRampToValueAtTime(80,e+.1),o.gain.setValueAtTime(qe,e),o.gain.exponentialRampToValueAtTime(.001,e+.15),n.connect(o),o.connect(t.destination),n.start(e),n.stop(e+.2)},playStartup:()=>{let t=Be();if(!t)return;let e=t.currentTime,n=.12,o=t.createOscillator(),i=t.createGain(),r=t.createBiquadFilter();o.type="square",o.frequency.setValueAtTime(400,e),o.frequency.exponentialRampToValueAtTime(50,e+.1),r.type="lowpass",r.frequency.setValueAtTime(800,e),r.frequency.exponentialRampToValueAtTime(100,e+.1),i.gain.setValueAtTime(qe*4,e),i.gain.exponentialRampToValueAtTime(.001,e+.1),o.connect(r),r.connect(i),i.connect(t.destination),o.start(e),o.stop(e+.12);let a=t.createOscillator(),l=t.createGain();a.type="sine",a.frequency.setValueAtTime(150,e),a.frequency.exponentialRampToValueAtTime(50,e+.15),l.gain.setValueAtTime(qe*1.5,e),l.gain.exponentialRampToValueAtTime(.001,e+.15),a.connect(l),l.connect(t.destination),a.start(e),a.stop(e+.15),[55,55.4,110.5].forEach(m=>{let A=t.createOscillator(),d=t.createGain(),y=t.createBiquadFilter();A.type="sawtooth",A.frequency.value=m,y.type="lowpass",y.frequency.setValueAtTime(30,e),y.frequency.linearRampToValueAtTime(900,e+n+.2),y.frequency.exponentialRampToValueAtTime(40,e+3),d.gain.setValueAtTime(0,e),d.gain.linearRampToValueAtTime(qe*.6,e+n+.1),d.gain.exponentialRampToValueAtTime(.001,e+3.5),A.connect(y),y.connect(d),d.connect(t.destination),A.start(e),A.stop(e+3.6)})},playNotification:()=>{let t=Be();if(!t)return;let e=t.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(o=>{let i=t.createOscillator(),r=t.createGain();i.type="sine",i.frequency.setValueAtTime(o.freq,e),r.gain.setValueAtTime(0,e),r.gain.linearRampToValueAtTime(qe*o.vol,e+.004),r.gain.exponentialRampToValueAtTime(.001,e+o.dur),i.connect(r),r.connect(t.destination),i.start(e),i.stop(e+o.dur+.1)})},playSwoosh:()=>{Q.playGenieOpen()},playReset:()=>{Q.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let t=0,e=50;document.addEventListener("mouseover",n=>{if(!je)return;let o=n.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!o||o.contains(n.relatedTarget))return;let i=Date.now();i-t<e||(Q.playHover(),t=i)},{passive:!0})}};var zt=1e4;function jt(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let t=document.createElement("link");t.id="google-font-roboto",t.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",t.rel="stylesheet",document.head.appendChild(t);let e=document.createElement("style");e.id="techsol-global-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function ne(t,e={}){let n=document.createElement("div"),o=e.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(n.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:o,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),n.textContent=t,document.body.appendChild(n),e.error?Q.playError():Q.playSuccess(),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>n.remove(),400)},e.duration||4e3)}function Pt(t,e=null){let n=0,o=0,i=0,r=0,a=e||t;a.style.cursor="grab",a.onmousedown=l;function l(A){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(A.target.tagName)||A.target.closest(".no-drag"))return;A=A||window.event,a.style.cursor="grabbing",t.style.transition="none";let d=t.getBoundingClientRect();t.style.transform="none",t.style.left=d.left+"px",t.style.top=d.top+"px",t.style.margin="0",t.style.bottom="auto",t.style.right="auto",zt++,t.style.zIndex=zt,i=A.clientX,r=A.clientY,t.setAttribute("data-dragging","true"),document.onmouseup=m,document.onmousemove=u}function u(A){A=A||window.event,A.preventDefault(),n=i-A.clientX,o=r-A.clientY,i=A.clientX,r=A.clientY;let d=t.offsetTop-o,y=t.offsetLeft-n,h=16,b=window.innerWidth,v=window.innerHeight,T=t.offsetWidth,q=t.offsetHeight;y<h?y=h:y+T>b-h&&(y=b-T-h),d<h?d=h:d+q>v-h&&(d=v-q-h),t.style.top=d+"px",t.style.left=y+"px"}function m(){document.onmouseup=null,document.onmousemove=null,a.style.cursor="grab",setTimeout(()=>{t.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",t.setAttribute("data-dragging","false"),t.setAttribute("data-moved","true")},50)}}var we={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var At={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Ht={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var Vt={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var be={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var vt=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],Bt=-1;function Ze(){let t=Math.floor(Math.random()*vt.length);return t===Bt&&(t=(t+1)%vt.length),Bt=t,vt[t]}var Ie=t=>new Promise(e=>setTimeout(e,t));async function Ao(t,e){if(!t)return;t.style.opacity="1",t.innerHTML='<span class="cursor">|</span>';let n=t.querySelector(".cursor");await Ie(200);for(let o=0;o<e.length;o++){let i=e.charAt(o),r=document.createElement("span");r.textContent=i,n&&n.parentNode===t?n.before(r):t.appendChild(r);let a=Math.floor(Math.random()*60)+30;o===0&&(a=150),o>e.length-3&&(a=30),await Ie(a)}await Ie(600),n&&(n.style.display="none")}async function wt(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let e=document.createElement("style");e.id="google-splash-style",e.innerHTML=`
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
    `,document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1");try{await Ie(200);let e=await Dt(),n=Ft(e),o=t.querySelector("#w-icon"),i=t.querySelector("#p1"),r=t.querySelector("#p2"),a=t.querySelector("#p3"),l=t.querySelector("#p-sextou");o&&(o.innerHTML=n.icon),i&&(i.textContent=n.prefix),a&&(a.textContent=n.suffix),await Ie(300);let u=o?o.querySelector("svg"):null;if(u&&(u.style.opacity="1",u.style.transform="scale(1)"),await Ie(400),i&&(i.style.opacity="1"),Q.playStartup(),r&&await Ao(r,n.name),a&&(a.style.opacity="1",a.style.transform="translateY(0)"),n.isFriday&&l){await Ie(400),l.style.display="block",l.offsetWidth;let m=l.querySelector(".sextou-badge");m&&(m.style.opacity="1",m.style.transform="scale(1)")}await Ie(1500)}catch(e){console.warn("Splash error, skipping...",e)}finally{t.classList.add("splash-exit"),await Ie(900),t.parentNode&&t.parentNode.removeChild(t)}}var We={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Ye(t,e){e.onmousedown=n;function n(o){o.stopPropagation(),o.preventDefault();let i=t.style.transition;t.style.transition="none";let r=o.clientX,a=o.clientY,l=parseFloat(getComputedStyle(t,null).getPropertyValue("width").replace("px","")),u=parseFloat(getComputedStyle(t,null).getPropertyValue("height").replace("px","")),m=r,A=a,d=!1;function y(v){m=v.clientX,A=v.clientY,d||(window.requestAnimationFrame(()=>{h(),d=!1}),d=!0)}function h(){let v=l+(m-r),T=u+(A-a);v>360&&(t.style.width=v+"px"),T>300&&(t.style.height=T+"px")}function b(){document.removeEventListener("mousemove",y),document.removeEventListener("mouseup",b),setTimeout(()=>{t.style.transition=i},50)}document.addEventListener("mousemove",y),document.addEventListener("mouseup",b)}e.onmouseenter=()=>e.style.opacity="1",e.onmouseleave=()=>e.style.opacity="0.6"}function $t(t){if(!t)return"";let e={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return t.replace(/:([a-zA-Z0-9-_+]+):/g,n=>e[n]?e[n]:"")}var et=t=>new Promise(e=>setTimeout(e,t));function it(t){t&&["mousedown","mouseup","click"].forEach(e=>t.dispatchEvent(new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window})))}var Ut="cw-automation-styles";if(!document.getElementById(Ut)){let t=document.createElement("style");t.id=Ut,t.innerHTML=`
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
    `,document.head.appendChild(t)}function Wt(t){let e=document.getElementById("cw-loading-overlay");t?e?e.style.opacity="1":(e=document.createElement("div"),e.id="cw-loading-overlay",document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1")):e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}async function Yt(t){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let e=document.getElementById(t),n="";Wt(!0),e&&(n=e.placeholder,e.placeholder="Buscando ID...",e.value="",e.classList.add("cw-scanning-active"));try{let o=document.querySelector('material-button[debug-id="dock-item-case-log"]');o&&!o.classList.contains("selected")&&(it(o),await et(1200));let i=document.querySelector("search-filter dropdown-button .button");if(i&&!(i.innerText||"").includes("All")){it(i),await et(600);let d=document.querySelector('material-checkbox[debug-id="check-all-box"]');d&&d.getAttribute("aria-checked")!=="true"&&(it(d),await et(300));let y=document.querySelector('material-button[debug-id="apply-filter"]');y&&(it(y),await et(1500))}let r=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");r&&(r.scrollTop=r.scrollHeight,await et(500));let l=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body")),u=/Speakeasy.*?(P\d{15,25})/i,m=null;for(let A=l.length-1;A>=0;A--){let d=l[A];if(d.offsetParent===null)continue;let y=(d.innerText||"").match(u);if(y&&y[1]){m=y[1];break}}if(e)if(m){try{await navigator.clipboard.writeText(m)}catch{}e.value=m,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),Q.playSuccess(),ne(`ID Localizado: ${m}`),e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}else Q.playError(),ne("Nenhum ID encontrado.",{error:!0}),e.placeholder="N\xE3o encontrado",e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}catch(o){console.error("Erro na automa\xE7\xE3o:",o),ne("Erro ao processar.",{error:!0})}finally{e&&(e.classList.remove("cw-scanning-active"),e.value||(e.placeholder=n)),Wt(!1)}}var Ne={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:"}},Re={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},tt={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>Substatus:</b> DC - Other<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br>Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},st={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},ot=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],St=["CONSIDERACOES","COMENTARIOS"],Se={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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

Irei abrir caso em BAU para o dia solicitado e pedir descarte do mesmo, levando em conta a falta de acessos e solicita\xE7\xE3o de reagendamento do mesmo.`}};var xe=t=>new Promise(e=>setTimeout(e,t));function Z(t,e="info"){let n={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${t}`,n[e]||n.info)}function Ce(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>t.dispatchEvent(new MouseEvent(n,e)))}function Ct(){let e=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(n=>{let o=n.offsetParent!==null,i=n.closest("case-message-view")!==null,r=n.closest(".editor")!==null||n.closest("write-card")!==null;return o&&!i&&r});return e&&Z("Editor visualmente detectado.","success"),e}async function Xt(){Z("\u{1F680} FASE 1: Tentando abrir a janela de email...");let t=!1,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(d=>d.innerText.trim()==="email");if(n&&n.offsetParent!==null){Z("Bot\xE3o de email direto encontrado.");let d=n.closest("material-button")||n.closest("material-fab")||n;Ce(d),t=!0}else{Z("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let d=document.querySelector("material-fab-speed-dial");if(d){let y=d.querySelector(".trigger");if(y){Ce(y),await xe(800);let b=Array.from(document.querySelectorAll("i.material-icons-extended")).find(v=>v.innerText.trim()==="email");b&&(Z("Bot\xE3o de email no Speed Dial encontrado."),Ce(b),t=!0)}}}if(!t)return Z("FATAL: N\xE3o consegui clicar no bot\xE3o de email.","error"),ne("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;Z("\u{1F680} FASE 2: Verificando exist\xEAncia de rascunhos...");let o=null,i=0,r=20;for(;i<r;){await xe(250);let d=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(o=Array.from(d).find(y=>y.offsetParent!==null),o){Z(`\u26A0\uFE0F Rascunho detectado na tentativa ${i+1}!`,"warn");break}i%5===0&&Z(`Procurando bot\xE3o de descartar... (${i}/${r})`),i++}if(o){Z("\u{1F5D1}\uFE0F Iniciando protocolo de descarte..."),Ce(o),o.click(),Z("\u23F3 Aguardando Modal de Confirma\xE7\xE3o...");let d=null,y=0;for(;y<15;){await xe(300);let h=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(d=Array.from(h).find(b=>b.offsetParent!==null),d)break;y++}d?(Z("\u2705 Modal encontrado. Confirmando exclus\xE3o...","success"),Ce(d),ne("Limpando rascunho antigo...",{duration:2e3}),Z("\u23F3 Esperando o editor antigo ser destru\xEDdo..."),await xe(2500)):Z("\u274C ERRO: Cliquei na lixeira, mas o confirmar n\xE3o apareceu.","error")}else Z("\u2139\uFE0F Nenhum bot\xE3o de rascunho encontrado ap\xF3s varredura. Assumindo editor limpo.");Z("\u{1F680} FASE 3: Buscando editor final para escrita...");let a=0,l=null;for(;a<20&&(l=Ct(),!l);)await xe(250),a++;if(!l)return Z("FATAL: O editor n\xE3o apareceu na tela a tempo.","error"),ne("Erro: Editor n\xE3o carregou.",{error:!0}),!1;Z("\u{1F4DD} Editor localizado! Preparando para limpar...","success");let u=l.closest('[id="email-body-content-top"]'),A=(l.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(u){if(A){let y=A.closest('[aria-hidden="true"]');y&&y.removeAttribute("aria-hidden"),A.focus(),Ce(A)}await xe(300),u.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let d=u.querySelector("#cases-body-field");if(d){let y=document.createRange();y.selectNodeContents(d),y.collapse(!0);let h=window.getSelection();h.removeAllRanges(),h.addRange(y)}return Z("\u2728 Editor limpo e pronto."),!0}return!1}async function Kt(t){if(!t||!await Xt())return;Z(`Iniciando Canned Response: ${t}`);let n=xt();await xe(500);let o=document.querySelector('material-button[debug-id="canned_response_button"]');if(o){Ce(o),await xe(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){Ce(i),document.execCommand("insertText",!1,t),i.dispatchEvent(new Event("input",{bubbles:!0})),await xe(800);let r=document.querySelector("material-select-dropdown-item");if(r){Ce(r),await xe(1500);let a=Ct();if(a&&n.advertiserName){let l=a.innerHTML;l.includes("{%ADVERTISER_NAME%}")&&(a.innerHTML=l.replace(/{%ADVERTISER_NAME%}/g,n.advertiserName))}ne("Canned Response aplicada!")}else Z("Op\xE7\xE3o de Canned n\xE3o encontrada no dropdown.","warn"),ne(`Template '${t}' n\xE3o encontrado.`,{error:!0})}}else Z("Bot\xE3o Canned Response n\xE3o encontrado na toolbar.","error")}async function Et(t){if(Z(`\u{1F680} Iniciando Quick Email: ${t.name}`),!await Xt())return;let n=xt(),o=ht();await xe(600);let i=document.querySelector('input[aria-label="Subject"]');i&&t.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,t.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await xe(300));let r=Ct();if(r){let l=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');l&&(l.focus(),Ce(l));let u=new Date;u.setDate(u.getDate()+3);let m=u.getDay();m===6?u.setDate(u.getDate()+2):m===0&&u.setDate(u.getDate()+1);let A=u.toLocaleDateString("pt-BR"),d=t.body;d=d.replace(/\[Nome do Cliente\]/g,n.advertiserName||"Cliente"),d=d.replace(/\[INSERIR URL\]/g,n.websiteUrl||"seu site"),d=d.replace(/\[URL\]/g,n.websiteUrl||"seu site"),d=d.replace(/\[Seu Nome\]/g,o),d=d.replace(/\[MM\/DD\/YYYY\]/g,A),document.execCommand("insertHTML",!1,d),l&&(l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0}))),ne("Email preenchido com sucesso!",{duration:2e3}),Z("\u2705 Processo finalizado com sucesso.","success")}else Z("Erro final: Editor n\xE3o encontrado para inser\xE7\xE3o.","error"),ne("Erro ao focar no editor.",{error:!0})}var wo={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},Qt={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function Ee(t,e,n,o,i,r){let a=document.createElement("div");Object.assign(a.style,wo),Pt(t,a);let l=document.createElement("div");Object.assign(l.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),a.appendChild(l),i&&(i.googleLine=l);let u=document.createElement("div");Object.assign(u.style,{display:"flex",alignItems:"center",gap:"12px"});let m=document.createElement("img");m.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(m.style,{width:"20px",height:"20px",pointerEvents:"none"});let A=document.createElement("span");A.textContent=e,u.appendChild(m),u.appendChild(A);let d=document.createElement("div");Object.assign(d.style,{display:"flex",alignItems:"center",gap:"4px"});let y='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',h='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',b=document.createElement("div");b.innerHTML=y,Object.assign(b.style,Qt),b.title="Sobre",b.classList.add("no-drag"),b.onmouseenter=()=>{b.style.background="rgba(255,255,255,0.1)",b.style.color="#FFF"},b.onmouseleave=()=>{b.style.color!=="rgb(138, 180, 248)"&&(b.style.background="transparent",b.style.color="#9AA0A6")};let v=document.createElement("div");v.innerHTML=h,Object.assign(v.style,Qt),v.title="Fechar",v.classList.add("no-drag"),v.onmouseenter=()=>{v.style.background="rgba(242, 139, 130, 0.2)",v.style.color="#F28B82"},v.onmouseleave=()=>{v.style.background="transparent",v.style.color="#9AA0A6"},v.onmousedown=q=>q.stopPropagation(),b.onmousedown=q=>q.stopPropagation(),v.onclick=r;let T=So(t,e,n,o);return b.onclick=q=>{q.stopPropagation(),T.style.opacity==="1"?(T.style.opacity="0",T.style.pointerEvents="none",b.style.color="#9AA0A6",b.style.background="transparent"):(T.style.opacity="1",T.style.pointerEvents="auto",b.style.color="#8AB4F8",b.style.background="rgba(138, 180, 248, 0.1)")},d.appendChild(b),d.appendChild(v),a.appendChild(u),a.appendChild(d),a}function So(t,e,n,o){let i=document.createElement("div");return Object.assign(i.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(5px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),i.innerHTML=`
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
    `,setTimeout(()=>{let r=i.querySelector("#close-help-internal");r&&(r.onmouseover=()=>r.style.backgroundColor="#f8f9fa",r.onmouseout=()=>r.style.backgroundColor="white",r.onclick=()=>{i.style.opacity="0",i.style.pointerEvents="none"})},0),t.appendChild(i),i}if(!document.getElementById("cw-module-styles")){let t=document.createElement("style");t.id="cw-module-styles",t.innerHTML=`
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
    `,document.head.appendChild(t)}function Te(t,e,n){let o=document.getElementById(n);if(!e)return;let i=e.getAttribute("data-moved")==="true",r={x:0,y:0};if(o){let A=o.getBoundingClientRect();r.x=A.left+A.width/2,r.y=A.top+A.height/2}let a,l;if(!i)a=window.innerWidth/2,l=window.innerHeight/2;else{let A=e.getBoundingClientRect();a=A.left+A.width/2,l=A.top+A.height/2,a===0&&l===0&&(a=window.innerWidth/2,l=window.innerHeight/2)}let u=r.x-a,m=r.y-l;t?(Q.playGenieOpen(),e.style.transition="none",e.style.opacity="0",e.style.pointerEvents="auto",i?e.style.transform=`translate(${u}px, ${m}px) scale(0.05)`:e.style.transform=`translate(calc(-50% + ${u}px), calc(-50% + ${m}px)) scale(0.05)`,e.offsetWidth,requestAnimationFrame(()=>{e.classList.add("open"),o&&o.classList.add("active"),e.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",e.style.opacity="1",i?e.style.transform="translate(0, 0) scale(1)":e.style.transform="translate(-50%, -50%) scale(1)"}),typeof Jt=="function"&&Jt(e,n)):(Q.playSwoosh(),e.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",e.style.pointerEvents="none",requestAnimationFrame(()=>{e.style.opacity="0",i?e.style.transform=`translate(${u}px, ${m}px) scale(0.1)`:e.style.transform=`translate(calc(-50% + ${u}px), calc(-50% + ${m}px)) scale(0.1)`}),setTimeout(()=>{e.classList.remove("open"),o&&o.classList.remove("active"),e.style.transition="",e.style.transform=""},300),typeof Tt=="function"&&Tt(e))}function Jt(t,e){Tt(t);let n=o=>{if(!t.classList.contains("open"))return;let i=t.contains(o.target),r=document.querySelector(".cw-pill"),a=r&&r.contains(o.target);i?(t.classList.remove("idle"),t.style.zIndex="2147483648"):a||(t.classList.add("idle"),t.style.zIndex="2147483646")};t._idleHandler=n,document.addEventListener("mousedown",n)}function Tt(t){t._idleHandler&&(document.removeEventListener("mousedown",t._idleHandler),t._idleHandler=null)}var to="https://script.google.com/a/macros/google.com/s/AKfycbwxxY5EhL3U1ZIEvs_y28FFeIFr7rMfSzNIljclqPd9Mk58-gx7pBRfZ8pQmXt2P1IMjw/exec",kt="cw_data_broadcast",Zt="cw_data_tips",Co=["Processando sua solicita\xE7\xE3o...","Dica: Mantenha suas notas organizadas.","Aguarde um momento...","Quase l\xE1..."];function eo(t){return new Promise((e,n)=>{let o="cw_cb_"+Math.round(1e4*Math.random()),i=document.createElement("script");window[o]=r=>{document.body.removeChild(i),delete window[o],e(r)},i.src=`${to}?op=${t}&callback=${o}&t=${Date.now()}`,i.onerror=()=>{document.body.removeChild(i),delete window[o],n(new Error("JSONP Load Error"))},document.body.appendChild(i)})}var Pe={fetchTips:async()=>{try{console.log("\u{1F4E5} Baixando dicas via JSONP...");let t=await eo("tips");t&&t.tips&&Array.isArray(t.tips)&&(localStorage.setItem(Zt,JSON.stringify(t.tips)),console.log("\u2705 Dicas atualizadas:",t.tips.length))}catch(t){console.warn("TechSol: Erro ao baixar dicas (Offline).",t)}},fetchData:async()=>{try{console.log("\u{1F4E5} Baixando Broadcasts via JSONP...");let t=await eo("broadcast");if(t&&t.broadcast)return localStorage.setItem(kt,JSON.stringify(t.broadcast)),console.log("\u2705 Broadcasts atualizados:",t.broadcast.length),t}catch(t){console.warn("TechSol: Erro ao buscar Broadcasts.",t)}return{broadcast:JSON.parse(localStorage.getItem(kt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(kt)||"[]"),getRandomTip:()=>{let t=Co,e=localStorage.getItem(Zt);if(e)try{t=JSON.parse(e)}catch{}return t[Math.floor(Math.random()*t.length)]},logUsage:(t,e="")=>{let o={op:"log",user:window._USER_ID||"agente_anonimo",action:t,meta:e};fetch(to,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(o)}).catch(i=>console.log("Log fail",i))}};var ie={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00"},rt=t=>new Promise(e=>setTimeout(e,t));function oo(t){let e="cw-command-center-style";if(!document.getElementById(e)){let h=document.createElement("style");h.id=e,h.innerHTML=`
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
                background: ${ie.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${ie.glassBorder}; border-radius: 50px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.4); z-index: 2147483647;
                opacity: 0; transform: translateX(40px) scale(0.95);
                transition: opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
            }
            .cw-pill.docked { opacity: 1; transform: translateX(0) scale(1); }

            .cw-btn {
                width: 40px; height: 40px; 
                border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center; 
                cursor: pointer; position: relative; color: ${ie.iconIdle};
                opacity: 0; transform: scale(0.5);
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-btn.popped { opacity: 1; transform: scale(1); }

            .cw-btn:hover { background: ${ie.glassHighlight}; color: ${ie.iconActive}; transform: scale(1.1); }

            /* Estados Ativos e Cores */
            .cw-btn.notes.active { color: ${ie.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${ie.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${ie.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${ie.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.broadcast.active { color: ${ie.orange} !important; background: rgba(249, 171, 0, 0.15); } /* NOVO */

            .cw-btn.notes:hover { color: ${ie.blue}; filter: drop-shadow(0 0 5px rgba(138, 180, 248, 0.5)); }
            .cw-btn.email:hover { color: ${ie.red}; filter: drop-shadow(0 0 5px rgba(242, 139, 130, 0.5)); }
            .cw-btn.script:hover { color: ${ie.purple}; filter: drop-shadow(0 0 5px rgba(197, 138, 249, 0.5)); }
            .cw-btn.links:hover { color: ${ie.green}; filter: drop-shadow(0 0 5px rgba(129, 201, 149, 0.5)); }
            .cw-btn.broadcast:hover { color: ${ie.orange}; filter: drop-shadow(0 0 5px rgba(249, 171, 0, 0.5)); } /* NOVO */

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
                width: 24px; height: 4px; background-color: ${ie.iconIdle}; border-radius: 4px; 
                opacity: 0.4; transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1); 
            }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            .cw-grip:active { cursor: grabbing; }
            .cw-pill.dragging .cw-grip-bar { background-color: ${ie.blue}; width: 16px; opacity: 1; }

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
.cw-center-dots span:nth-child(1) { background-color: ${ie.blue}; animation-delay: -0.32s; }
.cw-center-dots span:nth-child(2) { background-color: ${ie.red}; animation-delay: -0.16s; }
.cw-center-dots span:nth-child(3) { background-color: ${ie.green}; }

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
.cw-center-success { display: none; color: ${ie.green}; }
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
    `;let i=document.createElement("div");if(i.className="cw-focus-backdrop",document.body.appendChild(i),document.body.appendChild(o),o.querySelector(".notes").onclick=h=>{h.stopPropagation(),t.toggleNotes()},o.querySelector(".email").onclick=h=>{h.stopPropagation(),t.toggleEmail()},o.querySelector(".script").onclick=h=>{h.stopPropagation(),t.toggleScript()},o.querySelector(".links").onclick=h=>{h.stopPropagation(),t.toggleLinks()},o.querySelector(".broadcast").onclick=h=>{h.stopPropagation();let b=h.currentTarget.querySelector(".cw-badge");b&&(b.style.transform="scale(0)",setTimeout(()=>b.remove(),200)),t.broadcastControl&&t.broadcastControl.toggle()},t.broadcastControl&&t.broadcastControl.hasUnread){let h=document.createElement("div");h.className="cw-badge",o.querySelector(".broadcast").appendChild(h)}(async function(){await rt(2800),o.classList.add("docked"),await rt(300);let b=o.querySelectorAll(".cw-btn");o.querySelectorAll(".cw-sep").forEach(T=>T.classList.add("visible"));for(let T=0;T<b.length;T++)b[T].classList.add("popped"),await rt(90);await rt(200),o.classList.add("system-check")})();let r=!1,a,l,u,m,A=3;o.onmousedown=h=>{if(h.target.closest("button"))return;h.preventDefault(),a=h.clientX,l=h.clientY;let b=o.getBoundingClientRect();u=b.left,m=b.top,document.addEventListener("mousemove",d),document.addEventListener("mouseup",y)};function d(h){let b=h.clientX-a,v=h.clientY-l;!r&&Math.sqrt(b*b+v*v)>A&&(r=!0,o.style.transition="none"),r&&(o.style.left=`${u+b}px`,o.style.top=`${m+v}px`,o.style.right="auto",o.style.bottom="auto",o.style.transform="none")}function y(h){if(document.removeEventListener("mousemove",d),document.removeEventListener("mouseup",y),r){r=!1,o.style.transition="left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s ease";let b=window.innerWidth,v=window.innerHeight,T=o.getBoundingClientRect(),q=T.left+T.width/2,R;q<b/2?(R=24,o.classList.remove("side-right"),o.classList.add("side-left")):(R=b-T.width-24,o.classList.remove("side-left"),o.classList.add("side-right"));let j=T.top;j<24&&(j=24),j>v-T.height-24&&(j=v-T.height-24),o.style.left=`${R}px`,o.style.top=`${j}px`}else{let b=h.target.closest("button");b&&(b.style.transform="scale(0.9)",setTimeout(()=>b.style.transform="",150))}}}function Xe(){let t=document.querySelector(".cw-pill"),e=document.querySelector(".cw-focus-backdrop");if(!t)return()=>{};let n=document.createElement("div");n.className="cw-center-stage",n.innerHTML=`
        <div class="cw-center-dots">
            <span></span><span></span><span></span>
        </div>
        <div class="cw-center-text">${Pe.getRandomTip()}</div>
        <div class="cw-center-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
    `,t.appendChild(n);let o=Date.now();return t.classList.add("processing-center"),e&&e.classList.add("active"),function(){let r=Date.now()-o,a=Math.max(0,2e3-r);setTimeout(()=>{let l=n.querySelector(".cw-center-dots"),u=n.querySelector(".cw-center-text"),m=n.querySelector(".cw-center-success");l&&(l.style.display="none"),u&&(u.style.display="none"),m&&m.classList.add("show"),t.classList.add("success"),setTimeout(()=>{t.classList.remove("processing-center"),setTimeout(()=>{n.remove(),t.classList.remove("success"),e&&e.classList.remove("active")},400)},1e3)},a)}}function no(t){let e=document.createElement("div");e.className="cw-step-scenarios";let n=document.createElement("div");Object.assign(n.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let o=document.createElement("div");Object.assign(o.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"40px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s ease"}),o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>";let i=null;Object.entries(Se).forEach(([a,l])=>{let u=document.createElement("div");u.textContent=a,Object.assign(u.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",display:"flex",alignItems:"center",gap:"6px"}),u.onmouseenter=()=>{i!==l&&(o.style.background="#fff",o.style.borderColor="#1a73e8",o.style.color="#202124",o.textContent=`"${l.substring(0,120)}${l.length>120?"...":""}"`),i!==l&&(u.style.background="#f1f3f4")},u.onmouseleave=()=>{i!==l&&(i||(o.style.background="#f8f9fa",o.style.borderColor="#dadce0",o.style.color="#5f6368",o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>"),u.style.background="#ffffff")},u.onclick=()=>{Q.playClick(),i===l?(i=null,r(),t("")):(i=l,r(),u.style.transform="scale(0.95)",setTimeout(()=>u.style.transform="scale(1)",150),t(l))},n.appendChild(u)});function r(){Array.from(n.children).forEach(a=>{Se[a.textContent]===i?(a.style.background="#e8f0fe",a.style.borderColor="#1a73e8",a.style.color="#1967d2",a.style.fontWeight="500"):(a.style.background="#ffffff",a.style.borderColor="#dadce0",a.style.color="#3c4043",a.style.fontWeight="400")})}return e.appendChild(n),e.appendChild(o),e}var ao=t=>new Promise(e=>setTimeout(e,t));function lt(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>t.dispatchEvent(new MouseEvent(n,e)))}function Ot(t){let e=document.createElement("div");e.style.position="fixed",e.style.left="-9999px",e.innerHTML=t,document.body.appendChild(e);let n=document.createRange();n.selectNodeContents(e);let o=window.getSelection();o.removeAllRanges(),o.addRange(n);try{document.execCommand("copy")}catch{ne("Falha ao copiar",{error:!0})}o.removeAllRanges(),document.body.removeChild(e)}function so(t){["input","change","keydown","keyup"].forEach(n=>{let o=new Event(n,{bubbles:!0,cancelable:!0});t.dispatchEvent(o)})}function io(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function ro(){console.log("Iniciando processo de Nova Nota...");let t=io(),e=t.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(a=>a.innerText.trim()==="description");if(o){let a=o.closest("material-fab")||o.closest("material-button");a?(a.style&&(a.style.display="block",a.style.visibility="visible"),lt(a)):lt(o)}else{let a=document.querySelector("material-fab-speed-dial");if(a){let l=a.querySelector(".trigger");l?(l.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),lt(l)):a.click(),await ao(800);let m=Array.from(document.querySelectorAll("i.material-icons-extended")).find(A=>A.innerText.trim()==="description");m&&lt(m)}}let i=null,r=0;for(;!i&&r<20;){await ao(300);let a=io();if(a.length>e)i=a.find(l=>!t.includes(l)),i||(i=a[a.length-1]);else if(r>10){let l=a.filter(u=>u.offsetParent!==null);l.length>0&&(i=l[l.length-1])}r++}return i}var V={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},ke="cubic-bezier(0.25, 0.8, 0.25, 1)",Eo={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${V.border}`,backgroundColor:V.bgInput,fontSize:"14px",color:V.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${ke}, box-shadow 0.2s ${ke}, background-color 0.2s`,outline:"none"},on={...Eo,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},nn={fontSize:"13px",fontWeight:"700",color:V.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},an={display:"block",fontSize:"13px",fontWeight:"600",color:V.text,marginBottom:"8px",marginTop:"16px"},sn={fontSize:"12px",color:V.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},rn={fontSize:"12px",color:V.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},ln={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:V.text,cursor:"pointer",padding:"12px 14px",backgroundColor:V.surface,border:`1px solid ${V.border}`,borderRadius:"12px",transition:`all 0.2s ${ke}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},qt={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:V.primary},cn={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:V.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${ke}, box-shadow 0.2s ${ke}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},dn={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${V.primary}`,color:V.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${ke}`},pn={background:"transparent",border:`1px solid ${V.border}`,borderRadius:"20px",color:V.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${ke}`,fontFamily:"'Google Sans', 'Roboto'"};var un={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:V.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},mn={fontSize:"13px",fontWeight:"700",color:V.primary,minWidth:"20px",textAlign:"center"},gn={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${V.border}`,backgroundColor:V.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${ke}, box-shadow 0.2s ${ke}`},bn={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${V.bgInput}`},fn={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${V.border}`,backgroundColor:V.surface,color:V.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${ke}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},hn={backgroundColor:V.primaryBg,color:V.primary,borderColor:V.primary,fontWeight:"600"},xn={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:V.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},yn={borderTop:`1px solid ${V.bgInput}`,paddingTop:"20px",marginTop:"16px"};var vn={maxHeight:"240px",overflowY:"auto",border:`1px solid ${V.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:V.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},An={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${V.bgInput}`,cursor:"pointer",fontSize:"13px",color:V.text,transition:"background 0.1s",userSelect:"none"};var To={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},ko={fontSize:"12px",color:"#e37400",marginTop:"4px"},Oo={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},qo={display:"flex",gap:"15px",marginBottom:"10px"};function lo(){let t=document.createElement("div");t.id="tag-support-container",Object.assign(t.style,To);let e=document.createElement("label");e.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(e.style,At,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,qo);let o=document.createElement("input");o.type="radio",o.name="ts_usage_mod",o.value="Sim",Object.assign(o.style,qt);let i=document.createElement("label");i.textContent="Sim";let r=document.createElement("div");Object.assign(r.style,{display:"flex",alignItems:"center"}),r.appendChild(o),r.appendChild(i);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="N\xE3o",a.checked=!0,Object.assign(a.style,qt);let l=document.createElement("label");l.textContent="N\xE3o";let u=document.createElement("div");Object.assign(u.style,{display:"flex",alignItems:"center"}),u.appendChild(a),u.appendChild(l),n.appendChild(r),n.appendChild(u);let m=document.createElement("div");m.style.display="block";let A=document.createElement("label");A.textContent="Qual foi o Motivo?",Object.assign(A.style,At,{fontSize:"12px"});let d=document.createElement("input");d.type="text",Object.assign(d.style,Oo);let y=document.createElement("div");y.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(y.style,ko),m.appendChild(A),m.appendChild(d),m.appendChild(y),t.appendChild(e),t.appendChild(n),t.appendChild(m),o.onchange=()=>{m.style.display="none"},a.onchange=()=>{m.style.display="block"};function h(T,q){if(t.style.display="none",!T||T.includes("Education")||!q||q.length===0)return;let R=q.some(s=>s.includes("enhanced")||s==="ec_google_ads"),j=q.some(s=>(s.includes("conversion")||s.includes("ads"))&&!s.includes("enhanced")),U=q.some(s=>s.includes("ga4")||s.includes("analytics")||s.includes("ua")),g=q.some(s=>s.includes("merchant")||s.includes("gmc")||s.includes("shopping"));(R||j&&!U&&!g)&&(t.style.display="block")}function b(){if(t.style.display==="none")return"";let T=`<br><b>Utilizou Tag Support?</b> ${o.checked?"Sim":"N\xE3o"}`;return a.checked&&d.value.trim()!==""&&(T+=`<br><b>Motivo:</b> ${d.value}`),T+="<br>",T}function v(){t.style.display="none",a.checked=!0,o.checked=!1,m.style.display="block",d.value=""}return{element:t,updateVisibility:h,getOutput:b,reset:v}}var G={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},He={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function co(t){let e={},n="implementation";function o(g){let f=g.toLowerCase();return f.includes("ads")||f.includes("conversion")||f.includes("remarketing")?G.brands.ads:f.includes("ga4")||f.includes("analytics")?G.brands.ga4:f.includes("gtm")||f.includes("tag manager")||f.includes("container")?G.brands.gtm:f.includes("merchant")||f.includes("shopping")||f.includes("feed")?G.brands.gmc:G.brands.default}let i=Object.entries(Re).filter(([g,f])=>f.popular),r={};Object.entries(Re).forEach(([g,f])=>{if(f.popular)return;let s=o(f.name);r[s.label]||(r[s.label]={brand:s,tasks:[]}),r[s.label].tasks.push({key:g,...f})});let a="cw-zen-tasks";if(!document.getElementById(a)){let g=document.createElement("style");g.id=a,g.innerHTML=`
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
        `,document.head.appendChild(g)}let l=document.createElement("div");l.className="cw-zen-container";let u=document.createElement("div");Object.assign(u.style,{display:"none"});let m=document.createElement("div");m.className="cw-screens-container",u.appendChild(m),l.innerHTML=`
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
    `;let A=l.querySelector(".cw-hero-grid"),d=l.querySelector(".cw-acc-container"),y=l.querySelector(".cw-results-container"),h=l.querySelector(".cw-search-input"),b=l.querySelector(".cw-status-bar"),v=l.querySelector(".cw-status-text"),T=l.querySelector(".cw-footer-icons");i.forEach(([g,f])=>{let s=o(f.name),c=document.createElement("div");c.className="cw-hero-card",c.id=`hero-${g}`,c.style.setProperty("--hero-color",s.color),c.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${He[s.icon]}</div>
                <div class="cw-hero-label">${f.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,c.onclick=S=>{if(S.target.closest(".cw-step-btn"))return;let p=e[g]?e[g].count:0;R(g,p>0?-p:1,f)},c.querySelector(".minus").onclick=()=>R(g,-1,f),c.querySelector(".plus").onclick=()=>R(g,1,f),c.dataset.color=s.color,A.appendChild(c)});function q(g,f){let s=o(f.name),c=document.createElement("div");return c.className="cw-task-item",c.dataset.id=g,c.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${s.bg}; color:${s.color}">
                    ${He[s.icon]||He.default}
                </div>
                <div class="cw-task-label">${f.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,c.onclick=S=>{if(S.target.closest(".cw-step-btn"))return;let p=e[g]?e[g].count:0;R(g,p>0?-p:1,f)},c.querySelector(".minus").onclick=()=>R(g,-1,f),c.querySelector(".plus").onclick=()=>R(g,1,f),c}Object.entries(r).forEach(([g,f])=>{let s=document.createElement("div");s.className="cw-acc-group";let c=document.createElement("div");c.className="cw-acc-header",c.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${f.brand.color}"></div>
                ${g}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,c.onclick=()=>{d.querySelectorAll(".cw-acc-group.open").forEach(p=>{p!==s&&p.classList.remove("open")}),s.classList.toggle("open")};let S=document.createElement("div");S.className="cw-acc-body",f.tasks.forEach(p=>{let x=q(p.key,p);S.appendChild(x)}),s.appendChild(c),s.appendChild(S),d.appendChild(s)});function R(g,f,s){e[g]||(e[g]={count:0,data:s,brand:o(s.name)}),e[g].count+=f,e[g].count<=0&&delete e[g],j(),U(),t&&t()}function j(){i.forEach(([S])=>{let p=A.querySelector(`#hero-${S}`);if(!p)return;let x=e[S];x?(p.classList.add("active"),p.querySelector(".cw-step-val").textContent=x.count,p.querySelector(".cw-step-val").style.color=p.dataset.color):p.classList.remove("active")}),l.querySelectorAll(".cw-task-item").forEach(S=>{let p=S.dataset.id,x=e[p];x?(S.classList.add("selected"),S.querySelector(".cw-step-val").textContent=x.count):S.classList.remove("selected")});let f=Object.keys(e),s=0,c=[];if(f.forEach(S=>{let p=e[S];s+=p.count;for(let x=0;x<p.count;x++)c.length<6&&c.push(p.brand)}),s>0){b.classList.add("visible");let S=s>1?"A\xE7\xF5es":"A\xE7\xE3o",p=s>1?"definidas":"definida";v.textContent=`${s} ${S} ${p}`,T.innerHTML="",c.forEach(x=>{let O=document.createElement("div");O.className="cw-mini-icon",O.innerHTML=He[x.icon]||He.default;let w=O.querySelector("svg");w&&(w.style.width="14px",w.style.height="14px"),T.appendChild(O)})}else b.classList.remove("visible")}h.addEventListener("input",g=>{let f=g.target.value.toLowerCase();if(f.length>0){d.style.display="none",y.style.display="block",y.innerHTML="";let s=!1;Object.entries(Re).forEach(([c,S])=>{if(S.name.toLowerCase().includes(f)){s=!0;let p=q(c,S);e[c]&&(p.classList.add("selected"),p.querySelector(".cw-step-val").textContent=e[c].count),y.appendChild(p)}}),s||(y.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else d.style.display="block",y.style.display="none"});function U(){m.innerHTML="";let g=Object.keys(e),f=!1,s=document.getElementById("sub-status"),c="implementation";if(s&&s.value.toLowerCase().includes("education")&&(c="education"),g.length===0){m.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}if(g.length===0){m.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}let S=document.createElement("div");S.className="cw-info-banner",S.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Todos os Screenshots s\xE3o baseados na descri\xE7\xE3o do 
                <a href="https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/" target="_blank" class="cw-info-link">Win Criteria</a>.
            </span>
        `,m.appendChild(S),g.forEach(p=>{let x=e[p].data,O=e[p].count,w=e[p].brand,k=x.screenshots?x.screenshots[c]||[]:["Link da Evid\xEAncia"];if(k.length>0){f=!0;for(let F=1;F<=O;F++){let M=document.createElement("div");M.className="cw-screen-card",M.style.setProperty("--brand-color",w.color),M.style.setProperty("--brand-bg",w.bg),M.style.setProperty("--brand-shadow",w.color+"40");let I=document.createElement("div");I.className="cw-card-header";let z=document.createElement("div");z.className="cw-card-icon",z.innerHTML=He[w.icon]||He.default;let N=document.createElement("div");N.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let Y=document.createElement("input");Y.className="cw-card-title-input",Y.id=`name-${p}-${F}`,Y.value=`${x.name}${O>1?" #"+F:""}`,Y.title="Clique para renomear esta task";let X=document.createElement("span");X.className="cw-edit-hint",X.innerHTML="\u270E Renomear",N.appendChild(Y),N.appendChild(X),I.appendChild(z),I.appendChild(N),M.appendChild(I),k.forEach((te,se)=>{let ae=document.createElement("div");ae.className="cw-input-group";let fe=document.createElement("label");fe.className="cw-input-label",fe.textContent=te.replace(/📷|:|•/g,"").trim();let de=document.createElement("input");de.className="cw-input-field",de.id=`screen-${p}-${F}-${se}`,de.placeholder="Cole o link aqui...",de.setAttribute("autocomplete","off"),de.addEventListener("input",()=>{de.value.trim().length>5?de.classList.add("filled"):de.classList.remove("filled")});let ge=document.createElement("div");ge.className="cw-input-check",ge.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',ae.appendChild(fe),ae.appendChild(de),ae.appendChild(ge),M.appendChild(ae)}),m.appendChild(M)}}}),u.style.display=f?"block":"none"}return{selectionElement:l,screenshotsElement:u,updateSubStatus:()=>U(),getCheckedElements:()=>Object.keys(e).map(g=>({value:g,closest:()=>({querySelector:()=>({textContent:e[g].count})})})),toggleTask:(g,f=!0)=>{let s=e[g];f&&!s?R(g,1,Re[g]):!f&&s&&R(g,-s.count,Re[g])},setMode:g=>{n=g,U()},reset:()=>{for(let g in e)delete e[g];h.value="",d.style.display="block",y.style.display="none",j(),U()}}}function po(){let t="v3.6.0",e="bau",n="pt",o=!1,i=!1,r={input:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},textarea:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease",height:"100px",resize:"vertical"},h3:{fontSize:"14px",fontWeight:"600",color:"#202124",margin:"0 0 12px 0"},label:{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},checkboxLabel:{display:"flex",alignItems:"center",marginBottom:"10px",fontSize:"14px",fontWeight:"400",cursor:"pointer",padding:"8px",background:"#f8f9fa",borderRadius:"6px",transition:"background-color 0.2s ease, box-shadow 0.2s ease",userSelect:"none"},checkboxInput:{width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"},buttonBase:{flex:"1 1 0",padding:"10px 0",color:"#fff",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"500",cursor:"pointer",marginTop:"16px"},stepBlock:{borderTop:"1px solid #eee",paddingTop:"12px",marginTop:"12px"},radioContainer:{display:"flex",gap:"15px",marginBottom:"10px"},optionalBtn:{width:"100%",padding:"10px",background:"white",border:"1px dashed #1a73e8",color:"#1a73e8",borderRadius:"6px",cursor:"pointer",fontWeight:"500",fontSize:"13px",marginBottom:"10px",transition:"all 0.2s"},helpLink:{fontSize:"12px",color:"#1a73e8",textDecoration:"none",cursor:"pointer",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"color 0.2s"}},a=lo(),l=co(()=>{let L=l.getCheckedElements().map(E=>E.value);w&&w.value&&a.updateVisibility(w.value,L)}),u=document.createElement("div");u.id="autofill-popup",u.classList.add("cw-module-window"),Object.assign(u.style,we,{right:"100px",width:"400px",transition:"width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)"});let A=Ee(u,"Case Notes Assistant",t,"Gera notas padronizadas automaticamente. Selecione o status, as tasks realizadas e preencha os detalhes para inserir no caso.",{popup:u,googleLine:null},()=>ft());u.appendChild(A);let d=document.createElement("div");Object.assign(d.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1"}),u.appendChild(d);let y=document.createElement("div");y.textContent="created by lucaste@",Object.assign(y.style,Vt),u.appendChild(y);let h=document.createElement("div");h.id="step-lang-type";let b=document.createElement("label");Object.assign(b.style,r.label),h.appendChild(b);let v=document.createElement("div");Object.assign(v.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let T=document.createElement("div");T.textContent="Portugu\xEAs",T.classList.add("no-drag"),Object.assign(T.style,be);let q=document.createElement("div");q.textContent="Espa\xF1ol",q.classList.add("no-drag"),Object.assign(q.style,be),T.onclick=()=>ut("pt"),q.onclick=()=>ut("es"),v.appendChild(T),v.appendChild(q),h.appendChild(v),d.appendChild(h);let R=document.createElement("div");R.id="step-0-case-type";let j=document.createElement("label");Object.assign(j.style,r.label),R.appendChild(j);let U=document.createElement("div");Object.assign(U.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let g=document.createElement("div");g.textContent="BAU",g.classList.add("no-drag"),Object.assign(g.style,be);let f=document.createElement("div");f.textContent="LM",f.classList.add("no-drag"),Object.assign(f.style,be),g.onclick=()=>pt("bau"),f.onclick=()=>pt("lm"),U.appendChild(g),U.appendChild(f),R.appendChild(U),d.appendChild(R);let s=document.createElement("div");s.id="step-1-selection";let c=document.createElement("label");c.className="cw-input-label",c.textContent="Status Principal";let S=document.createElement("select");S.id="main-status",S.className="cw-select",S.innerHTML=`
      <option value="" disabled selected hidden>Selecione uma op\xE7\xE3o...</option>
      <option value="NI">NI - Need Info</option>
      <option value="SO">SO - Solution Offered</option>
      <option value="IN">IN - Inactive</option>
      <option value="AS">AS - Assigned</option>
      <option value="DC">DC - Discard</option>
  `;let p=document.createElement("div");p.style.cssText="display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; margin-bottom: 6px;";let x=document.createElement("label");x.className="cw-input-label",x.textContent="Sub-status",x.style.marginBottom="0";let O=document.createElement("a");O.href="https://seu-link-do-guia-aqui.com",O.target="_blank",O.className="cw-info-link",O.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; transform:translateY(1px)"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Guia de Substatus',Object.assign(O.style,r.helpLink),p.appendChild(x),p.appendChild(O);let w=document.createElement("select");w.id="sub-status",w.className="cw-select",w.disabled=!0,w.innerHTML='<option value="" disabled selected hidden>Aguardando status principal...</option>',s.appendChild(c),s.appendChild(S),s.appendChild(p),s.appendChild(w),d.appendChild(s);let k=document.createElement("div");k.id="step-1-1-portugal",Object.assign(k.style,r.stepBlock,{display:"none"});let F=document.createElement("label");Object.assign(F.style,r.label),k.appendChild(F);let M=document.createElement("div");Object.assign(M.style,r.radioContainer);let I=document.createElement("div");Object.assign(I.style,{display:"flex",alignItems:"center"});let z=document.createElement("input");z.type="radio",z.name="portugal-group",z.value="sim",Object.assign(z.style,r.checkboxInput);let N=document.createElement("label");N.htmlFor="portugal-sim",Object.assign(N.style,{cursor:"pointer"}),I.appendChild(z),I.appendChild(N);let Y=document.createElement("div");Object.assign(Y.style,{display:"flex",alignItems:"center"});let X=document.createElement("input");X.type="radio",X.name="portugal-group",X.value="nao",X.checked=!0,Object.assign(X.style,r.checkboxInput);let te=document.createElement("label");te.htmlFor="portugal-nao",Object.assign(te.style,{cursor:"pointer"}),Y.appendChild(X),Y.appendChild(te),M.appendChild(I),M.appendChild(Y),k.appendChild(M),d.appendChild(k);function se(C){o=C,C?ae.style.display="block":ae.style.display="none"}z.onchange=()=>se(!0),X.onchange=()=>se(!1);let ae=document.createElement("div");ae.id="step-1-2-consent",Object.assign(ae.style,r.stepBlock,{display:"none"});let fe=document.createElement("label");Object.assign(fe.style,r.label),ae.appendChild(fe);let de=document.createElement("div");Object.assign(de.style,r.radioContainer);let ge=document.createElement("div");Object.assign(ge.style,{display:"flex",alignItems:"center"});let ve=document.createElement("input");ve.type="radio",ve.name="consent-group",ve.value="Sim",ve.checked=!0,Object.assign(ve.style,r.checkboxInput);let re=document.createElement("label");re.htmlFor="consent-sim",Object.assign(re.style,{cursor:"pointer"}),ge.appendChild(ve),ge.appendChild(re);let J=document.createElement("div");Object.assign(J.style,{display:"flex",alignItems:"center"});let Oe=document.createElement("input");Oe.type="radio",Oe.name="consent-group",Oe.value="N\xE3o",Object.assign(Oe.style,r.checkboxInput);let Me=document.createElement("label");Me.htmlFor="consent-nao",Object.assign(Me.style,{cursor:"pointer"}),J.appendChild(Oe),J.appendChild(Me),de.appendChild(ge),de.appendChild(J),ae.appendChild(de),d.appendChild(ae);let Le=document.createElement("div");Le.id="step-1-5-snippets",Object.assign(Le.style,r.stepBlock,{display:"none"});let nt=document.createElement("h3");Object.assign(nt.style,r.h3),nt.textContent="Cen\xE1rios Comuns";let Ae=no(C=>{let L=document.querySelector("textarea");L&&(L.value=C,L.dispatchEvent(new Event("input")),L.style.transition="background-color 0.2s",L.style.backgroundColor="#e8f0fe",setTimeout(()=>L.style.backgroundColor="#fff",300))});Ae.id="snippet-container",Le.appendChild(nt),Le.appendChild(Ae),d.appendChild(Le);let he=document.createElement("div");he.id="step-3-form",Object.assign(he.style,r.stepBlock,{display:"none"});let dt=document.createElement("h3");Object.assign(dt.style,r.h3),he.appendChild(dt);let _e=document.createElement("div");_e.id="dynamic-form-fields-container",he.appendChild(_e);let ue=document.createElement("button");ue.textContent="+ Gostaria de selecionar uma task?",Object.assign(ue.style,r.optionalBtn),ue.onmouseover=()=>ue.style.background="#e8f0fe",ue.onmouseout=()=>ue.style.background="white",ue.onclick=()=>{ue.style.display="none",De.style.display="block",l.selectionElement.style.display="block"};let De=document.createElement("h3");Object.assign(De.style,r.h3,{marginTop:"20px"});let Nt=l.selectionElement;Object.assign(Nt.style,{marginBottom:"20px"}),he.appendChild(ue),he.appendChild(De),he.appendChild(Nt),he.appendChild(a.element),he.appendChild(l.screenshotsElement),d.appendChild(he);let Fe=document.createElement("div");Fe.id="step-4-email",Object.assign(Fe.style,{display:"none",marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #eee"});let Ge=document.createElement("label");Ge.style.display="flex",Ge.style.alignItems="center",Ge.style.cursor="pointer",Ge.style.fontSize="14px";let ze=document.createElement("input");ze.type="checkbox",ze.checked=!0,Object.assign(ze.style,r.checkboxInput),Ge.appendChild(ze),Ge.appendChild(document.createTextNode("Preencher email automaticamente?")),Fe.appendChild(Ge),d.appendChild(Fe);let Ue=document.createElement("div");Object.assign(Ue.style,{display:"none",gap:"8px",padding:"0"}),d.appendChild(Ue);let Ke=document.createElement("button");Object.assign(Ke.style,r.buttonBase,{backgroundColor:"#5f6368"}),Ke.textContent="Copiar";let Qe=document.createElement("button");Object.assign(Qe.style,r.buttonBase,{backgroundColor:"#1a73e8"}),Qe.textContent="Preencher",Ue.appendChild(Ke),Ue.appendChild(Qe);let Je=document.createElement("div");Object.assign(Je.style,We),Je.className="no-drag",Je.title="Redimensionar",u.appendChild(Je),Ye(u,Je),document.body.appendChild(u);function pt(C){e=C;let L=Ze();Object.assign(g.style,be),Object.assign(f.style,be),C==="bau"?(Object.assign(g.style,L),O.href="https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657"):(Object.assign(f.style,L),O.href="https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243"),w.value&&w.dispatchEvent(new Event("change"))}function P(C){try{if(Ne&&Ne[n]&&Ne[n][C])return Ne[n][C];if(Ne&&Ne.pt&&Ne.pt[C])return Ne.pt[C]}catch{}return C}function ho(){b.textContent=P("idioma"),j.textContent=P("fluxo"),c.textContent=P("status_principal"),x.textContent=P("substatus"),nt.textContent=P("cenarios_comuns"),De.textContent=P("selecione_tasks"),dt.textContent=P("preencha_detalhes"),Ke.textContent=P("copiar"),Qe.textContent=P("preencher"),S.querySelector('option[value=""]')&&(S.querySelector('option[value=""]').textContent=P("select_status")),w.querySelector('option[value=""]')&&(w.querySelector('option[value=""]').textContent=P("select_substatus")),F.textContent=P("caso_portugal"),N.textContent=P("sim"),te.textContent=P("nao"),fe.textContent=P("consentiu_gravacao"),re.textContent=P("sim"),Me.textContent=P("nao"),_e.querySelectorAll("label").forEach(C=>{let L=C.nextElementSibling.id.replace("field-",""),E=P(L.toLowerCase());E!==L.toLowerCase()?C.textContent=E:C.textContent=L.replace(/_/g," ").replace(/\b\w/g,H=>H.toUpperCase())+":"}),ue.textContent="+ "+(n==="pt"?"Gostaria de selecionar uma task?":"Quisiera seleccionar una tarea?")}function ut(C){n=C;let L=Ze();Object.assign(T.style,be),Object.assign(q.style,be),C==="pt"?(Object.assign(T.style,L),k.style.display="block",se(o)):(Object.assign(q.style,L),k.style.display="none",ae.style.display="none"),ho(),w.value&&w.dispatchEvent(new Event("change"))}function mt(C){(C.value.trim()===""||C.value.trim()==="\u2022")&&(C.value="\u2022 "),C.onkeydown=function(L){if(L.key==="Enter"){L.preventDefault();let E=this.selectionStart,H=this.selectionEnd,oe=this.value,ce=oe.lastIndexOf(`
`,E-1)+1,ye=oe.substring(ce,E),pe=ye.trim()==="\u2022"||ye.trim()===""?`
`:`
\u2022 `;this.value=oe.substring(0,E)+pe+oe.substring(H),this.selectionStart=this.selectionEnd=E+pe.length}else if(L.key==="Backspace"){let E=this.selectionStart;if(E===this.selectionEnd&&E>0){let H=this.value.substring(0,E);H.endsWith(`
\u2022 `)?(L.preventDefault(),this.value=H.substring(0,E-3)+this.value.substring(this.selectionEnd),this.selectionStart=this.selectionEnd=E-3):H==="\u2022 "&&(L.preventDefault(),this.value="",this.selectionStart=this.selectionEnd=0)}}}}function gt(){let C=typeof Ae<"u"?Ae:document.getElementById("snippet-container");if(!C)return;let L=C.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'),E={},H=new Set;L.forEach(K=>{let W=K.id,D=Se[W];if(D)for(let _ in D)_==="linkedTask"?H.add(D.linkedTask):_!=="type"&&(E[_]||(E[_]=[]),E[_].includes(D[_])||E[_].push(D[_]))});let oe=new Set;Object.values(Se).forEach(K=>{Object.keys(K).forEach(W=>{W!=="linkedTask"&&W!=="type"&&oe.add(W)})}),oe.forEach(K=>{let W=document.getElementById(K);if(W){let D=E[K]||[],_="";ot.includes(K.replace("field-",""))?(_=D.map($=>$.startsWith("\u2022 ")?$:"\u2022 "+$).join(`
`),_===""?_="\u2022 ":_.endsWith(`
\u2022 `)||(_+=`
\u2022 `)):_=D.join(`

`),_.trim()!=="\u2022"&&_.trim()!==""?W.value=_:ot.includes(K.replace("field-",""))?W.value="\u2022 ":W.value="",W.tagName==="TEXTAREA"&&typeof mt=="function"&&mt(W)}});let ce=new Set,ye=new Set;C.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(K=>{let W=Se[K.id];W&&W.linkedTask&&(K.checked?ce.add(W.linkedTask):ye.add(W.linkedTask))}),ye.forEach(K=>{ce.has(K)||l.toggleTask(K,!1)}),ce.forEach(K=>{l.toggleTask(K,!0)})}S.onchange=()=>{let C=S.value;if(bt(1.5),w.innerHTML=`<option value="">${P("select_substatus")}</option>`,!C){w.disabled=!0;return}for(let L in tt){let E=tt[L];if(E.status===C){let H=document.createElement("option");H.value=L,H.textContent=E.name,w.appendChild(H)}}w.disabled=!1},w.onchange=()=>{let C=w.value;if(bt(1.5),!C)return;l.updateSubStatus(C);let L=tt[C];Ae.innerHTML="";let E=(D,_,$)=>{let le=document.createElement("label");Object.assign(le.style,r.checkboxLabel),le.onmouseover=()=>le.style.backgroundColor="#e8eaed",le.onmouseout=()=>le.style.backgroundColor="#f8f9fa";let ee=document.createElement("input");return ee.type=_,ee.id=D.id,Object.assign(ee.style,r.checkboxInput),le.appendChild(ee),le.appendChild(document.createTextNode(` ${D.text}`)),$.appendChild(le),ee},H=[],oe="radio";if(C==="NI_Awaiting_Inputs")H=[{id:"quickfill-ni-inicio-manual",text:"In\xEDcio 2/6 (Manual)"},{id:"quickfill-ni-cms-access",text:"In\xEDcio 2/6 (ADV sem acesso ao CMS)"},{id:"quickfill-ni-followup-bau",text:"Follow-up 2/6 (BAU)"},{id:"quickfill-ni-followup-lm",text:"Follow-up 2/6 (LM)"}];else if(C.startsWith("SO_"))oe="checkbox",H=[{id:"quickfill-gtm-install",text:"Instala\xE7\xE3o do GTM"},{id:"quickfill-whatsapp",text:"Convers\xE3o de WhatsApp"},{id:"quickfill-form",text:"Convers\xE3o de Formul\xE1rio (Padr\xE3o)"},{id:"quickfill-ecw4-close",text:"Fechamento ECW4 (P\xF3s 7 dias)"}];else if(C.startsWith("AS_")){oe="checkbox";let D=document.createElement("label");D.textContent=P("cenarios_comuns"),Object.assign(D.style,r.label),Ae.appendChild(D),H=[{id:"quickfill-as-no-show",text:"Anunciante n\xE3o compareceu (respondeu e-mail)"},{id:"quickfill-as-insufficient-time",text:"Tempo insuficiente"},{id:"quickfill-as-no-access",text:"Anunciante sem acessos necess\xE1rios"}]}else C.startsWith("IN_")?H=[{id:"quickfill-in-nrp-bau",text:"NRP (BAU - 3 tentativas)"},{id:"quickfill-in-nrp-lm",text:"NRP (LM - Sem tentativas)"},{id:"quickfill-in-no-show-bau",text:"No-Show (BAU - 3 tentativas)"},{id:"quickfill-in-2-6-final",text:"Finaliza\xE7\xE3o 2/6 (Sem Resposta)"},{id:"quickfill-in-manual",text:"Outro (Manual)"}]:C.startsWith("DC_")&&(oe="radio",H=[{id:"quickfill-dc-lm-no-access",text:"LM - Sem acessos (Reagendar em BAU)"}]);let ce=H.filter(D=>{let _=Se[D.id];return!_.type||_.type==="all"||_.type===e});ce.forEach((D,_)=>{let $=E(D,oe,Ae);oe==="radio"&&($.name="scenario-radio-group",_===0&&($.checked=!0))}),ce.length>0&&(Le.style.display="block"),L.requiresTasks?(ue.style.display="none",De.style.display="block",l.selectionElement.style.display="block"):(ue.style.display="block",De.style.display="none",l.selectionElement.style.display="none"),_e.innerHTML="";let ye=L.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(ye)].forEach(D=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(D))return;let _=D.slice(1,-1),$=document.createElement("label"),le=P(_.toLowerCase());if($.textContent=le!==_.toLowerCase()?le:_.replace(/_/g," ").replace(/\b\w/g,B=>B.toUpperCase())+":",Object.assign($.style,r.label),_==="SPEAKEASY_ID"){let B=document.createElement("button");B.innerHTML='<span style="font-size:12px; margin-right:4px;">\u2728</span>Auto Busca',B.style.cssText=`
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
          `,B.title="Localizar Speakeasy ID no hist\xF3rico",B.onmouseover=()=>{B.style.backgroundColor="#c2e7ff",B.style.boxShadow="0 1px 2px rgba(0,0,0,0.1)"},B.onmouseout=()=>{B.style.backgroundColor="#d3e3fd",B.style.boxShadow="none"},B.onmousedown=()=>{B.style.backgroundColor="#a8c7fa",B.style.transform="scale(0.96)"},B.onmouseup=()=>B.style.transform="scale(1)",B.onclick=me=>{me.preventDefault(),Yt(`field-${_}`)},$.appendChild(B)}let ee;ot.includes(_)?(ee=document.createElement("textarea"),Object.assign(ee.style,r.textarea),ee.classList.add("bullet-textarea"),mt(ee)):St.includes(_)?(ee=document.createElement("textarea"),Object.assign(ee.style,r.textarea)):(ee=document.createElement("input"),ee.type="text",Object.assign(ee.style,r.input),_==="REASON_COMMENTS"&&(C.startsWith("NI_")||C.startsWith("IN_"))&&(Object.assign($.style,{display:"none"}),Object.assign(ee.style,{display:"none"}))),_==="ON_CALL"&&e==="lm"&&(Object.assign($.style,{display:"none"}),Object.assign(ee.style,{display:"none"}),ee.value="N/A"),ee.id=`field-${_}`,_e.appendChild($),_e.appendChild(ee)});let K=Ae.querySelectorAll('input[type="checkbox"], input[type="radio"]');K.length>0&&(K.forEach(D=>{D.removeEventListener("change",gt),D.addEventListener("change",gt)}),gt()),he.style.display="block",st[C]?Fe.style.display="block":Fe.style.display="none",Ue.style.display="flex";let W=l.getCheckedElements().map(D=>D.value);a.updateVisibility(C,W)},ue.onclick=()=>{ue.style.display="none",De.style.display="block",l.selectionElement.style.display="block"};function _t(){let C=w.value;if(!C)return null;let E=tt[C].template.replace(/\n/g,"<br>"),H='style="margin-bottom: 12px; padding-left: 30px;"',oe=[],ce="",ye=l.getCheckedElements();ye.length>0&&ye.forEach(W=>{let D=W.value,_=Re[D],$=W.closest().querySelector(".stepper-count"),le=$?parseInt($.textContent):1;le>1?oe.push(`${_.name} (x${le})`):oe.push(_.name)});let pe=l.screenshotsElement;if(pe){let W=Array.from(pe.querySelectorAll('input[id^="name-"]'));W.length>0&&W.forEach(D=>{let _=D.value,$=D.closest(".cw-screen-card");if($){let le=$.querySelectorAll('input[id^="screen-"]'),ee=!1,B="";le.forEach(me=>{let Rt=me.closest(".cw-input-group"),Mt=Rt?Rt.querySelector(".cw-input-label"):null,xo=Mt?Mt.textContent:"Evid\xEAncia",Lt=me.value.trim(),yo=Lt?` ${Lt}`:"";B+=`<li>${xo} -${yo}</li>`,ee=!0}),ee&&(ce+=`<b>${_}</b>`,ce+=`<ul ${H}>${B}</ul>`)}})}if(E.includes("{TAGS_IMPLEMENTED}")?E=E.replace(/{TAGS_IMPLEMENTED}/g,oe.join(", ")||"N/A"):oe.length>0&&(E+=`<br><b>Tags:</b> ${oe.join(", ")}<br>`),E.includes("{SCREENSHOTS_LIST}")?E=E.replace(/{SCREENSHOTS_LIST}/g,ce?`${ce}`:"N/A"):ce!==""&&(E+=`<br>${ce}`),n==="pt"&&o){let W=ve.checked?P("sim"):P("nao");E=E.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${P("consentiu_gravacao")}</b> ${W}<br><br>`),E=E.replace(/{CASO_PORTUGAL}/g,`<br><b>${P("caso_portugal")}</b> ${P("sim")}<br>`)}else n==="pt"&&!o?(E=E.replace(/{CASO_PORTUGAL}/g,`<br><b>${P("caso_portugal")}</b> ${P("nao")}<br>`),E=E.replace(/{CONSENTIU_GRAVACAO}/g,"")):(E=E.replace(/{CASO_PORTUGAL}/g,""),E=E.replace(/{CONSENTIU_GRAVACAO}/g,""));return _e.querySelectorAll("input, textarea").forEach(W=>{let D=W.id.replace("field-",""),_=new RegExp(`{${D}}`,"g"),$=W.value;if(D==="REASON_COMMENTS"&&(C.startsWith("NI_")||C.startsWith("IN_"))){let B=Ae.querySelector('input[type="radio"]:checked');B&&Se[B.id]&&($=Se[B.id]["field-REASON_COMMENTS"])}if(ot.includes(D)&&$.trim()!==""){let B=$.split(`
`).map(me=>me.trim()).filter(me=>me!==""&&me!=="\u2022").map(me=>me.startsWith("\u2022 ")?me.substring(2):me).map(me=>`<li>${me}</li>`).join("");$=B?`<ul ${H}>${B}</ul>`:""}else St.includes(D)?$=$.split(`
`).filter(B=>B.trim()!=="").map(B=>`<p style="margin: 0 0 8px 0;">${B}</p>`).join(""):W.tagName==="TEXTAREA"&&($=$.replace(/\n/g,"<br>"));let le=$.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(le===""||le==="\u2022"||le.toLowerCase()==="n/a"){let B=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${D}\\}(?:<br>\\s*)?`,"gi");B.test(E)?E=E.replace(B,""):E=E.replace(_,"")}else E=E.replace(_,$.replace(/\$/g,"$$$$"))}),E=E.replace(/{([A-Z0-9_]+)}/g,""),E=E.replace(/(<br>){3,}/g,"<br><br>"),typeof a<"u"&&a.getOutput&&(E+=a.getOutput()),E}Ke.onclick=()=>{let C=_t();C?(Ot(C),ne(P("copiado_sucesso"))):ne(P("selecione_substatus"),{error:!0})},Qe.onclick=async()=>{let C=w.value,L=_t();if(!L){ne(P("selecione_substatus"),{error:!0});return}Ot(L),ft();let E=Xe(),H=await ro();if(H)try{if(H.focus(),H.innerHTML.trim()==="<p><br></p>"||H.innerHTML.trim()==="<br>"||H.innerText.trim()===""){let pe=document.createRange();pe.selectNodeContents(H);let K=window.getSelection();K.removeAllRanges(),K.addRange(pe),document.execCommand("delete",!1,null)}else if(!H.innerHTML.endsWith("<br><br>")){let pe=document.createRange();pe.selectNodeContents(H),pe.collapse(!1);let K=window.getSelection();K.removeAllRanges(),K.addRange(pe),document.execCommand("insertHTML",!1,"<br><br>")}document.execCommand("insertHTML",!1,L),so(H),setTimeout(()=>{ne(P("inserido_copiado"))},600);let ce=typeof ze<"u"&&ze?ze.checked:!0;if(C&&st[C]&&ce){let pe=st[C];await Kt(pe),await new Promise(K=>setTimeout(K,500))}E(),bt(1.5),S.value="",w.innerHTML=`<option value="">${P("select_substatus")}</option>`,w.disabled=!0}catch(oe){console.error(oe),ne("Erro ao inserir.",{error:!0}),E()}};function bt(C=1.5){C<=1.5&&(Le.style.display="none",Ae.innerHTML=""),C<=2&&(l.reset(),ue.style.display="none"),C<=3&&(he.style.display="none",_e.innerHTML="",a.reset(),Ue.style.display="none",Fe.style.display="none")}function ft(){if(i=!i,i){let C=u.querySelector(".cw-expand-btn");C&&typeof C.resetState=="function"&&C.resetState()}Te(i,u,"cw-btn-notes")}return pt("bau"),ut("pt"),ft}var Ve={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function uo(){let t="v4.0.0",e=Object.keys(Ve)[0],n="",o="list",i={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:"#FAFAFA"},r={display:"flex",width:"200%",height:"100%",transition:"transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",transform:"translateX(0)"},a={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},l={width:"100%",padding:"10px 12px 10px 36px",borderRadius:"8px",border:"none",background:"#F0F2F5",fontSize:"14px",color:"#202124",boxSizing:"border-box",outline:"none",transition:"all 0.2s ease",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"10px center"},u={display:"flex",gap:"6px",padding:"4px 4px 8px 4px",overflowX:"auto",scrollbarWidth:"none"},m={padding:"6px 12px",borderRadius:"16px",border:"1px solid transparent",background:"transparent",color:"#5f6368",fontSize:"12px",fontWeight:"500",cursor:"pointer",transition:"all 0.2s ease",flexShrink:"0"},A={background:"#E8F0FE",color:"#1967D2",fontWeight:"600"},d={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",marginBottom:"6px",borderRadius:"8px",background:"#fff",border:"1px solid #dadce0",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",position:"relative",overflow:"hidden"},y=!1,h=document.createElement("div");h.id="quick-email-popup",h.classList.add("cw-module-window"),Object.assign(h.style,we,{right:"100px",width:"480px",height:"600px",transition:"width 0.3s ease, height 0.3s ease"});let b={popup:h,googleLine:null,focusElement:null};function v(){y=!y,Te(y,h,"cw-btn-email"),y||setTimeout(()=>O(),300)}let T=Ee(h,"Emails R\xE1pidos",t,"Selecione, visualize e insira com um clique.",b,()=>v()),q=document.createElement("div");Object.assign(q.style,i);let R=document.createElement("div");Object.assign(R.style,r);let j=document.createElement("div");Object.assign(j.style,a);let U=document.createElement("div");Object.assign(U.style,{padding:"16px 16px 4px 16px",flexShrink:"0",background:"#fff",zIndex:"10",display:"flex",flexDirection:"column",gap:"8px",borderBottom:"1px solid #f1f3f4"});let g=document.createElement("input");g.placeholder="Buscar template...",Object.assign(g.style,l),g.onfocus=()=>{g.style.background="#fff",g.style.boxShadow="0 2px 8px rgba(0,0,0,0.05)"},g.onblur=()=>{g.style.background="#F0F2F5",g.style.boxShadow="none"},b.focusElement=g;let f=document.createElement("div");Object.assign(f.style,u);let s=document.createElement("div");Object.assign(s.style,{padding:"12px 16px",overflowY:"auto",flexGrow:"1"}),U.appendChild(g),U.appendChild(f),j.appendChild(U),j.appendChild(s);let c=document.createElement("div");Object.assign(c.style,a);let S=document.createElement("div");Object.assign(S.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),c.appendChild(S),R.appendChild(j),R.appendChild(c),q.appendChild(R),h.appendChild(T),h.appendChild(q);let p=document.createElement("div");Object.assign(p.style,{padding:"8px 16px",borderTop:"1px solid #eee",textAlign:"center",fontSize:"10px",color:"#9aa0a6",background:"#fff",flexShrink:"0"}),p.textContent="created by lucaste@",h.appendChild(p),document.body.appendChild(h);function x(F){o="detail",R.style.transform="translateX(-50%)";let M='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',I='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';S.innerHTML=`
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
                ${M}
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
      `;let z=S.querySelector("#csa-back-btn");z.onmouseover=()=>z.style.backgroundColor="#f1f3f4",z.onmouseout=()=>z.style.backgroundColor="transparent",z.onclick=O;let N=S.querySelector("#csa-insert-btn");N.onmouseover=()=>N.style.backgroundColor="#174ea6",N.onmouseout=()=>N.style.backgroundColor="#1a73e8",N.onclick=async()=>{console.log("\u{1F50D} DEBUG: Clique detectado"),console.log("\u{1F50D} DEBUG: triggerProcessingAnimation \xE9:",typeof Xe),N.style.transform="scale(0.96)",v(),console.log("\u{1F50D} DEBUG: Janela fechada");try{console.log("\u{1F50D} DEBUG: Chamando anima\xE7\xE3o...");let Y=Xe();console.log("\u{1F50D} DEBUG: finishLoading \xE9:",typeof Y),console.log("\u{1F50D} DEBUG: Iniciando espera de 1s..."),await new Promise(X=>setTimeout(X,1e3)),console.log("\u{1F50D} DEBUG: Rodando l\xF3gica do email..."),await Et(F),console.log("\u{1F50D} DEBUG: Finalizando anima\xE7\xE3o..."),typeof Y=="function"?Y():console.error("\u274C ERRO: finishLoading n\xE3o \xE9 uma fun\xE7\xE3o! A anima\xE7\xE3o falhou ao iniciar.")}catch(Y){console.error("\u274C ERRO NO PROCESSO:",Y);let X=document.querySelector(".cw-focus-backdrop");X&&X.classList.remove("active")}setTimeout(()=>{N.style.transform="scale(1)",typeof O=="function"&&O()},300)}}function O(){o="list",R.style.transform="translateX(0)"}function w(){f.innerHTML="",Object.keys(Ve).forEach(F=>{let M=Ve[F],I=document.createElement("button");I.textContent=M.title,Object.assign(I.style,m),e===F&&n===""&&Object.assign(I.style,A),I.onclick=()=>{e=F,n="",g.value="",w(),k()},f.appendChild(I)})}function k(){s.innerHTML="";let F=[];if(n.trim()!==""?Object.values(Ve).forEach(z=>{let N=z.emails.filter(Y=>Y.name.toLowerCase().includes(n.toLowerCase()));F=[...F,...N]}):Ve[e]&&(F=Ve[e].emails),F.length===0){s.innerHTML='<div style="text-align:center; padding:60px 20px; color:#9aa0a6;"><div style="font-size:24px; margin-bottom:8px;">\u{1F50D}</div><div style="font-size:14px;">Nenhum template encontrado.</div></div>';return}let M='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>',I='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';F.forEach(z=>{let N=document.createElement("div");Object.assign(N.style,d);let Y=z.subject.length>50?z.subject.substring(0,50)+"...":z.subject;N.innerHTML=`
        <div style="flex-grow: 1; margin-right: 12px; min-width: 0;">
            <div style="font-size:13px; font-weight:600; color:#202124; margin-bottom:2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${z.name}</div>
            <div style="font-size:12px; color:#5f6368; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${Y}</div>
        </div>
        <div style="display:flex; gap:6px;">
            <button class="action-btn view" title="Visualizar" style="width:32px; height:32px; border-radius:50%; border:none; background:#f1f3f4; color:#5f6368; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">${I}</button>
            <button class="action-btn send" title="Inserir Agora" style="width:32px; height:32px; border-radius:50%; border:none; background:#e8f0fe; color:#1a73e8; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">${M}</button>
        </div>
      `,N.onmouseenter=()=>{N.style.background="#F8F9FA",N.style.borderColor="#1a73e8"},N.onmouseleave=()=>{N.style.background="#fff",N.style.borderColor="#dadce0"};let X=N.querySelector(".view");X.onclick=se=>{se.stopPropagation(),x(z)},X.onmouseenter=()=>{X.style.background="#d2e3fc",X.style.color="#174ea6"},X.onmouseleave=()=>{X.style.background="#f1f3f4",X.style.color="#5f6368"};let te=N.querySelector(".send");te.onclick=async se=>{se.stopPropagation(),te.style.transform="scale(0.9)",setTimeout(()=>te.style.transform="scale(1)",150),v();let ae=Xe();try{await new Promise(fe=>setTimeout(fe,800)),await Et(z),ae()}catch(fe){console.error("Erro no envio r\xE1pido:",fe),ae()}},te.onmouseenter=()=>{te.style.background="#1a73e8",te.style.color="#fff",te.style.boxShadow="0 2px 6px rgba(26,115,232,0.3)"},te.onmouseleave=()=>{te.style.background="#e8f0fe",te.style.color="#1a73e8",te.style.boxShadow="none"},N.onclick=()=>x(z),s.appendChild(N)})}return g.addEventListener("input",F=>{n=F.target.value,n!==""?Array.from(f.children).forEach(M=>Object.assign(M.style,m)):w(),k()}),w(),k(),v}var mo={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function go(){let t="v2.1 (Apple Motion)",e={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#f8f9fa",scrollBehavior:"smooth"},card:{background:"#ffffff",border:"1px solid #dadce0",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"13px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"10px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.15s ease, opacity 0.3s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.5",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"20px",height:"20px",borderRadius:"6px",border:"2px solid #dadce0",marginRight:"14px",marginTop:"1px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #eee",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"}},n={},o="PT",i="BAU",r=!1,a=document.createElement("div");a.id="call-script-popup",a.classList.add("cw-module-window"),Object.assign(a.style,we,{right:"auto",left:"50%",width:"400px",height:"650px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let l={popup:a,googleLine:null};function u(){r=!r,Te(r,a,"cw-btn-script")}let m=Ee(a,"Call Script",t,"Guia interativo para condu\xE7\xE3o de chamadas.",l,()=>{u()});a.appendChild(m);let A=document.createElement("div");Object.assign(A.style,e.progressBarContainer);let d=document.createElement("div");Object.assign(d.style,e.progressBarFill),A.appendChild(d),a.appendChild(A);let y=document.createElement("div");y.id="csa-content",Object.assign(y.style,e.contentArea),a.appendChild(y);let h=document.createElement("div");Object.assign(h.style,e.footer);let b=document.createElement("span");b.textContent="by lucaste@",Object.assign(b.style,{fontSize:"10px",color:"#bdc1c6"});let v=document.createElement("button");v.innerHTML=`
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
    Resetar Script
  `,Object.assign(v.style,e.resetBtn),v.onmouseenter=()=>v.style.background="#fce8e6",v.onmouseleave=()=>v.style.background="transparent",v.onclick=()=>{v.style.transform="scale(0.9)",setTimeout(()=>v.style.transform="scale(1)",150);for(let O in n)delete n[O];c()},h.appendChild(b),h.appendChild(v),a.appendChild(h);let T=document.createElement("div");Object.assign(T.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let q=document.createElement("div");Object.assign(q.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let R=document.createElement("div");R.textContent="BAU";let j=document.createElement("div");j.textContent="LT",Object.assign(R.style,be),Object.assign(j.style,be),q.appendChild(R),q.appendChild(j);let U=document.createElement("select");Object.assign(U.style,Ht,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),U.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',U.value=o,T.appendChild(q),T.appendChild(U),y.appendChild(T);let g=document.createElement("div");g.id="csa-checklist-area",y.appendChild(g);let f=document.createElement("div");Object.assign(f.style,We),f.className="no-drag",f.title="Redimensionar",a.appendChild(f),Ye(a,f),document.body.appendChild(a);function s(O){return O}function c(){g.innerHTML="";let O=`${o} ${i}`,w=mo[O];if(!w){g.innerHTML=`<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <div style="font-size: 24px;">\u2615</div>
        <div>Script n\xE3o configurado.</div>
      </div>`,d.style.width="0%";return}let k=w.color||"#1a73e8",F=0,M=0;["inicio","fim"].forEach(I=>{w[I]&&(F+=w[I].length)}),["inicio","fim"].forEach((I,z)=>{let N=w[I];if(!N||N.length===0)return;let Y=document.createElement("div");Object.assign(Y.style,e.card);let X=document.createElement("div");Object.assign(X.style,e.cardTitle);let te=I==="inicio"?"Abertura":"Fechamento";o.includes("ES")&&(te=I==="inicio"?"Apertura":"Cierre"),o.includes("EN")&&(te=I==="inicio"?"Opening":"Closing"),X.textContent=te;let se=document.createElement("span");se.style.fontSize="11px",se.style.opacity="0.7",se.style.fontWeight="500",se.style.background="#f1f3f4",se.style.padding="2px 8px",se.style.borderRadius="10px",X.appendChild(se),Y.appendChild(X);let ae=0;N.forEach((fe,de)=>{let ge=`${O}-${I}-${de}`,ve=!!n[ge];ve&&(M++,ae++);let re=document.createElement("div");Object.assign(re.style,e.itemRow);let J=document.createElement("div");Object.assign(J.style,e.checkbox);let Oe=document.createElement("span");Oe.innerHTML=fe,Oe.style.flex="1",ve?(Object.assign(re.style,e.itemCompleted),J.style.background=k,J.style.borderColor=k,J.style.transform="scale(1)",J.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(re.style.textDecoration="none",re.style.opacity="1",J.style.background="transparent",J.style.borderColor="#dadce0",J.style.transform="scale(1)",J.innerHTML=""),re.onclick=()=>{let Me=!n[ge];n[ge]=Me,Q.playClick(),Me?(J.style.transform="scale(1.2)",setTimeout(()=>J.style.transform="scale(1)",150),Object.assign(re.style,e.itemCompleted),J.style.background=k,J.style.borderColor=k,J.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(re.style.textDecoration="none",re.style.opacity="1",J.style.background="transparent",J.style.borderColor="#dadce0",J.innerHTML=""),S(O,w)},re.onmouseenter=()=>{n[ge]||(re.style.background="#f1f3f4",J.style.borderColor=k)},re.onmouseleave=()=>{n[ge]||(re.style.background="transparent",J.style.borderColor="#dadce0")},re.appendChild(J),re.appendChild(Oe),Y.appendChild(re)}),ae===N.length&&N.length>0&&(se.style.color="#1e8e3e",se.style.background="#e6f4ea",Y.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),se.textContent=`${ae}/${N.length}`,g.appendChild(Y)}),p(F,M)}function S(O,w){let k=0,F=0;["inicio","fim"].forEach(M=>{let I=w[M]||[];k+=I.length;let z=0;I.forEach((N,Y)=>{n[`${O}-${M}-${Y}`]&&(F++,z++)})}),p(k,F),setTimeout(()=>c(),200)}function p(O,w){let k=O===0?0:w/O*100;d.style.width=`${k}%`,k===100?d.style.background="#34A853":d.style.background="linear-gradient(90deg, #4285F4, #34A853)"}function x(O){i=O;let w=Ze();Object.assign(R.style,be),Object.assign(j.style,be),Object.assign(O==="BAU"?R.style:j.style,w),c()}return R.onclick=()=>x("BAU"),j.onclick=()=>x("LT"),U.addEventListener("change",O=>{o=O.target.value,c()}),x(i),u}var ct={lm:{label:"LM Forms",links:[{name:"Relat\xF3rio de Ocorr\xEAncias",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas operacionais | Aviso de pausas"},{name:"Chamadas Excedidas (>50min)",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro de chamadas longas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema/ferramenta"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"Enviar casos para BAU/Solicitar Descarte/Abrir Monitoria para AMs"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo dos Anunciantes"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos complicados de atender"}]},suporte:{label:"Central de Ajuda",links:[{name:"Suporte Google Ads",url:"https://support.google.com/google-ads/",desc:"Oficial"},{name:"Suporte GA4",url:"https://support.google.com/analytics/",desc:"Oficial"},{name:"Suporte Merchant Center",url:"https://support.google.com/merchants/gethelp",desc:"Oficial"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. oficial sobre CSP"},{name:"Doc. Enhanced Conversion",url:"https://support.google.com/google-ads/answer/9888656?hl=en",desc:"Como funcionam as convers\xF5es otimizadas?"},{name:"Doc. CoMo",url:"https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=pt-br",desc:"Doc. oficial sobre Consent Mode"}]},outros:{label:"Diversos",links:[{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form para solicitar grava\xE7\xE3o da chamada."}]}};function bo(){let t="v2.4.5",e="lm",n="",o={width:"100%",padding:"10px 12px 10px 36px",borderRadius:"8px",border:"1px solid #dadce0",background:"#f8f9fa",fontSize:"14px",boxSizing:"border-box",outline:"none",color:"#3c4043",transition:"background 0.2s, border-color 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"10px center"},i={display:"flex",flexWrap:"wrap",gap:"8px",paddingBottom:"8px"},r={padding:"6px 16px",borderRadius:"16px",border:"1px solid #dadce0",background:"transparent",color:"#5f6368",fontSize:"13px",fontWeight:"500",cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s ease",marginBottom:"4px"},a={background:"#e8f0fe",color:"#1967d2",borderColor:"#e8f0fe",fontWeight:"600"},l={display:"flex",alignItems:"center",padding:"10px 14px",borderRadius:"12px",cursor:"pointer",border:"1px solid transparent",marginBottom:"6px",background:"#ffffff",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), background 0.2s",boxShadow:"0 1px 2px rgba(0,0,0,0.02)",opacity:"0",transform:"translateY(10px)"},u={width:"36px",height:"36px",borderRadius:"10px",background:"#f1f3f4",color:"#5f6368",display:"flex",alignItems:"center",justifyContent:"center",marginRight:"14px",fontSize:"18px",flexShrink:"0"},m=document.createElement("div");m.id="feedback-popup",m.classList.add("cw-module-window"),Object.assign(m.style,we,{right:"100px",width:"500px"});let A={lm:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z"/></svg>',outros:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c-1.49 0-2.61 1.12-2.61 2.5s1.12 2.5 2.61 2.5H2v4c0 1.1.9 2 2 2h4v1.5c0 1.49 1.12 2.61 2.5 2.61s2.5-1.12 2.5-2.61V19h4c1.1 0 2-.9 2-2v-4h1.5c1.49 0 2.61-1.12 2.61-2.5S21.99 11 20.5 11z"/></svg>'},d={popup:m,googleLine:null,focusElement:null},y=!1,h=Ee(m,"Links \xDAteis",t,"Acesso r\xE1pido a formul\xE1rios internos (Ocorr\xEAncias, Bugs) e documenta\xE7\xF5es oficiais de suporte.",d,()=>g());m.appendChild(h);let b=document.createElement("div");Object.assign(b.style,{padding:"16px",display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid #f1f3f4",flexShrink:"0",backgroundColor:"#fff"});let v=document.createElement("input");v.type="text",v.placeholder="Buscar link, form ou ajuda...",Object.assign(v.style,o),d.focusElement=v,v.onfocus=()=>{v.style.borderColor="#1a73e8",v.style.backgroundColor="#fff"},v.onblur=()=>{v.style.borderColor="#dadce0",v.style.backgroundColor="#f8f9fa"};let T=document.createElement("div");Object.assign(T.style,i),b.appendChild(v),b.appendChild(T),m.appendChild(b);let q=document.createElement("div");Object.assign(q.style,{padding:"0 8px 8px 8px",overflowY:"auto",flexGrow:"1"}),m.appendChild(q);let R=document.createElement("div");Object.assign(R.style,{padding:"8px 16px",borderTop:"1px solid #eee",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"10px",color:"#9aa0a6"}),R.innerHTML="<span>by lucaste@</span>",m.appendChild(R),document.body.appendChild(m);function j(){T.innerHTML="",Object.keys(ct).forEach(f=>{let s=ct[f],c=document.createElement("button"),S=A[f]||"";c.innerHTML=`
        <span style="display:inline-flex; align-items:center; margin-right:6px; vertical-align:middle;">
            ${S}
        </span> 
        ${s.label}
      `,Object.assign(c.style,r),c.style.display="inline-flex",c.style.alignItems="center",e===f&&n===""&&Object.assign(c.style,a),c.onmousedown=()=>c.style.transform="scale(0.95)",c.onmouseup=()=>c.style.transform="scale(1)",c.onmouseleave=()=>c.style.transform="scale(1)",c.onclick=()=>{e=f,n="",v.value="",j(),U()},T.appendChild(c)})}function U(){q.innerHTML="";let f=[],s=n.trim()!=="";if(s?Object.entries(ct).forEach(([c,S])=>{let p=S.links.filter(x=>x.name.toLowerCase().includes(n.toLowerCase())||x.desc.toLowerCase().includes(n.toLowerCase()));p.forEach(x=>{x._catIcon=A[c],x._categoryName=S.label}),f=[...f,...p]}):(f=ct[e].links,f.forEach(c=>c._catIcon=A[e])),f.length===0){q.innerHTML=`
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px; opacity:0.6;">
            <div style="font-size:32px; margin-bottom:10px;">\u{1F50D}</div>
            <div style="font-size:13px; color:#5f6368;">Nenhum link encontrado.</div>
        </div>`;return}f.forEach((c,S)=>{let p=document.createElement("div");Object.assign(p.style,l);let x=document.createElement("div");Object.assign(x.style,u),x.innerHTML=c._catIcon||'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',x.style.display="flex",x.style.alignItems="center",x.style.justifyContent="center",x.style.color="#5f6368",p.appendChild(x);let O=document.createElement("div");O.style.flexGrow="1";let w=N=>{if(!s)return N;let Y=new RegExp(`(${n})`,"gi");return N.replace(Y,'<span style="color:#1a73e8; font-weight:700;">$1</span>')},k=`<div style="font-size:14px; font-weight:500; color:#202124;">${w(c.name)}</div>`,F=`<div style="font-size:11px; color:#5f6368; margin-top:2px;">${w(c.desc)}</div>`;O.innerHTML=k+F,p.appendChild(O);let M=document.createElement("div");M.style.display="flex",M.style.gap="4px",M.style.opacity="0",M.style.transition="opacity 0.2s";let I=document.createElement("div");I.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',Object.assign(I.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#5f6368",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"}),I.onclick=N=>{Q.playClick(),N.stopPropagation(),navigator.clipboard.writeText(c.url),I.style.transform="scale(1.2)",I.style.color="#1e8e3e",I.style.backgroundColor="#e6f4ea",setTimeout(()=>{I.style.transform="scale(1)",I.style.color="#5f6368",I.style.backgroundColor="transparent"},800)},I.onmouseenter=()=>I.style.backgroundColor="#f1f3f4",I.onmouseleave=()=>I.style.backgroundColor="transparent",M.appendChild(I);let z=document.createElement("div");z.innerHTML="\u2197",Object.assign(z.style,{width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",color:"#dadce0",fontSize:"16px"}),M.appendChild(z),p.appendChild(M),p.onclick=()=>window.open(c.url,"_blank"),p.onmouseenter=()=>{p.style.backgroundColor="#f8f9fa",p.style.transform="scale(1.01)",M.style.opacity="1",z.style.color="#1a73e8"},p.onmouseleave=()=>{p.style.backgroundColor="#ffffff",p.style.transform="scale(1)",M.style.opacity="0",z.style.color="#dadce0"},q.appendChild(p),requestAnimationFrame(()=>{p.style.transition="opacity 0.3s ease, transform 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.2)",setTimeout(()=>{p.style.opacity="1",p.style.transform="translateY(0)"},S*40)})})}v.addEventListener("input",f=>{n=f.target.value,n!==""?Array.from(T.children).forEach(s=>{s.style.backgroundColor="transparent",s.style.color="#5f6368",s.style.borderColor="#dadce0"}):j(),U()});function g(){y=!y,Te(y,m,"cw-btn-links")}return j(),U(),g}var $e=[];function It(t){$e=t}function fo(){let t="v2.5 (Emoji Fix)",e=!1,n=null,o=60*1e3;function i(s){if(!s)return"";try{let c=new Date(s);return isNaN(c.getTime())?String(s):c.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(s)}}let r={critical:{bg:"#FEF2F2",border:"#FECACA",text:"#991B1B",icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>'},info:{bg:"#EFF6FF",border:"#BFDBFE",text:"#1E40AF",icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{bg:"#F0FDF4",border:"#BBF7D0",text:"#166534",icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}},a={feedContainer:{padding:"24px",overflowY:"auto",flexGrow:"1",background:"#FAFAFA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.06)",boxShadow:"0 4px 12px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.02)",overflow:"hidden",transition:"all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.04)",boxShadow:"none",opacity:"0.8",filter:"grayscale(0.3)",marginBottom:"16px",flexShrink:"0"},cardHeader:{padding:"12px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(0,0,0,0.04)",fontSize:"12px",fontWeight:"600",letterSpacing:"0.5px",textTransform:"uppercase"},msgTitle:{padding:"20px 20px 8px 20px",fontSize:"16px",fontWeight:"700",color:"#202124",letterSpacing:"-0.01em",lineHeight:"1.4"},metaContainer:{padding:"0 20px 12px 20px",display:"flex",alignItems:"center",gap:"8px",fontSize:"12px",color:"#5f6368"},cardBody:{padding:"0 20px 24px 20px",fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",fontFamily:"'Google Sans', Roboto, sans-serif",wordBreak:"break-word",overflowWrap:"break-word"},emojiImg:"height: 20px; vertical-align: text-bottom; margin: 0 2px;",dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},markAllBtn:{fontSize:"12px",color:"#1a73e8",cursor:"pointer",fontWeight:"600",background:"transparent",border:"none",padding:"8px",transition:"opacity 0.2s"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 0",color:"#bdc1c6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"10px 0 20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"10px",borderRadius:"8px",transition:"background 0.2s"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",paddingTop:"10px",borderTop:"1px dashed rgba(0,0,0,0.1)"}},l="cw-scrollbar-style";if(!document.getElementById(l)){let s=document.createElement("style");s.id=l,s.innerHTML=".cw-nice-scroll::-webkit-scrollbar { width: 5px; } .cw-nice-scroll::-webkit-scrollbar-track { background: transparent; } .cw-nice-scroll::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 10px; }",document.head.appendChild(s)}function u(s){if(!s||typeof s!="string")return"";let c=s,S=/(https?:\/\/[^\s]+)|(www\.[^\s]+)/g;return c=c.replace(S,p=>{let x=p;return x.startsWith("http")||(x="http://"+x),`<a href="${x}" target="_blank" style="color:#1967d2; text-decoration:underline;">${p}</a>`}),c=c.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),c=c.replace(/_(.*?)_/g,"<i>$1</i>"),c=c.replace(/\n/g,"<br>"),c=$t(c),c=c.replace(/@todos|@all/gi,'<span style="background:#e8f0fe; color:#1967d2; padding:1px 5px; border-radius:4px; font-weight:600; font-size:12px;">@todos</span>'),c}let m=document.createElement("div");m.id="broadcast-popup",m.classList.add("cw-module-window"),Object.assign(m.style,we,{right:"auto",left:"50%",width:"450px",height:"650px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let A={popup:m,googleLine:null};function d(){if(e=!e,Te(e,m,"cw-btn-broadcast"),e){let s=document.getElementById("cw-btn-broadcast");s&&s.classList.remove("has-new"),v()}}let y=Ee(m,"Operations Feed",t,"Atualiza\xE7\xF5es oficiais da opera\xE7\xE3o.",A,()=>d()),h=y.querySelector(".cw-header-actions")||y.lastElementChild;if(h){let s=document.createElement("button");s.textContent="Limpar tudo",Object.assign(s.style,a.markAllBtn),s.onclick=c=>{c.stopPropagation(),Q.playSuccess();let S=$e.map(p=>p.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(S)),R(),T()},h.insertBefore(s,h.firstChild)}m.appendChild(y);let b=document.createElement("div");b.className="cw-nice-scroll",Object.assign(b.style,a.feedContainer),m.appendChild(b);async function v(){let s=document.getElementById("cw-update-status");e&&(s||(s=document.createElement("div"),s.id="cw-update-status",s.style.cssText="padding: 6px; text-align: center; font-size: 11px; color: #5f6368; background: #f8f9fa; border-bottom: 1px solid #e0e0e0;",b.parentNode.insertBefore(s,b)),s.innerHTML="\u23F3 Verificando atualiza\xE7\xF5es...",s.style.display="block");let c=$e.map(p=>p.id),S=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");try{let p=await Pe.fetchData();p&&p.broadcast&&(e&&s&&(p.broadcast.some(O=>!c.includes(O.id))?(s.innerHTML="\u2705 Novos avisos sincronizados!",s.style.backgroundColor="#e6f4ea",s.style.color="#137333"):s.innerHTML="\u{1F539} Tudo atualizado.",setTimeout(()=>{s&&(s.style.display="none")},1500)),c.length>0&&p.broadcast.filter(w=>!c.includes(w.id)).filter(w=>!S.includes(w.id)).length>0&&(console.log("\u{1F514} Novo aviso detectado! Tocando som."),Q.playNotification()),It(p.broadcast),T(),e&&R())}catch(p){console.error("Erro no update:",p),e&&s&&(s.innerHTML="\u26A0\uFE0F Falha na conex\xE3o.",s.style.backgroundColor="#fce8e6")}}function T(){let s=document.getElementById("cw-btn-broadcast");if(!s)return;let c=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if($e.some(p=>!c.includes(p.id))){if(s.classList.add("has-new"),!s.querySelector(".cw-badge")){let p=document.createElement("div");p.className="cw-badge",Object.assign(p.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),s.appendChild(p)}}else{s.classList.remove("has-new");let p=s.querySelector(".cw-badge");p&&p.remove()}}let q=Pe.getCachedBroadcasts();q.length>0&&(It(q),R()),v(),n||(n=setInterval(v,o));function R(){b.innerHTML="";let s=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),c=[...$e].sort((x,O)=>{let w=s.includes(x.id),k=s.includes(O.id);return w===k?0:w?1:-1});if(c.every(x=>s.includes(x.id))){let x=document.createElement("div");Object.assign(x.style,a.emptyState),x.innerHTML=`
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#dadce0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Voc\xEA est\xE1 em dia!</div>
            <div style="font-size:12px;">Nenhum aviso pendente.</div>
           `,b.appendChild(x)}let S=c.filter(x=>!s.includes(x.id)),p=c.filter(x=>s.includes(x.id));if(S.forEach(x=>b.appendChild(j(x,!1))),p.length>0){let x=document.createElement("div");Object.assign(x.style,a.historyDivider),x.innerHTML=`<span>Visualizar ${p.length} avisos anteriores</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 0.3s"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let O=document.createElement("div");Object.assign(O.style,a.historyContainer),p.forEach(k=>O.appendChild(j(k,!0)));let w=!1;x.onclick=()=>{Q.playClick(),w=!w,O.style.display=w?"flex":"none",x.querySelector("svg").style.transform=w?"rotate(180deg)":"rotate(0deg)",x.querySelector("span").textContent=w?"Ocultar hist\xF3rico":`Visualizar ${p.length} avisos anteriores`},b.appendChild(x),b.appendChild(O)}}function j(s,c){let S=document.createElement("div");Object.assign(S.style,c?a.cardHistory:a.card);let p=r[s.type]||r.info,x=document.createElement("div");Object.assign(x.style,a.cardHeader,{background:p.bg,color:p.text,borderBottom:`1px solid ${p.border}`});let O=document.createElement("div");if(Object.assign(O.style,{display:"flex",alignItems:"center",gap:"6px"}),O.innerHTML=`${p.icon} <span>${s.type.toUpperCase()}</span>`,x.appendChild(O),c){let k=document.createElement("span");k.textContent=i(s.date),k.style.opacity="0.7",x.appendChild(k)}else{let k=document.createElement("button");k.title="Marcar como lido",Object.assign(k.style,a.dismissBtn),k.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',k.onmouseenter=()=>{k.style.color="#1e8e3e",k.style.background="#e6f4ea",k.style.borderColor="#1e8e3e"},k.onmouseleave=()=>{k.style.color="#5f6368",k.style.background="#fff",k.style.borderColor="rgba(0,0,0,0.1)"},k.onclick=F=>{F.stopPropagation(),Q.playClick(),S.style.transform="translateX(20px)",S.style.opacity="0",setTimeout(()=>{let M=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");M.push(s.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(M)),R(),T()},250)},x.appendChild(k)}if(S.appendChild(x),s.title){let k=document.createElement("div");Object.assign(k.style,a.msgTitle),k.textContent=s.title,S.appendChild(k)}if(!c){let k=document.createElement("div");Object.assign(k.style,a.metaContainer),k.innerHTML=`<span style="font-weight:600">${s.author}</span> \u2022 <span>${i(s.date)}</span>`,S.appendChild(k)}let w=document.createElement("div");return Object.assign(w.style,a.cardBody),w.innerHTML=u(s.text),S.appendChild(w),S}R();let U=document.createElement("div");Object.assign(U.style,We),U.className="no-drag",m.appendChild(U),Ye(m,U),document.body.appendChild(m);let g=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),f=$e.some(s=>!g.includes(s.id));return{toggle:d,hasUnread:f}}function Io(){if(window.techSolInitialized){wt();return}window.techSolInitialized=!0,console.log("\u{1F680} TechSol Suite Initializing...");try{jt();try{Q.initGlobalListeners(),Q.playStartup()}catch(r){console.warn("\xC1udio n\xE3o p\xF4de ser iniciado automaticamente:",r)}Pe.fetchTips(),wt();let t=po(),e=uo(),n=go(),o=bo(),i=fo();oo({toggleNotes:t,toggleEmail:e,toggleScript:n,toggleLinks:o,broadcastControl:i})}catch(t){console.error("Erro fatal na inicializa\xE7\xE3o:",t),ne("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}Io();})();
