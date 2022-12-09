$(readyNow);

function readyNow() {
    $('#addTaskBtn').on('click', sendTask);
}

function sendTask() {
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: {
            task:$('#taskIn').val(),
        }
    }).then(function(response){
        console.log('in POST', response);
        //getTasks();
    }).catch(function(error){
        console.log(error);
        alert(error.response);
    });
}