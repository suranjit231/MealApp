let searchFoodArry=[];
let favouriteListArry = new Set();
// .............functions for fetching initial food  data...
async function getData(mealname) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealname}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // console.log(data.meals[0]);

        return data;
    } catch (error) {
        console.error('There was a problem fetching the data:', error);
    }
}

//..................functions for showing initial data
async function showInitialData(){
    let data = await getData("chicken");
    let findImage ;
    let mealTitle ;
    let cardContainer = document.querySelector(".cardContainer");
    for(let i=0; i<3; i++){
        findImage = data.meals[i].strMealThumb;
        mealTitle = data.meals[i].strMeal;
        console.log(data.meals[i].idMeal);
        let card = document.createElement("div");
        card.classList.add("card");
        let footerDiv = document.createElement("div");
        footerDiv.classList.add("footerDiv");
        let foodTitle = document.createElement("p");
        let moreDetail = document.createElement("p");
        moreDetail.classList.add("moreDetail");
        moreDetail.innerHTML = `More <i class="fa-solid fa-arrow-right"></i>` ;
        let fevouriteSign = document.createElement("p");
        fevouriteSign.classList.add("fevouriteSign");
        fevouriteSign.innerHTML=`<i class="fa-regular fa-heart"></i>`;
        foodTitle.classList.add("foodTitle")
        foodTitle.textContent=mealTitle;
        let foodImg = document.createElement("img");
        foodImg.classList.add("primeFood-img");
        foodImg.setAttribute("src",findImage);
        card.appendChild(foodImg);
        footerDiv.appendChild(foodTitle);
        footerDiv.appendChild(moreDetail);
        footerDiv.appendChild(fevouriteSign);
        cardContainer.appendChild(card);
        cardContainer.appendChild(footerDiv);
    }

}

showInitialData();


//.....................functions for search data....

async function getFirstMealImage(mealName) {
    try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data.meals && data.meals.length > 0) {
            let meals = data.meals;
            return meals;
        } else {
            alert("No meal found for the given name:", mealName);
            console.error('No meals found for the given name:', mealName);
        }
    } catch (error) {
        console.error('There was a problem fetching the data:', error);
    }
}

// Example usage:
//...............functions for display search data

async function displaySearchData(searchTerm){
    
    let meals=await getFirstMealImage(searchTerm);
    meals.forEach(meal => {
     searchFoodArry.push(meal);
     });
   
    let mainSectionsFoodCardContainer = document.getElementById("mainSearchMealContainer");
    let searchHeader = document.getElementById("searchHeader");
    searchHeader.textContent="Finding Delicious Delights" ;
    let cardContainer = document.getElementById("cardContainer");
 
    searchFoodArry.forEach(meal => {
     let cardBox = document.createElement("div");
     cardBox.classList.add("perMealBox");
     cardBox.innerHTML=`<div class="imageWrapper" id=${meal.idMeal}>
                      <img src="${meal.strMealThumb}" alt="">
                        </div>
                         <div class="descriptionsBox">
                             <p class="searchTitle">${meal.strMeal}</p>
                             <p class="descriptionsLink" onClick="showDetails(${meal.idMeal})">More <i class="fa-solid fa-arrow-right"></i></p>
                            
                            
                             <p class="addFavouritsList" data-meal='${JSON.stringify(meal)}' onClick="addToFavourite(${meal.idMeal})"><i class="fa-solid fa-heart"></i></p>
 
                         </div>
                         `;
                 cardContainer.appendChild(cardBox);
          });
 
          mainSectionsFoodCardContainer.appendChild(searchHeader);
         
          mainSectionsFoodCardContainer.appendChild(cardContainer);
 
     
 
    setTimeout(()=>{
     document.getElementById("searchField").value = '';
    },5000);
 }
 


//.................functions for geting search item

let searchInput=document.getElementById("searchField");
searchInput.addEventListener('input', function() {
    const searchTerm = this.value.trim(); 
    if (searchTerm !== '') {
        let initialContainers = document.getElementsByClassName("main-sectionsFood-CardContainer");

        // Convert the collection to an array and iterate over each element to hide it
        Array.from(initialContainers).forEach(container => {
            container.style.display = "none";
        });
        
        displaySearchData(searchTerm);
    } else {
      searchResults.textContent = ''; // Clear search results if search term is empty
    }
  });

  ///////////////////////////////////...............................
  
  function removeFavouriteList(mealId) {
    for (let meal of favouriteListArry) {


        if(mealId==meal.idMeal){
            
            console.log("before deleteing size ",favouriteListArry.size);
            favouriteListArry.delete(meal);
            upDateFavouriteList();
            saveFavouritData();
            console.log("after deleteing size ", favouriteListArry.size);
            console.log("yes deleted");
        }else{
            console.log("not deleted");
        }
        
    }
    
}


