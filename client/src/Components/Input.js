import React, { useState } from "react";
import Form from "react-bootstrap/Form";

const Input = ({ placeholder, type, onChange, name }) => {
	const [value, setValue] = useState("")
	return (
		<Form.Group>
			<Form.Label>{`Please write your ${placeholder}`}</Form.Label>
			<Form.Control
				name={name}
				className="input"
				type={type}
				placeholder={placeholder}
				onChange={e => {
					onChange(e);
					setValue(e.target.value);
				}}
				aria-label={name}
				value={value}
			/>
		</Form.Group>
	);
};
export default Input;
