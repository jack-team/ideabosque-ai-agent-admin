import { type FC } from 'react';
import { Form, message, Button } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSafeState, useMemoizedFn } from 'ahooks';
import VerificationInput from 'react-verification-input';
import CardLayout from '@/components/CardLayout';
import { confirmSignUp, resendConfirmationCode } from '@/libs/cognitoClient';
import styles from './styles.module.less';

const Signin: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [urlParams] = useSearchParams();
  const email = urlParams.get('email') as string;
  const [loading, setLoading] = useSafeState(false);
  const [resending, setResending] = useSafeState(false);

  const reSendCode = useMemoizedFn(async () => {
    setResending(true);
    try {
      await resendConfirmationCode(email);
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setResending(false);
    }
  });

  const onSignin = useMemoizedFn(async () => {
    const values = await form.validateFields();
    setLoading(true);
    try {
      await confirmSignUp({
        userName: email,
        code: values.code
      });
      message.success("Account created successfully");
      navigate('/signin?email=' + email, { replace: true });
    } catch (err: any) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  });

  return (
    <CardLayout
      form={form}
      loading={loading}
      onSubmit={onSignin}
      title="We sent you a code"
      buttonText="Verify & Create an account"
      subTitle={`Enter it to verify ${email}`}
      disabled={(values) => {
        const code = values.code || '';
        return code.length < 6;
      }}
    >
      <Form.Item
        name="code"
        rules={[
          {
            required: true,
            message: 'Please enter a 6-digit verification code'
          }
        ]}
      >
        <VerificationInput
          autoFocus
          length={6}
          placeholder="_"
          passwordMode={false}
          classNames={{
            container: styles.input,
            character: styles.character,
            characterInactive: styles.input_active
          }}
        />
      </Form.Item>
      <div className={styles.resend}>
        <Button
          type="link"
          size="small"
          loading={resending}
          onClick={reSendCode}
        >
          Resend
        </Button>
      </div>
    </CardLayout>
  );
}

export default Signin;