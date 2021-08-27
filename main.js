// class of a Book
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

//Class of UI that has some methods to call


class UI{

    static displayBooks(){

      

        const books=Store.getBooks();

        books.forEach((book)=>{
            UI.addBookToList(book);
        })



    }

    static addBookToList(book){

        const list=document.querySelector('#book-list');

        const row=document.createElement('tr');

        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>

        `

        list.appendChild(row)


    }
    static showAlert(message,className){

        const div=document.createElement('div');
        div.className=`alert alert-${className}`
        div.appendChild(document.createTextNode(`${message}`));
        const container=document.querySelector('.container');
        const form=document.querySelector('#my-from');

        container.insertBefore(div,form);

        setTimeout(()=> div.remove(),3000);




    }

    static clearFields(){
        
        document.querySelector('#title').value='';
    
        document.querySelector('#author').value='';
    
        document.querySelector('#isbn').value='';



    }

    static deleteBook(target){
        if(target.classList.contains('delete')){


            target.parentElement.parentElement.remove();



        }


    }



}

//Class of Sorage
class Store{

    static getBooks(){
        let books;

        if(localStorage.getItem('books')===null){
            books=[];
        }else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        const books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));

    }

    static removeBook(isbn){
        const books=Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1);
            }
        })
        localStorage.setItem('books',JSON.stringify(books));

    }





}


document.addEventListener('DOMContentLoaded',UI.displayBooks);

const form=document.querySelector('#my-from');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;

    if(title==='' || author==='' || isbn===''){
       UI.showAlert('Please enter all fields','danger');
    
    }else{


        const book=new Book(title,author,isbn);

        UI.addBookToList(book);

        Store.addBook(book);
    
        UI.showAlert('All fields entered successfully','success');
        UI.clearFields();
    
    }



})

function getISBN(ele){

    return ele.parentElement.parentElement.children[2].textContent;


}

const booklist=document.querySelector('#book-list').addEventListener('click',(e)=>{
    UI.deleteBook(e.target);
    Store.removeBook(getISBN(e.target))
    UI.showAlert('Book deleted','success');
})

