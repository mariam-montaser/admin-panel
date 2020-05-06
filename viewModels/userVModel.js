let UserViewModel = {
    users: ko.observableArray([]),
    result: ko.observableArray([]),
    userDetails: ko.observableArray([])
    // userDetails: ko.observableArray([{ id: 1, name: 'mariam', email: 'mar@gmail.com' }])
}

const mainURI = 'http://localhost:4444/';

// get latest users
const loadPage = () => {
    $.getJSON(`${mainURI}api/users/`, result => {
        // console.log(result)
        UserViewModel.users(result.data)
    })
}

loadPage()


// get result
const getResult = () => {
    const query = $('#search').val();
    $.getJSON(`${mainURI}api/users/?name=${query}`, result => {
        UserViewModel.result(result.data);
        $('#result').removeClass('d-none');
        $('#users').addClass('d-none');
    })
}

// const getResult = () => {
//     const query = $('#search').val();
//     const url = `${mainURI}api/users/?name=${query}`;
//     $.ajax({
//         url: url,
//         type: 'GET',
//         success: (response, textStatus, xhr) => {
//             console.log('success\n', response)
//             UserViewModel.result(response.data)
//         },
//         error: (xhr, textStatus, error) => {
//             console.log('error\n', error)
//         }
//     })
// }

// get user details
const getDetails = (id) => {
    UserViewModel.userDetails([])
    const url = `${mainURI}api/users/${id}`;

    $.ajax({
        url: url,
        type: 'GET',
        success: (response, textStatus, xhr) => {
            console.log('success \n', response);
            UserViewModel.userDetails.push(response.data)
            $('#userDetails').removeClass('d-none');
        },
        error: (xhr, textStatus, error) => {
            console.log('error \n', error)
        }
    })
}



// delete user
const deleteUser = (id) => {
    $('#userId').val(id);
    console.log('delete')
}

$('#delUser').submit(event => {
    event.preventDefault();
    const id = $('#userId').val();
    const url = `${mainURI}api/users/${id}`;

    $.ajax({
        url: url,
        type: 'DELETE',
        success: (response, textStatus, xhr) => {
            console.log('success \n', response);
            $('#delModal').modal('toggle')
            loadPage()
        },
        error: (xhr, textStatus, error) => {
            console.log('error \n', error)
        }
    })
})

ko.applyBindings(UserViewModel);