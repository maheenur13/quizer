import { QuizDetails } from "@/interfaces";
import { Form, Input, Modal, Radio } from "antd";
import { FC } from "react";

interface CollectionCreateFormProps {
  open: boolean;
  onCreate: (values: QuizDetails) => void;
  onCancel: () => void;
}

const QuizForm: FC<CollectionCreateFormProps> = ({
  open,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Quiz Details"
      okText="Create"
      centered
      okButtonProps={{
        style: {
          backgroundColor: "blue",
        },
      }}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ type: "multiple_choice" }}
      >
        <Form.Item
          name="quizTitle"
          label="Quiz Title"
          rules={[
            {
              required: true,
              message: "Please input the title of collection!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="quizDescription" label="Quiz Description">
          <Input type="textarea" />
        </Form.Item>
        <Form.Item
          name="type"
          className="collection-create-form_last-form-item"
        >
          <Radio.Group>
            <Radio value="multiple_choice">Multiple Choice</Radio>
            <Radio value="text_answer">Text Answer</Radio>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default QuizForm;
