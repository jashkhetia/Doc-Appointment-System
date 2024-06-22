import "../styles/RegisterStyles.css";
import { Form, Button, Checkbox, DatePicker, Input, Select, message } from "antd";
import axios from "axios";
import {Link, useNavigate}  from 'react-router-dom';
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
const Register = () => {
  const navigate = useNavigate();
  const dispatch =  useDispatch();

  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading( ));
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading( ));
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading( ));
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <div className="form-container">
      <header className="App-header">
        <Form
          autoComplete="off"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 25 }}
          onFinish={onfinishHandler}
          layout="vertical"
          className="register-form"
        >
          <h3 className="text-center">Registeration Form</h3>
          <Form.Item
            name="fullName"
            label="Full Name"
            rule={[
              {
                required: true,
                message: "Please enter your name",
              },
              { whitespace: true },
              { min: 3 },
            ]}
            hasFeedback
          >
            <Input placeholder="Enter Your Name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rule={[
              {
                required: true,
                message: "Please enter your email",
              },
              { type: "email", message: "Please enter a valid email" },
            ]}
            hasFeedback
          >
            <Input placeholder="Enter Your Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rule={[
              {
                required: true,
              },
              { min: 6 },
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Type your password" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={["password"]}
            rule={[
              {
                required: true,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    "The two passwords that you entered does not match."
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>

          <Form.Item name="gender" label="Gender" requiredMark="optional">
            <Select placeholder="Select your gender">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="dob"
            label="Date of Birth"
            rule={[
              {
                required: true,
                message: "Please provide your date of birth",
              },
            ]}
            hasFeedback
          >
            <DatePicker
              style={{ width: "100%" }}
              picker="date"
              placeholder="Select your Date Of Birth"
            />
          </Form.Item>

          <Link to="/login" className="m-2">
            Already user login here
          </Link>

          <Form.Item
            name="agreement"
            label = "agreement"
            wrapperCol={{ span: 24 }}
            valuePropName="checked"
            rule={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(
                        "To proceed, you need to agree with our terms and conditions"
                      ),
              },
            ]}
          >
            <Checkbox>
              {" "}
              Agree to our <a href="#">Terms and Conditions</a>
            </Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button block type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </header>
    </div>
  );
}

export default Register;