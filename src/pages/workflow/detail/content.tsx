import { type FC, useMemo, lazy, Suspense } from 'react';
import type { WorkflowDataType } from '@/typings/workflow';
import { useUiComponents, useActions, useTransformTools } from './hooks';
import type { FlowInstance, GetDataResult } from '@/components/FlowCanvas/types';
import Spinner from '@/components/Spinner';

const FlowCanvas = lazy(() => import('@/components/FlowCanvas'));

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
    <Suspense fallback={(
      <Spinner
        className="spinner"
        type="infinity-spin"
      />
    )}>
      <FlowCanvas
        flow={flow}
        actions={actions}
        uiComponents={uiComponents}
        transformTools={transformTools}
        defaultEdges={relationship.edges}
        defaultNodes={relationship.nodes}
      />
    </Suspense>
  );
}

export default DetailContent;
