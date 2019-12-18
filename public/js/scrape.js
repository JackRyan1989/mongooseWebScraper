$(document).ready(function () {

    //Open up the comment box for user name and comment body:
    $(".commBtn").on('click', function () {
        let id = $(this).attr('id');
        //Get the specific article so you can populate the note to the article:
        $.ajax({
            method: 'GET',
            url: '/article/' + id
        })
        .then(function(data){
            $('#' + id + '.comments').append("<input class='p-2 w-50' id='userNameInput' placeholder='Name' name='user'></input>");
            $('#' + id + '.comments').append("<textarea class='p-2 w-100' id='bodyInput' placeholder='Comment' name='body'></textarea>");
            $('#' + id + '.comments').append("<button id=" + id + " class='btn btn-primary saveComm m-2'>Save Comment</button>");
            $('#' + id + '.comments').append("<button id=" + id + " class='btn btn-warning cancelComm m-2'>Cancel</button>");
        })
    });

    //Cancel the comment
    $(document).on('click', '.cancelComm', function(){
            $("#userNameInput").val("");
            $("#bodyInput").val("");
            $("#userNameInput").hide();
            $("#bodyInput").hide();
            $(".saveComm").hide();
            $('.cancelComm').hide();
    });
    
    //Save comment:
    $(document).on('click','.saveComm', function () {
        let commId = $(this).attr('id');
        $.ajax({
            method: 'POST',
            url: '/article/' + commId,
            data: {
                user: $("#userNameInput").val().trim(),
                body: $("#bodyInput").val()
            }
        }).then(function (data) {
            $("#userNameInput").hide();
            $("#bodyInput").hide();
            $(".saveComm").hide();
            location.reload();
        })
    })
    
    //Delete comment:
    $(document).on('click', '.deleteBtn', function(){
        let deleteId = $(this).attr('data-id');
        let selectedComm = $(this).parent();
        $.ajax({
            url: '/delete/' + deleteId,
            type: "GET",
            success: function(response){
                selectedComm.remove();
            }
        }).then(function(data){
            location.reload();
        })
    });

});