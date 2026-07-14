/* ============================================
   EVIDENCE - Data Layer
   Versão: 1.0.0
   ============================================ */

// ============================================
// MAIN DATA STRUCTURE
// ============================================

const EVIDENCE_DATA = {
    // ----- Metadata -----
    meta: {
        title: 'Arquivo Encontrado',
        version: '1.0.0',
        author: 'Evidence Team',
        lastUpdated: '2026-07-14',
        totalCases: 1,
        currentCase: 'case01'
    },

    // ----- Case 01: O Arquivo Encontrado -----
    case01: {
        id: 'case01',
        title: 'O Arquivo Encontrado',
        subtitle: 'Um computador abandonado foi entregue à sua investigação.',
        description: 'Em um escritório vazio, um computador antigo foi deixado para trás. Dentro dele, arquivos que contam uma história que ninguém quer que seja descoberta.',
        status: 'active',
        
        // ----- Files Structure -----
        files: {
            // ----- PHOTOS -----
            photos: [
                {
                    id: 'photo_001',
                    name: 'Estação Central',
                    type: 'image',
                    icon: '🖼️',
                    size: '2.4 MB',
                    dimensions: '1920x1080',
                    date: '2026-03-12',
                    time: '18:45',
                    location: 'Estação Central',
                    description: 'A estação estava vazia, mas algo estava errado... Uma sombra suspeita ao fundo.',
                    image: 'assets/images/estacao.png',
                    metadata: {
                        camera: 'iPhone 15 Pro',
                        aperture: 'f/1.8',
                        iso: '400',
                        flash: false,
                        gps: '-23.5505, -46.6333'
                    },
                    tags: ['estação', 'noite', 'sombra', 'suspeito'],
                    evidence: true,
                    evidenceId: 'ev_001',
                    found: true
                },
                {
                    id: 'photo_002',
                    name: 'O Diário',
                    type: 'image',
                    icon: '🖼️',
                    size: '3.1 MB',
                    dimensions: '4032x3024',
                    date: '2026-03-15',
                    time: '09:12',
                    location: 'Arquivo Público',
                    description: 'Páginas amareladas com uma escrita trêmula. Algumas palavras estão borradas.',
                    image: 'assets/images/diario.png',
                    metadata: {
                        camera: 'Canon EOS R6',
                        aperture: 'f/2.8',
                        iso: '100',
                        flash: false,
                        gps: '-23.5405, -46.6233'
                    },
                    tags: ['diário', 'manuscrito', 'arquivo'],
                    evidence: true,
                    evidenceId: 'ev_002',
                    found: true
                },
                {
                    id: 'photo_003',
                    name: 'Reflexo',
                    type: 'image',
                    icon: '🖼️',
                    size: '1.8 MB',
                    dimensions: '2048x1536',
                    date: '2026-03-18',
                    time: '22:30',
                    location: 'Rua das Acácias, 47',
                    description: 'Reflexo em uma janela escura. Alguém observa do outro lado da rua.',
                    image: 'assets/images/reflexo.png',
                    metadata: {
                        camera: 'Samsung Galaxy S24',
                        aperture: 'f/1.8',
                        iso: '800',
                        flash: false,
                        gps: '-23.5605, -46.6433'
                    },
                    tags: ['reflexo', 'observação', 'noite'],
                    evidence: false,
                    found: false
                },
                {
                    id: 'photo_004',
                    name: 'Contrato',
                    type: 'image',
                    icon: '🖼️',
                    size: '4.2 MB',
                    dimensions: '6000x4000',
                    date: '2026-03-22',
                    time: '05:41',
                    location: 'Escritório Central',
                    description: 'Contrato com uma assinatura ilegível. Algo parece errado com este documento.',
                    image: 'assets/images/contrato.png',
                    metadata: {
                        camera: 'Sony A7IV',
                        aperture: 'f/2.8',
                        iso: '200',
                        flash: true,
                        gps: '-23.5705, -46.6533'
                    },
                    tags: ['contrato', 'documento', 'assinatura'],
                    evidence: true,
                    evidenceId: 'ev_003',
                    found: true
                }
            ],

            // ----- MESSAGES -----
            messages: [
                {
                    id: 'msg_001',
                    type: 'message',
                    icon: '💬',
                    sender: 'Ana',
                    senderId: 'char_001',
                    recipient: 'Você',
                    date: '2026-03-12',
                    time: '19:23',
                    preview: 'Você está aí?',
                    content: 'Você está aí?\n\nPreciso falar com você. É urgente.\n\nVi algo que não deveria ter visto. Na estação.\n\nMe encontra no café amanhã.\n\nPor favor, vem.',
                    status: 'read',
                    attachments: [],
                    tags: ['urgente', 'testemunha', 'estação'],
                    evidence: true,
                    evidenceId: 'ev_004',
                    found: true
                },
                {
                    id: 'msg_002',
                    type: 'message',
                    icon: '💬',
                    sender: 'Lucas',
                    senderId: 'char_002',
                    recipient: 'Você',
                    date: '2026-03-15',
                    time: '14:07',
                    preview: 'Não abra a pasta azul.',
                    content: 'Não abra a pasta azul.\n\nPor favor, confie em mim.\n\nAlgumas coisas são melhor deixadas como estão.\n\nVocê não está pronto para o que vai encontrar.',
                    status: 'read',
                    attachments: [],
                    tags: ['alerta', 'perigo', 'pasta azul'],
                    evidence: true,
                    evidenceId: 'ev_005',
                    found: true
                },
                {
                    id: 'msg_003',
                    type: 'message',
                    icon: '💬',
                    sender: 'Carlos',
                    senderId: 'char_003',
                    recipient: 'Você',
                    date: '2026-03-18',
                    time: '23:41',
                    preview: 'Eles sabem que você encontrou.',
                    content: 'Eles sabem que você encontrou.\n\nVocê precisa sumir.\n\nApague tudo e vá para o hotel.\n\nEu te encontro lá.\n\nNão confie em ninguém.',
                    status: 'read',
                    attachments: [],
                    tags: ['alerta', 'fuga', 'perigo'],
                    evidence: true,
                    evidenceId: 'ev_006',
                    found: true
                },
                {
                    id: 'msg_004',
                    type: 'message',
                    icon: '💬',
                    sender: 'Desconhecido',
                    senderId: null,
                    recipient: 'Você',
                    date: '2026-03-22',
                    time: '06:02',
                    preview: 'O contrato não é o que parece.',
                    content: 'O contrato não é o que parece.\n\nLeia as cláusulas 7 e 12.\n\nTudo muda quando você sabe o que procurar.\n\nA verdade está escondida no que não foi dito.',
                    status: 'unread',
                    attachments: [],
                    tags: ['mistério', 'contrato', 'cláusulas'],
                    evidence: true,
                    evidenceId: 'ev_007',
                    found: false
                }
            ],

            // ----- DOCUMENTS -----
            documents: [
                {
                    id: 'doc_001',
                    name: 'Diario_2026.pdf',
                    type: 'document',
                    icon: '📄',
                    size: '156 KB',
                    pages: 24,
                    date: '2026-03-12',
                    description: 'Entradas de um diário pessoal. Algumas páginas foram rasgadas.',
                    content: '12 de março de 2026\n\nHoje encontrei algo que não deveria.\n\nO contrato. A pasta azul. Tudo está conectado.\n\nEles vão tentar me silenciar.\n\nPreciso deixar registrado antes que seja tarde demais.\n\n[Páginas rasgadas]\n\n...não confie em ninguém, nem mesmo em quem você ama...',
                    tags: ['diário', 'pessoal', 'rasgado', 'contrato'],
                    evidence: true,
                    evidenceId: 'ev_002',
                    found: true
                },
                {
                    id: 'doc_002',
                    name: 'Contrato_Assinado.pdf',
                    type: 'document',
                    icon: '📄',
                    size: '89 KB',
                    pages: 8,
                    date: '2026-03-22',
                    description: 'Contrato com cláusulas suspeitas. A assinatura parece ser de alguém que não deveria estar ali.',
                    content: 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS\n\nCláusula 7: O contratado não poderá divulgar qualquer informação referente ao objeto deste contrato sob pena de...\n\nCláusula 12: Em caso de descumprimento, o contratado estará sujeito a...\n\n[Assinatura ilegível]\n\nData: 22/03/2026',
                    tags: ['contrato', 'legal', 'suspeito', 'cláusulas'],
                    evidence: true,
                    evidenceId: 'ev_003',
                    found: true
                }
            ],

            // ----- AUDIO -----
            audio: [
                {
                    id: 'audio_001',
                    name: 'Ligacao_15-03.mp3',
                    type: 'audio',
                    icon: '🎤',
                    duration: '03:12',
                    date: '2026-03-15',
                    time: '22:15',
                    description: 'Gravação de uma ligação. Vozes abafadas ao fundo.',
                    transcript: '[00:00] - Você: Alô?\n[00:05] - Voz feminina: Por favor, me ajuda...\n[00:12] - Você: Ana? É você?\n[00:18] - Ana: Eles estão me seguindo...\n[00:32] - Ana: Preciso desaparecer.\n[00:52] - Ana: Não posso dizer...\n[01:10] - Ana: A pasta azul... está tudo lá...\n[01:28] - [Ligação cai]',
                    tags: ['ligação', 'choro', 'desespero', 'ana'],
                    evidence: true,
                    evidenceId: 'ev_008',
                    found: true
                }
            ],

            // ----- VIDEO -----
            video: [
                {
                    id: 'video_001',
                    name: 'CCTV_Estacao_12-03.mp4',
                    type: 'video',
                    icon: '🎥',
                    duration: '00:47',
                    date: '2026-03-12',
                    time: '18:45',
                    description: 'Circuito interno da estação. Um vulto passa rapidamente pelo corredor.',
                    thumbnail: null,
                    transcript: '[00:00] - Imagem estática do corredor vazio\n[00:15] - Um vulto passa pela esquerda\n[00:22] - O vulto parece carregar algo\n[00:35] - O vulto desaparece na direita',
                    tags: ['cctv', 'estação', 'vulto', 'segurança'],
                    evidence: true,
                    evidenceId: 'ev_009',
                    found: true
                }
            ],

            // ----- LOCATIONS -----
            locations: [
                {
                    id: 'loc_001',
                    name: 'Estação Central',
                    address: 'Av. Central, 1000 - Centro',
                    date: '2026-03-12',
                    status: 'investigated',
                    description: 'Local do primeiro avistamento. A estação estava vazia.',
                    coordinates: { lat: -23.5505, lng: -46.6333 },
                    evidence: ['photo_001', 'video_001']
                },
                {
                    id: 'loc_002',
                    name: 'Rua das Acácias, 47',
                    address: 'Rua das Acácias, 47 - Vila Nova',
                    date: '2026-03-18',
                    status: 'pending',
                    description: 'Casa abandonada. Reflexos nas janelas sugerem que alguém estava observando.',
                    coordinates: { lat: -23.5605, lng: -46.6433 },
                    evidence: ['photo_003']
                },
                {
                    id: 'loc_003',
                    name: 'Arquivo Público',
                    address: 'Rua dos Arquivos, 200 - Centro',
                    date: '2026-03-15',
                    status: 'investigated',
                    description: 'Documentos históricos foram acessados dias antes do incidente.',
                    coordinates: { lat: -23.5405, lng: -46.6233 },
                    evidence: ['photo_002', 'doc_001']
                },
                {
                    id: 'loc_004',
                    name: 'Escritório Central',
                    address: 'Av. Empresarial, 500 - Torre B, Sala 1204',
                    date: '2026-03-22',
                    status: 'locked',
                    description: 'Último local conhecido. O contrato foi assinado aqui.',
                    coordinates: { lat: -23.5705, lng: -46.6533 },
                    evidence: ['photo_004', 'doc_002']
                }
            ],

            // ----- EVIDENCE -----
            evidence: [
                { 
                    id: 'ev_001', 
                    name: 'Foto da Estação', 
                    description: 'Imagem da estação vazia com uma sombra ao fundo.', 
                    found: true, 
                    importance: 'high',
                    category: 'Visual'
                },
                { 
                    id: 'ev_002', 
                    name: 'Páginas do Diário', 
                    description: 'Páginas rasgadas de um diário pessoal.', 
                    found: true, 
                    importance: 'high',
                    category: 'Documento'
                },
                { 
                    id: 'ev_003', 
                    name: 'Contrato', 
                    description: 'Contrato com cláusulas suspeitas.', 
                    found: true, 
                    importance: 'critical',
                    category: 'Documento'
                },
                { 
                    id: 'ev_004', 
                    name: 'Mensagem de Ana', 
                    description: 'Primeira mensagem de Ana - "Você está aí?"', 
                    found: true, 
                    importance: 'medium',
                    category: 'Comunicação'
                },
                { 
                    id: 'ev_005', 
                    name: 'Alerta de Lucas', 
                    description: 'Mensagem de Lucas - "Não abra a pasta azul"', 
                    found: true, 
                    importance: 'high',
                    category: 'Comunicação'
                },
                { 
                    id: 'ev_006', 
                    name: 'Alerta de Carlos', 
                    description: 'Mensagem de Carlos - "Eles sabem"', 
                    found: true, 
                    importance: 'high',
                    category: 'Comunicação'
                },
                { 
                    id: 'ev_007', 
                    name: 'Mensagem do Desconhecido', 
                    description: 'Mensagem sobre o contrato - "Leia as cláusulas 7 e 12"', 
                    found: false, 
                    importance: 'critical',
                    category: 'Comunicação'
                },
                { 
                    id: 'ev_008', 
                    name: 'Gravação de Áudio', 
                    description: 'Gravação da ligação com Ana.', 
                    found: true, 
                    importance: 'high',
                    category: 'Áudio'
                },
                { 
                    id: 'ev_009', 
                    name: 'Vídeo da Estação', 
                    description: 'Vídeo da câmera de segurança.', 
                    found: true, 
                    importance: 'medium',
                    category: 'Vídeo'
                }
            ],

            // ----- TIMELINE -----
            timeline: [
                { 
                    id: 'tl_001', 
                    date: '2026-03-12', 
                    event: 'Primeiro avistamento na estação', 
                    evidence: ['photo_001', 'video_001'],
                    description: 'A estação estava vazia, mas as câmeras captaram algo.'
                },
                { 
                    id: 'tl_002', 
                    date: '2026-03-15', 
                    event: 'Descoberta do diário no arquivo público', 
                    evidence: ['photo_002', 'doc_001'],
                    description: 'Páginas de um diário são encontradas.'
                },
                { 
                    id: 'tl_003', 
                    date: '2026-03-15', 
                    event: 'Alerta de Lucas - "Não abra a pasta azul"', 
                    evidence: ['msg_002'],
                    description: 'Lucas envia um alerta sobre a pasta azul.'
                },
                { 
                    id: 'tl_004', 
                    date: '2026-03-18', 
                    event: 'Reflexo na janela', 
                    evidence: ['photo_003'],
                    description: 'Alguém observa da rua das Acácias.'
                },
                { 
                    id: 'tl_005', 
                    date: '2026-03-18', 
                    event: 'Carlos alerta - "Eles sabem"', 
                    evidence: ['msg_003'],
                    description: 'Carlos diz que descobriram que você encontrou algo.'
                },
                { 
                    id: 'tl_006', 
                    date: '2026-03-22', 
                    event: 'Contrato assinado no escritório central', 
                    evidence: ['photo_004', 'doc_002'],
                    description: 'Um contrato suspeito é assinado.'
                },
                { 
                    id: 'tl_007', 
                    date: '2026-03-22', 
                    event: 'Mensagem do desconhecido', 
                    evidence: ['msg_004'],
                    description: 'Alguém envia uma mensagem sobre as cláusulas.'
                }
            ],

            // ----- CHARACTERS -----
            characters: [
                {
                    id: 'char_001',
                    name: 'Ana',
                    role: 'Testemunha',
                    description: 'Trabalhava na estação central. Foi a primeira a ver algo estranho.',
                    status: 'missing',
                    messages: ['msg_001'],
                    lastSeen: '2026-03-15'
                },
                {
                    id: 'char_002',
                    name: 'Lucas',
                    role: 'Informante',
                    description: 'Parece saber mais do que revela. Avisou sobre a "pasta azul".',
                    status: 'active',
                    messages: ['msg_002'],
                    lastSeen: '2026-03-15'
                },
                {
                    id: 'char_003',
                    name: 'Carlos',
                    role: 'Investigador',
                    description: 'Trabalha no caso. Parece estar em perigo também.',
                    status: 'active',
                    messages: ['msg_003'],
                    lastSeen: '2026-03-18'
                }
            ]
        }
    }
};

