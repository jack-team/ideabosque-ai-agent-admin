import { generateQuery } from './generate';
import { agentCore } from '@/helper/request';

export const getToolCallListApi = async (variables: Record<string, any>) => {
  const query = await generateQuery({ type: 'Query', name: 'toolCallList' });
  await agentCore.graphql({ query, variables });
}