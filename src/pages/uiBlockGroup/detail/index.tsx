import { Space, App } from 'antd';
import { useParams } from 'react-router';
import { useSafeState, useMemoizedFn } from 'ahooks';
import { type FC, useRef, type ReactElement, useEffect, useTransition } from 'react';
import {
  ProForm,
  ProCard,
  ProFormDependency,
  type FormListActionType,
} from '@ant-design/pro-components';
import { useNavigate } from '@/hooks/useNavigate';
import SpinBox from '@/components/SpinBox';
import Button from '@/components/Button';
import PageContainer from '@/components/PageContainer';
import TriggerModal from '@/components/TriggerModal';
import { useLeavePage } from '@/hooks/useLeavePage';
import BasicForm from './components/BasicForm';
import AddBlockForm from './components/AddBlockForm';
import AddButton from './components/AddButton';
import { useConfirm } from '@/hooks/useConfirm';
import { processOutputData, getInitFormData } from './helper';
import { useBlockSchemas, useWizardGroupDetail } from './hooks';
import type { WizardGroupResultType, WizardSchemaType } from './types';
import { insertUpdateWizardGroupWithWizards } from '@/services/wizardGroup';
import Wizards from './wizards';
import { partId } from '@/env';
import { useLang } from '@/hooks/useLang';
import styles from './styles.module.less';


const UiBlockGroupDetail: FC = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const [form] = ProForm.useForm();
  const [confirm] = useConfirm();
  const { message } = App.useApp();
  const [_, startTransition] = useTransition();
  const { wizardSchemas } = useBlockSchemas();
  const [loading, setLoading] = useSafeState(false);
  const actionRef = useRef<FormListActionType>(undefined);
  const [shouldBlock, setShouldBlock] = useSafeState(false);
  const { wizardGroupUuid } = useParams<{ wizardGroupUuid: string }>();
  const { detail, detailLoading } = useWizardGroupDetail(wizardGroupUuid!);

  const updateFromData = useMemoizedFn(
    (data: WizardGroupResultType) => {
      form.setFieldsValue(getInitFormData(data));
    }
  );

  useEffect(() => {
    if (detail) updateFromData(detail);
  }, [detail, updateFromData]);

  // 添加一个 Block
  const handleAddItem = useMemoizedFn(
    (schema: WizardSchemaType) => {
      actionRef.current?.add(schema);
    }
  );

  const handleSave = useMemoizedFn(async () => {
    const formData = await form.validateFields();
    try {
      const values = processOutputData(formData);
      await insertUpdateWizardGroupWithWizards({
        ...values,
        updatedBy: partId
      });
      message.success(t('common.Saved successfully'));
    } catch (err) {
      console.error(err);
      message.error(t('common.Failed to save, please contact the administrator'));
    } finally {
      setLoading(false);
    }
  });

  const onSaveProxy = useMemoizedFn(() => {
    setLoading(true);
    startTransition(async () => {
      try {
        await handleSave();
        setShouldBlock(false);
      } catch (err) { }
      setLoading(false);
    });
  });

  const onFieldsChange = useMemoizedFn(() => setShouldBlock(true));

  const renderAddBlockForm = (button: ReactElement<any>) => {
    return (
      <TriggerModal
        width={500}
        trigger={button}
        title={t('uiBlockGroup.New UI Block')}
      >
        <AddBlockForm
          onChange={handleAddItem}
          wizardSchemaList={wizardSchemas}
        />
      </TriggerModal>
    );
  };

  useLeavePage((blocker) => {
    confirm({
      title: t('common.Are you sure you want to leave'),
      content: t('common.The data on this page will be lost after leaving'),
      okText: t('common.save'),
      cancelText: t('common.leave'),
      onConfirm: async () => {
        await handleSave();
        blocker.proceed();
      },
      onClose: () => blocker.reset(),
      onCancel: () => blocker.proceed()
    });
  }, shouldBlock);

  return (
    <SpinBox loading={detailLoading}>
      <PageContainer
        fullScreen
        title={detail?.wizardGroupName}
        onBack={() => navigate('/ui-block-group', { replace: true })}
        extra={
          <Space>
            <Button
              loading={loading}
              className="gray-mode"
              onClick={onSaveProxy}
            >
              {t('common.save')}
            </Button>
            {renderAddBlockForm(
              <Button type="primary">
                {t('uiBlockGroup.Add new block')}
              </Button>
            )}
          </Space>
        }
      >
        <ProForm
          form={form}
          submitter={false}
          onFieldsChange={onFieldsChange}
          className={styles.page_content}
        >
          <ProCard
            title={t('uiBlockGroup.UI Block Group')}
            style={{ marginBottom: 24 }}
          >
            <BasicForm />
          </ProCard>
          <Wizards actionRef={actionRef} />
          <ProFormDependency name={['wizards']}>
            {({ wizards = [] }) => {
              const marginTop = wizards.length ? 24 : 0;
              return (
                <ProCard style={{ marginTop }}>
                  {renderAddBlockForm(<AddButton />)}
                </ProCard>
              );
            }}
          </ProFormDependency>
        </ProForm>
      </PageContainer>
    </SpinBox>
  );
}

export default UiBlockGroupDetail;