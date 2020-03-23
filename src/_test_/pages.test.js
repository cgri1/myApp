import React from "react";
import Pages from "../pages";
import ReactDOM from 'react-dom';
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { MemoryRouter } from 'react-router';
import App from "../App"
import ScrumMasterPage from "../components/scrummaster"
import Developer from "../components/developer.js";

test("Page snapshot", () => {
  const component = shallow(
    <Provider store={store}>
      <Pages />
    </Provider>
  );
  expect(component).toMatchSnapshot();
});


test('ScrumMasterPage path', () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={['/scrummaster']}>
      <Provider store={store}>
        <ScrumMasterPage />
      </Provider>
    </MemoryRouter>
  );
  expect(wrapper.find(ScrumMasterPage)).toHaveLength(1);
});

test('App path ', () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={['/']}>
      <Provider store={store}>
        <App />
      </Provider>
    </MemoryRouter>
  );
  expect(wrapper.find(App)).toHaveLength(1);
});

test('Developer path ', () => {
  const wrapper = shallow(
    <MemoryRouter initialEntries={['/developer']}>
      <Provider store={store}>
        <Developer />
      </Provider>
    </MemoryRouter>
  );
  expect(wrapper.find(Developer)).toHaveLength(1);
});