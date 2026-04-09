import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiXCircle, FiAlertTriangle, FiInfo, FiX } from 'react-icons/fi';

const STYLES = {
  success: { bg: 'bg-green-50 border-green-200', text: 'text-green-800', icon: FiCheckCircle, iconColor: 'text-green-500' },
  error:   { bg: 'bg-red-50 border-red-200',     text: 'text-red-800',   icon: FiXCircle,     iconColor: 'text-coral-rose' },
  warning: { bg: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-800', icon: FiAlertTriangle, iconColor: 'text-yellow-500' },
  info:    { bg: 'bg-blue-50 border-blue-200',   text: 'text-blue-800',  icon: FiInfo,        iconColor: 'text-blue-500' },
};

const Toast = ({ message, type = 'info', onClose = () => {}, duration = 3500 }) => {
  useEffect(() => {
    const timer = setTimeout(() => { try { onClose(); } catch { /* noop */ } }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const style = STYLES[type] || STYLES.info;
  const Icon = style.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.2 }}
      className={`flex items-start gap-3 px-4 py-3 rounded-xl border shadow-sm min-w-[260px] max-w-sm ${style.bg}`}
    >
      <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${style.iconColor}`} />
      <p className={`text-sm flex-1 leading-snug ${style.text}`}>{message}</p>
      <button
        onClick={() => { try { onClose(); } catch { /* noop */ } }}
        className={`shrink-0 ${style.text} opacity-60 hover:opacity-100 transition-opacity`}
        aria-label="Close notification"
      >
        <FiX className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default Toast;
