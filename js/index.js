document.addEventListener("DOMContentLoaded", function() {
  const bookList = document.querySelector("ul#list")
  const divShow = document.querySelector("div#show-panel")

  // const currentUser = getRandomUser()

  // function getRandomUser() {
  //   fetch("http://localhost:3000/users")
  //     .then(res => res.json())
  //     .then(users => {
  //       return  
  //       // return {"id":1, "username":"pouros"}
  //     // })
  // }

//   function sample(array) {
//     return array[Math.floor ( Math.random() * array.length )]
//   }

  fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(books => showBooks(books))

function showBooks(books){
    books.forEach(book => {
        let li = document.createElement("li")
        li.innerText = book.title
        li.id = book.id
        bookList.append(li)
        li.addEventListener("click", () => {
          displayBook(book)
        })
    })
};

function displayBook(book){
    fetch('http://localhost:3000/books'+'/'+book.id)
        .then(resp => resp.json())
        .then(bookInfo => {
          let h1 = document.createElement('h1')
          h1.innerText = bookInfo.title
          let img = document.createElement('img')
          img.src = bookInfo.img_url
          let p = document.createElement('p')
          p.innerText = bookInfo.description
          let ul = document.createElement("ul")
          ul.id = "users"
          bookInfo.users.forEach(user => {
            //   debugger
              let userLi = document.createElement("li")
              userLi.innerText = user.username
              ul.append(userLi)
          })
          let btn = document.createElement("button")
          btn.innerText = "read"
          btn.addEventListener("click", () => {
            
            if (book.users.some(user => user.id === 1)){
            // if (book.users.includes({"id":1, "username":"pouros"})){
              // debugger
              book.users.forEach(user => {if (user.id === 1){
                
                book.users.splice(book.users.indexOf(user), 1)
                // book.user.remove()

              }})
            }
            else{
              book.users.push({"id":1, "username":"pouros"})
            }
              fetch('http://localhost:3000/books'+'/'+book.id, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(book)
              })
            .then(resp => displayBook(book))

          });
            
          divShow.innerHTML = ""
          divShow.append(h1,img,p,ul, btn)
        })
}

});
