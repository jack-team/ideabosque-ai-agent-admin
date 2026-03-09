import { type FC, Fragment } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSafeState, useMemoizedFn } from 'ahooks';
import { Form, Input, Row, Col, message } from 'antd';
import CardLayout from '@/components/CardLayout';
import { signUp } from '@/libs/cognitoClient';

const Signin: FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [readOnly, setReadOnly] = useSafeState(true);
  const [loading, setLoading] = useSafeState(false);

  const cancelReadOnly = useMemoizedFn(() => {
    setReadOnly(false);
  });

  const onSignin = useMemoizedFn(async () => {
    const params = await form.validateFields();
    setLoading(true);
    try {
      await signUp(params);
      navigate('/verify-code?email=' + params.userName);
    } catch (err: any) {
      message.error(err.message);
    }
    setLoading(false);
  });

  return (
    <CardLayout
      form={form}
      loading={loading}
      buttonText="Next"
      onSubmit={onSignin}
      title="Create your account"
      subTitle={
        <Fragment>
          Already have an account?
          <Link to="/signin">Log in</Link>
        </Fragment>
      }
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="firstName"
            rules={[
              {
                required: true,
                message: 'Please enter firstName'
              }
            ]}
          >
            <Input placeholder="First name" autoFocus />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="lastName"
            rules={[
              {
                required: true,
                message: 'Please enter lastName'
              }
            ]}
          >
            <Input placeholder="Last name" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="userName"
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
        <Input
          readOnly={readOnly}
          onFocus={cancelReadOnly}
          placeholder="Email address"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please enter password'
          },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
            message: 'Must contain uppercase and lowercase letters, numbers, and special characters with a length of no less than 8 digits.'
          }
        ]}
      >
        <Input.Password
          readOnly={readOnly}
          placeholder="Password"
          onFocus={cancelReadOnly}
        />
      </Form.Item>
    </CardLayout>
  );
}

export default Signin;