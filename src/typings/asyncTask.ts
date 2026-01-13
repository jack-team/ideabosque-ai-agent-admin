export type AsyncTaskArgument = {
  agentUuid: string;
  runUuid: string;
  stream: boolean;
  threadUuid: string;
  userQuery: string;
}

export type AsyncTaskDataType = {
  asyncTaskUuid: string;
  createdAt: string;
  functionName: string;
  notes: string;
  outputFiles: any[];
  result: string;
  status: string;
  timeSpent: number;
  updatedAt: string;
  arguments: AsyncTaskArgument[];
}