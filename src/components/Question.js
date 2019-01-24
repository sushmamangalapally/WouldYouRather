import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestionAnswer } from "../actions/questions";
import { Progress } from "reactstrap";
import {
  Card, CardHeader, CardBody, CardTitle, CardText
} from "reactstrap";
import { Redirect } from "react-router-dom";

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      selected: true,
      id: this.props.location.pathname.split("/questions/")[1],
      showPercentage: this.props.users[
        this.props.authedUser
      ].answers.hasOwnProperty(
        this.props.location.pathname.split("/questions/")[1]
      )
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value, selected: true });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;

    dispatch(handleAddQuestionAnswer(this.state.id, this.state.value));

    this.setState(() => ({
      showPercentage: true // Trigger redirect user to homepage
    }));
  }
  render() {
    const { questions, users, authedUser } = this.props;
    const { id, showPercentage } = this.state;

    if (questions[id] === undefined || questions[id] === null) {
      return <Redirect to="/404" />;
    }

    const getQuestion = questions[id];
    const allVotes = getQuestion.optionOneText.votes.length + getQuestion.optionTwoText.votes.length;
    const optOneVotes = getQuestion.optionOneText.votes.length;
    const optTwoVotes = getQuestion.optionTwoText.votes.length;
    const optOnePercentage = ((optOneVotes / allVotes) * 100).toFixed(2);
    const optTwoPercentage = ((optTwoVotes / allVotes) * 100).toFixed(2);

    const optionIncluded = Object.keys(users[authedUser]["answers"]).includes(getQuestion["id"]);
    let showOwnerVote = null;
    if (optionIncluded) {
      showOwnerVote = users[authedUser]["answers"][getQuestion["id"]];
    }

    return (
      <div className="quest">
        <Card>
          <CardHeader>{users[getQuestion.author].name} asks:</CardHeader>
          <CardBody className="row">
            <div className="col">
              <img
                src={users[getQuestion.author].avatarURL}
                alt={users[getQuestion.author].name}
                className="img-thumbnail rounded"
              />
            </div>
            <div className="col">
              {showPercentage ? (
                <div>
                  <CardTitle>Results:</CardTitle>
                  <div
                    className={showOwnerVote === "optionOneText" ? "true" : "false"}
                  >
                    <CardText>Would you rather {getQuestion.optionOneText.text}?</CardText>
                    <Progress color="success" value={optOnePercentage}>
                      {optOnePercentage}%
                    </Progress>
                    <CardText>
                      {optOneVotes} out of {allVotes}
                    </CardText>
                  </div>
                  <div
                    className={showOwnerVote === "optionTwoText" ? "true" : "false"}
                  >
                    <CardText>
                      Would you rather {getQuestion.optionTwoText.text}?
                    </CardText>
                    <Progress color="success" value={optTwoPercentage}>
                      {optTwoPercentage}%
                    </Progress>
                    <CardText>
                      {optTwoVotes} out of {allVotes}
                    </CardText>
                  </div>
                </div>
              ) : (
                <div>
                  <CardTitle>Would You Rather...</CardTitle>
                  <form onSubmit={this.handleSubmit}>
                    <input
                      type="radio"
                      name="site_name"
                      value={"optionOneText"}
                      onChange={this.handleChange}
                    />
                    <label>{getQuestion.optionOneText.text} </label>
                    <br/>
                    <input
                      type="radio"
                      name="site_name"
                      value={"optionTwoText"}
                      onChange={this.handleChange}
                    />
                    <label>{getQuestion.optionTwoText.text} </label>
                    <br />
                    <button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={!this.state.selected}
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </button>
                  </form>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

function mapStateToProps({ questions, authedUser, users, id }) {
  return {
    questions,
    authedUser,
    users
  };
}

export default connect(mapStateToProps)(Question);
