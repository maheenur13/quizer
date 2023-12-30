import { QuizDetails } from "@/interfaces";
import { Button, Popconfirm, Space, Switch, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { FC } from "react";

type PropsType = {
  quizes: QuizDetails[];
  onDeleteQuiz: (quiz: QuizDetails, index: number) => void;
};

const QuizList: FC<PropsType> = ({ quizes, onDeleteQuiz }) => {
  const columns: ColumnsType<QuizDetails> = [
    {
      title: "Title",
      dataIndex: "quizTitle",
      key: "quizTitle",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "quizDescription",
      key: "quizDescription",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (value, record) => {
        return <Tag color="geekblue">{record.type}</Tag>;
      },
    },
    {
      title: "No of Question",
      dataIndex: "no_of_question",
      key: "no_of_question",
      render: (value, record) => {
        return <p>{record.no_of_question || 0}</p>;
      },
    },
    {
      title: "Published",
      dataIndex: "visibility",
      key: "visibility",
      render: (value, record) => {
        return (
          <Switch
            className="bg-slate-400"
            value={record.visibility}
            disabled={record.no_of_question === 0 || !record.no_of_question}
          />
        );
      },
    },

    {
      title: "Action",
      key: "action",
      width: 220,
      render: (value, record, index) => (
        <Space size="middle">
          <Button
            className="bg-green-600 text-white"
            style={{
              color: "white",
            }}
          >
            Add Question
          </Button>
          <Button
            className="bg-blue-800 text-white"
            style={{
              color: "white",
            }}
          >
            Edit Question
          </Button>
          <Button
            className="bg-blue-500 text-white"
            style={{
              color: "white",
            }}
          >
            Edit Quiz
          </Button>
          <Popconfirm
            placement="topLeft"
            title="Delete the Quiz"
            description="Are you sure to delete this task?"
            okText="Yes"
            cancelText="No"
            okButtonProps={{
              style: {
                backgroundColor: "blue",
              },
            }}
            onConfirm={() => onDeleteQuiz(record, index)}
          >
            <Button danger type="primary" className="bg-green-600 text-white">
              Delete Quiz
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={quizes} bordered />
    </div>
  );
};

export default QuizList;
