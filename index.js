const fs = require("fs"); 
const contacts = require("./contacts");
const readline = require("readline");

const { Command } = require("commander");
const program = new Command();

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout, 
})


// TODO: refactorizar
function invokeAction({ action, id, name, email, phone }) {
    rl.question(`Escriba una opción:\n list --Para tabla de contactos\n get --Para filtrar contacto por ID\n add --Para agregar contacto\n remove --Para eliminar contacto\n`, (action) => {
        switch (action) {
            case "list":
                contacts.listContacts();
                invokeAction(argv);
                break;
            case "get":
                // ... id
                rl.question(`Ingrese el ID del contacto:\n`, (id) => {
                    contacts.getContactById(id);
                    invokeAction(argv);
                })
                break;
            case "add":
            // ... name email phone
            case "add":
                rl.question("Ingrese el nombre del contacto: ", (name) => {
                    rl.question("Ingrese el correo del contacto: ", (email) => {
                        rl.question("Ingrese el teléfono del contacto: ", (phone) => {
                            contacts.addContact(name, email, phone);
                            invokeAction(argv);
                        });
                    });
                });
                break;
            case "remove":
                // ... id
                rl.question(`Ingrese el ID del contacto a eliminar:\n`, (id) => {
                    contacts.removeContact(id);
                    invokeAction(argv);
                })
                break;
            default:
                console.warn("\x1B[31m Unknown action type!");
        }
    })

}

invokeAction(argv);