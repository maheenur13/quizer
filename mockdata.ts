export interface IUser {
  id: number | null;
  username: string | null;
  email: string | null;
  password: string | null;
  role: "admin" | "user" | null;
}

const userList: IUser[] = [
  {
    id: 1,
    username: "user1",
    email: "user1@example.com",
    password: "password1",
    role: "user",
  },
  {
    id: 2,
    username: "user2",
    email: "user2@example.com",
    password: "password2",
    role: "user",
  },
  {
    id: 3,
    username: "admin",
    email: "admin1@admin.com",
    password: "admin",
    role: "admin",
  },
  // Add more mock user data as needed
];

export type ICategory =
  | "SPORTS"
  | "SCIENCE"
  | "HISTORY"
  | "RELIGION"
  | "CULTURE"
  | "GENERAL";
export interface IQuizCategory {
  value: ICategory;
  label: string;
}

export const quizCategory: IQuizCategory[] = [
  { value: "SPORTS", label: "Sports" },
  { value: "SCIENCE", label: "Science" },
  { value: "HISTORY", label: "History" },
  { value: "RELIGION", label: "Religion" },
  { value: "CULTURE", label: "Culture" },
  { value: "GENERAL", label: "General" },
];

export default userList;
