import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../layout/Spinner";
import GithubContext from "../../context/github/githubContext";

function Users() {
  const githubContext = useContext(GithubContext);

  const { isLoading, users } = githubContext;

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

export default Users;
