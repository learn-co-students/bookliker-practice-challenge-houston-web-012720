const panelUl = document.getElementById('list')
const showDiv = document.getElementById('show-panel')

document.addEventListener("DOMContentLoaded", function() {
  getBooks()
  
});

let getBooks = () => {
  fetch('http://localhost:3000/books')
  .then(r => r.json())
  .then(books => books.forEach(book => showBook(book)))
}

let showBook = (book) => {
  const li = document.createElement('li')
  li.innerText = book.title
  panelUl.append(li)

  li.addEventListener("click", () => {
    showDiv.innerHTML = ""
    
    const h1 = document.createElement('h1')
    h1.innerText = book.title

    const img = document.createElement("img")
    img.src = book.img_url

    const p = document.createElement("p")
    p.innerText = book.description
    
    const ul = document.createElement('ul')
    ul.id = "user-list"
    for (user of book.users) {
      const li = document.createElement('li')
      li.innerText = user.username
      li.id = user.id
      ul.append(li, document.createElement('br'))
    }

    const btn = document.createElement('button')
    btn.innerText = 'Read book'
    btn.addEventListener('click', () => {
      // const userList = book.users

      if (!checkUser(book)) {
        book.users.push({"id":1, "username":"pouros"})
        fetch('http://localhost:3000/books/' + book.id, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json' //need to capitalize 'content-type'??
          },
          body: JSON.stringify({
            users: book.users
          })
        })
        .then(r => r.json())
        .then(newBook => {
          const newUser = newBook.users[newBook.users.length - 1]
          const li = document.createElement('li')
          li.innerText = newUser.username
          li.setAttribute('id', 1)
          ul.append(li, document.createElement('br'))
        })
      } else {
        // console.log('no')
        book.users.pop()

        fetch('http://localhost:3000/books/' + book.id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            users: book.users
          })
        })
        .then(r => r.json())
        .then(newBook => {
          // document.querySelector("selector [user-id='1']").remove()
          const userList = document.getElementById('user-list')
          // userList.querySelector('#1').remove() // Need CSS???????
          document.getElementById(1).remove()
          userList.querySelectorAll('br')[userList.querySelectorAll('br').length - 1].remove()
        })
      }

    })
    
    showDiv.append(h1, img, p, ul, btn)
  })
}

let checkUser = (book) => {
  isItTrue = false
  for (user of book.users) {
    if (user.id == 1) {isItTrue = true}
  }
  return isItTrue;

  // book.users.values().include(1) //needs to be rewritten
}