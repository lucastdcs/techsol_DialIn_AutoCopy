(()=>{var Ye="",Zt=e=>new Promise(t=>setTimeout(t,e));async function kt(){if(Ye)return Ye;try{let e=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!e)return"Agente";e.click(),await Zt(100);let t="Consultor",n=document.querySelector("profile-details .name");if(n)t=n.textContent.trim().split(" ")[0],t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();else{let o=document.querySelector("profile-details img");if(o&&o.src.includes("/photos/")){let r=o.src.match(/\/photos\/([^\?]+)/)[1];t=r.charAt(0).toUpperCase()+r.slice(1)}}return e.click(),document.body.click(),Ye=t,t}catch(e){return console.warn("Sherlock falhou:",e),"Consultor"}}function ut(){return Ye||"Consultor"}function Ot(e){let t=new Date,n=t.getHours(),o=t.getDay(),r="Ol\xE1",i="";n>=5&&n<12?(r="Bom dia",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):n>=12&&n<18?(r="Boa tarde",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(r="Boa noite",i='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let a=[];n>=0&&n<5?a=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:n<12?o===1?a=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:o===5?a=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:a=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:n<18?a=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:a=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(o===0||o===6)&&(a=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let s=a[Math.floor(Math.random()*a.length)];return{prefix:`${r},`,name:e,suffix:s,icon:i,isFriday:o===5}}function mt(){let e="Cliente",t="[INSERIR URL]";try{let o=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(o&&o.nextElementSibling){let r=o.nextElementSibling.innerText.trim();r&&(e=r)}}catch(n){console.warn("Falha ao capturar Nome:",n)}try{let o=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(o&&o.nextElementSibling){let r=o.nextElementSibling.innerText.trim();r&&(t=r)}}catch(n){console.warn("Falha ao capturar Website:",n)}return{advertiserName:e,websiteUrl:t,agentName:ut()}}var It=1e4;function _t(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
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
    `,document.head.appendChild(t)}function J(e,t={}){let n=document.createElement("div"),o=t.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(n.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:o,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),n.textContent=e,document.body.appendChild(n),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>n.remove(),400)},t.duration||4e3)}function Rt(e,t=null){let n=0,o=0,r=0,i=0,a=t||e;a.style.cursor="grab",a.onmousedown=s;function s(u){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(u.target.tagName)||u.target.closest(".no-drag"))return;u=u||window.event,a.style.cursor="grabbing",e.style.transition="none";let l=e.getBoundingClientRect();e.style.transform="none",e.style.left=l.left+"px",e.style.top=l.top+"px",e.style.margin="0",e.style.bottom="auto",e.style.right="auto",It++,e.style.zIndex=It,r=u.clientX,i=u.clientY,e.setAttribute("data-dragging","true"),document.onmouseup=v,document.onmousemove=c}function c(u){u=u||window.event,u.preventDefault(),n=r-u.clientX,o=i-u.clientY,r=u.clientX,i=u.clientY;let l=e.offsetTop-o,E=e.offsetLeft-n,f=16,x=window.innerWidth,y=window.innerHeight,A=e.offsetWidth,w=e.offsetHeight;E<f?E=f:E+A>x-f&&(E=x-A-f),l<f?l=f:l+w>y-f&&(l=y-w-f),e.style.top=l+"px",e.style.left=E+"px"}function v(){document.onmouseup=null,document.onmousemove=null,a.style.cursor="grab",setTimeout(()=>{e.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",e.setAttribute("data-dragging","false"),e.setAttribute("data-moved","true")},50)}}var Ce={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",display:"flex",flexDirection:"column",backgroundColor:"rgba(248, 249, 250, 0.96)",backdropFilter:"blur(20px) saturate(180%)",borderRadius:"20px",boxShadow:"0 20px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)",opacity:"0",pointerEvents:"none",fontFamily:"'Google Sans', 'Roboto'",transform:"translate(-50%, -50%)",transition:"all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease"};var gt={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Be={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var Xe={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var ce={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var bt=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],Nt=-1;function qe(){let e=Math.floor(Math.random()*bt.length);return e===Nt&&(e=(e+1)%bt.length),Nt=e,bt[e]}var xe=e=>new Promise(t=>setTimeout(t,e));async function Jt(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let n=e.querySelector(".cursor");await xe(200);for(let o=0;o<t.length;o++){let r=t.charAt(o),i=document.createElement("span");i.textContent=r,n&&n.parentNode===e?n.before(i):e.appendChild(i);let a=Math.floor(Math.random()*60)+30;o===0&&(a=150),o>t.length-3&&(a=30),await xe(a)}await xe(600),n&&(n.style.display="none")}async function ft(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
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
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await xe(200);let t=await kt(),n=Ot(t),o=e.querySelector("#w-icon"),r=e.querySelector("#p1"),i=e.querySelector("#p2"),a=e.querySelector("#p3"),s=e.querySelector("#p-sextou");o&&(o.innerHTML=n.icon),r&&(r.textContent=n.prefix),a&&(a.textContent=n.suffix),await xe(300);let c=o?o.querySelector("svg"):null;if(c&&(c.style.opacity="1",c.style.transform="scale(1)"),await xe(400),r&&(r.style.opacity="1"),i&&await Jt(i,n.name),a&&(a.style.opacity="1",a.style.transform="translateY(0)"),n.isFriday&&s){await xe(400),s.style.display="block",s.offsetWidth;let v=s.querySelector(".sextou-badge");v&&(v.style.opacity="1",v.style.transform="scale(1)")}await xe(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await xe(900),e.parentNode&&e.parentNode.removeChild(e)}}var Ke={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Qe(e,t){t.onmousedown=n;function n(o){o.stopPropagation(),o.preventDefault();let r=e.style.transition;e.style.transition="none";let i=o.clientX,a=o.clientY,s=parseFloat(getComputedStyle(e,null).getPropertyValue("width").replace("px","")),c=parseFloat(getComputedStyle(e,null).getPropertyValue("height").replace("px","")),v=i,u=a,l=!1;function E(y){v=y.clientX,u=y.clientY,l||(window.requestAnimationFrame(()=>{f(),l=!1}),l=!0)}function f(){let y=s+(v-i),A=c+(u-a);y>360&&(e.style.width=y+"px"),A>300&&(e.style.height=A+"px")}function x(){document.removeEventListener("mousemove",E),document.removeEventListener("mouseup",x),setTimeout(()=>{e.style.transition=r},50)}document.addEventListener("mousemove",E),document.addEventListener("mouseup",x)}t.onmouseenter=()=>t.style.opacity="1",t.onmouseleave=()=>t.style.opacity="0.6"}var ye={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:"}},Ae={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:[]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},He={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"}},Ze={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl"},Ve=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],ht=["CONSIDERACOES","COMENTARIOS"],Re={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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
\u2022 Tentativa 3 - `,"field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-2-6-final":{type:"all","field-REASON_COMMENTS":"Finaliza\xE7\xE3o (2/6)","field-SPEAKEASY_ID":"-","field-ON_CALL":"-","field-COMENTARIOS":"\u2022 Dia 9 finaliza\xE7\xE3o do 2/6, durante o per\xEDodo do acompanhamento n\xE3o houve retorno do anunciante, ent\xE3o o caso ser\xE1 encerrado.","field-SCREENSHOTS":"\u2022 N/A","field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-manual":{type:"all","field-REASON_COMMENTS":"Outro (Manual)","field-GTM_GA4_VERIFICADO":"N/A"}};var le=e=>new Promise(t=>setTimeout(t,e));function we(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>e.dispatchEvent(new MouseEvent(n,t)))}function Je(){return Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(t=>{let n=t.offsetParent!==null,o=t.closest("case-message-view")!==null,r=t.closest(".editor")!==null||t.closest("write-card")!==null;return n&&!o&&r})}async function Lt(){let e=!1,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(s=>s.innerText.trim()==="email");if(n&&n.offsetParent!==null){let s=n.closest("material-button")||n.closest("material-fab")||n;s.style&&(s.style.display="block",s.style.visibility="visible"),we(s),e=!0}else{let s=document.querySelector("material-fab-speed-dial");if(s){let c=s.querySelector(".trigger");if(c){c.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),we(c),await le(1e3);let u=Array.from(document.querySelectorAll("i.material-icons-extended")).find(l=>l.innerText.trim()==="email");u&&(we(u),e=!0)}else s.click()}}let o=0,r=Je();for(console.log("\u23F3 Aguardando editor EDIT\xC1VEL...");!r&&o<30;)await le(500),r=Je(),o++;if(!r)return J("Erro: Editor de email n\xE3o apareceu.",{error:!0}),!1;let a=Array.from(document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]')).find(s=>s.offsetParent!==null);if(a){console.log("\u26A0\uFE0F Rascunho detectado. Clicando em Discard..."),we(a);let s=null,c=0;for(;!s&&c<10;)await le(200),s=Array.from(document.querySelectorAll('material-button[debug-id="confirm-button"]')).find(u=>u.offsetParent!==null),c++;s?(console.log("\u2705 Confirmando descarte..."),we(s),await le(2500)):console.warn("\u26A0\uFE0F Cliquei em Discard, mas o bot\xE3o Confirm n\xE3o apareceu.")}if(r){let s=r.closest('[id="email-body-content-top"]'),v=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(s){if(v){let l=v.closest('[aria-hidden="true"]');l&&l.removeAttribute("aria-hidden"),v.focus()}await le(300),s.innerHTML=`
                <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                    <span id="cases-body-field"><br></span>
                </div>
            `;let u=s.querySelector("#cases-body-field");if(u){let l=document.createRange();l.selectNodeContents(u),l.collapse(!0);let E=window.getSelection();E.removeAllRanges(),E.addRange(l)}return!0}}return J("Erro cr\xEDtico ao acessar editor.",{error:!0}),!1}async function Mt(e){if(!e)return;J("Preparando email...",{duration:3e3});let t=mt();if(!await Lt())return;await le(500);let o=document.querySelector('material-button[debug-id="canned_response_button"]');if(o){o.scrollIntoView({behavior:"smooth",block:"center"}),await le(200),we(o),await le(1500);let r=document.querySelector("material-auto-suggest-input input");if(r){we(r),await le(200),document.execCommand("insertText",!1,e),r.dispatchEvent(new Event("input",{bubbles:!0}));let i=null,a=0;for(;a<20;){await le(500),a++;let s=Array.from(document.querySelectorAll("material-select-dropdown-item"));if(s.length>0&&(i=s.find(c=>c.innerText.toLowerCase().includes(e.toLowerCase())),!i&&s.length===1&&(i=s[0]),i))break}if(i){let s=function(l,E){if(l.nodeType===3&&l.nodeValue.includes(E))return l;if(!l.childNodes)return null;for(let f of l.childNodes){let x=s(f,E);if(x)return x}return null};we(i),await le(2e3);let c=Je(),v=c?c.closest('[id="email-body-content-top"]'):document.body,u=s(v,"{%ADVERTISER_NAME%}");if(u){let l=document.createRange(),E=u.nodeValue.indexOf("{%ADVERTISER_NAME%}");l.setStart(u,E),l.setEnd(u,E+19);let f=window.getSelection();f.removeAllRanges(),f.addRange(l),document.execCommand("insertText",!1,t.advertiserName),J("Email preenchido!")}else J("Email inserido (Nome n\xE3o substitu\xEDdo).")}else J(`Template '${e}' n\xE3o encontrado.`,{error:!0})}}else J("Bot\xE3o Canned Response n\xE3o achado.",{error:!0})}async function xt(e){console.log(`\u{1F680} Iniciando automa\xE7\xE3o (Quick): ${e.name}`),J("Preparando email...",{duration:3e3});let t=mt(),n=ut();if(!await Lt())return;await le(600);let r=document.querySelector('input[aria-label="Subject"]');r&&e.subject&&(r.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(r,e.subject),r.dispatchEvent(new Event("input",{bubbles:!0})),await le(300));let i=Je();if(i){let s=(i.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');s&&(s.focus(),s.click(),s.dispatchEvent(new Event("input",{bubbles:!0}))),await le(400);let c=new Date;c.setDate(c.getDate()+3);let v=c.getDay();v===6?c.setDate(c.getDate()+2):v===0&&c.setDate(c.getDate()+1);let u=c.toLocaleDateString("pt-BR"),l=e.body;l=l.replace(/\[Nome do Cliente\]/g,t.advertiserName||"Cliente"),l=l.replace(/\[INSERIR URL\]/g,t.websiteUrl||"seu site"),l=l.replace(/\[URL\]/g,t.websiteUrl||"seu site"),l=l.replace(/\[Seu Nome\]/g,n),l=l.replace(/\[MM\/DD\/YYYY\]/g,u),document.execCommand("insertHTML",!1,l),s&&(s.dispatchEvent(new Event("input",{bubbles:!0})),s.dispatchEvent(new Event("change",{bubbles:!0}))),J("Email preenchido com sucesso!",{duration:2e3}),await le(800)}else J("Erro ao focar no editor.",{error:!0})}var eo={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},Dt={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function Ee(e,t,n,o,r,i){let a=document.createElement("div");Object.assign(a.style,eo),Rt(e,a);let s=document.createElement("div");Object.assign(s.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),a.appendChild(s),r&&(r.googleLine=s);let c=document.createElement("div");Object.assign(c.style,{display:"flex",alignItems:"center",gap:"12px"});let v=document.createElement("img");v.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(v.style,{width:"20px",height:"20px",pointerEvents:"none"});let u=document.createElement("span");u.textContent=t,c.appendChild(v),c.appendChild(u);let l=document.createElement("div");Object.assign(l.style,{display:"flex",alignItems:"center",gap:"4px"});let E='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',f='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',x=document.createElement("div");x.innerHTML=E,Object.assign(x.style,Dt),x.title="Sobre",x.classList.add("no-drag"),x.onmouseenter=()=>{x.style.background="rgba(255,255,255,0.1)",x.style.color="#FFF"},x.onmouseleave=()=>{x.style.color!=="rgb(138, 180, 248)"&&(x.style.background="transparent",x.style.color="#9AA0A6")};let y=document.createElement("div");y.innerHTML=f,Object.assign(y.style,Dt),y.title="Fechar",y.classList.add("no-drag"),y.onmouseenter=()=>{y.style.background="rgba(242, 139, 130, 0.2)",y.style.color="#F28B82"},y.onmouseleave=()=>{y.style.background="transparent",y.style.color="#9AA0A6"},y.onmousedown=w=>w.stopPropagation(),x.onmousedown=w=>w.stopPropagation(),y.onclick=i;let A=to(e,t,n,o);return x.onclick=w=>{w.stopPropagation(),A.style.opacity==="1"?(A.style.opacity="0",A.style.pointerEvents="none",x.style.color="#9AA0A6",x.style.background="transparent"):(A.style.opacity="1",A.style.pointerEvents="auto",x.style.color="#8AB4F8",x.style.background="rgba(138, 180, 248, 0.1)")},l.appendChild(x),l.appendChild(y),a.appendChild(c),a.appendChild(l),a}function to(e,t,n,o){let r=document.createElement("div");return Object.assign(r.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(5px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),r.innerHTML=`
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
    `,setTimeout(()=>{let i=r.querySelector("#close-help-internal");i&&(i.onmouseover=()=>i.style.backgroundColor="#f8f9fa",i.onmouseout=()=>i.style.backgroundColor="white",i.onclick=()=>{r.style.opacity="0",r.style.pointerEvents="none"})},0),e.appendChild(r),r}if(!document.getElementById("cw-module-styles")){let e=document.createElement("style");e.id="cw-module-styles",e.innerHTML=`
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
    `,document.head.appendChild(e)}function Te(e,t,n){let o=document.getElementById(n);if(!t)return;let r=t.getAttribute("data-moved")==="true",i={x:0,y:0};if(o){let u=o.getBoundingClientRect();i.x=u.left+u.width/2,i.y=u.top+u.height/2}let a,s;if(!r)a=window.innerWidth/2,s=window.innerHeight/2;else{let u=t.getBoundingClientRect();a=u.left+u.width/2,s=u.top+u.height/2,a===0&&s===0&&(a=window.innerWidth/2,s=window.innerHeight/2)}let c=i.x-a,v=i.y-s;e?(t.style.transition="none",t.style.opacity="0",t.style.pointerEvents="auto",r?t.style.transform=`translate(${c}px, ${v}px) scale(0.05)`:t.style.transform=`translate(calc(-50% + ${c}px), calc(-50% + ${v}px)) scale(0.05)`,t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("open"),o&&o.classList.add("active"),t.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",t.style.opacity="1",r?t.style.transform="translate(0, 0) scale(1)":t.style.transform="translate(-50%, -50%) scale(1)"}),typeof Gt=="function"&&Gt(t,n)):(t.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",t.style.pointerEvents="none",requestAnimationFrame(()=>{t.style.opacity="0",r?t.style.transform=`translate(${c}px, ${v}px) scale(0.1)`:t.style.transform=`translate(calc(-50% + ${c}px), calc(-50% + ${v}px)) scale(0.1)`}),setTimeout(()=>{t.classList.remove("open"),o&&o.classList.remove("active"),t.style.transition="",t.style.transform=""},300),typeof yt=="function"&&yt(t))}function Gt(e,t){yt(e);let n=o=>{if(!e.classList.contains("open"))return;let r=e.contains(o.target),i=document.querySelector(".cw-pill"),a=i&&i.contains(o.target);r?(e.classList.remove("idle"),e.style.zIndex="2147483648"):a||(e.classList.add("idle"),e.style.zIndex="2147483646")};e._idleHandler=n,document.addEventListener("mousedown",n)}function yt(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}var ae={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",gripColor:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",gripActive:"linear-gradient(to left, #4285F4, #EA4335, #FBBC05, #34A853)",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995"},et=e=>new Promise(t=>setTimeout(t,e));function Ft(e){let t="cw-command-center-style";if(!document.getElementById(t)){let f=document.createElement("style");f.id=t,f.innerHTML=`
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
                
                background: ${ae.glassBg};
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${ae.glassBorder};
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
                color: ${ae.iconIdle};
                
                opacity: 0; transform: scale(0.5);
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-btn.popped { opacity: 1; transform: scale(1); }

            /* Hover (Feedback t\xE1til leve) */
            .cw-btn:hover { 
                background: ${ae.glassHighlight}; 
                color: ${ae.iconActive}; 
                transform: scale(1.1); 
            }

            /* --- ESTADO ATIVO (O M\xF3dulo est\xE1 aberto) --- */
            /* Mant\xE9m a cor da marca acesa e cria um fundo tintado */
            .cw-btn.notes.active { color: ${ae.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${ae.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${ae.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${ae.green} !important; background: rgba(129, 201, 149, 0.15); }
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
            .cw-btn.notes:hover { color: ${ae.blue}; filter: drop-shadow(0 0 5px rgba(138, 180, 248, 0.5)); }
            .cw-btn.email:hover { color: ${ae.red}; filter: drop-shadow(0 0 5px rgba(242, 139, 130, 0.5)); }
            .cw-btn.script:hover { color: ${ae.purple}; filter: drop-shadow(0 0 5px rgba(197, 138, 249, 0.5)); }
            .cw-btn.links:hover { color: ${ae.green}; filter: drop-shadow(0 0 5px rgba(129, 201, 149, 0.5)); }

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
                background-color: ${ae.iconIdle}; 
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
                background-color: ${ae.blue}; /* Azul Google de A\xE7\xE3o */
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
            .cw-dots span:nth-child(1) { background: ${ae.blue}; animation-delay: -0.32s; }
            .cw-dots span:nth-child(2) { background: ${ae.red}; animation-delay: -0.16s; }
            .cw-dots span:nth-child(3) { background: ${ae.green}; }
            
            @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

            /* Success Check Animado */
            .cw-check svg { width: 28px; height: 28px; stroke-dasharray: 50; stroke-dashoffset: 50; transition: stroke-dashoffset 0.5s ease 0.2s; }
            .cw-pill.success .cw-check svg { stroke-dashoffset: 0; }
        `,document.head.appendChild(f)}let n={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>'},o=document.createElement("div");o.className="cw-pill side-right",o.innerHTML=`
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
    `;let r=document.createElement("div");r.className="cw-focus-backdrop",document.body.appendChild(r),document.body.appendChild(o),o.querySelector(".notes").onclick=f=>{f.stopPropagation(),e.toggleNotes()},o.querySelector(".email").onclick=f=>{f.stopPropagation(),e.toggleEmail()},o.querySelector(".script").onclick=f=>{f.stopPropagation(),e.toggleScript()},o.querySelector(".links").onclick=f=>{f.stopPropagation(),e.toggleLinks()},(async function(){await et(2800),o.classList.add("docked"),await et(300);let x=o.querySelectorAll(".cw-btn");o.querySelectorAll(".cw-sep").forEach(A=>A.classList.add("visible"));for(let A=0;A<x.length;A++)x[A].classList.add("popped"),await et(90);await et(200),o.classList.add("system-check")})();let i=!1,a,s,c,v,u=3;o.onmousedown=f=>{if(f.target.closest("button"))return;f.preventDefault(),a=f.clientX,s=f.clientY;let x=o.getBoundingClientRect();c=x.left,v=x.top,document.addEventListener("mousemove",l),document.addEventListener("mouseup",E)};function l(f){let x=f.clientX-a,y=f.clientY-s;!i&&Math.sqrt(x*x+y*y)>u&&(i=!0,o.style.transition="none"),i&&(o.style.left=`${c+x}px`,o.style.top=`${v+y}px`,o.style.right="auto",o.style.bottom="auto",o.style.transform="none")}function E(f){if(document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",E),i){i=!1,o.style.transition="left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s ease";let x=window.innerWidth,y=window.innerHeight,A=o.getBoundingClientRect(),w=A.left+A.width/2,P;w<x/2?(P=24,o.classList.remove("side-right"),o.classList.add("side-left")):(P=x-A.width-24,o.classList.remove("side-left"),o.classList.add("side-right"));let V=A.top;V<24&&(V=24),V>y-A.height-24&&(V=y-A.height-24),o.style.left=`${P}px`,o.style.top=`${V}px`,setTimeout(()=>{},600)}else{let x=f.target.closest("button");x&&(x.style.transform="scale(0.9)",setTimeout(()=>x.style.transform="",150))}}}function tt(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop"),n=document.getElementById("cw-loader"),o=document.getElementById("cw-success");if(!e||!n||!o)return()=>{};let r=Date.now();return e.classList.add("processing"),t&&t.classList.add("active"),n.style.display="flex",o.style.display="none",function(){let a=Date.now()-r,s=Math.max(0,1500-a);setTimeout(()=>{n.style.display="none",o.style.display="block",o.offsetWidth,e.classList.add("success"),setTimeout(()=>{e.classList.remove("processing","success"),t&&t.classList.remove("active")},2e3)},s)}}var zt=e=>new Promise(t=>setTimeout(t,e));function ot(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>e.dispatchEvent(new MouseEvent(n,t)))}function vt(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let n=document.createRange();n.selectNodeContents(t);let o=window.getSelection();o.removeAllRanges(),o.addRange(n);try{document.execCommand("copy")}catch{J("Falha ao copiar",{error:!0})}o.removeAllRanges(),document.body.removeChild(t)}function jt(e){["input","change","keydown","keyup"].forEach(n=>{let o=new Event(n,{bubbles:!0,cancelable:!0});e.dispatchEvent(o)})}function Pt(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function Bt(){console.log("Iniciando processo de Nova Nota...");let e=Pt(),t=e.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(a=>a.innerText.trim()==="description");if(o){let a=o.closest("material-fab")||o.closest("material-button");a?(a.style&&(a.style.display="block",a.style.visibility="visible"),ot(a)):ot(o)}else{let a=document.querySelector("material-fab-speed-dial");if(a){let s=a.querySelector(".trigger");s?(s.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),ot(s)):a.click(),await zt(800);let v=Array.from(document.querySelectorAll("i.material-icons-extended")).find(u=>u.innerText.trim()==="description");v&&ot(v)}}let r=null,i=0;for(;!r&&i<20;){await zt(300);let a=Pt();if(a.length>t)r=a.find(s=>!e.includes(s)),r||(r=a[a.length-1]);else if(i>10){let s=a.filter(c=>c.offsetParent!==null);s.length>0&&(r=s[s.length-1])}i++}return r}var G={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},fe="cubic-bezier(0.25, 0.8, 0.25, 1)",oo={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${G.border}`,backgroundColor:G.bgInput,fontSize:"14px",color:G.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${fe}, box-shadow 0.2s ${fe}, background-color 0.2s`,outline:"none"},Ao={...oo,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},wo={fontSize:"13px",fontWeight:"700",color:G.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},Eo={display:"block",fontSize:"13px",fontWeight:"600",color:G.text,marginBottom:"8px",marginTop:"16px"},To={fontSize:"12px",color:G.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},ko={fontSize:"12px",color:G.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},Oo={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:G.text,cursor:"pointer",padding:"12px 14px",backgroundColor:G.surface,border:`1px solid ${G.border}`,borderRadius:"12px",transition:`all 0.2s ${fe}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},St={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:G.primary},Io={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:G.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${fe}, box-shadow 0.2s ${fe}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},No={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${G.primary}`,color:G.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${fe}`},_o={background:"transparent",border:`1px solid ${G.border}`,borderRadius:"20px",color:G.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${fe}`,fontFamily:"'Google Sans', 'Roboto'"};var Ro={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:G.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},Lo={fontSize:"13px",fontWeight:"700",color:G.primary,minWidth:"20px",textAlign:"center"},Mo={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${G.border}`,backgroundColor:G.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${fe}, box-shadow 0.2s ${fe}`},Do={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${G.bgInput}`},Go={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${G.border}`,backgroundColor:G.surface,color:G.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${fe}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},Fo={backgroundColor:G.primaryBg,color:G.primary,borderColor:G.primary,fontWeight:"600"},zo={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:G.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},Po={borderTop:`1px solid ${G.bgInput}`,paddingTop:"20px",marginTop:"16px"};var jo={maxHeight:"240px",overflowY:"auto",border:`1px solid ${G.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:G.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},Bo={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${G.bgInput}`,cursor:"pointer",fontSize:"13px",color:G.text,transition:"background 0.1s",userSelect:"none"};var no={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},ao={fontSize:"12px",color:"#e37400",marginTop:"4px"},io={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},so={display:"flex",gap:"15px",marginBottom:"10px"};function qt(){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,no);let t=document.createElement("label");t.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(t.style,gt,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,so);let o=document.createElement("input");o.type="radio",o.name="ts_usage_mod",o.value="Sim",Object.assign(o.style,St);let r=document.createElement("label");r.textContent="Sim";let i=document.createElement("div");Object.assign(i.style,{display:"flex",alignItems:"center"}),i.appendChild(o),i.appendChild(r);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="N\xE3o",a.checked=!0,Object.assign(a.style,St);let s=document.createElement("label");s.textContent="N\xE3o";let c=document.createElement("div");Object.assign(c.style,{display:"flex",alignItems:"center"}),c.appendChild(a),c.appendChild(s),n.appendChild(i),n.appendChild(c);let v=document.createElement("div");v.style.display="block";let u=document.createElement("label");u.textContent="Qual foi o Motivo?",Object.assign(u.style,gt,{fontSize:"12px"});let l=document.createElement("input");l.type="text",Object.assign(l.style,io);let E=document.createElement("div");E.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(E.style,ao),v.appendChild(u),v.appendChild(l),v.appendChild(E),e.appendChild(t),e.appendChild(n),e.appendChild(v),o.onchange=()=>{v.style.display="none"},a.onchange=()=>{v.style.display="block"};function f(A,w){if(e.style.display="none",!A||A.includes("Education")||!w||w.length===0)return;let P=w.some(d=>d.includes("enhanced")||d==="ec_google_ads"),V=w.some(d=>(d.includes("conversion")||d.includes("ads"))&&!d.includes("enhanced")),b=w.some(d=>d.includes("ga4")||d.includes("analytics")||d.includes("ua")),p=w.some(d=>d.includes("merchant")||d.includes("gmc")||d.includes("shopping"));(P||V&&!b&&!p)&&(e.style.display="block")}function x(){if(e.style.display==="none")return"";let A=`<br><b>Utilizou Tag Support?</b> ${o.checked?"Sim":"N\xE3o"}`;return a.checked&&l.value.trim()!==""&&(A+=`<br><b>Motivo:</b> ${l.value}`),A+="<br>",A}function y(){e.style.display="none",a.checked=!0,o.checked=!1,v.style.display="block",l.value=""}return{element:e,updateVisibility:f,getOutput:x,reset:y}}var L={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Le={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function Ht(e){let t={};function n(b){let p=b.toLowerCase();return p.includes("ads")||p.includes("conversion")||p.includes("remarketing")?L.brands.ads:p.includes("ga4")||p.includes("analytics")?L.brands.ga4:p.includes("gtm")||p.includes("tag manager")||p.includes("container")?L.brands.gtm:p.includes("merchant")||p.includes("shopping")||p.includes("feed")?L.brands.gmc:L.brands.default}let o=Object.entries(Ae).filter(([b,p])=>p.popular),r={};Object.entries(Ae).forEach(([b,p])=>{if(p.popular)return;let m=n(p.name);r[m.label]||(r[m.label]={brand:m,tasks:[]}),r[m.label].tasks.push({key:b,...p})});let i="cw-zen-tasks";if(!document.getElementById(i)){let b=document.createElement("style");b.id=i,b.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column; height: 100%; width: calc(100% + 32px); margin: -16px;
                font-family: ${L.font}; background: ${L.bg}; position: relative; overflow: hidden;
            }
            
            /* SCROLL AREA */
            .cw-zen-content { flex: 1; overflow-y: auto; padding-bottom: 80px; } /* Espa\xE7o para o Status Bar */

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${L.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${L.white}; 
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
                font-size: 12px; font-weight: 500; color: ${L.textMain}; line-height: 1.2; 
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
                color: ${L.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${L.border}; border-radius: 10px; background: ${L.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${L.blue}; box-shadow: 0 0 0 3px ${L.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${L.border}; border-radius: 10px; background: ${L.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${L.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${L.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${L.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${L.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${L.blueLight}; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${L.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${L.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${L.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${L.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${L.border};
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${L.shadowFloat}; z-index: 10;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${L.textMain}; }
            
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
                font-family: ${L.font}; font-size: 15px; font-weight: 600; color: ${L.textMain};
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
                border-color: ${L.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${L.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${L.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${L.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 10px; font-weight: 700; color: ${L.textSub};
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
        `,document.head.appendChild(b)}let a=document.createElement("div");a.className="cw-zen-container";let s=document.createElement("div");Object.assign(s.style,{display:"none"});let c=document.createElement("div");c.className="cw-screens-container",s.appendChild(c),a.innerHTML=`
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
    `;let v=a.querySelector(".cw-hero-grid"),u=a.querySelector(".cw-acc-container"),l=a.querySelector(".cw-results-container"),E=a.querySelector(".cw-search-input"),f=a.querySelector(".cw-status-bar"),x=a.querySelector(".cw-status-text"),y=a.querySelector(".cw-footer-icons");o.forEach(([b,p])=>{let m=n(p.name),d=document.createElement("div");d.className="cw-hero-card",d.id=`hero-${b}`,d.style.setProperty("--hero-color",m.color),d.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${Le[m.icon]}</div>
                <div class="cw-hero-label">${p.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,d.onclick=g=>{if(g.target.closest(".cw-step-btn"))return;let h=t[b]?t[b].count:0;w(b,h>0?-h:1,p)},d.querySelector(".minus").onclick=()=>w(b,-1,p),d.querySelector(".plus").onclick=()=>w(b,1,p),d.dataset.color=m.color,v.appendChild(d)});function A(b,p){let m=n(p.name),d=document.createElement("div");return d.className="cw-task-item",d.dataset.id=b,d.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${m.bg}; color:${m.color}">
                    ${Le[m.icon]||Le.default}
                </div>
                <div class="cw-task-label">${p.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,d.onclick=g=>{if(g.target.closest(".cw-step-btn"))return;let h=t[b]?t[b].count:0;w(b,h>0?-h:1,p)},d.querySelector(".minus").onclick=()=>w(b,-1,p),d.querySelector(".plus").onclick=()=>w(b,1,p),d}Object.entries(r).forEach(([b,p])=>{let m=document.createElement("div");m.className="cw-acc-group";let d=document.createElement("div");d.className="cw-acc-header",d.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${p.brand.color}"></div>
                ${b}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,d.onclick=()=>{u.querySelectorAll(".cw-acc-group.open").forEach(h=>{h!==m&&h.classList.remove("open")}),m.classList.toggle("open")};let g=document.createElement("div");g.className="cw-acc-body",p.tasks.forEach(h=>{let T=A(h.key,h);g.appendChild(T)}),m.appendChild(d),m.appendChild(g),u.appendChild(m)});function w(b,p,m){t[b]||(t[b]={count:0,data:m,brand:n(m.name)}),t[b].count+=p,t[b].count<=0&&delete t[b],P(),V(),e&&e()}function P(){o.forEach(([g])=>{let h=v.querySelector(`#hero-${g}`);if(!h)return;let T=t[g];T?(h.classList.add("active"),h.querySelector(".cw-step-val").textContent=T.count,h.querySelector(".cw-step-val").style.color=h.dataset.color):h.classList.remove("active")}),a.querySelectorAll(".cw-task-item").forEach(g=>{let h=g.dataset.id,T=t[h];T?(g.classList.add("selected"),g.querySelector(".cw-step-val").textContent=T.count):g.classList.remove("selected")});let p=Object.keys(t),m=0,d=[];if(p.forEach(g=>{let h=t[g];m+=h.count;for(let T=0;T<h.count;T++)d.length<6&&d.push(h.brand)}),m>0){f.classList.add("visible");let g=m>1?"A\xE7\xF5es":"A\xE7\xE3o",h=m>1?"definidas":"definida";x.textContent=`${m} ${g} ${h}`,y.innerHTML="",d.forEach(T=>{let $=document.createElement("div");$.className="cw-mini-icon",$.innerHTML=Le[T.icon]||Le.default;let W=$.querySelector("svg");W&&(W.style.width="14px",W.style.height="14px"),y.appendChild($)})}else f.classList.remove("visible")}E.addEventListener("input",b=>{let p=b.target.value.toLowerCase();if(p.length>0){u.style.display="none",l.style.display="block",l.innerHTML="";let m=!1;Object.entries(Ae).forEach(([d,g])=>{if(g.name.toLowerCase().includes(p)){m=!0;let h=A(d,g);t[d]&&(h.classList.add("selected"),h.querySelector(".cw-step-val").textContent=t[d].count),l.appendChild(h)}}),m||(l.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else u.style.display="block",l.style.display="none"});function V(){c.innerHTML="";let b=Object.keys(t),p=!1,m="implementation";if(b.length===0){c.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}let d=document.createElement("div");d.className="cw-info-banner",d.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Todos os Screenshots s\xE3o baseados na descri\xE7\xE3o do 
                <a href="https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/" target="_blank" class="cw-info-link">Win Criteria</a>.
            </span>
        `,c.appendChild(d),b.forEach(g=>{let h=t[g].data,T=t[g].count,$=t[g].brand,W=h.screenshots?h.screenshots[m]||[]:["Link da Evid\xEAncia"];if(W.length>0){p=!0;for(let I=1;I<=T;I++){let j=document.createElement("div");j.className="cw-screen-card",j.style.setProperty("--brand-color",$.color),j.style.setProperty("--brand-bg",$.bg),j.style.setProperty("--brand-shadow",$.color+"40");let M=document.createElement("div");M.className="cw-card-header";let F=document.createElement("div");F.className="cw-card-icon",F.innerHTML=Le[$.icon]||Le.default;let N=document.createElement("div");N.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let _=document.createElement("input");_.className="cw-card-title-input",_.id=`name-${g}-${I}`,_.value=`${h.name}${T>1?" #"+I:""}`,_.title="Clique para renomear esta task";let k=document.createElement("span");k.className="cw-edit-hint",k.innerHTML="\u270E Renomear",N.appendChild(_),N.appendChild(k),M.appendChild(F),M.appendChild(N),j.appendChild(M),W.forEach((oe,K)=>{let Y=document.createElement("div");Y.className="cw-input-group";let se=document.createElement("label");se.className="cw-input-label",se.textContent=oe.replace(/📷|:|•/g,"").trim();let Q=document.createElement("input");Q.className="cw-input-field",Q.id=`screen-${g}-${I}-${K}`,Q.placeholder="Cole o link aqui...",Q.setAttribute("autocomplete","off"),Q.addEventListener("input",()=>{Q.value.trim().length>5?Q.classList.add("filled"):Q.classList.remove("filled")});let ee=document.createElement("div");ee.className="cw-input-check",ee.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',Y.appendChild(se),Y.appendChild(Q),Y.appendChild(ee),j.appendChild(Y)}),c.appendChild(j)}}}),s.style.display=p?"block":"none"}return{selectionElement:a,screenshotsElement:s,updateSubStatus:()=>V(),getCheckedElements:()=>Object.keys(t).map(b=>({value:b,closest:()=>({querySelector:()=>({textContent:t[b].count})})})),toggleTask:(b,p=!0)=>{let m=t[b];p&&!m?w(b,1,Ae[b]):!p&&m&&w(b,-m.count,Ae[b])},reset:()=>{for(let b in t)delete t[b];E.value="",u.style.display="block",l.style.display="none",P(),V()}}}function Vt(){let e="v3.6.0",t="bau",n="pt",o=!1,r=!1,i={input:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},textarea:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease",height:"100px",resize:"vertical"},h3:{fontSize:"14px",fontWeight:"600",color:"#202124",margin:"0 0 12px 0"},label:{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},checkboxLabel:{display:"flex",alignItems:"center",marginBottom:"10px",fontSize:"14px",fontWeight:"400",cursor:"pointer",padding:"8px",background:"#f8f9fa",borderRadius:"6px",transition:"background-color 0.2s ease, box-shadow 0.2s ease",userSelect:"none"},checkboxInput:{width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"},buttonBase:{flex:"1 1 0",padding:"10px 0",color:"#fff",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"500",cursor:"pointer",marginTop:"16px"},stepBlock:{borderTop:"1px solid #eee",paddingTop:"12px",marginTop:"12px"},radioContainer:{display:"flex",gap:"15px",marginBottom:"10px"},optionalBtn:{width:"100%",padding:"10px",background:"white",border:"1px dashed #1a73e8",color:"#1a73e8",borderRadius:"6px",cursor:"pointer",fontWeight:"500",fontSize:"13px",marginBottom:"10px",transition:"all 0.2s"},helpLink:{fontSize:"12px",color:"#1a73e8",textDecoration:"none",cursor:"pointer",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"color 0.2s"}},a=qt(),s=Ht(()=>{let B=s.getCheckedElements().map(C=>C.value);I&&I.value&&a.updateVisibility(I.value,B)}),c=document.createElement("div");c.id="autofill-popup",Object.assign(c.style,Ce,{right:"100px",width:"400px",boxShadow:"none",opacity:"0",pointerEvents:"none",transition:"width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease, transform 0.3s ease"}),c.style.transition+=", width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)";let u=Ee(c,"Case Notes Assistant",e,"Gera notas padronizadas automaticamente. Selecione o status, as tasks realizadas e preencha os detalhes para inserir no caso.",{popup:c,googleLine:null},()=>pt());c.appendChild(u);let l=document.createElement("div");Object.assign(l.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1"}),c.appendChild(l);let E=document.createElement("div");E.textContent="created by lucaste@",Object.assign(E.style,Xe),c.appendChild(E);let f=document.createElement("div");f.id="step-lang-type";let x=document.createElement("label");Object.assign(x.style,i.label),f.appendChild(x);let y=document.createElement("div");Object.assign(y.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let A=document.createElement("div");A.textContent="Portugu\xEAs",A.classList.add("no-drag"),Object.assign(A.style,ce);let w=document.createElement("div");w.textContent="Espa\xF1ol",w.classList.add("no-drag"),Object.assign(w.style,ce),A.onclick=()=>rt("pt"),w.onclick=()=>rt("es"),y.appendChild(A),y.appendChild(w),f.appendChild(y),l.appendChild(f);let P=document.createElement("div");P.id="step-0-case-type";let V=document.createElement("label");Object.assign(V.style,i.label),P.appendChild(V);let b=document.createElement("div");Object.assign(b.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let p=document.createElement("div");p.textContent="BAU",p.classList.add("no-drag"),Object.assign(p.style,ce);let m=document.createElement("div");m.textContent="LM",m.classList.add("no-drag"),Object.assign(m.style,ce),p.onclick=()=>st("bau"),m.onclick=()=>st("lm"),b.appendChild(p),b.appendChild(m),P.appendChild(b),l.appendChild(P);let d=document.createElement("div");d.id="step-1-selection";let g=document.createElement("label");Object.assign(g.style,i.label);let h=document.createElement("select");h.id="main-status",Object.assign(h.style,Be),h.innerHTML='<option value="">-- Selecione --</option><option value="NI">NI - Need Info</option><option value="SO">SO - Solution Offered</option><option value="IN">IN - Inactive</option><option value="AS">AS - Assigned</option>';let T=document.createElement("div");Object.assign(T.style,{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginTop:"16px",marginBottom:"8px"});let $=document.createElement("label");Object.assign($.style,i.label,{marginTop:"0",marginBottom:"0"});let W=document.createElement("a");W.target="_blank",W.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> Guia de Substatus',Object.assign(W.style,i.helpLink),T.appendChild($),T.appendChild(W);let I=document.createElement("select");I.id="sub-status",Object.assign(I.style,Be),I.disabled=!0,d.appendChild(g),d.appendChild(h),d.appendChild(T),d.appendChild(I),l.appendChild(d);let j=document.createElement("div");j.id="step-1-1-portugal",Object.assign(j.style,i.stepBlock,{display:"none"});let M=document.createElement("label");Object.assign(M.style,i.label),j.appendChild(M);let F=document.createElement("div");Object.assign(F.style,i.radioContainer);let N=document.createElement("div");Object.assign(N.style,{display:"flex",alignItems:"center"});let _=document.createElement("input");_.type="radio",_.name="portugal-group",_.value="sim",Object.assign(_.style,i.checkboxInput);let k=document.createElement("label");k.htmlFor="portugal-sim",Object.assign(k.style,{cursor:"pointer"}),N.appendChild(_),N.appendChild(k);let oe=document.createElement("div");Object.assign(oe.style,{display:"flex",alignItems:"center"});let K=document.createElement("input");K.type="radio",K.name="portugal-group",K.value="nao",K.checked=!0,Object.assign(K.style,i.checkboxInput);let Y=document.createElement("label");Y.htmlFor="portugal-nao",Object.assign(Y.style,{cursor:"pointer"}),oe.appendChild(K),oe.appendChild(Y),F.appendChild(N),F.appendChild(oe),j.appendChild(F),l.appendChild(j);function se(S){o=S,S?Q.style.display="block":Q.style.display="none"}_.onchange=()=>se(!0),K.onchange=()=>se(!1);let Q=document.createElement("div");Q.id="step-1-2-consent",Object.assign(Q.style,i.stepBlock,{display:"none"});let ee=document.createElement("label");Object.assign(ee.style,i.label),Q.appendChild(ee);let de=document.createElement("div");Object.assign(de.style,i.radioContainer);let ve=document.createElement("div");Object.assign(ve.style,{display:"flex",alignItems:"center"});let ke=document.createElement("input");ke.type="radio",ke.name="consent-group",ke.value="Sim",ke.checked=!0,Object.assign(ke.style,i.checkboxInput);let $e=document.createElement("label");$e.htmlFor="consent-sim",Object.assign($e.style,{cursor:"pointer"}),ve.appendChild(ke),ve.appendChild($e);let Ue=document.createElement("div");Object.assign(Ue.style,{display:"flex",alignItems:"center"});let Fe=document.createElement("input");Fe.type="radio",Fe.name="consent-group",Fe.value="N\xE3o",Object.assign(Fe.style,i.checkboxInput);let We=document.createElement("label");We.htmlFor="consent-nao",Object.assign(We.style,{cursor:"pointer"}),Ue.appendChild(Fe),Ue.appendChild(We),de.appendChild(ve),de.appendChild(Ue),Q.appendChild(de),l.appendChild(Q);let Oe=document.createElement("div");Oe.id="step-1-5-snippets",Object.assign(Oe.style,i.stepBlock,{display:"none"});let at=document.createElement("h3");Object.assign(at.style,i.h3);let be=document.createElement("div");be.id="snippet-container",Oe.appendChild(at),Oe.appendChild(be),l.appendChild(Oe);let ge=document.createElement("div");ge.id="step-2-tasks",Object.assign(ge.style,i.stepBlock,{display:"none"});let pe=document.createElement("button");pe.textContent="+ Gostaria de selecionar uma task?",Object.assign(pe.style,i.optionalBtn),pe.onmouseover=()=>{pe.style.background="#e8f0fe"},pe.onmouseout=()=>{pe.style.background="white"};let De=document.createElement("h3");Object.assign(De.style,i.h3);let Ct=document.createElement("div");Ct.id="task-checkboxes-container",ge.appendChild(pe),ge.appendChild(Ct),ge.appendChild(De),ge.appendChild(s.selectionElement),l.appendChild(ge);let he=document.createElement("div");he.id="step-3-form",Object.assign(he.style,i.stepBlock,{display:"none"});let it=document.createElement("h3");Object.assign(it.style,i.h3),he.appendChild(it);let Se=document.createElement("div");Se.id="dynamic-form-fields-container",he.appendChild(Se),he.appendChild(a.element),he.appendChild(s.screenshotsElement),l.appendChild(he);let Ie=document.createElement("div");Ie.id="step-4-email",Object.assign(Ie.style,{display:"none",marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #eee"});let Ne=document.createElement("label");Ne.style.display="flex",Ne.style.alignItems="center",Ne.style.cursor="pointer",Ne.style.fontSize="14px";let _e=document.createElement("input");_e.type="checkbox",_e.checked=!0,Object.assign(_e.style,i.checkboxInput),Ne.appendChild(_e),Ne.appendChild(document.createTextNode("Preencher email automaticamente?")),Ie.appendChild(Ne),l.appendChild(Ie);let Ge=document.createElement("div");Object.assign(Ge.style,{display:"none",gap:"8px",padding:"0"}),l.appendChild(Ge);let ze=document.createElement("button");Object.assign(ze.style,i.buttonBase,{backgroundColor:"#5f6368"}),ze.textContent="Copiar";let Pe=document.createElement("button");Object.assign(Pe.style,i.buttonBase,{backgroundColor:"#1a73e8"}),Pe.textContent="Preencher",Ge.appendChild(ze),Ge.appendChild(Pe);let je=document.createElement("div");Object.assign(je.style,Ke),je.className="no-drag",je.title="Redimensionar",c.appendChild(je),Qe(c,je),document.body.appendChild(c);function st(S){t=S;let B=qe();Object.assign(p.style,ce),Object.assign(m.style,ce),S==="bau"?(Object.assign(p.style,B),W.href="https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657"):(Object.assign(m.style,B),W.href="https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243"),I.value&&I.dispatchEvent(new Event("change"))}function D(S){try{if(ye&&ye[n]&&ye[n][S])return ye[n][S];if(ye&&ye.pt&&ye.pt[S])return ye.pt[S]}catch{}return S}function Xt(){x.textContent=D("idioma"),V.textContent=D("fluxo"),g.textContent=D("status_principal"),$.textContent=D("substatus"),at.textContent=D("cenarios_comuns"),De.textContent=D("selecione_tasks"),it.textContent=D("preencha_detalhes"),ze.textContent=D("copiar"),Pe.textContent=D("preencher"),h.querySelector('option[value=""]')&&(h.querySelector('option[value=""]').textContent=D("select_status")),I.querySelector('option[value=""]')&&(I.querySelector('option[value=""]').textContent=D("select_substatus")),M.textContent=D("caso_portugal"),k.textContent=D("sim"),Y.textContent=D("nao"),ee.textContent=D("consentiu_gravacao"),$e.textContent=D("sim"),We.textContent=D("nao"),Se.querySelectorAll("label").forEach(S=>{let B=S.nextElementSibling.id.replace("field-",""),C=D(B.toLowerCase());C!==B.toLowerCase()?S.textContent=C:S.textContent=B.replace(/_/g," ").replace(/\b\w/g,z=>z.toUpperCase())+":"}),pe.textContent="+ "+(n==="pt"?"Gostaria de selecionar uma task?":"Quisiera seleccionar una tarea?")}function rt(S){n=S;let B=qe();Object.assign(A.style,ce),Object.assign(w.style,ce),S==="pt"?(Object.assign(A.style,B),j.style.display="block",se(o)):(Object.assign(w.style,B),j.style.display="none",Q.style.display="none"),Xt(),I.value&&I.dispatchEvent(new Event("change"))}function lt(S){(S.value.trim()===""||S.value.trim()==="\u2022")&&(S.value="\u2022 "),S.onkeydown=function(B){if(B.key==="Enter"){B.preventDefault();let C=this.selectionStart,z=this.selectionEnd,Z=this.value,ie=Z.lastIndexOf(`
`,C-1)+1,me=Z.substring(ie,C),re=me.trim()==="\u2022"||me.trim()===""?`
`:`
\u2022 `;this.value=Z.substring(0,C)+re+Z.substring(z),this.selectionStart=this.selectionEnd=C+re.length}else if(B.key==="Backspace"){let C=this.selectionStart;if(C===this.selectionEnd&&C>0){let z=this.value.substring(0,C);z.endsWith(`
\u2022 `)?(B.preventDefault(),this.value=z.substring(0,C-3)+this.value.substring(this.selectionEnd),this.selectionStart=this.selectionEnd=C-3):z==="\u2022 "&&(B.preventDefault(),this.value="",this.selectionStart=this.selectionEnd=0)}}}}function ct(){let S=typeof be<"u"?be:document.getElementById("snippet-container");if(!S)return;let B=S.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'),C={},z=new Set;B.forEach(U=>{let q=U.id,R=Re[q];if(R)for(let O in R)O==="linkedTask"?z.add(R.linkedTask):O!=="type"&&(C[O]||(C[O]=[]),C[O].includes(R[O])||C[O].push(R[O]))});let Z=new Set;Object.values(Re).forEach(U=>{Object.keys(U).forEach(q=>{q!=="linkedTask"&&q!=="type"&&Z.add(q)})}),Z.forEach(U=>{let q=document.getElementById(U);if(q){let R=C[U]||[],O="";Ve.includes(U.replace("field-",""))?(O=R.map(H=>H.startsWith("\u2022 ")?H:"\u2022 "+H).join(`
`),O===""?O="\u2022 ":O.endsWith(`
\u2022 `)||(O+=`
\u2022 `)):O=R.join(`

`),O.trim()!=="\u2022"&&O.trim()!==""?q.value=O:Ve.includes(U.replace("field-",""))?q.value="\u2022 ":q.value="",q.tagName==="TEXTAREA"&&typeof lt=="function"&&lt(q)}});let ie=new Set,me=new Set;S.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(U=>{let q=Re[U.id];q&&q.linkedTask&&(U.checked?ie.add(q.linkedTask):me.add(q.linkedTask))}),me.forEach(U=>{ie.has(U)||s.toggleTask(U,!1)}),ie.forEach(U=>{s.toggleTask(U,!0)})}h.onchange=()=>{let S=h.value;if(dt(1.5),I.innerHTML=`<option value="">${D("select_substatus")}</option>`,!S){I.disabled=!0;return}for(let B in He){let C=He[B];if(C.status===S){let z=document.createElement("option");z.value=B,z.textContent=C.name,I.appendChild(z)}}I.disabled=!1},I.onchange=()=>{let S=I.value;if(dt(1.5),!S)return;s.updateSubStatus(S);let B=He[S];be.innerHTML="";let C=(R,O,H)=>{let te=document.createElement("label");Object.assign(te.style,i.checkboxLabel),te.onmouseover=()=>te.style.backgroundColor="#e8eaed",te.onmouseout=()=>te.style.backgroundColor="#f8f9fa";let X=document.createElement("input");return X.type=O,X.id=R.id,Object.assign(X.style,i.checkboxInput),te.appendChild(X),te.appendChild(document.createTextNode(` ${R.text}`)),H.appendChild(te),X},z=[],Z="radio";if(S==="NI_Awaiting_Inputs")z=[{id:"quickfill-ni-inicio-manual",text:"In\xEDcio 2/6 (Manual)"},{id:"quickfill-ni-cms-access",text:"In\xEDcio 2/6 (ADV sem acesso ao CMS)"},{id:"quickfill-ni-followup-bau",text:"Follow-up 2/6 (BAU)"},{id:"quickfill-ni-followup-lm",text:"Follow-up 2/6 (LM)"}];else if(S.startsWith("SO_"))Z="checkbox",z=[{id:"quickfill-gtm-install",text:"Instala\xE7\xE3o do GTM"},{id:"quickfill-whatsapp",text:"Convers\xE3o de WhatsApp"},{id:"quickfill-form",text:"Convers\xE3o de Formul\xE1rio (Padr\xE3o)"},{id:"quickfill-ecw4-close",text:"Fechamento ECW4 (P\xF3s 7 dias)"}];else if(S.startsWith("AS_")){Z="checkbox";let R=document.createElement("label");R.textContent=D("cenarios_comuns"),Object.assign(R.style,i.label),be.appendChild(R),z=[{id:"quickfill-as-no-show",text:"Anunciante n\xE3o compareceu (respondeu e-mail)"},{id:"quickfill-as-insufficient-time",text:"Tempo insuficiente"},{id:"quickfill-as-no-access",text:"Anunciante sem acessos necess\xE1rios"}]}else S.startsWith("IN_")&&(z=[{id:"quickfill-in-nrp-bau",text:"NRP (BAU - 3 tentativas)"},{id:"quickfill-in-nrp-lm",text:"NRP (LM - Sem tentativas)"},{id:"quickfill-in-no-show-bau",text:"No-Show (BAU - 3 tentativas)"},{id:"quickfill-in-2-6-final",text:"Finaliza\xE7\xE3o 2/6 (Sem Resposta)"},{id:"quickfill-in-manual",text:"Outro (Manual)"}]);let ie=z.filter(R=>{let O=Re[R.id];return!O.type||O.type==="all"||O.type===t});ie.forEach((R,O)=>{let H=C(R,Z,be);Z==="radio"&&(H.name="scenario-radio-group",O===0&&(H.checked=!0))}),ie.length>0&&(Oe.style.display="block"),B.requiresTasks?(pe.style.display="none",De.style.display="block",s.selectionElement.style.display="block",ge.style.display="block"):(pe.style.display="block",De.style.display="none",s.selectionElement.style.display="none",ge.style.display="block"),Se.innerHTML="";let me=B.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(me)].forEach(R=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(R))return;let O=R.slice(1,-1),H=document.createElement("label"),te=D(O.toLowerCase());H.textContent=te!==O.toLowerCase()?te:O.replace(/_/g," ").replace(/\b\w/g,ne=>ne.toUpperCase())+":",Object.assign(H.style,i.label);let X;Ve.includes(O)?(X=document.createElement("textarea"),Object.assign(X.style,i.textarea),X.classList.add("bullet-textarea"),lt(X)):ht.includes(O)?(X=document.createElement("textarea"),Object.assign(X.style,i.textarea)):(X=document.createElement("input"),X.type="text",Object.assign(X.style,i.input),O==="REASON_COMMENTS"&&(S.startsWith("NI_")||S.startsWith("IN_"))&&(Object.assign(H.style,{display:"none"}),Object.assign(X.style,{display:"none"}))),O==="ON_CALL"&&t==="lm"&&(Object.assign(H.style,{display:"none"}),Object.assign(X.style,{display:"none"}),X.value="N/A"),X.id=`field-${O}`,Se.appendChild(H),Se.appendChild(X)});let U=be.querySelectorAll('input[type="checkbox"], input[type="radio"]');U.length>0&&(U.forEach(R=>{R.removeEventListener("change",ct),R.addEventListener("change",ct)}),ct()),he.style.display="block",Ze[S]?Ie.style.display="block":Ie.style.display="none",Ge.style.display="flex";let q=s.getCheckedElements().map(R=>R.value);a.updateVisibility(S,q)},pe.onclick=()=>{pe.style.display="none",De.style.display="block",s.selectionElement.style.display="block"};function At(){let S=I.value;if(!S)return null;let C=He[S].template.replace(/\n/g,"<br>"),z='style="margin-bottom: 12px; padding-left: 30px;"',Z=[],ie="",me=s.getCheckedElements();me.length>0&&me.forEach(q=>{let R=q.value,O=Ae[R],H=q.closest().querySelector(".stepper-count"),te=H?parseInt(H.textContent):1;te>1?Z.push(`${O.name} (x${te})`):Z.push(O.name)});let re=s.screenshotsElement;if(re){let q=Array.from(re.querySelectorAll('input[id^="name-"]'));q.length>0&&q.forEach(R=>{let O=R.value,H=R.closest(".cw-screen-card");if(H){let te=H.querySelectorAll('input[id^="screen-"]'),X=!1,ne="";te.forEach(ue=>{let wt=ue.closest(".cw-input-group"),Et=wt?wt.querySelector(".cw-input-label"):null,Kt=Et?Et.textContent:"Evid\xEAncia",Tt=ue.value.trim(),Qt=Tt?` ${Tt}`:"";ne+=`<li>${Kt} -${Qt}</li>`,X=!0}),X&&(ie+=`<b>${O}</b>`,ie+=`<ul ${z}>${ne}</ul>`)}})}if(C.includes("{TAGS_IMPLEMENTED}")?C=C.replace(/{TAGS_IMPLEMENTED}/g,Z.join(", ")||"N/A"):Z.length>0&&(C+=`<br><b>Tags:</b> ${Z.join(", ")}<br>`),C.includes("{SCREENSHOTS_LIST}")?C=C.replace(/{SCREENSHOTS_LIST}/g,ie?`${ie}`:"N/A"):ie!==""&&(C+=`<br>${ie}`),n==="pt"&&o){let q=ke.checked?D("sim"):D("nao");C=C.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${D("consentiu_gravacao")}</b> ${q}<br><br>`),C=C.replace(/{CASO_PORTUGAL}/g,`<br><b>${D("caso_portugal")}</b> ${D("sim")}<br>`)}else n==="pt"&&!o?(C=C.replace(/{CASO_PORTUGAL}/g,`<br><b>${D("caso_portugal")}</b> ${D("nao")}<br>`),C=C.replace(/{CONSENTIU_GRAVACAO}/g,"")):(C=C.replace(/{CASO_PORTUGAL}/g,""),C=C.replace(/{CONSENTIU_GRAVACAO}/g,""));return Se.querySelectorAll("input, textarea").forEach(q=>{let R=q.id.replace("field-",""),O=new RegExp(`{${R}}`,"g"),H=q.value;if(R==="REASON_COMMENTS"&&(S.startsWith("NI_")||S.startsWith("IN_"))){let ne=be.querySelector('input[type="radio"]:checked');ne&&Re[ne.id]&&(H=Re[ne.id]["field-REASON_COMMENTS"])}if(Ve.includes(R)&&H.trim()!==""){let ne=H.split(`
`).map(ue=>ue.trim()).filter(ue=>ue!==""&&ue!=="\u2022").map(ue=>ue.startsWith("\u2022 ")?ue.substring(2):ue).map(ue=>`<li>${ue}</li>`).join("");H=ne?`<ul ${z}>${ne}</ul>`:""}else ht.includes(R)?H=H.split(`
`).filter(ne=>ne.trim()!=="").map(ne=>`<p style="margin: 0 0 8px 0;">${ne}</p>`).join(""):q.tagName==="TEXTAREA"&&(H=H.replace(/\n/g,"<br>"));let te=H.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(te===""||te==="\u2022"||te.toLowerCase()==="n/a"){let ne=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${R}\\}(?:<br>\\s*)?`,"gi");ne.test(C)?C=C.replace(ne,""):C=C.replace(O,"")}else C=C.replace(O,H.replace(/\$/g,"$$$$"))}),C=C.replace(/{([A-Z0-9_]+)}/g,""),C=C.replace(/(<br>){3,}/g,"<br><br>"),typeof a<"u"&&a.getOutput&&(C+=a.getOutput()),C}ze.onclick=()=>{let S=At();S?(vt(S),J(D("copiado_sucesso"))):J(D("selecione_substatus"),{error:!0})},Pe.onclick=async()=>{let S=I.value,B=At();if(!B){J(D("selecione_substatus"),{error:!0});return}vt(B),pt();let C=tt(),z=await Bt();if(z)try{if(z.focus(),z.innerHTML.trim()==="<p><br></p>"||z.innerHTML.trim()==="<br>"||z.innerText.trim()===""){let re=document.createRange();re.selectNodeContents(z);let U=window.getSelection();U.removeAllRanges(),U.addRange(re),document.execCommand("delete",!1,null)}else if(!z.innerHTML.endsWith("<br><br>")){let re=document.createRange();re.selectNodeContents(z),re.collapse(!1);let U=window.getSelection();U.removeAllRanges(),U.addRange(re),document.execCommand("insertHTML",!1,"<br><br>")}document.execCommand("insertHTML",!1,B),jt(z),setTimeout(()=>{J(D("inserido_copiado"))},600);let ie=typeof _e<"u"&&_e?_e.checked:!0;if(S&&Ze[S]&&ie){let re=Ze[S];await Mt(re),await new Promise(U=>setTimeout(U,500))}C(),dt(1.5),h.value="",I.innerHTML=`<option value="">${D("select_substatus")}</option>`,I.disabled=!0}catch(Z){console.error(Z),J("Erro ao inserir.",{error:!0}),C()}};function dt(S=1.5){S<=1.5&&(Oe.style.display="none",be.innerHTML=""),S<=2&&(ge.style.display="none",s.reset(),pe.style.display="none"),S<=3&&(he.style.display="none",Se.innerHTML="",a.reset(),Ge.style.display="none",Ie.style.display="none")}function pt(){if(r=!r,r){let S=c.querySelector(".cw-expand-btn");S&&typeof S.resetState=="function"&&S.resetState()}Te(r,c,"cw-btn-notes")}return st("bau"),rt("pt"),pt}var Me={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function $t(){let e="v4.0.0",t=Object.keys(Me)[0],n="",o="list",r={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:"#FAFAFA"},i={display:"flex",width:"200%",height:"100%",transition:"transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",transform:"translateX(0)"},a={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},s={width:"100%",padding:"10px 12px 10px 36px",borderRadius:"8px",border:"none",background:"#F0F2F5",fontSize:"14px",color:"#202124",boxSizing:"border-box",outline:"none",transition:"all 0.2s ease",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"10px center"},c={display:"flex",gap:"6px",padding:"4px 4px 8px 4px",overflowX:"auto",scrollbarWidth:"none"},v={padding:"6px 12px",borderRadius:"16px",border:"1px solid transparent",background:"transparent",color:"#5f6368",fontSize:"12px",fontWeight:"500",cursor:"pointer",transition:"all 0.2s ease",flexShrink:"0"},u={background:"#E8F0FE",color:"#1967D2",fontWeight:"600"},l={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",marginBottom:"6px",borderRadius:"8px",background:"#fff",border:"1px solid #dadce0",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",position:"relative",overflow:"hidden"},E=!1,f=document.createElement("div");f.id="quick-email-popup",Object.assign(f.style,Ce,{right:"100px",width:"480px",height:"600px",boxShadow:"none",opacity:"0",pointerEvents:"none"});let x={popup:f,googleLine:null,focusElement:null};function y(){E=!E,Te(E,f,"cw-btn-email"),E||setTimeout(()=>W(),300)}let A=Ee(f,"Emails R\xE1pidos",e,"Selecione, visualize e insira com um clique.",x,()=>y()),w=document.createElement("div");Object.assign(w.style,r);let P=document.createElement("div");Object.assign(P.style,i);let V=document.createElement("div");Object.assign(V.style,a);let b=document.createElement("div");Object.assign(b.style,{padding:"16px 16px 4px 16px",flexShrink:"0",background:"#fff",zIndex:"10",display:"flex",flexDirection:"column",gap:"8px",borderBottom:"1px solid #f1f3f4"});let p=document.createElement("input");p.placeholder="Buscar template...",Object.assign(p.style,s),p.onfocus=()=>{p.style.background="#fff",p.style.boxShadow="0 2px 8px rgba(0,0,0,0.05)"},p.onblur=()=>{p.style.background="#F0F2F5",p.style.boxShadow="none"},x.focusElement=p;let m=document.createElement("div");Object.assign(m.style,c);let d=document.createElement("div");Object.assign(d.style,{padding:"12px 16px",overflowY:"auto",flexGrow:"1"}),b.appendChild(p),b.appendChild(m),V.appendChild(b),V.appendChild(d);let g=document.createElement("div");Object.assign(g.style,a);let h=document.createElement("div");Object.assign(h.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),g.appendChild(h),P.appendChild(V),P.appendChild(g),w.appendChild(P),f.appendChild(A),f.appendChild(w);let T=document.createElement("div");Object.assign(T.style,{padding:"8px 16px",borderTop:"1px solid #eee",textAlign:"center",fontSize:"10px",color:"#9aa0a6",background:"#fff",flexShrink:"0"}),T.textContent="created by lucaste@",f.appendChild(T),document.body.appendChild(f);function $(M){o="detail",P.style.transform="translateX(-50%)";let F='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',N='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';h.innerHTML=`
        <div style="
            position: sticky; top: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px);
            border-bottom: 1px solid #f1f3f4; padding: 12px 20px; z-index: 10;
            display: flex; align-items: center; gap: 8px;
        ">
            <button id="csa-back-btn" style="
                background:none; border:none; cursor:pointer; display:flex; align-items:center; justify-content: center;
                color:#5f6368; width: 32px; height: 32px; margin-left:-8px; border-radius:50%; transition:background 0.2s;
            ">
                ${F}
            </button>
            <div style="font-size:15px; font-weight:600; color:#202124; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${M.name}
            </div>
        </div>

        <div style="padding: 20px 20px 0 20px;">
            <div style="margin-bottom: 16px;">
                <div style="font-size:11px; font-weight:700; color:#1a73e8; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px;">Assunto</div>
                <div style="font-size:13px; font-weight:500; color:#202124; padding: 10px; background: #F8F9FA; border-radius: 8px; border: 1px solid #eee;">
                    ${M.subject}
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
                ">${M.body}</div>
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
                ${N} Inserir Template
            </button>
        </div>
      `;let _=h.querySelector("#csa-back-btn");_.onmouseover=()=>_.style.backgroundColor="#f1f3f4",_.onmouseout=()=>_.style.backgroundColor="transparent",_.onclick=W;let k=h.querySelector("#csa-insert-btn");k.onmouseover=()=>k.style.backgroundColor="#174ea6",k.onmouseout=()=>k.style.backgroundColor="#1a73e8",k.onclick=async()=>{k.style.transform="scale(0.96)",y();let oe=tt();try{await xt(M),oe()}catch(K){console.error(K),oe()}setTimeout(()=>{k.style.transform="scale(1)",W()},300)}}function W(){o="list",P.style.transform="translateX(0)"}function I(){m.innerHTML="",Object.keys(Me).forEach(M=>{let F=Me[M],N=document.createElement("button");N.textContent=F.title,Object.assign(N.style,v),t===M&&n===""&&Object.assign(N.style,u),N.onclick=()=>{t=M,n="",p.value="",I(),j()},m.appendChild(N)})}function j(){d.innerHTML="";let M=[];if(n.trim()!==""?Object.values(Me).forEach(_=>{let k=_.emails.filter(oe=>oe.name.toLowerCase().includes(n.toLowerCase()));M=[...M,...k]}):Me[t]&&(M=Me[t].emails),M.length===0){d.innerHTML='<div style="text-align:center; padding:60px 20px; color:#9aa0a6;"><div style="font-size:24px; margin-bottom:8px;">\u{1F50D}</div><div style="font-size:14px;">Nenhum template encontrado.</div></div>';return}let F='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>',N='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';M.forEach(_=>{let k=document.createElement("div");Object.assign(k.style,l);let oe=_.subject.length>50?_.subject.substring(0,50)+"...":_.subject;k.innerHTML=`
        <div style="flex-grow: 1; margin-right: 12px; min-width: 0;">
            <div style="font-size:13px; font-weight:600; color:#202124; margin-bottom:2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${_.name}</div>
            <div style="font-size:12px; color:#5f6368; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${oe}</div>
        </div>
        <div style="display:flex; gap:6px;">
            <button class="action-btn view" title="Visualizar" style="width:32px; height:32px; border-radius:50%; border:none; background:#f1f3f4; color:#5f6368; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">${N}</button>
            <button class="action-btn send" title="Inserir Agora" style="width:32px; height:32px; border-radius:50%; border:none; background:#e8f0fe; color:#1a73e8; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">${F}</button>
        </div>
      `,k.onmouseenter=()=>{k.style.background="#F8F9FA",k.style.borderColor="#1a73e8"},k.onmouseleave=()=>{k.style.background="#fff",k.style.borderColor="#dadce0"};let K=k.querySelector(".view");K.onclick=se=>{se.stopPropagation(),$(_)},K.onmouseenter=()=>{K.style.background="#d2e3fc",K.style.color="#174ea6"},K.onmouseleave=()=>{K.style.background="#f1f3f4",K.style.color="#5f6368"};let Y=k.querySelector(".send");Y.onclick=se=>{se.stopPropagation(),Y.style.transform="scale(0.9)",setTimeout(()=>Y.style.transform="scale(1)",150),xt(_),y()},Y.onmouseenter=()=>{Y.style.background="#1a73e8",Y.style.color="#fff",Y.style.boxShadow="0 2px 6px rgba(26,115,232,0.3)"},Y.onmouseleave=()=>{Y.style.background="#e8f0fe",Y.style.color="#1a73e8",Y.style.boxShadow="none"},k.onclick=()=>$(_),d.appendChild(k)})}return p.addEventListener("input",M=>{n=M.target.value,n!==""?Array.from(m.children).forEach(F=>Object.assign(F.style,v)):I(),j()}),I(),j(),y}var Ut={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function Wt(){let e="v2.0 (Teleprompter)",t={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},card:{background:"#ffffff",border:"1px solid #dadce0",borderRadius:"12px",padding:"16px",marginBottom:"16px",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",boxShadow:"0 1px 3px rgba(0,0,0,0.05)"},cardTitle:{fontSize:"13px",fontWeight:"700",color:"#5f6368",textTransform:"uppercase",letterSpacing:"0.5px",marginBottom:"12px",display:"flex",alignItems:"center",justifyContent:"space-between"},itemRow:{display:"flex",alignItems:"flex-start",padding:"8px 0",cursor:"pointer",transition:"opacity 0.2s",color:"#202124",fontSize:"14px",lineHeight:"1.5"},itemCompleted:{opacity:"0.5",textDecoration:"line-through",color:"#5f6368"},checkbox:{minWidth:"18px",height:"18px",borderRadius:"4px",border:"2px solid #5f6368",marginRight:"12px",marginTop:"2px",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)"}},n={},o="PT",r="BAU",i=!1,a=document.createElement("div");a.id="call-script-popup",Object.assign(a.style,Ce,{right:"auto",left:"50%",width:"400px",height:"600px",display:"flex",flexDirection:"column",boxShadow:"none",opacity:"0",pointerEvents:"none"});let s={popup:a,googleLine:null};function c(){i=!i,Te(i,a,"cw-btn-script")}let v=Ee(a,"Call Script",e,"Guia interativo para condu\xE7\xE3o de chamadas.",s,()=>{c()});a.appendChild(v);let u=document.createElement("div");Object.assign(u.style,t.progressBarContainer);let l=document.createElement("div");Object.assign(l.style,t.progressBarFill),u.appendChild(l),a.appendChild(u);let E=document.createElement("div");E.id="csa-content",Object.assign(E.style,{padding:"16px",overflowY:"auto",flexGrow:"1",background:"#f8f9fa"}),a.appendChild(E);let f=document.createElement("div");f.textContent="created by lucaste@",Object.assign(f.style,Xe),a.appendChild(f);let x=document.createElement("div");Object.assign(x.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",gap:"8px"});let y=document.createElement("div");Object.assign(y.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",background:"#fff"});let A=document.createElement("div");A.textContent="BAU";let w=document.createElement("div");w.textContent="LT",Object.assign(A.style,ce),Object.assign(w.style,ce),y.appendChild(A),y.appendChild(w);let P=document.createElement("select");Object.assign(P.style,Be,{marginBottom:"0",width:"auto",minWidth:"90px",paddingTop:"6px",paddingBottom:"6px",paddingRight:"30px",height:"32px",backgroundPosition:"right 8px center"}),P.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',P.value=o,x.appendChild(y),x.appendChild(P),E.appendChild(x);let V=document.createElement("div");V.id="csa-checklist-area",E.appendChild(V);let b=document.createElement("div");Object.assign(b.style,Ke),b.className="no-drag",b.title="Redimensionar",a.appendChild(b),Qe(a,b),document.body.appendChild(a);function p(g){return g}function m(){V.innerHTML="";let g=`${o} ${r}`,h=Ut[g];if(!h){V.innerHTML='<div style="padding: 20px; text-align: center; color: #5f6368;">Script n\xE3o dispon\xEDvel.</div>',l.style.width="0%";return}let T=h.color||"#1a73e8",$=0,W=0;["inicio","fim"].forEach(j=>{h[j]&&($+=h[j].length)}),["inicio","fim"].forEach(j=>{let M=h[j];if(!M||M.length===0)return;let F=document.createElement("div");Object.assign(F.style,t.card);let N=document.createElement("div");Object.assign(N.style,t.cardTitle);let _=j==="inicio"?"Abertura":"Fechamento";o.includes("ES")&&(_=j==="inicio"?"Apertura":"Cierre"),o.includes("EN")&&(_=j==="inicio"?"Opening":"Closing"),N.textContent=_;let k=document.createElement("span");k.style.fontSize="11px",k.style.opacity="0.7",k.id=`counter-${j}`,N.appendChild(k),F.appendChild(N);let oe=0;M.forEach((K,Y)=>{let se=`${g}-${j}-${Y}`,Q=!!n[se];Q&&(W++,oe++);let ee=document.createElement("div");Object.assign(ee.style,t.itemRow);let de=document.createElement("div");Object.assign(de.style,t.checkbox);let ve=document.createElement("span");ve.innerHTML=K,ve.style.flex="1",Q?(Object.assign(ee.style,t.itemCompleted),de.style.background=T,de.style.borderColor=T,de.innerHTML='<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'):(ee.style.textDecoration="none",ee.style.opacity="1",de.style.background="transparent",de.style.borderColor="#5f6368",de.innerHTML=""),ee.onclick=()=>{n[se]=!n[se],m()},ee.onmouseenter=()=>{n[se]||(ee.style.background="#f1f3f4")},ee.onmouseleave=()=>{ee.style.background="transparent"},ee.appendChild(de),ee.appendChild(ve),F.appendChild(ee)}),k.textContent=`${oe}/${M.length}`,oe===M.length&&(k.style.color="#1e8e3e",F.style.borderLeft="4px solid #1e8e3e"),V.appendChild(F)});let I=$===0?0:W/$*100;l.style.width=`${I}%`,I===100?l.style.background="#34A853":l.style.background="linear-gradient(90deg, #4285F4, #34A853)"}function d(g){r=g;let h=qe();Object.assign(A.style,ce),Object.assign(w.style,ce),Object.assign(g==="BAU"?A.style:w.style,h),m()}return A.onclick=()=>d("BAU"),w.onclick=()=>d("LT"),P.addEventListener("change",g=>{o=g.target.value,m()}),d(r),c}var nt={lm:{label:"LM Forms",links:[{name:"Relat\xF3rio de Ocorr\xEAncias",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas operacionais | Aviso de pausas"},{name:"Chamadas Excedidas (>50min)",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro de chamadas longas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema/ferramenta"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"Enviar casos para BAU/Solicitar Descarte/Abrir Monitoria para AMs"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo dos Anunciantes"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos complicados de atender"}]},suporte:{label:"Central de Ajuda",links:[{name:"Suporte Google Ads",url:"https://support.google.com/google-ads/",desc:"Oficial"},{name:"Suporte GA4",url:"https://support.google.com/analytics/",desc:"Oficial"},{name:"Suporte Merchant Center",url:"https://support.google.com/merchants/gethelp",desc:"Oficial"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. oficial sobre CSP"},{name:"Doc. Enhanced Conversion",url:"https://support.google.com/google-ads/answer/9888656?hl=en",desc:"Como funcionam as convers\xF5es otimizadas?"},{name:"Doc. CoMo",url:"https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=pt-br",desc:"Doc. oficial sobre Consent Mode"}]},outros:{label:"Diversos",links:[{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form para solicitar grava\xE7\xE3o da chamada."}]}};function Yt(){let e="v2.4.5",t="lm",n="",o={width:"100%",padding:"10px 12px 10px 36px",borderRadius:"8px",border:"1px solid #dadce0",background:"#f8f9fa",fontSize:"14px",boxSizing:"border-box",outline:"none",color:"#3c4043",transition:"background 0.2s, border-color 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"10px center"},r={display:"flex",flexWrap:"wrap",gap:"8px",paddingBottom:"8px"},i={padding:"6px 16px",borderRadius:"16px",border:"1px solid #dadce0",background:"transparent",color:"#5f6368",fontSize:"13px",fontWeight:"500",cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s ease",marginBottom:"4px"},a={background:"#e8f0fe",color:"#1967d2",borderColor:"#e8f0fe",fontWeight:"600"},s={display:"flex",alignItems:"center",padding:"10px 14px",borderRadius:"12px",cursor:"pointer",border:"1px solid transparent",marginBottom:"6px",background:"#ffffff",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), background 0.2s",boxShadow:"0 1px 2px rgba(0,0,0,0.02)",opacity:"0",transform:"translateY(10px)"},c={width:"36px",height:"36px",borderRadius:"10px",background:"#f1f3f4",color:"#5f6368",display:"flex",alignItems:"center",justifyContent:"center",marginRight:"14px",fontSize:"18px",flexShrink:"0"},v=document.createElement("div");v.id="feedback-popup",Object.assign(v.style,Ce,{right:"100px",width:"400px",boxShadow:"none",opacity:"0",pointerEvents:"none"});let u={lm:"\u{1F4DD}",qa:"\u{1F6E1}\uFE0F",suporte:"\u{1F4DA}",outros:"\u26A1"},l={popup:v,googleLine:null,focusElement:null},E=!1,f=Ee(v,"Links \xDAteis",e,"Acesso r\xE1pido a formul\xE1rios internos (Ocorr\xEAncias, Bugs) e documenta\xE7\xF5es oficiais de suporte.",l,()=>p());v.appendChild(f);let x=document.createElement("div");Object.assign(x.style,{padding:"16px",display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid #f1f3f4",flexShrink:"0",backgroundColor:"#fff"});let y=document.createElement("input");y.type="text",y.placeholder="Buscar link, form ou ajuda...",Object.assign(y.style,o),l.focusElement=y,y.onfocus=()=>{y.style.borderColor="#1a73e8",y.style.backgroundColor="#fff"},y.onblur=()=>{y.style.borderColor="#dadce0",y.style.backgroundColor="#f8f9fa"};let A=document.createElement("div");Object.assign(A.style,r),x.appendChild(y),x.appendChild(A),v.appendChild(x);let w=document.createElement("div");Object.assign(w.style,{padding:"0 8px 8px 8px",overflowY:"auto",flexGrow:"1"}),v.appendChild(w);let P=document.createElement("div");Object.assign(P.style,{padding:"8px 16px",borderTop:"1px solid #eee",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"10px",color:"#9aa0a6"}),P.innerHTML="<span>by lucaste@</span>",v.appendChild(P),document.body.appendChild(v);function V(){A.innerHTML="",Object.keys(nt).forEach(m=>{let d=nt[m],g=document.createElement("button"),h=u[m]||"";g.innerHTML=`<span style="font-size:14px">${h}</span> ${d.label}`,Object.assign(g.style,i),t===m&&n===""&&Object.assign(g.style,a),g.onmousedown=()=>g.style.transform="scale(0.95)",g.onmouseup=()=>g.style.transform="scale(1)",g.onmouseleave=()=>g.style.transform="scale(1)",g.onclick=()=>{t=m,n="",y.value="",V(),b()},A.appendChild(g)})}function b(){w.innerHTML="";let m=[],d=n.trim()!=="";if(d?Object.entries(nt).forEach(([g,h])=>{let T=h.links.filter($=>$.name.toLowerCase().includes(n.toLowerCase())||$.desc.toLowerCase().includes(n.toLowerCase()));T.forEach($=>{$._catIcon=u[g],$._categoryName=h.label}),m=[...m,...T]}):(m=nt[t].links,m.forEach(g=>g._catIcon=u[t])),m.length===0){w.innerHTML=`
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px; opacity:0.6;">
            <div style="font-size:32px; margin-bottom:10px;">\u{1F50D}</div>
            <div style="font-size:13px; color:#5f6368;">Nenhum link encontrado.</div>
        </div>`;return}m.forEach((g,h)=>{let T=document.createElement("div");Object.assign(T.style,s);let $=document.createElement("div");Object.assign($.style,c),$.textContent=g._catIcon||"\u{1F517}",T.appendChild($);let W=document.createElement("div");W.style.flexGrow="1";let I=k=>{if(!d)return k;let oe=new RegExp(`(${n})`,"gi");return k.replace(oe,'<span style="color:#1a73e8; font-weight:700;">$1</span>')},j=`<div style="font-size:14px; font-weight:500; color:#202124;">${I(g.name)}</div>`,M=`<div style="font-size:11px; color:#5f6368; margin-top:2px;">${I(g.desc)}</div>`;W.innerHTML=j+M,T.appendChild(W);let F=document.createElement("div");F.style.display="flex",F.style.gap="4px",F.style.opacity="0",F.style.transition="opacity 0.2s";let N=document.createElement("div");N.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',Object.assign(N.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#5f6368",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"}),N.onclick=k=>{k.stopPropagation(),navigator.clipboard.writeText(g.url),N.style.transform="scale(1.2)",N.style.color="#1e8e3e",N.style.backgroundColor="#e6f4ea",setTimeout(()=>{N.style.transform="scale(1)",N.style.color="#5f6368",N.style.backgroundColor="transparent"},800)},N.onmouseenter=()=>N.style.backgroundColor="#f1f3f4",N.onmouseleave=()=>N.style.backgroundColor="transparent",F.appendChild(N);let _=document.createElement("div");_.innerHTML="\u2197",Object.assign(_.style,{width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",color:"#dadce0",fontSize:"16px"}),F.appendChild(_),T.appendChild(F),T.onclick=()=>window.open(g.url,"_blank"),T.onmouseenter=()=>{T.style.backgroundColor="#f8f9fa",T.style.transform="scale(1.01)",F.style.opacity="1",_.style.color="#1a73e8"},T.onmouseleave=()=>{T.style.backgroundColor="#ffffff",T.style.transform="scale(1)",F.style.opacity="0",_.style.color="#dadce0"},w.appendChild(T),requestAnimationFrame(()=>{T.style.transition="opacity 0.3s ease, transform 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.2)",setTimeout(()=>{T.style.opacity="1",T.style.transform="translateY(0)"},h*40)})})}y.addEventListener("input",m=>{n=m.target.value,n!==""?Array.from(A.children).forEach(d=>{d.style.backgroundColor="transparent",d.style.color="#5f6368",d.style.borderColor="#dadce0"}):V(),b()});function p(){E=!E,Te(E,v,"cw-btn-links")}return V(),b(),p}function ro(){if(window.techSolInitialized){ft();return}window.techSolInitialized=!0,console.log("\u{1F680} TechSol Suite Initializing...");try{_t(),ft();let e=Vt(),t=$t(),n=Wt(),o=Yt();Ft({toggleNotes:e,toggleEmail:t,toggleScript:n,toggleLinks:o})}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),J("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}ro();})();