//....................functions for update favourite list
function upDateFavouriteList(){
    let favouriteList = Array.from(favouriteListArry);
    let favouritesInnerContainer = document.querySelector(".favourites-InnerContainer");
    favouritesInnerContainer.innerHTML="";
    favouriteList.forEach((favouriteFood)=>{
        console.log(favouriteFood);
    let favouritBox = document.createElement("div");
    favouritBox.classList.add("favourit-box");
    favouritBox.innerHTML=`<div class="left-favourites">
                    <img src="${favouriteFood.strMealThumb}" alt="" class="favourite-images">
                    <p>${favouriteFood.strMeal}</p>
                    </div>
                    <i class="fa-solid fa-xmark" onClick="removeFavouriteList(${favouriteFood.idMeal})"></i>`

    favouritesInnerContainer.appendChild(favouritBox);

    })

    saveFavouritData();
}






  //..............functions for add to favourites list............................................

  function addToFavourite(id){
   let indexToAddfavourite= searchFoodArry.findIndex((meal)=>meal.idMeal==id);
   console.log(indexToAddfavourite);
    
    if (!favouriteListArry.has(searchFoodArry[indexToAddfavourite])) {
        favouriteListArry.add(searchFoodArry[indexToAddfavourite]);
        
        let favouriteList = Array.from(favouriteListArry);
        let favouritesInnerContainer = document.querySelector(".favourites-InnerContainer");
        saveFavouritData();
        favouritesInnerContainer.innerHTML="";
        favouriteList.forEach((favouriteFood)=>{
        let favouritBox = document.createElement("div");
        favouritBox.classList.add("favourit-box");
        favouritBox.innerHTML=`<div class="left-favourites">
                        <img src="${favouriteFood.strMealThumb}" alt="" class="favourite-images">
                        <p>${favouriteFood.strMeal}</p>
                        </div>
                        <i class="fa-solid fa-xmark" onClick="removeFavouriteList(${favouriteFood.idMeal})"></i>`

        favouritesInnerContainer.appendChild(favouritBox);

        })


    }else{
        console.log("not present in the array");
    }

   
  }


  //.................EventListener on favourite btn....
  let favouriteBtn = document.getElementById("favouriteBtn");
  favouriteBtn.addEventListener("click",function(){
     showFavouriteData();
    let favouriteContainer=document.getElementById("favouriteContainer");
    favouriteContainer.classList.toggle("visible");
    favouriteContainer.style.display="flex" ;
    
  });

  let closedBtn=document.getElementById("closedBtn");
  closedBtn.addEventListener("click", function(){
    let favouriteContainer=document.getElementById("favouriteContainer");
    favouriteContainer.classList.toggle("hidden");
    favouriteContainer.style.display="none" ;
    
  });


  //...............functions for show details food

  function showDetails(id){
   

   let meal= searchFoodArry.findIndex((meal)=>meal.idMeal==id);
   console.log(meal);
   console.log(searchFoodArry[meal]);
//......................main descriptions container
let detailsContainer = document.getElementById("detailsContainer");
detailsContainer.style.display = "flex";
    detailsContainer.innerHTML="";
    

    

//...............extract the data............................
   let mealInstructions = searchFoodArry[meal].strInstructions;
   let mealImageSrc = searchFoodArry[meal].strMealThumb;
   let mealTitle = searchFoodArry[meal].strMeal;
   let receipesVideoSrc=searchFoodArry[meal].strSource;

//..............content for image box........................
   let detailsImgBox = document.createElement("div");
   detailsImgBox.classList.add("detailsImgBox");
   detailsImgBox.innerHTML=`<div class="imgBox">
                            <img src=${mealImageSrc} alt="">
                            </div>
                        <div class="foodTitle">
                            <p>${mealTitle} </p>
                            <a href=${receipesVideoSrc}>Receipe</a>
                        </div>`
    detailsContainer.appendChild(detailsImgBox);

//.............ingredents.................................

let ingreDentBox = document.createElement("div");
    ingreDentBox.classList.add("ingreDentBox");
    let ingredentBoxTitle= document.createElement("h3");
        ingredentBoxTitle.classList.add("ingredentBoxTitle");
        ingredentBoxTitle.textContent=`IngreDent & Measurament`

    ingreDentBox.appendChild(ingredentBoxTitle);

    let ingreDentListContainer=document.createElement("ul");
        ingreDentListContainer.classList.add("ingreDentListContainer");


   let ingredients = [];
        
        // Collect all ingredients
        for (let i = 1; i <= 20; i++) {
            if (searchFoodArry[meal][`strIngredient${i}`]) {
                ingredients.push({
                    ingredient: searchFoodArry[meal][`strIngredient${i}`],
                    measure: searchFoodArry[meal][`strMeasure${i}`],
                });
            } else {
                break;
            }
        }

        ingredients.forEach((item)=>{
            let ingredentList = document.createElement("li");
            ingredentList.innerHTML=`<span>${item.ingredient} :</span><span>${item.measure}</span>`
            ingreDentListContainer.appendChild(ingredentList);
        })

        ingreDentBox.appendChild(ingreDentListContainer);
        detailsContainer.appendChild(ingreDentBox);

        console.log(ingredients);
//.................content added for receipie video........................
// let receipieViedoBox = document.createElement("div");
//     receipieViedoBox.classList.add("receipieViedoBox");
//     receipieViedoBox.innerHTML=`<video src=${receipesVideoSrc} controls></video>`
//     detailsContainer.appendChild(receipieViedoBox);

//.................content added for instructions..........................
let instructionsContainer = document.createElement("div");
    instructionsContainer.classList.add("instructionsContainer");
    instructionsContainer.innerHTML=`<h3>Instructions :</h3>
                                    <p>${mealInstructions}</p>`
    detailsContainer.appendChild(instructionsContainer);

    let mainSearchMealContainer = document.getElementById("mainSearchMealContainer");
    mainSearchMealContainer.style.display = "none";


  }

  //...................functions for home button
  let home = document.querySelector(".home");
  home.addEventListener("click",function(){
    
        backToHome();

  })

  function backToHome(){
    let mainSearchMealContainer = document.getElementById("mainSearchMealContainer");
    mainSearchMealContainer.style.display = "flex";

    let detailsContainer = document.getElementById("detailsContainer");

    if(detailsContainer.style.display =="flex"){
        detailsContainer.style.display = "none";
    }
  }
  

