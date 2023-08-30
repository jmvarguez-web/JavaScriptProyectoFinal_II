// Objeto state para el modelo
import { API_URL } from './config.js';
import { RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};
export default state;
// Función asíncrona para cargar la receta
export const loadRecipe = async id => {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    const { recipe } = data.data;
    console.log(recipe);
    state.recipe = recipe;
  } catch (err) {
    /*alert(err);*/
    console.log(`${err} 💥💥💥💥`);
    throw err;
  }
};

export const loadSearchResults = async query => {
  try {
    state.search.results = query; // Asignar la consulta a la propiedad query
    //console.log(state.search.results); // Mostrar los resultados en la consola
    const data = await getJSON(`${API_URL}/?search=${query}`);
    const searchResults = data.data.recipes.map(rec => ({
      id: rec.id,
      title: rec.title,
      publisher: rec.publisher,
      image: rec.image_url,
    }));
    state.search.results = searchResults
    //return searchResults;
  } catch (error) {
    console.log(`${error} 💥💥💥💥`);
    throw error;
  }
};
export const getSearchResultsPage = (page = state.search.page)=>{
  state.search.page = page;
  let start = (page - 1) * state.search.resultsPerPage;
  let end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
}



