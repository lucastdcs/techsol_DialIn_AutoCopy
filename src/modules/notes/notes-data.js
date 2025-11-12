// src/modules/notes/notes-data.js

export const TASKS_DB = {
   'gtm_installation': {
        name: 'GTM Installation',
        screenshots: { implementation: ['GTM Instalado', 'Vinculador de conversões'], education: [] }
    },
    'ads_conversion_tracking': {
        name: 'Ads Conversion Tracking',
        screenshots: {
            implementation: ['Tag criada', 'Teste GTM', 'Teste Ads', 'Versão Publicada', 'Status Ads'],
            education: ['Screenshot for TAG assistant of tag working:', 'Screenshot of conversion tracking status in Google Ads:']
        }
    },
    'ads_enhanced_conversions': {
        name: 'Ads Enhanced Conversions (ECW4)',
        screenshots: {
            implementation: ['Termos aceitos no Ads', 'Tag implementada', 'Teste GTM', 'Teste Ads', 'Versão Publicada', 'Painel do Ads (após 7 dias)'],
            education: []
        }
    },
    'ga4_event_tracking': {
        name: 'Analytics Event Tracking (GA4)',
        screenshots: {
            implementation: ['Tag do evento GA4 implementado no GTM', 'Teste GTM (tagassistant.google.com)', 'Teste GA4 (DebugView - tagassistant.google.com)', 'Versão publicada no GTM', '(Se houver parâmetros) Dimensões customizadas criadas no GA4', 'Evento marcado como principal no GA4', 'GA4 e Google Ads vinculados corretamente', 'Evento principal GA4 importado no Google Ads (como secundário)', 'Métricas app & web ativadas no Google Ads', '(Opcional) Teste no Relatório do Tempo Real (GA4)'],
            education: []
        }
    },
    'upd_for_ga4': {
        name: 'UPD for GA4 (User-Provided Data)',
        screenshots: {
            implementation: ['Validação: Conta GA4 (somente fluxo web, não é setor de saúde)', '"Coleta de dados fornecidos pelo usuário" habilitado no GA4 (Admin > Coleta de Dados)', 'Confirmação de coleta de dados (UI)', 'Tag do evento GA4 otimizado (UPD) implementado no GTM', 'Teste GTM (tagassistant - parâmetro \'em\' sem erro)', 'Teste GA4 (DebugView - tagassistant)', 'Versão publicada no GTM', '(Treinamento) Evento principal importado no Google Ads como secundário'],
            education: []
        }
    },
    'ads_website_call_conversion': {
        name: 'Google Ads Website Call Conversion',
        screenshots: {
            implementation: [
                'Tag implementado no GTM',
                'Versão publicada no GTM',
                'Teste do disparo da etiqueta de configuração no tag assistant em mais de uma página, mostrando ID e rótulo',
                'Teste usando o #google-wcc-debug',
                'Mudança do status da conversão no Google Ads [Aguardar alguns minutos]'
            ],
            education: []
        }
    }
};

