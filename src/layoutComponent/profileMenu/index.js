import React, { useEffect, useState } from "react";
import { Button, Dropdown, message, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { SearchResults } from "./search/SearchResults ";
import {
  HomeOutlined
} from '@ant-design/icons';
import "./header.css"
const ProfileMenu = () => {
  const [toggle, setToggle] = useState("");
  useEffect(() => {
    // console.log(localStorage.getItem("token"), "local");
    if (localStorage.getItem("token")) {
      setToggle(true);
    }
  }, []);

  const navigate = useNavigate();
  // Handle logout event handle
  const logout = (e) => {
    e.preventDefault();
    console.log("Logout", e);
    // Clear data form storage
    localStorage.clear();
    sessionStorage.clear();
    message.success(`You have successfully logged out!`);
    navigate("/login");
    setToggle(false);
  };

  const items = [
    {
      key: "1",
      label: (
        <>
          {!toggle ? (
            <Link to="/login">
              <span>LogIn</span>
            </Link>
          ) : (
            <Link to="/" onClick={logout}>
              <span>Logout</span>
            </Link>
          )}
        </>
      ),
    },

  ];
  return (
    <>
      <Space direction="horizontal" >
        <div className="searchbar">

      <SearchResults />
        </div>

        {/* <div className="headerItem">
          <p>item</p>
          <p>item</p>
          <p>item</p>
        </div>
        <div className="headerAction">
        <HomeOutlined  style={{color:"white",fontSize:20}} />
        </div> */}
        <div className="headerButton">
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomLeft"
        >
          <Button type="primary">
            <span> Account</span>
          </Button>
        </Dropdown>
        </div>
       

      </Space>
    </>
  );
};

export default ProfileMenu;
