(()=>{var Ye="",Xt=e=>new Promise(t=>setTimeout(t,e));async function wt(){if(Ye)return Ye;try{let e=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!e)return"Agente";e.click(),await Xt(100);let t="Consultor",n=document.querySelector("profile-details .name");if(n)t=n.textContent.trim().split(" ")[0],t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();else{let o=document.querySelector("profile-details img");if(o&&o.src.includes("/photos/")){let l=o.src.match(/\/photos\/([^\?]+)/)[1];t=l.charAt(0).toUpperCase()+l.slice(1)}}return e.click(),document.body.click(),Ye=t,t}catch(e){return console.warn("Sherlock falhou:",e),"Consultor"}}function pt(){return Ye||"Consultor"}function Tt(e){let t=new Date,n=t.getHours(),o=t.getDay(),l="Ol\xE1",a="";n>=5&&n<12?(l="Bom dia",a='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):n>=12&&n<18?(l="Boa tarde",a='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(l="Boa noite",a='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let i=[];n>=0&&n<5?i=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:n<12?o===1?i=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:o===5?i=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:i=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:n<18?i=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:i=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(o===0||o===6)&&(i=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let s=i[Math.floor(Math.random()*i.length)];return{prefix:`${l},`,name:e,suffix:s,icon:a,isFriday:o===5}}function ut(){let e="Cliente",t="[INSERIR URL]";try{let o=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(o&&o.nextElementSibling){let l=o.nextElementSibling.innerText.trim();l&&(e=l)}}catch(n){console.warn("Falha ao capturar Nome:",n)}try{let o=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(o&&o.nextElementSibling){let l=o.nextElementSibling.innerText.trim();l&&(t=l)}}catch(n){console.warn("Falha ao capturar Website:",n)}return{advertiserName:e,websiteUrl:t,agentName:pt()}}var Ot=1e4;function It(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Google+Sans:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
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
    `,document.head.appendChild(t)}function Z(e,t={}){let n=document.createElement("div"),o=t.error?"rgba(217, 48, 37, 0.90)":"rgba(32, 33, 36, 0.85)";Object.assign(n.style,{position:"fixed",bottom:"32px",left:"50%",transform:"translateX(-50%) scale(0.9)",background:o,backdropFilter:"blur(12px)",color:"#fff",padding:"12px 24px",borderRadius:"50px",boxShadow:"0 8px 24px rgba(0,0,0,0.15)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",fontWeight:"500",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",pointerEvents:"none"}),n.textContent=e,document.body.appendChild(n),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateX(-50%) scale(1)"}),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateX(-50%) scale(0.9) translateY(10px)",setTimeout(()=>n.remove(),400)},t.duration||4e3)}function Nt(e,t=null){let n=0,o=0,l=0,a=0,i=t||e;i.style.cursor="grab",i.onmousedown=s;function s(x){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(x.target.tagName)||x.target.classList.contains("no-drag"))return;x=x||window.event,i.style.cursor="grabbing";let b=e.getBoundingClientRect();e.style.left=b.left+"px",e.style.top=b.top+"px",e.style.right="auto",e.style.bottom="auto",e.style.width||(e.style.width=b.width+"px"),Ot++,e.style.zIndex=Ot,l=x.clientX,a=x.clientY,e.setAttribute("data-dragging","false"),document.onmouseup=S,document.onmousemove=p}function p(x){x=x||window.event,x.preventDefault(),n=l-x.clientX,o=a-x.clientY,l=x.clientX,a=x.clientY,e.setAttribute("data-dragging","true"),e.style.top=e.offsetTop-o+"px",e.style.left=e.offsetLeft-n+"px"}function S(){document.onmouseup=null,document.onmousemove=null,i.style.cursor="grab",setTimeout(()=>{e.setAttribute("data-dragging","false")},100)}}var ve={position:"fixed",top:"50%",left:"50%",width:"400px",maxHeight:"85vh",zIndex:"99999",overflow:"hidden",display:"flex",flexDirection:"column",backgroundColor:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(20px) saturate(180%)",borderRadius:"20px",boxShadow:"0 20px 50px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)",opacity:"0",transform:"translate(-50%, -50%) scale(0.95)",pointerEvents:"none",fontFamily:"'Google Sans', 'Roboto'",transition:"opacity 0.3s ease, transform 0.3s cubic-bezier(0.19, 1, 0.22, 1)"};var ze={display:"block",fontSize:"13px",fontWeight:"600",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Pe={width:"100%",padding:"12px 16px",borderRadius:"12px",border:"1px solid #dadce0",backgroundColor:"#f8f9fa",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%235f6368%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"16px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'",cursor:"pointer"};var Xe={fontSize:"11px",color:"#9aa0a6",textAlign:"center",padding:"12px 16px",borderTop:"1px solid rgba(0,0,0,0.05)",marginTop:"16px"};var re={padding:"8px 12px",cursor:"pointer",fontSize:"13px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1)",width:"100%",textAlign:"center",borderRadius:"8px"};var mt=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],kt=-1;function je(){let e=Math.floor(Math.random()*mt.length);return e===kt&&(e=(e+1)%mt.length),kt=e,mt[e]}var he=e=>new Promise(t=>setTimeout(t,e));async function Kt(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let n=e.querySelector(".cursor");await he(200);for(let o=0;o<t.length;o++){let l=t.charAt(o),a=document.createElement("span");a.textContent=l,n&&n.parentNode===e?n.before(a):e.appendChild(a);let i=Math.floor(Math.random()*60)+30;o===0&&(i=150),o>t.length-3&&(i=30),await he(i)}await he(600),n&&(n.style.display="none")}async function bt(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
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
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await he(200);let t=await wt(),n=Tt(t),o=e.querySelector("#w-icon"),l=e.querySelector("#p1"),a=e.querySelector("#p2"),i=e.querySelector("#p3"),s=e.querySelector("#p-sextou");o&&(o.innerHTML=n.icon),l&&(l.textContent=n.prefix),i&&(i.textContent=n.suffix),await he(300);let p=o?o.querySelector("svg"):null;if(p&&(p.style.opacity="1",p.style.transform="scale(1)"),await he(400),l&&(l.style.opacity="1"),a&&await Kt(a,n.name),i&&(i.style.opacity="1",i.style.transform="translateY(0)"),n.isFriday&&s){await he(400),s.style.display="block",s.offsetWidth;let S=s.querySelector(".sextou-badge");S&&(S.style.opacity="1",S.style.transform="scale(1)")}await he(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await he(900),e.parentNode&&e.parentNode.removeChild(e)}}var xe={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:"}},Se={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:[]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},Be={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"}},Ke={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl"},qe=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],gt=["CONSIDERACOES","COMENTARIOS"],Me={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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
\u2022 Tentativa 3 - `,"field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-2-6-final":{type:"all","field-REASON_COMMENTS":"Finaliza\xE7\xE3o (2/6)","field-SPEAKEASY_ID":"-","field-ON_CALL":"-","field-COMENTARIOS":"\u2022 Dia 9 finaliza\xE7\xE3o do 2/6, durante o per\xEDodo do acompanhamento n\xE3o houve retorno do anunciante, ent\xE3o o caso ser\xE1 encerrado.","field-SCREENSHOTS":"\u2022 N/A","field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-manual":{type:"all","field-REASON_COMMENTS":"Outro (Manual)","field-GTM_GA4_VERIFICADO":"N/A"}};var se=e=>new Promise(t=>setTimeout(t,e));function Ce(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>e.dispatchEvent(new MouseEvent(n,t)))}function Qe(){return Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(t=>{let n=t.offsetParent!==null,o=t.closest("case-message-view")!==null,l=t.closest(".editor")!==null||t.closest("write-card")!==null;return n&&!o&&l})}async function _t(){let e=!1,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(s=>s.innerText.trim()==="email");if(n&&n.offsetParent!==null){let s=n.closest("material-button")||n.closest("material-fab")||n;s.style&&(s.style.display="block",s.style.visibility="visible"),Ce(s),e=!0}else{let s=document.querySelector("material-fab-speed-dial");if(s){let p=s.querySelector(".trigger");if(p){p.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),Ce(p),await se(1e3);let x=Array.from(document.querySelectorAll("i.material-icons-extended")).find(b=>b.innerText.trim()==="email");x&&(Ce(x),e=!0)}else s.click()}}let o=0,l=Qe();for(console.log("\u23F3 Aguardando editor EDIT\xC1VEL...");!l&&o<30;)await se(500),l=Qe(),o++;if(!l)return Z("Erro: Editor de email n\xE3o apareceu.",{error:!0}),!1;let i=Array.from(document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]')).find(s=>s.offsetParent!==null);if(i){console.log("\u26A0\uFE0F Rascunho detectado. Clicando em Discard..."),Ce(i);let s=null,p=0;for(;!s&&p<10;)await se(200),s=Array.from(document.querySelectorAll('material-button[debug-id="confirm-button"]')).find(x=>x.offsetParent!==null),p++;s?(console.log("\u2705 Confirmando descarte..."),Ce(s),await se(2500)):console.warn("\u26A0\uFE0F Cliquei em Discard, mas o bot\xE3o Confirm n\xE3o apareceu.")}if(l){let s=l.closest('[id="email-body-content-top"]'),S=(l.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(s){if(S){let b=S.closest('[aria-hidden="true"]');b&&b.removeAttribute("aria-hidden"),S.focus()}await se(300),s.innerHTML=`
                <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                    <span id="cases-body-field"><br></span>
                </div>
            `;let x=s.querySelector("#cases-body-field");if(x){let b=document.createRange();b.selectNodeContents(x),b.collapse(!0);let C=window.getSelection();C.removeAllRanges(),C.addRange(b)}return!0}}return Z("Erro cr\xEDtico ao acessar editor.",{error:!0}),!1}async function Lt(e){if(!e)return;Z("Preparando email...",{duration:3e3});let t=ut();if(!await _t())return;await se(500);let o=document.querySelector('material-button[debug-id="canned_response_button"]');if(o){o.scrollIntoView({behavior:"smooth",block:"center"}),await se(200),Ce(o),await se(1500);let l=document.querySelector("material-auto-suggest-input input");if(l){Ce(l),await se(200),document.execCommand("insertText",!1,e),l.dispatchEvent(new Event("input",{bubbles:!0}));let a=null,i=0;for(;i<20;){await se(500),i++;let s=Array.from(document.querySelectorAll("material-select-dropdown-item"));if(s.length>0&&(a=s.find(p=>p.innerText.toLowerCase().includes(e.toLowerCase())),!a&&s.length===1&&(a=s[0]),a))break}if(a){let s=function(b,C){if(b.nodeType===3&&b.nodeValue.includes(C))return b;if(!b.childNodes)return null;for(let g of b.childNodes){let h=s(g,C);if(h)return h}return null};Ce(a),await se(2e3);let p=Qe(),S=p?p.closest('[id="email-body-content-top"]'):document.body,x=s(S,"{%ADVERTISER_NAME%}");if(x){let b=document.createRange(),C=x.nodeValue.indexOf("{%ADVERTISER_NAME%}");b.setStart(x,C),b.setEnd(x,C+19);let g=window.getSelection();g.removeAllRanges(),g.addRange(b),document.execCommand("insertText",!1,t.advertiserName),Z("Email preenchido!")}else Z("Email inserido (Nome n\xE3o substitu\xEDdo).")}else Z(`Template '${e}' n\xE3o encontrado.`,{error:!0})}}else Z("Bot\xE3o Canned Response n\xE3o achado.",{error:!0})}async function ft(e){console.log(`\u{1F680} Iniciando automa\xE7\xE3o (Quick): ${e.name}`),Z("Preparando email...",{duration:3e3});let t=ut(),n=pt();if(!await _t())return;await se(600);let l=document.querySelector('input[aria-label="Subject"]');l&&e.subject&&(l.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(l,e.subject),l.dispatchEvent(new Event("input",{bubbles:!0})),await se(300));let a=Qe();if(a){let s=(a.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');s&&(s.focus(),s.click(),s.dispatchEvent(new Event("input",{bubbles:!0}))),await se(400);let p=new Date;p.setDate(p.getDate()+3);let S=p.getDay();S===6?p.setDate(p.getDate()+2):S===0&&p.setDate(p.getDate()+1);let x=p.toLocaleDateString("pt-BR"),b=e.body;b=b.replace(/\[Nome do Cliente\]/g,t.advertiserName||"Cliente"),b=b.replace(/\[INSERIR URL\]/g,t.websiteUrl||"seu site"),b=b.replace(/\[URL\]/g,t.websiteUrl||"seu site"),b=b.replace(/\[Seu Nome\]/g,n),b=b.replace(/\[MM\/DD\/YYYY\]/g,x),document.execCommand("insertHTML",!1,b),s&&(s.dispatchEvent(new Event("input",{bubbles:!0})),s.dispatchEvent(new Event("change",{bubbles:!0}))),Z("Email preenchido com sucesso!",{duration:2e3}),await se(800)}else Z("Erro ao focar no editor.",{error:!0})}var Qt={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},Rt={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function Ae(e,t,n,o,l,a){let i=document.createElement("div");Object.assign(i.style,Qt),Nt(e,i);let s=document.createElement("div");Object.assign(s.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),i.appendChild(s),l&&(l.googleLine=s);let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center",gap:"12px"});let S=document.createElement("img");S.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(S.style,{width:"20px",height:"20px",pointerEvents:"none"});let x=document.createElement("span");x.textContent=t,p.appendChild(S),p.appendChild(x);let b=document.createElement("div");Object.assign(b.style,{display:"flex",alignItems:"center",gap:"4px"});let C='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',g='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',h=document.createElement("div");h.innerHTML=C,Object.assign(h.style,Rt),h.title="Sobre",h.classList.add("no-drag"),h.onmouseenter=()=>{h.style.background="rgba(255,255,255,0.1)",h.style.color="#FFF"},h.onmouseleave=()=>{h.style.color!=="rgb(138, 180, 248)"&&(h.style.background="transparent",h.style.color="#9AA0A6")};let A=document.createElement("div");A.innerHTML=g,Object.assign(A.style,Rt),A.title="Fechar",A.classList.add("no-drag"),A.onmouseenter=()=>{A.style.background="rgba(242, 139, 130, 0.2)",A.style.color="#F28B82"},A.onmouseleave=()=>{A.style.background="transparent",A.style.color="#9AA0A6"},A.onmousedown=T=>T.stopPropagation(),h.onmousedown=T=>T.stopPropagation(),A.onclick=a;let E=Zt(e,t,n,o);return h.onclick=T=>{T.stopPropagation(),E.style.opacity==="1"?(E.style.opacity="0",E.style.pointerEvents="none",h.style.color="#9AA0A6",h.style.background="transparent"):(E.style.opacity="1",E.style.pointerEvents="auto",h.style.color="#8AB4F8",h.style.background="rgba(138, 180, 248, 0.1)")},b.appendChild(h),b.appendChild(A),i.appendChild(p),i.appendChild(b),i}function Zt(e,t,n,o){let l=document.createElement("div");return Object.assign(l.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(5px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),l.innerHTML=`
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
    `,setTimeout(()=>{let a=l.querySelector("#close-help-internal");a&&(a.onmouseover=()=>a.style.backgroundColor="#f8f9fa",a.onmouseout=()=>a.style.backgroundColor="white",a.onclick=()=>{l.style.opacity="0",l.style.pointerEvents="none"})},0),e.appendChild(l),l}if(!document.getElementById("cw-module-styles")){let e=document.createElement("style");e.id="cw-module-styles",e.innerHTML=`
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
    `,document.head.appendChild(e)}function Ee(e,t,n){let o=document.getElementById(n);t.classList.contains("cw-module-window")||t.classList.add("cw-module-window");let l=()=>{if(!o)return;let a=o.getBoundingClientRect(),i=a.left+a.width/2,s=a.top+a.height/2,p=t.offsetLeft,S=t.offsetTop,x=i-p,b=s-S;t.style.transformOrigin=`${x}px ${b}px`};e?(l(),t.style.opacity="",t.style.pointerEvents="",t.style.transform="",t.offsetWidth,t.classList.add("open"),t.classList.remove("idle"),o&&o.classList.add("active"),Jt(t,n)):(l(),t.classList.remove("open"),t.classList.remove("idle"),o&&o.classList.remove("active"),Mt(t))}function Jt(e,t){Mt(e);let n=o=>{if(!e.classList.contains("open"))return;let l=e.contains(o.target),a=document.querySelector(".cw-pill"),i=a&&a.contains(o.target);l?(e.classList.remove("idle"),e.style.zIndex="2147483648"):i||(e.classList.add("idle"),e.style.zIndex="2147483646")};e._idleHandler=n,document.addEventListener("mousedown",n)}function Mt(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}var oe={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",gripColor:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",gripActive:"linear-gradient(to left, #4285F4, #EA4335, #FBBC05, #34A853)",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995"},Ze=e=>new Promise(t=>setTimeout(t,e));function Dt(e){let t="cw-command-center-style";if(!document.getElementById(t)){let g=document.createElement("style");g.id=t,g.innerHTML=`
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
    `;let l=document.createElement("div");l.className="cw-focus-backdrop",document.body.appendChild(l),document.body.appendChild(o),o.querySelector(".notes").onclick=g=>{g.stopPropagation(),e.toggleNotes()},o.querySelector(".email").onclick=g=>{g.stopPropagation(),e.toggleEmail()},o.querySelector(".script").onclick=g=>{g.stopPropagation(),e.toggleScript()},o.querySelector(".links").onclick=g=>{g.stopPropagation(),e.toggleLinks()},(async function(){await Ze(2800),o.classList.add("docked"),await Ze(300);let h=o.querySelectorAll(".cw-btn");o.querySelectorAll(".cw-sep").forEach(E=>E.classList.add("visible"));for(let E=0;E<h.length;E++)h[E].classList.add("popped"),await Ze(90);await Ze(200),o.classList.add("system-check")})();let a=!1,i,s,p,S,x=3;o.onmousedown=g=>{if(g.target.closest("button"))return;g.preventDefault(),i=g.clientX,s=g.clientY;let h=o.getBoundingClientRect();p=h.left,S=h.top,document.addEventListener("mousemove",b),document.addEventListener("mouseup",C)};function b(g){let h=g.clientX-i,A=g.clientY-s;!a&&Math.sqrt(h*h+A*A)>x&&(a=!0,o.style.transition="none"),a&&(o.style.left=`${p+h}px`,o.style.top=`${S+A}px`,o.style.right="auto",o.style.bottom="auto",o.style.transform="none")}function C(g){if(document.removeEventListener("mousemove",b),document.removeEventListener("mouseup",C),a){a=!1,o.style.transition="left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s ease";let h=window.innerWidth,A=window.innerHeight,E=o.getBoundingClientRect(),T=E.left+E.width/2,F;T<h/2?(F=24,o.classList.remove("side-right"),o.classList.add("side-left")):(F=h-E.width-24,o.classList.remove("side-left"),o.classList.add("side-right"));let q=E.top;q<24&&(q=24),q>A-E.height-24&&(q=A-E.height-24),o.style.left=`${F}px`,o.style.top=`${q}px`,setTimeout(()=>{},600)}else{let h=g.target.closest("button");h&&(h.style.transform="scale(0.9)",setTimeout(()=>h.style.transform="",150))}}}function Je(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop"),n=document.getElementById("cw-loader"),o=document.getElementById("cw-success");if(!e||!n||!o)return()=>{};let l=Date.now();return e.classList.add("processing"),t&&t.classList.add("active"),n.style.display="flex",o.style.display="none",function(){let i=Date.now()-l,s=Math.max(0,1500-i);setTimeout(()=>{n.style.display="none",o.style.display="block",o.offsetWidth,e.classList.add("success"),setTimeout(()=>{e.classList.remove("processing","success"),t&&t.classList.remove("active")},2e3)},s)}}var Gt=e=>new Promise(t=>setTimeout(t,e));function et(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>e.dispatchEvent(new MouseEvent(n,t)))}function ht(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let n=document.createRange();n.selectNodeContents(t);let o=window.getSelection();o.removeAllRanges(),o.addRange(n);try{document.execCommand("copy")}catch{Z("Falha ao copiar",{error:!0})}o.removeAllRanges(),document.body.removeChild(t)}function zt(e){["input","change","keydown","keyup"].forEach(n=>{let o=new Event(n,{bubbles:!0,cancelable:!0});e.dispatchEvent(o)})}function Ft(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function Pt(){console.log("Iniciando processo de Nova Nota...");let e=Ft(),t=e.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(i=>i.innerText.trim()==="description");if(o){let i=o.closest("material-fab")||o.closest("material-button");i?(i.style&&(i.style.display="block",i.style.visibility="visible"),et(i)):et(o)}else{let i=document.querySelector("material-fab-speed-dial");if(i){let s=i.querySelector(".trigger");s?(s.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),et(s)):i.click(),await Gt(800);let S=Array.from(document.querySelectorAll("i.material-icons-extended")).find(x=>x.innerText.trim()==="description");S&&et(S)}}let l=null,a=0;for(;!l&&a<20;){await Gt(300);let i=Ft();if(i.length>t)l=i.find(s=>!e.includes(s)),l||(l=i[i.length-1]);else if(a>10){let s=i.filter(p=>p.offsetParent!==null);s.length>0&&(l=s[s.length-1])}a++}return l}var G={primary:"#1a73e8",primaryBg:"#e8f0fe",text:"#202124",textSub:"#5f6368",border:"#dadce0",bgInput:"#f8f9fa",surface:"#ffffff",success:"#1e8e3e",warning:"#e37400",error:"#d93025"},ge="cubic-bezier(0.25, 0.8, 0.25, 1)",eo={width:"100%",padding:"12px 14px",borderRadius:"8px",border:`1px solid ${G.border}`,backgroundColor:G.bgInput,fontSize:"14px",color:G.text,marginBottom:"16px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto', sans-serif",transition:`border-color 0.2s ${ge}, box-shadow 0.2s ${ge}, background-color 0.2s`,outline:"none"},So={...eo,minHeight:"100px",resize:"vertical",lineHeight:"1.5"},Co={fontSize:"13px",fontWeight:"700",color:G.textSub,textTransform:"uppercase",letterSpacing:"0.6px",margin:"0 0 12px 0"},Ao={display:"block",fontSize:"13px",fontWeight:"600",color:G.text,marginBottom:"8px",marginTop:"16px"},Eo={fontSize:"12px",color:G.warning,marginTop:"6px",display:"flex",alignItems:"center",gap:"6px",fontWeight:"500"},wo={fontSize:"12px",color:G.primary,textDecoration:"none",cursor:"pointer",fontWeight:"600",display:"inline-flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"opacity 0.2s"},To={display:"flex",alignItems:"center",marginBottom:"8px",fontSize:"14px",fontWeight:"500",color:G.text,cursor:"pointer",padding:"12px 14px",backgroundColor:G.surface,border:`1px solid ${G.border}`,borderRadius:"12px",transition:`all 0.2s ${ge}`,userSelect:"none",boxShadow:"0 1px 2px rgba(0,0,0,0.02)"},xt={width:"18px",height:"18px",marginRight:"12px",cursor:"pointer",accentColor:G.primary},Oo={flex:"1 1 0",padding:"12px 0",color:"#fff",backgroundColor:G.primary,border:"none",borderRadius:"50px",fontSize:"14px",fontWeight:"600",cursor:"pointer",marginTop:"20px",boxShadow:"0 4px 12px rgba(26, 115, 232, 0.3)",transition:`transform 0.1s ${ge}, box-shadow 0.2s ${ge}`,display:"flex",alignItems:"center",justifyContent:"center",gap:"8px"},ko={width:"100%",padding:"10px",background:"#FFFFFF",border:`1px dashed ${G.primary}`,color:G.primary,borderRadius:"8px",cursor:"pointer",fontWeight:"600",fontSize:"13px",marginBottom:"12px",transition:`background-color 0.2s ${ge}`},Io={background:"transparent",border:`1px solid ${G.border}`,borderRadius:"20px",color:G.primary,cursor:"pointer",fontSize:"13px",fontWeight:"600",padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px",margin:"16px auto 0 auto",transition:`all 0.2s ${ge}`,fontFamily:"'Google Sans', 'Roboto'"};var No={width:"24px",height:"24px",border:"none",borderRadius:"50%",backgroundColor:"#ffffff",boxShadow:"0 1px 3px rgba(0,0,0,0.15)",color:G.text,cursor:"pointer",padding:"0",fontSize:"16px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center",userSelect:"none",transition:"transform 0.1s ease"},_o={fontSize:"13px",fontWeight:"700",color:G.primary,minWidth:"20px",textAlign:"center"},Lo={width:"100%",padding:"12px 12px 12px 40px",borderRadius:"12px",border:`1px solid ${G.border}`,backgroundColor:G.surface,fontSize:"14px",marginBottom:"16px",boxSizing:"border-box",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"12px center",outline:"none",transition:`border-color 0.2s ${ge}, box-shadow 0.2s ${ge}`},Ro={display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"20px",paddingBottom:"12px",borderBottom:`1px solid ${G.bgInput}`},Mo={padding:"6px 12px",borderRadius:"8px",border:`1px solid ${G.border}`,backgroundColor:G.surface,color:G.textSub,fontSize:"13px",fontWeight:"500",cursor:"pointer",transition:`all 0.2s ${ge}`,userSelect:"none",display:"flex",alignItems:"center",gap:"6px"},Do={backgroundColor:G.primaryBg,color:G.primary,borderColor:G.primary,fontWeight:"600"},Go={marginLeft:"4px",width:"16px",height:"16px",borderRadius:"50%",display:"none",alignItems:"center",justifyContent:"center",fontSize:"10px",color:G.primary,backgroundColor:"rgba(255,255,255,0.6)",transition:"background 0.2s",lineHeight:"1"},Fo={borderTop:`1px solid ${G.bgInput}`,paddingTop:"20px",marginTop:"16px"};var zo={maxHeight:"240px",overflowY:"auto",border:`1px solid ${G.border}`,borderRadius:"12px",marginTop:"8px",backgroundColor:G.surface,boxShadow:"0 4px 20px rgba(0,0,0,0.05)",display:"none"},Po={display:"flex",alignItems:"center",padding:"10px 16px",borderBottom:`1px solid ${G.bgInput}`,cursor:"pointer",fontSize:"13px",color:G.text,transition:"background 0.1s",userSelect:"none"};var to={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},oo={fontSize:"12px",color:"#e37400",marginTop:"4px"},no={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},ao={display:"flex",gap:"15px",marginBottom:"10px"};function jt(){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,to);let t=document.createElement("label");t.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(t.style,ze,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,ao);let o=document.createElement("input");o.type="radio",o.name="ts_usage_mod",o.value="Sim",Object.assign(o.style,xt);let l=document.createElement("label");l.textContent="Sim";let a=document.createElement("div");Object.assign(a.style,{display:"flex",alignItems:"center"}),a.appendChild(o),a.appendChild(l);let i=document.createElement("input");i.type="radio",i.name="ts_usage_mod",i.value="N\xE3o",i.checked=!0,Object.assign(i.style,xt);let s=document.createElement("label");s.textContent="N\xE3o";let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center"}),p.appendChild(i),p.appendChild(s),n.appendChild(a),n.appendChild(p);let S=document.createElement("div");S.style.display="block";let x=document.createElement("label");x.textContent="Qual foi o Motivo?",Object.assign(x.style,ze,{fontSize:"12px"});let b=document.createElement("input");b.type="text",Object.assign(b.style,no);let C=document.createElement("div");C.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(C.style,oo),S.appendChild(x),S.appendChild(b),S.appendChild(C),e.appendChild(t),e.appendChild(n),e.appendChild(S),o.onchange=()=>{S.style.display="none"},i.onchange=()=>{S.style.display="block"};function g(E,T){if(e.style.display="none",!E||E.includes("Education")||!T||T.length===0)return;let F=T.some(c=>c.includes("enhanced")||c==="ec_google_ads"),q=T.some(c=>(c.includes("conversion")||c.includes("ads"))&&!c.includes("enhanced")),u=T.some(c=>c.includes("ga4")||c.includes("analytics")||c.includes("ua")),d=T.some(c=>c.includes("merchant")||c.includes("gmc")||c.includes("shopping"));(F||q&&!u&&!d)&&(e.style.display="block")}function h(){if(e.style.display==="none")return"";let E=`<br><b>Utilizou Tag Support?</b> ${o.checked?"Sim":"N\xE3o"}`;return i.checked&&b.value.trim()!==""&&(E+=`<br><b>Motivo:</b> ${b.value}`),E+="<br>",E}function A(){e.style.display="none",i.checked=!0,o.checked=!1,S.style.display="block",b.value=""}return{element:e,updateVisibility:g,getOutput:h,reset:A}}var _={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Ne={ads:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M38.85 144.47l-26.27-26.28a12.72 12.72 0 0 1 0-17.92L106 5.86a12.72 12.72 0 0 1 17.92 0l26.28 26.27a12.72 12.72 0 0 1 0 17.92l-93.43 94.42a12.73 12.73 0 0 1-17.92 0z"/><path fill="#1A73E8" d="M165.73 100.27l-26.28-26.28a12.72 12.72 0 0 0-17.92 0L28.1 167.42a12.72 12.72 0 0 0 0 17.92l26.28 26.28a12.72 12.72 0 0 0 17.92 0l93.43-93.43a12.72 12.72 0 0 0 0-17.92z"/><path fill="#34A853" d="M38.85 144.47a12.63 12.63 0 0 1 0-17.92l54.58-54.58a12.72 12.72 0 0 1 17.92 0l-54.58 54.58 37.07 37.07a12.72 12.72 0 0 1 0 17.92l-37.07-37.07z"/></svg>',ga4:'<svg viewBox="0 0 192 192"><path fill="#F9AB00" d="M22 138v28h28v-28H22z"/><path fill="#E37400" d="M66 84v82h28V84H66z"/><path fill="#E37400" d="M110 22v144h28V22h-28z"/></svg>',gtm:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M40 32h112c4.42 0 8 3.58 8 8v112c0 4.42-3.58 8-8 8H40c-4.42 0-8-3.58-8-8V40c0-4.42 3.58-8 8-8z"/><path fill="#8AB4F8" d="M136 76h-20v-20h-40v20H56v40h20v20h40v-20h20V76z"/><circle cx="96" cy="96" r="24" fill="#1967D2"/></svg>',gmc:'<svg viewBox="0 0 192 192"><path fill="#4285F4" d="M22 66l18-36h112l18 36v100H22V66z"/><path fill="#1967D2" d="M152 30H40L22 66h148l-18-36z"/><path fill="#8AB4F8" d="M40 30h112v36H40z"/></svg>',default:'<svg viewBox="0 0 24 24"><path fill="#5F6368" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'};function Bt(e){let t={};function n(u){let d=u.toLowerCase();return d.includes("ads")||d.includes("conversion")||d.includes("remarketing")?_.brands.ads:d.includes("ga4")||d.includes("analytics")?_.brands.ga4:d.includes("gtm")||d.includes("tag manager")||d.includes("container")?_.brands.gtm:d.includes("merchant")||d.includes("shopping")||d.includes("feed")?_.brands.gmc:_.brands.default}let o=Object.entries(Se).filter(([u,d])=>d.popular),l={};Object.entries(Se).forEach(([u,d])=>{if(d.popular)return;let r=n(d.name);l[r.label]||(l[r.label]={brand:r,tasks:[]}),l[r.label].tasks.push({key:u,...d})});let a="cw-zen-tasks";if(!document.getElementById(a)){let u=document.createElement("style");u.id=a,u.innerHTML=`
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
        `,document.head.appendChild(u)}let i=document.createElement("div");i.className="cw-zen-container";let s=document.createElement("div");Object.assign(s.style,{display:"none"});let p=document.createElement("div");p.className="cw-screens-container",s.appendChild(p),i.innerHTML=`
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
    `;let S=i.querySelector(".cw-hero-grid"),x=i.querySelector(".cw-acc-container"),b=i.querySelector(".cw-results-container"),C=i.querySelector(".cw-search-input"),g=i.querySelector(".cw-status-bar"),h=i.querySelector(".cw-status-text"),A=i.querySelector(".cw-footer-icons");o.forEach(([u,d])=>{let r=n(d.name),c=document.createElement("div");c.className="cw-hero-card",c.id=`hero-${u}`,c.style.setProperty("--hero-color",r.color),c.innerHTML=`
            <div class="cw-hero-main">
                <div class="cw-hero-icon">${Ne[r.icon]}</div>
                <div class="cw-hero-label">${d.name}</div>
            </div>
            
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,c.onclick=v=>{if(v.target.closest(".cw-step-btn"))return;let y=t[u]?t[u].count:0;T(u,y>0?-y:1,d)},c.querySelector(".minus").onclick=()=>T(u,-1,d),c.querySelector(".plus").onclick=()=>T(u,1,d),c.dataset.color=r.color,S.appendChild(c)});function E(u,d){let r=n(d.name),c=document.createElement("div");return c.className="cw-task-item",c.dataset.id=u,c.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${r.bg}; color:${r.color}">
                    ${Ne[r.icon]||Ne.default}
                </div>
                <div class="cw-task-label">${d.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,c.onclick=v=>{if(v.target.closest(".cw-step-btn"))return;let y=t[u]?t[u].count:0;T(u,y>0?-y:1,d)},c.querySelector(".minus").onclick=()=>T(u,-1,d),c.querySelector(".plus").onclick=()=>T(u,1,d),c}Object.entries(l).forEach(([u,d])=>{let r=document.createElement("div");r.className="cw-acc-group";let c=document.createElement("div");c.className="cw-acc-header",c.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${d.brand.color}"></div>
                ${u}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,c.onclick=()=>{x.querySelectorAll(".cw-acc-group.open").forEach(y=>{y!==r&&y.classList.remove("open")}),r.classList.toggle("open")};let v=document.createElement("div");v.className="cw-acc-body",d.tasks.forEach(y=>{let w=E(y.key,y);v.appendChild(w)}),r.appendChild(c),r.appendChild(v),x.appendChild(r)});function T(u,d,r){t[u]||(t[u]={count:0,data:r,brand:n(r.name)}),t[u].count+=d,t[u].count<=0&&delete t[u],F(),q(),e&&e()}function F(){o.forEach(([v])=>{let y=S.querySelector(`#hero-${v}`);if(!y)return;let w=t[v];w?(y.classList.add("active"),y.querySelector(".cw-step-val").textContent=w.count,y.querySelector(".cw-step-val").style.color=y.dataset.color):y.classList.remove("active")}),i.querySelectorAll(".cw-task-item").forEach(v=>{let y=v.dataset.id,w=t[y];w?(v.classList.add("selected"),v.querySelector(".cw-step-val").textContent=w.count):v.classList.remove("selected")});let d=Object.keys(t),r=0,c=[];if(d.forEach(v=>{let y=t[v];r+=y.count;for(let w=0;w<y.count;w++)c.length<6&&c.push(y.brand)}),r>0){g.classList.add("visible");let v=r>1?"A\xE7\xF5es":"A\xE7\xE3o",y=r>1?"definidas":"definida";h.textContent=`${r} ${v} ${y}`,A.innerHTML="",c.forEach(w=>{let L=document.createElement("div");L.className="cw-mini-icon",L.innerHTML=Ne[w.icon]||Ne.default;let k=L.querySelector("svg");k&&(k.style.width="14px",k.style.height="14px"),A.appendChild(L)})}else g.classList.remove("visible")}C.addEventListener("input",u=>{let d=u.target.value.toLowerCase();if(d.length>0){x.style.display="none",b.style.display="block",b.innerHTML="";let r=!1;Object.entries(Se).forEach(([c,v])=>{if(v.name.toLowerCase().includes(d)){r=!0;let y=E(c,v);t[c]&&(y.classList.add("selected"),y.querySelector(".cw-step-val").textContent=t[c].count),b.appendChild(y)}}),r||(b.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else x.style.display="block",b.style.display="none"});function q(){p.innerHTML="";let u=Object.keys(t),d=!1,r="implementation";if(u.length===0){p.innerHTML='<div class="cw-empty-state">Selecione tarefas para ver os campos.</div>';return}let c=document.createElement("div");c.className="cw-info-banner",c.innerHTML=`
            <span style="font-size:14px">\u2139\uFE0F</span>
            <span>
                Todos os Screenshots s\xE3o baseados na descri\xE7\xE3o do 
                <a href="https://docs.google.com/spreadsheets/d/1X5yeIZZzWQRrPdSDM7oZt2Kt0ooSN4dgLN4J7gWe8O4/" target="_blank" class="cw-info-link">Win Criteria</a>.
            </span>
        `,p.appendChild(c),u.forEach(v=>{let y=t[v].data,w=t[v].count,L=t[v].brand,k=y.screenshots?y.screenshots[r]||[]:["Link da Evid\xEAncia"];if(k.length>0){d=!0;for(let $=1;$<=w;$++){let O=document.createElement("div");O.className="cw-screen-card",O.style.setProperty("--brand-color",L.color),O.style.setProperty("--brand-bg",L.bg),O.style.setProperty("--brand-shadow",L.color+"40");let I=document.createElement("div");I.className="cw-card-header";let ee=document.createElement("div");ee.className="cw-card-icon",ee.innerHTML=Ne[L.icon]||Ne.default;let z=document.createElement("div");z.style.cssText="flex:1; display:flex; align-items:center; gap:8px;";let P=document.createElement("input");P.className="cw-card-title-input",P.id=`name-${v}-${$}`,P.value=`${y.name}${w>1?" #"+$:""}`,P.title="Clique para renomear esta task";let R=document.createElement("span");R.className="cw-edit-hint",R.innerHTML="\u270E Renomear",z.appendChild(P),z.appendChild(R),I.appendChild(ee),I.appendChild(z),O.appendChild(I),k.forEach((ae,ie)=>{let U=document.createElement("div");U.className="cw-input-group";let pe=document.createElement("label");pe.className="cw-input-label",pe.textContent=ae.replace(/📷|:|•/g,"").trim();let le=document.createElement("input");le.className="cw-input-field",le.id=`screen-${v}-${$}-${ie}`,le.placeholder="Cole o link aqui...",le.setAttribute("autocomplete","off"),le.addEventListener("input",()=>{le.value.trim().length>5?le.classList.add("filled"):le.classList.remove("filled")});let ue=document.createElement("div");ue.className="cw-input-check",ue.innerHTML='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',U.appendChild(pe),U.appendChild(le),U.appendChild(ue),O.appendChild(U)}),p.appendChild(O)}}}),s.style.display=d?"block":"none"}return{selectionElement:i,screenshotsElement:s,updateSubStatus:()=>q(),getCheckedElements:()=>Object.keys(t).map(u=>({value:u,closest:()=>({querySelector:()=>({textContent:t[u].count})})})),toggleTask:(u,d=!0)=>{let r=t[u];d&&!r?T(u,1,Se[u]):!d&&r&&T(u,-r.count,Se[u])},reset:()=>{for(let u in t)delete t[u];C.value="",x.style.display="block",b.style.display="none",F(),q()}}}function qt(){let e="v3.6.0",t="bau",n="pt",o=!1,l=!1,a={input:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},textarea:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease",height:"100px",resize:"vertical"},h3:{fontSize:"14px",fontWeight:"600",color:"#202124",margin:"0 0 12px 0"},label:{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},checkboxLabel:{display:"flex",alignItems:"center",marginBottom:"10px",fontSize:"14px",fontWeight:"400",cursor:"pointer",padding:"8px",background:"#f8f9fa",borderRadius:"6px",transition:"background-color 0.2s ease, box-shadow 0.2s ease",userSelect:"none"},checkboxInput:{width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"},buttonBase:{flex:"1 1 0",padding:"10px 0",color:"#fff",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"500",cursor:"pointer",marginTop:"16px"},stepBlock:{borderTop:"1px solid #eee",paddingTop:"12px",marginTop:"12px"},radioContainer:{display:"flex",gap:"15px",marginBottom:"10px"},optionalBtn:{width:"100%",padding:"10px",background:"white",border:"1px dashed #1a73e8",color:"#1a73e8",borderRadius:"6px",cursor:"pointer",fontWeight:"500",fontSize:"13px",marginBottom:"10px",transition:"all 0.2s"},helpLink:{fontSize:"12px",color:"#1a73e8",textDecoration:"none",cursor:"pointer",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"color 0.2s"}},i=jt(),s=Bt(()=>{let N=s.getCheckedElements().map(f=>f.value);O&&O.value&&i.updateVisibility(O.value,N)}),p=document.createElement("div");p.id="autofill-popup",Object.assign(p.style,ve,{right:"100px",width:"400px",boxShadow:"none",opacity:"0",pointerEvents:"none",transition:"width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease, transform 0.3s ease"}),p.style.transition+=", width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)";let x=Ae(p,"Case Notes Assistant",e,"Gera notas padronizadas automaticamente. Selecione o status, as tasks realizadas e preencha os detalhes para inserir no caso.",{popup:p,googleLine:null},()=>dt()),b=x.lastElementChild;if(b){let m=document.createElement("div");m.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>',m.classList.add("no-drag"),Object.assign(m.style,{fontSize:"20px",color:"#9AA0A6",cursor:"pointer",padding:"8px",display:"flex",alignItems:"center",justifyContent:"center",marginRight:"4px",marginLeft:"auto",borderRadius:"50%",transition:"background 0.2s, transform 0.3s ease"}),m.title="Expandir/Contrair Janela",m.onmouseover=()=>m.style.backgroundColor="#e8eaed",m.onmouseout=()=>m.style.backgroundColor="transparent";let N=!1;m.onclick=()=>{N=!N,m.style.transform=N?"rotate(180deg)":"rotate(0deg)",p.style.width=N?"700px":"380px",N?m.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7"/></svg>':m.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>'};let f=b.lastElementChild;f?b.insertBefore(m,f):b.appendChild(m)}p.appendChild(x);let C=document.createElement("div");Object.assign(C.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1"}),p.appendChild(C);let g=document.createElement("div");g.textContent="created by lucaste@",Object.assign(g.style,Xe),p.appendChild(g);let h=document.createElement("div");h.id="step-lang-type";let A=document.createElement("label");Object.assign(A.style,a.label),h.appendChild(A);let E=document.createElement("div");Object.assign(E.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let T=document.createElement("div");T.textContent="Portugu\xEAs",T.classList.add("no-drag"),Object.assign(T.style,re);let F=document.createElement("div");F.textContent="Espa\xF1ol",F.classList.add("no-drag"),Object.assign(F.style,re),T.onclick=()=>st("pt"),F.onclick=()=>st("es"),E.appendChild(T),E.appendChild(F),h.appendChild(E),C.appendChild(h);let q=document.createElement("div");q.id="step-0-case-type";let u=document.createElement("label");Object.assign(u.style,a.label),q.appendChild(u);let d=document.createElement("div");Object.assign(d.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let r=document.createElement("div");r.textContent="BAU",r.classList.add("no-drag"),Object.assign(r.style,re);let c=document.createElement("div");c.textContent="LM",c.classList.add("no-drag"),Object.assign(c.style,re),r.onclick=()=>it("bau"),c.onclick=()=>it("lm"),d.appendChild(r),d.appendChild(c),q.appendChild(d),C.appendChild(q);let v=document.createElement("div");v.id="step-1-selection";let y=document.createElement("label");Object.assign(y.style,a.label);let w=document.createElement("select");w.id="main-status",Object.assign(w.style,Pe),w.innerHTML='<option value="">-- Selecione --</option><option value="NI">NI - Need Info</option><option value="SO">SO - Solution Offered</option><option value="IN">IN - Inactive</option><option value="AS">AS - Assigned</option>';let L=document.createElement("div");Object.assign(L.style,{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginTop:"16px",marginBottom:"8px"});let k=document.createElement("label");Object.assign(k.style,a.label,{marginTop:"0",marginBottom:"0"});let $=document.createElement("a");$.target="_blank",$.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> Guia de Substatus',Object.assign($.style,a.helpLink),L.appendChild(k),L.appendChild($);let O=document.createElement("select");O.id="sub-status",Object.assign(O.style,Pe),O.disabled=!0,v.appendChild(y),v.appendChild(w),v.appendChild(L),v.appendChild(O),C.appendChild(v);let I=document.createElement("div");I.id="step-1-1-portugal",Object.assign(I.style,a.stepBlock,{display:"none"});let ee=document.createElement("label");Object.assign(ee.style,a.label),I.appendChild(ee);let z=document.createElement("div");Object.assign(z.style,a.radioContainer);let P=document.createElement("div");Object.assign(P.style,{display:"flex",alignItems:"center"});let R=document.createElement("input");R.type="radio",R.name="portugal-group",R.value="sim",Object.assign(R.style,a.checkboxInput);let ae=document.createElement("label");ae.htmlFor="portugal-sim",Object.assign(ae.style,{cursor:"pointer"}),P.appendChild(R),P.appendChild(ae);let ie=document.createElement("div");Object.assign(ie.style,{display:"flex",alignItems:"center"});let U=document.createElement("input");U.type="radio",U.name="portugal-group",U.value="nao",U.checked=!0,Object.assign(U.style,a.checkboxInput);let pe=document.createElement("label");pe.htmlFor="portugal-nao",Object.assign(pe.style,{cursor:"pointer"}),ie.appendChild(U),ie.appendChild(pe),z.appendChild(P),z.appendChild(ie),I.appendChild(z),C.appendChild(I);function le(m){o=m,m?ue.style.display="block":ue.style.display="none"}R.onchange=()=>le(!0),U.onchange=()=>le(!1);let ue=document.createElement("div");ue.id="step-1-2-consent",Object.assign(ue.style,a.stepBlock,{display:"none"});let ot=document.createElement("label");Object.assign(ot.style,a.label),ue.appendChild(ot);let Ve=document.createElement("div");Object.assign(Ve.style,a.radioContainer);let He=document.createElement("div");Object.assign(He.style,{display:"flex",alignItems:"center"});let we=document.createElement("input");we.type="radio",we.name="consent-group",we.value="Sim",we.checked=!0,Object.assign(we.style,a.checkboxInput);let $e=document.createElement("label");$e.htmlFor="consent-sim",Object.assign($e.style,{cursor:"pointer"}),He.appendChild(we),He.appendChild($e);let Ue=document.createElement("div");Object.assign(Ue.style,{display:"flex",alignItems:"center"});let De=document.createElement("input");De.type="radio",De.name="consent-group",De.value="N\xE3o",Object.assign(De.style,a.checkboxInput);let We=document.createElement("label");We.htmlFor="consent-nao",Object.assign(We.style,{cursor:"pointer"}),Ue.appendChild(De),Ue.appendChild(We),Ve.appendChild(He),Ve.appendChild(Ue),ue.appendChild(Ve),C.appendChild(ue);let Te=document.createElement("div");Te.id="step-1-5-snippets",Object.assign(Te.style,a.stepBlock,{display:"none"});let nt=document.createElement("h3");Object.assign(nt.style,a.h3);let me=document.createElement("div");me.id="snippet-container",Te.appendChild(nt),Te.appendChild(me),C.appendChild(Te);let be=document.createElement("div");be.id="step-2-tasks",Object.assign(be.style,a.stepBlock,{display:"none"});let ce=document.createElement("button");ce.textContent="+ Gostaria de selecionar uma task?",Object.assign(ce.style,a.optionalBtn),ce.onmouseover=()=>{ce.style.background="#e8f0fe"},ce.onmouseout=()=>{ce.style.background="white"};let Le=document.createElement("h3");Object.assign(Le.style,a.h3);let vt=document.createElement("div");vt.id="task-checkboxes-container",be.appendChild(ce),be.appendChild(vt),be.appendChild(Le),be.appendChild(s.selectionElement),C.appendChild(be);let fe=document.createElement("div");fe.id="step-3-form",Object.assign(fe.style,a.stepBlock,{display:"none"});let at=document.createElement("h3");Object.assign(at.style,a.h3),fe.appendChild(at);let ye=document.createElement("div");ye.id="dynamic-form-fields-container",fe.appendChild(ye),fe.appendChild(i.element),fe.appendChild(s.screenshotsElement),C.appendChild(fe);let Oe=document.createElement("div");Oe.id="step-4-email",Object.assign(Oe.style,{display:"none",marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #eee"});let ke=document.createElement("label");ke.style.display="flex",ke.style.alignItems="center",ke.style.cursor="pointer",ke.style.fontSize="14px";let Ie=document.createElement("input");Ie.type="checkbox",Ie.checked=!0,Object.assign(Ie.style,a.checkboxInput),ke.appendChild(Ie),ke.appendChild(document.createTextNode("Preencher email automaticamente?")),Oe.appendChild(ke),C.appendChild(Oe);let Re=document.createElement("div");Object.assign(Re.style,{display:"none",gap:"8px",padding:"0"}),C.appendChild(Re);let Ge=document.createElement("button");Object.assign(Ge.style,a.buttonBase,{backgroundColor:"#5f6368"}),Ge.textContent="Copiar";let Fe=document.createElement("button");Object.assign(Fe.style,a.buttonBase,{backgroundColor:"#1a73e8"}),Fe.textContent="Preencher",Re.appendChild(Ge),Re.appendChild(Fe),document.body.appendChild(p);function it(m){t=m;let N=je();Object.assign(r.style,re),Object.assign(c.style,re),m==="bau"?(Object.assign(r.style,N),$.href="https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657"):(Object.assign(c.style,N),$.href="https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243"),O.value&&O.dispatchEvent(new Event("change"))}function D(m){try{if(xe&&xe[n]&&xe[n][m])return xe[n][m];if(xe&&xe.pt&&xe.pt[m])return xe.pt[m]}catch{}return m}function Ut(){A.textContent=D("idioma"),u.textContent=D("fluxo"),y.textContent=D("status_principal"),k.textContent=D("substatus"),nt.textContent=D("cenarios_comuns"),Le.textContent=D("selecione_tasks"),at.textContent=D("preencha_detalhes"),Ge.textContent=D("copiar"),Fe.textContent=D("preencher"),w.querySelector('option[value=""]')&&(w.querySelector('option[value=""]').textContent=D("select_status")),O.querySelector('option[value=""]')&&(O.querySelector('option[value=""]').textContent=D("select_substatus")),ee.textContent=D("caso_portugal"),ae.textContent=D("sim"),pe.textContent=D("nao"),ot.textContent=D("consentiu_gravacao"),$e.textContent=D("sim"),We.textContent=D("nao"),ye.querySelectorAll("label").forEach(m=>{let N=m.nextElementSibling.id.replace("field-",""),f=D(N.toLowerCase());f!==N.toLowerCase()?m.textContent=f:m.textContent=N.replace(/_/g," ").replace(/\b\w/g,M=>M.toUpperCase())+":"}),ce.textContent="+ "+(n==="pt"?"Gostaria de selecionar uma task?":"Quisiera seleccionar una tarea?")}function st(m){n=m;let N=je();Object.assign(T.style,re),Object.assign(F.style,re),m==="pt"?(Object.assign(T.style,N),I.style.display="block",le(o)):(Object.assign(F.style,N),I.style.display="none",ue.style.display="none"),Ut(),O.value&&O.dispatchEvent(new Event("change"))}function rt(m){(m.value.trim()===""||m.value.trim()==="\u2022")&&(m.value="\u2022 "),m.onkeydown=function(N){if(N.key==="Enter"){N.preventDefault();let f=this.selectionStart,M=this.selectionEnd,Q=this.value,W=Q.lastIndexOf(`
`,f-1)+1,H=Q.substring(W,f),Y=H.trim()==="\u2022"||H.trim()===""?`
`:`
\u2022 `;this.value=Q.substring(0,f)+Y+Q.substring(M),this.selectionStart=this.selectionEnd=f+Y.length}else if(N.key==="Backspace"){let f=this.selectionStart;if(f===this.selectionEnd&&f>0){let M=this.value.substring(0,f);M.endsWith(`
\u2022 `)?(N.preventDefault(),this.value=M.substring(0,f-3)+this.value.substring(this.selectionEnd),this.selectionStart=this.selectionEnd=f-3):M==="\u2022 "&&(N.preventDefault(),this.value="",this.selectionStart=this.selectionEnd=0)}}}}function lt(){let m=typeof me<"u"?me:document.getElementById("snippet-container");if(!m)return;let N=m.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'),f={},M=new Set;N.forEach(W=>{let H=W.id,Y=Me[H];if(Y)for(let j in Y)j==="linkedTask"?M.add(Y.linkedTask):j!=="type"&&(f[j]||(f[j]=[]),f[j].includes(Y[j])||f[j].push(Y[j]))});let Q=new Set;if(Object.values(Me).forEach(W=>{Object.keys(W).forEach(H=>{H!=="linkedTask"&&H!=="type"&&Q.add(H)})}),Q.forEach(W=>{let H=document.getElementById(W);if(H){let Y=f[W]||[],j="";qe.includes(W.replace("field-",""))?(j=Y.map(ne=>ne.startsWith("\u2022 ")?ne:"\u2022 "+ne).join(`
`),j===""?j="\u2022 ":j.endsWith(`
\u2022 `)||(j+=`
\u2022 `)):j=Y.join(`

`),j.trim()!=="\u2022"&&j.trim()!==""?H.value=j:qe.includes(W.replace("field-",""))?H.value="\u2022 ":H.value="",H.tagName==="TEXTAREA"&&typeof rt=="function"&&rt(H)}}),M.size>0){let W=s.getCheckedElements().map(H=>H.value);M.forEach(H=>{W.includes(H)||s.toggleTask(H,!0)})}}w.onchange=()=>{let m=w.value;if(ct(1.5),O.innerHTML=`<option value="">${D("select_substatus")}</option>`,!m){O.disabled=!0;return}for(let N in Be){let f=Be[N];if(f.status===m){let M=document.createElement("option");M.value=N,M.textContent=f.name,O.appendChild(M)}}O.disabled=!1},O.onchange=()=>{let m=O.value;if(ct(1.5),!m)return;s.updateSubStatus(m);let N=Be[m];me.innerHTML="";let f=(B,X,V)=>{let J=document.createElement("label");Object.assign(J.style,a.checkboxLabel),J.onmouseover=()=>J.style.backgroundColor="#e8eaed",J.onmouseout=()=>J.style.backgroundColor="#f8f9fa";let K=document.createElement("input");return K.type=X,K.id=B.id,Object.assign(K.style,a.checkboxInput),J.appendChild(K),J.appendChild(document.createTextNode(` ${B.text}`)),V.appendChild(J),K},M=[],Q="radio";if(m==="NI_Awaiting_Inputs")M=[{id:"quickfill-ni-inicio-manual",text:"In\xEDcio 2/6 (Manual)"},{id:"quickfill-ni-cms-access",text:"In\xEDcio 2/6 (ADV sem acesso ao CMS)"},{id:"quickfill-ni-followup-bau",text:"Follow-up 2/6 (BAU)"},{id:"quickfill-ni-followup-lm",text:"Follow-up 2/6 (LM)"}];else if(m.startsWith("SO_"))Q="checkbox",M=[{id:"quickfill-gtm-install",text:"Instala\xE7\xE3o do GTM"},{id:"quickfill-whatsapp",text:"Convers\xE3o de WhatsApp"},{id:"quickfill-form",text:"Convers\xE3o de Formul\xE1rio (Padr\xE3o)"},{id:"quickfill-ecw4-close",text:"Fechamento ECW4 (P\xF3s 7 dias)"}];else if(m.startsWith("AS_")){Q="checkbox";let B=document.createElement("label");B.textContent=D("cenarios_comuns"),Object.assign(B.style,a.label),me.appendChild(B),M=[{id:"quickfill-as-no-show",text:"Anunciante n\xE3o compareceu (respondeu e-mail)"},{id:"quickfill-as-insufficient-time",text:"Tempo insuficiente"},{id:"quickfill-as-no-access",text:"Anunciante sem acessos necess\xE1rios"}]}else m.startsWith("IN_")&&(M=[{id:"quickfill-in-nrp-bau",text:"NRP (BAU - 3 tentativas)"},{id:"quickfill-in-nrp-lm",text:"NRP (LM - Sem tentativas)"},{id:"quickfill-in-no-show-bau",text:"No-Show (BAU - 3 tentativas)"},{id:"quickfill-in-2-6-final",text:"Finaliza\xE7\xE3o 2/6 (Sem Resposta)"},{id:"quickfill-in-manual",text:"Outro (Manual)"}]);let W=M.filter(B=>{let X=Me[B.id];return!X.type||X.type==="all"||X.type===t});W.forEach((B,X)=>{let V=f(B,Q,me);Q==="radio"&&(V.name="scenario-radio-group",X===0&&(V.checked=!0))}),W.length>0&&(Te.style.display="block"),N.requiresTasks?(ce.style.display="none",Le.style.display="block",s.selectionElement.style.display="block",be.style.display="block"):(ce.style.display="block",Le.style.display="none",s.selectionElement.style.display="none",be.style.display="block"),ye.innerHTML="";let H=N.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(H)].forEach(B=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(B))return;let X=B.slice(1,-1),V=document.createElement("label"),J=D(X.toLowerCase());V.textContent=J!==X.toLowerCase()?J:X.replace(/_/g," ").replace(/\b\w/g,te=>te.toUpperCase())+":",Object.assign(V.style,a.label);let K;qe.includes(X)?(K=document.createElement("textarea"),Object.assign(K.style,a.textarea),K.classList.add("bullet-textarea"),rt(K)):gt.includes(X)?(K=document.createElement("textarea"),Object.assign(K.style,a.textarea)):(K=document.createElement("input"),K.type="text",Object.assign(K.style,a.input),X==="REASON_COMMENTS"&&(m.startsWith("NI_")||m.startsWith("IN_"))&&(Object.assign(V.style,{display:"none"}),Object.assign(K.style,{display:"none"}))),X==="ON_CALL"&&t==="lm"&&(Object.assign(V.style,{display:"none"}),Object.assign(K.style,{display:"none"}),K.value="N/A"),K.id=`field-${X}`,ye.appendChild(V),ye.appendChild(K)});let j=me.querySelectorAll('input[type="checkbox"], input[type="radio"]');j.length>0&&(j.forEach(B=>{B.removeEventListener("change",lt),B.addEventListener("change",lt)}),lt()),fe.style.display="block",Ke[m]?Oe.style.display="block":Oe.style.display="none",Re.style.display="flex";let ne=s.getCheckedElements().map(B=>B.value);i.updateVisibility(m,ne)},ce.onclick=()=>{ce.style.display="none",Le.style.display="block",s.selectionElement.style.display="block"};function St(){let m=O.value;if(!m)return null;let f=Be[m].template.replace(/\n/g,"<br>"),M='style="margin-bottom: 12px; padding-left: 30px;"',Q=[],W="",H=s.getCheckedElements();H.length>0&&H.forEach(ne=>{let B=ne.value,X=Se[B],V=ne.closest().querySelector(".stepper-count"),J=V?parseInt(V.textContent):1;J>1?Q.push(`${X.name} (x${J})`):Q.push(X.name)});let Y=s.screenshotsElement;if(Y){let ne=Array.from(Y.querySelectorAll('input[id^="name-"]'));ne.length>0&&ne.forEach(B=>{let X=B.value,V=B.closest(".cw-screen-card");if(V){let J=V.querySelectorAll('input[id^="screen-"]'),K=!1,te="";J.forEach(de=>{let Ct=de.closest(".cw-input-group"),At=Ct?Ct.querySelector(".cw-input-label"):null,Wt=At?At.textContent:"Evid\xEAncia",Et=de.value.trim(),Yt=Et?` ${Et}`:"";te+=`<li>${Wt} -${Yt}</li>`,K=!0}),K&&(W+=`<b>${X}</b>`,W+=`<ul ${M}>${te}</ul>`)}})}if(f.includes("{TAGS_IMPLEMENTED}")?f=f.replace(/{TAGS_IMPLEMENTED}/g,Q.join(", ")||"N/A"):Q.length>0&&(f+=`<br><b>Tags:</b> ${Q.join(", ")}<br>`),f.includes("{SCREENSHOTS_LIST}")?f=f.replace(/{SCREENSHOTS_LIST}/g,W?`${W}`:"N/A"):W!==""&&(f+=`<br>${W}`),n==="pt"&&o){let ne=we.checked?D("sim"):D("nao");f=f.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${D("consentiu_gravacao")}</b> ${ne}<br><br>`),f=f.replace(/{CASO_PORTUGAL}/g,`<br><b>${D("caso_portugal")}</b> ${D("sim")}<br>`)}else n==="pt"&&!o?(f=f.replace(/{CASO_PORTUGAL}/g,`<br><b>${D("caso_portugal")}</b> ${D("nao")}<br>`),f=f.replace(/{CONSENTIU_GRAVACAO}/g,"")):(f=f.replace(/{CASO_PORTUGAL}/g,""),f=f.replace(/{CONSENTIU_GRAVACAO}/g,""));return ye.querySelectorAll("input, textarea").forEach(ne=>{let B=ne.id.replace("field-",""),X=new RegExp(`{${B}}`,"g"),V=ne.value;if(B==="REASON_COMMENTS"&&(m.startsWith("NI_")||m.startsWith("IN_"))){let te=me.querySelector('input[type="radio"]:checked');te&&Me[te.id]&&(V=Me[te.id]["field-REASON_COMMENTS"])}if(qe.includes(B)&&V.trim()!==""){let te=V.split(`
`).map(de=>de.trim()).filter(de=>de!==""&&de!=="\u2022").map(de=>de.startsWith("\u2022 ")?de.substring(2):de).map(de=>`<li>${de}</li>`).join("");V=te?`<ul ${M}>${te}</ul>`:""}else gt.includes(B)?V=V.split(`
`).filter(te=>te.trim()!=="").map(te=>`<p style="margin: 0 0 8px 0;">${te}</p>`).join(""):ne.tagName==="TEXTAREA"&&(V=V.replace(/\n/g,"<br>"));let J=V.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(J===""||J==="\u2022"||J.toLowerCase()==="n/a"){let te=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${B}\\}(?:<br>\\s*)?`,"gi");te.test(f)?f=f.replace(te,""):f=f.replace(X,"")}else f=f.replace(X,V.replace(/\$/g,"$$$$"))}),f=f.replace(/{([A-Z0-9_]+)}/g,""),f=f.replace(/(<br>){3,}/g,"<br><br>"),typeof i<"u"&&i.getOutput&&(f+=i.getOutput()),f}Ge.onclick=()=>{let m=St();m?(ht(m),Z(D("copiado_sucesso"))):Z(D("selecione_substatus"),{error:!0})},Fe.onclick=async()=>{let m=O.value,N=St();if(!N){Z(D("selecione_substatus"),{error:!0});return}ht(N),dt();let f=Je(),M=await Pt();if(M)try{if(M.focus(),M.innerHTML.trim()==="<p><br></p>"||M.innerHTML.trim()==="<br>"||M.innerText.trim()===""){let Y=document.createRange();Y.selectNodeContents(M);let j=window.getSelection();j.removeAllRanges(),j.addRange(Y),document.execCommand("delete",!1,null)}else if(!M.innerHTML.endsWith("<br><br>")){let Y=document.createRange();Y.selectNodeContents(M),Y.collapse(!1);let j=window.getSelection();j.removeAllRanges(),j.addRange(Y),document.execCommand("insertHTML",!1,"<br><br>")}document.execCommand("insertHTML",!1,N),zt(M),setTimeout(()=>{Z(D("inserido_copiado"))},600);let W=typeof Ie<"u"&&Ie?Ie.checked:!0;if(m&&Ke[m]&&W){let Y=Ke[m];await Lt(Y),await new Promise(j=>setTimeout(j,500))}f(),ct(1.5),w.value="",O.innerHTML=`<option value="">${D("select_substatus")}</option>`,O.disabled=!0}catch(Q){console.error(Q),Z("Erro ao inserir.",{error:!0}),f()}};function ct(m=1.5){m<=1.5&&(Te.style.display="none",me.innerHTML=""),m<=2&&(be.style.display="none",s.reset(),ce.style.display="none"),m<=3&&(fe.style.display="none",ye.innerHTML="",i.reset(),Re.style.display="none",Oe.style.display="none")}function dt(){l=!l,Ee(l,p,"cw-btn-notes")}return it("bau"),st("pt"),dt}var _e={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function Vt(){let e="v4.0.0",t=Object.keys(_e)[0],n="",o="list",l={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:"#FAFAFA"},a={display:"flex",width:"200%",height:"100%",transition:"transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",transform:"translateX(0)"},i={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},s={width:"100%",padding:"10px 12px 10px 36px",borderRadius:"8px",border:"none",background:"#F0F2F5",fontSize:"14px",color:"#202124",boxSizing:"border-box",outline:"none",transition:"all 0.2s ease",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"10px center"},p={display:"flex",gap:"6px",padding:"4px 4px 8px 4px",overflowX:"auto",scrollbarWidth:"none"},S={padding:"6px 12px",borderRadius:"16px",border:"1px solid transparent",background:"transparent",color:"#5f6368",fontSize:"12px",fontWeight:"500",cursor:"pointer",transition:"all 0.2s ease",flexShrink:"0"},x={background:"#E8F0FE",color:"#1967D2",fontWeight:"600"},b={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",marginBottom:"6px",borderRadius:"8px",background:"#fff",border:"1px solid #dadce0",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",position:"relative",overflow:"hidden"},C=!1,g=document.createElement("div");g.id="quick-email-popup",Object.assign(g.style,ve,{right:"100px",width:"480px",height:"600px",boxShadow:"none",opacity:"0",pointerEvents:"none"});let h={popup:g,googleLine:null,focusElement:null};function A(){C=!C,Ee(C,g,"cw-btn-email"),C||setTimeout(()=>k(),300)}let E=Ae(g,"Emails R\xE1pidos",e,"Selecione, visualize e insira com um clique.",h,()=>A()),T=document.createElement("div");Object.assign(T.style,l);let F=document.createElement("div");Object.assign(F.style,a);let q=document.createElement("div");Object.assign(q.style,i);let u=document.createElement("div");Object.assign(u.style,{padding:"16px 16px 4px 16px",flexShrink:"0",background:"#fff",zIndex:"10",display:"flex",flexDirection:"column",gap:"8px",borderBottom:"1px solid #f1f3f4"});let d=document.createElement("input");d.placeholder="Buscar template...",Object.assign(d.style,s),d.onfocus=()=>{d.style.background="#fff",d.style.boxShadow="0 2px 8px rgba(0,0,0,0.05)"},d.onblur=()=>{d.style.background="#F0F2F5",d.style.boxShadow="none"},h.focusElement=d;let r=document.createElement("div");Object.assign(r.style,p);let c=document.createElement("div");Object.assign(c.style,{padding:"12px 16px",overflowY:"auto",flexGrow:"1"}),u.appendChild(d),u.appendChild(r),q.appendChild(u),q.appendChild(c);let v=document.createElement("div");Object.assign(v.style,i);let y=document.createElement("div");Object.assign(y.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),v.appendChild(y),F.appendChild(q),F.appendChild(v),T.appendChild(F),g.appendChild(E),g.appendChild(T);let w=document.createElement("div");Object.assign(w.style,{padding:"8px 16px",borderTop:"1px solid #eee",textAlign:"center",fontSize:"10px",color:"#9aa0a6",background:"#fff",flexShrink:"0"}),w.textContent="created by lucaste@",g.appendChild(w),document.body.appendChild(g);function L(I){o="detail",F.style.transform="translateX(-50%)";let ee='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',z='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';y.innerHTML=`
        <div style="
            position: sticky; top: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px);
            border-bottom: 1px solid #f1f3f4; padding: 12px 20px; z-index: 10;
            display: flex; align-items: center; gap: 8px;
        ">
            <button id="csa-back-btn" style="
                background:none; border:none; cursor:pointer; display:flex; align-items:center; justify-content: center;
                color:#5f6368; width: 32px; height: 32px; margin-left:-8px; border-radius:50%; transition:background 0.2s;
            ">
                ${ee}
            </button>
            <div style="font-size:15px; font-weight:600; color:#202124; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${I.name}
            </div>
        </div>

        <div style="padding: 20px 20px 0 20px;">
            <div style="margin-bottom: 16px;">
                <div style="font-size:11px; font-weight:700; color:#1a73e8; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px;">Assunto</div>
                <div style="font-size:13px; font-weight:500; color:#202124; padding: 10px; background: #F8F9FA; border-radius: 8px; border: 1px solid #eee;">
                    ${I.subject}
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
                ">${I.body}</div>
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
                ${z} Inserir Template
            </button>
        </div>
      `;let P=y.querySelector("#csa-back-btn");P.onmouseover=()=>P.style.backgroundColor="#f1f3f4",P.onmouseout=()=>P.style.backgroundColor="transparent",P.onclick=k;let R=y.querySelector("#csa-insert-btn");R.onmouseover=()=>R.style.backgroundColor="#174ea6",R.onmouseout=()=>R.style.backgroundColor="#1a73e8",R.onclick=async()=>{R.style.transform="scale(0.96)",A();let ae=Je();try{await ft(I),ae()}catch(ie){console.error(ie),ae()}setTimeout(()=>{R.style.transform="scale(1)",k()},300)}}function k(){o="list",F.style.transform="translateX(0)"}function $(){r.innerHTML="",Object.keys(_e).forEach(I=>{let ee=_e[I],z=document.createElement("button");z.textContent=ee.title,Object.assign(z.style,S),t===I&&n===""&&Object.assign(z.style,x),z.onclick=()=>{t=I,n="",d.value="",$(),O()},r.appendChild(z)})}function O(){c.innerHTML="";let I=[];if(n.trim()!==""?Object.values(_e).forEach(P=>{let R=P.emails.filter(ae=>ae.name.toLowerCase().includes(n.toLowerCase()));I=[...I,...R]}):_e[t]&&(I=_e[t].emails),I.length===0){c.innerHTML='<div style="text-align:center; padding:60px 20px; color:#9aa0a6;"><div style="font-size:24px; margin-bottom:8px;">\u{1F50D}</div><div style="font-size:14px;">Nenhum template encontrado.</div></div>';return}let ee='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>',z='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';I.forEach(P=>{let R=document.createElement("div");Object.assign(R.style,b);let ae=P.subject.length>50?P.subject.substring(0,50)+"...":P.subject;R.innerHTML=`
        <div style="flex-grow: 1; margin-right: 12px; min-width: 0;">
            <div style="font-size:13px; font-weight:600; color:#202124; margin-bottom:2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${P.name}</div>
            <div style="font-size:12px; color:#5f6368; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${ae}</div>
        </div>
        <div style="display:flex; gap:6px;">
            <button class="action-btn view" title="Visualizar" style="width:32px; height:32px; border-radius:50%; border:none; background:#f1f3f4; color:#5f6368; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">${z}</button>
            <button class="action-btn send" title="Inserir Agora" style="width:32px; height:32px; border-radius:50%; border:none; background:#e8f0fe; color:#1a73e8; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">${ee}</button>
        </div>
      `,R.onmouseenter=()=>{R.style.background="#F8F9FA",R.style.borderColor="#1a73e8"},R.onmouseleave=()=>{R.style.background="#fff",R.style.borderColor="#dadce0"};let ie=R.querySelector(".view");ie.onclick=pe=>{pe.stopPropagation(),L(P)},ie.onmouseenter=()=>{ie.style.background="#d2e3fc",ie.style.color="#174ea6"},ie.onmouseleave=()=>{ie.style.background="#f1f3f4",ie.style.color="#5f6368"};let U=R.querySelector(".send");U.onclick=pe=>{pe.stopPropagation(),U.style.transform="scale(0.9)",setTimeout(()=>U.style.transform="scale(1)",150),ft(P),A()},U.onmouseenter=()=>{U.style.background="#1a73e8",U.style.color="#fff",U.style.boxShadow="0 2px 6px rgba(26,115,232,0.3)"},U.onmouseleave=()=>{U.style.background="#e8f0fe",U.style.color="#1a73e8",U.style.boxShadow="none"},R.onclick=()=>L(P),c.appendChild(R)})}return d.addEventListener("input",I=>{n=I.target.value,n!==""?Array.from(r.children).forEach(ee=>Object.assign(ee.style,S)):$(),O()}),$(),O(),A}var yt={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function Ht(){let e="v1.2.7",t={},n="PT",o="BAU",l=!1,a=document.createElement("div");a.id="call-script-popup",Object.assign(a.style,ve,{right:"100px",width:"340px",display:"flex",flexDirection:"column",boxShadow:"none",opacity:"0",pointerEvents:"none"});let i={popup:a,googleLine:null};function s(){l=!l,Ee(l,a,"cw-btn-script")}let p=Ae(a,"Call Script Assistant",e,"Checklists guiados para in\xEDcio e fim de chamada.",i,()=>{s()});a.appendChild(p);let S=document.createElement("div");S.id="csa-content",Object.assign(S.style,{padding:"16px",overflowY:"auto",flexGrow:"1"}),a.appendChild(S);let x=document.createElement("div");x.textContent="created by lucaste@",Object.assign(x.style,Xe),a.appendChild(x);let b=document.createElement("div");Object.assign(b.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px",gap:"8px"});let C=document.createElement("div");Object.assign(C.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden"});let g=document.createElement("div");g.textContent="BAU";let h=document.createElement("div");h.textContent="LT",Object.assign(g.style,re),Object.assign(h.style,re),C.appendChild(g),C.appendChild(h);let A=document.createElement("select");Object.assign(A.style,Pe,{marginBottom:"0",width:"auto",minWidth:"85px",paddingTop:"6px",paddingBottom:"6px"}),A.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',A.value=n,b.appendChild(C),b.appendChild(A),S.appendChild(b);let E=document.createElement("div");E.id="csa-checklist-area",Object.assign(E.style,{maxHeight:"60vh",overflowY:"auto",paddingRight:"5px"}),S.appendChild(E),document.body.appendChild(a);function T(r,c){let v=r.replace("#",""),y=parseInt(v.substring(0,2),16),w=parseInt(v.substring(2,4),16),L=parseInt(v.substring(4,6),16);return`rgba(${y}, ${w}, ${L}, ${c})`}function F(r,c,v){r.classList.toggle("csa-completed",c),c?(r.style.borderColor=v,r.style.backgroundColor=T(v,.15),r.style.textDecorationLine="line-through"):(r.style.borderColor="transparent",r.style.backgroundColor="#f8f9fa",r.style.textDecorationLine="none")}function q(r,c,v){let y=yt[r];if(!y)return;let w=y[c];if(!w||w.length===0)return;let L=!0;for(let k=0;k<w.length;k++){let $=`${r}-${c}-${k}`;if(!t[$]){L=!1;break}}v.classList.toggle("csa-group-completed",L)}function u(){E.innerHTML="";let r=`${n} ${o}`,c=yt[r];if(!c){E.innerHTML='<div style="padding: 10px; color: #5f6368;">Script n\xE3o dispon\xEDvel.</div>';return}let v=c.color;["inicio","fim"].forEach(y=>{let w=c[y];if(!w||w.length===0)return;let L=document.createElement("div");L.className="csa-group-container",Object.assign(L.style,{marginBottom:"16px"});let k=document.createElement("div");k.className="csa-group-title";let $=y==="inicio"?"In\xEDcio":"Fim";n.includes("ES")&&($=y==="inicio"?"Inicio":"Fin"),n.includes("EN")&&($=y==="inicio"?"Start":"End"),k.textContent=$,Object.assign(k.style,ze,{fontWeight:"600",fontSize:"14px",textDecoration:"underline",marginBottom:"8px"}),L.appendChild(k);let O=document.createElement("ul");Object.assign(O.style,{listStyle:"none",paddingLeft:"0",margin:"0"}),w.forEach((I,ee)=>{let z=document.createElement("li");z.className="csa-li",z.textContent=I;let P=`${r}-${y}-${ee}`,R=!!t[P];F(z,R,v),z.addEventListener("click",()=>{let ae=!t[P];t[P]=ae,F(z,ae,v),q(r,y,L)}),O.appendChild(z)}),L.appendChild(O),E.appendChild(L),q(r,y,L)})}function d(r){o=r;let c=je();Object.assign(g.style,re),Object.assign(h.style,re),Object.assign(r==="BAU"?g.style:h.style,c),u()}return g.onclick=()=>d("BAU"),h.onclick=()=>d("LT"),A.addEventListener("change",r=>{n=r.target.value,u()}),d(o),s}var tt={lm:{label:"LM Forms",links:[{name:"Relat\xF3rio de Ocorr\xEAncias",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas operacionais | Aviso de pausas"},{name:"Chamadas Excedidas (>50min)",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro de chamadas longas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema/ferramenta"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"Enviar casos para BAU/Solicitar Descarte/Abrir Monitoria para AMs"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo dos Anunciantes"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos complicados de atender"}]},suporte:{label:"Central de Ajuda",links:[{name:"Suporte Google Ads",url:"https://support.google.com/google-ads/",desc:"Oficial"},{name:"Suporte GA4",url:"https://support.google.com/analytics/",desc:"Oficial"},{name:"Suporte Merchant Center",url:"https://support.google.com/merchants/gethelp",desc:"Oficial"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. oficial sobre CSP"},{name:"Doc. Enhanced Conversion",url:"https://support.google.com/google-ads/answer/9888656?hl=en",desc:"Como funcionam as convers\xF5es otimizadas?"},{name:"Doc. CoMo",url:"https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=pt-br",desc:"Doc. oficial sobre Consent Mode"}]},outros:{label:"Diversos",links:[{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form para solicitar grava\xE7\xE3o da chamada."}]}};function $t(){let e="v2.4.5",t="lm",n="",o={width:"100%",padding:"10px 12px 10px 36px",borderRadius:"8px",border:"1px solid #dadce0",background:"#f8f9fa",fontSize:"14px",boxSizing:"border-box",outline:"none",color:"#3c4043",transition:"background 0.2s, border-color 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"10px center"},l={display:"flex",flexWrap:"wrap",gap:"8px",paddingBottom:"8px"},a={padding:"6px 16px",borderRadius:"16px",border:"1px solid #dadce0",background:"transparent",color:"#5f6368",fontSize:"13px",fontWeight:"500",cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s ease",marginBottom:"4px"},i={background:"#e8f0fe",color:"#1967d2",borderColor:"#e8f0fe",fontWeight:"600"},s={display:"flex",flexDirection:"column",padding:"12px",borderRadius:"8px",cursor:"pointer",border:"1px solid transparent",marginBottom:"4px",transition:"background 0.1s"},p=document.createElement("div");p.id="feedback-popup",Object.assign(p.style,ve,{right:"100px",width:"400px",boxShadow:"none",opacity:"0",pointerEvents:"none"});let S={popup:p,googleLine:null,focusElement:null},x=!1,b=Ae(p,"Links \xDAteis",e,"Acesso r\xE1pido a formul\xE1rios internos (Ocorr\xEAncias, Bugs) e documenta\xE7\xF5es oficiais de suporte.",S,()=>q());p.appendChild(b);let C=document.createElement("div");Object.assign(C.style,{padding:"0 16px 16px 16px",display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid #f1f3f4",flexShrink:"0",backgroundColor:"#fff"});let g=document.createElement("input");g.type="text",g.placeholder="Buscar link, form ou ajuda...",Object.assign(g.style,o),S.focusElement=g,g.onfocus=()=>{g.style.borderColor="#1a73e8",g.style.backgroundColor="#fff"},g.onblur=()=>{g.style.borderColor="#dadce0",g.style.backgroundColor="#f8f9fa"};let h=document.createElement("div");Object.assign(h.style,l),C.appendChild(g),C.appendChild(h),p.appendChild(C);let A=document.createElement("div");Object.assign(A.style,{padding:"0 8px 8px 8px",overflowY:"auto",flexGrow:"1"}),p.appendChild(A);let E=document.createElement("div");Object.assign(E.style,{padding:"8px 16px",borderTop:"1px solid #eee",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"10px",color:"#9aa0a6"}),E.innerHTML="<span>by lucaste@</span>",p.appendChild(E),document.body.appendChild(p);function T(){h.innerHTML="",Object.keys(tt).forEach(u=>{let d=tt[u],r=document.createElement("button");r.textContent=d.label,Object.assign(r.style,a),t===u&&n===""&&Object.assign(r.style,i),r.onclick=()=>{t=u,n="",g.value="",T(),F()},h.appendChild(r)})}function F(){A.innerHTML="";let u=[];if(n.trim()!==""?Object.values(tt).forEach(d=>{let r=d.links.filter(c=>c.name.toLowerCase().includes(n.toLowerCase())||c.desc.toLowerCase().includes(n.toLowerCase()));r.forEach(c=>c._categoryName=d.label),u=[...u,...r]}):u=tt[t].links,u.length===0){A.innerHTML='<div style="text-align:center; padding:20px; color:#9aa0a6; fontSize:13px;">Nenhum link encontrado.</div>';return}u.forEach(d=>{let r=document.createElement("div");Object.assign(r.style,s);let c=document.createElement("div");Object.assign(c.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"2px"});let v=document.createElement("div");Object.assign(v.style,{display:"flex",flexDirection:"column",flexGrow:"1"});let y=document.createElement("span");y.textContent=d.name,Object.assign(y.style,{fontSize:"14px",color:"#202124",fontWeight:"500"});let w=document.createElement("span");w.textContent=d.desc+(d._categoryName?` \u2022 ${d._categoryName}`:""),Object.assign(w.style,{fontSize:"11px",color:"#5f6368",marginTop:"2px"}),v.appendChild(y),v.appendChild(w);let L=document.createElement("div");Object.assign(L.style,{display:"flex",alignItems:"center",gap:"8px"});let k=document.createElement("div"),$='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',O='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e8e3e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';k.innerHTML=$,Object.assign(k.style,{width:"28px",height:"28px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#5f6368",cursor:"pointer",transition:"all 0.2s",opacity:"0"}),k.onclick=ee=>{ee.stopPropagation();let z=document.createElement("input");z.value=d.url,document.body.appendChild(z),z.select(),document.execCommand("copy"),document.body.removeChild(z),k.innerHTML=O,k.style.backgroundColor="#e6f4ea",setTimeout(()=>{k.innerHTML=$,k.style.backgroundColor="transparent"},1500)},k.onmouseenter=()=>{k.style.backgroundColor="#e8eaed",k.style.color="#202124"},k.onmouseleave=()=>{k.style.backgroundColor="transparent",k.style.color="#5f6368"};let I=document.createElement("span");I.innerHTML="&#8599;",Object.assign(I.style,{fontSize:"18px",color:"#dadce0",marginLeft:"4px"}),L.appendChild(k),L.appendChild(I),c.appendChild(v),c.appendChild(L),r.appendChild(c),r.onmouseenter=()=>{r.style.backgroundColor="#f1f3f4",I.style.color="#1a73e8",k.style.opacity="1"},r.onmouseleave=()=>{r.style.backgroundColor="transparent",I.style.color="#dadce0",k.style.opacity="0"},r.onclick=()=>window.open(d.url,"_blank"),A.appendChild(r)})}g.addEventListener("input",u=>{n=u.target.value,n!==""?Array.from(h.children).forEach(d=>{d.style.backgroundColor="transparent",d.style.color="#5f6368",d.style.borderColor="#dadce0"}):T(),F()});function q(){x=!x,Ee(x,p,"cw-btn-links")}return T(),F(),q}function io(){if(window.techSolInitialized){bt();return}window.techSolInitialized=!0,console.log("\u{1F680} TechSol Suite Initializing...");try{It(),bt();let e=qt(),t=Vt(),n=Ht(),o=$t();Dt({toggleNotes:e,toggleEmail:t,toggleScript:n,toggleLinks:o})}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),Z("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}io();})();
