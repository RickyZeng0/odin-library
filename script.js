const myLibrary = [];
const table = document.querySelector("table");

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
}

function addBookToLibrary(title, author, page, read) {
    let book = new Book(title, author, page, read);
    myLibrary.push(book);
}

function displayAllBook() {
    //for in get the key of object, here the key of myLibrary is the index
    //to get the object which is the value of the array, we need for of
    for (let book of myLibrary) {
        console.log(book);
        const tr = document.createElement("tr");
        let counter = 0;
        for (let property in book) {
            if (Object.hasOwn(book, property) && counter < 4) {
                const td = document.createElement("td");
                //property here is variable, use dot then it will return undefined!
                td.textContent = book[property];
                tr.appendChild(td);
                counter++;
            }
        }
        console.log("enter table");
        console.log(book);
        table.appendChild(tr);
        book.display = true;
    }
}
addBookToLibrary("Blacksoul", "Sushi", 200, true);
addBookToLibrary("Blacksoul2", "Sushi", 400, false);
displayAllBook();
