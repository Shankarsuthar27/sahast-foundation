import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function AdminLogin({ onLoginSuccess, onCancel }) {
  const { login } = useAdminAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showLostPasswordNotice, setShowLostPasswordNotice] = useState(false);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = 'Log In ‹ Shree Abhay Das Ji Maharaj';
    return () => {
      document.title = originalTitle;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShowLostPasswordNotice(false);
    setLoading(true);

    try {
      const user = await login(username, password);
      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
    } catch (err) {
      setError(
        err.message || 'The username or password you entered is incorrect. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLostPasswordClick = (e) => {
    e.preventDefault();
    setShowLostPasswordNotice((prev) => !prev);
  };

  const handleBackToSite = (e) => {
    e.preventDefault();
    if (onCancel) {
      onCancel();
    } else {
      window.location.hash = '';
      window.location.pathname = '/';
    }
  };

  return (
    <div className="wp-login-wrapper">
      <style>{`
        .wp-login-wrapper {
          min-height: 100vh;
          width: 100%;
          background-color: #f0f0f1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 24px 16px;
          margin: 0;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
          color: #3c434a;
          line-height: 1.5;
        }

        .wp-login-container {
          width: 100%;
          max-width: 320px;
          margin: 0 auto;
          box-sizing: border-box;
        }

        .wp-login-notice {
          background: #ffffff;
          box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
          padding: 12px 14px;
          margin-bottom: 20px;
          font-size: 13px;
          line-height: 1.5;
          color: #3c434a;
          box-sizing: border-box;
        }

        .wp-login-error {
          border-left: 4px solid #d63638;
        }

        .wp-login-info {
          border-left: 4px solid #72aee6;
        }

        .wp-login-form-card {
          background: #ffffff;
          border: 1px solid #c3c4c7;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
          padding: 26px 24px 34px;
          box-sizing: border-box;
        }

        .wp-form-group {
          margin-bottom: 16px;
        }

        .wp-form-group.last {
          margin-bottom: 0;
        }

        .wp-label {
          display: block;
          font-size: 14px;
          line-height: 1.5;
          margin-bottom: 3px;
          color: #3c434a;
          font-weight: 400;
        }

        .wp-input-text {
          font-size: 24px;
          line-height: 1.33333333;
          width: 100%;
          border: 1px solid #8c8f94;
          padding: 3px 10px;
          min-height: 40px;
          height: 40px;
          border-radius: 4px;
          color: #2c3338;
          background-color: #ffffff;
          box-sizing: border-box;
          outline: none;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }

        .wp-input-text:focus {
          border-color: #2271b1 !important;
          box-shadow: 0 0 0 1px #2271b1 !important;
          outline: 2px solid transparent !important;
        }

        .wp-password-container {
          position: relative;
          width: 100%;
        }

        .wp-password-container .wp-input-text {
          padding-right: 38px;
        }

        .wp-password-toggle {
          position: absolute;
          right: 7px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2271b1;
          border-radius: 2px;
          line-height: 1;
        }

        .wp-password-toggle:hover {
          color: #135e96;
        }

        .wp-password-toggle:focus {
          outline: 1px dotted #2271b1;
        }

        .wp-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 20px;
        }

        .wp-remember-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          user-select: none;
          margin: 0;
        }

        .wp-checkbox {
          width: 16px;
          height: 16px;
          margin: 0;
          border: 1px solid #8c8f94;
          border-radius: 2px;
          accent-color: #2271b1;
          cursor: pointer;
          vertical-align: middle;
        }

        .wp-remember-text {
          font-size: 12px;
          color: #50575e;
          line-height: 1;
        }

        .wp-submit-btn {
          background: #2271b1;
          border: 1px solid #2271b1;
          color: #ffffff;
          font-size: 13px;
          font-weight: 500;
          min-height: 32px;
          height: 32px;
          line-height: 30px;
          padding: 0 14px;
          border-radius: 3px;
          cursor: pointer;
          transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out;
          box-shadow: 0 1px 0 #2271b1;
        }

        .wp-submit-btn:hover {
          background: #135e96;
          border-color: #135e96;
          color: #ffffff;
        }

        .wp-submit-btn:active {
          background: #135e96;
          transform: translateY(1px);
        }

        .wp-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .wp-sublinks-wrapper {
          width: 100%;
          max-width: 320px;
          margin-top: 24px;
          text-align: left;
          box-sizing: border-box;
        }

        .wp-sublinks-wrapper p {
          margin: 0 0 10px 0;
          font-size: 13px;
          line-height: 1.5;
        }

        .wp-sublinks-wrapper p:last-child {
          margin-bottom: 0;
        }

        .wp-link {
          color: #2271b1;
          font-size: 13px;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.1s ease;
        }

        .wp-link:hover {
          text-decoration: underline;
          color: #135e96;
        }
      `}</style>

      <div className="wp-login-container">
        {/* Error Notice */}
        {error && (
          <div className="wp-login-notice wp-login-error" role="alert">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Lost Password Notice */}
        {showLostPasswordNotice && (
          <div className="wp-login-notice wp-login-info" role="status">
            <div style={{ fontWeight: 600, marginBottom: '4px' }}>
              Master Administrator Credentials
            </div>
            <div>
              Username: <strong style={{ color: '#2c3338' }}>admin2233</strong>
            </div>
            <div>
              Password: <strong style={{ color: '#2c3338' }}>admin@2233</strong>
            </div>
            <div style={{ marginTop: '8px' }}>
              <button
                type="button"
                onClick={() => {
                  setUsername('admin2233');
                  setPassword('admin@2233');
                  setShowLostPasswordNotice(false);
                  setError('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  fontSize: '12px',
                  color: '#2271b1',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
              >
                Auto-fill credentials
              </button>
            </div>
          </div>
        )}

        {/* Login Form Box */}
        <div className="wp-login-form-card">
          <form onSubmit={handleSubmit} noValidate>
            {/* Username or Email Address */}
            <div className="wp-form-group">
              <label htmlFor="user_login" className="wp-label">
                Username or Email Address
              </label>
              <input
                id="user_login"
                name="log"
                type="text"
                className="wp-input-text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoCapitalize="none"
                autoComplete="username"
                spellCheck="false"
                autoFocus
                required
              />
            </div>

            {/* Password */}
            <div className="wp-form-group last">
              <label htmlFor="user_pass" className="wp-label">
                Password
              </label>
              <div className="wp-password-container">
                <input
                  id="user_pass"
                  name="pwd"
                  type={showPassword ? 'text' : 'password'}
                  className="wp-input-text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  spellCheck="false"
                  required
                />
                <button
                  type="button"
                  className="wp-password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff size={19} strokeWidth={1.9} />
                  ) : (
                    <Eye size={19} strokeWidth={1.9} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Log In Button */}
            <div className="wp-bottom-row">
              <label htmlFor="rememberme" className="wp-remember-label">
                <input
                  id="rememberme"
                  name="rememberme"
                  type="checkbox"
                  className="wp-checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="wp-remember-text">Remember Me</span>
              </label>

              <button
                type="submit"
                id="wp-submit"
                className="wp-submit-btn"
                disabled={loading}
              >
                {loading ? 'Logging In...' : 'Log In'}
              </button>
            </div>
          </form>
        </div>

        {/* Sub-links below the Card */}
        <div className="wp-sublinks-wrapper">
          <p>
            <a
              href="#lost-password"
              className="wp-link"
              onClick={handleLostPasswordClick}
            >
              Lost your password?
            </a>
          </p>
          <p>
            <a
              href="/"
              className="wp-link"
              onClick={handleBackToSite}
            >
              ← Go to Shree Abhay Das Ji Maharaj
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
