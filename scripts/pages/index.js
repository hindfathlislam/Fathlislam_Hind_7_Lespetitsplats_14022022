let recipes = [];
let allRecipes = [];

function getRecipes() {
    fetch("./data/recipes.json")
        .then((res) => res.json())
        .then((data) => {
            recipes = data.recipes;
            allRecipes = data.recipes;

            // affiche les recettes
            displayRecipes(recipes);

            // affiche les tags d'ingrédients
            addIngredients(recipes);

            // affiche les tags d'appareils
            addAppliances(recipes);

            // affiche les tags d'ustensiles
            addUstensils(recipes);

            // gestion de la recherche par tags
            searchByTags(recipes, "");

            // gestion de la barre de recherche
            research(recipes);
        });

}

function displayRecipes(recipes) {
    const recipeSection = document.querySelector(".recipes");

    recipes.forEach((recipe) => {
        const recipeModel = recipesFactory(recipe);
        const recipeCardDOM = recipeModel.getRecipesCardDOM();
        recipeSection.appendChild(recipeCardDOM);

    });
}

getRecipes()