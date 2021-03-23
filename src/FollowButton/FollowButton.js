import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { API_BASE_URL } from '../config'

const FollowButton = (props) => {
  const userToFollow = props.followUser;
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState();

  //check to see if user is following userToFollow
  useEffect(() => {
    const forUser = user.nickname;
    fetch(`${API_BASE_URL}/follower/${forUser}`,
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
    let followingArray = [];
    following.map((f) => {
      followingArray.push(f.followee);
    });
    console.log(followingArray);
    followingArray.includes(userToFollow)
      ? setIsFollowing(false)
      : setIsFollowing(true);
    console.log(isFollowing);
  }, [following]);

  const handleFollow = async (e) => {
    e.preventDefault();

    const token = await getAccessTokenSilently();
    const newFollow = {
      username: user.nickname,
      followee: userToFollow,
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

  const handleUnfollow = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    let id;
    following.map((f) => {
      if (f.followee === userToFollow) {
        id = f.id;
      }
    });
    fetch(`https://shielded-inlet-60576.herokuapp.com/api/followers/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then(setIsFollowing(false))
      .then(console.log)
      .catch((error) => {
        console.error({ error });
      });
  };

  const followText = "Follow";
  const unfollowText = "Unfollow";

  return (
    isAuthenticated && (
      <button
        className="follow-button"
        onClick={
          isFollowing ? (e) => handleFollow(e) : (e) => handleUnfollow(e)
        }
      >
        {isFollowing ? followText : unfollowText}
      </button>
    )
  );
};

export default FollowButton;