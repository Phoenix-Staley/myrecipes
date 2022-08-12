import React, { useEffect, useRef, useState } from "react";
import "antd/dist/antd.css";
// import "./index.css";
import { PlusOutlined } from "@ant-design/icons";
import { Tag as List } from "antd";
import { Input, Tooltip } from "antd";

//logic for antdesign "tag" aka "list" for ingredients
const IngredientList = () => {
  const [ingredientItem, setIngredientItem] = useState([""]);
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

  const handleClose = (addedIngredient) => {
    console.log(addedIngredient);
    const newIngredient = [];
    newIngredient.push(addedIngredient);

    console.log(newIngredient);
    setIngredientItem(newIngredient);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && ingredientItem.indexOf(inputValue) === -1) {
      setIngredientItem([...ingredientItem, inputValue]);
    }

    setInputVisible(false);
    setInputValue("");
  };

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value);
  };

  const handleEditInputConfirm = () => {
    const newIngredient = [...ingredientItem];
    newIngredient[editInputIndex] = editInputValue;
    setIngredientItem(newIngredient);
    setEditInputIndex(-1);
    setInputValue("");
    console.log(newIngredient);
  };

  return (
    <>
      {ingredientItem.map((ingredient, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={ingredient}
              size="small"
              className="tag-input"
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={() => handleClose(this.value)}
              // onClose={() => console.log(this.value)}
            />
          );
        }
        const isLongIngredient = ingredient.length > 20;
        const ingredientEl = (
          <List
            className="edit-tag"
            key={ingredient}
            closable={index !== 0}
            // onClose={() => handleClose(ingredient)}
          >
            <span
              onDoubleClick={(e) => {
                if (index !== 0) {
                  setEditInputIndex(index);
                  setEditInputValue(ingredient);
                  e.preventDefault();
                }
              }}
            >
              {isLongIngredient ? `${ingredient.slice(0, 20)}...` : ingredient}
            </span>
          </List>
        );
        return isLongIngredient ? (
          <Tooltip title={ingredient} key={ingredient}>
            {ingredientEl}
          </Tooltip>
        ) : (
          ingredientEl
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
          <PlusOutlined /> New Ingredient
        </List>
      )}
    </>
  );
};

export default IngredientList;
