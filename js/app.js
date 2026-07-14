/* ============================================
   EVIDENCE - Application Core
   Versão: 2.0.0 - Com Sistema de Progressão
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // APP STATE
    // ============================================
    
    const AppState = {
        currentFolder: 'welcome',
        currentFile: null,
        currentCase: 'case01',
        progress: 0,
        isViewerOpen: false,
        searchQuery: '',
        history: [],
        settings: {
            theme: 'dark',
            animations: true,
            soundEffects: false
        }
    };

    // ============================================
    // DOM REFS
    // ============================================
    
    const DOM = {
        sidebar: document.getElementById('sidebar'),
        content: document.getElementById('content'),
        welcomeScreen: document.getElementById('welcomeScreen'),
        folderContent: document.getElementById('folderContent'),
        progressFill: document.getElementById('progressFill'),
        progressLabel: document.getElementById('progressLabel'),
        viewerOverlay: document.getElementById('viewerOverlay'),
        viewerTitle: document.getElementById('viewerTitle'),
        viewerBody: document.getElementById('viewerBody'),
        viewerClose: document.getElementById('viewerClose'),
        continueBtn: document.getElementById('continueBtn'),
        newCaseBtn: document.getElementById('newCaseBtn'),
        resetBtn: document.getElementById('resetBtn'),
        evidenceBadge: document.getElementById('evidenceBadge')
    };

    // ============================================
    // NOTIFICATION SYSTEM
    // ============================================

    function showNotification(message, type = 'info') {
        const old = document.querySelector('.custom-notification');
        if (old) old.remove();
        
        const notif = document.createElement('div');
        notif.className = `custom-notification ${type}`;
        notif.textContent = message;
        document.body.appendChild(notif);
        
        setTimeout(() => {
            notif.style.opacity = '0';
            notif.style.transition = 'opacity 0.3s ease';
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }

    // ============================================
    // PROGRESS SYSTEM
    // ============================================

    function getEvidenceStatus(evidenceId) {
        if (!evidenceId) return true;
        const ev = window.STORY_DATA.evidence.find(e => e.id === evidenceId);
        return ev ? ev.found : true;
    }

    function canFindEvidence(evidenceId) {
        const ev = window.STORY_DATA.evidence.find(e => e.id === evidenceId);
        if (ev && ev.found) return true;
        
        const order = [
            'ev_001', 'ev_002', 'ev_003', 'ev_004', 'ev_005',
            'ev_006', 'ev_007', 'ev_008', 'ev_009', 'ev_010', 'ev_011'
        ];
        
        const index = order.indexOf(evidenceId);
        if (index === -1) return true;
        
        for (let i = 0; i < index; i++) {
            const prevId = order[i];
            const prevEv = window.STORY_DATA.evidence.find(e => e.id === prevId);
            if (!prevEv || !prevEv.found) {
                return false;
            }
        }
        return true;
    }

    function updateProgress() {
        const evidence = window.STORY_DATA.evidence || [];
        const found = evidence.filter(e => e.found).length;
        const total = evidence.length;
        const progress = total > 0 ? Math.round((found / total) * 100) : 0;
        
        AppState.progress = progress;
        
        if (DOM.progressFill) {
            DOM.progressFill.style.width = progress + '%';
        }
        if (DOM.progressLabel) {
            DOM.progressLabel.textContent = progress + '%';
        }
        if (DOM.evidenceBadge) {
            DOM.evidenceBadge.textContent = `${found}/${total}`;
        }
        
        // Verificar se completou
        if (found === total && total > 0) {
            setTimeout(() => {
                showNotification('🎉 PARABÉNS! Você desvendou todo o mistério!', 'success');
            }, 500);
        }
    }

    function resetProgress() {
        if (!confirm('🔄 Iniciar um novo caso irá apagar todo o seu progresso atual. Deseja continuar?')) {
            return;
        }
        
        if (window.STORY_DATA && window.STORY_DATA.evidence) {
            window.STORY_DATA.evidence.forEach(ev => {
                ev.found = false;
            });
        }
        
        updateProgress();
        navigateTo('welcome');
        showNotification('📂 Novo caso iniciado! Boa sorte!', 'info');
    }

    // ============================================
    // RENDER FUNCTIONS
    // ============================================

    function renderWelcome() {
        const welcome = document.getElementById('welcomeScreen');
        const folderContent = document.getElementById('folderContent');
        if (welcome) welcome.style.display = 'flex';
        if (folderContent) folderContent.innerHTML = '';
        updateActiveSidebarItem('welcome');
    }

    function renderFolder(folder) {
        const welcome = document.getElementById('welcomeScreen');
        const folderContent = document.getElementById('folderContent');
        if (welcome) welcome.style.display = 'none';
        if (!folderContent) return;

        let items = [];
        let title = '';
        let icon = '';

        // Usar os dados do STORY_DATA
        const storyData = window.STORY_DATA || {};

        switch (folder) {
            case 'photos': 
                items = storyData.photos || []; 
                title = 'Fotos'; 
                icon = '🖼️'; 
                break;
            case 'messages': 
                items = storyData.messages || []; 
                title = 'Mensagens'; 
                icon = '💬'; 
                break;
            case 'documents': 
                items = storyData.documents || []; 
                title = 'Documentos'; 
                icon = '📄'; 
                break;
            case 'audio': 
                items = storyData.audio || []; 
                title = 'Áudios'; 
                icon = '🎤'; 
                break;
            case 'video': 
                items = storyData.video || []; 
                title = 'Vídeos'; 
                icon = '🎥'; 
                break;
            case 'map':
                folderContent.innerHTML = renderMap();
                updateActiveSidebarItem(folder);
                return;
            case 'evidence':
                folderContent.innerHTML = renderEvidence();
                updateActiveSidebarItem(folder);
                return;
            case 'trash':
                folderContent.innerHTML = renderEmpty('🗑️', 'Lixeira vazia', 'Nenhum arquivo foi descartado ainda.');
                updateActiveSidebarItem(folder);
                return;
            default:
                folderContent.innerHTML = renderEmpty('📂', 'Pasta vazia', 'Nenhum arquivo encontrado aqui.');
                updateActiveSidebarItem(folder);
                return;
        }

        if (!items || items.length === 0) {
            folderContent.innerHTML = renderEmpty('📂', 'Pasta vazia', 'Nenhum arquivo encontrado aqui.');
            updateActiveSidebarItem(folder);
            return;
        }

        let html = `
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
                <span style="font-size:28px;">${icon}</span>
                <h2 style="font-weight:700;font-size:22px;">${title}</h2>
                <span style="color:var(--text-muted);font-size:13px;">${items.length} itens</span>
            </div>
            <div class="file-grid">
        `;

        items.forEach(item => {
            const meta = item.size || item.duration || item.date || '';
            const desc = item.desc || item.preview || '';
            const isEvidence = item.evidence || false;
            const isFound = isEvidence ? getEvidenceStatus(item.evidenceId) : true;
            const isLocked = isEvidence && !canFindEvidence(item.evidenceId);
            
            let lockHtml = '';
            let evidenceHtml = '';
            
            if (isLocked) {
                lockHtml = '<span class="lock-icon">🔒</span>';
            }
            if (isEvidence && isFound) {
                evidenceHtml = '<span class="evidence-badge">⭐</span>';
            }
            
            const cardClass = isLocked ? 'file-card locked' : 'file-card';
            
            html += `
                <div class="${cardClass}" data-id="${item.id}" data-folder="${folder}" ${isLocked ? 'data-locked="true"' : ''}>
                    ${lockHtml}
                    ${evidenceHtml}
                    <span class="file-icon">${item.icon || '📄'}</span>
                    <div class="file-name">${item.name}</div>
                    <div class="file-meta">${meta}</div>
                    ${desc ? `<div style="font-size:11px;color:var(--text-muted);margin-top:6px;line-height:1.4;">${desc}</div>` : ''}
                    ${isLocked ? `<div style="font-size:10px;color:var(--warning);margin-top:4px;">🔒 Encontre mais pistas</div>` : ''}
                </div>
            `;
        });

        html += '</div>';
        folderContent.innerHTML = html;

        document.querySelectorAll('.file-card:not(.locked)').forEach(el => {
            el.addEventListener('click', function() {
                const id = this.dataset.id;
                const folder = this.dataset.folder;
                openFile(folder, id);
            });
        });

        updateActiveSidebarItem(folder);
    }

    function renderMap() {
        const storyData = window.STORY_DATA || {};
        const locations = storyData.locations || [];
        
        if (!locations || locations.length === 0) {
            return renderEmpty('📍', 'Nenhuma localização', 'Nenhum local foi registrado ainda.');
        }

        let html = `
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
                <span style="font-size:28px;">📍</span>
                <h2 style="font-weight:700;font-size:22px;">Mapa</h2>
                <span style="color:var(--text-muted);font-size:13px;">${locations.length} locais</span>
            </div>
            <div style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:var(--radius);padding:32px 24px;min-height:300px;display:flex;flex-direction:column;gap:12px;">
        `;

        locations.forEach(loc => {
            const statusMap = {
                'investigated': { label: 'Investigado', color: 'var(--success)' },
                'pending': { label: 'Pendente', color: 'var(--warning)' },
                'locked': { label: 'Bloqueado', color: 'var(--danger)' }
            };
            const status = statusMap[loc.status] || statusMap.pending;
            const statusIcon = loc.status === 'investigated' ? '🟢' : loc.status === 'pending' ? '🟡' : '🔴';
            
            html += `
                <div style="display:flex;align-items:center;gap:16px;padding:12px 16px;background:var(--bg-card);border-radius:var(--radius-sm);border-left:3px solid ${status.color};">
                    <span style="font-size:20px;">${statusIcon}</span>
                    <div>
                        <div style="font-weight:500;">${loc.name}</div>
                        <div style="font-size:12px;color:var(--text-muted);">${loc.date}</div>
                        ${loc.description ? `<div style="font-size:11px;color:var(--text-muted);margin-top:4px;">${loc.description}</div>` : ''}
                        ${loc.evidence && loc.evidence.length > 0 ? `<div style="font-size:11px;color:var(--accent);margin-top:4px;">📎 ${loc.evidence.length} evidências</div>` : ''}
                    </div>
                    <span style="margin-left:auto;font-size:12px;color:var(--text-muted);">📍</span>
                </div>
            `;
        });

        html += `
                <div style="margin-top:8px;padding:12px 16px;background:var(--bg-card);border-radius:var(--radius-sm);font-size:13px;color:var(--text-muted);text-align:center;">
                    🟢 Investigado &nbsp;·&nbsp; 🟡 Pendente &nbsp;·&nbsp; 🔴 Bloqueado
                </div>
            </div>
        `;
        return html;
    }

    function renderEvidence() {
        const storyData = window.STORY_DATA || {};
        const items = storyData.evidence || [];
        const found = items.filter(e => e.found).length;
        const total = items.length;

        if (!items || items.length === 0) {
            return renderEmpty('⭐', 'Nenhuma evidência', 'Nenhuma evidência foi registrada ainda.');
        }

        let html = `
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
                <span style="font-size:28px;">⭐</span>
                <h2 style="font-weight:700;font-size:22px;">Evidências</h2>
                <span style="color:var(--text-muted);font-size:13px;">${found}/${total} encontradas</span>
            </div>
            <div style="display:grid;gap:8px;">
        `;

        items.forEach(ev => {
            const isLocked = !ev.found && !canFindEvidence(ev.id);
            const statusText = ev.found ? '✅ Encontrado' : (isLocked ? '🔒 Bloqueado' : '🔍 Disponível');
            const statusColor = ev.found ? 'var(--success)' : (isLocked ? 'var(--text-muted)' : 'var(--warning)');
            
            html += `
                <div style="display:flex;align-items:center;gap:14px;padding:12px 16px;background:var(--bg-secondary);border:1px solid ${ev.found ? 'var(--success)' : 'var(--border-color)'};border-radius:var(--radius-sm);">
                    <span style="font-size:20px;">${ev.found ? '✅' : '⬜'}</span>
                    <span style="font-weight:500;${ev.found ? '' : 'color:var(--text-muted);'}">${ev.name}</span>
                    <span style="margin-left:auto;font-size:12px;color:${statusColor};font-weight:500;">${statusText}</span>
                </div>
            `;
        });

        html += '</div>';
        return html;
    }

    function renderEmpty(icon, title, desc) {
        return `
            <div class="empty-state">
                <div class="icon">${icon}</div>
                <h3>${title}</h3>
                <p>${desc}</p>
            </div>
        `;
    }

    function updateActiveSidebarItem(folder) {
        document.querySelectorAll('.sidebar-item').forEach(el => {
            el.classList.remove('active');
            if (el.dataset.folder === folder) {
                el.classList.add('active');
            }
        });
    }

    // ============================================
    // OPEN FILE
    // ============================================

    function openFile(folder, id) {
        const storyData = window.STORY_DATA || {};
        let items = [];
        let file = null;

        switch (folder) {
            case 'photos': items = storyData.photos || []; break;
            case 'messages': items = storyData.messages || []; break;
            case 'documents': items = storyData.documents || []; break;
            case 'audio': items = storyData.audio || []; break;
            case 'video': items = storyData.video || []; break;
            default: return;
        }

        file = items.find(item => item.id === id);
        if (!file) return;

        // Verificar se é uma evidência bloqueada
        if (file.evidence && file.evidenceId) {
            const ev = storyData.evidence.find(e => e.id === file.evidenceId);
            if (ev && !ev.found && !canFindEvidence(file.evidenceId)) {
                showNotification('🔒 Você precisa encontrar mais pistas primeiro!', 'warning');
                return;
            }
        }

        const ext = file.name ? file.name.split('.').pop().toUpperCase() : 'FILE';
        DOM.viewerTitle.innerHTML = `
            ${file.icon || '📄'} ${file.name}
            <span class="ext">· ${ext}</span>
        `;

        let bodyHtml = '';

        if (folder === 'photos' && file.image) {
            bodyHtml = `
                <div class="file-preview">
                    <img src="${file.image}" alt="${file.name}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <div style="display:none;color:var(--text-muted);padding:20px;">⚠️ Imagem não encontrada</div>
                    <p>${file.desc || file.description || 'Sem descrição disponível.'}</p>
                    <div class="meta">
                        ${file.date ? `📅 ${file.date}` : ''}
                        ${file.size ? ` · 📦 ${file.size}` : ''}
                    </div>
                </div>
            `;
        } else {
            bodyHtml = `
                <div class="file-preview">
                    <span class="big-icon">${file.icon || '📄'}</span>
                    <p>${file.desc || file.description || file.preview || 'Sem descrição disponível.'}</p>
                    <div class="meta">
                        ${file.date ? `📅 ${file.date}` : ''}
                        ${file.size ? ` · 📦 ${file.size}` : ''}
                        ${file.duration ? ` · ⏱️ ${file.duration}` : ''}
                    </div>
                </div>
            `;

            if (folder === 'messages' && file.content) {
                bodyHtml = `
                    <div style="padding:8px 0;width:100%;">
                        <div style="background:var(--bg-card);padding:16px 20px;border-radius:var(--radius-sm);border-left:3px solid var(--accent);">
                            <div style="font-size:13px;color:var(--text-muted);margin-bottom:4px;">${file.sender || file.name}</div>
                            <div style="font-size:16px;line-height:1.8;white-space:pre-wrap;">${file.content}</div>
                            <div style="font-size:12px;color:var(--text-muted);margin-top:8px;">${file.date}</div>
                        </div>
                    </div>
                `;
            }
        }

        // Adicionar badge de evidência se for uma
        if (file.evidence && file.evidenceId) {
            const ev = storyData.evidence.find(e => e.id === file.evidenceId);
            if (ev && ev.found) {
                bodyHtml = bodyHtml.replace('</div>', '<div class="evidence-found">⭐ EVIDÊNCIA ENCONTRADA!</div></div>');
            }
        }

        DOM.viewerBody.innerHTML = bodyHtml;
        DOM.viewerOverlay.classList.add('open');
        AppState.isViewerOpen = true;

        // Marcar evidência como encontrada
        if (file.evidence && file.evidenceId) {
            const ev = storyData.evidence.find(e => e.id === file.evidenceId);
            if (ev && !ev.found) {
                ev.found = true;
                updateProgress();
                showNotification(`✅ Nova evidência encontrada: ${ev.name}!`, 'success');
                
                // Verificar se completou
                const total = storyData.evidence.length;
                const foundCount = storyData.evidence.filter(e => e.found).length;
                if (foundCount === total) {
                    setTimeout(() => {
                        showNotification('🎉 PARABÉNS! Você desvendou todo o mistério!', 'success');
                    }, 500);
                }
            }
        }
    }

    function closeViewer() {
        DOM.viewerOverlay.classList.remove('open');
        AppState.isViewerOpen = false;
        AppState.currentFile = null;
    }

    // ============================================
    // NAVIGATION
    // ============================================

    function navigateTo(folder) {
        AppState.currentFolder = folder;

        document.querySelectorAll('.sidebar-item').forEach(el => {
            el.classList.remove('active');
            if (el.dataset.folder === folder) {
                el.classList.add('active');
            }
        });

        if (folder === 'welcome') {
            renderWelcome();
        } else {
            renderFolder(folder);
        }
    }

    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && AppState.isViewerOpen) {
            closeViewer();
        }
        
        if (e.ctrlKey && e.key >= '1' && e.key <= '7') {
            e.preventDefault();
            const folders = ['welcome', 'photos', 'messages', 'documents', 'audio', 'video', 'evidence'];
            const index = parseInt(e.key) - 1;
            if (index < folders.length) {
                navigateTo(folders[index]);
            }
        }
    });

    // ============================================
    // EVENT LISTENERS
    // ============================================
    
    DOM.sidebar.addEventListener('click', function(e) {
        const item = e.target.closest('.sidebar-item');
        if (!item) return;
        const folder = item.dataset.folder;
        if (folder) {
            navigateTo(folder);
        }
    });

    DOM.viewerClose.addEventListener('click', closeViewer);
    DOM.viewerOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
            closeViewer();
        }
    });

    DOM.continueBtn.addEventListener('click', function() {
        if (AppState.currentFolder === 'welcome') {
            navigateTo('photos');
        } else {
            navigateTo('welcome');
        }
    });

    DOM.newCaseBtn.addEventListener('click', resetProgress);
    DOM.resetBtn.addEventListener('click', resetProgress);

    // ============================================
    // LOAD STORY DATA
    // ============================================

    function loadStoryData() {
        // Verificar se o STORY_DATA existe globalmente
        if (typeof window.STORY_DATA !== 'undefined') {
            return;
        }

        // Se não existir, tentar carregar do DataHelper
        if (typeof DataHelper !== 'undefined') {
            const caseData = DataHelper.getCase('case01');
            if (caseData && caseData.files) {
                window.STORY_DATA = {
                    photos: caseData.files.photos || [],
                    messages: caseData.files.messages || [],
                    documents: caseData.files.documents || [],
                    audio: caseData.files.audio || [],
                    video: caseData.files.video || [],
                    locations: caseData.files.locations || [],
                    evidence: caseData.files.evidence || [],
                    timeline: caseData.files.timeline || [],
                    characters: caseData.files.characters || []
                };
            }
        }

        // Se ainda não tiver dados, usar fallback
        if (typeof window.STORY_DATA === 'undefined') {
            console.warn('⚠️ STORY_DATA não encontrado, usando dados de fallback');
            window.STORY_DATA = {
                photos: [],
                messages: [],
                documents: [],
                audio: [],
                video: [],
                locations: [],
                evidence: [],
                timeline: [],
                characters: []
            };
        }
    }

    // ============================================
    // INIT
    // ============================================
    
    function init() {
        console.log('🔍 Evidence - Application Starting...');
        
        // Carregar dados da história
        loadStoryData();
        
        // Atualizar progresso
        updateProgress();
        
        // Mostrar tela inicial
        renderWelcome();
        
        console.log('✅ Evidence initialized successfully!');
        console.log('📖 Use Ctrl+1-7 para navegação rápida');
        console.log('ℹ️ Pressione ESC para fechar o visualizador');
    }

    // Iniciar o app
    init();

    // ============================================
    // EXPOSE PUBLIC API
    // ============================================
    
    window.Evidence = {
        state: AppState,
        navigate: navigateTo,
        openFile: openFile,
        closeViewer: closeViewer,
        reset: resetProgress,
        reload: function() {
            loadStoryData();
            updateProgress();
            if (AppState.currentFolder === 'welcome') {
                renderWelcome();
            } else {
                renderFolder(AppState.currentFolder);
            }
        }
    };

})();