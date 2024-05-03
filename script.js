let myLibrary = [];

class Book {
    constructor(title, author, numberOfPages, hasBeenRead) {
        test = test;
        this.title1 = title;
        this.author = author;
        this.numberOfPages = numberOfPages;
        this.hasBeenRead = hasBeenRead;
    }
}

// Add button event listener
document.querySelector("#add-book").addEventListener("click", e => {
    // Prevent default submit action
    e.preventDefault()

    const title = document.querySelector("#book-title");
    const author = document.querySelector("#book-author");
    const pages = document.querySelector("#book-pages");
    const hasBeenRead = document.querySelector("#book-read-status");

    addBookToLibrary(title.value, author.value, pages.value, hasBeenRead.checked);

    title.value = "";
    author.value = "";
    pages.value = "";
    hasBeenRead.checked = false;
});

// Add book to library array and table
function addBookToLibrary(title, author, numberOfPages, hasBeenRead=false) {
    if (!title || !author) {
        console.log("A title and author required");
        return;
    }
    
    if (numberOfPages < 0) {
        numberOfPages = 0;
    }
    else if (numberOfPages > 10000) {
        numberOfPages = "Over 10000";
    }
    
    // Generate id of book
    const id = generateBookId(title, author);

    // Check if book already exists
    for (let i = 0; i < myLibrary.length; i++) {
        if (id == myLibrary[i].id) {
            console.log("This book already exists in your library!");
            return;
        }
    }

    const book = new Book(title, author, numberOfPages, hasBeenRead);
    book.id = id;

    // Append book to library array
    myLibrary.push(book);

    // Create a new row in library table
    const tbodyRef = document.querySelector("table > tbody");
    const newRow = tbodyRef.insertRow(tbodyRef.rows.length - 1);
    newRow.dataset.id = id;

    // Fill new row with book data
    const titleCell = newRow.insertCell();
    titleCell.textContent = title;

    const authorCell = newRow.insertCell();
    authorCell.textContent = author;

    const pagesCell = newRow.insertCell();
    pagesCell.textContent = numberOfPages;

    const hasBeenReadCell = newRow.insertCell();
    hasBeenReadCell.appendChild(createSwitchElement(hasBeenRead));


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

// Create a switch element
function createSwitchElement(state=false) {
    // Create a switch label
    var switchLabel = document.createElement("label");
    switchLabel.classtitle = "switch";

    // Create an input element for checkbox
    var checkboxInput = document.createElement("input");
    checkboxInput.setAttribute("type", "checkbox");
    checkboxInput.checked = state;

    // Create a span element for slider
    var sliderSpan = document.createElement("span");
    sliderSpan.classtitle = "slider round";

    // Append input and span to label
    switchLabel.appendChild(checkboxInput);
    switchLabel.appendChild(sliderSpan);

    // Update read status on library object
    switchLabel.addEventListener("click", e => {
        for (let i = 0; i < myLibrary.length; i++) {
            if (e.target.closest("tr").dataset.id == myLibrary[i].id) {
                myLibrary[i].hasBeenRead = e.target.checked;
            }  
        }
    });

    return switchLabel;
}