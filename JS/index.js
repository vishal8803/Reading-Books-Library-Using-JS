console.log("Reading Books Library");
var allBookList = [];

showAllBooks();

function showAllBooks() {
  let tablebody = document.getElementById("tableBody");
  var allBooks = JSON.parse(localStorage.getItem("books"));

  if (allBooks != null && allBooks.length !== 0) {
    allBooks.forEach(function (element, index) {
      let uiString = `<tr>
                                <td>${index + 1}</td>
                                <td>${element.bname}</td>
                                <td>${element.author}</td>
                                <td>${element.type}</td>
                                <td><button onClick=returnBook(${index}) class="btn btn-primary">Return Book</button></td>
                            </tr>`;
      tablebody.innerHTML += uiString;
    });
  } else {
    tablebody.innerHTML = `<h4 style="text-align: center; margin:20px">Nothing To Show</h4>`;
  }
}

function returnBook(index) {
  allBookList = localStorage.getItem("books");
  allBookList = JSON.parse(allBookList);
  allBookList.splice(index, 1);
  console.log(allBookList);
  localStorage.setItem("books", JSON.stringify(allBookList));
  location.reload();
}

class Book {
  constructor(bookname, author, type) {
    this.bname = bookname;
    this.author = author;
    this.type = type;
  }
}

class Display {
  add(book) {
    // localStorage
    let allBooks = localStorage.getItem("books");

    if (allBooks != null) {
      allBooks = JSON.parse(allBooks);
      allBooks.push(book);
      localStorage.setItem("books", JSON.stringify(allBooks));
    } else {
      allBookList.push(book);
      localStorage.setItem("books", JSON.stringify(allBookList));
    }
  }

  validate(book) {
    if (
      book.bname.length < 2 ||
      book.author.length < 2 ||
      book.type == undefined
    ) {
      return false;
    } else {
      return true;
    }
  }

  message(type, msg) {
    let mesg = document.getElementById("mesg");
    mesg.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
      <strong>Message:</strong> ${msg}
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>`;

    setTimeout(function () {
      mesg.innerHTML = "";
    }, 5000);
  }

  clear() {
    let libform = document.getElementById("libForm");
    libform.reset();
  }
}

let libform = document.getElementById("libForm");

libform.addEventListener("submit", libraryFormSbmit);

function libraryFormSbmit(e) {
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;
  let type;

  let os = document.getElementById("Operating");
  let dsAlgo = document.getElementById("Algorithms");
  let network = document.getElementById("Networks");
  let dbms = document.getElementById("dbms");

  if (os.checked) {
    type = os.value;
  } else if (dsAlgo.checked) {
    type = dsAlgo.value;
  } else if (network.checked) {
    type = network.value;
  } else if (dbms.checked) {
    type = dbms.value;
  }

  let book = new Book(name, author, type);
  //   e.preventDefault();
  let display = new Display();
  if (display.validate(book)) {
    display.add(book);
    display.message("success", "Your Book Is Successfully Added");
    display.clear();
  } else {
    display.message("danger", "Sorry you cannot add this book");
  }
}
