import Prompt from "../Prompt/Prompt";
import AOS from "aos";
import React, { useState, useEffect, useContext } from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import PromptLandContext from "../PromptLandContext";
import config from '../config'

const FollowingFeed = (props) => {
  const { isAuthenticated, user } = useAuth0();
  const [following, setFollowing] = useState([]);
  const [followersPrompts, setFollowersPrompts] = useState([]);
  const { prompts } = useContext(PromptLandContext);

  //check to see if user is following following_user
  useEffect(() => {
    const forUser = user.nickname;
    fetch(config.API_BASE_URL + `/all/${forUser}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(setFollowing)
      .then(console.log(following))
      .catch((error) => {
        console.error({ error });
      });
  }, []);

  useEffect(() => {
    console.log(prompts);
    let followingArray = [];
    following.map((f) => {
      followingArray.push(f.following_user);
    });
    console.log(followingArray);
    const findFollowersPrompts = prompts.filter((p) =>
      followingArray.includes(p.username)
    );
    setFollowersPrompts(findFollowersPrompts);
  }, [following]);

  AOS.init({
    delay: 200,
  });
  return (
    isAuthenticated && (
      <section className="PromptFeed">
        <div className="profile-header">
          <h2 className="prompts-by">Prompts from friends</h2>
        </div>
        <ul className="prompt-feed-list">
          {followersPrompts.map((prompt) => (
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
    )
  );
};

export default withAuthenticationRequired(FollowingFeed, {
  returnTo: '/following'
});
