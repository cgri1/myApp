import React from "react";
import Developer from "../components/developer";
import { shallow, render, mount } from "enzyme";
import { Provider } from "react-redux";
import { store } from "../redux/store";
// Create the mock store
import configureMockStore from "redux-mock-store";
const initialState = {};
const mockStore = configureMockStore(initialState);

test("Developer snapshot", () => {
  const component = shallow(
    <Provider store={store}>
      <Developer />
    </Provider>
  );
  expect(component).toMatchSnapshot();
});
