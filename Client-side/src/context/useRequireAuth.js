import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

// Use this to guard actions that require authentication (e.g., add to cart/wishlist, review, checkout)
// Example:
// const requireAuth = useRequireAuth();
// const onAddToWishlist = () => requireAuth(() => addToWishlist(id), { intent: { type: 'wishlist', productId: id } });
export default function useRequireAuth() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  return function requireAuth(action, options = {}) {
    if (!loading && user) {
      // already authenticated -> run the action immediately
      if (typeof action === 'function') return action();
      return true;
    }

    // Not authenticated -> remember where we were and optional intent, then go to signin
    try {
      const returnTo = options.returnTo || (location.pathname + location.search);
      sessionStorage.setItem('RETURN_TO', returnTo);
      if (options.intent) {
        sessionStorage.setItem('PENDING_INTENT', JSON.stringify(options.intent));
      }
    } catch {
      // noop
    }

    const fromState = options.returnTo || (location.pathname + location.search);
    navigate('/signin', { state: { from: fromState, intent: options.intent }, replace: true });
    return false;
  };
}
