import React, { useState, useRef } from 'react';
import './VideoUploadPage.css';

const VideoUploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      alert('Please select a valid video file');
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      alert('Please drop a valid video file');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('Please select a video file');
      return;
    }

    setIsUploading(true);
    
    // TODO: Implement video upload logic
    console.log('Uploading video:', {
      file: selectedFile,
      title,
      description,
    });
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
      alert('Video uploaded successfully!');
      // Reset form
      setSelectedFile(null);
      setTitle('');
      setDescription('');
      setPreviewUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 2000);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h1>Upload Video</h1>
        
        <form onSubmit={handleSubmit}>
          <div
            className={`file-drop-zone ${selectedFile ? 'has-file' : ''}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleBrowseClick}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="video/*"
              style={{ display: 'none' }}
            />
            
            {!selectedFile ? (
              <div className="drop-zone-content">
                <div className="upload-icon">📹</div>
                <p className="drop-text">Drag and drop your video here</p>
                <p className="or-text">or</p>
                <button type="button" className="browse-button">
                  Browse Files
                </button>
              </div>
            ) : (
              <div className="file-preview">
                {previewUrl && (
                  <video
                    src={previewUrl}
                    controls
                    className="video-preview"
                  />
                )}
                <p className="file-name">{selectedFile.name}</p>
                <p className="file-size">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="title">Video Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter video title"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter video description"
              rows={4}
            />
          </div>
          
          <button
            type="submit"
            className="upload-button"
            disabled={isUploading || !selectedFile}
          >
            {isUploading ? 'Uploading...' : 'Upload Video'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VideoUploadPage;