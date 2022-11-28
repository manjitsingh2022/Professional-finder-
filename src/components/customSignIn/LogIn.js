import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Typography } from "antd";
import axios from "../../api/axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import { LogWrap } from "../../shared/commonStyle";
import { useNavigate } from "react-router-dom";
const { Title } = Typography;
const LogIn = () => {
  const { setAuth } = useContext(AuthContext);
  // const userRef = useRef();

  const errRef = useRef();
  const [form] = Form.useForm();
  // const [errMsg, setErrMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [LogInSubmit, setLogInSubmit] = useState(false);
  let navigate = useNavigate();
  // const [show, setShow] = useState(false);
  // useEffect(()=>{
  //   const auth = localStorage.getItem('user');
  //   if(auth==="user"){
  //     setShow(false)
  //     navigate("/categories")
  //   }if(!auth){
  //     navigate("/signup")
  //     setShow(true)
  //   }
  // })
  // useEffect(() => {
  //   setErrMsg("");
  // }, [email, password]);
  // useEffect(() => {
  //   userRef.current.focus();
  // }, [])
  const onFormSubmit = async () => {
    console.log(LogInSubmit, "LogInSubmit");
    form
      .validateFields()
      .then(async (values) => {
        // do something with values
        console.log("values", values);
        try {
          await axios.post("/login", values).then((response) => {
            console.log("response", response);
            // localStorage.setItem("token-info", JSON.stringify({response}));
            const token = response?.data?.token;
            localStorage.setItem("token", token);
            const roles = response?.data?.roles;
            setAuth({ email, password, roles, token });
            setAuthToken(token);
            setLogInSubmit(true);
            setEmail("");
            setPassword("");
            navigate("/");
            message.success(`${response.data.name} is loggged in`);
            window.location.reload(false);
          });
        } catch (err) {
          // if (!err?.response) {
          //   setErrMsg("No Server Response");
          // } else if (err.response?.status === 409) {
          //   setErrMsg("Username Taken");
          // } else {
          //   setErrMsg("Registration Failed");
          // }
          // errRef.current.focus();
          message.error("Login Error!");
          console.log("Error while submitting data!", err);
        } finally {
          setLogInSubmit(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else delete axios.defaults.headers.common["Authorization"];
  };

  const token = localStorage.getItem("token");
  if (token) {
    console.log(token, "token");
    setAuthToken(token);
  }

  // const onFinish = (values) => {
  //   console.log("Received values of form: ", values);
  // };

  const registerForm = () => {
    navigate(`/signup`);
  };
  return (
    <Row>
      <Col span={8} />
      <Col span={8}>
        <LogWrap>
          {/* <p
            // ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p> */}
          <Form
            form={form}
            className="login-form"
            autoComplete="off"
            // initialValues={{
            //   remember: true,
            // }}
            // onFinish={onFinish}
          >
            <Title
              level={3}
              style={{
                textAlign: "center",
                color: "#000",
                marginBottom: "15px",
                marginTop: "10px",
                fontWeight: "500",
              }}
            >
              Log In{" "}
            </Title>
            <Form.Item
              value="email"
              name="email"
              // ref={userRef}
              // label="Email"
              rules={[
                {
                  required: true,
                  message: "Please input your vaild Email!",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>

            <Form.Item
              // ref={userRef}
              value="password"
              name="password"
              // label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            {/* <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item> */}
            {/* {show !== "/category" ? <>  </>: null}  */}
            <Form.Item>
              <>
                <Button
                  loading={LogInSubmit}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={() => onFormSubmit()}
                  block
                >
                  LogIn
                </Button>
              </>
            </Form.Item>

            <Form.Item
              style={{
                textAlign: "center",
              }}
            >
              {`Need to create an account?   `}
              <Button style={{ padding: "1" }} onClick={registerForm}>
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </LogWrap>
      </Col>
      <Col span={8} />
    </Row>
  );
};
export default LogIn;
