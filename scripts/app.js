// ===== MAIN APPLICATION LOGIC =====

// Application State
const AppState = {
    videos: [],
    filteredVideos: [],
    activeFilters: {},
    searchTerm: '',
    currentEditingId: null,
    isUploading: false
};

// Sample AI-generated video data
const sampleVideos = [
    {
        id: "shift-to-payday",
        title: "Shift to Payday — Barista Morning",
        description: "Live action campaign showcasing instant cash access for service workers",
        theme: "Empowerment",
        style: "Live Action",
        ratio: "9:16",
        platform: "TikTok",
        duration: "15s",
        cta: "Never wait for payday again",
        goal: "Drive immediate cash-out adoption among service workers",
        aiTools: ["Sora", "ChatGPT", "Canva"],
        jsonPrompt: `{
  "logline": "Morning café worker discovers instant cash access",
  "constraints": {
    "duration": "15s",
    "platform": "TikTok",
    "aspect_ratio": "9:16",
    "brand_tone": "Empowering"
  },
  "story_beats": [
    "Morning routine setup",
    "Financial stress moment", 
    "EarnIn discovery",
    "Instant relief",
    "Call to action"
  ],
  "scenes": [
    {
      "environment": "Café kitchen",
      "intent": "Establish routine",
      "shots": ["Wide establishing", "Close-up hands"],
      "duration": "3s"
    }
  ],
  "audio_master": {
    "vo_timestamps": [0, 5, 10],
    "music_hit_points": [2, 8, 14]
  },
  "global_controls": {
    "seed": 42,
    "fps": 24,
    "negative_prompts": ["blurry", "low quality"]
  }
}`,
        videoUrl: "",
        uploadDate: new Date().toISOString()
    },
    {
        id: "morning-cashout-nurse",
        title: "Morning Cash-Out — Healthcare Worker",
        description: "Healthcare worker focused campaign highlighting shift-based income needs",
        theme: "Relief",
        style: "Live Action",
        ratio: "9:16",
        platform: "Reels",
        duration: "20s",
        cta: "Available to Cash Out",
        goal: "Target healthcare workers with shift-based income needs",
        aiTools: ["Flow", "Veo3", "ChatGPT"],
        jsonPrompt: `{
  "logline": "Hospital break room moment of financial relief",
  "constraints": {
    "duration": "20s",
    "platform": "Reels",
    "aspect_ratio": "9:16",
    "brand_tone": "Relieving"
  },
  "story_beats": [
    "End of shift exhaustion",
    "Financial worry",
    "EarnIn app discovery",
    "Instant cash access",
    "Peace of mind"
  ],
  "scenes": [
    {
      "environment": "Hospital break room",
      "intent": "Show relief",
      "shots": ["Close-up phone", "Smile reaction"],
      "duration": "4s"
    }
  ]
}`,
        videoUrl: "",
        uploadDate: new Date().toISOString()
    },
    {
        id: "retail-shift-relief",
        title: "Retail Shift → Relief",
        description: "Multi-format campaign addressing financial stress in retail workers",
        theme: "Control",
        style: "Live Action",
        ratio: "16:9",
        platform: "CTV",
        duration: "30s",
        cta: "Cash Out Complete",
        goal: "Address financial stress in retail workers",
        aiTools: ["Sora", "Veo2", "Gemini"],
        jsonPrompt: `{
  "logline": "Retail worker transforms stress into control",
  "constraints": {
    "duration": "30s",
    "platform": "CTV",
    "aspect_ratio": "16:9",
    "brand_tone": "Empowering"
  },
  "story_beats": [
    "Busy retail environment",
    "Customer stress",
    "Break time relief",
    "EarnIn cash out",
    "Confident return to work"
  ]
}`,
        videoUrl: "",
        uploadDate: new Date().toISOString()
    },
    {
        id: "commuter-control",
        title: "On-the-Go Commuter",
        description: "Mobile-first experience capturing commuter moments",
        theme: "Freedom",
        style: "Live Action",
        ratio: "9:16",
        platform: "Shorts",
        duration: "12s",
        cta: "Available to Cash Out",
        goal: "Capture commuter moments for instant financial control",
        aiTools: ["Flow", "ChatGPT", "Canva"],
        jsonPrompt: `{
  "logline": "Commuter gains financial freedom on the move",
  "constraints": {
    "duration": "12s",
    "platform": "Shorts",
    "aspect_ratio": "9:16",
    "brand_tone": "Freeing"
  },
  "story_beats": [
    "Walking to work",
    "Financial thought",
    "Quick EarnIn tap",
    "Money in account",
    "Confident stride"
  ]
}`,
        videoUrl: "",
        uploadDate: new Date().toISOString()
    },
    {
        id: "lightning-speed-minimal",
        title: "Lightning Speed — Minimal Product",
        description: "Hybrid creative approach showcasing product speed and simplicity",
        theme: "Empowerment",
        style: "Hybrid",
        ratio: "1:1",
        platform: "CTV",
        duration: "8s",
        cta: "Cash Out Complete",
        goal: "Showcase product speed and simplicity",
        aiTools: ["Sora", "Veo3", "Gemini", "Canva"],
        jsonPrompt: `{
  "logline": "One tap transforms financial stress",
  "constraints": {
    "duration": "8s",
    "platform": "CTV",
    "aspect_ratio": "1:1",
    "brand_tone": "Minimal"
  },
  "story_beats": [
    "Product focus",
    "Single tap action",
    "Instant result",
    "Clean finish"
  ]
}`,
        videoUrl: "",
        uploadDate: new Date().toISOString()
    }
];

