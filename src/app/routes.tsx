import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { CustomerPage } from "./pages/CustomerPage";
import { AdminPage } from "./pages/AdminPage";
import { RootLayout } from "./components/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "login", Component: LoginPage },
      { path: "signup", Component: SignupPage },
      { path: "customer", Component: CustomerPage },
      { path: "admin", Component: AdminPage },
    ],
  },
]);