// ============================================
// DATA HELPER FUNCTIONS
// ============================================

const DataHelper = {
    getCase: (caseId = 'case01') => {
        return EVIDENCE_DATA[caseId] || null;
    },

    getFiles: (folder, caseId = 'case01') => {
        const caseData = DataHelper.getCase(caseId);
        if (!caseData) return [];
        return caseData.files[folder] || [];
    },

    getFile: (folder, fileId, caseId = 'case01') => {
        const files = DataHelper.getFiles(folder, caseId);
        return files.find(file => file.id === fileId) || null;
    },

    getEvidence: (caseId = 'case01') => {
        const caseData = DataHelper.getCase(caseId);
        if (!caseData) return [];
        return caseData.files.evidence || [];
    },

    getFoundEvidenceCount: (caseId = 'case01') => {
        const evidence = DataHelper.getEvidence(caseId);
        return evidence.filter(e => e.found).length;
    },

    getTotalEvidenceCount: (caseId = 'case01') => {
        const evidence = DataHelper.getEvidence(caseId);
        return evidence.length;
    },

    getProgress: (caseId = 'case01') => {
        const found = DataHelper.getFoundEvidenceCount(caseId);
        const total = DataHelper.getTotalEvidenceCount(caseId);
        return total > 0 ? Math.round((found / total) * 100) : 0;
    },

    markEvidenceFound: (evidenceId, caseId = 'case01') => {
        const evidence = DataHelper.getEvidence(caseId);
        const item = evidence.find(e => e.id === evidenceId);
        if (item && !item.found) {
            item.found = true;
            return true;
        }
        return false;
    },

    getTimeline: (caseId = 'case01') => {
        const caseData = DataHelper.getCase(caseId);
        if (!caseData) return [];
        return caseData.files.timeline || [];
    },

    getCharacters: (caseId = 'case01') => {
        const caseData = DataHelper.getCase(caseId);
        if (!caseData) return [];
        return caseData.files.characters || [];
    },

    getLocations: (caseId = 'case01') => {
        const caseData = DataHelper.getCase(caseId);
        if (!caseData) return [];
        return caseData.files.locations || [];
    },

    searchFiles: (query, caseId = 'case01') => {
        const caseData = DataHelper.getCase(caseId);
        if (!caseData || !query || query.trim().length < 2) return [];
        
        const results = [];
        const folders = ['photos', 'messages', 'documents', 'audio', 'video'];
        const searchTerm = query.toLowerCase().trim();
        
        folders.forEach(folder => {
            const files = caseData.files[folder] || [];
            const matches = files.filter(file => {
                const searchText = [
                    file.name,
                    file.description || '',
                    file.tags ? file.tags.join(' ') : '',
                    file.content || '',
                    file.transcript || '',
                    file.sender || '',
                    file.location || ''
                ].join(' ').toLowerCase();
                return searchText.includes(searchTerm);
            });
            results.push(...matches.map(file => ({ ...file, folder })));
        });
        
        return results;
    }
};

// ============================================
// EXPORT
// ============================================

if (typeof window !== 'undefined') {
    window.EVIDENCE_DATA = EVIDENCE_DATA;
    window.DataHelper = DataHelper;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EVIDENCE_DATA, DataHelper };
}

console.log('🔍 Evidence - Data Layer Loaded');
console.log(`📁 Total Cases: ${Object.keys(EVIDENCE_DATA).filter(key => key !== 'meta').length}`);
console.log(`📊 Total Evidence: ${DataHelper.getTotalEvidenceCount()}`);
console.log(`📈 Progress: ${DataHelper.getProgress()}%`);
console.log('ℹ️ Use DataHelper to interact with the data.');