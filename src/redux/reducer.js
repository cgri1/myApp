import assign from "lodash/assign";

const defaultValues = {
  data: [],
  storyList:[],
  votedList: [],
  flag: false
};

export const setData = function (
  state = defaultValues,
  action = { type: "UNKNOWN" }
) {
  const { payload } = action;
  switch (action.type) {
    case "SET_DATA":
      return assign({}, state, {
        data: payload.data
      });
    case "SET_STORY_LIST":
      return assign({}, state, {
        storyList: payload.data
      });
    case "SET_VOTE_STATUS":
      return assign({}, state, {
        votedList: payload.data
      });
    case "SET_ROUTE":
      return assign({}, state, {
        flag: payload.flag
      });
    default:
      return state;
  }
};
