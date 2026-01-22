(()=>{var mt="",gt="",Kt=t=>new Promise(e=>setTimeout(e,t));async function Qt(){if(mt&&gt)return mt;try{let t=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!t)return"Agente";t.click(),await Kt(150);let e="Consultor",o=document.querySelector("profile-details .name");if(o)e=o.textContent.trim().split(" ")[0],e=e.charAt(0).toUpperCase()+e.slice(1).toLowerCase();else{let s=document.querySelector("profile-details img");if(s&&s.src.includes("/photos/")){let i=s.src.match(/\/photos\/([^\?]+)/)[1];e=i.charAt(0).toUpperCase()+i.slice(1)}}let a=document.querySelector("profile-details .email");return a&&(gt=a.textContent.trim(),console.log("TechSol: Identidade confirmada ->",gt)),t.click(),document.body.click(),mt=e,e}catch(t){return console.warn("Sherlock falhou:",t),"Consultor"}}function Rt(){return mt||"Consultor"}function bt(){return gt||null}function Zt(t){let e=new Date,o=e.getHours(),a=e.getDay(),s="Ol\xE1",i="";o>=5&&o<12?(s="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):o>=12&&o<18?(s="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(s="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let n=[];o>=0&&o<5?n=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:o<12?a===1?n=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:a===5?n=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:n=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:o<18?n=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:n=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(a===0||a===6)&&(n=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let r=n[Math.floor(Math.random()*n.length)];return{prefix:`${s},`,name:t,suffix:r,icon:i,isFriday:a===5}}async function Go(){try{let e=document.evaluate("//div[contains(@class, 'form-label') and contains(text(), 'Contact email')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(!e)return null;let o=e.parentElement,a=o.querySelector(".unmask-button")||o.querySelector('[aria-label="Click to view"]');a&&(a.click(),await Kt(500));let i=Array.from(o.querySelectorAll("a, span, div, pii-value")).find(n=>{let r=n.innerText.trim();return r.includes("@")&&!r.includes("Is this:")&&r.toLowerCase()!=="email"});return i?i.innerText.trim():null}catch(t){return console.warn("Erro ao capturar email do cliente:",t),null}}function Bo(){try{let t=document.querySelector('material-input[debug-id="account-id-input"]');if(t){let e=t.querySelector("input");if(e){let o=e.value.trim();if(o)return o.includes("@")?o:`${o}@google.com`}}}catch(t){console.warn("Erro ao capturar email interno:",t)}return null}async function at(){let t="Cliente",e="[INSERIR URL]";try{let i=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(i&&i.nextElementSibling){let n=i.nextElementSibling.innerText.trim();n&&(t=n)}}catch(s){console.warn("Falha Nome:",s)}try{let i=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(i&&i.nextElementSibling){let n=i.nextElementSibling.innerText.trim();n&&(e=n)}}catch(s){console.warn("Falha URL:",s)}let o=await Go(),a=Bo();return{advertiserName:t,websiteUrl:e,clientEmail:o,internalEmail:a,agentName:Rt()}}var Ve=null,_t=null,Re=.3;function $e(){if(!Ve){let t=window.AudioContext||window.webkitAudioContext;t&&(Ve=new t)}return Ve&&Ve.state==="suspended"&&Ve.resume(),Ve}function Jt(t){if(_t)return _t;let e=t.sampleRate*2,o=t.createBuffer(1,e,t.sampleRate),a=o.getChannelData(0);for(let s=0;s<e;s++)a[s]=Math.random()*2-1;return _t=o,o}var U={playClick:()=>{let t=$e();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Jt(t);let a=t.createBiquadFilter();a.type="highpass",a.frequency.value=4e3;let s=t.createGain();s.gain.setValueAtTime(Re*.8,e),s.gain.exponentialRampToValueAtTime(.001,e+.015),o.connect(a),a.connect(s),s.connect(t.destination),o.start(e),o.stop(e+.02)},playHover:()=>{let t=$e();if(!t)return;let e=t.currentTime,o=t.createOscillator();o.type="sine",o.frequency.setValueAtTime(400,e);let a=t.createGain();a.gain.setValueAtTime(0,e),a.gain.linearRampToValueAtTime(Re*.1,e+.005),a.gain.linearRampToValueAtTime(0,e+.02),o.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.03)},playSuccess:()=>{let t=$e();if(!t)return;let e=t.currentTime;[1046.5,1567.9].forEach((a,s)=>{let i=t.createOscillator(),n=t.createGain();i.type="sine",i.frequency.value=a,n.gain.setValueAtTime(0,e),n.gain.linearRampToValueAtTime(Re*.6,e+.05),n.gain.exponentialRampToValueAtTime(.001,e+.6),i.connect(n),n.connect(t.destination),i.start(e),i.stop(e+.7)})},playGenieOpen:()=>{let t=$e();if(!t)return;let e=t.currentTime,o=t.createBufferSource();o.buffer=Jt(t);let a=t.createBiquadFilter();a.type="lowpass",a.frequency.setValueAtTime(100,e),a.frequency.exponentialRampToValueAtTime(800,e+.2);let s=t.createGain();s.gain.setValueAtTime(0,e),s.gain.linearRampToValueAtTime(Re*.5,e+.05),s.gain.linearRampToValueAtTime(0,e+.25),o.connect(a),a.connect(s),s.connect(t.destination),o.start(e),o.stop(e+.3)},playError:()=>{let t=$e();if(!t)return;let e=t.currentTime,o=t.createOscillator(),a=t.createGain();o.type="triangle",o.frequency.setValueAtTime(120,e),o.frequency.exponentialRampToValueAtTime(80,e+.1),a.gain.setValueAtTime(Re,e),a.gain.exponentialRampToValueAtTime(.001,e+.15),o.connect(a),a.connect(t.destination),o.start(e),o.stop(e+.2)},playStartup:()=>{let t=$e();if(!t)return;let e=t.currentTime,o=.12,a=t.createOscillator(),s=t.createGain(),i=t.createBiquadFilter();a.type="square",a.frequency.setValueAtTime(400,e),a.frequency.exponentialRampToValueAtTime(50,e+.1),i.type="lowpass",i.frequency.setValueAtTime(800,e),i.frequency.exponentialRampToValueAtTime(100,e+.1),s.gain.setValueAtTime(Re*4,e),s.gain.exponentialRampToValueAtTime(.001,e+.1),a.connect(i),i.connect(s),s.connect(t.destination),a.start(e),a.stop(e+.12);let n=t.createOscillator(),r=t.createGain();n.type="sine",n.frequency.setValueAtTime(150,e),n.frequency.exponentialRampToValueAtTime(50,e+.15),r.gain.setValueAtTime(Re*1.5,e),r.gain.exponentialRampToValueAtTime(.001,e+.15),n.connect(r),r.connect(t.destination),n.start(e),n.stop(e+.15),[55,55.4,110.5].forEach(g=>{let f=t.createOscillator(),p=t.createGain(),h=t.createBiquadFilter();f.type="sawtooth",f.frequency.value=g,h.type="lowpass",h.frequency.setValueAtTime(30,e),h.frequency.linearRampToValueAtTime(900,e+o+.2),h.frequency.exponentialRampToValueAtTime(40,e+3),p.gain.setValueAtTime(0,e),p.gain.linearRampToValueAtTime(Re*.6,e+o+.1),p.gain.exponentialRampToValueAtTime(.001,e+3.5),f.connect(h),h.connect(p),p.connect(t.destination),f.start(e),f.stop(e+3.6)})},playNotification:()=>{let t=$e();if(!t)return;let e=t.currentTime;[{freq:880,dur:1.2,vol:.6},{freq:1760,dur:.6,vol:.3}].forEach(a=>{let s=t.createOscillator(),i=t.createGain();s.type="sine",s.frequency.setValueAtTime(a.freq,e),i.gain.setValueAtTime(0,e),i.gain.linearRampToValueAtTime(Re*a.vol,e+.004),i.gain.exponentialRampToValueAtTime(.001,e+a.dur),s.connect(i),i.connect(t.destination),s.start(e),s.stop(e+a.dur+.1)})},playSwoosh:()=>{U.playGenieOpen()},playReset:()=>{U.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let t=0,e=50;document.addEventListener("mouseover",o=>{if(!Ve)return;let a=o.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!a||a.contains(o.relatedTarget))return;let s=Date.now();s-t<e||(U.playHover(),t=s)},{passive:!0})}};var eo=1e4;function oo(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let t=document.createElement("link");t.id="google-font-roboto",t.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",t.rel="stylesheet",document.head.appendChild(t);let e=document.createElement("style");e.id="techsol-global-styles",e.textContent=`
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
    `,document.head.appendChild(e)}function W(t,e={}){let o=document.createElement("div"),a=e.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(o.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:a,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),o.textContent=t,document.body.appendChild(o),e.error?U.playError():U.playSuccess(),requestAnimationFrame(()=>{o.style.opacity="1",o.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{o.style.opacity="0",o.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>o.remove(),400)},e.duration||4e3)}function no(t,e=null){let o=0,a=0,s=0,i=0,n=e||t;n.style.cursor="grab",n.onmousedown=r;function r(f){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(f.target.tagName)||f.target.closest(".no-drag"))return;f=f||window.event,n.style.cursor="grabbing",t.style.transition="none";let p=t.getBoundingClientRect();t.style.transform="none",t.style.left=p.left+"px",t.style.top=p.top+"px",t.style.margin="0",t.style.bottom="auto",t.style.right="auto",eo++,t.style.zIndex=eo,s=f.clientX,i=f.clientY,t.setAttribute("data-dragging","true"),document.onmouseup=g,document.onmousemove=u}function u(f){f=f||window.event,f.preventDefault(),o=s-f.clientX,a=i-f.clientY,s=f.clientX,i=f.clientY;let p=t.offsetTop-a,h=t.offsetLeft-o,A=16,y=window.innerWidth,T=window.innerHeight,R=t.offsetWidth,M=t.offsetHeight;h<A?h=A:h+R>y-A&&(h=y-R-A),p<A?p=A:p+M>T-A&&(p=T-M-A),t.style.top=p+"px",t.style.left=h+"px"}function g(){document.onmouseup=null,document.onmousemove=null,n.style.cursor="grab",setTimeout(()=>{t.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",t.setAttribute("data-dragging","false"),t.setAttribute("data-moved","true")},50)}}var Ae={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var Lt={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},ft={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var ao={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var xe={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var Mt=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],to=-1;function it(){let t=Math.floor(Math.random()*Mt.length);return t===to&&(t=(t+1)%Mt.length),to=t,Mt[t]}var _e=t=>new Promise(e=>setTimeout(e,t));async function Po(t,e){if(!t)return;t.style.opacity="1",t.innerHTML='<span class="cursor">|</span>';let o=t.querySelector(".cursor");await _e(200);for(let a=0;a<e.length;a++){let s=e.charAt(a),i=document.createElement("span");i.textContent=s,o&&o.parentNode===t?o.before(i):t.appendChild(i);let n=Math.floor(Math.random()*60)+30;a===0&&(n=150),a>e.length-3&&(n=30),await _e(n)}await _e(600),o&&(o.style.display="none")}async function Nt(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let e=document.createElement("style");e.id="google-splash-style",e.innerHTML=`
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
    `,document.body.appendChild(t),requestAnimationFrame(()=>t.style.opacity="1");try{await _e(200);let e=await Qt(),o=Zt(e),a=t.querySelector("#w-icon"),s=t.querySelector("#p1"),i=t.querySelector("#p2"),n=t.querySelector("#p3"),r=t.querySelector("#p-sextou");a&&(a.innerHTML=o.icon),s&&(s.textContent=o.prefix),n&&(n.textContent=o.suffix),await _e(300);let u=a?a.querySelector("svg"):null;if(u&&(u.style.opacity="1",u.style.transform="scale(1)"),await _e(400),s&&(s.style.opacity="1"),U.playStartup(),i&&await Po(i,o.name),n&&(n.style.opacity="1",n.style.transform="translateY(0)"),o.isFriday&&r){await _e(400),r.style.display="block",r.offsetWidth;let g=r.querySelector(".sextou-badge");g&&(g.style.opacity="1",g.style.transform="scale(1)")}await _e(1500)}catch(e){console.warn("Splash error, skipping...",e)}finally{t.classList.add("splash-exit"),await _e(900),t.parentNode&&t.parentNode.removeChild(t)}}var Qe={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Ze(t,e){e.onmousedown=o;function o(a){a.stopPropagation(),a.preventDefault();let s=t.style.transition;t.style.transition="none";let i=a.clientX,n=a.clientY,r=parseFloat(getComputedStyle(t,null).getPropertyValue("width").replace("px","")),u=parseFloat(getComputedStyle(t,null).getPropertyValue("height").replace("px","")),g=i,f=n,p=!1;function h(T){g=T.clientX,f=T.clientY,p||(window.requestAnimationFrame(()=>{A(),p=!1}),p=!0)}function A(){let T=r+(g-i),R=u+(f-n);T>360&&(t.style.width=T+"px"),R>300&&(t.style.height=R+"px")}function y(){document.removeEventListener("mousemove",h),document.removeEventListener("mouseup",y),setTimeout(()=>{t.style.transition=s},50)}document.addEventListener("mousemove",h),document.addEventListener("mouseup",y)}e.onmouseenter=()=>e.style.opacity="1",e.onmouseleave=()=>e.style.opacity="0.6"}function io(t){if(!t)return"";let e={":bufo-alarma:":"\u{1F438}\u{1F6A8}",":frog-hype-1:":"\u{1F438}\u{1F973}",":coffee-intensifies:":"\u2615\u26A1",":frog-eat:":"\u{1F438}\u2615",":alert-01:":"\u26A0\uFE0F",":alert-circle-i-notice:":"\u2139\uFE0F",":wind-face-animated:":"\u{1F32C}\uFE0F",":smile:":"\u{1F642}",":warning:":"\u26A0\uFE0F",":check:":"\u2705",":white_check_mark:":"\u2705",":x:":"\u274C",":rocket:":"\u{1F680}",":tada:":"\u{1F389}",":party_popper:":"\u{1F389}",":thumbsup:":"\u{1F44D}",":+1:":"\u{1F44D}",":purple_heart:":"\u{1F49C}",":heart:":"\u2764\uFE0F",":fire:":"\u{1F525}",":sunny:":"\u{1F31E}",":star:":"\u2B50",":coffee:":"\u2615"};return t.replace(/:([a-zA-Z0-9-_+]+):/g,o=>e[o]?e[o]:"")}var Je=t=>new Promise(e=>setTimeout(e,t));function st(t){t&&["mousedown","mouseup","click"].forEach(e=>t.dispatchEvent(new MouseEvent(e,{bubbles:!0,cancelable:!0,view:window})))}var so="cw-automation-styles";if(!document.getElementById(so)){let t=document.createElement("style");t.id=so,t.innerHTML=`
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
    `,document.head.appendChild(t)}function ro(t){let e=document.getElementById("cw-loading-overlay");t?e?e.style.opacity="1":(e=document.createElement("div"),e.id="cw-loading-overlay",document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1")):e&&(e.style.opacity="0",setTimeout(()=>e.remove(),300))}async function lo(t){console.log("\u{1F680} Iniciando extra\xE7\xE3o autom\xE1tica...");let e=document.getElementById(t),o="";ro(!0),e&&(o=e.placeholder,e.placeholder="Buscando ID...",e.value="",e.classList.add("cw-scanning-active"));try{let a=document.querySelector('material-button[debug-id="dock-item-case-log"]');a&&!a.classList.contains("selected")&&(st(a),await Je(1200));let s=document.querySelector("search-filter dropdown-button .button");if(s&&!(s.innerText||"").includes("All")){st(s),await Je(600);let h=document.querySelector('material-checkbox[debug-id="check-all-box"]');h&&h.getAttribute("aria-checked")!=="true"&&(st(h),await Je(300));let A=document.querySelector('material-button[debug-id="apply-filter"]');A&&(st(A),await Je(1500))}let i=document.querySelector(".scroll-container")||document.querySelector(".case-log-container");i&&(i.scrollTop=i.scrollHeight,await Je(500));let n=Array.from(document.querySelectorAll(".message-header"));for(let p=n.length-1;p>=0;p--){let h=n[p],A=h.querySelector("i.material-icons-extended"),y=A&&A.innerText.trim()==="phone_in_talk",T=h.innerText||"",R=T.includes("Agent joined")||T.includes("outbound-call")||T.includes("Speakeasy");if(y||R){h.getAttribute("aria-expanded")==="true"||(console.log("\u{1F4C2} Expandindo mensagem de chamada...",h),e&&(e.placeholder="Lendo mensagem..."),st(h),await Je(1e3));break}}let u=Array.from(document.querySelectorAll(".preview, .speakeasy-agent-activity, .message-body, .content-container")),g=/Speakeasy.*?(P\d{15,25})/i,f=null;for(let p=u.length-1;p>=0;p--){let h=u[p];if(h.offsetParent===null)continue;let A=(h.innerText||"").match(g);if(A&&A[1]){f=A[1];break}}if(e)if(f){try{await navigator.clipboard.writeText(f)}catch{}e.value=f,e.dispatchEvent(new Event("input",{bubbles:!0})),e.dispatchEvent(new Event("change",{bubbles:!0})),U.playSuccess(),W(`ID Localizado: ${f}`),e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(15, 157, 88, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}else U.playError(),W("Nenhum ID encontrado.",{error:!0}),e.placeholder="N\xE3o encontrado",e.style.transition="background-color 0.3s",e.style.backgroundColor="rgba(234, 67, 53, 0.1)",setTimeout(()=>e.style.backgroundColor="",1e3)}catch(a){console.error("Erro na automa\xE7\xE3o:",a),W("Erro ao processar.",{error:!0})}finally{e&&(e.classList.remove("cw-scanning-active"),e.value||(e.placeholder=o)),ro(!1)}}var Me={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:"}},De={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},rt={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},DC_Other:{status:"DC",name:"DC - Other",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>Substatus:</b> DC - Other<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br>Obs.: Sigo as orienta\xE7\xF5es presentes na documenta\xE7\xE3o do treinamento (https://screenshot.googleplex.com/rUtQqsLxRNfjcr)"}},Ue={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl",DC_Other:null},lt=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],Dt=["CONSIDERACOES","COMENTARIOS"],Oe={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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
\u2022 Tentativa 2 -`}};var be=t=>new Promise(e=>setTimeout(e,t));function ye(t,e="info"){let o={info:"background: #e8f0fe; color: #1a73e8; padding: 2px 5px; border-radius: 3px;",warn:"background: #fef7e0; color: #b06000; padding: 2px 5px; border-radius: 3px;",error:"background: #fce8e6; color: #c5221f; padding: 2px 5px; border-radius: 3px;",success:"background: #e6f4ea; color: #137333; padding: 2px 5px; border-radius: 3px;"};console.log(`%c[EMAIL-BOT] ${t}`,o[e]||o.info)}function Ie(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function ht(t,e){if(!t)return;let o=`cw-warning-${t.id||Math.random().toString(36).substr(2,9)}`,a=document.getElementById(o);a&&a.remove();let s=t.getBoundingClientRect(),i=document.createElement("div");i.id=o,i.style.cssText=`
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
    `;let n=i.querySelector(".cw-close-btn");n.onclick=()=>{i.style.opacity="0",i.style.transform="translateY(-5px)",setTimeout(()=>i.remove(),300)},document.body.appendChild(i),requestAnimationFrame(()=>{i.style.opacity="1",i.style.transform="translateY(0)"}),setTimeout(()=>{document.body.contains(i)&&n.click()},25e3)}async function xt(t,e){if(!t||!e)return;t.focus(),t.value="",t.dispatchEvent(new Event("input",{bubbles:!0})),await be(50),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(t,e),t.dispatchEvent(new Event("input",{bubbles:!0})),t.dispatchEvent(new Event("change",{bubbles:!0})),await be(100),t.dispatchEvent(new KeyboardEvent("keydown",{key:"Enter",code:"Enter",bubbles:!0})),t.dispatchEvent(new KeyboardEvent("keyup",{key:"Enter",code:"Enter",bubbles:!0}))}function zt(){let e=Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(o=>{let a=o.offsetParent!==null,s=o.closest("case-message-view")!==null,i=o.closest(".editor")!==null||o.closest("write-card")!==null;return a&&!s&&i});return e&&ye("Editor visualmente detectado.","success"),e}async function co(){ye("\u{1F680} FASE 1: Tentando abrir a janela de email...");let t=!1,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(p=>p.innerText.trim()==="email");if(o&&o.offsetParent!==null){ye("Bot\xE3o de email direto encontrado.");let p=o.closest("material-button")||o.closest("material-fab")||o;Ie(p),t=!0}else{ye("Bot\xE3o direto n\xE3o vis\xEDvel. Tentando Speed Dial (+)...","warn");let p=document.querySelector("material-fab-speed-dial");if(p){let h=p.querySelector(".trigger");if(h){Ie(h),await be(800);let y=Array.from(document.querySelectorAll("i.material-icons-extended")).find(T=>T.innerText.trim()==="email");y&&(Ie(y),t=!0)}}}if(!t)return W("Erro: Bot\xE3o de email n\xE3o encontrado.",{error:!0}),!1;ye("\u{1F680} FASE 2: Verificando rascunhos...");let a=null,s=0,i=20;for(;s<i;){await be(250);let p=document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]');if(a=Array.from(p).find(h=>h.offsetParent!==null),a){ye("\u26A0\uFE0F Rascunho detectado!","warn");break}s++}if(a){ye("\u{1F5D1}\uFE0F Descartando..."),Ie(a),a.click();let p=null,h=0;for(;h<15;){await be(300);let A=document.querySelectorAll('material-button[debug-id="confirm-button"]');if(p=Array.from(A).find(y=>y.offsetParent!==null),p)break;h++}p&&(Ie(p),W("Limpando rascunho antigo...",{duration:2e3}),await be(2500))}ye("\u{1F680} FASE 3: Buscando editor final...");let n=0,r=null;for(;n<20&&(r=zt(),!r);)await be(250),n++;if(!r)return W("Erro: Editor n\xE3o carregou.",{error:!0}),!1;let u=r.closest('[id="email-body-content-top"]'),f=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(u){if(f){let h=f.closest('[aria-hidden="true"]');h&&h.removeAttribute("aria-hidden"),f.focus(),Ie(f)}await be(300),u.innerHTML=`
            <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                <span id="cases-body-field"><br></span>
            </div>
        `;let p=u.querySelector("#cases-body-field");if(p){let h=document.createRange();h.selectNodeContents(p),h.collapse(!0);let A=window.getSelection();A.removeAllRanges(),A.addRange(h)}return!0}return!1}async function yt(t){if(!t||!await co())return;let o=await at();ye("\u{1F4E7} Processando destinat\xE1rios para CR...","info");let a=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(a&&(a.click(),await be(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let i=document.querySelector('input[aria-label="Enter To email address"]');i&&(await xt(i,o.clientEmail),ht(i,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let i=document.querySelector('input[aria-label="Enter Bcc email address"]');i&&(await xt(i,o.internalEmail),ht(i,`
                <strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.
                <div style="margin-top:4px;">
                    <a href="https://mail.google.com/mail/u/0?ui=2&ik=ed23fb3167&attid=0.1&permmsgid=msg-f:1843445102914241244&th=19953b8dda2302dc&view=fimg&fur=ip&permmsgid=msg-f:1843445102914241244&sz=s0-l75-ft&attbid=ANGjdJ9m7O33cM36sxBYohVD6Qsapyux4PNr8qmTBlZ8zkp_LR79suGZhnxFJtBoFDeyMFygsH_tvCts5fnX0WV4rdClw9YqqR7guLnaXU9UzmZRRMRXEoC7T_MPbwo&disp=emb&realattid=ii_mfmv7wjm1&zw" target="_blank" style="color:#1a73e8;text-decoration:none;font-weight:500;display:inline-flex;align-items:center;">
                        Consultar Regra <span style="font-size:14px;margin-left:2px;">\u2197</span>
                    </a>
                </div>
            `))}await be(500);let s=document.querySelector('material-button[debug-id="canned_response_button"]');if(s){Ie(s),await be(1e3);let i=document.querySelector("material-auto-suggest-input input");if(i){Ie(i),document.execCommand("insertText",!1,t),i.dispatchEvent(new Event("input",{bubbles:!0})),ye("\u23F3 Buscando resultado da Canned Response...","info");let n=null,r=0,u=15e3,g=500;for(;r<u&&(n=document.querySelector("material-select-dropdown-item"),!n);)await be(g),r+=g;if(n){Ie(n),await be(1500);let f=zt();if(f&&o.advertiserName){let p=f.innerHTML;p.includes("{%ADVERTISER_NAME%}")&&(f.innerHTML=p.replace(/{%ADVERTISER_NAME%}/g,o.advertiserName))}W("Canned Response aplicada!")}else ye(`\u274C Timeout: Resultado '${t}' n\xE3o apareceu ap\xF3s 15s.`,"error"),W(`Timeout: Template '${t}' n\xE3o carregou.`,{error:!0})}}else W("Bot\xE3o Canned Response n\xE3o encontrado.",{error:!0})}async function po(t){if(ye(`\u{1F680} Iniciando Quick Email: ${t.name}`),!await co())return;let o=await at(),a=Rt();await be(600),ye("\u{1F4E7} Processando destinat\xE1rios...");let s=document.querySelector('material-icon[aria-label="Show CC and BCC fields"]')||document.querySelector('material-icon[debug-id="expand-button"][aria-pressed="false"]');if(s&&(s.click(),await be(600)),o.clientEmail&&o.clientEmail!=="N/A"&&o.clientEmail!=="N/A (Bloqueado)"){let r=document.querySelector('input[aria-label="Enter To email address"]');r&&(await xt(r,o.clientEmail),ht(r,"<strong>Verifique o e-mail:</strong> O CRM pode traduzir caracteres incorretamente."))}if(o.internalEmail){let r=document.querySelector('input[aria-label="Enter Bcc email address"]');r&&(await xt(r,o.internalEmail),ht(r,`
                <strong>Aten\xE7\xE3o:</strong> Verifique se o e-mail do AM deve estar em c\xF3pia.
                <div style="margin-top:4px;">
                    <a href="https://mail.google.com/mail/u/0?ui=2&ik=ed23fb3167&attid=0.1&permmsgid=msg-f:1843445102914241244&th=19953b8dda2302dc&view=fimg&fur=ip&permmsgid=msg-f:1843445102914241244&sz=s0-l75-ft&attbid=ANGjdJ9m7O33cM36sxBYohVD6Qsapyux4PNr8qmTBlZ8zkp_LR79suGZhnxFJtBoFDeyMFygsH_tvCts5fnX0WV4rdClw9YqqR7guLnaXU9UzmZRRMRXEoC7T_MPbwo&disp=emb&realattid=ii_mfmv7wjm1&zw" target="_blank" style="color:#1a73e8;text-decoration:none;font-weight:500;display:inline-flex;align-items:center;">
                        Consultar Regra <span style="font-size:14px;margin-left:2px;">\u2197</span>
                    </a>
                </div>
            `))}let i=document.querySelector('input[aria-label="Subject"]');i&&t.subject&&(i.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(i,t.subject),i.dispatchEvent(new Event("input",{bubbles:!0})),await be(300));let n=zt();if(n){let u=(n.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');u&&(u.focus(),Ie(u));let g=new Date;g.setDate(g.getDate()+3);let f=g.getDay();f===6?g.setDate(g.getDate()+2):f===0&&g.setDate(g.getDate()+1);let p=g.toLocaleDateString("pt-BR"),h=t.body;h=h.replace(/\[Nome do Cliente\]/g,o.advertiserName||"Cliente"),h=h.replace(/\[INSERIR URL\]/g,o.websiteUrl||"seu site"),h=h.replace(/\[URL\]/g,o.websiteUrl||"seu site"),h=h.replace(/\[Seu Nome\]/g,a),h=h.replace(/\[MM\/DD\/YYYY\]/g,p),document.execCommand("insertHTML",!1,h),u&&(u.dispatchEvent(new Event("input",{bubbles:!0})),u.dispatchEvent(new Event("change",{bubbles:!0}))),W("Email preenchido com sucesso!",{duration:2e3}),ye("\u2705 Processo finalizado com sucesso.","success")}else W("Erro ao focar no editor.",{error:!0})}var jo={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},uo={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function Ce(t,e,o,a,s,i){let n=document.createElement("div");Object.assign(n.style,jo),no(t,n);let r=document.createElement("div");Object.assign(r.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),n.appendChild(r),s&&(s.googleLine=r);let u=document.createElement("div");Object.assign(u.style,{display:"flex",alignItems:"center",gap:"12px"});let g=document.createElement("img");g.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(g.style,{width:"20px",height:"20px",pointerEvents:"none"});let f=document.createElement("span");f.textContent=e,u.appendChild(g),u.appendChild(f);let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center",gap:"4px"});let h='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',A='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',y=document.createElement("div");y.innerHTML=h,Object.assign(y.style,uo),y.title="Sobre & Feedback",y.classList.add("no-drag"),y.onmouseenter=()=>{y.style.background="rgba(255,255,255,0.1)",y.style.color="#FFF"},y.onmouseleave=()=>{y.style.color!=="rgb(138, 180, 248)"&&(y.style.background="transparent",y.style.color="#9AA0A6")};let T=document.createElement("div");T.innerHTML=A,Object.assign(T.style,uo),T.title="Fechar",T.classList.add("no-drag"),T.onmouseenter=()=>{T.style.background="rgba(242, 139, 130, 0.2)",T.style.color="#F28B82"},T.onmouseleave=()=>{T.style.background="transparent",T.style.color="#9AA0A6"},T.onmousedown=M=>M.stopPropagation(),y.onmousedown=M=>M.stopPropagation(),T.onclick=i;let R=Ho(t,e,o,a);return y.onclick=M=>{M.stopPropagation(),R.style.opacity==="1"?(R.style.opacity="0",R.style.pointerEvents="none",y.style.color="#9AA0A6",y.style.background="transparent"):(R.style.opacity="1",R.style.pointerEvents="auto",y.style.color="#8AB4F8",y.style.background="rgba(138, 180, 248, 0.1)")},p.appendChild(y),p.appendChild(T),n.appendChild(u),n.appendChild(p),n}function Ho(t,e,o,a){let s=document.createElement("div");return Object.assign(s.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(8px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),s.innerHTML=`
        <div style="color: #202124; font-size: 18px; font-weight: 600; margin-bottom: 8px;">${e}</div>
        <div style="color: #5f6368; font-size: 14px; margin-bottom: 24px;">Vers\xE3o ${o}</div>
        
        <div style="color: #3c4043; font-size: 14px; max-width: 90%; line-height: 1.6; margin-bottom: 24px;">
            ${a}
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
    `,setTimeout(()=>{let i=s.querySelector("#cw-feedback-link");i&&(i.onmouseenter=()=>{i.style.backgroundColor="#E8F0FE",i.style.transform="scale(1.02)"},i.onmouseleave=()=>{i.style.backgroundColor="#F8F9FA",i.style.transform="scale(1)"});let n=s.querySelector("#close-help-internal");n&&(n.onmouseover=()=>n.style.backgroundColor="#f8f9fa",n.onmouseout=()=>n.style.backgroundColor="white",n.onclick=()=>{s.style.opacity="0",s.style.pointerEvents="none"})},0),t.appendChild(s),s}if(!document.getElementById("cw-module-styles")){let t=document.createElement("style");t.id="cw-module-styles",t.innerHTML=`
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
    `,document.head.appendChild(t)}function Se(t,e,o){let a=document.getElementById(o);if(!e)return;let s=e.getAttribute("data-moved")==="true",i={x:0,y:0};if(a){let f=a.getBoundingClientRect();i.x=f.left+f.width/2,i.y=f.top+f.height/2}let n,r;if(!s)n=window.innerWidth/2,r=window.innerHeight/2;else{let f=e.getBoundingClientRect();n=f.left+f.width/2,r=f.top+f.height/2,n===0&&r===0&&(n=window.innerWidth/2,r=window.innerHeight/2)}let u=i.x-n,g=i.y-r;t?(U.playGenieOpen(),e.style.transition="none",e.style.opacity="0",e.style.pointerEvents="auto",s?e.style.transform=`translate(${u}px, ${g}px) scale(0.05)`:e.style.transform=`translate(calc(-50% + ${u}px), calc(-50% + ${g}px)) scale(0.05)`,e.offsetWidth,requestAnimationFrame(()=>{e.classList.add("open"),a&&a.classList.add("active"),e.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",e.style.opacity="1",s?e.style.transform="translate(0, 0) scale(1)":e.style.transform="translate(-50%, -50%) scale(1)"}),typeof mo=="function"&&mo(e,o)):(U.playSwoosh(),e.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",e.style.pointerEvents="none",requestAnimationFrame(()=>{e.style.opacity="0",s?e.style.transform=`translate(${u}px, ${g}px) scale(0.1)`:e.style.transform=`translate(calc(-50% + ${u}px), calc(-50% + ${g}px)) scale(0.1)`}),setTimeout(()=>{e.classList.remove("open"),a&&a.classList.remove("active"),e.style.transition="",e.style.transform=""},300),typeof Gt=="function"&&Gt(e))}function mo(t,e){Gt(t);let o=a=>{if(!t.classList.contains("open"))return;let s=t.contains(a.target),i=document.querySelector(".cw-pill"),n=i&&i.contains(a.target);s?(t.classList.remove("idle"),t.style.zIndex="2147483648"):n||(t.classList.add("idle"),t.style.zIndex="2147483646")};t._idleHandler=o,document.addEventListener("mousedown",o)}function Gt(t){t._idleHandler&&(document.removeEventListener("mousedown",t._idleHandler),t._idleHandler=null)}style.innerHTML=`
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
        
        background: ${COLORS.glassBg};
        backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
        border: 1px solid ${COLORS.glassBorder}; border-radius: 50px;
        box-shadow: 0 12px 32px rgba(0,0,0,0.25); z-index: 2147483647;
        
        opacity: 0; 
        min-width: 50px; 
        
        /* CORRE\xC7\xC3O AQUI: Visible para mostrar os tooltips laterais */
        overflow: visible; 

        /* ABRIR: Efeito "El\xE1stico" (Overshoot) */
        transition: 
            width 0.6s cubic-bezier(0.47, 1.64, 0.41, 0.8), 
            height 0.6s cubic-bezier(0.47, 1.64, 0.41, 0.8),
            padding 0.5s cubic-bezier(0.47, 1.64, 0.41, 0.8),
            border-radius 0.5s ease,
            opacity 0.3s ease,
            transform 0.6s cubic-bezier(0.47, 1.64, 0.41, 0.8);
    }
    .cw-pill.docked { opacity: 1; transform: translateX(0) scale(1); }

    /* --- ESTADO COLAPSADO --- */
    .cw-pill.collapsed {
        width: 50px !important; 
        height: 50px !important;
        padding: 0 !important;
        border-radius: 50% !important;
        gap: 0;
        cursor: pointer;
        
        /* CORRE\xC7\xC3O AQUI: Hidden para manter a bolinha perfeita */
        overflow: hidden !important;

        /* FECHAR: Efeito "Back-in" */
        transition: 
            width 0.5s cubic-bezier(0.36, 0, 0.66, -0.56),
            height 0.5s cubic-bezier(0.36, 0, 0.66, -0.56),
            padding 0.4s ease,
            border-radius 0.4s ease,
            opacity 0.3s ease,
            transform 0.5s cubic-bezier(0.36, 0, 0.66, -0.56) !important;
    }
    
    /* --- LOGO DA BOLINHA --- */
    .cw-main-logo {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        display: flex; align-items: center; justify-content: center;
        opacity: 0; pointer-events: none; 
        transform: scale(2) rotate(180deg);
        color: #fff;
        transition: all 0.3s ease;
    }
    .cw-main-logo svg { width: 24px; height: 24px; fill: currentColor; }
    
    .cw-pill.collapsed .cw-main-logo { 
        opacity: 1; 
        transform: scale(1) rotate(0deg);
        transition: all 0.5s cubic-bezier(0.47, 1.64, 0.41, 0.8) 0.2s;
    }

    /* --- CONTE\xDADO INTERNO --- */
    .cw-pill > *:not(.cw-main-logo) {
        opacity: 1;
        transform: scale(1);
        /* ABRIR: Itens pulam para fora */
        transition: 
            opacity 0.4s ease 0.2s, 
            transform 0.5s cubic-bezier(0.47, 1.64, 0.41, 0.8) 0.2s;
    }

    .cw-pill.collapsed > *:not(.cw-main-logo) {
        opacity: 0; 
        pointer-events: none; 
        /* FECHAR: Sugados para o centro */
        transform: scale(0); 
        transition: 
            opacity 0.25s ease 0s, 
            transform 0.3s cubic-bezier(0.36, 0, 0.66, -0.56) 0s;
    }

    /* --- BOT\xD5ES E TOOLTIPS --- */
    .cw-btn {
        width: 40px; height: 40px; 
        border-radius: 50%; border: none; background: transparent;
        display: flex; align-items: center; justify-content: center; 
        cursor: pointer; position: relative; color: ${COLORS.iconIdle};
        flex-shrink: 0;
    }
    .cw-btn:hover { background: ${COLORS.glassHighlight}; color: ${COLORS.iconActive}; transform: scale(1.1) !important; }

    /* Cores dos Bot\xF5es */
    .cw-btn.notes.active { color: ${COLORS.blue} !important; background: rgba(138, 180, 248, 0.15); }
    .cw-btn.email.active { color: ${COLORS.red} !important; background: rgba(242, 139, 130, 0.15); }
    .cw-btn.script.active { color: ${COLORS.purple} !important; background: rgba(197, 138, 249, 0.15); }
    .cw-btn.links.active { color: ${COLORS.green} !important; background: rgba(129, 201, 149, 0.15); }
    .cw-btn.broadcast.active { color: ${COLORS.orange} !important; background: rgba(249, 171, 0, 0.15); }
    .cw-btn.timezone.active { color: ${COLORS.teal} !important; background: rgba(0, 191, 165, 0.15); }

    .cw-btn.notes:hover { color: ${COLORS.blue}; filter: drop-shadow(0 0 5px rgba(138, 180, 248, 0.5)); }
    .cw-btn.email:hover { color: ${COLORS.red}; filter: drop-shadow(0 0 5px rgba(242, 139, 130, 0.5)); }
    .cw-btn.script:hover { color: ${COLORS.purple}; filter: drop-shadow(0 0 5px rgba(197, 138, 249, 0.5)); }
    .cw-btn.links:hover { color: ${COLORS.green}; filter: drop-shadow(0 0 5px rgba(129, 201, 149, 0.5)); }
    .cw-btn.broadcast:hover { color: ${COLORS.orange}; filter: drop-shadow(0 0 5px rgba(249, 171, 0, 0.5)); }
    .cw-btn.timezone:hover { color: ${COLORS.teal}; filter: drop-shadow(0 0 5px rgba(0, 191, 165, 0.5)); }

    /* LED Indicador */
    .cw-btn::before {
        content: ''; position: absolute; bottom: 2px; left: 50%; 
        width: 4px; height: 4px; border-radius: 50%;
        background-color: currentColor; box-shadow: 0 0 6px currentColor;
        transform: translateX(-50%) scale(0);
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); pointer-events: none;
    }
    .cw-btn.active::before { transform: translateX(-50%) scale(1); }
    
    .cw-btn svg { width: 22px; height: 22px; fill: currentColor; pointer-events: none; }

    /* TOOLTIP (O Nome do M\xF3dulo) */
    .cw-btn::after { 
        content: attr(data-label); position: absolute; top: 50%; transform: translateY(-50%) scale(0.9); 
        padding: 6px 12px; border-radius: 6px; 
        background: #202124; color: #fff; 
        font-family: 'Google Sans', sans-serif; font-size: 12px; font-weight: 500; 
        opacity: 0; pointer-events: none; 
        transition: all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1); 
        box-shadow: 0 4px 12px rgba(0,0,0,0.3); white-space: nowrap; 
        border: 1px solid rgba(255,255,255,0.15);
        z-index: 2147483648; /* Acima de tudo */
    }
    
    /* Posi\xE7\xE3o do Tooltip baseada no lado da tela */
    .cw-pill.side-right .cw-btn::after { right: 55px; transform-origin: right center; }
    .cw-pill.side-right .cw-btn:hover::after { opacity: 1; transform: translateY(-50%) scale(1); }
    
    .cw-pill.side-left .cw-btn::after { left: 55px; transform-origin: left center; }
    .cw-pill.side-left .cw-btn:hover::after { opacity: 1; transform: translateY(-50%) scale(1); }

    /* Outros Elementos */
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
        transition: opacity 0.3s ease 0.3s;
        margin: 4px 0;
    }
    .cw-sep.visible { opacity: 1; }
    .cw-pill.collapsed .cw-sep { opacity: 0; transition: opacity 0.1s ease 0s; }

    .cw-grip {
        width: 100%; height: 24px; display: flex; align-items: center; justify-content: center; 
        cursor: grab; margin-bottom: 2px; 
    }
    .cw-grip-bar { 
        width: 24px; height: 4px; background-color: ${COLORS.iconIdle}; border-radius: 4px; 
        opacity: 0.4; transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1); 
    }
    .cw-grip:hover .cw-grip-bar { opacity: 1; background-color: #FFFFFF; transform: scaleY(1.2); }
    .cw-grip:active { cursor: grabbing; }
    .cw-pill.dragging .cw-grip-bar { background-color: ${COLORS.blue}; width: 16px; opacity: 1; }

    @keyframes successPop {
        0% { box-shadow: 0 0 0 transparent; transform: scale(1); }
        50% { box-shadow: 0 0 15px #81C995; transform: scale(1.05); border-color: #81C995; }
        100% { box-shadow: 0 0 0 transparent; transform: scale(1); }
    }
    .cw-pill.system-check { animation: successPop 0.6s ease-out; }

    /* Processing Center Styles */
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
    .cw-center-dots span:nth-child(1) { background-color: ${COLORS.blue}; animation-delay: -0.32s; }
    .cw-center-dots span:nth-child(2) { background-color: ${COLORS.red}; animation-delay: -0.16s; }
    .cw-center-dots span:nth-child(3) { background-color: ${COLORS.green}; }
    .cw-center-text {
        font-size: 13px; color: #E8EAED; text-align: center; max-width: 90%;
        font-weight: 500; line-height: 1.4; opacity: 0; transform: translateY(10px);
        animation: textSlideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; animation-delay: 0.2s;
    }
    .cw-center-success { display: none; color: ${COLORS.green}; }
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
`;function go(t){let e=document.createElement("div");e.className="cw-step-scenarios";let o=document.createElement("div");Object.assign(o.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let a=document.createElement("div");Object.assign(a.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"40px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s ease"}),a.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>";let s=null;Object.entries(Oe).forEach(([n,r])=>{let u=document.createElement("div");u.textContent=n,Object.assign(u.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",display:"flex",alignItems:"center",gap:"6px"}),u.onmouseenter=()=>{s!==r&&(a.style.background="#fff",a.style.borderColor="#1a73e8",a.style.color="#202124",a.textContent=`"${r.substring(0,120)}${r.length>120?"...":""}"`),s!==r&&(u.style.background="#f1f3f4")},u.onmouseleave=()=>{s!==r&&(s||(a.style.background="#f8f9fa",a.style.borderColor="#dadce0",a.style.color="#5f6368",a.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>"),u.style.background="#ffffff")},u.onclick=()=>{U.playClick(),s===r?(s=null,i(),t("")):(s=r,i(),u.style.transform="scale(0.95)",setTimeout(()=>u.style.transform="scale(1)",150),t(r))},o.appendChild(u)});function i(){Array.from(o.children).forEach(n=>{Oe[n.textContent]===s?(n.style.background="#e8f0fe",n.style.borderColor="#1a73e8",n.style.color="#1967d2",n.style.fontWeight="500"):(n.style.background="#ffffff",n.style.borderColor="#dadce0",n.style.color="#3c4043",n.style.fontWeight="400")})}return e.appendChild(o),e.appendChild(a),e}var bo=t=>new Promise(e=>setTimeout(e,t));function vt(t){if(!t)return;let e={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(o=>t.dispatchEvent(new MouseEvent(o,e)))}function ct(t){let e=document.createElement("div");e.style.position="fixed",e.style.left="-9999px",e.innerHTML=t,document.body.appendChild(e);let o=document.createRange();o.selectNodeContents(e);let a=window.getSelection();a.removeAllRanges(),a.addRange(o);try{document.execCommand("copy")}catch{W("Falha ao copiar",{error:!0})}a.removeAllRanges(),document.body.removeChild(e)}function wt(t){["input","change","keydown","keyup"].forEach(o=>{let a=new Event(o,{bubbles:!0,cancelable:!0});t.dispatchEvent(a)})}function fo(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function At(){console.log("Iniciando processo de Nova Nota...");let t=fo(),e=t.length,a=Array.from(document.querySelectorAll("i.material-icons-extended")).find(n=>n.innerText.trim()==="description");if(a){let n=a.closest("material-fab")||a.closest("material-button");n?(n.style&&(n.style.display="block",n.style.visibility="visible"),vt(n)):vt(a)}else{let n=document.querySelector("material-fab-speed-dial");if(n){let r=n.querySelector(".trigger");r?(r.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),vt(r)):n.click(),await bo(800);let g=Array.from(document.querySelectorAll("i.material-icons-extended")).find(f=>f.innerText.trim()==="description");g&&vt(g)}}let s=null,i=0;for(;!s&&i<20;){await bo(300);let n=fo();if(n.length>e)s=n.find(r=>!t.includes(r)),s||(s=n[n.length-1]);else if(i>10){let r=n.filter(u=>u.offsetParent!==null);r.length>0&&(s=r[r.length-1])}i++}return s}var te={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},qe="cubic-bezier(0.25, 0.8, 0.25, 1)",$o={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${te.border}`,backgroundColor:te.bgInput,fontSize:"14px",color:te.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${qe}, box-shadow 0.2s ${qe}, background-color 0.2s`,outline:"none"},En={...$o,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},Tn={fontSize:"13px",fontWeight:"700",color:te.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},kn={display:"block",fontSize:"13px",fontWeight:"600",color:te.text,marginBottom:"8px",marginTop:"16px"},On={fontSize:"12px",color:te.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},In={fontSize:"12px",color:te.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},qn={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:te.text,cursor:"pointer",padding:"12px 14px",backgroundColor:te.surface,border:`1px solid ${te.border}`,borderRadius:"12px",transition:`all 0.2s ${qe}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},Bt={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:te.primary},Fn={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:te.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${qe}, box-shadow 0.2s ${qe}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},Rn={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${te.primary}`,color:te.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${qe}`},_n={background:"transparent",border:`1px solid ${te.border}`,borderRadius:"20px",color:te.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${qe}`,fontFamily:"'Google Sans', 'Roboto'"};var Mn={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:te.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},Ln={fontSize:"13px",fontWeight:"700",color:te.primary,minWidth:"20px",textAlign:"center"},Nn={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${te.border}`,backgroundColor:te.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${qe}, box-shadow 0.2s ${qe}`},Dn={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${te.bgInput}`},zn={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${te.border}`,backgroundColor:te.surface,color:te.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${qe}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},Gn={backgroundColor:te.primaryBg,color:te.primary,borderColor:te.primary,fontWeight:"600"},Bn={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:te.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},Pn={borderTop:`1px solid ${te.bgInput}`,paddingTop:"20px",marginTop:"16px"};var jn={maxHeight:"240px",overflowY:"auto",border:`1px solid ${te.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:te.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},Hn={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${te.bgInput}`,cursor:"pointer",fontSize:"13px",color:te.text,transition:"background 0.1s",userSelect:"none"};var Vo={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},Uo={fontSize:"12px",color:"#e37400",marginTop:"4px"},Wo={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},Yo={display:"flex",gap:"15px",marginBottom:"10px"};function ho(){let t=document.createElement("div");t.id="tag-support-container",Object.assign(t.style,Vo);let e=document.createElement("label");e.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(e.style,Lt,{marginTop:"0"});let o=document.createElement("div");Object.assign(o.style,Yo);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="Sim",Object.assign(a.style,Bt);let s=document.createElement("label");s.textContent="Sim";let i=document.createElement("div");Object.assign(i.style,{display:"flex",alignItems:"center"}),i.appendChild(a),i.appendChild(s);let n=document.createElement("input");n.type="radio",n.name="ts_usage_mod",n.value="N\xE3o",n.checked=!0,Object.assign(n.style,Bt);let r=document.createElement("label");r.textContent="N\xE3o";let u=document.createElement("div");Object.assign(u.style,{display:"flex",alignItems:"center"}),u.appendChild(n),u.appendChild(r),o.appendChild(i),o.appendChild(u);let g=document.createElement("div");g.style.display="block";let f=document.createElement("label");f.textContent="Qual foi o Motivo?",Object.assign(f.style,Lt,{fontSize:"12px"});let p=document.createElement("input");p.type="text",Object.assign(p.style,Wo);let h=document.createElement("div");h.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(h.style,Uo),g.appendChild(f),g.appendChild(p),g.appendChild(h),t.appendChild(e),t.appendChild(o),t.appendChild(g),a.onchange=()=>{g.style.display="none"},n.onchange=()=>{g.style.display="block"};function A(R,M){if(t.style.display="none",!R||R.includes("Education")||!M||M.length===0)return;let H=M.some(q=>q.includes("enhanced")||q==="ec_google_ads"),ie=M.some(q=>(q.includes("conversion")||q.includes("ads"))&&!q.includes("enhanced")),ne=M.some(q=>q.includes("ga4")||q.includes("analytics")||q.includes("ua")),k=M.some(q=>q.includes("merchant")||q.includes("gmc")||q.includes("shopping"));(H||ie&&!ne&&!k)&&(t.style.display="block")}function y(){if(t.style.display==="none")return"";let R=`<br><b>Utilizou Tag Support?</b> ${a.checked?"Sim":"N\xE3o"}`;return n.checked&&p.value.trim()!==""&&(R+=`<br><b>Motivo:</b> ${p.value}`),R+="<br>",R}function T(){t.style.display="none",n.checked=!0,a.checked=!1,g.style.display="block",p.value=""}return{element:t,updateVisibility:A,getOutput:y,reset:T}}var X={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},We={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function xo(t){let e={},o="implementation";function a(k){let S=k.toLowerCase();return S.includes("ads")||S.includes("conversion")||S.includes("remarketing")?X.brands.ads:S.includes("ga4")||S.includes("analytics")?X.brands.ga4:S.includes("gtm")||S.includes("tag manager")||S.includes("container")?X.brands.gtm:S.includes("merchant")||S.includes("shopping")||S.includes("feed")?X.brands.gmc:X.brands.default}let s=Object.entries(De).filter(([k,S])=>S.popular),i={};Object.entries(De).forEach(([k,S])=>{if(S.popular)return;let q=a(S.name);i[q.label]||(i[q.label]={brand:q,tasks:[]}),i[q.label].tasks.push({key:k,...S})});let n="cw-zen-tasks";if(!document.getElementById(n)){let k=document.createElement("style");k.id=n,k.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column; height: 100%; width: calc(100% + 32px); margin: -16px;
                font-family: ${X.font}; background: ${X.bg}; position: relative; overflow: hidden;
            }
            
            /* SCROLL AREA */
            .cw-zen-content { flex: 1; overflow-y: auto; padding-bottom: 80px; } /* Espa\xE7o para o Status Bar */

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${X.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${X.white}; 
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
                font-size: 12px; font-weight: 500; color: ${X.textMain}; line-height: 1.2; 
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
                color: ${X.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${X.border}; border-radius: 10px; background: ${X.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${X.blue}; box-shadow: 0 0 0 3px ${X.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${X.border}; border-radius: 10px; background: ${X.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${X.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${X.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${X.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${X.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${X.blueLight}; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${X.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${X.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${X.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${X.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${X.border};
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${X.shadowFloat}; z-index: 10;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${X.textMain}; }
            
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
                font-family: ${X.font}; font-size: 15px; font-weight: 600; color: ${X.textMain};
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
                border-color: ${X.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${X.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${X.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${X.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 10px; font-weight: 700; color: ${X.textSub};
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
        `,document.head.appendChild(k)}let r=document.createElement("div");r.className="cw-zen-container";let u=document.createElement("div");Object.assign(u.style,{display:"none"});let g=document.createElement("div");g.className="cw-screens-container",u.appendChild(g),r.innerHTML=`
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
    `;let f=r.querySelector(".cw-hero-grid"),p=r.querySelector(".cw-acc-container"),h=r.querySelector(".cw-results-container"),A=r.querySelector(".cw-search-input"),y=r.querySelector(".cw-status-bar"),T=r.querySelector(".cw-status-text"),R=r.querySelector(".cw-footer-icons");s.forEach(([k,S])=>{let q=a(S.name),D=document.createElement("div");D.className="cw-hero-card",D.id=`hero-${k}`,D.style.setProperty("--hero-color",q.color),D.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${We[q.icon]}</div>
                <div class="cw-hero-label">${S.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,D.onclick=L=>{if(L.target.closest(".cw-step-btn"))return;let C=e[k]?e[k].count:0;H(k,C>0?-C:1,S)},D.querySelector(".minus").onclick=()=>H(k,-1,S),D.querySelector(".plus").onclick=()=>H(k,1,S),D.dataset.color=q.color,f.appendChild(D)});function M(k,S){let q=a(S.name),D=document.createElement("div");return D.className="cw-task-item",D.dataset.id=k,D.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${q.bg}; color:${q.color}">
                    ${We[q.icon]||We.default}
                </div>
                <div class="cw-task-label">${S.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,D.onclick=L=>{if(L.target.closest(".cw-step-btn"))return;let C=e[k]?e[k].count:0;H(k,C>0?-C:1,S)},D.querySelector(".minus").onclick=()=>H(k,-1,S),D.querySelector(".plus").onclick=()=>H(k,1,S),D}Object.entries(i).forEach(([k,S])=>{let q=document.createElement("div");q.className="cw-acc-group";let D=document.createElement("div");D.className="cw-acc-header",D.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${S.brand.color}"></div>
                ${k}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,D.onclick=()=>{p.querySelectorAll(".cw-acc-group.open").forEach(C=>{C!==q&&C.classList.remove("open")}),q.classList.toggle("open")};let L=document.createElement("div");L.className="cw-acc-body",S.tasks.forEach(C=>{let G=M(C.key,C);L.appendChild(G)}),q.appendChild(D),q.appendChild(L),p.appendChild(q)});function H(k,S,q){e[k]||(e[k]={count:0,data:q,brand:a(q.name)}),e[k].count+=S,e[k].count<=0&&delete e[k],ie(),ne(),t&&t()}function ie(){s.forEach(([L])=>{let C=f.querySelector(`#hero-${L}`);if(!C)return;let G=e[L];G?(C.classList.add("active"),C.querySelector(".cw-step-val").textContent=G.count,C.querySelector(".cw-step-val").style.color=C.dataset.color):C.classList.remove("active")}),r.querySelectorAll(".cw-task-item").forEach(L=>{let C=L.dataset.id,G=e[C];G?(L.classList.add("selected"),L.querySelector(".cw-step-val").textContent=G.count):L.classList.remove("selected")});let S=Object.keys(e),q=0,D=[];if(S.forEach(L=>{let C=e[L];q+=C.count;for(let G=0;G<C.count;G++)D.length<6&&D.push(C.brand)}),q>0){y.classList.add("visible");let L=q>1?"A\xE7\xF5es":"A\xE7\xE3o",C=q>1?"definidas":"definida";T.textContent=`${q} ${L} ${C}`,R.innerHTML="",D.forEach(G=>{let m=document.createElement("div");m.className="cw-mini-icon",m.innerHTML=We[G.icon]||We.default;let b=m.querySelector("svg");b&&(b.style.width="14px",b.style.height="14px"),R.appendChild(m)})}else y.classList.remove("visible")}A.addEventListener("input",k=>{let S=k.target.value.toLowerCase();if(S.length>0){p.style.display="none",h.style.display="block",h.innerHTML="";let q=!1;Object.entries(De).forEach(([D,L])=>{if(L.name.toLowerCase().includes(S)){q=!0;let C=M(D,L);e[D]&&(C.classList.add("selected"),C.querySelector(".cw-step-val").textContent=e[D].count),h.appendChild(C)}}),q||(h.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else p.style.display="block",h.style.display="none"});function ne(){g.innerHTML="";let k=Object.keys(e),S=!1,q=document.getElementById("sub-status"),D="implementation";if(q&&q.value.toLowerCase().includes("education")&&(D="education"),k.length===0){g.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}if(k.length===0){g.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}let L=document.createElement("div");L.className="cw-info-banner",L.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Todos os Screenshots s\xE3o baseados na descri\xE7\xE3o do 
                <a href="https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/" target="_blank" class="cw-info-link">Win Criteria</a>.
            </span>
        `,g.appendChild(L),k.forEach(C=>{let G=e[C].data,m=e[C].count,b=e[C].brand,E=G.screenshots?G.screenshots[D]||[]:["Link da Evid\xEAncia"];if(E.length>0){S=!0;for(let l=1;l<=m;l++){let c=document.createElement("div");c.className="cw-screen-card",c.style.setProperty("--brand-color",b.color),c.style.setProperty("--brand-bg",b.bg),c.style.setProperty("--brand-shadow",b.color+"40");let x=document.createElement("div");x.className="cw-card-header";let d=document.createElement("div");d.className="cw-card-icon",d.innerHTML=We[b.icon]||We.default;let v=document.createElement("div");v.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let O=document.createElement("input");O.className="cw-card-title-input",O.id=`name-${C}-${l}`,O.value=`${G.name}${m>1?" #"+l:""}`,O.title="Clique para renomear esta task";let B=document.createElement("span");B.className="cw-edit-hint",B.innerHTML="\u270E Renomear",v.appendChild(O),v.appendChild(B),x.appendChild(d),x.appendChild(v),c.appendChild(x),E.forEach((_,I)=>{let P=document.createElement("div");P.className="cw-input-group";let $=document.createElement("label");$.className="cw-input-label",$.textContent=_.replace(/📷|:|•/g,"").trim();let F=document.createElement("input");F.className="cw-input-field",F.id=`screen-${C}-${l}-${I}`,F.placeholder="Cole o link aqui...",F.setAttribute("autocomplete","off"),F.addEventListener("input",()=>{F.value.trim().length>5?F.classList.add("filled"):F.classList.remove("filled")});let z=document.createElement("div");z.className="cw-input-check",z.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',P.appendChild($),P.appendChild(F),P.appendChild(z),c.appendChild(P)}),g.appendChild(c)}}}),u.style.display=S?"block":"none"}return{selectionElement:r,screenshotsElement:u,updateSubStatus:()=>ne(),getCheckedElements:()=>Object.keys(e).map(k=>({value:k,closest:()=>({querySelector:()=>({textContent:e[k].count})})})),toggleTask:(k,S=!0)=>{let q=e[k];S&&!q?H(k,1,De[k]):!S&&q&&H(k,-q.count,De[k])},setMode:k=>{o=k,ne()},reset:()=>{for(let k in e)delete e[k];A.value="",p.style.display="block",h.style.display="none",ie(),ne()}}}function yo(t){let e=document.createElement("div");e.style.cssText="display: flex; flex-direction: column; height: 100%; width: 100%; background: #F8F9FA; overflow: hidden; position: relative;";let o=document.createElement("div");o.style.cssText="flex: 1; overflow-y: auto; padding: 20px 24px 80px 24px; min-height: 0;";let a={sectionTitle:`
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
        `};function s(b,E,l="text",c=""){let x=document.createElement("div");x.style.cssText=a.inputWrapper;let d=document.createElement("label");d.style.cssText=a.label,d.textContent=E;let v;l==="textarea"?(v=document.createElement("textarea"),v.style.cssText=a.input+a.textarea):(v=document.createElement("input"),v.type=l,v.style.cssText=a.input);let O=v.style.cssText;return v.onfocus=()=>v.style.cssText=O+a.inputFocus,v.onblur=()=>v.style.cssText=O,v.id=`st-${b}`,v.placeholder=c,x.appendChild(d),x.appendChild(v),{wrapper:x,input:v}}function i(b,E){let l=document.createElement("div"),c=document.createElement("label");c.style.cssText=a.label,c.textContent=E,l.appendChild(c);let x=document.createElement("div");return x.style.cssText=a.radioGroup,["Yes","No"].forEach(d=>{let v=document.createElement("label");v.style.cssText=a.radioLabel;let O=document.createElement("input");O.type="radio",O.name=`st-${b}`,O.value=d==="Yes"?"Y":"N",O.style.display="none",d==="No"&&(O.checked=!0),v.onmousedown=()=>v.style.transform="scale(0.96)",v.onmouseup=()=>v.style.transform="scale(1)",v.onmouseleave=()=>v.style.transform="scale(1)",v.appendChild(O),v.appendChild(document.createTextNode(d)),O.addEventListener("change",()=>{x.querySelectorAll("label").forEach(B=>B.style.cssText=a.radioLabel),O.checked&&(v.style.cssText=a.radioLabel+a.radioActive)}),d==="No"&&(v.style.cssText=a.radioLabel+a.radioActive),x.appendChild(v)}),l.appendChild(x),{wrapper:l}}let n=document.createElement("div");n.style.cssText=a.banner,n.innerHTML=`
        <span style="font-size: 18px;">\u26A0\uFE0F</span>
        <div>
            <div style="font-weight:700; margin-bottom:4px;">Processo Cr\xEDtico</div>
            Antes de transferir, verifique o <a href="https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o" target="_blank" style="color:#B06000; text-decoration:underline;">SOP de Out of Scope</a> e consulte um <a href="http://go/webao-help-deluxe" target="_blank" style="color:#B06000; text-decoration:underline;">SME</a>.
        </div>
    `,o.appendChild(n);let r=document.createElement("button");r.style.cssText=a.magicBtn,r.innerHTML='<span style="font-size:16px">\u2728</span> Preencher Automaticamente',r.onmouseover=()=>r.style.backgroundColor="#F8F9FA",r.onmouseout=()=>r.style.backgroundColor="#FFFFFF",r.onmousedown=()=>r.style.transform="scale(0.98)",r.onmouseup=()=>r.style.transform="scale(1)",o.appendChild(r);let u=document.createElement("div");u.style.cssText=a.sectionTitle,u.style.marginTop="24px",u.innerHTML="<span>\u{1F6E0}\uFE0F</span> Dados T\xE9cnicos",o.appendChild(u);let g=s("cid","Ads CID","text","000-000-0000"),f=s("ga4","GA4 ID"),p=s("gtm","GTM ID"),h=i("access","Advertiser has access to GA4/GTM?"),A=s("access-email","If Yes, User Email"),y=i("ghost","Ghosting Access Available?");o.append(g.wrapper,f.wrapper,p.wrapper,h.wrapper,A.wrapper,y.wrapper);let T=document.createElement("div");T.style.cssText=a.sectionTitle,T.innerHTML="<span>\u{1F4DE}</span> Contato & Problema",o.appendChild(T);let R=s("name","Name of Advertiser"),M=s("url","Website Address"),H=s("phone","Phone Number"),ie=s("email","Email Address"),ne=s("callback","Preferred Call Back Time (w/ Timezone)"),k=s("desc","Detailed Issue Description","textarea","Descreva o problema t\xE9cnico em detalhes..."),S=s("checks","Checks Performed by Tech Team","textarea","Liste o troubleshooting j\xE1 realizado..."),q=s("screens","Uncropped Screenshots (Links)","textarea","https://...");o.append(R.wrapper,M.wrapper,H.wrapper,ie.wrapper,ne.wrapper,k.wrapper,S.wrapper,q.wrapper);let D=document.createElement("div");D.style.cssText=a.sectionTitle,D.innerHTML="<span>\u{1F4E7}</span> Contatos para C\xF3pia (CC)",o.appendChild(D);let L=s("c-adv","Advertiser Contact"),C=s("c-am","Account Manager");o.append(L.wrapper,C.wrapper);let G=document.createElement("div");G.style.cssText="padding: 16px 24px; background: rgba(255,255,255,0.9); backdrop-filter: blur(8px); border-top: 1px solid #E0E0E0; display: flex; justify-content: flex-end; position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box; z-index: 100;";let m=document.createElement("button");return m.textContent="Gerar Nota S&T",m.style.cssText="padding: 10px 24px; background: #1a73e8; color: #fff; border: none; border-radius: 24px; font-size: 14px; font-weight: 600; cursor: pointer; box-shadow: 0 2px 6px rgba(26, 115, 232, 0.3); transition: transform 0.1s, box-shadow 0.2s;",m.onmousedown=()=>{m.style.transform="scale(0.96)",m.style.boxShadow="0 1px 3px rgba(26, 115, 232, 0.2)"},m.onmouseup=()=>{m.style.transform="scale(1)",m.style.boxShadow="0 2px 6px rgba(26, 115, 232, 0.3)"},G.appendChild(m),e.appendChild(o),e.appendChild(G),r.onclick=async()=>{r.innerHTML='<span style="font-size:16px">\u23F3</span> Buscando...';let b=await at();b.advertiserName&&(R.input.value=b.advertiserName),b.websiteUrl&&(M.input.value=b.websiteUrl),b.clientEmail&&(ie.input.value=b.clientEmail,L.input.value=b.clientEmail);let l=document.body.innerText.match(/\d{3}-\d{3}-\d{4}/);l&&(g.input.value=l[0]),r.innerHTML='<span style="font-size:16px; color:#188038">\u2705</span> Dados Preenchidos!',r.style.background="#E6F4EA",r.style.borderColor="#188038",setTimeout(()=>{r.innerHTML='<span style="font-size:16px">\u2728</span> Preencher Automaticamente',r.style.background="#FFFFFF",r.style.borderColor="#DADCE0"},2e3),W("Dados capturados com sucesso!")},m.onclick=async()=>{let b=d=>{let v=e.querySelector(`#st-${d}`);return v?v.value:""},E=d=>{let v=e.querySelector(`input[name="st-${d}"]:checked`);return v?v.value:"N"},c=`Split & Transfer : Phone Note Format [Mandatory]

<b>Advertiser\u2019s info:</b>
<b>Ads CID:</b> ${b("cid")}
<b>GA4 ID:</b> ${b("ga4")}
<b>GTM ID:</b> ${b("gtm")}
<b>Advertiser has access to either GA4 or GTM (Y/N):</b> ${E("access")}
<b>If Yes, user access email to GA4/GTM:</b> ${b("access-email")}
<b>Ghosting Access Available (Y/N):</b> ${E("ghost")}
<b>Name of the advertiser:</b> ${b("name")}
<b>Website Address:</b> ${b("url")}
<b>Advertiser\u2019s preferred mode of communication:</b> Phone
<b>Advertiser/Web Master\u2019s Phone Number:</b> ${b("phone")}
<b>Preferred Call Back time with time zone and contact number:</b> ${b("callback")}
<b>Advertiser/Web Master\u2019s Email Address:</b> ${b("email")}

<b>Detailed Issue Description:</b>
${b("desc")}

<b>Name of the conversion action or event in the question:</b> N/A
<b>Date range:</b> N/A
<b>Uncropped screenshots of the issue:</b>
${b("screens")}

<b>Test conversion details (if any):</b> N/A

<b>Checks performed by Technical Solutions Team (Detailed Info + Screenshot doc):</b>
${b("checks")}

[IMP] Contacts to be copied on all communication about this case
<b>Advertiser contact -</b> ${b("c-adv")}
<b>Account Manager -</b> ${b("c-am")}
<b>Additional Contact -</b> N/A

<b>Additional Comments:</b> (Optional)`.replace(/\n/g,"<br>");ct(c);let x=await At();x?(x.innerText.trim()===""&&(x.innerHTML=""),document.execCommand("insertHTML",!1,c),wt(x),W("Nota S&T inserida!")):W("Copiado! Abra uma nota para colar.")},e}function wo(){let t="v3.7.0 (S&T Mode)",e="bau",o="pt",a=!1,s=!1,i=!1,n={input:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},textarea:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease",height:"100px",resize:"vertical"},h3:{fontSize:"14px",fontWeight:"600",color:"#202124",margin:"0 0 12px 0"},label:{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},checkboxLabel:{display:"flex",alignItems:"center",marginBottom:"10px",fontSize:"14px",fontWeight:"400",cursor:"pointer",padding:"8px",background:"#f8f9fa",borderRadius:"6px",transition:"background-color 0.2s ease, box-shadow 0.2s ease",userSelect:"none"},checkboxInput:{width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"},buttonBase:{flex:"1 1 0",padding:"10px 0",color:"#fff",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"500",cursor:"pointer",marginTop:"16px"},stepBlock:{borderTop:"1px solid #eee",paddingTop:"12px",marginTop:"12px"},radioContainer:{display:"flex",gap:"15px",marginBottom:"10px"},optionalBtn:{width:"100%",padding:"10px",background:"white",border:"1px dashed #1a73e8",color:"#1a73e8",borderRadius:"6px",cursor:"pointer",fontWeight:"500",fontSize:"13px",marginBottom:"10px",transition:"all 0.2s"},helpLink:{fontSize:"12px",color:"#1a73e8",textDecoration:"none",cursor:"pointer",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"color 0.2s"}},r=ho(),u=xo(()=>{let V=u.getCheckedElements().map(N=>N.value);d&&d.value&&r.updateVisibility(d.value,V)}),g=document.createElement("div");g.id="autofill-popup",g.classList.add("cw-module-window"),Object.assign(g.style,Ae,{right:"100px",width:"450px",transition:"width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)"});let f={popup:g,googleLine:null},p=Ce(g,"Case Notes",t,"Gera notas padronizadas.",f,()=>Ft());g.appendChild(p);let h=p.lastElementChild;if(h){let w=document.createElement("div");w.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line></svg>',Object.assign(w.style,{width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease",marginLeft:"4px"}),w.title="Alternar para Split & Transfer",w.onmouseenter=()=>{w.style.background="rgba(255,255,255,0.1)",w.style.color="#FFF"},w.onmouseleave=()=>{i||(w.style.background="transparent",w.style.color="#9AA0A6")},w.onclick=V=>{V.stopPropagation(),R(w)},h.insertBefore(w,h.firstChild)}let A=document.createElement("div");Object.assign(A.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1"}),g.appendChild(A);let y=document.createElement("div");Object.assign(y.style,{flexGrow:"1",display:"none",overflow:"hidden"});let T=yo(()=>R());y.appendChild(T),g.appendChild(y);function R(w){i=!i,i?(A.style.display="none",y.style.display="flex",f.googleLine&&(f.googleLine.style.background="linear-gradient(to right, #8e24aa, #7b1fa2)"),w&&(w.style.color="#C58AF9",w.style.background="rgba(197, 138, 249, 0.15)")):(A.style.display="block",y.style.display="none",f.googleLine&&(f.googleLine.style.background="linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)"),w&&(w.style.color="#9AA0A6",w.style.background="transparent"))}let M=document.createElement("div");M.textContent="created by lucaste@",Object.assign(M.style,ao),g.appendChild(M);let H=document.createElement("div");H.id="step-lang-type";let ie=document.createElement("label");Object.assign(ie.style,n.label),H.appendChild(ie);let ne=document.createElement("div");Object.assign(ne.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let k=document.createElement("div");k.textContent="Portugu\xEAs",k.classList.add("no-drag"),Object.assign(k.style,xe);let S=document.createElement("div");S.textContent="Espa\xF1ol",S.classList.add("no-drag"),Object.assign(S.style,xe),k.onclick=()=>kt("pt"),S.onclick=()=>kt("es"),ne.appendChild(k),ne.appendChild(S),H.appendChild(ne),A.appendChild(H);let q=document.createElement("div");q.id="step-0-case-type";let D=document.createElement("label");Object.assign(D.style,n.label),q.appendChild(D);let L=document.createElement("div");Object.assign(L.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let C=document.createElement("div");C.textContent="BAU",C.classList.add("no-drag"),Object.assign(C.style,xe);let G=document.createElement("div");G.textContent="LM",G.classList.add("no-drag"),Object.assign(G.style,xe),C.onclick=()=>Tt("bau"),G.onclick=()=>Tt("lm"),L.appendChild(C),L.appendChild(G),q.appendChild(L),A.appendChild(q);let m=document.createElement("div");m.id="step-1-selection";let b=document.createElement("label");b.className="cw-input-label",b.textContent="Status Principal";let E=document.createElement("select");E.id="main-status",E.className="cw-select",E.innerHTML=`
      <option value="" disabled selected hidden>Selecione uma op\xE7\xE3o...</option>
      <option value="NI">NI - Need Info</option>
      <option value="SO">SO - Solution Offered</option>
      <option value="IN">IN - Inactive</option>
      <option value="AS">AS - Assigned</option>
      <option value="DC">DC - Discard</option>
  `;let l=document.createElement("div");l.style.cssText="display: flex; justify-content: space-between; align-items: baseline; margin-top: 16px; margin-bottom: 6px;";let c=document.createElement("label");c.className="cw-input-label",c.textContent="Sub-status",c.style.marginBottom="0";let x=document.createElement("a");x.href="https://seu-link-do-guia-aqui.com",x.target="_blank",x.className="cw-info-link",x.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px; transform:translateY(1px)"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>Guia de Substatus',Object.assign(x.style,n.helpLink),l.appendChild(c),l.appendChild(x);let d=document.createElement("select");d.id="sub-status",d.className="cw-select",d.disabled=!0,d.innerHTML='<option value="" disabled selected hidden>Aguardando status principal...</option>',m.appendChild(b),m.appendChild(E),m.appendChild(l),m.appendChild(d),A.appendChild(m);let v=document.createElement("div");v.id="step-1-1-portugal",Object.assign(v.style,n.stepBlock,{display:"none"});let O=document.createElement("label");Object.assign(O.style,n.label),v.appendChild(O);let B=document.createElement("div");Object.assign(B.style,n.radioContainer);let _=document.createElement("div");Object.assign(_.style,{display:"flex",alignItems:"center"});let I=document.createElement("input");I.type="radio",I.name="portugal-group",I.value="sim",Object.assign(I.style,n.checkboxInput);let P=document.createElement("label");P.htmlFor="portugal-sim",Object.assign(P.style,{cursor:"pointer"}),_.appendChild(I),_.appendChild(P);let $=document.createElement("div");Object.assign($.style,{display:"flex",alignItems:"center"});let F=document.createElement("input");F.type="radio",F.name="portugal-group",F.value="nao",F.checked=!0,Object.assign(F.style,n.checkboxInput);let z=document.createElement("label");z.htmlFor="portugal-nao",Object.assign(z.style,{cursor:"pointer"}),$.appendChild(F),$.appendChild(z),B.appendChild(_),B.appendChild($),v.appendChild(B),A.appendChild(v);function K(w){a=w,w?J.style.display="block":J.style.display="none"}I.onchange=()=>K(!0),F.onchange=()=>K(!1);let J=document.createElement("div");J.id="step-1-2-consent",Object.assign(J.style,n.stepBlock,{display:"none"});let se=document.createElement("label");Object.assign(se.style,n.label),J.appendChild(se);let le=document.createElement("div");Object.assign(le.style,n.radioContainer);let pe=document.createElement("div");Object.assign(pe.style,{display:"flex",alignItems:"center"});let ve=document.createElement("input");ve.type="radio",ve.name="consent-group",ve.value="Sim",ve.checked=!0,Object.assign(ve.style,n.checkboxInput);let Fe=document.createElement("label");Fe.htmlFor="consent-sim",Object.assign(Fe.style,{cursor:"pointer"}),pe.appendChild(ve),pe.appendChild(Fe);let et=document.createElement("div");Object.assign(et.style,{display:"flex",alignItems:"center"});let Le=document.createElement("input");Le.type="radio",Le.name="consent-group",Le.value="N\xE3o",Object.assign(Le.style,n.checkboxInput);let pt=document.createElement("label");pt.htmlFor="consent-nao",Object.assign(pt.style,{cursor:"pointer"}),et.appendChild(Le),et.appendChild(pt),le.appendChild(pe),le.appendChild(et),J.appendChild(le),A.appendChild(J);let Ge=document.createElement("div");Ge.id="step-1-5-snippets",Object.assign(Ge.style,n.stepBlock,{display:"none"});let ut=document.createElement("h3");Object.assign(ut.style,n.h3),ut.textContent="Cen\xE1rios Comuns";let ke=go(w=>{let V=document.querySelector("textarea");V&&(V.value=w,V.dispatchEvent(new Event("input")),V.style.transition="background-color 0.2s",V.style.backgroundColor="#e8f0fe",setTimeout(()=>V.style.backgroundColor="#fff",300))});ke.id="snippet-container",Ge.appendChild(ut),Ge.appendChild(ke),A.appendChild(Ge);let we=document.createElement("div");we.id="step-3-form",Object.assign(we.style,n.stepBlock,{display:"none"});let Et=document.createElement("h3");Object.assign(Et.style,n.h3),we.appendChild(Et);let Ne=document.createElement("div");Ne.id="dynamic-form-fields-container",we.appendChild(Ne);let fe=document.createElement("button");fe.textContent="+ Gostaria de selecionar uma task?",Object.assign(fe.style,n.optionalBtn),fe.onmouseover=()=>fe.style.background="#e8f0fe",fe.onmouseout=()=>fe.style.background="white",fe.onclick=()=>{fe.style.display="none",Be.style.display="block",u.selectionElement.style.display="block"};let Be=document.createElement("h3");Object.assign(Be.style,n.h3,{marginTop:"20px"});let Vt=u.selectionElement;Object.assign(Vt.style,{marginBottom:"20px"}),we.appendChild(fe),we.appendChild(Be),we.appendChild(Vt),we.appendChild(r.element),we.appendChild(u.screenshotsElement),A.appendChild(we);let Pe=document.createElement("div");Pe.id="step-4-email",Object.assign(Pe.style,{display:"none",marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #eee"});let je=document.createElement("label");je.style.display="flex",je.style.alignItems="center",je.style.cursor="pointer",je.style.fontSize="14px";let He=document.createElement("input");He.type="checkbox",He.checked=!0,Object.assign(He.style,n.checkboxInput),je.appendChild(He),je.appendChild(document.createTextNode("Preencher email automaticamente?")),Pe.appendChild(je),A.appendChild(Pe);let Ke=document.createElement("div");Object.assign(Ke.style,{display:"none",gap:"8px",padding:"0"}),A.appendChild(Ke);let tt=document.createElement("button");Object.assign(tt.style,n.buttonBase,{backgroundColor:"#5f6368"}),tt.textContent="Copiar";let ot=document.createElement("button");Object.assign(ot.style,n.buttonBase,{backgroundColor:"#1a73e8"}),ot.textContent="Preencher",Ke.appendChild(tt),Ke.appendChild(ot);let nt=document.createElement("div");Object.assign(nt.style,Qe),nt.className="no-drag",nt.title="Redimensionar",g.appendChild(nt),Ze(g,nt),document.body.appendChild(g);function Tt(w){e=w;let V=it();Object.assign(C.style,xe),Object.assign(G.style,xe),w==="bau"?(Object.assign(C.style,V),x.href="https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657"):(Object.assign(G.style,V),x.href="https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243"),d.value&&d.dispatchEvent(new Event("change"))}function ee(w){try{if(Me&&Me[o]&&Me[o][w])return Me[o][w];if(Me&&Me.pt&&Me.pt[w])return Me.pt[w]}catch{}return w}function No(){ie.textContent=ee("idioma"),D.textContent=ee("fluxo"),b.textContent=ee("status_principal"),c.textContent=ee("substatus"),ut.textContent=ee("cenarios_comuns"),Be.textContent=ee("selecione_tasks"),Et.textContent=ee("preencha_detalhes"),tt.textContent=ee("copiar"),ot.textContent=ee("preencher"),E.querySelector('option[value=""]')&&(E.querySelector('option[value=""]').textContent=ee("select_status")),d.querySelector('option[value=""]')&&(d.querySelector('option[value=""]').textContent=ee("select_substatus")),O.textContent=ee("caso_portugal"),P.textContent=ee("sim"),z.textContent=ee("nao"),se.textContent=ee("consentiu_gravacao"),Fe.textContent=ee("sim"),pt.textContent=ee("nao"),Ne.querySelectorAll("label").forEach(w=>{let V=w.nextElementSibling.id.replace("field-",""),N=ee(V.toLowerCase());N!==V.toLowerCase()?w.textContent=N:w.textContent=V.replace(/_/g," ").replace(/\b\w/g,Q=>Q.toUpperCase())+":"}),fe.textContent="+ "+(o==="pt"?"Gostaria de selecionar uma task?":"Quisiera seleccionar una tarea?")}function kt(w){o=w;let V=it();Object.assign(k.style,xe),Object.assign(S.style,xe),w==="pt"?(Object.assign(k.style,V),v.style.display="block",K(a)):(Object.assign(S.style,V),v.style.display="none",J.style.display="none"),No(),d.value&&d.dispatchEvent(new Event("change"))}function Ot(w){(w.value.trim()===""||w.value.trim()==="\u2022")&&(w.value="\u2022 "),w.onkeydown=function(V){if(V.key==="Enter"){V.preventDefault();let N=this.selectionStart,Q=this.selectionEnd,ce=this.value,me=ce.lastIndexOf(`
`,N-1)+1,Te=ce.substring(me,N),ge=Te.trim()==="\u2022"||Te.trim()===""?`
`:`
\u2022 `;this.value=ce.substring(0,N)+ge+ce.substring(Q),this.selectionStart=this.selectionEnd=N+ge.length}else if(V.key==="Backspace"){let N=this.selectionStart;if(N===this.selectionEnd&&N>0){let Q=this.value.substring(0,N);Q.endsWith(`
\u2022 `)?(V.preventDefault(),this.value=Q.substring(0,N-3)+this.value.substring(this.selectionEnd),this.selectionStart=this.selectionEnd=N-3):Q==="\u2022 "&&(V.preventDefault(),this.value="",this.selectionStart=this.selectionEnd=0)}}}}function It(){let w=typeof ke<"u"?ke:document.getElementById("snippet-container");if(!w)return;let V=w.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'),N={},Q=new Set;V.forEach(re=>{let ae=re.id,Y=Oe[ae];if(Y)for(let j in Y)j==="linkedTask"?Q.add(Y.linkedTask):j!=="type"&&(N[j]||(N[j]=[]),N[j].includes(Y[j])||N[j].push(Y[j]))});let ce=new Set;Object.values(Oe).forEach(re=>{Object.keys(re).forEach(ae=>{ae!=="linkedTask"&&ae!=="type"&&ce.add(ae)})}),ce.forEach(re=>{let ae=document.getElementById(re);if(ae){let Y=N[re]||[],j="";lt.includes(re.replace("field-",""))?(j=Y.map(oe=>oe.startsWith("\u2022 ")?oe:"\u2022 "+oe).join(`
`),j===""?j="\u2022 ":j.endsWith(`
\u2022 `)||(j+=`
\u2022 `)):j=Y.join(`

`),j.trim()!=="\u2022"&&j.trim()!==""?ae.value=j:lt.includes(re.replace("field-",""))?ae.value="\u2022 ":ae.value="",ae.tagName==="TEXTAREA"&&typeof Ot=="function"&&Ot(ae)}});let me=new Set,Te=new Set;w.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(re=>{let ae=Oe[re.id];ae&&ae.linkedTask&&(re.checked?me.add(ae.linkedTask):Te.add(ae.linkedTask))}),Te.forEach(re=>{me.has(re)||u.toggleTask(re,!1)}),me.forEach(re=>{u.toggleTask(re,!0)})}E.onchange=()=>{let w=E.value;if(qt(1.5),d.innerHTML=`<option value="">${ee("select_substatus")}</option>`,!w){d.disabled=!0;return}for(let V in rt){let N=rt[V];if(N.status===w){let Q=document.createElement("option");Q.value=V,Q.textContent=N.name,d.appendChild(Q)}}d.disabled=!1},d.onchange=()=>{let w=d.value;if(qt(1.5),!w)return;u.updateSubStatus(w);let V=rt[w];ke.innerHTML="";let N=(Y,j,oe)=>{let ue=document.createElement("label");Object.assign(ue.style,n.checkboxLabel),ue.onmouseover=()=>ue.style.backgroundColor="#e8eaed",ue.onmouseout=()=>ue.style.backgroundColor="#f8f9fa";let de=document.createElement("input");return de.type=j,de.id=Y.id,Object.assign(de.style,n.checkboxInput),ue.appendChild(de),ue.appendChild(document.createTextNode(` ${Y.text}`)),oe.appendChild(ue),de},Q=[],ce="radio";if(w==="NI_Awaiting_Inputs")Q=[{id:"quickfill-ni-inicio-manual",text:"In\xEDcio 2/6 (Manual)"},{id:"quickfill-ni-cms-access",text:"In\xEDcio 2/6 (ADV sem acesso ao CMS)"},{id:"quickfill-ni-followup-bau",text:"Follow-up 2/6 (BAU)"},{id:"quickfill-ni-followup-lm",text:"Follow-up 2/6 (LM)"}];else if(w.startsWith("SO_"))ce="checkbox",Q=[{id:"quickfill-gtm-install",text:"Instala\xE7\xE3o do GTM"},{id:"quickfill-whatsapp",text:"Convers\xE3o de WhatsApp"},{id:"quickfill-form",text:"Convers\xE3o de Formul\xE1rio (Padr\xE3o)"},{id:"quickfill-ecw4-close",text:"Fechamento ECW4 (P\xF3s 7 dias)"},{id:"quickfill-ga4-event-close",text:"Fechamento GA4 (P\xF3s 2 dias)"}];else if(w.startsWith("AS_")){ce="checkbox";let Y=document.createElement("label");Y.textContent=ee("cenarios_comuns"),Object.assign(Y.style,n.label),ke.appendChild(Y),Q=[{id:"quickfill-as-no-show",text:"Anunciante n\xE3o compareceu (respondeu e-mail)"},{id:"quickfill-as-insufficient-time",text:"Tempo insuficiente"},{id:"quickfill-as-no-access",text:"Anunciante sem acessos necess\xE1rios"}]}else w.startsWith("IN_")?Q=[{id:"quickfill-in-nrp-bau",text:"NRP (BAU - 3 tentativas)"},{id:"quickfill-in-nrp-lm",text:"NRP (LM - Sem tentativas)"},{id:"quickfill-in-no-show-bau",text:"No-Show (BAU - 3 tentativas)"},{id:"quickfill-in-2-6-final",text:"Finaliza\xE7\xE3o 2/6 (Sem Resposta)"},{id:"quickfill-in-manual",text:"Outro (Manual)"}]:w.startsWith("DC_")?(ce="radio",Q=[{id:"quickfill-dc-lm-no-access",text:"LM - Sem acessos (Reagendar em BAU)"}]):w==="NI_Attempted_Contact"?(ce="radio",Q=[{id:"quickfill-ni-attempted-2day",text:"2 Day Rule (2 Liga\xE7\xF5es + Chat AM)"}]):w==="NI_Awaiting_Validation"&&(ce="checkbox",Q=[{id:"quickfill-ni-awaiting-ecw4",text:"ECW4 (Acompanhar)"},{id:"quickfill-ni-awaiting-ga4",text:"GA4 Event Tracking (Acompanhar)"}]);let me=Q.filter(Y=>{let j=Oe[Y.id];return!j.type||j.type==="all"||j.type===e});me.forEach((Y,j)=>{let oe=N(Y,ce,ke);ce==="radio"&&(oe.name="scenario-radio-group",j===0&&(oe.checked=!0))}),me.length>0&&(Ge.style.display="block"),V.requiresTasks?(fe.style.display="none",Be.style.display="block",u.selectionElement.style.display="block"):(fe.style.display="block",Be.style.display="none",u.selectionElement.style.display="none"),Ne.innerHTML="";let Te=V.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(Te)].forEach(Y=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(Y))return;let j=Y.slice(1,-1),oe=document.createElement("label"),ue=ee(j.toLowerCase());if(oe.textContent=ue!==j.toLowerCase()?ue:j.replace(/_/g," ").replace(/\b\w/g,Z=>Z.toUpperCase())+":",Object.assign(oe.style,n.label),j==="SPEAKEASY_ID"){let Z=document.createElement("button");Z.innerHTML='<span style="font-size:12px; margin-right:4px;">\u2728</span>Auto Busca',Z.style.cssText=`
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
          `,Z.title="Localizar Speakeasy ID no hist\xF3rico",Z.onmouseover=()=>{Z.style.backgroundColor="#c2e7ff",Z.style.boxShadow="0 1px 2px rgba(0,0,0,0.1)"},Z.onmouseout=()=>{Z.style.backgroundColor="#d3e3fd",Z.style.boxShadow="none"},Z.onmousedown=()=>{Z.style.backgroundColor="#a8c7fa",Z.style.transform="scale(0.96)"},Z.onmouseup=()=>Z.style.transform="scale(1)",Z.onclick=he=>{he.preventDefault(),lo(`field-${j}`)},oe.appendChild(Z)}let de;lt.includes(j)?(de=document.createElement("textarea"),Object.assign(de.style,n.textarea),de.classList.add("bullet-textarea"),Ot(de)):Dt.includes(j)?(de=document.createElement("textarea"),Object.assign(de.style,n.textarea)):(de=document.createElement("input"),de.type="text",Object.assign(de.style,n.input),j==="REASON_COMMENTS"&&(w.startsWith("NI_")||w.startsWith("IN_"))&&(Object.assign(oe.style,{display:"none"}),Object.assign(de.style,{display:"none"}))),j==="ON_CALL"&&e==="lm"&&(Object.assign(oe.style,{display:"none"}),Object.assign(de.style,{display:"none"}),de.value="N/A"),de.id=`field-${j}`,Ne.appendChild(oe),Ne.appendChild(de)});let re=ke.querySelectorAll('input[type="checkbox"], input[type="radio"]');re.length>0&&(re.forEach(Y=>{Y.removeEventListener("change",It),Y.addEventListener("change",It)}),It()),we.style.display="block",Ue[w]?Pe.style.display="block":Pe.style.display="none",Ke.style.display="flex";let ae=u.getCheckedElements().map(Y=>Y.value);r.updateVisibility(w,ae)},fe.onclick=()=>{fe.style.display="none",Be.style.display="block",u.selectionElement.style.display="block"};function Ut(){let w=d.value;if(!w)return null;let N=rt[w].template.replace(/\n/g,"<br>"),Q='style="margin-bottom: 12px; padding-left: 30px;"',ce=[],me="",Te=u.getCheckedElements();Te.length>0&&Te.forEach(ae=>{let Y=ae.value,j=De[Y],oe=ae.closest().querySelector(".stepper-count"),ue=oe?parseInt(oe.textContent):1;ue>1?ce.push(`${j.name} (x${ue})`):ce.push(j.name)});let ge=u.screenshotsElement;if(ge){let ae=Array.from(ge.querySelectorAll('input[id^="name-"]'));ae.length>0&&ae.forEach(Y=>{let j=Y.value,oe=Y.closest(".cw-screen-card");if(oe){let ue=oe.querySelectorAll('input[id^="screen-"]'),de=!1,Z="";ue.forEach(he=>{let Wt=he.closest(".cw-input-group"),Yt=Wt?Wt.querySelector(".cw-input-label"):null,Do=Yt?Yt.textContent:"Evid\xEAncia",Xt=he.value.trim(),zo=Xt?` ${Xt}`:"";Z+=`<li>${Do} -${zo}</li>`,de=!0}),de&&(me+=`<b>${j}</b>`,me+=`<ul ${Q}>${Z}</ul>`)}})}if(N.includes("{TAGS_IMPLEMENTED}")?N=N.replace(/{TAGS_IMPLEMENTED}/g,ce.join(", ")||"N/A"):ce.length>0&&(N+=`<br><b>Tags:</b> ${ce.join(", ")}<br>`),N.includes("{SCREENSHOTS_LIST}")?N=N.replace(/{SCREENSHOTS_LIST}/g,me?`${me}`:"N/A"):me!==""&&(N+=`<br>${me}`),o==="pt"&&a){let ae=ve.checked?ee("sim"):ee("nao");N=N.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${ee("consentiu_gravacao")}</b> ${ae}<br><br>`),N=N.replace(/{CASO_PORTUGAL}/g,`<br><b>${ee("caso_portugal")}</b> ${ee("sim")}<br>`)}else o==="pt"&&!a?(N=N.replace(/{CASO_PORTUGAL}/g,`<br><b>${ee("caso_portugal")}</b> ${ee("nao")}<br>`),N=N.replace(/{CONSENTIU_GRAVACAO}/g,"")):(N=N.replace(/{CASO_PORTUGAL}/g,""),N=N.replace(/{CONSENTIU_GRAVACAO}/g,""));return Ne.querySelectorAll("input, textarea").forEach(ae=>{let Y=ae.id.replace("field-",""),j=new RegExp(`{${Y}}`,"g"),oe=ae.value;if(Y==="REASON_COMMENTS"&&(w.startsWith("NI_")||w.startsWith("IN_"))){let Z=ke.querySelector('input[type="radio"]:checked');Z&&Oe[Z.id]&&(oe=Oe[Z.id]["field-REASON_COMMENTS"])}if(lt.includes(Y)&&oe.trim()!==""){let Z=oe.split(`
`).map(he=>he.trim()).filter(he=>he!==""&&he!=="\u2022").map(he=>he.startsWith("\u2022 ")?he.substring(2):he).map(he=>`<li>${he}</li>`).join("");oe=Z?`<ul ${Q}>${Z}</ul>`:""}else Dt.includes(Y)?oe=oe.split(`
`).filter(Z=>Z.trim()!=="").map(Z=>`<p style="margin: 0 0 8px 0;">${Z}</p>`).join(""):ae.tagName==="TEXTAREA"&&(oe=oe.replace(/\n/g,"<br>"));let ue=oe.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(ue===""||ue==="\u2022"||ue.toLowerCase()==="n/a"){let Z=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${Y}\\}(?:<br>\\s*)?`,"gi");Z.test(N)?N=N.replace(Z,""):N=N.replace(j,"")}else N=N.replace(j,oe.replace(/\$/g,"$$$$"))}),N=N.replace(/{([A-Z0-9_]+)}/g,""),N=N.replace(/(<br>){3,}/g,"<br><br>"),typeof r<"u"&&r.getOutput&&(N+=r.getOutput()),N}tt.onclick=()=>{let w=Ut();w?(ct(w),W(ee("copiado_sucesso"))):W(ee("selecione_substatus"),{error:!0})},ot.onclick=async()=>{let w=d.value,V=Ut();if(!V){W(ee("selecione_substatus"),{error:!0});return}ct(V),Ft();let N=(void 0)(),Q=await At();if(Q)try{if(Q.focus(),Q.innerHTML.trim()==="<p><br></p>"||Q.innerHTML.trim()==="<br>"||Q.innerText.trim()===""){let ge=document.createRange();ge.selectNodeContents(Q);let re=window.getSelection();re.removeAllRanges(),re.addRange(ge),document.execCommand("delete",!1,null)}else if(!Q.innerHTML.endsWith("<br><br>")){let ge=document.createRange();ge.selectNodeContents(Q),ge.collapse(!1);let re=window.getSelection();re.removeAllRanges(),re.addRange(ge),document.execCommand("insertHTML",!1,"<br><br>")}document.execCommand("insertHTML",!1,V),wt(Q),setTimeout(()=>{W(ee("inserido_copiado"))},600);let me=typeof He<"u"&&He?He.checked:!0;if(w&&Ue[w]&&me){let ge=Ue[w];await yt(ge),await new Promise(re=>setTimeout(re,500))}N(),qt(1.5),E.value="",d.innerHTML=`<option value="">${ee("select_substatus")}</option>`,d.disabled=!0}catch(ce){console.error(ce),W("Erro ao inserir.",{error:!0}),N()}};function qt(w=1.5){w<=1.5&&(Ge.style.display="none",ke.innerHTML=""),w<=2&&(u.reset(),fe.style.display="none"),w<=3&&(we.style.display="none",Ne.innerHTML="",r.reset(),Ke.style.display="none",Pe.style.display="none")}function Ft(){if(s=!s,s){let w=g.querySelector(".cw-expand-btn");w&&typeof w.resetState=="function"&&w.resetState()}Se(s,g,"cw-btn-notes")}return Tt("bau"),kt("pt"),Ft}var Ye={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function Co(){let t="v4.2.0 CR-Hybrid",e="CANNED_RESPONSES",o=Object.keys(Ye)[0],a="",s="list",i=!1,n={bgApp:"#F8F9FA",bgSurface:"#FFFFFF",borderSubtle:"rgba(0, 0, 0, 0.08)",borderFocus:"rgba(26, 115, 232, 0.4)",textPrimary:"#202124",textSecondary:"#5F6368",primary:"#1A73E8",primaryBg:"#E8F0FE",shadowCard:"0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",shadowHover:"0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",transition:"all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1)"},r={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:n.bgApp},u={display:"flex",width:"200%",height:"100%",transition:"transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",transform:"translateX(0)",willChange:"transform"},g={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},f={padding:"20px 24px 12px 24px",flexShrink:"0",background:n.bgApp,zIndex:"10",display:"flex",flexDirection:"column",gap:"16px",borderBottom:`1px solid ${n.borderSubtle}`},p={width:"100%",height:"44px",padding:"0 16px 0 48px",borderRadius:"12px",border:"1px solid transparent",background:"#FFFFFF",fontSize:"14px",fontWeight:"400",color:n.textPrimary,boxSizing:"border-box",outline:"none",transition:n.transition,boxShadow:"0 2px 5px rgba(0,0,0,0.03)",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="%239AA0A6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"16px center"},h={display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"8px",paddingBottom:"4px"},A={padding:"6px 14px",borderRadius:"100px",border:"1px solid #DADCE0",background:"#FFFFFF",color:n.textSecondary,fontSize:"13px",fontWeight:"500",letterSpacing:"0.3px",cursor:"pointer",transition:n.transition,flexShrink:"0",display:"flex",alignItems:"center",justifyContent:"center"},y={background:n.primaryBg,color:n.primary,borderColor:"transparent",fontWeight:"600",boxShadow:"0 1px 2px rgba(26, 115, 232, 0.15)"},T={padding:"16px 24px 80px 24px",overflowY:"auto",flexGrow:"1",display:"flex",flexDirection:"column",gap:"12px"},R={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 16px",height:"72px",minHeight:"72px",borderRadius:"16px",background:n.bgSurface,border:"1px solid transparent",boxShadow:n.shadowCard,cursor:"pointer",transition:"all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)",position:"relative",overflow:"hidden"},M=document.createElement("div");M.id="quick-email-popup",M.classList.add("cw-module-window"),Object.assign(M.style,Ae,{right:"100px",width:"440px",height:"640px",borderRadius:"20px",boxShadow:"0 24px 64px rgba(0,0,0,0.2)",border:"1px solid rgba(255,255,255,0.4)"});let H={popup:M,googleLine:null,focusElement:null};function ie(){i=!i,Se(i,M,"cw-btn-email"),i||setTimeout(()=>c(),300)}let ne=Ce(M,"Quick Email",t,"Templates & Automa\xE7\xF5es",H,()=>ie()),k=document.createElement("div");Object.assign(k.style,r);let S=document.createElement("div");Object.assign(S.style,u);let q=document.createElement("div");Object.assign(q.style,g);let D=document.createElement("div");Object.assign(D.style,f);let L=document.createElement("input");L.placeholder="Pesquisar templates...",Object.assign(L.style,p),L.onfocus=()=>{L.style.borderColor=n.primary,L.style.boxShadow="0 0 0 4px rgba(26, 115, 232, 0.15)",L.style.background="#fff"},L.onblur=()=>{L.style.borderColor="transparent",L.style.boxShadow="0 2px 5px rgba(0,0,0,0.03)",L.style.background="#fff"},H.focusElement=L;let C=document.createElement("div");Object.assign(C.style,h);let G=document.createElement("div");Object.assign(G.style,T),D.appendChild(L),D.appendChild(C),q.appendChild(D),q.appendChild(G);let m=document.createElement("div");Object.assign(m.style,g);let b=document.createElement("div");Object.assign(b.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),m.appendChild(b),S.appendChild(q),S.appendChild(m),k.appendChild(S),M.appendChild(ne),M.appendChild(k),document.body.appendChild(M);async function E(O,B){try{i&&ie();let _=(void 0)();await new Promise(I=>setTimeout(I,800)),B==="email"?await po(O):B==="cr"&&await yt(O),_()}catch(_){console.error("\u274C Erro:",_);let I=document.querySelector(".cw-focus-backdrop");I&&I.classList.remove("active")}}function l(O){s="detail",S.style.transform="translateX(-50%)";let B='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',_='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';b.innerHTML=`
            <style>
                .cw-email-content p { margin: 0 0 8px 0; } /* Margem apenas embaixo */
                .cw-email-content ul { margin: 0 0 8px 16px; padding: 0; }
                .cw-email-content li { margin-bottom: 4px; }
            </style>

            <div style="position:sticky; top:0; background:rgba(255,255,255,0.9); backdrop-filter:blur(12px); border-bottom:1px solid #eee; padding:16px 24px; z-index:10; display:flex; align-items:center; gap:12px;">
                <button id="csa-back-btn" style="background:none; border:none; cursor:pointer; display:flex; color:#5f6368; padding:8px; margin-left:-12px; border-radius:50%; transition:background 0.2s;">${B}</button>
                <div style="font-weight:600; font-size:16px; color:#202124; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${O.name}</div>
            </div>
            
            <div style="padding:24px;">
                <div style="margin-bottom:24px;">
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Assunto</div>
                    <div style="font-size:14px; font-weight:500; color:#202124; padding:16px; background:#F8F9FA; border-radius:12px; border:1px solid #eee; box-shadow:inset 0 1px 2px rgba(0,0,0,0.02);">${O.subject}</div>
                </div>
                
                <div>
                    <div style="font-size:11px; font-weight:700; color:#5f6368; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Mensagem</div>
                    
                    <div class="cw-email-content" style="font-size:13px; color:#3c4043; line-height:1.5; white-space: normal; word-break: break-word; padding:0 4px;">
                        ${O.body}
                    </div>
                </div>
            </div>
            
            <div style="position:sticky; bottom:0; padding:24px; background:linear-gradient(to top, #fff 90%, rgba(255,255,255,0)); pointer-events:none;">
                <button id="csa-insert-btn" style="pointer-events:auto; width:100%; padding:14px; background:#1a73e8; color:white; border:none; border-radius:12px; font-size:14px; font-weight:600; cursor:pointer; display:flex; justify-content:center; align-items:center; gap:10px; box-shadow:0 4px 12px rgba(26,115,232,0.3); transition:transform 0.2s, box-shadow 0.2s;">
                    ${_} Usar Template
                </button>
            </div>
        `;let I=b.querySelector("#csa-back-btn");I.onmouseenter=()=>I.style.background="#f1f3f4",I.onmouseleave=()=>I.style.background="none",I.onclick=c;let P=b.querySelector("#csa-insert-btn");P.onmouseenter=()=>{P.style.transform="translateY(-1px)",P.style.boxShadow="0 6px 16px rgba(26,115,232,0.4)"},P.onmouseleave=()=>{P.style.transform="translateY(0)",P.style.boxShadow="0 4px 12px rgba(26,115,232,0.3)"},P.onclick=()=>{P.style.transform="scale(0.96)",E(O,"email"),setTimeout(()=>{P.style.transform="scale(1)",c()},300)}}function c(){s="list",S.style.transform="translateX(0)"}function x(O,B,_=null){let I=document.createElement("button"),P=_?`<span style="margin-right:6px; font-size:14px; opacity:0.9;">${_}</span>`:"";return I.innerHTML=`${P}${O}`,Object.assign(I.style,A),o===B&&a===""?Object.assign(I.style,y):(I.onmouseenter=()=>{I.style.background="#F1F3F4",I.style.borderColor="#DADCE0"},I.onmouseleave=()=>{I.style.background="#FFFFFF",I.style.borderColor="#DADCE0"}),I.onclick=()=>{o=B,a="",L.value="",d(),v()},I}function d(){C.innerHTML="",C.appendChild(x("Smart CRs",e,"\u26A1")),Object.keys(Ye).forEach(O=>{C.appendChild(x(Ye[O].title,O))})}function v(){G.innerHTML="";let O=[];if(a.trim()!==""){let $=a.toLowerCase();Object.values(Ye).forEach(F=>{F.emails.forEach(z=>{(z.name.toLowerCase().includes($)||z.subject.toLowerCase().includes($))&&O.push({type:"email",data:z})})}),Object.entries(Ue).forEach(([F,z])=>{if(!z)return;(F.replace(/_/g," ").toLowerCase().includes($)||z.toLowerCase().includes($))&&O.push({type:"cr",key:F,code:z})})}else o===e?Object.entries(Ue).forEach(([$,F])=>{F&&O.push({type:"cr",key:$,code:F})}):Ye[o]&&Ye[o].emails.forEach($=>{O.push({type:"email",data:$})});if(O.length===0){G.innerHTML=`
                <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 20px; color:#9AA0A6;">
                    <div style="font-size:32px; margin-bottom:12px; opacity:0.5;">\u{1F50D}</div>
                    <div style="font-size:14px; font-weight:500;">Nenhum template encontrado</div>
                    <div style="font-size:12px; margin-top:4px;">Tente outro termo de busca</div>
                </div>`;return}let _='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1967D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',I='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EA8600" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',P='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BDC1C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>';O.forEach($=>{let F=document.createElement("div");if(Object.assign(F.style,R),$.type==="email"){let z=$.data,K=z.subject.length>45?z.subject.substring(0,45)+"...":z.subject;F.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#E8F0FE; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${_}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${z.name}</div>
                        <div style="font-size:12px; color:#5F6368; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${K}</div>
                    </div>
                    <div style="margin-left:12px; opacity:0.6;">${P}</div>
                `,F.onclick=()=>l(z)}else{let z=$.key.replace(/_/g," ").replace("AS ","AS - ").replace("NI ","NI - ");F.innerHTML=`
                    <div style="width:40px; height:40px; border-radius:10px; background:#FEF7E0; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-right:16px;">${I}</div>
                    <div style="flex-grow:1; min-width:0; display:flex; flex-direction:column; gap:2px;">
                        <div style="font-size:14px; font-weight:600; color:#202124; margin-bottom:0; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${z}</div>
                        <div style="font-size:11px; font-weight:500; color:#EA8600; font-family:'Roboto Mono', monospace; letter-spacing:-0.2px;">${$.code}</div>
                    </div>
                    <div style="font-size:10px; font-weight:700; color:#DADCE0; text-transform:uppercase; letter-spacing:0.5px; border:1px solid #F1F3F4; padding:4px 8px; border-radius:6px; margin-left:12px;">Inserir</div>
                `,F.onclick=()=>{F.style.transform="scale(0.98)",F.style.background="#FEF7E0",setTimeout(()=>{F.style.transform="scale(1)",F.style.background="#fff",E($.code,"cr")},150)}}F.onmouseenter=()=>{F.style.transform="translateY(-2px)",F.style.boxShadow=n.shadowHover,$.type==="cr"?F.style.borderLeft="3px solid #Fbbc04":F.style.borderLeft="3px solid #1a73e8"},F.onmouseleave=()=>{F.style.transform="translateY(0)",F.style.boxShadow=n.shadowCard,F.style.borderLeft="1px solid transparent"},G.appendChild(F)})}return L.addEventListener("input",O=>{a=O.target.value,a!==""?Array.from(C.children).forEach(B=>{Object.assign(B.style,A),B.style.opacity="0.6"}):d(),v()}),d(),v(),ie}var So={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function Eo(){let t="v2.1 (Apple Motion)",e={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#f8f9fa",scrollBehavior:"smooth"},card:{background:"#ffffff",border:"1px solid #dadce0",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"13px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"10px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.15s ease, opacity 0.3s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.5",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"20px",height:"20px",borderRadius:"6px",border:"2px solid #dadce0",marginRight:"14px",marginTop:"1px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #eee",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"}},o={},a="PT",s="BAU",i=!1,n=document.createElement("div");n.id="call-script-popup",n.classList.add("cw-module-window"),Object.assign(n.style,Ae,{right:"auto",left:"50%",width:"400px",height:"650px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)"});let r={popup:n,googleLine:null};function u(){i=!i,Se(i,n,"cw-btn-script")}let g=Ce(n,"Call Script",t,"Guia interativo para condu\xE7\xE3o de chamadas.",r,()=>{u()});n.appendChild(g);let f=document.createElement("div");Object.assign(f.style,e.progressBarContainer);let p=document.createElement("div");Object.assign(p.style,e.progressBarFill),f.appendChild(p),n.appendChild(f);let h=document.createElement("div");h.id="csa-content",Object.assign(h.style,e.contentArea),n.appendChild(h);let A=document.createElement("div");Object.assign(A.style,e.footer);let y=document.createElement("span");y.textContent="by lucaste@",Object.assign(y.style,{fontSize:"10px",color:"#bdc1c6"});let T=document.createElement("button");T.innerHTML=`
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
    Resetar Script
  `,Object.assign(T.style,e.resetBtn),T.onmouseenter=()=>T.style.background="#fce8e6",T.onmouseleave=()=>T.style.background="transparent",T.onclick=()=>{T.style.transform="scale(0.9)",setTimeout(()=>T.style.transform="scale(1)",150);for(let m in o)delete o[m];D()},A.appendChild(y),A.appendChild(T),n.appendChild(A);let R=document.createElement("div");Object.assign(R.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let M=document.createElement("div");Object.assign(M.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let H=document.createElement("div");H.textContent="BAU";let ie=document.createElement("div");ie.textContent="LT",Object.assign(H.style,xe),Object.assign(ie.style,xe),M.appendChild(H),M.appendChild(ie);let ne=document.createElement("select");Object.assign(ne.style,ft,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),ne.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',ne.value=a,R.appendChild(M),R.appendChild(ne),h.appendChild(R);let k=document.createElement("div");k.id="csa-checklist-area",h.appendChild(k);let S=document.createElement("div");Object.assign(S.style,Qe),S.className="no-drag",S.title="Redimensionar",n.appendChild(S),Ze(n,S),document.body.appendChild(n);function q(m){return m}function D(){k.innerHTML="";let m=`${a} ${s}`,b=So[m];if(!b){k.innerHTML=`<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <div style="font-size: 24px;">\u2615</div>
        <div>Script n\xE3o configurado.</div>
      </div>`,p.style.width="0%";return}let E=b.color||"#1a73e8",l=0,c=0;["inicio","fim"].forEach(x=>{b[x]&&(l+=b[x].length)}),["inicio","fim"].forEach((x,d)=>{let v=b[x];if(!v||v.length===0)return;let O=document.createElement("div");Object.assign(O.style,e.card);let B=document.createElement("div");Object.assign(B.style,e.cardTitle);let _=x==="inicio"?"Abertura":"Fechamento";a.includes("ES")&&(_=x==="inicio"?"Apertura":"Cierre"),a.includes("EN")&&(_=x==="inicio"?"Opening":"Closing"),B.textContent=_;let I=document.createElement("span");I.style.fontSize="11px",I.style.opacity="0.7",I.style.fontWeight="500",I.style.background="#f1f3f4",I.style.padding="2px 8px",I.style.borderRadius="10px",B.appendChild(I),O.appendChild(B);let P=0;v.forEach(($,F)=>{let z=`${m}-${x}-${F}`,K=!!o[z];K&&(c++,P++);let J=document.createElement("div");Object.assign(J.style,e.itemRow);let se=document.createElement("div");Object.assign(se.style,e.checkbox);let le=document.createElement("span");le.innerHTML=$,le.style.flex="1",K?(Object.assign(J.style,e.itemCompleted),se.style.background=E,se.style.borderColor=E,se.style.transform="scale(1)",se.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(J.style.textDecoration="none",J.style.opacity="1",se.style.background="transparent",se.style.borderColor="#dadce0",se.style.transform="scale(1)",se.innerHTML=""),J.onclick=()=>{let pe=!o[z];o[z]=pe,U.playClick(),pe?(se.style.transform="scale(1.2)",setTimeout(()=>se.style.transform="scale(1)",150),Object.assign(J.style,e.itemCompleted),se.style.background=E,se.style.borderColor=E,se.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(J.style.textDecoration="none",J.style.opacity="1",se.style.background="transparent",se.style.borderColor="#dadce0",se.innerHTML=""),L(m,b)},J.onmouseenter=()=>{o[z]||(J.style.background="#f1f3f4",se.style.borderColor=E)},J.onmouseleave=()=>{o[z]||(J.style.background="transparent",se.style.borderColor="#dadce0")},J.appendChild(se),J.appendChild(le),O.appendChild(J)}),P===v.length&&v.length>0&&(I.style.color="#1e8e3e",I.style.background="#e6f4ea",O.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),I.textContent=`${P}/${v.length}`,k.appendChild(O)}),C(l,c)}function L(m,b){let E=0,l=0;["inicio","fim"].forEach(c=>{let x=b[c]||[];E+=x.length;let d=0;x.forEach((v,O)=>{o[`${m}-${c}-${O}`]&&(l++,d++)})}),C(E,l),setTimeout(()=>D(),200)}function C(m,b){let E=m===0?0:b/m*100;p.style.width=`${E}%`,E===100?p.style.background="#34A853":p.style.background="linear-gradient(90deg, #4285F4, #34A853)"}function G(m){s=m;let b=it();Object.assign(H.style,xe),Object.assign(ie.style,xe),Object.assign(m==="BAU"?H.style:ie.style,b),D()}return H.onclick=()=>G("BAU"),ie.onclick=()=>G("LT"),ne.addEventListener("change",m=>{a=m.target.value,D()}),G(s),u}var dt={tasks:{label:"Tarefas",links:[{name:"Web Clock Punch",url:"https://compass.talent.cognizant.com/psp/HCMPRD/EMPLOYEE/HRMS/h/?tab=DEFAULT",desc:"Ponto Eletr\xF4nico"},{name:"Web\xE3o Help Deluxe",url:"http://go/webao-help-deluxe",desc:"Ferramenta de ajuda"},{name:"Moma Home",url:"https://moma.corp.google.com/",desc:"Intranet Google"},{name:"Plx DataSites",url:"https://data.corp.google.com/sites/7kpryuwxw9jw/agents_follow_ups_report/",desc:"Relat\xF3rio Follow-ups"},{name:"Escala & Ader\xEAncia",url:"https://lookerstudio.google.com/c/u/0/reporting/f8966844-b70e-4070-9b7f-a29028401bf4/page/p_0tayxfleid",desc:"Dashboard WFM"},{name:"Performance Indiv.",url:"https://dashboards.corp.google.com/_a981e311_424f_410b_925f_9b019ee186ce",desc:"Tech Solutions SAO"},{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form Grava\xE7\xE3o"},{name:"Escala\xE7\xE3o Sellers",url:"https://forms.gle/HWMhML56eE4CPZCs5",desc:"Form Escala\xE7\xE3o"},{name:"[SOP] Split",url:"https://sites.google.com/corp/google.com/technicalsolutions/case-handling_1/out-of-scope?authuser=0#h.obb5iieru15o",desc:"Instru\xE7\xF5es Split"}]},ads:{label:"Ads",links:[{name:"SPA (Tag Support)",url:"https://tagsupport.corp.google.com/create-session",desc:"Single Page App"},{name:"[SOP] Conv. Tracking",url:"https://docs.google.com/document/d/1By5Jv40kGeGWFUzMXT9xuNAeUl_s1clYybZO1nhNnAI/edit",desc:"Procedimento Padr\xE3o"},{name:"Win Criteria: Code",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit",desc:"Valida\xE7\xE3o C\xF3digo"},{name:"[SOP] Call Conv.",url:"https://docs.google.com/document/d/1es_tvx8nhMkWn-Hh9n3Jd3vzo91RpY6PuwMBlsTd-kA/edit",desc:"Convers\xE3o Chamada"},{name:"Win Criteria: WCC",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A10:A15",desc:"Valida\xE7\xE3o WCC"},{name:"[SOP] Enhanced Conv.",url:"https://docs.google.com/document/d/1R59-cUeBaX-5dOxAXxvzsRXgkVdFPzTzOCSBQWt42H0/edit",desc:"ECW4"},{name:"Ads EC Dashboard",url:"https://dashboards.corp.google.com/edit/_0ded1099_6ef3_4bc9_bba0_2445840d1b69",desc:"Monitoramento EC"},{name:"[SOP] Troubleshooting",url:"https://docs.google.com/document/d/10M0FAkMFmlhgHQJtAQPNtLRGh-BpPzR_6z1s6xYOQEk/edit",desc:"Resolu\xE7\xE3o problemas"},{name:"[SOP] Remarketing",url:"https://docs.google.com/document/d/1awOuj4rFBrukfByYuvcCFOAGbZX7H1j_EelPeCaUcoU/edit",desc:"Implementa\xE7\xE3o RMKT"},{name:"[SOP] Lead Scoring",url:"https://docs.google.com/document/d/1jyFVLvKnk1K2ojyj-K37PXcmQdU9A8wiHWj-w49yOBg/edit",desc:"Pontua\xE7\xE3o Leads"},{name:"[SOP] GTM Install",url:"https://docs.google.com/document/d/1Uj-fkPNxygeL-YQIVgLfIPo579SKF1oe78i5nHx5eLs/edit",desc:"Instala\xE7\xE3o Container"}]},analytics:{label:"GA4",links:[{name:"[SOP] GA4 Setup",url:"https://docs.google.com/document/d/1cLDh6RIo-lxfv-pffvBwhFpI-fSTOaAsMXwwsID1yNk/edit",desc:"Instala\xE7\xE3o Config."},{name:"Win Criteria: GA4",url:"https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/edit?resourcekey=0-GiUc9KwVTDkVaUxwlyNCtA#gid=971616043&range=A45:A51",desc:"Valida\xE7\xE3o GA4"},{name:"GA4 E-commerce",url:"https://developers.google.com/analytics/devguides/collection/ga4/ecommerce?hl=pt-br",desc:"Guia Dev"},{name:"[SOP] Troubleshoot GA4",url:"https://docs.google.com/document/d/14fxyQMlcT57ILtsaBdYBFZs2DDZeSbXsvniXfo_eJaU/edit",desc:"Resolu\xE7\xE3o Problemas"},{name:"[SOP] Cross Domain",url:"https://support.google.com/ads-help/answer/12282402",desc:"Dom\xEDnio Cruzado"},{name:"Eventos Recomendados",url:"https://developers.google.com/analytics/devguides/collection/ga4/reference/events",desc:"Lista Oficial"},{name:"UTM Builder",url:"https://ga-dev-tools.google/ga4/campaign-url-builder/",desc:"Criador URLs"}]},shopping:{label:"Shop",links:[{name:"[SOP] Onboarding MC",url:"https://docs.google.com/document/d/1yJGEssn9Uvxa3eWjp2Y5MQSkL26AElh6sSAKgD6qmjg/edit",desc:"Setup Inicial"},{name:"[SOP] Feed Opt",url:"https://docs.google.com/document/d/1VBYH6b3r0uyjXHN749pDK7IajF5Ii0-rm6M-BZuaJGY/edit",desc:"Otimiza\xE7\xE3o Feed"},{name:"ShopTroubleshooting",url:"http://go/shoptroubleshooting",desc:"Ferramenta Interna"},{name:"[SOP] Product Reviews",url:"https://docs.google.com/document/d/1v2xH6QLgWc5_-C85Pmj40GSe5lxstRXnjd8vEW92TBk/edit",desc:"Avalia\xE7\xF5es"},{name:"[SOP] Offline Feed",url:"https://docs.google.com/document/d/1Q3cJxf4ucfA_bu6vDId63Tj1P8ZofgE7CqnK9KUgLuU/edit",desc:"Feeds Offline"},{name:"Especifica\xE7\xE3o Dados",url:"https://support.google.com/merchants/answer/7052112",desc:"Help Center"}]},tech:{label:"Tech",links:[{name:"Solu\xE7\xF5es por CMS",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-via-cms?authuser=0",desc:"Guias CMS"},{name:"Iframes & Cross-Origin",url:"https://sites.google.com/corp/google.com/webao-sme-cms/solu%C3%A7%C3%B5es-t%C3%A9cnicas/iframes-contentdocument-e-message?authuser=0",desc:"Solu\xE7\xF5es Iframes"},{name:"Ads ICS Ghost",url:"http://go/pqp",desc:"Ghost Ads"},{name:"Analytics ICS Ghost",url:"http://go/analytics-ics",desc:"Ghost Analytics"},{name:"GTM ICS Ghost",url:"http://go/tagmanager-ics",desc:"Ghost GTM"},{name:"Gearloose",url:"http://go/gearloose",desc:"Ferramenta"},{name:"MC ICS Ghost",url:"https://mcn-ics.corp.google.com/mc/overview",desc:"Ghost MC"},{name:"JSFiddle",url:"https://jsfiddle.net/",desc:"Playground JS"},{name:"RegExr",url:"https://regexr.com/",desc:"Testador Regex"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. CSP"},{name:"Consent Mode Install",url:"https://developers.google.com/tag-platform/security/guides/consent?consentmode=advanced",desc:"Guia CoMo"},{name:"Consent Mode Debug",url:"https://developers.google.com/tag-platform/security/guides/consent-debugging",desc:"Debug CoMo"}]},hr:{label:"RH",links:[{name:"Be.Cognizant",url:"https://cognizantonline.sharepoint.com/sites/GlobalHR/SitePages/Brazil.aspx",desc:"Portal Colaborador"},{name:"OneCognizant",url:"https://onecognizant.cognizant.com/Home",desc:"Apps e Sistemas"},{name:"ADP eXpert",url:"https://expert.cloud.brasil.adp.com/expert2/v4/",desc:"Folha Pagamento"}]},lm:{label:"Forms",links:[{name:"Ocorr\xEAncias e Pausas",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas"},{name:"Chamadas >50min",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro chamadas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"BAU/Descarte/Monitoria"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos dif\xEDceis"}]},suporte:{label:"Ajuda",links:[{name:"Fale Conosco Ads",url:"https://support.google.com/google-ads/gethelp",desc:"Chat/Email Ads"},{name:"Fale Conosco Merchant",url:"https://support.google.com/merchants/gethelp",desc:"Chat/Email Shopping"},{name:"Fale Conosco GMB",url:"https://support.google.com/business/gethelp",desc:"Perfil da Empresa"},{name:"Suporte API",url:"https://support.google.com/googleapi",desc:"Console API"},{name:"Telefones Suporte",url:"https://www.adwordsrobot.com/en/list-of-google-adwords-support-phone-numbers",desc:"Lista de n\xFAmeros"}]}},Xe={tasks:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',lm:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>',qa:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>',suporte:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',ads:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',analytics:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>',shopping:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',tech:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>',hr:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',history:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>'},Ct={tasks:{color:"#0097A7",bg:"#E0F7FA"},ads:{color:"#1967D2",bg:"#E8F0FE"},analytics:{color:"#E37400",bg:"#FEF7E0"},shopping:{color:"#188038",bg:"#E6F4EA"},tech:{color:"#9334E6",bg:"#F3E8FD"},hr:{color:"#C5221F",bg:"#FCE8E6"},lm:{color:"#5F6368",bg:"#F1F3F4"},qa:{color:"#F09D00",bg:"#FFF3E0"},suporte:{color:"#0B57D0",bg:"#D3E3FD"},history:{color:"#5F6368",bg:"#FFFFFF"}},Pt="cw_link_history_v4";function To(t,e){try{let o=JSON.parse(localStorage.getItem(Pt)||"[]");o=o.filter(a=>a.url!==t.url),o.unshift({...t,_originalCat:e}),o=o.slice(0,3),localStorage.setItem(Pt,JSON.stringify(o))}catch(o){console.warn("Erro ao salvar hist\xF3rico",o)}}function Xo(){try{return JSON.parse(localStorage.getItem(Pt)||"[]")}catch{return[]}}function ko(){let t="v4.6 (Colorful UI)",e="",o=!1,a=null,s=!1,i={bgApp:"#F8F9FA",bgSidebar:"#FFFFFF",bgSurface:"#FFFFFF",textPrimary:"#202124",textSecondary:"#5F6368",borderSubtle:"rgba(0,0,0,0.06)"},n=document.createElement("div");n.id="links-popup",n.classList.add("cw-module-window"),Object.assign(n.style,Ae,{right:"100px",width:"600px",height:"650px",background:i.bgApp,overflow:"hidden"});let u=Ce(n,"Central de Links",t,"Navegue pelas categorias ou use a busca.",{popup:n,googleLine:null},()=>G());n.appendChild(u);let g=document.createElement("div");g.style.cssText="display: flex; height: calc(100% - 56px); width: 100%; position: relative;",n.appendChild(g);let f=document.createElement("div");f.style.cssText=`
      width: 80px; flex-shrink: 0; background: ${i.bgSidebar};
      border-right: 1px solid ${i.borderSubtle};
      display: flex; flex-direction: column; align-items: center;
      padding: 16px 0; overflow-y: auto; gap: 8px;
      scrollbar-width: none; z-index: 2;
  `,g.appendChild(f);let p=document.createElement("div");p.style.cssText="flex: 1; display: flex; flex-direction: column; overflow: hidden; background: #F8F9FA; position: relative; z-index: 1;",g.appendChild(p);let h=document.createElement("div");h.style.cssText="padding: 16px 24px; flex-shrink: 0; background: transparent;";let A=document.createElement("div");A.style.cssText=`
      position: relative; width: 100%; height: 44px;
      border-radius: 12px; border: 1px solid transparent;
      background: #FFFFFF; transition: all 0.2s;
      display: flex; align-items: center;
      box-shadow: 0 2px 6px rgba(0,0,0,0.04);
  `;let y=document.createElement("div");y.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5F6368" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',y.style.cssText="margin-left: 14px; display: flex; align-items: center; justify-content: center; pointer-events: none;";let T=document.createElement("input");T.type="text",T.placeholder="Buscar ferramenta ou SOP...",T.style.cssText=`
      flex: 1; height: 100%; border: none; background: transparent;
      padding: 0 12px; font-size: 14px; color: ${i.textPrimary};
      outline: none; box-sizing: border-box; font-family: 'Google Sans', Roboto, sans-serif;
  `,T.onfocus=()=>{A.style.boxShadow="0 4px 12px rgba(26,115,232,0.15)",A.style.border="1px solid #1a73e8"},T.onblur=()=>{A.style.boxShadow="0 2px 6px rgba(0,0,0,0.04)",A.style.border="1px solid transparent"},A.appendChild(y),A.appendChild(T),h.appendChild(A),p.appendChild(h);let R=document.createElement("div");R.style.cssText="flex: 1; overflow-y: auto; padding: 0 24px 40px 24px; scroll-behavior: smooth;",p.appendChild(R);let M=null;function H(){if(M)return;M=document.createElement("div"),M.style.cssText=`
          position: absolute; bottom: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255,255,255,0.98); z-index: 20;
          display: flex; flex-direction: column;
          transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          box-shadow: 0 -4px 20px rgba(0,0,0,0.1);
      `;let m=document.createElement("div");m.style.cssText="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #F1F3F4;",m.innerHTML='<span style="font-size: 16px; font-weight: 700; color: #202124;">\u{1F552} Recentes</span>';let b=document.createElement("button");b.innerHTML='<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',b.style.cssText="background: none; border: none; cursor: pointer; color: #5f6368;",b.onclick=()=>{ne(),s=!1,D()},m.appendChild(b),M.appendChild(m);let E=document.createElement("div");E.id="cw-history-list",E.style.cssText="flex: 1; overflow-y: auto; padding: 20px; background: #F8F9FA;",M.appendChild(E),p.appendChild(M)}function ie(){M||H();let m=M.querySelector("#cw-history-list");m.innerHTML="";let b=Xo();b.length===0?m.innerHTML='<div style="text-align: center; color: #999; margin-top: 60px; font-size:13px;">Nada por aqui ainda.</div>':b.forEach(E=>{let l=C(E,Xe[E._originalCat],!0,E._originalCat);m.appendChild(l)}),requestAnimationFrame(()=>M.style.transform="translateY(0)")}function ne(){M&&(M.style.transform="translateY(100%)")}function k(){f.innerHTML="";let m=S("history","Recentes",Xe.history);m.id="cw-sidebar-btn-history",m.onclick=()=>{U.playClick(),s=!s,s?ie():ne(),D()},f.appendChild(m);let b=document.createElement("div");b.style.cssText="width: 32px; height: 1px; background: rgba(0,0,0,0.08); margin: 4px 0;",f.appendChild(b),Object.keys(dt).forEach(E=>{let l=dt[E],c=S(E,l.label,Xe[E]);c.id=`cw-sidebar-btn-${E}`,c.onclick=()=>{U.playClick(),s&&(s=!1,ne()),q(E)},f.appendChild(c)})}function S(m,b,E){let l=document.createElement("div");l.style.cssText=`
          width: 56px; height: 56px; border-radius: 16px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer; color: ${i.textSecondary}; 
          transition: all 0.2s cubic-bezier(0.2, 0.0, 0.2, 1);
          position: relative;
      `,l.title=b,l.dataset.key=m;let c=document.createElement("div");c.style.cssText="width: 24px; height: 24px; margin-bottom: 2px; transition: transform 0.2s;",c.innerHTML=E||Xe.tasks;let x=document.createElement("div");return x.style.cssText="font-size: 9px; font-weight: 600; opacity: 0.7; letter-spacing: 0.3px;",x.textContent=b,l.appendChild(c),l.appendChild(x),l.onmouseenter=()=>{a!==m&&!(m==="history"&&s)&&(l.style.background="#F1F3F4",c.style.transform="scale(1.1)")},l.onmouseleave=()=>{a!==m&&!(m==="history"&&s)&&(l.style.background="transparent",c.style.transform="scale(1)")},l}function q(m){let b=document.getElementById(`cat-anchor-${m}`);b&&(b.scrollIntoView({behavior:"smooth",block:"start"}),a=m,D())}function D(){Object.keys(dt).forEach(b=>{let E=f.querySelector(`#cw-sidebar-btn-${b}`);if(E)if(a===b&&!s){let l=Ct[b];E.style.background=l.bg,E.style.color=l.color,E.querySelector("div:first-child").style.transform="scale(1.1)"}else E.style.background="transparent",E.style.color=i.textSecondary,E.querySelector("div:first-child").style.transform="scale(1)"});let m=f.querySelector("#cw-sidebar-btn-history");m&&(s?(m.style.background="#3C4043",m.style.color="#FFFFFF"):(m.style.background="transparent",m.style.color=i.textSecondary))}function L(){if(R.innerHTML="",e.trim()!==""){let b=[];if(Object.entries(dt).forEach(([l,c])=>{let x=c.links.filter(d=>d.name.toLowerCase().includes(e.toLowerCase())||d.desc.toLowerCase().includes(e.toLowerCase()));b.push(...x.map(d=>({...d,_cat:l})))}),b.length===0){R.innerHTML='<div style="text-align:center; padding: 60px; color:#999; font-size:13px;">Nada encontrado.</div>';return}let E=document.createElement("div");E.innerHTML="Resultados da busca",E.style.cssText="font-size:12px; font-weight:700; color:#5f6368; margin:20px 0 10px; text-transform:uppercase; letter-spacing:0.5px;",R.appendChild(E),b.forEach(l=>{let c=C(l,Xe[l._cat],!1,l._cat);R.appendChild(c)});return}Object.entries(dt).forEach(([b,E])=>{let l=Ct[b],c=document.createElement("div"),x=document.createElement("div");x.id=`cat-anchor-${b}`,x.style.cssText=`
              display: flex; align-items: center; gap: 8px;
              font-size: 13px; font-weight: 800; color: ${l.color}; 
              text-transform: uppercase; letter-spacing: 0.5px;
              margin: 32px 0 12px 0; padding-top: 10px;
          `,x.innerHTML=`
            <div style="width:8px; height:8px; border-radius:50%; background:${l.color};"></div>
            ${E.label}
          `,c.appendChild(x);let d=document.createElement("div");d.style.cssText="display: grid; grid-template-columns: 1fr; gap: 8px;",E.links.forEach(v=>{let O=C(v,Xe[b],!1,b);d.appendChild(O)}),c.appendChild(d),R.appendChild(c)});let m=document.createElement("div");m.style.height="80px",R.appendChild(m)}function C(m,b,E,l){let c=document.createElement("div"),x=Ct[l]||Ct.history;c.style.cssText=`
          display: flex; align-items: center; gap: 16px;
          padding: 12px 16px; 
          background: #FFFFFF; 
          border: 1px solid transparent;
          border-radius: 16px; 
          cursor: pointer;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
          position: relative; overflow: hidden;
      `;let d=document.createElement("div");d.style.cssText=`
          width: 40px; height: 40px; border-radius: 12px;
          background: ${x.bg}; color: ${x.color};
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
      `,d.innerHTML=b||Xe.tasks;let v=d.querySelector("svg");v&&(v.style.width="22px",v.style.height="22px");let O=document.createElement("div");O.style.cssText="flex: 1; display: flex; flex-direction: column; gap: 2px; overflow: hidden;";let B=document.createElement("div");B.style.cssText=`font-size: 14px; font-weight: 600; color: ${i.textPrimary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,B.textContent=m.name;let _=document.createElement("div");_.style.cssText=`font-size: 12px; color: ${i.textSecondary}; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`,_.textContent=m.desc,O.appendChild(B),O.appendChild(_);let I=document.createElement("div");return I.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',I.style.cssText=`
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: #9AA0A6; transition: all 0.2s; opacity: 0;
      `,I.title="Copiar URL",c.onmouseenter=()=>{c.style.transform="translateY(-2px)",c.style.boxShadow="0 8px 20px rgba(0,0,0,0.08)",c.style.borderColor="rgba(0,0,0,0.05)",c.style.borderLeft=`4px solid ${x.color}`,I.style.opacity="1",I.style.background="#F1F3F4"},c.onmouseleave=()=>{c.style.transform="translateY(0)",c.style.boxShadow="0 1px 3px rgba(0,0,0,0.05)",c.style.border="1px solid transparent",I.style.opacity="0",I.style.background="transparent"},c.onclick=()=>{!E&&l&&To(m,l),window.open(m.url,"_blank")},I.onclick=P=>{P.stopPropagation(),U.playClick(),navigator.clipboard.writeText(m.url),!E&&l&&To(m,l),W("Link copiado!")},c.appendChild(d),c.appendChild(O),c.appendChild(I),c}T.addEventListener("input",m=>{e=m.target.value,L()});function G(){o=!o,Se(o,n,"cw-btn-links")}return document.body.appendChild(n),k(),L(),G}var ze=[];function jt(t){ze=t}var Ko="https://script.google.com/a/macros/google.com/s/AKfycbxFxh1cVk6r0t_JTA2TBfHBLJe_mOBQFsidwL1jwsUDcBtQYk3afu25SN-FR3vafJChHw/exec",Ht="cw_data_broadcast",Oo="cw_data_tips",Qo=["Processando...","Mantenha o foco!","Aguarde..."];function St(t,e={}){return new Promise((o,a)=>{let s="cw_cb_"+Math.round(1e5*Math.random()),i=document.createElement("script");window[s]=u=>{document.body.contains(i)&&document.body.removeChild(i),delete window[s],o(u)};let n=Object.keys(e).map(u=>encodeURIComponent(u)+"="+encodeURIComponent(e[u])).join("&"),r=`${Ko}?op=${t}&callback=${s}&t=${Date.now()}&${n}`;i.src=r,i.onerror=()=>{document.body.contains(i)&&document.body.removeChild(i),delete window[s],a(new Error("JSONP Error (Check Corp Login)"))},document.body.appendChild(i)})}var Ee={fetchTips:async()=>{try{let t=await St("tips");t?.tips&&localStorage.setItem(Oo,JSON.stringify(t.tips))}catch(t){console.warn("Tips offline",t)}},fetchData:async()=>{try{let t=await St("broadcast");if(t?.broadcast)return localStorage.setItem(Ht,JSON.stringify(t.broadcast)),t}catch(t){console.warn("Broadcast offline",t)}return{broadcast:JSON.parse(localStorage.getItem(Ht)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(Ht)||"[]"),getRandomTip:()=>{let t=Qo,e=localStorage.getItem(Oo);if(e)try{t=JSON.parse(e)}catch{}return t[Math.floor(Math.random()*t.length)]},sendBroadcast:async t=>{let e={...t,date:new Date().toISOString(),id:Date.now().toString()};return await Ee._performOp("new_broadcast",e)},updateBroadcast:async(t,e)=>{let o={id:t,...e};return await Ee._performOp("update_broadcast",o)},deleteBroadcast:async t=>await Ee._performOp("delete_broadcast",{id:t}),_performOp:async(t,e)=>{try{console.log(`\u{1F4E4} Executando ${t}...`,e);let o=await St(t,e);return o&&o.status==="success"?(console.log("\u2705 Sucesso:",t),!0):(console.warn("\u26A0\uFE0F Falha:",o),!1)}catch(o){return console.error("\u274C Erro JSONP:",o),!1}},logEvent:(t,e,o="",a=null)=>{try{let s="anon";try{let n=bt();n&&(s=n.split("@")[0].toLowerCase())}catch{}let i={timestamp:new Date().toISOString(),user:s,version:"v4.5.1",category:t,action:e,label:o,value:a||""};St("log",i).catch(n=>{})}catch(s){console.warn("Analytics error",s)}},logUsage:()=>{}};var Zo=["lucaste"],Jo=60*1e3;window._cwIsAdmin=!1;window._cwCurrentUser=null;function Io(){let t="v4.9 (High Contrast UI)",e=!1,o=null,a=null;function s(l){if(!l)return"";try{let c=new Date(l);return isNaN(c.getTime())?String(l):c.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(l)}}if(!document.getElementById("cw-broadcast-hd-css")){let l=document.createElement("style");l.id="cw-broadcast-hd-css",l.innerHTML=`
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
      `,document.head.appendChild(l)}let i={feedContainer:{padding:"20px 24px 80px 24px",overflowY:"auto",flexGrow:"1",background:"#F8F9FA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.12)",boxShadow:"0 4px 12px rgba(60,64,67,0.08)",overflow:"hidden",transition:"all 0.3s ease",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.05)",boxShadow:"none",opacity:"0.6",filter:"grayscale(0.8)",marginBottom:"16px",flexShrink:"0",width:"100%",boxSizing:"border-box",position:"relative"},cardHeader:{padding:"16px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid #F1F3F4"},typeTag:{display:"flex",alignItems:"center",gap:"6px",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",letterSpacing:"0.6px",padding:"4px 8px",borderRadius:"6px"},dateTag:{fontSize:"11px",color:"#5f6368",fontWeight:"500"},cardContent:{padding:"16px 20px 20px 20px"},msgTitle:{fontSize:"16px",fontWeight:"700",color:"#202124",marginBottom:"8px",lineHeight:"1.4"},msgBody:{fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",wordBreak:"break-word"},msgMeta:{fontSize:"11px",color:"#9aa0a6",marginTop:"12px",display:"flex",alignItems:"center",gap:"6px"},dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},bauContainer:{margin:"16px 24px 0 24px",padding:"16px",background:"#F3E8FD",border:"1px solid #D8B4FE",borderRadius:"16px",display:"flex",flexDirection:"column",gap:"12px",boxShadow:"0 4px 12px rgba(147, 51, 234, 0.1)"},bauHeader:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"2px"},bauLabel:{fontSize:"11px",fontWeight:"800",color:"#7E22CE",textTransform:"uppercase",letterSpacing:"0.8px"},liveIndicator:{display:"flex",alignItems:"center",gap:"8px"},pulseDot:{width:"8px",height:"8px",borderRadius:"50%",background:"#9333EA",boxShadow:"0 0 0 0 rgba(147, 51, 234, 0.7)",animation:"cw-pulse 2s infinite"},bauSlotRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(255,255,255,0.5)",borderRadius:"8px",marginBottom:"4px"},bauFlag:{fontSize:"18px",lineHeight:"1"},bauDate:{fontSize:"16px",fontWeight:"700",color:"#581C87",letterSpacing:"-0.5px"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"60px 0",color:"#BDC1C6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"8px 16px",borderRadius:"20px",background:"#E8F0FE"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",opacity:"0.8"}},n={critical:{color:"#991B1B",bg:"#FEF2F2",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>'},info:{color:"#1E40AF",bg:"#EFF6FF",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{color:"#166534",bg:"#F0FDF4",icon:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}};function r(l){return l?Object.entries(l).map(([c,x])=>`${c.replace(/[A-Z]/g,d=>"-"+d.toLowerCase())}:${x}`).join(";"):""}function u(l){if(!l||typeof l!="string")return"";let c=l;return c=c.replace(/(https?:\/\/[^\s]+)/g,'<a href="$1" target="_blank" style="color:#1967d2; text-decoration:none; font-weight:500;">$1</a>'),c=c.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),c=c.replace(/_(.*?)_/g,"<i>$1</i>"),c=c.replace(/\n/g,"<br>"),c=io(c),c}let g=document.createElement("div");g.id="broadcast-popup",g.classList.add("cw-module-window"),Object.assign(g.style,Ae,{right:"auto",left:"50%",width:"420px",height:"680px",display:"flex",flexDirection:"column",transform:"translateX(-50%) scale(0.05)",backgroundColor:"#FAFAFA",overflow:"hidden"});let f={popup:g,googleLine:null};function p(){if(e=!e,Se(e,g,"cw-btn-broadcast"),e){let l=document.getElementById("cw-btn-broadcast");l&&l.classList.remove("has-new"),q()}}let h=Ce(g,"Central de Avisos",t,"Comunica\xE7\xE3o oficial da opera\xE7\xE3o.",f,()=>p()),A=h.querySelector(".cw-header-actions")||h.lastElementChild,y=null;function T(){let l=null;try{l=bt()}catch{console.warn("TechSol: Auth Pending")}if(l){let c=l.split("@")[0].toLowerCase(),x=Zo.includes(c);if(window._cwIsAdmin=x,window._cwCurrentUser=c,x&&A&&!A.querySelector("#cw-admin-btn")){let d=document.createElement("div");d.id="cw-admin-btn",d.className="cw-btn-interactive",d.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',Object.assign(d.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#1a73e8",background:"rgba(26, 115, 232, 0.1)",marginRight:"8px"}),d.title="Novo Aviso",d.onclick=v=>{v.stopPropagation(),H()},A.insertBefore(d,A.firstChild),y||M(),L()}}else window._cwAdminRetries||(window._cwAdminRetries=0),window._cwAdminRetries<5&&(window._cwAdminRetries++,setTimeout(T,2e3))}if(A){let l=document.createElement("button");l.textContent="Limpar",l.className="cw-btn-interactive",Object.assign(l.style,{fontSize:"12px",color:"#1a73e8",background:"transparent",border:"none",padding:"8px",fontWeight:"600"}),l.onclick=c=>{c.stopPropagation(),U.playSuccess();let x=ze.map(d=>d.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(x)),L(),D()},A.insertBefore(l,A.firstChild)}g.appendChild(h);let R=document.createElement("div");R.id="cw-update-status",R.style.cssText="padding: 8px; text-align: center; font-size: 11px; color: #5f6368; background: #FAFAFA; border-bottom: 1px solid transparent; font-weight:500; display:none;",g.appendChild(R);function M(){y=document.createElement("div"),y.className="cw-editor-overlay",y.innerHTML=`
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
      `,y.querySelectorAll('input[name="cw-bc-type"]').forEach(d=>{d.addEventListener("change",()=>{y.querySelectorAll(".cw-radio-option").forEach(v=>v.classList.remove("checked")),d.parentElement.classList.add("checked")})}),setTimeout(()=>{let d=y.querySelector(".cw-radio-option.info");d&&d.classList.add("checked")},100);let l=y.querySelector("#cw-bc-cancel"),c=y.querySelector("#cw-bc-close-x"),x=y.querySelector("#cw-bc-send");l.onclick=ie,c.onclick=ie,x.onclick=ne,g.appendChild(y)}function H(l=null){if(!y)return;let c=y.querySelector("#cw-editor-title-label"),x=y.querySelector("#cw-bc-title"),d=y.querySelector("#cw-bc-text"),v=y.querySelector("#cw-bc-send");if(l){a=l.id,c.textContent="Editar Aviso",x.value=l.title||"",d.value=l.text||"",v.textContent="Salvar Altera\xE7\xF5es";let O=l.type||"info",B=y.querySelector(`input[name="cw-bc-type"][value="${O}"]`);B&&B.click()}else{a=null,c.textContent="Novo Aviso",x.value="",d.value="",v.textContent="Publicar";let O=y.querySelector('input[name="cw-bc-type"][value="info"]');O&&O.click()}y.classList.add("active"),setTimeout(()=>x.focus(),300)}function ie(){y&&y.classList.remove("active"),a=null}async function ne(){let l=y.querySelector("#cw-bc-send"),c=y.querySelector("#cw-bc-title"),x=y.querySelector("#cw-bc-text"),d=y.querySelector('input[name="cw-bc-type"]:checked'),v=d?d.value:"info";if(!c.value.trim()||!x.value.trim()){W("Preencha todos os campos!",{error:!0});return}l.textContent="Salvando...",l.style.opacity="0.7";let O=!1;a?O=await Ee.updateBroadcast(a,{title:c.value,text:x.value,type:v}):O=await Ee.sendBroadcast({title:c.value,text:x.value,type:v,author:window._cwCurrentUser||"admin"}),O?(W(a?"Atualizado!":"Publicado!"),U.playSuccess(),ie(),setTimeout(()=>q(),1500)):(W("Erro ao salvar. Verifique a conex\xE3o.",{error:!0}),l.textContent=a?"Salvar Altera\xE7\xF5es":"Publicar",l.style.opacity="1")}async function k(l){if(confirm("Confirma a exclus\xE3o deste aviso?"))if(await Ee.deleteBroadcast(l)){W("Aviso removido."),U.playClick();let x=ze.findIndex(d=>d.id===l);x>-1&&ze.splice(x,1),L(),setTimeout(()=>q(),1500)}else W("Erro ao excluir.",{error:!0})}let S=document.createElement("div");S.className="cw-nice-scroll",Object.assign(S.style,i.feedContainer),g.appendChild(S);async function q(){e&&(R.style.display="block",R.innerHTML="\u{1F504} Sincronizando...");try{let l=await Ee.fetchData();l&&l.broadcast&&(jt(l.broadcast),D(),e&&(L(),R.innerHTML='<span style="color:#137333">\u2713 Atualizado</span>',setTimeout(()=>{R.style.display="none"},1500)))}catch{e&&(R.innerHTML="\u26A0\uFE0F Offline")}}function D(){let l=document.getElementById("cw-btn-broadcast");if(!l)return;let c=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(ze.some(d=>!c.includes(d.id))){if(l.classList.add("has-new"),!l.querySelector(".cw-badge")){let d=document.createElement("div");d.className="cw-badge",Object.assign(d.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),l.appendChild(d)}}else{l.classList.remove("has-new");let d=l.querySelector(".cw-badge");d&&d.remove()}}function L(){S.innerHTML="";let l=g.querySelector("#cw-bau-widget");l&&l.remove();let c=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),x=[...ze].sort((_,I)=>{let P=new Date(_.date).getTime()||0;return(new Date(I.date).getTime()||0)-P}),d=x.findIndex(_=>_.title&&_.title.toLowerCase().includes("disponibilidade bau"));if(d!==-1){let _=x[d];x.splice(d,1);let I=document.createElement("div");I.id="cw-bau-widget",Object.assign(I.style,i.bauContainer);let P=[],$=(_.text||"").split(`
`),F=/\d{1,2}\/\d{1,2}/;if($.forEach(le=>{let pe=le.match(F);if(pe){let ve=pe[0],Fe="\u{1F4C5}";/🇧🇷|🇵🇹|PT|BR/i.test(le)?Fe="\u{1F1E7}\u{1F1F7}":/🇪🇸|🇲🇽|ES|LATAM/i.test(le)&&(Fe="\u{1F1EA}\u{1F1F8}"),P.some(Le=>Le.flag===Fe&&Le.date===ve)||P.push({flag:Fe,date:ve})}}),P.length===0){let le=(_.text||"").match(/\d{1,2}\/\d{1,2}/g);le&&[...new Set(le)].forEach(pe=>P.push({flag:"\u{1F4C5}",date:pe}))}let z="",K='<button id="cw-bau-toggle-btn" class="cw-btn-interactive" style="background:rgba(255,255,255,0.7); border:1px solid rgba(139, 92, 246, 0.4); border-radius:12px; padding:8px 12px; color:#6D28D9; font-size:12px; font-weight:600;">Detalhes</button>';window._cwIsAdmin&&(K=`
                <button class="cw-bau-edit cw-btn-interactive" style="border:1px solid rgba(139, 92, 246, 0.2); background:rgba(255,255,255,0.5); border-radius:12px; padding:8px; color:#6D28D9; display:flex; align-items:center; justify-content:center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                </button>
                ${K}
              `),P.length>0?z=`
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="flex:1; display:flex; gap:8px;">${P.map(pe=>`
                  <div style="${r(i.bauSlotRow)}; margin-bottom:0; flex:1; justify-content:center;">
                      <span style="${r(i.bauFlag)}">${pe.flag}</span>
                      <span style="${r(i.bauDate)}">${pe.date}</span>
                  </div>
              `).join("")}</div>
                      <div style="display:flex; gap:8px; margin-left:12px; align-items:center;">
                          ${K}
                      </div>
                  </div>
                  <div id="cw-bau-full" style="display:none; margin-top:12px; padding-top:12px; border-top:1px dashed rgba(139, 92, 246, 0.3); font-size:13px; line-height:1.5; color:#581C87;">${u(_.text)}</div>
              `:z=`
                <div style="display:flex; justify-content:space-between; align-items:start;">
                    <div style="font-size:13px; color:#581C87; line-height:1.5; flex:1;">${u(_.text)}</div>
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
              ${z}
          `,R.after(I);let J=I.querySelector("#cw-bau-toggle-btn"),se=I.querySelector("#cw-bau-full");if(J&&se&&(J.onclick=()=>{let le=se.style.display==="none";se.style.display=le?"block":"none",J.textContent=le?"Ocultar":"Detalhes"}),window._cwIsAdmin){let le=I.querySelector(".cw-bau-edit");le&&(le.onclick=()=>H(_))}}let v=x.sort((_,I)=>{let P=c.includes(_.id),$=c.includes(I.id);return P===$?0:P?1:-1});if(v.length===0&&!d){let _=document.createElement("div");Object.assign(_.style,i.emptyState),_.innerHTML=`
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Tudo lido!</div>
           `,S.appendChild(_)}let O=v.filter(_=>!c.includes(_.id)),B=v.filter(_=>c.includes(_.id));if(O.forEach(_=>S.appendChild(C(_,!1))),B.length>0){let _=document.createElement("div");Object.assign(_.style,i.historyDivider),_.innerHTML=`<span>Hist\xF3rico (${B.length})</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let I=document.createElement("div");Object.assign(I.style,i.historyContainer),B.forEach($=>I.appendChild(C($,!0)));let P=!1;_.onclick=()=>{U.playClick(),P=!P,I.style.display=P?"flex":"none",_.querySelector("svg").style.transform=P?"rotate(180deg)":"rotate(0deg)"},S.appendChild(_),S.appendChild(I)}}function C(l,c){let x=document.createElement("div");Object.assign(x.style,c?i.cardHistory:i.card);let d=n[l.type]||n.info,v=document.createElement("div");Object.assign(v.style,i.cardHeader);let O=document.createElement("div");Object.assign(O.style,i.typeTag,{color:d.color,background:d.bg}),O.innerHTML=`${d.icon} <span>${l.type}</span>`;let B=document.createElement("span");if(Object.assign(B.style,i.dateTag),B.textContent=s(l.date),v.appendChild(O),c)v.appendChild(B);else{let F=document.createElement("button");F.className="cw-btn-interactive",Object.assign(F.style,i.dismissBtn),F.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>',F.onmouseenter=()=>{F.style.color="#1e8e3e",F.style.background="#e6f4ea",F.style.borderColor="#1e8e3e"},F.onmouseleave=()=>{F.style.color="#5f6368",F.style.background="#fff",F.style.borderColor="rgba(0,0,0,0.1)"},F.onclick=z=>{z.stopPropagation(),U.playClick(),x.style.transform="translateX(20px)",x.style.opacity="0",setTimeout(()=>{let K=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");K.push(l.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(K)),L(),D()},200)},v.appendChild(F)}let _=document.createElement("div");Object.assign(_.style,i.cardContent);let I=document.createElement("div");Object.assign(I.style,i.msgTitle),I.textContent=l.title;let P=document.createElement("div");Object.assign(P.style,i.msgBody),P.innerHTML=u(l.text);let $=document.createElement("div");if(Object.assign($.style,i.msgMeta),$.innerHTML=`Publicado por <b>${l.author||"Sistema"}</b>`,c||($.innerHTML+=` \u2022 ${s(l.date)}`),_.appendChild(I),_.appendChild(P),_.appendChild($),x.appendChild(v),x.appendChild(_),window._cwIsAdmin){let F=document.createElement("div");F.className="cw-card-actions";let z=document.createElement("button");z.className="cw-action-btn edit",z.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> Editar',z.onclick=()=>H(l);let K=document.createElement("button");K.className="cw-action-btn delete",K.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> Excluir',K.onclick=()=>k(l.id),F.appendChild(z),F.appendChild(K),x.appendChild(F)}return x}let G=Ee.getCachedBroadcasts();G.length>0&&(jt(G),L()),setTimeout(T,500),q(),o||(o=setInterval(q,Jo));let m=document.createElement("div");Object.assign(m.style,Qe),m.className="no-drag",g.appendChild(m),Ze(g,m),document.body.appendChild(g);let b=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),E=ze.some(l=>!b.includes(l.id));return{toggle:p,hasUnread:E}}function qo(){if(localStorage.getItem("cw_onboarding_seen_v1"))return;let t=[{icon:"\u{1F680}",title:"Bem-vindo ao TechSol Suite",text:"Sua nova central de opera\xE7\xF5es para maximizar produtividade e padroniza\xE7\xE3o no CRM."},{icon:"\u{1F4DD}",title:"Notas Autom\xE1ticas",text:"Gere notas de caso (BAU/LM) perfeitas em segundos. Selecione o Status, as Tasks e deixe o wizard escrever o texto t\xE9cnico para voc\xEA."},{icon:"\u26A1",title:"Quick Email & Scripts",text:"Responda e-mails com templates inteligentes que detectam o contexto e use scripts de chamada interativos que guiam seu atendimento."},{icon:"\u{1F4E2}",title:"Fique Informado",text:"O m\xF3dulo Broadcast traz avisos importantes e disponibilidade BAU direto na sua tela, sem precisar abrir planilhas externas."},{icon:"\u2705",title:"Tudo Pronto!",text:"Explore o Menu Flutuante para come\xE7ar. Bom trabalho!",isLast:!0}],e=0,o={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.6)",backdropFilter:"blur(4px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"380px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 20px 50px rgba(0,0,0,0.3)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(20px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},icon:{fontSize:"48px",marginBottom:"20px",display:"block"},title:{fontSize:"22px",fontWeight:"700",color:"#202124",marginBottom:"12px"},text:{fontSize:"15px",color:"#5f6368",lineHeight:"1.6",marginBottom:"32px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"24px"},dot:{width:"8px",height:"8px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"24px",borderRadius:"4px"},btnContainer:{display:"flex",justifyContent:"space-between",alignItems:"center"},btn:{padding:"10px 24px",borderRadius:"20px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"background 0.2s"},btnSkip:{background:"transparent",color:"#5f6368"},btnNext:{background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},a=document.createElement("div");Object.assign(a.style,o.overlay);let s=document.createElement("div");Object.assign(s.style,o.card);let i=document.createElement("div");Object.assign(i.style,o.icon);let n=document.createElement("div");Object.assign(n.style,o.title);let r=document.createElement("div");Object.assign(r.style,o.text);let u=document.createElement("div");Object.assign(u.style,o.dotsContainer);let g=document.createElement("div");Object.assign(g.style,o.btnContainer);let f=document.createElement("button");f.textContent="Pular",Object.assign(f.style,o.btn,o.btnSkip),f.onmouseover=()=>f.style.color="#202124",f.onmouseout=()=>f.style.color="#5f6368";let p=document.createElement("button");p.textContent="Pr\xF3ximo",Object.assign(p.style,o.btn,o.btnNext),p.onmouseover=()=>p.style.transform="scale(1.05)",p.onmouseout=()=>p.style.transform="scale(1)",g.appendChild(f),g.appendChild(p),s.appendChild(i),s.appendChild(n),s.appendChild(r),s.appendChild(u),s.appendChild(g),a.appendChild(s),document.body.appendChild(a);function h(y){let T=t[y];i.textContent=T.icon,n.textContent=T.title,r.textContent=T.text,u.innerHTML="",t.forEach((R,M)=>{let H=document.createElement("div");Object.assign(H.style,o.dot),M===y&&Object.assign(H.style,o.dotActive),u.appendChild(H)}),T.isLast?(f.style.display="none",p.textContent="Come\xE7ar \u{1F680}",p.style.width="100%"):(f.style.display="block",p.textContent="Pr\xF3ximo",p.style.width="auto")}function A(){localStorage.setItem("cw_onboarding_seen_v1","true"),a.style.opacity="0",s.style.transform="translateY(20px)",setTimeout(()=>a.remove(),400),U.playSuccess(),W("Tudo pronto! Use o menu flutuante.")}p.onclick=()=>{U.playClick(),e<t.length-1?(e++,h(e)):A()},f.onclick=()=>{confirm("Pular o tutorial?")&&A()},h(0),requestAnimationFrame(()=>{a.style.opacity="1",s.style.transform="translateY(0)"})}var Fo={version:"v4.5",title:"Novidades da Vers\xE3o 4.5 \u{1F389}",slides:[{icon:"\u{1F3A8}",title:"Novo Visual HD",text:"Refizemos toda a interface com design 'Glassmorphism' (estilo Apple) e modo escuro inteligente para melhor leitura."},{icon:"\u{1F5C2}\uFE0F",title:"Menu Lateral & Hist\xF3rico",text:"A Central de Links agora possui um menu lateral fixo para navega\xE7\xE3o r\xE1pida e uma se\xE7\xE3o 'Recentes' que lembra o que voc\xEA usou."},{icon:"\u26A1",title:"Performance",text:"O carregamento est\xE1 30% mais r\xE1pido e a busca de links agora \xE9 instant\xE2nea."},{icon:"\u{1F91D}",title:"Split & Transfer",text:"Novo m\xF3dulo dedicado para gerar notas de transfer\xEAncia (S&T) com preenchimento autom\xE1tico de dados t\xE9cnicos."}]};function Ro(t){let e=localStorage.getItem("cw_last_version");if(!e){localStorage.setItem("cw_last_version",t);return}e!==t&&en(t)}function en(t){let e=Fo.slides,o=0,a={overlay:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.7)",backdropFilter:"blur(5px)",zIndex:"2147483647",display:"flex",alignItems:"center",justifyContent:"center",opacity:"0",transition:"opacity 0.3s ease"},card:{width:"400px",background:"#fff",borderRadius:"24px",padding:"32px",textAlign:"center",position:"relative",boxShadow:"0 24px 60px rgba(0,0,0,0.4)",fontFamily:"'Google Sans', Roboto, sans-serif",transform:"translateY(30px)",transition:"all 0.4s cubic-bezier(0.19, 1, 0.22, 1)"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"12px",background:"#E8F0FE",color:"#1967D2",fontSize:"11px",fontWeight:"700",textTransform:"uppercase",marginBottom:"16px",letterSpacing:"0.5px"},icon:{fontSize:"42px",marginBottom:"16px",display:"block"},title:{fontSize:"20px",fontWeight:"700",color:"#202124",marginBottom:"8px"},text:{fontSize:"14px",color:"#5f6368",lineHeight:"1.5",marginBottom:"32px",minHeight:"42px"},dotsContainer:{display:"flex",justifyContent:"center",gap:"6px",marginBottom:"24px"},dot:{width:"6px",height:"6px",borderRadius:"50%",background:"#dadce0",transition:"all 0.3s"},dotActive:{background:"#1a73e8",width:"18px",borderRadius:"4px"},btn:{width:"100%",padding:"12px",borderRadius:"12px",border:"none",cursor:"pointer",fontSize:"14px",fontWeight:"600",transition:"all 0.2s",background:"#1a73e8",color:"#fff",boxShadow:"0 4px 12px rgba(26,115,232,0.3)"}},s=document.createElement("div");Object.assign(s.style,a.overlay);let i=document.createElement("div");Object.assign(i.style,a.card);let n=document.createElement("div");Object.assign(n.style,a.badge),n.textContent=`Atualiza\xE7\xE3o ${t}`;let r=document.createElement("div");Object.assign(r.style,a.icon);let u=document.createElement("div");Object.assign(u.style,a.title);let g=document.createElement("div");Object.assign(g.style,a.text);let f=document.createElement("div");Object.assign(f.style,a.dotsContainer);let p=document.createElement("button");Object.assign(p.style,a.btn),p.onmouseover=()=>p.style.transform="scale(1.02)",p.onmouseout=()=>p.style.transform="scale(1)",i.appendChild(n),i.appendChild(r),i.appendChild(u),i.appendChild(g),i.appendChild(f),i.appendChild(p),s.appendChild(i),document.body.appendChild(s);function h(y){let T=e[y];r.textContent=T.icon,u.textContent=T.title,g.textContent=T.text,f.innerHTML="",e.forEach((R,M)=>{let H=document.createElement("div");Object.assign(H.style,a.dot),M===y&&Object.assign(H.style,a.dotActive),f.appendChild(H)}),y===e.length-1?p.textContent="Entendi, vamos l\xE1! \u{1F44D}":p.textContent="Pr\xF3ximo"}function A(){localStorage.setItem("cw_last_version",t),s.style.opacity="0",i.style.transform="translateY(30px)",setTimeout(()=>s.remove(),400),U.playSuccess(),W(`TechSol atualizado para ${t}!`)}p.onclick=()=>{U.playClick(),o<e.length-1?(o++,h(o)):A()},h(0),requestAnimationFrame(()=>{s.style.opacity="1",i.style.transform="translateY(0)"})}var _o="cw_timezone_pinned",$t=[{id:"pt",name:"Portugal",flag:"\u{1F1F5}\u{1F1F9}",zone:"Europe/Lisbon",label:"Lisboa"},{id:"es",name:"Espanha",flag:"\u{1F1EA}\u{1F1F8}",zone:"Europe/Madrid",label:"Madrid"},{id:"ar",name:"Argentina",flag:"\u{1F1E6}\u{1F1F7}",zone:"America/Argentina/Buenos_Aires",label:"Buenos Aires"},{id:"bo",name:"Bol\xEDvia",flag:"\u{1F1E7}\u{1F1F4}",zone:"America/La_Paz",label:"La Paz"},{id:"cl",name:"Chile",flag:"\u{1F1E8}\u{1F1F1}",zone:"America/Santiago",label:"Santiago"},{id:"co",name:"Col\xF4mbia",flag:"\u{1F1E8}\u{1F1F4}",zone:"America/Bogota",label:"Bogot\xE1"},{id:"ec",name:"Equador",flag:"\u{1F1EA}\u{1F1E8}",zone:"America/Guayaquil",label:"Guayaquil"},{id:"py",name:"Paraguai",flag:"\u{1F1F5}\u{1F1FE}",zone:"America/Asuncion",label:"Assun\xE7\xE3o"},{id:"pe",name:"Peru",flag:"\u{1F1F5}\u{1F1EA}",zone:"America/Lima",label:"Lima"},{id:"uy",name:"Uruguai",flag:"\u{1F1FA}\u{1F1FE}",zone:"America/Montevideo",label:"Montevid\xE9u"},{id:"ve",name:"Venezuela",flag:"\u{1F1FB}\u{1F1EA}",zone:"America/Caracas",label:"Caracas"},{id:"mx",name:"M\xE9xico",flag:"\u{1F1F2}\u{1F1FD}",zone:"America/Mexico_City",label:"CDMX"},{id:"cr",name:"Costa Rica",flag:"\u{1F1E8}\u{1F1F7}",zone:"America/Costa_Rica",label:"San Jos\xE9"},{id:"sv",name:"El Salvador",flag:"\u{1F1F8}\u{1F1FB}",zone:"America/El_Salvador",label:"San Salvador"},{id:"gt",name:"Guatemala",flag:"\u{1F1EC}\u{1F1F9}",zone:"America/Guatemala",label:"C. da Guatemala"},{id:"hn",name:"Honduras",flag:"\u{1F1ED}\u{1F1F3}",zone:"America/Tegucigalpa",label:"Tegucigalpa"},{id:"ni",name:"Nicar\xE1gua",flag:"\u{1F1F3}\u{1F1EE}",zone:"America/Managua",label:"Man\xE1gua"},{id:"pa",name:"Panam\xE1",flag:"\u{1F1F5}\u{1F1E6}",zone:"America/Panama",label:"C. do Panam\xE1"},{id:"do",name:"Rep. Dominicana",flag:"\u{1F1E9}\u{1F1F4}",zone:"America/Santo_Domingo",label:"Santo Domingo"},{id:"pr",name:"Porto Rico",flag:"\u{1F1F5}\u{1F1F7}",zone:"America/Puerto_Rico",label:"San Juan"}];function Mo(){let t="v2.0 Pro",e=!1,o=null,a="mx",s=JSON.parse(localStorage.getItem(_o)||"[]"),i=new Date;i.setHours(14,0,0,0);let n={bg:"#F8F9FA",surface:"#FFFFFF",primary:"#1A73E8",primaryBg:"#E8F0FE",text:"#202124",textSub:"#5F6368",border:"#DADCE0",success:"#1E8E3E",warning:"#E37400",error:"#D93025",night:"#1F2937",day:"#FFF7ED"},r={container:{display:"flex",flexDirection:"column",height:"100%",background:n.bg},tabHeader:{display:"flex",background:n.surface,borderBottom:`1px solid ${n.border}`,padding:"0 4px"},tabBtn:{flex:1,padding:"14px",textAlign:"center",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:n.textSub,borderBottom:"3px solid transparent",transition:"all 0.2s ease"},tabActive:{color:n.primary,borderBottomColor:n.primary,fontWeight:"600"},listContainer:{padding:"16px",overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:"10px"},hubCard:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 18px",background:n.surface,borderRadius:"12px",border:`1px solid ${n.border}`,boxShadow:"0 1px 3px rgba(0,0,0,0.04)",transition:"transform 0.2s, box-shadow 0.2s"},hubCardPinned:{borderLeft:`4px solid ${n.primary}`},plannerWrapper:{padding:"24px",display:"flex",flexDirection:"column",gap:"24px",flex:1,overflowY:"auto"},timeComparisonRow:{display:"flex",gap:"12px",alignItems:"stretch"},timeCard:{flex:1,padding:"16px",borderRadius:"16px",background:n.surface,border:`1px solid ${n.border}`,display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",boxShadow:"0 2px 8px rgba(0,0,0,0.04)",position:"relative",overflow:"hidden"},timelineContainer:{position:"relative",height:"48px",marginTop:"8px"},timelineTrack:{position:"absolute",top:"20px",left:"0",right:"0",height:"8px",borderRadius:"4px",background:"#E5E7EB",overflow:"hidden"},dayZone:{position:"absolute",top:"0",bottom:"0",left:"37.5%",width:"37.5%",background:"rgba(52, 168, 83, 0.2)",pointerEvents:"none"},hdInput:{fontSize:"24px",fontWeight:"700",color:n.primary,border:"none",background:"transparent",width:"100%",textAlign:"center",outline:"none",fontFamily:"monospace",cursor:"pointer"},statusBadge:{padding:"6px 12px",borderRadius:"20px",fontSize:"12px",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"6px",marginTop:"12px",alignSelf:"center"}},u=document.createElement("div");u.id="timezone-popup",u.classList.add("cw-module-window"),Object.assign(u.style,Ae,{right:"100px",width:"440px",height:"700px",overflow:"hidden"});let f=Ce(u,"Time Zone Traveler",t,"Monitoramento global e planejamento de chamadas.",{popup:u},()=>L());u.appendChild(f);let p=document.createElement("div");Object.assign(p.style,r.container),u.appendChild(p);let h=document.createElement("div");Object.assign(h.style,r.tabHeader);let A=document.createElement("div");A.textContent="Monitoramento",Object.assign(A.style,r.tabBtn,r.tabActive);let y=document.createElement("div");y.textContent="Planejador de Chamada",Object.assign(y.style,r.tabBtn),h.appendChild(A),h.appendChild(y),p.appendChild(h);let T=document.createElement("div");Object.assign(T.style,r.listContainer);let R=document.createElement("div");Object.assign(R.style,r.plannerWrapper,{display:"none"}),p.appendChild(T),p.appendChild(R),A.onclick=()=>M("live"),y.onclick=()=>M("plan");function M(C){U.playClick(),C==="live"?(Object.assign(A.style,r.tabActive),Object.assign(y.style,r.tabBtn),y.style.borderBottomColor="transparent",T.style.display="flex",R.style.display="none",S()):(Object.assign(y.style,r.tabActive),Object.assign(A.style,r.tabBtn),A.style.borderBottomColor="transparent",R.style.display="flex",T.style.display="none",q(),k())}function H(C){return C>=9&&C<17?{color:n.success,label:"Aberto",icon:"\u{1F7E2}"}:C>=8&&C<9?{color:n.warning,label:"Abrindo",icon:"\u{1F7E1}"}:C>=17&&C<19?{color:n.warning,label:"Fechando",icon:"\u{1F7E1}"}:{color:n.error,label:"Fechado",icon:"\u{1F534}"}}function ie(C){s.includes(C)?s=s.filter(G=>G!==C):s.push(C),localStorage.setItem(_o,JSON.stringify(s)),ne(),U.playClick()}function ne(){T.innerHTML="";let C=new Date;[...$t].sort((m,b)=>{let E=s.includes(m.id),l=s.includes(b.id);return E&&!l?-1:!E&&l?1:m.name.localeCompare(b.name)}).forEach(m=>{let b=s.includes(m.id),E=C.toLocaleTimeString("pt-BR",{timeZone:m.zone,hour:"2-digit",minute:"2-digit"}),l=parseInt(E.split(":")[0]),c=H(l),x=l<6||l>18,d=document.createElement("div");Object.assign(d.style,r.hubCard),b&&Object.assign(d.style,r.hubCardPinned);let v=b?"\u2605":"\u2606",O=b?"#F9AB00":"#BDC1C6";d.innerHTML=`
                <div style="display:flex; alignItems:center; gap:16px;">
                    <div class="cw-pin-btn" style="cursor:pointer; font-size:18px; color:${O}; width:24px; text-align:center;">${v}</div>
                    <div style="font-size:28px;">${m.flag}</div>
                    <div>
                        <div style="font-size:14px; font-weight:700; color:${n.text};">${m.name}</div>
                        <div style="font-size:12px; color:${n.textSub}; display:flex; align-items:center; gap:4px;">
                            ${x?"\u{1F319}":"\u2600\uFE0F"} ${m.label}
                        </div>
                    </div>
                </div>
                <div style="text-align:right;">
                    <div style="font-size:22px; font-weight:700; color:${n.text}; font-family:'Roboto Mono', monospace;">${E}</div>
                    <div style="font-size:11px; font-weight:600; color:${c.color}; display:flex; align-items:center; justify-content:flex-end; gap:4px;">
                        ${c.label} ${c.icon}
                    </div>
                </div>
            `,d.onmouseenter=()=>{d.style.backgroundColor="#F8F9FA"},d.onmouseleave=()=>{d.style.backgroundColor=n.surface};let B=d.querySelector(".cw-pin-btn");B.onclick=_=>{_.stopPropagation(),ie(m.id)},d.onclick=()=>{a=m.id,M("plan")},T.appendChild(d)})}function k(){R.innerHTML="";let C=document.createElement("div"),G=document.createElement("label");G.textContent="Planejar com:",G.style.cssText="display:block; font-size:12px; font-weight:700; color:#5F6368; margin-bottom:8px; text-transform:uppercase;";let m=document.createElement("select");Object.assign(m.style,ft),$t.forEach(z=>{let K=document.createElement("option");K.value=z.id,K.textContent=`${z.flag} ${z.name} (${z.zone})`,z.id===a&&(K.selected=!0),m.appendChild(K)}),m.onchange=z=>{a=z.target.value,F()},C.appendChild(G),C.appendChild(m),R.appendChild(C);let b=document.createElement("div");Object.assign(b.style,r.timeComparisonRow);let E=document.createElement("div");Object.assign(E.style,r.timeCard),E.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#1A73E8; text-transform:uppercase;">\u{1F1E7}\u{1F1F7} Seu Hor\xE1rio</div>
            <input type="time" id="cw-time-input-br" style="${D(r.hdInput)}">
            <div style="font-size:11px; color:#5F6368;">Hor\xE1rio de Bras\xEDlia</div>
        `;let l=document.createElement("div");Object.assign(l.style,r.timeCard),l.style.backgroundColor="#F8F9FA",l.innerHTML=`
            <div style="font-size:11px; font-weight:700; color:#E37400; text-transform:uppercase;">Cliente</div>
            <div id="cw-time-display-client" style="${D(r.hdInput)}; color:#202124;">--:--</div>
            <div id="cw-client-label" style="font-size:11px; color:#5F6368;">...</div>
        `,b.appendChild(E),b.appendChild(l),R.appendChild(b);let c=document.createElement("div");c.id="cw-planner-status",Object.assign(c.style,r.statusBadge),R.appendChild(c);let x=document.createElement("div");Object.assign(x.style,{padding:"0 8px"});let d=document.createElement("div");d.textContent="Arraste para simular o hor\xE1rio:",d.style.cssText="font-size:12px; color:#5F6368; text-align:center; margin-bottom:8px;";let v=document.createElement("div");Object.assign(v.style,r.timelineContainer);let O=document.createElement("div");Object.assign(O.style,r.timelineTrack);let B=document.createElement("input");B.type="range",B.min="0",B.max="1439",B.step="15",B.style.cssText="position:absolute; top:14px; left:0; width:100%; -webkit-appearance:none; background:transparent; z-index:2; cursor:pointer;";let _=document.createElement("div");_.style.cssText="position:absolute; top:32px; width:100%; display:flex; justify-content:space-between; font-size:10px; color:#9AA0A6; padding:0 2px;",_.innerHTML="<span>00h</span><span>06h</span><span>12h</span><span>18h</span><span>23h</span>",v.appendChild(O),v.appendChild(B),v.appendChild(_),x.appendChild(d),x.appendChild(v),R.appendChild(x);let I=E.querySelector("#cw-time-input-br"),P=l.querySelector("#cw-time-display-client"),$=l.querySelector("#cw-client-label");function F(){let z=$t.find(ve=>ve.id===a);$.textContent=`${z.flag} ${z.label} (${z.zone})`;let K=i.getHours(),J=i.getMinutes(),se=`${String(K).padStart(2,"0")}:${String(J).padStart(2,"0")}`;I.value=se,B.value=K*60+J;let le=i.toLocaleTimeString("pt-BR",{timeZone:z.zone,hour:"2-digit",minute:"2-digit"});P.textContent=le;let pe=parseInt(le.split(":")[0]);pe>=9&&pe<17?(c.style.background="#E6F4EA",c.style.color="#137333",c.innerHTML="\u2705 Hor\xE1rio Comercial Ideal"):pe>=8&&pe<9||pe>=17&&pe<19?(c.style.background="#FEF7E0",c.style.color="#B06000",c.innerHTML="\u26A0\uFE0F Hor\xE1rio Limite (Aten\xE7\xE3o)"):(c.style.background="#FCE8E6",c.style.color="#C5221F",c.innerHTML="\u26D4 Fora de Hor\xE1rio (Noite/Fechado)")}B.oninput=z=>{let K=parseInt(z.target.value);i.setHours(Math.floor(K/60)),i.setMinutes(K%60),F()},I.oninput=z=>{let[K,J]=z.target.value.split(":");K&&J&&(i.setHours(parseInt(K)),i.setMinutes(parseInt(J)),F())},F()}function S(){ne(),o||(o=setInterval(ne,6e4))}function q(){o&&(clearInterval(o),o=null)}function D(C){return Object.entries(C).map(([G,m])=>`${G.replace(/[A-Z]/g,b=>"-"+b.toLowerCase())}:${m}`).join(";")}function L(){e=!e,Se(e,u,"cw-btn-timezone"),e?M("live"):q()}return document.body.appendChild(u),L}function tn(){if(window.techSolInitialized){Nt();return}window.techSolInitialized=!0;let t="v4.5.1";console.log(`\u{1F680} TechSol Suite Initializing (${t})...`);try{oo();try{U.initGlobalListeners(),U.playStartup()}catch(r){console.warn("\xC1udio bloqueado:",r)}Ee.fetchTips(),Nt();let e=wo(),o=Co(),a=Eo(),s=ko(),i=Mo(),n=Io();(void 0)({toggleNotes:e,toggleEmail:o,toggleScript:a,toggleLinks:s,toggleTimezone:i,broadcastControl:n}),setTimeout(()=>{Ee.logEvent("App","Start","Session Start"),qo(),setTimeout(()=>{Ro(t)},500)},2500)}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),W("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}tn();})();
