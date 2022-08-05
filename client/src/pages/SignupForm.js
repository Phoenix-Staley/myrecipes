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
    password: "",
    username: "",
    firstName: "",
    lastName: "",
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
      <h3 className="formHeader">Sign Up:</h3>
      <Form.Item
        label="Email"
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
        label="Username"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("username").length >= 8) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Your username must be at least 8 characters long!"));
            },
          })
        ]}
      >
        <Input name="username" onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label="First Name"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please input your first name!",
          },
        ]}
      >
        <Input name="firstName" onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label="Last Name"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please input your last name!",
          },
        ]}
      >
        <Input name="lastName" onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password").length >= 8) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Your password must be at least 8 characters long"));
            },
          })
        ]}
      >
        <Input.Password name="password" onChange={handleChange} />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("The two passwords that you entered do not match!"));
            },
          }),
        ]}
      >
        <Input.Password />
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
