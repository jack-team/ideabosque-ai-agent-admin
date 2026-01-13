import { type FC, useMemo } from 'react';
import FlowCanvas from '@/components/FlowCanvas';
import type { WorkflowDataType } from '@/typings/workflow';
import { useUiComponents, useActions, useTransformTools } from './hooks';
import type { FlowInstance, GetDataResult } from '@/components/FlowCanvas/types';

type DetailContentProps = {
  flow?: FlowInstance;
  detail: WorkflowDataType;
};

const DetailContent: FC<DetailContentProps> = ({ flow, detail }) => {
  const {
    promptTemplate: tpl,
    flowRelationship: frp,
  } = detail;

  const actions = useActions(tpl.mcpServers);
  const transformTools = useTransformTools();
  const uiComponents = useUiComponents(tpl.uiComponents);

  const relationship = useMemo(() => {
    const result = frp ? JSON.parse(frp) : {};
    return result as GetDataResult;
  }, [frp, uiComponents]);

  return (
    <FlowCanvas
      flow={flow}
      actions={actions}
      uiComponents={uiComponents}
      transformTools={transformTools}
      defaultEdges={relationship.edges}
      defaultNodes={relationship.nodes}
    />
  );
}

export default DetailContent;
