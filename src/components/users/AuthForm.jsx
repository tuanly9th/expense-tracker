import React, { useState } from 'react';
import { signInWithEmail, signUpWithEmail } from '../../services/userService';

const AuthForm = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // Đăng nhập
        const data = await signInWithEmail(formData.email, formData.password);
        if (onAuthSuccess) onAuthSuccess(data.user);
      } else {
        // Đăng ký
        const userData = {
          name: formData.name,
          email: formData.email
        };
        const data = await signUpWithEmail(formData.email, formData.password, userData);
        if (onAuthSuccess) onAuthSuccess(data.user);
      }
    } catch (err) {
      setError(err.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  return (
    <div className="auth-form-container">
      <h2>{isLogin ? 'Đăng Nhập' : 'Đăng Ký'}</h2>
      
      {error && <div className="auth-error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="name">Họ tên</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required={!isLogin}
            />
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Đang xử lý...' : isLogin ? 'Đăng Nhập' : 'Đăng Ký'}
        </button>
      </form>
      
      <p className="auth-toggle">
        {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
        <button type="button" onClick={toggleAuthMode} className="toggle-button">
          {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
        </button>
      </p>
    </div>
  );
};

export default AuthForm; 