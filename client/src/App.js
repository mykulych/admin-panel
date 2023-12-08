import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./app/pages/Home";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { Layout } from "./app/components";

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
    </div>
  );
}

export default App;
