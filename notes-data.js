// notes-data.js

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
        name: 'Google Ads WEBSITE CALL CONVERSION',
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
    'SO_Implementation_Only': {
        status: 'SO', name: 'SO - Implementation Only', requiresTasks: true,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> SO - Implementation Only<br><br><b>Reason/comments:</b> Task implementada com sucesso<br><br><b>OnCall Comments:</b><br><b>Task(s) solicitada(s):</b><br>{TASKS_SOLICITADAS}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Resultado:</b><br>{RESULTADO}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}`
    },
    'SO_Education_Only': {
        status: 'SO', name: 'SO - Education Only', requiresTasks: true,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> SO - Education Only<br><br><b>Reason/comments:</b> Consultoria utilizada para tirar dúvidas do anunciante.<br><br><b>OnCall Comments:</b><br><b>Dúvidas do anunciante:</b><br>{DUVIDAS}<br><b>Resoluções/Explicações:</b><br>{RESOLUCOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}`
    },
    'NI_Awaiting_Validations': {
        status: 'NI', name: 'NI - Awaiting Validations', requiresTasks: true,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> NI - Awaiting Validations<br><br><b>Reason/comments:</b> Aguardando Validações no Google Ads<br><br><b>OnCall Comments:</b><br><b>Tasks solicitadas pelo AM:</b><br>{TASKS_SOLICITADAS}<br><b>Tasks implementadas na call:</b><br>{TASKS_IMPLEMENTADAS_CALL}<br><b>Seguimos com os passos:</b><br>{PASSOS_EXECUTADOS}<br><b>Próximos passos (Acompanhamento):</b><br>{PROXIMOS_PASSOS}<br><b>Considerações adicionais:</b><br>{CONSIDERACOES}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> {TAGS_IMPLEMENTED}<br><br><b>Screenshots:</b><br>{SCREENSHOTS_LIST}<br><b>Multiple CIDs:</b> {CIDS}`
    },
    'NI_Awaiting_Inputs': {
        status: 'NI', name: 'NI - Awaiting Inputs', requiresTasks: false,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> NI - Awaiting Inputs<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>  <b>Tasks solicitadas pelo AM:</b><br>  {TASKS_SOLICITADAS}<br>  <b>Contexto/O que foi feito:</b><br>  {CONTEXTO_CALL}<br>  <b>Impedimento / Próximo passo (Anunciante):</b><br>  {IMPEDIMENTO_CLIENTE}<br>  <b>Minha Ação:</b><br>  {MINHA_ACAO}<br>  <b>Considerações adicionais:</b><br>  {CONSIDERACOES}<br>  <b>Dia do Follow-up (se aplicável):</b> {DIA}<br><br><b>GTM/GA4 Verificado:</b> {GTM_GA4_VERIFICADO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}`
    },
   'IN_Inactive': {
        status: 'IN', name: 'IN - Inactive', requiresTasks: false,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> IN - Inactive<br><br><b>Reason/comments:</b> {REASON_COMMENTS}<br><br><b>OnCall Comments:</b><br>{COMENTARIOS}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b><br>{SCREENSHOTS}<br><br><b>Multiple CIDs:</b> {CIDS}`
    },
    'AS_Assigned': {
        status: 'AS', name: 'AS - Assigned', requiresTasks: false,
        template: `<b>Speakeasy ID:</b> {SPEAKEASY_ID}<br><br><b>On Call (Call Started) signaled on time?</b> {ON_CALL}<br><br><b>Substatus:</b> AS - Assigned<br><br><b>Reason/comments:</b> Caso Reagendado.<br><br><b>OnCall Comments:</b><br>{MOTIVO_REAGENDAMENTO}<br>Data do reagendamento: {DATA_REAGENDAMENTO}<br><br><b>Tag Implemented:</b> N/A<br><br><b>Screenshots:</b> N/A<br><br><b>Multiple CIDs:</b> N/A`
    }
};

export const textareaListFields = [
    'TASKS_SOLICITADAS', 'PASSOS_EXECUTADOS', 'RESULTADO', 'DUVIDAS', 'RESOLUCOES',
    'TASKS_IMPLEMENTADAS_CALL', 'PROXIMOS_PASSOS', 'CONTEXTO_CALL',
    'IMPEDIMENTO_CLIENTE', 'MINHA_ACAO', 'SCREENSHOTS',
    'MOTIVO_REAGENDAMENTO'
];

export const textareaParagraphFields = ['CONSIDERACOES', 'COMENTARIOS'];

export const scenarioSnippets = {
    // --- Cenários de NI (Exclusivos) ---
    'quickfill-ni-inicio-manual': {
        'field-REASON_COMMENTS': "Aguardando informações por parte do anunciante (Início 2/6)"
    },
    'quickfill-ni-cms-access': {
        'field-REASON_COMMENTS': "Aguardando informações por parte do anunciante (Início 2/6 - Sem Acesso ao CMS)",
        'field-TASKS_SOLICITADAS': "• Instalação do GTM\n• Configuração de Conversões",
        'field-CONTEXTO_CALL': "• Percebi que o(a) anunciante não tinha GTM Instalado.\n• Seguimos com a criação de conta no GTM.\n• Entretanto, a conta de acesso ao painel do site (ex: WordPress) não tinha permissão para instalar plugins ou editar o código.",
        'field-IMPEDIMENTO_CLIENTE': "• Anunciante precisa conseguir acesso de administrador ao painel do site.\n• OU\n• Anunciante precisa contatar o(a) desenvolvedor(a) para que ele(a) instale o GTM.",
        'field-MINHA_ACAO': "• Coloco o caso em 2/6.\n• Assim que o anunciante tiver o acesso ou a instalação for feita, abrirei um caso em BAU para dar continuidade.",
        'field-SCREENSHOTS': "• Print do painel do CMS mostrando a falta de permissão (opcional)."
    },
    'quickfill-ni-followup': {
        'field-REASON_COMMENTS': "Aguardando informações por parte do anunciante (Follow-up 2/6)",
        'field-SPEAKEASY_ID': "N/A",
        'field-ON_CALL': "N/A",
        'field-TASKS_SOLICITADAS': "• N/A",
        'field-CONTEXTO_CALL': "• No dia {DIA} do 2/6 fiz duas tentativas de contatos seguidas, mas não obtive resposta. Envio na sequência o email referente ao dia respectivo.",
        'field-IMPEDIMENTO_CLIENTE': "• N/A",
        'field-MINHA_ACAO': "• N/A",
        'field-SCREENSHOTS': "• Tentativa 1 -\n• Tentativa 2 -"
    },
    // --- Cenários de SO (Combináveis) ---
    'quickfill-whatsapp': {
        'field-TASKS_SOLICITADAS': "• Criação de conversão para WHATSAPP",
        'field-PASSOS_EXECUTADOS': "• Fizemos a criação da conversão no Ads.\n• Criamos a Tag no GTM usando acionadores de clique (ex: Click URL / Click Text) para os botões de WhatsApp.\n• Realizamos os testes e validamos o funcionamento.",
        'field-RESULTADO': "• Task implementada com sucesso. Fecho o caso sem acompanhamento.",
        linkedTask: 'ads_conversion_tracking'
    },
     'quickfill-form': {
        'field-TASKS_SOLICITADAS': "• Criação de conversão para FORMULÁRIO (padrão, não-otimizada).",
        'field-PASSOS_EXECUTADOS': "• Fizemos a criação da conversão no Ads.\n• Criamos a Tag no GTM usando o acionador de envio de formulário (Form Submission) ou visualização de página de agradecimento (Thank You Page).\n• Realizamos os testes e validamos o funcionamento.",
        'field-RESULTADO': "• Task implementada com sucesso. Fecho o caso sem acompanhamento.",
        linkedTask: 'ads_conversion_tracking'
    },
    'quickfill-ecw4-close': {
        'field-TASKS_SOLICITADAS': "• Acompanhamento da conversão otimizada (ECW4) após 7 dias.",
        'field-PASSOS_EXECUTADOS': "• Após o período de 7 dias de acompanhamento, verifiquei o painel do Ads.\n• A conversão está sendo registrada corretamente.",
        'field-RESULTADO': "• Valido o bom funcionamento da conversão otimizada.\n• Assim, fecho o caso.",
        linkedTask: 'ads_enhanced_conversions'
    },
    // --- Cenários de AS (Combináveis) ---
    'quickfill-as-no-show': {
        'field-MOTIVO_REAGENDAMENTO': '• Precisamos reagendar o caso, já que o anunciante não compareceu na meet, porém respondeu o e-mail pedindo o reagendamento'
    },
    'quickfill-as-insufficient-time': {
        'field-MOTIVO_REAGENDAMENTO': '• Precisamos reagendar o caso, já que o tempo foi insuficiente para terminar as Tasks\n• Implementamos [descrever o que foi feito]'
    },
    'quickfill-as-no-access': {
         'field-MOTIVO_REAGENDAMENTO': '• Precisamos reagendar o caso, já que o anunciante não tinha os acessos necessários para podermos implementar as tasks'
    },
    // --- Cenários de IN (Exclusivos - Rádio) ---
    'quickfill-in-nrp-standard': {
        'field-REASON_COMMENTS': "NRP",
        'field-COMENTARIOS': "• Duas ligações seguidas, e-mail \"Antes dos 10 minutos\" e uma terceira e ultima tentativa de ligação.\n• Não houve resposta às tentativas de ligação ou e-mail, por isso o caso será inativado.",
        'field-SCREENSHOTS': "• Tentativa 1 -\n• Tentativa 2 -\n• Tentativa 3 -"
    },
    'quickfill-in-no-show': {
        'field-REASON_COMMENTS': "Anunciante não compareceu à chamada (No-Show).",
        'field-ON_CALL': "N/A",
        'field-COMENTARIOS': "• O caso foi gerado e entrei na chamada no horário agendado.\n• O anunciante não compareceu à reunião.\n• Segui o protocolo de espera: realizei duas tentativas de ligação, aguardei os 10 minutos, e fiz uma terceira tentativa, sem sucesso.\n• Nenhuma das ligações foi atendida (ex: Caixa Postal).\n• Caso inativado por No-Show.",
        'field-SCREENSHOTS': "• Tentativa 1 (Caixa Postal) - https://screenshot.googleplex.com/BW3RLJNgf9SUVzx\n• Tentativa 2 (Caixa Postal) - https://screenshot.googleplex.com/9VEjdvGghueznHv\n• Tentativa 3 (Chamada desconectada) - https://screenshot.googleplex.com/C4yPjgvXN9kovcw"
    },
    'quickfill-in-manual': {
        'field-REASON_COMMENTS': "Outro (Manual)"
    }
};