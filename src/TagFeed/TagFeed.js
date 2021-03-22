import { React, Component } from "react";
import Prompt from "../Prompt/Prompt";
import AOS from "aos";
import PromptLandContext from "../PromptLandContext";

class TagFeed extends Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };
  static contextType = PromptLandContext;

  render() {
    const { prompts = [] } = this.context;
    const tagPrompts = prompts.filter((p) =>
      p.tags.includes(this.props.match.params.tagId)
    );
    AOS.init({
      delay: 200,
    });
    return (
      <section className="PromptFeed">
        <ul className="prompt-feed-list">
          {tagPrompts.map((prompt) => (
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

export default TagFeed;
