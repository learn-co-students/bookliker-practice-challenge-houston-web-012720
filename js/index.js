document.addEventListener("DOMContentLoaded", function() {

  fetch("http://localhost:3000/books")
  .then(function(res) {
    return res.json()
  }).then(function(json) {
    showBooks(json)
  })

  function showBooks(json) {
    json.forEach(function(book) {
      createBook(book)
    })
  }

  function createBook(book) {
    let ul = document.getElementById("list")
    let li = document.createElement('li')
    li.innerText = book.title
    li.addEventListener('click', function() {
      let div = document.getElementById("show-panel")
      div.innerHTML = ""
      let h2 = document.createElement("h2")
      h2.innerText = book.title
      let img = document.createElement("img")
      img.src = book.img_url
      let p = document.createElement("p")
      p.innerText = book.description
      let uluser = document.createElement("ul")
      showusers(book, uluser)
      let btn = document.createElement("button")
      btn.innerText = "Read Me"
      btn.addEventListener("click", function() {
        let existing = book.users.filter(function(user) { return user.username == "pouros" })
        if (existing.length === 0) {
          book.users.push({ id: 1, "username": "pouros" })
          fetch("http://localhost:3000/books/" + book.id, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
             },
            body: JSON.stringify({
              users: book.users
            })
          })
          .then(function(res) {
            return res.json()
          }).then(function(updatedBook) {
            uluser.innerHTML = ""
            showusers(updatedBook, uluser)
            btn.innerText = "Remove"
          }).catch(error => alert("oh no"))
        } else {
          // alert("You have already read this book!")
          let removed = book.users.filter(function(user){
            return user["username"] !== "pouros"
          })
          fetch("http://localhost:3000/books/" + book.id, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
              users: removed
            })
          })
          .then(function(resp){return resp.json()})
          .then(function(updatedBook){
            uluser.innerHTML = ""
            showusers(updatedBook, uluser)
            btn.innerText = "Read Me"
            book = updatedBook
          })

        }
      })
      div.append(h2, img, p, uluser, btn)
    })
    ul.append(li)
  }

  function showusers(book, uluser) {
    book.users.forEach(function(user) {
      let li = document.createElement("li")
      li.innerText = user.username
      uluser.append(li)
    })
  }

});