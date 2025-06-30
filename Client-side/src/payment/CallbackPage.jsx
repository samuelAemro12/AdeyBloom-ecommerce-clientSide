import React from 'react'
import { useTranslation } from '../context/TranslationContext';

function CallbackPage() {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-accent mx-auto mb-4"></div>
        <h1 className="text-2xl font-semibold text-gray-700">{t('callbackPage')}</h1>
      </div>
    </div>
  )
}

export default CallbackPage