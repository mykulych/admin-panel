import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./app/pages/Home";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Layout } from "./app/components";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    id: "home",
    path: "/",
    Component: Home,
  },
]);

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Layout>
          <RouterProvider router={router} />
        </Layout>
      </Provider>
      <ToastContainer theme="dark" />
    </div>
  );
}

export default App;
