"use strict";

let libDB = [];

class Book {
	constructor (title, author, pages, read = 'no') {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}

	set title(title) {
		this._title = title;
	}

	get title() {
		return this._title;
	}

	set author(author) {
		this._author = author;
	}

	get author() {
		return this._author;
	}

	set pages(pages) {
		this._pages = pages;
	}

	get pages() {
		return this._pages;
	}

	set read(read) {
		this._read = read;
	}

	get read() {
		return this._read;
	}

	toggleRead() {
		this.read = (this.read === 'yes' ? 'no' : 'yes');
	}
}

function getLastIndex() {
	return libDB.length - 1;
}

function lastBook() {
	return libDB.slice(-1)[0];
}

function loadSampleData() {
	libDB.push(new Book("Catch-22", "Joseph Heller", 453, "yes"));
	render(lastBook());
	libDB.push(new Book("Moby Dick", "Herman Melville", 366, 'yes'));
	render(lastBook());
	libDB.push(new Book("Heart of Darkness", "Joseph Conrad", 77, "yes"));
	render(lastBook());
	libDB.push(new Book("On Basilisk Station", "David Weber", 422, "yes"));
	render(lastBook());
	libDB.push(new Book("The Endurance: Shackleton's Legendary Antartic Expidition", "Caroline Alexander", 224, "yes"));
	render(lastBook());

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

	const readButton = '<button class="btn">Read</button>'
	const removeButton = '<button class="btn del-btn">Remove</button>'

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

	render(lastBook());

	toggleHidden(bookForm);
	resetForm();
	toggleHidden(showAddButton);
}

function actionClick(e) {
	const tagName = e.target.tagName;
	const btnLabel = e.target.innerText;

	if (tagName === 'BUTTON' && (btnLabel === 'Read' || btnLabel === 'Remove')) {
		const table = document.querySelector('#book-list');
		const row = e.target.parentNode.parentNode;
		const readCell = e.target.parentNode.previousSibling;
		const libIndex = e.target.parentNode.nextSibling.textContent;
		
		const book = libDB[libIndex];

		switch (btnLabel) {
			case 'Read':
				book.toggleRead();
				readCell.textContent = book.read;
				break;
			case 'Remove':
				libDB.splice(libIndex, 1);
				table.removeChild(row);
				break;
			default:
				break;
		}
	}
}

function addToLibDB(book) {
	libDB.push(book);
}

function ready() {
	const showAddButton = document.querySelector('#show-add-book');
	const addBookButton = document.querySelector('#add-book');
	const bookForm = document.querySelector('#book-form');

	showAddButton.addEventListener('click', function(e) { showAddBook(e, bookForm); });
	addBookButton.addEventListener('click', function(e) { addBook(e, bookForm, showAddButton); });
	document.addEventListener('click', function(e) { actionClick(e); });

	showAddButton.classList.toggle('hidden');

	loadSampleData();
}

document.addEventListener("DOMContentLoaded", ready);
