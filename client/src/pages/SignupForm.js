import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [addUser] = useMutation(ADD_USER);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = async (values) => {
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        username: formState.username,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      }
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const onFinishFailed = (errorInfo) => {
    showModal();
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
          label="Username"
          name="username"
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
          name="firstName"
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
          name="lastName"
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
      <Modal title="Invalid Credentials" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} className="invalidFormAlert">
        <p>Please enter valid credentials and try again.</p>
      </Modal>
    </div>
  );
};

export default SignupForm;
