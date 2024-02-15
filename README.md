Meal Finder Web App
This is a simple web application to search for delicious meals and save your favorites. It utilizes the MealDB API to fetch meal data.

Features
Search for Meals: Search for meals by name.
View Details: View detailed information about each meal, including ingredients and instructions.
Favorite Meals: Save your favorite meals to view them later.
Responsive Design: The web app is designed to work well on both desktop and mobile devices.
Usage
Initial Data Display: Upon loading the page, initial data for three chicken meals is displayed.
Search for Meals: Use the search bar to find meals by name. As you type, matching meals will be displayed.
View Details: Click on a meal to view its details, including ingredients and instructions.
Add to Favorites: Click on the heart icon to add a meal to your favorites list.
View Favorites: Click on the "Favorites" button to view your saved favorite meals.
Remove from Favorites: In the favorites list, click on the "X" icon to remove a meal from your favorites.
Code Overview
Fetching Data: The getData function is used to fetch initial meal data and getFirstMealImage is used for searching meals by name.
Displaying Data: The showInitialData function displays initial meal data, while displaySearchData displays search results.
Favorite Handling: Meals can be added to favorites using the addToFavourite function and removed using removeFavouriteList.
LocalStorage: The favorite meals data is stored in the browser's localStorage.
How to Run
Clone this repository to your local machine.
Open index.html in your web browser.
Technologies Used
HTML
CSS
JavaScript
Contributors
Name - @Suranjit Namasudra
