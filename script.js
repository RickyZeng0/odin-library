const myLibrary = [];
const table = document.querySelector("table");
const form = document.querySelector("form");

function Book(title, author, page, read) {
    if (!new.target) {
        throw Error("Please use the constructor with new keyword");
    }
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
    //window.crypto.randomUUID() , globalThis.crypto.randomUUID(), or crypto.randomUUID()
    this.id = globalThis.crypto.randomUUID();
    //we need this variable because we may call the displayAllBook many times !
    this.display = false;
}

function addBookToLibrary(title, author, page, read) {
    let book = new Book(title, author, page, read);
    myLibrary.push(book);
}

function displayAllBook() {
    //for in get the key of object, here the key of myLibrary is the index
    //to get the object which is the value of the array, we need for of
    //Difference Between Iterable and Enumerable Properties
    for (let book of myLibrary) {
        //should use continue here
        if (book.display) continue;
        displayBook(book);
    }
}

function displayBook(book) {
    book.display = true;
    const tr = document.createElement("tr");
    //so we can locate and delete the entire row
    tr.setAttribute("data-id", book.id);
    let counter = 0;
    for (let property in book) {
        if (Object.hasOwn(book, property) && counter < 3) {
            const td = document.createElement("td");
            //property here is variable, use dot then it will return undefined!
            td.textContent = book[property];
            tr.appendChild(td);
            counter++;
        }
        if (property == "read") {
            //create button and then add event
            const button = document.createElement("button");
            if (book.property) button.textContent = "Read";
            else button.textContent = "Not Read";
            button.addEventListener("click", () => {
                if (button.textContent == "Read") button.textContent = "Not Read";
                else button.textContent = "Read";
            });

            const delButton = document.createElement("button");
            delButton.textContent = "Delete";
            //tr and button both need the same id to match up
            delButton.setAttribute("data-id", book.id);
            delButton.addEventListener("click", () => {
                //delete it from the DOM tree
                let id = delButton.getAttribute("data-id");
                //the css attribute selector need ""
                const deletedRow = document.querySelector(`tr[data-id="${id}"]`);
                table.removeChild(deletedRow);
                //and also delete it from the array
                const deletedIndex = myLibrary.findIndex((current) => current.id == id);
                myLibrary.splice(deletedIndex, 1);
            });

            //insert it to the table
            const div = document.createElement("div");
            div.appendChild(button);
            div.appendChild(delButton);
            tr.appendChild(div);
        }
    }
    table.appendChild(tr);
}


form.addEventListener("submit", (event) => {
    //we need this line, otherwise ,the website will refresh
    event.preventDefault();
    const formData = new FormData(form);
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const read = formData.get("read") == null ? false : true;
    addBookToLibrary(title,author,pages,read);
    displayAllBook();
    //reset the whole form, it is only for form but not form control
    form.reset();
});

addBookToLibrary("Blacksoul", "Sushi", 200, true);
addBookToLibrary("Blacksoul2", "Sushi", 400, false);
//the tools in chrome show the update version, so the first and second log looks the same!
console.log(myLibrary);
displayAllBook();
console.log(myLibrary);
