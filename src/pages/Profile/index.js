import { useContext, useState } from 'react'

import './profile.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import avatar from '../../assets/avatar.png'
import firebase from '../../services/firebaseConnections'
import { FiSettings, FiUpload } from 'react-icons/fi'

import { AuthContext } from '../../contexts/auth'


export default function Profile(params) {

  const { user, signOut, setUser, storageUser } = useContext(AuthContext);

  const [nome, setNome] = useState(user && user.nome)
  const [email, setEmail] = useState(user && user.email)

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
  const [imageAvatar, setImageAvatar] = useState(null)



  //FUNÇÕES


  function handleFile(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0]
      
      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        setImageAvatar(image)
        setAvatarUrl(URL.createObjectURL(e.target.files[0]))
      }else{
        alert('envie uma imagem do tipo png ou jpeg')
        setImageAvatar(null)
        return null
      }
    
    }

    //console.log(e.target.files[0])
  }

  async function handleUpload(params) {
    const currentUid = user.uid
    
    const uploadTask = await firebase.storage()
    .ref(`images/${currentUid}/${imageAvatar.name}`)
    .put(imageAvatar)
    .then(  () => {
      console.log('foto enviada com sucesso')
    } )
    .catch(()=>{
      console.log('deu algum erro no handleupload')
    })
  }



  async function handleSave(e) {
    e.preventDefault()

    if (imageAvatar === null && nome !== '') {
      await firebase.firestore().collection('users')
      .doc(user.uid)
      .update({
        nome: nome
      })
      .then( () => {
        let data = {
          ...user,
          nome: nome
        }
        setUser(data)
        storageUser(data)

      })
    }
    else if (nome !== '' && imageAvatar !== null) {
      handleUpload()
    }

  }

  return(
    <div>
      <Header/>

      <div className="content">
        <Title name="Meu perfil">
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSave}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#FFF" size={25} />
              </span>

              <input type="file" accept="image/" onChange={handleFile}/><br/>
              { avatarUrl === null ? 
                <img src={avatar} width="250" height="250" alt="foto perfil avatar" />
                :
                <img src={avatarUrl} width="250" height="250" alt="foto perfil" />
              }
            </label>

            <label>Nome</label>
            <input type="text" value={nome} onChange={ (e) => setNome(e.target.value) } />
            <label>E-mail</label>
            <input type="text" value={email} disabled={true} />
            <button type="submit">Salvar</button>
          </form>
        </div>


        <div className="container">
          <button className="logout-btn" onClick={ () => signOut() }>Sair</button>

        </div>

      </div>
    </div>
  )
}