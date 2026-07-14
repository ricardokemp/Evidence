/* ============================================
   EVIDENCE - Storage System
   Versão: 2.0.0 - Com Sistema de Progressão
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // STORAGE MANAGER
    // ============================================

    class StorageManager {
        constructor() {
            this.prefix = 'evidence_';
            this.version = '2.0.0';
            this.storage = window.localStorage;
            this.available = this.checkAvailability();
            
            this.migrate();
            
            console.log(`💾 Storage Manager initialized (${this.available ? 'available' : 'unavailable'})`);
        }

        checkAvailability() {
            try {
                const test = '__test__';
                this.storage.setItem(test, test);
                this.storage.removeItem(test);
                return true;
            } catch (e) {
                console.warn('⚠️ localStorage not available:', e);
                return false;
            }
        }

        getKey(key) {
            return `${this.prefix}${key}`;
        }

        set(key, data) {
            if (!this.available) return false;
            
            try {
                const value = typeof data === 'string' ? data : JSON.stringify(data);
                this.storage.setItem(this.getKey(key), value);
                return true;
            } catch (e) {
                console.error('❌ Storage set error:', e);
                return false;
            }
        }

        get(key, defaultValue = null) {
            if (!this.available) return defaultValue;
            
            try {
                const value = this.storage.getItem(this.getKey(key));
                if (value === null) return defaultValue;
                
                try {
                    return JSON.parse(value);
                } catch {
                    return value;
                }
            } catch (e) {
                console.error('❌ Storage get error:', e);
                return defaultValue;
            }
        }

        remove(key) {
            if (!this.available) return false;
            
            try {
                this.storage.removeItem(this.getKey(key));
                return true;
            } catch (e) {
                console.error('❌ Storage remove error:', e);
                return false;
            }
        }

        clear() {
            if (!this.available) return false;
            
            try {
                const keys = Object.keys(this.storage);
                keys.forEach(key => {
                    if (key.startsWith(this.prefix)) {
                        this.storage.removeItem(key);
                    }
                });
                return true;
            } catch (e) {
                console.error('❌ Storage clear error:', e);
                return false;
            }
        }

        keys() {
            if (!this.available) return [];
            
            try {
                return Object.keys(this.storage)
                    .filter(key => key.startsWith(this.prefix))
                    .map(key => key.replace(this.prefix, ''));
            } catch (e) {
                console.error('❌ Storage keys error:', e);
                return [];
            }
        }

        getSize() {
            if (!this.available) return 0;
            
            try {
                let total = 0;
                for (let key in this.storage) {
                    if (this.storage.hasOwnProperty(key)) {
                        total += this.storage[key].length * 2;
                    }
                }
                return total;
            } catch (e) {
                console.error('❌ Storage size error:', e);
                return 0;
            }
        }

        has(key) {
            if (!this.available) return false;
            return this.storage.getItem(this.getKey(key)) !== null;
        }

        migrate() {
            const version = this.get('version');
            if (version === this.version) return;

            if (!version) {
                this.set('version', this.version);
                this.set('created', new Date().toISOString());
            } else {
                this.set('version', this.version);
            }
        }

        getInfo() {
            const keys = this.keys();
            const size = this.getSize();
            
            return {
                available: this.available,
                version: this.version,
                keys: keys.length,
                size: size,
                sizeHuman: this.formatSize(size),
                created: this.get('created'),
                updated: this.get('updated') || this.get('created')
            };
        }

        formatSize(bytes) {
            if (bytes === 0) return '0 B';
            const units = ['B', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(1024));
            return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${units[i]}`;
        }
    }

    // ============================================
    // EVIDENCE STORAGE
    // ============================================

    class EvidenceStorage {
        constructor() {
            this.storage = new StorageManager();
            this.cache = new Map();
            this.pendingSaves = new Map();
            this.saveTimeout = null;
            this.autoSaveInterval = 30000;
            this.startAutoSave();
        }

        /**
         * Salvar estado completo do jogo
         */
        saveGame(state) {
            const data = {
                ...state,
                savedAt: new Date().toISOString(),
                version: this.storage.version,
                gameTime: this.getGameTime()
            };

            const success = this.storage.set('game_state', data);
            if (success) {
                this.cache.set('game_state', data);
                this.storage.set('updated', data.savedAt);
                console.log('💾 Game saved successfully');
            }
            return success;
        }

        /**
         * Carregar estado do jogo
         */
        loadGame() {
            if (this.cache.has('game_state')) {
                return this.cache.get('game_state');
            }

            const data = this.storage.get('game_state');
            if (data) {
                this.cache.set('game_state', data);
                console.log('📂 Game loaded successfully');
                return data;
            }

            console.log('📂 No saved game found');
            return null;
        }

        /**
         * Salvar progresso do jogador
         */
        saveProgress(progressData) {
            const current = this.loadGame() || {};
            const data = {
                ...current,
                progress: {
                    ...current.progress,
                    ...progressData,
                    updatedAt: new Date().toISOString()
                }
            };
            return this.saveGame(data);
        }

        /**
         * Carregar progresso do jogador
         */
        getProgress() {
            const game = this.loadGame();
            return game?.progress || null;
        }

        /**
         * Salvar status de uma evidência
         */
        saveEvidence(evidenceId, found) {
            const progress = this.getProgress() || {};
            const evidence = progress.evidence || {};
            evidence[evidenceId] = found;
            return this.saveProgress({ evidence });
        }

        /**
         * Carregar status de uma evidência
         */
        getEvidence(evidenceId) {
            const progress = this.getProgress();
            if (!progress || !progress.evidence) return false;
            return progress.evidence[evidenceId] || false;
        }

        /**
         * Carregar todas as evidências
         */
        getAllEvidence() {
            const progress = this.getProgress();
            return progress?.evidence || {};
        }

        /**
         * Salvar anotação do usuário
         */
        saveNote(note) {
            const progress = this.getProgress() || {};
            const notes = progress.notes || [];
            notes.push({
                ...note,
                id: note.id || this.generateId(),
                createdAt: note.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            return this.saveProgress({ notes });
        }

        /**
         * Carregar anotações
         */
        getNotes() {
            const progress = this.getProgress();
            return progress?.notes || [];
        }

        /**
         * Deletar anotação
         */
        deleteNote(noteId) {
            const progress = this.getProgress() || {};
            const notes = progress.notes || [];
            const filtered = notes.filter(n => n.id !== noteId);
            return this.saveProgress({ notes: filtered });
        }

        /**
         * Atualizar anotação
         */
        updateNote(noteId, updates) {
            const progress = this.getProgress() || {};
            const notes = progress.notes || [];
            const index = notes.findIndex(n => n.id === noteId);
            if (index === -1) return false;
            
            notes[index] = {
                ...notes[index],
                ...updates,
                updatedAt: new Date().toISOString()
            };
            return this.saveProgress({ notes });
        }

        /**
         * Salvar configurações
         */
        saveSettings(settings) {
            const game = this.loadGame() || {};
            const data = {
                ...game,
                settings: {
                    ...game.settings,
                    ...settings,
                    updatedAt: new Date().toISOString()
                }
            };
            return this.saveGame(data);
        }

        /**
         * Carregar configurações
         */
        getSettings() {
            const game = this.loadGame();
            return game?.settings || {};
        }

        /**
         * Salvar histórico de ações
         */
        saveHistory(action) {
            const game = this.loadGame() || {};
            const history = game.history || [];
            history.push({
                ...action,
                timestamp: new Date().toISOString()
            });
            
            if (history.length > 1000) {
                history.splice(0, history.length - 1000);
            }
            
            return this.saveGame({ history });
        }

        /**
         * Carregar histórico
         */
        getHistory(limit = 50) {
            const game = this.loadGame();
            const history = game?.history || [];
            return history.slice(-limit);
        }

        /**
         * Limpar dados do jogo
         */
        clearGame() {
            this.cache.clear();
            this.storage.remove('game_state');
            console.log('🗑️ Game data cleared');
            return true;
        }

        /**
         * Exportar dados do jogo
         */
        exportData() {
            const game = this.loadGame();
            if (!game) return null;
            
            return {
                ...game,
                exportedAt: new Date().toISOString(),
                exportVersion: this.storage.version
            };
        }

        /**
         * Importar dados do jogo
         */
        importData(data) {
            if (!data || typeof data !== 'object') return false;
            
            if (!data.progress && !data.settings) {
                console.error('❌ Invalid import data');
                return false;
            }
            
            const success = this.storage.set('game_state', data);
            if (success) {
                this.cache.set('game_state', data);
                console.log('📥 Game data imported successfully');
                return true;
            }
            return false;
        }

        /**
         * Gerar ID único
         */
        generateId() {
            return Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
        }

        /**
         * Calcular tempo total de jogo
         */
        getGameTime() {
            const game = this.loadGame();
            if (!game) return 0;
            
            const startTime = new Date(game.createdAt || game.savedAt || Date.now()).getTime();
            const totalTime = game.totalTime || 0;
            const currentSession = Date.now() - startTime;
            
            return totalTime + currentSession;
        }

        /**
         * Iniciar auto-save
         */
        startAutoSave() {
            if (this.saveTimeout) return;
            
            this.saveTimeout = setInterval(() => {
                this.autoSave();
            }, this.autoSaveInterval);
        }

        /**
         * Parar auto-save
         */
        stopAutoSave() {
            if (this.saveTimeout) {
                clearInterval(this.saveTimeout);
                this.saveTimeout = null;
            }
        }

        /**
         * Auto-save
         */
        autoSave() {
            const game = this.loadGame();
            if (game) {
                game.totalTime = this.getGameTime();
                game.autoSavedAt = new Date().toISOString();
                this.saveGame(game);
            }
        }

        /**
         * Salvar com debounce
         */
        debouncedSave(key, data, delay = 1000) {
            if (this.pendingSaves.has(key)) {
                clearTimeout(this.pendingSaves.get(key));
            }

            const timeout = setTimeout(() => {
                this.saveGame(data);
                this.pendingSaves.delete(key);
            }, delay);

            this.pendingSaves.set(key, timeout);
        }

        /**
         * Informações do storage
         */
        getStorageInfo() {
            return this.storage.getInfo();
        }

        /**
         * Verificar disponibilidade
         */
        isAvailable() {
            return this.storage.available;
        }

        /**
         * Sincronizar com o STORY_DATA atual
         */
        syncWithStoryData() {
            if (typeof window.STORY_DATA === 'undefined') {
                console.warn('⚠️ STORY_DATA não encontrado para sincronizar');
                return false;
            }

            const progress = this.getProgress();
            if (!progress || !progress.evidence) {
                return false;
            }

            // Sincronizar evidências
            const evidence = window.STORY_DATA.evidence || [];
            evidence.forEach(ev => {
                if (progress.evidence[ev.id] !== undefined) {
                    ev.found = progress.evidence[ev.id];
                }
            });

            // Atualizar progresso
            if (window.Evidence && window.Evidence.reload) {
                window.Evidence.reload();
            }

            console.log('🔄 Synced with STORY_DATA');
            return true;
        }
    }

    // ============================================
    // EXPORT
    // ============================================

    if (typeof window !== 'undefined') {
        window.StorageManager = StorageManager;
        window.EvidenceStorage = EvidenceStorage;
        
        // Criar instância global
        window.evidenceStorage = new EvidenceStorage();
        
        // Sincronizar automaticamente após carregar
        if (document.readyState === 'complete') {
            window.evidenceStorage.syncWithStoryData();
        } else {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    window.evidenceStorage.syncWithStoryData();
                }, 500);
            });
        }
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { StorageManager, EvidenceStorage };
    }

    console.log('💾 Evidence - Storage System Loaded (v2.0)');

})();