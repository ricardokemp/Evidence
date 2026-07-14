/* ============================================
   EVIDENCE - UI Components
   Versão: 2.0.0 - Com Sistema de Progressão
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // COMPONENT SYSTEM
    // ============================================

    const Components = {
        /**
         * Criar um botão
         */
        Button: function({ 
            text, 
            type = 'button', 
            variant = 'primary', 
            size = 'medium',
            icon = null,
            onClick = null,
            className = '',
            disabled = false,
            loading = false
        } = {}) {
            const button = document.createElement('button');
            button.type = type;
            button.className = `
                btn btn-${variant} btn-${size}
                ${loading ? 'btn-loading' : ''}
                ${className}
            `.trim();
            button.disabled = disabled || loading;

            if (loading) {
                button.innerHTML = `
                    <span class="btn-loader"></span>
                    <span class="btn-text">${text}</span>
                `;
            } else if (icon) {
                button.innerHTML = `
                    <span class="btn-icon">${icon}</span>
                    <span class="btn-text">${text}</span>
                `;
            } else {
                button.textContent = text;
            }

            if (onClick) {
                button.addEventListener('click', onClick);
            }

            return button;
        },

        /**
         * Criar um card
         */
        Card: function({ 
            title, 
            content, 
            icon = null,
            footer = null,
            className = '',
            onClick = null
        } = {}) {
            const card = document.createElement('div');
            card.className = `card ${className}`.trim();

            if (onClick) {
                card.style.cursor = 'pointer';
                card.addEventListener('click', onClick);
            }

            let html = '';

            if (icon || title) {
                html += `
                    <div class="card-header">
                        ${icon ? `<span class="card-icon">${icon}</span>` : ''}
                        ${title ? `<h3 class="card-title">${title}</h3>` : ''}
                    </div>
                `;
            }

            html += `
                <div class="card-body">
                    ${content || ''}
                </div>
            `;

            if (footer) {
                html += `
                    <div class="card-footer">
                        ${footer}
                    </div>
                `;
            }

            card.innerHTML = html;
            return card;
        },

        /**
         * Criar um modal
         */
        Modal: function({ 
            title, 
            content, 
            onClose = null,
            onConfirm = null,
            confirmText = 'Confirmar',
            cancelText = 'Cancelar',
            showConfirm = true,
            showCancel = true,
            size = 'medium'
        } = {}) {
            const overlay = document.createElement('div');
            overlay.className = 'modal-overlay';
            
            const modal = document.createElement('div');
            modal.className = `modal modal-${size}`;
            
            let html = `
                <div class="modal-header">
                    <span class="modal-title">${title || 'Modal'}</span>
                    <button class="modal-close" data-close>&times;</button>
                </div>
                <div class="modal-body">
                    ${content || ''}
                </div>
            `;

            if (showConfirm || showCancel) {
                html += `
                    <div class="modal-footer">
                        ${showCancel ? `<button class="btn btn-secondary" data-cancel>${cancelText}</button>` : ''}
                        ${showConfirm ? `<button class="btn btn-primary" data-confirm>${confirmText}</button>` : ''}
                    </div>
                `;
            }

            modal.innerHTML = html;
            overlay.appendChild(modal);
            document.body.appendChild(overlay);

            const closeModal = () => {
                if (onClose) onClose();
                overlay.remove();
            };

            modal.querySelector('[data-close]')?.addEventListener('click', closeModal);
            modal.querySelector('[data-cancel]')?.addEventListener('click', closeModal);
            
            if (onConfirm) {
                modal.querySelector('[data-confirm]')?.addEventListener('click', () => {
                    onConfirm();
                    closeModal();
                });
            }

            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeModal();
            });

            const escHandler = (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', escHandler);
                }
            };
            document.addEventListener('keydown', escHandler);

            return {
                element: overlay,
                close: closeModal,
                modal: modal
            };
        },

        /**
         * Criar uma notificação toast
         */
        Toast: function({ 
            message, 
            type = 'info', 
            duration = 3000,
            icon = null,
            onClose = null
        } = {}) {
            const toast = document.createElement('div');
            toast.className = `toast toast-${type}`;
            
            const icons = {
                success: '✅',
                error: '❌',
                warning: '⚠️',
                info: 'ℹ️'
            };

            toast.innerHTML = `
                <div class="toast-content">
                    ${icon || icons[type] || 'ℹ️'}
                    <span class="toast-message">${message}</span>
                </div>
                <button class="toast-close" data-close>&times;</button>
            `;

            let container = document.getElementById('toast-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'toast-container';
                container.className = 'toast-container';
                document.body.appendChild(container);
            }

            container.appendChild(toast);

            if (duration > 0) {
                setTimeout(() => {
                    toast.classList.add('toast-exit');
                    setTimeout(() => {
                        toast.remove();
                        if (onClose) onClose();
                    }, 300);
                }, duration);
            }

            toast.querySelector('[data-close]')?.addEventListener('click', () => {
                toast.classList.add('toast-exit');
                setTimeout(() => {
                    toast.remove();
                    if (onClose) onClose();
                }, 300);
            });

            return toast;
        },

        /**
         * Criar uma barra de progresso
         */
        ProgressBar: function({ 
            value = 0, 
            max = 100,
            label = '',
            showLabel = true,
            className = ''
        } = {}) {
            const container = document.createElement('div');
            container.className = `progress-component ${className}`.trim();

            const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

            let html = `
                <div class="progress-track">
                    <div class="progress-fill" style="width: ${percentage}%;"></div>
                </div>
            `;

            if (showLabel && label) {
                html = `
                    <div class="progress-header">
                        <span class="progress-label">${label}</span>
                        <span class="progress-value">${Math.round(percentage)}%</span>
                    </div>
                    ${html}
                `;
            }

            container.innerHTML = html;
            return container;
        },

        /**
         * Criar uma tag/badge
         */
        Tag: function({ 
            text, 
            color = 'default',
            size = 'small',
            icon = null,
            clickable = false,
            onClick = null
        } = {}) {
            const tag = document.createElement('span');
            tag.className = `tag tag-${color} tag-${size}`;
            
            if (clickable) {
                tag.className += ' tag-clickable';
                tag.style.cursor = 'pointer';
                if (onClick) {
                    tag.addEventListener('click', onClick);
                }
            }

            tag.innerHTML = `
                ${icon ? `<span class="tag-icon">${icon}</span>` : ''}
                <span class="tag-text">${text}</span>
            `;

            return tag;
        },

        /**
         * Criar um campo de input
         */
        Input: function({ 
            type = 'text',
            placeholder = '',
            value = '',
            label = '',
            required = false,
            disabled = false,
            className = '',
            onInput = null,
            onEnter = null
        } = {}) {
            const container = document.createElement('div');
            container.className = `input-group ${className}`.trim();

            let html = '';

            if (label) {
                html += `
                    <label class="input-label">
                        ${label}
                        ${required ? '<span class="input-required">*</span>' : ''}
                    </label>
                `;
            }

            html += `
                <input 
                    type="${type}"
                    class="input-field"
                    placeholder="${placeholder}"
                    value="${value}"
                    ${disabled ? 'disabled' : ''}
                    ${required ? 'required' : ''}
                />
            `;

            container.innerHTML = html;

            const input = container.querySelector('input');
            
            if (onInput) {
                input.addEventListener('input', onInput);
            }

            if (onEnter) {
                input.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter') {
                        onEnter(input.value);
                    }
                });
            }

            return {
                element: container,
                input: input,
                getValue: () => input.value,
                setValue: (val) => { input.value = val; },
                focus: () => input.focus()
            };
        },

        /**
         * Criar um item de arquivo
         */
        FileItem: function({ 
            file, 
            onClick = null,
            selected = false,
            locked = false,
            evidence = false
        } = {}) {
            const item = document.createElement('div');
            item.className = `file-item ${selected ? 'selected' : ''} ${locked ? 'locked' : ''}`;
            
            const icon = file.icon || '📄';
            const name = file.name || 'Arquivo';
            const meta = file.size || file.date || '';

            item.innerHTML = `
                <span class="file-item-icon">${icon}</span>
                <div class="file-item-info">
                    <div class="file-item-name">${name}</div>
                    ${meta ? `<div class="file-item-meta">${meta}</div>` : ''}
                </div>
                ${evidence ? '<span class="file-item-evidence">⭐</span>' : ''}
                ${locked ? '<span class="file-item-lock">🔒</span>' : ''}
            `;

            if (onClick && !locked) {
                item.style.cursor = 'pointer';
                item.addEventListener('click', () => onClick(file));
            }

            return item;
        },

        /**
         * Criar uma barra de busca
         */
        SearchBar: function({ 
            placeholder = 'Buscar...',
            onSearch = null,
            onSelect = null,
            className = ''
        } = {}) {
            const container = document.createElement('div');
            container.className = `search-container ${className}`.trim();

            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'search-input';
            input.placeholder = placeholder;

            const resultsContainer = document.createElement('div');
            resultsContainer.className = 'search-results';
            resultsContainer.style.display = 'none';

            container.appendChild(input);
            container.appendChild(resultsContainer);

            let timeoutId = null;

            input.addEventListener('input', () => {
                clearTimeout(timeoutId);
                const query = input.value.trim();

                if (query.length < 2) {
                    resultsContainer.style.display = 'none';
                    return;
                }

                timeoutId = setTimeout(() => {
                    if (onSearch) {
                        const searchResults = onSearch(query);
                        renderResults(searchResults);
                    }
                }, 300);
            });

            function renderResults(items) {
                if (!items || items.length === 0) {
                    resultsContainer.innerHTML = `
                        <div class="search-empty">Nenhum resultado encontrado</div>
                    `;
                    resultsContainer.style.display = 'block';
                    return;
                }

                resultsContainer.innerHTML = items.map(item => `
                    <div class="search-result-item" data-id="${item.id}">
                        <span class="result-icon">${item.icon || '📄'}</span>
                        <div class="result-info">
                            <div class="result-name">${item.name}</div>
                            <div class="result-desc">${item.desc || item.description || ''}</div>
                        </div>
                        <span class="result-folder">${item.folder || ''}</span>
                    </div>
                `).join('');

                resultsContainer.style.display = 'block';

                resultsContainer.querySelectorAll('.search-result-item').forEach(el => {
                    el.addEventListener('click', () => {
                        if (onSelect) {
                            const id = el.dataset.id;
                            const item = items.find(i => i.id === id);
                            if (item) {
                                onSelect(item);
                                input.value = '';
                                resultsContainer.style.display = 'none';
                            }
                        }
                    });
                });
            }

            document.addEventListener('click', (e) => {
                if (!container.contains(e.target)) {
                    resultsContainer.style.display = 'none';
                }
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    resultsContainer.style.display = 'none';
                    input.blur();
                }
            });

            return {
                element: container,
                input: input,
                results: resultsContainer,
                clear: () => {
                    input.value = '';
                    resultsContainer.style.display = 'none';
                },
                focus: () => input.focus()
            };
        },

        /**
         * Criar uma timeline
         */
        Timeline: function({ 
            events = [],
            className = ''
        } = {}) {
            const container = document.createElement('div');
            container.className = `timeline ${className}`.trim();

            if (!events || events.length === 0) {
                container.innerHTML = `
                    <div class="timeline-empty">Nenhum evento registrado</div>
                `;
                return container;
            }

            const sorted = [...events].sort((a, b) => {
                return new Date(a.date) - new Date(b.date);
            });

            const html = sorted.map((event, index) => `
                <div class="timeline-event ${index === sorted.length - 1 ? 'last' : ''}">
                    <div class="timeline-marker"></div>
                    <div class="timeline-content">
                        <div class="timeline-date">${event.date}</div>
                        <div class="timeline-title">${event.event || event.title || 'Evento'}</div>
                        ${event.description ? `<div class="timeline-description">${event.description}</div>` : ''}
                        ${event.evidence && event.evidence.length > 0 ? `
                            <div class="timeline-evidence">
                                <span class="evidence-label">📎 Evidências:</span>
                                ${event.evidence.map(e => `<span class="evidence-tag">${e}</span>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `).join('');

            container.innerHTML = html;
            return container;
        },

        /**
         * Criar um badge de contagem
         */
        Badge: function({ 
            count, 
            max = 99,
            className = '',
            showZero = false
        } = {}) {
            const badge = document.createElement('span');
            badge.className = `badge ${className}`.trim();

            if (count === 0 && !showZero) {
                badge.style.display = 'none';
            }

            const display = count > max ? `${max}+` : count;
            badge.textContent = display;

            return badge;
        },

        /**
         * Criar um spinner de loading
         */
        Spinner: function({ 
            size = 'medium',
            color = 'accent',
            className = ''
        } = {}) {
            const spinner = document.createElement('div');
            spinner.className = `spinner spinner-${size} spinner-${color} ${className}`.trim();
            
            spinner.innerHTML = `
                <div class="spinner-circle"></div>
                <div class="spinner-circle"></div>
                <div class="spinner-circle"></div>
            `;

            return spinner;
        },

        /**
         * Criar um divider
         */
        Divider: function({ 
            text = '',
            className = ''
        } = {}) {
            const divider = document.createElement('div');
            divider.className = `divider ${className}`.trim();

            if (text) {
                divider.innerHTML = `
                    <span class="divider-line"></span>
                    <span class="divider-text">${text}</span>
                    <span class="divider-line"></span>
                `;
            } else {
                divider.innerHTML = `<span class="divider-line"></span>`;
            }

            return divider;
        },

        /**
         * Criar um tooltip
         */
        Tooltip: function({ 
            content, 
            position = 'top',
            trigger = 'hover',
            className = ''
        } = {}) {
            const container = document.createElement('div');
            container.className = `tooltip-container ${className}`.trim();

            const tooltip = document.createElement('div');
            tooltip.className = `tooltip tooltip-${position}`;
            tooltip.textContent = content;

            container.appendChild(tooltip);

            let isVisible = false;

            const show = () => {
                tooltip.classList.add('visible');
                isVisible = true;
            };

            const hide = () => {
                tooltip.classList.remove('visible');
                isVisible = false;
            };

            if (trigger === 'hover') {
                container.addEventListener('mouseenter', show);
                container.addEventListener('mouseleave', hide);
            } else if (trigger === 'click') {
                container.addEventListener('click', () => {
                    if (isVisible) {
                        hide();
                    } else {
                        show();
                    }
                });
            }

            return {
                element: container,
                tooltip: tooltip,
                show: show,
                hide: hide,
                toggle: () => isVisible ? hide() : show()
            };
        },

        /**
         * Criar um accordion
         */
        Accordion: function({ 
            items = [],
            allowMultiple = false,
            className = ''
        } = {}) {
            const container = document.createElement('div');
            container.className = `accordion ${className}`.trim();

            const html = items.map((item, index) => {
                const isOpen = item.open || false;
                return `
                    <div class="accordion-item ${isOpen ? 'open' : ''}" data-index="${index}">
                        <button class="accordion-header" data-toggle>
                            ${item.icon ? `<span class="accordion-icon">${item.icon}</span>` : ''}
                            <span class="accordion-title">${item.title}</span>
                            <span class="accordion-arrow">${isOpen ? '▼' : '▶'}</span>
                        </button>
                        <div class="accordion-body" ${!isOpen ? 'style="display:none;"' : ''}>
                            ${item.content || ''}
                        </div>
                    </div>
                `;
            }).join('');

            container.innerHTML = html;

            container.querySelectorAll('[data-toggle]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const item = btn.closest('.accordion-item');
                    const body = item.querySelector('.accordion-body');
                    const arrow = btn.querySelector('.accordion-arrow');
                    const isOpen = item.classList.contains('open');

                    if (!allowMultiple) {
                        container.querySelectorAll('.accordion-item').forEach(el => {
                            if (el !== item) {
                                el.classList.remove('open');
                                el.querySelector('.accordion-body').style.display = 'none';
                                el.querySelector('.accordion-arrow').textContent = '▶';
                            }
                        });
                    }

                    if (isOpen) {
                        item.classList.remove('open');
                        body.style.display = 'none';
                        arrow.textContent = '▶';
                    } else {
                        item.classList.add('open');
                        body.style.display = 'block';
                        arrow.textContent = '▼';
                    }
                });
            });

            return container;
        },

        /**
         * Criar um componente de tabs
         */
        Tabs: function({ 
            tabs = [],
            defaultTab = 0,
            className = ''
        } = {}) {
            const container = document.createElement('div');
            container.className = `tabs ${className}`.trim();

            const header = document.createElement('div');
            header.className = 'tabs-header';

            const content = document.createElement('div');
            content.className = 'tabs-content';

            const tabHeaders = tabs.map((tab, index) => {
                const isActive = index === defaultTab;
                const btn = document.createElement('button');
                btn.className = `tab-btn ${isActive ? 'active' : ''}`;
                btn.textContent = tab.label;
                btn.dataset.index = index;
                header.appendChild(btn);
                return btn;
            });

            const tabContents = tabs.map((tab, index) => {
                const div = document.createElement('div');
                div.className = `tab-panel ${index === defaultTab ? 'active' : ''}`;
                div.innerHTML = tab.content || '';
                content.appendChild(div);
                return div;
            });

            container.appendChild(header);
            container.appendChild(content);

            tabHeaders.forEach((btn, index) => {
                btn.addEventListener('click', () => {
                    tabHeaders.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    
                    tabContents.forEach((panel, i) => {
                        panel.classList.toggle('active', i === index);
                    });

                    if (tabs[index].onActivate) {
                        tabs[index].onActivate();
                    }
                });
            });

            return container;
        },

        /**
         * Criar um componente de progresso de evidências
         */
        EvidenceProgress: function({ 
            evidence = [],
            className = ''
        } = {}) {
            const container = document.createElement('div');
            container.className = `evidence-progress ${className}`.trim();

            const found = evidence.filter(e => e.found).length;
            const total = evidence.length;
            const percentage = total > 0 ? Math.round((found / total) * 100) : 0;

            container.innerHTML = `
                <div class="evidence-progress-header">
                    <span class="evidence-progress-title">⭐ Evidências</span>
                    <span class="evidence-progress-count">${found}/${total}</span>
                </div>
                <div class="evidence-progress-bar">
                    <div class="evidence-progress-fill" style="width: ${percentage}%;"></div>
                </div>
                <div class="evidence-progress-items">
                    ${evidence.map(ev => `
                        <div class="evidence-item ${ev.found ? 'found' : 'missing'}">
                            <span class="evidence-item-icon">${ev.found ? '✅' : '⬜'}</span>
                            <span class="evidence-item-name">${ev.name}</span>
                            <span class="evidence-item-status">${ev.found ? 'Encontrado' : 'Pendente'}</span>
                        </div>
                    `).join('')}
                </div>
            `;

            return container;
        }
    };

    // ============================================
    // EXPORT
    // ============================================

    if (typeof window !== 'undefined') {
        window.Components = Components;
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { Components };
    }

    console.log('🧩 Evidence - Components Loaded (v2.0)');

})();