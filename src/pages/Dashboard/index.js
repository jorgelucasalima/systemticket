import { useState } from "react"

import Header from "../../components/Header"
import Title from '../../components/Title'
import './dashboard.css'
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";




export default function Dashboard(){

    const [chamados, setChamados] = useState([1]);

    return(
        <div>
            <Header/>

            <div className="content">
                <Title name="Tickets">
                    <FiMessageSquare size={25} />
                </Title>  

                {chamados.length === 0 ? (

                    <div className="container dashboard">
                    <span>Nenhum Ticket aberto...</span>

                    <Link to="/new" className="new">
                        <FiPlus size={25} color="#FFF" />
                        Novo Chamado
                    </Link>
                    </div>

                ) : (
                    <>
                        <Link to="/new" className="new">
                            <FiPlus size={25} color="#FFF" />
                            Novo Chamado
                        </Link>

                        <table>
                            <thead>
                                <tr key="">
                                    <th scope='col'>Cliente</th>
                                    <th scope='col'>Assunto</th>
                                    <th scope='col'>Status</th>
                                    <th scope='col'>Cadastrato</th>
                                    <th scope='col'>#</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key="">
                                    <td data-label="Cliente">Qualinfo</td>
                                    <td data-label="Assunto">Suporte</td>
                                    <td data-label="Status">
                                        <span className="badge" style={{backgroundColor: '#5cb85c'}}>Em aberto</span>
                                    </td>
                                    <td data-label="Cadastrado">20/08/2020</td>
                                    <td data-label="#">
                                        <button className="action" style={{backgroundColor: '#3583f6'}}>
                                            <FiSearch color="#FFF" size={17} />
                                        </button>
                                        <button className="action" style={{backgroundColor: '#f6a935'}}>
                                            <FiEdit2 color="#FFF" size={17} />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>


                    </>
                )}

       

            </div>

        </div>
    )
}