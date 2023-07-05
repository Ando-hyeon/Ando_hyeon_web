import Router from "./router";
import { RouterProvider } from "react-router-dom";
import { GlobalStyle } from "./style/globalStyle";

function App() {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={Router} />
    </>
  );
}

export default App;
