import { Button, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

const styles = {
  form: {
    marginTop: "25vh"
  }
}

const LoginForm = () => {
  const [formState, setFormState] = useState({
    email: "",
    password: ""
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [login] = useMutation(LOGIN);

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
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      showModal();
    }
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
      <h3 className="authLink">
        Don't have an account? <Link to="/signup">Sign up instead</Link>
      </h3>
      <Modal title="Wrong Email or Password" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} className="invalidFormAlert">
        <p>Please enter a valid email and password, then try again.</p>
      </Modal>
    </div>
  );
};

export default LoginForm;
