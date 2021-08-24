import { useState } from 'react';
import { Link } from 'react-router-dom';
import './signin.css'
import logo from '../../assets/logo.png'


function SignIn() {

  const [email, setEmail] = useState('')
  const [password, setPasswird] = useState('')


    return (
      <div className="container-center">
        <div className="login">
          <div className="login-area">
            <img src={logo} alt="Logo" />
          </div>

          <form>
            <h1>Entrar</h1>
            <input type="text" placeholder="email@email.com" />
            <input type="password" placeholder="****" />
            <button type="submit">Acessar</button>
          </form>

          <Link to="/register">Criar uma conta</Link>

        </div>
      </div>
    );
  }
  
  export default SignIn;