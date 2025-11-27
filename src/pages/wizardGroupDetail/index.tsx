import { Card, Space, App } from 'antd';
import { useSafeState, useMemoizedFn } from 'ahooks';
import { useNavigate, useParams } from 'react-router';
import { type FC, useRef, type ReactElement, useEffect } from 'react';
import { PageContainer, ProForm, ProFormList, type FormListActionType, ProFormDependency } from '@ant-design/pro-components';
import { insertUpdateWizardGroupWithWizards } from '@/services/wizard';
import { ShopifyButton } from '@/components';
import SpinBox from '@/components/SpinBox';
import { TriggerModal } from '@/components';
import BasicForm from './components/BasicForm';
import StepForm from './components/StepForm';
import AddBlockForm from './components/AddBlockForm';
import AddButton from './components/AddButton';
import { useBlockSchemas, useWizardGroupDeail } from './hooks';
import { processOutputData, getInitFormData } from './helper'
import type { WizardSchemaType, WizardGroupResultType } from './types';
import styles from './styles.module.less';

const WizardGroupDetail: FC = () => {
  const navigate = useNavigate();
  const [form] = ProForm.useForm();
  const { message } = App.useApp();
  const { uid } = useParams<{ uid: string }>();
  const { wizardSchemas } = useBlockSchemas();
  const [loading, setLoading] = useSafeState(false);
  const actionRef = useRef<FormListActionType>(undefined);
  const { detail, detailLoading } = useWizardGroupDeail(uid!);

  const updateFromData = useMemoizedFn(
    (data: WizardGroupResultType) => {
      form.setFieldsValue(getInitFormData(data));
    }
  );

  useEffect(() => {
    if (detail) {
      updateFromData(detail)
    }
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
      updateFromData(result.wizardGroup);
      message.success('Save successfully.');
    } catch (err) {
      console.error(err);
      message.success('Save failed.');
    } finally {
      setLoading(false);
    }
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
              loading={loading}
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
          className={styles.page_content}
        >
          <Card
            className="shopify"
            title="UI Block Group"
            style={{ marginBottom: 24 }}
          >
            <BasicForm />
          </Card>
          <ProFormList<WizardSchemaType>
            name="wizards"
            initialValue={[]}
            alwaysShowItemLabel
            copyIconProps={false}
            actionRef={actionRef}
            deleteIconProps={false}
            creatorButtonProps={false}
            className={styles.form_list}
            style={{ marginBottom: 0 }}
          >
            {(_, index, action, count) => (
              <StepForm
                index={index}
                count={count}
                action={action}
              />
            )}
          </ProFormList>
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