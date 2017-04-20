// ===========================================================================================
// SUBMIT NEW COMMENT ASYNCHRONOUSLY
// ===========================================================================================
$('#newComment').submit(function(e){
    e.preventDefault();
    var formData = $(this).serialize();
    var formAction = $(this).attr('action');
    $.post(formAction, formData, function(data){
       console.log(data);
       $("#comments").append(
           `<div class="comment-container">
                <div class="jumbotron comment">
                    <div class="row">
                        <div class="col-md-1">
                            <img class="comment-ico" src = "${data.comment.author.image}">
                        </div>
                        
                        <div class="col-md-7">
                            <h4>${data.comment.author.username}</h4>
                        </div>
        
                    </div>
                </div>
                    <div><p>${data.comment.text}</p></div>
        
              <form id="edit-comment-form" action="/blogs/${data.blog._id}/comments/${data.comment._id}" method="POST" id="newComment">
                    <textarea class="form-control" rows="4"  name="comment[text]">${data.comment.text}</textarea>
                    <button class="btn btn-lg btn-primary btn-block">Submit</button>
                </form>
                    
                    <div class="row">
                        <div class="col-md-1 choice">
                            <a class="edit">Edit</a>
                        </div>
                        <div class="col-md-1">
                            <form id="delete-form" action="/blogs/${data.blog._id}/comments/${data.comment._id}?_method=DELETE" method="POST">
                                <input type="submit" class="button-delete" value="Delete">
                            </form>
                        </div>
                    </div>
                <hr class = "style-three">
            </div>`
           );
           $('#newComment').find('.form-control').val('');
    });
});

// show and hide edit comment form
$('#comments').on('click', '.edit', function(){
    $(this).closest('.row').prev('#edit-comment-form').toggle();
})

// update comment
$('#comments').on('submit', '#edit-comment-form', function(e){
    e.preventDefault();
    // get info from form
    var formData = $(this).serialize();
    var formAction = $(this).attr('action');
    var $originalItem = $(this).parent('.comment-container');
    $.ajax({
        url: formAction,
        data: formData,
        type: 'PUT',
        originalItem: $originalItem,
        success: function(data) {
            var blog_id = location.pathname.replace("/blogs/", "");
            this.originalItem.html(
                `
        <div class="jumbotron comment">
            <div class="row">
                <div class="col-md-1">
                    <img class="comment-ico" src = "${data.author.image}">
                </div>
                
                <div class="col-md-7">
                    <h4>${data.author.username}</h4>
                </div>
            </div>
        </div>
            <div><p>${data.text}</p></div>

      <form id="edit-comment-form" action="/blogs/${blog_id}/comments/${data._id}" method="POST" id="newComment">
            <textarea class="form-control" rows="4"  name="comment[text]">${data.text}</textarea>
            <button class="btn btn-lg btn-primary btn-block">Submit</button>
        </form>
            
            <div class="row">
                <div class="col-md-1 choice">
                    <a class="edit">Edit</a>
                </div>
                <div class="col-md-1">
                    <form id="delete-form" action="/blogs/${blog_id}/comments/${data._id}?_method=DELETE" method="POST">
                        <input type="submit" class="button-delete" value="Delete">
                    </form>
                </div>
            </div>
        <hr class = "style-three">
                `
                );
        }
    });
});


// delete comments asynchonously
$('#comments').on('submit', '#delete-form', function(e){
    e.preventDefault();
    var confirmResponse = confirm('Are you sure you want to delete this comment?');
    if(confirmResponse){
        var actionURL = $(this).attr('action');
        $itemToDelete = $(this).closest('.comment-container');
        $.ajax({
            url: actionURL,
            type: 'DELETE',
            itemToDelete: $itemToDelete,
            success: function(data){
                this.itemToDelete.remove();
            }
        })
    } else {
        $(this).find('input').blur();
    }
})

// Toggle styles for edit-profile page
$('#edit-1').on('click', function(){
    $('#hidden1').toggleClass('hidden');
    $('#edit-username').toggleClass('user-highlight');
    if(!$('#hidden2').hasClass('hidden')){
       $('#hidden2').toggleClass('hidden'); 
    }
    if($('#edit-image').hasClass('user-highlight')){
      $('#edit-image').toggleClass('user-highlight');
    }
})

