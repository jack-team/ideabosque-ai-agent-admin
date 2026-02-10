import { type FC } from 'react';
import PageContainer from '@/components/PageContainer';
import McpModules from './modules';
import McpFunctions from './functions/list';
import McpSettings from './settings';

const McpConsole: FC = () => {
  return (
    <PageContainer title="Mcp Console">
      <McpFunctions />
      <McpModules />
      <McpSettings />
    </PageContainer>
  )
}

export default McpConsole;