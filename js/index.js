const BOOKS_URL = "http://localhost:3000/books"

document.addEventListener("DOMContentLoaded", function() {

  const getBooks = () => {
    fetch(BOOKS_URL)
      .then(res => res.json())
      .then(books => {
        console.log(books)
        books.forEach(book => createBookListing(book))
      })
  }

  const createBookListing = (book) => {
    const list = document.querySelector("#list")
    
    const book_item = document.createElement("li")

    book_item.innerText = book.title

    book_item.addEventListener("click", () => {
      showBook(book)
    })

    list.append(book_item)
  }

  const addUser = (user, user_list) => {
    const user_item = document.createElement("p")
    user_item.innerText = user.username
    user_item.id = user.username
    user_item.setAttribute("data-user-id", user.id)
    user_list.append(user_item)
  }

  const showBook = (book) => {

    const show = document.querySelector("#show-panel")

    show.innerHTML = ""

    let has_read = !!book.users.some( user => user.username == "pouros")

    // const book_info = document.createElement("div")
    const user_list = document.createElement("div")
    const book_title = document.createElement("h2")
    const book_img = document.createElement("img")
    const book_desc = document.createElement("h4")
    const read_btn = document.createElement("button")

    !book.users.some( user => user.username == "pouros") ? read_btn.innerText = "Read Book" : read_btn.innerText = "Unread Book"

    book_title.innerText = book.title
    book_img.src = book.img_url
    book_desc.innerText = book.description

    book.users.forEach(user => {
      addUser(user, user_list)
    })

    const current_user = { "id": 1, "username": "pouros"}

    read_btn.addEventListener("click", () => {

      if ( !book.users.some( user => user.username == "pouros" ) ){

        fetch(BOOKS_URL + "/" + book.id, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "users": [...book.users, current_user]
          })
        })
          .then( res => res.json() )
          .then( book_info => {
            addUser(current_user, user_list)
            book.users = book_info.users
            read_btn.innerText = "Unread Book"
          })
      } else {
        const user_item = document.querySelector("#pouros")
        user_item.remove()

        fetch(BOOKS_URL + "/" + book.id, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            "users": book.users.filter(user => !user.username == "pouros")
          })
        })
          .then(res => res.json())
          .then( book_info => { 
            console.log(book.users)
            book.users = book_info.users
            read_btn.innerText = "Read Book"
          })
      }
    })

    show.append(book_title, book_img, book_desc, user_list, read_btn)

  }

  getBooks()

});
