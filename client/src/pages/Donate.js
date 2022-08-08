import { Button, Form, Input, InputNumber, Select } from "antd";
import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";

const { Option } = Select;

const stripePromise = loadStripe(
  "pk_test_51LSu7dEiFhTTRayXOG1nRS5viPL5QLo2dUJrQEqDDtEhbfugXUmSk6yNln2LXZogY6nUP0fW9Qq7rJiwNcP6NiqW00fjf52PSv"
);

const Donate = () => {
  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 6,
    },
  };
  const tailLayout = {
    wrapperCol: {
      offset: 6,
      span: 6,
    },
  };

  const charities = [
    {
      name: "Action Against Hunger",
      url: "https://www.actionagainsthunger.org/",
      logo: "https://www.actionagainsthunger.org/sites/all/themes/acf2014zen/images/svg/acf-mark.svg",
      statement:
        "Action Against Hunger is a global humanitarian organization that takes decisive action against the causes and effects of hunger. We save the lives of malnourished children. We ensure everyone can access clean water, food, training and healthcare. We enable entire communities to be free from hunger. Last year alone, Action Against Hunger served more than 25 million people in nearly 50 countries.",
    },
    {
      name: "Feeding America",
      url: "https://www.feedingamerica.org/",
      logo: "https://www.feedingamerica.org/themes/custom/ts_feeding_america/images/svgs/logo-2020.svg",
      statement:
        "In a country that wastes billions of pounds of food each year, it's almost shocking that anyone in America goes hungry. Yet every day, there are millions of children and adults who do not get the meals they need to thrive. We work to get nourishing food – from farmers, manufacturers, and retailers – to people in need. At the same time, we also seek to help our neighbors build a path to a brighter, food-secure future.",
    },
  ];

  const [form] = Form.useForm();

  const onCharityChange = (value) => {
    switch (value) {
      case "AAH":
        form.setFieldsValue({
          note: "",
        });
        return;

      case "FA":
        form.setFieldsValue({
          note: "",
        });
        return;
    }
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onAmtChange = (value) => {
    console.log("changed", value);
  };

  const submitForm = () => {
    console.log("payment submitted");
    console.log(
      "amt: ",
      document.querySelector("#control-hooks_donationAmt").value
    );
    console.log(
      "charity: ",
      document.querySelector(".ant-select-selection-item").title
    );
    stripePromise.then((res) => {
      // res.redirectToCheckout({ sessionId: data.checkout.session });
      return;
    });
  };

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="donationAmt"
        label="Donation Amount"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber
          defaultValue={10.0}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          onChange={onAmtChange}
        />
      </Form.Item>
      <Form.Item
        name="charity"
        label="Charity"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a option and change input text above"
          onChange={onCharityChange}
          allowClear
        >
          <Option value="AAH">Action Against Hunger</Option>
          <Option value="FA">Feeding America</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.charity !== currentValues.charity
        }
      ></Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" onClick={submitForm}>
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Donate;
