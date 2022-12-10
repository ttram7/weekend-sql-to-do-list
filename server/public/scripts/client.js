$(readyNow);

function readyNow() {
    console.log('in JQ');
    $('#addTaskBtn').on('click', sendTask);
    $('#viewTasks').on('click', '#completeBtn', completeTask);
    getTasks();
}

function sendTask() {
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: {
            task:$('#taskIn').val()
        }
    }).then(function(response){
        console.log('in POST', response);
        $('#taskIn').val('');
        getTasks();
    }).catch(function(error){
        console.log(error);
        alert(error.response);
    });
}

function getTasks() {
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function(response){
        // received database response
        console.log('in GET', response);
        appendToDom(response);
    })
}

function appendToDom(array){
    $('#viewTasks').empty();
    for (item of array) {
        $('#viewTasks').append(`
        <div id="indvTask">
        <p>${item.task}</p>
        <button type="button" id="completeBtn">Complete</button>
        <button type="button" id="deleteBtn">Delete</button>
        </div>
        <br>`)
    };
};

function completeTask() {
    console.log('in completeTask');
    $(this).parent().css('background-color', 'green');
}