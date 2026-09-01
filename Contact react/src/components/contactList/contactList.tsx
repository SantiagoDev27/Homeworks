import React from 'react';
import {contactList} from '../../data/contacts';

export default function ContactList() {
    const [contacts, setContacts] = React.useState(contactList);

    React.useEffect(() => {
        // Update when contactList changes
        setContacts([...contactList]);
    }, []);

    // Listen for changes
    React.useEffect(() => {
        const updateContacts = () => setContacts([...contactList]);
        window.addEventListener('contactsChanged', updateContacts);
        return () => window.removeEventListener('contactsChanged', updateContacts);
    }, []);

    return (
        <section id="contact-table">
            <table>
                <tr>
                    <th>Nombre</th>
                    <th>Número</th>
                </tr>
                {contacts.map((item, index) => (
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.number.toString()}</td>
                    </tr>
                ))}
            </table>
        </section>
    )
}

