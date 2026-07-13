[
    {
        "id": "m1",
        "title": "📧 O Primeiro E-mail",
        "description": "Leia o e-mail de Helena sobre a investigação da Sigma.",
        "hint": "Verifique sua caixa de entrada. O e-mail é de 2026-07-08.",
        "unlock": "e1",
        "required": [],
        "completed": false
    },
    {
        "id": "m2",
        "title": "💬 A Conversa Suspeita",
        "description": "Leia a conversa de Helena com seu contato anônimo.",
        "hint": "Verifique as mensagens. A conversa é de 2026-07-09.",
        "unlock": "m1",
        "required": ["m1"],
        "completed": false
    },
    {
        "id": "m3",
        "title": "🖼️ A Última Foto",
        "description": "Encontre a última foto de Helena antes do desaparecimento.",
        "hint": "Verifique as evidências. Procure pela Foto_001.png.",
        "unlock": "ev1",
        "required": ["m1", "m2"],
        "completed": false
    },
    {
        "id": "m4",
        "title": "📄 O Relatório Secreto",
        "description": "Analise o relatório financeiro da Sigma Corp.",
        "hint": "Verifique as evidências. Procure pelo Documento_001.pdf.",
        "unlock": "ev2",
        "required": ["m1", "m2", "m3"],
        "completed": false
    },
    {
        "id": "m5",
        "title": "🔍 O Código Escondido",
        "description": "Encontre o código numérico escondido na Foto_001.png.",
        "hint": "Amplie a imagem. Há números escritos na parede ao fundo.",
        "unlock": "ev1",
        "required": ["m1", "m2", "m3", "m4"],
        "completed": false
    },
    {
        "id": "m6",
        "title": "🔐 A Pasta Secreta",
        "description": "Use o código 4472 para abrir a pasta secreta da Sigma.",
        "hint": "O código está na foto. Use-o para acessar arquivos restritos.",
        "unlock": "ev4",
        "required": ["m1", "m2", "m3", "m4", "m5"],
        "completed": false
    },
    {
        "id": "m7",
        "title": "🎬 A Verdade Revelada",
        "description": "Assista ao vídeo sobre a sala 4 até o final.",
        "hint": "Verifique as evidências. Procure pelo Video_001.mp4.",
        "unlock": "ev3",
        "required": ["m1", "m2", "m3", "m4", "m5", "m6"],
        "completed": false
    },
    {
        "id": "m8",
        "title": "📝 Relatório Final",
        "description": "Preencha o relatório final com suas conclusões.",
        "hint": "Responda às perguntas sobre o caso.",
        "unlock": "final",
        "required": ["m1", "m2", "m3", "m4", "m5", "m6", "m7"],
        "completed": false
    }
]