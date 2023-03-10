import React from "react";
import renderer from "react-test-renderer";
import { cleanup, fireEvent, render, act } from "@testing-library/react";
import PlaceForm from "../PlaceForm";
import { createPlace } from "../../utils/api";

jest.mock("../../utils/api", () => ({
  createPlace: jest.fn(),
  updatePlace: jest.fn().mockResolvedValue(() =>
    Promise.resolve({
      response: { status: 200 },
    })
  ),
}));

describe("PlaceForm", () => {
  beforeEach(() => {
    React.useContext = jest.fn().mockReturnValue({ mapApiKey: null });
  });

  describe("when place provided", () => {
    it("renders correctly", () => {
      const props = {
        place: {
          id: 1,
          name: "Paris",
          lat: 48.8566,
          lng: 2.3522,
        },
        onSubmit: jest.fn(),
      };

      const tree = renderer.create(<PlaceForm {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("when place not provided", () => {
    it("renders correctly", () => {
      const props = {
        onSubmit: jest.fn(),
      };

      const tree = renderer.create(<PlaceForm {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe("form submission", () => {
    it("enters place data and submits", async () => {
      const onSubmit = jest.fn();

      const place = {
        name: "Paris",
        lat: "48.8566",
        lng: "2.3522",
      };

      createPlace.mockResolvedValue(
        Promise.resolve({
          status: 200,
          place,
        })
      );

      const { getByLabelText, getByText } = render(
        <PlaceForm onSubmit={onSubmit} />
      );
      const nameInput = getByLabelText("Name");
      const latInput = getByLabelText("Latitude");
      const lngInput = getByLabelText("Longitude");

      fireEvent.change(nameInput, { target: { value: place.name } });
      fireEvent.change(latInput, { target: { value: place.lat } });
      fireEvent.change(lngInput, { target: { value: place.lng } });

      await fireEvent.click(getByText("Create"));

      expect(onSubmit).toHaveBeenCalledWith(place);
    });

    it("enters place data and submits with errors", async () => {
      const onSubmit = jest.fn();

      const place = {
        name: "Paris",
        lat: "48.8566",
        lng: "2.3522",
      };

      createPlace.mockResolvedValue(
        Promise.resolve({
          status: 422,
          data: { name: ["can't be blank"] },
        })
      );

      const { getByLabelText, getByText } = render(
        <PlaceForm onSubmit={onSubmit} />
      );
      const nameInput = getByLabelText("Name");
      const latInput = getByLabelText("Latitude");
      const lngInput = getByLabelText("Longitude");

      fireEvent.change(nameInput, { target: { value: place.name } });
      fireEvent.change(latInput, { target: { value: place.lat } });
      fireEvent.change(lngInput, { target: { value: place.lng } });

      await act(async () => {
        await fireEvent.click(getByText("Create"));
      });

      expect(getByText("can't be blank")).toBeTruthy();
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
