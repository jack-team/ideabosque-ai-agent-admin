import { createRoot } from 'react-dom/client';
import I18nProvider from './i18Provider';
import App from './App';
import './styles/global.less';

createRoot(document.getElementById('root')!).render(
  <I18nProvider>
    <App />
  </I18nProvider>
);
