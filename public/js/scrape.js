$(document).ready(function(){

    $(".commBtn").on('click', function(){
        let id = $(this).attr('id');
        
        $('.comments').append("<textarea class='p-2 w-100' id='bodyInput' name='body'></textarea>");
        


    })





});