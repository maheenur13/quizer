/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOptionType, IQuestionType } from "@/interfaces";
import {
  Button,
  Col,
  Form,
  FormInstance,
  Radio,
  RadioChangeEvent,
  Row,
} from "antd";
import { FC } from "react";

type PropsType = {
  handleQuizSubmission?: (values: any) => void;
  isTimeOut?: boolean;
  questions: IQuestionType[];
  form?: FormInstance<any>;
  mode?: "view" | "create" | "edit";
  handleChange?: (
    e: RadioChangeEvent,
    question: IOptionType,
    options: IQuestionType["options"],
    index: number,
    title: string
  ) => void;
};

const AnswerForm: FC<PropsType> = ({
  handleQuizSubmission,
  isTimeOut,
  questions,
  form,
  handleChange,
  mode = "create",
}) => {
  const transformedData = [...questions].reduce((acc: any, item, index) => {
    const selectedOption: any = item.options?.find(
      (option) => option?.isSelected
    );
    acc[index] = { value: selectedOption?.optionName };
    return acc;
  }, {});

  return (
    <Row justify={"center"}>
      <Col span={mode === "view" ? 20 : 16}>
        <Form
          form={form && form}
          disabled={isTimeOut || mode === "view"}
          name="answers"
          layout="vertical"
          onFinish={handleQuizSubmission}
          initialValues={
            mode === "view"
              ? {
                  answers: transformedData,
                }
              : {}
          }
        >
          {questions.map((question, questionIndex) => (
            <Form.Item
              className="border px-4 py-6 rounded shadow shadow-zinc-100 bg-slate-100"
              name={[`answers`, `${questionIndex}`, "value"]}
              key={questionIndex}
              label={
                <h6 className="font-semibold">
                  {questionIndex + 1}. {question.title}
                </h6>
              }
              rules={[
                {
                  required: true,
                  message: `please select the answer`,
                },
              ]}
            >
              <Radio.Group key={questionIndex}>
                {question.options.map((option, index) => {
                  // console.log(option);

                  return (
                    <Radio
                      onChange={(e) => {
                        if (handleChange) {
                          handleChange(
                            e,
                            option,
                            question.options,
                            index,
                            question.title
                          );
                        }
                      }}
                      key={option.optionName}
                      value={option.optionName}
                    >
                      {`${option.optionName}`}
                    </Radio>
                  );
                })}
              </Radio.Group>
            </Form.Item>
          ))}
          {mode !== "view" && (
            <Form.Item>
              <Button
                className="bg-blue-500 w-full h-10"
                type="primary"
                htmlType="submit"
              >
                Submit Quiz
              </Button>
            </Form.Item>
          )}
        </Form>
      </Col>
    </Row>
  );
};

export default AnswerForm;
