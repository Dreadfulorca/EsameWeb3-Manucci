import type { Contact } from './types';
import { querySelectorOrThrow } from './utils';

export const contactList = querySelectorOrThrow('#contact-list');

const avatarColors: [string, string][] = [
  ['hsl(214 100% 92%)', 'hsl(216 71% 40%)'],
  ['hsl(282 100% 94%)', 'hsl(281 69% 43%)'],
  ['hsl(143 82% 90%)', 'hsl(148 62% 34%)'],
  ['hsl(35 100% 90%)', 'hsl(28 77% 38%)'],
];

export function renderContacts(contacts: Contact[]) {
  contactList.innerHTML = '';

  if (contacts.length === 0) {
    const emptyState = document.createElement('li');
    emptyState.className = 'empty-state';
    emptyState.textContent = 'Nessun contatto presente in rubrica.';
    contactList.append(emptyState);
    return;
  }

  const contactItems = contacts.map(createContactListItem);
  contactList.append(...contactItems);
}

function createContactListItem(contact: Contact, index: number) {
  const li = document.createElement('li');
  const [avatarBg, avatarText] = avatarColors[index % avatarColors.length] ?? [
    'hsl(214 100% 92%)',
    'hsl(216 71% 40%)',
  ];

  li.id = contact.id.toString();
  li.className = 'directory-item';
  li.style.setProperty('--avatar-bg', avatarBg);
  li.style.setProperty('--avatar-text', avatarText);

  const avatar = createElement('span', 'avatar', getInitials(contact.name));
  avatar.setAttribute('aria-hidden', 'true');

  const identity = createElement('div', 'identity');
  const nameLine = createElement('div', 'name-line');
  const name = createElement('span', 'contact-name', contact.name);
  const username = createElement('span', 'username', `@${contact.username}`);
  const email = createElement('div', 'email', contact.email);

  nameLine.append(name, username);
  identity.append(nameLine, email);

  const phone = createElement('span', 'phone', contact.phone);
  const company = createElement('span', 'company', contact.company.name);
  const deleteButton = createElement('button', 'delete-button', 'x');

  deleteButton.setAttribute('type', 'button');
  deleteButton.setAttribute('aria-label', `Rimuovi ${contact.name}`);
  li.append(avatar, identity, phone, company, deleteButton);

  return li;
}

function createElement(tagName: string, className: string, textContent = '') {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = textContent;
  return element;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
}
