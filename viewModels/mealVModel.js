let MealViewModel = {
    categories: ko.observableArray(['breakfast', 'lunch', 'dinner', 'dessert']),
    lunch: ko.observableArray([]),
    breakfast: ko.observableArray([]),
    dinner: ko.observableArray([]),
    dessert: ko.observableArray([])
}

const apiMainURI = 'http:\\\\localhost:4444\\';

// let categories = [];

// get and load page
function loadPage() {
    $.getJSON(`${apiMainURI}api/meals/all`, result => {
        result.data.forEach(meal => {
            meal.image = `${apiMainURI + meal.image}`;
            // if (!categories.includes(meal.category)) {
            //     categories.push(meal.category)
            // }
            // MealViewModel.categories(categories);
            if (meal.category === 'lunch') {
                // MealViewModel.lunch = ko.observableArray([]);
                MealViewModel.lunch.push(meal);
            } else if (meal.category === 'breakfast') {
                MealViewModel.breakfast.push(meal);
            } else if (meal.category === 'dinner') {
                MealViewModel.dinner.push(meal);
            } else {
                MealViewModel.dessert.push(meal);
            }
        })
    })
    // ------------------------------------------------------
    // $.getJSON(`${apiMainURI}api/meals/lunch`, result => {
    //     // console.log(result.data);
    //     result.data.forEach(meal => {
    //         meal.image = `${apiMainURI + meal.image}`;
    //     })
    //     MealViewModel.lunch(result.data);
    // })
    // $.getJSON(`${apiMainURI}api/meals/breakfast`, result => {
    //     result.data.forEach(meal => {
    //         meal.image = `${apiMainURI}${meal.image}`;
    //     })
    //     MealViewModel.breakfast(result.data);
    // })
    // $.getJSON(`${apiMainURI}api/meals/dinner`, result => {
    //     result.data.forEach(meal => {
    //         meal.image = `${apiMainURI}${meal.image}`;
    //     })
    //     MealViewModel.dinner(result.data);
    // })
    // $.getJSON(`${apiMainURI}api/meals/dessert`, result => {
    //     result.data.forEach(meal => {
    //         meal.image = `${apiMainURI}${meal.image}`;
    //     })
    //     MealViewModel.dessert(result.data);
    // })
}

loadPage();

// add and update meal
// add new meal
const addMeal = () => {
    $('#type').val('add');
    $('#id').val('');
    $('#title').val('');
    $('#price').val('');
    $('#category').val('');
    $('#description').val('');
    $('#image').val('');
    console.log('add meal');
}

// update meal
const editMeal = (id, mealName, price, category, description) => {
    // $('html, body').animate({
    //     scrollTop: $('#addMeal').offset().top
    // }, 500);
    $('#type').val('edit');
    $('#id').val(id);
    $('#title').val(mealName);
    $('#price').val(price);
    $('#category').val(category);
    $('#description').val(description);
    console.log('edit meal');
}

$('#mealForm').submit(event => {
    event.preventDefault();
    const mealData = new FormData();
    if ($('#image').prop('files').length > 0) {
        const image = $('#image').prop('files')[0];
        mealData.append('image', image);
    }
    const type = $('#type').val();
    const id = $('#id').val();
    const mealName = $('#title').val();
    const category = $('#category').val();
    const price = $('#price').val();
    const description = $('#description').val();
    mealData.append('mealName', mealName);
    mealData.append('category', category);
    mealData.append('price', price);
    mealData.append('description', description);
    // api url 
    const url = (type === 'add') ? `${apiMainURI}api/meals` : `${apiMainURI}api/meals/${id}`;
    console.log(url)
    // 
    $.ajax({
        url: url,
        type: type === 'add' ? 'POST' : 'PUT',
        data: mealData,
        processData: false,
        contentType: false,
        success: (response, textStatus, xhr) => {
            console.log('success: \n' + response);
        },
        error: (xhr, textStatus, error) => {
            console.log('error')
            console.log(error);
        }
    })

})


// delete meal
const deleteMeal = (id) => {
    $('#delId').val(id);
}

$('#delMeal').submit(event => {
    event.preventDefault();
    const id = $('#delId').val();
    console.log(id);
    const url = `${apiMainURI}api/meals/${id}`;
    $.ajax({
        url: url,
        type: 'DELETE',

        success: (response, textStatus, xhr) => {
            console.log('success', response);
        },
        error: (xhr, textStatus, error) => {
            console.log('error ', error);
        }
    })
})
// $('.delMeal').submit(event => {
//     event.preventDefault();
//     const id = $('.delId').val();
//     console.log(id);
//     const url = `${apiMainURI + id}`;
//     // $.ajax({
//     //     url: url,
//     //     type: 'DELETE',
//     //     success: (response, textStatus, xhr) => {
//     //         console.log('success', response);
//     //     },
//     //     error: (xhr, textStatus, error) => {
//     //         console.log('error ', error);
//     //     }
//     // })
// })



ko.applyBindings(MealViewModel);