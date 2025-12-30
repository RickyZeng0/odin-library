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
    this.display = false;
}

function addBookToLibrary(title, author, page, read) {
    let book = new Book(title, author, page, read);
    myLibrary.push(book);
}

function displayAllBook() {
    //for in get the key of object, here the key of myLibrary is the index
    //to get the object which is the value of the array, we need for of
    for (let book of myLibrary) {
        if(book.display) return;
        const tr = document.createElement("tr");
        let counter = 0;
        for (let property in book) {
            if(Object.hasOwn(book, property) && counter < 3) {
                const td = document.createElement("td");
                //property here is variable, use dot then it will return undefined!
                td.textContent = book[property];
                tr.appendChild(td);
                counter++;
            }
            if(property == "read"){
                const button = document.createElement("button");
                if(book.property) button.textContent = "read";
                else button.textContent = "not read";
                tr.appendChild(button); 
                button.addEventListener("click", ()=> {
                    if(button.textContent == "read") button.textContent = "not read";
                    else button.textContent = "read";
                });
            }
        }
        table.appendChild(tr);
    }
}

addBookToLibrary("Blacksoul", "Sushi", 200, true);
addBookToLibrary("Blacksoul2", "Sushi", 400, false);
displayAllBook();
