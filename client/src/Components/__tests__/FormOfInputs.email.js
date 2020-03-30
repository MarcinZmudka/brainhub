import React from "react";
import {
	render,
	fireEvent,
	wait
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FormOfInputs from "../FormOfInputs";
import axios from "axios";
import validResponse from "../__mocks__/validResponse";
jest.mock("axios");
axios.post.mockImplementationOnce(() => {
    return Promise.resolve({ data: validResponse });
});
beforeEach(()=> {
	axios.post.mockReset();
})
describe("test input email", () => {
    it("checking email input without @", async () => {
		const { getByText, getByLabelText } = render(<FormOfInputs></FormOfInputs>);
		const name = getByLabelText("name");
		const surname = getByLabelText("surname");
        const email = getByLabelText("email");
        
		fireEvent.change(name, { target: { value: "name", name: "name" } });
		fireEvent.change(surname, {
			target: { value: "Surname", name: "surname" }
		});
		fireEvent.change(email, {
			target: { value: "marcinemail.com", name: "email" }
		});
		const button = getByLabelText("button");
		fireEvent.click(button);
		await wait(() => {
			const backMessage = getByText("Email is not valid");
			expect(backMessage).toBeInTheDocument();
			expect(axios.post).toHaveBeenCalledTimes(0);
		});
	});
	it("test email input without dot", async () => {

		const { getByText, getByLabelText } = render(<FormOfInputs></FormOfInputs>);
		const name = getByLabelText("name");
		const surname = getByLabelText("surname");
		const email = getByLabelText("email");

		fireEvent.change(name, { target: { value: "name", name: "name" } });
		fireEvent.change(surname, {
			target: { value: "Surname", name: "surname" }
		});
		fireEvent.change(email, {
			target: { value: "marcin@emailcom", name: "email" }
		});
		const button = getByLabelText("button");
		fireEvent.click(button);
		await wait(() => {
			const backMessage = getByText("Email is not valid");
			expect(backMessage).toBeInTheDocument();
			expect(axios.post).toHaveBeenCalledTimes(0);
		});
	});
	it("test email input with ''", async () => {
		const { getByText, getByLabelText } = render(<FormOfInputs></FormOfInputs>);
		const name = getByLabelText("name");
		const surname = getByLabelText("surname");
		const email = getByLabelText("email");

		fireEvent.change(name, { target: { value: "name", name: "name" } });
		fireEvent.change(surname, {
			target: { value: "Surname", name: "surname" }
		});
		fireEvent.change(email, {
			target: { value: "", name: "email" }
		});
		const button = getByLabelText("button");
		fireEvent.click(button);
		await wait(() => {
			const backMessage = getByText("Email is required");
			expect(backMessage).toBeInTheDocument();
			expect(axios.post).toHaveBeenCalledTimes(0);
		});
	});
	it("test email input with space", async () => {
		const { getByText, getByLabelText } = render(<FormOfInputs></FormOfInputs>);
		const name = getByLabelText("name");
		const surname = getByLabelText("surname");
		const email = getByLabelText("email");

		fireEvent.change(name, { target: { value: "name", name: "name" } });
		fireEvent.change(surname, {
			target: { value: "Surname", name: "surname" }
		});
		fireEvent.change(email, {
			target: { value: "marcin @g.com", name: "email" }
		});
		const button = getByLabelText("button");
		fireEvent.click(button);
		await wait(() => {
			const backMessage = getByText("Email is not valid");
			expect(backMessage).toBeInTheDocument();
			expect(axios.post).toHaveBeenCalledTimes(0);
		});
	});
})