// ===== SIMPLE VIDEO STORAGE SYSTEM =====

class SimpleVideoStorage {
    constructor() {
        this.storageKey = 'ai-marketing-videos';
        this.videos = [];
        this.loadFromStorage();
    }

    loadFromStorage() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                this.videos = JSON.parse(stored);
                console.log('Loaded videos from storage:', this.videos.length);
            }
        } catch (error) {
            console.error('Error loading videos from storage:', error);
            this.videos = [];
        }
    }

    saveToStorage() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.videos));
            console.log('Saved videos to storage:', this.videos.length);
        } catch (error) {
            console.error('Error saving videos to storage:', error);
        }
    }

    addVideo(videoData) {
        console.log('Adding video to storage:', videoData);
        this.videos.push(videoData);
        this.saveToStorage();
        return videoData.id;
    }

    getVideos() {
        return [...this.videos];
    }

    getVideo(id) {
        return this.videos.find(video => video.id === id);
    }

    removeVideo(id) {
        this.videos = this.videos.filter(video => video.id !== id);
        this.saveToStorage();
    }

    clearStorage() {
        this.videos = [];
        localStorage.removeItem(this.storageKey);
        console.log('Storage cleared');
    }
}

// Create global instance
const simpleStorage = new SimpleVideoStorage();

// Export functions
window.SimpleStorage = {
    addVideo: (videoData) => simpleStorage.addVideo(videoData),
    getVideos: () => simpleStorage.getVideos(),
    getVideo: (id) => simpleStorage.getVideo(id),
    removeVideo: (id) => simpleStorage.removeVideo(id),
    clearStorage: () => simpleStorage.clearStorage()
};
