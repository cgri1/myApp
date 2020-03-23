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

class Developer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disable: false,
            vote: 0,
            storyList: props.storyList,
            index: 0
        }

        this.voted = this.voted.bind(this);
        this.getVotedList = this.getVotedList.bind(this)
        this.endStoryList = this.endStoryList.bind(this)
        this.getVotedList()
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
                    vote: vote,
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
                console.log("endStoryList : " + rsp.endStoryList)
                this.setState(prevState => {
                    return {
                        storyList: rsp.list,
                        index: rsp.indexOfStory,
                        disable: !rsp.endStoryList ? prevState.disable : false
                    }
                })

                if (rsp.endStoryList) {
                    this.endStoryList()
                }
            }
        }).catch((e) => {
            console.log("error" + e)
        });
    }

    endStoryList() {
        var backendURL = 'http://localhost:8080/getStoryList/'
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
        }).catch((e) => {
        });
    }

    render() {
        this.getVotedList()
        return (
            <div className="App">
                <AppBar
                    style={{ backgroundColor: "#282c34" }}
                    position="static"
                > SCRUM POKER </AppBar>
                <div style={{ marginLeft: "300px", marginTop: "150px" }}>
                    <TableContainer component={Paper} style={{ width: "400px", height: "322px" }}>
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
                    top: "215px",
                    zIndex: "10",
                    position: "absolute",
                    left: "800px"
                }}>
                    <TableContainer component={Paper} style={{ width: "400px", height: "322px" }}>
                        <Table style={{ width: "400px" }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{this.state.storyList[this.state.index] && this.state.storyList[this.state.index].name}</TableCell>
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
            </div >
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    votedList: state.setData.votedList,
    flag: state.setData.flag,
    storyList: state.setData.storyList
});


Developer = withRouter(connect(mapStateToProps)(Developer));
export default Developer;
