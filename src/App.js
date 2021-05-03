import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "./components/Home";

export const App = () => {
  return (
    <BrowserRouter>
      <Route path="/">
        <Home />
      </Route>
    </BrowserRouter>
  );
};
