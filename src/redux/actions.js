import { store } from "./store";

export function setData(data) {
  store.dispatch({
    type: "SET_DATA",
    payload: {
      data
    }
  });
}



export function setStoryList(data) {
  store.dispatch({
    type: "SET_STORY_LIST",
    payload: {
      data
    }
  });
}

export function setVoteStatus(data) {
  store.dispatch({
    type: "SET_VOTE_STATUS",
    payload: {
      data
    }
  });
}

export function setRoute(flag) {
  store.dispatch({
    type: "SET_ROUTE",
    payload: {
      flag
    }
  });
}
