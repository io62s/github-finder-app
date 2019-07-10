import React, { Fragment, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import User from "./components/users/User";

import About from "./components/pages/About";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    isLoading: false,
    alert: null
  };

  searchUser = async user => {
    this.setState({
      isLoading: true
    });
    const response = await axios.get(
      `https://api.github.com/search/users?q=${user}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const data = await response.data.items;
    this.setState({
      users: data,
      isLoading: false
    });
  };

  getUser = async username => {
    this.setState({
      isLoading: true
    });
    const response = await axios.get(
      `https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const data = await response.data;
    this.setState({
      user: data,
      isLoading: false
    });
  };

  getUserRepos = async username => {
    this.setState({
      isLoading: true
    });
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    const data = await response.data;
    this.setState({
      repos: data,
      isLoading: false
    });
  };

  clearUsers = () => {
    this.setState({
      users: []
    });
  };

  setAlert = (msg, type) => {
    this.setState({
      alert: {
        msg,
        type
      }
    });
    setTimeout(() => {
      this.setState({
        alert: null
      });
    }, 2500);
  };

  render() {
    const clearBtn = this.state.users.length ? (
      <button
        style={{ marginBottom: "10px" }}
        className="btn btn-light btn-block"
        onClick={this.clearUsers}
      >
        Clear
      </button>
    ) : null;

    const { users, user, isLoading, alert, repos } = this.state;

    return (
      <Router>
        <div>
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Fragment>
                    <Search
                      searchUser={this.searchUser}
                      setAlert={this.setAlert}
                    />
                    {clearBtn}
                    <Users users={users} isLoading={isLoading} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    repos={repos}
                    loading={isLoading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
