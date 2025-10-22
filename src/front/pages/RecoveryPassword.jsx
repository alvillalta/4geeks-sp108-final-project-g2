import React, { useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/auth.js"
import { getTrips } from "../services/hello-world-services.js";

export const RecoveryPassword = () => {
	const navigate = useNavigate();
	const { dispatch } = useGlobalReducer();

	const [email, setEmail] = useState("");

	const handleEmail = event => setEmail(event.target.value);

	const handleSubmitLogin = async (event) => {
		event.preventDefault();
		const userToRecover = {
			"email": email,
		}
		const userRecovered = await login(userToRecover);
		if (userLogged) {
			localStorage.setItem("token", userLogged.access_token);
			localStorage.setItem("current-user", JSON.stringify(userLogged.results))
			dispatch({
				type: "LOGIN",
				payload: { token: userLogged.access_token, isLogged: true }
			});
			dispatch({
				type: "CURRENT-USER",
				payload: userLogged.results
			});
			const trips = await getTrips()
			if (trips.tripsOwner.length > 0) {
				navigate("/trips");
			} else {navigate("/create-trip");}
		} else {
			alert("Credenciales inválidas")
		}
	}

	const handleCancel = () => {
		navigate("/");
	}

	return (
		<div className="container mt-5 mb-5" style={{ maxWidth: "500px" }}>
			<div className="text-center mb-4">
				<i class="fa-solid fa-key fa-3x text-warning"></i>
				<h2 className="mt-2">Restablecer contraseña</h2>
			</div>

			<form onSubmit={handleSubmitLogin}>

				{/* Email */}
				<div className="mb-3 input-group">
					<span className="input-group-text">
						<i className="fas fa-envelope"></i>
					</span>
					<input type="email" className="form-control rounded-3" id="loginEmail" placeholder="Correo electrónico"
						value={email} onChange={handleEmail} />
				</div>

				{/* Botón Login y Cancel*/}
				<div className="d-flex justify-content-between mt-3 text-center">
					<button type="submit" className="btn-login">
						<i class="fa-regular fa-paper-plane me-2"></i>
						Enviar
					</button>
					<button onClick={handleCancel} type="button" className="btn-login">
						<i className="fas fa-times me-2"></i>
						Cancelar
					</button>
				</div>
			</form>
		</div>
	);
};

