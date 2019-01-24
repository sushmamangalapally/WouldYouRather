import React, { Component } from "react";
import { connect } from "react-redux";
import {
  TabContent, TabPane,
  Nav, NavItem, NavLink,
  Card, CardHeader, CardBody, CardTitle, CardText,
  Button, Row, Col
} from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1"
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const {
      users,
      answeredQuestionsArr,
      unansweredQuestionsArr,
      questions
    } = this.props;

    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "1" })}
              onClick={() => {
                this.toggle("1");
              }}
            >
              Unanswered Questions
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Answered Questions
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                {unansweredQuestionsArr.map(id => (
                  <Card key={id}>
                    <CardHeader>
                      {users[questions[id].author].name} asks:
                    </CardHeader>
                    <CardBody className="row">
                      <div className="col">
                        <img
                          src={users[questions[id].author].avatarURL}
                          alt={users[questions[id].author].name}
                          className="img-thumbnail rounded"
                        />
                      </div>
                      <div className="col">
                        <CardTitle>Would You Rather...</CardTitle>
                        <CardText>
                          {questions[id].optionOneText.text} or{" "}
                          {questions[id].optionTwoText.text}{" "}
                        </CardText>

                        <Link
                          to={`/questions/${id}`}
                          className="questions"
                          answered="false"
                        >
                          <Button color="info" size="lg">
                            View Poll
                          </Button>
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                Answered Questions
                {answeredQuestionsArr.map(id => (
                  <Card key={id}>
                    {/* <li key={id}> */}
                    <CardHeader>
                      {users[questions[id].author].name} asks:
                    </CardHeader>
                    <CardBody className="row">
                      <div className="col">
                        <img
                          src={users[questions[id].author].avatarURL}
                          alt={users[questions[id].author].name}
                          className="img-thumbnail rounded"
                        />
                      </div>
                      <div className="col">
                        <CardTitle>Would You Rather...</CardTitle>
                        <CardText>
                          {questions[id].optionOneText.text} or{" "}
                          {questions[id].optionTwoText.text}{" "}
                        </CardText>
                        {/* <Button color="success" size="lg">View Poll</Button> */}
                        <Link
                          to={`/questions/${id}`}
                          className="questions"
                          answered="true"
                        >
                          <Button color="success" size="lg">
                            View Poll
                          </Button>
                        </Link>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

function mapStateToProps({ questions, authedUser, users }) {
  const answeredQuestionsArr = Object.keys(users[authedUser].answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );
  const unansweredQuestionsArr = Object.keys(questions)
    .filter(id => !answeredQuestionsArr.includes(id))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  return {
    answeredQuestionsArr,
    unansweredQuestionsArr,
    questions,
    authedUser,
    users
  };
}

export default connect(mapStateToProps)(Dashboard);
