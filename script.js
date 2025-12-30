const myLibrary = [];

function Book(title, author, page, read){
    if(!new.target){
        throw Error("Please use the constructor with new keyword");
    }
    this.title = title;
    this.author = author;
    this.page = page;
    this.read = read;
    //window.crypto.randomUUID() , globalThis.crypto.randomUUID(), or crypto.randomUUID()
    this.id = globalThis.crypto.randomUUID();
}

function addBookToLibrary(title,author,page,read){
    let book = new Book(title,author,page,read);
    myLibrary.push(book);
}
