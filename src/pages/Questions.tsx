import { useAppSelector } from "@/store/hook";
import { FC } from "react";

const Questions: FC = () => {
  const { role } = useAppSelector((state) => state.user.user);
  console.log(role);

  return (
    <div>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
      <h2 className="text-black font-bold text-4xl">Questions</h2>
    </div>
  );
};

export default Questions;
