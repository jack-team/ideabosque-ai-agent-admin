import type { FC } from 'react';
import { Button, Form, type FormInstance } from 'antd';
import styles from './styles.module.less';

type CardLayoutProps = {
  footer?: any;
  title: string;
  subTitle?: any;
  buttonText: string;
  children?: any;
  loading?: boolean;
  onSubmit?: () => void;
  form?: FormInstance;
  disabled?: (values: Record<string, any>) => boolean;
}

const CardLayout: FC<CardLayoutProps> = (porps) => {
  return (
    <Form
      size="large"
      form={porps.form}
      className={styles.wrapper}
    >
      <div className={styles.card_layout}>
        <div className={styles.title}>
          {porps.title}
        </div>
        {!!porps.subTitle && (
          <div className={styles.sub_title}>
            {porps.subTitle}
          </div>
        )}
        <div className={styles.content}>
          {porps.children}
        </div>
        <div className={styles.submitter}>
          <Form.Item
            noStyle
            shouldUpdate
          >
            {form => {
              const values = form.getFieldsValue();
              const diabled = !!porps.disabled?.(values);
              return (
                <Button
                  block
                  type="primary"
                  disabled={diabled}
                  loading={porps.loading}
                  onClick={porps.onSubmit}
                >
                  {porps.buttonText}
                </Button>
              );
            }}
          </Form.Item>
        </div>
        {porps.footer}
      </div>
    </Form>
  );
}

export default CardLayout;