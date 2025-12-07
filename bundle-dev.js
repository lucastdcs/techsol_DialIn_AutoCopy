(()=>{var $e="",Yt=e=>new Promise(t=>setTimeout(t,e));async function At(){if($e)return $e;try{let e=document.querySelector("profile-icon material-button")||document.querySelector('a[aria-label*="Account"]');if(!e)return"Agente";e.click(),await Yt(100);let t="Consultor",n=document.querySelector("profile-details .name");if(n)t=n.textContent.trim().split(" ")[0],t=t.charAt(0).toUpperCase()+t.slice(1).toLowerCase();else{let o=document.querySelector("profile-details img");if(o&&o.src.includes("/photos/")){let r=o.src.match(/\/photos\/([^\?]+)/)[1];t=r.charAt(0).toUpperCase()+r.slice(1)}}return e.click(),document.body.click(),$e=t,t}catch(e){return console.warn("Sherlock falhou:",e),"Consultor"}}function ct(){return $e||"Consultor"}function Et(e){let t=new Date,n=t.getHours(),o=t.getDay(),r="Ol\xE1",a="";n>=5&&n<12?(r="Bom dia",a='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#FBBC05" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):n>=12&&n<18?(r="Boa tarde",a='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#EA4335" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="M4.93 4.93l1.41 1.41"></path><path d="M17.66 17.66l1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="M4.93 19.07l1.41-1.41"></path><path d="M17.66 6.34l1.41-1.41"></path></svg>'):(r="Boa noite",a='<svg class="weather-icon" viewBox="0 0 24 24" fill="none" stroke="#8AB4F8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>');let s=[];n>=0&&n<5?s=["Guerreiro da madrugada.","O mundo dorme, voc\xEA avan\xE7a.","Foco total."]:n<12?o===1?s=["Vamos definir o tom da semana.","Nova semana, novas conquistas."]:o===5?s=["O \xFAltimo g\xE1s antes do descanso.","Vamos fechar com chave de ouro."]:s=["Que seu dia seja produtivo.","Foco e caf\xE9 para hoje."]:n<18?s=["Mantenha o ritmo.","Tarde produtiva pela frente.","Seguimos avan\xE7ando."]:s=["Encerrando o dia com produtividade.","Excelente dedica\xE7\xE3o."],(o===0||o===6)&&(s=["Sua dedica\xE7\xE3o no fim de semana \xE9 inspiradora.","Trabalho excepcional."]);let i=s[Math.floor(Math.random()*s.length)];return{prefix:`${r},`,name:e,suffix:i,icon:a,isFriday:o===5}}function dt(){let e="Cliente",t="[INSERIR URL]";try{let o=document.evaluate("//div[contains(text(), 'Given name')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(o&&o.nextElementSibling){let r=o.nextElementSibling.innerText.trim();r&&(e=r)}}catch(n){console.warn("Falha ao capturar Nome:",n)}try{let o=document.evaluate("//div[contains(text(), 'Website')]",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;if(o&&o.nextElementSibling){let r=o.nextElementSibling.innerText.trim();r&&(t=r)}}catch(n){console.warn("Falha ao capturar Website:",n)}return{advertiserName:e,websiteUrl:t,agentName:ct()}}var wt=1e4;function Ot(){if(document.getElementById("google-font-roboto")&&document.getElementById("techsol-global-styles"))return;let e=document.createElement("link");e.id="google-font-roboto",e.href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",e.rel="stylesheet",document.head.appendChild(e);let t=document.createElement("style");t.id="techsol-global-styles",t.textContent=`
        /* Rollbar e Ajustes Globais */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        ::-webkit-scrollbar-thumb { background: #dadce0; border-radius: 10px; } /* Cinza Google */
        ::-webkit-scrollbar-thumb:hover { background: #bdc1c6; }
        
        /* FONTE GOOGLE OFICIAL */
        body, button, input, select, textarea, .cw-pill, .cw-module, .cw-btn::after {
            font-family: 'Google Sans', 'Roboto', sans-serif !important;
        }

        input:focus, textarea:focus, select:focus {
            outline: none !important;
            border-color: #1a73e8 !important;
            box-shadow: 0 0 0 1px #1a73e8 !important;
        }
        button:active { transform: translateY(1px); }
        textarea.bullet-textarea { padding-left: 10px; }
        
        /* Classes utilit\xE1rias do Script Assistant */
        .csa-group-container { border-left: 3px solid transparent; padding-left: 5px; transition: all 0.3s ease-out; }
        .csa-group-title { transition: color 0.3s ease-out; }
        .csa-group-container.csa-group-completed { border-left: 3px solid #34a853; }
        .csa-group-container.csa-group-completed .csa-group-title { color: #34a853; }
        
        .csa-li { 
            margin: 8px 0 !important; 
            padding: 8px 10px; border-radius: 6px; border: 2px solid transparent;
            transition: all 0.2s ease; font-size: 14px; cursor: pointer; user-select: none;
            background-color: #f8f9fa; color: #202124; line-height: 1.4;
            text-decoration: none; transform: scale(1);
        }
        .csa-li:hover { background-color: #f1f3f4; transform: scale(1.02); }
        .csa-li.csa-completed { text-decoration: line-through; color: #5f6368; transform: scale(0.98); }
    `,document.head.appendChild(t)}function K(e,t={}){let n=document.createElement("div");Object.assign(n.style,{position:"fixed",bottom:"24px",left:"50%",transform:"translateX(-50%) translateY(20px)",background:t.error?"#d93025":"#323232",color:"#fff",padding:"14px 24px",borderRadius:"4px",boxShadow:"0 2px 8px rgba(0,0,0,.3)",fontFamily:"'Google Sans', 'Roboto'",fontSize:"14px",lineHeight:"20px",zIndex:"9999999",opacity:"0",transition:"opacity .3s ease, transform .3s ease"}),n.textContent=e,document.body.appendChild(n),requestAnimationFrame(()=>{n.style.opacity="1",n.style.transform="translateX(-50%) translateY(0)"}),setTimeout(()=>{n.style.opacity="0",n.style.transform="translateX(-50%) translateY(20px)",setTimeout(()=>n.remove(),300)},t.duration||4e3)}function kt(e,t=null){let n=0,o=0,r=0,a=0,s=t||e;s.style.cursor="grab",s.onmousedown=i;function i(y){if(["INPUT","TEXTAREA","SELECT","BUTTON"].includes(y.target.tagName)||y.target.classList.contains("no-drag"))return;y=y||window.event,s.style.cursor="grabbing";let m=e.getBoundingClientRect();e.style.left=m.left+"px",e.style.top=m.top+"px",e.style.right="auto",e.style.bottom="auto",e.style.width||(e.style.width=m.width+"px"),wt++,e.style.zIndex=wt,r=y.clientX,a=y.clientY,e.setAttribute("data-dragging","false"),document.onmouseup=S,document.onmousemove=p}function p(y){y=y||window.event,y.preventDefault(),n=r-y.clientX,o=a-y.clientY,r=y.clientX,a=y.clientY,e.setAttribute("data-dragging","true"),e.style.top=e.offsetTop-o+"px",e.style.left=e.offsetLeft-n+"px"}function S(){document.onmouseup=null,document.onmousemove=null,s.style.cursor="grab",setTimeout(()=>{e.setAttribute("data-dragging","false")},100)}}var he={position:"fixed",top:"calc(50% - 250px)",width:"380px",maxHeight:"90vh",zIndex:"9999",overflow:"hidden",display:"flex",flexDirection:"column",opacity:"0",transform:"scale(0.05)",pointerEvents:"none",fontFamily:"'Google Sans', 'Roboto'"};var De={display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},Ge={width:"100%",padding:"10px 36px 10px 12px",borderRadius:"8px",border:"1px solid #dadce0",backgroundColor:"#fff",fontSize:"14px",color:"#3c4043",boxSizing:"border-box",appearance:"none",backgroundImage:"url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%233c4043%22%20d%3D%22M287%20197.3l-116.5-116.5c-4.7-4.7-12.4-4.7-17.1%200L5.4%20197.3c-4.7%204.7-4.7%2012.4%200%2017.1l17.1%2017.1c4.7%204.7%2012.4%204.7%2017.1%200l94.3-94.3c4.7-4.7%2012.4-4.7%2017.1%200l94.3%2094.3c4.7%204.7%2012.4%204.7%2017.1%200l17.1-17.1c4.7-4.7%204.7-12.4%200-17.1z%22%2F%3E%3C%2Fsvg%3E')",backgroundRepeat:"no-repeat",backgroundPosition:"right 12px center",backgroundSize:"10px",transition:"border-color 0.2s ease, box-shadow 0.2s ease",fontFamily:"'Google Sans', 'Roboto'"};var Ye={fontSize:"10px",color:"#9aa0a6",textAlign:"center",padding:"8px 16px",borderTop:"1px solid #eee",marginTop:"16px"};var ie={padding:"6px 12px",cursor:"pointer",fontSize:"14px",fontWeight:"500",color:"#5f6368",background:"#f8f9fa",transition:"all 0.2s ease",width:"100%",textAlign:"center"};var pt=[{background:"#E8F0FE",color:"#1967D2"},{background:"#FCE8E6",color:"#C5221F"},{background:"#FEF7E0",color:"#F29900"},{background:"#E6F4EA",color:"#1E8E3E"}],Tt=-1;function Fe(){let e=Math.floor(Math.random()*pt.length);return e===Tt&&(e=(e+1)%pt.length),Tt=e,pt[e]}var me=e=>new Promise(t=>setTimeout(t,e));async function Wt(e,t){if(!e)return;e.style.opacity="1",e.innerHTML='<span class="cursor">|</span>';let n=e.querySelector(".cursor");await me(200);for(let o=0;o<t.length;o++){let r=t.charAt(o),a=document.createElement("span");a.textContent=r,n&&n.parentNode===e?n.before(a):e.appendChild(a);let s=Math.floor(Math.random()*60)+30;o===0&&(s=150),o>t.length-3&&(s=30),await me(s)}await me(600),n&&(n.style.display="none")}async function ut(){if(document.getElementById("techsol-splash-screen"))return;if(!document.getElementById("google-splash-style")){let t=document.createElement("style");t.id="google-splash-style",t.innerHTML=`
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
    `,document.body.appendChild(e),requestAnimationFrame(()=>e.style.opacity="1");try{await me(200);let t=await At(),n=Et(t),o=e.querySelector("#w-icon"),r=e.querySelector("#p1"),a=e.querySelector("#p2"),s=e.querySelector("#p3"),i=e.querySelector("#p-sextou");o&&(o.innerHTML=n.icon),r&&(r.textContent=n.prefix),s&&(s.textContent=n.suffix),await me(300);let p=o?o.querySelector("svg"):null;if(p&&(p.style.opacity="1",p.style.transform="scale(1)"),await me(400),r&&(r.style.opacity="1"),a&&await Wt(a,n.name),s&&(s.style.opacity="1",s.style.transform="translateY(0)"),n.isFriday&&i){await me(400),i.style.display="block",i.offsetWidth;let S=i.querySelector(".sextou-badge");S&&(S.style.opacity="1",S.style.transform="scale(1)")}await me(1500)}catch(t){console.warn("Splash error, skipping...",t)}finally{e.classList.add("splash-exit"),await me(900),e.parentNode&&e.parentNode.removeChild(e)}}var be={pt:{idioma:"Idioma:",fluxo:"Fluxo:",status_principal:"Status Principal:",select_status:"-- Selecione --",substatus:"Substatus:",select_substatus:"-- Selecione o Status --",cenarios_comuns:"Cen\xE1rios Comuns",selecione_tasks:"Selecione as Tasks",preencha_detalhes:"Preencha os Detalhes",copiar:"Copiar",preencher:"Preencher",copiado_sucesso:"Texto copiado com sucesso",inserido_copiado:"Texto inserido e copiado!",campo_nao_encontrado:"Campo n\xE3o encontrado. O texto j\xE1 foi copiado.",caso_portugal:"Caso de Portugal?",consentiu_gravacao:"Anunciante consentiu com a grava\xE7\xE3o da reuni\xE3o?",sim:"Sim",nao:"N\xE3o",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Task(s) solicitada(s):",passos_executados:"Seguimos com os passos:",resultado:"Resultado:",duvidas:"D\xFAvidas do anunciante:",problemas:"Problema inicial:",resolucoes:"Resolu\xE7\xF5es/Explica\xE7\xF5es:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tasks implementadas na call:",proximos_passos:"Pr\xF3ximos passos (Acompanhamento):",consideracoes:"Considera\xE7\xF5es adicionais:",contexto_call:"Contexto/O que foi feito:",impedimento_cliente:"Impedimento / Pr\xF3ximo passo (Anunciante):",minha_acao:"Minha A\xE7\xE3o:",dia:"Dia do Follow-up (se aplic\xE1vel):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Data do reagendamento:",multiple_cids:"Multiple CIDs:"},es:{idioma:"Idioma:",fluxo:"Flujo:",status_principal:"Estado Principal:",select_status:"-- Seleccione --",substatus:"Subestado:",select_substatus:"-- Seleccione el Estado --",cenarios_comuns:"Escenarios Comunes",selecione_tasks:"Seleccionar Tareas",preencha_detalhes:"Rellene los Detalles",copiar:"Copiar",preencher:"Rellenar",copiado_sucesso:"Texto copiado con \xE9xito",inserido_copiado:"\xA1Texto insertado y copiado!",campo_nao_encontrado:"Campo no encontrado. El texto ya ha sido copiado.",caso_portugal:"\xBFCaso de Portugal?",consentiu_gravacao:"\xBFEl anunciante consinti\xF3 la grabaci\xF3n de la reuni\xF3n?",sim:"S\xED",nao:"No",speakeasy_id:"Speakeasy ID:",on_call:"On Call (Call Started) signaled on time?",tasks_solicitadas:"Tarea(s) solicitada(s):",passos_executados:"Seguimos con los pasos:",resultado:"Resultado:",duvidas:"Dudas del anunciante:",problemas:"Problema inicial:",resolucoes:"Resoluciones/Explicaciones:",gtm_ga4_verificado:"GTM/GA4 Verificado:",tasks_implementadas_call:"Tareas implementadas en la call:",proximos_passos:"Pr\xF3ximos pasos (Seguimiento):",consideracoes:"Consideraciones adicionales:",contexto_call:"Contexto/Qu\xE9 se hizo:",impedimento_cliente:"Impedimento / Pr\xF3ximo paso (Anunciante):",minha_acao:"Mi Acci\xF3n:",dia:"D\xEDa de Follow-up (si aplica):",screenshots:"Screenshots:",comentarios:"OnCall Comments:",motivo_reagendamento:"OnCall Comments:",data_reagendamento:"Fecha de reprogramaci\xF3n:",multiple_cids:"Multiple CIDs:"}},Ne={gtm_installation:{name:"GTM Installation",popular:!0,screenshots:{implementation:["GTM Instalado","Vinculador de convers\xF5es"],education:[]}},ads_conversion_tracking:{name:"Ads Conversion Tracking",popular:!0,screenshots:{implementation:["Tag criada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Status Ads"],education:["Screenshot for TAG assistant of tag working:","Screenshot of conversion tracking status in Google Ads:"]}},ads_enhanced_conversions:{name:"Ads Enhanced Conversions (ECW4)",popular:!0,screenshots:{implementation:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"],education:["Termos aceitos no Ads","Tag implementada","Teste GTM","Teste Ads","Vers\xE3o Publicada","Painel do Ads (ap\xF3s 7 dias)"]}},ga4_event_tracking:{name:"Analytics Event Tracking (GA4)",popular:!0,screenshots:{implementation:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"],education:["Tag do evento GA4 implementado no GTM","Teste GTM (tagassistant.google.com)","Teste GA4 (DebugView - tagassistant.google.com)","Vers\xE3o publicada no GTM","(Se houver par\xE2metros) Dimens\xF5es customizadas criadas no GA4","Evento marcado como principal no GA4","GA4 e Google Ads vinculados corretamente","Evento principal GA4 importado no Google Ads (como secund\xE1rio)","M\xE9tricas app & web ativadas no Google Ads","(Opcional) Teste no Relat\xF3rio do Tempo Real (GA4)"]}},upd_for_ga4:{name:"UPD for GA4 (User-Provided Data)",popular:!0,screenshots:{implementation:["Valida\xE7\xE3o: Conta GA4 (somente fluxo web, n\xE3o \xE9 setor de sa\xFAde)",'"Coleta de dados fornecidos pelo usu\xE1rio" habilitado no GA4 (Admin > Coleta de Dados)',"Confirma\xE7\xE3o de coleta de dados (UI)","Tag do evento GA4 otimizado (UPD) implementado no GTM","Teste GTM (tagassistant - par\xE2metro 'em' sem erro)","Teste GA4 (DebugView - tagassistant)","Vers\xE3o publicada no GTM","(Treinamento) Evento principal importado no Google Ads como secund\xE1rio"],education:[]}},ads_website_call_conversion:{name:"Google Ads Website Call Conversion",screenshots:{implementation:["Tag implementado no GTM","Vers\xE3o publicada no GTM","Teste do disparo da etiqueta de configura\xE7\xE3o no tag assistant em mais de uma p\xE1gina, mostrando ID e r\xF3tulo","Teste usando o #google-wcc-debug","Mudan\xE7a do status da convers\xE3o no Google Ads [Aguardar alguns minutos]"],education:[]}},ads_remarketing:{name:"Ads Remarketing",screenshots:{implementation:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."],education:["Tag assistant companion to reflect Remarketing tag firing on all the pages (verify the tags on at least two landing pages)","Conversion ID from Tag Assistant Companion matching the Conversion ID on Google Ads","Audiences in Google Ads(All Visitors/All Users or Custom-created lists) populating data."]}},ads_dynamic_remarketing:{name:"Ads Dynamic Remarketing",screenshots:{implementation:["Remarketing tag implemented firing on more than 2 pages on the website using Tag Assistant.","Business vertical chosen in Google Ads.","Dynamic Remarketing enabled on Merchant center for retail.","Implementation of Dynamic Remarketing Tags on the website/GTM.","Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"],education:["Validating Dynamic Remarketing Tags using Tag Assistant.","Validating the product specific data(such as product ID, item ID, etc) from the product/service and cart pages... matching those against the attributes... The IDs/values must match.","Dynamic Remarketing audiences populating on Google Ads"]}},ga4_setup:{name:"Analytics Set Up (GA4)",screenshots:{implementation:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"],education:["Implementation of GA4 tag on the Website/GTM","Tag Assistant to reflect GA4 implemented firing on all the pages - Verify it on at least 2 landing pages via Tag Assistant Companion.","GA4 and Google Ads Linked.","GA4 web metrics enabled"]}},ga4_standard_remarketing:{name:"GA4 Standard Remarketing",screenshots:{implementation:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"],education:["Google signals in GA4 enabled.","User data acknowledgement in GA4 checked.","GA4 linked to the correct Google Ads Account","Custom Audience(if requested) set up.","GA4 audience lists imported to Google Ads populating data"]}},ga4_ecommerce_tracking:{name:"Analytics eCommerce Tracking (GA4)",screenshots:{implementation:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."],education:["eCommerce Tag set up using gTag or GTM.","Tag Assistant to reflect all of the eCommerce parameters passed are extracting right values.","Monetization reports in GA4 recording purchases.","Purchase conversion imported to the right Google Ads account.","Ensuring GA4 web metrics are enabled."]}},ga4_cross_domain_tracking:{name:"Analytics Cross-domain Tracking (GA4)",screenshots:{implementation:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."],education:["Tag Assistant to reflect all the domains are tagged with the same GA4.","Domains added for cross-domain configuration in GA4 UI.","Adding domains into Unwanted Referrals.","Validating by checking the _gl parameter on the second domain URL when a certain action on the first domain redirects to the second domain.","Validating the _ga cookie values are same on both the domains from the application tab in the developer tools."]}},fix_sitewide_tagging:{name:"FIX SITEWIDE TAGGING (OGT & CT)",screenshots:{implementation:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"],education:["1. OGT (gTag/GTM com tag de vinculador de convers\xE3o) adicionado em todas as p\xE1ginas","2. A codifica\xE7\xE3o autom\xE1tica (auto tagging) est\xE1 habilitada no Google Ads (Admin > Config. da Conta)",'3. [Se for GTM] O vinculador de convers\xE3o est\xE1 presente e o acionador definido para disparar em "Todas as P\xE1ginas".',"4. O gclid est\xE1 sendo mantido sem redirecionamentos e armazenado no cookie _gcl_aw na landing page?","5. O gclid foi passado para a p\xE1gina de convers\xE3o?"]}}},Pe={AS_Reschedule_1:{status:"AS",name:"AS - Reschedule 1",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},AS_Acceptable_Reschedule:{status:"AS",name:"AS - Acceptable Reschedule",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceit\xE1vel.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Inputs:{status:"NI",name:"NI - Awaiting Inputs",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplic\xE1vel):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_In_Consult:{status:"NI",name:"NI - In Consult",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},NI_Awaiting_Validation:{status:"NI",name:"NI - Awaiting Validation",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Valida\xE7\xF5es no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Pr\xF3ximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considera\xE7\xF5es adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},NI_Attempted_Contact:{status:"NI",name:"NI - Attempted Contact",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Pr\xF3ximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha A\xE7\xE3o:</b><br>  {MINHA_ACAO}<br>  <b>Considera\xE7\xF5es adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Infeasible:{status:"IN",name:"IN - Infeasible",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Reachable:{status:"IN",name:"IN - Not Reachable",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Interested:{status:"IN",name:"IN - Not Interested",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Not_Ready:{status:"IN",name:"IN - Not Ready",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Rerouted:{status:"IN",name:"IN - Out of Scope - Rerouted to Internal Team",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Unable_to_Transfer:{status:"IN",name:"IN - Out of Scope - Unable to Transfer",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Out_of_Scope_Email_to_Seller:{status:"IN",name:"IN - Out of Scope - Email to Seller",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},IN_Troubleshooting_Transferred:{status:"IN",name:"IN - Troubleshooting [Transferred]",requiresTasks:!1,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}"},SO_Implementation_Only:{status:"SO",name:"SO - Implementation Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Education_Only:{status:"SO",name:"SO - Education Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar d\xFAvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>D\xFAvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"},SO_Troubleshooting_Only:{status:"SO",name:"SO - Troubleshooting Only",requiresTasks:!0,template:"<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}{CASO_PORTUGAL}{CONSENTIU_GRAVACAO}<b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da convers\xE3o.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resolu\xE7\xF5es/Explica\xE7\xF5es:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}"}},We={AS_Reschedule_1:"ts as resched1",AS_Acceptable_Reschedule:"ts as reschedok",NI_Awaiting_Inputs:"ts ni ai",NI_In_Consult:"ts ni ic",NI_Awaiting_Validation:"ts ni av",NI_Attempted_Contact:"ts ni ac",IN_Infeasible:"ts in inf",IN_Not_Reachable:"ts in nrch",IN_Not_Interested:"ts in ni",IN_Not_Ready:"ts in nrdy",IN_Out_of_Scope_Rerouted:"ts in oost",IN_Out_of_Scope_Unable_to_Transfer:"ts in oosu",IN_Out_of_Scope_Email_to_Seller:"ts in oos seller",IN_Troubleshooting_Transferred:null,SO_Implementation_Only:"ts so verif",SO_Verified_No_Recent_Conversion:"ts so verif nrc",SO_Unverified:"ts so unv",SO_Education_Only:"ts so Edu",SO_Troubleshooting_Only:"ts so trbl"},je=["TASKS_SOLICITADAS","PASSOS_EXECUTADOS","RESULTADO","DUVIDAS","PROBLEMAS","RESOLUCOES","TASKS_IMPLEMENTADAS_CALL","PROXIMOS_PASSOS","CONTEXTO_CALL","IMPEDIMENTO_CLIENTE","MINHA_ACAO","SCREENSHOTS","MOTIVO_REAGENDAMENTO"],mt=["CONSIDERACOES","COMENTARIOS"],_e={"quickfill-ni-inicio-manual":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6)"},"quickfill-ni-cms-access":{type:"all","field-REASON_COMMENTS":"Aguardando informa\xE7\xF5es por parte do anunciante (In\xEDcio 2/6 - Sem Acesso ao CMS)","field-TASKS_SOLICITADAS":`\u2022 Instala\xE7\xE3o do GTM
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
\u2022 Tentativa 3 - `,"field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-2-6-final":{type:"all","field-REASON_COMMENTS":"Finaliza\xE7\xE3o (2/6)","field-SPEAKEASY_ID":"-","field-ON_CALL":"-","field-COMENTARIOS":"\u2022 Dia 9 finaliza\xE7\xE3o do 2/6, durante o per\xEDodo do acompanhamento n\xE3o houve retorno do anunciante, ent\xE3o o caso ser\xE1 encerrado.","field-SCREENSHOTS":"\u2022 N/A","field-GTM_GA4_VERIFICADO":"N/A"},"quickfill-in-manual":{type:"all","field-REASON_COMMENTS":"Outro (Manual)","field-GTM_GA4_VERIFICADO":"N/A"}};var ae=e=>new Promise(t=>setTimeout(t,e));function xe(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>e.dispatchEvent(new MouseEvent(n,t)))}function Xe(){return Array.from(document.querySelectorAll('[id="email-body-content-top-content"]')).find(t=>{let n=t.offsetParent!==null,o=t.closest("case-message-view")!==null,r=t.closest(".editor")!==null||t.closest("write-card")!==null;return n&&!o&&r})}async function It(){let e=!1,n=Array.from(document.querySelectorAll("i.material-icons-extended")).find(i=>i.innerText.trim()==="email");if(n&&n.offsetParent!==null){let i=n.closest("material-button")||n.closest("material-fab")||n;i.style&&(i.style.display="block",i.style.visibility="visible"),xe(i),e=!0}else{let i=document.querySelector("material-fab-speed-dial");if(i){let p=i.querySelector(".trigger");if(p){p.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),xe(p),await ae(1e3);let y=Array.from(document.querySelectorAll("i.material-icons-extended")).find(m=>m.innerText.trim()==="email");y&&(xe(y),e=!0)}else i.click()}}let o=0,r=Xe();for(console.log("\u23F3 Aguardando editor EDIT\xC1VEL...");!r&&o<30;)await ae(500),r=Xe(),o++;if(!r)return K("Erro: Editor de email n\xE3o apareceu.",{error:!0}),!1;let s=Array.from(document.querySelectorAll('material-button[debug-id="discard-prewrite-draft-button"]')).find(i=>i.offsetParent!==null);if(s){console.log("\u26A0\uFE0F Rascunho detectado. Clicando em Discard..."),xe(s);let i=null,p=0;for(;!i&&p<10;)await ae(200),i=Array.from(document.querySelectorAll('material-button[debug-id="confirm-button"]')).find(y=>y.offsetParent!==null),p++;i?(console.log("\u2705 Confirmando descarte..."),xe(i),await ae(2500)):console.warn("\u26A0\uFE0F Cliquei em Discard, mas o bot\xE3o Confirm n\xE3o apareceu.")}if(r){let i=r.closest('[id="email-body-content-top"]'),S=(r.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');if(i){if(S){let m=S.closest('[aria-hidden="true"]');m&&m.removeAttribute("aria-hidden"),S.focus()}await ae(300),i.innerHTML=`
                <div id="email-body-content-top-content" style="font:normal 13px/17px Roboto,sans-serif;display:block">
                    <span id="cases-body-field"><br></span>
                </div>
            `;let y=i.querySelector("#cases-body-field");if(y){let m=document.createRange();m.selectNodeContents(y),m.collapse(!0);let C=window.getSelection();C.removeAllRanges(),C.addRange(m)}return!0}}return K("Erro cr\xEDtico ao acessar editor.",{error:!0}),!1}async function Nt(e){if(!e)return;K("Preparando email...",{duration:3e3});let t=dt();if(!await It())return;await ae(500);let o=document.querySelector('material-button[debug-id="canned_response_button"]');if(o){o.scrollIntoView({behavior:"smooth",block:"center"}),await ae(200),xe(o),await ae(1500);let r=document.querySelector("material-auto-suggest-input input");if(r){xe(r),await ae(200),document.execCommand("insertText",!1,e),r.dispatchEvent(new Event("input",{bubbles:!0}));let a=null,s=0;for(;s<20;){await ae(500),s++;let i=Array.from(document.querySelectorAll("material-select-dropdown-item"));if(i.length>0&&(a=i.find(p=>p.innerText.toLowerCase().includes(e.toLowerCase())),!a&&i.length===1&&(a=i[0]),a))break}if(a){let i=function(m,C){if(m.nodeType===3&&m.nodeValue.includes(C))return m;if(!m.childNodes)return null;for(let b of m.childNodes){let x=i(b,C);if(x)return x}return null};xe(a),await ae(2e3);let p=Xe(),S=p?p.closest('[id="email-body-content-top"]'):document.body,y=i(S,"{%ADVERTISER_NAME%}");if(y){let m=document.createRange(),C=y.nodeValue.indexOf("{%ADVERTISER_NAME%}");m.setStart(y,C),m.setEnd(y,C+19);let b=window.getSelection();b.removeAllRanges(),b.addRange(m),document.execCommand("insertText",!1,t.advertiserName),K("Email preenchido!")}else K("Email inserido (Nome n\xE3o substitu\xEDdo).")}else K(`Template '${e}' n\xE3o encontrado.`,{error:!0})}}else K("Bot\xE3o Canned Response n\xE3o achado.",{error:!0})}async function bt(e){console.log(`\u{1F680} Iniciando automa\xE7\xE3o (Quick): ${e.name}`),K("Preparando email...",{duration:3e3});let t=dt(),n=ct();if(!await It())return;await ae(600);let r=document.querySelector('input[aria-label="Subject"]');r&&e.subject&&(r.focus(),Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set.call(r,e.subject),r.dispatchEvent(new Event("input",{bubbles:!0})),await ae(300));let a=Xe();if(a){let i=(a.closest(".email-body-content")||document.body).querySelector('div[contenteditable="true"][aria-label="Email body"]');i&&(i.focus(),i.click(),i.dispatchEvent(new Event("input",{bubbles:!0}))),await ae(400);let p=new Date;p.setDate(p.getDate()+3);let S=p.getDay();S===6?p.setDate(p.getDate()+2):S===0&&p.setDate(p.getDate()+1);let y=p.toLocaleDateString("pt-BR"),m=e.body;m=m.replace(/\[Nome do Cliente\]/g,t.advertiserName||"Cliente"),m=m.replace(/\[INSERIR URL\]/g,t.websiteUrl||"seu site"),m=m.replace(/\[URL\]/g,t.websiteUrl||"seu site"),m=m.replace(/\[Seu Nome\]/g,n),m=m.replace(/\[MM\/DD\/YYYY\]/g,y),document.execCommand("insertHTML",!1,m),i&&(i.dispatchEvent(new Event("input",{bubbles:!0})),i.dispatchEvent(new Event("change",{bubbles:!0}))),K("Email preenchido com sucesso!",{duration:2e3}),await ae(800)}else K("Erro ao focar no editor.",{error:!0})}var Xt={height:"56px",padding:"0 20px",backgroundColor:"rgba(28, 28, 32, 0.85)",backdropFilter:"blur(12px)",webkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(255, 255, 255, 0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",color:"#E8EAED",fontFamily:"'Google Sans', Roboto, sans-serif",fontWeight:"500",letterSpacing:"0.5px",cursor:"grab",position:"relative",borderRadius:"16px 16px 0 0",flexShrink:"0",userSelect:"none",boxSizing:"border-box"},_t={width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",cursor:"pointer",color:"#9AA0A6",transition:"all 0.2s ease"};function ye(e,t,n,o,r,a){let s=document.createElement("div");Object.assign(s.style,Xt),kt(e,s);let i=document.createElement("div");Object.assign(i.style,{position:"absolute",bottom:"0",left:"0",width:"100%",height:"2px",background:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",zIndex:"10",opacity:"0.8"}),s.appendChild(i),r&&(r.googleLine=i);let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center",gap:"12px"});let S=document.createElement("img");S.src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",Object.assign(S.style,{width:"20px",height:"20px",pointerEvents:"none"});let y=document.createElement("span");y.textContent=t,p.appendChild(S),p.appendChild(y);let m=document.createElement("div");Object.assign(m.style,{display:"flex",alignItems:"center",gap:"4px"});let C='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',b='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',x=document.createElement("div");x.innerHTML=C,Object.assign(x.style,_t),x.title="Sobre",x.classList.add("no-drag"),x.onmouseenter=()=>{x.style.background="rgba(255,255,255,0.1)",x.style.color="#FFF"},x.onmouseleave=()=>{x.style.color!=="rgb(138, 180, 248)"&&(x.style.background="transparent",x.style.color="#9AA0A6")};let A=document.createElement("div");A.innerHTML=b,Object.assign(A.style,_t),A.title="Fechar",A.classList.add("no-drag"),A.onmouseenter=()=>{A.style.background="rgba(242, 139, 130, 0.2)",A.style.color="#F28B82"},A.onmouseleave=()=>{A.style.background="transparent",A.style.color="#9AA0A6"},A.onmousedown=I=>I.stopPropagation(),x.onmousedown=I=>I.stopPropagation(),A.onclick=a;let E=Kt(e,t,n,o);return x.onclick=I=>{I.stopPropagation(),E.style.opacity==="1"?(E.style.opacity="0",E.style.pointerEvents="none",x.style.color="#9AA0A6",x.style.background="transparent"):(E.style.opacity="1",E.style.pointerEvents="auto",x.style.color="#8AB4F8",x.style.background="rgba(138, 180, 248, 0.1)")},m.appendChild(x),m.appendChild(A),s.appendChild(p),s.appendChild(m),s}function Kt(e,t,n,o){let r=document.createElement("div");return Object.assign(r.style,{position:"absolute",top:"56px",left:"0",width:"100%",height:"calc(100% - 56px)",backgroundColor:"rgba(255, 255, 255, 0.95)",backdropFilter:"blur(5px)",zIndex:"50",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",textAlign:"center",padding:"24px",boxSizing:"border-box",opacity:"0",transition:"opacity 0.2s ease",pointerEvents:"none",borderRadius:"0 0 16px 16px"}),r.innerHTML=`
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
    `,setTimeout(()=>{let a=r.querySelector("#close-help-internal");a&&(a.onmouseover=()=>a.style.backgroundColor="#f8f9fa",a.onmouseout=()=>a.style.backgroundColor="white",a.onclick=()=>{r.style.opacity="0",r.style.pointerEvents="none"})},0),e.appendChild(r),r}if(!document.getElementById("cw-module-styles")){let e=document.createElement("style");e.id="cw-module-styles",e.innerHTML=`
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
    `,document.head.appendChild(e)}function ve(e,t,n){let o=document.getElementById(n);t.classList.contains("cw-module-window")||t.classList.add("cw-module-window");let r=()=>{if(!o)return;let a=o.getBoundingClientRect(),s=a.left+a.width/2,i=a.top+a.height/2,p=t.offsetLeft,S=t.offsetTop,y=s-p,m=i-S;t.style.transformOrigin=`${y}px ${m}px`};e?(r(),t.style.opacity="",t.style.pointerEvents="",t.style.transform="",t.offsetWidth,t.classList.add("open"),t.classList.remove("idle"),o&&o.classList.add("active"),Qt(t,n)):(r(),t.classList.remove("open"),t.classList.remove("idle"),o&&o.classList.remove("active"),Lt(t))}function Qt(e,t){Lt(e);let n=o=>{if(!e.classList.contains("open"))return;let r=e.contains(o.target),a=document.querySelector(".cw-pill"),s=a&&a.contains(o.target);r?(e.classList.remove("idle"),e.style.zIndex="2147483648"):s||(e.classList.add("idle"),e.style.zIndex="2147483646")};e._idleHandler=n,document.addEventListener("mousedown",n)}function Lt(e){e._idleHandler&&(document.removeEventListener("mousedown",e._idleHandler),e._idleHandler=null)}var ne={glassBg:"rgba(61, 61, 61, 0.77)",glassBorder:"rgba(255, 255, 255, 0.15)",glassActive:"rgba(79, 79, 79, 0.89)",glassHighlight:"rgba(255, 255, 255, 0.08)",iconIdle:"#c2c5c8ff",gripColor:"linear-gradient(to right, #4285F4, #EA4335, #FBBC05, #34A853)",gripActive:"linear-gradient(to left, #4285F4, #EA4335, #FBBC05, #34A853)",iconActive:"#FFFFFF",blue:"#8AB4F8",red:"#F28B82",purple:"#C58AF9",green:"#81C995"},Ke=e=>new Promise(t=>setTimeout(t,e));function Rt(e){let t="cw-command-center-style";if(!document.getElementById(t)){let b=document.createElement("style");b.id=t,b.innerHTML=`
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
                
                background: ${ne.glassBg};
                backdrop-filter: blur(12px);
                -webkit-backdrop-filter: blur(12px);
                border: 1px solid ${ne.glassBorder};
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
                color: ${ne.iconIdle};
                
                opacity: 0; transform: scale(0.5);
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cw-btn.popped { opacity: 1; transform: scale(1); }

            /* Hover (Feedback t\xE1til leve) */
            .cw-btn:hover { 
                background: ${ne.glassHighlight}; 
                color: ${ne.iconActive}; 
                transform: scale(1.1); 
            }

            /* --- ESTADO ATIVO (O M\xF3dulo est\xE1 aberto) --- */
            /* Mant\xE9m a cor da marca acesa e cria um fundo tintado */
            .cw-btn.notes.active { color: ${ne.blue} !important; background: rgba(138, 180, 248, 0.15); }
            .cw-btn.email.active { color: ${ne.red} !important; background: rgba(242, 139, 130, 0.15); }
            .cw-btn.script.active { color: ${ne.purple} !important; background: rgba(197, 138, 249, 0.15); }
            .cw-btn.links.active { color: ${ne.green} !important; background: rgba(129, 201, 149, 0.15); }
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
            .cw-btn.notes:hover { color: ${ne.blue}; filter: drop-shadow(0 0 5px rgba(138, 180, 248, 0.5)); }
            .cw-btn.email:hover { color: ${ne.red}; filter: drop-shadow(0 0 5px rgba(242, 139, 130, 0.5)); }
            .cw-btn.script:hover { color: ${ne.purple}; filter: drop-shadow(0 0 5px rgba(197, 138, 249, 0.5)); }
            .cw-btn.links:hover { color: ${ne.green}; filter: drop-shadow(0 0 5px rgba(129, 201, 149, 0.5)); }

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
                background-color: ${ne.iconIdle}; 
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
                background-color: ${ne.blue}; /* Azul Google de A\xE7\xE3o */
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
            .cw-dots span:nth-child(1) { background: ${ne.blue}; animation-delay: -0.32s; }
            .cw-dots span:nth-child(2) { background: ${ne.red}; animation-delay: -0.16s; }
            .cw-dots span:nth-child(3) { background: ${ne.green}; }
            
            @keyframes bounce { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

            /* Success Check Animado */
            .cw-check svg { width: 28px; height: 28px; stroke-dasharray: 50; stroke-dashoffset: 50; transition: stroke-dashoffset 0.5s ease 0.2s; }
            .cw-pill.success .cw-check svg { stroke-dashoffset: 0; }
        `,document.head.appendChild(b)}let n={check:'<svg viewBox="0 0 24 24" fill="none" stroke="#81C995" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',notes:'<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',email:'<svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',script:'<svg viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>',links:'<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>'},o=document.createElement("div");o.className="cw-pill side-right",o.innerHTML=`
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
    `;let r=document.createElement("div");r.className="cw-focus-backdrop",document.body.appendChild(r),document.body.appendChild(o),o.querySelector(".notes").onclick=b=>{b.stopPropagation(),e.toggleNotes()},o.querySelector(".email").onclick=b=>{b.stopPropagation(),e.toggleEmail()},o.querySelector(".script").onclick=b=>{b.stopPropagation(),e.toggleScript()},o.querySelector(".links").onclick=b=>{b.stopPropagation(),e.toggleLinks()},(async function(){await Ke(2800),o.classList.add("docked"),await Ke(300);let x=o.querySelectorAll(".cw-btn");o.querySelectorAll(".cw-sep").forEach(E=>E.classList.add("visible"));for(let E=0;E<x.length;E++)x[E].classList.add("popped"),await Ke(90);await Ke(200),o.classList.add("system-check")})();let a=!1,s,i,p,S,y=3;o.onmousedown=b=>{if(b.target.closest("button"))return;b.preventDefault(),s=b.clientX,i=b.clientY;let x=o.getBoundingClientRect();p=x.left,S=x.top,document.addEventListener("mousemove",m),document.addEventListener("mouseup",C)};function m(b){let x=b.clientX-s,A=b.clientY-i;!a&&Math.sqrt(x*x+A*A)>y&&(a=!0,o.style.transition="none"),a&&(o.style.left=`${p+x}px`,o.style.top=`${S+A}px`,o.style.right="auto",o.style.bottom="auto",o.style.transform="none")}function C(b){if(document.removeEventListener("mousemove",m),document.removeEventListener("mouseup",C),a){a=!1,o.style.transition="left 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s ease";let x=window.innerWidth,A=window.innerHeight,E=o.getBoundingClientRect(),I=E.left+E.width/2,F;I<x/2?(F=24,o.classList.remove("side-right"),o.classList.add("side-left")):(F=x-E.width-24,o.classList.remove("side-left"),o.classList.add("side-right"));let q=E.top;q<24&&(q=24),q>A-E.height-24&&(q=A-E.height-24),o.style.left=`${F}px`,o.style.top=`${q}px`,setTimeout(()=>{},600)}else{let x=b.target.closest("button");x&&(x.style.transform="scale(0.9)",setTimeout(()=>x.style.transform="",150))}}}function Qe(){let e=document.querySelector(".cw-pill"),t=document.querySelector(".cw-focus-backdrop"),n=document.getElementById("cw-loader"),o=document.getElementById("cw-success");if(!e||!n||!o)return()=>{};let r=Date.now();return e.classList.add("processing"),t&&t.classList.add("active"),n.style.display="flex",o.style.display="none",function(){let s=Date.now()-r,i=Math.max(0,1500-s);setTimeout(()=>{n.style.display="none",o.style.display="block",o.offsetWidth,e.classList.add("success"),setTimeout(()=>{e.classList.remove("processing","success"),t&&t.classList.remove("active")},2e3)},i)}}var Mt=e=>new Promise(t=>setTimeout(t,e));function Ze(e){if(!e)return;let t={bubbles:!0,cancelable:!0,view:window};["mouseover","mousedown","mouseup","click"].forEach(n=>e.dispatchEvent(new MouseEvent(n,t)))}function gt(e){let t=document.createElement("div");t.style.position="fixed",t.style.left="-9999px",t.innerHTML=e,document.body.appendChild(t);let n=document.createRange();n.selectNodeContents(t);let o=window.getSelection();o.removeAllRanges(),o.addRange(n);try{document.execCommand("copy")}catch{K("Falha ao copiar",{error:!0})}o.removeAllRanges(),document.body.removeChild(t)}function Gt(e){["input","change","keydown","keyup"].forEach(n=>{let o=new Event(n,{bubbles:!0,cancelable:!0});e.dispatchEvent(o)})}function Dt(){return Array.from(document.querySelectorAll('div[contenteditable="true"]'))}async function Ft(){console.log("Iniciando processo de Nova Nota...");let e=Dt(),t=e.length,o=Array.from(document.querySelectorAll("i.material-icons-extended")).find(s=>s.innerText.trim()==="description");if(o){let s=o.closest("material-fab")||o.closest("material-button");s?(s.style&&(s.style.display="block",s.style.visibility="visible"),Ze(s)):Ze(o)}else{let s=document.querySelector("material-fab-speed-dial");if(s){let i=s.querySelector(".trigger");i?(i.dispatchEvent(new MouseEvent("mouseenter",{bubbles:!0})),Ze(i)):s.click(),await Mt(800);let S=Array.from(document.querySelectorAll("i.material-icons-extended")).find(y=>y.innerText.trim()==="description");S&&Ze(S)}}let r=null,a=0;for(;!r&&a<20;){await Mt(300);let s=Dt();if(s.length>t)r=s.find(i=>!e.includes(i)),r||(r=s[s.length-1]);else if(a>10){let i=s.filter(p=>p.offsetParent!==null);i.length>0&&(r=i[i.length-1])}a++}return r}var Zt={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', 'Roboto'",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},yo={...Zt,height:"100px",resize:"vertical"};var ft={width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"};var Jt={marginTop:"16px",marginBottom:"12px",padding:"10px",background:"#fff8e1",borderRadius:"6px",border:"1px solid #ffecb3",display:"none"},eo={fontSize:"12px",color:"#e37400",marginTop:"4px"},to={width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box"},oo={display:"flex",gap:"15px",marginBottom:"10px"};function Pt(){let e=document.createElement("div");e.id="tag-support-container",Object.assign(e.style,Jt);let t=document.createElement("label");t.textContent="Utilizou o Tag Support para criar/verificar?",Object.assign(t.style,De,{marginTop:"0"});let n=document.createElement("div");Object.assign(n.style,oo);let o=document.createElement("input");o.type="radio",o.name="ts_usage_mod",o.value="Sim",Object.assign(o.style,ft);let r=document.createElement("label");r.textContent="Sim";let a=document.createElement("div");Object.assign(a.style,{display:"flex",alignItems:"center"}),a.appendChild(o),a.appendChild(r);let s=document.createElement("input");s.type="radio",s.name="ts_usage_mod",s.value="N\xE3o",s.checked=!0,Object.assign(s.style,ft);let i=document.createElement("label");i.textContent="N\xE3o";let p=document.createElement("div");Object.assign(p.style,{display:"flex",alignItems:"center"}),p.appendChild(s),p.appendChild(i),n.appendChild(a),n.appendChild(p);let S=document.createElement("div");S.style.display="block";let y=document.createElement("label");y.textContent="Qual foi o Motivo?",Object.assign(y.style,De,{fontSize:"12px"});let m=document.createElement("input");m.type="text",Object.assign(m.style,to);let C=document.createElement("div");C.innerHTML='\u26A0\uFE0F <strong>Lembre-se de preencher o Form!</strong> <a href="https://docs.google.com/forms/d/e/1FAIpQLSeP_JM8D-6qHa5ZC93aTzj38WiO5zx8nyrWNPvbZhjJj6CpkA/viewform" target="_blank" style="color:#e37400; text-decoration:underline;">Link aqui</a>',Object.assign(C.style,eo),S.appendChild(y),S.appendChild(m),S.appendChild(C),e.appendChild(t),e.appendChild(n),e.appendChild(S),o.onchange=()=>{S.style.display="none"},s.onchange=()=>{S.style.display="block"};function b(E,I){if(e.style.display="none",!E||E.includes("Education")||!I||I.length===0)return;let F=I.some(l=>l.includes("enhanced")||l==="ec_google_ads"),q=I.some(l=>(l.includes("conversion")||l.includes("ads"))&&!l.includes("enhanced")),g=I.some(l=>l.includes("ga4")||l.includes("analytics")||l.includes("ua")),d=I.some(l=>l.includes("merchant")||l.includes("gmc")||l.includes("shopping"));(F||q&&!g&&!d)&&(e.style.display="block")}function x(){if(e.style.display==="none")return"";let E=`<br><b>Utilizou Tag Support?</b> ${o.checked?"Sim":"N\xE3o"}`;return s.checked&&m.value.trim()!==""&&(E+=`<br><b>Motivo:</b> ${m.value}`),E+="<br>",E}function A(){e.style.display="none",s.checked=!0,o.checked=!1,S.style.display="block",m.value=""}return{element:e,updateVisibility:b,getOutput:x,reset:A}}var O={bg:"#F9FAFB",white:"#FFFFFF",border:"#E5E7EB",textMain:"#111827",textSub:"#6B7280",blue:"#007AFF",blueLight:"#EBF5FF",brands:{ads:{id:"ads",label:"Google Ads",color:"#1967D2",bg:"#E8F0FE",icon:"ads"},ga4:{id:"ga4",label:"Google Analytics 4",color:"#E37400",bg:"#FEF7E0",icon:"ga4"},gtm:{id:"gtm",label:"Tag Manager",color:"#00A1F1",bg:"#E2F4FD",icon:"gtm"},gmc:{id:"gmc",label:"Merchant Center",color:"#0F9D58",bg:"#E6F4EA",icon:"gmc"},default:{id:"gen",label:"Geral",color:"#5F6368",bg:"#F3F4F6",icon:"default"}},shadowCard:"0 1px 2px rgba(0,0,0,0.05)",shadowFloat:"0 -4px 20px rgba(0,0,0,0.08)",font:"'Google Sans', -apple-system, Roboto, sans-serif"},Te={ads:'<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>',ga4:'<svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2v-3h2v3zm4 0h-2v-5h2v5z"/></svg>',gtm:'<svg viewBox="0 0 24 24"><path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"/></svg>',gmc:'<svg viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>',default:'<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>'};function jt(e){let t={};function n(g){let d=g.toLowerCase();return d.includes("ads")||d.includes("conversion")||d.includes("remarketing")?O.brands.ads:d.includes("ga4")||d.includes("analytics")?O.brands.ga4:d.includes("gtm")||d.includes("tag manager")||d.includes("container")?O.brands.gtm:d.includes("merchant")||d.includes("shopping")||d.includes("feed")?O.brands.gmc:O.brands.default}let o=Object.entries(Ne).filter(([g,d])=>d.popular),r={};Object.entries(Ne).forEach(([g,d])=>{if(d.popular)return;let c=n(d.name);r[c.label]||(r[c.label]={brand:c,tasks:[]}),r[c.label].tasks.push({key:g,...d})});let a="cw-zen-tasks";if(!document.getElementById(a)){let g=document.createElement("style");g.id=a,g.innerHTML=`
            .cw-zen-container {
                display: flex; flex-direction: column; height: 100%; width: calc(100% + 32px); margin: -16px;
                font-family: ${O.font}; background: ${O.bg}; position: relative; overflow: hidden;
            }
            
            /* SCROLL AREA */
            .cw-zen-content { flex: 1; overflow-y: auto; padding-bottom: 80px; } /* Espa\xE7o para o Status Bar */

            /* HERO SECTION */
            .cw-hero-section { padding: 20px 24px 0 24px; }
            .cw-hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 12px; }
            .cw-helper-text { font-size: 12px; color: ${O.textSub}; margin-top: 12px; line-height: 1.4; }

            /* HERO CARD */
            .cw-hero-card {
                background: ${O.white}; border-radius: 12px; padding: 10px 12px;
                box-shadow: ${O.shadowCard}; border: 1px solid transparent;
                cursor: pointer; position: relative; height: 60px;
                display: flex; align-items: center; gap: 10px;
                transition: all 0.2s ease;
            }
            .cw-hero-card:hover { transform: translateY(-1px); box-shadow: 0 4px 6px rgba(0,0,0,0.04); }
            .cw-hero-card:active { transform: scale(0.98); }
            
            /* CORRE\xC7\xC3O DO GRID (\xCDmpar ocupa 2 espa\xE7os) */
            .cw-hero-card:last-child:nth-child(odd) { grid-column: span 2; justify-content: center; }
            
            .cw-hero-icon { 
                width: 32px; height: 32px; border-radius: 8px; background: #F3F4F6; color: ${O.textSub};
                display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: all 0.2s;
            }
            .cw-hero-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-hero-label { font-size: 12px; font-weight: 500; color: ${O.textMain}; line-height: 1.2; }

            /* Hero Active */
            .cw-hero-card.active { background: ${O.white}; border-color: ${O.blue}; }
            .cw-hero-card.active .cw-hero-icon { background: ${O.blue}; color: white; }
            .cw-hero-card.active .cw-hero-label { color: ${O.blue}; font-weight: 600; }

            /* Hero Stepper */
            .cw-hero-stepper {
                position: absolute; right: 4px; top: 4px; bottom: 4px;
                background: ${O.white}; border-radius: 8px; padding: 0 4px;
                display: flex; align-items: center; gap: 4px;
                box-shadow: -2px 0 10px rgba(0,0,0,0.05);
                opacity: 0; pointer-events: none; transform: translateX(10px);
                transition: all 0.2s ease;
            }
            .cw-hero-card.active .cw-hero-stepper { opacity: 1; pointer-events: auto; transform: translateX(0); }

            /* LIST SECTION */
            .cw-list-section { padding: 24px 24px; }
            .cw-search-input {
                width: 100%; box-sizing: border-box; padding: 10px 12px 10px 36px;
                border: 1px solid ${O.border}; border-radius: 10px; background: ${O.white};
                font-size: 13px; outline: none;
                background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%239CA3AF" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>');
                background-repeat: no-repeat; background-position: 10px center;
                transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px;
            }
            .cw-search-input:focus { border-color: ${O.blue}; box-shadow: 0 0 0 3px ${O.blueLight}; }

            /* ACCORDION */
            .cw-acc-group { margin-bottom: 8px; border: 1px solid ${O.border}; border-radius: 10px; background: ${O.white}; overflow: hidden; }
            .cw-acc-header {
                padding: 12px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; background: ${O.white}; transition: background 0.1s;
            }
            .cw-acc-header:hover { background: #F9FAFB; }
            .cw-acc-title { font-size: 13px; font-weight: 600; color: ${O.textMain}; display: flex; align-items: center; gap: 8px; }
            .cw-acc-dot { width: 8px; height: 8px; border-radius: 50%; }
            .cw-acc-icon { width: 12px; height: 12px; transition: transform 0.3s; color: ${O.textSub}; font-size: 10px; }
            .cw-acc-group.open .cw-acc-icon { transform: rotate(180deg); }
            .cw-acc-body { display: none; border-top: 1px solid ${O.border}; background: #FAFAFA; }
            .cw-acc-group.open .cw-acc-body { display: block; animation: cwSlideDown 0.2s ease; }

            /* LIST ITEM */
            .cw-task-item {
                padding: 10px 16px; display: flex; align-items: center; justify-content: space-between;
                cursor: pointer; border-bottom: 1px solid #F3F4F6; gap: 12px; min-height: 44px;
            }
            .cw-task-item:last-child { border-bottom: none; }
            .cw-task-item:hover { background: #F3F4F6; }
            .cw-task-item.selected { background: ${O.blueLight}; }
            
            .cw-task-left { display: flex; align-items: center; gap: 12px; flex: 1; }
            .cw-list-icon {
                width: 32px; height: 32px; border-radius: 8px; 
                display: flex; align-items: center; justify-content: center;
                flex-shrink: 0; transition: all 0.2s;
            }
            .cw-list-icon svg { width: 18px; height: 18px; fill: currentColor; }
            .cw-task-label { font-size: 13px; color: ${O.textSub}; transition: color 0.1s; font-weight: 400; line-height: 1.3; }
            .cw-task-item.selected .cw-task-label { color: ${O.blue}; font-weight: 500; }

            /* LIST STEPPER */
            .cw-list-stepper { display: none; align-items: center; gap: 6px; }
            .cw-task-item.selected .cw-list-stepper { display: flex; }

            /* BUTTONS */
            .cw-step-btn {
                width: 24px; height: 24px; border-radius: 6px; background: #F3F4F6;
                color: ${O.textMain}; display: flex; align-items: center; justify-content: center;
                font-size: 14px; font-weight: bold; transition: background 0.1s; cursor: pointer;
            }
            .cw-step-btn:hover { background: #E5E7EB; }
            .cw-step-val { font-size: 13px; font-weight: 600; min-width: 14px; text-align: center; color: ${O.blue}; }

            /* STATUS BAR (Footer) */
            .cw-status-bar {
                position: absolute; bottom: 0; left: 0; width: 100%; box-sizing: border-box;
                padding: 12px 24px; background: rgba(255,255,255,0.92); backdrop-filter: blur(10px);
                border-top: 1px solid ${O.border};
                display: flex; align-items: center; justify-content: space-between;
                transform: translateY(100%); transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: ${O.shadowFloat}; z-index: 10;
            }
            .cw-status-bar.visible { transform: translateY(0); }
            .cw-status-text { font-size: 13px; font-weight: 500; color: ${O.textMain}; }
            
            .cw-footer-icons { display: flex; flex-direction: row-reverse; padding-left: 8px; }
            .cw-mini-icon { 
                width: 24px; height: 24px; border-radius: 50%; border: 2px solid white;
                color: white; display: flex; align-items: center; justify-content: center;
                box-shadow: 0 1px 2px rgba(0,0,0,0.15); position: relative; margin-left: -8px;
            }
            .cw-mini-icon svg { width: 12px; height: 12px; fill: currentColor; }

            @keyframes cwSlideDown { from { opacity: 0; transform: translateY(-5px); } to { opacity: 1; transform: translateY(0); } }

/* ... dentro de style.innerHTML ... */

/* --- SCREENSHOTS: THE LIQUID EXPERIENCE --- */

.cw-screens-container {
    display: flex; flex-direction: column; gap: 20px;
    padding: 4px 4px 40px 4px; /* Respiro para sombras */
}

/* O CART\xC3O (Physical Material) */
.cw-screen-card {
    background: #FFFFFF;
    border-radius: 16px;
    border: 1px solid rgba(0,0,0,0.08);
    /* Sombra suave e difusa (Apple style) */
    box-shadow: 0 4px 24px rgba(0,0,0,0.03);
    padding: 24px;
    position: relative; overflow: hidden;
    transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); /* Elastic Spring */
}

/* Intera\xE7\xE3o com o Cart\xE3o */
.cw-screen-card:hover { transform: translateY(-2px); }
.cw-screen-card:focus-within {
    border-color: rgba(26, 115, 232, 0.4);
    box-shadow: 0 12px 40px rgba(26, 115, 232, 0.15); /* Glow Azul Google */
    transform: translateY(-4px) scale(1.01);
}

/* Header Limpo */
.cw-card-header {
    display: flex; align-items: center; gap: 12px; margin-bottom: 20px;
}
.cw-card-icon {
    width: 32px; height: 32px; border-radius: 10px; background: #F1F3F4;
    display: flex; align-items: center; justify-content: center; color: #5F6368;
}
.cw-card-title-input {
    font-family: ${O.font}; font-size: 15px; font-weight: 600; color: ${O.textMain};
    border: none; background: transparent; width: 100%; outline: none;
}

/* GRUPO DE INPUTS */
.cw-input-group { margin-bottom: 16px; position: relative; }

.cw-input-label {
    display: block; font-size: 11px; font-weight: 700; color: ${O.textSub};
    margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.8px;
    transition: color 0.3s;
}
.cw-input-group:focus-within .cw-input-label { color: ${O.brands.ads.color}; }

/* O INPUT (A Estrela do Show) */
.cw-input-wrapper { position: relative; width: 100%; }

.cw-input-field {
    width: 100%; box-sizing: border-box;
    padding: 14px 16px;
    border-radius: 12px;
    border: 2px solid #F1F3F4; /* Borda grossa e suave */
    background: #F8F9FA;
    font-size: 14px; color: #3C4043;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    outline: none;
}

/* Estado: Foco (Expans\xE3o) */
.cw-input-field:focus {
    background: #FFFFFF;
    border-color: ${O.brands.ads.color};
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    padding-left: 20px; /* Leve movimento para a direita */
}

/* Estado: Preenchido (Sucesso / Dopamina) */
.cw-input-field.filled {
    background-color: #E6F4EA; /* Verde Menta Suave */
    border-color: transparent;
    color: #137333;
    font-weight: 500;
    padding-right: 40px; /* Espa\xE7o pro \xEDcone */
}

/* \xCDCONE DE SUCESSO (Pop Animation) */
.cw-success-icon {
    position: absolute; right: 14px; top: 50%; transform: translateY(-50%) scale(0);
    width: 20px; height: 20px;
    background: #1E8E3E; /* Verde Google */
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    color: white; 
    box-shadow: 0 2px 8px rgba(30, 142, 62, 0.3);
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); /* Bouncy Pop */
    pointer-events: none;
}
.cw-success-icon svg { width: 12px; height: 12px; stroke-width: 3; }

/* Gatilho da anima\xE7\xE3o */
.cw-input-field.filled + .cw-success-icon { transform: translateY(-50%) scale(1); }

/* Empty State */
.cw-empty-state {
    padding: 60px 20px; text-align: center; color: #9AA0A6;
    background: #FAFAFA; border-radius: 16px; border: 2px dashed #E0E0E0;
}
        `,document.head.appendChild(g)}let s=document.createElement("div");s.className="cw-zen-container";let i=document.createElement("div");Object.assign(i.style,{display:"none"});let p=document.createElement("div");p.className="cw-screens-container",i.appendChild(p),s.innerHTML=`
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
    `;let S=s.querySelector(".cw-hero-grid"),y=s.querySelector(".cw-acc-container"),m=s.querySelector(".cw-results-container"),C=s.querySelector(".cw-search-input"),b=s.querySelector(".cw-status-bar"),x=s.querySelector(".cw-status-text"),A=s.querySelector(".cw-footer-icons");o.forEach(([g,d])=>{let c=n(d.name),l=document.createElement("div");l.className="cw-hero-card",l.id=`hero-${g}`,l.innerHTML=`
            <div class="cw-hero-icon">${Te[c.icon]}</div>
            <div class="cw-hero-label">${d.name}</div>
            <div class="cw-hero-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,l.onclick=v=>{if(v.target.closest(".cw-step-btn"))return;let h=t[g]?t[g].count:0;I(g,h>0?-h:1,d)},l.querySelector(".minus").onclick=()=>I(g,-1,d),l.querySelector(".plus").onclick=()=>I(g,1,d),l.dataset.color=c.color,S.appendChild(l)});function E(g,d){let c=n(d.name),l=document.createElement("div");return l.className="cw-task-item",l.dataset.id=g,l.innerHTML=`
            <div class="cw-task-left">
                <div class="cw-list-icon" style="background:${c.bg}; color:${c.color}">
                    ${Te[c.icon]||Te.default}
                </div>
                <div class="cw-task-label">${d.name}</div>
            </div>
            <div class="cw-list-stepper">
                <div class="cw-step-btn minus">\u2212</div>
                <div class="cw-step-val">1</div>
                <div class="cw-step-btn plus">+</div>
            </div>
        `,l.onclick=v=>{if(v.target.closest(".cw-step-btn"))return;let h=t[g]?t[g].count:0;I(g,h>0?-h:1,d)},l.querySelector(".minus").onclick=()=>I(g,-1,d),l.querySelector(".plus").onclick=()=>I(g,1,d),l}Object.entries(r).forEach(([g,d])=>{let c=document.createElement("div");c.className="cw-acc-group";let l=document.createElement("div");l.className="cw-acc-header",l.innerHTML=`
            <div class="cw-acc-title">
                <div class="cw-acc-dot" style="background:${d.brand.color}"></div>
                ${g}
            </div>
            <div class="cw-acc-icon">\u25BC</div>
        `,l.onclick=()=>{y.querySelectorAll(".cw-acc-group.open").forEach(h=>{h!==c&&h.classList.remove("open")}),c.classList.toggle("open")};let v=document.createElement("div");v.className="cw-acc-body",d.tasks.forEach(h=>{let w=E(h.key,h);v.appendChild(w)}),c.appendChild(l),c.appendChild(v),y.appendChild(c)});function I(g,d,c){t[g]||(t[g]={count:0,data:c,brand:n(c.name)}),t[g].count+=d,t[g].count<=0&&delete t[g],F(),q(),e&&e()}function F(){o.forEach(([v])=>{let h=S.querySelector(`#hero-${v}`);if(!h)return;let w=t[v];if(w){h.classList.add("active"),h.style.borderColor=h.dataset.color;let k=h.querySelector(".cw-hero-icon");k.style.backgroundColor=h.dataset.color,k.style.color="white",h.querySelector(".cw-step-val").textContent=w.count}else{h.classList.remove("active"),h.style.borderColor="transparent";let k=h.querySelector(".cw-hero-icon");k.style.backgroundColor="#F3F4F6",k.style.color=O.textSub}}),s.querySelectorAll(".cw-task-item").forEach(v=>{let h=v.dataset.id,w=t[h];w?(v.classList.add("selected"),v.querySelector(".cw-step-val").textContent=w.count):v.classList.remove("selected")});let d=Object.keys(t),c=0,l=[];if(d.forEach(v=>{let h=t[v];c+=h.count;for(let w=0;w<h.count;w++)l.length<6&&l.push(h.brand)}),c>0){b.classList.add("visible");let v=c>1?"A\xE7\xF5es":"A\xE7\xE3o",h=c>1?"definidas":"definida";x.textContent=`${c} ${v} ${h}`,A.innerHTML="",l.forEach(w=>{let k=document.createElement("div");k.className="cw-mini-icon",k.style.backgroundColor=w.color,k.innerHTML=Te[w.icon]||Te.default;let T=k.querySelector("svg");T&&(T.style.width="12px",T.style.height="12px"),A.appendChild(k)})}else b.classList.remove("visible")}C.addEventListener("input",g=>{let d=g.target.value.toLowerCase();if(d.length>0){y.style.display="none",m.style.display="block",m.innerHTML="";let c=!1;Object.entries(Ne).forEach(([l,v])=>{if(v.name.toLowerCase().includes(d)){c=!0;let h=E(l,v);t[l]&&(h.classList.add("selected"),h.querySelector(".cw-step-val").textContent=t[l].count),m.appendChild(h)}}),c||(m.innerHTML='<div style="padding:20px; text-align:center; font-size:13px; color:#999">Nenhum resultado.</div>')}else y.style.display="block",m.style.display="none"});function q(){p.innerHTML="";let g=Object.keys(t),d=!1,c="implementation";if(g.length===0){p.innerHTML=`<div class="cw-empty-state">
                <div style="font-size:24px; margin-bottom:8px">\u2728</div>
                Selecione tarefas no passo anterior para liberar os campos.
            </div>`;return}g.forEach(l=>{let v=t[l].data,h=t[l].count,w=t[l].brand,k=v.screenshots?v.screenshots[c]||[]:["Link da Evid\xEAncia"];if(k.length>0){d=!0;for(let T=1;T<=h;T++){let $=document.createElement("div");$.className="cw-screen-card";let N=document.createElement("div");N.className="cw-card-header";let _=document.createElement("div");_.className="cw-card-icon",_.innerHTML=Te[w.icon]||Te.default,_.style.color=w.color,_.style.backgroundColor=w.bg;let Q=document.createElement("input");Q.className="cw-card-title-input",Q.id=`name-${l}-${T}`,Q.value=`${v.name}${h>1?" #"+T:""}`,N.appendChild(_),N.appendChild(Q),$.appendChild(N),k.forEach((z,H)=>{let R=document.createElement("div");R.className="cw-input-group";let Z=document.createElement("label");Z.className="cw-input-label",Z.textContent=z.replace(/📷|:|•/g,"").trim();let ee=document.createElement("div");ee.className="cw-input-wrapper";let P=document.createElement("input");P.className="cw-input-field",P.id=`screen-${l}-${T}-${H}`,P.placeholder="Cole o link aqui...",P.setAttribute("autocomplete","off");let ce=document.createElement("div");ce.className="cw-success-icon",ce.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',P.addEventListener("input",()=>{P.value.trim().length>3?P.classList.add("filled"):P.classList.remove("filled")}),P.addEventListener("focus",()=>{Z.style.color=w.color}),P.addEventListener("blur",()=>{Z.style.color=O.textSub}),ee.appendChild(P),ee.appendChild(ce),R.appendChild(Z),R.appendChild(ee),$.appendChild(R)}),p.appendChild($)}}}),i.style.display=d?"block":"none"}return{selectionElement:s,screenshotsElement:i,updateSubStatus:()=>q(),getCheckedElements:()=>Object.keys(t).map(g=>({value:g,closest:()=>({querySelector:()=>({textContent:t[g].count})})})),reset:()=>{for(let g in t)delete t[g];F(),q(),C.value="",y.style.display="block",m.style.display="none"}}}function zt(){let e="v3.6.0",t="bau",n="pt",o=!1,r=!1,a={input:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease"},textarea:{width:"100%",padding:"8px",borderRadius:"8px",border:"1px solid #dadce0",fontSize:"14px",marginBottom:"12px",boxSizing:"border-box",fontFamily:"'Google Sans', Roboto, sans-serif",transition:"border-color 0.2s ease, box-shadow 0.2s ease",height:"100px",resize:"vertical"},h3:{fontSize:"14px",fontWeight:"600",color:"#202124",margin:"0 0 12px 0"},label:{display:"block",fontSize:"14px",fontWeight:"500",color:"#3c4043",marginBottom:"8px",marginTop:"16px"},checkboxLabel:{display:"flex",alignItems:"center",marginBottom:"10px",fontSize:"14px",fontWeight:"400",cursor:"pointer",padding:"8px",background:"#f8f9fa",borderRadius:"6px",transition:"background-color 0.2s ease, box-shadow 0.2s ease",userSelect:"none"},checkboxInput:{width:"auto",marginRight:"10px",marginBottom:"0",cursor:"pointer",accentColor:"#1a73e8"},buttonBase:{flex:"1 1 0",padding:"10px 0",color:"#fff",border:"none",borderRadius:"8px",fontSize:"14px",fontWeight:"500",cursor:"pointer",marginTop:"16px"},stepBlock:{borderTop:"1px solid #eee",paddingTop:"12px",marginTop:"12px"},radioContainer:{display:"flex",gap:"15px",marginBottom:"10px"},optionalBtn:{width:"100%",padding:"10px",background:"white",border:"1px dashed #1a73e8",color:"#1a73e8",borderRadius:"6px",cursor:"pointer",fontWeight:"500",fontSize:"13px",marginBottom:"10px",transition:"all 0.2s"},helpLink:{fontSize:"12px",color:"#1a73e8",textDecoration:"none",cursor:"pointer",fontWeight:"500",display:"flex",alignItems:"center",gap:"4px",marginLeft:"auto",transition:"color 0.2s"}},s=Pt(),i=jt(()=>{let L=i.getCheckedElements().map(f=>f.value);N&&N.value&&s.updateVisibility(N.value,L)}),p=document.createElement("div");p.id="autofill-popup",Object.assign(p.style,he,{right:"100px",width:"400px",boxShadow:"none",opacity:"0",pointerEvents:"none",transition:"width 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.3s ease, transform 0.3s ease"}),p.style.transition+=", width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)";let y=ye(p,"Case Notes Assistant",e,"Gera notas padronizadas automaticamente. Selecione o status, as tasks realizadas e preencha os detalhes para inserir no caso.",{popup:p,googleLine:null},()=>lt()),m=y.lastElementChild;if(m){let u=document.createElement("div");u.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>',u.classList.add("no-drag"),Object.assign(u.style,{fontSize:"20px",color:"#9AA0A6",cursor:"pointer",padding:"8px",display:"flex",alignItems:"center",justifyContent:"center",marginRight:"4px",marginLeft:"auto",borderRadius:"50%",transition:"background 0.2s, transform 0.3s ease"}),u.title="Expandir/Contrair Janela",u.onmouseover=()=>u.style.backgroundColor="#e8eaed",u.onmouseout=()=>u.style.backgroundColor="transparent";let L=!1;u.onclick=()=>{L=!L,u.style.transform=L?"rotate(180deg)":"rotate(0deg)",p.style.width=L?"700px":"380px",L?u.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14h6v6M20 10h-6V4M14 10l7-7M10 14l-7 7"/></svg>':u.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>'};let f=m.lastElementChild;f?m.insertBefore(u,f):m.appendChild(u)}p.appendChild(y);let C=document.createElement("div");Object.assign(C.style,{padding:"0 16px 16px 16px",overflowY:"auto",flexGrow:"1"}),p.appendChild(C);let b=document.createElement("div");b.textContent="created by lucaste@",Object.assign(b.style,Ye),p.appendChild(b);let x=document.createElement("div");x.id="step-lang-type";let A=document.createElement("label");Object.assign(A.style,a.label),x.appendChild(A);let E=document.createElement("div");Object.assign(E.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let I=document.createElement("div");I.textContent="Portugu\xEAs",I.classList.add("no-drag"),Object.assign(I.style,ie);let F=document.createElement("div");F.textContent="Espa\xF1ol",F.classList.add("no-drag"),Object.assign(F.style,ie),I.onclick=()=>at("pt"),F.onclick=()=>at("es"),E.appendChild(I),E.appendChild(F),x.appendChild(E),C.appendChild(x);let q=document.createElement("div");q.id="step-0-case-type";let g=document.createElement("label");Object.assign(g.style,a.label),q.appendChild(g);let d=document.createElement("div");Object.assign(d.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden",marginBottom:"16px"});let c=document.createElement("div");c.textContent="BAU",c.classList.add("no-drag"),Object.assign(c.style,ie);let l=document.createElement("div");l.textContent="LM",l.classList.add("no-drag"),Object.assign(l.style,ie),c.onclick=()=>nt("bau"),l.onclick=()=>nt("lm"),d.appendChild(c),d.appendChild(l),q.appendChild(d),C.appendChild(q);let v=document.createElement("div");v.id="step-1-selection";let h=document.createElement("label");Object.assign(h.style,a.label);let w=document.createElement("select");w.id="main-status",Object.assign(w.style,Ge),w.innerHTML='<option value="">-- Selecione --</option><option value="NI">NI - Need Info</option><option value="SO">SO - Solution Offered</option><option value="IN">IN - Inactive</option><option value="AS">AS - Assigned</option>';let k=document.createElement("div");Object.assign(k.style,{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginTop:"16px",marginBottom:"8px"});let T=document.createElement("label");Object.assign(T.style,a.label,{marginTop:"0",marginBottom:"0"});let $=document.createElement("a");$.target="_blank",$.innerHTML='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> Guia de Substatus',Object.assign($.style,a.helpLink),k.appendChild(T),k.appendChild($);let N=document.createElement("select");N.id="sub-status",Object.assign(N.style,Ge),N.disabled=!0,v.appendChild(h),v.appendChild(w),v.appendChild(k),v.appendChild(N),C.appendChild(v);let _=document.createElement("div");_.id="step-1-1-portugal",Object.assign(_.style,a.stepBlock,{display:"none"});let Q=document.createElement("label");Object.assign(Q.style,a.label),_.appendChild(Q);let z=document.createElement("div");Object.assign(z.style,a.radioContainer);let H=document.createElement("div");Object.assign(H.style,{display:"flex",alignItems:"center"});let R=document.createElement("input");R.type="radio",R.name="portugal-group",R.value="sim",Object.assign(R.style,a.checkboxInput);let Z=document.createElement("label");Z.htmlFor="portugal-sim",Object.assign(Z.style,{cursor:"pointer"}),H.appendChild(R),H.appendChild(Z);let ee=document.createElement("div");Object.assign(ee.style,{display:"flex",alignItems:"center"});let P=document.createElement("input");P.type="radio",P.name="portugal-group",P.value="nao",P.checked=!0,Object.assign(P.style,a.checkboxInput);let ce=document.createElement("label");ce.htmlFor="portugal-nao",Object.assign(ce.style,{cursor:"pointer"}),ee.appendChild(P),ee.appendChild(ce),z.appendChild(H),z.appendChild(ee),_.appendChild(z),C.appendChild(_);function ze(u){o=u,u?ge.style.display="block":ge.style.display="none"}R.onchange=()=>ze(!0),P.onchange=()=>ze(!1);let ge=document.createElement("div");ge.id="step-1-2-consent",Object.assign(ge.style,a.stepBlock,{display:"none"});let et=document.createElement("label");Object.assign(et.style,a.label),ge.appendChild(et);let Be=document.createElement("div");Object.assign(Be.style,a.radioContainer);let qe=document.createElement("div");Object.assign(qe.style,{display:"flex",alignItems:"center"});let Se=document.createElement("input");Se.type="radio",Se.name="consent-group",Se.value="Sim",Se.checked=!0,Object.assign(Se.style,a.checkboxInput);let Ve=document.createElement("label");Ve.htmlFor="consent-sim",Object.assign(Ve.style,{cursor:"pointer"}),qe.appendChild(Se),qe.appendChild(Ve);let He=document.createElement("div");Object.assign(He.style,{display:"flex",alignItems:"center"});let Le=document.createElement("input");Le.type="radio",Le.name="consent-group",Le.value="N\xE3o",Object.assign(Le.style,a.checkboxInput);let Ue=document.createElement("label");Ue.htmlFor="consent-nao",Object.assign(Ue.style,{cursor:"pointer"}),He.appendChild(Le),He.appendChild(Ue),Be.appendChild(qe),Be.appendChild(He),ge.appendChild(Be),C.appendChild(ge);let Ce=document.createElement("div");Ce.id="step-1-5-snippets",Object.assign(Ce.style,a.stepBlock,{display:"none"});let tt=document.createElement("h3");Object.assign(tt.style,a.h3);let de=document.createElement("div");de.id="snippet-container",Ce.appendChild(tt),Ce.appendChild(de),C.appendChild(Ce);let pe=document.createElement("div");pe.id="step-2-tasks",Object.assign(pe.style,a.stepBlock,{display:"none"});let re=document.createElement("button");re.textContent="+ Gostaria de selecionar uma task?",Object.assign(re.style,a.optionalBtn),re.onmouseover=()=>{re.style.background="#e8f0fe"},re.onmouseout=()=>{re.style.background="white"};let ke=document.createElement("h3");Object.assign(ke.style,a.h3);let xt=document.createElement("div");xt.id="task-checkboxes-container",pe.appendChild(re),pe.appendChild(xt),pe.appendChild(ke),pe.appendChild(i.selectionElement),C.appendChild(pe);let ue=document.createElement("div");ue.id="step-3-form",Object.assign(ue.style,a.stepBlock,{display:"none"});let ot=document.createElement("h3");Object.assign(ot.style,a.h3),ue.appendChild(ot);let fe=document.createElement("div");fe.id="dynamic-form-fields-container",ue.appendChild(fe),ue.appendChild(s.element),ue.appendChild(i.screenshotsElement),C.appendChild(ue);let Ae=document.createElement("div");Ae.id="step-4-email",Object.assign(Ae.style,{display:"none",marginTop:"16px",paddingTop:"12px",borderTop:"1px solid #eee"});let Ee=document.createElement("label");Ee.style.display="flex",Ee.style.alignItems="center",Ee.style.cursor="pointer",Ee.style.fontSize="14px";let we=document.createElement("input");we.type="checkbox",we.checked=!0,Object.assign(we.style,a.checkboxInput),Ee.appendChild(we),Ee.appendChild(document.createTextNode("Preencher email automaticamente?")),Ae.appendChild(Ee),C.appendChild(Ae);let Ie=document.createElement("div");Object.assign(Ie.style,{display:"none",gap:"8px",padding:"0"}),C.appendChild(Ie);let Re=document.createElement("button");Object.assign(Re.style,a.buttonBase,{backgroundColor:"#5f6368"}),Re.textContent="Copiar";let Me=document.createElement("button");Object.assign(Me.style,a.buttonBase,{backgroundColor:"#1a73e8"}),Me.textContent="Preencher",Ie.appendChild(Re),Ie.appendChild(Me),document.body.appendChild(p);function nt(u){t=u;let L=Fe();Object.assign(c.style,ie),Object.assign(l.style,ie),u==="bau"?(Object.assign(c.style,L),$.href="https://docs.google.com/presentation/d/1Jra4de31rYaFZ0JMH_CiVzr2S3F8J1qcUcJRaw0Lw5Q/edit?slide=id.g2fd98a4e46f_11_2657#slide=id.g2fd98a4e46f_11_2657"):(Object.assign(l.style,L),$.href="https://docs.google.com/presentation/d/1CzrmfatUVReZWKAbwxHxcB3YXsH834xO6pPhTsZ7yjM/edit?slide=id.g1f1e626a09c_2_2243&resourcekey=0-KmtR4noMvEx3PODZk_ZvQw#slide=id.g1f1e626a09c_2_2243"),N.value&&N.dispatchEvent(new Event("change"))}function M(u){try{if(be&&be[n]&&be[n][u])return be[n][u];if(be&&be.pt&&be.pt[u])return be.pt[u]}catch{}return u}function Ht(){A.textContent=M("idioma"),g.textContent=M("fluxo"),h.textContent=M("status_principal"),T.textContent=M("substatus"),tt.textContent=M("cenarios_comuns"),ke.textContent=M("selecione_tasks"),ot.textContent=M("preencha_detalhes"),Re.textContent=M("copiar"),Me.textContent=M("preencher"),w.querySelector('option[value=""]')&&(w.querySelector('option[value=""]').textContent=M("select_status")),N.querySelector('option[value=""]')&&(N.querySelector('option[value=""]').textContent=M("select_substatus")),Q.textContent=M("caso_portugal"),Z.textContent=M("sim"),ce.textContent=M("nao"),et.textContent=M("consentiu_gravacao"),Ve.textContent=M("sim"),Ue.textContent=M("nao"),fe.querySelectorAll("label").forEach(u=>{let L=u.nextElementSibling.id.replace("field-",""),f=M(L.toLowerCase());f!==L.toLowerCase()?u.textContent=f:u.textContent=L.replace(/_/g," ").replace(/\b\w/g,D=>D.toUpperCase())+":"}),re.textContent="+ "+(n==="pt"?"Gostaria de selecionar uma task?":"Quisiera seleccionar una tarea?")}function at(u){n=u;let L=Fe();Object.assign(I.style,ie),Object.assign(F.style,ie),u==="pt"?(Object.assign(I.style,L),_.style.display="block",ze(o)):(Object.assign(F.style,L),_.style.display="none",ge.style.display="none"),Ht(),N.value&&N.dispatchEvent(new Event("change"))}function st(u){(u.value.trim()===""||u.value.trim()==="\u2022")&&(u.value="\u2022 "),u.onkeydown=function(L){if(L.key==="Enter"){L.preventDefault();let f=this.selectionStart,D=this.selectionEnd,X=this.value,se=X.lastIndexOf(`
`,f-1)+1,W=X.substring(se,f),B=W.trim()==="\u2022"||W.trim()===""?`
`:`
\u2022 `;this.value=X.substring(0,f)+B+X.substring(D),this.selectionStart=this.selectionEnd=f+B.length}else if(L.key==="Backspace"){let f=this.selectionStart;if(f===this.selectionEnd&&f>0){let D=this.value.substring(0,f);D.endsWith(`
\u2022 `)?(L.preventDefault(),this.value=D.substring(0,f-3)+this.value.substring(this.selectionEnd),this.selectionStart=this.selectionEnd=f-3):D==="\u2022 "&&(L.preventDefault(),this.value="",this.selectionStart=this.selectionEnd=0)}}}}function it(){let u=typeof de<"u"?de:document.getElementById("snippet-container");if(!u)return;let L=u.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked'),f={},D=new Set;L.forEach(W=>{let B=W.id,J=_e[B];if(J)for(let j in J)j==="linkedTask"?D.add(J.linkedTask):j!=="type"&&(f[j]||(f[j]=[]),f[j].includes(J[j])||f[j].push(J[j]))});let X=new Set;Object.values(_e).forEach(W=>{Object.keys(W).forEach(B=>{B!=="linkedTask"&&B!=="type"&&X.add(B)})}),X.forEach(W=>{let B=document.getElementById(W);if(B){let J=f[W]||[],j="";je.includes(W.replace("field-",""))?(j=J.map(G=>G.startsWith("\u2022 ")?G:"\u2022 "+G).join(`
`),j===""?j="\u2022 ":j.endsWith(`
\u2022 `)||(j+=`
\u2022 `)):j=J.join(`

`),j.trim()!=="\u2022"&&j.trim()!==""?B.value=j:je.includes(W.replace("field-",""))?B.value="\u2022 ":B.value="",B.tagName==="TEXTAREA"&&typeof st=="function"&&st(B)}}),document.querySelectorAll(".task-checkbox").forEach(W=>{D.has(W.value)&&(W.checked||(W.checked=!0,W.dispatchEvent(new Event("change",{bubbles:!0}))))})}w.onchange=()=>{let u=w.value;if(rt(1.5),N.innerHTML=`<option value="">${M("select_substatus")}</option>`,!u){N.disabled=!0;return}for(let L in Pe){let f=Pe[L];if(f.status===u){let D=document.createElement("option");D.value=L,D.textContent=f.name,N.appendChild(D)}}N.disabled=!1},N.onchange=()=>{let u=N.value;if(rt(1.5),!u)return;i.updateSubStatus(u);let L=Pe[u];de.innerHTML="";let f=(G,V,U)=>{let te=document.createElement("label");Object.assign(te.style,a.checkboxLabel),te.onmouseover=()=>te.style.backgroundColor="#e8eaed",te.onmouseout=()=>te.style.backgroundColor="#f8f9fa";let Y=document.createElement("input");return Y.type=V,Y.id=G.id,Object.assign(Y.style,a.checkboxInput),te.appendChild(Y),te.appendChild(document.createTextNode(` ${G.text}`)),U.appendChild(te),Y},D=[],X="radio";if(u==="NI_Awaiting_Inputs")D=[{id:"quickfill-ni-inicio-manual",text:"In\xEDcio 2/6 (Manual)"},{id:"quickfill-ni-cms-access",text:"In\xEDcio 2/6 (ADV sem acesso ao CMS)"},{id:"quickfill-ni-followup-bau",text:"Follow-up 2/6 (BAU)"},{id:"quickfill-ni-followup-lm",text:"Follow-up 2/6 (LM)"}];else if(u.startsWith("SO_"))X="checkbox",D=[{id:"quickfill-gtm-install",text:"Instala\xE7\xE3o do GTM"},{id:"quickfill-whatsapp",text:"Convers\xE3o de WhatsApp"},{id:"quickfill-form",text:"Convers\xE3o de Formul\xE1rio (Padr\xE3o)"},{id:"quickfill-ecw4-close",text:"Fechamento ECW4 (P\xF3s 7 dias)"}];else if(u.startsWith("AS_")){X="checkbox";let G=document.createElement("label");G.textContent=M("cenarios_comuns"),Object.assign(G.style,a.label),de.appendChild(G),D=[{id:"quickfill-as-no-show",text:"Anunciante n\xE3o compareceu (respondeu e-mail)"},{id:"quickfill-as-insufficient-time",text:"Tempo insuficiente"},{id:"quickfill-as-no-access",text:"Anunciante sem acessos necess\xE1rios"}]}else u.startsWith("IN_")&&(D=[{id:"quickfill-in-nrp-bau",text:"NRP (BAU - 3 tentativas)"},{id:"quickfill-in-nrp-lm",text:"NRP (LM - Sem tentativas)"},{id:"quickfill-in-no-show-bau",text:"No-Show (BAU - 3 tentativas)"},{id:"quickfill-in-2-6-final",text:"Finaliza\xE7\xE3o 2/6 (Sem Resposta)"},{id:"quickfill-in-manual",text:"Outro (Manual)"}]);let se=D.filter(G=>{let V=_e[G.id];return!V.type||V.type==="all"||V.type===t});se.forEach((G,V)=>{let U=f(G,X,de);X==="radio"&&(U.name="scenario-radio-group",V===0&&(U.checked=!0))}),se.length>0&&(Ce.style.display="block"),L.requiresTasks?(re.style.display="none",ke.style.display="block",i.selectionElement.style.display="block",pe.style.display="block"):(re.style.display="block",ke.style.display="none",i.selectionElement.style.display="none",pe.style.display="block"),fe.innerHTML="";let W=L.template.match(/{([A-Z0-9_]+)}/g)||[];[...new Set(W)].forEach(G=>{if(["{TAGS_IMPLEMENTED}","{SCREENSHOTS_LIST}","{CONSENTIU_GRAVACAO}","{CASO_PORTUGAL}"].includes(G))return;let V=G.slice(1,-1),U=document.createElement("label"),te=M(V.toLowerCase());U.textContent=te!==V.toLowerCase()?te:V.replace(/_/g," ").replace(/\b\w/g,oe=>oe.toUpperCase())+":",Object.assign(U.style,a.label);let Y;je.includes(V)?(Y=document.createElement("textarea"),Object.assign(Y.style,a.textarea),Y.classList.add("bullet-textarea"),st(Y)):mt.includes(V)?(Y=document.createElement("textarea"),Object.assign(Y.style,a.textarea)):(Y=document.createElement("input"),Y.type="text",Object.assign(Y.style,a.input),V==="REASON_COMMENTS"&&(u.startsWith("NI_")||u.startsWith("IN_"))&&(Object.assign(U.style,{display:"none"}),Object.assign(Y.style,{display:"none"}))),V==="ON_CALL"&&t==="lm"&&(Object.assign(U.style,{display:"none"}),Object.assign(Y.style,{display:"none"}),Y.value="N/A"),Y.id=`field-${V}`,fe.appendChild(U),fe.appendChild(Y)});let J=de.querySelectorAll('input[type="checkbox"], input[type="radio"]');J.length>0&&(J.forEach(G=>{G.removeEventListener("change",it),G.addEventListener("change",it)}),it()),ue.style.display="block",We[u]?Ae.style.display="block":Ae.style.display="none",Ie.style.display="flex";let j=i.getCheckedElements().map(G=>G.value);s.updateVisibility(u,j)},re.onclick=()=>{re.style.display="none",ke.style.display="block",i.selectionElement.style.display="block"};function yt(){let u=N.value;if(!u)return null;let f=Pe[u].template.replace(/\n/g,"<br>"),D='style="margin-bottom: 12px; padding-left: 30px;"',X=[],se="",W=taskManager.getCheckedElements();W.length>0&&W.forEach(j=>{let G=j.value,V=Ne[G],U=j.closest().querySelector(".stepper-count"),te=U?parseInt(U.textContent):1;te>1?X.push(`${V.name} (x${te})`):X.push(V.name)});let B=taskManager.screenshotsElement;if(B){let G=Array.from(B.querySelectorAll('input[id^="name-"]')).filter(V=>V.offsetParent!==null);G.length>0&&G.forEach(V=>{let U=V.value,Y=V.closest("div").parentNode.querySelectorAll('input[id^="screen-"]'),oe=!1,le="";Y.forEach(vt=>{let St=vt.previousElementSibling,Ut=St?St.textContent.replace("\u{1F4F7} ","").replace(":",""):"Print",Ct=vt.value.trim(),$t=Ct?` ${Ct}`:"";le+=`<li>${Ut} -${$t}</li>`,oe=!0}),oe&&(se+=`<b>${U}</b>`,se+=`<ul ${D}>${le}</ul>`)})}if(f.includes("{TAGS_IMPLEMENTED}")?f=f.replace(/{TAGS_IMPLEMENTED}/g,X.join(", ")||"N/A"):X.length>0&&(f+=`<br><b>Tags:</b> ${X.join(", ")}<br>`),f.includes("{SCREENSHOTS_LIST}")?f=f.replace(/{SCREENSHOTS_LIST}/g,se?`${se}`:"N/A"):se!==""&&(f+=`<br>${se}`),n==="pt"&&o){let j=Se.checked?M("sim"):M("nao");f=f.replace(/{CONSENTIU_GRAVACAO}/g,`<br><b>${M("consentiu_gravacao")}</b> ${j}<br><br>`),f=f.replace(/{CASO_PORTUGAL}/g,`<br><b>${M("caso_portugal")}</b> ${M("sim")}<br>`)}else n==="pt"&&!o?(f=f.replace(/{CASO_PORTUGAL}/g,`<br><b>${M("caso_portugal")}</b> ${M("nao")}<br>`),f=f.replace(/{CONSENTIU_GRAVACAO}/g,"")):(f=f.replace(/{CASO_PORTUGAL}/g,""),f=f.replace(/{CONSENTIU_GRAVACAO}/g,""));return fe.querySelectorAll("input, textarea").forEach(j=>{let G=j.id.replace("field-",""),V=new RegExp(`{${G}}`,"g"),U=j.value;if(G==="REASON_COMMENTS"&&(u.startsWith("NI_")||u.startsWith("IN_"))){let oe=de.querySelector('input[type="radio"]:checked');oe&&_e[oe.id]&&(U=_e[oe.id]["field-REASON_COMMENTS"])}if(je.includes(G)&&U.trim()!==""){let oe=U.split(`
`).map(le=>le.trim()).filter(le=>le!==""&&le!=="\u2022").map(le=>le.startsWith("\u2022 ")?le.substring(2):le).map(le=>`<li>${le}</li>`).join("");U=oe?`<ul ${D}>${oe}</ul>`:""}else mt.includes(G)?U=U.split(`
`).filter(oe=>oe.trim()!=="").map(oe=>`<p style="margin: 0 0 8px 0;">${oe}</p>`).join(""):j.tagName==="TEXTAREA"&&(U=U.replace(/\n/g,"<br>"));let te=U.replace(/<[^>]*>/g,"").replace(/&nbsp;/g," ").trim();if(te===""||te==="\u2022"||te.toLowerCase()==="n/a"){let oe=new RegExp(`(?:<br>\\s*)?<[b|strong]+>[^<]+:\\s*<\\/[b|strong]+>\\s*\\{${G}\\}(?:<br>\\s*)?`,"gi");oe.test(f)?f=f.replace(oe,""):f=f.replace(V,"")}else f=f.replace(V,U.replace(/\$/g,"$$$$"))}),f=f.replace(/{([A-Z0-9_]+)}/g,""),f=f.replace(/(<br>){3,}/g,"<br><br>"),typeof s<"u"&&s.getOutput&&(f+=s.getOutput()),f}Re.onclick=()=>{let u=yt();u?(gt(u),K(M("copiado_sucesso"))):K(M("selecione_substatus"),{error:!0})},Me.onclick=async()=>{let u=N.value,L=yt();if(!L){K(M("selecione_substatus"),{error:!0});return}gt(L),lt();let f=Qe(),D=await Ft();if(D)try{if(D.focus(),D.innerHTML.trim()==="<p><br></p>"||D.innerHTML.trim()==="<br>"||D.innerText.trim()===""){let B=document.createRange();B.selectNodeContents(D);let J=window.getSelection();J.removeAllRanges(),J.addRange(B),document.execCommand("delete",!1,null)}else if(!D.innerHTML.endsWith("<br><br>")){let B=document.createRange();B.selectNodeContents(D),B.collapse(!1);let J=window.getSelection();J.removeAllRanges(),J.addRange(B),document.execCommand("insertHTML",!1,"<br><br>")}document.execCommand("insertHTML",!1,L),Gt(D),setTimeout(()=>{K(M("inserido_copiado"))},600);let se=typeof we<"u"&&we?we.checked:!0;if(u&&We[u]&&se){let B=We[u];await Nt(B),await new Promise(J=>setTimeout(J,500))}f(),rt(1.5),w.value="",N.innerHTML=`<option value="">${M("select_substatus")}</option>`,N.disabled=!0}catch(X){console.error(X),K("Erro ao inserir.",{error:!0}),f()}};function rt(u=1.5){u<=1.5&&(Ce.style.display="none",de.innerHTML=""),u<=2&&(pe.style.display="none",i.reset(),re.style.display="none"),u<=3&&(ue.style.display="none",fe.innerHTML="",s.reset(),Ie.style.display="none",Ae.style.display="none")}function lt(){r=!r,ve(r,p,"cw-btn-notes")}return nt("bau"),at("pt"),lt}var Oe={CONTACT:{title:"Tentativas & Agendamento",emails:[{id:"attempt_10min",name:"Tentativa de Contato (Antes dos 10min)",subject:"Implementa\xE7\xE3o com o Time de Solu\xE7\xF5es T\xE9cnicas do Google - Tentativa de Contato",body:`
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
                `}]}};function Bt(){let e="v4.0.0",t=Object.keys(Oe)[0],n="",o="list",r={display:"flex",flexDirection:"column",height:"100%",position:"relative",overflow:"hidden",background:"#FAFAFA"},a={display:"flex",width:"200%",height:"100%",transition:"transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",transform:"translateX(0)"},s={width:"50%",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden",position:"relative"},i={width:"100%",padding:"10px 12px 10px 36px",borderRadius:"8px",border:"none",background:"#F0F2F5",fontSize:"14px",color:"#202124",boxSizing:"border-box",outline:"none",transition:"all 0.2s ease",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"10px center"},p={display:"flex",gap:"6px",padding:"4px 4px 8px 4px",overflowX:"auto",scrollbarWidth:"none"},S={padding:"6px 12px",borderRadius:"16px",border:"1px solid transparent",background:"transparent",color:"#5f6368",fontSize:"12px",fontWeight:"500",cursor:"pointer",transition:"all 0.2s ease",flexShrink:"0"},y={background:"#E8F0FE",color:"#1967D2",fontWeight:"600"},m={display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",marginBottom:"6px",borderRadius:"8px",background:"#fff",border:"1px solid #dadce0",cursor:"pointer",transition:"all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)",position:"relative",overflow:"hidden"},C=!1,b=document.createElement("div");b.id="quick-email-popup",Object.assign(b.style,he,{right:"100px",width:"480px",height:"600px",boxShadow:"none",opacity:"0",pointerEvents:"none"});let x={popup:b,googleLine:null,focusElement:null};function A(){C=!C,ve(C,b,"cw-btn-email"),C||setTimeout(()=>T(),300)}let E=ye(b,"Emails R\xE1pidos",e,"Selecione, visualize e insira com um clique.",x,()=>A()),I=document.createElement("div");Object.assign(I.style,r);let F=document.createElement("div");Object.assign(F.style,a);let q=document.createElement("div");Object.assign(q.style,s);let g=document.createElement("div");Object.assign(g.style,{padding:"16px 16px 4px 16px",flexShrink:"0",background:"#fff",zIndex:"10",display:"flex",flexDirection:"column",gap:"8px",borderBottom:"1px solid #f1f3f4"});let d=document.createElement("input");d.placeholder="Buscar template...",Object.assign(d.style,i),d.onfocus=()=>{d.style.background="#fff",d.style.boxShadow="0 2px 8px rgba(0,0,0,0.05)"},d.onblur=()=>{d.style.background="#F0F2F5",d.style.boxShadow="none"},x.focusElement=d;let c=document.createElement("div");Object.assign(c.style,p);let l=document.createElement("div");Object.assign(l.style,{padding:"12px 16px",overflowY:"auto",flexGrow:"1"}),g.appendChild(d),g.appendChild(c),q.appendChild(g),q.appendChild(l);let v=document.createElement("div");Object.assign(v.style,s);let h=document.createElement("div");Object.assign(h.style,{padding:"0",overflowY:"auto",flexGrow:"1",background:"#fff"}),v.appendChild(h),F.appendChild(q),F.appendChild(v),I.appendChild(F),b.appendChild(E),b.appendChild(I);let w=document.createElement("div");Object.assign(w.style,{padding:"8px 16px",borderTop:"1px solid #eee",textAlign:"center",fontSize:"10px",color:"#9aa0a6",background:"#fff",flexShrink:"0"}),w.textContent="created by lucaste@",b.appendChild(w),document.body.appendChild(b);function k(_){o="detail",F.style.transform="translateX(-50%)";let Q='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>',z='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';h.innerHTML=`
        <div style="
            position: sticky; top: 0; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px);
            border-bottom: 1px solid #f1f3f4; padding: 12px 20px; z-index: 10;
            display: flex; align-items: center; gap: 8px;
        ">
            <button id="csa-back-btn" style="
                background:none; border:none; cursor:pointer; display:flex; align-items:center; justify-content: center;
                color:#5f6368; width: 32px; height: 32px; margin-left:-8px; border-radius:50%; transition:background 0.2s;
            ">
                ${Q}
            </button>
            <div style="font-size:15px; font-weight:600; color:#202124; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${_.name}
            </div>
        </div>

        <div style="padding: 20px 20px 0 20px;">
            <div style="margin-bottom: 16px;">
                <div style="font-size:11px; font-weight:700; color:#1a73e8; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:6px;">Assunto</div>
                <div style="font-size:13px; font-weight:500; color:#202124; padding: 10px; background: #F8F9FA; border-radius: 8px; border: 1px solid #eee;">
                    ${_.subject}
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
                ">${_.body}</div>
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
      `;let H=h.querySelector("#csa-back-btn");H.onmouseover=()=>H.style.backgroundColor="#f1f3f4",H.onmouseout=()=>H.style.backgroundColor="transparent",H.onclick=T;let R=h.querySelector("#csa-insert-btn");R.onmouseover=()=>R.style.backgroundColor="#174ea6",R.onmouseout=()=>R.style.backgroundColor="#1a73e8",R.onclick=async()=>{R.style.transform="scale(0.96)",A();let Z=Qe();try{await bt(_),Z()}catch(ee){console.error(ee),Z()}setTimeout(()=>{R.style.transform="scale(1)",T()},300)}}function T(){o="list",F.style.transform="translateX(0)"}function $(){c.innerHTML="",Object.keys(Oe).forEach(_=>{let Q=Oe[_],z=document.createElement("button");z.textContent=Q.title,Object.assign(z.style,S),t===_&&n===""&&Object.assign(z.style,y),z.onclick=()=>{t=_,n="",d.value="",$(),N()},c.appendChild(z)})}function N(){l.innerHTML="";let _=[];if(n.trim()!==""?Object.values(Oe).forEach(H=>{let R=H.emails.filter(Z=>Z.name.toLowerCase().includes(n.toLowerCase()));_=[..._,...R]}):Oe[t]&&(_=Oe[t].emails),_.length===0){l.innerHTML='<div style="text-align:center; padding:60px 20px; color:#9aa0a6;"><div style="font-size:24px; margin-bottom:8px;">\u{1F50D}</div><div style="font-size:14px;">Nenhum template encontrado.</div></div>';return}let Q='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>',z='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';_.forEach(H=>{let R=document.createElement("div");Object.assign(R.style,m);let Z=H.subject.length>50?H.subject.substring(0,50)+"...":H.subject;R.innerHTML=`
        <div style="flex-grow: 1; margin-right: 12px; min-width: 0;">
            <div style="font-size:13px; font-weight:600; color:#202124; margin-bottom:2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${H.name}</div>
            <div style="font-size:12px; color:#5f6368; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${Z}</div>
        </div>
        <div style="display:flex; gap:6px;">
            <button class="action-btn view" title="Visualizar" style="width:32px; height:32px; border-radius:50%; border:none; background:#f1f3f4; color:#5f6368; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">${z}</button>
            <button class="action-btn send" title="Inserir Agora" style="width:32px; height:32px; border-radius:50%; border:none; background:#e8f0fe; color:#1a73e8; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all 0.2s;">${Q}</button>
        </div>
      `,R.onmouseenter=()=>{R.style.background="#F8F9FA",R.style.borderColor="#1a73e8"},R.onmouseleave=()=>{R.style.background="#fff",R.style.borderColor="#dadce0"};let ee=R.querySelector(".view");ee.onclick=ce=>{ce.stopPropagation(),k(H)},ee.onmouseenter=()=>{ee.style.background="#d2e3fc",ee.style.color="#174ea6"},ee.onmouseleave=()=>{ee.style.background="#f1f3f4",ee.style.color="#5f6368"};let P=R.querySelector(".send");P.onclick=ce=>{ce.stopPropagation(),P.style.transform="scale(0.9)",setTimeout(()=>P.style.transform="scale(1)",150),bt(H),A()},P.onmouseenter=()=>{P.style.background="#1a73e8",P.style.color="#fff",P.style.boxShadow="0 2px 6px rgba(26,115,232,0.3)"},P.onmouseleave=()=>{P.style.background="#e8f0fe",P.style.color="#1a73e8",P.style.boxShadow="none"},R.onclick=()=>k(H),l.appendChild(R)})}return d.addEventListener("input",_=>{n=_.target.value,n!==""?Array.from(c.children).forEach(Q=>Object.assign(Q.style,S)):$(),N()}),$(),N(),A}var ht={"PT BAU":{color:"#6c1199",inicio:["Apresenta\xE7\xE3o (Nome e Time)","Aviso de Grava\xE7\xE3o e Pol\xEDtica de Privacidade","Confirma\xE7\xE3o de CID e Email","(Opcional) Validar autentica\xE7\xE3o da conta via link","Confirma\xE7\xE3o da Task e do AM","Informar tempo da liga\xE7\xE3o (30-45 min)","Pedir para fechar conte\xFAdo sens\xEDvel (antes de compartilhar)","Validar Backup e Acessos Admin"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Pedir consentimento para teste de QA","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"PT LT":{color:"#004f67",inicio:["Ol\xE1 [...], eu sou o [...], e fa\xE7o parte da Equipe de Solu\xE7\xF5es T\xE9cnicas do Google. Tudo bem?","Nossa liga\xE7\xE3o poder\xE1 ser gravada para fins de treinamento, qualidade e melhorias dos servi\xE7os do Google, de acordo com a nossa Pol\xEDtica de Privacidade.","Por quest\xE3o de seguran\xE7a preciso que voc\xEA me informe o seu email e CID (ou n\xFAmero) da conta do Ads, por favor","Confirma\xE7\xE3o da Task e do AM","A consultoria tem uma dura\xE7\xE3o m\xE9dia de 30 a 45 minutos.","Pe\xE7o para que compartilhe a tela usando a op\xE7\xE3o \u201CTela Inteira\u201D","Por favor, feche todo e qualquer conte\xFAdo confidencial e sens\xEDvel (conversas, dados pessoais importantes, etc).","Possui o backup do seu site e todos os acessos \xE0s ferramentas do Google?"],fim:["Resumo da chamada (o que foi feito e como funciona)","Oferecer ajuda adicional / Abrir para d\xFAvidas","Pedir para fechar compartilhamento de tela","Pr\xF3ximos passos (Acompanhamento por XX dias)","Durante esse tempo, nossa equipe de qualidade poder\xE1 realizar um teste de convers\xE3o para validar a implementa\xE7\xE3o. Voc\xEA concorda com esse teste para garantirmos a efetividade da implementa\xE7\xE3o?","Alinhar escopo (T\xE9cnico vs. Gerente de Contas)","Pesquisa de Satisfa\xE7\xE3o (e confirmar email para envio)","Despedida"]},"ES BAU":{color:"#00bbff",inicio:["Introducci\xF3n (Nombre y  Equipo).","La llamada pode ser grabada con fines de entrenamiento y calidad de acuerdo com nuestra pol\xEDtica de privacidad.","Informar sitio web registrado en el caso.","Confirmaci\xF3n: Solicitar al Anunciante que confirme los 10 d\xEDgitos del CID el email del anunciante.","Confirmaciones: Tarea, AM","Informar el tiempo que va a durar la reuni\xE3o.","Confirmaci\xF3n: Copia de seguridad y acceso de ADM","Cerrar conte\xFAdo sens\xEDvel antes de compartir la pantalla."],fim:["Resumen de la llamada.","Ayuda adicional.","Cerrar la pantalla compartida.","Pr\xF3ximos passos (\xBFCu\xE1nto tempo seguir\xE1 el caso?)","Encuesta de Satisfa\xE7\xE3o.","Estar\xE9 monitoreando su caso durante XX dias para asegurarme de que todo est\xE9 funcionando corretamente. Durante este tiempo, nuestro equipo de qualidade podr\xEDa realizar una prueba de conversi\xF3n para validar la implementaci\xF3n. \xBFEst\xE1s de acuerdo con esta prueba para garantizar la efectividad de la implementaci\xF3n? Perfecto, \xA1gracias!"]},"ES LT":{color:"#f269ff",inicio:["Presentaci\xF3n (Nombre y equipo).","Informar al cliente sobre la llamada grabada.","Tiempo de duraci\xF3n de la llamada.",`Solicitar al anunciante que confirme lo siguiente: 
 A) 10 d\xEDgitos de la conta 
 B) Correo electr\xF3nico 
 C) N\xFAmero de tel\xE9fono y 
 D) Nombre del sitio web.`,"autenticar la cuenta del anunciante en el cases, si corresponde.","T\xE9rminos y condi\xE7\xF5es.","Informar las Task solicitadas y AM.","Cerrar contenido sensible.","Confirmaci\xF3n de copia de seguridad y acceso de administrador a las ferramentas.","Resumen de llamada."],fim:["Ofrecer ayuda adicional.","Dejar de compartir la pantalla.","Pasos siguientes  (Si se le har\xE1 seguimiento al caso).","Encuesta de Satisfa\xE7\xE3o.","Informar al cliente que el equipo de QA ir\xE1 a realizar pruebas en los siguientes dias."]},"EN BAU":{color:"#ff0011",inicio:["Example 1","Example 2"],fim:["Example 3","Example 4"]}};function qt(){let e="v1.2.7",t={},n="PT",o="BAU",r=!1,a=document.createElement("div");a.id="call-script-popup",Object.assign(a.style,he,{right:"100px",width:"340px",display:"flex",flexDirection:"column",boxShadow:"none",opacity:"0",pointerEvents:"none"});let s={popup:a,googleLine:null};function i(){r=!r,ve(r,a,"cw-btn-script")}let p=ye(a,"Call Script Assistant",e,"Checklists guiados para in\xEDcio e fim de chamada.",s,()=>{i()});a.appendChild(p);let S=document.createElement("div");S.id="csa-content",Object.assign(S.style,{padding:"16px",overflowY:"auto",flexGrow:"1"}),a.appendChild(S);let y=document.createElement("div");y.textContent="created by lucaste@",Object.assign(y.style,Ye),a.appendChild(y);let m=document.createElement("div");Object.assign(m.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px",gap:"8px"});let C=document.createElement("div");Object.assign(C.style,{display:"flex",borderRadius:"8px",border:"1px solid #dadce0",overflow:"hidden"});let b=document.createElement("div");b.textContent="BAU";let x=document.createElement("div");x.textContent="LT",Object.assign(b.style,ie),Object.assign(x.style,ie),C.appendChild(b),C.appendChild(x);let A=document.createElement("select");Object.assign(A.style,Ge,{marginBottom:"0",width:"auto",minWidth:"85px",paddingTop:"6px",paddingBottom:"6px"}),A.innerHTML='<option value="PT">PT</option><option value="ES">ES</option><option value="EN">EN</option>',A.value=n,m.appendChild(C),m.appendChild(A),S.appendChild(m);let E=document.createElement("div");E.id="csa-checklist-area",Object.assign(E.style,{maxHeight:"60vh",overflowY:"auto",paddingRight:"5px"}),S.appendChild(E),document.body.appendChild(a);function I(c,l){let v=c.replace("#",""),h=parseInt(v.substring(0,2),16),w=parseInt(v.substring(2,4),16),k=parseInt(v.substring(4,6),16);return`rgba(${h}, ${w}, ${k}, ${l})`}function F(c,l,v){c.classList.toggle("csa-completed",l),l?(c.style.borderColor=v,c.style.backgroundColor=I(v,.15),c.style.textDecorationLine="line-through"):(c.style.borderColor="transparent",c.style.backgroundColor="#f8f9fa",c.style.textDecorationLine="none")}function q(c,l,v){let h=ht[c];if(!h)return;let w=h[l];if(!w||w.length===0)return;let k=!0;for(let T=0;T<w.length;T++){let $=`${c}-${l}-${T}`;if(!t[$]){k=!1;break}}v.classList.toggle("csa-group-completed",k)}function g(){E.innerHTML="";let c=`${n} ${o}`,l=ht[c];if(!l){E.innerHTML='<div style="padding: 10px; color: #5f6368;">Script n\xE3o dispon\xEDvel.</div>';return}let v=l.color;["inicio","fim"].forEach(h=>{let w=l[h];if(!w||w.length===0)return;let k=document.createElement("div");k.className="csa-group-container",Object.assign(k.style,{marginBottom:"16px"});let T=document.createElement("div");T.className="csa-group-title";let $=h==="inicio"?"In\xEDcio":"Fim";n.includes("ES")&&($=h==="inicio"?"Inicio":"Fin"),n.includes("EN")&&($=h==="inicio"?"Start":"End"),T.textContent=$,Object.assign(T.style,De,{fontWeight:"600",fontSize:"14px",textDecoration:"underline",marginBottom:"8px"}),k.appendChild(T);let N=document.createElement("ul");Object.assign(N.style,{listStyle:"none",paddingLeft:"0",margin:"0"}),w.forEach((_,Q)=>{let z=document.createElement("li");z.className="csa-li",z.textContent=_;let H=`${c}-${h}-${Q}`,R=!!t[H];F(z,R,v),z.addEventListener("click",()=>{let Z=!t[H];t[H]=Z,F(z,Z,v),q(c,h,k)}),N.appendChild(z)}),k.appendChild(N),E.appendChild(k),q(c,h,k)})}function d(c){o=c;let l=Fe();Object.assign(b.style,ie),Object.assign(x.style,ie),Object.assign(c==="BAU"?b.style:x.style,l),g()}return b.onclick=()=>d("BAU"),x.onclick=()=>d("LT"),A.addEventListener("change",c=>{n=c.target.value,g()}),d(o),i}var Je={lm:{label:"LM Forms",links:[{name:"Relat\xF3rio de Ocorr\xEAncias",url:"https://docs.google.com/forms/d/e/1FAIpQLSc6CamPehrREeVr7yCWMyqFETrFYYezNcLb_13W4yZDQkfY6Q/viewform",desc:"Reportar problemas operacionais | Aviso de pausas"},{name:"Chamadas Excedidas (>50min)",url:"https://docs.google.com/forms/d/e/1FAIpQLSfE8EMHNJMTKYeA6XM2RZjZ9AQ4LhGk1Dwm_WLu3kcMdKMikA/viewform",desc:"Registro de chamadas longas"},{name:"Relat\xF3rio de Bugs",url:"https://docs.google.com/forms/d/e/1FAIpQLSfkqRqT2Kbf08IStz31fQPE84MDOtGxk7cetJmc3xzShXIXRA/viewform",desc:"Erros de sistema/ferramenta"},{name:"Suporte LM",url:"https://script.google.com/a/macros/google.com/s/AKfycbxYMlFCMZvqgHMIImeS_u-lNZPiertXmem-5m9Fox3jvZaq0ZOQDoc5ma96ltSvWHY/exec",desc:"Enviar casos para BAU/Solicitar Descarte/Abrir Monitoria para AMs"}]},qa:{label:"QA",links:[{name:"Elogios",url:"https://docs.google.com/forms/d/e/1FAIpQLSezY5K-trQDv0LkL5IoTlV0Tl0oOqGTEszylmgcbMRXcC9Weg/viewform",desc:"Feedback positivo dos Anunciantes"},{name:"Casos Complexos",url:"https://docs.google.com/forms/d/e/1FAIpQLSe26q1LEloFNRfOAVZtA7DCOQTqdu1BAEeWuxtK6oPwZhLp-A/viewform?resourcekey=0-c1N4h8gntza2gQowqYAqMw",desc:"Casos complicados de atender"}]},suporte:{label:"Central de Ajuda",links:[{name:"Suporte Google Ads",url:"https://support.google.com/google-ads/",desc:"Oficial"},{name:"Suporte GA4",url:"https://support.google.com/analytics/",desc:"Oficial"},{name:"Suporte Merchant Center",url:"https://support.google.com/merchants/gethelp",desc:"Oficial"},{name:"Doc. CSP",url:"https://developers.google.com/tag-platform/tag-manager/web/csp?hl=pt-br.",desc:"Doc. oficial sobre CSP"},{name:"Doc. Enhanced Conversion",url:"https://support.google.com/google-ads/answer/9888656?hl=en",desc:"Como funcionam as convers\xF5es otimizadas?"},{name:"Doc. CoMo",url:"https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=pt-br",desc:"Doc. oficial sobre Consent Mode"}]},outros:{label:"Diversos",links:[{name:"Solicitar Grava\xE7\xE3o",url:"https://support.google.com/policies/contact/sar",desc:"Form para solicitar grava\xE7\xE3o da chamada."}]}};function Vt(){let e="v2.4.5",t="lm",n="",o={width:"100%",padding:"10px 12px 10px 36px",borderRadius:"8px",border:"1px solid #dadce0",background:"#f8f9fa",fontSize:"14px",boxSizing:"border-box",outline:"none",color:"#3c4043",transition:"background 0.2s, border-color 0.2s",backgroundImage:`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="%235f6368" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>')`,backgroundRepeat:"no-repeat",backgroundPosition:"10px center"},r={display:"flex",flexWrap:"wrap",gap:"8px",paddingBottom:"8px"},a={padding:"6px 16px",borderRadius:"16px",border:"1px solid #dadce0",background:"transparent",color:"#5f6368",fontSize:"13px",fontWeight:"500",cursor:"pointer",whiteSpace:"nowrap",transition:"all 0.2s ease",marginBottom:"4px"},s={background:"#e8f0fe",color:"#1967d2",borderColor:"#e8f0fe",fontWeight:"600"},i={display:"flex",flexDirection:"column",padding:"12px",borderRadius:"8px",cursor:"pointer",border:"1px solid transparent",marginBottom:"4px",transition:"background 0.1s"},p=document.createElement("div");p.id="feedback-popup",Object.assign(p.style,he,{right:"100px",width:"400px",boxShadow:"none",opacity:"0",pointerEvents:"none"});let S={popup:p,googleLine:null,focusElement:null},y=!1,m=ye(p,"Links \xDAteis",e,"Acesso r\xE1pido a formul\xE1rios internos (Ocorr\xEAncias, Bugs) e documenta\xE7\xF5es oficiais de suporte.",S,()=>q());p.appendChild(m);let C=document.createElement("div");Object.assign(C.style,{padding:"0 16px 16px 16px",display:"flex",flexDirection:"column",gap:"12px",borderBottom:"1px solid #f1f3f4",flexShrink:"0",backgroundColor:"#fff"});let b=document.createElement("input");b.type="text",b.placeholder="Buscar link, form ou ajuda...",Object.assign(b.style,o),S.focusElement=b,b.onfocus=()=>{b.style.borderColor="#1a73e8",b.style.backgroundColor="#fff"},b.onblur=()=>{b.style.borderColor="#dadce0",b.style.backgroundColor="#f8f9fa"};let x=document.createElement("div");Object.assign(x.style,r),C.appendChild(b),C.appendChild(x),p.appendChild(C);let A=document.createElement("div");Object.assign(A.style,{padding:"0 8px 8px 8px",overflowY:"auto",flexGrow:"1"}),p.appendChild(A);let E=document.createElement("div");Object.assign(E.style,{padding:"8px 16px",borderTop:"1px solid #eee",display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"10px",color:"#9aa0a6"}),E.innerHTML="<span>by lucaste@</span>",p.appendChild(E),document.body.appendChild(p);function I(){x.innerHTML="",Object.keys(Je).forEach(g=>{let d=Je[g],c=document.createElement("button");c.textContent=d.label,Object.assign(c.style,a),t===g&&n===""&&Object.assign(c.style,s),c.onclick=()=>{t=g,n="",b.value="",I(),F()},x.appendChild(c)})}function F(){A.innerHTML="";let g=[];if(n.trim()!==""?Object.values(Je).forEach(d=>{let c=d.links.filter(l=>l.name.toLowerCase().includes(n.toLowerCase())||l.desc.toLowerCase().includes(n.toLowerCase()));c.forEach(l=>l._categoryName=d.label),g=[...g,...c]}):g=Je[t].links,g.length===0){A.innerHTML='<div style="text-align:center; padding:20px; color:#9aa0a6; fontSize:13px;">Nenhum link encontrado.</div>';return}g.forEach(d=>{let c=document.createElement("div");Object.assign(c.style,i);let l=document.createElement("div");Object.assign(l.style,{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"2px"});let v=document.createElement("div");Object.assign(v.style,{display:"flex",flexDirection:"column",flexGrow:"1"});let h=document.createElement("span");h.textContent=d.name,Object.assign(h.style,{fontSize:"14px",color:"#202124",fontWeight:"500"});let w=document.createElement("span");w.textContent=d.desc+(d._categoryName?` \u2022 ${d._categoryName}`:""),Object.assign(w.style,{fontSize:"11px",color:"#5f6368",marginTop:"2px"}),v.appendChild(h),v.appendChild(w);let k=document.createElement("div");Object.assign(k.style,{display:"flex",alignItems:"center",gap:"8px"});let T=document.createElement("div"),$='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',N='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1e8e3e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';T.innerHTML=$,Object.assign(T.style,{width:"28px",height:"28px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"#5f6368",cursor:"pointer",transition:"all 0.2s",opacity:"0"}),T.onclick=Q=>{Q.stopPropagation();let z=document.createElement("input");z.value=d.url,document.body.appendChild(z),z.select(),document.execCommand("copy"),document.body.removeChild(z),T.innerHTML=N,T.style.backgroundColor="#e6f4ea",setTimeout(()=>{T.innerHTML=$,T.style.backgroundColor="transparent"},1500)},T.onmouseenter=()=>{T.style.backgroundColor="#e8eaed",T.style.color="#202124"},T.onmouseleave=()=>{T.style.backgroundColor="transparent",T.style.color="#5f6368"};let _=document.createElement("span");_.innerHTML="&#8599;",Object.assign(_.style,{fontSize:"18px",color:"#dadce0",marginLeft:"4px"}),k.appendChild(T),k.appendChild(_),l.appendChild(v),l.appendChild(k),c.appendChild(l),c.onmouseenter=()=>{c.style.backgroundColor="#f1f3f4",_.style.color="#1a73e8",T.style.opacity="1"},c.onmouseleave=()=>{c.style.backgroundColor="transparent",_.style.color="#dadce0",T.style.opacity="0"},c.onclick=()=>window.open(d.url,"_blank"),A.appendChild(c)})}b.addEventListener("input",g=>{n=g.target.value,n!==""?Array.from(x.children).forEach(d=>{d.style.backgroundColor="transparent",d.style.color="#5f6368",d.style.borderColor="#dadce0"}):I(),F()});function q(){y=!y,ve(y,p,"cw-btn-links")}return I(),F(),q}function no(){if(window.techSolInitialized){ut();return}window.techSolInitialized=!0,console.log("\u{1F680} TechSol Suite Initializing...");try{Ot(),ut();let e=zt(),t=Bt(),n=qt(),o=Vt();Rt({toggleNotes:e,toggleEmail:t,toggleScript:n,toggleLinks:o})}catch(e){console.error("Erro fatal na inicializa\xE7\xE3o:",e),K("Erro cr\xEDtico ao iniciar o Case Wizard.",{error:!0})}}no();})();
