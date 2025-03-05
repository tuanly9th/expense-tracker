import React, { useState, useEffect } from 'react';
import { fetchUserData, updateUser, signOut } from '../../services/userService';
import './UserProfile.css';

const UserProfile = ({ userId, onSignOut }) => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    avatar_url: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await fetchUserData(userId);
        setUserData(data);
        setFormData({
          name: data.name || '',
          email: data.email || '',
          avatar_url: data.avatar_url || ''
        });
      } catch (err) {
        setError('Không thể tải thông tin người dùng');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadUserData();
    }
  }, [userId]);

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
    setUpdateSuccess(false);

    try {
      const updatedUser = await updateUser(userId, {
        name: formData.name,
        avatar_url: formData.avatar_url
      });
      
      setUserData(updatedUser);
      setIsEditing(false);
      setUpdateSuccess(true);
      
      // Ẩn thông báo thành công sau 3 giây
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    } catch (err) {
      setError('Không thể cập nhật thông tin người dùng');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      if (onSignOut) onSignOut();
    } catch (err) {
      setError('Không thể đăng xuất');
      console.error(err);
    }
  };

  if (loading && !userData) {
    return <div className="user-profile-loading">Đang tải thông tin...</div>;
  }

  if (error && !userData) {
    return <div className="user-profile-error">{error}</div>;
  }

  return (
    <div className="user-profile-container">
      <h2>Thông Tin Cá Nhân</h2>
      
      {error && <div className="user-profile-error">{error}</div>}
      {updateSuccess && <div className="user-profile-success">Cập nhật thông tin thành công!</div>}
      
      {isEditing ? (
        <form onSubmit={handleSubmit} className="user-profile-form">
          <div className="form-group">
            <label htmlFor="name">Họ tên</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              disabled
            />
            <small>Email không thể thay đổi</small>
          </div>
          
          <div className="form-group">
            <label htmlFor="avatar_url">URL ảnh đại diện</label>
            <input
              type="url"
              id="avatar_url"
              name="avatar_url"
              value={formData.avatar_url || ''}
              onChange={handleChange}
              placeholder="https://example.com/avatar.jpg"
            />
          </div>
          
          <div className="user-profile-actions">
            <button type="submit" className="save-button" disabled={loading}>
              {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
            </button>
            <button 
              type="button" 
              className="cancel-button" 
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  name: userData.name || '',
                  email: userData.email || '',
                  avatar_url: userData.avatar_url || ''
                });
              }}
            >
              Hủy
            </button>
          </div>
        </form>
      ) : (
        <div className="user-profile-info">
          {userData.avatar_url && (
            <div className="user-avatar">
              <img src={userData.avatar_url} alt={userData.name} />
            </div>
          )}
          
          <div className="user-details">
            <p><strong>Họ tên:</strong> {userData.name || 'Chưa cập nhật'}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Ngày tham gia:</strong> {new Date(userData.created_at).toLocaleDateString('vi-VN')}</p>
          </div>
          
          <div className="user-profile-actions">
            <button onClick={() => setIsEditing(true)} className="edit-button">
              Chỉnh sửa thông tin
            </button>
            <button onClick={handleSignOut} className="signout-button">
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile; 