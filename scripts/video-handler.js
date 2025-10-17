// ===== VIDEO HANDLING AND UPLOAD FUNCTIONALITY =====

// Video upload configuration
const UploadConfig = {
    maxFileSize: 100 * 1024 * 1024, // 100MB
    allowedTypes: ['video/mp4', 'video/webm', 'video/ogg', 'video/quicktime'],
    allowedExtensions: ['.mp4', '.webm', '.ogg', '.mov', '.avi', '.mkv']
};

// Flag to prevent multiple event listener attachments
let uploadAreaClickListenerAttached = false;

// Initialize video handlers
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded fired in video-handler.js');
    setupVideoUpload();
    setupDragAndDrop();
    setupVideoPreview();
});

function setupVideoUpload() {
    console.log('setupVideoUpload called');
    const fileInput = document.getElementById('video-file-input');
    const uploadArea = document.getElementById('upload-area');
    
    if (fileInput) {
        // Remove existing listener to prevent duplicates
        fileInput.removeEventListener('change', handleFileSelect);
        fileInput.addEventListener('change', handleFileSelect);
        console.log('File input change listener added.');
    }
    
    if (uploadArea && !uploadAreaClickListenerAttached) {
        uploadArea.addEventListener('click', () => {
            console.log('Upload area clicked, triggering file input.');
            const fileInput = document.getElementById('video-file-input');
            if (fileInput) {
                fileInput.click();
            }
        });
        uploadAreaClickListenerAttached = true;
        console.log('Upload area click listener added.');
    }
}

function setupDragAndDrop() {
    const uploadArea = document.getElementById('upload-area');
    
    if (!uploadArea) return;
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, preventDefaults, false);
    });
    
    ['dragenter', 'dragover'].forEach(eventName => {
        uploadArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        uploadArea.addEventListener(eventName, unhighlight, false);
    });
    
    uploadArea.addEventListener('drop', handleDrop, false);
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    e.currentTarget.classList.add('dragover');
}

function unhighlight(e) {
    e.currentTarget.classList.remove('dragover');
}

function handleDrop(e) {
    const dt = e.dataTransfer;
    const files = dt.files;
    
    if (files.length > 0) {
        handleFileSelect({ target: { files: files } });
    }
}

function handleFileSelect(event) {
    const files = event.target.files;
    
    if (files.length === 0) return;
    
    const file = files[0];
    
    // Validate file
    const validation = validateVideoFile(file);
    if (!validation.isValid) {
        showToast(validation.message, 'error');
        return;
    }
    
    // Create preview
    createVideoPreview(file);
}

function validateVideoFile(file) {
    // Check file size
    if (file.size > UploadConfig.maxFileSize) {
        return {
            isValid: false,
            message: `File size must be less than ${UploadConfig.maxFileSize / (1024 * 1024)}MB`
        };
    }
    
    // Check file type
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    if (!UploadConfig.allowedExtensions.includes(fileExtension)) {
        return {
            isValid: false,
            message: `File type not supported. Allowed: ${UploadConfig.allowedExtensions.join(', ')}`
        };
    }
    
    return { isValid: true };
}

function createVideoPreview(file) {
    const video = document.createElement('video');
    const url = URL.createObjectURL(file);
    
    video.src = url;
    video.controls = true;
    video.style.width = '100%';
    video.style.maxHeight = '300px';
    
    // Replace upload area with preview
    const uploadArea = document.getElementById('upload-area');
    uploadArea.innerHTML = '';
    uploadArea.appendChild(video);
    
    // Add file info
    const fileInfo = document.createElement('div');
    fileInfo.innerHTML = `
        <div style="margin-top: 1rem; padding: 1rem; background: #f8fafc; border-radius: 0.5rem;">
            <p><strong>File:</strong> ${file.name}</p>
            <p><strong>Size:</strong> ${formatFileSize(file.size)}</p>
            <p><strong>Type:</strong> ${file.type}</p>
            <button onclick="removeVideoPreview()" style="margin-top: 0.5rem; padding: 0.5rem 1rem; background: #ef4444; color: white; border: none; border-radius: 0.25rem; cursor: pointer;">Remove</button>
        </div>
    `;
    uploadArea.appendChild(fileInfo);
    
    // Store file for upload
    uploadArea.dataset.fileName = file.name;
    uploadArea.dataset.fileSize = file.size;
    uploadArea.dataset.fileType = file.type;
}

