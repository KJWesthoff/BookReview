



const bookSearchHandler = async function () {

    //Url for the google searc books api
    var googleApiUrl = "https://www.googleapis.com/books/v1/volumes?q=";
    
    // Capture a user search string and get the books using fetch
    const searchData  = document.querySelector('#book-search-box').value.trim(); 
        // if the search is empty then:
        if(searchData === "" || searchData === null){
            console.log("Please enter a search");
        } else {
            response = await fetch(googleApiUrl+searchData)
            bookData = await response.json();
        
            

            // render the books on the front page
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
            img_url:item.volumeInfo.imageLinks.thumbnail,
            book_url:item.volumeInfo.infoLink 
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
            <a class="card-text" href="${bookObj.book_url}" target="_blank">See it on Google</a>
            <p class="card-text author">Author: ${bookObj.author}</p>
            
          
            <span class="rating_stars rating_0">
              <span class='s' data-low='0.5' data-high='1'><i class="fa fa-star-o"></i><i class="fa fa-star-half-o"></i><i class="fa fa-star"></i></span>
              <span class='s' data-low='1.5' data-high='2'><i class="fa fa-star-o"></i><i class="fa fa-star-half-o"></i><i class="fa fa-star"></i></span>
              <span class='s' data-low='2.5' data-high='3'><i class="fa fa-star-o"></i><i class="fa fa-star-half-o"></i><i class="fa fa-star"></i></span>
              <span class='s' data-low='3.5' data-high='4'><i class="fa fa-star-o"></i><i class="fa fa-star-half-o"></i><i class="fa fa-star"></i></span>
              <span class='s' data-low='4.5' data-high='5'><i class="fa fa-star-o"></i><i class="fa fa-star-half-o"></i><i class="fa fa-star"></i></span>
                        
              <span class='r r0_5' data-rating='1' data-value='0.5'></span>
              <span class='r r1' data-rating='1' data-value='1'></span>
              <span class='r r1_5' data-rating='15' data-value='1.5'></span>
              <span class='r r2' data-rating='2' data-value='2'></span>
              <span class='r r2_5' data-rating='25' data-value='2.5'></span>
              <span class='r r3' data-rating='3' data-value='3'></span>
              <span class='r r3_5' data-rating='35' data-value='3.5'></span>
              <span class='r r4' data-rating='4' data-value='4'></span>
              <span class='r r4_5' data-rating='45' data-value='4.5'></span>
              <span class='r r5' data-rating='5' data-value='5'></span>
            </span>

     

          </div>
        </div>
      </div>
    </div>
  </div>`
  return htmlCard;        
}


const addBookToUser = async function (title, author, stars, img_url, book_url) {
    
    
    //check if the book is already in the DB
    let inDB = await fetch('/api/books/title', {
      method: 'post',
        body: JSON.stringify({
          "title": title,
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    
    // Clunky number of books
    nB = await inDB.json()
    console.log(nB)

    if(nB.length == 0) {
      // If not add the book to the db
      const response = await fetch('/api/books/', {
          method: 'post',
          body: JSON.stringify({
            "title": title,
            "author": author,
            "img_url":img_url,
            "book_url":book_url

          }),
          headers: { 'Content-Type': 'application/json' }
        });

      // then get the id of the   
      ret = await response.json();  
      id = ret.id;  
      console.log("ID from new" , id)  
    } else {
     id = nB[0].id
     console.log("ID from OLD" , id)
    }


    
    const castVote = await fetch('/api/comments/vote', {
      method:'post',
      body:JSON.stringify({
        "book_id": id,
        "stars": stars    
      }),
      headers: { 'Content-Type': 'application/json' }
    })

    console.log(castVote);


}


// Listen to the Stars.... 
jQuery(document).ready(function($) {
  $('body').on('mouseover','.rating_stars span.r', function(event) {
    event.stopImmediatePropagation()
    
    //console.log(this)
    var thiscard = (this.closest(".card"))
    let title = thiscard.querySelector(".card-title").textContent;
    let author = thiscard.querySelector(".card-text").textContent;
    let img_url = thiscard.querySelector("img").getAttribute("src");

    var rating = $(this).data('rating');
    var value = $(this).data('value');
    
    $(thiscard).find("rating_stars").attr('class', '').addClass('rating_stars').addClass('rating_'+rating);
    highlight_star(thiscard, value);  
  });

  $('body').on('click','.rating_stars span.r', function(event) {
    event.stopImmediatePropagation()
    
    //console.log(this)
    var thiscard = (this.closest(".card"))
    let title = thiscard.querySelector(".card-title").textContent;
    let author = thiscard.querySelector(".author").textContent;
    let img_url = thiscard.querySelector("img").getAttribute("src");
    let book_url = thiscard.querySelector("a").getAttribute("href");
    var rating = $(this).data('rating');
    var value = $(this).data('value');
    
    
    
    // Add The Book to the User
    addBookToUser(title, author, rating, img_url, book_url)
  
  });


  var highlight_star = function(card, rating) {
    $(card).find('.rating_stars span.s').each(function() {
        var low = $(this).data('low');
        var high = $(this).data('high');
        $(this).removeClass('active-high').removeClass('active-low');
        if (rating >= high) $(this).addClass('active-high');
        else if (rating == low) $(this).addClass('active-low');
    });
  }

});
          


document.querySelector('#book-search').addEventListener('click', bookSearchHandler)
//document.querySelector("#add-book-btn").addEventListener('click', addBookToUser)

// jQuery used when the elements do not exist all the time
//$("body").on("click","#add-book-btn", addBookToUser);