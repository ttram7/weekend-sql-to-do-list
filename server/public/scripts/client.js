$(readyNow);

function readyNow() {
    console.log('in JQ');
    $('.addTaskBtn').on('click', sendTask);
    $('#viewTasks').on('click', '.completeBtn', completeTask);
    $('#viewTasks').on('click', '.deleteBtn', deleteTask);
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
        let listItem = $(`
            <div class="indvTask" data-id=${item.id}>
                <p class="taskText">${item.task}</p>
                <button type="button" class="completeBtn">Complete</button>
                <button type="button" class="deleteBtn">Delete</button>
            </div>
            <br>
        `)
        if (item.complete === 'Y') {
            listItem.css('background-color', 'green');
            //$('.taskText').css('text-decoration', 'line-through');
        }
        $('#viewTasks').append(listItem);
    }
    
};

// PUT request
function completeTask() {
    console.log('in completeTask');
    //$(this).parent().css('background-color', 'green');
    const id = $(this).parent().data('id');
    $.ajax({
        type: 'PUT',
        url: `/tasks/complete/${id}`,
        data: {complete: 'Y'}
    }).then(function() {
        getTasks();
    }).catch(function(error){
        console.log('error with putting', error);
    })

}

function deleteTask() {
    const taskId = $(this).parent().data('id');
    console.log('in delete task', taskId);
    $.ajax({
        type: 'DELETE',
        url: `/tasks/${taskId}`
    }).then(function(response) {
        getTasks();
    }).catch(function(error) {
        console.log(error);
        alert('error occurred');
    });
}