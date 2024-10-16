import AsyncStorage from '@react-native-async-storage/async-storage';

const changeLanguage = async (lng) => {
  await AsyncStorage.setItem('appLanguage', lng);
  i18next.changeLanguage(lng);
  const isRTL = lng === 'ar';
  if (isRTL !== I18nManager.isRTL) {
    I18nManager.forceRTL(isRTL);
    // Restart the app or reload the screen
  }
};

// Load language preference on startup
useEffect(() => {
  const loadLanguage = async () => {
    const savedLanguage = await AsyncStorage.getItem('appLanguage');
    if (savedLanguage) {
      changeLanguage(savedLanguage);
    }
  };
  loadLanguage();
}, []);
