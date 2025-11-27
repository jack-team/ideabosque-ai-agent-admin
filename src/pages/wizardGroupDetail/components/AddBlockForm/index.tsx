import type { FC } from 'react';
import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import type { WizardSchemaType } from '../../types';

type OptionType = {
  value: string;
  label: string;
}

type AddBlockFormProps = {
  wizardSchemaList: WizardSchemaType[];
  onChange?: (schema: WizardSchemaType) => void;
}

const AddBlockForm: FC<AddBlockFormProps> = (props) => {
  const [form] = ProForm.useForm();
  const [closeModal] = useModalClose();
  const { wizardSchemaList, onChange } = props;

  useListenModalOk(async () => {
    const formData = await form.validateFields();
    const schemaName = formData.name;

    const schema = wizardSchemaList.find(e => {
      return e.wizardSchemaName === schemaName;
    });

    if (schema) {
      closeModal();
      onChange?.(schema);
    }
  });

  const options = wizardSchemaList.map(item => {
    return {
      label: item.wizardSchemaDescription,
      value: item.wizardSchemaName
    }
  });

  return (
    <ProForm
      form={form}
      submitter={false}
      style={{ padding: '16px 0 0 0' }}
    >
      <ProFormSelect<OptionType>
        name="name"
        label="UI Block type"
        rules={[
          { required: true }
        ]}
        options={options}
      />
    </ProForm>
  );
}

export default AddBlockForm;