/// <reference types="../@types/jquery" />


//                     loading screen

// document.addEventListener('load', function(){
//     document.getElementById('loadingScreen').classList.add('d-none');
//     document.querySelector('body').style.overflow = 'visible';
    
// })


// $(function(){
//     $('#loadingScreen').fadeOut(1500 , function(){
        
//         $('body').css('overflow' , 'visible')
//     })
// })



//                     NavBar section

let navBtn = document.getElementById('navBtn');
let closeBtn = document.getElementById('closeBtn');
let tableNavbar = document.getElementById('tableNavbar');

navBtn.addEventListener('click' , function(){
    // tableNavbar.style.left = '0px';
    tableNavbar.classList.remove('d-none');
    closeBtn.classList.remove('d-none');
    navBtn.classList.add('d-none')
    // console.log('hiiii');
})
closeBtn.addEventListener('click' , function(){
    // tableNavbar.style.left = '-256.562px;';
    tableNavbar.classList.add('d-none');
    navBtn.classList.remove('d-none');
    closeBtn.classList.add('d-none');
})


//                     Home section

let data = [];
let dataOfRow = document.getElementById('dataOfRow');



function displayData(){
    let cols = ``;
    for (let i = 0; i < data.length; i++) {
        cols +=`
        <div class="col-md-3">
                    <div class="meal position-relative overflow-hidden rounded-2 ">
                        <img src="${data[i].strMealThumb}" alt="">
                        <div class="layer-meal p-3">
                            <h3>${data[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        `
        
    }
    dataOfRow.innerHTML = cols;
}


async function getMeals(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let finalResponse = await response.json();
     data = finalResponse.meals;
    // console.log(data);
        displayData();
        dataOfRow.addEventListener('click', function(e){
            console.log(e.target);
            displayDetailsMeal();
        })
}

getMeals();

//                     Search section


let searchLink = document.getElementById('searchLink');
let searchBox = document.getElementById('searchBox');
let search1chInput = document.getElementById('search1chInput');
let searchMealInput = document.getElementById('searchMealInput');


searchLink.addEventListener('click' , function(){
    tableNavbar.classList.add('d-none');
    navBtn.classList.remove('d-none');
    closeBtn.classList.add('d-none');
    searchBox.classList.remove('d-none');
    // getMealsForSearch();
})
search1chInput.addEventListener('input' , function(){
    // console.log('ggggggg');
    validationSearchChar();
    getMealsForSearch();
})
searchMealInput.addEventListener('input' , function(){
    validationSearchMeal();
    getMealsByName();
})
async function getMealsForSearch(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search1chInput.value}`);
    let finalResponse = await response.json();
     data = finalResponse.meals;
    // console.log(data);

    if(validationSearchChar){
        displayData();
    }
}
async function getMealsByName(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMealInput.value}`);
    let finalResponse = await response.json();
     data = finalResponse.meals;
    // console.log(data);

    if(validationSearchMeal){
        displayData();
    }
}

// validation function
function validationSearchChar(){
    regex = /^[a-z]$/i;
    if(regex == search1chInput.value){
    }
}
function validationSearchMeal(){
    regex = /^[a-z]/i;
    if(regex == searchMealInput.value){
    }
}



//                     Categories section

let categoriesLink = document.getElementById('categoriesLink');

categoriesLink.addEventListener('click' , function(){
    tableNavbar.classList.add('d-none');
    navBtn.classList.remove('d-none');
    closeBtn.classList.add('d-none');;
    getCategoriesMeals()
})

function displayCategoriesData(){
    let cols = ``;
    for (let i = 0; i < data.length; i++) {
        cols +=`
        <div class="col-md-3">
                    <div class="my-meal position-relative overflow-hidden rounded-2 cursor-pointer">
                        <img src="${data[i].strCategoryThumb}" alt="">
                        <div class="layer-meal position-absolute text-center text-black p-2">
                            <h3>${data[i].strCategory}</h3>
                            <p>${data[i].strCategoryDescription.split(' ').slice(0,20).join(' ')}</p>
                        </div>
                    </div>
                </div>
        `
        
    }
    document.getElementById('dataOfRow').innerHTML = cols;
}

