import React, { Component } from "react";
import AOS from "aos";
import Prompt from "../Prompt/Prompt";
import PromptLandContext from "../PromptLandContext";

class DiscoverList extends Component {
  static contextType = PromptLandContext;
  render() {
    const tagsArray = [];
    this.props.tags.map((tag) => {
      let tagLabel = tag.label.toLowerCase();
      tagsArray.push(tagLabel);
    });
    const { prompts = [] } = this.context;
    //figure out how to includes can be used with an array of words
    function contains(target, pattern) {
      let value = 0;
      pattern.forEach(function (word) {
        value = value + target.includes(word);
      });
      return value === 1;
    }
    const discoverPrompts = prompts.filter((p) => contains(p.tags, tagsArray));
    AOS.init({
      delay: 200,
    });
    return (
      <ul className="prompt-feed-list">
        {discoverPrompts.map((prompt) => (
          <li key={prompt.id}>
            <div data-aos="fade-down">
              <Prompt
                id={prompt.id}
                user={prompt.user}
                prompt={prompt.prompt}
                modified={prompt.modified}
                tags={prompt.tags}
              />
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default DiscoverList;
