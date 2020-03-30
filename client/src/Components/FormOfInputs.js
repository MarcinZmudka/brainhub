import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Input from "./Input";
import validState from "./ValidState";
import Error from "./Error";
import InfoSendMessage from "./InfoSend";
import axios from "axios";

const FormOfInputs = () => {
	const [date, setDate] = useState(new Date());
	const [state, setState] = useState({
		name: "",
		surname: "",
		email: "",
		error: false,
		errorMessages: []
	});
	const onChange = event => {
		const key = event.target.name;
		const value = event.target.value;
		const newState = Object.assign(state, { [key]: value });
		setState(newState);
	};
	const postData = async (url = "", data = {}) => {
		const response = await axios
			.post(url, {
				crossdomain: true,
				body: data,
				withCredentials: true,
				"Access-Control-Allow-Origin": "http://localhost:4000/",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				}
			})
			.then(res => {
				if (res.data?.error === "error") {
					const newState = { ...state };
					newState.errorMessages = ["Your data is incorrect"];
					newState.error = true;
					setState(newState);
				} else {
					const newState = { ...state };
					//console.log(res);
					newState.send = true;
					setState(newState);
				}
			});
		return await response;
	};
	const submit = event => {
		event.preventDefault();
		const errorMessages = validState({ ...state, date });
		if (errorMessages.length > 0) {
			const newState = { ...state };
			newState.error = true;
			newState.errorMessages = errorMessages;
			setState(newState);
		} else {
			postData("http://localhost:4000/", {
				name: state.name,
				surname: state.surname,
				email: state.email,
				date
			});
		}
	};
	return (
		<div className="Form-box">
			<Form className="form">
				{state.error ? <Error messages={state.errorMessages} /> : ""}
				{state.send ? <InfoSendMessage /> : ""}
				<Input
					placeholder="Name"
					type="text"
					onChange={e => onChange(e)}
					name="name"
				/>
				<Input
					placeholder="Surname"
					type="text"
					onChange={e => onChange(e)}
					name="surname"
				/>
				<Input
					placeholder="email"
					type="email"
					onChange={onChange}
					name="email"
				/>
				<div className="datepicker-box">
					<DatePicker
						selected={date}
						onChange={date => {
							setDate(date);
						}}
					/>
				</div>
				<Button aria-label="button" variant="secondary" type="submit" onClick={submit}>
					Submit
				</Button>
			</Form>
		</div>
	);
};
export default FormOfInputs;
