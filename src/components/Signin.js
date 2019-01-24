import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { Card, CardHeader, CardText, CardBody} from 'reactstrap';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUser: 'sarahedo'
        };  
    }

    handleUser = (e) => {
        const selectedUserValue = e.target.value;
        this.setState(() => ({
            selectedUser: selectedUserValue
        }))
    }
    handleSignIn = (e) => {
        e.preventDefault();

        const { dispatch } = this.props;
        dispatch(setAuthedUser(this.state.selectedUser));
    }

    render() {
        const {selectedUser} = this.state;
        const {users} = this.props;
    return (
      <div>
      <Card>
        <CardBody className="border-info center">
          <CardHeader>
            <h4>Welcome to the Would You Rather App!</h4>
            <h5>Please sign in to continue</h5>
          </CardHeader>
        </CardBody>
        <div className="mx-auto center">
          <img width="30%" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" alt="React Logo" />
        </div>
        <CardBody>
          <CardText className="center text-info">Sign In</CardText>

          <select className="col center" value={selectedUser} onChange={this.handleUser}>
              <option value={null} disabled>Select User</option>
              {this.props.selectUsers.map((user) =>(
                  <option key={user} value={user}>{users[user].name}</option>
              ))}
          </select>
          <br/>
          <div className="col center">
        <button type="submit" disabled={!this.state.selectedUser}
        onClick={this.handleSignIn} className="btn btn-info"
        >
        Submit
        </button>
        </div>
        </CardBody>
      </Card>
      </div>
    )
  }
}
function mapStateToProps ({ users }) {
    return {
        users,
        selectUsers: Object.keys(users),
        loginUser: Object.keys(users)[0]
    }
  }

export default connect(mapStateToProps)(Signin)