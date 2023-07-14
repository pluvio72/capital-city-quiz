import { createBrowserRouter } from "react-router-dom";

import { StartPage, QuizPage, EndPage } from "../pages";

const routes = [
  {
    path: "/",
    element: <StartPage />
  },
  {
    path: "/quiz",
    element: <QuizPage />,
  },
  {
    path: "/end",
    element: <EndPage />,
  }
];

export const router = createBrowserRouter(routes);

export default router;