async function getCategoriesMeals(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let finalResponse = await response.json();
     data = finalResponse.categories;
    // console.log(finalResponse);
    displayCategoriesData();
}


//                     Area section
let areaLink = document.getElementById('areaLink');
let listArea = ['American' , 'British' , 'Canadian' , 'Chinese' , 'Croatian' , 'Dutch' , 'Egyptian' , 'Filipino' , 'French',
'Greek' , 'Indian' , 'Irish' , 'Italian' , 'Jamaican' , 'Japanese' , 'Kenyan' , 'Malaysian' , 'Mexican',
'Moroccan' , 'Polish' , 'Portuguese' , 'Russian' , 'Spanish' , 'Thai' , 'Tunisian' , 'Turkish' , 'Vietnamese','Unknown'];


areaLink.addEventListener('click' , function(){
    tableNavbar.classList.add('d-none');
    navBtn.classList.remove('d-none');
    closeBtn.classList.add('d-none');;
    
    for(let i=0; i<listArea.length; i++){
        // console.log(listArea[i]);
        getAreaMeals(listArea[i]);
    }
})

function displayAreaData(){
    let cols = ``;
    for (let i = 0; i < data.length; i++) {
        cols +=`
        <div class="col-md-3">
                    <div class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3 class="cursor-pointer">${listArea[i]}</h3>
                    </div>
                </div>
        `
        
    }
    document.getElementById('dataOfRow').innerHTML = cols;
}

async function getAreaMeals(area){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    let finalResponse = await response.json();
     data = finalResponse.meals;
    console.log(finalResponse);
    displayAreaData();
}

//                     Ingredients section 

let ingredientsLink = document.getElementById('ingredientsLink');


ingredientsLink.addEventListener('click' , function(){
    tableNavbar.classList.add('d-none');
    navBtn.classList.remove('d-none');
    closeBtn.classList.add('d-none');
    getIngredientsMeals();
})

function displayIngredientsData(){
    let cols = ``;
    for (let i = 0; i < data.length; i++) {
        cols +=`
        <div class="col-md-3">
                    <div class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${data[i].strIngredient}</h3>
                        <p>${data[i].strDescription.split(' ').slice(0,20).join(' ')}</p>
                    </div>
                </div>
        `
        
    }
    document.getElementById('dataOfRow').innerHTML = cols;
}

async function getIngredientsMeals(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let finalResponse = await response.json();
     data = finalResponse.meals;
    // console.log(finalResponse);
    displayIngredientsData();
}



//                     Contact section 

let contactLink = document.getElementById('contactLink');
let contactUs = document.getElementById('contactUs');

contactLink.addEventListener('click' , function(){
    tableNavbar.classList.add('d-none');
    navBtn.classList.remove('d-none');
    closeBtn.classList.add('d-none');
    contactUs.classList.remove('d-none');
    document.getElementById('myContainer').classList.add('d-none')
    getContactData();
})


let nameInput = document.getElementById('nameInput');
let emailInput = document.getElementById('emailInput');
let phoneInput = document.getElementById('phoneInput');
let ageInput = document.getElementById('ageInput');
let passwordInput = document.getElementById('passwordInput');
let repasswordInput = document.getElementById('repasswordInput');


nameInput.addEventListener('input' , function(){
    validationName();
} )
emailInput.addEventListener('input' , function(){
    validationEmail();
} )
phoneInput.addEventListener('input' , function(){
    validationPhone();
} )
ageInput.addEventListener('input' , function(){
    validationAge();
} )
passwordInput.addEventListener('input' , function(){
    validationPassword();
} )
repasswordInput.addEventListener('input' , function(){
    validationRepassword();
} )


function validationName(){
    let text = nameInput.value;
    let regexName = /^[a-z]{3,15}$/;
    if (regexName.test(text)){
        document.getElementById('nameAlert').classList.add('d-none');

    }else{
        document.getElementById('nameAlert').classList.remove('d-none');
    }}


