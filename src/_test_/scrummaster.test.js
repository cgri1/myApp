import React from "react";
import ScrumMasterPage from "../components/scrummaster";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import { store } from "../redux/store";

test("ScrumMasterPage snapshot", () => {
  const component = shallow(
    <Provider store={store}>
      <ScrumMasterPage />
    </Provider>
  );
  expect(component).toMatchSnapshot();
});

// test("MainPage event called with handleScroll Module", () => {
//   let mockGroceries = [
//     { id: 1, name: "Pineapples", quantity: 10 },
//     { id: 2, name: "Oranges", quantity: 3 }
//   ];
//   window.fetch = jest.fn().mockImplementation(() =>
//     Promise.resolve({
//       json: () =>
//         Promise.resolve({
//           result: mockGroceries
//         })
//     })
//   );
//   const component = shallow(<MainPage />);
//   component.instance().handleScroll();

//   expect(component.instance().pageNumber).toEqual(3);
// });

// test("MainPage event called with getCharacter Module", () => {
//   const component = shallow(<MainPage />);
//   let result = { image: "a" };
//   component.instance().getCharacter(result);
// });

// test("MainPage event called with detailOfImage Module", () => {
//   const component = shallow(<MainPage />);
//   let result = {
//     currentTarget: {
//       id: 2
//     }
//   };
//   component.instance().detailOfImage(result);
// });

// test("componentWillUnmount event called ", () => {
//   const component = shallow(<MainPage />);
//   component.instance().componentWillUnmount();
// });
