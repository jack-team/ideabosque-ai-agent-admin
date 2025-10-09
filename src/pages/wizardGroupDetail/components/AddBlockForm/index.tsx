import type { FC } from 'react';
import Icon from '@ant-design/icons';
import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import { BlockTypes, BlockTypesMap } from '../../enum';
import styles from './styles.module.less';

type OptionType = {
  value: string;
  label: string;
  icon: any;
}

const blockTypes: OptionType[] = [
  {
    value: BlockTypes.FormFields,
    ...BlockTypesMap[BlockTypes.FormFields]
  },
  {
    value: BlockTypes.MultipleChoice,
    ...BlockTypesMap[BlockTypes.MultipleChoice]
  },
  {
    value: BlockTypes.FileUploader,
    ...BlockTypesMap[BlockTypes.FileUploader]
  },
  {
    value: BlockTypes.Scheduler,
    ...BlockTypesMap[BlockTypes.Scheduler]
  },
  {
    value: BlockTypes.ProductCards,
    ...BlockTypesMap[BlockTypes.ProductCards]
  },
  {
    value: BlockTypes.Confirmation,
    ...BlockTypesMap[BlockTypes.Confirmation]
  }
];

type AddBlockFormProps = {
  onChange: (type: string) => void;
}

const AddBlockForm: FC<AddBlockFormProps> = (props) => {
  const [form] = ProForm.useForm();
  const [closeModal] = useModalClose();

  useListenModalOk(async () => {
    const formData = await form.validateFields();
    props.onChange(formData.type);
    closeModal();
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      style={{ padding: '16px 0 0 0' }}
    >
      <ProFormSelect<OptionType>
        name="type"
        label="UI Block type"
        rules={[
          { required: true }
        ]}
        options={blockTypes}
        fieldProps={{
          optionItemRender: (item) => {
            return (
              <div className={styles.option_item}>
                <Icon component={item.icon} />
                {item.label}
              </div>
            );
          }
        }}
      />
    </ProForm>
  );
}

export default AddBlockForm;