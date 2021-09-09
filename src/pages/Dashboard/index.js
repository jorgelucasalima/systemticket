import { useState, useEffect } from "react"
import firebase from '../../services/firebaseConnections'

import Header from "../../components/Header"
import Modal from "../../components/Modal"
import Title from '../../components/Title'
import './dashboard.css'
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { format, set } from 'date-fns'



const listRef = firebase.firestore().collection('tickets').orderBy('created', 'desc')


export default function Dashboard(){

    const [chamados, setChamados] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingMore, setLoadingMore] = useState(false)
    const [isEmpty, setIsEmpty] = useState(false);
    const [lastDocs, setLastDocs] = useState()
    const [showPostModal, setShowPostModal] = useState(false)
    const [detail, setDetail] = useState()


    useEffect(() => {


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

        
        loadChamados()


        return () => {
            
        };

    }, []);



    //FUNÇÕES
    


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



    async function handleMore(params) {
       setLoadingMore(true)
       await listRef.startAfter(lastDocs).limit(5)
       .get()
       .then((snapshort)=>{
           updateState(snapshort)
       })
    }


    function togglePostModal(item) {
        setShowPostModal(!showPostModal)
        setDetail(item)
    }


    if (loading) {
        return(
            <div>
                <Header/>
                <div className="content">
                    <Title name="Tickets.">
                        <FiMessageSquare size={25} />
                    </Title>

                    <div className="container dashboard">
                        <span>Buscando Chamados...</span>
                    </div>

                </div>


            </div>
        )
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
                                {chamados.map( (item, index) => {
                                    return(

                                        <tr key={index}>
                                            <td data-label="Cliente">{item.cliente}</td>
                                            <td data-label="Assunto">{item.assunto}</td>
                                            <td data-label="Status">
                                                <span className="badge" style={{backgroundColor: item.status === 'Aberto' ? '#5cb85c' : '#999'}}>{item.status}</span>
                                            </td>
                                            <td data-label="Cadastrado">{item.createdFormated}</td>
                                            <td data-label="#">
                                                <button className="action" style={{backgroundColor: '#3583f6'}} onClick={ () => togglePostModal(item) }>
                                                    <FiSearch color="#FFF" size={17} />
                                                </button>
                                                <Link className="action" style={{backgroundColor: '#f6a935'}} to={`/new/${item.id}`}>
                                                    <FiEdit2 color="#FFF" size={17} />
                                                </Link>
                                            </td>
                                        </tr>


                                    )
                                })}
                                
                            </tbody>
                        </table>

                        {loadingMore && <h3 style={{textAlign: 'center', marginTop: 15}}>Buscando dados...</h3>}
                        { !loadingMore && !isEmpty &&  <button className="btn-more" onClick={handleMore}>Buscar +</button>}       




                    </>
                )}

       

            </div>


            {showPostModal && (
                <Modal
                    conteudo={detail}
                    close={togglePostModal}
                />
            )}                                    



        </div>
    )
}