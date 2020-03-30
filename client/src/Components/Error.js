import React from "react";

const Error = ({ messages }) => {
	return (
		<div className="error-box">
			{messages.map((error, index) => (
				<p key={index}>{error}</p>
			))}
		</div>
	);
};
export default Error;
