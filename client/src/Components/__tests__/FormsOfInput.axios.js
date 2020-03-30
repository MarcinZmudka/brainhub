import React from "react";
import {
	render,
	fireEvent,
	wait
} from "@testing-library/react";
import FormOfInputs from "../FormOfInputs";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import validResponse from "../__mocks__/validResponse";
import invalidResponse from "../__mocks__/invalidResponse";
jest.mock("axios");
beforeEach(()=> {
    axios.post.mockRestore();
})

describe("axios mocking", () => {
	it("sending good data", async () => {
		const { getByText, getByLabelText } = render(<FormOfInputs></FormOfInputs>);
		axios.post.mockImplementationOnce(() => {
			return Promise.resolve({ data: validResponse });
		});

		const name = getByLabelText("name");
		const surname = getByLabelText("surname");
		const email = getByLabelText("email");
		fireEvent.change(name, { target: { value: "Marcin", name: "name" } });
		fireEvent.change(surname, {
			target: { value: "Surname", name: "surname" }
		});
		fireEvent.change(email, {
			target: { value: "marcin@email.com", name: "email" }
		});
		const button = getByLabelText("button");
		fireEvent.click(button);
		await wait(() => {
			const sendMessage = getByText("Data send to database");
			expect(sendMessage).toBeInTheDocument();
			expect(axios.post).toHaveBeenCalledTimes(1);
		});
	});
	it("sending bad data", async () => {
		const { getByText, getByLabelText } = render(<FormOfInputs></FormOfInputs>);
		axios.post.mockRestore();
		axios.post.mockImplementationOnce(() => {
			return Promise.resolve({ data: invalidResponse });
		});

		const name = getByLabelText("name");
		const surname = getByLabelText("surname");
		const email = getByLabelText("email");
		fireEvent.change(name, { target: { value: "Marcin", name: "name" } });
		fireEvent.change(surname, {
			target: { value: "Surname", name: "surname" }
		});
		fireEvent.change(email, {
			target: { value: "marcin@email.com", name: "email" }
		});
		const button = getByLabelText("button");
		fireEvent.click(button);
		await wait(() => {
			const sendMessage = getByText("Your data is incorrect");
			expect(sendMessage).toBeInTheDocument();
			expect(axios.post).toHaveBeenCalledTimes(1);
		});
	});
});