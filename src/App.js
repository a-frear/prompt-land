import { Component } from "react";
import { Route, Link } from "react-router-dom";
import PromptFeed from "./PromptFeed/PromptFeed";
import "./App.css";
import Nav from "./Nav/Nav";
import Profile from "./Profile/Profile";
import PromptLandContext from "./PromptLandContext";
import prompts from "./prompts_dofers";
import UserNav from "./UserNav/UserNav";
import NewPrompt from "./NewPrompt/NewPrompt";
import TagFeed from "./TagFeed/TagFeed";
import UserPrompts from "./UserPrompts/UserPrompts";
import landscape from "./img/landscape.jpg";
import landscapeMirror from "./img/landscape-mirror.jpg";

class App extends Component {
  state = {
    prompts: prompts,
  };

  render() {
    const contextValue = {
      prompts: this.state.prompts,
    };
    console.log(contextValue);
    return (
      <PromptLandContext.Provider value={contextValue}>
        <div className="App">
          <div className="App-header">
            <img
              src={landscape}
              alt="prompt land landscape"
              className="landscape-img"
            />
            <img
              src={landscapeMirror}
              alt="prompt land mirror landscape"
              className="landscape-img"
            />
          </div>
          <header className="App-header">
            <Link className="app_title" to={"/"}>
              <h1>Prompt Land</h1>
            </Link>
            <Nav />
          </header>
          <div className="userNav-header">
            <UserNav />
          </div>
          <Route path="/profile" component={Profile} />
          <Route exact path="/" component={PromptFeed} />
          <Route path="/new-prompt" component={NewPrompt} />
          <Route path="/tags/:tagId" component={TagFeed} />
          <Route path="/users/:userId" component={UserPrompts} />
        </div>
      </PromptLandContext.Provider>
    );
  }
}

export default App;
