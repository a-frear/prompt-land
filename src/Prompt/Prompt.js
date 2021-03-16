import { React, Component } from "react";
import { Link } from "react-router-dom";

class Prompt extends Component {
  // static defaultProps ={
  //     onDeletePrompt: () => {},
  //     history: {
  //         goBack: () => {},
  //       },
  //   }
  // static contextType = PromptContext;
  // handleClickDelete = e => {
  // e.preventDefault()
  // const PromptId = this.props.id

  // fetch(config.API_ENDPOINT_notes + `/${noteId}`, {
  //     method: 'DELETE',
  //     headers: {
  //     'content-type': 'application/json'
  //     },
  // })
  //     .then(() => {
  //     this.context.deletePrompt(promptId)
  //     })
  //     .catch(error => {
  //     console.error({ error })
  //     })
  // }

  render() {
    const { prompt, modified, user, tags } = this.props;
    const splitDate = modified.split("");
    const spliceDate = splitDate.splice(0, 10);

    return (
      <div className="Prompt">
        <h2 className="user_name">
          <Link className="app_title" to={`/users/${user}`}>
            {user}
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
