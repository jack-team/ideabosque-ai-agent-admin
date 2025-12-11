import type { FC } from 'react';
import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { useListenModalOk, useModalClose } from '@/components/TriggerModal';
import {
  TextAlignLeftIcon,
  TextInRowsIcon,
  ExportIcon,
  CalendarIcon,
  StatusActiveIcon
} from '@shopify/polaris-icons';
import { withIcon } from '@/components/IconButton';
import type { WizardSchemaType } from '../../types';
import styles from './styles.module.less';

type OptionType = {
  value: string;
  label: string;
}

type AddBlockFormProps = {
  wizardSchemaList: WizardSchemaType[];
  onChange?: (schema: WizardSchemaType) => void;
}

const icons = {
  confirmation: withIcon(StatusActiveIcon),
  scheduler: withIcon(CalendarIcon),
  fileUploader: withIcon(ExportIcon),
  formFields: withIcon(TextAlignLeftIcon),
  multipleChoice: withIcon(TextInRowsIcon)
}

const sortFields = [
  'formFields',
  'multipleChoice',
  'fileUploader',
  'scheduler',
  'confirmation'
];

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

  const options = sortFields.map(field => {
    return wizardSchemaList.find(e => e.wizardSchemaName === field);
  }).filter(v => v).map(item => {
    return {
      label: item?.wizardSchemaDescription,
      value: item?.wizardSchemaName
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
        fieldProps={{
          optionItemRender: (item) => {
            const Icon = icons[item.value as never] as any;
            return (
              <div className={styles.option_item}>
                {Icon ? <Icon /> : null}
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