/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

let ingredientTag = document.querySelectorAll(".taglist-ingredients");
let applianceTag = document.querySelectorAll(".taglist-appliance");
let ustensilTag = document.querySelectorAll(".taglist-ustensils");

/* EVENT LISTENER SUR L'INPUT DE RECHERCHE - Déclenche la recherche à l'écriture */
document.querySelector(".input").addEventListener("input", (e) => {
    const searchTerms = e.target.value.toLowerCase();
    searchByTags(recipes, searchTerms);
});


/* FONCTION DE TRI - Tri par recherche globale puis tags */
function searchByTags(recipes, searchTerms) {


    const searchResults = document.querySelector(".recipes"); // Div contenant les recettes

    /* Initialisation des tableaux de recettes filtrées */
    let arrayFilter = [];
    let ingredientFilter = [];
    let applianceFilter = [];
    let ustensilFilter = [];



    /* RECHERCHE GLOBALE - Input de recherche */

    // Si un mot est recherché :
    if (searchTerms) {
        if (searchTerms.length > 2) {
            // Les recettes contenant le mot recherché sont stockées dans le tableau
            for (let i in allRecipes) {
                if (allRecipes[i].name.toLowerCase().includes(searchTerms)) {
                    arrayFilter.push(allRecipes[i]);
                }

            }
        } else {
            // Sinon, toutes les recettes sont stockées dans le tableau (50)
            for (let i in allRecipes) {
                arrayFilter.push(allRecipes[i]);
            }

        }
        // Si aucun mot n'est recherché : 
    } else {
        // Toutes les recettes sont stockées dans le tableau (50)
        for (let i in allRecipes) {
            arrayFilter.push(allRecipes[i]);
        }

    }

    /* RECHERCHE AVANCEE - Tri par tags */

    // Je vérifie qu'un tag soit sélectionné
    if (Array.from(document.querySelectorAll(".tag-selected li")).length !== 0) {
        // Et je récupère tous ces tags
        Array.from(document.querySelectorAll(".tag-selected li")).forEach(function(el) {
            /*  TAG INGREDIENTS */
            // Si le tag sélectionné contient la classe ingrédient
            if (el.classList.contains("ingredient-selected")) {
                let ingrTag = [];
                // Je crée un nouveau tableau qui filtre arrayFilter par les tags ingredients
                arrayFilter.map(function(recipe) {
                    recipe.ingredients.filter(ing => {
                        // Si la recette contient l'ingrédient sélectionné
                        if (ing.ingredient.toLowerCase() === el.textContent.toLowerCase()) {
                            recipe.ingredients.forEach((ingr) => {
                                ingrTag.push(ingr.ingredient.toLowerCase());
                            });

                            let filteredIngredients = ingrTag.filter((el, i) =>
                                ingrTag.indexOf(el) === i
                            );

                            const ingrItem = document.querySelector(".ingredient-items");
                            ingrItem.innerHTML = "";
                            filteredIngredients.forEach((tag) => {
                                const newLi = document.createElement("li");
                                newLi.classList.add("taglist", "taglist-ingredients");
                                newLi.textContent = tag;
                                ingrItem.appendChild(newLi);
                            });

                            // Les recettes sont stockée dans le tableau ingredientFilter
                            ingredientFilter.push(recipe);
                        }
                    });
                });

                // Je retire les recettes qui ne contiennent pas le tag sélectionné
                ingredientFilter = ingredientFilter.filter(function(el) {
                    return el.length !== 0;
                });

                // arrayFilter prend le contenu ingredientFilter
                arrayFilter = ingredientFilter;
            }



            // Si le tag sélectionné contient la classe appliance
            if (el.classList.contains("appliance-selected")) {
                let appTag = [];
                arrayFilter.map(function(recipe) {
                    // Si la recette ne contient pas le tag sélectionné
                    if (arrayFilter.appliance === el.textContent.toLowerCase()) {
                        recipe.appliance.forEach((app) => {
                            appTag.push(app.toLowerCase());
                        });

                        let filteredAppliance = appTag.filter((el, i) =>
                            appTag.indexOf(el) === i
                        );

                        const ingrItem = document.querySelector(".appliance-items");
                        appItem.innerHTML = "";
                        filteredAppliance.forEach((tag) => {
                            const newLi = document.createElement("li");
                            newLi.classList.add("taglist", "taglist-appliance");
                            newLi.textContent = tag;
                            appItem.appendChild(newLi);
                        });


                        // les recettes sont stockées dans le tableau applianceFilter
                        applianceFilter.push(recipe);
                    }
                });

                // Je retire les recettes qui ne contiennent pas le tag sélectionné
                applianceFilter = applianceFilter.filter(function(el) {
                    return el.length !== 0;
                });

                // arrayFilter prend le contenu applianceFilter
                arrayFilter = applianceFilter;

            }

            // Si le tag sélectionné contient la classe ustensils
            if (el.classList.contains("ustensils-selected")) {
                let ustTag = [];
                // Je crée un tableau qui filtre arrayFilter par les tags ustensils
                arrayFilter.map(function(recipe) {
                    recipe.ustensils.filter(ust => {
                        // Si la recette contient l'ustensile sélectionné
                        if (ust.toLowerCase() === el.textContent.toLowerCase()) {
                            recipe.ustensils.forEach((ustensil) => {
                                ustTag.push(ustensil.toLowerCase());
                            });

                            let filteredUstensil = ustTag.filter((el, i) =>
                                ustTag.indexOf(el) === i
                            );

                            const ustItem = document.querySelector(".ustensils-items");
                            ustItem.innerHTML = "";
                            filteredUstensil.forEach((tag) => {
                                const newLi = document.createElement("li");
                                newLi.classList.add("taglist", "taglist-ustensils");
                                newLi.textContent = tag;
                                ustItem.appendChild(newLi);
                            });
                            // Les recettes sont stockées dans le tableau ustensilFilter
                            ustensilFilter.push(recipe);
                        }
                    });
                });

                // Je retire les recettes qui ne contiennent pas le tag sélectionné
                ustensilFilter = ustensilFilter.filter(function(el) {
                    return el.length !== 0;
                });

                // arrayFilter prend le contenu de ustensilFilter
                arrayFilter = ustensilFilter;
            }
        });
    }

    // Si aucune recette n'a été trouvée, un message d'erreur s'affiche
    if (arrayFilter.length === 0) {
        searchResults.innerHTML = "Aucune recette trouvée.";
    } else {
        // Sinon, les recettes filtrée sont affichées
        searchResults.innerHTML = "";
        arrayFilter.forEach((recipe) => {
            const recipeModel = recipesFactory(recipe);
            const recipeCardDOM = recipeModel.getRecipesCardDOM();
            searchResults.appendChild(recipeCardDOM);
        });
    }
}