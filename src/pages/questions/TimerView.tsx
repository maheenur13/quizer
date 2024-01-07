import { padZero } from "@/helpers";
import { useTimer } from "@/hooks/useTimer";
import { useAppSelector } from "@/store/hook";
import { Affix, Button } from "antd";
import { FC } from "react";

type PropsType = {
  handleTimeOut: () => void;
};

const TimerView: FC<PropsType> = ({ handleTimeOut }) => {
  const { currentAttemptedQuiz } = useAppSelector((state) => state.quiz);

  const [seconds] = useTimer({
    duration: currentAttemptedQuiz?.duration as number,
    currentAttemptedQuizKey: currentAttemptedQuiz?.key as number,
    handleTimerFinish: () => {
      //   alert("yesss");

      handleTimeOut();
      // Reset seconds
      console.log("Timer finished!");
    },
  });
  return (
    <div>
      <Affix
        style={{
          position: "fixed",
          top: 80,
          right: 400,
        }}
      >
        <Button
          className="bg-blue-600"
          type="primary"
          shape="circle"
          style={{
            width: 55,
            height: 55,
          }}
        >
          <div style={{ fontSize: "11px" }}>Time</div>
          {padZero(Math.floor(seconds / 60))}:{padZero(seconds % 60)}
        </Button>
      </Affix>
    </div>
  );
};

export default TimerView;
