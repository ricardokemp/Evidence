/* ============================================
   EVIDENCE - Data Layer
   História: O Mistério do Arquivo Azul
   Versão: 2.0.0 - Com Sistema de Progressão
   ============================================ */

const EVIDENCE_DATA = {
    meta: {
        title: 'O Mistério do Arquivo Azul',
        version: '2.0.0',
        author: 'Evidence Team',
        lastUpdated: '2026-07-14',
        totalCases: 1,
        currentCase: 'case01'
    },

    case01: {
        id: 'case01',
        title: 'O Mistério do Arquivo Azul',
        subtitle: 'Uma cientista desapareceu. Seu computador guarda as respostas.',
        description: 'A Dra. Helena Mendes, renomada cientista, desapareceu há 3 dias. Em seu computador, encontramos um arquivo chamado "Projeto Azul" - protegido por senha. Você precisa encontrar as pistas para desvendar o que aconteceu.',
        status: 'active',
        
        files: {
            // ----- FOTOS -----
            photos: [
                {
                    id: 'photo1',
                    name: 'Laboratório',
                    type: 'image',
                    icon: '🖼️',
                    size: '2.8 MB',
                    date: '10/03/2026',
                    time: '14:30',
                    location: 'Laboratório Central',
                    description: 'O laboratório onde Helena trabalhava. Algo parece fora do lugar...',
                    image: 'assets/images/laboratorio.png',
                    tags: ['laboratório', 'cientista', 'experimento'],
                    evidence: true,
                    evidenceId: 'ev_001',
                    found: false
                },
                {
                    id: 'photo2',
                    name: 'Arquivo Azul',
                    type: 'image',
                    icon: '🖼️',
                    size: '1.2 MB',
                    date: '08/03/2026',
                    time: '09:15',
                    location: 'Escritório de Helena',
                    description: 'O misterioso arquivo azul. O que ele contém?',
                    image: 'assets/images/arquivo-azul.png',
                    tags: ['arquivo', 'azul', 'mistério'],
                    evidence: true,
                    evidenceId: 'ev_002',
                    found: false
                },
                {
                    id: 'photo3',
                    name: 'Anotações',
                    type: 'image',
                    icon: '🖼️',
                    size: '1.5 MB',
                    date: '09/03/2026',
                    time: '11:20',
                    location: 'Mesa de Helena',
                    description: 'Anotações confusas. Parece que ela estava com pressa.',
                    image: 'assets/images/anotacoes.png',
                    tags: ['anotações', 'pressa', 'código'],
                    evidence: true,
                    evidenceId: 'ev_003',
                    found: false
                }
            ],

            // ----- MENSAGENS -----
            messages: [
                {
                    id: 'msg1',
                    type: 'message',
                    icon: '💬',
                    sender: 'Dr. Ricardo Alves',
                    senderId: 'char_001',
                    recipient: 'Helena',
                    date: '09/03/2026',
                    time: '16:45',
                    preview: 'Helena, pare com isso!',
                    content: 'Helena, pare com isso!\n\nO que você está fazendo é perigoso.\n\nSe continuar, vai se arrepender.\n\nPor favor, reconsidere.\n\nEu não quero ver você se machucar.',
                    status: 'read',
                    tags: ['alerta', 'perigo', 'discussão'],
                    evidence: true,
                    evidenceId: 'ev_004',
                    found: false
                },
                {
                    id: 'msg2',
                    type: 'message',
                    icon: '💬',
                    sender: 'Profa. Sofia Lima',
                    senderId: 'char_002',
                    recipient: 'Helena',
                    date: '07/03/2026',
                    time: '22:10',
                    preview: 'Helena, estou preocupada.',
                    content: 'Helena, estou preocupada.\n\nVocê tem agido estranho.\n\nSe precisar de ajuda, estou aqui.\n\nNão importa o que esteja acontecendo.\n\nNão enfrente isso sozinha.',
                    status: 'read',
                    tags: ['preocupação', 'amiga', 'ajuda'],
                    evidence: true,
                    evidenceId: 'ev_005',
                    found: false
                },
                {
                    id: 'msg3',
                    type: 'message',
                    icon: '💬',
                    sender: 'Desconhecido',
                    senderId: null,
                    recipient: 'Helena',
                    date: '10/03/2026',
                    time: '07:30',
                    preview: 'Sabemos o que você descobriu.',
                    content: 'Sabemos o que você descobriu.\n\nArquivo Azul.\n\nVocê não deveria ter visto isso.\n\nPare agora.\n\nOu as consequências serão graves.',
                    status: 'unread',
                    tags: ['ameaça', 'arquivo azul', 'perigo'],
                    evidence: true,
                    evidenceId: 'ev_006',
                    found: false
                },
                {
                    id: 'msg4',
                    type: 'message',
                    icon: '💬',
                    sender: 'Helena Mendes',
                    senderId: 'char_003',
                    recipient: 'Dr. Ricardo',
                    date: '08/03/2026',
                    time: '23:50',
                    preview: 'Ricardo, preciso te contar a verdade.',
                    content: 'Ricardo, preciso te contar a verdade.\n\nSobre o Projeto Azul.\n\nNão é o que pensam.\n\nEles estão escondendo algo.\n\nEncontre o arquivo. Leia as cláusulas.\n\nTudo está lá.',
                    status: 'sent',
                    tags: ['verdade', 'projeto', 'confissão'],
                    evidence: true,
                    evidenceId: 'ev_007',
                    found: false
                }
            ],

            // ----- DOCUMENTOS -----
            documents: [
                {
                    id: 'doc1',
                    name: 'Relatorio_Projeto_Azul.pdf',
                    type: 'document',
                    icon: '📄',
                    size: '2.3 MB',
                    pages: 15,
                    date: '15/02/2026',
                    description: 'Relatório completo do Projeto Azul. Contém informações confidenciais.',
                    content: 'PROJETO AZUL - RELATÓRIO FINAL\n\nObjetivo: Pesquisa sobre [DADOS CENSURADOS]\n\nResultados: [CENSURADO]\n\nConclusão: O projeto foi bem-sucedido. Mas os custos foram... [PÁGINA RASGADA]\n\nRecomendação: Encerrar imediatamente.\n\nAssinatura: Dra. Helena Mendes\n\nData: 15/02/2026',
                    tags: ['relatório', 'projeto azul', 'confidencial'],
                    evidence: true,
                    evidenceId: 'ev_008',
                    found: false
                },
                {
                    id: 'doc2',
                    name: 'Termo_de_Sigilo.pdf',
                    type: 'document',
                    icon: '📄',
                    size: '856 KB',
                    pages: 3,
                    date: '20/01/2026',
                    description: 'Termo de sigilo assinado por todos os envolvidos no projeto.',
                    content: 'TERMO DE SIGILO\n\nEu, abaixo assinado, declaro que...\n\nCláusula 7: Não revelarei qualquer informação sobre o Projeto Azul.\n\nCláusula 12: Em caso de descumprimento, [INFORMAÇÃO CENSURADA]\n\nAssinaturas:\n- Dra. Helena Mendes\n- Dr. Ricardo Alves\n- [ILEGÍVEL]',
                    tags: ['sigilo', 'contrato', 'cláusulas'],
                    evidence: true,
                    evidenceId: 'ev_009',
                    found: false
                }
            ],

            // ----- ÁUDIO -----
            audio: [
                {
                    id: 'audio1',
                    name: 'Ligacao_Helena_10-03.mp3',
                    type: 'audio',
                    icon: '🎤',
                    duration: '04:28',
                    date: '10/03/2026',
                    time: '19:15',
                    description: 'Última ligação de Helena. Ela parece assustada.',
                    transcript: '[00:00] - Helena: Alô? Sofia?\n[00:05] - Sofia: Helena! Graças a Deus!\n[00:10] - Helena: Sofia, preciso de ajuda.\n[00:18] - Helena: Eles descobriram que eu sei.\n[00:25] - Sofia: Sabe o quê?\n[00:30] - Helena: O Projeto Azul. Não é o que parece.\n[00:45] - Helena: Eu tenho provas. Estão no arquivo.\n[01:10] - [Ruído de porta se abrindo]\n[01:20] - Helena: Preciso ir. Me desculpa.\n[01:35] - [Ligação cai]\n[01:45] - [Fim da gravação]',
                    tags: ['ligação', 'desespero', 'prova'],
                    evidence: true,
                    evidenceId: 'ev_010',
                    found: false
                }
            ],

            // ----- VÍDEO -----
            video: [
                {
                    id: 'video1',
                    name: 'CCTV_Lab_10-03.mp4',
                    type: 'video',
                    icon: '🎥',
                    duration: '02:15',
                    date: '10/03/2026',
                    time: '20:30',
                    description: 'Câmera de segurança do laboratório. Helena sai correndo.',
                    transcript: '[00:00] - Laboratório vazio\n[00:30] - Helena entra correndo\n[00:45] - Ela pega um arquivo azul\n[01:00] - Alguém aparece na porta\n[01:15] - Helena corre pela saída de emergência\n[01:45] - [Fim do vídeo]',
                    tags: ['cctv', 'laboratório', 'fuga'],
                    evidence: true,
                    evidenceId: 'ev_011',
                    found: false
                }
            ],

            // ----- LOCALIZAÇÕES -----
            locations: [
                {
                    id: 'loc_001',
                    name: 'Laboratório Central',
                    address: 'Av. da Ciência, 1000 - Campus Universitário',
                    date: '10/03/2026',
                    status: 'investigated',
                    description: 'Último local conhecido de Helena. O laboratório está vazio.',
                    coordinates: { lat: -23.5505, lng: -46.6333 },
                    evidence: ['photo1', 'video1']
                },
                {
                    id: 'loc_002',
                    name: 'Escritório de Helena',
                    address: 'Prédio de Pesquisas, Sala 307 - Campus Universitário',
                    date: '08/03/2026',
                    status: 'investigated',
                    description: 'Escritório de Helena. O arquivo azul estava aqui.',
                    coordinates: { lat: -23.5455, lng: -46.6283 },
                    evidence: ['photo2', 'photo3']
                },
                {
                    id: 'loc_003',
                    name: 'Arquivo Central',
                    address: 'Rua dos Arquivos, 200 - Centro',
                    date: '09/03/2026',
                    status: 'pending',
                    description: 'Helena esteve aqui pouco antes de desaparecer.',
                    coordinates: { lat: -23.5405, lng: -46.6233 },
                    evidence: ['doc1', 'doc2']
                }
            ],

            // ----- EVIDÊNCIAS (ORDEM DE PROGRESSÃO) -----
            evidence: [
                { 
                    id: 'ev_001', 
                    name: 'Foto do Laboratório', 
                    description: 'Imagem do laboratório de Helena.', 
                    found: false, 
                    importance: 'high',
                    category: 'Visual'
                },
                { 
                    id: 'ev_002', 
                    name: 'Arquivo Azul', 
                    description: 'Misterioso arquivo azul.', 
                    found: false, 
                    importance: 'critical',
                    category: 'Visual'
                },
                { 
                    id: 'ev_003', 
                    name: 'Anotações de Helena', 
                    description: 'Anotações confusas e apressadas.', 
                    found: false, 
                    importance: 'high',
                    category: 'Visual'
                },
                { 
                    id: 'ev_004', 
                    name: 'Mensagem de Ricardo', 
                    description: 'Alerta de Ricardo para Helena parar.', 
                    found: false, 
                    importance: 'medium',
                    category: 'Comunicação'
                },
                { 
                    id: 'ev_005', 
                    name: 'Mensagem de Sofia', 
                    description: 'Preocupação de Sofia com Helena.', 
                    found: false, 
                    importance: 'medium',
                    category: 'Comunicação'
                },
                { 
                    id: 'ev_006', 
                    name: 'Mensagem do Desconhecido', 
                    description: 'Ameaça sobre o Arquivo Azul.', 
                    found: false, 
                    importance: 'critical',
                    category: 'Comunicação'
                },
                { 
                    id: 'ev_007', 
                    name: 'Confissão de Helena', 
                    description: 'Helena diz a verdade a Ricardo.', 
                    found: false, 
                    importance: 'critical',
                    category: 'Comunicação'
                },
                { 
                    id: 'ev_008', 
                    name: 'Relatório do Projeto', 
                    description: 'Relatório completo do Projeto Azul.', 
                    found: false, 
                    importance: 'critical',
                    category: 'Documento'
                },
                { 
                    id: 'ev_009', 
                    name: 'Termo de Sigilo', 
                    description: 'Termo assinado por todos.', 
                    found: false, 
                    importance: 'high',
                    category: 'Documento'
                },
                { 
                    id: 'ev_010', 
                    name: 'Ligação de Helena', 
                    description: 'Última ligação de Helena.', 
                    found: false, 
                    importance: 'high',
                    category: 'Áudio'
                },
                { 
                    id: 'ev_011', 
                    name: 'Vídeo do Laboratório', 
                    description: 'Helena foge do laboratório.', 
                    found: false, 
                    importance: 'medium',
                    category: 'Vídeo'
                }
            ],

            // ----- TIMELINE -----
            timeline: [
                { 
                    id: 'tl_001', 
                    date: '07/03/2026', 
                    event: 'Sofia envia mensagem preocupada', 
                    evidence: ['msg2'],
                    description: 'Sofia nota que Helena está estranha.'
                },
                { 
                    id: 'tl_002', 
                    date: '08/03/2026', 
                    event: 'Helena confessa a Ricardo', 
                    evidence: ['msg4'],
                    description: 'Helena diz que precisa contar a verdade.'
                },
                { 
                    id: 'tl_003', 
                    date: '09/03/2026', 
                    event: 'Ricardo alerta Helena', 
                    evidence: ['msg1'],
                    description: 'Ricardo diz que Helena está em perigo.'
                },
                { 
                    id: 'tl_004', 
                    date: '10/03/2026', 
                    event: 'Helena recebe ameaça', 
                    evidence: ['msg3'],
                    description: 'Desconhecido ameaça Helena.'
                },
                { 
                    id: 'tl_005', 
                    date: '10/03/2026', 
                    event: 'Helena foge do laboratório', 
                    evidence: ['video1'],
                    description: 'Helena sai correndo do laboratório.'
                },
                { 
                    id: 'tl_006', 
                    date: '10/03/2026', 
                    event: 'Última ligação de Helena', 
                    evidence: ['audio1'],
                    description: 'Helena liga para Sofia desesperada.'
                }
            ],

            // ----- PERSONAGENS -----
            characters: [
                {
                    id: 'char_001',
                    name: 'Dr. Ricardo Alves',
                    role: 'Colega de Trabalho',
                    description: 'Trabalhava com Helena no laboratório. Parece preocupado com ela.',
                    status: 'active',
                    messages: ['msg1', 'msg4'],
                    lastSeen: '09/03/2026'
                },
                {
                    id: 'char_002',
                    name: 'Profa. Sofia Lima',
                    role: 'Amiga e Confidente',
                    description: 'Melhor amiga de Helena. Está muito preocupada.',
                    status: 'active',
                    messages: ['msg2', 'audio1'],
                    lastSeen: '10/03/2026'
                },
                {
                    id: 'char_003',
                    name: 'Dra. Helena Mendes',
                    role: 'Cientista Desaparecida',
                    description: 'Cientista brilhante. Desapareceu após descobrir algo sobre o Projeto Azul.',
                    status: 'missing',
                    messages: ['msg4', 'audio1'],
                    lastSeen: '10/03/2026'
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
console.log('📖 História: O Mistério do Arquivo Azul (v2.0)');
console.log(`📊 Total de Evidências: ${DataHelper.getTotalEvidenceCount()}`);
console.log(`📈 Progresso: ${DataHelper.getProgress()}%`);
console.log('🔒 Sistema de progressão ativo!');