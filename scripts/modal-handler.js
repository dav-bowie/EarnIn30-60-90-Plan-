// ===== MODAL HANDLING AND INTERACTIONS =====

// Modal state management
const ModalState = {
    activeModal: null,
    isAnimating: false
};

// Initialize modal handlers
document.addEventListener('DOMContentLoaded', function() {
    setupModalHandlers();
    setupKeyboardNavigation();
});

function setupModalHandlers() {
    // Close modal on overlay click
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-overlay')) {
            closeActiveModal();
        }
    });
    
    // Close modal on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && ModalState.activeModal) {
            closeActiveModal();
        }
    });
    
    // Prevent modal content clicks from closing modal
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });
}

function setupKeyboardNavigation() {
    // Tab navigation within modals
    document.addEventListener('keydown', function(e) {
        if (ModalState.activeModal && e.key === 'Tab') {
            handleModalTabNavigation(e);
        }
    });
}

function handleModalTabNavigation(e) {
    const modal = ModalState.activeModal;
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
        if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
        }
    } else {
        if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
        }
    }
}

function openModal(modalId) {
    if (ModalState.isAnimating) return;
    
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    ModalState.isAnimating = true;
    ModalState.activeModal = modal;
    
    // Show modal
    modal.classList.add('active');
    
    // Focus first focusable element
    setTimeout(() => {
        const firstFocusable = modal.querySelector(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (firstFocusable) {
            firstFocusable.focus();
        }
        
        ModalState.isAnimating = false;
    }, 100);
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    if (ModalState.isAnimating) return;
    
    const modal = document.getElementById(modalId || ModalState.activeModal?.id);
    if (!modal) return;
    
    ModalState.isAnimating = true;
    
    // Add closing animation
    modal.classList.add('closing');
    
    // Hide modal after animation
    setTimeout(() => {
        modal.classList.remove('active', 'closing');
        ModalState.activeModal = null;
        ModalState.isAnimating = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
    }, 300);
}

function closeActiveModal() {
    if (ModalState.activeModal) {
        closeModal(ModalState.activeModal.id);
    }
}

// Specific modal functions
function openVideoDetailModal() {
    openModal('video-detail-modal');
}

function closeVideoDetailModal() {
    closeModal('video-detail-modal');
    
    // Reset video player
    const videoElement = document.getElementById('detail-video');
    if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
    }
}

function openUploadModal() {
    openModal('upload-modal');
    
    // Reset form when opening
    resetUploadForm();
}

function closeUploadModal() {
    closeModal('upload-modal');
    
    // Reset form when closing
    resetUploadForm();
}

function openUrlModal() {
    openModal('url-modal');
}

function closeUrlModal() {
    closeModal('url-modal');
}

// Form handling functions
function resetUploadForm() {
    const form = document.getElementById('upload-modal');
    if (!form) return;
    
    // Reset all inputs
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        } else {
            input.value = '';
        }
    });
    
    // Reset upload area
    const uploadArea = document.getElementById('upload-area');
    if (uploadArea) {
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
        
        // Re-setup event listeners
        setupVideoUpload();
    }
    
    // Clear any error states
    clearFormErrors();
}

function clearFormErrors() {
    const form = document.getElementById('upload-modal');
    if (!form) return;
    
    // Remove error classes
    const errorElements = form.querySelectorAll('.input-error');
    errorElements.forEach(el => el.classList.remove('input-error'));
    
    // Remove error messages
    const errorMessages = form.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.remove());
}

function validateFormField(field) {
    const value = field.value.trim();
    const fieldName = field.name || field.id;
    
    // Remove existing error state
    field.classList.remove('input-error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Validate based on field type
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'video-title':
            if (!value) {
                isValid = false;
                errorMessage = 'Title is required';
            } else if (value.length < 3) {
                isValid = false;
                errorMessage = 'Title must be at least 3 characters';
            }
            break;
            
        case 'video-description':
            if (!value) {
                isValid = false;
                errorMessage = 'Description is required';
            } else if (value.length < 10) {
                isValid = false;
                errorMessage = 'Description must be at least 10 characters';
            }
            break;
            
        case 'video-duration':
            if (!value) {
                isValid = false;
                errorMessage = 'Duration is required';
            } else if (!/^\d+[sm]$/.test(value)) {
                isValid = false;
                errorMessage = 'Duration must be in format like "15s" or "2m"';
            }
            break;
            
        case 'json-prompt':
            if (!value) {
                isValid = false;
                errorMessage = 'JSON prompt is required';
            } else {
                try {
                    JSON.parse(value);
                } catch (error) {
                    isValid = false;
                    errorMessage = 'Invalid JSON format';
                }
            }
            break;
    }
    
    if (!isValid) {
        field.classList.add('input-error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
}

function setupFormValidation() {
    const form = document.getElementById('upload-modal');
    if (!form) return;
    
    // Real-time validation
    const fields = form.querySelectorAll('input, textarea');
    fields.forEach(field => {
        field.addEventListener('blur', () => validateFormField(field));
        field.addEventListener('input', () => {
            // Clear error on input
            if (field.classList.contains('input-error')) {
                validateFormField(field);
            }
        });
    });
}

// Modal animation helpers
function addModalAnimation(modalId, animationType = 'slideIn') {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    const animationClass = `modal-${animationType}`;
    modal.classList.add(animationClass);
    
    // Remove animation class after animation completes
    modal.addEventListener('animationend', () => {
        modal.classList.remove(animationClass);
    }, { once: true });
}

// Modal content updates
function updateModalContent(modalId, content) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    const contentContainer = modal.querySelector('.modal-content');
    if (contentContainer) {
        contentContainer.innerHTML = content;
        
        // Re-setup any event listeners that might have been lost
        setupModalEventListeners(modal);
    }
}

function setupModalEventListeners(modal) {
    if (!modal) return;
    
    // Setup form validation if it's the upload modal
    if (modal.id === 'upload-modal') {
        setupFormValidation();
    }
    
    // Setup any other modal-specific event listeners
    const buttons = modal.querySelectorAll('button[data-action]');
    buttons.forEach(button => {
        const action = button.dataset.action;
        button.addEventListener('click', () => {
            if (typeof window[action] === 'function') {
                window[action]();
            }
        });
    });
}

// Modal positioning
function centerModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    const modalContent = modal.querySelector('.modal');
    if (!modalContent) return;
    
    // Center the modal content
    modalContent.style.position = 'fixed';
    modalContent.style.top = '50%';
    modalContent.style.left = '50%';
    modalContent.style.transform = 'translate(-50%, -50%)';
}

// Responsive modal handling
function handleResponsiveModals() {
    const modals = document.querySelectorAll('.modal-overlay.active .modal');
    
    modals.forEach(modal => {
        const viewportWidth = window.innerWidth;
        
        if (viewportWidth < 768) {
            modal.style.maxWidth = '95vw';
            modal.style.margin = '1rem';
        } else {
            modal.style.maxWidth = '';
            modal.style.margin = '';
        }
    });
}

// Initialize responsive handling
window.addEventListener('resize', handleResponsiveModals);

// Export functions for global access
window.openModal = openModal;
window.closeModal = closeModal;
window.closeActiveModal = closeActiveModal;
window.openVideoDetailModal = openVideoDetailModal;
window.closeVideoDetailModal = closeVideoDetailModal;
window.openUploadModal = openUploadModal;
window.closeUploadModal = closeUploadModal;
window.openUrlModal = openUrlModal;
window.closeUrlModal = closeUrlModal;
window.validateFormField = validateFormField;
