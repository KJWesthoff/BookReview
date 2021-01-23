



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
            
            <button id="add-book-btn">Vote Book</button>
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


const addBookToUser = async function () {
    let title = this.querySelector(".card-title").textContent;
    let author = this.querySelector(".card-text").textContent;
    let img_url = this.querySelector("img").getAttribute("src");
    

    // first add the book to the db
    const response = await fetch('/api/books/', {
        method: 'post',
        body: JSON.stringify({
          "title": title,
          "author": author,
        }),
        headers: { 'Content-Type': 'application/json' }
      });

    // then get the id of the   
    ret = await response.json();  
    console.log(title, ret.id);

    const castVote = await fetch('/api/comments/vote', {
      method:'post',
      body:JSON.stringify({
        "book_id": ret.id,
        "stars": 22      
      }),
      headers: { 'Content-Type': 'application/json' }
    })

    console.log(castVote);


}


// Stars
jQuery(document).ready(function($) {
  $('.card .rating_stars span.r').hover(function() {
              // get hovered value
              var rating = $(this).data('rating');
              var value = $(this).data('value');
              $(this).parent().attr('class', '').addClass('rating_stars').addClass('rating_'+rating);
              highlight_star(value);
          }, function() {
              // get hidden field value
              var rating = $("#rating").val();
              var value = $("#rating_val").val();
              $(this).parent().attr('class', '').addClass('rating_stars').addClass('rating_'+rating);
              highlight_star(value);
          }).click(function() {
              // Set hidden field value
              var value = $(this).data('value');
              $("#rating_val").val(value);
  
              var rating = $(this).data('rating');
              $("#rating").val(rating);
              
              highlight_star(value);
          });
          
          var highlight_star = function(rating) {
              $('.rating_stars span.s').each(function() {
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
$("body").on("click",".card" ,"#add-book-btn", addBookToUser);