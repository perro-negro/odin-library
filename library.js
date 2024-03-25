let myLibrary = [];

class Book{

    #dTitle
    #dAuthor
    #dPages
    #dRead

    constructor(title, author, pages, read) {
        this.#dTitle = title;
        this.#dAuthor = author;
        this.#dPages = pages;
        this.#dRead = read;
    }

    get title() {
        return this.#dTitle;
    }

    get author(){
      return this.#dAuthor;
    }

    get pages(){
      return this.#dPages;
    }

    get read(){
      return this.#dRead;
    }

    set title(value) {
        this.#dTitle = value;
    }

    get info() {
        let str1 = this.#dTitle + " by " + this.#dAuthor + ", " + this.#dPages + " pages, "; 
        let str2 = '';
        if (this.#dRead) {
            str2 = 'Read.'
        }
        else {
            str2 = 'Not Read.'};
        return str1 + str2;    
    }

}

const addButton = document.getElementById('addButton');
const addWindow = document.getElementById('addWindow');
const container = document.querySelector('.container');

//Show addWindow when addBtn is clicked
addButton.addEventListener('click', () => {
    addWindow.showModal();
});

const confirmBtn =  document.getElementById('confirmBtn');

//Function to add card
function addBookCard(book) {
    
    // Create new elements
    let newCard = document.createElement('div');
    let newBox = document.createElement('div');
    let newContent = document.createElement('div');
    let newBookNumber = document.createElement('h2');
    let newBookTitle = document.createElement('h3');
    let newBookInfo = document.createElement('p');
    let deleteLink = document.createElement('a');

    // Set classes and text content
    newCard.className = 'card';
    newBox.className = 'box';
    newContent.className = 'content';
    newBookNumber.className = 'bookNumber';
    newBookNumber.textContent = myLibrary.indexOf(book) + 1;
    newBookTitle.className = 'bookTitle';
    newBookTitle.textContent = book.title;
    newBookInfo.className = 'infoBook';
    newBookInfo.textContent = book.info;
    deleteLink.href = '#';
    deleteLink.className = 'deleteBtn';
    deleteLink.textContent = 'Delete';
    deleteLink.setAttribute('onclick', "deleteBook(" + myLibrary.indexOf(book) + ")");
 
    // Append elements
    newContent.appendChild(newBookNumber);
    newContent.appendChild(newBookTitle);
    newContent.appendChild(newBookInfo);
    newContent.appendChild(deleteLink);
    newBox.appendChild(newContent);
    newCard.appendChild(newBox);
    container.appendChild(newCard);
}

//function to display library
function updateLibraryUI(){
    container.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {
        addBookCard(myLibrary[i]);
    }
}

//Form Submission process. 
confirmBtn.addEventListener('click', function(event) {

    event.preventDefault();

    // Get references to the input fields
    let titleInput = document.getElementById('titleInput');
    let authorInput = document.getElementById('authorInput');
    let pagesInput = document.getElementById('pagesInput');
    let readCheckbox = document.getElementById('readCheckbox');

    // Get the values from the input fields
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let read = readCheckbox.checked

    // Update myLibrary list
    let newBook = new Book(title,author,pages,read);
    myLibrary.push(newBook);

    // clear previous values
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    readCheckbox.checked = false;

    updateLibraryUI();

    addWindow.close();
});

//function to delete book.
function deleteBook(number){
    myLibrary.splice(number,1);
    updateLibraryUI();
}


//Stuff from the test Book.
let hobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
myLibrary.push(hobbit)

let dummy = new Book('Night of the Living Dummy', 'R. L. Stine', 100, true);
myLibrary.push(dummy)

updateLibraryUI()