function removeVideoPreview() {
    const uploadArea = document.getElementById('upload-area');
    uploadArea.innerHTML = `
        <div class="upload-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="10,9 9,9 8,9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </div>
        <p>Drag & drop your video here, or <span class="upload-link">browse files</span></p>
        <input type="file" id="video-file-input" accept="video/*" style="display: none;">
    `;
    
    // Reset event listeners
    setupVideoUpload();
    
    // Clear stored file data
    delete uploadArea.dataset.fileName;
    delete uploadArea.dataset.fileSize;
    delete uploadArea.dataset.fileType;
}

function setupVideoPreview() {
    // Handle video thumbnail generation
    document.addEventListener('click', function(e) {
        if (e.target.closest('.video-card')) {
            const card = e.target.closest('.video-card');
            const videoId = card.dataset.id;
            
            // Add hover effect
            card.classList.add('hovered');
            setTimeout(() => card.classList.remove('hovered'), 200);
        }
    });
}

function openUploadModal() {
    const modal = document.getElementById('upload-modal');
    if (modal) {
        modal.classList.add('active');
        
        // Reset form
        resetUploadForm();
    }
}

function closeUploadModal() {
    const modal = document.getElementById('upload-modal');
    if (modal) {
        modal.classList.remove('active');
        
        // Reset form
        resetUploadForm();
    }
}

function resetUploadForm() {
    // Reset all form fields
    document.getElementById('video-title').value = '';
    document.getElementById('video-description').value = '';
    document.getElementById('video-duration').value = '';
    document.getElementById('video-ratio').value = '9:16';
    document.getElementById('video-platform').value = 'TikTok';
    document.getElementById('video-theme').value = 'Empowerment';
    document.getElementById('json-prompt').value = '';
    
    // Reset upload area
    removeVideoPreview();
}

async function uploadVideo() {
    console.log('uploadVideo function called');
    
    if (AppState.isUploading) {
        console.log('Already uploading, skipping');
        return;
    }
    
    try {
        // Get form data
        console.log('Getting form data...');
        const formData = getFormData();
        console.log('Form data:', formData);
        
        // Validate form
        console.log('Validating form...');
        const validation = validateForm(formData);
        if (!validation.isValid) {
            console.log('Form validation failed:', validation.message);
            showToast(validation.message, 'error');
            return;
        }
        
        AppState.isUploading = true;
        updateUploadButton(true);
        
        // Create new video object
        console.log('Creating video object...');
        const newVideo = createVideoObject(formData);
        console.log('Created video object:', newVideo);
        
        // Simulate upload process (in real app, this would upload to server)
        console.log('Simulating upload...');
        await simulateUpload(newVideo);
        
        // Add to videos array
        console.log('Adding video to AppState...');
        AppState.videos.push(newVideo);
        console.log('Video added. Total videos:', AppState.videos.length);
        
        // Save to localStorage
        console.log('Saving to localStorage...');
        saveVideos();
        
        // Refresh display
        console.log('Refreshing display...');
        applyFilters();
        console.log('Filtered videos after upload:', AppState.filteredVideos.length);
        renderVideoGrid();
        
        // Close modal and show success
        console.log('Closing modal and showing success...');
        closeUploadModal();
        showToast('Video uploaded successfully!', 'success');
        
        // Force a re-render after a short delay to ensure everything is updated
        setTimeout(() => {
            console.log('Force re-rendering grid...');
            renderVideoGrid();
        }, 100);
        
    } catch (error) {
        console.error('Upload error:', error);
        console.error('Error stack:', error.stack);
        showToast('Upload failed: ' + error.message, 'error');
    } finally {
        AppState.isUploading = false;
        updateUploadButton(false);
        console.log('Upload process completed');
    }
}

function getFormData() {
    return {
        title: document.getElementById('video-title').value.trim(),
        description: document.getElementById('video-description').value.trim(),
        duration: document.getElementById('video-duration').value.trim(),
        ratio: document.getElementById('video-ratio').value,
        platform: document.getElementById('video-platform').value,
        theme: document.getElementById('video-theme').value,
        jsonPrompt: document.getElementById('json-prompt').value.trim()
    };
}

