import React from 'react';
import {contactList} from '../../data/contacts';

function deletecontact() {
    const [contacts, setContacts] = React.useState(contactList);

    const handleDeleteContact = (nombre: String) => {
        const index = contactList.findIndex(c => c.name === nombre);
        if (index > -1) {
            contactList.splice(index, 1);
            setContacts([...contactList]);
            console.log('Contact deleted:', nombre);
            // Notify other components
            window.dispatchEvent(new Event('contactsChanged'));
        }
        console.log(contactList);
    };

    return (
        <div>
            <h2>Eliminar Contacto</h2>
            <ul>
                {contacts.map((contact) => (
                    <li key={String(contact.name)}>
                        <span>{contact.name} - {contact.number.toString()}</span>
                        <button onClick={() => handleDeleteContact(contact.name)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default deletecontact