// ===== INDEXEDDB STORAGE SYSTEM FOR PERSISTENT VIDEO FILES =====

class IndexedDBStorage {
    constructor() {
        this.dbName = 'AIMarketingPortfolio';
        this.dbVersion = 1;
        this.db = null;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);
            
            request.onerror = () => {
                console.error('IndexedDB error:', request.error);
                reject(request.error);
            };
            
            request.onsuccess = () => {
                this.db = request.result;
                console.log('IndexedDB initialized successfully');
                resolve();
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // Create object store for video files
                if (!db.objectStoreNames.contains('videos')) {
                    const videoStore = db.createObjectStore('videos', { keyPath: 'id' });
                    videoStore.createIndex('uploadDate', 'uploadDate', { unique: false });
                }
                
                console.log('IndexedDB database upgraded');
            };
        });
    }

    async storeVideo(videoData) {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['videos'], 'readwrite');
            const store = transaction.objectStore('videos');
            
            const request = store.add(videoData);
            
            request.onsuccess = () => {
                console.log('Video stored in IndexedDB:', videoData.id);
                resolve(videoData.id);
            };
            
            request.onerror = () => {
                console.error('Error storing video:', request.error);
                reject(request.error);
            };
        });
    }

    async getVideo(videoId) {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['videos'], 'readonly');
            const store = transaction.objectStore('videos');
            
            const request = store.get(videoId);
            
            request.onsuccess = () => {
                resolve(request.result);
            };
            
            request.onerror = () => {
                console.error('Error retrieving video:', request.error);
                reject(request.error);
            };
        });
    }

    async getAllVideos() {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['videos'], 'readonly');
            const store = transaction.objectStore('videos');
            
            const request = store.getAll();
            
            request.onsuccess = () => {
                resolve(request.result);
            };
            
            request.onerror = () => {
                console.error('Error retrieving all videos:', request.error);
                reject(request.error);
            };
        });
    }

    async deleteVideo(videoId) {
        if (!this.db) {
            await this.init();
        }

        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['videos'], 'readwrite');
            const store = transaction.objectStore('videos');
            
            const request = store.delete(videoId);
            
            request.onsuccess = () => {
                console.log('Video deleted from IndexedDB:', videoId);
                resolve();
            };
            
            request.onerror = () => {
                console.error('Error deleting video:', request.error);
                reject(request.error);
            };
        });
    }
}

// Create global instance
const indexedDBStorage = new IndexedDBStorage();

// Export functions for global access
window.IndexedDBStorage = {
    init: () => indexedDBStorage.init(),
    storeVideo: (videoData) => indexedDBStorage.storeVideo(videoData),
    getVideo: (videoId) => indexedDBStorage.getVideo(videoId),
    getAllVideos: () => indexedDBStorage.getAllVideos(),
    deleteVideo: (videoId) => indexedDBStorage.deleteVideo(videoId)
};
