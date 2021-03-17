import { React, Component } from "react";
// import PromptLandContext from '../PromptLandContext';
// import { getPromptsFromFriends } from '../prompts-helpers';
import Prompt from "../Prompt/Prompt";
import AOS from "aos";
import PromptLandContext from "../PromptLandContext";

class PromptFeed extends Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = PromptLandContext;

  render() {
    const { prompts = [] } = this.context;
    AOS.init({
      delay: 200,
    });
    // const { user_id } = this.props.match.params
    // const { prompts=[] } = this.props.prompts
    // const promptsForFeed = getPromptsFromFriends(notes, user_id)

    return (
      <section className="PromptFeed">
        <ul className="prompt-feed-list">
          {prompts.map((prompt) => (
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

export default PromptFeed;
