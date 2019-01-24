import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

class NewQuestion extends Component {
  state = {
    optionOneText: "", // keep track of OptionOne input
    optionTwoText: "", // keep track of OptionTwo input
    toHome: false // used to redirect user to home when question is added
  };

  handleOptionOneChange = (e) => {
      const inputTwo = e.target.value;
      
      this.setState(() => ({
        optionOneText: inputTwo
      }));
  }

  handleOptionTwoChange = (e) => {
      const inputTwo = e.target.value;
      
      this.setState(() => ({
        optionTwoText: inputTwo
      }));
  }

  handleSubmit = e => {
    // To handle form submit
    e.preventDefault();

    const { optionOneText, optionTwoText } = this.state;
    const { dispatch } = this.props;

    dispatch(handleAddQuestion(optionOneText, optionTwoText));

    this.setState(() => ({
      toHome: true // Trigger redirect user to homepage
    }));
  };

  render() {
    const { optionOneText, optionTwoText, toHome } = this.state;

    if (toHome === true) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <h3 className="center">Create New Question</h3>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="exampleText">Enter Option One Text</Label>
            <Input
              type="textarea"
              placeholder="Enter Option One Text Here"
              value={optionOneText}
              onChange={e => this.handleOptionOneChange(e)}
              className="textarea"
            />
          </FormGroup>
          <h3>OR</h3>
          <FormGroup>
            <Label for="exampleText">Enter Option Two Text</Label>
            <Input
              type="textarea"
              placeholder="Enter Option Two Text Here"
              value={optionTwoText}
              onChange={e => this.handleOptionTwoChange(e)}
              className="textarea"
            />
          </FormGroup>
          <Button
            className="btn"
            type="submit"
            disabled={optionOneText === "" || optionTwoText === ""}
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default connect()(NewQuestion);
