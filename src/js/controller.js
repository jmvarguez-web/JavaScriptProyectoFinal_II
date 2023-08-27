import   state,* as model from './model.js';
import RecipeView from './views/RecipeView.js';
import SearchView from './views/SearchView.js';
//ResultsView como resultsView.
import resultsView from './views/ResultView.js';
import paginationView from './views/paginationView.js';


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
   //controlSearchResults("pizza")
  } catch (error) {
    RecipeView.renderError(error); 
    //console.error('Ocurrió un error:', error);
  }
}

async function controlSearchResults(){
  try {
    resultsView.renderSpinner();
    let query = SearchView.getQuery();
    if (!query) {
      return; // No query, return immediately
    }
  await model.loadSearchResults(query); 

    /*resultsView.render(model.state.search.results), que ahora tome los resultados de la función*/
    resultsView.render(model.getSearchResultsPage());
    paginationView.render(state.search)
  
  
    

    

   // resultsView.render(model.default.search.results);
    //searchView.getQuery
  
  } catch (err) {
    console.error('Ocurrió un error:', err);
  }
}
const controlPagination = function (goToPage) {
  // 1) Render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render NEW pagination buttons
  paginationView.render(state.search);
};

function init() {
  RecipeView.addHandlerRender(controlRecipes);
  SearchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}

// Llamada a la función init
init();