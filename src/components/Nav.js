import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class Nav extends Component {
  handleSignOut = e => {
    e.preventDefault();

    const { dispatch } = this.props;
    dispatch(setAuthedUser(null));
  };

  render() {
    const authedUser = this.props.users[this.props.authedUser];

    return (
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/" exact activeClassName="active">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/new" activeClassName="active">
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" activeClassName="active">
              Leader Board
            </NavLink>
          </li>
          <li>Hello, {authedUser.name}</li>
          <li>
            <button onClick={this.handleSignOut}>Sign Out</button>
          </li>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users: users
  };
}

export default connect(mapStateToProps)(Nav);
