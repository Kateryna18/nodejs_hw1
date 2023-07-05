const argv = require("yargs").argv;
const contacts = require("./db/contacts.js");

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
      case 'list':
        const allContacts = await contacts.getListContacts();
        return console.log(allContacts)
  
      case 'get':
        const findedContact = await contacts.getContactById(id);
        return console.log(findedContact)
  
      case 'add':
        const newContact = await contacts.addContact({name, email, phone});
        return console.log(newContact)
  
      case 'remove':
        const deletedContacts = await contacts.removeContact(id);
        return console.log(deletedContacts)
  
      default:
        console.warn('\x1B[31m Unknown action type!');
    }
  }
  
  invokeAction(argv);

// invokeAction({action: "list"});
// invokeAction({action: "get", id: "AeHIrLTr6JkxGE6SN-0Rw"});
// invokeAction({action: "add", name: "Amanda", email: "amanda.dark@vestibul.com", phone: "(099) 340-5674"});
// invokeAction({action: "remove", id: "AeHIrLTr6JkxGE6SN-0Rw"});

