import { useState } from 'react'
import contactLogo from './assets/contact.png'
import ContactList from './components/contactList/contactList'
import './App.css'
import NewContact from './components/newContact/newcontact'
import DeleteContact from './components/deleteContact/deletecontact'



function App() {
const [showNewContact, setShowNewContact] = useState(false)
const [showDeleteContact, setShowDeleteContact] = useState(false)

const handleNewContactClose = (accion: String) => {
  if (accion === 'newContact') {
    setShowNewContact(true)
    setShowDeleteContact(false)
  }else {
    setShowDeleteContact(true)
    setShowNewContact(false)
  }
}

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={contactLogo} className="base" width="170" height="179" alt="" />
        </div>
        <div>
          <h1>Contactos</h1>
          <p>
            Esta es tu lista de contactos, añade o elimina contactos según lo necesites.
          </p>
          <p>
            Mantén tu información organizada y accesible en un solo lugar.
          </p>
        </div>
        <div>
          <ContactList />
        </div>
        <div className="buttons">
          <button onClick={() => handleNewContactClose('newContact')}> Añadir contacto </button>
          <button onClick={() => handleNewContactClose('deleteContact')}> Eliminar contacto </button>
        </div>

        <div>
          {showNewContact && <NewContact />}
          {showDeleteContact && <DeleteContact />}
        </div>

      </section>

      <div className="ticks"></div>

      <div className="ticks"></div>

    </>
  )
}

export default App
