import React from "react";
import { Checkbox, Space } from "antd";

const CheckBoxFilter = ({ categoryList,searchItems}) => {
  console.log("categoryList222",categoryList)
  const onChange = (value) => {
    console.log("value.category",value.category)
    if (value.category === "category") {

    const updateList = categoryList?.filter((x)=>x.value === value.name)
    searchItems(updateList)
    console.log("updatelList",updateList)
    }
    console.log(value.category,"itemitem")
  };
  return (
    <>
      <Space direction="vertical">
        {categoryList.map((item,index) => {
          return (
            <>
              <Checkbox key={index} value={item} onChange={(e) => onChange(e.target.value)} >
                {item.category}
              </Checkbox>
            </>
          );
        })}
      </Space>
    </>
  );
};

export default CheckBoxFilter;