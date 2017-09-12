$('document').ready(function(){
    setInterval(updatePage, 5000);
    $('#submit').on('click',()=>{
        const task = $('#todo').val();
        $.ajax({
            url: '/submit',
            data: {'task': task},
            method: 'POST',
            success: function(){
                console.log('Sent');
                $('#todo').val('');
            }
        });
        console.log(task);
    });
});

function updatePage(){
    $.getJSON('/api',(data)=>{
        $('#tasks').html(' ');
        data.forEach(todo=>{
            $('#tasks').append(`<li>${todo.task}</li>`);
        });
    });
}
