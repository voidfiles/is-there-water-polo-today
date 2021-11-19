import React from "react";
import renderer from "react-test-renderer";

import Selector from "./Selector";

it("renders a selector", () => {
  const tree = renderer.create(<Selector />).toJSON();
  expect(tree).toMatchSnapshot();
});
