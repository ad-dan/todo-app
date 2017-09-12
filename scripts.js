$('document').ready(function(){
    setInterval(updatePage, 5000);
    $('#submit').on('click',()=>{
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
    });
    $('li').on('click',function(){
        const task = $(this).text().trim().replace(/ /g,'-');
        console.log(task);
        $.ajax({
            url: `/delete/${task}`,
            method: 'delete',
            success: updatePage
        })
    });
});

function updatePage(){
    $.getJSON('/api',(data)=>{
        $('#tasks').html(' ');
        data.forEach(todo=>{
            $('#tasks').append(`<li>${todo.task}</li>`);
            $('li').on('click',function(){
                const task = $(this).text().trim().replace(/ /g,'-');
                console.log(task);
                $.ajax({
                    url: `/delete/${task}`,
                    method: 'delete',
                    success: function(){
                        console.log('deleted data');
                    }
                })
            });
        });
    });
}
