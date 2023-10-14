const contacts = require("./contacts");
const fs = require("fs").promises;
// const argv = require("yargs").argv;

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

const rl = readline.createInterface({ //Crea una interfaz de usuario en sonsola, para posteriormente 
    //hacer una pregunta y recibir una respuesta
    input: process.stdin, //Indica que recibe un dato
    output: process.stdout, // indica que Muestra un dato
})

rl.question("Cual es tu nombre? ", (value) => {
        console.log("You are name is", value);
    })

// TODO: refactorizar
function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            // ...
            contacts.listContacts();
            break;
        case "get":
            // ... id
            break;
            contacts.getContactById(id);
        case "add":
            // ... name email phone
            contacts.addContact(name, email, phone);
            break;

        case "remove":
            // ... id
            contacts.removeContact(id);
            break;
        default:
            console.warn("\x1B[31m Unknown action type!");
    }
}

invokeAction(argv);

// contacts.listContacts();
// contacts.getContactById('rsKkOQUi80UsgVPCcLZZW');
// contacts.removeContact('AeHIrLTr6JkxGE6SN-0Rw');
// contacts.addContact("name1", "email1", "phone1");