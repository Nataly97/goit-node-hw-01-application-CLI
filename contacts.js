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
                console.table(contacts);
            
                fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (writeError) => {
                    if (writeError) {
                        console.log(writeError);
                    } else {
                        console.log('Contacto agregado con éxito.');
                    }
                });
            }
        });
    });
}

function addContact(name, email, phone) {
    let id = nanoid.nanoid();
    fs.readFile(contactsPath, "utf-8", (error, data) => {
        if (error) {
            console.log(error);
        }
        const contacts = JSON.parse(data.toString());
        let newContact = {
            id: id,
            name: name,
            email: email,
            phone: phone,
        }
        contacts.push(newContact);
    })
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};