document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:3000/books')
        .then(function(res) {
            return res.json()
        }).then(function(books) {
            showpicture(books)
        })


    function showpicture(books) {
        books.forEach(function(book) {
            createbook(book)
        })
    }

    function createbook(book) {

        let ul = document.getElementById("list")
        let li = document.createElement('li')
        li.innerText = book.title
        li.addEventListener('click', function() {
            let div = document.getElementById("show-panel")
            div.innerText = ""
            let h2 = document.createElement('h2')
            h2.innerText = book.title
            let image = document.createElement('img')
            image.src = book.img_url
            let ul2 = document.createElement('ul')
            createuser(book, ul2)
            let button = document.createElement('button')
            button.innerText = "Read me"
            button.addEventListener('click', function() {
                let exsist = book.users.find(function(user) {
                    return user.username == "pouros"
                })
                fetch(`http://localhost:3000/books/${book.id}`, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json", Accept: "application/json" },
                        body: JSON.stringify({
                            users: exsist ? book.users.remove(exsist) : book.users.push({ "id": 1, "username": "pouros" })
                        })
                    })
                    .then(function(res) {
                        return res.json()
                    }).then(function(updatedbook) {
                        console.log(updatedbook)
                        createuser(updatedbook, ul2)
                    })
            })

            div.append(h2, image, ul2, button)
        })


        ul.append(li)
    }

    function createuser(book, ul2) {
        ul2.innerText = ""
        book.users.forEach(function(user) {
            let li = document.createElement('li')
            li.innerText = user.username
            ul2.append(li)
        })
    }









});