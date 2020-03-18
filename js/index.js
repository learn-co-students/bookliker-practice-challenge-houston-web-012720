document.addEventListener("DOMContentLoaded", function() {
    const div = document.querySelector('#show-panel')


    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(books =>  {
        books.forEach(book => {
            bookList(book)
        })
    })

    function bookList(book){
        const ul = document.querySelector('ul#list')
        const li = document.createElement('li')
        li.innerText = `${book.title}`
        li.addEventListener('click', () =>{
            div.innerHTML = ''
            bookCard(book)
        })
        ul.append(li)
        
    }

    // function readList(username){
    //     const h3 = document.createElement('h3')
    //     h3.innerText = `${username.name}`


    // }

     function bookCard(book){
        
        const h2 = document.createElement('h2')
        h2.innerText = book.title
        const img = document.createElement('img')
        img.src = book.img_url 
        const p = document.createElement('p')
        p.innerText = book.description

        const ul1= document.createElement('ul')

        book.users.forEach(user => {
            const li = document.createElement('li')
            li.innerText = user.username
            ul1.append(li)
        })
        


        const bttn = document.createElement('button')
        bttn.innerText = 'Read Book'

        bttn.addEventListener('click', () => {
            event.preventDefault()
            book.users.push({"id":1, "username":"pouros"})

            fetch('http://localhost:3000/books/'+book.id, {
                    method: 'PATCH',
                    headers: {
                    'Content-Type': 'application/json',
                        Accept: 'application/json'
                    },
                    body: JSON.stringify({
                    'users': book.users 
                    })
                    
                
            })
            .then(res => res.json())
            .then( users => {
            console.log(users) })
        })
        

        div.append(h2, img, p,ul1, bttn)

    }

});
