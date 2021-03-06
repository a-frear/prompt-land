import React, { useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import JSONPretty from 'react-json-pretty';
import PromptLandContext from "../PromptLandContext";
import Prompt from "../Prompt/Prompt";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  const { prompts } = useContext(PromptLandContext);

  const userPrompts = prompts.filter(function (prompt) {
    return prompt.user === user.nickname;
  });

  return (
    isAuthenticated && (
      <div className="profile">
        <div className="profile-header">
          <h2>{user.nickname}</h2>
          {/* <JSONPretty data={user} />
        {JSON.stringify(user, null, 2)} */}
        </div>
        <div className="users-prompts">
          <ul>
            {userPrompts.map((prompt) => (
              <li className="profile-prompt-list" key={prompt.id}>
                <Prompt
                  id={prompt.id}
                  user={prompt.user}
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

export default Profile;
