import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from "../types";

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    isLoading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //search user
  const searchUser = async user => {
    setIsLoading();
    const response = await axios.get(
      `https://api.github.com/search/users?q=${user}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const data = await response.data.items;
    dispatch({
      type: SEARCH_USERS,
      payload: data
    });
  };

  //get user
  const getUser = async username => {
    setIsLoading();
    const response = await axios.get(
      `https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const data = await response.data;
    dispatch({
      type: GET_USER,
      payload: data
    });
  };

  //get user repos
  const getUserRepos = async username => {
    setIsLoading();
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const data = await response.data;
    dispatch({
      type: GET_REPOS,
      payload: data
    });
  };

  //clear users
  const clearUsers = () =>
    dispatch({
      type: CLEAR_USERS
    });

  //set loading
  const setIsLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        isLoading: state.isLoading,
        searchUser,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
