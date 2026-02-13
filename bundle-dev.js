(()=>{var $e="",Ve="",vt=e=>new Promise(t=>setTimeout(t,e));async function wt(){if($e&&Ve)return $e;try{let e=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!e)return"Agente";e.click(),await vt(150);let t="Consultor",o=document.querySelector("profile-details .name");if(o)t=o.textContent.trim().split(" ")[0],t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();else{let i=document.querySelector("profile-details img");if(i&&i.src.includes("/photos/")){let a=i.src.match(/\/photos\/([^\?]+)/)[1];t=a.charAt(0).toUpperCase()+a.slice(1)}}let n=document.querySelector("profile-details .email");return n&&(Ve=n.textContent.trim(),console.log("TechSol: Identidade confirmada ->",Ve)),e.click(),document.body.click(),$e=t,t}catch(e){return console.warn("Sherlock falhou:",e),"Consultor"}}function at(){return $e||"Consultor"}function Ae(){return Ve||null}function St(e){let t=new Date,o=t.getHours(),n=t.getDay(),i="Ol\xE1",a="";o>=5&&o<12?(i="Bom dia",a='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):o>=12&&o<18?(i="Boa tarde",a='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(i="Boa noite",a='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let r=[];o>=0&&o<5?r=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:o<12?n===1?r=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:n===5?r=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:r=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:o<18?r=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:r=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(n===0||n===6)&&(r=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let s=r[Math.floor(Math.random()*r.length)];return{prefix:`${i},`,name:e,suffix:s,icon:a,isFriday:n===5}}async function ho(){try{let t=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!t)return null;let o=t.parentElement,n=o.querySelector(".unmask-button")||o.querySelector('[aria-label="Click to view"]');n&&(n.click(),await vt(500));let a=Array.from(o.querySelectorAll("a, span, div, pii-value")).find(r=>{let s=r.innerText.trim();return s.includes("@")&&!s.includes("Is this:")&&s.toLowerCase()!=="email"});return a?a.innerText.trim():null}catch(e){return console.warn("Erro ao capturar email do cliente:",e),null}}function yo(){try{let e=document.querySelector('material-input[debug-id="account-id-input"]');if(e){let t=e.querySelector("input");if(t){let o=t.value.trim();if(o)return o.includes("@")?o:`${o}@google.com`}}}catch(e){console.warn("Erro ao capturar email interno:",e)}return null}function vo(){try{let t=Array.from(document.querySelectorAll(".data-pair-label")).find(i=>i.textContent.includes("Google Ads External Customer ID")||i.textContent.includes("Customer ID"));if(t){let i=t.closest("home-data-item")||t.parentElement;if(i){let a=i.querySelector(".data-pair-content");if(a)return a.textContent.replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}}let n=document.body.innerText.match(/\b\d{3}[-]?\d{3}[-]?\d{4}\b/);if(n)return n[0].replace(/\D/g,"").replace(/(\d{3})(\d{3})(\d{4})/,"$1-$2-$3")}catch(e){console.warn("Erro ao capturar CID:",e)}return"---"}async function xe(){let e="Cliente",t="[INSERIR URL]";try{let r=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(r&&r.nextElementSibling){let s=r.nextElementSibling.innerText.trim();s&&(e=s)}}catch(a){console.warn("Falha Nome:",a)}try{let r=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(r&&r.nextElementSibling){let s=r.nextElementSibling.innerText.trim();s&&(t=s)}}catch(a){console.warn("Falha URL:",a)}let o=await ho(),n=yo(),i=vo();return{advertiserName:e,websiteUrl:t,clientEmail:o,internalEmail:n,cid:i,agentName:at()}}var Ie=null,it=null,he=.3;var ye=localStorage.getItem("cw_sounds_muted")==="true";function Oe(){if(!Ie){let e=window.AudioContext||window.webkitAudioContext;e&&(Ie=new e)}return Ie&&Ie.state==="suspended"&&Ie.resume(),Ie}function Ct(e){if(it)return it;let t=e.sampleRate*2,o=e.createBuffer(1,t,e.sampleRate),n=o.getChannelData(0);for(let i=0;i<t;i++)n[i]=Math.random()*2-1;return it=o,o}var B={setMuted:e=>{ye=e,localStorage.setItem("cw_sounds_muted",e)},isMuted:()=>ye,playClick:()=>{if(ye)return;let e=Oe();if(!e)return;let t=e.currentTime,o=e.createBufferSource();o.buffer=Ct(e);let n=e.createBiquadFilter();n.type="highpass",n.frequency.value=4e3;let i=e.createGain();i.gain.setValueAtTime(he*.8,t),i.gain.exponentialRampToValueAtTime(.001,t+.015),o.connect(n),n.connect(i),i.connect(e.destination),o.start(t),o.stop(t+.02)},playHover:()=>{if(ye)return;let e=Oe();if(!e)return;let t=e.currentTime,o=e.createOscillator();o.type="sine",o.frequency.setValueAtTime(400,t);let n=e.createGain();n.gain.setValueAtTime(0,t),n.gain.linearRampToValueAtTime(he*.1,t+.005),n.gain.linearRampToValueAtTime(0,t+.02),o.connect(n),n.connect(e.destination),o.start(t),o.stop(t+.03)},playSuccess:()=>{if(ye)return;let e=Oe();if(!e)return;let t=e.currentTime;[1046.5,1567.9].forEach((n,i)=>{let a=e.createOscillator(),r=e.createGain();a.type="sine",a.frequency.value=n,r.gain.setValueAtTime(0,t),r.gain.linearRampToValueAtTime(he*.6,t+.05),r.gain.exponentialRampToValueAtTime(.001,t+.6),a.connect(r),r.connect(e.destination),a.start(t),a.stop(t+.7)})},playGenieOpen:()=>{if(ye)return;let e=Oe();if(!e)return;let t=e.currentTime,o=e.createBufferSource();o.buffer=Ct(e);let n=e.createBiquadFilter();n.type="lowpass",n.frequency.setValueAtTime(100,t),n.frequency.exponentialRampToValueAtTime(800,t+.2);let i=e.createGain();i.gain.setValueAtTime(0,t),i.gain.linearRampToValueAtTime(he*.5,t+.05),i.gain.linearRampToValueAtTime(0,t+.25),o.connect(n),n.connect(i),i.connect(e.destination),o.start(t),o.stop(t+.3)},playError:()=>{if(ye)return;let e=Oe();if(!e)return;let t=e.currentTime,o=e.createOscillator(),n=e.createGain();o.type="triangle",o.frequency.setValueAtTime(120,t),o.frequency.exponentialRampToValueAtTime(80,t+.1),n.gain.setValueAtTime(he,t),n.gain.exponentialRampToValueAtTime(.001,t+.15),o.connect(n),n.connect(e.destination),o.start(t),o.stop(t+.2)},playStartup:()=>{if(ye)return;let e=Oe();if(!e)return;let t=e.currentTime,o=.12,n=e.createOscillator(),i=e.createGain(),a=e.createBiquadFilter();n.type="square",n.frequency.setValueAtTime(400,t),n.frequency.exponentialRampToValueAtTime(50,t+.1),a.type="lowpass",a.frequency.setValueAtTime(800,t),a.frequency.exponentialRampToValueAtTime(100,t+.1),i.gain.setValueAtTime(he*4,t),i.gain.exponentialRampToValueAtTime(.001,t+.1),n.connect(a),a.connect(i),i.connect(e.destination),n.start(t),n.stop(t+.12);let r=e.createOscillator(),s=e.createGain();r.type="sine",r.frequency.setValueAtTime(150,t),r.frequency.exponentialRampToValueAtTime(50,t+.15),s.gain.setValueAtTime(he*1.5,t),s.gain.exponentialRampToValueAtTime(.001,t+.15),r.connect(s),s.connect(e.destination),r.start(t),r.stop(t+.15),[55,55.4,110.5].forEach(l=>{let p=e.createOscillator(),m=e.createGain(),f=e.createBiquadFilter();p.type="sawtooth",p.frequency.value=l,f.type="lowpass",f.frequency.setValueAtTime(30,t),f.frequency.linearRampToValueAtTime(900,t+o+.2),f.frequency.exponentialRampToValueAtTime(40,t+3),m.gain.setValueAtTime(0,t),m.gain.linearRampToValueAtTime(he*.6,t+o+.1),m.gain.exponentialRampToValueAtTime(.001,t+3.5),p.connect(f),f.connect(m),m.connect(e.destination),p.start(t),p.stop(t+3.6)})},playNotification:()=>{if(ye)return;let e=Oe();if(!e)return;let t=e.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(n=>{let i=e.createOscillator(),a=e.createGain();i.type="sine",i.frequency.setValueAtTime(n.freq,t),a.gain.setValueAtTime(0,t),a.gain.linearRampToValueAtTime(he*n.vol,t+.004),a.gain.exponentialRampToValueAtTime(.001,t+n.dur),i.connect(a),a.connect(e.destination),i.start(t),i.stop(t+n.dur+.1)})},playSwoosh:()=>{B.playGenieOpen()},playReset:()=>{B.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let e=0,t=50;document.addEventListener("mouseover",o=>{if(!Ie)return;let n=o.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!n||n.contains(o.relatedTarget))return;let i=Date.now();i-e<t||(B.playHover(),e=i)},{passive:!0})}};var At=1e4;function Tt(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
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
    `,document.head.appendChild(t)}function $(e,t={}){let o=document.createElement("div"),n=t.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(o.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:n,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),o.textContent=e,document.body.appendChild(o),t.error?B.playError():B.playSuccess(),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>o.remove(),400)},t.duration||4e3)}function kt(e,t=null){let o=0,n=0,i=0,a=0,r=t||e;r.style.cursor="grab",r.onmousedown=s;function s(p){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(p.target.tagName)||p.target.closest(".no-drag"))return;p=p||window.event,r.style.cursor="grabbing",e.style.transition="none";let m=e.getBoundingClientRect();e.style.transform="none",e.style.left=m.left+"px",e.style.top=m.top+"px",e.style.margin="0",e.style.bottom="auto",e.style.right="auto",At++,e.style.zIndex=At,i=p.clientX,a=p.clientY,e.setAttribute("data-dragging","true"),document.onmouseup=l,document.onmousemove=g}function g(p){p=p||window.event,p.preventDefault(),o=i-p.clientX,n=a-p.clientY,i=p.clientX,a=p.clientY;let m=e.offsetTop-n,f=e.offsetLeft-o,d=16,b=window.innerWidth,c=window.innerHeight,C=e.offsetWidth,A=e.offsetHeight;f<d?f=d:f+C>b-d&&(f=b-C-d),m<d?m=d:m+A>c-d&&(m=c-A-d),e.style.top=m+"px",e.style.left=f+"px"}function l(){document.onmouseup=null,document.onmousemove=null,r.style.cursor="grab",setTimeout(()=>{e.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",e.setAttribute("data-dragging","false"),e.setAttribute("data-moved","true")},50)}}var re={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var st={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Ue={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var Ot={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var ze={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var rt=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],Et=-1;function It(){let e=Math.floor(Math.random()*rt.length);return e===Et&&(e=(e+1)%rt.length),Et=e,rt[e]}var ve=e=>new Promise(t=>setTimeout(t,e));async function wo(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let o=e.querySelector(".cursor");await ve(200);for(let n=0;n<t.length;n++){let i=t.charAt(n),a=document.createElement("span");a.textContent=i,o&&o.parentNode===e?o.before(a):e.appendChild(a);let r=Math.floor(Math.random()*60)+30;n===0&&(r=150),n>t.length-3&&(r=30),await ve(r)}await ve(600),o&&(o.style.display="none")}async function lt(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
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
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await ve(200);let t=await wt(),o=St(t),n=e.querySelector("#w-icon"),i=e.querySelector("#p1"),a=e.querySelector("#p2"),r=e.querySelector("#p3"),s=e.querySelector("#p-sextou");n&&(n.innerHTML=o.icon),i&&(i.textContent=o.prefix),r&&(r.textContent=o.suffix),await ve(300);let g=n?n.querySelector("svg"):null;if(g&&(g.style.opacity="1",g.style.transform="scale(1)"),await ve(400),i&&(i.style.opacity="1"),B.playStartup(),a&&await wo(a,o.name),r&&(r.style.opacity="1",r.style.transform="translateY(0)"),o.isFriday&&s){await ve(400),s.style.display="block",s.offsetWidth;let l=s.querySelector(".sextou-badge");l&&(l.style.opacity="1",l.style.transform="scale(1)")}await ve(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await ve(900),e.parentNode&&e.parentNode.removeChild(e)}}var Ee={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Te(e,t){t.onmousedown=o;function o(n){n.stopPropagation(),n.preventDefault();let i=e.style.transition;e.style.transition="none";let a=n.clientX,r=n.clientY,s=parseFloat(getComputedStyle(e,null).getPropertyValue("width").replace("px","")),g=parseFloat(getComputedStyle(e,null).getPropertyValue("height").replace("px","")),l=a,p=r,m=!1;function f(c){l=c.clientX,p=c.clientY,m||(window.requestAnimationFrame(()=>{d(),m=!1}),m=!0)}function d(){let c=s+(l-a),C=g+(p-r);c>360&&(e.style.width=c+"px"),C>300&&(e.style.height=C+"px")}function b(){document.removeEventListener("mousemove",f),document.removeEventListener("mouseup",b),setTimeout(()=>{e.style.transition=i},50)}document.addEventListener("mousemove",f),document.addEventListener("mouseup",b)}t.onmouseenter=()=>t.style.opacity="1",t.onmouseleave=()=>t.style.opacity="0.6"}function Ft(e){if(!e)return"";let t={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return e.replace(/:([a-zA-Z0-9-_+]+):/g,o=>t[o]?t[o]:"")}function qt(){let e=document.createElement("div");return Object.assign(e.style,{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.4)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:2147483647,opacity:0,transition:"opacity 0.3s ease"}),e}function Lt(){let e=document.createElement("div");return Object.assign(e.style,{background:"rgba(255, 255, 255, 0.95)",padding:"24px",borderRadius:"20px",boxShadow:"0 24px 60px rgba(0,0,0,0.3)",width:"340px",textAlign:"center",transform:"scale(0.85)",transition:"transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",fontFamily:"'Google Sans', Roboto, sans-serif",border:"1px solid rgba(255,255,255,0.4)"}),e}function ue(e,t={}){return new Promise(o=>{let n=qt(),i=Lt(),a=t.danger?"#FF3B30":"#007AFF",r=t.confirmText||(t.danger?"Excluir":"Confirmar");i.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #202124; line-height: 1.4;">${e}</div>
            <div style="display: flex; gap: 10px;">
                <button id="cw-conf-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-conf-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: ${a}; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">${r}</button>
            </div>
        `,n.appendChild(i),document.body.appendChild(n),requestAnimationFrame(()=>{n.style.opacity=1,i.style.transform="scale(1)"});let s=p=>{n.style.opacity=0,i.style.transform="scale(0.9)",setTimeout(()=>{n.remove(),o(p)},300)},g=i.querySelector("#cw-conf-cancel"),l=i.querySelector("#cw-conf-ok");[g,l].forEach(p=>p.onmouseenter=()=>B.playHover()),g.onclick=()=>{B.playClick(),s(!1)},l.onclick=()=>{B.playClick(),s(!0)}})}function Mt(e,t=""){return new Promise(o=>{let n=qt(),i=Lt();i.innerHTML=`
            <div style="font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #202124; text-align: left;">${e}</div>
            <input type="text" id="cw-prompt-input" value="${t}" style="width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #DADCE0; margin-bottom: 20px; box-sizing: border-box; font-family: inherit; font-size: 14px; outline: none;">
            <div style="display: flex; gap: 10px;">
                <button id="cw-prompt-cancel" style="flex: 1; padding: 12px; border-radius: 12px; border: 1px solid #DADCE0; background: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px; color: #5F6368;">Cancelar</button>
                <button id="cw-prompt-ok" style="flex: 1; padding: 12px; border-radius: 12px; border: none; background: #007AFF; color: white; cursor: pointer; font-weight: 600; font-family: inherit; font-size: 14px;">OK</button>
            </div>
        `,n.appendChild(i),document.body.appendChild(n);let a=i.querySelector("#cw-prompt-input");requestAnimationFrame(()=>{n.style.opacity=1,i.style.transform="scale(1)",setTimeout(()=>a.focus(),100)});let r=l=>{n.style.opacity=0,i.style.transform="scale(0.9)",setTimeout(()=>{n.remove(),o(l)},300)},s=i.querySelector("#cw-prompt-cancel"),g=i.querySelector("#cw-prompt-ok");[s,g].forEach(l=>l.onmouseenter=()=>B.playHover()),s.onclick=()=>{B.playClick(),r(null)},g.onclick=()=>{B.playClick(),r(a.value)},a.onkeydown=l=>{l.key==="Enter"&&g.click(),l.key==="Escape"&&s.click()}})}var ct=class{constructor(){this.reset()}reset(){this.currentCaseType="bau",this.currentLang="pt",this.isPortugalCase=!1,this.visible=!1,this.isSplitView=!1,this.currentStatus="",this.currentSubStatus="",this.formData={},this.activeTasks=[],this.screenshotsData={},this.tagSupportState=null,this.isDirty=!1}setCaseType(t){this.currentCaseType=t,this.notify()}setLanguage(t){this.currentLang=t,this.notify()}setStatus(t){this.currentStatus=t,this.notify()}setSubStatus(t){this.currentSubStatus=t,this.notify()}updateField(t,o){this.formData[t]=o,this.isDirty=!0,this.notify()}listeners=[];subscribe(t){return this.listeners.push(t),()=>this.listeners=this.listeners.filter(o=>o!==t)}notify(){this.listeners.forEach(t=>t(this))}},Y=new ct;var So={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},_t={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function se(e,t,o,n,i,a){let r=document.createElement("div");Object.assign(r.style,So),kt(e,r);let s=document.createElement("div");Object.assign(s.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),r.appendChild(s),i&&(i.googleLine=s);let g=document.createElement("div");Object.assign(g.style,{display:"flex",alignItems:"center",gap:"12px"});let l=document.createElement("img");l.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(l.style,{width:"20px",height:"20px",pointerEvents:"none"});let p=document.createElement("span");p.textContent=t,g.appendChild(l),g.appendChild(p);let m=document.createElement("div");Object.assign(m.style,{display:"flex",alignItems:"center",gap:"4px"});let f='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',d='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',b=document.createElement("div");b.innerHTML=f,Object.assign(b.style,_t),b.title="Sobre & Feedback",b.classList.add("no-drag"),b.onmouseenter=()=>{b.style.background="rgba(255,255,255,0.1)",b.style.color="#FFF"},b.onmouseleave=()=>{b.style.color!=="rgb(138, 180, 248)"&&(b.style.background="transparent",b.style.color="#9AA0A6")};let c=document.createElement("div");c.innerHTML=d,Object.assign(c.style,_t),c.title="Fechar",c.classList.add("no-drag"),c.onmouseenter=()=>{c.style.background="rgba(242, 139, 130, 0.2)",c.style.color="#F28B82"},c.onmouseleave=()=>{c.style.background="transparent",c.style.color="#9AA0A6"},c.onmousedown=A=>A.stopPropagation(),b.onmousedown=A=>A.stopPropagation(),c.onclick=a;let C=Co(e,t,o,n);return b.onclick=A=>{A.stopPropagation(),C.style.opacity==="1"?(C.style.opacity="0",C.style.pointerEvents="none",b.style.color="#9AA0A6",b.style.background="transparent"):(C.style.opacity="1",C.style.pointerEvents="auto",b.style.color="#8AB4F8",b.style.background="rgba(138, 180, 248, 0.1)")},m.appendChild(b),m.appendChild(c),r.appendChild(g),r.appendChild(m),r}function Co(e,t,o,n){let i=document.createElement("div");return Object.assign(i.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),i.innerHTML=`
        <div style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${t}</div>
        <div style="color: #5f6368; font-size: 14px; margin-bottom: 24px;">Vers\xE3o ${o}</div>
        
        <div style="color: #3c4043; font-size: 14px; max-width: 90%; line-height: 1.6; margin-bottom: 24px;">
            ${n}
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
    `,setTimeout(()=>{let a=i.querySelector("#cw-feedback-link");a&&(a.onmouseenter=()=>{a.style.backgroundColor="#E8F0FE",a.style.transform="scale(1.02)"},a.onmouseleave=()=>{a.style.backgroundColor="#F8F9FA",a.style.transform="scale(1)"});let r=i.querySelector("#close-help-internal");r&&(r.onmouseover=()=>r.style.backgroundColor="#f8f9fa",r.onmouseout=()=>r.style.backgroundColor="white",r.onclick=()=>{i.style.opacity="0",i.style.pointerEvents="none"})},0),e.appendChild(i),i}function Nt(e,t){let o=document.createElement("div");o.id="notes-assistant-popup",o.classList.add("cw-module-window"),Object.assign(o.style,re,{right:"100px",width:"480px",height:"700px",display:"flex",flexDirection:"column",transition:"width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)"});let n={popup:o,googleLine:null},i=se(o,"Case Notes",e,"Gera notas padronizadas.",n,t);o.appendChild(i);let a=document.createElement("div");a.className="cw-popup-content",Object.assign(a.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"16px"}),o.appendChild(a);let r=document.createElement("div");r.textContent="created by lucaste@",Object.assign(r.style,Ot),r.style.marginTop="auto",o.appendChild(r);let s=document.createElement("div");return Object.assign(s.style,Ee),s.className="no-drag",o.appendChild(s),Te(o,s),Ao(),{popup:o,content:a,header:i,animRefs:n,credit:r}}function Ao(){if(document.getElementById("cw-notes-refactor-styles"))return;let e=document.createElement("style");e.id="cw-notes-refactor-styles",e.innerHTML=`
        .cw-popup-content::-webkit-scrollbar { width: 6px; }
        .cw-popup-content::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; }
        .cw-input, .cw-textarea, .cw-select { width: 100%; padding: 10px 12px; border-radius: 10px; border: 1px solid #dadce0; font-size: 14px; font-family: 'Google Sans', Roboto, sans-serif; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); box-sizing: border-box; background: #fff; }
        .cw-select { appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E"); background-repeat: no-repeat; background-position: right 12px center; background-size: 16px; padding-right: 40px !important; }
        .cw-input:focus, .cw-textarea:focus, .cw-select:focus { border-color: #1a73e8; outline: none; box-shadow: 0 0 0 2px rgba(26,115,232,0.1); }
        .cw-textarea { min-height: 80px; resize: vertical; }
        .cw-section-title { font-size: 12px; font-weight: 700; color: #5f6368; text-transform: uppercase; letter-spacing: 0.8px; margin: 16px 0 8px 0; }
        .cw-scenario-module { border: 1px solid #eee; border-radius: 12px; padding: 12px; background: #f8f9fa; }
        .cw-scenario-tabs { display: flex; gap: 4px; margin-bottom: 12px; background: #eee; padding: 4px; border-radius: 8px; }
        .cw-tab { flex: 1; text-align: center; padding: 6px; font-size: 12px; font-weight: 600; cursor: pointer; border-radius: 6px; color: #5f6368; transition: all 0.2s; }
        .cw-tab.active { background: #fff; color: #1a73e8; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .cw-scenario-list { display: flex; flex-wrap: wrap; gap: 6px; max-height: 150px; overflow-y: auto; margin-bottom: 12px; }
        .cw-scenario-chip { padding: 4px 10px; border-radius: 100px; background: #fff; border: 1px solid #dadce0; font-size: 12px; cursor: pointer; transition: all 0.2s; white-space: nowrap; }
        .cw-scenario-chip:hover { border-color: #1a73e8; background: #e8f0fe; }
        .cw-scenario-preview { font-size: 11px; color: #80868b; font-style: italic; min-height: 2em; line-height: 1.4; border-top: 1px dashed #dadce0; paddingTop: 8px; }
        .cw-btn-primary { background: #1a73e8; color: #fff; border: none; border-radius: 8px; padding: 10px 20px; font-weight: 500; cursor: pointer; transition: background 0.2s; }
        .cw-btn-primary:hover { background: #1765cc; }
        .cw-btn-secondary { background: #5f6368; color: #fff; border: none; border-radius: 8px; padding: 10px 20px; font-weight: 500; cursor: pointer; transition: background 0.2s; }
        .cw-btn-secondary:hover { background: #4f5257; }
    `,document.head.appendChild(e)}var we={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:",reason_comments:"Reason/Comments:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:",reason_comments:"Reason/Comments:"}},me={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},Se={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {MULTIPLE_CIDS}"},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>Substatus:</b> DC - Other<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br>Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},_e={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},Ne=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],We=["CONSIDERACOES","COMENTARIOS"],Dt={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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
\u2022 Implementamos [descrever o que foi feito]`},"quickfill-as-no-access":{type:"all","field-MOTIVO_REAGENDAMENTO":"\u2022 Precisamos reagendar o caso, j\xE1 que o anunciante n\xE3o tinha os acessos necess\xE1rios para podermos implementar as tasks"},"quickfill-in-nrp-bau":{type:"bau","field-REASON_COMMENTS":"NRP (BAU - 3 tentativas)","field-COMENTARIOS":`\u2022 Duas liga\xE7\xF5es seguidas, e e-mail "Antes dos 10 minutos" e uma terceira e ultima tentativa de liga\xE7\xE3o.
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
\u2022 Tentativa 2 -`}};var De=e=>new Promise(t=>setTimeout(t,e));function Be(e){e&&["mousedown","mouseup","click"].forEach(t=>e.dispatchEvent(new MouseEvent(t,{bubbles:!0,cancelable:!0,view:window})))}var Rt="cw-automation-styles";if(!document.getElementById(Rt)){let e=document.createElement("style");e.id=Rt,e.innerHTML=`
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
    `,document.head.appendChild(e)}function zt(e){let t=document.getElementById("cw-loading-overlay");e?t?t.style.opacity="1":(t=document.createElement("div"),t.id="cw-loading-overlay",document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1")):t&&(t.style.opacity="0",setTimeout(()=>t.remove(),300))}async function Bt(e){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let t=document.getElementById(e),o="";zt(!0),t&&(o=t.placeholder,t.placeholder="Buscando ID...",t.value="",t.classList.add("cw-scanning-active"));try{let n=document.querySelector('material-button[debug-id="dock-item-case-log"]');n&&!n.classList.contains("selected")&&(Be(n),await De(1200));let i=document.querySelector("search-filter dropdown-button .button");if(i&&!(i.innerText||"").includes("All")){Be(i),await De(600);let f=document.querySelector('material-checkbox[debug-id="check-all-box"]');f&&f.getAttribute("aria-checked")!=="true"&&(Be(f),await De(300));let d=document.querySelector('material-button[debug-id="apply-filter"]');d&&(Be(d),await De(1500))}let a=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");a&&(a.scrollTop=a.scrollHeight,await De(500));let r=Array.from(document.querySelectorAll(".message-header"));for(let m=r.length-1;m>=0;m--){let f=r[m],d=f.querySelector("i.material-icons-extended"),b=d&&d.innerText.trim()==="phone_in_talk",c=f.innerText||"",C=c.includes("Agent joined")||c.includes("outbound-call")||c.includes("Speakeasy");if(b||C){f.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",f),t&&(t.placeholder="Lendo mensagem..."),Be(f),await De(1e3));break}}let g=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),l=/Speakeasy.*?(P\d{15,25})/i,p=null;for(let m=g.length-1;m>=0;m--){let f=g[m];if(f.offsetParent===null)continue;let d=(f.innerText||"").match(l);if(d&&d[1]){p=d[1];break}}if(t)if(p){try{await navigator.clipboard.writeText(p)}catch{}t.value=p,t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),B.playSuccess(),$(`ID Localizado: ${p}`),t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}else B.playError(),$("Nenhum ID encontrado.",{error:!0}),t.placeholder="N\xE3o encontrado",t.style.transition="background-color 0.3s",t.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>t.style.backgroundColor="",1e3)}catch(n){console.error("Erro na automa\xE7\xE3o:",n),$("Erro ao processar.",{error:!0})}finally{t&&(t.classList.remove("cw-scanning-active"),t.value||(t.placeholder=o)),zt(!1)}}function Gt(e){e.dataset.bulletEnabled!=="true"&&(e.dataset.bulletEnabled="true",(e.value.trim()===""||e.value.trim()==="\u2022")&&(e.value="\u2022 "),e.addEventListener("keydown",function(t){let o=this.selectionStart,n=this.selectionEnd,i=this.value,a=i.lastIndexOf(`
`,o-1)+1,r=i.substring(a,o);if(t.key==="Enter"){t.preventDefault();let s=r.match(/^(\s*•\s*)/)?.[0]||"\u2022 ";if(r.trim()==="\u2022"){this.value=i.substring(0,a)+`
`+i.substring(n),this.selectionStart=this.selectionEnd=a+1;return}let g=`
`+s;this.value=i.substring(0,o)+g+i.substring(n),this.selectionStart=this.selectionEnd=o+g.length}else if(t.key==="Tab")t.preventDefault(),t.shiftKey?r.startsWith("  ")&&(this.value=i.substring(0,a)+r.substring(2)+i.substring(o),this.selectionStart=this.selectionEnd=o-2):(this.value=i.substring(0,a)+"  "+r+i.substring(o),this.selectionStart=this.selectionEnd=o+2);else if(t.key==="Backspace"&&o===n&&o>0){let s=i.substring(0,o);s.endsWith("\u2022 ")?(t.preventDefault(),this.value=s.substring(0,o-2)+i.substring(n),this.selectionStart=this.selectionEnd=o-2):s.endsWith("  ")&&r.trim().startsWith("\u2022")&&(t.preventDefault(),this.value=s.substring(0,o-2)+i.substring(n),this.selectionStart=this.selectionEnd=o-2)}}))}function Pt(e,t,o){t.innerHTML="";let n=Se[e];if(!n)return;let i=n.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(i)].forEach(r=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(r))return;let s=r.slice(1,-1),g=`field-${s}`,l=document.createElement("label"),p=f=>we[o.currentLang]?.[f]||we.pt?.[f]||f;if(l.textContent=p(s.toLowerCase())!==s.toLowerCase()?p(s.toLowerCase()):s.replace(/_/g," ").replace(/\b\w/g,f=>f.toUpperCase())+":",Object.assign(l.style,{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"}),s==="SPEAKEASY_ID"){let f=document.createElement("button");f.innerHTML="\u2728 Auto Busca",f.style.cssText="font-size: 11px; font-weight: 500; color: #0b57d0; background-color: #d3e3fd; border: none; border-radius: 100px; padding: 5px 12px; margin-left: 10px; cursor: pointer;",f.onclick=d=>{d.preventDefault(),Bt(g)},l.appendChild(f)}let m;Ne.includes(s)?(m=document.createElement("textarea"),m.classList.add("bullet-textarea","cw-textarea"),Gt(m)):We.includes(s)?(m=document.createElement("textarea"),m.classList.add("cw-textarea")):(m=document.createElement("input"),m.type="text",m.classList.add("cw-input")),s==="REASON_COMMENTS"&&(e.startsWith("NI_")||e.startsWith("IN_"))&&(l.style.display="none",m.style.display="none"),s==="ON_CALL"&&o.currentCaseType==="lm"&&(l.style.display="none",m.style.display="none",m.value="N/A"),m.id=g,m.value=o.formData[g]||"",m.addEventListener("input",f=>o.updateField(g,f.target.value)),t.appendChild(l),t.appendChild(m)})}function dt(e,t,o){let n=e.currentSubStatus;if(!n)return null;let a=Se[n].template.replace(/\n/g,"<br>"),r='style="margin-bottom: 12px; padding-left: 30px;"',s=[],g="",l=t.getCheckedElements();l.length>0&&l.forEach(f=>{let d=f.value,b=me[d],c=f.count||1;s.push(c>1?`${b.name} (x${c})`:b.name)});let p=t.screenshotsElement;if(p){let f=Array.from(p.querySelectorAll('input[id^="name-"]'));f.length>0&&f.forEach(d=>{let b=d.value,c=d.closest(".cw-screen-card");if(c){let C=c.querySelectorAll('input[id^="screen-"]'),A=!1,N="";C.forEach(G=>{let T=G.closest(".cw-input-group")?.querySelector(".cw-input-label")?.textContent||"Evid\xEAncia",O=G.value.trim();N+=`<li>${T} -${O?" "+O:""}</li>`,A=!0}),A&&(g+=`<b>${b}</b><ul ${r}>${N}</ul>`)}})}a.includes("{TAGS_IMPLEMENTED}")?a=a.replace(/{TAGS_IMPLEMENTED}/g,s.join(", ")||"N/A"):s.length>0&&(a+=`<br><b>Tags:</b> ${s.join(", ")}<br>`),a.includes("{SCREENSHOTS_LIST}")?a=a.replace(/{SCREENSHOTS_LIST}/g,g||"N/A"):g!==""&&(a+=`<br>${g}`);let m=f=>we[e.currentLang]?.[f]||we.pt?.[f]||f;if(e.currentLang==="pt"&&e.isPortugalCase){let f=e.consent?m("sim"):m("nao");a=a.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${m("consentiu_gravacao")}</b> ${f}<br><br>`).replace(/{CASO_PORTUGAL}/g,`<br><b>${m("caso_portugal")}</b> ${m("sim")}<br>`)}else e.currentLang==="pt"&&!e.isPortugalCase?a=a.replace(/{CASO_PORTUGAL}/g,`<br><b>${m("caso_portugal")}</b> ${m("nao")}<br>`).replace(/{CONSENTIU_GRAVACAO}/g,""):a=a.replace(/{CASO_PORTUGAL}/g,"").replace(/{CONSENTIU_GRAVACAO}/g,"");for(let f in e.formData){let d=f.replace("field-",""),b=new RegExp(`{${d}}`,"g"),c=e.formData[f];if(Ne.includes(d)&&c.trim()!==""){let A=c.split(`
`).map(N=>N.trim()).filter(N=>N!==""&&N!=="\u2022").map(N=>N.startsWith("\u2022 ")?N.substring(2):N).map(N=>`<li>${N}</li>`).join("");c=A?`<ul ${r}>${A}</ul>`:""}else We.includes(d)&&(c=c.split(`
`).filter(A=>A.trim()!=="").map(A=>`<p style="margin: 0 0 8px 0;">${A}</p>`).join(""));let C=c.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(C===""||C==="\u2022"||C.toLowerCase()==="n/a"){let A=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${d}\\}(?:<br>\\s*)?`,"gi");a=a.replace(A,"").replace(b,"")}else a=a.replace(b,c.replace(/\$/g,"$$$$"))}return a=a.replace(/{([A-Z0-9_]+)}/g,"").replace(/(<br>){3,}/g,"<br><br>"),o?.getOutput&&(a+=o.getOutput()),a}var Eo="https://script.google.com/a/macros/google.com/s/AKfycbwUfiKDvybLzt18mWoQJvkXqsRGQYqZ4JXzF8bLHMsxtYzlFPehz-ehoWs6215Wj6uFLA/exec",pt="cw_data_broadcast",Ht="cw_data_tips",To=["Processando...","Mantenha o foco!","Aguarde..."];function Ge(e,t={}){return new Promise((o,n)=>{let i="cw_cb_"+Math.round(1e5*Math.random()),a=document.createElement("script");window[i]=g=>{document.body.contains(a)&&document.body.removeChild(a),delete window[i],o(g)};let r=Object.keys(t).map(g=>encodeURIComponent(g)+"="+encodeURIComponent(t[g])).join("&"),s=`${Eo}?op=${e}&callback=${i}&t=${Date.now()}&${r}`;a.src=s,a.onerror=()=>{document.body.contains(a)&&document.body.removeChild(a),delete window[i],n(new Error("JSONP Error (Check Corp Login)"))},document.body.appendChild(a)})}var ee={fetchTips:async()=>{try{let e=await Ge("tips");e?.tips&&localStorage.setItem(Ht,JSON.stringify(e.tips))}catch(e){console.warn("Tips offline",e)}},fetchData:async()=>{try{let e=await Ge("broadcast");if(e?.broadcast)return localStorage.setItem(pt,JSON.stringify(e.broadcast)),e}catch(e){console.warn("Broadcast offline",e)}return{broadcast:JSON.parse(localStorage.getItem(pt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(pt)||"[]"),getRandomTip:()=>{let e=To,t=localStorage.getItem(Ht);if(t)try{e=JSON.parse(t)}catch{}return e[Math.floor(Math.random()*e.length)]},sendBroadcast:async e=>{let t={...e,date:new Date().toISOString(),id:Date.now().toString()};return await ee._performOp("new_broadcast",t)},updateBroadcast:async(e,t)=>{let o={id:e,...t};return await ee._performOp("update_broadcast",o)},deleteBroadcast:async e=>await ee._performOp("delete_broadcast",{id:e}),_performOp:async(e,t)=>{try{console.log(`\u{1F4E4} Executando ${e}...`,t);let o=await Ge(e,t);return o&&o.status==="success"?(console.log("\u2705 Sucesso:",e),!0):(console.warn("\u26A0\uFE0F Falha:",o),!1)}catch(o){return console.error("\u274C Erro JSONP:",o),!1}},logEvent:(e,t,o="",n=null)=>{try{let i="anon";try{let r=Ae();r&&(i=r.split("@")[0].toLowerCase())}catch{}let a={timestamp:new Date().toISOString(),user:i,version:"v5.1",category:e,action:t,label:o,value:n||""};Ge("log",a).catch(r=>{})}catch(i){console.warn("Analytics error",i)}},logUsage:()=>{},getUserSnippets:async e=>{try{return await Ge("get_user_snippets",{user:e})}catch(t){return console.warn("Erro ao buscar snippets:",t),null}},saveSnippet:async(e,t)=>{let o={...e,user:t};return await ee._performOp("save_snippet",o)},deleteSnippet:async(e,t)=>await ee._performOp("delete_snippet",{id:e,user:t})};var jt="cw_personal_library_v1",ne={getSnippets:(e="all")=>{let t=ne._loadFromLocal(),o=Ae();return o&&o.includes("@")&&ne._syncWithServer(o),e==="all"?t:t.filter(n=>n.type===e)},save:async e=>{let t=Ae();if(!t)return $("Erro: Usu\xE1rio n\xE3o identificado.",{error:!0}),!1;let o=ne._loadFromLocal(),n=new Date().toISOString(),i={id:e.id||"local_"+Date.now(),type:e.type||"general",title:e.title||"Sem t\xEDtulo",content:e.content||"",subject:e.subject||"",isCode:e.isCode||!1,isRich:e.isRich||!1,updated:n},a=o.filter(r=>r.id!==i.id);return a.unshift(i),ne._saveToLocal(a),ee.saveSnippet(i,t).then(r=>{r?console.log("\u2601\uFE0F Snippet salvo na nuvem!"):console.warn("\u26A0\uFE0F Falha ao salvar na nuvem. Dados apenas locais.")}),i},delete:async e=>{let t=Ae(),n=ne._loadFromLocal().filter(i=>i.id!==e);return ne._saveToLocal(n),t&&ee.deleteSnippet(e,t),!0},_syncWithServer:async e=>{console.log("\u{1F504} Sincronizando biblioteca...");let t=await ee.getUserSnippets(e);if(t&&t.status==="success"&&Array.isArray(t.snippets)){let o=t.snippets,n=ne._loadFromLocal(),i=JSON.stringify(o),a=JSON.stringify(n);i!==a&&(console.log("\u{1F4E5} Atualiza\xE7\xE3o encontrada! Atualizando cache."),ne._saveToLocal(o))}},_loadFromLocal:()=>{try{return JSON.parse(localStorage.getItem(jt)||"[]")}catch{return[]}},_saveToLocal:e=>{localStorage.setItem(jt,JSON.stringify(e))}};var ko={COMMUNITY_LDAP:"community-scenarios@google.com"},Pe={getPersonalScenarios:()=>ne.getSnippets("scenario"),saveScenario:async e=>ne.save({...e,type:"scenario"}),deleteScenario:async e=>ne.delete(e),getSharedScenarios:async(e=ko.COMMUNITY_LDAP)=>{try{let t=await ee.getUserSnippets(e);if(t?.status==="success")return t.snippets||[]}catch{}return[]},getDefaultScenarios:()=>Dt};function $t(e,t){let o=document.createElement("div");o.className="cw-scenario-module";let n=new Set,i=`
        .cw-scenario-module {
            background: rgba(255, 255, 255, 0.7) !important;
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.3) !important;
            border-radius: 16px !important;
            padding: 16px !important;
            box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.1);
        }
        .cw-scenario-tabs {
            background: rgba(120, 120, 128, 0.12) !important;
            padding: 2px !important;
            border-radius: 10px !important;
            margin-bottom: 16px !important;
        }
        .cw-tab {
            flex: 1;
            border-radius: 8px !important;
            padding: 8px 0 !important;
            font-size: 13px !important;
            font-weight: 600 !important;
            color: #5f6368 !important;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
            cursor: pointer;
            text-align: center;
        }
        .cw-tab.active {
            background: #ffffff !important;
            color: #1a73e8 !important;
            box-shadow: 0 2px 6px rgba(0,0,0,0.1) !important;
        }
        .cw-scenario-chip.selected {
            background: #e8f0fe !important;
            border-color: #1a73e8 !important;
            color: #1a73e8 !important;
            box-shadow: 0 2px 4px rgba(26, 115, 232, 0.2) !important;
        }
        .cw-scenario-chip {
            background: #ffffff !important;
            border: 1px solid #e5e5ea !important;
            border-radius: 12px !important;
            padding: 6px 12px !important;
            font-size: 13px !important;
            color: #1c1c1e !important;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .cw-scenario-chip:hover {
            background: #f2f2f7 !important;
            transform: translateY(-1px);
        }
        .cw-scenario-search input {
            width: 100%;
            padding: 8px 12px;
            border-radius: 10px;
            border: none;
            background: rgba(120, 120, 128, 0.1);
            font-size: 13px;
            margin-bottom: 12px;
            outline: none;
        }
    `;if(!document.getElementById("cw-scenario-refined-styles")){let p=document.createElement("style");p.id="cw-scenario-refined-styles",p.innerText=i,document.head.appendChild(p)}let a="default",r="",s=()=>{o.innerHTML=`<div class="cw-scenario-header"><div class="cw-scenario-tabs"><div class="cw-tab ${a==="default"?"active":""}" data-tab="default">Padr\xE3o</div><div class="cw-tab ${a==="personal"?"active":""}" data-tab="personal">Meus</div></div><div class="cw-scenario-search"><input type="text" placeholder="Buscar cen\xE1rios..." value="${r}"></div></div><div class="cw-scenario-list"></div><div class="cw-scenario-preview">Passe o mouse para ver os detalhes</div>`,o.querySelectorAll(".cw-tab").forEach(p=>{p.onclick=()=>{a=p.dataset.tab,s(),B.playClick()}}),o.querySelector(".cw-scenario-search input").oninput=p=>{r=p.target.value.toLowerCase(),l()},l()},g=async()=>{let p=prompt("Nome do seu cen\xE1rio:");if(!p)return;let m={...t.formData},f=t.activeTasks||[];await Pe.saveScenario({title:p,content:{...m,activeTasks:f}}),$("Cen\xE1rio salvo!"),l()},l=async(p=null)=>{let m=o.querySelector(".cw-scenario-list");m.innerHTML="<div class='cw-loading'>Carregando...</div>";let f=[];if(a==="personal"){let d=document.createElement("div");d.className="cw-scenario-chip",d.innerHTML="<b>+ Novo</b>",d.style.borderColor="#1a73e8",d.style.color="#1a73e8",d.onclick=g,m.appendChild(d)}if(a==="default"){let d=Pe.getDefaultScenarios(),b=t.currentSubStatus;f=Object.entries(d).filter(([c])=>b.startsWith("NI_")?c.includes("-ni-")||c.includes("attempted"):b.startsWith("SO_")?c.includes("gtm")||c.includes("whatsapp")||c.includes("form")||c.includes("ecw4")||c.includes("ga4"):b.startsWith("AS_")?c.includes("-as-"):b.startsWith("IN_")?c.includes("-in-"):b.startsWith("DC_")?c.includes("-dc-"):!0).map(([c,C])=>({id:c,title:c.replace("quickfill-","").replace(/-/g," "),content:C}))}else a==="personal"&&(f=Pe.getPersonalScenarios());if(f=f.filter(d=>(d.title?.toLowerCase().includes(r)||typeof d.content=="string"&&d.content.toLowerCase().includes(r))&&(a!=="default"||!d.content.type||d.content.type==="all"||d.content.type===t.currentCaseType)),m.innerHTML="",f.length===0){m.innerHTML="<div class='cw-empty'>Nenhum cen\xE1rio encontrado.</div>";return}f.forEach(d=>{let b=document.createElement("div");if(b.className="cw-scenario-chip",n.has(d.id)&&b.classList.add("selected"),b.textContent=d.title||d.id,b.onmouseenter=()=>{let c=o.querySelector(".cw-scenario-preview");c.textContent=typeof d.content=="object"?d.content["field-REASON_COMMENTS"]||"Cen\xE1rio de preenchimento m\xFAltiplo":d.content.substring(0,100)},b.onclick=()=>{B.playClick(),n.has(d.id)?(n.delete(d.id),b.classList.remove("selected")):(n.add(d.id),b.classList.add("selected")),e(d,n.has(d.id))},a==="personal"){let c=document.createElement("span");c.innerHTML=" &times;",c.onclick=async C=>{C.stopPropagation(),await ue("Excluir cen\xE1rio?")&&(await Pe.deleteScenario(d.id),l())},b.appendChild(c)}m.appendChild(b)})};return s(),o}var U={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Fe={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function Vt(e){let t={},o="implementation";function n(T){let O=T.toLowerCase();return O.includes("ads")||O.includes("conversion")||O.includes("remarketing")?U.brands.ads:O.includes("ga4")||O.includes("analytics")?U.brands.ga4:O.includes("gtm")||O.includes("tag manager")||O.includes("container")?U.brands.gtm:O.includes("merchant")||O.includes("shopping")||O.includes("feed")?U.brands.gmc:U.brands.default}let i=Object.entries(me).filter(([T,O])=>O.popular),a={};Object.entries(me).forEach(([T,O])=>{if(O.popular)return;let L=n(O.name);a[L.label]||(a[L.label]={brand:L,tasks:[]}),a[L.label].tasks.push({key:T,...O})});let r="cw-zen-tasks";if(!document.getElementById(r)){let T=document.createElement("style");T.id=r,T.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column;
                font-family: ${U.font}; background: ${U.bg}; position: relative; overflow: visible;
                border-radius: 12px; border: 1px solid ${U.border};
            }
            
            /* SCROLL AREA */
            .cw-zen-content { padding-bottom: 20px; }

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${U.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${U.white}; 
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
                font-size: 12px; font-weight: 500; color: ${U.textMain}; line-height: 1.2; 
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
                color: ${U.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${U.border}; border-radius: 10px; background: ${U.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${U.blue}; box-shadow: 0 0 0 3px ${U.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${U.border}; border-radius: 10px; background: ${U.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${U.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${U.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${U.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${U.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${U.blueLight}; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${U.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${U.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${U.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${U.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: sticky; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${U.border};
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${U.shadowFloat}; z-index: 10;
                margin-top: auto;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${U.textMain}; }
            
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
                font-family: ${U.font}; font-size: 15px; font-weight: 600; color: ${U.textMain};
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
                border-color: ${U.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${U.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${U.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${U.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 10px; font-weight: 700; color: ${U.textSub};
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
        `,document.head.appendChild(T)}let s=document.createElement("div");s.className="cw-zen-container";let g=document.createElement("div");Object.assign(g.style,{display:"none"});let l=document.createElement("div");l.className="cw-screens-container",g.appendChild(l),s.innerHTML=`
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
    `;let p=s.querySelector(".cw-hero-grid"),m=s.querySelector(".cw-acc-container"),f=s.querySelector(".cw-results-container"),d=s.querySelector(".cw-search-input"),b=s.querySelector(".cw-status-bar"),c=s.querySelector(".cw-status-text"),C=s.querySelector(".cw-footer-icons");i.forEach(([T,O])=>{let L=n(O.name),_=document.createElement("div");_.className="cw-hero-card",_.id=`hero-${T}`,_.style.setProperty("--hero-color",L.color),_.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${Fe[L.icon]}</div>
                <div class="cw-hero-label">${O.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,_.onclick=D=>{if(D.target.closest(".cw-step-btn"))return;let z=t[T]?t[T].count:0;N(T,z>0?-z:1,O)},_.querySelector(".minus").onclick=()=>N(T,-1,O),_.querySelector(".plus").onclick=()=>N(T,1,O),_.dataset.color=L.color,p.appendChild(_)});function A(T,O){let L=n(O.name),_=document.createElement("div");return _.className="cw-task-item",_.dataset.id=T,_.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${L.bg}; color:${L.color}">
                    ${Fe[L.icon]||Fe.default}
                </div>
                <div class="cw-task-label">${O.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,_.onclick=D=>{if(D.target.closest(".cw-step-btn"))return;let z=t[T]?t[T].count:0;N(T,z>0?-z:1,O)},_.querySelector(".minus").onclick=()=>N(T,-1,O),_.querySelector(".plus").onclick=()=>N(T,1,O),_}Object.entries(a).forEach(([T,O])=>{let L=document.createElement("div");L.className="cw-acc-group";let _=document.createElement("div");_.className="cw-acc-header",_.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${O.brand.color}"></div>
                ${T}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,_.onclick=()=>{m.querySelectorAll(".cw-acc-group.open").forEach(z=>{z!==L&&z.classList.remove("open")}),L.classList.toggle("open")};let D=document.createElement("div");D.className="cw-acc-body",O.tasks.forEach(z=>{let R=A(z.key,z);D.appendChild(R)}),L.appendChild(_),L.appendChild(D),m.appendChild(L)});function N(T,O,L){t[T]||(t[T]={count:0,data:L,brand:n(L.name)}),t[T].count+=O,t[T].count<=0&&delete t[T],G(),P(),e&&e()}function G(){i.forEach(([D])=>{let z=p.querySelector(`#hero-${D}`);if(!z)return;let R=t[D];R?(z.classList.add("active"),z.querySelector(".cw-step-val").textContent=R.count,z.querySelector(".cw-step-val").style.color=z.dataset.color):z.classList.remove("active")}),s.querySelectorAll(".cw-task-item").forEach(D=>{let z=D.dataset.id,R=t[z];R?(D.classList.add("selected"),D.querySelector(".cw-step-val").textContent=R.count):D.classList.remove("selected")});let O=Object.keys(t),L=0,_=[];if(O.forEach(D=>{let z=t[D];L+=z.count;for(let R=0;R<z.count;R++)_.length<6&&_.push(z.brand)}),L>0){b.classList.add("visible");let D=L>1?"A\xE7\xF5es":"A\xE7\xE3o",z=L>1?"definidas":"definida";c.textContent=`${L} ${D} ${z}`,C.innerHTML="",_.forEach(R=>{let H=document.createElement("div");H.className="cw-mini-icon",H.innerHTML=Fe[R.icon]||Fe.default;let I=H.querySelector("svg");I&&(I.style.width="14px",I.style.height="14px"),C.appendChild(H)})}else b.classList.remove("visible")}d.addEventListener("input",T=>{let O=T.target.value.toLowerCase();if(O.length>0){m.style.display="none",f.style.display="block",f.innerHTML="";let L=!1;Object.entries(me).forEach(([_,D])=>{if(D.name.toLowerCase().includes(O)){L=!0;let z=A(_,D);t[_]&&(z.classList.add("selected"),z.querySelector(".cw-step-val").textContent=t[_].count),f.appendChild(z)}}),L||(f.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else m.style.display="block",f.style.display="none"});function P(){l.innerHTML="";let T=Object.keys(t),O=!1,L=document.getElementById("sub-status-select")?.value||"",_=!!document.getElementById("tag-support-container");if(T.length===0){l.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>',g.style.display="none";return}let D=document.createElement("div");D.className="cw-info-banner",D.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Os screenshots seguem as diretrizes atuais do Win Criteria e pol\xEDticas de Tag Support.
            </span>
        `,l.appendChild(D),T.forEach(z=>{let R=t[z].data,H=t[z].count,I=t[z].brand,M=R.screenshots?.[o]||[];if(M.length>0){O=!0;for(let x=1;x<=H;x++){let E=document.createElement("div");E.className="cw-screen-card",E.style.setProperty("--brand-color",I.color),E.style.setProperty("--brand-bg",I.bg),E.style.setProperty("--brand-shadow",I.color+"40");let h=document.createElement("div");h.className="cw-card-header";let S=document.createElement("div");S.className="cw-card-icon",S.innerHTML=Fe[I.icon]||Fe.default;let k=document.createElement("div");k.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let u=document.createElement("input");u.className="cw-card-title-input",u.id=`name-${z}-${x}`,u.value=`${R.name}${H>1?" #"+x:""}`,u.title="Clique para renomear esta task";let y=document.createElement("span");y.className="cw-edit-hint",y.innerHTML="\u270E Renomear",k.appendChild(u),k.appendChild(y),h.appendChild(S),h.appendChild(k),E.appendChild(h),M.forEach((v,w)=>{let F=document.createElement("div");F.className="cw-input-group";let j=document.createElement("label");j.className="cw-input-label",j.textContent=v;let q=document.createElement("input");q.className="cw-input-field",q.id=`screen-${z}-${x}-${w}`,q.placeholder="Cole o link aqui...",q.setAttribute("autocomplete","off"),q.addEventListener("input",()=>{q.value.trim().length>5?q.classList.add("filled"):q.classList.remove("filled")});let V=document.createElement("div");V.className="cw-input-check",V.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',F.appendChild(j),F.appendChild(q),F.appendChild(V),E.appendChild(F)}),l.appendChild(E)}}}),g.style.display=O?"block":"none"}return{selectionElement:s,screenshotsElement:g,updateSubStatus:()=>P(),getCheckedElements:()=>Object.keys(t).map(T=>({value:T,count:t[T].count})),setTaskCount:(T,O)=>{t[T]&&delete t[T],O>0&&me[T]&&N(T,O,me[T])},toggleTask:(T,O=!0)=>{let L=t[T];O&&!L?N(T,1,me[T]):!O&&L&&N(T,-L.count,me[T])},setMode:T=>{o=T,P()},reset:()=>{for(let T in t)delete t[T];d.value="",m.style.display="block",f.style.display="none",G(),P()}}}var W={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},ge="cubic-bezier(0.25, 0.8, 0.25, 1)",Oo={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${W.border}`,backgroundColor:W.bgInput,fontSize:"14px",color:W.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${ge}, box-shadow 0.2s ${ge}, background-color 0.2s`,outline:"none"},On={...Oo,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},In={fontSize:"13px",fontWeight:"700",color:W.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},Fn={display:"block",fontSize:"13px",fontWeight:"600",color:W.text,marginBottom:"8px",marginTop:"16px"},qn={fontSize:"12px",color:W.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},Ln={fontSize:"12px",color:W.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},Mn={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:W.text,cursor:"pointer",padding:"12px 14px",backgroundColor:W.surface,border:`1px solid ${W.border}`,borderRadius:"12px",transition:`all 0.2s ${ge}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},ut={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:W.primary},_n={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:W.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${ge}, box-shadow 0.2s ${ge}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},Nn={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${W.primary}`,color:W.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${ge}`},Dn={background:"transparent",border:`1px solid ${W.border}`,borderRadius:"20px",color:W.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${ge}`,fontFamily:"'Google Sans', 'Roboto'"};var Rn={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:W.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},zn={fontSize:"13px",fontWeight:"700",color:W.primary,minWidth:"20px",textAlign:"center"},Bn={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${W.border}`,backgroundColor:W.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${ge}, box-shadow 0.2s ${ge}`},Gn={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${W.bgInput}`},Pn={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${W.border}`,backgroundColor:W.surface,color:W.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${ge}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},Hn={backgroundColor:W.primaryBg,color:W.primary,borderColor:W.primary,fontWeight:"600"},jn={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:W.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},$n={borderTop:`1px solid ${W.bgInput}`,paddingTop:"20px",marginTop:"16px"};var Vn={maxHeight:"240px",overflowY:"auto",border:`1px solid ${W.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:W.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},Un={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${W.bgInput}`,cursor:"pointer",fontSize:"13px",color:W.text,transition:"background 0.1s",userSelect:"none"};var Io={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},Fo={fontSize:"12px",color:"#e37400",marginTop:"4px"},qo={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},Lo={display:"flex",gap:"15px",marginBottom:"10px"};function Ut(){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,Io);let t=document.createElement("label");t.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(t.style,st,{marginTop:"0"});let o=document.createElement("div");Object.assign(o.style,Lo);let n=document.createElement("input");n.type="radio",n.name="ts_usage_mod",n.value="Sim",Object.assign(n.style,ut);let i=document.createElement("label");i.textContent="Sim";let a=document.createElement("div");Object.assign(a.style,{display:"flex",alignItems:"center"}),a.appendChild(n),a.appendChild(i);let r=document.createElement("input");r.type="radio",r.name="ts_usage_mod",r.value="N\xE3o",r.checked=!0,Object.assign(r.style,ut);let s=document.createElement("label");s.textContent="N\xE3o";let g=document.createElement("div");Object.assign(g.style,{display:"flex",alignItems:"center"}),g.appendChild(r),g.appendChild(s),o.appendChild(a),o.appendChild(g);let l=document.createElement("div");l.style.display="block";let p=document.createElement("label");p.textContent="Qual foi o Motivo?",Object.assign(p.style,st,{fontSize:"12px"});let m=document.createElement("input");m.type="text",Object.assign(m.style,qo);let f=document.createElement("div");f.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(f.style,Fo),l.appendChild(p),l.appendChild(m),l.appendChild(f),e.appendChild(t),e.appendChild(o),e.appendChild(l),n.onchange=()=>{l.style.display="none"},r.onchange=()=>{l.style.display="block"};function d(C,A){if(e.style.display="none",!C||C.includes("Education")||!A||A.length===0)return;let N=A.some(L=>L.includes("enhanced")||L==="ec_google_ads"),G=A.some(L=>(L.includes("conversion")||L.includes("ads"))&&!L.includes("enhanced")),P=A.some(L=>L.includes("ga4")||L.includes("analytics")||L.includes("ua")),T=A.some(L=>L.includes("merchant")||L.includes("gmc")||L.includes("shopping"));(N||G&&!P&&!T)&&(e.style.display="block")}function b(){if(e.style.display==="none")return"";let C=`<br><b>Utilizou Tag Support?</b> ${n.checked?"Sim":"N\xE3o"}`;return r.checked&&m.value.trim()!==""&&(C+=`<br><b>Motivo:</b> ${m.value}`),C+="<br>",C}function c(){e.style.display="none",r.checked=!0,n.checked=!1,l.style.display="block",m.value=""}return{element:e,updateVisibility:d,getOutput:b,reset:c}}var mt="cw_notes_parking_lot",Ye="cw_notes_emergency_save";var Ce={getAll:()=>{try{return JSON.parse(localStorage.getItem(mt)||"[]")}catch{return[]}},save:e=>{let t=Ce.getAll(),o={id:Date.now().toString(),timestamp:new Date().toISOString(),...e};return t.unshift(o),t.length>5&&t.pop(),localStorage.setItem(mt,JSON.stringify(t)),o},delete:e=>{let t=Ce.getAll();return t=t.filter(o=>o.id!==e),localStorage.setItem(mt,JSON.stringify(t)),t},getCount:()=>Ce.getAll().length,saveEmergency:e=>{let t={timestamp:Date.now(),data:e};localStorage.setItem(Ye,JSON.stringify(t))},getEmergency:()=>{try{let e=localStorage.getItem(Ye);if(!e)return null;let t=JSON.parse(e);return Date.now()-t.timestamp>432e5?(localStorage.removeItem(Ye),null):t.data}catch{return null}},clearEmergency:()=>{localStorage.removeItem(Ye)}};function Wt(e){let{onSaveCurrent:t,onLoadDraft:o}=e,n=document.createElement("button");n.innerHTML=`
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-top:-1px"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
        Guardar
    `,n.style.cssText=`
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
    `,n.onmouseenter=()=>{n.style.backgroundColor="#F8F9FA",n.style.borderColor="#202124",n.style.color="#202124",n.style.boxShadow="0 2px 4px rgba(0,0,0,0.1)",n.style.transform="translateY(-1px)"},n.onmouseleave=()=>{n.style.backgroundColor="#FFFFFF",n.style.borderColor="#DADCE0",n.style.color="#5F6368",n.style.boxShadow="0 1px 2px rgba(0,0,0,0.05)",n.style.transform="translateY(0)"},n.onmousedown=()=>n.style.transform="scale(0.96)",n.onmouseup=()=>n.style.transform="scale(1) translateY(-1px)",n.onclick=async()=>{if(await ue("Deseja guardar o rascunho atual e limpar os campos?"))try{let b=await t();b?(Ce.save(b),f(),r(),B.playSuccess(),$("Rascunho salvo com sucesso!")):$("Erro: N\xE3o foi poss\xEDvel ler os dados.",{error:!0})}catch(b){console.error("Erro ao salvar rascunho:",b),$("Erro ao salvar.",{error:!0})}};let i=document.createElement("div");i.title="Meus Rascunhos",i.style.cssText="position: relative; cursor: pointer; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; transition: background 0.2s; margin-right: 8px;",i.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#5f6368"><path d="M3 3v5h5"></path><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8"></path><path d="M12 7v5l4 2"></path></svg>';let a=document.createElement("div");a.style.cssText="position: absolute; top: -2px; right: -2px; background: #D93025; color: white; font-size: 10px; font-weight: 700; padding: 2px 5px; border-radius: 10px; display: none; border: 2px solid white; box-shadow: 0 1px 2px rgba(0,0,0,0.2); pointer-events: none;",i.appendChild(a),i.onmouseenter=()=>i.style.background="rgba(0,0,0,0.05)",i.onmouseleave=()=>i.style.background="transparent",i.onclick=d=>{d.stopPropagation(),m()};function r(){let d=Ce.getCount();d>0?(a.style.display="block",a.textContent=d,a.animate([{transform:"scale(1)"},{transform:"scale(1.5)"},{transform:"scale(1)"}],{duration:200})):a.style.display="none"}let s=document.createElement("div");s.style.cssText=`
        position: absolute; bottom: 0; left: 0; width: 100%; height: 90%;
        background: #FFFFFF; z-index: 100;
        border-radius: 20px 20px 0 0;
        box-shadow: 0 -10px 40px rgba(0,0,0,0.15);
        transform: translateY(110%); transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
        display: flex; flex-direction: column; overflow: hidden;
    `;let g=document.createElement("div");g.style.cssText="padding: 16px 24px; border-bottom: 1px solid #F1F3F4; display: flex; justify-content: space-between; align-items: center; background: #fff;",g.innerHTML='<span style="font-size:16px; font-weight:700; color:#202124;">Rascunhos Salvos</span>';let l=document.createElement("button");l.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',l.style.cssText="background:none; border:none; padding:4px; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;",l.onmouseenter=()=>l.style.background="#F1F3F4",l.onmouseleave=()=>l.style.background="transparent",l.onclick=()=>m(!1),g.appendChild(l);let p=document.createElement("div");p.style.cssText="flex: 1; overflow-y: auto; padding: 16px 24px; background: #F8F9FA; display: flex; flex-direction: column; gap: 12px;",s.appendChild(g),s.appendChild(p);function m(d){let b=s.style.transform==="translateY(0%)";(d!==void 0?d:!b)?(f(),s.style.transform="translateY(0%)"):s.style.transform="translateY(110%)"}function f(){let d=Ce.getAll();if(p.innerHTML="",d.length===0){p.innerHTML=`
                <div style="text-align:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F4ED}</div>
                    <div style="font-size:14px; font-weight:500;">Nenhum rascunho guardado</div>
                    <div style="font-size:12px; margin-top:4px;">Use o bot\xE3o "Guardar" para estacionar um caso aqui.</div>
                </div>`;return}d.forEach(b=>{let c=document.createElement("div");c.style.cssText=`
                background: #FFF; padding: 16px; border-radius: 12px;
                border: 1px solid #E0E0E0; box-shadow: 0 1px 3px rgba(0,0,0,0.02);
                position: relative; transition: all 0.2s;
            `;let A=new Date(b.timestamp).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"}),N="";b.summaryTags&&b.summaryTags.length>0&&(N=`<div style="font-size:11px; color:#1A73E8; background:#E8F0FE; display:inline-block; padding:2px 6px; border-radius:4px; margin-top:4px;">\u{1F3F7}\uFE0F ${b.summaryTags.slice(0,3).join(", ")+(b.summaryTags.length>3?"...":"")}</div>`),c.innerHTML=`
                <div style="display:flex; justify-content:space-between; margin-bottom:6px; align-items:flex-start;">
                    <div style="font-weight:700; color:#202124; font-size:14px; line-height:1.4;">${b.clientName||"Cliente Sem Nome"}</div>
                    <div style="font-size:11px; color:#9AA0A6;">${A}</div>
                </div>
                <div style="font-size:12px; color:#5F6368; margin-bottom:12px; line-height:1.5;">
                    <span style="display:block;">\u{1F194} ${b.cid||"---"}</span>
                    <span style="display:block; color:${b.status==="NI"?"#E37400":"#1E8E3E"}">\u25CF ${b.subStatus||b.status||"Sem Status"}</span>
                    ${N}
                </div>
                <div style="display:flex; gap:8px;">
                    <button class="cw-resume-btn" style="flex:1; padding:8px; background:#1A73E8; color:#FFF; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer; box-shadow:0 1px 2px rgba(26,115,232,0.3); transition:all 0.2s;">
                        Retomar Caso
                    </button>
                    <button class="cw-del-btn" style="width:36px; padding:8px; background:#FFF; border:1px solid #DADCE0; color:#5F6368; border-radius:6px; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;" title="Descartar">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;let G=c.querySelector(".cw-resume-btn");G.onclick=async()=>{await ue("Retomar este rascunho? O formul\xE1rio atual ser\xE1 substitu\xEDdo.")&&(o(b),Ce.delete(b.id),f(),r(),m(!1),B.playSwoosh(),$("Rascunho carregado."))};let P=c.querySelector(".cw-del-btn");P.onclick=async()=>{await ue("Excluir este rascunho?",{danger:!0})&&(Ce.delete(b.id),f(),r())},p.appendChild(c)})}return r(),{parkButton:n,historyBtnWrapper:i,drawer:s}}var Yt=e=>new Promise(t=>setTimeout(t,e));function Xe(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>e.dispatchEvent(new MouseEvent(o,t)))}function He(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let o=document.createRange();o.selectNodeContents(t);let n=window.getSelection();n.removeAllRanges(),n.addRange(o);try{document.execCommand("copy")}catch{$("Falha ao copiar",{error:!0})}n.removeAllRanges(),document.body.removeChild(t)}function Ke(e){["input","change","keydown","keyup"].forEach(o=>{let n=new Event(o,{bubbles:!0,cancelable:!0});e.dispatchEvent(n)})}function Xt(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function Je(){console.log("Iniciando processo de Nova Nota...");let e=Xt(),t=e.length,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(r=>r.innerText.trim()==="description");if(n){let r=n.closest("material-fab")||n.closest("material-button");r?(r.style&&(r.style.display="block",r.style.visibility="visible"),Xe(r)):Xe(n)}else{let r=document.querySelector("material-fab-speed-dial");if(r){let s=r.querySelector(".trigger");s?(s.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),Xe(s)):r.click(),await Yt(800);let l=Array.from(document.querySelectorAll("i.material-icons-extended")).find(p=>p.innerText.trim()==="description");l&&Xe(l)}}let i=null,a=0;for(;!i&&a<20;){await Yt(300);let r=Xt();if(r.length>t)i=r.find(s=>!e.includes(s)),i||(i=r[r.length-1]);else if(a>10){let s=r.filter(g=>g.offsetParent!==null);s.length>0&&(i=s[s.length-1])}a++}return i}function Kt(e){let t=document.createElement("div");t.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let o=document.createElement("div");o.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 100px 24px; min-height: 0; scroll-behavior: smooth;";let n=document.createElement("div");n.style.cssText="position: absolute; top: 0; left: 0; width: 100%; height: 1px; background: transparent; transition: box-shadow 0.3s; z-index: 10;",t.appendChild(n),t.appendChild(o),o.addEventListener("scroll",()=>{n.style.boxShadow=o.scrollTop>10?"0 4px 12px rgba(0,0,0,0.05)":"none"});let i={section:"margin-bottom: 24px; animation: fadeIn 0.3s ease;",sectionTitle:"font-family: 'Google Sans', Roboto, sans-serif; font-size: 11px; font-weight: 700; color: #5F6368; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;",label:"display: block; font-size: 13px; font-weight: 600; color: #3C4043; margin-bottom: 6px;",inputWrapper:"margin-bottom: 14px; position: relative;",input:"width: 100%; padding: 10px 12px; border-radius: 6px; border: 1px solid #DADCE0; background: #FFF; font-size: 14px; color: #202124; outline: none; transition: all 0.2s; box-sizing: border-box; font-family: Roboto, sans-serif;",inputError:"border-color: #D93025; background: #FFF4F4;",textarea:"min-height: 80px; resize: vertical; line-height: 1.5;",radioGroup:"display: flex; gap: 8px; margin-bottom: 16px; background: #F1F3F4; padding: 4px; border-radius: 8px;",radioLabel:"flex: 1; text-align: center; padding: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border-radius: 6px; color: #5F6368; transition: all 0.2s; user-select: none;",radioActive:"background: #FFFFFF; color: #1967D2; font-weight: 600; box-shadow: 0 1px 3px rgba(0,0,0,0.1);",banner:"background: #FFF8E1; border: 1px solid #FEEFC3; border-radius: 8px; padding: 12px; margin-bottom: 20px; font-size: 13px; color: #B06000; line-height: 1.4; display: flex; gap: 10px;",hiddenField:"display: none; opacity: 0; transform: translateY(-10px); transition: all 0.3s ease;",visibleField:"display: block; opacity: 1; transform: translateY(0);"},a={};function r({id:G,label:P,type:T="text",placeholder:O="",required:L=!1,parent:_=o}){let D=document.createElement("div");D.style.cssText=i.inputWrapper;let z=document.createElement("label");z.style.cssText=i.label,z.innerHTML=`${P} ${L?'<span style="color:#D93025">*</span>':""}`;let R;return T==="textarea"?(R=document.createElement("textarea"),R.style.cssText=i.input+i.textarea):(R=document.createElement("input"),R.type=T,R.style.cssText=i.input),R.id=G,R.placeholder=O,R.addEventListener("focus",()=>{R.style.borderColor="#1a73e8",R.style.boxShadow="0 0 0 2px rgba(26,115,232,0.15)"}),R.addEventListener("blur",()=>{R.style.borderColor="#DADCE0",R.style.boxShadow="none",L&&R.value.trim()!==""&&(R.style.backgroundColor="#FFF")}),a[G]={input:R,wrapper:D,required:L},D.appendChild(z),D.appendChild(R),_.appendChild(D),D}function s({id:G,label:P,options:T=["Yes","No"],defaultValue:O="No",onChange:L=null}){let _=document.createElement("div");_.style.cssText=i.inputWrapper;let D=document.createElement("label");D.style.cssText=i.label,D.textContent=P,_.appendChild(D);let z=document.createElement("div");z.style.cssText=i.radioGroup;let R=document.createElement("input");return R.type="hidden",R.id=G,R.value=O,_.appendChild(R),T.forEach(H=>{let I=document.createElement("div");I.textContent=H,I.style.cssText=i.radioLabel,H===O&&(I.style.cssText+=i.radioActive),I.onclick=()=>{Array.from(z.children).forEach(x=>x.style.cssText=i.radioLabel),I.style.cssText+=i.radioActive,R.value=H,L&&L(H)},z.appendChild(I)}),a[G]={input:R,wrapper:_,required:!1},_.appendChild(z),o.appendChild(_),_}let g=document.createElement("div");g.style.cssText=i.banner,g.innerHTML=`
        <span>\u26A0\uFE0F</span>
        <div>
            <b>Out of Scope Check:</b><br>
            Certifique-se de consultar o <a href="#" style="color:inherit;text-decoration:underline;">SOP</a> antes de transferir.
        </div>
    `,o.appendChild(g);let l=document.createElement("div");l.style.marginBottom="24px";let p=document.createElement("button");p.innerHTML="\u2728 &nbsp; Auto-Preencher Dados da P\xE1gina",p.style.cssText="width:100%; padding:10px; border:1px dashed #1a73e8; background:#F0F7FF; color:#1a73e8; border-radius:8px; font-weight:600; cursor:pointer; font-size:13px; transition:all 0.2s;",p.onmouseover=()=>p.style.background="#E1EFFF",p.onmouseout=()=>p.style.background="#F0F7FF",l.appendChild(p),o.appendChild(l);let m=document.createElement("div");m.style.cssText=i.section,m.innerHTML=`<div style="${i.sectionTitle}">\u{1F6E0}\uFE0F Dados T\xE9cnicos</div>`,o.appendChild(m),r({id:"cid",label:"Ads CID",placeholder:"000-000-0000",required:!0,parent:m}),r({id:"ga4",label:"GA4 Property ID",parent:m}),r({id:"gtm",label:"GTM Container ID",parent:m});let f=document.createElement("div");f.style.cssText=i.hiddenField,m.appendChild(f),s({id:"hasAccess",label:"Advertiser has access to GA4/GTM?",defaultValue:"No",onChange:G=>{G==="Yes"?f.style.cssText=i.visibleField+"margin-bottom:14px;":(f.style.cssText=i.hiddenField,a.accessEmail.input.value="")}}),r({id:"accessEmail",label:"User Access Email",parent:f}),s({id:"ghosting",label:"Ghosting Available?",defaultValue:"No"});let d=document.createElement("div");d.style.cssText=i.section,d.innerHTML=`<div style="${i.sectionTitle}">\u{1F4DE} Contato & Problema</div>`,o.appendChild(d),r({id:"name",label:"Advertiser Name",required:!0,parent:d}),r({id:"url",label:"Website URL",parent:d}),r({id:"phone",label:"Phone Number",parent:d}),r({id:"email",label:"Contact Email",parent:d}),r({id:"callback",label:"Preferred Callback Time (Timezone)",parent:d}),r({id:"desc",label:"Detailed Issue Description",type:"textarea",placeholder:"Descreva o erro, passos para reproduzir...",required:!0,parent:d}),r({id:"checks",label:"Troubleshooting Performed",type:"textarea",placeholder:"O que voc\xEA j\xE1 testou?",parent:d}),r({id:"screens",label:"Screenshots (Links)",type:"textarea",parent:d});let b=document.createElement("div");b.style.cssText=i.section,b.innerHTML=`<div style="${i.sectionTitle}">\u{1F4E7} C\xF3pias (CC)</div>`,o.appendChild(b),r({id:"cc_adv",label:"Advertiser Contact",parent:b}),r({id:"cc_am",label:"Account Manager",parent:b});let c=document.createElement("div");c.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.95); border-top: 1px solid #E0E0E0; display: flex; justify-content: space-between; align-items: center; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 20;";let C=document.createElement("button");C.innerHTML="Voltar",C.style.cssText="border:none; background:transparent; color:#5F6368; font-weight:600; cursor:pointer; padding: 8px;",C.onclick=e;let A=document.createElement("button");A.textContent="Gerar Nota",A.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 20px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: all 0.2s;",c.appendChild(C),c.appendChild(A),t.appendChild(c),p.onclick=async()=>{let G=p.innerHTML;p.innerHTML="\u23F3 Buscando dados...";try{let P=await xe(),T=0,O=(D,z)=>{let R=a[D];z&&R&&R.input.value===""&&(R.input.value=z,R.input.style.backgroundColor="#E6F4EA",R.input.style.borderColor="#34A853",setTimeout(()=>{R.input.style.backgroundColor="#FFF",R.input.style.borderColor="#DADCE0"},1e3),T++)};O("name",P.advertiserName),O("url",P.websiteUrl),P.clientEmail&&(O("email",P.clientEmail),O("cc_adv",P.clientEmail));let _=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);_&&O("cid",_[0]),T>0?$(`${T} campos preenchidos!`):$("Nenhum dado novo encontrado.")}catch(P){console.error(P),$("Erro ao ler p\xE1gina.")}finally{p.innerHTML=G}};let N=()=>{let G=!0,P=null;return Object.values(a).forEach(T=>{T.required&&!T.input.value.trim()&&(G=!1,T.input.style.cssText+=i.inputError,T.wrapper.animate([{transform:"translateX(0)"},{transform:"translateX(-5px)"},{transform:"translateX(5px)"},{transform:"translateX(0)"}],{duration:300}),P||(P=T.input))}),P&&P.scrollIntoView({behavior:"smooth",block:"center"}),G};return A.onclick=async()=>{if(!N()){$("Preencha os campos obrigat\xF3rios.",{isError:!0});return}let G=D=>a[D].input.value||"N/A",P=G("hasAccess"),T=P==="Yes"?G("accessEmail"):"N/A",L=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${G("cid")}
<b>GA4 ID:</b> ${G("ga4")}
<b>GTM ID:</b> ${G("gtm")}
<b>Advertiser has access to GA4/GTM (Y/N):</b> ${P==="Yes"?"Y":"N"}
<b>If Yes, user access email:</b> ${T}
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
`.replace(/\n/g,"<br>");He(L);let _=await Je();_?(_.innerText.trim()===""&&(_.innerHTML=""),document.execCommand("insertHTML",!1,L),Ke(_),$("Nota gerada e inserida!")):$("Copiado! Abra uma nota para colar.")},t}var le=e=>new Promise(t=>setTimeout(t,e));function de(e,t="info"){let o={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${e}`,o[t]||o.info)}function be(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>e.dispatchEvent(new MouseEvent(o,t)))}function Qe(e,t){if(!e)return;let o=`cw-warning-${e.id||Math.random().toString(36).substr(2,9)}`,n=document.getElementById(o);n&&n.remove();let i=e.getBoundingClientRect(),a=document.createElement("div");a.id=o,a.style.cssText=`
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
    `,a.innerHTML=`
        <div style="display:flex; align-items:flex-start; gap:10px;">
            <span style="color:#F9AB00; font-size:16px; margin-top:1px;">\u26A0\uFE0F</span>
            <span style="line-height:1.4;">${t}</span>
        </div>
        <div class="cw-close-btn" style="
            cursor: pointer; color: #5f6368; font-weight: bold; font-size: 16px; 
            padding: 0 4px; line-height: 1; opacity: 0.6; transition: opacity 0.2s;
        ">\xD7</div>
    `;let r=a.querySelector(".cw-close-btn");r.onclick=()=>{a.style.opacity="0",a.style.transform="translateY(-5px)",setTimeout(()=>a.remove(),300)},document.body.appendChild(a),requestAnimationFrame(()=>{a.style.opacity="1",a.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(a)&&r.click()},25e3)}async function Ze(e,t){if(!e||!t)return;e.focus(),e.value="",e.dispatchEvent(new Event("input",{bubbles:!0})),await le(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(e,t),e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),await le(100),e.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),e.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function gt(){let t=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(o=>{let n=o.offsetParent!==null,i=o.closest("case-message-view")!==null,a=o.closest(".editor")!==null||o.closest("write-card")!==null;return n&&!i&&a});return t&&de("Editor visualmente detectado.","success"),t}async function Jt(){de("\u{1F680} FASE 1: Tentando abrir a janela de email...");let e=!1,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(m=>m.innerText.trim()==="email");if(o&&o.offsetParent!==null){de("Bot\xE3o de email direto encontrado.");let m=o.closest("material-button")||o.closest("material-fab")||o;be(m),e=!0}else{de("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let m=document.querySelector("material-fab-speed-dial");if(m){let f=m.querySelector(".trigger");if(f){be(f),await le(800);let b=Array.from(document.querySelectorAll("i.material-icons-extended")).find(c=>c.innerText.trim()==="email");b&&(be(b),e=!0)}}}if(!e)return $("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;de("\u{1F680} FASE 2: Verificando rascunhos...");let n=null,i=0,a=20;for(;i<a;){await le(250);let m=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(n=Array.from(m).find(f=>f.offsetParent!==null),n){de("\u26A0\uFE0F Rascunho detectado!","warn");break}i++}if(n){de("\u{1F5D1}\uFE0F Descartando..."),be(n),n.click();let m=null,f=0;for(;f<15;){await le(300);let d=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(m=Array.from(d).find(b=>b.offsetParent!==null),m)break;f++}m&&(be(m),$("Limpando rascunho antigo...",{duration:2e3}),await le(2500))}de("\u{1F680} FASE 3: Buscando editor final...");let r=0,s=null;for(;r<20&&(s=gt(),!s);)await le(250),r++;if(!s)return $("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let g=s.closest('[id="email-body-content-top"]'),p=(s.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(g){if(p){let f=p.closest('[aria-hidden="true"]');f&&f.removeAttribute("aria-hidden"),p.focus(),be(p)}await le(300),g.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let m=g.querySelector("#cases-body-field");if(m){let f=document.createRange();f.selectNodeContents(m),f.collapse(!0);let d=window.getSelection();d.removeAllRanges(),d.addRange(f)}return!0}return!1}async function et(e){if(!e||!await Jt())return;let o=await xe();de("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let n=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(n&&(n.click(),await le(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let a=document.querySelector('input[aria-label="Enter To email address"]');a&&(await Ze(a,o.clientEmail),Qe(a,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let a=document.querySelector('input[aria-label="Enter Bcc email address"]');a&&(await Ze(a,o.internalEmail),Qe(a,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}await le(500);let i=document.querySelector('material-button[debug-id="canned_response_button"]');if(i){be(i),await le(1e3);let a=document.querySelector("material-auto-suggest-input input");if(a){be(a),document.execCommand("insertText",!1,e),a.dispatchEvent(new Event("input",{bubbles:!0})),de("\u23F3 Buscando resultado da Canned Response...","info");let r=null,s=0,g=15e3,l=500;for(;s<g&&(r=document.querySelector("material-select-dropdown-item"),!r);)await le(l),s+=l;if(r){be(r),await le(1500);let p=gt();if(p){let f=Array.from(p.querySelectorAll("span.field")).filter(b=>b.innerText.includes("{Requested Task Type}"));if(f.length>0){let b=f.map(C=>C.closest("tr")).filter(C=>C!==null),c=[...new Set(b)];if(c.length>0){let A=c[0].querySelector('td[width="100%"]');A&&(A.innerHTML='<span class="field" style="color:rgb(60, 64, 67)">Enhanced Conversions - Aguardando Valida\xE7\xE3o - Dentro de 7 dias</span>');for(let N=1;N<c.length;N++)c[N].remove()}}let d=p.innerHTML;o.advertiserName&&d.includes("{%ADVERTISER_NAME%}")&&(d=d.replace(/{%ADVERTISER_NAME%}/g,o.advertiserName)),d.includes("{%^79285%}")&&(d=d.replace(/{%\^79285%}/g,o.websiteUrl||"seu site")),p.innerHTML=d}$("Canned Response aplicada!")}else de(`\u274C Timeout: Resultado '${e}' n\xE3o apareceu ap\xF3s 15s.`,"error"),$(`Timeout: Template '${e}' n\xE3o carregou.`,{error:!0})}}else $("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function Qt(e){if(de(`\u{1F680} Iniciando Quick Email: ${e.name}`),!await Jt())return;let o=await xe(),n=at();await le(600);let i=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(i&&(i.click(),await le(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let s=document.querySelector('input[aria-label="Enter To email address"]');s&&(await Ze(s,o.clientEmail),Qe(s,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let s=document.querySelector('input[aria-label="Enter Bcc email address"]');s&&(await Ze(s,o.internalEmail),Qe(s,"<strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia."))}let a=document.querySelector('input[aria-label="Subject"]');a&&e.subject&&(a.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(a,e.subject),a.dispatchEvent(new Event("input",{bubbles:!0})),await le(300));let r=gt();if(r){let g=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');g&&(g.focus(),be(g));let l=new Date;l.setDate(l.getDate()+3);let p=l.getDay();p===6?l.setDate(l.getDate()+2):p===0&&l.setDate(l.getDate()+1);let m=l.toLocaleDateString("pt-BR"),f=e.body;f=f.replace(/\[Nome do Cliente\]/g,o.advertiserName||"Cliente"),f=f.replace(/\[INSERIR URL\]/g,o.websiteUrl||"seu site"),f=f.replace(/\[URL\]/g,o.websiteUrl||"seu site"),f=f.replace(/\[Seu Nome\]/g,n),f=f.replace(/\[MM\/DD\/YYYY\]/g,m),document.execCommand("insertHTML",!1,f),g&&(g.dispatchEvent(new Event("input",{bubbles:!0})),g.dispatchEvent(new Event("change",{bubbles:!0}))),$("Email preenchido com sucesso!",{duration:2e3}),de("\u2705 Processo finalizado com sucesso.","success")}else $("Erro ao focar no editor.",{error:!0})}var J={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00",teal:"#00BFA5",pink:"#F48FB1",gray:"#9AA0A6"},tt=e=>new Promise(t=>setTimeout(t,e));function Zt(e){let t="cw-command-center-style";if(!document.getElementById(t)){let c=document.createElement("style");c.id=t,c.innerHTML=`
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
                
                background: ${J.glassBg};
                backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${J.glassBorder}; border-radius: 50px;
                box-shadow: 0 12px 32px rgba(0,0,0,0.25); z-index: 2147483647;
                
                opacity: 0; 
                width: 56px;
                max-height: 480px;
                
                overflow: visible;

                /* ABRIR: A p\xEDlula expande PRIMEIRO */
                transition: 
                    width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
                    max-height 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
                    padding 0.5s cubic-bezier(0.34, 1.56, 0.64, 1),
                    opacity 0.3s ease,
                    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-pill.docked { opacity: 1; transform: translateX(0) scale(1); }

            /* --- ESTADO COLAPSADO (FECHANDO) --- */
            .cw-pill.collapsed {
                width: 50px !important; 
                max-height: 50px !important;
                padding: 0 !important;
                gap: 0 !important;
                border-radius: 50% !important;
                cursor: pointer;
                
                overflow: hidden !important; 

                /* FECHAR: A p\xEDlula colapsa DEPOIS dos \xEDcones (delay 0.3s) */
                transition: 
                    width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s,
                    max-height 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s,
                    padding 0.5s ease 0.3s,
                    border-radius 0.5s ease 0.3s,
                    opacity 0.3s ease 0s,
                    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s !important;
            }
            
            /* --- LOGO DA BOLINHA --- */
            .cw-main-logo {
                position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                display: flex; align-items: center; justify-content: center;
                pointer-events: none; 
                opacity: 0;
                transform: rotate(-180deg) scale(0.5);
                color: #fff;
                transition: opacity 0.2s ease 0s, transform 0.2s ease 0s;
            }
            .cw-main-logo svg { fill: #fff; width: 24px; height: 24px; transition: fill 0.3s; }
            
            .cw-pill:not(.collapsed) .cw-main-logo {
                transform: rotate(360deg) scale(0);
                opacity: 0;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .cw-pill.collapsed .cw-main-logo { 
                opacity: 1; 
                transform: rotate(0) scale(1);
                /* Aparece depois que a p\xEDlula colapsou */
                transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s;
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
                opacity: 1; transform: scale(1) translateY(0); visibility: visible;
                /* Aparece depois que a p\xEDlula expandiu */
                transition:
                    opacity 0.3s ease 0.4s,
                    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s,
                    visibility 0s linear 0.4s,
                    filter 0.3s ease 0.4s;
            }
            .cw-pill.collapsed > *:not(.cw-main-logo) {
                opacity: 0; pointer-events: none; visibility: hidden;
                transform: scale(0.5); filter: blur(8px);
                /* Desaparece imediatamente */
                transition:
                    opacity 0.2s ease 0s,
                    transform 0.2s ease 0s,
                    filter 0.2s ease 0s,
                    visibility 0s linear 0.2s;
            }

            /* --- CASCATAS DE ENTRADA --- */
            .cw-pill:not(.collapsed) > *:nth-child(2) { transition-delay: 0.40s; } /* Grip */
            .cw-pill:not(.collapsed) > *:nth-child(3) { transition-delay: 0.43s; } /* Notes */
            .cw-pill:not(.collapsed) > *:nth-child(4) { transition-delay: 0.46s; } /* Email */
            .cw-pill:not(.collapsed) > *:nth-child(5) { transition-delay: 0.49s; } /* Script */
            .cw-pill:not(.collapsed) > *:nth-child(6) { transition-delay: 0.52s; } /* Links */
            .cw-pill:not(.collapsed) > *:nth-child(7) { transition-delay: 0.55s; } /* Library */
            .cw-pill:not(.collapsed) > *:nth-child(8) { transition-delay: 0.58s; } /* Timezone */
            .cw-pill:not(.collapsed) > *:nth-child(9) { transition-delay: 0.61s; } /* Configs */
            .cw-pill:not(.collapsed) > *:nth-child(10) { transition-delay: 0.64s; } /* Sep */
            .cw-pill:not(.collapsed) > *:nth-child(11) { transition-delay: 0.67s; } /* Broadcast */

            /* --- ESTILOS DOS BOT\xD5ES --- */
            .cw-btn {
                width: 40px; height: 40px; 
                border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center; 
                cursor: pointer; position: relative; color: ${J.iconIdle};
                flex-shrink: 0;
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-btn:hover {
                background: ${J.glassHighlight};
                color: ${J.iconActive};
                transform: scale(1.18) translateY(-2px) !important;
            }

            .cw-btn.notes.active { color: ${J.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${J.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${J.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${J.green} !important; background: rgba(129, 201, 149, 0.15); }
            .cw-btn.library.active { color: ${J.pink} !important; background: rgba(244, 143, 177, 0.15); } /* [NOVO] */
            .cw-btn.broadcast.active { color: ${J.orange} !important; background: rgba(249, 171, 0, 0.15); }
            .cw-btn.timezone.active { color: ${J.teal} !important; background: rgba(0, 191, 165, 0.15); }
            .cw-btn.configs.active { color: ${J.gray} !important; background: rgba(154, 160, 166, 0.15); }

            .cw-btn.notes:hover { color: ${J.blue}; filter: drop-shadow(0 0 8px rgba(138, 180, 248, 0.6)); }
            .cw-btn.email:hover { color: ${J.red}; filter: drop-shadow(0 0 8px rgba(242, 139, 130, 0.6)); }
            .cw-btn.script:hover { color: ${J.purple}; filter: drop-shadow(0 0 8px rgba(197, 138, 249, 0.6)); }
            .cw-btn.links:hover { color: ${J.green}; filter: drop-shadow(0 0 8px rgba(129, 201, 149, 0.6)); }
            .cw-btn.library:hover { color: ${J.pink}; filter: drop-shadow(0 0 8px rgba(244, 143, 177, 0.6)); }
            .cw-btn.broadcast:hover { color: ${J.orange}; filter: drop-shadow(0 0 8px rgba(249, 171, 0, 0.6)); }
            .cw-btn.timezone:hover { color: ${J.teal}; filter: drop-shadow(0 0 8px rgba(0, 191, 165, 0.6)); }
            .cw-btn.configs:hover { color: ${J.gray}; filter: drop-shadow(0 0 8px rgba(154, 160, 166, 0.6)); }

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
            .cw-grip-bar { width: 24px; height: 4px; background-color: ${J.iconIdle}; border-radius: 4px; opacity: 0.4; transition: all 0.3s; }
            .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
            .cw-pill.dragging .cw-grip-bar { background-color: ${J.blue}; width: 16px; opacity: 1; }

            .cw-pill.dragging {
                box-shadow:
                    0 8px 32px rgba(0,0,0,0.3),
                    0 0 20px rgba(138, 180, 248, 0.4);
                filter: drop-shadow(0 4px 12px rgba(0,0,0,0.2));
                transform: scale(1.02) !important;
                transition: box-shadow 0.2s ease, filter 0.2s ease, transform 0.2s ease !important;
            }

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
            .cw-center-dots span:nth-child(1) { background-color: ${J.blue}; animation-delay: -0.32s; }
            .cw-center-dots span:nth-child(2) { background-color: ${J.red}; animation-delay: -0.16s; }
            .cw-center-dots span:nth-child(3) { background-color: ${J.green}; }
            
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
            
            .cw-center-success { display: none; color: ${J.green}; margin-bottom: 10px; }
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
        `,document.head.appendChild(c)}let o={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>',broadcast:'<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>',main:'<svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>',timezone:'<svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>',library:'<svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12z"/></svg>',configs:'<svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>'},n=document.createElement("div");n.className="cw-pill side-right collapsed",n.innerHTML=`
        <div class="cw-main-logo">${o.main}</div>

        <div class="cw-grip" title="Arrastar">
            <div class="cw-grip-bar"></div>
        </div>
        <button class="cw-btn notes" id="cw-btn-notes" data-label="Case Notes">${o.notes}</button>
        <button class="cw-btn email" id="cw-btn-email" data-label="Quick Email">${o.email}</button>
        <button class="cw-btn script" id="cw-btn-script" data-label="Call Script">${o.script}</button>
        <button class="cw-btn links" id="cw-btn-links" data-label="Links">${o.links}</button>
        <button class="cw-btn library" id="cw-btn-library" data-label="My Library">${o.library}</button>
        <button class="cw-btn timezone" id="cw-btn-timezone" data-label="Time Zones">${o.timezone}</button>
        <button class="cw-btn configs" id="cw-btn-configs" data-label="Configura\xE7\xF5es">${o.configs}</button>
        <div class="cw-sep"></div>
        <button class="cw-btn broadcast" id="cw-btn-broadcast" data-label="Avisos">${o.broadcast}</button>
        <div class="cw-status-container">
            <div class="cw-dots" id="cw-loader"><span></span><span></span><span></span></div>
            <div class="cw-check" id="cw-success" style="display:none;">${o.check}</div>
        </div>
    `;let i=document.createElement("div");i.className="cw-focus-backdrop",document.body.appendChild(i),document.body.appendChild(n);let a=(c,C)=>{B.playClick(),n.querySelector(`.${c}`).classList.toggle("active"),C()};if(n.querySelector(".notes").onclick=c=>{c.stopPropagation(),a("notes",e.toggleNotes)},n.querySelector(".email").onclick=c=>{c.stopPropagation(),a("email",e.toggleEmail)},n.querySelector(".script").onclick=c=>{c.stopPropagation(),a("script",e.toggleScript)},n.querySelector(".links").onclick=c=>{c.stopPropagation(),a("links",e.toggleLinks)},n.querySelector(".library").onclick=c=>{c.stopPropagation(),a("library",e.toggleLibrary)},n.querySelector(".timezone").onclick=c=>{c.stopPropagation(),a("timezone",e.toggleTimezone)},n.querySelector(".configs").onclick=c=>{c.stopPropagation(),a("configs",e.toggleConfigs)},n.querySelector(".broadcast").onclick=c=>{c.stopPropagation(),a("broadcast",()=>{let C=c.currentTarget.querySelector(".cw-badge");C&&C.remove(),e.broadcastControl&&e.broadcastControl.toggle()})},n.querySelectorAll(".cw-btn").forEach(c=>{c.addEventListener("mouseenter",()=>B.playHover())}),e.broadcastControl&&e.broadcastControl.hasUnread){let c=document.createElement("div");c.className="cw-badge",n.querySelector(".broadcast").appendChild(c)}let r=null;n.onmouseleave=()=>{n.querySelector(".cw-btn.active")||n.classList.contains("processing-center")||(r=setTimeout(()=>{n.classList.add("collapsed")},3e3))},n.onmouseenter=()=>{r&&clearTimeout(r)},(async function(){await tt(2800),n.classList.add("docked"),await tt(300);let C=n.querySelectorAll(".cw-btn");n.querySelectorAll(".cw-sep").forEach(A=>A.classList.add("visible"));for(let A=0;A<C.length;A++)C[A].classList.add("popped"),await tt(90);await tt(200),n.classList.add("system-check")})();let s=!1,g,l,p,m,f=3;n.onmousedown=c=>{if(c.target.closest("button"))return;c.preventDefault(),g=c.clientX,l=c.clientY;let C=n.getBoundingClientRect();p=C.left,m=C.top,document.addEventListener("mousemove",d),document.addEventListener("mouseup",b)};function d(c){let C=c.clientX-g,A=c.clientY-l;!s&&Math.sqrt(C*C+A*A)>f&&(s=!0,n.classList.add("dragging"),n.style.transition="none",r&&clearTimeout(r)),s&&(n.style.left=`${p+C}px`,n.style.top=`${m+A}px`,n.style.right="auto",n.style.bottom="auto",n.style.transform="none")}function b(c){if(document.removeEventListener("mousemove",d),document.removeEventListener("mouseup",b),s){s=!1,n.classList.remove("dragging");let C=window.innerWidth,A=window.innerHeight,N=n.getBoundingClientRect(),G=N.left+N.width/2,P;G<C/2?(P=24,n.classList.remove("side-right"),n.classList.add("side-left")):(P=C-N.width-24,n.classList.remove("side-left"),n.classList.add("side-right"));let T=Math.max(24,Math.min(N.top,A-N.height-24));setTimeout(()=>{n.style.setProperty("transition","left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)","important"),n.style.left=`${P}px`,n.style.top=`${T}px`,n.style.bottom="auto",n.style.transform=""},10),setTimeout(()=>{n.style.transition="",n.style.removeProperty("transition")},700)}else{let C=n.querySelector(".cw-btn.active"),A=c.target.closest("button");if(n.classList.contains("collapsed")){let N=n.getBoundingClientRect(),G=window.innerHeight,P=N.top>G/2;if(n.style.setProperty("transition","none","important"),P){let T=G-N.bottom;n.style.top="auto",n.style.bottom=`${T}px`}else n.style.bottom="auto",n.style.top=`${N.top}px`;n.offsetWidth,n.style.removeProperty("transition"),n.classList.remove("collapsed"),B.playGenieOpen()}else!C&&!A&&(n.classList.add("collapsed"),B.playGenieOpen());A&&(A.style.transform="scale(0.9)",setTimeout(()=>A.style.transform="",150))}}}function ot(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop");if(!e)return()=>{};e.classList.remove("collapsed"),window._CW_ABORT_PROCESS=!1;let o=document.createElement("div");o.className="cw-center-stage",o.innerHTML=`
      <div class="cw-center-dots"><span></span><span></span><span></span></div>
      <div class="cw-center-text">${ee.getRandomTip()}</div>
      <div class="cw-center-success"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>
  `;let n=document.createElement("div");n.className="cw-abort-btn",n.textContent="Cancelar",n.onclick=a=>{a.stopPropagation(),window._CW_ABORT_PROCESS=!0,$("Cancelado!",{duration:3e3}),o.remove(),e.classList.remove("processing-center"),e.classList.remove("success"),e.classList.add("collapsed"),t&&t.classList.remove("active")},o.appendChild(n),e.appendChild(o);let i=Date.now();return e.classList.add("processing-center"),t&&t.classList.add("active"),function(){if(window._CW_ABORT_PROCESS||!e.contains(o))return;let r=Date.now()-i,s=Math.max(0,2e3-r);setTimeout(()=>{if(window._CW_ABORT_PROCESS||!e.contains(o))return;let g=o.querySelector(".cw-center-dots"),l=o.querySelector(".cw-center-text"),p=o.querySelector(".cw-center-success"),m=o.querySelector(".cw-abort-btn");g&&(g.style.display="none"),l&&(l.style.display="none"),m&&(m.style.display="none"),p&&p.classList.add("show"),e.classList.add("success"),setTimeout(()=>{e.classList.remove("processing-center"),setTimeout(()=>{o.remove(),e.classList.remove("success"),e.classList.add("collapsed"),t&&t.classList.remove("active")},400)},1e3)},s)}}if(!document.getElementById("cw-module-styles")){let e=document.createElement("style");e.id="cw-module-styles",e.innerHTML=`
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
    `,document.head.appendChild(e)}function ce(e,t,o){let n=document.getElementById(o);if(!t)return;let i=t.getAttribute("data-moved")==="true",a={x:0,y:0};if(n){let p=n.getBoundingClientRect();a.x=p.left+p.width/2,a.y=p.top+p.height/2}let r,s;if(!i)r=window.innerWidth/2,s=window.innerHeight/2;else{let p=t.getBoundingClientRect();r=p.left+p.width/2,s=p.top+p.height/2,r===0&&s===0&&(r=window.innerWidth/2,s=window.innerHeight/2)}let g=a.x-r,l=a.y-s;e?(B.playGenieOpen(),t.style.transition="none",t.style.opacity="0",t.style.pointerEvents="auto",i?t.style.transform=`translate(${g}px, ${l}px) scale(0.05)`:t.style.transform=`translate(calc(-50% + ${g}px), calc(-50% + ${l}px)) scale(0.05)`,t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("open"),n&&n.classList.add("active"),t.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",t.style.opacity="1",i?t.style.transform="translate(0, 0) scale(1)":t.style.transform="translate(-50%, -50%) scale(1)"}),typeof eo=="function"&&eo(t,o)):(B.playSwoosh(),t.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",t.style.pointerEvents="none",requestAnimationFrame(()=>{t.style.opacity="0",i?t.style.transform=`translate(${g}px, ${l}px) scale(0.1)`:t.style.transform=`translate(calc(-50% + ${g}px), calc(-50% + ${l}px)) scale(0.1)`}),setTimeout(()=>{t.classList.remove("open"),n&&n.classList.remove("active"),t.style.transition="",t.style.transform=""},300),typeof bt=="function"&&bt(t))}function eo(e,t){bt(e);let o=n=>{if(!e.classList.contains("open"))return;let i=e.contains(n.target),a=document.querySelector(".cw-pill"),r=a&&a.contains(n.target);i?(e.classList.remove("idle"),e.style.zIndex="2147483648"):r||(e.classList.add("idle"),e.style.zIndex="2147483646")};e._idleHandler=o,document.addEventListener("mousedown",o)}function bt(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}function to(){let e="v4.0.0",{popup:t,content:o,header:n,animRefs:i,credit:a}=Nt(e,G),r=Ut(),s=Vt(()=>{D(),Y.activeTasks=s.getCheckedElements()}),g=document.createElement("div");g.style.display="none";let l=$t((u,y)=>{z(u,y)},Y);g.appendChild(l);let p=Wt({onSaveCurrent:async()=>{let u=await x();return M(),u},onLoadDraft:u=>{E(u)}}),m=T(),f=O(),d=document.createElement("div"),b=R(p);o.appendChild(m),o.appendChild(f),o.appendChild(g),o.appendChild(d),s.selectionElement.style.display="none",s.screenshotsElement.style.display="none";let c=document.createElement("button");c.id="manual-task-toggle",c.textContent="Gostaria de adicionar uma task",c.style.cssText="display: none; width: 100%; padding: 10px; border: 1px dashed #dadce0; background: transparent; color: #5f6368; border-radius: 10px; cursor: pointer; font-size: 13px; font-weight: 500; margin-top: 8px;",c.onclick=()=>{s.selectionElement.style.display="block",c.style.display="none"},o.appendChild(c),o.appendChild(s.selectionElement),o.appendChild(r.element),o.appendChild(s.screenshotsElement),o.appendChild(b);let C=document.createElement("div");C.style.display="none",C.style.flexGrow="1",C.style.minHeight="0",C.style.overflow="hidden";let A=Kt(()=>P());A.style.height="100%",C.appendChild(A),t.insertBefore(C,a);let N=n.lastElementChild;N&&(N.insertBefore(p.historyBtnWrapper,N.firstChild),N.insertBefore(S(),N.firstChild)),t.appendChild(p.drawer),Y.subscribe(u=>{});function G(){Y.visible=!Y.visible,ce(Y.visible,t,"cw-btn-notes")}function P(){Y.isSplitView=!Y.isSplitView,Y.isSplitView?(o.style.display="none",C.style.display="flex",C.style.flexDirection="column",i.googleLine&&(i.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)")):(o.style.display="flex",C.style.display="none",i.googleLine&&(i.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"))}function T(){let u=document.createElement("div");if(u.innerHTML=`
            <div class="cw-section-title">${h("idioma")}</div>
            <div class="cw-segmented-control" id="lang-selector">
                <button data-lang="pt" class="active">Portugu\xEAs</button>
                <button data-lang="es">Espa\xF1ol</button>
            </div>
            <div class="cw-section-title">${h("fluxo")}</div>
            <div class="cw-segmented-control" id="type-selector">
                <button data-type="bau" class="active">BAU</button>
                <button data-type="lm">LM</button>
            </div>
        `,!document.getElementById("cw-segmented-styles")){let y=document.createElement("style");y.id="cw-segmented-styles",y.innerHTML=`
                .cw-segmented-control { display: flex; background: #f1f3f4; padding: 4px; border-radius: 12px; gap: 4px; }
                .cw-segmented-control button { flex: 1; border: none; background: transparent; padding: 8px; font-size: 13px; font-weight: 500; border-radius: 8px; cursor: pointer; transition: all 0.2s; color: #5f6368; }
                .cw-segmented-control button.active { background: #fff; color: #1a73e8; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
            `,document.head.appendChild(y)}return u.querySelectorAll("#lang-selector button").forEach(y=>{y.onclick=()=>{Y.setLanguage(y.dataset.lang),u.querySelectorAll("#lang-selector button").forEach(v=>v.classList.remove("active")),y.classList.add("active")}}),u.querySelectorAll("#type-selector button").forEach(y=>{y.onclick=()=>{Y.setCaseType(y.dataset.type),u.querySelectorAll("#type-selector button").forEach(v=>v.classList.remove("active")),y.classList.add("active")}}),u}function O(){let u=document.createElement("div");u.className="cw-status-section",u.style.cssText="display: flex; flex-direction: column; gap: 8px;",u.innerHTML=`
            <div class="cw-section-title" style="margin-top: 8px;">${h("status_principal")}</div>
            <select id="main-status-select" class="cw-select">
                <option value="" disabled selected>${h("select_status")}</option>
                <option value="NI">NI - Need Info</option>
                <option value="SO">SO - Solution Offered</option>
                <option value="IN">IN - Inactive</option>
                <option value="AS">AS - Assigned</option>
                <option value="DC">DC - Discard</option>
            </select>
            <div class="cw-section-title" style="margin-top: 8px;">${h("substatus")}</div>
            <select id="sub-status-select" class="cw-select" disabled>
                <option value="">${h("select_substatus")}</option>
            </select>
        `;let y=u.querySelector("#main-status-select"),v=u.querySelector("#sub-status-select");return y.onchange=()=>{Y.setStatus(y.value),L(y.value,v)},v.onchange=()=>{Y.setSubStatus(v.value),_(v.value)},u}function L(u,y){if(y.innerHTML=`<option value="">${h("select_substatus")}</option>`,!u){y.disabled=!0;return}for(let v in Se)if(Se[v].status===u){let w=document.createElement("option");w.value=v,w.textContent=Se[v].name,y.appendChild(w)}y.disabled=!1}function _(u){if(!u){g.style.display="none",d.style.display="none",document.getElementById("manual-task-toggle").style.display="none";return}Pt(u,d,Y),d.style.display="block",g.style.display="block";let y=Se[u],v=u.startsWith("SO_"),w=u==="NI_Awaiting_Validation",F=document.getElementById("manual-task-toggle");v||w?(s.selectionElement.style.display="block",F.style.display="none"):(s.selectionElement.style.display="none",s.screenshotsElement.style.display="none",F.style.display="block"),s.updateSubStatus(u),D()}function D(){let u=s.getCheckedElements().map(y=>y.value);r.updateVisibility(Y.currentSubStatus,u)}function z(u,y){let v=u.content;if(typeof v=="object"){for(let w in v)if(w==="linkedTask")s.toggleTask(v.linkedTask,y);else if(w==="activeTasks")y&&v.activeTasks.forEach(F=>s.setTaskCount(F.value,F.count));else if(w.startsWith("field-")&&y){Y.updateField(w,v[w]);let F=document.getElementById(w);if(F){if(Ne.includes(w.replace("field-",""))){let j=F.value.trim();j&&!j.includes(v[w].trim())?F.value=j+`
`+v[w]:F.value=v[w]}else F.value=v[w];F.dispatchEvent(new Event("input"))}}}else{let w=d.querySelector("textarea");if(w){if(y){let F=w.value.trim();F&&!F.includes(v.trim())?w.value=F+`
`+v:w.value=v}w.dispatchEvent(new Event("input"))}}}function R(u){let y=document.createElement("div");y.className="cw-actions-section",y.style.display="flex",y.style.gap="8px",y.style.paddingTop="16px",y.style.marginTop="16px",y.style.borderTop="1px solid #eee";let v=u.parkButton;v.style.marginTop="0";let w=document.createElement("button");w.className="cw-btn-secondary",w.textContent=h("copiar"),w.style.flex="1",w.onclick=()=>H();let F=document.createElement("button");return F.className="cw-btn-primary",F.textContent=h("preencher"),F.style.flex="1",F.onclick=()=>I(),y.appendChild(u.parkButton),y.appendChild(w),y.appendChild(F),y}async function H(){let u=dt(Y,s,r);u?(He(u),$(h("copiado_sucesso")),B.playClick()):$(h("select_substatus"),{error:!0})}async function I(){let u=dt(Y,s,r);if(!u){$(h("select_substatus"),{error:!0});return}He(u),G();let y=ot(),v=await Je();v&&(v.focus(),document.execCommand("insertHTML",!1,u),Ke(v),Y.currentSubStatus&&_e[Y.currentSubStatus]&&await et(_e[Y.currentSubStatus]),$(h("inserido_copiado")),B.playSuccess(),M()),y()}function M(){Y.reset(),s.reset(),r.reset(),o.querySelectorAll("select").forEach(u=>u.value=""),o.querySelector("#sub-status-select").disabled=!0,d.innerHTML="",g.style.display="none"}async function x(){let u={};d.querySelectorAll("input, textarea").forEach(v=>u[v.id]=v.value);let y=await xe();return{currentCaseType:Y.currentCaseType,currentLang:Y.currentLang,status:Y.currentStatus,subStatus:Y.currentSubStatus,formData:u,activeTasks:s.getCheckedElements().map(v=>({key:v.value,count:v.count})),clientName:y.advertiserName,cid:y.cid,timestamp:new Date().toISOString()}}function E(u){Y.setLanguage(u.currentLang),Y.setCaseType(u.currentCaseType);let y=o.querySelector(`#lang-selector button[data-lang="${u.currentLang}"]`);y&&y.click();let v=o.querySelector(`#type-selector button[data-type="${u.currentCaseType}"]`);if(v&&v.click(),u.status){let w=o.querySelector("#main-status-select");w.value=u.status,w.dispatchEvent(new Event("change")),setTimeout(()=>{if(u.subStatus){let F=o.querySelector("#sub-status-select");F.value=u.subStatus,F.dispatchEvent(new Event("change")),setTimeout(()=>{for(let j in u.formData){let q=document.getElementById(j);q&&(q.value=u.formData[j],q.dispatchEvent(new Event("input")))}u.activeTasks&&u.activeTasks.forEach(j=>s.setTaskCount(j.key,j.count))},100)}},50)}}function h(u){return we[Y.currentLang]?.[u]||we.pt?.[u]||u}function S(){let u=document.createElement("div");return u.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',u.style.cssText="width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%; cursor: pointer; color: #9AA0A6; transition: all 0.2s;",u.onclick=y=>{y.stopPropagation(),P()},u.title="Alternar para Split & Transfer",u}function k(u){}return Y.setLanguage("pt"),Y.setCaseType("bau"),document.body.appendChild(t),G}var qe={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function oo(){let e="v4.2.0 CR-Hybrid",t="CANNED_RESPONSES",o=Object.keys(qe)[0],n="",i="list",a=!1,r={bgApp:"#F8F9FA",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.08)",borderFocus:"rgba(26, 115, 232, 0.4)",textPrimary:"#202124",textSecondary:"#5F6368",primary:"#1A73E8",primaryBg:"#E8F0FE",shadowCard:"0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",shadowHover:"0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",transition:"all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1)"},s={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:r.bgApp},g={display:"flex",width:"200%",height:"100%",transition:"transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",transform:"translateX(0)",willChange:"transform"},l={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},p={padding:"20px 24px 12px 24px",flexShrink:"0",background:r.bgApp,zIndex:"10",display:"flex",flexDirection:"column",gap:"16px",borderBottom:`1px solid ${r.borderSubtle}`},m={width:"100%",height:"44px",padding:"0 16px 0 48px",borderRadius:"12px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",fontWeight:"400",color:r.textPrimary,boxSizing:"border-box",outline:"none",transition:r.transition,boxShadow:"0 2px 5px rgba(0,0,0,0.03)",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%239AA0A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"16px center"},f={display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px",paddingBottom:"4px"},d={padding:"6px 14px",borderRadius:"100px",border:"1px solid #DADCE0",background:"#FFFFFF",color:r.textSecondary,fontSize:"13px",fontWeight:"500",letterSpacing:"0.3px",cursor:"pointer",transition:r.transition,flexShrink:"0",display:"flex",alignItems:"center",justifyContent:"center"},b={background:r.primaryBg,color:r.primary,borderColor:"transparent",fontWeight:"600",boxShadow:"0 1px 2px rgba(26, 115, 232, 0.15)"},c={padding:"16px 24px 80px 24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"12px"},C={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",height:"72px",minHeight:"72px",borderRadius:"16px",background:r.bgSurface,border:"1px solid transparent",boxShadow:r.shadowCard,cursor:"pointer",transition:"all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",position:"relative",overflow:"hidden"},A=document.createElement("div");A.id="quick-email-popup",A.classList.add("cw-module-window"),Object.assign(A.style,re,{right:"100px",width:"440px",height:"640px",borderRadius:"20px",boxShadow:"0 24px 64px rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.4)"});let N={popup:A,googleLine:null,focusElement:null};function G(){a=!a,ce(a,A,"cw-btn-email"),a||setTimeout(()=>E(),300)}let P=se(A,"Quick Email",e,"Templates & Automa\xE7\xF5es",N,()=>G()),T=document.createElement("div");Object.assign(T.style,s);let O=document.createElement("div");Object.assign(O.style,g);let L=document.createElement("div");Object.assign(L.style,l);let _=document.createElement("div");Object.assign(_.style,p);let D=document.createElement("input");D.placeholder="Pesquisar templates...",Object.assign(D.style,m),D.onfocus=()=>{D.style.borderColor=r.primary,D.style.boxShadow="0 0 0 4px rgba(26, 115, 232, 0.15)",D.style.background="#fff"},D.onblur=()=>{D.style.borderColor="transparent",D.style.boxShadow="0 2px 5px rgba(0,0,0,0.03)",D.style.background="#fff"},N.focusElement=D;let z=document.createElement("div");Object.assign(z.style,f);let R=document.createElement("div");Object.assign(R.style,c),_.appendChild(D),_.appendChild(z),L.appendChild(_),L.appendChild(R);let H=document.createElement("div");Object.assign(H.style,l);let I=document.createElement("div");Object.assign(I.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),H.appendChild(I),O.appendChild(L),O.appendChild(H),T.appendChild(O),A.appendChild(P),A.appendChild(T),document.body.appendChild(A);async function M(u,y){try{a&&G();let v=ot();await new Promise(w=>setTimeout(w,800)),y==="email"?await Qt(u):y==="cr"&&await et(u),v()}catch(v){console.error("\u274C Erro:",v);let w=document.querySelector(".cw-focus-backdrop");w&&w.classList.remove("active")}}function x(u){i="detail",O.style.transform="translateX(-50%)";let y='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',v='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';I.innerHTML=`
            <style>
                .cw-email-content p { margin: 0 0 8px 0; } /* Margem apenas embaixo */
                .cw-email-content ul { margin: 0 0 8px 16px; padding: 0; }
                .cw-email-content li { margin-bottom: 4px; }
            </style>

            <div style="position:sticky; top:0; background:rgba(255,255,255,0.9); backdrop-filter:blur(12px); border-bottom:1px solid #eee; padding:16px 24px; z-index:10; display:flex; align-items:center; gap:12px;">
                <button id="csa-back-btn" style="background:none; border:none; cursor:pointer; display:flex; color:#5f6368; padding:8px; margin-left:-12px; border-radius:50%; transition:background 0.2s;">${y}</button>
                <div style="font-weight:600; font-size:16px; color:#202124; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${u.name}</div>
            </div>
            
            <div style="padding:24px;">
                <div style="margin-bottom:24px;">
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Assunto</div>
                    <div style="font-size:14px; font-weight:500; color:#202124; padding:16px; background:#F8F9FA; border-radius:12px; border:1px solid #eee; box-shadow:inset 0 1px 2px rgba(0,0,0,0.02);">${u.subject}</div>
                </div>
                
                <div>
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Mensagem</div>
                    
                    <div class="cw-email-content" style="font-size:13px; color:#3c4043; line-height:1.5; white-space: normal; word-break: break-word; padding:0 4px;">
                        ${u.body}
                    </div>
                </div>
            </div>
            
            <div style="position:sticky; bottom:0; padding:24px; background:linear-gradient(to top, #fff 90%, rgba(255,255,255,0)); pointer-events:none;">
                <button id="csa-insert-btn" style="pointer-events:auto; width:100%; padding:14px; background:#1a73e8; color:white; border:none; border-radius:12px; font-size:14px; font-weight:600; cursor:pointer; display:flex; justify-content:center; align-items:center; gap:10px; box-shadow:0 4px 12px rgba(26,115,232,0.3); transition:transform 0.2s, box-shadow 0.2s;">
                    ${v} Usar Template
                </button>
            </div>
        `;let w=I.querySelector("#csa-back-btn");w.onmouseenter=()=>w.style.background="#f1f3f4",w.onmouseleave=()=>w.style.background="none",w.onclick=E;let F=I.querySelector("#csa-insert-btn");F.onmouseenter=()=>{F.style.transform="translateY(-1px)",F.style.boxShadow="0 6px 16px rgba(26,115,232,0.4)"},F.onmouseleave=()=>{F.style.transform="translateY(0)",F.style.boxShadow="0 4px 12px rgba(26,115,232,0.3)"},F.onclick=()=>{F.style.transform="scale(0.96)",M(u,"email"),setTimeout(()=>{F.style.transform="scale(1)",E()},300)}}function E(){i="list",O.style.transform="translateX(0)"}function h(u,y,v=null){let w=document.createElement("button"),F=v?`<span style="margin-right:6px; font-size:14px; opacity:0.9;">${v}</span>`:"";return w.innerHTML=`${F}${u}`,Object.assign(w.style,d),o===y&&n===""?Object.assign(w.style,b):(w.onmouseenter=()=>{w.style.background="#F1F3F4",w.style.borderColor="#DADCE0"},w.onmouseleave=()=>{w.style.background="#FFFFFF",w.style.borderColor="#DADCE0"}),w.onclick=()=>{o=y,n="",D.value="",S(),k()},w}function S(){z.innerHTML="",z.appendChild(h("Smart CRs",t,"\u26A1")),z.appendChild(h("Pessoal","PERSONAL_LIBRARY","\u{1F464}")),Object.keys(qe).forEach(u=>{z.appendChild(h(qe[u].title,u))})}function k(){R.innerHTML="";let u=[];if(n.trim()!==""){let j=n.toLowerCase();Object.values(qe).forEach(q=>{q.emails.forEach(V=>{(V.name.toLowerCase().includes(j)||V.subject.toLowerCase().includes(j))&&u.push({type:"email",data:V})})}),ne.getSnippets("email").forEach(q=>{(q.title.toLowerCase().includes(j)||q.subject&&q.subject.toLowerCase().includes(j))&&u.push({type:"email",data:{name:q.title,subject:q.subject||"Sem Assunto",body:q.content}})}),Object.entries(_e).forEach(([q,V])=>{if(!V)return;(q.replace(/_/g," ").toLowerCase().includes(j)||V.toLowerCase().includes(j))&&u.push({type:"cr",key:q,code:V})})}else o===t?Object.entries(_e).forEach(([j,q])=>{q&&u.push({type:"cr",key:j,code:q})}):o==="PERSONAL_LIBRARY"?ne.getSnippets("email").forEach(j=>{u.push({type:"email",data:{name:j.title,subject:j.subject||"Sem Assunto",body:j.content}})}):qe[o]&&qe[o].emails.forEach(j=>{u.push({type:"email",data:j})});if(u.length===0){R.innerHTML=`
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F50D}</div>
                    <div style="font-size:14px; font-weight:500;">Nenhum template encontrado</div>
                    <div style="font-size:12px; margin-top:4px;">Tente outro termo de busca</div>
                </div>`;return}let v='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1967D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',w='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA8600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',F='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BDC1C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';u.forEach(j=>{let q=document.createElement("div");if(Object.assign(q.style,C),j.type==="email"){let V=j.data,X=V.subject.length>45?V.subject.substring(0,45)+"...":V.subject;q.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#E8F0FE; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${v}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${V.name}</div>
                        <div style="font-size:12px; color:#5F6368; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${X}</div>
                    </div>
                    <div style="margin-left:12px; opacity:0.6;">${F}</div>
                `,q.onclick=()=>x(V)}else{let V=j.key.replace(/_/g," ").replace("AS ","AS - ").replace("NI ","NI - ");q.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#FEF7E0; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${w}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; margin-bottom:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${V}</div>
                        <div style="font-size:11px; font-weight:500; color:#EA8600; font-family:'Roboto Mono', monospace; letter-spacing:-0.2px;">${j.code}</div>
                    </div>
                    <div style="font-size:10px; font-weight:700; color:#DADCE0; text-transform:uppercase; letter-spacing:0.5px; border:1px solid #F1F3F4; padding:4px 8px; border-radius:6px; margin-left:12px;">Inserir</div>
                `,q.onclick=()=>{q.style.transform="scale(0.98)",q.style.background="#FEF7E0",setTimeout(()=>{q.style.transform="scale(1)",q.style.background="#fff",M(j.code,"cr")},150)}}q.onmouseenter=()=>{q.style.transform="translateY(-2px)",q.style.boxShadow=r.shadowHover,j.type==="cr"?q.style.borderLeft="3px solid #Fbbc04":q.style.borderLeft="3px solid #1a73e8"},q.onmouseleave=()=>{q.style.transform="translateY(0)",q.style.boxShadow=r.shadowCard,q.style.borderLeft="1px solid transparent"},R.appendChild(q)})}return D.addEventListener("input",u=>{n=u.target.value,n!==""?Array.from(z.children).forEach(y=>{Object.assign(y.style,d),y.style.opacity="0.6"}):S(),k()}),S(),k(),G}var no={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],meio:["Ofertar Implementa\xE7\xE3o via Tag Support (Acesso Tempor\xE1rio)","Enviar e orientar aceite do email 'Consentimento e autoriza\xE7\xE3o...'","Confirmar recebimento do acesso","Iniciar Configura\xE7\xE3o (Aviso de sil\xEAncio ~10min)","[Caso Recuse] Seguir com Compartilhamento de Tela"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function ao(){let e="v2.6 (Context HD)",t="csa-local-styles";if(!document.getElementById(t)){let h=document.createElement("style");h.id=t,h.innerHTML=`
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
      `,document.head.appendChild(h)}let o={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#FFFFFF",scrollBehavior:"smooth"},card:{background:"#FFFFFF",border:"1px solid #E5E7EB",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"12px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.8px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"8px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.1s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.6",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"18px",height:"18px",borderRadius:"6px",border:"2px solid #DADCE0",marginRight:"12px",marginTop:"2px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #F1F3F4",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"},contextBanner:{padding:"20px 20px 16px 20px",background:"#FFFFFF",borderBottom:"1px solid #F1F3F4",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 20px rgba(0,0,0,0.02)",position:"relative",zIndex:"5"}},n={},i="PT",a="BAU",r=!1,s=document.createElement("div");s.id="call-script-popup",s.classList.add("cw-module-window"),Object.assign(s.style,re,{right:"auto",left:"50%",width:"420px",height:"700px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let g={popup:s,googleLine:null},l=null;function p(){r&&xe().then(h=>{let S=s.querySelector("#cw-ctx-name"),k=s.querySelector("#cw-ctx-cid"),u=s.querySelector("#cw-ctx-email");if(S&&(S.textContent=h.advertiserName||"Cliente Desconhecido"),k){let y=h.cid||"---";k.textContent!==y&&(k.textContent=y)}if(u){let y=h.clientEmail||"N\xE3o encontrado";u.textContent!==y&&(u.textContent=y,u.title=y)}})}function m(){r=!r,ce(r,s,"cw-btn-script"),r?(p(),l||(l=setInterval(p,2e3))):l&&(clearInterval(l),l=null)}let f=se(s,"Call Script",e,"Guia interativo para condu\xE7\xE3o de chamadas.",g,()=>{m()});s.appendChild(f);let d=document.createElement("div");Object.assign(d.style,o.contextBanner),d.innerHTML=`
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
  `;let b=(h,S)=>{let k=d.querySelector(h),u=d.querySelector(S);k.onclick=()=>{let y=u.textContent;!y||y.includes("---")||y.includes("N\xE3o encontrado")||(navigator.clipboard.writeText(y),B.playSuccess(),k.classList.add("copied"),setTimeout(()=>k.classList.remove("copied"),1500))}};s.appendChild(d);let c=document.createElement("div");Object.assign(c.style,o.progressBarContainer);let C=document.createElement("div");Object.assign(C.style,o.progressBarFill),c.appendChild(C),s.appendChild(c);let A=document.createElement("div");A.id="csa-content",Object.assign(A.style,o.contentArea),s.appendChild(A);let N=document.createElement("div");Object.assign(N.style,o.footer);let G=document.createElement("span");G.textContent="by lucaste@",Object.assign(G.style,{fontSize:"10px",color:"#bdc1c6"});let P=document.createElement("button");P.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg> Resetar Script',Object.assign(P.style,o.resetBtn),P.onmouseenter=()=>P.style.background="#fce8e6",P.onmouseleave=()=>P.style.background="transparent",P.onclick=()=>{P.style.transform="scale(0.9)",setTimeout(()=>P.style.transform="scale(1)",150);for(let h in n)delete n[h];I()},N.appendChild(G),N.appendChild(P),s.appendChild(N);let T=document.createElement("div");Object.assign(T.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let O=document.createElement("div");Object.assign(O.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let L=document.createElement("div");L.textContent="BAU";let _=document.createElement("div");_.textContent="LT",Object.assign(L.style,ze),Object.assign(_.style,ze),O.appendChild(L),O.appendChild(_);let D=document.createElement("select");Object.assign(D.style,Ue,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),D.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',D.value=i,T.appendChild(O),T.appendChild(D),A.appendChild(T);let z=document.createElement("div");z.id="csa-checklist-area",A.appendChild(z);let R=document.createElement("div");Object.assign(R.style,Ee),R.className="no-drag",R.title="Redimensionar",s.appendChild(R),Te(s,R),document.body.appendChild(s),b("#cw-pill-cid","#cw-ctx-cid"),b("#cw-pill-email","#cw-ctx-email");function H(h){return h}function I(){z.innerHTML="";let h=`${i} ${a}`,S=no[h];if(!S){z.innerHTML='<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;"><div style="font-size: 24px;">\u2615</div><div>Script n\xE3o configurado.</div></div>',C.style.width="0%";return}let k=S.color||"#1a73e8",u=0,y=0;["inicio","meio","fim"].forEach(v=>{S[v]&&(u+=S[v].length)}),["inicio","meio","fim"].forEach((v,w)=>{let F=S[v];if(!F||F.length===0)return;let j=document.createElement("div");Object.assign(j.style,o.card);let q=document.createElement("div");Object.assign(q.style,o.cardTitle);let V="";v==="inicio"?i.includes("ES")?V="Apertura":i.includes("EN")?V="Opening":V="Abertura":v==="meio"?i.includes("ES")?V="Implementaci\xF3n":i.includes("EN")?V="Implementation":V="Implementa\xE7\xE3o (Tag Support)":v==="fim"&&(i.includes("ES")?V="Cierre":i.includes("EN")?V="Closing":V="Fechamento"),q.textContent=V;let X=document.createElement("span");X.style.fontSize="11px",X.style.opacity="0.7",X.style.fontWeight="500",X.style.background="#f1f3f4",X.style.padding="2px 8px",X.style.borderRadius="10px",q.appendChild(X),j.appendChild(q);let ae=0;F.forEach((ie,fe)=>{let Q=`${h}-${v}-${fe}`,pe=!!n[Q];pe&&(y++,ae++);let oe=document.createElement("div");Object.assign(oe.style,o.itemRow);let K=document.createElement("div");Object.assign(K.style,o.checkbox);let Z=document.createElement("span");Z.innerHTML=ie,Z.style.flex="1",pe?(Object.assign(oe.style,o.itemCompleted),K.style.background=k,K.style.borderColor=k,K.style.transform="scale(1)",K.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(oe.style.textDecoration="none",oe.style.opacity="1",K.style.background="transparent",K.style.borderColor="#dadce0",K.style.transform="scale(1)",K.innerHTML=""),oe.onclick=()=>{let te=!n[Q];n[Q]=te,B.playClick(),te?(K.style.transform="scale(1.2)",setTimeout(()=>K.style.transform="scale(1)",150),Object.assign(oe.style,o.itemCompleted),K.style.background=k,K.style.borderColor=k,K.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(oe.style.textDecoration="none",oe.style.opacity="1",K.style.background="transparent",K.style.borderColor="#dadce0",K.innerHTML=""),M(h,S)},oe.onmouseenter=()=>{n[Q]||(oe.style.background="#f1f3f4",K.style.borderColor=k)},oe.onmouseleave=()=>{n[Q]||(oe.style.background="transparent",K.style.borderColor="#dadce0")},oe.appendChild(K),oe.appendChild(Z),j.appendChild(oe)}),ae===F.length&&F.length>0&&(X.style.color="#1e8e3e",X.style.background="#e6f4ea",j.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),X.textContent=`${ae}/${F.length}`,z.appendChild(j)}),x(u,y)}function M(h,S){let k=0,u=0;["inicio","meio","fim"].forEach(y=>{let v=S[y]||[];k+=v.length,v.forEach((w,F)=>{n[`${h}-${y}-${F}`]&&u++})}),x(k,u),setTimeout(()=>I(),200)}function x(h,S){let k=h===0?0:S/h*100;C.style.width=`${k}%`,C.style.background=k===100?"#34A853":"linear-gradient(90deg, #4285F4, #34A853)"}function E(h){a=h;let S=It();Object.assign(L.style,ze),Object.assign(_.style,ze),Object.assign(h==="BAU"?L.style:_.style,S),I()}return L.onclick=()=>E("BAU"),_.onclick=()=>E("LT"),D.addEventListener("change",h=>{i=h.target.value,I()}),E(a),m}var je={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"},{name:"Skill Shop",url:"https://skillshop.withgoogle.com/intl/pt-BR_ALL/",desc:"Cursos"}]}},Le={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},nt={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}},ft="cw_link_history_v4";function io(e,t){try{let o=JSON.parse(localStorage.getItem(ft)||"[]");o=o.filter(n=>n.url!==e.url),o.unshift({...e,_originalCat:t}),o=o.slice(0,3),localStorage.setItem(ft,JSON.stringify(o))}catch(o){console.warn("Erro ao salvar hist\xF3rico",o)}}function Mo(){try{return JSON.parse(localStorage.getItem(ft)||"[]")}catch{return[]}}function ro(){let e="v4.6",t="",o=!1,n=null,i=!1,a={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},r=document.createElement("div");r.id="links-popup",r.classList.add("cw-module-window"),Object.assign(r.style,re,{right:"100px",width:"600px",height:"650px",background:a.bgApp,overflow:"hidden"});let g=se(r,"Central de Links",e,"Navegue pelas categorias ou use a busca.",{popup:r,googleLine:null},()=>R());r.appendChild(g);let l=document.createElement("div");l.style.cssText="display: flex; height: calc(100% - 56px); width: 100%; position: relative;",r.appendChild(l);let p=document.createElement("div");p.style.cssText=`
      width: 80px; flex-shrink: 0; background: ${a.bgSidebar};
      border-right: 1px solid ${a.borderSubtle};
      display: flex; flex-direction: column; align-items: center;
      padding: 16px 0; overflow-y: auto; gap: 8px;
      scrollbar-width: none; z-index: 2;
  `,l.appendChild(p);let m=document.createElement("div");m.style.cssText="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F8F9FA; position: relative; z-index: 1;",l.appendChild(m);let f=document.createElement("div");f.style.cssText="padding: 16px 24px; flex-shrink: 0; background: transparent;";let d=document.createElement("div");d.style.cssText=`
      position: relative; width: 100%; height: 44px;
      border-radius: 12px; border: 1px solid transparent;
      background: #FFFFFF; transition: all 0.2s;
      display: flex; align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  `;let b=document.createElement("div");b.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',b.style.cssText="margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none;";let c=document.createElement("input");c.type="text",c.placeholder="Buscar ferramenta ou SOP...",c.style.cssText=`
      flex: 1; height: 100%; border: none; background: transparent;
      padding: 0 12px; font-size: 14px; color: ${a.textPrimary};
      outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
  `,c.onfocus=()=>{d.style.boxShadow="0 4px 12px rgba(26,115,232,0.15)",d.style.border="1px solid #1a73e8"},c.onblur=()=>{d.style.boxShadow="0 2px 6px rgba(0,0,0,0.04)",d.style.border="1px solid transparent"},d.appendChild(b),d.appendChild(c),f.appendChild(d),m.appendChild(f);let C=document.createElement("div");C.style.cssText="flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth;",m.appendChild(C);let A=null;function N(){if(A)return;A=document.createElement("div"),A.style.cssText=`
          position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255,255,255,0.98); z-index: 20;
          display: flex; flex-direction: column;
          transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
      `;let H=document.createElement("div");H.style.cssText="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4;",H.innerHTML='<span style="font-size: 16px; font-weight: 700; color: #202124;">\u{1F552} Recentes</span>';let I=document.createElement("button");I.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',I.style.cssText="background: none; border: none; cursor: pointer; color: #5f6368;",I.onclick=()=>{P(),i=!1,_()},H.appendChild(I),A.appendChild(H);let M=document.createElement("div");M.id="cw-history-list",M.style.cssText="flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA;",A.appendChild(M),m.appendChild(A)}function G(){A||N();let H=A.querySelector("#cw-history-list");H.innerHTML="";let I=Mo();I.length===0?H.innerHTML='<div style="text-align: center; color: #999; margin-top: 60px; font-size:13px;">Nada por aqui ainda.</div>':I.forEach(M=>{let x=z(M,Le[M._originalCat],!0,M._originalCat);H.appendChild(x)}),requestAnimationFrame(()=>A.style.transform="translateY(0)")}function P(){A&&(A.style.transform="translateY(100%)")}function T(){p.innerHTML="";let H=O("history","Recentes",Le.history);H.id="cw-sidebar-btn-history",H.onclick=()=>{B.playClick(),i=!i,i?G():P(),_()},p.appendChild(H);let I=document.createElement("div");I.style.cssText="width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0;",p.appendChild(I),Object.keys(je).forEach(M=>{let x=je[M],E=O(M,x.label,Le[M]);E.id=`cw-sidebar-btn-${M}`,E.onclick=()=>{B.playClick(),i&&(i=!1,P()),L(M)},p.appendChild(E)})}function O(H,I,M){let x=document.createElement("div");x.style.cssText=`
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; color: ${a.textSecondary}; 
          transition: all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1);
          position: relative;
      `,x.title=I,x.dataset.key=H;let E=document.createElement("div");E.style.cssText="width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s;",E.innerHTML=M||Le.tasks;let h=document.createElement("div");return h.style.cssText="font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px;",h.textContent=I,x.appendChild(E),x.appendChild(h),x.onmouseenter=()=>{n!==H&&!(H==="history"&&i)&&(x.style.background="#F1F3F4",E.style.transform="scale(1.1)")},x.onmouseleave=()=>{n!==H&&!(H==="history"&&i)&&(x.style.background="transparent",E.style.transform="scale(1)")},x}function L(H){let I=document.getElementById(`cat-anchor-${H}`);I&&(I.scrollIntoView({behavior:"smooth",block:"start"}),n=H,_())}function _(){Object.keys(je).forEach(I=>{let M=p.querySelector(`#cw-sidebar-btn-${I}`);if(M)if(n===I&&!i){let x=nt[I];M.style.background=x.bg,M.style.color=x.color,M.querySelector("div:first-child").style.transform="scale(1.1)"}else M.style.background="transparent",M.style.color=a.textSecondary,M.querySelector("div:first-child").style.transform="scale(1)"});let H=p.querySelector("#cw-sidebar-btn-history");H&&(i?(H.style.background="#3C4043",H.style.color="#FFFFFF"):(H.style.background="transparent",H.style.color=a.textSecondary))}function D(){if(C.innerHTML="",t.trim()!==""){let I=[];if(Object.entries(je).forEach(([x,E])=>{let h=E.links.filter(S=>S.name.toLowerCase().includes(t.toLowerCase())||S.desc.toLowerCase().includes(t.toLowerCase()));I.push(...h.map(S=>({...S,_cat:x})))}),I.length===0){C.innerHTML='<div style="text-align:center; padding: 60px; color:#999; font-size:13px;">Nada encontrado.</div>';return}let M=document.createElement("div");M.innerHTML="Resultados da busca",M.style.cssText="font-size:12px; font-weight:700; color:#5f6368; margin:20px 0 10px; text-transform:uppercase; letter-spacing:0.5px;",C.appendChild(M),I.forEach(x=>{let E=z(x,Le[x._cat],!1,x._cat);C.appendChild(E)});return}Object.entries(je).forEach(([I,M])=>{let x=nt[I],E=document.createElement("div"),h=document.createElement("div");h.id=`cat-anchor-${I}`,h.style.cssText=`
              display: flex; align-items: center; gap: 8px;
              font-size: 13px; font-weight: 800; color: ${x.color}; 
              text-transform: uppercase; letter-spacing: 0.5px;
              margin: 32px 0 12px 0; padding-top: 10px;
          `,h.innerHTML=`
            <div style="width:8px; height:8px; border-radius:50%; background:${x.color};"></div>
            ${M.label}
          `,E.appendChild(h);let S=document.createElement("div");S.style.cssText="display: grid; grid-template-columns: 1fr; gap: 8px;",M.links.forEach(k=>{let u=z(k,Le[I],!1,I);S.appendChild(u)}),E.appendChild(S),C.appendChild(E)});let H=document.createElement("div");H.style.height="80px",C.appendChild(H)}function z(H,I,M,x){let E=document.createElement("div"),h=nt[x]||nt.history;E.style.cssText=`
          display: flex; align-items: center; gap: 16px;
          padding: 12px 16px; 
          background: #FFFFFF; 
          border: 1px solid transparent;
          border-radius: 16px; 
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative; overflow: hidden;
      `;let S=document.createElement("div");S.style.cssText=`
          width: 40px; height: 40px; border-radius: 12px;
          background: ${h.bg}; color: ${h.color};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
      `,S.innerHTML=I||Le.tasks;let k=S.querySelector("svg");k&&(k.style.width="22px",k.style.height="22px");let u=document.createElement("div");u.style.cssText="flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden;";let y=document.createElement("div");y.style.cssText=`font-size: 14px; font-weight: 600; color: ${a.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,y.textContent=H.name;let v=document.createElement("div");v.style.cssText=`font-size: 12px; color: ${a.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,v.textContent=H.desc,u.appendChild(y),u.appendChild(v);let w=document.createElement("div");return w.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',w.style.cssText=`
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9AA0A6; transition: all 0.2s; opacity: 0;
      `,w.title="Copiar URL",E.onmouseenter=()=>{E.style.transform="translateY(-2px)",E.style.boxShadow="0 8px 20px rgba(0,0,0,0.08)",E.style.borderColor="rgba(0,0,0,0.05)",E.style.borderLeft=`4px solid ${h.color}`,w.style.opacity="1",w.style.background="#F1F3F4"},E.onmouseleave=()=>{E.style.transform="translateY(0)",E.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",E.style.border="1px solid transparent",w.style.opacity="0",w.style.background="transparent"},E.onclick=()=>{!M&&x&&io(H,x),window.open(H.url,"_blank")},w.onclick=F=>{F.stopPropagation(),B.playClick(),navigator.clipboard.writeText(H.url),!M&&x&&io(H,x),$("Link copiado!")},E.appendChild(S),E.appendChild(u),E.appendChild(w),E}c.addEventListener("input",H=>{t=H.target.value,D()});function R(){o=!o,ce(o,r,"cw-btn-links")}return document.body.appendChild(r),T(),D(),R}var ke=[];function xt(e){ke=e}var _o=["lucaste","ricardogi"],No=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function so(){let e="v4.9",t=!1,o=null,n=null;function i(x){if(!x)return"";try{let E=new Date(x);return isNaN(E.getTime())?String(x):E.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(x)}}if(!document.getElementById("cw-broadcast-hd-css")){let x=document.createElement("style");x.id="cw-broadcast-hd-css",x.innerHTML=`
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
      `,document.head.appendChild(x)}let a={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},r={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function s(x){return x?Object.entries(x).map(([E,h])=>`${E.replace(/[A-Z]/g,S=>"-"+S.toLowerCase())}:${h}`).join(";"):""}function g(x){if(!x||typeof x!="string")return"";let E=x;return E=E.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),E=E.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),E=E.replace(/_(.*?)_/g,"<i>$1</i>"),E=E.replace(/\n/g,"<br>"),E=Ft(E),E}let l=document.createElement("div");l.id="broadcast-popup",l.classList.add("cw-module-window"),Object.assign(l.style,re,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let p={popup:l,googleLine:null};function m(){if(t=!t,ce(t,l,"cw-btn-broadcast"),t){let x=document.getElementById("cw-btn-broadcast");x&&x.classList.remove("has-new"),L()}}let f=se(l,"Central de Avisos",e,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",p,()=>m()),d=f.querySelector(".cw-header-actions")||f.lastElementChild,b=null;function c(){let x=null;try{x=Ae()}catch{console.warn("TechSol: Auth Pending")}if(x){let E=x.split("@")[0].toLowerCase(),h=_o.includes(E);if(window._cwIsAdmin=h,window._cwCurrentUser=E,h&&d&&!d.querySelector("#cw-admin-btn")){let S=document.createElement("div");S.id="cw-admin-btn",S.className="cw-btn-interactive",S.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(S.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),S.title="Novo Aviso",S.onclick=k=>{k.stopPropagation(),N()},d.insertBefore(S,d.firstChild),b||A(),D()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(c,2e3))}if(d){let x=document.createElement("button");x.textContent="Limpar",x.className="cw-btn-interactive",Object.assign(x.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),x.onclick=E=>{E.stopPropagation(),B.playSuccess();let h=ke.map(S=>S.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(h)),D(),_()},d.insertBefore(x,d.firstChild)}l.appendChild(f);let C=document.createElement("div");C.id="cw-update-status",C.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",l.appendChild(C);function A(){b=document.createElement("div"),b.className="cw-editor-overlay",b.innerHTML=`
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
      `,b.querySelectorAll('input[name="cw-bc-type"]').forEach(S=>{S.addEventListener("change",()=>{b.querySelectorAll(".cw-radio-option").forEach(k=>k.classList.remove("checked")),S.parentElement.classList.add("checked")})}),setTimeout(()=>{let S=b.querySelector(".cw-radio-option.info");S&&S.classList.add("checked")},100);let x=b.querySelector("#cw-bc-cancel"),E=b.querySelector("#cw-bc-close-x"),h=b.querySelector("#cw-bc-send");x.onclick=G,E.onclick=G,h.onclick=P,l.appendChild(b)}function N(x=null){if(!b)return;let E=b.querySelector("#cw-editor-title-label"),h=b.querySelector("#cw-bc-title"),S=b.querySelector("#cw-bc-text"),k=b.querySelector("#cw-bc-send");if(x){n=x.id,E.textContent="Editar Aviso",h.value=x.title||"",S.value=x.text||"",k.textContent="Salvar Altera\xE7\xF5es";let u=x.type||"info",y=b.querySelector(`input[name="cw-bc-type"][value="${u}"]`);y&&y.click()}else{n=null,E.textContent="Novo Aviso",h.value="",S.value="",k.textContent="Publicar";let u=b.querySelector('input[name="cw-bc-type"][value="info"]');u&&u.click()}b.classList.add("active"),setTimeout(()=>h.focus(),300)}function G(){b&&b.classList.remove("active"),n=null}async function P(){let x=b.querySelector("#cw-bc-send"),E=b.querySelector("#cw-bc-title"),h=b.querySelector("#cw-bc-text"),S=b.querySelector('input[name="cw-bc-type"]:checked'),k=S?S.value:"info";if(!E.value.trim()||!h.value.trim()){$("Preencha todos os campos!",{error:!0});return}x.textContent="Salvando...",x.style.opacity="0.7";let u=!1;n?u=await ee.updateBroadcast(n,{title:E.value,text:h.value,type:k}):u=await ee.sendBroadcast({title:E.value,text:h.value,type:k,author:window._cwCurrentUser||"admin"}),u?($(n?"Atualizado!":"Publicado!"),B.playSuccess(),G(),setTimeout(()=>L(),1500)):($("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),x.textContent=n?"Salvar Altera\xE7\xF5es":"Publicar",x.style.opacity="1")}async function T(x){if(await ue("Confirma a exclus\xE3o deste aviso?",{danger:!0}))if(await ee.deleteBroadcast(x)){$("Aviso removido."),B.playClick();let S=ke.findIndex(k=>k.id===x);S>-1&&ke.splice(S,1),D(),setTimeout(()=>L(),1500)}else $("Erro ao excluir.",{error:!0})}let O=document.createElement("div");O.className="cw-nice-scroll",Object.assign(O.style,a.feedContainer),l.appendChild(O);async function L(){t&&(C.style.display="block",C.innerHTML="\u{1F504} Sincronizando...");try{let x=await ee.fetchData();x&&x.broadcast&&(xt(x.broadcast),_(),t&&(D(),C.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{C.style.display="none"},1500)))}catch{t&&(C.innerHTML="\u26A0\uFE0F Offline")}}function _(){let x=document.getElementById("cw-btn-broadcast");if(!x)return;let E=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(ke.some(S=>!E.includes(S.id))){if(x.classList.add("has-new"),!x.querySelector(".cw-badge")){let S=document.createElement("div");S.className="cw-badge",Object.assign(S.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),x.appendChild(S)}}else{x.classList.remove("has-new");let S=x.querySelector(".cw-badge");S&&S.remove()}}function D(){O.innerHTML="";let x=l.querySelector("#cw-bau-widget");x&&x.remove();let E=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),h=[...ke].sort((v,w)=>{let F=new Date(v.date).getTime()||0;return(new Date(w.date).getTime()||0)-F}),S=h.findIndex(v=>v.title&&v.title.toLowerCase().includes("disponibilidade bau"));if(S!==-1){let v=h[S];h.splice(S,1);let w=document.createElement("div");w.id="cw-bau-widget",Object.assign(w.style,a.bauContainer);let F=[],j=(v.text||"").split(`
`),q=/\d{1,2}\/\d{1,2}/,V="\u{1F4C5}";if(j.forEach(Q=>{/🇧🇷|🇵🇹|PT|BR|BRASIL|BRAZIL|PORTUGAL|LISBOA/i.test(Q)?V="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM|ESPANHA|SPAIN|MEXICO|MÉXICO/i.test(Q)&&(V="\u{1F1EA}\u{1F1F8}");let pe=Q.match(q);if(pe){let oe=pe[0],K=V;/🇧🇷|🇵🇹|PT|BR/i.test(Q)?K="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(Q)&&(K="\u{1F1EA}\u{1F1F8}"),F.some(te=>te.flag===K&&te.date===oe)||F.push({flag:K,date:oe})}}),F.length===0){let Q=(v.text||"").match(/\d{1,2}\/\d{1,2}/g);Q&&[...new Set(Q)].forEach(pe=>F.push({flag:"\u{1F4C5}",date:pe}))}let X="",ae='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(ae=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${ae}
              `),F.length>0?X=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${F.map(pe=>`
                  <div style="${s(a.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${s(a.bauFlag)}">${pe.flag}</span>
                      <span style="${s(a.bauDate)}">${pe.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${ae}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${g(v.text)}</div>
              `:X=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${g(v.text)}</div>
                    ${window._cwIsAdmin?'<div style="margin-left:12px;"><button class="cw-bau-edit cw-btn-interactive" style="border:none; background:rgba(255,255,255,0.5); border-radius:6px; padding:6px; color:#6D28D9;">\u270F\uFE0F</button></div>':""}
                </div>
              `,w.innerHTML=`
              <div style="${s(a.bauHeader)}; margin-bottom:8px;">
                  <div style="${s(a.liveIndicator)}">
                      <div style="${s(a.pulseDot)}"></div>
                      <span style="${s(a.bauLabel)}">Disponibilidade BAU</span>
                  </div>
                  <div style="font-size:10px; opacity:0.7; color:#7E22CE;">${i(v.date)}</div>
              </div>
              ${X}
          `,C.after(w);let ie=w.querySelector("#cw-bau-toggle-btn"),fe=w.querySelector("#cw-bau-full");if(ie&&fe&&(ie.onclick=()=>{let Q=fe.style.display==="none";fe.style.display=Q?"block":"none",ie.textContent=Q?"Ocultar":"Detalhes"}),window._cwIsAdmin){let Q=w.querySelector(".cw-bau-edit");Q&&(Q.onclick=()=>N(v))}}let k=h.sort((v,w)=>{let F=E.includes(v.id),j=E.includes(w.id);return F===j?0:F?1:-1});if(k.length===0&&!S){let v=document.createElement("div");Object.assign(v.style,a.emptyState),v.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,O.appendChild(v)}let u=k.filter(v=>!E.includes(v.id)),y=k.filter(v=>E.includes(v.id));if(u.forEach(v=>O.appendChild(z(v,!1))),y.length>0){let v=document.createElement("div");Object.assign(v.style,a.historyDivider),v.innerHTML=`<span>Hist\xF3rico (${y.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let w=document.createElement("div");Object.assign(w.style,a.historyContainer),y.forEach(j=>w.appendChild(z(j,!0)));let F=!1;v.onclick=()=>{B.playClick(),F=!F,w.style.display=F?"flex":"none",v.querySelector("svg").style.transform=F?"rotate(180deg)":"rotate(0deg)"},O.appendChild(v),O.appendChild(w)}}function z(x,E){let h=document.createElement("div");Object.assign(h.style,E?a.cardHistory:a.card);let S=r[x.type]||r.info,k=document.createElement("div");Object.assign(k.style,a.cardHeader);let u=document.createElement("div");Object.assign(u.style,a.typeTag,{color:S.color,background:S.bg}),u.innerHTML=`${S.icon} <span>${x.type}</span>`;let y=document.createElement("span");if(Object.assign(y.style,a.dateTag),y.textContent=i(x.date),k.appendChild(u),E)k.appendChild(y);else{let q=document.createElement("button");q.className="cw-btn-interactive",Object.assign(q.style,a.dismissBtn),q.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',q.onmouseenter=()=>{q.style.color="#1e8e3e",q.style.background="#e6f4ea",q.style.borderColor="#1e8e3e"},q.onmouseleave=()=>{q.style.color="#5f6368",q.style.background="#fff",q.style.borderColor="rgba(0,0,0,0.1)"},q.onclick=V=>{V.stopPropagation(),B.playClick(),h.style.transform="translateX(20px)",h.style.opacity="0",setTimeout(()=>{let X=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");X.push(x.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(X)),D(),_()},200)},k.appendChild(q)}let v=document.createElement("div");Object.assign(v.style,a.cardContent);let w=document.createElement("div");Object.assign(w.style,a.msgTitle),w.textContent=x.title;let F=document.createElement("div");Object.assign(F.style,a.msgBody),F.innerHTML=g(x.text);let j=document.createElement("div");if(Object.assign(j.style,a.msgMeta),j.innerHTML=`Publicado por <b>${x.author||"Sistema"}</b>`,E||(j.innerHTML+=` \u2022 ${i(x.date)}`),v.appendChild(w),v.appendChild(F),v.appendChild(j),h.appendChild(k),h.appendChild(v),window._cwIsAdmin){let q=document.createElement("div");q.className="cw-card-actions";let V=document.createElement("button");V.className="cw-action-btn edit",V.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',V.onclick=()=>N(x);let X=document.createElement("button");X.className="cw-action-btn delete",X.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',X.onclick=()=>T(x.id),q.appendChild(V),q.appendChild(X),h.appendChild(q)}return h}let R=ee.getCachedBroadcasts();R.length>0&&(xt(R),D()),setTimeout(c,500),L(),o||(o=setInterval(L,No));let H=document.createElement("div");Object.assign(H.style,Ee),H.className="no-drag",l.appendChild(H),Te(l,H),document.body.appendChild(l);let I=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),M=ke.some(x=>!I.includes(x.id));return{toggle:m,hasUnread:M}}function lo(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let e=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],t=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},n=document.createElement("div");Object.assign(n.style,o.overlay);let i=document.createElement("div");Object.assign(i.style,o.card);let a=document.createElement("div");Object.assign(a.style,o.icon);let r=document.createElement("div");Object.assign(r.style,o.title);let s=document.createElement("div");Object.assign(s.style,o.text);let g=document.createElement("div");Object.assign(g.style,o.dotsContainer);let l=document.createElement("div");Object.assign(l.style,o.btnContainer);let p=document.createElement("button");p.textContent="Pular",Object.assign(p.style,o.btn,o.btnSkip),p.onmouseover=()=>p.style.color="#202124",p.onmouseout=()=>p.style.color="#5f6368";let m=document.createElement("button");m.textContent="Pr\xF3ximo",Object.assign(m.style,o.btn,o.btnNext),m.onmouseover=()=>m.style.transform="scale(1.05)",m.onmouseout=()=>m.style.transform="scale(1)",l.appendChild(p),l.appendChild(m),i.appendChild(a),i.appendChild(r),i.appendChild(s),i.appendChild(g),i.appendChild(l),n.appendChild(i),document.body.appendChild(n);function f(b){let c=e[b];a.textContent=c.icon,r.textContent=c.title,s.textContent=c.text,g.innerHTML="",e.forEach((C,A)=>{let N=document.createElement("div");Object.assign(N.style,o.dot),A===b&&Object.assign(N.style,o.dotActive),g.appendChild(N)}),c.isLast?(p.style.display="none",m.textContent="Come\xE7ar \u{1F680}",m.style.width="100%"):(p.style.display="block",m.textContent="Pr\xF3ximo",m.style.width="auto")}function d(){localStorage.setItem("cw_onboarding_seen_v1","true"),n.style.opacity="0",i.style.transform="translateY(20px)",setTimeout(()=>n.remove(),400),B.playSuccess(),$("Tudo pronto! Use o menu flutuante.")}m.onclick=()=>{B.playClick(),t<e.length-1?(t++,f(t)):d()},p.onclick=async()=>{await ue("Pular o tutorial?")&&d()},f(0),requestAnimationFrame(()=>{n.style.opacity="1",i.style.transform="translateY(0)"})}var co={version:"v5.1",title:"Atualiza\xE7\xE3o: v5.1 - Produtividade Blindada \u{1F6E1}\uFE0F",slides:[{icon:"\u{1F17F}\uFE0F",title:"Estacionamento de Casos",text:"Interrup\xE7\xE3o urgente? Agora voc\xEA pode 'Estacionar' seu atendimento atual (Notas + Tasks) com um clique e retomar depois exatamente de onde parou."},{icon:"\u{1F6DF}",title:"Sistema 'Airbag'",text:"Caiu a internet? Fechou a aba sem querer? O TechSol agora possui Auto-Save de emerg\xEAncia a cada 5 segundos. Seu texto est\xE1 salvo, sempre."},{icon:"\u{1F7E0}",title:"Indicador de Progresso",text:"Nunca mais esque\xE7a uma nota aberta. Um indicador laranja ('Dirty State') avisa na P\xEDlula principal se h\xE1 trabalho n\xE3o salvo/estacionado."},{icon:"\u{1F50D}",title:"Time Zone Pro",text:"O m\xF3dulo de fusos hor\xE1rios ganhou superpoderes: nova barra de pesquisa global, filtros r\xE1pidos por regi\xE3o e corre\xE7\xE3o de visualiza\xE7\xE3o."},{icon:"\u{1F916}",title:"Leitura de BAU Aprimorada",text:"O sistema de Broadcast agora \xE9 mais inteligente ao ler avisos de disponibilidade, detectando datas e bandeiras mesmo quando quebradas em v\xE1rias linhas."},{icon:"\u{1F3A8}",title:"Refinamento Visual",text:"Bot\xF5es padronizados, sombras suavizadas e micro-intera\xE7\xF5es t\xE1teis em todo o sistema para uma experi\xEAncia mais fluida e profissional."}]};function po(e){let t=localStorage.getItem("cw_last_version");if(!t){localStorage.setItem("cw_last_version",e);return}t!==e&&Do(e)}function Do(e){let t=co.slides,o=0,n={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"400px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(30px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"12px",background:"#E8F0FE",color:"#1967D2",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",marginBottom:"16px",letterSpacing:"0.5px"},icon:{fontSize:"42px",marginBottom:"16px",display:"block"},title:{fontSize:"20px",fontWeight:"700",color:"#202124",marginBottom:"8px"},text:{fontSize:"14px",color:"#5f6368",lineHeight:"1.5",marginBottom:"32px",minHeight:"42px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"6px",marginBottom:"24px"},dot:{width:"6px",height:"6px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"18px",borderRadius:"4px"},btn:{width:"100%",padding:"12px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"all 0.2s",background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},i=document.createElement("div");Object.assign(i.style,n.overlay);let a=document.createElement("div");Object.assign(a.style,n.card);let r=document.createElement("div");Object.assign(r.style,n.badge),r.textContent=`Atualiza\xE7\xE3o ${e}`;let s=document.createElement("div");Object.assign(s.style,n.icon);let g=document.createElement("div");Object.assign(g.style,n.title);let l=document.createElement("div");Object.assign(l.style,n.text);let p=document.createElement("div");Object.assign(p.style,n.dotsContainer);let m=document.createElement("button");Object.assign(m.style,n.btn),m.onmouseover=()=>m.style.transform="scale(1.02)",m.onmouseout=()=>m.style.transform="scale(1)",a.appendChild(r),a.appendChild(s),a.appendChild(g),a.appendChild(l),a.appendChild(p),a.appendChild(m),i.appendChild(a),document.body.appendChild(i);function f(b){let c=t[b];s.textContent=c.icon,g.textContent=c.title,l.textContent=c.text,p.innerHTML="",t.forEach((C,A)=>{let N=document.createElement("div");Object.assign(N.style,n.dot),A===b&&Object.assign(N.style,n.dotActive),p.appendChild(N)}),b===t.length-1?m.textContent="Entendi, vamos l\xE1! \u{1F44D}":m.textContent="Pr\xF3ximo"}function d(){localStorage.setItem("cw_last_version",e),i.style.opacity="0",a.style.transform="translateY(30px)",setTimeout(()=>i.remove(),400),B.playSuccess(),$(`TechSol atualizado para ${e}!`)}m.onclick=()=>{B.playClick(),o<t.length-1?(o++,f(o)):d()},f(0),requestAnimationFrame(()=>{i.style.opacity="1",a.style.transform="translateY(0)"})}var uo="cw_timezone_pinned",ht=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa",region:"eu"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid",region:"eu"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires",region:"sa"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz",region:"sa"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago",region:"sa"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1",region:"sa"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil",region:"sa"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o",region:"sa"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima",region:"sa"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u",region:"sa"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas",region:"sa"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX",region:"na"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9",region:"na"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador",region:"na"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala",region:"na"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa",region:"na"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua",region:"na"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1",region:"na"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo",region:"na"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan",region:"na"}],Ro=[{id:"all",label:"Todos"},{id:"sa",label:"Am\xE9rica do Sul"},{id:"na",label:"Norte & Central"},{id:"eu",label:"Europa"}];function mo(){let e="v2.2 Pro",t=!1,o=null,n="mx",i=JSON.parse(localStorage.getItem(uo)||"[]"),a="",r="all",s=new Date;s.setHours(14,0,0,0);let g={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",successBg:"#E6F4EA",warning:"#E37400",warningBg:"#FEF7E0",error:"#D93025",errorBg:"#FCE8E6"},l={container:{display:"flex",flexDirection:"column",height:"100%",background:g.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",background:g.surface,borderBottom:`1px solid ${g.border}`,padding:"8px 16px 0 16px"},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:g.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease",userSelect:"none"},tabActive:{color:g.primary,borderBottomColor:g.primary,fontWeight:"600"},toolbar:{padding:"12px 16px 8px 16px",background:g.bg,display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid rgba(0,0,0,0.03)"},searchInputWrapper:{position:"relative",width:"100%"},searchInput:{width:"100%",boxSizing:"border-box",padding:"10px 12px 10px 38px",borderRadius:"10px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",color:g.text,outline:"none",boxShadow:"0 1px 3px rgba(0,0,0,0.05)",transition:"all 0.2s",fontFamily:"'Google Sans', Roboto, sans-serif"},searchIcon:{position:"absolute",left:"12px",top:"50%",transform:"translateY(-50%)",width:"16px",height:"16px",color:"#9AA0A6",pointerEvents:"none"},chipsRow:{display:"flex",gap:"8px",overflowX:"auto",paddingBottom:"4px",scrollbarWidth:"none",msOverflowStyle:"none"},chip:{whiteSpace:"nowrap",padding:"6px 12px",borderRadius:"16px",fontSize:"12px",fontWeight:"500",cursor:"pointer",border:`1px solid ${g.border}`,background:g.surface,color:g.textSub,transition:"all 0.2s"},chipActive:{background:g.primaryBg,color:g.primary,borderColor:g.primaryBg,fontWeight:"600"},listContainer:{padding:"16px 16px 40px 16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"12px",scrollbarWidth:"none"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"16px 20px",background:g.surface,borderRadius:"16px",border:"1px solid transparent",boxShadow:"0 2px 6px rgba(60,64,67,0.05)",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.2s ease",cursor:"pointer",position:"relative"},hubCardPinned:{borderLeft:`4px solid ${g.primary}`,paddingLeft:"16px"},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"16px",alignItems:"stretch"},timeCard:{flex:1,padding:"20px",borderRadius:"20px",background:g.surface,border:`1px solid ${g.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",boxShadow:"0 4px 12px rgba(60,64,67,0.05)"},timelineContainer:{position:"relative",height:"60px",marginTop:"16px",userSelect:"none"},timelineTrack:{position:"absolute",top:"26px",left:"0",right:"0",height:"6px",borderRadius:"3px",background:"#E0E0E0",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.3)",pointerEvents:"none"},hdInput:{fontSize:"28px",fontWeight:"700",color:g.text,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"'Google Sans', sans-serif",cursor:"text"},statusBadge:{padding:"8px 16px",borderRadius:"50px",fontSize:"13px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"8px",marginTop:"16px",alignSelf:"center",transition:"background-color 0.3s"}},p=document.createElement("div");p.id="timezone-popup",p.classList.add("cw-module-window"),Object.assign(p.style,re,{right:"100px",width:"450px",height:"720px",overflow:"hidden",borderRadius:"24px"});let f=se(p,"Time Zone Traveler",e,"Monitoramento global e planejamento de chamadas.",{popup:p},()=>E());p.appendChild(f);let d=document.createElement("div");Object.assign(d.style,l.container),p.appendChild(d);let b=document.createElement("div");Object.assign(b.style,l.tabHeader);let c=document.createElement("div");c.textContent="Monitoramento",Object.assign(c.style,l.tabBtn,l.tabActive);let C=document.createElement("div");C.textContent="Planejador",Object.assign(C.style,l.tabBtn),b.appendChild(c),b.appendChild(C),d.appendChild(b);let A=document.createElement("div");Object.assign(A.style,l.toolbar);let N=document.createElement("div");Object.assign(N.style,l.searchInputWrapper);let G=document.createElement("div");G.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',Object.assign(G.style,l.searchIcon);let P=document.createElement("input");P.placeholder="Buscar cidade ou pa\xEDs...",Object.assign(P.style,l.searchInput),P.onfocus=()=>{P.style.boxShadow="0 2px 8px rgba(26,115,232,0.15)",P.style.borderColor="rgba(26,115,232,0.3)"},P.onblur=()=>{P.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",P.style.borderColor="transparent"},P.oninput=h=>{a=h.target.value.toLowerCase(),H()},N.appendChild(G),N.appendChild(P),A.appendChild(N);let T=document.createElement("div");Object.assign(T.style,l.chipsRow),Ro.forEach(h=>{let S=document.createElement("div");S.textContent=h.label,S.id=`tz-filter-${h.id}`,Object.assign(S.style,l.chip),h.id===r&&Object.assign(S.style,l.chipActive),S.onclick=()=>{B.playClick(),r=h.id,Array.from(T.children).forEach(k=>{Object.assign(k.style,l.chip)}),Object.assign(S.style,l.chipActive),H()},T.appendChild(S)}),A.appendChild(T),d.appendChild(A);let O=document.createElement("div");Object.assign(O.style,l.listContainer);let L=document.createElement("style");L.textContent="#timezone-popup ::-webkit-scrollbar { display: none; }",d.appendChild(L);let _=document.createElement("div");Object.assign(_.style,l.plannerWrapper,{display:"none"}),d.appendChild(O),d.appendChild(_),c.onclick=()=>D("live"),C.onclick=()=>D("plan");function D(h){B.playClick(),h==="live"?(Object.assign(c.style,l.tabActive),Object.assign(C.style,l.tabBtn),C.style.borderBottomColor="transparent",O.style.display="flex",A.style.display="flex",_.style.display="none",M()):(Object.assign(C.style,l.tabActive),Object.assign(c.style,l.tabBtn),c.style.borderBottomColor="transparent",_.style.display="flex",O.style.display="none",A.style.display="none",x(),I())}function z(h){return h>=9&&h<17?{color:g.success,bg:g.successBg,label:"Aberto",icon:"\u{1F7E2}"}:h>=8&&h<9?{color:g.warning,bg:g.warningBg,label:"Abrindo",icon:"\u{1F7E1}"}:h>=17&&h<19?{color:g.warning,bg:g.warningBg,label:"Fechando",icon:"\u{1F7E1}"}:{color:g.textSub,bg:"#F1F3F4",label:"Fechado",icon:"\u{1F534}"}}function R(h){i.includes(h)?i=i.filter(S=>S!==h):i.push(h),localStorage.setItem(uo,JSON.stringify(i)),H(),B.playClick()}function H(){O.innerHTML="";let h=new Date,S=ht.filter(u=>{let y=u.name.toLowerCase().includes(a)||u.label.toLowerCase().includes(a),v=r==="all"||u.region===r;return y&&v});if(S.sort((u,y)=>{let v=i.includes(u.id),w=i.includes(y.id);return v&&!w?-1:!v&&w?1:u.name.localeCompare(y.name)}),S.length===0){O.innerHTML=`
                <div style="text-align:center; padding:40px; color:#BDC1C6; display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <div style="font-size:14px; font-weight:500;">Nenhum local encontrado</div>
                </div>
            `;return}S.forEach(u=>{let y=i.includes(u.id),v=h.toLocaleTimeString("pt-BR",{timeZone:u.zone,hour:"2-digit",minute:"2-digit"}),w=parseInt(v.split(":")[0]),F=z(w),j=w<6||w>18,q=document.createElement("div");Object.assign(q.style,l.hubCard),y&&Object.assign(q.style,l.hubCardPinned);let V=y?"\u2605":"\u2606",X=y?"#F9AB00":"#DADCE0";q.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn" style="cursor:pointer; font-size:22px; color:${X}; width:32px; height:32px; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background 0.2s;">${V}</div>
                    <div style="font-size:32px; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">${u.flag}</div>
                    <div>
                        <div style="font-size:15px; font-weight:600; color:${g.text}; letter-spacing:-0.2px;">${u.name}</div>
                        <div style="font-size:12px; color:${g.textSub}; display:flex; align-items:center; gap:4px; margin-top:2px;">
                            ${j?"\u{1F319}":"\u2600\uFE0F"} ${u.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:24px; font-weight:700; color:${g.text}; font-family:'Google Sans', sans-serif;">${v}</div>
                    <div style="font-size:11px; font-weight:600; color:${F.color}; background:${F.bg}; padding:2px 8px; border-radius:12px; display:inline-flex; align-items:center; gap:4px; margin-top:4px;">
                        ${F.label}
                    </div>
                </div>
            `,q.onmouseenter=()=>{q.style.transform="translateY(-2px)",q.style.boxShadow="0 6px 12px rgba(60,64,67,0.1)"},q.onmouseleave=()=>{q.style.transform="translateY(0)",q.style.boxShadow="0 2px 6px rgba(60,64,67,0.05)"};let ae=q.querySelector(".cw-pin-btn");ae.onmouseenter=()=>{ae.style.backgroundColor="#F1F3F4"},ae.onmouseleave=()=>{ae.style.backgroundColor="transparent"},ae.onclick=ie=>{ie.stopPropagation(),R(u.id)},q.onclick=()=>{n=u.id,D("plan")},O.appendChild(q)});let k=document.createElement("div");k.style.height="20px",k.style.width="100%",O.appendChild(k)}function I(){_.innerHTML="";let h=document.createElement("div"),S=document.createElement("label");S.textContent="Onde est\xE1 o cliente?",S.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase; letter-spacing:0.5px;";let k=document.createElement("select");Object.assign(k.style,Ue),k.style.padding="14px",[...ht].sort((Z,te)=>Z.name.localeCompare(te.name)).forEach(Z=>{let te=document.createElement("option");te.value=Z.id,te.textContent=`${Z.flag} ${Z.name} (${Z.zone})`,Z.id===n&&(te.selected=!0),k.appendChild(te)}),k.onchange=Z=>{n=Z.target.value,K(),B.playClick()},h.appendChild(S),h.appendChild(k),_.appendChild(h);let y=document.createElement("div");Object.assign(y.style,l.timeComparisonRow);let v=document.createElement("div");Object.assign(v.style,l.timeCard),v.style.backgroundColor="#F8FAFF",v.style.borderColor="#E8F0FE",v.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase; letter-spacing:0.5px;">\u{1F1E7}\u{1F1F7} Voc\xEA</div>
            <input type="time" id="cw-time-input-br" style="font-size:28px; font-weight:700; color:#1A73E8; border:none; background:transparent; width:100%; text-align:center; outline:none; font-family:'Google Sans'; cursor:pointer;">
            <div style="font-size:12px; color:#5F6368;">Bras\xEDlia (GMT-3)</div>
        `;let w=document.createElement("div");Object.assign(w.style,l.timeCard),w.style.backgroundColor="#FFF8E1",w.style.borderColor="#FEF7E0",w.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase; letter-spacing:0.5px;">Cliente</div>
            <div id="cw-time-display-client" style="font-size:28px; font-weight:700; color:#E37400; border:none; background:transparent; width:100%; text-align:center; font-family:'Google Sans';">--:--</div>
            <div id="cw-client-label" style="font-size:12px; color:#5F6368;">...</div>
        `,y.appendChild(v),y.appendChild(w),_.appendChild(y);let F=document.createElement("div");F.id="cw-planner-status",Object.assign(F.style,l.statusBadge),_.appendChild(F);let j=document.createElement("div");Object.assign(j.style,{padding:"0 4px",marginTop:"12px"});let q=document.createElement("div");q.textContent="Arraste para simular o hor\xE1rio:",q.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:12px;";let V=document.createElement("div");Object.assign(V.style,l.timelineContainer);let X=document.createElement("div");Object.assign(X.style,l.timelineTrack);let ae=document.createElement("div");Object.assign(ae.style,l.dayZone),X.appendChild(ae);let ie=document.createElement("input");ie.type="range",ie.min="0",ie.max="1439",ie.step="15",ie.style.cssText="position:absolute; top:20px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let fe=document.createElement("div");fe.style.cssText="position:absolute; top:36px; width:100%; display:flex; justify-content:space-between; font-size:10px; font-weight:600; color:#9AA0A6; padding:0 2px;",fe.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>24h</span>",V.appendChild(X),V.appendChild(ie),V.appendChild(fe),j.appendChild(q),j.appendChild(V),_.appendChild(j);let Q=v.querySelector("#cw-time-input-br"),pe=w.querySelector("#cw-time-display-client"),oe=w.querySelector("#cw-client-label");function K(){let Z=ht.find(xo=>xo.id===n);oe.textContent=`${Z.flag} ${Z.label} (${Z.zone})`;let te=s.getHours(),Re=s.getMinutes(),fo=`${String(te).padStart(2,"0")}:${String(Re).padStart(2,"0")}`;Q.value=fo,ie.value=te*60+Re;let yt=s.toLocaleTimeString("pt-BR",{timeZone:Z.zone,hour:"2-digit",minute:"2-digit"});pe.textContent=yt;let Me=parseInt(yt.split(":")[0]);Me>=9&&Me<17?(F.style.background=g.successBg,F.style.color=g.success,F.innerHTML='<span style="font-size:16px">\u2705</span> Hor\xE1rio Comercial Ideal'):Me>=8&&Me<9||Me>=17&&Me<19?(F.style.background=g.warningBg,F.style.color=g.warning,F.innerHTML='<span style="font-size:16px">\u26A0\uFE0F</span> Hor\xE1rio Limite (Aten\xE7\xE3o)'):(F.style.background=g.errorBg,F.style.color=g.error,F.innerHTML='<span style="font-size:16px">\u26D4</span> Fora de Hor\xE1rio')}ie.oninput=Z=>{let te=parseInt(Z.target.value);s.setHours(Math.floor(te/60)),s.setMinutes(te%60),K()},Q.oninput=Z=>{let[te,Re]=Z.target.value.split(":");te&&Re&&(s.setHours(parseInt(te)),s.setMinutes(parseInt(Re)),K())},K()}function M(){H(),o||(o=setInterval(H,6e4))}function x(){o&&(clearInterval(o),o=null)}function E(){t=!t,ce(t,p,"cw-btn-timezone"),t?D("live"):x()}return document.body.appendChild(p),E}function go(){let e="v1.1",t=!1,o="general",n=null,i=null;if(!document.getElementById("cw-lib-styles")){let I=document.createElement("style");I.id="cw-lib-styles",I.innerHTML=`
            .cw-lib-card { transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1) !important; }
            .cw-lib-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.12) !important; border-color: rgba(0, 122, 255, 0.3) !important; }
            .cw-tactile { transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1); }
            .cw-tactile:active { transform: scale(0.92) !important; }
            .cw-toolbar-btn { display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: 8px; border: 1px solid transparent; background: transparent; cursor: pointer; transition: all 0.2s; color: #5F6368; }
            .cw-toolbar-btn:hover { background: #F1F3F4; color: #007AFF; border-color: #DADCE0; }
            .cw-toolbar-btn.active { background: #E8F0FE; color: #007AFF; border-color: #007AFF; }
        `,document.head.appendChild(I)}let a={bg:"#F0F2F5",surface:"#FFFFFF",primary:"#007AFF",primaryBg:"rgba(0, 122, 255, 0.1)",text:"#1C1C1E",textSub:"#8E8E93",border:"rgba(0, 0, 0, 0.08)",danger:"#FF3B30"},r={container:{display:"flex",flexDirection:"column",height:"100%",background:a.bg,fontFamily:"'Google Sans', Roboto, sans-serif"},tabHeader:{display:"flex",padding:"12px 16px 0 16px",background:a.surface,borderBottom:`1px solid ${a.border}`},tabBtn:{flex:1,padding:"12px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:a.textSub,borderBottom:"3px solid transparent",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",userSelect:"none"},tabActive:{color:a.primary,borderBottomColor:a.primary,fontWeight:"600"},listContainer:{flex:1,overflowY:"auto",padding:"16px",display:"flex",flexDirection:"column",gap:"12px"},emptyState:{padding:"40px 20px",textAlign:"center",color:"#BDC1C6",display:"flex",flexDirection:"column",alignItems:"center",gap:"10px"},card:{background:a.surface,borderRadius:"16px",padding:"16px",border:`1px solid ${a.border}`,boxShadow:"0 4px 12px rgba(0,0,0,0.05)",transition:"all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)",cursor:"default",position:"relative",overflow:"hidden"},cardHeader:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"8px"},cardTitle:{fontSize:"14px",fontWeight:"600",color:a.text},cardPreview:{fontSize:"12px",color:a.textSub,lineHeight:"1.5",display:"-webkit-box",webkitLineClamp:"3",webkitBoxOrient:"vertical",overflow:"hidden"},cardActions:{display:"flex",justifyContent:"flex-end",gap:"8px",marginTop:"12px",paddingTop:"12px",borderTop:`1px dashed ${a.border}`},actionBtn:{padding:"6px 12px",borderRadius:"6px",fontSize:"12px",fontWeight:"600",cursor:"pointer",border:"none",background:"transparent",transition:"background 0.2s"},fab:{position:"absolute",bottom:"24px",right:"24px",width:"56px",height:"56px",borderRadius:"16px",background:a.primary,color:"#FFF",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.4)",cursor:"pointer",transition:"transform 0.2s",zIndex:10},editorOverlay:{position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"rgba(255, 255, 255, 0.85)",backdropFilter:"blur(25px) saturate(180%)",webkitBackdropFilter:"blur(25px) saturate(180%)",zIndex:20,transform:"translateY(100%)",transition:"transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",display:"flex",flexDirection:"column"},editorHeader:{padding:"16px 24px",background:a.surface,borderBottom:`1px solid ${a.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"},editorBody:{flex:1,padding:"24px",overflowY:"auto"},inputGroup:{marginBottom:"20px"},label:{display:"block",fontSize:"12px",fontWeight:"700",color:a.textSub,marginBottom:"8px",textTransform:"uppercase"},input:{width:"100%",padding:"12px",borderRadius:"8px",border:`1px solid ${a.border}`,fontSize:"14px",fontFamily:"inherit",outline:"none",background:a.surface,boxSizing:"border-box"}},s=document.createElement("div");s.id="library-popup",s.classList.add("cw-module-window"),Object.assign(s.style,re,{right:"auto",left:"50%",width:"400px",height:"600px",transform:"translateX(-50%) scale(0.05)",overflow:"hidden"});let l=se(s,"Minha Biblioteca",e,"Gerencie seus snippets, textos e templates.",{popup:s},()=>H());s.appendChild(l);let p=document.createElement("div");Object.assign(p.style,r.container),s.appendChild(p);let m=document.createElement("div");Object.assign(m.style,r.tabHeader);let f=[{id:"general",label:"Geral",icon:"\u{1F4CB}"},{id:"note",label:"Notas",icon:"\u{1F4DD}"},{id:"email",label:"Emails",icon:"\u{1F4E7}"}];f.forEach(I=>{let M=document.createElement("div");M.innerHTML=`${I.icon} ${I.label}`,M.id=`lib-tab-${I.id}`,Object.assign(M.style,r.tabBtn),I.id===o&&Object.assign(M.style,r.tabActive),M.onmouseenter=()=>B.playHover(),M.onclick=()=>T(I.id),m.appendChild(M)}),p.appendChild(m);let d=document.createElement("div");Object.assign(d.style,r.listContainer),p.appendChild(d);let b=document.createElement("div");b.className="cw-fab cw-tactile",Object.assign(b.style,r.fab),b.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',b.onmouseenter=()=>b.style.transform="scale(1.1)",b.onmouseleave=()=>b.style.transform="scale(1)",b.onclick=()=>L(),p.appendChild(b),n=document.createElement("div"),Object.assign(n.style,r.editorOverlay);let c=document.createElement("div");Object.assign(c.style,r.editorHeader),c.innerHTML='<span style="font-weight:700; font-size:16px;">Novo Item</span>';let C=document.createElement("button");C.innerHTML="Cancelar",C.style.cssText="background:none; border:none; color:#5f6368; font-weight:600; cursor:pointer;",C.onclick=_,c.appendChild(C),n.appendChild(c);let A=document.createElement("div");Object.assign(A.style,r.editorBody),n.appendChild(A);let N=document.createElement("div");N.style.cssText="padding:16px 24px; border-top:1px solid #DADCE0; background:#FFF; display:flex; justify-content:flex-end;";let G=document.createElement("button");G.textContent="Salvar",G.style.cssText="padding:10px 24px; background:#1a73e8; color:white; border:none; border-radius:20px; font-weight:600; cursor:pointer; box-shadow:0 2px 5px rgba(26,115,232,0.3);",G.onclick=D,N.appendChild(G),n.appendChild(N),p.appendChild(n);let P=document.createElement("div");Object.assign(P.style,Ee),P.className="no-drag",s.appendChild(P),Te(s,P),document.body.appendChild(s);function T(I){B.playClick(),o=I,f.forEach(M=>{let x=document.getElementById(`lib-tab-${M.id}`);M.id===I?Object.assign(x.style,r.tabActive):Object.assign(x.style,r.tabBtn)}),O()}function O(){d.innerHTML="";let I=ne.getSnippets(o);if(I.length===0){d.innerHTML=`
                <div style="${R(r.emptyState)}">
                    <div style="font-size:32px; opacity:0.5;">\u{1F4ED}</div>
                    <div style="font-weight:500;">Nada aqui ainda.</div>
                    <div style="font-size:12px;">Clique no + para criar.</div>
                </div>
            `;return}I.forEach(M=>{let x=document.createElement("div");x.className="cw-lib-card",Object.assign(x.style,r.card),M.isCode&&(x.style.borderLeft=`4px solid ${a.primary}`,x.style.background="rgba(0, 122, 255, 0.02)");let E=M.content;if(M.isRich){let h=document.createElement("div");h.innerHTML=M.content;let S=h.querySelector("img");E=h.innerText.substring(0,150)+(h.innerText.length>150?"...":""),S&&(E="\u{1F5BC}\uFE0F [Cont\xE9m Imagens] "+E)}x.innerHTML=`
                <div style="${R(r.cardHeader)}">
                    <div style="${R(r.cardTitle)}">${M.title}</div>
                    <div style="display:flex; gap:4px;">
                        ${M.isCode?'<span style="font-size:10px; background:#F1F3F4; color:#5F6368; padding:2px 6px; border-radius:4px; font-family:monospace;">CODE</span>':""}
                        ${o==="email"?'<span style="font-size:10px; background:#E8F0FE; color:#1967D2; padding:2px 6px; border-radius:4px;">TEMPLATE</span>':""}
                    </div>
                </div>
                <div style="${R(r.cardPreview)}; ${M.isCode?"font-family:'Roboto Mono', monospace; font-size:11px;":""}">${E}</div>
                <div style="${R(r.cardActions)}">
                    <button class="cw-act-copy cw-tactile" title="Copiar" style="${R(r.actionBtn)}; color:#007AFF; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                        <span>Copiar</span>
                    </button>
                    <button class="cw-act-edit cw-tactile" title="Editar" style="${R(r.actionBtn)}; color:#8E8E93; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        <span>Editar</span>
                    </button>
                    <button class="cw-act-del cw-tactile" title="Excluir" style="${R(r.actionBtn)}; color:#FF3B30; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                        <span>Excluir</span>
                    </button>
                </div>
            `,x.onmouseenter=()=>{B.playHover()},x.querySelector(".cw-act-copy").onclick=h=>{if(h.stopPropagation(),B.playClick(),M.isRich){let S=new Blob([M.content],{type:"text/html"}),k=document.createElement("div");k.style.whiteSpace="pre-wrap",k.innerHTML=M.content;let u=new Blob([k.innerText],{type:"text/plain"}),y=[new ClipboardItem({"text/html":S,"text/plain":u})];navigator.clipboard.write(y)}else navigator.clipboard.writeText(M.content);$("Copiado!")},x.querySelector(".cw-act-edit").onclick=h=>{h.stopPropagation(),B.playClick(),L(M)},x.querySelector(".cw-act-del").onclick=async h=>{h.stopPropagation(),B.playClick(),await ue("Excluir este item?")&&(ne.delete(M.id),O(),$("Item exclu\xEDdo."))},d.appendChild(x)})}function L(I=null){i=I?I.id:null,A.innerHTML="",A.appendChild(z("title","T\xEDtulo / Nome",I?I.title:"")),o==="email"&&A.appendChild(z("subject","Assunto do Email",I?I.subject:""));let M="Conte\xFAdo";o==="email"&&(M="Corpo do Email (HTML)"),o==="note"&&(M="Texto da Nota (Reason)"),A.appendChild(z("content",M,I?I.content:"",{isRich:!0,isCode:I?I.isCode:!1})),c.querySelector("span").textContent=I?"Editar Item":"Novo Item",n.style.transform="translateY(0)",setTimeout(()=>{let x=A.querySelector("input");x&&x.focus()},300)}function _(){n.style.transform="translateY(100%)",setTimeout(()=>i=null,300)}async function D(){let I=A.querySelector("#cw-inp-title"),M=A.querySelector("#cw-inp-content"),x=I.value.trim(),E=M.contentEditable==="true"?M.innerHTML:M.value.trim(),h=M.getAttribute("data-is-code")==="true";if(!x||!E||E==="<br>"){$("Preencha t\xEDtulo e conte\xFAdo.",{error:!0});return}let S={id:i,type:o,title:x,content:E,isCode:h,isRich:M.contentEditable==="true"};if(o==="email"){let k=A.querySelector("#cw-inp-subject").value.trim();if(!k){$("Assunto \xE9 obrigat\xF3rio para emails.",{error:!0});return}S.subject=k}G.textContent="Salvando...",await ne.save(S),G.textContent="Salvar",_(),O(),$("Salvo com sucesso!"),B.playSuccess()}function z(I,M,x,E={}){let h=document.createElement("div");Object.assign(h.style,r.inputGroup);let S=document.createElement("label");S.textContent=M,Object.assign(S.style,r.label);let k;if(E.isRich){let u=document.createElement("div");u.style.cssText="display:flex; gap:6px; margin-bottom:12px; background:rgba(241, 243, 244, 0.8); padding:6px; border-radius:12px; border:1px solid #DADCE0; backdrop-filter: blur(10px);",u.innerHTML=`
                <button type="button" class="cw-toolbar-btn cw-tb-bold cw-tactile" title="Negrito">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path></svg>
                </button>
                <button type="button" class="cw-toolbar-btn cw-tb-italic cw-tactile" title="It\xE1lico">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="4" x2="10" y2="4"></line><line x1="14" y1="20" x2="5" y2="20"></line><line x1="15" y1="4" x2="9" y2="20"></line></svg>
                </button>
                <button type="button" class="cw-toolbar-btn cw-tb-code cw-tactile" title="Formato C\xF3digo">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                </button>
                <button type="button" class="cw-toolbar-btn cw-tb-img cw-tactile" title="Inserir Imagem">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                </button>
            `,k=document.createElement("div"),k.contentEditable="true",Object.assign(k.style,r.input,{minHeight:"180px",maxHeight:"350px",overflowY:"auto",whiteSpace:"pre-wrap",lineHeight:"1.6",outline:"none"}),k.innerHTML=x||"",E.isCode&&(k.style.fontFamily="'Roboto Mono', monospace",k.style.backgroundColor="#F8F9FA",k.setAttribute("data-is-code","true")),u.querySelectorAll(".cw-toolbar-btn").forEach(y=>{y.onmouseenter=()=>B.playHover(),y.onmousedown=()=>B.playClick()}),u.querySelector(".cw-tb-bold").onclick=()=>{document.execCommand("bold"),k.focus()},u.querySelector(".cw-tb-italic").onclick=()=>{document.execCommand("italic"),k.focus()},u.querySelector(".cw-tb-code").onclick=y=>{let w=!(k.getAttribute("data-is-code")==="true");k.setAttribute("data-is-code",w),k.style.fontFamily=w?"'Roboto Mono', monospace":"inherit",k.style.backgroundColor=w?"rgba(0, 122, 255, 0.03)":a.surface,w?y.currentTarget.classList.add("active"):y.currentTarget.classList.remove("active"),k.focus()},u.querySelector(".cw-tb-img").onclick=async()=>{let y=await Mt("Cole a URL da imagem:");y&&(document.execCommand("insertImage",!1,y),k.querySelectorAll("img").forEach(w=>{w.style.maxWidth="100%",w.style.borderRadius="8px"}))},k.onpaste=y=>{let v=(y.clipboardData||y.originalEvent.clipboardData).items;for(let w of v)if(w.kind==="file"&&w.type.startsWith("image/")){y.preventDefault();let F=w.getAsFile(),j=new FileReader;j.onload=q=>{let V=`<img src="${q.target.result}" style="max-width:100%; border-radius:8px; margin:8px 0; display:block;">`;document.execCommand("insertHTML",!1,V)},j.readAsDataURL(F)}},h.appendChild(S),h.appendChild(u)}else k=document.createElement("input"),k.type="text",Object.assign(k.style,r.input),k.value=x||"",h.appendChild(S);return k.id=`cw-inp-${I}`,k.onfocus=()=>{k.style.borderColor=a.primary,k.style.boxShadow=`0 0 0 2px ${a.primaryBg}`},k.onblur=()=>{k.style.borderColor=a.border,k.style.boxShadow="none"},h.appendChild(k),h}function R(I){return Object.entries(I).map(([M,x])=>`${M.replace(/[A-Z]/g,E=>"-"+E.toLowerCase())}:${x}`).join(";")}function H(){t=!t,ce(t,s,"cw-btn-library"),t&&O()}return H}function bo(){let e="v1.0",t=!1,o={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",text:"#202124",textSub:"#5F6368",border:"#DADCE0"},n="cw-configs-styles";if(!document.getElementById(n)){let d=document.createElement("style");d.id=n,d.innerHTML=`
            .cw-configs-container {
                display: flex; flex-direction: column; height: 100%;
                background: ${o.bg}; font-family: 'Google Sans', Roboto, sans-serif;
                padding: 20px; gap: 24px; overflow-y: auto;
            }
            .cw-configs-section { display: flex; flex-direction: column; gap: 12px; }
            .cw-configs-section-title {
                font-size: 12px; font-weight: 700; color: ${o.textSub};
                text-transform: uppercase; letter-spacing: 0.8px;
            }
            .cw-configs-card {
                background: ${o.surface}; border-radius: 12px; padding: 16px;
                border: 1px solid ${o.border}; box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                display: flex; flex-direction: column; gap: 16px;
            }
            .cw-configs-row { display: flex; align-items: center; justify-content: space-between; }
            .cw-configs-label { font-size: 14px; font-weight: 500; color: ${o.text}; }
            .cw-configs-desc { font-size: 12px; color: ${o.textSub}; margin-top: 2px; }
            .cw-configs-btn {
                padding: 10px; border-radius: 8px; border: 1px solid ${o.border};
                background: white; cursor: pointer; font-weight: 500; font-family: inherit;
                transition: all 0.2s;
            }
            .cw-configs-btn:hover { background: #f1f3f4; border-color: #bdc1c6; }
        `,document.head.appendChild(d)}let i=document.createElement("div");i.id="configs-popup",i.classList.add("cw-module-window"),Object.assign(i.style,re,{right:"100px",width:"400px",height:"600px",overflow:"hidden",borderRadius:"24px"});let r=se(i,"Configura\xE7\xF5es",e,"Personalize sua experi\xEAncia e prefer\xEAncias.",{popup:i},()=>f());i.appendChild(r);let s=document.createElement("div");s.className="cw-configs-container",i.appendChild(s);let g=document.createElement("div");g.className="cw-configs-section",g.innerHTML=`
        <div class="cw-configs-section-title">Prefer\xEAncias de Som</div>
        <div class="cw-configs-card">
            <div class="cw-configs-row">
                <div>
                    <div class="cw-configs-label">Efeitos Sonoros</div>
                    <div class="cw-configs-desc">Ativar ou desativar sons de interface.</div>
                </div>
                <input type="checkbox" id="cw-config-sound-toggle" ${B.isMuted()?"":"checked"} style="cursor:pointer; width:20px; height:20px;">
            </div>
        </div>
    `;let l=g.querySelector("#cw-config-sound-toggle");l.onchange=d=>{B.setMuted(!d.target.checked),d.target.checked&&B.playClick()},s.appendChild(g);let p=document.createElement("div");p.className="cw-configs-section",p.innerHTML=`
        <div class="cw-configs-section-title">Apar\xEAncia</div>
        <div class="cw-configs-card">
            <div style="color:${o.textSub}; font-size:13px; text-align:center; padding:10px;">
                Em breve: Suporte a modo escuro e esquemas de cores.
            </div>
        </div>
    `,s.appendChild(p);let m=document.createElement("div");m.className="cw-configs-section",m.innerHTML=`
        <div class="cw-configs-section-title">Suporte & Feedback</div>
        <div class="cw-configs-card">
            <div style="display:flex; flex-direction:column; gap:12px;">
                <button class="cw-configs-btn">Reportar Bug</button>
                <button class="cw-configs-btn">Sugerir Recurso</button>
            </div>
        </div>
    `,s.appendChild(m);function f(){t=!t,ce(t,i,"cw-btn-configs"),t&&B.playClick()}return document.body.appendChild(i),f}function zo(){if(window.techSolInitialized){lt();return}window.techSolInitialized=!0;let e="v5.2";console.log(`\u{1F680} TechSol Suite Initializing (${e})...`);try{Tt();try{B.initGlobalListeners(),B.playStartup()}catch(l){console.warn("\xC1udio bloqueado:",l)}ee.fetchTips(),lt();let t=to(),o=oo(),n=ao(),i=ro(),a=mo(),r=go(),s=bo(),g=so();Zt({toggleNotes:t,toggleEmail:o,toggleScript:n,toggleLinks:i,toggleTimezone:a,toggleLibrary:r,toggleConfigs:s,broadcastControl:g}),setTimeout(()=>{ee.logEvent("App","Start","Session Start"),lo(),setTimeout(()=>{po(e)},500)},2500)}catch(t){console.error("Erro fatal na inicializa\xE7\xE3o:",t),$("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}zo();})();
