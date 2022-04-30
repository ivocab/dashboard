import React from "react";
import CustomButton from "../../components/customButton";
import CustomInput from "../../components/customInput";
import st from "./login.module.scss";

const Login = () => {
	const onSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<div className={st.login}>
			<form className={st.login__block} onSubmit={onSubmit}>
				<h2>Sign in</h2>

				<CustomInput title="Username:" type="text" placeholder="GooDeD" required={true} />
				<CustomInput
					title="Password:"
					type="password"
					placeholder="********"
					required={true}
				/>

				<CustomButton title="Sign in" type="submit" />
			</form>
		</div>
	);
};

export default Login;
