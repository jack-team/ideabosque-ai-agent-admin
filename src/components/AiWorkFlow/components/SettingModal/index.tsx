import type { FC } from 'react';
import { useRef } from 'react';
import { Modal, Form } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useMemoizedFn } from 'ahooks';
import { ShopifyButton } from '@/components';
import SettingForm from './form';

type SettingModalProps = {
  open: boolean;
  formData?: Record<string, any>;
  onOpenChange?: (open: boolean) => void;
  onSave?: (values: Record<string, any>) => Promise<void>;
}

const SettingModal: FC<SettingModalProps> = (props) => {
  const [form] = Form.useForm();
  const lockRef = useRef(false);

  const onClose = useMemoizedFn(() => {
    if (!lockRef.current) {
      props.onOpenChange?.(false);
    }
  });

  const afterClose = useMemoizedFn(() => {
    form.resetFields();
  });

  const handleOk = useMemoizedFn(async () => {
    const values = await form.validateFields();
    lockRef.current = true;
    try {
      await props.onSave?.(values);
      requestAnimationFrame(onClose);
    } catch (err) {
      return Promise.reject(err);
    } finally {
      lockRef.current = false;
    }
  });

  return (
    <Modal
      destroyOnHidden
      open={props.open}
      className="shopify"
      title="Node Settings"
      onCancel={onClose}
      afterClose={afterClose}
      footer={(
        <>
          <ShopifyButton
            type="text"
            children="Back"
            onClick={onClose}
            icon={<ArrowLeftOutlined />}
          />
          <ShopifyButton
            type="primary"
            onClick={handleOk}
            children="Save"
          />
        </>
      )}
    >
      <SettingForm
        form={form}
        formData={props.formData}
      />
    </Modal>
  );
}

export default SettingModal;
