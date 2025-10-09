import { Card } from 'antd';
import classNames from 'classnames';
import { type FC, useEffect, useRef } from 'react';
import { useSafeState, useMemoizedFn } from 'ahooks';
import { useNavigate, useParams } from 'react-router';
import { PageContainer, ProForm, ProFormList, type FormListActionType, ProFormDependency } from '@ant-design/pro-components';
import { getWizardGroupApi } from '@/services/wizard';
import SpinBox from '@/components/SpinBox';
import { TriggerModal } from '@/components';
import BasicForm from './components/BasicForm';
import StepForm from './components/StepForm';
import AddBlockForm from './components/AddBlockForm';
import AddButton from './components/AddButton';
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
      // form.setFieldsValue(result.wizardGroup);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    if (uid) loadDetail(uid);
  }, [uid]);

  const handleAddItem = useMemoizedFn((type: string) => {
    actionRef.current?.add({ wizard_type: type });
  });

  return (
    <SpinBox loading={loading}>
      <PageContainer
        title="UI Block Group"
        className="shopify"
        onBack={() => navigate(-1)}
      >
        <ProForm
          form={form}
          submitter={false}
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
            itemContainerRender={(dom, e) => (
              <Card
                children={dom}
                title={`Step ${e.index + 1}`}
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
              )
            }}
          </ProFormDependency>
        </ProForm>
      </PageContainer>
    </SpinBox>
  );
}

export default WizardGroupDetail;