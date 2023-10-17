const fs = require('fs');
const path = require('path');
const nanoid = require('nanoid');
const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
    fs.readFile(contactsPath, "utf-8", (error, data) => {
        if (error) {
            console.log(error);
        }
        console.table(JSON.parse(data));
    });
}

function getContactById(contactId) {
    fs.readFile(contactsPath, "utf-8", (error, data) => {
        if (error) {
            console.log(error);
        }
        const contacts = JSON.parse(data.toString());
        contacts.forEach((contact) => {
            if (contact.id === contactId) {
                console.log(contact);
            }
        });
    });
}

function removeContact(contactId) {
    fs.readFile(contactsPath, "utf-8", (error, data) => {
        if (error) {
            console.log(error);
        }
        const contacts = JSON.parse(data.toString());
        contacts.forEach((contact) => {
            if (contact.id === contactId) {
                contacts.splice(contacts.indexOf(contact), 1);
                fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (writeError) => {
                    if (writeError) {
                        console.log(writeError);
                    } else {
                        console.log('Contacto eliminado con éxito.');
                    }
                });
            }
        });
    });
}

function addContact(name, email, phone) {
    let id = nanoid.nanoid();
    let newContact = {
        id: id,
        name: name,
        email: email,
        phone: phone,
    }
    fs.readFile(contactsPath, "utf-8", (error, data) => {
        if (error) {
            console.log("Error al cargar el archivo", error);
        } else {
            try {
                const contacts = JSON.parse(data);
                contacts.push(newContact);
                const contactJSON = JSON.stringify(contacts, null, 2);
                fs.writeFile(contactsPath, `\n${contactJSON}`, (writeError) => {
                    if (writeError) {
                        console.error("Error al crear el contacto:", writeError);
                    } else {
                        console.log("Nuevo contacto creado.");
                    }
                })
            } catch (error) {
                console.error("Error al cargar el archivo de contactos:", error);
            }
        }
    });


}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};  