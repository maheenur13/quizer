import { dateToFormat } from "@/helpers";
import { QuizDetails } from "@/interfaces";
import { handleChangeQuizVisibility } from "@/store/features/quiz/quiz.actions";
import { useAppSelector } from "@/store/hook";
import { Button, Popconfirm, Space, Switch, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { FC } from "react";
import { quizCategory } from "../../mockdata";

type PropsType = {
  onDeleteQuiz: (quiz: QuizDetails, index: number) => void;
  handleEditQuiz: (quiz: QuizDetails, index: number) => void;
  handleAddQuestion: (quiz: QuizDetails) => void;
  handleEditQuestion: (quiz: QuizDetails) => void;
};

const QuizList: FC<PropsType> = ({
  onDeleteQuiz,
  handleEditQuiz,
  handleAddQuestion,
  handleEditQuestion,
}) => {
  const { quizList } = useAppSelector((state) => state.quiz);

  const columns: ColumnsType<QuizDetails> = [
    {
      title: "Q. No",
      dataIndex: "key",
      key: "key",
      sorter: (a, b) => a.key - b.key,
    },
    {
      title: "Title",
      dataIndex: "quizTitle",
      key: "quizTitle",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Category",
      dataIndex: "quizCategory",
      key: "quizCategory",
      render: (_value, record) => {
        return <Tag color="orange">{record.quizCategory}</Tag>;
      },
      filters: [
        ...quizCategory.map((itm) => ({ value: itm.value, text: itm.label })),
      ],

      filterMode: "tree",
      filterSearch: true,
      onFilter: (value: unknown, record) => {
        if (record.quizCategory === value) return true;
        return false;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (_value, record) => {
        return <Tag color="geekblue">{record.type}</Tag>;
      },
    },
    {
      title: "No of Question",
      dataIndex: "no_of_question",
      key: "no_of_question",
      render: (_value, record) => {
        return <p>{record.no_of_question || 0}</p>;
      },
      sorter: (a, b) => a.no_of_question - b.no_of_question,
    },
    {
      title: "Total Submission",
      dataIndex: "totalSubmissions",
      key: "totalSubmissions",
      render: (_value, record) => {
        return <p>{record.totalSubmissions || 0}</p>;
      },
      sorter: (a, b) =>
        Number(a.totalSubmissions || 0) - Number(b.totalSubmissions || 0),
    },
    {
      title: "Total Attempt",
      dataIndex: "totalAttempts",
      key: "totalAttempts",
      render: (_value, record) => {
        return <p>{record.totalAttempts || 0}</p>;
      },
      sorter: (a, b) =>
        Number(a.totalAttempts || 0) - Number(b.totalAttempts || 0),
    },
    {
      title: "QuizDetails",
      dataIndex: "quizDetails",
      key: "quizDetails",
      render: (_value, record) => {
        return (
          <div className="text-center">
            <Button
              disabled={
                record.totalAttempts === 0 || record.totalSubmissions === 0
              }
              type="primary"
              className="bg-black"
            >
              Details
            </Button>
          </div>
        );
      },
    },

    {
      title: "Published",
      dataIndex: "visibility",
      key: "visibility",
      render: (_value, record) => {
        return (
          <Switch
            onChange={(checked) => {
              handleChangeQuizVisibility(record.key, checked);
            }}
            className="bg-slate-400"
            value={record.visibility}
            disabled={record.no_of_question === 0 || !record.no_of_question}
          />
        );
      },
    },
    {
      title: "Published At",
      dataIndex: "publishedAt",
      key: "publishedAt",
      render: (_value, record) => {
        return (
          <p>{record.publishedAt ? dateToFormat(record.publishedAt) : ""}</p>
        );
      },
      sorter: (a, b) => {
        const isoDateString1 = a.publishedAt;
        const isoDateString2 = b.publishedAt;

        const date1 = new Date(isoDateString1 as string).getTime();
        const date2 = new Date(isoDateString2 as string).getTime();
        return date1 - date2;
      },
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      render: (_value, record) => {
        return <p>{record.duration + "m"}</p>;
      },
      sorter: (a, b) => Number(a.duration) - Number(b.duration),
    },

    {
      title: "Action",
      key: "action",
      width: 220,
      render: (value, record, index) => (
        <>
          <Space size="middle">
            <Button
              disabled={record.visibility}
              className="bg-green-600 text-white"
              style={{
                color: "white",
              }}
              onClick={() => handleAddQuestion(record)}
            >
              Add Question
            </Button>
            <Button
              disabled={record.visibility}
              className="bg-blue-800 text-white"
              style={{
                color: "white",
              }}
              onClick={() => handleEditQuestion(record)}
            >
              Edit Question
            </Button>
            <Button
              disabled={record.visibility}
              className="bg-blue-500 text-white "
              style={{
                color: "white",
              }}
              onClick={() => handleEditQuiz(record, index)}
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
          {record.visibility && (
            <p className="text-red-500 ms-2 ">
              * cant add or edit question or edit quiz when it is published!
            </p>
          )}
        </>
      ),
    },
  ];
  return (
    <div>
      <Table
        scroll={{
          x: 1700,
        }}
        columns={columns}
        dataSource={quizList}
        bordered
      />
    </div>
  );
};

export default QuizList;
