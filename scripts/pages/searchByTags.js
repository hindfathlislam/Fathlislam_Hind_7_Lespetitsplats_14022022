let ingredientTag = document.querySelectorAll(".taglist-ingredients");
let applianceTag = document.querySelectorAll(".taglist-appliance");
let ustensilTag = document.querySelectorAll(".taglist-ustensils");

/* Event listener sur l'input recherche */
document.querySelector(".input").addEventListener("input", (e) => {
    const searchTerms = e.target.value.toLowerCase();
    searchByTags(recipes, searchTerms);
});

/* Fonction de tri de mes recettes */
function searchByTags(recipes, searchTerms) {

    /* Div des recettes pour affichage */
    const searchResults = document.querySelector(".recipes");

    /* Initialisation de mon tableau des recettes filtrees */
    let arrayFilter = [];
    let ingredientFilter = [];
    let ustensilFilter = [];

    //console.log("Recettes initiales", recipes);

    console.log(searchTerms.length, searchTerms);
    //console.log(allRecipes, "tableau recipes", recipes);
    // filtre recettes à partir de 3 caractères
    if (searchTerms) {
        if (searchTerms.length > 2) {
            /* Tri des recettes par le moteur de recherche */
            allRecipes.forEach((recipe) => {
                if (recipe.name.toLowerCase().includes(searchTerms)) {
                    arrayFilter.push(recipe);
                }
            });
        } else {
            /* Attribution de l'ensemble des recettes à arrayFilter */

            allRecipes.forEach((recipe) => {
                arrayFilter.push(recipe);
            });
            //console.log("récupération de toutes les recettes", recipes);
        }


        /* Verification si tags sélectionner */
        if (Array.from(document.querySelectorAll(".tag-selected li")).length !== 0) {
            /* Recuperation de l'ensemble des tags */

            Array.from(document.querySelectorAll(".tag-selected li")).forEach(function(el) {

                /* Ingredient */
                const taglistIngredient = document.querySelectorAll(".taglist-ingredients");
                if (el.classList.contains("ingredient-selected")) {
                    arrayFilter.map(function(recipe) {
                        recipe.ingredients.filter(ing => {

                            if (ing.ingredient.toLowerCase() === el.textContent.toLowerCase()) {
                                ingredientFilter.push(recipe);
                            }

                        });
                    });

                    // retirer les recettes qui n'ont pas le tag
                    ingredientFilter = ingredientFilter.filter(function(el) {
                        return el.length !== 0;
                    });
                    arrayFilter = ingredientFilter;
                }




                if (el.classList.contains("appliance-selected")) {
                    if (arrayFilter.appliance !== el.textContent.toLowerCase()) {
                        arrayFilter.splice(arrayFilter.indexOf(el.textContent), 1);
                    }
                }

                if (el.classList.contains("ustensils-selected")) {
                    arrayFilter.map(function(recipe) {
                        recipe.ustensils.filter(ust => {

                            if (ust.toLowerCase() === el.textContent.toLowerCase()) {
                                ustensilFilter.push(recipe);

                            }
                        });
                    });

                    // retirer les recettes qui n'ont pas le tag
                    ustensilFilter = ustensilFilter.filter(function(el) {
                        return el.length !== 0;
                    });
                    arrayFilter = ustensilFilter;
                }
            });
        }

        //console.log("Ingredient filter", arrayFilter);

        /* si pas de recettes disponibles affichage d'un message d'erreur */

        if (arrayFilter.length === 0) {
            searchResults.innerHTML = "Aucune recette trouvée.";
        } else {
            // Affichage des recettes
            searchResults.innerHTML = "";
            arrayFilter.forEach((recipe) => {
                const recipeModel = recipesFactory(recipe);
                const recipeCardDOM = recipeModel.getRecipesCardDOM();
                searchResults.appendChild(recipeCardDOM);
            });
        }
    }

}