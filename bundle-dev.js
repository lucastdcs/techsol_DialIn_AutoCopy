(()=>{var at="",bo=e=>new Promise(t=>setTimeout(t,e));async function Gt(){if(at)return at;try{let e=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!e)return"Agente";e.click(),await bo(100);let t="Consultor",n=document.querySelector("profile-details .name");if(n)t=n.textContent.trim().split(" ")[0],t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();else{let o=document.querySelector("profile-details img");if(o&&o.src.includes("/photos/")){let s=o.src.match(/\/photos\/([^\?]+)/)[1];t=s.charAt(0).toUpperCase()+s.slice(1)}}return e.click(),document.body.click(),at=t,t}catch(e){return console.warn("Sherlock falhou:",e),"Consultor"}}function ht(){return at||"Consultor"}function Ft(e){let t=new Date,n=t.getHours(),o=t.getDay(),s="Ol\xE1",r="";n>=5&&n<12?(s="Bom dia",r='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):n>=12&&n<18?(s="Boa tarde",r='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(s="Boa noite",r='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let a=[];n>=0&&n<5?a=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:n<12?o===1?a=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:o===5?a=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:a=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:n<18?a=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:a=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(o===0||o===6)&&(a=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let l=a[Math.floor(Math.random()*a.length)];return{prefix:`${s},`,name:e,suffix:l,icon:r,isFriday:o===5}}function xt(){let e="Cliente",t="[INSERIR URL]";try{let o=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(o&&o.nextElementSibling){let s=o.nextElementSibling.innerText.trim();s&&(e=s)}}catch(n){console.warn("Falha ao capturar Nome:",n)}try{let o=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(o&&o.nextElementSibling){let s=o.nextElementSibling.innerText.trim();s&&(t=s)}}catch(n){console.warn("Falha ao capturar Website:",n)}return{advertiserName:e,websiteUrl:t,agentName:ht()}}var ze=null,yt=null,$e=.08;function Ue(){if(!ze){let e=window.AudioContext||window.webkitAudioContext;e&&(ze=new e)}return ze&&ze.state==="suspended"&&ze.resume(),ze}function zt(e){if(yt)return yt;let t=e.sampleRate*2,n=e.createBuffer(1,t,e.sampleRate),o=n.getChannelData(0);for(let s=0;s<t;s++)o[s]=Math.random()*2-1;return yt=n,n}var J={playClick:()=>{let e=Ue();if(!e)return;let t=e.currentTime,n=e.createBufferSource();n.buffer=zt(e);let o=e.createBiquadFilter();o.type="highpass",o.frequency.value=4e3;let s=e.createGain();s.gain.setValueAtTime($e*.8,t),s.gain.exponentialRampToValueAtTime(.001,t+.015),n.connect(o),o.connect(s),s.connect(e.destination),n.start(t),n.stop(t+.02)},playHover:()=>{let e=Ue();if(!e)return;let t=e.currentTime,n=e.createOscillator();n.type="sine",n.frequency.setValueAtTime(400,t);let o=e.createGain();o.gain.setValueAtTime(0,t),o.gain.linearRampToValueAtTime($e*.1,t+.005),o.gain.linearRampToValueAtTime(0,t+.02),n.connect(o),o.connect(e.destination),n.start(t),n.stop(t+.03)},playSuccess:()=>{let e=Ue();if(!e)return;let t=e.currentTime;[1046.5,1567.9].forEach((o,s)=>{let r=e.createOscillator(),a=e.createGain();r.type="sine",r.frequency.value=o,a.gain.setValueAtTime(0,t),a.gain.linearRampToValueAtTime($e*.6,t+.05),a.gain.exponentialRampToValueAtTime(.001,t+.6),r.connect(a),a.connect(e.destination),r.start(t),r.stop(t+.7)})},playGenieOpen:()=>{let e=Ue();if(!e)return;let t=e.currentTime,n=e.createBufferSource();n.buffer=zt(e);let o=e.createBiquadFilter();o.type="lowpass",o.frequency.setValueAtTime(100,t),o.frequency.exponentialRampToValueAtTime(800,t+.2);let s=e.createGain();s.gain.setValueAtTime(0,t),s.gain.linearRampToValueAtTime($e*.5,t+.05),s.gain.linearRampToValueAtTime(0,t+.25),n.connect(o),o.connect(s),s.connect(e.destination),n.start(t),n.stop(t+.3)},playError:()=>{let e=Ue();if(!e)return;let t=e.currentTime,n=e.createOscillator(),o=e.createGain();n.type="triangle",n.frequency.setValueAtTime(120,t),n.frequency.exponentialRampToValueAtTime(80,t+.1),o.gain.setValueAtTime($e,t),o.gain.exponentialRampToValueAtTime(.001,t+.15),n.connect(o),o.connect(e.destination),n.start(t),n.stop(t+.2)},playStartup:()=>{let e=Ue();if(!e)return;let t=e.currentTime,n=e.createOscillator(),o=e.createGain();n.type="sine",n.frequency.value=440;let s=e.createBiquadFilter();s.type="lowpass",s.frequency.value=200,o.gain.setValueAtTime(0,t),o.gain.linearRampToValueAtTime($e*.4,t+.8),o.gain.linearRampToValueAtTime(0,t+1.6),n.connect(s),s.connect(o),o.connect(e.destination),n.start(t),n.stop(t+2)},playSwoosh:()=>{J.playGenieOpen()},playReset:()=>{J.playError()},initGlobalListeners:()=>{if(window._cwSoundListenersActive)return;window._cwSoundListenersActive=!0;let e=0,t=50;document.addEventListener("mouseover",n=>{if(!ze)return;let o=n.target.closest('button, a, input[type="checkbox"], .cw-btn, .cw-hero-card, .cw-task-item, [data-sound="hover"]');if(!o||o.contains(n.relatedTarget))return;let s=Date.now();s-e<t||(J.playHover(),e=s)},{passive:!0})}};var Bt=1e4;function Pt(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
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
    `,document.head.appendChild(t)}function oe(e,t={}){let n=document.createElement("div"),o=t.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(n.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:o,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),n.textContent=e,document.body.appendChild(n),t.error?J.playError():J.playSuccess(),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>n.remove(),400)},t.duration||4e3)}function qt(e,t=null){let n=0,o=0,s=0,r=0,a=t||e;a.style.cursor="grab",a.onmousedown=l;function l(v){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(v.target.tagName)||v.target.closest(".no-drag"))return;v=v||window.event,a.style.cursor="grabbing",e.style.transition="none";let u=e.getBoundingClientRect();e.style.transform="none",e.style.left=u.left+"px",e.style.top=u.top+"px",e.style.margin="0",e.style.bottom="auto",e.style.right="auto",Bt++,e.style.zIndex=Bt,s=v.clientX,r=v.clientY,e.setAttribute("data-dragging","true"),document.onmouseup=g,document.onmousemove=p}function p(v){v=v||window.event,v.preventDefault(),n=s-v.clientX,o=r-v.clientY,s=v.clientX,r=v.clientY;let u=e.offsetTop-o,O=e.offsetLeft-n,h=16,f=window.innerWidth,y=window.innerHeight,E=e.offsetWidth,I=e.offsetHeight;O<h?O=h:O+E>f-h&&(O=f-E-h),u<h?u=h:u+I>y-h&&(u=y-I-h),e.style.top=u+"px",e.style.left=O+"px"}function g(){document.onmouseup=null,document.onmousemove=null,a.style.cursor="grab",setTimeout(()=>{e.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",e.setAttribute("data-dragging","false"),e.setAttribute("data-moved","true")},50)}}var Se={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",backgroundColor:"rgba(255, 255, 255, 0.98)",backdropFilter:"blur(20px)",webkitBackdropFilter:"blur(20px)",borderRadius:"16px",boxShadow:`
    0 0 1px rgba(0,0,0,0.08), 
    0 8px 24px rgba(0,0,0,0.12),
    0 20px 60px rgba(0,0,0,0.08)
  `,border:"1px solid rgba(255, 255, 255, 0.6)",zIndex:"9999",display:"flex",flexDirection:"column",fontFamily:"'Google Sans', Roboto, sans-serif",fontSize:"14px",color:"#3c4043",willChange:"transform, opacity, width, height",transformOrigin:"top right"};var St={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Ze={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var Ht={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var me={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var vt=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],jt=-1;function et(){let e=Math.floor(Math.random()*vt.length);return e===jt&&(e=(e+1)%vt.length),jt=e,vt[e]}var Oe=e=>new Promise(t=>setTimeout(t,e));async function fo(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let n=e.querySelector(".cursor");await Oe(200);for(let o=0;o<t.length;o++){let s=t.charAt(o),r=document.createElement("span");r.textContent=s,n&&n.parentNode===e?n.before(r):e.appendChild(r);let a=Math.floor(Math.random()*60)+30;o===0&&(a=150),o>t.length-3&&(a=30),await Oe(a)}await Oe(600),n&&(n.style.display="none")}async function Ct(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
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
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await Oe(200);let t=await Gt(),n=Ft(t),o=e.querySelector("#w-icon"),s=e.querySelector("#p1"),r=e.querySelector("#p2"),a=e.querySelector("#p3"),l=e.querySelector("#p-sextou");o&&(o.innerHTML=n.icon),s&&(s.textContent=n.prefix),a&&(a.textContent=n.suffix),await Oe(300);let p=o?o.querySelector("svg"):null;if(p&&(p.style.opacity="1",p.style.transform="scale(1)"),await Oe(400),s&&(s.style.opacity="1"),J.playStartup(),r&&await fo(r,n.name),a&&(a.style.opacity="1",a.style.transform="translateY(0)"),n.isFriday&&l){await Oe(400),l.style.display="block",l.offsetWidth;let g=l.querySelector(".sextou-badge");g&&(g.style.opacity="1",g.style.transform="scale(1)")}await Oe(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await Oe(900),e.parentNode&&e.parentNode.removeChild(e)}}var We={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Ye(e,t){t.onmousedown=n;function n(o){o.stopPropagation(),o.preventDefault();let s=e.style.transition;e.style.transition="none";let r=o.clientX,a=o.clientY,l=parseFloat(getComputedStyle(e,null).getPropertyValue("width").replace("px","")),p=parseFloat(getComputedStyle(e,null).getPropertyValue("height").replace("px","")),g=r,v=a,u=!1;function O(y){g=y.clientX,v=y.clientY,u||(window.requestAnimationFrame(()=>{h(),u=!1}),u=!0)}function h(){let y=l+(g-r),E=p+(v-a);y>360&&(e.style.width=y+"px"),E>300&&(e.style.height=E+"px")}function f(){document.removeEventListener("mousemove",O),document.removeEventListener("mouseup",f),setTimeout(()=>{e.style.transition=s},50)}document.addEventListener("mousemove",O),document.addEventListener("mouseup",f)}t.onmouseenter=()=>t.style.opacity="1",t.onmouseleave=()=>t.style.opacity="0.6"}var Ie={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:"}},_e={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:[]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},tt={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"}},it={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl"},ot=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],wt=["CONSIDERACOES","COMENTARIOS"],Ce={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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
\u2022 Tentativa 3 - `,"field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-2-6-final":{type:"all","field-REASON_COMMENTS":"Finaliza\xE7\xE3o (2/6)","field-SPEAKEASY_ID":"-","field-ON_CALL":"-","field-COMENTARIOS":"\u2022 Dia 9 finaliza\xE7\xE3o do 2/6, durante o per\xEDodo do acompanhamento n\xE3o houve retorno do anunciante, ent\xE3o o caso ser\xE1 encerrado.","field-SCREENSHOTS":"\u2022 N/A","field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-manual":{type:"all","field-REASON_COMMENTS":"Outro (Manual)","field-GTM_GA4_VERIFICADO":"N/A"}};var pe=e=>new Promise(t=>setTimeout(t,e));function Re(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>e.dispatchEvent(new MouseEvent(n,t)))}function st(){return Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(t=>{let n=t.offsetParent!==null,o=t.closest("case-message-view")!==null,s=t.closest(".editor")!==null||t.closest("write-card")!==null;return n&&!o&&s})}async function Vt(){let e=!1,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(l=>l.innerText.trim()==="email");if(n&&n.offsetParent!==null){let l=n.closest("material-button")||n.closest("material-fab")||n;l.style&&(l.style.display="block",l.style.visibility="visible"),Re(l),e=!0}else{let l=document.querySelector("material-fab-speed-dial");if(l){let p=l.querySelector(".trigger");if(p){p.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),Re(p),await pe(1e3);let v=Array.from(document.querySelectorAll("i.material-icons-extended")).find(u=>u.innerText.trim()==="email");v&&(Re(v),e=!0)}else l.click()}}let o=0,s=st();for(console.log("\u23F3 Aguardando editor EDIT\xC1VEL...");!s&&o<30;)await pe(500),s=st(),o++;if(!s)return oe("Erro: Editor de email n\xE3o apareceu.",{error:!0}),!1;let a=Array.from(document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]')).find(l=>l.offsetParent!==null);if(a){console.log("\u26A0\uFE0F Rascunho detectado. Clicando em Discard..."),Re(a);let l=null,p=0;for(;!l&&p<10;)await pe(200),l=Array.from(document.querySelectorAll('material-button[debug-id="confirm-button"]')).find(v=>v.offsetParent!==null),p++;l?(console.log("\u2705 Confirmando descarte..."),Re(l),await pe(2500)):console.warn("\u26A0\uFE0F Cliquei em Discard, mas o bot\xE3o Confirm n\xE3o apareceu.")}if(s){let l=s.closest('[id="email-body-content-top"]'),g=(s.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(l){if(g){let u=g.closest('[aria-hidden="true"]');u&&u.removeAttribute("aria-hidden"),g.focus()}await pe(300),l.innerHTML=`
                <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                    <span id="cases-body-field"><br></span>
                </div>
            `;let v=l.querySelector("#cases-body-field");if(v){let u=document.createRange();u.selectNodeContents(v),u.collapse(!0);let O=window.getSelection();O.removeAllRanges(),O.addRange(u)}return!0}}return oe("Erro cr\xEDtico ao acessar editor.",{error:!0}),!1}async function $t(e){if(!e)return;oe("Preparando email...",{duration:3e3});let t=xt();if(!await Vt())return;await pe(500);let o=document.querySelector('material-button[debug-id="canned_response_button"]');if(o){o.scrollIntoView({behavior:"smooth",block:"center"}),await pe(200),Re(o),await pe(1500);let s=document.querySelector("material-auto-suggest-input input");if(s){Re(s),await pe(200),document.execCommand("insertText",!1,e),s.dispatchEvent(new Event("input",{bubbles:!0}));let r=null,a=0;for(;a<20;){await pe(500),a++;let l=Array.from(document.querySelectorAll("material-select-dropdown-item"));if(l.length>0&&(r=l.find(p=>p.innerText.toLowerCase().includes(e.toLowerCase())),!r&&l.length===1&&(r=l[0]),r))break}if(r){let l=function(u,O){if(u.nodeType===3&&u.nodeValue.includes(O))return u;if(!u.childNodes)return null;for(let h of u.childNodes){let f=l(h,O);if(f)return f}return null};Re(r),await pe(2e3);let p=st(),g=p?p.closest('[id="email-body-content-top"]'):document.body,v=l(g,"{%ADVERTISER_NAME%}");if(v){let u=document.createRange(),O=v.nodeValue.indexOf("{%ADVERTISER_NAME%}");u.setStart(v,O),u.setEnd(v,O+19);let h=window.getSelection();h.removeAllRanges(),h.addRange(u),document.execCommand("insertText",!1,t.advertiserName),oe("Email preenchido!")}else oe("Email inserido (Nome n\xE3o substitu\xEDdo).")}else oe(`Template '${e}' n\xE3o encontrado.`,{error:!0})}}else oe("Bot\xE3o Canned Response n\xE3o achado.",{error:!0})}async function At(e){console.log(`\u{1F680} Iniciando automa\xE7\xE3o (Quick): ${e.name}`),oe("Preparando email...",{duration:3e3});let t=xt(),n=ht();if(!await Vt())return;await pe(600);let s=document.querySelector('input[aria-label="Subject"]');s&&e.subject&&(s.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(s,e.subject),s.dispatchEvent(new Event("input",{bubbles:!0})),await pe(300));let r=st();if(r){let l=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');l&&(l.focus(),l.click(),l.dispatchEvent(new Event("input",{bubbles:!0}))),await pe(400);let p=new Date;p.setDate(p.getDate()+3);let g=p.getDay();g===6?p.setDate(p.getDate()+2):g===0&&p.setDate(p.getDate()+1);let v=p.toLocaleDateString("pt-BR"),u=e.body;u=u.replace(/\[Nome do Cliente\]/g,t.advertiserName||"Cliente"),u=u.replace(/\[INSERIR URL\]/g,t.websiteUrl||"seu site"),u=u.replace(/\[URL\]/g,t.websiteUrl||"seu site"),u=u.replace(/\[Seu Nome\]/g,n),u=u.replace(/\[MM\/DD\/YYYY\]/g,v),document.execCommand("insertHTML",!1,u),l&&(l.dispatchEvent(new Event("input",{bubbles:!0})),l.dispatchEvent(new Event("change",{bubbles:!0}))),oe("Email preenchido com sucesso!",{duration:2e3}),await pe(800)}else oe("Erro ao focar no editor.",{error:!0})}var ho={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},Ut={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function we(e,t,n,o,s,r){let a=document.createElement("div");Object.assign(a.style,ho),qt(e,a);let l=document.createElement("div");Object.assign(l.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),a.appendChild(l),s&&(s.googleLine=l);let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center",gap:"12px"});let g=document.createElement("img");g.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(g.style,{width:"20px",height:"20px",pointerEvents:"none"});let v=document.createElement("span");v.textContent=t,p.appendChild(g),p.appendChild(v);let u=document.createElement("div");Object.assign(u.style,{display:"flex",alignItems:"center",gap:"4px"});let O='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',h='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',f=document.createElement("div");f.innerHTML=O,Object.assign(f.style,Ut),f.title="Sobre",f.classList.add("no-drag"),f.onmouseenter=()=>{f.style.background="rgba(255,255,255,0.1)",f.style.color="#FFF"},f.onmouseleave=()=>{f.style.color!=="rgb(138, 180, 248)"&&(f.style.background="transparent",f.style.color="#9AA0A6")};let y=document.createElement("div");y.innerHTML=h,Object.assign(y.style,Ut),y.title="Fechar",y.classList.add("no-drag"),y.onmouseenter=()=>{y.style.background="rgba(242, 139, 130, 0.2)",y.style.color="#F28B82"},y.onmouseleave=()=>{y.style.background="transparent",y.style.color="#9AA0A6"},y.onmousedown=I=>I.stopPropagation(),f.onmousedown=I=>I.stopPropagation(),y.onclick=r;let E=xo(e,t,n,o);return f.onclick=I=>{I.stopPropagation(),E.style.opacity==="1"?(E.style.opacity="0",E.style.pointerEvents="none",f.style.color="#9AA0A6",f.style.background="transparent"):(E.style.opacity="1",E.style.pointerEvents="auto",f.style.color="#8AB4F8",f.style.background="rgba(138, 180, 248, 0.1)")},u.appendChild(f),u.appendChild(y),a.appendChild(p),a.appendChild(u),a}function xo(e,t,n,o){let s=document.createElement("div");return Object.assign(s.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(5px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),s.innerHTML=`
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
    `,setTimeout(()=>{let r=s.querySelector("#close-help-internal");r&&(r.onmouseover=()=>r.style.backgroundColor="#f8f9fa",r.onmouseout=()=>r.style.backgroundColor="white",r.onclick=()=>{s.style.opacity="0",s.style.pointerEvents="none"})},0),e.appendChild(s),s}if(!document.getElementById("cw-module-styles")){let e=document.createElement("style");e.id="cw-module-styles",e.innerHTML=`
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
    `,document.head.appendChild(e)}function Ae(e,t,n){let o=document.getElementById(n);if(!t)return;let s=t.getAttribute("data-moved")==="true",r={x:0,y:0};if(o){let v=o.getBoundingClientRect();r.x=v.left+v.width/2,r.y=v.top+v.height/2}let a,l;if(!s)a=window.innerWidth/2,l=window.innerHeight/2;else{let v=t.getBoundingClientRect();a=v.left+v.width/2,l=v.top+v.height/2,a===0&&l===0&&(a=window.innerWidth/2,l=window.innerHeight/2)}let p=r.x-a,g=r.y-l;e?(J.playGenieOpen(),t.style.transition="none",t.style.opacity="0",t.style.pointerEvents="auto",s?t.style.transform=`translate(${p}px, ${g}px) scale(0.05)`:t.style.transform=`translate(calc(-50% + ${p}px), calc(-50% + ${g}px)) scale(0.05)`,t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("open"),o&&o.classList.add("active"),t.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",t.style.opacity="1",s?t.style.transform="translate(0, 0) scale(1)":t.style.transform="translate(-50%, -50%) scale(1)"}),typeof Wt=="function"&&Wt(t,n)):(J.playSwoosh(),t.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",t.style.pointerEvents="none",requestAnimationFrame(()=>{t.style.opacity="0",s?t.style.transform=`translate(${p}px, ${g}px) scale(0.1)`:t.style.transform=`translate(calc(-50% + ${p}px), calc(-50% + ${g}px)) scale(0.1)`}),setTimeout(()=>{t.classList.remove("open"),o&&o.classList.remove("active"),t.style.transition="",t.style.transform=""},300),typeof Et=="function"&&Et(t))}function Wt(e,t){Et(e);let n=o=>{if(!e.classList.contains("open"))return;let s=e.contains(o.target),r=document.querySelector(".cw-pill"),a=r&&r.contains(o.target);s?(e.classList.remove("idle"),e.style.zIndex="2147483648"):a||(e.classList.add("idle"),e.style.zIndex="2147483646")};e._idleHandler=n,document.addEventListener("mousedown",n)}function Et(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}var Kt="https://script.google.com/a/macros/google.com/s/AKfycbwxxY5EhL3U1ZIEvs_y28FFeIFr7rMfSzNIljclqPd9Mk58-gx7pBRfZ8pQmXt2P1IMjw/exec",Tt="cw_data_broadcast",Yt="cw_data_tips",yo=["Processando sua solicita\xE7\xE3o...","Dica: Mantenha suas notas organizadas.","Aguarde um momento...","Quase l\xE1..."];function Xt(e){return new Promise((t,n)=>{let o="cw_cb_"+Math.round(1e4*Math.random()),s=document.createElement("script");window[o]=r=>{document.body.removeChild(s),delete window[o],t(r)},s.src=`${Kt}?op=${e}&callback=${o}&t=${Date.now()}`,s.onerror=()=>{document.body.removeChild(s),delete window[o],n(new Error("JSONP Load Error"))},document.body.appendChild(s)})}var Be={fetchTips:async()=>{try{console.log("\u{1F4E5} Baixando dicas via JSONP...");let e=await Xt("tips");e&&e.tips&&Array.isArray(e.tips)&&(localStorage.setItem(Yt,JSON.stringify(e.tips)),console.log("\u2705 Dicas atualizadas:",e.tips.length))}catch(e){console.warn("TechSol: Erro ao baixar dicas (Offline).",e)}},fetchData:async()=>{try{console.log("\u{1F4E5} Baixando Broadcasts via JSONP...");let e=await Xt("broadcast");if(e&&e.broadcast)return localStorage.setItem(Tt,JSON.stringify(e.broadcast)),console.log("\u2705 Broadcasts atualizados:",e.broadcast.length),e}catch(e){console.warn("TechSol: Erro ao buscar Broadcasts.",e)}return{broadcast:JSON.parse(localStorage.getItem(Tt)||"[]")}},getCachedBroadcasts:()=>JSON.parse(localStorage.getItem(Tt)||"[]"),getRandomTip:()=>{let e=yo,t=localStorage.getItem(Yt);if(t)try{e=JSON.parse(t)}catch{}return e[Math.floor(Math.random()*e.length)]},logUsage:(e,t="")=>{let o={op:"log",user:window._USER_ID||"agente_anonimo",action:e,meta:t};fetch(Kt,{method:"POST",mode:"no-cors",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(o)}).catch(s=>console.log("Log fail",s))}};var ne={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995",orange:"#F9AB00"},rt=e=>new Promise(t=>setTimeout(t,e));function Qt(e){let t="cw-command-center-style";if(!document.getElementById(t)){let h=document.createElement("style");h.id=t,h.innerHTML=`
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
    `;let s=document.createElement("div");if(s.className="cw-focus-backdrop",document.body.appendChild(s),document.body.appendChild(o),o.querySelector(".notes").onclick=h=>{h.stopPropagation(),e.toggleNotes()},o.querySelector(".email").onclick=h=>{h.stopPropagation(),e.toggleEmail()},o.querySelector(".script").onclick=h=>{h.stopPropagation(),e.toggleScript()},o.querySelector(".links").onclick=h=>{h.stopPropagation(),e.toggleLinks()},o.querySelector(".broadcast").onclick=h=>{h.stopPropagation();let f=h.currentTarget.querySelector(".cw-badge");f&&(f.style.transform="scale(0)",setTimeout(()=>f.remove(),200)),e.broadcastControl&&e.broadcastControl.toggle()},e.broadcastControl&&e.broadcastControl.hasUnread){let h=document.createElement("div");h.className="cw-badge",o.querySelector(".broadcast").appendChild(h)}(async function(){await rt(2800),o.classList.add("docked"),await rt(300);let f=o.querySelectorAll(".cw-btn");o.querySelectorAll(".cw-sep").forEach(E=>E.classList.add("visible"));for(let E=0;E<f.length;E++)f[E].classList.add("popped"),await rt(90);await rt(200),o.classList.add("system-check")})();let r=!1,a,l,p,g,v=3;o.onmousedown=h=>{if(h.target.closest("button"))return;h.preventDefault(),a=h.clientX,l=h.clientY;let f=o.getBoundingClientRect();p=f.left,g=f.top,document.addEventListener("mousemove",u),document.addEventListener("mouseup",O)};function u(h){let f=h.clientX-a,y=h.clientY-l;!r&&Math.sqrt(f*f+y*y)>v&&(r=!0,o.style.transition="none"),r&&(o.style.left=`${p+f}px`,o.style.top=`${g+y}px`,o.style.right="auto",o.style.bottom="auto",o.style.transform="none")}function O(h){if(document.removeEventListener("mousemove",u),document.removeEventListener("mouseup",O),r){r=!1,o.style.transition="left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s ease";let f=window.innerWidth,y=window.innerHeight,E=o.getBoundingClientRect(),I=E.left+E.width/2,R;I<f/2?(R=24,o.classList.remove("side-right"),o.classList.add("side-left")):(R=f-E.width-24,o.classList.remove("side-left"),o.classList.add("side-right"));let j=E.top;j<24&&(j=24),j>y-E.height-24&&(j=y-E.height-24),o.style.left=`${R}px`,o.style.top=`${j}px`}else{let f=h.target.closest("button");f&&(f.style.transform="scale(0.9)",setTimeout(()=>f.style.transform="",150))}}}function Xe(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop");if(!e)return()=>{};let n=document.createElement("div");n.className="cw-center-stage",n.innerHTML=`
        <div class="cw-center-dots">
            <span></span><span></span><span></span>
        </div>
        <div class="cw-center-text">${Be.getRandomTip()}</div>
        <div class="cw-center-success">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
    `,e.appendChild(n);let o=Date.now();return e.classList.add("processing-center"),t&&t.classList.add("active"),function(){let r=Date.now()-o,a=Math.max(0,2e3-r);setTimeout(()=>{let l=n.querySelector(".cw-center-dots"),p=n.querySelector(".cw-center-text"),g=n.querySelector(".cw-center-success");l&&(l.style.display="none"),p&&(p.style.display="none"),g&&g.classList.add("show"),e.classList.add("success"),setTimeout(()=>{e.classList.remove("processing-center"),setTimeout(()=>{n.remove(),e.classList.remove("success"),t&&t.classList.remove("active")},400)},1e3)},a)}}function Jt(e){let t=document.createElement("div");t.className="cw-step-scenarios";let n=document.createElement("div");Object.assign(n.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let o=document.createElement("div");Object.assign(o.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"40px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s ease"}),o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>";let s=null;Object.entries(Ce).forEach(([a,l])=>{let p=document.createElement("div");p.textContent=a,Object.assign(p.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",display:"flex",alignItems:"center",gap:"6px"}),p.onmouseenter=()=>{s!==l&&(o.style.background="#fff",o.style.borderColor="#1a73e8",o.style.color="#202124",o.textContent=`"${l.substring(0,120)}${l.length>120?"...":""}"`),s!==l&&(p.style.background="#f1f3f4")},p.onmouseleave=()=>{s!==l&&(s||(o.style.background="#f8f9fa",o.style.borderColor="#dadce0",o.style.color="#5f6368",o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>"),p.style.background="#ffffff")},p.onclick=()=>{J.playClick(),s===l?(s=null,r(),e("")):(s=l,r(),p.style.transform="scale(0.95)",setTimeout(()=>p.style.transform="scale(1)",150),e(l))},n.appendChild(p)});function r(){Array.from(n.children).forEach(a=>{Ce[a.textContent]===s?(a.style.background="#e8f0fe",a.style.borderColor="#1a73e8",a.style.color="#1967d2",a.style.fontWeight="500"):(a.style.background="#ffffff",a.style.borderColor="#dadce0",a.style.color="#3c4043",a.style.fontWeight="400")})}return t.appendChild(n),t.appendChild(o),t}var Zt=e=>new Promise(t=>setTimeout(t,e));function lt(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>e.dispatchEvent(new MouseEvent(n,t)))}function kt(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let n=document.createRange();n.selectNodeContents(t);let o=window.getSelection();o.removeAllRanges(),o.addRange(n);try{document.execCommand("copy")}catch{oe("Falha ao copiar",{error:!0})}o.removeAllRanges(),document.body.removeChild(t)}function to(e){["input","change","keydown","keyup"].forEach(n=>{let o=new Event(n,{bubbles:!0,cancelable:!0});e.dispatchEvent(o)})}function eo(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function oo(){console.log("Iniciando processo de Nova Nota...");let e=eo(),t=e.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(a=>a.innerText.trim()==="description");if(o){let a=o.closest("material-fab")||o.closest("material-button");a?(a.style&&(a.style.display="block",a.style.visibility="visible"),lt(a)):lt(o)}else{let a=document.querySelector("material-fab-speed-dial");if(a){let l=a.querySelector(".trigger");l?(l.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),lt(l)):a.click(),await Zt(800);let g=Array.from(document.querySelectorAll("i.material-icons-extended")).find(v=>v.innerText.trim()==="description");g&&lt(g)}}let s=null,r=0;for(;!s&&r<20;){await Zt(300);let a=eo();if(a.length>t)s=a.find(l=>!e.includes(l)),s||(s=a[a.length-1]);else if(r>10){let l=a.filter(p=>p.offsetParent!==null);l.length>0&&(s=l[l.length-1])}r++}return s}var q={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},Ee="cubic-bezier(0.25, 0.8, 0.25, 1)",vo={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${q.border}`,backgroundColor:q.bgInput,fontSize:"14px",color:q.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${Ee}, box-shadow 0.2s ${Ee}, background-color 0.2s`,outline:"none"},Yo={...vo,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},Xo={fontSize:"13px",fontWeight:"700",color:q.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},Ko={display:"block",fontSize:"13px",fontWeight:"600",color:q.text,marginBottom:"8px",marginTop:"16px"},Qo={fontSize:"12px",color:q.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},Jo={fontSize:"12px",color:q.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},Zo={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:q.text,cursor:"pointer",padding:"12px 14px",backgroundColor:q.surface,border:`1px solid ${q.border}`,borderRadius:"12px",transition:`all 0.2s ${Ee}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},Ot={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:q.primary},en={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:q.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${Ee}, box-shadow 0.2s ${Ee}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},tn={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${q.primary}`,color:q.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${Ee}`},on={background:"transparent",border:`1px solid ${q.border}`,borderRadius:"20px",color:q.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${Ee}`,fontFamily:"'Google Sans', 'Roboto'"};var nn={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:q.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},an={fontSize:"13px",fontWeight:"700",color:q.primary,minWidth:"20px",textAlign:"center"},sn={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${q.border}`,backgroundColor:q.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${Ee}, box-shadow 0.2s ${Ee}`},rn={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${q.bgInput}`},ln={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${q.border}`,backgroundColor:q.surface,color:q.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${Ee}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},cn={backgroundColor:q.primaryBg,color:q.primary,borderColor:q.primary,fontWeight:"600"},dn={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:q.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},pn={borderTop:`1px solid ${q.bgInput}`,paddingTop:"20px",marginTop:"16px"};var un={maxHeight:"240px",overflowY:"auto",border:`1px solid ${q.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:q.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},mn={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${q.bgInput}`,cursor:"pointer",fontSize:"13px",color:q.text,transition:"background 0.1s",userSelect:"none"};var So={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},Co={fontSize:"12px",color:"#e37400",marginTop:"4px"},wo={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},Ao={display:"flex",gap:"15px",marginBottom:"10px"};function no(){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,So);let t=document.createElement("label");t.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(t.style,St,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,Ao);let o=document.createElement("input");o.type="radio",o.name="ts_usage_mod",o.value="Sim",Object.assign(o.style,Ot);let s=document.createElement("label");s.textContent="Sim";let r=document.createElement("div");Object.assign(r.style,{display:"flex",alignItems:"center"}),r.appendChild(o),r.appendChild(s);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="N\xE3o",a.checked=!0,Object.assign(a.style,Ot);let l=document.createElement("label");l.textContent="N\xE3o";let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center"}),p.appendChild(a),p.appendChild(l),n.appendChild(r),n.appendChild(p);let g=document.createElement("div");g.style.display="block";let v=document.createElement("label");v.textContent="Qual foi o Motivo?",Object.assign(v.style,St,{fontSize:"12px"});let u=document.createElement("input");u.type="text",Object.assign(u.style,wo);let O=document.createElement("div");O.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(O.style,Co),g.appendChild(v),g.appendChild(u),g.appendChild(O),e.appendChild(t),e.appendChild(n),e.appendChild(g),o.onchange=()=>{g.style.display="none"},a.onchange=()=>{g.style.display="block"};function h(E,I){if(e.style.display="none",!E||E.includes("Education")||!I||I.length===0)return;let R=I.some(i=>i.includes("enhanced")||i==="ec_google_ads"),j=I.some(i=>(i.includes("conversion")||i.includes("ads"))&&!i.includes("enhanced")),V=I.some(i=>i.includes("ga4")||i.includes("analytics")||i.includes("ua")),m=I.some(i=>i.includes("merchant")||i.includes("gmc")||i.includes("shopping"));(R||j&&!V&&!m)&&(e.style.display="block")}function f(){if(e.style.display==="none")return"";let E=`<br><b>Utilizou Tag Support?</b> ${o.checked?"Sim":"N\xE3o"}`;return a.checked&&u.value.trim()!==""&&(E+=`<br><b>Motivo:</b> ${u.value}`),E+="<br>",E}function y(){e.style.display="none",a.checked=!0,o.checked=!1,g.style.display="block",u.value=""}return{element:e,updateVisibility:h,getOutput:f,reset:y}}var z={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},je={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function ao(e){let t={},n="implementation";function o(m){let b=m.toLowerCase();return b.includes("ads")||b.includes("conversion")||b.includes("remarketing")?z.brands.ads:b.includes("ga4")||b.includes("analytics")?z.brands.ga4:b.includes("gtm")||b.includes("tag manager")||b.includes("container")?z.brands.gtm:b.includes("merchant")||b.includes("shopping")||b.includes("feed")?z.brands.gmc:z.brands.default}let s=Object.entries(_e).filter(([m,b])=>b.popular),r={};Object.entries(_e).forEach(([m,b])=>{if(b.popular)return;let i=o(b.name);r[i.label]||(r[i.label]={brand:i,tasks:[]}),r[i.label].tasks.push({key:m,...b})});let a="cw-zen-tasks";if(!document.getElementById(a)){let m=document.createElement("style");m.id=a,m.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column; height: 100%; width: calc(100% + 32px); margin: -16px;
                font-family: ${z.font}; background: ${z.bg}; position: relative; overflow: hidden;
            }
            
            /* SCROLL AREA */
            .cw-zen-content { flex: 1; overflow-y: auto; padding-bottom: 80px; } /* Espa\xE7o para o Status Bar */

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${z.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${z.white}; 
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
                font-size: 12px; font-weight: 500; color: ${z.textMain}; line-height: 1.2; 
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
                color: ${z.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${z.border}; border-radius: 10px; background: ${z.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${z.blue}; box-shadow: 0 0 0 3px ${z.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${z.border}; border-radius: 10px; background: ${z.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${z.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${z.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${z.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${z.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${z.blueLight}; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${z.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${z.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${z.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${z.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${z.border};
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${z.shadowFloat}; z-index: 10;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${z.textMain}; }
            
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
                font-family: ${z.font}; font-size: 15px; font-weight: 600; color: ${z.textMain};
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
                border-color: ${z.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${z.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${z.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${z.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 10px; font-weight: 700; color: ${z.textSub};
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
        `,document.head.appendChild(m)}let l=document.createElement("div");l.className="cw-zen-container";let p=document.createElement("div");Object.assign(p.style,{display:"none"});let g=document.createElement("div");g.className="cw-screens-container",p.appendChild(g),l.innerHTML=`
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
    `;let v=l.querySelector(".cw-hero-grid"),u=l.querySelector(".cw-acc-container"),O=l.querySelector(".cw-results-container"),h=l.querySelector(".cw-search-input"),f=l.querySelector(".cw-status-bar"),y=l.querySelector(".cw-status-text"),E=l.querySelector(".cw-footer-icons");s.forEach(([m,b])=>{let i=o(b.name),d=document.createElement("div");d.className="cw-hero-card",d.id=`hero-${m}`,d.style.setProperty("--hero-color",i.color),d.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${je[i.icon]}</div>
                <div class="cw-hero-label">${b.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,d.onclick=C=>{if(C.target.closest(".cw-step-btn"))return;let c=t[m]?t[m].count:0;R(m,c>0?-c:1,b)},d.querySelector(".minus").onclick=()=>R(m,-1,b),d.querySelector(".plus").onclick=()=>R(m,1,b),d.dataset.color=i.color,v.appendChild(d)});function I(m,b){let i=o(b.name),d=document.createElement("div");return d.className="cw-task-item",d.dataset.id=m,d.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${i.bg}; color:${i.color}">
                    ${je[i.icon]||je.default}
                </div>
                <div class="cw-task-label">${b.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,d.onclick=C=>{if(C.target.closest(".cw-step-btn"))return;let c=t[m]?t[m].count:0;R(m,c>0?-c:1,b)},d.querySelector(".minus").onclick=()=>R(m,-1,b),d.querySelector(".plus").onclick=()=>R(m,1,b),d}Object.entries(r).forEach(([m,b])=>{let i=document.createElement("div");i.className="cw-acc-group";let d=document.createElement("div");d.className="cw-acc-header",d.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${b.brand.color}"></div>
                ${m}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,d.onclick=()=>{u.querySelectorAll(".cw-acc-group.open").forEach(c=>{c!==i&&c.classList.remove("open")}),i.classList.toggle("open")};let C=document.createElement("div");C.className="cw-acc-body",b.tasks.forEach(c=>{let x=I(c.key,c);C.appendChild(x)}),i.appendChild(d),i.appendChild(C),u.appendChild(i)});function R(m,b,i){t[m]||(t[m]={count:0,data:i,brand:o(i.name)}),t[m].count+=b,t[m].count<=0&&delete t[m],j(),V(),e&&e()}function j(){s.forEach(([C])=>{let c=v.querySelector(`#hero-${C}`);if(!c)return;let x=t[C];x?(c.classList.add("active"),c.querySelector(".cw-step-val").textContent=x.count,c.querySelector(".cw-step-val").style.color=c.dataset.color):c.classList.remove("active")}),l.querySelectorAll(".cw-task-item").forEach(C=>{let c=C.dataset.id,x=t[c];x?(C.classList.add("selected"),C.querySelector(".cw-step-val").textContent=x.count):C.classList.remove("selected")});let b=Object.keys(t),i=0,d=[];if(b.forEach(C=>{let c=t[C];i+=c.count;for(let x=0;x<c.count;x++)d.length<6&&d.push(c.brand)}),i>0){f.classList.add("visible");let C=i>1?"A\xE7\xF5es":"A\xE7\xE3o",c=i>1?"definidas":"definida";y.textContent=`${i} ${C} ${c}`,E.innerHTML="",d.forEach(x=>{let k=document.createElement("div");k.className="cw-mini-icon",k.innerHTML=je[x.icon]||je.default;let S=k.querySelector("svg");S&&(S.style.width="14px",S.style.height="14px"),E.appendChild(k)})}else f.classList.remove("visible")}h.addEventListener("input",m=>{let b=m.target.value.toLowerCase();if(b.length>0){u.style.display="none",O.style.display="block",O.innerHTML="";let i=!1;Object.entries(_e).forEach(([d,C])=>{if(C.name.toLowerCase().includes(b)){i=!0;let c=I(d,C);t[d]&&(c.classList.add("selected"),c.querySelector(".cw-step-val").textContent=t[d].count),O.appendChild(c)}}),i||(O.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else u.style.display="block",O.style.display="none"});function V(){g.innerHTML="";let m=Object.keys(t),b=!1,i=document.getElementById("sub-status"),d="implementation";if(i&&i.value.toLowerCase().includes("education")&&(d="education"),m.length===0){g.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}if(m.length===0){g.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}let C=document.createElement("div");C.className="cw-info-banner",C.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Todos os Screenshots s\xE3o baseados na descri\xE7\xE3o do 
                <a href="https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/" target="_blank" class="cw-info-link">Win Criteria</a>.
            </span>
        `,g.appendChild(C),m.forEach(c=>{let x=t[c].data,k=t[c].count,S=t[c].brand,T=x.screenshots?x.screenshots[d]||[]:["Link da Evid\xEAncia"];if(T.length>0){b=!0;for(let F=1;F<=k;F++){let L=document.createElement("div");L.className="cw-screen-card",L.style.setProperty("--brand-color",S.color),L.style.setProperty("--brand-bg",S.bg),L.style.setProperty("--brand-shadow",S.color+"40");let N=document.createElement("div");N.className="cw-card-header";let B=document.createElement("div");B.className="cw-card-icon",B.innerHTML=je[S.icon]||je.default;let _=document.createElement("div");_.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let W=document.createElement("input");W.className="cw-card-title-input",W.id=`name-${c}-${F}`,W.value=`${x.name}${k>1?" #"+F:""}`,W.title="Clique para renomear esta task";let Y=document.createElement("span");Y.className="cw-edit-hint",Y.innerHTML="\u270E Renomear",_.appendChild(W),_.appendChild(Y),N.appendChild(B),N.appendChild(_),L.appendChild(N),T.forEach((Z,ae)=>{let ee=document.createElement("div");ee.className="cw-input-group";let ge=document.createElement("label");ge.className="cw-input-label",ge.textContent=Z.replace(/📷|:|•/g,"").trim();let ce=document.createElement("input");ce.className="cw-input-field",ce.id=`screen-${c}-${F}-${ae}`,ce.placeholder="Cole o link aqui...",ce.setAttribute("autocomplete","off"),ce.addEventListener("input",()=>{ce.value.trim().length>5?ce.classList.add("filled"):ce.classList.remove("filled")});let ue=document.createElement("div");ue.className="cw-input-check",ue.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',ee.appendChild(ge),ee.appendChild(ce),ee.appendChild(ue),L.appendChild(ee)}),g.appendChild(L)}}}),p.style.display=b?"block":"none"}return{selectionElement:l,screenshotsElement:p,updateSubStatus:()=>V(),getCheckedElements:()=>Object.keys(t).map(m=>({value:m,closest:()=>({querySelector:()=>({textContent:t[m].count})})})),toggleTask:(m,b=!0)=>{let i=t[m];b&&!i?R(m,1,_e[m]):!b&&i&&R(m,-i.count,_e[m])},setMode:m=>{n=m,V()},reset:()=>{for(let m in t)delete t[m];h.value="",u.style.display="block",O.style.display="none",j(),V()}}}function io(){let e="v3.6.0",t="bau",n="pt",o=!1,s=!1,r={input:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},textarea:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease",height:"100px",resize:"vertical"},h3:{fontSize:"14px",fontWeight:"600",color:"#202124",margin:"0 0 12px 0"},label:{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},checkboxLabel:{display:"flex",alignItems:"center",marginBottom:"10px",fontSize:"14px",fontWeight:"400",cursor:"pointer",padding:"8px",background:"#f8f9fa",borderRadius:"6px",transition:"background-color 0.2s ease, box-shadow 0.2s ease",userSelect:"none"},checkboxInput:{width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"},buttonBase:{flex:"1 1 0",padding:"10px 0",color:"#fff",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"500",cursor:"pointer",marginTop:"16px"},stepBlock:{borderTop:"1px solid #eee",paddingTop:"12px",marginTop:"12px"},radioContainer:{display:"flex",gap:"15px",marginBottom:"10px"},optionalBtn:{width:"100%",padding:"10px",background:"white",border:"1px dashed #1a73e8",color:"#1a73e8",borderRadius:"6px",cursor:"pointer",fontWeight:"500",fontSize:"13px",marginBottom:"10px",transition:"all 0.2s"},helpLink:{fontSize:"12px",color:"#1a73e8",textDecoration:"none",cursor:"pointer",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"color 0.2s"}},a=no(),l=ao(()=>{let D=l.getCheckedElements().map(A=>A.value);S&&S.value&&a.updateVisibility(S.value,D)}),p=document.createElement("div");p.id="autofill-popup",Object.assign(p.style,Se,{right:"100px",width:"400px",opacity:"0",pointerEvents:"none",transition:"width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease, transform 0.3s ease"}),p.style.transition+=", width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)";let v=we(p,"Case Notes Assistant",e,"Gera notas padronizadas automaticamente. Selecione o status, as tasks realizadas e preencha os detalhes para inserir no caso.",{popup:p,googleLine:null},()=>ft());p.appendChild(v);let u=document.createElement("div");Object.assign(u.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1"}),p.appendChild(u);let O=document.createElement("div");O.textContent="created by lucaste@",Object.assign(O.style,Ht),p.appendChild(O);let h=document.createElement("div");h.id="step-lang-type";let f=document.createElement("label");Object.assign(f.style,r.label),h.appendChild(f);let y=document.createElement("div");Object.assign(y.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let E=document.createElement("div");E.textContent="Portugu\xEAs",E.classList.add("no-drag"),Object.assign(E.style,me);let I=document.createElement("div");I.textContent="Espa\xF1ol",I.classList.add("no-drag"),Object.assign(I.style,me),E.onclick=()=>ut("pt"),I.onclick=()=>ut("es"),y.appendChild(E),y.appendChild(I),h.appendChild(y),u.appendChild(h);let R=document.createElement("div");R.id="step-0-case-type";let j=document.createElement("label");Object.assign(j.style,r.label),R.appendChild(j);let V=document.createElement("div");Object.assign(V.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let m=document.createElement("div");m.textContent="BAU",m.classList.add("no-drag"),Object.assign(m.style,me);let b=document.createElement("div");b.textContent="LM",b.classList.add("no-drag"),Object.assign(b.style,me),m.onclick=()=>pt("bau"),b.onclick=()=>pt("lm"),V.appendChild(m),V.appendChild(b),R.appendChild(V),u.appendChild(R);let i=document.createElement("div");i.id="step-1-selection";let d=document.createElement("label");Object.assign(d.style,r.label);let C=document.createElement("select");C.id="main-status",Object.assign(C.style,Ze),C.innerHTML='<option value="">-- Selecione --</option><option value="NI">NI - Need Info</option><option value="SO">SO - Solution Offered</option><option value="IN">IN - Inactive</option><option value="AS">AS - Assigned</option>';let c=document.createElement("div");Object.assign(c.style,{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginTop:"16px",marginBottom:"8px"});let x=document.createElement("label");Object.assign(x.style,r.label,{marginTop:"0",marginBottom:"0"});let k=document.createElement("a");k.target="_blank",k.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> Guia de Substatus',Object.assign(k.style,r.helpLink),c.appendChild(x),c.appendChild(k);let S=document.createElement("select");S.id="sub-status",Object.assign(S.style,Ze),S.disabled=!0,i.appendChild(d),i.appendChild(C),i.appendChild(c),i.appendChild(S),u.appendChild(i);let T=document.createElement("div");T.id="step-1-1-portugal",Object.assign(T.style,r.stepBlock,{display:"none"});let F=document.createElement("label");Object.assign(F.style,r.label),T.appendChild(F);let L=document.createElement("div");Object.assign(L.style,r.radioContainer);let N=document.createElement("div");Object.assign(N.style,{display:"flex",alignItems:"center"});let B=document.createElement("input");B.type="radio",B.name="portugal-group",B.value="sim",Object.assign(B.style,r.checkboxInput);let _=document.createElement("label");_.htmlFor="portugal-sim",Object.assign(_.style,{cursor:"pointer"}),N.appendChild(B),N.appendChild(_);let W=document.createElement("div");Object.assign(W.style,{display:"flex",alignItems:"center"});let Y=document.createElement("input");Y.type="radio",Y.name="portugal-group",Y.value="nao",Y.checked=!0,Object.assign(Y.style,r.checkboxInput);let Z=document.createElement("label");Z.htmlFor="portugal-nao",Object.assign(Z.style,{cursor:"pointer"}),W.appendChild(Y),W.appendChild(Z),L.appendChild(N),L.appendChild(W),T.appendChild(L),u.appendChild(T);function ae(w){o=w,w?ee.style.display="block":ee.style.display="none"}B.onchange=()=>ae(!0),Y.onchange=()=>ae(!1);let ee=document.createElement("div");ee.id="step-1-2-consent",Object.assign(ee.style,r.stepBlock,{display:"none"});let ge=document.createElement("label");Object.assign(ge.style,r.label),ee.appendChild(ge);let ce=document.createElement("div");Object.assign(ce.style,r.radioContainer);let ue=document.createElement("div");Object.assign(ue.style,{display:"flex",alignItems:"center"});let xe=document.createElement("input");xe.type="radio",xe.name="consent-group",xe.value="Sim",xe.checked=!0,Object.assign(xe.style,r.checkboxInput);let ie=document.createElement("label");ie.htmlFor="consent-sim",Object.assign(ie.style,{cursor:"pointer"}),ue.appendChild(xe),ue.appendChild(ie);let K=document.createElement("div");Object.assign(K.style,{display:"flex",alignItems:"center"});let Te=document.createElement("input");Te.type="radio",Te.name="consent-group",Te.value="N\xE3o",Object.assign(Te.style,r.checkboxInput);let Me=document.createElement("label");Me.htmlFor="consent-nao",Object.assign(Me.style,{cursor:"pointer"}),K.appendChild(Te),K.appendChild(Me),ce.appendChild(ue),ce.appendChild(K),ee.appendChild(ce),u.appendChild(ee);let Le=document.createElement("div");Le.id="step-1-5-snippets",Object.assign(Le.style,r.stepBlock,{display:"none"});let nt=document.createElement("h3");Object.assign(nt.style,r.h3),nt.textContent="Cen\xE1rios Comuns";let ye=Jt(w=>{let D=document.querySelector("textarea");D&&(D.value=w,D.dispatchEvent(new Event("input")),D.style.transition="background-color 0.2s",D.style.backgroundColor="#e8f0fe",setTimeout(()=>D.style.backgroundColor="#fff",300))});ye.id="snippet-container",Le.appendChild(nt),Le.appendChild(ye),u.appendChild(Le);let ve=document.createElement("div");ve.id="step-2-tasks",Object.assign(ve.style,r.stepBlock,{display:"none"});let be=document.createElement("button");be.textContent="+ Gostaria de selecionar uma task?",Object.assign(be.style,r.optionalBtn),be.onmouseover=()=>{be.style.background="#e8f0fe"},be.onmouseout=()=>{be.style.background="white"};let He=document.createElement("h3");Object.assign(He.style,r.h3);let _t=document.createElement("div");_t.id="task-checkboxes-container",ve.appendChild(be),ve.appendChild(_t),ve.appendChild(He),ve.appendChild(l.selectionElement),u.appendChild(ve);let ke=document.createElement("div");ke.id="step-3-form",Object.assign(ke.style,r.stepBlock,{display:"none"});let dt=document.createElement("h3");Object.assign(dt.style,r.h3),ke.appendChild(dt);let Ne=document.createElement("div");Ne.id="dynamic-form-fields-container",ke.appendChild(Ne),ke.appendChild(a.element),ke.appendChild(l.screenshotsElement),u.appendChild(ke);let De=document.createElement("div");De.id="step-4-email",Object.assign(De.style,{display:"none",marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #eee"});let Ge=document.createElement("label");Ge.style.display="flex",Ge.style.alignItems="center",Ge.style.cursor="pointer",Ge.style.fontSize="14px";let Fe=document.createElement("input");Fe.type="checkbox",Fe.checked=!0,Object.assign(Fe.style,r.checkboxInput),Ge.appendChild(Fe),Ge.appendChild(document.createTextNode("Preencher email automaticamente?")),De.appendChild(Ge),u.appendChild(De);let Ve=document.createElement("div");Object.assign(Ve.style,{display:"none",gap:"8px",padding:"0"}),u.appendChild(Ve);let Ke=document.createElement("button");Object.assign(Ke.style,r.buttonBase,{backgroundColor:"#5f6368"}),Ke.textContent="Copiar";let Qe=document.createElement("button");Object.assign(Qe.style,r.buttonBase,{backgroundColor:"#1a73e8"}),Qe.textContent="Preencher",Ve.appendChild(Ke),Ve.appendChild(Qe);let Je=document.createElement("div");Object.assign(Je.style,We),Je.className="no-drag",Je.title="Redimensionar",p.appendChild(Je),Ye(p,Je),document.body.appendChild(p);function pt(w){t=w;let D=et();Object.assign(m.style,me),Object.assign(b.style,me),w==="bau"?(Object.assign(m.style,D),k.href="https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657"):(Object.assign(b.style,D),k.href="https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243"),S.value&&S.dispatchEvent(new Event("change"))}function P(w){try{if(Ie&&Ie[n]&&Ie[n][w])return Ie[n][w];if(Ie&&Ie.pt&&Ie.pt[w])return Ie.pt[w]}catch{}return w}function uo(){f.textContent=P("idioma"),j.textContent=P("fluxo"),d.textContent=P("status_principal"),x.textContent=P("substatus"),nt.textContent=P("cenarios_comuns"),He.textContent=P("selecione_tasks"),dt.textContent=P("preencha_detalhes"),Ke.textContent=P("copiar"),Qe.textContent=P("preencher"),C.querySelector('option[value=""]')&&(C.querySelector('option[value=""]').textContent=P("select_status")),S.querySelector('option[value=""]')&&(S.querySelector('option[value=""]').textContent=P("select_substatus")),F.textContent=P("caso_portugal"),_.textContent=P("sim"),Z.textContent=P("nao"),ge.textContent=P("consentiu_gravacao"),ie.textContent=P("sim"),Me.textContent=P("nao"),Ne.querySelectorAll("label").forEach(w=>{let D=w.nextElementSibling.id.replace("field-",""),A=P(D.toLowerCase());A!==D.toLowerCase()?w.textContent=A:w.textContent=D.replace(/_/g," ").replace(/\b\w/g,H=>H.toUpperCase())+":"}),be.textContent="+ "+(n==="pt"?"Gostaria de selecionar uma task?":"Quisiera seleccionar una tarea?")}function ut(w){n=w;let D=et();Object.assign(E.style,me),Object.assign(I.style,me),w==="pt"?(Object.assign(E.style,D),T.style.display="block",ae(o)):(Object.assign(I.style,D),T.style.display="none",ee.style.display="none"),uo(),S.value&&S.dispatchEvent(new Event("change"))}function mt(w){(w.value.trim()===""||w.value.trim()==="\u2022")&&(w.value="\u2022 "),w.onkeydown=function(D){if(D.key==="Enter"){D.preventDefault();let A=this.selectionStart,H=this.selectionEnd,te=this.value,le=te.lastIndexOf(`
`,A-1)+1,he=te.substring(le,A),de=he.trim()==="\u2022"||he.trim()===""?`
`:`
\u2022 `;this.value=te.substring(0,A)+de+te.substring(H),this.selectionStart=this.selectionEnd=A+de.length}else if(D.key==="Backspace"){let A=this.selectionStart;if(A===this.selectionEnd&&A>0){let H=this.value.substring(0,A);H.endsWith(`
\u2022 `)?(D.preventDefault(),this.value=H.substring(0,A-3)+this.value.substring(this.selectionEnd),this.selectionStart=this.selectionEnd=A-3):H==="\u2022 "&&(D.preventDefault(),this.value="",this.selectionStart=this.selectionEnd=0)}}}}function gt(){let w=typeof ye<"u"?ye:document.getElementById("snippet-container");if(!w)return;let D=w.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'),A={},H=new Set;D.forEach(X=>{let $=X.id,G=Ce[$];if(G)for(let M in G)M==="linkedTask"?H.add(G.linkedTask):M!=="type"&&(A[M]||(A[M]=[]),A[M].includes(G[M])||A[M].push(G[M]))});let te=new Set;Object.values(Ce).forEach(X=>{Object.keys(X).forEach($=>{$!=="linkedTask"&&$!=="type"&&te.add($)})}),te.forEach(X=>{let $=document.getElementById(X);if($){let G=A[X]||[],M="";ot.includes(X.replace("field-",""))?(M=G.map(U=>U.startsWith("\u2022 ")?U:"\u2022 "+U).join(`
`),M===""?M="\u2022 ":M.endsWith(`
\u2022 `)||(M+=`
\u2022 `)):M=G.join(`

`),M.trim()!=="\u2022"&&M.trim()!==""?$.value=M:ot.includes(X.replace("field-",""))?$.value="\u2022 ":$.value="",$.tagName==="TEXTAREA"&&typeof mt=="function"&&mt($)}});let le=new Set,he=new Set;w.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(X=>{let $=Ce[X.id];$&&$.linkedTask&&(X.checked?le.add($.linkedTask):he.add($.linkedTask))}),he.forEach(X=>{le.has(X)||l.toggleTask(X,!1)}),le.forEach(X=>{l.toggleTask(X,!0)})}C.onchange=()=>{let w=C.value;if(bt(1.5),S.innerHTML=`<option value="">${P("select_substatus")}</option>`,!w){S.disabled=!0;return}for(let D in tt){let A=tt[D];if(A.status===w){let H=document.createElement("option");H.value=D,H.textContent=A.name,S.appendChild(H)}}S.disabled=!1},S.onchange=()=>{let w=S.value;if(bt(1.5),!w)return;l.updateSubStatus(w);let D=tt[w];ye.innerHTML="";let A=(G,M,U)=>{let se=document.createElement("label");Object.assign(se.style,r.checkboxLabel),se.onmouseover=()=>se.style.backgroundColor="#e8eaed",se.onmouseout=()=>se.style.backgroundColor="#f8f9fa";let Q=document.createElement("input");return Q.type=M,Q.id=G.id,Object.assign(Q.style,r.checkboxInput),se.appendChild(Q),se.appendChild(document.createTextNode(` ${G.text}`)),U.appendChild(se),Q},H=[],te="radio";if(w==="NI_Awaiting_Inputs")H=[{id:"quickfill-ni-inicio-manual",text:"In\xEDcio 2/6 (Manual)"},{id:"quickfill-ni-cms-access",text:"In\xEDcio 2/6 (ADV sem acesso ao CMS)"},{id:"quickfill-ni-followup-bau",text:"Follow-up 2/6 (BAU)"},{id:"quickfill-ni-followup-lm",text:"Follow-up 2/6 (LM)"}];else if(w.startsWith("SO_"))te="checkbox",H=[{id:"quickfill-gtm-install",text:"Instala\xE7\xE3o do GTM"},{id:"quickfill-whatsapp",text:"Convers\xE3o de WhatsApp"},{id:"quickfill-form",text:"Convers\xE3o de Formul\xE1rio (Padr\xE3o)"},{id:"quickfill-ecw4-close",text:"Fechamento ECW4 (P\xF3s 7 dias)"}];else if(w.startsWith("AS_")){te="checkbox";let G=document.createElement("label");G.textContent=P("cenarios_comuns"),Object.assign(G.style,r.label),ye.appendChild(G),H=[{id:"quickfill-as-no-show",text:"Anunciante n\xE3o compareceu (respondeu e-mail)"},{id:"quickfill-as-insufficient-time",text:"Tempo insuficiente"},{id:"quickfill-as-no-access",text:"Anunciante sem acessos necess\xE1rios"}]}else w.startsWith("IN_")&&(H=[{id:"quickfill-in-nrp-bau",text:"NRP (BAU - 3 tentativas)"},{id:"quickfill-in-nrp-lm",text:"NRP (LM - Sem tentativas)"},{id:"quickfill-in-no-show-bau",text:"No-Show (BAU - 3 tentativas)"},{id:"quickfill-in-2-6-final",text:"Finaliza\xE7\xE3o 2/6 (Sem Resposta)"},{id:"quickfill-in-manual",text:"Outro (Manual)"}]);let le=H.filter(G=>{let M=Ce[G.id];return!M.type||M.type==="all"||M.type===t});le.forEach((G,M)=>{let U=A(G,te,ye);te==="radio"&&(U.name="scenario-radio-group",M===0&&(U.checked=!0))}),le.length>0&&(Le.style.display="block"),D.requiresTasks?(be.style.display="none",He.style.display="block",l.selectionElement.style.display="block",ve.style.display="block"):(be.style.display="block",He.style.display="none",l.selectionElement.style.display="none",ve.style.display="block"),Ne.innerHTML="";let he=D.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(he)].forEach(G=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(G))return;let M=G.slice(1,-1),U=document.createElement("label"),se=P(M.toLowerCase());U.textContent=se!==M.toLowerCase()?se:M.replace(/_/g," ").replace(/\b\w/g,re=>re.toUpperCase())+":",Object.assign(U.style,r.label);let Q;ot.includes(M)?(Q=document.createElement("textarea"),Object.assign(Q.style,r.textarea),Q.classList.add("bullet-textarea"),mt(Q)):wt.includes(M)?(Q=document.createElement("textarea"),Object.assign(Q.style,r.textarea)):(Q=document.createElement("input"),Q.type="text",Object.assign(Q.style,r.input),M==="REASON_COMMENTS"&&(w.startsWith("NI_")||w.startsWith("IN_"))&&(Object.assign(U.style,{display:"none"}),Object.assign(Q.style,{display:"none"}))),M==="ON_CALL"&&t==="lm"&&(Object.assign(U.style,{display:"none"}),Object.assign(Q.style,{display:"none"}),Q.value="N/A"),Q.id=`field-${M}`,Ne.appendChild(U),Ne.appendChild(Q)});let X=ye.querySelectorAll('input[type="checkbox"], input[type="radio"]');X.length>0&&(X.forEach(G=>{G.removeEventListener("change",gt),G.addEventListener("change",gt)}),gt()),ke.style.display="block",it[w]?De.style.display="block":De.style.display="none",Ve.style.display="flex";let $=l.getCheckedElements().map(G=>G.value);a.updateVisibility(w,$)},be.onclick=()=>{be.style.display="none",He.style.display="block",l.selectionElement.style.display="block"};function Rt(){let w=S.value;if(!w)return null;let A=tt[w].template.replace(/\n/g,"<br>"),H='style="margin-bottom: 12px; padding-left: 30px;"',te=[],le="",he=l.getCheckedElements();he.length>0&&he.forEach($=>{let G=$.value,M=_e[G],U=$.closest().querySelector(".stepper-count"),se=U?parseInt(U.textContent):1;se>1?te.push(`${M.name} (x${se})`):te.push(M.name)});let de=l.screenshotsElement;if(de){let $=Array.from(de.querySelectorAll('input[id^="name-"]'));$.length>0&&$.forEach(G=>{let M=G.value,U=G.closest(".cw-screen-card");if(U){let se=U.querySelectorAll('input[id^="screen-"]'),Q=!1,re="";se.forEach(fe=>{let Mt=fe.closest(".cw-input-group"),Lt=Mt?Mt.querySelector(".cw-input-label"):null,mo=Lt?Lt.textContent:"Evid\xEAncia",Dt=fe.value.trim(),go=Dt?` ${Dt}`:"";re+=`<li>${mo} -${go}</li>`,Q=!0}),Q&&(le+=`<b>${M}</b>`,le+=`<ul ${H}>${re}</ul>`)}})}if(A.includes("{TAGS_IMPLEMENTED}")?A=A.replace(/{TAGS_IMPLEMENTED}/g,te.join(", ")||"N/A"):te.length>0&&(A+=`<br><b>Tags:</b> ${te.join(", ")}<br>`),A.includes("{SCREENSHOTS_LIST}")?A=A.replace(/{SCREENSHOTS_LIST}/g,le?`${le}`:"N/A"):le!==""&&(A+=`<br>${le}`),n==="pt"&&o){let $=xe.checked?P("sim"):P("nao");A=A.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${P("consentiu_gravacao")}</b> ${$}<br><br>`),A=A.replace(/{CASO_PORTUGAL}/g,`<br><b>${P("caso_portugal")}</b> ${P("sim")}<br>`)}else n==="pt"&&!o?(A=A.replace(/{CASO_PORTUGAL}/g,`<br><b>${P("caso_portugal")}</b> ${P("nao")}<br>`),A=A.replace(/{CONSENTIU_GRAVACAO}/g,"")):(A=A.replace(/{CASO_PORTUGAL}/g,""),A=A.replace(/{CONSENTIU_GRAVACAO}/g,""));return Ne.querySelectorAll("input, textarea").forEach($=>{let G=$.id.replace("field-",""),M=new RegExp(`{${G}}`,"g"),U=$.value;if(G==="REASON_COMMENTS"&&(w.startsWith("NI_")||w.startsWith("IN_"))){let re=ye.querySelector('input[type="radio"]:checked');re&&Ce[re.id]&&(U=Ce[re.id]["field-REASON_COMMENTS"])}if(ot.includes(G)&&U.trim()!==""){let re=U.split(`
`).map(fe=>fe.trim()).filter(fe=>fe!==""&&fe!=="\u2022").map(fe=>fe.startsWith("\u2022 ")?fe.substring(2):fe).map(fe=>`<li>${fe}</li>`).join("");U=re?`<ul ${H}>${re}</ul>`:""}else wt.includes(G)?U=U.split(`
`).filter(re=>re.trim()!=="").map(re=>`<p style="margin: 0 0 8px 0;">${re}</p>`).join(""):$.tagName==="TEXTAREA"&&(U=U.replace(/\n/g,"<br>"));let se=U.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(se===""||se==="\u2022"||se.toLowerCase()==="n/a"){let re=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${G}\\}(?:<br>\\s*)?`,"gi");re.test(A)?A=A.replace(re,""):A=A.replace(M,"")}else A=A.replace(M,U.replace(/\$/g,"$$$$"))}),A=A.replace(/{([A-Z0-9_]+)}/g,""),A=A.replace(/(<br>){3,}/g,"<br><br>"),typeof a<"u"&&a.getOutput&&(A+=a.getOutput()),A}Ke.onclick=()=>{let w=Rt();w?(kt(w),oe(P("copiado_sucesso"))):oe(P("selecione_substatus"),{error:!0})},Qe.onclick=async()=>{let w=S.value,D=Rt();if(!D){oe(P("selecione_substatus"),{error:!0});return}kt(D),ft();let A=Xe(),H=await oo();if(H)try{if(H.focus(),H.innerHTML.trim()==="<p><br></p>"||H.innerHTML.trim()==="<br>"||H.innerText.trim()===""){let de=document.createRange();de.selectNodeContents(H);let X=window.getSelection();X.removeAllRanges(),X.addRange(de),document.execCommand("delete",!1,null)}else if(!H.innerHTML.endsWith("<br><br>")){let de=document.createRange();de.selectNodeContents(H),de.collapse(!1);let X=window.getSelection();X.removeAllRanges(),X.addRange(de),document.execCommand("insertHTML",!1,"<br><br>")}document.execCommand("insertHTML",!1,D),to(H),setTimeout(()=>{oe(P("inserido_copiado"))},600);let le=typeof Fe<"u"&&Fe?Fe.checked:!0;if(w&&it[w]&&le){let de=it[w];await $t(de),await new Promise(X=>setTimeout(X,500))}A(),bt(1.5),C.value="",S.innerHTML=`<option value="">${P("select_substatus")}</option>`,S.disabled=!0}catch(te){console.error(te),oe("Erro ao inserir.",{error:!0}),A()}};function bt(w=1.5){w<=1.5&&(Le.style.display="none",ye.innerHTML=""),w<=2&&(ve.style.display="none",l.reset(),be.style.display="none"),w<=3&&(ke.style.display="none",Ne.innerHTML="",a.reset(),Ve.style.display="none",De.style.display="none")}function ft(){if(s=!s,s){let w=p.querySelector(".cw-expand-btn");w&&typeof w.resetState=="function"&&w.resetState()}Ae(s,p,"cw-btn-notes")}return pt("bau"),ut("pt"),ft}var Pe={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function so(){let e="v4.0.0",t=Object.keys(Pe)[0],n="",o="list",s={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:"#FAFAFA"},r={display:"flex",width:"200%",height:"100%",transition:"transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",transform:"translateX(0)"},a={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},l={width:"100%",padding:"10px 12px 10px 36px",borderRadius:"8px",border:"none",background:"#F0F2F5",fontSize:"14px",color:"#202124",boxSizing:"border-box",outline:"none",transition:"all 0.2s ease",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"10px center"},p={display:"flex",gap:"6px",padding:"4px 4px 8px 4px",overflowX:"auto",scrollbarWidth:"none"},g={padding:"6px 12px",borderRadius:"16px",border:"1px solid transparent",background:"transparent",color:"#5f6368",fontSize:"12px",fontWeight:"500",cursor:"pointer",transition:"all 0.2s ease",flexShrink:"0"},v={background:"#E8F0FE",color:"#1967D2",fontWeight:"600"},u={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",marginBottom:"6px",borderRadius:"8px",background:"#fff",border:"1px solid #dadce0",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",position:"relative",overflow:"hidden"},O=!1,h=document.createElement("div");h.id="quick-email-popup",Object.assign(h.style,Se,{right:"100px",width:"480px",height:"600px",opacity:"0",pointerEvents:"none"});let f={popup:h,googleLine:null,focusElement:null};function y(){O=!O,Ae(O,h,"cw-btn-email"),O||setTimeout(()=>k(),300)}let E=we(h,"Emails R\xE1pidos",e,"Selecione, visualize e insira com um clique.",f,()=>y()),I=document.createElement("div");Object.assign(I.style,s);let R=document.createElement("div");Object.assign(R.style,r);let j=document.createElement("div");Object.assign(j.style,a);let V=document.createElement("div");Object.assign(V.style,{padding:"16px 16px 4px 16px",flexShrink:"0",background:"#fff",zIndex:"10",display:"flex",flexDirection:"column",gap:"8px",borderBottom:"1px solid #f1f3f4"});let m=document.createElement("input");m.placeholder="Buscar template...",Object.assign(m.style,l),m.onfocus=()=>{m.style.background="#fff",m.style.boxShadow="0 2px 8px rgba(0,0,0,0.05)"},m.onblur=()=>{m.style.background="#F0F2F5",m.style.boxShadow="none"},f.focusElement=m;let b=document.createElement("div");Object.assign(b.style,p);let i=document.createElement("div");Object.assign(i.style,{padding:"12px 16px",overflowY:"auto",flexGrow:"1"}),V.appendChild(m),V.appendChild(b),j.appendChild(V),j.appendChild(i);let d=document.createElement("div");Object.assign(d.style,a);let C=document.createElement("div");Object.assign(C.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),d.appendChild(C),R.appendChild(j),R.appendChild(d),I.appendChild(R),h.appendChild(E),h.appendChild(I);let c=document.createElement("div");Object.assign(c.style,{padding:"8px 16px",borderTop:"1px solid #eee",textAlign:"center",fontSize:"10px",color:"#9aa0a6",background:"#fff",flexShrink:"0"}),c.textContent="created by lucaste@",h.appendChild(c),document.body.appendChild(h);function x(F){o="detail",R.style.transform="translateX(-50%)";let L='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',N='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';C.innerHTML=`
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
                ${N} Inserir Template
            </button>
        </div>
      `;let B=C.querySelector("#csa-back-btn");B.onmouseover=()=>B.style.backgroundColor="#f1f3f4",B.onmouseout=()=>B.style.backgroundColor="transparent",B.onclick=k;let _=C.querySelector("#csa-insert-btn");_.onmouseover=()=>_.style.backgroundColor="#174ea6",_.onmouseout=()=>_.style.backgroundColor="#1a73e8",_.onclick=async()=>{console.log("\u{1F50D} DEBUG: Clique detectado"),console.log("\u{1F50D} DEBUG: triggerProcessingAnimation \xE9:",typeof Xe),_.style.transform="scale(0.96)",y(),console.log("\u{1F50D} DEBUG: Janela fechada");try{console.log("\u{1F50D} DEBUG: Chamando anima\xE7\xE3o...");let W=Xe();console.log("\u{1F50D} DEBUG: finishLoading \xE9:",typeof W),console.log("\u{1F50D} DEBUG: Iniciando espera de 1s..."),await new Promise(Y=>setTimeout(Y,1e3)),console.log("\u{1F50D} DEBUG: Rodando l\xF3gica do email..."),await At(F),console.log("\u{1F50D} DEBUG: Finalizando anima\xE7\xE3o..."),typeof W=="function"?W():console.error("\u274C ERRO: finishLoading n\xE3o \xE9 uma fun\xE7\xE3o! A anima\xE7\xE3o falhou ao iniciar.")}catch(W){console.error("\u274C ERRO NO PROCESSO:",W);let Y=document.querySelector(".cw-focus-backdrop");Y&&Y.classList.remove("active")}setTimeout(()=>{_.style.transform="scale(1)",typeof k=="function"&&k()},300)}}function k(){o="list",R.style.transform="translateX(0)"}function S(){b.innerHTML="",Object.keys(Pe).forEach(F=>{let L=Pe[F],N=document.createElement("button");N.textContent=L.title,Object.assign(N.style,g),t===F&&n===""&&Object.assign(N.style,v),N.onclick=()=>{t=F,n="",m.value="",S(),T()},b.appendChild(N)})}function T(){i.innerHTML="";let F=[];if(n.trim()!==""?Object.values(Pe).forEach(B=>{let _=B.emails.filter(W=>W.name.toLowerCase().includes(n.toLowerCase()));F=[...F,..._]}):Pe[t]&&(F=Pe[t].emails),F.length===0){i.innerHTML='<div style="text-align:center; padding:60px 20px; color:#9aa0a6;"><div style="font-size:24px; margin-bottom:8px;">\u{1F50D}</div><div style="font-size:14px;">Nenhum template encontrado.</div></div>';return}let L='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>',N='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';F.forEach(B=>{let _=document.createElement("div");Object.assign(_.style,u);let W=B.subject.length>50?B.subject.substring(0,50)+"...":B.subject;_.innerHTML=`
        <div style="flex-grow: 1; margin-right: 12px; min-width: 0;">
            <div style="font-size:13px; font-weight:600; color:#202124; margin-bottom:2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${B.name}</div>
            <div style="font-size:12px; color:#5f6368; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${W}</div>
        </div>
        <div style="display:flex; gap:6px;">
            <button class="action-btn view" title="Visualizar" style="width:32px; height:32px; border-radius:50%; border:none; background:#f1f3f4; color:#5f6368; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">${N}</button>
            <button class="action-btn send" title="Inserir Agora" style="width:32px; height:32px; border-radius:50%; border:none; background:#e8f0fe; color:#1a73e8; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">${L}</button>
        </div>
      `,_.onmouseenter=()=>{_.style.background="#F8F9FA",_.style.borderColor="#1a73e8"},_.onmouseleave=()=>{_.style.background="#fff",_.style.borderColor="#dadce0"};let Y=_.querySelector(".view");Y.onclick=ae=>{ae.stopPropagation(),x(B)},Y.onmouseenter=()=>{Y.style.background="#d2e3fc",Y.style.color="#174ea6"},Y.onmouseleave=()=>{Y.style.background="#f1f3f4",Y.style.color="#5f6368"};let Z=_.querySelector(".send");Z.onclick=async ae=>{ae.stopPropagation(),Z.style.transform="scale(0.9)",setTimeout(()=>Z.style.transform="scale(1)",150),y();let ee=Xe();try{await new Promise(ge=>setTimeout(ge,800)),await At(B),ee()}catch(ge){console.error("Erro no envio r\xE1pido:",ge),ee()}},Z.onmouseenter=()=>{Z.style.background="#1a73e8",Z.style.color="#fff",Z.style.boxShadow="0 2px 6px rgba(26,115,232,0.3)"},Z.onmouseleave=()=>{Z.style.background="#e8f0fe",Z.style.color="#1a73e8",Z.style.boxShadow="none"},_.onclick=()=>x(B),i.appendChild(_)})}return m.addEventListener("input",F=>{n=F.target.value,n!==""?Array.from(b.children).forEach(L=>Object.assign(L.style,g)):S(),T()}),S(),T(),y}var ro={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function lo(){let e="v2.1 (Apple Motion)",t={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#f8f9fa",scrollBehavior:"smooth"},card:{background:"#ffffff",border:"1px solid #dadce0",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"13px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"10px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.15s ease, opacity 0.3s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.5",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"20px",height:"20px",borderRadius:"6px",border:"2px solid #dadce0",marginRight:"14px",marginTop:"1px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #eee",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"}},n={},o="PT",s="BAU",r=!1,a=document.createElement("div");a.id="call-script-popup",Object.assign(a.style,Se,{right:"auto",left:"50%",width:"400px",height:"650px",display:"flex",flexDirection:"column",opacity:"0",pointerEvents:"none"});let l={popup:a,googleLine:null};function p(){r=!r,Ae(r,a,"cw-btn-script")}let g=we(a,"Call Script",e,"Guia interativo para condu\xE7\xE3o de chamadas.",l,()=>{p()});a.appendChild(g);let v=document.createElement("div");Object.assign(v.style,t.progressBarContainer);let u=document.createElement("div");Object.assign(u.style,t.progressBarFill),v.appendChild(u),a.appendChild(v);let O=document.createElement("div");O.id="csa-content",Object.assign(O.style,t.contentArea),a.appendChild(O);let h=document.createElement("div");Object.assign(h.style,t.footer);let f=document.createElement("span");f.textContent="by lucaste@",Object.assign(f.style,{fontSize:"10px",color:"#bdc1c6"});let y=document.createElement("button");y.innerHTML=`
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
    Resetar Script
  `,Object.assign(y.style,t.resetBtn),y.onmouseenter=()=>y.style.background="#fce8e6",y.onmouseleave=()=>y.style.background="transparent",y.onclick=()=>{y.style.transform="scale(0.9)",setTimeout(()=>y.style.transform="scale(1)",150);for(let k in n)delete n[k];d()},h.appendChild(f),h.appendChild(y),a.appendChild(h);let E=document.createElement("div");Object.assign(E.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let I=document.createElement("div");Object.assign(I.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let R=document.createElement("div");R.textContent="BAU";let j=document.createElement("div");j.textContent="LT",Object.assign(R.style,me),Object.assign(j.style,me),I.appendChild(R),I.appendChild(j);let V=document.createElement("select");Object.assign(V.style,Ze,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),V.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',V.value=o,E.appendChild(I),E.appendChild(V),O.appendChild(E);let m=document.createElement("div");m.id="csa-checklist-area",O.appendChild(m);let b=document.createElement("div");Object.assign(b.style,We),b.className="no-drag",b.title="Redimensionar",a.appendChild(b),Ye(a,b),document.body.appendChild(a);function i(k){return k}function d(){m.innerHTML="";let k=`${o} ${s}`,S=ro[k];if(!S){m.innerHTML=`<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <div style="font-size: 24px;">\u2615</div>
        <div>Script n\xE3o configurado.</div>
      </div>`,u.style.width="0%";return}let T=S.color||"#1a73e8",F=0,L=0;["inicio","fim"].forEach(N=>{S[N]&&(F+=S[N].length)}),["inicio","fim"].forEach((N,B)=>{let _=S[N];if(!_||_.length===0)return;let W=document.createElement("div");Object.assign(W.style,t.card);let Y=document.createElement("div");Object.assign(Y.style,t.cardTitle);let Z=N==="inicio"?"Abertura":"Fechamento";o.includes("ES")&&(Z=N==="inicio"?"Apertura":"Cierre"),o.includes("EN")&&(Z=N==="inicio"?"Opening":"Closing"),Y.textContent=Z;let ae=document.createElement("span");ae.style.fontSize="11px",ae.style.opacity="0.7",ae.style.fontWeight="500",ae.style.background="#f1f3f4",ae.style.padding="2px 8px",ae.style.borderRadius="10px",Y.appendChild(ae),W.appendChild(Y);let ee=0;_.forEach((ge,ce)=>{let ue=`${k}-${N}-${ce}`,xe=!!n[ue];xe&&(L++,ee++);let ie=document.createElement("div");Object.assign(ie.style,t.itemRow);let K=document.createElement("div");Object.assign(K.style,t.checkbox);let Te=document.createElement("span");Te.innerHTML=ge,Te.style.flex="1",xe?(Object.assign(ie.style,t.itemCompleted),K.style.background=T,K.style.borderColor=T,K.style.transform="scale(1)",K.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ie.style.textDecoration="none",ie.style.opacity="1",K.style.background="transparent",K.style.borderColor="#dadce0",K.style.transform="scale(1)",K.innerHTML=""),ie.onclick=()=>{let Me=!n[ue];n[ue]=Me,J.playClick(),Me?(K.style.transform="scale(1.2)",setTimeout(()=>K.style.transform="scale(1)",150),Object.assign(ie.style,t.itemCompleted),K.style.background=T,K.style.borderColor=T,K.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ie.style.textDecoration="none",ie.style.opacity="1",K.style.background="transparent",K.style.borderColor="#dadce0",K.innerHTML=""),C(k,S)},ie.onmouseenter=()=>{n[ue]||(ie.style.background="#f1f3f4",K.style.borderColor=T)},ie.onmouseleave=()=>{n[ue]||(ie.style.background="transparent",K.style.borderColor="#dadce0")},ie.appendChild(K),ie.appendChild(Te),W.appendChild(ie)}),ee===_.length&&_.length>0&&(ae.style.color="#1e8e3e",ae.style.background="#e6f4ea",W.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),ae.textContent=`${ee}/${_.length}`,m.appendChild(W)}),c(F,L)}function C(k,S){let T=0,F=0;["inicio","fim"].forEach(L=>{let N=S[L]||[];T+=N.length;let B=0;N.forEach((_,W)=>{n[`${k}-${L}-${W}`]&&(F++,B++)})}),c(T,F),setTimeout(()=>d(),200)}function c(k,S){let T=k===0?0:S/k*100;u.style.width=`${T}%`,T===100?u.style.background="#34A853":u.style.background="linear-gradient(90deg, #4285F4, #34A853)"}function x(k){s=k;let S=et();Object.assign(R.style,me),Object.assign(j.style,me),Object.assign(k==="BAU"?R.style:j.style,S),d()}return R.onclick=()=>x("BAU"),j.onclick=()=>x("LT"),V.addEventListener("change",k=>{o=k.target.value,d()}),x(s),p}var ct={lm:{label:"LM Forms",links:[{name:"Relat\xF3rio de Ocorr\xEAncias",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas operacionais | Aviso de pausas"},{name:"Chamadas Excedidas (>50min)",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro de chamadas longas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema/ferramenta"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"Enviar casos para BAU/Solicitar Descarte/Abrir Monitoria para AMs"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo dos Anunciantes"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos complicados de atender"}]},suporte:{label:"Central de Ajuda",links:[{name:"Suporte Google Ads",url:"https://support.google.com/google-ads/",desc:"Oficial"},{name:"Suporte GA4",url:"https://support.google.com/analytics/",desc:"Oficial"},{name:"Suporte Merchant Center",url:"https://support.google.com/merchants/gethelp",desc:"Oficial"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. oficial sobre CSP"},{name:"Doc. Enhanced Conversion",url:"https://support.google.com/google-ads/answer/9888656?hl=en",desc:"Como funcionam as convers\xF5es otimizadas?"},{name:"Doc. CoMo",url:"https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=pt-br",desc:"Doc. oficial sobre Consent Mode"}]},outros:{label:"Diversos",links:[{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form para solicitar grava\xE7\xE3o da chamada."}]}};function co(){let e="v2.4.5",t="lm",n="",o={width:"100%",padding:"10px 12px 10px 36px",borderRadius:"8px",border:"1px solid #dadce0",background:"#f8f9fa",fontSize:"14px",boxSizing:"border-box",outline:"none",color:"#3c4043",transition:"background 0.2s, border-color 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"10px center"},s={display:"flex",flexWrap:"wrap",gap:"8px",paddingBottom:"8px"},r={padding:"6px 16px",borderRadius:"16px",border:"1px solid #dadce0",background:"transparent",color:"#5f6368",fontSize:"13px",fontWeight:"500",cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s ease",marginBottom:"4px"},a={background:"#e8f0fe",color:"#1967d2",borderColor:"#e8f0fe",fontWeight:"600"},l={display:"flex",alignItems:"center",padding:"10px 14px",borderRadius:"12px",cursor:"pointer",border:"1px solid transparent",marginBottom:"6px",background:"#ffffff",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), background 0.2s",boxShadow:"0 1px 2px rgba(0,0,0,0.02)",opacity:"0",transform:"translateY(10px)"},p={width:"36px",height:"36px",borderRadius:"10px",background:"#f1f3f4",color:"#5f6368",display:"flex",alignItems:"center",justifyContent:"center",marginRight:"14px",fontSize:"18px",flexShrink:"0"},g=document.createElement("div");g.id="feedback-popup",Object.assign(g.style,Se,{right:"100px",width:"400px",opacity:"0",pointerEvents:"none"});let v={lm:"\u{1F4DD}",qa:"\u{1F6E1}\uFE0F",suporte:"\u{1F4DA}",outros:"\u26A1"},u={popup:g,googleLine:null,focusElement:null},O=!1,h=we(g,"Links \xDAteis",e,"Acesso r\xE1pido a formul\xE1rios internos (Ocorr\xEAncias, Bugs) e documenta\xE7\xF5es oficiais de suporte.",u,()=>m());g.appendChild(h);let f=document.createElement("div");Object.assign(f.style,{padding:"16px",display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid #f1f3f4",flexShrink:"0",backgroundColor:"#fff"});let y=document.createElement("input");y.type="text",y.placeholder="Buscar link, form ou ajuda...",Object.assign(y.style,o),u.focusElement=y,y.onfocus=()=>{y.style.borderColor="#1a73e8",y.style.backgroundColor="#fff"},y.onblur=()=>{y.style.borderColor="#dadce0",y.style.backgroundColor="#f8f9fa"};let E=document.createElement("div");Object.assign(E.style,s),f.appendChild(y),f.appendChild(E),g.appendChild(f);let I=document.createElement("div");Object.assign(I.style,{padding:"0 8px 8px 8px",overflowY:"auto",flexGrow:"1"}),g.appendChild(I);let R=document.createElement("div");Object.assign(R.style,{padding:"8px 16px",borderTop:"1px solid #eee",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"10px",color:"#9aa0a6"}),R.innerHTML="<span>by lucaste@</span>",g.appendChild(R),document.body.appendChild(g);function j(){E.innerHTML="",Object.keys(ct).forEach(b=>{let i=ct[b],d=document.createElement("button"),C=v[b]||"";d.innerHTML=`<span style="font-size:14px">${C}</span> ${i.label}`,Object.assign(d.style,r),t===b&&n===""&&Object.assign(d.style,a),d.onmousedown=()=>d.style.transform="scale(0.95)",d.onmouseup=()=>d.style.transform="scale(1)",d.onmouseleave=()=>d.style.transform="scale(1)",d.onclick=()=>{t=b,n="",y.value="",j(),V()},E.appendChild(d)})}function V(){I.innerHTML="";let b=[],i=n.trim()!=="";if(i?Object.entries(ct).forEach(([d,C])=>{let c=C.links.filter(x=>x.name.toLowerCase().includes(n.toLowerCase())||x.desc.toLowerCase().includes(n.toLowerCase()));c.forEach(x=>{x._catIcon=v[d],x._categoryName=C.label}),b=[...b,...c]}):(b=ct[t].links,b.forEach(d=>d._catIcon=v[t])),b.length===0){I.innerHTML=`
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px; opacity:0.6;">
            <div style="font-size:32px; margin-bottom:10px;">\u{1F50D}</div>
            <div style="font-size:13px; color:#5f6368;">Nenhum link encontrado.</div>
        </div>`;return}b.forEach((d,C)=>{let c=document.createElement("div");Object.assign(c.style,l);let x=document.createElement("div");Object.assign(x.style,p),x.textContent=d._catIcon||"\u{1F517}",c.appendChild(x);let k=document.createElement("div");k.style.flexGrow="1";let S=_=>{if(!i)return _;let W=new RegExp(`(${n})`,"gi");return _.replace(W,'<span style="color:#1a73e8; font-weight:700;">$1</span>')},T=`<div style="font-size:14px; font-weight:500; color:#202124;">${S(d.name)}</div>`,F=`<div style="font-size:11px; color:#5f6368; margin-top:2px;">${S(d.desc)}</div>`;k.innerHTML=T+F,c.appendChild(k);let L=document.createElement("div");L.style.display="flex",L.style.gap="4px",L.style.opacity="0",L.style.transition="opacity 0.2s";let N=document.createElement("div");N.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',Object.assign(N.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#5f6368",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"}),N.onclick=_=>{J.playClick(),_.stopPropagation(),navigator.clipboard.writeText(d.url),N.style.transform="scale(1.2)",N.style.color="#1e8e3e",N.style.backgroundColor="#e6f4ea",setTimeout(()=>{N.style.transform="scale(1)",N.style.color="#5f6368",N.style.backgroundColor="transparent"},800)},N.onmouseenter=()=>N.style.backgroundColor="#f1f3f4",N.onmouseleave=()=>N.style.backgroundColor="transparent",L.appendChild(N);let B=document.createElement("div");B.innerHTML="\u2197",Object.assign(B.style,{width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",color:"#dadce0",fontSize:"16px"}),L.appendChild(B),c.appendChild(L),c.onclick=()=>window.open(d.url,"_blank"),c.onmouseenter=()=>{c.style.backgroundColor="#f8f9fa",c.style.transform="scale(1.01)",L.style.opacity="1",B.style.color="#1a73e8"},c.onmouseleave=()=>{c.style.backgroundColor="#ffffff",c.style.transform="scale(1)",L.style.opacity="0",B.style.color="#dadce0"},I.appendChild(c),requestAnimationFrame(()=>{c.style.transition="opacity 0.3s ease, transform 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.2)",setTimeout(()=>{c.style.opacity="1",c.style.transform="translateY(0)"},C*40)})})}y.addEventListener("input",b=>{n=b.target.value,n!==""?Array.from(E.children).forEach(i=>{i.style.backgroundColor="transparent",i.style.color="#5f6368",i.style.borderColor="#dadce0"}):j(),V()});function m(){O=!O,Ae(O,g,"cw-btn-links")}return j(),V(),m}var It={":alarmred:":"https://media.giphy.com/media/vfB0liiCJqbTAUNpIX/giphy.gif",":warning:":"https://fonts.gstatic.com/s/e/notoemoji/latest/26a0_fe0f/512.gif",":arrow-right-2:":"\u27A1\uFE0F",":home:":"\u{1F3E0}",":cat-dance-dance-dance:":"https://media.tenor.com/On7kvXhzml4AAAAj/loading-cat.gif",":party_blob:":"https://cdn.discordapp.com/emojis/856942472909291530.gif",":consolation-prize:":"\u{1F381}",":fire:":"\u{1F525}",":check:":"\u2705"},qe=[];function Nt(e){qe=e}function po(){let e="v2.4 (Live & Pop)",t=!1,n=null,o=60*1e3;function s(i){if(!i)return"";try{let d=new Date(i);return isNaN(d.getTime())?String(i):d.toLocaleString("pt-BR",{day:"2-digit",month:"2-digit",year:"numeric",hour:"2-digit",minute:"2-digit"}).replace(","," \xE0s")}catch{return String(i)}}let r={critical:{bg:"#FEF2F2",border:"#FECACA",text:"#991B1B",icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>'},info:{bg:"#EFF6FF",border:"#BFDBFE",text:"#1E40AF",icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>'},success:{bg:"#F0FDF4",border:"#BBF7D0",text:"#166534",icon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'}},a={feedContainer:{padding:"24px",overflowY:"auto",flexGrow:"1",background:"#FAFAFA",display:"flex",flexDirection:"column",gap:"20px"},card:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.06)",boxShadow:"0 4px 12px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.02)",overflow:"hidden",transition:"all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",position:"relative",width:"100%",boxSizing:"border-box",flexShrink:"0"},cardHistory:{background:"#FFFFFF",borderRadius:"16px",border:"1px solid rgba(0,0,0,0.04)",boxShadow:"none",opacity:"0.8",filter:"grayscale(0.3)",marginBottom:"16px",flexShrink:"0"},cardHeader:{padding:"12px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(0,0,0,0.04)",fontSize:"12px",fontWeight:"600",letterSpacing:"0.5px",textTransform:"uppercase"},msgTitle:{padding:"20px 20px 8px 20px",fontSize:"16px",fontWeight:"700",color:"#202124",letterSpacing:"-0.01em",lineHeight:"1.4"},metaContainer:{padding:"0 20px 12px 20px",display:"flex",alignItems:"center",gap:"8px",fontSize:"12px",color:"#5f6368"},cardBody:{padding:"0 20px 24px 20px",fontSize:"14px",color:"#3c4043",lineHeight:"1.6",whiteSpace:"pre-wrap",fontFamily:"'Google Sans', Roboto, sans-serif",wordBreak:"break-word",overflowWrap:"break-word"},emojiImg:"height: 20px; vertical-align: text-bottom; margin: 0 2px;",dismissBtn:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(0,0,0,0.1)",background:"#fff",color:"#5f6368",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s ease",marginLeft:"12px"},markAllBtn:{fontSize:"12px",color:"#1a73e8",cursor:"pointer",fontWeight:"600",background:"transparent",border:"none",padding:"8px",transition:"opacity 0.2s"},emptyState:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 0",color:"#bdc1c6",gap:"16px",textAlign:"center"},historyDivider:{display:"flex",alignItems:"center",justifyContent:"center",margin:"10px 0 20px 0",cursor:"pointer",color:"#1a73e8",fontSize:"13px",fontWeight:"500",gap:"8px",padding:"10px",borderRadius:"8px",transition:"background 0.2s"},historyContainer:{display:"none",flexDirection:"column",gap:"16px",paddingTop:"10px",borderTop:"1px dashed rgba(0,0,0,0.1)"}},l="cw-scrollbar-style";if(!document.getElementById(l)){let i=document.createElement("style");i.id=l,i.innerHTML=".cw-nice-scroll::-webkit-scrollbar { width: 5px; } .cw-nice-scroll::-webkit-scrollbar-track { background: transparent; } .cw-nice-scroll::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 10px; }",document.head.appendChild(i)}function p(i){if(!i||typeof i!="string")return"";let d=i,C=/(https?:\/\/[^\s]+)|(www\.[^\s]+)/g;return d=d.replace(C,c=>{let x=c;return x.startsWith("http")||(x="http://"+x),`<a href="${x}" target="_blank" style="color:#1967d2; text-decoration:underline;">${c}</a>`}),d=d.replace(/\*\*(.*?)\*\*/g,"<b>$1</b>"),d=d.replace(/_(.*?)_/g,"<i>$1</i>"),d=d.replace(/\n/g,"<br>"),Object.keys(It).forEach(c=>{let x=It[c];if(x.startsWith("http")){let k=`<img src="${x}" style="${a.emojiImg}" alt="${c}">`;d=d.split(c).join(k)}else d=d.split(c).join(x)}),d=d.replace(/@todos|@all/gi,'<span style="background:#e8f0fe; color:#1967d2; padding:1px 5px; border-radius:4px; font-weight:600; font-size:12px;">@todos</span>'),d}let g=document.createElement("div");g.id="broadcast-popup",Object.assign(g.style,Se,{right:"auto",left:"50%",width:"450px",height:"650px",display:"flex",flexDirection:"column",opacity:"0",pointerEvents:"none"});let v={popup:g,googleLine:null};function u(){if(t=!t,Ae(t,g,"cw-btn-broadcast"),t){let i=document.getElementById("cw-btn-broadcast");i&&i.classList.remove("has-new"),y()}}let O=we(g,"Operations Feed",e,"Atualiza\xE7\xF5es oficiais da opera\xE7\xE3o.",v,()=>u()),h=O.querySelector(".cw-header-actions")||O.lastElementChild;if(h){let i=document.createElement("button");i.textContent="Limpar tudo",Object.assign(i.style,a.markAllBtn),i.onclick=d=>{d.stopPropagation(),J.playSuccess();let C=qe.map(c=>c.id);localStorage.setItem("cw_read_broadcasts",JSON.stringify(C)),R()},h.insertBefore(i,h.firstChild)}g.appendChild(O);let f=document.createElement("div");f.className="cw-nice-scroll",Object.assign(f.style,a.feedContainer),g.appendChild(f);async function y(){let i=document.getElementById("cw-update-status");t&&(i||(i=document.createElement("div"),i.id="cw-update-status",i.style.cssText="padding: 6px; text-align: center; font-size: 11px; color: #5f6368; background: #f8f9fa; border-bottom: 1px solid #e0e0e0;",f.parentNode.insertBefore(i,f)),i.innerHTML="\u23F3 Verificando atualiza\xE7\xF5es...",i.style.display="block");let d=qe.map(c=>c.id),C=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");try{let c=await Be.fetchData();c&&c.broadcast&&(t&&i&&(c.broadcast.some(k=>!d.includes(k.id))?(i.innerHTML="\u2705 Novos avisos sincronizados!",i.style.backgroundColor="#e6f4ea",i.style.color="#137333"):i.innerHTML="\u{1F539} Tudo atualizado.",setTimeout(()=>{i&&(i.style.display="none")},1500)),d.length>0&&c.broadcast.filter(S=>!d.includes(S.id)).filter(S=>!C.includes(S.id)).length>0&&(console.log("\u{1F514} Novo aviso detectado! Tocando som."),J.playNotification()),Nt(c.broadcast),E(),t&&R())}catch(c){console.error("Erro no update:",c),t&&i&&(i.innerHTML="\u26A0\uFE0F Falha na conex\xE3o.",i.style.backgroundColor="#fce8e6")}}function E(){let i=document.getElementById("cw-btn-broadcast");if(!i)return;let d=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");if(qe.some(c=>!d.includes(c.id))){if(i.classList.add("has-new"),!i.querySelector(".cw-badge")){let c=document.createElement("div");c.className="cw-badge",Object.assign(c.style,{position:"absolute",top:"8px",right:"8px",width:"8px",height:"8px",backgroundColor:"#d93025",borderRadius:"50%",border:"1px solid #fff",zIndex:"10"}),i.appendChild(c)}}else{i.classList.remove("has-new");let c=i.querySelector(".cw-badge");c&&c.remove()}}let I=Be.getCachedBroadcasts();I.length>0&&(Nt(I),R()),y(),n||(n=setInterval(y,o));function R(){f.innerHTML="";let i=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),d=[...qe].sort((x,k)=>{let S=i.includes(x.id),T=i.includes(k.id);return S===T?0:S?1:-1});if(d.every(x=>i.includes(x.id))){let x=document.createElement("div");Object.assign(x.style,a.emptyState),x.innerHTML=`
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#dadce0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="M9 12l2 2 4-4"></path></svg>
            <div style="font-weight:500;">Voc\xEA est\xE1 em dia!</div>
            <div style="font-size:12px;">Nenhum aviso pendente.</div>
           `,f.appendChild(x)}let C=d.filter(x=>!i.includes(x.id)),c=d.filter(x=>i.includes(x.id));if(C.forEach(x=>f.appendChild(j(x,!1))),c.length>0){let x=document.createElement("div");Object.assign(x.style,a.historyDivider),x.innerHTML=`<span>Visualizar ${c.length} avisos anteriores</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 0.3s"><polyline points="6 9 12 15 18 9"></polyline></svg>`;let k=document.createElement("div");Object.assign(k.style,a.historyContainer),c.forEach(T=>k.appendChild(j(T,!0)));let S=!1;x.onclick=()=>{J.playClick(),S=!S,k.style.display=S?"flex":"none",x.querySelector("svg").style.transform=S?"rotate(180deg)":"rotate(0deg)",x.querySelector("span").textContent=S?"Ocultar hist\xF3rico":`Visualizar ${c.length} avisos anteriores`},f.appendChild(x),f.appendChild(k)}}function j(i,d){let C=document.createElement("div");Object.assign(C.style,d?a.cardHistory:a.card);let c=r[i.type]||r.info,x=document.createElement("div");Object.assign(x.style,a.cardHeader,{background:c.bg,color:c.text,borderBottom:`1px solid ${c.border}`});let k=document.createElement("div");if(Object.assign(k.style,{display:"flex",alignItems:"center",gap:"6px"}),k.innerHTML=`${c.icon} <span>${i.type.toUpperCase()}</span>`,x.appendChild(k),d){let T=document.createElement("span");T.textContent=s(i.date),T.style.opacity="0.7",x.appendChild(T)}else{let T=document.createElement("button");T.title="Marcar como lido",Object.assign(T.style,a.dismissBtn),T.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',T.onmouseenter=()=>{T.style.color="#1e8e3e",T.style.background="#e6f4ea",T.style.borderColor="#1e8e3e"},T.onmouseleave=()=>{T.style.color="#5f6368",T.style.background="#fff",T.style.borderColor="rgba(0,0,0,0.1)"},T.onclick=F=>{F.stopPropagation(),J.playClick(),C.style.transform="translateX(20px)",C.style.opacity="0",setTimeout(()=>{let L=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]");L.push(i.id),localStorage.setItem("cw_read_broadcasts",JSON.stringify(L)),R(),E()},250)},x.appendChild(T)}if(C.appendChild(x),i.title){let T=document.createElement("div");Object.assign(T.style,a.msgTitle),T.textContent=i.title,C.appendChild(T)}if(!d){let T=document.createElement("div");Object.assign(T.style,a.metaContainer),T.innerHTML=`<span style="font-weight:600">${i.author}</span> \u2022 <span>${s(i.date)}</span>`,C.appendChild(T)}let S=document.createElement("div");return Object.assign(S.style,a.cardBody),S.innerHTML=p(i.text),C.appendChild(S),C}R();let V=document.createElement("div");Object.assign(V.style,We),V.className="no-drag",g.appendChild(V),Ye(g,V),document.body.appendChild(g);let m=JSON.parse(localStorage.getItem("cw_read_broadcasts")||"[]"),b=qe.some(i=>!m.includes(i.id));return{toggle:u,hasUnread:b}}function Eo(){if(window.techSolInitialized){Ct();return}window.techSolInitialized=!0,console.log("\u{1F680} TechSol Suite Initializing...");try{Pt();try{J.initGlobalListeners(),J.playStartup()}catch(r){console.warn("\xC1udio n\xE3o p\xF4de ser iniciado automaticamente:",r)}Be.fetchTips(),Ct();let e=io(),t=so(),n=lo(),o=co(),s=po();Qt({toggleNotes:e,toggleEmail:t,toggleScript:n,toggleLinks:o,broadcastControl:s})}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),oe("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}Eo();})();
