import React, { useState, useEffect } from "react";
import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  AimOutlined,
  MailOutlined,
  RiseOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Steps,
  Select,
  Checkbox,
  message,
  InputNumber,
} from "antd";

import axios from "axios";
import "./Stepper.css";
import { API_URL } from "../constants/constant";

const { Step } = Steps;
const { Option } = Select;

const Stepper = () => {
  const [current, setCurrent] = useState(1);
  const [form] = Form.useForm();

  const [email, setEmail] = useState(null);
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    emailId: "",
    name: "",
    password: "",
    country: [], // will be array as using list to select and from api fetch
    role: "",
    crmCheck: "",
    companyName: "",
    companySize: "",
    numberOfPeople: 0,
    phone: "",
    goals: [],
    language: "",
  });

  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch existing user data
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}profile`);
        form.setFieldsValue(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [form]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        const countriesOption = res.data
          .map((item) => ({
            label: item.name.common,
            value: item.cca2,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        console.log(countriesOption);
        setFormData((prev) => ({
          ...prev,
          country: countriesOption,
        }));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const onFinish = async (values) => {
    console.log("Collected Values:", values, formData);

    try {
      const response = await axios.post(`${API_URL}signup`, formData);
      if (response.status === 200) {
        message.success("Signup successful!");
      }
    } catch (error) {
      console.error("API Error:", error.message);
    }
  };

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCheckboxChange = (checkedValues) => {
    console.log(checkedValues, "check");
    setFormData((prev) => ({
      ...prev,
      goals: checkedValues,
    }));

    console.log(formData, "formdata");
  };

  const sendOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}send-otp`, { email });
      if (response.data.success) {
        setIsOtpSent(true);
        setMessage("Otp sent to your mail!!!");
      } else {
        setMessage("Failed to send Otp!!!");
      }
    } catch (err) {
      setMessage("error sending Otp please try again !!! " + err.message);
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}verify-otp`, { email, otp });
      if (response.data.success) {
        setMessage("OTP Verified! Redirecting...");
        setCurrent(current + 1);
        // Redirect user to next step or dashboard
      } else {
        setMessage("Invalid OTP. Try again.");
      }
    } catch (error) {
      setMessage("Error verifying OTP.");
      console.error(error);
    }
    setLoading(false);
  };
  const steps = [
    {
      title: "Email Verification",
      icon: <MailOutlined />,

      content: (
        <>
          <div className="min-h-72 flex justify-center flex-col">
            <h2 className="text-xl font-bold text-center mb-4 ">
              {isOtpSent ? "Enter OTP" : "Verify Your Email"}
            </h2>
            {!isOtpSent ? (
              <>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, type: "email" }]}
                >
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <div>
                  <div className=" flex justify-items-start m-3 ml-2">
                    <input type="checkbox" />
                    <div className=" ml-5">
                      {"By Signing up, you accept our "}
                      <a>Terms of service</a> and <a>privacy policy</a>{" "}
                    </div>
                  </div>
                  <div className=" flex justify-items-start m-3 ml-2">
                    <input type="checkbox" />
                    <div className=" ml-5">
                      {
                        "Get helpful tips, product updates and exclusive offers via email"
                      }
                    </div>
                  </div>
                  <button
                    onClick={sendOtp}
                    className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Sent Otp"}
                  </button>
                </div>
              </>
            ) : (
              <div>
                <input
                  type="text"
                  className="p-2 rounded-md"
                  placeholder="Enter Otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <button
                  onClick={verifyOtp}
                  className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify Otp"}
                </button>
              </div>
            )}
          </div>

          {/* <div className="min-h-72 flex justify-center flex-col">
                  <>
                  <Form.Item
                  name="emailId"
                  label="Email"
                  rules={[{ required: true, type: "email", message: "Enter a valid email" }]}
                >
                  <Input
                    value={formData.emailId}
                    placeholder="Enter your Email"
                    onChange={(e) => handleChange("emailId",e.target.value)}
                  />
                </Form.Item>
                </>
          </div> */}
        </>
      ),
    },
    {
      title: "About you",
      icon: <UserOutlined />,
      content: (
        <>
          <Form.Item
            name="name"
            label="Your Name"
            
            rules={[{ required: true }]}
          >
            <Input
              value={formData.name}
               className="!inputback w-full !text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true }]}
            className="text-slate-800 text-sm font-medium mb-2 block"
          >
            <Input.Password
              value={formData.password}
              classNames="inputback"
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Mobile Number"
            name="phone"
            className="text-slate-800 text-sm font-medium mb-2 block"
            rules={[
              { required: true, message: "Mobile number is required" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit mobile number",
              }, // Validates 10 digits
            ]}
          >
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Enter your mobile number"
              maxLength={10}
              className="inputback !w-full !text-slate-800 !text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
            />
          </Form.Item>
          <Form.Item
            name="language"
            label="Language"
            className="text-slate-800 text-sm font-medium mb-2 block"
            rules={[{ required: true }]}
            placeholder="Enter your language"
          >
            <Input
              value={formData.language}
              className="inputback w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              onChange={(e) => handleChange("language", e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="job"
            label="Job"
            className="text-slate-800 text-sm font-medium mb-2 block"
            rules={[{ required: true }]}
          >
            <Select
              value={formData.role}
              onChange={(value) => handleChange("role", value)}
              placeholder="Select Job value"
              
              popupClassName="inputback"
              className="inputback w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
            >
              <Option value="developer">Developer</Option>
              <Option value="manager">Manager</Option>
              <Option value="designer">Designer</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="usedCRM"
            label="Have you used CRM?"
            className="text-slate-800 text-sm font-medium mb-2 block"
            rules={[{ required: true }]}
           
          >
            <Select
              value={formData.crmCheck}
              className="inputback w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              onChange={(value) => handleChange("crmCheck", value)}
              
               placeholder="Select a option"
            >
              <Option value="yes">Yes</Option>
              <Option value="no">No</Option>
            </Select>
          </Form.Item>
        </>
      ),
    },
    {
      title: "Your company",
      icon: <RiseOutlined />,
      content: (
        <>
          <Form.Item
            name="companyName"
            label="Company Name"
            rules={[{ required: true }]}
            className="text-slate-800 text-sm font-medium mb-2 block"
          >
            <Input
              value={formData.companyName}
              className="inputback test w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              onChange={(e) => handleChange("companyName", e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="companySize"
            label="Company Size"
            rules={[{ required: true }]}
            className="text-slate-800 text-sm font-medium mb-2 block"

          >
            <Select
              value={formData.companySize}
              onChange={(value) => handleChange("companySize", value)}
              placeholder="Select company size"
              className="inputback w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
            >
              <Option value="small">Small (1-10 employees)</Option>
              <Option value="medium">Medium (11-50 employees)</Option>
              <Option value="large">Large (51+ employees)</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true }]}
            className="text-slate-800 text-sm font-medium mb-2 block"
          >
            <Select
              showSearch
              placeholder="Select country"
              options={formData.country}
              value={selectedCountry}
              className="inputback w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              onChange={(value) => setSelectedCountry(value)}
              filterOption={(input, option) => {
                option.label.toLowerCase().includes(input.toLocaleLowerCase());
              }}
              onSearch={(value) => {
                if (!value) setSelectedCountry(undefined);
              }}
            />
          </Form.Item>
          <Form.Item
            name="numberOfPeople"
            label="Number of People"
            rules={[{ required: true, type: "number", min: 1 }]}
            className="text-slate-800 text-sm font-medium mb-2 block"
          >
            <InputNumber
              value={formData.numberOfPeople}
              
              className="inputback w-full text-slate-800 text-sm px-4 py-3 rounded focus:bg-transparent outline-blue-500 transition-all"
              onChange={(value) => handleChange("numberOfPeople", value)}
              min={1}
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Your goals",
      icon: <AimOutlined />,
      content: (
        <>
          <Form.Item
            name="goals"
            className="text-slate-800 text-sm font-medium mb-2 block"
            label="What would like to focus on during the trail?"
          >
            <Checkbox.Group
              className="flex flex-col "
              value={formData.goals}
              onChange={handleCheckboxChange}
            >
              <div className="boxyourgoal hover:bg-blue-100 shadow-2xs">
                <Checkbox value="freeTrial">Free Trial</Checkbox>
              </div>
              <div className="boxyourgoal hover:bg-blue-100 shadow-2xs">
                {" "}
                <Checkbox value="getCRM">Get CRM</Checkbox>
              </div>
              <div className="boxyourgoal hover:bg-blue-100 shadow-2xs">
                {" "}
                <Checkbox value="getSales">Get Sales</Checkbox>
              </div>
              <div className="boxyourgoal hover:bg-blue-100 shadow-2xs">
                {" "}
                <Checkbox value="getLeads">Get Leads</Checkbox>
              </div>
            </Checkbox.Group>
          </Form.Item>
        </>
      ),
    },
  ];
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
    icon: item.icon,
  }));

  const next = () => {
    setCurrent(current + 1);
  };
  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Steps current={current}>
          {steps.map((step, index) => (
            <Step key={index} title={step.title} icon={step.icon} />
          ))}
        </Steps>
        <div className="my-4 min-h-80">{steps[current].content}</div>
        <div className="flex justify-between mt-32">
          {current > 0 && (
            <Button onClick={() => setCurrent(current - 1)}>Previous</Button>
          )}
          {current < steps.length - 1 && current >= 0 && (
            <Button onClick={() => setCurrent(current + 1)}>Next</Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" htmlType="submit">
              Sign up
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};
export default Stepper;
