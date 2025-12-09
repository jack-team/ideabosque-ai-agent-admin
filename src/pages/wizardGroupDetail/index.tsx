import { Card, Space, App } from 'antd';
import { useBlocker } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import { useSafeState, useMemoizedFn, useUpdateEffect } from 'ahooks';
import { type FC, useRef, type ReactElement, useEffect } from 'react';
import { PageContainer, ProForm, type FormListActionType, ProFormDependency } from '@ant-design/pro-components';
import { insertUpdateWizardGroupWithWizards } from '@/services/wizard';
import { ShopifyButton } from '@/components';
import SpinBox from '@/components/SpinBox';
import { TriggerModal } from '@/components';
import BasicForm from './components/BasicForm';
import AddBlockForm from './components/AddBlockForm';
import AddButton from './components/AddButton';
import Wizards from './wizards';
import { useBlockSchemas, useWizardGroupDeail } from './hooks';
import { processOutputData, getInitFormData } from './helper';
import type { WizardSchemaType, WizardGroupResultType } from './types';
import styles from './styles.module.less';

const WizardGroupDetail: FC = () => {
  const navigate = useNavigate();
  const [form] = ProForm.useForm();
  const { message, modal } = App.useApp();
  const { uid } = useParams<{ uid: string }>();
  const { wizardSchemas } = useBlockSchemas();
  const [loading, setLoading] = useSafeState(false);
  const [anyUpdates, setAnyUpdates] = useSafeState(false);
  const actionRef = useRef<FormListActionType>(undefined);
  const { detail, detailLoading } = useWizardGroupDeail(uid!);

  const updateFromData = useMemoizedFn(
    (data: WizardGroupResultType) => {
      form.setFieldsValue(getInitFormData(data));
    }
  );

  useEffect(() => {
    if (detail) updateFromData(detail);
  }, [detail]);

  // 添加一个 Block
  const handleAddItem = useMemoizedFn(
    (schema: WizardSchemaType) => {
      actionRef.current?.add(schema);
    }
  );

  const handleSave = useMemoizedFn(async () => {
    const formData = await form.validateFields();
    const values = processOutputData(formData);
    setLoading(true);
    try {
      const {
        insertUpdateWizardGroupWithWizards: result
      } = await insertUpdateWizardGroupWithWizards({
        ...values,
        updatedBy: 'admin'
      });
      setAnyUpdates(false);
      updateFromData(result.wizardGroup);
      message.success('Save successfully.');
    } catch (err) {
      console.error(err);
      message.success('Save failed.');
    } finally {
      setLoading(false);
    }
  });

  const onFieldsChange = useMemoizedFn(() => {
    setAnyUpdates(true);
  });

  const renderAddBlockForm = (button: ReactElement<any>) => {
    return (
      <TriggerModal
        centered
        width={400}
        destroyOnHidden
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

  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    return anyUpdates && currentLocation.pathname !== nextLocation.pathname;
  });

  useUpdateEffect(() => {
    if (blocker.state === 'blocked') {
      const e = modal.confirm({
        closable: true,
        rootClassName: 'shopify',
        title: 'Are you sure you want to leave this page?',
        content: 'The form will not be saved after leaving.',
        okText: 'Save',
        cancelText: 'Leave',
        okButtonProps: {
          className: 'shopify'
        },
        cancelButtonProps: {
          className: 'shopify',
          onClick: () => {
            blocker.proceed();
            e.destroy();
          }
        },
        onCancel: () => {
          blocker.reset();
        },
        onOk: async () => {
          blocker.reset();
          handleSave()
        }
      });
    }
  }, [blocker]);

  return (
    <SpinBox loading={loading || detailLoading}>
      <PageContainer
        title="Onboarding Block Group"
        className="shopify full-screen"
        onBack={() => navigate(-1)}
        extra={
          <Space>
            <ShopifyButton
              className="gray"
              onClick={handleSave}
            >
              Save
            </ShopifyButton>
            {renderAddBlockForm(
              <ShopifyButton type="primary">
                Add new block
              </ShopifyButton>
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
          <Card
            className="shopify"
            title="UI Block Group"
            style={{ marginBottom: 24 }}
          >
            <BasicForm />
          </Card>
          <Wizards actionRef={actionRef} />
          <ProFormDependency name={['wizards']}>
            {({ wizards = [] }) => {
              const marginTop = wizards.length ? 24 : 0;
              return (
                <Card className="shopify" style={{ marginTop }}>
                  {renderAddBlockForm(<AddButton />)}
                </Card>
              );
            }}
          </ProFormDependency>
        </ProForm>
      </PageContainer>
    </SpinBox>
  );
}

export default WizardGroupDetail;