let libDB = [];

function Book(name, author, pages , read = false) {
	this.name = name;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function toggleHidden(node) {
	node.classList.toggle('hidden');
}

function showAddBook(event, bookForm) {
	toggleHidden(event.target);
	toggleHidden(bookForm);
}

function addBook(event, bookForm, showAddButton) {
	event.preventDefault();
	toggleHidden(bookForm);
	toggleHidden(showAddButton);
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

	showAddButton.classList.toggle('hidden');
}

document.addEventListener("DOMContentLoaded", ready);
