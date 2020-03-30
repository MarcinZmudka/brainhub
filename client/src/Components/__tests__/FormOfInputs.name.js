import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";
import FormOfInputs from "../FormOfInputs";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import validResponse from "../__mocks__/validResponse";
jest.mock("axios");
axios.post.mockImplementationOnce(() => {
	return Promise.resolve({ data: validResponse });
});
beforeEach(() => {
	axios.post.mockReset();
});
describe("test input name", () => {
	it("checking name input with ''", async () => {
		const { getByText, getByLabelText } = render(<FormOfInputs></FormOfInputs>);
		const name = getByLabelText("name");
		const surname = getByLabelText("surname");
		const email = getByLabelText("email");

		fireEvent.change(name, { target: { value: "", name: "name" } });
		fireEvent.change(surname, {
			target: { value: "Surname", name: "surname" }
		});
		fireEvent.change(email, {
			target: { value: "marcin@email.com", name: "email" }
		});
		const button = getByLabelText("button");
		fireEvent.click(button);
		await wait(() => {
			const backMessage = getByText("Name is required");
			expect(backMessage).toBeInTheDocument();
			expect(axios.post).toHaveBeenCalledTimes(0);
		});
	});
	it("test name input with space", async () => {
		const { getByText, getByLabelText } = render(<FormOfInputs></FormOfInputs>);
		const name = getByLabelText("name");
		const surname = getByLabelText("surname");
		const email = getByLabelText("email");

		fireEvent.change(name, { target: { value: "name surname", name: "name" } });
		fireEvent.change(surname, {
			target: { value: "Surname", name: "surname" }
		});
		fireEvent.change(email, {
			target: { value: "marcin@email.com", name: "email" }
		});
		const button = getByLabelText("button");
		fireEvent.click(button);
		await wait(() => {
			const backMessage = getByText("Invalid name");
			expect(backMessage).toBeInTheDocument();
			expect(axios.post).toHaveBeenCalledTimes(0);
		});
	});
});
