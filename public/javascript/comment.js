

addUserCommentToBook = function(event){
    var thiscard = (this.closest(".card"))
    let book_id = thiscard.getAttribute("book_id");
    
    document.location.replace("/book/"+book_id);
}


$("body").on("click", ".comment_btn", addUserCommentToBook);



async function commentFormHandler(event) {
    event.preventDefault();
  
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
    const book_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (comment_text) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({
          book_id,
          comment_text
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  }

  $("body").on("click", ".submit_comment", commentFormHandler);