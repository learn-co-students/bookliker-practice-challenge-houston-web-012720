document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/books")
    .then(res => res.json())
    .then(books => showBooks(books))

    function showBooks(books) {
        books.forEach(book => showBook(book))
    }

    function showBook(book) {
        // const div = document.querySelector("div")
        const list = document.getElementById("list")
        const li = document.createElement("li")
        li.innerText = book.title
        li.addEventListener('click', function() {
            const div = document.querySelector("#show-panel")
            div.innerHTML = ""
            const h2 = document.createElement("h2")
            h2.innerText = book.title
            const img = document.createElement("img")
            img.src = book.img_url
            const p = document.createElement("p")
            p.innerText = book.description
            const ul = document.createElement("ul")
            book.users.forEach(user => {
                const li = document.createElement("li")
                li.innerText = user.username
                ul.append(li)
            })
            const btn = document.createElement("button")
            btn.innerText = "Like"
            btn.addEventListener('click', () => {
                book.users.push({"id": 1, "username": "pouros"})
                fetch("http://localhost:3000/books/" + book.id, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify ({
                        users: book.users
                    })
                })
                .then(res => res.json())
                .then(newBook => {
                    let li = document.createElement("li")
                    li.innerText = "pouros"
                    ul.append(li)
                })
            })
            
            div.append(h2,img,p,ul,btn)
        })
        // li.append(div)
        list.append(li)
    }
});
