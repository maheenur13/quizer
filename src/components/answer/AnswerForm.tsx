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
  title?: string;
  handleChange?: (
    e: RadioChangeEvent,
    question: IOptionType,
    options: IQuestionType["options"],
    index: number,
    title: string,
    questionIndex: number
  ) => void;
};

export const AnswerForm: FC<PropsType> = ({
  handleQuizSubmission,
  isTimeOut,
  questions,
  form,
  handleChange,
  mode = "create",
  title,
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
      <Col span={mode === "view" ? 22 : 16}>
        {mode === "create" && (
          <h5 className="text-xl font-semibold mb-3">{title}</h5>
        )}
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
              className={`${
                mode === "view"
                  ? question.mark === 0
                    ? "border border-red-500 bg-red-50"
                    : "border border-green-500 bg-green-50"
                  : "border bg-slate-100"
              } px-4 py-6 rounded shadow shadow-zinc-100 `}
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
              <Radio.Group key={question.key}>
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
                            question.title,
                            questionIndex
                          );
                        }
                      }}
                      key={option.optionName}
                      value={option.optionName}
                    >
                      <span
                        className={
                          option.isCorrect
                            ? "text-green-700"
                            : option.isSelected === true && option.isSelected
                            ? "text-red-700"
                            : ""
                        }
                      >{`${option.optionName}`}</span>
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
