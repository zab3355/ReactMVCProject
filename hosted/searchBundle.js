  const searchRecipe = () => {
      // grabs searchbar input
        let input = document.getElementById("searchInput").value;

        input = input.toLowerCase();
        input = input.trim();

        //grabs tag element
        let tag = document.querySelector(".tag");

        // grabs all the cards on screen
        let cardElements = document.querySelectorAll(".card");

        let recipeShow = false;

        //for each card,
        cardElements.forEach(card => {
          //if title matches input, display and show tag
          let title = card.querySelector("h2").innerHTML;
          title = title.toLowerCase();

          let ingred = card.querySelector("#ingred").innerHTML;
          ingred = ingred.toLowerCase();
          ingred = ingred.split(",");

          ingred.forEach(item => {
            item = item.trim();
              if (title == input) {
              recipeShow = true;
              card.style.display = "block";
              tag.querySelector("h5").innerHTML = input;
              tag.style.display = "block";
            //if not, set the display to none
            } else if (item == input) {
                recipeShow = true;
                console.log(card);
                card.style.display = "block";
                tag.querySelector("h3").innerHTML = input;
                tag.style.display = "block";
            } else {
              card.style.display = "none";
            }
          });
        });

        if (recipeShow == false) {
            $('#searchEmpty').modal('show');
          }
    } 