import { useSafeState, useMemoizedFn } from 'ahooks';

const useFetchMcpServers = () => {
  const [
    mcpServers, 
    setMcpServers
  ] = useSafeState<API.Workflow.McpServerItem[]>([])
}