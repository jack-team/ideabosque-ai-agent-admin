import { Card, Space } from 'antd';
import classNames from 'classnames';
import { type FC, useEffect, useRef } from 'react';
import { useSafeState, useMemoizedFn } from 'ahooks';
import { useNavigate, useParams } from 'react-router';
import { ShopifyButton } from '@/components';
import { PageContainer, ProForm, ProFormList, type FormListActionType, ProFormDependency } from '@ant-design/pro-components';
import { getWizardGroupApi } from '@/services/wizard';
import SpinBox from '@/components/SpinBox';
import { TriggerModal } from '@/components';
import BasicForm from './components/BasicForm';
import StepForm from './components/StepForm';
import AddBlockForm from './components/AddBlockForm';
import AddButton from './components/AddButton';
import { parseData } from './helper';
import styles from './styles.module.less';

const WizardGroupDetail: FC = () => {
  const navigate = useNavigate();
  const [form] = ProForm.useForm();
  const { uid } = useParams<{ uid: string }>();
  const [loading, setLoading] = useSafeState(!!uid);
  const actionRef = useRef<FormListActionType>(undefined);

  const loadDetail = useMemoizedFn(async (id: string) => {
    setLoading(true);
    try {
      const result = await getWizardGroupApi({ wizardGroupUuid: id });
      const json = parseData(result.wizardGroup);
      console.log(json);
      form.setFieldsValue(json);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    if (uid) loadDetail(uid);
  }, [uid]);

  const handleAddItem = useMemoizedFn((blockType: string) => {
    actionRef.current?.add({
      wizard_type: blockType,
      form_schema: { blockType }
    });
  });

  const handleSave = useMemoizedFn(async () => {
    console.log(form.getFieldsValue())
  })

  return (
    <SpinBox loading={loading}>
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
            <TriggerModal
              destroyOnHidden
              title="New UI Block"
              trigger={
                <ShopifyButton type="primary">
                  Add new block
                </ShopifyButton>
              }
            >
              <AddBlockForm onChange={handleAddItem} />
            </TriggerModal>
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
          <ProFormList
            name="wizards"
            initialValue={[]}
            alwaysShowItemLabel
            copyIconProps={false}
            actionRef={actionRef}
            deleteIconProps={false}
            creatorButtonProps={false}
            className={styles.form_list}
            style={{ marginBottom: 0 }}
            itemContainerRender={(dom, { index }) => (
              <Card
                children={dom}
                title={`Step ${index + 1}`}
                className={classNames(styles.step_card, 'shopify')}
              />
            )}
          >
            <StepForm />
          </ProFormList>
          <ProFormDependency name={['wizards']}>
            {({ wizards = [] }) => {
              const marginTop = wizards.length ? 24 : 0;
              return (
                <Card
                  className="shopify"
                  style={{ marginTop }}
                >
                  <TriggerModal
                    destroyOnHidden
                    title="New UI Block"
                    trigger={<AddButton />}
                  >
                    <AddBlockForm onChange={handleAddItem} />
                  </TriggerModal>
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