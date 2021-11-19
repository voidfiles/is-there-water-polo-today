import React from "react";
import renderer from "react-test-renderer";

import { Yes, No } from "./Alerts";

it("renders a yes", () => {
  const tree = renderer.create(<Yes />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders a no", () => {
  const tree = renderer.create(<No />).toJSON();
  expect(tree).toMatchSnapshot();
});
