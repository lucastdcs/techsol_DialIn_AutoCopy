// src/modules/quick-email/quick-email-data.js

export const QUICK_EMAILS = {
    'CONTACT': {
        title: 'Tentativas & Agendamento',
        emails: [
            {
                id: 'attempt_10min',
                name: 'Tentativa de Contato (Antes dos 10min)',
                subject: 'Implementação com o Time de Soluções Técnicas do Google - Tentativa de Contato',
                body: `
                    <p>Olá,</p>
                    <br>
                    <p>Aqui é o <strong>[Seu Nome]</strong> da equipe de Soluções Técnicas do Google. Tentei ligar no seguinte número: <strong>...</strong> sem sucesso, teria outro número para que eu pudesse entrar em contato?</p>
                    <br>
                    <p>Lembrando que vou auxiliar a implementar a seguinte tarefa:</p>
                    <p><strong>Ads Conversion Tracking</strong></p>
                    <br>
                    <p>Em seu site: <strong>[INSERIR URL]</strong></p>
                    <p>Tentarei ligar novamente dentro de 10 minutos, caso prefira, você pode acessar o link da nossa reunião: <strong>[LINK DO MEET]</strong></p>
                    <br>
                    <p>Atenciosamente,</p>
                    <p><strong>[Seu Nome]</strong><br>Time de Soluções Técnicas Cognizant, em nome do Google.</p>
                `
            },
            {
                id: 'reschedule',
                name: 'Proposta de Reagendamento',
                subject: 'Reagendamento de Consultoria',
                body: `
                    <p>Olá, tudo bem?</p>
                    <br>
                    <p>Seguem as próximas datas disponíveis:</p>
                    <ul>
                        <li><strong>[DATA 1] às [HORA]</strong></li>
                        <li><strong>[DATA 2] às [HORA]</strong></li>
                        <li><strong>[DATA 3] às [HORA]</strong></li>
                    </ul>
                    <br>
                    <p>Também informo que se não houver resposta a este email, realizarei um acompanhamento neste caso durante 6 dias, onde entrarei em contato a cada 3 dias para tentarmos reagendar seu caso o mais breve possível.</p>
                    <p>Reforço que minha agenda é dinâmica, sendo assim, a qualquer momento um atendimento pode ser marcado para os dias disponíveis. Logo, quanto mais rápido conseguir me responder, mais garantido será o agendamento de data e horário.</p>
                    <br>
                    <p>Atenciosamente,</p>
                    <p><strong>[Seu Nome]</strong><br>Time de Soluções Técnicas Cognizant, em nome do Google.</p>
                `
            }
        ]
    },
    'PROCESS_2_6': {
        title: 'Processo 2/6',
        emails: [
            {
                id: '2_6_day3',
                name: 'Dia 3 (Acompanhamento)',
                subject: 'Consultoria com a Equipe de Soluções Técnicas do Google',
                body: `
                    <p>Olá, <strong>[Nome do Cliente]</strong></p>
                    <br>
                    <p>Espero que você esteja bem!</p>
                    <p>Tentamos contato através do Número de Telefone, porém sem sucesso. Gostaria de saber se você já conseguiu <strong>[INFORMAR QUAL AÇÃO FICOU PENDENTE]</strong>, ou se você já possui uma previsão de quando essa ação será concluída.</p>
                    <br>
                    <p>Continuarei monitorando o status da implementação no seu site, e no dia <strong>[MM/DD/YYYY]</strong> farei um novo acompanhamento para verificar o andamento da implementação.</p>
                    <p>Se você tiver algum problema ou dúvidas que impossibilite de realizar a implementação, fique à vontade para compartilhá-lo conosco.</p>
                    <br>
                    <p>Fico à disposição.</p>
                    <p><strong>[Seu Nome]</strong><br>Time de Soluções Técnicas Cognizant, em nome do Google</p>
                `
            },
            {
                id: '2_6_day6',
                name: 'Dia 6 (Acompanhamento Final)',
                subject: 'Consultoria com a Equipe de Soluções Técnicas do Google',
                body: `
                    <p>Olá, <strong>[Nome do Cliente]</strong></p>
                    <br>
                    <p>Espero que você esteja bem!</p>
                    <p>Após análise e revisão do status de implementação da tag no seu site, <strong>[URL]</strong>, verificamos que a tag ainda está com a implementação pendente. Tentamos contato através do email, porém sem sucesso.</p>
                    <br>
                    <p>É essencial que seja implementado, pois ele oferece uma ampla gama de benefícios, como:</p>
                    <ul>
                        <li>Ajuda a rastrear conversões em tempo real</li>
                        <li>Melhora a geração de receita, em termos de cliques</li>
                        <li>Serve para vincular o Google Analytics e os anúncios e acompanhar conversões</li>
                        <li>Fornece informações sobre a experiência do usuário</li>
                    </ul>
                    <br>
                    <p>Se você tiver algum problema ou dúvidas que o impossibilite de realizar a implementação, fique à vontade para compartilhá-lo conosco. Teremos o maior prazer em ajudar.</p>
                    <p>Caso não tenhamos nenhuma resposta nos próximos 3 dias, infelizmente o caso será encerrado.</p>
                    <br>
                    <p>Fico à disposição.</p>
                    <p><strong>[Seu Nome]</strong><br>Time de Soluções Técnicas Cognizant, em nome do Google</p>
                `
            }
        ]
    },
    'NRP_CLOSING': {
        title: 'NRP / Encerramento',
        emails: [
            {
                id: 'nrp_standard',
                name: 'NRP - Padrão (3ª Tentativa)',
                subject: 'Implementação com o Time de Soluções Técnicas do Google - Encerramento',
                body: `
                    <p>Olá, <strong>[Nome do Cliente]</strong>,</p>
                    <br>
                    <p>Tentamos ligar para você hoje sobre o caso de Implementação da tag referente à solicitação para <strong>[Task pedida pelo AM]</strong>. Outra tentativa foi feita após 10 minutos, mas também não conseguimos contato com você.</p>
                    <p>Devido à grande demanda, não podemos reagendar um horário. Por isso, vamos encerrar este caso. No entanto, se você ainda quiser continuar com a implementação, basta você acessar este link e escolher a melhor data e horário para falar com o nosso time, ou se preferir, entre em contato com seu gerente de contas do Google para agendar uma nova reunião.</p>
                    <p>Lamentamos o inconveniente e esperamos trabalhar com você novamente no futuro.</p>
                    <br>
                    <p>Se você quiser saber mais, confira abaixo alguns links úteis de recursos valiosos relacionados à implementação de tags e suporte do Shopping.</p>
                    <p><strong>Em relação às tags</strong></p>
                    <ul>
                        <li>Suporte à implementação de tags</li>
                        <li>Google Ads</li>
                        <li>Google Analytics</li>
                    </ul>
                    <p><strong>Em relação ao Shopping</strong></p>
                    <ul>
                        <li>Google for Retail</li>
                        <li>Google Merchant Center</li>
                        <li>Como configurar a conta e o feed</li>
                        <li>Otimização do feed</li>
                        <li>Google plataformas</li>
                    </ul>
                    <br>
                    <p><strong>[Seu Nome]</strong><br>Time de Soluções Técnicas Cognizant, em nome do Google</p>
                `
            },
            {
                id: 'nrp_dfa',
                name: 'NRP - DFA',
                subject: 'Implementação com o Time de Soluções Técnicas do Google - Encerramento',
                body: `
                    <p>Olá, <strong>[Nome do Cliente]</strong>,</p>
                    <br>
                    <p>Tentamos ligar para você hoje sobre o caso de Implementação da tag referente à solicitação. Outra tentativa foi feita após 10 minutos, mas também não conseguimos contato com você.</p>
                    <p>Devido à grande demanda, não podemos reagendar um horário. Por isso, vamos encerrar este caso. No entanto, se você ainda quiser continuar com a implementação, basta você acessar este link e escolher a melhor data e horário para falar com o nosso time.</p>
                    <p>Lamentamos o inconveniente e esperamos trabalhar com você novamente no futuro.</p>
                    <br>
                    <p>Se você quiser saber mais, confira abaixo alguns links úteis de recursos valiosos relacionados à implementação de tags e suporte do Shopping.</p>
                    <p><strong>Em relação às tags</strong></p>
                    <ul>
                        <li>Suporte à implementação de tags</li>
                        <li>Google Ads</li>
                        <li>Google Analytics</li>
                    </ul>
                    <p><strong>Em relação ao Shopping</strong></p>
                    <ul>
                        <li>Google for Retail</li>
                        <li>Google Merchant Center</li>
                        <li>Como configurar a conta e o feed</li>
                        <li>Otimização do feed</li>
                        <li>Google plataformas</li>
                    </ul>
                    <br>
                    <p><strong>[Seu Nome]</strong><br>Time de Soluções Técnicas Cognizant, em nome do Google</p>
                `
            }
        ]
    }
};