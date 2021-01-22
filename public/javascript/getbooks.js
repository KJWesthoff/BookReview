



const bookSearchHandler = async function () {

    //Url for the google searc books api
    var googleApiUrl = "https://www.googleapis.com/books/v1/volumes?q=";
    
    // Capture a user search string and get the books using fetch
    const searchData  = document.querySelector('#book-search-box').value.trim(); 
        // if the search is empty then:
        if(searchData === "" || searchData === null){
            console.log("PLease enter a search");
        } else {
            response = await fetch(googleApiUrl+searchData)
            bookData = await response.json();
        
            

            // render the boks on the frontpage
            document.querySelector('#google_books_list').innerHTML = digOutBookdata(bookData)

        }
    };
    
const digOutBookdata = function(bookList) {
    var outputList = "";
    for(var i = 0; i<bookList.items.length; i++){
        item = bookList.items[i];
        bookObj = {
            title:item.volumeInfo.title,
            author:item.volumeInfo.authors,
            img_url:item.volumeInfo.imageLinks.thumbnail 
        }

        outputList +=  `<div class="row mt-4">${htmlCardifyBookdata(bookObj)}</div>`;
        

        
    }
    return outputList;

}

const htmlCardifyBookdata = function(bookObj){

    var htmlCard = `<div class="col-lg-6">
    <div class="card" style="">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img src="${bookObj.img_url}" class="card-img" alt="...">
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${bookObj.title}</h5>
            <p class="card-text">Author: ${bookObj.author}</p>
            <button id="add-book-btn">Add Book</button>
          </div>
        </div>
      </div>
    </div>
  </div>`
  return htmlCard;        
}


const addBookToUser = async function () {
    let title = this.querySelector(".card-title").textContent;
    let author = this.querySelector(".card-text").textContent;
    let img_url = this.querySelector("img").getAttribute("src");
    
    const response = await fetch('/api/books/', {
        method: 'post',
        body: JSON.stringify({
          "title": title,
          "author": author,
        }),
        headers: { 'Content-Type': 'application/json' }
      });

    console.log(response);  
    console.log(title, author,img_url);


}



document.querySelector('#book-search').addEventListener('click', bookSearchHandler)
//document.querySelector("#add-book-btn").addEventListener('click', addBookToUser)

// jQuery used when the elements do not exist all the time
$("body").on("click",".card", "#add-book-btn", addBookToUser);