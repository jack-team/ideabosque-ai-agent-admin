import type { FC } from 'react';
import { Form, Input, message } from 'antd';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useSafeState, useMemoizedFn } from 'ahooks';
import CardLayout from '@/components/CardLayout';
import { signIn } from '@/libs/cognitoClient';
import { useUserModel } from '@/store/user';
import { appName } from '@/env';
import styles from './styles.module.less';

const Signin: FC = () => {
  const user = useUserModel();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [urlParams] = useSearchParams();
  const [loading, setLoading] = useSafeState(false);
  const email = urlParams.get('email') as string;

  const onSignin = useMemoizedFn(async () => {
    const values = await form.validateFields();
    const userName = values.userName;
    const password = values.password;

    try {
      setLoading(true);
      const result = await signIn({ userName, password });
      user.updateUser({ ...result, email: userName });
    } catch (err: any) {
      // 用户未确认注册码
      if (err.name === 'UserNotConfirmedException') {
        navigate(`/verify-code?email=${userName}&resend=1`);
      } else {
        message.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  });

  return (
    <CardLayout
      form={form}
      loading={loading}
      onSubmit={onSignin}
      buttonText="Sign in"
      title={appName}
      footer={
        <div className={styles.footer}>
          <div className={styles.footer_label}>
            {`Don't have an account yet? `}
          </div>
          <Link to="/signup">Sign up</Link>
        </div>
      }
    >
      <Form.Item
        name="userName"
        initialValue={email}
        rules={[
          {
            required: true,
            message: 'Please enter email'
          },
          {
            type: 'email',
            message: 'Please enter the correct email address'
          }
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please enter password'
          }
        ]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
    </CardLayout>
  );
}

export default Signin;