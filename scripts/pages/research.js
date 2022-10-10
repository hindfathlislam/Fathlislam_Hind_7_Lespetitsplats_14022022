/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
function research(recipes) {
    const input = document.querySelector(".input");
    const searchResult = document.querySelector(".recipes");

    // const item = faire une liste là comme le json structure 
    // const input = 'un item au pif pour verifier que en combien de temps ca le trouve"

    // Filtrer les recettes
    input.addEventListener("input", (e) => {
        const searchedString = e.target.value.toLowerCase();

        // à partir de 3 caractères
        if (searchedString.length > 2) {
            searchResult.innerHTML = "";
// for loop to see if the content of the input match description/ingredient  or name, if it does display tje recepe card dom with the value matching [i]
            for (let i in recipes) {
                const recipeTitle = recipes[i].name.toLowerCase().includes(searchedString);
                const recipeDescription = recipes[i].description.toLowerCase().includes(searchedString);

                if (recipeTitle || recipeDescription) {
                    const recipeModel = recipesFactory(recipes[i]);
                    const recipeCardDOM = recipeModel.getRecipesCardDOM();
                    searchResult.appendChild(recipeCardDOM);
                }
            }
        } 

        // Remet toutes les recette si la barre de recherche est vide
        if (searchedString.length === 0) {
            searchResult.innerHTML = "";
            for (let i in recipes) {
                const recipeModel = recipesFactory(recipes[i]);
                const recipeCardDOM = recipeModel.getRecipesCardDOM();
                searchResult.appendChild(recipeCardDOM);
            }
        }

    });
}