import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/customButton";
import CustomInput from "../../components/customInput";
import { authService } from "../../services/auth";
import { SetAuth } from "../../store/auth";
import st from "./login.module.scss";

const Login = () => {
	const dispatch = useDispatch(),
		navigate = useNavigate(),
		[loading, setLoading] = useState(false),
		[err, setErr] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		setErr(false);

		const data = {
			username: e.target[0].value,
			password: e.target[1].value,
		};

		authService
			.login(data)
			.then((res) => {
				if (res.data.status === "success") {
					setLoading(false);
					localStorage.setItem("token", res.data.data.token);
					dispatch(SetAuth(true, res.data.data.token));
					navigate("/");
				}
			})
			.catch((e) => {
				setLoading(false);
				setErr(true);
			});
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
				{err ? <p className="text-danger">Login or password error! GO AWAY!</p> : null}
				<CustomButton title="Sign in" type="submit" loading={loading} />
			</form>
		</div>
	);
};

export default Login;
