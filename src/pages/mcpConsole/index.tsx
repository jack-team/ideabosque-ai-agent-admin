import type { FC } from 'react';
import McpModules from './modules';
import McpFunctions from './functions';
import McpFunctionCalls from './functionCalls';
import McpSettings from './settings';

const McpConsole: FC = () => {
  return (
    <div>
      <McpModules></McpModules>
      <McpFunctions></McpFunctions>
      <McpFunctionCalls></McpFunctionCalls>
      <McpSettings></McpSettings>
    </div>
  )
}

export default McpConsole;