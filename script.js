const getMealButton = document.getElementById('getMeal');
const mealDiv = document.getElementById('meal');

getMealButton.addEventListener('click', () =>{
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(res => createMeal(res.meals[0]))
})

function createMeal(meal){
    const ingredients=[];

    //Adding ingredients needed for the meal (up to 20)
    for(let i=1;i<=20;i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        } else {
            //in case there's no more ingredients, end loop
            break;
        }
    }
    
const mealDivHTML = `
    <div class="container">
        <div class="row">
            <div class="col-12 col-md-5 col-lg-5">
                <div class="imgThumbDiv">
                    <img src="${meal.strMealThumb}" id="recipePhoto" alt="Recipe Photo">
                </div>
                ${meal.strCategory ? `<p><strong>Category: </strong> ${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p><strong>Area: </strong>${meal.strArea}</p>` : ''}
                ${meal.strTags ? `<p><strong>Tags: </strong>${meal.strTags.split(',').join(', ')}</p>` : ''}                
                <h3>Ingredients:</h3>
                <ul>
                    ${ingredients.map(ingredient=>`<li>${ingredient}</li>`).join('')}
                </ul>
            </div>

            <div class="col-12 col-md-7 col-lg-7">
                <h2>${meal.strMeal}</h2>
                <p id="mealInstructions">${meal.strInstructions}</p>
            </div>
        </div>

        ${meal.strYoutube ? `
            <div class="row">
                <div class="col-12">
                    <h3>Video Recipe</h3>
                    <div class="videoDiv">
                        <iframe width="420" height="315"
                        src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}"> 
                    </div>
                </div>
            </div>
        ` : ''}

    </div>
`;

mealDiv.innerHTML = mealDivHTML;

}