// Initialize application
document.addEventListener('DOMContentLoaded', async function() {
    console.log('DOMContentLoaded fired in app.js');
    await initializeApp();
    setupEventListeners();
});

async function initializeApp() {
    console.log('Initializing app...');
    
    // Load videos from simple storage
    await loadVideos();
    
    // Load sample data if no videos exist
    if (AppState.videos.length === 0) {
        AppState.videos = [...sampleVideos];
    }
    
    applyFilters();
    renderVideoGrid();
    setupIntersectionObserver();
    console.log('App initialized with', AppState.videos.length, 'videos');
}

async function loadVideos() {
    console.log('Loading videos from storage...');
    
    try {
        // Load videos from simple storage
        const storedVideos = SimpleStorage.getVideos();
        console.log('Loaded videos from storage:', storedVideos.length);
        
        // Combine with sample videos
        AppState.videos = [...sampleVideos, ...storedVideos];
        console.log('Total videos loaded:', AppState.videos.length);
        
    } catch (error) {
        console.error('Error loading videos from storage:', error);
        AppState.videos = [...sampleVideos];
    }
}

function saveVideos() {
    // Save custom videos to simple storage
    const customVideos = AppState.videos.filter(video => !sampleVideos.find(sample => sample.id === video.id));
    
    // Clear and save all custom videos
    SimpleStorage.clearStorage();
    customVideos.forEach(video => {
        SimpleStorage.addVideo(video);
    });
    
    console.log('Saved videos to storage:', customVideos.length);
}

function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // Filter functionality
    document.querySelectorAll('.filter-tag').forEach(tag => {
        tag.addEventListener('click', handleFilterClick);
    });

    // Navigation scroll
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavClick);
    });

    // CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', handleCTAClick);
    }
}

function handleSearch(event) {
    AppState.searchTerm = event.target.value.toLowerCase();
    applyFilters();
    renderVideoGrid();
}

function handleFilterClick(event) {
    const filterType = event.target.dataset.filter;
    const filterValue = event.target.dataset.value;
    
    // Toggle active state
    event.target.classList.toggle('active');
    
    if (event.target.classList.contains('active')) {
        // Remove other active filters in same group
        document.querySelectorAll(`[data-filter="${filterType}"]`).forEach(tag => {
            if (tag !== event.target) {
                tag.classList.remove('active');
            }
        });
        
        AppState.activeFilters[filterType] = filterValue;
    } else {
        delete AppState.activeFilters[filterType];
    }
    
    applyFilters();
    renderVideoGrid();
}

function handleNavClick(event) {
    event.preventDefault();
    const href = event.target.getAttribute('href');
    if (href && href.startsWith('#')) {
        scrollToSection(href.substring(1));
    }
}

function handleCTAClick() {
    scrollToSection('showcase');
}

function applyFilters() {
    AppState.filteredVideos = AppState.videos.filter(video => {
        // Search filter
        if (AppState.searchTerm) {
            const searchableText = `${video.title} ${video.description} ${video.theme} ${video.goal}`.toLowerCase();
            if (!searchableText.includes(AppState.searchTerm)) {
                return false;
            }
        }

        // Tag filters
        for (const [filterType, filterValue] of Object.entries(AppState.activeFilters)) {
            if (video[filterType] !== filterValue) {
                return false;
            }
        }

        return true;
    });
}

