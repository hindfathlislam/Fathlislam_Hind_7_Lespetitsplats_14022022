/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function addUstensils(recipes) {

    // GESTION DE L'OUVERTURE/FERMETURE DU BLOCK DE TAGS
    const ustensilsBtn = document.querySelector(".ustensils");
    const ustensilsList = document.querySelector(".ustensils-tag");
    const arrow = document.querySelector(".arrow");

    ustensilsBtn.addEventListener("click", () => {
        ustensilsList.classList.toggle("open");

        if (ustensilsList.classList.contains("open")) {
            ustensilsList.style.display = "block";
            arrow.style.transform = "rotate(180deg)";
            ustensilsBtn.style.width = "66%";
        } else {
            ustensilsList.style.display = "none";
            arrow.style.transform = "rotate(0deg)";
            ustensilsBtn.style.width = "170px";
        }
    });


    // AFFICHAGES DES USTENSILES DANS LA LISTE
    const ustenstilsSection = document.querySelector(".ustensils-items");
    const ustensilsArray = [];

    // ajoute les ustensiles dans un tableau
    recipes.forEach((recipe) => {
        recipe.ustensils.forEach((ust) => {
            ustensilsArray.push(ust.toLowerCase());
        });
    });

    // retire les doublons du tableau
    let filteredUstensils = ustensilsArray.filter((el, i) =>
        ustensilsArray.indexOf(el) === i
    );

    // affiche les ingrédients dans la liste de tags
    filteredUstensils.forEach((filteredUstensil) => {
        const ustensilList = document.createElement("li");
        ustensilList.classList.add("taglist");
        ustensilList.classList.add("taglist-ustensils");
        ustensilList.textContent = filteredUstensil;
        ustenstilsSection.appendChild(ustensilList);
    });


    // CREATION DU TAG AU CLICK SUR L'USTENSILE
    const tagSelected = document.querySelector(".tag-selected");

    Array.from(document.querySelectorAll(".ustensils-items")).forEach(function(el) {
        el.addEventListener("click", (e) => {
            if (e.target && e.target.classList.contains("taglist-ustensils", "tag-selected")) {
                const tagSelectedLi = document.createElement("li");
                const tagImg = document.createElement("img");
                tagSelectedLi.classList.add("taglist-selected");
                tagSelectedLi.classList.add("ustensils-selected");
                tagImg.classList.add("taglist-img");
                tagImg.setAttribute("src", "./images/delete-tag.svg");
                tagSelectedLi.textContent = e.target.textContent;
                tagSelected.appendChild(tagSelectedLi);
                tagSelectedLi.appendChild(tagImg);
                e.target.style.display = "none";
                const searchTerms = document.querySelector(".input").value;
                searchByTags(recipes, searchTerms);
            }
        });
    });

    // suppression du tag au click sur celui-ci
    Array.from(document.querySelectorAll(".tag-selected")).forEach(function(el) {
        el.addEventListener("click", (e) => {

            if (e.target && e.target.classList.contains("taglist-selected")) {
                filteredUstensils.forEach(filteredUstensil => {
                    const ustensilList = document.createElement("li");
                    ustensilList.classList.add("taglist", "taglist-ustensils");
                    ustensilList.textContent = filteredUstensil;
                    ustenstilsSection.appendChild(ustensilList);
                });

                e.target.remove();
            }
            const searchTerms = document.querySelector(".input").value;
            searchByTags(recipes, searchTerms);
        });
    });


    // RECHERCHE D'UN INGREDIENT
    const searchByUstensil = document.querySelector("#ustensils-input");
    const ustensilsItem = document.querySelector(".ustensils-items");

    searchByUstensil.addEventListener("input", (e) => {
        ustensilsItem.textContent = "";

        const searchedString = e.target.value.toLowerCase();
        const filteredUst = filteredUstensils.filter(item => item.toLowerCase().includes(searchedString));

        // affichage du résultat de la recherche
        filteredUst.forEach((ust) => {
            const ustensilNode = document.createElement("li");
            ustensilNode.textContent = ust;
            ustensilNode.classList.add("taglist");
            ustensilNode.classList.add("taglist-ustensils");
            ustensilsItem.appendChild(ustensilNode);
        });
    });




}