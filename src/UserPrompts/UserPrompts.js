import { React, Component } from "react";
import Prompt from "../Prompt/Prompt";
import AOS from "aos";
import PromptLandContext from "../PromptLandContext";
import FollowButton from "../FollowButton/FollowButton";

class UserPrompts extends Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = PromptLandContext;

  render() {
    const { prompts = [] } = this.context;
    const userPrompts = prompts.filter(
      (p) => p.username === this.props.match.params.userId
    );
    AOS.init({
      delay: 200,
    });
    return (
      <section className="PromptFeed">
        <h2 className="prompts-by">
          Prompts by {this.props.match.params.userId}
        </h2>
        <FollowButton followUser={this.props.match.params.userId} />
        <ul className="prompt-feed-list">
          {userPrompts.map((prompt) => (
            <li key={prompt.id}>
              <div data-aos="fade-down">
                <Prompt
                  id={prompt.id}
                  username={prompt.username}
                  prompt={prompt.prompt}
                  modified={prompt.modified}
                  tags={prompt.tags}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

export default UserPrompts;
