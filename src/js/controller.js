import state, * as model from './model.js';
import RecipeView from './views/RecipeView.js';


// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

async function controlRecipes() {
  try {
    let id = window.location.hash.slice(1);
    RecipeView.renderSpinner();
    await model.loadRecipe(id);
    const { recipe } = state;
     // Renderizar receta
    RecipeView.render(recipe);
    console.log(recipe); // Imprimir la respuesta en la consola
  } catch (error) {
    console.error('Ocurrió un error:', error);
  }
}


// Lista de eventos
const eventos = ['hashchange', 'load'];

// Agregar eventos a las funciones
eventos.forEach(event => {
  window.addEventListener(event, controlRecipes);
});
