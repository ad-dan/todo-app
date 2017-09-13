$('document').ready(function(){
    setInterval(updatePage, 5000);
    $('#submit').on('click',sendData);
    $('li').on('click',bindEvents);
});

function updatePage(){
    $.getJSON('/api',(data)=>{
        $('#tasks').html(' ');
        data.forEach(todo=>{
            $('#tasks').append(`<li>${todo.task}</li>`);
            $('li').on('click',bindEvents);
        });
    });
}

function bindEvents(){
    const task = $(this).text().trim().replace(/ /g,'-');
    $(this).remove();
    console.log(task);
    $.ajax({
        url: `/delete/${task}`,
        method: 'delete',
        success: function(){
            console.log('deleted data');
        }
    });
}

function sendData(){
    const task = $('#todo').val().trim();
    $.ajax({
        url: '/submit',
        data: {'task':task},
        method: 'POST',
        success: function(){
            console.log('Sent');
            $('#todo').val('');
        }
    });
    console.log(task);
}
