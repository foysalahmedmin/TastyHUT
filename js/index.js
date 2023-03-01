// load meal data ;
const getMeals = (searchName, dataLimit) =>{
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchName}`)
    .then(res => res.json())
    .then(data => showMeals(data.meals, dataLimit));
}

// Meal data showing ;
const showMeals = (meals, dataLimit) => {
    // clean meal field ;
    document.getElementById("meal-container").innerHTML = "";

    // validation;
    if(meals == null){
        document.getElementById("container-dic").innerHTML= "<div class= 'text-center my-5 py-5 text-danger h1'> Nothing Founded.</div>";
        document.getElementById("seeAllBtn").classList.add("d-none")
        spinner(false);
        return false;
    }else if(dataLimit && meals.length > 6){
        meals = meals.slice(0, 6);
        document.getElementById("seeAllBtn").classList.remove("d-none");
        document.getElementById("container-dic").innerHTML= '';
    }else{
        document.getElementById("seeAllBtn").classList.add("d-none");
        document.getElementById("container-dic").innerHTML= '';
    }

    // showing every single data by forEach and append Child;
    meals.forEach(meal => {
        const mealContainer = document.getElementById("meal-container");
        const div = document.createElement("div");
        div.classList.add("meal", "d-sm-flex", "align-items-center", "g-3")
        div.innerHTML = `
        
        <div class="img">
            <img class= "img-fluid" src= "${meal.strMealThumb}" alt="">
        </div>
        <div class="ms-4 mt-4 mt-sm-0">
            <h3 class="mb-3">
                ${meal.strMeal}
            </h3>
            <p class="mb-3">
                There are many variations of passages of available, but the majority have suffered
            </p>
            <p onclick= "loadDetails(${meal.idMeal})" data-bs-toggle="modal" data-bs-target="#mealDetails" class="text-warning">View Details</p>
        </div>
        
        `;
        mealContainer.appendChild(div);
    });
    spinner(false);
}

// Show meal details in modal ;
const loadDetails = mealId => {
    
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then (res => res.json())
    .then (data => showDetails(data.meals[0]));

    const showDetails = details => {
        document.getElementById("mealDetailsLabel").innerText = details.strMeal ;
        const modalBody = document.getElementById("detailsBody");
        modalBody.innerHTML = `
        <img class="img-fluid mb-3" src= "${details.strMealThumb}" alt="">
        <p class="mb-2"><strong>Category:</strong> ${details.strCategory}</p>
        <p class="mb-2"><strong>Area:</strong> ${details.strArea}</p>
        <p class="mb-1 detailsText" id="detailsText" style="height: 125px; overflow: hidden;"><strong>Instruction:</strong> ${details.strInstructions}</p>
        <p onclick="readMore(this)" class= "mb-2">Read More</p>
        <p class="mb-2"><strong>YouTube:</strong><a href="${details.strYoutube}">  ${details.strYoutube}</a></p>
        `;
        
    }

}

// read more button process ;
const readMore = (T) =>{
    const text = document.getElementById("detailsText");
    
    if(T.innerText == "Read Less"){
        text.style.height = "124px" ;
        T.innerText = "Read More";
    }else{
        text.style.height = "auto" ;
        T.innerText = "Read Less";
    }
    
}

// search process with data limit;
const process = dataLimit => {
    const searchValue = document.getElementById("search").value;
    getMeals(searchValue, dataLimit);
    spinner(true);
}

const search = () =>{
    process(6) ;

}

// all data showing process;
const seeAll = () =>{
    process();
}

// loading spinner add;
const spinner = loading => {
    const spinner = document.getElementById("spinner")
    if(loading){
        spinner.classList.remove("d-none");
    }else{
        spinner.classList.add("d-none");
    }
}


getMeals("", 6);