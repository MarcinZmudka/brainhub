import React from "react";
import {
	render,
} from "@testing-library/react";
import FormOfInputs from "../FormOfInputs";
import "@testing-library/jest-dom/extend-expect";


test("test rendering subComponents", async () => {
	const { getByText, getByLabelText } = render(
		<FormOfInputs></FormOfInputs>
	);
	expect(getByText("Please write your Name")).toBeInTheDocument();
	expect(getByText("Please write your Surname")).toBeInTheDocument();
	expect(getByText("Please write your email")).toBeInTheDocument();
	expect(getByLabelText("button")).toBeInTheDocument();
});


