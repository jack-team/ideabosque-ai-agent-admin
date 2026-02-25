import { type FC } from 'react';
import { useLang } from '@/hooks/useLang';
import PageContainer from '@/components/PageContainer';
import McpModules from './modules';
import McpFunctions from './functions/list';
import McpSettings from './settings';

const McpConsole: FC = () => {
  const { t } = useLang();
  return (
    <PageContainer title={t('mcpConsole.Mcp Console')}>
      <McpFunctions />
      <McpModules />
      <McpSettings />
    </PageContainer>
  )
}

export default McpConsole;