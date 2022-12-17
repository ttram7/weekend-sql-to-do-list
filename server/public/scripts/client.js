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
            <tr class="indvTask" data-id=${item.id}>
                <td class="taskText">${item.task}</td>
                <td><button type="button" class="completeBtn">Complete</button></td>
                <td><button type="button" class="deleteBtn">Delete</button></td>
            </tr>
        `)
        if (item.complete === 'Y') {
            listItem.addClass('completed');
        }
        $('#viewTasks').append(listItem);
    }
    
};

// PUT request
function completeTask() {
    console.log('in completeTask');
    const id = $(this).parent().parent().data('id');
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
    const taskId = $(this).parent().parent().data('id');
    console.log('in delete task', taskId);
    swal({
        title: 'Are you sure you want to delete this task?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
    })
    .then((willDelete)=> {
        if (willDelete) {
            $.ajax({
                type: 'DELETE',
                url: `/tasks/${taskId}`
            }).then(function(response) {
                getTasks();
            }).catch(function(error) {
                console.log(error);
                alert('error occurred');
            });
        } else {
            return;
        };
    });
};