let myLibrary = [];

class Book {
    constructor(name, author, numberOfPages, hasBeenRead) {
        this.name = name;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.hasBeenRead = hasBeenRead;
    }
}

// Add button event listener
document.querySelector("#add-book").addEventListener("click", e => {
    const name = document.querySelector("#book-name");
    const author = document.querySelector("#book-author");
    const pages = document.querySelector("#book-pages");
    const hasBeenRead = document.querySelector("#book-read-status");
    addBookToLibrary(name.value, author.value, pages.value, hasBeenRead.checked);
    name.value = "";
    author.value = "";
    pages.value = "";
    hasBeenRead.checked = false;
})

// Add book to library array and table
function addBookToLibrary(name, author, numberOfPages, hasBeenRead=false) {
    if (!name || !author) {
        console.log("Invalid");
        return;
    }
    
    // Generate id of book
    const id = generateBookId(name, author);

    // Check if book already exists
    for (let i = 0; i < myLibrary.length; i++) {
        if (id == myLibrary[i].id) {
            console.log("This book already exists in your library!");
            return;
        }
    }

    const book = new Book(name, author, numberOfPages, hasBeenRead);
    book.id = id;

    // Append book to library array
    myLibrary.push(book);

    // Create a new row in library table
    const tbodyRef = document.querySelector("table > tbody");
    const newRow = tbodyRef.insertRow(tbodyRef.rows.length - 1);
    newRow.dataset.id = id;

    // Fill new row with book data
    const nameCell = newRow.insertCell();
    nameCell.textContent = name;

    const authorCell = newRow.insertCell();
    authorCell.textContent = author;

    const pagesCell = newRow.insertCell();
    pagesCell.textContent = numberOfPages;

    const hasBeenReadCell = newRow.insertCell();
    hasBeenReadCell.textContent = hasBeenRead === true ? "Yes" : "No";

    // Add a remove button to each row
    const deleteButtonCell = newRow.insertCell();
    button = document.createElement("button");
    button.textContent = "Remove";
    deleteButtonCell.appendChild(button);
    button.addEventListener("click", removeBookFromLibrary);
}

// Remove book from library array and table
function removeBookFromLibrary() {
    // Retrieve the book id from the dataset of the row the button resides in
    const id = this.closest("tr").dataset.id;

    // Remove the row containing the book's id
    const rowToRemove = document.querySelector(`tr[data-id="${id}"]`);
    rowToRemove.remove();
    
    // Remove book from library array
    myLibrary = myLibrary.filter(book => {
        book.id !== id;
    });
}

// Generate a unique data id for each book
function generateBookId(book, author) {
    // Combine book and author into a single string
    const string = (book + author).replace(/\s+/g, "").toLowerCase();
    let id = 0;

    if (string.length === 0) return id;

    for (let i = 0; i < string.length; i++) {
        let char = string.charCodeAt(i);
        id = ((id << 5) - id) + char;
        id |= 0; // Convert to 32bit integer
    }
  return id;
}