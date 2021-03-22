import React, { useContext } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import PromptLandContext from "../PromptLandContext";
import Prompt from "../Prompt/Prompt";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  const { prompts } = useContext(PromptLandContext);

  const userPrompts = prompts.filter(function (prompt) {
    return prompt.username === user.nickname;
  });

  return (
    isAuthenticated && (
      <div className="profile">
        <div className="profile-header">
          <h2 className="prompts-by">{user.given_name}'s prompts</h2>
        </div>
        <div className="users-prompts">
          <ul>
            {userPrompts.map((prompt) => (
              <li className="profile-prompt-list" key={prompt.id}>
                <Prompt
                  id={prompt.id}
                  username={prompt.username}
                  prompt={prompt.prompt}
                  modified={prompt.modified}
                  tags={prompt.tags}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
};

export default withAuthenticationRequired(Profile, {
  returnTo: '/profile'
});

