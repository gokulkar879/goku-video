import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import './VideosPage.css';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  createdAt: string;
}

const VideosPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
    //   setIsLoading(true);
    //   throw new Error("test");
    //   const token = user?.tokens?.accessToken?.toString();
      
    //   const response = await axios.get('http://localhost:3001/userVideos', {
    //     headers: {
    //       'Authorization': `Bearer ${token}`
    //     }
    //   });
      
    //   setVideos(response.data.videos || []);
    //   setError(null);
    setVideos([
        {
          id: '1',
          title: 'Introduction to React',
          description: 'Learn the basics of React including components, props, and state management.',
          thumbnailUrl: 'https://via.placeholder.com/320x180/667eea/ffffff?text=React+Intro',
          createdAt: '2024-02-28T10:00:00Z'
        },
        {
          id: '2',
          title: 'Advanced TypeScript Patterns',
          description: 'Deep dive into TypeScript generics, utility types, and advanced patterns.',
          thumbnailUrl: 'https://via.placeholder.com/320x180/764ba2/ffffff?text=TypeScript',
          createdAt: '2024-02-27T15:30:00Z'
        },
        {
          id: '3',
          title: 'Building REST APIs with Node.js',
          description: 'Complete guide to building scalable REST APIs using Express and Node.js.',
          thumbnailUrl: 'https://via.placeholder.com/320x180/667eea/ffffff?text=Node.js+API',
          createdAt: '2024-02-26T09:15:00Z'
        },
        {
          id: '4',
          title: 'AWS S3 File Upload Tutorial',
          description: 'Learn how to upload files to AWS S3 with presigned URLs and best practices.',
          thumbnailUrl: 'https://via.placeholder.com/320x180/764ba2/ffffff?text=AWS+S3',
          createdAt: '2024-02-25T14:00:00Z'
        }
      ]);
      console.log(videos);
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError('Failed to load videos. Please try again.');
      // Mock data for development/demo purposes
      setVideos([
        {
          id: '1',
          title: 'Introduction to React',
          description: 'Learn the basics of React including components, props, and state management.',
          thumbnailUrl: 'https://via.placeholder.com/320x180/667eea/ffffff?text=React+Intro',
          createdAt: '2024-02-28T10:00:00Z'
        },
        {
          id: '2',
          title: 'Advanced TypeScript Patterns',
          description: 'Deep dive into TypeScript generics, utility types, and advanced patterns.',
          thumbnailUrl: 'https://via.placeholder.com/320x180/764ba2/ffffff?text=TypeScript',
          createdAt: '2024-02-27T15:30:00Z'
        },
        {
          id: '3',
          title: 'Building REST APIs with Node.js',
          description: 'Complete guide to building scalable REST APIs using Express and Node.js.',
          thumbnailUrl: 'https://via.placeholder.com/320x180/667eea/ffffff?text=Node.js+API',
          createdAt: '2024-02-26T09:15:00Z'
        },
        {
          id: '4',
          title: 'AWS S3 File Upload Tutorial',
          description: 'Learn how to upload files to AWS S3 with presigned URLs and best practices.',
          thumbnailUrl: 'https://via.placeholder.com/320x180/764ba2/ffffff?text=AWS+S3',
          createdAt: '2024-02-25T14:00:00Z'
        }
      ]);
      console.log(videos, "ppp");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVideoClick = (videoId: string) => {
    navigate(`/videos/${videoId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const truncateDescription = (description: string, maxLength: number = 100) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength).trim() + '...';
  };

  if (isLoading) {
    return (
      <div className="videos-container">
        <div className="videos-loading">
          <div className="loading-spinner"></div>
          <p>Loading your videos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="videos-container">
      <div className="videos-header">
        <h1>My Videos</h1>
        <p className="videos-subtitle">Browse and manage your uploaded videos</p>
      </div>

      {error && (
        <div className="videos-error">
          <p>{error}</p>
          <button onClick={fetchVideos} className="retry-button">
            Try Again
          </button>
        </div>
      )}

      {videos.length === 0 && !error ? (
        <div className="videos-empty">
          <div className="empty-icon">🎬</div>
          <h2>No videos yet</h2>
          <p>Start by uploading your first video</p>
          <button onClick={() => navigate('/upload')} className="upload-cta-button">
            Upload Video
          </button>
        </div>
      ) : (
        <div className="videos-grid">
          {videos.map((video) => (
            <div
              key={video.id}
              className="video-card"
              onClick={() => handleVideoClick(video.id)}
            >
              <div className="video-thumbnail">
                <img src={video.thumbnailUrl} alt={video.title} />
                <div className="video-overlay">
                  <span className="play-icon">▶</span>
                </div>
              </div>
              <div className="video-info">
                <h3 className="video-title">{video.title}</h3>
                <p className="video-description">
                  {truncateDescription(video.description)}
                </p>
                <span className="video-date">{formatDate(video.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideosPage;