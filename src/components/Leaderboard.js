import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card, CardImg, CardBody, CardText,
  Col, Row,
} from "reactstrap";

class Leaderboard extends Component {
  render() {
    const { users } = this.props;
    const allUsers = Object.keys(users);
    allUsers.map(
        user =>
          (users[user]["totalscores"] =
            Object.keys(users[user].answers).length +
            users[user].questions.length)
    );
    

    let allSortUsers = {};

    for (let name in users) {
      allSortUsers[name] = users[name]["totalscores"];
    }

    var usersSorted = Object.keys(allSortUsers).sort(function(a, b) {
      return allSortUsers[b] - allSortUsers[a];
    });

    return (
      <div>
        <h3 className="center">Leader Board</h3>

        {usersSorted.map(user => (
          <Card key={user}>
            <Row>
              <Col xs="6">
                <CardImg
                  top
                  width="30%"
                  src={users[user].avatarURL}
                  alt={users[user].name}
                />
              </Col>
              <Col xs="6">
                <CardBody>
                  <h3>{users[user].name}</h3>
                  <CardText>
                    Answered Questions: {Object.keys(users[user].answers).length}
                  </CardText>
                  <CardText>
                    Created Questions: {users[user].questions.length}
                  </CardText>
                  <h2>
                    Score: {Object.keys(users[user].answers).length + users[user].questions.length}
                  </h2>
                </CardBody>
              </Col>
            </Row>
          </Card>
        ))}
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users
  };
}
export default connect(mapStateToProps)(Leaderboard);
