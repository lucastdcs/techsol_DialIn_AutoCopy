// src/modules/quick-email/quick-email-data.js

export const QUICK_EMAILS = {
    '2_6_PROCESS': {
        title: 'Processo 2/6',
        emails: [
            {
                id: '2_6_day1',
                name: 'Dia 1 (Tentativa de Contato)',
                subject: 'Google Ads - Tentativa de Contato',
                body: `<p>Olá,</p><br><p>Tentei entrar em contato hoje para nossa consultoria, mas sem sucesso.</p><p>Por favor, me informe o melhor horário para retornarmos.</p><br><p>Atentamente,</p>`
            },
            {
                id: '2_6_day2',
                name: 'Dia 2 (Follow-up)',
                subject: 'Google Ads - Acompanhamento',
                body: `<p>Olá,</p><br><p>Seguimos aguardando seu retorno sobre a implementação.</p><br><p>Atentamente,</p>`
            }
        ]
    },
    'MEETING': {
        title: 'Reunião / Links',
        emails: [
            {
                id: 'meet_link',
                name: 'Enviar Link da Reunião',
                subject: 'Link para nossa reunião agora',
                body: `<p>Olá,</p><br><p>Segue o link para nossa reunião de agora:</p><p><a href="https://meet.google.com/">Google Meet</a></p><br><p>Estou aguardando na sala.</p>`
            },
            {
                id: 'reschedule_client',
                name: 'Reagendamento (Cliente Solicitou)',
                subject: 'Reagendamento de Consultoria',
                body: `<p>Olá,</p><br><p>Recebemos sua solicitação de reagendamento.</p><p>O novo horário ficou para: <strong>[INSERIR DATA]</strong></p>`
            }
        ]
    },
    'NRP': {
        title: 'NRP / Encerramento',
        emails: [
            {
                id: 'nrp_final',
                name: 'NRP Final (Encerramento)',
                subject: 'Encerramento de Caso - Sem Contato',
                body: `<p>Olá,</p><br><p>Devido à falta de contato após múltiplas tentativas, estamos encerrando este caso por enquanto.</p><p>Caso precise de ajuda futura, por favor entre em contato com seu gerente de contas.</p>`
            }
        ]
    }
};