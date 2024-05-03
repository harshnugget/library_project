class Book {
    constructor(title, author, numberOfPages, hasBeenRead=false) {
        // Title and author validation
        if (!title || !author) {
            throw new Error("A book must have both a title and an author.");
        }
        
        // Page number validation
        if (!Number.isInteger(numberOfPages)) {
            throw new Error("Number of pages must be an integer.")
        }
        else if (numberOfPages < 0) {
            numberOfPages = 0;
        } else if (numberOfPages > 10000) {
            numberOfPages = 10000;
        }

        this.title = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.hasBeenRead = hasBeenRead;
    }
}

class Library {
    constructor() {
        this.books = {};
    }

    addBook(book) {
        // Generate a unique id for the book before storing it
        const id = this.generateUniqueId(book.title, book.author);

        if (id in this.books) {
            console.log("This book already exists in your library.");
            return;
        } else {
            this.books[id] = book;
            console.log(`${book.title} has been added to your library.`);
            return id;
        }
    }

    removeBook(id) {
        if (id in this.books) {
            const book = this.books[id];
            delete this.books[id];
            console.log(`${book.title} was removed from your library.`);
        } else {
            console.log("This book does not exist in your library.");
        }
    }

    // Generate a unique id for each book
    generateUniqueId(title, author) {
        // Combine title and author into a single string
        const string = (title + author).replace(/\s+/g, "").toLowerCase();
        let id = 0;

        if (string.length === 0) return id;

        for (let i = 0; i < string.length; i++) {
            let char = string.charCodeAt(i);
            id = ((id << 5) - id) + char;
            id |= 0; // Convert id to 32bit integer
        }
    return id;
    }
}

document.querySelector("#add-book").addEventListener("click", e => {
    // Prevent default submit action
    e.preventDefault()

    const title = document.querySelector("#book-title");
    const author = document.querySelector("#book-author");
    const pages = document.querySelector("#book-pages");
    const hasBeenRead = document.querySelector("#book-read-status");

    const book = new Book(title.value, author.value, pages.value, hasBeenRead.checked);

    // Store id and add book to library
    const id = (myLib.addBook(book));

    // Create a new row using the id as a data value
    createNewRow(id);

    // Reset input values
    title.value = "";
    author.value = "";
    pages.value = "";
    hasBeenRead.checked = false;
});

function createNewRow(id) {
    const book = myLib.books[id];

    // Create a new row in library table
    const tbodyRef = document.querySelector("table > tbody");
    const newRow = tbodyRef.insertRow(tbodyRef.rows.length - 1);
    newRow.dataset.id = id; // Data value of row

    // Fill new row with book data
    const titleCell = newRow.insertCell();
    titleCell.textContent = book.title;

    const authorCell = newRow.insertCell();
    authorCell.textContent = book.author;

    const pagesCell = newRow.insertCell();
    pagesCell.textContent = book.numberOfPages;

    const hasBeenReadCell = newRow.insertCell();
    hasBeenReadCell.appendChild(createToggle(book.hasBeenRead));    // Insert a toggle element into the cell

    // Add a remove button to each row
    const deleteButtonCell = newRow.insertCell();
    button = document.createElement("button");
    button.textContent = "Remove";
    deleteButtonCell.appendChild(button);
    button.addEventListener("click", removeBookFromLibrary);
}

// Remove book from library
function removeBookFromLibrary() {
    // Retrieve the id of the row containing the button
    // This id will be the same id as the book
    const id = this.closest("tr").dataset.id;

    // Remove the row containing the id
    const rowToRemove = document.querySelector(`tr[data-id="${id}"]`);
    rowToRemove.remove();
    
    // Remove the book from library
    delete myLib.removeBook(id);
}

// Create a toggle for tracking book's read status
function createToggle(state=false) {

    var checkboxInput = document.createElement("input");
    checkboxInput.setAttribute("type", "checkbox");
    checkboxInput.checked = state;

    // Update read status on the book object
    checkboxInput.addEventListener("click", (e) => { 
        const id = e.target.closest("tr").dataset.id;
        if (id in myLib.books) {
            myLib.books[id].hasBeenRead = e.target.checked;
        }
    });

    return checkboxInput;
}

// Create a library
myLib = new Library();