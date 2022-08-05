import { Button, Form, Input } from "antd";
import React, { useState } from "react";

const styles = {
  form: {
    marginTop: "25vh"
  }
}

const SignupForm = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: ""
  });

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    console.log("State changed:", formState);
  };

  return (
    <div className="formHolder">
      
      <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      style={styles.form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <h3 className="formHeader">Login:</h3>
      <Form.Item
        label="Email"
        name="email"
        hasFeedback
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input name="email" onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label="Password"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please input your password!",
          }
        ]}
      >
        <Input.Password name="password" onChange={handleChange} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default SignupForm;
