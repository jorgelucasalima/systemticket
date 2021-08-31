import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiPlus } from 'react-icons/fi'

import './new.css'



export default function New(params) {
  
  
  function handleRegister(e) {
    e.preventDefault()
    
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
            <select>
              <option value={1} key={1}>
                Qualinfo
              </option>
            </select>

            <label>Assunto</label>
            <select>
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
              />

              <span>Em Aberto</span>
             
              <input 
              type="radio" 
              name="radio"
              value="Progresso"
              />

              <span>Em Progresso</span>

              <input 
              type="radio" 
              name="radio"
              value="Atendido"
              />

              <span>Atendido</span>
            </div>
          
            <label>Complemento</label>
            <textarea 
            type="text"
            placeholder="Descreva seu problema"
            ></textarea>

            <button type="submit">Salvar</button>


          </form>
        </div>


      </div>

    </div>
  )
}