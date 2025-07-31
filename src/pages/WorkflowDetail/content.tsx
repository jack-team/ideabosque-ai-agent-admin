import { Card } from 'antd';
import { type FC, useMemo } from 'react';
import FlowCanvas from '@/components/FlowCanvas';
import { dataTransform } from './helper';
import { useUiComponents, useActions, useTransformTools } from './hooks';
import type { FlowInstance, GetDataResult } from '@/components/FlowCanvas/types';
import styles from "./styles.module.less";

type DetailContentProps = {
  flow?: FlowInstance;
  detail: API.Workflow.FlowSnippet;
};

const DetailContent: FC<DetailContentProps> = props => {
  const {
    promptTemplate: tpl,
    flowRelationship: frp,
  } = props.detail;

  const actions = useActions(tpl.mcp_servers);
  const transformTools = useTransformTools();
  const uiComponents = useUiComponents(tpl.ui_components);

  const relationship = useMemo(() => {
    const result = frp ? JSON.parse(frp) : {};
    return dataTransform(result) as GetDataResult;
  }, [frp]);

  return (
    <Card className="shopify full-content">
      <div className={styles.container}>
        <FlowCanvas
          flow={props.flow}
          actions={actions}
          uiComponents={uiComponents}
          transformTools={transformTools}
          defaultEdges={relationship.edges}
          defaultNodes={relationship.nodes}
        />
      </div>
    </Card>
  );
}

export default DetailContent;
