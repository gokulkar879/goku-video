import React, { useState } from 'react';
import { signIn, signUp, confirmSignUp } from "aws-amplify/auth";
import './AuthPage.css';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [step, setStep] = useState('signup');
  const [otp, setOtp] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement login authentication logic
    console.log('Login clicked:', { username, password });

    await signIn({ username, password });
    
    // Add your login logic here
    // Example: API call to authenticate user
    // fetch('/api/login', { method: 'POST', body: JSON.stringify({ username, password }) })
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement signup authentication logic
    console.log('Signup clicked:', { username, email, password });
    await signUp({
      username: username,
      password,
      options: { userAttributes: { email } }
    });
    setStep('confirm');
    
    // Add your signup logic here
    // Example: API call to register new user
    // fetch('/api/signup', { method: 'POST', body: JSON.stringify({ username, email, password }) })
  };

  async function handleConfirmUserSignup() {
    await confirmSignUp({ username: username, confirmationCode: otp });
    alert('Account verified! You can login now.');
  }

  const handleSubmit = (e: React.FormEvent) => {
    if (isLogin) {
      handleLogin(e);
    } else {
      handleSignup(e);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          {!isLogin && step === 'confirm' && (
            <div className="form-group">
              <label htmlFor="otp">Confirmation Code</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter confirmation code"
                required
              />
            </div>
          )}
          
          {(isLogin || step !== 'confirm') && (
            <button 
              type="submit" 
              className="auth-button"
            >
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          )}
          
          {!isLogin && step === 'confirm' && (
            <button 
              type="button" 
              onClick={handleConfirmUserSignup} 
              className="auth-button confirm-button"
            >
              Confirm
            </button>
          )}
        </form>
        
        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="toggle-button"
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;