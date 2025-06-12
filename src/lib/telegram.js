// Telegram WebApp utilities
export const getTelegramUser = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    
    const user = tg.initDataUnsafe?.user;
    const startParam = tg.initDataUnsafe?.start_param;
    
    return {
      user: user ? {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        username: user.username,
        photoUrl: user.photo_url,
        languageCode: user.language_code
      } : null,
      startParam,
      isWebApp: true
    };
  }
  
  // Fallback for development
  return {
    user: {
      id: 123456789,
      firstName: "Demo",
      lastName: "User",
      username: "demouser",
      photoUrl: null,
      languageCode: "en"
    },
    startParam: null,
    isWebApp: false
  };
};

export const expandTelegramApp = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    window.Telegram.WebApp.expand();
  }
};

export const closeTelegramApp = () => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
    window.Telegram.WebApp.close();
  }
};

export const configureTelegramHeader = () => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.setHeaderColor('#fffbeb');
        tg.BackButton.show();
        tg.BackButton.onClick(closeTelegramApp);
    }
};

export const hapticFeedback = (type = 'impact') => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.HapticFeedback) {
    if (type === 'impact') {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    } else if (type === 'notification') {
      window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
    }
  }
};