export const SUBSTATUS_TEMPLATES = {
    // --- AS (Assigned) ---
    'AS_Reschedule_1': { // Chave atualizada (era AS_Assigned)
        status: 'AS', 
        name: 'AS - Reschedule 1', // Nome limpo
        requiresTasks: false,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> AS - Reschedule 1<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> N/A`
    },
    'AS_Acceptable_Reschedule': { // NOVO
        status: 'AS', 
        name: 'AS - Acceptable Reschedule', 
        requiresTasks: false,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> AS - Acceptable Reschedule<br><br><b>Reason/comments:</b> Reagendamento aceitável.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> N/A`
    },

    // --- NI (Need Info) ---
    'NI_Awaiting_Inputs': { // Existente
        status: 'NI', 
        name: 'NI - Awaiting Inputs', // Nome limpo
        requiresTasks: false,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Próximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha Ação:</b><br>  {MINHA_ACAO}<br>  <b>Considerações adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplicável):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}`
    },
    'NI_In_Consult': { // NOVO
        status: 'NI', 
        name: 'NI - In Consult', 
        requiresTasks: false,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> NI - In Consult<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Próximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha Ação:</b><br>  {MINHA_ACAO}<br>  <b>Considerações adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}`
    },
    'NI_Awaiting_Validation': { // Chave atualizada (era NI_Awaiting_Validations)
        status: 'NI', 
        name: 'NI - Awaiting Validation', // Nome limpo
        requiresTasks: true,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> NI - Awaiting Validation<br><br><b>Reason/comments:</b> Aguardando Validações no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Próximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considerações adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}`
    },
    'NI_Attempted_Contact': { // NOVO
        status: 'NI', 
        name: 'NI - Attempted Contact', 
        requiresTasks: false,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> NI - Attempted Contact<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{CONTEXTO_CALL}<br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Impedimento / Próximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha Ação:</b><br>  {MINHA_ACAO}<br>  <b>Considerações adicionais:</b><br>  {CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}`
    },

    // --- IN (Inactive) ---
    'IN_Infeasible': { // NOVO
        status: 'IN', 
        name: 'IN - Infeasible', 
        requiresTasks: false,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> IN - Infeasible<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}`
    },
    'IN_Not_Reachable': { // Chave atualizada (era IN_Inactive)
        status: 'IN', 
        name: 'IN - Not Reachable', // Nome limpo
        requiresTasks: false,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> IN - Not Reachable<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}`
    },
    'IN_Not_Interested': { // NOVO
        status: 'IN', 
        name: 'IN - Not Interested', 
        requiresTasks: false,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> IN - Not Interested<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}`
    },
    'IN_Not_Ready': { // NOVO
        status: 'IN', 
        name: 'IN - Not Ready', 
        requiresTasks: false,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> IN - Not Ready<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}`
    },
    'IN_Out_of_Scope_Rerouted': { // NOVO
        status: 'IN', 
        name: 'IN - Out of Scope - Rerouted to Internal Team', 
        requiresTasks: false,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> IN - Out of Scope - Rerouted to Internal Team<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}`
    },
    'IN_Out_of_Scope_Unable_to_Transfer': { // NOVO
        status: 'IN', 
        name: 'IN - Out of Scope - Unable to Transfer', 
        requiresTasks: false,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> IN - Out of Scope - Unable to Transfer<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}`
    },
    'IN_Out_of_Scope_Email_to_Seller': { // NOVO
        status: 'IN', 
        name: 'IN - Out of Scope - Email to Seller', 
        requiresTasks: false,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> IN - Out of Scope - Email to Seller<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}`
    },
    'IN_Troubleshooting_Transferred': { // NOVO
        status: 'IN', 
        name: 'IN - Troubleshooting [Transferred]', 
        requiresTasks: false,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> IN - Troubleshooting [Transferred]<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}`
    },

    // --- SO (Solution Offered) ---
    'SO_Implementation_Only': { // Existente
        status: 'SO', 
        name: 'SO - Implementation Only', // Nome limpo
        requiresTasks: true,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}`
    },
    'SO_Education_Only': { // Existente
        status: 'SO', 
        name: 'SO - Education Only', // Nome limpo
        requiresTasks: true,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar dúvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>Dúvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resoluções/Explicações:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}`
    },
    'SO_Troubleshooting_Only': { // Chave atualizada (era SO_Troubleshooting)
        status: 'SO', 
        name: 'SO - Troubleshooting Only', // Nome limpo
        requiresTasks: true,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> SO - Troubleshooting Only<br><br><b>Reason/comments:</b> Consultoria utilizada para testar e solucinar problemas da conversão.<br><br><b>OnCall Comments:</b><br><b>Problema inicial:</b><br>{PROBLEMAS}<br><b>Resoluções/Explicações:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}`
    }
};

// ==================================================================
//               NOVO OBJETO DE SHORTCODES (Tarefa 4)
// ==================================================================

// Este objeto mapeia as chaves do SUBSTATUS_TEMPLATES para os 
// shortcodes que você forneceu.
export const SUBSTATUS_SHORTCODES = {
    // AS
    'AS_Reschedule_1': 'ts as resched1',
    'AS_Acceptable_Reschedule': 'ts as reschedok',
    // NI
    'NI_Awaiting_Inputs': 'ts ni ai',
    'NI_In_Consult': 'ts ni ic',
    'NI_Awaiting_Validation': 'ts ni av',
    'NI_Attempted_Contact': 'ts ni ac',
    // IN
    'IN_Infeasible': 'ts in inf',
    'IN_Not_Reachable': 'ts in nrch',
    'IN_Not_Interested': 'ts in ni',
    'IN_Not_Ready': 'ts in nrdy',
    'IN_Out_of_Scope_Rerouted': 'ts in oost',
    'IN_Out_of_Scope_Unable_to_Transfer': 'ts in oosu',
    'IN_Out_of_Scope_Email_to_Seller': 'ts in oos seller',
    'IN_Troubleshooting_Transferred': null, // Nenhum shortcode fornecido
    // SO
    'SO_Implementation_Only': 'ts so verif',
    'SO_Verified_No_Recent_Conversion': 'ts so verif nrc',
    'SO_Unverified': 'ts so unv',
    'SO_Education_Only': 'ts so Edu',
    'SO_Troubleshooting_Only': 'ts so trbl'
};

// ==================================================================
//               Restante do arquivo (sem alterações)
// ==================================================================

export const textareaListFields = [
    'TASKS_SOLICITADAS', 'PASSOS_EXECUTADOS', 'RESULTADO', 'DUVIDAS','PROBLEMAS', 'RESOLUCOES',
    'TASKS_IMPLEMENTADAS_CALL', 'PROXIMOS_PASSOS', 'CONTEXTO_CALL',
    'IMPEDIMENTO_CLIENTE', 'MINHA_ACAO', 'SCREENSHOTS',
    'MOTIVO_REAGENDAMENTO'
];

export const textareaParagraphFields = ['CONSIDERACOES', 'COMENTARIOS'];

export const scenarioSnippets = {
    // --- Cenários de NI (Exclusivos) ---
    'quickfill-ni-inicio-manual': {
        type: 'all',
        'field-REASON_COMMENTS': "Aguardando informações por parte do anunciante (Início 2/6)"
    },
    'quickfill-ni-cms-access': {
        type: 'all',
        'field-REASON_COMMENTS': "Aguardando informações por parte do anunciante (Início 2/6 - Sem Acesso ao CMS)",
        'field-TASKS_SOLICITADAS': "• Instalação do GTM\n• Configuração de Conversões",
        'field-CONTEXTO_CALL': "• Percebi que o(a) anunciante não tinha GTM Instalado.\n• Seguimos com a criação de conta no GTM.\n• Entretanto, a conta de acesso ao painel do site (ex: WordPress) não tinha permissão para instalar plugins ou editar o código.",
        'field-IMPEDIMENTO_CLIENTE': "• Anunciante precisa conseguir acesso de administrador ao painel do site.\n• OU\n• Anunciante precisa contatar o(a) desenvolvedor(a) para que ele(a) instale o GTM.",
        'field-MINHA_ACAO': "• Coloco o caso em 2/6.\n• Assim que o anunciante tiver o acesso ou a instalação for feita, abrirei um caso em BAU para dar continuidade.",
        'field-SCREENSHOTS': "• Print do painel do CMS mostrando a falta de permissão (opcional)."
    },
    'quickfill-ni-followup-bau': { 
        type: 'bau',
        'field-REASON_COMMENTS': "Aguardando informações por parte do anunciante (Follow-up BAU 2/6)",
        'field-SPEAKEASY_ID': "N/A",
        'field-ON_CALL': "N/A",
        'field-CONTEXTO_CALL': "• No dia {DIA} do 2/6 fiz duas tentativas de contatos seguidas, mas não obtive resposta. Envio na sequência o email referente ao dia respectivo.",
        'field-TASKS_SOLICITADAS': "N/A",
        'field-IMPEDIMENTO_CLIENTE': "N/A",
        'field-MINHA_ACAO': "N/A",
        'field-GTM_GA4_VERIFICADO': 'N/A', 
        'field-SCREENSHOTS': "• Tentativa 1 -\n• Tentativa 2 -"
    },
    'quickfill-ni-followup-lm': {
        type: 'lm',
        'field-REASON_COMMENTS': "Aguardando informações por parte do anunciante (Follow-up LM 2/6)",
        'field-SPEAKEASY_ID': "N/A",
        'field-ON_CALL': "N/A",
        'field-CONTEXTO_CALL': "• No dia {DIA} do 2/6 enviei e-mail de follow-up (caso LM, sem tentativas de ligação), mas não obtive resposta.",
        'field-TASKS_SOLICITADAS': "N/A",
        'field-IMPEDIMENTO_CLIENTE': "N/A",
        'field-MINHA_ACAO': "N/A",
        'field-GTM_GA4_VERIFICADO': 'N/A',
        'field-SCREENSHOTS': "• E-mail de follow-up enviado (LM) -"
    },

    // --- Cenários de SO (Combináveis) ---
    'quickfill-whatsapp': {
        type: 'all',
        'field-TASKS_SOLICITADAS': "• Criação de conversão para WHATSAPP",
        'field-PASSOS_EXECUTADOS': "• Fizemos a criação da conversão no Ads.\n• Criamos a Tag no GTM usando acionadores de clique (ex: Click URL / Click Text) para os botões de WhatsApp.\n• Realizamos os testes e validamos o funcionamento.",
        'field-RESULTADO': "• Task implementada com sucesso. Fecho o caso sem acompanhamento.",
        linkedTask: 'ads_conversion_tracking'
    },
     'quickfill-form': {
        type: 'all',
        'field-TASKS_SOLICITADAS': "• Criação de conversão para FORMULÁRIO (padrão, não-otimizada).",
        'field-PASSOS_EXECUTADOS': "• Fizemos a criação da conversão no Ads.\n• Criamos a Tag no GTM usando o acionador de envio de formulário (Form Submission) ou visualização de página de agradecimento (Thank You Page).\n• Realizamos os testes e validamos o funcionamento.",
        'field-RESULTADO': "• Task implementada com sucesso. Fecho o caso sem acompanhamento.",
        linkedTask: 'ads_conversion_tracking'
    },
    'quickfill-ecw4-close': {
        type: 'all',
        'field-TASKS_SOLICITADAS': "• Acompanhamento da conversão otimizada (ECW4) após 7 dias.",
        'field-PASSOS_EXECUTADOS': "• Após o período de 7 dias de acompanhamento, verifiquei o painel do Ads.\n• A conversão está sendo registrada corretamente.",
        'field-RESULTADO': "• Valido o bom funcionamento da conversão otimizada.\n• Assim, fecho o caso.",
        linkedTask: 'ads_enhanced_conversions'
    },
    // --- Cenários de AS (Combináveis) ---
    'quickfill-as-no-show': {
        type: 'all',
        'field-MOTIVO_REAGENDAMENTO': '• Precisamos reagendar o caso, já que o anunciante não compareceu na meet, porém respondeu o e-mail pedindo o reagendamento'
    },
    'quickfill-as-insufficient-time': {
        type: 'all',
        'field-MOTIVO_REAGENDAMENTO': '• Precisamos reagendar o caso, já que o tempo foi insuficiente para terminar as Tasks\n• Implementamos [descrever o que foi feito]'
    },
    'quickfill-as-no-access': {
        type: 'all',
         'field-MOTIVO_REAGENDAMENTO': '• Precisamos reagendar o caso, já que o anunciante não tinha os acessos necessários para podermos implementar as tasks'
    },
    
    // --- Cenários de IN (Exclusivos - Rádio) ---
    'quickfill-in-nrp-bau': { 
        type: 'bau',
        'field-REASON_COMMENTS': "NRP (BAU - 3 tentativas)",
        'field-COMENTARIOS': "• Duas ligações seguidas, e-mail \"Antes dos 10 minutos\" e uma terceira e ultima tentativa de ligação.\n• Não houve resposta às tentativas de ligação ou e-mail, por isso o caso será inativado.",
        'field-SCREENSHOTS': "• Tentativa 1 -\n• Tentativa 2 -\n• Tentativa 3 -",
        'field-GTM_GA4_VERIFICADO': "N/A"
    },
    'quickfill-in-nrp-lm': {
        type: 'lm',
        'field-REASON_COMMENTS': "NRP (LM - Sem tentativas)",
        'field-SPEAKEASY_ID': "N/A",
        'field-ON_CALL': "N/A",
        'field-COMENTARIOS': "• Tentativa de contato via e-mail (sem chamada) para o caso LM, sem resposta.\n• Caso inativado.",
        'field-SCREENSHOTS': "• Caso LM, sem tentativas de ligação.",
        'field-GTM_GA4_VERIFICADO': "N/A"
    },
    'quickfill-in-no-show-bau': { 
        type: 'bau',
        'field-REASON_COMMENTS': "Sem resposta ao 2 Day Rule.",
        'field-ON_CALL': "N/A", 
        'field-COMENTARIOS': "• O caso foi gerado e entrei na chamada no horário agendado.\n• O anunciante não compareceu à reunião.\n• Segui o protocolo de espera (BAU): realizei duas tentativas de ligação, aguardei os 10 minutos, e fiz uma terceira tentativa, sem sucesso.\n• Nenhuma das ligações foi atendida (ex: Caixa Postal).\n• Caso inativado após 2 Day Rule.",
        'field-SCREENSHOTS': "• Tentativa 1 - \n• Tentativa 2  - \n• Tentativa 3 - ",
        'field-GTM_GA4_VERIFICADO': "N/A"
    },
    'quickfill-in-2-6-final': {
        type: 'all',
        'field-REASON_COMMENTS': "Finalização (2/6)",
        'field-SPEAKEASY_ID': "-",
        'field-ON_CALL': "-",
        'field-COMENTARIOS': "• Dia 9 finalização do 2/6, durante o período do acompanhamento não houve retorno do anunciante, então o caso será encerrado.",
        'field-SCREENSHOTS': "• N/A",
        'field-GTM_GA4_VERIFICADO': "N/A"
    },
    'quickfill-in-manual': { 
        type: 'all',
        'field-REASON_COMMENTS': "Outro (Manual)",
        'field-GTM_GA4_VERIFICADO': "N/A"
    }
};