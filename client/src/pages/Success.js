import React, { useEffect } from "react";
import { Button, Result } from "antd";

const styles = {
  contentStyle: {
    background: "#364d79",
  },
};

const goHome = () => {
  window.location.assign("/");
};

const Success = () => {
  useEffect(() => {
    async function delayRtnHome() {
      setTimeout(() => {
        window.location.assign("/");
      }, 5000);
    }

    delayRtnHome();
  }, []);

  return (
    <Result
      style={styles.contentStyle}
      status="success"
      title={`Thank you for your donation to ${"insert charity name here"}`}
      subTitle={`Order number: 2017182818828182881. You will be redirected to the home page in a few seconds, or you can click the button below to be redirected.`}
      extra={[
        <Button
          type="primary"
          key="console"
          id="successRtnHomeBtn"
          onClick={goHome}
        >
          Go Back to Homepage
        </Button>,
      ]}
    />
  );
};

export default Success;
