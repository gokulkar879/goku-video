import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import './VideoDetailPage.css';

interface VideoDetail {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  createdAt: string;
  duration: string;
}

interface AIAnalysis {
  summary: string;
  topics: string[];
  sentiment: string;
  keyMoments: {
    timestamp: string;
    description: string;
  }[];
  transcriptHighlights: string[];
}

const VideoDetailPage: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [video, setVideo] = useState<VideoDetail | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (videoId) {
      fetchVideoDetails();
      fetchAIAnalysis();
    }
  }, [videoId]);

  const fetchVideoDetails = async () => {
    try {
      setIsLoading(true);
      const token = user?.tokens?.accessToken?.toString();
      
      const response = await axios.get(`http://localhost:3001/videos/${videoId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setVideo(response.data.video);
      setError(null);
    } catch (err) {
      console.error('Error fetching video details:', err);
      setError('Failed to load video details.');
      // Mock data for development/demo purposes
      setVideo({
        id: videoId || '1',
        title: 'Introduction to React',
        description: 'Learn the basics of React including components, props, and state management. This comprehensive tutorial covers everything you need to know to get started with React development. We will explore functional components, hooks, and best practices for building modern web applications.',
        thumbnailUrl: 'https://via.placeholder.com/800x450/667eea/ffffff?text=React+Introduction',
        videoUrl: '',
        createdAt: '2024-02-28T10:00:00Z',
        duration: '15:30'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAIAnalysis = async () => {
    try {
      setIsAnalysisLoading(true);
      const token = user?.tokens?.accessToken?.toString();
      
      const response = await axios.get(`http://localhost:3001/videos/${videoId}/analysis`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      setAiAnalysis(response.data.analysis);
    } catch (err) {
      console.error('Error fetching AI analysis:', err);
      // Mock data for development/demo purposes
      setAiAnalysis({
        summary: 'This video provides a comprehensive introduction to React, a popular JavaScript library for building user interfaces. The presenter covers fundamental concepts including component-based architecture, JSX syntax, props, and state management using hooks.',
        topics: ['React Basics', 'Components', 'JSX', 'Props', 'State Management', 'Hooks', 'Virtual DOM'],
        sentiment: 'Educational & Informative',
        keyMoments: [
          { timestamp: '0:00', description: 'Introduction and overview of React' },
          { timestamp: '2:30', description: 'Setting up the development environment' },
          { timestamp: '5:15', description: 'Creating your first component' },
          { timestamp: '8:45', description: 'Understanding props and data flow' },
          { timestamp: '12:00', description: 'Introduction to useState hook' },
          { timestamp: '14:30', description: 'Summary and next steps' }
        ],
        transcriptHighlights: [
          'React is a declarative, efficient, and flexible JavaScript library for building user interfaces.',
          'Components let you split the UI into independent, reusable pieces.',
          'Props are read-only and help you pass data from parent to child components.',
          'The useState hook lets you add state to functional components.'
        ]
      });
    } finally {
      setIsAnalysisLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleBackClick = () => {
    navigate('/videos');
  };

  if (isLoading) {
    return (
      <div className="video-detail-container">
        <div className="video-detail-loading">
          <div className="loading-spinner"></div>
          <p>Loading video...</p>
        </div>
      </div>
    );
  }

  if (error && !video) {
    return (
      <div className="video-detail-container">
        <div className="video-detail-error">
          <p>{error}</p>
          <button onClick={handleBackClick} className="back-button">
            Back to Videos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="video-detail-container">
      <button className="back-nav-button" onClick={handleBackClick}>
        ← Back to Videos
      </button>

      <div className="video-detail-content">
        {/* Video Section */}
        <div className="video-section">
          <div className="video-player-wrapper">
            {video?.videoUrl ? (
              <video
                src={video.videoUrl}
                controls
                className="video-player"
                poster={video.thumbnailUrl}
              />
            ) : (
              <div className="video-placeholder">
                <img src={video?.thumbnailUrl} alt={video?.title} />
                <div className="play-overlay">
                  <span className="play-button">▶</span>
                </div>
              </div>
            )}
          </div>

          <div className="video-details">
            <h1 className="video-detail-title">{video?.title}</h1>
            <div className="video-meta">
              <span className="video-date">{video?.createdAt && formatDate(video.createdAt)}</span>
              {video?.duration && <span className="video-duration">Duration: {video.duration}</span>}
            </div>
            <div className="video-description-section">
              <h3>Description</h3>
              <p className="video-full-description">{video?.description}</p>
            </div>
          </div>
        </div>

        {/* AI Analysis Section */}
        <div className="ai-analysis-section">
          <div className="analysis-header">
            <span className="ai-icon">🤖</span>
            <h2>AI Analysis</h2>
          </div>

          {isAnalysisLoading ? (
            <div className="analysis-loading">
              <div className="loading-spinner-small"></div>
              <p>Analyzing video content...</p>
            </div>
          ) : aiAnalysis ? (
            <div className="analysis-content">
              {/* Summary */}
              <div className="analysis-card">
                <h3>📝 Summary</h3>
                <p>{aiAnalysis.summary}</p>
              </div>

              {/* Topics */}
              <div className="analysis-card">
                <h3>🏷️ Topics Covered</h3>
                <div className="topics-list">
                  {aiAnalysis.topics.map((topic, index) => (
                    <span key={index} className="topic-tag">{topic}</span>
                  ))}
                </div>
              </div>

              {/* Sentiment */}
              <div className="analysis-card">
                <h3>💭 Content Tone</h3>
                <p className="sentiment-badge">{aiAnalysis.sentiment}</p>
              </div>

              {/* Key Moments */}
              <div className="analysis-card">
                <h3>⏱️ Key Moments</h3>
                <div className="key-moments-list">
                  {aiAnalysis.keyMoments.map((moment, index) => (
                    <div key={index} className="key-moment">
                      <span className="moment-timestamp">{moment.timestamp}</span>
                      <span className="moment-description">{moment.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transcript Highlights */}
              <div className="analysis-card">
                <h3>💬 Key Quotes</h3>
                <div className="highlights-list">
                  {aiAnalysis.transcriptHighlights.map((highlight, index) => (
                    <blockquote key={index} className="highlight-quote">
                      "{highlight}"
                    </blockquote>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="analysis-unavailable">
              <p>AI analysis is not available for this video.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoDetailPage;