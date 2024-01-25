/* eslint-disable @typescript-eslint/no-explicit-any */
import { QuizDetails } from "@/interfaces";
import { Form, FormInstance, Input, InputNumber, Radio, Select } from "antd";
import { FC, useEffect } from "react";
import ClockCircleOutlined from "@ant-design/icons/ClockCircleOutlined";
import { useAppSelector } from "@/store/hook";
import { quizCategory } from "../../mockdata";

interface CollectionCreateFormProps {
  defaultValue: QuizDetails | null;
  form: FormInstance<any>;
}

const QuizForm: FC<CollectionCreateFormProps> = ({ defaultValue, form }) => {
  const { isQuizModalOpen, quizFormMode } = useAppSelector(
    (state) => state.quiz
  );

  useEffect(() => {
    if (isQuizModalOpen) {
      if (defaultValue && quizFormMode === "edit") {
        form.setFieldsValue(defaultValue);
      } else if (quizFormMode === "create") {
        form.setFieldsValue({ type: "multiple_choice" });
      }
    }
  }, [quizFormMode, defaultValue, form, isQuizModalOpen]);

  return (
    <Form form={form} layout="vertical" name="form_in_modal">
      <Form.Item
        name="quizCategory"
        label="Quiz Category"
        rules={[
          {
            required: true,
            message: "Please select quiz category!",
          },
        ]}
      >
        <Select style={{ width: "100%" }} options={quizCategory} />
      </Form.Item>
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
      <Form.Item
        name="duration"
        label="Quiz Duration (In minutes)"
        rules={[
          {
            required: true,
            message: "Please input duration!",
          },
        ]}
        initialValue={2}
      >
        <InputNumber
          style={{ width: "100%" }}
          prefix={<ClockCircleOutlined />}
          max={120}
          min={1}
          placeholder="duration in minutes"
        />
      </Form.Item>
      <Form.Item name="quizDescription" label="Quiz Description">
        <Input type="textarea" />
      </Form.Item>

      <Form.Item name="type" className="collection-create-form_last-form-item">
        <Radio.Group>
          <Radio value="multiple_choice">Multiple Choice</Radio>
          {/* <Radio value="text_answer">Text Answer</Radio> */}
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};

export default QuizForm;
