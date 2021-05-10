import { Component } from "react";
import { Route, Link } from "react-router-dom";
import PromptFeed from "./PromptFeed/PromptFeed";
import "./App.css";
import Nav from "./Nav/Nav";
import Profile from "./Profile/Profile";
import PromptLandContext from "./PromptLandContext";
import UserNav from "./UserNav/UserNav";
import NewPrompt from "./NewPrompt/NewPrompt";
import TagFeed from "./TagFeed/TagFeed";
import UserPrompts from "./UserPrompts/UserPrompts";
import landscape from "./img/landscape.jpg";
import landscapeMirror from "./img/landscape-mirror.jpg";
import Discover from "./Discover/Discover";
import FollowingFeed from "./FollowingFeed/FollowingFeed";
import LoginButton from "./LoginButton/LoginButton";
import config from "./config";
import Home from "./Home/Home";
import LoadingContainer from "./LoadingContainer/LoadingContainer";

class App extends Component {
  state = {
    prompts: [],
    error: null,
    loading: true,
  };

  setPrompts = (prompts) => {
    this.setState({
      prompts,
      error: null,
      loading: false,
    });
  };

  componentDidMount() {
    fetch(`${config.API_BASE_URL}/prompts`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setPrompts)
      .catch((error) => this.setState({ error }));
  }

  render() {
    const contextValue = {
      prompts: this.state.prompts,
    };
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
              className="landscape-mirror-img"
            />
          </div>
          <header className="App-header">
            <Link className="app_title" to={"/feed"}>
              <h1>Prompt Land</h1>
            </Link>
            <Nav />
          </header>
          <div className="userNav-header">
            <UserNav />
          </div>
          <div className={this.state.loading ? "loading" : "notLoading"}>
            {" "}
            <LoadingContainer />{" "}
          </div>
          ;
          <Route path="/profile" component={Profile} />
          <Route path="/feed" component={PromptFeed} />
          <Route path="/new-prompt" component={NewPrompt} />
          <Route path="/tags/:tagId" component={TagFeed} />
          <Route path="/users/:userId" component={UserPrompts} />
          <Route path="/discover" component={Discover} />
          <Route path="/following" component={FollowingFeed} />
          <Route path="/login" component={LoginButton} />
          <Route path="/home" component={Home} />
          <section className="home">
            <Link className="feed" to={"/feed"}>
              <h1 className="welcome">
                welcome to <span className="artists-prompts">prompt land</span>
              </h1>
              <h3 className="home-desc">
                a place to write and share artist prompts
              </h3>
              <img
                src={landscape}
                alt="prompt land landscape"
                className="home-img"
              />
            </Link>
          </section>
        </div>
      </PromptLandContext.Provider>
    );
  }
}

export default App;
