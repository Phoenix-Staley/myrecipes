import { Button, Form, Input, InputNumber, Select } from "antd";
import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";

const { Option } = Select;

const stripePromise = loadStripe(
  "pk_test_51LSu7dEiFhTTRayXOG1nRS5viPL5QLo2dUJrQEqDDtEhbfugXUmSk6yNln2LXZogY6nUP0fW9Qq7rJiwNcP6NiqW00fjf52PSv"
);

const colors = {
  lightGold: "#ECB365",
  darkBlue: "#041C32",
  textColor: "white",
};

const tabBorderStyle = "1px solid black";

const styles = {
  header: {
    margin: "2vh auto",
    textAlign: "left",
    backgroundColor: colors.lightGold,
    borderRadius: "15px 15px 15px 15px",
    padding: "1%",
    fontSize: "large",
    marginBottom: "0",
  },
  subtitle: {
    fontSize: "large",
  },
  selected: {
    backgroundColor: colors.darkBlue,
    color: colors.textColor,
    borderBottom: "0",
    width: "50%",
    cursor: "pointer",
  },
  statmentText: {
    color: "black",
  },
  subtitle: {
    backgroundColor: colors.darkBlue,
    color: "white",
    textAlign: "center",
    margin: "0 auto",
    marginBottom: "0",
    border: tabBorderStyle,
    fontSize: "x-large",
  },
};

const Donate = () => {
  const [selectedCharity, changeSelectedCharity] = useState({});

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
        changeSelectedCharity(charities[0]);
        return;

      case "FA":
        changeSelectedCharity(charities[1]);
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
    const charityName = document.querySelector(
      ".ant-select-selection-item"
    ).title;
    const donationAmount =
      100 *
      parseInt(
        document.querySelector("#control-hooks_donationAmt").value.split(" ")[1]
      );
    let charityUrl = charities[1].url;
    let charityLogo = charities[1].logo;
    let charityStatement = charities[1].statement;
    switch (charityName) {
      case "Action Against Hunger":
        charityUrl = charities[0].url;
        charityLogo = charities[0].logo;
        charityStatement = charities[0].statement;
        break;
      case "Feeding America":
        break;
    }
    console.log("purchase submitted");
    console.log("amt: ", donationAmount);
    console.log("charity: ", charityName);

    const data = {
      amount: donationAmount,
      charityName: charityName,
      charityUrl: charityUrl,
      charityLogo: charityLogo,
      charityStatement: charityStatement,
    };
    console.log(data);
    fetch("/create-session", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        window.location.assign(data.url);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    // stripePromise.then((res) => {
    //   res.redirectToCheckout({ sessionId: res.checkout.session });
    //   return;
    // });
  };

  return (
    <main>
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
      {selectedCharity.name ? (
        <div style={styles.header} className="charityHeader">
          <h1>{selectedCharity.name}</h1>
          <p style={styles.statmentText}>{selectedCharity.statement}</p>
          <a
            href={selectedCharity.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {selectedCharity.name} Homepage
          </a>
          <br />
          <img
            src={selectedCharity.logo}
            width="75"
            alt={`${selectedCharity.name} logo`}
          />
        </div>
      ) : (
        <div></div>
      )}
    </main>
  );
};

export default Donate;
