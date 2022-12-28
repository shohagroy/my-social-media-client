import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" reverseOrder={false} />
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
