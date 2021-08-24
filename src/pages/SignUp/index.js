import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'


function SignUp() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  function handleSubmit(e) {
    e.preventDefault()
    alert('teste')
  }



    return (
      <div className="container-center">
        <div className="login">
          <div className="login-area">
            <img src={logo} alt="Logo" />
          </div>

          <form onSubmit={handleSubmit}>
            <h1>Cadastrar conta</h1>
            <input type="text" placeholder="Seu Nome" value={nome} onChange={ (e) => setNome(e.target.value) } />
            <input type="text" placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value) } />
            <input type="password" placeholder="*******" value={password} onChange={ (e) => setPassword(e.target.value) } />
            <button type="submit">Criar</button>
          </form>

          <Link to="/register">Já tem uma conta ? Entre</Link>

        </div>
      </div>
    );
  }
  
export default SignUp;