import React, { useState } from "react";
import "./style.scss";

const Tabs = (props) => {
  const { tabIndex } = props;
  const [currentTab, setCurrentTab] = useState(0);
  const tabList = [
    {
      name: "Khóa học",
    },
    {
      name: " Danh sách thành viên",
    },
    {
      name: "Điểm số",
    },
  ];

  return (
    <div className="tabs">
      <ul
        className="d-flex justify-content-between align-items-center"
        style={{
          listStyleType: "none",
          width: "60%",
          height: 40,
        }}
      >
        {tabList.map((el, index) => (
          <li
            key={index}
            className="text-center cursor-pointer"
            style={{
              color: currentTab === index ? "white" : "#5762fb",
              width: "32%",
              backgroundColor: currentTab === index ? "#5762fb" : "white",
              padding: 8,
            }}
            onClick={() => {
              setCurrentTab(index);
              tabIndex(index);
            }}
          >
            {el.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;
