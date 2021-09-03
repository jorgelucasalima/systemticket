import { useState, useEffect } from "react"
import firebase from '../../services/firebaseConnections'

import Header from "../../components/Header"
import Title from '../../components/Title'
import './dashboard.css'
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { format } from 'date-fns'



const listRef = firebase.firestore().collection('tickets').orderBy('created', 'desc')


export default function Dashboard(){

    const [chamados, setChamados] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState()


    useEffect(() => {
        
        loadChamados()


        return () => {
            
        };

    }, []);



    //FUNÇÕES
    async function loadChamados() {
        await listRef.limit(5)
        .get()
        .then((snapshort) => {
            updateState(snapshort)
        })
        .catch((error) => {
            console.log('ocorreu algum erro no loadchamado', error)
            setLoadingMore(false)
        })
        setLoading(false)
    }


    async function updateState(snapshort) {
        const isCollectionEmpty = snapshort.size === 0

        if (!isCollectionEmpty) {
            let lista = []

            snapshort.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    assunto: doc.data().assunto,
                    cliente: doc.data().cliente,
                    clienteId: doc.data().clienteId,
                    created: doc.data().created,
                    createdFormated: format(doc.data().created.toDate(),'dd/MM/yyyy'),
                    status: doc.data().status,
                    complemento: doc.data().complemento

                })
            })

            const lastDoc = snapshort.docs[snapshort.docs.length -1] //pegando ultimo documento buscado

            setChamados(chamados => [...chamados, ...lista])
            setLastDocs(lastDoc)

        }else{
            setIsEmpty(true)
        }

        setLoadingMore(false)
            
    }





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