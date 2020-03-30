import React from "react";
import { render, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Input from "../Input";

describe("input components test", () => {
	it("onChange", async () => {
		const onChange = jest.fn();
		const { getByLabelText } = render(
			<Input
				placeholder="name"
				type="text"
				inputProps={{ "data-testid": "content-input" }}
				onChange={onChange}
				name="name"
			/>
		);
		const contentInput = getByLabelText("name");
		const event = { target: { value: "name", name: "name" } };
		fireEvent.change(contentInput, event);
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(contentInput.value).toBe("name");
	});
});
