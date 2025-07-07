declare namespace API {
  namespace Workflow {

    type FlowSnippet = {
      flowName: string;
      flowSnippetUuid: string;
      flowSnippetVersionUuid: string;
      status: string;
      updatedAt: string;
      updatedBy: string;
      flowRelationship: string;
      flowContext: string;
      createdAt: string;
    }

    type QueryWorkflowsResult = SplitPageResult<
      'flowSnippetList',
      FlowSnippet
    >;

    type QueryWorkflowResult = {
      flowSnippet: FlowSnippet;
    }

    type InsertUpdateWorkflowResult = {
      insertUpdateFlowSnippet: {
        flowSnippet: FlowSnippet
      }
    }
  }
}