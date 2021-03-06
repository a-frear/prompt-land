import React from "react";
import ReactDOM from "react-dom";
import PromptFeed from "./PromptFeed";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <PromptFeed />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});