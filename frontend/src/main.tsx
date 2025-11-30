import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import router from "./Router.tsx";

createRoot(document.getElementById("root")!).render(
    <RouterProvider router={router} />
);
