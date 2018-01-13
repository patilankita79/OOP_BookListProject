// Book Constructor - Handles creating the Book object
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor - Set of prototype methods like add book to the list, delete the book, show the alert
function UI() {}


// Create a prototype to add the book to the List
UI.prototype.addBooktoList = function(book) {
  //console.log(book);
  const list = document.getElementById('book-list');

  // Create tr element
  const row = document.createElement('tr');
  console.log(row);

  // Insert columns
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href = "#" class = "delete">X</a></td>
  `;

  list.appendChild(row);
}

// Show alert
UI.prototype.showAlert = function(message, className) {
    // Create div
    const div = document.createElement('div');

    // Add className
    div.className = `alert ${className}`;

    // Add text
    div.appendChild(document.createTextNode(message));

    // Get parent
    const container = document.querySelector('.container');

    const form = document.querySelector('#book-form');

    // Insert alert
    container.insertBefore(div, form);

    // Disappear/timeout after 3 seconds
    setTimeout(function(){
      document.querySelector('.alert').remove();
    }, 3000);
}
// Delete Book
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete') {
    target.parentElement.parentElement.remove();
  }
}


// Clear fields
UI.prototype.clearFields = function() {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Event Listener for adding a book
document.getElementById('book-form').addEventListener('submit', function(e) {
  console.log('test');

  // Get the form fields
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value

  // Once the form is submitted, instantiate Book constructor
  const book = new Book(title, author, isbn);

  // Instantiate UI Constructor
  const ui = new UI();

  // Validate
  if(title === '' || author === '' || isbn === '') {
    // Error alert
    ui.showAlert('Please fill in all the fields', 'error');
  } else {
    // Add book to List
    // console.log(book);
    ui.addBooktoList(book);

    // Show success
    ui.showAlert('Book Added!', 'success');


    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
  // Instantiate UI
  const ui = new UI();

  ui.deleteBook(e.target);

  // Show alert
  ui.showAlert(`Book Removed!`, 'success');
  e.preventDefault();
});
