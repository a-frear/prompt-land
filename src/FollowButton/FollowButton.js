import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const FollowButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated && <button className="follow-button">Follow</button>;
};

export default FollowButton;
