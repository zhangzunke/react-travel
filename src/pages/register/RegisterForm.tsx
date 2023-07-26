import { Form, Input, Button, Checkbox } from "antd";
import styles from "./RegisterForm.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const RegisterForm = () => {
  const nagigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      await axios.post("http://123.56.149.216:8080/auth/register", {
        email: values.username,
        password: values.password,
        confirmPassword: values.confirm
      });
      nagigate("/signIn");
    } catch (error) {
      alert("Register error!");
    }
  };
  const onFinishFailed = (errorInfo: any) => {};
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles["register-form"]}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        hasFeedback
        label="Confrim Password"
        name="confirm"
        rules={[
          { required: true, message: "Please input your confirm password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              } else {
                return Promise.reject("密码确认不一致！");
              }
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" {...tailLayout}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
