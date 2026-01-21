import { App } from 'antd';
import dayjs from 'dayjs';
import { Fragment, useMemo } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router';
import { useMemoizedFn, useSafeState, useRequest } from 'ahooks';
import PageContainer from '@/components/PageContainer';
import { workflowApi } from '@/services/workflow';
import { insertUpdateWorkflowApi } from '@/services/workflow';
import { useFlowInstance } from '@/components/FlowCanvas';
import Button from '@/components/Button';
import { useLeavePage } from '@/hooks/useLeavePage';
import { useConfirm } from '@/hooks/useConfirm';
import SpinBox from '@/components/SpinBox';
import DetailContent from './content';
import { partId } from '@/env';
import styles from './styles.module.less';

export type EditType = 'new' | 'update';

function WorkflowDetail() {
  const { message } = App.useApp();
  const [flow] = useFlowInstance();
  const [search] = useSearchParams();
  const [confirm] = useConfirm();
  const navigate = useNavigate();
  const [submitLoading, setSubmitLoading] = useSafeState(false);

  // 参数
  const flowSnippetUuid = search.get('flowSnippetUuid')!;
  const flowSnippetVersionUuid = search.get('flowSnippetVersionUuid')!;
  const editType = (search.get('editType') || 'update') as EditType;

  // 获取 workflow 详情
  const { data: workflowData } = useRequest(async () => {
    return workflowApi({ flowSnippetUuid, flowSnippetVersionUuid });
  });

  const lastUpdateText = useMemo(() => {
    if (!workflowData) return null;
    const updatedAt = workflowData.updatedAt;
    return `Last updated on ${dayjs(updatedAt).format('YYYY/MM/DD HH:mm:ss')}`;
  }, [workflowData]);

  // 页面退出提示
  useLeavePage((blocker) => {
    confirm({
      okText: 'Yes',
      title: 'Are you sure you want to leave?',
      content: 'The data on this page will be lost after leaving.',
      onConfirm: () => blocker.proceed()
    });
  });

  // 保存 workflow
  const onSave = useMemoizedFn(async () => {
    const data = flow.getData()!;

    const params: Record<string, any> = {
      flowSnippetUuid,
      updatedBy: partId,
      flowContext: JSON.stringify(data.assembleData),
      flowRelationship: JSON.stringify(data.realDetails)
    }

    // 如果是新建，更新第一个版本的数据
    if (editType === 'new') {
      params.flowSnippetVersionUuid = flowSnippetVersionUuid;
    }

    try {
      setSubmitLoading(true);
      await insertUpdateWorkflowApi(params);
      message.success('Workflow saved successfully.');
    } catch (err) {
      message.error('Failed to save.');
    } finally {
      setSubmitLoading(false);
    }
  });

  return (
    <PageContainer
      fullScreen
      onBack={() => navigate('/workflow', { replace: true })}
      title={
        <Fragment>
          {workflowData?.flowName || 'Workflow editor'}
          {!!lastUpdateText && (
            <div className={styles.update_time}>
              {lastUpdateText}
            </div>
          )}
        </Fragment>
      }
      extra={
        !!workflowData && (
          <div className={styles.extra}>
            <Button
              type="primary"
              onClick={onSave}
              loading={submitLoading}
            >
              Save
            </Button>
          </div>
        )
      }
    >
      <div className={styles.content}>
        <SpinBox loading={!workflowData || submitLoading}>
          {!!workflowData && (
            <DetailContent
              flow={flow}
              detail={workflowData}
            />
          )}
        </SpinBox>
      </div>
    </PageContainer>
  );
}

export default WorkflowDetail;