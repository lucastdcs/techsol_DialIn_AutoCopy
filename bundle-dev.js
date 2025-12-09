(()=>{var Ze="",oo=e=>new Promise(t=>setTimeout(t,e));async function It(){if(Ze)return Ze;try{let e=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!e)return"Agente";e.click(),await oo(100);let t="Consultor",n=document.querySelector("profile-details .name");if(n)t=n.textContent.trim().split(" ")[0],t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();else{let o=document.querySelector("profile-details img");if(o&&o.src.includes("/photos/")){let s=o.src.match(/\/photos\/([^\?]+)/)[1];t=s.charAt(0).toUpperCase()+s.slice(1)}}return e.click(),document.body.click(),Ze=t,t}catch(e){return console.warn("Sherlock falhou:",e),"Consultor"}}function bt(){return Ze||"Consultor"}function Nt(e){let t=new Date,n=t.getHours(),o=t.getDay(),s="Ol\xE1",r="";n>=5&&n<12?(s="Bom dia",r='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):n>=12&&n<18?(s="Boa tarde",r='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(s="Boa noite",r='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let a=[];n>=0&&n<5?a=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:n<12?o===1?a=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:o===5?a=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:a=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:n<18?a=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:a=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(o===0||o===6)&&(a=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let i=a[Math.floor(Math.random()*a.length)];return{prefix:`${s},`,name:e,suffix:i,icon:r,isFriday:o===5}}function gt(){let e="Cliente",t="[INSERIR URL]";try{let o=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(o&&o.nextElementSibling){let s=o.nextElementSibling.innerText.trim();s&&(e=s)}}catch(n){console.warn("Falha ao capturar Nome:",n)}try{let o=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(o&&o.nextElementSibling){let s=o.nextElementSibling.innerText.trim();s&&(t=s)}}catch(n){console.warn("Falha ao capturar Website:",n)}return{advertiserName:e,websiteUrl:t,agentName:bt()}}var Ve=null;function we(){if(!Ve){let e=window.AudioContext||window.webkitAudioContext;e&&(Ve=new e)}return Ve&&Ve.state==="suspended"&&Ve.resume(),Ve}var me={playClick:()=>{let e=we();if(!e)return;let t=e.currentTime,n=e.createOscillator(),o=e.createGain();n.connect(o),o.connect(e.destination),n.type="sine",n.frequency.setValueAtTime(800,t),n.frequency.exponentialRampToValueAtTime(100,t+.05),o.gain.setValueAtTime(.1,t),o.gain.exponentialRampToValueAtTime(.01,t+.05),n.start(t),n.stop(t+.05)},playSwoosh:()=>{let e=we();if(!e)return;let t=e.currentTime,n=e.sampleRate*.25,o=e.createBuffer(1,n,e.sampleRate),s=o.getChannelData(0);for(let l=0;l<n;l++)s[l]=Math.random()*2-1;let r=e.createBufferSource();r.buffer=o;let a=e.createBiquadFilter();a.type="lowpass",a.frequency.setValueAtTime(200,t),a.frequency.linearRampToValueAtTime(800,t+.1),a.frequency.linearRampToValueAtTime(200,t+.25);let i=e.createGain();i.gain.setValueAtTime(.05,t),i.gain.linearRampToValueAtTime(0,t+.25),r.connect(a),a.connect(i),i.connect(e.destination),r.start(t)},playSuccess:()=>{let e=we();if(!e)return;let t=e.currentTime;[523.25,659.25,783.99].forEach((n,o)=>{let s=e.createOscillator(),r=e.createGain();s.connect(r),r.connect(e.destination),s.type="sine",s.frequency.value=n;let a=t+o*.03;r.gain.setValueAtTime(0,a),r.gain.linearRampToValueAtTime(.05,a+.05),r.gain.exponentialRampToValueAtTime(.001,a+.6),s.start(a),s.stop(a+.7)})},playReset:()=>{let e=we();if(!e)return;let t=e.currentTime,n=e.createOscillator(),o=e.createGain();n.connect(o),o.connect(e.destination),n.type="triangle",n.frequency.setValueAtTime(150,t),n.frequency.exponentialRampToValueAtTime(40,t+.2),o.gain.setValueAtTime(.1,t),o.gain.exponentialRampToValueAtTime(.01,t+.2),n.start(t),n.stop(t+.2)},playError:()=>{let e=we();if(!e)return;let t=e.currentTime,n=e.createOscillator(),o=e.createGain();n.connect(o),o.connect(e.destination),n.type="sawtooth",n.frequency.setValueAtTime(100,t),n.frequency.exponentialRampToValueAtTime(50,t+.15);let s=e.createBiquadFilter();s.type="lowpass",s.frequency.value=150,n.disconnect(),n.connect(s),s.connect(o),o.gain.setValueAtTime(.1,t),o.gain.exponentialRampToValueAtTime(.01,t+.15),n.start(t),n.stop(t+.15)},playNotification:()=>{let e=we();if(!e)return;let t=e.currentTime,n=e.createOscillator(),o=e.createGain();n.connect(o),o.connect(e.destination),n.type="sine",n.frequency.setValueAtTime(880,t),o.gain.setValueAtTime(0,t),o.gain.linearRampToValueAtTime(.05,t+.02),o.gain.exponentialRampToValueAtTime(.001,t+1.5),n.start(t),n.stop(t+1.5)},playTyping:()=>{let e=we();if(!e)return;let t=e.currentTime,n=e.sampleRate*.03,o=e.createBuffer(1,n,e.sampleRate),s=o.getChannelData(0);for(let l=0;l<n;l++)s[l]=Math.random()*2-1;let r=e.createBufferSource();r.buffer=o;let a=e.createBiquadFilter();a.type="highpass",a.frequency.value=1e3;let i=e.createGain();i.gain.value=.03,r.connect(a),a.connect(i),i.connect(e.destination),r.start(t)},playGenieOpen:()=>{let e=we();if(!e)return;let t=e.currentTime,n=.35,o=e.sampleRate*n,s=e.createBuffer(1,o,e.sampleRate),r=s.getChannelData(0);for(let c=0;c<o;c++)r[c]=Math.random()*2-1;let a=e.createBufferSource();a.buffer=s;let i=e.createBiquadFilter();i.type="lowpass",i.frequency.setValueAtTime(100,t),i.frequency.exponentialRampToValueAtTime(1200,t+n);let l=e.createGain();l.gain.setValueAtTime(.04,t),l.gain.linearRampToValueAtTime(0,t+n),a.connect(i),i.connect(l),l.connect(e.destination),a.start(t);let b=e.createOscillator(),d=e.createGain();b.connect(d),d.connect(e.destination),b.type="sine",b.frequency.setValueAtTime(200,t),b.frequency.exponentialRampToValueAtTime(400,t+n),d.gain.setValueAtTime(0,t),d.gain.linearRampToValueAtTime(.03,t+.1),d.gain.linearRampToValueAtTime(0,t+n),b.start(t),b.stop(t+n)},playStartup:()=>{let e=we();if(!e)return;let t=e.currentTime;[261.63,329.63,392,493.88].forEach((r,a)=>{let i=e.createOscillator(),l=e.createGain();i.connect(l),l.connect(e.destination),i.type=a%2===0?"sine":"triangle",i.frequency.value=r,l.gain.setValueAtTime(0,t),l.gain.linearRampToValueAtTime(.05,t+.3+a*.05),l.gain.exponentialRampToValueAtTime(.001,t+3),i.start(t),i.stop(t+3.5)});let o=e.createOscillator(),s=e.createGain();o.connect(s),s.connect(e.destination),o.type="sine",o.frequency.setValueAtTime(1500,t),s.gain.setValueAtTime(0,t),s.gain.linearRampToValueAtTime(.02,t+.1),s.gain.exponentialRampToValueAtTime(.001,t+1.5),o.start(t),o.stop(t+1.5)}};var Rt=1e4;function Lt(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
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
    `,document.head.appendChild(t)}function oe(e,t={}){let n=document.createElement("div"),o=t.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(n.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:o,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),n.textContent=e,document.body.appendChild(n),options.error?me.playError():me.playSuccess(),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>n.remove(),400)},t.duration||4e3)}function Mt(e,t=null){let n=0,o=0,s=0,r=0,a=t||e;a.style.cursor="grab",a.onmousedown=i;function i(d){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(d.target.tagName)||d.target.closest(".no-drag"))return;d=d||window.event,a.style.cursor="grabbing",e.style.transition="none";let c=e.getBoundingClientRect();e.style.transform="none",e.style.left=c.left+"px",e.style.top=c.top+"px",e.style.margin="0",e.style.bottom="auto",e.style.right="auto",Rt++,e.style.zIndex=Rt,s=d.clientX,r=d.clientY,e.setAttribute("data-dragging","true"),document.onmouseup=b,document.onmousemove=l}function l(d){d=d||window.event,d.preventDefault(),n=s-d.clientX,o=r-d.clientY,s=d.clientX,r=d.clientY;let c=e.offsetTop-o,T=e.offsetLeft-n,h=16,y=window.innerWidth,g=window.innerHeight,A=e.offsetWidth,E=e.offsetHeight;T<h?T=h:T+A>y-h&&(T=y-A-h),c<h?c=h:c+E>g-h&&(c=g-E-h),e.style.top=c+"px",e.style.left=T+"px"}function b(){document.onmouseup=null,document.onmousemove=null,a.style.cursor="grab",setTimeout(()=>{e.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",e.setAttribute("data-dragging","false"),e.setAttribute("data-moved","true")},50)}}var Oe={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",display:"flex",flexDirection:"column",backgroundColor:"rgba(248, 249, 250, 0.96)",backdropFilter:"blur(20px) saturate(180%)",borderRadius:"20px",boxShadow:"0 20px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)",opacity:"0",pointerEvents:"none",fontFamily:"'Google Sans', 'Roboto'",transform:"translate(-50%, -50%)",transition:"all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease"};var ht={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},We={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var Dt={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var de={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var ft=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],_t=-1;function Ye(){let e=Math.floor(Math.random()*ft.length);return e===_t&&(e=(e+1)%ft.length),_t=e,ft[e]}var Ee=e=>new Promise(t=>setTimeout(t,e));async function no(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let n=e.querySelector(".cursor");await Ee(200);for(let o=0;o<t.length;o++){let s=t.charAt(o),r=document.createElement("span");r.textContent=s,n&&n.parentNode===e?n.before(r):e.appendChild(r);let a=Math.floor(Math.random()*60)+30;o===0&&(a=150),o>t.length-3&&(a=30),await Ee(a)}await Ee(600),n&&(n.style.display="none")}async function xt(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
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
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await Ee(200);let t=await It(),n=Nt(t),o=e.querySelector("#w-icon"),s=e.querySelector("#p1"),r=e.querySelector("#p2"),a=e.querySelector("#p3"),i=e.querySelector("#p-sextou");o&&(o.innerHTML=n.icon),s&&(s.textContent=n.prefix),a&&(a.textContent=n.suffix),await Ee(300);let l=o?o.querySelector("svg"):null;if(l&&(l.style.opacity="1",l.style.transform="scale(1)"),await Ee(400),s&&(s.style.opacity="1"),me.playStartup(),r&&await no(r,n.name),a&&(a.style.opacity="1",a.style.transform="translateY(0)"),n.isFriday&&i){await Ee(400),i.style.display="block",i.offsetWidth;let b=i.querySelector(".sextou-badge");b&&(b.style.opacity="1",b.style.transform="scale(1)")}await Ee(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await Ee(900),e.parentNode&&e.parentNode.removeChild(e)}}var Je={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function et(e,t){t.onmousedown=n;function n(o){o.stopPropagation(),o.preventDefault();let s=e.style.transition;e.style.transition="none";let r=o.clientX,a=o.clientY,i=parseFloat(getComputedStyle(e,null).getPropertyValue("width").replace("px","")),l=parseFloat(getComputedStyle(e,null).getPropertyValue("height").replace("px","")),b=r,d=a,c=!1;function T(g){b=g.clientX,d=g.clientY,c||(window.requestAnimationFrame(()=>{h(),c=!1}),c=!0)}function h(){let g=i+(b-r),A=l+(d-a);g>360&&(e.style.width=g+"px"),A>300&&(e.style.height=A+"px")}function y(){document.removeEventListener("mousemove",T),document.removeEventListener("mouseup",y),setTimeout(()=>{e.style.transition=s},50)}document.addEventListener("mousemove",T),document.addEventListener("mouseup",y)}t.onmouseenter=()=>t.style.opacity="1",t.onmouseleave=()=>t.style.opacity="0.6"}var Te={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:"}},Ie={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:[]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},Xe={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"}},tt={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl"},Ke=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],yt=["CONSIDERACOES","COMENTARIOS"],ye={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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
\u2022 Tentativa 3 - `,"field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-2-6-final":{type:"all","field-REASON_COMMENTS":"Finaliza\xE7\xE3o (2/6)","field-SPEAKEASY_ID":"-","field-ON_CALL":"-","field-COMENTARIOS":"\u2022 Dia 9 finaliza\xE7\xE3o do 2/6, durante o per\xEDodo do acompanhamento n\xE3o houve retorno do anunciante, ent\xE3o o caso ser\xE1 encerrado.","field-SCREENSHOTS":"\u2022 N/A","field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-manual":{type:"all","field-REASON_COMMENTS":"Outro (Manual)","field-GTM_GA4_VERIFICADO":"N/A"}};var ce=e=>new Promise(t=>setTimeout(t,e));function Ne(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>e.dispatchEvent(new MouseEvent(n,t)))}function ot(){return Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(t=>{let n=t.offsetParent!==null,o=t.closest("case-message-view")!==null,s=t.closest(".editor")!==null||t.closest("write-card")!==null;return n&&!o&&s})}async function Gt(){let e=!1,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(i=>i.innerText.trim()==="email");if(n&&n.offsetParent!==null){let i=n.closest("material-button")||n.closest("material-fab")||n;i.style&&(i.style.display="block",i.style.visibility="visible"),Ne(i),e=!0}else{let i=document.querySelector("material-fab-speed-dial");if(i){let l=i.querySelector(".trigger");if(l){l.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),Ne(l),await ce(1e3);let d=Array.from(document.querySelectorAll("i.material-icons-extended")).find(c=>c.innerText.trim()==="email");d&&(Ne(d),e=!0)}else i.click()}}let o=0,s=ot();for(console.log("\u23F3 Aguardando editor EDIT\xC1VEL...");!s&&o<30;)await ce(500),s=ot(),o++;if(!s)return oe("Erro: Editor de email n\xE3o apareceu.",{error:!0}),!1;let a=Array.from(document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]')).find(i=>i.offsetParent!==null);if(a){console.log("\u26A0\uFE0F Rascunho detectado. Clicando em Discard..."),Ne(a);let i=null,l=0;for(;!i&&l<10;)await ce(200),i=Array.from(document.querySelectorAll('material-button[debug-id="confirm-button"]')).find(d=>d.offsetParent!==null),l++;i?(console.log("\u2705 Confirmando descarte..."),Ne(i),await ce(2500)):console.warn("\u26A0\uFE0F Cliquei em Discard, mas o bot\xE3o Confirm n\xE3o apareceu.")}if(s){let i=s.closest('[id="email-body-content-top"]'),b=(s.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(i){if(b){let c=b.closest('[aria-hidden="true"]');c&&c.removeAttribute("aria-hidden"),b.focus()}await ce(300),i.innerHTML=`
                <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                    <span id="cases-body-field"><br></span>
                </div>
            `;let d=i.querySelector("#cases-body-field");if(d){let c=document.createRange();c.selectNodeContents(d),c.collapse(!0);let T=window.getSelection();T.removeAllRanges(),T.addRange(c)}return!0}}return oe("Erro cr\xEDtico ao acessar editor.",{error:!0}),!1}async function Ft(e){if(!e)return;oe("Preparando email...",{duration:3e3});let t=gt();if(!await Gt())return;await ce(500);let o=document.querySelector('material-button[debug-id="canned_response_button"]');if(o){o.scrollIntoView({behavior:"smooth",block:"center"}),await ce(200),Ne(o),await ce(1500);let s=document.querySelector("material-auto-suggest-input input");if(s){Ne(s),await ce(200),document.execCommand("insertText",!1,e),s.dispatchEvent(new Event("input",{bubbles:!0}));let r=null,a=0;for(;a<20;){await ce(500),a++;let i=Array.from(document.querySelectorAll("material-select-dropdown-item"));if(i.length>0&&(r=i.find(l=>l.innerText.toLowerCase().includes(e.toLowerCase())),!r&&i.length===1&&(r=i[0]),r))break}if(r){let i=function(c,T){if(c.nodeType===3&&c.nodeValue.includes(T))return c;if(!c.childNodes)return null;for(let h of c.childNodes){let y=i(h,T);if(y)return y}return null};Ne(r),await ce(2e3);let l=ot(),b=l?l.closest('[id="email-body-content-top"]'):document.body,d=i(b,"{%ADVERTISER_NAME%}");if(d){let c=document.createRange(),T=d.nodeValue.indexOf("{%ADVERTISER_NAME%}");c.setStart(d,T),c.setEnd(d,T+19);let h=window.getSelection();h.removeAllRanges(),h.addRange(c),document.execCommand("insertText",!1,t.advertiserName),oe("Email preenchido!")}else oe("Email inserido (Nome n\xE3o substitu\xEDdo).")}else oe(`Template '${e}' n\xE3o encontrado.`,{error:!0})}}else oe("Bot\xE3o Canned Response n\xE3o achado.",{error:!0})}async function vt(e){console.log(`\u{1F680} Iniciando automa\xE7\xE3o (Quick): ${e.name}`),oe("Preparando email...",{duration:3e3});let t=gt(),n=bt();if(!await Gt())return;await ce(600);let s=document.querySelector('input[aria-label="Subject"]');s&&e.subject&&(s.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(s,e.subject),s.dispatchEvent(new Event("input",{bubbles:!0})),await ce(300));let r=ot();if(r){let i=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');i&&(i.focus(),i.click(),i.dispatchEvent(new Event("input",{bubbles:!0}))),await ce(400);let l=new Date;l.setDate(l.getDate()+3);let b=l.getDay();b===6?l.setDate(l.getDate()+2):b===0&&l.setDate(l.getDate()+1);let d=l.toLocaleDateString("pt-BR"),c=e.body;c=c.replace(/\[Nome do Cliente\]/g,t.advertiserName||"Cliente"),c=c.replace(/\[INSERIR URL\]/g,t.websiteUrl||"seu site"),c=c.replace(/\[URL\]/g,t.websiteUrl||"seu site"),c=c.replace(/\[Seu Nome\]/g,n),c=c.replace(/\[MM\/DD\/YYYY\]/g,d),document.execCommand("insertHTML",!1,c),i&&(i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))),oe("Email preenchido com sucesso!",{duration:2e3}),await ce(800)}else oe("Erro ao focar no editor.",{error:!0})}var ao={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},zt={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function Re(e,t,n,o,s,r){let a=document.createElement("div");Object.assign(a.style,ao),Mt(e,a);let i=document.createElement("div");Object.assign(i.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),a.appendChild(i),s&&(s.googleLine=i);let l=document.createElement("div");Object.assign(l.style,{display:"flex",alignItems:"center",gap:"12px"});let b=document.createElement("img");b.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(b.style,{width:"20px",height:"20px",pointerEvents:"none"});let d=document.createElement("span");d.textContent=t,l.appendChild(b),l.appendChild(d);let c=document.createElement("div");Object.assign(c.style,{display:"flex",alignItems:"center",gap:"4px"});let T='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',h='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',y=document.createElement("div");y.innerHTML=T,Object.assign(y.style,zt),y.title="Sobre",y.classList.add("no-drag"),y.onmouseenter=()=>{y.style.background="rgba(255,255,255,0.1)",y.style.color="#FFF"},y.onmouseleave=()=>{y.style.color!=="rgb(138, 180, 248)"&&(y.style.background="transparent",y.style.color="#9AA0A6")};let g=document.createElement("div");g.innerHTML=h,Object.assign(g.style,zt),g.title="Fechar",g.classList.add("no-drag"),g.onmouseenter=()=>{g.style.background="rgba(242, 139, 130, 0.2)",g.style.color="#F28B82"},g.onmouseleave=()=>{g.style.background="transparent",g.style.color="#9AA0A6"},g.onmousedown=E=>E.stopPropagation(),y.onmousedown=E=>E.stopPropagation(),g.onclick=r;let A=io(e,t,n,o);return y.onclick=E=>{E.stopPropagation(),A.style.opacity==="1"?(A.style.opacity="0",A.style.pointerEvents="none",y.style.color="#9AA0A6",y.style.background="transparent"):(A.style.opacity="1",A.style.pointerEvents="auto",y.style.color="#8AB4F8",y.style.background="rgba(138, 180, 248, 0.1)")},c.appendChild(y),c.appendChild(g),a.appendChild(l),a.appendChild(c),a}function io(e,t,n,o){let s=document.createElement("div");return Object.assign(s.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(5px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),s.innerHTML=`
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
    `,document.head.appendChild(e)}function _e(e,t,n){let o=document.getElementById(n);if(!t)return;let s=t.getAttribute("data-moved")==="true",r={x:0,y:0};if(o){let d=o.getBoundingClientRect();r.x=d.left+d.width/2,r.y=d.top+d.height/2}let a,i;if(!s)a=window.innerWidth/2,i=window.innerHeight/2;else{let d=t.getBoundingClientRect();a=d.left+d.width/2,i=d.top+d.height/2,a===0&&i===0&&(a=window.innerWidth/2,i=window.innerHeight/2)}let l=r.x-a,b=r.y-i;e?(me.playGenieOpen(),t.style.transition="none",t.style.opacity="0",t.style.pointerEvents="auto",s?t.style.transform=`translate(${l}px, ${b}px) scale(0.05)`:t.style.transform=`translate(calc(-50% + ${l}px), calc(-50% + ${b}px)) scale(0.05)`,t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("open"),o&&o.classList.add("active"),t.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",t.style.opacity="1",s?t.style.transform="translate(0, 0) scale(1)":t.style.transform="translate(-50%, -50%) scale(1)"}),typeof Pt=="function"&&Pt(t,n)):(me.playSwoosh(),t.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",t.style.pointerEvents="none",requestAnimationFrame(()=>{t.style.opacity="0",s?t.style.transform=`translate(${l}px, ${b}px) scale(0.1)`:t.style.transform=`translate(calc(-50% + ${l}px), calc(-50% + ${b}px)) scale(0.1)`}),setTimeout(()=>{t.classList.remove("open"),o&&o.classList.remove("active"),t.style.transition="",t.style.transform=""},300),typeof St=="function"&&St(t))}function Pt(e,t){St(e);let n=o=>{if(!e.classList.contains("open"))return;let s=e.contains(o.target),r=document.querySelector(".cw-pill"),a=r&&r.contains(o.target);s?(e.classList.remove("idle"),e.style.zIndex="2147483648"):a||(e.classList.add("idle"),e.style.zIndex="2147483646")};e._idleHandler=n,document.addEventListener("mousedown",n)}function St(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}var se={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",gripColor:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",gripActive:"linear-gradient(to left, #4285F4, #EA4335, #FBBC05, #34A853)",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995"},nt=e=>new Promise(t=>setTimeout(t,e));function jt(e){let t="cw-command-center-style";if(!document.getElementById(t)){let h=document.createElement("style");h.id=t,h.innerHTML=`
            @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@500&display=swap');

            /* --- FOCUS OVERLAY (Fundo Escuro) --- */
            .cw-focus-backdrop {
                position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
                background: rgba(0, 0, 0, 0.4); /* Escurece a tela */
                backdrop-filter: blur(4px); /* Desfoca o CRM */
                z-index: 2147483646; /* Logo abaixo da P\xEDlula */
                opacity: 0; pointer-events: none;
                transition: opacity 0.5s cubic-bezier(0.4, 0.0, 0.2, 1);
            }
            .cw-focus-backdrop.active { opacity: 1; pointer-events: auto; }

            /* --- A BASE (O Vidro) --- */
            .cw-pill {
                position: fixed; top: 30%; right: 24px;
                display: flex; flex-direction: column; align-items: center; gap: 12px;
                padding: 16px 8px;
                
                background: ${se.glassBg};
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${se.glassBorder};
                border-radius: 50px;
                box-shadow: 0 8px 32px rgba(0,0,0,0.4);
                z-index: 2147483647;

                /* ESTADO INICIAL: Fora da tela (Direita) e levemente menor */
                opacity: 0;
                transform: translateX(40px) scale(0.95);
                
                /* A Transi\xE7\xE3o de Entrada "Firme" */
                transition: 
                    opacity 0.4s ease-out,
                    transform 0.5s cubic-bezier(0.19, 1, 0.22, 1); /* Curva Exponencial */
            }

            /* ESTADO FINAL */
            .cw-pill.docked {
                opacity: 1;
                transform: translateX(0) scale(1);
            }

            /* --- OS \xCDCONES (As Ferramentas) --- */
/* --- BUTTONS (Estados e Intera\xE7\xE3o) --- */
            .cw-btn {
                width: 40px; height: 40px; 
                border-radius: 50%; border: none; background: transparent;
                display: flex; align-items: center; justify-content: center; 
                cursor: pointer; position: relative;
                color: ${se.iconIdle};
                
                opacity: 0; transform: scale(0.5);
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-btn.popped { opacity: 1; transform: scale(1); }

            /* Hover (Feedback t\xE1til leve) */
            .cw-btn:hover { 
                background: ${se.glassHighlight}; 
                color: ${se.iconActive}; 
                transform: scale(1.1); 
            }

            /* --- ESTADO ATIVO (O M\xF3dulo est\xE1 aberto) --- */
            /* Mant\xE9m a cor da marca acesa e cria um fundo tintado */
            .cw-btn.notes.active { color: ${se.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${se.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${se.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${se.green} !important; background: rgba(129, 201, 149, 0.15); }
            /* INDICADOR DE LED (Abaixo do \xCDcone) */
            .cw-btn::before {
                content: '';
                position: absolute;
                
                /* Posicionamento no Rodap\xE9 Central */
                bottom: 2px; 
                left: 50%; 
                
                /* Tamanho do Dot */
                width: 4px; height: 4px;
                border-radius: 50%;
                
                background-color: currentColor; /* Pega a cor do \xEDcone */
                box-shadow: 0 0 6px currentColor; /* Glow */
                
                /* Estado Inicial: Centralizado no X, invis\xEDvel (Scale 0) */
                transform: translateX(-50%) scale(0);
                
                transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); /* Pop El\xE1stico */
                pointer-events: none;
            }

            /* Quando ativo, o LED "pop" para tamanho real */
            .cw-btn.active::before {
                transform: translateX(-50%) scale(1);
            }
            
            .cw-btn svg { width: 22px; height: 22px; fill: currentColor; pointer-events: none; }

            /* Cores de Marca */
            .cw-btn.notes:hover { color: ${se.blue}; filter: drop-shadow(0 0 5px rgba(138, 180, 248, 0.5)); }
            .cw-btn.email:hover { color: ${se.red}; filter: drop-shadow(0 0 5px rgba(242, 139, 130, 0.5)); }
            .cw-btn.script:hover { color: ${se.purple}; filter: drop-shadow(0 0 5px rgba(197, 138, 249, 0.5)); }
            .cw-btn.links:hover { color: ${se.green}; filter: drop-shadow(0 0 5px rgba(129, 201, 149, 0.5)); }

            /* --- O DIVISOR --- */
            .cw-sep {
                width: 20px; height: 1px; background: rgba(255,255,255,0.2);
                opacity: 0; transition: opacity 0.5s ease;
            }
            .cw-sep.visible { opacity: 1; }

            .cw-grip {
                width: 100%; 
                height: 24px; /* \xC1rea de toque confort\xE1vel */
                display: flex; 
                align-items: center; 
                justify-content: center; 
                cursor: grab;
                /* Removemos padding excessivo para manter alinhamento \xF3tico */
                margin-bottom: 2px; 
            }

            /* A Barra Visual */
            .cw-grip-bar { 
                width: 24px; /* Largura padr\xE3o Google */
                height: 4px; 
                background-color: ${se.iconIdle}; 
                border-radius: 4px; /* P\xEDlula perfeita */
                opacity: 0.4; /* Discreto em repouso */
                transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1); /* Standard Easing */
            }

            /* Hover: Fica n\xEDtido e branco */
            .cw-grip:hover .cw-grip-bar { 
                opacity: 1; 
                background-color: #FFFFFF; 
                transform: scaleY(1.2); /* Engrossa levemente */
            }

            /* Active/Dragging: Feedback de "Agarrou" */
            .cw-grip:active { cursor: grabbing; }
            
            .cw-pill.dragging .cw-grip-bar { 
                background-color: ${se.blue}; /* Azul Google de A\xE7\xE3o */
                width: 16px; /* Encolhe horizontalmente (tens\xE3o f\xEDsica) */
                opacity: 1;
            }

            .cw-grip:active { cursor: grabbing; color: #fff; }
            
           @keyframes successPop {
                0% {
                    box-shadow: 0 0 0 transparent;
                    transform: scale(1);
                }
                50% {
                    box-shadow: 0 0 15px #81C995; /* O brilho m\xE1ximo */
                    transform: scale(1.05); /* Um leve aumento para dar o efeito de pop */
                    border-color: #81C995; /* Opcional: muda a borda tamb\xE9m */
                }
                100% {
                    box-shadow: 0 0 0 transparent;
                    transform: scale(1);
                }
            }

            .cw-pill.system-check {
                /* Executa a anima\xE7\xE3o 'successPop' por 0.6 segundos */
                animation: successPop 0.6s ease-out;
            }
            
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

            /* Esconde os bot\xF5es normais quando processando */
            .cw-pill.processing > :not(.cw-status-container) {
                opacity: 0; pointer-events: none; transform: scale(0.8);
            }

            /* Container do Loader/Success */
            .cw-status-container {
                position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                display: flex; align-items: center; justify-content: center;
                opacity: 0; pointer-events: none; transition: opacity 0.3s ease;
                width: 100%; height: 100%;
            }
            .cw-pill.processing .cw-status-container { opacity: 1; }

            /* Google Dots Loader */
            .cw-dots { display: flex; gap: 4px; }
            .cw-dots span { width: 6px; height: 6px; border-radius: 50%; animation: bounce 1.4s infinite ease-in-out both; }
            .cw-dots span:nth-child(1) { background: ${se.blue}; animation-delay: -0.32s; }
            .cw-dots span:nth-child(2) { background: ${se.red}; animation-delay: -0.16s; }
            .cw-dots span:nth-child(3) { background: ${se.green}; }
            
            @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

            /* Success Check Animado */
            .cw-check svg { width: 28px; height: 28px; stroke-dasharray: 50; stroke-dashoffset: 50; transition: stroke-dashoffset 0.5s ease 0.2s; }
            .cw-pill.success .cw-check svg { stroke-dashoffset: 0; }
        `,document.head.appendChild(h)}let n={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>'},o=document.createElement("div");o.className="cw-pill side-right",o.innerHTML=`
        <div class="cw-grip" title="Arrastar">
            <div class="cw-grip-bar"></div>
        </div>
        
        <button class="cw-btn notes" id="cw-btn-notes" data-label="Case Notes">${n.notes}</button>
        
        <button class="cw-btn email" id="cw-btn-email" data-label="Quick Email">${n.email}</button>
        
        <button class="cw-btn script" id="cw-btn-script" data-label="Call Script">${n.script}</button>
        
        <div class="cw-sep"></div>
        
        <button class="cw-btn links" id="cw-btn-links" data-label="Links">${n.links}</button>

        <div class="cw-status-container">
            <div class="cw-dots" id="cw-loader"><span></span><span></span><span></span></div>
            <div class="cw-check" id="cw-success" style="display:none;">${n.check}</div>
        </div>
    `;let s=document.createElement("div");s.className="cw-focus-backdrop",document.body.appendChild(s),document.body.appendChild(o),o.querySelector(".notes").onclick=h=>{h.stopPropagation(),e.toggleNotes()},o.querySelector(".email").onclick=h=>{h.stopPropagation(),e.toggleEmail()},o.querySelector(".script").onclick=h=>{h.stopPropagation(),e.toggleScript()},o.querySelector(".links").onclick=h=>{h.stopPropagation(),e.toggleLinks()},(async function(){await nt(2800),o.classList.add("docked"),await nt(300);let y=o.querySelectorAll(".cw-btn");o.querySelectorAll(".cw-sep").forEach(A=>A.classList.add("visible"));for(let A=0;A<y.length;A++)y[A].classList.add("popped"),await nt(90);await nt(200),o.classList.add("system-check")})();let r=!1,a,i,l,b,d=3;o.onmousedown=h=>{if(h.target.closest("button"))return;h.preventDefault(),a=h.clientX,i=h.clientY;let y=o.getBoundingClientRect();l=y.left,b=y.top,document.addEventListener("mousemove",c),document.addEventListener("mouseup",T)};function c(h){let y=h.clientX-a,g=h.clientY-i;!r&&Math.sqrt(y*y+g*g)>d&&(r=!0,o.style.transition="none"),r&&(o.style.left=`${l+y}px`,o.style.top=`${b+g}px`,o.style.right="auto",o.style.bottom="auto",o.style.transform="none")}function T(h){if(document.removeEventListener("mousemove",c),document.removeEventListener("mouseup",T),r){r=!1,o.style.transition="left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s ease";let y=window.innerWidth,g=window.innerHeight,A=o.getBoundingClientRect(),E=A.left+A.width/2,j;E<y/2?(j=24,o.classList.remove("side-right"),o.classList.add("side-left")):(j=y-A.width-24,o.classList.remove("side-left"),o.classList.add("side-right"));let V=A.top;V<24&&(V=24),V>g-A.height-24&&(V=g-A.height-24),o.style.left=`${j}px`,o.style.top=`${V}px`,setTimeout(()=>{},600)}else{let y=h.target.closest("button");y&&(y.style.transform="scale(0.9)",setTimeout(()=>y.style.transform="",150))}}}function at(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop"),n=document.getElementById("cw-loader"),o=document.getElementById("cw-success");if(!e||!n||!o)return()=>{};let s=Date.now();return e.classList.add("processing"),t&&t.classList.add("active"),n.style.display="flex",o.style.display="none",function(){let a=Date.now()-s,i=Math.max(0,1500-a);setTimeout(()=>{n.style.display="none",o.style.display="block",o.offsetWidth,e.classList.add("success"),setTimeout(()=>{e.classList.remove("processing","success"),t&&t.classList.remove("active")},2e3)},i)}}function Bt(e){let t=document.createElement("div");t.className="cw-step-scenarios";let n=document.createElement("div");Object.assign(n.style,{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"});let o=document.createElement("div");Object.assign(o.style,{padding:"12px",background:"#f8f9fa",border:"1px dashed #dadce0",borderRadius:"8px",fontSize:"12px",color:"#5f6368",lineHeight:"1.5",minHeight:"40px",display:"flex",alignItems:"center",fontStyle:"italic",transition:"all 0.2s ease"}),o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>";let s=null;Object.entries(ye).forEach(([a,i])=>{let l=document.createElement("div");l.textContent=a,Object.assign(l.style,{padding:"6px 12px",borderRadius:"16px",border:"1px solid #dadce0",background:"#ffffff",fontSize:"13px",color:"#3c4043",cursor:"pointer",userSelect:"none",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",display:"flex",alignItems:"center",gap:"6px"}),l.onmouseenter=()=>{s!==i&&(o.style.background="#fff",o.style.borderColor="#1a73e8",o.style.color="#202124",o.textContent=`"${i.substring(0,120)}${i.length>120?"...":""}"`),s!==i&&(l.style.background="#f1f3f4")},l.onmouseleave=()=>{s!==i&&(s||(o.style.background="#f8f9fa",o.style.borderColor="#dadce0",o.style.color="#5f6368",o.innerHTML="<span>Passe o mouse sobre um cen\xE1rio para visualizar o texto...</span>"),l.style.background="#ffffff")},l.onclick=()=>{me.playClick(),s===i?(s=null,r(),e("")):(s=i,r(),l.style.transform="scale(0.95)",setTimeout(()=>l.style.transform="scale(1)",150),e(i))},n.appendChild(l)});function r(){Array.from(n.children).forEach(a=>{ye[a.textContent]===s?(a.style.background="#e8f0fe",a.style.borderColor="#1a73e8",a.style.color="#1967d2",a.style.fontWeight="500"):(a.style.background="#ffffff",a.style.borderColor="#dadce0",a.style.color="#3c4043",a.style.fontWeight="400")})}return t.appendChild(n),t.appendChild(o),t}var qt=e=>new Promise(t=>setTimeout(t,e));function it(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>e.dispatchEvent(new MouseEvent(n,t)))}function Ct(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let n=document.createRange();n.selectNodeContents(t);let o=window.getSelection();o.removeAllRanges(),o.addRange(n);try{document.execCommand("copy")}catch{oe("Falha ao copiar",{error:!0})}o.removeAllRanges(),document.body.removeChild(t)}function Ht(e){["input","change","keydown","keyup"].forEach(n=>{let o=new Event(n,{bubbles:!0,cancelable:!0});e.dispatchEvent(o)})}function Vt(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function $t(){console.log("Iniciando processo de Nova Nota...");let e=Vt(),t=e.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(a=>a.innerText.trim()==="description");if(o){let a=o.closest("material-fab")||o.closest("material-button");a?(a.style&&(a.style.display="block",a.style.visibility="visible"),it(a)):it(o)}else{let a=document.querySelector("material-fab-speed-dial");if(a){let i=a.querySelector(".trigger");i?(i.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),it(i)):a.click(),await qt(800);let b=Array.from(document.querySelectorAll("i.material-icons-extended")).find(d=>d.innerText.trim()==="description");b&&it(b)}}let s=null,r=0;for(;!s&&r<20;){await qt(300);let a=Vt();if(a.length>t)s=a.find(i=>!e.includes(i)),s||(s=a[a.length-1]);else if(r>10){let i=a.filter(l=>l.offsetParent!==null);i.length>0&&(s=i[i.length-1])}r++}return s}var P={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},ve="cubic-bezier(0.25, 0.8, 0.25, 1)",so={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${P.border}`,backgroundColor:P.bgInput,fontSize:"14px",color:P.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${ve}, box-shadow 0.2s ${ve}, background-color 0.2s`,outline:"none"},Lo={...so,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},Mo={fontSize:"13px",fontWeight:"700",color:P.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},Do={display:"block",fontSize:"13px",fontWeight:"600",color:P.text,marginBottom:"8px",marginTop:"16px"},Go={fontSize:"12px",color:P.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},Fo={fontSize:"12px",color:P.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},zo={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:P.text,cursor:"pointer",padding:"12px 14px",backgroundColor:P.surface,border:`1px solid ${P.border}`,borderRadius:"12px",transition:`all 0.2s ${ve}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},At={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:P.primary},Po={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:P.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${ve}, box-shadow 0.2s ${ve}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},jo={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${P.primary}`,color:P.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${ve}`},Bo={background:"transparent",border:`1px solid ${P.border}`,borderRadius:"20px",color:P.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${ve}`,fontFamily:"'Google Sans', 'Roboto'"};var qo={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:P.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},Vo={fontSize:"13px",fontWeight:"700",color:P.primary,minWidth:"20px",textAlign:"center"},Ho={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${P.border}`,backgroundColor:P.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${ve}, box-shadow 0.2s ${ve}`},$o={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${P.bgInput}`},Uo={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${P.border}`,backgroundColor:P.surface,color:P.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${ve}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},Wo={backgroundColor:P.primaryBg,color:P.primary,borderColor:P.primary,fontWeight:"600"},Yo={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:P.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},Xo={borderTop:`1px solid ${P.bgInput}`,paddingTop:"20px",marginTop:"16px"};var Ko={maxHeight:"240px",overflowY:"auto",border:`1px solid ${P.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:P.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},Qo={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${P.bgInput}`,cursor:"pointer",fontSize:"13px",color:P.text,transition:"background 0.1s",userSelect:"none"};var ro={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},lo={fontSize:"12px",color:"#e37400",marginTop:"4px"},co={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},po={display:"flex",gap:"15px",marginBottom:"10px"};function Ut(){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,ro);let t=document.createElement("label");t.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(t.style,ht,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,po);let o=document.createElement("input");o.type="radio",o.name="ts_usage_mod",o.value="Sim",Object.assign(o.style,At);let s=document.createElement("label");s.textContent="Sim";let r=document.createElement("div");Object.assign(r.style,{display:"flex",alignItems:"center"}),r.appendChild(o),r.appendChild(s);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="N\xE3o",a.checked=!0,Object.assign(a.style,At);let i=document.createElement("label");i.textContent="N\xE3o";let l=document.createElement("div");Object.assign(l.style,{display:"flex",alignItems:"center"}),l.appendChild(a),l.appendChild(i),n.appendChild(r),n.appendChild(l);let b=document.createElement("div");b.style.display="block";let d=document.createElement("label");d.textContent="Qual foi o Motivo?",Object.assign(d.style,ht,{fontSize:"12px"});let c=document.createElement("input");c.type="text",Object.assign(c.style,co);let T=document.createElement("div");T.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(T.style,lo),b.appendChild(d),b.appendChild(c),b.appendChild(T),e.appendChild(t),e.appendChild(n),e.appendChild(b),o.onchange=()=>{b.style.display="none"},a.onchange=()=>{b.style.display="block"};function h(A,E){if(e.style.display="none",!A||A.includes("Education")||!E||E.length===0)return;let j=E.some(m=>m.includes("enhanced")||m==="ec_google_ads"),V=E.some(m=>(m.includes("conversion")||m.includes("ads"))&&!m.includes("enhanced")),f=E.some(m=>m.includes("ga4")||m.includes("analytics")||m.includes("ua")),p=E.some(m=>m.includes("merchant")||m.includes("gmc")||m.includes("shopping"));(j||V&&!f&&!p)&&(e.style.display="block")}function y(){if(e.style.display==="none")return"";let A=`<br><b>Utilizou Tag Support?</b> ${o.checked?"Sim":"N\xE3o"}`;return a.checked&&c.value.trim()!==""&&(A+=`<br><b>Motivo:</b> ${c.value}`),A+="<br>",A}function g(){e.style.display="none",a.checked=!0,o.checked=!1,b.style.display="block",c.value=""}return{element:e,updateVisibility:h,getOutput:y,reset:g}}var D={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},ze={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function Wt(e){let t={};function n(f){let p=f.toLowerCase();return p.includes("ads")||p.includes("conversion")||p.includes("remarketing")?D.brands.ads:p.includes("ga4")||p.includes("analytics")?D.brands.ga4:p.includes("gtm")||p.includes("tag manager")||p.includes("container")?D.brands.gtm:p.includes("merchant")||p.includes("shopping")||p.includes("feed")?D.brands.gmc:D.brands.default}let o=Object.entries(Ie).filter(([f,p])=>p.popular),s={};Object.entries(Ie).forEach(([f,p])=>{if(p.popular)return;let u=n(p.name);s[u.label]||(s[u.label]={brand:u,tasks:[]}),s[u.label].tasks.push({key:f,...p})});let r="cw-zen-tasks";if(!document.getElementById(r)){let f=document.createElement("style");f.id=r,f.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column; height: 100%; width: calc(100% + 32px); margin: -16px;
                font-family: ${D.font}; background: ${D.bg}; position: relative; overflow: hidden;
            }
            
            /* SCROLL AREA */
            .cw-zen-content { flex: 1; overflow-y: auto; padding-bottom: 80px; } /* Espa\xE7o para o Status Bar */

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${D.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${D.white}; 
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
                font-size: 12px; font-weight: 500; color: ${D.textMain}; line-height: 1.2; 
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
                color: ${D.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${D.border}; border-radius: 10px; background: ${D.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${D.blue}; box-shadow: 0 0 0 3px ${D.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${D.border}; border-radius: 10px; background: ${D.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${D.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${D.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${D.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${D.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${D.blueLight}; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${D.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${D.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${D.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${D.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${D.border};
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${D.shadowFloat}; z-index: 10;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${D.textMain}; }
            
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
                font-family: ${D.font}; font-size: 15px; font-weight: 600; color: ${D.textMain};
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
                border-color: ${D.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${D.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${D.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${D.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 10px; font-weight: 700; color: ${D.textSub};
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
        `,document.head.appendChild(f)}let a=document.createElement("div");a.className="cw-zen-container";let i=document.createElement("div");Object.assign(i.style,{display:"none"});let l=document.createElement("div");l.className="cw-screens-container",i.appendChild(l),a.innerHTML=`
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
    `;let b=a.querySelector(".cw-hero-grid"),d=a.querySelector(".cw-acc-container"),c=a.querySelector(".cw-results-container"),T=a.querySelector(".cw-search-input"),h=a.querySelector(".cw-status-bar"),y=a.querySelector(".cw-status-text"),g=a.querySelector(".cw-footer-icons");o.forEach(([f,p])=>{let u=n(p.name),m=document.createElement("div");m.className="cw-hero-card",m.id=`hero-${f}`,m.style.setProperty("--hero-color",u.color),m.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${ze[u.icon]}</div>
                <div class="cw-hero-label">${p.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,m.onclick=v=>{if(v.target.closest(".cw-step-btn"))return;let C=t[f]?t[f].count:0;E(f,C>0?-C:1,p)},m.querySelector(".minus").onclick=()=>E(f,-1,p),m.querySelector(".plus").onclick=()=>E(f,1,p),m.dataset.color=u.color,b.appendChild(m)});function A(f,p){let u=n(p.name),m=document.createElement("div");return m.className="cw-task-item",m.dataset.id=f,m.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${u.bg}; color:${u.color}">
                    ${ze[u.icon]||ze.default}
                </div>
                <div class="cw-task-label">${p.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,m.onclick=v=>{if(v.target.closest(".cw-step-btn"))return;let C=t[f]?t[f].count:0;E(f,C>0?-C:1,p)},m.querySelector(".minus").onclick=()=>E(f,-1,p),m.querySelector(".plus").onclick=()=>E(f,1,p),m}Object.entries(s).forEach(([f,p])=>{let u=document.createElement("div");u.className="cw-acc-group";let m=document.createElement("div");m.className="cw-acc-header",m.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${p.brand.color}"></div>
                ${f}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,m.onclick=()=>{d.querySelectorAll(".cw-acc-group.open").forEach(C=>{C!==u&&C.classList.remove("open")}),u.classList.toggle("open")};let v=document.createElement("div");v.className="cw-acc-body",p.tasks.forEach(C=>{let k=A(C.key,C);v.appendChild(k)}),u.appendChild(m),u.appendChild(v),d.appendChild(u)});function E(f,p,u){t[f]||(t[f]={count:0,data:u,brand:n(u.name)}),t[f].count+=p,t[f].count<=0&&delete t[f],j(),V(),e&&e()}function j(){o.forEach(([v])=>{let C=b.querySelector(`#hero-${v}`);if(!C)return;let k=t[v];k?(C.classList.add("active"),C.querySelector(".cw-step-val").textContent=k.count,C.querySelector(".cw-step-val").style.color=C.dataset.color):C.classList.remove("active")}),a.querySelectorAll(".cw-task-item").forEach(v=>{let C=v.dataset.id,k=t[C];k?(v.classList.add("selected"),v.querySelector(".cw-step-val").textContent=k.count):v.classList.remove("selected")});let p=Object.keys(t),u=0,m=[];if(p.forEach(v=>{let C=t[v];u+=C.count;for(let k=0;k<C.count;k++)m.length<6&&m.push(C.brand)}),u>0){h.classList.add("visible");let v=u>1?"A\xE7\xF5es":"A\xE7\xE3o",C=u>1?"definidas":"definida";y.textContent=`${u} ${v} ${C}`,g.innerHTML="",m.forEach(k=>{let U=document.createElement("div");U.className="cw-mini-icon",U.innerHTML=ze[k.icon]||ze.default;let R=U.querySelector("svg");R&&(R.style.width="14px",R.style.height="14px"),g.appendChild(U)})}else h.classList.remove("visible")}T.addEventListener("input",f=>{let p=f.target.value.toLowerCase();if(p.length>0){d.style.display="none",c.style.display="block",c.innerHTML="";let u=!1;Object.entries(Ie).forEach(([m,v])=>{if(v.name.toLowerCase().includes(p)){u=!0;let C=A(m,v);t[m]&&(C.classList.add("selected"),C.querySelector(".cw-step-val").textContent=t[m].count),c.appendChild(C)}}),u||(c.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else d.style.display="block",c.style.display="none"});function V(){l.innerHTML="";let f=Object.keys(t),p=!1,u="implementation";if(f.length===0){l.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}let m=document.createElement("div");m.className="cw-info-banner",m.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Todos os Screenshots s\xE3o baseados na descri\xE7\xE3o do 
                <a href="https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/" target="_blank" class="cw-info-link">Win Criteria</a>.
            </span>
        `,l.appendChild(m),f.forEach(v=>{let C=t[v].data,k=t[v].count,U=t[v].brand,R=C.screenshots?C.screenshots[u]||[]:["Link da Evid\xEAncia"];if(R.length>0){p=!0;for(let w=1;w<=k;w++){let G=document.createElement("div");G.className="cw-screen-card",G.style.setProperty("--brand-color",U.color),G.style.setProperty("--brand-bg",U.bg),G.style.setProperty("--brand-shadow",U.color+"40");let F=document.createElement("div");F.className="cw-card-header";let B=document.createElement("div");B.className="cw-card-icon",B.innerHTML=ze[U.icon]||ze.default;let O=document.createElement("div");O.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let M=document.createElement("input");M.className="cw-card-title-input",M.id=`name-${v}-${w}`,M.value=`${C.name}${k>1?" #"+w:""}`,M.title="Clique para renomear esta task";let I=document.createElement("span");I.className="cw-edit-hint",I.innerHTML="\u270E Renomear",O.appendChild(M),O.appendChild(I),F.appendChild(B),F.appendChild(O),G.appendChild(F),R.forEach((Z,K)=>{let Y=document.createElement("div");Y.className="cw-input-group";let J=document.createElement("label");J.className="cw-input-label",J.textContent=Z.replace(/📷|:|•/g,"").trim();let ee=document.createElement("input");ee.className="cw-input-field",ee.id=`screen-${v}-${w}-${K}`,ee.placeholder="Cole o link aqui...",ee.setAttribute("autocomplete","off"),ee.addEventListener("input",()=>{ee.value.trim().length>5?ee.classList.add("filled"):ee.classList.remove("filled")});let Se=document.createElement("div");Se.className="cw-input-check",Se.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',Y.appendChild(J),Y.appendChild(ee),Y.appendChild(Se),G.appendChild(Y)}),l.appendChild(G)}}}),i.style.display=p?"block":"none"}return{selectionElement:a,screenshotsElement:i,updateSubStatus:()=>V(),getCheckedElements:()=>Object.keys(t).map(f=>({value:f,closest:()=>({querySelector:()=>({textContent:t[f].count})})})),toggleTask:(f,p=!0)=>{let u=t[f];p&&!u?E(f,1,Ie[f]):!p&&u&&E(f,-u.count,Ie[f])},reset:()=>{for(let f in t)delete t[f];T.value="",d.style.display="block",c.style.display="none",j(),V()}}}function Yt(){let e="v3.6.0",t="bau",n="pt",o=!1,s=!1,r={input:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},textarea:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease",height:"100px",resize:"vertical"},h3:{fontSize:"14px",fontWeight:"600",color:"#202124",margin:"0 0 12px 0"},label:{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},checkboxLabel:{display:"flex",alignItems:"center",marginBottom:"10px",fontSize:"14px",fontWeight:"400",cursor:"pointer",padding:"8px",background:"#f8f9fa",borderRadius:"6px",transition:"background-color 0.2s ease, box-shadow 0.2s ease",userSelect:"none"},checkboxInput:{width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"},buttonBase:{flex:"1 1 0",padding:"10px 0",color:"#fff",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"500",cursor:"pointer",marginTop:"16px"},stepBlock:{borderTop:"1px solid #eee",paddingTop:"12px",marginTop:"12px"},radioContainer:{display:"flex",gap:"15px",marginBottom:"10px"},optionalBtn:{width:"100%",padding:"10px",background:"white",border:"1px dashed #1a73e8",color:"#1a73e8",borderRadius:"6px",cursor:"pointer",fontWeight:"500",fontSize:"13px",marginBottom:"10px",transition:"all 0.2s"},helpLink:{fontSize:"12px",color:"#1a73e8",textDecoration:"none",cursor:"pointer",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"color 0.2s"}},a=Ut(),i=Wt(()=>{let _=i.getCheckedElements().map(S=>S.value);w&&w.value&&a.updateVisibility(w.value,_)}),l=document.createElement("div");l.id="autofill-popup",Object.assign(l.style,Oe,{right:"100px",width:"400px",boxShadow:"none",opacity:"0",pointerEvents:"none",transition:"width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease, transform 0.3s ease"}),l.style.transition+=", width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)";let d=Re(l,"Case Notes Assistant",e,"Gera notas padronizadas automaticamente. Selecione o status, as tasks realizadas e preencha os detalhes para inserir no caso.",{popup:l,googleLine:null},()=>mt());l.appendChild(d);let c=document.createElement("div");Object.assign(c.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1"}),l.appendChild(c);let T=document.createElement("div");T.textContent="created by lucaste@",Object.assign(T.style,Dt),l.appendChild(T);let h=document.createElement("div");h.id="step-lang-type";let y=document.createElement("label");Object.assign(y.style,r.label),h.appendChild(y);let g=document.createElement("div");Object.assign(g.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let A=document.createElement("div");A.textContent="Portugu\xEAs",A.classList.add("no-drag"),Object.assign(A.style,de);let E=document.createElement("div");E.textContent="Espa\xF1ol",E.classList.add("no-drag"),Object.assign(E.style,de),A.onclick=()=>ct("pt"),E.onclick=()=>ct("es"),g.appendChild(A),g.appendChild(E),h.appendChild(g),c.appendChild(h);let j=document.createElement("div");j.id="step-0-case-type";let V=document.createElement("label");Object.assign(V.style,r.label),j.appendChild(V);let f=document.createElement("div");Object.assign(f.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let p=document.createElement("div");p.textContent="BAU",p.classList.add("no-drag"),Object.assign(p.style,de);let u=document.createElement("div");u.textContent="LM",u.classList.add("no-drag"),Object.assign(u.style,de),p.onclick=()=>lt("bau"),u.onclick=()=>lt("lm"),f.appendChild(p),f.appendChild(u),j.appendChild(f),c.appendChild(j);let m=document.createElement("div");m.id="step-1-selection";let v=document.createElement("label");Object.assign(v.style,r.label);let C=document.createElement("select");C.id="main-status",Object.assign(C.style,We),C.innerHTML='<option value="">-- Selecione --</option><option value="NI">NI - Need Info</option><option value="SO">SO - Solution Offered</option><option value="IN">IN - Inactive</option><option value="AS">AS - Assigned</option>';let k=document.createElement("div");Object.assign(k.style,{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginTop:"16px",marginBottom:"8px"});let U=document.createElement("label");Object.assign(U.style,r.label,{marginTop:"0",marginBottom:"0"});let R=document.createElement("a");R.target="_blank",R.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> Guia de Substatus',Object.assign(R.style,r.helpLink),k.appendChild(U),k.appendChild(R);let w=document.createElement("select");w.id="sub-status",Object.assign(w.style,We),w.disabled=!0,m.appendChild(v),m.appendChild(C),m.appendChild(k),m.appendChild(w),c.appendChild(m);let G=document.createElement("div");G.id="step-1-1-portugal",Object.assign(G.style,r.stepBlock,{display:"none"});let F=document.createElement("label");Object.assign(F.style,r.label),G.appendChild(F);let B=document.createElement("div");Object.assign(B.style,r.radioContainer);let O=document.createElement("div");Object.assign(O.style,{display:"flex",alignItems:"center"});let M=document.createElement("input");M.type="radio",M.name="portugal-group",M.value="sim",Object.assign(M.style,r.checkboxInput);let I=document.createElement("label");I.htmlFor="portugal-sim",Object.assign(I.style,{cursor:"pointer"}),O.appendChild(M),O.appendChild(I);let Z=document.createElement("div");Object.assign(Z.style,{display:"flex",alignItems:"center"});let K=document.createElement("input");K.type="radio",K.name="portugal-group",K.value="nao",K.checked=!0,Object.assign(K.style,r.checkboxInput);let Y=document.createElement("label");Y.htmlFor="portugal-nao",Object.assign(Y.style,{cursor:"pointer"}),Z.appendChild(K),Z.appendChild(Y),B.appendChild(O),B.appendChild(Z),G.appendChild(B),c.appendChild(G);function J(x){o=x,x?ee.style.display="block":ee.style.display="none"}M.onchange=()=>J(!0),K.onchange=()=>J(!1);let ee=document.createElement("div");ee.id="step-1-2-consent",Object.assign(ee.style,r.stepBlock,{display:"none"});let Se=document.createElement("label");Object.assign(Se.style,r.label),ee.appendChild(Se);let je=document.createElement("div");Object.assign(je.style,r.radioContainer);let ge=document.createElement("div");Object.assign(ge.style,{display:"flex",alignItems:"center"});let fe=document.createElement("input");fe.type="radio",fe.name="consent-group",fe.value="Sim",fe.checked=!0,Object.assign(fe.style,r.checkboxInput);let ne=document.createElement("label");ne.htmlFor="consent-sim",Object.assign(ne.style,{cursor:"pointer"}),ge.appendChild(fe),ge.appendChild(ne);let X=document.createElement("div");Object.assign(X.style,{display:"flex",alignItems:"center"});let Ce=document.createElement("input");Ce.type="radio",Ce.name="consent-group",Ce.value="N\xE3o",Object.assign(Ce.style,r.checkboxInput);let Le=document.createElement("label");Le.htmlFor="consent-nao",Object.assign(Le.style,{cursor:"pointer"}),X.appendChild(Ce),X.appendChild(Le),je.appendChild(ge),je.appendChild(X),ee.appendChild(je),c.appendChild(ee);let Me=document.createElement("div");Me.id="step-1-5-snippets",Object.assign(Me.style,r.stepBlock,{display:"none"});let Qe=document.createElement("h3");Object.assign(Qe.style,r.h3),Qe.textContent="Cen\xE1rios Comuns";let he=Bt(x=>{let _=document.querySelector("textarea");_&&(_.value=x,_.dispatchEvent(new Event("input")),_.style.transition="background-color 0.2s",_.style.backgroundColor="#e8f0fe",setTimeout(()=>_.style.backgroundColor="#fff",300))});he.id="snippet-container",Me.appendChild(Qe),Me.appendChild(he),c.appendChild(Me);let xe=document.createElement("div");xe.id="step-2-tasks",Object.assign(xe.style,r.stepBlock,{display:"none"});let pe=document.createElement("button");pe.textContent="+ Gostaria de selecionar uma task?",Object.assign(pe.style,r.optionalBtn),pe.onmouseover=()=>{pe.style.background="#e8f0fe"},pe.onmouseout=()=>{pe.style.background="white"};let Be=document.createElement("h3");Object.assign(Be.style,r.h3);let wt=document.createElement("div");wt.id="task-checkboxes-container",xe.appendChild(pe),xe.appendChild(wt),xe.appendChild(Be),xe.appendChild(i.selectionElement),c.appendChild(xe);let Ae=document.createElement("div");Ae.id="step-3-form",Object.assign(Ae.style,r.stepBlock,{display:"none"});let rt=document.createElement("h3");Object.assign(rt.style,r.h3),Ae.appendChild(rt);let ke=document.createElement("div");ke.id="dynamic-form-fields-container",Ae.appendChild(ke),Ae.appendChild(a.element),Ae.appendChild(i.screenshotsElement),c.appendChild(Ae);let De=document.createElement("div");De.id="step-4-email",Object.assign(De.style,{display:"none",marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #eee"});let Ge=document.createElement("label");Ge.style.display="flex",Ge.style.alignItems="center",Ge.style.cursor="pointer",Ge.style.fontSize="14px";let Fe=document.createElement("input");Fe.type="checkbox",Fe.checked=!0,Object.assign(Fe.style,r.checkboxInput),Ge.appendChild(Fe),Ge.appendChild(document.createTextNode("Preencher email automaticamente?")),De.appendChild(Ge),c.appendChild(De);let qe=document.createElement("div");Object.assign(qe.style,{display:"none",gap:"8px",padding:"0"}),c.appendChild(qe);let He=document.createElement("button");Object.assign(He.style,r.buttonBase,{backgroundColor:"#5f6368"}),He.textContent="Copiar";let $e=document.createElement("button");Object.assign($e.style,r.buttonBase,{backgroundColor:"#1a73e8"}),$e.textContent="Preencher",qe.appendChild(He),qe.appendChild($e);let Ue=document.createElement("div");Object.assign(Ue.style,Je),Ue.className="no-drag",Ue.title="Redimensionar",l.appendChild(Ue),et(l,Ue),document.body.appendChild(l);function lt(x){t=x;let _=Ye();Object.assign(p.style,de),Object.assign(u.style,de),x==="bau"?(Object.assign(p.style,_),R.href="https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657"):(Object.assign(u.style,_),R.href="https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243"),w.value&&w.dispatchEvent(new Event("change"))}function z(x){try{if(Te&&Te[n]&&Te[n][x])return Te[n][x];if(Te&&Te.pt&&Te.pt[x])return Te.pt[x]}catch{}return x}function Jt(){y.textContent=z("idioma"),V.textContent=z("fluxo"),v.textContent=z("status_principal"),U.textContent=z("substatus"),Qe.textContent=z("cenarios_comuns"),Be.textContent=z("selecione_tasks"),rt.textContent=z("preencha_detalhes"),He.textContent=z("copiar"),$e.textContent=z("preencher"),C.querySelector('option[value=""]')&&(C.querySelector('option[value=""]').textContent=z("select_status")),w.querySelector('option[value=""]')&&(w.querySelector('option[value=""]').textContent=z("select_substatus")),F.textContent=z("caso_portugal"),I.textContent=z("sim"),Y.textContent=z("nao"),Se.textContent=z("consentiu_gravacao"),ne.textContent=z("sim"),Le.textContent=z("nao"),ke.querySelectorAll("label").forEach(x=>{let _=x.nextElementSibling.id.replace("field-",""),S=z(_.toLowerCase());S!==_.toLowerCase()?x.textContent=S:x.textContent=_.replace(/_/g," ").replace(/\b\w/g,q=>q.toUpperCase())+":"}),pe.textContent="+ "+(n==="pt"?"Gostaria de selecionar uma task?":"Quisiera seleccionar una tarea?")}function ct(x){n=x;let _=Ye();Object.assign(A.style,de),Object.assign(E.style,de),x==="pt"?(Object.assign(A.style,_),G.style.display="block",J(o)):(Object.assign(E.style,_),G.style.display="none",ee.style.display="none"),Jt(),w.value&&w.dispatchEvent(new Event("change"))}function dt(x){(x.value.trim()===""||x.value.trim()==="\u2022")&&(x.value="\u2022 "),x.onkeydown=function(_){if(_.key==="Enter"){_.preventDefault();let S=this.selectionStart,q=this.selectionEnd,te=this.value,re=te.lastIndexOf(`
`,S-1)+1,be=te.substring(re,S),le=be.trim()==="\u2022"||be.trim()===""?`
`:`
\u2022 `;this.value=te.substring(0,S)+le+te.substring(q),this.selectionStart=this.selectionEnd=S+le.length}else if(_.key==="Backspace"){let S=this.selectionStart;if(S===this.selectionEnd&&S>0){let q=this.value.substring(0,S);q.endsWith(`
\u2022 `)?(_.preventDefault(),this.value=q.substring(0,S-3)+this.value.substring(this.selectionEnd),this.selectionStart=this.selectionEnd=S-3):q==="\u2022 "&&(_.preventDefault(),this.value="",this.selectionStart=this.selectionEnd=0)}}}}function pt(){let x=typeof he<"u"?he:document.getElementById("snippet-container");if(!x)return;let _=x.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'),S={},q=new Set;_.forEach(W=>{let H=W.id,L=ye[H];if(L)for(let N in L)N==="linkedTask"?q.add(L.linkedTask):N!=="type"&&(S[N]||(S[N]=[]),S[N].includes(L[N])||S[N].push(L[N]))});let te=new Set;Object.values(ye).forEach(W=>{Object.keys(W).forEach(H=>{H!=="linkedTask"&&H!=="type"&&te.add(H)})}),te.forEach(W=>{let H=document.getElementById(W);if(H){let L=S[W]||[],N="";Ke.includes(W.replace("field-",""))?(N=L.map($=>$.startsWith("\u2022 ")?$:"\u2022 "+$).join(`
`),N===""?N="\u2022 ":N.endsWith(`
\u2022 `)||(N+=`
\u2022 `)):N=L.join(`

`),N.trim()!=="\u2022"&&N.trim()!==""?H.value=N:Ke.includes(W.replace("field-",""))?H.value="\u2022 ":H.value="",H.tagName==="TEXTAREA"&&typeof dt=="function"&&dt(H)}});let re=new Set,be=new Set;x.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(W=>{let H=ye[W.id];H&&H.linkedTask&&(W.checked?re.add(H.linkedTask):be.add(H.linkedTask))}),be.forEach(W=>{re.has(W)||i.toggleTask(W,!1)}),re.forEach(W=>{i.toggleTask(W,!0)})}C.onchange=()=>{let x=C.value;if(ut(1.5),w.innerHTML=`<option value="">${z("select_substatus")}</option>`,!x){w.disabled=!0;return}for(let _ in Xe){let S=Xe[_];if(S.status===x){let q=document.createElement("option");q.value=_,q.textContent=S.name,w.appendChild(q)}}w.disabled=!1},w.onchange=()=>{let x=w.value;if(ut(1.5),!x)return;i.updateSubStatus(x);let _=Xe[x];he.innerHTML="";let S=(L,N,$)=>{let ae=document.createElement("label");Object.assign(ae.style,r.checkboxLabel),ae.onmouseover=()=>ae.style.backgroundColor="#e8eaed",ae.onmouseout=()=>ae.style.backgroundColor="#f8f9fa";let Q=document.createElement("input");return Q.type=N,Q.id=L.id,Object.assign(Q.style,r.checkboxInput),ae.appendChild(Q),ae.appendChild(document.createTextNode(` ${L.text}`)),$.appendChild(ae),Q},q=[],te="radio";if(x==="NI_Awaiting_Inputs")q=[{id:"quickfill-ni-inicio-manual",text:"In\xEDcio 2/6 (Manual)"},{id:"quickfill-ni-cms-access",text:"In\xEDcio 2/6 (ADV sem acesso ao CMS)"},{id:"quickfill-ni-followup-bau",text:"Follow-up 2/6 (BAU)"},{id:"quickfill-ni-followup-lm",text:"Follow-up 2/6 (LM)"}];else if(x.startsWith("SO_"))te="checkbox",q=[{id:"quickfill-gtm-install",text:"Instala\xE7\xE3o do GTM"},{id:"quickfill-whatsapp",text:"Convers\xE3o de WhatsApp"},{id:"quickfill-form",text:"Convers\xE3o de Formul\xE1rio (Padr\xE3o)"},{id:"quickfill-ecw4-close",text:"Fechamento ECW4 (P\xF3s 7 dias)"}];else if(x.startsWith("AS_")){te="checkbox";let L=document.createElement("label");L.textContent=z("cenarios_comuns"),Object.assign(L.style,r.label),he.appendChild(L),q=[{id:"quickfill-as-no-show",text:"Anunciante n\xE3o compareceu (respondeu e-mail)"},{id:"quickfill-as-insufficient-time",text:"Tempo insuficiente"},{id:"quickfill-as-no-access",text:"Anunciante sem acessos necess\xE1rios"}]}else x.startsWith("IN_")&&(q=[{id:"quickfill-in-nrp-bau",text:"NRP (BAU - 3 tentativas)"},{id:"quickfill-in-nrp-lm",text:"NRP (LM - Sem tentativas)"},{id:"quickfill-in-no-show-bau",text:"No-Show (BAU - 3 tentativas)"},{id:"quickfill-in-2-6-final",text:"Finaliza\xE7\xE3o 2/6 (Sem Resposta)"},{id:"quickfill-in-manual",text:"Outro (Manual)"}]);let re=q.filter(L=>{let N=ye[L.id];return!N.type||N.type==="all"||N.type===t});re.forEach((L,N)=>{let $=S(L,te,he);te==="radio"&&($.name="scenario-radio-group",N===0&&($.checked=!0))}),re.length>0&&(Me.style.display="block"),_.requiresTasks?(pe.style.display="none",Be.style.display="block",i.selectionElement.style.display="block",xe.style.display="block"):(pe.style.display="block",Be.style.display="none",i.selectionElement.style.display="none",xe.style.display="block"),ke.innerHTML="";let be=_.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(be)].forEach(L=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(L))return;let N=L.slice(1,-1),$=document.createElement("label"),ae=z(N.toLowerCase());$.textContent=ae!==N.toLowerCase()?ae:N.replace(/_/g," ").replace(/\b\w/g,ie=>ie.toUpperCase())+":",Object.assign($.style,r.label);let Q;Ke.includes(N)?(Q=document.createElement("textarea"),Object.assign(Q.style,r.textarea),Q.classList.add("bullet-textarea"),dt(Q)):yt.includes(N)?(Q=document.createElement("textarea"),Object.assign(Q.style,r.textarea)):(Q=document.createElement("input"),Q.type="text",Object.assign(Q.style,r.input),N==="REASON_COMMENTS"&&(x.startsWith("NI_")||x.startsWith("IN_"))&&(Object.assign($.style,{display:"none"}),Object.assign(Q.style,{display:"none"}))),N==="ON_CALL"&&t==="lm"&&(Object.assign($.style,{display:"none"}),Object.assign(Q.style,{display:"none"}),Q.value="N/A"),Q.id=`field-${N}`,ke.appendChild($),ke.appendChild(Q)});let W=he.querySelectorAll('input[type="checkbox"], input[type="radio"]');W.length>0&&(W.forEach(L=>{L.removeEventListener("change",pt),L.addEventListener("change",pt)}),pt()),Ae.style.display="block",tt[x]?De.style.display="block":De.style.display="none",qe.style.display="flex";let H=i.getCheckedElements().map(L=>L.value);a.updateVisibility(x,H)},pe.onclick=()=>{pe.style.display="none",Be.style.display="block",i.selectionElement.style.display="block"};function Et(){let x=w.value;if(!x)return null;let S=Xe[x].template.replace(/\n/g,"<br>"),q='style="margin-bottom: 12px; padding-left: 30px;"',te=[],re="",be=i.getCheckedElements();be.length>0&&be.forEach(H=>{let L=H.value,N=Ie[L],$=H.closest().querySelector(".stepper-count"),ae=$?parseInt($.textContent):1;ae>1?te.push(`${N.name} (x${ae})`):te.push(N.name)});let le=i.screenshotsElement;if(le){let H=Array.from(le.querySelectorAll('input[id^="name-"]'));H.length>0&&H.forEach(L=>{let N=L.value,$=L.closest(".cw-screen-card");if($){let ae=$.querySelectorAll('input[id^="screen-"]'),Q=!1,ie="";ae.forEach(ue=>{let Tt=ue.closest(".cw-input-group"),kt=Tt?Tt.querySelector(".cw-input-label"):null,eo=kt?kt.textContent:"Evid\xEAncia",Ot=ue.value.trim(),to=Ot?` ${Ot}`:"";ie+=`<li>${eo} -${to}</li>`,Q=!0}),Q&&(re+=`<b>${N}</b>`,re+=`<ul ${q}>${ie}</ul>`)}})}if(S.includes("{TAGS_IMPLEMENTED}")?S=S.replace(/{TAGS_IMPLEMENTED}/g,te.join(", ")||"N/A"):te.length>0&&(S+=`<br><b>Tags:</b> ${te.join(", ")}<br>`),S.includes("{SCREENSHOTS_LIST}")?S=S.replace(/{SCREENSHOTS_LIST}/g,re?`${re}`:"N/A"):re!==""&&(S+=`<br>${re}`),n==="pt"&&o){let H=fe.checked?z("sim"):z("nao");S=S.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${z("consentiu_gravacao")}</b> ${H}<br><br>`),S=S.replace(/{CASO_PORTUGAL}/g,`<br><b>${z("caso_portugal")}</b> ${z("sim")}<br>`)}else n==="pt"&&!o?(S=S.replace(/{CASO_PORTUGAL}/g,`<br><b>${z("caso_portugal")}</b> ${z("nao")}<br>`),S=S.replace(/{CONSENTIU_GRAVACAO}/g,"")):(S=S.replace(/{CASO_PORTUGAL}/g,""),S=S.replace(/{CONSENTIU_GRAVACAO}/g,""));return ke.querySelectorAll("input, textarea").forEach(H=>{let L=H.id.replace("field-",""),N=new RegExp(`{${L}}`,"g"),$=H.value;if(L==="REASON_COMMENTS"&&(x.startsWith("NI_")||x.startsWith("IN_"))){let ie=he.querySelector('input[type="radio"]:checked');ie&&ye[ie.id]&&($=ye[ie.id]["field-REASON_COMMENTS"])}if(Ke.includes(L)&&$.trim()!==""){let ie=$.split(`
`).map(ue=>ue.trim()).filter(ue=>ue!==""&&ue!=="\u2022").map(ue=>ue.startsWith("\u2022 ")?ue.substring(2):ue).map(ue=>`<li>${ue}</li>`).join("");$=ie?`<ul ${q}>${ie}</ul>`:""}else yt.includes(L)?$=$.split(`
`).filter(ie=>ie.trim()!=="").map(ie=>`<p style="margin: 0 0 8px 0;">${ie}</p>`).join(""):H.tagName==="TEXTAREA"&&($=$.replace(/\n/g,"<br>"));let ae=$.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(ae===""||ae==="\u2022"||ae.toLowerCase()==="n/a"){let ie=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${L}\\}(?:<br>\\s*)?`,"gi");ie.test(S)?S=S.replace(ie,""):S=S.replace(N,"")}else S=S.replace(N,$.replace(/\$/g,"$$$$"))}),S=S.replace(/{([A-Z0-9_]+)}/g,""),S=S.replace(/(<br>){3,}/g,"<br><br>"),typeof a<"u"&&a.getOutput&&(S+=a.getOutput()),S}He.onclick=()=>{let x=Et();x?(Ct(x),oe(z("copiado_sucesso"))):oe(z("selecione_substatus"),{error:!0})},$e.onclick=async()=>{let x=w.value,_=Et();if(!_){oe(z("selecione_substatus"),{error:!0});return}Ct(_),mt();let S=at(),q=await $t();if(q)try{if(q.focus(),q.innerHTML.trim()==="<p><br></p>"||q.innerHTML.trim()==="<br>"||q.innerText.trim()===""){let le=document.createRange();le.selectNodeContents(q);let W=window.getSelection();W.removeAllRanges(),W.addRange(le),document.execCommand("delete",!1,null)}else if(!q.innerHTML.endsWith("<br><br>")){let le=document.createRange();le.selectNodeContents(q),le.collapse(!1);let W=window.getSelection();W.removeAllRanges(),W.addRange(le),document.execCommand("insertHTML",!1,"<br><br>")}document.execCommand("insertHTML",!1,_),Ht(q),setTimeout(()=>{oe(z("inserido_copiado"))},600);let re=typeof Fe<"u"&&Fe?Fe.checked:!0;if(x&&tt[x]&&re){let le=tt[x];await Ft(le),await new Promise(W=>setTimeout(W,500))}S(),ut(1.5),C.value="",w.innerHTML=`<option value="">${z("select_substatus")}</option>`,w.disabled=!0}catch(te){console.error(te),oe("Erro ao inserir.",{error:!0}),S()}};function ut(x=1.5){x<=1.5&&(Me.style.display="none",he.innerHTML=""),x<=2&&(xe.style.display="none",i.reset(),pe.style.display="none"),x<=3&&(Ae.style.display="none",ke.innerHTML="",a.reset(),qe.style.display="none",De.style.display="none")}function mt(){if(s=!s,s){let x=l.querySelector(".cw-expand-btn");x&&typeof x.resetState=="function"&&x.resetState()}_e(s,l,"cw-btn-notes")}return lt("bau"),ct("pt"),mt}var Pe={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function Xt(){let e="v4.0.0",t=Object.keys(Pe)[0],n="",o="list",s={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:"#FAFAFA"},r={display:"flex",width:"200%",height:"100%",transition:"transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",transform:"translateX(0)"},a={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},i={width:"100%",padding:"10px 12px 10px 36px",borderRadius:"8px",border:"none",background:"#F0F2F5",fontSize:"14px",color:"#202124",boxSizing:"border-box",outline:"none",transition:"all 0.2s ease",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"10px center"},l={display:"flex",gap:"6px",padding:"4px 4px 8px 4px",overflowX:"auto",scrollbarWidth:"none"},b={padding:"6px 12px",borderRadius:"16px",border:"1px solid transparent",background:"transparent",color:"#5f6368",fontSize:"12px",fontWeight:"500",cursor:"pointer",transition:"all 0.2s ease",flexShrink:"0"},d={background:"#E8F0FE",color:"#1967D2",fontWeight:"600"},c={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",marginBottom:"6px",borderRadius:"8px",background:"#fff",border:"1px solid #dadce0",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",position:"relative",overflow:"hidden"},T=!1,h=document.createElement("div");h.id="quick-email-popup",Object.assign(h.style,Oe,{right:"100px",width:"480px",height:"600px",boxShadow:"none",opacity:"0",pointerEvents:"none"});let y={popup:h,googleLine:null,focusElement:null};function g(){T=!T,_e(T,h,"cw-btn-email"),T||setTimeout(()=>R(),300)}let A=Re(h,"Emails R\xE1pidos",e,"Selecione, visualize e insira com um clique.",y,()=>g()),E=document.createElement("div");Object.assign(E.style,s);let j=document.createElement("div");Object.assign(j.style,r);let V=document.createElement("div");Object.assign(V.style,a);let f=document.createElement("div");Object.assign(f.style,{padding:"16px 16px 4px 16px",flexShrink:"0",background:"#fff",zIndex:"10",display:"flex",flexDirection:"column",gap:"8px",borderBottom:"1px solid #f1f3f4"});let p=document.createElement("input");p.placeholder="Buscar template...",Object.assign(p.style,i),p.onfocus=()=>{p.style.background="#fff",p.style.boxShadow="0 2px 8px rgba(0,0,0,0.05)"},p.onblur=()=>{p.style.background="#F0F2F5",p.style.boxShadow="none"},y.focusElement=p;let u=document.createElement("div");Object.assign(u.style,l);let m=document.createElement("div");Object.assign(m.style,{padding:"12px 16px",overflowY:"auto",flexGrow:"1"}),f.appendChild(p),f.appendChild(u),V.appendChild(f),V.appendChild(m);let v=document.createElement("div");Object.assign(v.style,a);let C=document.createElement("div");Object.assign(C.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),v.appendChild(C),j.appendChild(V),j.appendChild(v),E.appendChild(j),h.appendChild(A),h.appendChild(E);let k=document.createElement("div");Object.assign(k.style,{padding:"8px 16px",borderTop:"1px solid #eee",textAlign:"center",fontSize:"10px",color:"#9aa0a6",background:"#fff",flexShrink:"0"}),k.textContent="created by lucaste@",h.appendChild(k),document.body.appendChild(h);function U(F){o="detail",j.style.transform="translateX(-50%)";let B='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',O='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';C.innerHTML=`
        <div style="
            position: sticky; top: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px);
            border-bottom: 1px solid #f1f3f4; padding: 12px 20px; z-index: 10;
            display: flex; align-items: center; gap: 8px;
        ">
            <button id="csa-back-btn" style="
                background:none; border:none; cursor:pointer; display:flex; align-items:center; justify-content: center;
                color:#5f6368; width: 32px; height: 32px; margin-left:-8px; border-radius:50%; transition:background 0.2s;
            ">
                ${B}
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
                <div style="
                    font-size:13px; 
                    line-height:1.35; /* <--- AJUSTE DE ESPA\xC7AMENTO (Mais compacto) */
                    color:#3c4043; 
                    white-space: pre-wrap; 
                    padding: 0 4px;
                ">${F.body}</div>
            </div>
        </div>

        <div style="
            position: sticky; bottom: 0; left: 0; width: 100%; 
            padding: 20px; box-sizing: border-box;
            background: linear-gradient(to top, #ffffff 80%, rgba(255,255,255,0)); /* Fade out no topo */
            margin-top: auto; /* Empurra para o fim se sobrar espa\xE7o */
        ">
            <button id="csa-insert-btn" style="
                width: 100%; padding: 12px; 
                background: #1a73e8; color: white; border: none; border-radius: 8px; 
                font-weight: 600; font-size: 14px; cursor: pointer; 
                box-shadow: 0 4px 12px rgba(26, 115, 232, 0.3);
                display: flex; align-items: center; justify-content: center; gap: 8px;
                transition: transform 0.1s, background 0.2s;
            ">
                ${O} Inserir Template
            </button>
        </div>
      `;let M=C.querySelector("#csa-back-btn");M.onmouseover=()=>M.style.backgroundColor="#f1f3f4",M.onmouseout=()=>M.style.backgroundColor="transparent",M.onclick=R;let I=C.querySelector("#csa-insert-btn");I.onmouseover=()=>I.style.backgroundColor="#174ea6",I.onmouseout=()=>I.style.backgroundColor="#1a73e8",I.onclick=async()=>{I.style.transform="scale(0.96)",g();let Z=at();try{await vt(F),Z()}catch(K){console.error(K),Z()}setTimeout(()=>{I.style.transform="scale(1)",R()},300)}}function R(){o="list",j.style.transform="translateX(0)"}function w(){u.innerHTML="",Object.keys(Pe).forEach(F=>{let B=Pe[F],O=document.createElement("button");O.textContent=B.title,Object.assign(O.style,b),t===F&&n===""&&Object.assign(O.style,d),O.onclick=()=>{t=F,n="",p.value="",w(),G()},u.appendChild(O)})}function G(){m.innerHTML="";let F=[];if(n.trim()!==""?Object.values(Pe).forEach(M=>{let I=M.emails.filter(Z=>Z.name.toLowerCase().includes(n.toLowerCase()));F=[...F,...I]}):Pe[t]&&(F=Pe[t].emails),F.length===0){m.innerHTML='<div style="text-align:center; padding:60px 20px; color:#9aa0a6;"><div style="font-size:24px; margin-bottom:8px;">\u{1F50D}</div><div style="font-size:14px;">Nenhum template encontrado.</div></div>';return}let B='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>',O='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';F.forEach(M=>{let I=document.createElement("div");Object.assign(I.style,c);let Z=M.subject.length>50?M.subject.substring(0,50)+"...":M.subject;I.innerHTML=`
        <div style="flex-grow: 1; margin-right: 12px; min-width: 0;">
            <div style="font-size:13px; font-weight:600; color:#202124; margin-bottom:2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${M.name}</div>
            <div style="font-size:12px; color:#5f6368; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${Z}</div>
        </div>
        <div style="display:flex; gap:6px;">
            <button class="action-btn view" title="Visualizar" style="width:32px; height:32px; border-radius:50%; border:none; background:#f1f3f4; color:#5f6368; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">${O}</button>
            <button class="action-btn send" title="Inserir Agora" style="width:32px; height:32px; border-radius:50%; border:none; background:#e8f0fe; color:#1a73e8; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">${B}</button>
        </div>
      `,I.onmouseenter=()=>{I.style.background="#F8F9FA",I.style.borderColor="#1a73e8"},I.onmouseleave=()=>{I.style.background="#fff",I.style.borderColor="#dadce0"};let K=I.querySelector(".view");K.onclick=J=>{J.stopPropagation(),U(M)},K.onmouseenter=()=>{K.style.background="#d2e3fc",K.style.color="#174ea6"},K.onmouseleave=()=>{K.style.background="#f1f3f4",K.style.color="#5f6368"};let Y=I.querySelector(".send");Y.onclick=J=>{J.stopPropagation(),Y.style.transform="scale(0.9)",setTimeout(()=>Y.style.transform="scale(1)",150),vt(M),g()},Y.onmouseenter=()=>{Y.style.background="#1a73e8",Y.style.color="#fff",Y.style.boxShadow="0 2px 6px rgba(26,115,232,0.3)"},Y.onmouseleave=()=>{Y.style.background="#e8f0fe",Y.style.color="#1a73e8",Y.style.boxShadow="none"},I.onclick=()=>U(M),m.appendChild(I)})}return p.addEventListener("input",F=>{n=F.target.value,n!==""?Array.from(u.children).forEach(B=>Object.assign(B.style,b)):w(),G()}),w(),G(),g}var Kt={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function Qt(){let e="v2.1 (Apple Motion)",t={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},contentArea:{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#f8f9fa",scrollBehavior:"smooth"},card:{background:"#ffffff",border:"1px solid #dadce0",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"transform 0.2s ease, box-shadow 0.2s ease",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},cardTitle:{fontSize:"13px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.6px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between",userSelect:"none"},itemRow:{display:"flex",alignItems:"flex-start",padding:"10px 8px",cursor:"pointer",borderRadius:"8px",transition:"background-color 0.15s ease, opacity 0.3s ease",color:"#202124",fontSize:"14px",lineHeight:"1.5",marginBottom:"2px"},itemCompleted:{opacity:"0.5",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"20px",height:"20px",borderRadius:"6px",border:"2px solid #dadce0",marginRight:"14px",marginTop:"1px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",background:"#fff"},footer:{padding:"12px 16px",borderTop:"1px solid #eee",background:"#fff",display:"flex",justifyContent:"space-between",alignItems:"center"},resetBtn:{background:"transparent",border:"none",color:"#d93025",fontSize:"12px",fontWeight:"600",cursor:"pointer",padding:"6px 12px",borderRadius:"20px",transition:"background 0.2s ease",display:"flex",alignItems:"center",gap:"4px"}},n={},o="PT",s="BAU",r=!1,a=document.createElement("div");a.id="call-script-popup",Object.assign(a.style,Oe,{right:"auto",left:"50%",width:"400px",height:"650px",display:"flex",flexDirection:"column",boxShadow:"none",opacity:"0",pointerEvents:"none"});let i={popup:a,googleLine:null};function l(){r=!r,_e(r,a,"cw-btn-script")}let b=Re(a,"Call Script",e,"Guia interativo para condu\xE7\xE3o de chamadas.",i,()=>{l()});a.appendChild(b);let d=document.createElement("div");Object.assign(d.style,t.progressBarContainer);let c=document.createElement("div");Object.assign(c.style,t.progressBarFill),d.appendChild(c),a.appendChild(d);let T=document.createElement("div");T.id="csa-content",Object.assign(T.style,t.contentArea),a.appendChild(T);let h=document.createElement("div");Object.assign(h.style,t.footer);let y=document.createElement("span");y.textContent="by lucaste@",Object.assign(y.style,{fontSize:"10px",color:"#bdc1c6"});let g=document.createElement("button");g.innerHTML=`
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
    Resetar Script
  `,Object.assign(g.style,t.resetBtn),g.onmouseenter=()=>g.style.background="#fce8e6",g.onmouseleave=()=>g.style.background="transparent",g.onclick=()=>{g.style.transform="scale(0.9)",setTimeout(()=>g.style.transform="scale(1)",150);for(let R in n)delete n[R];v()},h.appendChild(y),h.appendChild(g),a.appendChild(h);let A=document.createElement("div");Object.assign(A.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let E=document.createElement("div");Object.assign(E.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let j=document.createElement("div");j.textContent="BAU";let V=document.createElement("div");V.textContent="LT",Object.assign(j.style,de),Object.assign(V.style,de),E.appendChild(j),E.appendChild(V);let f=document.createElement("select");Object.assign(f.style,We,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),f.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',f.value=o,A.appendChild(E),A.appendChild(f),T.appendChild(A);let p=document.createElement("div");p.id="csa-checklist-area",T.appendChild(p);let u=document.createElement("div");Object.assign(u.style,Je),u.className="no-drag",u.title="Redimensionar",a.appendChild(u),et(a,u),document.body.appendChild(a);function m(R){return R}function v(){p.innerHTML="";let R=`${o} ${s}`,w=Kt[R];if(!w){p.innerHTML=`<div style="padding: 30px; text-align: center; color: #bdc1c6; display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <div style="font-size: 24px;">\u2615</div>
        <div>Script n\xE3o configurado.</div>
      </div>`,c.style.width="0%";return}let G=w.color||"#1a73e8",F=0,B=0;["inicio","fim"].forEach(O=>{w[O]&&(F+=w[O].length)}),["inicio","fim"].forEach((O,M)=>{let I=w[O];if(!I||I.length===0)return;let Z=document.createElement("div");Object.assign(Z.style,t.card);let K=document.createElement("div");Object.assign(K.style,t.cardTitle);let Y=O==="inicio"?"Abertura":"Fechamento";o.includes("ES")&&(Y=O==="inicio"?"Apertura":"Cierre"),o.includes("EN")&&(Y=O==="inicio"?"Opening":"Closing"),K.textContent=Y;let J=document.createElement("span");J.style.fontSize="11px",J.style.opacity="0.7",J.style.fontWeight="500",J.style.background="#f1f3f4",J.style.padding="2px 8px",J.style.borderRadius="10px",K.appendChild(J),Z.appendChild(K);let ee=0;I.forEach((Se,je)=>{let ge=`${R}-${O}-${je}`,fe=!!n[ge];fe&&(B++,ee++);let ne=document.createElement("div");Object.assign(ne.style,t.itemRow);let X=document.createElement("div");Object.assign(X.style,t.checkbox);let Ce=document.createElement("span");Ce.innerHTML=Se,Ce.style.flex="1",fe?(Object.assign(ne.style,t.itemCompleted),X.style.background=G,X.style.borderColor=G,X.style.transform="scale(1)",X.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ne.style.textDecoration="none",ne.style.opacity="1",X.style.background="transparent",X.style.borderColor="#dadce0",X.style.transform="scale(1)",X.innerHTML=""),ne.onclick=()=>{let Le=!n[ge];n[ge]=Le,me.playClick(),Le?(X.style.transform="scale(1.2)",setTimeout(()=>X.style.transform="scale(1)",150),Object.assign(ne.style,t.itemCompleted),X.style.background=G,X.style.borderColor=G,X.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ne.style.textDecoration="none",ne.style.opacity="1",X.style.background="transparent",X.style.borderColor="#dadce0",X.innerHTML=""),C(R,w)},ne.onmouseenter=()=>{n[ge]||(ne.style.background="#f1f3f4",X.style.borderColor=G)},ne.onmouseleave=()=>{n[ge]||(ne.style.background="transparent",X.style.borderColor="#dadce0")},ne.appendChild(X),ne.appendChild(Ce),Z.appendChild(ne)}),ee===I.length&&I.length>0&&(J.style.color="#1e8e3e",J.style.background="#e6f4ea",Z.style.boxShadow="inset 4px 0 0 #1e8e3e, 0 1px 3px rgba(0,0,0,0.05)"),J.textContent=`${ee}/${I.length}`,p.appendChild(Z)}),k(F,B)}function C(R,w){let G=0,F=0;["inicio","fim"].forEach(B=>{let O=w[B]||[];G+=O.length;let M=0;O.forEach((I,Z)=>{n[`${R}-${B}-${Z}`]&&(F++,M++)})}),k(G,F),setTimeout(()=>v(),200)}function k(R,w){let G=R===0?0:w/R*100;c.style.width=`${G}%`,G===100?c.style.background="#34A853":c.style.background="linear-gradient(90deg, #4285F4, #34A853)"}function U(R){s=R;let w=Ye();Object.assign(j.style,de),Object.assign(V.style,de),Object.assign(R==="BAU"?j.style:V.style,w),v()}return j.onclick=()=>U("BAU"),V.onclick=()=>U("LT"),f.addEventListener("change",R=>{o=R.target.value,v()}),U(s),l}var st={lm:{label:"LM Forms",links:[{name:"Relat\xF3rio de Ocorr\xEAncias",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas operacionais | Aviso de pausas"},{name:"Chamadas Excedidas (>50min)",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro de chamadas longas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema/ferramenta"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"Enviar casos para BAU/Solicitar Descarte/Abrir Monitoria para AMs"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo dos Anunciantes"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos complicados de atender"}]},suporte:{label:"Central de Ajuda",links:[{name:"Suporte Google Ads",url:"https://support.google.com/google-ads/",desc:"Oficial"},{name:"Suporte GA4",url:"https://support.google.com/analytics/",desc:"Oficial"},{name:"Suporte Merchant Center",url:"https://support.google.com/merchants/gethelp",desc:"Oficial"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. oficial sobre CSP"},{name:"Doc. Enhanced Conversion",url:"https://support.google.com/google-ads/answer/9888656?hl=en",desc:"Como funcionam as convers\xF5es otimizadas?"},{name:"Doc. CoMo",url:"https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=pt-br",desc:"Doc. oficial sobre Consent Mode"}]},outros:{label:"Diversos",links:[{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form para solicitar grava\xE7\xE3o da chamada."}]}};function Zt(){let e="v2.4.5",t="lm",n="",o={width:"100%",padding:"10px 12px 10px 36px",borderRadius:"8px",border:"1px solid #dadce0",background:"#f8f9fa",fontSize:"14px",boxSizing:"border-box",outline:"none",color:"#3c4043",transition:"background 0.2s, border-color 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"10px center"},s={display:"flex",flexWrap:"wrap",gap:"8px",paddingBottom:"8px"},r={padding:"6px 16px",borderRadius:"16px",border:"1px solid #dadce0",background:"transparent",color:"#5f6368",fontSize:"13px",fontWeight:"500",cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s ease",marginBottom:"4px"},a={background:"#e8f0fe",color:"#1967d2",borderColor:"#e8f0fe",fontWeight:"600"},i={display:"flex",alignItems:"center",padding:"10px 14px",borderRadius:"12px",cursor:"pointer",border:"1px solid transparent",marginBottom:"6px",background:"#ffffff",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), background 0.2s",boxShadow:"0 1px 2px rgba(0,0,0,0.02)",opacity:"0",transform:"translateY(10px)"},l={width:"36px",height:"36px",borderRadius:"10px",background:"#f1f3f4",color:"#5f6368",display:"flex",alignItems:"center",justifyContent:"center",marginRight:"14px",fontSize:"18px",flexShrink:"0"},b=document.createElement("div");b.id="feedback-popup",Object.assign(b.style,Oe,{right:"100px",width:"400px",boxShadow:"none",opacity:"0",pointerEvents:"none"});let d={lm:"\u{1F4DD}",qa:"\u{1F6E1}\uFE0F",suporte:"\u{1F4DA}",outros:"\u26A1"},c={popup:b,googleLine:null,focusElement:null},T=!1,h=Re(b,"Links \xDAteis",e,"Acesso r\xE1pido a formul\xE1rios internos (Ocorr\xEAncias, Bugs) e documenta\xE7\xF5es oficiais de suporte.",c,()=>p());b.appendChild(h);let y=document.createElement("div");Object.assign(y.style,{padding:"16px",display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid #f1f3f4",flexShrink:"0",backgroundColor:"#fff"});let g=document.createElement("input");g.type="text",g.placeholder="Buscar link, form ou ajuda...",Object.assign(g.style,o),c.focusElement=g,g.onfocus=()=>{g.style.borderColor="#1a73e8",g.style.backgroundColor="#fff"},g.onblur=()=>{g.style.borderColor="#dadce0",g.style.backgroundColor="#f8f9fa"};let A=document.createElement("div");Object.assign(A.style,s),y.appendChild(g),y.appendChild(A),b.appendChild(y);let E=document.createElement("div");Object.assign(E.style,{padding:"0 8px 8px 8px",overflowY:"auto",flexGrow:"1"}),b.appendChild(E);let j=document.createElement("div");Object.assign(j.style,{padding:"8px 16px",borderTop:"1px solid #eee",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"10px",color:"#9aa0a6"}),j.innerHTML="<span>by lucaste@</span>",b.appendChild(j),document.body.appendChild(b);function V(){A.innerHTML="",Object.keys(st).forEach(u=>{let m=st[u],v=document.createElement("button"),C=d[u]||"";v.innerHTML=`<span style="font-size:14px">${C}</span> ${m.label}`,Object.assign(v.style,r),t===u&&n===""&&Object.assign(v.style,a),v.onmousedown=()=>v.style.transform="scale(0.95)",v.onmouseup=()=>v.style.transform="scale(1)",v.onmouseleave=()=>v.style.transform="scale(1)",v.onclick=()=>{t=u,n="",g.value="",V(),f()},A.appendChild(v)})}function f(){E.innerHTML="";let u=[],m=n.trim()!=="";if(m?Object.entries(st).forEach(([v,C])=>{let k=C.links.filter(U=>U.name.toLowerCase().includes(n.toLowerCase())||U.desc.toLowerCase().includes(n.toLowerCase()));k.forEach(U=>{U._catIcon=d[v],U._categoryName=C.label}),u=[...u,...k]}):(u=st[t].links,u.forEach(v=>v._catIcon=d[t])),u.length===0){E.innerHTML=`
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px; opacity:0.6;">
            <div style="font-size:32px; margin-bottom:10px;">\u{1F50D}</div>
            <div style="font-size:13px; color:#5f6368;">Nenhum link encontrado.</div>
        </div>`;return}u.forEach((v,C)=>{let k=document.createElement("div");Object.assign(k.style,i);let U=document.createElement("div");Object.assign(U.style,l),U.textContent=v._catIcon||"\u{1F517}",k.appendChild(U);let R=document.createElement("div");R.style.flexGrow="1";let w=I=>{if(!m)return I;let Z=new RegExp(`(${n})`,"gi");return I.replace(Z,'<span style="color:#1a73e8; font-weight:700;">$1</span>')},G=`<div style="font-size:14px; font-weight:500; color:#202124;">${w(v.name)}</div>`,F=`<div style="font-size:11px; color:#5f6368; margin-top:2px;">${w(v.desc)}</div>`;R.innerHTML=G+F,k.appendChild(R);let B=document.createElement("div");B.style.display="flex",B.style.gap="4px",B.style.opacity="0",B.style.transition="opacity 0.2s";let O=document.createElement("div");O.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',Object.assign(O.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#5f6368",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"}),O.onclick=I=>{me.playClick(),I.stopPropagation(),navigator.clipboard.writeText(v.url),O.style.transform="scale(1.2)",O.style.color="#1e8e3e",O.style.backgroundColor="#e6f4ea",setTimeout(()=>{O.style.transform="scale(1)",O.style.color="#5f6368",O.style.backgroundColor="transparent"},800)},O.onmouseenter=()=>O.style.backgroundColor="#f1f3f4",O.onmouseleave=()=>O.style.backgroundColor="transparent",B.appendChild(O);let M=document.createElement("div");M.innerHTML="\u2197",Object.assign(M.style,{width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",color:"#dadce0",fontSize:"16px"}),B.appendChild(M),k.appendChild(B),k.onclick=()=>window.open(v.url,"_blank"),k.onmouseenter=()=>{k.style.backgroundColor="#f8f9fa",k.style.transform="scale(1.01)",B.style.opacity="1",M.style.color="#1a73e8"},k.onmouseleave=()=>{k.style.backgroundColor="#ffffff",k.style.transform="scale(1)",B.style.opacity="0",M.style.color="#dadce0"},E.appendChild(k),requestAnimationFrame(()=>{k.style.transition="opacity 0.3s ease, transform 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.2)",setTimeout(()=>{k.style.opacity="1",k.style.transform="translateY(0)"},C*40)})})}g.addEventListener("input",u=>{n=u.target.value,n!==""?Array.from(A.children).forEach(m=>{m.style.backgroundColor="transparent",m.style.color="#5f6368",m.style.borderColor="#dadce0"}):V(),f()});function p(){T=!T,_e(T,b,"cw-btn-links")}return V(),f(),p}function uo(){if(window.techSolInitialized){xt();return}window.techSolInitialized=!0,console.log("\u{1F680} TechSol Suite Initializing...");try{Lt(),xt();let e=Yt(),t=Xt(),n=Qt(),o=Zt();jt({toggleNotes:e,toggleEmail:t,toggleScript:n,toggleLinks:o})}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),oe("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}uo();})();
