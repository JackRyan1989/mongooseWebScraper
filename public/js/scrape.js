$(document).ready(function () {

    $(".commBtn").on('click', function () {
        let id = $(this).attr('id');
        
        //Get the specific article so you can populate the note to the article:
        $.ajax({
            method: 'GET',
            url: '/article/' + id
        })
        .then(function(data){
            $('#' + id + '.comments').append("<input class='p-2 w-50' id='userNameInput' name='user'></input>");
            $('#' + id + '.comments').append("<textarea class='p-2 w-100' id='bodyInput' name='body'></textarea>");
            $('#' + id + '.comments').append("<button id=" + id + " class='btn btn-primary saveComm'>Save Comment</button>");
        })
    });

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
        })
    })

});