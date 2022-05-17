//Queried Selectors
//Get locally stored json and parse, if doesnt exist create empty array
const myLibrary = JSON.parse(localStorage.getItem('library')) || [];
const cardsContainer = document.querySelector('main')
const addBookButton = document.querySelector('.newBook') 
const form = document.querySelector('form')
const bookCounter = document.querySelector('.book-counter')
const remainingCounter = document.querySelector('.books-read')
const completed = document.querySelector('.books-readed')
const toggleButton = document.querySelector('.add-button-mobile')
//Submitting form event listener
form.addEventListener('submit', validateForm)
toggleButton.addEventListener('click',()=>{
    document.querySelector('.form').classList.toggle('active')
    toggleButton.classList.toggle('active')
})
addBookButton.addEventListener('click',()=>{
    document.querySelector('.form').classList.toggle('active')
    toggleButton.classList.toggle('active')
})
//Object constructor
class Book{
    constructor(title,author,pages,status,color){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.color = color
    }
}


function addBookToLibrary(title='Missing Info',author = 'Missing Info',pages ='Missing Info',status = false,color) {
    // Creates new Book object and appends its to the library array
    let newBook = new Book(title,author,pages,status,color);
    myLibrary.push(newBook)

    //Store the array of books on the local storage as a JSON
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

//Display of Current myLibrary array when invoked
function populateLibrary(){
    //Clears current displayed elements
    clear()

    //Iterate through library and each book card
    myLibrary.forEach(book=>{
        //Create Card Element and sets its color theme
        let card = document.createElement('div');
        card.classList.add(`${book.color}`, 'book')

        //Cover of the card and appending of classes
        let cover = document.createElement('div')
        cover.classList.add('cover')
        let header = document.createElement('h1')
        header.textContent = book.title
        cover.appendChild(header)
        card.appendChild(cover)

        //Pages for animation on hover
        for(let i = 0;i<5;i++){
            let page = document.createElement('div')
            page.classList.add('page')
            card.appendChild(page)
        }

        // Create content of the book card by setting the current book
        // properties to its corresponding element
        
        let lastPage = document.createElement('div')
        lastPage.classList.add('last-page')
        let title = document.createElement('h2')
        title.textContent = book.title
        let author = document.createElement('h2')
        author.textContent = book.author
        let pages = document.createElement('h2')
        pages.textContent = book.pages
        let status = document.createElement('h2')
        status.textContent = book.status
        

        //Creating and Appending options for cards
        let options = document.createElement('div')
        options.classList.add('options')
        let button1 = document.createElement('button')
        button1.setAttribute('type', 'button')
        button1.classList.add('status')
        if(book.status){
            button1.classList.add('readed')
            button1.textContent = 'Readed'
        }
        else{
            button1.classList.add('not-readed')
            button1.textContent = 'Not Readed'
        }
        button1.addEventListener('click', toggleStatus)

        let button2 = document.createElement('button')
        button2.setAttribute('type', 'button')
        button2.classList.add('delete')
        button2.textContent = 'Delete'
        button2.addEventListener('click', deleteEntry)

        options.appendChild(button1)
        options.appendChild(button2)

        
        //Appending content to last page
        lastPage.appendChild(title)
        lastPage.appendChild(author)
        lastPage.appendChild(pages)
        lastPage.appendChild(options)
        card.appendChild(lastPage)

        
        //BackCover
        let backCover = document.createElement('div')
        backCover.classList.add('back-cover')
        card.appendChild(backCover)

        //Append node to main container
        cardsContainer.appendChild(card)
    })
}

//Clears current displayed elements when invoked
function clear(){
    while (cardsContainer.firstChild) {
        cardsContainer.removeChild(cardsContainer.lastChild);
    }
}

//Triggered when form is submitted, parses data from the form and calls
//addBookToLibrary function
function validateForm(event){
    event.preventDefault()

    let data = Object.fromEntries(new FormData(event.target).entries());
    addBookToLibrary(data.title, data.author, data.numPages, data.status, data['color-cover'])
    populateLibrary()
    //Clears form data anew
    event.target.reset()
}

//toggles status property of the selected book
function toggleStatus(event){
    let index = [...event.target.parentNode.parentNode.parentNode.parentNode.children].indexOf(event.target.parentNode.parentNode.parentNode)
    myLibrary[index].status = myLibrary[index].status ? false:true;
    //Displays updated myLibrary
    populateLibrary()

    //Save changes on the local storage
    localStorage.setItem('library', JSON.stringify(myLibrary));
}
//deletes book of the library 
function deleteEntry(event){
    let index = [...event.target.parentNode.parentNode.parentNode.parentNode.children].indexOf(event.target.parentNode.parentNode.parentNode)
    myLibrary.splice(index, 1)
    //Displays updated myLibrary
    populateLibrary()
    
    //Save changes on the local storage
    localStorage.setItem('library', JSON.stringify(myLibrary));
}
setInterval(()=>{
    bookCounter.textContent = `Books on Library: ${myLibrary.length}`

    let booksLeft = myLibrary.filter(book => !book.status).length
    remainingCounter.textContent = `Books left to read: ${booksLeft}`;

    completed.textContent = `Completed: ${myLibrary.length - booksLeft}`
})

document.addEventListener('DOMContentLoaded', populateLibrary)