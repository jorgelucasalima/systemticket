import { useState, useEffect, useContext } from 'react'

import firebase from '../../services/firebaseConnections'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiPlus } from 'react-icons/fi'
import { AuthContext } from '../../contexts/auth'

import './new.css'



export default function New(params) {
  
  const [loadCustomers, setLoadCustomers] = useState(true)
  const [customers, setCustomers] = useState([])
  const [customersSelected, setCustomersSelected] = useState(0)

  const [assunto, setAssunto] = useState('Suporte')
  const [status, setStatus] = useState('Aberto');
  const [complemento, setComplemento] = useState('');


  const { user } = useContext(AuthContext)

  useEffect(() => {
    async function loadCustomers(params) {
      await firebase.firestore().collection('customers')
      .get()
      .then((snapshot)=>{
        let lista = []
        snapshot.forEach( (doc) => {
          lista.push({
            id: doc.id,
            nomeFantasia: doc.data().nomeFantasia
          })
        })

        if (lista.length === 0) {
          console.log('NENHUMA EMPRESA ENCONTRADA')
          setCustomers([ {id:'1', nomeFantasia: 'FREELA'} ])
          setLoadCustomers(false)
          return
        }

        setCustomers(lista)
        setLoadCustomers(false)

      })
      .catch((error)=>{
        console.log('Ocorreu algum erro', error)
        setCustomers(false)
        setCustomers([ {id: 1, nomeFantasia: ''} ])
      })
    }

    loadCustomers()

  }, [])

  
  function handleRegister(e) {
    e.preventDefault()
    
  }

  //Função - é chamada quando troca de assunto
  function handleChangeSelect(e) {
    setAssunto(e.target.value)
    
  }

  //Função - é chamada quando troca o status
  function handleOptionChange(e) {
    setStatus(e.target.value)
  }

  //Função - é chamada quando troca de cliente
  function handleChangeCustomers(e) {
    setCustomersSelected(e.target.value)
  }
  
  
  return(
    <div>
      <Header/>

      <div className="content">
        <Title name="Novo Ticket">
          <FiPlus size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            
            <label>Cliente</label>
            {loadCustomers ? (
              <input type="text" disabled={true} value="Carregando Clientes.." />
            ) : (

              <select value={customersSelected} onChange={handleChangeCustomers}>
              {customers.map((item, index) => {
                return(
                  <option value={index} key={item.id}>
                    {item.nomeFantasia}
                  </option>
                )
              })}
              </select>

            )}
            

            <label>Assunto</label>
            <select value={assunto} onChange={handleChangeSelect}>
              <option value="Suporte">Suporte</option>
              <option value="Financeiro">Financeiro</option>
              <option value="Comercial">Comercial</option>
              <option value="Vendas">Vendas</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input 
              type="radio" 
              name="radio"
              value="Aberto"
              onChange={handleOptionChange}
              checked={ status === 'Aberto' }
              />

              <span>Em Aberto</span>
             
              <input 
              type="radio" 
              name="radio"
              value="Progresso"
              onChange={handleOptionChange}
              checked={ status === 'Progresso' }
              />

              <span>Em Progresso</span>

              <input 
              type="radio" 
              name="radio"
              value="Atendido"
              onChange={handleOptionChange}
              checked={ status === 'Atendido' }
              />

              <span>Atendido</span>
            </div>
          
            <label>Complemento</label>
            <textarea 
            type="text"
            placeholder="Descreva seu problema"
            value={complemento}
            onChange={ (e) => setComplemento(e.target.value) }
            ></textarea>

            <button type="submit">Salvar</button>


          </form>
        </div>


      </div>

    </div>
  )
}