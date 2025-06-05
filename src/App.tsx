import type { FC } from 'react';
import { AppProvider } from "@shopify/polaris";
import { NavMenu } from '@shopify/app-bridge-react';
import enTranslations from "@shopify/polaris/locales/en.json";
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import "@shopify/polaris/build/esm/styles.css";
import { routes } from './routes';

const router = createBrowserRouter(routes);

const App: FC = () => {
  return (
    <div className="app-container">
      <AppProvider i18n={enTranslations}>
        <RouterProvider router={router} />
        <NavMenu>
          <a href="/" rel="home">Home</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/customer-groups">Customer Groups</a>
          <a href="/agent-workflows">Agent Workflows</a>
          <a href="/settings">Settings</a>
        </NavMenu>
      </AppProvider>
    </div>
  );
}

export default App;
