import { Space, App } from 'antd';
import { useNavigate, useParams } from 'react-router';
import { useSafeState, useMemoizedFn } from 'ahooks';
import { type FC, useRef, type ReactElement, useEffect } from 'react';
import {
  ProForm,
  ProCard,
  PageContainer,
  ProFormDependency,
  type FormListActionType,
} from '@ant-design/pro-components';
import SpinBox from '@/components/SpinBox';
import Button from '@/components/Button';
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
import styles from './styles.module.less';

const UiBlockGroupDetail: FC = () => {
  const navigate = useNavigate();
  const [form] = ProForm.useForm();
  const [confirm] = useConfirm();
  const { message } = App.useApp();
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
    const values = processOutputData(formData);
    try {
      setLoading(true);
      const result = await insertUpdateWizardGroupWithWizards({
        ...values,
        updatedBy: partId
      });
      setShouldBlock(false);
      updateFromData(result.wizardGroup);
      message.success('Save successfully.');
    } catch (err) {
      console.error(err);
      message.success('Save failed.');
    } finally {
      setLoading(false);
    }
  });

  const onFieldsChange = useMemoizedFn(() => setShouldBlock(true));

  const renderAddBlockForm = (button: ReactElement<any>) => {
    return (
      <TriggerModal
        width={400}
        trigger={button}
        title="New UI Block"
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
      title: 'Are you sure you want to leave this page?',
      content: 'The form will not be saved after leaving.',
      okText: 'Save',
      cancelText: 'Leave',
      onConfirm: () => {
        handleSave();
        blocker.reset();
      },
      onClose: () => blocker.reset(),
      onCancel: () => blocker.proceed()
    });
  }, shouldBlock);

  return (
    <SpinBox loading={detailLoading}>
      <PageContainer
        title={detail?.wizardGroupName}
        className="full-screen"
        onBack={() => navigate(-1)}
        extra={
          <Space>
            <Button
              loading={loading}
              className="gray-mode"
              onClick={handleSave}
            >
              Save
            </Button>
            {renderAddBlockForm(
              <Button type="primary">
                Add new block
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
            title="UI Block Group"
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