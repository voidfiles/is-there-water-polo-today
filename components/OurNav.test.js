import React from "react";
import renderer from "react-test-renderer";

import OurNav from "./OurNav";

it("renders a nav", () => {
  const tree = renderer.create(<OurNav />).toJSON();
  expect(tree).toMatchSnapshot();
});
