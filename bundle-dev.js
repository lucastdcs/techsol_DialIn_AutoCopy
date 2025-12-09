(()=>{var Ue="",Qt=e=>new Promise(t=>setTimeout(t,e));async function Tt(){if(Ue)return Ue;try{let e=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!e)return"Agente";e.click(),await Qt(100);let t="Consultor",n=document.querySelector("profile-details .name");if(n)t=n.textContent.trim().split(" ")[0],t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();else{let o=document.querySelector("profile-details img");if(o&&o.src.includes("/photos/")){let r=o.src.match(/\/photos\/([^\?]+)/)[1];t=r.charAt(0).toUpperCase()+r.slice(1)}}return e.click(),document.body.click(),Ue=t,t}catch(e){return console.warn("Sherlock falhou:",e),"Consultor"}}function ct(){return Ue||"Consultor"}function kt(e){let t=new Date,n=t.getHours(),o=t.getDay(),r="Ol\xE1",s="";n>=5&&n<12?(r="Bom dia",s='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):n>=12&&n<18?(r="Boa tarde",s='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(r="Boa noite",s='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let a=[];n>=0&&n<5?a=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:n<12?o===1?a=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:o===5?a=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:a=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:n<18?a=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:a=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(o===0||o===6)&&(a=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let i=a[Math.floor(Math.random()*a.length)];return{prefix:`${r},`,name:e,suffix:i,icon:s,isFriday:o===5}}function dt(){let e="Cliente",t="[INSERIR URL]";try{let o=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(o&&o.nextElementSibling){let r=o.nextElementSibling.innerText.trim();r&&(e=r)}}catch(n){console.warn("Falha ao capturar Nome:",n)}try{let o=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(o&&o.nextElementSibling){let r=o.nextElementSibling.innerText.trim();r&&(t=r)}}catch(n){console.warn("Falha ao capturar Website:",n)}return{advertiserName:e,websiteUrl:t,agentName:ct()}}var Ot=1e4;function Nt(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
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
    `,document.head.appendChild(t)}function Q(e,t={}){let n=document.createElement("div"),o=t.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(n.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:o,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),n.textContent=e,document.body.appendChild(n),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>n.remove(),400)},t.duration||4e3)}function _t(e,t=null){let n=0,o=0,r=0,s=0,a=t||e;a.style.cursor="grab",a.onmousedown=i;function i(u){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(u.target.tagName)||u.target.closest(".no-drag"))return;u=u||window.event,a.style.cursor="grabbing",e.style.transition="none";let l=e.getBoundingClientRect();e.style.transform="none",e.style.left=l.left+"px",e.style.top=l.top+"px",e.style.margin="0",e.style.bottom="auto",e.style.right="auto",Ot++,e.style.zIndex=Ot,r=u.clientX,s=u.clientY,e.setAttribute("data-dragging","true"),document.onmouseup=f,document.onmousemove=c}function c(u){u=u||window.event,u.preventDefault(),n=r-u.clientX,o=s-u.clientY,r=u.clientX,s=u.clientY;let l=e.offsetTop-o,E=e.offsetLeft-n,g=16,v=window.innerWidth,h=window.innerHeight,A=e.offsetWidth,T=e.offsetHeight;E<g?E=g:E+A>v-g&&(E=v-A-g),l<g?l=g:l+T>h-g&&(l=h-T-g),e.style.top=l+"px",e.style.left=E+"px"}function f(){document.onmouseup=null,document.onmousemove=null,a.style.cursor="grab",setTimeout(()=>{e.style.transition="all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease",e.setAttribute("data-dragging","false"),e.setAttribute("data-moved","true")},50)}}var ye={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",display:"flex",flexDirection:"column",backgroundColor:"rgba(248, 249, 250, 0.96)",backdropFilter:"blur(20px) saturate(180%)",borderRadius:"20px",boxShadow:"0 20px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)",opacity:"0",pointerEvents:"none",fontFamily:"'Google Sans', 'Roboto'",transform:"translate(-50%, -50%)",transition:"all 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.3s ease"};var ut={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},mt={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var Rt={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var fe={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var pt=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],It=-1;function bt(){let e=Math.floor(Math.random()*pt.length);return e===It&&(e=(e+1)%pt.length),It=e,pt[e]}var ge=e=>new Promise(t=>setTimeout(t,e));async function Zt(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let n=e.querySelector(".cursor");await ge(200);for(let o=0;o<t.length;o++){let r=t.charAt(o),s=document.createElement("span");s.textContent=r,n&&n.parentNode===e?n.before(s):e.appendChild(s);let a=Math.floor(Math.random()*60)+30;o===0&&(a=150),o>t.length-3&&(a=30),await ge(a)}await ge(600),n&&(n.style.display="none")}async function gt(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
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
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await ge(200);let t=await Tt(),n=kt(t),o=e.querySelector("#w-icon"),r=e.querySelector("#p1"),s=e.querySelector("#p2"),a=e.querySelector("#p3"),i=e.querySelector("#p-sextou");o&&(o.innerHTML=n.icon),r&&(r.textContent=n.prefix),a&&(a.textContent=n.suffix),await ge(300);let c=o?o.querySelector("svg"):null;if(c&&(c.style.opacity="1",c.style.transform="scale(1)"),await ge(400),r&&(r.style.opacity="1"),s&&await Zt(s,n.name),a&&(a.style.opacity="1",a.style.transform="translateY(0)"),n.isFriday&&i){await ge(400),i.style.display="block",i.offsetWidth;let f=i.querySelector(".sextou-badge");f&&(f.style.opacity="1",f.style.transform="scale(1)")}await ge(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await ge(900),e.parentNode&&e.parentNode.removeChild(e)}}var We={position:"absolute",bottom:"1px",right:"1px",width:"20px",height:"20px",cursor:"nwse-resize",zIndex:"100000",opacity:"0.6",transition:"opacity 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="21" y1="15" x2="15" y2="21"></line><line x1="21" y1="9" x2="9" y2="21"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"bottom right"};function Ye(e,t){t.onmousedown=n;function n(o){o.stopPropagation(),o.preventDefault();let r=e.style.transition;e.style.transition="none";let s=o.clientX,a=o.clientY,i=parseFloat(getComputedStyle(e,null).getPropertyValue("width").replace("px","")),c=parseFloat(getComputedStyle(e,null).getPropertyValue("height").replace("px","")),f=s,u=a,l=!1;function E(h){f=h.clientX,u=h.clientY,l||(window.requestAnimationFrame(()=>{g(),l=!1}),l=!0)}function g(){let h=i+(f-s),A=c+(u-a);h>360&&(e.style.width=h+"px"),A>300&&(e.style.height=A+"px")}function v(){document.removeEventListener("mousemove",E),document.removeEventListener("mouseup",v),setTimeout(()=>{e.style.transition=r},50)}document.addEventListener("mousemove",E),document.addEventListener("mouseup",v)}t.onmouseenter=()=>t.style.opacity="1",t.onmouseleave=()=>t.style.opacity="0.6"}var he={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:"}},ve={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:[]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},je={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"}},Xe={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl"},Pe=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],ft=["CONSIDERACOES","COMENTARIOS"],Ne={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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
\u2022 Tentativa 3 - `,"field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-2-6-final":{type:"all","field-REASON_COMMENTS":"Finaliza\xE7\xE3o (2/6)","field-SPEAKEASY_ID":"-","field-ON_CALL":"-","field-COMENTARIOS":"\u2022 Dia 9 finaliza\xE7\xE3o do 2/6, durante o per\xEDodo do acompanhamento n\xE3o houve retorno do anunciante, ent\xE3o o caso ser\xE1 encerrado.","field-SCREENSHOTS":"\u2022 N/A","field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-manual":{type:"all","field-REASON_COMMENTS":"Outro (Manual)","field-GTM_GA4_VERIFICADO":"N/A"}};var se=e=>new Promise(t=>setTimeout(t,e));function Se(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>e.dispatchEvent(new MouseEvent(n,t)))}function Ke(){return Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(t=>{let n=t.offsetParent!==null,o=t.closest("case-message-view")!==null,r=t.closest(".editor")!==null||t.closest("write-card")!==null;return n&&!o&&r})}async function Lt(){let e=!1,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(i=>i.innerText.trim()==="email");if(n&&n.offsetParent!==null){let i=n.closest("material-button")||n.closest("material-fab")||n;i.style&&(i.style.display="block",i.style.visibility="visible"),Se(i),e=!0}else{let i=document.querySelector("material-fab-speed-dial");if(i){let c=i.querySelector(".trigger");if(c){c.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),Se(c),await se(1e3);let u=Array.from(document.querySelectorAll("i.material-icons-extended")).find(l=>l.innerText.trim()==="email");u&&(Se(u),e=!0)}else i.click()}}let o=0,r=Ke();for(console.log("\u23F3 Aguardando editor EDIT\xC1VEL...");!r&&o<30;)await se(500),r=Ke(),o++;if(!r)return Q("Erro: Editor de email n\xE3o apareceu.",{error:!0}),!1;let a=Array.from(document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]')).find(i=>i.offsetParent!==null);if(a){console.log("\u26A0\uFE0F Rascunho detectado. Clicando em Discard..."),Se(a);let i=null,c=0;for(;!i&&c<10;)await se(200),i=Array.from(document.querySelectorAll('material-button[debug-id="confirm-button"]')).find(u=>u.offsetParent!==null),c++;i?(console.log("\u2705 Confirmando descarte..."),Se(i),await se(2500)):console.warn("\u26A0\uFE0F Cliquei em Discard, mas o bot\xE3o Confirm n\xE3o apareceu.")}if(r){let i=r.closest('[id="email-body-content-top"]'),f=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(i){if(f){let l=f.closest('[aria-hidden="true"]');l&&l.removeAttribute("aria-hidden"),f.focus()}await se(300),i.innerHTML=`
                <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                    <span id="cases-body-field"><br></span>
                </div>
            `;let u=i.querySelector("#cases-body-field");if(u){let l=document.createRange();l.selectNodeContents(u),l.collapse(!0);let E=window.getSelection();E.removeAllRanges(),E.addRange(l)}return!0}}return Q("Erro cr\xEDtico ao acessar editor.",{error:!0}),!1}async function Mt(e){if(!e)return;Q("Preparando email...",{duration:3e3});let t=dt();if(!await Lt())return;await se(500);let o=document.querySelector('material-button[debug-id="canned_response_button"]');if(o){o.scrollIntoView({behavior:"smooth",block:"center"}),await se(200),Se(o),await se(1500);let r=document.querySelector("material-auto-suggest-input input");if(r){Se(r),await se(200),document.execCommand("insertText",!1,e),r.dispatchEvent(new Event("input",{bubbles:!0}));let s=null,a=0;for(;a<20;){await se(500),a++;let i=Array.from(document.querySelectorAll("material-select-dropdown-item"));if(i.length>0&&(s=i.find(c=>c.innerText.toLowerCase().includes(e.toLowerCase())),!s&&i.length===1&&(s=i[0]),s))break}if(s){let i=function(l,E){if(l.nodeType===3&&l.nodeValue.includes(E))return l;if(!l.childNodes)return null;for(let g of l.childNodes){let v=i(g,E);if(v)return v}return null};Se(s),await se(2e3);let c=Ke(),f=c?c.closest('[id="email-body-content-top"]'):document.body,u=i(f,"{%ADVERTISER_NAME%}");if(u){let l=document.createRange(),E=u.nodeValue.indexOf("{%ADVERTISER_NAME%}");l.setStart(u,E),l.setEnd(u,E+19);let g=window.getSelection();g.removeAllRanges(),g.addRange(l),document.execCommand("insertText",!1,t.advertiserName),Q("Email preenchido!")}else Q("Email inserido (Nome n\xE3o substitu\xEDdo).")}else Q(`Template '${e}' n\xE3o encontrado.`,{error:!0})}}else Q("Bot\xE3o Canned Response n\xE3o achado.",{error:!0})}async function ht(e){console.log(`\u{1F680} Iniciando automa\xE7\xE3o (Quick): ${e.name}`),Q("Preparando email...",{duration:3e3});let t=dt(),n=ct();if(!await Lt())return;await se(600);let r=document.querySelector('input[aria-label="Subject"]');r&&e.subject&&(r.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(r,e.subject),r.dispatchEvent(new Event("input",{bubbles:!0})),await se(300));let s=Ke();if(s){let i=(s.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');i&&(i.focus(),i.click(),i.dispatchEvent(new Event("input",{bubbles:!0}))),await se(400);let c=new Date;c.setDate(c.getDate()+3);let f=c.getDay();f===6?c.setDate(c.getDate()+2):f===0&&c.setDate(c.getDate()+1);let u=c.toLocaleDateString("pt-BR"),l=e.body;l=l.replace(/\[Nome do Cliente\]/g,t.advertiserName||"Cliente"),l=l.replace(/\[INSERIR URL\]/g,t.websiteUrl||"seu site"),l=l.replace(/\[URL\]/g,t.websiteUrl||"seu site"),l=l.replace(/\[Seu Nome\]/g,n),l=l.replace(/\[MM\/DD\/YYYY\]/g,u),document.execCommand("insertHTML",!1,l),i&&(i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))),Q("Email preenchido com sucesso!",{duration:2e3}),await se(800)}else Q("Erro ao focar no editor.",{error:!0})}var Jt={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},Dt={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function Ce(e,t,n,o,r,s){let a=document.createElement("div");Object.assign(a.style,Jt),_t(e,a);let i=document.createElement("div");Object.assign(i.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),a.appendChild(i),r&&(r.googleLine=i);let c=document.createElement("div");Object.assign(c.style,{display:"flex",alignItems:"center",gap:"12px"});let f=document.createElement("img");f.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(f.style,{width:"20px",height:"20px",pointerEvents:"none"});let u=document.createElement("span");u.textContent=t,c.appendChild(f),c.appendChild(u);let l=document.createElement("div");Object.assign(l.style,{display:"flex",alignItems:"center",gap:"4px"});let E='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',g='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',v=document.createElement("div");v.innerHTML=E,Object.assign(v.style,Dt),v.title="Sobre",v.classList.add("no-drag"),v.onmouseenter=()=>{v.style.background="rgba(255,255,255,0.1)",v.style.color="#FFF"},v.onmouseleave=()=>{v.style.color!=="rgb(138, 180, 248)"&&(v.style.background="transparent",v.style.color="#9AA0A6")};let h=document.createElement("div");h.innerHTML=g,Object.assign(h.style,Dt),h.title="Fechar",h.classList.add("no-drag"),h.onmouseenter=()=>{h.style.background="rgba(242, 139, 130, 0.2)",h.style.color="#F28B82"},h.onmouseleave=()=>{h.style.background="transparent",h.style.color="#9AA0A6"},h.onmousedown=T=>T.stopPropagation(),v.onmousedown=T=>T.stopPropagation(),h.onclick=s;let A=eo(e,t,n,o);return v.onclick=T=>{T.stopPropagation(),A.style.opacity==="1"?(A.style.opacity="0",A.style.pointerEvents="none",v.style.color="#9AA0A6",v.style.background="transparent"):(A.style.opacity="1",A.style.pointerEvents="auto",v.style.color="#8AB4F8",v.style.background="rgba(138, 180, 248, 0.1)")},l.appendChild(v),l.appendChild(h),a.appendChild(c),a.appendChild(l),a}function eo(e,t,n,o){let r=document.createElement("div");return Object.assign(r.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(5px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),r.innerHTML=`
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
    `,setTimeout(()=>{let s=r.querySelector("#close-help-internal");s&&(s.onmouseover=()=>s.style.backgroundColor="#f8f9fa",s.onmouseout=()=>s.style.backgroundColor="white",s.onclick=()=>{r.style.opacity="0",r.style.pointerEvents="none"})},0),e.appendChild(r),r}if(!document.getElementById("cw-module-styles")){let e=document.createElement("style");e.id="cw-module-styles",e.innerHTML=`
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
    `,document.head.appendChild(e)}function Ae(e,t,n){let o=document.getElementById(n);if(!t)return;let r=t.getAttribute("data-moved")==="true",s={x:0,y:0};if(o){let u=o.getBoundingClientRect();s.x=u.left+u.width/2,s.y=u.top+u.height/2}let a,i;if(!r)a=window.innerWidth/2,i=window.innerHeight/2;else{let u=t.getBoundingClientRect();a=u.left+u.width/2,i=u.top+u.height/2,a===0&&i===0&&(a=window.innerWidth/2,i=window.innerHeight/2)}let c=s.x-a,f=s.y-i;e?(t.style.transition="none",t.style.opacity="0",t.style.pointerEvents="auto",r?t.style.transform=`translate(${c}px, ${f}px) scale(0.05)`:t.style.transform=`translate(calc(-50% + ${c}px), calc(-50% + ${f}px)) scale(0.05)`,t.offsetWidth,requestAnimationFrame(()=>{t.classList.add("open"),o&&o.classList.add("active"),t.style.transition="opacity 0.4s ease-out, transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)",t.style.opacity="1",r?t.style.transform="translate(0, 0) scale(1)":t.style.transform="translate(-50%, -50%) scale(1)"}),typeof Gt=="function"&&Gt(t,n)):(t.style.transition="opacity 0.25s ease, transform 0.3s cubic-bezier(0.5, 0, 1, 1)",t.style.pointerEvents="none",requestAnimationFrame(()=>{t.style.opacity="0",r?t.style.transform=`translate(${c}px, ${f}px) scale(0.1)`:t.style.transform=`translate(calc(-50% + ${c}px), calc(-50% + ${f}px)) scale(0.1)`}),setTimeout(()=>{t.classList.remove("open"),o&&o.classList.remove("active"),t.style.transition="",t.style.transform=""},300),typeof xt=="function"&&xt(t))}function Gt(e,t){xt(e);let n=o=>{if(!e.classList.contains("open"))return;let r=e.contains(o.target),s=document.querySelector(".cw-pill"),a=s&&s.contains(o.target);r?(e.classList.remove("idle"),e.style.zIndex="2147483648"):a||(e.classList.add("idle"),e.style.zIndex="2147483646")};e._idleHandler=n,document.addEventListener("mousedown",n)}function xt(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}var oe={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",gripColor:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",gripActive:"linear-gradient(to left, #4285F4, #EA4335, #FBBC05, #34A853)",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995"},Qe=e=>new Promise(t=>setTimeout(t,e));function Ft(e){let t="cw-command-center-style";if(!document.getElementById(t)){let g=document.createElement("style");g.id=t,g.innerHTML=`
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
                
                background: ${oe.glassBg};
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${oe.glassBorder};
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
                color: ${oe.iconIdle};
                
                opacity: 0; transform: scale(0.5);
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-btn.popped { opacity: 1; transform: scale(1); }

            /* Hover (Feedback t\xE1til leve) */
            .cw-btn:hover { 
                background: ${oe.glassHighlight}; 
                color: ${oe.iconActive}; 
                transform: scale(1.1); 
            }

            /* --- ESTADO ATIVO (O M\xF3dulo est\xE1 aberto) --- */
            /* Mant\xE9m a cor da marca acesa e cria um fundo tintado */
            .cw-btn.notes.active { color: ${oe.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${oe.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${oe.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${oe.green} !important; background: rgba(129, 201, 149, 0.15); }
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
            .cw-btn.notes:hover { color: ${oe.blue}; filter: drop-shadow(0 0 5px rgba(138, 180, 248, 0.5)); }
            .cw-btn.email:hover { color: ${oe.red}; filter: drop-shadow(0 0 5px rgba(242, 139, 130, 0.5)); }
            .cw-btn.script:hover { color: ${oe.purple}; filter: drop-shadow(0 0 5px rgba(197, 138, 249, 0.5)); }
            .cw-btn.links:hover { color: ${oe.green}; filter: drop-shadow(0 0 5px rgba(129, 201, 149, 0.5)); }

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
                background-color: ${oe.iconIdle}; 
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
                background-color: ${oe.blue}; /* Azul Google de A\xE7\xE3o */
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
            .cw-dots span:nth-child(1) { background: ${oe.blue}; animation-delay: -0.32s; }
            .cw-dots span:nth-child(2) { background: ${oe.red}; animation-delay: -0.16s; }
            .cw-dots span:nth-child(3) { background: ${oe.green}; }
            
            @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

            /* Success Check Animado */
            .cw-check svg { width: 28px; height: 28px; stroke-dasharray: 50; stroke-dashoffset: 50; transition: stroke-dashoffset 0.5s ease 0.2s; }
            .cw-pill.success .cw-check svg { stroke-dashoffset: 0; }
        `,document.head.appendChild(g)}let n={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>'},o=document.createElement("div");o.className="cw-pill side-right",o.innerHTML=`
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
    `;let r=document.createElement("div");r.className="cw-focus-backdrop",document.body.appendChild(r),document.body.appendChild(o),o.querySelector(".notes").onclick=g=>{g.stopPropagation(),e.toggleNotes()},o.querySelector(".email").onclick=g=>{g.stopPropagation(),e.toggleEmail()},o.querySelector(".script").onclick=g=>{g.stopPropagation(),e.toggleScript()},o.querySelector(".links").onclick=g=>{g.stopPropagation(),e.toggleLinks()},(async function(){await Qe(2800),o.classList.add("docked"),await Qe(300);let v=o.querySelectorAll(".cw-btn");o.querySelectorAll(".cw-sep").forEach(A=>A.classList.add("visible"));for(let A=0;A<v.length;A++)v[A].classList.add("popped"),await Qe(90);await Qe(200),o.classList.add("system-check")})();let s=!1,a,i,c,f,u=3;o.onmousedown=g=>{if(g.target.closest("button"))return;g.preventDefault(),a=g.clientX,i=g.clientY;let v=o.getBoundingClientRect();c=v.left,f=v.top,document.addEventListener("mousemove",l),document.addEventListener("mouseup",E)};function l(g){let v=g.clientX-a,h=g.clientY-i;!s&&Math.sqrt(v*v+h*h)>u&&(s=!0,o.style.transition="none"),s&&(o.style.left=`${c+v}px`,o.style.top=`${f+h}px`,o.style.right="auto",o.style.bottom="auto",o.style.transform="none")}function E(g){if(document.removeEventListener("mousemove",l),document.removeEventListener("mouseup",E),s){s=!1,o.style.transition="left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s ease";let v=window.innerWidth,h=window.innerHeight,A=o.getBoundingClientRect(),T=A.left+A.width/2,q;T<v/2?(q=24,o.classList.remove("side-right"),o.classList.add("side-left")):(q=v-A.width-24,o.classList.remove("side-left"),o.classList.add("side-right"));let M=A.top;M<24&&(M=24),M>h-A.height-24&&(M=h-A.height-24),o.style.left=`${q}px`,o.style.top=`${M}px`,setTimeout(()=>{},600)}else{let v=g.target.closest("button");v&&(v.style.transform="scale(0.9)",setTimeout(()=>v.style.transform="",150))}}}function Ze(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop"),n=document.getElementById("cw-loader"),o=document.getElementById("cw-success");if(!e||!n||!o)return()=>{};let r=Date.now();return e.classList.add("processing"),t&&t.classList.add("active"),n.style.display="flex",o.style.display="none",function(){let a=Date.now()-r,i=Math.max(0,1500-a);setTimeout(()=>{n.style.display="none",o.style.display="block",o.offsetWidth,e.classList.add("success"),setTimeout(()=>{e.classList.remove("processing","success"),t&&t.classList.remove("active")},2e3)},i)}}var zt=e=>new Promise(t=>setTimeout(t,e));function Je(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>e.dispatchEvent(new MouseEvent(n,t)))}function yt(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let n=document.createRange();n.selectNodeContents(t);let o=window.getSelection();o.removeAllRanges(),o.addRange(n);try{document.execCommand("copy")}catch{Q("Falha ao copiar",{error:!0})}o.removeAllRanges(),document.body.removeChild(t)}function Pt(e){["input","change","keydown","keyup"].forEach(n=>{let o=new Event(n,{bubbles:!0,cancelable:!0});e.dispatchEvent(o)})}function jt(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function Bt(){console.log("Iniciando processo de Nova Nota...");let e=jt(),t=e.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(a=>a.innerText.trim()==="description");if(o){let a=o.closest("material-fab")||o.closest("material-button");a?(a.style&&(a.style.display="block",a.style.visibility="visible"),Je(a)):Je(o)}else{let a=document.querySelector("material-fab-speed-dial");if(a){let i=a.querySelector(".trigger");i?(i.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),Je(i)):a.click(),await zt(800);let f=Array.from(document.querySelectorAll("i.material-icons-extended")).find(u=>u.innerText.trim()==="description");f&&Je(f)}}let r=null,s=0;for(;!r&&s<20;){await zt(300);let a=jt();if(a.length>t)r=a.find(i=>!e.includes(i)),r||(r=a[a.length-1]);else if(s>10){let i=a.filter(c=>c.offsetParent!==null);i.length>0&&(r=i[i.length-1])}s++}return r}var G={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},me="cubic-bezier(0.25, 0.8, 0.25, 1)",to={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${G.border}`,backgroundColor:G.bgInput,fontSize:"14px",color:G.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${me}, box-shadow 0.2s ${me}, background-color 0.2s`,outline:"none"},Ao={...to,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},wo={fontSize:"13px",fontWeight:"700",color:G.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},Eo={display:"block",fontSize:"13px",fontWeight:"600",color:G.text,marginBottom:"8px",marginTop:"16px"},To={fontSize:"12px",color:G.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},ko={fontSize:"12px",color:G.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},Oo={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:G.text,cursor:"pointer",padding:"12px 14px",backgroundColor:G.surface,border:`1px solid ${G.border}`,borderRadius:"12px",transition:`all 0.2s ${me}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},vt={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:G.primary},Io={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:G.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${me}, box-shadow 0.2s ${me}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},No={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${G.primary}`,color:G.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${me}`},_o={background:"transparent",border:`1px solid ${G.border}`,borderRadius:"20px",color:G.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${me}`,fontFamily:"'Google Sans', 'Roboto'"};var Ro={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:G.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},Lo={fontSize:"13px",fontWeight:"700",color:G.primary,minWidth:"20px",textAlign:"center"},Mo={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${G.border}`,backgroundColor:G.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${me}, box-shadow 0.2s ${me}`},Do={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${G.bgInput}`},Go={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${G.border}`,backgroundColor:G.surface,color:G.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${me}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},Fo={backgroundColor:G.primaryBg,color:G.primary,borderColor:G.primary,fontWeight:"600"},zo={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:G.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},jo={borderTop:`1px solid ${G.bgInput}`,paddingTop:"20px",marginTop:"16px"};var Po={maxHeight:"240px",overflowY:"auto",border:`1px solid ${G.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:G.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},Bo={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${G.bgInput}`,cursor:"pointer",fontSize:"13px",color:G.text,transition:"background 0.1s",userSelect:"none"};var oo={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},no={fontSize:"12px",color:"#e37400",marginTop:"4px"},ao={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},io={display:"flex",gap:"15px",marginBottom:"10px"};function qt(){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,oo);let t=document.createElement("label");t.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(t.style,ut,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,io);let o=document.createElement("input");o.type="radio",o.name="ts_usage_mod",o.value="Sim",Object.assign(o.style,vt);let r=document.createElement("label");r.textContent="Sim";let s=document.createElement("div");Object.assign(s.style,{display:"flex",alignItems:"center"}),s.appendChild(o),s.appendChild(r);let a=document.createElement("input");a.type="radio",a.name="ts_usage_mod",a.value="N\xE3o",a.checked=!0,Object.assign(a.style,vt);let i=document.createElement("label");i.textContent="N\xE3o";let c=document.createElement("div");Object.assign(c.style,{display:"flex",alignItems:"center"}),c.appendChild(a),c.appendChild(i),n.appendChild(s),n.appendChild(c);let f=document.createElement("div");f.style.display="block";let u=document.createElement("label");u.textContent="Qual foi o Motivo?",Object.assign(u.style,ut,{fontSize:"12px"});let l=document.createElement("input");l.type="text",Object.assign(l.style,ao);let E=document.createElement("div");E.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(E.style,no),f.appendChild(u),f.appendChild(l),f.appendChild(E),e.appendChild(t),e.appendChild(n),e.appendChild(f),o.onchange=()=>{f.style.display="none"},a.onchange=()=>{f.style.display="block"};function g(A,T){if(e.style.display="none",!A||A.includes("Education")||!T||T.length===0)return;let q=T.some(p=>p.includes("enhanced")||p==="ec_google_ads"),M=T.some(p=>(p.includes("conversion")||p.includes("ads"))&&!p.includes("enhanced")),m=T.some(p=>p.includes("ga4")||p.includes("analytics")||p.includes("ua")),d=T.some(p=>p.includes("merchant")||p.includes("gmc")||p.includes("shopping"));(q||M&&!m&&!d)&&(e.style.display="block")}function v(){if(e.style.display==="none")return"";let A=`<br><b>Utilizou Tag Support?</b> ${o.checked?"Sim":"N\xE3o"}`;return a.checked&&l.value.trim()!==""&&(A+=`<br><b>Motivo:</b> ${l.value}`),A+="<br>",A}function h(){e.style.display="none",a.checked=!0,o.checked=!1,f.style.display="block",l.value=""}return{element:e,updateVisibility:g,getOutput:v,reset:h}}var _={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},_e={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function Vt(e){let t={};function n(m){let d=m.toLowerCase();return d.includes("ads")||d.includes("conversion")||d.includes("remarketing")?_.brands.ads:d.includes("ga4")||d.includes("analytics")?_.brands.ga4:d.includes("gtm")||d.includes("tag manager")||d.includes("container")?_.brands.gtm:d.includes("merchant")||d.includes("shopping")||d.includes("feed")?_.brands.gmc:_.brands.default}let o=Object.entries(ve).filter(([m,d])=>d.popular),r={};Object.entries(ve).forEach(([m,d])=>{if(d.popular)return;let b=n(d.name);r[b.label]||(r[b.label]={brand:b,tasks:[]}),r[b.label].tasks.push({key:m,...d})});let s="cw-zen-tasks";if(!document.getElementById(s)){let m=document.createElement("style");m.id=s,m.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column; height: 100%; width: calc(100% + 32px); margin: -16px;
                font-family: ${_.font}; background: ${_.bg}; position: relative; overflow: hidden;
            }
            
            /* SCROLL AREA */
            .cw-zen-content { flex: 1; overflow-y: auto; padding-bottom: 80px; } /* Espa\xE7o para o Status Bar */

          /* --- HERO SECTION (Refined) --- */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${_.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${_.white}; 
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
                font-size: 12px; font-weight: 500; color: ${_.textMain}; line-height: 1.2; 
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
                color: ${_.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; cursor: pointer; transition: background 0.1s;
            }
            .cw-step-btn:hover { background: #E5E7EB; color: var(--hero-color); }            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${_.border}; border-radius: 10px; background: ${_.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${_.blue}; box-shadow: 0 0 0 3px ${_.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${_.border}; border-radius: 10px; background: ${_.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${_.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${_.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${_.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${_.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${_.blueLight}; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${_.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${_.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${_.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${_.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${_.border};
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${_.shadowFloat}; z-index: 10;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${_.textMain}; }
            
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
                font-family: ${_.font}; font-size: 15px; font-weight: 600; color: ${_.textMain};
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
                border-color: ${_.brands.ads.color};
                box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
            }

            /* Dica Visual "\u270E Renomear" */
            .cw-edit-hint {
                font-size: 12px; color: ${_.textSub}; opacity: 0; 
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
                font-size: 11px; color: ${_.textSub};
                display: flex; align-items: center; gap: 8px;
            }
            .cw-info-link { color: ${_.brands.ads.color}; text-decoration: none; font-weight: 600; }
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
                display: block; font-size: 10px; font-weight: 700; color: ${_.textSub};
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
        `,document.head.appendChild(m)}let a=document.createElement("div");a.className="cw-zen-container";let i=document.createElement("div");Object.assign(i.style,{display:"none"});let c=document.createElement("div");c.className="cw-screens-container",i.appendChild(c),a.innerHTML=`
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
    `;let f=a.querySelector(".cw-hero-grid"),u=a.querySelector(".cw-acc-container"),l=a.querySelector(".cw-results-container"),E=a.querySelector(".cw-search-input"),g=a.querySelector(".cw-status-bar"),v=a.querySelector(".cw-status-text"),h=a.querySelector(".cw-footer-icons");o.forEach(([m,d])=>{let b=n(d.name),p=document.createElement("div");p.className="cw-hero-card",p.id=`hero-${m}`,p.style.setProperty("--hero-color",b.color),p.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${_e[b.icon]}</div>
                <div class="cw-hero-label">${d.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,p.onclick=S=>{if(S.target.closest(".cw-step-btn"))return;let C=t[m]?t[m].count:0;T(m,C>0?-C:1,d)},p.querySelector(".minus").onclick=()=>T(m,-1,d),p.querySelector(".plus").onclick=()=>T(m,1,d),p.dataset.color=b.color,f.appendChild(p)});function A(m,d){let b=n(d.name),p=document.createElement("div");return p.className="cw-task-item",p.dataset.id=m,p.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${b.bg}; color:${b.color}">
                    ${_e[b.icon]||_e.default}
                </div>
                <div class="cw-task-label">${d.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,p.onclick=S=>{if(S.target.closest(".cw-step-btn"))return;let C=t[m]?t[m].count:0;T(m,C>0?-C:1,d)},p.querySelector(".minus").onclick=()=>T(m,-1,d),p.querySelector(".plus").onclick=()=>T(m,1,d),p}Object.entries(r).forEach(([m,d])=>{let b=document.createElement("div");b.className="cw-acc-group";let p=document.createElement("div");p.className="cw-acc-header",p.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${d.brand.color}"></div>
                ${m}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,p.onclick=()=>{u.querySelectorAll(".cw-acc-group.open").forEach(C=>{C!==b&&C.classList.remove("open")}),b.classList.toggle("open")};let S=document.createElement("div");S.className="cw-acc-body",d.tasks.forEach(C=>{let w=A(C.key,C);S.appendChild(w)}),b.appendChild(p),b.appendChild(S),u.appendChild(b)});function T(m,d,b){t[m]||(t[m]={count:0,data:b,brand:n(b.name)}),t[m].count+=d,t[m].count<=0&&delete t[m],q(),M(),e&&e()}function q(){o.forEach(([S])=>{let C=f.querySelector(`#hero-${S}`);if(!C)return;let w=t[S];w?(C.classList.add("active"),C.querySelector(".cw-step-val").textContent=w.count,C.querySelector(".cw-step-val").style.color=C.dataset.color):C.classList.remove("active")}),a.querySelectorAll(".cw-task-item").forEach(S=>{let C=S.dataset.id,w=t[C];w?(S.classList.add("selected"),S.querySelector(".cw-step-val").textContent=w.count):S.classList.remove("selected")});let d=Object.keys(t),b=0,p=[];if(d.forEach(S=>{let C=t[S];b+=C.count;for(let w=0;w<C.count;w++)p.length<6&&p.push(C.brand)}),b>0){g.classList.add("visible");let S=b>1?"A\xE7\xF5es":"A\xE7\xE3o",C=b>1?"definidas":"definida";v.textContent=`${b} ${S} ${C}`,h.innerHTML="",p.forEach(w=>{let F=document.createElement("div");F.className="cw-mini-icon",F.innerHTML=_e[w.icon]||_e.default;let $=F.querySelector("svg");$&&($.style.width="14px",$.style.height="14px"),h.appendChild(F)})}else g.classList.remove("visible")}E.addEventListener("input",m=>{let d=m.target.value.toLowerCase();if(d.length>0){u.style.display="none",l.style.display="block",l.innerHTML="";let b=!1;Object.entries(ve).forEach(([p,S])=>{if(S.name.toLowerCase().includes(d)){b=!0;let C=A(p,S);t[p]&&(C.classList.add("selected"),C.querySelector(".cw-step-val").textContent=t[p].count),l.appendChild(C)}}),b||(l.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else u.style.display="block",l.style.display="none"});function M(){c.innerHTML="";let m=Object.keys(t),d=!1,b="implementation";if(m.length===0){c.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}let p=document.createElement("div");p.className="cw-info-banner",p.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Todos os Screenshots s\xE3o baseados na descri\xE7\xE3o do 
                <a href="https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/" target="_blank" class="cw-info-link">Win Criteria</a>.
            </span>
        `,c.appendChild(p),m.forEach(S=>{let C=t[S].data,w=t[S].count,F=t[S].brand,$=C.screenshots?C.screenshots[b]||[]:["Link da Evid\xEAncia"];if($.length>0){d=!0;for(let O=1;O<=w;O++){let X=document.createElement("div");X.className="cw-screen-card",X.style.setProperty("--brand-color",F.color),X.style.setProperty("--brand-bg",F.bg),X.style.setProperty("--brand-shadow",F.color+"40");let H=document.createElement("div");H.className="cw-card-header";let U=document.createElement("div");U.className="cw-card-icon",U.innerHTML=_e[F.icon]||_e.default;let R=document.createElement("div");R.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let L=document.createElement("input");L.className="cw-card-title-input",L.id=`name-${S}-${O}`,L.value=`${C.name}${w>1?" #"+O:""}`,L.title="Clique para renomear esta task";let N=document.createElement("span");N.className="cw-edit-hint",N.innerHTML="\u270E Renomear",R.appendChild(L),R.appendChild(N),H.appendChild(U),H.appendChild(R),X.appendChild(H),$.forEach((ie,J)=>{let Y=document.createElement("div");Y.className="cw-input-group";let ce=document.createElement("label");ce.className="cw-input-label",ce.textContent=ie.replace(/📷|:|•/g,"").trim();let ee=document.createElement("input");ee.className="cw-input-field",ee.id=`screen-${S}-${O}-${J}`,ee.placeholder="Cole o link aqui...",ee.setAttribute("autocomplete","off"),ee.addEventListener("input",()=>{ee.value.trim().length>5?ee.classList.add("filled"):ee.classList.remove("filled")});let we=document.createElement("div");we.className="cw-input-check",we.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',Y.appendChild(ce),Y.appendChild(ee),Y.appendChild(we),X.appendChild(Y)}),c.appendChild(X)}}}),i.style.display=d?"block":"none"}return{selectionElement:a,screenshotsElement:i,updateSubStatus:()=>M(),getCheckedElements:()=>Object.keys(t).map(m=>({value:m,closest:()=>({querySelector:()=>({textContent:t[m].count})})})),toggleTask:(m,d=!0)=>{let b=t[m];d&&!b?T(m,1,ve[m]):!d&&b&&T(m,-b.count,ve[m])},reset:()=>{for(let m in t)delete t[m];E.value="",u.style.display="block",l.style.display="none",q(),M()}}}function Ht(){let e="v3.6.0",t="bau",n="pt",o=!1,r=!1,s={input:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},textarea:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease",height:"100px",resize:"vertical"},h3:{fontSize:"14px",fontWeight:"600",color:"#202124",margin:"0 0 12px 0"},label:{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},checkboxLabel:{display:"flex",alignItems:"center",marginBottom:"10px",fontSize:"14px",fontWeight:"400",cursor:"pointer",padding:"8px",background:"#f8f9fa",borderRadius:"6px",transition:"background-color 0.2s ease, box-shadow 0.2s ease",userSelect:"none"},checkboxInput:{width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"},buttonBase:{flex:"1 1 0",padding:"10px 0",color:"#fff",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"500",cursor:"pointer",marginTop:"16px"},stepBlock:{borderTop:"1px solid #eee",paddingTop:"12px",marginTop:"12px"},radioContainer:{display:"flex",gap:"15px",marginBottom:"10px"},optionalBtn:{width:"100%",padding:"10px",background:"white",border:"1px dashed #1a73e8",color:"#1a73e8",borderRadius:"6px",cursor:"pointer",fontWeight:"500",fontSize:"13px",marginBottom:"10px",transition:"all 0.2s"},helpLink:{fontSize:"12px",color:"#1a73e8",textDecoration:"none",cursor:"pointer",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"color 0.2s"}},a=qt(),i=Vt(()=>{let j=i.getCheckedElements().map(y=>y.value);O&&O.value&&a.updateVisibility(O.value,j)}),c=document.createElement("div");c.id="autofill-popup",Object.assign(c.style,ye,{right:"100px",width:"400px",boxShadow:"none",opacity:"0",pointerEvents:"none",transition:"width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease, transform 0.3s ease"}),c.style.transition+=", width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)";let u=Ce(c,"Case Notes Assistant",e,"Gera notas padronizadas automaticamente. Selecione o status, as tasks realizadas e preencha os detalhes para inserir no caso.",{popup:c,googleLine:null},()=>lt());c.appendChild(u);let l=document.createElement("div");Object.assign(l.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1"}),c.appendChild(l);let E=document.createElement("div");E.textContent="created by lucaste@",Object.assign(E.style,Rt),c.appendChild(E);let g=document.createElement("div");g.id="step-lang-type";let v=document.createElement("label");Object.assign(v.style,s.label),g.appendChild(v);let h=document.createElement("div");Object.assign(h.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let A=document.createElement("div");A.textContent="Portugu\xEAs",A.classList.add("no-drag"),Object.assign(A.style,fe);let T=document.createElement("div");T.textContent="Espa\xF1ol",T.classList.add("no-drag"),Object.assign(T.style,fe),A.onclick=()=>at("pt"),T.onclick=()=>at("es"),h.appendChild(A),h.appendChild(T),g.appendChild(h),l.appendChild(g);let q=document.createElement("div");q.id="step-0-case-type";let M=document.createElement("label");Object.assign(M.style,s.label),q.appendChild(M);let m=document.createElement("div");Object.assign(m.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let d=document.createElement("div");d.textContent="BAU",d.classList.add("no-drag"),Object.assign(d.style,fe);let b=document.createElement("div");b.textContent="LM",b.classList.add("no-drag"),Object.assign(b.style,fe),d.onclick=()=>nt("bau"),b.onclick=()=>nt("lm"),m.appendChild(d),m.appendChild(b),q.appendChild(m),l.appendChild(q);let p=document.createElement("div");p.id="step-1-selection";let S=document.createElement("label");Object.assign(S.style,s.label);let C=document.createElement("select");C.id="main-status",Object.assign(C.style,mt),C.innerHTML='<option value="">-- Selecione --</option><option value="NI">NI - Need Info</option><option value="SO">SO - Solution Offered</option><option value="IN">IN - Inactive</option><option value="AS">AS - Assigned</option>';let w=document.createElement("div");Object.assign(w.style,{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginTop:"16px",marginBottom:"8px"});let F=document.createElement("label");Object.assign(F.style,s.label,{marginTop:"0",marginBottom:"0"});let $=document.createElement("a");$.target="_blank",$.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> Guia de Substatus',Object.assign($.style,s.helpLink),w.appendChild(F),w.appendChild($);let O=document.createElement("select");O.id="sub-status",Object.assign(O.style,mt),O.disabled=!0,p.appendChild(S),p.appendChild(C),p.appendChild(w),p.appendChild(O),l.appendChild(p);let X=document.createElement("div");X.id="step-1-1-portugal",Object.assign(X.style,s.stepBlock,{display:"none"});let H=document.createElement("label");Object.assign(H.style,s.label),X.appendChild(H);let U=document.createElement("div");Object.assign(U.style,s.radioContainer);let R=document.createElement("div");Object.assign(R.style,{display:"flex",alignItems:"center"});let L=document.createElement("input");L.type="radio",L.name="portugal-group",L.value="sim",Object.assign(L.style,s.checkboxInput);let N=document.createElement("label");N.htmlFor="portugal-sim",Object.assign(N.style,{cursor:"pointer"}),R.appendChild(L),R.appendChild(N);let ie=document.createElement("div");Object.assign(ie.style,{display:"flex",alignItems:"center"});let J=document.createElement("input");J.type="radio",J.name="portugal-group",J.value="nao",J.checked=!0,Object.assign(J.style,s.checkboxInput);let Y=document.createElement("label");Y.htmlFor="portugal-nao",Object.assign(Y.style,{cursor:"pointer"}),ie.appendChild(J),ie.appendChild(Y),U.appendChild(R),U.appendChild(ie),X.appendChild(U),l.appendChild(X);function ce(x){o=x,x?ee.style.display="block":ee.style.display="none"}L.onchange=()=>ce(!0),J.onchange=()=>ce(!1);let ee=document.createElement("div");ee.id="step-1-2-consent",Object.assign(ee.style,s.stepBlock,{display:"none"});let we=document.createElement("label");Object.assign(we.style,s.label),ee.appendChild(we);let Be=document.createElement("div");Object.assign(Be.style,s.radioContainer);let qe=document.createElement("div");Object.assign(qe.style,{display:"flex",alignItems:"center"});let Ee=document.createElement("input");Ee.type="radio",Ee.name="consent-group",Ee.value="Sim",Ee.checked=!0,Object.assign(Ee.style,s.checkboxInput);let Ve=document.createElement("label");Ve.htmlFor="consent-sim",Object.assign(Ve.style,{cursor:"pointer"}),qe.appendChild(Ee),qe.appendChild(Ve);let He=document.createElement("div");Object.assign(He.style,{display:"flex",alignItems:"center"});let De=document.createElement("input");De.type="radio",De.name="consent-group",De.value="N\xE3o",Object.assign(De.style,s.checkboxInput);let $e=document.createElement("label");$e.htmlFor="consent-nao",Object.assign($e.style,{cursor:"pointer"}),He.appendChild(De),He.appendChild($e),Be.appendChild(qe),Be.appendChild(He),ee.appendChild(Be),l.appendChild(ee);let Te=document.createElement("div");Te.id="step-1-5-snippets",Object.assign(Te.style,s.stepBlock,{display:"none"});let tt=document.createElement("h3");Object.assign(tt.style,s.h3);let pe=document.createElement("div");pe.id="snippet-container",Te.appendChild(tt),Te.appendChild(pe),l.appendChild(Te);let ue=document.createElement("div");ue.id="step-2-tasks",Object.assign(ue.style,s.stepBlock,{display:"none"});let re=document.createElement("button");re.textContent="+ Gostaria de selecionar uma task?",Object.assign(re.style,s.optionalBtn),re.onmouseover=()=>{re.style.background="#e8f0fe"},re.onmouseout=()=>{re.style.background="white"};let Le=document.createElement("h3");Object.assign(Le.style,s.h3);let St=document.createElement("div");St.id="task-checkboxes-container",ue.appendChild(re),ue.appendChild(St),ue.appendChild(Le),ue.appendChild(i.selectionElement),l.appendChild(ue);let be=document.createElement("div");be.id="step-3-form",Object.assign(be.style,s.stepBlock,{display:"none"});let ot=document.createElement("h3");Object.assign(ot.style,s.h3),be.appendChild(ot);let xe=document.createElement("div");xe.id="dynamic-form-fields-container",be.appendChild(xe),be.appendChild(a.element),be.appendChild(i.screenshotsElement),l.appendChild(be);let ke=document.createElement("div");ke.id="step-4-email",Object.assign(ke.style,{display:"none",marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #eee"});let Oe=document.createElement("label");Oe.style.display="flex",Oe.style.alignItems="center",Oe.style.cursor="pointer",Oe.style.fontSize="14px";let Ie=document.createElement("input");Ie.type="checkbox",Ie.checked=!0,Object.assign(Ie.style,s.checkboxInput),Oe.appendChild(Ie),Oe.appendChild(document.createTextNode("Preencher email automaticamente?")),ke.appendChild(Oe),l.appendChild(ke);let Me=document.createElement("div");Object.assign(Me.style,{display:"none",gap:"8px",padding:"0"}),l.appendChild(Me);let Ge=document.createElement("button");Object.assign(Ge.style,s.buttonBase,{backgroundColor:"#5f6368"}),Ge.textContent="Copiar";let Fe=document.createElement("button");Object.assign(Fe.style,s.buttonBase,{backgroundColor:"#1a73e8"}),Fe.textContent="Preencher",Me.appendChild(Ge),Me.appendChild(Fe);let ze=document.createElement("div");Object.assign(ze.style,We),ze.className="no-drag",ze.title="Redimensionar",c.appendChild(ze),Ye(c,ze),document.body.appendChild(c);function nt(x){t=x;let j=bt();Object.assign(d.style,fe),Object.assign(b.style,fe),x==="bau"?(Object.assign(d.style,j),$.href="https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657"):(Object.assign(b.style,j),$.href="https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243"),O.value&&O.dispatchEvent(new Event("change"))}function D(x){try{if(he&&he[n]&&he[n][x])return he[n][x];if(he&&he.pt&&he.pt[x])return he.pt[x]}catch{}return x}function Yt(){v.textContent=D("idioma"),M.textContent=D("fluxo"),S.textContent=D("status_principal"),F.textContent=D("substatus"),tt.textContent=D("cenarios_comuns"),Le.textContent=D("selecione_tasks"),ot.textContent=D("preencha_detalhes"),Ge.textContent=D("copiar"),Fe.textContent=D("preencher"),C.querySelector('option[value=""]')&&(C.querySelector('option[value=""]').textContent=D("select_status")),O.querySelector('option[value=""]')&&(O.querySelector('option[value=""]').textContent=D("select_substatus")),H.textContent=D("caso_portugal"),N.textContent=D("sim"),Y.textContent=D("nao"),we.textContent=D("consentiu_gravacao"),Ve.textContent=D("sim"),$e.textContent=D("nao"),xe.querySelectorAll("label").forEach(x=>{let j=x.nextElementSibling.id.replace("field-",""),y=D(j.toLowerCase());y!==j.toLowerCase()?x.textContent=y:x.textContent=j.replace(/_/g," ").replace(/\b\w/g,z=>z.toUpperCase())+":"}),re.textContent="+ "+(n==="pt"?"Gostaria de selecionar uma task?":"Quisiera seleccionar una tarea?")}function at(x){n=x;let j=bt();Object.assign(A.style,fe),Object.assign(T.style,fe),x==="pt"?(Object.assign(A.style,j),X.style.display="block",ce(o)):(Object.assign(T.style,j),X.style.display="none",ee.style.display="none"),Yt(),O.value&&O.dispatchEvent(new Event("change"))}function it(x){(x.value.trim()===""||x.value.trim()==="\u2022")&&(x.value="\u2022 "),x.onkeydown=function(j){if(j.key==="Enter"){j.preventDefault();let y=this.selectionStart,z=this.selectionEnd,K=this.value,ne=K.lastIndexOf(`
`,y-1)+1,de=K.substring(ne,y),ae=de.trim()==="\u2022"||de.trim()===""?`
`:`
\u2022 `;this.value=K.substring(0,y)+ae+K.substring(z),this.selectionStart=this.selectionEnd=y+ae.length}else if(j.key==="Backspace"){let y=this.selectionStart;if(y===this.selectionEnd&&y>0){let z=this.value.substring(0,y);z.endsWith(`
\u2022 `)?(j.preventDefault(),this.value=z.substring(0,y-3)+this.value.substring(this.selectionEnd),this.selectionStart=this.selectionEnd=y-3):z==="\u2022 "&&(j.preventDefault(),this.value="",this.selectionStart=this.selectionEnd=0)}}}}function st(){let x=typeof pe<"u"?pe:document.getElementById("snippet-container");if(!x)return;let j=x.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'),y={},z=new Set;j.forEach(V=>{let P=V.id,I=Ne[P];if(I)for(let k in I)k==="linkedTask"?z.add(I.linkedTask):k!=="type"&&(y[k]||(y[k]=[]),y[k].includes(I[k])||y[k].push(I[k]))});let K=new Set;Object.values(Ne).forEach(V=>{Object.keys(V).forEach(P=>{P!=="linkedTask"&&P!=="type"&&K.add(P)})}),K.forEach(V=>{let P=document.getElementById(V);if(P){let I=y[V]||[],k="";Pe.includes(V.replace("field-",""))?(k=I.map(B=>B.startsWith("\u2022 ")?B:"\u2022 "+B).join(`
`),k===""?k="\u2022 ":k.endsWith(`
\u2022 `)||(k+=`
\u2022 `)):k=I.join(`

`),k.trim()!=="\u2022"&&k.trim()!==""?P.value=k:Pe.includes(V.replace("field-",""))?P.value="\u2022 ":P.value="",P.tagName==="TEXTAREA"&&typeof it=="function"&&it(P)}});let ne=new Set,de=new Set;x.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(V=>{let P=Ne[V.id];P&&P.linkedTask&&(V.checked?ne.add(P.linkedTask):de.add(P.linkedTask))}),de.forEach(V=>{ne.has(V)||i.toggleTask(V,!1)}),ne.forEach(V=>{i.toggleTask(V,!0)})}C.onchange=()=>{let x=C.value;if(rt(1.5),O.innerHTML=`<option value="">${D("select_substatus")}</option>`,!x){O.disabled=!0;return}for(let j in je){let y=je[j];if(y.status===x){let z=document.createElement("option");z.value=j,z.textContent=y.name,O.appendChild(z)}}O.disabled=!1},O.onchange=()=>{let x=O.value;if(rt(1.5),!x)return;i.updateSubStatus(x);let j=je[x];pe.innerHTML="";let y=(I,k,B)=>{let Z=document.createElement("label");Object.assign(Z.style,s.checkboxLabel),Z.onmouseover=()=>Z.style.backgroundColor="#e8eaed",Z.onmouseout=()=>Z.style.backgroundColor="#f8f9fa";let W=document.createElement("input");return W.type=k,W.id=I.id,Object.assign(W.style,s.checkboxInput),Z.appendChild(W),Z.appendChild(document.createTextNode(` ${I.text}`)),B.appendChild(Z),W},z=[],K="radio";if(x==="NI_Awaiting_Inputs")z=[{id:"quickfill-ni-inicio-manual",text:"In\xEDcio 2/6 (Manual)"},{id:"quickfill-ni-cms-access",text:"In\xEDcio 2/6 (ADV sem acesso ao CMS)"},{id:"quickfill-ni-followup-bau",text:"Follow-up 2/6 (BAU)"},{id:"quickfill-ni-followup-lm",text:"Follow-up 2/6 (LM)"}];else if(x.startsWith("SO_"))K="checkbox",z=[{id:"quickfill-gtm-install",text:"Instala\xE7\xE3o do GTM"},{id:"quickfill-whatsapp",text:"Convers\xE3o de WhatsApp"},{id:"quickfill-form",text:"Convers\xE3o de Formul\xE1rio (Padr\xE3o)"},{id:"quickfill-ecw4-close",text:"Fechamento ECW4 (P\xF3s 7 dias)"}];else if(x.startsWith("AS_")){K="checkbox";let I=document.createElement("label");I.textContent=D("cenarios_comuns"),Object.assign(I.style,s.label),pe.appendChild(I),z=[{id:"quickfill-as-no-show",text:"Anunciante n\xE3o compareceu (respondeu e-mail)"},{id:"quickfill-as-insufficient-time",text:"Tempo insuficiente"},{id:"quickfill-as-no-access",text:"Anunciante sem acessos necess\xE1rios"}]}else x.startsWith("IN_")&&(z=[{id:"quickfill-in-nrp-bau",text:"NRP (BAU - 3 tentativas)"},{id:"quickfill-in-nrp-lm",text:"NRP (LM - Sem tentativas)"},{id:"quickfill-in-no-show-bau",text:"No-Show (BAU - 3 tentativas)"},{id:"quickfill-in-2-6-final",text:"Finaliza\xE7\xE3o 2/6 (Sem Resposta)"},{id:"quickfill-in-manual",text:"Outro (Manual)"}]);let ne=z.filter(I=>{let k=Ne[I.id];return!k.type||k.type==="all"||k.type===t});ne.forEach((I,k)=>{let B=y(I,K,pe);K==="radio"&&(B.name="scenario-radio-group",k===0&&(B.checked=!0))}),ne.length>0&&(Te.style.display="block"),j.requiresTasks?(re.style.display="none",Le.style.display="block",i.selectionElement.style.display="block",ue.style.display="block"):(re.style.display="block",Le.style.display="none",i.selectionElement.style.display="none",ue.style.display="block"),xe.innerHTML="";let de=j.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(de)].forEach(I=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(I))return;let k=I.slice(1,-1),B=document.createElement("label"),Z=D(k.toLowerCase());B.textContent=Z!==k.toLowerCase()?Z:k.replace(/_/g," ").replace(/\b\w/g,te=>te.toUpperCase())+":",Object.assign(B.style,s.label);let W;Pe.includes(k)?(W=document.createElement("textarea"),Object.assign(W.style,s.textarea),W.classList.add("bullet-textarea"),it(W)):ft.includes(k)?(W=document.createElement("textarea"),Object.assign(W.style,s.textarea)):(W=document.createElement("input"),W.type="text",Object.assign(W.style,s.input),k==="REASON_COMMENTS"&&(x.startsWith("NI_")||x.startsWith("IN_"))&&(Object.assign(B.style,{display:"none"}),Object.assign(W.style,{display:"none"}))),k==="ON_CALL"&&t==="lm"&&(Object.assign(B.style,{display:"none"}),Object.assign(W.style,{display:"none"}),W.value="N/A"),W.id=`field-${k}`,xe.appendChild(B),xe.appendChild(W)});let V=pe.querySelectorAll('input[type="checkbox"], input[type="radio"]');V.length>0&&(V.forEach(I=>{I.removeEventListener("change",st),I.addEventListener("change",st)}),st()),be.style.display="block",Xe[x]?ke.style.display="block":ke.style.display="none",Me.style.display="flex";let P=i.getCheckedElements().map(I=>I.value);a.updateVisibility(x,P)},re.onclick=()=>{re.style.display="none",Le.style.display="block",i.selectionElement.style.display="block"};function Ct(){let x=O.value;if(!x)return null;let y=je[x].template.replace(/\n/g,"<br>"),z='style="margin-bottom: 12px; padding-left: 30px;"',K=[],ne="",de=i.getCheckedElements();de.length>0&&de.forEach(P=>{let I=P.value,k=ve[I],B=P.closest().querySelector(".stepper-count"),Z=B?parseInt(B.textContent):1;Z>1?K.push(`${k.name} (x${Z})`):K.push(k.name)});let ae=i.screenshotsElement;if(ae){let P=Array.from(ae.querySelectorAll('input[id^="name-"]'));P.length>0&&P.forEach(I=>{let k=I.value,B=I.closest(".cw-screen-card");if(B){let Z=B.querySelectorAll('input[id^="screen-"]'),W=!1,te="";Z.forEach(le=>{let At=le.closest(".cw-input-group"),wt=At?At.querySelector(".cw-input-label"):null,Xt=wt?wt.textContent:"Evid\xEAncia",Et=le.value.trim(),Kt=Et?` ${Et}`:"";te+=`<li>${Xt} -${Kt}</li>`,W=!0}),W&&(ne+=`<b>${k}</b>`,ne+=`<ul ${z}>${te}</ul>`)}})}if(y.includes("{TAGS_IMPLEMENTED}")?y=y.replace(/{TAGS_IMPLEMENTED}/g,K.join(", ")||"N/A"):K.length>0&&(y+=`<br><b>Tags:</b> ${K.join(", ")}<br>`),y.includes("{SCREENSHOTS_LIST}")?y=y.replace(/{SCREENSHOTS_LIST}/g,ne?`${ne}`:"N/A"):ne!==""&&(y+=`<br>${ne}`),n==="pt"&&o){let P=Ee.checked?D("sim"):D("nao");y=y.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${D("consentiu_gravacao")}</b> ${P}<br><br>`),y=y.replace(/{CASO_PORTUGAL}/g,`<br><b>${D("caso_portugal")}</b> ${D("sim")}<br>`)}else n==="pt"&&!o?(y=y.replace(/{CASO_PORTUGAL}/g,`<br><b>${D("caso_portugal")}</b> ${D("nao")}<br>`),y=y.replace(/{CONSENTIU_GRAVACAO}/g,"")):(y=y.replace(/{CASO_PORTUGAL}/g,""),y=y.replace(/{CONSENTIU_GRAVACAO}/g,""));return xe.querySelectorAll("input, textarea").forEach(P=>{let I=P.id.replace("field-",""),k=new RegExp(`{${I}}`,"g"),B=P.value;if(I==="REASON_COMMENTS"&&(x.startsWith("NI_")||x.startsWith("IN_"))){let te=pe.querySelector('input[type="radio"]:checked');te&&Ne[te.id]&&(B=Ne[te.id]["field-REASON_COMMENTS"])}if(Pe.includes(I)&&B.trim()!==""){let te=B.split(`
`).map(le=>le.trim()).filter(le=>le!==""&&le!=="\u2022").map(le=>le.startsWith("\u2022 ")?le.substring(2):le).map(le=>`<li>${le}</li>`).join("");B=te?`<ul ${z}>${te}</ul>`:""}else ft.includes(I)?B=B.split(`
`).filter(te=>te.trim()!=="").map(te=>`<p style="margin: 0 0 8px 0;">${te}</p>`).join(""):P.tagName==="TEXTAREA"&&(B=B.replace(/\n/g,"<br>"));let Z=B.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(Z===""||Z==="\u2022"||Z.toLowerCase()==="n/a"){let te=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${I}\\}(?:<br>\\s*)?`,"gi");te.test(y)?y=y.replace(te,""):y=y.replace(k,"")}else y=y.replace(k,B.replace(/\$/g,"$$$$"))}),y=y.replace(/{([A-Z0-9_]+)}/g,""),y=y.replace(/(<br>){3,}/g,"<br><br>"),typeof a<"u"&&a.getOutput&&(y+=a.getOutput()),y}Ge.onclick=()=>{let x=Ct();x?(yt(x),Q(D("copiado_sucesso"))):Q(D("selecione_substatus"),{error:!0})},Fe.onclick=async()=>{let x=O.value,j=Ct();if(!j){Q(D("selecione_substatus"),{error:!0});return}yt(j),lt();let y=Ze(),z=await Bt();if(z)try{if(z.focus(),z.innerHTML.trim()==="<p><br></p>"||z.innerHTML.trim()==="<br>"||z.innerText.trim()===""){let ae=document.createRange();ae.selectNodeContents(z);let V=window.getSelection();V.removeAllRanges(),V.addRange(ae),document.execCommand("delete",!1,null)}else if(!z.innerHTML.endsWith("<br><br>")){let ae=document.createRange();ae.selectNodeContents(z),ae.collapse(!1);let V=window.getSelection();V.removeAllRanges(),V.addRange(ae),document.execCommand("insertHTML",!1,"<br><br>")}document.execCommand("insertHTML",!1,j),Pt(z),setTimeout(()=>{Q(D("inserido_copiado"))},600);let ne=typeof Ie<"u"&&Ie?Ie.checked:!0;if(x&&Xe[x]&&ne){let ae=Xe[x];await Mt(ae),await new Promise(V=>setTimeout(V,500))}y(),rt(1.5),C.value="",O.innerHTML=`<option value="">${D("select_substatus")}</option>`,O.disabled=!0}catch(K){console.error(K),Q("Erro ao inserir.",{error:!0}),y()}};function rt(x=1.5){x<=1.5&&(Te.style.display="none",pe.innerHTML=""),x<=2&&(ue.style.display="none",i.reset(),re.style.display="none"),x<=3&&(be.style.display="none",xe.innerHTML="",a.reset(),Me.style.display="none",ke.style.display="none")}function lt(){if(r=!r,r){let x=c.querySelector(".cw-expand-btn");x&&typeof x.resetState=="function"&&x.resetState()}Ae(r,c,"cw-btn-notes")}return nt("bau"),at("pt"),lt}var Re={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function $t(){let e="v4.0.0",t=Object.keys(Re)[0],n="",o="list",r={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:"#FAFAFA"},s={display:"flex",width:"200%",height:"100%",transition:"transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",transform:"translateX(0)"},a={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},i={width:"100%",padding:"10px 12px 10px 36px",borderRadius:"8px",border:"none",background:"#F0F2F5",fontSize:"14px",color:"#202124",boxSizing:"border-box",outline:"none",transition:"all 0.2s ease",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"10px center"},c={display:"flex",gap:"6px",padding:"4px 4px 8px 4px",overflowX:"auto",scrollbarWidth:"none"},f={padding:"6px 12px",borderRadius:"16px",border:"1px solid transparent",background:"transparent",color:"#5f6368",fontSize:"12px",fontWeight:"500",cursor:"pointer",transition:"all 0.2s ease",flexShrink:"0"},u={background:"#E8F0FE",color:"#1967D2",fontWeight:"600"},l={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",marginBottom:"6px",borderRadius:"8px",background:"#fff",border:"1px solid #dadce0",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",position:"relative",overflow:"hidden"},E=!1,g=document.createElement("div");g.id="quick-email-popup",Object.assign(g.style,ye,{right:"100px",width:"480px",height:"600px",boxShadow:"none",opacity:"0",pointerEvents:"none"});let v={popup:g,googleLine:null,focusElement:null};function h(){E=!E,Ae(E,g,"cw-btn-email"),E||setTimeout(()=>$(),300)}let A=Ce(g,"Emails R\xE1pidos",e,"Selecione, visualize e insira com um clique.",v,()=>h()),T=document.createElement("div");Object.assign(T.style,r);let q=document.createElement("div");Object.assign(q.style,s);let M=document.createElement("div");Object.assign(M.style,a);let m=document.createElement("div");Object.assign(m.style,{padding:"16px 16px 4px 16px",flexShrink:"0",background:"#fff",zIndex:"10",display:"flex",flexDirection:"column",gap:"8px",borderBottom:"1px solid #f1f3f4"});let d=document.createElement("input");d.placeholder="Buscar template...",Object.assign(d.style,i),d.onfocus=()=>{d.style.background="#fff",d.style.boxShadow="0 2px 8px rgba(0,0,0,0.05)"},d.onblur=()=>{d.style.background="#F0F2F5",d.style.boxShadow="none"},v.focusElement=d;let b=document.createElement("div");Object.assign(b.style,c);let p=document.createElement("div");Object.assign(p.style,{padding:"12px 16px",overflowY:"auto",flexGrow:"1"}),m.appendChild(d),m.appendChild(b),M.appendChild(m),M.appendChild(p);let S=document.createElement("div");Object.assign(S.style,a);let C=document.createElement("div");Object.assign(C.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),S.appendChild(C),q.appendChild(M),q.appendChild(S),T.appendChild(q),g.appendChild(A),g.appendChild(T);let w=document.createElement("div");Object.assign(w.style,{padding:"8px 16px",borderTop:"1px solid #eee",textAlign:"center",fontSize:"10px",color:"#9aa0a6",background:"#fff",flexShrink:"0"}),w.textContent="created by lucaste@",g.appendChild(w),document.body.appendChild(g);function F(H){o="detail",q.style.transform="translateX(-50%)";let U='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',R='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';C.innerHTML=`
        <div style="
            position: sticky; top: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px);
            border-bottom: 1px solid #f1f3f4; padding: 12px 20px; z-index: 10;
            display: flex; align-items: center; gap: 8px;
        ">
            <button id="csa-back-btn" style="
                background:none; border:none; cursor:pointer; display:flex; align-items:center; justify-content: center;
                color:#5f6368; width: 32px; height: 32px; margin-left:-8px; border-radius:50%; transition:background 0.2s;
            ">
                ${U}
            </button>
            <div style="font-size:15px; font-weight:600; color:#202124; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${H.name}
            </div>
        </div>

        <div style="padding: 20px 20px 0 20px;">
            <div style="margin-bottom: 16px;">
                <div style="font-size:11px; font-weight:700; color:#1a73e8; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px;">Assunto</div>
                <div style="font-size:13px; font-weight:500; color:#202124; padding: 10px; background: #F8F9FA; border-radius: 8px; border: 1px solid #eee;">
                    ${H.subject}
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
                ">${H.body}</div>
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
                ${R} Inserir Template
            </button>
        </div>
      `;let L=C.querySelector("#csa-back-btn");L.onmouseover=()=>L.style.backgroundColor="#f1f3f4",L.onmouseout=()=>L.style.backgroundColor="transparent",L.onclick=$;let N=C.querySelector("#csa-insert-btn");N.onmouseover=()=>N.style.backgroundColor="#174ea6",N.onmouseout=()=>N.style.backgroundColor="#1a73e8",N.onclick=async()=>{N.style.transform="scale(0.96)",h();let ie=Ze();try{await ht(H),ie()}catch(J){console.error(J),ie()}setTimeout(()=>{N.style.transform="scale(1)",$()},300)}}function $(){o="list",q.style.transform="translateX(0)"}function O(){b.innerHTML="",Object.keys(Re).forEach(H=>{let U=Re[H],R=document.createElement("button");R.textContent=U.title,Object.assign(R.style,f),t===H&&n===""&&Object.assign(R.style,u),R.onclick=()=>{t=H,n="",d.value="",O(),X()},b.appendChild(R)})}function X(){p.innerHTML="";let H=[];if(n.trim()!==""?Object.values(Re).forEach(L=>{let N=L.emails.filter(ie=>ie.name.toLowerCase().includes(n.toLowerCase()));H=[...H,...N]}):Re[t]&&(H=Re[t].emails),H.length===0){p.innerHTML='<div style="text-align:center; padding:60px 20px; color:#9aa0a6;"><div style="font-size:24px; margin-bottom:8px;">\u{1F50D}</div><div style="font-size:14px;">Nenhum template encontrado.</div></div>';return}let U='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>',R='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';H.forEach(L=>{let N=document.createElement("div");Object.assign(N.style,l);let ie=L.subject.length>50?L.subject.substring(0,50)+"...":L.subject;N.innerHTML=`
        <div style="flex-grow: 1; margin-right: 12px; min-width: 0;">
            <div style="font-size:13px; font-weight:600; color:#202124; margin-bottom:2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${L.name}</div>
            <div style="font-size:12px; color:#5f6368; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${ie}</div>
        </div>
        <div style="display:flex; gap:6px;">
            <button class="action-btn view" title="Visualizar" style="width:32px; height:32px; border-radius:50%; border:none; background:#f1f3f4; color:#5f6368; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">${R}</button>
            <button class="action-btn send" title="Inserir Agora" style="width:32px; height:32px; border-radius:50%; border:none; background:#e8f0fe; color:#1a73e8; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">${U}</button>
        </div>
      `,N.onmouseenter=()=>{N.style.background="#F8F9FA",N.style.borderColor="#1a73e8"},N.onmouseleave=()=>{N.style.background="#fff",N.style.borderColor="#dadce0"};let J=N.querySelector(".view");J.onclick=ce=>{ce.stopPropagation(),F(L)},J.onmouseenter=()=>{J.style.background="#d2e3fc",J.style.color="#174ea6"},J.onmouseleave=()=>{J.style.background="#f1f3f4",J.style.color="#5f6368"};let Y=N.querySelector(".send");Y.onclick=ce=>{ce.stopPropagation(),Y.style.transform="scale(0.9)",setTimeout(()=>Y.style.transform="scale(1)",150),ht(L),h()},Y.onmouseenter=()=>{Y.style.background="#1a73e8",Y.style.color="#fff",Y.style.boxShadow="0 2px 6px rgba(26,115,232,0.3)"},Y.onmouseleave=()=>{Y.style.background="#e8f0fe",Y.style.color="#1a73e8",Y.style.boxShadow="none"},N.onclick=()=>F(L),p.appendChild(N)})}return d.addEventListener("input",H=>{n=H.target.value,n!==""?Array.from(b.children).forEach(U=>Object.assign(U.style,f)):O(),X()}),O(),X(),h}var so=[{title:"\u{1F44B} Abertura & Conex\xE3o",steps:["Ol\xE1, bom dia/boa tarde! Gostaria de falar com <b>{CLIENT_NAME}</b>?","Aqui \xE9 o <b>{AGENT_NAME}</b>, sou especialista de implementa\xE7\xE3o do Google.","O motivo do meu contato \xE9 para apoiar na implementa\xE7\xE3o das tags no site <b>{URL}</b>.","Voc\xEA teria 10-15 minutos para realizarmos esse procedimento agora?"]},{title:"\u{1F50D} Investiga\xE7\xE3o (Sondagem)",steps:["Para come\xE7armos, voc\xEA tem acesso administrativo ao <b>Google Ads</b>?","E ao painel do site (WordPress/Shopify/Wix)?","Atualmente, qual \xE9 a maior dificuldade que est\xE1 encontrando na instala\xE7\xE3o?","Podemos compartilhar a tela para eu te guiar melhor?"]},{title:"\u{1F6E0}\uFE0F A\xE7\xE3o T\xE9cnica",steps:["Vou te enviar um convite de acesso para o Google Tag Manager.","Poderia aceitar o convite no seu e-mail, por favor?","Agora, vamos instalar o c\xF3digo base no <head> do site.","\xD3timo! Agora vamos criar a Tag de Convers\xE3o e o Vinculador."]},{title:"\u2705 Valida\xE7\xE3o & Fechamento",steps:["Vamos usar o Tag Assistant para validar o disparo.","Tudo funcionando! Voc\xEA tem mais alguma d\xFAvida t\xE9cnica?","Vou te enviar um e-mail com o resumo do que fizemos hoje.","Obrigado pelo seu tempo e tenha um excelente dia!"]}];function Ut(){let e="v2.0",t=!1,n={progressBarContainer:{height:"4px",background:"#f1f3f4",width:"100%",position:"relative",overflow:"hidden"},progressBarFill:{height:"100%",background:"linear-gradient(90deg, #4285F4, #34A853)",width:"0%",transition:"width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)",borderRadius:"0 2px 2px 0"},card:{background:"#ffffff",border:"1px solid #e0e0e0",borderRadius:"12px",padding:"16px",marginBottom:"12px",transition:"all 0.3s ease",cursor:"pointer",position:"relative",opacity:"0.7",transform:"scale(0.98)"},cardActive:{borderColor:"#1a73e8",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.15)",opacity:"1",transform:"scale(1)",backgroundColor:"#fff"},cardTitle:{fontSize:"14px",fontWeight:"600",color:"#202124",marginBottom:"12px",display:"flex",alignItems:"center",gap:"8px"},stepRow:{display:"flex",alignItems:"flex-start",gap:"10px",marginBottom:"8px",fontSize:"14px",lineHeight:"1.5",color:"#3c4043"},checkbox:{marginTop:"3px",cursor:"pointer",accentColor:"#1a73e8",width:"16px",height:"16px"}},o=document.createElement("div");o.id="call-script-popup",Object.assign(o.style,ye,{right:"auto",left:"50%",width:"420px",height:"600px",opacity:"0",pointerEvents:"none"});let s=Ce(o,"Call Script",e,"Guia interativo para condu\xE7\xE3o de chamadas.",{popup:o,googleLine:null},()=>q());o.appendChild(s);let a=document.createElement("div");Object.assign(a.style,n.progressBarContainer);let i=document.createElement("div");Object.assign(i.style,n.progressBarFill),a.appendChild(i),o.appendChild(a);let c=document.createElement("div");Object.assign(c.style,{padding:"16px",overflowY:"auto",flexGrow:"1",scrollBehavior:"smooth"}),o.appendChild(c);let f=document.createElement("div");Object.assign(f.style,{padding:"10px 16px",borderTop:"1px solid #eee",display:"flex",justifyContent:"flex-end",background:"#f8f9fa"});let u=document.createElement("button");u.textContent="Resetar Script",u.style.cssText="background:none; border:none; color:#5f6368; font-size:12px; cursor:pointer; font-weight:500;",u.onclick=T,f.appendChild(u),o.appendChild(f);let l=document.createElement("div");Object.assign(l.style,We),l.className="no-drag",l.title="Redimensionar",o.appendChild(l),Ye(o,l),document.body.appendChild(o);let E=0,g=0;function v(){c.innerHTML="",E=0,g=0,so.forEach((M,m)=>{let d=document.createElement("div");Object.assign(d.style,n.card);let b=document.createElement("div");Object.assign(b.style,n.cardTitle),b.textContent=M.title,d.appendChild(b);let p=document.createElement("div");M.steps.forEach((S,C)=>{E++;let w=document.createElement("div");Object.assign(w.style,n.stepRow);let F=document.createElement("input");F.type="checkbox",F.id=`step-${m}-${C}`,Object.assign(F.style,n.checkbox);let $=document.createElement("label");$.htmlFor=`step-${m}-${C}`,$.innerHTML=S,$.style.cursor="pointer",F.onchange=O=>{O.target.checked?(g++,w.style.opacity="0.5",w.style.textDecoration="line-through"):(g--,w.style.opacity="1",w.style.textDecoration="none"),A(),h(d)},w.appendChild(F),w.appendChild($),p.appendChild(w)}),d.appendChild(p),d.onclick=S=>{S.target.type!=="checkbox"&&h(d)},c.appendChild(d)}),c.firstChild&&h(c.firstChild)}function h(M){Array.from(c.children).forEach(m=>{Object.assign(m.style,n.card)}),Object.assign(M.style,n.cardActive)}function A(){let M=E===0?0:g/E*100;i.style.width=`${M}%`,M===100?i.style.background="#34A853":i.style.background="linear-gradient(90deg, #4285F4, #34A853)"}function T(){c.querySelectorAll('input[type="checkbox"]').forEach(m=>{m.checked=!1,m.dispatchEvent(new Event("change"))}),c.firstChild&&h(c.firstChild),showToast("Script reiniciado")}function q(){t=!t,Ae(t,o,"cw-btn-script")}return v(),q}var et={lm:{label:"LM Forms",links:[{name:"Relat\xF3rio de Ocorr\xEAncias",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas operacionais | Aviso de pausas"},{name:"Chamadas Excedidas (>50min)",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro de chamadas longas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema/ferramenta"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"Enviar casos para BAU/Solicitar Descarte/Abrir Monitoria para AMs"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo dos Anunciantes"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos complicados de atender"}]},suporte:{label:"Central de Ajuda",links:[{name:"Suporte Google Ads",url:"https://support.google.com/google-ads/",desc:"Oficial"},{name:"Suporte GA4",url:"https://support.google.com/analytics/",desc:"Oficial"},{name:"Suporte Merchant Center",url:"https://support.google.com/merchants/gethelp",desc:"Oficial"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. oficial sobre CSP"},{name:"Doc. Enhanced Conversion",url:"https://support.google.com/google-ads/answer/9888656?hl=en",desc:"Como funcionam as convers\xF5es otimizadas?"},{name:"Doc. CoMo",url:"https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=pt-br",desc:"Doc. oficial sobre Consent Mode"}]},outros:{label:"Diversos",links:[{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form para solicitar grava\xE7\xE3o da chamada."}]}};function Wt(){let e="v2.4.5",t="lm",n="",o={width:"100%",padding:"10px 12px 10px 36px",borderRadius:"8px",border:"1px solid #dadce0",background:"#f8f9fa",fontSize:"14px",boxSizing:"border-box",outline:"none",color:"#3c4043",transition:"background 0.2s, border-color 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"10px center"},r={display:"flex",flexWrap:"wrap",gap:"8px",paddingBottom:"8px"},s={padding:"6px 16px",borderRadius:"16px",border:"1px solid #dadce0",background:"transparent",color:"#5f6368",fontSize:"13px",fontWeight:"500",cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s ease",marginBottom:"4px"},a={background:"#e8f0fe",color:"#1967d2",borderColor:"#e8f0fe",fontWeight:"600"},i={display:"flex",alignItems:"center",padding:"10px 14px",borderRadius:"12px",cursor:"pointer",border:"1px solid transparent",marginBottom:"6px",background:"#ffffff",transition:"transform 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), background 0.2s",boxShadow:"0 1px 2px rgba(0,0,0,0.02)",opacity:"0",transform:"translateY(10px)"},c={width:"36px",height:"36px",borderRadius:"10px",background:"#f1f3f4",color:"#5f6368",display:"flex",alignItems:"center",justifyContent:"center",marginRight:"14px",fontSize:"18px",flexShrink:"0"},f=document.createElement("div");f.id="feedback-popup",Object.assign(f.style,ye,{right:"100px",width:"400px",boxShadow:"none",opacity:"0",pointerEvents:"none"});let u={lm:"\u{1F4DD}",qa:"\u{1F6E1}\uFE0F",suporte:"\u{1F4DA}",outros:"\u26A1"},l={popup:f,googleLine:null,focusElement:null},E=!1,g=Ce(f,"Links \xDAteis",e,"Acesso r\xE1pido a formul\xE1rios internos (Ocorr\xEAncias, Bugs) e documenta\xE7\xF5es oficiais de suporte.",l,()=>d());f.appendChild(g);let v=document.createElement("div");Object.assign(v.style,{padding:"16px",display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid #f1f3f4",flexShrink:"0",backgroundColor:"#fff"});let h=document.createElement("input");h.type="text",h.placeholder="Buscar link, form ou ajuda...",Object.assign(h.style,o),l.focusElement=h,h.onfocus=()=>{h.style.borderColor="#1a73e8",h.style.backgroundColor="#fff"},h.onblur=()=>{h.style.borderColor="#dadce0",h.style.backgroundColor="#f8f9fa"};let A=document.createElement("div");Object.assign(A.style,r),v.appendChild(h),v.appendChild(A),f.appendChild(v);let T=document.createElement("div");Object.assign(T.style,{padding:"0 8px 8px 8px",overflowY:"auto",flexGrow:"1"}),f.appendChild(T);let q=document.createElement("div");Object.assign(q.style,{padding:"8px 16px",borderTop:"1px solid #eee",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"10px",color:"#9aa0a6"}),q.innerHTML="<span>by lucaste@</span>",f.appendChild(q),document.body.appendChild(f);function M(){A.innerHTML="",Object.keys(et).forEach(b=>{let p=et[b],S=document.createElement("button"),C=u[b]||"";S.innerHTML=`<span style="font-size:14px">${C}</span> ${p.label}`,Object.assign(S.style,s),t===b&&n===""&&Object.assign(S.style,a),S.onmousedown=()=>S.style.transform="scale(0.95)",S.onmouseup=()=>S.style.transform="scale(1)",S.onmouseleave=()=>S.style.transform="scale(1)",S.onclick=()=>{t=b,n="",h.value="",M(),m()},A.appendChild(S)})}function m(){T.innerHTML="";let b=[],p=n.trim()!=="";if(p?Object.entries(et).forEach(([S,C])=>{let w=C.links.filter(F=>F.name.toLowerCase().includes(n.toLowerCase())||F.desc.toLowerCase().includes(n.toLowerCase()));w.forEach(F=>{F._catIcon=u[S],F._categoryName=C.label}),b=[...b,...w]}):(b=et[t].links,b.forEach(S=>S._catIcon=u[t])),b.length===0){T.innerHTML=`
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px; opacity:0.6;">
            <div style="font-size:32px; margin-bottom:10px;">\u{1F50D}</div>
            <div style="font-size:13px; color:#5f6368;">Nenhum link encontrado.</div>
        </div>`;return}b.forEach((S,C)=>{let w=document.createElement("div");Object.assign(w.style,i);let F=document.createElement("div");Object.assign(F.style,c),F.textContent=S._catIcon||"\u{1F517}",w.appendChild(F);let $=document.createElement("div");$.style.flexGrow="1";let O=N=>{if(!p)return N;let ie=new RegExp(`(${n})`,"gi");return N.replace(ie,'<span style="color:#1a73e8; font-weight:700;">$1</span>')},X=`<div style="font-size:14px; font-weight:500; color:#202124;">${O(S.name)}</div>`,H=`<div style="font-size:11px; color:#5f6368; margin-top:2px;">${O(S.desc)}</div>`;$.innerHTML=X+H,w.appendChild($);let U=document.createElement("div");U.style.display="flex",U.style.gap="4px",U.style.opacity="0",U.style.transition="opacity 0.2s";let R=document.createElement("div");R.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',Object.assign(R.style,{width:"32px",height:"32px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#5f6368",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)"}),R.onclick=N=>{N.stopPropagation(),navigator.clipboard.writeText(S.url),R.style.transform="scale(1.2)",R.style.color="#1e8e3e",R.style.backgroundColor="#e6f4ea",setTimeout(()=>{R.style.transform="scale(1)",R.style.color="#5f6368",R.style.backgroundColor="transparent"},800)},R.onmouseenter=()=>R.style.backgroundColor="#f1f3f4",R.onmouseleave=()=>R.style.backgroundColor="transparent",U.appendChild(R);let L=document.createElement("div");L.innerHTML="\u2197",Object.assign(L.style,{width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",color:"#dadce0",fontSize:"16px"}),U.appendChild(L),w.appendChild(U),w.onclick=()=>window.open(S.url,"_blank"),w.onmouseenter=()=>{w.style.backgroundColor="#f8f9fa",w.style.transform="scale(1.01)",U.style.opacity="1",L.style.color="#1a73e8"},w.onmouseleave=()=>{w.style.backgroundColor="#ffffff",w.style.transform="scale(1)",U.style.opacity="0",L.style.color="#dadce0"},T.appendChild(w),requestAnimationFrame(()=>{w.style.transition="opacity 0.3s ease, transform 0.3s cubic-bezier(0.2, 0.9, 0.3, 1.2)",setTimeout(()=>{w.style.opacity="1",w.style.transform="translateY(0)"},C*40)})})}h.addEventListener("input",b=>{n=b.target.value,n!==""?Array.from(A.children).forEach(p=>{p.style.backgroundColor="transparent",p.style.color="#5f6368",p.style.borderColor="#dadce0"}):M(),m()});function d(){E=!E,Ae(E,f,"cw-btn-links")}return M(),m(),d}function ro(){if(window.techSolInitialized){gt();return}window.techSolInitialized=!0,console.log("\u{1F680} TechSol Suite Initializing...");try{Nt(),gt();let e=Ht(),t=$t(),n=Ut(),o=Wt();Ft({toggleNotes:e,toggleEmail:t,toggleScript:n,toggleLinks:o})}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),Q("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}ro();})();
