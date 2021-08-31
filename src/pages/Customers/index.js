import { useState } from 'react'

import './customers.css'
import Title from '../../components/Title'
import Header from '../../components/Header'
import { FiUser } from 'react-icons/fi'


export default function Customers(params) {
  

  //STATES
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  

  //FUNÇÕES
  function handleAdd(e) {
    e.preventDefault()
    alert('teste')
  }
  
  return(  
    <div>
      <Header/>

      <div className="content">
        <Title name="Clientes">
          <FiUser size={25} />
        </Title>

        <div className="container">
          <form className="form-profile customers" onSubmit={handleAdd}>
            <label>Nome Empresa</label>
            <input type="text" placeholder="Nome da sua Empresa" value={nomeFantasia} onChange={ (e) => setNomeFantasia(e.target.value)} />
            
            <label>CNPJ</label>
            <input type="text" placeholder="Seu Cnpj" value={cnpj} onChange={ (e) => setCnpj(e.target.value) } />
            
            <label>Endereço</label>
            <input type="text" placeholder="Endereço da Empresa" value={endereco} onChange={ (e) => setEndereco(e.target.value)} />
            
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    
    </div>
  )
}