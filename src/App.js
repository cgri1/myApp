import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";
import AppBar from '@material-ui/core/AppBar';
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router";
import * as data from "./redux/actions";
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionName: "",
      numberOfVoter: 0,
      storyList: ""
    }

    this.addStory = this.addStory.bind(this)
    this.setSessionName = this.setSessionName.bind(this)
    this.setNumberOfVote = this.setNumberOfVote.bind(this)
    this.startSession = this.startSession.bind(this)

  }

  addStory(event) {
    this.setState({
      storyList: event.target.value
    })
  }

  setSessionName(event) {
    if (event.target.value.length < 200) {
      this.setState({
        sessionName: event.target.value
      })
    }
  }

  setNumberOfVote(event) {
    if (parseInt(event.target.value) !== 0) {
      this.setState({
        numberOfVoter: event.target.value
      })
    }
  }

  startSession() {
    if (this.state.numberOfVoter !== 0 && this.state.sessionName !== "") {
      this.props.history.push('/scrummaster')
      let arrayOfData = []
      arrayOfData.push(this.state.sessionName)
      arrayOfData.push(this.state.numberOfVoter)
      arrayOfData.push(this.state.storyList)
      data.setData(arrayOfData)

      //initial vote status
      let arrayOfVoteStatus = []
      for (let x = 1; x <= this.state.numberOfVoter; x++) {
        this.arrayOfVoter = {}
        this.arrayOfVoter.name = "Voter " + x + " : "
        this.arrayOfVoter.status = "Not Voted"
        this.arrayOfVoter.point = "0"
        arrayOfVoteStatus.push(this.arrayOfVoter)
      }
      this.arrayOfVoter = {}
      this.arrayOfVoter.name = "Scrum Master : "
      this.arrayOfVoter.status = "Not Voted"
      this.arrayOfVoter.point = "0"
      arrayOfVoteStatus.push(this.arrayOfVoter)
      data.setVoteStatus(arrayOfVoteStatus)

      //initial storylist status
      this.storyList = this.state.storyList.split("\n")
      let arrayOfStoryStatus = []
      for (let x = 0; x < this.storyList.length; x++) {
        this.arrayOfVoter = {}
        this.arrayOfVoter.name = this.storyList[x]
        this.arrayOfVoter.point = " "
        this.arrayOfVoter.status = "Not Voted"
        arrayOfStoryStatus.push(this.arrayOfVoter)
      }
      data.setStoryList(arrayOfStoryStatus)

      fetch('http://localhost:8080/setData', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionName: this.state.sessionName,
          numberOfVoter: this.state.numberOfVoter,
          storyList: arrayOfStoryStatus,
          voteList: arrayOfVoteStatus
        }),
      }).then((r) => {
        return r.json();
      }).then((rsp) => {
        if (rsp.success) {
          console.log("Login Success");
        } else {
          console.log(rsp.message);
        }
      }).catch((e) => {
        console.log("Login Failure");
      });
    }
  }

  render() {
    return (
      <div className="App">
        <AppBar
          style={{ backgroundColor: "#282c34" }}
          position="static"
        > SCRUM POKER </AppBar>

        <div className="textField">
          <TextField id="outlined-basic" label="Session Name" variant="outlined" onChange={this.setSessionName} />
          <TextField id="outlined-basic" type="number" label="Number of Voters" variant="outlined" style={{ marginLeft: "300px" }} onChange={this.setNumberOfVote} />
        </div>
        <div >
          <TextareaAutosize style={{ width: "740px", height: "300px", marginTop: "50px", marginBottom: "30px" }} placeholder="Paste your story list" rowsMax={20} onChange={this.addStory} />
        </div>
        <Button variant="contained" onClick={this.startSession}>Start Session</Button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  arrayOfData: state.setData.data
});

App = withRouter(connect(mapStateToProps)(App));
export default App;
