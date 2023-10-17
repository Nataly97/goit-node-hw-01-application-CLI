//Mí código
const fs = require("fs"); //Para crear el archivo donde se guardan los resultados
const contacts = require("./contacts");
const readline = require("readline");

//base
const { Command } = require("commander");
const program = new Command();

//Opciones que el usuario puede envair por consola
program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
//Recibe los argumentos por consola
const argv = program.opts();

//Mi código
const rl = readline.createInterface({ //Crea una interfaz de usuario en sonsola, para posteriormente 
    //hacer una pregunta y recibir una respuesta
    input: process.stdin, //Indica que recibe un dato
    output: process.stdout, // indica que Muestra un dato
})

let actioUser;
const logFile = program.opts().action;

// const log = async (data) => {
//     try {
//         await fs.appendFile(logFile, `${data}\n`);
//         console.log("Se guardó el archivo")
//     } catch (err) {
//         console.log("No se guardó el archivo")
//     }
// }
//base
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
                rl.question(`Ingrese el ID del contacto:\n`, (id)=>{
                    contacts.getContactById(id);
                    invokeAction(argv);
                })
                break;
            case "add":
                // ... name email phone
                rl.question(`Ingrese el nombre, correo y teléfono del contacto:\n`, (name)=>{
                    contacts.addContact(name, email, phone);
                    invokeAction(argv);
                })
                
                break;
            case "remove":
                // ... id
                rl.question(`Ingrese el ID del contacto a eliminar:\n`, (id)=>{
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

// contacts.listContacts();
// contacts.getContactById('rsKkOQUi80UsgVPCcLZZW');
// contacts.removeContact('AeHIrLTr6JkxGE6SN-0Rw');
// contacts.addContact("name1", "email1", "phone1");