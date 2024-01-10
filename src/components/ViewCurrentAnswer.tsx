import { IAnswerType } from "@/interfaces";
import AnswerForm from "@/pages/questions/AnswerForm";
import { Modal } from "antd";
import { Dispatch, FC, SetStateAction } from "react";

type PropsType = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: IAnswerType;
};

const ViewCurrentAnswer: FC<PropsType> = ({ open, setOpen, data }) => {
  return (
    <Modal
      destroyOnClose={true}
      title="Current Quiz Answer"
      open={open}
      onOk={() => {
        setOpen(false);
      }}
      width={600}
      onCancel={() => {
        setOpen(false);
      }}
    >
      <div className="my-6">
        <h2 className="ms-12 font-semibold mb-3 ">
          Quiz name: {data.quizTitle}
        </h2>
        <AnswerForm mode="view" questions={data.answer} />
      </div>
    </Modal>
  );
};

export default ViewCurrentAnswer;
