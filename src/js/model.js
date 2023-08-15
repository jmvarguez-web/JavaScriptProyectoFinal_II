// Objeto state para el modelo
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

const state = {
  recipe: {},
};
//export default state;
// Función asíncrona para cargar la receta
const loadRecipe = async id => {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    const { recipe } = data.data;
    console.log(recipe);
    state.recipe = recipe;
  } catch (err) {
    /*alert(err);*/
    console.log(`${err} 💥💥💥💥`);
  }
};

export { state as default, loadRecipe };

