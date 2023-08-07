recipeContainer = document.querySelector('.recipe');
import icons from '../img/icons.svg';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// a. Crea una función que se llame renderSpinner que recibirá un elemento padre
// (parentEl). Dentro del cuerpo de la función, crea la variable markup y asígnale el
// último código copiado (aplica el punto 22).
// b. Utiliza el método insertAdjacentHTML al parámetro parentEl. Pasa como
// parámetro ‘afterbegin’ y la variable markup.
// c. Antes de esta última línea, borra el contenido del elemento padre con innerHTML,
// asignándole una cadena vacía.
// d. Llama a la función renderSpinner desde el cuerpo de la función showRecipe. Se
// recomienda que lo pongas inmediatamente después del try y pásale como
// parámetro recipeContainer.
// Función para renderizar el spinner
function renderSpinner(parentEl) {
  const markup = `
  <div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
</div> 
  `;

  parentEl.innerHTML = ''; // Limpiar el contenido previo
  parentEl.insertAdjacentHTML('afterbegin', markup);
}

async function showRecipe() {
  try {
    renderSpinner(recipeContainer);
    const resp = await fetch(
      'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );
    const data = await resp.json();
    var recipe = data.data.recipe; // Crear la variable recipe y asignarle el valor de data.data
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    var markup = `
 

 <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>No recipes found for your query. Please try again!</p>
    </div> 


  <figure class="recipe__fig">
  <img src="${recipe.image}" alt="Tomato" class="recipe__img" />
    <h1 class="recipe__title">
      <span>Pasta with tomato cream sauce</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        recipe.cookTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        recipe.servings
      }</span>

      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">

    ${recipe.ingredients
      .map(ing => {
        return `
      <li class="recipe__ingredient">
     <svg class="recipe__icon">
     <use href="${icons}#icon-check"></use>
     </svg>
     <div class="recipe__quantity">${ing.quantity}</div>
     <div class="recipe__description">
     <span class="recipe__unit">${ing.unit}</span>
     ${ing.description}
     </div>
      </li>
      `;
      })
      .join('')} 
    </ul>
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        recipe.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>
  `;
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', markup);

    console.log(recipe); // Imprimir la respuesta en la consola
  } catch (error) {
    console.error('Ocurrió un error:', error);
  }
}

// Llamar a la función para obtener y mostrar la información de la receta
showRecipe();
