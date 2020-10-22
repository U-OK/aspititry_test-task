import React, { useEffect } from "react";
import { Modal, Input, DatePicker, InputNumber, Form, Radio } from "antd";

import moment from "moment";

const ModalForm = ({ isOpen, handleOk, handleCancel, title, values }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...values,
      date: values.date && moment(`${values.date}`, "YYYY-MM-DD"),
    });
  }, [values]);

  return (
    <Modal
      title={title || "Title"}
      visible={isOpen}
      onCancel={handleCancel}
      onOk={async () => {
        form
          .validateFields()
          .then((formValues) => {
            const valueOfDate = formValues.date.format("YYYY-MM-DD");

            form.resetFields();
            handleOk({ ...formValues, date: valueOfDate, id: values.id });
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      forceRender
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 17 }}
        layout="horizontal"
        onFinish={() => handleOk(values)}
        onCancel={handleCancel}
      >
        <Form.Item
          label="Workout type"
          name="workoutType"
          rules={[{ required: true, message: "Please choose your activity!" }]}
        >
          <Radio.Group>
            <Radio.Button value="bicycling">Bicycling</Radio.Button>
            <Radio.Button value="running">Running</Radio.Button>
            <Radio.Button value="walking">Walking</Radio.Button>
            <Radio.Button value="skiing">Skiing</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Distance"
          name="distance"
          rules={[{ required: true, message: "Please enter your distance!" }]}
        >
          <InputNumber min="0" />
        </Form.Item>

        <Form.Item
          label="Date"
          name="date"
          rules={[
            { required: true, message: "Please choose date your workout!" },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item label="Comment" name="comment">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalForm;
