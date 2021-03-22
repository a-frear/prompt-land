import { React, Component } from "react";
import { Link } from "react-router-dom";

class Prompt extends Component {
  render() {
    const { prompt, modified, username, tags } = this.props;
    const splitDate = modified.split("");
    const spliceDate = splitDate.splice(0, 10);

    return (
      <div className="Prompt">
        <h2 className="user_name">
          <Link className="username" to={`/users/${username}`}>
            {username}
          </Link>
        </h2>
        <h3 className="date">{spliceDate}</h3>
        <p className="prompt_content">{prompt}</p>
        <ul className="tag_list">
          {tags.map((tag) => (
            <li key={tag}>
              <Link className="tag-link" to={`/tags/${tag}`}>
                #{tag}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Prompt;
