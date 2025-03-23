import { useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  Select,
  Cascader,
  InputNumber,
} from "antd";
import LoginGoogle from "./LoginGoogle";


const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

const FormComponent = () => {
  const [status, setStatus] = useState("");
  const [form] = Form.useForm();

  const handleStatus = (e) => {
    console.log(e.target);

    form
    .validateFields()
    .then((values) => {
      console.log("Form Values:", values);
      // setIsModalOpen(false); // Close modal on successful submit
      form.resetFields(); // Reset form fields after submission
    })
    .catch((info) => {
      console.log("Validation Failed:", info);
    });
    if (true) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };
  return (
    <>
      <Form {...formItemLayout} form={form}>
        <Form.Item label="companyName" status={status}>
          <Input placeholder="CompanyName" onChange={handleStatus}  />
        </Form.Item>
        <button><LoginGoogle/></button>
      </Form>
    </>
  );
};

export default FormComponent;
