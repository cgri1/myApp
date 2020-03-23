const express = require('express')
const app = express()
var bodyParser = require('body-parser');
var port = 8080;
app.use(bodyParser.json());


app.post('/setData', (req, res) => {
    var { sessionName, numberOfVoter, storyList, voteList } = req.body;
    this.sessionName = sessionName
    this.numberOfVoter = numberOfVoter
    this.endStoryList = false
    this.storyList = storyList
    this.indexOfVote = 0
    this.indexOfStory = 0
    this.voteList = voteList
    var result = {
        success: true,
        message: "success"
    }
    setTimeout(() => {
        if (sessionName && sessionName != "") {
            res.json(result);
        } else {
            result.success = false;
            result.message = "Email and password cannot be empty";
            res.json(result);
        }
    }, 1500);
});

app.post('/setVoted', (req, res) => {
    var { scrumMaster, vote } = req.body;
    var result = {
        success: true,
        message: "success"
    }
    setTimeout(() => {
        console.log("indexOfVote : " + this.indexOfVote);
        console.log("numberOfVoter : " + this.numberOfVoter);

        if (this.indexOfVote < this.numberOfVoter && !scrumMaster) {
            this.voteList[this.indexOfVote].status = "Voted"
            this.voteList[this.indexOfVote].point = vote
            this.indexOfVote++
            res.json(result);
        } else {
            if (scrumMaster) {
                this.voteList[this.numberOfVoter].status = "Voted"
                this.voteList[this.numberOfVoter].point = vote
            }
            result.success = true;
            result.message = "full";
            res.json(result);
        }
    }, 1000);
});

app.post('/setStoryList', (req, res) => {
    var { votedList, finalValue } = req.body;
    this.indexOfVote = 0
    this.voteList = votedList
    this.endStoryList = true
    var result = {
        success: true,
        message: "success"
    }
    setTimeout(() => {
        this.storyList[this.indexOfStory].status = "Active"
        this.storyList[this.indexOfStory].point = finalValue
        this.indexOfStory++
        res.json(result);
    }, 1000);
});

app.post('/getVoted', (req, res) => {
    var { id } = req.body;
    this.endVote = true
    for (let x = 0; x < this.voteList.length; x++) {
        if (this.voteList[x].status === "Not Voted") {
            this.endVote = false
            break
        }
    }
    var result = {
        success: true,
        message: "success",
        voteList: this.voteList ? this.voteList : [],
        list: this.storyList ? this.storyList : [],
        endVote: this.endVote,
        indexOfStory: this.indexOfStory,
        endStoryList: this.endStoryList
    }
    setTimeout(() => {
        result.success = true;
        result.message = "";
        res.json(result);
    }, 1000);
});

app.post('/getStoryList', (req, res) => {
    var { id } = req.body;
    var result = {
        success: true,
        message: "success",
        list: this.storyList ? this.storyList : []
    }
    setTimeout(() => {
        this.endStoryList = false
        res.json(result);
    }, 1000);
});


app.listen(port, () => console.log("Server Ready On port" + port));