import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function UserItem({ name, avatar }) {
  return (
    <div className="card text-center">
      <img
        className="round-img"
        src={avatar}
        alt="avatar"
        style={{ width: "100px" }}
      />
      <h3>{name}</h3>
      <div>
        <Link to={`/user/${name}`} className="btn btn-dark btn-sm my-1">
          More
        </Link>
      </div>
    </div>
  );
}

UserItem.propTypes = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default UserItem;
