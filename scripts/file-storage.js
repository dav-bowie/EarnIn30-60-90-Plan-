// ===== FILE STORAGE SYSTEM FOR VIDEO UPLOADS =====

// Simple in-memory file storage (for demo purposes)
const FileStorage = {
    files: new Map(),
    fileId: 0
};

// Generate unique file ID
function generateFileId() {
    return `file_${Date.now()}_${++FileStorage.fileId}`;
}

// Store file in memory
function storeFile(file) {
    const fileId = generateFileId();
    const fileData = {
        id: fileId,
        name: file.name,
        type: file.type,
        size: file.size,
        data: file,
        url: URL.createObjectURL(file),
        uploadDate: new Date().toISOString()
    };
    
    FileStorage.files.set(fileId, fileData);
    return fileId;
}

// Retrieve file by ID
function getFile(fileId) {
    return FileStorage.files.get(fileId);
}

// Get file URL by ID
function getFileUrl(fileId) {
    const file = FileStorage.files.get(fileId);
    return file ? file.url : null;
}

// Remove file from storage
function removeFile(fileId) {
    const file = FileStorage.files.get(fileId);
    if (file && file.url) {
        URL.revokeObjectURL(file.url);
    }
    return FileStorage.files.delete(fileId);
}

// Get all stored files
function getAllFiles() {
    return Array.from(FileStorage.files.values());
}

// Export functions
window.FileStorage = {
    storeFile,
    getFile,
    getFileUrl,
    removeFile,
    getAllFiles
};
