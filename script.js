const myLibrary = [];

class Book {
    constructor(name, author, numberOfPages, hasBeenRead) {
        this.name = name;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.hasBeenRead = hasBeenRead;
    }
}

function addBookToLibrary(name, author, numberOfPages, hasBeenRead=false) {
    const book = new Book(name, author, numberOfPages, hasBeenRead);

    // Check if book already exists
    for (let i = 0; i < myLibrary.length; i++) {
        if (book.name == myLibrary[i].name) {
            console.log("This book already exists in your library!");
            return;
        }
    }

    // Append book to library array
    myLibrary.push(book);

    // Create a new row in library table
    const tbodyRef = document.querySelector("table > tbody");
    const newRow = tbodyRef.insertRow()

    // Fill new row with book data
    const nameCell = newRow.insertCell();
    nameCell.textContent = name;
    nameCell.setAttribute("class", "book-name")

    const authorCell = newRow.insertCell()
    authorCell.textContent = author;
    authorCell.setAttribute("class", "book-author");

    const pagesCell = newRow.insertCell()
    pagesCell.textContent = numberOfPages;
    pagesCell.setAttribute("class", "book-pages");

    const hasBeenReadCell = newRow.insertCell()
    hasBeenReadCell.textContent = hasBeenRead === true ? "Yes" : "No";
    hasBeenReadCell.setAttribute("class", "book-read");
}