function validateForm(data) {
    if (!data.title) {
        return { isValid: false, message: 'Title is required' };
    }
    
    if (!data.description) {
        return { isValid: false, message: 'Description is required' };
    }
    
    if (!data.duration) {
        return { isValid: false, message: 'Duration is required' };
    }
    
    if (!data.jsonPrompt) {
        return { isValid: false, message: 'JSON prompt is required' };
    }
    
    // Validate JSON format
    try {
        JSON.parse(data.jsonPrompt);
    } catch (error) {
        return { isValid: false, message: 'Invalid JSON format in prompt' };
    }
    
    return { isValid: true };
}

function createVideoObject(formData) {
    console.log('Creating video object with form data:', formData);
    
    // Get the uploaded file info
    const uploadArea = document.getElementById('upload-area');
    let videoFile = null;
    let videoUrl = "";
    
    // If a file was uploaded, get the file
    if (uploadArea.dataset.fileName) {
        const fileInput = document.getElementById('video-file-input');
        if (fileInput && fileInput.files && fileInput.files[0]) {
            videoFile = fileInput.files[0];
            videoUrl = URL.createObjectURL(videoFile);
            console.log('Video file found:', videoFile.name, videoFile.size);
        }
    }
    
    const videoObject = {
        id: `video-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        theme: formData.theme,
        style: "Live Action", // Default for now
        ratio: formData.ratio,
        platform: formData.platform,
        duration: formData.duration,
        cta: "Available to Cash Out", // Default
        goal: "Campaign objective and target outcome",
        aiTools: ["Sora", "ChatGPT", "Canva"], // Default tools
        jsonPrompt: formData.jsonPrompt,
        videoUrl: videoUrl,
        uploadDate: new Date().toISOString(),
        fileName: uploadArea.dataset.fileName || "",
        fileSize: uploadArea.dataset.fileSize || 0,
        hasVideoFile: !!videoFile
    };
    
    console.log('Created video object:', videoObject);
    return videoObject;
}

async function simulateUpload(video) {
    // Simulate upload progress
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(video);
        }, 2000);
    });
}

function updateUploadButton(isUploading) {
    const button = document.querySelector('#upload-modal .btn-primary');
    if (button) {
        if (isUploading) {
            button.textContent = 'Uploading...';
            button.disabled = true;
            button.classList.add('loading');
        } else {
            button.textContent = 'Upload Video';
            button.disabled = false;
            button.classList.remove('loading');
        }
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Video URL handling for existing videos
async function saveVideoUrl() {
    const url = document.getElementById('video-url-input').value.trim();
    if (!AppState.currentEditingId) return;

    if (!url) {
        showToast('Please enter a valid video URL', 'error');
        return;
    }

    // Validate URL
    try {
        new URL(url);
    } catch (error) {
        showToast('Please enter a valid URL', 'error');
        return;
    }

    const video = AppState.videos.find(v => v.id === AppState.currentEditingId);
    if (!video) {
        showToast('Video not found', 'error');
        return;
    }

    // Show loading state
    const saveBtn = document.getElementById('save-url');
    const originalText = saveBtn.textContent;
    saveBtn.textContent = 'Saving...';
    saveBtn.disabled = true;

    try {
        // Update video URL
        video.videoUrl = url;
        
        // Save to localStorage
        saveVideos();
        
        // Refresh display
        applyFilters();
        renderVideoGrid();
        
        // Close modal
        document.getElementById('url-modal').classList.remove('active');
        AppState.currentEditingId = null;
        
        showToast('Video URL saved successfully!', 'success');
        
    } catch (error) {
        showToast('Failed to save video URL', 'error');
    } finally {
        saveBtn.textContent = originalText;
        saveBtn.disabled = false;
    }
}

function cancelVideoUrl() {
    document.getElementById('url-modal').classList.remove('active');
    AppState.currentEditingId = null;
}

// Export functions for global access
window.openUploadModal = openUploadModal;
window.closeUploadModal = closeUploadModal;
window.uploadVideo = uploadVideo;
window.removeVideoPreview = removeVideoPreview;
window.saveVideoUrl = saveVideoUrl;
window.cancelVideoUrl = cancelVideoUrl;
