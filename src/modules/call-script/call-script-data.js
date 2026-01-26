// src/modules/call-script/call-script-data.js

export const csaChecklistData = {
    "PT BAU": {
        color: "#6c1199",
        inicio: [
            "Apresentação (Nome e Time)",
            "Aviso de Gravação e Política de Privacidade",
            "Confirmação de CID e Email",
            "(Opcional) Validar autenticação da conta via link",
            "Confirmação da Task e do AM",
            "Informar tempo da ligação (30-45 min)",
            "Pedir para fechar conteúdo sensível",
            "Validar Backup e Acessos Admin"
        ],
        meio: [
            "Ofertar Implementação via Tag Support (Acesso Temporário)",
            "Enviar e orientar aceite do email 'Consentimento e autorização...'",
            "Confirmar recebimento do acesso",
            "Iniciar Configuração (Aviso de silêncio ~10min)",
            "[Caso Recuse] Seguir com Compartilhamento de Tela"
        ],
        fim: [
            "Resumo da chamada (o que foi feito e como funciona)",
            "Oferecer ajuda adicional / Abrir para dúvidas",
            "Pedir para fechar compartilhamento de tela (se houver)",
            "Próximos passos (Acompanhamento por XX dias)",
            "Pedir consentimento para teste de QA",
            "Alinhar escopo (Técnico vs. Gerente de Contas)",
            "Pesquisa de Satisfação (e confirmar email para envio)",
            "Despedida"
        ]
    },
    "PT LT": {
        color: "#004f67",
        inicio: [
            "Apresentação (Nome, Time e Motivo)",
            "Aviso de Gravação e Privacidade",
            "Confirmar: Email, CID, Telefone e Site",
            "Confirmação da Task e do AM",
            "Informar duração (30-45 min)",
            "Pedir para fechar conteúdo sensível",
            "Validar Backup e Acessos Admin"
        ],
        meio: [
            "Ofertar Implementação via Tag Support (Acesso Temporário)",
            "Enviar e orientar aceite do email 'Consentimento e autorização...'",
            "Confirmar recebimento do acesso",
            "Iniciar Configuração (Aviso de silêncio ~10min)",
            "[Caso Recuse] Seguir com Compartilhamento de Tela"
        ],
        fim: [
            "Resumo da chamada",
            "Oferecer ajuda adicional",
            "Encerrar compartilhamento (se houver)",
            "Próximos passos e Monitoramento",
            "Consentimento para teste de QA",
            "Alinhamento de Escopo",
            "Pesquisa de Satisfação",
            "Despedida"
        ]
    },
    "ES BAU": {
        color: "#00bbff",
        inicio: ["Introducción (Nombre y  Equipo).", "La llamada pode ser grabada...", "Informar sitio web registrado.", "Confirmación: CID y Email.", "Confirmaciones: Tarea, AM", "Informar tiempo de reunión.", "Confirmación: Backup y Acceso Admin", "Cerrar conteúdo sensível." ],
        fim: ["Resumen de la llamada.", "Ayuda adicional.", "Cerrar pantalla compartida.", "Próximos passos.", "Encuesta de Satisfação.", "Consentimiento para prueba de QA.", "Despedida."]
    },
    "ES LT": {
        color: "#f269ff",
        inicio: ["Presentación.", "Aviso de grabación.", "Duración de llamada.", "Confirmar: CID, Email, Teléfono, Site.", "Autenticación (se aplica).", "Términos y condiciones.", "Confirmar Task y AM.", "Cerrar contenido sensible.", "Backup y Accesos."],
        fim: ["Ayuda adicional.", "Dejar de compartir pantalla.", "Pasos siguientes.", "Encuesta de Satisfação.", "Aviso sobre pruebas de QA."]
    },
    "EN BAU": {
        color: "#ff0011",
        inicio: ["Introduction", "Recording Disclosure"],
        fim: ["Summary", "Next Steps"]
    }
};