//.................functions for save the FavouriteList data in the local storage

function saveFavouritData() {
    localStorage.setItem("data", JSON.stringify(Array.from(favouriteListArry)));
}

function showFavouriteData() {
    let data = localStorage.getItem("data");
    if (data) {
        favouriteListArry = new Set(JSON.parse(data));
        upDateFavouriteList();
    }
}

//.................toggle side bar...
let nevIcon = document.getElementById("nevIcon");


nevIcon.addEventListener("click", function(){
    let fabars = nevIcon.querySelector(".fa-bars");
    let facirclexmark = nevIcon.querySelector(".fa-circle-xmark");

   



    let  sideBar= document.querySelector(".sideBar");
        sideBar.innerHTML=`<div class="fevouritsBtnDiv">
        <p class="home" onClick="backToHome()">Home</p>
    </div>
    <div>
        <button class="fevaourit-btn" id="favouriteBtn" onClick="toggleFavourite(${1})">Favourite</button>
    </div>`
    nevIcon.classList.toggle("showMenu");
    sideBar.classList.toggle("showSidebar");

    
    console.log(fabars);
    console.log(facirclexmark);
   

    if (fabars.style.display === "block") {
        fabars.style.display = "none"; // Hide the fa-bars icon
        facirclexmark.style.display = "block"; // Display the fa-xmark icon
    } else {
        fabars.style.display = "block"; // Display the fa-bars icon
        facirclexmark.style.display = "none"; // Hide the fa-xmark icon
    }

       
        
});


function toggleFavourite(val){
 console.log(val);


    let favouriteBtn = document.querySelector(".fevaourit-btn");
    console.log(favouriteBtn);

   showFavouriteData();
  let favouriteContainer=document.getElementById("favouriteContainer");
  favouriteContainer.classList.toggle("visible");
  favouriteContainer.style.display="flex" ;
  


let closedBtn=document.getElementById("closedBtn");
closedBtn.addEventListener("click", function(){
  let favouriteContainer=document.getElementById("favouriteContainer");
  favouriteContainer.classList.toggle("hidden");
  favouriteContainer.style.display="none" ;
  
});

}