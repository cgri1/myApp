import React, { Component } from "react";
import { connect } from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import { withRouter } from "react-router";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";



class ScrumMasterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            index: 0,
            disable: false,
            vote: 0,
            voteList: props.votedList,
            storyList: props.storyList,
            endVote: false,
            finalValue: ""
        }
        this.getVotedList = this.getVotedList.bind(this)
        this.voted = this.voted.bind(this);
        this.endVote = this.endVote.bind(this);
        this.setFinalValue = this.setFinalValue.bind(this);
    }

    getVotedList() {
        var backendURL = 'http://localhost:8080/getVoted/'
        fetch(backendURL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: 0
            }),
        }).then((r) => {
            return r.json();
        }).then((rsp) => {
            if (rsp.success) {
                console.log("voteList : " + JSON.stringify(rsp))
                this.setState({
                    voteList: rsp.voteList,
                    storyList: rsp.list,
                    endVote: rsp.endVote,
                    index: rsp.indexOfStory
                })
            }
        }).catch((e) => {
            console.log("error" + e)
        });
    }

    voted(vote) {
        if (!this.state.disable) {
            this.setState({
                disable: true,
                vote: vote
            })
            fetch('http://localhost:8080/setVoted', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    scrumMaster: true,
                    vote: vote
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


    setFinalValue(event) {
        this.setState({
            finalValue: event.target.value
        })
    }

    endVote() {
        if (this.state.endVote) {
            fetch('http://localhost:8080/setStoryList', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    votedList: this.props.votedList,
                    finalValue: this.state.finalValue
                }),
            }).then((r) => {
                return r.json();
            }).then((rsp) => {
                if (rsp.success) {
                    console.log("Login Success");
                    this.setState({
                        disable: false,
                        vote: 0,
                        endVote: false
                    })
                } else {
                    console.log(rsp.message);
                }
            }).catch((e) => {
                console.log("Login Failure");
            });
        }
    }

    render() {
        this.getVotedList()
        return (
            <div className="App">
                <AppBar
                    style={{ backgroundColor: "#282c34" }}
                    position="static"
                > SCRUM POKER </AppBar>
                <span>Please share link of developers panel to the teammates <Link>http://localhost:3000/developer</Link> </span>
                <div style={{ marginLeft: "100px", marginTop: "150px" }}>
                    <TableContainer component={Paper} style={{ width: "400px", height: "500px" }}>
                        <Table style={{ width: "400px" }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Story List</TableCell>
                                    <TableCell align="right">Story Point</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.storyList.map(row => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.point}</TableCell>
                                        <TableCell align="right">{row.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div style={{
                    width: "350px",
                    top: "194px",
                    zIndex: "10",
                    position: "absolute",
                    left: "550px"
                }}>
                    <TableContainer component={Paper} style={{ width: "400px", height: "500px" }}>
                        <Table style={{ width: "400px" }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{this.props.storyList[this.state.index] && this.props.storyList[this.state.index].name}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <br />
                                <br />
                                <TableRow key={"1"}>
                                    <Button disabled={this.state.disable} variant="outlined" style={{ marginRight: "20px" }} onClick={() => { this.voted(1) }}>1</Button>
                                    <Button disabled={this.state.disable} variant="outlined" style={{ marginRight: "20px" }} onClick={() => { this.voted(2) }}>2</Button>
                                    <Button disabled={this.state.disable} variant="outlined" style={{ marginRight: "20px" }} onClick={() => { this.voted(3) }}>3</Button>
                                    <Button disabled={this.state.disable} variant="outlined" onClick={() => { this.voted(5) }}>5</Button>
                                </TableRow>
                                <br />
                                <TableRow key={"2"}>
                                    <Button disabled={this.state.disable} variant="outlined" style={{ marginRight: "20px" }} onClick={() => { this.voted(8) }}>8</Button>
                                    <Button disabled={this.state.disable} variant="outlined" style={{ marginRight: "20px" }} onClick={() => { this.voted(13) }}>13</Button>
                                    <Button disabled={this.state.disable} variant="outlined" style={{ marginRight: "20px" }} onClick={() => { this.voted(21) }}>21</Button>
                                    <Button disabled={this.state.disable} variant="outlined" onClick={() => { this.voted(34) }}>34</Button>
                                </TableRow>
                                <br />
                                <TableRow key={"3"}>
                                    <Button disabled={this.state.disable} variant="outlined" style={{ marginRight: "20px" }} onClick={() => { this.voted(55) }}>55</Button>
                                    <Button disabled={this.state.disable} variant="outlined" style={{ marginRight: "20px" }} onClick={() => { this.voted(89) }}>89</Button>
                                    <Button disabled={this.state.disable} variant="outlined" style={{ marginRight: "20px" }} onClick={() => { this.voted(144) }}>144</Button>
                                    <Button disabled={this.state.disable} variant="outlined" onClick={() => { this.voted("?") }}>?</Button>
                                </TableRow>
                            </TableBody>
                        </Table>
                        {this.state.disable && <span>{this.state.vote + " voted"}</span>}
                    </TableContainer>
                </div>
                <div style={{
                    width: "350px",
                    top: "194px",
                    zIndex: "10",
                    position: "absolute",
                    left: "1000px"
                }}>
                    <TableContainer component={Paper} style={{ width: "400px", height: "500px" }}>
                        <Table style={{ width: "400px" }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Scrum Master Panel</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.voteList.map(row => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{this.state.endVote ? row.point : row.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TextField id="outlined-basic" type="number" label="Final Value" variant="outlined" style={{ marginTop: "50px" }} onChange={this.setFinalValue} />
                        <br />
                        <Button variant="outlined" style={{ marginTop: "10px" }} onClick={this.endVote}>End of vote</Button>
                    </TableContainer>
                </div>
            </div >
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    arrayOfData: state.setData.data,
    votedList: state.setData.votedList,
    storyList: state.setData.storyList
});

ScrumMasterPage = withRouter(connect(mapStateToProps)(ScrumMasterPage));
export default ScrumMasterPage;
