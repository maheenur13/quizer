/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  Col,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { FC, useEffect } from "react";
import { QuizDetails } from "@/interfaces";
import { useAppSelector } from "@/store/hook";

type PropsType = {
  quizDetails: QuizDetails | null;
  form: FormInstance<any>;
};

const QuestionForm: FC<PropsType> = ({ quizDetails, form }) => {
  const { questionFormMode, isQuestionModalOpen } = useAppSelector(
    (state) => state.quiz
  );

  useEffect(() => {
    if (isQuestionModalOpen) {
      if (questionFormMode === "create") {
        form.setFieldsValue({
          questions: [
            {
              title: "",
              options: [],
              key: "0",
              type: "multiple_choice",
            },
          ],
        });
      } else if (quizDetails) {
        const newQuestion = [...quizDetails.questions].map((details) => {
          return {
            ...details,
            options: [
              {
                first: details.options[0].optionName,
                second: details.options[1].optionName,
                third: details.options[2].optionName,
                fourth: details.options[3].optionName,
              },
            ],
          };
        });
        form.setFieldsValue({ questions: newQuestion });
      }
    }
  }, [
    form,
    isQuestionModalOpen,
    questionFormMode,
    quizDetails,
    quizDetails?.questions,
  ]);
  // console.log(form.getFieldsValue());

  return (
    <Form
      labelCol={{ span: 6 }}
      layout="vertical"
      wrapperCol={{ span: 24 }}
      form={form}
      name="questionDetails"
      style={{ width: "100%" }}
      autoComplete="off"
      // initialValues={initialValues}
    >
      <Form.List name="questions">
        {(fields, { add, remove }) => (
          <div style={{ display: "flex", rowGap: 16, flexDirection: "column" }}>
            {fields.map((field) => (
              <Card
                size="small"
                title={`Question ${field.name + 1}`}
                key={field.key}
                extra={
                  fields.length > 1 && (
                    <CloseOutlined
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  )
                }
              >
                <Form.Item
                  label="Title"
                  name={[field.name, "title"]}
                  rules={[{ required: true, message: "Title Required" }]}
                >
                  <Input />
                </Form.Item>

                {quizDetails?.type === "multiple_choice" && (
                  <Form.Item label="Options" required>
                    <Form.List name={[field.name, "options"]}>
                      {() => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              rowGap: 16,
                            }}
                          >
                            {[
                              {
                                name: 0,
                                key: 0,
                                isListField: true,
                                fieldKey: 0,
                              },
                            ].map((subField) => (
                              <Space key={subField.key}>
                                <Form.Item
                                  // noStyle
                                  name={[subField.name, "first"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "1st option required!",
                                    },
                                  ]}
                                >
                                  <Input placeholder="first" />
                                </Form.Item>
                                <Form.Item
                                  // noStyle
                                  name={[subField.name, "second"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "2nd option required!",
                                    },
                                  ]}
                                >
                                  <Input placeholder="second" />
                                </Form.Item>
                                <Form.Item
                                  // noStyle
                                  rules={[
                                    {
                                      required: true,
                                      message: "3rd option required!",
                                    },
                                  ]}
                                  name={[subField.name, "third"]}
                                >
                                  <Input placeholder="third" />
                                </Form.Item>
                                <Form.Item
                                  // noStyle
                                  rules={[
                                    {
                                      required: true,
                                      message: "4th option required!",
                                    },
                                  ]}
                                  name={[subField.name, "fourth"]}
                                >
                                  <Input placeholder="fourth" />
                                </Form.Item>
                              </Space>
                            ))}
                            {/* <Button onClick={() => subOpt.add()}>Add</Button> */}
                          </div>
                        );
                      }}
                    </Form.List>
                  </Form.Item>
                )}
                <Row gutter={12}>
                  <Col span={12}>
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="Question Mark"
                      name={[field.name, "mark"]}
                      rules={[{ required: true, message: "Mark Required" }]}
                    >
                      <InputNumber min={0} className="w-full" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      labelCol={{ span: 24 }}
                      label="Correct Answer"
                      name={[field.name, "correctAnswer"]}
                      rules={[{ required: true, message: "Answer Required" }]}
                    >
                      <Select
                        allowClear
                        className="w-full"
                        options={[
                          { value: 1, label: "Option 1" },
                          { value: 2, label: "Option 2" },
                          { value: 3, label: "Option 3" },
                          {
                            value: 4,
                            label: "Option 4",
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            ))}

            <Button type="dashed" onClick={() => add()} block>
              + Add Question
            </Button>
          </div>
        )}
      </Form.List>
    </Form>
  );
};

export default QuestionForm;
