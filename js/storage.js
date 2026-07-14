/* ============================================
   EVIDENCE - Storage System
   Versão: 1.0.0
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // STORAGE MANAGER
    // ============================================

    class StorageManager {
        constructor() {
            this.prefix = 'evidence_';
            this.version = '1.0.0';
            this.storage = window.localStorage;
            this.available = this.checkAvailability();
            
            // Try to migrate from old versions
            this.migrate();
            
            console.log(`💾 Storage Manager initialized (${this.available ? 'available' : 'unavailable'})`);
        }

        /**
         * Check if localStorage is available
         */
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

        /**
         * Get a key with prefix
         */
        getKey(key) {
            return `${this.prefix}${key}`;
        }

        /**
         * Save data
         */
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

        /**
         * Get data
         */
        get(key, defaultValue = null) {
            if (!this.available) return defaultValue;
            
            try {
                const value = this.storage.getItem(this.getKey(key));
                if (value === null) return defaultValue;
                
                // Try to parse JSON
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

        /**
         * Remove data
         */
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

        /**
         * Clear all data with prefix
         */
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

        /**
         * Get all keys with prefix
         */
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

        /**
         * Get storage size
         */
        getSize() {
            if (!this.available) return 0;
            
            try {
                let total = 0;
                for (let key in this.storage) {
                    if (this.storage.hasOwnProperty(key)) {
                        total += this.storage[key].length * 2; // UTF-16
                    }
                }
                return total;
            } catch (e) {
                console.error('❌ Storage size error:', e);
                return 0;
            }
        }

        /**
         * Check if key exists
         */
        has(key) {
            if (!this.available) return false;
            return this.storage.getItem(this.getKey(key)) !== null;
        }

        /**
         * Migrate from old versions
         */
        migrate() {
            const version = this.get('version');
            if (version === this.version) return;

            // Migration logic here
            if (!version) {
                // First time - initialize
                this.set('version', this.version);
                this.set('created', new Date().toISOString());
            } else {
                // Update version
                this.set('version', this.version);
            }
        }

        /**
         * Get storage usage info
         */
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

        /**
         * Format bytes to human readable
         */
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
            
            // Auto-save interval
            this.autoSaveInterval = 30000; // 30 seconds
            this.startAutoSave();
        }

        /**
         * Save game state
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
         * Load game state
         */
        loadGame() {
            // Check cache first
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
         * Save user progress
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
         * Get user progress
         */
        getProgress() {
            const game = this.loadGame();
            return game?.progress || null;
        }

        /**
         * Save evidence status
         */
        saveEvidence(evidenceId, found) {
            const progress = this.getProgress() || {};
            const evidence = progress.evidence || {};
            evidence[evidenceId] = found;
            return this.saveProgress({ evidence });
        }

        /**
         * Get evidence status
         */
        getEvidence(evidenceId) {
            const progress = this.getProgress();
            if (!progress || !progress.evidence) return false;
            return progress.evidence[evidenceId] || false;
        }

        /**
         * Get all evidence status
         */
        getAllEvidence() {
            const progress = this.getProgress();
            return progress?.evidence || {};
        }

        /**
         * Save user notes
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
         * Get all notes
         */
        getNotes() {
            const progress = this.getProgress();
            return progress?.notes || [];
        }

        /**
         * Delete a note
         */
        deleteNote(noteId) {
            const progress = this.getProgress() || {};
            const notes = progress.notes || [];
            const filtered = notes.filter(n => n.id !== noteId);
            return this.saveProgress({ notes: filtered });
        }

        /**
         * Update a note
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
         * Save user settings
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
         * Get user settings
         */
        getSettings() {
            const game = this.loadGame();
            return game?.settings || {};
        }

        /**
         * Save game history
         */
        saveHistory(action) {
            const game = this.loadGame() || {};
            const history = game.history || [];
            history.push({
                ...action,
                timestamp: new Date().toISOString()
            });
            
            // Keep only last 1000 actions
            if (history.length > 1000) {
                history.splice(0, history.length - 1000);
            }
            
            return this.saveGame({ history });
        }

        /**
         * Get game history
         */
        getHistory(limit = 50) {
            const game = this.loadGame();
            const history = game?.history || [];
            return history.slice(-limit);
        }

        /**
         * Clear game data
         */
        clearGame() {
            this.cache.clear();
            this.storage.remove('game_state');
            console.log('🗑️ Game data cleared');
            return true;
        }

        /**
         * Export game data
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
         * Import game data
         */
        importData(data) {
            if (!data || typeof data !== 'object') return false;
            
            // Validate data
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
         * Generate unique ID
         */
        generateId() {
            return Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
        }

        /**
         * Get game time (total time played)
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
         * Start auto-save
         */
        startAutoSave() {
            if (this.saveTimeout) return;
            
            this.saveTimeout = setInterval(() => {
                this.autoSave();
            }, this.autoSaveInterval);
        }

        /**
         * Stop auto-save
         */
        stopAutoSave() {
            if (this.saveTimeout) {
                clearInterval(this.saveTimeout);
                this.saveTimeout = null;
            }
        }

        /**
         * Auto-save current state
         */
        autoSave() {
            const game = this.loadGame();
            if (game) {
                // Update total time
                game.totalTime = this.getGameTime();
                game.autoSavedAt = new Date().toISOString();
                this.saveGame(game);
            }
        }

        /**
         * Debounced save (for frequent saves)
         */
        debouncedSave(key, data, delay = 1000) {
            // Clear existing timeout for this key
            if (this.pendingSaves.has(key)) {
                clearTimeout(this.pendingSaves.get(key));
            }

            // Set new timeout
            const timeout = setTimeout(() => {
                this.saveGame(data);
                this.pendingSaves.delete(key);
            }, delay);

            this.pendingSaves.set(key, timeout);
        }

        /**
         * Get storage info
         */
        getStorageInfo() {
            return this.storage.getInfo();
        }

        /**
         * Check if storage is available
         */
        isAvailable() {
            return this.storage.available;
        }
    }

    // ============================================
    // EXPORT
    // ============================================

    if (typeof window !== 'undefined') {
        window.StorageManager = StorageManager;
        window.EvidenceStorage = EvidenceStorage;
        
        // Create global instance
        window.evidenceStorage = new EvidenceStorage();
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { StorageManager, EvidenceStorage };
    }

    console.log('💾 Evidence - Storage System Loaded');

})();