import { React, Component } from "react";
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

    const newestPrompts = prompts.sort(
      (a, b) => Date.parse(b.modified) - Date.parse(a.modified)
    );

    return (
      <section className="PromptFeed">
        <ul className="prompt-feed-list">
          {newestPrompts.map((prompt) => (
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
