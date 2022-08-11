import { Button, Form, Input, Modal, AutoComplete } from "antd";
import { Tag as List } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { POST_RECIPE } from "../utils/mutations";
import { QUERY_TAGS } from "../../utils/queries";

const { Option } = AutoComplete;

const styles = {
  form: {
    marginTop: "25vh",
  },
};

const PostRecipeForm = () => {
  const [formState, setFormState] = useState({
    description: "",
    title: "",
    ingredients: "",
    steps: "",
    image: "",
    tags: "",
    creator: "",
  });

  const { data } = useQuery(QUERY_TAGS);
  const allTags = data?.tags || [];
  const [tagsResult, setTagsResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [postRecipe, { error }] = useMutation(POST_RECIPE);

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
      const mutationResponse = await postRecipe({
        variables: {
          description: formState.description,
          title: formState.title,
          ingredients: formState.ingredients,
          steps: formState.steps,
          image: formState.image,
          tags: formState.tags,
          creator: Auth.getProfile().data.username,
        },
      });

      setFormState({
        description: "",
        title: "",
        ingredients: "",
        steps: "",
        image: "",
        tags: "",
        creator: "",
      });
    } catch (err) {
      showModal();
    }
  };

  const handleTagSearch = (value) => {
    let res = [];

    if (!value || !allTags[0]) {
      res = [];
    } else {
      res = allTags.filter((tag) => {
        console.log(tag.name);
        return tag.name.startsWith(value.toLowerCase());
      });
    }

    setTagsResult(res);
    setSearchTerm(value);
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
        <h3 className="formHeader">Post a New Recipe:</h3>
        <Form.Item
          label="Description"
          name="description"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please add a description of your recipe",
            },
          ]}
        >
          <Input name="description" onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Title"
          name="title"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please add a title for your recipe",
            },
          ]}
        >
          <Input name="title" onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Image"
          name="image"
          accept=".png"
          hasFeedback
          rules={[
            {
              message: "Please add an image of your recipe",
            },
          ]}
        >
          <Input name="image" onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Ingredients"
          name="ingredients"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please add the ingredients for your recipe",
            },
          ]}
        >
          <Tag name="ingredients" onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Steps"
          name="steps"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please add the steps of your recipe",
            },
          ]}
        >
          <Input name="steps" onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Recipe Tags" name="tags">
          <AutoComplete onChange={handleTagSearch} placeholder="Input here">
            {tagsResult.map((suggestion) => (
              <Option key={suggestion.name} value={suggestion.name}>
                {suggestion.name}
              </Option>
            ))}
          </AutoComplete>
          <Input name="tags" onChange={handleTagSearch} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Post Recipe
          </Button>
        </Form.Item>
      </Form>
      <Modal
        title="Invalid Entry"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        className="invalidFormAlert"
      >
        <p>
          Please check the form entries and ensure all are filled out correctly.
        </p>
      </Modal>
    </div>
  );
};

export default PostRecipeForm;