function validationEmail(){
    let text = emailInput.value;
    let regexEmail = /^[a-z]{3,7}[0-9]{2,4}@[a-z]{3,7}\.com$/i;
    if (regexEmail.test(text)){
        document.getElementById('emailAlert').classList.add('d-none');

    }else{
        document.getElementById('emailAlert').classList.remove('d-none');
    }

}
function validationPhone(){
    let text = phoneInput.value;
    let regexPhone = /^01(0|1|2|5)[0-9]{8}$/;
    if (regexPhone.test(text)){
        document.getElementById('phoneAlert').classList.add('d-none');

    }else{
        document.getElementById('phoneAlert').classList.remove('d-none');
    }

}
function validationAge(){
    let text = ageInput.value;
    let regexAge = /^[1-9][0-9]$/;
    if (regexAge.test(text)){
        document.getElementById('ageAlert').classList.add('d-none');

    }else{
        document.getElementById('ageAlert').classList.remove('d-none');
    }

}
function validationPassword(){
    let text = passwordInput.value;
    let regexPassword = /^([a-z]{3,}[0-9]{2,}|[0-9]{2,}[a-z]{3,})$/;
    if (regexPassword.test(text)){
        document.getElementById('passwordAlert').classList.add('d-none');

    }else{
        document.getElementById('passwordAlert').classList.remove('d-none');
    }

}
function validationRepassword(){
    let text = repasswordInput.value;
    // let regexRepassword = /^([a-z]{3,}[0-9]{2,}|[0-9]{2,}[a-z]{3,})$/;
    if (text == passwordInput.value){
        document.getElementById('repasswordAlert').classList.add('d-none');

    }else{
        document.getElementById('repasswordAlert').classList.remove('d-none');
    }

}

function getContactData(){
    if(validationName() && validationEmail() && validationPhone() 
    && validationAge() && validationPassword()&& validationRepassword()){
        document.getElementById('contactBtn').classList.remove('disabled');
    }
}

//   detalies data 



function displayDetailsMeal(){
    let cols = ``;
    for (let i = 0; i < data.length; i++) {
        cols +=`
        <div class="col-md-4">
                    <img src="${data[i].strMealThumb}" alt="" class="w-100 rounded-3">
                    <h2>${data[i].strMeal}</h2>
                </div>
                <div class="col-md-8">
                    <h2>Instructions</h2>
                    <p>${data[i].strInstructions}</p>
                    <h3><span class="fw-bolder">Area :${data[i].strArea} </span> </h3>
                    <h3><span class="fw-bolder">Category : </span> ${data[i].strCategory}</h3>
                    <h3>Recipes :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        <li class="alert alert-info m-2 p-1">${data[i].strMeasure1}${data[i].strIngredient1}</li>
                        <li class="alert alert-info m-2 p-1">${data[i].strMeasure2}${data[i].strIngredient2}</li>
                        <li class="alert alert-info m-2 p-1">${data[i].strMeasure3}${data[i].strIngredient3}</li>
                        <li class="alert alert-info m-2 p-1">${data[i].strMeasure4}${data[i].strIngredient4}</li>
                        <li class="alert alert-info m-2 p-1">${data[i].strMeasure5}${data[i].strIngredient5}</li>
                        <li class="alert alert-info m-2 p-1">${data[i].strMeasure6}${data[i].strIngredient6}</li>
                        <li class="alert alert-info m-2 p-1">${data[i].strMeasure7}${data[i].strIngredient7}</li>
                    </ul>
                    <h3 class="Tags :">${data[i].strTags}</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap"></ul>
                    <a href="${data[i].strSource}" class="btn btn-success" target="_blank">Source</a>
                    <a href="${data[i].strYoutube}" class="btn btn-danger" target="_blank">Youtube</a>
                </div>
        `
        
    }
    dataOfRow.innerHTML = cols;
}