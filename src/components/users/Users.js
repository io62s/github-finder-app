import React from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import PropTypes from "prop-types";

function Users({ isLoading, users }) {
  return isLoading ? (
    <Spinner />
  ) : (
    <div className="grid-4">
      {users.map(user => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            name={user.login}
            avatar={user.avatar_url}
            url={user.html_url}
          />
        );
      })}
    </div>
  );
}

Users.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired
};

export default Users;
