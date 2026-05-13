import { Observable } from './observable';
import type { Contact } from './types';
import { renderContacts } from './view.js';

const contactsStorageKey = 'contacts';
const initialContacts = await initContacts();
export const contacts = new Observable<Contact[]>([]);

function getContactsFromLocalStorage() {
  const rawContacts = localStorage.getItem(contactsStorageKey);

  if (rawContacts === null) return null;

  try {
    return JSON.parse(rawContacts) as Contact[];
  } catch {
    localStorage.removeItem(contactsStorageKey);
    return null;
  }
}

async function initContacts() {
  const savedContacts = getContactsFromLocalStorage();

  if (savedContacts !== null) return savedContacts;

  const fetchedContacts = await fetchContacts();
  saveContactsToLocalStorage(fetchedContacts);
  return fetchedContacts;
}

async function fetchContacts() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');

  if (!response.ok) {
    throw new Error('Impossibile recuperare i contatti iniziali.');
  }

  return (await response.json()) as Contact[];
}

function saveContactsToLocalStorage(value = contacts.value) {
  localStorage.setItem(contactsStorageKey, JSON.stringify(value));
}

contacts.subscribe((value) => {
  saveContactsToLocalStorage(value);
  renderContacts(value);
});

contacts.next(initialContacts);
