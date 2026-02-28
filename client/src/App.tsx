import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage, VideoUploadPage, VideosPage, VideoDetailPage, ProtectedRoute } from './component';
import { useAuth } from './context/authContext';
import './App.css';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Default route - redirects based on auth state */}
        <Route 
          path="/" 
          element={<Navigate to={user ? "/upload" : "/auth"} replace />} 
        />
        
        {/* Authentication page route - redirects to upload if user is logged in */}
        <Route 
          path="/auth" 
          element={
            <ProtectedRoute requireAuth={false}>
              <AuthPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Video upload page route - requires authentication */}
        <Route 
          path="/upload" 
          element={
            <ProtectedRoute requireAuth={true}>
              <VideoUploadPage />
            </ProtectedRoute>
          } 
        />

        {/* Videos list page route - requires authentication */}
        <Route 
          path="/videos" 
          element={
            <ProtectedRoute requireAuth={true}>
              <VideosPage />
            </ProtectedRoute>
          } 
        />

        {/* Video detail page route - requires authentication */}
        <Route 
          path="/videos/:videoId" 
          element={
            <ProtectedRoute requireAuth={true}>
              <VideoDetailPage />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch-all route for 404 - redirects based on auth state */}
        <Route path="*" element={<Navigate to={user ? "/upload" : "/auth"} replace />} />
      </Routes>
    </Router>
  );
}

export default App;