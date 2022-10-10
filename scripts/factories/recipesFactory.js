/* eslint-disable no-unused-vars */
function recipesFactory(data) { 
    const { id, name, servings, image, ingredients, time, description, appliance, ustensils } = data;
    const recipeImg = `./images/recipes/${image}`;

    function getRecipesCardDOM() {
        const card = document.createElement("div");
        const img = document.createElement("img");
        const cardBody = document.createElement("div");
        const titleContent = document.createElement("div");
        const recipeContent = document.createElement("div");
        const recipeDescription = document.createElement("p");
        const cookingTime = document.createElement("p");
        const cookingIcon = document.createElement("img");
        const cardTitle = document.createElement("h5");
        const ingredientList = document.createElement("ul");


        card.classList.add("card");
        img.classList.add("card-img-top");
        cardBody.classList.add("card-body");
        titleContent.classList.add("title-content");
        recipeContent.classList.add("recipe-content");
        cookingIcon.setAttribute("src", "./images/timer.svg");
        cardTitle.classList.add("card-title");
        cookingIcon.classList.add("cooking-icon");
        recipeDescription.classList.add("recipe-description");
        ingredientList.classList.add("ingredient-list");

        if (image == undefined) {
            img.setAttribute("src", "images/thumbnail.svg");
        } else {
            img.setAttribute("src", recipeImg);
        }


        cardTitle.textContent = name;
        cookingTime.textContent = time;
        recipeDescription.textContent = recipeDescription.textContent = description.substring(0, 200) + "...";


        ingredients.forEach((ingredient) => {
            const ingredientItem = document.createElement("li");
            // display unit ci yen a une 
            if (ingredient.unit == undefined) {
                ingredientItem.innerHTML = `<b>${ingredient.ingredient}</b>: ${ingredient.quantity}`;
            } else {
                ingredientItem.innerHTML = `<b>${ingredient.ingredient}</b>: ${ingredient.quantity} ${ingredient.unit}`;
            }
            ingredientList.appendChild(ingredientItem);

        });

        card.appendChild(img);
        card.appendChild(cardBody);
        cardBody.appendChild(titleContent);
        cardBody.appendChild(recipeContent);
        titleContent.appendChild(cardTitle);
        titleContent.appendChild(cookingTime);
        cookingTime.appendChild(cookingIcon);
        recipeContent.appendChild(ingredientList);
        recipeContent.appendChild(recipeDescription);



        return (card);
    }

    return { id, name, servings, ingredients, image, time, description, appliance, ustensils, getRecipesCardDOM };

}