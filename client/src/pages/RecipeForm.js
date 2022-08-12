import { Button, Form, Input, Modal, AutoComplete } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { POST_RECIPE } from "../utils/mutations";
import { QUERY_TAGS } from "../utils/queries";
import IngredientList from "../components/IngredientList";
import StepsList from "../components/StepsList";
import ImageUpload from "../components/ImageUpload";

const { Option } = AutoComplete;

const styles = {
  form: {
    marginTop: "25vh",
  },
  textarea: {
    width: "100%",
  },
  tags: {
    color: "white",
  },
};

const PostRecipeForm = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [formState, setFormState] = useState({
    description: "",
    title: "",
    ingredients: [],
    steps: [],
    image: imageUrl,
    tags: [],
    creator: "",
  });

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [postRecipe, { error }] = useMutation(POST_RECIPE);

  const { loading, data } = useQuery(QUERY_TAGS);
  const tagObjs = data?.tags || [];

  const navigate = useNavigate();

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
      console.log(values);
      let listedIngredients = formState.ingredients.split("\n");
      let listedSteps = formState.steps.split("\n");

      console.log({
        variables: {
          description: formState.description,
          title: formState.title,
          ingredients: listedIngredients,
          steps: listedSteps,
          image: imageUrl,
          tags: formState.tags,
          creator: Auth.getProfile().data._id,
        },
      });

      const mutationResponse = await postRecipe({
        variables: {
          recipeData: {
            description: formState.description,
            title: formState.title,
            ingredients: listedIngredients,
            steps: listedSteps,
            image: imageUrl,
            tags: formState.tags,
            creator: Auth.getProfile().data._id,
          },
        },
      });

      redirect();
    } catch (err) {
      showModal();
    }
  };

  const onFinishFailed = (errorInfo) => {
    showModal();
  };

  const redirect = (event) => {
    navigate(`/me`);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const updateTagArr = async (tagId) => {
    let tagArr = formState.tags;
    if (tagArr.indexOf(tagId) === -1) {
      tagArr.push(tagId);
    } else {
      tagArr.splice(tagArr.indexOf(tagId), 1);
    }
    await setFormState({
      ...formState,
      tags: tagArr,
    });

    console.log(formState.tags);
  };

  //   const pushSteps = async (newSteps) => {
  //     // let steps = formState.steps;

  //     newSteps.split("/n");
  //     console.log(newSteps);
  //   };

  return (
    <div className="formHolder">
      <Form
        name="basic"
        labelCol={{
          span: 8,
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
          label="Title"
          name="title"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please add a title for your recipe",
            },
          ]}
          onChange={handleChange}
        >
          <Input name="title" />
        </Form.Item>

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
          onChange={handleChange}
        >
          <Input name="description" />
        </Form.Item>

        <Form.Item label="Image" name="image" hasFeedback>
          <ImageUpload getUrlFromS3={setImageUrl} />
        </Form.Item>

        <Form.Item
          label="Ingredients"
          name="ingredients"
          hasFeedback
          onChange={handleChange}
        >
          <textarea name="ingredients" style={styles.textarea}>
            Add the ingredients of your recipe here, with each ingredient on a
            new line.
          </textarea>
        </Form.Item>

        <Form.Item
          label="Steps"
          name="steps"
          hasFeedback
          onChange={handleChange}
        >
          <textarea name="steps" style={styles.textarea}>
            Add the steps of your recipe here, with each step on a new line.
          </textarea>
        </Form.Item>

        <Form.Item label="Recipe Tags" name="tags">
          {loading ? (
            <div>loading...</div>
          ) : (
            tagObjs.map((tag) => {
              return (
                <div key={tag._id} style={styles.tags}>
                  {/* {console.log(this)} */}
                  <input
                    type="checkbox"
                    onClick={() => updateTagArr(tag._id)}
                  ></input>
                  <label>{tag.name}</label>
                </div>
              );
            })
          )}
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
          Please check the form entries and ensure all fields are filled out
          correctly.
        </p>
      </Modal>
    </div>
  );
};

export default PostRecipeForm;

{
  /* <AutoComplete onChange={handleTagSearch} placeholder="Input here">
              {tagsResult.map((suggestion) => (
                <Option key={suggestion.name} value={suggestion.name}>
                  {suggestion.name}
                </Option>
              ))}
            </AutoComplete>{" "} */
}
{
  /* <Input name="tags" onChange={handleTagSearch} /> */
}
