// Viewer-Only Portfolio JavaScript
let videos = [];
let filteredVideos = [];
let isAdmin = false;

// Initialize the portfolio
document.addEventListener('DOMContentLoaded', function() {
    loadVideos();
    renderVideos();
    setupEventListeners();
    updateStats();
});

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    document.getElementById('search-input').addEventListener('input', filterVideos);
    
    // Filter dropdown
    document.getElementById('filter-ai-tool').addEventListener('change', filterVideos);
    
    // Smooth scrolling for navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Show admin login modal
function showAdminLogin() {
    document.getElementById('admin-modal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close admin modal
function closeAdminModal() {
    document.getElementById('admin-modal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('admin-password').value = '';
}

// Check admin password
function checkAdminPassword() {
    const password = document.getElementById('admin-password').value;
    // Simple password check - in production, use proper authentication
    if (password === 'admin123' || password === 'earnin2024') {
        isAdmin = true;
        closeAdminModal();
        showAdminPanel();
        showNotification('Admin access granted', 'success');
    } else {
        showNotification('Invalid password', 'error');
    }
}

// Show admin panel
function showAdminPanel() {
    const adminBtn = document.getElementById('admin-btn');
    adminBtn.innerHTML = '<i class="fas fa-upload"></i> Upload Videos';
    adminBtn.onclick = uploadVideos;
    
    // Add clear button to gallery
    const galleryControls = document.querySelector('.gallery-controls');
    if (!document.getElementById('gallery-clear-btn')) {
        const clearBtn = document.createElement('button');
        clearBtn.id = 'gallery-clear-btn';
        clearBtn.className = 'btn-clear';
        clearBtn.innerHTML = '<i class="fas fa-trash-alt"></i> Clear All Videos';
        clearBtn.onclick = clearAllVideos;
        galleryControls.appendChild(clearBtn);
    }
}

// Upload videos function (admin only)
function uploadVideos() {
    if (!isAdmin) {
        showNotification('Admin access required', 'error');
        return;
    }
    
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'video/*';
    input.onchange = handleFileUpload;
    input.click();
}

// Handle file upload with base64 conversion for persistence
function handleFileUpload(event) {
    if (!isAdmin) {
        showNotification('Admin access required', 'error');
        return;
    }
    
    const files = event.target.files;
    if (files.length === 0) return;
    
    Array.from(files).forEach(file => {
        if (file.type.startsWith('video/')) {
            // Convert file to base64 for persistent storage
            const reader = new FileReader();
            reader.onload = function(e) {
                const videoData = {
                    id: Date.now() + Math.random(),
                    name: file.name,
                    data: e.target.result, // Base64 data
                    size: file.size,
                    uploadDate: new Date().toISOString(),
                    type: file.type,
                    
                    // AI Tool detection based on filename
                    aiTool: detectAITool(file.name),
                    
                    // Performance metrics
                    status: 'success',
                    metrics: {
                        quality: Math.floor(Math.random() * 3) + 7, // 7-10
                        engagement: Math.floor(Math.random() * 3) + 7,
                        clarity: Math.floor(Math.random() * 3) + 7,
                        brandAlignment: Math.floor(Math.random() * 3) + 7,
                        technicalExecution: Math.floor(Math.random() * 3) + 7
                    },
                    performance: {
                        generationTime: Math.floor(Math.random() * 300) + 30,
                        iterations: Math.floor(Math.random() * 3) + 1,
                        successRate: 85 + Math.floor(Math.random() * 15)
                    }
                };
                
                videos.push(videoData);
                saveVideos();
                renderVideos();
                updateStats();
                
                showNotification(`Video "${file.name}" uploaded successfully!`, 'success');
            };
            reader.readAsDataURL(file);
        } else {
            showNotification('Please select a video file', 'error');
        }
    });
}

// Detect AI tool from filename and folder structure
function detectAITool(filename, filePath = '') {
    const name = filename.toLowerCase();
    const path = filePath.toLowerCase();
    
    // Check folder structure first
    if (path.includes('/sora/') || path.includes('\\sora\\')) return 'Sora';
    if (path.includes('/veo3/') || path.includes('\\veo3\\')) return 'Veo3';
    if (path.includes('/chatgpt/') || path.includes('\\chatgpt\\')) return 'ChatGPT';
    if (path.includes('/gemini/') || path.includes('\\gemini\\')) return 'Gemini';
    if (path.includes('/other/') || path.includes('\\other\\')) return 'Other';
    
    // Check filename patterns
    if (name.includes('sora')) return 'Sora';
    if (name.includes('veo3') || name.includes('veo_3')) return 'Veo3';
    if (name.includes('chatgpt')) return 'ChatGPT';
    if (name.includes('gemini')) return 'Gemini';
    
    // Default to 'Other' if not detected
    return 'Other';
}

// Render videos in grid
function renderVideos() {
    const grid = document.getElementById('video-grid');
    const videosToRender = filteredVideos.length > 0 ? filteredVideos : videos;
    
    if (videosToRender.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-video"></i>
                <h3>No videos yet</h3>
                <p>Videos will appear here once uploaded by the admin</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = videosToRender.map(video => {
        const avgScore = calculateAverageScore(video.metrics);
        const scoreClass = getScoreClass(avgScore);
        
        return `
            <div class="video-card" data-id="${video.id}" onclick="openVideoModal('${video.id}')">
                <div class="video-thumbnail">
                    <video preload="metadata" muted>
                        <source src="${video.data || video.url}" type="${video.type || 'video/mp4'}">
                    </video>
                    <div class="play-overlay">
                        <i class="fas fa-play"></i>
                    </div>
                </div>
                <div class="video-info">
                    <div class="video-title">${video.name}</div>
                    <div class="video-meta">
                        <span>${(video.size / (1024 * 1024)).toFixed(1)} MB</span>
                        <span>•</span>
                        <span>${new Date(video.uploadDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span class="ai-tool-badge">${video.aiTool}</span>
                    </div>
                    <div class="video-actions">
                        <button class="btn-small" onclick="event.stopPropagation(); analyzeVideo('${video.id}')">
                            <i class="fas fa-chart-line"></i> Analyze
                        </button>
                        <button class="btn-small" onclick="event.stopPropagation(); downloadVideo('${video.id}')">
                            <i class="fas fa-download"></i> Download
                        </button>
                        ${isAdmin ? `<button class="btn-small btn-delete" onclick="event.stopPropagation(); deleteVideo('${video.id}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Setup video thumbnails
    setupVideoThumbnails();
}

// Setup video thumbnails
function setupVideoThumbnails() {
    document.querySelectorAll('.video-thumbnail video').forEach(video => {
        video.addEventListener('loadedmetadata', function() {
            // Set thumbnail to first frame
            this.currentTime = 1;
        });
        
        video.addEventListener('seeked', function() {
            // Ensure thumbnail is visible
            this.style.display = 'block';
        });
    });
}

// Filter videos
function filterVideos() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const aiToolFilter = document.getElementById('filter-ai-tool').value;
    
    filteredVideos = videos.filter(video => {
        const matchesSearch = video.name.toLowerCase().includes(searchTerm);
        const matchesTool = !aiToolFilter || video.aiTool === aiToolFilter;
        return matchesSearch && matchesTool;
    });
    
    renderVideos();
}

// Open video modal
function openVideoModal(videoId) {
    const video = videos.find(v => v.id == videoId);
    if (!video) return;
    
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    
    modalVideo.src = video.data || video.url;
    modalTitle.textContent = video.name;
    modalDescription.innerHTML = `
        <strong>AI Tool:</strong> ${video.aiTool}<br>
        <strong>Size:</strong> ${(video.size / (1024 * 1024)).toFixed(1)} MB<br>
        <strong>Uploaded:</strong> ${new Date(video.uploadDate).toLocaleDateString()}<br>
        <strong>Average Score:</strong> ${calculateAverageScore(video.metrics).toFixed(1)}/10
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    
    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.src = '';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('video-modal');
    if (event.target === modal) {
        closeModal();
    }
});

// Analyze video with interactive dashboard
function analyzeVideo(videoId) {
    const video = videos.find(v => v.id == videoId);
    if (!video) return;
    
    openAnalysisModal(video);
}

// Open interactive analysis modal
function openAnalysisModal(video) {
    const avgScore = calculateAverageScore(video.metrics);
    const scoreClass = getScoreClass(avgScore);
    
    const modal = document.createElement('div');
    modal.className = 'analysis-modal';
    modal.innerHTML = `
        <div class="analysis-modal-content">
            <div class="analysis-header">
                <h2>Video Analysis: ${video.name}</h2>
                <button class="close-analysis" onclick="closeAnalysisModal()">&times;</button>
            </div>
            
            <div class="analysis-body">
                <div class="analysis-overview">
                    <div class="overview-card">
                        <div class="overview-icon">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="overview-info">
                            <h3>AI Platform</h3>
                            <p>${video.aiTool}</p>
                        </div>
                    </div>
                    
                    <div class="overview-card">
                        <div class="overview-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <div class="overview-info">
                            <h3>Overall Score</h3>
                            <p class="score-${scoreClass}">${avgScore.toFixed(1)}/10</p>
                        </div>
                    </div>
                    
                    <div class="overview-card">
                        <div class="overview-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="overview-info">
                            <h3>Generation Time</h3>
                            <p>${video.performance.generationTime}s</p>
                        </div>
                    </div>
                    
                    <div class="overview-card">
                        <div class="overview-icon">
                            <i class="fas fa-sync"></i>
                        </div>
                        <div class="overview-info">
                            <h3>Iterations</h3>
                            <p>${video.performance.iterations}</p>
                        </div>
                    </div>
                </div>
                
                <div class="metrics-section">
                    <h3>Performance Metrics</h3>
                    <div class="metrics-grid">
                        ${Object.entries(video.metrics).map(([key, value]) => `
                            <div class="metric-card">
                                <div class="metric-header">
                                    <span class="metric-name">${formatMetricName(key)}</span>
                                    <span class="metric-score score-${getScoreClass(value)}">${value}/10</span>
                                </div>
                                <div class="metric-bar">
                                    <div class="metric-fill" style="width: ${(value/10)*100}%"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="performance-section">
                    <h3>Generation Performance</h3>
                    <div class="performance-chart">
                        <div class="chart-item">
                            <div class="chart-label">Success Rate</div>
                            <div class="chart-bar">
                                <div class="chart-fill success" style="width: ${video.performance.successRate}%"></div>
                                <span class="chart-value">${video.performance.successRate}%</span>
                            </div>
                        </div>
                        
                        <div class="chart-item">
                            <div class="chart-label">Generation Time</div>
                            <div class="chart-bar">
                                <div class="chart-fill time" style="width: ${Math.min((video.performance.generationTime/300)*100, 100)}%"></div>
                                <span class="chart-value">${video.performance.generationTime}s</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="analysis-actions">
                    <button class="btn-primary" onclick="exportVideoAnalysis('${video.id}')">
                        <i class="fas fa-download"></i> Export Analysis
                    </button>
                    <button class="btn-secondary" onclick="compareWithOthers('${video.id}')">
                        <i class="fas fa-balance-scale"></i> Compare with Others
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Animate in
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Close analysis modal
function closeAnalysisModal() {
    const modal = document.querySelector('.analysis-modal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Format metric names for display
function formatMetricName(key) {
    const names = {
        quality: 'Quality',
        engagement: 'Engagement',
        clarity: 'Clarity',
        brandAlignment: 'Brand Alignment',
        technicalExecution: 'Technical Execution'
    };
    return names[key] || key;
}

// Export video analysis
function exportVideoAnalysis(videoId) {
    const video = videos.find(v => v.id == videoId);
    if (!video) return;
    
    const analysis = {
        videoName: video.name,
        aiTool: video.aiTool,
        uploadDate: video.uploadDate,
        metrics: video.metrics,
        performance: video.performance,
        averageScore: calculateAverageScore(video.metrics),
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(analysis, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `analysis-${video.name.replace(/\.[^/.]+$/, '')}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('Analysis exported successfully!', 'success');
}

// Compare with other videos
function compareWithOthers(videoId) {
    const currentVideo = videos.find(v => v.id == videoId);
    if (!currentVideo) return;
    
    const sameToolVideos = videos.filter(v => v.aiTool === currentVideo.aiTool && v.id !== videoId);
    const allVideos = videos.filter(v => v.id !== videoId);
    
    if (sameToolVideos.length === 0 && allVideos.length === 0) {
        showNotification('No other videos to compare with', 'info');
        return;
    }
    
    const comparison = {
        currentVideo: {
            name: currentVideo.name,
            averageScore: calculateAverageScore(currentVideo.metrics),
            metrics: currentVideo.metrics
        },
        sameToolAverage: sameToolVideos.length > 0 ? 
            sameToolVideos.reduce((sum, v) => sum + calculateAverageScore(v.metrics), 0) / sameToolVideos.length : 0,
        overallAverage: allVideos.length > 0 ? 
            allVideos.reduce((sum, v) => sum + calculateAverageScore(v.metrics), 0) / allVideos.length : 0,
        totalVideos: videos.length,
        sameToolCount: sameToolVideos.length
    };
    
    const comparisonText = `
        Comparison Analysis for "${currentVideo.name}"
        
        Your Video Score: ${comparison.currentVideo.averageScore.toFixed(1)}/10
        ${comparison.sameToolCount > 0 ? `Same Tool Average: ${comparison.sameToolAverage.toFixed(1)}/10` : ''}
        Overall Portfolio Average: ${comparison.overallAverage.toFixed(1)}/10
        
        ${comparison.currentVideo.averageScore > comparison.overallAverage ? 
            '✅ Above average performance!' : 
            '📈 Room for improvement'}
    `;
    
    alert(comparisonText);
}

// Download video
function downloadVideo(videoId) {
    const video = videos.find(v => v.id == videoId);
    if (!video) return;
    
    const link = document.createElement('a');
    link.href = video.data || video.url;
    link.download = video.name;
    link.click();
}

// Delete individual video (admin only)
function deleteVideo(videoId) {
    if (!isAdmin) {
        showNotification('Admin access required', 'error');
        return;
    }
    
    const video = videos.find(v => v.id == videoId);
    if (!video) {
        showNotification('Video not found', 'error');
        return;
    }
    
    if (confirm(`Are you sure you want to delete "${video.name}"?\n\nThis action cannot be undone.`)) {
        // Remove from main videos array
        const videoIndex = videos.findIndex(v => v.id == videoId);
        if (videoIndex !== -1) {
            videos.splice(videoIndex, 1);
        }
        
        // Remove from filtered videos array
        const filteredIndex = filteredVideos.findIndex(v => v.id == videoId);
        if (filteredIndex !== -1) {
            filteredVideos.splice(filteredIndex, 1);
        }
        
        // Save to localStorage and re-render
        saveVideos();
        renderVideos();
        updateStats();
        
        showNotification(`"${video.name}" deleted successfully`, 'success');
    }
}

// Calculate average score
function calculateAverageScore(metrics) {
    const scores = Object.values(metrics);
    return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

// Get score class for styling
function getScoreClass(score) {
    if (score >= 8) return 'excellent';
    if (score >= 6) return 'good';
    if (score >= 4) return 'average';
    return 'poor';
}

// Update statistics
function updateStats() {
    document.getElementById('total-videos').textContent = videos.length;
    
    const uniqueTools = [...new Set(videos.map(v => v.aiTool))];
    document.getElementById('ai-tools').textContent = uniqueTools.length;
    
    if (videos.length > 0) {
        const avgSuccessRate = videos.reduce((sum, v) => sum + v.performance.successRate, 0) / videos.length;
        document.getElementById('success-rate').textContent = Math.round(avgSuccessRate) + '%';
    }
}

// Save videos to localStorage
function saveVideos() {
    const videosToSave = videos.map(video => ({
        id: video.id,
        name: video.name,
        data: video.data, // Base64 data for persistence
        url: video.url, // Legacy support
        size: video.size,
        uploadDate: video.uploadDate,
        type: video.type,
        aiTool: video.aiTool,
        status: video.status,
        metrics: video.metrics,
        performance: video.performance
    }));
    
    localStorage.setItem('earnin-portfolio-videos', JSON.stringify(videosToSave));
}

// Load videos from localStorage
function loadVideos() {
    const savedVideos = localStorage.getItem('earnin-portfolio-videos');
    if (savedVideos) {
        try {
            const parsedVideos = JSON.parse(savedVideos);
            videos = parsedVideos.map(video => {
                // Handle both old blob URLs and new base64 data
                if (video.data) {
                    // New format with base64 data - this persists
                    return video;
                } else if (video.url && video.url.startsWith('blob:')) {
                    // Old format with blob URL - mark as needing re-upload
                    video.needsReupload = true;
                    video.url = null;
                    return video;
                } else {
                    // Legacy format
                    return video;
                }
            });
        } catch (error) {
            console.error('Error loading videos:', error);
            videos = [];
        }
    }
}

// Clear all videos (admin only)
function clearAllVideos() {
    if (!isAdmin) {
        showNotification('Admin access required', 'error');
        return;
    }
    
    if (videos.length === 0) {
        showNotification('No videos to clear', 'info');
        return;
    }
    
    const videoCount = videos.length;
    const confirmMessage = `Are you sure you want to clear all ${videoCount} video${videoCount > 1 ? 's' : ''}?\n\nThis action cannot be undone and will remove:\n• All uploaded videos\n• All analysis data\n• All performance metrics`;
    
    if (confirm(confirmMessage)) {
        // Clear arrays
        videos = [];
        filteredVideos = [];
        
        // Clear localStorage
        localStorage.removeItem('earnin-portfolio-videos');
        
        // Re-render and update
        renderVideos();
        updateStats();
        
        // Show success message
        showNotification(`Successfully cleared all ${videoCount} video${videoCount > 1 ? 's' : ''}`, 'success');
        
        // Close any open modals
        closeModal();
        closeAnalysisModal();
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key closes modals
    if (e.key === 'Escape') {
        closeModal();
        closeAdminModal();
        closeAnalysisModal();
    }
});