function renderVideoGrid() {
    const grid = document.getElementById('video-grid');
    if (!grid) {
        console.error('Video grid element not found!');
        return;
    }

    console.log('Rendering video grid with', AppState.filteredVideos.length, 'videos');
    console.log('All videos:', AppState.videos);
    console.log('Filtered videos:', AppState.filteredVideos);

    if (AppState.filteredVideos.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <polyline points="10,9 9,9 8,9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h3>No videos found</h3>
                <p>Try adjusting your search or filters</p>
                <button class="btn btn-primary" onclick="openUploadModal()">Upload Your First Video</button>
            </div>
        `;
        return;
    }

    grid.innerHTML = AppState.filteredVideos.map(video => createVideoCard(video)).join('');
}

function createVideoCard(video) {
    const hasVideo = video.videoUrl && video.videoUrl.trim() !== '';
    
    return `
        <div class="video-card card-hover animate-on-scroll" data-id="${video.id}">
            <div class="video-thumbnail ratio-${video.ratio.replace(':', '-')}">
                ${hasVideo ? 
                    `<video src="${video.videoUrl}" preload="metadata" controls muted playsinline style="width: 100%; height: 100%; object-fit: cover;"></video>` :
                    `<div class="video-placeholder">Video Placeholder (${video.ratio})</div>`
                }
                <button class="play-button" onclick="playVideo('${video.id}')">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <polygon points="5,3 19,12 5,21" fill="currentColor"/>
                    </svg>
                </button>
            </div>
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <p class="video-description">${video.description}</p>
                
                <div class="video-tags">
                    <span class="tag tag-theme-${video.theme.toLowerCase()}">${video.theme}</span>
                    <span class="tag tag-style-${video.style.toLowerCase().replace(' ', '-')}">${video.style}</span>
                </div>
                
                <div class="video-meta">
                    <div class="meta-item">
                        <span class="meta-label">Duration:</span>
                        <span class="meta-value">${video.duration}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Platform:</span>
                        <span class="meta-value">${video.platform}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">Ratio:</span>
                        <span class="meta-value">${video.ratio}</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-label">AI Tools:</span>
                        <span class="meta-value">${video.aiTools.join(', ')}</span>
                    </div>
                </div>
                
                <div class="card-actions">
                    <button class="btn btn-primary" onclick="viewVideoDetails('${video.id}')">
                        View Details
                    </button>
                    <button class="btn btn-secondary" onclick="attachVideo('${video.id}')">
                        ${hasVideo ? 'Replace Video' : 'Attach Video'}
                    </button>
                </div>
            </div>
        </div>
    `;
}

function playVideo(videoId) {
    const video = AppState.videos.find(v => v.id === videoId);
    if (!video || !video.videoUrl) {
        showToast('No video file attached', 'warning');
        return;
    }
    
    // Open video in detail modal
    viewVideoDetails(videoId);
}

function viewVideoDetails(videoId) {
    const video = AppState.videos.find(v => v.id === videoId);
    if (!video) return;

    // Update modal content
    document.getElementById('detail-modal-title').textContent = video.title;
    document.getElementById('detail-duration').textContent = video.duration;
    document.getElementById('detail-ratio').textContent = video.ratio;
    document.getElementById('detail-platform').textContent = video.platform;
    document.getElementById('detail-theme').textContent = video.theme;
    
    // Update video player
    const videoElement = document.getElementById('detail-video');
    if (video.videoUrl) {
        videoElement.src = video.videoUrl;
        videoElement.style.display = 'block';
    } else {
        videoElement.style.display = 'none';
    }
    
    // Update AI tools
    const toolsContainer = document.getElementById('detail-tools');
    toolsContainer.innerHTML = video.aiTools.map(tool => 
        `<span class="tool-tag">${tool}</span>`
    ).join('');
    
    // Update JSON prompt
    const jsonContainer = document.getElementById('detail-json-prompt');
    jsonContainer.textContent = video.jsonPrompt;
    
    // Show modal
    document.getElementById('video-detail-modal').classList.add('active');
}

function attachVideo(videoId) {
    AppState.currentEditingId = videoId;
    document.getElementById('video-url-input').value = '';
    document.getElementById('url-modal').classList.add('active');
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animate-on-scroll elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Utility function to show toast notifications
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-header">
            <span class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</span>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
        <div class="toast-message">${message}</div>
    `;
    
    document.body.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 5000);
}

// Test function to manually add a video
function testAddVideo() {
    console.log('Testing video addition...');
    const testVideo = {
        id: `test-video-${Date.now()}`,
        title: "Test Video",
        description: "This is a test video",
        theme: "Empowerment",
        style: "Live Action",
        ratio: "9:16",
        platform: "TikTok",
        duration: "15s",
        cta: "Available to Cash Out",
        goal: "Test video goal",
        aiTools: ["Sora", "ChatGPT", "Canva"],
        jsonPrompt: '{"test": "data"}',
        videoUrl: "",
        uploadDate: new Date().toISOString(),
        fileName: "test.mp4",
        fileSize: 1000000,
        hasVideoFile: false
    };
    
    AppState.videos.push(testVideo);
    applyFilters();
    renderVideoGrid();
    console.log('Test video added. Total videos:', AppState.videos.length);
}

// Export functions for global access
window.AppState = AppState;
window.showToast = showToast;
window.playVideo = playVideo;
window.viewVideoDetails = viewVideoDetails;
window.attachVideo = attachVideo;
window.scrollToSection = scrollToSection;
window.testAddVideo = testAddVideo;