$('#edit-2').on('click', function(){
    $('#hidden2').toggleClass('hidden');
    $('#edit-image').toggleClass('user-highlight');
    if(!$('#hidden1').hasClass('hidden')){
       $('#hidden1').toggleClass('hidden'); 
    }
    if($('#edit-username').hasClass('user-highlight')){
      $('#edit-username').toggleClass('user-highlight');
    }
})

$('#submit-login').on('click', function(e) {
    e.preventDefault()
 var value1 = $('#password1').val(),
     value2 = $('#password2').val();
     username = $('#username').val();
     email = $('#email').val();
  if(value1 !== value2) {
    return(false);
  }
  if(username == ""){
    $('#username').addClass('input-error');
    $('#user-error-icon').removeClass('hidden');
    $('#username-error').removeClass('hidden');
  } 
  if(email == ""){
    $('#email').addClass('input-error');
    $('#email-error-icon').removeClass('hidden');
    $('#email-error').removeClass('hidden');  
  } else {
      $('#register').submit()
  }
})

$('#username').on('focus', function(){
    $('#username').removeClass('input-error');
    $('#user-error-icon').addClass('hidden');
    $('#username-error').addClass('hidden');
})

$('#email').on('focus', function(){
    $('#email').removeClass('input-error');
    $('#email-error-icon').addClass('hidden');
    $('#email-error').addClass('hidden');
})

// styles for password verification box
$('#password2').on('blur', function() {
 var value1 = $("#password1").val(),
    value2 = $("#password2").val();
    if(value2 !== ""){
  if (value1 !== value2) {
    $('#password2').addClass('input-error');
    $('#error-icon').removeClass('hidden');
    $('#submit-login').addClass('disabled');
    $('#password-error').removeClass('hidden');
    $('#password2').removeClass('input-success');
    $('#success-icon').addClass('hidden');
} else {
    $('#password2').addClass('input-success');
    $('#success-icon').removeClass('hidden');
    $('#submit-login').addClass('disabled');
    $('#password-error').addClass('hidden');
    $('#password2').removeClass('input-error');
    $('#error-icon').addClass('hidden');
    $('#submit-login').removeClass('disabled');
    $('#password-error').addClass('hidden');
}
$('#password2').on('focus', function() {
    $('#password2').removeClass('input-error');
    $('#error-icon').addClass('hidden');
    $('#password-error').addClass('hidden');
    $('#password2').removeClass('input-success');
    $('#success-icon').addClass('hidden');
    $('#submit-login').removeClass('disabled');
})
}
})

$('#password1').on('blur', function() {
 var value1 = $("#password1").val(),
    value2 = $("#password2").val();
    if(value2 !== ""){
    if (value1 !== value2) {
    $('#password2').addClass('input-error');
    $('#error-icon').removeClass('hidden');
    $('#submit-login').addClass('disabled');
    $('#password-error').removeClass('hidden');
    $('#password2').removeClass('input-success');
    $('#success-icon').addClass('hidden');
} else {
    $('#password2').addClass('input-success');
    $('#success-icon').removeClass('hidden');
    $('#submit-login').removeClass('disabled');
    $('#password-error').addClass('hidden');
    $('#password2').removeClass('input-error');
    $('#error-icon').addClass('hidden');
    $('#submit-login').removeClass('disabled');
    $('#password-error').addClass('hidden');
}
$('#password2').on('focus', function() {
    $('#password2').removeClass('input-error');
    $('#error-icon').addClass('hidden');
    $('#password-error').addClass('hidden');
    $('#password2').removeClass('input-success');
    $('#success-icon').addClass('hidden');
})
}
})

 // user image 
$("#user-image-set").on("blur", function() {
var newUserImage = $('#user-image-set').val();
        if(newUserImage == ""){
        $("#user-image-preview").css("background-image", "url('https://cdn1.iconfinder.com/data/icons/unique-round-blue/93/user-512.png')")   
        } else {
        $("#user-image-preview").removeClass("user-image-preview");
        $("#user-image-preview").css("background-image", "url(" + newUserImage + ")");
        }
})
