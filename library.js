let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read
    this.info = function() {
        let str1 = this.title + " by " + this.author + ", " + this.pages + " pages, "; 
        let str2 = '';
        if (read) {
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
    newBookInfo.textContent = book.info();
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
    let titleInput = document.getElementById('newBookTitle');
    let authorInput = document.getElementById('newBookAuthor');
    let pagesInput = document.getElementById('newBookPages');
    let statusSelect = document.getElementById('newBookStatus');

    // Get the values from the input fields
    let newTitle = titleInput.value;
    let newAuthor = authorInput.value;
    let newPages = pagesInput.value;
    let newStatus = statusSelect.value;

    // Update myLibrary list
    let newBook = new Book(newTitle,newAuthor,newPages,newStatus);
    myLibrary.push(newBook);

    // clear previous values
    titleInput.value = '';
    authorInput.value = '';
    pagesInput.value = '';
    statusSelect.value = 'default';

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
updateLibraryUI()
