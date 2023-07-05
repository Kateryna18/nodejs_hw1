const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const getListContacts = async () => {
  // ...твій код. Повертає масив контактів.
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
  // return contacts
};

const getContactById = async (contactId) => {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  // console.log("id:", contactId)
  const contacts = await getListContacts();
  // console.log(contacts);
  const findedContact = contacts.find(item => item.id === contactId);
  return findedContact || null;
};

const removeContact = async (contactId) => {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await getListContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

const addContact = async ({ name, email, phone }) => {
  // ...твій код. Повертає об'єкт доданого контакту.
  const contacts = await getListContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = { getListContacts, getContactById, removeContact, addContact };
