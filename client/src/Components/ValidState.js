const validState = state => {
	const errorArray = [
		validName(state.name),
		validSurname(state.surname),
		validEmail(state.email),
		validDate(state.date)
	];
	const filteredErrorArray = errorArray.filter(message => !!message);
	return filteredErrorArray;
};

const validName = name => {
	if (name === "") return "Name is required";
	if (name.includes(" ")) return "Invalid name";
};

const validSurname = surname => {
	if (surname === "") return "Surname is required";
	if (surname.includes(" ")) return "Invalid surname";
};

const validEmail = email => {
	if (email === "") return "Email is required";
	if (!/^[a-z0-9]+@[a-z]+\.+[a-z]{2,4}$/i.test(email)) return "Email is not valid";
	// if (email.includes(" ")) return "Email is not valid";
	// if (!email.includes("@")) return "Email missing @";
};

const validDate = date => {
	if (typeof date !== "object") return "Date is not valid";
};
export default validState;
