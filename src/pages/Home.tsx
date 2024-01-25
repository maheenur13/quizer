import { Divider } from "antd";
import { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ICategory, quizCategory } from "../../mockdata";
import { QuizDetails } from "@/interfaces";
import QuizPreview from "@/components/QuizPreview";
import { Navigation, Pagination, Virtual } from "swiper/modules";
import { handleCurrentAttemptedQuiz } from "@/store/features/quiz/quiz.actions";
import { useAppSelector } from "@/store/hook";
import { useNavigate } from "react-router-dom";

interface ILiveQuizType {
  value: ICategory;
  label: string;
  quizes: QuizDetails[];
}

const Home: FC = () => {
  const navigate = useNavigate();
  const { quizList } = useAppSelector((state) => state.quiz);
  const [liveQuizes, setLiveQuizes] = useState<ILiveQuizType[]>([]);
  useEffect(() => {
    const currentLiveQuizes = localStorage.getItem("liveQuizes");

    const finalLiveQuiz: QuizDetails[] = JSON.parse(
      currentLiveQuizes as string
    );
    const groupedQuizzes =
      quizCategory
        ?.map((category) => {
          const categoryQuizzes = finalLiveQuiz?.filter(
            (quiz) => quiz.quizCategory === category.value
          );
          return {
            value: category.value,
            label: category.label,
            quizes: categoryQuizzes,
          };
        })
        ?.filter((itm) => itm.quizes?.length > 0) || [];

    setLiveQuizes(groupedQuizzes);
  }, [quizList]);

  const handleOnConfirm = (quizItem: QuizDetails) => {
    const newQuizItem = { ...quizItem };
    newQuizItem.totalAttempts++;
    handleCurrentAttemptedQuiz(newQuizItem);

    navigate(`/questions/answer/${quizItem.key}`);
  };

  return (
    <div className="bg-slate-100 h-full">
      {liveQuizes?.length === 0 && (
        <h3 className="text-center p-5">No quiz Found!</h3>
      )}
      {liveQuizes.map((quiz) => {
        return (
          <div
            style={{
              padding: "1rem",
              maxWidth: "1500px",
              textAlign: "center",
              margin: "auto",
            }}
            key={quiz.value}
          >
            <h5 className="text-left font-semibold ml-2 ">
              {quiz.label} Quizes
            </h5>
            <Divider />
            <Swiper
              className="py-5"
              modules={[Virtual, Navigation, Pagination]}
              spaceBetween={50}
              slidesPerView={4}
              pagination={{ clickable: true }}
              // scrollbar={{ draggable: true }}
              navigation={true}
              virtual
              onSlideChange={() => console.log("slide change")}
              // onSwiper={(swiper) => console.log(swiper)}
            >
              {quiz.quizes.map((quizItem) => (
                <SwiperSlide key={quizItem.key}>
                  <QuizPreview
                    handleOnConfirm={handleOnConfirm}
                    quizItem={quizItem}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
