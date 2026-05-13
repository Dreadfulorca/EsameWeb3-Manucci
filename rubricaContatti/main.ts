import { contacts } from './model';
import type { Contact } from './types';
import { querySelectorOrThrow } from './utils';
import { contactList } from './view.js';

const form = querySelectorOrThrow('#contact-form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!(event.target instanceof HTMLFormElement)) return;

  const formData = new FormData(event.target);
  const newContact = createContactFromFormData(formData);

  contacts.next([newContact, ...contacts.value]);
  event.target.reset();
});

contactList.addEventListener('click', (event) => {
  if (!(event.target instanceof Element)) return;

  const deleteButton = event.target.closest('.delete-button');
  const contactItem = event.target.closest('li');

  if (deleteButton === null || contactItem === null) return;

  removeContactById(Number(contactItem.id));
});

function createContactFromFormData(formData: FormData): Contact {
  return {
    id: Date.now(),
    name: getFieldValue(formData, 'name'),
    username: getFieldValue(formData, 'username'),
    email: getFieldValue(formData, 'email'),
    phone: getFieldValue(formData, 'phone'),
    website: getFieldValue(formData, 'website'),
    company: {
      name: getFieldValue(formData, 'companyName'),
      catchPhrase: getFieldValue(formData, 'catchPhrase'),
      bs: getFieldValue(formData, 'bs'),
    },
  };
}

function getFieldValue(formData: FormData, fieldName: string) {
  return formData.get(fieldName)?.toString().trim() ?? '';
}

function removeContactById(id: number) {
  const updatedContacts = contacts.value.filter((contact) => contact.id !== id);
  contacts.next(updatedContacts);
}
