// document.addEventListener("DOMContentLoaded", function() {});

const ul = document.querySelector('ul#list')
const show_div = document.querySelector('#show-panel')

fetch("http://localhost:3000/books")
.then(resp=> resp.json())
.then(books => showBooks(books))

const showBooks = (bookInfo) =>{
    bookInfo.forEach( book => {
        addBook(book)
    })
} 

const addBook = (book) => {
    const li = document.createElement('li')
    li.innerText = book.title
    li.style.cursor = "pointer"
    li.addEventListener('click', ()=>{
        show_div.innerHTML = ""
        const h4 = document.createElement('h4')
        h4.innerText = book.title 

        const img = document.createElement('img')
        img.src = book.img_url

        const p = document.createElement('p')
        p.innerText = book.description

        const like_label = document.createElement('label')
        like_label.innerText = "Likes"

        const user_ul = document.createElement('ul')

        book.users.forEach(user =>{
            const user_li = document.createElement('li')
            user_li.innerText = user.username
            user_ul.append(user_li)
        })
        const likeButton = document.createElement('button')
        likeButton.innerText = "like book"
        book.users.push({id: 1, username: "pouros"})
        likeButton.addEventListener('click',()=>{
            fetch("http://localhost:3000/books/"+book.id,{
                method: "PATCH",
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                 users: book.users
                })
            })
            .then(resp => resp.json())
            .then(book =>{
                const user_li = document.createElement('li')
                user_li.innerText = "pouros"
                user_ul.append(user_li)
            })
        })
        show_div.append(h4,img,p,like_label,user_ul,likeButton)
    })
    ul.append(li)
}
