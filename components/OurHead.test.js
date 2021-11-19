import React from "react";
import renderer from "react-test-renderer";

import OurHead from "./OurHead";

it("renders a simple head", () => {
  const tree = renderer.create(<OurHead />).toJSON();
  expect(tree).toMatchSnapshot();
});
