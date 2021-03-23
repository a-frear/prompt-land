import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import config from '../config';
import { useHistory } from "react-router-dom";

const FollowButton = (props) => {
  const userToFollow = props.followUser;
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [following, setFollowing] = useState([]);
  const [isFollowing, setIsFollowing] = useState();
  const history = useHistory();

  useEffect(() => {
    const forUser = user.nickname;
    fetch(`${config.API_BASE_URL}/followers/follower/${forUser}`,
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
    console.log(following)
    const followingArray = following.map(f => {
      return f.followee;
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
    fetch(`${config.API_BASE_URL}/followers`, {
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
        return id = f.id;
      }
    });
    fetch(`${config.API_BASE_URL}/followers/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then(setIsFollowing(false))
      .then(history.push(`/`))
      .then(alert('User unfollowed!'))
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

export default FollowButton