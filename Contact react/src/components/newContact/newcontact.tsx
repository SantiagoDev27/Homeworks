import React from 'react';
import {contactList} from '../../data/contacts';

function newcontact() {
    const [nombre, setNombre] = React.useState('');
    const [numero, setNumero] = React.useState('');

    const newcontactHandle = (nombre:String, numero:Number) => {
        contactList.push({name: nombre, number: numero})
        console.log(contactList)
        // Notify other components
        window.dispatchEvent(new Event('contactsChanged'));
    }

    const handleSubmit = () => {
        if (nombre.trim() && numero) {
            newcontactHandle(nombre, Number(numero));
            setNombre('');
            setNumero('');
        }
    };

    return (
        <div>
            <h2>New Contact</h2>
            <input name="nombre" type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <input name="numero" type="number" placeholder="Numero" value={numero} onChange={(e) => setNumero(e.target.value)} />
            <button onClick={handleSubmit}>Añadir contacto</button>
        </div>
    )
}

export default newcontact