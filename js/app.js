/* ============================================
   EVIDENCE - Application Core
   Versão: 1.0.0
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
        resetBtn: document.getElementById('resetBtn')
    };

    // ============================================
    // RENDER FUNCTIONS
    // ============================================
    
    /**
     * Render the welcome screen
     */
    function renderWelcome() {
        DOM.welcomeScreen.style.display = 'flex';
        DOM.folderContent.innerHTML = '';
        DOM.folderContent.style.display = 'none';
        updateActiveSidebarItem('welcome');
    }

    /**
     * Render a folder's contents
     */
    function renderFolder(folder) {
        DOM.welcomeScreen.style.display = 'none';
        DOM.folderContent.style.display = 'block';

        const files = DataHelper.getFiles(folder, AppState.currentCase);
        
        // Folder metadata
        const folderMeta = {
            photos: { icon: '🖼️', label: 'Fotos', empty: 'Nenhuma foto encontrada.' },
            messages: { icon: '💬', label: 'Mensagens', empty: 'Nenhuma mensagem encontrada.' },
            documents: { icon: '📄', label: 'Documentos', empty: 'Nenhum documento encontrado.' },
            audio: { icon: '🎤', label: 'Áudios', empty: 'Nenhum áudio encontrado.' },
            video: { icon: '🎥', label: 'Vídeos', empty: 'Nenhum vídeo encontrado.' },
            locations: { icon: '📍', label: 'Localizações', empty: 'Nenhuma localização registrada.' },
            evidence: { icon: '⭐', label: 'Evidências', empty: 'Nenhuma evidência encontrada.' },
            trash: { icon: '🗑️', label: 'Lixeira', empty: 'A lixeira está vazia.' }
        };

        const meta = folderMeta[folder] || { icon: '📂', label: folder, empty: 'Pasta vazia.' };

        // Special cases
        if (folder === 'welcome') {
            renderWelcome();
            return;
        }

        if (folder === 'locations') {
            DOM.folderContent.innerHTML = renderLocations();
            updateActiveSidebarItem(folder);
            return;
        }

        if (folder === 'evidence') {
            DOM.folderContent.innerHTML = renderEvidenceList();
            updateActiveSidebarItem(folder);
            return;
        }

        if (folder === 'trash') {
            DOM.folderContent.innerHTML = renderEmptyState('🗑️', 'Lixeira vazia', 'Nenhum arquivo foi descartado ainda.');
            updateActiveSidebarItem(folder);
            return;
        }

        // Check if folder has files
        if (!files || files.length === 0) {
            DOM.folderContent.innerHTML = renderEmptyState(meta.icon, `Pasta vazia`, meta.empty);
            updateActiveSidebarItem(folder);
            return;
        }

        // Build folder view
        let html = `
            <div class="folder-header">
                <span class="icon">${meta.icon}</span>
                <h2>${meta.label}</h2>
                <span class="count">${files.length} itens</span>
            </div>
            <div class="file-grid">
        `;

        files.forEach(file => {
            const metaInfo = file.size || file.duration || file.date || '';
            const desc = file.description || file.preview || '';
            const isFound = file.found !== undefined ? file.found : true;
            const foundClass = isFound ? '' : 'style="opacity:0.5;"';
            
            html += `
                <div class="file-card" data-id="${file.id}" data-folder="${folder}" ${foundClass}>
                    <span class="file-icon">${file.icon || '📄'}</span>
                    <div class="file-name">${file.name}</div>
                    <div class="file-meta">${metaInfo}</div>
                    ${desc ? `<div class="file-desc">${desc}</div>` : ''}
                    ${!isFound ? `<div style="font-size:10px;color:var(--text-muted);margin-top:4px;">🔒 Não encontrado</div>` : ''}
                </div>
            `;
        });

        html += '</div>';
        DOM.folderContent.innerHTML = html;

        // Attach click listeners to file cards
        document.querySelectorAll('.file-card').forEach(el => {
            el.addEventListener('click', function() {
                const id = this.dataset.id;
                const folder = this.dataset.folder;
                openFile(folder, id);
            });
        });

        updateActiveSidebarItem(folder);
    }

    /**
     * Render locations view
     */
    function renderLocations() {
        const locations = DataHelper.getLocations(AppState.currentCase);
        
        if (!locations || locations.length === 0) {
            return renderEmptyState('📍', 'Nenhuma localização', 'Nenhum local foi registrado ainda.');
        }

        const statusMap = {
            'investigated': { label: 'Investigado', color: 'var(--success)' },
            'pending': { label: 'Pendente', color: 'var(--warning)' },
            'locked': { label: 'Bloqueado', color: 'var(--danger)' }
        };

        let html = `
            <div class="folder-header">
                <span class="icon">📍</span>
                <h2>Localizações</h2>
                <span class="count">${locations.length} locais</span>
            </div>
            <div class="map-container">
        `;

        locations.forEach(loc => {
            const status = statusMap[loc.status] || statusMap.pending;
            html += `
                <div class="map-location status-${loc.status}">
                    <span class="status">${loc.status === 'investigated' ? '🟢' : loc.status === 'pending' ? '🟡' : '🔴'}</span>
                    <div class="info">
                        <div class="name">${loc.name}</div>
                        <div class="date">${loc.date} · ${loc.address}</div>
                        ${loc.description ? `<div style="font-size:12px;color:var(--text-muted);margin-top:4px;">${loc.description}</div>` : ''}
                        ${loc.evidence && loc.evidence.length > 0 ? `<div style="font-size:11px;color:var(--accent);margin-top:4px;">📎 ${loc.evidence.length} evidências</div>` : ''}
                    </div>
                    <span class="marker">📍</span>
                </div>
            `;
        });

        html += `
                <div class="map-legend">
                    <span>🟢 Investigado</span>
                    <span>🟡 Pendente</span>
                    <span>🔴 Bloqueado</span>
                </div>
            </div>
        `;

        return html;
    }

    /**
     * Render evidence list
     */
    function renderEvidenceList() {
        const evidence = DataHelper.getEvidence(AppState.currentCase);
        const found = DataHelper.getFoundEvidenceCount(AppState.currentCase);
        const total = DataHelper.getTotalEvidenceCount(AppState.currentCase);

        if (!evidence || evidence.length === 0) {
            return renderEmptyState('⭐', 'Nenhuma evidência', 'Nenhuma evidência foi registrada ainda.');
        }

        // Group by category
        const categories = {};
        evidence.forEach(ev => {
            const cat = ev.category || 'Geral';
            if (!categories[cat]) categories[cat] = [];
            categories[cat].push(ev);
        });

        let html = `
            <div class="folder-header">
                <span class="icon">⭐</span>
                <h2>Evidências</h2>
                <span class="count">${found}/${total} encontradas</span>
            </div>
            <div class="evidence-grid">
        `;

        Object.keys(categories).forEach(category => {
            const items = categories[category];
            html += `
                <div style="margin-bottom:var(--space-4);">
                    <div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);margin-bottom:var(--space-2);font-weight:600;">
                        ${category}
                    </div>
            `;

            items.forEach(ev => {
                const importanceColors = {
                    'critical': 'var(--danger)',
                    'high': 'var(--warning)',
                    'medium': 'var(--accent)',
                    'low': 'var(--text-muted)'
                };
                const color = importanceColors[ev.importance] || 'var(--text-muted)';
                
                html += `
                    <div class="evidence-item ${ev.found ? 'found' : ''}">
                        <span class="check">${ev.found ? '✅' : '⬜'}</span>
                        <span class="name ${ev.found ? 'found' : 'pending'}">${ev.name}</span>
                        <span style="font-size:11px;color:var(--text-muted);flex:1;">${ev.description}</span>
                        <span class="status" style="color:${color};">${ev.importance.toUpperCase()}</span>
                        <span style="font-size:11px;color:var(--text-muted);">${ev.found ? 'Encontrado' : 'Pendente'}</span>
                    </div>
                `;
            });

            html += `</div>`;
        });

        html += '</div>';
        return html;
    }

    /**
     * Render empty state
     */
    function renderEmptyState(icon, title, description) {
        return `
            <div class="empty-state">
                <div class="icon">${icon}</div>
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        `;
    }

    /**
     * Update active sidebar item
     */
    function updateActiveSidebarItem(folder) {
        document.querySelectorAll('.sidebar-item').forEach(el => {
            el.classList.remove('active');
            if (el.dataset.folder === folder) {
                el.classList.add('active');
            }
        });
    }

    // ============================================
    // FILE VIEWER
    // ============================================
    
    /**
     * Open a file in the viewer
     */
    function openFile(folder, id) {
        const file = DataHelper.getFile(folder, id, AppState.currentCase);
        if (!file) return;

        AppState.currentFile = file;

        // Update viewer title
        const ext = file.name ? file.name.split('.').pop().toUpperCase() : 'FILE';
        DOM.viewerTitle.innerHTML = `
            ${file.icon || '📄'} ${file.name}
            <span class="ext">· ${ext}</span>
        `;

        // Build viewer content
        let content = '';

        // Different content types
        if (folder === 'messages') {
            content = renderMessageViewer(file);
        } else if (folder === 'audio') {
            content = renderAudioViewer(file);
        } else if (folder === 'video') {
            content = renderVideoViewer(file);
        } else if (folder === 'documents') {
            content = renderDocumentViewer(file);
        } else {
            content = renderGenericViewer(file);
        }

        DOM.viewerBody.innerHTML = content;
        DOM.viewerOverlay.classList.add('open');
        AppState.isViewerOpen = true;

        // Mark evidence as found if applicable
        if (file.evidence && file.evidenceId) {
            const marked = DataHelper.markEvidenceFound(file.evidenceId, AppState.currentCase);
            if (marked) {
                updateProgress();
                // Refresh evidence list if we're on that folder
                if (AppState.currentFolder === 'evidence') {
                    renderFolder('evidence');
                }
            }
        }

        // Add to history
        AppState.history.push({ folder, id, timestamp: Date.now() });
    }

    /**
     * Render message viewer
     */
    function renderMessageViewer(file) {
        return `
            <div style="padding:8px 0;">
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
                    <span style="font-size:24px;">${file.sender ? '👤' : '💬'}</span>
                    <div>
                        <div style="font-weight:600;">${file.sender || 'Desconhecido'}</div>
                        <div style="font-size:12px;color:var(--text-muted);">${file.date} · ${file.time || ''}</div>
                    </div>
                </div>
                <div class="message-preview">
                    <div class="content" style="white-space:pre-wrap;font-size:15px;line-height:1.8;">
                        ${file.content || file.preview || 'Conteúdo não disponível.'}
                    </div>
                    ${file.tags ? `<div style="margin-top:12px;display:flex;gap:6px;flex-wrap:wrap;">
                        ${file.tags.map(tag => `<span style="font-size:11px;background:var(--color-card);padding:2px 10px;border-radius:var(--radius-full);color:var(--text-muted);">#${tag}</span>`).join('')}
                    </div>` : ''}
                </div>
                ${file.evidence ? `<div style="margin-top:12px;font-size:12px;color:var(--success);">⭐ Esta é uma evidência</div>` : ''}
            </div>
        `;
    }

    /**
     * Render audio viewer
     */
    function renderAudioViewer(file) {
        return `
            <div class="file-preview">
                <span class="big-icon">🎵</span>
                <div style="background:var(--color-card);padding:16px 20px;border-radius:var(--radius-md);margin:16px 0;">
                    <div style="display:flex;align-items:center;gap:16px;">
                        <span style="font-size:32px;">▶️</span>
                        <div style="flex:1;">
                            <div style="height:4px;background:var(--color-hover);border-radius:var(--radius-full);position:relative;">
                                <div style="width:30%;height:100%;background:var(--accent);border-radius:var(--radius-full);"></div>
                            </div>
                            <div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);margin-top:4px;">
                                <span>00:35</span>
                                <span>${file.duration || '03:12'}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <p>${file.description || 'Gravação de áudio.'}</p>
                ${file.transcript ? `
                    <div style="margin-top:16px;text-align:left;background:var(--color-card);padding:16px;border-radius:var(--radius-sm);">
                        <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:8px;">📝 Transcrição</div>
                        <div style="font-size:13px;color:var(--text-secondary);white-space:pre-wrap;line-height:1.6;">${file.transcript}</div>
                    </div>
                ` : ''}
                <div class="meta">
                    <span>📅 ${file.date}</span>
                    ${file.duration ? `<span>⏱️ ${file.duration}</span>` : ''}
                </div>
                ${file.evidence ? `<div style="margin-top:12px;font-size:12px;color:var(--success);">⭐ Esta é uma evidência</div>` : ''}
            </div>
        `;
    }

    /**
     * Render video viewer
     */
    function renderVideoViewer(file) {
        return `
            <div class="file-preview">
                <span class="big-icon">🎬</span>
                <div style="background:var(--color-card);padding:40px 20px;border-radius:var(--radius-md);margin:16px 0;text-align:center;border:2px dashed var(--color-border);">
                    <span style="font-size:48px;">▶️</span>
                    <div style="font-size:14px;color:var(--text-muted);margin-top:8px;">Preview do vídeo não disponível</div>
                    <div style="font-size:12px;color:var(--text-muted);">${file.duration || '00:47'}</div>
                </div>
                <p>${file.description || 'Vídeo de evidência.'}</p>
                ${file.transcript ? `
                    <div style="margin-top:16px;text-align:left;background:var(--color-card);padding:16px;border-radius:var(--radius-sm);">
                        <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:8px;">📝 Descrição</div>
                        <div style="font-size:13px;color:var(--text-secondary);white-space:pre-wrap;line-height:1.6;">${file.transcript}</div>
                    </div>
                ` : ''}
                <div class="meta">
                    <span>📅 ${file.date}</span>
                    ${file.duration ? `<span>⏱️ ${file.duration}</span>` : ''}
                </div>
                ${file.evidence ? `<div style="margin-top:12px;font-size:12px;color:var(--success);">⭐ Esta é uma evidência</div>` : ''}
            </div>
        `;
    }

    /**
     * Render document viewer
     */
    function renderDocumentViewer(file) {
        return `
            <div class="file-preview">
                <span class="big-icon">${file.icon || '📄'}</span>
                <div style="background:var(--color-card);padding:16px 20px;border-radius:var(--radius-md);margin:16px 0;text-align:left;">
                    <div style="font-size:12px;font-weight:600;color:var(--text-muted);margin-bottom:8px;">📄 Conteúdo</div>
                    <div style="font-size:14px;color:var(--text-secondary);white-space:pre-wrap;line-height:1.8;font-family:var(--font-mono);">
                        ${file.content || file.description || 'Conteúdo não disponível.'}
                    </div>
                </div>
                <p>${file.description || ''}</p>
                <div class="meta">
                    <span>📅 ${file.date}</span>
                    ${file.size ? `<span>📦 ${file.size}</span>` : ''}
                    ${file.pages ? `<span>📄 ${file.pages} páginas</span>` : ''}
                </div>
                ${file.tags ? `<div style="margin-top:12px;display:flex;gap:6px;flex-wrap:wrap;justify-content:center;">
                    ${file.tags.map(tag => `<span style="font-size:11px;background:var(--color-card);padding:2px 10px;border-radius:var(--radius-full);color:var(--text-muted);">#${tag}</span>`).join('')}
                </div>` : ''}
                ${file.evidence ? `<div style="margin-top:12px;font-size:12px;color:var(--success);">⭐ Esta é uma evidência</div>` : ''}
            </div>
        `;
    }

    /**
     * Render generic viewer
     */
    function renderGenericViewer(file) {
        return `
            <div class="file-preview">
                <span class="big-icon">${file.icon || '📄'}</span>
                <p>${file.description || 'Arquivo sem descrição disponível.'}</p>
                <div class="meta">
                    <span>📅 ${file.date || 'Data desconhecida'}</span>
                    ${file.size ? `<span>📦 ${file.size}</span>` : ''}
                </div>
                ${file.tags ? `<div style="margin-top:12px;display:flex;gap:6px;flex-wrap:wrap;justify-content:center;">
                    ${file.tags.map(tag => `<span style="font-size:11px;background:var(--color-card);padding:2px 10px;border-radius:var(--radius-full);color:var(--text-muted);">#${tag}</span>`).join('')}
                </div>` : ''}
                ${file.evidence ? `<div style="margin-top:12px;font-size:12px;color:var(--success);">⭐ Esta é uma evidência</div>` : ''}
            </div>
        `;
    }

    /**
     * Close the viewer
     */
    function closeViewer() {
        DOM.viewerOverlay.classList.remove('open');
        AppState.isViewerOpen = false;
        AppState.currentFile = null;
    }

    // ============================================
    // PROGRESS
    // ============================================
    
    /**
     * Update progress bar
     */
    function updateProgress() {
        const progress = DataHelper.getProgress(AppState.currentCase);
        AppState.progress = progress;
        DOM.progressFill.style.width = progress + '%';
        DOM.progressLabel.textContent = progress + '%';
    }

    // ============================================
    // NAVIGATION
    // ============================================
    
    /**
     * Navigate to a folder
     */
    function navigateTo(folder) {
        AppState.currentFolder = folder;
        
        if (folder === 'welcome') {
            renderWelcome();
        } else {
            renderFolder(folder);
        }
    }

    /**
     * Reset the case
     */
    function resetCase() {
        if (confirm('Iniciar um novo caso irá limpar o progresso atual. Continuar?')) {
            // Reset evidence
            const evidence = DataHelper.getEvidence(AppState.currentCase);
            evidence.forEach(ev => {
                ev.found = false;
            });
            
            // Mark some as found (initial state)
            const initialFound = ['ev_001', 'ev_002', 'ev_003', 'ev_004', 'ev_005', 'ev_006', 'ev_008', 'ev_009'];
            evidence.forEach(ev => {
                if (initialFound.includes(ev.id)) {
                    ev.found = true;
                }
            });
            
            updateProgress();
            navigateTo('welcome');
        }
    }

    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================
    
    document.addEventListener('keydown', function(e) {
        // ESC - Close viewer
        if (e.key === 'Escape' && AppState.isViewerOpen) {
            closeViewer();
        }
        
        // Ctrl+1-7 - Quick navigation
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
    
    /**
     * Sidebar navigation
     */
    DOM.sidebar.addEventListener('click', function(e) {
        const item = e.target.closest('.sidebar-item');
        if (!item) return;
        const folder = item.dataset.folder;
        if (folder) {
            navigateTo(folder);
        }
    });

    /**
     * Viewer close
     */
    DOM.viewerClose.addEventListener('click', closeViewer);
    DOM.viewerOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
            closeViewer();
        }
    });

    /**
     * Continue button
     */
    DOM.continueBtn.addEventListener('click', function() {
        if (AppState.currentFolder === 'welcome') {
            navigateTo('photos');
        } else {
            navigateTo('welcome');
        }
    });

    /**
     * New Case button
     */
    DOM.newCaseBtn.addEventListener('click', resetCase);

    /**
     * Reset button
     */
    DOM.resetBtn.addEventListener('click', resetCase);

    // ============================================
    // INIT
    // ============================================
    
    /**
     * Initialize the application
     */
    function init() {
        console.log('🔍 Evidence - Application Starting...');
        console.log(`📁 Case: ${AppState.currentCase}`);
        console.log(`📊 Progress: ${DataHelper.getProgress(AppState.currentCase)}%`);
        
        // Set initial progress
        updateProgress();
        
        // Show welcome screen
        renderWelcome();
        
        // Mark initial evidence as found
        const evidence = DataHelper.getEvidence(AppState.currentCase);
        const initialFound = ['ev_001', 'ev_002', 'ev_003', 'ev_004', 'ev_005', 'ev_006', 'ev_008', 'ev_009'];
        evidence.forEach(ev => {
            if (initialFound.includes(ev.id)) {
                ev.found = true;
            }
        });
        
        updateProgress();
        
        console.log('✅ Evidence initialized successfully!');
        console.log('📖 Use Ctrl+1-7 for quick navigation');
        console.log('ℹ️ Press ESC to close the viewer');
    }

    // Start the app
    init();

    // ============================================
    // EXPOSE PUBLIC API
    // ============================================
    
    window.Evidence = {
        state: AppState,
        navigate: navigateTo,
        openFile: openFile,
        closeViewer: closeViewer,
        reset: resetCase,
        reload: function() {
            updateProgress();
            if (AppState.currentFolder === 'welcome') {
                renderWelcome();
            } else {
                renderFolder(AppState.currentFolder);
            }
        }
    };

})();