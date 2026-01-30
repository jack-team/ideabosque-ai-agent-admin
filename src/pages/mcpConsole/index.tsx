import { type FC, Fragment } from 'react';
import McpModules from './modules';
import McpFunctions from './functions';
import McpFunctionCalls from './functionCalls';
import McpSettings from './settings';

const McpConsole: FC = () => {
  return (
    <Fragment>
      <McpModules />
      <McpFunctions />
      <McpFunctionCalls />
      <McpSettings />
    </Fragment>
  )
}

export default McpConsole;