document.addEventListener('DOMContentLoaded', () => {
   
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const clearBtn = document.getElementById('clearBtn');
    const mealContainer = document.getElementById('mealContainer');
   

    const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    
    searchBtn.addEventListener('click', searchRecipes);
    clearBtn.addEventListener('click', clearResults);

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            searchRecipes();
        }
    });
    

    
    function searchRecipes() {
        const searchTerm = searchInput.value.trim();

        if (!searchTerm) {
            alert('Please enter a food name to search.');
            return;
        }

        mealContainer.innerHTML = '<p class="text-center">Fetching recipes...</p>';

        fetch(`${API_URL}${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                displayRecipes(data.meals);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                mealContainer.innerHTML = '<p class="text-center text-danger">Failed to fetch recipes. Please try again later.</p>';
            });
    }

    function displayRecipes(meals) {
        mealContainer.innerHTML = '';

        if (!meals) {
            mealContainer.innerHTML = '<p class="text-center">No recipes found. Try another search!</p>';
            return;
        }

        meals.forEach(meal => {
            const col = document.createElement('div');
            col.className = 'col-md-3 mb-3';

            col.innerHTML = `
                <div class="card h-50">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body text-center d-flex flex-column">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="text-muted">${meal.strCategory || ''}</p>
                        <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank" class="btn btn-primary mt-auto">

                            View Recipe
                        </a>
                    </div>
                </div>
            `;

            mealContainer.appendChild(col);
        });
    }

   
    function clearResults() {
        searchInput.value = '';
        mealContainer.innerHTML = '';
    }
});
