import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ProtectedRoutes } from "./lib";
import { Login, ProductHistoryPage, ProductPage } from "./pages";
import { ThemeProvider } from "./components";
import { Toaster } from "@/components/ui/sonner";
import Layout from "./components/layout/Layout";
function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/login",
        element: <Login />,
      },
      {
        element: <ProtectedRoutes />,
        children: [
          {
            path: "/",
            element: <Layout />,
            children: [
              {
                path: "",
                element: <Navigate to={"/inventory"} />,
              },
              {
                path: "inventory",
                element: <ProductPage />,
              },
              {
                path: "inventory/product/:productId/history",
                element: <ProductHistoryPage />,
              },
            ],
          },
        ],
      },
    ],
    {
      future: {
        v7_relativeSplatPath: true,
        v7_partialHydration: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_skipActionErrorRevalidation: true,
      },
    }
  );
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
      <Toaster expand={false} richColors position="top-center" />
    </ThemeProvider>
  );
}

export default App;
