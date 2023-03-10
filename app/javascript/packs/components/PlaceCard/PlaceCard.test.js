import React from "react";
import renderer from "react-test-renderer";
import PlaceCard from "./PlaceCard";

describe("PlaceCard", () => {
  beforeEach(() => {
    React.useContext = jest.fn().mockReturnValue({ tempType: "c" });
  });

  describe("when place has no forecast", () => {
    it("renders correctly", () => {
      const props = {
        heading: "Paris",
        onClick: jest.fn(),
      };

      const tree = renderer.create(<PlaceCard {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("when place has forecast", () => {
    it("renders correctly", () => {
      const props = {
        heading: "Paris",
        onClick: jest.fn(),
        weather: {
          tempMin: 300,
          tempMax: 310,
          icon: "01d",
          description: "clear sky",
          windSpeed: 5,
          date: "2023-05-01",
        },
      };

      const tree = renderer.create(<PlaceCard {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
