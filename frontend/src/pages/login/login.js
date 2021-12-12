import React, { useState } from 'react';
import Calendar from 'react-calendar';
import './login_styles.css'

export default function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');


    async function handleLogin() {

    }

    return (
        <div className="login-container">
            <div className="content">
                <section>
                    <h1>Login</h1>
                    <p> </p>
                </section>
                <form onSubmit={handleLogin}>
                    <input placeholder="Email"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <div className="passwordField">
                        <text> senha: </text>
                        <input type="password" />
                    </div>
                    <div>
                        <button className="button" type="submit"> Login </button>
                        <button className="registerButton" type="button"> Cadastrar </button>
                    </div>
                </form>
            </div>
        </div>

    );
}