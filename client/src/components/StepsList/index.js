import React, { useEffect, useRef, useState } from "react";
import "antd/dist/antd.css";
// import "./index.css";
import { PlusOutlined } from "@ant-design/icons";
import { Tag as List } from "antd";
import { Input, Tooltip } from "antd";

//logic for antdesign "tag" aka "list" for ingredients
const StepsList = () => {
  const [stepItem, setStepItem] = useState([""]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [editInputIndex, setEditInputIndex] = useState(-1);
  const [editInputValue, setEditInputValue] = useState("");
  const inputRef = useRef(null);
  const editInputRef = useRef(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);

  const handleClose = (removedStep) => {
    const newStep = stepItem.filter((List) => List !== removedStep);
    console.log(newStep);
    setStepItem(newStep);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && stepItem.indexOf(inputValue) === -1) {
      setStepItem([...stepItem, inputValue]);
    }

    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newStep = [...stepItem];
    newStep[editInputIndex] = editInputValue;
    setStepItem(newStep);
    setEditInputIndex(-1);
    setInputValue("");
  };

  return (
    <>
      {stepItem.map((step, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={step}
              size="large"
              className="tag-input"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          );
        }
        const isLongStep = step.length > 20;
        const stepEl = (
          <List
            className="edit-tag"
            key={step}
            closable={index !== 0}
            onClose={() => handleClose(step)}
          >
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(step);
                  e.preventDefault();
                }
              }}
            >
              {isLongStep ? `${step.slice(0, 20)}...` : step}
            </span>
          </List>
        );
        return isLongStep ? (
          <Tooltip title={step} key={step}>
            {stepEl}
          </Tooltip>
        ) : (
          stepEl
        );
      })}
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          className="tag-input"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <List className="site-tag-plus" onClick={showInput}>
          <PlusOutlined /> New Step
        </List>
      )}
    </>
  );
};

export default StepsList;
