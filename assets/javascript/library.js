"use strict";

let libDB = [];

function getLastIndex() {
	return libDB.length - 1;
}

function Book(title, author, pages , read = false) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function resetForm() {
	const inputs = document.getElementById('book-form').elements;
	let field_name;

	for (let i = 0; i < inputs.length; i++) {
		field_name = inputs[i].name;

		switch (field_name) {
			case 'title':
			case 'author':
			case 'pages':
				inputs[i].value = '';
				break;
			case 'read':
				inputs[i].value === 'no' ? inputs[i].checked = true : null;
				break;
			default:
				break;
		}
	}
}

function toggleHidden(node) {
	node.classList.toggle('hidden');
}

function showAddBook(event, bookForm) {
	toggleHidden(event.target);
	toggleHidden(bookForm);
}

function getTextValue(bookForm, field) {
	const elem = bookForm.querySelector('input[name=' + field + ']');
	return(elem.value);
}

function getRadioValue(bookForm, field) {
	const radios = document.getElementsByName(field);

	let value;

	for (let i = 0; i < radios.length; i++) {
		value = radios[i].value;
		if (radios[i].checked) {
			break;
		}
	}

	return value;
}

function createDataCell(value, hidden=false) {
	const td = document.createElement('td');

	td.textContent = value;

	hidden ? td.classList.add('hidden') : null;

	return td;
}

function createActionButtons(tr) {
	const td = document.createElement('td');

	const readButton = '<button id="read-btn" class="btn">Read</button>'
	const removeButton = '<button id="del-btn" class="btn">Remove</button>'

	td.innerHTML = readButton + removeButton;

	return td;
}

function render(book) {
	const container = document.querySelector('#book-list');

	const tr = document.createElement('tr');

	tr.appendChild(createDataCell(book.title));
	tr.appendChild(createDataCell(book.author));
	tr.appendChild(createDataCell(book.pages));
	tr.appendChild(createDataCell(book.read));
	tr.appendChild(createActionButtons());
	tr.appendChild(createDataCell(getLastIndex(), true));

	container.appendChild(tr);
}

function addBook(event, bookForm, showAddButton) {
	event.preventDefault();

	const title = getTextValue(bookForm, 'title');
	const author = getTextValue(bookForm, 'author');
	const pages = getTextValue(bookForm, 'pages');
	const read = getRadioValue(bookForm, 'read');

	addToLibDB(new Book(title, author, pages, read));

	render(libDB.slice(-1)[0]);

	toggleHidden(bookForm);
	resetForm();
	toggleHidden(showAddButton);
}

function addToLibDB(book) {
	libDB.push(book);
}

function ready() {
	const showAddButton = document.querySelector('#show-add-book');
	const addBookButton = document.querySelector('#add-book');
	const bookForm = document.querySelector('#book-form');
console.log(bookForm);
	showAddButton.addEventListener('click', function(e) { showAddBook(e, bookForm); });
	addBookButton.addEventListener('click', function(e) { addBook(e, bookForm, showAddButton); });

	showAddButton.classList.toggle('hidden');
}

document.addEventListener("DOMContentLoaded", ready);
