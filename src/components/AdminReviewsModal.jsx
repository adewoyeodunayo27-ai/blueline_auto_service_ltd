import { useState, useEffect, useCallback } from 'react';
import { 
  X, 
  ShieldCheck, 
  Check, 
  Trash2, 
  RefreshCw, 
  LogOut, 
  Lock, 
  Star, 
  AlertCircle, 
  Inbox,
  Sparkles
} from 'lucide-react';
import { 
  isSupabaseConfigured, 
  adminSignIn, 
  adminSignOut, 
  getAdminUser, 
  getAllTestimonialsAdmin, 
  updateTestimonialStatus, 
  deleteTestimonial 
} from '../lib/supabase.js';

export default function AdminReviewsModal({ isOpen, onClose, onReviewsChanged }) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const [reviews, setReviews] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'approved' | 'rejected' | 'all'
  const [actionInProgressId, setActionInProgressId] = useState(null);
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  // Check current session on mount / open
  useEffect(() => {
    if (!isOpen) return;
    async function checkAuth() {
      if (!isSupabaseConfigured) return;
      try {
        const currentUser = await getAdminUser();
        setUser(currentUser);
        if (currentUser) {
          fetchReviews();
        }
      } catch (err) {
        console.warn('Admin auth check failed:', err);
      }
    }
    checkAuth();
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const fetchReviews = useCallback(async () => {
    setLoadingReviews(true);
    setFeedbackMsg(null);
    try {
      const data = await getAllTestimonialsAdmin();
      setReviews(data);
    } catch (err) {
      console.error('Error fetching admin reviews:', err);
      setFeedbackMsg({ type: 'error', text: err.message || 'Could not load testimonials.' });
    } finally {
      setLoadingReviews(false);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setAuthError('Please enter both administrator email and password.');
      return;
    }

    setAuthLoading(true);
    setAuthError('');
    try {
      const res = await adminSignIn(email, password);
      setUser(res.user);
      fetchReviews();
    } catch (err) {
      console.error('Admin login error:', err);
      setAuthError(err.message || 'Authentication failed. Please verify administrator credentials.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await adminSignOut();
      setUser(null);
      setReviews([]);
    } catch (err) {
      console.warn('Sign out error:', err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setActionInProgressId(id);
    try {
      await updateTestimonialStatus(id, newStatus);
      setFeedbackMsg({ 
        type: 'success', 
        text: `Review marked as ${newStatus.toUpperCase()}.${newStatus === 'approved' ? ' It is now live on the website.' : ''}` 
      });
      await fetchReviews();
      if (onReviewsChanged) onReviewsChanged();
    } catch (err) {
      console.error('Status update failed:', err);
      setFeedbackMsg({ type: 'error', text: err.message || 'Failed to update review status.' });
    } finally {
      setActionInProgressId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this testimonial?')) {
      return;
    }
    setActionInProgressId(id);
    try {
      await deleteTestimonial(id);
      setFeedbackMsg({ type: 'success', text: 'Review deleted successfully.' });
      await fetchReviews();
      if (onReviewsChanged) onReviewsChanged();
    } catch (err) {
      console.error('Delete failed:', err);
      setFeedbackMsg({ type: 'error', text: err.message || 'Failed to delete review.' });
    } finally {
      setActionInProgressId(null);
    }
  };

  if (!isOpen) return null;

  const pendingCount = reviews.filter(r => r.approval_status === 'pending').length;
  const approvedCount = reviews.filter(r => r.approval_status === 'approved').length;
  const rejectedCount = reviews.filter(r => r.approval_status === 'rejected').length;

  const filteredReviews = reviews.filter(r => {
    if (activeTab === 'pending') return r.approval_status === 'pending';
    if (activeTab === 'approved') return r.approval_status === 'approved';
    if (activeTab === 'rejected') return r.approval_status === 'rejected';
    return true;
  });

  return (
    <div className="admin-modal-overlay" onClick={onClose} role="presentation">
      <div 
        className="admin-modal-card" 
        onClick={(e) => e.stopPropagation()} 
        role="dialog" 
        aria-modal="true" 
        aria-labelledby="admin-dialog-title"
      >
        <button 
          className="admin-modal-close" 
          onClick={onClose} 
          aria-label="Close admin moderation dialog"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="admin-modal-header">
          <div className="admin-badge">
            <ShieldCheck size={16} />
            <span>Administrator Portal</span>
          </div>
          <h2 id="admin-dialog-title" className="admin-title">
            Review <span className="highlight">Moderation</span>
          </h2>
          <p className="admin-subtitle">
            Securely approve or reject customer testimonials before they appear publicly.
          </p>
        </div>

        {!isSupabaseConfigured ? (
          <div className="admin-alert-box warning">
            <AlertCircle size={20} />
            <div>
              <strong>Database Connection Required</strong>
              <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem' }}>
                Please set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in your <code>.env</code> file. Run <code>supabase/schema.sql</code> in your Supabase SQL editor to initialize tables and security policies.
              </p>
            </div>
          </div>
        ) : !user ? (
          /* Authentication Screen */
          <div className="admin-login-view">
            <div className="admin-login-intro">
              <div className="admin-lock-icon">
                <Lock size={28} />
              </div>
              <p>Sign in with your authorized Supabase administrator account to review, approve, or reject customer feedback.</p>
            </div>

            {authError && (
              <div className="admin-alert-box error" role="alert">
                <AlertCircle size={18} />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="admin-login-form">
              <div className="form-group">
                <label className="form-label" htmlFor="admin-email">Administrator Email</label>
                <input
                  id="admin-email"
                  type="email"
                  className="form-input"
                  placeholder="bluelineautosuk@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="admin-password">Password</label>
                <input
                  id="admin-password"
                  type="password"
                  className="form-input"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button 
                type="submit" 
                className="btn btn--primary" 
                style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
                disabled={authLoading}
              >
                {authLoading ? 'Verifying Credentials...' : 'Sign In as Administrator'}
              </button>

              <div className="admin-security-note">
                <Sparkles size={14} />
                <span>Credentials are verified directly against Supabase Auth. No secrets are stored in code.</span>
              </div>
            </form>
          </div>
        ) : (
          /* Moderation Dashboard Screen */
          <div className="admin-dashboard-view">
            <div className="admin-user-bar">
              <div className="admin-user-info">
                <span className="admin-status-dot" />
                <span>Authorized Admin: <strong>{user.email}</strong></span>
              </div>
              <div className="admin-bar-actions">
                <button 
                  type="button" 
                  className="btn btn--outline btn--sm" 
                  onClick={fetchReviews}
                  disabled={loadingReviews}
                  title="Refresh testimonials"
                >
                  <RefreshCw size={14} className={loadingReviews ? 'spin' : ''} />
                  <span>Refresh</span>
                </button>
                <button 
                  type="button" 
                  className="btn btn--outline btn--sm admin-signout-btn" 
                  onClick={handleSignOut}
                  title="Sign out of admin session"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {feedbackMsg && (
              <div className={`admin-alert-box ${feedbackMsg.type}`} role="alert">
                <AlertCircle size={18} />
                <span>{feedbackMsg.text}</span>
              </div>
            )}

            {/* Filter Tabs */}
            <div className="admin-tabs" role="tablist">
              <button 
                type="button"
                className={`admin-tab ${activeTab === 'pending' ? 'active' : ''}`}
                onClick={() => setActiveTab('pending')}
              >
                Pending Approval
                {pendingCount > 0 && <span className="tab-counter badge-amber">{pendingCount}</span>}
              </button>
              <button 
                type="button"
                className={`admin-tab ${activeTab === 'approved' ? 'active' : ''}`}
                onClick={() => setActiveTab('approved')}
              >
                Approved (Public)
                <span className="tab-counter">{approvedCount}</span>
              </button>
              <button 
                type="button"
                className={`admin-tab ${activeTab === 'rejected' ? 'active' : ''}`}
                onClick={() => setActiveTab('rejected')}
              >
                Rejected
                <span className="tab-counter">{rejectedCount}</span>
              </button>
              <button 
                type="button"
                className={`admin-tab ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All ({reviews.length})
              </button>
            </div>

            {/* Testimonials List */}
            <div className="admin-reviews-list">
              {loadingReviews ? (
                <div className="admin-empty-state">
                  <RefreshCw size={28} className="spin" />
                  <p>Loading customer reviews from database...</p>
                </div>
              ) : filteredReviews.length === 0 ? (
                <div className="admin-empty-state">
                  <Inbox size={32} />
                  <p>No reviews found in <strong>{activeTab}</strong> status.</p>
                </div>
              ) : (
                filteredReviews.map((rev) => {
                  const isProcessing = actionInProgressId === rev.id;
                  const dateStr = rev.created_at 
                    ? new Date(rev.created_at).toLocaleDateString('en-GB', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric' 
                      }) 
                    : 'Recently';

                  return (
                    <article key={rev.id} className="admin-review-card">
                      <div className="admin-card-top">
                        <div>
                          <div className="admin-card-header">
                            <h4 className="admin-customer-name">{rev.customer_name}</h4>
                            <span className={`status-badge status-${rev.approval_status}`}>
                              {rev.approval_status}
                            </span>
                          </div>
                          <div className="admin-review-meta">
                            <span className="admin-stars">
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star 
                                  key={i} 
                                  size={14} 
                                  fill={i < rev.star_rating ? '#fbbf24' : 'none'} 
                                  stroke={i < rev.star_rating ? '#fbbf24' : '#64748b'} 
                                />
                              ))}
                            </span>
                            <span className="admin-meta-dot">•</span>
                            <span className="admin-service">{rev.service_received || 'General Service'}</span>
                            <span className="admin-meta-dot">•</span>
                            <span className="admin-date">{dateStr}</span>
                          </div>
                        </div>
                      </div>

                      <p className="admin-review-text">"{rev.review_text}"</p>

                      <div className="admin-card-actions">
                        {rev.approval_status !== 'approved' && (
                          <button
                            type="button"
                            className="btn btn--sm btn--approve"
                            onClick={() => handleStatusChange(rev.id, 'approved')}
                            disabled={isProcessing}
                          >
                            <Check size={14} />
                            <span>Approve for Public Display</span>
                          </button>
                        )}

                        {rev.approval_status !== 'rejected' && (
                          <button
                            type="button"
                            className="btn btn--sm btn--reject"
                            onClick={() => handleStatusChange(rev.id, 'rejected')}
                            disabled={isProcessing}
                          >
                            <X size={14} />
                            <span>Reject</span>
                          </button>
                        )}

                        <button
                          type="button"
                          className="btn btn--sm btn--delete"
                          onClick={() => handleDelete(rev.id)}
                          disabled={isProcessing}
                          title="Delete permanently"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .admin-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(8, 14, 26, 0.88);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1100;
          padding: 1.25rem;
          animation: modalFadeIn 0.25s ease-out;
        }

        .admin-modal-card {
          background: #0f1d38;
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: var(--radius-xl, 16px);
          box-shadow: 0 30px 70px -15px rgba(0, 0, 0, 0.75), 0 0 40px rgba(0, 102, 255, 0.12);
          width: 100%;
          max-width: 720px;
          padding: 2.25rem;
          position: relative;
          color: white;
          max-height: 90vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
        }

        .admin-modal-close {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.2s;
        }

        .admin-modal-close:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #fff;
        }

        .admin-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.75rem;
          border-radius: 9999px;
          background: rgba(0, 102, 255, 0.2);
          border: 1px solid rgba(0, 102, 255, 0.4);
          color: #60a5fa;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.5rem;
        }

        .admin-title {
          font-size: 1.625rem;
          font-weight: 800;
          margin: 0.2rem 0;
          color: #ffffff;
        }

        .admin-subtitle {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: 1.5rem;
        }

        .admin-alert-box {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          padding: 0.85rem 1rem;
          border-radius: 8px;
          font-size: 0.875rem;
          margin-bottom: 1.25rem;
        }

        .admin-alert-box.warning {
          background: rgba(245, 158, 11, 0.15);
          border: 1px solid rgba(245, 158, 11, 0.35);
          color: #fde68a;
        }

        .admin-alert-box.error {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.35);
          color: #fca5a5;
        }

        .admin-alert-box.success {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(16, 185, 129, 0.35);
          color: #6ee7b7;
        }

        .admin-login-view {
          max-width: 420px;
          margin: 0 auto;
          width: 100%;
          text-align: center;
        }

        .admin-login-intro {
          margin-bottom: 1.5rem;
        }

        .admin-lock-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(0, 102, 255, 0.15);
          border: 1px solid rgba(0, 102, 255, 0.3);
          color: #60a5fa;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }

        .admin-login-intro p {
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.5;
        }

        .admin-login-form {
          text-align: left;
        }

        .admin-security-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          margin-top: 1.25rem;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          text-align: center;
        }

        .admin-user-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          margin-bottom: 1.25rem;
        }

        .admin-user-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.85);
        }

        .admin-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }

        .admin-bar-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .admin-tabs {
          display: flex;
          gap: 0.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding-bottom: 0.5rem;
          margin-bottom: 1.25rem;
          overflow-x: auto;
        }

        .admin-tab {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          padding: 0.5rem 0.85rem;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.2s;
          white-space: nowrap;
        }

        .admin-tab:hover {
          color: white;
          background: rgba(255, 255, 255, 0.06);
        }

        .admin-tab.active {
          color: white;
          background: rgba(0, 102, 255, 0.25);
          border: 1px solid rgba(0, 102, 255, 0.4);
        }

        .tab-counter {
          font-size: 0.7rem;
          padding: 0.15rem 0.45rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.15);
        }

        .tab-counter.badge-amber {
          background: #f59e0b;
          color: #000;
          font-weight: 700;
        }

        .admin-reviews-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-height: 480px;
          overflow-y: auto;
          padding-right: 0.25rem;
        }

        .admin-review-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 10px;
          padding: 1.15rem;
          transition: border-color 0.2s;
        }

        .admin-review-card:hover {
          border-color: rgba(255, 255, 255, 0.18);
        }

        .admin-card-header {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .admin-customer-name {
          font-size: 1rem;
          font-weight: 700;
          color: white;
          margin: 0;
        }

        .status-badge {
          font-size: 0.7rem;
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
        }

        .status-badge.status-pending {
          background: rgba(245, 158, 11, 0.2);
          border: 1px solid rgba(245, 158, 11, 0.4);
          color: #fbbf24;
        }

        .status-badge.status-approved {
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #34d399;
        }

        .status-badge.status-rejected {
          background: rgba(239, 68, 68, 0.2);
          border: 1px solid rgba(239, 68, 68, 0.4);
          color: #f87171;
        }

        .admin-review-meta {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          margin-top: 0.35rem;
          font-size: 0.775rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .admin-stars {
          display: inline-flex;
          align-items: center;
          gap: 2px;
        }

        .admin-meta-dot {
          opacity: 0.4;
        }

        .admin-review-text {
          margin: 0.75rem 0;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.88);
          line-height: 1.5;
          font-style: italic;
        }

        .admin-card-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.85rem;
          padding-top: 0.75rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .btn--approve {
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #6ee7b7;
        }

        .btn--approve:hover {
          background: #10b981;
          color: white;
        }

        .btn--reject {
          background: rgba(239, 68, 68, 0.15);
          border: 1px solid rgba(239, 68, 68, 0.35);
          color: #fca5a5;
        }

        .btn--reject:hover {
          background: #ef4444;
          color: white;
        }

        .btn--delete {
          margin-left: auto;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.5);
          padding: 0.4rem;
        }

        .btn--delete:hover {
          background: #ef4444;
          border-color: #ef4444;
          color: white;
        }

        .admin-empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .admin-empty-state p {
          margin-top: 0.75rem;
          font-size: 0.9rem;
        }

        .spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 640px) {
          .admin-modal-card {
            padding: 1.5rem;
          }
          .admin-user-bar {
            flex-direction: column;
            align-items: flex-start;
          }
          .admin-card-actions {
            flex-wrap: wrap;
          }
        }

        @media (max-width: 420px) {
          .admin-modal-card {
            padding: 1.15rem 0.85rem;
          }
        }
      `}</style>
    </div>
  );
}
