import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const FollowButton = (props) => {
  const followsUser = props.followUser;
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const { following, setFollowing } = useState([]);
  const { isFollowing, setIsFollowing } = useState(false);

  //check to see if user is following following_user
  useEffect(() => {
    fetch(`https://shielded-inlet-60576.herokuapp.com/api/followers`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((follower) => {
        setFollowing([...following, follower]);
      })
      .catch((error) => {
        console.error({ error });
      });
  });

  useEffect(() => {
    const followingArray = following;
    const followingCheck = `"username": ${user},
  "following_user": ${followsUser}`;
    console.log(followingArray);
    if (
      followingArray.map((follows) => {
        follows.includes(followingCheck);
      })
    ) {
      setIsFollowing(true);
    }
    console.log(isFollowing);
  });

  const handleFollow = async (e) => {
    e.preventDefault();

    const token = await getAccessTokenSilently();
    const newFollow = {
      username: user.nickname,
      following_user: followsUser,
    };
    fetch(`https://shielded-inlet-60576.herokuapp.com/api/followers`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newFollow),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
        return res.json();
      })
      .then((follower) => {
        setFollowing([...following, follower]);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  return (
    isAuthenticated && (
      <button className="follow-button" onClick={(e) => handleFollow(e)}>
        Follow
      </button>
    )
  );
};

export default FollowButton;
